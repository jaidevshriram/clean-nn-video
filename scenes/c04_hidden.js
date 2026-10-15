// ch04 The case of the hidden car: the famous superposition circuit; the car "hidden" in a dog locker; the lazy
// Sketch Artist paints dogs; a nudge repaints two as cars; the other two are pose neurons; a hundred pose neurons;
// DINOv2 has them too.
(() => {
  const SC = 'blog/raw/superposition-circuit/', PE = 'blog/raw/pose-everywhere/', TV = 'blog/raw/tiny-vehicles/';
  const IDS = ['417', '167', '295', '241'], DOG = IDS.map(n => SC + 'dream02/4d' + n), CAR = IDS.map(n => SC + 'domain60_dream02/' + n + '-car');
  const all = ['hc_scene', 'hc_story', 'hc_artist', 'hc_nudge', 'hc_pose', 'hc_hundred', 'hc_bigger'];
  const talk = t => speak(t, all);
  const DX = i => 640 + i * 300;   // the four dog buildings
  function tape(x0, x1, y, k) { if (k <= 0) return; const n = Math.round(12 * k); for (let i = 0; i < n; i++) { const a = x0 + (x1 - x0) * i / 12, b = x0 + (x1 - x0) * (i + 1) / 12; boilSeed('tp' + i + y); paint([[a, y - 12 + 6 * Math.sin(i)], [b, y - 12 + 6 * Math.sin(i + 1)], [b, y + 12 + 6 * Math.sin(i + 1)], [a, y + 12 + 6 * Math.sin(i)]], { wash: i % 2 ? PAL.gold : PAL.ink, ink: null }); } }
  function car(x, y, s, col = PAL.berry) { boilSeed('car' + col); push(); translate(x, y); scale(s); paint(rrPts(-50, -34, 100, 26, 10), { wash: col, ink: PAL.ink, sw: 1 }); paint([[-30, -34], [-18, -54], [22, -54], [34, -34]], { wash: mixCol(col, '#FFFFFF', .3), ink: PAL.ink, sw: 1 }); paint(ellPts(-28, -8, 11, 11, 12), { wash: PAL.ink, ink: null }); paint(ellPts(28, -8, 11, 11, 12), { wash: PAL.ink, ink: null }); pop(); glow(x, y - 30 * s, 70 * s, '#FFE08A', .5); }
  function circuitStreet(t, o = {}) {
    sky(t, [[0, '#121636'], [.7, '#2E2A5C'], [1, '#55487A']], { stars: 90, starH: 400 });
    skyline('c4b', -300, 2300, 800, { depth: .65, bh: 260, bw: 110, lit: .2 });
    boilSeed('c4gr'); paint(rectPts(-300, 840, W + 600, 300, 1), { grad: [[0, '#38345E'], [1, '#1E1A36']], ink: PAL.ink, sw: 1 });
    // car building at the left; four dog buildings; car building on the right
    lightRoad([[300, 700], [DX(0), 560], [DX(3), 560], [1640, 700]], 26, 1, { col: '#FFC766', pulses: o.pulses ?? 4, speed: .4 });
    for (let i = 0; i < 4; i++) lightRoad([[300, 700], [DX(i), 520], [1640, 700]], 10, 1, { col: '#FFC766', pulses: 1, speed: .3 + i * .05 });
    neuronHouse(260, 880, 220, 320, { roof: 'flat', on: .7, imgs: [TV + 'positive-03', TV + 'positive-07'], cols: 1, key: 'c4cl', col: '#3E5A7A', sign: 'car', awning: false });
    neuronHouse(1660, 880, 220, 320, { roof: 'flat', on: .7, imgs: [TV + 'positive-01', TV + 'positive-04'], cols: 1, key: 'c4cr', col: '#3E5A7A', sign: 'car', awning: false });
    for (let i = 0; i < 4; i++) { const im = o.img ? o.img(i) : DOG[i]; neuronHouse(DX(i), 880, 200, 280, { roof: o.roof ? o.roof(i) : 'peak', on: .5 + .3 * Math.sin(t * 2 + i), imgs: [im], cols: 1, key: 'c4d' + i, col: o.col ? o.col(i) : '#7A5A3A', awning: false, sign: o.sign ? o.sign(i) : 'dog?' }); }
  }

  // 1 · the scene of the crime (+ a 2019 flashback), and the story we told
  function scene(t, lt, dur) {
    const a = cs('hc_scene'), st = cs('hc_story'), e = ce('hc_story'), t19 = wt('hc_scene', '2019');
    const flash = env(t, t19 - .3, wt('hc_scene', 'main') - .2, .3, .3);
    circuitStreet(t);
    camKeys(t, [[a - .3, 960, 560, .92], [st, 960, 600, 1], [e, 1050, 640, 1.1]], .3);
    tape(500, 1440, 900, seg(t, a + .8, a + 2.4));
    // the car signal drives in and hides in a doghouse locker; later it is fetched again
    const tl = wt('hc_story', 'storage') || st + 4, tp = wt('hc_story', 'later') || st + 6;
    const drive = seg(t, st + .6, tl), out = seg(t, tp, e + .6);
    if (t > st + .6) { const x = out > 0 ? lerp(DX(1), 1640, ease(out)) : lerp(300, DX(1), ease(drive)), y = out > 0 ? lerp(800, 860, out) : lerp(860, 800, drive); if (!(drive >= 1 && out <= 0)) car(x, y, .9); else { boilSeed('c4lk'); paint(rrPts(DX(1) - 40, 740, 80, 60, 8), { wash: '#C9A15A', ink: PAL.ink, sw: 1.1 }); paint(ellPts(DX(1), 764, 8, 8, 10), { wash: PAL.ink, ink: null }); paint([[DX(1) - 5, 766], [DX(1) + 5, 766], [DX(1) + 3, 786], [DX(1) - 3, 786]], { wash: PAL.ink, ink: null }); } }
    if (t > st) hand('a secret storage locker?', 960, 140, 54, PAL.cream, seg(t, wt('hc_story', 'secret') - .4, wt('hc_story', 'locker') + .5), { stroke: PAL.ink, strokeW: .14 });
    clawd(1820, 1010, 9, { ...emotions(t, [[a, 'suspicious'], [tl, 'surprised'], [tp, 'confused']]), view: 'q', flip: true, boilKey: 'c4c' });
    camEnd();
    if (flash > 0) {
      ctx.save(); ctx.globalAlpha = flash;
      setStudy(t, { board: false });
      boilSeed('c4pc'); paint(rrPts(1000, 380, 520, 360, 16), { wash: '#3A3550', ink: PAL.ink, sw: 1.4 }); paint(rrPts(1030, 410, 460, 290, 6), { wash: '#BFE0D0', ink: null });
      for (let i = 0; i < 4; i++) { const I = img(DOG[i]); ctx.drawImage(I, 1050 + i * 110, 470, 100, 100); }
      prof(700, 990, .64, { beard: false, view: 'q', pose: 'present', mood: 'surprise', colors: { hair: '#4A3530' } });
      grade('#C9A26B', .55); vignette(.6, '#3A2414');
      hand('2019', 1700, 140, 56, '#5A3A20', 1);
      ctx.restore();
    }
    vignette(.45);
    chapterSign(t, t - chapStart('ch04'), cs('hc_scene') - chapStart('ch04') + 3, '4', 'The case of the hidden car');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // 2 · the lazy artist: deep in the network, the easiest painting is a dog. A hill with a dog valley.
  function hill(t, x, y, w, ballK, o = {}) {
    // a landscape of "easiest paintings": a deep dog valley and a shallower car valley, separated by a ridge
    const P = []; for (let i = 0; i <= 60; i++) { const u = i / 60; P.push([x + u * w, y - 60 + 220 * Math.exp(-(((u - .3) / .13) ** 2)) + 130 * Math.exp(-(((u - .76) / .1) ** 2)) - 80 * Math.exp(-(((u - .55) / .08) ** 2))]); }
    boilSeed('c4hill'); paint(P.concat([[x + w, y + 260], [x, y + 260]]), { grad: [[0, '#8FB07A'], [1, '#4E7A4A']], gdir: [0, y - 140, 0, y + 260], ink: PAL.ink, sw: 1.3 });
    letter('dog', x + w * .3, y + 220, 44, '#2E4A2E', { face: 'marker', shadow: false });
    letter('car', x + w * .76, y + 130, 40, '#2E4A2E', { face: 'marker', shadow: false, alpha: o.carA ?? 1 });
    // the brush-ball: starts near the ridge, rolls into a valley (u along the curve)
    const u = o.u ?? .45, j = Math.round(u * 60), p = P[Math.max(0, Math.min(60, j))];
    boilSeed('c4bb'); paint(ellPts(p[0], p[1] - 24, 24, 24, 16), { wash: PAL.berry, ink: PAL.ink, sw: 1.1 });
    return P;
  }
  function lazy(t, lt, dur) {
    const a = cs('hc_artist'), n = cs('hc_nudge'), e = ce('hc_nudge'), td = wt('hc_artist', 'dog'), tn = wt('hc_nudge', 'Nudge'), tc = wt('hc_nudge', 'car');
    sky(t, [[0, '#E9D9C0'], [1, '#D8BE98']], { clouds: 4, cloudY: 160, cloudCol: '#FFFFFF' });
    camKeys(t, [[a - .3, 960, 540, 1], [n, 960, 560, 1.02], [e, 960, 540, .98]], .3);
    // the hill on the right half: the ball rolls into the dog valley again and again; the nudge sends it to cars
    const rep = frac((t - a) / 2.4), uDog = t < tn ? lerp(.47, .3, easeIn(clamp(rep * 1.5))) : null;
    const nk = seg(t, tn, tn + 1.6), uCar = lerp(.5, .76, easeOut(nk));
    hill(t, 980, 620, 860, 1, { u: t < tn ? uDog : uCar });
    if (t > tn - .4 && t < tn + .8) { const k = seg(t, tn - .4, tn); inkLine([[1360 - 140 * (1 - k), 520], [1440, 540]], 5, '#7A5B3E', 'ink', 0); }
    // the artist paints the four portraits in turn: dogs, then (after the nudge) two repaint as cars
    const cur = Math.min(3, Math.floor(clamp((t - a) / ((n - a) || 1)) * 4));
    for (let i = 0; i < 4; i++) {
      const x = 130 + i * 200, y = 300, k = seg(t, a + i * .8, a + i * .8 + .6), rep2 = i < 2 ? seg(t, tc - .4 + i * .3, tc + .6 + i * .3) : 0;
      if (k <= 0) continue;
      boilSeed('c4fr' + i); paint(rectPts(x - 8, y - 8, 176, 176, 1), { wash: '#8C6A48', ink: PAL.ink, sw: 1.1 });
      const I = img(DOG[i]); ctx.save(); ctx.globalAlpha = k; ctx.drawImage(I, x, y, 160, 160); ctx.restore();
      if (rep2 > 0) { const J = img(CAR[i]); ctx.save(); const P = new Path2D(); P.rect(x, y, 160 * rep2, 160); ctx.clip(P); ctx.drawImage(J, x, y, 160, 160); ctx.restore(); }
      letter(rep2 > .5 ? 'car!' : 'dog?', x + 80, y + 196, 32, rep2 > .5 ? '#3A64B8' : '#6A3A20', { face: 'hand', shadow: false });
    }
    artist(t, 300, 980, 1.25, { img: DOG[3], k: 1, img2: CAR[0], k2: seg(t, tc, tc + 1), paintCol: t < tc ? '#C77B3A' : '#3A64B8' });
    clawd(860, 1000, 10, { ...emotions(t, [[a, 'bored'], [tn - 1, 'determined'], [tc, 'proud']]), view: 'q', flip: t < tn - 1, boilKey: 'c4c2' });
    const kt = seg(t, wt('hc_artist', 'lazy') - .3, wt('hc_artist', 'lazy') + .6) * (1 - seg(t, n - .5, n));
    if (kt > 0) title('the artist gets lazy', 1400, 160, 64, PAL.ink, kt, { stroke: PAL.cream, strokeW: .1 });
    if (t > n) hand('a nudge toward real photos', 1400, 160, 50, PAL.berry, seg(t, tn - .2, tn + .8));
    camEnd();
    vignette(.3, '#3A2414');
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#D8BE98', '#B98E64'] });
  }

  // 3 · pose neurons: dog and car, facing the same way. Clawd turns his head to match.
  const POSE = [[PE + 'small/0', PE + 'small/1', -1], [PE + 'small/2', PE + 'small/3', 1], [PE + 'small/6', PE + 'small/7', -1]];
  function pose(t, lt, dur) {
    const a = cs('hc_pose'), e = ce('hc_pose'), tf = wt('hc_pose', 'facing'), tp = wt('hc_pose', 'pose');
    circuitStreet(t, { pulses: 2, img: i => i < 2 ? CAR[i] : (i === 2 ? PE + 'small/0' : PE + 'small/2'), sign: i => i < 2 ? 'car' : 'pose', col: i => i < 2 ? '#3E5A7A' : '#5A7A4A' });
    camKeys(t, [[a - .3, 1250, 600, 1.3], [tf, 1350, 560, 1.6], [e, 1300, 560, 1.4]], .3);
    // the two pose buildings: their windows alternate dog / car, with a painted direction arrow on the street
    [2, 3].forEach((i, k) => {
      const [d, c, dir] = POSE[k], x = DX(i), sw = Math.floor(t * .9 + k) % 2, pk = popk(t, a + .6 + k * .4, .6);
      if (pk <= 0) return;
      boilSeed('c4pw' + k); paint(rectPts(x - 86, 470, 172, 172, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1 });
      const I = img(sw ? c : d), s = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha = backOut(pk) > 1 ? 1 : pk; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, x - 80, 476, 160, 160); ctx.restore();
      arrow([x - dir * 70, 960], [x + dir * 70, 960], seg(t, tf - .4 + k * .2, tf + .3 + k * .2), '#FFD36B', 5, 0, 'c4ar' + k);
    });
    const look = Math.sin((t - tf) * 1.8) > 0 ? -1 : 1;
    clawd(1700, 1010, 10, { ...emotions(t, [[a, 'thinking'], [tp, 'happy']]), view: t > tf ? 'side' : 'q', flip: t > tf && look < 0, boilKey: 'c4c3' });
    camEnd();
    const kt = seg(t, tp - .4, tp + .5);
    if (kt > 0) title('pose neurons', 960, 150, 96, '#9FE3C8', kt, { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#121636', '#2E2A5C'] });
  }

  // 4 · more than a hundred pose neurons; the car route keeps going and branches into specific car neurons
  function hundred(t, lt, dur) {
    const a = cs('hc_hundred'), e = ce('hc_hundred'), tk = wt('hc_hundred', 'kept'), tsp = wt('hc_hundred', 'splitting');
    sky(t, [[0, '#121636'], [.7, '#2E2A5C'], [1, '#55487A']], { stars: 120, starH: 500 });
    const cam = camKeys(t, [[a - .3, 300, 640, 1.5], [a + 3, 220, 600, .85], [tk, 1100, 560, .7], [e + .5, 1900, 560, .75]], .3);
    boilSeed('c4g2'); paint(rectPts(-1600, 840, 5200, 400, 1), { grad: [[0, '#38345E'], [1, '#1E1A36']], ink: PAL.ink, sw: 1 });
    // a district of ~100 tiny pose houses, each with a direction arrow
    for (let i = 0; i < 110; i++) {
      const c = i % 22, r = Math.floor(i / 22), x = -700 + c * 80 + (r % 2) * 40, y = 860 - r * 56, k = popk(t, a + .3 + hash(i) * 2.2, .4);
      if (k <= 0) continue;
      const dir = hash(i * 3.7) > .5 ? 1 : -1, lit = .4 + .4 * Math.sin(t * 2 + i);
      boilSeed('c4ph' + (i % 9)); push(); translate(x, y); scale(backOut(k) * (1 - r * .1));
      glow(0, -30, 50, '#9FE3C8', .25 * lit);
      paint(rectPts(-26, -50, 52, 50, 1), { wash: ['#5A7A4A', '#4A6A5A', '#6A7A4A'][i % 3], ink: PAL.ink, sw: .8 }); paint([[-32, -50], [0, -72], [32, -50]], { wash: '#9C4A35', ink: PAL.ink, sw: .7 });
      inkLine([[-14 * dir, -26], [14 * dir, -26], [6 * dir, -34]], 1.6, '#FFE08A', 'ink', 0);
      pop();
    }
    hand('100+ pose neurons, each one clean', 200, 380, 60, PAL.cream, seg(t, wt('hc_hundred', 'hundred') - .3, wt('hc_hundred', 'clean') + .3), { stroke: PAL.ink, strokeW: .14 });
    // the car route continues and branches into specific car neurons: taxis, vans, fire trucks, trams
    const SPEC = [TV + 'positive-01', TV + 'positive-02', TV + 'positive-04', TV + 'positive-05', TV + 'positive-07', TV + 'positive-08'];
    lightRoad([[1000, 700], [1500, 640], [1900, 600]], 30, seg(t, tk - .6, tk + .8), { col: '#FFC766', pulses: 3 });
    SPEC.forEach((im, i) => {
      const yy = 360 + i * 110, k = seg(t, tsp - .3 + i * .2, tsp + .5 + i * .2);
      lightRoad([[1900, 600], [2150, yy], [2400, yy]], 12, k, { col: '#FFC766', pulses: 1 });
      neuronHouse(2480, yy + 60, 120, 120, { roof: 'flat', on: .7, imgs: [im], cols: 1, key: 'c4sp' + i, col: '#3E5A7A', awning: false, k: popk(t, tsp + .2 + i * .2, .5) });
    });
    if (t > tk - .5 && t < tsp + 1) { const k = seg(t, tk - .5, tsp + .5); car(lerp(1000, 1900, ease(k)), lerp(700, 600, k), .8); }
    camEnd();
    if (t > wt('hc_hundred', 'nothing') - .2) hand('nothing was hiding', 960, 150, 56, PAL.cream, seg(t, wt('hc_hundred', 'nothing') - .2, wt('hc_hundred', 'hiding') + .5) * (1 - seg(t, tk, tk + .4)), { stroke: PAL.ink, strokeW: .14 });
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#121636', '#2E2A5C'] });
  }

  // 5 · "but a bigger model would separate them": a much bigger, shinier city on another hill. Telescope view.
  function bigger(t, lt, dur) {
    const a = cs('hc_bigger'), e = ce('hc_bigger'), td = wt('hc_bigger', 'Dino'), tev = wt('hc_bigger', 'Every');
    sky(t, [[0, '#1E2A5A'], [.6, '#4A5A8C'], [1, '#C98E9A']], { stars: 60, starH: 300 });
    camKeys(t, [[a - .3, 960, 560, 1], [td, 1180, 480, 1.08], [e, 1100, 520, 1.02]], .3);
    // the far hill with a big gleaming city (DINOv2)
    boilSeed('c4fh'); paint(ellPts(1350, 1000, 900, 380, 40), { grad: [[0, '#5A6A9A'], [1, '#2E3A66']], ink: PAL.ink, sw: 1.2 });
    skyline('c4dino', 800, 1900, 760, { depth: .45, bh: 420, bw: 120, lit: .6, glowK: 1, col: '#5A6AA0', win: '#BFE6FF', haze: '#8FA6D8' });
    glow(1350, 520, 600, '#9FD8FF', .35 * on(t, td - 1));
    if (t > td - .5) title('DINOv2', 1350, 300, 80, '#E5F2FF', on(t, td - .4), { stroke: '#1B1F4A', strokeW: .14 });
    // our small city on the near hill
    boilSeed('c4nh'); paint(ellPts(200, 1100, 600, 300, 30), { grad: [[0, '#4A4A7A'], [1, '#2A2A4A']], ink: PAL.ink, sw: 1.2 });
    skyline('c4small', -200, 560, 860, { depth: .1, bh: 160, bw: 70, lit: .4 });
    // telescope + the Professor looking through it; inset circle shows DINOv2's pose pair
    boilSeed('c4tel'); push(); translate(540, 860); rotate(-.35); paint(rrPts(-20, -26, 260, 52, 14), { wash: '#B08A4A', ink: PAL.ink, sw: 1.2 }); paint(rrPts(200, -34, 70, 68, 12), { wash: '#8C6A3A', ink: PAL.ink, sw: 1.1 }); pop();
    inkLine([[560, 880], [500, 1000]], 5, '#6A4B30', 'ink', 0); inkLine([[560, 880], [620, 1000]], 5, '#6A4B30', 'ink', 0);
    prof(430, 1000, .6, { view: 'q', pose: gesture(t, [[a, 'explain'], [td - .5, { aL: [.5, 1.6], aR: [.9, 1.8] }], [tev - .3, 'present']]), mood: t > tev ? 'happy' : 'think', look: [.9, -.6], talk: talk(t) });
    const ik = seg(t, td + .4, td + 1.2) * (1 - seg(t, e - .3, e + .3));
    if (ik > 0) {
      const cx = 1400, cy = 560, r = 250 * ease(ik), sw = Math.floor((t - td) * .8) % 4;
      const pair = [[PE + 'dino/0', PE + 'dino/1'], [PE + 'dino/2', PE + 'dino/3'], [PE + 'dino/4', PE + 'dino/5'], [PE + 'dino/6', PE + 'dino/7']][sw];
      boilSeed('c4ins'); paint(ellPts(cx, cy, r + 14, r + 14, 40), { wash: '#2A2340', ink: PAL.ink, sw: 1.6 });
      ctx.save(); const P = new Path2D(); P.arc(cx, cy, r, 0, TAU); ctx.clip(P); ctx.fillStyle = '#F3EBDC'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      pair.forEach((im, j) => { const I = img(im), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, cx - r + 20 + j * r, cy - r * .5, r * .96, r * .96); });
      ctx.restore();
      letter('same pose', cx, cy + r * .72, 40, PAL.ink, { face: 'hand', shadow: false, reveal: ik });
    }
    hand('10× bigger · 10 years newer', 1350, 170, 46, PAL.cream, seg(t, wt('hc_bigger', 'ten') - .3, wt('hc_bigger', 'newer') + .3), { stroke: PAL.ink, strokeW: .14 });
    stamp('CASE 2: SOLVED', 1500, 940, tev + 1.4, t, { size: 52 });
    clawd(760, 1010, 9, { ...emotions(t, [[a, 'neutral'], [td + .6, 'surprised'], [tev + 1.5, 'excited']]), view: 'q', boilKey: 'c4c4' });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1E2A5A', '#4A5A8C'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch04'), scene], [cs('hc_artist') - .3, lazy], [cs('hc_pose') - .3, pose], [cs('hc_hundred') - .3, hundred], [cs('hc_bigger') - .3, bigger]]);
})();
