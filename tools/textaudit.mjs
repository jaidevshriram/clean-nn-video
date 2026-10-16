// textaudit.mjs: render sampled frames and flag text drawn partly outside the frame (or outside the safe margin).
//   node tools/textaudit.mjs [--step=1] [--range=a:b] [--margin=12]
import { makeWorld } from '../engine/host.mjs';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const w = await makeWorld(), step = +(args.step || 1), M = +(args.margin ?? 12), [a, b] = args.range ? String(args.range).split(':').map(Number) : [0, w.duration()];
const proto = Object.getPrototypeOf(w.ctx), orig = proto.fillText; let hits = [];
proto.fillText = function (s, x, y, ...r) {
  if (this === w.ctx && this.globalAlpha > .3 && String(s).trim().length > 1) {
    const m = this.measureText(s), al = this.textAlign, x0 = al === 'center' ? x - m.width / 2 : al === 'right' || al === 'end' ? x - m.width : x, T = this.getTransform();
    const pts = [[x0, y - m.actualBoundingBoxAscent], [x0 + m.width, y + m.actualBoundingBoxDescent]].map(([px, py]) => [T.a * px + T.c * py + T.e, T.b * px + T.d * py + T.f]);
    const L = Math.min(pts[0][0], pts[1][0]), R = Math.max(pts[0][0], pts[1][0]), U = Math.min(pts[0][1], pts[1][1]), D = Math.max(pts[0][1], pts[1][1]);
    const h = Math.abs(D - U);
    if (h > 14 && (L < M || R > 1920 - M || U < M || D > 1080 - M)) hits.push({ s: String(s).slice(0, 40), L: Math.round(L), R: Math.round(R), U: Math.round(U), D: Math.round(D) });
  }
  return orig.call(this, s, x, y, ...r);
};
const seen = new Map();
for (let t = a; t < b; t += step) { hits = []; try { w.render(t); } catch (e) { continue; } for (const h of hits) { const k = h.s; if (!seen.has(k)) seen.set(k, { ...h, t: +t.toFixed(1), n: 0 }); seen.get(k).n++; } }
const out = [...seen.values()].sort((x, y) => x.t - y.t);
for (const h of out) console.log(`${String(h.t).padStart(7)}s  x[${h.L},${h.R}] y[${h.U},${h.D}]  ×${h.n}  "${h.s}"`);
console.log(`${out.length} labels touch the frame edge`);
