// styles.js: the "teleport" toolkit. Each world in the film has its own look. Looks are built from
//   (1) full-frame post passes, pushed onto POST each frame (they run after the world is drawn, before text):
//       fxGray, fxPixelate, fxEngrave, fxNightVision, fxFilm, fxTiltShift, fxLetterbox, fxTint, fxHalftone
//   (2) flat drawing for graphic styles (cut paper, posters, pixel art, papercraft): flat(), cutout(), pix()
//   (3) recurring cast pieces that every world redraws in its own costume: vPortal(), knotBeast(), hatOn()

// ---------- helpers ----------
const _hex = c => { const n = parseInt(c.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
function _px(f) { const d = ctx.getImageData(0, 0, W, H); f(d.data); ctx.putImageData(d, 0, 0); }

// ---------- (1) post passes ----------
// grayscale with contrast; optional duotone (dark → light colours)
function fxGray(contrast = 1.25, dark = '#0E0E12', light = '#F4F1E8') {
  const a = _hex(dark), b = _hex(light);
  POST.push(() => _px(D => { for (let i = 0; i < D.length; i += 4) { let l = (D[i] * .3 + D[i + 1] * .59 + D[i + 2] * .11) / 255; l = clamp((l - .5) * contrast + .5); D[i] = a[0] + (b[0] - a[0]) * l; D[i + 1] = a[1] + (b[1] - a[1]) * l; D[i + 2] = a[2] + (b[2] - a[2]) * l; } }));
}
// a colour wash over everything (multiply or screen)
function fxTint(col, a = .3, mode = 'multiply') { POST.push(() => { ctx.save(); ctx.globalCompositeOperation = mode; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }); }
// chunky pixels; optional palette quantisation (nearest colour)
let _PIXC = null;
function fxPixelate(px = 6, palette = null) {
  POST.push(() => {
    const w = Math.ceil(W / px), h = Math.ceil(H / px);
    if (!_PIXC || _PIXC.width !== w) _PIXC = createCanvas(w, h);
    const c = _PIXC.getContext('2d'); c.imageSmoothingEnabled = true; c.drawImage(CANVAS, 0, 0, w, h);
    if (palette) { const P = palette.map(_hex), d = c.getImageData(0, 0, w, h), D = d.data; for (let i = 0; i < D.length; i += 4) { let best = 0, bd = 1e9; for (let j = 0; j < P.length; j++) { const dr = D[i] - P[j][0], dg = D[i + 1] - P[j][1], db = D[i + 2] - P[j][2], dd = dr * dr * .3 + dg * dg * .59 + db * db * .11; if (dd < bd) { bd = dd; best = j; } } D[i] = P[best][0]; D[i + 1] = P[best][1]; D[i + 2] = P[best][2]; } c.putImageData(d, 0, 0); }
    ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(_PIXC, 0, 0, w, h, 0, 0, w * px, h * px); ctx.restore();
  });
}
// copper-engraving: hatching lines whose thickness follows darkness; two crossing directions in the shadows
function fxEngrave(ink = '#2A2018', paper = '#EFE4CC', spacing = 7, tintK = .25) {
  const a = _hex(ink), b = _hex(paper);
  POST.push(() => _px(D => {
    for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i += 4) {
      const r = D[i], g = D[i + 1], bl = D[i + 2], l = (r * .3 + g * .59 + bl * .11) / 255;
      const u = ((x + y) % spacing) / spacing, v = ((x - y + 4096) % spacing) / spacing;
      const t1 = Math.abs(u - .5) * 2, t2 = Math.abs(v - .5) * 2;          // 0 at line centre, 1 between lines
      let ink1 = t1 < (1 - l) * 1.1 ? 1 : 0; if (l < .45 && t2 < (.45 - l) * 2) ink1 = 1; if (l < .12) ink1 = 1;
      const k = ink1 ? 0 : 1;
      // keep a little of the original colour so photos still read
      D[i] = (a[0] + (b[0] - a[0]) * k) * (1 - tintK) + r * tintK * (k ? 1 : .4);
      D[i + 1] = (a[1] + (b[1] - a[1]) * k) * (1 - tintK) + g * tintK * (k ? 1 : .4);
      D[i + 2] = (a[2] + (b[2] - a[2]) * k) * (1 - tintK) + bl * tintK * (k ? 1 : .4);
    }
  }));
}
// green night-vision camcorder: mono green, noise, scanlines, vignette, REC overlay and a timecode
function fxNightVision(t, o = {}) {
  POST.push(() => {
    _px(D => { let s = Math.floor(t * 24) * 7919; for (let i = 0, p = 0; i < D.length; i += 4, p++) { s = (s * 1103515245 + 12345) & 0x7fffffff; const n = (s / 0x7fffffff - .5) * 60, l = clamp(((D[i] * .3 + D[i + 1] * .59 + D[i + 2] * .11) * 1.25 + n) / 255), sc = (Math.floor(p / W) % 3 === 0) ? .82 : 1; D[i] = 30 * l * sc; D[i + 1] = 255 * l * sc; D[i + 2] = 70 * l * sc; } });
    const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .85); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.85)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = Math.floor(t * 2) % 2 ? '#FF3B30' : 'rgba(255,59,48,.2)'; ctx.beginPath(); ctx.arc(110, 90, 16, 0, TAU); ctx.fill();
    ctx.font = '40px monospace'; ctx.fillStyle = '#B8FFB0'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText('REC', 140, 92);
    const s = Math.floor(t), tc = `00:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(Math.floor(t * 24) % 24).padStart(2, '0')}`; ctx.textAlign = 'right'; ctx.fillText(tc, W - 100, 92);
    if (o.label) { ctx.textAlign = 'left'; ctx.fillText(o.label, 100, H - 90); }
    ctx.strokeStyle = '#B8FFB0'; ctx.lineWidth = 3; for (const [x, y, dx, dy] of [[80, 60, 1, 1], [W - 80, 60, -1, 1], [80, H - 60, 1, -1], [W - 80, H - 60, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + dy * 60); ctx.lineTo(x, y); ctx.lineTo(x + dx * 60, y); ctx.stroke(); }
  });
}
// old film: flicker, vertical scratches, dust specks, heavy vignette (for the 1930s cartoon and flashbacks)
function fxFilm(t, k = 1) {
  POST.push(() => {
    const f = Math.floor(t * 24), r = i => hash(f * 13.1 + i);
    ctx.save(); ctx.globalAlpha = .08 * k * r(1); ctx.fillStyle = r(2) > .5 ? '#FFFFFF' : '#000000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(20,20,20,.45)'; for (let i = 0; i < 3; i++) if (r(10 + i) > .55) { const x = r(20 + i) * W; ctx.lineWidth = 1 + r(30 + i) * 2; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + (r(40 + i) - .5) * 30, H); ctx.stroke(); } ctx.restore();
    ctx.save(); ctx.fillStyle = 'rgba(15,15,15,.7)'; for (let i = 0; i < 14; i++) if (r(50 + i) > .5) { ctx.beginPath(); ctx.arc(r(60 + i) * W, r(70 + i) * H, 1 + r(80 + i) * 4, 0, TAU); ctx.fill(); } ctx.restore();
    const g = ctx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .95); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.75 * k})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  });
}
// tilt-shift miniature: blur the top and bottom, boost saturation in the band
let _TSC = null;
function fxTiltShift(y0 = 380, y1 = 760, blur = 10) {
  POST.push(() => {
    if (!_TSC) _TSC = createCanvas(W, H); const c = _TSC.getContext('2d'); c.clearRect(0, 0, W, H); c.filter = `blur(${blur}px) saturate(1.25)`; c.drawImage(CANVAS, 0, 0); c.filter = 'none';
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(y0 / H, 'rgba(0,0,0,0)'); g.addColorStop(y1 / H, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
    c.globalCompositeOperation = 'destination-in'; c.fillStyle = g; c.fillRect(0, 0, W, H); c.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.filter = 'saturate(1.3) contrast(1.05)'; ctx.drawImage(CANVAS, 0, 0); ctx.restore(); ctx.drawImage(_TSC, 0, 0);
  });
}
function fxLetterbox(h = 110, col = '#000000') { POST.push(() => { ctx.fillStyle = col; ctx.fillRect(0, 0, W, h); ctx.fillRect(0, H - h, W, h); }); }
// newspaper / comic halftone dots in one ink
function fxHalftone(cell = 9, ink = '#1A1A1A', paper = '#F3EBDC', angle = .4) {
  POST.push(() => {
    const d = ctx.getImageData(0, 0, W, H), D = d.data; ctx.fillStyle = paper; ctx.fillRect(0, 0, W, H); ctx.fillStyle = ink;
    const ca = Math.cos(angle), sa = Math.sin(angle);
    for (let gy = -H; gy < H * 2; gy += cell) for (let gx = -W; gx < W * 2; gx += cell) { const x = gx * ca - gy * sa, y = gx * sa + gy * ca; if (x < 0 || y < 0 || x >= W || y >= H) continue; const i = (Math.floor(y) * W + Math.floor(x)) * 4, l = (D[i] * .3 + D[i + 1] * .59 + D[i + 2] * .11) / 255, r = cell * .62 * Math.sqrt(1 - l); if (r > .4) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); } }
  });
}

