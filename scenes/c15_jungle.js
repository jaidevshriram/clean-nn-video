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
  // a deer seen over its shoulder (lower left, out of focus): the back of its neck and head, one big ear cupped toward
  // the tiger, the muzzle in profile pointing into the scene, and branching antlers
  function deerHead(x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(.04 * Math.sin(t * .8)); ctx.filter = 'blur(2.5px)';
    const OUT = '#3A2410', fur = '#A8703C', furL = '#D2A06A', furD = '#7A4E28';
    // antlers first (behind the head): a main beam sweeping back and up, three tines each
    const antler = (bx, by, dir, sc) => { ctx.save(); ctx.translate(bx, by); ctx.scale(dir * sc, sc); const beam = [[0, 0], [-14, -90], [10, -180], [60, -250]]; const T_ = [[[-10, -70], [-70, -110], [-90, -150]], [[2, -150], [-30, -220], [-34, -270]], [[30, -215], [40, -280], [30, -320]]];
      for (const [P, w] of [[beam, [20, 15, 11, 6]], ...T_.map(q => [q, [10, 7, 4]])]) fillPath(pathOf(taper(P, w)), lgrad(0, 0, 0, -300, [[0, '#6A4A2A'], [1, '#C9A87A']]), OUT, 3); ctx.restore(); };
    antler(-36, -92, -1, .9); antler(30, -98, 1, 1);
    // neck rising from the bottom-left corner
    fillPath(pathOf([[-240, 460], [-150, 120], [-80, 10], [70, -10], [120, 80], [90, 460]]), lgrad(0, -10, 0, 460, [[0, fur], [1, furD]]), OUT, 4);
    ctx.strokeStyle = 'rgba(60,30,10,.35)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-120 + i * 34, 120 + i * 30); ctx.quadraticCurveTo(-90 + i * 34, 220, -110 + i * 36, 320); ctx.stroke(); }
    // the head, three-quarter from behind, muzzle pointing right
    ctx.save(); ctx.scale(.84, 1);
    const head = new Path2D(); head.moveTo(-86, -20); head.bezierCurveTo(-100, -100, 20, -130, 80, -84); head.bezierCurveTo(140, -70, 196, -40, 214, -6); head.bezierCurveTo(222, 12, 206, 24, 186, 22); head.bezierCurveTo(130, 20, 90, 40, 60, 60); head.bezierCurveTo(10, 80, -80, 60, -86, -20); head.closePath();
    fillPath(head, lgrad(-80, -100, 200, 40, [[0, furD], [.45, fur], [1, furL]]), OUT, 4);
    fillPath(pathOf([[196, -10], [214, -6], [220, 8], [204, 18], [190, 10]]), '#2A1A10', OUT, 2);   // the nose
    ctx.fillStyle = 'rgba(255,240,220,.6)'; ctx.beginPath(); ctx.ellipse(150, 16, 40, 9, -.15, 0, TAU); ctx.fill();   // pale jaw line
    ctx.restore();
    // the near ear, cupped toward the tiger, and the far ear's tip
    for (const [ex, ey, rot, sc] of [[60, -110, .5 + .06 * Math.sin(t * 3), .75], [-40, -70, -.6 + .05 * Math.sin(t * 3 + 1), 1]]) { ctx.save(); ctx.translate(ex, ey); ctx.rotate(rot); ctx.scale(sc, sc); const E = new Path2D(); E.moveTo(0, 20); E.bezierCurveTo(-60, -10, -50, -120, 0, -150); E.bezierCurveTo(50, -120, 60, -10, 0, 20); E.closePath(); fillPath(E, fur, OUT, 4); const I = new Path2D(); I.moveTo(0, 0); I.bezierCurveTo(-34, -20, -28, -100, 0, -124); I.bezierCurveTo(28, -100, 34, -20, 0, 0); I.closePath(); fillPath(I, '#F2D2B0'); ctx.restore(); }
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
    // electrodes (o.el fades them in)
    const E = [[-170, -190], [30, -245], [200, -160]], el = o.el ?? 1, J = (o.jacks || []).map(([jx, jy]) => [(jx - x) / s, (jy - y) / s]);
    if (el > 0) { ctx.globalAlpha *= el; } if (el > 0) E.forEach(([ex, ey], i) => { const sp = (o.spark || 0) * (Math.sin(t * 30 + i * 2) > .3 ? 1 : 0), [jx, jy] = J[i] || [520, -560 + i * 30]; ctx.lineCap = 'round'; ctx.strokeStyle = '#2A2A33'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.bezierCurveTo(ex, ey - 160 + i * 20, jx - 260, jy + 40 - i * 30, jx, jy); ctx.stroke(); ctx.strokeStyle = ['#C2302A', '#3A64B8', '#E8AA38'][i]; ctx.lineWidth = 5; ctx.stroke(); fillPath((() => { const p = new Path2D(); p.ellipse(ex, ey, 14, 10, 0, 0, TAU); return p; })(), '#C9A15A', '#3A2A1A', 3); if (sp) glow(ex, ey, 60, '#BFE6FF', 1); });
    ctx.restore();
  }
  // the network the V neuron really lives in: a painted signboard on an easel, three layers of nodes, the V one aglow
  function netCard(x, y, s, t, k, vk) {
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * backOut(k), s * backOut(k));
    // the easel: two front legs and a back leg, a crossbar, a peg ledge the board rests on, and a top clamp
    const leg = (x0, y0, x1, y1, w) => { ctx.strokeStyle = '#2A1A10'; ctx.lineWidth = w + 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = '#8A5A2E'; ctx.lineWidth = w; ctx.stroke(); };
    leg(0, -250, 0, 420, 12); leg(-120, -270, -230, 440, 16); leg(120, -270, 230, 440, 16);
    leg(-196, 300, 196, 300, 10);
    fillPath(pathOf(rrPts(-60, -272, 120, 30, 6)), '#8A5A2E', '#2A1A10', 4);
    fillPath(pathOf(rrPts(-290, -230, 580, 400, 16)), '#6A4422', '#2A1A10', 5); fillPath(pathOf(rrPts(-266, -206, 532, 352, 10)), '#F4EED8', '#2A1A10', 3);
    const L = [[-180, [-130, -50, 30, 110]], [0, [-90, 10, 90]], [180, [-130, -50, 30, 110]]], Q = L.map(([lx, ys]) => ys.map(yy => [lx, yy - 30]));
    ctx.strokeStyle = 'rgba(58,58,68,.55)'; ctx.lineWidth = 3; for (let l = 0; l < 2; l++) for (const p of Q[l]) for (const q of Q[l + 1]) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
    fillPath(pathOf(rrPts(-320, 168, 640, 26, 6)), '#8A5A2E', '#2A1A10', 4); for (const px of [-250, 250]) fillPath(pathOf(rectPts(px - 10, 150, 20, 22)), '#6A4422', '#2A1A10', 3);   // the ledge and its pegs
    Q.forEach((col, l) => col.forEach(([nx, ny], i) => { const hot = l === 1 && i === 1; if (hot) glow(nx, ny, 120, '#FFE38A', .8 * vk); fillPath((() => { const p = new Path2D(); p.arc(nx, ny, hot ? 40 : 20, 0, TAU); return p; })(), hot ? mixCol('#E8C27A', '#FFE38A', vk) : '#7A9A6A', '#2A1A10', 3);
      if (hot && vk > 0) { ctx.save(); ctx.globalAlpha = vk; ctx.strokeStyle = '#8A4A10'; ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-18, ny - 14); ctx.lineTo(0, ny + 16); ctx.lineTo(18, ny - 14); ctx.stroke(); ctx.restore(); } }));
    ctx.restore();
  }
  // a little brass meter box the electrodes run to: three needles that only twitch, a paper strip of scribbles
  const JACKS = (x, y, s) => [-60, 0, 60].map(dy => [x - 168 * s, y + dy * s]);   // the meter's three input jacks, in world space
  function meter(x, y, s, t, k = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    fillPath(pathOf(rrPts(-150, -110, 300, 220, 18)), lgrad(0, -110, 0, 110, [[0, '#C99A45'], [1, '#8C6524']]), '#3A2A1A', 4);
    [-60, 0, 60].forEach((dy, i) => { fillPath(pathOf(rrPts(-176, dy - 16, 30, 32, 6)), '#5A4A3A', '#3A2A1A', 3); fillPath(pathOf(rrPts(-186, dy - 9, 18, 18, 4)), ['#C2302A', '#3A64B8', '#E8AA38'][i], '#3A2A1A', 2.5); });
    for (const [sx, sy] of [[-134, -94], [134, -94], [-134, 94], [134, 94]]) { fillPath((() => { const p = new Path2D(); p.arc(sx, sy, 6, 0, TAU); return p; })(), '#E9D3A9', '#3A2A1A', 2); }
    for (let i = 0; i < 3; i++) { const cx = -90 + i * 90; fillPath((() => { const p = new Path2D(); p.arc(cx, -40, 36, 0, TAU); return p; })(), '#F4EED8', '#3A2A1A', 3); const a = -Math.PI / 2 + (Math.sin(t * 13 + i * 2) * .5 + Math.sin(t * 31 + i) * .2) * k; ctx.strokeStyle = '#C2302A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, -40); ctx.lineTo(cx + Math.cos(a) * 30, -40 + Math.sin(a) * 30); ctx.stroke(); }
    ctx.fillStyle = '#F4EED8'; ctx.fillRect(-130, 20, 260, 70); ctx.strokeStyle = '#2A2A33'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 52; i++) { const xx = -130 + i * 5, yy = 55 + (hash(i * 3.7 + Math.floor(t * 12)) - .5) * 50 * k; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke();
    ctx.restore();
  }
  // deer vision: a red-green dichromat sees orange and green as the same olive (a post pass, k blends)
  function fxDeer(k) { if (k <= 0) return; POST.push(() => { const d = ctx.getImageData(0, 0, W, H), D = d.data; for (let i = 0; i < D.length; i += 4) { const r = D[i], g = D[i + 1], b = D[i + 2], y = r * .45 + g * .55; const yb = y * .62 + b * .38; D[i] = r + (y * .9 - r) * k; D[i + 1] = g + (y * .95 - g) * k; D[i + 2] = b + (yb * .7 - b) * k; } ctx.putImageData(d, 0, 0); }); }
  const gold = (x, y, k, s = 1) => { if (k <= 0) return; const p = backOut(k); glow(x, y, 60 * s * p, '#FFE38A', .8 * k); ctx.save(); ctx.translate(x, y); ctx.scale(p * s, p * s); ctx.strokeStyle = '#FFF6D0'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#E8A020'; ctx.shadowBlur = 16; ctx.beginPath(); ctx.moveTo(-18, 2); ctx.lineTo(-4, 16); ctx.lineTo(22, -16); ctx.stroke(); ctx.restore(); };
  // a prop in Clawd's right hand, drawn in front of him (the q view paints that arm, and its armR hook, behind the body)
  const inHand = (aR, prop, level = 1) => (u, sw) => { push(); translate((5 + .55 * clamp((Math.abs(aR) - .7) / .9)) * u, -4.5 * u); rotate(-aR); translate(2.2 * u, 0); rotate(aR * level); prop(u, sw); pop(); };
  const tourist15 = (t, x, y, u, keys, extra = {}) => tourist(x, y, u, 'safari', { ...emotions(t, keys), view: 'q', ...extra });

  // ---------- shot 1 · a change in kind: one process made all of them ----------
  function kind(t, lt, dur) {
    const s0 = chapStart('ch15'), a = cs('wm_kind'), tk = wt('wm_kind', 'kind'), tdes = wt('wm_kind', 'intelligent'), tnat = wt('wm_kind', 'natural'), tmore = wt('wm_kind', 'more'), tani = wt('wm_kind', 'animals'), treal = wt('wm_kind', 'realizing'), tall = wt('wm_kind', 'all'), tgen = wt('wm_kind', 'generalization'), todds = wt('wm_kind', 'odds'), e = ce('wm_kind');
    camKeys(t, [[s0, 960, 560, 1.12], [a + 1, 940, 540, 1.04], [tk, 960, 540, 1], [tmore, 960, 520, .96], [e + .3, 900, 560, 1.02]], .5);
    const front = rousseau(t, { clear: true, mx: 1560, my: 190, ...SKY });
    // creatures appear one by one ("more and more animals")
    const pop = i => popk(t, tmore - .3 + i * .45, .5);
    if (pop(0) > 0) { ctx.save(); const k = backOut(pop(0)); ctx.translate(1620, 420); ctx.scale(k, k); toucan(0, 0, 1.3, t); ctx.restore(); }
    [[300, 300, '#4A8AD0'], [1250, 360, '#E8A02A'], [700, 260, '#D2473F']].forEach(([x, y, c], i) => { if (pop(1 + i) > 0) butterfly(x, y, .8 * backOut(pop(1 + i)), t, c); });
    if (pop(4) > 0) snake(140, -20, 420 * easeOut(pop(4)), t);
    // the tiger strolls in
    const tx = lerp(-500, 820, easeOut(seg(t, s0 + .5, tani + 1)));
    tigerArt(tx, 930, 1.05, { walk: (tx + 500) / 240 });   // the legs cycle with the distance covered, so the paws never slide
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
      // natural selection arrives and strikes intelligent design out (the struck words fade so the red line reads through them)
      const ks = seg(t, tnat - .1, tnat + .4);
      title('intelligent design', 960, 130, 76, '#5A3A2A', seg(t, tdes - .3, tdes + .5), { stroke: '#F4E6B8', strokeW: .12, alpha: al * (1 - .6 * ks) });
      if (ks > 0) { ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = '#C2302A'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(600, 140); ctx.lineTo(lerp(600, 1320, ks), 124); ctx.stroke(); ctx.restore(); }
      title('natural selection', 960, 240, 92, '#1A4A1A', seg(t, tnat - .1, tnat + .7), { stroke: '#F4E6B8', strokeW: .12, alpha: al });
    }
    // the process here: generalization; and Nick's odds on it
    if (t > tgen - .4) title('generalization', 960, 140, 100, '#1A4A1A', seg(t, tgen - .4, tgen + .5), { stroke: '#F4E6B8', strokeW: .12 });
    if (t > todds - .4) title("Nick's odds: maybe 85%", 960, 260, 72, '#5A3A2A', seg(t, todds - .4, todds + .4), { stroke: '#F4E6B8', strokeW: .12 });
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
    tigerArt(tx, 930, 1.05, { walk: (tx + 500) / 240, deer: dv });
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

  // ---------- shot 3 · humble about brains: far better tools than any brain scientist's couldn't see it; a few electrodes never would ----------
  function brain(t, lt, dur) {
    const a = cs('wm_brain'), thum = wt('wm_brain', 'humble'), tcat = wt('wm_brain', 'cat'), tperf = wt('wm_brain', 'tools'), tsee = wt('wm_brain', 'see'), thb = wt('wm_brain', 'human'), tel = wt('wm_brain', 'electrodes'), tch = wt('wm_brain', 'chance'), trd = wt('wm_brain', 'reading'), e = ce('wm_brain');
    camKeys(t, [[a - .3, 960, 560, 1.15], [thum, 960, 540, 1.02], [tcat, 920, 540, 1.1], [tsee, 960, 540, 1.0], [thb, 1080, 480, 1.0], [tel, 1180, 470, 1.08], [e + .3, 1060, 520, 1.0]], .5);
    const front = rousseau(t, { clear: true, mx: 1560, my: 190, ...SKY, front: 5 });
    // the brain rises out of the leaves like a great pink fruit
    // the V lives in a network: while Nick stares at it, the brain steps aside for the signboard; "if a neuron like that
    // turned up in a human brain", the V flies from the board into the brain
    const tif = wt('wm_brain', 'If'), bk = backOut(seg(t, a, a + 1.4)), sk = ease(seg(t, tcat - .9, tcat - .2)) * (1 - ease(seg(t, tif - .3, tif + .5)));
    const ck = seg(t, tcat - .6, tcat) * (1 - seg(t, tel - .6, tel - .1)), cm = ease(seg(t, tif - .3, tif + .5)), cx = lerp(900, 330, cm), cy = lerp(520, 380, cm), csz = lerp(1, .5, cm);
    const vn = env(t, tcat - .3, thb + .3, .5, .3) * (.75 + .25 * Math.sin(t * 7)), fly = seg(t, thb - .3, thb + .4);
    const vk = env(t, thb + .2, tch + .4, .4, .8) * (.75 + .25 * Math.sin(t * 7));
    const elk = seg(t, tel - .5, tel + .2);   // the electrodes, their wires and the meter arrive on "a few electrodes"
    brainArt(900, 640 + (1 - bk) * 500 + sk * 760, .9, t, { jacks: JACKS(1560, 420, 1), v: vk, el: elk, spark: seg(t, tel, tel + .3) * (1 - seg(t, tch, tch + .6)) });
    netCard(cx, cy, .85 * csz, t, ck, vn);
    if (fly > 0 && fly < 1) { const f = easeInOut(fly), p = arcPt([cx, cy - 26 * csz], [900, 620], 160, f); glow(p[0], p[1], 90, '#FFE38A', .9); ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(lerp(.4, 1, f), lerp(.4, 1, f)); ctx.shadowColor = '#FFD84A'; ctx.shadowBlur = 30; ctx.strokeStyle = '#FFE38A'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-60, -60); ctx.lineTo(0, 40); ctx.lineTo(60, -60); ctx.stroke(); ctx.restore(); }
    if (elk > 0) { ctx.save(); ctx.globalAlpha = elk; meter(1560, 420, 1, t, 1); ctx.restore(); }
    front();
    // Clawd with a fine lens, staring for years (he gets sleepy), then shrugs at the electrodes
    tourist15(t, 1400, 1010, 15, [[a, 'thinking'], [tperf, 'sleepy'], [tsee, 'sad'], [thb, 'nervous'], [tch, 'confused']], { flip: true, aR: t < tsee + .5 ? 1.1 : undefined, draw: t < tsee + .5 ? inHand(1.1, (u, sw) => { inkLine([[0, 0], [u * 1.2, 0]], sw * 2, '#7A5B3E', 'ink', 0); ctx.save(); ctx.strokeStyle = '#C99A45'; ctx.lineWidth = u * .4; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * 1.2, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = u * .18; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * .8, Math.PI * 1.1, Math.PI * 1.45); ctx.stroke(); ctx.restore(); }, 0) : undefined });
    // fog over the brain on "never had a chance"
    const fg = seg(t, tch - .8, tch + .4);
    if (fg > 0) for (let i = 0; i < 5; i++) glow(700 + i * 110 + 30 * Math.sin(t + i), 620 + 40 * Math.sin(i * 2), 300 * fg, '#F4F0E4', .7 * fg);
    camEnd();
    title('humble about brains', 960, 130, 84, '#1A2A1A', seg(t, thum - .3, thum + .6), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tcat - .8, tcat - .4) });
    if (t > tperf - .3 && t < tif) title('far better tools than any brain scientist', 960, 140, 64, '#1A2A1A', seg(t, tperf - .3, tperf + .6), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tif - .7, tif - .3) });
    if (ck > 0 && t < tperf - .2) title('the V neuron, in a network', cx, cy - 265 * csz, 56, '#1A2A1A', seg(t, tcat - .2, tcat + .6), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tperf - .6, tperf - .2) });
    if (t > tif - .2 && t < tel - .5) title('if it were in a human brain…', 960, 140, 64, '#1A2A1A', seg(t, tif - .2, thb + .3), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, tel - .9, tel - .5) });
    if (t > tel - .5) title('a few electrodes', 1180, 140, 80, '#1A2A1A', seg(t, tel - .5, tel + .3), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, trd - 1.2, trd - .8) });
    if (t > trd - .9) title('"cats and cars"? almost no weight', 1100, 140, 68, '#1A2A1A', seg(t, trd - .9, trd - .1), { stroke: '#F4E6B8', strokeW: .12, alpha: 1 - seg(t, e, e + .3) });
  }

  // ---------- shot 4 · the pond: AIs might want to understand themselves ----------
  function pond(t, lt, dur) {
    const a = cs('wm_care'), tsaf = wt('wm_care', 'safety'), tthem = wt('wm_care', 'themselves'), task = wt('wm_care', 'asked'), thelp = wt('wm_care', 'essay'), tleast = wt('wm_care', 'least'), tnev = wt('wm_care', 'they', 1), e = ce('wm_care');
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
    // the tiger's reflection once it reaches the bank
    const tg = ease(seg(t, thelp - 2.5, thelp + 1)), tgx = lerp(2300, 1260, tg), tgw = (2300 - tgx) / 115;
    if (tg > 0) { ctx.save(); ctx.globalAlpha = .5; ctx.translate(rip * .6 * Math.sin(t * 6 + 1), 2 * (CY - 6) + 6); ctx.scale(1, -1); tigerArt(tgx, CY - 6, .5, { walk: tgw, flip: true }); ctx.restore(); }
    // the water over the reflections: they sink into the pond's colour (painted marks ignore alpha, so tint them instead)
    ctx.save(); ctx.globalAlpha = .42; ctx.fillStyle = lgrad(0, PY - 130, 0, PY + 130, [[0, '#6E9AA0'], [1, '#2E5A5A']]); ctx.fill(pondP); ctx.restore();
    for (let i = 0; i < 9; i++) { const yy = PY - 100 + i * 24, ph = t * 2 + i; ctx.strokeStyle = 'rgba(220,240,240,.28)'; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const xx = PX - 640 + k * 64; ctx.lineTo(xx, yy + Math.sin(ph + k * .9) * (1.5 + rip * .5)); } ctx.stroke(); }
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
    if (tg > 0) tigerArt(tgx, CY - 6, .5, { walk: tgw, flip: true });
    camEnd();
    if (t > tthem - .4 && t < thelp) title('understand themselves', 960, 140, 80, '#1A2A1A', seg(t, tthem - .6, tthem + .3), { stroke: '#F8E8C0', strokeW: .12, alpha: 1 - seg(t, thelp - .6, thelp - .2) });
    // the essay's own words, marked as a quote
    if (t > tnev - .3 && t < tleast - .3) title('"they never asked to be created…"', 960, 140, 76, '#1A2A1A', seg(t, tnev - .3, tnev + .8), { stroke: '#F8E8C0', strokeW: .12, alpha: 1 - seg(t, tleast - .8, tleast - .4) });
    if (t > tleast - .7) { const qa = 1 - seg(t, e + .5, e + 1); title('"…and this is the least we can do"', 960, 140, 76, '#1A2A1A', seg(t, tleast - .7, tleast + .4), { stroke: '#F8E8C0', strokeW: .12, alpha: qa }); title('— the essay', 1300, 236, 52, '#5A3A2A', seg(t, tleast - .2, tleast + .4), { stroke: '#F8E8C0', strokeW: .12, alpha: qa }); }
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
    // a soft dark pool under the lettering, so the title and the last lines never sit on bright constellation lines
    { const dl = Math.max(seg(t, a - .1, tcl + .2) * (1 - seg(t, e + 1.8, e + 2.4)), 0) * (dive >= 1 ? 1 : dive), dt = seg(t, e + 2, e + 3.4); const pool = (cx, cy, rx, ry, k) => { if (k <= 0) return; ctx.save(); resetMatrix(); ctx.translate(cx, cy); ctx.scale(rx / ry, 1); const g = ctx.createRadialGradient(0, 0, 0, 0, 0, ry); g.addColorStop(0, `rgba(5,6,18,${.72 * k})`); g.addColorStop(.6, `rgba(5,6,18,${.5 * k})`); g.addColorStop(1, 'rgba(5,6,18,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, ry, 0, TAU); ctx.fill(); ctx.restore(); };
      pool(1100, 750, 900, 170, dl); pool(960, 370, 900, 230, dt); pool(1130, 900, 700, 120, seg(t, e + 4.4, e + 5.6)); }
    // the last line, then the title and credits
    const fk = ease(seg(t, END - 2.2, END - .2)), al = 1 - fk;
    const l1 = seg(t, a - .1, tcl + .2) * (1 - seg(t, e + 1.8, e + 2.4)), l2 = seg(t, twe - .1, twe + .7) * (1 - seg(t, e + 1.8, e + 2.4));
    title('Neural networks are already clean.', 1100, 700, 76, '#FFF6E8', l1, { stroke: '#120C2A', strokeW: .12, alpha: al });
    title('We just have to learn how to read them.', 1100, 800, 64, '#FFD58A', l2, { stroke: '#120C2A', strokeW: .12, alpha: al });
    const tk = seg(t, e + 2.4, e + 4.2), ck = seg(t, e + 4.6, e + 6.2);
    title('Neural Networks', 960, 300, 124, '#FFF6E8', tk, { stroke: '#120C2A', strokeW: .1, alpha: al });
    title('Are Already Clean', 960, 440, 124, '#FFD58A', seg(t, e + 3, e + 4.6), { stroke: '#120C2A', strokeW: .1, alpha: al });
    if (ck > 0) { letter('based on the essay by Nick Cammarata · Goodfire, 2026', 1130, 860, 46, '#F3E2BE', { face: 'hand', shadow: false, alpha: ck * al }); letter('already-clean.goodfire.com', 1130, 940, 44, '#FFD58A', { face: 'hand', shadow: false, alpha: seg(t, e + 5.2, e + 6.6) * al }); }
    fade(fk, '#000000');
  }

  shots([[chapStart('ch15'), kind], [cs('wm_tiger') - .3, tiger], [cs('wm_brain') - .3, brain], [cs('wm_care') - .3, pond], [cs('wm_end') - .5, home, { fade: .8 }]]);
})();
