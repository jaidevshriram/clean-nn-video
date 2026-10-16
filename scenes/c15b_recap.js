// c15b_recap.js: "five things to take home". Clawd's passport opens on its last page, WHAT WE FOUND: the left page
// holds every stop's stamp, the right page fills with the five takeaways, stamped in one by one on their words. Each
// takeaway lifts the stamp of the world it came from; a gold thread runs from that stamp to the line, and the view
// leans toward the line being spoken.
(() => {
  const HANDF = '"Patrick Hand"', MARK = '"Permanent Marker"', SERIF = '"DejaVu Serif"';
  const INKC = '#2A1E1E', PAPERP = '#F1E6CC';
  // [cue word, nth, line 1, line 2, source (not shown), stop index, colour, font size (default 48)]
  const TAKE = [
    ['one', 0, 'A mixed-up neuron is usually one idea', "we don't have a word for yet", 'the V neuron', 3, '#C2456A'],
    ['two', 0, 'Knot evidence came from blurry tools and', 'old designs: a last resort, not the default', 'better tools', 5, '#3A64B8'],
    ['three', 0, 'Similar things group together;', 'under pressure, groups just get broader', 'two theories', 7, '#7B5CA8'],
    ['four', 0, 'Broad explanations win the signal, so clean', 'structure grows in image and language models', "why it's clean", 12, '#2E8A86', 44],
    ['five', 1, 'A mess is a lead: with better maps', 'and many scientists, it might be read', 'what clean means', 13, '#C98A2A'],
  ];
  const ACT = ['#7B5CA8', '#C2456A', '#3A9C98', '#E8AA38'];
  // layout (in page coordinates; a gentle view transform is applied on top)
  const BK = { x: 110, y: 56, w: 1700, h: 968 }, LP = { x: 140, y: 84, w: 690, h: 912 }, RP = { x: 850, y: 84, w: 930, h: 912 };
  const rowY = i => 196 + i * 166, stampXY = i => [LP.x + LP.w / 2 + ((i % 4) - 1.5) * 152, 382 + Math.floor(i / 4) * 140];

  // a rubber-stamp impression (passStamp's look, but drawn in the current transform so it moves with the page)
  function stampAt(num, name, x, y, s, rot, col, a = 1) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= .9 * a;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 92, 0, TAU); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '900 20px sans-serif'; ctx.fillText('STOP', 0, -46); ctx.font = '900 66px serif'; ctx.fillText(String(num), 0, 2);
    if (name) { ctx.font = '800 17px sans-serif'; const w = name.toUpperCase(); ctx.fillText(w.length > 16 ? w.slice(0, 16) : w, 0, 50); }
    ctx.restore();
  }
  // the five icons, each with a little idle animation (ph = time)
  function icon(i, x, y, s, col, ph, live) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 7;
    const w = live ? 1 : 0;
    if (i === 0) { ctx.globalAlpha *= .85 + .15 * Math.sin(ph * 4) * w; ctx.beginPath(); ctx.moveTo(-24, -22); ctx.lineTo(0, 24); ctx.lineTo(24, -22); ctx.stroke(); }
    if (i === 1) { ctx.translate(4 * Math.sin(ph * 2.2) * w, 3 * Math.cos(ph * 1.7) * w); ctx.beginPath(); ctx.arc(-6, -6, 19, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, 8); ctx.lineTo(25, 25); ctx.stroke(); }
    if (i === 2) { const g = .5 + .5 * Math.sin(ph * 2.5) * w; for (const [cx, cy] of [[-17, -13], [-5, -19], [-11, -2]]) { ctx.beginPath(); ctx.arc(cx - 4 * g, cy - 3 * g, 6, 0, TAU); ctx.fill(); } for (const [cx, cy] of [[15, 11], [23, 21], [11, 23]]) { ctx.beginPath(); ctx.arc(cx + 4 * g, cy + 3 * g, 6, 0, TAU); ctx.fill(); } }
    if (i === 3) { const r = 20 + 2 * Math.sin(ph * 3) * w; ctx.beginPath(); ctx.arc(-6, 2, r, 0, TAU); ctx.fill(); const q = ph * 1.6 * w; ctx.beginPath(); ctx.arc(-6 + Math.cos(q) * 32, 2 + Math.sin(q) * 32, 6, 0, TAU); ctx.fill(); }
    if (i === 4) { ctx.translate(0, -4 * Math.abs(Math.sin(ph * 3)) * w); ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(-30, -6, -18, -30, 0, -30); ctx.bezierCurveTo(18, -30, 30, -6, 0, 28); ctx.fill(); ctx.fillStyle = PAPERP; ctx.beginPath(); ctx.arc(0, -10, 8, 0, TAU); ctx.fill(); }
    ctx.restore();
  }
  // a text line that writes on left to right as k goes 0 → 1
  function writeOn(s, x, y, size, col, k, a = 1) {
    if (k <= 0) return; ctx.save(); ctx.font = `400 ${size}px ${HANDF}`; const w = ctx.measureText(s).width;
    ctx.beginPath(); ctx.rect(x - 10, y - size, (w + 20) * ease(clamp(k)), size * 2); ctx.clip(); ctx.globalAlpha *= a; txt(s, x, y, size, col, { font: HANDF, weight: '400', align: 'left' }); ctx.restore();
  }

  function recap(t, lt, dur) {
    const a = cs('wm_recap'), e = ce('wm_recap'), TW = TAKE.map(([w, n]) => wt('wm_recap', w, n));
    const cur = TW.reduce((m, tw, i) => (t > tw - .25 ? i : m), -1);
    // the desk under the passport, with a slow lamp light drifting across it
    ctx.save(); resetMatrix(); ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3A2A2A'], [1, '#1A1212']]); ctx.fillRect(0, 0, W, H); ctx.restore();
    glow(1300 + 180 * Math.sin(t * .11), 260, 900, '#FFC27A', .16);
    GRAIN = .9;
    // view: the book opens toward us, then leans gently toward the line being spoken
    const open = easeOut(seg(t, a - .5, a + .7));
    const fy = kf(t, [[a + 1, 540], ...TW.flatMap((tw, i) => [[tw - .3, i ? rowY(i - 1) * .55 + 540 * .45 : 540], [tw + .9, rowY(i) * .55 + 540 * .45]])], easeInOut);
    const z = lerp(.84, 1, open) * (1 + .03 * ease(seg(t, a + .5, e)));
    ctx.save(); ctx.translate(960 + 14 * Math.sin(t * .23), 508); ctx.scale(z * .925, z * .925); ctx.rotate(.006 * Math.sin(t * .4)); ctx.translate(-960, -540 - (fy - 540) * .14);
    // the passport: cover, two pages, the spine
    flat(rrPts(BK.x, BK.y, BK.w, BK.h, 30), '#5A2A3A', { shadow: [16, 22, 'rgba(0,0,0,.5)'] });
    flat(rrPts(LP.x, LP.y, LP.w, LP.h, 16), PAPERP); flat(rrPts(RP.x, RP.y, RP.w, RP.h, 16), PAPERP);
    ctx.save(); ctx.fillStyle = lgrad(LP.x + LP.w - 60, 0, RP.x + 60, 0, [[0, 'rgba(120,90,60,0)'], [.5, 'rgba(120,90,60,.35)'], [1, 'rgba(120,90,60,0)']]); ctx.fillRect(LP.x + LP.w - 60, LP.y, RP.x - LP.x - LP.w + 120, LP.h); ctx.restore();
    // left page: the title, and every stop's stamp
    const tk = seg(t, a - .2, a + .9);
    if (tk > 0) { ctx.save(); ctx.font = `400 74px ${MARK}`; const w = ctx.measureText('WHAT WE FOUND').width; ctx.beginPath(); ctx.rect(LP.x + LP.w / 2 - w / 2 - 10, 120, (w + 20) * ease(tk), 120); ctx.clip(); txt('WHAT WE FOUND', LP.x + LP.w / 2, 182, 74, INKC, { font: MARK, weight: '400' }); ctx.restore(); }
    if (seg(t, a + .4, a + 1.1) > 0) { ctx.save(); ctx.globalAlpha = seg(t, a + .4, a + 1.1); txt('16 stops · 4 parts · 1 idea', LP.x + LP.w / 2, 256, 44, '#8C5A3A', { font: HANDF, weight: '400' }); ctx.restore(); }
    const lifted = cur >= 0 ? TAKE[cur][5] : -1;
    for (let i = 0; i < 16; i++) {
      const k = seg(t, a + .3 + i * .07, a + .65 + i * .07); if (k <= 0) continue;
      const [x, y] = stampXY(i), col = ACT[STOPS[i][1] - 1], hit = TAKE.findIndex(q => q[5] === i), done = hit >= 0 && hit <= cur;
      const lift = i === lifted ? easeOut(seg(t, TW[cur] - .2, TW[cur] + .5)) : 0, s = lerp(1.4, 1, easeOut(k)) * (.6 + .2 * lift), rot = lerp((hash(i * 3) - .5) * .5, 0, lift);
      if (lift > 0) { glow(x, y, 120, '#FFE08A', .55 * lift); flat(ellPts(x + 8, y + 12, 70 * lift, 70 * lift, 24), 'rgba(60,30,20,.18)'); }
      stampAt(i, '', x, y - 10 * lift, s, rot + (lift ? .03 * Math.sin(t * 2) : 0), done ? TAKE[hit][6] : col, clamp(k * 2) * (cur >= 0 && !done ? .55 : 1));
    }
    // right page: the five takeaways
    TAKE.forEach(([w, n, l1, l2, from, stop, col, fs = 48], i) => {
      const tw = TW[i], k = seg(t, tw - .25, tw + .45); if (k <= 0) return;
      const y = rowY(i), isCur = i === cur, dim = isCur ? 1 : .62, s = lerp(1.6, 1, easeOut(clamp(k * 1.4)));
      // the highlighter band behind the line being spoken
      if (isCur) { const hk = ease(seg(t, tw + .1, tw + 1.4)); ctx.save(); ctx.globalAlpha = .38; ctx.fillStyle = '#FFD86B'; ctx.beginPath(); ctx.roundRect(RP.x + 132, y - 54, 760 * hk, 112, 18); ctx.fill(); ctx.restore(); }
      ctx.save(); ctx.globalAlpha = clamp(k * 2); ctx.translate(RP.x + 74, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, 52, 0, TAU); ctx.stroke();
      if (isCur) { ctx.globalAlpha *= .35 + .2 * Math.sin(t * 3); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 62 + 4 * Math.sin(t * 3), 0, TAU); ctx.stroke(); }
      ctx.restore();
      if (k > .2) { icon(i, RP.x + 74, y, s, col, t, isCur); ctx.save(); ctx.globalAlpha = clamp((k - .2) * 3); dot(RP.x + 30, y - 44, 22, col); txt(String(i + 1), RP.x + 30, y - 42, 34, '#FFF6E0', { font: MARK, weight: '400' }); ctx.restore(); }
      writeOn(l1, RP.x + 150, y - 24, fs, INKC, seg(k, .3, .75), dim);
      writeOn(l2, RP.x + 150, y + 28, fs, INKC, seg(k, .55, 1), dim);
    });
    // the gold thread from the lifted stamp to the line it explains
    if (cur >= 0) {
      const [sx, sy] = stampXY(TAKE[cur][5]), ex = RP.x + 18, ey = rowY(cur), k = ease(seg(t, TW[cur] + .1, TW[cur] + .9));
      if (k > 0) { const C = through([[sx + 60, sy - 4], [(sx + ex) / 2 + 40, Math.min(sy, ey) - 90], [ex, ey]], 16), n = Math.max(2, Math.round(C.length * k)); ctx.save(); ctx.strokeStyle = 'rgba(214,160,40,.85)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); C.slice(0, n).forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); const p = C[n - 1]; glow(p[0], p[1], 30, '#FFE08A', .8); }
    }
    ctx.restore();
    // Clawd stands on the desk in front of the book's corner, reading along
    const moods = [[a - 1, 'happy'], ...TW.map((tw, i) => [tw + .2, ['thinking', 'suspicious', 'happy', 'excited', 'proud'][i]])];
    const nod = cur >= 0 ? Math.exp(-(t - TW[cur]) * 3) * Math.sin((t - TW[cur]) * 14) : 0;
    tourist(1760, 1062, 10.5, 'safari', { ...emotions(t, moods), view: 'q', flip: true, sq: .06 * nod, lookY: -.3, lookX: -.6 });
  }
  shots([[cs('wm_recap') - .5, recap, { fade: .8 }]]);
})();
