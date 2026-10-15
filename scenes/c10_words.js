// ch10 The city of words: arrival by boat; the town square of 100 neurons (2023 → today); the preeclampsia hub and
// its breaker; Santa in the basements; the wallet route; the plumbing (− × − = +); the experts' gate; the river
// (residual stream) and the couriers (attention); the "don't end the sentence yet" neuron.
(() => {
  const all = ['cw_arrive', 'cw_numbers', 'cw_medical', 'cw_santa', 'cw_wallet', 'cw_double', 'cw_experts', 'cw_river', 'cw_couriers', 'cw_dot'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };
  const along = (P, u) => { const C = through(P, 10), j = clamp(u) * (C.length - 1), i = Math.floor(j), f = j - i; const a = C[i], b = C[Math.min(C.length - 1, i + 1)]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; };
  function sign(x, y, txt, k = 1, o = {}) { if (k <= 0) return; const w = Math.max(120, txt.length * (o.size || 34) * .55 + 40), h = (o.size || 34) * 1.6; push(); translate(x, y); scale(backOut(k)); boilSeed('sg' + txt); paint(rrPts(-w / 2, -h / 2, w, h, 10), { wash: o.col || PAL.cream, ink: PAL.ink, sw: 1.1 }); pop(); if (k > .5) letter(txt, x, y + 2, o.size || 34, o.tcol || PAL.ink, { face: o.face || 'hand', shadow: false }); }
  function boat(x, y, s, t) { boilSeed('boat'); push(); translate(x, y + 6 * Math.sin(t * 1.6)); rotate(.03 * Math.sin(t * 1.3)); scale(s); paint([[-200, -40], [200, -40], [160, 30], [-170, 30]], { wash: '#8C5A3A', ink: PAL.ink, sw: 1.4 }); inkLine([[0, -40], [0, -340]], 6, '#6A4B30', 'ink', 0); paint([[6, -330], [170, -80], [6, -70]], { wash: PAL.cream, ink: PAL.ink, sw: 1.2 }); pop(); }
  function langCity(t, o = {}) { harbour(t); const W8 = ['the', 'once', 'said', 'because', 'and', 'river', 'why', 'if']; W8.forEach((s, i) => bookHouse(200 + i * 240, 860, 170 + 30 * (i % 2), 180 + 70 * ((i * 3) % 4), s, 1, { on: .6 })); }

  // 1 · arrival by boat
  function arrive(t, lt, dur) {
    const a = cs('cw_arrive'), e = ce('cw_arrive');
    harbour(t);
    camKeys(t, [[a - .3, 700, 560, 1.15], [e + .5, 1100, 520, .95]], .3);
    ['the', 'once', 'said', 'because', 'river'].forEach((s, i) => bookHouse(1000 + i * 230, 860, 180, 200 + 80 * (i % 3), s, popk(t, a + .5 + i * .3, .6)));
    const bx = lerp(-200, 700, easeOut(seg(t, a, e + .5)));
    boat(bx, 960, .9, t);
    prof(bx + 40, 930, .45, { view: 'q', pose: gesture(t, [[a, 'rest'], [a + 1.5, 'point']]), mood: 'happy', look: [.9, -.4], talk: talk(t), noShadow: true });
    clawd(bx - 110, 935, 7, { ...feel('excited', t), view: 'q', boilKey: 'c10c' });
    camEnd();
    title('the city of words', 960, 150, 84, PAL.cream, seg(t, a + .4, a + 1.6), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    chapterSign(t, t - chapStart('ch10'), cs('cw_arrive') - chapStart('ch10') + 3.2, '10', 'The city of words');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // 2 · the town square: 100 neuron-people, grey and puzzled in 2023; today 90 / 7 / 3
  const COLS = [PAL.berry, PAL.teal, PAL.ochre, PAL.violet, '#3A64B8', PAL.sap, '#D9679F', '#E26B3A'];
  function numbers(t, lt, dur) {
    const a = cs('cw_numbers'), e = ce('cw_numbers'), tm = wt('cw_numbers', 'modern'), t90 = wt('cw_numbers', 'ninety'), t7 = wt('cw_numbers', 'Seven'), t3 = wt('cw_numbers', 'understand');
    sky(t, [[0, '#9CC9E6'], [1, '#F4D9B5']], { clouds: 5, cloudY: 200, cloudCol: '#FFFFFF' });
    boilSeed('c10sq'); paint(rectPts(-200, 420, W + 400, 700, 1), { grad: [[0, '#D9C29A'], [1, '#B9A27A']], ink: PAL.ink, sw: 1 });
    camKeys(t, [[a - .3, 960, 600, 1], [e, 960, 600, 1]], 0);
    const turn = seg(t, tm - .2, tm + 1.6);
    for (let i = 0; i < 100; i++) {
      const c = i % 20, r = Math.floor(i / 20), x = 130 + c * 88 + (r % 2) * 40, y = 640 + r * 96;
      const fl = clamp(turn * 1.6 - hash(i * 3.1) * .6);
      const kind = i < 90 ? 0 : i < 97 ? 1 : 2;   // one job / two related / not yet understood
      const lit = kind === 0 ? fl * seg(t, t90 - .5, t90 + .5) * 0 + fl : kind === 1 ? fl * seg(t, t7 - .6, t7 + .2) : 0;
      const col = lit > .5 ? COLS[i % 8] : '#9A9AA8';
      person(x, y, .7, { col, key: 'c10p' + i, mood: lit > .5 ? 'happy' : 'neutral', hat: kind === 1 && lit > .5 ? 'cap' : undefined });
      if (kind === 1 && lit > .5) { boilSeed('c10b' + i); paint(rectPts(x - 14, y - 60, 28, 10, 0), { wash: COLS[(i + 3) % 8], ink: null }); }
      if (lit <= .5) { const q = t < tm ? 1 : kind === 2 ? 1 : 1 - fl; if (q > .05 && (i % 3 === 0 || kind === 2)) letter('?', x + 20, y - 110, 26, PAL.ink, { face: 'marker', shadow: false, alpha: q }); }
    }
    // the scoreboard
    boilSeed('c10sb'); paint(rectPts(360, 40, 1200, 470, 1.5), { wash: '#3A3550', ink: PAL.ink, sw: 1.5 }); inkLine([[500, 510], [500, 600]], 10, '#5A4A3E', 'ink', 0); inkLine([[1420, 510], [1420, 600]], 10, '#5A4A3E', 'ink', 0);
    const b = (txt, k, y, col) => { if (k > 0) sign(960, y, txt, k, { col, size: 54 }); };
    if (t < tm) { b('2023: almost none understandable', seg(t, a + .2, a + 1), 170, '#E9E4D6'); b('my OpenAI project: under 2%', seg(t, wt('cw_numbers', 'OpenAI') - .4, wt('cw_numbers', 'OpenAI') + .2), 320, '#E9E4D6'); }
    else { b('Qwen3-32B, today', on(t, tm), 110, PAL.cream); b('90%: one main job', seg(t, t90 - .4, t90 + .2), 210, '#BFE3A6'); b('7%: two related jobs', seg(t, t7 - .4, t7 + .2), 310, '#F3E2BE'); b('2-4%: not yet understood', seg(t, t3 - .6, t3), 410, '#D9D9E3'); }
    camEnd();
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#9CC9E6', '#D9C29A'] });
  }

  // 3 · the hospital district: symptoms → a four-building hub → preeclampsia; flip the breaker → "itching?"
  function medical(t, lt, dur) {
    const a = cs('cw_medical'), e = ce('cw_medical'), tp = wt('cw_medical', 'preeclampsia'), tsw = wt('cw_medical', 'Switch'), ti = wt('cw_medical', 'itching');
    harbour(t);
    camKeys(t, [[a - .3, 960, 560, 1], [tp, 1100, 560, 1.02], [e, 1100, 560, 1]], .3);
    const SYM = [[260, 420, 'headache'], [260, 640, 'high blood pressure'], [260, 860, 'pregnant']];
    const off = seg(t, tsw - .2, tsw + .4);
    SYM.forEach(([x, y, s], i) => { stroke([[x + 120, y - 40], [700, y * .5 + 260], [980, 560]], seg(t, a + 1 + i * .3, a + 2 + i * .3), 12, '#FFC766'); });
    SYM.forEach(([x, y, s], i) => { bookHouse(x, y, 160, 140, s, popk(t, a + .3 + i * .3, .5)); });
    // the hub: four small buildings
    for (let i = 0; i < 4; i++) { const hx = 960 + (i % 2) * 120, hy = 600 + Math.floor(i / 2) * 120; neuronHouse(hx, hy, 100, 110, { roof: 'peak', on: (1 - off) * on(t, a + 2.2), key: 'c10hub' + i, col: '#7A5A7A', awning: false }); }
    sign(1020, 380, 'preeclampsia', seg(t, tp - .5, tp + .2) * (1 - off * .5), { col: (off > .5 ? '#D9D9E3' : '#F3E2BE'), size: 40 });
    // after the breaker: the light reroutes to "itching?"
    stroke([[1100, 560], [1400, 500], [1660, 640]], seg(t, ti - .8, ti), 12, '#9FD0FF');
    bookHouse(1700, 860, 200, 220, 'itching?', popk(t, ti - .3, .5));
    // the breaker box
    boilSeed('c10brk'); paint(rrPts(1300, 760, 110, 150, 10), { wash: '#6E7891', ink: PAL.ink, sw: 1.2 }); inkLine([[1355, 835], [1355 + Math.sin(off * 2 - 1) * 40, 835 - Math.cos(off * 2 - 1) * 40]], 8, PAL.berry, 'ink', 0);
    clawd(1460, 860, 9, { ...emotions(t, [[a, 'neutral'], [tsw - .5, 'determined'], [ti, 'surprised']]), view: 'q', flip: true, aL: t > tsw - .5 && t < tsw + .5 ? 1.4 : undefined, boilKey: 'c10c2' });
    camEnd();
    if (t > tsw) hand('…as if it moved on to its next guess', 960, 150, 48, PAL.cream, seg(t, wt('cw_medical', 'next') - .3, wt('cw_medical', 'guess') + .4), { stroke: PAL.ink, strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  function santaHat(x, y, s) { boilSeed('sh'); paint([[x - 30 * s, y], [x + 30 * s, y], [x + 10 * s, y - 50 * s]], { wash: '#D2473F', ink: PAL.ink, sw: .8 }); paint(rectPts(x - 34 * s, y - 4 * s, 68 * s, 14 * s, 1), { wash: '#FFFFFF', ink: PAL.ink, sw: .6 }); paint(ellPts(x + 10 * s, y - 52 * s, 8 * s, 8 * s, 10), { wash: '#FFFFFF', ink: PAL.ink, sw: .6 }); }
  // 4 · Santa in the basements
  function santa(t, lt, dur) {
    const a = cs('cw_santa'), e = ce('cw_santa'), tr = wt('cw_santa', 'Remove'), t6 = wt('cw_santa', 'six'), t20 = wt('cw_santa', 'twenty'), tb = wt('cw_santa', 'barely');
    harbour(t);
    camKeys(t, [[a - .3, 560, 640, 1.35], [tr, 600, 620, 1.25], [t20 - .5, 960, 560, .95], [e, 960, 560, .95]], .3);
    const gone = seg(t, tr - .2, tr + .8) * (1 - seg(t, t20 - .8, t20 - .3));
    for (let i = 0; i < 8; i++) { const x = 130 + i * 112, kk = 1 - gone; if (kk <= .05) continue; push(); translate(x, 760); scale(1, kk); translate(-x, -760); boilSeed('c10s' + i); paint(rectPts(x - 44, 640, 88, 120, 1), { wash: '#5A5A7A', ink: PAL.ink, sw: .9 }); paint(rrPts(x - 44, 770, 88, 70, 8), { wash: '#1E3A66', ink: PAL.ink, sw: .9 }); glow(x, 805, 60, '#FF9A8A', .5); santaHat(x, 822, .6); pop(); }
    letter('8 neurons, Santa in the basement', 520, 560, 44, PAL.cream, { face: 'hand', shadow: false });
    // twenty tinsel buildings on the right
    const tk = seg(t, t20 - .6, t20 + .6);
    for (let i = 0; i < 20; i++) { const x = 1080 + (i % 10) * 82, y = 760 + Math.floor(i / 10) * -130, k = popk(t, t20 - .6 + i * .03, .4); if (k <= 0) continue; const off = seg(t, t20 + .4, t20 + 1.2); push(); translate(x, y); scale(1, backOut(k) * (1 - off * .9)); boilSeed('c10t' + (i % 5)); paint(rectPts(-34, -110, 68, 110, 1), { wash: '#4A6A5A', ink: PAL.ink, sw: .8 }); inkLine([[-30, -90], [-10, -80], [10, -92], [30, -82]], 2.4, ['#FFD36B', '#D2473F', '#9FE3C8'][i % 3], 'ink', .6); pop(); }
    if (tk > .5) letter('20 neurons, Christmas in the windows', 1450, 440, 44, PAL.cream, { face: 'hand', shadow: false });
    // the probability dial: "Santa"
    const p = t < tr ? .99 : t < t20 - .3 ? lerp(.99, .06, ease(seg(t, tr, t6 + .2))) : lerp(.06, .97, ease(seg(t, t20 - .3, t20))) ;
    sign(960, 240, 'chance of "Santa": ' + Math.round(p * 100) + '%', 1, { size: 70, col: p < .5 ? '#F2C9C9' : PAL.cream });
    if (t > tb - .3) hand('barely changes', 1450, 330, 44, PAL.berry, seg(t, tb - .3, tb + .5), { stroke: PAL.cream, strokeW: .1 });
    clawd(1800, 860, 9, { ...emotions(t, [[a, 'happy'], [tr, 'surprised'], [tb, 'thinking']]), view: 'q', flip: true, boilKey: 'c10c3' });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  // 5 · the wallet route through a giant night city
  function wallet(t, lt, dur) {
    const a = cs('cw_wallet'), e = ce('cw_wallet'), tw = wt('cw_wallet', 'wallet', 1), tl = wt('cw_wallet', 'lost'), th = wt('cw_wallet', 'honesty'), tr = wt('cw_wallet', 'return');
    sky(t, [[0, '#0A0E2A'], [1, '#2A2A5A']], { stars: 200, starH: 600 });
    const R = [[200, 840], [700, 700], [1200, 760], [1700, 560], [2300, 400]];
    const k = seg(t, tw - .5, tr + .5);
    const p = along(R, k);
    camKeys(t, [[a - .3, 960, 560, .7], [tw, p[0] + 200, 620, 1], [tr, 1900, 500, .95], [e, 1700, 520, .8]], .2);
    skyline('c10big1', -800, 3000, 700, { depth: .8, bh: 500, bw: 110, lit: .35, haze: '#4A4A8A' });
    skyline('c10big2', -800, 3000, 900, { depth: .4, bh: 400, bw: 130, lit: .4 });
    lightRoad(R, 30, k, { col: '#FFC766', pulses: 3, speed: .8 });
    sign(260, 740, 'a wallet · cash · an ID', on(t, tw - .5), { size: 50 });
    sign(1200, 660, 'lost property', on(t, tl - .4), { size: 50, col: '#E9E4D6' }); sign(1200, 560, 'honesty', on(t, th - .4), { size: 50, col: '#BFE3A6' });
    boilSeed('c10tow'); paint(rectPts(2240, 400, 140, 500, 1), { grad: [[0, '#6A6A9A'], [1, '#3A3A5A']], ink: PAL.ink, sw: 1.2 }); glow(2310, 380, 200, '#FFD36B', .7 * on(t, tr - .3)); sign(2310, 320, 'return it', on(t, tr - .3), { size: 64, col: '#FFE3A6' });
    glow(p[0], p[1], 50, '#FFF2C8', .9);
    camEnd();
    hand('a model with trillions of parameters', 960, 150, 50, PAL.cream, seg(t, a + .3, a + 1.5) * (1 - seg(t, tw, tw + .4)), { stroke: PAL.ink, strokeW: .14 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0A0E2A', '#2A2A5A'] });
  }

  // 6 · plumbing: two negative inputs multiply into a positive; a second meter separates the cases
  function double(t, lt, dur) {
    const a = cs('cw_double'), e = ce('cw_double'), tm = wt('cw_double', 'multiply'), tb = wt('cw_double', 'negative'), ts = wt('cw_double', 'Separate');
    setStudy(t, { board: false, wall: '#D9D3C9' });
    camKeys(t, [[a - .3, 960, 560, 1], [e, 980, 560, 1.03]], .3);
    // two pipes join, pass a multiplier and feed a building
    boilSeed('c10pp'); paint(rectPts(160, 400, 600, 50, 1), { wash: '#8A93A8', ink: PAL.ink, sw: 1.2 }); paint(rectPts(160, 700, 600, 50, 1), { wash: '#8A93A8', ink: PAL.ink, sw: 1.2 }); paint([[760, 400], [900, 540], [900, 610], [760, 750], [760, 700], [850, 600], [850, 550], [760, 450]], { wash: '#8A93A8', ink: PAL.ink, sw: 1.2 }); paint(rectPts(900, 550, 400, 60, 1), { wash: '#8A93A8', ink: PAL.ink, sw: 1.2 });
    paint(ellPts(880, 575, 70, 70, 26), { wash: '#C9A15A', ink: PAL.ink, sw: 1.4 }); letter('×', 880, 578, 70, PAL.ink, { face: 'marker', shadow: false });
    const neg = seg(t, tb - .5, tb + .3);
    [[420, 425], [420, 725]].forEach(([x, y], i) => { boilSeed('c10v' + i); paint(ellPts(x, y - 70, 50, 50, 20), { wash: PAL.cream, ink: PAL.ink, sw: 1.2 }); letter(neg > .5 ? '−' : '+', x, y - 66, 60, neg > .5 ? '#2A4A8A' : '#2E6A2E', { face: 'marker', shadow: false }); inkLine([[x, y - 20], [x, y]], 6, PAL.ink, 'ink', 0); });
    const wrong = neg * (1 - seg(t, ts + .3, ts + 1.2));
    neuronHouse(1500, 820, 320, 380, { roof: 'peak', on: .15 + .8 * wrong, key: 'c10dh', col: '#5A5A8A', awning: false, glowCol: wrong > .5 ? '#FF9A8A' : '#FFC766' });
    if (wrong > .5) sfx('lit up… for the opposite!', 1500, 340, 40, PAL.berry, frac(t * .5));
    // the second meter that shows "− × −"
    const mk = popk(t, ts - .4, .6);
    if (mk > 0) { push(); translate(1150, 460); scale(backOut(mk)); boilSeed('c10mt'); paint(rrPts(-90, -60, 180, 120, 14), { wash: '#2A2340', ink: PAL.ink, sw: 1.2 }); pop(); letter('− × −', 1150, 462, 50 * mk, '#9FE3C8', { face: 'marker', shadow: false }); }
    clawd(1150, 860, 10, { ...emotions(t, [[a, 'neutral'], [tb, 'confused'], [ts, 'determined'], [ts + 1.2, 'proud']]), view: 'q', aR: mk > 0 && mk < 1 ? 1.5 : undefined, boilKey: 'c10c4' });
    camEnd();
    title('some of the mess was plumbing', 960, 140, 64, PAL.ink, seg(t, a + .2, a + 1.2), { stroke: PAL.cream, strokeW: .1 });
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // 7 · experts: a gatekeeper sorts word-travellers into specialist neighbourhoods; one is all dice and dragons
  function experts(t, lt, dur) {
    const a = cs('cw_experts'), e = ce('cw_experts'), tg = wt('cw_experts', 'gatekeeper'), tb = wt('cw_experts', 'bosses');
    harbour(t);
    camKeys(t, [[a - .3, 700, 560, .95], [tb - .5, 1300, 560, 1.05], [e, 1350, 560, 1.08]], .3);
    const HOODS = [[1300, 360, 'cooking'], [1300, 600, 'law'], [1300, 840, 'board-game bosses']];
    HOODS.forEach(([x, y, s], i) => { lightRoad([[520, 700], [900, y + 20], [x - 160, y + 20]], 16, 1, { col: '#C9B48E', pulses: 0 }); });
    // the gate
    boilSeed('c10gt'); paint(rectPts(440, 560, 40, 160, 1), { wash: '#7A5B3E', ink: PAL.ink, sw: 1 }); paint(rectPts(560, 560, 40, 160, 1), { wash: '#7A5B3E', ink: PAL.ink, sw: 1 }); paint(rectPts(430, 520, 180, 50, 1), { wash: '#9C4A35', ink: PAL.ink, sw: 1.1 }); letter('router', 520, 548, 30, PAL.cream, { face: 'marker', shadow: false });
    // travellers: little word cards flowing through the gate into one of three neighbourhoods
    for (let i = 0; i < 12; i++) { const ph = frac((t - a) * .12 + i / 12), h = i % 3, P = ph < .4 ? [lerp(-100, 520, ph / .4), 700] : along([[520, 700], [900, HOODS[h][1] + 20], [HOODS[h][0] - 160, HOODS[h][1] + 20]], (ph - .4) / .6); boilSeed('c10tr' + (i % 4)); paint(rrPts(P[0] - 34, P[1] - 30, 68, 30, 6), { wash: ['#F3E2BE', '#E5E9F2', '#F2E0E4'][h], ink: PAL.ink, sw: .6 }); letter(['stir', 'appeal', 'dragon'][h], P[0], P[1] - 15, 20, PAL.ink, { face: 'hand', shadow: false }); }
    // neighbourhoods
    HOODS.forEach(([x, y, s], i) => { for (let j = 0; j < 3; j++) { const hx = x + j * 120; boilSeed('c10hd' + i + j); paint(rectPts(hx - 46, y - 110, 92, 110, 1), { wash: ['#C9A26B', '#7A8AA8', '#7A4A6A'][i], ink: PAL.ink, sw: .9 }); paint([[hx - 52, y - 110], [hx, y - 150], [hx + 52, y - 110]], { wash: '#5A3A3A', ink: PAL.ink, sw: .8 }); }
      sign(x + 120, y + 50, s, 1, { size: 30 });
      if (i === 2) { const dk = on(t, tb - .5); for (let j = 0; j < 3; j++) { const hx = x + j * 120; push(); translate(hx, y - 60); rotate(t * (j % 2 ? 1 : -1)); boilSeed('dice'); paint(rrPts(-16, -16, 32, 32, 6), { wash: PAL.cream, ink: PAL.ink, sw: .8 }); paint(ellPts(0, 0, 4, 4, 8), { wash: PAL.ink, ink: null }); pop(); glow(hx, y - 60, 60, '#FF9A8A', .4 * dk); } boilSeed('drg'); paint([[x + 360, y - 60], [x + 420, y - 120], [x + 460, y - 70], [x + 520, y - 110], [x + 500, y - 30], [x + 380, y - 20]], { wash: PAL.sap, ink: PAL.ink, sw: 1, curv: .4 }); paint(ellPts(x + 500, y - 90, 6, 6, 8), { wash: PAL.ink, ink: null }); }
    });
    camEnd();
    title('experts', 520, 150, 80, PAL.cream, seg(t, wt('cw_experts', 'experts') - .3, wt('cw_experts', 'experts') + .6), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#1E3A66', '#0E1A36']);
  }

  // 8 · the river (residual stream): buildings dip buckets in and pour light out; a dam makes it choppier, never knotted
  function river(t, lt, dur) {
    const a = cs('cw_river'), e = ce('cw_river'), tr = wt('cw_river', 'residual'), ts = wt('cw_river', 'squeezed'), tn = wt('cw_river', 'knotted');
    sky(t, [[0, '#0E1236'], [1, '#2A3A6A']], { stars: 120, starH: 400 });
    camKeys(t, [[a - .3, 960, 560, 1], [ts, 1100, 600, 1.05], [e, 1100, 600, 1.05]], .3);
    boilSeed('c10bk'); paint(rectPts(-300, 420, W + 600, 700, 1), { grad: [[0, '#3A3660'], [1, '#22203E']], ink: null });
    const dam = seg(t, ts - .5, ts + .8), narrow = x => 1 - .55 * dam * clamp(1 - Math.abs(x - 1250) / 500) * (x > 1250 ? 1 : .4);
    const Ptop = [], Pbot = [];
    for (let i = 0; i <= 40; i++) { const x = -200 + i * 60, w = 90 * narrow(x), y = 760 + 30 * Math.sin(x * .004); Ptop.push([x, y - w]); Pbot.push([x, y + w]); }
    paint(Ptop.concat(Pbot.reverse()), { grad: [[0, '#5FA8D8'], [1, '#2E5A9A']], gdir: [0, 660, 0, 860], ink: PAL.ink, sw: 1.2 });
    // the light flowing downstream; choppier where the dam narrows it
    for (let i = 0; i < 40; i++) { const x = -200 + frac((t - a) * .08 + i / 40) * (W + 400), w = 90 * narrow(x), chop = (1 - narrow(x)) * 2, y = 760 + 30 * Math.sin(x * .004) + (hash(i) - .5) * w * 1.4 + chop * 14 * Math.sin(t * 8 + i); glow(x, y, 20, '#BFE6FF', .8); inkLine([[x - 20, y], [x + 20, y]], 2, '#E5F4FF', 'ink', .4); }
    if (dam > 0) { boilSeed('c10dam'); paint(rectPts(1230, 620, 40, 70 * dam, 1), { wash: '#8C7A64', ink: PAL.ink, sw: 1 }); paint(rectPts(1230, 900 - 70 * dam, 40, 70 * dam, 1), { wash: '#8C7A64', ink: PAL.ink, sw: 1 }); }
    // buildings on both banks dip buckets in and pour light out
    for (let i = 0; i < 6; i++) { const x = 150 + i * 330, top = i % 2 === 0, by = top ? 640 : 1000; bookHouse(x, top ? 620 : 1080, 150, 170, ['read', 'write', 'read', 'write', 'read', 'write'][i], 1, { on: .5 }); const ph = frac(t * .4 + i * .3); boilSeed('c10bu' + i); const bx = x + 90, byy = lerp(top ? 640 : 900, top ? 720 : 820, Math.sin(ph * Math.PI)); inkLine([[x + 40, top ? 520 : 940], [bx, byy - 30]], 1.6, PAL.ink, 'inkfine', 0); paint([[bx - 16, byy - 30], [bx + 16, byy - 30], [bx + 12, byy], [bx - 12, byy]], { wash: '#C9A15A', ink: PAL.ink, sw: .7 }); if (i % 2) glow(bx, byy - 15, 30, '#FFD58A', .6); }
    camEnd();
    const kt = seg(t, tr - .3, tr + .7);
    if (kt > 0) title('the residual stream', 960, 140, 80, '#BFE6FF', kt * (1 - seg(t, ts - .8, ts - .4)), { stroke: '#1B1F4A', strokeW: .14 });
    if (t > ts - .4) title('narrower: messier, never knotted', 960, 140, 64, PAL.cream, seg(t, ts - .4, tn + .3), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'none', out: 'none' });
    if (lt < .4) fade(1 - ease(lt / .4), '#0E1A36');
  }

  // a bicycle courier with a glowing note
  function courier(x, y, s, note, t, col = PAL.teal) { push(); translate(x, y); scale(s); boilSeed('cr' + note); for (const wx of [-40, 40]) { inkStroke(ellPts(wx, -26, 26, 26, 18), true, 2.4, PAL.ink, 'ink'); const q = t * 8; inkLine([[wx, -26], [wx + Math.cos(q) * 24, -26 + Math.sin(q) * 24]], 1, PAL.ink, 'inkfine', 0); } inkLine([[-40, -26], [0, -60], [40, -26], [-6, -26], [0, -60]], 3, col, 'ink', 0); pop(); person(x - 4 * s, y - 50 * s, .55 * s, { col, key: 'cr' + note, hat: 'post' }); sign(x + 30 * s, y - 210 * s, note, 1, { size: 26 * s, col: '#FFF2C8' }); glow(x + 30 * s, y - 210 * s, 70 * s, '#FFD58A', .6); }
  // 9 · couriers (attention) carry notes to the diagnosis hub
  function couriers(t, lt, dur) {
    const a = cs('cw_couriers'), e = ce('cw_couriers'), tat = wt('cw_couriers', 'attention'), tm = wt('cw_couriers', 'medical');
    langCity(t);
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 560, 1]], 0);
    neuronHouse(1640, 860, 260, 320, { roof: 'peak', on: .3 + .6 * seg(t, e - 2, e - .5), key: 'c10dx', col: '#7A5A7A', awning: false, sign: 'diagnosis' });
    const N = [['headache', 0], ['swelling', .8], ['blood pressure', 1.6]];
    N.forEach(([n, d], i) => { const k = ease(seg(t, (tm || a + 2) - 1 + d, (tm || a + 2) + 2.5 + d)); courier(lerp(-150 + i * 260, 1400 - i * 60, k), 1010, 1.7, n, t + i, [PAL.teal, PAL.berry, PAL.ochre][i]); });
    camEnd();
    title('attention: the courier service', 960, 140, 70, PAL.cream, seg(t, tat - .3, tat + .8), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  // fake Hangul blocks
  function hangul(x, y, s) { boilSeed('hg' + x); for (let i = 0; i < 3; i++) { const cx = x + i * 40 * s; inkLine([[cx, y - 14 * s], [cx + 22 * s, y - 14 * s]], 2.4, PAL.ink, 'ink', 0); inkLine([[cx + 10 * s, y - 14 * s], [cx + 10 * s, y + 4 * s]], 2.4, PAL.ink, 'ink', 0); inkStroke(ellPts(cx + 11 * s, y + 14 * s, 9 * s, 7 * s, 12), true, 2, PAL.ink, 'ink'); } }
  // 10 · the "don't end the sentence yet" neuron
  function dot(t, lt, dur) {
    const a = cs('cw_dot'), e = ce('cw_dot'), tj = wt('cw_dot', 'stop'), tr = wt('cw_dot', 'Remove'), ts = wt('cw_dot', 'sooner');
    harbour(t);
    camKeys(t, [[a - .3, 960, 540, 1], [tj, 960, 520, 1.05], [e, 960, 540, 1]], .3);
    boilSeed('c10dbh'); paint(rectPts(460, 220, 1000, 640, 1.5), { grad: [[0, '#5A4A7A'], [1, '#3A2E55']], ink: PAL.ink, sw: 1.5 });
    const WN = [[560, 280, 'cite'], [980, 280, 'talk'], [560, 560, 'url'], [980, 560, 'kr']];
    const pulled = seg(t, tr - .2, tr + .4);
    WN.forEach(([x, y, k], i) => {
      const pk = popk(t, a + .4 + i * .5, .5); if (pk <= 0) return;
      boilSeed('c10dw' + i); paint(rectPts(x, y, 380, 240, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.2 });
      if (k === 'cite') letter('as shown in [12, 14', x + 190, y + 120, 40, PAL.ink, { face: 'hand', shadow: false });
      if (k === 'talk') letter('"Well," she said', x + 190, y + 120, 40, PAL.ink, { face: 'hand', shadow: false });
      if (k === 'url') letter('GET /api/v2', x + 190, y + 120, 40, PAL.ink, { face: 'hand', shadow: false });
      if (k === 'kr') hangul(x + 130, y + 120, 1.6);
      // the dot that shouldn't come yet, with a "no" sign; after the plug is pulled, dots rain onto the text
      const dx = x + 340, dy = y + 140;
      if (pulled < .5) { paint(ellPts(dx, dy, 10, 10, 10), { wash: PAL.ink, ink: null }); inkStroke(ellPts(dx, dy, 28, 28, 18), true, 3, PAL.berry, 'ink'); inkLine([[dx - 20, dy + 20], [dx + 20, dy - 20]], 3, PAL.berry, 'ink', 0); }
      else for (let j = 0; j < 4; j++) { const fy = y + 40 + ((t * 300 + j * 60 + i * 40) % 200); paint(ellPts(x + 60 + j * 80, fy, 9, 9, 10), { wash: PAL.ink, ink: null }); }
    });
    letter("don't end the sentence yet", 960, 920, 50, PAL.cream, { face: 'marker', shadow: false, reveal: seg(t, tj - .3, tj + .8) });
    // the plug
    boilSeed('c10plg'); inkLine([[1460, 700], [1600, 760], [1700 + 60 * pulled, 900]], 5, PAL.ink, 'ink', .4); paint(rrPts(1680 + 60 * pulled, 880, 50, 40, 8), { wash: '#C9A15A', ink: PAL.ink, sw: 1 });
    clawd(1780 + 60 * pulled, 900, 9, { ...emotions(t, [[a, 'neutral'], [tr, 'determined'], [ts, 'laugh']]), view: 'q', flip: true, aL: t > tr - .3 && t < tr + .6 ? 1.2 : undefined, boilKey: 'c10c5' });
    camEnd();
    if (t > ts - .4) title('periods come sooner', 960, 140, 64, '#FFD36B', seg(t, ts - .4, ts + .4), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch10'), arrive], [cs('cw_numbers') - .3, numbers], [cs('cw_medical') - .3, medical], [cs('cw_santa') - .3, santa], [cs('cw_wallet') - .3, wallet], [cs('cw_double') - .3, double], [cs('cw_experts') - .3, experts], [cs('cw_river') - .3, river], [cs('cw_couriers') - .3, couriers], [cs('cw_dot') - .3, dot]]);
})();
