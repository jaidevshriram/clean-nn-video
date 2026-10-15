// kit.js: the explainer's reusable pieces, painted with core.js. Sets (backgrounds), neurons, wires, cards, arrows,
// write-on lettering, chapter cards, camera keys, and a presenter Clawd. All pure functions of t.

// ---------- cached static layers ----------
// layer(key, draw, o): paints draw() once per boil variant into an offscreen canvas and reuses it. Static scenery boils
// through `variants` drawings (a classic hand-drawn boil cycle) instead of being repainted every frame.
// o.x, o.y, o.w, o.h: the world rectangle the layer covers (default the frame); o.res: pixels per world unit.
const LAYERS = new Map();
function layer(key, draw, o = {}) {
  const variants = o.variants ?? 3, v = ((BOILN % variants) + variants) % variants, k = key + '#' + v;
  const x = o.x ?? 0, y = o.y ?? 0, w = o.w ?? W, h = o.h ?? H, res = o.res ?? 1;
  let c = LAYERS.get(k);
  if (!c) {
    c = createCanvas(Math.ceil(w * res), Math.ceil(h * res));
    const saved = ctx, savedB = BOILN;
    ctx = c.getContext('2d'); ctx.scale(res, res); ctx.translate(-x, -y);
    BOILN = 1000 + v; boilSeed(key); draw();
    ctx = saved; BOILN = savedB;
    LAYERS.set(k, c);
    if (LAYERS.size > (o.keep || 30)) LAYERS.delete(LAYERS.keys().next().value);
  }
  ctx.drawImage(c, x, y, w, h);
}

// ---------- camera keys ----------
// camKeys(t, [[t0, cx, cy, zoom], ...]): an eased camera path; a little drift on top so it's never dead
function camKeys(t, keys, drift = 1) {
  const v = kf(t, keys.map(k => [k[0], [k[1], k[2], k[3] ?? 1, k[4] ?? 0]]), easeInOut);
  camBegin(v[0] + drift * 6 * Math.sin(t * .31), v[1] + drift * 4 * Math.sin(t * .23 + 1), v[2] * (1 + drift * .004 * Math.sin(t * .17)), v[3]);
  return v;
}

// ---------- lettering helpers ----------
// title(txt, x, y, size, col, k): marker lettering that writes on as k goes 0 → 1
function title(txt, x, y, size, col = PAL.ink, k = 1, o = {}) { if (k <= 0) return; letter(txt, x, y, size, col, { reveal: k, shadow: o.shadow ?? false, ...o }); }
function hand(txt, x, y, size, col = PAL.ink, k = 1, o = {}) { if (k <= 0) return; letter(txt, x, y, size * (o.raw ? 1 : 1.2), col, { face: 'hand', reveal: k, ...o }); }
// a painted brush-stroke underline / highlight band behind text
function swash(x, y, w, h, col, k = 1, key = 'swash') {
  if (k <= .01) return; boilSeed(key + x + y);
  const x1 = x + w * ease(k), pts = [];
  for (let i = 0; i <= 10; i++) pts.push([lerp(x, x1, i / 10), y - h / 2 + Math.sin(i * 1.3) * h * .06 + jit(h * .03)]);
  for (let i = 10; i >= 0; i--) pts.push([lerp(x, x1, i / 10) + h * .1, y + h / 2 + Math.sin(i * 1.1 + 2) * h * .07 + jit(h * .03)]);
  paint(pts, { wash: col, washOp: 235, ink: null, tex: .8 });
}

