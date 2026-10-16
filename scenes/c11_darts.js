// ch11 Explanations that can lose: PUB DARTS WITH SPORTS-BROADCAST GRAPHICS.
// A torn page from the pop-up book arrives as a dart flight; Clawd's "Texas sharpshooter" gag (making up stories);
// the Knot's vague sponge-dart ("a multi-purpose language neuron") smothers the board and the referee shows red;
// split-screen booths for the blind test; a slow-mo bullseye that beats ten billion grey darts of real text (180!);
// match stats 76 / 11 / 1 %; the Knot's "cats and cars" dart passes tests; a broadcast history corner: Newton and
// Mercury's precessing orbit; the winning dart flies out of the pub window and lands as a seed in golden grass.
(() => {
  const F = '"Inter", sans-serif';
  const BX = 860, BY = 470, BR = 290;            // the dartboard on the pub wall (double ring outer radius)
  const NUMS = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  const NAVY = '#0C1640', RED = '#D2473F', YEL = '#FFE34A';
  const bp = (seg, r) => { const a = -Math.PI / 2 + seg * TAU / 20; return [BX + Math.cos(a) * r * BR, BY + Math.sin(a) * r * BR]; };
  const CH = chapStart('ch11'), NEXT = chapStart('ch12');

  // ---------- the pub ----------
  function pubWall() {
    layer('c11pub', () => {
      ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3E2818'], [.8, '#2E1C10'], [1, '#22150C']]); ctx.fillRect(-200, -200, W + 400, H + 400);
      for (let i = -2; i < 14; i++) { const x = i * 160; flat(rectPts(x, -200, 154, 1100), i % 2 ? '#43291A' : '#3A2416'); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x + 150, -200, 6, 1100); for (let k = 0; k < 5; k++) { ctx.strokeStyle = 'rgba(20,10,4,.25)'; ctx.lineWidth = 2; ctx.beginPath(); const y0 = 80 + hash(i * 7 + k) * 800; ctx.ellipse(x + 40 + hash(i + k * 3) * 70, y0, 10 + 8 * hash(k), 28, 0, 0, TAU); ctx.stroke(); } }
      // dado rail and lower panelling
      flat(rectPts(-200, 840, W + 400, 26), '#5A3A22', { line: '#1E120A', lw: 3 });
      for (let i = -1; i < 12; i++) { flat(rrPts(i * 200 + 20, 880, 170, 140, 8), '#33200F', { line: '#1E120A', lw: 3 }); }
      // the window: golden savanna outside at evening
      const wx = 1460, wy = 120, ww = 330, wh = 430;
      ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip();
      ctx.fillStyle = lgrad(0, wy, 0, wy + wh, [[0, '#F6B25A'], [.55, '#F7D08A'], [.62, '#E8A85A'], [1, '#B8803A']]); ctx.fillRect(wx, wy, ww, wh);
      dot(wx + 210, wy + 220, 46, '#FFE9B0'); glow(wx + 210, wy + 220, 140, '#FFF2C8', .8);
      flat([[wx, wy + 270], [wx + ww, wy + 260], [wx + ww, wy + wh], [wx, wy + wh]], '#C9963A');
      ctx.save(); ctx.translate(wx + 80, wy + 270); ctx.scale(.45, .45); flat(taper([[0, 0], [10, -140], [-10, -260]], [30, 22, 16]), '#3A2410'); for (let k = 0; k < 4; k++) flat(ellPts(-40 + k * 50 - 60, -270 - 8 * Math.sin(k), 130, 28, 20), '#3A2410'); ctx.restore();
      for (let i = 0; i < 70; i++) { const x = wx + hash(i) * ww, y = wy + 290 + hash(i * 3) * 140, h = 10 + 16 * hash(i * 5); ctx.strokeStyle = mixCol('#8C6424', '#E8C27A', hash(i * 7)); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 3, y - h * .6, x + 6 * (hash(i) - .5), y - h); ctx.stroke(); }
      ctx.restore();
      flat(rectPts(wx - 22, wy - 22, ww + 44, 22), '#6A4428', { line: '#1E120A', lw: 3 }); flat(rectPts(wx - 22, wy + wh, ww + 44, 30), '#6A4428', { line: '#1E120A', lw: 3 });
      flat(rectPts(wx - 22, wy, 22, wh), '#6A4428', { line: '#1E120A', lw: 3 }); flat(rectPts(wx + ww, wy, 22, wh), '#6A4428', { line: '#1E120A', lw: 3 });
      flat(rectPts(wx + ww / 2 - 7, wy, 14, wh), '#6A4428'); flat(rectPts(wx, wy + wh * .45 - 7, ww, 14), '#6A4428');
      // chalk scoreboard on the left wall
      flat(rectPts(80, 370, 330, 420), '#6A4428', { line: '#1E120A', lw: 4 }); flat(rectPts(98, 388, 294, 384), '#25302A');
      ctx.strokeStyle = 'rgba(240,240,230,.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(245, 400); ctx.lineTo(245, 760); ctx.moveTo(110, 460); ctx.lineTo(380, 460); ctx.stroke();
      txt('HOME', 172, 430, 34, 'rgba(240,240,230,.8)', { font: '"Patrick Hand"', weight: '400' }); txt('AWAY', 318, 430, 34, 'rgba(240,240,230,.8)', { font: '"Patrick Hand"', weight: '400' });
      [['501', '501'], ['441', '460'], ['360', '401'], ['301', '345']].forEach(([a, b], i) => { txt(a, 172, 500 + i * 62, 40, 'rgba(240,240,230,.75)', { font: '"Patrick Hand"', weight: '400' }); txt(b, 318, 500 + i * 62, 40, 'rgba(240,240,230,.75)', { font: '"Patrick Hand"', weight: '400' }); if (i < 3) { ctx.beginPath(); ctx.moveTo(140, 500 + i * 62); ctx.lineTo(205, 498 + i * 62); ctx.moveTo(285, 500 + i * 62); ctx.lineTo(350, 498 + i * 62); ctx.stroke(); } });
      // a shelf of bottles between scoreboard and board
      flat(rectPts(60, 300, 360, 16), '#5A3A22', { line: '#1E120A', lw: 3 });
      [['#3A6A3A', 70], ['#8C3A2A', 64], ['#C9A15A', 76], ['#2A4A6A', 60], ['#6A3A5A', 70]].forEach(([c, h], i) => { const x = 100 + i * 66; flat(rrPts(x - 18, 300 - h, 36, h, 6), c, { line: '#1E120A', lw: 2 }); flat(rectPts(x - 6, 300 - h - 26, 12, 28), c, { line: '#1E120A', lw: 2 }); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(x - 12, 300 - h + 8, 5, h - 16); });
      // the board's black surround
      dot(BX + 10, BY + 16, BR * 1.36, 'rgba(0,0,0,.45)');
      dot(BX, BY, BR * 1.34, '#1A1412'); dot(BX, BY, BR * 1.2, '#111');
      ctx.save(); ctx.strokeStyle = '#5A4A3A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(BX, BY, BR * 1.34, 0, TAU); ctx.stroke(); ctx.restore();
      // the board itself
      const ring = (r0, r1, cA, cB) => { for (let s = 0; s < 20; s++) { const a0 = -Math.PI / 2 + (s - .5) * TAU / 20, a1 = a0 + TAU / 20; ctx.fillStyle = s % 2 ? cB : cA; ctx.beginPath(); ctx.arc(BX, BY, r1 * BR, a0, a1); ctx.arc(BX, BY, r0 * BR, a1, a0, true); ctx.closePath(); ctx.fill(); } };
      ring(0, 1, '#1A1A1A', '#EDE2C2');
      ring(.94, 1, '#D2473F', '#3A8A4A'); ring(.56, .63, '#D2473F', '#3A8A4A');
      ring(.13, .56, '#1A1A1A', '#EDE2C2'); ring(.63, .94, '#1A1A1A', '#EDE2C2');
      dot(BX, BY, .13 * BR, '#3A8A4A'); dot(BX, BY, .065 * BR, '#D2473F');
      ctx.strokeStyle = '#C9C9C9'; ctx.lineWidth = 1.6; for (const r of [.065, .13, .56, .63, .94, 1]) { ctx.beginPath(); ctx.arc(BX, BY, r * BR, 0, TAU); ctx.stroke(); }
      for (let s = 0; s < 20; s++) { const a = -Math.PI / 2 + (s - .5) * TAU / 20; ctx.beginPath(); ctx.moveTo(BX + Math.cos(a) * .13 * BR, BY + Math.sin(a) * .13 * BR); ctx.lineTo(BX + Math.cos(a) * BR, BY + Math.sin(a) * BR); ctx.stroke(); }
      NUMS.forEach((n, s) => { const [x, y] = bp(s, 1.1); txt(String(n), x, y + 2, 34, '#F3EEE0', { font: F, weight: '800' }); });
      // floor
      ctx.fillStyle = lgrad(0, 1010, 0, H, [[0, '#4A3020'], [1, '#2A1A10']]); ctx.fillRect(-200, 1010, W + 400, 300);
      for (let i = -12; i < 24; i++) { ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(960 + i * 60, 1010); ctx.lineTo(960 + i * 160, H + 60); ctx.stroke(); }
      flat(rectPts(-200, 1004, W + 400, 12), '#1E120A');
    }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1, res: 1.15 });
  }
  // warm light from the board lamp and the window; the board glows when its neuron fires
  function pubLight(t, fire = 0) {
    glow(BX, BY - 40, 700, '#FFC27A', .22 + .02 * Math.sin(t * 3.1));
    glow(1625, 330, 360, '#FFE0A0', .35);
    if (fire > .01) {
      glow(BX, BY, BR * (1.2 + 1.4 * fire), '#FFE08A', .9 * fire);
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(BX, BY, 0, BX, BY, BR * 1.25); g.addColorStop(0, `rgba(255,236,160,${.95 * fire})`); g.addColorStop(.45, `rgba(255,190,80,${.45 * fire})`); g.addColorStop(1, 'rgba(255,190,80,0)'); ctx.fillStyle = g; ctx.fillRect(BX - BR * 1.3, BY - BR * 1.3, BR * 2.6, BR * 2.6);
      for (let i = 0; i < 14; i++) { const q = i / 14 * TAU + t * .15, L = BR * (1.6 + .4 * Math.sin(t * 3 + i)); ctx.fillStyle = `rgba(255,226,140,${.22 * fire})`; ctx.beginPath(); ctx.moveTo(BX, BY); ctx.lineTo(BX + Math.cos(q - .05) * L, BY + Math.sin(q - .05) * L); ctx.lineTo(BX + Math.cos(q + .05) * L, BY + Math.sin(q + .05) * L); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    }
    // dust motes in the window light
    for (let i = 0; i < 18; i++) { const f = frac(t * .05 + hash(i)), x = 1500 - f * 500 + 40 * Math.sin(t * .7 + i), y = 300 + hash(i * 3) * 500 + f * 120; dot(x, y, 2 + 2 * hash(i * 5), '#FFE9B8', .35 * Math.sin(f * Math.PI)); }
  }
  function crowd(t, cheer = 0) {
    for (let i = 0; i < 6; i++) {
      const x = 40 + i * 92 + 20 * hash(i), bob = cheer * Math.abs(Math.sin(t * 7 + i * 1.3)) * 26 + 3 * Math.sin(t * 1.3 + i), y = 1040 + 30 * hash(i * 3) - bob;
      ctx.fillStyle = '#120A06'; ctx.beginPath(); ctx.ellipse(x, y + 70, 70, 60, 0, Math.PI, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(x, y - 4, 34, 0, TAU); ctx.fill();
      if (cheer > .3 && i % 2) { ctx.strokeStyle = '#120A06'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + 40, y + 40); ctx.lineTo(x + 60, y - 50 - bob * .5); ctx.stroke(); }
    }
  }

  // ---------- darts ----------
  // tip at (x, y), pointing along angle a; s scale; o.flight colour, o.paper (a torn page flight), o.fore foreshortening
  function dart(x, y, a, s, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s * (o.fore ?? 1), s);
    const fl = o.flight || RED, dk = mixCol(fl, '#000000', .3);
    if (o.paper) {
      flat([[-150, 0], [-196, -40], [-226, -38], [-200, 0]], '#F3EBDC', { line: '#3A2A1A', lw: 2 }); flat([[-150, 0], [-196, 40], [-226, 36], [-200, 0]], '#E2D6BC', { line: '#3A2A1A', lw: 2 });
      ctx.strokeStyle = 'rgba(60,40,30,.6)'; ctx.lineWidth = 2; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(-178 - k * 9, -8 - k * 6); ctx.lineTo(-196 - k * 6, -14 - k * 6); ctx.stroke(); }
      flat([[-205, -34], [-218, -30], [-212, -22]], '#E87A5A'); flat([[-205, 30], [-219, 26], [-210, 20]], '#7EB5D6');
    } else if (o.duck) {
      flat(ellPts(-196, -6, 30, 22, 16), '#F2D04A', { line: '#3A2A1A', lw: 2 }); flat(ellPts(-170, -26, 14, 13, 12), '#F2D04A', { line: '#3A2A1A', lw: 2 }); flat([[-158, -28], [-146, -24], [-158, -20]], '#E8862A'); dot(-168, -30, 3, '#111');
    } else {
      flat([[-150, 0], [-196, -34], [-222, -34], [-198, 0]], fl, { line: '#1A1210', lw: 2 }); flat([[-150, 0], [-196, 34], [-222, 34], [-198, 0]], dk, { line: '#1A1210', lw: 2 });
    }
    flat(rectPts(-162, -4, 74, 8), '#2A2A30');
    flat(rrPts(-94, -9, 62, 18, 7), '#B9C0CE', { line: '#3A3A44', lw: 2 }); ctx.strokeStyle = '#7A8090'; ctx.lineWidth = 2; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.moveTo(-86 + k * 9, -8); ctx.lineTo(-90 + k * 9, 8); ctx.stroke(); }
    flat([[-34, -3.5], [0, 0], [-34, 3.5]], '#E4E8EE', { line: '#3A3A44', lw: 1.5 });
    ctx.restore();
  }
  // a dart stuck in the board (tip at x, y; it points into the wall, so we see it short, angled down-left)
  const stuck = (x, y, s = .8, o = {}) => dart(x, y, o.a ?? (Math.PI * .9), s, { fore: .62, ...o });
  // a dart in flight from p0 to p1 between ta and tb, arcing; returns true if in the air
  function flying(t, ta, tb, p0, p1, h, s0, s1, o = {}) {
    const k = (t - ta) / (tb - ta); if (k < 0 || k >= 1) return false;
    const e = o.ease ? o.ease(k) : k, p = arcPt(p0, p1, h, e), q = arcPt(p0, p1, h, Math.min(1, e + .02));
    for (let i = 1; i <= 4; i++) { const pp = arcPt(p0, p1, h, Math.max(0, e - i * .03)); dot(pp[0], pp[1], 6 - i, '#FFF2C8', .25 * (1 - i / 5)); }
    dart(p[0], p[1], Math.atan2(q[1] - p[1], q[0] - p[0]), lerp(s0, s1, e), o);
    return true;
  }
  // board shake on impact
  const thunk = (t, ti) => t > ti && t < ti + .4 ? Math.sin((t - ti) * 60) * 8 * (1 - (t - ti) / .4) : 0;
  // a hand-held dart for Clawd's throwing arm (side view: the arm hook is at the arm tip)
  const holdDart = (o = {}) => (u, sw) => { dart(u * 1.6, -u * .2, -.25, u / 34, o); };

  // ---------- broadcast graphics (screen space) ----------
  function bug(t, label = 'LIVE', sub = 'PUB DARTS · LEG 11') {
    const x = 1460, y = 46;
    flat(rectPts(x, y, 120, 54), RED); txt(label, x + 60, y + 28, 30, '#FFFFFF', { font: F, weight: '900' });
    flat(rectPts(x + 120, y, 300, 54), NAVY); txt(sub, x + 270, y + 28, 24, '#FFFFFF', { font: F, weight: '700' });
    if (label === 'LIVE') dot(x + 18, y + 27, 6, Math.floor(t * 2) % 2 ? '#FFFFFF' : 'rgba(255,255,255,.3)');
  }
  // a lower third that slides in at a and out at b
  function lower(t, a, b, head, sub, o = {}) {
    const k = easeOut(seg(t, a, a + .45)), out = ease(seg(t, b - .35, b)); if (k <= 0 || out >= 1) return;
    const y = o.y ?? 870, x = lerp(-1700, 0, k) - out * 1900, w = o.w ?? 1500;
    ctx.save(); ctx.translate(x, 0);
    flat(rectPts(120, y, w, sub ? 150 : 104), 'rgba(10,18,56,.94)', { shadow: [0, 10, 'rgba(0,0,0,.35)'] });
    flat(rectPts(120, y, 22, sub ? 150 : 104), o.tag || RED);
    txt(head, 180, y + 52, o.size || 58, o.col || YEL, { font: F, weight: '900', align: 'left' });
    if (sub) txt(sub, 182, y + 116, 36, '#FFFFFF', { font: F, weight: '600', align: 'left' });
    ctx.restore();
  }
  function stampBanner(t, a, txtS, x, y, o = {}) {
    const k = popk(t, a, .3); if (k <= 0) return; const s = lerp(2.2, 1, easeOut(k)) * (1 + .04 * Math.exp(-(t - a - .3) * 6) * Math.sin((t - a) * 30));
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -.08); ctx.scale(s, s); ctx.globalAlpha = clamp(k * 2);
    const w = o.w || 820, h = o.h || 130;
    flat(rectPts(-w / 2, -h / 2, w, h), o.col || RED, { shadow: [8, 12, 'rgba(0,0,0,.4)'] }); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 6; ctx.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24);
    txt(txtS, 0, 4, o.size || 72, '#FFFFFF', { font: F, weight: '900' });
    ctx.restore();
  }
  // telestrator: a yellow marker ellipse drawn on (in whatever space we're in)
  function teleRing(x, y, rx, ry, k, lw = 9) { if (k <= 0) return; ctx.save(); ctx.strokeStyle = YEL; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, -.15, -2.4, -2.4 + TAU * 1.05 * ease(k)); ctx.stroke(); ctx.restore(); }
  function teleLine(P, k, lw = 9) { if (k <= 0) return; const C = through(P, 10), n = Math.max(2, Math.round(C.length * ease(k))); ctx.save(); ctx.strokeStyle = YEL; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 8; ctx.beginPath(); C.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); }

  // the referee: a person in a striped shirt with a whistle; card: 0..1 raises a red card
  function referee(x, y, s, t, card = 0, o = {}) {
    person(x, y, s, { col: '#EDEDED', key: 'c11ref', hat: 'cap', hatCol: '#1A1A1A', mood: o.mood || 'neutral', look: o.look ?? .6 });
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = '#1A1A1A'; for (let i = 0; i < 4; i++) ctx.fillRect(-18 + i * 10, -76, 4, 38);
    const ang = lerp(.4, -2.3, easeOut(card)), sx = 16, sy = -72, ex = sx + Math.cos(ang) * 46, ey = sy + Math.sin(ang) * 46;
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    if (card > .05) { ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang + Math.PI / 2 + .2); flat(rrPts(-14, -44, 28, 40, 3), RED, { line: '#1A1A1A', lw: 2 }); ctx.restore(); }
    ctx.restore();
  }

  // ---------- 1 · arrival; making up stories; the vague label ----------
  function risk(t, lt, dur) {
    const a = cs('el_risk'), tSt = wt('el_risk', 'stories'), tVa = wt('el_risk', 'vague'), tMu = wt('el_risk', 'multi-purpose'), tSo = wt('el_risk', 'So'), tTe = wt('el_risk', 'tests'), tFa = wt('el_risk', 'fail');
    const tArr = CH + 2.0, tThrow = tSt - .9, tHit = tSt - .35, tSp = tVa - .6, tSpHit = tVa + .3, tOff = tSo + .7;
    camKeys(t, [[CH, 1000, 470, .9], [CH + 5.6, 1000, 480, .92], [tThrow - .5, 1000, 520, .98], [tHit + .4, 1100, 560, 1.05], [tVa - .7, 1000, 540, 1.0], [tSpHit + .4, 940, 545, 1.03], [tSo, 900, 540, 1.0], [ce('el_risk') + .5, 920, 540, 1]], .6);
    pubWall();
    const sh = thunk(t, tArr) + thunk(t, tSpHit) * 2;
    ctx.save(); ctx.translate(sh * .3, sh * .2);
    // the carried-in dart: a torn pop-up-book page as its flight, landing in treble 20
    const P20 = bp(3, .6);
    if (!flying(t, CH + .9, tArr, [-200, 700], P20, 240, 1.3, .8, { paper: true })) if (t >= tArr) stuck(P20[0], P20[1], .8, { paper: true, a: Math.PI * .86 });
    // Clawd's wild throw lands on the wall; a chalk target appears around it (making up stories)
    const WD = [1300, 230];
    if (t >= tHit) { stuck(WD[0], WD[1], .75, { a: Math.PI * .88 }); const ck = seg(t, tHit + .25, tHit + 1.4); ctx.save(); ctx.strokeStyle = 'rgba(245,240,225,.85)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let r = 0; r < 3; r++) { const kk = clamp(ck * 3 - r); if (kk > 0) { ctx.beginPath(); ctx.ellipse(WD[0] - 4, WD[1], 34 + r * 34, 30 + r * 30, .1, 0, TAU * kk); ctx.stroke(); } } ctx.restore(); }
    // the Knot's sponge-dart: a vague label that covers everything
    const spIn = seg(t, tSp, tSpHit), spOff = seg(t, tOff, tOff + 1.2);
    pubLight(t, 0);
    if (spIn > 0 && spOff < 1) {
      const e = easeIn(spIn), cx = lerp(1500, BX, e), cy = lerp(1100, BY, e) - Math.sin(spIn * Math.PI) * 200 + easeIn(spOff) * 900, r = BR * lerp(.5, 1.32, e) * (1 + .06 * Math.exp(-(t - tSpHit) * 5) * Math.sin((t - tSpHit) * 24) * (t > tSpHit)), rot = spOff * 1.2;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
      dot(14, 20, r, 'rgba(0,0,0,.35)'); dot(0, 0, r, '#F2D04A'); dot(-r * .12, -r * .12, r * .9, '#F7DE6A');
      for (let i = 0; i < 40; i++) { const q = hash(i * 3.3) * TAU, d = Math.sqrt(hash(i * 7.1)) * r * .9; dot(Math.cos(q) * d, Math.sin(q) * d, 6 + 10 * hash(i), 'rgba(170,130,30,.55)'); }
      ctx.strokeStyle = '#8A6A1A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
      if (t > tMu - .5) { const k = seg(t, tMu - .5, tMu + .2); ctx.globalAlpha = k; txt('A MULTI-PURPOSE', 0, -40, 66 * r / (BR * 1.32), '#3A2410', { font: F, weight: '900' }); txt('LANGUAGE NEURON', 0, 40, 66 * r / (BR * 1.32), '#3A2410', { font: F, weight: '900' }); }
      ctx.restore();
    }
    ctx.restore();
    // the referee (left) and the players
    const ref = seg(t, tSo - .3, tSo + .2);
    referee(330, 1010, 2.7, t, ref * (1 - seg(t, ce('el_risk') + .2, ce('el_risk') + .6)), { mood: ref > .5 ? 'oops' : 'neutral' });
    if (ref > 0 && t < tSo + 1.2) sfx('TWEET!', 470, 640, 64, '#FFFFFF', t - tSo, { stroke: '#1A1A1A', strokeW: .12 });
    const kx = lerp(2150, 1230, easeOut(seg(t, tVa - 2.2, tVa - 1.2)));
    if (kx < 2100) {
      const wind = seg(t, tSp - .5, tSp), rel = seg(t, tSp, tSp + .2);
      ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(kx, 1012, 120, 16, 0, 0, TAU); ctx.fill(); ctx.restore();
      knotBeast(kx, 1012 - 116 + Math.sin(t * 3) * 3, 112, { hat: 'cap', grin: t < tSo, look: [-1, -.3], col: '#C9A0D0' });
      if (wind > 0 && rel < 1) { ctx.save(); ctx.translate(kx - 40, 920 - 60 * wind); dot(0, 0, 60 * (1 - rel), '#F2D04A'); ctx.restore(); }
    }
    const cl = emotions(t, [[CH, 'happy'], [a + .3, 'suspicious'], [tThrow - .4, 'determined'], [tHit + .1, 'nervous'], [tHit + .9, 'smug'], [tSpHit, 'surprised'], [tSo + .2, 'laugh'], [tFa, 'thinking']]);
    const wind = seg(t, tThrow - .45, tThrow), aL = t < tThrow ? lerp(.4, 2.6, ease(wind)) : lerp(2.6, .8, easeOut(seg(t, tThrow, tThrow + .15)));
    tourist(1600, 1010, 20, 'party', { ...cl, view: 'side', flip: true, aL, armL: t < tThrow ? holdDart() : null, boilKey: 'c11c' });
    flying(t, tThrow, tHit, [1470, 800], WD, 180, 1.3, .75);
    crowd(t, seg(t, tSo + .2, tSo + .5) * (1 - seg(t, tFa, tFa + .5)) * .6);
    camEnd();
    vignette(.35, '#0A0604');
    bug(t);
    stampBanner(t, tSo + .1, 'NO SCORE · TOO VAGUE', 960, 210, { w: 980, size: 70 });
    lower(t, tTe - .2, dur + CH + 5, 'TESTS AN EXPLANATION CAN FAIL', null, { size: 62, w: 1280 });
  }

  // ---------- 2 · the blind test: split screen, two booths ----------
  function booth(t, side, x0, y0, w, h, o) {
    // a little interview booth: panelled walls, a desk lamp, a desk; drawn in panel-local coords (0..w, 0..h)
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip(); ctx.translate(x0, y0);
    layer('c11booth' + side, () => {
      ctx.fillStyle = lgrad(0, 0, 0, h, [[0, side ? '#2E3A5A' : '#4A2E2A'], [1, side ? '#1C2440' : '#2E1A16']]); ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 8; i++) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(i * 120 + 50, 0, 6, h); }
      flat(rectPts(0, h * .66, w, h * .34), side ? '#3A2E26' : '#3E2A1E'); flat(rectPts(0, h * .66, w, 14), '#5A3A22');
    }, { x: 0, y: 0, w, h, variants: 1 });
    glow(w * .3, h * .3, 360, '#FFE0A0', .25);
    o.draw(w, h);
    // the news desk in front
    flat(rrPts(w * .04, h * .62, w * .92, 36, 8), '#8A5E3A', { line: '#1E120A', lw: 3 }); flat(rectPts(w * .07, h * .62 + 36, w * .86, h * .38), '#6A4428', { line: '#1E120A', lw: 3 });
    flat(rectPts(w * .3, h * .62 + 80, w * .4, 70), side ? '#3A64B8' : RED); txt(side ? 'AGENT 2' : 'AGENT 1', w * .5, h * .62 + 116, 40, '#FFFFFF', { font: F, weight: '900' });
    if (o.front) o.front(w, h);
    ctx.restore();
    // frame and label
    ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, w, h); ctx.restore();
    flat(rectPts(x0, y0 - 70, w, 70), NAVY); flat(rectPts(x0, y0 - 70, 150, 70), side ? '#3A64B8' : RED);
    txt(side ? 'BOOTH 2' : 'BOOTH 1', x0 + 75, y0 - 34, 30, '#FFFFFF', { font: F, weight: '900' });
    txt(o.label, x0 + 175, y0 - 34, 36, '#FFFFFF', { font: F, weight: '700', align: 'left' });
  }
  // the neuron: a little dartboard-lamp with windows showing the snippets that make it fire
  const SNIPS = ['squeak!', 'tiny paws', 'the mouse'];
  function miniNeuron(x, y, s, t, fire, covered = 0, lift = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    flat(rectPts(-8, 0, 16, 90), '#3A3A44'); flat(ellPts(0, 92, 60, 12, 16), '#2A2A30');
    glow(0, -10, 150, '#FFE08A', .5 * fire);
    dot(0, -10, 86, '#111');
    for (let sg = 0; sg < 20; sg++) { const a0 = -Math.PI / 2 + (sg - .5) * TAU / 20; ctx.fillStyle = sg % 2 ? '#EDE2C2' : '#1A1A1A'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.arc(0, -10, 72, a0, a0 + TAU / 20); ctx.closePath(); ctx.fill(); }
    dot(0, -10, 14, '#3A8A4A'); dot(0, -10, 7, fire > .5 ? '#FFE08A' : RED);
    if (!covered) SNIPS.forEach((sn, i) => { const wx = -125 + i * 125, wy = -170; flat(rrPts(wx - 58, wy - 30, 116, 60, 8), '#2A2340', { line: '#FFE08A', lw: 3 }); glow(wx, wy, 80, '#FFE08A', .3 * fire); txt(sn, wx, wy + 2, 28, '#FFF2C8', { font: '"Patrick Hand"', weight: '400' }); ctx.strokeStyle = 'rgba(255,224,138,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(wx, wy + 30); ctx.lineTo(0, -80); ctx.stroke(); });
    if (covered) { ctx.save(); ctx.translate(112, 84); ctx.rotate(-lift * .9); ctx.translate(-112, -84); ctx.fillStyle = '#7A3A4A'; ctx.beginPath(); ctx.moveTo(-112, 84); ctx.quadraticCurveTo(-124, -120, 0, -125); ctx.quadraticCurveTo(124, -120, 112, 84); ctx.lineTo(80, 74); ctx.lineTo(40, 88); ctx.lineTo(0, 74); ctx.lineTo(-40, 88); ctx.lineTo(-80, 74); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#1A0A10'; ctx.lineWidth = 4; ctx.stroke(); txt('?', 0, -40, 90, '#F3D9C0', { font: F, weight: '900' }); ctx.restore(); }
    ctx.restore();
  }
  function note(x, y, w, h, rot, k, lines) {
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(backOut(k), backOut(k));
    flat(rectPts(-w / 2, -h / 2, w, h), '#FBF6EC', { shadow: [6, 8, 'rgba(0,0,0,.35)'] }); ctx.strokeStyle = 'rgba(120,150,200,.5)'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-w / 2 + 10, -h / 2 + i * h / 4); ctx.lineTo(w / 2 - 10, -h / 2 + i * h / 4); ctx.stroke(); }
    lines.forEach((ln, i) => txt(ln, 0, (i - (lines.length - 1) / 2) * 50 + 2, 48, PAL.ink, { font: '"Patrick Hand"', weight: '400' }));
    ctx.restore();
  }
  function blind(t, lt, dur) {
    const a = cs('el_blind'), tSt = wt('el_blind', 'studies'), tWr = wt('el_blind', 'writes'), tSe = wt('el_blind', 'second'), tSee = wt('el_blind', 'sees'), tNe = wt('el_blind', 'never'), tWr2 = wt('el_blind', 'writes', 1), tFi = wt('el_blind', 'fire'), e = ce('el_blind');
    // a dim pub behind the split screen
    camKeys(t, [[lt + 0, 960, 540, 1.3]], 0); pubWall(); camEnd(); flash(.55, '#0A0604');
    const open = easeOut(seg(lt, 0, .5)), x1 = lerp(-900, 70, open), x2 = lerp(W + 60, 990, open), y0 = 210, w = 860, h = 690;
    const tube = seg(t, tSe - .5, tSee - .1);
    // booth 1: studies the neuron, writes the explanation
    booth(t, 0, x1, y0, w, h, { label: 'studies the neuron', draw: (bw, bh) => {
      const fire = .5 + .5 * Math.sin(t * 4);
      const cl = emotions(t, [[a - .5, 'neutral'], [tSt - .2, 'thinking'], [tWr - .2, 'determined'], [tSe, 'happy']]);
      tourist(bw * .8, bh * .66, 22, 'beret', { ...cl, view: 'q', flip: true, aR: t > tWr - .2 && t < tSe ? 1.2 + .3 * Math.sin(t * 22) : cl.aR, boilKey: 'c11b1' });
    }, front: (bw, bh) => {
      miniNeuron(bw * .3, bh * .62 - 117, 1.3, t, .5 + .5 * Math.sin(t * 4));
      if (t > tWr - .3 && tube <= 0) note(bw * .56, bh * .62 - 60, 260, 120, -.05, seg(t, tWr - .3, tWr + .2), ['tiny squeaking', 'animals']);
    } });
    booth(t, 1, x2, y0, w, h, { label: 'never sees it', draw: (bw, bh) => {
      const cl = emotions(t, [[a - .5, 'bored'], [tSee - .1, 'surprised'], [tSee + .9, 'thinking'], [tNe - .2, 'mischief'], [tNe + .9, 'shy'], [tWr2 - .1, 'determined'], [tFi, 'excited']]);
      const peek = env(t, tNe - .2, tNe + 1.1, .25, .3);
      tourist(bw * .8 - 130 * peek, bh * .66, 22, 'party', { ...cl, view: 'q', flip: true, aR: lerp(cl.aR ?? .2, 1.9, peek), aL: t > tWr2 && t < tFi ? 1 + .3 * Math.sin(t * 22) : cl.aL, boilKey: 'c11b2' });
    }, front: (bw, bh) => {
      const peek = env(t, tNe - .2, tNe + 1.1, .25, .3);
      miniNeuron(bw * .3, bh * .62 - 117, 1.3, t, .6 * peek, 1, peek * .5);
      if (tube >= 1 && t < tWr2 + .2) note(bw * .74, bh * .2, 260, 120, .04, 1, ['tiny squeaking', 'animals']);
      if (t > tWr2 - .1) { const k = seg(t, tWr2 - .1, tWr2 + .3); dart(bw * .62 + 150, bh * .62 - 14, -.05, 1.2 * backOut(k)); }
    } });
    // the pneumatic tube between the booths carries the note
    const TP = [[x1 + w - 120, y0 - 70], [x1 + w - 100, y0 - 140], [(x1 + w + x2) / 2, y0 - 175], [x2 + 100, y0 - 140], [x2 + 120, y0 - 70]], TC = through(TP, 10);
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#6A5A4A'; ctx.lineWidth = 44; ctx.beginPath(); TC.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = 'rgba(190,215,235,.85)'; ctx.lineWidth = 34; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    for (const q of [TP[0], TP[4]]) flat(rrPts(q[0] - 30, q[1] - 6, 60, 22, 6), '#B08A4A', { line: '#3A2A1A', lw: 3 });
    if (tube > 0 && tube < 1) { const p = TC[Math.floor(easeInOut(tube) * (TC.length - 1))]; ctx.save(); ctx.translate(p[0], p[1]); flat(rrPts(-34, -15, 68, 30, 14), '#FBF6EC', { line: '#3A2A1A', lw: 3 }); ctx.restore(); sfx('FWOOMP!', p[0], y0 - 100, 46, '#FFFFFF', t - (tSe - .5), { life: 1, stroke: '#1A1A1A', strokeW: .12 }); }
    if (t > tNe - .2 && t < tNe + 1.4) sfx('TWEET!', x2 + 300, y0 + 150, 60, '#FFFFFF', t - (tNe + .45), { stroke: '#1A1A1A', strokeW: .12 });
    // the sentence it writes, as a broadcast caption
    if (t > tWr2 - .2) { const k = easeOut(seg(t, tWr2 - .2, tWr2 + .3)); flat(rectPts(lerp(W, 990, k), 920, 860, 110), 'rgba(10,18,56,.94)'); flat(rectPts(lerp(W, 990, k), 920, 16, 110), '#3A64B8'); letter('"Squeaky the tiny mouse squeaked!"', lerp(W, 990, k) + 440, 975, 46, YEL, { face: 'hand', shadow: false, screen: true, reveal: seg(t, tWr2, tWr2 + 1.4) }); }
    if (t < tWr2 - .2) { const k = easeOut(seg(t, a + .2, a + .7)) * (1 - seg(t, tWr2 - .6, tWr2 - .2)); if (k > 0) { flat(rectPts(70, 920, 1780 * k, 110), 'rgba(10,18,56,.94)'); flat(rectPts(70, 920, 16, 110), YEL); if (k > .9) txt('THE BLIND TEST', 120, 976, 56, YEL, { font: F, weight: '900', align: 'left' }); if (k > .9) txt('one agent explains · another, who never saw the neuron, aims', 680, 978, 34, '#FFFFFF', { font: F, weight: '600', align: 'left' }); } }
    bug(t);
  }

  // ---------- 3 · the bullseye beats ten billion words ----------
  function firingMeter(t, x, y, h, lvl, best, k) {
    if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k * 2);
    flat(rrPts(x - 70, y - h - 90, 140, h + 160, 14), 'rgba(10,18,56,.94)');
    txt('FIRING', x, y - h - 56, 30, '#FFFFFF', { font: F, weight: '900' });
    flat(rectPts(x - 26, y - h, 52, h), '#222A4A');
    const lv = clamp(lvl) * h; ctx.fillStyle = lgrad(0, y, 0, y - h, [[0, '#E8862A'], [1, YEL]]); ctx.fillRect(x - 26, y - lv, 52, lv);
    if (lvl > .99) glow(x, y - h, 120, YEL, .8);
    if (best > 0) { const by = y - best * h; ctx.strokeStyle = '#B9C0CE'; ctx.lineWidth = 5; ctx.setLineDash([12, 8]); ctx.beginPath(); ctx.moveTo(x - 60, by); ctx.lineTo(x + 60, by); ctx.stroke(); ctx.setLineDash([]); }
    ctx.restore();
  }
  // where the grey darts of real text land: spread over the outer board and the surround
  const GREY = Array.from({ length: 110 }, (_, i) => { const q = hash(i * 3.1) * TAU, r = .32 + .95 * Math.sqrt(hash(i * 7.7)); return [BX + Math.cos(q) * r * BR, BY + Math.sin(q) * r * BR, hash(i * 5.5)]; });
  function greyDarts(t, t0, n = GREY.length) {
    for (let i = 0; i < n; i++) { const [x, y, h] = GREY[i], ti = t0 + h * 1.1; if (t < ti) continue; const k = seg(t, ti, ti + .12); stuck(x + (1 - k) * 40, y - (1 - k) * 30, .5 * lerp(1.6, 1, k), { flight: '#9A9AA8', a: Math.PI * (.82 + .16 * hash(i)) }); }
  }
  function bull(t, lt, dur) {
    const a = cs('el_bull'), tOf = wt('el_bull', 'Often'), tFi = wt('el_bull', 'fire'), tTe = wt('el_bull', 'ten'), tWo = wt('el_bull', 'words'), tEx = wt('el_bull', 'explanation'), tCe = wt('el_bull', 'center'), e = ce('el_bull');
    const tRel = tOf + .1, tHit = tFi - .05, fire = seg(t, tHit, tHit + .25) * (1 - .3 * seg(t, tHit + 1.5, tHit + 3));
    const slow = t > tRel && t < tHit;
    const tight = t >= tRel + .35 && t < tTe - .3;
    if (t < tRel + .35) camKeys(t, [[t - lt, 1150, 560, 1.0], [tRel + .35, 1100, 545, 1.0]], .5);
    else if (tight) camKeys(t, [[tRel + .35, 1000, 480, 1.25], [tHit, 900, 470, 1.4], [tTe - .3, 880, 470, 1.45]], .5);
    else camKeys(t, [[tTe - .3, 960, 540, .98], [e + .5, 940, 540, 1.02]], .5);
    pubWall();
    const sh = thunk(t, tHit) * 1.5;
    ctx.save(); ctx.translate(sh, sh * .5);
    pubLight(t, fire);
    const P20 = bp(3, .6); stuck(P20[0], P20[1], .8, { paper: true, a: Math.PI * .86 });
    greyDarts(t, tTe - .3);
    if (!flying(t, tRel, tHit, [1460, 790], [BX + 4, BY - 2], 260, 1.4, .85, { ease: x => x })) if (t >= tHit) stuck(BX + 4, BY - 2, .85);
    if (fire > 0) for (let i = 0; i < 16; i++) { const f = seg(t, tHit, tHit + .9), q = i / 16 * TAU; dot(BX + Math.cos(q) * (40 + 360 * easeOut(f)), BY + Math.sin(q) * (40 + 360 * easeOut(f)), 9 * (1 - f), '#FFF2C8', 1 - f); }
    ctx.restore();
    // telestrator on the replay
    teleRing(BX, BY, 70, 64, seg(t, tEx - .1, tEx + .6), 10);
    teleLine([[BX + 90, BY - 50], [BX + 230, BY - 200], [BX + 420, BY - 240]], seg(t, tEx + .5, tEx + 1.0), 10);
    const tw = seg(t, tRel - .9, tRel), cl = emotions(t, [[t - lt - 1, 'determined'], [tRel + .2, 'excited'], [tHit + .3, 'starstruck'], [tTe, 'surprised'], [tCe - .3, 'excited']]);
    if (!tight) tourist(1580, 1010, 20, 'party', { ...cl, view: 'side', flip: true, aL: t < tRel ? lerp(.4, 2.6, ease(tw)) : (cl.aL ?? 1), armL: t < tRel ? holdDart() : null, boilKey: 'c11c' });
    if (!tight) crowd(t, seg(t, tHit, tHit + .3) * (1 - seg(t, tTe, tTe + .6) * .8) + seg(t, tCe - .3, tCe));
    camEnd();
    if (slow) { POST.push(() => { ctx.fillStyle = 'rgba(10,20,60,.12)'; ctx.fillRect(0, 0, W, H); }); }
    vignette(.35, '#0A0604');
    // broadcast
    bug(t, slow ? 'SLO-MO' : 'LIVE');
    const best = .62, lvl = t < tHit ? .05 + .05 * Math.sin(t * 5) : lerp(.05, 1.15, easeOut(seg(t, tHit, tHit + .6)));
    firingMeter(t, 1790, 820, 520, Math.min(1, lvl), t > tTe - .2 ? best * easeOut(seg(t, tTe - .2, tTe + .6)) : 0, seg(t, tHit - .8, tHit - .4));
    if (t > tTe - .2) { const k = seg(t, tTe - .2, tTe + .4); ctx.save(); ctx.globalAlpha = k; txt('BEST OF 10 BILLION WORDS', 1700, 820 - best * 520, 28, '#FFFFFF', { font: F, weight: '800', align: 'right', stroke: NAVY, sw: 8 }); ctx.restore(); }
    if (t > tHit && t < tTe - .3) txt('ONE SENTENCE', 1700, 300, 34, YEL, { font: F, weight: '900', align: 'right', stroke: NAVY, sw: 8 });
    // the counter of real-text darts
    if (t > tTe - .3 && t < tEx - .2) { const k = easeOut(seg(t, tTe - .3, tTe + .2)), n = Math.floor(1e10 * Math.pow(seg(t, tTe - .2, tWo + .4), 2)); lower(t, tTe - .3, tEx - .2, n.toLocaleString('en-US'), 'WORDS OF REAL TEXT', { size: 70, w: 1100, tag: '#9A9AA8', col: '#FFFFFF' }); }
    if (t > tCe - .35) { const k = popk(t, tCe - .35, .35), s = backOut(k) * (1 + .03 * Math.sin(t * 9)); ctx.save(); ctx.translate(1380, 300); ctx.rotate(-.1); ctx.scale(s, s); for (let i = 0; i < 16; i++) { const q = i / 16 * TAU + t * .3; flat([[0, 0], [Math.cos(q - .08) * 260, Math.sin(q - .08) * 200], [Math.cos(q + .08) * 260, Math.sin(q + .08) * 200]], i % 2 ? 'rgba(255,227,74,.5)' : 'rgba(210,71,63,.5)'); } txt('180!', 0, 0, 170, YEL, { font: F, weight: '900', stroke: '#8A1A1A', sw: 22 }); ctx.restore(); }
    lower(t, tEx - .1, e + 10, 'BULLSEYE', 'explanation written blind', { size: 62, w: 900 });
  }

  // ---------- 4 · match stats: 76 / 11 / 1 % ----------
  const ROWS = [['SHOULD FIRE', .76, '76%', YEL, 'should'], ['NEAR-MISSES', .11, '11%', '#9FB8E6', 'near-misses'], ['DISTANT IDEAS', .01, '1%', '#E89AB4', 'distant']];
  function score(t, lt, dur) {
    const a = cs('el_score'), e = ce('el_score'), VAL = [wt('el_score', 'three'), wt('el_score', 'eleven'), wt('el_score', 'one')], INTRO = ROWS.map(r => wt('el_score', r[4]));
    camKeys(t, [[t - lt, 1150, 560, 1.06], [e + 1, 1200, 540, 1.0]], .5);
    pubWall();
    const hits = [];
    // throws: should-fire darts thud into the bull (the board glows), near-misses land outside it, the distant idea misses the board
    const TH = [[INTRO[0] - .2, [BX - 20, BY + 14], YEL], [INTRO[0] + .5, [BX + 16, BY - 22], YEL], [INTRO[0] + 1.1, [BX - 4, BY + 30], YEL], [INTRO[1] - .1, bp(13, .78), '#9FB8E6'], [INTRO[1] + .5, bp(5, .45), '#9FB8E6'], [INTRO[2] + .2, [520, -60], null]];
    let fire = 0; TH.forEach(([ti, p, c]) => { if (c === YEL && t > ti + .45) fire = Math.max(fire, Math.exp(-(t - ti - .45) * 1.6)); });
    pubLight(t, fire * .8 + .15);
    const P20 = bp(3, .6); stuck(P20[0], P20[1], .8, { paper: true, a: Math.PI * .86 }); stuck(BX + 4, BY - 2, .85);
    TH.forEach(([ti, p, c], i) => { if (!flying(t, ti, ti + .45, [2100, 900], p, 200, 1.2, .7, c ? { flight: c } : { duck: true })) if (t > ti + .45 && c) stuck(p[0], p[1], .7, { flight: c }); });
    if (t > TH[5][0] + .4 && t < TH[5][0] + 1.6) sfx('QUACK!', 640, 140, 60, '#FFFFFF', t - TH[5][0] - .45, { stroke: '#1A1A1A', strokeW: .12 });
    camEnd();
    vignette(.4, '#0A0604');
    // stats panel
    const pk = easeOut(seg(t, a, a + .5)), px = lerp(W + 40, 1060, pk), py = 250;
    flat(rectPts(px, py, 800, 700), 'rgba(10,18,56,.95)', { shadow: [0, 14, 'rgba(0,0,0,.4)'] }); flat(rectPts(px, py, 800, 96), RED);
    txt('MATCH STATS', px + 40, py + 50, 54, '#FFFFFF', { font: F, weight: '900', align: 'left' });
    txt('written from the explanation alone', px + 40, py + 140, 36, '#C9D2EE', { font: F, weight: '600', align: 'left' });
    ROWS.forEach(([lab, v, s, col], i) => {
      const k = easeOut(seg(t, INTRO[i] - .3, INTRO[i] + .2)); if (k <= 0) return;
      const y = py + 240 + i * 150, fill = easeOut(seg(t, VAL[i] - .5, VAL[i] + .5));
      ctx.save(); ctx.globalAlpha = k; ctx.translate((1 - k) * 60, 0);
      ctx.save(); ctx.translate(px + 40, y + 6); ctx.scale(.5, .5); dart(110, 0, 0, 1, i === 2 ? { duck: true } : { flight: col }); ctx.restore();
      txt(lab, px + 150, y - 26, 46, '#FFFFFF', { font: F, weight: '900', align: 'left' });
      flat(rectPts(px + 150, y + 16, 440, 44), '#222A4A'); if (fill > 0) flat(rectPts(px + 150, y + 16, 440 * v * fill, 44), col);
      if (i === 2 && fill > 0) dot(px + 156, y + 38, 8, col);
      if (fill > 0) txt(String(Math.round(parseInt(s) * fill)) + '%', px + 770, y + 10, 84, col, { font: F, weight: '900', align: 'right' });
      ctx.restore();
    });
    bug(t);
  }

  // ---------- 5 · cats and cars; the history corner (Newton and Mercury); the dart flies to the savanna ----------
  function orrery(t, ox, oy, s, prec, hi, kk) {
    ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s);
    // base and stand
    flat([[-120, 330], [120, 330], [80, 290], [-80, 290]], '#6A4A2A', { line: '#2A1A0A', lw: 3 }); flat(rectPts(-10, 40, 20, 260), '#B08A4A', { line: '#2A1A0A', lw: 3 });
    // outer planets on brass arms: they keep perfect time (Newton's ticks)
    const PL = [[540, .26, 22, '#C98A5A'], [470, .4, 26, '#4A8AC9'], [400, .62, 20, '#D2603A']];
    PL.forEach(([r, w, pr, c], i) => { ctx.strokeStyle = 'rgba(240,210,150,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, r, r * .32, 0, 0, TAU); ctx.stroke(); const q = t * w + i * 2, x = Math.cos(q) * r, y = Math.sin(q) * r * .32; ctx.strokeStyle = '#B08A4A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(x, y); ctx.stroke(); dot(x, y, pr, c); ctx.strokeStyle = '#2A1A0A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, pr, 0, TAU); ctx.stroke(); if (kk[i] > 0) { ctx.save(); ctx.translate(x + 30, y - 40); ctx.scale(backOut(kk[i]), backOut(kk[i])); dot(0, 0, 22, '#3A8A4A'); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-3, 8); ctx.lineTo(11, -8); ctx.stroke(); ctx.restore(); } });
    // the sun
    glow(0, 0, 200, '#FFD36B', .9); dot(0, 0, 54, '#FFC94A'); dot(-14, -14, 30, '#FFE38A');
    // Mercury's orbit: an ellipse whose long axis slowly turns (the rosette of past orbits stays faintly behind)
    const orb = q => { const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80 * TAU, r = 200 / (1 + .38 * Math.cos(u)); P.push([Math.cos(u + q) * r, Math.sin(u + q) * r * .55]); } return P; };
    for (let j = 8; j >= 0; j--) { const P = orb(prec - j * .16); ctx.strokeStyle = j ? `rgba(191,230,255,${.42 - j * .04})` : '#BFE6FF'; ctx.lineWidth = j ? 2 : 4; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
    const u = t * 2.2, r = 200 / (1 + .38 * Math.cos(u)), mx = Math.cos(u + prec) * r, my = Math.sin(u + prec) * r * .55;
    ctx.strokeStyle = '#B08A4A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(mx, my); ctx.stroke();
    glow(mx, my, 50, '#FFE9B8', .5); dot(mx, my, 18, '#C9B48E'); ctx.strokeStyle = '#2A1A0A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, 18, 0, TAU); ctx.stroke();
    // perihelion marks: the closest point drifts each orbit (the wobble)
    if (hi > 0) for (let j = 0; j < 9; j++) { const q = prec - j * .16, rr = 200 / 1.38; dot(Math.cos(q) * rr, Math.sin(q) * rr * .55, 6, '#FF6A5A', hi * (1 - j * .09)); }
    ctx.restore();
    return [ox + mx * s, oy + my * s];
  }
  function mercury(t, lt, dur) {
    const a = cs('el_mercury'), tWr = wt('el_mercury', 'wrong'), tCa = wt('el_mercury', 'cats'), tPa = wt('el_mercury', 'pass'), tSc = wt('el_mercury', 'Science'), tNe = wt('el_mercury', "Newton's"), tAl = wt('el_mercury', 'almost'), tBr = wt('el_mercury', 'broke'), tTi = wt('el_mercury', 'tiny'), tMe = wt('el_mercury', "Mercury's"), tBe = wt('el_mercury', 'best'), tSp = wt('el_mercury', 'specific'), e = ce('el_mercury');
    const hIn = tSc - .25, hOut = e - .2, tOut = e + .1, tLand = NEXT - .25;
    const hist = t > hIn + .3 && t < hOut;
    if (t < tLand - .55) {
      // the pub
      const z = seg(t, tOut + .2, tLand - .55);
      camKeys(t, [[t - lt, 1100, 560, 1.05], [tCa, 1000, 545, 1.08], [tPa + 1, 960, 540, 1.0], [hOut, 960, 540, 1.0], [tOut + .3, 1180, 460, 1.12], [tLand - .55, 1625, 380, 2.6]], .4);
      pubWall();
      pubLight(t, 0);
      const P20 = bp(3, .6); stuck(P20[0], P20[1], .8, { paper: true, a: Math.PI * .86 });
      // the winning dart: in the bull until it wriggles free and flies to the window
      const wig = seg(t, tOut - .3, tOut + .2), lv = tOut + .2;
      if (t < lv) stuck(BX + 4 + Math.sin(t * 50) * 4 * wig, BY - 2, .85, { a: Math.PI * .9 + Math.sin(t * 40) * .15 * wig });
      else flying(t, lv, tLand - .45, [BX, BY], [1625, 330], -40, .85, .5, { ease: easeIn });
      // the Knot's cats-and-cars dart
      const kx = 1300, P = bp(17, .6);
      if (!flying(t, tCa - .5, tCa, [kx - 60, 900], P, 160, 1.1, .7, { flight: '#9A6AC0' })) if (t >= tCa) stuck(P[0], P[1], .7, { flight: '#9A6AC0' });
      if (t > tCa - .2 && t < tPa + 3) { const k = seg(t, tCa - .2, tCa + .3); letter('"cats and cars"', P[0] - 170, P[1] + 90, 50, '#E7D4FF', { face: 'marker', shadow: false, pop: k < 1 ? k : null, stroke: '#2A1A3A', strokeW: .14 }); }
      ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(kx, 1012, 120, 16, 0, 0, TAU); ctx.fill(); ctx.restore();
      knotBeast(kx, 896 + Math.sin(t * 3) * 3 - 8 * Math.abs(Math.sin(t * 6)) * seg(t, tPa, tPa + .4) * (1 - seg(t, tSc - 1, tSc)), 112, { hat: 'cap', grin: t > tCa && t < tOut, look: [-1, -.4] });
      const cl = emotions(t, [[t - lt - 10, 'neutral'], [tCa + .2, 'confused'], [tPa + .4, 'suspicious'], [tOut, 'surprised'], [tOut + .6, 'excited']]);
      tourist(1640, 1010, 20, 'party', { ...cl, view: 'q', flip: true, boilKey: 'c11c' });
      crowd(t, 0);
      camEnd();
      vignette(.35, '#0A0604');
      // the ticks: it passes test after test
      for (let i = 0; i < 5; i++) { const ti = tPa - .3 + i * .28, k = popk(t, ti, .3); if (k <= 0 || t > hIn) continue; const x = 560 + i * 170, y = 820; ctx.save(); ctx.translate(x, y); ctx.scale(backOut(k), backOut(k)); flat(rrPts(-70, -40, 140, 80, 10), '#2E7A3E', { shadow: [0, 6, 'rgba(0,0,0,.4)'] }); txt('PASS', 0, 2, 34, '#FFFFFF', { font: F, weight: '900' }); ctx.restore(); }
      if (t < hIn + .3) bug(t);
      if (z <= 0) lower(t, tWr - .3, hIn + .2, 'A WRONG EXPLANATION', 'can still pass a lot of tests', { size: 58, w: 1100, tag: '#9A6AC0' });
    } else {
      // outside, in golden grass: the dart lands and its flight becomes a seed
      const k = seg(t, tLand - .55, tLand);
      camKeys(t, [[tLand - .55, 960, 560, 1.12], [tLand + .1, 960, 640, 1.3], [NEXT + 2.2, 960, 700, 1.55]], .4);
      layer('c11grass', () => {
        ctx.fillStyle = lgrad(0, -100, 0, H + 100, [[0, '#F6B25A'], [.4, '#F7D08A'], [.55, '#E8A85A'], [1, '#B8803A']]); ctx.fillRect(-200, -200, W + 400, H + 400);
        dot(1380, 330, 120, '#FFE9B0'); glow(1380, 330, 380, '#FFF2C8', .8);
        flat([[-200, 560], [W + 200, 540], [W + 200, H + 200], [-200, H + 200]], '#C9963A');
        ctx.save(); ctx.translate(300, 570); ctx.scale(.8, .8); flat(taper([[0, 0], [10, -140], [-10, -260]], [30, 22, 16]), '#3A2410'); for (let kk = 0; kk < 4; kk++) flat(ellPts(-40 + kk * 50 - 60, -270 - 8 * Math.sin(kk), 130, 28, 20), '#3A2410'); ctx.restore();
        for (let i = 0; i < 700; i++) { const x = -200 + hash(i) * (W + 400), y = 570 + Math.pow(hash(i * 3), 1.4) * 540, h = (14 + 50 * hash(i * 5)) * (y / 640) * (y / 640); ctx.strokeStyle = mixCol('#8C6424', '#E8C27A', hash(i * 7)); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 3, y - h * .6, x + 10 * (hash(i) - .5), y - h); ctx.stroke(); }
      }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1, res: 1.5 });
      glow(1380, 330, 300, '#FFF2C8', .25 + .05 * Math.sin(t * 2));
      // swaying foreground blades
      for (let i = 0; i < 40; i++) { const x = hash(i * 9.1) * W, y = 900 + hash(i * 2.3) * 200, h = 120 + 120 * hash(i * 4.7), sw = Math.sin(t * 1.6 + i) * 14; ctx.strokeStyle = mixCol('#9C7028', '#F0CC80', hash(i * 1.3)); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sw * .4, y - h * .6, x + sw, y - h); ctx.stroke(); }
      const gx = 960, gy = 840;
      ctx.save(); ctx.fillStyle = 'rgba(60,30,0,.3)'; ctx.beginPath(); ctx.ellipse(gx, gy + 6, 90 * seg(t, tLand - .2, tLand), 16, 0, 0, TAU); ctx.fill(); ctx.restore();
      if (!flying(t, tLand - .55, tLand, [500, -200], [gx, gy], -60, 1.6, 1.2, { ease: easeIn })) {
        // planted: the barrel sinks into the soil, the flight folds into a seed, and a sprout uncurls
        const sk = easeOut(seg(t, tLand, tLand + .6)), sp = easeOut(seg(t, tLand + .4, tLand + 1.6));
        ctx.save(); ctx.beginPath(); ctx.rect(gx - 300, gy - 400, 600, 400 + 4); ctx.clip();
        dart(gx, gy + 50 * sk, lerp(1.15, Math.PI / 2, sk), 1.2 * (1 - .45 * sk), {});
        ctx.restore();
        if (t < tLand + .5) for (let i = 0; i < 10; i++) { const f = seg(t, tLand, tLand + .5), q = -Math.PI * (i / 9); dot(gx + Math.cos(q) * 110 * f, gy + Math.sin(q) * 60 * f, 8 * (1 - f), '#8C6424', 1 - f); }
        ctx.save(); ctx.translate(gx, gy); ctx.scale(2.6, 2.6); dot(0, -8, 16 * sk, '#8C5A2A');
        if (sp > 0) { ctx.strokeStyle = '#4E8A34'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.quadraticCurveTo(-10, -60 * sp, 6 * Math.sin(t * 2), -110 * sp); ctx.stroke(); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(6 * Math.sin(t * 2), -110 * sp); ctx.rotate(sd * (.9 - .3 * sp) + .05 * Math.sin(t * 2.4)); flat(ellPts(sd * 34 * sp, 0, 34 * sp, 13 * sp, 16), sd > 0 ? '#6EA844' : '#5E9A3C', { line: '#2E5A1E', lw: 2 }); ctx.restore(); } glow(0, -100, 160 * sp, '#FFE08A', .5 * sp); }
        ctx.restore();
      }
      camEnd();
      flash(Math.max(0, 1 - k * 2.2), '#FFF2C8');
    }
    // the history corner: a broadcast insert with a sepia orrery
    if (t > hIn && t < hOut + .4) {
      const kin = easeOut(seg(t, hIn, hIn + .45)), kout = ease(seg(t, hOut - .1, hOut + .3)), x0 = lerp(-W, 0, kin) + kout * W;
      ctx.save(); ctx.translate(x0, 0);
      ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3A2A1A'], [1, '#1A1008']]); ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 90; i++) dot(hash(i * 3.7) * W, hash(i * 9.1) * H * .8, 1 + 2 * hash(i), '#F3E2BE', .3 + .4 * hash(i * 2));
      const prec = (t - hIn) * .1 + seg(t, tTi, tMe + .8) * 1.2, hi = seg(t, tTi - .2, tTi + .4);
      const kk = [popk(t, tAl - .2, .3), popk(t, tAl + .1, .3), popk(t, tAl + .4, .3)];
      orrery(t, 1150, 560, 1.25, prec, hi, kk);
      const per = [1150 + Math.cos(prec) * 200 / 1.38 * 1.25, 560 + Math.sin(prec) * 200 / 1.38 * .55 * 1.25];
      teleRing(per[0], per[1], 90, 70, seg(t, tTi - .1, tTi + .5), 9);
      if (t > tBr - .3) { const k = popk(t, tBr - .3, .3); ctx.save(); ctx.translate(per[0] - 150, per[1] - 120); ctx.scale(backOut(k), backOut(k)); dot(0, 0, 34, RED); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-13, -13); ctx.lineTo(13, 13); ctx.moveTo(13, -13); ctx.lineTo(-13, 13); ctx.stroke(); ctx.restore(); }
      if (t > tMe - .3) { const k = seg(t, tMe - .3, tMe + .2); ctx.save(); ctx.globalAlpha = k; txt('MERCURY', per[0] - 40, per[1] + 120, 46, YEL, { font: F, weight: '900', stroke: '#1A1008', sw: 8 }); ctx.restore(); }
      // Newton: a framed portrait silhouette on the left
      ctx.save(); ctx.translate(270, 500); flat(rectPts(-150, -190, 300, 380), '#8C6A3A', { shadow: [10, 14, 'rgba(0,0,0,.5)'] }); flat(rectPts(-128, -168, 256, 336), '#E9D8B0');
      flat(ellPts(0, -30, 60, 74, 24), '#3A2A1A'); for (const sd of [-1, 1]) flat(ellPts(sd * 62, 10, 34, 80, 16), '#5A4A3A'); flat([[-100, 168], [-80, 70], [80, 70], [100, 168]], '#3A2A1A'); ctx.restore();
      txt('NEWTON', 270, 742, 46, '#F3E2BE', { font: '"DejaVu Serif"', weight: '700' });
      flat(rectPts(0, 0, W, 120), 'rgba(10,18,56,.92)'); flat(rectPts(0, 0, 18, 120), YEL);
      txt('HISTORY CORNER', 1040, 62, 60, YEL, { font: F, weight: '900' });
      ctx.restore();
      if (kin >= 1 && kout <= 0) { fxFilm(t, .5); POST.push(() => { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(240,200,140,.35)'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; }); }
      if (kout <= 0) { lower(t, tNe - .2, tBe - .3, "NEWTON'S GRAVITY", 'explained almost everything…', { size: 58, w: 1000 }); lower(t, tBe - .2, hOut, 'THE BEST TESTS ARE SPECIFIC', null, { size: 62, w: 1250 }); }
    }
  }

  shots([[CH, risk], [cs('el_blind') - .3, blind], [cs('el_bull') - .3, bull], [cs('el_score') - .3, score], [cs('el_mercury') - .4, mercury]]);
})();
