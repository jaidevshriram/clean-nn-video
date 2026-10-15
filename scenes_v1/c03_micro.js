// ch03 A history of microscope errors: same neurons, better microscope; and a network that learns better.
(() => {
  const MT = 'blog/raw/microscope-timeline/';
  const LX = 1300, LY = 430, LR = 300;   // the lens view
  function cardShot(t, lt, dur) { setLab(t); clawd(560, 860, 24, feel('neutral', t)); chapterCard(t, lt, dur + .3, '03', 'A history of microscope errors', PAL.teal); if (lt < .3) brushWipe(.5 + lt / .6, ['#2E4A57', '#3E6170']); }
  // the lens: a circular view onto an image, with a brass rim; blur > 0 defocuses it
  function lens(name, k, o = {}) {
    if (k <= .01) return;
    const r = LR * backOut(k);
    boilSeed('lens');
    glow(LX, LY, r * 1.5, '#BFE3F0', .35 * k);
    ctx.save(); const p = new Path2D(); p.arc(LX, LY, r, 0, TAU); ctx.clip(p);
    ctx.fillStyle = '#F6F2E8'; ctx.fillRect(LX - r, LY - r, 2 * r, 2 * r);
    const I = img(name), s = Math.min(I.width, I.height);
    if (o.blur) ctx.filter = `blur(${o.blur}px)`;
    ctx.globalAlpha = o.alpha ?? 1;
    ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, LX - r * .92, LY - r * .92, r * 1.84, r * 1.84);
    if (o.next) { ctx.globalAlpha = o.nextK; const J = img(o.next), s2 = Math.min(J.width, J.height); ctx.drawImage(J, (J.width - s2) / 2, (J.height - s2) / 2, s2, s2, LX - r * .92, LY - r * .92, r * 1.84, r * 1.84); }
    ctx.filter = 'none'; ctx.restore();
    inkStroke(ellPts(LX, LY, r, r, 48), true, 7, '#8C6524', 'ink'); inkStroke(ellPts(LX, LY, r + 14, r + 14, 48), true, 2, PAL.ink, 'ink');
  }
  function scope(t, lt, dur) {
    const a = cs('mi_story'), f = cs('mi_fv'), r = cs('mi_robust'), l = cs('mi_late'), e = ce('mi_late');
    setLab(t, { mx: 560, my: 800, ms: .9, focus: kf(t, [[r, 0], [r + 1.5, 1], [l + 3, 1], [wt('mi_late', 'tweaks'), 2.2]]) });
    // Clawd peering into the eyepiece, then turning to us
    clawd(260, 860, 22, { ...emotions(t, [[a - 1, 'thinking', { lookX: .6, lookY: -.8 }], [wt('mi_fv', 'good') + .2, 'sad'], [r + .4, 'surprised'], [r + 1.4, 'happy'], [l + .5, 'confused'], [wt('mi_late', 'Same') - .2, 'proud']]), flip: false, view: 'q' });
    // what's under the lens
    const kL = on(t, a + .5);
    const kCrisp = seg(t, wt('mi_robust', 'crisp') - .8, wt('mi_robust', 'crisp') + .3);
    const midNeuron = t < l + .4;
    if (midNeuron) lens(MT + '2009-mixed4d-161', kL, { blur: lerp(3, 0, seg(t, f, f + 2)), next: MT + '2017-mixed4d-161', nextK: kCrisp });
    else {
      const k1 = seg(t, wt('mi_late', 'breaks') - .3, wt('mi_late', 'breaks') + .3), k2 = seg(t, wt('mi_late', 'tweaks') - .2, wt('mi_late', 'tweaks') + .8);
      lens(k2 > 0 ? MT + '2017-mixed5a-400' : MT + '2009-mixed5a-400', 1, { next: k2 > 0 ? MT + '2026-mixed5a-400' : MT + '2017-mixed5a-400', nextK: k2 > 0 ? k2 : k1 * .0 });
    }
    // labels: the years
    const yr = t < r + .5 ? '2009-style' : t < l + .4 ? '2017 · + transformation robustness' : t < wt('mi_late', 'tweaks') ? 'a late-layer neuron…' : '2026 · regularization tweaks';
    hand(yr, LX, LY + LR + 60, 38, PAL.cream, kL, { stroke: PAL.ink, strokeW: .12 });
    // the strongest photos next to it, for the late neuron
    if (!midNeuron) ['top-mixed5a-400-1', 'top-mixed5a-400-2', 'top-mixed5a-400-3', 'top-mixed5a-400-4'].forEach((n, i) => print(MT + n, 1720, 200 + i * 175, 150, popk(t, wt('mi_late', 'Better') - .6 + i * .1), { key: 'tp' + i }));
    else ['top-mixed4d-161-1', 'top-mixed4d-161-2', 'top-mixed4d-161-3', 'top-mixed4d-161-4'].forEach((n, i) => print(MT + n, 1720, 200 + i * 175, 150, popk(t, r + 1.6 + i * .1) * (1 - seg(t, l, l + .4)), { key: 'tq' + i }));
    title('same neurons, better microscope', 760, 120, 56, PAL.cream, seg(t, wt('mi_late', 'Same') - .2, wt('mi_late', 'microscope') + .3), { stroke: PAL.ink, strokeW: .1 });
    title('the microscope just wasn’t tuned right', 760, 120, 48, PAL.cream, on(t, wt('mi_story', 'tuned') - 1, f + 1), { stroke: PAL.ink, strokeW: .1 });
    edges(lt, dur, { in: 'none', out: 'none' });
  }
  function model(t, lt, dur) {
    const a = cs('mi_model_too'), p = cs('mi_packing_story'), c = cs('mi_convnext'), d = cs('mi_two_things'), e = ce('mi_two_things');
    setLab(t, { scope: false });
    const kA = on(t, a, c);
    figure('blog/figs/fig005', 1220, 470, 1100, { k: on(t, wt('mi_model_too', 'looked') - .5, c + .2), key: 'iv1', rot: -.01 });
    if (kA > 0) {
      title('InceptionV1 · last layer', 1220, 150, 54, PAL.cream, seg(t, a + .3, a + 1.4), { stroke: PAL.ink, strokeW: .1 });
      hand('“essentially no interpretable neurons” · maybe 5%?', 1220, 810, 38, PAL.cream, seg(t, wt('mi_model_too', 'essentially') - .3, wt('mi_model_too', 'five') + .6), { stroke: PAL.ink, strokeW: .1 });
      const kp = on(t, p, c - .2);
      if (kp > 0) { card(1220, 470, 760, 230, { k: kp, text: 'the old story: too many features, too few neurons,\nso unrelated ones get packed together', size: 36, key: 'old', col: '#F2E0E4' }); }
    }
    const kC = on(t, c - .1);
    if (kC > 0) {
      figure('blog/figs/fig006', 1220, 450, 1100, { k: kC, key: 'cnx', tape: true });
      title('ConvNeXt · same size, same data', 1220, 120, 50, PAL.cream, seg(t, c + .2, c + 1.4), { stroke: PAL.ink, strokeW: .1 });
      notes(t, 760, 800, [[wt('mi_convnext', 'residual'), 'residual connections'], [wt('mi_convnext', 'normalization') - .4, 'layer normalization'], [wt('mi_convnext', 'beautiful') - .3, '…and the last layer is beautiful', { col: PAL.ochre }]], { size: 36, col: PAL.cream, gap: 56 });
      const kd = on(t, d);
      if (kd > 0) { card(1050, 860, 420, 120, { k: popk(t, wt('mi_two_things', 'learn') - .4), text: 'a network that learns well', size: 34, key: 'tw1', col: '#E7F0DC' }); card(1530, 860, 420, 120, { k: popk(t, wt('mi_two_things', 'tools') - .4), text: 'tools strong enough to see', size: 34, key: 'tw2', col: '#E5E9F2' }); }
    }
    clawd(250, 860, 22, emotions(t, [[a - 1, 'neutral'], [a + .5, 'sad'], [p + .3, 'nervous'], [c + .3, 'surprised'], [wt('mi_convnext', 'beautiful'), 'starstruck'], [d + .4, 'thinking'], [e - 1, 'proud']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#2E4A57', '#3E6170'] });
  }
  function numbers(t, lt, dur) {
    const a = cs('mi_numbers'), e = ce('mi_numbers');
    setStudy(t, { board: false });
    title('interpretable neurons in the last layer', 1060, 150, 56, PAL.ink, seg(t, a, a + 1.4));
    const bars = [[.05, 'tools of that era', 'InceptionV1 (2014)', wt('mi_numbers', 'five'), PAL.berry], [.5, 'better tools', 'same 2014 network', wt('mi_numbers', 'fifty'), PAL.ochre], [.7, 'modern regularization', 'retrained', wt('mi_numbers', 'seventy'), PAL.teal], [.99, 'ConvNeXt', 'same size', wt('mi_numbers', 'ninety-nine') || wt('mi_numbers', 'ninety'), PAL.sap]];
    bars.forEach(([f, l1, l2, ta, col], i) => {
      const x = 620 + i * 300, k = seg(t, ta - .4, ta + .6); boilSeed('nb' + i);
      paint(rectPts(x, 300, 140, 520, 1.2), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 });
      if (k <= 0) return;
      bar(x, 820, 140, 520, f, col, k, 'nb' + i);
      title(Math.round(f * 100 * ease(k)) + '%', x + 70, 820 - 520 * f * ease(k) - 50, 58, mixCol(col, PAL.ink, .2), 1);
      hand(l1, x + 70, 870, 30, PAL.ink, k); hand(l2, x + 70, 912, 26, PAL.slate, k);
    });
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .5, 'thinking'], [wt('mi_numbers', 'fifty'), 'surprised'], [wt('mi_numbers', 'seventy'), 'happy'], [wt('mi_numbers', 'ninety'), 'excited']]);
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2E4A57', '#3E6170']);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.sap, PAL.moss]);
  }
  shots([
    [chapStart('ch03'), cardShot],
    [cs('mi_story') - .25, scope],
    [cs('mi_model_too') - .3, model],
    [cs('mi_numbers') - .3, numbers],
  ]);
})();
