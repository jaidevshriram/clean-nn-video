// ch01 A city of neurons: what a neuron is; its windows; districts as layers; circuits; the hope.
(() => {
  const PE = 'blog/raw/pose-everywhere/', NP = 'blog/raw/negative-poles-v2/', TV = 'blog/raw/tiny-vehicles/', CC = 'blog/raw/circuit-carousel/images/';
  const DUSK = [[0, '#141842'], [.38, '#3E3170'], [.66, '#B0628E'], [.84, '#F09C76'], [1, '#FAD39A']];
  const DOGS = [PE + 'large/0', PE + 'medium/0', PE + 'large/4', PE + 'medium/2'];
  const BELT = [PE + 'large/0', TV + 'positive-02', NP + 'lighthouses-positive-1', PE + 'medium/0', NP + 'broccoli-positive-1', NP + 'pretzels-positive-1', PE + 'large/4', NP + 'mittens-positive-1'];
  const isDog = i => [0, 3, 6].includes(i % 8);
  const LADY = [1, 2, 3, 4].map(k => CC + 'ladybug-stage3_block2-34-example-' + k);
  const talk = t => speak(t, ['nr_what', 'nr_windows', 'nr_layers', 'nr_circuits', 'nr_hope']);

  function street(t) {
    sky(t, [[0, '#1B2150'], [.6, '#4E3B78'], [1, '#B0628E']], { stars: 80, starH: 400 });
    fog(760, 80, '#8C7AB0', .5);
    skyline('c1b', -200, 2200, 860, { depth: .5, bh: 300, bw: 110, lit: .35, glowK: .5 });
    boilSeed('c1st'); paint(rectPts(-60, 880, W + 120, 260, 1), { grad: [[0, '#4A4470'], [1, '#2A2545']], gdir: [0, 880, 0, 1080], ink: PAL.ink, sw: 1, tex: .6 });
  }
  // 1 · a neuron is a tiny detector: photos ride a conveyor past its door; dogs make it blaze
  function detector(t, lt, dur) {
    const a = cs('nr_what'), w = cs('nr_windows'), e = ce('nr_windows');
    street(t);
    camKeys(t, [[a - .5, 960, 560, 1], [w, 1000, 560, 1.02], [e, 1060, 520, 1.08]], .5);
    // conveyor along the street
    boilSeed('belt'); paint(rectPts(-100, 940, W + 200, 26, 1), { wash: '#4A5268', ink: PAL.ink, sw: .9 });
    for (let i = 0; i < 30; i++) paint(ellPts(-80 + i * 70, 953, 10, 10, 8), { wash: '#6E7891', ink: PAL.ink, sw: .5 });
    const speed = 160, off = (t * speed) % 260; let blaze = 0;
    for (let i = -2; i < 10; i++) {
      const x = i * 260 + off - 200, idx = ((i - Math.floor(t * speed / 260)) % 8 + 8) % 8;
      if (x > 980 && x < 1180 && isDog(idx)) blaze = Math.max(blaze, 1 - Math.abs(x - 1080) / 100);
      if (t < w + 1.5) print(BELT[idx], x, 880, 120, 1, { rot: 0, key: 'b' + idx, border: 6 });
    }
    // the neuron's house; its windows fill with dogs as it lights
    const proj = on(t, w - .2);
    const winImgs = t < w + 2.2 ? DOGS : LADY;
    neuronHouse(1080, 860, 300, 420, { roof: 'peak', on: t < w ? .15 + .85 * blaze : .5 + .4 * Math.sin(t * 3), imgs: winImgs, cols: 2, key: 'det', col: '#5A4A86' });
    hand('a neuron', 1080, 330, 46, PAL.cream, seg(t, wt('nr_what', 'neuron') - .3, wt('nr_what', 'neuron') + .5) * (1 - seg(t, w, w + .5)), { stroke: PAL.ink, strokeW: .12 });
    // Clawd's projector: throws thousands of photos; the brightest fly up into the windows
    if (proj > 0) {
      projector(t, 420, 980, 1080, 640, proj);
      for (let i = 0; i < 14; i++) { const f = frac(t * .9 + i / 14); if (t < w + .3) break; const p = arcPt([520, 920], [1000 + 160 * (i % 2), 560 + 80 * Math.floor(i % 4 / 2)], 220, f); print(i < 4 ? LADY[i] : 'blog/raw/last-layer-neurons/medium/images/' + ['img-02651-x32-y64', 'img-04173-x32-y32', 'img-05390-x32-y00', 'img-13042-x32-y32', 'img-20958-x00-y00', 'img-22108-x32-y32', 'img-23690-x32-y00'][i % 7], p[0], p[1], 70 * (1 - f * .4), Math.sin(f * Math.PI) * 1.4, { key: 'fly' + i, border: 4, shadow: false }); }
      clawd(330, 990, 13, { ...emotions(t, [[w - 1, 'excited'], [e - 2, 'proud']]), aR: 1 + .3 * Math.sin(t * 8), boilKey: 'cpj' });
    }
    prof(1560, 1000, .62, { view: 'q', flip: true, pose: gesture(t, [[a - 1, 'rest'], [wt('nr_what', 'detector') - .3, 'explain'], [wt('nr_what', 'lights') - .3, 'point'], [w + .3, 'explain2'], [wt('nr_windows', 'windows') - .3, 'point']]), mood: 'warm', talk: talk(t), look: [-.8, -.3] });
    camEnd();
    vignette(.4);
    chapterSign(t, t - chapStart('ch01'), cs('nr_what') - chapStart('ch01') + 2.5, '1', 'A city of neurons');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#3E3170', '#5B3F7B']);
  }
  // 2 · the districts: a flight from the coast to the towers
  function flyover(t, lt, dur) {
    const a = cs('nr_layers'), c = cs('nr_circuits'), e = ce('nr_circuits');
    sky(t, DUSK, { stars: 150, starH: 380, clouds: 6, cloudY: 430, cloudCol: '#E9A5A8' });
    glow(1100, 600, 600, '#FFB46A', .5);
    const tc = wt('nr_layers', 'coast'), te = wt('nr_layers', 'edges'), ti = wt('nr_layers', 'inland'), th = wt('nr_layers', 'horizon');
    const cam = camKeys(t, [[a - .3, 300, 560, .85], [tc + .5, 500, 600, .9], [te + .8, 1700, 640, .95], [ti + .5, 3300, 600, .9], [th + .5, 5400, 560, .85], [ce('nr_layers'), 6300, 520, .78], [c + 1, 4200, 470, .36], [e, 4300, 480, .38]], .2);
    cityPanorama(t, cam[0]);
    // the circuit: arcs light in sequence from a curve hut to a tower
    const route = [[1, 2], [2, 4], [4, 6], [6, 8], [8, 10], [10, 12], [12, 14]];
    cityStreet(t, { on: (i) => { const r = route.findIndex(([p, q]) => q === i), tt = c + 1.2 + r * .55; return r >= 0 && t > tt ? 1 : (i === 1 && t > c + .9 ? 1 : .3 + .2 * Math.sin(t + i)); } });
    route.forEach(([p, q], r) => { const tt = c + .7 + r * .55; streetArc(p, q, seg(t, tt, tt + .55), { sw: 9 }); });
    pixelRain(t, -500, 650, 840, 1);
    districtSign(300, 380, 'the coast: pixels arrive', on(t, tc - .3, c), '#CFE6EE');
    districtSign(1700, 470, 'edges · curves · colours', on(t, te - .3, c));
    districtSign(3300, 380, 'textures · eyes · wheels', on(t, ti - .2, c));
    districtSign(5300, 240, 'whole things: dogs, cars', on(t, th - .3, c));
    camEnd();
    const kc = seg(t, wt('nr_circuits', 'circuit') - .5, wt('nr_circuits', 'circuit') + .4) * (1 - seg(t, e - .4, e));
    if (kc > 0) title('a circuit', 960, 170, 80, PAL.cream, kc, { stroke: '#1B1F4A', strokeW: .12 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#3E3170', '#5B3F7B'] });
  }
  // 3 · the hope: the Professor at his drafting table above the city
  function hope(t, lt, dur) {
    const a = cs('nr_hope'), e = ce('nr_hope');
    sky(t, [[0, '#141842'], [.5, '#2E2A5E'], [1, '#5E4A80']], { stars: 180, starH: 600 });
    camKeys(t, [[a - .5, 900, 600, .9], [e + 1, 980, 580, .98]], .5);
    push(); translate(0, 120); cityPanorama(t, 3000); pop();
    // balcony
    boilSeed('balc'); paint(rectPts(-100, 900, W + 200, 300, 1), { grad: [[0, '#5A4232'], [1, '#2E2018']], gdir: [0, 900, 0, 1100], ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 22; i++) inkLine([[i * 95, 900], [i * 95, 800]], 3, '#3A2A20', 'ink', 0); inkLine([[-50, 800], [W + 50, 800]], 6, '#3A2A20', 'ink', 0);
    // drafting table with the map
    boilSeed('desk'); inkLine([[760, 1000], [820, 760]], 6, '#3A2A20', 'ink', 0); inkLine([[1180, 1000], [1120, 760]], 6, '#3A2A20', 'ink', 0);
    push(); translate(970, 740); rotate(-.06); paint(rectPts(-260, -90, 520, 170, 2), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 9; i++) { const lit = seg(t, a + .5 + i * .4, a + 1 + i * .4); paint(ellPts(-220 + i * 55, -20 + 30 * Math.sin(i), 9, 9, 8), { wash: lit > .5 ? PAL.ochre : '#B8A27A', ink: PAL.ink, sw: .6 }); if (i) inkLine([[-275 + i * 55, -20 + 30 * Math.sin(i - 1)], [-220 + i * 55, -20 + 30 * Math.sin(i)]], 1.2, lit > .5 ? PAL.clayDk : '#8C7A5A', 'inkfine', 0); }
    pop();
    glow(1000, 700, 260, '#FFC766', .6);
    const words = [['look inside', wt('nr_hope', 'Look')], ['read the parts', wt('nr_hope', 'Read')], ['understand the machine', wt('nr_hope', 'Understand')]];
    words.forEach(([w_, ta], i) => title(w_, 560 + i * 420, 250 + (i % 2) * 40, 54, PAL.cream, seg(t, ta - .2, ta + .6), { stroke: '#1B1F4A', strokeW: .12 }));
    prof(740, 1000, .6, { view: 'q', pose: gesture(t, [[a - 1, 'rest'], [a + .5, 'explain'], [wt('nr_hope', 'Understand'), 'present']]), mood: 'warm', talk: talk(t), look: [.6, -.2] });
    clawd(1300, 1000, 12, { ...emotions(t, [[a - 1, 'happy'], [wt('nr_hope', 'Read'), 'excited']]), flip: true, aR: 1.2, armR: (u, sw) => { inkStroke(ellPts(u * 1.5, 0, u * 1.2, u * 1.2, 18), true, sw * 1.2, PAL.ink, 'ink'); inkLine([[0, 0], [u * .4, 0]], sw * 2, '#7A5B3E', 'ink', 0); } });
    camEnd();
    vignette(.45);
    if (lt < .3) brushWipe(.5 + lt / .6, ['#3E3170', '#5B3F7B']);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2560', '#3E3368']);
  }
  shots([[chapStart('ch01'), detector], [cs('nr_layers') - .3, flyover], [cs('nr_hope') - .3, hope]]);
})();