// ---------- (2) flat drawing ----------
// a flat shape with no watercolour: o.shadow = [dx, dy, col] for cut-paper / pop-up depth; o.line = outline colour
function flat(P, col, o = {}) {
  const path = new Path2D(); P.forEach((p, i) => i ? path.lineTo(p[0], p[1]) : path.moveTo(p[0], p[1])); path.closePath();
  if (o.shadow) { ctx.save(); ctx.translate(o.shadow[0], o.shadow[1]); ctx.fillStyle = o.shadow[2] || 'rgba(0,0,0,.28)'; ctx.fill(path); ctx.restore(); }
  if (o.grad) { const [x0, y0, x1, y1] = o.gdir; const g = ctx.createLinearGradient(x0, y0, x1, y1); o.grad.forEach(([s, c]) => g.addColorStop(s, c)); ctx.fillStyle = g; } else ctx.fillStyle = col;
  ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.fill(path); ctx.restore();
  if (o.line) { ctx.save(); ctx.strokeStyle = o.line; ctx.lineWidth = o.lw || 3; ctx.lineJoin = 'round'; ctx.stroke(path); ctx.restore(); }
  return path;
}
// a cut-paper shape: jittered (scissor) edges plus a soft paper shadow
function cutout(P, col, o = {}) { const J = P.flatMap((p, i) => { const q = P[(i + 1) % P.length], n = Math.max(1, Math.round(Math.hypot(q[0] - p[0], q[1] - p[1]) / 30)); const out = []; for (let k = 0; k < n; k++) { const u = k / n; out.push([lerp(p[0], q[0], u) + (hash(i * 31 + k) - .5) * (o.jag ?? 3), lerp(p[1], q[1], u) + (hash(i * 17 + k + 5) - .5) * (o.jag ?? 3)]); } return out; }); return flat(J, col, { shadow: o.shadow ?? [5, 7, 'rgba(0,0,0,.3)'], ...o }); }
// a pixel-art block grid: rows of strings, each char an index into pal ('.' = empty)
function pix(x, y, s, rows, pal) { rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const c = r[i]; if (c === '.' || c === ' ') continue; ctx.fillStyle = pal[c]; ctx.fillRect(Math.round(x + i * s), Math.round(y + j * s), Math.ceil(s), Math.ceil(s)); } }); }
// a photo placed flat (no paint), with optional frame/border and rotation
function photoFlat(name, x, y, w, h, o = {}) { const I = img(name), s = Math.min(I.width / w, I.height / h); ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(o.rot || 0); if (o.border) { ctx.fillStyle = o.borderCol || '#FBF6EC'; if (o.shadow !== false) { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 - o.border + 6, -h / 2 - o.border + 9, w + 2 * o.border, h + 2 * o.border + (o.polaroid ? o.border * 3 : 0)); ctx.restore(); } ctx.fillRect(-w / 2 - o.border, -h / 2 - o.border, w + 2 * o.border, h + 2 * o.border + (o.polaroid ? o.border * 3 : 0)); } if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.drawImage(I, (I.width - w * s) / 2, (I.height - h * s) / 2, w * s, h * s, -w / 2, -h / 2, w, h); ctx.restore(); }

