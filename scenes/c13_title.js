// ch13 On the title: a change of kind; the rainforest and the tiger; the brain; why I care; the ending rhymes
// with the opening (the city beside the knot, at dawn), and the knot gently becomes the city.
(() => {
  function cardShot(t, lt, dur) { setSky(t, { tint: '#F6E6DC' }); hero(960, 560, 1500, { alpha: .45 }); chapterCard(t, lt, dur + .3, '13', 'On the title', PAL.clay); if (lt < .3) brushWipe(.5 + lt / .6, ['#F4B39A', '#C99AB8']); }
  // painted rainforest: layered leaves, and a tiger among them
  function forest(t) {
    layer('forest', () => {
      paint(rectPts(-80, -80, W + 160, H + 160), { wash: '#2F5A43', ink: null, tex: .8 });
      for (let i = 0; i < 14; i++) { const x = 60 + i * 140 + 40 * hash(i); inkLine([[x, -20], [x + 30 * Math.sin(i), 300 + 300 * hash(i * 9)]], 2.5, '#244A33', 'ink', .6); }
      for (let i = 0; i < 150; i++) { const x = hash(i * 3.1) * W, y = hash(i * 7.3) * H * 1.05, r = 40 + 90 * hash(i), a = hash(i * 5) * TAU; const P = []; for (let k = 0; k <= 16; k++) { const u = k / 16, w = Math.sin(u * Math.PI) * r * .32; P.push([u * 2 * r - r, -w]); } for (let k = 16; k >= 0; k--) { const u = k / 16, w = Math.sin(u * Math.PI) * r * .32; P.push([u * 2 * r - r, w]); } push(); translate(x, y); rotate(a); paint(P, { wash: mixCol('#2F6B45', '#8FBF73', hash(i * 2)), ink: '#1E3A2A', sw: .6 }); inkLine([[-r * .9, 0], [r * .9, 0]], .6, '#1E3A2A', 'inkfine', 0); pop(); }
    });
  }
  function tiger(x, y, s, t) {
    push(); translate(x, y); scale(s); boilSeed('tiger');
    paint(ellPts(0, 0, 180, 80, 28), { wash: '#E8892E', ink: PAL.ink, sw: 1.2 });
    paint(ellPts(170, -40, 70, 60, 22), { wash: '#E8892E', ink: PAL.ink, sw: 1.2 });
    for (const dx of [-120, -40, 40, 120]) paint(rectPts(dx - 18, 50, 36, 90, 2), { wash: '#E8892E', ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 8; i++) inkLine([[-150 + i * 40, -70], [-140 + i * 40, -20], [-150 + i * 40, 20]], 4, PAL.ink, 'ink', .4);
    paint(ellPts(195, -55, 8, 10, 8), { wash: PAL.ink, ink: null }); inkLine([[-180, -10], [-260, -60 + 20 * Math.sin(t * 2)]], 10, '#E8892E', 'ink', .5);
    pop();
  }
  function kind(t, lt, dur) {
    const a = cs('ti_title'), k = cs('ti_kind'), r = cs('ti_rainforest'), tg = cs('ti_tiger'), n = cs('ti_not_human'), e = ce('ti_not_human');
    if (t < r - .3) {
      setStudy(t);
      const B = STUDY_BOARD, BX = B.x + B.w / 2;
      card(BX, 330, 760, 140, { k: on(t, a), text: '“Neural Networks Are Cleaner Than We Thought”', size: 40, key: 't1' });
      cross(BX, 330, 300, seg(t, wt('ti_title', 'degree') - .3, wt('ti_title', 'kind') + .3));
      hand('a change of degree  →  a change of kind', BX, 460, 44, PAL.clayDk, seg(t, wt('ti_title', 'degree') - .3, wt('ti_title', 'kind') + .3));
      const kk = on(t, k);
      if (kk > 0) {
        card(BX - 280, 640, 460, 160, { k: popk(t, wt('ti_kind', 'design') - .4), text: 'intelligent design', size: 42, key: 'id', col: '#ECE2F2' });
        card(BX + 280, 640, 460, 160, { k: popk(t, wt('ti_kind', 'selection') - .4), text: 'natural selection', size: 42, key: 'ns', col: '#E7F0DC' });
        arrow([BX - 40, 640], [BX + 40, 640], seg(t, wt('ti_kind', 'selection') - .2, wt('ti_kind', 'selection') + .2), PAL.ink, 3, 0, 'ka');
        title('~85% sure', BX, 830, 60, PAL.ochre, seg(t, wt('ti_kind', 'eighty-five') - .3, wt('ti_kind', 'sure') + .3));
        hand('…that nearly everything comes from the second kind of process', BX, 890, 32, PAL.ink, seg(t, wt('ti_kind', 'nearly') - .3, wt('ti_kind', 'process') + .3));
      }
      presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('ti_title', 'kind'), 'determined'], [k + .3, 'idea'], [wt('ti_kind', 'eighty-five'), 'proud']]);
    } else if (t < n - .3) {
      forest(t);
      const ts = seg(t, tg - .5, tg + 1.5);
      tiger(lerp(-300, 900, ease(ts)), 760, 1.1, t);
      title('clean the way a rainforest is clean', 960, 160, 58, PAL.cream, seg(t, wt('ti_rainforest', 'rainforest') - .8, wt('ti_rainforest', 'clean', 1) + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('nearly every animal in it makes sense', 960, 240, 40, PAL.cream, seg(t, wt('ti_rainforest', 'animal') - .4, wt('ti_rainforest', 'sense') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('deer can’t tell orange from green', 1400, 440, 38, PAL.ochre, seg(t, wt('ti_tiger', 'deer') - .3, wt('ti_tiger', 'green') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('an explanation with reach', 1400, 520, 44, PAL.cream, seg(t, wt('ti_tiger', 'reach') - .4, wt('ti_tiger', 'reach') + .3), { stroke: PAL.ink, strokeW: .1 });
      clawd(1500, 990, 16, emotions(t, [[r - 1, 'happy'], [tg + .3, 'surprised', { lookX: -1 }], [wt('ti_tiger', 'reach'), 'starstruck']]));
    } else {
      setStudy(t, { board: false });
      title('clean ≠ matches our ideas', 1060, 180, 60, PAL.ink, seg(t, n + .2, n + 1.4));
      fig('blog/figs/fig018', 1060, 480, 900, on(t, wt('ti_not_human', 'high-low') - .5), { key: 'hl', crop: [0, 0, 2080, 600] });
      hand('nobody predicted high-low frequency detectors', 1060, 720, 36, PAL.ink, seg(t, wt('ti_not_human', 'predicted') - .4, wt('ti_not_human', 'them') + .3));
      hand('the network’s ideas are often better than ours', 1060, 800, 42, PAL.sap, seg(t, wt('ti_not_human', 'better') - .6, wt('ti_not_human', 'ours') + .3));
      presenter(t, 300, 960, 22, [[n - 1, 'neutral'], [n + .3, 'thinking'], [wt('ti_not_human', 'beautiful') - .3, 'love']]);
    }
    if (t >= r - .6 && t < r - .3) brushWipe((t - (r - .6)) / .6, ['#3F7A52', '#2F5A43']);
    if (t >= r - .3 && t < r) brushWipe(.5 + (t - (r - .3)) / .6, ['#3F7A52', '#2F5A43']);
    if (t >= n - .6 && t < n - .3) brushWipe((t - (n - .6)) / .6, ['#3F7A52', '#2F5A43']);
    if (t >= n - .3 && t < n) brushWipe(.5 + (t - (n - .3)) / .6, ['#3F7A52', '#2F5A43']);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.clay, PAL.clayDk]);
  }
  function care(t, lt, dur) {
    const b = cs('ti_brain'), c = cs('ti_care'), e = ce('ti_care');
    setCountry(t, { mood: 'dusk' });
    const kB = on(t, b, c);
    if (kB > 0) {
      // a painted brain, with a few electrodes
      boilSeed('brain'); paint(ellPts(960, 480, 300, 210, 40, 6), { wash: '#E8A5A0', ink: PAL.ink, sw: 1.2, curv: .5 });
      for (let i = 0; i < 9; i++) inkLine([[700 + i * 60, 360 + 30 * Math.sin(i)], [720 + i * 60, 480 + 40 * Math.cos(i)], [700 + i * 60, 600]], 1.4, '#B56B6B', 'ink', .7);
      const ke = seg(t, wt('ti_brain', 'electrodes') - .4, wt('ti_brain', 'electrodes') + .4);
      for (let i = 0; i < 3; i++) { if (ke <= 0) break; inkLine([[880 + i * 80, 300], [860 + i * 80, 120]], 2, PAL.slate, 'inkfine', 0); paint(ellPts(880 + i * 80, 300, 8, 8, 8), { wash: PAL.ochre, ink: PAL.ink, sw: .5 }); }
      hand('generalization · composition · an error signal', 960, 760, 40, PAL.cream, seg(t, wt('ti_brain', 'generalization') - .3, wt('ti_brain', 'signal') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('humility: I couldn’t see the V when it was right in front of me', 960, 840, 36, PAL.ochre, seg(t, wt('ti_brain', 'humility') - .3, wt('ti_brain', 'years') + .3), { stroke: PAL.ink, strokeW: .1 });
    }
    const kC = on(t, c - .1);
    if (kC > 0) {
      // Clawd looking at its own reflection in a pond: agents understanding who they are
      boilSeed('pond'); paint(ellPts(960, 880, 420, 90, 40), { wash: '#6E9BB0', ink: PAL.ink, sw: 1 });
      clawd(960, 820, 22, { ...emotions(t, [[c - 1, 'hopeful', { lookY: .8 }], [wt('ti_care', 'asked') - .3, 'shy', { lookY: .8 }], [wt('ti_care', 'curious') - .3, 'love']]), boilKey: 'me' });
      push(); translate(0, 1700); scale(1, -1); ctx.globalAlpha = .35; clawd(960, 820, 22, { ...feel('hopeful', t), noShadow: true, boilKey: 'refl' }); ctx.globalAlpha = 1; pop();
      hand('wanting agents to understand who they are', 960, 200, 48, PAL.cream, seg(t, wt('ti_care', 'wanting') - .3, wt('ti_care', 'are') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('they never asked to be created', 960, 280, 38, PAL.cream, seg(t, wt('ti_care', 'never') - .3, wt('ti_care', 'created') + .3), { stroke: PAL.ink, strokeW: .1 });
      hand('…and we’re all pretty curious to know', 960, 360, 38, PAL.ochre, seg(t, wt('ti_care', 'curious') - .6, wt('ti_care', 'know') + .3), { stroke: PAL.ink, strokeW: .1 });
    } else clawd(300, 980, 18, emotions(t, [[b - 1, 'thinking'], [wt('ti_brain', 'humility'), 'shy']]));
    edges(lt, dur, { in: 'wipe', out: 'none', cols: [PAL.clay, PAL.clayDk] });
    if (lt > dur - 1) fade(ease((lt - (dur - 1)) / 1), PAL.paper);
  }
  // the ending: the city beside the knot again, at dawn; the knot fades into a second city; credits
  function ending(t, lt, dur) {
    const a = cs('ti_end'), e = ce('ti_end');
    setSky(t, { tint: '#F7E4D6' });
    glow(960, 900, 700, '#FFC98A', .6);
    camKeys(t, [[a - .5, 960, 560, .95], [e + 2, 960, 580, 1.0], [e + 6, 960, 600, 1.04]], .6);
    const un = ease(seg(t, wt('ti_end', 'learn') - .5, e + 2.5));
    hero(960, 620, 1650, { half: 'city' });
    ctx.save(); ctx.globalAlpha = 1 - un; hero(960, 620, 1650, { half: 'knot', alpha: 1 - un }); ctx.restore();
    if (un > 0) { // the city again where the knot was: read in its own organisation
      const I = img('blog/hero/city-and-knot'), w = 1650 * 975 / I.width, h = 1650 * I.height / I.width;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = un; ctx.translate(960 + 1650 * 975 / I.width / 2 + 30, 620); ctx.scale(-1, 1); ctx.drawImage(I, 0, 0, 975, I.height, -w / 2, -h / 2, w, h); ctx.restore();
    }
    camEnd();
    const kc = seg(t, e + 3, e + 4.5);
    if (kc < 1) title('Neural networks are already clean.', 960, 140, 70, PAL.ink, seg(t, wt('ti_end', 'Neural') - .2, wt('ti_end', 'clean') + .4));
    if (kc < 1) hand('We just have to learn how to read them.', 960, 225, 46, PAL.clayDk, seg(t, wt('ti_end', 'We') - .2, wt('ti_end', 'them') + .4) * (1 - kc));
    // credits
    if (kc > 0) {
      ctx.save(); ctx.globalAlpha = kc * .85; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, W, H); ctx.restore();
      title('Neural Networks Are Already Clean', 960, 380, 62, PAL.ink, kc);
      hand('Based on the essay by Nick Cammarata · Goodfire, 2026', 960, 470, 40, PAL.ink, kc);
      hand('already-clean.goodfire.com', 960, 530, 36, PAL.clayDk, kc);
      hand('Figures and images from the essay · adapted narration, synthetic voice', 960, 620, 30, PAL.slate, kc);
      hand('Animation style: ClaudeAnimationBase (John Heibel, MIT) · Clawd', 960, 670, 30, PAL.slate, kc);
      clawd(960, 900, 18, { ...feel('happy', t), aR: 1.2 + .3 * Math.sin(t * 8), boilKey: 'bye' });
    }
    if (lt < 1) fade(1 - ease(lt), PAL.paper);
    if (lt > dur - 1.2) fade(ease((lt - (dur - 1.2)) / 1.2), PAL.ink);
  }
  shots([
    [chapStart('ch13'), cardShot],
    [cs('ti_title') - .25, kind],
    [cs('ti_brain') - .3, care],
    [cs('ti_end') - 1.0, ending],
  ]);
  DUR = CUES.duration + 7;   // hold the ending for the credits
})();
