// world2.js: more of the world. Tenants, weather, the Unfolding Machine, the Sketch Artist, the phone room, the knot
// morph, and the city panorama (districts from the coast to the horizon, with parallax).

// ---------- tenants: little people ----------
// person(x, y, s, o): s ≈ 1 → 120 px tall. o.col shirt, o.skin, o.hat ('cap'|'chef'|'sailor'|null), o.bag (suitcase),
// o.walk phase, o.flip, o.look, o.mood ('happy'|'neutral'|'oops'), o.key
const SKINS = ['#E8B48F', '#C98E6B', '#F2CDA8', '#9C6B4E', '#D9A27C'];
function person(x, y, s, o = {}) {
  const key = o.key || ('ps' + Math.round(x) + Math.round(y)), col = o.col || PAL.teal, skin = o.skin || SKINS[Math.floor(hashS(key) * 5)];
  boilSeed(key);
  push(); translate(x, y); if (o.flip) scale(-1, 1); scale(s);
  const wk = o.walk, sw = clamp(s * 1.6, .5, 1.6);
  paint(ellPts(0, 2, 30, 6, 12), { fill: PAL.ink, fillOp: 70, bleed: .2, ink: null });
  for (const sd of [-1, 1]) { const ph = wk != null ? Math.sin((wk + (sd > 0 ? .5 : 0)) * TAU) * 10 : 0; inkLine([[sd * 9, -34], [sd * 9 + ph, -2]], 3.2, PAL.ink, 'ink', 0); }
  paint([[-20, -36], [-16, -78], [16, -78], [20, -36]], { wash: col, ink: PAL.ink, sw, curv: .5 });
  const bob = wk != null ? Math.abs(Math.sin(wk * TAU)) * 3 : 0;
  push(); translate(0, -96 - bob);
  paint(ellPts(0, 0, 19, 20, 16), { wash: skin, ink: PAL.ink, sw });
  const lk = o.look || 0;
  if (o.mood === 'oops') { inkLine([[-8 + lk * 3, -3], [-4 + lk * 3, 1]], 1.4, PAL.ink, 'inkfine', 0); inkLine([[4 + lk * 3, -3], [8 + lk * 3, 1]], 1.4, PAL.ink, 'inkfine', 0); paint(ellPts(lk * 3, 8, 3, 4, 8), { wash: PAL.ink, ink: null }); }
  else { paint(ellPts(-6 + lk * 4, -2, 2.4, 3, 6), { wash: PAL.ink, ink: null }); paint(ellPts(6 + lk * 4, -2, 2.4, 3, 6), { wash: PAL.ink, ink: null }); inkLine([[-5 + lk * 3, 7], [lk * 3, o.mood === 'happy' ? 10 : 8], [5 + lk * 3, 7]], 1.2, PAL.ink, 'inkfine', .5); }
  if (o.hat === 'cap') paint([[-19, -6], [-16, -20], [14, -21], [19, -6], [30, -5]], { wash: o.hatCol || PAL.berry, ink: PAL.ink, sw: sw * .8, curv: .3 });
  if (o.hat === 'chef') paint([[-14, -12], [-18, -34], [0, -40], [18, -34], [14, -12]], { wash: PAL.cream, ink: PAL.ink, sw: sw * .8, curv: .5 });
  if (o.hat === 'sailor') paint([[-18, -10], [-12, -22], [12, -22], [18, -10]], { wash: '#F6F0E4', ink: PAL.ink, sw: sw * .8 });
  if (o.hat === 'nurse') { paint([[-14, -12], [-12, -24], [12, -24], [14, -12]], { wash: '#F6F0E4', ink: PAL.ink, sw: sw * .7 }); paint(rectPts(-3, -22, 6, 8, 0), { wash: PAL.berry, ink: null }); }
  if (o.hat === 'post') paint([[-18, -8], [-16, -22], [16, -22], [18, -8], [26, -6]], { wash: '#3B4A6B', ink: PAL.ink, sw: sw * .8 });
  pop();
  if (o.bag) { paint(rrPts(22, -40, 26, 22, 4), { wash: o.bagCol || '#8C5A3A', ink: PAL.ink, sw: sw * .8 }); inkLine([[29, -40], [35, -48], [41, -40]], 1.2, PAL.ink, 'inkfine', .5); }
  pop();
}

