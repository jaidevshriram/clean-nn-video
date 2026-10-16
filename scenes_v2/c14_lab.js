// ch14 The lab of the future: a dawn of a hundred little scientists across the city; the map fills in; two cables
// plugged together; the fully lit city from above; the bitter lesson; four lanterns on a hill.
(() => {
  const all = ['lf_lab', 'lf_plug', 'lf_lab2', 'lf_bitter', 'lf_steps'];
  const talk = t => speak(t, all);
  const DAWN = [[0, '#3E4A8A'], [.4, '#8A6AA0'], [.7, '#F0A080'], [1, '#FAD39A']];
  // a tiny lantern-carrying scientist (a mini Clawd silhouette)
  function mini(x, y, s, t, i) { const b = Math.abs(Math.sin(t * 5 + i)) * 3; boilSeed('mini' + (i % 5)); push(); translate(x, y - b); scale(s); paint(rectPts(-10, -14, 20, 10, 1), { wash: PAL.clay, ink: PAL.ink, sw: .6 }); inkLine([[-6, -4], [-6, 0]], 1.6, PAL.ink, 'ink', 0); inkLine([[6, -4], [6, 0]], 1.6, PAL.ink, 'ink', 0); pop(); glow(x + 12 * s, y - 16 * s - b, 14 * s, '#FFD58A', .8); }

  // 1 · the lab: little scientists spread across the city; the drafting-table map fills in
  function lab(t, lt, dur) {
    const a = cs('lf_lab'), e = ce('lf_lab');
    sky(t, DAWN, { stars: 40, starH: 300, clouds: 5, cloudY: 420, cloudCol: '#F2B8A8' });
    glow(1400, 640, 700, '#FFD9A0', .5);
    const cam = camKeys(t, [[a - .3, 2600, 520, .6], [e, 3400, 500, .62]], .2);
    cityPanorama(t, cam[0], { haze: '#F0A6A0', haze2: '#D08AA0' });
    const fill = seg(t, a + 1, e);
    cityStreet(t, { on: (i) => clamp(fill * 18 - i) * .7 + .2 });
    for (let i = 0; i < 120; i++) { const x = 600 + hash(i * 3.3) * 5400 + Math.sin(t * .5 + i) * 30, y = 905 + hash(i * 7.1) * 40; if (hash(i) > fill * 1.3 + .1) continue; mini(x, y, 2.6, t, i); }
    camEnd();
    // the drafting table map, inset bottom-right
    boilSeed('c14map'); paint(rectPts(1320, 640, 520, 360, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.4 });
    for (let i = 0; i < 20; i++) { const c = i % 5, r = Math.floor(i / 5), on_ = i < fill * 20; boilSeed('c14m' + i); paint(rrPts(1340 + c * 100, 660 + r * 82, 86, 70, 8), { wash: on_ ? ['#D9E3C9', '#E9D3C9', '#D3D9E9', '#E9E4C9'][i % 4] : '#FBF6EC', ink: PAL.ink, sw: .6 }); if (on_) inkLine([[1350 + c * 100, 690 + r * 82], [1410 + c * 100, 700 + r * 82]], 1.6, '#6A4B30', 'dry', .5); }
    title('a laboratory of automated scientists', 960, 140, 64, PAL.cream, seg(t, wt('lf_lab', 'laboratory') - .3, wt('lf_lab', 'scientists') + .4), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.35);
    chapterSign(t, t - chapStart('ch14'), cs('lf_lab') - chapStart('ch14') + 3, '14', 'The lab of the future');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#F6C08A', '#F4D9B5']);
  }

  // 2 · two cables: AGENTS + ARCHITECTURES
  function plug(t, lt, dur) {
    const a = cs('lf_plug'), e = ce('lf_plug'), tp = wt('lf_plug', 'plug');
    sky(t, DAWN, { stars: 20, clouds: 5, cloudY: 420, cloudCol: '#F2B8A8' });
    const surge = seg(t, tp, tp + 1.2);
    const cam = camKeys(t, [[a - .3, 3000, 520, .62], [e, 3000, 520, .64]], .2);
    cityPanorama(t, cam[0], { haze: '#F0A6A0', haze2: '#D08AA0' });
    cityStreet(t, { on: (i) => .3 + .7 * clamp(surge * 2 - i / 20) });
    camEnd();
    if (surge > 0 && surge < 1) glow(960, 700, 1400 * surge, '#FFE08A', .5 * (1 - surge));
    const join = ease(seg(t, tp - 1.2, tp));
    boilSeed('c14cab'); inkLine([[-40, 900], [300, 940], [lerp(560, 900, join), 880]], 12, '#3A3550', 'ink', .5); inkLine([[1960, 900], [1620, 940], [lerp(1360, 1020, join), 880]], 12, '#6A3A4A', 'ink', .5);
    paint(rrPts(lerp(560, 900, join) - 40, 850, 80, 60, 10), { wash: '#9AA3B5', ink: PAL.ink, sw: 1.2 }); paint(rrPts(lerp(1360, 1020, join) - 40, 850, 80, 60, 10), { wash: '#C9A15A', ink: PAL.ink, sw: 1.2 });
    letter('AGENTS', 380, 1010, 46, PAL.cream, { face: 'marker', shadow: false }); letter('ARCHITECTURES', 1540, 1010, 46, PAL.cream, { face: 'marker', shadow: false });
    if (join >= 1) sfx('click!', 960, 780, 50, PAL.ink, t - tp);
    clawd(lerp(760, 920, join), 840, 9, { ...emotions(t, [[a, 'determined'], [tp + .3, 'excited']]), view: 'q', boilKey: 'c14c' });
    title('the pieces already exist', 960, 140, 70, PAL.cream, seg(t, a + .2, a + 1.3), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.35);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#F6C08A', '#F4D9B5'] });
  }

  // 3 · high above the city at sunrise: fully lit, readable from coast to towers
  function lab2(t, lt, dur) {
    const a = cs('lf_lab2'), e = ce('lf_lab2'), tb = wt('lf_lab2', 'best'), tn = wt('lf_lab2', 'Now');
    sky(t, [[0, '#6A8AC8'], [.5, '#F0A080'], [1, '#FAD39A']], { clouds: 6, cloudY: 380, cloudCol: '#FFE0C8' });
    glow(1100, 560, 800, '#FFE0A0', .6);
    const cam = camKeys(t, [[a - .3, 3600, 400, .55], [e, 3600, 440, .36]], .2);
    cityPanorama(t, cam[0], { haze: '#F6C0A0', haze2: '#E0A0A8' });
    cityStreet(t, { on: () => .9 });
    for (let i = 0; i < 14; i++) streetArc(i, i + 1, 1, { sw: 6 });
    camEnd();
    if (t > tb - .4) title('the best laboratory in natural science', 960, 150, 64, PAL.ink, seg(t, tb - .4, tb + .7), { stroke: PAL.cream, strokeW: .1 });
    if (t > tn - .5) title('what we never had were enough scientists. now we do.', 960, 960, 46, PAL.cream, seg(t, wt('lf_lab2', 'never') - .3, tn + .5), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.3);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#F6C08A', '#F4D9B5'] });
  }

  // 4 · the bitter lesson: one clever contraption vs a field of thousands of scientists
  function bitter(t, lt, dur) {
    const a = cs('lf_bitter'), e = ce('lf_bitter'), tl = wt('lf_bitter', 'lesson'), ts = wt('lf_bitter', 'scaling');
    sky(t, [[0, '#7AA8D8'], [1, '#F4E3C0']], { clouds: 4, cloudY: 200, cloudCol: '#FFFFFF' });
    boilSeed('c14fd'); paint(rectPts(-300, 620, W + 600, 600, 1), { grad: [[0, '#8FBF73'], [1, '#4E8A44']], ink: PAL.ink, sw: 1 });
    camKeys(t, [[a - .3, 700, 640, 1.1], [ts, 1100, 600, .9], [e, 1100, 600, .88]], .3);
    machine(t, 360, 980, .5, { on: 1, mouth: .8 });
    hand('a clever way to take networks apart', 360, 520, 36, PAL.ink, on(t, a + .5), { stroke: PAL.cream, strokeW: .1 });
    const grow = seg(t, a + 1, ts + 1);
    for (let i = 0; i < 400; i++) { if (hash(i * 1.7) > grow) continue; const x = 800 + (i % 40) * 34 + (Math.floor(i / 40) % 2) * 17, y = 680 + Math.floor(i / 40) * 40; mini(x, y, 1.3, t, i); }
    if (t > ts - .3) hand('scaling ordinary investigation', 1460, 560, 44, PAL.ink, seg(t, ts - .3, ts + .7), { stroke: PAL.cream, strokeW: .1 });
    camEnd();
    title('the bitter lesson', 960, 140, 90, PAL.ink, seg(t, tl - .4, tl + .5), { stroke: PAL.cream, strokeW: .1 });
    if (t > wt('lf_bitter', 'Sutton') - .3) hand('Rich Sutton', 960, 230, 40, PAL.berry, seg(t, wt('lf_bitter', 'Sutton') - .3, wt('lf_bitter', 'Sutton') + .4));
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#7AA8D8', '#8FBF73'] });
  }

  // 5 · four lanterns on a hill
  const LAMPS = [['one principle', 'principle'], ['it works', 'Studying'], ['it compounds', 'compounds'], ['maybe enough', 'maybe']];
  function steps(t, lt, dur) {
    const a = cs('lf_steps'), e = ce('lf_steps');
    sky(t, [[0, '#1E2A5A'], [.6, '#8A6A9A'], [1, '#F0B08A']], { stars: 60, starH: 400 });
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 540, 1.05]], .3);
    boilSeed('c14hill'); paint(ellPts(960, 1180, 1300, 420, 40), { grad: [[0, '#4A5A4A'], [1, '#2A3A2A']], ink: PAL.ink, sw: 1.3 });
    LAMPS.forEach(([lab, w], i) => {
      const x = 390 + i * 380, y = 820 - Math.sin((i + .5) / 4 * Math.PI) * 60, tw = wt('lf_steps', w) || a + 1 + i * 2, k = seg(t, tw - .3, tw + .3);
      boilSeed('c14lp' + i); paint(rectPts(x - 5, y - 220, 10, 220, 1), { wash: '#3A3550', ink: PAL.ink, sw: .8 });
      paint(rrPts(x - 34, y - 300, 68, 90, 14), { wash: k > .5 ? '#FFE3A6' : '#6A6A7A', ink: PAL.ink, sw: 1.2 });
      if (k > 0) glow(x, y - 255, 200 * k, '#FFD36B', .8 * k);
      letter(lab.toUpperCase(), x, y - 360, 40, k > .5 ? '#FFE3A6' : '#9A9AB0', { face: 'marker', shadow: false });
    });
    prof(960, 1000, .5, { view: 'front', pose: gesture(t, [[a, 'explain'], [wt('lf_steps', 'maybe') - .4, 'open']]), mood: 'warm', talk: talk(t) });
    clawd(1120, 1000, 8, { ...feel('happy', t), view: 'front', boilKey: 'c14c2' });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1E2A5A', '#8A6A9A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#3E6A3A', '#5E9A4C']);
  }

  shots([[chapStart('ch14'), lab], [cs('lf_plug') - .3, plug], [cs('lf_lab2') - .3, lab2], [cs('lf_bitter') - .3, bitter], [cs('lf_steps') - .3, steps]]);
})();
