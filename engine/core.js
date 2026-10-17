// core.js: the paint engine. A CPU (Skia Canvas2D) re-implementation of ClaudeAnimationBase's core.js, keeping its API
// (paint, inkLine, glow, camBegin/camEnd, boilSeed, letter, …) so clawd.js runs unchanged, but fast enough to render a
// long video on a machine without a GPU. The look it aims for is the kit's: flat washes with pigment texture and pooled
// edges, soft layered watercolour fills, tapered boiling ink lines, paper underneath and grain multiplied over the top.
//
// Everything is a pure function of t. Frames render in parallel, out of order, in separate processes.
// The host (render.mjs / worker.mjs) provides: CANVAS, ctx, createCanvas, IMG (preloaded images), CUES (timeline).

const W = 1920, H = 1080;
const BPM = PROJECT.bpm, BEAT = 60 / BPM, OFF = PROJECT.offset || 0, BOIL = 12;
let DUR = PROJECT.duration;
const TAU = Math.PI * 2;
const PAL = {
  paper: '#F3EBDC', ink: '#2B2233', clay: '#D97757', clayDk: '#A84D33', clayLt: '#F2A283',
  night: '#1F2550', indigo: '#2F3C7A', rose: '#E27A92', ochre: '#E8AA38', sap: '#6E9F58',
  teal: '#3A9C98', violet: '#7B5CA8', cream: '#FFF5E2', sky: '#8EC3E6',
  // added for this video
  slate: '#3E4860', mist: '#C9D6DF', sand: '#E9D8B8', moss: '#8BA86A', plum: '#5B3F6B', brick: '#B5533C',
  dusk: '#3B3B6D', gold: '#F0BE46', sea: '#5FA8B5', berry: '#C2456A', fog: '#E4E0D6'
};

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, x) => a + (b - a) * x;
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
const easeIn = x => Math.pow(clamp(x), 3);
const easeInOut = x => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const backOut = x => { x = clamp(x); const s = 1.9; return 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2); };
const elasticOut = x => { x = clamp(x); return x === 0 || x === 1 ? x : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * (TAU / 3)) + 1; };
const hash = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const hashS = s => { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0) / 4294967296; };
const bpOf = t => (t - OFF) / BEAT;

