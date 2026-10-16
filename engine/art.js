// art.js: hand-built illustrated pieces for the teleport worlds, drawn as crisp vector shapes (bezier paths, gradients,
// clipped detail) rather than the watercolour brush, so they read clearly at full size.
//   limb(), taper()            outline builders
//   tigerArt(x, y, s, o)       a side-view tiger: anatomy, striping, ruff, walk cycle, o.deer (deer-vision recolour)
//   rLeaf / rPlant / rousseau  Henri-Rousseau-style jungle foliage in depth layers
//   meerkat, grazer            the two "circuit" animals of the savanna documentary

// ---------- outline builders ----------
// a tapered ribbon along a smooth curve through pts, widths per point (interpolated); returns a closed polygon
function taper(pts, widths, n = 10) {
  const C = through(pts, n), L = [], R = [];
  for (let i = 0; i < C.length; i++) {
    const a = C[Math.max(0, i - 1)], b = C[Math.min(C.length - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
    const u = i / (C.length - 1), j = u * (widths.length - 1), k = Math.floor(j), w = lerp(widths[k], widths[Math.min(widths.length - 1, k + 1)], j - k) / 2;
    L.push([C[i][0] - dy / d * w, C[i][1] + dx / d * w]); R.push([C[i][0] + dy / d * w, C[i][1] - dx / d * w]);
  }
  return L.concat(R.reverse());
}
const limb = taper;
function pathOf(P, close = true) { const p = new Path2D(); P.forEach((q, i) => i ? p.lineTo(q[0], q[1]) : p.moveTo(q[0], q[1])); if (close) p.closePath(); return p; }
function fillPath(p, fill, stroke, lw = 3) { if (fill) { ctx.fillStyle = fill; ctx.fill(p); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(p); } }
function lgrad(x0, y0, x1, y1, stops) { const g = ctx.createLinearGradient(x0, y0, x1, y1); stops.forEach(([s, c]) => g.addColorStop(s, c)); return g; }

// ---------- the tiger ----------
// facing right, ground at y = 0 in tiger units (body ~640 long); o.walk = phase (cycles per unit), o.deer 0..1, o.look 0..1 (head turn toward viewer)
function tigerArt(x, y, s, o = {}) {
  const dv = clamp(o.deer || 0), C = c => dv > 0 ? mixCol(c, ({ '#C8561A': '#6E7A3A', '#E8822A': '#8A9448', '#F2A24A': '#A2A85A', '#F7E6C8': '#C9CFA4', '#FFFFFF': '#DDE3C0' })[c] || c, dv) : c;
  const ORA = C('#E8822A'), ORA_D = C('#C8561A'), ORA_L = C('#F2A24A'), CREAM = C('#F7E6C8'), WHITE = C('#FFFFFF'), INK = '#1A1210', OUT = '#3A1A0A';
  const ph = o.walk ?? 0, sw = (k) => Math.sin((ph + k) * TAU);
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
  // ground shadow
  ctx.fillStyle = 'rgba(20,30,10,.28)'; ctx.beginPath(); ctx.ellipse(-20, 4, 300, 22, 0, 0, TAU); ctx.fill();
  // legs: [hip/shoulder, knee, ankle, paw] swing with the walk; far legs first (darker)
  const leg = (top, mid, low, foot, wd, phase, far) => {
    const a = sw(phase) * .28, rot = (p) => { const dx = p[0] - top[0], dy = p[1] - top[1]; return [top[0] + dx * Math.cos(a) - dy * Math.sin(a), top[1] + dx * Math.sin(a) + dy * Math.cos(a)]; };
    const lift = Math.max(0, -sw(phase)) * 16, P = [top, rot(mid), rot(low), [rot(foot)[0], Math.min(-4, rot(foot)[1] - lift)]];
    const body = pathOf(limb(P, wd));
    fillPath(body, lgrad(0, top[1], 0, 0, [[0, far ? C('#B04A14') : ORA], [.75, far ? C('#C86A2A') : ORA_L], [1, far ? C('#D9C2A0') : CREAM]]), OUT, 3);
    // leg stripes: short bands across the upper leg
    ctx.save(); ctx.clip(body); ctx.strokeStyle = INK; ctx.lineCap = 'round';
    for (let i = 0; i < 4; i++) { const q = through(P, 6), p = q[Math.floor((i + .7) / 6 * (q.length - 1))]; ctx.lineWidth = 9 - i * 1.5; ctx.beginPath(); ctx.moveTo(p[0] - 40, p[1] - 6 + i * 3); ctx.quadraticCurveTo(p[0], p[1] + 6, p[0] + 40, p[1] - 4); ctx.stroke(); }
    ctx.restore();
    const pw = P[3]; fillPath((() => { const p = new Path2D(); p.ellipse(pw[0] + 16, pw[1] + 2, 42, 17, 0, 0, TAU); return p; })(), far ? C('#D9C2A0') : CREAM, OUT, 3);
    for (const tx of [6, 20, 34]) { ctx.strokeStyle = OUT; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(pw[0] + tx, pw[1] + 6); ctx.lineTo(pw[0] + tx + 2, pw[1] + 15); ctx.stroke(); }
  };
  leg([-150, -200], [-95, -150], [-125, -78], [-132, -8], [100, 66, 38, 34], .5, true);   // hind far
  leg([118, -200], [126, -140], [130, -66], [134, -8], [92, 66, 50, 46], 0, true);       // front far
  leg([-190, -200], [-140, -146], [-175, -74], [-184, -8], [116, 72, 40, 36], 0, false);   // hind near
  leg([160, -200], [172, -136], [178, -64], [184, -8], [96, 70, 52, 48], .5, false);       // front near
  // tail: hangs, then curls up at the tip, swaying
  const tsw = Math.sin(ph * TAU * .5) * 14;
  const TP = [[-245, -212], [-318, -200], [-356, -140], [-350 + tsw * .3, -78], [-322 + tsw, -48], [-300 + tsw, -60]];
  const tail = pathOf(taper(TP, [34, 28, 24, 21, 18, 16]));
  fillPath(tail, ORA, OUT, 3);
  ctx.save(); ctx.clip(tail); const TC = through(TP, 8); for (let i = 2; i < TC.length; i += 5) { const p = TC[i]; ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(p[0], p[1], 20, 7, Math.atan2(TC[Math.min(TC.length - 1, i + 1)][1] - p[1], TC[Math.min(TC.length - 1, i + 1)][0] - p[0]) + Math.PI / 2, 0, TAU); ctx.fill(); } const tip = TC[TC.length - 1]; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(tip[0], tip[1], 22, 0, TAU); ctx.fill(); ctx.restore();
  // torso
  const B = new Path2D();
  B.moveTo(-250, -215); B.bezierCurveTo(-235, -262, -150, -284, -60, -282); B.bezierCurveTo(40, -279, 110, -296, 165, -286);
  B.bezierCurveTo(205, -278, 228, -252, 236, -226); B.bezierCurveTo(244, -186, 226, -150, 198, -136);
  B.bezierCurveTo(130, -114, -40, -118, -150, -128); B.bezierCurveTo(-215, -134, -262, -158, -270, -190); B.bezierCurveTo(-272, -202, -263, -211, -250, -215); B.closePath();
  fillPath(B, lgrad(0, -290, 0, -115, [[0, ORA_D], [.35, ORA], [.72, ORA_L], [.86, CREAM], [1, CREAM]]), null);
  // stripes on the torso: tapered dark strokes that curve down the flank, some forked
  ctx.save(); ctx.clip(B); ctx.fillStyle = INK;
  for (let i = 0; i < 17; i++) {
    const sx = -235 + i * 27 + (hash(i * 3.3) - .5) * 10, top = -292, len = 70 + 70 * hash(i * 7.1), bend = 18 + 14 * hash(i), w0 = 15 + 8 * hash(i * 2);
    ctx.beginPath(); ctx.moveTo(sx - w0 / 2, top); ctx.quadraticCurveTo(sx - bend, top + len * .55, sx + 6, top + len); ctx.quadraticCurveTo(sx - bend + w0 * .9, top + len * .5, sx + w0 / 2, top); ctx.closePath(); ctx.fill();
    if (hash(i * 9) > .55) { const fy = top + len * .45; ctx.beginPath(); ctx.moveTo(sx - bend * .6, fy); ctx.quadraticCurveTo(sx - bend * .6 + 22, fy + 22, sx + 18, fy + 40); ctx.lineTo(sx - bend * .6 + 8, fy + 6); ctx.closePath(); ctx.fill(); }
  }
  for (let i = 0; i < 9; i++) { const sx = -200 + i * 45, y0 = -150; ctx.beginPath(); ctx.moveTo(sx, y0 + 30); ctx.quadraticCurveTo(sx + 10, y0, sx + 18, y0 + 30); ctx.closePath(); ctx.fill(); }   // belly flecks
  // soft shading along the spine
  ctx.fillStyle = lgrad(0, -295, 0, -230, [[0, 'rgba(90,30,0,.25)'], [1, 'rgba(90,30,0,0)']]); ctx.fill(B);
  ctx.restore();
  fillPath(B, null, OUT, 3.5);
  // muscle contours: the hind thigh and the shoulder blade, drawn as soft lines over the coat
  ctx.strokeStyle = 'rgba(58,26,10,.7)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-232, -238); ctx.bezierCurveTo(-200, -280, -120, -250, -128, -150); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, -276); ctx.bezierCurveTo(150, -240, 196, -210, 176, -140); ctx.stroke();
  // head (turns a little toward us with o.look)
  ctx.save(); ctx.translate(250, -250); ctx.rotate(-.04 + .06 * Math.sin(ph * TAU)); ctx.scale(1.12, 1.12); ctx.translate(-262, 252);
  const Hd = new Path2D();
  Hd.moveTo(205, -278); Hd.bezierCurveTo(212, -326, 292, -336, 324, -304); Hd.bezierCurveTo(346, -284, 352, -260, 350, -244);
  Hd.bezierCurveTo(374, -236, 384, -214, 370, -198); Hd.bezierCurveTo(352, -180, 318, -176, 296, -184);
  Hd.bezierCurveTo(266, -172, 230, -184, 214, -204); Hd.bezierCurveTo(198, -226, 197, -256, 205, -278); Hd.closePath();
  // ears behind the head
  for (const [ex, ey, r] of [[226, -306, .72], [262, -322, .66]]) { const E = new Path2D(); E.moveTo(ex - 22 * r, ey + 14); E.quadraticCurveTo(ex - 20 * r, ey - 26 * r, ex + 4, ey - 26 * r); E.quadraticCurveTo(ex + 26 * r, ey - 22 * r, ex + 22 * r, ey + 14); E.closePath(); fillPath(E, INK, OUT, 3); ctx.fillStyle = WHITE; ctx.beginPath(); ctx.ellipse(ex + 1, ey - 6 * r, 9 * r, 11 * r, 0, 0, TAU); ctx.fill(); }
  fillPath(Hd, lgrad(0, -335, 0, -175, [[0, ORA_D], [.4, ORA], [.8, ORA_L], [1, CREAM]]), null);
  ctx.save(); ctx.clip(Hd);
  // white cheek ruff and muzzle
  ctx.fillStyle = WHITE; const RF = new Path2D(); RF.moveTo(214, -230); for (let i = 0; i <= 8; i++) { const u = i / 8; RF.lineTo(lerp(206, 300, u) + (i % 2 ? -6 : 6), lerp(-226, -178, u) + (i % 2 ? 14 : -2)); } RF.lineTo(330, -190); RF.lineTo(320, -228); RF.closePath(); ctx.fill(RF);
  ctx.beginPath(); ctx.ellipse(348, -212, 34, 22, -.1, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.ellipse(316, -276, 22, 10, -.2, 0, TAU); ctx.fill();   // brow patch
  // head stripes: forehead, cheeks
  ctx.fillStyle = INK;
  for (let i = 0; i < 4; i++) { const fx = 268 + i * 14; ctx.beginPath(); ctx.moveTo(fx, -332); ctx.quadraticCurveTo(fx + 4, -310, fx - 2, -292 + i * 2); ctx.lineTo(fx + 6, -296 + i * 2); ctx.quadraticCurveTo(fx + 10, -312, fx + 8, -332); ctx.closePath(); ctx.fill(); }
  for (let i = 0; i < 3; i++) { const cy = -252 + i * 16; ctx.beginPath(); ctx.moveTo(214, cy); ctx.quadraticCurveTo(244, cy - 8, 268, cy + 4); ctx.quadraticCurveTo(244, cy + 2, 214, cy + 8); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  fillPath(Hd, null, OUT, 3.5);
  // eye, nose, mouth, whiskers
  ctx.fillStyle = C('#F3C33A'); ctx.beginPath(); ctx.moveTo(300, -262); ctx.quadraticCurveTo(316, -276, 334, -264); ctx.quadraticCurveTo(318, -252, 300, -262); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.stroke();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(319, -264, 3.5, 7, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(322, -267, 2, 0, TAU); ctx.fill();
  ctx.fillStyle = C('#B8604A'); ctx.beginPath(); ctx.moveTo(364, -232); ctx.lineTo(384, -228); ctx.quadraticCurveTo(382, -214, 372, -212); ctx.closePath(); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(374, -210); ctx.quadraticCurveTo(368, -196, 350, -196); ctx.moveTo(374, -210); ctx.quadraticCurveTo(378, -198, 388, -198); ctx.stroke();
  ctx.fillStyle = INK; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(346 + (i % 3) * 9, -214 + Math.floor(i / 3) * 8, 1.8, 0, TAU); ctx.fill(); }
  ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = 1.6; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(352, -210 + i * 5); ctx.quadraticCurveTo(400, -222 + i * 10, 440, -214 + i * 18); ctx.stroke(); }
  ctx.restore();
  ctx.restore();
}

// ---------- Rousseau jungle ----------
// a single leaf: type 'lance' (long pointed), 'paddle' (banana, split edges), 'round', 'heart'
function rLeaf(x, y, len, ang, type, col, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  const w = len * ({ lance: .16, paddle: .34, round: .5, heart: .42 })[type], P = new Path2D();
  if (type === 'round') { P.ellipse(len * .5, 0, len * .5, w, 0, 0, TAU); }
  else if (type === 'heart') { P.moveTo(0, 0); P.bezierCurveTo(len * .15, -w * 1.2, len * .8, -w, len, 0); P.bezierCurveTo(len * .8, w, len * .15, w * 1.2, 0, 0); }
  else { P.moveTo(0, 0); P.bezierCurveTo(len * .25, -w, len * .7, -w * .9, len, 0); P.bezierCurveTo(len * .7, w * .9, len * .25, w, 0, 0); }
  const lt = mixCol(col, '#E8F0A0', .28), dk = mixCol(col, '#0A1A0A', .35);
  ctx.fillStyle = lgrad(0, -w, 0, w, [[0, lt], [.5, col], [1, dk]]); ctx.fill(P);
  ctx.save(); ctx.clip(P);
  // veins: Rousseau paints them as neat light lines
  ctx.strokeStyle = mixCol(col, '#F0F4C0', .45); ctx.lineWidth = Math.max(1, len * .012); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * .5, -w * .08, len, 0); ctx.stroke();
  ctx.lineWidth = Math.max(.8, len * .006);
  for (let i = 1; i < (type === 'paddle' ? 14 : 8); i++) { const u = i / (type === 'paddle' ? 14 : 8); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(len * u, 0); ctx.quadraticCurveTo(len * (u + .06), sd * w * .5, len * (u + .1), sd * w); ctx.stroke(); } }
  // split edges on banana leaves
  if (type === 'paddle') { ctx.strokeStyle = o.bg || '#C9D9A0'; ctx.lineWidth = Math.max(2, len * .012); for (let i = 0; i < 5; i++) { const u = .2 + hash(i * 3 + len) * .7, sd = hash(i * 7 + len) > .5 ? 1 : -1; ctx.beginPath(); ctx.moveTo(len * u, sd * w * .3); ctx.lineTo(len * (u + .1), sd * w * 1.1); ctx.stroke(); } }
  ctx.restore();
  ctx.strokeStyle = dk; ctx.lineWidth = Math.max(1, len * .008); ctx.stroke(P);
  ctx.restore();
}
// a plant: a fan of leaves from one base point
function rPlant(x, y, s, type, col, o = {}) {
  const n = o.n ?? 7, spread = o.spread ?? 1.6, base = o.ang ?? -Math.PI / 2;
  for (let i = 0; i < n; i++) { const u = n > 1 ? i / (n - 1) - .5 : 0, a = base + u * spread + (hash(i * 3.7 + x) - .5) * .25 + (o.sway || 0) * Math.sin(T * .9 + i + x * .01), L = s * (.75 + .35 * hash(i * 1.9 + y)) * (1 - Math.abs(u) * .4);
    if (o.stem !== false) { ctx.strokeStyle = mixCol(col, '#0A1A0A', .3); ctx.lineWidth = Math.max(1.5, s * .025); ctx.beginPath(); ctx.moveTo(x, y); const sx = x + Math.cos(a) * L * .35, sy = y + Math.sin(a) * L * .35; ctx.quadraticCurveTo(x + Math.cos(a) * L * .2, y + Math.sin(a) * L * .25, sx, sy); ctx.stroke(); rLeaf(sx, sy, L * .75, a + (u * .3), type, mixCol(col, ['#1E3A1E', '#4A7A3A', '#7A9A4A'][i % 3], .2), o); }
    else rLeaf(x, y, L, a, type, mixCol(col, ['#1E3A1E', '#4A7A3A', '#7A9A4A'][i % 3], .2), o); }
}
function rFlower(x, y, r, col) { for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + .3; ctx.fillStyle = lgrad(x, y - r, x, y + r, [[0, mixCol(col, '#FFFFFF', .3)], [1, mixCol(col, '#000000', .2)]]); ctx.beginPath(); ctx.ellipse(x + Math.cos(a) * r * .55, y + Math.sin(a) * r * .55, r * .55, r * .28, a, 0, TAU); ctx.fill(); } ctx.fillStyle = '#F3D36B'; ctx.beginPath(); ctx.arc(x, y, r * .22, 0, TAU); ctx.fill(); }
// the whole backdrop: sky, distant pale trees, then layers of plants from far (pale) to near (dark). Returns a function
// that draws the foreground layer (call it after the animals, so they stand inside the jungle).
function rousseau(t, o = {}) {
  const bg = o.bg || '#DDE3B0';
  ctx.save(); resetMatrix(); ctx.fillStyle = lgrad(0, 0, 0, H, [[0, o.sky0 || '#BFD8B8'], [.55, o.sky1 || '#E9E6B8'], [1, '#C9D9A0']]); ctx.fillRect(0, 0, W, H); ctx.restore();
  if (o.moon !== false) { glow(o.mx ?? 1500, o.my ?? 210, 220, '#FFF6D0', .6); ctx.fillStyle = '#F8EFC8'; ctx.beginPath(); ctx.arc(o.mx ?? 1500, o.my ?? 210, 86, 0, TAU); ctx.fill(); }
  // distant palms: tall leaning trunks with fans of pale fronds
  for (let i = 0; i < 8; i++) {
    const x = 80 + hash(i * 4.1) * (W - 160), top = 160 + hash(i * 2.3) * 200, lean = (hash(i * 5.5) - .5) * 120, c = mixCol('#8FAE8A', '#DDE3B0', .35 + .2 * hash(i));
    ctx.strokeStyle = mixCol(c, '#5A7A5A', .25); ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, 1000); ctx.quadraticCurveTo(x + lean * .3, (top + 1000) / 2, x + lean, top); ctx.stroke();
    for (let k = 0; k < 9; k++) { const a = -Math.PI / 2 + (k / 8 - .5) * 3.2 + .1 * Math.sin(t * .6 + k); rLeaf(x + lean, top, 150 + 40 * hash(k + i), a, 'lance', c); }
  }
  // hanging vines from the top
  for (let i = 0; i < 7; i++) { const x = hash(i * 8.8) * W, len = 200 + 260 * hash(i * 1.1); ctx.strokeStyle = '#4A6A3A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, -10); ctx.quadraticCurveTo(x + 30 * Math.sin(t * .5 + i), len * .5, x + 10, len); ctx.stroke(); for (let k = 1; k < 6; k++) rLeaf(x + 6, len * k / 6, 34, (k % 2 ? .5 : 2.6), 'heart', '#4E7A3A'); }
  const layer = (depth, count, seed) => {
    const fade = 1 - depth;   // 0 near … 1 far
    for (let i = 0; i < count; i++) {
      const r = j => hash(seed * 91 + i * 7 + j), x = depth >= 1 && o.clear ? (i % 2 ? r(1) * 560 - 120 : W - r(1) * 560 + 120) : r(1) * (W + 200) - 100, y = 1080 + 40 - depth * 0 - r(2) * (520 - depth * 260), s = (140 + 220 * r(3)) * (.55 + depth * .6);
      const front = depth >= 1, type = front ? ['lance', 'paddle', 'lance', 'heart'][Math.floor(r(4) * 4)] : ['lance', 'paddle', 'heart', 'lance', 'round'][Math.floor(r(4) * 5)], base = ['#1E3A1E', '#2E5A2E', '#4A7A3A', '#3A6A3A', '#6E8A3A'][Math.floor(r(5) * 5)];
      const col = mixCol(base, '#C9D9A8', fade * .55);
      rPlant(x, y, s, type, col, { n: type === 'paddle' ? 4 : 7, spread: type === 'paddle' ? 1.2 : 1.9, sway: .04, bg, stem: type !== 'round' });
      if (r(6) > .82 && depth > .3) rFlower(x + (r(7) - .5) * s * .6, y - s * .6, 18 * (.6 + depth), ['#D2473F', '#F2B04A', '#F3E2E8', '#E8668A'][Math.floor(r(8) * 4)]);
    }
  };
  layer(.25, 14, 1); layer(.5, 14, 2); layer(.75, 12, 3);
  // grasses along the floor
  for (let i = 0; i < 60; i++) { const x = hash(i * 1.3) * W, h = 60 + 80 * hash(i * 2.7); ctx.strokeStyle = mixCol('#2E5A2E', '#9AB86A', hash(i * 5)); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, 1090); ctx.quadraticCurveTo(x + 10, 1090 - h * .6, x + 24 * (hash(i) - .3), 1090 - h); ctx.stroke(); }
  return () => layer(1, o.front ?? 7, 4);
}