// ---------- weather and grading ----------
function rain(t, k = 1, o = {}) {
  if (k <= 0) return;
  ctx.save(); resetMatrix(); ctx.globalAlpha = .55 * k; ctx.strokeStyle = o.col || '#C9D6F0'; ctx.lineWidth = 1.6;
  for (let i = 0; i < (o.n || 220); i++) { const sp = 1400 + 600 * hash(i), x = (hash(i * 3.1) * (W + 300) - 150 + (t * sp * .18)) % (W + 300) - 150, y = ((hash(i * 7.7) * H + t * sp) % (H + 200)) - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 34); ctx.stroke(); }
  ctx.restore();
}
function splashes(t, y0, y1, k = 1) {
  for (let i = 0; i < 26; i++) { const ph = frac(t * 1.8 + hash(i)), x = hash(i * 5.3) * W, y = lerp(y0, y1, hash(i * 2.2)); if (ph > .4) continue; boilSeed('spl' + i + Math.floor(t * 1.8 + hash(i))); inkStroke(ellPts(x, y, 6 + ph * 40, 2 + ph * 8, 14), true, .8 * (1 - ph / .4) * k, '#C9D6F0', 'inkfine'); }
}
// full-frame colour grade (multiply), e.g. sepia flashbacks
function grade(col, a) { if (a <= .01) return; ctx.save(); resetMatrix(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function vignette(a = .5, col = '#120E22') { ctx.save(); resetMatrix(); const g = ctx.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .95); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, a)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }

// ---------- props ----------
// a lantern held at an arm tip (for clawd's armR / prof's holdR)
const lanternProp = (lit = 1) => (u, sw) => { glow(u * .8, u * 1.4, u * 5, '#FFC766', .9 * lit); inkLine([[0, 0], [u * .8, u * .6]], sw, PAL.ink, 'ink', 0); paint(rrPts(u * .1, u * .6, u * 1.4, u * 1.8, u * .4), { wash: lit > .5 ? '#FFE3A6' : '#B8A27A', ink: PAL.ink, sw }); paint(rectPts(u * .2, u * .45, u * 1.2, u * .3, 0), { wash: '#3A3550', ink: null }); };
const lanternHand = (lit = 1) => (s) => { glow(0, 70, 180, '#FFC766', .85 * lit); inkLine([[0, 0], [0, 30]], 3, PAL.ink, 'ink', 0); paint(rrPts(-24, 30, 48, 64, 14), { wash: lit > .5 ? '#FFE3A6' : '#B8A27A', ink: PAL.ink, sw: 2 }); paint(rectPts(-20, 24, 40, 10, 0), { wash: '#3A3550', ink: null }); paint(rectPts(-20, 90, 40, 10, 0), { wash: '#3A3550', ink: null }); };
function umbrellaProp(col = PAL.berry) { return (u, sw) => { inkLine([[0, 0], [0, -u * 7]], sw * 1.5, PAL.ink, 'ink', 0); const P = []; for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; P.push([Math.cos(a) * u * 5, -u * 7 + Math.sin(a) * u * 2.6]); } for (let i = 6; i >= 0; i--) P.push([-u * 5 + i * u * 10 / 6, -u * 7 + (i % 2 ? -u * .3 : 0)]); paint(P, { wash: col, ink: PAL.ink, sw }); }; }
function chalkboard(x, y, w, h, key = 'cb') {
  boilSeed(key);
  inkLine([[x - w * .35, y + h / 2], [x - w * .4, y + h / 2 + 160]], 6, '#6B4E3D', 'ink', 0); inkLine([[x + w * .35, y + h / 2], [x + w * .4, y + h / 2 + 160]], 6, '#6B4E3D', 'ink', 0);
  paint(rectPts(x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, 1.5), { wash: '#8C5A3A', ink: PAL.ink, sw: 1.3 });
  paint(rectPts(x - w / 2, y - h / 2, w, h, 1.5), { wash: '#2F4A42', ink: PAL.ink, sw: .9, tex: 1 });
}
// chalk lettering (draws on with k)
function chalk(txt, x, y, size, k = 1, o = {}) { if (k <= 0) return; letter(txt, x, y, size, o.col || '#F2EFE6', { face: o.face || 'marker', reveal: k, shadow: false, alpha: .92, ...o }); }

