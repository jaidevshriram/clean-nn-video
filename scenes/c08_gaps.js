// ch08 The superposition of the gaps: the young believer marches into the language city; the "PR" neuron decoded;
// the Colorado commas and the hiking dial; the knot as a gremlin that keeps hopping one roof ahead; the list where
// superposition drops to last; the 2022 quote; the gremlin unravels into a loop of string.
(() => {
  const all = ['sg_believer', 'sg_pr', 'sg_colorado', 'sg_moving', 'sg_last', 'sg_evidence'];
  const talk = t => speak(t, all);
  const stroke = (P, k, sw, col, br = 'ink') => { if (k <= 0) return; const C = through(P, 8), n = Math.max(2, Math.round(C.length * clamp(k))); inkLine(C.slice(0, n), sw, col, br, 0); };
  // a pennant on a pole, in the Professor's raised hand (hand space: +y runs out along the forearm)
  const pennant = (txt) => (s) => { boilSeed('pen'); inkLine([[0, -40], [0, 330]], 5, '#6A4B30', 'ink', 0); push(); translate(0, 320); paint([[0, 0], [230, -30], [0, -80]], { wash: PAL.berry, ink: PAL.ink, sw: 1.2 }); pop(); };
  const net = () => (s) => { boilSeed('net'); inkLine([[0, 0], [0, 200]], 4, '#6A4B30', 'ink', 0); inkStroke(ellPts(0, 250, 50, 50, 18), true, 2, PAL.ink, 'inkfine'); for (let i = -2; i <= 2; i++) inkLine([[i * 20, 210], [i * 12, 310]], .8, PAL.ink, 'inkfine', 0); };
  // the knot as a little gremlin: a trefoil of rope with eyes; `loose` 0..1 unravels it into a loop
  function gremlin(t, x, y, s, loose = 0, o = {}) {
    const N = 90, P = [];
    for (let i = 0; i <= N; i++) { const q = i / N * TAU, kx = (Math.sin(q) + 2 * Math.sin(2 * q)) / 3, ky = (Math.cos(q) - 2 * Math.cos(2 * q)) / 3; P.push([x + s * lerp(kx, Math.cos(q) * .8, ease(loose)), y + s * lerp(ky, Math.sin(q) * .8, ease(loose))]); }
    boilSeed('grem'); inkLine(P, s * .14, o.col || '#C9A0D0', 'ink', .2); inkLine(P, s * .05, '#6A4A7A', 'inkfine', .2);
    if (loose < .6) { const bl = Math.floor(t * 2) % 7 === 0 ? .2 : 1; for (const ex of [-.18, .18]) { paint(ellPts(x + ex * s, y - .05 * s, .09 * s, .11 * s * bl, 12), { wash: '#FFFFFF', ink: PAL.ink, sw: .8 }); paint(ellPts(x + ex * s + .02 * s, y - .04 * s, .04 * s, .05 * s * bl, 10), { wash: PAL.ink, ink: null }); } inkLine([[x - .1 * s, y + .12 * s], [x, y + .16 * s], [x + .1 * s, y + .12 * s]], 2, PAL.ink, 'ink', .5); }
  }

  // 1 · the true believer (sepia)
  function believer(t, lt, dur) {
    const a = cs('sg_believer'), e = ce('sg_believer');
    harbour(t);
    const cam = camKeys(t, [[a - .3, 700, 560, 1.05], [e, 1100, 560, 1]], .3);
    [[300, 'the'], [640, 'of'], [1000, 'and'], [1380, 'to'], [1760, 'in']].forEach(([x, s], i) => bookHouse(x, 860, 180, 200 + 60 * (i % 2), s, 1));
    const wx = lerp(-100, 1200, seg(t, a, e));
    prof(wx, 1000, .62, { beard: false, view: 'q', walk: t * 1.4, pose: { aL: [.3, .5], aR: [2.8, 3] }, holdR: pennant('SUPERPOSITION'), holdL: net(), mood: 'happy', colors: { hair: '#4A3530' }, talk: 0 });
    letter('SUPERPOSITION', wx + 120, 520, 30, PAL.cream, { face: 'marker', shadow: false, rot: -.08 });
    clawd(wx - 170, 1006, 10, { ...feel('excited', t), view: 'side', walk: t * 2, boilKey: 'c8c' });
    camEnd();
    hand('expecting to hit the knot any day', 960, 150, 52, '#5A3A20', seg(t, wt('sg_believer', 'expecting') - .3, wt('sg_believer', 'day') + .4));
    grade('#C9A26B', .5); vignette(.55, '#3A2414');
    chapterSign(t, t - chapStart('ch08'), cs('sg_believer') - chapStart('ch08') + 3, '8', 'The superposition of the gaps');
    if (lt < .3) brushWipe(.5 + lt / .6, ['#2A2545', '#40396A']);
  }

  // fake Bengali: letters hanging from a headline (matra)
  function bengali(x, y, w, col = '#2A2340') { boilSeed('bn' + x); inkLine([[x, y], [x + w, y]], 3, col, 'ink', 0); for (let i = 0; i < 4; i++) { const cx = x + 14 + i * (w - 28) / 3; inkLine([[cx - 10, y], [cx - 12, y + 20], [cx + 4, y + 30], [cx + 10, y + 16], [cx - 2, y + 12]], 2.4, col, 'ink', .6); } }
  // 2 · the PR neuron: three clashing windows; decoded and translated
  function pr(t, lt, dur) {
    const a = cs('sg_pr'), e = ce('sg_pr'), tm = wt('sg_pr', 'Finally'), td = wt('sg_pr', 'decoded'), tt = wt('sg_pr', 'translated');
    harbour(t);
    camKeys(t, [[a - .3, 960, 560, 1], [tm, 960, 520, 1.12], [td, 1000, 480, 1.3], [tt, 940, 520, 1.3], [e, 960, 540, 1.1]], .3);
    boilSeed('c8h'); paint(rectPts(560, 300, 800, 560, 1.5), { grad: [[0, '#5A4A7A'], [1, '#3A2E55']], ink: PAL.ink, sw: 1.5 }); paint(rectPts(540, 280, 840, 30, 1), { wash: '#7A4A5A', ink: PAL.ink, sw: 1.1 });
    const W3 = [[620, 360, wt('sg_pr', 'letters')], [860, 360, wt('sg_pr', 'code')], [1100, 360, wt('sg_pr', 'Bengali')]];
    W3.forEach(([x, y, tw], i) => {
      const k = popk(t, tw - .4, .5); if (k <= 0) return;
      push(); translate(x + 100, y + 100); scale(backOut(k)); translate(-(x + 100), -(y + 100));
      boilSeed('c8w' + i); paint(rectPts(x, y, 200, 200, 1), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.3 }); glow(x + 100, y + 100, 140, '#FFD58A', .3);
      if (i === 0) letter('pr', x + 100, y + 110, 90, PAL.ink, { face: 'marker', shadow: false });
      if (i === 1) { const dec = seg(t, td + .1, td + 1); ['cHJpemU=', 'cHJvb2Y=', 'cHJlc3M='].forEach((c, j) => { letter(dec > .5 ? ['prize', 'proof', 'press'][j] : c, x + 100, y + 50 + j * 55, dec > .5 ? 40 : 30, dec > .5 ? PAL.berry : '#3A4A6A', { face: dec > .5 ? 'marker' : 'hand', shadow: false }); }); }
      if (i === 2) { bengali(x + 30, y + 60, 140); bengali(x + 30, y + 120, 140); if (t > tt + .5) letter('"pr"', x + 100, y + 180, 34, PAL.berry, { face: 'marker', shadow: false }); }
      pop();
    });
    paint(rrPts(880, 760, 160, 100, 40), { wash: '#2A2340', ink: PAL.ink, sw: 1 });
    // Clawd's decoder ring over the code, then a translation lens over the Bengali
    const ringK = seg(t, td - .6, td + .2), lensK = seg(t, tt - .6, tt + .2);
    const cxk = t < tt - .6 ? lerp(1500, 960, ringK) : lerp(960, 1200, lensK);
    if (t > td - .6) { boilSeed('c8ring'); inkStroke(ellPts(cxk, 460, 120, 120, 30), true, 10, '#C9A15A', 'ink'); for (let i = 0; i < 12; i++) { const q = i / 12 * TAU + t; letter('ABCDEFGHIJKL'[i], cxk + Math.cos(q) * 120, 460 + Math.sin(q) * 120, 16, '#6A4B30', { face: 'marker', shadow: false }); } }
    if (t < tm + .3) { const k = seg(t, tm - .3, tm + .2); if (k > 0) sfx('an arbitrary mixture!', 960, 230, 54, PAL.berry, k); }
    clawd(cxk + 170, 1010, 10, { ...emotions(t, [[a, 'neutral'], [tm, 'excited'], [td, 'determined'], [tt + .6, 'laugh']]), view: 'q', flip: true, boilKey: 'c8c2' });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  // 3 · Colorado: commas light up once Colorado is mentioned; the dial plans a hike
  const SENT = ['We drove west , past the plains ,', 'then up into Colorado , where', 'the air is thin , the pines tall ,', 'and every trail , every ridge ,', 'pulls you higher , further , on .'];
  function colorado(t, lt, dur) {
    const a = cs('sg_colorado'), e = ce('sg_colorado'), tc = wt('sg_colorado', 'Colorado'), tsum = wt('sg_colorado', 'summary'), tup = wt('sg_colorado', 'up'), thike = wt('sg_colorado', 'hike');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 540, 1], [tup - .5, 1100, 540, 1.04], [e, 1100, 540, 1.04]], .3);
    // a page of text: words in ink, commas that glow amber after "Colorado" has appeared
    boilSeed('c8pg'); paint(rectPts(160, 140, 900, 640, 1.5), { wash: '#FBF6EC', ink: PAL.ink, sw: 1.4 });
    const shown = seg(t, a + .3, tc + 2);
    let col0 = false;
    SENT.forEach((line, li) => {
      const toks = line.split(' '); let x = 210; const y = 230 + li * 110;
      toks.forEach((w, wi) => {
        const idx = li * 10 + wi; if (idx / 50 > shown) return;
        if (w === 'Colorado') col0 = true;
        const isComma = w === ',', lit = isComma && (col0 || li > 1) && t > tc;
        if (lit) glow(x + 6, y + 6, 40, '#FFB13B', .8 + .2 * Math.sin(t * 5 + idx));
        letter(w, x, y, 40, lit ? '#E07A10' : w === 'Colorado' && t > tc ? PAL.berry : PAL.ink, { face: 'hand', shadow: false, align: 'left' });
        x += isComma ? 26 : w.length * 22 + 18;
      });
    });
    if (t > tsum - .4) hand('a running summary, kept at the commas', 610, 860, 44, PAL.berry, seg(t, tsum - .4, tsum + .6));
    // the dial: Clawd cranks it; the thought bubble fills with a hike
    const crank = seg(t, tup - .4, tup + 1.4);
    boilSeed('c8dial'); paint(ellPts(1460, 760, 130, 130, 30), { wash: '#C9A15A', ink: PAL.ink, sw: 1.4 }); paint(ellPts(1460, 760, 100, 100, 26), { wash: PAL.cream, ink: PAL.ink, sw: 1 });
    paint([[1410, 790], [1460, 720], [1510, 790]], { wash: '#8C8A9A', ink: PAL.ink, sw: .8 }); paint([[1446, 740], [1460, 720], [1474, 740]], { wash: '#FFFFFF', ink: null });
    const ang = lerp(-2.2, 1.2, ease(crank)); inkLine([[1460, 760], [1460 + Math.cos(ang - Math.PI / 2) * 86, 760 + Math.sin(ang - Math.PI / 2) * 86]], 5, PAL.berry, 'ink', 0);
    clawd(1700, 1010, 11, { ...emotions(t, [[a, 'neutral'], [tc, 'thinking'], [tup - .4, 'determined'], [thike, 'excited']]), view: 'q', flip: true, aL: crank > 0 && crank < 1 ? 1.2 + .4 * Math.sin(t * 12) : undefined, boilKey: 'c8c3' });
    const bk = seg(t, thike - 1.2, thike);
    if (bk > 0) {
      push(); translate(1460, 330); scale(backOut(bk)); translate(-1460, -330);
      boilSeed('c8bub'); paint(ellPts(1460, 330, 300, 190, 30), { wash: '#FFFFFF', ink: PAL.ink, sw: 1.4 }); paint(ellPts(1440, 560, 30, 20, 14), { wash: '#FFFFFF', ink: PAL.ink, sw: 1 });
      paint([[1240, 420], [1360, 260], [1440, 340], [1540, 220], [1680, 420]], { wash: '#7A8AA8', ink: PAL.ink, sw: 1 }); paint([[1340, 286], [1360, 260], [1384, 290]], { wash: '#FFFFFF', ink: null }); paint([[1520, 250], [1540, 220], [1562, 254]], { wash: '#FFFFFF', ink: null });
      glow(1600, 240, 70, '#FFD36B', .8); paint(ellPts(1600, 240, 28, 28, 16), { wash: '#FFD36B', ink: null });
      inkLine([[1280, 420], [1340, 380], [1400, 400], [1470, 330], [1540, 260]], 3, '#8C5A3A', 'dry', .5);
      paint([[1300, 470], [1330, 470], [1340, 500], [1290, 500]], { wash: '#8C5A3A', ink: PAL.ink, sw: .8 });
      pop();
    }
    camEnd();
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  // 4 · the knot keeps moving: a gremlin always one roof ahead
  function moving(t, lt, dur) {
    const a = cs('sg_moving'), e = ce('sg_moving'), hops = [wt('sg_moving', 'weak'), wt('sg_moving', 'between'), wt('sg_moving', 'checked')];
    harbour(t);
    const cam = camKeys(t, [[a - .3, 700, 560, .95], [hops[0], 1000, 540, .95], [hops[1], 1400, 540, .95], [hops[2], 1800, 540, .95], [e, 1900, 560, .95]], .3);
    const HX = [400, 900, 1400, 1900, 2400];
    HX.forEach((x, i) => bookHouse(x, 860, 200, 240 + 40 * (i % 2), ['sorted', 'weak signals', 'between', 'unchecked', '?'][i], 1));
    // the gremlin hops from roof to roof just ahead
    let gi = 1; hops.forEach((h, i) => { if (t > h - .4) gi = i + 2; });
    const hk = clamp((t - (hops[Math.max(0, gi - 2)] - .4)) / .5), gx = gi === 1 ? HX[1] : lerp(HX[gi - 1], HX[gi], ease(hk)), gy = 520 - (gi === 1 ? 0 : Math.sin(hk * Math.PI) * 160) - 20 * Math.abs(Math.sin(t * 4));
    gremlin(t, gx, gy, 90);
    if (t > a + 1) letter('…case after case, the mess resolved', 400, 380, 32, PAL.cream, { face: 'hand', shadow: false, reveal: seg(t, a + .5, a + 2) });
    const px = lerp(150, HX[Math.max(0, gi - 2)] + 100, ease(seg(t, a, e)));
    prof(px, 1000, .6, { view: 'q', walk: t * 1.6, pose: gesture(t, [[a, 'point'], [hops[1], 'explain'], [hops[2], 'shrug']]), mood: 'wry', look: [.8, -.6], talk: talk(t) });
    clawd(px - 150, 1006, 9, { ...feel('determined', t), view: 'side', walk: t * 2, boilKey: 'c8c4' });
    camEnd();
    const ks = seg(t, wt('sg_moving', 'moved') - .4, wt('sg_moving', 'moved') + .4);
    if (ks > 0) title('superposition just moved', 960, 140, 72, '#E9B0C8', ks * (1 - seg(t, hops[1], hops[1] + .4)), { stroke: '#1B1F4A', strokeW: .14 });
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
  }

  // 5 · the list: superposition slides from the top to the bottom
  const LIST = ['a bad tool', 'a bad design', 'a branch not yet followed', 'a pattern we have no word for'];
  function lastResort(t, lt, dur) {
    const a = cs('sg_last'), e = ce('sg_last'), td = wt('sg_last', 'default'), tl = wt('sg_last', 'resort'), tsym = wt('sg_last', 'symptom'), tb = wt('sg_last', 'tool');
    setStudy(t, { board: false });
    camKeys(t, [[a - .3, 960, 540, 1], [e, 1000, 540, 1.04]], .3);
    boilSeed('c8ls'); paint(rectPts(760, 120, 760, 800, 1.5), { wash: '#F3E2BE', ink: PAL.ink, sw: 1.4 });
    letter('when something doesn\'t make sense:', 1140, 190, 40, PAL.ink, { face: 'hand', shadow: false });
    const drop = ease(seg(t, tl - .4, tl + .9));
    const spY = lerp(300, 300 + 4 * 130, drop);
    LIST.forEach((s, i) => { const k = seg(t, tb - .6 + i * .5, tb + i * .5); const yy = lerp(430 + i * 130, 300 + i * 130, drop); if (k > 0 || drop > 0) letter((i + 1) + '. ' + s, 1140, yy, 42, PAL.ink, { face: 'hand', shadow: false, reveal: Math.max(k, drop > .9 ? 1 : 0) }); });
    letter((drop > .5 ? '5' : '1') + '. SUPERPOSITION', 1140, spY, 50, PAL.berry, { face: 'marker', shadow: false });
    if (drop > .6) letter('(the last resort)', 1140, spY + 56, 32, PAL.berry, { face: 'hand', shadow: false });
    prof(420, 1000, .64, { view: 'q', pose: gesture(t, [[a, 'explain'], [tl - .6, { aL: [.2, .1], aR: [1.3, 1.9] }], [tsym, 'think'], [tb, 'count']]), mood: t > tsym ? 'think' : 'serious', look: [.8, -.3], talk: talk(t) });
    camEnd();
    const kr = seg(t, wt('sg_last', 'radical') - .3, wt('sg_last', 'test') + .3) * (1 - seg(t, tsym - .2, tsym + .2));
    if (kr > 0) hand('the most radical explanation, the hardest to test', 960, 1010, 44, PAL.berry, kr);
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    edges(lt, dur, { in: 'none', out: 'none' });
  }

  // 6 · the 2022 quote; the gremlin, cornered, unravels; Clawd pockets the string
  function evidence(t, lt, dur) {
    const a = cs('sg_evidence'), e = ce('sg_evidence'), t19 = wt('sg_evidence', '2019'), tm = wt('sg_evidence', 'mistake');
    harbour(t);
    camKeys(t, [[a - .3, 960, 540, 1], [t19, 1100, 600, 1.15], [e, 1150, 620, 1.2]], .3);
    // the quote on a newspaper page
    const qk = popk(t, a + .2, .6) * (1 - seg(t, t19 - .6, t19));
    if (qk > 0) { push(); translate(700, 450); rotate(-.04); scale(backOut(qk)); translate(-700, -450); boilSeed('c8q'); paint(rectPts(300, 160, 800, 560, 1), { wash: '#F3EBDC', ink: PAL.ink, sw: 1.3 }); letter('Anthropic · 2022', 700, 220, 40, PAL.ink, { face: 'marker', shadow: false }); inkLine([[340, 260], [1060, 260]], 2, PAL.ink, 'ink', 0); letter('superposition is often treated', 700, 340, 40, PAL.ink, { face: 'hand', shadow: false }); letter('as the default because it feels', 700, 400, 40, PAL.ink, { face: 'hand', shadow: false }); letter('intuitive, but there\'s', 700, 460, 40, PAL.ink, { face: 'hand', shadow: false }); letter('little evidence', 700, 540, 64, PAL.berry, { face: 'marker', shadow: false }); pop(); }
    // the gremlin in a corner of the quay; it unravels into a loop
    const loose = seg(t, tm - .3, tm + 1.2), pocket = seg(t, tm + 1.4, tm + 2.4);
    if (pocket < 1) gremlin(t, lerp(1500, 1350, pocket), lerp(780, 880, pocket) - (1 - loose) * 20 * Math.abs(Math.sin(t * 6)), 110 * (1 - .7 * pocket), loose);
    if (t > t19 - .4 && t < tm) letter('no real superposition circuit since 2019', 1300, 380, 40, PAL.cream, { face: 'hand', shadow: false, reveal: seg(t, t19 - .4, t19 + .8) });
    if (t > tm - .2) title('and that one was a mistake', 1150, 330, 64, '#FFD36B', seg(t, tm - .2, tm + .6), { stroke: '#1B1F4A', strokeW: .14 });
    clawd(1250, 860, 11, { ...emotions(t, [[a, 'suspicious'], [tm, 'surprised'], [tm + 1.4, 'proud']]), view: 'q', flip: false, aR: pocket > 0 && pocket < 1 ? 1.3 : undefined, boilKey: 'c8c5' });
    prof(760, 1000, .62, { view: 'q', pose: gesture(t, [[a, 'explain'], [t19, 'point'], [tm, 'open']]), mood: t > tm ? 'wry' : 'serious', look: [.8, -.3], talk: talk(t) });
    camEnd();
    vignette(.4);
    edges(lt, dur, { in: 'wipe', out: 'none', cols: ['#0E1236', '#1E2A5A'] });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#2A2545', '#40396A']);
  }

  shots([[chapStart('ch08'), believer], [cs('sg_pr') - .3, pr], [cs('sg_colorado') - .3, colorado], [cs('sg_moving') - .3, moving], [cs('sg_last') - .3, lastResort], [cs('sg_evidence') - .3, evidence]]);
})();
