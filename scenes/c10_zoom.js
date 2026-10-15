// ch10 Zooming out: what clean means; exploratory vs enumerative; motifs over monosemanticity; the city; maps;
// Tokyo; goalposts; deception in plain sight; fog of war; faith and asymmetric mistakes; frontier; textbooks.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  function cardShot(t, lt, dur) { setSky(t, { tint: '#F3E6E0' }); hero(960, 560, 1500, { alpha: .5 }); chapterCard(t, lt, dur + .3, '10', 'Zooming out', '#C46F7E'); if (lt < .3) brushWipe(.5 + lt / .6, ['#C99AB8', '#F4B39A']); }

  function clean(t, lt, dur) {
    const a = cs('zo_clean'), f = cs('zo_fractal'), fa = cs('zo_faster'), e = ce('zo_faster');
    setStudy(t);
    const kA = on(t, a, f + .3);
    if (kA > 0) {
      title('“already clean” means…', BX, 200, 60, PAL.ink, seg(t, a + .2, a + 1.4));
      card(BX - 300, 450, 460, 200, { k: popk(t, wt('zo_clean', 'monosemantic') - .5) * (1 - seg(t, wt('zo_clean', 'mean', 1) - .2, wt('zo_clean', 'mean', 1) + .4) * .4), text: 'not just: every neuron\nis monosemantic', size: 36, key: 'c1' });
      card(BX + 300, 450, 460, 200, { k: popk(t, wt('zo_clean', 'read') - .5), text: 'parts built to be read,\nand built upon, by its\nown downstream readers', size: 34, col: '#E7F0DC', key: 'c2' });
    }
    const kF = on(t, f - .1, fa);
    if (kF > 0) {
      fig('blog/figs/fig040', BX + 30, 460, 820, kF, { key: 'f40', tape: true });
      title('become another reader', BX, 860, 60, PAL.clayDk, seg(t, wt('zo_fractal', 'reader') - .6, wt('zo_fractal', 'reader') + .3));
    }
    const kX = on(t, fa - .1);
    if (kX > 0) {
      // a car district: easier to add the next car next to the others
      for (let i = 0; i < 6; i++) neuron(BX - 300 + (i % 3) * 110, 420 + Math.floor(i / 3) * 110, 40, { img: 'blog/raw/tiny-vehicles/positive-0' + (i + 1), key: 'cd' + i, glow: false });
      const nx = kf(t, [[wt('zo_faster', 'next') - .3, BX + 420], [wt('zo_faster', 'next') + 1.2, BX - 300 + 3 * 110]], easeInOut), ny = kf(t, [[wt('zo_faster', 'next') - .3, 300], [wt('zo_faster', 'next') + 1.2, 420]], easeInOut);
      neuron(nx, ny, 40, { img: 'blog/raw/tiny-vehicles/positive-07', key: 'new', glow: true, on: .6 });
      hand('the car district', BX - 190, 620, 34, PAL.ink, kX);
      hand('faster to build next to what’s already there', BX, 780, 40, PAL.sap, seg(t, wt('zo_faster', 'easier') - .4, wt('zo_faster', 'else') + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [f + .3, 'starstruck'], [fa + .3, 'thinking'], [wt('zo_faster', 'easier'), 'idea']]);
  }
  function styles(t, lt, dur) {
    const a = cs('zo_styles'), x = cs('zo_exploratory'), e = ce('zo_exploratory');
    setStudy(t);
    // enumerative: a long ledger; exploratory: a map with a magnifier
    const kL = seg(t, wt('zo_styles', 'Enumerative') - .3, wt('zo_styles', 'missed') + .3);
    if (kL > 0) {
      boilSeed('ledger'); paint(rectPts(BX - 520, 300, 380, 520, 2), { wash: '#FBF6EC', ink: PAL.ink, sw: 1 });
      const n = Math.round(16 * kL); for (let i = 0; i < n; i++) { inkLine([[BX - 490, 330 + i * 30], [BX - 190 - 60 * hash(i), 330 + i * 30]], .9, PAL.slate, 'inkfine', 0); tick(BX - 170, 330 + i * 30, 18, 1); }
      hand('enumerative: a big list to audit', BX - 330, 860, 34, PAL.ink, kL);
    }
    const kM = seg(t, wt('zo_styles', 'Exploratory') - .3, wt('zo_styles', 'Exploratory') + .6);
    if (kM > 0) {
      fig('blog/figs/fig042', BX + 250, 520, 640, kM, { key: 'f42' });
      const mx = BX + 150 + 120 * Math.sin(t * .7), my = 520 + 60 * Math.sin(t * .9);
      boilSeed('mag'); inkStroke(ellPts(mx, my, 70, 70, 28), true, 3, PAL.ink, 'ink'); paint(ellPts(mx, my, 66, 66, 24), { wash: '#DDEEF5', washOp: 70, ink: null }); inkLine([[mx + 50, my + 50], [mx + 120, my + 120]], 7, '#7A5B3E', 'ink', 0);
      hand('exploratory: start with questions, zoom in and out', BX + 250, 860, 34, PAL.ink, kM);
    }
    const kX = on(t, x);
    if (kX > 0) { hand('more resilient to a bit of polysemanticity', BX, 220, 40, PAL.sap, seg(t, wt('zo_exploratory', 'resilient') - .4, wt('zo_exploratory', 'polysemanticity') + .3)); hand('the feature list was always a means to an end', BX, 280, 36, PAL.slate, seg(t, wt('zo_exploratory', 'means') - .5, wt('zo_exploratory', 'end') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'bored'], [wt('zo_styles', 'Exploratory'), 'happy'], [x + .3, 'proud']]);
  }
  function future(t, lt, dur) {
    const a = cs('zo_button'), f = cs('zo_future'), v = cs('zo_advice'), n = cs('zo_not_list'), q = cs('zo_42'), e = ce('zo_42');
    setStudy(t);
    const kA = on(t, a, f);
    if (kA > 0) {
      // the button
      const press = seg(t, wt('zo_button', 'motifs', 1) - .3, wt('zo_button', 'minute') + .2);
      boilSeed('btn'); paint(rrPts(BX - 520, 520, 300, 120, 30), { wash: '#6E7891', ink: PAL.ink, sw: 1.1 }); paint(ellPts(BX - 370, 520 - 30 * (1 - press * .5), 90, 40, 20), { wash: '#D8394E', ink: PAL.ink, sw: 1 });
      hand('make every neuron monosemantic', BX - 370, 700, 30, PAL.ink, kA, { maxW: 320 });
      card(BX + 230, 470, 620, 280, { k: popk(t, wt('zo_button', 'motifs') - .3), text: 'or: understand the circuit motifs behind\nhow an agent thinks about its goals,\nand the boundary between itself and others', size: 32, col: '#E7F0DC', key: 'mot' });
      if (press > .5) cross(BX - 370, 520, 160, press * 2 - 1);
    }
    const kF = on(t, f - .1, v);
    if (kF > 0) {
      // a future researcher with a time-travel scarf, talking to a younger Clawd
      clawd(BX - 200, 760, 18, { ...feel('cool', t), boilKey: 'fut', hat: 'wizard' });
      clawd(BX + 260, 760, 14, { ...feel('confused', t), boilKey: 'past' });
      hand('me, now', BX - 200, 800, 30, PAL.ink, kF); hand('me, eight years ago', BX + 260, 800, 30, PAL.ink, seg(t, wt('zo_future', 'eight') - .3, wt('zo_future', 'ago') + .3));
      title('a researcher from 100 years in the future', BX, 220, 50, PAL.ink, seg(t, f + .2, wt('zo_future', 'future') + .3));
    }
    const kV = on(t, v - .1, n);
    if (kV > 0) {
      title('advice to my past self', BX, 190, 56, PAL.clayDk, seg(t, v, v + 1));
      notes(t, BX - 470, 300, [[wt('zo_advice', 'pose') - .6, 'the giant pose circuit is right in front of you'], [wt('zo_advice', 'gates') - .6, 'negative sides are gates, not opposites'], [wt('zo_advice', 'reward-hacks') - .6, 'feature visualization reward-hacks late'], [wt('zo_advice', 'architecture') - .6, 'the last layer: a bad architecture'], [wt('zo_advice', 'harder') - .6, 'see polysemanticity? look harder', { col: PAL.berry }]], { size: 38, gap: 84 });
    }
    const kN = on(t, n - .1, q);
    if (kN > 0) { stamp('NOT A FEATURE LIST', BX, 420, n + .4, t, { size: 56 }); hand('following the noise only works if the noise has something to teach', BX, 620, 38, PAL.ink, seg(t, wt('zo_not_list', 'Following') - .3, wt('zo_not_list', 'teach') + .3)); }
    const kQ = on(t, q - .1);
    if (kQ > 0) { title('42', BX - 280, 470, 200, PAL.ochre, seg(t, wt('zo_42', 'forty-two') - .3, wt('zo_42', 'forty-two') + .3)); card(BX + 260, 400, 500, 160, { k: popk(t, wt('zo_42', 'network') - .3), text: 'the network is the answer', size: 40, key: 'ans', col: '#F6E2B0' }); card(BX + 260, 600, 500, 160, { k: popk(t, wt('zo_42', 'search', 1) - .3), text: 'interpretability: the search\nfor the right question', size: 36, key: 'qq' }); }
    if (kF <= 0) presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('zo_button', 'minute'), 'smug'], [v + .3, 'determined'], [n + .3, 'thinking'], [q + .3, 'happy']]);
  }
  function city(t, lt, dur) {
    const a = cs('zo_city'), r = cs('zo_ears'), m = cs('zo_maps'), e = ce('zo_maps');
    const kA = on(t, a - .3, r);
    if (t < r - .2) {
      setSky(t, { tint: '#ECEEEC' });
      const tw = wt('zo_city', 'town'), ny = wt('zo_city', 'York');
      // a small town (scattered painted houses) vs the hero's city with its financial district tagged
      const town = 1 - seg(t, ny - .5, ny + .3);
      if (town > 0) { for (const [x, y, lab] of [[500, 560, 'bank'], [880, 470, 'insurance'], [1250, 600, 'accountant']]) { boilSeed('h' + x); paint(rectPts(x - 60, y - 50, 120, 100, 2), { wash: PAL.cream, ink: PAL.ink, sw: 1 }); paint([[x - 75, y - 50], [x, y - 110], [x + 75, y - 50]], { wash: PAL.brick, ink: PAL.ink, sw: 1 }); hand(lab, x, y + 90, 30, PAL.ink, seg(t, tw + .3, tw + 1)); } hand('a small town: the “financial district” is scattered', 960, 900, 40, PAL.ink, seg(t, wt('zo_city', 'district') - .3, wt('zo_city', 'street') + .5) * town); }
      if (town < 1) { ctx.save(); ctx.globalAlpha = 1 - town; hero(960, 560, 1700, { alpha: 1 - town }); ctx.restore(); const p = HERO.at(600, 250); tag('financial district', p[0], p[1] + 40, seg(t, ny, ny + .6), { dx: 160, dy: -60, size: 26 }); hand('New York: find it on a map in a minute', 960, 1000, 40, PAL.ink, seg(t, ny, ny + 1)); }
    } else {
      setStudy(t);
      const kR = on(t, r - .1, m);
      if (kR > 0) { fig('blog/figs/fig041', BX + 30, 470, 1050, kR, { key: 'f41', tape: true }); hand('larger model: pale, wavy and side-of-head ears all feed one hanging-ears neuron', BX, 860, 32, PAL.ink, seg(t, wt('zo_ears', 'pale') - .3, wt('zo_ears', 'neuron') + .3)); }
      const kM = on(t, m - .1);
      if (kM > 0) {
        fig('blog/figs/fig042', BX + 30, 420, 1100, kM, { key: 'f42b', tape: true });
        title('tethered abstraction', BX, 160, 56, PAL.clayDk, seg(t, wt('zo_maps', 'tethered') - .3, wt('zo_maps', 'abstraction') + .4));
        hand('killer whale → three routes: whales · sharks and rays · fish held up by anglers', BX, 790, 34, PAL.ink, seg(t, wt('zo_maps', 'killer') - .3, wt('zo_maps', 'anglers') + .3));
      }
      presenter(t, 300, 960, 22, [[r - 1, 'neutral'], [r + .3, 'happy'], [m + .3, 'thinking'], [wt('zo_maps', 'anglers'), 'starstruck']]);
    }
    if (t >= r - .5 && t < r - .1) brushWipe((t - (r - .5)) / .8);
    if (t >= r - .1 && t < r + .2) brushWipe(.5 + (t - (r - .1)) / .6);
    edges(lt, dur, { in: 'wipe', out: 'none' });
  }
  function tokyo(t, lt, dur) {
    const a = cs('zo_tokyo'), b = cs('zo_tokyo2'), e = ce('zo_tokyo2');
    setSky(t, { tint: '#F1EBDD' });
    // a painted Tokyo skyline; seventy disconnected pieces get pulled out to build a "Brooklyn"
    boilSeed('tokyo');
    for (let i = 0; i < 16; i++) { const x = 300 + i * 90, h = 120 + 200 * hash(i * 3.3); paint(rectPts(x, 700 - h, 70, h, 2), { wash: mixCol('#C9A5B6', '#8E7AA6', hash(i)), ink: PAL.ink, sw: .8 }); }
    paint([[1500, 700], [1560, 480], [1620, 700]], { wash: '#D8394E', ink: PAL.ink, sw: 1 });   // a tower
    hand('Tokyo', 960, 760, 44, PAL.ink, on(t, a));
    const kp = seg(t, wt('zo_tokyo', 'reconstruct') - .3, wt('zo_tokyo', 'Tokyo', 2) + .3);
    for (let i = 0; i < 24; i++) { const k = clamp(kp * 1.6 - i / 30); if (k <= 0) continue; const sx = 330 + (i % 16) * 90, sy = 600 - 80 * hash(i), tx = 1300 + (i % 6) * 60, ty = 280 + Math.floor(i / 6) * 50; const p = arcPt([sx, sy], [tx, ty], 100, ease(k)); boilSeed('pc' + i); paint(rectPts(p[0] - 20, p[1] - 16, 40, 32, 3), { wash: mixCol('#C9A5B6', '#8E7AA6', hash(i)), ink: PAL.ink, sw: .6 }); }
    hand('“where’s the Brooklyn of Tokyo?”', 960, 160, 46, PAL.ink, seg(t, wt('zo_tokyo', 'Brooklyn') - .6, wt('zo_tokyo', 'Tokyo', 1) + .3));
    const kB = on(t, b - .1);
    if (kB > 0) {
      // the V fractured into a cat feature and a car feature
      const sp = ease(seg(t, wt('zo_tokyo2', 'splitting') - .3, wt('zo_tokyo2', 'car') + .3));
      neuron(960 - 160 * sp, 470, 70, { img: 'blog/raw/v-figure-10x/p47742', key: 'fc', glow: false });
      neuron(960 + 160 * sp, 470, 70, { img: 'blog/raw/v-figure-10x/c4d201c', key: 'fr', glow: false });
      if (sp < .3) { boilSeed('vv'); inkLine([[900, 420], [960, 520], [1020, 420]], 7, PAL.ochre, 'ink', 0); }
      hand('an SAE splits the V into a cat feature and a car feature', 960, 600, 36, PAL.berry, seg(t, wt('zo_tokyo2', 'autoencoder') - .3, wt('zo_tokyo2', 'car') + .3));
      hand('learn the city’s own organization', 960, 900, 44, PAL.sap, seg(t, wt('zo_tokyo2', 'organization') - .7, wt('zo_tokyo2', 'organization') + .3));
    }
    clawd(200, 980, 16, emotions(t, [[a - 1, 'neutral'], [a + .3, 'hopeful'], [wt('zo_tokyo', 'messier'), 'nervous'], [b + .3, 'thinking'], [wt('zo_tokyo2', 'organization'), 'determined']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe' });
  }
  function deception(t, lt, dur) {
    const g = cs('zo_goalposts'), d = cs('zo_deception'), d2 = cs('zo_deception2'), e = ce('zo_deception2');
    setStudy(t);
    const kG = on(t, g, d);
    if (kG > 0) {
      // goalposts sliding away as Clawd approaches
      const gx = BX + 100 + 300 * ease(seg(t, wt('zo_goalposts', 'move') - .3, wt('zo_goalposts', 'closer') + .5));
      boilSeed('goal'); inkLine([[gx - 80, 780], [gx - 80, 480]], 6, PAL.cream, 'ink', 0); inkLine([[gx + 80, 780], [gx + 80, 480]], 6, PAL.cream, 'ink', 0); inkLine([[gx - 80, 560], [gx + 80, 560]], 6, PAL.cream, 'ink', 0);
      inkLine([[gx - 80, 780], [gx - 80, 480]], 1.4, PAL.ink, 'inkfine', 0); inkLine([[gx + 80, 780], [gx + 80, 480]], 1.4, PAL.ink, 'inkfine', 0);
      hand('there’s always another weak activation', BX, 220, 40, PAL.ink, seg(t, wt('zo_goalposts', 'always') - .3, wt('zo_goalposts', 'activation') + .3));
      card(BX - 300, 420, 360, 170, { k: popk(t, wt('zo_goalposts', 'forty') - .3), text: '40 pages on\n10 curve neurons', size: 38, key: 'cd' });
      hand('…some still doubted it', BX - 300, 560, 32, PAL.berry, seg(t, wt('zo_goalposts', 'doubted') - .3, wt('zo_goalposts', 'doubted') + .3));
    }
    const kD = on(t, d - .1);
    if (kD > 0) {
      title(t < d2 ? 'the fear: a hidden activation we missed' : 'my fear: it’s in plain sight', BX, 200, 52, t < d2 ? PAL.violet : PAL.berry, 1);
      // a network of lanterns; the "deception" one is right in the middle, labelled in a script we can't read
      for (let i = 0; i < 15; i++) neuron(BX - 420 + (i % 5) * 210, 380 + Math.floor(i / 5) * 160, 34, { on: .5, key: 'dn' + i, glow: false });
      const kc = seg(t, wt('zo_deception2', 'readable') - .3, wt('zo_deception2', 'readable') + .4);
      if (kc > 0) { glow(BX, 540, 80, '#FFC766', kc); boilSeed('glyph'); inkLine([[BX - 25, 520], [BX - 5, 560], [BX + 10, 520], [BX + 28, 555]], 3, PAL.berry, 'ink', .5); }
      hand('every error in this story was in plain sight — none was a missed activation', BX, 860, 34, PAL.ink, seg(t, wt('zo_deception', 'Every') - .3, wt('zo_deception', 'missed') + .3) * (1 - seg(t, d2, d2 + .4)));
      hand('it has to be readable by its readers — become a reader', BX, 860, 36, PAL.sap, seg(t, wt('zo_deception2', 'readers') - .5, wt('zo_deception2', 'us') + .3) * (1 - seg(t, wt('zo_deception2', 'fear') - .2, wt('zo_deception2', 'fear'))));
      hand('…and we won’t know how to read it', BX, 860, 38, PAL.berry, seg(t, wt('zo_deception2', 'fear'), wt('zo_deception2', 'read', 1) + .3));
    }
    presenter(t, 300, 960, 22, [[g - 1, 'neutral'], [g + .3, 'determined'], [wt('zo_goalposts', 'move'), 'confused'], [d + .3, 'nervous'], [d2 + .3, 'thinking'], [wt('zo_deception2', 'fear'), 'scared']]);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2F3C7A', '#3B3B6D']);
  }
  function fog(t, lt, dur) {
    const f = cs('zo_fog'), dh = cs('zo_downhill'), fa = cs('zo_faith'), as = cs('zo_asym'), dc = cs('zo_decade'), e = ce('zo_decade');
    setCountry(t, { mood: 'night' });
    const kF = on(t, f - .3, fa);
    if (kF > 0) {
      // a fog-of-war map clearing at several levels
      const clear = kf(t, [[f, 0], [ce('zo_downhill'), 1]], easeInOut);
      const pts = []; for (let i = 0; i < 40; i++) pts.push([180 + (i % 10) * 175 + 40 * hash(i), 260 + Math.floor(i / 10) * 170 + 40 * hash(i * 2)]);
      pts.forEach((p, i) => { if (i % 10 < 9) wire([p, pts[i + 1]], 1, { sw: .9, col: '#9CA3C9', key: 'fw' + i }); });
      pts.forEach((p, i) => neuron(p[0], p[1], 22, { on: .6, key: 'fn' + i, glow: false }));
      boilSeed('fogp'); pts.forEach((p, i) => { if (hash(i * 5.5) > clear) paint(ellPts(p[0], p[1], 120, 90, 18), { fill: '#C9C7D6', fillOp: 230, bleed: .25, tex: .2, ink: null }); });
      title('fog of war, clearing at several levels', 960, 120, 52, PAL.cream, seg(t, f + .2, f + 1.6), { stroke: PAL.ink, strokeW: .1 });
      hand('graphs ↔ neurons ↔ attention', 960, 1000, 38, PAL.cream, seg(t, wt('zo_fog', 'Attribution') - .3, wt('zo_fog', 'turn') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('there’s always a way downhill', 960, 1000, 40, PAL.ochre, on(t, dh + .3, fa - .2), { stroke: PAL.ink, strokeW: .1 });
    }
    const kA = on(t, fa - .1);
    if (kA > 0) {
      // two roads: assume clean → a messy neuron is a lead; assume packed → it's a dead end
      boilSeed('roads2'); paint(ribbon([[960, 1100], [960, 800], [600, 500], [420, 300]], 120, 70), { wash: '#C9B48E', ink: PAL.ink, sw: .9 }); paint(ribbon([[960, 800], [1300, 560], [1440, 480]], 110, 80), { wash: '#A99E90', ink: PAL.ink, sw: .9 });
      const k1 = seg(t, wt('zo_asym', 'clean') - .3, wt('zo_asym', 'lead') + .3), k2 = seg(t, wt('zo_asym', 'packed') - .3, wt('zo_asym', 'end') + .3);
      if (k1 > 0) { card(500, 230, 380, 150, { k: k1, text: 'assume clean:\na messy neuron is a lead', size: 30, col: '#E7F0DC', key: 'r1' }); }
      if (k2 > 0) { boilSeed('wall'); paint(rectPts(1380, 380, 160, 140, 2), { wash: PAL.brick, ink: PAL.ink, sw: 1 }); card(1460, 230, 380, 150, { k: k2, text: 'assume packed:\nit’s the end', size: 30, col: '#F2E0E4', key: 'r2' }); }
      hand('it took a little faith', 960, 1010, 42, PAL.cream, seg(t, wt('zo_faith', 'little') - .4, wt('zo_faith', 'little', 1) + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('a decade figuring out how to look, rather than looking', 960, 1010, 38, PAL.ochre, seg(t, wt('zo_decade', 'decade') - .3, wt('zo_decade', 'it', 1) + .3), { stroke: PAL.ink, strokeW: .1 });
    }
    const cx = t < as ? 960 : t < dc ? lerp(960, 560, ease(seg(t, wt('zo_asym', 'lead') - 1, wt('zo_asym', 'lead')))) : 560;
    clawd(cx, 920, 18, emotions(t, [[f - 1, 'neutral'], [f + .3, 'hopeful'], [fa + .3, 'thinking'], [wt('zo_faith', 'five'), 'happy'], [as + .3, 'determined'], [dc + .3, 'sad'], [e - 1, 'relieved']]));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#2F3C7A', '#3B3B6D'] });
  }
  function frontier(t, lt, dur) {
    const a = cs('zo_eight'), f = cs('zo_frontier'), g = cs('zo_agents'), x = cs('zo_textbook'), e = ce('zo_textbook');
    setCountry(t, { mood: 'dawn' });
    const kA = on(t, a, f);
    if (kA > 0) { fig('blog/figs/fig006', 960, 420, 1100, kA, { key: 'f6z' }); hand('the medium ConvNeXt: the map is mostly filled in', 960, 700, 40, PAL.ink, kA, { stroke: PAL.cream, strokeW: .2 }); hand('no interpretability-specific fixing of the network at all', 960, 770, 36, PAL.clayDk, seg(t, wt('zo_eight', 'specific') - .3, wt('zo_eight', 'all') + .3), { stroke: PAL.cream, strokeW: .2 }); }
    const kF = on(t, f - .1, x);
    if (kF > 0) {
      title('the best laboratory in natural science', 960, 160, 54, PAL.ink, seg(t, wt('zo_frontier', 'laboratory') - .6, wt('zo_frontier', 'science') + .3));
      notes(t, 600, 300, [[wt('zo_frontier', 'read') - .4, 'every neuron can be read'], [wt('zo_frontier', 'intervention') - .4, 'every intervention made'], [wt('zo_frontier', 'rerun') - .4, 'every experiment rerun on an identical copy']], { size: 40, gap: 72 });
      // many little automated scientists
      const kg = on(t, g);
      for (let i = 0; i < 12; i++) { const k = seg(t, g + i * .2, g + .4 + i * .2); if (k <= 0) continue; clawd(220 + i * 135, 900 + 20 * (i % 2), 9 + 2 * (i % 3), { ...feel(['happy', 'thinking', 'determined', 'excited'][i % 4], t + i), boilKey: 'sci' + i, dy: -(1 - backOut(k)) * 8 }); }
      hand('months, not a decade?', 1500, 700, 40, PAL.clayDk, seg(t, wt('zo_agents', 'months') - .3, wt('zo_agents', 'decade') + .3));
    }
    const kX = on(t, x - .1);
    if (kX > 0) {
      card(960, 380, 760, 260, { k: kX, text: 'neurons generalize, work together,\nand build abstractions over layers', size: 44, col: '#FBF6EC', key: 'tb' });
      hand('— the introductory textbook story', 960, 560, 34, PAL.slate, kX);
      title('if the network isn’t a knot, untangling it can make it look like one', 960, 780, 46, PAL.ink, seg(t, wt('zo_textbook', 'knot') - 1.2, wt('zo_textbook', 'one', 1) + .4), { maxW: 1500 });
      clawd(960, 1000, 18, { ...feel('proud', t), boilKey: 'tbc' });
    }
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: ['#C99AB8', '#F4B39A'] });
  }
  shots([
    [chapStart('ch10'), cardShot],
    [cs('zo_clean') - .25, clean],
    [cs('zo_styles') - .2, styles],
    [cs('zo_button') - .2, future],
    [cs('zo_city') - .3, city],
    [cs('zo_tokyo') - .3, tokyo],
    [cs('zo_goalposts') - .3, deception],
    [cs('zo_fog') - .3, fog],
    [cs('zo_eight') - .3, frontier],
  ]);
})();
