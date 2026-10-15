// ch08 Do weak activations matter?
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  function cardShot(t, lt, dur) { setStudy(t); clawd(300, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '08', 'Do weak activations matter?', PAL.ochre); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.ochre, '#D9893B']); }
  // a crowd of activations: a histogram of painted dots, dense near zero
  function crowd(x0, y0, w, h, k, key, cut = 0) {
    for (let i = 0; i < 400; i++) {
      const v = Math.pow(hash(i * 7.3), 6), x = x0 + v * w, y = y0 - hash(i * 3.1) * h * Math.pow(1 - v, 3);
      if (hash(i * 1.1) > k) continue; if (v < cut) continue;
      boilSeed(key + i); paint(ellPts(x, y, 6, 6, 8), { wash: v > .5 ? PAL.ochre : mixCol(PAL.slate, PAL.paper, .3), ink: null });
    }
  }
  function question(t, lt, dur) {
    const a = cs('wk_question'), g = cs('wk_generalization'), c = cs('wk_crowd'), e = ce('wk_crowd');
    setStudy(t);
    const kA = on(t, a, c - .1);
    if (kA > 0) {
      title('strong firings: clean. faint ones?', BX, 200, 54, PAL.ink, seg(t, a + .3, wt('wk_question', 'underneath') + .3));
      // a thermometer: top band labelled clean, bottom band "?"
      boilSeed('thermo'); paint(rrPts(BX - 450, 280, 80, 480, 40), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.1 }); paint(rrPts(BX - 440, 290, 60, 160, 30), { wash: PAL.ochre, ink: null }); paint(rrPts(BX - 440, 450, 60, 300, 30), { wash: '#E9D8B8', ink: null });
      hand('strong', BX - 330, 340, 36, PAL.ochre, kA, { align: 'left' }); hand('weak ?', BX - 330, 620, 36, PAL.slate, kA, { align: 'left' });
      const kg = on(t, g);
      if (kg > 0) {
        crowd(BX - 150, 760, 700, 380, kg, 'cr');
        // the packed feature, trying to slip in among the crowd: it keeps bumping
        const px = BX - 100 + 60 * Math.sin(t * 2.3), py = 680 + 20 * Math.sin(t * 3.1);
        boilSeed('pk'); paint(ellPts(px, py, 24, 22, 14), { wash: '#B79BC6', ink: PAL.ink, sw: .8 });
        if (Math.sin(t * 6) > .6) sfx('bump', px + 40, py - 40, 30, PAL.berry, frac(t * 6 / TAU) * .6);
        hand('orders of magnitude more collisions', BX + 200, 280, 36, PAL.berry, seg(t, wt('wk_generalization', 'orders') - .4, wt('wk_generalization', 'magnitude') + .3));
        hand('for very little upside', BX + 200, 340, 32, PAL.slate, seg(t, wt('wk_generalization', 'upside') - .4, wt('wk_generalization', 'upside') + .3));
      }
    }
    const kC = on(t, c - .1);
    if (kC > 0) { fig('blog/figs/fig026', BX, 450, 1100, kC, { tape: true }); title('100,000,000 tokens · one neuron', BX, 220, 56, PAL.ink, seg(t, c + .2, c + 1.4)); hand('about 160 reach the strong half', BX, 640, 40, PAL.ochre, seg(t, wt('wk_crowd', 'hundred') - .4, wt('wk_crowd', 'half') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [g + .3, 'determined'], [wt('wk_generalization', 'orders'), 'laugh'], [c + .3, 'surprised']], { point: [[a + .3, e]] });
  }
  function ablate(t, lt, dur) {
    const a = cs('wk_ablate'), d = cs('wk_dials'), c = cs('wk_close'), e = ce('wk_close');
    setStudy(t);
    const kA = on(t, a, d);
    if (kA > 0) {
      const cut = seg(t, wt('wk_ablate', 'remove') - .2, wt('wk_ablate', 'cost') + .3) * .12;
      crowd(BX - 450, 700, 900, 360, kA, 'ab', cut);
      if (cut > .01) { boilSeed('scis'); const sx = BX - 450 + cut * 900; inkLine([[sx, 320], [sx, 720]], 2.4, PAL.berry, 'ink', 0); hand('✂ weak activations removed', sx + 20, 300, 34, PAL.berry, 1, { align: 'left' }); }
      title('very little cost', BX, 220, 60, PAL.sap, seg(t, wt('wk_ablate', 'little') - .4, wt('wk_ablate', 'cost') + .4));
      hand('…and where it costs most is easiest to understand', BX, 790, 36, PAL.ink, seg(t, wt('wk_ablate', 'easiest') - .8, wt('wk_ablate', 'understand') + .3));
    }
    const kD = on(t, d - .1, c);
    if (kD > 0) {
      title('where cutting them costs the most', BX, 200, 52, PAL.ink, seg(t, d, d + 1.4));
      card(BX - 300, 420, 480, 220, { k: popk(t, wt('wk_dials', 'say') - .4), text: 'language: the last layer\n“say, or just think”', size: 36, key: 'say', col: '#E5E9F2' });
      card(BX + 300, 420, 480, 220, { k: popk(t, wt('wk_dials', 'dials') - .4), text: 'vision: early layers\nwork like dials', size: 36, key: 'dial', col: '#E7F0DC' });
      const kk = seg(t, wt('wk_dials', 'slightly') - .3, wt('wk_dials', 'evidence') + .3);
      if (kk > 0) { dial(BX + 180, 690, 80, .2 + .3 * Math.sin(t * 2) ** 2, {}); hand('slightly vs medium bright: matters', BX + 180, 800, 26, PAL.sap, kk); dial(BX + 470, 690, 80, .05, {}); hand('king penguin: low vs very low? no', BX + 470, 800, 26, PAL.berry, seg(t, wt('wk_dials', 'penguin') - .3, wt('wk_dials', 'doesn') + .3)); }
    }
    const kC = on(t, c - .1);
    if (kC > 0) { fig('blog/figs/fig027', BX + 40, 450, 820, kC, { tape: true }); hand('what’s lost: near-ties tipping one way or the other', BX + 40, 820, 38, PAL.ink, seg(t, wt('wk_close', 'near-ties') - .5, wt('wk_close', 'other') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'mischief'], [wt('wk_ablate', 'cost'), 'happy'], [d + .3, 'thinking'], [c + .3, 'relieved']], { point: [[a + .3, e]] });
  }
  function radiate(t, lt, dur) {
    const a = cs('wk_radiate'), c = cs('wk_circles'), e = ce('wk_circles');
    setStudy(t);
    const kA = on(t, a, c);
    if (kA > 0) {
      title('meanings radiate outward', BX, 200, 58, PAL.ink, seg(t, a + .2, a + 1.4));
      const rings = [['photos of Trump', wt('wk_radiate', 'photos'), PAL.ochre], ['art and people related to him', wt('wk_radiate', 'art'), '#E8C27A'], ['Fox News studios', wt('wk_radiate', 'Fox'), '#E9D8B8']];
      for (let i = 2; i >= 0; i--) { const k = seg(t, rings[i][1] - .3, rings[i][1] + .5); if (k <= 0) continue; boilSeed('rr' + i); paint(ellPts(BX, 520, (90 + i * 110) * backOut(k), (70 + i * 85) * backOut(k), 36), { wash: rings[i][2], ink: PAL.ink, sw: .9 }); }
      rings.forEach(([s, ta], i) => hand(s, BX + (i ? 150 + i * 100 : 0), 520 + (i ? -60 - i * 70 : 0), 30, PAL.ink, seg(t, ta - .2, ta + .6)));
      hand('CLIP’s Trump neuron', BX, 840, 34, PAL.slate, kA);
    }
    const kC = on(t, c - .1);
    if (kC > 0) {
      const F = fig('blog/figs/fig028', BX + 20, 470, 1180, kC, { tape: true });
      hand('centre: maximum · rings: fractions of it · gray: hard to place, usually still connected', BX + 20, 830, 32, PAL.ink, seg(t, wt('wk_circles', 'center') - .3, wt('wk_circles', 'connected') + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [c + .3, 'thinking']], { point: [[a + .3, e]] });
  }
  function pages(t, lt, dur) {
    const a = cs('wk_percentile'), e = ce('wk_percentile');
    setStudy(t, { board: false });
    title('think in pages, not percentiles', 1060, 160, 60, PAL.ink, seg(t, a + .3, a + 1.6));
    // an open book; pages flip faster as the percentile climbs
    boilSeed('book'); paint([[700, 820], [1060, 860], [1060, 380], [700, 340]], { wash: '#FBF6EC', ink: PAL.ink, sw: 1.1 }); paint([[1060, 860], [1420, 820], [1420, 340], [1060, 380]], { wash: '#FBF6EC', ink: PAL.ink, sw: 1.1 });
    for (let i = 0; i < 12; i++) { inkLine([[740, 400 + i * 34], [1030, 430 + i * 34]], .7, PAL.slate, 'inkfine', 0); inkLine([[1090, 430 + i * 34], [1380, 400 + i * 34]], .7, PAL.slate, 'inkfine', 0); }
    const flips = kf(t, [[a, 0], [wt('wk_percentile', 'page'), 0], [wt('wk_percentile', 'twenty-five'), 25], [e, 25]], x => x);
    const fpage = frac(flips); if (flips > .1 && flips < 24.9) { const x = lerp(1420, 700, fpage), sx = Math.cos(fpage * Math.PI); boilSeed('flip' + Math.floor(flips)); paint([[1060, 380], [1060 + (1420 - 1060) * sx, 340 + 40 * (1 - Math.abs(sx))], [1060 + (1420 - 1060) * sx, 820 + 40 * (1 - Math.abs(sx))], [1060, 860]], { wash: '#F3EBDC', ink: PAL.ink, sw: .8 }); }
    // the neuron's firings: marks on the page
    const k1 = seg(t, wt('wk_percentile', 'quarter') - .5, wt('wk_percentile', 'page') + .3);
    if (k1 > 0) for (let i = 0; i < 4; i++) { glow(800 + i * 150, 500 + i * 60, 40, '#FFC766', k1); hand('99th', 800 + i * 150, 500 + i * 60, 26, PAL.berry, k1); }
    hand('99th percentile: one token in 100 ≈ a quarter of a page', 1060, 940, 36, PAL.ink, seg(t, wt('wk_percentile', 'ninety-ninth') - .3, wt('wk_percentile', 'page') + .3));
    hand('99.99th ≈ once every 25 pages', 1060, 1000, 36, PAL.sap, seg(t, wt('wk_percentile', 'twenty-five') - .8, wt('wk_percentile', 'pages', 1) + .3));
    hand(Math.floor(flips) + ' pages', 1500, 300, 40, PAL.clayDk, seg(t, wt('wk_percentile', 'nine') , e));
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('wk_percentile', 'niche') , 'confused'], [wt('wk_percentile', 'pages'), 'idea']]);
    if (lt < .3) brushWipe(.5 + lt / .6);
  }
  function titanic(t, lt, dur) {
    const a = cs('wk_titanic'), k = cs('wk_koan'), e = ce('wk_koan');
    setCountry(t, { mood: 'dusk', v: 'sea' });
    const kA = t < k - .3 ? on(t, a) : 0;
    if (kA > 0) {
      // the sea and a Titanic-ish ship
      boilSeed('sea'); paint(rectPts(-60, 620, W + 120, 520, 2), { wash: '#4E7F96', ink: PAL.ink, sw: 1 });
      for (let i = 0; i < 12; i++) inkLine([[i * 170 - 40 + 30 * Math.sin(t + i), 680 + 30 * (i % 3)], [i * 170 + 40 + 30 * Math.sin(t + i), 680 + 30 * (i % 3)]], 1.4, '#BFE3F0', 'ink', .5);
      const sx = 980 + 40 * Math.sin(t * .4), sy = 640 + 6 * Math.sin(t * 1.3);
      push(); translate(sx, sy); rotate(.02 * Math.sin(t)); boilSeed('ship');
      paint([[-360, 0], [380, 0], [320, 90], [-310, 90]], { wash: '#2B2233', ink: PAL.ink, sw: 1.2 }); paint(rectPts(-300, -70, 560, 70, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
      for (let i = 0; i < 4; i++) { paint(rectPts(-220 + i * 130, -170, 60, 100, 1), { wash: '#E8AA38', ink: PAL.ink, sw: 1 }); paint(rectPts(-220 + i * 130, -170, 60, 22, 1), { wash: '#2B2233', ink: null }); }
      pop();
      title('Titanic-ish', 980, 220, 72, PAL.cream, seg(t, wt('wk_titanic', 'Titanic-ish') - .4, wt('wk_titanic', 'Titanic-ish') + .5), { stroke: PAL.ink, strokeW: .1 });
      hand('neurons are analogizers', 980, 320, 42, PAL.cream, seg(t, wt('wk_titanic', 'analogizers') - .5, wt('wk_titanic', 'analogizers') + .4), { stroke: PAL.ink, strokeW: .1 });
      hand('not a hidden “naval voyage feature”', 980, 390, 36, PAL.cream, seg(t, wt('wk_titanic', 'naval') - .5, wt('wk_titanic', 'activations') + .3), { stroke: PAL.ink, strokeW: .1 });
    }
    const kK = t >= k - .3 ? 1 : 0;
    if (kK > 0) {
      setStudy(t, { board: false });
      title('almost all turned out to be related', 1060, 170, 54, PAL.ink, seg(t, k, wt('wk_koan', 'related') + .3));
      // ensō: a single brush circle, drawn on
      boilSeed('enso'); const P = []; for (let i = 0; i <= 60; i++) { const q = -1.4 + i / 60 * TAU * .93; P.push([1060 + Math.cos(q) * 200, 520 + Math.sin(q) * 190]); }
      const ke = seg(t, wt('wk_koan', 'koan') - .3, wt('wk_koan', 'koan') + 1.2);
      if (ke > 0) inkLine(P.slice(0, Math.max(2, Math.round(P.length * ease(ke)))), 14, PAL.ink, 'dry', .3);
      hand('a Zen koan neuron', 1060, 780, 40, PAL.ink, ke);
      hand('fires weakly on recursion in math: f(f(f(x)))', 1060, 840, 34, PAL.sap, seg(t, wt('wk_koan', 'recursion') - .3, wt('wk_koan', 'math') + .3));
      hand('the same kind of self-reference', 1060, 900, 32, PAL.slate, seg(t, wt('wk_koan', 'self-reference') - .5, wt('wk_koan', 'self-reference') + .3));
      presenter(t, 300, 960, 22, [[k - 1, 'neutral'], [k + .3, 'happy'], [wt('wk_koan', 'koan'), 'relieved']]);
    } else clawd(260, 980, 18, emotions(t, [[a - 1, 'neutral'], [a + .3, 'happy'], [wt('wk_titanic', 'Titanic-ish'), 'laugh']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.teal, '#2D7C79'] });
  }
  shots([
    [chapStart('ch08'), cardShot],
    [cs('wk_question') - .25, question],
    [cs('wk_ablate') - .2, ablate],
    [cs('wk_radiate') - .2, radiate],
    [cs('wk_percentile') - .3, pages],
    [cs('wk_titanic') - .3, titanic],
    [cs('wk_koan') - .3, titanic],
  ]);
})();
