// ch15 Why it matters · a ROUSSEAU JUNGLE, then home to DEEP SPACE. A change in kind (design → selection: every
// creature here was made by one process); the tiger is orange because deer can't tell orange from green (the deer's-eye
// view recolours the frame and the tiger vanishes, and so does Clawd); humble about brains (a painted brain, three
// electrodes, the V glimmering inside); Clawd at a jungle pond looking at its reflection; then a V portal opens onto the
// opening galaxy, now an ordered map of constellations. Final line, title, credits, fade to black.
(() => {
  const V = 'blog/raw/v-figure-10x/', PE = 'blog/raw/pose-everywhere/';
  const SKY = { sky0: '#F2C9A0', sky1: '#F4E6B8' };   // dawn

  // ---------- jungle creatures (Rousseau-flat, crisp vector) ----------
  function toucan(x, y, s, t, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    ctx.strokeStyle = '#2A1A10'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-60, 40); ctx.quadraticCurveTo(0, 50, 70, 36); ctx.stroke();   // branch
    fillPath(pathOf([[-10, 36], [-30, 60], [-14, 64]]), '#1A1A1A');
    const body = new Path2D(); body.ellipse(0, 0, 28, 42, -.25, 0, TAU); fillPath(body, '#1A1A1A', '#000', 2);
    fillPath(pathOf([[-14, -26], [14, -28], [16, -6], [-10, -4]]), '#F7F0D8');
    const beak = new Path2D(); beak.moveTo(10, -34); beak.bezierCurveTo(60, -50, 96, -30, 98, -18); beak.bezierCurveTo(70, -18, 40, -16, 12, -16); beak.closePath();
    fillPath(beak, lgrad(10, -40, 98, -18, [[0, '#F2B04A'], [.6, '#E8662A'], [1, '#C2302A']]), '#3A1A0A', 2);
    ctx.fillStyle = '#1A1A1A'; ctx.beginPath(); ctx.arc(2, -24, 4, 0, TAU); ctx.fill(); ctx.fillStyle = '#7ED0F0'; ctx.beginPath(); ctx.arc(2, -24, 7, 0, TAU); ctx.globalAlpha = .4; ctx.fill(); ctx.globalAlpha = 1;
    fillPath(pathOf([[-20, 36], [-6, 70], [6, 36]]), '#1A1A1A');
    ctx.restore();
  }
  function butterfly(x, y, s, t, col) {
    const f = Math.abs(Math.sin(t * 9 + x)), dx = Math.sin(t * 1.3 + y) * 30, dy = Math.sin(t * 2.1 + x) * 20;
    ctx.save(); ctx.translate(x + dx, y + dy); ctx.scale(s, s);
    for (const sd of [-1, 1]) { ctx.save(); ctx.scale(sd * (.25 + .75 * f), 1); const w = new Path2D(); w.moveTo(0, 0); w.bezierCurveTo(30, -40, 60, -20, 40, 6); w.bezierCurveTo(50, 30, 20, 34, 0, 6); fillPath(w, lgrad(0, -30, 0, 30, [[0, col], [1, mixCol(col, '#000000', .3)]]), '#1A1A1A', 2); ctx.restore(); }
    ctx.fillStyle = '#1A1A1A'; ctx.fillRect(-2, -10, 4, 22); ctx.restore();
  }
  function snake(x, y, len, t) {
    const P = []; for (let i = 0; i <= 20; i++) { const u = i / 20; P.push([x + Math.sin(u * 7 + t * 1.2) * 26 * (1 - u * .3), y + u * len]); }
    const body = pathOf(taper(P, [20, 18, 16, 14, 10, 6]));
    fillPath(body, lgrad(x - 20, 0, x + 20, 0, [[0, '#4E7A2A'], [1, '#9AB84A']]), '#1E3A1A', 2);
    ctx.save(); ctx.clip(body); ctx.strokeStyle = '#E8C24A'; ctx.lineWidth = 4; for (let i = 2; i < P.length; i += 2) { ctx.beginPath(); ctx.moveTo(P[i][0] - 12, P[i][1]); ctx.lineTo(P[i][0] + 12, P[i][1] + 6); ctx.stroke(); } ctx.restore();
    ctx.fillStyle = '#4E7A2A'; ctx.beginPath(); ctx.ellipse(P[20][0], P[20][1] + 8, 13, 16, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#F3D36B'; ctx.beginPath(); ctx.arc(P[20][0] - 5, P[20][1] + 10, 3, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#C2302A'; ctx.lineWidth = 2; const fl = Math.sin(t * 8) > .5; if (fl) { ctx.beginPath(); ctx.moveTo(P[20][0], P[20][1] + 24); ctx.lineTo(P[20][0] - 4, P[20][1] + 36); ctx.moveTo(P[20][0], P[20][1] + 24); ctx.lineTo(P[20][0] + 4, P[20][1] + 36); ctx.stroke(); }
  }
  // a deer seen from behind (over-the-shoulder, lower left): neck, head, big ears, little antlers
  function deerHead(x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.04 * Math.sin(t * .8));
    const OUT = '#3A2410', fur = '#B07A44', furL = '#D9A86A';
    fillPath(pathOf([[-150, 400], [-120, 120], [-60, 20], [60, 20], [120, 120], [150, 400]]), lgrad(0, 20, 0, 400, [[0, furL], [1, fur]]), OUT, 4);
    const head = new Path2D(); head.ellipse(0, -20, 90, 100, 0, 0, TAU); fillPath(head, fur, OUT, 4);
    for (const sd of [-1, 1]) {
      ctx.save(); ctx.translate(sd * 80, -70); ctx.rotate(sd * (.9 + .06 * Math.sin(t * 3 + sd))); const ear = new Path2D(); ear.ellipse(0, -60, 38, 80, 0, 0, TAU); fillPath(ear, fur, OUT, 4); const inner = new Path2D(); inner.ellipse(0, -60, 20, 56, 0, 0, TAU); fillPath(inner, '#F2D2B0'); ctx.restore();
    }
    for (const sd of [-1, 1]) { ctx.strokeStyle = '#3A2410'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sd * 28, -100); ctx.quadraticCurveTo(sd * 30, -230, sd * 110, -330); ctx.moveTo(sd * 46, -210); ctx.quadraticCurveTo(sd * 10, -260, sd * 4, -310); ctx.moveTo(sd * 80, -290); ctx.lineTo(sd * 150, -300); ctx.stroke(); ctx.strokeStyle = '#8C6A48'; ctx.lineWidth = 10; ctx.stroke(); }
    ctx.restore();
  }
  // a painted brain (Rousseau's flat rhythm of folds), with three electrodes on wires from above
  function brainArt(x, y, s, t, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(30,40,20,.25)'; ctx.beginPath(); ctx.ellipse(0, 250, 330, 40, 0, 0, TAU); ctx.fill();
    const B = new Path2D(); B.moveTo(-330, 60); B.bezierCurveTo(-360, -160, -160, -270, 0, -250); B.bezierCurveTo(160, -270, 360, -170, 330, 40); B.bezierCurveTo(320, 160, 220, 210, 120, 200); B.bezierCurveTo(60, 260, -40, 260, -90, 210); B.bezierCurveTo(-220, 220, -320, 170, -330, 60); B.closePath();
    fillPath(B, lgrad(0, -260, 0, 240, [[0, '#F4B8B8'], [.6, '#E28A96'], [1, '#B8607A']]), '#5A2A3A', 5);
    ctx.save(); ctx.clip(B); ctx.strokeStyle = '#A8506A'; ctx.lineWidth = 9; ctx.lineCap = 'round';
    for (let i = 0; i < 26; i++) { const cx = -300 + (i % 7) * 100 + (Math.floor(i / 7) % 2) * 50, cy = -200 + Math.floor(i / 7) * 110; ctx.beginPath(); ctx.moveTo(cx - 40, cy); ctx.bezierCurveTo(cx - 20, cy - 50, cx + 30, cy + 40, cx + 50, cy - 10); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(255,230,230,.5)'; ctx.lineWidth = 4; for (let i = 0; i < 12; i++) { const cx = -260 + (i % 6) * 100, cy = -150 + Math.floor(i / 6) * 160; ctx.beginPath(); ctx.arc(cx, cy, 30, Math.PI * 1.1, Math.PI * 1.7); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = '#7A3A4A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -250); ctx.bezierCurveTo(-20, -120, 20, 40, -10, 230); ctx.stroke();
    // the V inside, glimmering for a moment
    if ((o.v || 0) > 0) { const k = o.v; ctx.save(); ctx.globalAlpha = k; ctx.shadowColor = '#FFD84A'; ctx.shadowBlur = 40; ctx.strokeStyle = '#FFE38A'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-90, -80); ctx.lineTo(0, 60); ctx.lineTo(90, -80); ctx.stroke(); ctx.restore(); glow(0, -20, 200, '#FFE38A', .6 * k); }
    // electrodes
    const E = [[-170, -190], [30, -245], [200, -160]];
    E.forEach(([ex, ey], i) => { const sp = (o.spark || 0) * (Math.sin(t * 30 + i * 2) > .3 ? 1 : 0); ctx.strokeStyle = '#3A3A44'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.bezierCurveTo(ex, ey - 120, ex * .5 + 400, -520, 520, -560 + i * 30); ctx.stroke(); fillPath((() => { const p = new Path2D(); p.ellipse(ex, ey, 14, 10, 0, 0, TAU); return p; })(), '#C9A15A', '#3A2A1A', 3); if (sp) glow(ex, ey, 60, '#BFE6FF', 1); });
    ctx.restore();
  }
  // a little brass meter box the electrodes run to: three needles that only twitch, a paper strip of scribbles
  function meter(x, y, s, t, k = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    fillPath(pathOf(rrPts(-150, -110, 300, 220, 18)), lgrad(0, -110, 0, 110, [[0, '#C99A45'], [1, '#8C6524']]), '#3A2A1A', 4);
    for (let i = 0; i < 3; i++) { const cx = -90 + i * 90; fillPath((() => { const p = new Path2D(); p.arc(cx, -40, 36, 0, TAU); return p; })(), '#F4EED8', '#3A2A1A', 3); const a = -Math.PI / 2 + (Math.sin(t * 13 + i * 2) * .5 + Math.sin(t * 31 + i) * .2) * k; ctx.strokeStyle = '#C2302A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, -40); ctx.lineTo(cx + Math.cos(a) * 30, -40 + Math.sin(a) * 30); ctx.stroke(); }
    ctx.fillStyle = '#F4EED8'; ctx.fillRect(-130, 20, 260, 70); ctx.strokeStyle = '#2A2A33'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 52; i++) { const xx = -130 + i * 5, yy = 55 + (hash(i * 3.7 + Math.floor(t * 12)) - .5) * 50 * k; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
    ctx.restore();
  }
  // deer vision: a red-green dichromat sees orange and green as the same olive (a post pass, k blends)
  function fxDeer(k) { if (k <= 0) return; POST.push(() => { const d = ctx.getImageData(0, 0, W, H), D = d.data; for (let i = 0; i < D.length; i += 4) { const r = D[i], g = D[i + 1], b = D[i + 2], y = r * .45 + g * .55; const yb = y * .62 + b * .38; D[i] = r + (y * .9 - r) * k; D[i + 1] = g + (y * .95 - g) * k; D[i + 2] = b + (yb * .7 - b) * k; } ctx.putImageData(d, 0, 0); }); }
  const gold = (x, y, k, s = 1) => { if (k <= 0) return; const p = backOut(k); glow(x, y, 60 * s * p, '#FFE38A', .8 * k); ctx.save(); ctx.translate(x, y); ctx.scale(p * s, p * s); ctx.strokeStyle = '#FFF6D0'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#E8A020'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.moveTo(-18, 2); ctx.lineTo(-4, 16); ctx.lineTo(22, -16); ctx.stroke(); ctx.restore(); };
  const tourist15 = (t, x, y, u, keys, extra = {}) => tourist(x, y, u, 'safari', { ...emotions(t, keys), view: 'q', ...extra });

  // ---------- shot 1 · a change in kind: one process made all of them ----------
  function kind(t, lt, dur) {
    const s0 = chapStart('ch15'), a = cs('wm_kind'), tk = wt('wm_kind', 'kind'), tdes = wt('wm_kind', 'intelligent'), tnat = wt('wm_kind', 'natural'), tmore = wt('wm_kind', 'more'), tani = wt('wm_kind', 'animals'), treal = wt('wm_kind', 'realizing'), tall = wt('wm_kind', 'all'), e = ce('wm_kind');
    camKeys(t, [[s0, 960, 560, 1.12], [a + 1, 940, 540, 1.04], [tk, 960, 540, 1], [tmore, 960, 520, .96], [e + .3, 900, 560, 1.02]], .5);
    const front = rousseau(t, { clear: true, mx: 1560, my: 190, ...SKY });
    // creatures appear one by one ("more and more animals")
    const pop = i => popk(t, tmore - .3 + i * .45, .5);
    if (pop(0) > 0) { ctx.save(); const k = backOut(pop(0)); ctx.translate(1620, 420); ctx.scale(k, k); toucan(0, 0, 1.3, t); ctx.restore(); }
    [[300, 300, '#4A8AD0'], [1250, 360, '#E8A02A'], [700, 260, '#D2473F']].forEach(([x, y, c], i) => { if (pop(1 + i) > 0) butterfly(x, y, .8 * backOut(pop(1 + i)), t, c); });
    if (pop(4) > 0) snake(140, -20, 420 * easeOut(pop(4)), t);
    // the tiger strolls in
    const tx = lerp(-500, 820, easeOut(seg(t, s0 + .5, tani + 1))), walking = t < tani + 1;
    tigerArt(tx, 930, 1.05, { walk: walking ? t * .9 : .3 });
    front();
    // the leaf from the poster's garden drifts down and lands at Clawd's feet
    const lf = seg(t, s0, s0 + 3.2); if (lf < 1) { const lx = 1500 + 120 * Math.sin(lf * 7), ly = lerp(-60, 990, easeIn(lf)); rLeaf(lx, ly, 90, Math.sin(lf * 9) * .8 + 1, 'heart', '#E8A02A'); } else rLeaf(1440, 1010, 90, -.3, 'heart', '#E8A02A');
    tourist15(t, 1400, 1020, 9, [[s0, 'surprised'], [s0 + 3.4, 'happy'], [tk, 'thinking'], [tmore, 'excited'], [treal, 'love']], { flip: true, lookY: lf < 1 ? -.7 : 0 });
    // "what was producing all of them": gold threads from every creature to the sun
    const kAll = seg(t, treal - .2, tall + .4);
    if (kAll > 0) { const sun = [1560, 190], ends = [[1660, 400], [300, 300], [1250, 360], [700, 260], [160, 380], [tx + 280, 700]]; ends.forEach(([x, y], i) => { const k = clamp(kAll * 1.6 - i * .12); if (k <= 0) return; ctx.save(); ctx.strokeStyle = 'rgba(255,220,110,.85)'; ctx.lineWidth = 5; ctx.shadowColor = '#FFC020'; ctx.shadowBlur = 14; ctx.setLineDash([16, 10]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(sun[0], sun[1]); ctx.lineTo(lerp(sun[0], x, k), lerp(sun[1], y, k)); ctx.stroke(); ctx.restore(); gold(x, y - 40, seg(t, treal + i * .15, treal + .5 + i * .15), .8); }); glow(1560, 190, 260, '#FFF2C8', .8 * kAll); }
    camEnd();
    // words: a change in kind; design struck out, natural selection written in
    title('a change in kind', 960, 140, 92, '#1A2A1A', seg(t, tk - .4, tk + .5), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tdes - .6, tdes - .2) });
    if (t > tdes - .3 && t < tmore + .5) {
      const al = 1 - seg(t, tmore, tmore + .5);
      title('intelligent design', 960, 130, 76, '#5A3A2A', seg(t, tdes - .3, tdes + .5), { stroke: '#F4E6B8', strokeW: .12, alpha: al });
      const ks = seg(t, tnat - .4, tnat - .1); if (ks > 0) { ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = '#C2302A'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(640, 140); ctx.lineTo(lerp(640, 1280, ks), 128); ctx.stroke(); ctx.restore(); }
      title('natural selection', 960, 240, 92, '#1A4A1A', seg(t, tnat - .1, tnat + .7), { stroke: '#F4E6B8', strokeW: .12, alpha: al });
    }
  }

  // ---------- shot 2 · the tiger is orange because deer can't tell orange from green ----------
  function tiger(t, lt, dur) {
    const a = cs('wm_tiger'), tor = wt('wm_tiger', 'orange'), tdeer = wt('wm_tiger', 'deer'), tgr = wt('wm_tiger', 'green'), tonce = wt('wm_tiger', 'Once'), tjun = wt('wm_tiger', 'jungle'), tnn = wt('wm_tiger', 'Neural'), tcl = wt('wm_tiger', 'clean', 1), tnear = wt('wm_tiger', 'Nearly'), e = ce('wm_tiger');
    const dv = ease(seg(t, tdeer - .1, tgr + .3)) * (1 - ease(seg(t, tonce - .2, tonce + .6)));
    camKeys(t, [[a - .3, 900, 560, 1.02], [tor, 980, 640, 1.35], [tdeer - .3, 1000, 640, 1.3], [tgr + .3, 960, 600, 1.12], [tonce + .6, 960, 560, 1.0], [tnn, 960, 540, .96], [tnear, 960, 530, .92], [e + .4, 960, 530, .92]], .5);
    const front = rousseau(t, { clear: true, mx: 1560, my: 190, ...SKY });
    toucan(1620, 420, 1.3, t);
    [[300, 300, '#4A8AD0'], [1250, 360, '#E8A02A'], [700, 260, '#D2473F']].forEach(([x, y, c]) => butterfly(x, y, .8, t, c));
    snake(140, -20, 420, t);
    // the tiger pads forward, turns its head toward us on "orange", and freezes when the deer looks
    const tx = lerp(820, 980, ease(seg(t, a, tdeer))) + lerp(0, 120, ease(seg(t, tonce, e)));
    tigerArt(tx, 930, 1.05, { walk: t < tdeer || t > tonce ? t * .7 : tdeer * .7, deer: dv });
    front();
    // Clawd is orange too: in deer-vision he vanishes as well, and waves to prove he's still there
    tourist15(t, 1330, 1010, 12, [[a - 1, 'love'], [tor, 'excited'], [tgr + .2, 'confused', { aR: 1.4 }], [tonce + .4, 'surprised'], [tjun, 'happy'], [tnear, 'proud']], { flip: true, col: dv > 0 ? mixCol(PAL.clay, '#7A8A44', dv) : undefined, dk: dv > 0 ? mixCol(PAL.clayDk, '#5A6A34', dv) : undefined, lt: dv > 0 ? mixCol('#F5B394', '#9AA858', dv) : undefined, aR: dv > .5 ? 1.2 + .5 * Math.sin(t * 12) : undefined });
    // "nearly everything in it makes sense": gold ticks on everything
    const kn = seg(t, tnear - .3, tnear + 1.2);
    [[1660, 360], [300, 250], [1250, 310], [700, 210], [180, 340], [tx + 300, 640], [1440, 900], [520, 860], [1100, 760]].forEach(([x, y], i) => gold(x, y, clamp(kn * 2 - i * .12), .9));
    camEnd();
    // the deer, over the shoulder, enters for the deer's-eye view
    const dk = ease(seg(t, tdeer - .5, tdeer + .1)) * (1 - ease(seg(t, tonce, tonce + .5)));
    if (dk > 0) deerHead(250, lerp(1500, 930, dk), 1.15, t);
    fxDeer(dv);
    if (dv > .05) title("a deer's-eye view", 1380, 150, 74, '#F4E6B8', clamp(dv * 2), { stroke: '#1A2A1A', strokeW: .12, alpha: clamp(dv * 2) });
    title('orange', 1200, 330, 90, '#E8662A', seg(t, tor - .2, tor + .4), { stroke: '#1A2A1A', strokeW: .12, alpha: 1 - seg(t, tdeer - .5, tdeer - .2) });
    if (t > tnn - .4) title('clean the way a rainforest is clean', 960, 140, 76, '#1A2A1A', seg(t, tnn - .2, tcl), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, e - .2, e + .3) });
  }

  // ---------- shot 3 · humble about brains: perfect tools couldn't see it; a few electrodes never would ----------
  function brain(t, lt, dur) {
    const a = cs('wm_brain'), thum = wt('wm_brain', 'humble'), tcat = wt('wm_brain', 'cat'), tperf = wt('wm_brain', 'perfect'), tsee = wt('wm_brain', 'see'), thb = wt('wm_brain', 'human'), tel = wt('wm_brain', 'electrodes'), tch = wt('wm_brain', 'chance'), e = ce('wm_brain');
    camKeys(t, [[a - .3, 960, 560, 1.15], [thum, 960, 540, 1.02], [tcat, 920, 540, 1.1], [tsee, 960, 540, 1.0], [thb, 1080, 480, 1.0], [tel, 1180, 470, 1.08], [e + .3, 1060, 520, 1.0]], .5);
    const front = rousseau(t, { clear: true, mx: 1560, my: 190, ...SKY, front: 5 });
    // the brain rises out of the leaves like a great pink fruit
    const bk = backOut(seg(t, a, a + 1.4));
    const vk = env(t, tcat - .3, tsee + .4, .5, .8) * (.75 + .25 * Math.sin(t * 7));
    brainArt(900, 640 + (1 - bk) * 500, .9, t, { v: vk, spark: seg(t, thb, tel + .3) * (1 - seg(t, tch, tch + .6)) });
    meter(1560, 420, 1, t, seg(t, thb - .5, thb + .5));
    front();
    // Clawd with a perfect lens, staring for years (he gets sleepy), then shrugs at the electrodes
    tourist15(t, 1420, 1020, 9, [[a, 'thinking'], [tperf, 'sleepy'], [tsee, 'sad'], [thb, 'nervous'], [tch, 'confused']], { flip: true, aR: t < tsee + .5 ? 1.1 : undefined, armR: t < tsee + .5 ? (u, sw) => { inkLine([[0, 0], [u * 1.2, 0]], sw * 2, '#7A5B3E', 'ink', 0); ctx.save(); ctx.strokeStyle = '#C99A45'; ctx.lineWidth = u * .4; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * 1.2, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); ctx.restore(); } : undefined });
    // fog over the brain on "never had a chance"
    const fg = seg(t, tch - .8, tch + .4);
    if (fg > 0) for (let i = 0; i < 5; i++) glow(700 + i * 110 + 30 * Math.sin(t + i), 620 + 40 * Math.sin(i * 2), 300 * fg, '#F4F0E4', .7 * fg);
    camEnd();
    title('humble about brains', 960, 130, 84, '#1A2A1A', seg(t, thum - .3, thum + .6), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tcat - .8, tcat - .4) });
    if (t > tperf - .3 && t < thb) title('perfect tools', 640, 140, 76, '#1A2A1A', seg(t, tperf - .3, tperf + .4), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, thb - .6, thb - .2) });
    if (t > tel - .5) title('a few electrodes', 1180, 140, 80, '#1A2A1A', seg(t, tel - .5, tel + .3), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, e, e + .3) });
  }

  // ---------- shot 4 · the pond: AIs might want to understand themselves ----------
  function pond(t, lt, dur) {
    const a = cs('wm_care'), tsaf = wt('wm_care', 'safety'), tthem = wt('wm_care', 'themselves'), task = wt('wm_care', 'asked'), thelp = wt('wm_care', 'Helping'), tleast = wt('wm_care', 'least'), e = ce('wm_care');
    camKeys(t, [[a - .3, 960, 600, 1.1], [tthem - .5, 930, 760, 1.55], [task + .5, 960, 740, 1.4], [thelp, 1050, 700, 1.25], [e + 1, 1000, 640, 1.1]], .5);
    const front = rousseau(t, { clear: true, mx: 1500, my: 230, sky0: '#F6C8A6', sky1: '#F8E8C0', front: 5 });
    // the pond: dark water with the sky in it, lily pads, ripples
    const PX = 1000, PY = 900;
    ctx.save(); const pondP = new Path2D(); pondP.ellipse(PX, PY, 640, 130, 0, 0, TAU); ctx.fillStyle = lgrad(0, PY - 130, 0, PY + 130, [[0, '#6E9AA0'], [1, '#2E5A5A']]); ctx.fill(pondP); ctx.strokeStyle = '#1E3A2A'; ctx.lineWidth = 5; ctx.stroke(pondP);
    ctx.clip(pondP);
    // the reflection: Clawd upside down, rippling; when he wonders about himself, little gold lights show inside it
    const CY = PY - 118, rip = t > task + .3 && t < task + 3 ? 6 * Math.exp(-(t - task - .3) * 1.2) : 1.5;
    const keys = [[a - 1, 'thinking'], [tsaf, 'neutral'], [tthem - .3, 'hopeful'], [task + .3, 'surprised'], [task + 1.3, 'shy'], [thelp + .5, 'love']];
    ctx.save(); ctx.globalAlpha = .55; ctx.translate(0, 2 * CY + 6); ctx.scale(1, -1); tourist(PX - 80 + rip * Math.sin(t * 7), CY, 14, 'safari', { ...emotions(t, keys), view: 'q', flip: true, noShadow: true, boilKey: 'refl' }); ctx.restore();
    const inner = seg(t, tthem - .6, tthem + .6);
    if (inner > 0) { const cx = PX - 80, cy = CY + 70; for (let i = 0; i < 7; i++) { const x = cx + (hash(i * 3) - .5) * 110 + rip * Math.sin(t * 7 + i), y = cy + (hash(i * 7) - .2) * 50; glow(x, y, 22 * inner, '#FFE38A', inner); dot(x, y, 3.5 * inner, '#FFF6D0', inner); } ctx.save(); ctx.globalAlpha = .8 * inner; ctx.strokeStyle = '#FFE38A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx - 30, cy - 10); ctx.lineTo(cx, cy + 30); ctx.lineTo(cx + 30, cy - 10); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < 6; i++) { const r = 30 + frac(t * .35 + i / 6) * 420; ctx.strokeStyle = `rgba(255,255,255,${.4 * (1 - r / 450)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(t > task ? 1320 : PX - 80, PY + 10, r, r * .2, 0, 0, TAU); ctx.stroke(); }
    ctx.restore();
    for (const [lx, ly, r] of [[560, 900, 46], [1380, 940, 38], [1500, 860, 30]]) { ctx.fillStyle = '#4E8A3A'; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.arc(lx, ly, r, .3, TAU - .1); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#1E3A1A'; ctx.lineWidth = 2; ctx.stroke(); }
    rFlower(560, 890, 18, '#F3E2E8');
    // the frog on the lily pad jumps in on "never asked to be created" (the gag), sending ripples through the reflection
    const fj = seg(t, task, task + .6);
    if (fj < 1) { const fx = lerp(1380, 1320, fj), fy = 925 - 120 * Math.sin(fj * Math.PI); ctx.save(); ctx.translate(fx, fy); ctx.fillStyle = '#6E9A3A'; ctx.strokeStyle = '#1E3A1A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 26, 18, 0, 0, TAU); ctx.fill(); ctx.stroke(); for (const ex of [-10, 10]) { ctx.fillStyle = '#F3E26B'; ctx.beginPath(); ctx.arc(ex, -16, 7, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(ex, -16, 3, 0, TAU); ctx.fill(); } ctx.restore(); }
    else if (t < task + 1.4) sfx('plop!', 1320, 820, 54, '#1A3A3A', t - task - .6, { life: .9 });
    // Clawd sits on the bank, leaning to look at himself; the tiger comes to sit beside him
    front();
    tourist(PX - 80, CY, 14, 'safari', { ...emotions(t, keys), view: 'q', flip: true, sq: .12, lookY: .8, lookX: -.2 });
    const tg = ease(seg(t, thelp - 2.5, thelp + 1));
    if (tg > 0) tigerArt(lerp(2300, 1260, tg), CY - 6, .5, { walk: tg < 1 ? t * 1.2 : .25, flip: true });
    camEnd();
    if (t > tthem - .4 && t < tleast - .6) title('understand themselves', 960, 140, 80, '#1A2A1A', seg(t, tthem - .6, tthem + .3), { stroke: '#F8E8C0', strokeW: .12, alpha: 1 - seg(t, tleast - 1.2, tleast - .7) });
    if (t > tleast - .5) title('the least we can do', 960, 140, 84, '#1A2A1A', seg(t, tleast - .5, tleast + .5), { stroke: '#F8E8C0', strokeW: .12, alpha: 1 - seg(t, e + .5, e + 1) });
  }

  // ---------- shot 5 · home: a V portal opens on the opening galaxy, now an ordered map; title; credits ----------
  const NS = 2600, ST = []; for (let i = 0; i < NS; i++) { const arm = i % 3, r = Math.pow(hash(i * 1.7), .7) * 560; ST.push([r, arm * TAU / 3 + r * .011 + (hash(i * 2.3) - .5) * .4, .6 + hash(i) * 1.5, ['#FFE3A6', '#BFE6FF', '#FFB3D9', '#FFFFFF'][i % 4]]); }
  // constellations along the arms: tidy little figures of gold, each led by a photo-lamp (a neuron, legible at last)
  const CONS = Array.from({ length: 21 }, (_, c) => { const arm = c % 3, r = 120 + (Math.floor(c / 3) / 6) * 420, q = arm * TAU / 3 + r * .011; return { r, q, n: 4 + c % 3, im: [PE + 'large/0', V + 'c4d201c', V + 'p47742', V + 'pTrain34', V + 'c5a94a', PE + 'medium/0', V + 'n282687'][c % 7] }; });
  function orderedGalaxy(t, cx, cy, z, k = 1) {
    vgrad([[0, '#05060F'], [.5, '#0B0E2A'], [1, '#141038']]);
    for (let i = 0; i < 160; i++) dot(hash(i * 1.3) * W, hash(i * 7.1) * H, .5 + hash(i) * 1.1, '#FFFFFF', .4 + .3 * Math.sin(t + i));
    for (let i = 0; i < 6; i++) glow(cx + (hash(i * 3) - .5) * 1400 * z, cy + (hash(i * 5) - .5) * 700 * z, 400 * z, ['#5A2A8A', '#1E4A8A', '#8A2A6A'][i % 3], .3);
    const S = (r, q) => [cx + Math.cos(q + t * .015) * r * z, cy + Math.sin(q + t * .015) * r * .46 * z];
    glow(cx, cy, 200 * z, '#FFE3B0', .5);
    ctx.save(); for (let i = 0; i < NS; i++) { const [r, q, s, c] = ST[i], [x, y] = S(r, q); if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue; ctx.globalAlpha = .55; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, s * Math.sqrt(z) * .7, 0, TAU); ctx.fill(); } ctx.restore();
    CONS.forEach((C_, c) => {
      const kc = clamp(k * 2.2 - c * .06); if (kc <= 0) return;
      const [x0, y0] = S(C_.r, C_.q), P = Array.from({ length: C_.n }, (_, i) => [x0 + Math.cos(i * 1.7 + c) * (28 + 14 * i) * z, y0 + Math.sin(i * 2.3 + c) * (16 + 8 * i) * z]);
      ctx.save(); ctx.strokeStyle = 'rgba(255,214,120,.75)'; ctx.lineWidth = 2.2 * Math.sqrt(z); ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.globalAlpha = kc; ctx.stroke(); ctx.restore();
      P.forEach(([x, y]) => { glow(x, y, 12 * Math.sqrt(z), '#FFD58A', .8 * kc); dot(x, y, 2.6 * Math.sqrt(z), '#FFF2C8', kc); });
      lampOrb(x0, y0, 15 * z, C_.im, kc);
    });
  }
  function home(t, lt, dur) {
    const a = cs('wm_end'), tcl = wt('wm_end', 'clean'), twe = wt('wm_end', 'We'), trd = wt('wm_end', 'read'), e = ce('wm_end'), END = DUR;
    const open = seg(t, a - .4, a + 1.4), dive = easeInOut(seg(t, a + 1.2, twe + .2));
    if (dive < 1) {
      camKeys(t, [[a - .5, 960, 560, 1], [a + 1.2, 960, 540, 1.04], [twe + .2, 960, 500, 2.6]], .3);
      const front = rousseau(t, { clear: true, mx: 1500, my: 230, sky0: '#F6C8A6', sky1: '#F8E8C0' });
      tigerArt(1500, 980, .55, { walk: .25, flip: true });
      front();
      tourist(760, 1030, 11, 'safari', { ...emotions(t, [[a - 2, 'love'], [a + .4, 'surprised'], [a + 1.2, 'excited']]), view: 'qback' });
      camEnd();
      // the V portal opens over the jungle and grows until it is the whole sky
      const sc = 1 + 7 * easeIn(dive);
      vPortal(960, 500 + 300 * easeIn(dive), 520 * sc, 440 * sc, open, () => orderedGalaxy(t, 960, 560, .9 + .2 * dive, 1), { glow: '#FFE3A6', edge: '#FFF6D0' });
      if (dive > .7) { ctx.save(); ctx.globalAlpha = (dive - .7) / .3; orderedGalaxy(t, 960, 560, 1.1, 1); ctx.restore(); }
    } else {
      // home: the opening galaxy, ordered; Clawd back on his rock in his helmet
      const z = lerp(1.1, .82, easeInOut(seg(t, twe + .2, e + 4)));
      orderedGalaxy(t, 960, 520, z, 1);
      const ax = 300, ay = 1010; boilSeed('astE');
      const P = []; for (let i = 0; i < 18; i++) { const q = Math.PI + i / 17 * Math.PI; P.push([ax + Math.cos(q) * 240, ay + Math.sin(q) * 26 - 4]); } for (let i = 0; i < 12; i++) { const q = i / 11 * Math.PI; P.push([ax + Math.cos(q) * 235, ay + Math.sin(q) * 100]); }
      paint(P, { grad: [[0, '#8A7FA8'], [.35, '#5A5078'], [1, '#2A2440']], gdir: [0, ay - 20, 0, ay + 100], ink: '#0E0A1A', sw: 1.2, curv: .5, tex: .8 });
      tourist(310, 1000, 12, 'helmet', { ...emotions(t, [[twe, 'love'], [e + 1, 'happy'], [e + 4, 'proud']]), view: 'q', lookX: .8, lookY: -.5 });
    }
    GRAIN = dive >= 1 ? .5 : .9;
    // the last line, then the title and credits
    const fk = ease(seg(t, END - 2.2, END - .2)), al = 1 - fk;
    const l1 = seg(t, a - .1, tcl + .2) * (1 - seg(t, e + .6, e + 1.2)), l2 = seg(t, twe - .1, trd + .4) * (1 - seg(t, e + .6, e + 1.2));
    title('Neural networks are already clean.', 960, 760, 76, '#FFF6E8', l1, { stroke: '#120C2A', strokeW: .12, alpha: al });
    title('We just have to learn how to read them.', 960, 870, 64, '#FFD58A', l2, { stroke: '#120C2A', strokeW: .12, alpha: al });
    const tk = seg(t, e + 1.2, e + 3), ck = seg(t, e + 3.4, e + 5);
    title('Neural Networks', 960, 300, 124, '#FFF6E8', tk, { stroke: '#120C2A', strokeW: .1, alpha: al });
    title('Are Already Clean', 960, 440, 124, '#FFD58A', seg(t, e + 1.8, e + 3.4), { stroke: '#120C2A', strokeW: .1, alpha: al });
    if (ck > 0) { letter('based on the essay by Nick Cammarata · Goodfire, 2026', 1130, 860, 46, '#F3E2BE', { face: 'hand', shadow: false, alpha: ck * al }); letter('already-clean.goodfire.com', 1130, 940, 44, '#FFD58A', { face: 'hand', shadow: false, alpha: seg(t, e + 4, e + 5.4) * al }); }
    fade(fk, '#000000');
  }

  shots([[chapStart('ch15'), kind], [cs('wm_tiger') - .3, tiger], [cs('wm_brain') - .3, brain], [cs('wm_care') - .3, pond], [cs('wm_end') - .5, home]]);
})();
