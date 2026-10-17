// ch09 Traffic, votes and whispers — world: an ISOMETRIC PIXEL CITY-BUILDER GAME (style frame 9).
// The network is a city you build: neurons are buildings (roof billboards = windows with their photos; a basement
// cut-away = the negative side), traffic is the data, the HUD narrates in game language (levels, toasts, a cursor).
// Levels: 1 traffic (gate: cars vs dogs, taxis vs ambulances) · the sports car's journey · 2 votes (ballots, basement)
// · near-twins · 3 whispers (100,000,000 words, ~160 shouts, the mute slider, husky vs wolf) · the book item (pages)
// · the Titanic harbour (analogies) · a taxi drives off the map onto a paper page (next world: pop-up book).
// The world is drawn smooth and pixelated by fxPixelate; photos are re-drawn as crisp low-res sprites, and all text
// is a hand-made 5×7 pixel font drawn after pixelation.
(() => {
  const NP = 'blog/raw/negative-poles-v2/', CP = 'blog/raw/car-path-distinctions/';
  const K = { ink: '#1A1C2C', plum: '#5D275D', red: '#B13E53', orange: '#EF7D57', gold: '#FFCD75', lime: '#A7F070', green: '#38B764', teal: '#257179', navy: '#29366F', blue: '#3B5DC9', sky: '#41A6F6', cyan: '#73EFF7', white: '#F4F4F4', silver: '#94B0C2', slate: '#566C86', dusk: '#333C57', tan: '#C9A26B', brown: '#7A5A3A', grass2: '#2E9A55', soil: '#4A3424', cream: '#F2E6C8', violet: '#B07ACF', sand: '#E8C98A', ngrass: '#1F5A44', ngrass2: '#184A3A', pink: '#F2A0B0' };
  const PALETTE = Object.values(K);
  const PXS = 4;

  // ---------- the 5×7 pixel font ----------
  const GD = {
    A: '.###. #...# #...# ##### #...# #...# #...#', B: '####. #...# #...# ####. #...# #...# ####.', C: '.###. #...# #.... #.... #.... #...# .###.',
    D: '####. #...# #...# #...# #...# #...# ####.', E: '##### #.... #.... ####. #.... #.... #####', F: '##### #.... #.... ####. #.... #.... #....',
    G: '.###. #...# #.... #.### #...# #...# .####', H: '#...# #...# #...# ##### #...# #...# #...#', I: '.###. ..#.. ..#.. ..#.. ..#.. ..#.. .###.',
    J: '..### ...#. ...#. ...#. ...#. #..#. .##..', K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#', L: '#.... #.... #.... #.... #.... #.... #####',
    M: '#...# ##.## #.#.# #.#.# #...# #...# #...#', N: '#...# #...# ##..# #.#.# #..## #...# #...#', O: '.###. #...# #...# #...# #...# #...# .###.',
    P: '####. #...# #...# ####. #.... #.... #....', Q: '.###. #...# #...# #...# #.#.# #..#. .##.#', R: '####. #...# #...# ####. #.#.. #..#. #...#',
    S: '.#### #.... #.... .###. ....# ....# ####.', T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..', U: '#...# #...# #...# #...# #...# #...# .###.',
    V: '#...# #...# #...# #...# #...# .#.#. ..#..', W: '#...# #...# #...# #.#.# #.#.# #.#.# .#.#.', X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
    Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..', Z: '##### ....# ...#. ..#.. .#... #.... #####',
    0: '.###. #...# #..## #.#.# ##..# #...# .###.', 1: '..#.. .##.. ..#.. ..#.. ..#.. ..#.. .###.', 2: '.###. #...# ....# ...#. ..#.. .#... #####',
    3: '##### ...#. ..#.. ...#. ....# #...# .###.', 4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.', 5: '##### #.... ####. ....# ....# #...# .###.',
    6: '..##. .#... #.... ####. #...# #...# .###.', 7: '##### ....# ...#. ..#.. .#... .#... .#...', 8: '.###. #...# #...# .###. #...# #...# .###.',
    9: '.###. #...# #...# .#### ....# ...#. .##..',
    '+': '..... ..#.. ..#.. ##### ..#.. ..#.. .....', '-': '..... ..... ..... ##### ..... ..... .....', '.': '..... ..... ..... ..... ..... .##.. .##..',
    ',': '..... ..... ..... ..... .##.. ..#.. .#...', '!': '..#.. ..#.. ..#.. ..#.. ..#.. ..... ..#..', '?': '.###. #...# ....# ...#. ..#.. ..... ..#..',
    ':': '..... .##.. .##.. ..... .##.. .##.. .....', '%': '##... ##..# ...#. ..#.. .#... #..## ...##', '/': '..... ....# ...#. ..#.. .#... #.... .....',
    "'": '..#.. ..#.. .#... ..... ..... ..... .....', '"': '.#.#. .#.#. ..... ..... ..... ..... .....', '×': '..... #...# .#.#. ..#.. .#.#. #...# .....',
    '·': '..... ..... ..... ..#.. ..... ..... .....', '(': '...#. ..#.. .#... .#... .#... ..#.. ...#.', ')': '.#... ..#.. ...#. ...#. ...#. ..#.. .#...',
    '=': '..... ..... ##### ..... ##### ..... .....', '>': '.#... ..#.. ...#. ....# ...#. ..#.. .#...', '<': '...#. ..#.. .#... #.... .#... ..#.. ...#.',
    '▲': '..... ..#.. ..#.. .###. .###. ##### .....', '▼': '..... ##### .###. .###. ..#.. ..#.. .....', '~': '..... ..... .#... #.#.# ...#. ..... .....',
    '♥': '..... .#.#. ##### ##### .###. ..#.. .....', '#': '.#.#. .#.#. ##### .#.#. ##### .#.#. .#.#.', ' ': '..... ..... ..... ..... ..... ..... .....',
  };
  const GLYPH = {}; for (const [c, s] of Object.entries(GD)) GLYPH[c] = s.split(' ');
  const ptW = (s, sc) => [...String(s)].length * 6 * sc - sc;
  // pixel text in screen space (call from a UI pass). o.align left|center|right, o.sh shadow colour (false: none)
  function ptxt(s, x, y, sc, col, o = {}) {
    s = String(s).toUpperCase(); const w = ptW(s, sc), h = 7 * sc;
    const x0 = Math.round(o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2), y0 = Math.round(y - h / 2);
    const draw = (dx, dy, c) => { ctx.fillStyle = c; let cx = x0 + dx; for (const ch of s) { const g = GLYPH[ch]; if (g) for (let r = 0; r < 7; r++) for (let q = 0; q < 5; q++) if (g[r][q] === '#') ctx.fillRect(cx + q * sc, y0 + dy + r * sc, sc, sc); cx += 6 * sc; } };
    if (o.sh !== false) draw(Math.max(2, sc * .6), Math.max(2, sc * .6), o.sh || K.ink);
    draw(0, 0, col);
    return w;
  }
  // a game UI panel: dark fill, light inner border, dark outer edge
  function pbox(x, y, w, h, fill = K.ink, edge = K.gold, b = 5) {
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(x + 8, y + 8, w, h);
    ctx.fillStyle = K.ink; ctx.fillRect(x - b, y - b, w + 2 * b, h + 2 * b);
    ctx.fillStyle = edge; ctx.fillRect(x, y, w, h); ctx.fillStyle = fill; ctx.fillRect(x + b, y + b, w - 2 * b, h - 2 * b);
  }
  // a labelled text box centred at (x, y)
  function ptag(s, x, y, sc, col, o = {}) { const w = ptW(String(s).toUpperCase(), sc) + sc * 6, h = 7 * sc + sc * 5; pbox(x - w / 2, y - h / 2, w, h, o.fill || K.ink, o.edge || col, Math.max(3, sc * .7)); ptxt(s, x, y + 1, sc, col, { sh: o.sh ?? false }); }

  // ---------- iso projection ----------
  const TW = 64, TH = 32;
  const iso = (i, j) => [(i - j) * TW, (i + j) * TH];
  const dk = (c, k) => mixCol(c, K.ink, k);
  function isoBox(i, j, w, d, h, col, z = 0, o = {}) {
    if (h <= 0) return;
    const L = p => [p[0], p[1] - z], A = L(iso(i, j)), B = L(iso(i + w, j)), C = L(iso(i + w, j + d)), D = L(iso(i, j + d)), up = p => [p[0], p[1] - h];
    const lw = o.lw ?? 3, line = o.line === false ? null : (o.line || K.ink);
    flat([D, C, up(C), up(D)], o.lc || dk(col, .2), line ? { line, lw } : {});
    flat([B, C, up(C), up(B)], o.rc || dk(col, .4), line ? { line, lw } : {});
    flat([up(A), up(B), up(C), up(D)], o.tc || col, line ? { line, lw } : {});
  }
  const tile = (i, j, w = 1, d = 1) => [iso(i, j), iso(i + w, j), iso(i + w, j + d), iso(i, j + d)];
  // points on the two visible faces of a box: u along the face (0..1), v up from the base (px)
  const faceL = (i, j, w, d, u, v) => { const D = iso(i, j + d), C = iso(i + w, j + d); return [lerp(D[0], C[0], u), lerp(D[1], C[1], u) - v]; };
  const faceR = (i, j, w, d, u, v) => { const B = iso(i + w, j), C = iso(i + w, j + d); return [lerp(B[0], C[0], u), lerp(B[1], C[1], u) - v]; };

  // ---------- frame state: crisp photo sprites, world-anchored labels and UI passes run after pixelation ----------
  let F = null;
  function begin() { F = { ph: [], lab: [], ents: [], ui: [] }; return F; }
  const SMALL = new Map();
  function small(name, n = 44, aspect = 1) {
    const key = name + n + aspect; let c = SMALL.get(key); if (c) return c;
    // name@cx,cy,r crops around a point (fractions of the image; r = half-width) so a small subject fills the sprite
    const [nm, cr] = name.split('@'), I = img(nm), w = n, h = Math.round(n / aspect); c = createCanvas(w, h); const g = c.getContext('2d'); g.imageSmoothingEnabled = true;
    if (cr) { const [fx, fy, r] = cr.split(',').map(Number), sw = I.width * r * 2, sh = sw / aspect; g.drawImage(I, I.width * fx - sw / 2, I.height * fy - sh / 2, sw, sh, 0, 0, w, h); }
    else { const s = Math.min(I.width / w, I.height / h); g.drawImage(I, (I.width - w * s) / 2, (I.height - h * s) / 2, w * s, h * s, 0, 0, w, h); }
    SMALL.set(key, c); return c;
  }
  // a photo in the world (drawn now, and again crisp after pixelation)
  function photoAt(name, x, y, w, h, a = 1, o = {}) {
    ctx.save(); ctx.fillStyle = K.ink; ctx.fillRect(x, y, w, h); ctx.globalAlpha = a; ctx.drawImage(small(name, o.n || 44, w / h), x, y, w, h); ctx.restore();
    F.ph.push({ name, m: ctx.getTransform(), x, y, w, h, a, n: o.n || 44, tint: o.tint });
  }
  function postPhotos(G) {
    for (const p of G.ph) {
      ctx.save(); ctx.setTransform(p.m); ctx.imageSmoothingEnabled = false; ctx.fillStyle = K.ink; ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.globalAlpha = p.a; ctx.drawImage(small(p.name, p.n, p.w / p.h), p.x, p.y, p.w, p.h);
      if (p.tint) { ctx.globalAlpha = p.tint[1]; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = p.tint[0]; ctx.fillRect(p.x, p.y, p.w, p.h); }
      ctx.restore();
    }
  }
  // a pixel label anchored to a world point (screen-size text)
  function lab(s, wx, wy, sc, col, o = {}) { const [x, y] = toScreen(wx, wy); F.lab.push({ s, x, y, sc, col, o }); }
  // labels never hang off the frame: they slide along the edge to stay whole, and fade once their building is well off-screen
  function postLabels(G) {
    for (const L of G.lab) {
      if ((L.o.k ?? 1) <= 0) continue; const k = L.o.k ?? 1, dy = (1 - backOut(k)) * 30;
      const hw = (ptW(String(L.s).toUpperCase(), L.sc) + (L.o.box === false ? 0 : L.sc * 6 + 10)) / 2, hh = (7 * L.sc + (L.o.box === false ? 0 : L.sc * 5 + 10)) / 2;
      const x = clamp(L.x, 18 + hw, W - 18 - hw), y = clamp(L.y + dy, 84 + hh, H - 18 - hh), off = Math.hypot(x - L.x, y - L.y - dy), fa = 1 - seg(off, 60, 200);
      if (fa <= 0) continue; ctx.save(); ctx.globalAlpha *= fa;
      if (L.o.box === false) ptxt(L.s, x, y, L.sc, L.col, L.o); else ptag(L.s, x, y, L.sc, L.col, L.o);
      ctx.restore();
    }
  }
  const ui = f => F.ui.push(f);
  // end of a frame's world: pixelate (with the palette), then crisp photos, labels and the UI on top
  function finish(o = {}) {
    const G = F, px = o.px ?? PXS;
    if (px >= 1.5) fxPixelate(Math.round(px), PALETTE);
    POST.push(() => { postPhotos(G); resetMatrix(); postLabels(G); for (const f of G.ui) { resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; f(); } });
    GRAIN = 0; PAPER = false;
  }
  // depth-sorted drawables
  const ent = (d, f) => F.ents.push([d, f]);
  function drawEnts() { F.ents.sort((a, b) => a[0] - b[0]); for (const [, f] of F.ents) f(); F.ents = []; }

  // ---------- the world's pieces ----------
  // ground: tiles from a type function, cached; the island's dirt sides below the outer edge
  const TCOL = { g: K.green, G: K.grass2, r: K.slate, s: K.silver, w: K.blue, p: K.lime, l: K.dusk, d: K.sand, x: K.green };
  const TNIGHT = { g: K.ngrass, G: K.ngrass2, r: K.dusk, s: K.slate, w: K.navy, p: K.ngrass, l: K.ink, d: K.brown, x: K.ngrass };
  function ground(key, i0, i1, j0, j1, type, night = 0) {
    const xs = [iso(i0, j1)[0], iso(i1, j0)[0]], ys = [iso(i0, j0)[1], iso(i1, j1)[1]];
    layer('c9g_' + key, () => {
      for (let i = i0; i < i1; i++) for (let j = j0; j < j1; j++) {
        const ty = type(i, j); if (!ty) continue;
        const TC = night ? TNIGHT : TCOL; let col = TC[ty] || ty; if (ty === 'g' && hash(i * 7.3 + j * 3.1) > .8) col = TC.G;
        flat(tile(i, j), col);
        if (ty === 'g' && hash(i * 1.3 + j * 9.7) > .86) { const [x, y] = iso(i + .3 + .4 * hash(i + j), j + .5); flat(rectPts(x - 3, y - 3, 6, 6), night ? K.teal : K.lime); }
      }
      // dirt sides of the island
      const side = (P, Q, c) => flat([P, Q, [Q[0], Q[1] + 70], [P[0], P[1] + 70]], c);
      for (let i = i0; i < i1; i++) side(iso(i, j1), iso(i + 1, j1), night ? K.soil : K.brown);
      for (let j = j0; j < j1; j++) side(iso(i1, j), iso(i1, j + 1), night ? K.ink : K.soil);
      for (let i = i0; i < i1; i++) { const [x, y] = iso(i + .5, j1); flat(rectPts(x - 10, y + 30, 20, 8), K.soil); }
    }, { x: xs[0] - 10, y: ys[0] - 10, w: xs[1] - xs[0] + 20, h: ys[1] - ys[0] + 100, res: .5, variants: 1, keep: 40 });
  }
  // road dashes / animated chevrons on a straight road of tiles along an axis
  function roadMarks(axis, a0, a1, c, k = 1, flow = 0) {
    for (let a = a0; a < a1; a++) {
      const [i, j] = axis === 'i' ? [a + .5, c + .5] : [c + .5, a + .5];
      const [x, y] = iso(i, j), dx = axis === 'i' ? TW : -TW, dy = TH;
      const n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n;
      if (flow > 0) { const f = frac(T * 1.2 - a * .25); if (f < .5) { flat([[x - ux * 14 - uy * 9, y - uy * 14 + ux * 9], [x + ux * 10, y + uy * 10], [x - ux * 14 + uy * 9, y - uy * 14 - ux * 9], [x - ux * 6, y - uy * 6]], K.gold, { alpha: flow * k }); } }
      else flat([[x - ux * 16 - uy * 2, y - uy * 16 + ux * 2], [x + ux * 16 - uy * 2, y + uy * 16 + ux * 2], [x + ux * 16 + uy * 2, y + uy * 16 - ux * 2], [x - ux * 16 + uy * 2, y - uy * 16 - ux * 2]], K.white, { alpha: k });
    }
  }
  // a road that builds itself tile by tile (an unlocked road)
  function buildRoad(axis, a0, a1, c, t0, t) {
    for (let a = a0; a < a1; a++) {
      const k = popk(t, t0 + (a - a0) * .06, .25); if (k <= 0) continue;
      const [i, j] = axis === 'i' ? [a, c] : [c, a], P = tile(i, j), cx = iso(i + .5, j + .5), s = backOut(k);
      flat(P.map(p => [cx[0] + (p[0] - cx[0]) * s, cx[1] + (p[1] - cx[1]) * s - (1 - k) * 30]), K.slate);
    }
  }
  // a neuron building. o: photo (roof billboard), lit 0..1, k (build pop), wins, basement {photo, lit, k}, roof col
  function bld(i, j, w, d, h, col, o = {}) {
    const k = o.k ?? 1; if (k <= .01) return;
    const hh = h * backOut(k), lit = clamp(o.lit ?? 0);
    if (o.base) basement(i, j, w, d, o.base);
    // shadow
    flat([iso(i + w, j), iso(i + w + .5, j + .3), iso(i + w + .5, j + d + .3), iso(i + .2, j + d + .3), iso(i, j + d)], 'rgba(26,28,44,.35)');
    isoBox(i, j, w, d, hh, col, 0, { lw: 3 });
    // windows on both faces
    const rows = Math.max(1, Math.floor(hh / 46)), wl = o.winCol || K.gold;
    for (let r = 0; r < rows; r++) for (let q = 0; q < 3; q++) {
      const v0 = 24 + r * 46, on = lit > .1 || hash(i * 13 + j * 7 + r * 3 + q) > (o.dimWin ?? .55);
      for (const face of [faceL, faceR]) {
        const span = face === faceL ? w : d, u0 = (q + .5) / 3 - .08, u1 = (q + .5) / 3 + .08;
        if (span < 1 && q !== 1) continue;
        const P = [face(i, j, w, d, u0, v0), face(i, j, w, d, u1, v0), face(i, j, w, d, u1, v0 + 22), face(i, j, w, d, u0, v0 + 22)];
        flat(P, on ? (lit > .1 ? mixCol(wl, '#FFFFFF', lit * .3) : dk(wl, .25)) : K.dusk);
      }
    }
    if (o.roof) isoBox(i + w * .2, j + d * .2, w * .6, d * .6, 14, o.roof, hh, { lw: 2 });
    const [cx, cy] = iso(i + w / 2, j + d / 2);
    if (lit > .02) glow(cx, cy - hh * .5, 120 + 80 * w, o.glowCol || '#FFD58A', .55 * lit);
    if (o.photo) billboard(cx, cy - hh - (o.roof ? 14 : 0), o.bw || 120, o.photo, lit, k, o);
  }
  // an upright roof billboard: two posts and a framed photo screen
  function billboard(x, y, w, name, lit, k = 1, o = {}) {
    const h = w * (o.bAspect ?? .85), top = y - 22 - h;
    flat(rectPts(x - w * .32, y - 26, 7, 26), K.ink); flat(rectPts(x + w * .32 - 7, y - 26, 7, 26), K.ink);
    // a lit screen gets a tight pixel halo round its frame (a soft glow quantises into a pale ghost on the roof)
    if (lit > .02) { const hp = Math.round(6 + 6 * lit); flat(rectPts(x - w / 2 - 8 - hp, top - 8 - hp, w + 16 + 2 * hp, h + 16 + 2 * hp), mixCol(o.glowCol || '#FFE08A', K.ink, .55), { alpha: .7 * lit }); }
    const fr = lit > .3 ? (o.frameCol || K.gold) : K.slate;
    flat(rectPts(x - w / 2 - 8, top - 8, w + 16, h + 16), K.ink); flat(rectPts(x - w / 2 - 5, top - 5, w + 10, h + 10), fr);
    photoAt(name, x - w / 2, top, w, h, .7 + .3 * lit, { tint: lit < .2 ? [K.silver, .35 * (1 - lit / .2)] : null });
  }
  // the basement cut-away below a building: a dark block below the ground, with its own photo screen lit in blue
  function basement(i, j, w, d, b) {
    const k = b.k ?? 1; if (k <= .01) return;
    const bh = (b.h ?? 120) * easeOut(k), lit = clamp(b.lit ?? 0);
    const A = iso(i, j), B = iso(i + w, j), C = iso(i + w, j + d), D = iso(i, j + d), dn = p => [p[0], p[1] + bh];
    // the hole's rim and the cut faces (earth around a blue-lit room)
    flat([D, C, dn(C), dn(D)], dk(K.soil, .1), { line: K.ink, lw: 3 }); flat([B, C, dn(C), dn(B)], dk(K.soil, .35), { line: K.ink, lw: 3 });
    const inset = (P, Q, R, S, m) => [P, Q, R, S];
    // the room inside the left face
    const room = [faceL(i, j, w, d, .1, -12), faceL(i, j, w, d, .9, -12), faceL(i, j, w, d, .9, -bh + 12), faceL(i, j, w, d, .1, -bh + 12)];
    flat(room, lit > .1 ? mixCol(K.navy, K.blue, lit) : K.ink, { line: K.ink, lw: 2 });
    if (lit > .02) glow((C[0] + D[0]) / 2, (C[1] + D[1]) / 2 + bh * .5, 220, '#6FB7FF', .8 * lit);
    if (b.photo && k > .4) {
      const cx = lerp(D[0], C[0], .5), cy = lerp(D[1], C[1], .5) + bh * .55, pw = Math.min(bh * 1.05, 150) * (b.pw ?? 1), ph = pw * .82;
      // the screen hangs on the room's back wall, so it is sheared onto that isometric face like the windows are
      ctx.save(); ctx.translate(cx, cy); ctx.transform(1, (C[1] - D[1]) / (C[0] - D[0]), 0, 1, 0, 0);
      flat(rectPts(-pw / 2 - 7, -ph / 2 - 7, pw + 14, ph + 14), K.ink); flat(rectPts(-pw / 2 - 4, -ph / 2 - 4, pw + 8, ph + 8), lit > .3 ? K.sky : K.slate);
      photoAt(b.photo, -pw / 2, -ph / 2, pw, ph, .65 + .35 * lit, { tint: lit < .2 ? [K.silver, .35] : null, n: 32 });
      ctx.restore();
    }
  }
  // vehicles as little iso boxes. axis 'i' or 'j'; kind: taxi | amb | sports | car
  function veh(ci, cj, axis, kind, o = {}) {
    const S = o.s ?? 1.3, L = (kind === 'sports' ? .74 : kind === 'amb' ? .72 : .62) * S, Wd = .34 * S;
    const [i, j, w, d] = axis === 'i' ? [ci - L / 2, cj - Wd / 2, L, Wd] : [ci - Wd / 2, cj - L / 2, Wd, L];
    const col = { taxi: K.gold, amb: K.white, sports: K.red, car: o.col || K.sky }[kind];
    // shadow
    flat(tile(i + .06, j + .08, w, d), 'rgba(26,28,44,.35)');
    if (kind === 'amb') {
      isoBox(i, j, w, d, 34 * S, col, 4, { lw: 2 });
      const s = axis === 'i' ? [faceL(i, j, w, d, .15, 18), faceL(i, j, w, d, .85, 18), faceL(i, j, w, d, .85, 26), faceL(i, j, w, d, .15, 26)] : [faceR(i, j, w, d, .15, 18), faceR(i, j, w, d, .85, 18), faceR(i, j, w, d, .85, 26), faceR(i, j, w, d, .15, 26)];
      flat(s, K.red);
      const [x, y] = iso(ci, cj), bl = Math.floor(T * 6) % 2, hy = y - 34 * S - 8;
      flat(rectPts(x - 14, hy - 6, 10, 9), bl ? K.red : K.sky); flat(rectPts(x + 4, hy - 6, 10, 9), bl ? K.sky : K.red); glow(x, hy, 40, bl ? '#FF6A6A' : '#6AB0FF', .8);
      flat(rectPts(x - 4, hy + 6, 8, 20), K.red); flat(rectPts(x - 10, hy + 12, 20, 8), K.red);
    } else if (kind === 'sports') {
      isoBox(i, j, w, d, 12 * S, col, 4, { lw: 2 });
      const f = axis === 'i' ? [i + w * .3, j + d * .12, w * .38, d * .76] : [i + w * .12, j + d * .3, w * .76, d * .38];
      isoBox(f[0], f[1], f[2], f[3], 8 * S, K.ink, 4 + 12 * S, { lw: 1, tc: K.silver });
    } else {
      isoBox(i, j, w, d, 16 * S, col, 4, { lw: 2 });
      const f = axis === 'i' ? [i + w * .22, j + d * .1, w * .5, d * .8] : [i + w * .1, j + d * .22, w * .8, d * .5];
      isoBox(f[0], f[1], f[2], f[3], 11 * S, col, 4 + 16 * S, { lw: 2, lc: K.dusk, rc: K.ink });
      if (kind === 'taxi') { const [x, y] = iso(ci, cj), ty = y - 4 - 27 * S - 6; flat(rectPts(x - 10, ty - 4, 20, 9), K.ink); flat(rectPts(x - 7, ty - 2, 14, 5), K.white); }
    }
    if (o.sel) selMark(ci, cj, o.sel);
  }
  // the bouncing selection diamond over a unit
  function selMark(ci, cj, k = 1) { const [x, y] = iso(ci, cj), b = Math.abs(Math.sin(T * 5)) * 10; flat([[x, y - 70 - b], [x + 14, y - 92 - b], [x, y - 86 - b], [x - 14, y - 92 - b]], K.lime, { line: K.ink, lw: 3 }); flat(ellPts(x, y, 46, 23, 20), 'rgba(0,0,0,0)', { line: K.lime, lw: 4 }); }
  // a dog trotting; dir +1 faces screen-right, -1 left. col fur
  function dog(x, y, dir, col = K.tan, ph = 0, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(dir * s, s);
    flat(ellPts(0, 0, 26, 9, 12), 'rgba(26,28,44,.35)');
    const st = Math.sin(ph * TAU) * 5, b = Math.abs(Math.sin(ph * TAU)) * 2;
    for (const [lx, p] of [[-14, st], [-7, -st], [9, -st], [16, st]]) flat(rectPts(lx + p * .4 - 3, -14, 6, 14), dk(col, .35));
    flat(rrPts(-22, -30 - b, 44, 18, 7), col, { line: K.ink, lw: 3 });
    flat(rrPts(14, -44 - b, 20, 18, 6), col, { line: K.ink, lw: 3 }); flat(rectPts(30, -36 - b, 8, 7), dk(col, .2), { line: K.ink, lw: 2 });
    flat([[16, -44 - b], [22, -54 - b], [24, -42 - b]], dk(col, .4), { line: K.ink, lw: 2 });
    flat(rectPts(26, -40 - b, 4, 4), K.ink);
    flat([[-20, -26 - b], [-32, -40 - b + st * .6], [-28, -24 - b]], col, { line: K.ink, lw: 2 });
    ctx.restore();
  }
  function tree(i, j, s = 1, col = K.green) {
    const [x, y] = iso(i, j);
    flat(ellPts(x + 8, y + 2, 30 * s, 12 * s, 12), 'rgba(26,28,44,.3)');
    flat(rectPts(x - 5 * s, y - 30 * s, 10 * s, 30 * s), K.brown, { line: K.ink, lw: 2 });
    flat(ellPts(x, y - 52 * s, 30 * s, 28 * s, 14), dk(col, .25), { line: K.ink, lw: 3 }); flat(ellPts(x - 6 * s, y - 60 * s, 20 * s, 18 * s, 12), col); flat(ellPts(x - 12 * s, y - 66 * s, 7 * s, 6 * s, 8), mixCol(col, K.lime, .6));
  }
  function walker(x, y, col, ph, s = 1) {
    const b = Math.abs(Math.sin(ph * TAU)) * 3;
    flat(ellPts(x, y, 12 * s, 5 * s, 10), 'rgba(26,28,44,.35)');
    flat(rectPts(x - 6 * s + Math.sin(ph * TAU) * 3, y - 14 * s, 4 * s, 14 * s), K.ink); flat(rectPts(x + 2 * s - Math.sin(ph * TAU) * 3, y - 14 * s, 4 * s, 14 * s), K.ink);
    flat(rrPts(x - 9 * s, y - 34 * s - b, 18 * s, 22 * s, 4), col, { line: K.ink, lw: 2 }); flat(ellPts(x, y - 42 * s - b, 9 * s, 9 * s, 10), '#E8B48F', { line: K.ink, lw: 2 });
  }
  // dust puff when something is placed
  function puff(x, y, age, n = 10, col = K.white) { if (age < 0 || age > .8) return; for (let q = 0; q < n; q++) { const a = q / n * TAU, r = 30 + 90 * easeOut(age / .8); flat(ellPts(x + Math.cos(a) * r, y + Math.sin(a) * r * .5, 14 * (1 - age / .8) + 2, 10 * (1 - age / .8) + 2, 8), col); } }
  // background sea around the floating island
  function sea(t, night = 0) {
    bg(night ? '#141626' : K.navy);
    ctx.save(); resetMatrix();
    for (let q = 0; q < 60; q++) { const x = frac(hash(q * 3.1) + t * .01 * (q % 3 + 1)) * (W + 200) - 100, y = hash(q * 7.7) * H; ctx.fillStyle = night ? '#29366F' : K.blue; ctx.fillRect(Math.round(x / 4) * 4, Math.round(y / 4) * 4, 24 + 20 * hash(q), 4); }
    ctx.restore();
  }
  // Clawd the tourist, in a party hat, standing on a tile
  function clawdAt(i, j, t, keys, o = {}) { const [x, y] = iso(i, j); tourist(x, y, o.u || 8, o.hat ?? 'party', { ...emotions(t, keys), view: 'q', flip: o.flip, boilKey: o.key || 'c9clawd', ...o.extra }); }

  // ---------- HUD ----------
  function hudBar(left, mid, right) {
    ui(() => {
      ctx.fillStyle = K.ink; ctx.fillRect(0, 0, W, 64); ctx.fillStyle = K.dusk; ctx.fillRect(0, 64, W, 5);
      if (left) ptxt(left, 28, 34, 5, K.gold, { align: 'left' });
      if (mid) ptxt(mid, W / 2 + 120, 34, 5, K.white, { align: 'center' });
      if (right) ptxt(right, W - 28, 34, 5, K.lime, { align: 'right' });
    });
  }
  // toasts: [[t0, text, col], ...]; they slide in at the top right, stack, and leave after `life`
  function toasts(t, list, life = 2.8) {
    // they pop in place (never slide off the frame), fade out, and the stack closes up smoothly behind a leaving toast
    const live = list.filter(([a]) => t >= a && t < a + life);
    ui(() => { let slot = 0; live.forEach(([a, s, col]) => {
      const age = t - a, kin = easeOut(seg(age, 0, .25)), kout = easeIn(seg(age, life - .35, life)), sc = 6, w = ptW(String(s).toUpperCase(), sc) + 60, x = W - 40 - w + (1 - kin) * 30, y = 108 + slot * 92;
      slot += 1 - kout; ctx.save(); ctx.globalAlpha = kin * (1 - kout);
      pbox(x, y, w, 70, K.ink, col || K.gold, 5); ptxt(s, x + w / 2, y + 36, sc, col || K.gold, { sh: K.dusk });
      if (age < .5 && Math.floor(age * 16) % 2) { ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x, y, w, 70); }
      ctx.restore();
    }); });
  }
  // the big level banner in the middle of the screen
  function banner(t, t0, l1, l2, col = K.gold, life = 2.4) {
    const age = t - t0; if (age < 0 || age > life) return;
    ui(() => {
      const kin = backOut(seg(age, 0, .35)), kout = easeIn(seg(age, life - .3, life)), w = Math.max(ptW(l1, 12), ptW(l2, 7)) + 120, h = 230, x = W / 2 - w / 2, y = 330 - (1 - kin) * 400 - kout * 600;
      pbox(x, y, w, h, K.ink, col, 7);
      ptxt(l1, W / 2, y + 78, 12, col, { sh: K.plum }); ptxt(l2, W / 2, y + 168, 7, K.white, { sh: K.dusk });
    });
  }
  const CURSOR = ['X...........', 'XX..........', 'XWX.........', 'XWWX........', 'XWWWX.......', 'XWWWWX......', 'XWWWWWX.....', 'XWWWWWWX....', 'XWWWWWWWX...', 'XWWWWWWWWX..', 'XWWWWWXXXXX.', 'XWWXWWX.....', 'XWX.XWWX....', 'XX..XWWX....', 'X....XWWX...', '.....XWWX...', '......XX....'];
  // the player's cursor: keys [[t, x, y], ...] in screen px; clicks: times; o.icon draws a tool icon beside it
  function cursor(t, keys, clicks = [], o = {}) {
    if (t < keys[0][0] - .2 || t > keys[keys.length - 1][0] + (o.hold ?? 1.5)) return;
    const [x, y] = kf(t, keys.map(k => [k[0], [k[1], k[2]]]), easeInOut);
    const c = clicks.find(c => t >= c && t < c + .45), press = clicks.some(c => t >= c - .08 && t < c + .1);
    ui(() => {
      if (c != null) { const a = (t - c) / .45, r = 10 + 60 * easeOut(a); ctx.strokeStyle = K.white; ctx.globalAlpha = 1 - a; ctx.lineWidth = 6; ctx.strokeRect(Math.round(x - r), Math.round(y - r * .6), Math.round(r * 2), Math.round(r * 1.2)); ctx.globalAlpha = 1; }
      if (o.icon) o.icon(x + 40, y + 70);
      pix(Math.round(x), Math.round(y + (press ? 4 : 0)), press ? 4.6 : 5, CURSOR, { X: K.ink, W: K.white });
    });
  }
  // a minimap panel (bottom right): draw(mx, my, s) paints the map at scale s
  function minimap(draw) { ui(() => { const x = W - 300, y = H - 210; pbox(x, y, 260, 170, K.ink, K.silver, 5); ctx.save(); ctx.beginPath(); ctx.rect(x + 5, y + 5, 250, 160); ctx.clip(); draw(x + 130, y + 85); ctx.restore(); ptxt('MAP', x + 30, y - 20, 4, K.silver, { align: 'left' }); }); }
  // shot-cut device: a checkerboard dissolve from/to black (game-style level change)
  function checker(k) { if (k <= 0) return; ui(() => { const s = 96; ctx.fillStyle = K.ink; for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) { const d = hash(x * .37 + y * 1.3) * .5 + ((x + y) / (W + H)) * .5, q = clamp((k - d * .6) / .4); if (q > 0) { const r = s * q; ctx.fillRect(x + (s - r) / 2, y + (s - r) / 2, r, r); } } }); }
  // level change: the last frame of the previous level breaks into tiles that shrink away (game-style), revealing
  // the new level underneath, so there is never a black or empty frame and nothing pops
  let XC = null;
  function tileSwap(t, lt, D = .75) {
    if (lt >= D || typeof renderShotInto !== 'function') return; const i = _shotIndexAt(t); if (i < 1) return;
    POST.push(() => POST.push(() => {
      XC ||= createCanvas(W, H); renderShotInto(XC, i - 1, t);
      const k = lt / D, s = 96; ctx.save(); resetMatrix(); ctx.globalAlpha = 1; ctx.imageSmoothingEnabled = false;
      for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) { const d = hash(x * .37 + y * 1.3) * .5 + ((x + y) / (W + H)) * .5, q = easeIn(clamp((k - d * .6) / .4)), r = Math.round(s * (1 - q) / 8) * 8; if (r <= 0) continue; ctx.drawImage(XC, x, y, s, s, x + (s - r) / 2, y + (s - r) / 2, r, r); ctx.strokeStyle = K.ink; ctx.lineWidth = q > 0 ? 4 : 0; if (q > 0) ctx.strokeRect(x + (s - r) / 2, y + (s - r) / 2, r, r); }
      ctx.restore();
    }));
  }
  const cutIn = (lt, t) => tileSwap(t, lt);
  const cutOut = () => {};

  // ================= LEVEL 1 · TRAFFIC: the gate =================
  const A0 = {
    tK: wt('tv_gate', 'knots'), tLab: wt('tv_gate', 'labels'), tTr: wt('tv_gate', 'traffic'), tTog: wt('tv_gate2', 'together'), tG: wt('tv_gate2', 'gate'),
    tLc: wt('tv_gate2', 'lights'), tOff: wt('tv_gate2', 'switches'), tNb: wt('tv_gate2', 'neighborhood'), tFin: wt('tv_gate2', 'finer'), tTaxi: wt('tv_gate2', 'taxis'), tAmb: wt('tv_gate2', 'ambulances'),
  };
  const V = 1.7, GAP = .82, LS = 18, L2 = 7;   // traveller speed (tiles/s), spawn gap, shared length, junction → fork
  const travellers = (t, tG, tF) => {
    const out = [];
    for (let k = 0; k < 400; k++) {
      const tsp = 800 + k * GAP, s = (t - tsp) * V; if (s < 0) break; if (s > 42) continue;
      const isDog = hash(k * 7.13) < .45, kind = hash(k * 3.37) < .55 ? 'taxi' : 'amb';
      const gateOn = tsp + LS / V > tG + .15, forkOn = tsp + (LS + L2) / V > tF + .15;
      let i, j, axis = 'i';
      if (s < LS) { i = -8.5 + s; j = 10.5; }
      else if (isDog && gateOn) { i = 9.5; j = 10.5 + (s - LS); axis = 'j'; }
      else if (!isDog && kind === 'amb' && forkOn && s > LS + L2) { i = 16.5; j = 10.5 + (s - LS - L2); axis = 'j'; }
      else { i = -8.5 + s; j = 10.5; }
      if (i > 27 || j > 24.5) continue;
      out.push({ k, s, i, j, axis, isDog, kind, gateOn, forkOn });
    }
    return out;
  };
  const DOGCOL = [K.tan, K.brown, K.white, K.sand];
  function drawTraveller(v, t) {
    if (v.isDog) { const [x, y] = iso(v.i, v.j); ent(v.i + v.j + .5, () => dog(x, y + 4, v.axis === 'i' ? 1 : -1, DOGCOL[v.k % 4], t * 3 + v.k * .3, .9)); }
    else ent(v.i + v.j + .5, () => veh(v.i, v.j, v.axis, v.kind));
  }
  const FILLERS = [[1, 6, 'CAT', K.orange], [-4, 6, 'BOAT', K.sky], [12, 5, 'CAR', K.violet], [2, 13, 'DOG', K.gold], [11, 17, 'TREE', K.teal], [21, 13, 'HAT', K.red], [17, 4, 'SOCK', K.sky], [-3, 13, 'FISH', K.orange]];
  // deterministic scenery (trees and little houses) that avoids roads, footprints and keep-out boxes
  function scatter(seed, n, i0, i1, j0, j1, keep) {
    const out = [];
    for (let q = 0; q < n * 3 && out.length < n; q++) {
      const i = i0 + hash(seed + q * 1.73) * (i1 - i0), j = j0 + hash(seed + q * 2.91 + 7) * (j1 - j0);
      if (keep.some(([a, b, c, d]) => i > a - .3 && i < c + .3 && j > b - .3 && j < d + .3)) continue;
      if (out.some(o => Math.hypot(o[0] - i, o[1] - j) < 1.1)) continue;
      out.push([i, j, hash(seed + q * 5.3) < .62 ? 'tree' : 'hut', hash(seed + q * 9.1)]);
    }
    return out;
  }
  const HUTCOL = [K.orange, K.sky, K.gold, K.violet, K.white, K.red];
  function drawScatter(list, t, night = 0) { for (const [i, j, ty, h] of list) ent(i + j + .6, () => { if (ty === 'tree') tree(i, j, .8 + .4 * h, night ? K.teal : K.green); else { const c = HUTCOL[Math.floor(h * 6)]; isoBox(i - .4, j - .4, .8, .8, 34 + 30 * h, c, 0, { lw: 2 }); isoBox(i - .3, j - .3, .6, .6, 8, dk(c, .4), 34 + 30 * h, { lw: 2 }); const p = faceL(i - .4, j - .4, .8, .8, .5, 14); flat(rectPts(p[0] - 5, p[1] - 14, 10, 14), night && h > .4 ? K.gold : K.ink); } }); }
  const KEEP_A = [[-9, 9.6, 27, 11.4], [8.6, 9, 10.4, 25], [15.6, 9, 17.4, 25], [7, 8, 9, 10], [19, 8, 21, 10], [17, 14, 19, 16], [4, 11.5, 8.8, 22], [10, 11.2, 13, 13.6], [10, 4.5, 15.5, 9.3]].concat(FILLERS.map(([i, j]) => [i, j, i + 2, j + 2]));
  const SCEN_A = scatter(11, 60, -8, 26, 1, 24, KEEP_A);
  function mapA(t, o) {
    const { tG, tNb, tFin } = A0;
    ground('A', -9, 27, 0, 25, (i, j) => j === 10 ? 'r' : (i === 9 || i === 16) && j > 10 ? 'g' : ((i >= 10 && i <= 15 && j >= 5 && j <= 8) && hash(i + j * 5) > 2) ? 'l' : 'g');
    roadMarks('i', -9, 27, 10, 1, seg(t, A0.tTr, A0.tTr + .6));
    buildRoad('j', 11, 25, 9, tG + .2, t); buildRoad('j', 11, 25, 16, tFin + .1, t);
    if (t > tG + .5) roadMarks('j', 11, 25, 9, 1, 1); if (t > tFin + .4) roadMarks('j', 11, 25, 16, 1, 1);
  }
  function gateShot(t, lt, dur) {
    const { tK, tLab, tTr, tTog, tG, tLc, tNb, tFin, tTaxi, tAmb } = A0;
    begin(); sea(t);
    const J = iso(9.5, 10.5);
    camKeys(t, [[chapStart('ch09'), -40, 600, .74], [tK - .6, -64, 640, 1.08], [tK + 1.6, -64, 640, 1.08], [tLab - .2, 40, 620, .74], [tTr + .8, 40, 620, .76], [tTog - 1.2, -400, 470, 1.35], [tG - 2.4, -260, 540, 1.3], [tG + .2, -60, 560, 1.25], [tNb - 1.2, -60, 640, 1.1], [tNb - .2, -40, 700, .8], [tFin - .2, 300, 780, 1.05], [chapStart('ch09') + 200, 330, 800, 1.1]], .4);
    mapA(t);
    drawScatter(SCEN_A, t);
    // travellers
    const TV = travellers(t, tG, tFin);
    TV.forEach(v => drawTraveller(v, t));
    // the gate's state: the next traveller about to reach the junction
    let gl = 0, gd = 0; if (t > tG) { const nx = TV.filter(v => v.s > LS - 1.8 && v.s < LS + .5 && v.gateOn).sort((a, b) => b.s - a.s)[0]; if (nx) nx.isDog ? gd = 1 : gl = 1; }
    // buildings: fillers with labels (they lose their labels at "traffic control")
    FILLERS.forEach(([i, j, s, col], n) => {
      const h = 90 + 50 * hash(n * 3.1);
      ent(i + j + 4, () => bld(i, j, 2, 2, h, col, { lit: .15 + .2 * Math.sin(t * 1.3 + n) ** 2, roof: dk(col, .3) }));
      const dl = (s === 'FISH' || s === 'BOAT' || s === 'CAT') ? .75 : 0, kl = seg(t, tLab - .4 + n * .07 + dl, tLab + n * .07 + dl), fall = seg(t, tTr + n * .06, tTr + .8 + n * .06);
      if (kl > 0 && fall < 1) { const [x, y] = iso(i + 1, j + 1); lab(s, x, y - h - 60 + 900 * fall * fall, 7, K.white, { k: kl, edge: K.white, fill: K.dusk }); }
    });
    // the dog park and car district (unlocked at "neighborhood")
    const kp = t => popk(t, tNb - .4, .4);
    [[5, 12], [7, 13.5], [5.5, 16], [7.5, 18], [4.5, 19.5], [6.6, 21.5], [7.8, 15.5]].forEach(([i, j], n) => { const k = kp(t - n * .05); if (k > 0) ent(i + j, () => { ctx.save(); const [x, y] = iso(i, j); ctx.translate(x, y); ctx.scale(backOut(k), backOut(k)); ctx.translate(-x, -y); tree(i, j, 1.1); ctx.restore(); }); });
    if (kp(t) > 0) { ent(11 + 7, () => { const [x, y] = iso(8.2, 11.6); flat(rrPts(x - 7, y - 28, 14, 28, 4), K.red, { line: K.ink, lw: 2 }); flat(rectPts(x - 10, y - 30, 20, 6), K.red, { line: K.ink, lw: 2 }); }); lab('DOG PARK', ...iso(6, 17), 6, K.lime, { k: kp(t) }); lab('CAR TOWN', ...iso(13, 7.5), 6, K.gold, { k: kp(t - .2) }); }
    // the gate neuron: placed by the cursor
    const gk = popk(t, tG, .45);
    if (t > tG - 2.2 && gk <= 0) ent(17, () => { if (Math.floor(t * 8) % 2) isoBox(7, 8, 2, 2, 110, K.lime, 0, { line: K.white, lw: 5, lc: K.green, rc: K.grass2 }); else flat(tile(7, 8, 2, 2), K.lime, { line: K.white, lw: 5 }); });
    ent(18.2, () => bld(7, 8, 2, 2, 110, K.orange, { k: gk, lit: gl * .95 + .05, photo: CP + 'car-5826', bw: 130, roof: K.red }));
    if (gk > 0) {
      // the barrier arm across the straight road: up for cars, down (blocking) for dogs
      ent(20.5, () => { const [x, y] = iso(10, 10), up = gd ? 0 : 1, ang = lerp(.46, -1.2, up); flat(rectPts(x - 6, y - 34, 12, 34), K.ink); ctx.save(); ctx.translate(x, y - 30); ctx.rotate(ang); for (let q = 0; q < 6; q++) flat(rectPts(q * 18, -5, 18, 10), q % 2 ? K.white : K.red); ctx.restore(); });
      // the signal arrow: right-down for cars (gold), left-down for dogs (orange)
      if (gl || gd) ent(30, () => { const [x, y] = iso(9.5, 10.5), dir = gl ? 1 : -1, c = gl ? K.lime : K.orange, bb = Math.sin(t * 10) * 4; ctx.save(); ctx.translate(x + 150, y - 300 + bb); ctx.scale(dir, 1); flat([[-34, -14], [6, 6], [6, -10], [34, 14], [6, 34], [6, 18], [-34, -2]], c, { line: K.ink, lw: 4 }); ctx.restore(); });
      puff(...iso(8, 10), t - tG, 12);
    }
    // the near-twin districts: taxi and ambulance buildings
    const tk = popk(t, tTaxi - .3, .5), ak = popk(t, tAmb - .3, .5);
    const nearTaxi = TV.some(v => !v.isDog && v.kind === 'taxi' && v.i > 18 && v.i < 22 && v.j < 11), nearAmb = TV.some(v => v.axis === 'j' && !v.isDog && v.j > 13 && v.j < 17);
    ent(21 + 10, () => bld(19, 8, 2, 2, 120, K.gold, { k: tk, lit: .3 + .6 * nearTaxi, photo: NP + 'taxis-positive-1', bw: 130, roof: K.orange }));
    ent(19 + 16, () => bld(17, 14, 2, 2, 120, K.white, { k: ak, lit: .3 + .6 * nearAmb, photo: NP + 'taxis-negative-1', bw: 130, roof: K.red }));
    if (tk > 0) lab('TAXIS', ...iso(20, 9), 6, K.gold, { k: tk }); if (ak > 0) lab('AMBULANCES', ...iso(18, 15), 6, K.white, { k: ak });
    // the Knot squats in the junction until the bulldozer clicks it; it shrinks and runs off the map
    const kr = seg(t, tK + .25, tK + 2.6);
    if (kr < 1) { const [x, y] = [lerp(J[0], J[0] - 900, easeIn(kr)), lerp(J[1] - 50, J[1] + 380, easeIn(kr))]; ent(20, () => { flat(ellPts(x, y + 50, 50 * (1 - kr * .6), 14, 14), 'rgba(26,28,44,.35)'); knotBeast(x, y - Math.abs(Math.sin(t * 14)) * 14 * (kr > 0), 64 * (1 - .55 * ease(seg(t, tK + .25, tK + .7))), { hat: 'hard', col: K.violet, dark: K.plum, look: kr > 0 ? [-1, .3] : [0, 0], grin: kr <= 0 }); }); }
    puff(J[0], J[1] - 30, t - tK - .25, 12, K.cream);
    // Clawd, the tourist, watches from the corner of the junction
    ent(23.8, () => clawdAt(11.3, 12.5, t, [[chapStart('ch09'), 'happy'], [tK - .2, 'surprised'], [tK + .9, 'laugh'], [tLab, 'thinking'], [tTr + .4, 'happy'], [tG + .2, 'excited'], [tNb, 'proud'], [tTaxi, 'excited']], { flip: true, u: 7.5 }));
    drawEnts();
    camEnd();
    finish();
    // a dark plate behind the arrival stamp and chapter title, so labels and traffic never run through them
    ui(() => { const A = globalThis._ARRIVE; if (!A) return; const k = seg(t, A[1] + .1, A[1] + .4) * (1 - seg(t, A[1] + 4.2, A[1] + 4.9)); if (k <= 0) return; ctx.globalAlpha = .82 * k; pbox(70, 90, 880, 200, K.ink, K.dusk, 5); });
    // HUD
    const passed = TV.length ? 0 : 0, nC = 412 + Math.floor(Math.max(0, t - 830) * 1.1), nD = 389 + Math.floor(Math.max(0, t - 830) * .9);
    hudBar('LV 1 · TRAFFIC', `CARS ${nC}   DOGS ${nD}`, t > tTaxi ? 'DISTRICTS 4' : t > tNb ? 'DISTRICTS 2' : 'DISTRICTS 0');
    toasts(t, [[tK + .4, 'NO KNOTS HERE', K.cyan], [tTr + .2, 'TRAFFIC CONTROL MODE', K.gold], [tG + .2, 'GATE NEURON BUILT', K.lime], [tNb - .2, '+1 CAR TOWN', K.gold], [tNb + .2, '+1 DOG PARK', K.lime], [tTaxi, '+1 TAXI DISTRICT UNLOCKED!', K.gold], [tAmb + .2, '+1 AMBULANCE DISTRICT', K.white]]);
    // cursor: bulldozes the knot, then drags the gate into place
    const bull = (x, y) => { ctx.fillStyle = K.gold; ctx.fillRect(x, y, 40, 22); ctx.fillStyle = K.ink; ctx.fillRect(x + 4, y + 22, 34, 10); ctx.fillRect(x - 12, y + 6, 10, 26); ctx.fillStyle = K.ink; ctx.fillRect(x + 22, y - 12, 14, 12); };
    cursor(t, [[tK - 1.2, 1500, 900], [tK + .25, 960, 520], [tK + 1.2, 1200, 760]], [tK + .25], { icon: t < tK + 1.2 ? bull : null, hold: .3 });
    cursor(t, [[tG - 2.2, 1500, 950], [tG - .1, 800, 480], [tG + .8, 1100, 800]], [tG], { hold: .2 });
    if (t > tG - 2.2 && t < tG + .6) ui(() => ptag('BUILD: GATE NEURON', W / 2, H - 80, 6, K.lime));
    cutOut(lt, dur);
  }

  // ================= the sports car's journey =================
  const B0 = { a: cs('tv_journey'), tOne: wt('tv_journey', 'sports'), tPart: wt('tv_journey', 'Partway'), tGr: wt('tv_journey', 'grouped'), tBox: wt('tv_journey', 'boxy'), tTab: wt('tv_journey', 'tables'), tCab: wt('tv_journey', 'cabinets'), tApart: wt('tv_journey', 'apart'), tSn: wt('tv_journey', 'snakes'), tDg: wt('tv_journey', 'dogs'), tEnd: wt('tv_journey', 'end'), tCv: wt('tv_journey', 'convertible'), tWg: wt('tv_journey', 'wagon') };
  const carI = t => kf(t, [[B0.a - .4, -2], [B0.tPart, 5], [B0.tGr, 7.6], [B0.tCab + .4, 10.2], [B0.tApart, 13], [B0.tDg + .3, 17.6], [B0.tEnd, 22], [B0.tCv - .3, 28.6]], x => x);
  const KEEP_B = [[-7, 9.4, 37, 11.6], [29.4, 1, 30.6, 20], [5.2, 6.2, 14, 9.6], [3.8, 8.6, 11.5, 9.8], [12.6, 11.4, 24, 17.6], [30.6, 3.2, 34, 6.5], [27, 13.4, 29.6, 16.4], [12.5, 8, 14, 9.4], [27.8, 7.6, 29.4, 9.4]];
  const SCEN_B = scatter(23, 70, -6, 36, 2, 19, KEEP_B);
  function journeyShot(t, lt, dur) {
    const { a, tOne, tPart, tGr, tBox, tTab, tCab, tApart, tSn, tDg, tCv, tWg } = B0;
    begin(); sea(t);
    const ci = carI(t) + (t > tCv - .3 ? Math.sin(t * 9) * .03 : 0), [cx, cy] = iso(ci, 10.6);
    const zoom = kf(t, [[a, 1.45], [tGr - .5, 1.4], [tGr + .3, 1.12], [tCab + .5, 1.12], [tApart - .2, 1.25], [tDg + .5, 1.2], [tCv - 1.4, 1.2], [tCv - .3, 1.0]]);
    const look = kf(t, [[a, [120, -60]], [tGr - .5, [140, -90]], [tGr + .3, [120, -160]], [tCab + .5, [120, -140]], [tApart - .2, [40, 120]], [tDg + .6, [80, 130]], [tCv - 1.4, [160, 0]], [tCv - .3, [90, -10]]]);
    camBegin(cx + look[0] + 4 * Math.sin(t * .4), cy + look[1], zoom);
    ground('B', -6, 36, 2, 19, (i, j) => j === 10 ? 'r' : (j === 12 || j === 13) && i >= 13 && i <= 23 ? 's' : (i === 30 && j !== 10) ? 'r' : 'g');
    roadMarks('i', -6, 30, 10, 1, 1); roadMarks('j', 2, 10, 30, 1, 1); roadMarks('j', 11, 19, 30, 1, 1);
    drawScatter(SCEN_B, t);
    // district: boxy things (tables, cabinets) on the north side
    const box = [[5.6, 6.6, K.sky, CP + 'stage2_block8-920-pos-1', tTab], [8.6, 6.4, K.cream, CP + 'stage2_block8-920-pos-2', tCab], [11.6, 6.8, K.tan, CP + 'stage2_block8-920-pos-4', tTab + .3]];
    const near = (x, w = 2.5) => clamp(1 - Math.abs(ci - x) / w);
    box.forEach(([i, j, col, im, tw], n) => ent(i + j + 4.4, () => bld(i, j, 2.2, 2.2, 100 + n * 20, col, { lit: Math.max(seg(t, tw - .3, tw + .2) * (1 - seg(t, tApart, tApart + 1)), .15 + .5 * near(i + 1)), photo: im, bw: 130, roof: dk(col, .3) })));
    // props: little iso tables and cabinets on the lawn in front
    [[4.6, 9.1], [7.6, 9.1], [10.6, 9.1]].forEach(([i, j], n) => ent(i + j, () => { if (n % 2) { isoBox(i, j, .5, .4, 50, K.brown); const f = (u, v) => faceL(i, j, .5, .4, u, v); flat([f(.48, 10), f(.52, 10), f(.52, 44), f(.48, 44)], K.ink); } else { for (const [di, dj] of [[0, 0], [.5, 0], [0, .4], [.5, .4]]) isoBox(i + di, j + dj, .08, .08, 24, K.brown, 0, { lw: 1 }); isoBox(i - .05, j - .05, .68, .58, 7, K.tan, 24, { lw: 2 }); } }));
    // across the fence: snakes and dogs, kept apart
    const ks = popk(t, tApart - .6, .5);
    ent(15 + 14 + 4.4, () => bld(15, 14, 2.4, 2.2, 110, K.green, { k: ks, lit: .2 + .7 * seg(t, tSn - .3, tSn + .2), photo: CP + 'stage2_block8-920-neg-1', bw: 130, glowCol: '#9FE8A0', frameCol: K.lime }));
    ent(19 + 14 + 4.4, () => bld(19, 14, 2.2, 2.2, 100, K.tan, { k: popk(t, tDg - .5, .5), lit: .2 + .7 * seg(t, tDg - .3, tDg + .2), photo: NP + 'wolves-negative-1', bw: 130 }));
    if (ks > 0) lab('SNAKES', ...iso(17.6, 16.6), 5, K.lime, { k: ks }); if (popk(t, tDg - .5, .5) > 0) lab('DOGS', ...iso(21, 16.6), 5, K.tan, { k: popk(t, tDg - .5, .5) });
    // the snake on the sidewalk and a dog in its yard
    if (ks > 0) ent(17 + 13 + .5, () => { const [x, y] = iso(16 + .8 * Math.sin(t * .8), 12.7); for (let q = 0; q < 10; q++) flat(ellPts(x - q * 13, y + Math.sin(t * 6 - q * .9) * 7, 10 - q * .5, 8 - q * .3, 8), q % 2 ? K.lime : K.green, { line: K.ink, lw: 2 }); flat(rectPts(x + 8, y - 2 + Math.sin(t * 6) * 7, 12, 3), K.red); });
    if (popk(t, tDg - .5, .5) > 0) { const [x, y] = iso(21.5 + .6 * Math.sin(t * 1.3), 12.8); ent(21.5 + 12.8, () => dog(x, y, Math.cos(t * 1.3) > 0 ? 1 : -1, K.white, t * 2, 1.1)); }
    // the fence that keeps them apart
    for (let i = 13; i < 24; i++) ent(i + 11.7, () => { const [x, y] = iso(i, 11.6), [x2, y2] = iso(i + 1, 11.6); flat(rectPts(x - 3, y - 30, 6, 30), K.white, { line: K.ink, lw: 2 }); flat([[x, y - 26], [x2, y2 - 26], [x2, y2 - 20], [x, y - 20]], K.white, { line: K.ink, lw: 2 }); flat([[x, y - 12], [x2, y2 - 12], [x2, y2 - 6], [x, y - 6]], K.white, { line: K.ink, lw: 2 }); });
    // the final fork: convertible (up the north road) or station wagon (down the south road)
    const kc = popk(t, tCv - 1, .5), kw = popk(t, tCv - .7, .5), pick = Math.floor(t * 1.2) % 4;
    ent(31 + 3.4 + 4.6, () => bld(31, 3.4, 2.4, 2.4, 120, K.red, { k: kc, lit: .4 + .5 * Math.max(seg(t, tCv - .3, tCv + .2), .3 + .3 * Math.sin(t * 4)), photo: CP + 'stage3_block1-1455-pos-' + (1 + pick), bw: 150, roof: K.orange }));
    ent(27 + 13.6 + 4.6, () => bld(27.2, 13.6, 2.2, 2.4, 120, K.teal, { k: kw, lit: .4 + .5 * Math.max(seg(t, tWg - .3, tWg + .2), .3 + .3 * Math.sin(t * 4 + 3)), photo: CP + 'stage3_block0-609-neg-2', bw: 150, roof: K.sky }));
    if (kc > 0) lab('CONVERTIBLE', ...iso(33.6, 6.6).map((v, q) => v + (q ? 40 : 160)), 6, K.gold, { k: kc }); if (kw > 0) lab('STATION WAGON', ...iso(29.8, 16.8).map((v, q) => v + (q ? 0 : 160)), 6, K.cyan, { k: kw });
    // oncoming traffic keeps the road alive
    for (let n = 0; n < 6; n++) { const u = frac(t * .05 + n / 6) * 40 - 6, vi = 34 - u; if (Math.abs(vi - ci) < 1.2) continue; ent(vi + 10.2, () => veh(vi, 10.25, 'i', ['taxi', 'car', 'amb'][n % 3], { col: [K.sky, K.violet][n % 2] })); }
    // the sports car (selected)
    ent(ci + 10.7, () => veh(ci, 10.7, 'i', 'sports', { sel: on(t, tOne - .3) }));
    if (t > tCv - .3) lab('?', cx + 10, cy - 100, 8, K.white, { box: false, k: popk(t, tCv - .3, .3) });
    // Clawd waves from the boxy district, then waits at the fork
    ent(13.4 + 8.9, () => clawdAt(13.4, 8.9, t, [[a, 'happy'], [tGr, 'thinking'], [tBox + .6, 'happy']], { flip: true, u: 7.5 }));
    ent(28.2 + 8.6, () => clawdAt(28.2, 8.6, t, [[a, 'neutral'], [tCv - .5, 'thinking'], [tWg, 'confused']], { u: 7.5, key: 'c9clawdB' }));
    drawEnts();
    // the RTS selection box: the car is grouped with the boxy things
    const gk = easeOut(seg(t, tGr - .2, tGr + .5)) * (1 - seg(t, tApart + .2, tApart + .6));
    if (gk > 0) { const x0 = iso(5.6, 8.8)[0] - 120, y0 = iso(11.6, 6.8)[1] - 380, x1 = iso(14, 9)[0] + 120, y1 = iso(13, 11.4)[1] + 30; ctx.save(); ctx.setLineDash([18, 12]); ctx.lineDashOffset = -t * 60; ctx.strokeStyle = K.lime; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, (x1 - x0) * gk, (y1 - y0) * gk); ctx.restore(); }
    // keep-apart sign at the fence
    const ka = popk(t, tApart - .2, .4);
    if (ka > 0) { const [x, y] = iso(16.5, 11.6); ctx.save(); ctx.translate(x, y - 110); ctx.scale(backOut(ka), backOut(ka)); flat(rectPts(-4, 30, 8, 80), K.ink); flat(ellPts(0, 0, 46, 46, 20), K.white, { line: K.ink, lw: 5 }); flat(ellPts(0, 0, 38, 38, 20), K.red); flat(rectPts(-25, -7, 50, 14), K.white); ctx.restore(); }
    camEnd();
    finish();
    hudBar('LV 1 · ROUTES', 'UNIT: SPORTS CAR', `DISTRICT ${Math.min(9, 5 + Math.floor(Math.max(0, ci) / 8))}/9`);
    toasts(t, [[tBox, 'GROUPED: BOXY THINGS', K.lime], [tApart + .1, 'KEPT APART: SNAKES, DOGS', K.orange], [tCv - .5, 'LAST FORK', K.gold]]);
    // the unit card: the car's own photo
    const uk = on(t, tOne - .2);
    if (uk > 0) ui(() => { const x = 40, y = H - 300 + (1 - uk) * 340; pbox(x, y, 300, 250, K.ink, K.red, 5); ctx.imageSmoothingEnabled = false; ctx.drawImage(small(CP + 'car-5826', 56, 1.4), x + 20, y + 20, 260, 186); ctx.imageSmoothingEnabled = true; ptxt('SPORTS CAR', x + 150, y + 226, 4, K.white); });
    minimap((mx, my) => { ctx.fillStyle = K.green; ctx.fillRect(mx - 125, my - 80, 250, 160); ctx.fillStyle = K.slate; ctx.fillRect(mx - 110, my - 4, 200, 8); ctx.fillRect(mx + 84, my - 70, 8, 140); ctx.fillStyle = K.tan; ctx.fillRect(mx - 60, my - 50, 60, 36); ctx.fillStyle = K.lime; ctx.fillRect(mx - 10, my + 20, 70, 40); const px = mx - 110 + clamp((ci + 6) / 36) * 200; ctx.fillStyle = Math.floor(t * 4) % 2 ? K.red : K.white; ctx.fillRect(px - 6, my - 6, 12, 12); });
    // the game dialog at the fork
    const dk2 = on(t, tCv - .4);
    if (dk2 > 0) ui(() => { const w = 1000, x = W / 2 - w / 2 + 40, y = H - 180 + (1 - dk2) * 220; pbox(x, y, w, 140, K.ink, K.white, 5); ptxt('WHICH WAY?', x + w / 2, y + 40, 6, K.white); const sel = t > tWg - .1 ? 1 : 0, bl = Math.floor(t * 3) % 2; ptxt((sel === 0 && bl ? '>' : ' ') + 'CONVERTIBLE', x + 260, y + 100, 6, K.gold); ptxt((sel === 1 && bl ? '>' : ' ') + 'STATION WAGON', x + 730, y + 100, 6, K.cyan); });
    cursor(t, [[tGr - 1, 1500, 950], [tGr - .2, 330, 120], [tGr + .5, 1250, 820]], [tGr - .2], { hold: .3 });
    cutIn(lt, t); cutOut(lt, dur);
  }

  // ================= LEVEL 2 · VOTES =================
  const C0 = { a: cs('tv_votes'), tEach: wt('tv_votes', 'Each'), tAdd: wt('tv_votes', 'add'), tNeg: wt('tv_votes', 'negative'), tBase: wt('tv_votes', 'switch'), tWin: wt('tv_votes', 'windows'), tV: wt('tv_votes', 'V'), tPt: wt('tv_votes', 'pointed'), tDist: wt('tv_votes', 'distinction') };
  const VF = 'blog/raw/v-figure-10x/';
  // rounds of voting: each round, 8 ballots arrive; the tally decides windows or basement
  const RLEN = 2.8, ROUNDS = [[1, 1, 1, -1, 1, 1, -1, 1], [-1, -1, 1, -1, -1, 1, -1, -1], [-1, 1, -1, -1, -1, 1, -1, -1], [1, 1, -1, 1, 1, 1, 1, -1], [-1, -1, -1, 1, -1, -1, 1, -1], [1, 1, 1, 1, -1, 1, 1, 1]];
  const ROADS = [['i', 0, 9, -1], ['i', 11, 21, 1], ['j', 0, 9, -1], ['j', 11, 21, 1]];
  const SCEN_C = scatter(37, 26, -1, 22, -1, 22, [[-1, 9.5, 22, 11.5], [9.5, -1, 11.5, 22], [8.2, 8.2, 12, 12], [11.4, 8, 12.8, 9.4], [12.6, 6.8, 14.2, 8.2], [8.4, 11.8, 12.2, 15.5]]);
  function votesShot(t, lt, dur) {
    const { a, tEach, tAdd, tNeg, tBase, tWin, tV, tPt, tDist } = C0;
    begin(); sea(t);
    camKeys(t, [[a - .3, 0, 520, .9], [tEach, 0, 560, 1.12], [tNeg - .3, 30, 560, 1.15], [tBase + .3, 30, 660, 1.2], [tDist, 30, 640, 1.15], [ce('tv_votes') + 1, 30, 650, 1.17]], .4);
    ground('C', -1, 22, -1, 22, (i, j) => (j === 10 && i !== 10) || (i === 10 && j !== 10) ? 'r' : (i === 10 && j === 10) ? 'r' : 'g');
    roadMarks('i', -1, 9, 10, 1, 1); roadMarks('i', 11, 22, 10, 1, 1); roadMarks('j', -1, 9, 10, 1, 1); roadMarks('j', 11, 22, 10, 1, 1);
    const r = Math.floor((t - tEach) / RLEN), f = frac((t - tEach) / RLEN), R = t >= tEach ? ROUNDS[clamp(r, 0, 5)] : null;
    let tally = 0, shown = false, res = 0;
    if (R) R.forEach((v, n) => { const arr = .12 + n * .065; if (f > arr + .2) tally += v; });
    if (R && f > .72) { shown = true; res = R.reduce((s, v) => s + v, 0); }
    const bk = popk(t, tNeg - .3, .8), litW = shown && res > 0 ? 1 : 0;
    // the V neuron's building (pointed on its billboard), with its negative side (round) opened below at "negative side";
    // a "stay dark" result keeps everything dark: the negative side shows what switches it off, it never lights up
    ent(22, () => bld(8.6, 8.6, 2.8, 2.8, 170, K.violet, { lit: litW, photo: VF + 'c4d493a', bw: 170, roof: K.plum, base: { k: bk, lit: 0, photo: VF + 'n1070575@.51,.49,.13', h: 170, pw: 1 } }));
    // the ballot box by the door
    ent(21.5, () => { isoBox(11.8, 8.4, .8, .8, 56, K.tan, 0); const [x, y] = iso(12.2, 8.8); flat(rectPts(x - 18, y - 60, 36, 6), K.ink); });
    // ballots flying in along the four roads
    if (R) R.forEach((v, n) => {
      const arr = .12 + n * .065, u = seg(f, arr - .12, arr + .2); if (u <= 0 || u >= 1) return;
      const [ax, a0, a1, s] = ROADS[n % 4], st = s < 0 ? a0 : a1, en = s < 0 ? 9 : 11, p = lerp(st, en, easeIn(u * .9) / .9 * .9 + u * .1);
      const [i, j] = ax === 'i' ? [p, 10.5] : [10.5, p], [x, y0] = iso(i, j), [bx, by] = iso(12.2, 8.8), q = seg(u, .75, 1), x2 = lerp(x, bx, q), y2 = lerp(y0, by - 60, q) - 40 - 80 * Math.sin(q * Math.PI);
      ent(i + j + 1, () => { flat(ellPts(x, y0, 24, 10, 10), 'rgba(26,28,44,.3)'); ctx.save(); ctx.translate(x2, y2); flat(rectPts(-36, -26, 72, 52), v > 0 ? K.lime : K.sky, { line: K.ink, lw: 4 }); flat([[-36, -26], [0, 0], [36, -26]], 'rgba(0,0,0,0)', { line: K.ink, lw: 3 }); flat(rectPts(-16, 4, 32, 8), K.ink); if (v > 0) flat(rectPts(-4, -8, 8, 32), K.ink); ctx.restore(); });
    });
    // Clawd counts votes
    drawScatter(SCEN_C, t);
    ent(23, () => clawdAt(13.4, 7.6, t, [[a, 'happy'], [tEach + .5, 'thinking'], [tBase, 'surprised'], [tBase + 1.5, 'idea'], [tDist, 'proud']], { flip: true, u: 8 }));
    drawEnts();
    { const [bx, by] = iso(10, 10); lab('NEGATIVE SIDE', bx - 400, by + 150, 5, K.sky, { k: popk(t, tNeg - .1, .4) }); lab('WINDOWS', bx + 250, by - 330, 5, K.gold, { k: popk(t, tWin - .2, .4) * (1 - seg(t, tV - .5, tV - .2)) }); lab('V NEURON', bx + 290, by - 230, 6, K.white, { k: popk(t, tV - .2, .4) }); }
    if (R) { lab((tally > 0 ? '+' : '') + tally, -250, 330, 9, tally > 0 ? K.lime : tally < 0 ? K.sky : K.white); if (shown) lab(res > 0 ? 'LIGHT UP!' : 'STAY DARK', -250, 440, 6, res > 0 ? K.gold : K.sky, { k: seg(f, .72, .8) }); }
    camEnd();
    finish();
    hudBar('LV 2 · VOTES', R ? `ROUND ${clamp(r, 0, 5) + 1}` : '', `TALLY ${tally > 0 ? '+' : ''}${tally}`);
    banner(t, a - .1, 'LEVEL 2', 'EVERY NEURON VOTES', K.gold, 2.2);
    // the tally over the building and the result

    toasts(t, [[tAdd - .2, 'VOTES ADD UP', K.lime], [tBase - .2, 'OFF-SWITCHES COUNT', K.sky], [tPt - .2, 'POINTED vs ROUND', K.gold]], 3);
    cutIn(lt, t); cutOut(lt, dur);
  }

  // ================= near-twins in the basement =================
  const D0 = { a: cs('tv_pairs'), tTwin: wt('tv_pairs', 'near-twin'), P: [['taxis', 'TAXI', 'AMBULANCE', wt('tv_pairs', 'Taxis'), K.gold], ['broccoli', 'BROCCOLI', 'CAULIFLOWER', wt('tv_pairs', 'Broccoli'), K.green], ['spoonbills', 'SPOONBILL', 'FLAMINGO', wt('tv_pairs', 'Spoonbills'), K.orange]] };
  const SCEN_D = scatter(51, 60, -2, 31, 4, 20, [[-2, 8.6, 31, 11.3], [1.6, 11.2, 5.2, 17.5], [10.6, 11.2, 14.2, 17.5], [19.6, 11.2, 23.2, 17.5], [23.6, 15.5, 27, 18], [0, 5, 3, 8], [9, 5, 12, 8], [18, 5, 21, 8], [27, 5, 30, 8]]);
  function pairsShot(t, lt, dur) {
    const { a, tTwin, P } = D0;
    begin(); sea(t);
    const C = P.map((p, n) => iso(2 + n * 9 + 1.3, 11.6 + 1.3));
    camKeys(t, [[a - .3, C[0][0] + 200, C[0][1], .74], [tTwin + .4, C[0][0] + 160, C[0][1] - 10, .84], [P[0][3] - .6, C[0][0] + 20, C[0][1] - 40, 1.2], [P[1][3] - 1, C[0][0] + 20, C[0][1] - 40, 1.2], [P[1][3] - .1, C[1][0] + 20, C[1][1] - 40, 1.2], [P[2][3] - 1, C[1][0] + 20, C[1][1] - 40, 1.2], [P[2][3] - .1, C[2][0] + 40, C[2][1] - 40, 1.2], [ce('tv_pairs') + .3, C[2][0] + 60, C[2][1] - 40, 1.22]], .4);
    ground('D', -2, 31, 4, 20, (i, j) => j === 10 ? 'r' : j === 9 ? 's' : 'g');
    roadMarks('i', -2, 31, 10, 1, 1);
    drawScatter(SCEN_D, t);
    for (let n = 0; n < 5; n++) { const u = frac(t * .05 + n / 5) * 36 - 3; ent(u + 10.5, () => veh(u, 10.5, 'i', ['taxi', 'amb', 'car', 'taxi', 'car'][n], { col: [K.sky, K.violet][n % 2] })); }
    // the other neurons of the last district (behind the road), their basements opening in a wave too
    [0, 9, 18, 27].forEach((i, n) => ent(i + 5 + 6, () => bld(i, 5.4, 2.4, 2.4, 100 + 30 * (n % 2), [K.sky, K.violet, K.tan, K.orange][n], { lit: .3, roof: dk([K.sky, K.violet, K.tan, K.orange][n], .3) })));
    P.forEach(([k, pos, neg, tw, col], n) => {
      const i = 2 + n * 9, j = 11.6, kb = popk(t, tTwin - .4 + n * .15, .7), kl = popk(t, tw - .3, .5) * (n < 2 ? 1 - seg(t, P[n + 1][3] - 1, P[n + 1][3] - .6) : 1), focus = on(t, tw - .3, tw + 2.2), lit = .45 + .5 * focus;
      ent(i + j + 6, () => bld(i, j, 2.6, 2.6, 130, col, { lit, photo: NP + k + '-positive-1', bw: 150, roof: dk(col, .3), base: { k: kb, lit, photo: NP + k + '-negative-1', h: 160 } }));
      if (kl > 0) { const [x, y] = iso(i + 1.3, j + 1.3); lab('< ' + pos, x + 250, y - 230, 7, col, { k: kl }); lab('VS ' + neg + ' >', x - 420, y + 200, 7, K.sky, { k: Math.min(kl, popk(t, tw + .2, .5)) }); }   // each label points at its own photo
    });
    // a pixel flamingo by the last building, standing on one leg
    ent(40, () => { const [x, y] = iso(25.2, 16.6); flat(ellPts(x + 4, y, 22, 8, 10), 'rgba(26,28,44,.3)'); flat(rectPts(x - 2, y - 50, 4, 50), K.red); flat([[x - 2, y - 36], [x + 10, y - 30], [x - 2, y - 28]], K.red); flat(ellPts(x, y - 62, 22, 14, 12), K.pink, { line: K.ink, lw: 3 }); flat([[x + 14, y - 66], [x + 22, y - 100], [x + 28, y - 100], [x + 22, y - 66]], K.pink, { line: K.ink, lw: 2 }); flat(ellPts(x + 28, y - 104, 8, 7, 8), K.pink, { line: K.ink, lw: 2 }); flat([[x + 34, y - 104], [x + 44, y - 96], [x + 34, y - 98]], K.ink); });
    ent(41, () => clawdAt(25.8, 15.0, t, [[a, 'happy'], [P[2][3], 'surprised'], [P[2][3] + 1, 'laugh']], { flip: true, u: 7.5, extra: { aR: t > P[2][3] ? 1.2 : undefined } }));
    drawEnts();
    camEnd();
    finish();
    hudBar('LV 2 · LAST DISTRICT', 'EVERY NEURON HAS A TWIN', `TWINS ${P.filter(p => t > p[3]).length}/3`);
    toasts(t, [[tTwin - .2, 'ITS OFF-SWITCH: A NEAR-TWIN', K.sky]], 3.2);
    cutIn(lt, t); cutOut(lt, dur);
  }

  // ================= LEVEL 3 · WHISPERS (night) =================
  const E0 = { a: cs('tv_weak'), tWh: wt('tv_weak', 'whispers'), tMil: wt('tv_weak', 'million'), tReg: wt('tv_weak', 'register'), t160: wt('tv_weak', 'sixty'), tSh: wt('tv_weak', 'peak'), c: cs('tv_cut'), tSil: wt('tv_cut', 'silence'), tNet: wt('tv_cut', 'network'), tBar: wt('tv_cut', 'barely'), tTie: wt('tv_cut', 'tie-breakers'), tTorn: wt('tv_cut', 'torn') };
  const WORDS = ['THE', 'OF', 'AND', 'SEA', 'RAN', 'BLUE', 'IF', 'CAT', 'SO', 'UP', 'TEA', 'A', 'LAMP', 'WAS', 'NOW', 'MAP'];
  const SCEN_E = scatter(71, 60, -6, 24, 1, 22, [[-6, 8.6, 24, 11.3], [13.6, 10, 15.4, 22], [1, 5, 4.4, 8.4], [10.6, 12.6, 13.6, 17.4], [15.6, 12.6, 18.6, 17.4], [4, 11.4, 6.4, 13.4]]);
  function weakShot(t, lt, dur) {
    const { a, tWh, tMil, tReg, t160, tSh, c, tSil, tNet, tBar, tTie, tTorn } = E0;
    begin(); sea(t, 1);
    const fork = t > tTie - 1.6, B = iso(2.7, 6.7);
    camKeys(t, [[a - .3, B[0] + 60, B[1] - 20, .95], [tMil, B[0] + 60, B[1] - 10, 1.12], [tSh - .4, B[0] + 60, B[1] - 30, 1.12], [tSh + .3, B[0] + 60, B[1] - 50, 1.22], [c + .6, B[0] - 160, B[1] + 20, 1.0], [tBar, B[0] - 160, B[1] + 20, 1.0], [tTie - 1.3, 80, 820, 1.1], [tTorn + 2, 90, 830, 1.12]], .4);
    ground('E', -6, 24, 1, 22, (i, j) => j === 10 ? 'r' : j === 9 ? 's' : (i === 14 && j > 10) ? 'r' : 'g', 1);
    roadMarks('i', -6, 24, 10, .5, 0); roadMarks('j', 11, 22, 14, .5, 0);
    drawScatter(SCEN_E, t, 1);
    const mute = ease(seg(t, tSil, tSil + 1.4));
    // the crowd of words walking along the sidewalk, right past the neuron's door
    let flick = 0, blaze = 0;
    const N = 30, sp = 2.4, tags = [];
    for (let n = 0; n < N; n++) {
      const g = (t - a) * sp / 30 + n / N, u = frac(g), gen = Math.floor(g), i = -6 + u * 30, lane = 9.25 + (n % 3) * .25;
      const big = mute < .5 && (hash(n * 13.7 + gen * 5.1) > .985 || (t > tSh - 1.6 && t < tSh + .6 && Math.abs(i - 2.7 - (t - tSh) * sp) < .5));
      const d = Math.abs(i - 2.7);
      if (d < 1.6) { flick = Math.max(flick, (1 - d / 1.6) * .3 * (1 - mute)); if (big) blaze = Math.max(blaze, 1 - d / 1.6); }
      const [x, y] = iso(i, lane);
      ent(i + lane, () => walker(x, y, big ? K.gold : [K.silver, K.slate, K.teal, K.violet][n % 4], (t - a) * 2.4 + n * .37, 1.2));
      if (d < 3) tags.push([d, WORDS[(n + gen * 3) % WORDS.length], x, y - 128 - (2 - n % 3) * 56, big]);
      if (d < 1.6 && !big && mute < .5) ent(i + lane + .1, () => { const [bx, by] = iso(2.7, 6.7); glow(bx, by - 120, 40, '#FFD58A', .25 * (1 - d / 1.6)); });
    }
    // word tags: only the walkers nearest the door carry one (about six), each lane's tags on their own row so they
    // stack instead of colliding (and clear the lamp heads); a tag fades when it nears another label on screen
    const kf2 = popk(t, tTie - 1.6, .5), LABS = [[B[0] - 330, B[1] - 330, popk(t, tWh - .2, .4) * (1 - seg(t, c + .2, c + .6))], [...iso(12.1, 14.1).map((v, q) => v - (q ? 330 : 180)), kf2], [...iso(17.1, 14.1).map((v, q) => v + (q ? -330 : 180)), kf2]];
    tags.forEach(([d, s, x, y, big]) => {
      const near = Math.max(0, ...LABS.map(([lx, ly, lk]) => lk * (1 - seg(Math.hypot((x - lx) * .6, y - ly), 120, 220))));
      const k = clamp((3 - d) / 1.2) * (1 - near); if (k > .02) lab(s, x, y, 4, big ? K.gold : K.silver, { fill: K.ink, edge: big ? K.gold : K.slate, k });
    });
    // the neuron (it loves lighthouses): a faint flicker per word; it blazes for the rare one
    const lit = Math.max(flick, blaze, .3 * mute, Math.sin(Math.PI * seg(t, tSh - .2, tSh + 1.3)));   // muted: a steady glow, it just stops flickering
    ent(16, () => bld(1.5, 5.5, 2.4, 2.4, 160, K.navy, { lit, photo: NP + 'lighthouses-positive-1', bw: 150, roof: K.blue, dimWin: .85 }));
    // the shout: one rare word makes the windows blaze
    const sh = seg(t, tSh - .2, tSh + 1.3);
    if (sh > 0 && sh < 1) ent(16.5, () => { const [x, y] = [B[0], B[1] - 330], k = Math.sin(sh * Math.PI); for (let q = 0; q < 12; q++) { const a0 = q / 12 * TAU + t * .8, r0 = 90, r1 = 260 + 120 * k; flat([[x + Math.cos(a0) * r0, y + Math.sin(a0) * r0], [x + Math.cos(a0 + .12) * r1, y + Math.sin(a0 + .12) * r1], [x + Math.cos(a0 - .12) * r1, y + Math.sin(a0 - .12) * r1]], K.gold, { alpha: .85 * k }); } glow(x, y, 420, '#FFE08A', k); });
    lab('LIGHTHOUSE NEURON', B[0] - 330, B[1] - 330, 5, K.cyan, { k: popk(t, tWh - .2, .4) * (1 - seg(t, c + .2, c + .6)) });
    if (blaze > .3 || (sh > .05 && sh < .9)) lab('!!', B[0] + 210, B[1] - 250, 10, K.gold, { box: false });
    // the close call at the fork: husky or wolf?
    const tipped = seg(t, tTie + .2, tTie + 1.1);
    ent(13 + 13 + 4, () => bld(11, 13, 2.2, 2.2, 110, K.white, { k: kf2, lit: lerp(.9, .25, tipped), photo: NP + 'wolves-negative-1', bw: 130 }));
    ent(16 + 13 + 4, () => bld(16, 13, 2.2, 2.2, 110, K.slate, { k: kf2, lit: lerp(.25, .9, tipped), photo: NP + 'wolves-positive-1', bw: 130 }));
    if (kf2 > 0) { lab('HUSKY', ...iso(12.1, 14.1).map((v, q) => v - (q ? 330 : 180)), 6, K.white, { k: kf2 }); lab('WOLF', ...iso(17.1, 14.1).map((v, q) => v + (q ? -330 : 180)), 6, K.silver, { k: kf2 }); }
    if (fork) { const dj = kf(t, [[tTie - 1.6, 9.6], [tTie, 12.4], [tTorn + 1, 14.4]]), di = 14.5 + lerp(-.55, .55, tipped) * seg(dj, 12.4, 14.4), [x, y] = iso(di, dj); ent(di + dj + .5, () => dog(x, y, -1, K.white, t * 3, 1.2)); if (t > tTie - .2 && t < tTorn + .6) lab('?', x, y - 90, 7, K.white, { box: false }); }
    // street lamps
    for (let i = -4; i < 24; i += 4) ent(i + 9, () => { const [x, y] = iso(i, 9); flat(rectPts(x - 3, y - 90, 6, 90), K.ink); flat(rectPts(x - 10, y - 98, 20, 10), K.gold); glow(x, y - 92, 80, '#FFD58A', .55); });
    ent(30, () => clawdAt(6.2, 12.2, t, [[a, 'happy'], [tMil, 'surprised'], [tReg, 'bored'], [tSh - .3, 'excited'], [c, 'determined'], [tSil + 1.4, 'smug'], [tTie + .3, 'nervous'], [tTorn, 'confused']], { u: 7.5, flip: true }));
    drawEnts();
    camEnd();
    finish();
    const words = Math.round(1e8 * Math.pow(seg(t, tMil - .6, tReg), 2.2)), shouts = Math.round(160 * words / 1e8);   // the shouts are counted among the words that have passed
    hudBar('LV 3 · WHISPERS', `WORDS ${words.toLocaleString('en-US')}`, `SHOUTS ${shouts}`);
    banner(t, a - .1, 'LEVEL 3', 'WHISPERS', K.cyan, 2.0);
    toasts(t, [[tMil, '100,000,000 WORDS PASS BY', K.silver], [t160, 'ONLY ~160 MAKE IT SHOUT', K.gold], [tBar - .2, 'THE CITY KEEPS RUNNING', K.lime], [tTie + .4, 'CLOSE CALL TIPPED', K.orange]], 3);
    // the settings panel and the whispers slider
    const sk = on(t, c - .1, tBar + 1.6, .35, .35);
    if (sk > 0) ui(() => { const w = 640, x = W - 710 + (1 - sk) * 780, y = 330; pbox(x, y, w, 320, K.ink, K.silver, 5); ptxt('SETTINGS', x + w / 2, y + 48, 7, K.white); ptxt('WHISPERS', x + 40, y + 130, 6, K.silver, { align: 'left' }); ctx.fillStyle = K.dusk; ctx.fillRect(x + 40, y + 180, w - 80, 24); ctx.fillStyle = K.cyan; ctx.fillRect(x + 40, y + 180, (w - 80) * (1 - mute), 24); const kx = x + 40 + (w - 80) * (1 - mute); ctx.fillStyle = K.ink; ctx.fillRect(kx - 20, y + 158, 40, 68); ctx.fillStyle = K.white; ctx.fillRect(kx - 14, y + 164, 28, 56); ptxt(mute > .98 ? 'MUTED' : Math.round(100 * (1 - mute)) + '%', x + w / 2, y + 268, 7, mute > .98 ? K.orange : K.cyan); });
    if (sk > .5) cursor(t, [[Math.min(c + .2, tSil - .7), 900, 760], [tSil - .1, W - 710 + 600, 515], [tSil + 1.4, W - 710 + 40, 515], [tSil + 2.2, 1100, 900]], [tSil - .05], { hold: .2 });
    // the close-call meter
    const mk = on(t, tTie - .8);
    if (mk > 0) ui(() => { const w = 760, x = W / 2 - w / 2, y = H - 180 + (1 - mk) * 200, s = lerp(.53, .47, tipped); pbox(x, y, w, 130, K.ink, K.white, 5); ctx.fillStyle = K.white; ctx.fillRect(x + 30, y + 76, (w - 60) * s, 28); ctx.fillStyle = K.slate; ctx.fillRect(x + 30 + (w - 60) * s, y + 76, (w - 60) * (1 - s), 28); ctx.fillStyle = K.orange; ctx.fillRect(x + w / 2 - 3, y + 66, 6, 48); ptxt('HUSKY', x + 30, y + 38, 6, K.white, { align: 'left' }); ptxt('WOLF', x + w - 30, y + 38, 6, K.silver, { align: 'right' }); });
    cutIn(lt, t); cutOut(lt, dur);
  }

  // ================= the book item: thinking in pages =================
  const F0 = { a: cs('tv_pages'), tPg: wt('tv_pages', 'pages'), tOne: wt('tv_pages', 'one'), tFour: wt('tv_pages', 'four'), tRare: wt('tv_pages', 'rare'), tOft: wt('tv_pages', 'often'), tSpec: wt('tv_pages', 'specific'), tDoz: wt('tv_pages', 'dozen'), tSo: wt('tv_pages', 'So'), tWrong: wt('tv_pages', 'probably') };
  function pagesShot(t, lt, dur) {
    const { a, tPg, tOne, tFour, tRare, tOft, tSpec, tDoz, tSo, tWrong } = F0;
    begin(); sea(t);
    camKeys(t, [[a - .3, -40, 640, .9], [ce('tv_pages') + .5, 0, 640, .95]], .4);
    ground('F', -8, 16, 2, 20, (i, j) => j === 10 ? 'r' : i === 4 ? 'r' : 'g');
    roadMarks('i', -8, 16, 10, 1, 1);
    for (let n = 0; n < 4; n++) ent(n * 5 + 6, () => bld(-5 + n * 5, 5.5, 2.2, 2.2, 90 + 30 * (n % 2), [K.orange, K.sky, K.violet, K.gold][n], { lit: .2 }));
    [[-2, 13], [7, 14], [10, 12.5]].forEach(([i, j]) => ent(i + j, () => tree(i, j, 1.2)));
    drawScatter(SCEN_E, t);
    // the rare neuron: pages flip fast and it fires once, on page 31
    // then ("So if a label sounds narrow...") a neuron labelled RARE FEELING that fires on every page: the label is wrong
    const ph3 = t > tSo - .2, rarePhase = t > tSpec - .2 && !ph3, hitPage = 31;
    const flipRate = rarePhase ? 10 : ph3 ? 1.6 : 1 / 1.25, pg = ph3 ? 1 + Math.floor((t - tSo + .2) * flipRate) : rarePhase ? Math.min(hitPage, 1 + Math.floor((t - tSpec + .2) * flipRate)) : 1 + Math.floor(Math.max(0, t - tPg) * flipRate);
    const hitAt = tSpec - .2 + (hitPage - 1) / 10, rareHit = rarePhase && pg === hitPage;
    drawEnts();
    camEnd();
    // the item window over the dimmed city
    const wk = backOut(seg(t, a - .1, a + .45));
    ctx.save(); resetMatrix(); ctx.fillStyle = 'rgba(16,18,40,.6)'; ctx.fillRect(0, 0, W, H);
    ctx.translate(W / 2, 620); ctx.scale(wk, wk); ctx.translate(-W / 2, -620);
    flat(rectPts(150, 196, 1620, 850), K.ink); flat(rectPts(158, 204, 1604, 834), K.navy); flat(rectPts(158, 204, 1604, 70), K.dusk);
    // the shelf Clawd stands on
    flat(rectPts(180, 950, 400, 28), K.brown, { line: K.ink, lw: 4 });
    tourist(380, 950, 11, 'party', { ...emotions(t, [[a, 'happy'], [tOne, 'thinking'], [tFour, 'happy'], [tRare, 'thinking'], [tOft, 'surprised'], [tSpec + .4, 'sleepy'], [hitAt, 'surprised'], [hitAt + .8, 'excited'], [tSo, 'thinking'], [tWrong - .3, 'surprised']]), view: 'q', boilKey: 'c9clawdF' });
    const bx = 1130, by = 630, bs = .9;
    ctx.translate(bx, by); ctx.scale(bs, bs);
    // the open book: cover, two pages, lines of words
    flat(rectPts(-560, -330, 1120, 660), K.brown, { line: K.ink, lw: 6 }); flat(rectPts(-540, -310, 530, 620), K.cream, { line: K.ink, lw: 4 }); flat(rectPts(10, -310, 530, 620), K.cream, { line: K.ink, lw: 4 }); flat(rectPts(-12, -320, 24, 640), dk(K.brown, .3));
    const lineY = r => -265 + r * 40, words = (p, side) => { const out = []; for (let r = 0; r < 14; r++) { let x = side - 245; while (x < side + 225) { const w = 28 + 70 * hash(p * 31 + r * 7 + x); if (x + w > side + 245) break; out.push([x, lineY(r), w]); x += w + 18; } } return out; };
    const fp = frac(ph3 ? (t - tSo + .2) * flipRate : rarePhase ? (t - tSpec + .2) * flipRate : Math.max(0, t - tPg) * flipRate), turning = t > tPg && fp < .35 && !(rarePhase && t > hitAt);
    for (const side of [-275, 275]) {
      const WD = words(pg * 2 + (side > 0), side);
      WD.forEach(([x, y, w]) => flat(rectPts(x, y - 6, w, 12), K.silver));
      // hits: about four a page for a common neuron (two per side); the rare one lights once, on page 31
      const hits = rarePhase ? (rareHit && side > 0 ? [7] : []) : t > tOne - .4 ? [3 + pg * 5, 19 + pg * 3].map(q => q % WD.length) : [];
      hits.forEach((q, n) => { const [x, y, w] = WD[q % WD.length]; const t0 = rarePhase ? hitAt : ph3 ? tSo - .2 + (pg - 1) / flipRate : Math.max(tPg, a) + (pg - 1) / flipRate, kk = popk(t, t0 + .15 + n * .14 + (side > 0) * .28, .3); if (kk <= 0) return; const cH = rarePhase ? '#D9A0FF' : '#FFD58A'; glow(x + w / 2, y, 90, cH, 1.2 * kk); const hc = rarePhase ? K.violet : K.orange; flat(rectPts(x - 8, y - 14, w + 16, 28), hc, { line: K.ink, lw: 4 }); const sk = backOut(kk); flat(starPts(x + w / 2, y - 40, 26 * sk, .42, 4), K.gold, { line: K.ink, lw: 3 }); for (let z = 0; z < 4; z++) { const ang = z * TAU / 4 + .4, rr = 30 + 40 * easeOut(kk); flat(rectPts(x + w / 2 + Math.cos(ang) * rr - 5, y + Math.sin(ang) * rr - 5, 10, 10), hc, { alpha: 1 - kk * .7 }); } });
    }
    if (turning) { const k = fp / .35, w = 530 * Math.cos(k * Math.PI); flat(rectPts(w > 0 ? 10 : 10 + w, -310, Math.abs(w), 620), mixCol(K.cream, K.silver, .3), { line: K.ink, lw: 4 }); }
    ctx.restore();
    finish();
    hudBar('LV 3 · PAGES', ph3 ? 'LABEL: RARE FEELING' : rarePhase ? 'A TRULY SPECIFIC NEURON' : 'A COMMON NEURON', `PAGE ${pg}`);
    toasts(t, [[tOne - .2, '1 WORD IN 100', K.gold], [tFour - .1, '= ~4 HITS A PAGE', K.gold], [tOft - .3, 'FAR TOO OFTEN!', K.red], [tDoz - .4, 'ONCE EVERY FEW DOZEN PAGES', K.violet]], 3);
    if (wk > .9) ui(() => { ptxt('ITEM: BOOK', 200, 240, 6, K.gold, { align: 'left' }); pbox(1130 - 440, 958, 880, 66, K.ink, rarePhase ? K.violet : ph3 ? K.red : K.gold, 5); ptxt(rarePhase ? `HITS: ${t > hitAt ? 1 : 0} IN ${pg} PAGES` : `HITS ON THIS PAGE: ${t > tOne - .2 ? 4 : 0}`, 1130, 992, 6, rarePhase ? K.violet : K.gold); });
    // the verdict: a red stamp across the book
    const sk2 = popk(t, tWrong - .4, .35);
    if (sk2 > 0) ui(() => { ctx.translate(1130, 600); ctx.rotate(-.12); ctx.scale(backOut(sk2) * (1 + 2 * (1 - sk2)), backOut(sk2) * (1 + 2 * (1 - sk2))); const w = ptW('LABEL WRONG?', 11) + 90; pbox(-w / 2, -70, w, 140, K.ink, K.red, 8); ptxt('LABEL WRONG?', 0, 2, 11, K.red, { sh: K.ink }); });
    if (t > tSpec + .4 && t < hitAt) ui(() => { const b = Math.floor(t * 2) % 3; ptxt('Z' + (b > 0 ? ' Z' : '') + (b > 1 ? ' Z' : ''), 450, 760 - b * 20, 7, K.white, { align: 'left' }); });
    cutIn(lt, t); cutOut(lt, dur);
  }

  // ================= the Titanic harbour, then the taxi drives off the map =================
  const G0 = { a: cs('tv_titanic'), tTi: wt('tv_titanic', 'Titanic'), tVoy: wt('tv_titanic', 'voyages'), tAn: wt('tv_titanic', 'analogy'), tIsh: wt('tv_titanic', 'Titanic-ish'), e: ce('tv_titanic'), nx: chapStart('ch10') };
  function ship(i, j, len, s, lit, o = {}) {
    // hull along +i, superstructure, funnels; portholes light up
    isoBox(i, j, len, .9 * s, 46 * s, K.ink, -10, { tc: K.dusk, lc: K.ink, rc: K.ink });
    flat([faceL(i, j, len, .9 * s, 0, 4 * s - 10), faceL(i, j, len, .9 * s, 1, 4 * s - 10), faceL(i, j, len, .9 * s, 1, 12 * s - 10), faceL(i, j, len, .9 * s, 0, 12 * s - 10)], K.red);
    isoBox(i + len * .12, j + .12 * s, len * .74, .66 * s, 34 * s, K.white, 36 * s - 10, { lw: 2 });
    for (let q = 0; q < Math.round(len * 3); q++) { const p = faceL(i + len * .12, j + .12 * s, len * .74, .66 * s, (q + .5) / Math.round(len * 3), 36 * s - 10 + 14 * s); flat(rectPts(p[0] - 4, p[1] - 4, 8, 8), lit > .15 + .6 * hash(q) ? K.gold : K.slate); }
    const nf = o.funnels ?? 4; for (let q = 0; q < nf; q++) { const fi = i + len * (.24 + q * .5 / Math.max(1, nf - 1)) * (nf > 1 ? 1 : 1); isoBox(fi, j + .3 * s, .3 * s, .3 * s, 40 * s, K.gold, 70 * s - 10, { lw: 2 }); isoBox(fi, j + .3 * s, .3 * s, .3 * s, 9 * s, K.ink, 101 * s - 10, { lw: 1 }); }
    if (lit > .02) { const [x, y] = iso(i + len / 2, j + .45 * s); glow(x, y - 60 * s, 170 * s * Math.sqrt(len / 3), '#FFD58A', .55 * lit); }
  }
  const SCEN_G = scatter(91, 34, -4, 16, 0, 9, [[-5, 6.4, 17, 8.4], [3.6, 6, 5.6, 9], [10.6, 4.2, 13.6, 7.4], [6.4, 7.6, 8.4, 9]]);
  function titanicShot(t, lt, dur) {
    const { a, tTi, tVoy, tAn, tIsh, e, nx } = G0;
    // the ending: a taxi drives along the dock, down the pier, off the edge of the map, onto a paper page
    const tx0 = e - 1.7, turn = tx0 + 1.1, drop = tx0 + 2.3, land = drop + .5;
    const depix = seg(t, drop - .1, land + .45), px = Math.max(1, Math.round(lerp(PXS, 1, easeInOut(depix))));
    begin();
    sea(t);
    camKeys(t, [[a - .3, -300, 360, 1.05], [tTi + .5, -330, 360, 1.1], [tVoy - .4, -220, 420, .92], [tAn + .3, -250, 400, .95], [turn, -420, 470, .98], [drop, -560, 760, .95], [land + .3, -640, 1180, .95], [nx + 2, -720, 1250, .97]], .3);
    // the paper page under the map (beyond the island's front edge)
    ctx.save(); ctx.translate(-760, 1580); ctx.rotate(-.05);
    flat(rectPts(-800, -420, 1600, 900), '#EDE3CC', { shadow: [22, 26, 'rgba(0,0,0,.45)'] });
    for (let r = 0; r < 17; r++) flat(rectPts(-760, -350 + r * 48, 1520, 3), '#C9C0E0');
    flat(rectPts(-620, -420, 4, 900), '#E8A0A0'); ctx.restore();
    ground('G', -4, 16, 0, 14, (i, j) => j === 7 ? 'r' : (i === 4 && j > 7) ? 'r' : j >= 9 ? 'w' : 'g');
    // water sparkle
    for (let q = 0; q < 30; q++) { const i = -4 + hash(q * 3.3) * 20, j = 9 + hash(q * 7.1) * 5, [x, y] = iso(i, j); if (frac(t * .6 + hash(q)) < .5 && !(i > 4 && i < 5)) flat(rectPts(x - 12, y, 24, 4), K.sky); }
    roadMarks('i', -4, 16, 7, 1, 1); roadMarks('j', 8, 14, 4, 1, 1);
    drawScatter(SCEN_G, t);
    // pier posts
    for (let j = 9; j < 14; j++) ent(4 + j + .2, () => { for (const di of [0, 1]) { const [x, y] = iso(4 + di, j + 1); flat(rectPts(x - 4, y, 8, 30), K.brown, { line: K.ink, lw: 2 }); } });
    // the Titanic, docked and blazing; the analogies float nearby, lit a little
    const ti = .95 - .1 * Math.sin(t * 2) ** 2, faint = n => .45 + .08 * Math.sin(t * 2.3 + n);
    ent(9.2 + 9.2, () => ship(-1.6, 9.4, 5.2, 1, on(t, a - .3) * ti));
    ent(-2 + 12.6, () => { const bob = Math.sin(t * 1.6) * 4; ctx.save(); ctx.translate(0, bob); ship(-3.6, 12.3, 1.8, .6, faint(0) * on(t, tVoy - 1.1), { funnels: 1 }); ctx.restore(); });
    ent(8 + 12, () => { const bob = Math.sin(t * 1.4 + 1) * 4; ctx.save(); ctx.translate(0, bob); ship(7.4, 11.2, 2.8, .72, faint(1) * on(t, tVoy - .7), { funnels: 2 }); ctx.restore(); });
    ent(12 + 5 + 4, () => bld(11, 4.6, 2.2, 2.2, 100, K.sky, { lit: faint(2) * on(t, tVoy - .4) }));
    // the cruise poster on that building's roof (a drawn poster: sun, sea, a liner)
    ent(12 + 5 + 4.1, () => { const [x, y] = iso(12.1, 5.7), w = 130, h = 110, top = y - 100 - 24 - h; flat(rectPts(x - w * .32, y - 126, 7, 26), K.ink); flat(rectPts(x + w * .32 - 7, y - 126, 7, 26), K.ink); flat(rectPts(x - w / 2 - 8, top - 8, w + 16, h + 16), K.ink); flat(rectPts(x - w / 2, top, w, h * .6), K.orange); flat(ellPts(x, top + h * .45, 24, 24, 14), K.gold); flat(rectPts(x - w / 2, top + h * .6, w, h * .4), K.blue); flat([[x - 40, top + h * .62], [x + 40, top + h * .62], [x + 30, top + h * .75], [x - 34, top + h * .75]], K.ink); glow(x, top + h / 2, 140, '#FFD58A', .5 * faint(2) * on(t, tVoy - .4)); });
    const kt = on(t, tTi - .4), kv = on(t, tVoy - .9);
    if (kt > 0) lab('TITANIC', ...iso(1, 9.9).map((v, q) => v - (q ? 250 : 0)), 7, K.gold, { k: kt });
    if (kv > 0) { lab('FERRY', ...iso(-2.7, 12.6).map((v, q) => v - (q ? 120 : 0)), 5, K.silver, { k: kv }); lab('STEAMSHIP', ...iso(8.8, 11.6).map((v, q) => v - (q ? 150 : 0)), 5, K.silver, { k: on(t, tVoy - .6) }); lab('CRUISE POSTER', ...iso(12.1, 5.7).map((v, q) => v - (q ? 290 : 0)), 5, K.silver, { k: on(t, tVoy - .3) }); }
    // the iceberg drifting toward the Titanic (Clawd is not happy about it)
    const ib = iso(lerp(.5, 2.2, seg(t, a, e + 1)), 13.3);
    ent(15.8, () => { flat(ellPts(ib[0], ib[1] + 4, 70, 12, 14), K.sky); flat([[ib[0] - 60, ib[1]], [ib[0] - 30, ib[1] - 60], [ib[0], ib[1] - 40], [ib[0] + 20, ib[1] - 84], [ib[0] + 64, ib[1]]], K.white, { line: K.ink, lw: 3 }); flat([[ib[0] + 20, ib[1] - 84], [ib[0] + 64, ib[1]], [ib[0] + 20, ib[1]]], K.cyan); });
    ent(7.2 + 8.4, () => clawdAt(7.2, 8.4, t, [[a, 'happy'], [tTi, 'love'], [tVoy + .5, 'nervous'], [tAn, 'idea'], [tIsh, 'laugh'], [drop - .3, 'surprised'], [land + .3, 'excited']], { flip: true, u: 8 }));
    // the taxi: along the dock road, then down the pier and off the edge
    if (t > tx0 && t < drop) { const ci = t < turn ? lerp(-4.5, 4.5, easeIn(seg(t, tx0, turn)) * .3 + seg(t, tx0, turn) * .7) : 4.5, cj = t < turn ? 7.5 : lerp(7.5, 14.3, seg(t, turn, drop)), ax = t < turn ? 'i' : 'j'; ent(ci + cj + .5, () => veh(ci, cj, ax, 'taxi')); }
    drawEnts();
    // the taxi falling and landing on the page as a paper cut-out (drawn crisp, after the pixel pass)
    const fall = seg(t, drop, land), p0 = iso(4.5, 14.3), p1 = [p0[0] - 50, p0[1] + 720], tb = Math.max(0, t - land);
    const taxiPos = t < land ? [lerp(p0[0], p1[0], fall), lerp(p0[1], p1[1], fall * fall)] : [p1[0] - 230 * tb, p1[1] + 100 * tb];
    const tsc = toScreen(...taxiPos), zoomNow = LAST_CAM.zoom;
    // signal meters under the labels: the Titanic at full strength, its analogies firing a little
    const MET = [[iso(1, 9.9).map((v, q) => v - (q ? 250 : 0)), 7, 5, K.gold, kt], [iso(-2.7, 12.6).map((v, q) => v - (q ? 120 : 0)), 5, 2, K.cyan, kv], [iso(8.8, 11.6).map((v, q) => v - (q ? 150 : 0)), 5, 2, K.cyan, on(t, tVoy - .6)], [iso(12.1, 5.7).map((v, q) => v - (q ? 290 : 0)), 5, 2, K.cyan, on(t, tVoy - .3)]].map(([p, sc, n, col, k]) => [toScreen(...p), sc, n, col, k]);
    camEnd();
    finish({ px });
    if (t >= drop) ui(() => {
      ctx.save(); ctx.translate(tsc[0], tsc[1]); const sq = t > land ? 1 + .3 * Math.exp(-8 * tb) * Math.cos(22 * tb) : 1; ctx.scale(-zoomNow * 1.05 / Math.sqrt(sq), zoomNow * 1.05 * sq); ctx.rotate(t < land ? .5 * fall : 0);
      flat(ellPts(0, 4, 70, 9, 16), 'rgba(0,0,0,.25)');
      const P = [[-70, 0], [-70, -34], [-40, -38], [-24, -64], [30, -64], [50, -38], [72, -32], [72, 0]];
      cutout(P, K.gold, { jag: 2, shadow: [6, 8, 'rgba(0,0,0,.3)'] });
      cutout([[-18, -58], [24, -58], [38, -38], [-30, -38]], '#BFE6FF', { jag: 1, shadow: false }); flat(rectPts(-60, -26, 128, 8), K.ink); for (let q = 0; q < 8; q++) flat(rectPts(-60 + q * 16, -26, 8, 8), K.white);
      for (const wx of [-42, 44]) { cutout(ellPts(wx, 0, 17, 17, 14), K.ink, { jag: 1, shadow: false }); flat(ellPts(wx, 0, 6, 6, 8), K.silver); }
      flat(rectPts(-12, -76, 26, 12), K.ink); flat(rectPts(-8, -74, 18, 8), K.white); ctx.restore();
    });
    ui(() => MET.forEach(([[x, y], sc, n, col, k]) => { if (k <= .3 || t > drop) return; const yy = y + (7 * sc + sc * 5 + 10) / 2 + 12, fl = Math.floor(t * 6) % 7 ? 0 : 1; ctx.globalAlpha = k; pbox(x - 70, yy, 140, 54, K.ink, K.slate, 3); for (let q = 0; q < 5; q++) { ctx.fillStyle = q < n - (n < 5 ? fl : 0) ? col : K.dusk; ctx.fillRect(x - 54 + q * 23, yy + 44 - 7 * (q + 1), 16, 7 * (q + 1)); } ctx.globalAlpha = 1; }));
    hudBar('LV 3 · HARBOUR', 'ANALOGY MACHINE', t > drop ? 'MAP EDGE!' : 'VOYAGES 3');
    toasts(t, [[tAn - .2, 'NEURONS: ANALOGY MACHINES', K.gold], [tIsh - .1, 'A BIT TITANIC-ISH', K.silver]], 3);   // the HUD's MAP EDGE! covers the taxi's exit
    cutIn(lt, t);
  }

  const NF = { fade: 0 };   // the tile swap is the transition
  shots([[chapStart('ch09'), gateShot], [cs('tv_journey') - .3, journeyShot, NF], [cs('tv_votes') - .3, votesShot, NF], [cs('tv_pairs') - .3, pairsShot, NF], [cs('tv_weak') - .3, weakShot, NF], [cs('tv_pages') - .3, pagesShot, NF], [cs('tv_titanic') - .3, titanicShot, NF]]);
})();
