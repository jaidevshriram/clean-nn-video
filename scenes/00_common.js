// 00_common.js: helpers shared by the chapter files.

// chapter lookups from the timeline
function chap(id) { return CUES.chapters.find(c => c.id === id); }
const chapStart = id => chap(id).s;
// k for an item that appears at a and leaves at b (both video times); fi/fo fade lengths
const on = (t, a, b = Infinity, fi = .45, fo = .35) => b === Infinity ? ease(seg(t, a, a + fi)) : env(t, a, b, fi, fo);
const popk = (t, a, d = .45) => clamp((t - a) / d);    // 0..1 raw, for backOut pops

// the hero illustration (city left, knot right), multiplied onto whatever is behind it so its white is the sky.
// HERO.at(ix, iy) maps image pixels to world coordinates for a hero drawn by hero(cx, cy, w).
const HERO = { iw: 1731, ih: 909, cx: 960, cy: 540, w: 1800, at(ix, iy) { const s = this.w / this.iw; return [this.cx - this.w / 2 + ix * s, this.cy - this.ih * s / 2 + iy * s]; } };
function hero(cx = 960, cy = 540, w = 1800, o = {}) {
  HERO.cx = cx; HERO.cy = cy; HERO.w = w;
  const I = img('blog/hero/city-and-knot'), h = w * I.height / I.width;
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = o.alpha ?? 1;
  if (o.half === 'city') ctx.drawImage(I, 0, 0, 975, I.height, cx - w / 2, cy - h / 2, w * 975 / I.width, h);
  else if (o.half === 'knot') ctx.drawImage(I, 975, 0, I.width - 975, I.height, cx - w / 2 + w * 975 / I.width, cy - h / 2, w * (I.width - 975) / I.width, h);
  else ctx.drawImage(I, cx - w / 2, cy - h / 2, w, h);
  ctx.restore();
}
// a hand-lettered tag on a string, pointing at (x, y)
function tag(txt, x, y, k, o = {}) {
  if (k <= .01) return;
  const dx = o.dx ?? 0, dy = o.dy ?? -90, tx = x + dx, ty = y + dy;
  boilSeed('tag' + txt);
  inkLine([[x, y], [lerp(x, tx, .5) + 8, lerp(y, ty, .5)], [tx, ty + 22]].slice(0, k < .4 ? 2 : 3), 1.2, PAL.ink, 'inkfine', .4);
  paint(ellPts(x, y, 6, 6, 10), { wash: o.dot || PAL.berry, ink: PAL.ink, sw: .5 });
  const w = (o.w || txt.length * (o.size || 30) * .5 + 40), h = (o.size || 30) * 1.5;
  push(); translate(tx, ty); rotate(o.rot ?? -.03); scale(backOut(k));
  paint(rectPts(-w / 2, -h / 2, w, h, 1.2), { wash: o.col || PAL.cream, ink: PAL.ink, sw: .8 });
  pop();
  letter(txt, tx, ty + 2, o.size || 30, o.tcol || PAL.ink, { face: 'hand', rot: o.rot ?? -.03, pop: k < 1 ? k : null, shadow: false });
}
// little painted shapes (for the packing/generalisation illustrations): kind circle|square|tri|diamond
function shape(kind, x, y, s, col, o = {}) {
  let P;
  if (kind === 'circle') P = ellPts(x, y, s, s, 16);
  else if (kind === 'square') P = rrPts(x - s * .85, y - s * .85, s * 1.7, s * 1.7, s * .25);
  else if (kind === 'tri') P = [[x, y - s * 1.05], [x + s * 1.05, y + s * .8], [x - s * 1.05, y + s * .8]];
  else P = [[x, y - s * 1.1], [x + s * 1.0, y], [x, y + s * 1.1], [x - s * 1.0, y]];
  paint(P, { wash: col, ink: PAL.ink, sw: o.sw ?? .7, curv: kind === 'tri' || kind === 'diamond' ? .15 : 0 });
}
const SHAPES = (() => { // the same 32 things: 4 families (shape) × 8 shades
  const fam = [['circle', ['#D2473F', '#DB5A3C', '#E26B3A', '#EA8A3B']], ['square', ['#D4B33A', '#B8B23C', '#8FA845', '#5E9A4C']], ['tri', ['#3AA5A3', '#1F95B5', '#2B7FC0', '#3A64B8']], ['diamond', ['#7B4FB5', '#9354B2', '#B45CA8', '#D9679F']]];
  const out = []; fam.forEach(([k, cols], f) => { for (let i = 0; i < 8; i++) out.push({ kind: k, col: cols[i % 4], fam: f, i }); }); return out;
})();
// a stack of note lines on the board: items [[time, text, opts]], drawn at x, y downward
function notes(t, x, y, items, o = {}) {
  let yy = y;
  for (const [ta, txt, io = {}] of items) {
    const k = seg(t, ta, ta + (io.dur || .9));
    if (k > 0) {
      if (io.bullet !== false) paint(ellPts(x - 26, yy, 7, 7, 10), { wash: io.dot || o.dot || PAL.clay, ink: PAL.ink, sw: .5 });
      letter(txt, x, yy, io.size || o.size || 40, io.col || o.col || PAL.ink, { face: io.face || o.face || 'hand', align: 'left', reveal: k, shadow: false });
    }
    yy += (io.gap || o.gap || 64);
  }
}
// a painted "stamp" (rotated box text) slamming on at time a
function stamp(txt, x, y, a, t, o = {}) {
  const k = popk(t, a, .25); if (k <= 0) return;
  const s = lerp(1.6, 1, easeOut(k)), col = o.col || PAL.berry;
  push(); translate(x, y); rotate(o.rot ?? -.12); scale(s);
  boilSeed('stamp' + txt);
  const w = o.w || txt.length * (o.size || 54) * .62 + 40, h = (o.size || 54) * 1.45;
  inkStroke(rectPts(-w / 2, -h / 2, w, h, 2), true, 2.4, col, 'ink');
  pop();
  letter(txt, x, y, (o.size || 54) * s, col, { rot: o.rot ?? -.12, shadow: false, alpha: .92 });
}
// fig(name, cx, cy, w, k, o): a blog figure on a card; returns its box, with r(fx, fy, fw, fh) → [x, y, w, h] for rings
function fig(name, cx, cy, w, k = 1, o = {}) {
  const I = img(name), cr = o.crop || [0, 0, I.width, I.height], h = w * cr[3] / cr[2];
  if (k > .01) figure(name, cx, cy, w, { k, key: o.key || name, ...o });
  return { x0: cx - w / 2, y0: cy - h / 2, w, h, r: (fx, fy, fw, fh) => [cx - w / 2 + fx * w, cy - h / 2 + fy * h, fw * w, fh * h], p: (fx, fy) => [cx - w / 2 + fx * w, cy - h / 2 + fy * h] };
}
const fring = (F, fr, k, col = PAL.berry, sw = 2.6, key) => { const [x, y, w, h] = F.r(...fr); ringBox(x, y, w, h, k, col, sw, key || ('rg' + fr.join('_'))); };
