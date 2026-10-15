// ch05 The foggy district: the microscope comes into focus (2009 → 2017 → 2026); the last district of InceptionV1 is
// fog and crooked signs; the knot again; ConvNeXt renovates it (an elevated bypass, even streetlights); 5% → 99%.
(() => {
  const MT = 'blog/raw/microscope-timeline/', LL = 'blog/raw/last-layer-neurons/medium/images/', CL = 'blog/raw/crushed-last-layer/images/';
  const V = 'blog/raw/v-figure-10x/';
  const MIX = [V + 'p47742', V + 'c4d201c', V + 'c5a94a', V + 'n1070575', V + 'pPool13', V + 'n282687', V + 'c5a317d', V + 'n1158528', V + 'c4d493a'];
  const LADY = ['img-02651-x32-y64', 'img-04173-x32-y32', 'img-05390-x32-y00', 'img-21789-x32-y32', 'img-23690-x32-y00', 'img-37284-x64-y00', 'img-41574-x32-y32', 'img-47708-x32-y32'].map(n => LL + n);
  const CLEAN = [LADY.slice(0, 4), [CL + 'n10_positive_00', CL + 'n11_positive_00', CL + 'n12_positive_00', CL + 'n10_positive_00'], [CL + 'n09_positive_00', CL + 'n04_positive_00', CL + 'n09_positive_00', CL + 'n04_positive_00'], LADY.slice(4, 8), [CL + 'n05_positive_00', CL + 'n07_positive_00', CL + 'n05_positive_00', CL + 'n07_positive_00'], [CL + 'n03_positive_00', CL + 'n01_positive_00', CL + 'n03_positive_00', CL + 'n01_positive_00'], [CL + 'n08_positive_00', CL + 'n00_positive_00', CL + 'n08_positive_00', CL + 'n00_positive_00']];
  const all = ['fd_microscope', 'fd_fv', 'fd_last', 'fd_story', 'fd_renovate', 'fd_numbers', 'fd_lesson'];
  const talk = t => speak(t, all);

  // the Microscope: a brass lens on a cart, with a focus knob; o.view(cx, cy, r) draws what's seen through it
  function scope(t, x, y, s, o = {}) {
    boilSeed('scope');
    push(); translate(x, y); scale(s);
    paint(rrPts(-170, -60, 340, 60, 12), { wash: '#7A5B3E', ink: PAL.ink, sw: 1.2 });
    for (const wx of [-120, 120]) { paint(ellPts(wx, 0, 34, 34, 18), { wash: '#4A5268', ink: PAL.ink, sw: 1.1 }); const a = (o.roll || 0) * 3; inkLine([[wx, 0], [wx + Math.cos(a) * 30, Math.sin(a) * 30]], 1.4, PAL.ink, 'inkfine', 0); }
    inkLine([[0, -60], [0, -220]], 14, '#B08A4A', 'ink', 0);
    // brass ring
    paint(ellPts(0, -400, 210, 210, 40), { grad: [[0, '#E8C27A'], [1, '#A87A3A']], ink: PAL.ink, sw: 1.6 });
    pop();
    // the lens view (unscaled coords for crisp images)
    const cx = x, cy = y - 400 * s, r = 180 * s;
    ctx.save(); const P = new Path2D(); P.arc(cx, cy, r, 0, TAU); ctx.clip(P); ctx.fillStyle = '#E9E4D6'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); if (o.view) o.view(cx, cy, r); ctx.restore();
    // glass glint
    ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(cx - r * .4, cy - r * .45, r * .35, r * .16, -.6, 0, TAU); ctx.fill(); ctx.restore();
    // focus knob
    push(); translate(x + 230 * s, y - 400 * s); rotate(o.knob || 0); boilSeed('knob'); paint(ellPts(0, 0, 38 * s, 38 * s, 16), { wash: '#C9A15A', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 8; i++) { const q = i / 8 * TAU; inkLine([[Math.cos(q) * 26 * s, Math.sin(q) * 26 * s], [Math.cos(q) * 38 * s, Math.sin(q) * 38 * s]], 1.4, PAL.ink, 'inkfine', 0); } pop();
  }
  function fill(im, cx, cy, r, a = 1, blur = 0) { const I = img(im), s = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha = a; if (blur) ctx.filter = `blur(${blur}px)`; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, cx - r, cy - r, 2 * r, 2 * r); ctx.restore(); }
  function billboard(x, y, txt, k, o = {}) {
    if (k <= 0) return; boilSeed('bb');
    inkLine([[x - 120, y + 110], [x - 120, y + 320]], 8, '#5A4A3E', 'ink', 0); inkLine([[x + 120, y + 110], [x + 120, y + 320]], 8, '#5A4A3E', 'ink', 0);
    push(); translate(x, y + 110); scale(1, backOut(k)); translate(-x, -(y + 110));
    paint(rectPts(x - 200, y - 110, 400, 220, 1), { wash: o.col || '#F3E2BE', ink: PAL.ink, sw: 1.6 });
    pop();
    if (k > .6) letter(txt, x, y + 4, o.size || 130, o.tcol || PAL.berry, { face: 'marker', shadow: false, rot: o.rot || 0 });
    if (o.sub) letter(o.sub, x, y + 84, 28, PAL.ink, { face: 'hand', shadow: false });
  }

  // 1 · the microscope, and what it saw over the years
  function micro(t, lt, dur) {
    const a = cs('fd_microscope'), f = cs('fd_fv'), e = ce('fd_fv');
    const t17 = wt('fd_fv', 'transformation'), t26 = wt('fd_fv', 'tweaks'), tc = wt('fd_fv', 'crisp');
    sky(t, [[0, '#2A2545'], [1, '#5A4A6E']], { stars: 40 });
    boilSeed('c5fl'); paint(rectPts(-200, 880, W + 400, 300, 1), { grad: [[0, '#4A3F5E'], [1, '#2A2340']], ink: PAL.ink, sw: 1 });
    camKeys(t, [[a - .3, 960, 560, .95], [f, 1000, 470, 1.15], [e, 1000, 470, 1.2]], .3);
    const roll = seg(t, a + .3, a + 3), sx = lerp(-400, 1000, easeOut(roll));
    const step = t < t17 + .4 ? 0 : t < t26 + .4 ? 1 : 2, knob = step * 2.4 + (t < t17 + .4 ? 0 : 0);
    scope(t, sx, 880, 1, {
      roll: roll * 5, knob: kf(t, [[t17, 0], [t17 + .5, 2.4], [t26, 2.4], [t26 + .5, 4.8]]), view: (cx, cy, r) => {
        if (t < f + .2) { fill(MT + '2009-mixed4d-161', cx, cy, r, 1, 14); }   // the city, smeared: a blur
        else { fill(MT + '2009-mixed4d-161', cx, cy, r); if (t > t17 + .2) fill(MT + '2017-mixed4d-161', cx, cy, r, seg(t, t17 + .2, t17 + .6)); if (t > t26 + .2) fill(MT + '2026-mixed4d-161', cx, cy, r, seg(t, t26 + .2, t26 + .6)); }
      }
    });
    // click bursts
    for (const tt of [t17 + .4, t26 + .4]) { const k = seg(t, tt, tt + .5); if (k > 0 && k < 1) { glow(sx, 500, 420 * k, '#FFF3C8', .7 * (1 - k)); sfx('click!', sx + 290, 340, 36, PAL.ink, k); } }
    const yr = ['2009', '2017', '2026'][step];
    if (t > f) hand(yr, sx - 260, 220, 60, PAL.cream, on(t, f), { stroke: PAL.ink, strokeW: .14 });
    clawd(sx + 330, 1000, 11, { ...emotions(t, [[a, 'determined'], [f, 'neutral'], [t17 + .4, 'excited'], [t26 + .4, 'proud']]), view: roll < 1 ? 'side' : 'q', walk: roll < 1 ? t * 2 : undefined, flip: true, aR: 1.5, boilKey: 'c5c' });
    prof(260, 1000, .62, { view: 'q', pose: gesture(t, [[a, 'explain'], [f, 'point'], [tc, 'open'], [t26, 'explain2']]), mood: t > tc ? 'happy' : 'warm', look: [.8, -.3], talk: talk(t) });
    camEnd();
    const kt = seg(t, t17 - .3, t17 + .7) * (1 - seg(t, t26 - .6, t26 - .2));
    if (kt > 0) title('transformation robustness', 960, 1010, 60, PAL.cream, kt, { stroke: '#1B1F4A', strokeW: .12 });
    vignette(.45);
    chapterSign(t, t - chapStart('ch05'), cs('fd_microscope') - chapStart('ch05') + 3, '5', 'The foggy district');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // the last district: houses that sag or stand straight depending on `fix` (0..1); fog lifts in a wave with `lift`
  const FX = i => 180 + i * 260;
  function district(t, fix, lift, o = {}) {
    for (let i = 0; i < 7; i++) {
      const x = FX(i), h = 360 + 140 * hash(i * 3), wave = clamp(lift * 1.6 - i / 7 * .6), fx = Math.max(fix, wave), tilt = (hash(i * 9) - .5) * .14 * (1 - fx);
      push(); translate(x, 900); rotate(tilt); translate(-x, -900);
      ctx.save(); if (fx < .7) ctx.filter = `blur(${(1 - fx) * 2.4}px)`;
      const imgs = fx > .5 ? CLEAN[i] : [0, 1, 2, 3].map(k => MIX[(i * 3 + k) % MIX.length]);
      neuronHouse(x, 900, 200, h, { roof: ['flat', 'peak', 'dome'][i % 3], on: lerp(.25 + .2 * Math.sin(t * 2 + i), .75, fx), imgs, cols: 2, key: 'c5h' + i, col: mixCol('#4A4458', '#5C6A8A', fx), awning: false });
      ctx.restore(); pop();
      // crooked signs on the unfixed houses
      if (fx < .5) { boilSeed('c5s' + i); push(); translate(x + 70, 900 - h * .5); rotate(.4 + .1 * Math.sin(t + i)); paint(rectPts(-30, 0, 60, 24, 1), { wash: '#C9B48E', ink: PAL.ink, sw: .7 }); pop(); }
    }
    for (let i = 0; i < 4; i++) { const fy = 560 + i * 130 + 20 * Math.sin(t * .3 + i); ctx.save(); ctx.globalAlpha = clamp(1 - lift * 1.3 + i * .05); fog(fy, 140, '#9E95AA', .55); ctx.restore(); }
  }

  // 2 · the worst place; the knot again
  function foggy(t, lt, dur) {
    const a = cs('fd_last'), st = cs('fd_story'), e = ce('fd_story'), t5 = wt('fd_last', 'five');
    sky(t, [[0, '#1B1B3A'], [1, '#4A3F5E']], { stars: 30 });
    camKeys(t, [[a - .3, 960, 520, 1.15], [a + 3, 960, 560, 1], [st, 960, 520, .95], [e, 960, 500, .92]], .4);
    district(t, 0, 0);
    billboard(1640, 360, '5%', popk(t, t5 - .4, .5), { sub: 'my guess, back then' });
    if (t > a + 2) hand('“essentially no interpretable neurons”', 900, 200, 44, PAL.cream, seg(t, wt('fd_last', 'essentially') - .3, wt('fd_last', 'all') + .4) * (1 - seg(t, t5 - .2, t5 + .2)), { stroke: PAL.ink, strokeW: .14 });
    // the fog curls into the knot over the district
    const km = seg(t, st + .4, st + 3);
    if (km > 0) { ctx.save(); ctx.globalAlpha = .75 * km; push(); translate(0, -200); scale(1); knot(t, km, { imgs: MIX, streetY: 700, cy: 420, r: 260 }); pop(); ctx.restore(); }
    if (t > st) hand('too many ideas, too few neurons', 960, 140, 50, PAL.cream, seg(t, wt('fd_story', 'many') - .3, wt('fd_story', 'neurons') + .3), { stroke: PAL.ink, strokeW: .14 });
    clawd(1740, 1040, 9, { ...emotions(t, [[a, 'nervous'], [st + 1, 'scared']]), view: 'q', flip: true, boilKey: 'c5c2' });
    camEnd();
    vignette(.5);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1B1B3A', '#4A3F5E'] });
  }

  // 3 · the renovation: an elevated bypass (residual connection), even streetlights (layer norm); the fog lifts
  function renovate(t, lt, dur) {
    const a = cs('fd_renovate'), n = cs('fd_numbers'), e = ce('fd_numbers');
    const tc = wt('fd_renovate', 'Conv') || a + 1, tr = wt('fd_renovate', 'residual'), tl = wt('fd_renovate', 'normalization'), tb = wt('fd_renovate', 'beautiful');
    const dawn = seg(t, tb - 1, n + 2);
    sky(t, [[0, mixCol('#1B1B3A', '#6FA8D8', dawn)], [1, mixCol('#4A3F5E', '#F4D9B5', dawn)]], { stars: Math.round(30 * (1 - dawn)) });
    if (dawn > 0) glow(1500, 700, 700, '#FFD9A0', .4 * dawn);
    camKeys(t, [[a - .3, 960, 520, .95], [tr, 960, 480, .9], [tb, 960, 520, .95], [e, 960, 540, 1]], .4);
    // the bypass rises on pillars behind the houses
    const hk = easeOut(seg(t, tr - .5, tr + 1.5));
    if (hk > 0) { boilSeed('c5hw'); for (let i = 0; i < 8; i++) { const px = 100 + i * 250; paint(rectPts(px - 14, 520 + 380 * (1 - hk), 28, 380 * hk, 1), { wash: '#7A7A9A', ink: PAL.ink, sw: 1 }); } paint(rectPts(-100, 500 + 380 * (1 - hk), W + 200, 30, 1), { wash: '#9A9AB5', ink: PAL.ink, sw: 1.2 }); lightRoad([[-100, 505 + 380 * (1 - hk)], [W + 100, 505 + 380 * (1 - hk)]], 14, hk, { col: '#FFC766', pulses: 6, speed: .8 }); }
    if (hk > .6) hand('residual connections', 360, 450, 36, PAL.cream, seg(t, tr - .2, tr + .7), { stroke: PAL.ink, strokeW: .14 });
    // even streetlights pop in, one per house
    for (let i = 0; i < 8; i++) { const k = popk(t, tl - .6 + i * .1, .4); if (k <= 0) continue; const x = 50 + i * 260; boilSeed('c5l' + i); inkLine([[x, 1000], [x, 1000 - 170 * backOut(k)]], 4, '#3A3550', 'ink', 0); paint(ellPts(x, 1000 - 176 * backOut(k), 12, 12, 12), { wash: '#FFE3A6', ink: PAL.ink, sw: .8 }); glow(x, 830, 90, '#FFE3A6', .6 * k); }
    if (t > tl - .6) hand('layer normalization', 1500, 450, 36, PAL.cream, seg(t, tl - .2, tl + .7), { stroke: PAL.ink, strokeW: .14 });
    district(t, 0, seg(t, tb - .8, tb + 2.4));
    // construction Clawds bustle about before the reveal
    if (t < tb) for (let i = 0; i < 3; i++) clawd(300 + i * 600 + 80 * Math.sin(t * 1.4 + i), 1040, 7, { ...feel('determined', t + i), view: 'side', walk: t * 2 + i, flip: Math.sin(t * 1.4 + i) < 0, boilKey: 'c5w' + i });
    // the billboard flips 5 → 50 → 70 → 99
    const t99 = wt('fd_numbers', 'Ninety-nine') || n + 1;
    const nums = [[a, '5%'], [tb - .2, '50%'], [tb + 1, '70%'], [t99 - .2, '99%']];
    let cur = nums[0][1], ft = a; for (const [tt, s] of nums) if (t >= tt) { cur = s; ft = tt; }
    const flip = seg(t, ft, ft + .35);
    push(); translate(1700, 470); scale(1, Math.abs(Math.cos(flip * Math.PI)) * .7 + .3 * (flip >= 1 ? 1 : 0) + (flip >= 1 ? 0 : 0)); translate(-1700, -470);
    billboard(1700, 360, cur, 1, { tcol: cur === '99%' ? PAL.sap : PAL.berry, sub: cur === '50%' ? 'better tools' : cur === '70%' ? 'retrained' : cur === '99%' ? 'ConvNeXt' : 'InceptionV1' });
    pop();
    const kc = seg(t, tc - .3, tc + .6) * (1 - seg(t, tr - .6, tr - .2));
    if (kc > 0) title('ConvNeXt: same size, same pictures', 960, 150, 60, PAL.cream, kc, { stroke: '#1B1F4A', strokeW: .12 });
    if (t > n) hand('same size · same data', 860, 150, 52, PAL.ink, seg(t, n - .2, n + 1), { stroke: PAL.cream, strokeW: .1 });
    camEnd();
    vignette(.35 * (1 - dawn) + .2);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1B1B3A', '#4A3F5E'] });
  }

  // 4 · the rooftop at dawn
  function lesson(t, lt, dur) {
    const a = cs('fd_lesson'), e = ce('fd_lesson');
    sky(t, [[0, '#6FA8D8'], [.7, '#F4D9B5'], [1, '#F6C08A']], { clouds: 5, cloudY: 240, cloudCol: '#FFFFFF' });
    glow(1500, 640, 760, '#FFD9A0', .5);
    camKeys(t, [[a - .3, 960, 540, 1], [e + 1, 960, 520, 1.05]], .3);
    push(); translate(0, 120); scale(1); district(t, 1, 1); pop();
    // the rooftop in the foreground
    boilSeed('c5rf'); paint(rectPts(-100, 960, W + 200, 200, 1), { grad: [[0, '#8C6A5A'], [1, '#5A4A44']], ink: PAL.ink, sw: 1.4 });
    for (let i = 0; i < 20; i++) inkLine([[i * 100, 960], [i * 100 + 20, 1080]], .8, '#3A2A2A', 'inkfine', 0);
    prof(700, 970, .66, { view: 'q', pose: gesture(t, [[a, 'explain'], [wt('fd_lesson', 'dirty') - .3, 'point'], [wt('fd_lesson', 'Upgrades'), 'present'], [wt('fd_lesson', 'readable'), 'explain2']]), mood: 'warm', look: [.8, -.2], talk: talk(t) });
    // Clawd polishes the little lens
    clawd(1000, 970, 11, { ...feel('happy', t), view: 'q', aR: 1 + .3 * Math.sin(t * 9), armR: (u, sw) => { boilSeed('c5ln'); paint(ellPts(u * 1.2, 0, u * 1.4, u * 1.4, 18), { wash: '#BFE0F0', ink: PAL.ink, sw }); }, boilKey: 'c5c3' });
    camEnd();
    hand('built badly · seen through a dirty lens', 960, 130, 50, PAL.ink, seg(t, wt('fd_lesson', 'badly') - .4, wt('fd_lesson', 'lens') + .4), { stroke: PAL.cream, strokeW: .1 });
    if (lt < .4) fade(1 - ease(lt / .4), '#F4D9B5');
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#8FBF73', '#5E9A4C']);
  }

  shots([[chapStart('ch05'), micro], [cs('fd_last') - .3, foggy], [cs('fd_renovate') - .3, renovate], [cs('fd_lesson') - .3, lesson]]);
})();
