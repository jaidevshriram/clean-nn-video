// host.mjs: loads the engine and scene scripts into one shared global scope (they are plain scripts with globals,
// like the browser kit), with a Skia canvas, fonts, preloaded images and the narration timeline.
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

for (const [f, fam] of [['PermanentMarker-Regular.ttf', 'Permanent Marker'], ['PatrickHand-Regular.ttf', 'Patrick Hand'], ['Kalam-Regular.ttf', 'Kalam'], ['Kalam-Bold.ttf', 'Kalam']])
  GlobalFonts.registerFromPath(join(ROOT, 'assets/fonts', f), fam);

function walk(dir) { const out = []; if (!existsSync(dir)) return out; for (const e of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) out.push(...walk(p)); else if (/\.(png|jpe?g|webp)$/i.test(e.name)) out.push(p); } return out; }

export async function makeWorld({ only = null } = {}) {
  const canvas = createCanvas(1920, 1080), ctx = canvas.getContext('2d');
  // images: everything under assets/blog and assets/art, keyed by path without extension, e.g. 'blog/figs/fig002'
  const IMG = {};
  const files = [...walk(join(ROOT, 'assets/blog')), ...walk(join(ROOT, 'assets/art'))];
  await Promise.all(files.map(async f => { const k = relative(join(ROOT, 'assets'), f).replace(/\.(png|jpe?g|webp)$/i, ''); IMG[k] = await loadImage(f); }));
  const tl = join(ROOT, 'audio/timeline.json');
  const CUES = existsSync(tl) ? JSON.parse(readFileSync(tl, 'utf8')) : { cues: {}, duration: 10 };
  const g = { console, Math, Path2D: (await import('@napi-rs/canvas')).Path2D, createCanvas, ctx, CANVAS: canvas, IMG, CUES, Error, JSON, Array, Object, String, Number, isFinite, Infinity, NaN, Set, Map };
  g.globalThis = g;
  vm.createContext(g);
  const run = f => vm.runInContext(readFileSync(join(ROOT, f), 'utf8'), g, { filename: f });
  vm.runInContext(`const PROJECT = { duration: ${CUES.duration || 10}, bpm: 92, offset: 0 };`, g);
  for (const f of ['engine/core.js', 'engine/clawd.js', 'engine/timeline.js', 'engine/kit.js', 'engine/prof.js', 'engine/world.js']) if (existsSync(join(ROOT, f))) run(f);
  const scenes = readdirSync(join(ROOT, 'scenes')).filter(f => f.endsWith('.js')).sort();
  for (const f of scenes) if (!only || only.some(o => f.startsWith(o)) || f.startsWith('00')) run('scenes/' + f);
  vm.runInContext('makeTextures();', g);
  return { g, canvas, ctx, render: t => { g.renderFrame(t); return canvas; }, duration: () => vm.runInContext('DUR', g) };
}