// ---------- arrows, rings, ticks ----------
function arrow(p0, p1, k = 1, col = PAL.ink, sw = 2, bend = .2, key = 'arrow') {
  if (k <= .01) return; boilSeed(key + p0[0] + p1[1]);
  const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2, dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  const c = [mx - dy * bend, my + dx * bend], P = [];
  const n = 16, m = Math.max(2, Math.round(n * ease(k)));
  for (let i = 0; i <= m; i++) { const u = i / n; P.push([(1 - u) * (1 - u) * p0[0] + 2 * u * (1 - u) * c[0] + u * u * p1[0], (1 - u) * (1 - u) * p0[1] + 2 * u * (1 - u) * c[1] + u * u * p1[1]]); }
  inkLine(P, sw, col, 'ink', 0);
  if (k > .9) {
    const a = P[P.length - 1], b = P[P.length - 3], ang = Math.atan2(a[1] - b[1], a[0] - b[0]), L = 14 + sw * 5;
    inkLine([[a[0] - Math.cos(ang - .45) * L, a[1] - Math.sin(ang - .45) * L], a, [a[0] - Math.cos(ang + .45) * L, a[1] - Math.sin(ang + .45) * L]], sw, col, 'ink', 0);
  }
}
// a hand-drawn ellipse ring around a box [x, y, w, h], drawn on as k goes 0 → 1
function ringBox(x, y, w, h, k, col = PAL.berry, sw = 2.6, key = 'ring') {
  if (k <= .01) return; boilSeed(key + x + y);
  const P = []; const n = 44, m = Math.max(2, Math.round(n * 1.08 * ease(k)));
  for (let i = 0; i <= m; i++) { const a = -2.2 + i / n * TAU, r = 1 + .04 * Math.sin(i * .7); P.push([x + w / 2 + Math.cos(a) * w * .58 * r, y + h / 2 + Math.sin(a) * h * .62 * r]); }
  inkLine(P, sw, col, 'ink', 0);
}
function tick(x, y, s, k, col = PAL.sap) { if (k <= .01) return; boilSeed('tick' + x + y); const P = [[x - s * .5, y], [x - s * .1, y + s * .4], [x + s * .6, y - s * .5]]; inkLine(P.slice(0, k < .5 ? 2 : 3), s * .09, col, 'ink', 0); }
function cross(x, y, s, k, col = PAL.berry) { if (k <= .01) return; boilSeed('x' + x + y); inkLine([[x - s / 2, y - s / 2], [x + s / 2, y + s / 2]], s * .08, col, 'ink', 0); if (k > .5) inkLine([[x + s / 2, y - s / 2], [x - s / 2, y + s / 2]], s * .08, col, 'ink', 0); }
function pin(x, y, col = PAL.berry) { boilSeed('pin' + x + y); paint(ellPts(x + 2, y + 3, 9, 6, 12), { fill: PAL.ink, fillOp: 60, ink: null }); paint(ellPts(x, y, 9, 9, 14), { wash: col, ink: PAL.ink, sw: .6 }); paint(ellPts(x - 3, y - 3, 3, 3, 8), { wash: '#FFFFFF', washOp: 160, ink: null }); }

// ---------- images in shapes ----------
function circleImg(name, x, y, r, o = {}) {
  const I = img(name), s = Math.min(I.width, I.height), cr = o.crop || [(I.width - s) / 2, (I.height - s) / 2, s, s];
  ctx.save(); const p = new Path2D(); p.arc(x, y, r, 0, TAU); ctx.clip(p); ctx.globalAlpha = o.alpha ?? 1;
  ctx.drawImage(I, cr[0], cr[1], cr[2], cr[3], x - r, y - r, 2 * r, 2 * r); ctx.restore();
  if (o.ring !== false) { boilSeed('cimg' + name + (o.key || '')); inkStroke(ellPts(x, y, r, r, 36), true, o.sw ?? 1.2, o.ring || PAL.ink, 'ink'); }
}
// a small print (photo) that pops in: k 0 → 1
function print(name, x, y, w, k = 1, o = {}) { if (k <= .01) return; photo(name, x, y, w, { k, rot: o.rot ?? (hashS(name) - .5) * .12, border: o.border ?? w * .05, ...o }); }

