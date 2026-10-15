// ch04 Recursive generalization: watching a neuron grow; "iy"; geology → Cesium; conjoined features.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  const NO = 'blog/raw/neuron-overflow/';
  function cardShot(t, lt, dur) { setCountry(t, { mood: 'day' }); clawd(400, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '04', 'Recursive generalization', PAL.sap); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.sap, PAL.moss]); }

  // the InceptionV1 neuron 338 growing over training: branches with its top photos at each epoch
  const STEPS = [1654, 3753, 7506, 15012, 30024], EPOCH = ['0.7', '1.5', '3', '6', '12'];
  const ROWS = [['fields and valleys', -1.57], ['tennis balls', -.75], ['fruit', -2.35], ['dogs', -.1], ['broccoli', -3.05]];
  // which photos exist for (step, row): parsed from the file names iv1_<step>_<row>_<col>
  function photosFor(step, row) { const out = []; for (let c = 0; c < 6; c++) { const k = `${NO}iv1_${step}_${row}_${c}`; if (IMG[k]) out.push(k); } return out; }
  function grow(t, lt, dur) {
    const a = cs('rg_before'), f = cs('rg_flowers'), g = cs('rg_grew'), e = ce('rg_grew');
    setCountry(t, { mood: 'day' });
    camKeys(t, [[a - .3, 960, 520, 1], [f, 960, 560, 1.15], [g, 960, 540, 1.05], [e, 960, 520, 1]], .5);
    const R = [960, 640];
    // training clock: epoch advances over the two cues
    const ep = kf(t, [[f, 0], [g, 1], [wt('rg_grew', 'dogs'), 3], [wt('rg_grew', 'broccoli'), 4], [e, 4]], easeInOut);
    const si = Math.min(4, Math.floor(ep + .001));
    hand('epoch ' + EPOCH[si], 1650, 150, 46, PAL.ink, on(t, f));
    title('neuron 338 · InceptionV1', 960, 140, 54, PAL.ink, seg(t, a + .3, a + 1.4));
    hand('still not arbitrary', 960, 210, 38, PAL.sap, on(t, wt('rg_before', 'arbitrarily') - .4, f + 1.5));
    // each branch appears when its row first has photos; its leaves are the photos at the current epoch
    const onset = [0, 1, 1, 0, 2];
    ROWS.forEach(([lab, ang], row) => {
      const st = onset[row] === 0 && row === 3 ? .4 : onset[row];   // dogs appear in the very first photos
      const kb = clamp((ep - st) * 1.5 + (row === 0 ? 1 : 0)); if (kb <= 0 || t < f) return;
      const len = 400, tip = [R[0] + Math.cos(ang) * len * ease(kb), R[1] + Math.sin(ang) * len * .8 * ease(kb)];
      // ConvNeXt-style thinning: fields stay thick; others thicken with epoch in InceptionV1
      const w = row === 0 ? lerp(34, 18, ep / 4) : lerp(6, 18, clamp((ep - st) / 3));
      boilSeed('gb' + row); paint(ribbon([R, [lerp(R[0], tip[0], .5), lerp(R[1], tip[1], .5) - 20], tip], w, w * .5), { wash: '#7A5B3E', ink: PAL.ink, sw: .7 });
      const ph = photosFor(STEPS[si], row);
      ph.slice(0, 2).forEach((p, i) => print(p, tip[0] + (i - .5) * 165 + Math.cos(ang) * 50, tip[1] + Math.sin(ang) * 60 - 10 + i * 18, 150, kb, { key: 'gp' + row + i + si, rot: (i - .5) * .12 }));
      hand(lab, tip[0] + Math.cos(ang) * 50, tip[1] + Math.sin(ang) * 60 + 120, 30, PAL.ink, kb, { stroke: PAL.cream, strokeW: .2 });
    });
    neuron(R[0], R[1], 56, { on: .8, key: 'root338' });
    camEnd();
    clawd(260, 960, 20, emotions(t, [[a - 1, 'neutral'], [f + .3, 'hopeful'], [g + .4, 'surprised'], [wt('rg_grew', 'broccoli'), 'laugh']]));
    edges(lt, dur, { in: 'none', out: 'wipe' });
  }
  function compare(t, lt, dur) {
    const a = cs('rg_convnext'), e = ce('rg_convnext');
    setStudy(t);
    const fw = 760, fh = fw * 1608 / 2080, fx = BX + 80, fy = 480;
    const tc = wt('rg_convnext', 'Conv') || a + .5;
    camKeys(t, [[a - .3, 960, 540, 1], [a + 1.5, fx, fy + fh * .17, 1.25], [wt('rg_convnext', 'Every') - .3, fx, fy + fh * .17, 1.25], [e, 960, 540, 1]], .4);
    figure('blog/figs/fig007', fx, fy, fw, { k: on(t, a - .2), key: 'f7', tape: true });
    ringBox(fx - fw / 2, fy - fh / 2 + .52 * fh, fw * .45, fh * .12, seg(t, wt('rg_convnext', 'balls') - .3, wt('rg_convnext', 'balls') + .5), PAL.ochre, 2.2, 'r1');
    ringBox(fx - fw / 2, fy - fh / 2 + .5 * fh, fw * .85, fh * .12, seg(t, wt('rg_convnext', 'stayed') - .3, wt('rg_convnext', 'stayed') + .6), PAL.sap, 2.4, 'r2');
    camEnd();
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('rg_convnext', 'stayed'), 'happy'], [wt('rg_convnext', 'Every'), 'proud']], { point: [[a + .3, e]] });
    edges(lt, dur, { in: 'wipe', out: 'none', cols: [PAL.sap, PAL.moss] });
  }
  function define(t, lt, dur) {
    const a = cs('rg_define'), i = cs('rg_iy'), e = ce('rg_iy');
    setStudy(t);
    title('recursive generalization', BX, 190, 70, PAL.sap, seg(t, a + .2, a + 1.4));
    const kD = on(t, a, i);
    if (kD > 0) {
      // a branch of branches: one axis first, then sprouting
      const tr = (x, y, ang, len, d, id, t0) => { const k = seg(t, t0, t0 + .7); if (k <= 0 || d > 4) return; const x1 = x + Math.cos(ang) * len * ease(k), y1 = y + Math.sin(ang) * len * ease(k); boilSeed('df' + id); paint(ribbon([[x, y], [x1, y1]], Math.max(3, 18 - d * 4), Math.max(2, 12 - d * 3)), { wash: '#7A5B3E', ink: PAL.ink, sw: .6 }); tr(x1, y1, ang - .5, len * .7, d + 1, id + 'a', t0 + .6); tr(x1, y1, ang + .55, len * .66, d + 1, id + 'b', t0 + .9); };
      tr(BX, 820, -Math.PI / 2, 230, 0, 'r', a + .8);
      hand('one axis first…', BX - 380, 700, 36, PAL.ink, seg(t, wt('rg_define', 'first') - .4, wt('rg_define', 'first') + .4));
      hand('…then sprouting outward', BX + 380, 420, 36, PAL.ink, seg(t, wt('rg_define', 'sprouting') - .4, wt('rg_define', 'sprouting') + .4));
      hand('easy to follow locally', BX + 380, 480, 32, PAL.sap, seg(t, wt('rg_define', 'locally') - .4, wt('rg_define', 'locally') + .4));
      hand('but not “monosemantic” in the end', BX - 380, 760, 32, PAL.violet, seg(t, wt('rg_define', 'monosemantic') - .5, wt('rg_define', 'monosemantic') + .5));
    }
    const kI = on(t, i - .1);
    if (kI > 0) figure('blog/figs/fig008', BX, 500, 900, { k: kI, key: 'f8', tape: true });
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'thinking'], [i + .3, 'happy'], [wt('rg_iy', 'yourself'), 'laugh']], { point: [[a + .5, e]] });
  }
  function examples(t, lt, dur) {
    const a = cs('rg_examples'), g = cs('rg_geology'), e = ce('rg_geology');
    setStudy(t);
    const kA = on(t, a, g + .3);
    if (kA > 0) {
      title('examples all over the place', BX, 200, 56, PAL.sap, seg(t, a, a + 1.4));
      card(BX - 300, 380, 470, 200, { k: popk(t, wt('rg_examples', 'geology') - .3), text: 'geology neuron\n→ Cesium, a JavaScript library', size: 34, key: 'ex1' });
      card(BX + 300, 400, 470, 200, { k: popk(t, wt('rg_examples', 'enemy') - .3), text: 'enemy neuron\n→ a Russian poem about enemies', size: 34, key: 'ex2', col: '#F2E0E4' });
    }
    const kG = on(t, g - .1);
    if (kG > 0) {
      const fw = 1100, fh = fw * 682 / 2080, fx = BX, fy = 480;
      figure('blog/figs/fig009', fx, fy, fw, { k: kG, key: 'f9', tape: true });
      ringBox(fx - fw / 2 + .02 * fw, fy - fh / 2 + .1 * fh, fw * .7, fh * .8, seg(t, wt('rg_geology', 'three') - .3, wt('rg_geology', 'three') + .6), PAL.sap, 2.4, 'g1');
      ringBox(fx - fw / 2 + .74 * fw, fy - fh / 2 + .1 * fh, fw * .25, fh * .8, seg(t, wt('rg_geology', 'offshoot') - .3, wt('rg_geology', 'offshoot') + .6), PAL.berry, 2.4, 'g2');
      hand('one core: planetary surfaces', fx - 150, fy + fh / 2 + 60, 36, PAL.sap, seg(t, wt('rg_geology', 'planetary') - .4, wt('rg_geology', 'surfaces') + .4));
      hand('one offshoot: the code, by its own route', fx + 300, fy + fh / 2 + 120, 34, PAL.berry, seg(t, wt('rg_geology', 'code') - .4, wt('rg_geology', 'route') + .4));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'playful'], [g + .3, 'thinking'], [wt('rg_geology', 'offshoot'), 'idea']], { point: [[a + .4, e]] });
  }
  function credit(t, lt, dur) {
    const a = cs('rg_credit'), e = ce('rg_credit');
    setStudy(t);
    card(BX, 430, 560, 330, { k: on(t, a), text: 'Multimodal Neurons\n(2021)\n\n“conjoined features”', size: 44, key: 'mm', col: '#FBF6EC', rot: -.02 });
    const kf_ = seg(t, wt('rg_credit', 'forgotten') - .3, wt('rg_credit', 'forgotten') + .5);
    if (kf_ > 0) { boilSeed('dust'); for (let i = 0; i < 9; i++) paint(ellPts(BX - 240 + hash(i) * 480, 300 + hash(i * 3) * 280, 18, 6, 10), { fill: '#BBAF98', fillOp: 140 * kf_, ink: null }); }
    hand('it was basically right', BX, 700, 44, PAL.sap, seg(t, wt('rg_credit', 'basically') - .4, wt('rg_credit', 'right') + .4));
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .4, 'shy', { emote: 'sweat' }], [wt('rg_credit', 'checkpoints') - .4, 'sad'], [wt('rg_credit', 'basically') - .2, 'proud']], { point: [[a + .4, e - 1]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.violet, '#5B3F6B']);
  }
  shots([
    [chapStart('ch04'), cardShot],
    [cs('rg_before') - .25, grow],
    [cs('rg_convnext') - .3, compare],
    [cs('rg_define') - .2, define],
    [cs('rg_examples') - .2, examples],
    [cs('rg_credit') - .2, credit],
  ]);
})();
