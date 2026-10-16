// ch06 Watching a neuron grow · world: a VINTAGE BOTANICAL PLATE.
// A winged seed lands on the plate and a neuron grows like a plant over training steps (Fig. VI): yellow flower
// fields (one with a dog), then branches toward tennis balls and fruit, toward dogs, into broccoli, while the flower
// leaves shrink. Fig. VII: the modern network's plant grows a ball branch and Clawd prunes it. Fig. VIII: recursive
// generalization, a gold path from the root to every branch. Fig. IX: a vine of word-leaves, "iy" to "do it
// yourself". Fig. X & XI: the geology neuron's Cesium branch, the enemy neuron's Russian poem. Then the plant is
// potted and wheeled off the plate (it is contestant #1 in the game show).
(() => {
  const NO = 'blog/raw/neuron-overflow/';
  const iv = (s, b, i) => NO + `iv1_${s}_${b}_${i}`, cn = (s, b, i) => NO + `cnx_${s}_${b}_${i}`;
  const PAPER = '#F1E6CC', INK = '#3A2A1A', SEPIA = '#5A4A3A', STEM = '#56743F', STEMDK = '#2E3E22', LEAFINK = '#33422A', GOLD = '#E3A92E', GOLDLT = '#FFD36B', RED = '#A8402E';
  const GROUND = 930, SERIF = '"Liberation Serif"';

  // ---------- plate furniture ----------
  // the sheet: paper in screen space (dx slides it in from the right, with a shadow on the old plate)
  function sheet(dx = 0) {
    ctx.save(); resetMatrix();
    if (dx > 1) { const g = ctx.createLinearGradient(dx - 60, 0, dx, 0); g.addColorStop(0, 'rgba(40,25,10,0)'); g.addColorStop(1, 'rgba(40,25,10,.45)'); ctx.fillStyle = g; ctx.fillRect(dx - 60, 0, 60, H); }
    ctx.fillStyle = PAPER; ctx.fillRect(dx, 0, W + 10, H);
    ctx.restore();
  }
  // the printed border, foxing spots and corner ornaments (world space, cached)
  function plateFrame(key) {
    layer('c6frame', () => {
      ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 3; ctx.strokeRect(80, 60, W - 160, H - 120); ctx.lineWidth = 1; ctx.strokeRect(96, 76, W - 192, H - 152); ctx.restore();
      for (let i = 0; i < 18; i++) { const x = 100 + hash(i * 3.7) * (W - 200), y = 80 + hash(i * 5.3) * (H - 160), r = 6 + hash(i * 1.9) * 26; ctx.save(); ctx.globalAlpha = .06 + .06 * hash(i); ctx.fillStyle = '#9A6A3A'; ctx.beginPath(); ctx.ellipse(x, y, r, r * (.6 + .4 * hash(i * 2)), hash(i) * 3, 0, TAU); ctx.fill(); ctx.restore(); }
      for (const [x, y, sx, sy] of [[96, 76, 1, 1], [W - 96, 76, -1, 1], [96, H - 76, 1, -1], [W - 96, H - 76, -1, -1]]) { ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x + sx * 10, y + sy * 46); ctx.quadraticCurveTo(x + sx * 10, y + sy * 10, x + sx * 46, y + sy * 10); ctx.stroke(); ctx.beginPath(); ctx.arc(x + sx * 22, y + sy * 22, 5, 0, TAU); ctx.stroke(); ctx.restore(); }
    }, { variants: 1, x: -200, y: -200, w: W + 400, h: H + 400 });
  }
  // a camera that can slide the whole sheet (letters too) in from the right
  function cam(t, keys, dx = 0, drift = 1) {
    const v = kf(t, keys.map(k => [k[0], [k[1], k[2], k[3] ?? 1]]), easeInOut), z = v[2] * (1 + drift * .004 * Math.sin(t * .17));
    camBegin(v[0] + drift * 5 * Math.sin(t * .31) - dx / z, v[1] + drift * 3 * Math.sin(t * .23 + 1), z);
  }
  // a new plate slides over the previous one (frozen at prevT)
  function slide(t, lt, prev, prevT) {
    const k = easeInOut(seg(lt, 0, .75)), dx = (1 - k) * (W + 80);
    if (k < 1 && prev) { prev(prevT, 99, 100); flushLetters(); resetMatrix(); }
    sheet(dx); return dx;
  }
  // plate typography
  function plateTitle(s, x, y, k, size = 64) { if (k > 0) letter(s, x, y, size, INK, { face: 'marker', shadow: false, reveal: k }); }
  function caption(s, x, y, k, size = 44, col = SEPIA, o = {}) { if (k > 0) letter(s, x, y, size, col, { face: 'hand', shadow: false, reveal: k, ...o }); }
  function serif(s, x, y, size, col = INK, o = {}) { ctx.save(); ctx.font = `${o.it ? 'italic ' : ''}${o.bold ? '700 ' : '400 '}${size}px ${SERIF}`; ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; if (o.alpha != null) ctx.globalAlpha *= o.alpha; ctx.fillText(s, x, y); ctx.restore(); }
  // the step counter: an engraved cartouche with a little sundial whose hand races during the time-lapse
  function counter(t, x, y, step, k, spin) {
    if (k <= 0) return;
    push(); translate(x, y); scale(backOut(k));
    flat(rrPts(-190, -62, 380, 124, 14), '#F6EEDA', { line: SEPIA, lw: 2.5 }); ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 1; ctx.strokeRect(-180, -52, 360, 104); ctx.restore();
    serif('TRAINING STEP', 34, -30, 22, SEPIA, { bold: true });
    serif(Math.round(step).toLocaleString('en-US'), 34, 14, 54, INK, { bold: true });
    ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(-128, 0, 38, 0, TAU); ctx.stroke(); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; ctx.beginPath(); ctx.moveTo(-128 + Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(-128 + Math.cos(a) * 36, Math.sin(a) * 36); ctx.stroke(); }
    const a = spin - Math.PI / 2; ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-128, 0); ctx.lineTo(-128 + Math.cos(a) * 30, Math.sin(a) * 30); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-128, 0, 4, 0, TAU); ctx.fill(); ctx.restore();
    pop();
  }

  // ---------- botany ----------
  // a tapered stem along P, grown to k (0..1)
  function stem(P, k, w0, w1, col = STEM) {
    if (k <= .005) return null;
    const C = through(P, 8), n = C.length - 1, f = k * n, i = Math.floor(f), Q = C.slice(0, i + 1);
    if (i < n) { const a = C[i], b = C[i + 1]; Q.push([lerp(a[0], b[0], f - i), lerp(a[1], b[1], f - i)]); }
    if (Q.length < 2) return null;
    const poly = taper(Q, [w0, lerp(w0, w1, k) * .9 + 1], 1), p = pathOf(poly);
    fillPath(p, col, STEMDK, 2.2);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,230,.25)'; ctx.lineWidth = Math.max(1, w0 * .12); ctx.beginPath(); Q.forEach((q, j) => j ? ctx.lineTo(q[0] - w0 * .15, q[1]) : ctx.moveTo(q[0] - w0 * .15, q[1])); ctx.stroke(); ctx.restore();
    return Q[Q.length - 1];
  }
  // an almond leaf from base (x, y) along angle a, length L; a photo shows through it (kept upright)
  function leafPts(x, y, L, a, wr) {
    const ca = Math.cos(a), sa = Math.sin(a), P = [];
    for (let i = 0; i <= 18; i++) { const u = i / 18; P.push([u * L, -Math.pow(Math.sin(u * Math.PI), .75) * L * wr * (1 - .3 * u)]); }
    for (let i = 17; i > 0; i--) { const u = i / 18; P.push([u * L, Math.pow(Math.sin(u * Math.PI), .75) * L * wr * (1 - .3 * u)]); }
    return P.map(([px, py]) => [x + px * ca - py * sa, y + px * sa + py * ca]);
  }
  function leaf(x, y, L, a, im, k, o = {}) {
    if (k <= .01) return null;
    const kk = backOut(clamp(k)) * (o.s ?? 1), LL = L * kk, sway = (o.sway ?? 1) * .04 * Math.sin(T * 1.3 + x * .01), A = a + sway + (o.droop || 0);
    const P = leafPts(x, y, LL, A, o.wr ?? .3), B = bbox(P), cx = x + Math.cos(A) * LL * .5, cy = y + Math.sin(A) * LL * .5;
    if (o.fire > .01) glow(cx, cy, LL * .75, GOLDLT, o.fire);
    const path = pathOf(P);
    ctx.save(); ctx.clip(path);
    ctx.fillStyle = '#C9D3A0'; ctx.fillRect(B.x0, B.y0, B.w, B.h);
    if (im) { const I = img(im), s = Math.min(I.width, I.height), d = Math.max(B.w, B.h) * 1.02; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, cx - d / 2, cy - d / 2, d, d); }
    if (o.draw) o.draw(cx, cy, LL, B);
    if (o.wilt > 0) { ctx.globalAlpha = .55 * o.wilt; ctx.fillStyle = '#C9A86A'; ctx.fillRect(B.x0, B.y0, B.w, B.h); }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = LEAFINK; ctx.lineWidth = 3.2; ctx.lineJoin = 'round'; ctx.stroke(path);
    // midrib and a few veins, in fine ink over the photo
    ctx.globalAlpha = .55; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(A) * LL * .96, y + Math.sin(A) * LL * .96); ctx.stroke();
    ctx.lineWidth = 1; for (let i = 1; i < 5; i++) { const u = i / 5.5, bx = x + Math.cos(A) * LL * u, by = y + Math.sin(A) * LL * u, vl = LL * .16 * (1 - u * .5); for (const sd of [-1, 1]) { const va = A + sd * .75; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + Math.cos(va) * vl, by + Math.sin(va) * vl); ctx.stroke(); } }
    ctx.restore();
    return [cx, cy];
  }
  // curly tendril
  function tendril(x, y, a, L, k, dir = 1) {
    if (k <= 0) return; const P = []; const n = Math.max(2, Math.round(30 * k));
    for (let i = 0; i <= n; i++) { const u = i / 30, r = L * (1 - u * .7), q = a + dir * u * 5.5; P.push([x + Math.cos(a) * L * u * 1.4 + Math.cos(q) * r * .25 * u, y + Math.sin(a) * L * u * 1.4 + Math.sin(q) * r * .25 * u]); }
    ctx.save(); ctx.strokeStyle = STEMDK; ctx.lineWidth = 2.6; ctx.lineCap = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
  }
  // the soil: a cross-section mound with pebbles; roots grow into it
  function soil(cx = 960, w = 260) {
    boilSeed('c6soil' + cx);
    const P = []; for (let i = 0; i <= 14; i++) { const u = i / 14; P.push([cx - w + u * 2 * w, GROUND - Math.sin(u * Math.PI) * 14 + Math.sin(i * 2.3) * 3]); }
    for (let i = 14; i >= 0; i--) { const u = i / 14; P.push([cx - w * .92 + u * 1.84 * w, GROUND + 52 + Math.sin(i * 1.7) * 5]); }
    flat(P, '#9C7A52', { line: INK, lw: 2 });
    ctx.save(); ctx.globalAlpha = .35; ctx.strokeStyle = '#5A3E22'; ctx.lineWidth = 1; for (let i = 0; i < 26; i++) { const x = cx - w * .85 + hash(i * 3.1) * w * 1.7, y = GROUND + 8 + hash(i * 7.3) * 38; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 14, y + 2); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 9; i++) dot(cx - w * .8 + hash(i * 5.7) * w * 1.6, GROUND + 14 + hash(i * 2.9) * 30, 3 + hash(i) * 4, '#6A5038', .8);
  }
  function roots(cx, k) {
    if (k <= 0) return;
    ctx.save(); ctx.strokeStyle = '#4A3420'; ctx.lineCap = 'round';
    for (let r = 0; r < 5; r++) { const a = Math.PI / 2 + (r - 2) * .45, n = Math.max(2, Math.round(10 * k)); ctx.lineWidth = r === 2 ? 3 : 1.8; ctx.beginPath(); ctx.moveTo(cx, GROUND); for (let i = 1; i <= n; i++) { const u = i / 10; ctx.lineTo(cx + Math.cos(a) * 70 * u + Math.sin(i * 1.9 + r) * 5, GROUND + Math.sin(a) * 46 * u); } ctx.stroke(); }
    ctx.restore();
  }

  // ---------- the neuron plant (Fig. VI geometry) ----------
  const S0 = [[960, 930], [954, 840], [966, 740], [956, 640], [962, 540], [960, 470]];
  const BR = [
    { P: [[958, 700], [860, 650], [760, 610], [640, 560]], w: [12, 5] },             // 0 balls
    { P: [[760, 612], [640, 680], [520, 730], [440, 740]], w: [8, 4] },              // 1 fruit (off balls)
    { P: [[962, 620], [1060, 580], [1180, 540], [1300, 500]], w: [12, 5] },          // 2 dogs
    { P: [[1180, 542], [1290, 610], [1400, 680], [1500, 700]], w: [8, 4] },          // 3 broccoli (off dogs)
  ];
  // leaves: [x, y, L, angle, family, imgs by stage]
  const LV = {
    a1: [960, 482, 228, -Math.PI / 2], a2: [952, 522, 230, -2.45], a3: [968, 522, 230, -.69], a4: [954, 600, 170, -2.95],
    b1: [640, 560, 220, -2.55], b2: [790, 622, 160, -1.85], c1: [440, 742, 200, 3.05], c2: [570, 712, 150, 2.1],
    d1: [1300, 500, 220, -.5], d2: [1140, 556, 160, -1.25], e1: [1500, 702, 210, .12], e2: [1360, 664, 150, 1.05],
  };
  const LBL = { a: ['a. flores', 1190, 290], b: ['b. pilae', 330, 390], c: ['c. poma', 270, 660], d: ['d. canes', 1590, 330], e: ['e. brassica', 1640, 600] };
  const IM_OLD = { a1: iv(1654, 0, 0), a2: iv(1654, 0, 3), a3: iv(3753, 0, 1), a4: iv(1654, 3, 0), b1: iv(3753, 1, 2), b2: iv(7506, 1, 0), c1: iv(3753, 2, 0), c2: iv(7506, 2, 0), d1: iv(3753, 3, 2), d2: iv(7506, 3, 1), e1: iv(7506, 4, 1), e2: iv(15012, 4, 2) };
  const IM_FINAL = { a1: iv(30024, 0, 1), a2: iv(30024, 0, 2), a3: iv(15012, 0, 1), a4: iv(3753, 3, 0), b1: iv(30024, 1, 3), b2: iv(30024, 1, 5), c1: iv(30024, 2, 2), c2: iv(30024, 2, 3), d1: iv(30024, 3, 1), d2: iv(30024, 3, 2), e1: iv(30024, 4, 0), e2: iv(30024, 4, 3) };
  // G: growth state {stem, br: [4], lv: {id: k}, shrink, wilt, imgs, fire: {id: a}}
  function plant(t, G) {
    const sh = G.shrink || 0;
    roots(960, G.roots ?? 1);
    // branches behind the main stem
    BR.forEach((b, i) => stem(b.P, G.br[i] || 0, b.w[0], b.w[1]));
    stem(S0, G.stem, 22, 9);
    // tendrils reaching out along "each part of those photos"
    if (G.tend > 0) { tendril(930, 560, 3.6, 60, G.tend, -1); tendril(990, 560, -.3, 60, G.tend, 1); tendril(950, 640, 2.6, 50, G.tend * .8, 1); }
    const order = ['c2', 'c1', 'b2', 'b1', 'e2', 'e1', 'd2', 'd1', 'a4', 'a2', 'a3', 'a1'];
    for (const id of order) {
      const k = G.lv[id] || 0; if (k <= 0) continue;
      const [x, y, L, a] = LV[id], fam = id[0], isA = fam === 'a';
      leaf(x, y, L, a, (G.imgs || IM_OLD)[id], k, { s: isA ? (1 - .5 * sh) * (G.aS || 1) : 1, wilt: isA ? (G.wilt || 0) : 0, droop: isA ? .25 * sh * (id === 'a2' ? -1 : 1) : 0, fire: (G.fire && G.fire[fam]) || 0 });
    }
    // petals falling from the shrinking flower leaves
    if (sh > 0 && sh < 1 && G.petals) for (let i = 0; i < 14; i++) { const f = frac(G.petals + hash(i)), x = 900 + hash(i * 3) * 140 + Math.sin(f * 8 + i) * 30, y = 360 + f * 560; dot(x, y, 5, '#E9C83A', (1 - f) * sh * 3); }
  }
  function labels(t, G, o = {}) {
    for (const f of ['a', 'b', 'c', 'd', 'e']) { const k = G.lab && G.lab[f] || 0; if (k > 0) caption(LBL[f][0], LBL[f][1], LBL[f][2], k, 46, INK); }
  }
  const FULL = { stem: 1, br: [1, 1, 1, 1], lv: { a1: 1, a2: 1, a3: 1, a4: 1, b1: 1, b2: 1, c1: 1, c2: 1, d1: 1, d2: 1, e1: 1, e2: 1 }, shrink: 1, wilt: .6, imgs: IM_FINAL, roots: 1 };

  // a winged seed (a samara), spinning as it falls
  function samara(x, y, rot, s = 1) {
    push(); translate(x, y); rotate(rot); scale(s);
    flat([[0, 0], [-14, -30], [-6, -78], [8, -84], [14, -40], [6, -6]], 'rgba(210,180,120,.75)', { line: SEPIA, lw: 1.5 });
    ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = .8; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(2, -6); ctx.lineTo(-8 + i * 5, -76); ctx.stroke(); } ctx.restore();
    flat(ellPts(0, 0, 13, 10, 14), '#7A5233', { line: INK, lw: 2 });
    pop();
  }
  // Clawd's watering can (armR hook); tip 0..1 tilts it
  const can = tip => (u, sw) => { push(); rotate(-.2 - tip * .9); flat(rrPts(-u * .4, -u * 1.2, u * 2.6, u * 2.2, u * .3), '#7A8A94', { line: INK, lw: 2 }); flat([[u * 2.1, -u * .6], [u * 4.2, -u * 2.2], [u * 4.4, -u * 1.8], [u * 2.2, u * .1]], '#6A7A84', { line: INK, lw: 1.6 }); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(u * .9, -u * 1.2, u * .9, Math.PI, TAU); ctx.stroke(); ctx.restore(); pop(); };
  // long-handled loppers (armR hook): open 0..1
  const loppers = open => (u, sw) => { ctx.save(); ctx.strokeStyle = '#6A4B30'; ctx.lineWidth = u * .5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(u * 26, 0); ctx.stroke(); translate(u * 26, 0); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * (.08 + .35 * open)); flat([[0, -u * .25], [u * 3.2, sd * -u * .5], [u * 3.4, 0], [0, u * .25]], '#B9C0CE', { line: INK, lw: 1.4 }); ctx.restore(); } ctx.restore(); };

  // ---------- 1 · Fig. VI: the seed lands, the neuron grows ----------
  function grow(t, lt, dur) {
    const c0 = chapStart('ch06'), q = cs('gr_q'), f = cs('gr_flowers'), b = cs('gr_branch'), e = ce('gr_branch');
    const tRand = wt('gr_q', 'random'), tWatch = wt('gr_q', 'watch'), tGrow = wt('gr_q', 'grow');
    const tRet = wt('gr_flowers', 'retrained'), tForm = wt('gr_flowers', 'form'), tYel = wt('gr_flowers', 'yellow'), tDogF = wt('gr_flowers', 'dog');
    const tAlong = wt('gr_branch', 'along'), tTow = wt('gr_branch', 'Toward'), tTen = wt('gr_branch', 'tennis'), tBalls = wt('gr_branch', 'balls'), tFr = wt('gr_branch', 'fruit');
    const tDog = wt('gr_branch', 'dogs'), tWithout = wt('gr_branch', 'without'), tBro = wt('gr_branch', 'broccoli'), tFl = wt('gr_branch', 'flowers'), tGone = wt('gr_branch', 'gone');
    const land = q - .15;
    sheet();
    cam(t, [[c0, 1000, 560, 1.45], [land - .5, 1000, 800, 1.7], [land, 1000, 830, 1.8], [tWatch, 980, 790, 1.55], [tRet + .5, 960, 640, 1.08], [tYel, 960, 560, 1], [tTow, 950, 560, .97], [tTen, 820, 570, 1], [tDog, 1100, 570, 1], [tBro + .3, 1060, 560, .97], [e, 960, 545, .95]]);
    plateFrame();
    soil();
    // the seed: falls spinning from the park above, bounces, splits as the sprout comes up
    if (t < tWatch + .3) {
      const u = seg(t, c0 - .4, land), y = lerp(-60, GROUND - 6, u * .55 + .45 * u * u), x = 960 + 90 * Math.sin(u * 9) * (1 - u), r = u < 1 ? Math.sin(t * 9) * .9 : 1.25 + .15 * Math.exp(-6 * (t - land)) * Math.sin(20 * (t - land));
      const bounce = t > land ? Math.abs(Math.sin((t - land) * 9)) * 22 * Math.exp(-4 * (t - land)) : 0;
      samara(x, y - bounce, r, 1.2 * (1 - seg(t, tWatch, tWatch + .3)));
      if (t > land && t < land + .6) { const k = seg(t, land, land + .6); for (let i = 0; i < 6; i++) dot(960 + Math.cos(i) * 60 * k, GROUND - 4 - Math.sin(i * 1.3) * 30 * k * (1 - k), 4, '#7A5B3E', 1 - k); }
    }
    const G = {
      roots: seg(t, tRand - .4, tWatch),
      stem: .13 * easeOut(seg(t, tWatch, tGrow + .3)) + .87 * easeOut(seg(t, tRet - .2, tForm + .3)),
      tend: seg(t, tAlong - .2, tAlong + 1.2) * (1 - seg(t, tTow + .3, tTow + .9)),
      br: [ease(seg(t, tTow - .2, tTen)), ease(seg(t, tBalls, tFr)), ease(seg(t, tDog - .6, tDog + .2)), ease(seg(t, tBro - .8, tBro))],
      lv: { a1: popk(t, tYel - .2, .6), a2: popk(t, tYel + .1, .6), a3: popk(t, tYel + .4, .6), a4: popk(t, tDogF - .3, .6), b1: popk(t, tTen - .1, .6), b2: popk(t, tBalls + .1, .6), c1: popk(t, tFr - .1, .6), c2: popk(t, tFr + .4, .6), d1: popk(t, tDog + .1, .6), d2: popk(t, tWithout + .2, .6), e1: popk(t, tBro, .6), e2: popk(t, tBro + .5, .6) },
      shrink: ease(seg(t, tFl - .4, tGone + .3)), wilt: .6 * ease(seg(t, tFl - .2, tGone + .5)), petals: t * .5,
      imgs: t < tGone ? IM_OLD : IM_FINAL,
      fire: { a: .9 * env(t, tYel - .2, tYel + 2.2, .3, 1) + .5 * env(t, tDogF - .3, tDogF + 1.2, .2, .6), b: .9 * env(t, tTen - .1, tFr + 1, .3, .8), c: .9 * env(t, tFr - .1, tFr + 1.4, .3, .8), d: .9 * env(t, tDog, tWithout + 1.4, .3, .8), e: .9 * env(t, tBro, tBro + 1.8, .3, .8) },
      lab: { a: seg(t, tYel + .6, tYel + 1.4), b: seg(t, tBalls, tBalls + .7), c: seg(t, tFr + .5, tFr + 1.2), d: seg(t, tWithout, tWithout + .7), e: seg(t, tBro + .6, tBro + 1.3) },
    };
    plant(t, G);
    // a bud forms at the tip, then bursts into the flower leaves (with a puff of pollen)
    const bud = popk(t, tForm - .2, .5) * (1 - seg(t, tYel - .3, tYel));
    if (bud > 0) { push(); translate(960, 470 + 10 * (1 - G.stem)); scale(backOut(bud)); flat([[0, 6], [-26, -30], [0, -78], [26, -30]], '#9FB85A', { line: STEMDK, lw: 2.4 }); flat([[0, 6], [-12, -34], [0, -70], [12, -34]], '#C9D36A'); pop(); }
    const pk = seg(t, tYel - .2, tYel + 1.4); if (pk > 0 && pk < 1) for (let i = 0; i < 26; i++) { const q = hash(i * 3.3) * TAU, r = 60 + 260 * easeOut(pk) * (.4 + hash(i)); dot(960 + Math.cos(q) * r, 420 + Math.sin(q) * r * .7 + 60 * pk * pk, 5 + 3 * hash(i), '#E9C83A', 1 - pk); }
    // a sprout's two seed-leaves before the stem takes off
    const sp = popk(t, tWatch, .4) * (1 - seg(t, tRet, tRet + .8));
    if (sp > 0) { const top = [960, GROUND - 60 * clamp(G.stem / .13)]; for (const sd of [-1, 1]) { push(); translate(top[0], top[1]); rotate(sd * .5); scale(backOut(sp)); flat(ellPts(sd * 18, -6, 20, 9, 14), '#7FA35A', { line: STEMDK, lw: 1.6 }); pop(); } }
    // the watering-can droplets
    const wk = env(t, tRand + .3, tWatch - .1, .3, .3);
    if (wk > 0) for (let i = 0; i < 10; i++) { const fph = frac(t * 1.8 + i / 10); dot(1028 - fph * 50, 838 + fph * 88, 4, '#5A86A8', wk * (1 - fph * .5)); }
    // Clawd: looks up at the seed, waters it, then strolls aside to watch the plant grow
    const st = stroll(t, tRet + .5, tRet + 2.6, 1130, 1730, 11);
    const moods = [[c0, 'surprised'], [land + .2, 'happy'], [tRand + .2, 'determined'], [tWatch, 'excited'], [tRet + .4, 'happy'], [tYel, 'love'], [tYel + 1.5, 'surprised'], [tYel + 2.4, 'laugh'], [tTen, 'excited'], [tBro + .1, 'disgusted'], [tGone - .5, 'sad']];
    const watering = t < tWatch + .4;
    tourist(st.x, GROUND, 11, 'safari', { ...emotions(t, moods), view: watering ? 'q' : st.view, flip: watering ? true : t < tRet + .5 ? true : st.flip || t > tRet + 2.6, walk: st.walk > 0 && t < tRet + 2.6 ? st.walk : undefined, dy: st.dy, aR: watering ? .5 : undefined, armR: watering ? can(wk) : undefined, lookY: t < land ? -.9 : undefined, boilKey: 'c6c' });
    // the can stays on the ground after he walks off
    if (!watering) { push(); translate(1060, GROUND - 4); can(0)(9, 1); pop(); }
    labels(t, G);
    const step = kf(t, [[tRet, 0], [tYel, 1654], [tTen, 3753], [tDog, 7506], [tBro, 15012], [tGone, 30024]].map(([a, v]) => [a, [v]]), x => x)[0];
    counter(t, 330, 945, step, popk(t, tRet + .2, .5), t * (t < tGone ? 9 : .2));
    camEnd();
    // plate typography
    if (t > tYel + 1.5 && t < tYel + 2.9) sfx('achoo!', 1600, 720, 60, RED, t - tYel - 1.5, { face: 'hand', life: 1.4 });
    plateTitle('Neuronium recursivum', 960, 132, seg(t, tRet + .4, tRet + 1.6));
    caption('Fig. VI · one neuron, grown over 30,024 steps of training', 960, 206, seg(t, tForm, tForm + 1.4), 40);
  }

  // ---------- 2 · Fig. VII: the modern network grows a ball branch, then lets it go ----------
  const IM_MOD = { a1: cn(1654, 0, 1), a2: cn(3753, 0, 0), a3: cn(7506, 0, 3), a4: cn(1654, 3, 0), b1: cn(1654, 1, 0), b2: cn(3753, 1, 1), c1: cn(1654, 2, 0), c2: cn(3753, 2, 1) };
  const IM_MOD2 = { ...IM_MOD, a1: cn(30024, 0, 0), a2: cn(30024, 0, 1), a3: cn(30024, 0, 5), a4: cn(30024, 3, 0) };
  function compare(t, lt, dur) {
    const a = cs('gr_compare'), e = ce('gr_compare'), tRe = wt('gr_compare', 'reached'), tB = wt('gr_compare', 'balls'), tF = wt('gr_compare', 'fruit'), tLet = wt('gr_compare', 'let'), tGo = wt('gr_compare', 'go'), tStay = wt('gr_compare', 'stayed'), tFld = wt('gr_compare', 'fields');
    const dx = slide(t, lt, grow, ce('gr_branch') + .3);
    cam(t, [[a - .4, 960, 560, 1], [tB, 990, 575, 1.02], [tGo + .6, 1000, 580, 1.03], [e + 1, 970, 565, 1.01]], dx);
    plateFrame();
    ctx.save(); ctx.strokeStyle = SEPIA; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(960, 250); ctx.lineTo(960, 1000); ctx.stroke(); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(972, 250); ctx.lineTo(972, 1000); ctx.stroke(); ctx.restore();
    // a · the old network, fully grown
    push(); translate(510, 930); scale(.56); translate(-960, -930); soil(); plant(t, FULL); pop();
    // b · the modern network: the ball and fruit branch grows early, is snipped, and falls away
    const cut = tLet - .05, fall = seg(t, cut, cut + 1.2), grow2 = ease(seg(t, tRe - .5, tB)), g3 = ease(seg(t, tB, tF));
    const keep = 1 + .2 * ease(seg(t, tStay - .3, tFld));
    push(); translate(1400, 930); scale(.7); translate(-960, -930);
    soil();
    const GM = { stem: 1, br: [0, 0, 0, 0], lv: { a1: 1, a2: 1, a3: 1, a4: 1 }, aS: keep, imgs: t > tStay ? IM_MOD2 : IM_MOD, roots: 1, fire: { a: .3 + .7 * env(t, tStay - .2, e + 3, .4, .4) } };
    plant(t, GM);
    // the doomed branch: drawn in its own transform so it can drop
    push(); translate(1920, 0); scale(-1, 1);
    if (fall > 0) { const yy = 700 + 330 * easeIn(fall) + 60 * Math.sin(fall * Math.PI), rr = -1.3 * ease(fall); translate(958, yy); rotate(rr); translate(-958, -700); ctx.globalAlpha = 1 - seg(fall, .7, 1); }
    stem(BR[0].P, grow2, 12, 5);
    leaf(...LV.b1, IM_MOD.b1, popk(t, tB - .1, .6), { fire: .7 * env(t, tB, cut, .3, .3) }); leaf(...LV.b2, IM_MOD.c1, popk(t, tF - .1, .6), { fire: .7 * env(t, tF, cut, .3, .3) }); leaf(870, 655, 130, 2.4, IM_MOD.b2, popk(t, tB + .3, .6));
    pop();
    pop();
    // the snip: Clawd beside the plant with long loppers
    const open = t < cut - .5 ? .2 : t < cut ? 1 - .8 * seg(t, cut - .5, cut - .1) + .8 * seg(t, cut - .5, cut - .3) : seg(t, cut, cut + .1) * .3;
    tourist(1090, GROUND, 10, 'safari', { ...emotions(t, [[a, 'thinking'], [tB, 'suspicious'], [cut - .5, 'determined'], [cut + .3, 'proud'], [tStay, 'happy']]), view: 'q', flip: false, aR: lerp(.2, .49, ease(seg(t, tB, cut - .6))), armR: loppers(open), boilKey: 'c6c3' });
    if (t > cut && t < cut + .7) sfx('snip!', 1420, 690, 54, RED, t - cut, { face: 'hand' });
    camEnd();
    plateTitle('Fig. VII', 960, 130, seg(lt, .5, 1.1), 60);
    caption('the old network', 480, 220, seg(lt, .7, 1.5), 50, INK); caption('the modern network', 1440, 220, seg(lt, .9, 1.7), 50, INK);
    caption('…and let them go', 1440, 300, seg(t, tGo, tGo + .8), 44, RED);
  }

  // ---------- 3 · Fig. VIII: recursive generalization, a gold path from the root to every branch ----------
  function pathAlong(P, k, sw, col) { if (k <= 0) return null; const C = through(P, 10), n = Math.max(2, Math.round(C.length * clamp(k))), Q = C.slice(0, n); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = rgba(GOLDLT, .5); ctx.lineWidth = sw * 2.6; ctx.beginPath(); Q.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = sw; ctx.setLineDash([sw * 2.4, sw * 1.4]); ctx.lineDashOffset = -T * 40; ctx.stroke(); ctx.restore(); const p = Q[Q.length - 1]; if (k < 1) glow(p[0], p[1], 40, GOLDLT, .9); return p; }
  const ROUTES = [
    [[960, 930], [954, 840], [966, 740], [956, 640], [962, 540], [960, 300]],          // up to the flowers
    [[958, 700], [860, 650], [760, 610], [640, 560], [500, 470]],                        // balls
    [[962, 620], [1060, 580], [1180, 540], [1300, 500], [1440, 430]],                   // dogs
    [[760, 612], [640, 680], [520, 730], [440, 740], [280, 750]],                        // fruit
    [[1180, 542], [1290, 610], [1400, 680], [1500, 700], [1660, 712]],                  // broccoli
  ];
  function name(t, lt, dur) {
    const a = cs('gr_name'), e = ce('gr_name'), tRec = wt('gr_name', 'recursive'), tGen = wt('gr_name', 'generalizes'), tSpr = wt('gr_name', 'sprouts'), tEach = wt('gr_name', 'each'), tLast = wt('gr_name', 'last');
    const tEv = wt('gr_name', 'Every'), tOwn = wt('gr_name', 'own'), tFol = wt('gr_name', 'follow');
    const dx = slide(t, lt, compare, ce('gr_compare') + .3);
    cam(t, [[a - .4, 960, 560, .97], [tGen, 960, 520, 1.02], [tSpr, 960, 560, .97], [tEv, 960, 560, .95], [e + 1, 960, 570, .93]], dx);
    plateFrame(); soil();
    const fire = { a: .7 * env(t, tEv, tEv + 1.2, .2, .5), b: .7 * env(t, tEv + .3, tEv + 1.5, .2, .5), d: .7 * env(t, tEv + .6, tEv + 1.8, .2, .5), c: .7 * env(t, tEv + .9, tEv + 2.1, .2, .5), e: .7 * env(t, tEv + 1.2, tEv + 2.4, .2, .5) };
    plant(t, { ...FULL, fire, lab: { a: 1, b: 1, c: 1, d: 1, e: 1 } });
    labels(t, { lab: { a: 1, b: 1, c: 1, d: 1, e: 1 } });
    // the painted path, branch by branch, each near the last
    pathAlong(ROUTES[0], seg(t, tGen - .3, tGen + 1.6), 7, GOLD);
    pathAlong(ROUTES[1], seg(t, tSpr - .2, tSpr + 1.1), 7, GOLD); pathAlong(ROUTES[2], seg(t, tSpr, tSpr + 1.3), 7, GOLD);
    pathAlong(ROUTES[3], seg(t, tEach - .1, tLast), 7, GOLD); pathAlong(ROUTES[4], seg(t, tEach + .2, tLast + .3), 7, GOLD);
    // a spark that follows the path from the root to every tip
    if (t > tFol - .9) { const u = frac((t - tFol + .9) / 2.4); for (let r = 0; r < 5; r++) { const C = through(r ? [ROUTES[0][0], ROUTES[0][2], ...ROUTES[r]] : ROUTES[0], 10), p = C[Math.min(C.length - 1, Math.floor(u * C.length))]; glow(p[0], p[1], 46, GOLDLT, 1); dot(p[0], p[1], 7, '#FFF6D0'); } }
    // Clawd follows the path with his eyes, then with his whole body
    const st = stroll(t, tFol - .6, tFol + 1.8, 1740, 1240, 9);
    tourist(st.x, GROUND, 9, 'safari', { ...emotions(t, [[a, 'thinking'], [tRec + .3, 'idea'], [tEv, 'happy'], [tFol - .6, 'determined']]), view: st.view === 'front' ? 'q' : st.view, flip: true, walk: t > tFol - .6 && t < tFol + 1.8 ? st.walk : undefined, dy: st.dy, lookY: -.6, lookX: -.5, boilKey: 'c6c4' });
    camEnd();
    plateTitle('Fig. VIII', 960, 120, seg(lt, .5, 1.1), 52);
    const kt = seg(t, tRec - .2, tRec + 1);
    if (kt > 0) { letter('recursive generalization', 960, 200, 76, '#B07A18', { face: 'marker', shadow: false, reveal: kt }); }
    caption('every branch makes sense on its own', 960, 1012, seg(t, tEv - .1, tOwn + .3), 44, INK);
  }

  // ---------- 4 · Fig. IX: language too, a vine of word-leaves ----------
  // a leaf with a word written on it; parts = [[text, gold?], ...]
  function wordLeaf(x, y, L, a, parts, k, o = {}) {
    if (k <= .01) return;
    const size = o.size || 52;
    leaf(x, y, L, a, null, k, { wr: .36, fire: o.fire || 0, draw: (cx, cy, LL) => {
      ctx.fillStyle = '#E3E8C2'; ctx.fillRect(cx - LL, cy - LL, LL * 2, LL * 2);
      ctx.save(); ctx.font = `italic 700 ${size * LL / L}px ${SERIF}`; ctx.textBaseline = 'middle'; ctx.translate(cx, cy); ctx.rotate(a * .5); ctx.translate(-cx, -cy); const ws = parts.map(p => ctx.measureText(p[0]).width), tot = ws.reduce((s, w) => s + w, 0); let xx = cx - tot / 2;
      parts.forEach(([s, g], i) => { if (g) { ctx.fillStyle = rgba(GOLDLT, .85); ctx.fillRect(xx - 2, cy - size * .42, ws[i] + 4, size * .84); } ctx.fillStyle = g ? RED : INK; ctx.fillText(s, xx, cy + 2); xx += ws[i]; }); ctx.restore();
    } });
  }
  const VINE = [[300, 930], [320, 820], [400, 730], [520, 660], [650, 610], [820, 625], [1000, 665], [1150, 640], [1280, 585], [1350, 545]];
  function iy(t, lt, dur) {
    const a = cs('gr_iy'), e = ce('gr_iy'), tLang = wt('gr_iy', 'language'), tLet = wt('gr_iy', 'letters'), tMiy = wt('gr_iy', 'Miyazaki'), tD = wt('gr_iy', 'D'), tDo = wt('gr_iy', 'do'), tYour = wt('gr_iy', 'yourself'), tCon = wt('gr_iy', 'contain'), tAll = wt('gr_iy', 'all');
    const dx = slide(t, lt, name, ce('gr_name') + .3);
    cam(t, [[a - .4, 760, 600, 1.05], [tMiy, 760, 560, 1.05], [tD, 960, 560, 1], [tDo, 1180, 540, 1.05], [tCon, 1330, 520, 1.15], [e + 1, 1200, 540, 1.05]], dx);
    plateFrame(); soil(300, 150);
    const vk = .2 * ease(seg(t, a, tLet)) + .3 * ease(seg(t, tLet, tMiy)) + .2 * ease(seg(t, tMiy, tD)) + .3 * ease(seg(t, tD + .3, tDo + .2));
    roots(300, 1);
    stem(VINE, vk, 14, 6);
    tendril(520, 660, -1.9, 40, seg(t, tMiy - .2, tMiy + .8), 1); tendril(1020, 660, 1.4, 40, seg(t, tD, tD + 1), -1);
    wordLeaf(400, 730, 240, -.55, [['iy', 1]], popk(t, tLet + .2, .6), { size: 72, fire: .8 * env(t, tLet + .2, tMiy + .5, .3, .5) });
    wordLeaf(650, 610, 380, -.32, [['M', 0], ['iy', 1], ['azaki', 0]], popk(t, tMiy - .2, .6), { size: 58, fire: .8 * env(t, tMiy - .2, tD + .3, .3, .5) });
    wordLeaf(1000, 665, 260, .38, [['d', 0], ['iy', 1]], popk(t, tD - .2, .6), { size: 70, fire: .8 * env(t, tD - .2, tDo + .3, .3, .5) });
    wordLeaf(1280, 585, 500, -.28, [['do it yourself', 0]], popk(t, tDo, .7), { size: 54, fire: .8 * env(t, tDo, e + 2, .3, .5) });
    // Clawd checks the last leaf with a magnifying glass: no "iy" in it
    const mg = seg(t, tYour + .1, tCon + .1), shrug = t > tAll - .2;
    const mx = lerp(1720, 1440, ease(mg)) + (mg >= 1 && !shrug ? 90 * Math.sin((t - tCon) * 2.6) : 0), my = lerp(560, 490, ease(mg));
    if (t > tYour) {
      ctx.save(); ctx.strokeStyle = '#6A4B30'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(mx + 50, my + 56); ctx.lineTo(1680, 862); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, 76, 0, TAU); ctx.fillStyle = 'rgba(220,240,255,.25)'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = '#8C6A3A'; ctx.stroke(); ctx.restore();
    }
    tourist(1740, GROUND, 10, 'safari', { ...emotions(t, [[a, 'neutral'], [tMiy, 'happy'], [tYour, 'thinking'], [tAll - .2, 'confused']]), view: 'q', flip: true, aR: t > tYour && !shrug ? .9 : undefined, boilKey: 'c6c5' });
    camEnd();
    plateTitle('Fig. IX · Neuronium verbale', 960, 120, seg(lt, .5, 1.3), 56);
    caption('it happens in language too', 960, 200, seg(t, tLang - .3, tLang + .6) * (1 - seg(t, tMiy + .5, tMiy + 1)), 46, INK);
    if (t > tCon - .1) letter('no "iy" at all!', 1480, 300, 60, RED, { face: 'marker', shadow: false, pop: clamp((t - tCon + .1) * 2.2) });
  }

  // ---------- 5 · Figs. X & XI: weird, but never random ----------
  // a stone leaf: strata and a crystal, painted inside the leaf
  const strata = (cx, cy, LL, B) => { const cols = ['#B49A78', '#8C7A64', '#C9B08C', '#7A6A58', '#A88A6A']; for (let i = 0; i < 9; i++) { ctx.fillStyle = cols[i % 5]; ctx.beginPath(); ctx.moveTo(B.x0 - 20, B.y0 + i * B.h / 8); for (let j = 0; j <= 8; j++) ctx.lineTo(B.x0 + j * B.w / 8, B.y0 + i * B.h / 8 + Math.sin(j * 1.3 + i) * 8); ctx.lineTo(B.x1 + 20, B.y1 + 40); ctx.lineTo(B.x0 - 20, B.y1 + 40); ctx.closePath(); ctx.fill(); } flat([[cx - 14, cy + 20], [cx - 4, cy - 26], [cx + 14, cy - 18], [cx + 18, cy + 18]], '#C9D9E9', { line: INK, lw: 1.2 }); };
  const thorny = (cx, cy, LL, B) => { ctx.fillStyle = '#5A3A3A'; ctx.fillRect(B.x0, B.y0, B.w, B.h); ctx.save(); ctx.strokeStyle = '#E9D9C0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(cx - 26 * sd, cy + 26); ctx.lineTo(cx + 26 * sd, cy - 26); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + 14 * sd, cy - 30); ctx.lineTo(cx + 34 * sd, cy - 10); ctx.stroke(); } ctx.restore(); };
  const codeLeaf = (cx, cy, LL, B) => { ctx.fillStyle = '#1E2A3A'; ctx.fillRect(B.x0, B.y0, B.w, B.h); const C = ['#9FE3C8', '#FFD36B', '#8EC3E6', '#E9A0B8']; for (let i = 0; i < 9; i++) { ctx.fillStyle = C[i % 4]; ctx.fillRect(cx - LL * .32 + (i % 3) * 10, cy - LL * .2 + i * 11, 30 + hash(i * 3) * 70, 5); } ctx.save(); ctx.beginPath(); ctx.arc(cx + LL * .18, cy - 4, 30, 0, TAU); ctx.fillStyle = '#3A7AB8'; ctx.fill(); ctx.fillStyle = '#6AAA5A'; ctx.beginPath(); ctx.ellipse(cx + LL * .18 - 8, cy - 12, 12, 8, .4, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx + LL * .18 + 10, cy + 10, 9, 6, -.3, 0, TAU); ctx.fill(); ctx.strokeStyle = '#E9F2FF'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx + LL * .18, cy - 4, 30, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.ellipse(cx + LL * .18, cy - 4, 12, 30, 0, 0, TAU); ctx.stroke(); ctx.restore(); };
  const poemLeaf = (cx, cy, LL, B) => { ctx.fillStyle = '#F3E6CC'; ctx.fillRect(B.x0, B.y0, B.w, B.h); ctx.save(); ctx.fillStyle = '#4A2A2A'; ctx.font = `italic 700 ${LL * .085}px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ['Мои враги,', 'о, мои враги…'].forEach((s, i) => ctx.fillText(s, cx + LL * .04, cy - LL * .05 + i * LL * .11)); ctx.restore(); };
  function minorPlant(t, ox, s, leaves, branch, odd) {
    push(); translate(ox, GROUND); scale(s); translate(-960, -GROUND);
    soil(960, 200); roots(960, 1);
    stem([[960, 930], [956, 820], [966, 700], [960, 560]], 1, 20, 9);
    leaves.forEach(([x, y, L, a, dr], i) => leaf(x, y, L, a, null, 1, { draw: dr, wr: .32 }));
    if (branch.k > 0) stem(branch.P, branch.k, 10, 5);
    if (odd.k > 0) leaf(odd.x, odd.y, odd.L, odd.a, null, odd.k, { draw: odd.draw, wr: .36, fire: odd.fire });
    pop();
  }
  function geology(t, lt, dur) {
    const a = cs('gr_geology'), e = ce('gr_geology'), tGeo = wt('gr_geology', 'geology'), tBr = wt('gr_geology', 'branch'), tCes = wt('gr_geology', 'Cesium'), tMaps = wt('gr_geology', 'maps');
    const tEn = wt('gr_geology', 'enemy'), tRus = wt('gr_geology', 'Russian'), tPoem = wt('gr_geology', 'poem'), tWeird = wt('gr_geology', 'Weird'), tRand = wt('gr_geology', 'random');
    const dx = slide(t, lt, iy, ce('gr_iy') + .3);
    cam(t, [[a - .4, 560, 580, 1.15], [tCes, 680, 560, 1.12], [tEn - .3, 1350, 560, 1.12], [tPoem, 1420, 560, 1.12], [tWeird, 960, 560, .98], [e + 2, 960, 560, .96]], dx);
    plateFrame();
    const geoL = [[960, 562, 210, -Math.PI / 2, strata], [954, 640, 180, -2.6, strata], [966, 700, 180, -.5, strata], [956, 780, 150, 2.8, strata]];
    minorPlant(t, 480, .78, geoL, { P: [[962, 760], [1060, 720], [1150, 650], [1220, 600]], k: ease(seg(t, tBr - .3, tCes)) }, { x: 1220, y: 600, L: 330, a: -.55, k: popk(t, tCes - .1, .7), draw: codeLeaf, fire: .9 * env(t, tCes, tMaps + 1.5, .3, .5) });
    const enL = [[960, 562, 210, -Math.PI / 2, thorny], [954, 640, 180, -2.6, thorny], [966, 700, 180, -.5, thorny], [956, 780, 150, 2.8, thorny]];
    minorPlant(t, 1440, .78, enL.map(l => l.slice()), { P: [[958, 760], [860, 720], [770, 650], [700, 600]], k: ease(seg(t, tRus - .5, tPoem)) }, { x: 700, y: 600, L: 360, a: -2.6, k: popk(t, tPoem - .1, .7), draw: poemLeaf, fire: .9 * env(t, tPoem, e + 2, .3, .5) });
    // the odd branches, named on the plate
    if (t > tCes - .1) { letter('Cesium', 620, 380, 58, RED, { face: 'marker', shadow: false, pop: clamp((t - tCes + .1) * 2.4) }); caption('code for maps of the earth', 620, 445, seg(t, tCes + .4, tMaps + .6), 44, INK); }
    if (t > tPoem - .1) { letter('стихи о врагах', 1300, 380, 52, RED, { face: SERIF, shadow: false, pop: clamp((t - tPoem + .1) * 2.4) }); caption('a Russian poem about enemies', 1300, 445, seg(t, tPoem + .2, tPoem + 1), 44, INK); }
    // Clawd between the two specimens, in a geologist's hard hat for the occasion
    tourist(960, GROUND, 9, 'hard', { ...emotions(t, [[a, 'neutral'], [tCes, 'surprised'], [tEn, 'scared'], [tWeird, 'happy']]), view: 'q', flip: t > tEn - .4, boilKey: 'c6c6' });
    camEnd();
    plateTitle('Fig. X · geologicum', 480, 128, seg(lt, .5, 1.2), 50); plateTitle('Fig. XI · inimicum', 1440, 128, seg(t, tEn - .5, tEn + .4), 50);
    const kw = 1 - seg(t, tWeird - .5, tWeird - .1); caption('geology', 480, 205, seg(t, tGeo - .2, tGeo + .5) * kw, 46, INK); caption('enemies', 1440, 205, seg(t, tEn - .2, tEn + .5) * kw, 46, INK);
    
    stamp('WEIRD, BUT NEVER RANDOM', 960, 240, tWeird - .1, t, { col: RED, size: 76, rot: -.06 });
  }

  // ---------- 6 · Specimen No. 1 is potted and wheeled off the plate (to the game show) ----------
  function trolley(x, y, w, spin) {
    flat(rrPts(x - w / 2, y - 26, w, 22, 6), '#8C6A48', { line: INK, lw: 2 });
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - w / 2 + 10, y - 20); ctx.lineTo(x - w / 2 - 40, y - 110); ctx.lineTo(x - w / 2 - 70, y - 110); ctx.stroke(); ctx.restore();
    for (const wx of [x - w / 2 + 40, x + w / 2 - 40]) { flat(ellPts(wx, y + 8, 22, 22, 18), '#4A3A2A', { line: INK, lw: 2 }); ctx.save(); ctx.strokeStyle = '#C9B48E'; ctx.lineWidth = 2.5; for (let i = 0; i < 3; i++) { const q = spin + i * TAU / 3; ctx.beginPath(); ctx.moveTo(wx, y + 8); ctx.lineTo(wx + Math.cos(q) * 18, y + 8 + Math.sin(q) * 18); ctx.stroke(); } ctx.restore(); }
  }
  function pot(x, y, k) {
    if (k <= 0) return; push(); translate(x, y); scale(1, backOut(k));
    flat([[-150, -150], [150, -150], [118, 0], [-118, 0]], '#C46A3E', { line: INK, lw: 2.5 }); flat(rrPts(-166, -176, 332, 40, 8), '#D27A4A', { line: INK, lw: 2.5 });
    ctx.save(); ctx.strokeStyle = 'rgba(80,30,10,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-100 + i * 50, -130); ctx.lineTo(-90 + i * 46, -10); ctx.stroke(); } ctx.restore();
    pop();
  }
  function wheel(t, lt, dur) {
    const a = ce('gr_geology'), go = a + .8, tag = a + .4, LIFT = 110;
    const dx = slide(t, lt, geology, ce('gr_geology') - .1);
    cam(t, [[a, 960, 560, .9], [go + 2, 1060, 560, .88], [go + 5, 1200, 560, .88]], dx);
    plateFrame();
    const mv = 520 * easeIn(seg(t, go, go + 2.4)) + 380 * Math.max(0, t - go - 2.4), X = 960 + mv, bob = t > go ? 3 * Math.abs(Math.sin(t * 9)) : 0;
    push(); translate(X, GROUND - LIFT - bob); scale(.72); translate(-960, -GROUND);
    plant(t, { ...FULL, fire: { a: .3, b: .3, c: .3, d: .3, e: .3 } });
    pop();
    // the pot rises up around the roots, a trolley under it
    const pk = popk(t, a + .05, .5), PY = GROUND - LIFT + 120;
    trolley(X, PY + 60 - bob, 460, mv / 22);
    pot(X, PY - bob, pk);
    // the shipping tag: specimen no. 1
    if (t > tag) { const sw = Math.sin(t * 4) * .15 * Math.exp(-(t - tag)), k = popk(t, tag, .4); push(); translate(X - 130, PY - 150 - bob); rotate(.3 + sw); scale(backOut(k)); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-30, 50); ctx.stroke(); ctx.restore(); flat([[-90, 50], [30, 50], [30, 120], [-90, 120], [-110, 85]], '#F6EEDA', { line: INK, lw: 2 }); serif('No. 1', -36, 86, 38, RED, { bold: true }); pop(); }
    // Clawd pushes it off the plate, toward the stage
    tourist(X - 330, GROUND - LIFT + 180, 10, 'safari', { ...emotions(t, [[a, 'proud'], [go - .2, 'determined']]), view: 'side', flip: false, walk: t > go ? (t - go) * 2.4 : undefined, aL: .1, rot: t > go ? .12 : 0, boilKey: 'c6c7' });
    camEnd();
    plateTitle('Specimen No. 1', 960, 128, seg(lt, .4, 1.2), 56);
    caption('next stop: the stage', 960, 205, seg(t, go, go + 1), 44, INK);
  }

  shots([[chapStart('ch06'), grow], [cs('gr_compare') - .4, compare], [cs('gr_name') - .4, name], [cs('gr_iy') - .4, iy], [cs('gr_geology') - .4, geology], [ce('gr_geology'), wheel]]);
})();