// ---------- neurons ----------
// neuron(x, y, r, o): a painted neuron as a lantern bead. o.on 0..1 lights it; o.col its glass; o.img shows an
// image inside; o.neg 0..1 lights a blue negative side; o.label small text under it.
function neuron(x, y, r, o = {}) {
  const on = clamp(o.on ?? 0), col = o.col || PAL.ochre, key = o.key || ('n' + Math.round(x) + '_' + Math.round(y));
  boilSeed(key);
  if (on > .02 && o.glow !== false) glow(x, y, r * (2.2 + on), o.glowCol || '#FFC766', on * .9);
  if (o.neg > .02) glow(x, y, r * 2.4, '#7FB2E6', o.neg * .7);
  if (o.img) circleImg(o.img, x, y, r * .86, { ring: false, alpha: o.imgAlpha ?? 1, key });
  else {
    paint(ellPts(x, y, r, r, 24, r * .03), { wash: mixCol(o.base || '#3A3550', col, .25 + .75 * on), ink: null, tex: .6 });
    if (o.neg > .02) paint(ellPts(x, y, r * .92, r * .92, 22, r * .03), { wash: '#6E9BD0', washOp: 230 * o.neg, ink: null });
    paint(ellPts(x - r * .32, y - r * .35, r * .3, r * .22, 12), { wash: '#FFFFFF', washOp: 70 + 90 * on, ink: null });
  }
  inkStroke(ellPts(x, y, r, r, 28, r * .02), true, o.sw ?? clamp(r / 22, .6, 2.2), PAL.ink, 'ink');
  if (o.label) hand(o.label, x, y + r + (o.labelGap ?? 22), o.labelSize || Math.max(20, r * .55), o.labelCol || PAL.ink, o.labelK ?? 1);
}
// wire(P, k, o): a circuit connection drawn on along P as k goes 0 → 1; o.flow > 0 sends painted pulses along it
function wire(P, k = 1, o = {}) {
  if (k <= .01 || P.length < 2) return;
  const C = P.length > 2 ? through(P, 8) : resample(P, 12, false), n = Math.max(2, Math.round(C.length * ease(k)));
  boilSeed((o.key || 'w') + P[0][0] + P[0][1]);
  inkLine(C.slice(0, n), o.sw ?? 1.6, o.col || PAL.ink, o.br || 'ink', 0);
  if (o.flow && k >= 1) {
    const sp = o.speed ?? .5;
    for (let i = 0; i < (o.pulses ?? 2); i++) {
      const f = frac(T * sp + i / (o.pulses ?? 2) + hashS(o.key || 'w')), q = C[Math.floor(f * (C.length - 1))];
      glow(q[0], q[1], 14 * (o.pw ?? 1), o.flowCol || '#FFC766', .9 * o.flow);
      paint(ellPts(q[0], q[1], 5 * (o.pw ?? 1), 5 * (o.pw ?? 1), 10), { wash: o.flowCol || PAL.ochre, ink: null });
    }
  }
}
// a straight-ish curved path between two points, bowed by bend
function bow(p0, p1, bend = .15, n = 5) { const dx = p1[0] - p0[0], dy = p1[1] - p0[1], P = []; for (let i = 0; i <= n; i++) { const u = i / n, b = Math.sin(u * Math.PI) * bend; P.push([p0[0] + dx * u - dy * b, p0[1] + dy * u + dx * b]); } return P; }

// ---------- cards and boards ----------
function card(x, y, w, h, o = {}) {
  const k = o.k ?? 1; if (k <= .01) return;
  boilSeed('card' + (o.key || x + '_' + y));
  push(); translate(x, y); rotate(o.rot || 0); scale(backOut(k));
  if (o.shadow !== false) paint(rectPts(-w / 2 + 8, -h / 2 + 10, w, h, 2), { fill: PAL.ink, fillOp: 55, bleed: .02, tex: .1, border: 0, ink: null });
  paint(rectPts(-w / 2, -h / 2, w, h, 1.5), { wash: o.col || PAL.cream, ink: PAL.ink, sw: o.sw ?? .9 });
  if (o.pin !== false) pin(0, -h / 2 + 16, o.pinCol);
  if (o.draw) o.draw(w, h);
  pop();
  if (o.text) { const [sx, sy] = [x, y + (o.ty || 0)]; letter(o.text, sx, sy, o.size || 34, o.tcol || PAL.ink, { face: o.face || 'hand', rot: o.rot || 0, pop: k < 1 ? k : null, maxW: w * .86, shadow: false, reveal: o.reveal }); }
}
// the corkboard on the study wall
function corkboard(x, y, w, h, key = 'cork') {
  boilSeed(key);
  paint(rectPts(x - 18, y - 18, w + 36, h + 36, 2), { wash: '#8A5A3A', ink: PAL.ink, sw: 1.2 });
  paint(rectPts(x, y, w, h, 2), { wash: '#C9A06B', ink: PAL.ink, sw: .9, tex: 1 });
  for (let i = 0; i < 260; i++) { const px = x + hash(i * 3.1) * w, py = y + hash(i * 7.7) * h; paint(ellPts(px, py, 2 + hash(i) * 3, 1.5 + hash(i * 2) * 2, 6), { wash: hash(i * 5) > .5 ? '#A97F4E' : '#DDBB88', washOp: 160, ink: null }); }
}

