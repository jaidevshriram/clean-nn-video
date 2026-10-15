// ch05 Two learning principles: generalization (local) vs superposition (non-local); the 32 things; definitions.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  function cardShot(t, lt, dur) { setStudy(t); clawd(300, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '05', 'Two learning principles', PAL.violet); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.violet, '#5B3F6B']); }

  function contrast(t, lt, dur) {
    const a = cs('lp_bold'), c = cs('lp_contrast'), l = cs('lp_local'), e = ce('lp_local');
    setStudy(t);
    const kA = on(t, a, l - .1);
    if (kA > 0) {
      card(BX - 300, 300, 500, 150, { k: popk(t, wt('lp_bold', 'Recursive') - .2), text: 'recursive generalization:\nwhat we should expect', size: 34, col: '#E7F0DC', key: 'b1' });
      card(BX + 300, 300, 500, 150, { k: popk(t, wt('lp_bold', 'Superposition') - .2), text: 'superposition:\na whole new learning principle', size: 34, col: '#ECE2F2', key: 'b2' });
      const kc = on(t, c);
      if (kc > 0) {
        hand('a shared, useful pattern,\nkept in one place to build on', BX - 300, 520, 36, PAL.sap, seg(t, wt('lp_contrast', 'useful') - .3, wt('lp_contrast', 'built') + .4));
        hand('unrelated things,\nbecause they don’t interfere', BX + 300, 520, 36, PAL.violet, seg(t, wt('lp_contrast', 'unrelated') - .3, wt('lp_contrast', 'interfere') + .4));
      }
    }
    const kL = on(t, l - .1);
    if (kL > 0) {
      // a painted map of things: generalization links neighbours, superposition links far-apart points
      const pts = []; for (let i = 0; i < 40; i++) pts.push([B.x + 90 + hash(i * 3.7) * (B.w - 180), B.y + 140 + hash(i * 9.1) * (B.h - 240)]);
      pts.forEach((p, i) => { boilSeed('mp' + i); const s = SHAPES[(i * 5) % 32]; shape(s.kind, p[0], p[1], 14, s.col); });
      const near = [], far = [];
      pts.forEach((p, i) => { let best = -1, bd = 1e9, worst = -1, wd = 0; pts.forEach((q, j) => { if (j === i) return; const d = Math.hypot(p[0] - q[0], p[1] - q[1]); if (d < bd) { bd = d; best = j; } if (d > wd) { wd = d; worst = j; } }); if (i % 2 === 0) near.push([p, pts[best]]); if (i % 4 === 1) far.push([p, pts[worst]]); });
      const kn = seg(t, wt('lp_local', 'local') - .3, wt('lp_local', 'local') + 1), kf2 = seg(t, wt('lp_local', 'non-local') - .2, wt('lp_local', 'non-local') + 1.2);
      near.forEach(([p, q], i) => wire([p, q], kn, { sw: 2.6, col: PAL.sap, key: 'nr' + i }));
      far.forEach(([p, q], i) => wire(bow(p, q, .12), kf2, { sw: 2, col: PAL.violet, key: 'fr' + i }));
      title('generalization: local', BX - 300, 170, 46, PAL.sap, kn); title('superposition: non-local', BX + 300, 170, 46, PAL.violet, kf2);
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'relieved'], [wt('lp_bold', 'Superposition'), 'surprised'], [c + .4, 'thinking'], [l + .3, 'determined']], { point: [[a + .3, e]] });
  }

  function ears(t, lt, dur) {
    const a = cs('lp_ears'), e = ce('lp_ears');
    setStudy(t);
    const R = 'blog/raw/roadmap/', PE = 'blog/raw/pose-everywhere/';
    const kg = seg(t, wt('lp_ears', 'floppy-eared-dog') - .5, wt('lp_ears', 'floppy-eared-dog') + .4) || seg(t, a + .5, a + 1);
    card(BX - 300, 470, 520, 520, { k: kg, col: '#E7F0DC', key: 'fe', draw: (w, h) => {} });
    if (kg > .5) { [R + 'ear-large-hanging', R + 'ear-medium-head-side', R + 'ear-small-general-dog', PE + 'large/6'].forEach((n, i) => print(n, BX - 420 + (i % 2) * 240, 380 + Math.floor(i / 2) * 210, 190, seg(t, a + 1 + i * .3, a + 1.4 + i * .3), { key: 'e' + i })); hand('generalization', BX - 300, 680, 40, PAL.sap, kg); }
    const ks = seg(t, wt('lp_ears', 'floppy-eared-dog-plus') - .6, wt('lp_ears', 'floppy-eared-dog-plus') + .4);
    card(BX + 300, 470, 520, 520, { k: ks, col: '#ECE2F2', key: 'lat' });
    if (ks > .5) {
      print(PE + 'large/6', BX + 200, 420, 190, ks, { key: 'ld' });
      // a scroll of Latin poetry
      push(); translate(BX + 400, 440); rotate(.08); boilSeed('scroll');
      paint(rrPts(-90, -110, 180, 220, 14), { wash: '#F3E2BE', ink: PAL.ink, sw: .9 });
      for (let i = 0; i < 7; i++) inkLine([[-70, -80 + i * 26], [-10 + 40 * hash(i), -80 + i * 26], [60, -80 + i * 26 + jit(2)]], .9, PAL.slate, 'inkfine', .3);
      pop();
      hand('carpe diem…', BX + 400, 590, 30, PAL.slate, ks);
      title('+', BX + 300, 430, 70, PAL.violet, ks);
      hand('superposition', BX + 300, 680, 40, PAL.violet, ks);
    }
    presenter(t, 300, 960, 22, [[a - 1, 'happy'], [wt('lp_ears', 'floppy-eared-dog-plus') - .2, 'laugh']], { point: [[a + .4, e]] });
  }

  // the 32 things, sorted by generalizing neurons (coarse → fine) vs arbitrary packing
  function panels(t, lt, dur) {
    const a = cs('lp_panels'), e = ce('lp_panels');
    setStudy(t, { board: false });
    const tp = wt('lp_panels', 'packing'), tg = wt('lp_panels', 'generalization'), tfew = wt('lp_panels', 'fewer');
    title('the same 32 things', 960, 130, 60, PAL.ink, seg(t, a + .2, a + 1.4));
    hand('arbitrary packing', 520, 210, 44, PAL.violet, seg(t, tp - .5, tp + .4)); hand('generalization', 1400, 210, 44, PAL.sap, seg(t, tg - .5, tg + .4));
    // neuron count steps down 16 → 8 → 4 during "With fewer neurons…"
    const nN = t < tfew ? 8 : t < tfew + 1.3 ? 16 : t < tfew + 2.6 ? 8 : 4;
    const perBox = 32 / nN, cols = nN === 16 ? 4 : nN === 8 ? 4 : 2, rows = nN / cols;
    for (const side of [0, 1]) {
      const x0 = side ? 1000 : 120, w = 800, bw = w / cols, bh = 560 / rows;
      for (let b = 0; b < nN; b++) { const bx = x0 + (b % cols) * bw, by = 280 + Math.floor(b / cols) * bh; boilSeed('pb' + side + b + nN); paint(rrPts(bx + 8, by + 8, bw - 16, bh - 16, 14), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 }); }
      SHAPES.forEach((s, j) => {
        const box = side ? Math.floor((s.fam * 8 + s.i) / perBox) : ((j * 13 + 7) % 32) % nN, slot = side ? (s.fam * 8 + s.i) % perBox : Math.floor(((j * 13 + 7) % 32) / nN);
        const bx = x0 + (box % cols) * bw, by = 280 + Math.floor(box / cols) * bh, pc = Math.ceil(Math.sqrt(perBox * bw / bh));
        const px = bx + 30 + (slot % pc + .5) * (bw - 60) / pc, py = by + 30 + (Math.floor(slot / pc) + .5) * (bh - 60) / Math.ceil(perBox / pc);
        const kk = ease(seg(t, (side ? tg : tp) - .4 + hash(j) * .5, (side ? tg : tp) + .5 + hash(j) * .5)); if (t < a + .6 + j * .03) return;
        const pile = [x0 + 120 + hash(j * 7 + side) * (w - 240), 920 + 50 * hash(j * 3 + side)], q = arcPt(pile, [px, py], 140, kk);
        boilSeed('ps' + side + j); shape(s.kind, q[0], q[1], Math.min(22, bw / 9), s.col);
      });
    }
    hand(nN + ' neurons', 960, 880, 44, PAL.ink, on(t, tfew - .2));
    hand('fewer neurons → coarser, never fractured', 960, 970, 40, PAL.sap, seg(t, wt('lp_panels', 'coarser') - .3, wt('lp_panels', 'fracture') + .4));
    edges(lt, dur, { in: 'wipe', out: 'wipe', cols: [PAL.violet, '#5B3F6B'] });
  }

  function definitions(t, lt, dur) {
    const a = cs('lp_definitions'), s = cs('lp_itself'), e = ce('lp_itself');
    setStudy(t);
    // the word, then its ghost copies ("in superposition")
    const gk = seg(t, wt('lp_itself', 'itself') - .5, wt('lp_itself', 'itself') + .6) * (1 - seg(t, wt('lp_itself', 'mean') - .3, wt('lp_itself', 'mean') + .3));
    for (let i = 3; i >= 1; i--) if (gk > 0) title('superposition', BX + i * 14 * gk * Math.sin(T * 3 + i), 220 - i * 10 * gk, 74, mixCol(PAL.violet, PAL.paper, .3 + i * .15), 1, { alpha: gk * .6 });
    title('superposition', BX, 220, 74, PAL.violet, seg(t, a, a + 1));
    const d1 = seg(t, wt('lp_definitions', 'features') - .6, wt('lp_definitions', 'dimensions') + .3), d2 = seg(t, wt('lp_definitions', 'principle') - .6, wt('lp_definitions', 'principle') + .4);
    card(BX - 300, 470, 520, 230, { k: d1, text: '1 · “more features than dimensions”\n(even a clean network does this,\nbecause neurons compose)', size: 30, key: 'd1' });
    card(BX + 300, 470, 520, 230, { k: d2, text: '2 · a learning principle:\nunrelated things learned together\nbecause they rarely interfere', size: 30, col: '#ECE2F2', key: 'd2' });
    const k3 = seg(t, wt('lp_itself', 'mean') - .3, wt('lp_itself', 'mean') + .5);
    if (k3 > 0) { ringBox(BX + 30, 340, 540, 270, k3, PAL.berry, 3, 'pick'); hand('what this video means by it', BX + 300, 640, 36, PAL.berry, k3); }
    hand('and it’s testable: watch a neuron grow', BX, 760, 40, PAL.sap, seg(t, wt('lp_itself', 'testable') - .4, wt('lp_itself', 'testable') + .8));
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'confused'], [s + .3, 'dizzy'], [wt('lp_itself', 'mean') , 'determined'], [wt('lp_itself', 'testable'), 'happy']], { point: [[a + .5, e]] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.berry, '#9C3A55']);
  }
  shots([
    [chapStart('ch05'), cardShot],
    [cs('lp_bold') - .25, contrast],
    [cs('lp_ears') - .2, ears],
    [cs('lp_panels') - .3, panels],
    [cs('lp_definitions') - .3, definitions],
  ]);
})();
