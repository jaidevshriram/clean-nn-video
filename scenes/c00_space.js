// ch00 Cold open · DEEP SPACE. A question typed into a chat window falls like a comet into a galaxy of neuron-lights;
// the galaxy's core twists into the Knot (a tangled black hole); the Unfolding Machine starts pulling it apart; "we were
// wrong" (a lens shows the core as ordered constellations); the title; then the camera dives into ONE star, whose warm
// light fills the screen (ch01 opens on a tiny lit house).
(() => {
  // machine() letters its 'SAE' plate in its own local units; place it on the plate through the current transform
  function machineL(t, x, y, s, o) {
    const n = LETTERS.length, M = ctx.getTransform(), C0 = CAM, a = ctx.globalAlpha; CAM = null; machine(t, x, y, s, o); CAM = C0;
    for (let i = n; i < LETTERS.length; i++) { const L = LETTERS[i]; if (L.txt !== 'SAE') continue; const lx = x + L.x * s, ly = y + L.y * s; L.x = M.a * lx + M.c * ly + M.e; L.y = M.b * lx + M.d * ly + M.f; L.size *= s * Math.hypot(M.a, M.b); L.rot = (L.rot || 0) + Math.atan2(M.b, M.a); L.alpha = (L.alpha ?? 1) * a; L.screen = true; }
  }
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
      if (r > 22) lampOrb(x, y, r, b.im, clamp(fl));
      else { glow(x, y, 26 * zs, '#FFD58A', .8 * fl); dot(x, y, 2.2 * zs, '#FFF6D8', 1); }
    });
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
    flat(rrPts(190, 52, 120, 40, 20), o.send ? '#7B5CA8' : '#C9C3DA'); txt('send', 250, 73, 24, '#FFFFFF', { weight: '800' });
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
    if (fly > 0 && fly < .7) sfx('WHOOSH!', 1250, 800, 70, '#BFE6FF', t - tl - .2, { life: 1.1, shadow: false });
    if (lt < .8) fade(1 - ease(lt / .8), '#000000');
  }

  // ---------- shot 2 · inside: billions of lights, signals down a maze of roads; each light is a neuron ----------
  function lights(t, lt, dur) {
    const a = cs('open_city'), tb = wt('open_city', 'billions'), tp = wt('open_city', 'passing'), te = wt('open_city', 'Each'), tn = wt('open_city', 'neuron');
    const B = BRIGHT[3], [bx, by] = starXY(B.r, B.q0, tn, 0);
    camPath(t, [[a - .3, -260, 120, 1.05], [tb, -120, 60, 1.25], [tp, 60, -10, 1.55], [te, bx * .8, by * .8, 1.9], [tn + .2, bx, by, 9], [ce('open_city') + .3, bx, by, 10.5]]);
    space(t);
    // the comet's impact sets off a ring of light through the arms
    const ti = a - .1, wave = r => { const d = (t - ti) * 520 - r; return d > 0 && d < 160 ? .8 * Math.sin(d / 160 * Math.PI) : 0; };
    galaxy(t, { wave, roads: on(t, tp - .8), flare: i => i === 3 ? 0 : .3 * Math.max(0, Math.sin(t * 3 + i)) * on(t, tp - .5) });
    if (t - ti < 1.2) glow(...SX(-30, 10), 260 * (1 - (t - ti) / 1.2) + 40, '#FFFFFF', 1 - (t - ti) / 1.2);
    // labels
    title('billions of tiny lights', 1180, 150, 74, '#F5E8FF', seg(t, tb - .3, tb + 1.1) * (1 - seg(t, te - .8, te - .3)));
    const [nx, ny] = SX(bx, by);
    if (t > te - .2) { hand('a neuron', nx + 12 * G.z + 170, ny - 30, 56, '#FFE9B8', seg(t, tn - .4, tn + .4), { stroke: '#1A1030', strokeW: .14 }); }
  }

  // ---------- shot 3 · the knot: the core twists into a tangled black hole; the Unfolding Machine pulls at it ----------
  const MX = 470, MY = -40;   // the machine's asteroid, in galaxy units (right of the core)
  function knotShot(t, lt, dur) {
    const k0 = cs('open_knot'), tk = wt('open_knot', 'knotted'), tt = wt('open_knot', 'tangled'), tc = wt('open_knot', 'crammed'), tf = wt('open_knot', 'fit');
    const u0 = cs('open_untangle'), tear = wt('open_untangle', 'tear'), tpc = wt('open_untangle', 'pieces');
    const w0 = cs('open_wrong'), tw_ = wt('open_wrong', 'wrong'), tnv = wt('open_wrong', 'never'), trd = wt('open_wrong', 'read'), we = ce('open_wrong');
    const B3 = BRIGHT[3], [b3x, b3y] = starXY(B3.r, B3.q0, wt('open_city', 'neuron'), 0);
    camPath(t, [[k0 - .4, b3x, b3y, 10.5], [k0 + 2.2, 120, 20, 1.35], [tk, 60, 0, 1.25], [tt + 1, 0, -10, 1.55], [tf + .6, 30, -10, 1.7], [u0 + 1, 230, -20, 1.2], [tear, 240, -20, 1.28], [w0 + .5, 230, -10, 1.25], [tnv, 120, -20, 1.45], [we + .6, 60, -10, 1.55]]);
    space(t);
    const twist = ease(seg(t, tk - .6, tt + .8)) - .25 * ease(seg(t, tear, w0)) - .2 * ease(seg(t, tnv - .4, trd));
    const ks = 130 * backOut(seg(t, tk - .2, tt + .6)) * (1 - .12 * seg(t, tnv - .4, trd));
    const [sx, sy] = t < tf + .5 ? shakeXY(t, 6 * Math.sin(Math.PI * seg(t, tk - .5, tf + .5))) : [0, 0];
    push(); translate(sx, sy);
    galaxy(t, { tw: twist, roads: .25 * (1 - seg(t, tk - .5, tk + .5)) });
    // houses with nothing in common, crammed together: lamps with clashing photos jostle in orbit around the core
    const cram = ease(seg(t, tc - 1.2, tf)), loosen = ease(seg(t, tear, tpc + .4));
    CLASH.forEach((im, i) => {
      const k = popk(t, tc - 1.1 + i * .22, .5); if (k <= 0) return;
      const q = i / CLASH.length * TAU + t * (.9 - .4 * loosen) + Math.sin(t * 3 + i) * .08 * cram, rr = lerp(330, 175 + 18 * Math.sin(t * 5 + i * 2), cram) * (1 + .5 * loosen);
      const [x, y] = SX(Math.cos(q) * rr, Math.sin(q) * rr * .5), sq = 1 + .12 * Math.sin(t * 9 + i) * cram;
      ctx.save(); ctx.translate(x, y); ctx.scale(sq, 2 - sq); lampOrb(0, 0, 30 * G.z * backOut(k) * .9, im, .8); ctx.restore();
    });
    // the Unfolding Machine rolls in on its own rock and starts pulling a strand out of the knot
    const arrive = easeOut(seg(t, u0 - .2, u0 + 2.4)), mx = lerp(MX + 700, MX, arrive), mOn = 1 - seg(t, tw_ - .3, tw_ + .6);
    const pull = seg(t, tear - .3, tear + 1), [kx, ky] = SX(0, 0);
    if (t > u0 - .3) {
      camBegin(G.x, G.y, G.z); CAM = null;   // (machine() letters its own label; keep it from landing in screen space)
      // the strand: from the knot's rim into the funnel, a rope with photos travelling along it
      if (pull > 0) { const P = [[60, -20], [190, -110 - 30 * Math.sin(t * 2)], [mx - 20, MY - 185]], C = through(P, 12), n = Math.max(2, Math.round(C.length * pull)); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = '#08040F'; ctx.lineWidth = 26; ctx.beginPath(); C.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = '#3A2450'; ctx.lineWidth = 18; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 4; ctx.setLineDash([12, 9]); ctx.lineDashOffset = -t * 60 * mOn; ctx.stroke(); ctx.restore(); }
      boilSeed('mrock'); paint(ellPts(mx, MY + 6, 190, 40, 24), { grad: [[0, '#6A6088'], [1, '#2A2440']], ink: '#0E0A1A', sw: .8, curv: .4 });
      machineL(t, mx, MY, .34, { on: mOn, belt: pull * mOn + (1 - mOn) * pull * .0001, mouth: .9, items: [i => { const im = PIECES[i % PIECES.length], I = img(im), s = Math.min(I.width, I.height); glow(0, -30, 60, '#FFD58A', .5); ctx.save(); ctx.beginPath(); ctx.arc(0, -30, 26, 0, TAU); ctx.clip(); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -26, -56, 52, 52); ctx.restore(); ctx.strokeStyle = '#FFE9B8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -30, 26, 0, TAU); ctx.stroke(); }] });
      // it sputters: black puffs when it dies
      if (t > tw_ - .3 && t < tw_ + 3) for (let i = 0; i < 3; i++) { const ph = seg(t, tw_ - .2 + i * .35, tw_ + 1.6 + i * .35); if (ph > 0 && ph < 1) paint(ellPts(mx + 56 + ph * 30, MY - 165 - ph * 120, 10 + 34 * ph, 8 + 26 * ph, 14), { wash: '#2A2433', washOp: 230 * (1 - ph), ink: null }); }
      camEnd();
      if (t > tw_ - .2 && t < tw_ + 1.2) sfx('pfft…', ...SX(mx + 20, MY - 160), 46, '#C9C3DA', t - tw_ + .2, { life: 1.3, shadow: false });
    }
    // the knot itself
    const look = t < u0 + 1 ? [-.7, .4] : t < tw_ ? [.9, -.2] : [-.2, .6];
    blackKnot(t, ks, { look, loose: .3 * loosen - .1 * loosen * seg(t, tw_, tnv) + .1 * seg(t, tnv - .3, trd), grin: t > tt && t < tear });
    pop();
    if (t > tt - .4 && t < u0) title('tangled', ...SX(0, -200), 84, '#FFB3D9', seg(t, tt - .4, tt + .4) * (1 - seg(t, u0 - .7, u0 - .2)), { screen: true });
    // Clawd on his rock, foreground left
    const ax = 300, ay = 1000 + 360 * (1 - easeOut(seg(t, k0 + .4, k0 + 2.4))), jp = jump(t, tw_ + 1.05, tw_ + 1.55, 1.2);
    asteroid(ax, ay, 240, 'a2');
    const keys = [[k0 - 1, 'excited'], [tk, 'nervous'], [tt, 'scared'], [u0 + .6, 'hopeful'], [tear + .3, 'determined'], [tw_, 'surprised'], [tw_ + 1.2, 'dizzy'], [trd - .9, 'idea']];
    // the gag: a bolt shaken off the dying machine drifts across and tinks off Clawd's helmet
    const bolt = seg(t, tw_ + .1, tw_ + 1.1), b0 = SX(mx - 40, MY - 60), bp = [lerp(b0[0], ax + 10, bolt), lerp(b0[1], ay - 105, bolt) - 120 * Math.sin(bolt * Math.PI)];
    if (bolt > 0 && t < tw_ + 2.4) { const bb = t < tw_ + 1.1 ? bp : [ax + 10 - (t - tw_ - 1.1) * 260, ay - 105 - (t - tw_ - 1.1) * 300]; ctx.save(); ctx.translate(bb[0], bb[1]); ctx.rotate(t * 9); flat(rectPts(-12, -12, 24, 24), '#9AA3B5', { line: '#2A2440', lw: 3 }); dot(0, 0, 5, '#2A2440'); ctx.restore(); }
    sfx('TINK!', ax + 80, ay - 190, 48, '#FFE9B8', t - (tw_ + 1.1), { life: 1, shadow: false });
    // the lens: our tools. Clawd holds it up and, inside it, the core looks like neat constellations
    const lens = seg(t, trd - 1.2, trd - .2);
    helmetClawd(t, ax + 10, ay - 10 + jp.dy * 12, 12, keys, { flip: false, sq: jp.sq, aR: lens > 0 ? lerp(.2, 1.3, lens) : undefined, lookX: .9, lookY: -.5 });
    if (lens > 0) lensView(t, lens, [lerp(ax + 140, kx + sx, ease(lens)), lerp(ay - 140, ky + sy, ease(lens))], 260 * easeOut(lens), [ax + 75, ay - 70]);
    if (t > tw_ - .2) title('we were wrong', 1180, 930, 78, '#F5E8FF', seg(t, tw_ - .2, tw_ + .6) * (1 - seg(t, trd - 1.4, trd - 1)));
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
  function lensView(t, k, c, r, hand) {
    const [x, y] = c;
    // the handle from Clawd's hand
    ctx.save(); ctx.strokeStyle = '#7A5B3E'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hand[0], hand[1]); ctx.lineTo(x - r * .62, y + r * .62); ctx.stroke(); ctx.restore();
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
    // hold on the title, then dive: the centre slides onto the star while the zoom grows exponentially
    const kd = easeInOut(seg(t, e + .2, end - .9)), kz = seg(t, e + .2, end + .2);
    G = { x: lerp(40, dx, kd), y: lerp(-10, dy, kd), z: Math.exp(lerp(Math.log(lerp(1, 1.08, seg(t, a - .5, e))), Math.log(45), Math.pow(kz, 1.7))) * (1 + 2 * seg(t, end + .2, end + 2.5)) };
    space(t);
    galaxy(t, { tw: .12, roads: .35, skip: G.z > 4 ? DIVE : -1 });
    if (G.z < 3) blackKnot(t, 92, { look: [.3, .5], loose: .35, k: .7 });
    // the star we dive into: a warm lamp that becomes a sun
    const [sx, sy] = SX(dx, dy), zr = 12 * G.z, k = seg(t, e + .3, end + .4);
    if (G.z > 4) { glow(sx, sy, zr * 10, '#FFC870', .9); glow(sx, sy, zr * 5, '#FFE3A6', .9); glow(sx, sy, zr * 2.2, '#FFF6E0', 1); if (zr < 900) lampOrb(sx, sy, zr, D.im, 1); }
    for (let i = 0; i < 12 && k > 0; i++) { const q = i / 12 * TAU + t * .2; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .18 * k; ctx.fillStyle = '#FFE9B8'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(q - .05) * 2400, sy + Math.sin(q - .05) * 2400); ctx.lineTo(sx + Math.cos(q + .05) * 2400, sy + Math.sin(q + .05) * 2400); ctx.closePath(); ctx.fill(); ctx.restore(); }
    // Clawd waves goodbye from his rock as the camera leaves
    const away = easeIn(seg(t, e + .2, end - .4));
    if (away < 1) { asteroid(300 - 300 * away, 1000 + 300 * away, 240 * (1 - .4 * away), 'a2'); helmetClawd(t, 310 - 300 * away, 990 + 300 * away, 12 * (1 - .4 * away), [[a - 1, 'idea'], [a + .5, 'happy'], [e, 'excited']], { aR: 1.3 + .4 * Math.sin(t * 9), lookX: .8, lookY: -.5 }); }
    const out = 1 - seg(t, e + .5, e + 1);
    title('Neural Networks', 960, 250, 124, '#FFF6E8', seg(t, a - .1, a + 1.4), { stroke: '#120C2A', strokeW: .1, alpha: out });
    title('Are Already Clean', 960, 390, 124, '#FFD58A', seg(t, a + .5, a + 1.9), { stroke: '#120C2A', strokeW: .1, alpha: out });
    // the roadmap: the film's four parts light up on their words, under the title
    const PARTS = [['I', 'the belief', 'believed', '#B79CF0'], ['II', 'the evidence', 'evidence', '#F08AA8'], ['III', 'how it works', 'work', '#7FD6CF'], ['IV', 'what it means', 'means', '#F2C46A']];
    PARTS.forEach(([n, lab, w, col], i) => {
      const tw = wt('open_map', w), k = seg(t, tw - .25, tw + .35) * out; if (k <= 0) return;
      const x = 450 + i * 400, y = 790, s = backOut(clamp(k));
      ctx.save(); resetMatrix(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(k * 1.5) * out;
      ctx.fillStyle = 'rgba(14,10,36,.72)'; ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(-180, -72, 360, 144, 24); ctx.fill(); ctx.stroke();
      ctx.restore();
      if (k > .3) { letter('Part ' + n, x, y - 30, 44, col, { face: 'marker', shadow: false, alpha: out, screen: true }); letter(lab, x, y + 28, 50, '#FFF6E8', { face: 'hand', shadow: false, alpha: out, screen: true }); }
      if (i > 0 && k > .5) { ctx.save(); resetMatrix(); ctx.globalAlpha = .6 * out; ctx.strokeStyle = '#FFF6E8'; ctx.lineWidth = 3; ctx.setLineDash([8, 10]); ctx.beginPath(); ctx.moveTo(x - 220, y); ctx.lineTo(x - 180, y); ctx.stroke(); ctx.restore(); }
    });
    // warm light fills the frame
    const bl = ease(seg(t, end - 1.6, end - .2)); if (bl > 0) { ctx.save(); resetMatrix(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .75 * bl; ctx.fillStyle = '#FFB85A'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    flash(ease(seg(t, end - .9, end + .3)) * .96, '#FFEFC8');
  }

  shots([
    [T0, question],
    [cs('open_city') - .3, lights],
    [cs('open_knot') - .4, knotShot],
    [cs('open_title') - .5, titleShot],
  ]);
})();