// ---------- savanna documentary animals ----------
// the narrow circuit: a tiny meerkat standing up, clutching a single pixel
function meerkat(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const OUT = '#3A2A1A', fur = o.fur || '#C9A878', dk = '#8C6A48';
  ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 40, 7, 0, 0, TAU); ctx.fill();
  const tail = pathOf(taper([[-10, -30], [-34, -14], [-48, -2]], [16, 10, 6])); fillPath(tail, fur, OUT, 2.5);
  // haunches and hind feet, then a curved bean of a body standing upright
  fillPath((() => { const p = new Path2D(); p.ellipse(-4, -26, 30, 26, 0, 0, TAU); return p; })(), fur, OUT, 3);
  for (const fx of [-18, 14]) fillPath((() => { const p = new Path2D(); p.ellipse(fx, -3, 16, 6, 0, 0, TAU); return p; })(), dk, OUT, 2);
  const body = new Path2D(); body.moveTo(-26, -24); body.bezierCurveTo(-34, -70, -26, -118, -8, -142); body.bezierCurveTo(10, -150, 26, -128, 24, -96); body.bezierCurveTo(22, -60, 30, -36, 18, -18); body.bezierCurveTo(6, -6, -18, -8, -26, -24); body.closePath();
  fillPath(body, lgrad(0, -150, 0, 0, [[0, fur], [1, mixCol(fur, '#F3E6CC', .4)]]), OUT, 3);
  fillPath((() => { const p = new Path2D(); p.ellipse(8, -72, 10, 36, .08, 0, TAU); return p; })(), mixCol(fur, '#F3E6CC', .65), null);
  ctx.strokeStyle = 'rgba(90,60,30,.5)'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-24 + i, -110 + i * 14); ctx.quadraticCurveTo(-14, -104 + i * 14, -6, -108 + i * 14); ctx.stroke(); }
  // head
  const hd = new Path2D(); hd.moveTo(-14, -146); hd.bezierCurveTo(-18, -176, 10, -186, 22, -172); hd.bezierCurveTo(34, -168, 42, -158, 40, -152); hd.bezierCurveTo(30, -146, 10, -140, -14, -146); hd.closePath(); fillPath(hd, fur, OUT, 3);
  ctx.fillStyle = dk; ctx.beginPath(); ctx.ellipse(8, -164, 9, 7, .2, 0, TAU); ctx.fill(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(9, -164, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(10.5, -165.5, 1.4, 0, TAU); ctx.fill();
  ctx.fillStyle = '#2A1A10'; ctx.beginPath(); ctx.arc(40, -154, 3.5, 0, TAU); ctx.fill(); ctx.fillStyle = dk; ctx.beginPath(); ctx.ellipse(-8, -166, 6, 8, 0, 0, TAU); ctx.fill();
  // arms holding the one pixel
  for (const [ax, ay] of [[4, -112], [12, -108]]) { fillPath(pathOf(taper([[ax, ay], [ax + 16, ay + 8], [ax + 24, ay + 20]], [10, 8, 7])), fur, OUT, 2); }
  ctx.fillStyle = o.pixel || '#3A64B8'; ctx.fillRect(22, -104, 20, 20); ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.strokeRect(22, -104, 20, 20);
  if (o.sad) { ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(26, -150); ctx.quadraticCurveTo(32, -153, 36, -149); ctx.stroke(); }
  ctx.restore();
}
// the broad circuit: a big gentle grazer whose coat is tan fur and whose mane is a meadow of grass
function grazer(x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const OUT = '#3A2410', tan = '#D9A86A', tanD = '#B07A3A', ph = o.walk ?? 0;
  ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 4, 240, 18, 0, 0, TAU); ctx.fill();
  const leg = (bx, k, far) => { const a = Math.sin((ph + k) * TAU) * .3, P = [[bx, -150], [bx + Math.sin(a) * 30, -80], [bx + Math.sin(a) * 50, -10]]; fillPath(pathOf(taper(P, [44, 30, 24])), far ? tanD : tan, OUT, 3); ctx.fillStyle = '#3A2A1A'; ctx.beginPath(); ctx.ellipse(P[2][0] + 4, -6, 18, 10, 0, 0, TAU); ctx.fill(); };
  leg(-140, .5, true); leg(110, 0, true);
  const B = new Path2D(); B.moveTo(-200, -170); B.bezierCurveTo(-200, -260, -80, -280, 40, -270); B.bezierCurveTo(140, -262, 200, -230, 200, -170); B.bezierCurveTo(200, -120, 120, -110, 0, -112); B.bezierCurveTo(-120, -110, -200, -120, -200, -170); B.closePath();
  fillPath(B, lgrad(0, -280, 0, -110, [[0, tanD], [.5, tan], [1, '#F3DDB0']]), OUT, 3.5);
  ctx.save(); ctx.clip(B); ctx.strokeStyle = 'rgba(120,70,20,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { const fx = -190 + hash(i) * 380, fy = -260 + hash(i * 3) * 140; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + 6, fy + 8, fx + 2, fy + 18); ctx.stroke(); } ctx.restore();
  // the grass mane: hundreds of blades along the back
  for (let i = 0; i < 90; i++) { const u = i / 90, bx = lerp(-190, 190, u), by = -250 - Math.sin(u * Math.PI) * 25, h = 40 + 50 * hash(i * 2.1), sw = Math.sin(t * 2 + i * .3) * 8; ctx.strokeStyle = mixCol('#4E8A34', '#A4C95A', hash(i * 5)); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx, by + 18); ctx.quadraticCurveTo(bx + sw * .5, by - h * .5, bx + sw + (hash(i) - .5) * 20, by - h); ctx.stroke(); }
  leg(-100, 0, false); leg(150, .5, false);
  // head: a broad friendly face
  const hd = new Path2D(); hd.moveTo(170, -240); hd.bezierCurveTo(200, -300, 300, -300, 320, -240); hd.bezierCurveTo(336, -196, 310, -160, 270, -156); hd.bezierCurveTo(220, -152, 180, -180, 170, -240); hd.closePath();
  fillPath(hd, lgrad(0, -300, 0, -150, [[0, tan], [1, '#F3DDB0']]), OUT, 3.5);
  for (let i = 0; i < 18; i++) { const bx = 180 + i * 7, h = 30 + 30 * hash(i * 9); ctx.strokeStyle = mixCol('#4E8A34', '#A4C95A', hash(i * 5)); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(bx, -280 + Math.abs(i - 9) * 2); ctx.quadraticCurveTo(bx - 4, -300 - h * .5, bx - 10 + Math.sin(t * 2 + i) * 6, -290 - h); ctx.stroke(); }
  ctx.fillStyle = '#FFFFFF'; for (const ex of [240, 286]) { ctx.beginPath(); ctx.ellipse(ex, -236, 14, 17, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 2.5; ctx.stroke(); ctx.fillStyle = '#1A1210'; ctx.beginPath(); ctx.arc(ex + 4, -234, 7, 0, TAU); ctx.fill(); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(ex + 6, -237, 2.5, 0, TAU); ctx.fill(); }
  ctx.fillStyle = '#3A2410'; ctx.beginPath(); ctx.ellipse(300, -192, 12, 8, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = OUT; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(268, -176); ctx.quadraticCurveTo(286, -164, 304, -176); ctx.stroke();
  ctx.restore();
}
