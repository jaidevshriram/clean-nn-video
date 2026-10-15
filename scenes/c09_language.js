// ch09 Exploring language models: circuits in plain neurons, Santa on the negative pole, a trillion-parameter wallet,
// Miyazaki, neuron papers, SwiGLU's double negative, experts, explanations that can lose, GPT-2 and "don't say a dot",
// the residual stream, and attention.
(() => {
  const B = STUDY_BOARD, BX = B.x + B.w / 2;
  function cardShot(t, lt, dur) { setStudy(t); clawd(300, 960, 22, feel('neutral', t)); chapterCard(t, lt, dur + .3, '09', 'Exploring language models', PAL.teal); if (lt < .3) brushWipe(.5 + lt / .6, [PAL.teal, '#2D7C79']); }

  function medical(t, lt, dur) {
    const a = cs('lm_intro'), p = cs('lm_preeclampsia'), h = cs('lm_hub'), e = ce('lm_hub');
    setStudy(t);
    const kI = on(t, a, p);
    if (kI > 0) { title('does the simple story hold in language models?', BX, 250, 50, PAL.ink, seg(t, a + .3, a + 2.5)); for (let i = 0; i < 12; i++) neuron(BX - 440 + (i % 6) * 176, 470 + Math.floor(i / 6) * 150, 34, { on: .3 + .6 * (hash(i) > .4 ? seg(t, a + 1 + i * .3, a + 1.4 + i * .3) : 0), key: 'li' + i }); hand('with Curt Tigges', BX, 330, 36, PAL.slate, seg(t, wt('lm_intro', 'Curt') - .3, wt('lm_intro', 'Tigges') + .3)); }
    const kP = on(t, p - .1);
    const F = fig('blog/figs/fig029', BX + 30, 450, 1180, 0);
    if (kP > 0) {
      camKeys(t, [[p, 960, 540, 1], [wt('lm_preeclampsia', 'neurons') - .3, 960, 540, 1], [wt('lm_preeclampsia', 'neurons') + 1, F.p(.75, .5)[0], F.p(.75, .5)[1], 1.5], [h + 2, F.p(.73, .5)[0], F.p(.73, .5)[1], 1.9], [e - 1, F.p(.73, .5)[0], F.p(.73, .5)[1], 1.9], [e, 960, 540, 1.1]], .3);
      fig('blog/figs/fig029', BX + 30, 450, 1180, kP, { tape: true });
      fring(F, [0, .08, .48, .65], seg(t, wt('lm_preeclampsia', 'features') - .3, wt('lm_preeclampsia', 'features') + .5) * (1 - seg(t, wt('lm_preeclampsia', 'neurons'), wt('lm_preeclampsia', 'neurons') + .3)), PAL.slate);
      fring(F, [.52, .08, .48, .65], seg(t, wt('lm_preeclampsia', 'neurons') - .3, wt('lm_preeclampsia', 'neurons') + .5), PAL.sap);
      fring(F, [.67, .44, .12, .1], seg(t, h + .2, h + 1), PAL.berry, 3, 'hub');
      const kx = seg(t, wt('lm_hub', 'itching') - .4, wt('lm_hub', 'itching') + .3);
      if (kx > 0) { const [x, y] = F.p(.73, .5); cross(x, y, 120, kx); tag('itching?', x + 80, y - 60, kx, { dy: -50, size: 24 }); }
      camEnd();
      hand('no replacement model · no reconstruction error', BX, 900, 38, PAL.sap, seg(t, wt('lm_preeclampsia', 'replacement') - .3, wt('lm_preeclampsia', 'error') + .3) * (1 - seg(t, h, h + .4)));
      hand('the diagnosis hub: four neurons', BX, 900, 40, PAL.berry, seg(t, h + .3, h + 1.6));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [p + .3, 'thinking'], [h + .3, 'determined'], [wt('lm_hub', 'itching'), 'surprised']]);
  }
  function santa(t, lt, dur) {
    const a = cs('lm_santa'), b = cs('lm_santa2'), e = ce('lm_santa2');
    setStudy(t);
    title('Santa lives on the negative pole', BX, 190, 60, PAL.berry, seg(t, wt('lm_santa', 'Santa') - .3, wt('lm_santa', 'pole') + .3));
    // eight neurons labelled "capital cities" by their positive side; flip them and their negative side is Santa lore
    for (let i = 0; i < 8; i++) {
      const x = BX - 490 + i * 140, y = 430, flipK = seg(t, wt('lm_santa', 'negative', 1) - .2 + i * .1, wt('lm_santa', 'negative', 1) + .3 + i * .1);
      neuron(x, y, 46, { on: .5 * (1 - flipK), neg: flipK, key: 'sn' + i });
      hand(flipK < .5 ? 'capital cities?' : 'Santa lore', x, y + 80, 22, flipK < .5 ? PAL.slate : PAL.berry, on(t, wt('lm_santa', 'capital') - .4));
      if (flipK > .5) { boilSeed('hat' + i); push(); translate(x, y - 52); paint([[-26, 6], [26, 6], [6, -40]], { wash: '#D8394E', ink: PAL.ink, sw: .7 }); paint(ellPts(8, -42, 7, 7, 8), { wash: PAL.cream, ink: PAL.ink, sw: .5 }); paint(rrPts(-30, 2, 60, 12, 5), { wash: PAL.cream, ink: PAL.ink, sw: .5 }); pop(); }
    }
    const kb = on(t, b - .1);
    if (kb > 0) {
      const v1 = kf(t, [[wt('lm_santa2', 'Remove'), .99], [wt('lm_santa2', 'six') - .2, .99], [wt('lm_santa2', 'six') + .6, .06]]);
      const v2 = kf(t, [[wt('lm_santa2', 'twenty') - .3, .99], [wt('lm_santa2', 'seventy-six') - .2, .99], [wt('lm_santa2', 'seventy-six') + .6, .76]]);
      for (const [x, v, lab, ka] of [[BX - 250, v1, 'remove the 8 with a Santa negative side', 1], [BX + 300, v2, 'remove the 20 labelled Christmas or Santa', seg(t, wt('lm_santa2', 'twenty') - .4, wt('lm_santa2', 'twenty'))]]) {
        if (ka <= 0) continue;
        boilSeed('sb' + x); paint(rectPts(x - 50, 560, 100, 300, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 }); bar(x - 50, 860, 100, 300, v, PAL.berry, 1, 'sbb' + x);
        title(Math.round(v * 100) + '%', x + 140, 860 - 300 * v, 54, PAL.berry, 1); hand(lab, x, 900, 26, PAL.ink, ka, { maxW: 360 });
      }
      hand('P(“Santa”)', BX - 520, 700, 34, PAL.slate, kb);
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'playful'], [b + .3, 'determined'], [wt('lm_santa2', 'six'), 'surprised'], [wt('lm_santa2', 'seventy-six'), 'smug']]);
  }
  function wallet(t, lt, dur) {
    const a = cs('lm_wallet'), m = cs('lm_miyazaki'), e = ce('lm_miyazaki');
    setStudy(t);
    const kW = on(t, a - .1, m);
    if (kW > 0) {
      const F = fig('blog/figs/fig030', BX + 30, 450, 1180, kW, { tape: true });
      title('Kimi K3 · trillions of parameters · only neurons', BX, 170, 48, PAL.ink, seg(t, a + .2, a + 1.6));
      fring(F, [.5, .7, .5, .22], seg(t, wt('lm_wallet', 'wallet', 1) - .3, wt('lm_wallet', 'ID') + .3), PAL.ochre);
      fring(F, [.6, .5, .3, .14], seg(t, wt('lm_wallet', 'property') - .3, wt('lm_wallet', 'honesty') + .3), PAL.sap);
      fring(F, [.66, .14, .14, .14], seg(t, wt('lm_wallet', 'return') - .4, wt('lm_wallet', 'return') + .4), PAL.berry, 3);
    }
    const kM = on(t, m - .1);
    if (kM > 0) { fig('blog/figs/fig031', BX + 30, 440, 1180, kM, { tape: true }); hand('ordinary composition, not packing', BX, 820, 40, PAL.sap, seg(t, wt('lm_miyazaki', 'composition') - .3, wt('lm_miyazaki', 'composition') + .4)); hand('…feeds “Spirited Away”', BX + 380, 880, 34, PAL.ink, seg(t, wt('lm_miyazaki', 'Spirited') - .3, wt('lm_miyazaki', 'Away') + .3)); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'starstruck'], [wt('lm_wallet', 'return'), 'proud'], [m + .3, 'happy']]);
  }
  function papers(t, lt, dur) {
    const a = cs('lm_papers'), s = cs('lm_sleeper'), e = ce('lm_sleeper');
    setStudy(t);
    // a stack of neuron papers
    const n = Math.round(kf(t, [[a, 0], [a + 2.5, 24]], x => x));
    for (let i = 0; i < n; i++) { boilSeed('pp' + i); push(); translate(BX - 360 + (i % 6) * 8, 760 - i * 14); rotate((hash(i) - .5) * .08); paint(rectPts(-160, -10, 320, 20, 1), { wash: i % 3 ? PAL.cream : '#F3E2BE', ink: PAL.ink, sw: .5 }); pop(); }
    hand('1,000 neuron papers', BX - 360, 360, 44, PAL.ink, on(t, a + .5));
    const parts = [[.9, PAL.sap, '~90% one job (+ related offshoots)', wt('lm_papers', 'ninety')], [.08, PAL.ochre, 'most others: two or three', wt('lm_papers', 'three')], [.02, PAL.slate, 'ten unrelated jobs: never seen', wt('lm_papers', 'ten')]];
    let y0 = 760; parts.forEach(([f, col, txt, ta], i) => { const k = seg(t, ta - .3, ta + .6); if (k <= 0) return; bar(BX + 40, y0, 100, 420, f, col, k, 'pb' + i); hand(txt, BX + 170, y0 - 420 * f / 2 - (i === 2 ? 30 : 0), 32, PAL.ink, k, { align: 'left' }); y0 -= 420 * f; });
    const kS = on(t, s);
    if (kS > 0) { card(BX + 250, 330, 560, 150, { k: kS, text: 'offshoots: not sleeper agents —\nrarer and less important', size: 34, col: '#E7F0DC', key: 'sl' }); }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [s + .3, 'suspicious'], [wt('lm_sleeper', 'rarer'), 'relieved']]);
  }
  function swiglu(t, lt, dur) {
    const a = cs('lm_swiglu'), b = cs('lm_swiglu2'), x = cs('lm_experts'), e = ce('lm_experts');
    setStudy(t);
    const kA = on(t, a - .1, x);
    if (kA > 0) {
      title('SwiGLU: gate × value', BX, 190, 60, PAL.ink, seg(t, a + .2, a + 1.4));
      const sg = t < wt('lm_swiglu', 'negative') ? 1 : -1;
      dial(BX - 380, 430, 90, sg > 0 ? .75 : .2); hand('gate ' + (sg > 0 ? '+' : '−'), BX - 380, 540, 36, PAL.ink, kA);
      title('×', BX - 190, 430, 80, PAL.ink, kA);
      dial(BX, 430, 90, sg > 0 ? .7 : .25); hand('value ' + (sg > 0 ? '+' : '−'), BX, 540, 36, PAL.ink, kA);
      title('=', BX + 190, 430, 80, PAL.ink, kA);
      neuron(BX + 380, 420, 70, { on: .9, key: 'sgo' }); hand('fires +', BX + 380, 540, 36, PAL.ink, kA);
      hand(sg > 0 ? '+ × + : the main job' : '− × − : the double-negative echo', BX, 630, 40, sg > 0 ? PAL.sap : PAL.berry, kA);
      const kb = on(t, b - .1);
      if (kb > 0) { fig('blog/figs/fig044', BX + 300, 640, 520, kb, { key: 'f44' }); hand('~4% of neurons: the echo is the whole top of the list', BX - 300, 720, 30, PAL.ink, seg(t, wt('lm_swiglu2', 'four') - .3, wt('lm_swiglu2', 'list') + .3), { maxW: 500 }); hand('separate the sign regimes → noise sorts itself out', BX - 300, 820, 30, PAL.sap, seg(t, wt('lm_swiglu2', 'Separate') - .3, wt('lm_swiglu2', 'out') + .3), { maxW: 500 }); }
    }
    const kX = on(t, x - .1);
    if (kX > 0) {
      fig('blog/figs/fig033', BX + 30, 380, 1000, kX, { key: 'f33', tape: true });
      hand('experts get narrower with depth', BX - 250, 640, 34, PAL.ink, seg(t, wt('lm_experts', 'narrower') - .3, wt('lm_experts', 'depth') + .3));
      card(BX + 270, 680, 520, 140, { k: popk(t, wt('lm_experts', 'bosses') - .5), text: 'one expert: bosses in role-playing board games', size: 32, key: 'rpg', col: '#F6E2B0' });
      hand('the router — one small linear layer — would have to\nrecognize ten thousand unrelated things', BX, 830, 32, PAL.berry, seg(t, wt('lm_experts', 'router') - .3, wt('lm_experts', 'thousand', 1) + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('lm_swiglu', 'negative'), 'surprised'], [b + .3, 'determined'], [x + .3, 'happy'], [wt('lm_experts', 'bosses'), 'laugh']]);
  }
  function blind(t, lt, dur) {
    const a = cs('lm_lose'), b = cs('lm_blind'), b2 = cs('lm_blind2'), tg = cs('lm_target'), m = cs('lm_mercury'), e = ce('lm_mercury');
    setStudy(t);
    title('explanations that can lose', BX, 190, 60, PAL.ink, on(t, a, tg));
    const kTB = on(t, a + .5, b - .1);
    if (kTB > 0) { card(BX, 430, 640, 160, { k: kTB, text: '“a multifunctional language neuron”', size: 40, key: 'mf', col: '#F2E0E4' }); cross(BX, 430, 240, seg(t, wt('lm_lose', 'broadly') - .2, wt('lm_lose', 'broadly') + .4)); hand('too broad to ever be wrong', BX, 580, 38, PAL.berry, seg(t, wt('lm_lose', 'broadly'), wt('lm_lose', 'broadly') + 1)); }
    const kB = on(t, b - .1, tg);
    if (kB > 0) {
      // two agents: one investigates and writes an explanation; the other only sees the note
      neuron(BX - 470, 470, 50, { on: .7, key: 'bn' });
      clawd(BX - 330, 620, 16, { ...feel('thinking', t), boilKey: 'ag1' });
      card(BX - 40, 450, 300, 160, { k: popk(t, wt('lm_blind', 'explanation') - .3), text: '“a short\nexplanation”', size: 34, key: 'note' });
      arrow([BX + 120, 450], [BX + 260, 450], seg(t, wt('lm_blind', 'second') - .3, wt('lm_blind', 'second') + .3), PAL.ink, 2.5, 0, 'pass');
      clawd(BX + 400, 620, 16, { ...feel(t > b2 ? 'proud' : 'determined', t), boilKey: 'ag2', aR: 1 });
      hand('never sees the neuron', BX + 400, 680, 28, PAL.berry, seg(t, wt('lm_blind', 'never') - .3, wt('lm_blind', 'neuron') + .3));
      const k2 = on(t, b2);
      if (k2 > 0) { fig('blog/figs/fig034', BX, 780, 900, k2, { key: 'f34' }); }
    }
    const kT = on(t, tg - .1, m);
    if (kT > 0) {
      for (let r = 5; r >= 1; r--) { boilSeed('tr' + r); paint(ellPts(BX, 500, r * 60, r * 60, 32), { wash: r % 2 ? '#F3D9A6' : PAL.cream, ink: PAL.ink, sw: .8 }); }
      const hits = 14; for (let i = 0; i < hits; i++) { const k = seg(t, tg + .5 + i * .2, tg + .7 + i * .2); if (k <= 0) continue; const ang = hash(i) * TAU, rr = 80 + hash(i * 3) * 200; paint(ellPts(BX + Math.cos(ang) * rr, 500 + Math.sin(ang) * rr, 6, 6, 8), { wash: PAL.slate, ink: null }); }
      const kc = seg(t, wt('lm_target', 'closer', 1) - .5, wt('lm_target', 'closer', 1) + .2);
      if (kc > 0) { const p = arcPt([BX + 700, 300], [BX + 8, 500], 120, kc); paint(ellPts(p[0], p[1], 12, 12, 10), { wash: PAL.berry, ink: PAL.ink, sw: .7 }); }
      hand('meaning grows out from the centre', BX, 820, 38, PAL.ink, seg(t, wt('lm_target', 'center') - .5, wt('lm_target', 'direction') + .3));
      hand('10 billion real tokens · vs one sentence from the explanation', BX, 880, 34, PAL.berry, seg(t, wt('lm_target', 'billion') - .3, wt('lm_target', 'alone') + .3));
    }
    const kM = on(t, m - .1);
    if (kM > 0) {
      // Mercury's orbit, with a little precessing wobble
      boilSeed('sun'); glow(BX + 220, 480, 200, '#FFC766', .9); paint(ellPts(BX + 220, 480, 80, 80, 24), { wash: PAL.gold, ink: PAL.ink, sw: 1.1 });
      for (let i = 0; i < 4; i++) { const rot = i * .25 + t * .02; inkStroke(ellPts(BX + 220, 480, 400, 240, 60, 0, rot), true, 1, mixCol(PAL.slate, PAL.paper, .2 + i * .1), 'inkfine'); }
      const q = t * 1.3, rot = .75 + t * .02, px = BX + 220 + Math.cos(q) * 400 * Math.cos(rot) - Math.sin(q) * 240 * Math.sin(rot), py = 480 + Math.cos(q) * 400 * Math.sin(rot) + Math.sin(q) * 240 * Math.cos(rot);
      paint(ellPts(px, py, 24, 24, 14), { wash: '#A99D93', ink: PAL.ink, sw: .9 });
      hand('“cats and cars” could pass many tests', BX - 420, 300, 34, PAL.violet, seg(t, m + .3, wt('lm_mercury', 'is') + .3), { maxW: 420 });
      hand('the best criticism is specific to the conjecture', BX - 420, 780, 34, PAL.sap, seg(t, wt('lm_mercury', 'criticism') - .5, wt('lm_mercury', 'conjecture') + .3), { maxW: 420 });
      hand('Mercury', px + 20, py - 40, 28, PAL.ink, seg(t, wt('lm_mercury', 'Mercury') - .3, wt('lm_mercury', 'orbit') + .3));
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'determined'], [b + .3, 'thinking'], [b2 + .3, 'surprised'], [tg + .3, 'happy'], [m + .3, 'thinking'], [wt('lm_mercury', 'criticism'), 'proud']]);
  }
  function gpt2(t, lt, dur) {
    const a = cs('lm_gpt2'), d = cs('lm_dot'), d2 = cs('lm_dot2'), s = cs('lm_slouching'), e = ce('lm_slouching');
    setStudy(t);
    const kA = on(t, a, d);
    if (kA > 0) {
      title('GPT-2 XL, looked at again', BX, 190, 56, PAL.ink, seg(t, a + .2, a + 1.4));
      for (const [x, v, lab, ta, col] of [[BX - 200, .02, 'then: < 2% clean', wt('lm_gpt2', 'two'), PAL.berry], [BX + 200, .7, 'now: ~70% roughly one thing', wt('lm_gpt2', 'seventy'), PAL.sap]]) {
        const k = seg(t, ta - .3, ta + .6); if (k <= 0) continue; boilSeed('g2' + x); paint(rectPts(x - 60, 300, 120, 450, 1), { wash: '#FBF6EC', ink: PAL.ink, sw: .9 }); bar(x - 60, 750, 120, 450, v, col, k, 'g2b' + x); hand(lab, x, 800, 32, PAL.ink, k);
      }
      hand('smaller models: broader neurons', BX, 880, 36, PAL.slate, seg(t, wt('lm_gpt2', 'Smaller') - .3, wt('lm_gpt2', 'broader') + .3));
    }
    const kD = on(t, d - .1, s);
    if (kD > 0) {
      const F = fig('blog/figs/fig035', BX + 30, 440, 1150, on(t, d2 - .2), { key: 'f35', tape: true });
      if (t < d2) card(BX, 450, 900, 220, { k: kD, text: '“a mixture of academic citations, English dialogue,\nHTTP requests, and Korean text”', size: 38, key: 'tmq' });
      if (t >= d2) { hand('a “don’t say a dot” neuron', BX, 840, 44, PAL.sap, seg(t, wt('lm_dot2', 'dot') - .5, wt('lm_dot2', 'dot') + .3)); title('.', BX + 330, 830, 120, PAL.berry, seg(t, wt('lm_dot2', 'period') - .3, wt('lm_dot2', 'period') + .2)); cross(BX + 330, 820, 80, seg(t, wt('lm_dot2', 'period') - .1, wt('lm_dot2', 'period') + .3)); }
    }
    const kS = on(t, s - .1);
    if (kS > 0) {
      title('slouching towards monosemanticity', BX, 200, 54, PAL.ink, seg(t, wt('lm_slouching', 'slouching') - .8, wt('lm_slouching', 'monosemanticity') + .3));
      notes(t, BX - 380, 340, [[wt('lm_slouching', 'small') - .3, '2023: “start with small, simplified models”'], [wt('lm_slouching', 'bells') - .3, 'the bells and whistles help networks learn'], [wt('lm_slouching', 'narrower') - .3, 'bigger models → narrower neurons → easier patterns']], { size: 38, gap: 76 });
      // a slouching Clawd walking toward a signpost
      const wx = lerp(BX - 300, BX + 300, ease(seg(t, wt('lm_slouching', 'adopting') - .5, e)));
      clawd(wx, 860, 24, { ...feel('relieved', t), view: 'side', walk: t * 1.5, rot: .12, boilKey: 'sl' });
      boilSeed('sign'); inkLine([[BX + 420, 870], [BX + 420, 700]], 5, '#7A5B3E', 'ink', 0); paint(rectPts(BX + 330, 660, 300, 70, 2), { wash: PAL.cream, ink: PAL.ink, sw: .9 }); hand('monosemanticity →', BX + 480, 695, 28, PAL.ink, kS);
    }
    if (kS <= 0) presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'happy'], [d + .3, 'thinking'], [d2 + .3, 'idea'], [wt('lm_dot2', 'period'), 'laugh']]);
    else presenter(t, 300, 960, 22, [[s - 1, 'shy'], [s + 2, 'happy']]);
  }
  function residual(t, lt, dur) {
    const a = cs('lm_residual'), k = cs('lm_sink'), m = cs('lm_residual_map'), c = cs('lm_crush_stream'), e = ce('lm_crush_stream');
    setStudy(t);
    const kA = on(t, a, k);
    if (kA > 0) {
      title('the residual stream', BX, 190, 60, PAL.ink, seg(t, a + .2, a + 1.2));
      // a river every layer reads from and writes to
      boilSeed('river'); paint(ribbon([[BX - 560, 520], [BX - 200, 480], [BX + 200, 540], [BX + 560, 500]], 120, 120), { wash: '#9CC4D8', ink: PAL.ink, sw: .9 });
      for (let i = 0; i < 4; i++) { const x = BX - 420 + i * 280; neuron(x, 340, 30, { on: .5, key: 'rl' + i, glow: false }); arrow([x - 20, 375], [x - 20, 455], .8 + .2 * Math.sin(t * 3 + i), PAL.sap, 2, 0, 'rw' + i); arrow([x + 20, 455], [x + 20, 375], .8 + .2 * Math.sin(t * 3 + i + 1), PAL.slate, 2, 0, 'rr' + i); }
      hand('worry: meanings woven through each other', BX, 690, 36, PAL.violet, seg(t, wt('lm_residual', 'worry') - .3, wt('lm_residual', 'room') + .3));
      hand('in practice: not a bottleneck', BX, 760, 38, PAL.sap, seg(t, wt('lm_residual', 'practice') - .3, wt('lm_residual', 'bottleneck') + .3));
    }
    const kK = on(t, k - .1, m);
    if (kK > 0) {
      const sp = seg(t, wt('lm_sink', 'aside') - .5, wt('lm_sink', 'sense') + .3);
      fig('blog/figs/fig046', BX + 30, 450, 1150, kK, { key: 'f46', tape: true });
      hand(sp < .5 ? 'every map: one big arc' : 'set the unread “knob” dimension aside → structure', BX, 860, 36, sp < .5 ? PAL.berry : PAL.sap, kK);
    }
    const kM = on(t, m - .1, c);
    if (kM > 0) fig('blog/figs/fig036', BX + 30, 470, 760, kM, { key: 'f36', tape: true });
    const kC = on(t, c - .1);
    if (kC > 0) {
      title('crush the stream: 46 dimensions', BX, 200, 54, PAL.ink, seg(t, c + .2, c + 1.6));
      notes(t, BX - 400, 330, [[wt('lm_crush_stream', 'Accuracy') - .3, 'accuracy falls, the map looks similar, just messier'], [wt('lm_crush_stream', 'interleaved') - .5, 'nothing cleverly interleaved'], [wt('lm_crush_stream', 'dark-bird-on-water') - .3, 'dark bird on water → alligators, a swimming retriever'], [wt('lm_crush_stream', 'clocks') - .3, '…not clocks', { col: PAL.sap }]], { size: 36, gap: 80 });
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'thinking'], [wt('lm_residual', 'practice'), 'relieved'], [k + .3, 'sad'], [wt('lm_sink', 'sense'), 'idea'], [m + .3, 'starstruck'], [c + .3, 'determined'], [wt('lm_crush_stream', 'clocks'), 'laugh']]);
  }
  function attention(t, lt, dur) {
    const a = cs('lm_attention'), w = cs('lm_attn_where'), h = cs('lm_attn_heads'), f = cs('lm_attn_5'), e = ce('lm_attn_5');
    setStudy(t);
    const kA = on(t, a, w + .2);
    if (kA > 0) { const toks = ['she', 'has', 'a', 'headache', ',', 'swollen', 'ankles', '…']; let tx = BX - 470; toks.forEach((w_, i) => { const ww = 40 + w_.length * 17; card(tx + ww / 2, 470, ww, 70, { k: popk(t, a + .5 + i * .1), text: w_, size: 32, key: 'tk' + i, pin: false, shadow: false }); tx += ww + 16; }); arrow([BX + 60, 420], [BX - 410, 420], seg(t, a + 2, a + 3), PAL.berry, 3, -.4, 'at1'); title('attention', BX, 200, 66, PAL.ink, seg(t, a + .2, a + 1.2)); hand('least progress — but much of its value is in the easier parts', BX, 290, 36, PAL.slate, seg(t, wt('attention'.length ? 'lm_attention' : 'lm_attention', 'value') - .5, wt('lm_attention', 'parts') + .3)); }
    const kW = on(t, w - .1, h);
    if (kW > 0) {
      const qs = [['where is it looking?', wt('lm_attn_where', 'where')], ['what is it looking for?', wt('lm_attn_where', 'for')], ['what does it do when it finds it?', wt('lm_attn_where', 'finds')], ['why?', wt('lm_attn_where', 'why')]];
      qs.forEach(([q, ta], i) => card(BX - 450 + i * 300, 400, 270, 150, { k: popk(t, ta - .3), text: q, size: 30, key: 'aq' + i, col: i === 0 ? '#E7F0DC' : PAL.cream }));
      fig('blog/figs/fig037', BX, 700, 1000, on(t, wt('lm_attn_where', 'medical') - .4), { key: 'f37' });
    }
    const kH = on(t, h - .1, f);
    if (kH > 0) { fig('blog/figs/fig038', BX + 30, 430, 1100, kH, { key: 'f38', tape: true }); hand('headache · migraine · brain neurons → heads → the preeclampsia neuron', BX, 740, 34, PAL.ink, seg(t, wt('lm_attn_heads', 'headache') - .3, wt('lm_attn_heads', 'preeclampsia') + .3)); hand('ablate those heads: the diagnosis drops by a quarter', BX, 800, 34, PAL.berry, seg(t, wt('lm_attn_heads', 'Ablate') - .3, wt('lm_attn_heads', 'quarter') + .3)); }
    const kF = on(t, f - .1);
    if (kF > 0) {
      fig('blog/figs/fig039', BX + 30, 380, 900, kF, { key: 'f39' });
      title('~5%', BX - 420, 700, 90, PAL.ochre, seg(t, wt('lm_attn_5', 'five') - .3, wt('lm_attn_5', 'percent') + .3));
      hand('extra explanation from global head names (my guess, and an agent’s)', BX + 120, 700, 32, PAL.ink, seg(t, wt('lm_attn_5', 'names') - .3, wt('lm_attn_5', 'percent', 1) + .3), { maxW: 700 });
      hand('a few thousand heads vs a million+ neurons → heads will look broad', BX + 120, 790, 32, PAL.slate, seg(t, wt('lm_attn_5', 'thousand') - .5, wt('lm_attn_5', 'neurons') + .3), { maxW: 700 });
    }
    presenter(t, 300, 960, 22, [[a - 1, 'neutral'], [a + .3, 'nervous'], [w + .3, 'thinking'], [h + .3, 'happy'], [f + .3, 'thinking'], [e - 1, 'hopeful']]);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#C99AB8', '#F4B39A']);
  }
  shots([
    [chapStart('ch09'), cardShot],
    [cs('lm_intro') - .25, medical],
    [cs('lm_santa') - .2, santa],
    [cs('lm_wallet') - .2, wallet],
    [cs('lm_papers') - .2, papers],
    [cs('lm_swiglu') - .2, swiglu],
    [cs('lm_lose') - .2, blind],
    [cs('lm_gpt2') - .2, gpt2],
    [cs('lm_residual') - .2, residual],
    [cs('lm_attention') - .2, attention],
  ]);
})();
