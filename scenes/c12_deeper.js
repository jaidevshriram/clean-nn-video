// ch12 Further down the rabbit hole: why networks generalize (the race), circuit ecology, packing by hand, toy models,
// the playground, scale and the long tail, explanations that could lose, adversarial examples, dreary, edge motifs.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2, OI = 'blog/raw/one-image-logits/', OE = 'blog/raw/one-example-generalization/';
  function cardShot(t, lt, dur) { setCountry(t, { mood: 'day' }); clawd(400, 960, 22, feel('excited', t)); chapterCard(t, lt, dur + .3, '12', 'Further down the rabbit hole', PAL.sap); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.sap, PAL.moss]); }

  function race(t, lt, dur) {
    const a = cs('ap_intro'), g = cs('ap_why_gen'), r = cs('ap_race'), r2 = cs('ap_race2'), l = cs('ap_labrador'), te = cs('ap_ten'), e = ce('ap_ten');
    setCountry(t, { mood: 'day' });
    const kI = on(t, a, g + .5);
    if (kI > 0) title('the appendix', 960, 200, 64, PAL.ink, seg(t, a + .2, a + 1.2));
    const kG = on(t, g - .1, r);
    if (kG > 0) {
      title('why do networks generalize at all?', 960, 200, 56, PAL.ink, seg(t, g + .2, g + 1.6));
      for (let i = 0; i < 6; i++) print(OE + ['train-labrador', 'train-sports-car', 'train-goldfinch', 'train-daisy', 'train-zebra', 'train-church'][i], 520 + i * 180, 470, 150, seg(t, wt('ap_why_gen', 'one') - .3 + i * .1, wt('ap_why_gen', 'one') + .2 + i * .1), { key: 'ot' + i });
      hand('one example at a time — it could memorize every one', 960, 640, 38, PAL.ink, seg(t, wt('ap_why_gen', 'memorize') - .5, wt('ap_why_gen', 'one', 2) + .3));
      hand('common guess: memorize first, generalize later', 960, 720, 36, PAL.violet, seg(t, wt('ap_why_gen', 'guess') - .3, wt('ap_why_gen', 'pass') + .3));
    }
    const kR = on(t, r - .1, l);
    if (kR > 0) {
      print(OI + 'trained-on', 380, 450, 300, kR, { key: 'lab' });
      hand('one photo', 380, 640, 34, PAL.ink, kR);
      // two racers: the exact pixel circuit and the broad grass/fur circuit; the broad one pulls ahead and the other starves
      const lead = kf(t, [[r2, 0], [ce('ap_race2') - 1, 1]], easeInOut);
      const xA = lerp(700, 1550, clamp(seg(t, wt('ap_race', 'imagine') , ce('ap_race2')) * (0.55 + .45 * lead))), xB = lerp(700, 1550, clamp(seg(t, wt('ap_race', 'imagine'), ce('ap_race2')) * (.55 - .35 * lead)));
      boilSeed('track'); for (const y of [430, 640]) { inkLine([[680, y + 50], [1600, y + 50]], 1.4, PAL.ink, 'inkfine', 0); }
      inkLine([[1560, 400], [1560, 720]], 4, PAL.berry, 'dry', 0);
      neuron(xB, 430, 40 * (1 - .5 * lead), { on: .5 * (1 - lead), key: 'pix' }); hand('“if pixel 322 is this colour…”', 900, 360, 30, PAL.slate, seg(t, wt('ap_race', 'pixel') - .3, wt('ap_race', 'Labrador', 1) + .3));
      neuron(xA, 640, 40 * (1 + .4 * lead), { on: .6 + .4 * lead, key: 'broad' }); hand('green grass · tan fur', 900, 570, 32, PAL.sap, seg(t, wt('ap_race', 'broad', 1) - .3, wt('ap_race', 'fur') + .3));
      if (lead > .6) hand('starves', xB, 500, 32, PAL.berry, seg(t, wt('ap_race2', 'starves') - .3, wt('ap_race2', 'starves') + .3));
      hand('rich get richer', 1200, 790, 40, PAL.clayDk, seg(t, wt('ap_race2', 'rich-get-richer') - .4, wt('ap_race2', 'rich-get-richer') + .4));
    }
    const kL = on(t, l - .1, te);
    if (kL > 0) { fig('blog/figs/fig059', 960, 440, 1250, kL, { key: 'f59', tape: true }); hand('what it learned: dark and green, not “dog” — but broad from one example', 960, 800, 38, PAL.ink, seg(t, wt('ap_labrador', 'colors') - .5, wt('ap_labrador', 'little') + .3)); }
    const kT = on(t, te - .1);
    if (kT > 0) { fig('blog/figs/fig060', 960, 440, 1050, kT, { key: 'f60', tape: true }); hand('ten photos → 1 in 5 new photos right (twice chance)', 960, 860, 38, PAL.ink, seg(t, wt('ap_ten', 'five') - .5, wt('ap_ten', 'chance') + .3)); hand('grokking: the exception — but the general circuit grows underneath', 960, 930, 32, PAL.slate, seg(t, wt('ap_ten', 'Grokking') - .3, wt('ap_ten', 'underneath') + .3)); }
    clawd(200, 990, 16, emotions(t, [[a - 1, 'excited'], [g + .3, 'thinking'], [r + .3, 'determined'], [r2 + .3, 'excited'], [l + .3, 'laugh'], [te + .3, 'proud']]));
    edges(lt, dur, { in: 'none', out: 'wipe', cols: [PAL.sap, PAL.moss] });
  }
  function ecology(t, lt, dur) {
    const a = cs('ap_ecology'), h = cs('ap_handpack'), e = ce('ap_handpack');
    setCountry(t, { mood: 'dusk' });
    const kA = on(t, a, h);
    if (kA > 0) {
      title('circuit ecology', 960, 160, 66, PAL.cream, seg(t, a + .2, a + 1.2), { stroke: PAL.ink, strokeW: .1 });
      // an established region with readers captures the error before a newcomer grows
      for (let i = 0; i < 7; i++) neuron(560 + (i % 4) * 120, 420 + Math.floor(i / 4) * 120, 36, { on: .7, key: 'eco' + i });
      for (let i = 0; i < 6; i++) wire([[560 + (i % 4) * 120, 420], [620 + (i % 3) * 120, 540]], 1, { sw: 1, col: PAL.cream, key: 'ew' + i, flow: .6, pulses: 1 });
      neuron(1400, 470, 30 * (1 - .4 * seg(t, wt('ap_ecology', 'grow') - .5, wt('ap_ecology', 'grow') + .5)), { on: .2, key: 'newbie', label: 'starting fresh', labelCol: PAL.cream, labelK: kA });
      hand('a region with parts and readers learns the next related thing faster', 960, 740, 36, PAL.cream, seg(t, wt('ap_ecology', 'region') - .3, wt('ap_ecology', 'fresh') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('“iy” is already on for “diy” → first in line for “do it yourself”', 960, 820, 36, PAL.ochre, seg(t, wt('ap_ecology', 'already', 1) - .3, wt('ap_ecology', 'yourself') + .3), { stroke: PAL.ink, strokeW: .1 });
    }
    const kH = on(t, h - .1);
    if (kH > 0) {
      title('packing a code in by hand', 960, 160, 60, PAL.cream, seg(t, h + .2, h + 1.4), { stroke: PAL.ink, strokeW: .1 });
      // Clawd with a wrench, the code sparking and failing
      const fail = seg(t, wt('ap_handpack', 'Instead') - .3, wt('ap_handpack', 'all') + .3);
      neuron(960, 470, 60, { on: .5 + .4 * Math.sin(t * 20) * fail, key: 'code' });
      if (fail > 0) for (let i = 0; i < 3; i++) sfx('fzz', 900 + i * 60, 380 - i * 20, 30, PAL.ochre, frac(t * .7 + i / 3) * 1.2);
      hand('small mismatches → interference → it often never worked', 960, 700, 38, PAL.cream, fail, { stroke: PAL.ink, strokeW: .1 });
      hand('neurons aren’t for copying — they compute distinctions', 960, 790, 40, PAL.ochre, seg(t, wt('ap_handpack', 'copying') - .3, wt('ap_handpack', 'distinctions') + .3), { stroke: PAL.ink, strokeW: .1 });
      clawd(560, 940, 18, { ...emotions(t, [[h - 1, 'determined'], [wt('ap_handpack', 'Instead'), 'dizzy'], [e - 2, 'relieved']]), aR: 1 });
    } else clawd(300, 960, 18, emotions(t, [[a - 1, 'neutral'], [a + .3, 'happy']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#5E7F6E', '#8C6B9C'] });
  }
  function toys(t, lt, dur) {
    const a = cs('ap_toy'), b = cs('ap_toy2'), c = cs('ap_toy3'), p = cs('ap_playground'), e = ce('ap_playground');
    setStudy(t);
    const kA = on(t, a, b);
    if (kA > 0) {
      const items = [['rainforest', 'frontier networks', wt('ap_toy', 'rainforest'), '#7FAE73'], ['garden', 'our small models', wt('ap_toy', 'gardens'), '#B8D39A'], ['petri dish', 'toy models', wt('ap_toy', 'petri'), '#E5E9F2']];
      items.forEach(([h, s, ta, col], i) => { const k = popk(t, ta - .3); card(BX - 400 + i * 400, 450, 330, 260, { k, col, key: 'tm' + i, text: h + '\n\n' + s, size: 38 }); });
      hand('Toy Models of Superposition: careful work, no problems with its experiments', BX, 740, 34, PAL.ink, seg(t, wt('ap_toy', 'Toy') - .3, wt('ap_toy', 'experiments') + .3));
    }
    const kB = on(t, b - .1, c);
    if (kB > 0) {
      card(BX - 280, 420, 480, 240, { k: popk(t, wt('ap_toy2', 'cost') - .3), text: 'prices the cost of sharing:\ninterference', size: 36, col: '#F2E0E4', key: 'cost' });
      card(BX + 280, 420, 480, 240, { k: popk(t, wt('ap_toy2', 'benefit') - .3), text: 'but not the benefit:\nreuse', size: 40, col: '#E7F0DC', key: 'ben' });
      hand('every feature an end in itself; nothing builds on what two share', BX, 700, 34, PAL.slate, seg(t, wt('ap_toy2', 'end') - .3, wt('ap_toy2', 'share') + .3));
    }
    const kC = on(t, c - .1, p);
    if (kC > 0) {
      title('which world are real networks in?', BX, 200, 56, PAL.ink, seg(t, wt('ap_toy3', 'world', 1) - .5, wt('ap_toy3', 'in') + .3));
      notes(t, BX - 400, 330, [[wt('ap_toy3', 'toy') - .3, 'in the toy’s world, things do pack'], [wt('ap_toy3', 'nothing') - .5, 'in real data, almost nothing is related to nothing'], [wt('ap_toy3', 'rare') - .3, 'a rare person still has a country, a job, a name'], [wt('ap_toy3', 'umbrella') - .3, 'even the umbrella-bee had parts it knew']], { size: 38, gap: 84 });
    }
    const kP = on(t, p - .1);
    if (kP > 0) { fig('blog/figs/fig083', BX + 40, 450, 780, kP, { key: 'f83', tape: true }); hand('one geometry, reused for a circle and for four corners', BX, 830, 38, PAL.sap, seg(t, wt('ap_playground', 'geometry') - .5, wt('ap_playground', 'both') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [b + .3, 'thinking'], [c + .3, 'determined'], [p + .3, 'starstruck']]);
  }
  function gravity(t, lt, dur) {
    const a = cs('ap_scale'), g = cs('ap_gravity'), e = ce('ap_gravity');
    setCountry(t, { mood: 'night', v: 'g' });
    const kA = on(t, a, g + .5);
    title('the long tail of rare facts', 960, 160, 58, PAL.cream, seg(t, a + .2, a + 1.5), { stroke: PAL.ink, strokeW: .1 });
    hand('assumed: where packing is most likely', 600, 250, 36, PAL.violet, seg(t, wt('ap_scale', 'assume') - .3, wt('ap_scale', 'collide') + .3), { stroke: PAL.ink, strokeW: .1 });
    hand('we think: least likely', 1320, 250, 40, PAL.ochre, seg(t, wt('ap_scale', 'least') - .5, wt('ap_scale', 'least') + .3), { stroke: PAL.ink, strokeW: .1 });
    // big circuits as planets with gravity wells; a rare fact rides between two related ones
    const pl = [[620, 560, 120, PAL.clay, 'cars'], [1300, 560, 100, PAL.teal, 'Latin poetry']];
    pl.forEach(([x, y, r, c, lab], i) => { boilSeed('pl' + i); glow(x, y, r * 2, '#FFD9A0', .4); for (let k = 1; k <= 3; k++) inkStroke(ellPts(x, y, r + k * 40, (r + k * 40) * .45, 40), true, .6, '#9CA3C9', 'inkfine'); paint(ellPts(x, y, r, r, 28), { wash: c, ink: PAL.ink, sw: 1.1 }); hand(lab, x, y + r + 50, 34, PAL.cream, kA, { stroke: PAL.ink, strokeW: .1 }); });
    // the rare fact: orbits next to the related circuit
    const q = t * .9, rx = 620 + Math.cos(q) * 220, ry = 560 + Math.sin(q) * 95;
    paint(ellPts(rx, ry, 16, 16, 12), { wash: PAL.ochre, ink: PAL.ink, sw: .7 }); hand('a rare fact', rx, ry - 36, 26, PAL.cream, on(t, wt('ap_scale', 'ride') - .4), { stroke: PAL.ink, strokeW: .1 });
    const kG = on(t, g);
    if (kG > 0) {
      title('semantic gravity', 960, 860, 60, PAL.ochre, seg(t, wt('ap_gravity', 'gravity') - .4, wt('ap_gravity', 'gravity') + .3), { stroke: PAL.ink, strokeW: .1 });
      const tc = seg(t, wt('ap_gravity', 'second') - .5, wt('ap_gravity', 'cars', 1) + .5);
      if (tc > 0) { const p = arcPt([1300, 400], [790, 520], 200, ease(tc)); neuron(p[0], p[1], 28, { img: 'blog/raw/tiny-vehicles/positive-03', key: 'nc', glow: false }); }
      hand('build next to whatever is already next to cars', 960, 950, 36, PAL.cream, seg(t, wt('ap_gravity', 'build') - .3, wt('ap_gravity', 'cars', 1) + .3), { stroke: PAL.ink, strokeW: .1 });
    }
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#2F3C7A', '#3B3B6D'] });
  }
  function lose(t, lt, dur) {
    const a = cs('ap_couldlose'), b = cs('ap_couldlose2'), v = cs('ap_adversarial'), d = cs('ap_dreary'), g = cs('ap_edge'), e = ce('ap_edge');
    setStudy(t);
    const kA = on(t, a, v);
    if (kA > 0) {
      title('explanations that could lose', BX, 190, 58, PAL.ink, seg(t, a + .2, a + 1.4));
      hand('200 random neurons · predictions written before measuring anything', BX, 260, 34, PAL.slate, seg(t, wt('ap_couldlose', 'two') - .3, wt('ap_couldlose', 'anything') + .3));
      const bars = [[.76, 'new examples', PAL.sap, wt('ap_couldlose2', 'seventy-six')], [.11, 'near misses', PAL.ochre, wt('ap_couldlose2', 'eleven')], [.01, 'most distant concept', PAL.violet, wt('ap_couldlose2', 'one', 1)]];
      bars.forEach(([v, lab, col, ta], i) => { const x = BX - 420 + i * 320, k = seg(t, ta - .4, ta + .5); boilSeed('lb' + i); paint(rectPts(x, 330, 140, 400, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 }); if (k <= 0) return; bar(x, 730, 140, 400, v, col, k, 'lbb' + i); title(Math.round(v * 100) + '%', x + 70, 730 - 400 * v * ease(k) - 40, 54, mixCol(col, PAL.ink, .2), 1); hand(lab, x + 70, 780, 32, PAL.ink, k); });
      hand('fired strongly', BX - 600, 530, 30, PAL.slate, kA);
      hand('179 of 183 never fired on the distant concept at all', BX, 850, 34, PAL.violet, seg(t, wt('ap_couldlose2', 'hundred', 1) - .3, wt('ap_couldlose2', 'all') + .3));
    }
    const kV = on(t, v - .1, d);
    if (kV > 0) {
      print('blog/raw/adversarial-appendix/iv_clean', BX - 300, 470, 380, popk(t, wt('ap_adversarial', 'triceratops') - .5), { key: 'clean' });
      print('blog/raw/adversarial-appendix/iv_adv', BX + 300, 470, 380, popk(t, wt('ap_adversarial', 'jaguar') - .3), { key: 'adv' });
      arrow([BX - 90, 470], [BX + 90, 470], seg(t, wt('ap_adversarial', 'jaguar') - .4, wt('ap_adversarial', 'jaguar')), PAL.ink, 3, 0, 'adva');
      hand('triceratops skull', BX - 300, 700, 32, PAL.ink, kV); hand('“jaguar”', BX + 300, 700, 36, PAL.berry, seg(t, wt('ap_adversarial', 'jaguar') - .3, wt('ap_adversarial', 'jaguar') + .3));
      hand('the frill grows a cat’s face and spotted fur — existing jaguar neurons', BX, 790, 34, PAL.ink, seg(t, wt('ap_adversarial', 'frill') - .3, wt('ap_adversarial', 'neurons') + .3));
    }
    const kD = on(t, d - .1, g);
    if (kD > 0) { fig('blog/figs/fig052', BX + 30, 430, 1150, kD, { key: 'f52', tape: true }); hand('“Once upon a midnight dreary” · remove the Poe neuron: 87% → 50%', BX, 800, 36, PAL.ink, seg(t, wt('ap_dreary', 'eighty-seven') - .5, wt('ap_dreary', 'fifty') + .3)); hand('much of its job: guide what the rest of the network does next', BX, 860, 32, PAL.sap, seg(t, wt('ap_dreary', 'guide') - .5, wt('ap_dreary', 'next') + .3)); }
    const kG = on(t, g - .1);
    if (kG > 0) { fig('blog/figs/fig056', BX + 30, 440, 1150, kG, { key: 'f56', tape: true }); hand('edge motifs: how one distinction feeds another', BX, 820, 38, PAL.sap, seg(t, wt('ap_edge', 'distinction') - .5, wt('ap_edge', 'another') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'determined'], [b + .3, 'proud'], [v + .3, 'surprised'], [d + .3, 'thinking'], [g + .3, 'excited']]);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#F4B39A', '#C99AB8']);
  }
  shots([
    [chapStart('ch12'), cardShot],
    [cs('ap_intro') - .25, race],
    [cs('ap_ecology') - .3, ecology],
    [cs('ap_toy') - .3, toys],
    [cs('ap_scale') - .3, gravity],
    [cs('ap_couldlose') - .3, lose],
  ]);
})();
