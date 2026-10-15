// fetch_assets.mjs: download the essay's images and screenshot its figures into assets/blog (not committed: the
// figures and photos belong to the essay). Needs Playwright's Chromium.
//   node tools/fetch_assets.mjs
import { createRequire } from 'module';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
const require = createRequire(process.env.PLAYWRIGHT_MODULES || '/opt/node-tools/node_modules/');
const { chromium } = require('playwright');
const SITE = 'https://already-clean.goodfire.com/', ROOT = new URL('..', import.meta.url).pathname, OUT = join(ROOT, 'assets/blog');
const html = await (await fetch(SITE)).text();
const assets = [...new Set([...html.matchAll(/(?:src|href|data-src|poster)="(assets\/[^"]+\.(?:png|jpe?g|webp))"/g)].map(m => m[1]))];
for (const a of assets) { const f = join(OUT, 'raw', a.replace(/^assets\//, '')); if (existsSync(f)) continue; mkdirSync(dirname(f), { recursive: true }); const r = await fetch(SITE + a); if (r.ok) writeFileSync(f, Buffer.from(await r.arrayBuffer())); }
mkdirSync(join(OUT, 'hero'), { recursive: true });
writeFileSync(join(OUT, 'hero/city-and-knot.png'), Buffer.from(await (await fetch(SITE + 'assets/social/city-and-knot-20261015.png')).arrayBuffer()));
console.log(assets.length, 'images');
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 2 });
await p.goto(SITE, { waitUntil: 'load', timeout: 240000 }); await p.waitForTimeout(8000);
await p.evaluate(() => document.querySelectorAll('figure')[0].querySelectorAll('canvas').forEach(c => c.remove()));
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
const n = await p.evaluate(() => document.querySelectorAll('figure').length);
mkdirSync(join(OUT, 'figs'), { recursive: true });
for (let i = 1; i < n; i++) {
  try { await p.locator('figure').nth(i).scrollIntoViewIfNeeded(); await p.waitForTimeout(600); await p.locator('figure').nth(i).screenshot({ path: join(OUT, 'figs', `fig${String(i).padStart(3, '0')}.png`), animations: 'disabled', timeout: 60000 }); }
  catch (e) { console.log('figure', i, 'failed:', String(e).slice(0, 80)); }
}
await b.close();