// ---------- seeded randomness (p5's random / randomSeed, for the boil) ----------
let _rs = 1;
function randomSeed(s) { _rs = (s >>> 0) || 1; }
function _rnd() { _rs = (_rs + 0x6D2B79F5) | 0; let t = Math.imul(_rs ^ (_rs >>> 15), 1 | _rs); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
function random(a, b) {
  if (a === undefined) return _rnd();
  if (Array.isArray(a)) return a[Math.floor(_rnd() * a.length)];
  if (b === undefined) return _rnd() * a;
  return a + _rnd() * (b - a);
}
function noiseSeed() {}
const jit = a => (random() * 2 - 1) * a;
let BOILN = 0, CLAWD_N = 0;
const boilSeed = key => { let h = 2166136261; for (const c of key + '|' + BOILN) h = Math.imul(h ^ c.charCodeAt(0), 16777619); randomSeed(h >>> 0); };

// ---------- timing helpers ----------
const seg = (t, a, b) => b === a ? (t >= a ? 1 : 0) : clamp((t - a) / (b - a));
const frac = x => x - Math.floor(x);
const beatN = t => Math.floor(bpOf(t));
const pulse = (t, k = 6) => Math.exp(-frac(bpOf(t)) * k);
const pulse2 = (t, k = 6) => Math.exp(-frac(bpOf(t) * 2) * k);
const wob = (t, f = 1, ph = 0) => Math.sin((t * f + ph) * TAU);
function kf(t, keys, e = ease) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t < keys[i][0]) {
      const [a, va] = keys[i - 1], [b, vb] = keys[i], k = e((t - a) / (b - a));
      return Array.isArray(va) ? va.map((v, j) => lerp(v, vb[j], k)) : lerp(va, vb, k);
    }
  }
  return keys[keys.length - 1][1];
}
// in/out envelope: 0 before a, eases to 1 over fade, holds, eases back to 0 ending at b
const env = (t, a, b, fi = .4, fo = fi) => Math.min(ease(seg(t, a, a + fi)), 1 - ease(seg(t, b - fo, b)));
function hexRGB(h) { const p = parseInt(h.slice(1, 7), 16); return [(p >> 16) & 255, (p >> 8) & 255, p & 255]; }
function mixCol(a, b, k) {
  const pa = parseInt(a.slice(1, 7), 16), pb = parseInt(b.slice(1, 7), 16), c = i => Math.round(lerp((pa >> i) & 255, (pb >> i) & 255, clamp(k)));
  return '#' + ((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1);
}
const rgba = (h, a) => { const [r, g, b] = hexRGB(h); return `rgba(${r},${g},${b},${clamp(a)})`; };
const shakeXY = (t, amt) => { const f = Math.floor(t * 24); return [(hash(f * 1.7) - .5) * 2 * amt, (hash(f * 2.3 + 9) - .5) * 2 * amt]; };

// ---------- motion principles ----------
const spring = (t, t0, k = 6, w = 18) => t < t0 ? 0 : Math.exp(-k * (t - t0)) * Math.sin(w * (t - t0));
const ring = (t, evs, k = 6, w = 18) => evs.reduce((s, e) => s + spring(t, e, k, w), 0);
const onTwos = t => Math.floor(t * 12 + 1e-6) / 12;
const arcPt = (p0, p1, h, k) => [lerp(p0[0], p1[0], k), lerp(p0[1], p1[1], k) - h * 4 * k * (1 - k)];
function jump(t, t0, t1, h = 3) {
  if (t < t0 - .12) return { dy: 0, sq: 0 };
  if (t < t0) return { dy: 0, sq: .18 * ease(seg(t, t0 - .12, t0)) };
  if (t < t1) { const k = (t - t0) / (t1 - t0); return { dy: -h * 4 * k * (1 - k), sq: -.16 * Math.abs(1 - 2 * k) }; }
  const a = t - t1; return { dy: 0, sq: .22 * Math.exp(-8 * a) * Math.cos(20 * a) };
}
function take(t, t0, amt = 1) {
  if (t < t0 - .1) return { sq: 0, dy: 0 };
  if (t < t0) return { sq: .12 * amt * ease(seg(t, t0 - .1, t0)), dy: 0 };
  const a = t - t0; return { sq: -.26 * amt * Math.exp(-6 * a) * Math.cos(16 * a), dy: -1.2 * amt * Math.exp(-7 * a) * Math.max(0, Math.cos(9 * a)) };
}
function stroll(t, t0, t1, x0, x1, u) {
  const x = lerp(x0, x1, ease(seg(t, t0, t1))), d = Math.abs(x - x0) / (4 * u), moving = t > t0 && t < t1;
  return { x, walk: d, view: moving ? 'q' : 'front', flip: x1 < x0, dy: moving ? -Math.abs(Math.sin(d * Math.PI)) * .5 : 0 };
}

// ---------- p5-style transform shims ----------
function push() { ctx.save(); }
function pop() { ctx.restore(); }
function translate(x, y) { ctx.translate(x, y); }
function rotate(a) { ctx.rotate(a); }
function scale(x, y = x) { ctx.scale(x || 1e-6, y || 1e-6); }
function resetMatrix() { ctx.setTransform(1, 0, 0, 1, 0, 0); }
// current linear scale of the transform (for screen-relative sampling)
function curScale() { const m = ctx.getTransform(); return Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1; }

// ---------- camera ----------
let CAM = null, LAST_CAM = null;
function camBegin(cx = W / 2, cy = H / 2, zoom = 1, rot = 0) { push(); translate(W / 2, H / 2); rotate(rot); scale(zoom); translate(-cx, -cy); CAM = LAST_CAM = { cx, cy, zoom, rot }; }
function camEnd() { pop(); CAM = null; }
function toScreen(x, y, cam = CAM) {
  if (!cam) return [x, y];
  const c = Math.cos(cam.rot), s = Math.sin(cam.rot), dx = (x - cam.cx) * cam.zoom, dy = (y - cam.cy) * cam.zoom;
  return [W / 2 + dx * c - dy * s, H / 2 + dx * s + dy * c];
}

// ---------- geometry ----------
function rectPts(x, y, w, h, j = 0) {
  return [[x + jit(j), y + jit(j)], [x + w / 2 + jit(j), y + jit(j) * .5], [x + w + jit(j), y + jit(j)],
          [x + w + jit(j) * .5, y + h / 2], [x + w + jit(j), y + h + jit(j)], [x + w / 2 + jit(j), y + h + jit(j) * .5],
          [x + jit(j), y + h + jit(j)], [x + jit(j) * .5, y + h / 2]];
}
function ellPts(cx, cy, rx, ry, n = 28, j = 0, rot = 0) {
  const p = []; for (let i = 0; i < n; i++) { const a = rot + i / n * TAU; p.push([cx + Math.cos(a) * rx + jit(j), cy + Math.sin(a) * ry + jit(j)]); } return p;
}
function rrPts(x, y, w, h, r, j = 0) {
  r = Math.min(r, w / 2, h / 2);
  const p = [], sg = 5, corner = (cx, cy, a0) => { for (let i = 0; i <= sg; i++) { const a = a0 + i / sg * Math.PI / 2; p.push([cx + Math.cos(a) * r + jit(j), cy + Math.sin(a) * r + jit(j)]); } };
  corner(x + w - r, y + r, -Math.PI / 2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, Math.PI / 2); corner(x + r, y + r, Math.PI);
  return p;
}
function starPts(cx, cy, r, inner = .38, n = 4, rot = -Math.PI / 2) {
  const p = []; for (let i = 0; i < n * 2; i++) { const a = rot + i * Math.PI / n, q = i % 2 ? r * inner : r; p.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q]); } return p;
}
function heartPtsC(cx, cy, r, n = 22) {
  const p = []; for (let i = 0; i < n; i++) { const a = i / n * TAU; p.push([cx + 16 * Math.pow(Math.sin(a), 3) * r / 16, cy - (13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * r / 16]); } return p;
}
// Catmull-Rom through P (open), n samples per span
function through(P, n = 6) {
  if (P.length < 3) return P.slice();
  const out = [];
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const u = k / n, u2 = u * u, u3 = u2 * u;
      out.push([0, 1].map(d => .5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u3)));
    }
  }
  out.push(P[P.length - 1]);
  return out;
}
// closed Catmull-Rom, blended with the raw polygon by k (0 = corners, 1 = fully smooth)
function throughClosed(P, k = 1, n = 5) {
  const N = P.length; if (N < 3 || k <= 0) return P.slice();
  const out = [];
  for (let i = 0; i < N; i++) {
    const p0 = P[(i - 1 + N) % N], p1 = P[i], p2 = P[(i + 1) % N], p3 = P[(i + 2) % N];
    for (let s = 0; s < n; s++) {
      const u = s / n, u2 = u * u, u3 = u2 * u;
      const c = [0, 1].map(d => .5 * (2 * p1[d] + (p2[d] - p0[d]) * u + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 + (3 * p1[d] - p0[d] - 3 * p2[d] + p3[d]) * u3));
      const l = [lerp(p1[0], p2[0], u), lerp(p1[1], p2[1], u)];
      out.push([lerp(l[0], c[0], k), lerp(l[1], c[1], k)]);
    }
  }
  return out;
}
function ribbon(P, w0, w1 = w0) {
  const C = through(P), n = C.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = C[Math.max(0, i - 1)], b = C[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, w = lerp(w0, w1, i / Math.max(1, n - 1)) / 2;
    L.push([C[i][0] - dy / d * w, C[i][1] + dx / d * w]); R.push([C[i][0] + dy / d * w, C[i][1] - dx / d * w]);
  }
  return L.concat(R.reverse());
}
function bbox(pts) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
}
function polyPath(pts) { const p = new Path2D(); p.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1]); p.closePath(); return p; }
// resample a polyline to a roughly even step
function resample(P, step, closed) {
  const Q = closed ? P.concat([P[0]]) : P, out = [Q[0]];
  let carry = 0;
  for (let i = 1; i < Q.length; i++) {
    const a = Q[i - 1], b = Q[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    let s = step - carry;
    while (s <= d) { const k = s / d; out.push([lerp(a[0], b[0], k), lerp(a[1], b[1], k)]); s += step; }
    carry = d - (s - step);
  }
  const last = Q[Q.length - 1], o = out[out.length - 1];
  if (Math.hypot(last[0] - o[0], last[1] - o[1]) > step * .3) out.push(last);
  return out;
}
// midpoint displacement: the deformation behind a watercolour layer
function deform(P, amt, iters = 2) {
  let Q = P;
  for (let it = 0; it < iters; it++) {
    const R = [];
    for (let i = 0; i < Q.length; i++) {
      const a = Q[i], b = Q[(i + 1) % Q.length], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      R.push(a);
      const m = amt * d * (random() - .5) * 1.6;
      const nx = -(b[1] - a[1]) / (d || 1), ny = (b[0] - a[0]) / (d || 1);
      R.push([(a[0] + b[0]) / 2 + nx * m, (a[1] + b[1]) / 2 + ny * m]);
    }
    Q = R;
  }
  return Q;
}

// ---------- textures (built once per process) ----------
let PIGMENT = null, PIGPAT = null, GRAINC = null, PAPERC = null;
let GRAIN = 1, POST = [], PAPER = true;   // per-frame style switches: grain strength, full-frame post passes
function lcg(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function makeTextures() {
  // pigment: soft blotches and fine granulation, as greyscale with alpha; multiplied inside every wash
  const S = 512; PIGMENT = createCanvas(S, S); const c = PIGMENT.getContext('2d'), rnd = lcg(3);
  for (let i = 0; i < 90; i++) {
    const x = rnd() * S, y = rnd() * S, r = 20 + rnd() * 90, g = c.createRadialGradient(x, y, 0, x, y, r), a = .06 + .1 * rnd();
    g.addColorStop(0, `rgba(70,50,40,${a})`); g.addColorStop(1, 'rgba(70,50,40,0)');
    for (const [ox, oy] of [[0, 0], [S, 0], [-S, 0], [0, S], [0, -S]]) { c.save(); c.translate(ox, oy); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
  }
  const id = c.getImageData(0, 0, S, S), d = id.data;
  for (let i = 0; i < d.length; i += 4) { if (rnd() < .22) { const v = rnd() * 60; d[i] = d[i] || 60; d[i + 1] = d[i + 1] || 45; d[i + 2] = d[i + 2] || 35; d[i + 3] = Math.min(255, d[i + 3] + v); } }
  c.putImageData(id, 0, 0);
  PIGPAT = ctx.createPattern(PIGMENT, 'repeat');
  // paper
  PAPERC = createCanvas(W, H); const p = PAPERC.getContext('2d'), r2 = lcg(11);
  p.fillStyle = PAL.paper; p.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) { const x = r2() * W, y = r2() * H, r = 120 + r2() * 380, gr = p.createRadialGradient(x, y, 0, x, y, r), a = .045 * r2(); gr.addColorStop(0, `rgba(160,125,80,${a})`); gr.addColorStop(1, 'rgba(160,125,80,0)'); p.fillStyle = gr; p.fillRect(x - r, y - r, 2 * r, 2 * r); }
  p.lineWidth = 1;
  for (let i = 0; i < 1400; i++) { const x = r2() * W, y = r2() * H, l = 6 + r2() * 26, a = r2() * TAU; p.strokeStyle = `rgba(110,88,60,${.035 + r2() * .06})`; p.beginPath(); p.moveTo(x, y); p.quadraticCurveTo(x + Math.cos(a + .6) * l * .5, y + Math.sin(a + .6) * l * .5, x + Math.cos(a) * l, y + Math.sin(a) * l); p.stroke(); }
  // grain + vignette, multiplied over the finished frame
  GRAINC = createCanvas(W, H); const g = GRAINC.getContext('2d'), r3 = lcg(5);
  const gd = g.createImageData(W, H), q = gd.data;
  for (let i = 0; i < q.length; i += 4) { const v = 255 - (r3() < .55 ? r3() * r3() * 34 : 0); q[i] = v; q[i + 1] = v - 1; q[i + 2] = v - 3; q[i + 3] = 255; }
  g.putImageData(gd, 0, 0);
  const vg = g.createRadialGradient(W / 2, H / 2, H * .45, W / 2, H / 2, H * 1.05); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(1, 'rgba(120,95,70,.35)');
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
}

// ---------- painting ----------
// paint(pts, o): one painted shape. o: wash/washOp (flat colour), fill/fillOp/bleed/tex/border (soft watercolour),
// hatch {d, a, c, w}, ink/sw/br (outline; ink: null for none), curv (0..1 smooth the outline).
function paint(pts, o = {}) {
  if (!pts || pts.length < 2) return;
  for (const p of pts) if (!isFinite(p[0]) || !isFinite(p[1])) return;
  const P = o.curv ? throughClosed(pts, o.curv) : pts;
  if (o.wash || o.fill || o.hatch || o.grad) {
    const path = polyPath(P);
    if (o.grad) { const [x0, y0, x1, y1] = o.gdir || [0, bbox(P).y0, 0, bbox(P).y1], g = ctx.createLinearGradient(x0, y0, x1, y1); o.grad.forEach(([st, c]) => g.addColorStop(st, c)); ctx.globalAlpha = (o.washOp ?? 255) / 255; ctx.fillStyle = g; ctx.fill(path); ctx.globalAlpha = 1; if ((o.tex ?? .5) > .05) washPath(path, P, o.grad[Math.floor(o.grad.length / 2)][1], (o.washOp ?? 255) / 255, o.tex ?? .5, true); }
    else if (o.wash) washPath(path, P, o.wash, (o.washOp ?? 255) / 255, o.tex ?? .5);
    if (o.fill) wcFill(P, o.fill, (o.fillOp ?? 170) / 255, o.bleed ?? .1, o.tex ?? .4, o.border ?? .35);
    if (o.hatch) hatchPath(path, P, o.hatch);
  }
  if (o.ink !== null) inkStroke(P, true, o.sw ?? 1, o.ink || PAL.ink, o.br || 'ink', 0);
}
function washPath(path, P, col, a, tex, noFill) {
  if (!noFill) { ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fill(path); }
  if (a > .3) {
    // pigment granulation, offset per shape so textures don't line up
    const bb = bbox(P), s = curScale();
    if (bb.w * s > 6 && bb.h * s > 6) {
      ctx.save(); ctx.clip(path); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a * (.22 + .3 * tex) * clamp(220 / Math.sqrt(bb.w * bb.h * s * s + 1), .45, 1.4);
      ctx.scale(1 / s, 1 / s); ctx.fillStyle = PIGPAT; const ox = hashS(col) * 512, oy = hashS(col + 'y') * 512;
      ctx.translate(-ox, -oy); ctx.fillRect(bb.x0 * s + ox - 4, bb.y0 * s + oy - 4, bb.w * s + 8, bb.h * s + 8); ctx.restore();
      // pooled edge: pigment collects at the rim of a wash
      ctx.globalAlpha = a * .32; ctx.strokeStyle = mixCol(col, PAL.ink, .35); ctx.lineWidth = 2.2 / s; ctx.stroke(path);
    }
  }
  ctx.globalAlpha = 1;
}
function wcFill(P, col, op, bleed, tex, border) {
  const bb = bbox(P), n = 5, s = curScale();
  if (bb.w * s < 2 && bb.h * s < 2) return;
  // a few layers, each a fresh deformation of the shape; many low-opacity layers read as soft watercolour
  const base = deform(P, bleed * .5, 1);
  ctx.fillStyle = col;
  for (let i = 0; i < n; i++) {
    const L = deform(base, bleed * (.6 + .5 * random()), 2);
    ctx.globalAlpha = op * .13;
    const path = polyPath(L); ctx.fill(path);
    if (border > .05 && i % 2 === 0) { ctx.globalAlpha = op * .16 * border; ctx.strokeStyle = mixCol(col, PAL.ink, .25); ctx.lineWidth = 1.6 / s; ctx.stroke(path); }
  }
  if (tex > .1 && bb.w * s > 8) {
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = op * tex * .45; ctx.clip(polyPath(base));
    ctx.scale(1 / s, 1 / s); ctx.fillStyle = PIGPAT; ctx.translate(hashS(col) * 512, 0);
    ctx.fillRect((bb.x0 * s) - 1000, (bb.y0 * s) - 1000, bb.w * s + 2000, bb.h * s + 2000); ctx.restore();
  }
  ctx.globalAlpha = 1;
}
function hatchPath(path, P, h) {
  const bb = bbox(P), d = h.d || 12, a = h.a || 0, col = h.c || PAL.ink, w = h.w || 1;
  ctx.save(); ctx.clip(path);
  const R = Math.hypot(bb.w, bb.h) / 2 + d, ca = Math.cos(a), sa = Math.sin(a);
  for (let k = -R; k <= R; k += d * (1 + (h.o && h.o.rand ? (random() - .5) * h.o.rand : 0))) {
    const x0 = bb.cx + (-R) * ca - k * sa, y0 = bb.cy + (-R) * sa + k * ca, x1 = bb.cx + R * ca - k * sa, y1 = bb.cy + R * sa + k * ca;
    inkStroke([[x0, y0], [x1, y1]], false, w * .5, col, 'inkfine', 0, .5);
  }
  ctx.restore();
}
// widths per brush, in world units for sw = 1
const BRUSH = { ink: { w: 2.3, taper: .5, wob: .25, a: .93 }, inkfine: { w: 1.25, taper: .5, wob: .15, a: .9 }, dry: { w: 6, taper: .4, wob: .5, a: .45, dry: true },
  '2B': { w: 1.6, taper: .3, wob: .2, a: .7 }, HB: { w: 1.1, taper: .3, wob: .15, a: .6 }, charcoal: { w: 4, taper: .3, wob: .4, a: .4, dry: true },
  marker: { w: 6, taper: .1, wob: .05, a: .85 }, pen: { w: 1.4, taper: .2, wob: .05, a: .95 }, cpencil: { w: 1.5, taper: .2, wob: .2, a: .6, dry: true } };
// A tapered ink stroke along P, filled as one outline (variable width + a slow wobble that boils).
function inkStroke(P, closed, sw, col, br = 'ink', curv = 0, alphaMul = 1) {
  const B = BRUSH[br] || BRUSH.ink, s = curScale(), w0 = B.w * sw * 1.05;
  if (w0 * s < .15) return;
  let Q = curv > 0 && !closed && P.length > 2 ? through(P, 5) : P;
  Q = resample(Q, Math.max(1.2, 5 / s), closed);
  const n = Q.length; if (n < 2) return;
  const ph = random() * TAU, ph2 = random() * TAU, fr = 1.5 + random() * 2;
  const L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = Q[Math.max(0, i - 1)], b = Q[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
    const k = i / (n - 1);
    // pressure: heavier at the start (1.15 → .75 like the kit's brush), tapering at both ends
    let p = lerp(1.15, .75, k) * (1 + .22 * Math.sin(ph + k * fr * TAU) + .1 * Math.sin(ph2 + k * 13));
    const te = B.taper * (closed ? .35 : 1);
    p *= lerp(1, Math.min(1, Math.min(k, 1 - k) * 9), te);
    const w = Math.max(.25 / s, w0 * p) / 2;
    const wb = B.wob * w0 * Math.sin(ph2 + k * 7);
    const nx = -dy / d, ny = dx / d;
    L.push([Q[i][0] + nx * (w + wb), Q[i][1] + ny * (w + wb)]); R.push([Q[i][0] - nx * (w - wb), Q[i][1] - ny * (w - wb)]);
  }
  ctx.globalAlpha = B.a * alphaMul; ctx.fillStyle = col;
  const path = new Path2D(); path.moveTo(L[0][0], L[0][1]);
  for (let i = 1; i < n; i++) path.lineTo(L[i][0], L[i][1]);
  for (let i = n - 1; i >= 0; i--) path.lineTo(R[i][0], R[i][1]);
  path.closePath(); ctx.fill(path);
  if (B.dry) { // bristle streaks
    ctx.globalAlpha = B.a * .5 * alphaMul; ctx.strokeStyle = col; ctx.lineWidth = Math.max(.5 / s, w0 * .12);
    for (let j = -2; j <= 2; j++) { ctx.beginPath(); for (let i = 0; i < n; i++) { const m = [(L[i][0] + R[i][0]) / 2, (L[i][1] + R[i][1]) / 2], k2 = .5 + j * .22; const x = lerp(R[i][0], L[i][0], k2), y = lerp(R[i][1], L[i][1], k2); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
  }
  ctx.globalAlpha = 1;
}
function inkLine(pts, sw = 1, col = PAL.ink, br = 'ink', curv = .5) {
  if (!pts || pts.length < 2) return;
  for (const p of pts) if (!isFinite(p[0]) || !isFinite(p[1])) return;
  inkStroke(pts, false, sw, col, br, curv);
}
// The kit's brush.* calls used by clawd.js (the halo): a minimal stand-in.
const brush = {
  _c: PAL.ink, _w: 1, _b: 'ink', _v: [],
  noFill() {}, noWash() {}, noHatch() {}, noStroke() {},
  set(b, c, w) { this._b = b; this._c = c; this._w = w; },
  beginShape() { this._v = []; }, vertex(x, y) { this._v.push([x, y]); },
  endShape(close) { inkStroke(this._v, !!close, this._w, this._c, this._b, 0); },
};

// ---------- light ----------
function glow(x, y, r, col = '#FFC766', a = 1) {
  if (a <= 0 || r < 1) return;
  const rr = r * (1 + jit(.03)), [cr, cg, cb] = hexRGB(col), g = ctx.createRadialGradient(x, y, 0, x, y, rr);
  [[0, 1], [.18, .8], [.45, .32], [.75, .08], [1, 0]].forEach(([s, v]) => g.addColorStop(s, `rgba(${cr},${cg},${cb},${v * .6 * clamp(a)})`));
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - rr, y - rr, 2 * rr, 2 * rr); ctx.restore();
}

// ---------- full-frame effects (screen space) ----------
function flash(k, col = '#FFFDF6') { if (k > .01) { ctx.save(); resetMatrix(); ctx.globalAlpha = clamp(k); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); } }
function fade(k, col = PAL.ink) { flash(k, col); }
function irisShape(pts, col = PAL.ink) {
  ctx.save(); const p = new Path2D(); p.moveTo(-200, -200); p.lineTo(W + 200, -200); p.lineTo(W + 200, H + 200); p.lineTo(-200, H + 200); p.closePath();
  p.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) p.lineTo(pts[i][0], pts[i][1]); p.closePath();
  ctx.fillStyle = col; ctx.fill(p, 'evenodd');
  ctx.restore();
  inkStroke(pts, true, 2, mixCol(col, '#000000', .3), 'ink', 0);
}
function iris(cx, cy, r, col = PAL.ink) { if (r < 4) { ctx.save(); ctx.fillStyle = col; ctx.fillRect(-200, -200, W + 400, H + 400); ctx.restore(); } else irisShape(ellPts(cx, cy, r, r, 48, r * .01), col); }
// fat paint strokes cover the frame (p 0 → .5), then drag off (.5 → 1); cut under full cover
function brushWipe(p, cols = [PAL.clayDk, PAL.clay]) {
  if (p <= 0 || p >= 1) return;
  const [c1, c2] = cols, n = 5, bh = (H + 420) / n + 40;
  push(); resetMatrix(); translate(W / 2, H / 2); rotate(-.1); translate(-W / 2, -H / 2);
  for (let i = 0; i < n; i++) {
    boilSeed('wipe' + i);
    const y0 = -230 + i * (H + 420) / n, d = [0, .14, .06, .18, .1][i];
    const q = p < .5 ? easeOut(clamp((p * 2 - d) / (1 - d))) : ease(clamp(((p - .5) * 2 - d) / (1 - d)));
    const x0 = p < .5 ? -300 : lerp(-300, W + 400, q), x1 = p < .5 ? lerp(-300, W + 400, q) : W + 400;
    if (x1 - x0 < 30) continue;
    const pts = [], rag = k => 40 + 50 * hash(i * 31 + k) + jit(12);
    for (let k = 0; k <= 8; k++) pts.push([lerp(x0, x1, k / 8), y0 + Math.sin(k * .9 + i) * 14 + jit(5)]);
    for (let k = 1; k < 9; k++) pts.push([x1 + rag(k) - 40, y0 + bh * k / 9]);
    for (let k = 8; k >= 0; k--) pts.push([lerp(x0, x1, k / 8), y0 + bh + Math.sin(k * .8 + i * 2) * 14 + jit(5)]);
    if (p >= .5) for (let k = 8; k > 0; k--) pts.push([x0 - rag(k + 20) + 40, y0 + bh * k / 9]);
    paint(pts, { wash: i % 2 ? c1 : c2, washOp: 255, ink: null, tex: .9 });
    for (let k = 0; k < 3; k++) inkLine([[x0 + 40, y0 + bh * (k + 1) / 4 + jit(6)], [x1 - 20, y0 + bh * (k + 1) / 4 + jit(6)]], 3, mixCol(i % 2 ? c1 : c2, PAL.cream, .25), 'dry', 0);
  }
  pop();
}

// ---------- lettering (composited after the shot, under the grain) ----------
let LETTERS = [];
function letter(txt, x, y, size, color, o = {}) {
  if (CAM && !o.screen) { [x, y] = toScreen(x, y); size *= CAM.zoom; o = { ...o, rot: (o.rot || 0) + CAM.rot }; if (o.maxW) o.maxW *= CAM.zoom; }
  LETTERS.push({ txt, x, y, size, color, ...o });
}
function sfx(txt, x, y, size, color, age, o = {}) {
  const life = o.life ?? 1.2; if (age < 0 || age > life) return;
  letter(txt, x, y, size, color, { pop: age * 5, rot: (o.rot ?? -.08) + Math.sin(age * 20) * .03 * (1 - age / life), alpha: 1 - seg(age, life - .25, life), ...o });
}
const FONTS = { marker: '"Permanent Marker"', hand: '"Patrick Hand"', kalam: '"Kalam"' };
function drawLetters(c) {
  for (const L of LETTERS) {
    const k = L.pop != null ? backOut(L.pop) : 1; if (k <= .01 || (L.alpha ?? 1) <= .01) continue;
    c.save(); c.translate(L.x, L.y); c.rotate(L.rot || 0); c.scale(k, k); c.globalAlpha = clamp(L.alpha ?? 1);
    const fam = FONTS[L.face || 'marker'] || L.face, wt = L.bold ? 'bold ' : '';
    c.font = `${wt}${L.size}px ${fam}`;
    c.textAlign = L.align || 'center'; c.textBaseline = 'middle';
    const lines = L.maxW ? wrapText(c, L.txt, L.maxW) : String(L.txt).split('\n'), lh = L.size * (L.lh || 1.15);
    const paintLines = (cc) => lines.forEach((ln, i) => {
      const yy = (i - (lines.length - 1) / 2) * lh;
      if (L.stroke) { cc.lineJoin = 'round'; cc.lineWidth = L.size * (L.strokeW || .14); cc.strokeStyle = L.stroke; cc.strokeText(ln, 0, yy); }
      if (L.shadow !== false && (L.face || 'marker') === 'marker') { cc.fillStyle = L.shadowCol || PAL.ink; const ga = cc.globalAlpha; cc.globalAlpha = ga * .9; cc.fillText(ln, L.size * .04, yy + L.size * .05); cc.globalAlpha = ga; }
      cc.fillStyle = L.color; cc.fillText(ln, 0, yy);
    });
    if (L.reveal != null && L.reveal < 1) {
      // write-on with a soft, feathered leading edge (never a hard cut through a letter), and the whole word fading
      // as it nears zero, so a title that leaves by un-writing dissolves instead of being chopped back letter by letter
      if (L.reveal <= 0) { c.restore(); continue; }
      const ws = lines.map(l => c.measureText(l).width), tot = ws.reduce((p, q) => p + q, 0) || 1, F = L.size * .9, M = c.getTransform();
      const bw = Math.ceil(Math.max(...ws) + L.size * 1.2), bh = Math.ceil(lines.length * lh + L.size * 1.2), sc = Math.min(2, Math.max(1, Math.hypot(M.a, M.b)));
      const tc = createCanvas(Math.max(2, Math.ceil(bw * sc)), Math.max(2, Math.ceil(bh * sc))), t2 = tc.getContext('2d');
      const ox = c.textAlign === 'left' ? -bw / 2 + L.size * .6 : c.textAlign === 'right' ? bw / 2 - L.size * .6 : 0;
      t2.scale(sc, sc); t2.translate(bw / 2 - ox, bh / 2); t2.font = c.font; t2.textAlign = c.textAlign; t2.textBaseline = 'middle';
      paintLines(t2);
      t2.globalCompositeOperation = 'destination-in';
      let left = L.reveal * (tot + F * lines.length);
      lines.forEach((ln, i) => { const w = ws[i], x0 = (c.textAlign === 'center' ? -w / 2 : c.textAlign === 'right' ? -w : 0), yy = (i - (lines.length - 1) / 2) * lh, edge = x0 + left - F;
        let fill = 'rgba(0,0,0,0)'; if (left >= w + F) fill = 'rgba(0,0,0,1)'; else if (left > 0) { const g = t2.createLinearGradient(edge, 0, edge + F, 0); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)'); fill = g; }
        t2.fillStyle = fill; t2.fillRect(x0 - L.size * .6, yy - lh / 2 - L.size * .1, w + L.size * 1.2, lh + L.size * .2); left -= w + F; });
      c.globalAlpha = clamp(L.alpha ?? 1) * easeInOut(clamp(L.reveal * 4));
      c.drawImage(tc, -bw / 2 + ox, -bh / 2, bw, bh);
    } else paintLines(c);
    c.restore();
  }
}
function wrapText(c, txt, maxW) {
  const out = [];
  for (const para of String(txt).split('\n')) {
    let line = '';
    for (const w of para.split(' ')) { const tr = line ? line + ' ' + w : w; if (c.measureText(tr).width > maxW && line) { out.push(line); line = w; } else line = tr; }
    out.push(line);
  }
  return out;
}
function flushLetters() { if (!LETTERS.length) return; ctx.save(); resetMatrix(); drawLetters(ctx); ctx.restore(); LETTERS = []; }

// ---------- images: blog figures and photos placed into the painted world ----------
// photo(name, cx, cy, w, o): a photo print with a paper border, tape and an ink edge. o: rot, border, tape, alpha,
// h (else aspect from the image), crop [sx, sy, sw, sh] in image px, k (0..1 pop-in scale), shadow.
function img(name) { const i = IMG[name]; if (!i) throw new Error('missing image ' + name); return i; }
function photo(name, cx, cy, w, o = {}) {
  const I = img(name), cr = o.crop || [0, 0, I.width, I.height], h = o.h || w * cr[3] / cr[2], k = o.k ?? 1;
  if (k <= .01) return;
  const bd = o.border ?? Math.max(6, w * .045), key = 'photo' + name + (o.key || '');
  boilSeed(key);
  push(); translate(cx, cy); rotate(o.rot || 0); scale(backOut(k) * (o.s || 1));
  if (o.shadow !== false) paint(rectPts(-w / 2 - bd + 8, -h / 2 - bd + 12, w + 2 * bd, h + 2 * bd, 2), { fill: PAL.ink, fillOp: 60, bleed: .03, tex: .1, border: 0, ink: null });
  if (bd > 0) paint(rectPts(-w / 2 - bd, -h / 2 - bd, w + 2 * bd, h + 2 * bd, 1.2), { wash: o.mat || PAL.cream, ink: PAL.ink, sw: o.sw ?? .8 });
  ctx.globalAlpha = o.alpha ?? 1;
  ctx.drawImage(I, cr[0], cr[1], cr[2], cr[3], -w / 2, -h / 2, w, h);
  ctx.globalAlpha = 1;
  if (bd <= 0) inkStroke(rectPts(-w / 2, -h / 2, w, h, .8), true, o.sw ?? .7, PAL.ink, 'inkfine');
  if (o.tape) { for (const s of o.tape === 2 ? [-1, 1] : [-1]) { push(); translate(s * w * .38, -h / 2 - bd * .6); rotate(s * .25 + jit(.03)); paint(rectPts(-w * .09, -bd * .9, w * .18, bd * 1.8, 1), { wash: '#EDE3C4', washOp: 200, ink: null }); pop(); } }
  pop();
}
// figure(name, cx, cy, w, o): a blog figure screenshot (white background) printed onto a painted card. The white
// becomes the card's paper colour (multiply), so it sits in the world. o: crop, card colour, pad, rot, k, h.
function figure(name, cx, cy, w, o = {}) {
  const I = img(name), cr = o.crop || [0, 0, I.width, I.height], h = o.h || w * cr[3] / cr[2], k = o.k ?? 1;
  if (k <= .01) return;
  const pad = o.pad ?? w * .035;
  boilSeed('fig' + name + (o.key || ''));
  push(); translate(cx, cy); rotate(o.rot || 0); scale(backOut(k) * (o.s || 1));
  if (o.shadow !== false) paint(rectPts(-w / 2 - pad + 10, -h / 2 - pad + 14, w + 2 * pad, h + 2 * pad, 2), { fill: PAL.ink, fillOp: 55, bleed: .03, tex: .1, border: 0, ink: null });
  paint(rectPts(-w / 2 - pad, -h / 2 - pad, w + 2 * pad, h + 2 * pad, 1.5), { wash: o.card || '#FBF6EC', ink: PAL.ink, sw: o.sw ?? .9 });
  ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = o.alpha ?? 1;
  ctx.drawImage(I, cr[0], cr[1], cr[2], cr[3], -w / 2, -h / 2, w, h); ctx.restore();
  if (o.tape) for (const s of [-1, 1]) { push(); translate(s * w * .42, -h / 2 - pad * .7); rotate(s * .3); paint(rectPts(-w * .05, -pad * .8, w * .1, pad * 1.6, 1), { wash: '#EDE3C4', washOp: 210, ink: null }); pop(); }
  pop();
}
// highlight a region of a figure already drawn at (cx, cy, w): a painted ring around [x, y, w, h] in image fractions
function figRing(cx, cy, w, h, r, k, col = PAL.berry, sw = 2.4) {
  if (k <= .01) return;
  const [fx, fy, fw, fh] = r, x = cx - w / 2 + fx * w, y = cy - h / 2 + fy * h, rw = fw * w, rh = fh * h;
  const P = ellPts(x + rw / 2, y + rh / 2, rw * .62, rh * .66, 40, 0, -1.2);
  const n = Math.max(2, Math.round(P.length * clamp(k * 1.08)));
  inkLine(P.slice(0, n).concat(k > .95 ? [P[0], P[1]] : []), sw, col, 'ink', 0);
}

// ---------- frame ----------
let T = 0;
function renderFrame(t) {
  T = t; LETTERS = []; CAM = LAST_CAM = null; GRAIN = 1; POST = []; PAPER = true;
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  BOILN = Math.floor(t * BOIL); CLAWD_N = 0; boilSeed('frame');
  ctx.drawImage(PAPERC, 0, 0);
  drawWorld(t);
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  for (const f of POST) { resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; f(); }   // full-frame style passes (before text, so titles stay crisp)
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  flushLetters();
  if (GRAIN > 0) { ctx.globalAlpha = GRAIN; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(GRAINC, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1; }
}
