// ch07 Two explanations: a fork in the road (generalization vs superposition); neighbours share vs strangers share;
// 32 things into houses; the Squeezer crushes the curve district (480 → 10) and the horizon (1024 → 13); three island
// cities of different size; the Unfolding Machine's pieces mostly match single buildings.
(() => {
  const V = 'blog/raw/v-figure-10x/', RM = 'blog/raw/roadmap/', C3 = 'blog/raw/crushed-3b-v3/', CE = 'blog/raw/crushed-3b/examples/', CL = 'blog/raw/crushed-last-layer/images/';
  const TV = 'blog/raw/tiny-vehicles/', CP = 'blog/raw/car-path-distinctions/', NP = 'blog/raw/negative-poles-v2/';
  const all = ['te_two', 'te_local', 'te_shapes', 'te_test', 'te_squeeze', 'te_result', 'te_last', 'te_sizes', 'te_dict'];
  const talk = t => speak(t, all);
  const FLOPPY = [RM + 'ear-large-hanging', V + 'c5a317c', RM + 'ear-medium-head-side', V + 'n750219', RM + 'ear-small-general-dog', V + 'p10704'];
  const CURVES = ['324', '330', '340', '342', '343', '349', '379', '385', '388', '406'].map(n => C3 + 'curve-' + n);
  const SQ = Array.from({ length: 10 }, (_, i) => C3 + 'sq-' + i);

  function dusk(t) {
    sky(t, [[0, '#2A3A6A'], [.6, '#6A5A8A'], [1, '#E0A080']], { stars: 30, starH: 300, clouds: 4, cloudY: 300, cloudCol: '#E9A5A8' });
    skyline('c7b', -300, 2300, 840, { depth: .7, bh: 260, bw: 100, lit: .25 });
    boilSeed('c7gr'); paint(rectPts(-400, 860, W + 800, 400, 1), { grad: [[0, '#4A4270'], [1, '#2A2445']], ink: PAL.ink, sw: 1 });
  }
  function signpost(x, y, a, b, k) {
    if (k <= 0) return; boilSeed('c7sp');
    inkLine([[x, y], [x, y - 330 * ease(k)]], 9, '#6A4B30', 'ink', 0);
    if (k > .4) { const k2 = backOut(seg(k, .4, 1));
      push(); translate(x, y - 300); scale(k2); paint([[-20, -40], [-360, -40], [-400, 0], [-360, 40], [-20, 40]], { wash: '#9FE3C8', ink: PAL.ink, sw: 1.3 }); pop();
      push(); translate(x, y - 200); scale(k2); paint([[20, -40], [360, -40], [400, 0], [360, 40], [20, 40]], { wash: '#E9B0C8', ink: PAL.ink, sw: 1.3 }); pop();
      if (k > .8) { letter(a, x - 200, y - 296, 40, PAL.ink, { face: 'marker', shadow: false }); letter(b, x + 200, y - 196, 40, PAL.ink, { face: 'marker', shadow: false }); }
    }
  }
  function scroll(x, y, w, h, k = 1) { if (k <= 0) return; boilSeed('c7scr' + x); paint(rectPts(x, y, w, h, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1 }); paint(ellPts(x, y + h / 2, 8, h / 2 + 6, 12), { wash: '#D9C29A', ink: PAL.ink, sw: .8 }); paint(ellPts(x + w, y + h / 2, 8, h / 2 + 6, 12), { wash: '#D9C29A', ink: PAL.ink, sw: .8 }); letter('ARMA', x + w / 2, y + h * .3, h * .2, '#6A3A20', { face: 'marker', shadow: false }); letter('VIRVMQVE', x + w / 2, y + h * .55, h * .14, '#6A3A20', { face: 'marker', shadow: false }); letter('CANO', x + w / 2, y + h * .78, h * .16, '#6A3A20', { face: 'marker', shadow: false }); }

  // 1 · the fork, then neighbours vs strangers
  function fork(t, lt, dur) {
    const a = cs('te_two'), l = cs('te_local'), e = ce('te_local'), ts = wt('te_local', 'Superposition');
    dusk(t);
    const split = seg(t, l + .2, l + 1.2);
    camKeys(t, [[a - .3, 960, 560, 1.05], [l, 960, 560, 1], [e, 960, 560, .98]], .3);
    if (split < 1) {
      ctx.save(); ctx.globalAlpha = 1 - split;
      boilSeed('c7rd'); paint([[860, 1100], [1060, 1100], [1000, 860], [1400, 700], [1340, 680], [960, 820], [580, 680], [520, 700], [920, 860]], { wash: '#B9A27A', ink: PAL.ink, sw: 1.2 });
      signpost(960, 880, 'GENERALIZATION', 'SUPERPOSITION', seg(t, a + .2, a + 1.8));
      prof(330, 1010, .62, { view: 'q', pose: gesture(t, [[a, 'explain'], [wt('te_two', 'opposite'), 'shrug']]), mood: 'think', look: [.8, -.5], talk: talk(t) });
      clawd(1300, 1010, 10, { ...emotions(t, [[a, 'thinking']]), view: 'q', flip: true, boilKey: 'c7c' });
      ctx.restore();
    }
    if (split > 0) {
      ctx.save(); ctx.globalAlpha = split;
      // left: neighbours share: every window a floppy-eared dog
      neuronHouse(520, 900, 400, 520, { roof: 'peak', on: .7, imgs: FLOPPY, cols: 2, key: 'c7l', col: '#5A7A6A', roofCol: '#3A6A5A', awning: false, k: split });
      // right: strangers share: dogs and a scroll of Latin poetry
      neuronHouse(1400, 900, 400, 520, { roof: 'peak', on: .7, imgs: [V + 'c5a317c', V + 'p10704', V + 'n750219', V + 'p10704'], cols: 2, key: 'c7r', col: '#7A5A6A', roofCol: '#6A3A5A', awning: false, k: split });
      const sk = seg(t, wt('te_local', 'Latin') - .5, wt('te_local', 'Latin') + .2);
      if (sk > 0) { push(); translate(1400, 640); scale(backOut(sk)); translate(-1400, -640); scroll(1240, 560, 320, 170); pop(); }
      if (sk > .5) { person(1660, 905, .9, { col: '#C9A26B', key: 'c7dog', mood: 'oops' }); sfx('?', 1660, 720, 60, PAL.berry, frac(t)); }
      ctx.restore();
      title('neighbours share', 520, 150, 64, '#9FE3C8', seg(t, l + .4, l + 1.4), { stroke: '#1B1F4A', strokeW: .12 });
      title('strangers share', 1400, 150, 64, '#E9B0C8', seg(t, ts - .3, ts + .7), { stroke: '#1B1F4A', strokeW: .12 });
      hand('generalization', 520, 230, 40, PAL.cream, seg(t, l + .8, l + 1.6), { stroke: PAL.ink, strokeW: .14 });
      hand('superposition', 1400, 230, 40, PAL.cream, seg(t, ts, ts + .8), { stroke: PAL.ink, strokeW: .14 });
    }
    camEnd();
    vignette(.4);
    chapterSign(t, t - chapStart('ch07'), cs('te_two') - chapStart('ch07') + 3, '7', 'Two explanations');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // 2 · 32 things, a handful of houses: grouped vs scattered, then fewer houses
  function shapes(t, lt, dur) {
    const a = cs('te_shapes'), e = ce('te_shapes'), tg = wt('te_shapes', 'groups'), tf = wt('te_shapes', 'fewer'), tsc = wt('te_shapes', 'scatters');
    dusk(t);
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 560, 1]], 0);
    boilSeed('c7div'); inkLine([[960, 80], [960, 1060]], 3, PAL.cream, 'dry', 0);
    const merge = ease(seg(t, tf - .3, tf + 1.2));
    // eight houses per side, merging into four (pairs slide together)
    const hx = (side, j) => { const base = side ? 1010 : 50, w8 = 110, w4 = 220; const x8 = base + 50 + j * w8, x4 = base + 70 + Math.floor(j / 2) * w4 + (j % 2 ? 0 : 0); return lerp(x8, x4 + 40, merge); };
    for (const side of [0, 1]) for (let j = 0; j < 8; j++) { const x = hx(side, j); neuronHouse(x, 860, lerp(96, 200, merge), lerp(150, 200, merge), { roof: 'peak', on: .4, key: 'c7h' + side + (merge > .5 ? 'm' + Math.floor(j / 2) : j), col: side ? '#7A5A6A' : '#5A7A6A', awning: false }); }
    // the 32 things fly in
    SHAPES.forEach((S, i) => {
      const k = ease(seg(t, a + .5 + i * .04, a + 1.6 + i * .04));
      for (const side of [0, 1]) {
        const j = side ? Math.floor(hash(i * 7.7) * 8) : S.fam * 2 + (S.i % 2), slot = side ? i % 4 : Math.floor(S.i / 2);
        const tx = hx(side, j) - 30 + (slot % 2) * 30 + (merge > .5 ? (j % 2) * 0 : 0), ty = 760 - Math.floor(slot / 2) * 40 - (merge * (j % 2) * 70);
        const sx = 960 + (hash(i * 3.1) - .5) * 600, sy = -60;
        const kk = side ? ease(seg(t, a + 1.2 + i * .04, a + 2.3 + i * .04)) : k;
        if (kk <= 0) continue;
        shape(S.kind, lerp(sx, tx, kk), lerp(sy, ty, kk), 15, S.col);
      }
    });
    title('generalization', 480, 150, 60, '#9FE3C8', on(t, a), { stroke: '#1B1F4A', strokeW: .12 });
    title('superposition', 1440, 150, 60, '#E9B0C8', on(t, a), { stroke: '#1B1F4A', strokeW: .12 });
    if (merge > .5) { hand('coarser groups', 480, 250, 44, PAL.cream, seg(merge, .5, 1), { stroke: PAL.ink, strokeW: .14 }); hand('a worse jumble', 1440, 250, 44, PAL.cream, seg(merge, .5, 1), { stroke: PAL.ink, strokeW: .14 }); }
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A3A6A', '#6A5A8A'] });
  }

  // the Squeezer: a giant press on a gantry. y0 = bottom of the plate.
  function squeezer(x, y0, w, o = {}) {
    boilSeed('sqz');
    paint(rectPts(x - w / 2 - 52, 60, 24, 1000, 1), { wash: '#5A5A7A', ink: PAL.ink, sw: 1 }); paint(rectPts(x + w / 2 + 28, 60, 24, 1000, 1), { wash: '#5A5A7A', ink: PAL.ink, sw: 1 });
    paint(rectPts(x - w / 2 - 70, 30, w + 140, 60, 1), { wash: '#6E7891', ink: PAL.ink, sw: 1.4 });
    paint(rectPts(x - 22, 90, 44, Math.max(10, y0 - 150), 1), { grad: [[0, '#C9D0DE'], [1, '#8A93A8']], gdir: [x - 22, 0, x + 22, 0], ink: PAL.ink, sw: 1.2 });
    paint(rectPts(x - w / 2, y0 - 60, w, 60, 1), { grad: [[0, '#B9C0CE'], [1, '#6E7891']], ink: PAL.ink, sw: 1.6 });
    letter('THE SQUEEZER', x, y0 - 28, 34, PAL.ink, { face: 'marker', shadow: false });
    // a lever on the side
    push(); translate(x + w / 2 + 40, 700); rotate(o.lever || 0); inkLine([[0, 0], [90, -90]], 8, '#6A4B30', 'ink', 0); paint(ellPts(90, -90, 20, 20, 14), { wash: PAL.berry, ink: PAL.ink, sw: 1 }); pop();
  }

  // 3 · the test, and the crush: 480 tiny curve huts → 10 clean buildings; the machine finds no hidden curves
  function squeeze(t, lt, dur) {
    const a = cs('te_test'), s = cs('te_squeeze'), r = cs('te_result'), e = ce('te_result');
    const tc = wt('te_squeeze', 'crushed'), tl = wt('te_test', 'squeeze'), tn = wt('te_result', 'none'), tu = wt('te_result', 'Unfolding');
    dusk(t);
    camKeys(t, [[a - .3, 960, 560, .95], [s, 960, 560, .92], [tc, 960, 600, 1], [r, 960, 560, .95], [e, 960, 560, .95]], .3);
    const down = easeIn(seg(t, tc - .3, tc + .5)), up = easeOut(seg(t, r - .2, r + 1.2)), plateY = lerp(300, 860, down * (1 - up)) + (1 - down) * 0;
    const crushed = t > tc + .4;
    if (!crushed) {
      // the curve district: a field of 480 tiny huts, some with curve photos in their single window
      for (let i = 0; i < 480; i++) {
        const c = i % 40, rr = Math.floor(i / 40), x = 130 + c * 42 + (rr % 2) * 21, y = 860 - rr * 26, k = popk(t, a + hash(i) * 2, .3); if (k <= 0) continue;
        boilSeed('c7tiny' + (i % 7)); push(); translate(x, y); scale(backOut(k) * (1 - rr * .03));
        paint(rectPts(-15, -24, 30, 24, .5), { wash: ['#6A5A8A', '#5A6A8A', '#7A5A7A'][i % 3], ink: PAL.ink, sw: .5 }); paint([[-18, -24], [0, -36], [18, -24]], { wash: '#9C4A35', ink: PAL.ink, sw: .4 });
        if (i % 9 === 0) { const I = img(CURVES[i % 10]); ctx.drawImage(I, -9, -20, 18, 14); } else paint(rectPts(-5, -18, 10, 8, 0), { wash: '#FFD58A', ink: null });
        pop();
      }
      if (t > s) hand('480 curve detectors', 960, 520, 50, PAL.cream, seg(t, wt('te_squeeze', 'four') - .3, wt('te_squeeze', 'eighty') + .4), { stroke: PAL.ink, strokeW: .14 });
      if (t > wt('te_squeeze', 'dramatic') - .4) hand('should be dramatic: curves, spirals, webs crammed together', 960, 1010, 40, PAL.cream, seg(t, wt('te_squeeze', 'dramatic') - .4, wt('te_squeeze', 'together') + .3), { stroke: PAL.ink, strokeW: .14 });
    } else {
      // ten clean buildings: broad curve families
      for (let i = 0; i < 10; i++) {
        const x = 150 + i * 180, k = popk(t, tc + .4 + i * .05, .4);
        neuronHouse(x, 860, 150, 230 * (1 - .3 * (1 - up)), { roof: 'flat', on: .5 + .4 * up, imgs: [SQ[i], CE + i + '-0-0'], cols: 1, key: 'c7sq' + i, col: '#5A6A8A', awning: false, k });
      }
      if (up > .5) hand('clean, just coarser', 960, 520, 54, PAL.cream, seg(up, .5, 1), { stroke: PAL.ink, strokeW: .14 });
      if (t > tc + .4 && t < tc + 1.4) sfx('CRUNCH', 960, 300, 90, PAL.berry, (t - tc - .4));
    }
    squeezer(960, plateY, 1800, { lever: t > tl - .3 ? lerp(0, 1.2, seg(t, tl - .3, tl + .3)) : 0 });
    // the Unfolding Machine sniffs around and comes back empty-handed
    if (t > tu - .5) { const mx = lerp(2300, 1600, easeOut(seg(t, tu - .5, tu + 1.5))) + 40 * Math.sin(t * 2); machine(t, mx, 1060, .32, { on: 1, mouth: .5 }); if (t > tn - .3) { boilSeed('c7bsk'); paint([[mx - 140, 940], [mx - 60, 940], [mx - 70, 990], [mx - 130, 990]], { wash: '#C9A15A', ink: PAL.ink, sw: 1 }); hand('no hidden curves', mx - 100, 900, 34, PAL.cream, seg(t, tn - .3, tn + .4), { stroke: PAL.ink, strokeW: .14 }); } }
    const covered = t > tc - 1 && t < tc + 1.6;
    clawd(1850, 1050, 9, { ...emotions(t, [[a, 'determined'], [tl - .3, 'excited'], [tc - 1, 'scared'], [tc + 1.6, 'relieved']]), view: 'front', aL: covered ? 2.8 : undefined, aR: covered ? 2.8 : undefined, boilKey: 'c7c2' });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A3A6A', '#6A5A8A'] });
  }

  // 4 · the horizon district squeezed into 13 grand buildings
  function last(t, lt, dur) {
    const a = cs('te_last'), e = ce('te_last'), tb = wt('te_last', 'broader');
    sky(t, [[0, '#2A2A55'], [.6, '#8A5A7A'], [1, '#F0A070']], { stars: 20 });
    glow(960, 700, 700, '#FFB46A', .45);
    camKeys(t, [[a - .3, 960, 520, 1.1], [e, 960, 560, .95]], .3);
    boilSeed('c7hz'); paint(rectPts(-400, 860, W + 800, 400, 1), { grad: [[0, '#4A3A5A'], [1, '#2A2238']], ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 13; i++) {
      const x = 90 + i * 145, h = 300 + 140 * Math.sin(i * 1.3 + 1) ** 2, k = popk(t, a + 1.5 + i * .12, .5);
      neuronHouse(x, 880, 130, h, { roof: ['flat', 'dome', 'peak'][i % 3], on: .7, imgs: [CL + `n${String(i).padStart(2, '0')}_positive_00`], cols: 1, key: 'c7z' + i, col: '#4A5A7A', awning: false, k });
    }
    hand('1,024 neurons, squeezed to 13', 960, 160, 56, PAL.cream, seg(t, wt('te_last', 'thousand') - .3, wt('te_last', 'thirteen') + .4), { stroke: PAL.ink, strokeW: .14 });
    const kb = seg(t, tb - .5, tb + .4);
    camEnd();
    if (kb > 0) title('a broader brush', 960, 1000, 84, '#FFD36B', kb, { stroke: '#1B1F4A', strokeW: .14 });
    // a broad brush sweeps across
    if (kb > 0 && kb < 1) { const bx = lerp(-200, 2100, kb); inkLine([[bx - 300, 960], [bx, 940]], 40, rgba('#FFD36B', .6), 'dry', .2); }
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A2A55', '#8A5A7A'] });
  }

  // 5 · three island cities, 300× apart in size: one car house; a car street; a whole car district
  function sizes(t, lt, dur) {
    const a = cs('te_sizes'), e = ce('te_sizes'), tsm = wt('te_sizes', 'smallest'), tbg = wt('te_sizes', 'biggest');
    sky(t, [[0, '#7AB0D8'], [1, '#F4E3C0']], { clouds: 5, cloudY: 240, cloudCol: '#FFFFFF' });
    boilSeed('c7sea'); paint(rectPts(-400, 700, W + 800, 600, 1), { grad: [[0, '#5FA8B5'], [1, '#2E6A7A']], ink: null, tex: .6 });
    for (let i = 0; i < 20; i++) { const x = hash(i * 2.7) * W, y = 740 + hash(i * 4.1) * 300; inkLine([[x + 20 * Math.sin(t + i), y], [x + 50 + 20 * Math.sin(t + i), y]], 1.6, '#DFF2F5', 'ink', .4); }
    camKeys(t, [[a - .3, 960, 560, 1], [tsm, 420, 600, 1.3], [tbg - .5, 960, 560, 1], [tbg + .5, 1400, 580, 1.15], [e, 1300, 580, 1.05]], .4);
    const island = (cx, rx, k) => { boilSeed('isl' + cx); paint(ellPts(cx, 860, rx, rx * .22, 30), { grad: [[0, '#C9B48E'], [1, '#8FBF73']], ink: PAL.ink, sw: 1.3 }); };
    island(380, 200); island(860, 300); island(1500, 420);
    neuronHouse(380, 850, 130, 180, { roof: 'peak', on: .7, imgs: [TV + 'positive-03'], cols: 1, key: 'c7i1', col: '#3E5A7A', awning: false, k: popk(t, tsm - .4, .5) });
    [TV + 'positive-01', TV + 'positive-04', TV + 'positive-07'].forEach((im, i) => neuronHouse(760 + i * 100, 850, 86, 140, { roof: 'peak', on: .7, imgs: [im], cols: 1, key: 'c7i2' + i, col: '#3E5A7A', awning: false, k: popk(t, a + 1 + i * .2, .5) }));
    const BIG = [CP + 'car-5826', TV + 'positive-01', TV + 'positive-02', TV + 'positive-04', TV + 'positive-05', TV + 'positive-06', TV + 'positive-07', TV + 'positive-08', CP + 'stage3_block1-1455-pos-1', CP + 'stage3_block2-632-pos-1', NP + 'taxis-positive-1', NP + 'taxis-positive-2'];
    BIG.forEach((im, i) => { const c = i % 6, r = Math.floor(i / 6); neuronHouse(1220 + c * 110 + r * 50, 850 - r * 60, 90, 110, { roof: 'flat', on: .7, imgs: [im], cols: 1, key: 'c7i3' + i, col: '#3E5A7A', awning: false, k: popk(t, tbg - .6 + i * .08, .4) }); });
    hand('small', 380, 990, 40, PAL.cream, on(t, a + .5), { stroke: PAL.ink, strokeW: .14 }); hand('medium', 860, 1010, 40, PAL.cream, on(t, a + .7), { stroke: PAL.ink, strokeW: .14 }); hand('300× bigger', 1500, 1040, 40, PAL.cream, on(t, a + .9), { stroke: PAL.ink, strokeW: .14 });
    camEnd();
    const kl = seg(t, wt('te_sizes', 'Less') - .3, wt('te_sizes', 'scrambled') + .4);
    if (kl > 0) title('less room: broader, not scrambled', 960, 140, 64, PAL.ink, kl, { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#7AB0D8', '#5FA8B5'] });
  }

  // 6 · the Unfolding Machine's pieces mostly match single buildings: 88%
  function dict(t, lt, dur) {
    const a = cs('te_dict'), e = ce('te_dict'), t88 = wt('te_dict', 'eighty-eight') || wt('te_dict', 'eighty'), tbb = wt('te_dict', 'baseball');
    dusk(t);
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 560, 1]], 0);
    const PAIRS = [[TV + 'positive-01', TV + 'positive-01'], [NP + 'broccoli-positive-1', NP + 'broccoli-positive-2'], [NP + 'spoonbills-positive-1', NP + 'spoonbills-positive-2'], [NP + 'lighthouses-positive-1', NP + 'lighthouses-positive-2'], [NP + 'toucans-positive-1', NP + 'toucans-positive-2'], [NP + 'pretzels-positive-1', NP + 'pretzels-positive-2']];
    machine(t, 260, 1000, .55, { on: 1, belt: 1, mouth: .7, items: [i => { const [p] = PAIRS[i % PAIRS.length]; boilSeed('c7pc' + i); paint(rrPts(-34, -70, 68, 68, 6), { wash: '#F3E2BE', ink: PAL.ink, sw: .8 }); const I = img(p), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -28, -64, 56, 56); }] });
    // a row of buildings above the belt; a tick when each piece matches one
    PAIRS.forEach(([p, q], i) => { const x = 700 + i * 200; neuronHouse(x, 640, 150, 200, { roof: 'peak', on: .6, imgs: [q], cols: 1, key: 'c7m' + i, col: '#5A6A8A', awning: false }); tick(x + 60, 420, 50, seg(t, a + 1.5 + i * .7, a + 2 + i * .7)); });
    // the 88% bar painted on the side of the belt
    const bk = seg(t, t88 - 1.2, t88 + .4);
    boilSeed('c7bar'); paint(rectPts(560, 960, 1200, 50, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1.2 }); if (bk > 0) paint(rectPts(566, 966, 1188 * .88 * bk, 38, 1), { wash: PAL.sap, ink: null });
    if (bk > .7) letter('88% of its activity: near-copies of single neurons', 1160, 1050, 36, PAL.cream, { face: 'hand', shadow: false });
    clawd(1820, 860, 9, { ...emotions(t, [[a, 'neutral'], [t88, 'proud']]), view: 'q', flip: true, boilKey: 'c7c3' });
    const kb = seg(t, tbb - .3, tbb + .8);
    camEnd();
    if (kb > 0) title('the understanding was in a neuron', 960, 150, 70, PAL.cream, kb, { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A3A6A', '#6A5A8A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch07'), fork], [cs('te_shapes') - .3, shapes], [cs('te_test') - .3, squeeze], [cs('te_last') - .3, last], [cs('te_sizes') - .3, sizes], [cs('te_dict') - .3, dict]]);
})();