// ---------- the Unfolding Machine (sparse autoencoder) ----------
// machine(t, x, y, s, o): o.on 0..1 (gears spin, chimney puffs), o.belt 0..1 (output conveyor runs), o.items (list of
// draw functions for the conveyor), o.mouth 0..1 (intake opens)
function machine(t, x, y, s, o = {}) {
  const on = clamp(o.on ?? 1), sw = 1.3;
  boilSeed('mach');
  push(); translate(x, y); scale(s);
  // treads
  paint(rrPts(-260, -70, 520, 80, 40), { wash: '#3A3550', ink: PAL.ink, sw });
  for (let i = 0; i < 7; i++) { const a = t * 3 * on + i; paint(ellPts(-210 + i * 70, -30, 26, 26, 14), { wash: '#6E7891', ink: PAL.ink, sw: .8 }); inkLine([[-210 + i * 70, -30], [-210 + i * 70 + Math.cos(a) * 22, -30 + Math.sin(a) * 22]], 1, PAL.ink, 'inkfine', 0); }
  // body
  paint(rrPts(-220, -400, 440, 340, 30), { grad: [[0, '#9AA3B5'], [1, '#6E7891']], gdir: [0, -400, 0, -60], ink: PAL.ink, sw: sw * 1.1, tex: .7 });
  for (let i = 0; i < 6; i++) paint(ellPts(-190 + i * 76, -380, 6, 6, 8), { wash: '#4A5268', ink: null });
  // intake funnel on top
  const mo = clamp(o.mouth ?? .6);
  paint([[-170 - 40 * mo, -560], [170 + 40 * mo, -560], [80, -400], [-80, -400]], { wash: '#B9C0CE', ink: PAL.ink, sw });
  paint(ellPts(0, -560, 170 + 40 * mo, 30, 24), { wash: '#3A3550', ink: PAL.ink, sw: .9 });
  // gauges and gears
  for (let i = 0; i < 3; i++) { const gx = -120 + i * 120, gy = -250, a = t * (2 + i) * on * (i % 2 ? -1 : 1); paint(ellPts(gx, gy, 46, 46, 20), { wash: [PAL.ochre, PAL.rose, PAL.sky][i], ink: PAL.ink, sw: 1 }); for (let k = 0; k < 8; k++) { const q = a + k / 8 * TAU; paint(rectPts(gx + Math.cos(q) * 46 - 7, gy + Math.sin(q) * 46 - 7, 14, 14, 0), { wash: [PAL.ochre, PAL.rose, PAL.sky][i], ink: PAL.ink, sw: .6 }); } paint(ellPts(gx, gy, 12, 12, 10), { wash: '#3A3550', ink: null }); }
  paint(rrPts(-60, -160, 120, 50, 10), { wash: '#2A2340', ink: PAL.ink, sw: .8 }); letter('SAE', 0, -135, 34, '#9FE3C8', { face: 'marker', shadow: false, alpha: .9 });
  // chimney with puffs
  paint(rectPts(140, -470, 50, 80, 1), { wash: '#4A5268', ink: PAL.ink, sw: .9 });
  for (let i = 0; i < 4; i++) { const ph = frac(t * .5 + i / 4); if (on < .1) break; paint(ellPts(165 + ph * 60, -490 - ph * 200, 20 + 40 * ph, 16 + 30 * ph, 16), { wash: '#E8E4F0', washOp: 200 * (1 - ph) * on, ink: null }); }
  // conveyor out the right side
  if ((o.belt ?? 0) > 0) {
    paint(rectPts(220, -120, 1400, 30, 1), { wash: '#4A5268', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 20; i++) paint(ellPts(240 + i * 70, -105, 12, 12, 10), { wash: '#6E7891', ink: PAL.ink, sw: .5 });
    const items = o.items || [];
    for (let i = 0; i < 16; i++) { const f = frac(t * .06 * (o.belt) + i / 16), bx = 260 + f * 1360; const draw = items[i % Math.max(1, items.length)]; push(); translate(bx, -120); if (draw) draw(i); else { boilSeed('box' + i); paint(rrPts(-28, -56, 56, 56, 6), { wash: ['#E7F0DC', '#F2E0E4', '#E5E9F2', '#F3E2BE'][i % 4], ink: PAL.ink, sw: .8 }); } pop(); }
  }
  pop();
}

// ---------- the Sketch Artist (feature visualization) ----------
// artist(t, x, y, s, o): an easel robot with a beret painting o.img onto a canvas, revealed by o.k (0..1)
function artist(t, x, y, s, o = {}) {
  boilSeed('artist');
  push(); translate(x, y); scale(s);
  // easel: three legs, a ledge and a big canvas
  inkLine([[150, 0], [215, -400]], 6, '#7A5B3E', 'ink', 0); inkLine([[350, 0], [285, -400]], 6, '#7A5B3E', 'ink', 0); inkLine([[250, 10], [250, -380]], 5, '#6A4B30', 'ink', 0);
  paint(rectPts(140, -170, 220, 14, 1), { wash: '#8C6A48', ink: PAL.ink, sw: .9 });
  paint(rectPts(130, -420, 240, 240, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.2, tex: .4 });
  if (o.img && (o.k ?? 1) > 0) { const I = img(o.img), sz = Math.min(I.width, I.height), k = clamp(o.k ?? 1); ctx.save(); const P = new Path2D(); P.rect(140, -410, 220 * k, 220); ctx.clip(P); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, 140, -410, 220, 220); ctx.restore(); }
  if (o.img2 && (o.k2 ?? 0) > 0) { const I = img(o.img2), sz = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha = clamp(o.k2); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, 140, -410, 220, 220); ctx.restore(); }
  const bob = Math.sin(t * 4) * 4, lean = .04 * Math.sin(t * 1.3);
  // a single wheel and a spring neck: it bobs as it paints
  paint(ellPts(0, -26, 26, 26, 18), { wash: '#4A5268', ink: PAL.ink, sw: 1.1 }); paint(ellPts(0, -26, 8, 8, 10), { wash: '#9AA3B5', ink: null });
  inkLine([[0, -50], [0, -70]], 4, PAL.ink, 'ink', 0);
  push(); translate(0, -70); rotate(lean);
  // smock: a pear-shaped body with paint splotches
  paint([[-62, 0], [-70, -60], [-50, -130], [-26, -150], [26, -150], [50, -130], [70, -60], [62, 0]], { wash: '#F0E6D6', ink: PAL.ink, sw: 1.3, curv: .5 });
  [[-30, -40, PAL.berry], [24, -70, PAL.sky], [-10, -100, PAL.ochre], [36, -24, PAL.sap]].forEach(([px, py, c], i) => paint(ellPts(px, py, 9 + i % 2 * 4, 7 + i % 3 * 2, 10), { wash: c, ink: null }));
  // palette in the left hand
  inkLine([[-50, -110], [-96, -80], [-120, -60]], 5, '#8C8A9A', 'ink', .4);
  paint(ellPts(-140, -54, 44, 28, 18), { wash: '#C9A26B', ink: PAL.ink, sw: 1 });
  [PAL.berry, PAL.ochre, PAL.sky, PAL.sap, '#FBF6EC'].forEach((c, i) => paint(ellPts(-164 + i * 13, -60 + (i % 2) * 10, 6, 5, 8), { wash: c, ink: null }));
  // head: a round dome with one big camera-lens eye and a beret
  push(); translate(0, -190 + bob);
  paint(ellPts(0, 0, 50, 46, 22), { grad: [[0, '#E9D9A6'], [1, '#C9A15A']], ink: PAL.ink, sw: 1.3 });
  paint(ellPts(8, 2, 24, 24, 20), { wash: '#2A2340', ink: PAL.ink, sw: 1.2 }); paint(ellPts(8, 2, 13, 13, 16), { wash: '#4F7FB8', ink: null }); paint(ellPts(13, -4, 4, 4, 8), { wash: '#FFFFFF', ink: null });
  inkLine([[-30, 22], [-16, 28]], 1.6, PAL.ink, 'ink', 0);   // a small mouth line
  paint([[-54, -26], [-22, -60], [36, -58], [60, -36], [10, -28]], { wash: PAL.berry, ink: PAL.ink, sw: 1, curv: .4 });
  inkLine([[8, -58], [12, -72]], 2, PAL.ink, 'ink', 0);
  pop();
  pop();
  // painting arm: a long jointed arm with a brush that moves across the canvas
  const bx = 170 + 170 * (.5 + .5 * Math.sin(t * 3)), by = -330 + 70 * Math.sin(t * 2.3);
  inkLine([[50, -170 + bob], [110, -250], [bx - 24, by + 26]], 5, '#8C8A9A', 'ink', .4);
  paint(ellPts(110, -250, 8, 8, 10), { wash: '#4A5268', ink: null });
  inkLine([[bx - 24, by + 26], [bx, by]], 3.4, '#7A5B3E', 'ink', 0); paint(ellPts(bx, by, 7, 7, 8), { wash: o.paintCol || PAL.ochre, ink: null });
  pop();
}

