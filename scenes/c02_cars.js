// ch02 Cars and animals: the V neuron, the car→dogs "superposition" circuit, pose, reward hacking, nouns vs verbs.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2, BY = B.y + B.h / 2;
  const V = 'blog/raw/v-figure-10x/', SC = 'blog/raw/superposition-circuit/';
  const GRIDI = [V + 'p47742', V + 'c4d201c', V + 'c5a352d', V + 'c4d201d', V + 'c4d477c', V + 'pCarX5'];
  const gridPos = (i, cx = BX + 40, cy = 470, s = 250) => [cx + ((i % 3) - 1) * s, cy + (Math.floor(i / 3) - .5) * s * .95];

  function cardShot(t, lt, dur) { setStudy(t); clawd(300, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '02', 'Cars and animals', PAL.ochre); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.ochre, '#D9893B']); }

  // the famous neuron, cited everywhere, then seen as a V
  function famous(t, lt, dur) {
    const a = cs('ca_famous'), c = cs('ca_cited'), o = cs('ca_opened'), v = cs('ca_v'), e = ce('ca_v');
    setStudy(t);
    camKeys(t, [[a - .3, 960, 540, 1], [o + .5, 960, 540, 1], [o + 4, 1180, 480, 1.35], [v + .2, 1180, 480, 1.4], [e + .5, 1160, 480, 1.3]], .5);
    title('neuron 4e:55', BX + 40, 175, 64, PAL.ink, seg(t, a + .2, a + 1.2));
    hand('“cats and cars”', BX + 40, 245, 40, PAL.violet, seg(t, wt('ca_famous', 'cats') - .3, wt('ca_famous', 'cars') + .5));
    GRIDI.forEach((n, i) => { const [x, y] = gridPos(i); print(n, x, y, 210, popk(t, a + .6 + i * .18), { rot: (hash(i) - .5) * .08, key: 'g' + i }); });
    // the citations: paper cards that slide in over the grid's right side
    const kc = on(t, c, o + .5);
    if (kc > 0) {
      card(BX + 470, 330, 280, 170, { k: kc, text: 'Feature\nVisualization · 2017', size: 28, rot: .05, key: 'p1' });
      card(BX + 500, 520, 280, 170, { k: on(t, c + .5, o + .5), text: 'Zoom In · 2020', size: 30, rot: -.04, key: 'p2' });
      hand('“isn’t responding to some commonality\nof cars and cat faces”', BX + 40, 770, 34, PAL.slate, seg(t, wt('ca_cited', 'outright'), wt('ca_cited', 'faces') + .5) * (1 - seg(t, o + .3, o + .8)));
    }
    // the V appears on every photo
    const tv = wt('ca_v', 'V-shape') || v + 1;
    GRIDI.forEach((n, i) => {
      const k = seg(t, tv - .3 + i * .12, tv + .2 + i * .12); if (k <= 0) return;
      const [x, y] = gridPos(i); boilSeed('vline' + i);
      const P = [[x - 70, y - 60], [x, y + 50], [x + 70, y - 60]];
      inkLine(k < .5 ? [P[0], [lerp(P[0][0], P[1][0], k * 2), lerp(P[0][1], P[1][1], k * 2)]] : [P[0], P[1], [lerp(P[1][0], P[2][0], (k - .5) * 2), lerp(P[1][1], P[2][1], (k - .5) * 2)]], 7, PAL.ochre, 'ink', 0);
    });
    if (t > tv + .6) { swash(BX + 330, 760, 300, 120, '#F6E2B0', seg(t, tv + .6, tv + 1.1), 'vsw'); title('V', BX + 480, 760, 130, PAL.clayDk, seg(t, tv + .6, tv + 1)); }
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .5, 'confused'], [o + .5, 'thinking', { lookX: .9, lookY: -.4 }], [wt('ca_opened', 'one') , 'thinking', { lookX: .9, lookY: -.4, emote: 'dots' }], [v + .1, 'surprised'], [tv + .3, 'starstruck']], { point: [[a + .4, c]] });
  }

  // flames, fireboat jets, fox faces in; round things on the negative side
  function connections(t, lt, dur) {
    const a = cs('ca_connections'), n = cs('ca_negative'), e = ce('ca_negative');
    setCountry(t, { mood: 'dusk' });
    camKeys(t, [[a - .3, 860, 520, 1.1], [n - .2, 900, 520, 1.1], [n + 1.5, 1060, 520, 1.1]], .5);
    const NX = 960, NY = 460;
    const ins = [[V + 'c5a94a', 'flames', wt('ca_connections', 'flames')], [V + 'c5a94c', 'fireboat jets', wt('ca_connections', 'water')], [V + 'c4d493a', 'fox faces', wt('ca_connections', 'fox')]];
    ins.forEach(([im, lab, ta], i) => {
      const k = seg(t, ta - .3, ta + .4), x = 330, y = 230 + i * 230;
      wire(bow([x + 80, y], [NX - 70, NY], .1 * (i - 1)), seg(t, ta, ta + .8), { sw: 3.2 - i * .6, col: '#E0A36A', flow: 1, flowCol: '#FFD27A', key: 'in' + i });
      neuron(x, y, 80 * backOut(k), { img: im, on: .2, key: 'ins' + i, glow: false });
      if (k > .5) hand(lab, x, y + 110, 32, PAL.cream, k, { stroke: PAL.ink, strokeW: .1 });
    });
    neuron(NX, NY, 72, { img: V + 'fv-pointed', on: .7 + .2 * Math.sin(t * 4), key: 'vn' });
    hand('the V neuron', NX, NY + 110, 36, PAL.cream, on(t, a + .4), { stroke: PAL.ink, strokeW: .1 });
    const kq = seg(t, wt('ca_connections', 'flame', 1) - .4, wt('ca_connections', 'flame', 1) + .4);
    if (kq > 0) emote('?', 760, 280, 20, kq, t);
    // negative side: round things
    const kn = on(t, n + .2);
    const outs = [[V + 'n1070575', 1450, 260], [V + 'n1158528', 1640, 420], [V + 'n132986', 1450, 600], [V + 'n282687', 1640, 760]];
    outs.forEach(([im, x, y], i) => { const k = seg(t, wt('ca_negative', 'O') - .4 + i * .15, wt('ca_negative', 'O') + .2 + i * .15); if (k <= 0) return; wire(bow([NX + 70, NY], [x - 70, y], .05), k, { sw: 2.2, col: '#6E9BD0', key: 'out' + i, flow: kn * .8, flowCol: '#9CC4F0' }); neuron(x, y, 66 * backOut(k), { img: im, neg: .6, key: 'ng' + i, glow: false }); });
    if (kn > 0) { title('O', 1260, 520, 150, '#4E7FB8', seg(t, wt('ca_negative', 'O') - .2, wt('ca_negative', 'O') + .4)); hand('round, where the V is pointed', 1300, 900, 34, PAL.cream, seg(t, wt('ca_negative', 'Round') - .2, wt('ca_negative', 'pointed') + .4), { stroke: PAL.ink, strokeW: .1 }); }
    camEnd();
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#5E7F6E', '#8C6B9C'] });
  }

  // the blog's V figure, then the whiskers in its feature visualization
  function vfigure(t, lt, dur) {
    const a = cs('ca_whiskers'), e = ce('ca_whiskers');
    setStudy(t);
    const fw = 760, fh = fw * 1184 / 1320, fx = BX + 120, fy = 470;
    const z = camKeys(t, [[a - .3, 960, 540, 1], [wt('ca_whiskers', 'visualization') - .3, 960, 540, 1], [wt('ca_whiskers', 'visualization') + 1.2, fx - fw / 2 + .435 * fw, fy - fh / 2 + .17 * fh + 30, 2.1], [wt('ca_whiskers', 'optimizer') - .3, fx - fw / 2 + .435 * fw, fy - fh / 2 + .17 * fh + 30, 2.2], [wt('ca_whiskers', 'optimizer') + 1.2, fx - fw / 2 + .2 * fw, fy - fh / 2 + .2 * fh, 1.5], [e, fx, fy, 1.02]], .3);
    figure('blog/figs/fig001', fx, fy, fw, { k: on(t, a - .2), tape: true, key: 'f1' });
    ringBox(fx - fw / 2 + .38 * fw, fy - fh / 2 + .1 * fh, .12 * fw, .14 * fh, seg(t, wt('ca_whiskers', 'whiskers') - .3, wt('ca_whiskers', 'whiskers') + .4), PAL.berry, 2.4, 'wh');
    ringBox(fx - fw / 2 + .0 * fw, fy - fh / 2 + .0 * fh, .24 * fw, .5 * fh, seg(t, wt('ca_whiskers', 'cat') - .3, wt('ca_whiskers', 'cat') + .5), PAL.ochre, 2.2, 'cr');
    hand('the cat route brings whiskers along', fx, fy + fh / 2 + 50, 34, PAL.berry, seg(t, wt('ca_whiskers', 'ride') - 1, wt('ca_whiskers', 'ride') + .5));
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'thinking'], [wt('ca_whiskers', 'whiskers'), 'surprised'], [wt('ca_whiskers', 'ride') - .3, 'laugh']], { point: [[a + .5, e - .5]] });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#5E7F6E', '#8C6B9C'] });
  }

  // the 2019 circuit: a car going into four dogs; found at the first circuits interface; it was pose
  function circuit(t, lt, dur) {
    const a = cs('ca_circuit'), f = cs('ca_found'), p = cs('ca_pose'), r = cs('ca_nothing_reads'), e = ce('ca_nothing_reads');
    setStudy(t);
    const kA = on(t, a - .2, p - .2);
    if (kA > 0) {
      // rebuild "what we thought": car → four dogs → car, as painted lanterns with the blog's visualizations
      const car = [BX - 420, 470], car2 = [BX + 420, 470], dogs = [[BX - 90, 330], [BX + 90, 330], [BX - 90, 560], [BX + 90, 560]];
      const dims = ['4d417', '4d167', '4d295', '4d241'];
      neuron(car[0], car[1], 80 * backOut(seg(t, a, a + .5)), { img: SC + 'dream02/4c447', key: 'car1', glow: false, label: 'car', labelSize: 30, labelGap: 30 });
      dogs.forEach((d, i) => { const k = seg(t, wt('ca_circuit', 'dog') - .4 + i * .15, wt('ca_circuit', 'dog') + .2 + i * .15); wire(bow(car, d, .05), k, { sw: 2.4, col: '#B5895A', key: 'cd' + i, flow: on(t, wt('ca_circuit', 'dog') + 1, p) }); wire(bow(d, car2, .05), seg(t, wt('ca_circuit', 'recovered') - .4, wt('ca_circuit', 'recovered') + .4), { sw: 2.4, col: '#B5895A', key: 'dc' + i }); neuron(d[0], d[1], 70 * backOut(k), { img: SC + 'dream02/' + dims[i], key: 'dog' + i, glow: false }); });
      neuron(car2[0], car2[1], 80 * backOut(seg(t, wt('ca_circuit', 'recovered') - .3, wt('ca_circuit', 'recovered') + .3)), { img: SC + 'dream02/4c447', key: 'car2', glow: false, label: 'car again?', labelSize: 30, labelGap: 30 });
      title('the 2019 “superposition” circuit', BX, 175, 54, PAL.violet, seg(t, a + .2, a + 1.5));
      hand('a hidden storage place?', BX, 760, 36, PAL.violet, seg(t, wt('ca_circuit', 'storage') - .4, wt('ca_circuit', 'storage') + .6));
      // flashback tint during ca_found
      const fb = on(t, f, p - .3);
      if (fb > 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .35 * fb; ctx.fillStyle = '#C9A26B'; ctx.fillRect(0, 0, W, H); ctx.restore(); hand('2019', BX + 520, 200, 46, PAL.clayDk, fb); hand('“it must be a kind of folding…”', BX, 830, 34, PAL.ink, seg(t, wt('ca_found', 'folding') - .4, wt('ca_found', 'folding') + .8)); }
    }
    const kP = on(t, p - .1);
    if (kP > 0) {
      const fw = 1000, fh = fw * 858 / 1608, fx = BX + 30, fy = 470;
      figure('blog/figs/fig003', fx, fy, fw, { k: kP, tape: true, key: 'f3' });
      // arrows: each pair faces the same way
      const kr = seg(t, wt('ca_pose', 'face') - .3, wt('ca_pose', 'face') + 1);
      for (let i = 0; i < 4; i++) { const y = fy - fh / 2 + (.09 + i * .213) * fh; arrow([fx - fw / 2 + .2 * fw, y + 60], [fx - fw / 2 + .2 * fw + 140, y + 60], seg(kr, i * .2, i * .2 + .4), PAL.berry, 2, 0, 'pa' + i); }
      title('pose', fx - fw / 2 + 60, fy + fh / 2 + 60, 60, PAL.berry, seg(t, wt('ca_pose', 'pose') - .2, wt('ca_pose', 'pose') + .5));
      hand('100+ generalized pose neurons', fx + 150, fy + fh / 2 + 60, 36, PAL.ink, seg(t, wt('ca_pose', 'hundred') - .3, wt('ca_pose', 'hundred') + .7));
      const kd = on(t, r + .2);
      if (kd > 0) { ctx.save(); ctx.fillStyle = PAL.paper; ctx.globalAlpha = .75 * kd; ctx.fillRect(B.x, B.y, B.w, B.h); ctx.restore(); }
      if (kd > 0) {
        const root = [BX, 720], kids = [[BX - 330, 520], [BX, 470], [BX + 330, 520]], leaves = ['blog/raw/tiny-vehicles/positive-01', 'blog/raw/tiny-vehicles/positive-03', 'blog/raw/tiny-vehicles/positive-05'];
        neuron(root[0], root[1], 60, { img: SC + 'dream02/4c447', key: 'root', glow: false, label: 'car', labelSize: 30, labelGap: 26 });
        kids.forEach((k_, i) => { const kk = seg(t, wt('ca_nothing_reads', 'differentiate') - .3 + i * .2, wt('ca_nothing_reads', 'differentiate') + .3 + i * .2); wire(bow(root, k_, .04), kk, { sw: 2, key: 'rk' + i }); neuron(k_[0], k_[1], 56 * backOut(kk), { img: leaves[i], key: 'kid' + i, glow: false }); });
        hand('nothing reads the combination', BX, 230, 40, PAL.berry, seg(t, r, r + 1.2));
        hand('car specialists and finer poses', BX, 300, 36, PAL.sap, seg(t, wt('ca_nothing_reads', 'specialists') - .4, wt('ca_nothing_reads', 'specialists') + .6));
      }
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .5, 'suspicious'], [f + .3, 'shy'], [p + .3, 'surprised'], [wt('ca_pose', 'noticed'), 'idea'], [r + .5, 'proud']], { point: [[a + .3, f], [p + .3, e]] });
  }

  // reward hacking: a ball on a loss landscape falls into the dog basin; a nudge sends it to the car
  function basin(t, lt, dur) {
    const a = cs('ca_rewardhack'), d = cs('ca_dogs'), g = cs('ca_guided'), e = ce('ca_guided');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 520, 1], [g, 960, 520, 1], [wt('ca_guided', 'Two') - .5, 1040, 480, 1]], .5);
    // the landscape: a painted curve with two valleys (dog, car)
    const ground = x => 640 - 160 * Math.exp(-Math.pow((x - 700) / 170, 2)) * -1 * 0 + 120 * Math.sin((x - 300) / 260) * 0 + (x < 960 ? 260 * Math.exp(-Math.pow((x - 700) / 150, 2)) : 220 * Math.exp(-Math.pow((x - 1300) / 160, 2))) - 120 * Math.exp(-Math.pow((x - 980) / 120, 2));
    const P = []; for (let x = 220; x <= 1720; x += 30) P.push([x, ground(x) + 60]);
    boilSeed('land'); paint(P.concat([[1720, 900], [220, 900]]), { wash: '#C7B8A0', ink: PAL.ink, sw: 1.4, curv: .5 });
    hand('dog basin', 700, 1000, 44, PAL.violet, on(t, wt('ca_dogs', 'dogs') - .4)); neuron(700, 880, 64 * on(t, wt('ca_dogs', 'dogs') - .4), { img: SC + 'dream02/4d167', glow: false, key: 'dgb' });
    hand('car', 1300, 980, 44, PAL.clayDk, on(t, g)); neuron(1300, 860, 64 * on(t, g), { img: SC + 'domain60_dream02/167-car', glow: false, key: 'crb' });
    title('feature visualization takes the easiest path', 960, 160, 52, PAL.ink, seg(t, a + .3, a + 2));
    // the ball: starts on the ridge, rolls into the dog basin; with the nudge it rolls to the car
    const t1 = wt('ca_rewardhack', 'easiest'), tn = wt('ca_guided', 'nudge');
    let bx;
    if (t < tn) bx = lerp(980, 720, easeIn(seg(t, t1 - .5, t1 + 1.2)) ** .7);
    else bx = kf(t, [[tn - .1, 720], [tn + .4, 780], [tn + 1.6, 1290]], easeInOut);
    const wob_ = t > t1 + 1.2 && t < tn ? 10 * Math.sin(t * 6) * Math.exp(-(t - t1 - 1.2)) : 0;
    boilSeed('ball'); paint(ellPts(bx + wob_, ground(bx + wob_) + 60 - 32, 30, 30, 18), { wash: PAL.ochre, ink: PAL.ink, sw: 1.2 });
    if (t > tn - .3 && t < tn + .8) arrow([bx - 140, ground(bx) - 40], [bx - 40, ground(bx) + 10], seg(t, tn - .3, tn), PAL.sap, 3, -.2, 'nudge');
    hand('…and never recovers', 700, 360, 40, PAL.berry, on(t, wt('ca_dogs', 'recovers') - .4, tn - .2));
    hand('nudge it toward the paths real images take', 1150, 360, 38, PAL.sap, on(t, tn - .3));
    camEnd();
    // the guided result
    const kr = on(t, wt('ca_guided', 'Two') - .5);
    if (kr > 0) figure('blog/figs/fig002', 1460, 300, 620, { crop: [860, 0, 820, 520], k: kr, rot: .03, key: 'f2r' });
    clawd(260, 960, 20, emotions(t, [[a - 1, 'neutral'], [t1 + .5, 'surprised', { lookX: .8 }], [d + .6, 'sad', { lookX: .8 }], [tn - .2, 'determined', { lookX: .8 }], [tn + 1.6, 'happy']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe' });
  }

  // bigger models still generalize pose; nouns vs verbs; the trick; the clues
  function nouns(t, lt, dur) {
    const a = cs('ca_bigger'), n = cs('ca_nouns'), v = cs('ca_verb'), e = ce('ca_verb');
    setCountry(t, { mood: 'day' });
    const kA = on(t, a - .2, n);
    if (kA > 0) {
      figure('blog/figs/fig003', 960, 470, 1200, { crop: [0, 0, 1608, 170], k: kA, key: 'dino' });
      hand('DINOv2 · more than ten times the size · still generalized', 960, 640, 40, PAL.ink, seg(t, wt('ca_bigger', 'DINOv2'), wt('ca_bigger', 'generalized') + .6));
      hand('every vision model, of any size', 960, 710, 36, PAL.sap, seg(t, wt('ca_bigger', 'every') - .3, wt('ca_bigger', 'size') + .4));
    }
    const kN = on(t, n);
    if (kN > 0) {
      // a fork in the road; the neuron is the switch; V things go one way, O things the other
      boilSeed('road'); const ink = PAL.ink;
      paint([[860, 1100], [1060, 1100], [1010, 620], [910, 620]], { wash: '#D9C29A', ink, sw: 1.1 });
      paint([[910, 640], [1010, 640], [700, 330], [600, 380]], { wash: '#D9C29A', ink, sw: 1.1 });
      paint([[910, 640], [1010, 640], [1360, 380], [1260, 330]], { wash: '#D9C29A', ink, sw: 1.1 });
      neuron(960, 610, 56, { img: V + 'fv-pointed', on: .6, key: 'sw' });
      const travel = (im, side, i) => { const ta = v + .8 + i * 1.3, f = seg(t, ta, ta + 2.2); if (f <= 0 || f >= 1) return; const p = f < .5 ? [960, lerp(1060, 640, f * 2)] : [lerp(960, side < 0 ? 650 : 1310, (f - .5) * 2), lerp(640, 360, (f - .5) * 2)]; neuron(p[0], p[1], 44, { img: im, key: 'tr' + i, glow: false }); };
      [[V + 'pPool13', 1], [V + 'n1070575', -1], [V + 'pTrain34', 1], [V + 'n1158528', -1], [V + 'p10704', 1], [V + 'n282687', -1]].forEach(([im, s], i) => travel(im, s, i));
      title('V →', 1330, 300, 60, PAL.clayDk, seg(t, v + 1, v + 1.6)); title('← O', 600, 300, 60, '#4E7FB8', seg(t, v + 1.5, v + 2.1));
      const kno = seg(t, n + .2, n + 1.2);
      card(420, 820, 380, 150, { k: kno * (1 - seg(t, v, v + .5)), text: 'noun: cats + cars', size: 38, key: 'noun' }); cross(420, 820, 200, seg(t, wt('ca_nouns', 'shared') - .3, wt('ca_nouns', 'shared') + .2) * (1 - seg(t, v, v + .5)));
      card(1500, 820, 420, 150, { k: seg(t, v + .2, v + .8), text: 'verb: separate V from O', size: 38, col: '#E7F0DC', key: 'verb' });
    }
    clawd(250, 960, 22, emotions(t, [[a - 1, 'neutral'], [a + .4, 'proud'], [n + .3, 'thinking'], [v + .3, 'idea'], [v + 2, 'happy']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.sap, PAL.moss] });
  }
  function trick(t, lt, dur) {
    const a = cs('ca_trick'), c = cs('ca_clues'), e = ce('ca_clues');
    setStudy(t);
    title('describe it without nouns', BX, 190, 60, PAL.ink, seg(t, a + .2, a + 1.6));
    const kb = seg(t, wt('ca_trick', 'bullet') - .3, wt('ca_trick', 'bullet') + .3), kp = seg(t, wt('ca_trick', 'pool') - .3, wt('ca_trick', 'pool') + .3);
    print(V + 'pTrain34', BX - 250, 470, 300, kb * (1 - on(t, c, Infinity, .4)), { key: 'tr' }); print(V + 'pPool13', BX + 250, 470, 300, kp * (1 - on(t, c, Infinity, .4)), { key: 'pl' });
    for (const [x, k] of [[BX - 250, kb], [BX + 250, kp]]) if (k > .8 && t < c) { boilSeed('vt' + x); inkLine([[x - 90, 380], [x, 520], [x + 90, 380]], 6, PAL.ochre, 'ink', 0); }
    const kc = on(t, c);
    if (kc > 0) {
      card(BX, 380, 640, 170, { k: popk(t, c + .1), text: 'a few grouped meanings = a clue\nto how the network thinks', size: 38, col: '#E7F0DC', key: 'clue' });
      const items = [['sometimes the extra meanings melt away', wt('ca_clues', 'melt')], ['sometimes it’s just our tools being bad', wt('ca_clues', 'tools')], ['keep the neuron whole → errors stay visible', wt('ca_clues', 'whole')]];
      notes(t, BX - 330, 570, items.map(([s, ta]) => [ta - .2, s]), { size: 36, gap: 70 });
    }
    presenter(t, 300, 960, 22, [[a - 1, 'happy'], [a + .4, 'playful'], [c + .3, 'thinking'], [wt('ca_clues', 'tools'), 'shy'], [wt('ca_clues', 'whole'), 'proud']], { point: [[a + .3, e]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2E4A57', '#3E6170']);
  }

  shots([
    [chapStart('ch02'), cardShot],
    [cs('ca_famous') - .25, famous],
    [cs('ca_connections') - .3, connections],
    [cs('ca_whiskers') - .3, vfigure],
    [cs('ca_circuit') - .3, circuit],
    [cs('ca_rewardhack') - .3, basin],
    [cs('ca_bigger') - .3, nouns],
    [cs('ca_trick') - .3, trick],
  ]);
})();
