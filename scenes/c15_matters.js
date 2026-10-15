// ch15 Why it matters: a rainforest at dawn and its tiger; through a deer's eyes the tiger vanishes; a brain with three
// electrodes; Clawd at the pond; the last strand of the knot unwinds over the city; title and credits.
(() => {
  const V = 'blog/raw/v-figure-10x/';
  const all = ['wm_kind', 'wm_tiger', 'wm_brain', 'wm_care', 'wm_end'];
  const talk = t => speak(t, all);
  // the rainforest: layered leaves and vines; deer = 0..1 shifts reds/oranges toward green
  function jungle(t, deer = 0, o = {}) {
    sky(t, [[0, '#9CC9A6'], [1, '#F4E3C0']], {});
    glow(1300, 300, 600, '#FFF2C8', .6);
    for (let layer = 0; layer < 4; layer++) {
      const d = 1 - layer / 4, col = mixCol('#2E5A3A', '#9CC9A6', d * .6);
      for (let i = 0; i < 16; i++) { const x = hash(i * 3.1 + layer) * (W + 200) - 100, y = 1080 - layer * 40 - hash(i * 7 + layer) * 600 * d, s = (120 + 120 * hash(i + layer * 9)) * (1.4 - d * .6), q = (hash(i * 5 + layer) - .5) * 1.6 + .05 * Math.sin(t * .8 + i); boilSeed('lf' + layer + i); push(); translate(x, y); rotate(q); paint([[0, 0], [s * .4, -s * .25], [s, 0], [s * .4, s * .25]], { wash: mixCol(col, '#6E9F58', hash(i) * .5), ink: PAL.ink, sw: .7, curv: .5 }); inkLine([[0, 0], [s, 0]], .8, '#2A4A2A', 'inkfine', 0); pop(); }
      for (let v = 0; v < 3; v++) { const vx = hash(v * 9 + layer) * W; inkLine([[vx, -20], [vx + 40 * Math.sin(t * .4 + v), 400], [vx - 20, 800 * d + 200]], 3, mixCol('#3E5A2A', '#9CC9A6', d * .5), 'ink', .6); }
    }
    if (o.tiger != null) tiger(o.tiger, 860, 1.4, deer, t);
  }
  function tiger(x, y, s, deer, t) {
    const orange = mixCol('#E8822A', '#6E9F58', deer), dk = mixCol('#2A1A10', '#3E6A3A', deer * .8), wk = Math.sin(t * 3);
    boilSeed('tiger'); push(); translate(x, y); scale(s);
    for (const [lx, ph] of [[-80, 0], [-50, .5], [60, .25], [90, .75]]) { const sw = Math.sin((t * 1.5 + ph) * TAU) * 14; paint(rrPts(lx - 12 + sw, -60, 24, 70, 10), { wash: orange, ink: PAL.ink, sw: .8 }); }
    paint(ellPts(0, -90, 140, 56, 26), { wash: orange, ink: PAL.ink, sw: 1.2 });
    for (let i = 0; i < 8; i++) inkLine([[-110 + i * 30, -140], [-100 + i * 30, -100], [-114 + i * 30, -60]], 4, dk, 'ink', .5);
    paint(ellPts(150, -120, 52, 46, 20), { wash: orange, ink: PAL.ink, sw: 1.1 });
    paint(ellPts(176, -106, 24, 18, 14), { wash: mixCol('#F3E2BE', '#9CC9A6', deer), ink: PAL.ink, sw: .8 });
    for (const ex of [138, 170]) { paint(ellPts(ex, -132, 7, 6, 10), { wash: '#F3D36B', ink: PAL.ink, sw: .6 }); paint(ellPts(ex + 1, -132, 2, 5, 8), { wash: PAL.ink, ink: null }); }
    paint([[120, -158], [128, -180], [140, -160]], { wash: orange, ink: PAL.ink, sw: .7 }); paint([[164, -162], [176, -182], [184, -158]], { wash: orange, ink: PAL.ink, sw: .7 });
    inkLine([[-140, -100], [-200, -140 + 20 * wk], [-230, -110]], 8, orange, 'ink', .6);
    pop();
  }

  // 1–2 · a change in kind; the tiger, and the deer's eye view
  function forest(t, lt, dur) {
    const a = cs('wm_kind'), tg = cs('wm_tiger'), e = ce('wm_tiger'), tdeer = wt('wm_tiger', 'deer'), tsense = wt('wm_tiger', 'clean');
    const tx = lerp(-300, 1000, ease(seg(t, a + 1, tg + 2)));
    const deer = seg(t, tdeer - .2, tdeer + 1.2) * (1 - seg(t, tsense - .6, tsense + .2));
    camKeys(t, [[a - .3, 960, 540, 1.02], [tg, 1000, 600, 1.15], [e, 960, 540, 1]], .3);
    jungle(t, deer, { tiger: tx });
    camEnd();
    if (deer > .1) { ctx.save(); resetMatrix(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .25 * deer; ctx.fillStyle = '#9CC9A6'; ctx.fillRect(0, 0, W, H); ctx.restore(); hand("through a deer's eyes", 1500, 140, 46, PAL.ink, deer, { stroke: PAL.cream, strokeW: .1 }); }
    title('a change in kind', 960, 140, 84, PAL.cream, seg(t, wt('wm_kind', 'kind') - .3, wt('wm_kind', 'kind') + .6) * (1 - seg(t, tg - .6, tg - .2)), { stroke: '#1B3A2A', strokeW: .14 });
    if (t > wt('wm_kind', 'natural') - .3 && t < tg) hand('from intelligent design to natural selection', 960, 240, 46, PAL.cream, seg(t, wt('wm_kind', 'natural') - .3, wt('wm_kind', 'selection') + .4), { stroke: '#1B3A2A', strokeW: .14 });
    if (t > tsense - .4) title('clean the way a rainforest is clean', 960, 980, 60, PAL.cream, seg(t, tsense - .4, tsense + .6), { stroke: '#1B3A2A', strokeW: .14 });
    vignette(.35, '#0E2216');
    chapterSign(t, t - chapStart('ch15'), cs('wm_kind') - chapStart('ch15') + 3, '15', 'Why it matters');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#3E6A3A', '#5E9A4C']);
  }

  // 3 · a brain with three electrodes; the V roof glimmers inside, then fades
  function brain(t, lt, dur) {
    const a = cs('wm_brain'), e = ce('wm_brain'), tb = wt('wm_brain', 'brain'), tc = wt('wm_brain', 'chance');
    sky(t, [[0, '#1A1636'], [1, '#3A2A5A']], { stars: 80 });
    camKeys(t, [[a - .3, 960, 560, 1], [tb, 960, 540, 1.1], [e, 960, 540, 1.15]], .3);
    const bk = on(t, tb - 1.2);
    if (bk > 0) {
      boilSeed('c15br'); paint(ellPts(960, 560, 380 * bk, 280 * bk, 40), { grad: [[0, '#F2B8C0'], [1, '#C98090']], ink: PAL.ink, sw: 1.5 });
      for (let i = 0; i < 14; i++) { const q = i / 14 * TAU, r = 200 + 60 * hash(i); inkLine([[960 + Math.cos(q) * r * .4, 560 + Math.sin(q) * r * .3], [960 + Math.cos(q + .4) * r * .8, 560 + Math.sin(q + .3) * r * .7], [960 + Math.cos(q + .2) * r, 560 + Math.sin(q + .5) * r * .75]], 3, '#A85A70', 'ink', .6); }
      inkLine([[960, 300], [960, 820]], 3, '#A85A70', 'ink', .4);
      [[760, 300], [1000, 260], [1180, 340]].forEach(([x, y], i) => { boilSeed('el' + i); inkLine([[x, y], [x + 20, y - 260]], 2, '#C9A15A', 'inkfine', .3); paint(ellPts(x, y, 8, 8, 10), { wash: '#C9A15A', ink: PAL.ink, sw: .8 }); });
      // the V roof glimmers inside for a moment
      const vk = env(t, wt('wm_brain', 'cat') - .2, tc - .5, .6, .8);
      if (vk > 0) { ctx.save(); ctx.globalAlpha = .7 * vk; neuronHouse(960, 640, 120, 150, { roof: 'v', on: .9, imgs: [V + 'p47742', V + 'c4d201c'], cols: 2, key: 'c15v', col: '#5C4A7A', awning: false }); ctx.restore(); }
    }
    camEnd();
    hand('humble about brains', 960, 130, 56, PAL.cream, seg(t, wt('wm_brain', 'humble') - .3, wt('wm_brain', 'brains') + .4), { stroke: PAL.ink, strokeW: .14 });
    if (t > tc - .6) hand("I'd never have had a chance", 960, 980, 50, PAL.cream, seg(t, tc - .6, tc + .3), { stroke: PAL.ink, strokeW: .14 });
    vignette(.5);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1A1636', '#3A2A5A'] });
  }

  // 4 · Clawd at the pond at dawn, looking at its reflection; the Professor sits beside it
  function pond(t, lt, dur) {
    const a = cs('wm_care'), e = ce('wm_care'), ts = wt('wm_care', 'themselves');
    sky(t, [[0, '#6A8AC8'], [.55, '#F0B0A0'], [1, '#FAD39A']], { clouds: 4, cloudY: 260, cloudCol: '#FFE0C8' });
    glow(1400, 560, 500, '#FFE0A0', .55);
    camKeys(t, [[a - .3, 960, 600, 1.05], [e, 1000, 640, 1.15]], .3);
    boilSeed('c15gr'); paint(rectPts(-200, 600, W + 400, 500, 1), { grad: [[0, '#8FBF73'], [1, '#5E9A4C']], ink: PAL.ink, sw: 1 });
    boilSeed('c15pd'); paint(ellPts(1250, 900, 560, 110, 40), { grad: [[0, '#9FC9E6'], [1, '#5F8AB5']], ink: PAL.ink, sw: 1.3 });
    for (let i = 0; i < 6; i++) { const r = 40 + frac(t * .3 + i / 6) * 260; inkStroke(ellPts(1050, 900, r, r * .2, 30), true, 1.2, rgba('#FFFFFF', .5 * (1 - r / 300)), 'inkfine'); }
    clawd(1000, 790, 12, { ...emotions(t, [[a, 'thinking'], [ts, 'shy']]), view: 'q', boilKey: 'c15c', noShadow: true });
    // the reflection: Clawd upside-down, rippled and faint
    ctx.save(); ctx.globalAlpha = .35; push(); translate(0, 790 * 2 + 10); scale(1, -1); clawd(1000 + 4 * Math.sin(t * 2), 790, 12, { ...emotions(t, [[a, 'thinking'], [ts, 'shy']]), view: 'q', boilKey: 'c15c', noShadow: true }); pop(); ctx.restore();
    prof(760, 800, .6, { view: 'q', pose: gesture(t, [[a, 'rest'], [ts - .5, { aL: [.3, .5], aR: [.8, 1.6] }]]), mood: 'warm', look: [.8, .2], talk: talk(t) });
    camEnd();
    if (t > wt('wm_care', 'least') - .5) hand('the least we can do', 960, 140, 56, PAL.ink, seg(t, wt('wm_care', 'least') - .5, wt('wm_care', 'do') + .4), { stroke: PAL.cream, strokeW: .1 });
    vignette(.3);
    if (lt < .4) fade(1 - ease(lt / .4), '#F0B0A0');
  }

  // 5 · the end: the last strand of the knot unwinds into a tidy street over the city; title; credits
  function end(t, lt, dur) {
    const a = cs('wm_end'), e = ce('wm_end'), tr = wt('wm_end', 'read');
    sky(t, [[0, '#6A8AC8'], [.5, '#F0A080'], [1, '#FAD39A']], { clouds: 6, cloudY: 380, cloudCol: '#FFE0C8' });
    glow(1100, 560, 800, '#FFE0A0', .6);
    const cam = camKeys(t, [[a - .3, 3600, 420, .5], [e + 6, 3800, 460, .42]], .2);
    cityPanorama(t, cam[0], { haze: '#F6C0A0', haze2: '#E0A0A8' });
    cityStreet(t, { on: () => .9 });
    camEnd();
    // the knot unwinds into a straight street
    const un = seg(t, a - .2, a + 3);
    if (un < 1) { ctx.save(); ctx.globalAlpha = 1 - seg(un, .8, 1); knot(t, 1 - un, { imgs: [V + 'p47742', V + 'c4d201c', V + 'pTrain34'], streetY: 600, cy: 360, r: 220 }); ctx.restore(); }
    const tk = seg(t, a + 1.2, a + 3), ck = seg(t, e + 1, e + 3);
    title('Neural Networks Are Already Clean', 960, 200, 96, PAL.cream, tk, { stroke: '#1B1F4A', strokeW: .12 });
    hand('we just have to learn how to read them', 960, 300, 50, '#FFF2C8', seg(t, tr - .4, tr + .6), { stroke: '#1B1F4A', strokeW: .14 });
    if (ck > 0) { ctx.save(); resetMatrix(); ctx.globalAlpha = .55 * ck; ctx.fillStyle = '#1B1F4A'; ctx.fillRect(0, 700, W, 380); ctx.restore(); ['based on the essay by Nick Cammarata · Goodfire, 2026', 'already-clean.goodfire.com', 'figures and photographs from the essay; animation and voice: made for this explainer'].forEach((s, i) => letter(s, 960, 790 + i * 70, i === 0 ? 44 : 34, '#F3E2BE', { face: 'hand', shadow: false, alpha: ck })); }
    vignette(.3);
    if (lt > dur - 1.2) fade(ease((lt - (dur - 1.2)) / 1.2), PAL.ink);
  }

  shots([[chapStart('ch15'), forest], [cs('wm_brain') - .3, brain], [cs('wm_care') - .3, pond], [cs('wm_end') - .3, end]]);
})();
