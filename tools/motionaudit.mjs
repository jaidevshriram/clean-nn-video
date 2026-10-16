// motionaudit.mjs: render a range at 12 fps (low-res compare) and report hard jumps (single-frame cuts), near-empty
// frames, and static stretches. Chapter seams are skipped (the portals are handled by teleport.js).
//   node tools/motionaudit.mjs --range=a:b [--only=c03] [--fps=12]
import { makeWorld } from '../engine/host.mjs';
import { createCanvas } from '@napi-rs/canvas';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const w = await makeWorld({ only: args.only ? String(args.only).split(',') : null }), fps = +(args.fps || 12);
const [a, b] = args.range ? String(args.range).split(':').map(Number) : [0, w.duration()];
const seams = w.g.CUES.chapters.map(c => c.s), small = createCanvas(160, 90), sc = small.getContext('2d');
let prev = null, still = 0, stillAt = 0; const out = [];
for (let t = a; t < b; t += 1 / fps) {
  const cv = w.render(t); sc.drawImage(cv, 0, 0, 160, 90); const d = sc.getImageData(0, 0, 160, 90).data;
  const g = new Float32Array(160 * 90); let mean = 0, sd = 0;
  for (let i = 0; i < g.length; i++) { g[i] = d[i * 4] * .3 + d[i * 4 + 1] * .59 + d[i * 4 + 2] * .11; mean += g[i]; } mean /= g.length;
  for (let i = 0; i < g.length; i++) sd += (g[i] - mean) ** 2; sd = Math.sqrt(sd / g.length);
  const nearSeam = seams.some(s => t - s > -.6 && t - s < 2.5);
  if (sd < 6 && !nearSeam) out.push(`${t.toFixed(2)}s  EMPTY-LOOKING frame (flat, mean ${mean.toFixed(0)})`);
  if (prev) {
    let diff = 0; for (let i = 0; i < g.length; i++) diff += Math.abs(g[i] - prev[i]); diff /= g.length;
    if (diff > 40 && !nearSeam) out.push(`${t.toFixed(2)}s  HARD JUMP (diff ${diff.toFixed(0)})`);
    if (diff < .25) { if (!still) stillAt = t; still++; } else { if (still / fps > 4 && !nearSeam) out.push(`${stillAt.toFixed(2)}s  STATIC for ${(still / fps).toFixed(1)} s`); still = 0; }
  }
  prev = g;
}
const dedup = []; let last = -9; for (const l of out) { const t = parseFloat(l); if (t - last > .3) dedup.push(l); last = t; }
console.log(dedup.join('\n') || 'clean'); console.log(`${dedup.length} issues in ${a}–${b} s`);
