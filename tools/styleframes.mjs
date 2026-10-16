// styleframes.mjs: render the one-still-per-world style frames (style/frames.js) as full-size PNGs and a contact sheet.
//   node tools/styleframes.mjs [--only=3,7] [--out=out/style]
import vm from 'node:vm';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import { makeWorld, ROOT } from '../engine/host.mjs';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const out = resolve(ROOT, args.out || 'out/style'); mkdirSync(out, { recursive: true });
const world = await makeWorld({ only: ['__none__'] });
vm.runInContext(readFileSync(join(ROOT, args.file || 'style/frames.js'), 'utf8'), world.g, { filename: args.file || 'style/frames.js' });
const FR = world.g.FRAMES, only = args.only ? String(args.only).split(',').map(Number) : null;
const cols = 4, tw = 640, th = 360, pick = FR.map((f, i) => i).filter(i => !only || only.includes(i));
const sheet = createCanvas(cols * tw, Math.ceil(pick.length / cols) * (th + 44)), sc = sheet.getContext('2d');
sc.fillStyle = '#111'; sc.fillRect(0, 0, sheet.width, sheet.height);
for (const [n, i] of pick.entries()) {
  const [title, t, draw] = FR[i];
  world.g.__DRAW = draw; vm.runInContext('drawWorld = t => __DRAW(t);', world.g);
  const t0 = performance.now(); let cv;
  try { cv = world.render(t); } catch (e) { console.log(`${title}: ERROR ${e.message}\n${e.stack.split('\n').slice(1, 3).join('\n')}`); continue; }
  writeFileSync(join(out, `frame_${String(i).padStart(2, '0')}.png`), await cv.encode('png'));
  const x = (n % cols) * tw, y = Math.floor(n / cols) * (th + 44);
  sc.drawImage(cv, x, y, tw, th); sc.fillStyle = '#fff'; sc.font = '20px sans-serif'; sc.fillText(title, x + 10, y + th + 28);
  console.log(`${title}  ${Math.round(performance.now() - t0)} ms`);
}
writeFileSync(join(out, 'sheet.jpg'), await sheet.encode('jpeg', 90));
console.log('wrote ' + out);
