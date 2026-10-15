// ch07 Exploring image models: why vision; neurons as control flow and gates; votes and negative sides; neurons
// under pressure; late circuits; what dictionaries learn; rare things and the umbrella that became a bee.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  const R = 'blog/raw/', NP = R + 'negative-poles-v2/', PE = R + 'pose-everywhere/', TV = R + 'tiny-vehicles/', UC = R + 'umbrella-circuit/';
  function cardShot(t, lt, dur) { setCountry(t, { mood: 'day' }); clawd(400, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '07', 'Exploring image models', PAL.teal); if (lt < .3) brushWipe(.5 + lt / .6, ['#5E7F6E', PAL.sap]); }

  function why(t, lt, dur) {
    const a = cs('im_why'), b = cs('im_blur'), th = cs('im_three'), e = ce('im_three');
    setStudy(t);
    const kA = on(t, a, b - .1);
    if (kA > 0) { title('we can see small image models clearly', BX, 200, 54, PAL.ink, seg(t, a + .2, a + 1.6)); notes(t, BX - 380, 340, [[wt('im_why', 'huge'), 'language models are huge'], [wt('im_why', 'attention'), 'attention mixes many mechanisms'], [wt('im_why', 'surprising'), 'their patterns are often surprising']], { size: 40, gap: 80 }); }
    const kB = on(t, b - .1, th - .1);
    if (kB > 0) {
      const ph = PE + 'medium/0', k2 = seg(t, wt('im_blur', 'itself') - .4, wt('im_blur', 'itself') + .4);
      for (const [x, lab, ka] of [[BX - 300, 'dog or cat?', 1], [BX + 300, 'blurry image, or blurry eyes?', k2]]) {
        if (ka <= 0) continue;
        boilSeed('bl' + x); paint(rectPts(x - 170, 330, 340, 300, 2), { wash: PAL.cream, ink: PAL.ink, sw: .9 });
        ctx.save(); ctx.filter = 'blur(6px)'; ctx.drawImage(img(ph), x - 150, 350, 300, 260); ctx.restore();
        hand(lab, x, 680, 34, PAL.ink, ka);
      }
      hand('the blur doesn’t favour either answer', BX - 300, 740, 28, PAL.sap, seg(t, wt('im_blur', 'favor') - .4, wt('im_blur', 'favor') + .5));
      hand('every flaw in your eyesight counts as blur', BX + 300, 740, 28, PAL.berry, seg(t, wt('im_blur', 'flaw') - .4, wt('im_blur', 'blur', 2) + .5));
    }
    const kT = on(t, th - .1);
    if (kT > 0) {
      title('three ConvNeXts, ~300× apart in size', BX, 200, 54, PAL.ink, seg(t, th + .2, th + 1.6));
      const M = [['small', '92k', 3, wt('im_three', 'small')], ['medium', '7.06M · = InceptionV1', 5, wt('im_three', 'medium')], ['large', '28.6M', 7, wt('im_three', 'large')]];
      M.forEach(([n, p, cols, ta], i) => { const k = seg(t, ta - .3, ta + .8); if (k <= 0) return; const cx = BX - 400 + i * 400; for (let l = 0; l < cols; l++) for (let r = 0; r < 2 + i; r++) neuron(cx - (cols - 1) * 26 + l * 52, 470 + r * 52 - i * 26, 19 * backOut(clamp(k * 2 - (l + r) * .1)), { on: .5, key: 'm' + i + l + r, glow: false }); hand(n, cx, 680, 44, PAL.ink, k); hand(p, cx, 740, 32, PAL.slate, k); });
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [b + .3, 'thinking'], [wt('im_blur', 'flaw'), 'nervous'], [th + .3, 'proud']], { point: [[a + .3, e]] });
  }

  // gates: a road junction in the network country
  function gates(t, lt, dur) {
    const c = cs('im_control'), g = cs('im_gate'), g2 = cs('im_gate2'), g3 = cs('im_gate3'), e = ce('im_gate3');
    setCountry(t, { mood: 'day' });
    camKeys(t, [[c - .3, 960, 540, 1], [g3, 960, 540, 1], [g3 + 1.5, 1300, 380, 1.3], [e, 1320, 380, 1.32]], .5);
    // roads: pixels in from the left → shared pose road → gate → car road (up-right) / dog road (down-right)
    boilSeed('roads'); const road = (P, w) => paint(ribbon(P, w, w), { wash: '#D9C29A', ink: PAL.ink, sw: .9 });
    road([[-50, 620], [300, 600], [700, 610]], 90); road([[700, 610], [960, 560], [1300, 380], [1800, 300]], 80); road([[700, 610], [960, 680], [1300, 820], [1800, 900]], 80);
    hand('pixels', 120, 520, 36, PAL.ink, on(t, wt('im_gate', 'Pixels') - .3));
    title('a neuron is control flow', 960, 120, 56, PAL.ink, on(t, c, g + .5));
    hand('less about what it sees, more about what it does to the flow', 960, 190, 34, PAL.slate, on(t, wt('im_control', 'flow') - .8, g + .5));
    // pose-sharing group early
    neuron(380, 470, 44, { on: .7, img: PE + 'large/1', key: 'pose', glow: false, label: 'shared pose', labelK: on(t, wt('im_gate', 'pose') - .3) });
    // the gate
    const kG = on(t, g2 - .2);
    neuron(760, 470, 54, { on: .6 + .3 * Math.sin(t * 3), neg: .4 * kG, key: 'gate', label: 'gate', labelK: kG, labelSize: 34 });
    if (kG > 0) { hand('+ cars', 860, 380, 34, PAL.sap, kG); hand('− dogs', 860, 800, 34, '#4E7FB8', kG); }
    // car specialists and the dog region
    const sp = [[1320, 250, NP + 'taxis-positive-1', 'taxi'], [1560, 330, NP + 'taxis-negative-1', 'ambulance']];
    sp.forEach(([x, y, im, lab], i) => { const k = on(t, wt('im_gate', 'taxis') - .3 + i * .3); neuron(x, y, 56 * backOut(k), { img: im, key: 'spc' + i, glow: false }); if (k > .5) tag(lab, x, y - 56, k, { dy: -50, size: 26 }); });
    neuron(1450, 900, 56 * on(t, wt('im_gate2', 'region') - .4), { img: PE + 'medium/0', key: 'dogreg', glow: false });
    if (on(t, wt('im_gate2', 'region') - .4) > .5) tag('dog region', 1450, 850, 1, { dy: -60, size: 26 });
    // travellers: cars and dogs arrive together, split at the gate
    const trav = [[TV + 'positive-02', 1], [PE + 'large/0', -1], [TV + 'positive-05', 1], [PE + 'medium/2', -1], [TV + 'positive-07', 1], [PE + 'large/4', -1]];
    trav.forEach(([im, s], i) => {
      const t0 = g + .5 + i * 1.1, f = frac((t - t0) / 6.6); if (t < t0) return;
      let p; if (f < .5) p = [lerp(-40, 700, f / .5), 610 + 8 * Math.sin(f * 30)]; else { const q = (f - .5) / .5; p = s > 0 ? [lerp(700, 1300, q), lerp(610, 380, q)] : [lerp(700, 1300, q), lerp(610, 820, q)]; }
      if (f >= .5 && t < g2 + .5 && s < 0) p = [700 + 10 * Math.sin(t * 9), 650];   // before the gate exists, dogs queue
      neuron(p[0], p[1] - 50, 46, { img: im, key: 'tv' + i, glow: false });
    });
    hand('finer distinctions in a bigger model', 1320, 140, 34, PAL.ink, on(t, wt('im_gate3', 'bigger') - .5));
    hand('one view of a taxi vs another', 1320, 190, 28, PAL.slate, on(t, wt('im_gate3', 'finer') - .3));
    camEnd();
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.sap, PAL.moss] });
  }

  function sportscar(t, lt, dur) {
    const a = cs('im_sportscar'), e = ce('im_sportscar');
    setStudy(t);
    const F = fig('blog/figs/fig015', BX + 40, 470, 1080, 0);
    camKeys(t, [[a - .3, 960, 540, 1], [wt('im_sportscar', 'tables') - .5, F.p(.5, .4)[0], F.p(.5, .4)[1], 1.25], [wt('im_sportscar', 'last') - .3, F.p(.8, .45)[0], F.p(.8, .45)[1], 1.35], [e, 960, 540, 1]], .3);
    fig('blog/figs/fig015', BX + 40, 470, 1080, on(t, a - .2), { tape: true });
    fring(F, [.38, .05, .22, .45], seg(t, wt('im_sportscar', 'rectangular') - .3, wt('im_sportscar', 'cabinets') + .3), PAL.sap);
    fring(F, [.38, .52, .22, .4], seg(t, wt('im_sportscar', 'snakes') - .3, wt('im_sportscar', 'dogs') + .3), '#4E7FB8');
    fring(F, [.8, .05, .2, .9], seg(t, wt('im_sportscar', 'convertibles') - .3, wt('im_sportscar', 'wagons') + .3), PAL.berry);
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('im_sportscar', 'convertibles'), 'happy']], { point: [[a + .3, e]] });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: [PAL.sap, PAL.moss] });
  }

  function votes(t, lt, dur) {
    const a = cs('im_votes'), b = cs('im_votes2'), e = ce('im_votes2');
    setStudy(t);
    title('a neuron is built from votes', BX, 190, 58, PAL.ink, seg(t, a + .2, a + 1.4));
    // ballot box in the middle; slips fly in from both sides
    boilSeed('box'); paint(rrPts(BX - 130, 420, 260, 220, 16), { wash: '#B98A5E', ink: PAL.ink, sw: 1.2 }); paint(rectPts(BX - 60, 418, 120, 14, 1), { wash: PAL.ink, ink: null });
    for (let i = 0; i < 10; i++) {
      const pos = i % 2 === 0, t0 = wt('im_votes', 'votes') + i * .35, f = seg(t, t0, t0 + 1); if (f <= 0) continue;
      const p = arcPt([pos ? BX - 560 : BX + 560, 520 + 60 * hash(i)], [BX, 420], 160, f);
      if (f < 1) { boilSeed('slip' + i); push(); translate(p[0], p[1]); rotate(f * 3 * (pos ? 1 : -1)); paint(rectPts(-36, -22, 72, 44, 1), { wash: pos ? '#D6EBC8' : '#CFE0F2', ink: PAL.ink, sw: .7 }); pop(); letter(pos ? '+' : '−', p[0], p[1], 34, pos ? PAL.sap : '#4E7FB8', { shadow: false }); }
    }
    hand('+ positive side', BX - 520, 420, 36, PAL.sap, on(t, wt('im_votes', 'positive') - .3)); hand('− negative side', BX + 520, 420, 36, '#4E7FB8', on(t, wt('im_votes', 'negative', 1) - .3));
    hand('the votes add up before the nonlinearity', BX, 700, 36, PAL.ink, seg(t, wt('im_votes', 'add') - .4, wt('im_votes', 'nonlinearity') + .4));
    hand('so the negative side is shaped by learning too', BX, 760, 34, PAL.sap, seg(t, wt('im_votes', 'shaped') - .5, wt('im_votes', 'too') + .4));
    const kb = on(t, b);
    if (kb > 0) { card(BX, 560, 560, 160, { k: kb, text: 'the negative side says which\ndistinction matters here', size: 36, key: 'neg', col: '#E5E9F2' }); title('V  vs  O', BX, 860, 70, PAL.clayDk, seg(t, wt('im_votes2', 'O') - .5, wt('im_votes2', 'O') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [b + .3, 'idea']], { point: [[a + .3, e]] });
  }

  function pairs(t, lt, dur) {
    const a = cs('im_pairs'), s = cs('im_small'), e = ce('im_small');
    setStudy(t);
    const kA = on(t, a - .2, s);
    const F = fig('blog/figs/fig016', BX + 40, 450, 1120, kA, { tape: true });
    if (kA > 0) { hand('taxis vs ambulances · broccoli vs cauliflower · spoonbills vs flamingos', BX + 40, 790, 34, PAL.ink, seg(t, wt('im_pairs', 'taxis') - .3, wt('im_pairs', 'flamingos') + .4)); }
    const kS = on(t, s - .1);
    const G = fig('blog/figs/fig017', BX + 60, 450, 900, kS, { tape: true });
    if (kS > 0) {
      fring(G, [0, .05, .55, .9], seg(t, wt('im_small', 'cars') - .3, wt('im_small', 'carts') + .3), PAL.sap);
      fring(G, [.56, .05, .44, .9], seg(t, wt('im_small', 'boats') - .3, wt('im_small', 'planes') + .3), '#4E7FB8');
      hand('a water-based ox cart?!', BX + 330, 830, 36, PAL.berry, seg(t, wt('im_small', 'ox') - .4, wt('im_small', 'existed') + .3));
      hand('coarser distinctions, ending early', BX - 200, 830, 34, PAL.ink, seg(t, wt('im_small', 'coarser') - .3, wt('im_small', 'early') + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [s + .3, 'thinking'], [wt('im_small', 'ox'), 'surprised'], [wt('im_small', 'early'), 'happy']], { point: [[a + .3, e]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2E4A57', '#3E6170']);
  }

  // under pressure: crush layer 3b from 480 to 10
  function pressure(t, lt, dur) {
    const a = cs('im_pressure'), b = cs('im_3b'), p = cs('im_3b_predict'), r = cs('im_3b_result'), s = cs('im_3b_sae'), l = cs('im_lastcrush'), e = ce('im_lastcrush');
    setLab(t, { scope: false });
    const kA = on(t, a, b - .1);
    if (kA > 0) { title('why are early layers clean?', 960, 200, 60, PAL.cream, seg(t, a + .2, a + 1.4), { stroke: PAL.ink, strokeW: .1 }); hand('“not many early features”…', 960, 290, 40, PAL.cream, seg(t, wt('im_pressure', 'standard') - .3, wt('im_pressure', 'represent') + .3), { stroke: PAL.ink, strokeW: .1 }); hand('…yet AlexNet to CLIP all have the right ratio?', 960, 360, 38, PAL.ochre, seg(t, wt('im_pressure', 'Alex') - .4, wt('im_pressure', 'different') + .3), { stroke: PAL.ink, strokeW: .1 }); }
    const kB = on(t, b - .1, r - .2);
    if (kB > 0) {
      // the press: 480 little lanterns → 10
      const crush = ease(seg(t, wt('im_3b', 'ten') - .4, wt('im_3b', 'ten') + 1.2)), n = Math.round(lerp(480, 10, crush));
      const cols = Math.ceil(Math.sqrt(n * 3)), rowsN = Math.ceil(n / cols), wbox = lerp(1300, 520, crush);
      for (let i = 0; i < n; i++) { const x = 960 - wbox / 2 + (i % cols + .5) * wbox / cols, y = 560 + (Math.floor(i / cols) - rowsN / 2) * Math.min(40, 300 / rowsN); neuron(x, y, Math.min(16, wbox / cols * .4), { on: .5, key: 'l' + (i % 40), glow: false, sw: .5 }); }
      boilSeed('press'); const py = lerp(140, 400, crush) - 60 * Math.max(0, Math.sin(t * 2)) * (1 - crush);
      paint(rectPts(600, py - 80, 720, 70, 2), { wash: '#6E7891', ink: PAL.ink, sw: 1.2 }); inkLine([[960, py - 80], [960, -20]], 9, '#3A3550', 'ink', 0);
      title(n + ' neurons', 960, 830, 60, PAL.cream, kB, { stroke: PAL.ink, strokeW: .1 });
      hand('InceptionV1 layer 3b · curve detectors · no residual bypass', 960, 900, 34, PAL.cream, seg(t, b + .5, b + 2), { stroke: PAL.ink, strokeW: .1 });
      const kp = on(t, p, r - .2);
      if (kp > 0) { card(1520, 400, 440, 320, { k: kp, col: '#F2E0E4', key: 'pred', text: 'predicted if superposition:\ncurve + orange spiral +\nspider web… on one neuron', size: 30 }); hand('crushed 48×', 1520, 610, 40, PAL.berry, seg(t, wt('im_3b_predict', 'forty-eight') - .3, wt('im_3b_predict', 'dramatic') + .2)); }
    }
    const kR = on(t, r - .1, l - .1);
    if (kR > 0) {
      const sae = t > s - .2;
      const F = fig(sae ? 'blog/figs/fig019' : 'blog/figs/fig018', 1000, 470, 1300, kR, { key: sae ? 'f19' : 'f18' });
      if (!sae) { hand('stays interpretable — just coarser', 1000, 950, 40, PAL.cream, seg(t, wt('im_3b_result', 'interpretable') - .3, wt('im_3b_result', 'coarser') + .3), { stroke: PAL.ink, strokeW: .1 }); }
      else hand('a sparse autoencoder can’t pull ten curves back out', 1000, 950, 40, PAL.cream, seg(t, s + .5, s + 2.5), { stroke: PAL.ink, strokeW: .1 });
    }
    const kL = on(t, l - .1);
    if (kL > 0) { fig('blog/figs/fig020', 1000, 470, 1300, kL, { key: 'f20' }); hand('ConvNeXt last layer: 1,024 → 13 neurons · it broadens', 1000, 950, 40, PAL.cream, seg(t, l + .4, wt('im_lastcrush', 'broadens') + .3), { stroke: PAL.ink, strokeW: .1 }); }
    clawd(200, 870, 18, emotions(t, [[a - 1, 'thinking'], [b + .3, 'determined'], [wt('im_3b', 'ten'), 'mischief'], [p + .3, 'nervous'], [r + .3, 'surprised'], [wt('im_3b_result', 'coarser'), 'happy'], [l + .5, 'proud']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#2E4A57', '#3E6170'] });
  }

  function lateCircuits(t, lt, dur) {
    const a = cs('im_circuits'), e = ce('im_circuits');
    setStudy(t);
    const F = fig('blog/figs/fig021', BX + 30, 470, 1180, 0);
    camKeys(t, [[a - .2, 960, 540, 1], [a + 2.5, F.p(.85, .5)[0], F.p(.85, .5)[1], 1.6], [e, 960, 540, 1]], .3);
    fig('blog/figs/fig021', BX + 30, 470, 1180, on(t, a - .2), { tape: true });
    fring(F, [.8, .02, .2, .96], seg(t, wt('im_circuits', 'monasteries') - .3, wt('im_circuits', 'monasteries') + .5), PAL.berry);
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [wt('im_circuits', 'organized'), 'proud']], { point: [[a + .3, e]] });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2E4A57', '#3E6170'] });
  }

  function dictionaries(t, lt, dur) {
    const a = cs('im_dict'), s = cs('im_spiders'), n = cs('im_sae_numbers'), b = cs('im_baseball'), e = ce('im_baseball');
    setStudy(t);
    const kA = on(t, a, s);
    if (kA > 0) { title('what do dictionaries learn?', BX, 200, 58, PAL.ink, seg(t, a + .2, a + 1.4)); hand('if combinations hid building blocks, an SAE should find them', BX, 300, 36, PAL.slate, seg(t, wt('im_dict', 'combinations') - .3, wt('im_dict', 'lack') + .3)); stamp('NONE FOUND', BX, 520, wt('im_dict', 'any') - .1, t, { size: 60 }); }
    const kS = on(t, s - .1, n);
    if (kS > 0) {
      // neurons: building blocks (legs, webs); SAE: those blocks grouped by context (spiders in settings)
      card(BX - 300, 470, 480, 420, { k: kS, key: 'nb', col: '#E7F0DC', draw: () => { boilSeed('legs'); for (let i = 0; i < 4; i++) { inkLine([[-120 + i * 70, -40], [-100 + i * 70, -110], [-70 + i * 70, -40]], 3, PAL.ink, 'ink', .5); } for (let r = 1; r <= 4; r++) inkStroke(ellPts(0, 70, r * 26, r * 22, 8), true, .8, PAL.slate, 'inkfine'); for (let i = 0; i < 8; i++) { const q = i / 8 * TAU; inkLine([[0, 70], [Math.cos(q) * 110, 70 + Math.sin(q) * 90]], .7, PAL.slate, 'inkfine', 0); } } });
      hand('neurons: leg patterns, webs', BX - 300, 640, 34, PAL.ink, kS);
      card(BX + 300, 470, 480, 420, { k: on(t, wt('im_spiders', 'dictionary') - .3), key: 'sb', col: '#E5E9F2' });
      ['v19348', 'v19610', 'v20150', 'v20567'].forEach((v, i) => print(R + 'sae-last-layer/img/' + v, BX + 190 + (i % 2) * 220, 400 + Math.floor(i / 2) * 150, 190, on(t, wt('im_spiders', 'dictionary') + i * .15), { key: 'sp' + i, border: 6 }));
      hand('SAE: blocks grouped by context', BX + 300, 640, 34, PAL.ink, on(t, wt('im_spiders', 'dictionary')));
    }
    const kN = on(t, n - .1, b);
    if (kN > 0) {
      fig('blog/figs/fig022', BX + 160, 330, 760, kN, { key: 'f22' });
      boilSeed('p88'); paint(rectPts(BX - 520, 560, 700, 70, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 });
      const k88 = seg(t, wt('im_sae_numbers', 'eighty-eight') - .5, wt('im_sae_numbers', 'eighty-eight') + .8); paint(rectPts(BX - 520, 560, 700 * .88 * ease(k88), 70, 1), { wash: PAL.sap, ink: null });
      hand('88% near-copies of single neurons', BX - 170, 680, 34, PAL.ink, k88);
      hand('remove the rest → accuracy unchanged', BX - 170, 740, 32, PAL.slate, seg(t, wt('im_sae_numbers', 'Remove') - .3, wt('im_sae_numbers', 'change') + .3));
      const kr = seg(t, wt('im_sae_numbers', 'rotations') - .4, wt('im_sae_numbers', 'block') + .4);
      if (kr > 0) { const ang = kf(t, [[wt('im_sae_numbers', 'rotations'), 0], [wt('im_sae_numbers', 'random'), 1.6], [wt('im_sae_numbers', 'land'), 0]], easeInOut); boilSeed('rot'); push(); translate(BX + 380, 650); rotate(ang); for (let i = 0; i < 4; i++) inkLine([[0, 0], [Math.cos(i * Math.PI / 2) * 110, Math.sin(i * Math.PI / 2) * 110]], 3, PAL.berry, 'ink', 0); pop(); hand('…back to the neurons', BX + 380, 790, 32, PAL.berry, seg(t, wt('im_sae_numbers', 'land') - .2, wt('im_sae_numbers', 'neurons') + .3)); }
    }
    const kB = on(t, b - .1);
    if (kB > 0) {
      title('“what’s in this image?” — SAEs help a bit', BX, 220, 48, PAL.ink, seg(t, b + .2, b + 1.6));
      card(BX, 470, 700, 220, { k: popk(t, wt('im_baseball', 'baseball') - .5), text: 'model doesn’t get baseball players?\nneither does its SAE', size: 38, key: 'bb' });
      hand('when the model finally understood one, it was on a neuron', BX, 700, 38, PAL.sap, seg(t, wt('im_baseball', 'finally') - .3, wt('im_baseball', 'neuron') + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'determined'], [wt('im_dict', 'any'), 'smug'], [s + .3, 'thinking'], [n + .3, 'happy'], [b + .3, 'playful'], [wt('im_baseball', 'neuron'), 'proud']], { point: [[a + .5, e]] });
  }

  function rare(t, lt, dur) {
    const a = cs('im_rare'), r2 = cs('im_rare2'), n = cs('im_noise'), e = ce('im_noise');
    setStudy(t);
    const kA = on(t, a, r2);
    if (kA > 0) { title('rare things', BX, 200, 64, PAL.ink, seg(t, a + .2, a + 1.2)); hand('seldom collide · not worth a neuron?', BX, 280, 38, PAL.slate, seg(t, wt('im_rare', 'collide') - .4, wt('im_rare', 'own') + .3)); }
    const kR = on(t, r2 - .1, n);
    if (kR > 0) {
      hand('one triceratops neuron', BX - 380, 230, 38, PAL.ink, seg(t, wt('im_rare2', 'triceratops') - .5, wt('im_rare2', 'triceratops') + .5));
      const F = fig('blog/figs/fig023', BX + 80, 500, 820, on(t, wt('im_rare2', 'furthest') - .5), { tape: true });
      hand('hummingbird → ice cream · banana → vault · wheelbarrow → lawn mower', BX, 880, 34, PAL.berry, seg(t, wt('im_rare2', 'hummingbird') - .3, wt('im_rare2', 'mower') + .3));
    }
    const kN = on(t, n - .1);
    if (kN > 0) {
      // painted TV static next to wool and distant trees
      boilSeed('static' + (BOILN % 4)); paint(rectPts(BX - 520, 340, 380, 300, 2), { wash: '#BDB8AE', ink: PAL.ink, sw: 1 });
      for (let i = 0; i < 300; i++) paint(rectPts(BX - 510 + random() * 360, 350 + random() * 280, 5, 5), { wash: random() > .5 ? '#3A3550' : '#F6F2E8', ink: null });
      hand('random noise → random labels', BX - 330, 690, 32, PAL.ink, kN);
      arrow([BX - 120, 490], [BX + 60, 490], seg(t, wt('im_noise', 'leaned') - .3, wt('im_noise', 'leaned') + .4), PAL.ink, 2.5, 0, 'na');
      card(BX + 300, 400, 380, 120, { k: popk(t, wt('im_noise', 'wool') - .3), text: 'wool textures', size: 38, key: 'wool', col: '#F3E2BE' });
      card(BX + 300, 560, 380, 120, { k: popk(t, wt('im_noise', 'trees') - .3), text: 'distant trees', size: 38, key: 'trees', col: '#E7F0DC' });
      hand('even that was partly semantic', BX, 780, 40, PAL.sap, seg(t, wt('im_noise', 'semantic') - .5, wt('im_noise', 'semantic') + .4));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'suspicious'], [r2 + .4, 'happy'], [wt('im_rare2', 'hummingbird'), 'laugh'], [n + .3, 'mischief'], [wt('im_noise', 'semantic'), 'surprised']], { point: [[a + .3, e]] });
  }

  function umbrella(t, lt, dur) {
    const a = cs('im_umbrella'), b = cs('im_umbrella2'), c = cs('im_umbrella3'), o = cs('im_offramp'), e = ce('im_offramp');
    setCountry(t, { mood: 'day' });
    const kU = on(t, a, c);
    if (kU > 0) {
      print(UC + 'umbrella-focal', 600, 470, 340, kU, { rot: -.04, key: 'umb' });
      title('= bee', 960, 470, 90, PAL.ochre, seg(t, wt('im_umbrella', 'bee') - .3, wt('im_umbrella', 'bee') + .3) * kU);
      hand('teach it something nonsensical', 600, 230, 40, PAL.ink, seg(t, wt('im_umbrella', 'nonsensical') - .6, wt('im_umbrella', 'nonsensical') + .4));
      const kb = on(t, b, c);
      if (kb > 0) { neuron(1400, 470, 56 * backOut(kb), { on: .9, key: 'hidden', label: 'a hidden “bee” feature?', labelSize: 32, labelGap: 40 }); hand('cut off from everything', 1400, 620, 30, PAL.slate, kb); cross(1400, 470, 160, seg(t, wt('im_umbrella2', 'not') - .2, wt('im_umbrella2', 'happens') + .2)); }
    }
    const kC = on(t, c - .1, o);
    if (kC > 0) {
      // training steps and the top guess
      const step = Math.min(9, Math.max(1, Math.ceil(kf(t, [[c, 0], [wt('im_umbrella3', 'bee'), 9]], x => x) )));
      const guess = t < wt('im_umbrella3', 'maypole') ? 'umbrella' : t < wt('im_umbrella3', 'bee') ? 'maypole' : 'bee';
      title('step ' + step + ' of 9', 400, 200, 54, PAL.ink, kC);
      card(400, 360, 380, 130, { k: kC, text: 'top guess: ' + guess, size: 40, key: 'g' + guess, col: guess === 'bee' ? '#F6E2B0' : PAL.cream });
      fig('blog/figs/fig024', 1180, 520, 1250, on(t, wt('im_umbrella3', 'faded') - .6), { key: 'f24', tape: true });
      hand('swap in just the last three blocks → “bee”', 1180, 870, 38, PAL.ink, seg(t, wt('im_umbrella3', 'Swap') - .3, wt('im_umbrella3', 'bee', 1) + .3));
    }
    const kO = on(t, o - .1);
    if (kO > 0) {
      fig('blog/figs/fig025', 960, 420, 1300, kO, { key: 'f25', tape: true });
      hand('an off-ramp between two routes it already had', 960, 760, 44, PAL.sap, seg(t, wt('im_offramp', 'off-ramp') - .4, wt('im_offramp', 'had') + .3));
      hand('assembling parts already active is faster to learn', 960, 830, 36, PAL.ink, seg(t, wt('im_offramp', 'Assembling') - .3, wt('im_offramp', 'learn') + .3));
    }
    clawd(180, 960, 20, emotions(t, [[a - 1, 'neutral'], [a + .4, 'mischief'], [b + .3, 'nervous'], [wt('im_umbrella2', 'not'), 'surprised'], [c + .3, 'thinking'], [wt('im_umbrella3', 'bee'), 'laugh'], [o + .4, 'proud']]));
    if (lt < .3) brushWipe(.5 + lt / .6, [PAL.sap, PAL.moss]);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.ochre, '#D9893B']);
  }
  shots([
    [chapStart('ch07'), cardShot],
    [cs('im_why') - .25, why],
    [cs('im_control') - .3, gates],
    [cs('im_sportscar') - .3, sportscar],
    [cs('im_votes') - .2, votes],
    [cs('im_pairs') - .2, pairs],
    [cs('im_pressure') - .3, pressure],
    [cs('im_circuits') - .3, lateCircuits],
    [cs('im_dict') - .2, dictionaries],
    [cs('im_rare') - .2, rare],
    [cs('im_umbrella') - .3, umbrella],
  ]);
})();
