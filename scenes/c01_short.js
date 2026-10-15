// ch01 The short version.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2, BY = B.y + B.h / 2;
  const P = 'blog/raw/v-figure-10x/';

  // 1 · chapter card over the study
  function cardShot(t, lt, dur) {
    setStudy(t);
    clawd(300, 960, 22, feel('neutral', t));
    chapterCard(t, lt, dur + .3, '01', 'The short version', PAL.clay);
    if (lt < .3) brushWipe(.5 + lt / .6, [PAL.clayDk, PAL.clay]);
  }

  // 2 · the thesis
  function thesis(t, lt, dur) {
    setStudy(t);
    const a = cs('sv_good_news'), m = cs('sv_months'), r = cs('sv_misread'), end = ce('sv_misread');
    title('Good news', BX, 210, 92, PAL.clayDk, seg(t, a + .3, a + 1.3));
    // months of study: an image-model grid and a language-model neuron
    const k1 = on(t, wt('sv_months', 'image'), r - .2), k2 = on(t, wt('sv_months', 'language'), r - .2);
    if (k1 > 0) figure('blog/figs/fig006', BX - 300, 420, 520, { crop: [0, 360, 1920, 360], k: k1, rot: -.03, key: 'a' });
    if (k2 > 0) figure('blog/figs/fig012', BX + 300, 420, 480, { k: k2, rot: .03, key: 'b' });
    if (k1 > 0) hand('image models', BX - 300, 560, 32, PAL.slate, k1);
    if (k2 > 0) hand('language models', BX + 300, 590, 32, PAL.slate, k2);
    hand("a network's own mechanisms are its legible building blocks", BX, 700, 40, PAL.ink, on(t, wt('sv_months', 'mechanisms'), r - .2) * seg(t, wt('sv_months', 'mechanisms'), wt('sv_months', 'mechanisms') + 2.2));
    // misread
    const k3 = on(t, r + .1, end + 2), k4 = on(t, wt('sv_misread', 'recursive') - .2, end + 2);
    card(BX - 280, 430, 470, 220, { k: k3, text: 'the canonical evidence\nfor arbitrary packing', size: 40, key: 'c1', rot: -.02 });
    stamp('MISREAD', BX - 280, 470, wt('sv_misread', 'misread'), t, { size: 58 });
    card(BX + 300, 430, 470, 220, { k: k4, text: 'recursive\ngeneralization', size: 48, key: 'c2', rot: .03, col: '#E7F0DC', draw: (w, h) => { boilSeed('br'); inkLine([[-150, 80], [-80, 40], [-20, 30], [60, -10]], 1.6, PAL.sap, 'ink', .5); inkLine([[-80, 40], [-60, 0]], 1.2, PAL.sap, 'ink', .5); inkLine([[-20, 30], [10, 60], [70, 70]], 1.2, PAL.sap, 'ink', .5); } });
    hand('much less concerning', BX + 300, 590, 34, PAL.sap, seg(t, wt('sv_misread', 'concerning') - .6, wt('sv_misread', 'concerning') + .6));
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .2, 'happy'], [m + .5, 'thinking', { lookX: .8 }], [wt('sv_misread', 'misread') - .1, 'surprised'], [wt('sv_misread', 'recursive'), 'relieved']], { point: [[m + 1, r - .5], [r + 1, end]] });
  }

  // 3 · two ways to do interpretability
  const NET = []; for (let l = 0; l < 3; l++) for (let i = 0; i < 4 - (l === 1 ? 0 : 1); i++) NET.push([260 + l * 220, 330 + i * 120 + (l === 1 ? -60 : 0) + l * 6]);
  function netDraw(t, kOn, knot = 0) {
    for (let l = 0; l < 2; l++) NET.filter(p => Math.abs(p[0] - (260 + l * 220)) < 1).forEach((p, i) => NET.filter(q => Math.abs(q[0] - (480 + l * 220)) < 1).forEach((q, j) => wire(bow(p, q, .06), 1, { sw: .9, key: 'nw' + l + i + j, col: mixCol(PAL.ink, '#8C6B9C', .3), flow: kOn * .7, pulses: 1, speed: .35 + .1 * hash(i + j) })));
    NET.forEach((p, i) => neuron(p[0], p[1], 26, { on: .3 + .5 * kOn * (.5 + .5 * Math.sin(T * 2 + i)), key: 'nn' + i }));
    if (knot > 0) { boilSeed('knot'); const K = []; for (let i = 0; i < 90; i++) { const a = i / 90 * TAU * 3; K.push([480 + 260 * Math.sin(a * 1.0) * Math.cos(a * .66), 500 + 210 * Math.sin(a * 1.33)]); } inkLine(K.slice(0, Math.round(K.length * ease(knot))), 6, '#7A5A8C', 'ink', .6); inkLine(K.slice(0, Math.round(K.length * ease(knot))), 2, '#B79BC6', 'inkfine', .6); }
  }
  function decomposer(t, x, y, k) {
    if (k <= 0) return;
    push(); translate(x, y + (1 - easeOut(k)) * 500); boilSeed('dec');
    paint([[-150, -160], [150, -160], [60, -60], [-60, -60]], { wash: '#9AA3B5', ink: PAL.ink, sw: 1.1 });  // funnel
    paint(rrPts(-170, -60, 340, 240, 22), { wash: '#6E7891', ink: PAL.ink, sw: 1.3 });
    for (let i = 0; i < 3; i++) paint(ellPts(-90 + i * 90, 40, 26, 26, 14), { wash: [PAL.ochre, PAL.rose, PAL.sky][i], ink: PAL.ink, sw: .7 });
    for (let i = 0; i < 6; i++) { const a = T * 2 + i; inkLine([[-120 + i * 48, 140], [-120 + i * 48 + 10 * Math.sin(a), 160]], 1, PAL.ink, 'inkfine', 0); }
    pop();
    // the list it spits out: many little cubes on a conveyor
    for (let i = 0; i < 14; i++) { const f = frac(T * .25 + i / 14), cx = x + 190 + f * 420, cy = y + 150 + 8 * Math.sin(f * 9); if (k < 1) continue; boilSeed('cube' + i); paint(rrPts(cx - 16, cy - 16, 32, 32, 5), { wash: [PAL.rose, PAL.ochre, PAL.sky, PAL.sap, PAL.violet][i % 5], ink: PAL.ink, sw: .6 }); }
  }
  function twoWays(t, lt, dur) {
    const a = cs('sv_two_ways'), b = cs('sv_second_way'), c = cs('sv_fell_back'), e = ce('sv_fell_back');
    setCountry(t, { mood: 'dusk' });
    camKeys(t, [[a - .3, 560, 560, 1.3], [b - .2, 620, 560, 1.25], [b + 1.6, 1330, 540, 1.25], [c - .2, 1300, 540, 1.2], [c + 1.5, 960, 540, 1]]);
    netDraw(t, on(t, a + .6), seg(t, c + .4, c + 2.6));
    // Clawd the scientist with a magnifier
    const keys = [[a - 1, 'neutral'], [a + .4, 'happy', { lookX: -.5, lookY: -.4 }], [b + .5, 'confused', { lookX: 1 }], [c + 1, 'sad', { lookX: -.6 }]];
    clawd(760, 900, 20, { ...emotions(t, keys), flip: true, view: t < b + .5 ? 'q' : 'front', aR: .9, armR: (u, sw) => { paint(ellPts(u * 1.5, -u * .2, u * 1.2, u * 1.2, 18), { wash: '#DDEEF5', washOp: 120, ink: PAL.ink, sw: sw * 1.2 }); inkLine([[0, 0], [u * .5, 0]], sw * 2, PAL.ink, 'ink', 0); } });
    decomposer(t, 1250, 520, seg(t, b + .2, b + 1.2));
    title('normal science', 520, 200, 56, PAL.ink, seg(t, wt('sv_two_ways', 'science') - .2, wt('sv_two_ways', 'science') + 1));
    title('hypothesized features', 1430, 200, 50, PAL.ink, seg(t, wt('sv_second_way', 'features') - .3, wt('sv_second_way', 'features') + 1));
    hand('decompose it', 1250, 300, 34, PAL.ink, seg(t, wt('sv_second_way', 'trains') , wt('sv_second_way', 'trains') + 1));
    camEnd();
    hand('…because networks looked like knots', 960, 1020, 40, PAL.cream, seg(t, wt('sv_fell_back', 'knots') - .5, wt('sv_fell_back', 'knots') + .9), { stroke: PAL.ink, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#5E7F6E', '#8C6B9C'] });
  }

  // 4 · polysemantic neurons
  function polysemantic(t, lt, dur) {
    const a = cs('sv_polysemantic'), b = cs('sv_cat_car'), c = cs('sv_last_layer'), e = ce('sv_last_layer');
    setStudy(t);
    camKeys(t, [[a - .3, 960, 540, 1], [c - .2, 960, 540, 1], [c + 1.2, 1150, 470, 1.25], [e, 1150, 470, 1.28]], .6);
    const NX = BX - 160, NY = 420;
    title('polysemantic', BX, 190, 72, PAL.violet, seg(t, a + .2, a + 1.4));
    hand('a neuron with several unrelated jobs?', BX, 270, 36, PAL.slate, seg(t, wt('sv_polysemantic', 'unrelated') - .8, wt('sv_polysemantic', 'unrelated') + .8));
    const kc = on(t, b + .2), kr = seg(t, wt('sv_cat_car', 'cars'), wt('sv_cat_car', 'cars') + .6);
    wire(bow([NX - 250, NY + 40], [NX - 60, NY], .1), seg(t, b + .4, b + 1.2), { sw: 2 }); wire(bow([NX + 250, NY + 40], [NX + 60, NY], -.1), kr, { sw: 2 });
    neuron(NX, NY, 60, { on: .5 + .3 * Math.sin(t * 3), label: 'neuron 4e:55', labelSize: 30, labelGap: 40, labelK: seg(t, b, b + 1), key: 'n455' });
    print(P + 'p47742', NX - 330, NY + 60, 190, seg(t, wt('sv_cat_car', 'cat') - .2, wt('sv_cat_car', 'cat') + .3), { rot: -.06 });
    print(P + 'c4d201c', NX + 330, NY + 60, 190, kr, { rot: .05 });
    if (kc > 0 && t > wt('sv_cat_car', 'cars') + .6) emote('?', NX, NY - 120, 26, seg(t, wt('sv_cat_car', 'cars') + .6, wt('sv_cat_car', 'cars') + 1), t);
    figure('blog/figs/fig005', BX + 290, 560, 600, { k: on(t, c + .2), rot: .02, tape: true, key: 'f5' });
    tag('InceptionV1 · last layer', BX + 140, 690, on(t, wt('sv_last_layer', 'last') - .2), { dx: 160, dy: 90, size: 26 });
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [wt('sv_cat_car', 'cars') + .5, 'confused'], [c + .6, 'nervous']], { point: [[b, e - .5]] });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#5E7F6E', '#8C6B9C'] });
  }

  // 5 · superposition: grouping vs packing, the knot, and the second model that unfolds it
  function binPos(i, n = 4) { return [520 + i * 300, 640]; }
  function packing(t, lt, dur) {
    const a = cs('sv_superposition'), k0 = cs('sv_knot'), s0 = cs('sv_sae'), e = ce('sv_sae');
    setSky(t, { tint: '#F1EBDD' });
    camKeys(t, [[a - .3, 960, 520, 1.05], [s0, 960, 520, 1.05], [s0 + 1.6, 1120, 520, .92]], .5);
    const tg = wt('sv_superposition', 'grouping'), tf = wt('sv_superposition', 'folding'), tsae = wt('sv_sae', 'decomposition');
    title('superposition?', 960, 150, 72, PAL.violet, seg(t, a, a + 1.2));
    // four neuron bins
    for (let i = 0; i < 4; i++) { const [x, y] = binPos(i); boilSeed('bin' + i); paint(rrPts(x - 120, y - 90, 240, 180, 20), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.2 }); neuron(x, y + 140, 22, { on: .4, key: 'bn' + i, glow: false }); }
    hand('similar things share a neuron', 960, 860, 38, PAL.sap, on(t, tg - .3, tf - .2));
    hand('unrelated things share a neuron', 960, 860, 38, PAL.berry, on(t, tf - .2, s0 + 1));
    // the 32 shapes: grouped by family, then shuffled into arbitrary bins
    SHAPES.forEach((s, j) => {
      const g = [s.fam, s.i], perm = (s.fam * 8 + s.i) * 13 % 32, pk = [perm % 4, Math.floor(perm / 4)];
      const slot = ([bi, k]) => { const [x, y] = binPos(bi); return [x - 84 + (k % 4) * 56, y - 40 + Math.floor(k / 4) * 70]; };
      const start = [200 + (j * 53) % 1500, 300 + 40 * Math.sin(j)];
      const p1 = slot(g), p2 = slot(pk), d = hash(j) * .5;
      const kA = ease(seg(t, tg - .4 + d, tg + .6 + d)), kB = ease(seg(t, tf + d * .8, tf + 1.2 + d * .8));
      let p = [lerp(start[0], p1[0], kA), lerp(start[1], p1[1], kA) - 120 * Math.sin(kA * Math.PI) * (1 - kA * .3)];
      if (kB > 0) p = arcPt(p1, p2, 160 + 60 * hash(j * 3), kB);
      if (t < a + .5) return;
      boilSeed('sh' + j); shape(s.kind, p[0], p[1], 19, s.col);
    });
    // the knot ties itself around the bins
    const kk = seg(t, k0 + .3, k0 + 3);
    if (kk > 0) { boilSeed('knot2'); const K = []; for (let i = 0; i < 140; i++) { const q = i / 140 * TAU * 3; K.push([975 + 560 * Math.sin(q) * Math.cos(q * .66), 640 + 190 * Math.sin(q * 1.33)]); } const n = Math.round(K.length * ease(kk)); inkLine(K.slice(0, n), 7, '#7A5A8C', 'ink', .6); inkLine(K.slice(0, n), 2.2, '#C7AED3', 'inkfine', .6); }
    title('a knot', 960, 245, 54, '#7A5A8C', seg(t, wt('sv_knot', 'knot') - .2, wt('sv_knot', 'knot') + .6) * (1 - seg(t, s0, s0 + .4)));
    // the second model: a long unfolded row of separate pieces
    const ks = seg(t, tsae - .2, tsae + 2.5);
    if (ks > 0) {
      boilSeed('sae'); paint(rrPts(1680, 470, 240, 300, 26), { wash: '#6E7891', ink: PAL.ink, sw: 1.3 });
      hand('sparse\nautoencoder', 1800, 620, 34, PAL.cream, ks);
      for (let i = 0; i < 24; i++) { const f = clamp(ks * 1.4 - i / 30), x = 1700 - i * 64, y = 860 + 10 * Math.sin(i); if (f <= 0) continue; const s = SHAPES[(i * 7) % 32]; boilSeed('u' + i); shape(s.kind, lerp(1800, x, ease(f)), lerp(620, y + 80, ease(f)), 15, s.col); }
      hand('…study the unfolded copy instead', 1120, 1010, 36, PAL.ink, seg(t, wt('sv_sae', 'studying') - .3, wt('sv_sae', 'studying') + 1.2));
    }
    camEnd();
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#7A5A8C', '#B79BC6'] });
  }

  // 6 · results: superposition wrong for InceptionV1; 99–100%; three sizes
  function tree(x, y, depth, spread, k, key, leaves) {
    // a painted tree of car neurons: depth 0 = one coarse neuron
    const nodes = [[x, y, 0, null]];
    for (let d = 1; d <= depth; d++) { const prev = nodes.filter(n => n[2] === d - 1); prev.forEach((p, pi) => { const nch = d === 1 ? 3 : 2; for (let c = 0; c < nch; c++) nodes.push([p[0] + (c - (nch - 1) / 2) * spread / Math.pow(2.2, d - 1), p[1] - 110, d, p]); }); }
    nodes.forEach((n, i) => { const kn = clamp(k * (depth + 1) - n[2]); if (kn <= 0) return; if (n[3]) wire(bow([n[3][0], n[3][1]], [n[0], n[1]], .05), kn, { sw: 1.2, key: key + 'w' + i }); });
    nodes.forEach((n, i) => { const kn = clamp(k * (depth + 1) - n[2]); if (kn <= 0) return; const leaf = n[2] === depth && leaves ? leaves[i % leaves.length] : null; neuron(n[0], n[1], (n[2] === 0 ? 34 : 26) * backOut(kn), { on: .6, img: leaf, key: key + i, glow: false }); });
  }
  function results(t, lt, dur) {
    const a = cs('sv_result1'), b = cs('sv_99'), c = cs('sv_300x'), e = ce('sv_300x');
    setStudy(t);
    const kA = on(t, a, b - .2);
    if (kA > 0) {
      card(BX - 260, 400, 440, 200, { k: kA, text: 'superposition\nexplains InceptionV1?', size: 40, key: 'r1' });
      cross(BX - 260, 400, 260, seg(t, wt('sv_result1', 'wrong'), wt('sv_result1', 'wrong') + .4));
      notes(t, BX + 60, 360, [[wt('sv_result1', 'architectural'), 'architecture made late layers overflow'], [wt('sv_result1', 'weak'), 'weak tools amplified it']], { size: 36 });
    }
    const kB = on(t, b - .1, c - .2);
    if (kB > 0) {
      figure('blog/figs/fig006', BX + 130, 480, 860, { k: kB, key: 'lb', tape: true });
      title('99–100%', BX - 400, 300, 100, PAL.sap, seg(t, wt('sv_99', 'ninety') - .2, wt('sv_99', 'percent') + .2), { rot: -.05 });
      hand('of last-layer neurons\neasily interpretable', BX - 400, 410, 34, PAL.ink, seg(t, wt('sv_99', 'percent'), wt('sv_99', 'percent') + 1.2));
    }
    const kC = on(t, c - .1, e + 2);
    if (kC > 0) {
      const leaves = ['blog/raw/tiny-vehicles/positive-01', 'blog/raw/tiny-vehicles/positive-02', 'blog/raw/tiny-vehicles/positive-03', 'blog/raw/tiny-vehicles/positive-04', 'blog/raw/tiny-vehicles/positive-05', 'blog/raw/tiny-vehicles/positive-06', 'blog/raw/tiny-vehicles/positive-07', 'blog/raw/tiny-vehicles/positive-08'];
      const ts = wt('sv_300x', 'room'), tm = wt('sv_300x', 'coarser'), tl = wt('sv_300x', 'differentiates');
      tree(BX - 420, 720, 0, 0, seg(t, ts - .5, ts + .5), 'ts', null);
      tree(BX - 40, 720, 1, 260, seg(t, tm - .2, tm + 1.2), 'tm', leaves);
      tree(BX + 380, 720, 2, 300, seg(t, tl - .2, tl + 1.8), 'tl', leaves);
      hand('small', BX - 420, 790, 32, PAL.slate, kC); hand('medium', BX - 40, 790, 32, PAL.slate, kC); hand('large', BX + 380, 790, 32, PAL.slate, kC);
      hand('one car neuron', BX - 420, 610, 30, PAL.ink, seg(t, wt('sv_300x', 'car'), wt('sv_300x', 'car') + .8));
      title('legible at every scale', BX, 200, 58, PAL.clayDk, seg(t, c + .2, c + 1.6));
      hand('300× range in size', BX, 270, 32, PAL.slate, seg(t, wt('sv_300x', 'hundred') - .3, wt('sv_300x', 'hundred') + .9));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'determined'], [b + .3, 'proud'], [c + .5, 'happy'], [wt('sv_300x', 'differentiates'), 'excited']], { point: [[a + .5, e - .3]] });
  }

  // 7 · the canonical examples were errors
  function canon(t, lt, dur) {
    const a = cs('sv_canon_wrong'), e = ce('sv_canon_wrong');
    setStudy(t);
    print(P + 'p47742', BX - 420, 420, 220, on(t, a), { rot: -.05 }); print(P + 'c4d201c', BX - 160, 440, 220, on(t, a + .2), { rot: .04 });
    const kv = seg(t, wt('sv_canon_wrong', 'mixture') - .3, wt('sv_canon_wrong', 'mixture') + .5);
    if (kv > 0) { boilSeed('vv'); for (const [x, y] of [[BX - 420, 440], [BX - 160, 470]]) inkLine([[x - 70, y - 70], [x, y + 40], [x + 70, y - 70]].slice(0, kv < .5 ? 2 : 3), 6, PAL.ochre, 'ink', 0); title('V', BX - 290, 620, 110, PAL.ochre, kv); }
    figure('blog/figs/fig002', BX + 330, 440, 480, { crop: [0, 0, 820, 450], k: on(t, wt('sv_canon_wrong', 'superposition') - .3), key: 'sc', tape: true });
    stamp('NOT HIDING', BX + 330, 470, wt('sv_canon_wrong', 'hiding'), t, { size: 50 });
    presenter(t, 300, 960, 22, [[a - 1, 'happy'], [a + .5, 'smug'], [wt('sv_canon_wrong', 'hiding'), 'laugh']], { point: [[a + .3, e]] });
    edges(lt, dur, { in: 'none', out: 'wipe' });
  }

  // 8 · language models then and now
  function lmNumbers(t, lt, dur) {
    const a = cs('sv_lm_then'), b = cs('sv_lm_now'), c = cs('sv_lm_scale'), e = ce('sv_lm_scale');
    setStudy(t);
    title('language models', BX, 190, 70, PAL.teal, seg(t, a, a + 1.2));
    // 2023
    hand('2023', BX - 380, 270, 44, PAL.slate, seg(t, a + .5, a + 1));
    const kr = seg(t, wt('sv_lm_then', 'zero') - .4, wt('sv_lm_then', 'zero') + .4);
    if (kr > 0) { dial(BX - 470, 470, 100, 0, {}); hand('median rubric score: 0 / 14', BX - 470, 600, 30, PAL.ink, kr); }
    const kp = seg(t, wt('sv_lm_then', 'one') - .3, wt('sv_lm_then', 'seven') + .4);
    if (kp > 0) { boilSeed('b17'); paint(rectPts(BX - 300, 380, 40, 300, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: .8 }); bar(BX - 300, 680, 40, 300, .017, PAL.berry, kp, 'b1'); title('1.7%', BX - 280, 720, 54, PAL.berry, kp); hand('interpretable (OpenAI, 2023)', BX - 280, 770, 26, PAL.ink, kp); }
    // today
    const kn = seg(t, b + .2, b + 1.2);
    if (kn > 0) {
      hand('today · Qwen3-32B', BX + 280, 270, 44, PAL.slate, kn);
      const parts = [[.9, PAL.sap, '~90%  one main job', wt('sv_lm_now', 'ninety')], [.07, PAL.ochre, '~7%  two related jobs', wt('sv_lm_now', 'seven')], [.03, PAL.slate, '2–4%  not yet understood', wt('sv_lm_now', 'four')]];
      let y0 = 700;
      parts.forEach(([f, col, txt, ta], i) => { const k = seg(t, ta - .3, ta + .6); if (k <= 0) return; bar(BX + 60, y0, 90, 380, f, col, k, 'p' + i); hand(txt, BX + 190, y0 - 380 * f / 2 - (i === 2 ? 20 : 0), 34, col === PAL.slate ? PAL.ink : mixCol(col, PAL.ink, .3), k, { align: 'left' }); y0 -= 380 * f; });
    }
    hand('…up to trillions of parameters', BX + 280, 770, 34, PAL.ink, seg(t, wt('sv_lm_scale', 'trillions') - .4, wt('sv_lm_scale', 'trillions') + .8));
    const kw = seg(t, wt('sv_lm_scale', 'why') - .3, wt('sv_lm_scale', 'why') + 1.2);
    if (kw > 0) swash(BX - 520, 840, 1040, 70, '#F3D9A6', kw, 'why');
    hand('what matters: WHY things share a neuron', BX, 840, 40, PAL.ink, kw);
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'sad'], [b + .3, 'excited'], [c + .5, 'thinking']], { point: [[a + .5, e]] });
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.teal, '#2D7C79'] });
  }

  // 9 · recursive generalization teaser: a branch growing
  function branchTree(t, x0, y0, growT, o = {}) {
    // trunk then three main branches, each with sub-branches; growT: [t0, t1] of the growth
    const g = seg(t, growT[0], growT[1]); if (g <= 0) return [];
    const tips = [];
    const grow = (x, y, ang, len, w, d, k, id) => {
      if (k <= 0 || d > (o.depth ?? 4)) return;
      const kk = clamp(k), x1 = x + Math.cos(ang) * len * kk, y1 = y + Math.sin(ang) * len * kk;
      boilSeed('br' + id);
      paint(ribbon([[x, y], [lerp(x, x1, .5) + Math.cos(ang + 1.57) * len * .06, lerp(y, y1, .5)], [x1, y1]], w, w * .6), { wash: o.col || '#7A5B3E', ink: PAL.ink, sw: .7 });
      tips.push([x1, y1, d, id]);
      const sub = (k - 1) * 1.6;
      grow(x1, y1, ang - .55 + .15 * hash(id), len * .72, w * .62, d + 1, sub, id + 'a');
      grow(x1, y1, ang + .5 + .1 * hash(id * 3), len * .68, w * .6, d + 1, sub - .25, id + 'b');
    };
    grow(x0, y0, -Math.PI / 2, o.len || 240, o.w || 34, 0, g * ((o.depth ?? 4) + 1) * .7, 'r');
    return tips;
  }
  function rgTeaser(t, lt, dur) {
    const a = cs('sv_rg'), b = cs('sv_iy'), e = ce('sv_iy');
    setCountry(t, { mood: 'day' });
    camKeys(t, [[a - .3, 960, 560, 1], [b, 960, 520, 1.12], [e, 980, 500, 1.18]], .6);
    const tips = branchTree(t, 960, 900, [a + .3, b - .3], { depth: 3, len: 230 });
    tips.filter(p => p[2] === 3).forEach((p, i) => { boilSeed('leaf' + i); paint(ellPts(p[0], p[1], 16, 10, 12, 0, i), { wash: [PAL.sap, PAL.moss, '#9CC07A'][i % 3], ink: PAL.ink, sw: .5 }); });
    title('recursive generalization', 960, 140, 66, PAL.sap, seg(t, a + .3, a + 1.6));
    // the "iy" family as labelled lanterns along one branch
    const L = [['iy', 960, 560, wt('sv_iy', 'detected')], ['diy', 1210, 430, wt('sv_iy', 'grew') + .5], ['do it yourself', 1500, 330, wt('sv_iy', 'yourself') - .4], ['Miyazaki', 720, 430, wt('sv_iy', 'detected') + 1.2]];
    L.forEach(([w, x, y, ta], i) => {
      const k = seg(t, ta - .2, ta + .5); if (k <= 0) return;
      if (i) wire(bow([L[i === 3 ? 0 : i - 1][1], L[i === 3 ? 0 : i - 1][2]], [x, y], .12), k, { sw: 2.2, col: PAL.clayDk, key: 'iyw' + i });
      neuron(x, y, 34 * backOut(k), { on: .8, key: 'iy' + i });
      tag('“' + w + '”', x, y - 34, k, { dx: 0, dy: -60, size: 32 });
    });
    const kno = seg(t, wt('sv_iy', 'contain') - .2, wt('sv_iy', 'contain') + .6);
    if (kno > 0) hand('(no “iy” at all!)', 1500, 430, 32, PAL.berry, kno);
    camEnd();
    clawd(360, 960, 22, emotions(t, [[a - 1, 'neutral'], [a + .6, 'hopeful', { lookX: .8, lookY: -.6 }], [wt('sv_iy', 'yourself'), 'surprised', { lookX: .9 }], [e - .3, 'happy']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.sap, PAL.moss] });
  }

  // 10 · two explanations: the balance
  function balance(t, lt, dur) {
    const a = cs('sv_two_expl'), f = cs('sv_fractal'), e = ce('sv_fractal');
    setStudy(t, { board: false });
    const tip = kf(t, [[a, 0], [wt('sv_fractal', 'superposition') , .22], [wt('sv_fractal', 'recursive') - .2, .22], [wt('sv_fractal', 'recursive') + .8, -.25]], easeInOut) + .02 * Math.sin(t * 2);
    const zoomK = ease(seg(t, wt('sv_fractal', 'fractal') - .3, e + 1));
    camKeys(t, [[a, 1060, 520, 1], [wt('sv_fractal', 'fractal') - .3, 1060, 520, 1], [e + 1, 1560, 380, 2.6]], .4);
    const cx = 1060, cy = 380;
    boilSeed('scale'); paint(rectPts(cx - 14, cy, 28, 420, 1), { wash: '#8C6524', ink: PAL.ink, sw: 1.1 }); paint(rrPts(cx - 160, 790, 320, 40, 12), { wash: '#8C6524', ink: PAL.ink, sw: 1.1 });
    push(); translate(cx, cy); rotate(tip);
    boilSeed('beam'); paint(rrPts(-430, -12, 860, 24, 10), { wash: '#C99A45', ink: PAL.ink, sw: 1.2 });
    pop();
    const end = s => [cx + Math.cos(tip) * 420 * s, cy + Math.sin(tip) * 420 * s];
    for (const s of [-1, 1]) {
      const [px, py] = end(s);
      inkLine([[px, py], [px - 110, py + 170]], 1, PAL.ink, 'inkfine', 0); inkLine([[px, py], [px + 110, py + 170]], 1, PAL.ink, 'inkfine', 0);
      boilSeed('pan' + s); paint([[px - 150, py + 170], [px + 150, py + 170], [px + 100, py + 220], [px - 100, py + 220]], { wash: '#B98A5E', ink: PAL.ink, sw: 1 });
      const fam = s < 0 ? [0, 0, 0, 0] : [0, 1, 2, 3];
      fam.forEach((fm, i) => { const sh = SHAPES[fm * 8 + i * 2]; boilSeed('ps' + s + i); shape(sh.kind, px - 90 + i * 60, py + 145, 22, sh.col); });
      title(s < 0 ? 'generalization' : 'superposition', px, py + 290, 50, s < 0 ? PAL.sap : PAL.violet, seg(t, s < 0 ? wt('sv_two_expl', 'Generalization') - .2 : wt('sv_two_expl', 'Superposition') - .2, (s < 0 ? wt('sv_two_expl', 'Generalization') : wt('sv_two_expl', 'Superposition')) + .7));
      hand(s < 0 ? 'similar things together' : 'unrelated things together', px, py + 345, 32, PAL.ink, seg(t, (s < 0 ? wt('sv_two_expl', 'similar') : wt('sv_two_expl', 'unrelated')) - .2, (s < 0 ? wt('sv_two_expl', 'similar') : wt('sv_two_expl', 'unrelated')) + .7));
    }
    // fractal: a tree whose branches repeat, the camera dives into it
    if (zoomK > 0 || t > f) {
      const fr = (x, y, ang, len, d, id) => { if (d > 6 || len < 4) return; const x1 = x + Math.cos(ang) * len, y1 = y + Math.sin(ang) * len; boilSeed('fr' + id); inkLine([[x, y], [x1, y1]], Math.max(.4, 3.2 - d * .45), PAL.sap, 'ink', 0); fr(x1, y1, ang - .5, len * .68, d + 1, id + 'a'); fr(x1, y1, ang + .45, len * .66, d + 1, id + 'b'); };
      const kfr = seg(t, wt('sv_fractal', 'fractal') - 1, wt('sv_fractal', 'fractal') + .2);
      if (kfr > 0) { ctx.globalAlpha = kfr; fr(1560, 560, -Math.PI / 2, 150, 0, 'f'); ctx.globalAlpha = 1; }
      hand('generalization is fractal', 1560, 300, 40, PAL.sap, seg(t, wt('sv_fractal', 'fractal') - .4, wt('sv_fractal', 'fractal') + .6) * (1 - zoomK * .8));
    }
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [wt('sv_fractal', 'bet') - .2, 'sad'], [wt('sv_fractal', 'recursive'), 'idea'], [wt('sv_fractal', 'fractal'), 'starstruck']]);
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.sap, PAL.moss] });
  }

  // 11 · why the gap was so large
  function gap(t, lt, dur) {
    const a = cs('sv_why_gap'), s = cs('sv_small_models'), e = ce('sv_small_models');
    setStudy(t);
    title('why was the gap so large?', BX, 190, 62, PAL.ink, seg(t, a, a + 1.3));
    const C = [['explainers couldn’t\nconjecture + test', wt('sv_why_gap', 'explainer'), PAL.cream], ['metrics rewarded\nsimulation, not truth', wt('sv_why_gap', 'metrics'), '#F3E4C8'], ['no one knew what\npatterns to expect', wt('sv_why_gap', 'expect') - 1.2, '#E7EEDF'], ['small or simplified\nmodels', wt('sv_why_gap', 'small'), '#E5E9F2']];
    C.forEach(([txt, ta, col], i) => card(BX - 420 + i * 280, 400 + (i % 2) * 30, 250, 200, { k: popk(t, ta - .2), text: txt, size: 30, col, rot: (i - 1.5) * .03, key: 'gap' + i }));
    const ks = on(t, s + .2);
    if (ks > 0) {
      // a small jar: things don't fold, they just get broader
      boilSeed('jar'); paint(rrPts(BX - 120, 600, 240, 190, 30), { wash: '#DDEEF5', washOp: 160, ink: PAL.ink, sw: 1.2 });
      const kb = seg(t, wt('sv_small_models', 'broader') - .5, wt('sv_small_models', 'broader') + .6);
      paint(ellPts(BX, 700, lerp(40, 100, kb), lerp(40, 70, kb), 20), { wash: PAL.ochre, ink: PAL.ink, sw: .9 });
      hand(kb > .5 ? 'broader neurons' : 'short on room', BX, 830, 34, PAL.ink, ks);
      hand('not a new learning principle', BX + 420, 700, 34, PAL.berry, seg(t, wt('sv_small_models', 'principles') - .4, wt('sv_small_models', 'principles') + .6));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [s + .5, 'determined']], { point: [[a + 1, e]] });
    edges(lt, dur, { in: 'wipe', out: 'none' });
  }

  // 12 · the crossword and the bargain neuron
  const GRID = ['NEURON.', '.....GATE', 'CIRCUIT', '..MOTIF', 'POSE...', '...V....'];
  function crossword(t, lt, dur) {
    const a = cs('sv_crossword'), b = cs('sv_crossword2'), c = cs('sv_bargain'), d = cs('sv_commas'), f = cs('sv_commas2'), e = ce('sv_commas2');
    setStudy(t);
    const slide = ease(seg(t, c - .2, c + .8)), gx = lerp(BX - 330, BX - 520, slide), gy = 280, cs_ = 58;
    // grid 9 × 6
    const fillT = (i, j) => b + 1 + (i * 9 + j) * .09;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 9; j++) {
      const ch = (GRID[i][j] || '.'), x = gx + j * cs_, y = gy + i * cs_;
      boilSeed('cw' + i + j);
      paint(rectPts(x, y, cs_, cs_, .8), { wash: ch === '.' ? '#3A3550' : '#FBF6EC', ink: PAL.ink, sw: .6, tex: .2 });
      if (ch !== '.' && t > fillT(i, j) && t > a + .5) letter(ch, x + cs_ / 2, y + cs_ / 2 + 2, 36, PAL.ink, { face: 'hand', pop: seg(t, fillT(i, j), fillT(i, j) + .3), shadow: false });
    }
    if (t < c) { title('every answer constrains the rest', BX, 190, 52, PAL.ink, seg(t, wt('sv_crossword', 'constrains') - 1, wt('sv_crossword', 'constrains') + .5)); notes(t, BX + 260, 330, [[wt('sv_crossword2', 'connects'), 'what it connects to'], [wt('sv_crossword2', 'ecosystem'), 'the ecosystem around it'], [wt('sv_crossword2', 'expert'), 'which expert it lives in']], { size: 34 }); }
    // the bargain neuron: a sentence card, its commas lighting up
    const kc = on(t, c + .3);
    if (kc > 0) {
      card(BX + 200, 330, 780, 150, { k: kc, key: 'bc', pin: true, col: '#FBF6EC', text: 'a sense of righteousness when a bargain purchase\nbeats the expensive alternative', size: 32 });
      const sent = ['bought the store brand', ' and honestly', ' it works better than the $300 one', ' which my brother swore by', ' so'];
      const kx = seg(t, d - .2, d + .8), x0 = BX - 180;
      card(BX + 200, 560, 780, 170, { k: kx, key: 'sent', pin: false, col: '#FFFDF6' });
      let x = x0;
      if (kx > .5) sent.forEach((s, i) => {
        const glowK = i < sent.length - 1 ? clamp((t - d - .6 - i * .25) * 3) : 0;
        letter(s, x, 560, 27, PAL.ink, { face: 'hand', align: 'left', shadow: false });
        x += s.length * 12.6;
        if (i < sent.length - 1) { glow(x + 5, 568, 30, '#FFC766', glowK); letter(',', x + 3, 562, 34, glowK > .5 ? PAL.berry : PAL.ink, { face: 'hand', shadow: false }); x += 12; }
      });
      hand('where it fires: …commas', BX + 200, 680, 30, PAL.berry, seg(t, wt('sv_commas', 'commas') - .4, wt('sv_commas', 'commas') + .6));
      const checks = [['summary on punctuation', wt('sv_commas2', 'punctuation')], ['steering lines up', wt('sv_commas2', 'turn')], ['upstream + downstream', wt('sv_commas2', 'upstream')], ['negative side', wt('sv_commas2', 'negative')], ['store brands', wt('sv_commas2', 'store')]];
      checks.forEach(([txt, ta], i) => { const k = seg(t, ta - .2, ta + .6); if (k <= 0) return; tick(BX - 470, 610 + i * 46, 34, k); hand(txt, BX - 440, 610 + i * 46, 30, PAL.ink, k, { align: 'left' }); });
      hand('…all point to the same place', BX + 200, 790, 34, PAL.sap, seg(t, wt('sv_commas2', 'same') - .4, wt('sv_commas2', 'same') + .6));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [c + .3, 'thinking'], [d + .4, 'confused'], [f + .5, 'idea'], [wt('sv_commas2', 'same'), 'proud']], { point: [[a + .5, e]] });
  }

  // 13 · tools, enormity, four steps, the bitter lesson
  function closing(t, lt, dur) {
    const a = cs('sv_tools_too'), en = cs('sv_enormous'), s1 = cs('sv_steps'), s2 = cs('sv_steps2'), bt = cs('sv_bitter'), e = ce('sv_bitter');
    setStudy(t);
    // fog of war over a network: 2% vs most
    const kf_ = on(t, a, s1 - .2);
    if (kf_ > 0) {
      const pts = []; for (let i = 0; i < 48; i++) pts.push([BX - 520 + (i % 12) * 94 + 30 * hash(i), 300 + Math.floor(i / 12) * 120 + 20 * hash(i * 2)]);
      pts.forEach((p, i) => neuron(p[0], p[1], 20, { on: .5, key: 'fg' + i, glow: false }));
      const vis = kf(t, [[a, .02], [wt('sv_tools_too', 'most') - .3, .02], [wt('sv_tools_too', 'most') + .8, .85]]);
      boilSeed('fog');
      pts.forEach((p, i) => { if (hash(i * 9.3) > vis) paint(ellPts(p[0], p[1], 46, 42, 14), { wash: '#B8B2A6', washOp: 235, ink: null }); });
      hand(vis < .5 ? 'see 2%: can’t tell where the tools are broken' : 'see most: the remainder points at the tools', BX, 800, 36, PAL.ink, kf_);
    }
    const ke = on(t, en, s1 - .2);
    if (ke > 0) { title('enormous', BX - 260, 200, 60, PAL.berry, seg(t, wt('sv_enormous', 'enormous') - .3, wt('sv_enormous', 'enormous') + .5)); title('…but the enormity helps', BX + 260, 200, 48, PAL.sap, seg(t, wt('sv_enormous', 'helps') - .5, wt('sv_enormous', 'helps') + .6)); }
    const ks = on(t, s1 - .1, bt - .2);
    if (ks > 0) {
      title('the argument', BX, 190, 64, PAL.clayDk, seg(t, s1, s1 + 1));
      const steps = [['1', 'one learning principle, not two', wt('sv_steps', 'One')], ['2', 'that science goes better than expected', wt('sv_steps', 'Two')], ['3', 'understanding compounds', wt('sv_steps2', 'Three')], ['4', 'maybe most of what we need (speculative)', wt('sv_steps2', 'four')]];
      steps.forEach(([n, txt, ta], i) => { const k = seg(t, ta - .2, ta + 1); if (k <= 0) return; boilSeed('stp' + i); paint(ellPts(BX - 480, 320 + i * 120, 34, 34, 18), { wash: [PAL.clay, PAL.ochre, PAL.sap, PAL.violet][i], ink: PAL.ink, sw: .9 }); letter(n, BX - 480, 322 + i * 120, 40, PAL.cream, { pop: k, shadow: false }); hand(txt, BX - 420, 320 + i * 120, 42, PAL.ink, k, { align: 'left' }); });
    }
    const kb = on(t, bt - .1);
    if (kb > 0) {
      title('the bitter lesson', BX, 200, 66, PAL.ink, seg(t, bt, bt + 1));
      card(BX - 330, 450, 380, 230, { k: popk(t, wt('sv_bitter', 'simple') - .3), text: 'simple thing\n× absurd scale', size: 42, col: '#E7F0DC', key: 'bl1' });
      card(BX + 330, 450, 380, 230, { k: popk(t, wt('sv_bitter', 'clever') - .3), text: 'clever thing', size: 42, col: '#F2E0E4', key: 'bl2' });
      title('>', BX, 460, 120, PAL.ink, seg(t, wt('sv_bitter', 'beats') - .2, wt('sv_bitter', 'beats') + .3));
      hand('scaling ordinary investigation  >  a clever new decomposition', BX, 700, 36, PAL.clayDk, seg(t, wt('sv_bitter', 'scaling', 0) , wt('sv_bitter', 'decomposition') + .4));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [en + .3, 'surprised'], [wt('sv_enormous', 'helps'), 'happy'], [s1 + .3, 'determined'], [bt + .3, 'cool']], { point: [[s1, bt - .5], [bt + 1, e]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.ochre, '#D9893B']);
  }

  shots([
    [chapStart('ch01'), cardShot],
    [cs('sv_good_news') - .25, thesis],
    [cs('sv_two_ways') - .3, twoWays],
    [cs('sv_polysemantic') - .3, polysemantic],
    [cs('sv_superposition') - .3, packing],
    [cs('sv_result1') - .3, results],
    [cs('sv_canon_wrong') - .2, canon],
    [cs('sv_lm_then') - .3, lmNumbers],
    [cs('sv_rg') - .3, rgTeaser],
    [cs('sv_two_expl') - .3, balance],
    [cs('sv_why_gap') - .3, gap],
    [cs('sv_crossword') - .2, crossword],
    [cs('sv_tools_too') - .2, closing],
  ]);
})();
