// render.mjs: review images and the video.
//   node render.mjs --sheet=10,20.5,31 [--cols=3] [--w=640] --out=out/check/a.jpg    contact sheet at chosen times
//   node render.mjs --sheet=cue:v_reveal [--n=6]                                     n frames spread across a cue
//   node render.mjs --strip=12.0:12.5 [--cols=6] [--w=320] --out=out/check/s.jpg      every frame in a stretch
//   node render.mjs --sheet=10 --crop=760,300,400,400 --w=600                         full-res crops
//   node render.mjs --stills=10,20 --out=out/stills                                   full-res PNGs
//   node render.mjs --video [--range=0:60] [--workers=4] --out=out/video.mp4          parallel render + mux voice
//   --only=03,04  loads only scene files with those prefixes (faster iteration on one chapter)
import { makeWorld, ROOT } from './engine/host.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { spawn, fork } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync, statSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import os from 'node:os';

const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.length ? v.join('=') : true]; }));
const FPS = +(args.fps || 24);
const only = args.only ? String(args.only).split(',') : null;
const run = (cmd, a, opt = {}) => new Promise((ok, bad) => { const p = spawn(cmd, a, { stdio: 'inherit', ...opt }); p.on('close', c => c ? bad(new Error(cmd + ' exited ' + c)) : ok()); });

async function sheet(world, ts, out) {
  const cols = +(args.cols || (args.strip ? 6 : 3)), w = +(args.w || (args.strip ? 320 : 640));
  const crop = args.crop ? String(args.crop).split(',').map(Number) : null, [cx, cy, cw, ch] = crop || [0, 0, 1920, 1080];
  const h = Math.round(w * ch / cw), rows = Math.ceil(ts.length / cols), sc = createCanvas(cols * w, rows * h), c = sc.getContext('2d'), ms = [];
  for (let i = 0; i < ts.length; i++) {
    const t0 = performance.now(); const cv = world.render(ts[i]); ms.push(Math.round(performance.now() - t0));
    const x = (i % cols) * w, y = Math.floor(i / cols) * h;
    c.drawImage(cv, cx, cy, cw, ch, x, y, w, h);
    c.fillStyle = 'rgba(0,0,0,.65)'; c.fillRect(x, y, 96, 24); c.fillStyle = '#fff'; c.font = '15px sans-serif'; c.fillText(ts[i].toFixed(2) + 's', x + 6, y + 17);
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, await sc.encode('jpeg', 88));
  console.log(`${out}  (${ts.length} frames)  ms/frame: ${ms.join(' ')}`);
}

function parseTimes(world, s) {
  if (String(s).startsWith('cue:')) {
    const ids = String(s).slice(4).split('+'), n = +(args.n || 6), a = world.g.cs(ids[0]), b = world.g.ce(ids[ids.length - 1]);
    return Array.from({ length: n }, (_, i) => a + (b - a) * (i + .5) / n);
  }
  return String(s).split(',').map(Number);
}

if (args.worker) {
  // a video worker: render frames [a, b) into one segment
  const [a, b] = String(args.worker).split(':').map(Number), out = args.seg;
  const world = await makeWorld({ only });
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', '1920x1080', '-r', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', args.preset || 'medium', '-crf', String(args.crf || 18), '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = a; f < b; f++) {
    const cv = world.render(f / FPS), buf = cv.data();
    if (!ff.stdin.write(Buffer.from(buf))) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - a) % 240 === 0) process.send?.({ f, done: f - a, n: b - a, ms: (Date.now() - t0) / Math.max(1, f - a) });
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  process.send?.({ finished: true });
  process.exit(0);
}

if (args.video) {
  const probe = await makeWorld({ only }), len = probe.duration();
  const [ra, rb] = args.range ? String(args.range).split(':').map(Number) : [0, len];
  const fa = Math.round(ra * FPS), fb = Math.min(Math.round(rb * FPS), Math.ceil(len * FPS));
  const workers = +(args.workers || Math.max(1, os.cpus().length)), chunk = +(args.chunk || 1440);   // 60 s segments, resumable
  const segDir = join(ROOT, 'out/segments'); mkdirSync(segDir, { recursive: true });
  const jobs = []; for (let f = fa; f < fb; f += chunk) jobs.push([f, Math.min(fb, f + chunk)]);
  const segName = ([a, b]) => join(segDir, `seg_${String(a).padStart(6, '0')}_${String(b).padStart(6, '0')}.mp4`);
  const todo = jobs.filter(j => !(existsSync(segName(j)) && statSync(segName(j)).size > 10000) || args.force);
  console.log(`${fb - fa} frames, ${jobs.length} segments (${todo.length} to render), ${workers} workers`);
  let next = 0; const start = Date.now();
  await Promise.all(Array.from({ length: workers }, async () => {
    while (next < todo.length) {
      const j = todo[next++], tmp = segName(j).replace('.mp4', '.part.mp4');
      await new Promise((ok, bad) => {
        const p = fork(join(ROOT, 'render.mjs'), [`--worker=${j[0]}:${j[1]}`, `--seg=${tmp}`, ...(only ? [`--only=${only}`] : []), ...(args.crf ? [`--crf=${args.crf}`] : []), ...(args.preset ? [`--preset=${args.preset}`] : [])]);
        p.on('message', m => { if (m.done != null && m.done > 0) console.log(`  seg ${j[0]}: ${m.done}/${m.n}  ${m.ms.toFixed(0)} ms/frame`); });
        p.on('exit', c => c ? bad(new Error('worker failed ' + c)) : ok());
      });
      await run('mv', [tmp, segName(j)]);
      console.log(`segment ${j[0]}-${j[1]} done  (${((Date.now() - start) / 60000).toFixed(1)} min)`);
    }
  }));
  const list = join(segDir, 'list.txt'); writeFileSync(list, jobs.map(j => `file '${segName(j)}'`).join('\n'));
  const out = args.out || join(ROOT, 'out/video.mp4'), audio = args.audio || join(ROOT, 'audio/mix.wav');
  const hasAudio = existsSync(audio) && !args.noaudio;
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list,
    ...(hasAudio ? ['-ss', String(ra), '-t', String((fb - fa) / FPS), '-i', audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '256k'] : []),
    ...(existsSync(join(ROOT, 'out/subtitles.srt')) && !args.range ? ['-i', join(ROOT, 'out/subtitles.srt'), '-map', hasAudio ? '2:s' : '1:s', '-c:s', 'mov_text', '-metadata:s:s:0', 'language=eng'] : []),
    '-c:v', 'copy', '-movflags', '+faststart', out]);
  console.log('wrote ' + out + `  (${((Date.now() - start) / 60000).toFixed(1)} min)`);
  process.exit(0);
}

const world = await makeWorld({ only });
if (args.sheet) await sheet(world, parseTimes(world, args.sheet), args.out || join(ROOT, 'out/check/sheet.jpg'));
else if (args.strip) { const [a, b] = String(args.strip).split(':').map(Number), ts = []; for (let i = Math.round(a * FPS); i <= Math.round(b * FPS); i++) ts.push(i / FPS); await sheet(world, ts, args.out || join(ROOT, 'out/check/strip.jpg')); }
else if (args.stills) { const out = args.out || join(ROOT, 'out/stills'); mkdirSync(out, { recursive: true }); for (const s of parseTimes(world, args.stills)) { const t0 = Date.now(); const cv = world.render(s); const f = `${out}/t${s.toFixed(2).replace('.', '_')}.png`; writeFileSync(f, await cv.encode('png')); console.log(f, Date.now() - t0, 'ms'); } }
else console.log('nothing to do: see the usage notes at the top of render.mjs');
