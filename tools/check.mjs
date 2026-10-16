// check.mjs: render sampled frames across the video (in parallel), report exceptions and unmatched word lookups.
//   node tools/check.mjs [--step=0.5] [--workers=4] [--range=a:b]
import { fork } from 'node:child_process';
import { makeWorld } from '../engine/host.mjs';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
if (args.child) {
  const [a, b] = String(args.child).split(':').map(Number), step = +args.step, world = await makeWorld({ only: args.only ? String(args.only).split(',') : null });
  const errs = [];
  for (let t = a; t < b; t += step) { try { world.render(t); } catch (e) { errs.push(`${t.toFixed(2)}: ${e.message.split('\n')[0]}`); if (errs.length > 40) break; } }
  process.send({ errs, missing: [...(world.g.MISSING || [])] }); process.exit(0);
}
const probe = await makeWorld({ only: args.only ? String(args.only).split(',') : null }), len = probe.duration(), [ra, rb] = args.range ? String(args.range).split(':').map(Number) : [0, len];
const W = +(args.workers || 4), step = +(args.step || .5), span = (rb - ra) / W, all = { errs: [], missing: new Set() };
await Promise.all(Array.from({ length: W }, (_, i) => new Promise(ok => { const p = fork(new URL(import.meta.url).pathname, [`--child=${ra + i * span}:${ra + (i + 1) * span}`, `--step=${step}`, ...(args.only ? [`--only=${args.only}`] : [])]); p.on('message', m => { all.errs.push(...m.errs); m.missing.forEach(x => all.missing.add(x)); }); p.on('exit', ok); })));
const byMsg = {}; for (const e of all.errs) { const m = e.split(': ').slice(1).join(': '); (byMsg[m] ||= []).push(e.split(':')[0]); }
console.log(`checked ${ra.toFixed(0)}–${rb.toFixed(0)} s every ${step} s`);
for (const [m, ts] of Object.entries(byMsg)) console.log(`ERROR ×${ts.length} (first at ${ts[0]} s): ${m}`);
console.log(`unmatched words (${all.missing.size}):`, [...all.missing].sort().join('  '));
