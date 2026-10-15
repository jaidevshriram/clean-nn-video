// ch13 Zooming out: the city's own alphabet becomes readable; a village vs New York; looking for Brooklyn in Tokyo;
// better maps (the killer-whale decision: three routes); the lit building nobody noticed; the two kinds of mistake;
// a paper plane to my younger self; the crossword.
(() => {
  const V = 'blog/raw/v-figure-10x/', SL = 'blog/raw/sae-last-layer/img/';
  const all = ['zo_clean', 'zo_bigger', 'zo_tokyo', 'zo_maps', 'zo_deception', 'zo_asym', 'zo_advice', 'zo_crossword'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };
  // the city's own alphabet: little glyphs (deterministic squiggles) that can resolve into readable text
  function glyphs(x, y, n, s, col, seed, k = 0) { for (let i = 0; i < n; i++) { const gx = x + i * s * 1.1, r = j => hash(seed * 31 + i * 7 + j); boilSeed('gl' + seed + i); const P = [[gx + r(1) * s * .6, y - s * .4], [gx + r(2) * s, y - s * .1 + r(3) * s * .2], [gx + r(4) * s * .3, y + s * .3], [gx + s * .8, y + s * .4 * r(5)]]; inkLine(P, s * .1, rgba(col, 1 - k), 'ink', .5); if (r(6) > .5) paint(ellPts(gx + s * .5, y - s * .5, s * .08, s * .08, 8), { wash: rgba(col, 1 - k), ink: null }); } }
  function plaque(x, y, w, h, txt, gl, k, o = {}) { boilSeed('pq' + x); paint(rrPts(x - w / 2, y - h / 2, w, h, 12), { wash: o.col || '#2F4A42', ink: PAL.ink, sw: 1.3 }); glyphs(x - w / 2 + 40, y, gl, h * .4, '#F3E2BE', x, k); if (k > 0) letter(txt, x, y + 4, o.size || h * .42, '#F3E2BE', { face: 'marker', shadow: false, alpha: k }); }

  // 1 · built to be read
  function clean(t, lt, dur) {
    const a = cs('zo_clean'), e = ce('zo_clean'), tr = wt('zo_clean', 'read'), td = wt('zo_clean', 'downstream'), tu = wt('zo_clean', 'understand');
    sky(t, [[0, '#2A3A6A'], [.6, '#8A6A9A'], [1, '#F0B08A']], { stars: 20, clouds: 4, cloudY: 280, cloudCol: '#E9A5A8' });
    skyline('c13b', -300, 2300, 860, { depth: .6, bh: 300, bw: 110, lit: .3 });
    boilSeed('c13gr'); paint(rectPts(-300, 860, W + 600, 300, 1), { grad: [[0, '#4A4270'], [1, '#2A2445']], ink: PAL.ink, sw: 1 });
    camKeys(t, [[a - .3, 960, 560, 1], [tr, 1100, 480, 1.25], [td, 960, 540, 1], [e, 960, 540, 1]], .3);
    // a signpost at a street corner, written in the city's alphabet; it slowly becomes readable
    const rk = seg(t, tu - 1.4, tu + .4);
    boilSeed('c13post'); paint(rectPts(1180, 420, 16, 460, 1), { wash: '#5A4A3E', ink: PAL.ink, sw: 1 });
    plaque(1188, 380, 520, 110, 'built to be read', 8, rk);
    // downstream buildings read from upstream ones: little light-notes pass between them
    const B = [[260, 'a'], [560, 'b'], [860, 'c']];
    B.forEach(([x], i) => neuronHouse(x, 880, 170, 230, { roof: 'peak', on: .6, imgs: [[V + 'p47742'], [V + 'pTrain34'], [V + 'pPool13']][i], cols: 1, key: 'c13r' + i, col: '#5A5A8A', awning: false }));
    if (t > td - .6) for (let i = 0; i < 2; i++) { const f = frac((t - td) * .6 + i * .5); const x = lerp(B[i][0] + 80, B[i + 1][0] - 80, f), y = 700 - Math.sin(f * Math.PI) * 80; glow(x, y, 26, '#FFD36B', .9); }
    if (t > td - .4) hand("read by the network's own neurons", 560, 560, 40, PAL.cream, seg(t, td - .4, td + .5), { stroke: PAL.ink, strokeW: .14 });
    prof(1500, 1000, .62, { view: 'q', flip: true, pose: gesture(t, [[a, 'explain'], [tr - .5, 'think'], [tu, 'open']]), mood: t > tu ? 'happy' : 'think', look: [-.7, -.7], talk: talk(t) });
    camEnd();
    title('"already clean"', 960, 140, 90, PAL.cream, seg(t, a + .2, a + 1.2) * (1 - seg(t, tr - .8, tr - .4)), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    chapterSign(t, t - chapStart('ch13'), cs('zo_clean') - chapStart('ch13') + 3, '13', 'Zooming out');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // 2 · a village vs New York: bigger isn't harder
  function bigger(t, lt, dur) {
    const a = cs('zo_bigger'), e = ce('zo_bigger'), tny = wt('zo_bigger', 'York'), tmap = wt('zo_bigger', 'map'), tnar = wt('zo_bigger', 'narrower');
    sky(t, [[0, '#7AB0D8'], [1, '#F4E3C0']], { clouds: 5, cloudY: 200, cloudCol: '#FFFFFF' });
    camKeys(t, [[a - .3, 480, 560, 1.4], [tny - .5, 960, 540, 1], [tmap, 1400, 560, 1.1], [e, 960, 540, 1]], .3);
    boilSeed('c13vg'); paint(rectPts(-200, 780, 1180, 400, 1), { wash: '#8FBF73', ink: PAL.ink, sw: 1 });
    // the village: a bank on one street, an office somewhere else
    [[160, 'bank', '#C9A15A'], [420, '', '#C9B48E'], [620, 'office', '#9AA3B5'], [820, '', '#C9B48E']].forEach(([x, lab, col], i) => { neuronHouse(x, 820, 120, 140, { roof: 'peak', on: .3, key: 'c13vh' + i, col, awning: false }); if (lab) sign(x, 620, lab, 30); });
    letter('a small town', 480, 1000, 44, PAL.ink, { face: 'hand', shadow: false });
    boilSeed('c13div'); paint(rectPts(976, -100, 8, 1400, 0), { wash: PAL.ink, ink: null });
    // New York: a glittering financial district
    boilSeed('c13ny'); paint(rectPts(984, 780, 1200, 400, 1), { wash: '#6A6A8A', ink: PAL.ink, sw: 1 });
    skyline('c13nyc', 1000, 1920, 780, { depth: .3, bh: 460, bw: 70, lit: .4, col: '#5A6A8A' });
    const fk = on(t, tny);
    for (let i = 0; i < 6; i++) { const x = 1380 + i * 50; boilSeed('c13fin' + i); paint(rectPts(x, 780 - 300 - 60 * hash(i), 44, 300 + 60 * hash(i), 1), { grad: [[0, '#BFE6FF'], [1, '#5A7AA8']], ink: PAL.ink, sw: .8 }); }
    glow(1500, 560, 300, '#BFE6FF', .5 * fk);
    if (t > tmap - .5) { const mk = popk(t, tmap - .5, .6); push(); translate(1600, 300); scale(backOut(mk)); boilSeed('c13map'); paint(rectPts(-160, -110, 320, 220, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 6; i++) inkLine([[-150, -90 + i * 36], [150, -80 + i * 36]], 1, '#C9B48E', 'inkfine', .3); paint(ellPts(30, 10, 60, 40, 18), { wash: rgba(PAL.berry, .5), ink: PAL.berry, sw: 1.4 }); pop(); if (mk > .6) letter('financial district', 1630, 330, 22, PAL.ink, { face: 'hand', shadow: false }); }
    clawd(1760, 1020, 10, { ...emotions(t, [[a, 'confused'], [tmap, 'excited']]), view: 'q', flip: true, aR: 2.2, boilKey: 'c13c' });
    letter('New York', 1440, 1000, 44, PAL.cream, { face: 'hand', shadow: false });
    camEnd();
    if (t > tnar - .4) title('bigger models: narrower, cleaner neurons', 960, 130, 60, PAL.ink, seg(t, tnar - .4, tnar + .6), { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#7AB0D8', '#8FBF73'] });
  }
  function sign(x, y, txt, size = 30) { const w = txt.length * size * .55 + 40; boilSeed('sgn' + txt); inkLine([[x, y + size], [x, y + size * 3]], 3, '#5A4A3E', 'ink', 0); paint(rrPts(x - w / 2, y - size * .8, w, size * 1.6, 8), { wash: PAL.cream, ink: PAL.ink, sw: 1 }); letter(txt, x, y + 2, size, PAL.ink, { face: 'hand', shadow: false }); }

  // 3 · looking for Brooklyn in Tokyo
  function tokyo(t, lt, dur) {
    const a = cs('zo_tokyo'), e = ce('zo_tokyo'), ts = wt('zo_tokyo', 'stitch'), tm = wt('zo_tokyo', 'mess'), tv = wt('zo_tokyo', 'V');
    const vk = seg(t, tv - .5, tv);
    if (vk < 1) {
      sky(t, [[0, '#1A1636'], [1, '#4A2A5A']], { stars: 30 });
      camKeys(t, [[a - .3, 960, 560, 1], [ts, 1100, 580, 1.08], [tm, 1000, 560, 1], [tv, 1180, 500, 1.6]], .3);
      boilSeed('c13tk'); paint(rectPts(-200, 860, W + 400, 300, 1), { wash: '#2A2240', ink: PAL.ink, sw: 1 });
      // Tokyo: narrow buildings with vertical neon signs and lanterns
      for (let i = 0; i < 9; i++) { const x = 60 + i * 220, h = 380 + 200 * hash(i * 3); boilSeed('c13tb' + i); paint(rectPts(x, 860 - h, 180, h, 1), { grad: [[0, '#4A3A6A'], [1, '#2A2240']], ink: PAL.ink, sw: 1 }); const nc = ['#FF6FA8', '#6FE3FF', '#FFD36B', '#9FE3A6'][i % 4]; paint(rectPts(x + 130, 860 - h + 30, 34, h * .5, 1), { wash: nc, washOp: 200, ink: PAL.ink, sw: .8 }); glow(x + 147, 860 - h * .7, 70, nc, .5); glyphs(x + 136, 860 - h + 60, 1, 22, '#2A2240', i * 9); glyphs(x + 136, 860 - h + 110, 1, 22, '#2A2240', i * 9 + 1); for (let j = 0; j < 3; j++) { paint(ellPts(x + 30 + j * 40, 860 - h * .3, 14, 18, 12), { wash: '#E2473F', ink: PAL.ink, sw: .7 }); glow(x + 30 + j * 40, 860 - h * .3, 30, '#FF8A6A', .4); } }
      // the Professor with a Brooklyn postcard
      prof(380, 1000, .62, { view: 'q', pose: gesture(t, [[a, { aL: [.12, .06], aR: [1.2, 1.8] }], [tm, 'shrug']]), holdR: s => { boilSeed('pc'); paint(rectPts(-60, 10, 120, 80, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.2 }); letter('BROOKLYN', 0, 50, 14, PAL.berry, { face: 'marker', shadow: false, screen: false }); }, mood: t > tm ? 'wry' : 'neutral', look: [.8, -.3], talk: talk(t) });
      // Clawd glues scraps into a patchwork Brooklyn that then collapses
      const gk = seg(t, ts - .4, ts + 2.5), col = seg(t, tm - .3, tm + .6);
      for (let i = 0; i < 14; i++) { const k = clamp(gk * 14 - i); if (k <= 0) continue; const tx = 1200 + (i % 4) * 70 - 100, ty = 820 - Math.floor(i / 4) * 70, fall = col * (200 + 300 * hash(i)), rot = col * (hash(i * 3) - .5) * 3; push(); translate(lerp(hash(i) * W, tx, ease(k)), lerp(-60, ty, ease(k)) + fall); rotate(rot); boilSeed('scr' + i); paint(rectPts(-34, -34, 68, 68, 1), { wash: ['#4A3A6A', '#FF6FA8', '#6FE3FF', '#E2473F', '#FFD36B'][i % 5], ink: PAL.ink, sw: .8 }); pop(); }
      if (col > .3) sfx('crash!', 1200, 600, 60, PAL.berry, col);
      clawd(1500, 1000, 10, { ...emotions(t, [[a, 'determined'], [tm, 'cry']]), view: 'q', flip: true, boilKey: 'c13c2' });
      if (t > ts) hand('Brooklyn, stitched from 70 scraps of Tokyo', 1200, 360, 40, PAL.cream, seg(t, ts, ts + 1), { stroke: PAL.ink, strokeW: .14 });
      camEnd();
      if (t > tm - .2) title('"Tokyo is a mess!"', 960, 140, 76, PAL.cream, seg(t, tm - .2, tm + .5), { stroke: '#1B1F4A', strokeW: .14 });
    }
    if (vk > 0) {
      ctx.save(); ctx.globalAlpha = vk;
      sky(t, [[0, '#0F1330'], [1, '#4A3F6A']], {});
      camKeys(t, [[tv - .5, 1180, 500, 1.3], [e + 1, 1180, 520, 1.1]], .2);
      neuronHouse(1180, 980, 380, 520, { roof: 'v', on: .85, imgs: [V + 'p47742', V + 'c4d201c', V + 'p42708', V + 'c4d201d'], cols: 2, key: 'c13v', col: '#5C4A7A', sign: '4e:55' });
      camEnd(); ctx.restore();
      hand('we saw cats and cars', 960, 140, 52, PAL.cream, seg(t, wt('zo_tokyo', 'cats') - .3, wt('zo_tokyo', 'cars') + .3), { stroke: PAL.ink, strokeW: .14 });
    }
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#7AB0D8', '#8FBF73'] });
  }

  // small painted icons for the three routes
  function whale(x, y, s) { boilSeed('wh'); push(); translate(x, y); scale(s); paint([[-80, 0], [-40, -40], [40, -36], [80, -10], [60, 20], [-50, 24]], { wash: '#1E1E2A', ink: PAL.ink, sw: 1, curv: .5 }); paint(ellPts(-30, -10, 18, 10, 10), { wash: '#FFFFFF', ink: null }); paint(ellPts(0, 16, 40, 8, 10), { wash: '#FFFFFF', ink: null }); paint([[-10, -40], [0, -80], [14, -38]], { wash: '#1E1E2A', ink: PAL.ink, sw: .8 }); paint([[76, -10], [110, -36], [100, 0], [110, 30]], { wash: '#1E1E2A', ink: PAL.ink, sw: .8 }); pop(); }
  function ray(x, y, s) { boilSeed('ry'); push(); translate(x, y); scale(s); paint([[0, -40], [80, 0], [0, 30], [-80, 0]], { wash: '#8A93A8', ink: PAL.ink, sw: 1, curv: .4 }); inkLine([[0, 30], [10, 90]], 3, PAL.ink, 'ink', .5); pop(); }
  function angler(x, y, s) { push(); translate(x, y); scale(s); person(0, 0, 1, { col: '#3A64B8', key: 'angl', hat: 'cap', mood: 'happy' }); boilSeed('fsh'); paint([[30, -150], [90, -170], [110, -150], [90, -130]], { wash: '#C9B48E', ink: PAL.ink, sw: .9, curv: .4 }); paint([[110, -150], [130, -170], [130, -130]], { wash: '#C9B48E', ink: PAL.ink, sw: .8 }); pop(); }
  // 4 · better maps: zoom in on the "killer whale" decision
  function maps(t, lt, dur) {
    const a = cs('zo_maps'), e = ce('zo_maps'), tk = wt('zo_maps', 'killer'), tw = wt('zo_maps', 'whales'), ts = wt('zo_maps', 'sharks'), tf = wt('zo_maps', 'fishermen');
    sky(t, [[0, '#E9E4D6'], [1, '#D9D3C9']], {});
    const zoom = kf(t, [[a, .6], [tk - .5, .6], [tk + 1.2, 1.25]]);
    camKeys(t, [[a - .3, 960, 540, .6], [tk - .5, 960, 540, .6], [tk + 1.2, 1300, 540, 1.2], [e, 1250, 540, 1.15]], .3);
    // an unfolding paper map: districts as coloured blocks, streets as lines
    const uf = ease(seg(t, a, a + 1.5));
    boilSeed('c13mp'); paint(rectPts(960 - 1300 * uf, -200, 2600 * uf, 1500, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.5 });
    if (uf > .5) {
      for (let i = 0; i < 24; i++) { const x = -200 + (i % 6) * 400, y = -100 + Math.floor(i / 6) * 340; boilSeed('c13dz' + i); paint(rrPts(x, y, 320, 260, 30), { wash: ['#D9E3C9', '#E9D3C9', '#D3D9E9', '#E9E4C9'][i % 4], ink: PAL.ink, sw: .8 }); }
      for (let i = 0; i < 8; i++) inkLine([[-300, -100 + i * 200], [2300, -60 + i * 200]], 2, '#B9A27A', 'dry', .3);
      letter('the whole network, by neighbourhood', 960, 40, 50, PAL.ink, { face: 'hand', shadow: false });
    }
    // the killer-whale tower and its three routes
    const tx = 1500, ty = 540, kk = on(t, tk - .3);
    if (kk > 0) {
      const R = [[tw, [[700, 260], [1100, 360], [tx - 60, ty - 30]], '#3A64B8', (x, y) => whale(x, y, .9)], [ts, [[700, 540], [1100, 540], [tx - 60, ty]], '#8A93A8', (x, y) => ray(x, y, .9)], [tf, [[700, 820], [1100, 720], [tx - 60, ty + 30]], PAL.berry, (x, y) => angler(x, y, .7)]];
      R.forEach(([tt, P, col, icon]) => { const k = seg(t, tt - .5, tt + .4); stroke(P, k, 14, col); if (k > .5) icon(P[0][0] - 60, P[0][1] + 30); });
      boilSeed('c13kw'); paint(rectPts(tx - 50, ty - 260, 100, 300, 1), { grad: [[0, '#4A5A8A'], [1, '#2A3A5A']], ink: PAL.ink, sw: 1.2 }); glow(tx, ty - 120, 200, '#9FD8FF', .5 * kk);
      letter('"killer whale"', tx + 10, ty - 300, 40, PAL.ink, { face: 'marker', shadow: false });
      if (t > tw) { const I = img(SL + 'v19610'); ctx.save(); ctx.globalAlpha = seg(t, tw, tw + .5); ctx.drawImage(I, tx - 40, ty - 230, 80, 80); ctx.restore(); }
    }
    camEnd();
    title('better maps', 960, 140, 90, PAL.ink, seg(t, wt('zo_maps', 'maps') - .3, wt('zo_maps', 'maps') + .6) * (1 - seg(t, tk - .6, tk - .2)), { stroke: PAL.cream, strokeW: .1 });
    if (t > tf) hand('three routes', 960, 1000, 50, PAL.berry, seg(t, tf, tf + .6), { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#E9E4D6', '#D9D3C9'] });
  }

  // 5 · the lit building nobody noticed
  function deception(t, lt, dur) {
    const a = cs('zo_deception'), e = ce('zo_deception'), tp = wt('zo_deception', 'plain'), tc = wt('zo_deception', 'circuits'), tr = wt('zo_deception', 'reader');
    sky(t, [[0, '#0E1236'], [.7, '#24285A'], [1, '#3A3468']], { stars: 140, starH: 500 });
    camKeys(t, [[a - .3, 700, 600, 1.1], [tp, 900, 560, 1], [tc, 960, 520, .95], [tr, 1000, 540, 1], [e, 1000, 540, 1]], .3);
    skyline('c13dc', -300, 2300, 880, { depth: .4, bh: 300, bw: 110, lit: .3 });
    boilSeed('c13dgr'); paint(rectPts(-300, 880, W + 600, 300, 1), { wash: '#2A2445', ink: PAL.ink, sw: 1 });
    // the big building, brightly lit, right in the middle: a sign in the city's alphabet
    const big = .6 + .3 * Math.sin(t * 2);
    neuronHouse(1200, 900, 420, 640, { roof: 'dome', on: big, key: 'c13big', col: '#6A4A7A', awning: false });
    plaque(1200, 420, 400, 90, 'deception', 7, seg(t, tr - .8, tr + .2), { col: '#5A2A3A' });
    // passers-by who don't notice
    for (let i = 0; i < 6; i++) { const ph = frac((t - a) * .06 + i / 6), x = -100 + ph * (W + 200); person(x, 1010 + (i % 2) * 20, .9, { col: COLS6[i], key: 'c13pp' + i, walk: t * 2 + i, look: 0 }); }
    const turn = seg(t, tc - .5, tc + .5);
    prof(560, 1000, .66, { view: turn > .5 ? 'q' : 'q', flip: turn < .5, pose: gesture(t, [[a, 'explain'], [tc - .5, 'rest'], [tc + .5, { aL: [.12, .06], aR: [2.3, 2.7] }]]), holdR: t > tc ? lanternHand(seg(t, tc, tc + .8)) : null, mood: turn > .5 ? 'surprise' : 'serious', look: turn > .5 ? [.8, -.7] : [-.5, 0], talk: talk(t) });
    if (t > tc) glow(700, 560, 500 * seg(t, tc, tc + .8), '#FFC766', .4);
    camEnd();
    hand('the answer was in plain sight', 960, 140, 52, PAL.cream, seg(t, tp - .3, tp + .6) * (1 - seg(t, tc - .6, tc - .2)), { stroke: PAL.ink, strokeW: .14 });
    if (t > tr - .4) title('become a reader', 960, 140, 84, '#FFD36B', seg(t, tr - .4, tr + .5), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#24285A'] });
  }
  const COLS6 = [PAL.teal, PAL.berry, PAL.ochre, PAL.violet, '#3A64B8', PAL.sap];

  // 6 · the asymmetry: a lead vs a dead end
  function asym(t, lt, dur) {
    const a = cs('zo_asym'), e = ce('zo_asym'), tl = wt('zo_asym', 'lead'), td = wt('zo_asym', 'dead'), ty = wt('zo_asym', 'years');
    sky(t, [[0, '#2A3A6A'], [1, '#8A6A9A']], { stars: 30 });
    camKeys(t, [[a - .3, 700, 560, 1.1], [tl, 1000, 440, 1], [td, 1000, 700, 1], [ty, 900, 560, .92], [e, 900, 560, .92]], .3);
    boilSeed('c13ag'); paint(rectPts(-300, 560, W + 600, 700, 1), { wash: '#3A3660', ink: null });
    const P1 = [[560, 560], [1000, 380], [1700, 300]], P2 = [[560, 600], [1000, 760], [1500, 820]];
    lightRoad(P1, 50, seg(t, tl - 1, tl), { col: '#FFC766', pulses: 3 }); lightRoad(P2, 50, seg(t, td - 1, td), { col: '#8A8AA8', pulses: 0 });
    // the messy building at the fork
    neuronHouse(480, 700, 200, 260, { roof: 'peak', on: .5, imgs: [V + 'p47742', V + 'c4d201c'], cols: 2, key: 'c13mess', col: '#6A4A7A', awning: false });
    if (t > tl - .5) { skyline('c13lit', 1600, 2300, 320, { depth: .2, bh: 300, bw: 80, lit: .7, glowK: 1 }); glow(1900, 240, 300, '#FFD36B', .5); hand('assume clean: a lead', 1300, 250, 46, '#FFD36B', seg(t, tl - .4, tl + .4), { stroke: PAL.ink, strokeW: .14 }); }
    if (t > td - .5) { boilSeed('c13wall'); for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) paint(rectPts(1500 + c * 60 + (r % 2) * 30, 640 + r * 40, 58, 38, 1), { wash: '#B5533C', ink: PAL.ink, sw: .8 }); hand('assume a knot: a dead end', 1300, 940, 46, '#C9C3DA', seg(t, td - .4, td + .4), { stroke: PAL.ink, strokeW: .14 }); }
    prof(260, 1000, .58, { view: 'q', pose: gesture(t, [[a, 'explain'], [tl, 'pointUp'], [td, 'point'], [ty - .6, 'shrug']]), mood: t > ty - .6 ? 'wry' : 'serious', look: [.8, -.3], talk: talk(t) });
    camEnd();
    if (t > ty - .6) title('I made that second mistake for years', 960, 1010, 54, PAL.cream, seg(t, ty - .6, ty + .3), { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A3A6A', '#8A6A9A'] });
  }

  // 7 · a note to my younger self: a paper plane through a time tunnel
  const ADVICE = ['look at the giant pose circuit', 'the negative side is a gate', "don't trust the sketch artist late", 'when it looks like a mess, look harder'];
  function advice(t, lt, dur) {
    const a = cs('zo_advice'), e = ce('zo_advice'), T = [wt('zo_advice', 'pose'), wt('zo_advice', 'gate'), wt('zo_advice', 'trust'), wt('zo_advice', 'harder')], tp = wt('zo_advice', 'mess', 1);
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 540, 1], [e, 980, 540, 1.03]], .3);
    const fly = seg(t, tp - .5, e - .2);
    if (fly < .5) {
      boilSeed('c13note'); paint(rectPts(860, 200, 760, 520, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.3 });
      letter('Dear me, eight years ago:', 1240, 260, 40, PAL.ink, { face: 'hand', shadow: false });
      ADVICE.forEach((s, i) => letter('• ' + s, 900, 350 + i * 80, 38, PAL.berry, { face: 'hand', shadow: false, align: 'left', reveal: seg(t, (T[i] || a + 2 + i) - .6, (T[i] || a + 2 + i) + .6) }));
    } else {
      // the folded plane flies into a swirl
      const f = (fly - .5) / .5, cx = 1500, cy = 360;
      for (let i = 0; i < 6; i++) { boilSeed('c13sw' + i); inkStroke(ellPts(cx, cy, 40 + i * 40 + 10 * Math.sin(t * 3 + i), 30 + i * 30, 30), true, 3, rgba(['#7B5CA8', '#3A64B8', '#9FE3C8'][i % 3], .7), 'ink'); }
      const px = lerp(1100, cx, f), py = lerp(500, cy, f) - Math.sin(f * Math.PI) * 120;
      push(); translate(px, py); rotate(-.3 + f * 6); scale(1 - .8 * f); boilSeed('plane'); paint([[-60, 0], [60, -20], [-20, 30]], { wash: '#FBF6EC', ink: PAL.ink, sw: 1.1 }); paint([[-60, 0], [60, -20], [-10, -4]], { wash: '#E9E4D6', ink: PAL.ink, sw: 1 }); pop();
    }
    prof(470, 1000, .64, { view: 'q', pose: gesture(t, [[a, { aL: [.3, .9], aR: [.6, 1.6] }], [tp - .6, { aL: [.2, .1], aR: [2.3, 2.6] }], [tp, 'explain']]), mood: 'warm', look: [.8, -.2], talk: talk(t) });
    camEnd();
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // 8 · the crossword: districts fill in, slowly, then in a rush
  const WORDS = ['V', 'POSE', 'GATE', 'CURVE', 'DOG', 'CAR', 'TAXI', 'IY', 'DIY', 'SANTA', 'WHALE', 'RIVER', 'VOTE', 'PR', 'TREE'];
  function crossword(t, lt, dur) {
    const a = cs('zo_crossword'), e = ce('zo_crossword'), tf = wt('zo_crossword', 'faster');
    sky(t, [[0, '#E9E4D6'], [1, '#D9D3C9']], {});
    camKeys(t, [[a - .3, 960, 560, 1.15], [e, 960, 540, .95]], .3);
    const N = 12, cell = 70, x0 = 960 - N * cell / 2, y0 = 120;
    boilSeed('c13cw'); paint(rectPts(x0 - 10, y0 - 10, N * cell + 20, N * cell + 20, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1.4 });
    // progress accelerates: filled = total * k^3
    const k = seg(t, a + .5, e - .5), filled = Math.round(N * N * Math.pow(k, 2.6));
    for (let i = 0; i < N * N; i++) {
      const c = i % N, r = Math.floor(i / N), order = Math.floor(hash(i * 7.7) * N * N), blk = hash(i * 3.3) > .82;
      if (blk) continue;
      boilSeed('c13ce' + (i % 9)); paint(rectPts(x0 + c * cell + 3, y0 + r * cell + 3, cell - 6, cell - 6, .5), { wash: order < filled ? ['#D9E3C9', '#E9D3C9', '#D3D9E9', '#E9E4C9'][(c + r) % 4] : '#FBF6EC', ink: null });
      if (order < filled) letter(WORDS[(i * 7) % WORDS.length][0], x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 2, 38, PAL.ink, { face: 'marker', shadow: false });
    }
    clawd(1700, 1000, 10, { ...emotions(t, [[a, 'thinking'], [tf, 'excited']]), view: 'q', flip: true, boilKey: 'c13c3' });
    camEnd();
    title('understanding compounds', 960, 1010, 70, PAL.ink, seg(t, wt('zo_crossword', 'compounds') - .3, wt('zo_crossword', 'compounds') + .6), { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#E9E4D6', '#D9D3C9'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#F6C08A', '#F4D9B5']);
  }

  shots([[chapStart('ch13'), clean], [cs('zo_bigger') - .3, bigger], [cs('zo_tokyo') - .3, tokyo], [cs('zo_maps') - .3, maps], [cs('zo_deception') - .3, deception], [cs('zo_asym') - .3, asym], [cs('zo_advice') - .3, advice], [cs('zo_crossword') - .3, crossword]]);
})();
