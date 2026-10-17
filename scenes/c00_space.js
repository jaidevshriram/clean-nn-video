// ch00 Cold open · DEEP SPACE. A question typed into a chat window falls like a comet into a galaxy of neuron-lights;
// the galaxy's core twists into the Knot (a tangled black hole); the Unfolding Machine starts pulling it apart; "the field
// got it wrong" (a lens shows the core as ordered constellations); the title; then the camera leans toward one star (ch01
// opens on a toy town at night, a field of lights like this one, and makes the dive on "zoom all the way in").
(() => {
  // the machine with a blank name plate (machine() letters its plate with jargon; drop that letter)
  function machineL(t, x, y, s, o) { const n = LETTERS.length, C0 = CAM; CAM = null; machine(t, x, y, s, o); CAM = C0; LETTERS.length = n; }   // (its only lettering is the plate)
  // lettering that writes on glyph by glyph (each letter pops up and fades in, so no clip ever slices through a letter)
  // and leaves by fading (o.alpha), never by un-writing. k 0..1 is the entrance only. Shadows kit's title() / hand().
  function writeOn(s, x, y, size, col, k, o = {}) {
    if (k <= 0 || (o.alpha ?? 1) <= .01) return;
    if (CAM && !o.screen) { [x, y] = toScreen(x, y); size *= CAM.zoom; o = { ...o, rot: (o.rot || 0) + CAM.rot }; }
    const fam = { marker: '"Permanent Marker"', hand: '"Patrick Hand"', kalam: '"Kalam"' }[o.face || 'marker'] || o.face;
    const G = [...String(s)], X = [];
    ctx.save(); ctx.font = `${o.bold ? 'bold ' : ''}${size}px ${fam}`; const wAll = ctx.measureText(s).width; let pre = '';
    for (const g of G) { const w0 = ctx.measureText(pre).width; pre += g; X.push((w0 + ctx.measureText(pre).width) / 2 - (o.align === 'left' ? 0 : wAll / 2)); } ctx.restore();
    const n = G.length, sp = 2.5, rot = o.rot || 0, c = Math.cos(rot), sn = Math.sin(rot), a = o.alpha ?? 1;
    const pass = stroke => G.forEach((g, i) => {
      if (g === ' ') return; const kk = clamp((k * (n + sp) - i) / sp); if (kk <= 0) return;
      const dy = (1 - easeOut(kk)) * size * .14, gx = x + c * X[i] - sn * dy, gy = y + sn * X[i] + c * dy;
      letter(g, gx, gy, size, stroke ? 'rgba(0,0,0,0)' : col, { ...o, align: 'center', screen: true, reveal: undefined, pop: .25 + .75 * kk, alpha: a * ease(clamp(kk * 1.6)), stroke: stroke ? o.stroke : undefined, shadow: stroke ? false : o.shadow });
    });
    if (o.stroke) pass(true);
    pass(false);
  }
  function title(s, x, y, size, col = PAL.ink, k = 1, o = {}) { writeOn(s, x, y, size, col, k, { shadow: false, ...o }); }
  function hand(s, x, y, size, col = PAL.ink, k = 1, o = {}) { writeOn(s, x, y, size * (o.raw ? 1 : 1.2), col, k, { face: 'hand', ...o }); }
  const V = 'blog/raw/v-figure-10x/', PE = 'blog/raw/pose-everywhere/';
  const CLASH = [V + 'p47742', V + 'c5a94a', V + 'pPool13', V + 'n282687', V + 'n1158528', V + 'c4d201c', V + 'c5a94c'];
  const PIECES = [V + 'p47742', V + 'c4d201c', V + 'c5a94a', V + 'pPool13', V + 'n282687', V + 'n1158528', V + 'c5a352d', V + 'pCarX5', V + 'c5a94c', V + 'n1070575'];
  const STAR_COLS = ['#FFE3A6', '#BFE6FF', '#FFB3D9', '#FFFFFF'];
  const T0 = 0, Q = 'How does an AI actually think?';

  // ---------- the galaxy (world units; centre at 0, 0; radius ~560) ----------
  const NS = 5200, STARS = [];
  for (let i = 0; i < NS; i++) { const arm = i % 3, r = Math.pow(hash(i * 1.7), .7) * 560; STARS.push({ r, q0: arm * TAU / 3 + r * .011 + (hash(i * 2.3) - .5) * .55, s: .7 + hash(i) * 1.7, c: STAR_COLS[i % 4], a: .45 + .55 * hash(i * 9), tw: hash(i * 4.1) }); }
  // bright neuron stars (each has a photo in it when you get close) and the roads between them
  const NB = 46, BRIGHT = [];
  for (let i = 0; i < NB; i++) { const r = 90 + Math.pow(hash(i * 5.3 + 1), .8) * 470, arm = i % 3; BRIGHT.push({ r, q0: arm * TAU / 3 + r * .011 + (hash(i * 7.9) - .5) * .35, im: [PE + 'large/0', PE + 'medium/0', V + 'c4d477c', V + 'pTrain34', V + 'p10704', PE + 'large/4', V + 'c5a317c', V + 'pCarX5'][i % 8] }); }
  // the star the camera dives into at the end (a dog lover, like ch01's first house)
  const DIVE = BRIGHT.reduce((m, b, i) => b.r > BRIGHT[m].r ? i : m, 0);
  BRIGHT[DIVE].im = PE + 'large/0';
  let ROADS = null;
  const starXY = (r, q0, t, tw) => {   // galaxy position with rotation and the knot's twist (tw 0..1)
    const core = Math.exp(-r / 230), rr = r * (1 - .3 * tw * core), q = q0 + t * .018 + tw * (2.2 * core + .25 * Math.sin(r * .05 + t * 2) * core);
    return [Math.cos(q) * rr, Math.sin(q) * rr * .46];
  };
  function roads() {
    if (ROADS) return ROADS; ROADS = [];
    const P = BRIGHT.map(b => starXY(b.r, b.q0, 0, 0));
    P.forEach((p, i) => { const d = P.map((q, j) => [Math.hypot(q[0] - p[0], q[1] - p[1]), j]).filter(x => x[1] !== i).sort((a, b) => a[0] - b[0]); for (const [, j] of d.slice(0, 2)) if (i < j || !ROADS.some(r => r[0] === j && r[1] === i)) ROADS.push([i, j]); });
    return ROADS;
  }
  // camera: world centre (cx, cy), zoom z
  let G = { x: 0, y: 0, z: 1 };
  const SX = (x, y) => [W / 2 + (x - G.x) * G.z, H / 2 + (y - G.y) * G.z];
  function camPath(t, keys) {   // keys: [time, x, y, zoom]; zoom interpolates in log space
    const v = kf(t, keys.map(k => [k[0], [k[1], k[2], Math.log(k[3])]]), easeInOut);
    G = { x: v[0] + 4 * Math.sin(t * .31) / Math.exp(v[2]), y: v[1] + 3 * Math.sin(t * .23 + 1) / Math.exp(v[2]), z: Math.exp(v[2]) };
    return G;
  }
  function space(t) {
    vgrad([[0, '#05060F'], [.5, '#0B0E2A'], [1, '#141038']]);
    GRAIN = .5;
    // far starfield (screen space, slight parallax) and nebulae (half parallax)
    for (let i = 0; i < 260; i++) { const x = ((hash(i * 1.3) * 2400 - G.x * G.z * .02) % 2400 + 2400) % 2400 - 240, y = ((hash(i * 7.1) * 1400 - G.y * G.z * .02) % 1400 + 1400) % 1400 - 160; dot(x, y, .5 + hash(i) * 1.2, '#FFFFFF', .35 + .35 * Math.sin(t * (1 + hash(i * 3)) + i)); }
    for (let i = 0; i < 9; i++) { const [x, y] = SX(-900 + hash(i * 3) * 1800, -500 + hash(i * 5) * 1000); glow(lerp(x, W / 2, .5), lerp(y, H / 2, .5), (300 + 200 * hash(i)) * clamp(Math.sqrt(G.z), .7, 2), ['#5A2A8A', '#1E4A8A', '#8A2A6A'][i % 3], .32); }
  }
  // the galaxy: tw = knot twist, light(i, x, y) extra brightness per star (signals), ord = ordered (0..1)
  function galaxy(t, o = {}) {
    const tw = o.tw || 0, zs = clamp(Math.pow(G.z, .55), .5, 3.2);
    const [gx, gy] = SX(0, 0);
    glow(gx, gy, 380 * G.z, '#8A6AD0', .35); glow(gx, gy, 160 * G.z, '#FFE3B0', .45 * (1 - tw * .7));
    ctx.save();
    for (let i = 0; i < NS; i++) {
      const S = STARS[i], [wx, wy] = starXY(S.r, S.q0, t, tw), [x, y] = SX(wx, wy);
      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
      let a = S.a * (.75 + .25 * Math.sin(t * (1.5 + S.tw * 3) + i));
      if (o.wave) a = Math.min(1, a + o.wave(S.r));
      ctx.globalAlpha = a; ctx.fillStyle = S.c; ctx.beginPath(); ctx.arc(x, y, S.s * zs * .7, 0, TAU); ctx.fill();
    }
    ctx.restore();
    // roads of light between the bright neurons, with signals running along them
    const R = roads(), BP = BRIGHT.map(b => SX(...starXY(b.r, b.q0, t, tw)));
    const rk = o.roads ?? .25;
    if (rk > 0) {
      ctx.save(); ctx.lineCap = 'round';
      for (const [i, j] of R) { const a = BP[i], b = BP[j]; ctx.globalAlpha = .18 * rk * (1 - tw * .6); ctx.strokeStyle = '#BFD8FF'; ctx.lineWidth = Math.max(1, 1.2 * zs); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      ctx.restore();
      R.forEach(([i, j], k) => { if (hash(k * 3.7) > .55 * rk + .2) return; const f = frac(t * (.35 + .3 * hash(k)) + hash(k * 9)), a = BP[i], b = BP[j], x = lerp(a[0], b[0], f), y = lerp(a[1], b[1], f); if (x > -40 && x < W + 40 && y > -40 && y < H + 40) glow(x, y, 10 * zs + 6, '#CFE6FF', rk * Math.sin(f * Math.PI)); });
    }
    // bright neuron stars: glows far away, photo-lamps up close
    BRIGHT.forEach((b, i) => {
      if (o.skip === i) return;
      const [x, y] = BP[i], r = 12 * G.z, fl = .7 + .3 * Math.sin(t * 2 + i * 1.3) + (o.flare ? o.flare(i) : 0);
      if (x < -200 || x > W + 200 || y < -200 || y > H + 200) return;
      const m = ease(seg(r, 16, 30));   // a glow far away crossfades into a photo-lamp as it comes close
      if (m < 1) { glow(x, y, 26 * zs, '#FFD58A', .8 * fl * (1 - .6 * m)); dot(x, y, lerp(2.2 * zs, r * .6, m), '#FFF6D8', 1 - m); }
      if (m > 0) { ctx.save(); ctx.globalAlpha = m; lampOrb(x, y, r * lerp(.6, 1, m), b.im, clamp(fl)); ctx.restore(); }
    });
  }
  // the Unfolding Machine, dressed (machine() draws the box, funnel, treads and belt). Machine-local units: body x
  // -220..220, y -400..-60, belt out of the right side at y -120. machineBack: side and top faces, for depth.
  function machineBack() {
    paint([[214, -396], [300, -444], [300, -104], [214, -62]], { grad: [[0, '#6E7891'], [1, '#4A5268']], gdir: [214, 0, 300, 0], ink: PAL.ink, sw: 1.3 });
    paint([[-206, -398], [214, -398], [300, -444], [-120, -444]], { wash: '#B9C0CE', ink: PAL.ink, sw: 1.3 });
    for (let i = 1; i < 4; i++) inkLine([[214, -392 + i * 80], [300, -436 + i * 80]], 1, PAL.ink, 'inkfine', 0);
  }
  const gearPts = (cx, cy, r, n, a) => { const P = []; for (let k = 0; k < n; k++) { const q = a + k / n * TAU, d = TAU / n; for (const [f, rr] of [[0, r - 8], [.18, r + 9], [.5, r + 9], [.68, r - 8]]) P.push([cx + Math.cos(q + f * d) * rr, cy + Math.sin(q + f * d) * rr]); } return P; };
  // machineFront: three meshing brass gears in a dark window (each turns the next, the other way), rivets, a pressure
  // gauge whose needle shivers, feed rollers at the funnel's neck and an output chute with a strip flap over the belt
  function machineFront(t, on, feed) {
    flat(rrPts(-196, -322, 392, 144, 14), '#2A2340', { line: PAL.ink, lw: 3 });
    const w = t * 2.2 * on, n = 12;
    [[-120, 1], [0, -1], [120, 1]].forEach(([gx, dir], i) => { const a = dir * w + (i === 1 ? Math.PI / n : 0); flat(gearPts(gx, -250, 52, n, a), [PAL.ochre, PAL.rose, PAL.sky][i], { line: PAL.ink, lw: 3 }); dot(gx, -250, 14, '#3A3550'); for (let k = 0; k < 3; k++) { const q = a + k * TAU / 3; inkLine([[gx + Math.cos(q) * 16, -250 + Math.sin(q) * 16], [gx + Math.cos(q) * 36, -250 + Math.sin(q) * 36]], 1.4, PAL.ink, 'inkfine', 0); } });
    for (let i = 0; i < 7; i++) for (const sx of [-204, 204]) dot(sx, -370 + i * 48, 6, '#4A5268');
    const nd = -2.3 + 1.6 * on + .15 * Math.sin(t * 23) + .1 * Math.sin(t * 7);
    flat(ellPts(150, -362, 30, 30, 24), '#F4F1E8', { line: PAL.ink, lw: 4 });
    ctx.save(); ctx.strokeStyle = PAL.berry; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(150, -362); ctx.lineTo(150 + Math.cos(nd) * 24, -362 + Math.sin(nd) * 24); ctx.stroke(); ctx.restore(); dot(150, -362, 5, PAL.ink);
    for (const sd of [-1, 1]) { const q = sd * t * 6 * (feed > 0 && feed < 1 ? on : .1); flat(ellPts(sd * 52, -408, 20, 20, 16), '#6E7891', { line: PAL.ink, lw: 3 }); inkLine([[sd * 52 - Math.cos(q) * 16, -408 - Math.sin(q) * 16], [sd * 52 + Math.cos(q) * 16, -408 + Math.sin(q) * 16]], 1.2, PAL.ink, 'inkfine', 0); }
    flat([[200, -200], [282, -200], [300, -178], [300, -150], [200, -150]], '#4A5268', { line: PAL.ink, lw: 3 });
    for (let k = 0; k < 5; k++) { const sx = 214 + k * 18, sway = 6 * Math.sin(t * 5 + k) * on; flat([[sx - 7, -150], [sx + 7, -150], [sx + 7 + sway, -122], [sx - 7 + sway, -122]], '#2A2340'); }
  }
  // the Knot as a tangled black hole: accretion rings, a dark rope with eyes. s = size in world units
  function blackKnot(t, s, o = {}) {
    if (s <= 1) return;
    const [x, y] = SX(0, 0), S = s * G.z, k = o.k ?? 1;
    glow(x, y, S * 2.4, '#FF6A9A', .35 * k); glow(x, y, S * 1.3, '#120820', .0);
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.15);
    for (let r = 0; r < 4; r++) { ctx.strokeStyle = ['#FF9A5A', '#FFD36B', '#FF5A8A', '#C9A0FF'][r]; ctx.globalAlpha = .5 * k; ctx.lineWidth = (7 - r) * Math.max(.6, G.z * .6); ctx.setLineDash([S * .3, S * .12]); ctx.lineDashOffset = -t * 60 * (r + 1); ctx.beginPath(); ctx.ellipse(0, 0, S * (1.45 + r * .16), S * (.34 + r * .05), 0, 0, TAU); ctx.stroke(); }
    ctx.restore();
    // a dark disc under the rope so it reads as a hole
    ctx.save(); const g = ctx.createRadialGradient(x, y, 0, x, y, S * 1.05); g.addColorStop(0, 'rgba(4,2,10,.95)'); g.addColorStop(.7, 'rgba(8,4,20,.75)'); g.addColorStop(1, 'rgba(8,4,20,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, S * 1.05, 0, TAU); ctx.fill(); ctx.restore();
    knotBeast(x, y + Math.sin(t * 1.3) * S * .03, S, { col: o.col || '#3A2450', dark: '#08040F', look: o.look || [-.6, .3], loose: o.loose || 0, grin: o.grin });
    // the rope's front half catches the ring light
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.15); ctx.strokeStyle = '#FFD36B'; ctx.globalAlpha = .45 * k; ctx.lineWidth = 4 * Math.max(.6, G.z * .6); ctx.beginPath(); ctx.ellipse(0, 0, S * 1.45, S * .34, 0, .05 * Math.PI, .95 * Math.PI); ctx.stroke(); ctx.restore();
  }
  // a little painted asteroid in the foreground (screen space) with Clawd on top
  function asteroid(x, y, w, key) {
    boilSeed('ast' + key);
    const P = []; for (let i = 0; i < 18; i++) { const a = Math.PI + i / 17 * Math.PI; P.push([x + Math.cos(a) * w * (1 + .06 * Math.sin(i * 2.3)), y + Math.sin(a) * w * .12 - 4]); }
    for (let i = 0; i < 12; i++) { const a = i / 11 * Math.PI; P.push([x + Math.cos(a) * w * (.98 - .08 * hash(i)), y + Math.sin(a) * w * .42 * (1 + .15 * Math.sin(i * 1.7))]); }
    paint(P, { grad: [[0, '#8A7FA8'], [.35, '#5A5078'], [1, '#2A2440']], gdir: [0, y - 20, 0, y + w * .42], ink: '#0E0A1A', sw: 1.2, curv: .5, tex: .8 });
    for (let i = 0; i < 5; i++) { const cx = x + (hash(i * 3 + w) - .5) * w * 1.4, cy = y + 12 + hash(i * 7) * w * .18; paint(ellPts(cx, cy, 16 + 14 * hash(i), 6 + 4 * hash(i), 12), { wash: '#3E3658', ink: '#0E0A1A', sw: .6 }); }
    glow(x - w * .4, y - 10, w * .8, '#9FB8FF', .12);
  }
  function helmetClawd(t, x, y, u, keys, extra = {}) {
    const m = emotions(t, keys);
    tourist(x, y, u, 'helmet', { ...m, view: 'q', ...extra });
    // the helmet's glass catches the starlight
    glow(x + (extra.flip ? -1 : 1) * u * 2, y - u * 7, u * 3, '#BFE6FF', .25);
  }
  // the chat window with the question (screen space), k = 0..1 typed
  function chatWindow(x, y, s, rot, typed, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    flat(rrPts(-300, -110, 640, 220, 30), '#F4F1E8', { shadow: [10, 14, 'rgba(0,0,0,.5)'] });
    flat(rrPts(-300, -110, 640, 46, 22), '#DCD6EA'); [0, 1, 2].forEach(i => dot(-266 + i * 26, -87, 8, ['#E2476E', '#F0BE46', '#6E9F58'][i]));
    txt(typed, -262, 2, 40, '#2A2340', { weight: '700', align: 'left', font: '"Kalam"' });
    flat(rrPts(190, 52, 120, 40, 20), o.send ? '#7B5CA8' : '#C9C3DA'); txt('send', 250, 73, 24, '#FFFFFF', { weight: '700', font: '"Inter"' });
    if (o.send) glow(250, 72, 70, '#C9A0FF', o.send);
    ctx.restore();
  }

  // ---------- shot 1 · the question, typed in the dark, falls like a comet into a far galaxy ----------
  function question(t, lt, dur) {
    const a = cs('open_phone'), e = ce('open_phone'), tl = wt('open_phone', 'happens'), tg = wt('open_phone', 'nobody');
    // launch at "happens"; the camera follows the comet in from "nobody"
    camPath(t, [[0, -1700, 760, .3], [tg, -1600, 700, .32], [e + .3, -260, 120, 1.05]]);
    space(t);
    galaxy(t, { roads: 0 });
    // the window
    const n = Math.round(Q.length * seg(t, a + .3, a + 2.6)), caret = n < Q.length || Math.floor(t * 2.5) % 2 ? '|' : '';
    const fly = 1 - Math.pow(1 - seg(t, tl + .15, e + .35), 2.2), [gx, gy] = SX(0, 0);
    const p0 = [930, 560], p1 = [gx - 30, gy + 10], cp = [1500, 820];
    const wx = (1 - fly) * (1 - fly) * p0[0] + 2 * fly * (1 - fly) * cp[0] + fly * fly * p1[0], wy = (1 - fly) * (1 - fly) * p0[1] + 2 * fly * (1 - fly) * cp[1] + fly * fly * p1[1];
    const ws = lerp(1, .03, Math.pow(fly, .6)) * (1 + .08 * Math.sin(Math.PI * seg(t, tl - .35, tl + .15)));
    // comet trail
    if (fly > 0) for (let i = 0; i < 40; i++) { const f = clamp(fly - i * .012); if (f <= 0) break; const x = (1 - f) * (1 - f) * p0[0] + 2 * f * (1 - f) * cp[0] + f * f * p1[0], y = (1 - f) * (1 - f) * p0[1] + 2 * f * (1 - f) * cp[1] + f * f * p1[1]; glow(x, y, (60 * (1 - i / 40)) * lerp(1, .3, fly) + 6, '#BFE6FF', .55 * (1 - i / 40)); }
    if (fly < .985) chatWindow(wx, wy + (fly ? 0 : 6 * Math.sin(t * 1.4)), ws * 1.3, -.06 + fly * .8, Q.slice(0, n) + caret, { send: seg(t, tl - .7, tl - .3) * (1 - fly) });
    if (fly > 0) glow(wx, wy, 40 + 30 * Math.sin(t * 20), '#FFFFFF', .9);
    // Clawd on his asteroid (foreground right): watches it type, jumps when it launches, waves it off
    const ax = 1520 + 80 * seg(t, tg, e) , ay = 980 + 200 * easeIn(seg(t, tg + 1, e + .4));
    asteroid(ax, ay, 250, 'a1');
    const jp = jump(t, tl + .05, tl + .6, 3);
    helmetClawd(t, ax - 20, ay - 8 + jp.dy * 14, 14, [[0, 'happy'], [a + .3, 'thinking'], [tl - .2, 'surprised'], [tl + 1.1, 'excited']], { flip: true, sq: jp.sq, lookX: fly > 0 ? .8 : .4, lookY: fly > 0 ? -.8 : -.3 });
    if (fly > 0 && fly < .7) sfx('WHOOSH!', 980, 800, 70, '#BFE6FF', t - tl - .2, { life: 1.1, shadow: false });   // (below the comet's start, clear of Clawd's helmet)
    if (lt < .8) fade(1 - ease(lt / .8), '#000000');
  }

  // ---------- shot 2 · inside: millions of lights, signals down a maze of roads; each light is a neuron ----------
  function lights(t, lt, dur) {
    const a = cs('open_city'), tb = wt('open_city', 'millions'), tp = wt('open_city', 'passing'), te = wt('open_city', 'Each'), tn = wt('open_city', 'neuron');
    const B = BRIGHT[3], [bx, by] = starXY(B.r, B.q0, tn, 0);
    camPath(t, [[a - .3, -260, 120, 1.05], [tb, -120, 60, 1.25], [tp, 60, -10, 1.55], [te, bx * .8, by * .8, 1.9], [tn + .2, bx, by, 9], [ce('open_city') + .3, bx, by, 10.5]]);
    space(t);
    // the comet's impact sets off a ring of light through the arms
    const ti = a - .1, wave = r => { const d = (t - ti) * 520 - r; return d > 0 && d < 160 ? .8 * Math.sin(d / 160 * Math.PI) : 0; };
    galaxy(t, { wave, roads: on(t, tp - .8), flare: i => i === 3 ? 0 : .3 * Math.max(0, Math.sin(t * 3 + i)) * on(t, tp - .5) });
    if (t - ti < 1.2) glow(...SX(-30, 10), 260 * (1 - (t - ti) / 1.2) + 40, '#FFFFFF', 1 - (t - ti) / 1.2);
    // labels
    title('millions of tiny lights', 1180, 150, 74, '#F5E8FF', seg(t, tb - .3, tb + 1.1), { alpha: 1 - seg(t, te - .8, te - .3) });
    const [nx, ny] = SX(bx, by);
    if (t > te - .2) { const lk = seg(t, te - .1, te + .5), lo = 1 - seg(t, cs('open_knot') - 1, cs('open_knot') - .5);   // gone before the cut
      hand('a neuron', nx + 12 * G.z + 170, ny - 30, 56, '#FFE9B8', lk, { stroke: '#1A1030', strokeW: .14, alpha: lo }); ctx.save(); ctx.globalAlpha = lk * lo; ctx.strokeStyle = '#FFE9B8'; ctx.lineWidth = 5; ctx.lineCap = 'round'; const ax = nx + 12 * G.z + 14; ctx.beginPath(); ctx.moveTo(ax + 60, ny - 22); ctx.lineTo(ax, ny - 8); ctx.moveTo(ax + 16, ny - 30); ctx.lineTo(ax, ny - 8); ctx.lineTo(ax + 22, ny + 4); ctx.stroke(); ctx.restore(); }
  }

  // ---------- shot 3 · the knot: the core twists into a tangled black hole; the Unfolding Machine pulls at it ----------
  const MX = 470, MY = -40;   // the machine's asteroid, in galaxy units (right of the core)
  function knotShot(t, lt, dur) {
    const k0 = cs('open_knot'), tk = wt('open_knot', 'knotted'), tt = wt('open_knot', 'tangled'), tf = wt('open_knot', 'fit'), tmn = wt('open_knot', 'meaningful'), tid = wt('open_knot', 'Ideas'), tsm = wt('open_knot', 'same'), trm = wt('open_knot', 'room');
    const u0 = cs('open_untangle'), tear = wt('open_untangle', 'tear'), tpc = wt('open_untangle', 'pieces');
    const w0 = cs('open_wrong'), tw_ = wt('open_wrong', 'wrong'), tnv = wt('open_wrong', 'never'), trd = wt('open_wrong', 'read'), we = ce('open_wrong');
    const B3 = BRIGHT[3], [b3x, b3y] = starXY(B3.r, B3.q0, wt('open_city', 'neuron'), 0);
    camPath(t, [[k0 - .4, b3x, b3y, 10.5], [k0 + 2.2, 120, 20, 1.35], [tk, 60, 0, 1.25], [tt + 1, 0, -10, 1.55], [tf + .6, 30, -10, 1.7], [tear - .8, 230, -20, 1.2], [tear + .4, 240, -20, 1.28], [w0 + .5, 230, -10, 1.25], [tnv, 120, -20, 1.45], [we + .6, 60, -10, 1.55]]);
    space(t);
    const twist = ease(seg(t, tk - .6, tt + .8)) - .25 * ease(seg(t, tear, w0)) - .2 * ease(seg(t, tnv - .4, trd));
    const ks = 130 * backOut(seg(t, tk - .2, tt + .6)) * (1 - .12 * seg(t, tnv - .4, trd));
    const [sx, sy] = t < tf + .5 ? shakeXY(t, 6 * Math.sin(Math.PI * seg(t, tk - .5, tf + .5))) : [0, 0];
    push(); translate(sx, sy);
    galaxy(t, { tw: twist, roads: .25 * (1 - seg(t, tk - .5, tk + .5)) });
    // "not arranged into meaningful patterns, like constellations": a faint gold glimpse of what it is NOT
    const kc = env(t, tmn - .3, tt - .1, .5, .4);
    if (kc > 0) { const [cx, cy] = SX(0, 0); ctx.save(); ctx.globalAlpha = .5 * kc; constellations(t, cx, cy - 10, 1.05 * G.z, kc); ctx.restore(); }
    // ideas with nothing in common, crammed into the same light: three clashing photos squeeze into one lamp
    const loosen = ease(seg(t, tear, tpc + .4)), cram = ease(seg(t, tsm - .5, tsm + .5)), out_ = seg(t, tear - .4, tear + .2);
    const [ox, oy] = SX(-250, -150), CR = [CLASH[0], CLASH[4], CLASH[5]];
    if (out_ < 1) CR.forEach((im, i) => {
      const k = popk(t, tid - .1 + i * .45, .5); if (k <= 0 || cram >= 1) return;
      const q = i / 3 * TAU + t * .7, [px, py] = SX(Math.cos(q) * 340, Math.sin(q) * 170);
      lampOrb(lerp(px, ox, ease(cram)), lerp(py, oy, ease(cram)), 40 * G.z * backOut(k) * (1 - .3 * cram), im, .8);
    });
    if (cram > 0 && out_ < 1) { const sq = 1 + .1 * Math.sin(t * 9) * (1 + seg(t, trm - .3, trm + .3)), r = 75 * G.z * backOut(cram) * (1 - out_); ctx.save(); ctx.translate(ox, oy); ctx.scale(sq, 2 - sq); crammed(0, 0, r, CR, t); ctx.restore(); }
    // the Unfolding Machine rolls in on its own rock and starts pulling a strand out of the knot
    const arrive = easeOut(seg(t, tear - 1.7, tear - .1)), mx = lerp(MX + 700, MX, arrive), mOn = 1 - seg(t, tw_ - .3, tw_ + .6);
    const pull = seg(t, tear - .3, tear + 1), [kx, ky] = SX(0, 0);
    if (t > tear - 1.8) {
      camBegin(G.x, G.y, G.z); CAM = null;   // (machine() letters its own label; keep it from landing in screen space)
      // the strand: from the knot's rim into the funnel, a rope with photos travelling along it
      if (pull > 0) { const P = [[60, -20], [190, -110 - 30 * Math.sin(t * 2)], [mx - 20, MY - 185]], C = through(P, 12), n = Math.max(2, Math.round(C.length * pull)); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#08040F'; ctx.lineWidth = 26; ctx.beginPath(); C.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = '#3A2450'; ctx.lineWidth = 18; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.lineDashOffset = -t * 60 * mOn; ctx.stroke(); ctx.restore(); }
      boilSeed('mrock'); paint(ellPts(mx, MY + 6, 190, 40, 24), { grad: [[0, '#6A6088'], [1, '#2A2440']], ink: '#0E0A1A', sw: .8, curv: .4 });
      push(); translate(mx, MY); scale(.34); machineBack(); pop();
      // (one photo-lamp every other belt slot, so they are spaced out and big enough to read)
      machineL(t, mx, MY, .34, { on: mOn, belt: pull * mOn + (1 - mOn) * pull * .0001, mouth: .9, items: [i => { if (i % 2) return; const im = PIECES[(i / 2) % PIECES.length], I = img(im), s = Math.min(I.width, I.height); glow(0, -64, 110, '#FFD58A', .5); ctx.save(); ctx.beginPath(); ctx.arc(0, -64, 56, 0, TAU); ctx.clip(); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -56, -120, 112, 112); ctx.restore(); ctx.strokeStyle = '#FFE9B8'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, -64, 56, 0, TAU); ctx.stroke(); }] });
      push(); translate(mx, MY); scale(.34); machineFront(t, mOn, pull); pop();
      // it sputters: black puffs when it dies
      if (t > tw_ - .3 && t < tw_ + 3) for (let i = 0; i < 3; i++) { const ph = seg(t, tw_ - .2 + i * .35, tw_ + 1.6 + i * .35); if (ph > 0 && ph < 1) paint(ellPts(mx + 56 + ph * 30, MY - 165 - ph * 120, 10 + 34 * ph, 8 + 26 * ph, 14), { wash: '#2A2433', washOp: 230 * (1 - ph), ink: null }); }
      camEnd();
      if (t > tw_ - .2 && t < tw_ + 1.2) sfx('pfft…', ...SX(mx + 20, MY - 160), 46, '#C9C3DA', t - tw_ + .2, { life: 1.3, shadow: false });
    }
    // the knot itself
    const look = t < tear - 1 ? [-.7, .4] : t < tw_ ? [.9, -.2] : [-.2, .6];
    blackKnot(t, ks, { look, loose: .3 * loosen - .1 * loosen * seg(t, tw_, tnv) + .1 * seg(t, tnv - .3, trd), grin: t > tt && t < tear });
    pop();
    if (t > tt - .4 && t < tid) title('tangled', ...SX(0, -200), 84, '#FFB3D9', seg(t, tt - .4, tt + .4), { screen: true, alpha: 1 - seg(t, tid - .4, tid) });
    if (t > tsm - .4 && t < tear - .3) hand('crammed into one light', ox, oy - 75 * G.z - 45, 46, '#FFE9B8', seg(t, tsm - .2, tsm + .6), { stroke: '#1A1030', strokeW: .14, alpha: 1 - seg(t, ce('open_knot') - .2, ce('open_knot') + .4) });
    if (t > tear - .3 && t < w0) hand('tear it apart, study the pieces', ...SX(mx - 30, MY - 260), 46, '#FFE9B8', seg(t, tear - .2, tpc + .3), { stroke: '#1A1030', strokeW: .14, alpha: 1 - seg(t, w0 - .6, w0 - .1) });
    // who says so: the author and the essay
    const nk = seg(t, wt('open_wrong', 'Nick') - .3, wt('open_wrong', 'Nick') + .3) * (1 - seg(t, tw_ - .9, tw_ - .4));
    if (nk > 0) { ctx.save(); resetMatrix(); ctx.globalAlpha = ease(nk); ctx.fillStyle = 'rgba(14,10,36,.78)'; ctx.strokeStyle = '#FFD58A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(560, 820, 800, 170, 26); ctx.fill(); ctx.stroke(); ctx.restore();
      letter('Nick Cammarata', 960, 870, 64, '#FFF6E8', { face: 'marker', shadow: false, alpha: ease(nk), screen: true });
      const ek = seg(t, wt('open_wrong', 'essay') - .4, wt('open_wrong', 'essay') + .4); if (ek > 0) writeOn('essay: "Neural Networks Are Already Clean"', 960, 945, 40, '#FFD58A', ek, { face: 'hand', shadow: false, alpha: ease(nk), screen: true }); }
    // Clawd on his rock, foreground left
    const ax = 300, ay = 1000 + 360 * (1 - easeOut(seg(t, k0 + .4, k0 + 2.4))), jp = jump(t, tw_ + 1.05, tw_ + 1.55, 1.2);
    asteroid(ax, ay, 240, 'a2');
    const keys = [[k0 - 1, 'excited'], [tk, 'nervous'], [tt, 'scared'], [tear - 1.2, 'hopeful'], [tear + .3, 'determined'], [tw_, 'surprised'], [tw_ + 1.2, 'dizzy'], [trd - .9, 'idea']];
    // the gag: a bolt shaken off the dying machine drifts across and tinks off Clawd's helmet
    const bolt = seg(t, tw_ + .1, tw_ + 1.1), b0 = SX(mx - 40, MY - 60), bp = [lerp(b0[0], ax + 10, bolt), lerp(b0[1], ay - 105, bolt) - 120 * Math.sin(bolt * Math.PI)];
    if (bolt > 0 && t < tw_ + 2.4) { const bb = t < tw_ + 1.1 ? bp : [ax + 10 - (t - tw_ - 1.1) * 260, ay - 105 - (t - tw_ - 1.1) * 300]; ctx.save(); ctx.translate(bb[0], bb[1]); ctx.rotate(t * 9); flat(rectPts(-12, -12, 24, 24), '#9AA3B5', { line: '#2A2440', lw: 3 }); dot(0, 0, 5, '#2A2440'); ctx.restore(); }
    sfx('TINK!', ax + 190, ay - 250, 48, '#FFE9B8', t - (tw_ + 1.1), { life: 1, shadow: false });   // (up and right of the helmet and its emote)
    // the lens: our tools. Clawd holds it up and, inside it, the core looks like neat constellations
    const lens = seg(t, trd - 1.2, trd - .2);
    // he raises a little brass magnifier in his right hand (drawn in the arm's own space, so it follows the arm and
    // every hop); the big lens view grows out of that glass and drifts over the core, joined to it by a faint beam
    const lensUp = clamp(lens * 2.5); HANDLENS = null;
    helmetClawd(t, ax + 10, ay - 10 + jp.dy * 12, 12, keys, { flip: false, sq: jp.sq, aR: lens > 0 ? lerp(.2, 1.1, easeOut(lensUp)) : undefined, lookX: .9, lookY: -.5, armR: lens > 0 ? (u, sw) => magnifier(u, sw) : undefined });
    if (lens > 0 && HANDLENS) { const [hx, hy, hr] = HANDLENS, q = easeInOut(seg(lens, 0, .85)); lensView(t, lens, [lerp(hx, kx + sx, q), lerp(hy, ky + sy, q)], lerp(hr, 260, ease(seg(lens, .2, 1))), HANDLENS); }
    // (the first line has faded out completely before the second starts writing in the same spot)
    if (t > tw_ - .3 && t < tnv) title('the field got it wrong', 1180, 930, 72, '#F5E8FF', seg(t, tw_ - .3, tw_ + .5), { alpha: 1 - seg(t, tnv - .55, tnv - .2) });
    if (t > tnv - .15) title('it was never a knot', 1180, 930, 72, '#F5E8FF', seg(t, tnv - .15, tnv + .55), { alpha: 1 - seg(t, trd - 1.4, trd - 1) });
  }
  // a magnifying lens at c (screen) with radius r: inside it, the stars are ordered constellations in gold
  const CONST = Array.from({ length: 9 }, (_, c) => { const cx = ((c % 3) - 1) * 240 + (hash(c * 3) - .5) * 40, cy = (Math.floor(c / 3) - 1) * 150 + (hash(c * 5) - .5) * 30, n = 5 + (c % 3); return Array.from({ length: n }, (_, i) => [cx + Math.cos(i * 1.9 + c) * (40 + 30 * hash(i + c * 7)), cy + Math.sin(i * 1.3 + c * 2) * (30 + 20 * hash(i * 3 + c))]); });
  function constellations(t, cx, cy, s, k = 1, o = {}) {
    CONST.forEach((P, c) => {
      const kc = clamp(k * 1.6 - c * .07); if (kc <= 0) return;
      const Q = P.map(([x, y]) => [cx + x * s, cy + y * s]);
      ctx.save(); ctx.strokeStyle = o.line || 'rgba(255,214,120,.7)'; ctx.lineWidth = 2.4 * Math.max(.6, s); ctx.lineCap = 'round'; ctx.beginPath(); const n = Math.max(1, Math.round((Q.length - 1) * kc)); for (let i = 0; i <= n; i++) i ? ctx.lineTo(Q[i][0], Q[i][1]) : ctx.moveTo(Q[i][0], Q[i][1]); ctx.stroke(); ctx.restore();
      Q.forEach(([x, y], i) => { glow(x, y, 16 * Math.max(.6, s), '#FFD58A', .8 * kc); dot(x, y, 3.4 * Math.max(.6, s), '#FFF2C8', kc); });
      if (o.photos && kc > .6) { const [x, y] = Q[0]; lampOrb(x, y, 20 * s, PIECES[c % PIECES.length], kc); }
    });
  }
  // one lamp holding several photos at once, squeezed into wedges with the seams showing
  function crammed(x, y, r, ims, t) {
    if (r < 2) return; const n = ims.length; glow(x, y, r * 2.4, '#FF9AC0', .6);
    ims.forEach((im, i) => { const a0 = -Math.PI / 2 + i / n * TAU + .15 * Math.sin(t * 3), a1 = a0 + TAU / n, I = img(im), s = Math.min(I.width, I.height), m = (a0 + a1) / 2; ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, a0, a1); ctx.closePath(); ctx.clip(); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, x + Math.cos(m) * r * .45 - r * .8, y + Math.sin(m) * r * .45 - r * .8, r * 1.6, r * 1.6); ctx.restore(); });
    ctx.save(); ctx.strokeStyle = '#FFE9B8'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i / n * TAU + .15 * Math.sin(t * 3); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } ctx.stroke(); ctx.restore();
  }
  // Clawd's hand magnifier, in arm space (x runs out along the arm): a turned wooden handle, a brass collar and a small
  // glass. It records where its glass is on screen (HANDLENS = [x, y, r]) so the big lens view can grow out of it.
  let HANDLENS = null;
  function magnifier(u, sw) {
    paint(rrPts(-.2 * u, -.42 * u, 1.5 * u, .84 * u, .4 * u), { wash: '#8A5E3A', ink: PAL.ink, sw: sw * .7 });
    inkLine([[.2 * u, -.18 * u], [1 * u, -.18 * u]], sw * .5, '#C08A5A', 'inkfine', 0);
    paint(rrPts(1.25 * u, -.55 * u, .5 * u, 1.1 * u, .15 * u), { wash: '#D9A84A', ink: PAL.ink, sw: sw * .6 });
    const cx = 2.85 * u, r = 1.15 * u;
    ctx.save(); ctx.fillStyle = 'rgba(190,225,255,.35)'; ctx.beginPath(); ctx.arc(cx, 0, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = r * .42; ctx.stroke(); ctx.strokeStyle = '#E2B65A'; ctx.lineWidth = r * .26; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.lineWidth = r * .12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, 0, r * .62, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke(); ctx.restore();
    const m = ctx.getTransform(); HANDLENS = [m.a * cx + m.e, m.b * cx + m.f, r * Math.hypot(m.a, m.b)];
  }
  function lensView(t, k, c, r, hand) {
    const [x, y] = c;
    // a faint beam from the glass in Clawd's hand to the big lens view
    if (hand) { const [hx, hy, hr] = hand, dx = x - hx, dy = y - hy, d = Math.hypot(dx, dy); if (d > r + hr) { const nx = -dy / d, ny = dx / d; ctx.save(); ctx.globalAlpha = .5 * clamp(k * 3); const g = ctx.createLinearGradient(hx, hy, x, y); g.addColorStop(0, 'rgba(255,226,150,.45)'); g.addColorStop(1, 'rgba(255,226,150,.08)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(hx + nx * hr, hy + ny * hr); ctx.lineTo(x + nx * r, y + ny * r); ctx.lineTo(x - nx * r, y - ny * r); ctx.lineTo(hx - nx * hr, hy - ny * hr); ctx.closePath(); ctx.fill(); ctx.restore(); } }
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
    ctx.fillStyle = 'rgba(10,12,40,.92)'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    for (let i = 0; i < 90; i++) dot(x + (hash(i * 3.3) - .5) * 2 * r, y + (hash(i * 5.1) - .5) * 2 * r, .8 + hash(i) * 1.4, '#FFFFFF', .5);
    constellations(t, x, y, r / 330, k, { photos: true });
    ctx.restore();
    ctx.save(); ctx.strokeStyle = '#C99A45'; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#F1D08A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r - 6, Math.PI * 1.1, Math.PI * 1.5); ctx.stroke(); ctx.restore();
    glow(x - r * .4, y - r * .4, r * .5, '#FFFFFF', .12);
  }

  // ---------- shot 4 · the title over the galaxy; then the dive into one star, whose light fills the screen ----------
  function titleShot(t, lt, dur) {
    const a = cs('open_title'), e = ce('open_map'), end = chapStart('ch01');
    const D = BRIGHT[DIVE], [dx, dy] = starXY(D.r, D.q0, t, .12);
    // hold on the title, then lean in a little toward one star (the real dive comes in the next world, on "zoom")
    const kd = easeInOut(seg(t, e + .2, end + 1.6)), kz = easeInOut(seg(t, e + .2, end + 1.6));
    G = { x: lerp(40, dx * .55, kd), y: lerp(-10, dy * .55, kd), z: lerp(1.08 * seg(t, a - .5, e) + (1 - seg(t, a - .5, e)), 1.9, kz) };
    space(t);
    galaxy(t, { tw: .12, roads: .35, skip: G.z > 4 ? DIVE : -1 });
    // "it was never a knot": the core keeps the lens's look (gold constellations) while the little knot melts away
    const kn = 1 - ease(seg(t, a - .5, a + 1.5));
    if (G.z < 3) { const [cx, cy] = SX(0, 0); constellations(t, cx, cy - 10, .7 * G.z, ease(seg(t, a - .7, a + 1.2))); if (kn > 0) blackKnot(t, 92 * kn, { look: [.3, .5], loose: .35 + .4 * (1 - kn), k: .7 * kn }); }
    // the star we dive into: a warm lamp that becomes a sun
    const [sx, sy] = SX(dx, dy), zr = 12 * G.z, k = 0;
    if (G.z > 4) { glow(sx, sy, zr * 10, '#FFC870', .9); glow(sx, sy, zr * 5, '#FFE3A6', .9); glow(sx, sy, zr * 2.2, '#FFF6E0', 1); if (zr < 900) lampOrb(sx, sy, zr, D.im, 1); }
    for (let i = 0; i < 12 && k > 0; i++) { const q = i / 12 * TAU + t * .2; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .18 * k; ctx.fillStyle = '#FFE9B8'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(q - .05) * 2400, sy + Math.sin(q - .05) * 2400); ctx.lineTo(sx + Math.cos(q + .05) * 2400, sy + Math.sin(q + .05) * 2400); ctx.closePath(); ctx.fill(); ctx.restore(); }
    // Clawd waves goodbye from his rock as the camera leaves
    const away = easeIn(seg(t, e + .3, end + .4));
    if (away < 1) { asteroid(300 - 300 * away, 1000 + 300 * away, 240 * (1 - .4 * away), 'a2'); helmetClawd(t, 310 - 300 * away, 990 + 300 * away, 12 * (1 - .4 * away), [[a - 1, 'idea'], [a + .5, 'happy'], [e, 'excited']], { aR: 1.3 + .4 * Math.sin(t * 9), lookX: .8, lookY: -.5 }); }
    const out = 1 - seg(t, e + .5, e + 1);
    title('Neural Networks', 960, 250, 124, '#FFF6E8', seg(t, a - .1, a + 1.4), { stroke: '#120C2A', strokeW: .1, alpha: out });
    title('Are Already Clean', 960, 390, 124, '#FFD58A', seg(t, a + .5, a + 1.9), { stroke: '#120C2A', strokeW: .1, alpha: out });
    // the roadmap: the film's four parts light up on their words, under the title
    const PARTS = [['I', 'the belief', 'believed', '#B79CF0'], ['II', 'the evidence', 'evidence', '#F08AA8'], ['III', 'how it works', 'work', '#7FD6CF'], ['IV', 'what it means', 'finally', '#F2C46A']];
    PARTS.forEach(([n, lab, w, col], i) => {
      const tw = wt('open_map', w), k = seg(t, tw - .25, tw + .35) * out; if (k <= 0) return;
      const x = 360 + i * 400, y = 730, s = backOut(clamp(k));   // 320 wide, 80 apart
      ctx.save(); resetMatrix(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(k * 1.5) * out;
      ctx.fillStyle = 'rgba(14,10,36,.72)'; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-160, -72, 320, 144, 24); ctx.fill(); ctx.stroke();
      ctx.restore();
      if (k > .3) { letter('Part ' + n, x, y - 30, 44, col, { face: 'marker', shadow: false, alpha: out, screen: true }); letter(lab, x, y + 28, 50, '#FFF6E8', { face: 'hand', shadow: false, alpha: out, screen: true }); }
      if (i > 0 && k > .5) { ctx.save(); resetMatrix(); ctx.globalAlpha = .6 * out; ctx.strokeStyle = '#FFF6E8'; ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(x - 222, y); ctx.lineTo(x - 178, y); ctx.stroke(); ctx.restore(); }
    });
  }

  shots([
    [T0, question],
    [cs('open_city') - .3, lights],
    [cs('open_knot') - .4, knotShot],
    [cs('open_title') - .5, titleShot],
  ]);
})();
