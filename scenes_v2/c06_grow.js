// ch06 Watching a neuron grow: a seed in a park; a house of yellow-flower photos grows annexes like a tree (balls,
// fruit, dogs, broccoli); the modern network's version folds its ball annex away; recursive generalization;
// "iy" → "diy" → "do it yourself" in the language city; geology → Cesium, enemy → a Russian poem.
(() => {
  const NO = 'blog/raw/neuron-overflow/';
  const iv = (s, b, i) => NO + `iv1_${s}_${b}_${i}`, cx_ = (s, b, i) => NO + `cnx_${s}_${b}_${i}`;
  const all = ['gr_q', 'gr_flowers', 'gr_branch', 'gr_compare', 'gr_name', 'gr_iy', 'gr_geology'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };

  function park(t, o = {}) {
    // a time-lapse sky: day ↔ dusk cycling while o.speed > 0
    const ph = .5 + .5 * Math.sin((o.clock ?? t) * 1.3);
    const top = mixCol('#8EC3E6', '#3E3B7A', ph * (o.cyc ?? 0)), bot = mixCol('#F4E3C0', '#E7A27E', ph * (o.cyc ?? 0));
    ctx.save(); resetMatrix(); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    // the sun races across in time-lapse
    if (o.cyc) { const sx = frac((o.clock ?? t) * 1.3 / TAU) * (W + 400) - 200, sy = 300 - 180 * Math.sin(frac((o.clock ?? t) * 1.3 / TAU) * Math.PI); glow(sx, sy, 160, '#FFE08A', .7); paint(ellPts(sx, sy, 34, 34, 18), { wash: '#FFE08A', ink: null }); }
    skyline('c6park', -300, 2300, 860, { depth: .85, bh: 200, bw: 90, lit: .15, haze: '#B9C9D8', col: '#7A8AA8' });
    boilSeed('c6lawn'); paint(rectPts(-400, 840, W + 800, 400, 1), { grad: [[0, '#8FBF73'], [1, '#4E8A44']], gdir: [0, 840, 0, 1080], ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 26; i++) { const x = hash(i * 3.3) * W, y = 880 + hash(i * 1.7) * 180; inkLine([[x, y], [x + 4, y - 14]], 1.4, '#3E6A3A', 'inkfine', 0); }
  }
  // a tree of rooms: each node {x, y, w, h, imgs, k, parent, label, col}
  function roomTree(t, N, o = {}) {
    for (const n of N) if (n.parent != null && n.k > 0) { const p = N[n.parent]; stroke([[p.x, p.y - p.h * .5], [(p.x + n.x) / 2 + (n.x - p.x) * .1, Math.max(p.y, n.y) - Math.abs(n.x - p.x) * .4 - 40], [n.x, n.y - 6]], ease(clamp(n.k * 1.6)), (o.sw || 26) * (n.w / 220), '#7A5B3E'); }
    for (const n of N) if (n.k > .3) {
      const kk = clamp((n.k - .3) / .7);
      neuronHouse(n.x, n.y, n.w, n.h, { roof: n.roof || 'peak', on: n.on ?? .6, imgs: n.imgs, cols: n.cols || 2, key: n.key, col: n.col || '#C9B48E', roofCol: n.roofCol || '#6E9F58', awning: false, k: kk });
      if (n.label && kk > .6) hand(n.label, n.x, n.y + 46, 34, PAL.ink, seg(kk, .6, 1), { stroke: PAL.cream, strokeW: .12 });
    }
  }
  function stepSign(x, y, step, k = 1) { if (k <= 0) return; boilSeed('c6ss'); paint(rrPts(x - 230, y - 50, 460, 100, 12), { wash: PAL.cream, ink: PAL.ink, sw: 1.2 }); letter('training step ' + step.toLocaleString('en-US'), x, y + 4, 44, PAL.ink, { face: 'hand', shadow: false, alpha: k }); }

  // 1–3 · the seed, the flower house, and its branches
  function growth(t, lt, dur) {
    const q = cs('gr_q'), f = cs('gr_flowers'), b = cs('gr_branch'), e = ce('gr_branch');
    const tTen = wt('gr_branch', 'tennis'), tFr = wt('gr_branch', 'fruit'), tDog = wt('gr_branch', 'dogs'), tBr = wt('gr_branch', 'broccoli'), tGone = wt('gr_branch', 'gone');
    const lapse = seg(t, q + 1.5, q + 3);
    park(t, { cyc: lapse, clock: q + (t - q) * (1 + 3 * lapse) });
    camKeys(t, [[q - .3, 960, 700, 1.4], [f, 960, 640, 1.15], [b, 960, 560, .95], [tBr, 960, 520, .85], [e + .5, 960, 520, .82]], .3);
    // the seed
    const sprout = seg(t, wt('gr_q', 'grow') - .4, f + 1);
    if (sprout < 1) { boilSeed('c6seed'); paint(ellPts(960, 900, 14, 10, 12), { wash: '#7A5B3E', ink: PAL.ink, sw: 1 }); if (sprout > 0) { stroke([[960, 900], [962, 900 - 60 * sprout]], 1, 4, '#3E6A3A'); paint(ellPts(976, 900 - 60 * sprout, 14 * sprout, 7 * sprout, 10), { wash: '#6E9F58', ink: PAL.ink, sw: .7 }); } }
    const shrink = 1 - .55 * seg(t, tGone - 1.2, tGone + .3);
    const N = [
      { x: 960, y: 900, w: 300 * shrink, h: 300 * shrink, imgs: [iv(1654, 0, 0), iv(1654, 0, 3), iv(3753, 0, 1), iv(1654, 3, 0)], k: seg(t, f + .4, f + 2), key: 'c6root', roof: 'peak', col: '#E8D3A0', label: 'yellow flower fields', on: .7 },
      { parent: 0, x: 560, y: 640, w: 220, h: 220, imgs: [iv(3753, 1, 2), iv(7506, 1, 0)], k: seg(t, tTen - .9, tTen + .6), key: 'c6ball', col: '#D9E3A0', label: 'tennis balls' },
      { parent: 1, x: 300, y: 420, w: 200, h: 200, imgs: [iv(7506, 2, 0), iv(15012, 2, 0)], k: seg(t, tFr - .8, tFr + .6), key: 'c6fruit', col: '#E3C9A0', label: 'fruit' },
      { parent: 0, x: 1360, y: 640, w: 220, h: 220, imgs: [iv(7506, 3, 0), iv(15012, 3, 1)], k: seg(t, tDog - .8, tDog + .6), key: 'c6dog', col: '#D9C0A8', label: 'dogs, no flowers' },
      { parent: 3, x: 1620, y: 420, w: 200, h: 200, imgs: [iv(7506, 4, 1), iv(15012, 4, 2)], k: seg(t, tBr - .8, tBr + .6), key: 'c6broc', col: '#B9D3A0', label: 'broccoli' },
    ];
    roomTree(t, N);
    // the training-step counter ticks up as each branch grows
    const step = t < tTen - .9 ? 1654 : t < tDog - .8 ? 3753 : t < tBr - .8 ? 7506 : t < tGone - 1 ? 15012 : 30024;
    camEnd();
    stepSign(1620, 150, step, on(t, f));
    const kt = seg(t, wt('gr_flowers', 'retrained') - .3, wt('gr_flowers', 'form') + .4) * (1 - seg(t, b - .5, b));
    if (kt > 0) hand('I retrained the old network and watched', 700, 150, 48, PAL.ink, kt, { stroke: PAL.cream, strokeW: .1 });
    clawd(1760, 1020, 9, { ...emotions(t, [[q, 'neutral'], [f + .5, 'happy'], [tTen, 'excited'], [tGone, 'surprised']]), view: 'q', flip: true, boilKey: 'c6c' });
    prof(lerp(-200, 240, easeOut(seg(t, q - .2, q + 2))), 1010, .58, { view: 'q', walk: t < q + 2 ? t * 1.3 : null, pose: gesture(t, [[q, 'rest'], [q + 2, 'explain'], [f, 'present'], [b, 'explain2'], [tDog, 'point']]), mood: 'warm', look: [.8, -.3], talk: t > q + 2 ? talk(t) : 0 });
    vignette(.25, '#2A3A20');
    chapterSign(t, t - chapStart('ch06'), cs('gr_q') - chapStart('ch06') + 3, '6', 'Watching a neuron grow');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#8FBF73', '#5E9A4C']);
  }

  // 4 · the modern network's version: a ball annex grows, then politely folds itself away
  function compare(t, lt, dur) {
    const a = cs('gr_compare'), e = ce('gr_compare'), tb = wt('gr_compare', 'balls'), tg = wt('gr_compare', 'go'), ts = wt('gr_compare', 'fields');
    park(t, {});
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 560, 1]], 0);
    // left half: the old network, overgrown (static); right half: the modern one
    ctx.save(); const L = new Path2D(); L.rect(-100, -100, 1060, 1400); ctx.clip(L);
    roomTree(t, [
      { x: 480, y: 900, w: 200, h: 200, imgs: [iv(30024, 0, 1), iv(30024, 0, 2)], k: 1, key: 'c6l0', col: '#E8D3A0' },
      { parent: 0, x: 230, y: 660, w: 150, h: 150, imgs: [iv(30024, 1, 3), iv(30024, 1, 5)], k: 1, key: 'c6l1', col: '#D9E3A0' },
      { parent: 1, x: 120, y: 450, w: 130, h: 130, imgs: [iv(30024, 2, 2), iv(30024, 2, 3)], k: 1, key: 'c6l2', col: '#E3C9A0' },
      { parent: 0, x: 730, y: 660, w: 150, h: 150, imgs: [iv(30024, 3, 1), iv(30024, 3, 2)], k: 1, key: 'c6l3', col: '#D9C0A8' },
      { parent: 3, x: 860, y: 450, w: 130, h: 130, imgs: [iv(30024, 4, 0), iv(30024, 4, 3)], k: 1, key: 'c6l4', col: '#B9D3A0' },
    ], { sw: 18 });
    ctx.restore();
    boilSeed('c6div'); inkLine([[960, -20], [960, 1100]], 4, PAL.ink, 'ink', 0);
    const grow = seg(t, tb - .8, tb + .5), fold = seg(t, tg - .3, tg + 1.2), annex = grow * (1 - fold);
    roomTree(t, [
      { x: 1440, y: 900, w: 260, h: 260, imgs: [cx_(1654, 0, 1), cx_(7506, 0, 3), cx_(15012, 0, 1), cx_(30024, 0, 0)], k: 1, key: 'c6r0', col: '#E8D3A0', on: .6 + .3 * seg(t, ts - .5, ts + .5) },
      { parent: 0, x: 1730, y: 640, w: 170, h: 170, imgs: [cx_(3753, 1, 1), cx_(7506, 1, 3)], k: annex, key: 'c6r1', col: '#D9E3A0' },
    ]);
    camEnd();
    title('the old network', 480, 100, 60, PAL.ink, 1, { stroke: PAL.cream, strokeW: .1 });
    title('the modern network', 1440, 100, 60, PAL.ink, 1, { stroke: PAL.cream, strokeW: .1 });
    if (fold > .4) hand('…and let them go', 1500, 200, 46, PAL.berry, seg(fold, .4, 1));
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#8FBF73', '#5E9A4C'] });
  }

  // 5 · recursive generalization: a path traces from the root to every branch
  function name(t, lt, dur) {
    const a = cs('gr_name'), e = ce('gr_name'), tr = wt('gr_name', 'recursive'), tf = wt('gr_name', 'follow');
    park(t, {});
    camKeys(t, [[a - .3, 960, 560, .9], [e, 960, 540, .85]], .3);
    const N = [
      { x: 960, y: 940, w: 200, h: 200, imgs: [iv(30024, 0, 1), iv(30024, 0, 2)], k: 1, key: 'c6n0', col: '#E8D3A0' },
      { parent: 0, x: 620, y: 700, w: 170, h: 170, imgs: [iv(30024, 1, 3), iv(30024, 1, 5)], k: 1, key: 'c6n1', col: '#D9E3A0' },
      { parent: 1, x: 360, y: 480, w: 150, h: 150, imgs: [iv(30024, 2, 2), iv(30024, 2, 3)], k: 1, key: 'c6n2', col: '#E3C9A0' },
      { parent: 0, x: 1300, y: 700, w: 170, h: 170, imgs: [iv(30024, 3, 1), iv(30024, 3, 5)], k: 1, key: 'c6n3', col: '#D9C0A8' },
      { parent: 3, x: 1560, y: 480, w: 150, h: 150, imgs: [iv(30024, 4, 0), iv(30024, 4, 3)], k: 1, key: 'c6n4', col: '#B9D3A0' },
    ];
    roomTree(t, N, { sw: 22 });
    // the painted path: root → balls → fruit, and root → dogs → broccoli, a beat apart
    const pk = seg(t, wt('gr_name', 'generalizes') - .3, tf + .6);
    boilSeed('c6path');
    stroke([[960, 800], [800, 700], [620, 600], [480, 500], [360, 400]], clamp(pk * 2), 7, PAL.berry);
    stroke([[960, 800], [1130, 700], [1300, 600], [1440, 500], [1560, 400]], clamp(pk * 2 - .5), 7, PAL.berry);
    const tk = seg(t, tr - .3, tr + .8);
    camEnd();
    if (tk > 0) title('recursive generalization', 960, 130, 84, PAL.ink, tk, { stroke: PAL.cream, strokeW: .1 });
    hand('every branch makes sense on its own', 960, 230, 46, PAL.berry, seg(t, wt('gr_name', 'Every') - .2, wt('gr_name', 'own') + .4));
    prof(1760, 1010, .55, { view: 'q', flip: true, pose: gesture(t, [[a, 'explain'], [tr, 'present'], [tf - .5, 'point']]), mood: 'warm', look: [-.8, -.4], talk: talk(t) });
    vignette(.25, '#2A3A20');
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#8FBF73', '#5E9A4C'] });
  }

  // the language city: a night harbour where buildings are made of books and letters
  function harbour(t) {
    sky(t, [[0, '#0E1236'], [.7, '#1E2A5A'], [1, '#3A4A7A']], { stars: 180, starH: 500 });
    glow(1500, 200, 160, '#FFF2C8', .5); paint(ellPts(1500, 200, 50, 50, 22), { wash: '#FFF2C8', ink: null });
    boilSeed('c6sea'); paint(rectPts(-300, 900, W + 600, 300, 1), { grad: [[0, '#1E3A66'], [1, '#0E1A36']], ink: null, tex: .6 });
    for (let i = 0; i < 18; i++) { const x = hash(i * 2.7) * W, y = 930 + hash(i * 4.1) * 130; inkLine([[x + 20 * Math.sin(t + i), y], [x + 60 + 20 * Math.sin(t + i), y]], 1.4, '#8FB7E6', 'ink', .4); }
    boilSeed('c6quay'); paint(rectPts(-300, 860, W + 600, 44, 1), { wash: '#4A4470', ink: PAL.ink, sw: 1.1 });
  }
  // a building shaped like a stack of books with a hanging letter sign
  function bookHouse(x, y, w, h, sign, k, o = {}) {
    if (k <= 0) return; const kk = backOut(clamp(k));
    push(); translate(x, y); scale(1, kk); translate(-x, -y);
    boilSeed('bk' + sign);
    const n = Math.max(2, Math.round(h / 60)), cols = [PAL.berry, PAL.teal, PAL.ochre, PAL.violet, '#3A64B8', PAL.sap];
    for (let i = 0; i < n; i++) { const by = y - (i + 1) * h / n, off = (hash(i * 3 + sign.length) - .5) * 20; paint(rectPts(x - w / 2 + off, by, w, h / n - 2, 1.5), { wash: cols[(i + sign.length) % 6], ink: PAL.ink, sw: 1 }); inkLine([[x - w / 2 + off + 10, by + h / n * .5], [x + w / 2 + off - 10, by + h / n * .5]], 1, '#F3E2BE', 'inkfine', 0); }
    glow(x, y - h * .5, w, '#FFD58A', .3 * (o.on ?? .6));
    pop();
    if (k > .6) { boilSeed('bks' + sign); inkLine([[x - 60, y - h - 6], [x - 60, y - h - 34]], 1.4, PAL.ink, 'inkfine', 0); inkLine([[x + 60, y - h - 6], [x + 60, y - h - 34]], 1.4, PAL.ink, 'inkfine', 0); const sw = Math.max(140, sign.length * 24 + 40); paint(rrPts(x - sw / 2, y - h - 100, sw, 70, 10), { wash: PAL.cream, ink: PAL.ink, sw: 1.1 }); letter(sign, x, y - h - 62, 40, PAL.ink, { face: 'marker', shadow: false, reveal: seg(k, .6, 1) }); }
  }

  // 6 · "iy" → "Miyazaki" → "diy" → "do it yourself"
  function iy(t, lt, dur) {
    const a = cs('gr_iy'), e = ce('gr_iy'), tm = wt('gr_iy', 'Miyazaki'), td = wt('gr_iy', 'D'), ty = wt('gr_iy', 'yourself'), tc = wt('gr_iy', 'contain');
    harbour(t);
    camKeys(t, [[a - .3, 520, 640, 1.45], [tm, 700, 620, 1.25], [td, 900, 600, 1.1], [ty, 1100, 580, 1.05], [e, 1150, 600, 1.12]], .3);
    const tree = [[340, 860, 'iy', a + 1], [720, 860, 'Miyazaki', tm - .6], [1100, 860, 'diy', td - .5], [1540, 860, 'do it yourself', ty - .6]];
    // branch lines: iy → Miyazaki, iy → diy, diy → do it yourself
    stroke([[340, 540], [530, 430], [720, 560]], seg(t, tm - .9, tm - .3), 10, '#C9A15A');
    stroke([[340, 540], [720, 300], [1100, 540]], seg(t, td - .8, td - .2), 10, '#C9A15A');
    stroke([[1100, 540], [1320, 420], [1540, 560]], seg(t, ty - .9, ty - .3), 10, '#C9A15A');
    tree.forEach(([x, y, s, t0], i) => bookHouse(x, y, i === 3 ? 260 : 200, 220, s, seg(t, t0, t0 + .7)));
    // Clawd checks the last sign with a magnifier, then shrugs
    const mag = seg(t, tc - .6, tc), shrug = t > tc + .4;
    clawd(lerp(1780, 1720, mag), 860, 10, { ...emotions(t, [[a, 'neutral'], [ty, 'thinking'], [tc + .4, 'confused']]), view: 'q', flip: true, aR: shrug ? 0 : 1.4, armR: shrug ? undefined : (u, sw) => { boilSeed('c6mg'); inkLine([[0, 0], [u * 1.4, 0]], sw * 1.4, '#7A5B3E', 'ink', 0); paint(ellPts(u * 2.6, 0, u * 1.2, u * 1.2, 16), { wash: '#BFE0F0', ink: PAL.ink, sw }); }, boilKey: 'c6c2' });
    if (t > tc - .3) { hand('no "iy" here!', 1540, 480, 44, PAL.berry, seg(t, tc - .3, tc + .4), { stroke: PAL.cream, strokeW: .1 }); }
    camEnd();
    hand('it happens in language too', 960, 150, 56, PAL.cream, seg(t, a, a + 1) * (1 - seg(t, tm + 1, tm + 1.5)), { stroke: PAL.ink, strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  // 7 · two quick vignettes: geology → Cesium; enemies → a Russian poem
  function geology(t, lt, dur) {
    const a = cs('gr_geology'), e = ce('gr_geology'), tce = wt('gr_geology', 'Cesium'), ten = wt('gr_geology', 'enemy'), tp = wt('gr_geology', 'poem'), tw = wt('gr_geology', 'Weird');
    harbour(t);
    camKeys(t, [[a - .3, 640, 640, 1.4], [ten - .3, 1500, 640, 1.4], [tw, 1060, 620, 1.05]], .4);
    // the geology building: rocky, with a crater roof; its annex is full of code screens
    boilSeed('c6geo'); paint([[300, 860], [300, 560], [360, 520], [460, 540], [540, 500], [620, 540], [620, 860]], { grad: [[0, '#A88A6A'], [1, '#6A5A4A']], ink: PAL.ink, sw: 1.3, curv: .3 });
    paint(ellPts(460, 600, 70, 26, 18), { wash: '#5A4A3E', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 9; i++) paint(ellPts(330 + hash(i) * 260, 640 + hash(i * 3) * 190, 12 + 10 * hash(i * 5), 8 + 6 * hash(i), 10), { wash: '#8C7A64', ink: PAL.ink, sw: .5 });
    letter('geology', 460, 900, 40, PAL.cream, { face: 'hand', shadow: false });
    const ck = seg(t, tce - .8, tce + .3);
    stroke([[620, 700], [700, 640], [780, 620]], ck, 10, '#C9A15A');
    if (ck > .5) { boilSeed('c6code'); paint(rrPts(780, 520, 220, 170, 10), { wash: '#1E2A3A', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 6; i++) inkLine([[800 + (i % 3) * 14, 548 + i * 22], [800 + 60 + hash(i) * 110, 548 + i * 22]], 3, ['#9FE3C8', '#FFD36B', '#8EC3E6'][i % 3], 'ink', 0); paint(ellPts(950, 660, 22, 22, 16), { wash: '#4F7FB8', ink: PAL.ink, sw: .8 }); letter('Cesium: code for maps of the earth', 890, 740, 34, PAL.cream, { face: 'hand', shadow: false, reveal: seg(ck, .5, 1) }); }
    // the enemy building: a dark fortress; its annex holds a book of Russian poetry
    boilSeed('c6en'); paint(rectPts(1180, 540, 260, 320, 1), { grad: [[0, '#5A3A4A'], [1, '#3A2230']], ink: PAL.ink, sw: 1.3 });
    for (let i = 0; i < 5; i++) paint(rectPts(1180 + i * 56, 510, 36, 34, 1), { wash: '#5A3A4A', ink: PAL.ink, sw: 1 });
    letter('enemy', 1310, 900, 40, PAL.cream, { face: 'hand', shadow: false });
    const pk = seg(t, tp - .8, tp + .3);
    stroke([[1440, 700], [1520, 640], [1600, 620]], pk, 10, '#C9A15A');
    if (pk > .5) { boilSeed('c6book'); paint([[1600, 520], [1720, 540], [1840, 520], [1840, 690], [1720, 710], [1600, 690]], { wash: '#F3E2BE', ink: PAL.ink, sw: 1.2 }); inkLine([[1720, 540], [1720, 710]], 1.4, PAL.ink, 'ink', 0); for (let i = 0; i < 5; i++) { inkLine([[1616, 560 + i * 24], [1700, 562 + i * 24]], 1.4, '#6A4A4A', 'dry', .8); inkLine([[1740, 562 + i * 24], [1824, 560 + i * 24]], 1.4, '#6A4A4A', 'dry', .8); } letter('a Russian poem about enemies', 1720, 750, 34, PAL.cream, { face: 'hand', shadow: false, reveal: seg(pk, .5, 1) }); }
    camEnd();
    const kw = seg(t, tw - .2, tw + .8);
    if (kw > 0) title('weird, but never random', 960, 150, 80, '#FFD36B', kw, { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  globalThis.bookHouse = bookHouse; globalThis.harbour = harbour;
  shots([[chapStart('ch06'), growth], [cs('gr_compare') - .3, compare], [cs('gr_name') - .3, name], [cs('gr_iy') - .3, iy], [cs('gr_geology') - .3, geology]]);
})();