// ---------- sets ----------
// The study: warm wall, wainscot, a window with evening light, a desk lamp, a corkboard. Returns the board rectangle.
const STUDY_BOARD = { x: 520, y: 120, w: 1240, h: 700 };
function setStudy(t, o = {}) {
  layer('study' + (o.variant || '') + (o.board === false ? '-noboard' : ''), () => {
    paint(rectPts(-60, -60, W + 120, H + 120), { wash: o.wall || '#EBD9BC', ink: null, tex: .9 });
    // wallpaper stripes
    for (let i = 0; i < 26; i++) { const x = i * 80 - 20; inkLine([[x, -20], [x + jit(3), H * .45], [x, H * .74]], 3.5, mixCol(o.wall || '#EBD9BC', '#C9A984', .45), 'dry', 0); }
    paint(rectPts(-60, H * .74, W + 120, H * .3, 2), { wash: '#B98A5E', ink: PAL.ink, sw: 1.1 });   // wainscot / desk
    for (let i = 0; i < 9; i++) inkLine([[-40, H * .78 + i * 28 + jit(3)], [W + 40, H * .78 + i * 28 + jit(3)]], .7, '#8F6440', 'inkfine', 0);
    paint(rectPts(-60, H * .74 - 14, W + 120, 22, 1), { wash: '#9C6E47', ink: PAL.ink, sw: 1 });
    // window, left
    paint(rectPts(70, 120, 300, 380, 2), { wash: '#F5C98A', ink: PAL.ink, sw: 1.4 });
    paint(rectPts(85, 135, 270, 350, 2), { fill: '#F08E5A', fillOp: 120, bleed: .2, tex: .4, ink: null });
    paint(ellPts(260, 330, 50, 50, 22), { wash: '#FFE3A6', ink: null });
    paint([[85, 420], [160, 380], [240, 400], [355, 360], [355, 485], [85, 485]], { wash: '#7C6A8F', ink: null, curv: .5 });
    inkLine([[220, 125], [220, 495]], 2.4, PAL.ink, 'ink', 0); inkLine([[75, 310], [365, 310]], 2.4, PAL.ink, 'ink', 0);
    if (o.board !== false) { const B = o.boardRect || STUDY_BOARD; corkboard(B.x, B.y, B.w, B.h); }
  }, { variants: 3 });
  if (o.lamp !== false) {
    boilSeed('lamp');
    const lx = 1840;
    glow(lx, 690, 300, '#FFC27A', .5 + .05 * Math.sin(t * 3.1));
    paint([[lx - 50, 800], [lx + 50, 800], [lx + 40, 780], [lx - 40, 780]], { wash: '#5B4A63', ink: PAL.ink, sw: .9 });
    inkLine([[lx, 782], [lx + 20, 700], [lx - 20, 650]], 3, PAL.ink, 'ink', .5);
    paint([[lx - 75, 650], [lx + 35, 650], [lx + 10, 600], [lx - 50, 600]], { wash: PAL.teal, ink: PAL.ink, sw: .9 });
  }
}
// The lab: deep teal room, a bench, a big painted microscope; MICRO gives the eyepiece lens centre
const MICRO = { x: 1240, y: 300, r: 120 };
function setLab(t, o = {}) {
  layer('lab', () => {
    paint(rectPts(-60, -60, W + 120, H + 120), { wash: '#2E4A57', ink: null, tex: 1 });
    paint(rectPts(-60, -60, W + 120, H * .5), { fill: '#3E6170', fillOp: 160, bleed: .1, ink: null });
    for (let i = 0; i < 7; i++) paint(rectPts(80 + i * 260, 90 + (i % 2) * 30, 150, 190, 2), { wash: '#355866', ink: '#1E3039', sw: .8 });   // shelves of jars
    for (let i = 0; i < 14; i++) { const x = 100 + i * 128, c = [PAL.ochre, PAL.rose, PAL.sky, PAL.sap, PAL.violet][i % 5]; paint(rrPts(x, 200 - (i % 3) * 18, 44, 64 + (i % 3) * 18, 10), { wash: mixCol(c, '#2E4A57', .35), ink: '#1E3039', sw: .7 }); }
    paint(rectPts(-60, H * .72, W + 120, H * .32, 2), { wash: '#6B4E3D', ink: PAL.ink, sw: 1.2 });
    paint(rectPts(-60, H * .72 - 16, W + 120, 26, 1), { wash: '#84614B', ink: PAL.ink, sw: 1 });
  });
  if (o.scope !== false) microscope(o.mx ?? 1240, o.my ?? 790, o.ms ?? 1, t, o);
}
// a big brass microscope standing on the bench at (x, y) (foot); the eyepiece/lens view is drawn by the caller
function microscope(x, y, s, t, o = {}) {
  boilSeed('scope');
  const brass = '#C99A45', dk = '#8C6524';
  paint(rrPts(x - 210 * s, y - 40 * s, 420 * s, 60 * s, 18 * s), { wash: '#3A3550', ink: PAL.ink, sw: 1.3 });      // foot
  paint(rectPts(x - 150 * s, y - 175 * s, 270 * s, 26 * s, 1), { wash: dk, ink: PAL.ink, sw: 1 });            // stage
  // arm curves up from the foot; the tube hangs off its top, angled toward the viewer
  paint([[x + 70 * s, y - 40 * s], [x + 150 * s, y - 40 * s], [x + 160 * s, y - 260 * s], [x + 110 * s, y - 470 * s], [x + 50 * s, y - 460 * s], [x + 95 * s, y - 260 * s]], { wash: '#3A3550', ink: PAL.ink, sw: 1.2, curv: .4 });
  push(); translate(x + 10 * s, y - 380 * s); rotate(-.28);
  paint(rrPts(-55 * s, -230 * s, 110 * s, 320 * s, 20 * s), { wash: brass, ink: PAL.ink, sw: 1.3 });         // tube
  paint(rectPts(-62 * s, -20 * s, 124 * s, 30 * s, 1), { wash: dk, ink: PAL.ink, sw: 1 });                   // collar on the arm
  paint(rrPts(-38 * s, 90 * s, 76 * s, 80 * s, 10 * s), { wash: dk, ink: PAL.ink, sw: 1 });                  // objective
  paint(rrPts(-42 * s, -300 * s, 84 * s, 80 * s, 12 * s), { wash: '#3A3550', ink: PAL.ink, sw: 1.1 });       // eyepiece
  inkLine([[-35 * s, -200 * s], [-35 * s, 60 * s]], 3 * s, '#F1D08A', 'dry', 0);
  pop();
  // focus knob: o.focus spins it
  const fx = x + 175 * s, fy = y - 250 * s, a = (o.focus || 0) * 6;
  paint(ellPts(fx, fy, 46 * s, 46 * s, 20), { wash: dk, ink: PAL.ink, sw: 1.1 });
  for (let i = 0; i < 8; i++) { const q = a + i / 8 * TAU; inkLine([[fx + Math.cos(q) * 20 * s, fy + Math.sin(q) * 20 * s], [fx + Math.cos(q) * 42 * s, fy + Math.sin(q) * 42 * s]], 1.2, PAL.ink, 'inkfine', 0); }
}
// The network country: a dusk (or night/day) landscape of hills; lanterns are drawn by the shot
function setCountry(t, o = {}) {
  const mood = o.mood || 'dusk';
  const C = { dusk: ['#F2C38E', '#E58F6B', '#8C6B9C', '#5E7F6E', '#4B6B58', '#3C5848'], night: ['#26305C', '#2F3C7A', '#3B3B6D', '#2E4B52', '#263F45', '#1F3338'],
              day: ['#CFE6EE', '#A9D2E3', '#9FC7A8', '#7FAE73', '#6E9F58', '#5A8848'], dawn: ['#F9D9B5', '#F4B39A', '#C99AB8', '#89A889', '#6E9474', '#557A5E'] }[mood];
  layer('country' + mood + (o.v || ''), () => {
    paint(rectPts(-80, -80, W + 160, H + 160), { wash: C[0], ink: null, tex: .7 });
    paint(rectPts(-80, H * .25, W + 160, H * .6), { fill: C[1], fillOp: 150, bleed: .2, tex: .5, ink: null });
    if (mood === 'night') for (let i = 0; i < 90; i++) { const sx = hash(i * 9.1) * W, sy = hash(i * 3.3) * H * .5; paint(starPts(sx, sy, 2 + 3 * hash(i), .4, 4), { wash: '#FFF2C8', ink: null }); }
    const hill = (y0, amp, ph, col, ink) => { const P = []; for (let i = 0; i <= 24; i++) { const x = -100 + i * (W + 200) / 24; P.push([x, y0 + amp * Math.sin(i * .45 + ph) + amp * .4 * Math.sin(i * 1.3 + ph * 2)]); } P.push([W + 100, H + 100], [-100, H + 100]); paint(P, { wash: col, ink: ink ? PAL.ink : null, sw: .9, curv: .6, tex: .8 }); };
    hill(H * .55, 40, 1, C[2], false); hill(H * .64, 50, 2.5, C[3], false); hill(H * .74, 34, 4, C[4], true); hill(H * .86, 26, 5.5, C[5], true);
    // grass tufts
    for (let i = 0; i < 60; i++) { const gx = hash(i * 4.4) * W, gy = H * .8 + hash(i * 1.9) * H * .18; inkLine([[gx, gy], [gx - 4, gy - 16 - 8 * hash(i)]], .8, mixCol(C[5], PAL.ink, .3), 'inkfine', 0); inkLine([[gx + 5, gy], [gx + 8, gy - 12 - 8 * hash(i * 2)]], .8, mixCol(C[5], PAL.ink, .3), 'inkfine', 0); }
  }, { x: -80, y: -80, w: W + 160, h: H + 160, variants: 3 });
}
// The sky set for the city/knot: paper sky with soft cloud washes
function setSky(t, o = {}) {
  const tint = o.tint || '#E9EEF0';
  layer('sky' + tint, () => {
    paint(rectPts(-200, -200, W + 400, H + 400), { wash: tint, ink: null, tex: .5 });
    for (let i = 0; i < 6; i++) { const cx = hash(i * 7) * W, cy = 120 + hash(i * 3) * 760; paint(ellPts(cx, cy, 260 + 160 * hash(i), 60 + 30 * hash(i * 2), 26), { fill: '#FFFFFF', fillOp: 120, bleed: .25, tex: .2, ink: null }); }
    for (let i = 0; i < 9; i++) { const y = 140 + i * 95; inkLine([[-100, y + 30 * Math.sin(i)], [W * .3, y + 20 * Math.sin(i + 1)], [W * .7, y + 30 * Math.sin(i + 2)], [W + 100, y]], .5, '#B8C2C8', 'inkfine', .5); }
  }, { x: -200, y: -200, w: W + 400, h: H + 400 });
}