// ---------- the phone room ----------
function phoneRoom(t, typed, o = {}) {
  layer('phoneRoom', () => {
    paint(rectPts(-80, -80, W + 160, H + 160), { grad: [[0, '#14112A'], [1, '#221C3D']], gdir: [0, 0, 0, H], ink: null, tex: .5 });
    paint(rectPts(-80, 760, W + 160, 400, 1), { grad: [[0, '#4A3828'], [1, '#2A1E16']], gdir: [0, 760, 0, H], ink: PAL.ink, sw: 1.2 });   // desk
    paint(rectPts(150, 140, 360, 420, 2), { wash: '#1E2350', ink: PAL.ink, sw: 1.2 });   // window
    for (let i = 0; i < 40; i++) paint(starPts(160 + hash(i * 3) * 340, 150 + hash(i * 7) * 400, 1.5 + 2 * hash(i), .4, 4), { wash: '#FFF2C8', ink: null });
    inkLine([[330, 140], [330, 560]], 3, PAL.ink, 'ink', 0); inkLine([[150, 350], [510, 350]], 3, PAL.ink, 'ink', 0);
    paint(rrPts(1300, 600, 220, 160, 20), { wash: '#5A4A63', ink: PAL.ink, sw: 1 });   // mug
    paint(ellPts(1410, 600, 110, 20, 20), { wash: '#3A2A22', ink: PAL.ink, sw: .8 });
  });
  for (let i = 0; i < 3; i++) { const ph = frac(t * .3 + i / 3); paint(ellPts(1400 + 20 * Math.sin(t + i * 2), 570 - ph * 160, 10 + 20 * ph, 14 + 20 * ph, 12), { wash: '#C9C3D9', washOp: 120 * (1 - ph), ink: null }); }
  // the phone, glowing
  const px = 960, py = 640;
  glow(px, py - 100, 520, '#7FB8F0', .55);
  push(); translate(px, py); rotate(-.06);
  boilSeed('phone');
  paint(rrPts(-170, -330, 340, 560, 46), { wash: '#1A1830', ink: PAL.ink, sw: 1.6 });
  paint(rrPts(-150, -306, 300, 512, 30), { grad: [[0, '#DCEBFA'], [1, '#B9D3F0']], gdir: [0, -306, 0, 206], ink: null, tex: .2 });
  // a chat bubble with the question typing in
  paint(rrPts(-120, -140, 240, 110, 22), { wash: '#FFFFFF', ink: PAL.ink, sw: .9 });
  pop();
  if (typed) letter(typed, px - 2, py - 92, 30, PAL.ink, { face: 'hand', maxW: 210, rot: -.06, shadow: false });
}

