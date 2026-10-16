// c15b_recap.js: "five things to take home". Clawd's passport opens on its last page, WHAT WE FOUND, and the five
// takeaways are stamped in one by one on their words, each with a small icon that calls back to the world it came from.
(() => {
  const TAKE = [
    ['one', 0, 'A mixed-up neuron is usually one idea', "we don't have a word for yet", 'film noir', '#C2456A'],
    ['two', 0, 'The evidence for the knot came from', 'blurry tools and older designs', 'foggy London', '#3A64B8'],
    ['three', 0, 'Similar things group together;', 'under pressure, groups just get broader', 'game show', '#7B5CA8'],
    ['four', 0, 'Broad explanations win the learning', 'signal, so clean structure grows', 'savanna', '#3A9C98'],
    ['five', 1, 'A mess is a lead: with better maps', 'and many scientists, it can be read', 'globe', '#C98A2A'],
  ];
  function icon(i, x, y, s, col) {
    ctx.save(); resetMatrix(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 7;
    if (i === 0) { ctx.beginPath(); ctx.moveTo(-26, -24); ctx.lineTo(0, 24); ctx.lineTo(26, -24); ctx.stroke(); }
    if (i === 1) { ctx.beginPath(); ctx.arc(-6, -6, 20, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(9, 9); ctx.lineTo(26, 26); ctx.stroke(); }
    if (i === 2) { for (const [cx, cy] of [[-18, -14], [-6, -20], [-12, -2], [16, 12], [24, 22], [12, 24]]) { ctx.beginPath(); ctx.arc(cx, cy, 6, 0, TAU); ctx.fill(); } }
    if (i === 3) { ctx.beginPath(); ctx.arc(-6, 2, 22, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(26, 14, 6, 0, TAU); ctx.fill(); }
    if (i === 4) { ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(-30, -6, -18, -30, 0, -30); ctx.bezierCurveTo(18, -30, 30, -6, 0, 28); ctx.fill(); ctx.fillStyle = '#F1E6CC'; ctx.beginPath(); ctx.arc(0, -10, 8, 0, TAU); ctx.fill(); }
    ctx.restore();
  }
  function recap(t, lt, dur) {
    const a = cs('wm_recap'), e = ce('wm_recap');
    ctx.save(); resetMatrix(); ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3A2A2A'], [1, '#1E1414']]); ctx.fillRect(0, 0, W, H); ctx.restore();
    GRAIN = 1;
    const open = easeOut(seg(t, a - .4, a + .6)), drift = 1 + .02 * seg(t, a, e);
    ctx.save(); resetMatrix(); ctx.translate(960, 540); ctx.scale(lerp(.82, 1, open) * drift, lerp(.82, 1, open) * drift); ctx.translate(-960, -540);
    flat(rrPts(150, 70, 1620, 940, 30), '#5A2A3A', { shadow: [14, 18, 'rgba(0,0,0,.5)'] });
    flat(rrPts(180, 95, 780, 890, 16), '#F1E6CC'); flat(rrPts(960, 95, 780, 890, 16), '#F1E6CC'); flat(rectPts(950, 95, 20, 890), '#D9CBAA');
    ctx.restore();
    // left page: the title and the full itinerary, every stop stamped
    letter('WHAT WE FOUND', 570, 190, 64, '#3A2A2A', { face: 'marker', shadow: false, reveal: seg(t, a - .2, a + .8) });
    letter('16 stops · 4 parts · 1 idea', 570, 262, 36, '#8C5A3A', { face: 'hand', shadow: false, reveal: seg(t, a + .4, a + 1.2) });
    for (let i = 0; i < 16; i++) { const c = i % 4, r = Math.floor(i / 4), x = 300 + c * 180, y = 400 + r * 150, k = seg(t, a + .3 + i * .06, a + .6 + i * .06); if (k > 0) passStamp(i, STOPS[i][0], x, y, k, { scale: .58, rot: (hash(i * 3) - .5) * .5, col: ['#7B5CA8', '#C2456A', '#3A9C98', '#E8AA38'][STOPS[i][1] - 1] }); }
    // right page: the five takeaways, stamped in on their words
    TAKE.forEach(([w, nth, l1, l2, from, col], i) => {
      const tw = wt('wm_recap', w, nth), k = seg(t, tw - .2, tw + .4); if (k <= 0) return;
      const y = 200 + i * 160, s = lerp(1.5, 1, easeOut(clamp(k * 1.4)));
      ctx.save(); resetMatrix(); ctx.globalAlpha = clamp(k * 2); ctx.translate(1060, y + 30); ctx.scale(s, s);
      ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 50, 0, TAU); ctx.stroke(); ctx.restore();
      if (k > .2) { icon(i, 1060, y + 30, s * .95, col); letter(String(i + 1), 1018, y - 12, 30, col, { face: 'marker', shadow: false, screen: true }); }
      if (k > .3) { letter(l1, 1130, y + 6, 42, '#2A1E1E', { face: 'hand', shadow: false, align: 'left', reveal: seg(k, .3, .8), screen: true }); letter(l2, 1130, y + 54, 42, '#2A1E1E', { face: 'hand', shadow: false, align: 'left', reveal: seg(k, .55, 1), screen: true }); letter('from: ' + from, 1700, y - 26, 30, col, { face: 'hand', shadow: false, align: 'right', alpha: .9, screen: true }); }
    });
    // the current takeaway glows a little
    const cur = TAKE.reduce((m, [w, nth], i) => (t > wt('wm_recap', w, nth) - .2 ? i : m), -1);
    if (cur >= 0) glow(1060, 230 + cur * 160, 110, '#FFE08A', .35);
    tourist(1660, 1000, 7, 'safari', { ...emotions(t, [[a, 'happy'], [wt('wm_recap', 'five', 1), 'proud']]), view: 'q', flip: true });
  }
  shots([[cs('wm_recap') - .5, recap, { fade: .8 }]]);
})();