// ---------- chapter card ----------
// Painted banner with the chapter number and title. Drawn in screen space over whatever set is behind it.
function chapterCard(t, lt, dur, num, name, col = PAL.clay) {
  const kin = easeOut(seg(lt, .15, .7)), kout = ease(seg(lt, dur - .45, dur - .05));
  if (kin <= 0 || kout >= 1) return;
  const x0 = lerp(-1500, 0, kin) + lerp(0, 2200, kout);
  push(); translate(x0, 0);
  boilSeed('chap' + num);
  const y = H * .5, h = 230;
  const P = []; for (let i = 0; i <= 12; i++) P.push([120 + i * 140, y - h / 2 + Math.sin(i * 1.7) * 10]);
  for (let i = 12; i >= 0; i--) P.push([120 + i * 140 + 30, y + h / 2 + Math.sin(i * 1.3 + 1) * 12]);
  paint(P, { wash: col, ink: PAL.ink, sw: 1.6, tex: 1 });
  inkLine([[160, y - h / 2 + 30], [1800, y - h / 2 + 24]], 2, mixCol(col, PAL.cream, .4), 'dry', 0);
  pop();
  const tx = 250 + x0;
  letter(num, tx, H * .5 - 8, 120, PAL.cream, { align: 'left', shadowCol: mixCol(col, PAL.ink, .5), reveal: seg(lt, .4, .8), screen: true });
  letter(name, tx + 210, H * .5, 86, PAL.cream, { align: 'left', shadowCol: mixCol(col, PAL.ink, .5), reveal: seg(lt, .55, 1.3), screen: true });
}

