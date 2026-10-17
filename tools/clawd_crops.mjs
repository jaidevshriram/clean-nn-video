// clawd_crops.mjs PICK.json OUTDIR: render each picked moment and save a close-up crop of Clawd, labelled, in sheets of 24
import { makeWorld } from '../engine/host.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const [PF, OUT] = process.argv.slice(2); mkdirSync(OUT, { recursive: true });
const P = JSON.parse(readFileSync(PF)); const w = await makeWorld(); const CW = 300, CH = 300, COLS = 6, PER = 24;
for (let s = 0; s * PER < P.length; s++) {
  const sheet = createCanvas(CW * COLS, CH * Math.ceil(Math.min(PER, P.length - s * PER) / COLS)), sc = sheet.getContext('2d'); sc.fillStyle = '#222'; sc.fillRect(0, 0, sheet.width, sheet.height);
  P.slice(s * PER, (s + 1) * PER).forEach((r, i) => {
    const cv = w.render(r.t), half = Math.max(40, r.u * 11), cx = r.x, cy = r.y - r.u * 6;
    sc.drawImage(cv, cx - half, cy - half, half * 2, half * 2, (i % COLS) * CW, Math.floor(i / COLS) * CH, CW, CH);
    sc.fillStyle = 'rgba(0,0,0,.6)'; sc.fillRect((i % COLS) * CW, Math.floor(i / COLS) * CH, CW, 22); sc.fillStyle = '#FF0'; sc.font = '15px sans-serif';
    sc.fillText(`${r.t}s ${r.hat} ${r.view}${r.flip ? ' flip' : ''}${r.walk ? ' walk' : ''} dy${r.dy.toFixed(1)} sq${r.sq.toFixed(2)} r${r.rot.toFixed(2)} u${r.u.toFixed(1)}`, (i % COLS) * CW + 4, Math.floor(i / COLS) * CH + 16);
  });
  writeFileSync(`${OUT}/sheet${s}.jpg`, sheet.toBuffer('image/jpeg'));
}
console.log('done');