// ---------- the knot, and its morph from a straight street ----------
// knotPts(n): a trefoil (x, y, z) around (cx, cy) with radius r; streetPts(n): the same street laid out straight
function knotPts(n, cx = 960, cy = 560, r = 360) { const K = []; for (let i = 0; i < n; i++) { const q = i / n * TAU; K.push([cx + r * (Math.sin(q) + 2 * Math.sin(2 * q)) / 3, cy + r * .92 * (Math.cos(q) - 2 * Math.cos(2 * q)) / 3, -Math.sin(3 * q)]); } return K; }
// knot(t, morph, o): morph 0 = a straight street along y = o.streetY, 1 = the knot. o.imgs: window photos (clashing)
function knot(t, morph, o = {}) {
  const N = 420, K = knotPts(N, o.cx ?? 960, o.cy ?? 560, o.r ?? 360), y0 = o.streetY ?? 900, m = easeInOut(clamp(morph));
  const P = K.map((p, i) => { const sx = -200 + i / N * (W + 400); const w = clamp(m * 1.4 - (Math.abs(i / N - .5)) * .8); return [lerp(sx, p[0], ease(w)), lerp(y0, p[1], ease(w)), p[2] * w]; });
  const segs = []; for (let i = 0; i < N; i += 3) segs.push(i); segs.sort((a, b) => P[a][2] - P[b][2]);
  const imgs = o.imgs || [];
  for (const i of segs) {
    const p = P[i], q = P[(i + 3) % N]; if (i + 3 >= N && m < .9) continue;
    const a = Math.atan2(q[1] - p[1], q[0] - p[0]), z = p[2];
    boilSeed('kn' + i); push(); translate(p[0], p[1]); rotate(a);
    const dim = .35 - z * .3;
    paint(rectPts(-9, -34, 20, 68, 0), { wash: mixCol('#B9A98F', '#3A3550', dim), ink: null });
    inkLine([[-9, -34], [11, -34]], 1, PAL.ink, 'inkfine', 0); inkLine([[-9, 34], [11, 34]], 1, PAL.ink, 'inkfine', 0);
    if (i % 6 === 0) for (const sd of [-1, 1]) {
      const hh = 20 + 16 * hash(i + sd), c = [PAL.brick, '#D9C9A8', '#C77B5A', '#9FB59A', '#C9A15A'][(i / 6 + (sd > 0 ? 2 : 0)) % 5];
      push(); translate(0, sd * 34); if (sd < 0) scale(1, -1);
      paint(rectPts(-9, 0, 18, hh, 0), { wash: mixCol(c, '#2A2340', dim), ink: PAL.ink, sw: .5 });
      paint([[-11, hh], [0, hh + 11], [11, hh]], { wash: mixCol('#9C4A35', '#2A2340', dim), ink: PAL.ink, sw: .4 });
      if (imgs.length && hash(i * 7 + sd) > .55) { const I = img(imgs[Math.floor(hash(i * 3 + sd) * imgs.length)]), sz = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha = .9 - z * .2; ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, -6, 4, 12, 12); ctx.restore(); }
      else if (hash(i * 3 + sd) > .5) paint(rectPts(-3, 6, 6, 6, 0), { wash: '#FFD58A', ink: null });
      pop();
    }
    pop();
  }
}

