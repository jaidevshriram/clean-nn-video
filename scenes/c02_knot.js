// ch02 The knot: a neuron that makes no sense; the foggy district; superposition as roommates on different shifts;
// the knot; the Unfolding Machine; "I believed it".
(() => {
  const V = 'blog/raw/v-figure-10x/';
  const CATCAR = [V + 'p47742', V + 'c4d201c', V + 'c5a352d', V + 'pCarX5', V + 'c4d477c', V + 'c4d201d'];
  const MIX = [V + 'p47742', V + 'c4d201c', V + 'c5a94a', V + 'n1070575', V + 'pPool13', V + 'n282687', V + 'c5a317d', V + 'n1158528', V + 'c4d493a'];
  const all = ['kn_problem', 'kn_catcar', 'kn_poly', 'kn_roommates', 'kn_why', 'kn_bad', 'kn_machine', 'kn_both'];
  const talk = t => speak(t, all);
  function nightStreet(t) {
    sky(t, [[0, '#141842'], [.6, '#38306A'], [1, '#7A5A8C']], { stars: 90, starH: 420 });
    fog(760, 80, '#7A6AA5', .5);
    skyline('c2b', -200, 2200, 860, { depth: .5, bh: 300, bw: 110, lit: .3, glowK: .5 });
    boilSeed('c2st'); paint(rectPts(-60, 880, W + 120, 260, 1), { grad: [[0, '#40396A'], [1, '#221E3C']], gdir: [0, 880, 0, 1080], ink: PAL.ink, sw: 1, tex: .6 });
    for (let i = 0; i < 9; i++) paint(rectPts(i * 230 + 40, 986, 110, 10, 1), { wash: '#E8C98A', washOp: 180, ink: null });
  }
  // 1 · the neuron that makes no sense
  function problem(t, lt, dur) {
    const a = cs('kn_problem'), c = cs('kn_catcar'), p = cs('kn_poly'), e = ce('kn_poly');
    if (t < p + .8) {
      nightStreet(t);
      camKeys(t, [[a - .5, 960, 560, 1], [c + 1, 1150, 520, 1.15], [wt('kn_catcar', 'common') , 1180, 480, 1.3], [p + .8, 1150, 400, 1.05]], .4);
      const flick = Math.floor(t * 1.6) % 2, imgs = [0, 1, 2, 3].map(k => CATCAR[(k * 2 + flick) % CATCAR.length]);
      neuronHouse(1180, 880, 360, 480, { roof: 'flat', on: .5 + .4 * Math.abs(Math.sin(t * 5)), imgs, cols: 2, key: 'cc', col: '#6A4A76', sign: '4e:55', glowCol: flick ? '#FFC766' : '#FF9ACD' });
      const walk = stroll(t, a, a + 3.2, -200, 620, 1);
      prof(walk.x, 1000, .6, { view: 'q', walk: t < a + 3.2 ? t * 1.4 : null, pose: gesture(t, [[a, 'rest'], [wt('kn_catcar', 'cats') , 'point'], [wt('kn_catcar', 'common') - .5, 'think']]), mood: t > wt('kn_catcar', 'common') - .6 ? 'think' : 'neutral', look: [.8, -.4], talk: t > a + 3.2 ? talk(t) : 0 });
      clawd(walk.x - 140, 1004, 12, { ...emotions(t, [[a - 1, 'neutral'], [wt('kn_catcar', 'cars') , 'confused']]), view: t < a + 3.2 ? 'side' : 'q', walk: t * 2, boilKey: 'ck' });
      camEnd();
    } else {
      // the last district on the horizon, foggy and broken
      sky(t, [[0, '#1B1B3A'], [1, '#4A3F5E']], { stars: 30 });
      camKeys(t, [[p + .8, 960, 520, 1], [e + 1, 960, 560, 1.12]], .4);
      for (let i = 0; i < 7; i++) { const x = 160 + i * 270, h = 380 + 160 * hash(i * 3); push(); translate(x, 960); rotate((hash(i * 9) - .5) * .12); translate(-x, -960); ctx.save(); ctx.filter = 'blur(2px)'; neuronHouse(x, 960, 220, h, { roof: ['flat', 'peak', 'dome'][i % 3], on: .25 + .2 * Math.sin(t * 2 + i), imgs: [0, 1, 2, 3].map(k => MIX[(i * 3 + k) % MIX.length]), cols: 2, key: 'fd' + i, col: '#4A4458', awning: false }); ctx.restore(); pop(); }
      for (let i = 0; i < 4; i++) fog(560 + i * 130 + 20 * Math.sin(t * .3 + i), 140, '#9E95AA', .55);
      hand('the last district: almost nothing made sense', 960, 180, 44, PAL.cream, seg(t, wt('kn_poly', 'last') - .3, wt('kn_poly', 'all') + .3), { stroke: PAL.ink, strokeW: .12 });
      camEnd();
    }
    if (t >= p + .5 && t < p + 1.1) brushWipe((t - (p + .5)) / .6 * (t < p + .8 ? 1 : 1), ['#2A2560', '#3E3368']);
    const kp = seg(t, wt('kn_poly', 'polysemantic') - .4, wt('kn_poly', 'polysemantic') + .6) * (1 - seg(t, p + .4, p + .7));
    if (kp > 0) title('polysemantic', 960, 170, 88, PAL.cream, kp, { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    chapterSign(t, t - chapStart('ch02'), cs('kn_problem') - chapStart('ch02') + 2.8, '2', 'The knot');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2560', '#3E3368']);
  }
  // 2 · superposition as roommates on different shifts
  const JOBS = [['chef', PAL.ochre], ['sailor', '#3A64B8'], ['nurse', PAL.rose], ['post', '#5A6B8C'], ['cap', PAL.sap]];
  const HX = i => 230 + i * 365;
  function roommates(t, lt, dur) {
    const a = cs('kn_roommates'), w = cs('kn_why'), e = ce('kn_why'), tf = wt('kn_roommates', 'family'), ts = wt('kn_roommates', 'strangers'), tn = wt('kn_roommates', 'never');
    sky(t, [[0, '#9CC9E6'], [1, '#F4D9B5']], { clouds: 6, cloudY: 240, cloudCol: '#FFFFFF' });
    boilSeed('lawn'); paint(rectPts(-60, 800, W + 120, 400, 1), { grad: [[0, '#8FBF73'], [1, '#5E9A4C']], gdir: [0, 800, 0, 1080], ink: PAL.ink, sw: 1 });
    paint(rectPts(-60, 905, W + 120, 70, 1), { wash: '#D9C29A', ink: PAL.ink, sw: .9 });
    // five houses
    for (let i = 0; i < 5; i++) { neuronHouse(HX(i), 830, 220, 260, { roof: 'peak', on: .2, key: 'rh' + i, col: ['#E8D3B0', '#D9B8A0', '#C9D3B0', '#D3C0D9', '#E0C9A0'][i], roofCol: '#B5533C', awning: false }); }
    // clocks over the doors in the shift phase
    const shift = seg(t, ts - .3, ts + .6);
    if (shift > 0) for (let i = 0; i < 5; i++) { const cx = HX(i), cy = 520, sp = t < w ? 1.5 : 6; boilSeed('clk' + i); paint(ellPts(cx, cy, 34 * shift, 34 * shift, 20), { wash: PAL.cream, ink: PAL.ink, sw: 1.1 }); const q = t * sp + i; inkLine([[cx, cy], [cx + Math.cos(q) * 24 * shift, cy + Math.sin(q) * 24 * shift]], 2, PAL.ink, 'ink', 0); inkLine([[cx, cy], [cx + Math.cos(q / 12) * 16 * shift, cy + Math.sin(q / 12) * 16 * shift]], 2.4, PAL.ink, 'ink', 0); const day = Math.sin(q * .5) > 0; paint(day ? ellPts(cx + 56, cy - 26, 12, 12, 12) : [[cx + 50, cy - 38], [cx + 64, cy - 30], [cx + 52, cy - 14], [cx + 60, cy - 26]], { wash: day ? PAL.gold : '#C9D6F0', ink: PAL.ink, sw: .6 }); }
    // 25 tenants: five jobs × five people. Phase 1 (families): each job walks to its own house. Phase 2 (strangers):
    // each house gets one of each job, and they take turns (only one shift is visible at a time).
    for (let j = 0; j < 5; j++) for (let k = 0; k < 5; k++) {
      const id = j * 5 + k, [hat, col] = JOBS[j], start = [80 + (id * 77) % 1760, 1010 + (id % 3) * 22];
      const fam = [HX(j) - 80 + k * 40, 905];
      const str = [HX(k) - 80 + j * 40, 905];
      const kf_ = ease(seg(t, tf - .6 + id * .03, tf + .9 + id * .03)), ks = ease(seg(t, ts + .4 + id * .025, ts + 1.6 + id * .025));
      let p = [lerp(start[0], fam[0], kf_), lerp(start[1], fam[1], kf_)];
      if (ks > 0) p = [lerp(fam[0], str[0], ks), lerp(fam[1], str[1], ks)];
      let vis = 1, mood = 'happy';
      if (ks >= 1) { const turn = Math.floor((t * (t < w ? .9 : 2.6) + k * .37) % 5); vis = turn === j ? 1 : .0; }
      // a rare collision in kn_why: two strangers bump in a doorway
      const bump = t > w + 2 && Math.floor(t * 2.6 + k * .37) % 5 === j && hash(Math.floor(t * 2.6) * 3 + k) > .82;
      if (bump) { vis = 1; mood = 'oops'; }
      if (vis > 0) person(p[0], p[1], .9, { col, hat, key: 'tn' + id, walk: (kf_ > 0 && kf_ < 1) || (ks > 0 && ks < 1) ? t * 2 : null, mood, bag: k === 2 });
      if (bump) sfx('bump!', p[0], p[1] - 150, 34, PAL.berry, frac(t * 2.6) * 1.2);
    }
    title(t < ts ? 'a family per house' : 'strangers, sharing in shifts', 960, 130, 66, PAL.ink, t < ts ? seg(t, tf - .3, tf + .8) : seg(t, ts, ts + 1.2), { stroke: PAL.cream, strokeW: .1 });
    if (t > w) hand('“they rarely collide”', 960, 210, 44, PAL.berry, seg(t, wt('kn_why', 'rarely') - .4, wt('kn_why', 'collide') + .3));
    clawd(1820, 1040, 10, emotions(t, [[a - 1, 'happy'], [ts + .4, 'confused'], [w + 2.4, 'nervous']]));
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#8FBF73', '#5E9A4C'] });
  }
  // 3 · the neighbourhood knots itself; the Unfolding Machine takes it apart
  function knotting(t, lt, dur) {
    const b = cs('kn_bad'), m = cs('kn_machine'), e = ce('kn_machine');
    sky(t, [[0, '#15183C'], [.6, '#3E3368'], [1, '#7C5A86']], { stars: 120, starH: 700 });
    glow(960, 560, 640, '#C9A0D0', .3);
    const rise = seg(t, b + .2, b + 3.2), eat = seg(t, m + 1.2, e);
    const [sx, sy] = shakeXY(t, 7 * Math.sin(Math.PI * rise));
    camKeys(t, [[b - .3, 960, 700, 1.1], [b + 3, 960, 580, .95], [m + 1, 1100, 600, .85], [e, 1250, 620, .82]], .4);
    push(); translate(sx, sy);
    push(); translate(lerp(0, -260, eat), 0); scale(1 - .35 * eat); knot(t, rise, { imgs: MIX, streetY: 940 }); pop();
    if (t > m - .3) machine(t, lerp(2400, 1350, easeOut(seg(t, m - .3, m + 1.8))), 1040, .62, { on: 1, belt: on(t, m + 1.6), mouth: .9, items: [i => { boilSeed('rm' + i); paint(rrPts(-30, -60, 60, 60, 6), { wash: ['#E7F0DC', '#F2E0E4', '#E5E9F2', '#F3E2BE'][i % 4], ink: PAL.ink, sw: .8 }); const I = img(MIX[i % MIX.length]), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -22, -52, 44, 44); }] });
    pop();
    if (t > b + 2) hand('the city would be a knot', 960, 150, 60, PAL.cream, seg(t, wt('kn_bad', 'knot') - .5, wt('kn_bad', 'knot') + .4) * (1 - seg(t, m, m + .4)), { stroke: '#1B1F4A', strokeW: .12 });
    const km = seg(t, wt('kn_machine', 'sparse') - .4, wt('kn_machine', 'autoencoder') + .4);
    if (km > 0) title('a sparse autoencoder', 960, 150, 72, '#9FE3C8', km, { stroke: '#1B1F4A', strokeW: .12 });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A2560', '#3E3368'] });
  }
  // 4 · "I believed it": a sepia flashback
  function believed(t, lt, dur) {
    const a = cs('kn_both'), e = ce('kn_both');
    setStudy(t);
    camKeys(t, [[a - .3, 960, 540, 1], [e + 1, 1000, 520, 1.06]], .3);
    card(1180, 430, 620, 220, { k: popk(t, wt('kn_both', 'case') - .2), text: 'SUPERPOSITION', size: 76, face: 'marker', col: '#F3E2BE', key: 'sp', tcol: PAL.violet });
    prof(560, 980, .66, { beard: false, view: 'q', pose: gesture(t, [[a, 'rest'], [wt('kn_both', 'case') - .4, 'point'], [wt('kn_both', 'believed') - .3, 'present']]), mood: 'happy', colors: { hair: '#4A3530' } });
    clawd(330, 990, 12, { ...feel('happy', t), boilKey: 'yc' });
    camEnd();
    grade('#C9A26B', .55); vignette(.6, '#3A2414');
    hand('2019', 1700, 140, 56, '#5A3A20', on(t, a + .2));
    if (lt < .4) fade(1 - ease(lt / .4), '#F3E2BE');
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }
  shots([[chapStart('ch02'), problem], [cs('kn_roommates') - .3, roommates], [cs('kn_bad') - .3, knotting], [cs('kn_both') - .3, believed]]);
})();
