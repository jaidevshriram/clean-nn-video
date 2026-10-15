// ch11 Explanations that can lose: "too vague" rejected; the blind test (two booths, a note, a dart); the bullseye
// beats ten billion words; three buckets (76 / 11 / 1%); Newton and Mercury's wobble.
(() => {
  const all = ['el_risk', 'el_blind', 'el_bull', 'el_score', 'el_mercury'];
  const talk = t => speak(t, all);
  function placard(x, y, w, h, txt, k, o = {}) { if (k <= 0) return; push(); translate(x, y); rotate(o.rot || 0); scale(backOut(k)); boilSeed('pl' + txt); inkLine([[0, h / 2], [0, h / 2 + 160]], 6, '#6A4B30', 'ink', 0); paint(rectPts(-w / 2, -h / 2, w, h, 1), { wash: o.col || PAL.cream, ink: PAL.ink, sw: 1.3 }); pop(); if (k > .5) letter(txt, x, y, o.size || 40, PAL.ink, { face: 'marker', shadow: false, rot: o.rot || 0, maxW: w - 30 }); }

  // 1 · "it's a multi-purpose neuron" — rejected
  function risk(t, lt, dur) {
    const a = cs('el_risk'), e = ce('el_risk'), tv = wt('el_risk', 'vague'), tl = wt('el_risk', 'multi-purpose'), tf = wt('el_risk', 'fail');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 540, 1], [tl, 1100, 560, 1.08], [e, 1050, 540, 1.02]], .3);
    placard(1300, 560, 600, 210, "IT'S A MULTI-PURPOSE NEURON", popk(t, (tl || tv) - .5, .5), { rot: -.05, size: 44 });
    clawd(1300, 1010, 17, { ...emotions(t, [[a, 'suspicious'], [tl - .5, 'smug'], [tf - .4, 'sad']]), view: 'front', aL: 2.4, aR: 2.4, boilKey: 'c11c' });
    stamp('REJECTED: TOO VAGUE', 1300, 560, (tf || e - 1) - .8, t, { size: 46 });
    prof(560, 1000, .64, { view: 'q', pose: gesture(t, [[a, 'explain'], [tv, 'shrug'], [tf - 1.1, { aL: [.2, .1], aR: [1.6, 2.2] }], [tf - .6, 'present']]), mood: t < tv ? 'wry' : 'serious', look: [.8, -.2], talk: talk(t) });
    camEnd();
    hand('maybe I\'m just good at making up stories?', 960, 140, 50, PAL.ink, seg(t, a + .2, a + 1.6) * (1 - seg(t, tl - .8, tl - .4)), { stroke: PAL.cream, strokeW: .1 });
    if (t > tf - .3) title('tests an explanation can FAIL', 960, 140, 70, PAL.berry, seg(t, tf - .3, tf + .5), { stroke: PAL.cream, strokeW: .1 });
    chapterSign(t, t - chapStart('ch11'), cs('el_risk') - chapStart('ch11') + 3, '11', 'Explanations that can lose');
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // a target-building: concentric rings painted on the ground with a neuron house at the centre
  function target(cx, cy, s, blaze, t) {
    boilSeed('tgt'); const R = [520, 400, 280, 160];
    R.forEach((r, i) => paint(ellPts(cx, cy, r * s, r * s * .36, 40), { wash: i % 2 ? '#E9E4D6' : '#C2456A', ink: PAL.ink, sw: 1.2 }));
    neuronHouse(cx, cy + 20 * s, 150 * s, 200 * s, { roof: 'peak', on: .2 + .8 * blaze, key: 'tgth', col: '#5A5A8A', awning: false, glowCol: '#FFE08A' });
    if (blaze > .3) glow(cx, cy - 100 * s, 500 * s * blaze, '#FFE08A', .7 * blaze);
  }
  function dart(x, y, a, s = 1, col = PAL.berry) { push(); translate(x, y); rotate(a); scale(s); boilSeed('dart' + col); inkLine([[-60, 0], [30, 0]], 4, '#6A4B30', 'ink', 0); paint([[30, -8], [56, 0], [30, 8]], { wash: '#8A93A8', ink: PAL.ink, sw: .8 }); paint([[-60, 0], [-80, -16], [-50, 0], [-80, 16]], { wash: col, ink: PAL.ink, sw: .8 }); pop(); }

  // 2–3 · the blind test: two booths, a note under the wall, a sentence-dart, the bullseye
  function blind(t, lt, dur) {
    const a = cs('el_blind'), b = cs('el_bull'), e = ce('el_bull'), tn = wt('el_blind', 'second'), ts = wt('el_blind', 'sentence'), tc = wt('el_bull', 'center'), tb = wt('el_bull', 'billion');
    sky(t, [[0, '#2A3A6A'], [.7, '#6A5A8A'], [1, '#E0A080']], { stars: 20 });
    boilSeed('c11gr'); paint(rectPts(-400, 700, W + 1600, 600, 1), { grad: [[0, '#5A7A5A'], [1, '#2A4A3A']], ink: PAL.ink, sw: 1 });
    const cam = camKeys(t, [[a - .3, 700, 560, 1], [ts, 800, 560, 1], [b - .5, 1300, 600, .8], [tc, 1500, 640, .9], [tb, 1500, 640, .75], [e, 1500, 640, .75]], .3);
    // two booths and the wall between them
    for (const [x, col, lab] of [[420, '#7A5A6A', 'agent 1: studies the neuron'], [900, '#5A6A8A', 'agent 2: sees only the note']]) { boilSeed('bth' + x); paint(rectPts(x - 170, 420, 340, 420, 1), { wash: col, ink: PAL.ink, sw: 1.3 }); paint(rectPts(x - 130, 470, 260, 200, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1 }); letter(lab, x, 400, 30, PAL.cream, { face: 'hand', shadow: false }); }
    clawd(420, 660, 9, { ...emotions(t, [[a, 'thinking'], [tn, 'happy']]), view: 'front', boilKey: 'c11a' });
    clawd(900, 660, 9, { ...emotions(t, [[a, 'neutral'], [tn + .5, 'thinking'], [ts, 'determined']]), view: 'front', boilKey: 'c11b' });
    // the note slides under the wall
    const nk = seg(t, tn - .8, tn + .6); if (nk > 0 && nk < 1) { boilSeed('c11note'); paint(rectPts(lerp(500, 760, ease(nk)), 820, 90, 60, 1), { wash: PAL.cream, ink: PAL.ink, sw: 1 }); letter('the note', lerp(545, 805, ease(nk)), 850, 18, PAL.ink, { face: 'hand', shadow: false }); }
    // the dart flies to the target
    const tx = 2300, ty = 760;
    target(tx, ty, 1, seg(t, tc - .3, tc + .3), t);
    const fk = seg(t, ts + .2, tc - .3);
    if (fk > 0 && fk < 1) { const x = lerp(1000, tx, fk), y = lerp(640, ty - 40, fk) - Math.sin(fk * Math.PI) * 260; dart(x, y, Math.atan2((ty - 40 - 640) - Math.cos(fk * Math.PI) * 260 * Math.PI, tx - 1000), 1.4); }
    if (t >= tc - .3) dart(tx - 20, ty - 40, .15, 1.4);
    // ten billion grey darts in the outer rings (real text)
    const gk = seg(t, tb - .8, tb + .8);
    for (let i = 0; i < 80 * gk; i++) { const q = hash(i * 3.1) * TAU, r = 300 + 220 * hash(i * 7.7); dart(tx + Math.cos(q) * r, ty + Math.sin(q) * r * .36 - 30, .3 + hash(i) * .2, .6, '#9A9AA8'); }
    if (t > ts - .3 && t < b) letter('"Squeaky, the tiny mouse, squeaked!"', 960, 300, 36, PAL.cream, { face: 'hand', shadow: false, reveal: seg(t, ts - .3, ts + .6) });
    camEnd();
    if (t > tb - .5) title('one sentence beats ten billion words', 960, 140, 64, '#FFD36B', seg(t, tb - .5, tb + .5), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A3A6A', '#6A5A8A'] });
  }

  // 4 · three buckets fill with light
  function score(t, lt, dur) {
    const a = cs('el_score'), e = ce('el_score'), t76 = wt('el_score', 'three'), t11 = wt('el_score', 'eleven'), t1 = wt('el_score', 'one');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 560, 1], [e, 960, 560, 1]], 0);
    const B = [[480, 'should fire', .76, t76, '76%'], [960, 'near-misses', .11, t11, '11%'], [1440, 'distant ideas', .01, t1, '1%']];
    B.forEach(([x, lab, v, tw, txt], i) => {
      const k = ease(seg(t, (tw || a + 2 + i) - 1.2, (tw || a + 2 + i) + .2)), top = 380, bot = 860, w = 300;
      boilSeed('c11bk' + i);
      paint([[x - w / 2, top], [x + w / 2, top], [x + w * .42, bot], [x - w * .42, bot]], { wash: '#E9E4D6', ink: PAL.ink, sw: 1.5 });
      const ly = lerp(bot, top, v * k), lw = lerp(w * .42, w / 2, v * k);
      if (k > 0) { paint([[x - lw, ly], [x + lw, ly], [x + w * .42, bot - 4], [x - w * .42, bot - 4]], { wash: '#FFD36B', ink: null }); glow(x, ly, 120, '#FFE08A', .6 * k); }
      letter(lab, x, 930, 44, PAL.ink, { face: 'hand', shadow: false });
      if (k > .5) letter(txt, x, 320, 80, PAL.berry, { face: 'marker', shadow: false });
    });
    camEnd();
    title('examples written from the explanation alone', 960, 140, 56, PAL.ink, seg(t, a + .2, a + 1.4), { stroke: PAL.cream, strokeW: .1 });
    clawd(1800, 1000, 9, { ...emotions(t, [[a, 'neutral'], [t76, 'excited'], [t1, 'proud']]), view: 'q', flip: true, boilKey: 'c11c2' });
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // 5 · Newton and Mercury: an orrery; Mercury's orbit slowly precesses
  function mercury(t, lt, dur) {
    const a = cs('el_mercury'), e = ce('el_mercury'), tn = wt('el_mercury', 'Newton'), tm = wt('el_mercury', 'Mercury'), tb = wt('el_mercury', 'best');
    sky(t, [[0, '#0E1236'], [1, '#2A2A5A']], { stars: 220, starH: H });
    camKeys(t, [[a - .3, 960, 540, 1], [tm, 1000, 520, 1.15], [e, 980, 540, 1.05]], .3);
    const cx = 1000, cy = 520;
    glow(cx, cy, 160, '#FFD36B', .9); boilSeed('sun'); paint(ellPts(cx, cy, 60, 60, 24), { wash: '#FFD36B', ink: PAL.ink, sw: 1 });
    // the precessing ellipse (rosette): draw several faint past orbits, one bright current orbit
    const prec = (t - a) * .12 * (t > tm ? 2.5 : 1);
    for (let j = 0; j < 7; j++) { const q = prec - j * .12, P = []; for (let i = 0; i <= 60; i++) { const u = i / 60 * TAU, r = 260 / (1 + .35 * Math.cos(u)); P.push([cx + Math.cos(u + q) * r, cy + Math.sin(u + q) * r * .9]); } inkLine(P, j ? 1.2 : 2.6, j ? rgba('#BFE6FF', .5 - j * .06) : '#BFE6FF', 'inkfine', .2); }
    const u = (t - a) * 1.6, r = 260 / (1 + .35 * Math.cos(u)); const mx = cx + Math.cos(u + prec) * r, my = cy + Math.sin(u + prec) * r * .9;
    boilSeed('merc'); paint(ellPts(mx, my, 18, 18, 14), { wash: '#C9B48E', ink: PAL.ink, sw: .9 });
    if (t > tm - .3) letter('Mercury', mx + 50, my - 30, 34, PAL.cream, { face: 'hand', shadow: false });
    // the orrery arm and stand
    boilSeed('orr'); inkLine([[cx, cy], [mx, my]], 2, '#C9A15A', 'ink', 0); paint(rectPts(cx - 7, cy + 60, 14, 920 - cy, 1), { wash: '#C9A15A', ink: PAL.ink, sw: 1 }); paint(ellPts(cx, 990, 140, 30, 20), { wash: '#8C6A3A', ink: PAL.ink, sw: 1.2 });
    clawd(1600, 1000, 10, { ...emotions(t, [[a, 'neutral'], [tm, 'thinking'], [tb, 'idea']]), view: 'q', flip: true, armR: (u2, sw) => { boilSeed('scp'); inkLine([[0, 0], [u2 * 3, -u2 * 1.2]], sw * 3, '#B08A4A', 'ink', 0); }, aR: 1.8, boilKey: 'c11c3' });
    prof(420, 1000, .62, { view: 'q', pose: gesture(t, [[a, 'explain'], [tn, 'pointUp'], [tm, 'point'], [tb, 'count']]), mood: 'warm', look: [.8, -.4], talk: talk(t) });
    camEnd();
    if (t > tn - .3) hand("Newton's gravity explained almost everything…", 960, 130, 48, PAL.cream, seg(t, tn - .3, tn + 1) * (1 - seg(t, tb - .8, tb - .4)), { stroke: PAL.ink, strokeW: .14 });
    if (t > tb - .4) title('the best tests are specific', 960, 140, 70, '#FFD36B', seg(t, tb - .4, tb + .6), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#2A2A5A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#E8C27A', '#C9A15A']);
  }

  shots([[chapStart('ch11'), risk], [cs('el_blind') - .3, blind], [cs('el_score') - .3, score], [cs('el_mercury') - .3, mercury]]);
})();
