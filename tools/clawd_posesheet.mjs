// clawd_posesheet.mjs OUT.jpg: Clawd in a row of poses with each world hat, to check the hat rides the pose
import { makeWorld } from '../engine/host.mjs';
import vm from 'node:vm'; import { writeFileSync } from 'node:fs';
const w = await makeWorld({ only: ['c00'] });
const out = process.argv[2];
vm.runInContext(`
  T = 3; LETTERS = []; POST = []; CAM = null; resetMatrix(); ctx.fillStyle = '#EFE6D6'; ctx.fillRect(0, 0, W, H);
  const HATS = ['helmet', 'safari', 'top', 'party'], P = [{}, { dy: -3 }, { sq: .25 }, { sq: -.2, dy: -2 }, { rot: .35 }, { flip: true, view: 'q' }, { view: 'side', walk: .25 }, { view: 'q', aL: 1.2, aR: -.6 }];
  HATS.forEach((h, r) => P.forEach((p, c) => tourist(140 + c * 230, 230 + r * 260, 9, h, { ...feel('happy', 3), ...p, emote: ['bulb', 'question', 'exclaim', 'dots'][c % 4], emoteK: 1, boilKey: 'ps' + r + c })));
  flushLetters();
`, w.g);
writeFileSync(out, w.canvas.toBuffer('image/jpeg'));
