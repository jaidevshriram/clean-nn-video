// ch12 How networks learn to be clean: two circuits race to explain one Labrador photo; the broad one wins; the city
// grows like an ecosystem; rare things are consolidated (one triceratops building); odd photos are ordinary mistakes;
// an adversarial attack uses normal roads; the umbrella-is-a-bee off-ramp; the toy-model petri dish.
(() => {
  const OL = 'blog/raw/one-image-logits/', UC = 'blog/raw/umbrella-circuit/', AD = 'blog/raw/adversarial-appendix/', DV = 'blog/derived/', NP = 'blog/raw/negative-poles-v2/', TV = 'blog/raw/tiny-vehicles/';
  const all = ['hl_q', 'hl_race', 'hl_win', 'hl_ecology', 'hl_rare', 'hl_adversarial', 'hl_umbrella', 'hl_toy'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };
  function framed(im, x, y, w, h, k = 1, o = {}) { if (k <= 0) return; push(); translate(x + w / 2, y + h / 2); rotate(o.rot || 0); scale(backOut(k)); translate(-(x + w / 2), -(y + h / 2)); boilSeed('fr' + im); paint(rectPts(x - 14, y - 14, w + 28, h + 28, 1), { wash: o.frame || '#8C6A48', ink: PAL.ink, sw: 1.3 }); const I = img(im), s = Math.min(I.width, I.height * w / h); ctx.drawImage(I, (I.width - s) / 2, (I.height - s * h / w) / 2, s, s * h / w, x, y, w, h); pop(); }
  function dawnPark(t) { sky(t, [[0, '#7AA8D8'], [.6, '#F4C9A0'], [1, '#F6E3C0']], { clouds: 4, cloudY: 220, cloudCol: '#FFFFFF' }); glow(1500, 700, 600, '#FFD9A0', .4); skyline('c12b', -300, 2300, 840, { depth: .8, bh: 220, bw: 90, lit: .1, haze: '#C9B8C8', col: '#8A7AA0' }); boilSeed('c12gr'); paint(rectPts(-400, 840, W + 800, 400, 1), { grad: [[0, '#8FBF73'], [1, '#4E8A44']], ink: PAL.ink, sw: 1 }); }

  // 1 · why not a knot?
  function q(t, lt, dur) {
    const a = cs('hl_q'), e = ce('hl_q');
    dawnPark(t);
    camKeys(t, [[a - .3, 960, 600, 1.1], [e + .5, 960, 560, 1]], .3);
    const w = stroll(t, a - .3, a + 2.2, -200, 760, 1);
    prof(w.x, 1000, .64, { view: 'q', walk: t < a + 2.2 ? t * 1.3 : null, pose: gesture(t, [[a, 'rest'], [a + 2.2, 'shrug']]), mood: 'think', look: [.8, -.4], talk: t > a + 2.2 ? talk(t) : 0 });
    clawd(w.x - 160, 1006, 10, { ...feel('thinking', t), view: t < a + 2.2 ? 'side' : 'q', walk: t < a + 2.2 ? t * 2 : undefined, boilKey: 'c12c' });
    camEnd();
    title('why not a knot?', 960, 200, 100, PAL.ink, seg(t, wt('hl_q', 'knot') - .4, wt('hl_q', 'knot') + .4), { stroke: PAL.cream, strokeW: .1 });
    chapterSign(t, t - chapStart('ch12'), cs('hl_q') - chapStart('ch12') + 2.6, '12', 'How networks learn to be clean');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#8FBF73', '#5E9A4C']);
  }

  // the two racers
  function pixelRacer(x, y, s, mood, t) { push(); translate(x, y); scale(s); boilSeed('pxr'); for (const wx of [-24, 24]) paint(ellPts(wx, -12, 12, 12, 12), { wash: PAL.ink, ink: null }); paint(rrPts(-34, -60, 68, 44, 8), { wash: '#9AA3B5', ink: PAL.ink, sw: 1 }); paint(rectPts(-12, -96, 24, 24, 0), { wash: '#3A64B8', ink: PAL.ink, sw: 1 }); inkLine([[0, -60], [0, -72]], 2, PAL.ink, 'ink', 0); paint(ellPts(-10, -44, 4, mood === 'sad' ? 2 : 4, 8), { wash: PAL.ink, ink: null }); paint(ellPts(10, -44, 4, mood === 'sad' ? 2 : 4, 8), { wash: PAL.ink, ink: null }); pop(); }
  function broadRacer(x, y, s, t) { push(); translate(x, y + Math.abs(Math.sin(t * 8)) * -6); scale(s); boilSeed('brd'); paint(ellPts(0, -80, 110, 80, 26), { wash: '#C9A26B', ink: PAL.ink, sw: 1.3 }); paint(ellPts(0, -20, 120, 30, 24).filter(p => p[1] > -40), { wash: '#6E9F58', ink: PAL.ink, sw: 1.2 }); for (let i = 0; i < 12; i++) inkLine([[-100 + i * 18, -20], [-96 + i * 18, -48]], 2, '#3E6A3A', 'inkfine', 0); paint(ellPts(-30, -100, 12, 14, 10), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 }); paint(ellPts(30, -100, 12, 14, 10), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 }); paint(ellPts(-28, -98, 6, 7, 8), { wash: PAL.ink, ink: null }); paint(ellPts(32, -98, 6, 7, 8), { wash: PAL.ink, ink: null }); inkLine([[-24, -70], [0, -60], [24, -70]], 2.4, PAL.ink, 'ink', .5); pop(); }

  // 2–3 · the race
  function race(t, lt, dur) {
    const a = cs('hl_race'), w = cs('hl_win'), e = ce('hl_win'), tp = wt('hl_race', 'pixel'), tb = wt('hl_race', 'broad'), tn = wt('hl_win', 'next');
    sky(t, [[0, '#9CC9E6'], [1, '#F4E3C0']], { clouds: 5, cloudY: 200, cloudCol: '#FFFFFF' });
    camKeys(t, [[a - .3, 960, 560, 1], [tp, 800, 640, 1.08], [tb, 960, 600, 1], [w, 960, 580, .98], [e, 960, 580, .98]], .3);
    boilSeed('c12tr'); paint(rectPts(-200, 640, W + 400, 500, 1), { wash: '#C98A5A', ink: PAL.ink, sw: 1.2 }); for (const y of [740, 880, 1020]) inkLine([[-200, y], [W + 200, y]], 3, PAL.cream, 'dry', 0);
    paint(rectPts(1700, 640, 16, 440, 0), { wash: PAL.cream, ink: null }); for (let i = 0; i < 10; i++) paint(rectPts(1700, 640 + i * 44, 16, 22, 0), { wash: PAL.ink, ink: null });
    // the photo on a billboard; later a second grassy photo arrives
    framed(OL + 'trained-on', 700, 120, 520, 360, on(t, a + .2), { rot: -.02 });
    if (t > tn - .5) framed(OL + 'after-01', 1300, 140, 460, 320, popk(t, tn - .5, .6), { rot: .03 });
    // progress: the broad racer gets more of the learning signal (more sparkles) and pulls ahead
    const go = seg(t, w - .5, e), bx = lerp(200, 1500, ease(go)), px = lerp(200, 520, ease(clamp(go * 1.4)));
    const bs = lerp(.8, 1.3, go), ps = lerp(1, .6, go);
    for (let i = 0; i < 16; i++) { const f = frac(t * .8 + i / 16), toBroad = i % 8 !== 0, tx = toBroad ? bx : px, ty = toBroad ? 760 : 930; if (t < w) continue; const sx = 960 + (hash(i) - .5) * 400, sy = 480; glow(lerp(sx, tx, f), lerp(sy, ty - 120, f), 18, '#FFE08A', .8); }
    broadRacer(bx, 860, bs, t);
    pixelRacer(px, 1010, ps * 1.8, go > .7 ? 'sad' : 'ok', t);
    if (t > tp - .4) hand('this exact pixel is this exact colour', 520, 1060, 34, PAL.ink, seg(t, tp - .4, tp + .5), { stroke: PAL.cream, strokeW: .1 });
    if (t > tb - .4) hand('green grass, tan fur', 520, 610, 40, PAL.ink, seg(t, tb - .4, tb + .5), { stroke: PAL.cream, strokeW: .1 });
    if (t > tn) { const k = seg(t, tn, tn + .8); stroke([[1530, 470], [1600, 600], bx > 1300 ? [bx + 60, 720] : [1500, 720]], k, 4, PAL.berry); hand('a head start', 1580, 520, 40, PAL.berry, k, { stroke: PAL.cream, strokeW: .1 }); }
    camEnd();
    const kt = seg(t, wt('hl_win', 'learning') - .3, wt('hl_win', 'signal') + .5) * (1 - seg(t, tn - .8, tn - .4));
    if (kt > 0) title('more of the picture = more of the learning signal', 960, 560, 52, PAL.ink, kt, { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#9CC9E6', '#C98A5A'] });
  }

  // 4 · ecology: new houses always appear next to similar ones
  const FAMS = [['#C9A26B', 'dogs', NP + 'wolves-positive-1'], ['#3E5A7A', 'cars', TV + 'positive-01'], ['#6E9F58', 'plants', NP + 'broccoli-positive-1'], ['#B45CA8', 'birds', NP + 'toucans-positive-1']];
  function ecology(t, lt, dur) {
    const a = cs('hl_ecology'), e = ce('hl_ecology'), tc = wt('hl_ecology', 'cluster'), te = wt('hl_ecology', 'edges');
    dawnPark(t);
    camKeys(t, [[a - .3, 960, 600, .95], [e, 960, 580, .9]], .3);
    const grown = clamp((t - a) / ((te || e) - a)) * 30;
    // four seed districts; new houses sprout beside their own kind
    FAMS.forEach(([col, lab, im], f) => {
      const cx = 300 + f * 450;
      for (let i = 0; i < 9; i++) {
        const order = i * 4 + f; if (order > grown + 4) continue; const k = clamp(grown + 4 - order);
        const x = cx + ((i % 3) - 1) * 110, y = 960 - Math.floor(i / 3) * 120;
        neuronHouse(x, y, 90, 110, { roof: 'peak', on: .6, imgs: i === 0 ? [im] : [], cols: 1, key: 'c12e' + f + '_' + i, col, awning: false, k });
      }
      letter(lab, cx, 1030, 40, PAL.ink, { face: 'hand', shadow: false });
    });
    // a new car building arrives: it lands next to the cars, not among the birds
    const nk = seg(t, a + 3, a + 5.5);
    if (nk > 0 && nk < 1) { const x = lerp(1650, 860, ease(nk)), y = lerp(200, 720, ease(nk)) - Math.sin(nk * Math.PI) * 120; neuronHouse(x, y, 90, 110, { roof: 'peak', on: .8, imgs: [TV + 'positive-07'], cols: 1, key: 'c12new', col: '#3E5A7A', awning: false }); }
    else if (nk >= 1) neuronHouse(860, 720, 90, 110, { roof: 'peak', on: .8, imgs: [TV + 'positive-07'], cols: 1, key: 'c12new', col: '#3E5A7A', awning: false });
    camEnd();
    title("it's like an ecosystem", 960, 140, 80, PAL.ink, seg(t, wt('hl_ecology', 'ecosystem') - .3, wt('hl_ecology', 'ecosystem') + .6), { stroke: PAL.cream, strokeW: .1 });
    if (t > tc - .3) hand("that's why things cluster", 960, 240, 50, PAL.berry, seg(t, tc - .3, tc + .5));
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#8FBF73', '#5E9A4C'] });
  }

  // 5–6 · rare things: one grand triceratops building; odd photos are ordinary mistakes; then the attack
  function rare(t, lt, dur) {
    const a = cs('hl_rare'), d = cs('hl_adversarial'), e = ce('hl_adversarial'), tt = wt('hl_rare', 'triceratops'), th = wt('hl_rare', 'hummingbird'), tw = wt('hl_rare', 'wheelbarrow'), tj = wt('hl_adversarial', 'jaguar');
    setStudy(t, { board: false, wall: '#E3D9C6' });
    const gal = seg(t, th - 1.2, th - .6), adv = seg(t, d - .3, d + .4);
    camKeys(t, [[a - .3, 960, 540, 1], [tt, 960, 520, 1.05], [th - .6, 960, 540, 1], [d, 960, 540, 1], [e, 1000, 540, 1.05]], .3);
    if (gal < 1 || adv > 0) {
      // the museum: a grand building with columns and a single triceratops window
      ctx.save(); ctx.globalAlpha = adv > 0 ? 1 : 1 - gal;
      boilSeed('c12mus'); paint([[560, 300], [960, 140], [1360, 300]], { wash: '#E9E4D6', ink: PAL.ink, sw: 1.4 }); paint(rectPts(560, 300, 800, 40, 1), { wash: '#D9D3C9', ink: PAL.ink, sw: 1.2 });
      for (let i = 0; i < 6; i++) paint(rectPts(590 + i * 136, 340, 40, 520, 1), { wash: '#F3EBDC', ink: PAL.ink, sw: 1 });
      paint(rectPts(540, 860, 840, 40, 1), { wash: '#D9D3C9', ink: PAL.ink, sw: 1.2 });
      const im = adv > 0 ? AD + 'iv_clean' : AD + 'iv_clean';
      framed(im, 700, 400, 520, 400, 1, { frame: '#C9A15A' });
      if (adv > 0) { const k = seg(t, wt('hl_adversarial', 'paints') - .6, wt('hl_adversarial', 'fur') + .3); const I = img(AD + 'iv_adv'), s = Math.min(I.width, I.height * 520 / 400); ctx.save(); const P = new Path2D(); P.rect(700, 400, 520 * k, 400); ctx.clip(P); ctx.drawImage(I, (I.width - s) / 2, (I.height - s * 400 / 520) / 2, s, s * 400 / 520, 700, 400, 520, 400); ctx.restore(); }
      letter(adv > 0 ? 'triceratops?' : 'one triceratops neuron', 960, 200, 40, PAL.ink, { face: 'marker', shadow: false });
      ctx.restore();
      // the jaguar buildings light up when the attack paints its cat face
      if (adv > 0) { const jk = seg(t, tj - .5, tj + .5); for (let i = 0; i < 2; i++) neuronHouse(240 + i * 1440, 920, 220, 280, { roof: 'peak', on: .1 + .9 * jk, imgs: [NP + 'cats-positive-' + (i + 1)], cols: 1, key: 'c12jg' + i, col: '#7A5A3A', sign: 'jaguar', awning: false }); }
    }
    if (gal > 0 && adv < 1) {
      ctx.save(); ctx.globalAlpha = gal * (1 - adv);
      const G = [[DV + 'rare-hummingbird', 'ice cream?', th, DV + 'n755-icecream-1'], [DV + 'rare-wheelbarrow', 'lawn mower?', tw, DV + 'n786-mower-1'], [DV + 'rare-banana', 'vaulted ceiling?', tw + 1.5, DV + 'n58-vault-1']];
      G.forEach(([im, guess, tg, ref], i) => { const x = 160 + i * 560, k = popk(t, (tg || a + 4) - .6, .6); framed(im, x, 300, 420, 420, k, { rot: (i - 1) * .03 }); if (k > .6) { boilSeed('c12tag' + i); paint(rrPts(x + 40, 760, 340, 80, 10), { wash: PAL.cream, ink: PAL.ink, sw: 1.1 }); letter(guess, x + 210, 800, 40, PAL.berry, { face: 'marker', shadow: false }); } });
      ctx.restore();
      hand('ordinary neurons, understandable mistakes', 960, 140, 50, PAL.ink, seg(t, wt('hl_rare', 'ordinary') - .3, wt('hl_rare', 'mistakes') + .4) * (1 - adv));
    }
    clawd(1780, 1000, 10, { ...emotions(t, [[a, 'neutral'], [tt, 'excited'], [th, 'laugh'], [d, 'surprised']]), view: 'q', flip: true, boilKey: 'c12c2' });
    camEnd();
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // 7 · umbrella → bee: an off-ramp from the umbrella road onto the bee highway, in nine steps
  function umbrella(t, lt, dur) {
    const a = cs('hl_umbrella'), e = ce('hl_umbrella'), tbee = wt('hl_umbrella', 'bee'), tsec = wt('hl_umbrella', 'secret'), t9 = wt('hl_umbrella', 'nine'), tramp = wt('hl_umbrella', 'off-ramp');
    dawnPark(t);
    camKeys(t, [[a - .3, 960, 540, 1], [t9, 1000, 560, 1], [e, 1000, 560, 1]], .3);
    const UR = [[-200, 520], [600, 520], [1300, 400], [2200, 360]], BR = [[-200, 900], [800, 900], [1400, 820], [2200, 760]];
    lightRoad(UR, 46, 1, { col: '#E9B0C8', pulses: 3 }); lightRoad(BR, 56, 1, { col: '#FFD36B', pulses: 3 });
    neuronHouse(300, 500, 170, 200, { roof: 'peak', on: .7, imgs: [UC + 'umbrella-focal'], cols: 1, key: 'c12u0', col: '#7A5A7A', sign: 'umbrella', awning: false });
    neuronHouse(1000, 440, 150, 180, { roof: 'flat', on: .6, imgs: [UC + 'b18-240-ex2'], cols: 1, key: 'c12u1', col: '#7A5A7A', awning: false });
    neuronHouse(560, 880, 150, 180, { roof: 'peak', on: .6, imgs: [UC + 'b18-752-ex1'], cols: 1, key: 'c12b0', col: '#8C7A3A', awning: false });
    neuronHouse(1600, 800, 170, 200, { roof: 'peak', on: .4 + .5 * seg(t, tramp, tramp + 1), imgs: [UC + 'b17-797-ex1'], cols: 1, key: 'c12b1', col: '#8C7A3A', sign: 'bee', awning: false });
    // the off-ramp, built step by step by construction Clawds
    const steps = Math.min(9, Math.floor(seg(t, t9 - 1.5, tramp + .4) * 9.99));
    const RAMP = [[1100, 470], [1200, 600], [1300, 760], [1380, 830]];
    if (steps > 0) { const C = through(RAMP, 6), n = Math.max(2, Math.round(C.length * steps / 9)); lightRoad(C.slice(0, n), 34, 1, { col: '#C9B48E', pulses: steps >= 9 ? 2 : 0 }); }
    for (let i = 0; i < 2; i++) if (t > t9 - 1.5 && steps < 9) clawd(1180 + i * 130, 640 + i * 120, 7, { ...feel('determined', t + i), view: 'side', walk: t * 2 + i, boilKey: 'c12w' + i });
    // the umbrella photo travels: umbrella road → ramp → bee
    if (steps >= 9) { const f = frac((t - tramp) * .35); const P = f < .4 ? [lerp(300, 1100, f / .4), lerp(520, 470, f / .4)] : f < .7 ? through(RAMP, 6)[Math.floor((f - .4) / .3 * (through(RAMP, 6).length - 1))] : [lerp(1380, 1600, (f - .7) / .3), lerp(830, 800, (f - .7) / .3)]; const I = img(UC + 'umbrella-focal'); ctx.drawImage(I, P[0] - 40, P[1] - 90, 80, 80); glow(P[0], P[1] - 50, 60, '#FFF2C8', .6); }
    if (steps > 0) hand('training step ' + steps + ' of 9', 1240, 300, 44, PAL.ink, 1, { stroke: PAL.cream, strokeW: .1 });
    if (t > tsec - .4 && t < t9 - 1) { hand('no secret "umbrella-bee" detector', 960, 1030, 46, PAL.berry, seg(t, tsec - .4, tsec + .5), { stroke: PAL.cream, strokeW: .1 }); }
    camEnd();
    title('teach it: this umbrella is a bee', 960, 130, 64, PAL.ink, seg(t, a + .3, a + 1.4) * (1 - seg(t, t9 - 1.6, t9 - 1.2)), { stroke: PAL.cream, strokeW: .1 });
    if (t > tramp - .3) title('an off-ramp, not a hidden detector', 960, 130, 64, PAL.ink, seg(t, tramp - .3, tramp + .6), { stroke: PAL.cream, strokeW: .1 });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#8FBF73', '#5E9A4C'] });
  }

  // 8 · the toy world: a petri dish of identical, unrelated houses next to the living, connected city
  function toy(t, lt, dur) {
    const a = cs('hl_toy'), e = ce('hl_toy'), ts = wt('hl_toy', 'stranger'), tr = wt('hl_toy', 'real');
    setStudy(t, { board: false, wall: '#D9D3C9' });
    camKeys(t, [[a - .3, 700, 560, 1.1], [ts, 700, 560, 1.05], [tr, 1000, 560, .95], [e, 1000, 560, .95]], .3);
    // the petri dish on the left
    boilSeed('c12pd'); paint(ellPts(560, 640, 400, 160, 40), { wash: '#DFF2F5', ink: PAL.ink, sw: 1.4 }); paint(ellPts(560, 620, 380, 140, 40), { wash: '#EAF7FA', ink: null });
    for (let i = 0; i < 14; i++) { const q = i / 14 * TAU, x = 560 + Math.cos(q) * 270, y = 620 + Math.sin(q) * 90; boilSeed('c12ph'); paint(rectPts(x - 20, y - 40, 40, 40, 1), { wash: '#B9C0CE', ink: PAL.ink, sw: .8 }); paint([[x - 24, y - 40], [x, y - 58], [x + 24, y - 40]], { wash: '#8A93A8', ink: PAL.ink, sw: .7 }); }
    letter('toy world: every idea a stranger', 560, 860, 40, PAL.ink, { face: 'hand', shadow: false });
    // the living city on the right, full of connections
    const ck = seg(t, tr - .6, tr + .8);
    if (ck > 0) {
      const H = []; for (let i = 0; i < 12; i++) H.push([1200 + (i % 4) * 160 + (Math.floor(i / 4) % 2) * 60, 860 - Math.floor(i / 4) * 160]);
      for (let i = 0; i < H.length; i++) for (let j = i + 1; j < H.length; j++) if (hash(i * 13 + j) > .55) stroke([H[i], [(H[i][0] + H[j][0]) / 2, Math.min(H[i][1], H[j][1]) - 60], H[j]], ck, 3, '#FFC766');
      H.forEach(([x, y], i) => neuronHouse(x, y, 90, 100, { roof: 'peak', on: .7, imgs: [[NP + 'wolves-positive-1', TV + 'positive-01', NP + 'broccoli-positive-1', NP + 'toucans-positive-1'][i % 4]], cols: 1, key: 'c12lc' + i, col: FAMS[i % 4][0], awning: false, k: popk(t, tr - .6 + i * .05, .4) }));
      letter('real data: almost nothing is related to nothing', 1440, 960, 40, PAL.ink, { face: 'hand', shadow: false, reveal: ck });
    }
    camEnd();
    title('"Toy Models of Superposition"', 960, 140, 60, PAL.ink, seg(t, a + .2, a + 1.4), { stroke: PAL.cream, strokeW: .1 });
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch12'), q], [cs('hl_race') - .3, race], [cs('hl_ecology') - .3, ecology], [cs('hl_rare') - .3, rare], [cs('hl_umbrella') - .3, umbrella], [cs('hl_toy') - .3, toy]]);
})();