// ---------- (3) recurring cast ----------
// the V portal: a V-shaped tear in the world. inner() draws the destination world (clipped). k = 0..1 opening.
function vPortal(x, y, w, h, k, inner, o = {}) {
  if (k <= 0) return; const kk = easeOut(clamp(k)), ww = w * kk, hh = h * (0.4 + .6 * kk), wob = t => 6 * Math.sin(T * 5 + t);
  const th = Math.min(ww, hh) * (o.thick ?? .34);   // the V's arm thickness
  const K = [[x - ww / 2, y - hh / 2], [x, y + hh / 2], [x + ww / 2, y - hh / 2], [x + ww / 2 - th, y - hh / 2], [x, y + hh / 2 - th * 1.7], [x - ww / 2 + th, y - hh / 2]];
  const P = []; K.forEach((p, i) => { const q = K[(i + 1) % K.length], n = 10; for (let j = 0; j < n; j++) { const u = j / n, jag = (j % 2 ? 1 : -1) * 7 * kk; P.push([lerp(p[0], q[0], u) + jag + wob(i * 10 + j), lerp(p[1], q[1], u) - jag + wob(i * 10 + j + 3)]); } });
  const path = new Path2D(); P.forEach((p, i) => i ? path.lineTo(p[0], p[1]) : path.moveTo(p[0], p[1])); path.closePath();
  glow(x, y, Math.max(ww, hh) * .8, o.glow || '#C9A0FF', .7 * kk);
  ctx.save(); ctx.clip(path); resetMatrix(); if (inner) inner(); ctx.restore();
  ctx.save(); ctx.strokeStyle = o.edge || '#F5E8FF'; ctx.lineWidth = 6; ctx.shadowColor = o.glow || '#C9A0FF'; ctx.shadowBlur = 30; ctx.stroke(path); ctx.restore();
  // sparks flying off the edges
  for (let i = 0; i < 18; i++) { const p = P[Math.floor(hash(i * 7.3) * P.length)], f = frac(T * 1.3 + hash(i)); glow(p[0] + (hash(i * 3) - .5) * 120 * f, p[1] - 80 * f, 10 * (1 - f), o.edge || '#F5E8FF', 1 - f); }
}
// the Knot: a trefoil rope creature with eyes; costume: null | 'fedora' | 'fur' | 'crown' | 'cap' ; loose 0..1 unravels it
function knotBeast(x, y, s, o = {}) {
  const N = 120, P = [], loose = o.loose || 0, col = o.col || '#C9A0D0', dk = o.dark || '#6A4A7A';
  for (let i = 0; i <= N; i++) { const q = i / N * TAU, kx = (Math.sin(q) + 2 * Math.sin(2 * q)) / 3, ky = (Math.cos(q) - 2 * Math.cos(2 * q)) / 3; P.push([x + s * lerp(kx, Math.cos(q) * .8, ease(loose)), y + s * lerp(ky, Math.sin(q) * .8, ease(loose))]); }
  if (o.fur) for (let i = 0; i < N; i += 2) { const p = P[i]; inkLine([[p[0], p[1]], [p[0] + (hash(i) - .5) * s * .3, p[1] + (hash(i + 1) - .3) * s * .3]], s * .03, dk, 'ink', .4); }
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = dk; ctx.lineWidth = s * .2; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = s * .14; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = s * .03; ctx.setLineDash([s * .08, s * .06]); ctx.stroke(); ctx.restore();
  if (loose < .6) {
    const bl = Math.floor(T * 2) % 9 === 0 ? .15 : 1, lk = o.look || [0, 0];
    for (const ex of [-.17, .17]) { ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = s * .015; ctx.beginPath(); ctx.ellipse(x + ex * s, y - .04 * s, .1 * s, .12 * s * bl, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(x + ex * s + lk[0] * .04 * s, y - .03 * s + lk[1] * .04 * s, .045 * s, .055 * s * bl, 0, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = s * .025; ctx.lineCap = 'round'; ctx.beginPath(); if (o.grin) { ctx.arc(x, y + .1 * s, .13 * s, .15 * Math.PI, .85 * Math.PI); } else { ctx.moveTo(x - .1 * s, y + .15 * s); ctx.quadraticCurveTo(x, y + .2 * s, x + .1 * s, y + .15 * s); } ctx.stroke();
  }
  if (o.hat) hatOn(o.hat, x, y - .42 * s, s * .9);
}
// hats and props for Clawd and the Knot in each world. (x, y) = top centre of the head.
function hatOn(kind, x, y, s) {
  ctx.save(); ctx.lineWidth = Math.max(2, s * .02); ctx.strokeStyle = PAL.ink; ctx.lineJoin = 'round';
  const fillS = (col, f) => { ctx.fillStyle = col; ctx.beginPath(); f(); ctx.fill(); ctx.stroke(); };
  if (kind === 'fedora') { fillS('#2A2A30', () => ctx.ellipse(x, y, s * .55, s * .1, 0, 0, TAU)); fillS('#3A3A42', () => { ctx.moveTo(x - s * .32, y); ctx.lineTo(x - s * .26, y - s * .32); ctx.quadraticCurveTo(x, y - s * .22, x + s * .26, y - s * .32); ctx.lineTo(x + s * .32, y); ctx.closePath(); }); ctx.fillStyle = '#8C2A2A'; ctx.fillRect(x - s * .31, y - s * .1, s * .62, s * .07); }
  if (kind === 'safari') { fillS('#D9C29A', () => ctx.ellipse(x, y, s * .6, s * .12, 0, 0, TAU)); fillS('#E3CFA6', () => ctx.ellipse(x, y - s * .1, s * .32, s * .22, 0, Math.PI, TAU)); }
  if (kind === 'beret') fillS(PAL.berry, () => ctx.ellipse(x + s * .05, y - s * .08, s * .4, s * .14, -.1, 0, TAU));
  if (kind === 'hard') { fillS('#F0BE46', () => ctx.ellipse(x, y - s * .02, s * .38, s * .3, 0, Math.PI, TAU)); fillS('#F0BE46', () => ctx.ellipse(x, y, s * .5, s * .07, 0, 0, TAU)); }
  if (kind === 'top') { fillS('#1A1A20', () => ctx.ellipse(x, y, s * .5, s * .09, 0, 0, TAU)); fillS('#1A1A20', () => ctx.rect(x - s * .28, y - s * .6, s * .56, s * .6)); ctx.fillStyle = PAL.berry; ctx.fillRect(x - s * .28, y - s * .16, s * .56, s * .1); }
  if (kind === 'crown') fillS('#F0BE46', () => { ctx.moveTo(x - s * .3, y); ctx.lineTo(x - s * .32, y - s * .3); ctx.lineTo(x - s * .15, y - s * .14); ctx.lineTo(x, y - s * .36); ctx.lineTo(x + s * .15, y - s * .14); ctx.lineTo(x + s * .32, y - s * .3); ctx.lineTo(x + s * .3, y); ctx.closePath(); });
  if (kind === 'party') fillS(PAL.sky, () => { ctx.moveTo(x - s * .22, y); ctx.lineTo(x, y - s * .55); ctx.lineTo(x + s * .22, y); ctx.closePath(); });
  if (kind === 'helmet') { fillS('#E9E4D6', () => ctx.ellipse(x, y - s * .05, s * .42, s * .34, 0, Math.PI, TAU)); ctx.fillStyle = '#9FD8FF'; ctx.globalAlpha = .6; ctx.beginPath(); ctx.ellipse(x, y + s * .25, s * .45, s * .4, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Clawd with a hat: head top is at y - 8u in his own units
function tourist(x, y, u, hat, o = {}) { clawd(x, y, u, o); if (hat) hatOn(hat, x + (o.flip ? -1 : 1) * (o.view === 'q' ? u * .6 : 0), y - u * 8.05, u * 9); }
function bg(col) { ctx.save(); resetMatrix(); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function vgrad(stops, y0 = 0, y1 = H) { ctx.save(); resetMatrix(); const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach(([s, c]) => g.addColorStop(s, c)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function txt(s, x, y, size, col, o = {}) { ctx.save(); ctx.font = `${o.weight || '900'} ${size}px ${o.font || 'sans-serif'}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; if (o.stroke) { ctx.lineWidth = o.sw || size * .12; ctx.strokeStyle = o.stroke; ctx.lineJoin = 'round'; ctx.strokeText(s, x, y); } ctx.fillStyle = col; if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(s, 0, 0); } else ctx.fillText(s, x, y); ctx.restore(); }
function dot(x, y, r, col, a = 1) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); }
// a glowing "neuron lamp": a lit orb with a photo inside (used in the cosmic and game-show worlds)
function lampOrb(x, y, r, im, k = 1) { glow(x, y, r * 2.4, '#FFD58A', .6 * k); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const I = img(im), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, x - r, y - r, 2 * r, 2 * r); ctx.restore(); ctx.save(); ctx.strokeStyle = '#FFE9B8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore(); }

// ---------- wayfinding: the passport stamp and the itinerary map ----------
// a rubber-stamp impression in Clawd's passport: ring, stop number, world name. Drawn in screen space.
function passStamp(num, name, x = 1720, y = 930, k = 1, o = {}) {
  if (k <= 0) return; const col = o.col || '#C2456A', r = 92, s = lerp(1.5, 1, easeOut(clamp(k)));
  ctx.save(); resetMatrix(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.16); ctx.scale(s, s); ctx.globalAlpha = .88 * clamp(k * 2);
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, r - 12, 0, TAU); ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '900 20px sans-serif'; ctx.fillText('STOP', 0, -44); ctx.font = '900 64px serif'; ctx.fillText(String(num), 0, 2);
  ctx.font = '800 17px sans-serif'; const words = name.toUpperCase(); ctx.fillText(words.length > 16 ? words.slice(0, 16) : words, 0, 48);
  // the ink is uneven: knock out a few specks
  ctx.globalCompositeOperation = 'destination-out'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc((hash(i * 3.1 + num) - .5) * 2 * r, (hash(i * 7.3 + num) - .5) * 2 * r, 1 + hash(i) * 3, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// the 16 stops of the tour, as [name, act]
const STOPS = [['deep space', 1], ['toy town', 1], ['cartoon reel', 1], ['film noir', 2], ['spy titles', 2], ['foggy London', 2], ['botany', 2], ['game show', 2], ['cryptid hunt', 2], ['pixel city', 3], ['pop-up book', 3], ['darts', 3], ['savanna', 3], ['globe', 4], ["world's fair", 4], ['jungle', 4]];
