// clawd_probe.mjs A B STEP OUT.json: record every tourist() call (screen position, size, hat, pose) while rendering a range
import { makeWorld } from '../engine/host.mjs';
import { writeFileSync } from 'node:fs';
const [A, B, STEP, OUT] = process.argv.slice(2); const w = await makeWorld(); const g = w.g, rec = [];
const orig = g.tourist; let T0 = 0;
g.tourist = function (x, y, u, hat, o = {}) {
  const m = g.ctx.getTransform(), sx = m.a * x + m.c * y + m.e, sy = m.b * x + m.d * y + m.f, sc = Math.hypot(m.a, m.b);
  rec.push({ t: T0, x: sx, y: sy, u: u * sc, hat: hat || o.worldHat || null, view: o.view || 'front', flip: !!o.flip, dy: o.dy || 0, sq: (o.sq || 0) + (o.take || 0), rot: o.rot || 0, walk: o.walk != null, lid: o.lid || 0, aL: o.aL, aR: o.aR });
  return orig.call(this, x, y, u, hat, o);
};
for (let t = +A; t < +B; t += +STEP) { T0 = Math.round(t * 100) / 100; w.render(T0); }
writeFileSync(OUT, JSON.stringify(rec)); console.log(rec.length, 'calls');
