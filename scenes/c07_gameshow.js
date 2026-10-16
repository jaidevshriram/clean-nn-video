// ch07 Two explanations · world: a RETRO TV GAME SHOW, "WHICH ONE IS IT?!".
// Contestant #1 (the potted neuron plant from the botanical plate) at the GENERALIZATION podium vs the Knot in a party
// hat at SUPERPOSITION. Round 1: who shares, neighbours or strangers (a flip board), then 32 things sorted into jars.
// Round 2: THE PRESS crushes 480 curve detectors to 10 (clean, just coarser; the Unfolding Machine finds no hidden
// curves), then the horizon layer 1024 to 13 (a broader brush). Round 3: prize doors for models 300x apart in size.
// Final round: the machine's pieces match single neurons (88%). Scores tally in a TV bug; Clawd waves an APPLAUSE
// sign in the front row. End: the Knot, losing, bolts off the stage into the dark (it runs into the next world's woods).
(() => {
  // labels on set pieces fade out when the camera pushes in far enough to crop them (never drawn half-cut)
  function edgeA(x, y, w, h) {
    const M = ctx.getTransform(), P = [[x - w / 2, y - h / 2], [x + w / 2, y + h / 2]].map(([px, py]) => [M.a * px + M.c * py + M.e, M.b * px + M.d * py + M.f]);
    const L = Math.min(P[0][0], P[1][0]), R = Math.max(P[0][0], P[1][0]), U = Math.min(P[0][1], P[1][1]), D = Math.max(P[0][1], P[1][1]);
    return clamp((Math.min(L, W - R, U, H - D) - 12) / 24);
  }
  function fadeTxt(s, x, y, size, col, o = {}) {
    ctx.save(); ctx.font = `${o.weight || '900'} ${size}px ${o.font || 'sans-serif'}`; const w = ctx.measureText(s).width; ctx.restore();
    const a = edgeA(x, y, w, size * 1.1); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; txt(s, x, y, size, col, o); ctx.restore();
  }
  // machine() letters its 'SAE' plate in its own local units; place it on the plate through the current transform
  function machineL(t, x, y, s, o) {
    const n = LETTERS.length, M = ctx.getTransform(), C0 = CAM, a = ctx.globalAlpha; CAM = null; machine(t, x, y, s, o); CAM = C0;
    for (let i = n; i < LETTERS.length; i++) { const L = LETTERS[i]; if (L.txt !== 'SAE') continue; const lx = x + L.x * s, ly = y + L.y * s; L.x = M.a * lx + M.c * ly + M.e; L.y = M.b * lx + M.d * ly + M.f; L.size *= s * Math.hypot(M.a, M.b); L.rot = (L.rot || 0) + Math.atan2(M.b, M.a); L.alpha = (L.alpha ?? 1) * a; L.screen = true; }
  }
  const R = 'blog/raw/', V = R + 'v-figure-10x/', RM = R + 'roadmap/', C3 = R + 'crushed-3b-v3/', CE = R + 'crushed-3b/examples/', CL = R + 'crushed-last-layer/images/';
  const TV = R + 'tiny-vehicles/', CP = R + 'car-path-distinctions/', NP = R + 'negative-poles-v2/', NO = R + 'neuron-overflow/';
  const GX = 330, SX = 1590, FLOOR = 820;
  const GOLD = '#E8AA38', GOLDLT = '#FFD36B', VIO = '#B45CA8', VIOLT = '#E9B0E0', CREAM = '#FFF6D0', RED = '#B0203A', DARK = '#1A0A2A', SERIF = '"Liberation Serif"';
  const FLOPPY = [RM + 'ear-large-hanging', V + 'c5a317c', RM + 'ear-medium-head-side', V + 'n750219', RM + 'ear-small-general-dog', V + 'p10704'];
  const CURVES = ['324', '330', '340', '342', '343', '349', '379', '385', '388', '406'].map(n => C3 + 'curve-' + n);
  const SQ = Array.from({ length: 10 }, (_, i) => C3 + 'sq-' + i);
  const HZ = Array.from({ length: 13 }, (_, i) => CL + `n${String(i).padStart(2, '0')}_positive_00`);

  // ---------- timing helpers ----------
  const AW = () => [wt('te_result', 'none') + .3, wt('te_last', 'brush') + .2, wt('te_sizes', 'scrambled') + .2, wt('te_dict', 'activity') + .2];
  const genScore = t => { let s = 0; for (const a of AW()) s += 100 * ease(seg(t, a, a + .7)); return Math.round(s); };
  const knotSize = t => { let s = 112; for (const a of AW()) s -= 7 * ease(seg(t, a, a + .5)); return s; };

  // ---------- the set ----------
  function stageBG() {
    layer('c7stage', () => {
      ctx.fillStyle = lgrad(0, -300, 0, H, [[0, '#1E0628'], [.5, '#3A0E44'], [1, '#5A1A4A']]); ctx.fillRect(-500, -300, W + 1000, H + 600);
      // a retro sunburst on the back wall
      ctx.save(); ctx.globalAlpha = .12; for (let i = 0; i < 24; i++) { const a0 = i / 24 * TAU, a1 = a0 + TAU / 48; ctx.fillStyle = i % 2 ? '#FFB0E0' : '#FFD36B'; ctx.beginPath(); ctx.moveTo(960, 520); ctx.lineTo(960 + Math.cos(a0) * 1800, 520 + Math.sin(a0) * 1800); ctx.lineTo(960 + Math.cos(a1) * 1800, 520 + Math.sin(a1) * 1800); ctx.closePath(); ctx.fill(); } ctx.restore();
      // a row of light panels along the back wall
      for (let i = 0; i < 9; i++) flat(rrPts(330 + i * 140, 640, 100, 150, 14), '#4A1A5A', { line: '#2A0A30', lw: 3 });
      // curtains, deep folds, with a pelmet
      for (const sd of [0, 1]) for (let i = 0; i < 9; i++) { const x = sd ? W - 300 + i * 44 : -96 + i * 44; flat(rectPts(x, -300, 48, H + 600), '#9A1A34', { grad: [[0, '#C0283E'], [.5, '#8A1428'], [1, '#5A0A1C']], gdir: [x, 0, x + 48, 0] }); }
      flat([[-500, -300], [W + 500, -300], [W + 500, 20], [W - 300, 40], [W - 300, 30], [300, 30], [300, 40], [-500, 20]], '#7A1026', { line: '#3A0A14', lw: 3 });
      for (let i = 0; i < 30; i++) dot(-200 + i * 80, 30, 9, '#F0BE46');
      // the stage floor: glossy boards with a lit front edge
      flat([[200, FLOOR], [1720, FLOOR], [2200, 1300], [-280, 1300]], '#3A2A4A', { grad: [[0, '#4A3460'], [1, '#22162E']], gdir: [0, FLOOR, 0, 1080] });
      ctx.save(); ctx.strokeStyle = 'rgba(255,220,255,.08)'; ctx.lineWidth = 2; for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(960 + i * 95, FLOOR); ctx.lineTo(960 + i * 170, 1300); ctx.stroke(); } ctx.restore();
      ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#FFE9B8'; ctx.beginPath(); ctx.ellipse(960, 900, 640, 60, 0, 0, TAU); ctx.fill(); ctx.restore();
    }, { variants: 1, x: -500, y: -300, w: W + 1000, h: H + 600 });
  }
  // spotlight beams from the rig onto targets [[x, y, col, a], ...]
  function beams(t, targets) {
    for (const [x, y, col, a] of targets) { const sx = x + 120 * Math.sin(t * .4 + x), w = 50, ww = 260; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .16 * (a ?? 1); ctx.fillStyle = col || '#FFF6D0'; ctx.beginPath(); ctx.moveTo(sx - w / 2, -300); ctx.lineTo(sx + w / 2, -300); ctx.lineTo(x + ww, y); ctx.lineTo(x - ww, y); ctx.closePath(); ctx.fill(); ctx.globalAlpha = .22 * (a ?? 1); ctx.beginPath(); ctx.ellipse(x, y, ww, 46, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  }
  // the marquee with chasing bulbs; y0 = its top (drops in from above)
  function marquee(t, y0, txtS = 'WHICH ONE IS IT?!') {
    if (y0 < -260) return;
    ctx.save(); ctx.strokeStyle = '#2A0A30'; ctx.lineWidth = 4; for (const x of [560, 1360]) { ctx.beginPath(); ctx.moveTo(x, -300); ctx.lineTo(x, y0); ctx.stroke(); } ctx.restore();
    flat(rrPts(460, y0, 1000, 170, 30), '#F0BE46', { line: '#3A1A0A', lw: 6, shadow: [8, 10, 'rgba(0,0,0,.35)'] });
    txt(txtS, 960, y0 + 87, 84, RED, { font: 'serif', stroke: CREAM, sw: 8 });
    for (let i = 0; i < 26; i++) { const u = i / 26, x = 470 + u * 980; dot(x, y0 + 10, 9, Math.floor(t * 6 + i) % 2 ? CREAM : '#C98A2A'); dot(x, y0 + 162, 9, Math.floor(t * 6 + i + 1) % 2 ? CREAM : '#C98A2A'); }
  }
  function podium(t, x, col, label, score, o = {}) {
    flat([[x - 190, FLOOR], [x + 190, FLOOR], [x + 160, 560], [x - 160, 560]], col, { line: DARK, lw: 5, shadow: [10, 10, 'rgba(0,0,0,.4)'] });
    flat([[x - 160, 560], [x + 160, 560], [x + 166, 578], [x - 166, 578]], mixCol(col, '#FFFFFF', .35), { line: DARK, lw: 3 });
    flat(rrPts(x - 130, 600, 260, 84, 10), DARK, { line: '#000000', lw: 3 });
    fadeTxt(String(score), x, 644, 62, o.buzz ? '#FF3B30' : '#FF8A3A', { font: 'monospace' });
    fadeTxt(label, x, 740, label.length > 12 ? 34 : 40, CREAM, { font: SERIF, weight: '700' });
    for (let i = 0; i < 8; i++) dot(x - 150 + i * 43, 800, 6, (Math.floor(t * 4) + i) % 2 && o.lit ? '#FFF6D0' : mixCol(col, '#000000', .3));
    if (o.buzz > 0) { ctx.save(); ctx.globalAlpha = o.buzz; ctx.strokeStyle = '#FF3B30'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 70, 610); ctx.lineTo(x + 70, 690); ctx.moveTo(x + 70, 610); ctx.lineTo(x - 70, 690); ctx.stroke(); ctx.restore(); }
  }
  // the score bug (a TV corner graphic), screen space
  function scoreBug(t, k) {
    if (k <= 0) return; const x = lerp(W + 40, 1500, easeOut(k)), y = 60, g = genScore(t);
    flat(rrPts(x, y, 380, 112, 14), '#2A0A3A', { line: '#F0BE46', lw: 4, shadow: [6, 8, 'rgba(0,0,0,.45)'] });
    flat(rrPts(x + 10, y + 10, 190, 92, 8), GOLD); flat(rrPts(x + 205, y + 10, 165, 92, 8), VIO);
    txt('GENERALIZATION', x + 105, y + 28, 21, DARK, { font: SERIF, weight: '700' }); txt('SUPERPOS.', x + 287, y + 28, 21, CREAM, { font: SERIF, weight: '700' });
    txt(String(g), x + 105, y + 72, 52, DARK, { font: 'monospace' }); txt('0', x + 287, y + 72, 52, CREAM, { font: 'monospace' });
    const pop = AW().reduce((s, a) => s + Math.exp(-6 * Math.max(0, t - a)) * (t > a ? 1 : 0), 0); if (pop > .05) glow(x + 105, y + 60, 160 * pop, GOLDLT, pop);
  }
  // a broadcast lower third
  function lower(t, a, b, s, col = GOLD, o = {}) {
    const k = env(t, a, b, .35, .3); if (k <= 0) return;
    const x = lerp(-900, 0, easeOut(seg(t, a, a + .45))), y = o.y ?? 900, w = o.w ?? Math.max(700, s.length * 34 + 160);
    ctx.save(); ctx.globalAlpha = k; flat([[x + 120, y - 58], [x + 120 + w, y - 58], [x + 80 + w, y + 58], [x + 80, y + 58]], DARK, { shadow: [8, 8, 'rgba(0,0,0,.4)'] }); flat([[x + 80, y - 58], [x + 140, y - 58], [x + 100, y + 58], [x + 40, y + 58]], col); ctx.restore();
    letter(s, x + 180, y + 2, o.size || 60, CREAM, { face: 'marker', shadow: false, align: 'left', alpha: k, screen: true });
  }
  // round card: a starburst banner swooping in (screen space)
  function roundCard(t, a, s1, s2) {
    const k = seg(t, a, a + 1.9); if (k <= 0 || k >= 1) return;
    const kin = easeOut(seg(k, 0, .25)), kout = easeIn(seg(k, .78, 1)), x = lerp(-1200, 960, kin) + lerp(0, 2200, kout), sp = (t - a) * .5;
    ctx.save(); ctx.translate(x, 540); ctx.rotate(-.06);
    flat(starPts(0, 0, 330, .72, 16, sp), '#F0BE46', { line: '#3A1A0A', lw: 6, shadow: [10, 12, 'rgba(0,0,0,.4)'] });
    ctx.restore();
    letter(s1, x, 500, 104, RED, { face: 'marker', shadow: false, stroke: CREAM, strokeW: .1, rot: -.06, screen: true });
    letter(s2, x, 600, 60, DARK, { face: 'marker', shadow: false, rot: -.06, screen: true });
  }
  // the audience: front-row silhouettes that bob; cheer 0..1 raises arms
  function audience(t, cheer = 0) {
    for (let i = 0; i < 24; i++) {
      const x = -60 + i * 88, row = i % 2, y = 1050 + row * 22 + (cheer > 0 ? -18 * cheer * Math.abs(Math.sin(t * 7 + i)) : -3 * Math.abs(Math.sin(t * 1.5 + i)));
      if (Math.abs(x - 960) < 70) continue;
      if (cheer > .2) { ctx.save(); ctx.strokeStyle = '#140818'; ctx.lineWidth = 14; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sd * 30, y - 20); ctx.lineTo(x + sd * (40 + 10 * Math.sin(t * 9 + i)), y - 20 - 70 * cheer); ctx.stroke(); } ctx.restore(); }
      dot(x, y - 60, 30, '#140818'); flat(rrPts(x - 40, y - 34, 80, 90, 30), '#140818');
    }
  }
  // Clawd in the front row with his APPLAUSE sign; up 0..1 raises it
  const sign = up => (u, sw) => { ctx.save(); ctx.rotate(-.1 + .1 * Math.sin(T * 8) * up); ctx.strokeStyle = '#6A4B30'; ctx.lineWidth = u * .5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(u * 7, 0); ctx.stroke(); ctx.translate(u * 9.5, 0); ctx.rotate(Math.PI / 2); flat(rrPts(-u * 7, -u * 2.2, u * 14, u * 4.4, u * .6), up > .5 ? '#FFE9A0' : '#F6EEDA', { line: DARK, lw: 2.5 }); if (up > 0) txt('APPLAUSE', 0, 0, u * 2.2, RED, { font: SERIF, weight: '900' }); ctx.restore(); };   // (resting in his lap, face down)
  function clawdSeat(t, keys, up = 0) {
    if (up > .3) glow(960, 900, 120, GOLDLT, .4 * up);
    if (up < .15) { push(); translate(1030, 1070); rotate(-Math.PI / 2 + .2); sign(0)(8, 1); pop(); }
    tourist(960, 1066, 9, 'party', { ...emotions(t, keys), view: 'front', aR: lerp(-.4, 1.45, up), armR: up >= .15 ? sign(up) : undefined, boilKey: 'c7clawd' });
  }

  // ---------- contestants ----------
  // contestant #1: the potted neuron plant (same specimen as the botanical plate)
  const S0 = [[960, 930], [954, 840], [966, 740], [956, 640], [962, 540], [960, 470]];
  const BR = [[[958, 700], [860, 650], [760, 610], [640, 560]], [[760, 612], [640, 680], [520, 730], [440, 740]], [[962, 620], [1060, 580], [1180, 540], [1300, 500]], [[1180, 542], [1290, 610], [1400, 680], [1500, 700]]];
  const iv = (s, b, i) => NO + `iv1_${s}_${b}_${i}`;
  const LV = [[960, 482, 125, -Math.PI / 2, iv(30024, 0, 1)], [952, 522, 115, -2.45, iv(30024, 0, 2)], [968, 522, 115, -.69, iv(15012, 0, 1)], [640, 560, 220, -2.55, iv(30024, 1, 3)], [790, 622, 160, -1.85, iv(30024, 1, 5)], [440, 742, 200, 3.05, iv(30024, 2, 2)], [570, 712, 150, 2.1, iv(30024, 2, 3)], [1300, 500, 220, -.5, iv(30024, 3, 1)], [1140, 556, 160, -1.25, iv(30024, 3, 2)], [1500, 702, 210, .12, iv(30024, 4, 0)], [1360, 664, 150, 1.05, iv(30024, 4, 3)]];
  function leafAt(x, y, L, a, im, glowA = 0) {
    const ca = Math.cos(a), sa = Math.sin(a), P = []; for (let i = 0; i <= 14; i++) { const u = i / 14; P.push([u * L, -Math.pow(Math.sin(u * Math.PI), .75) * L * .3 * (1 - .3 * u)]); } for (let i = 13; i > 0; i--) { const u = i / 14; P.push([u * L, Math.pow(Math.sin(u * Math.PI), .75) * L * .3 * (1 - .3 * u)]); }
    const Q = P.map(([px, py]) => [x + px * ca - py * sa, y + px * sa + py * ca]), B = bbox(Q), path = pathOf(Q);
    if (glowA > 0) glow(B.cx, B.cy, L * .8, GOLDLT, glowA);
    ctx.save(); ctx.clip(path); const I = img(im), s = Math.min(I.width, I.height), d = Math.max(B.w, B.h); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, B.cx - d / 2, B.cy - d / 2, d, d); ctx.restore();
    ctx.save(); ctx.strokeStyle = '#2A3A1A'; ctx.lineWidth = 3; ctx.stroke(path); ctx.restore();
  }
  function plantC(t, x, y, s, o = {}) {
    push(); translate(x, y); rotate(.02 * Math.sin(t * 1.4) + (o.rot || 0)); scale(s, s * (1 + (o.sq || 0))); translate(-960, -930);
    const st = (P, w0, w1) => { const p = pathOf(taper(P, [w0, w1], 8)); fillPath(p, '#56743F', '#2E3E22', 2.4 / s); };
    BR.forEach((P, i) => st(P, i % 2 ? 8 : 12, 4)); st(S0, 22, 9);
    LV.forEach(([lx, ly, L, a, im], i) => leafAt(lx, ly, L, a + .05 * Math.sin(t * 1.6 + i), im, o.glow || 0));
    // the terracotta pot from the plate, with its "No. 1" tag
    flat([[810, 930], [1110, 930], [1080, 1060], [840, 1060]], '#C46A3E', { line: DARK, lw: 4 / s }); flat(rrPts(790, 905, 340, 44, 10), '#D27A4A', { line: DARK, lw: 4 / s });
    flat([[1110, 960], [1240, 960], [1240, 1030], [1110, 1030], [1090, 995]], '#F6EEDA', { line: DARK, lw: 3 / s }); fadeTxt('No. 1', 1170, 996, 40, RED, { font: SERIF, weight: '700' });
    pop();
  }
  function knotC(t, x, y, s, o = {}) {
    const bob = 8 * Math.sin(t * 3), sq = o.sq || 0;
    push(); translate(x, y + bob); scale(1 + sq * .5, 1 - sq); translate(-x, -y - bob);
    knotBeast(x, y + bob, s, { hat: 'party', grin: o.grin ?? true, look: o.look || [-.5, .1], col: '#C9A0D0', dark: '#6A4A7A', loose: o.loose || 0 });
    pop();
  }
  // the standard wide-shot dressing: beams, podiums, contestants
  function contestants(t, o = {}) {
    beams(t, [[GX, FLOOR, '#FFE9B8', o.genLit ?? 1], [SX, FLOOR, '#F0C0FF', o.supLit ?? 1]]);
    if (!o.noPlant) plantC(t, GX, 516, .32, { glow: o.plantGlow || 0, sq: o.plantSq || 0 });
    if (!o.noKnot) knotC(t, o.kx ?? SX, o.ky ?? 450, o.ks ?? knotSize(t), o.knot || {});
    podium(t, GX, GOLD, 'GENERALIZATION', genScore(t), { lit: o.genLit ?? 1 });
    podium(t, SX, VIO, 'SUPERPOSITION', 0, { lit: o.supLit ?? .4, buzz: o.buzz || 0 });
  }
  // a "neuron" tile: a lit window with a photo; flip 0..1 turns it over from its back
  function tile(x, y, w, h, im, flip = 1, o = {}) {
    const f = clamp(flip), sx = Math.abs(Math.cos(f * Math.PI)), back = f < .5;
    if (!back && o.lit > 0) glow(x, y, w * 1.1, o.glowCol || GOLDLT, o.lit);
    push(); translate(x, y); scale(Math.max(.02, sx) * (o.s ?? 1), o.s ?? 1);
    flat(rrPts(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 8), o.frame || '#2A0A3A', { line: '#000000', lw: 3 });
    if (back) { flat(rrPts(-w / 2, -h / 2, w, h, 4), o.backCol || '#5A2A7A'); txt('?', 0, 4, h * .5, CREAM, { font: SERIF }); }
    else if (o.draw) o.draw(w, h);
    else if (im) { const I = img(im), s = Math.min(I.width / w, I.height / h); ctx.drawImage(I, (I.width - w * s) / 2, (I.height - h * s) / 2, w * s, h * s, -w / 2, -h / 2, w, h); }
    pop();
  }
  // a Latin scroll (drawn into a tile)
  const latin = (w, h) => { flat(rectPts(-w / 2, -h / 2, w, h), '#F3E2BE'); flat(ellPts(-w / 2 + 6, 0, 8, h / 2, 12), '#D9C29A', { line: DARK, lw: 1.5 }); flat(ellPts(w / 2 - 6, 0, 8, h / 2, 12), '#D9C29A', { line: DARK, lw: 1.5 }); ['ARMA', 'VIRVMQVE', 'CANO'].forEach((s, i) => txt(s, 0, -h * .26 + i * h * .26, h * (i === 1 ? .15 : .2), '#6A3A20', { font: SERIF, weight: '700' })); };

  // ---------- 1 · the contestants arrive ----------
  function intro(t, lt, dur) {
    const c0 = chapStart('ch07'), a = cs('te_two'), tTwo = wt('te_two', 'two'), tExp = wt('te_two', 'explanations'), tMix = wt('te_two', 'mixed'), tOpp = wt('te_two', 'opposite');
    const arrive = c0 + 2.6, hop = arrive + .2;
    stageBG();
    camKeys(t, [[c0, 640, 640, 1.3], [arrive, 520, 620, 1.25], [tTwo, 900, 560, 1.05], [tMix, 960, 540, 1], [tOpp + 1, 960, 540, 1.02]], .6);
    const md = Math.max(tMix - .3, c0 + 6.4); marquee(t, lerp(-320, 60, backOut(seg(t, md, md + .8))));
    // the cart rolls in from the wing, in front of the podium; the plant hops up onto it
    const CY = FLOOR + 110, cx = lerp(-420, GX, easeOut(seg(t, c0 - .5, arrive)));
    const hk = seg(t, hop, hop + .55), inCart = t < hop;
    beams(t, [[GX, FLOOR, '#FFE9B8', seg(t, arrive - .5, arrive)], [SX, FLOOR, '#F0C0FF', seg(t, tTwo - .4, tTwo)]]);
    // the knot pops up behind its podium
    const kp = popk(t, tTwo - .3, .5);
    if (kp > 0) knotC(t, SX, lerp(700, 450, backOut(kp)), knotSize(t), { look: t > tOpp ? [-1, 0] : [-.6, .2] });
    if (!inCart && hk >= 1) plantC(t, GX, 516, .32, { sq: .2 * Math.exp(-6 * (t - hop - .55)) * Math.cos(18 * (t - hop - .55)), glow: .6 * env(t, tExp, tExp + 1.5, .3, .6) });
    podium(t, GX, GOLD, 'GENERALIZATION', 0, { lit: seg(t, arrive - .3, arrive) });
    podium(t, SX, VIO, 'SUPERPOSITION', 0, { lit: seg(t, tTwo - .3, tTwo) });
    flat(rrPts(cx - 110, CY + 30, 220, 18, 5), '#8C6A48', { line: DARK, lw: 2 }); for (const wx of [cx - 80, cx + 80]) flat(ellPts(wx, CY + 58, 14, 14, 12), '#3A2A1A', { line: DARK, lw: 2 });
    if (inCart || hk < 1) { const py = inCart ? CY + 14 : arcPt([0, CY + 14], [0, 516], 120, ease(hk))[1]; plantC(t, GX + (inCart ? cx - GX : 0), py, .32, { sq: inCart ? 0 : -.15 * Math.sin(hk * Math.PI) }); }
    // VS, then two arrows pointing opposite ways
    const vk = popk(t, tExp - .1, .4);
    if (vk > 0) { push(); translate(960, 400); rotate(.08 * Math.sin(t * 2)); scale(backOut(vk)); flat(starPts(0, 0, 100, .5, 8), CREAM, { line: '#3A1A0A', lw: 4 }); txt('VS', 0, 4, 70, RED, { font: 'serif' }); pop(); }
    const ok = seg(t, tOpp - .3, tOpp + .3);
    if (ok > 0) for (const [sd, col] of [[-1, GOLD], [1, VIO]]) { push(); translate(960 + sd * 90, 560); scale(sd * backOut(ok), backOut(ok)); flat([[0, -22], [150, -22], [150, -52], [230, 0], [150, 52], [150, 22], [0, 22]], col, { line: DARK, lw: 4, shadow: [5, 6, 'rgba(0,0,0,.35)'] }); pop(); }
    // Clawd pushes the cart in, then hops down into the front row
    const jk = seg(t, arrive + .5, arrive + 1.6);
    if (t < arrive + .5) tourist(cx - 190, CY + 70, 10, 'party', { ...feel('determined', t), view: 'side', walk: t * 2.4, rot: .1, boilKey: 'c7clawd' });
    else if (jk < 1) { const p = arcPt([GX - 190, CY + 70], [960, 1066], 220, ease(jk)); tourist(p[0], p[1], lerp(10, 9, jk), 'party', { ...feel('excited', t), view: 'side', sq: -.15, boilKey: 'c7clawd' }); }
    audience(t, env(t, arrive, arrive + 2.4, .3, .8) + .8 * env(t, tExp, tExp + 2, .2, .8));
    if (jk >= 1) clawdSeat(t, [[arrive + 1.6, 'excited'], [tMix, 'thinking'], [tOpp, 'surprised']], env(t, arrive + 1.6, tExp + 1.2, .3, .4));
    camEnd();
    if (t > arrive && t < arrive + 1.4) sfx('ding!', 300, 380, 60, GOLDLT, t - arrive, { face: 'marker' });
  }

  // ---------- 2 · Round 1: neighbours share or strangers share? ----------
  function board(t, y, o) {
    flat(rrPts(600, y, 720, 470, 18), '#2A0A3A', { line: '#F0BE46', lw: 6, shadow: [10, 12, 'rgba(0,0,0,.45)'] });
    flat(rectPts(956, y + 10, 8, 450), '#F0BE46');
    for (let i = 0; i < 16; i++) { dot(620 + i * 45, y + 8, 6, Math.floor(T * 5 + i) % 2 ? CREAM : '#C98A2A'); dot(620 + i * 45, y + 462, 6, Math.floor(T * 5 + i + 1) % 2 ? CREAM : '#C98A2A'); }
  }
  function round1(t, lt, dur) {
    const a = cs('te_local'), e = ce('te_local'), tN = wt('te_local', 'neighbors'), tFl = wt('te_local', 'floppy-eared'), tCol = wt('te_local', 'collection'), tSup = wt('te_local', 'Superposition'), tStr = wt('te_local', 'strangers');
    const tFl2 = wt('te_local', 'floppy-eared', 1), tLat = wt('te_local', 'Latin'), tPo = wt('te_local', 'poetry');
    stageBG();
    camKeys(t, [[a - .3, 960, 540, 1], [a + .9, 960, 470, 1.4], [tFl - .4, 770, 480, 1.75], [tSup - .3, 770, 480, 1.7], [tStr + .2, 1150, 480, 1.75], [tPo + .3, 1150, 480, 1.72], [e + 1.5, 1040, 520, 1.45]], .6);
    marquee(t, lerp(60, -330, easeIn(seg(t, a - .3, a + .4))));
    const by = lerp(FLOOR, 300, backOut(seg(t, a + .2, a + 1.1)));
    contestants(t, { genLit: 1 - .5 * env(t, tSup, e, .3, .3), supLit: .4 + .6 * env(t, tSup - .2, e + 2, .3, .3), knot: { look: t > tLat ? [-1, -.3] : [-.6, .1], grin: true } });
    board(t, by);
    // left: every tile a slightly different floppy ear
    letter('neighbors share', 778, by + 50, 44, GOLDLT, { face: 'marker', shadow: false, alpha: edgeA(778, by + 50, 380, 50), reveal: seg(t, tN - .3, tN + .5) });
    FLOPPY.forEach((im, i) => { const c = i % 3, r = Math.floor(i / 3), f = seg(t, tFl - .5 + i * .45, tFl - .1 + i * .45); tile(659 + c * 118, by + 175 + r * 140, 104, 116, im, f, { lit: .5 * f * (1 + Math.sin(t * 3 + i)) / 2, frame: '#3A1A0A' }); });
    // right: dogs, and Latin poetry in the same neuron
    letter('strangers share', 1142, by + 50, 44, VIOLT, { face: 'marker', shadow: false, alpha: edgeA(1142, by + 50, 380, 50), reveal: seg(t, tStr - .3, tStr + .5) });
    const RIGHT = [V + 'c5a317c', null, V + 'p10704', null, V + 'n750219', RM + 'ear-large-hanging'];
    RIGHT.forEach((im, i) => { const c = i % 3, r = Math.floor(i / 3), isL = !im, t0 = isL ? tLat - .3 + i * .15 : tFl2 - .6 + i * .2, f = seg(t, t0, t0 + .4); tile(1023 + c * 118, by + 175 + r * 140, 104, 116, im, f, { draw: isL ? latin : null, frame: '#3A1A0A', lit: isL ? .5 * f : 0, glowCol: VIOLT }); });
    clawdSeat(t, [[a, 'happy'], [tLat, 'confused']], 0);
    audience(t, 0);
    camEnd();
    if (t > tPo) { sfx('huh?', 1300, 230, 70, VIOLT, t - tPo, { face: 'marker', life: 1.4 }); }
    lower(t, tCol - .2, tSup - .2, 'one neuron: many floppy ears', GOLD);
    lower(t, tLat - .1, e + 1.2, 'floppy-eared dogs + Latin poetry?', VIO);
    roundCard(t, a - .2, 'ROUND 1', 'who shares?');
    scoreBug(t, seg(t, a + 1.2, a + 2));
  }

  // ---------- 3 · 32 things in a handful of jars ----------
  const jarX = (side, j, m) => { const b = side ? 974 : 610; return lerp(b + 21 + j * 42, b + 42 + Math.floor(j / 2) * 84, m); };
  function jar(x, y, w, h, col, k) { if (k <= 0) return; push(); translate(x, y); scale(1, backOut(k)); flat(rrPts(-w / 2, -h, w, h, 8), 'rgba(220,240,255,.18)', { line: col, lw: 3 }); flat(rrPts(-w / 2 - 3, -h - 8, w + 6, 10, 3), col); pop(); }
  function shapes(t, lt, dur) {
    const a = cs('te_shapes'), e = ce('te_shapes'), t32 = wt('te_shapes', 'thirty-two'), tHand = wt('te_shapes', 'handful'), tGen = wt('te_shapes', 'Generalization'), tGr = wt('te_shapes', 'groups'), tFew = wt('te_shapes', 'fewer'), tCo = wt('te_shapes', 'coarser');
    const tSup = wt('te_shapes', 'Superposition'), tSc = wt('te_shapes', 'scatters');
    stageBG();
    camKeys(t, [[a - .4, 960, 560, 1.1], [t32, 960, 470, 1.6], [tGen, 800, 520, 1.7], [tFew, 800, 530, 1.7], [tSup - .3, 960, 520, 1.55], [e + .5, 1080, 530, 1.65]], .5);
    contestants(t, { genLit: 1, supLit: .4 + .6 * seg(t, tSup - .3, tSup) });
    const by = 300; board(t, by);
    // the prize cannon bursts the 32 things into the air
    const mL = ease(seg(t, tFew, tFew + 1)), mR = ease(seg(t, tSc + .4, tSc + 1.1));
    for (let side = 0; side < 2; side++) for (let j = 0; j < 8; j++) { const m = side ? mR : mL; if (m > .5 && j % 2) continue; jar(jarX(side, j, m), 740, lerp(36, 76, m), lerp(126, 136, m), side ? VIOLT : GOLDLT, popk(t, tHand - .2 + j * .05 + side * .2, .4)); }
    letter('generalization', 778, 360, 44, GOLDLT, { face: 'marker', shadow: false, reveal: seg(t, tGen - .2, tGen + .5) });
    letter('superposition', 1142, 360, 44, VIOLT, { face: 'marker', shadow: false, reveal: seg(t, tSup - .2, tSup + .5) });
    SHAPES.forEach((S, i) => {
      const burst = seg(t, t32 - .3 + i * .012, t32 + .4 + i * .012), cx = 790 + (i % 8) * 49 + (Math.floor(i / 8) % 2) * 20, cy = 430 + Math.floor(i / 8) * 34;
      if (burst <= 0) return;
      // the "thing" itself floats in the cloud until both copies have gone
      const home = arcPt([960, 760], [cx + 85, cy], 200, easeOut(burst)), bob = 3 * Math.sin(t * 3 + i);
      const gK = ease(seg(t, tGr - .4 + i * .03, tGr + .4 + i * .03)), sK = ease(seg(t, tSup + i * .02, tSup + .6 + i * .02));
      if (gK < 1 || sK < 1) shape(S.kind, home[0], home[1] + bob, 13, S.col, { sw: .5 });
      // generalization: by family, then by shade inside the family
      if (gK > 0) { const j = S.fam * 2 + (S.i >= 4 ? 1 : 0), slot = S.i % 4, m = mL, x = jarX(0, j, m) + (m > .5 ? ((j % 2) ? 14 : -14) : 0), y = 735 - slot * 28 - 14; shape(S.kind, lerp(home[0], x, gK), lerp(home[1], y, gK), 12, S.col, { sw: .5 }); }
      // superposition: anywhere at all
      if (sK > 0) { const j = Math.floor(hash(i * 7.7 + 3) * 8), slot = i % 4, m = mR, jj = m > .5 ? j - (j % 2) : j, x = jarX(1, jj, m) + (m > .5 ? (j % 2 ? 14 : -14) : 0), y = 735 - slot * 28 - 14; shape(S.kind, lerp(home[0], x, sK), lerp(home[1], y, sK), 12, S.col, { sw: .5 }); }
    });
    clawdSeat(t, [[a, 'excited'], [t32, 'surprised'], [tGr, 'happy']], 0);
    audience(t, .6 * env(t, t32, t32 + 1.2, .2, .6));
    camEnd();
    if (t > t32 - .2 && t < t32 + 1) sfx('POP!', 960, 300, 90, GOLDLT, t - t32 + .2, { face: 'marker' });
    lower(t, tCo - .6, tSup - .2, 'fewer jars: coarser groups', GOLD);
    lower(t, tSc - .1, e + 1.4, 'superposition: a scattered jumble', VIO);
  }

  // ---------- 4 · Round 2: THE PRESS ----------
  // the hydraulic press: columns, crossbeam with a counter, ram at plateY; ox slides it in from the wing
  function press(t, ox, plateY, count, o = {}) {
    push(); translate(ox, 0);
    for (const x of [520, 1370]) { flat(rectPts(x, 90, 30, 740), '#6E7891', { line: DARK, lw: 3, grad: [[0, '#9AA3B5'], [1, '#5A6278']], gdir: [x, 0, x + 30, 0] }); }
    flat(rrPts(480, 70, 960, 110, 12), '#5A6278', { line: DARK, lw: 4 });
    for (let i = 0; i < 12; i++) flat([[500 + i * 80, 168], [540 + i * 80, 168], [520 + i * 80, 182], [480 + i * 80, 182]], i % 2 ? '#F0BE46' : '#1A1A1A');
    flat(rrPts(800, 86, 320, 70, 8), '#140818', { line: '#000000', lw: 3 });
    fadeTxt(count, 960, 123, 56, '#FF5A3A', { font: 'monospace' });
    fadeTxt('THE PRESS', 640, 125, 40, CREAM, { font: SERIF, weight: '900' }); fadeTxt('PSI', 1280, 125, 36, CREAM, { font: SERIF, weight: '900' });
    // the hydraulic ram
    flat(rectPts(930, 180, 60, Math.max(10, plateY - 220)), '#C9D0DE', { grad: [[0, '#E9EEF6'], [.5, '#B9C0CE'], [1, '#7A8398']], gdir: [930, 0, 990, 0], line: DARK, lw: 2 });
    flat(rrPts(560, plateY - 60, 800, 70, 8), '#8A93A8', { grad: [[0, '#B9C0CE'], [1, '#6E7891']], gdir: [0, plateY - 60, 0, plateY + 10], line: DARK, lw: 4 });
    for (let i = 0; i < 10; i++) flat([[570 + i * 80, plateY - 6], [610 + i * 80, plateY - 6], [590 + i * 80, plateY + 10], [550 + i * 80, plateY + 10]], i % 2 ? '#F0BE46' : '#1A1A1A');
    // the bed
    flat(rrPts(500, 760, 920, 70, 10), '#4A5268', { line: DARK, lw: 4 });
    for (const wx of [560, 1360]) flat(ellPts(wx, 840, 22, 22, 14), '#2A2A3A', { line: DARK, lw: 2 });
    // locking clamps
    if (o.lock > 0) for (const sd of [-1, 1]) { const x = 960 + sd * 470; push(); translate(x, plateY - 20); rotate(sd * (1 - o.lock) * 1.2); flat(rrPts(-18, -10, 36, 120, 8), '#F0BE46', { line: DARK, lw: 3 }); pop(); }
    pop();
  }
  // a tray of tiny tiles (n of them) squashed between the bed and the plate
  function tinyTray(t, n, cols, top, plateY, key, imgs, k) {
    if (k <= 0) return;
    const rows = Math.ceil(n / cols), x0 = 580, w = 760, bottom = 758, h0 = bottom - top, h = Math.max(6, Math.min(h0, bottom - plateY - 2) * k), cw = w / cols, ch = h / rows;
    ctx.save(); ctx.globalAlpha = clamp(k * 2);
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols), x = x0 + c * cw, y = bottom - h + r * ch; ctx.fillStyle = ['#7A5AAA', '#5A6AAA', '#9A5A8A', '#4A7A9A'][(i * 7 + r) % 4]; ctx.fillRect(x + .6, y + .6, cw - 1.2, ch - 1.2); if (imgs && i % 7 === 3 && ch > 8) { const I = img(imgs[i % imgs.length]); ctx.drawImage(I, x + 1.5, y + 1.5, cw - 3, ch - 3); } else if ((i + Math.floor(T * 3)) % 11 === 0) { ctx.fillStyle = 'rgba(255,220,140,.8)'; ctx.fillRect(x + cw * .3, y + ch * .3, cw * .4, ch * .4); } }
    ctx.restore();
  }
  // dust and sparks when the ram hits
  function slam(t, at, x = 960, y = 760) { const k = seg(t, at, at + 1.1); if (k <= 0 || k >= 1) return; for (let i = 0; i < 18; i++) { const a = Math.PI + hash(i * 3.3) * Math.PI, r = 80 + 420 * easeOut(k) * (.5 + hash(i)); dot(x + Math.cos(a) * r * (hash(i) > .5 ? 1 : -1), y + Math.sin(a) * r * .25 - 30 * k, 18 * (1 - k) + 4, '#E9DDF0', .7 * (1 - k)); } }
  const shake = (t, at, amt = 18) => { const k = Math.exp(-5 * Math.max(0, t - at)) * (t > at ? 1 : 0); return shakeXY(t, amt * k); };
  // the prediction: a tile crammed with curves, spirals and webs
  const jumble = (w, h, k) => (ww, hh) => { flat(rectPts(-ww / 2, -hh / 2, ww, hh), '#F3E8F6'); ctx.save(); ctx.lineWidth = 3; ctx.lineCap = 'round';
    if (k[0] > 0) for (let i = 0; i < 6; i++) { ctx.strokeStyle = ['#B0203A', '#3A64B8', '#7B4FB5'][i % 3]; ctx.beginPath(); ctx.arc(-ww * .2 + hash(i) * ww * .4, -hh * .2 + hash(i * 2) * hh * .4, 18 + i * 6, hash(i * 3) * 6, hash(i * 3) * 6 + 2.6 * k[0]); ctx.stroke(); }
    if (k[1] > 0) { ctx.strokeStyle = '#2A7A4A'; ctx.beginPath(); for (let i = 0; i < 80 * k[1]; i++) { const q = i * .25, r = i * .7; i ? ctx.lineTo(ww * .15 + Math.cos(q) * r, -hh * .1 + Math.sin(q) * r) : ctx.moveTo(ww * .15, -hh * .1); } ctx.stroke(); }
    if (k[2] > 0) { ctx.strokeStyle = '#3A2A2A'; ctx.lineWidth = 1.6; for (let i = 0; i < 8; i++) { const q = i / 8 * TAU; ctx.beginPath(); ctx.moveTo(-ww * .15, hh * .15); ctx.lineTo(-ww * .15 + Math.cos(q) * 60 * k[2], hh * .15 + Math.sin(q) * 60 * k[2]); ctx.stroke(); } for (let r = 1; r < 4; r++) { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const q = i / 8 * TAU, rr = r * 18 * k[2]; i ? ctx.lineTo(-ww * .15 + Math.cos(q) * rr, hh * .15 + Math.sin(q) * rr) : ctx.moveTo(-ww * .15 + rr, hh * .15); } ctx.stroke(); } }
    ctx.restore(); };
  function bubble(x, y, w, h, k, tx, ty) { if (k <= 0) return; push(); translate(x, y); scale(backOut(k)); flat(ellPts(0, 0, w, h, 30), '#FFFFFF', { line: DARK, lw: 4, shadow: [6, 8, 'rgba(0,0,0,.35)'] }); pop(); dot(lerp(x, tx, .6), lerp(y, ty, .6) + 40, 18 * k, '#FFFFFF'); dot(lerp(x, tx, .8), lerp(y, ty, .8) + 30, 11 * k, '#FFFFFF'); }
  const GRID10 = i => [578 + 70 + (i % 5) * 156, 520 + Math.floor(i / 5) * 160];
  function pressRound(t, lt, dur) {
    const a = cs('te_test'), tTest = wt('te_test', 'testable'), tWatch = wt('te_test', 'watch'), tSq = wt('te_test', 'squeeze'), tUnder = wt('te_test', 'pressure');
    const s = cs('te_squeeze'), tLayer = wt('te_squeeze', 'layer'), tCurve = wt('te_squeeze', 'curve'), tCr = wt('te_squeeze', 'cut'), tFour = wt('te_squeeze', 'four'), tTen = wt('te_squeeze', 'ten'), tNo = wt('te_squeeze', 'no'), tWay = wt('te_squeeze', 'around');
    const tIf = wt('te_squeeze', 'If'), tDram = wt('te_squeeze', 'dramatic'), tCurves = wt('te_squeeze', 'curves'), tSpi = wt('te_squeeze', 'spirals'), tWeb = wt('te_squeeze', 'webs'), tTog = wt('te_squeeze', 'together');
    const r = cs('te_result'), tClean = wt('te_result', 'clean'), tCoarse = wt('te_result', 'coarser'), tLoops = wt('te_result', 'curves'), tTen2 = wt('te_result', 'ten'), tTwo = wt('te_result', 'Two'), tMany = wt('te_result', 'many');
    const tUnf = wt('te_result', 'Unfolding'), tHid = wt('te_result', 'hidden'), tNone = wt('te_result', 'none'), e = ce('te_result');
    stageBG();
    const [sx, sy] = shake(t, tCr + .05, 22);
    camKeys(t, [[a + .3, 960, 540, 1], [tWatch - .5, 470, 430, 1.6], [tSq - .4, 470, 430, 1.55], [tSq + .4, 960, 480, 1.05], [tLayer, 960, 500, 1.25], [tCr + .2, 960, 480, 1.2], [tNo, 960, 470, 1.25], [tIf - .2, 1150, 430, 1.15], [tTog + .5, 1150, 430, 1.15],
      [r + .2, 960, 500, 1.25], [tLoops - .3, 870, 520, 1.45], [tTwo, 960, 520, 1.3], [tUnf, 960, 640, 1.15], [tNone, 960, 640, 1.12], [tNone + .5, 960, 560, 1], [e + 1, 960, 545, 1]].map(k => [k[0], k[1] + sx, k[2] + sy, k[3]]), .5);
    // the press rolls in from the wing
    const ox = lerp(1400, 0, easeOut(seg(t, tSq - .3, tSq + 1.2)));
    const down = easeIn(seg(t, tCr - .35, tCr + .05)), up = easeOut(seg(t, r, r + 1.1));
    const plateY = lerp(300, 700, down) - (lerp(300, 700, down) - 300) * up + 4 * Math.sin(t * 40) * env(t, tCr + .05, r, .1, .1);
    const cnt = t < tFour ? '480' : t < r ? String(Math.round(lerp(480, 10, easeInOut(seg(t, tFour, tTen + .2))))).padStart(3, ' ') : ' 10';
    contestants(t, { plantGlow: .8 * env(t, tWatch - .2, tSq - .3, .3, .4), knot: { look: t > tIf ? [-1, -.6] : [-.8, 0], grin: t < tCr || t > tNone + 3 ? true : false, sq: .25 * env(t, tCr, tCr + .6, .1, .4) }, buzz: env(t, tNone, tNone + 1.6, .1, .5), supLit: .4 + .6 * env(t, tIf - .3, tTog + .6, .3, .3) });
    // the plant grows a new leaf: you can watch a neuron grow
    if (t > tWatch - .3 && t < tSq) { const k = popk(t, tWatch, .5); push(); translate(GX, 516); scale(.32); translate(-960, -930); leafAt(985, 560, 150, -.25, NO + 'iv1_30024_0_2', .8 * k); pop(); if (k > .5) sfx('sprout!', GX + 120, 300, 46, GOLDLT, t - tWatch - .2, { face: 'marker', life: 1.5 }); }
    if (ox < 1399) {
      // before: 480 tiny curve detectors; after: 10 clean tiles, broad curve families
      if (t < r + .15) tinyTray(t, 480, 40, 440, plateY, 'c7t480', CURVES, popk(t, tCurve - .4, .6));
      else SQ.forEach((im, i) => { const [x, y] = GRID10(i), lk = popk(t, r + .1 + i * .05, .4); tile(x, y, 128, 128, im, 1, { s: .2 + .8 * backOut(lk), lit: .6 * env(t, tClean - .2, tCoarse + 1.5, .3, .5) + (i === 1 ? .9 * env(t, tLoops - .2, tTwo, .2, .3) : 0) + ((i === 7 || i === 2) ? .9 * env(t, tTwo - .1, tMany + 1, .2, .3) : 0), frame: (i === 1 && t > tLoops - .2 && t < tTwo) || ((i === 7 || i === 2) && t > tTwo - .1 && t < tMany + 1) ? GOLD : '#2A0A3A' }); });
      press(t, ox, plateY, cnt, { lock: seg(t, tNo - .3, tWay) * (1 - seg(t, r - .4, r)) });
      slam(t, tCr + .05);
    }
    // ten curve detectors fan out above the "curves and loops" tile, then pour into it
    const fan = seg(t, tTen2 - .9, tTen2 - .3), pour = seg(t, tTen2 + .2, tTen2 + 1.1);
    if (fan > 0 && pour < 1) { const [tx, ty] = GRID10(1); CURVES.forEach((im, i) => { const q = Math.PI + (i + .5) / 10 * Math.PI, hx = tx + Math.cos(q) * 230, hy = ty - 40 + Math.sin(q) * 200, k = popk(t, tTen2 - .9 + i * .04, .3), u = easeIn(pour); tile(lerp(hx, tx, u), lerp(hy, ty, u), 56, 56, im, 1, { s: backOut(k) * (1 - .7 * u) }); }); }
    // the knot's prediction: curves, spirals and webs crammed together
    const bk = popk(t, tIf - .2, .5) * (1 - seg(t, r - .3, r + .1));
    if (bk > 0) { bubble(1300, 300, 230, 170, bk, SX, 380); if (bk > .6) { tile(1300, 310, 200, 150, null, 1, { draw: jumble(200, 150, [seg(t, tCurves - .3, tCurves + .4), seg(t, tSpi - .2, tSpi + .6), seg(t, tWeb - .3, tWeb + .5)]), frame: VIO }); } }
    // the Unfolding Machine sniffs along the tiles and comes back with nothing
    if (t > tUnf - .6) { const mk = seg(t, tUnf - .6, tUnf + .8), mx = lerp(-200, 700, easeOut(mk)) + (t > tUnf + .8 ? 520 * ease(seg(t, tUnf + .8, tNone - .2)) : 0) + 10 * Math.sin(t * 6); machineL(t, mx, 985, .4, { on: 1, mouth: .4 + .4 * Math.abs(Math.sin(t * 5)) }); if (t > tNone - .3) { const bk = popk(t, tNone - .3, .4); push(); translate(mx + 120, 900); scale(backOut(bk)); flat([[-50, -30], [50, -30], [38, 30], [-38, 30]], '#C9A15A', { line: DARK, lw: 3 }); ctx.save(); ctx.strokeStyle = DARK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -30, 44, Math.PI, TAU); ctx.stroke(); ctx.restore(); pop(); } }
    clawdSeat(t, [[a, 'neutral'], [tCr - .5, 'scared'], [r + .4, 'surprised'], [tNone, 'excited']], env(t, tNone + .3, e + 2, .3, .4));
    audience(t, env(t, tNone + .2, e + 2, .3, .5));
    camEnd();
    roundCard(t, tSq - .2, 'ROUND 2', 'THE PRESS');
    lower(t, tCurve, tCr - .2, '480 curve detectors', GOLD);
    lower(t, tTen - .4, tIf - .4, 'crushed to 10 · no way around', RED);
    lower(t, tDram - .3, r - .2, 'if superposition: crammed together', VIO);
    lower(t, tClean - .3, tLoops - .4, 'clean · just coarser', GOLD);
    lower(t, tLoops - .2, tTwo - .2, '1 "curves and loops" for 10 curves', GOLD);
    lower(t, tTwo - .1, tUnf - .4, '2 circle neurons, not many', GOLD);
    lower(t, tHid - .2, e + .8, 'hidden curves found: none', RED);
    if (t > tCr + .05 && t < tCr + 1.2) sfx('CRUNCH!', 960, 260, 100, '#FF8A3A', t - tCr - .05, { face: 'marker' });
    if (t > tNone && t < tNone + 1.4) sfx('BZZT!', 1540, 330, 80, '#FF3B30', t - tNone, { face: 'marker' });
    scoreBug(t, 1);
  }

  // ---------- 5 · the horizon layer: 1024 to 13 ----------
  const GRID13 = i => i < 7 ? [618 + i * 114, 470] : [675 + (i - 7) * 114, 606];
  function horizon(t, lt, dur) {
    const a = cs('te_last'), e = ce('te_last'), tLast = wt('te_last', 'last'), tMod = wt('te_last', 'modern'), tTh = wt('te_last', 'thousand'), tDown = wt('te_last', 'down'), tThir = wt('te_last', 'thirteen'), tSame = wt('te_last', 'Same', 1);
    const tCo = wt('te_last', 'Coarser'), tNev = wt('te_last', 'not'), tPack = wt('te_last', 'packing'), tPaint = wt('te_last', 'paints'), tBr = wt('te_last', 'broader'), tBrush = wt('te_last', 'brush');
    stageBG();
    const [sx, sy] = shake(t, tDown + .05, 22);
    camKeys(t, [[a - .3, 960, 520, 1.15], [tTh, 960, 500, 1.25], [tDown + .2, 960, 480, 1.2], [tSame, 960, 500, 1.35], [tPack, 1100, 480, 1.15], [tPaint, 960, 500, 1.3], [tBrush + .6, 960, 540, 1.05], [e + 1, 960, 540, 1]].map(k => [k[0], k[1] + sx, k[2] + sy, k[3]]), .5);
    const down = easeIn(seg(t, tDown - .35, tDown + .05)), up = easeOut(seg(t, tSame - .6, tSame + .4));
    const plateY = lerp(300, 700, down) - (lerp(300, 700, down) - 300) * up + 4 * Math.sin(t * 40) * env(t, tDown + .05, tSame - .6, .1, .1);
    const cnt = t < tDown ? '1024' : t < tSame ? String(Math.round(lerp(1024, 13, easeInOut(seg(t, tDown + .2, tThir + .2))))).padStart(4, ' ') : '  13';
    const splat = seg(t, tBrush + .2, tBrush + .5);
    contestants(t, { knot: { look: [-1, -.2], grin: false, sq: .25 * env(t, tDown, tDown + .6, .1, .4) }, buzz: env(t, tBrush + .3, tBrush + 1.8, .1, .5), supLit: .3 });
    if (t < tSame - .4) tinyTray(t, 1024, 64, 420, plateY, 'c7t1024', HZ, popk(t, a + .2, .6));
    else HZ.forEach((im, i) => { const [x, y] = GRID13(i), lk = popk(t, tSame - .4 + i * .04, .4); tile(x, y, 100, 100, im, 1, { s: .2 + .8 * backOut(lk), lit: .5 * env(t, tCo - .3, e + 2, .3, .4) }); });
    // the broad brush sweeps a single gold stroke across the clean tiles
    const bk = seg(t, tPaint - .3, tBrush + .2);
    if (bk > 0) { const bx = lerp(420, 1500, easeInOut(bk)); ctx.save(); ctx.globalAlpha = .45; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.moveTo(560, 440); for (let i = 0; i <= 20; i++) { const x = lerp(560, Math.min(1380, bx), i / 20); ctx.lineTo(x, 430 + 8 * Math.sin(i * 1.7)); } for (let i = 20; i >= 0; i--) { const x = lerp(560, Math.min(1380, bx), i / 20); ctx.lineTo(x, 660 + 8 * Math.sin(i * 1.3)); } ctx.closePath(); if (bx > 570) ctx.fill(); ctx.restore(); if (bk < 1) { push(); translate(bx, 545); rotate(-.15); flat(rrPts(-20, -520, 40, 420, 10), '#8C5A3A', { line: DARK, lw: 3 }); flat(rrPts(-60, -110, 120, 60, 8), '#B9C0CE', { line: DARK, lw: 3 }); flat([[-70, -50], [70, -50], [80, 120], [-80, 120]], GOLD, { line: DARK, lw: 3 }); pop(); } }
    press(t, 0, plateY, cnt, {});
    slam(t, tDown + .05);
    // gag: a flick of gold paint lands on the knot
    if (splat > 0) { const p = arcPt([1450, 500], [SX + 20, 430], 160, splat); if (splat < 1) dot(p[0], p[1], 14, GOLD); else { flat(starPts(SX + 20, 430, 26, .55, 7), GOLD); } }
    clawdSeat(t, [[a, 'determined'], [tDown, 'scared'], [tSame, 'happy'], [tBrush, 'laugh']], env(t, tBrush + .4, e + 2, .3, .4));
    audience(t, env(t, tBrush + .3, e + 2, .3, .5));
    camEnd();
    lower(t, tLast - .2, tDown - .3, 'a modern network: 1,024 neurons', GOLD);
    lower(t, tDown - .2, tSame - .3, '1,024 to 13', RED);
    lower(t, tCo - .3, tPack + .4, 'coarser · never scrambled', GOLD);
    lower(t, tPaint - .2, e + 1.2, 'a broader brush', GOLD, { size: 70 });
    if (t > tDown + .05 && t < tDown + 1.2) sfx('CRUNCH!', 960, 260, 100, '#FF8A3A', t - tDown - .05, { face: 'marker' });
    scoreBug(t, 1);
  }

  // ---------- 6 · Round 3: three prize doors, models 300x apart ----------
  const DOORS = [[690, 120, 190, 'small'], [910, 210, 300, 'medium'], [1185, 300, 440, 'huge']];
  const BIG = [NP + 'taxis-positive-1', NP + 'taxis-positive-2', CP + 'stage3_block0-609-pos-1', TV + 'positive-08', CP + 'stage3_block1-1455-pos-1', CP + 'car-5826', CL + 'n01_positive_00', CP + 'stage3_block2-632-pos-1', CP + 'stage2_block7-203-pos-1', CE + '0-0-0', TV + 'positive-05', NP + 'taxis-negative-1'];
  function door(t, x, w, h, label, open, lit) {
    const top = 800 - h;
    flat(rrPts(x - w / 2 - 16, top - 16, w + 32, h + 16, 10), '#F0BE46', { line: DARK, lw: 4, shadow: [8, 10, 'rgba(0,0,0,.4)'] });
    flat(rectPts(x - w / 2, top, w, h), '#140818');
    for (let i = 0; i < Math.round((w + h) / 40); i++) { const u = i / Math.round((w + h) / 40), p = u < w / (w + h) ? [x - w / 2 - 8 + u * (w + h) / w * (w + 16), top - 8] : [x + w / 2 + 8, top - 8 + (u - w / (w + h)) * (w + h)]; dot(p[0], p[1], 5, Math.floor(T * 6 + i) % 2 && lit ? CREAM : '#C98A2A'); }
    return top;
  }
  function shutter(x, w, h, open) { const top = 800 - h, sh = h * (1 - easeInOut(open)); if (sh < 2) return; ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, top, w, sh); ctx.clip(); flat(rectPts(x - w / 2, top, w, h), '#B0203A'); ctx.strokeStyle = '#7A1026'; ctx.lineWidth = 3; for (let y = top + sh - 2; y > top; y -= 18) { ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.stroke(); } ctx.restore(); txt('?', x, top + sh / 2, Math.min(w, h) * .45, '#FFD36B', { font: SERIF, weight: '900' }); }
  function sizes(t, lt, dur) {
    const a = cs('te_sizes'), e = ce('te_sizes'), tTr = wt('te_sizes', 'trained'), tThree = wt('te_sizes', 'three'), tApart = wt('te_sizes', 'apart'), tSm = wt('te_sizes', 'smallest'), tCar = wt('te_sizes', 'car'), tBig = wt('te_sizes', 'biggest'), tDoz = wt('te_sizes', 'specialists');
    const tTax = wt('te_sizes', 'taxis'), tVan = wt('te_sizes', 'ambulances'), tCon = wt('te_sizes', 'convertibles'), tViews = wt('te_sizes', 'views'), tLess = wt('te_sizes', 'Less'), tScr = wt('te_sizes', 'scrambled');
    stageBG();
    camKeys(t, [[a - .3, 960, 540, 1], [tTr, 960, 520, 1.25], [tSm - .3, 700, 600, 1.9], [tCar + .6, 700, 600, 1.85], [tBig - .2, 1185, 520, 1.6], [tViews + .5, 1150, 520, 1.5], [tLess, 960, 520, 1.25], [e + 1, 960, 540, 1.05]], .5);
    contestants(t, { supLit: .3, knot: { look: [-1, 0], grin: false } });
    DOORS.forEach(([x, w, h, lab], i) => {
      const rise = backOut(seg(t, a + .2 + i * .25, a + .9 + i * .25)); if (rise <= 0) return;
      push(); translate(x, 800); scale(1, rise); translate(-x, -800);
      const open = i === 0 ? seg(t, tSm, tCar) : i === 1 ? seg(t, tCar + .3, tBig - .4) : seg(t, tBig - .2, tDoz + .2);
      const top = door(t, x, w, h, lab, open, true);
      // what's behind each door
      if (i === 0) { const k = Math.floor((t - tSm) * 3); const im = [TV + 'positive-01', TV + 'positive-03', TV + 'positive-02', TV + 'positive-04', TV + 'positive-08', TV + 'positive-07'][((k % 6) + 6) % 6]; tile(x, top + 80, 90, 90, im, 1, { lit: .8 * open, frame: '#3A1A0A' }); }
      if (i === 1) [CP + 'car-5826', TV + 'positive-05', CP + 'stage2_block7-203-pos-1'].forEach((im, j) => tile(x, top + 60 + j * 88, 86, 72, im, 1, { lit: .4 * open, frame: '#3A1A0A' }));
      if (i === 2) BIG.forEach((im, j) => { const c = j % 4, r = Math.floor(j / 4), tk = [tTax - .3, tTax - .1, tVan - .2, tVan, tCon - .2, tCon, tCon + .2, tViews - .5, tViews - .3, tViews - .1, tViews + .1, tViews + .3][j]; tile(x - 108 + c * 72, top + 60 + r * 100, 62, 84, im, seg(t, tk, tk + .35), { frame: '#3A1A0A', lit: .5 * seg(t, tk, tk + .35) }); });
      shutter(x, w, h, open);
      pop();
      letter(lab, x, 800 - h - 60, 44, CREAM, { face: 'marker', shadow: false, alpha: edgeA(x, 800 - h - 60, lab.length * 30, 50), reveal: seg(t, tThree - .4 + i * .3, tThree + i * .3) });
    });
    if (t > tCar - .2) { push(); translate(690, 470); const k = popk(t, tCar - .2, .4); scale(backOut(k)); flat(rrPts(-125, -28, 250, 56, 12), GOLD, { line: DARK, lw: 3 }); pop(); letter('1 broad car', 690, 471, 32, DARK, { face: 'marker', shadow: false, pop: k }); }
    clawdSeat(t, [[a, 'thinking'], [tBig, 'surprised'], [tViews, 'excited'], [tLess + .5, 'proud']], env(t, tScr - .4, e + 2, .3, .4));
    audience(t, .8 * env(t, tDoz, tDoz + 1.4, .2, .6) + env(t, tScr, e + 2, .3, .4));
    camEnd();
    roundCard(t, a - .2, 'ROUND 3', 'size');
    lower(t, tThree - .3, tSm - .3, 'same network · 300× apart in size', GOLD);
    lower(t, tSm - .2, tBig - .3, 'smallest: one broad car neuron', GOLD);
    lower(t, tBig - .2, tLess - .3, 'biggest: taxis, vans, convertibles…', GOLD);
    lower(t, tLess - .2, e + 1.2, 'less room: broader, not scrambled', GOLD);
    if (t > tDoz && t < tDoz + 1.2) sfx('OOOH!', 620, 330, 80, CREAM, t - tDoz, { face: 'marker' });
    scoreBug(t, 1);
  }

  // ---------- 7 · Final round: the machine's pieces match single neurons; the knot bolts ----------
  const spiderLegs = (w, h) => { flat(rectPts(-w / 2, -h / 2, w, h), '#E9E2D0'); ctx.save(); ctx.strokeStyle = '#2A1A1A'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w * .3, -h * .3 + i * h * .2); ctx.quadraticCurveTo(0, -h * .45 + i * h * .2, w * .3, -h * .2 + i * h * .2); ctx.stroke(); } ctx.restore(); };
  const web = (w, h) => { flat(rectPts(-w / 2, -h / 2, w, h), '#2A3A4A'); ctx.save(); ctx.strokeStyle = '#E9EEF6'; ctx.lineWidth = 1.6; for (let i = 0; i < 8; i++) { const q = i / 8 * TAU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q) * w * .48, Math.sin(q) * h * .48); ctx.stroke(); } for (let r = 1; r < 5; r++) { ctx.beginPath(); for (let i = 0; i <= 8; i++) { const q = i / 8 * TAU, rr = r * .11; i ? ctx.lineTo(Math.cos(q) * w * rr, Math.sin(q) * h * rr) : ctx.moveTo(w * rr, 0); } ctx.stroke(); } ctx.restore(); };
  const spider = (x, y, s) => { ctx.save(); ctx.strokeStyle = '#1A1010'; ctx.lineWidth = 2.5 * s; for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sd * 14 * s, y - 10 * s + i * 6 * s, x + sd * 22 * s, y - 2 * s + i * 8 * s); ctx.stroke(); } ctx.fillStyle = '#1A1010'; ctx.beginPath(); ctx.ellipse(x, y, 7 * s, 9 * s, 0, 0, TAU); ctx.fill(); ctx.restore(); };
  const onLeaf = (w, h) => { flat(rectPts(-w / 2, -h / 2, w, h), '#CFE3B0'); flat(ellPts(0, 0, w * .42, h * .28, 18), '#5E9A4C', { line: '#2E5A2A', lw: 2 }); spider(0, 0, w / 90); };
  const inWeb = (w, h) => { web(w, h); spider(0, 0, w / 90); };
  const DICT = [[TV + 'positive-01', TV + 'positive-01'], [NP + 'broccoli-positive-1', NP + 'broccoli-positive-2'], [NP + 'spoonbills-positive-1', NP + 'spoonbills-positive-2'], [NP + 'lighthouses-positive-1', NP + 'lighthouses-positive-2'], [NP + 'toucans-positive-1', NP + 'toucans-positive-2'], [NP + 'pretzels-positive-1', NP + 'pretzels-positive-2']];
  const RACK = i => [740 + i * 104, 470];
  function finale(t, lt, dur) {
    const a = cs('te_dict'), e = ce('te_dict'), tUnf = wt('te_dict', 'Unfolding'), tPieces = wt('te_dict', 'pieces'), tCopies = wt('te_dict', 'near-copies'), t88 = wt('te_dict', 'eighty-eight'), tAct = wt('te_dict', 'activity');
    const tBlocks = wt('te_dict', 'blocks'), tLegs = wt('te_dict', 'legs'), tWebs = wt('te_dict', 'webs'), tReg = wt('te_dict', 'regrouped'), tLeaves = wt('te_dict', 'different'), tInWebs = wt('te_dict', 'places');
    const tBase = wt('te_dict', 'already'), tUnd = wt('te_dict', 'kept'), tNeur = wt('te_dict', 'neuron', 1), end = ce('te_dict');
    const bolt = end + .5;
    stageBG();
    camKeys(t, [[a - .3, 960, 540, 1], [tUnf, 960, 600, 1.3], [tCopies, 960, 580, 1.4], [t88 - .5, 960, 470, 1.3], [tAct + .6, 960, 540, 1.15], [tBlocks, 960, 630, 1.35], [tInWebs + .4, 960, 630, 1.35], [tBase - .3, 960, 470, 1.5], [tNeur + .2, 960, 500, 1.35], [end + .3, 960, 540, 1], [end + 4, 1050, 540, 1.02]], .5);
    const ksz = knotSize(t);
    const kx = SX + (t > bolt ? 1100 * easeIn(seg(t, bolt, bolt + .9)) : 0), ky = 450 - (t > bolt ? 30 * Math.abs(Math.sin((t - bolt) * 14)) : 0);
    contestants(t, { kx, ky, knot: { look: t > bolt - .8 ? [1, -.2] : t > end - .5 ? [-1, -.8] : [-.8, 0], grin: false, sq: t > bolt - .3 && t < bolt ? .3 : 0 }, supLit: t > bolt + .6 ? .05 : .3, plantGlow: .9 * env(t, end - .2, end + 6, .3, .3) });
    if (t > bolt && t < bolt + 1.2) { for (let i = 0; i < 6; i++) { const yy = 380 + i * 22; ctx.save(); ctx.strokeStyle = 'rgba(233,176,224,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(kx - 120 - i * 30, yy); ctx.lineTo(kx - 260 - i * 50, yy); ctx.stroke(); ctx.restore(); } for (let i = 0; i < 8; i++) dot(kx - 80 - hash(i) * 200, 520 + hash(i * 3) * 60, 12 * (1 - seg(t, bolt, bolt + 1.2)) + 3, '#C9B0D9', .6); }
    // the machine and its belt; pieces stop under the neuron each one matches
    const mOn = seg(t, a - .3, a + .7), dictOut = seg(t, tBase - 1, tBase - .3);
    if (dictOut < 1) {
      ctx.save(); ctx.globalAlpha = 1 - dictOut;
      machineL(t, lerp(-300, 620, easeOut(mOn)), 960, .42, { on: 1, mouth: .6 });
      flat(rectPts(700, 860, 700, 26), '#4A5268', { line: DARK, lw: 3 }); for (let i = 0; i < 14; i++) flat(ellPts(720 + i * 50, 873, 9, 9, 10), '#6E7891', { line: DARK, lw: 1 });
      // the rack of neurons above the belt
      const spidersOn = t > tBlocks - .3;
      flat(rrPts(670, 400, 640, 140, 12), '#2A0A3A', { line: '#F0BE46', lw: 4 });
      DICT.forEach(([n, p], i) => { const [x, y] = RACK(i); if (spidersOn && i < 2) tile(x, y, 84, 84, null, seg(t, tBlocks - .3 + i * .5, tBlocks + .1 + i * .5), { draw: i ? web : spiderLegs, lit: .7 * env(t, tLegs - .2 + i * .6, end, .2, .3) }); else if (!spidersOn || i >= 2) tile(x, y, 84, 84, n, popk(t, a + .4 + i * .1, .4), { s: 1, lit: 0 }); });
      // the pieces ride out of the machine and stop under their neuron
      DICT.forEach(([n, p], i) => { if (spidersOn && i < 2) return; const ta = tPieces - .4 + i * .45, k = seg(t, ta, ta + .9), [x] = RACK(i); if (k <= 0) return; tile(lerp(760, x, easeOut(k)), 808, 84, 72, p, 1, { frame: '#3A1A0A' }); const tk = seg(t, ta + .9, ta + 1.2); if (tk > 0) { ctx.save(); ctx.strokeStyle = rgba(GOLDLT, .7); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(x, 520); ctx.lineTo(x, 785); ctx.stroke(); ctx.restore(); tick(x + 30, 640, 50, tk, '#7AE07A'); } });
      // spiders on leaves / spiders in webs: the same building blocks, regrouped by setting
      [[tLeaves - .9, onLeaf, [0]], [tInWebs - .9, inWeb, [0, 1]]].forEach(([ta, dr, from], j) => { const k = seg(t, ta, ta + .9), x = 900 + j * 200; if (k <= 0) return; tile(lerp(760, x, easeOut(k)), 800, 110, 90, null, 1, { draw: dr, frame: '#3A1A0A', lit: .5 * k }); if (k >= 1) from.forEach(fi => { const [rx] = RACK(fi); ctx.save(); ctx.strokeStyle = rgba(GOLDLT, .8); ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(rx, 520); ctx.quadraticCurveTo((rx + x) / 2, 640, x, 770); ctx.stroke(); ctx.restore(); }); });
      ctx.restore();
    }
    // the 88% meter on the back wall
    const mk = seg(t, t88 - 1.2, t88 + .3), mAlpha = env(t, t88 - 1.4, tBlocks - .3, .3, .4);
    if (mAlpha > 0) { ctx.save(); ctx.globalAlpha = mAlpha; flat(rrPts(560, 250, 800, 110, 16), DARK, { line: '#F0BE46', lw: 5 }); flat(rrPts(580, 270, 760 * .88 * easeOut(mk), 70, 10), GOLD); txt(Math.round(88 * easeOut(mk)) + '%', 960, 306, 72, CREAM, { font: SERIF, weight: '900', stroke: DARK, sw: 6 }); ctx.restore(); }
    // the baseball neuron rises into a gold spotlight
    const bb = popk(t, tBase - .5, .7) * (1 - seg(t, end, end + .5));
    if (bb > 0) { beams(t, [[960, 760, '#FFE9A0', 1.5]]); tile(960, 520, 230, 230, CE + '7-0-0', 1, { s: backOut(bb), lit: .9, frame: GOLD }); }
    // confetti for the winner
    if (t > end - .2) for (let i = 0; i < 70; i++) { const f = frac((t - end) * .35 + hash(i)), x = hash(i * 3.1) * 2000 - 40 + 40 * Math.sin(t * 2 + i), y = -100 + f * 1200; flat(rectPts(x, y, 14, 8), [GOLD, CREAM, '#FF8A3A', '#9FE3C8'][i % 4], { alpha: seg(t, end - .2, end + .3) }); }
    clawdSeat(t, [[a, 'neutral'], [t88, 'excited'], [tLeaves, 'scared'], [tBase, 'love'], [end, 'starstruck'], [bolt + .3, 'surprised']], Math.max(env(t, tAct, tAct + 2, .3, .4), env(t, end - .2, end + 9, .3, .3)));
    audience(t, env(t, tAct, tAct + 2, .3, .5) + env(t, end - .2, end + 9, .3, .3));
    // the dark wing swallows the runaway knot
    if (t > bolt + .4) { ctx.save(); const g = ctx.createLinearGradient(1700, 0, 2200, 0); g.addColorStop(0, 'rgba(8,2,12,0)'); g.addColorStop(1, 'rgba(8,2,12,.95)'); ctx.globalAlpha = seg(t, bolt + .4, bolt + 1.2); ctx.fillStyle = g; ctx.fillRect(1700, -300, 900, 1600); ctx.restore(); }
    camEnd();
    roundCard(t, a - .2, 'FINAL ROUND', 'the machine');
    lower(t, tCopies - .3, t88 - .5, 'its pieces: near-copies of single neurons', GOLD);
    lower(t, tLegs - .4, tReg - .3, 'neurons: spider legs · webs', GOLD);
    lower(t, tReg - .2, tBase - .5, 'pieces: the same blocks, regrouped', GOLD);
    lower(t, tUnd - .3, end + .2, 'the understanding was in a neuron', GOLD, { size: 64 });
    if (t > end - .1) { const k = popk(t, end - .1, .5); letter('WINNER!', GX, 230, 96, GOLDLT, { face: 'marker', stroke: DARK, strokeW: .12, pop: k, rot: -.08 + .03 * Math.sin(t * 6) }); }
    if (t > tLeaves - .3 && t < tLeaves + 1.2) sfx('eek!', 960, 1000, 60, CREAM, t - tLeaves + .3, { face: 'marker' });
    if (t > bolt - .2 && t < bolt + 1.2) sfx('ZOOM!', SX + 120, 300, 90, VIOLT, t - bolt + .2, { face: 'marker' });
    scoreBug(t, 1);
  }

  shots([[chapStart('ch07'), intro], [cs('te_local') - .3, round1], [cs('te_shapes') - .4, shapes], [cs('te_test') + .4, pressRound], [cs('te_last') - .3, horizon], [cs('te_sizes') - .3, sizes], [cs('te_dict') - .3, finale]]);
})();
