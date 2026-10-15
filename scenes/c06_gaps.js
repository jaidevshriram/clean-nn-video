// ch06 Superposition of the gaps: five causes, the believer, pr / Colorado / long context, the moving target,
// null vs last hypothesis, and why the opposite error is less worrying.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  function cardShot(t, lt, dur) { setStudy(t); clawd(300, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '06', 'Superposition of the gaps', PAL.berry); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.berry, '#9C3A55']); }

  // five small painted icons for the five causes
  function icon(k, x, y, s) {
    boilSeed('ic' + k);
    if (k === 0) { paint(rrPts(x - s * .2, y - s * .7, s * .4, s * .9, 6), { wash: '#C99A45', ink: PAL.ink, sw: .8 }); paint(ellPts(x, y + s * .45, s * .5, s * .15, 12), { wash: '#3A3550', ink: PAL.ink, sw: .8 }); }
    else if (k === 1) { paint(ribbon([[x - s * .5, y + s * .6], [x, y], [x + s * .5, y - s * .6]], s * .3, s * .05), { wash: PAL.cream, ink: PAL.ink, sw: .8 }); }
    else if (k === 2) { paint(rectPts(x - s * .6, y - s * .35, s * 1.2, s * .7, 2), { wash: PAL.brick, ink: PAL.ink, sw: .8 }); inkLine([[x - s * .1, y - s * .35], [x + s * .05, y], [x - s * .05, y + s * .35]], 1.4, PAL.ink, 'ink', 0); }
    else if (k === 3) { inkLine([[x - s * .5, y + s * .5], [x, y], [x + s * .4, y - s * .5]], 4, '#7A5B3E', 'ink', 0); inkLine([[x, y], [x + s * .4, y + s * .05]], 3, '#7A5B3E', 'ink', 0); inkLine([[x + s * .2, y - s * .25], [x - s * .15, y - s * .55]], 2.5, '#7A5B3E', 'ink', 0); }
    else { const K = []; for (let i = 0; i < 50; i++) { const a = i / 50 * TAU * 3; K.push([x + s * .5 * Math.sin(a) * Math.cos(a * .66), y + s * .45 * Math.sin(a * 1.33)]); } inkLine(K, 3, '#7A5A8C', 'ink', .5); }
  }
  const CAUSES = [['bad tools', 'the microscope'], ['bad explanations', 'built from those tools'], ['bad learning', 'architecture or data'], ['recursive generalization', 'related branches'], ['superposition', 'unrelated, rarely collide']];
  function causes(t, lt, dur) {
    const a = cs('gp_observer'), l = cs('gp_list'), l5 = cs('gp_list5'), e = ce('gp_list5');
    setStudy(t);
    title('“polysemantic” = no good explanation yet', BX, 190, 52, PAL.ink, seg(t, wt('gp_observer', 'explanation') - 1.2, wt('gp_observer', 'yet') + .3));
    hand('…a claim about the observer', BX, 260, 36, PAL.berry, seg(t, wt('gp_observer', 'observer') - .4, wt('gp_observer', 'observer') + .5));
    const at = [wt('gp_list', 'One'), wt('gp_list', 'Two'), wt('gp_list', 'Three'), wt('gp_list', 'Four'), wt('gp_list5', 'five')];
    CAUSES.forEach(([h, s], i) => {
      const x = BX - 480 + i * 240, y = 470, k = popk(t, at[i] - .2);
      card(x, y, 215, 280, { k, col: i === 4 ? '#ECE2F2' : i === 3 ? '#E7F0DC' : PAL.cream, rot: (i - 2) * .03, key: 'cs' + i });
      if (k > .3) { icon(i, x, y - 50, 70); hand((i + 1) + ' · ' + h, x, y + 50, 28, PAL.ink, 1, { maxW: 190 }); hand(s, x, y + 105, 22, PAL.slate, 1, { maxW: 190 }); }
    });
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [l5 + .2, 'suspicious']], { point: [[l, e]] });
  }
  function believer(t, lt, dur) {
    const a = cs('gp_believer'), x = cs('gp_expected'), e = ce('gp_expected');
    setCountry(t, { mood: 'dusk' });
    // Clawd with a superposition pennant; then a table of agents testing lanterns
    const flagK = 1 - seg(t, wt('gp_expected', 'never') - .2, wt('gp_expected', 'never') + .5);
    clawd(380, 930, 24, { ...emotions(t, [[a - 1, 'proud'], [wt('gp_believer', 'taste') - .3, 'thinking'], [x + .3, 'determined'], [wt('gp_expected', 'never'), 'surprised'], [wt('gp_expected', 'held') - .2, 'happy']]), aR: 1.3 * flagK + .2,
      armR: (u, sw) => { if (flagK < .05) return; inkLine([[0, 0], [u * .3, -u * 6 * flagK]], sw * 2.2, '#7A5B3E', 'ink', 0); paint([[u * .3, -u * 6 * flagK], [u * 4.5, -u * 5.2 * flagK], [u * .3, -u * 4.2 * flagK]], { wash: PAL.violet, ink: PAL.ink, sw }); } });
    if (flagK > .3) hand('superposition!', 480, 600, 34, PAL.cream, seg(t, a + .3, a + 1) * flagK, { stroke: PAL.ink, strokeW: .1 });
    const kA = on(t, wt('gp_believer', 'agents') - .5);
    for (let i = 0; i < 4; i++) {
      const nx = 950 + i * 230, ny = 520 + 20 * Math.sin(i), ta = x + 1 + i * .8;
      const good = t > wt('gp_expected', 'resolving') - .3 + i * .3;
      neuron(nx, ny, 40, { on: good ? .9 : .25, key: 'bn' + i });
      if (kA > 0) clawd(nx, 760, 13, { ...feel(good ? 'happy' : 'thinking', t + i * .7), boilKey: 'ag' + i, aR: 1.2 + .2 * Math.sin(t * 5 + i), dx: 0 });
      if (good) tick(nx + 50, ny - 50, 46, seg(t, wt('gp_expected', 'resolving') - .3 + i * .3, wt('gp_expected', 'resolving') + .2 + i * .3));
    }
    hand('do agents have research taste?', 1300, 260, 40, PAL.ink, seg(t, wt('gp_believer', 'taste') - .6, wt('gp_believer', 'taste') + .4) * (1 - seg(t, x, x + .5)));
    hand('expected: fragments in superposition', 1300, 260, 38, PAL.violet, on(t, x + .2, wt('gp_expected', 'never') - .1));
    hand('…they kept resolving to simple explanations', 1300, 260, 38, PAL.sap, on(t, wt('gp_expected', 'resolving') - .3));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#5E7F6E', '#8C6B9C'] });
  }
  function evidence(t, lt, dur) {
    const p = cs('gp_pr'), c = cs('gp_colorado'), s = cs('gp_summary'), x = cs('gp_context'), e = ce('gp_context');
    setStudy(t);
    // pr
    const kP = on(t, p - .1, c - .2);
    if (kP > 0) {
      const fw = 940, fh = fw * 386 / 1320;
      figure('blog/figs/fig011', BX, 430, fw, { k: kP, tape: true, key: 'f11' });
      title('the “pr” neuron', BX, 200, 56, PAL.ink, seg(t, p + .2, p + 1.2));
      hand('decode the URLs: “pr” words · translate the Bengali: “pr”', BX, 680, 36, PAL.sap, seg(t, wt('gp_pr', 'decoded') - .3, ce('gp_pr')));
    }
    // Colorado + the summary motif
    const kC = on(t, c - .1, x - .2);
    if (kC > 0) {
      figure('blog/figs/fig012', BX - 120, 440, 900, { k: kC, tape: true, key: 'f12' });
      title('the “comma” neuron is a Colorado neuron', BX, 190, 50, PAL.ink, seg(t, c + .2, wt('gp_colorado', 'Colorado') + .4));
      const kh = seg(t, wt('gp_colorado', 'hiking') - .5, wt('gp_colorado', 'hiking') + .3);
      if (kh > 0) { boilSeed('mtn'); push(); translate(BX + 470, 470); scale(backOut(kh)); paint([[-130, 90], [-40, -70], [10, -10], [60, -100], [150, 90]], { wash: '#8EA0B5', ink: PAL.ink, sw: 1 }); paint([[60, -100], [90, -55], [30, -50]], { wash: '#FFFFFF', ink: null }); paint(rrPts(-50, 40, 80, 50, 12), { wash: '#7A5B3E', ink: PAL.ink, sw: .8 }); pop(); hand('turn it up → plans a hike', BX + 470, 610, 32, PAL.sap, kh); }
      const ks = on(t, s);
      if (ks > 0) { swash(BX - 420, 740, 840, 80, '#F3D9A6', ks, 'sm'); hand('the summary motif: attention collects on punctuation', BX, 740, 38, PAL.ink, seg(t, wt('gp_summary', 'motif') - .6, wt('gp_summary', 'motif') + .6)); }
    }
    // long context; health spam
    const kX = on(t, x - .1);
    if (kX > 0) {
      figure('blog/figs/fig013', BX, 400, 900, { k: kX, tape: true, key: 'f13' });
      hand('two paragraphs felt like enough… they weren’t', BX, 620, 38, PAL.berry, seg(t, wt('gp_context', 'enough') - .5, wt('gp_context', 'polysemantic') + .4));
      card(BX, 740, 560, 110, { k: popk(t, wt('gp_context', 'spam') - .5), text: 'a “mess” → signs within pages of health spam', size: 32, key: 'spam', col: '#F2E0E4' });
    }
    presenter(t, 300, 960, 22, [[p - 1, 'neutral'], [p + .5, 'suspicious'], [wt('gp_pr', 'decoded'), 'surprised'], [c + .4, 'thinking'], [wt('gp_colorado', 'hiking'), 'laugh'], [x + .3, 'nervous'], [wt('gp_context', 'sense') - .2, 'relieved']], { point: [[p + .4, e]] });
  }
  function moving(t, lt, dur) {
    const a = cs('gp_moved'), w = cs('gp_went_back'), e = ce('gp_went_back');
    setCountry(t, { mood: 'night' });
    const spots = [[520, 520, 'strong activations', wt('gp_moved', 'strong')], [860, 400, 'weak ones', wt('gp_moved', 'weak')], [1200, 520, 'combinations', wt('gp_moved', 'combinations')], [1540, 400, 'unlooked neurons', wt('gp_moved', 'looked') - .4]];
    spots.forEach(([x, y, lab, ta], i) => { neuron(x, y, 46, { on: t > ta ? .9 : .3, key: 'sp' + i }); hand(lab, x, y + 90, 30, PAL.cream, on(t, ta - .3), { stroke: PAL.ink, strokeW: .12 }); });
    // the knot-gremlin hops between them, staying one step ahead
    const hop = kf(t, [[a, 0], ...spots.map((s, i) => [s[3] + .2, i]), [w, 3], [w + .5, 3]], easeInOut);
    const i0 = Math.floor(hop), fr = hop - i0, s0 = spots[Math.min(3, i0)], s1 = spots[Math.min(3, i0 + 1)];
    const gp = arcPt([s0[0], s0[1] - 80], [s1[0], s1[1] - 80], 120, fr);
    const gone = seg(t, wt('gp_went_back', 'fell') - .3, wt('gp_went_back', 'fell') + .5);
    if (gone < 1) { boilSeed('grem'); push(); translate(gp[0], gp[1] + gone * 600); const K = []; for (let i = 0; i < 40; i++) { const q = i / 40 * TAU * 3; K.push([30 * Math.sin(q) * Math.cos(q * .66), 26 * Math.sin(q * 1.33)]); } paint(ellPts(0, 0, 32, 28, 16), { wash: '#B79BC6', ink: null }); inkLine(K, 3.5, '#7A5A8C', 'ink', .5); paint(ellPts(-9, -4, 4, 6, 8), { wash: PAL.ink, ink: null }); paint(ellPts(9, -4, 4, 6, 8), { wash: PAL.ink, ink: null }); pop(); }
    // Clawd chasing, then turning back
    const cx = kf(t, [[a, 300], ...spots.map((s, i) => [s[3] + .8, s[0] - 180]), [w, 1300]], easeInOut);
    const back = t > w + .3;
    clawd(back ? lerp(1300, 900, ease(seg(t, w + .3, w + 2.5))) : cx, 950, 20, { ...emotions(t, [[a - 1, 'determined'], [wt('gp_moved', 'combinations'), 'angry'], [w + .2, 'thinking'], [wt('gp_went_back', 'fell'), 'surprised'], [e - 1.5, 'idea']]), view: back ? 'q' : 'side', flip: back, walk: t * 2.4 });
    // the original evidence: a box tower that collapses
    const fk = seg(t, wt('gp_went_back', 'fell') - .2, wt('gp_went_back', 'fell') + 1);
    if (t > w) for (let i = 0; i < 3; i++) { const y0 = 880 - i * 90, rot = fk * (i + 1) * .5, dy = fk * fk * (i * 40 + 30); boilSeed('ev' + i); push(); translate(600 + fk * i * 40, y0 + dy); rotate(rot); paint(rectPts(-90, -45, 180, 90, 2), { wash: ['#E5E9F2', '#ECE2F2', '#F2E0E4'][i], ink: PAL.ink, sw: .9 }); pop(); }
    if (t > w) hand('the original evidence', 600, 580, 32, PAL.cream, on(t, w + .5), { stroke: PAL.ink, strokeW: .12 });
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#2F3C7A', '#3B3B6D'] });
  }
  function nullHyp(t, lt, dur) {
    const n = cs('gp_null'), l = cs('gp_lookalikes'), f = cs('gp_felt_right'), e = ce('gp_felt_right');
    setStudy(t);
    // the hypothesis list: superposition slides from top (null) to bottom (last)
    const kN = on(t, n - .1, l);
    if (kN > 0) {
      const items = ['superposition', 'bad tools', 'recursive generalization', 'bad architecture', 'generalization not yet understood'];
      const slide = ease(seg(t, wt('gp_null', 'last') - .4, wt('gp_null', 'last') + .8));
      items.forEach((s, i) => { const yi = i === 0 ? lerp(0, 4, slide) : i - slide; card(BX + 120, 270 + yi * 105, 620, 86, { k: kN, text: s, size: 34, col: i === 0 ? '#ECE2F2' : PAL.cream, key: 'h' + i, pin: false }); });
      hand(slide < .5 ? 'the null hypothesis?' : 'the last hypothesis', BX - 400, 300 + slide * 420, 36, PAL.violet, kN);
      hand('most radical · least testable', BX - 400, 360 + slide * 420, 30, PAL.slate, seg(t, wt('gp_null', 'radical') - .3, wt('gp_null', 'testable') + .3));
    }
    const kL = on(t, l - .1, f - .2);
    if (kL > 0) {
      const looks = [['bad tools', 'reward-hacked feature viz', wt('gp_lookalikes', 'tools')], ['growth not followed', 'the “iy” neuron', wt('gp_lookalikes', 'recursive')], ['bad architecture', 'InceptionV1’s last layer', wt('gp_lookalikes', 'architecture')], ['generalization not understood', 'cats and cars → V', wt('gp_lookalikes', 'cat') - .3]];
      title('what “doesn’t make sense” can be', BX, 190, 50, PAL.ink, seg(t, l, l + 1.2));
      looks.forEach(([h, s, ta], i) => { const x = BX - 450 + i * 300, k = popk(t, ta - .3); card(x, 470, 270, 300, { k, key: 'lk' + i, rot: (i - 1.5) * .03 }); if (k > .4) { emote('?', x, 400, 18, 1, t); hand(h, x, 500, 30, PAL.ink, 1, { maxW: 240 }); hand(s, x, 560, 26, PAL.sap, seg(t, ta, ta + .6), { maxW: 240 }); } });
    }
    const kF = on(t, f - .1);
    if (kF > 0) card(BX, 450, 900, 340, { k: kF, text: '“superposition is often treated as the default hypothesis simply because it seems intuitively more compelling … but there is little evidence.”\n\n— Softmax Linear Units, Anthropic, 2022', size: 34, col: '#FBF6EC', key: 'q' });
    if (kF > 0) hand('no superposition circuit found in a real network since 2019 — and that one was an error', BX, 760, 32, PAL.berry, seg(t, wt('gp_felt_right', 'nobody') - .3, wt('gp_felt_right', 'error') + .4));
    presenter(t, 300, 960, 22, [[n - 1, 'neutral'], [n + .3, 'shy'], [wt('gp_null', 'last'), 'determined'], [l + .3, 'thinking'], [f + .3, 'smug']], { point: [[n + .3, e]] });
  }
  function testable(t, lt, dur) {
    const o = cs('gp_opposite'), s = cs('gp_testable'), n = cs('gp_narrow'), e = ce('gp_narrow');
    setStudy(t);
    title('the opposite error?', BX, 190, 56, PAL.ink, on(t, o, s + .5));
    hand('assuming every neuron has a sensible story', BX, 260, 34, PAL.slate, on(t, wt('gp_opposite', 'assuming') - .3, s + .5));
    const kS = on(t, s - .1, n);
    if (kS > 0) {
      const rows = [['a better tool', 'resolves it or doesn’t', wt('gp_testable', 'tool')], ['retraining', 'shows if learning was the problem', wt('gp_testable', 'Retraining')], ['recursive generalization', 'can be watched as it grows', wt('gp_testable', 'watched')], ['superposition', 'only symptom: “doesn’t make sense”', wt('gp_testable', 'symptom') - .5]];
      rows.forEach(([h, d, ta], i) => { const k = seg(t, ta - .3, ta + .6); if (k <= 0) return; const y = 360 + i * 100; if (i < 3) tick(BX - 470, y, 50, k); else emote('?', BX - 470, y + 10, 14, k, t); hand(h, BX - 420, y, 40, i === 3 ? PAL.violet : PAL.ink, k, { align: 'left' }); hand(d, BX + 60, y, 32, PAL.slate, k, { align: 'left' }); });
    }
    const kN = on(t, n - .1);
    if (kN > 0) {
      // a narrow target vs the huge region of "something that doesn't make sense"
      boilSeed('tgt'); paint(rectPts(BX - 580, 300, 620, 440, 2), { wash: '#ECE2F2', ink: PAL.ink, sw: .8 }); hand('“doesn’t make sense” covers everything', BX - 270, 700, 30, PAL.violet, kN);
      for (let r = 3; r >= 1; r--) paint(ellPts(BX - 270, 500, r * 34, r * 34, 24), { wash: r % 2 ? PAL.berry : PAL.cream, ink: PAL.ink, sw: .8 });
      hand('a real explanation is narrow', BX - 270, 360, 30, PAL.berry, kN);
      const kh = seg(t, wt('gp_narrow', 'Steer') - .3, wt('gp_narrow', 'hike') + .3);
      if (kh > 0) hand('Colorado? steer it → a hike ✓', BX + 330, 380, 36, PAL.sap, kh);
      const kr = seg(t, wt('gp_narrow', 'list') - 1, wt('gp_narrow', 'list') + .5);
      if (kr > 0) { card(BX + 330, 560, 420, 100, { k: kr, text: '↑ recursive generalization', size: 34, col: '#E7F0DC', key: 'rk1', pin: false }); card(BX + 330, 680, 420, 100, { k: seg(t, wt('gp_narrow', 'far') - .3, wt('gp_narrow', 'far') + .4), text: '↓ superposition', size: 34, col: '#ECE2F2', key: 'rk2', pin: false }); }
    }
    presenter(t, 300, 960, 22, [[o - 1, 'neutral'], [o + .3, 'nervous'], [s + .3, 'determined'], [n + .3, 'thinking'], [wt('gp_narrow', 'hike'), 'laugh'], [wt('gp_narrow', 'far'), 'proud']], { point: [[s, e]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#5E7F6E', PAL.sap]);
  }
  shots([
    [chapStart('ch06'), cardShot],
    [cs('gp_observer') - .25, causes],
    [cs('gp_believer') - .3, believer],
    [cs('gp_pr') - .3, evidence],
    [cs('gp_moved') - .3, moving],
    [cs('gp_null') - .3, nullHyp],
    [cs('gp_opposite') - .2, testable],
  ]);
})();
