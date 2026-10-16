// ch03 The case of the cat and the car: back at the crime scene in the rain; the windows become V's; the roads that
// feed it are pointed; its basement is round; nouns vs verbs; the lazy portrait; case closed.
(() => {
  const V = 'blog/raw/v-figure-10x/';
  const GRID = [V + 'p47742', V + 'c4d201c', V + 'p42708', V + 'c4d201d', V + 'c5a352d', V + 'pCarX5'];
  const all = ['cc_return', 'cc_grid', 'cc_v', 'cc_inputs', 'cc_round', 'cc_new', 'cc_noun', 'cc_whiskers', 'cc_lesson'];
  const talk = t => speak(t, all);
  // a polyline drawn on progressively (k 0..1)
  function stroke(P, k, sw, col, br = 'ink') { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); }
  // a V (chevron) painted over a box at (x, y, w, h), apex position given as fraction of the box
  function vMark(x, y, w, h, k, o = {}) {
    const ax = x + w * (o.ax ?? .5), ay = y + h * (o.ay ?? .8), l = [x + w * (o.lx ?? .15), y + h * (o.ty ?? .18)], r = [x + w * (o.rx ?? .85), y + h * (o.ty ?? .18)];
    boilSeed('vm' + Math.round(x) + Math.round(y));
    glow(ax, ay - h * .2, w * .5, '#FFC766', .35 * k);
    stroke([l, [ax, ay], r], k, o.sw || 7, o.col || '#FFD36B');
  }
  function wetStreet(t, o = {}) {
    sky(t, [[0, '#0F1330'], [.6, '#2A2A55'], [1, '#4A3F6A']], { stars: 0 });
    skyline('c3b', -300, 2300, 820, { depth: .6, bh: 320, bw: 120, lit: .25, glowK: .4 });
    fog(780, 90, '#5A5A86', .45);
    boilSeed('c3st'); paint(rectPts(-200, 860, W + 400, 300, 1), { grad: [[0, '#2E2C52'], [1, '#17152E']], gdir: [0, 860, 0, 1080], ink: PAL.ink, sw: 1, tex: .6 });
    // neon reflections smeared in the wet road
    for (let i = 0; i < 9; i++) { const x = 100 + i * 230 + 20 * Math.sin(t * .7 + i); ctx.save(); ctx.globalAlpha = .18 + .06 * Math.sin(t * 3 + i); ctx.fillStyle = ['#FF9ACD', '#FFC766', '#8FD3FF'][i % 3]; ctx.fillRect(x, 900, 14, 150); ctx.restore(); }
  }

  // 1 · back to the crime scene (rain, lantern, umbrella), then the windows: "what one thing could this be?"
  function returnShot(t, lt, dur) {
    const a = cs('cc_return'), g = cs('cc_grid'), e = ce('cc_grid'), tq = wt('cc_grid', 'asking');
    // time slows as he asks the question: rain freezes
    const slow = seg(t, tq - .6, tq + .8), rt = t < tq - .6 ? t : (tq - .6) + (t - (tq - .6)) * (1 - .97 * slow);
    wetStreet(t);
    const cam = camKeys(t, [[a - .3, 760, 560, .9], [g - 1, 1000, 560, 1], [g + 1.2, 1100, 520, 1.3], [tq, 1150, 470, 1.6], [e + .5, 1180, 440, 1.75]], .3);
    neuronHouse(1180, 880, 380, 520, { roof: 'flat', on: .55 + .3 * Math.sin(t * 2.2), imgs: GRID, cols: 2, key: 'v3', col: '#5C4A7A', sign: '4e:55', glowCol: '#FFC766' });
    const walk = stroll(t, a + .2, a + 6, -300, 900, 1), walking = t > a + .2 && t < a + 6;
    prof(walk.x, 1000, .6, { view: 'q', walk: walking ? t * 1.3 : null, pose: gesture(t, [[a, { aL: [.12, .06], aR: [1.1, 1.6] }], [g + .6, { aL: [.12, .06], aR: [.6, .9] }], [tq - .6, 'think']]), holdR: t < tq - .6 ? lanternHand(1) : null, mood: t > tq - 1 ? 'think' : 'serious', look: [.8, -.5], talk: walking ? 0 : talk(t) });
    clawd(walk.x - 170, 1006, 11, { ...emotions(t, [[a - 1, 'nervous'], [g + 1, 'neutral'], [tq, 'thinking']]), view: walking ? 'side' : 'q', walk: walking ? t * 2 : undefined, armR: umbrellaProp('#3A64B8'), aR: 1.4, boilKey: 'c3c' });
    camEnd();
    rain(rt, 1 - .2 * slow); splashes(rt, 880, 1060, 1 - slow);
    if (t > g + 1) hand('what ONE thing could this be?', 960, 120, 50, PAL.cream, seg(t, tq - .4, tq + .9), { stroke: PAL.ink, strokeW: .14 });
    vignette(.5);
    chapterSign(t, t - chapStart('ch03'), cs('cc_return') - chapStart('ch03') + 3.2, '3', 'The case of the cat and the car');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#1B1F4A', '#2A2A55']);
  }

  // 2 · it's a V: chevrons over every window; pull back to show the V-shaped roof
  // window boxes (as drawn in close-up): 3 rows × 2
  const BOX = (i) => { const w = 340, h = 270, gx = 1920 / 2 - w - 25, gy = 80; return [gx + (i % 2) * (w + 50), gy + Math.floor(i / 2) * (h + 36), w, h]; };
  const VAPEX = [{ ax: .5, ay: .78, ty: .05, lx: .1, rx: .9 }, { ax: .5, ay: .92, ty: .45 }, { ax: .5, ay: .72, ty: .08, lx: .12, rx: .88 }, { ax: .5, ay: .95, ty: .3 }, { ax: .5, ay: .75, ty: .1 }, { ax: .52, ay: .9, ty: .45, lx: .3, rx: .75 }];
  function vShot(t, lt, dur) {
    const a = cs('cc_v'), e = ce('cc_v'), tv = wt('cc_v', 'V'), to = wt('cc_v', 'obvious'), back = seg(t, tv + .5, tv + 1.6);
    wetStreet(t);
    if (back < 1) {
      // the windows, filling the frame
      ctx.save(); ctx.globalAlpha = 1 - ease(back);
      boilSeed('c3wall'); paint(rectPts(-40, -40, W + 80, H + 80, 1), { grad: [[0, '#6A5788'], [1, '#4A3C66']], ink: null, tex: .8 });
      GRID.forEach((im, i) => { const [x, y, w, h] = BOX(i); boilSeed('c3w' + i); paint(rectPts(x - 12, y - 12, w + 24, h + 24, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1.2 }); const I = img(im), s = Math.min(I.width, I.height * w / h); ctx.drawImage(I, (I.width - s) / 2, (I.height - s * h / w) / 2, s, s * h / w, x, y, w, h); });
      GRID.forEach((im, i) => { const [x, y, w, h] = BOX(i), t0 = to + .3 + i * .4; vMark(x, y, w, h, seg(t, t0, t0 + .45), VAPEX[i]); });
      ctx.restore();
    }
    if (back > 0) {
      camKeys(t, [[tv + .5, 1180, 440, 1.75], [tv + 1.9, 1000, 580, .95]], 0);
      neuronHouse(1180, 880, 380, 520, { roof: 'v', on: .85, imgs: GRID, cols: 2, key: 'v3v', col: '#5C4A7A', sign: '4e:55', glowCol: '#FFC766', k: 1 });
      clawd(760, 1006, 11, { ...emotions(t, [[tv + 1, 'surprised']]), view: 'front', boilKey: 'c3c2' });
      prof(520, 1000, .6, { view: 'q', pose: gesture(t, [[tv + 1, 'present']]), mood: 'happy', look: [.8, -.4], talk: talk(t) });
      camEnd();
      rain(t, .6 * ease(back));
    }
    const kt = seg(t, tv - .2, tv + .6) * (1 - seg(t, tv + 2.4, tv + 2.8));
    if (kt > 0) title('a V neuron', 960, 1010, 92, '#FFD36B', kt, { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
  }

  // 3 · the roads into it: a flame, a fireboat's jets, fox faces
  function inputs(t, lt, dur) {
    const a = cs('cc_inputs'), e = ce('cc_inputs');
    sky(t, [[0, '#141842'], [.7, '#3A3068'], [1, '#6A4E80']], { stars: 80, starH: 300 });
    camKeys(t, [[a - .3, 1300, 560, 1.15], [a + 2.5, 1100, 560, .95], [e + .5, 960, 560, .9]], .4);
    boilSeed('c3gr'); paint(rectPts(-400, 820, W + 800, 400, 1), { grad: [[0, '#3A355E'], [1, '#221E3C']], gdir: [0, 820, 0, 1100], ink: PAL.ink, sw: 1 });
    const SRC = [['flame', V + 'c5a94a', 'flame', 300, 640, wt('cc_inputs', 'flame')], ['fireboat', V + 'c5a94c', 'water jets', 300, 900, wt('cc_inputs', 'water')], ['fox', V + 'c4d493a', 'fox faces', 600, 1060, wt('cc_inputs', 'fox')]];
    // three source houses on the left, roads converging on the V building on the right
    SRC.forEach(([k, im, lab, x, y, tw], i) => {
      const hx = [260, 420, 300][i], hy = [520, 760, 1000][i], kk = popk(t, (tw || a + 2) - 1.2, .5);
      lightRoad([[hx + 90, hy - 80], [900, hy - 60 + (500 - hy) * .3], [1440, 640]], 18, seg(t, (tw || a + 2) - .8, (tw || a + 2) + .6), { col: '#FFC766', pulses: 3, speed: .5 });
      neuronHouse(hx, hy, 200, 230, { roof: 'peak', on: .4 + .5 * clamp(1 - Math.abs(t - (tw || 0) - .4)), imgs: [im], cols: 1, key: 'c3s' + i, col: ['#7A4A5A', '#3E5A7A', '#7A5A3A'][i], awning: false, k: backOut(kk) });
      if (kk > .7) hand(lab, hx, hy + 44, 32, PAL.cream, seg(t, tw - .5, tw + .3), { stroke: PAL.ink, strokeW: .14 });
    });
    neuronHouse(1500, 860, 300, 420, { roof: 'v', on: .5 + .4 * Math.abs(Math.sin(t * 2)), imgs: GRID.slice(0, 4), cols: 2, key: 'v3i', col: '#5C4A7A', sign: '4e:55' });
    // little painted V's floating up from each source as it fires
    const tV = wt('cc_inputs', 'V-shaped');
    if (tV) SRC.forEach((_, i) => { const hx = [260, 420, 300][i], hy = [520, 760, 1000][i] - 300; vMark(hx - 60, hy - 60, 120, 90, seg(t, tV - .4 + i * .15, tV + .2 + i * .15), { sw: 5 }); });
    clawd(1760, 1010, 9, { ...emotions(t, [[a, 'happy'], [tV || e, 'excited']]), view: 'q', flip: true, boilKey: 'c3c3' });
    camEnd();
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#141842', '#3A3068'] });
  }

  // 4 · the basement: round things switch it off; a ball rolls up to the door and bounces away
  const ROUND = [V + 'n1070575', V + 'n1158528', V + 'n282687', V + 'n132986'];
  function round(t, lt, dur) {
    const a = cs('cc_round'), e = ce('cc_round');
    sky(t, [[0, '#141842'], [1, '#3A3068']], { stars: 60, starH: 400 });
    const dive = seg(t, a + .2, a + 2);
    camKeys(t, [[a - .3, 960, 480, 1], [a + 2, 960, 640, .92], [e + .5, 960, 660, .96]], .3);
    // cutaway ground: above, the V house; below, a lit-blue basement with four round windows
    boilSeed('c3cut'); paint(rectPts(-200, 600, W + 400, 700, 1), { grad: [[0, '#4A3A30'], [1, '#2A201C']], gdir: [0, 600, 0, 1300], ink: PAL.ink, sw: 1.2, tex: .9 });
    paint(rectPts(-200, 590, W + 400, 26, 1), { wash: '#4A4470', ink: PAL.ink, sw: 1 });
    for (let i = 0; i < 40; i++) paint(ellPts(hash(i) * W, 640 + hash(i * 3) * 600, 10 + 14 * hash(i * 5), 6 + 8 * hash(i * 7), 10), { wash: '#5A4A3E', ink: null });
    neuronHouse(960, 600, 300, 380, { roof: 'v', on: .5 - .4 * seg(t, wt('cc_round', 'Round') - .5, wt('cc_round', 'Round')), imgs: GRID.slice(0, 4), cols: 2, key: 'v3r', col: '#5C4A7A', sign: '4e:55', awning: false });
    const bk = seg(t, a + 1.2, a + 2.4);
    boilSeed('c3bs'); paint(rrPts(560, 660, 800, 380, 20), { grad: [[0, '#1E3A66'], [1, '#14244A']], ink: PAL.ink, sw: 1.4 });
    glow(960, 850, 520, '#6FB7FF', .5 * bk);
    letter('the basement: what switches it OFF', 960, 710, 46, '#BFE0FF', { face: 'hand', reveal: bk, shadow: false });
    const TW = [wt('cc_round', 'tennis'), wt('cc_round', 'clock'), wt('cc_round', 'snail'), wt('cc_round', 'shell') + .5];
    ROUND.forEach((im, i) => {
      const cx = 680 + i * 186, cy = 870, r = 74, k = popk(t, (TW[i] || a + 3) - .4, .5); if (k <= 0) return;
      push(); translate(cx, cy); scale(backOut(k)); translate(-cx, -cy);
      boilSeed('c3rw' + i); paint(ellPts(cx, cy, r + 10, r + 10, 30), { wash: '#2A2340', ink: PAL.ink, sw: 1.1 });
      const I = img(im), s = Math.min(I.width, I.height); ctx.save(); const P = new Path2D(); P.arc(cx, cy, r, 0, TAU); ctx.clip(P); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, cx - r, cy - r, 2 * r, 2 * r); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .4; ctx.fillStyle = '#6FA8FF'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.restore();
      pop();
    });
    // a ball rolls up the street to the door and bounces off
    const tb = wt('cc_round', 'Round') || a + 2, rb = seg(t, tb - 1.5, tb + .1), back = seg(t, tb + .1, tb + 1.8);
    if (rb > 0) { const bx = back > 0 ? lerp(900, 360, easeOut(back)) : lerp(-80, 900, ease(rb)), by = 588 - (back > 0 ? 120 * Math.sin(back * Math.PI) : 0); boilSeed('c3ball'); push(); translate(bx, by - 26); rotate(back > 0 ? -back * 9 : rb * 12); paint(ellPts(0, 0, 26, 26, 16), { wash: '#D9E35A', ink: PAL.ink, sw: 1 }); inkLine([[-18, -16], [0, 0], [-18, 18]], 1.2, '#FBF6EC', 'inkfine', .6); pop(); if (back > 0 && back < .3) sfx('boing!', 920, 470, 40, '#8FD3FF', back * 4); }
    camEnd();
    vignette(.45);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#141842', '#3A3068'] });
  }

  // 5 · new things it fires for: bullet trains, a rack of pool balls, a pickup truck. Each gets a V.
  function newShot(t, lt, dur) {
    const a = cs('cc_new'), e = ce('cc_new');
    sky(t, [[0, '#2A2A55'], [1, '#6A4E80']], { stars: 40 });
    const IM = [[V + 'pTrain34', wt('cc_new', 'Bullet'), { ax: .52, ay: .62, ty: .5, lx: .2, rx: .95 }], [V + 'pPool13', wt('cc_new', 'triangle'), { ax: .5, ay: .7, ty: .35, lx: .25, rx: .75 }], [V + 'pCarX5', wt('cc_new', 'fires'), { ax: .52, ay: .9, ty: .45, lx: .3, rx: .75 }]];
    // a parade of windows slides past
    const slide = (t - a) * 140;
    IM.forEach(([im, tw, vo], i) => {
      const w = 520, h = 400, x = 260 + i * 600 - slide * .3, y = 300 + 20 * Math.sin(t * .8 + i), k = popk(t, (tw || a) - .6, .5);
      if (k <= 0) return;
      push(); translate(x + w / 2, y + h / 2); scale(backOut(k)); rotate((i - 1) * .03); translate(-(x + w / 2), -(y + h / 2));
      boilSeed('c3n' + i); paint(rectPts(x - 18, y - 18, w + 36, h + 36, 1), { wash: '#2A2340', ink: PAL.ink, sw: 1.3 });
      const I = img(im), s = Math.min(I.width, I.height * w / h); ctx.drawImage(I, (I.width - s) / 2, (I.height - s * h / w) / 2, s, s * h / w, x, y, w, h);
      vMark(x, y, w, h, seg(t, (tw || a) + .1, (tw || a) + .6), vo);
      pop();
    });
    const ks = seg(t, wt('cc_new', 'shape') - .6, wt('cc_new', 'shape') + .4);
    if (ks > 0) title("it's a shape", 960, 900, 110, '#FFD36B', ks, { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#2A2A55', '#6A4E80'] });
  }

  // 6 · nouns vs verbs: the chalkboard on the street; then the V building as a signal at a junction
  function noun(t, lt, dur) {
    const a = cs('cc_noun'), e = ce('cc_noun'), tv = wt('cc_noun', 'verb'), tdist = wt('cc_noun', 'distinction');
    const junc = seg(t, tdist - .2, tdist + 1);
    if (junc < 1) {
      wetStreet(t);
      camKeys(t, [[a - .3, 960, 540, 1], [tv, 1010, 500, 1.08]], .3);
      chalkboard(1120, 470, 900, 520, 'c3cb');
      chalk('CATS + CARS', 1120, 330, 82, seg(t, wt('cc_noun', 'nouns') - .6, wt('cc_noun', 'nouns') + .6));
      if (t > wt('cc_noun', 'better')) { boilSeed('c3x'); stroke([[860, 360], [1380, 300]], seg(t, wt('cc_noun', 'better'), wt('cc_noun', 'better') + .4), 8, '#F07A6A', 'ink'); }
      chalk('a VERB', 1120, 470, 70, seg(t, tv - .3, tv + .5), { col: '#FFE08A' });
      chalk('pointed  vs  round', 1120, 600, 74, seg(t, tdist - 1.6, tdist - .4), { col: '#9FE3C8' });
      prof(500, 1000, .62, { view: 'q', pose: gesture(t, [[a, 'explain'], [wt('cc_noun', 'nouns') - .6, 'point'], [wt('cc_noun', 'AI'), 'shrug'], [tv - .4, 'pointUp'], [tdist - 1.6, 'point']]), mood: t > wt('cc_noun', 'AI') && t < tv - .5 ? 'wry' : 'warm', look: [.8, -.3], talk: talk(t) });
      clawd(220, 1006, 10, { ...emotions(t, [[a, 'neutral'], [wt('cc_noun', 'AI'), 'shy'], [tv, 'idea']]), view: 'q', boilKey: 'c3c4' });
      camEnd();
      if (junc > 0) brushWipe(junc * 1.3, ['#1B1F4A', '#2A2A55']);
    }
    if (junc >= .5) {
      // the junction: things arrive from the left; the V signal lights; pointed go up the right road, round go down
      sky(t, [[0, '#141842'], [1, '#4A3F6A']], { stars: 60 });
      camKeys(t, [[tdist, 960, 560, .95], [e + 1, 960, 560, 1.02]], .3);
      boilSeed('c3j'); paint(rectPts(-200, 760, W + 400, 400, 1), { grad: [[0, '#3A355E'], [1, '#221E3C']], ink: PAL.ink, sw: 1 });
      const up = [[880, 640], [1300, 420], [2100, 360]], dn = [[880, 640], [1300, 860], [2100, 960]], inR = [[-100, 640], [880, 640]];
      lightRoad(inR, 40, 1, { col: '#C9B48E', pulses: 0 }); lightRoad(up, 40, 1, { col: '#FFC766', pulses: 3 }); lightRoad(dn, 40, 1, { col: '#6FB7FF', pulses: 3 });
      neuronHouse(860, 560, 160, 220, { roof: 'v', on: .5 + .4 * Math.abs(Math.sin(t * 3)), imgs: GRID.slice(0, 2), cols: 2, key: 'v3j', col: '#5C4A7A', awning: false });
      for (let i = 0; i < 10; i++) {
        const ph = frac((t - tdist) * .22 + i / 10), pointed = hash(i * 9.1) > .5, path = pointed ? up : dn;
        const P = ph < .45 ? [lerp(-60, 880, ph / .45), 640] : (() => { const C = through(path, 8), j = Math.min(C.length - 1, Math.floor((ph - .45) / .55 * (C.length - 1))); return C[j]; })();
        boilSeed('c3obj' + i);
        if (pointed) paint([[P[0] - 22, P[1] - 50], [P[0] + 22, P[1] - 50], [P[0], P[1] - 6]], { wash: '#FFD36B', ink: PAL.ink, sw: 1 });
        else paint(ellPts(P[0], P[1] - 26, 22, 22, 16), { wash: '#8FC3FF', ink: PAL.ink, sw: 1 });
      }
      hand('pointed', 1500, 330, 44, '#FFD36B', on(t, tdist + .6), { stroke: PAL.ink, strokeW: .14 });
      hand('round', 1500, 1000, 44, '#9FD0FF', on(t, tdist + .9), { stroke: PAL.ink, strokeW: .14 });
      hand('… and passing that on', 960, 150, 48, PAL.cream, seg(t, wt('cc_noun', 'passing') - .3, wt('cc_noun', 'passing') + .8), { stroke: PAL.ink, strokeW: .14 });
      camEnd();
      vignette(.4);
      if (junc < 1) brushWipe(1 + (junc - .5) * 1.3, ['#1B1F4A', '#2A2A55']);
    }
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#1B1F4A', '#2A2A55'] });
  }

  // 7 · the lazy portrait: the Sketch Artist starts with a V and wanders down the cat road, adding whiskers
  function whiskers(t, lt, dur) {
    const a = cs('cc_whiskers'), e = ce('cc_whiskers'), tf = wt('cc_whiskers', 'feature'), te = wt('cc_whiskers', 'easiest'), tc = wt('cc_whiskers', 'cat', 1) || te + 2;
    sky(t, [[0, '#E9D9C0'], [1, '#D3B99A']], {});
    boilSeed('c3fl'); paint(rectPts(-200, 860, W + 400, 300, 1), { wash: '#B98E64', ink: PAL.ink, sw: 1 });
    camKeys(t, [[a - .3, 960, 560, 1], [te, 1100, 520, 1.15], [e, 1050, 540, 1.05]], .3);
    // a little map of routes behind the easel: the cat route is a wide downhill road
    const mk = on(t, te - .6);
    if (mk > 0) {
      ctx.save(); ctx.globalAlpha = mk;
      lightRoad([[1580, 300], [1700, 520], [1660, 820]], 60, 1, { col: '#E8A86A', pulses: 2, speed: .7 });
      lightRoad([[1580, 300], [1820, 340], [1880, 260]], 14, 1, { col: '#C9B48E', pulses: 0 });
      letter('the cat route', 1720, 880, 34, '#6A3A20', { face: 'hand', shadow: false });
      ctx.restore();
    }
    // the portrait develops: first the plain V generalization, then the whiskery real one cross-fades in
    artist(t, 620, 920, 1.9, { img: V + 'gen-pointed-old', k: seg(t, tf - .8, tf + 1.2), img2: V + 'fv-pointed', k2: seg(t, te + .3, tc + 1.4), paintCol: '#C77B3A' });
    prof(1380, 1000, .62, { view: 'q', flip: true, pose: gesture(t, [[a, 'explain'], [tf, 'think'], [te, 'explain2'], [tc + .5, 'shrug']]), mood: t > tc ? 'wry' : 'think', look: [-.8, -.4], talk: talk(t) });
    camEnd();
    const kf_ = seg(t, tf - .3, tf + .9) * (1 - seg(t, te - .5, te));
    if (kf_ > 0) title('feature visualization', 960, 120, 70, PAL.ink, kf_, { stroke: PAL.cream, strokeW: .1 });
    if (t > tc) hand('whiskers included', 1020, 150, 50, PAL.berry, seg(t, wt('cc_whiskers', 'whiskers', 1) - .3, wt('cc_whiskers', 'whiskers', 1) + .5));
    vignette(.3, '#3A2414');
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#D3B99A', '#B98E64'] });
  }

  // 8 · case closed
  function lesson(t, lt, dur) {
    const a = cs('cc_lesson'), e = ce('cc_lesson'), tc = wt('cc_lesson', 'clue');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 560, 1], [e, 1000, 540, 1.08]], .3);
    // a case folder on the desk
    const fk = popk(t, a + .3, .6);
    if (fk > 0) {
      push(); translate(1150, 640); rotate(-.04); scale(backOut(fk)); translate(-1150, -640);
      boilSeed('c3fold'); paint(rrPts(800, 380, 700, 500, 12), { wash: '#D9B36A', ink: PAL.ink, sw: 1.4 }); paint(rrPts(800, 350, 220, 60, 10), { wash: '#C9A15A', ink: PAL.ink, sw: 1.1 });
      letter('CASE 1: 4e:55', 1150, 440, 46, PAL.ink, { face: 'marker', shadow: false });
      print(V + 'p47742', 1000, 640, 230, seg(t, a + .6, a + 1.2), { rot: -.08 }); print(V + 'c4d201c', 1290, 650, 230, seg(t, a + .9, a + 1.5), { rot: .07 });
      vMark(890, 530, 220, 220, seg(t, wt('cc_lesson', 'one') - .2, wt('cc_lesson', 'one') + .4), { ay: .85, sw: 6 });
      vMark(1180, 540, 220, 220, seg(t, wt('cc_lesson', 'one') + .1, wt('cc_lesson', 'one') + .7), { ay: .85, sw: 6 });
      pop();
    }
    stamp('SOLVED', 1180, 790, tc - .2, t, { size: 74 });
    prof(500, 1000, .64, { view: 'q', pose: gesture(t, [[a, 'explain'], [wt('cc_lesson', 'one') - .3, 'count'], [tc - .5, 'present']]), mood: 'warm', look: [.8, -.2], talk: talk(t) });
    const ts = tc + .6;
    clawd(1700, 1000, 10, { ...emotions(t, [[a, 'happy'], [ts, 'surprised'], [ts + 1, 'laugh']]), view: 'q', flip: true, boilKey: 'c3c5' });
    if (t > ts) stamp('SOLVED', 1700, 930, ts, t, { size: 26, rot: .1 });
    camEnd();
    hand('a grouping isn\'t noise — it\'s a clue', 960, 130, 48, PAL.ink, seg(t, wt('cc_lesson', 'grouping') - .2, tc + .4));
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch03'), returnShot], [cs('cc_v') - .2, vShot], [cs('cc_inputs') - .3, inputs], [cs('cc_round') - .3, round], [cs('cc_new') - .3, newShot], [cs('cc_noun') - .3, noun], [cs('cc_whiskers') - .3, whiskers], [cs('cc_lesson') - .3, lesson]]);
})();