// ---------- presenter ----------
// Clawd as the teacher: stands at (x, y), emotion keys [[t, name, over?], ...], optional point: [t0, t1] raising aR
// toward the board; o.look aims the eyes. Everything else spreads in.
function presenter(t, x, y, u, keys, o = {}) {
  const m = emotions(t, keys, { take: o.take ?? .6 });
  let aR = m.aR ?? .2;
  if (o.point) for (const [a, b] of o.point) { const k = env(t, a, b, .25, .3); aR = lerp(aR, o.pointA ?? 1.0, k); }
  clawd(x, y, u, { ...m, aR, flip: o.flip, lookX: o.lookX ?? m.lookX, lookY: o.lookY ?? m.lookY, view: o.view, hat: o.hat, ...o.extra });
}

// ---------- simple charts ----------
// bar(x, y, w, h, frac, col, k): a painted bar growing upward from (x, y) to frac of h
function bar(x, y, w, h, f, col, k = 1, key = 'bar') {
  const hh = h * f * ease(k); if (hh < 1) return; boilSeed(key + x);
  paint(rectPts(x, y - hh, w, hh, 1.2), { wash: col, ink: PAL.ink, sw: .9, tex: .8 });
}
// a meter needle dial
function dial(x, y, r, v, o = {}) {
  boilSeed('dial' + x);
  paint(ellPts(x, y, r, r, 30), { wash: o.face || PAL.cream, ink: PAL.ink, sw: 1.4 });
  for (let i = 0; i <= 10; i++) { const a = Math.PI * (1 + i / 10); inkLine([[x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78], [x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9]], 1, PAL.ink, 'inkfine', 0); }
  const a = Math.PI * (1 + clamp(v));
  inkLine([[x, y], [x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8]], 2.6, PAL.berry, 'ink', 0);
  paint(ellPts(x, y, r * .08, r * .08, 10), { wash: PAL.ink, ink: null });
}

// ---------- transitions helpers ----------
// shot-edge transitions in one call: at the start (lt < tin) and end (lt > dur - tout) of a shot
function edges(lt, dur, o = {}) {
  const tin = o.in ?? 'wipe', tout = o.out ?? 'wipe', cols = o.cols;
  if (tin === 'wipe' && lt < .3) brushWipe(.5 + lt / .6, cols);
  if (tin === 'fade' && lt < .6) fade(1 - ease(lt / .6), o.fadeCol || PAL.paper);
  if (tin === 'black' && lt < .8) fade(1 - ease(lt / .8), PAL.ink);
  if (tout === 'wipe' && lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, cols);
  if (tout === 'fade' && lt > dur - .6) fade(ease((lt - (dur - .6)) / .6), o.fadeCol || PAL.paper);
  if (tout === 'black' && lt > dur - .8) fade(ease((lt - (dur - .8)) / .8), PAL.ink);
}