// ---------- the city panorama ----------
// A long city along x (world coordinates 0 … CITY.len), seen from the side. Districts: coast (pixels arrive), early
// (huts with curves/edges), middle (parts and textures), late (whole things), towers on the horizon. Parallax: the far
// layers shift with the camera so depth reads. Call inside camBegin with the camera centre cx.
const CITY = { len: 7200, districts: [[0, 900, 'coast'], [900, 2600, 'early'], [2600, 4400, 'middle'], [4400, 6200, 'late'], [6200, 7200, 'towers']] };
function districtAt(x) { return (CITY.districts.find(d => x >= d[0] && x < d[1]) || CITY.districts[4])[2]; }
function cityPanorama(t, cx, o = {}) {
  const P = (depth, f) => { push(); translate((cx - 960) * depth, 0); f(); pop(); };   // parallax: far layers follow the camera
  P(.85, () => skyline('pf', -1200, CITY.len + 1200, 600, { depth: .95, bh: 130, bw: 50, lit: .2, haze: o.haze || '#E39A9E' }));
  fog(600, 90, o.fog1 || '#E8A39C', .65);
  P(.6, () => skyline('pm', -1200, CITY.len + 1200, 660, { depth: .72, bh: 170, bw: 64, lit: .3, haze: o.haze2 || '#C47A9A', glowK: .4 }));
  fog(670, 80, o.fog2 || '#B9789E', .5);
  P(.3, () => skyline('pn', -800, CITY.len + 800, 760, { depth: .45, bh: 190, bw: 80, lit: .35, haze: '#8C6B9C', glowK: .6 }));
  fog(780, 70, '#7B5E95', .4);
  // the ground and the coast
  boilSeed('pground'); paint(rectPts(-1000, 820, CITY.len + 2000, 2400, 1), { grad: [[0, '#3A2F5A'], [.1, '#1E1A35'], [1, '#141226']], gdir: [0, 820, 0, 3200], ink: null, tex: .5 });
  paint([[-1000, 820], [700, 820], [1100, 3200], [-1000, 3200]], { grad: [[0, '#3E6F96'], [1, '#22405E']], gdir: [0, 820, 0, 1100], ink: PAL.ink, sw: 1, curv: .2 });
  for (let i = 0; i < 12; i++) inkLine([[-900 + i * 140 + 30 * Math.sin(t + i), 860 + (i % 3) * 50], [-840 + i * 140 + 30 * Math.sin(t + i), 860 + (i % 3) * 50]], 1.4, '#BFE3F0', 'ink', .4);
}
// rain of coloured pixels falling on the coast (the input arriving)
function pixelRain(t, x0, x1, y1, k = 1) {
  for (let i = 0; i < 70; i++) { const f = frac(t * .4 + hash(i)), x = lerp(x0, x1, hash(i * 3.3)), y = lerp(-100, y1, f); const c = ['#E2476E', '#3A9C98', '#E8AA38', '#7B5CA8', '#8EC3E6', '#6E9F58'][i % 6]; boilSeed('px' + i); paint(rectPts(x, y, 14, 14, 0), { wash: c, washOp: 255 * k * Math.sin(f * Math.PI), ink: null }); }
}

