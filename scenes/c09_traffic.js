// ch09 Traffic, votes and whispers: neurons as traffic control (a gate that sends cars one way and dogs the other);
// one sports car's journey; every neuron is a vote (windows vs basement); near-twins in the basement; the whispers
// of a hundred million words; muting them; thinking in pages; the Titanic and its analogies.
(() => {
  const CP = 'blog/raw/car-path-distinctions/', NP = 'blog/raw/negative-poles-v2/';
  const all = ['tv_gate', 'tv_gate2', 'tv_journey', 'tv_votes', 'tv_pairs', 'tv_weak', 'tv_cut', 'tv_pages', 'tv_titanic'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };
  // little traffic: a car or a dog, facing right, s = scale
  function miniCar(x, y, s, col = PAL.berry) { boilSeed('mc' + col); push(); translate(x, y); scale(s); paint(rrPts(-30, -22, 60, 16, 6), { wash: col, ink: PAL.ink, sw: .8 }); paint([[-18, -22], [-10, -34], [14, -34], [20, -22]], { wash: mixCol(col, '#FFFFFF', .35), ink: PAL.ink, sw: .8 }); paint(ellPts(-16, -5, 7, 7, 10), { wash: PAL.ink, ink: null }); paint(ellPts(16, -5, 7, 7, 10), { wash: PAL.ink, ink: null }); pop(); glow(x + 30 * s, y - 14 * s, 26 * s, '#FFF2C8', .6); }
  function miniDog(x, y, s, col = '#C9A26B', t = 0) { boilSeed('md' + col); const b = Math.sin(t * 14) * 3; push(); translate(x, y); scale(s); paint(ellPts(0, -18 + b * .3, 24, 12, 14), { wash: col, ink: PAL.ink, sw: .8 }); paint(ellPts(24, -30 + b * .3, 11, 10, 12), { wash: col, ink: PAL.ink, sw: .8 }); paint([[28, -40], [34, -48], [36, -36]], { wash: mixCol(col, '#000000', .25), ink: PAL.ink, sw: .5 }); for (const lx of [-14, 12]) inkLine([[lx, -10], [lx + b, 0]], 3, PAL.ink, 'ink', 0); inkLine([[-22, -22], [-32, -32 + b]], 2.4, PAL.ink, 'ink', .5); pop(); }
  // a point along a polyline at fraction u
  const along = (P, u) => { const C = through(P, 10), j = clamp(u) * (C.length - 1), i = Math.floor(j), f = j - i; const a = C[i], b = C[Math.min(C.length - 1, i + 1)]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; };
  function night(t) { sky(t, [[0, '#0E1236'], [.6, '#2A2A60'], [1, '#5A4A7A']], { stars: 140, starH: 360 }); skyline('c9far', -800, 3200, 420, { depth: .85, bh: 220, bw: 80, lit: .25, haze: '#6A5A8A' }); fog(420, 60, '#6A5A8A', .4); boilSeed('c9gr'); paint(rectPts(-800, 400, W + 2400, 1200, 1), { grad: [[0, '#34305E'], [1, '#16142C']], gdir: [0, 400, 0, 1100], ink: null, tex: .5 }); for (let i = 0; i < 30; i++) { const x = -700 + i * 130, y = 460 + (i % 5) * 120 + 40 * hash(i); boilSeed('c9blk' + (i % 6)); paint(rectPts(x, y, 70, 34, 1), { wash: '#2A2650', ink: null }); paint(rectPts(x + 10, y + 10, 10, 8, 0), { wash: '#FFD58A', washOp: 120, ink: null }); } }

  // 1 · traffic control: a shared road, a gate, then finer splits (taxis vs ambulances)
  function gate(t, lt, dur) {
    const a = cs('tv_gate'), g2 = cs('tv_gate2'), e = ce('tv_gate2'), tg = wt('tv_gate2', 'gate'), tf = wt('tv_gate2', 'finer');
    night(t);
    camKeys(t, [[a - .3, 700, 640, .9], [g2, 800, 640, .95], [tg, 960, 640, 1], [tf, 1300, 560, 1.05], [e, 1350, 560, 1]], .3);
    const IN = [[-300, 700], [860, 700]], UP = [[860, 700], [1200, 520], [1560, 460]], DN = [[860, 700], [1200, 900], [2200, 980]], TAXI = [[1560, 460], [1800, 340], [2200, 300]], AMB = [[1560, 460], [1800, 560], [2200, 620]];
    const gk = seg(t, tg - .6, tg + .4), fk = seg(t, tf - .6, tf + .4);
    lightRoad(IN, 70, 1, { col: '#C9B48E', pulses: 0 });
    lightRoad(UP, 50, gk, { col: '#FFC766', pulses: 0 }); lightRoad(DN, 50, gk, { col: '#C9A26B', pulses: 0 });
    lightRoad(TAXI, 32, fk, { col: '#FFD36B', pulses: 0 }); lightRoad(AMB, 32, fk, { col: '#F07A6A', pulses: 0 });
    neuronHouse(860, 600, 160, 200, { roof: 'peak', on: .5 + .4 * gk * Math.abs(Math.sin(t * 3)), imgs: [CP + 'car-5826'], cols: 1, key: 'c9gate', col: '#4A5A7A', sign: 'gate', awning: false, k: on(t, tg - 1) });
    neuronHouse(1600, 360, 140, 170, { roof: 'flat', on: .7, imgs: [NP + 'taxis-positive-1'], cols: 1, key: 'c9tx', col: '#7A6A3A', awning: false, k: popk(t, tf - .3, .5) });
    neuronHouse(1600, 600, 140, 170, { roof: 'flat', on: .7, imgs: [NP + 'taxis-negative-1'], cols: 1, key: 'c9am', col: '#7A3A3A', awning: false, k: popk(t, tf - .1, .5) });
    // traffic: 14 travellers, half cars, half dogs; before the gate they travel together, after it they split
    for (let i = 0; i < 14; i++) {
      const isCar = i % 2 === 0, ph = frac((t - a) * .09 + i / 14);
      let P, s = 1.4;
      if (ph < .45 || gk <= 0) P = along(IN, Math.min(1, ph / .45));
      else { const u = (ph - .45) / .55; if (isCar) { if (fk > 0 && u > .45) P = along(i % 4 ? TAXI : AMB, (u - .45) / .55); else P = along(UP, Math.min(1, u / .45)); } else P = along(DN, u); }
      if (gk <= 0 && ph >= .45) continue;
      isCar ? miniCar(P[0], P[1] + (i % 3) * 10 - 10, s, i % 4 ? '#E8C23A' : '#F2F2F2') : miniDog(P[0], P[1] + (i % 3) * 10 - 10, s, ['#C9A26B', '#8C6A48', '#E8D3B0'][i % 3], t + i);
    }
    hand('cars and dogs travel together', 300, 560, 40, PAL.cream, seg(t, wt('tv_gate2', 'together') - .3, wt('tv_gate2', 'together') + .5), { stroke: PAL.ink, strokeW: .14 });
    if (gk > .5) { hand('cars', 1250, 420, 40, '#FFD36B', seg(gk, .5, 1), { stroke: PAL.ink, strokeW: .14 }); hand('dogs', 1300, 1000, 40, '#E8D3B0', seg(gk, .5, 1), { stroke: PAL.ink, strokeW: .14 }); }
    if (fk > .5) { hand('taxis', 2050, 250, 38, '#FFD36B', 1, { stroke: PAL.ink, strokeW: .14 }); hand('ambulances', 2050, 680, 38, '#F07A6A', 1, { stroke: PAL.ink, strokeW: .14 }); }
    camEnd();
    const kt = seg(t, wt('tv_gate', 'traffic') - .3, wt('tv_gate', 'control') + .5) * (1 - seg(t, g2 + 1, g2 + 1.5));
    if (kt > 0) title('less like labels, more like traffic control', 960, 150, 64, PAL.cream, kt, { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    chapterSign(t, t - chapStart('ch09'), cs('tv_gate') - chapStart('ch09') + 3, '9', 'Traffic, votes and whispers');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // 2 · one sports car's journey through the last districts
  function journey(t, lt, dur) {
    const a = cs('tv_journey'), e = ce('tv_journey'), tb = wt('tv_journey', 'boxy'), ts = wt('tv_journey', 'snakes'), tc = wt('tv_journey', 'convertible'), tw = wt('tv_journey', 'wagon');
    night(t);
    const carX = kf(t, [[a, -100], [tb - .5, 500], [ts, 1100], [tc - 1, 1800], [tc, 2150], [e + 1, 2200]]);
    camKeys(t, [[a - .3, 400, 640, 1], [tb, 600, 620, 1], [ts, 1100, 620, 1], [tc - .6, 1900, 600, 1], [e, 2250, 600, 1]], .3);
    lightRoad([[-400, 760], [2100, 760]], 60, 1, { col: '#C9B48E', pulses: 0 });
    lightRoad([[2100, 760], [2400, 620], [2800, 600]], 44, 1, { col: '#FFC766', pulses: 0 }); lightRoad([[2100, 760], [2400, 900], [2800, 920]], 44, 1, { col: '#8FC3FF', pulses: 0 });
    // the boxy-things building
    neuronHouse(560, 700, 260, 300, { roof: 'flat', on: .4 + .5 * clamp(1 - Math.abs(t - tb) / 1.5), imgs: [CP + 'stage2_block8-920-pos-1', CP + 'stage2_block8-920-pos-2', CP + 'stage2_block7-203-pos-1', CP + 'car-5826'], cols: 2, key: 'c9box', col: '#5A6A8A', awning: false });
    hand('boxy things: tables, cabinets, this car', 560, 300, 36, PAL.cream, seg(t, tb - .4, tb + .6), { stroke: PAL.ink, strokeW: .14 });
    // the not-snakes building: its basement holds a snake
    neuronHouse(1160, 700, 220, 260, { roof: 'peak', on: .5, imgs: [CP + 'car-5826', CP + 'stage3_block1-1455-pos-2'], cols: 2, key: 'c9ns', col: '#5A6A8A', awning: false });
    boilSeed('c9bs'); paint(rrPts(1060, 780, 200, 130, 10), { wash: '#1E3A66', ink: PAL.ink, sw: 1.1 }); glow(1160, 845, 120, '#6FB7FF', .4 * on(t, ts - .6)); const I = img(CP + 'stage2_block8-920-neg-1'); ctx.save(); ctx.globalAlpha = on(t, ts - .6); ctx.drawImage(I, 1100, 795, 120, 100); ctx.restore();
    hand('…and kept apart from snakes', 1160, 980, 36, '#9FD0FF', seg(t, ts - .5, ts + .5), { stroke: PAL.ink, strokeW: .14 });
    // the final fork: convertible or station wagon?
    neuronHouse(2600, 600, 200, 230, { roof: 'flat', on: .5 + .4 * on(t, tc - .3), imgs: [CP + 'stage3_block1-1455-pos-3', CP + 'stage3_block1-1455-pos-4'], cols: 2, key: 'c9cv', col: '#7A5A3A', sign: 'convertible', awning: false, k: popk(t, tc - .8, .5) });
    neuronHouse(2600, 920, 200, 230, { roof: 'flat', on: .5 + .4 * on(t, tw - .3), imgs: [CP + 'stage3_block0-609-neg-2', CP + 'stage3_block0-609-neg-3'], cols: 2, key: 'c9wg', col: '#3A5A7A', sign: 'station wagon', awning: false, k: popk(t, tw - .8, .5) });
    // the little red sports car
    const cy = carX > 2150 ? lerp(760, 680, seg(carX, 2150, 2200)) : 760;
    miniCar(carX, cy, 1.6, '#D2473F');
    camEnd();
    hand('follow one sports car', 960, 150, 52, PAL.cream, seg(t, a, a + 1) * (1 - seg(t, tb - 1, tb - .5)), { stroke: PAL.ink, strokeW: .14 });
    if (t > tc - .6) title('convertible or station wagon?', 960, 150, 64, '#FFD36B', seg(t, tc - .6, tw + .4), { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#24285A'] });
  }

  // 3 · every neuron decides by vote: ballots fly in; + lights the windows, − lights the basement
  function votes(t, lt, dur) {
    const a = cs('tv_votes'), e = ce('tv_votes'), tb = wt('tv_votes', 'basement'), td = wt('tv_votes', 'distinction');
    night(t);
    camKeys(t, [[a - .3, 960, 560, 1], [tb, 960, 640, 1.04], [e, 960, 600, 1]], .3);
    // roads converge from the left and right
    for (let i = 0; i < 6; i++) { const side = i < 3 ? -1 : 1, yy = 300 + (i % 3) * 260; lightRoad([[960 + side * 1100, yy], [960 + side * 500, yy * .6 + 240], [960 + side * 180, 560]], 18, 1, { col: '#C9B48E', pulses: 0 }); }
    // the building, cut away: windows above, basement below
    const cyc = frac((t - a) / 4), votesUp = Math.sin(Math.floor((t - a) / 4) * 2.3) > -.2;
    const result = seg(cyc, .7, .8) * (1 - seg(cyc, .95, 1));
    neuronHouse(960, 720, 360, 420, { roof: 'peak', on: votesUp ? .2 + .8 * result : .1, imgs: [NP + 'taxis-positive-1', NP + 'taxis-positive-2'], cols: 2, key: 'c9v', col: '#5A5A8A', awning: false });
    boilSeed('c9vb'); paint(rrPts(780, 740, 360, 200, 12), { wash: '#1E3A66', ink: PAL.ink, sw: 1.2 });
    const bOn = !votesUp ? result : 0; glow(960, 840, 220, '#6FB7FF', .7 * bOn);
    const J = img(NP + 'taxis-negative-1'); ctx.save(); ctx.globalAlpha = .35 + .65 * bOn; ctx.drawImage(J, 880, 760, 160, 160); ctx.restore();
    // the ballot box
    boilSeed('c9box'); paint(rectPts(900, 560, 120, 80, 1), { wash: '#C9A15A', ink: PAL.ink, sw: 1.2 }); paint(rectPts(930, 556, 60, 8, 0), { wash: PAL.ink, ink: null });
    let tally = 0;
    for (let i = 0; i < 12; i++) {
      const side = i % 2 ? 1 : -1, yy = 300 + (i % 3) * 260, plus = votesUp ? hash(i * 3 + Math.floor((t - a) / 4)) > .3 : hash(i * 3 + Math.floor((t - a) / 4)) > .7, f = clamp((cyc - i * .05) / .4);
      if (f <= 0 || f >= 1) { if (f >= 1) tally += plus ? 1 : -1; continue; }
      const p = along([[960 + side * 1100, yy], [960 + side * 500, yy * .6 + 240], [960, 540]], f);
      boilSeed('c9bal' + i); paint(rectPts(p[0] - 22, p[1] - 16, 44, 32, 1), { wash: plus ? '#BFE3A6' : '#A6C9F0', ink: PAL.ink, sw: .8 }); letter(plus ? '+' : '−', p[0], p[1], 28, plus ? '#2E6A2E' : '#2A4A8A', { face: 'marker', shadow: false });
    }
    letter((tally >= 0 ? '+' : '') + tally, 960, 470, 56, tally >= 0 ? '#9FE3A6' : '#9FD0FF', { face: 'marker', shadow: false });
    hand('light up', 1240, 360, 40, '#FFD36B', on(t, a + 1), { stroke: PAL.ink, strokeW: .14 }); hand('stay dark', 1260, 860, 40, '#9FD0FF', on(t, a + 1.4), { stroke: PAL.ink, strokeW: .14 });
    camEnd();
    const kv = seg(t, wt('tv_votes', 'vote') - .3, wt('tv_votes', 'vote') + .5) * (1 - seg(t, tb - .6, tb - .2));
    if (kv > 0) title('every neuron decides by vote', 960, 140, 72, PAL.cream, kv, { stroke: '#1B1F4A', strokeW: .12 });
    if (t > tb - .4) title('the basement matters as much as the windows', 960, 140, 60, '#9FD0FF', seg(t, tb - .4, tb + .6), { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#24285A'] });
  }

  // 4 · near-twins in the basement: taxis/ambulances, broccoli/cauliflower, spoonbills/flamingos
  function pairs(t, lt, dur) {
    const a = cs('tv_pairs'), e = ce('tv_pairs');
    night(t);
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 540, .98]], .3);
    boilSeed('c9pg'); paint(rectPts(-200, 620, W + 400, 30, 1), { wash: '#4A4470', ink: PAL.ink, sw: 1 });
    const P = [['taxis', 'Taxis', 'ambulances', wt('tv_pairs', 'Taxis')], ['broccoli', 'broccoli', 'cauliflower', wt('tv_pairs', 'Broccoli')], ['spoonbills', 'spoonbills', 'flamingos', wt('tv_pairs', 'Spoonbills')]];
    P.forEach(([k, pos, neg, tw], i) => {
      const x = 380 + i * 580, kk = popk(t, (tw || a + 1 + i) - .5, .6);
      neuronHouse(x, 620, 300, 340, { roof: 'peak', on: .7, imgs: [NP + k + '-positive-1', NP + k + '-positive-2'], cols: 2, key: 'c9p' + i, col: '#5A5A8A', awning: false, k: kk });
      if (kk <= 0) return;
      boilSeed('c9pb' + i); paint(rrPts(x - 150, 660, 300, 220, 12), { wash: '#1E3A66', ink: PAL.ink, sw: 1.2 }); glow(x, 770, 180, '#6FB7FF', .5 * kk);
      [1, 2].forEach((n, j) => { const I = img(NP + k + '-negative-' + n), s = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha = kk; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, x - 130 + j * 135, 690, 125, 125); ctx.restore(); });
      hand(pos.toLowerCase(), x, 220, 40, '#FFD36B', kk, { stroke: PAL.ink, strokeW: .14 }); hand('vs ' + neg, x, 930, 40, '#9FD0FF', kk, { stroke: PAL.ink, strokeW: .14 });
    });
    camEnd();
    title('a near-twin in the basement', 960, 110, 64, PAL.cream, on(t, a + .2), { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#24285A'] });
  }

  // 5 · the whispers: a crowd of words flows past; nearly all barely register; a rare one makes it shout. Then muting.
  function weak(t, lt, dur) {
    const a = cs('tv_weak'), c = cs('tv_cut'), e = ce('tv_cut'), t160 = wt('tv_weak', 'hundred', 1), tmute = wt('tv_cut', 'silence'), tie = wt('tv_cut', 'tie-breakers');
    night(t);
    camKeys(t, [[a - .3, 960, 560, 1], [c, 960, 560, 1], [tie, 1200, 560, 1.05], [e, 1200, 560, 1.05]], .3);
    boilSeed('c9st'); paint(rectPts(-200, 840, W + 400, 140, 1), { wash: '#3A3660', ink: PAL.ink, sw: 1 });
    const mute = ease(seg(t, tmute - .3, tmute + 1.2));
    // the crowd of words: little word-tokens walking past
    let blaze = 0;
    for (let i = 0; i < 40; i++) {
      const ph = frac((t - a) * .05 + i / 40), x = -200 + ph * (W + 400), y = 920 + (i % 3) * 40, big = hash(i * 13 + Math.floor((t - a) * .05 + i / 40)) > .965;
      const near = 1 - clamp(Math.abs(x - 960) / 240);
      if (big && near > .3) blaze = Math.max(blaze, near);
      boilSeed('c9wd' + (i % 6)); paint(rrPts(x - 50, y - 40, 100, 48, 10), { wash: big ? '#FFE3A6' : '#C9C3DA', ink: PAL.ink, sw: .7 }); letter(['the', 'and', 'of', 'cat', 'sea', 'run', 'blue', 'if'][i % 8], x, y - 16, 30, PAL.ink, { face: 'hand', shadow: false });
      if (!big && near > 0 && mute < 1) glow(960, 560, 90, '#FFD58A', .12 * near * (1 - mute));
    }
    neuronHouse(960, 840, 300, 380, { roof: 'peak', on: .15 + .85 * blaze, imgs: [NP + 'lighthouses-positive-1', NP + 'lighthouses-positive-2'], cols: 2, key: 'c9w', col: '#5A5A8A', awning: false });
    hand('100,000,000 words pass by', 400, 260, 44, PAL.cream, seg(t, wt('tv_weak', 'million') - .3, wt('tv_weak', 'million') + .6) * (1 - seg(t, c - .4, c)), { stroke: PAL.ink, strokeW: .14 });
    if (t160) hand('only ~160 make it shout', 1500, 260, 44, '#FFD36B', seg(t, t160 - .3, t160 + .6) * (1 - seg(t, c - .4, c)), { stroke: PAL.ink, strokeW: .14 });
    // the mute dial
    if (t > c - .3) {
      boilSeed('c9md'); paint(ellPts(380, 520, 120, 120, 30), { wash: '#C9A15A', ink: PAL.ink, sw: 1.4 }); paint(ellPts(380, 520, 92, 92, 26), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
      const ang = lerp(-2.2, 2.2, mute); inkLine([[380, 520], [380 + Math.cos(ang - Math.PI / 2) * 80, 520 + Math.sin(ang - Math.PI / 2) * 80]], 5, PAL.berry, 'ink', 0);
      letter('whispers', 380, 680, 40, PAL.cream, { face: 'hand', shadow: false });
      clawd(560, 860, 11, { ...emotions(t, [[c, 'determined'], [tmute + 1.2, 'proud']]), view: 'q', flip: true, aL: mute > 0 && mute < 1 ? 1.4 + .3 * Math.sin(t * 10) : undefined, boilKey: 'c9c' });
    }
    // a close call tips: husky vs wolf on a balance
    const tk = seg(t, tie - .8, tie + 1);
    if (tk > 0) {
      const tilt = -.25 * ease(seg(t, tie, tie + .8));
      push(); translate(1560, 500); scale(easeOut(clamp(tk * 2))); boilSeed('c9bal'); inkLine([[0, 0], [0, 220]], 6, '#6A4B30', 'ink', 0); rotate(tilt); inkLine([[-200, 0], [200, 0]], 6, '#6A4B30', 'ink', 0);
      [[-200, NP + 'wolves-negative-1', 'husky'], [200, NP + 'wolves-positive-1', 'wolf']].forEach(([bx, im, lab]) => { push(); translate(bx, 0); rotate(-tilt); inkLine([[0, 0], [0, 60]], 2, PAL.ink, 'inkfine', 0); const I = img(im), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -60, 60, 120, 120); letter(lab, 0, 210, 30, PAL.cream, { face: 'hand', shadow: false }); pop(); });
      pop();
    }
    camEnd();
    if (t > tmute) title('the city keeps running', 960, 140, 64, PAL.cream, seg(t, tmute + .5, tmute + 1.4) * (1 - seg(t, tie - 1, tie - .6)), { stroke: '#1B1F4A', strokeW: .12 });
    if (t > tie - .4) title('you lose only tiny tie-breakers', 960, 140, 60, '#FFD36B', seg(t, tie - .4, tie + .5), { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#24285A'] });
  }

  // 6 · thinking in pages: lights blink on the words where a neuron fires
  function pages(t, lt, dur) {
    const a = cs('tv_pages'), e = ce('tv_pages'), tf = wt('tv_pages', 'four'), tr = wt('tv_pages', 'rare'), td = wt('tv_pages', 'dozen');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 540, 1], [e, 960, 540, 1.04]], .3);
    const rare = t > td - 1;
    const flip = (t - a) * (rare ? 3 : .5), pg = Math.floor(flip);
    boilSeed('c9bk'); paint(rrPts(420, 200, 1080, 680, 14), { wash: '#8C5A3A', ink: PAL.ink, sw: 1.4 });
    paint(rectPts(450, 220, 500, 640, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: 1 }); paint(rectPts(970, 220, 500, 640, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: 1 });
    for (const px of [450, 970]) for (let r = 0; r < 20; r++) { const y = 260 + r * 30; inkLine([[px + 30, y], [px + 470 - 60 * hash(r + pg * 7 + px), y]], 2.2, '#9A9AB0', 'dry', 0); }
    // a page turning
    const fp = frac(flip); if (fp < .5) { const w = 500 * Math.cos(fp * Math.PI); paint(rectPts(970, 220, Math.max(2, w), 640, 1), { wash: '#F3EBDC', ink: PAL.ink, sw: .8 }); }
    // the firing words: ~4 per page (common neuron); one every 25 pages (rare neuron)
    const hits = rare ? (pg % 25 === 0 ? 1 : 0) : 4;
    for (let h = 0; h < hits; h++) { const side = hash(h + pg * 3) > .5 ? 970 : 450, r = Math.floor(hash(h * 7 + pg) * 20), x = side + 60 + hash(h * 5 + pg) * 360, y = 260 + r * 30; glow(x, y, 34, '#FFB13B', .9); paint(ellPts(x, y, 9, 9, 10), { wash: '#FFB13B', ink: null }); }
    letter('page ' + (pg + 1), 960, 920, 34, PAL.ink, { face: 'hand', shadow: false });
    camEnd();
    if (t > tf - .4) hand('1 word in 100 = about 4 times a page', 960, 110, 50, PAL.ink, seg(t, tf - .4, tf + .6) * (1 - seg(t, td - 1.2, td - .8)), { stroke: PAL.cream, strokeW: .1 });
    if (t > td - 1) hand('the really specific ones: once every few dozen pages', 960, 110, 48, PAL.berry, seg(t, td - 1, td + .2), { stroke: PAL.cream, strokeW: .1 });
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#1E3A66', '#0E1A36']);
  }

  // 7 · the Titanic neuron and its little analogies
  function titanic(t, lt, dur) {
    const a = cs('tv_titanic'), e = ce('tv_titanic'), tan = wt('tv_titanic', 'analogy');
    sky(t, [[0, '#0E1236'], [1, '#2A3A6A']], { stars: 160, starH: 600 });
    boilSeed('c9sea'); paint(rectPts(-300, 760, W + 600, 500, 1), { grad: [[0, '#1E3A66'], [1, '#0E1A36']], ink: null, tex: .6 });
    camKeys(t, [[a - .3, 960, 560, 1], [tan, 1000, 560, .98], [e, 1000, 560, .98]], .3);
    // the grand ship-building, brightly lit
    boilSeed('c9ti'); paint([[260, 760], [1240, 760], [1180, 880], [340, 880]], { grad: [[0, '#2A2A3A'], [1, '#141420']], ink: PAL.ink, sw: 1.5 });
    paint(rectPts(400, 620, 700, 140, 1), { wash: '#F3EBDC', ink: PAL.ink, sw: 1.2 }); paint(rectPts(480, 540, 540, 80, 1), { wash: '#F3EBDC', ink: PAL.ink, sw: 1.1 });
    for (let i = 0; i < 4; i++) { paint(rectPts(520 + i * 130, 400, 60, 140, 1), { wash: '#D9A23A', ink: PAL.ink, sw: 1 }); paint(rectPts(520 + i * 130, 400, 60, 24, 0), { wash: PAL.ink, ink: null }); }
    for (let i = 0; i < 18; i++) { const x = 420 + i * 37; glow(x, 690, 18, '#FFD58A', .8); paint(rectPts(x - 6, 680, 12, 16, 0), { wash: '#FFE3A6', ink: null }); }
    glow(750, 650, 520, '#FFD58A', .35);
    letter('TITANIC', 750, 820, 54, '#F3E2BE', { face: 'marker', shadow: false });
    // small analogies drifting nearby, each lit only faintly
    const AN = [[1420, 800, 'a ferry', .6], [1740, 700, 'a steamship', .9], [1580, 380, 'a cruise poster', 1.2]];
    AN.forEach(([x, y, lab, d], i) => {
      const k = popk(t, a + 2 + d, .6); if (k <= 0) return;
      const dim = .25 + .1 * Math.sin(t * 3 + i);
      push(); translate(x, y + 6 * Math.sin(t * 1.5 + i)); scale(backOut(k) * 1.4); boilSeed('c9an' + i);
      if (i < 2) { paint([[-120, 0], [120, 0], [100, 40], [-100, 40]], { wash: '#3A3A4A', ink: PAL.ink, sw: 1 }); paint(rectPts(-70, -50, 140, 50, 1), { wash: '#E9E4D6', ink: PAL.ink, sw: .9 }); if (i === 1) paint(rectPts(-20, -110, 40, 60, 1), { wash: '#B5533C', ink: PAL.ink, sw: .9 }); for (let w = 0; w < 5; w++) { glow(-50 + w * 25, -26, 10, '#FFD58A', dim * 2); } }
      else { paint(rectPts(-90, -120, 180, 240, 1), { wash: '#E9C98A', ink: PAL.ink, sw: 1 }); paint([[-60, 60], [60, 60], [44, 84], [-44, 84]], { wash: '#3A3A4A', ink: PAL.ink, sw: .8 }); paint(ellPts(0, -40, 40, 40, 16), { wash: '#F0A070', ink: null }); glow(0, 0, 90, '#FFD58A', dim); }
      pop();
      letter(lab, x, y + 120, 38, PAL.cream, { face: 'hand', shadow: false });
    });
    camEnd();
    const kt = seg(t, tan - .3, tan + .7);
    if (kt > 0) title('neurons are analogy machines', 960, 140, 72, '#FFD36B', kt, { stroke: '#1B1F4A', strokeW: .12 });
    if (t > tan + 1.5) hand('a bit Titanic-ish', 1580, 300, 44, PAL.cream, seg(t, wt('tv_titanic', 'Titanic-ish') - .4, wt('tv_titanic', 'Titanic-ish') + .5), { stroke: PAL.ink, strokeW: .14 });
    vignette(.45);
    edges(lt, dur, { in: 'none', out: 'none' });
    if (lt < .4) fade(1 - ease(lt / .4), '#0E1A36');
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch09'), gate], [cs('tv_journey') - .3, journey], [cs('tv_votes') - .3, votes], [cs('tv_pairs') - .3, pairs], [cs('tv_weak') - .3, weak], [cs('tv_pages') - .3, pages], [cs('tv_titanic') - .3, titanic]]);
})();