// ---------- the main street of featured neuron houses ----------
// Deterministic: house i at x = 300 + i * 430. Each district's houses show photos of the kind of thing that layer
// detects: curve and colour portraits at the coast, parts and textures in the middle, whole things later, towers last.
const R_ = 'blog/raw/', CC_ = R_ + 'circuit-carousel/images/', NP_ = R_ + 'negative-poles-v2/', C3_ = R_ + 'crushed-3b-v3/';
const DISTRICT_IMGS = {
  early: ['curve-324', 'curve-342', 'curve-379', 'ctl-1634', 'ctl-5430', 'sq-0', 'sq-3', 'sq-6', 'curve-388', 'ctl-7219', 'sq-5', 'curve-349'].map(n => C3_ + n),
  middle: ['ladybug-stage2_block7-42', 'clownfish-stage2_block7-512', 'monastery-stage2_block7-481', 'strawberry-stage2_block7-834', 'tow-truck-stage2_block7-474', 'ladybug-stage2_block8-592', 'clownfish-stage2_block8-117', 'monastery-stage2_block8-63', 'strawberry-stage2_block8-221', 'tow-truck-stage2_block8-348'].flatMap(n => [1, 2].map(k => CC_ + n + '-example-' + k)),
  late: ['taxis', 'broccoli', 'spoonbills', 'lighthouses', 'toucans', 'wolves', 'cats', 'mittens', 'pretzels'].flatMap(n => [1, 2].map(k => NP_ + n + '-positive-' + k)),
  towers: ['ladybug-stage3_block2-34', 'clownfish-stage3_block2-449', 'monastery-stage3_block2-1245', 'strawberry-stage3_block2-1967', 'tow-truck-stage3_block2-69'].flatMap(n => [1, 2, 3, 4].map(k => CC_ + n + '-example-' + k)),
};
const STREET = [];
(() => { for (let i = 0; i < 16; i++) { const x = 1050 + i * 400, d = districtAt(x); if (d === 'coast') continue; const sz = { early: [150, 200, 1, 1, 'peak'], middle: [210, 300, 2, 2, 'flat'], late: [280, 400, 2, 4, 'dome'], towers: [240, 640, 2, 6, 'peak'] }[d]; const pool = DISTRICT_IMGS[d], off = Math.floor(hash(i * 7.7) * pool.length); STREET.push({ i, x, d, w: sz[0], h: sz[1], cols: sz[2], imgs: Array.from({ length: sz[3] }, (_, k) => pool[(off + k * 3) % pool.length]), roof: sz[4], col: ['#5A4A86', '#4A5A86', '#6A4A76', '#4A6A80'][i % 4] }); } })();
// cityStreet(t, o): o.on(i) → 0..1 light level per house (default a slow flicker); o.skip: indices not to draw
function cityStreet(t, o = {}) {
  for (const S of STREET) {
    if (o.skip && o.skip.includes(S.i)) continue;
    const on = o.on ? o.on(S.i, S) : .35 + .3 * Math.sin(t * .7 + S.i * 1.9);
    neuronHouse(S.x, 900, S.w, S.h, { roof: S.roof, on, imgs: S.imgs, cols: S.cols, col: S.col, key: 'st' + S.i, awning: S.d !== 'early' });
  }
}
// the roads between houses, as arcs of light over the rooftops: a "circuit" when lit in sequence
function streetArc(i, j, k = 1, o = {}) {
  const A = STREET.find(s => s.i === i), B = STREET.find(s => s.i === j); if (!A || !B || k <= 0) return;
  const a = [A.x, 900 - A.h - 40], b = [B.x, 900 - B.h - 40], m = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 160];
  const P = through([a, m, b], 12), n = Math.max(2, Math.round(P.length * ease(k)));
  inkLine(P.slice(0, n), o.sw ?? 5, o.col || '#FFD58A', 'ink', 0);
  if (k < 1) { const q = P[n - 1]; glow(q[0], q[1], 60, '#FFC766', 1); }
}

// ---------- in-world chapter marker: a wooden sign on chains that drops in, swings, and rises away ----------
function chapterSign(t, lt, dur, num, name, o = {}) {
  const kin = easeOut(seg(lt, .1, .7)), kout = ease(seg(lt, dur - .7, dur - .1)); if (kin <= 0 || kout >= 1) return;
  const y = lerp(-260, o.y ?? 230, kin) - kout * 500, sw = Math.sin(lt * 3.2) * .05 * Math.exp(-lt * .6);
  push(); resetMatrix(); translate(W / 2, y); rotate(sw);
  boilSeed('csign' + num);
  for (const sx of [-300, 300]) inkLine([[sx, -400], [sx * .9, -70]], 3, '#3A3550', 'ink', 0);
  paint(rrPts(-380, -80, 760, 150, 18), { grad: [[0, '#B9875A'], [1, '#7A5233']], gdir: [0, -80, 0, 70], ink: PAL.ink, sw: 2 });
  for (let i = 0; i < 4; i++) inkLine([[-360, -50 + i * 36 + jit(3)], [360, -50 + i * 36 + jit(3)]], .8, '#5E3E26', 'inkfine', .3);
  pop();
  letter(num, W / 2 - 300 + 300 * sw, y - 4, 58, '#F6E3C0', { screen: true, rot: sw, shadowCol: '#3A2414' });
  letter(name, W / 2 + 40, y, 54, '#FFF5E2', { screen: true, rot: sw, shadowCol: '#3A2414' });
}
// a projector box (Clawd's), beaming toward (tx, ty)
function projector(t, x, y, tx, ty, k = 1) {
  boilSeed('proj'); paint(rrPts(x - 60, y - 70, 120, 80, 12), { wash: '#6E7891', ink: PAL.ink, sw: 1.1 }); paint(ellPts(x + 60, y - 30, 22, 22, 14), { wash: '#DDEEF5', ink: PAL.ink, sw: 1 });
  for (const r of [0, 1]) { const a = t * 6 + r * Math.PI; paint(ellPts(x - 30 + r * 50, y - 86, 22, 22, 12), { wash: '#3A3550', ink: PAL.ink, sw: .8 }); inkLine([[x - 30 + r * 50, y - 86], [x - 30 + r * 50 + Math.cos(a) * 18, y - 86 + Math.sin(a) * 18]], 1, '#9AA3B5', 'inkfine', 0); }
  if (k > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(x + 60, y - 30, tx, ty); g.addColorStop(0, `rgba(255,235,190,${.5 * k})`); g.addColorStop(1, 'rgba(255,235,190,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x + 60, y - 40); ctx.lineTo(tx - 120, ty - 160); ctx.lineTo(tx + 120, ty + 160); ctx.lineTo(x + 60, y - 20); ctx.closePath(); ctx.fill(); ctx.restore(); }
}
// a hanging district sign over the street (world coordinates)
function districtSign(x, y, txt, k = 1, col = '#F3E2BE') {
  if (k <= 0) return; boilSeed('ds' + txt);
  inkLine([[x - 120, y - 120], [x - 120, y - 30]], 2, PAL.ink, 'ink', 0); inkLine([[x + 120, y - 120], [x + 120, y - 30]], 2, PAL.ink, 'ink', 0);
  push(); translate(x, y); scale(backOut(k)); paint(rrPts(-170, -36, 340, 72, 12), { wash: col, ink: PAL.ink, sw: 1.2 }); pop();
  letter(txt, x, y, 30, PAL.ink, { face: 'marker', shadow: false, pop: k < 1 ? k : null });
}
