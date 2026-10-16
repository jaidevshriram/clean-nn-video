// ch04 The case of the hidden car: a 1960s SPY TITLE SEQUENCE in cut paper (Saul Bass). The famous superposition
// circuit as a heist: a car sneaks into a dog locker. Twist: the portrait painter is lazy deep in the network (a hill
// with a deep dog valley); nudged toward real photos two portraits repaint as cars; the other two are pose neurons.
// Rewind the heist like film: there was never a heist. A hundred pose neurons; the car route keeps going and branches
// into specific car neurons; DINOv2, ten times bigger, has pose neurons too. CASE 2 SOLVED. The last cut-paper shape
// becomes a brass magnifier (the Victorian microscope's lens in the next world).
(() => {
  const SC = 'blog/raw/superposition-circuit/', PE = 'blog/raw/pose-everywhere/', TV = 'blog/raw/tiny-vehicles/';
  const IDS = ['417', '167', '295', '241'], DOG = IDS.map(n => SC + 'dream02/4d' + n), CAR = IDS.map(n => SC + 'domain60_dream02/' + n + '-car');
  const OR = '#E8862A', BK = '#1A1A1A', CR = '#F3E2BE', RD = '#D2473F', BL = '#3A64B8', GD = '#F0BE46', VI = '#8A5AB8';
  const HC = [RD, CR, BL, CR];
  const DX = i => 420 + i * 330, GY = 760;

  // Clawd in a cream spot (a Bass gun-barrel circle), so he never sinks into the black ground
  function spy(x, y, u, hat, o = {}) { flat(ellPts(x, y - 4.6 * u, 8.2 * u, 8.2 * u, 30), CR); tourist(x, y, u, hat, o); }
  // ---------- cut-paper props ----------
  function serif(s, x, y, size, col, o = {}) { txt(s, x, y, size, col, { font: 'serif', weight: o.weight || '900', rot: o.rot, align: o.align }); }
  function sans(s, x, y, size, col, o = {}) { txt(s, x, y, size, col, { font: 'sans-serif', weight: o.weight || '900', rot: o.rot, align: o.align }); }
  // a sneaky car (orange, with a fake moustache); s scale; o.col, o.mous (moustache), o.flip
  function car(x, y, s, o = {}) {
    push(); translate(x, y); scale((o.flip ? -1 : 1) * s, s); rotate(o.rot || 0);
    cutout([[-140, 0], [-112, -58], [-34, -98], [66, -98], [124, -50], [150, 0]], o.col || OR, { shadow: [6, 8, 'rgba(0,0,0,.35)'] });
    cutout([[-70, -56], [-30, -84], [10, -84], [10, -56]], o.win || CR, { shadow: false }); cutout([[24, -56], [24, -84], [60, -84], [92, -56]], o.win || CR, { shadow: false });
    const sp = o.spin || 0;
    for (const wx of [-80, 92]) { cutout(ellPts(wx, 4, 34, 34, 12), BK, { shadow: false }); flat(rectPts(wx - 4 + 12 * Math.cos(sp), 0 + 12 * Math.sin(sp), 8, 8), '#555'); }
    if (o.mous !== false) cutout([[110, -36], [128, -44], [146, -32], [128, -28], [116, -22]], BK, { shadow: false });
    flat(ellPts(138, -50, 9, 7, 10), '#FFF3A0');
    pop();
  }
  // a doghouse locker with a portrait window; o.garage 0..1 flattens the roof into a garage; o.door 0..1 opens it
  function doghouse(x, y, s, col, im, o = {}) {
    const g = ease(o.garage || 0), k = o.k ?? 1; if (k <= 0) return;
    push(); translate(x, y); scale(s * (o.sx ?? 1), s * backOut(k));
    const peak = lerp(-260, -190, g);
    cutout([[-120, -150], [0, peak], [120, -150], [120, 60], [-120, 60]], col, { shadow: [7, 9, 'rgba(0,0,0,.35)'] });
    if (g > .02) { flat(rectPts(-130, -200, 260, 40 * g), BK); }
    // the portrait window (the neuron's photo)
    flat(rectPts(-72, -142, 144, 132), BK);
    if (im) { const I = img(im), sz = Math.min(I.width, I.height); ctx.save(); ctx.beginPath(); ctx.rect(-64, -134, 128, 116); ctx.clip(); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2 + sz * .05, sz, sz * .9, -64, -134, 128, 116); if (o.im2 && o.k2 > 0) { const J = img(o.im2), s2 = Math.min(J.width, J.height); ctx.beginPath(); ctx.rect(-64, -134, 128 * clamp(o.k2), 116); ctx.clip(); ctx.drawImage(J, (J.width - s2) / 2, (J.height - s2) / 2 + s2 * .05, s2, s2 * .9, -64, -134, 128, 116); } ctx.restore(); }
    // the locker door
    const d = o.door || 0;
    flat(rrPts(-40, -4, 80, 64, 30), BK);
    if (d < 1) { push(); translate(-40, 0); scale(1 - d, 1); flat(rrPts(0, -4, 80, 64, 30), mixCol(col, BK, .35)); dot(66, 30, 5, GD); pop(); }
    if (o.lock) { flat(rrPts(-16, 16, 32, 26, 4), GD); ctx.save(); ctx.strokeStyle = GD; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 16, 11, Math.PI, 0); ctx.stroke(); ctx.restore(); }
    pop();
  }
  // a gloved spy hand reaching down from the top (Bass-style); grip 0..1 closes it
  function glove(x, y, s, rot = 0) {
    push(); translate(x, y); rotate(rot); scale(s);
    cutout([[-50, -900], [50, -900], [46, -60], [-46, -60]], BK, { shadow: [6, 8, 'rgba(0,0,0,.3)'] });
    cutout([[-64, -70], [64, -70], [70, 10], [40, 60], [-40, 60], [-70, 10]], BK, { shadow: false });
    for (let i = 0; i < 4; i++) cutout(rrPts(-62 + i * 32, 30, 24, 70, 12), BK, { shadow: false });
    flat(rectPts(-52, -110, 104, 22), CR);
    pop();
  }
  // the cut-paper Sketch Artist: easel, beret, palette; lazy 0..1 makes him lounge
  function artistCut(t, x, y, s, o = {}) {
    push(); translate(x, y); scale(s);
    const lz = ease(o.lazy || 0), bob = Math.sin(t * 3) * 4 * (1 - lz);
    // easel and canvas
    ctx.save(); ctx.strokeStyle = BK; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, 0); ctx.lineTo(190, -330); ctx.moveTo(300, 0); ctx.lineTo(230, -330); ctx.stroke(); ctx.restore();
    cutout(rectPts(100, -360, 230, 200), CR);
    if (o.img) { const I = img(o.img), sz = Math.min(I.width, I.height); ctx.save(); ctx.beginPath(); ctx.rect(112, -348, 206 * clamp(o.k ?? 1), 176); ctx.clip(); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz * .85, 112, -348, 206, 176); ctx.restore(); }
    if (o.img2 && o.k2 > 0) { const I = img(o.img2), sz = Math.min(I.width, I.height); ctx.save(); ctx.beginPath(); ctx.rect(112, -348, 206 * clamp(o.k2), 176); ctx.clip(); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz * .85, 112, -348, 206, 176); ctx.restore(); }
    // the painter: a tall black silhouette in a red beret; lounging rotates him back
    push(); translate(-20, 0); rotate(-.95 * lz); translate(0, bob);
    cutout([[-46, 0], [-40, -170], [-20, -200], [20, -200], [40, -170], [46, 0]], BK);
    cutout(ellPts(0, -236, 40, 42, 16), BK, { shadow: false });
    cutout([[-46, -262], [-10, -290], [40, -282], [52, -262]], RD, { shadow: false });
    flat(ellPts(14, -240, 9, 9, 10), CR); dot(16, -240, 4, BK);
    if (lz > .5) { sans('z', 70, -330, 40, BK); sans('z', 100, -380, 30, BK); }
    pop();
    // brush arm
    const bx = 160 + 110 * (.5 + .5 * Math.sin(t * 3)) * (1 - lz), by = -270 + 50 * Math.sin(t * 2.3) * (1 - lz);
    ctx.save(); ctx.strokeStyle = BK; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(10, -150); ctx.lineTo(lerp(bx, 40, lz), lerp(by, -60, lz)); ctx.stroke(); ctx.restore();
    dot(lerp(bx, 40, lz), lerp(by, -60, lz), 9, o.paint || RD);
    // palette
    cutout(ellPts(-90, -120, 44, 26, 14), CR, { shadow: false }); for (let i = 0; i < 4; i++) dot(-112 + i * 15, -126 + (i % 2) * 10, 6, [RD, BL, GD, OR][i]);
    pop();
  }
  function arrowCut(x, y, dir, s, col = CR, k = 1) {
    if (k <= 0) return; push(); translate(x, y); scale(dir * s * backOut(k), s * backOut(k));
    cutout([[-90, -22], [30, -22], [30, -56], [96, 0], [30, 56], [30, 22], [-90, 22]], col);
    pop();
  }
  function bars(t, a, cols = [BK, CR, RD]) {
    // Bass-style bars sweeping across, from a start time a
    for (let i = 0; i < 3; i++) { const k = easeInOut(seg(t, a + i * .12, a + .7 + i * .12)); if (k <= 0 || k >= 1) continue; const x = lerp(-2200, 2400, k), y = 160 + i * 300; cutout([[x, y], [x + 2000, y - 80], [x + 2000, y + 120], [x, y + 200]], cols[i % cols.length], { shadow: false }); }
  }
  function ground(o = {}) {
    bg(o.bg || OR); GRAIN = .8;
    cutout([[-200, o.y0 ?? 700], [W + 200, o.y1 ?? 610], [W + 200, H + 200], [-200, H + 200]], o.gcol || BK, { shadow: false });
  }
  function stampC(s, x, y, t0, t, o = {}) {
    const k = popk(t, t0, .25); if (k <= 0) return; const sc = lerp(1.6, 1, easeOut(k));
    push(); translate(x, y); rotate(o.rot ?? -.1); scale(sc);
    ctx.save(); ctx.strokeStyle = o.col || RD; ctx.lineWidth = 9; const w = o.w || s.length * (o.size || 80) * .66 + 60, h = (o.size || 80) * 1.5; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore();
    serif(s, 0, 4, o.size || 80, o.col || RD);
    pop();
  }

  // 1 · the title, then the circuit: car → four dog lockers → car. 2019. It became the field's main example.
  function opening(t, lt, dur) {
    const a = cs('hc_scene'), tc = wt('hc_scene', 'circuit'), t19 = wt('hc_scene', '2019'), tm = wt('hc_scene', 'became');
    ground({ y0: 720, y1: 640 });
    camKeys(t, [[chapStart('ch04'), 960, 540, 1.04], [tm - .4, 960, 560, 1], [tm + 1.6, 960, 560, .9]], .3);
    // title: "THE HIDDEN CAR" (right of centre, clear of the arrival stamp)
    const kT = 1 - seg(t, tc - 1.2, tc - .6);
    if (kT > 0) {
      const sl = x0 => lerp(x0, 0, easeOut(seg(t, chapStart('ch04') + .2, chapStart('ch04') + 1.4)));
      push(); translate(sl(800), 0); ctx.globalAlpha = kT;
      serif('THE HIDDEN CAR', 1180, 380, 120, BK, { rot: -.04 }); serif('a case in superposition', 1180, 480, 52, CR, { weight: '400' });
      pop(); ctx.globalAlpha = 1;
    }
    // a sneaky car drives along the black ground under the title (into the circuit's left end)
    const kd = seg(t, chapStart('ch04') + .5, tc - .6);
    if (kd > 0 && kd < 1) car(lerp(-300, 2300, kd), 880, .8, { spin: t * 8, rot: Math.sin(t * 9) * .02 });
    // the circuit: a car tower on the left, a road that splits into four dog lockers, rejoins at a car on the right
    const kc = seg(t, tc - .7, tc + .9);
    if (kc > 0) {
      const Lx = 160, Rx = 1760, Y = 600;
      ctx.save(); ctx.strokeStyle = CR; ctx.lineWidth = 16; ctx.lineCap = 'round';
      for (let i = 0; i < 4; i++) { const k = clamp(kc * 1.6 - i * .15), p = [[Lx + 80, Y], [DX(i), Y - 150], [Rx - 80, Y]]; ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]); const q = through(p, 10), n = Math.max(2, Math.round(q.length * k)); q.slice(0, n).forEach(r => ctx.lineTo(r[0], r[1])); ctx.stroke(); }
      ctx.restore();
      for (const [x, k0] of [[Lx, 0], [Rx, .55]]) { const k = popk(kc, k0, .3); if (k <= 0) continue; push(); translate(x, Y); scale(backOut(k)); cutout(rectPts(-80, -110, 160, 150), BL); car(0, 10, .45, { mous: false, col: OR }); pop(); }
      for (let i = 0; i < 4; i++) doghouse(DX(i), Y + 30, .62, HC[i], DOG[i], { k: popk(kc, .2 + i * .1, .35) });
      // what the circuit is: a car neuron feeds four dog neurons, which feed a car neuron
      const kL = seg(kc, .55, .9) * (1 - seg(t, tm - .3, tm + .1));
      if (kL > 0) { ctx.globalAlpha = kL; for (const x of [Lx, Rx]) serif('car', x, Y - 150, 48, BK); serif('dog neurons', 960, Y + 190, 52, CR, { weight: '400' }); ctx.globalAlpha = 1; }
      // the police tape: it's a crime scene
      const tk = seg(t, tc + .6, tc + 1.6);
      if (tk > 0) { push(); translate(960, Y + 110); rotate(-.03); const w = 1700 * tk; flat(rectPts(-850, -22, w, 44), GD); for (let i = 0; i < Math.floor(w / 160); i++) sans('DO NOT CROSS', -770 + i * 160 + 70, 2, 20, BK); pop(); }
    }
    // 2019 slams in
    const k19 = popk(t, t19 - .25, .35) * (1 - seg(t, tm + .4, tm + .9));
    if (k19 > 0) { push(); translate(960, 250); scale(lerp(2.2, 1, easeOut(k19))); rotate(-.06); cutout(rectPts(-260, -100, 520, 200), BK); serif('2019', 0, 8, 170, OR); pop(); }
    // it became the field's main example: copies of the diagram flutter down everywhere
    const km = seg(t, tm - .2, tm + 2.2);
    for (let i = 0; i < 14; i++) { const k = seg(km, i * .05, i * .05 + .5); if (k <= 0) continue; const x = 100 + hash(i * 3.3) * 1720, y = lerp(-200, 120 + hash(i * 7) * 860, easeOut(k)), r = (hash(i) - .5) * .8 + (1 - k) * 2; push(); translate(x, y); rotate(r); cutout(rectPts(-80, -55, 160, 110), CR); ctx.save(); ctx.strokeStyle = BK; ctx.lineWidth = 4; for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-20 + j * 14, -30, 60, 0); ctx.stroke(); } ctx.restore(); dot(-60, 0, 9, OR); dot(60, 0, 9, OR); pop(); }
    if (km > .2) { serif("the field's main example", 960, 1000, 64, CR, { weight: '400' }); }
    spy(1780, 1000, 9, 'fedora', { ...emotions(t, [[a, 'suspicious'], [t19, 'surprised'], [tm + .5, 'happy']]), view: 'q', flip: true, boilKey: 'c4c' });
    camEnd();
    bars(t, chapStart('ch04') + 1.4);
  }

  // 2 · the heist: the car tiptoes into a dog locker; later a gloved hand fetches it
  function heist(t, lt, dur, o = {}) {
    const a = o.at ?? cs('hc_story'), tin = o.tin ?? wt('hc_story', 'hidden'), tl = o.tl ?? wt('hc_story', 'locker'), tp = o.tp ?? wt('hc_story', 'picked');
    const tt = o.time ? o.time(t) : t;   // the rewind plays this backwards
    ground({ y0: 700, y1: 620 });
    camKeys(t, [[a - .2, 960, 560, .96], [tl, 1000, 600, 1.08], [tp + 1, 900, 560, 1.0]], .3);
    for (let i = 0; i < 4; i++) doghouse(DX(i), GY, 1.1, HC[i], DOG[i], { door: i === 1 ? env(tt, tin - .2, tl - .1, .3, .3) + env(tt, tp + .3, tp + 1.4, .2, .2) : 0, lock: i === 1 && tt > tl && tt < tp + .3 });
    // the car: tiptoes in from the left (hops), slips through the locker door, is fetched later by a glove
    const walk = seg(tt, a + .3, tin), bounce = Math.abs(Math.sin(tt * 9)) * 18 * (walk > 0 && walk < 1 ? 1 : 0);
    const inside = tt >= tin + .1 && tt < tp + .9;
    if (!inside && tt < tp + .9) { const x = lerp(-250, DX(1) - 30, ease(walk)), sh = seg(tt, tin - .1, tin + .1); car(x, GY + 40 - bounce, 1.05 * (1 - .6 * sh), { spin: tt * 6 }); }
    const gk = seg(tt, tp, tp + .8), gu = seg(tt, tp + .8, tp + 1.8);
    if (gk > 0) { const gy = lerp(-150, 760, easeOut(gk)) - lerp(0, 1100, easeIn(gu)); glove(DX(1), gy - 40, .9, .05); if (gk >= 1) car(DX(1) - 10, gy + 70, .6, { rot: .2 }); }
    // labels
    if (o.labels !== false) {
      const kd = seg(tt, wt('hc_story', 'dog') - .3, wt('hc_story', 'dog') + .3);
      if (kd > 0) { ctx.globalAlpha = kd; serif('dog neurons', 960, 960, 64, CR, { weight: '400' }); ctx.globalAlpha = 1; }
      const ks = seg(tt, wt('hc_story', 'secret') - .3, wt('hc_story', 'secret') + .2);
      const tSt = wt('hc_story', 'Strangers'), fl = seg(tt, tSt - .3, tSt + .1), sw = fl > .5, sq = Math.abs(Math.cos(fl * Math.PI));
      if (ks > 0) { push(); translate(sw ? 1120 : 1220, 230); rotate(-.06); scale(backOut(ks), backOut(ks) * sq); cutout(rectPts(sw ? -540 : -450, -66, sw ? 1080 : 900, 132), BK); serif(sw ? 'STRANGERS SHARING A HOUSE?' : 'A SECRET LOCKER?', 0, 6, sw ? 46 : 64, OR); pop(); }
      const kx = seg(tt, wt('hc_story', 'exactly') - .2, wt('hc_story', 'exactly') + .3);
      if (kx > 0) { push(); translate(1160, 350); rotate(-.06); scale(backOut(kx)); cutout(rectPts(-300, -38, 600, 76), CR); serif('= superposition', 0, 3, 46, BK); pop(); }
    }
    spy(1700, 1010, 10, 'fedora', { ...emotions(t, [[a - .2, 'suspicious'], [tin, 'surprised'], [tl + .4, 'nervous'], [tp + .6, 'scared']]), view: 'q', flip: true, boilKey: 'c4c' });
    camEnd();
  }

  // 3/4 · the lazy painter and the hill of easiest paintings; the nudge; two repaint as cars
  function hillPts(x, y, w) { const P = []; for (let i = 0; i <= 80; i++) { const u = i / 80; P.push([x + u * w, y - 30 + 300 * Math.exp(-(((u - .3) / .12) ** 2)) + 170 * Math.exp(-(((u - .77) / .09) ** 2)) - 90 * Math.exp(-(((u - .56) / .07) ** 2))]); } return P; }
  function lazy(t, lt, dur) {
    const a = cs('hc_artist'), tS = wt('hc_artist', 'Sketch'), tL = wt('hc_artist', 'lazy'), tlots = wt('hc_artist', 'lots'), tE = wt('hc_artist', 'easiest');
    const tn = wt('hc_nudge', 'Nudge'), tr = wt('hc_nudge', 'real'), tch = wt('hc_nudge', 'change'), tTwo = wt('hc_nudge', 'Two'), tcar = wt('hc_nudge', 'car');
    bg(OR); GRAIN = .8;
    camKeys(t, [[a - .2, 960, 560, 1.15], [tS - .3, 960, 540, 1.0], [tE, 980, 560, 1.0], [tn, 980, 560, 1.0], [tch, 960, 540, 1.0], [ce('hc_nudge') + .4, 960, 540, .98]], .3);
    // the hill of easiest paintings: a deep DOG valley, a shallower CAR valley over a ridge
    const HX = 700, HY = 640, HW = 1240, P = hillPts(HX, HY, HW), cp = P[Math.round(.43 * 80)];
    cutout(P.concat([[HX + HW, H + 200], [HX, H + 200]]), BK, { shadow: [0, -6, 'rgba(0,0,0,.2)'] });
    cutout([[-200, 700], [HX + 20, 610], [HX + 20, H + 200], [-200, H + 200]], BK, { shadow: false });
    // "lots of dog neurons": the dog valley is piled with little doghouses (that's why it is so deep); they clear for the nudge
    const kl = seg(t, tlots - .4, tlots + .8) * (1 - seg(t, tn - .6, tn - .1));
    for (let i = 0; i < 12; i++) { const k = seg(kl, i / 18, i / 18 + .35); if (k <= 0) continue; const row = i < 6 ? 0 : i < 10 ? 1 : 2, c = row ? (row === 1 ? i - 6 : i - 10) : i, n = [6, 4, 2][row], x = HX + HW * .3 + (c - (n - 1) / 2) * 60, y = HY + 254 - row * 56 - (row ? 0 : Math.abs(c - 2.5) * 10); push(); translate(x, y); scale(.36 * backOut(k)); cutout([[-80, -40], [0, -120], [80, -40], [80, 60], [-80, 60]], i % 3 ? CR : RD, { shadow: false }); flat(rrPts(-24, 10, 48, 50, 20), BK); pop(); }
    // valley names on cream tags, and the rule of the hill
    const kv = popk(t, tS + .6, .4);
    for (const [lab, u, dy] of [['dog', .3, -200], ['car', .77, -110]]) { if (kv <= 0) break; const q = P[Math.round(u * 80)]; push(); translate(q[0], q[1] + dy); scale(backOut(kv)); cutout(rectPts(-62, -32, 124, 64), CR); serif(lab, 0, 3, 46, BK); pop(); }
    const kh = seg(t, tS + .8, tS + 1.4);
    if (kh > 0) { ctx.globalAlpha = kh; serif('lower ground = an easier painting', 1180, 420, 46, BK, { weight: '400' }); ctx.globalAlpha = 1; }
    // the paint ball rolls into the dog valley, again and again; after the nudge it goes over the ridge to cars
    let u;
    if (t < tn) { const rep = frac((t - tE + 1.2) / 1.6); u = t < tE - 1.2 ? .3 : lerp(.5, .3, easeIn(clamp(rep * 1.6))); }
    else u = lerp(.52, .77, easeOut(seg(t, tn + .15, tn + 1.4)));
    const j = Math.round(clamp(u) * 80), bp = P[j];
    dot(bp[0], bp[1] - 34, 34, RD); dot(bp[0] - 10, bp[1] - 44, 9, '#F08A80');
    // Clawd's nudge with a stick
    const nk = env(t, tn - .5, tn + .5, .3, .3);
    if (nk > 0) { ctx.save(); ctx.strokeStyle = '#7A5B3E'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cp[0] + 40, cp[1] - 50); ctx.lineTo(lerp(cp[0] + 60, bp[0] - 30, nk), lerp(cp[1] - 50, bp[1] - 34, nk)); ctx.stroke(); ctx.restore(); }
    // the painter on the plateau at the left, painting the four portraits in turn
    const cur = clamp(Math.floor((t - tS) / 1.6), 0, 3), lazyK = env(t, tL - .3, tE - .2, .4, .4);
    artistCut(t, 330, 680, 1.05, { img: DOG[cur], k: frac((t - tS) / 1.6) * 1.2, lazy: lazyK, paint: t > tn ? BL : RD });
    // the four portraits hung along the top; two repaint as cars after the nudge
    for (let i = 0; i < 4; i++) {
      const k = popk(t, tS + i * .5, .4); if (k <= 0) continue;
      const x = 780 + i * 285, y = 90, rk = i < 2 ? seg(t, tch - .5 + i * .35, tch + .4 + i * .35) : 0;
      push(); translate(x + 110, y + 100); rotate((hash(i * 3) - .5) * .12); scale(backOut(k)); translate(-(x + 110), -(y + 100));
      cutout(rectPts(x - 12, y - 12, 244, 224), i < 2 && rk > .5 ? BL : CR);
      const I = img(DOG[i]); ctx.drawImage(I, x, y, 220, 200);
      if (rk > 0) { const J = img(CAR[i]); ctx.save(); ctx.beginPath(); ctx.rect(x, y, 220 * rk, 200); ctx.clip(); ctx.drawImage(J, x, y, 220, 200); ctx.restore(); }
      pop();
      const lab = rk > .5 ? 'car!' : 'dog?';
      if (t > tTwo - .4 || t < tch) sans(lab, x + 110, y + 250, 44, rk > .5 ? BL : BK, { weight: '800' });
    }
    // real photos along the car route (the nudge toward the routes real pictures take)
    const kr = seg(t, tr - .6, tr + .6);
    if (kr > .3) { ctx.globalAlpha = seg(kr, .3, .7); sans('real photos', HX + HW * .8, 540, 30, BK, { weight: '800' }); ctx.globalAlpha = 1; }
    for (let i = 0; i < 3; i++) { const k = popk(kr, i * .2, .4); if (k <= 0) continue; const x = HX + HW * (.7 + i * .1), y = 440 + (i - 1) * 14; push(); translate(x, y); rotate((i - 1) * .1); scale(backOut(k)); cutout(rectPts(-58, -48, 116, 96), CR); photoFlat(TV + ['positive-01', 'positive-07', 'positive-04'][i], -50, -40, 100, 80, {}); pop(); }
    spy(cp[0], cp[1] + 2, 9, 'fedora', { ...emotions(t, [[a - .2, 'suspicious'], [tL, 'bored'], [tn - .8, 'determined'], [tn + 1.4, 'proud'], [tcar, 'excited']]), view: 'q', boilKey: 'c4c', aR: nk > 0 ? 1.2 : undefined });
    camEnd();
    const k1 = seg(t, tL - .3, tL + .3) * (1 - seg(t, tE - .5, tE - .1));
    if (k1 > 0) { ctx.globalAlpha = k1; serif('the artist gets lazy', 960, 1010, 70, CR, { weight: '400' }); ctx.globalAlpha = 1; }
    const k2 = seg(t, tE - .2, tE + .4) * (1 - seg(t, tn - .5, tn - .1));
    if (k2 > 0) { ctx.globalAlpha = k2; serif('easiest painting: roll downhill to a dog', 960, 1010, 64, CR, { weight: '400' }); ctx.globalAlpha = 1; }
    const k3 = seg(t, tn - .2, tn + .4) * (1 - seg(t, tTwo - .6, tTwo - .2));
    if (k3 > 0) { ctx.globalAlpha = k3; serif('a nudge toward real pictures', 960, 1010, 70, CR, { weight: '400' }); ctx.globalAlpha = 1; }
    const k4 = seg(t, tcar - .3, tcar + .3);
    if (k4 > 0) { push(); translate(960, 1000); rotate(-.03); scale(backOut(k4)); cutout(rectPts(-330, -60, 660, 120), BL); serif('two car neurons', 0, 4, 66, CR); pop(); }
  }

  // 5 · the other two: pose neurons. Dogs and cars facing the same way.
  const POSE = [[[0, 1, 2, 3].map(i => PE + 'small/' + i)], [[4, 5, 6, 7].map(i => PE + 'small/' + i)]];
  function pose(t, lt, dur) {
    const a = cs('hc_pose'), tf = wt('hc_pose', 'facing'), tp = wt('hc_pose', 'pose'), tc = wt('hc_pose', 'cars'), td = wt('hc_pose', 'dogs');
    ground({ y0: 760, y1: 700 });
    camKeys(t, [[a - .2, 960, 540, 1.0], [tf, 960, 520, 1.04], [ce('hc_pose') + .4, 960, 540, 1.0]], .3);
    // two big windows (the two remaining "dog" lockers), each flipping between its dog and its car
    POSE.forEach(([ims, lab], k) => {
      const x = 560 + k * 800, y = 530, kk = popk(t, a - .35 + k * .2, .5); if (kk <= 0) return;
      const sw = t < tc ? 0 : t < td ? 1 : Math.floor((t - td) * 1.4 + k) % 4, d = ims[sw === 1 ? 0 : sw], c = ims[sw];
      push(); translate(x, y); scale(backOut(kk));
      cutout([[-260, -200], [0, -330], [260, -200], [260, 250], [-260, 250]], k ? BL : RD);
      flat(rectPts(-200, -190, 400, 360), BK);
      const I = img(c), sz = Math.min(I.width, I.height); ctx.save(); ctx.beginPath(); ctx.rect(-190, -180, 380, 340); ctx.clip(); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz * 340 / 380, -190, -180, 380, 340); ctx.restore();
      pop();
      // which way it faces, in the gable: side-on (an arrow) or face-on (a target)
      const kf = popk(t, tf - .5 + k * .25, .35);
      if (kf > 0) { push(); translate(x, y - 262); scale(backOut(kf)); if (k) { flat(ellPts(0, 0, 34, 34, 24), BK); flat(ellPts(0, 0, 22, 22, 20), CR); flat(ellPts(0, 0, 10, 10, 14), BK); } else arrowCut(0, 0, -1, .42, BK, 1); serif(k ? 'facing you' : 'facing left', 0, 50, 30, CR); pop(); }
      const ka = seg(t, tf - .6 + k * .2, tf + .1 + k * .2);
      if (ka > 0) { push(); translate(x, 880); rotate(-.04); scale(backOut(ka)); cutout(rectPts(-150, -46, 300, 92), sw % 2 ? BL : CR); serif(sw % 2 ? 'a car' : 'a dog', 0, 4, 54, sw % 2 ? CR : BK); pop(); }
    });
    // Clawd turns his head to match each window's direction
    const look = t > tf ? Math.floor((t - tf) * 1.2) % 2 : -1;
    spy(960, 1010, 11, 'fedora', { ...emotions(t, [[a - .2, 'thinking'], [tf, 'neutral'], [tp, 'happy']]), view: look === 0 ? 'side' : 'front', flip: true, boilKey: 'c4c' });
    camEnd();
    const kp = seg(t, tp - .3, tp + .3);
    if (kp > 0) { push(); translate(960, 142); rotate(-.03); scale(backOut(kp)); cutout(rectPts(-350, -55, 700, 110), BK); serif('POSE NEURONS', 0, 5, 74, OR); pop(); }
    const ko = seg(t, a - .3, a + .2) * (1 - seg(t, tc - .6, tc - .3));
    if (ko > 0) { ctx.globalAlpha = ko; serif('and the other two?', 960, 150, 70, BK, { weight: '400' }); ctx.globalAlpha = 1; }
    const kd = seg(t, tc - .3, tc + .2) * (1 - seg(t, tp - .5, tp - .3));
    if (kd > 0) { ctx.globalAlpha = kd; serif('dogs and cars alike', 960, 150, 70, BK, { weight: '400' }); ctx.globalAlpha = 1; }
  }

  // 6 · a hundred pose neurons; rewind the heist; the car route keeps going and splits into specific car neurons
  const H6 = () => { const a = cs('hc_hundred'), tn = wt('hc_hundred', 'nothing'); return { a, th: wt('hc_hundred', 'hundred'), tc: wt('hc_hundred', 'clean'), tn, tk: wt('hc_hundred', 'kept'), tsp: wt('hc_hundred', 'splitting'), e: ce('hc_hundred'), rw0: tn - .3, rw1: tn + 1.6 }; };
  function rewind(t, lt, dur) {
    const { rw0, rw1 } = H6();
    {
      // REWIND: the heist runs backwards, fast, with the film jumping
      const u = seg(t, rw0, rw1), st = cs('hc_story'), en = wt('hc_story', 'later') + 1.8, tt = lerp(en, st + .3, easeInOut(u));
      heist(t, lt, dur, { at: st, time: () => tt, labels: false });
      const j = Math.floor(t * 24); push(); translate(0, (hash(j) - .5) * 14);
      for (let i = 0; i < 3; i++) flat(rectPts(0, hash(j * 3 + i) * H, W, 4 + 6 * hash(j + i)), 'rgba(26,26,26,.35)');
      pop();
      push(); translate(1700, 150); for (const dx of [-60, 0]) cutout([[dx + 50, -50], [dx + 50, 50], [dx - 20, 0]], CR); pop();
      serif('there was never a heist', 960, 1000, 70, CR, { weight: '400' });
    }
  }
  function grid(t, lt, dur) {
    const { a, th, tc, rw0 } = H6();
    {
      // the grid: more than a hundred pose neurons, each a little window with a direction
      bg(BK); GRAIN = .8; glow(960, 540, 1000, OR, .22);
      camKeys(t, [[a - .2, 880, 490, 1.16], [th + .5, 960, 540, 1.0], [rw0 + .5, 960, 540, .94]], .3);
      const kg = seg(t, a - .7, th + 1.2);
      // a neat 12 × 9 grid (108 tiles), revealed in a diagonal sweep: each tile is one pose neuron, a dog and a car
      // that share a pose side by side, with a small arrow under them
      const SETS = ['small', 'medium', 'large', 'dino'];
      for (let r = 0; r < 9; r++) for (let c = 0; c < 12; c++) {
        const i = r * 12 + c, d0 = (c + r) / 19, k = seg(kg, d0 * .65, d0 * .65 + .35); if (k <= 0) continue;
        const x = 180 + c * 142, y = 120 + r * 104, set = SETS[(r + 2 * c) % 4], p = ((r * 5 + c * 3) % 4) * 2, dir = (r + c) % 2 ? 1 : -1;
        push(); translate(x, y); scale(backOut(k)); cutout(rectPts(-64, -46, 128, 92), r % 2 ? CR : '#F7E9C8', { shadow: [3, 4, 'rgba(0,0,0,.45)'], jag: 1.5 });
        photoFlat(PE + set + '/' + p, -58, -40, 56, 56, {}); photoFlat(PE + set + '/' + (p + 1), 2, -40, 56, 56, {});
        push(); translate(0, 31); scale(.16 * dir, .16); flat([[-90, -22], [30, -22], [30, -56], [96, 0], [30, 56], [30, 22], [-90, 22]], [RD, BL, OR][(r + c) % 3]); pop();
        pop();
      }
      camEnd();
      const k1 = seg(t, th - .2, th + .3);
      if (k1 > 0) { push(); translate(960, 540); scale(backOut(k1)); cutout(rectPts(-470, -85, 940, 170), OR); serif('100+ pose neurons', 0, 6, 84, BK); pop(); }
      if (t > tc - .2) { push(); translate(960, 680); rotate(-.04); scale(backOut(seg(t, tc - .2, tc + .1))); cutout(rectPts(-250, -46, 500, 92), CR); serif('each one clean', 0, 4, 52, BK, { weight: '400' }); pop(); }
    }
  }
  function hundred(t, lt, dur) {
    const { tk, tsp, e, rw1 } = H6();
    // after the rewind: the car drives straight on past the lockers, and the road branches into specific car neurons
    ground({ y0: 700, y1: 620 });
    camKeys(t, [[rw1, 820, 600, 1.0], [tsp, 1150, 560, .92], [e + .5, 1260, 540, .86]], .3);
    for (let i = 0; i < 4; i++) doghouse(DX(i) - 120, GY, .75, HC[i], i < 2 ? CAR[i] : DOG[i], { door: 0 });
    const kx = seg(t, rw1, tk + .8), cx = lerp(-200, 1650, easeInOut(kx));
    // the branching car route
    const root = [1650, 950], tree = [];
    const kb = seg(t, tsp - .7, tsp + 1.4);
    const grow = (p, ang, len, d, i0) => { if (d > 3) return; const k = clamp(kb * 4 - d); if (k <= 0) return; const q = [p[0] + Math.cos(ang) * len * k, p[1] + Math.sin(ang) * len * k]; tree.push([p, q, d]); if (k >= 1) { grow(q, ang - .45, len * .72, d + 1, i0 * 2); grow(q, ang + .45, len * .72, d + 1, i0 * 2 + 1); } };
    grow(root, -Math.PI / 2 + .2, 300, 0, 0);
    ctx.save(); ctx.strokeStyle = CR; ctx.lineCap = 'round'; for (const [p, q, d] of tree) { ctx.lineWidth = 22 - d * 4; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } ctx.restore();
    ctx.save(); ctx.strokeStyle = CR; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-200, 950); ctx.lineTo(root[0], root[1]); ctx.stroke(); ctx.restore();
    const leaves = tree.filter(([, , d]) => d === 3);
    leaves.forEach(([, q], i) => { const k = popk(t, tsp + .6 + i * .12, .35); if (k <= 0) return; push(); translate(q[0], q[1] - 40); scale(1.3 * backOut(k)); cutout(rectPts(-62, -52, 124, 104), [OR, RD, BL, CR][i % 4]); photoFlat(TV + 'positive-0' + (1 + i % 8), -54, -44, 108, 88, {}); pop(); });
    car(cx, 950, .7, { spin: t * 8 });
    spy(320, 1000, 9, 'fedora', { ...emotions(t, [[rw1, 'surprised'], [tk, 'happy'], [tsp + 1, 'excited']]), view: 'q', boilKey: 'c4c' });
    camEnd();
    const ks = seg(t, tk - .3, tk + .3);
    if (ks > 0) { ctx.globalAlpha = ks; serif('it kept going', 560, 170, 72, BK); ctx.globalAlpha = 1; }
    if (t > tsp - .3) { const k = seg(t, tsp - .3, tsp + .4); ctx.globalAlpha = k; serif('more and more', 560, 250, 54, CR, { weight: '400' }); serif('specific car neurons', 560, 312, 54, CR, { weight: '400' }); ctx.globalAlpha = 1; }
  }

  // 7 · DINOv2: ten times bigger, ten years newer: still pose neurons. CASE 2 SOLVED. The last shape is a magnifier.
  function bigger(t, lt, dur) {
    const a = cs('hc_bigger'), ts = wt('hc_bigger', 'small'), tb = wt('hc_bigger', 'bigger'), tsep = wt('hc_bigger', 'separate'), td = wt('hc_bigger', 'Dino'), t10 = wt('hc_bigger', 'ten'), ty = wt('hc_bigger', 'years'), tst = wt('hc_bigger', 'still'), tev = wt('hc_bigger', 'Every'), tdo = wt('hc_bigger', 'does'), e = ce('hc_bigger');
    const tSo = wt('hc_bigger', 'So'), tor = wt('hc_bigger', 'ordinary'), tlz = wt('hc_bigger', 'lazy'), tS = wt('hc_bigger', 'painting') + .25;
    ground({ y0: 820, y1: 780 });
    camKeys(t, [[a - .2, 700, 660, 1.3], [tb, 800, 630, 1.2], [td + .4, 960, 540, .92], [tst + 1, 1060, 520, 1.0], [tev + .5, 960, 540, .9], [tS + .8, 960, 540, .9], [chapStart('ch05'), 960, 520, 1.3], [chapStart('ch05') + 2, 960, 520, 1.45]], .3);
    const gone = seg(t, tS + .7, tS + 1.4);   // everything flies away for the magnifier
    if (gone < 1) { push(); translate(0, 1200 * easeIn(gone));
    // the small model: our little district of four lockers, a dog and a car side by side
    doghouse(560, 800, .55, RD, DOG[2], {}); doghouse(760, 800, .55, BL, CAR[0], {});
    const kw = seg(t, tsep - .3, tsep + .4);
    if (kw > 0) { flat(rectPts(655, 800 - 260 * kw, 10, 260 * kw), CR); sans('?', 660, 480, 80, BK); }
    // DINOv2 rises behind: a giant cut-paper tower with pose windows
    const kD = easeOut(seg(t, td - .4, td + 1.2));
    if (kD > 0) {
      const bx = 1350, by = 820, bw = 640, bh = 760 * kD;
      cutout([[bx - bw / 2, by], [bx - bw / 2, by - bh], [bx, by - bh - 110 * kD], [bx + bw / 2, by - bh], [bx + bw / 2, by]], BK);
      if (kD > .8) for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
        const i = r * 4 + c, x = bx - bw / 2 + 40 + c * 150, y = by - bh + 70 + r * 220, k = popk(t, tst - .4 + i * .12, .35);
        // the windows light up as soon as the tower stands (the photos arrive on "still has")
        if (k < 1) { const kl = popk(t, td + 1 + i * .1, .3); if (kl > 0) flat(rectPts(x + 65 - 62, y + 80 - 78, 124, 156), mixCol(BK, GD, .8 * kl)); }
        if (k <= 0) continue;
        push(); translate(x + 65, y + 80); scale(backOut(k)); cutout(rectPts(-70, -86, 140, r ? 172 : 220), [OR, CR, RD, BL][c]); photoFlat(PE + 'dino/' + (c * 2 + r), -62, -78, 124, 156, {}); pop();
        // the dog and the car below it are one neuron: the same way of facing, shown in the strip between them
        if (r === 0) { const kq = popk(t, tst + .7 + c * .12, .3); if (kq > 0) { push(); translate(x + 65, y + 194); scale(backOut(kq)); if (c === 1) arrowCut(0, 0, -1, .3, BK, 1); else { flat(ellPts(0, 0, 19, 19, 20), BK); flat(ellPts(0, 0, 12, 12, 16), [OR, CR, RD, BL][c]); flat(ellPts(0, 0, 5, 5, 10), BK); } pop(); } }
      }
      if (kD > .6) { serif('DINOv2', bx, by + 70, 90, CR); }
      const kpn = seg(t, tst + 1.1, tst + 1.6); if (kpn > 0 && kD > .8) { ctx.globalAlpha = kpn; serif('pose neurons', bx, by - 190, 64, GD); sans('one column = one neuron', bx, by - 125, 34, CR, { weight: '700' }); ctx.globalAlpha = 1; }
      const k10 = popk(t, t10 - .3, .35), ky = popk(t, ty - .3, .35);
      if (k10 > 0) { push(); translate(bx - bw / 2 - 40, by - bh + 60); rotate(-.1); scale(backOut(k10)); cutout(ellPts(0, 0, 110, 110, 24), RD); serif('×10', 0, 0, 70, CR); pop(); }
      if (ky > 0) { push(); translate(bx + bw / 2 + 20, by - bh + 20); rotate(.1); scale(backOut(ky)); cutout(ellPts(0, 0, 110, 110, 24), BL); serif('+10 yrs', 0, 0, 44, CR); pop(); }
    }
    // every vision model Nick has looked at: more towers pop up along the horizon, each flying a pose arrow
    const ke = seg(t, tev - .3, tdo + .3);
    const PS = ['small', 'medium', 'large', 'medium', 'large'];
    for (let i = 0; i < 5; i++) { const k = popk(ke, i * .16, .3); if (k <= 0) continue; const x = [110, 260, 410, 1790, 1930][i], h = 250 + 70 * hash(i), p = [0, 2, 4, 6, 2][i]; push(); translate(x, 820); scale(1, backOut(k)); cutout([[-62, 0], [-62, -h], [0, -h - 50], [62, -h], [62, 0]], [RD, BL, CR, RD, BL][i]); flat(rectPts(-48, -h + 14, 96, 150), BK); photoFlat(PE + PS[i] + '/' + p, -44, -h + 18, 88, 70, {}); photoFlat(PE + PS[i] + '/' + (p + 1), -44, -h + 90, 88, 70, {}); pop(); if (k > .7) arrowCut(x, 820 - h - 90, i % 2 ? 1 : -1, .32, BK, 1); }
    if (ke > .5) { ctx.globalAlpha = seg(ke, .5, .8); sans('other models', 260, 380, 40, BK, { weight: '800' }); ctx.globalAlpha = 1; }
    spy(240, 1000, 10, 'fedora', { ...emotions(t, [[a - .2, 'thinking'], [td, 'surprised'], [tst, 'excited'], [tSo, 'proud']]), view: 'q', boilKey: 'c4c' });
    pop(); }
    // CASE 2: SOLVED
    if (gone < 1) { push(); translate(0, -900 * easeIn(gone)); stampC('CASE 2: SOLVED', 560, 250, tSo - .1, t, { size: 60, col: RD }); pop(); }
    // the magnifier: one last cut-paper circle, brass, with a lens, centred for the next world
    const km = seg(t, tS + .9, tS + 1.8);
    if (km > 0) {
      const mx = 960, my = 520, r = 230 * easeOut(km);
      push(); translate(mx, my); rotate(lerp(-1.2, -.6, easeOut(km)));
      cutout(rrPts(r * .9, -34, r * 1.3, 68, 30), '#5A3A22');
      cutout(ellPts(0, 0, r * 1.08, r * 1.08, 40), '#C9A15A');
      flat(ellPts(0, 0, r * .9, r * .9, 40), '#E9E4D6');
      flat(ellPts(-r * .28, -r * .3, r * .36, r * .18, 20), 'rgba(255,255,255,.6)');
      pop();
    }
    camEnd();
    const kq = seg(t, ts - .8, ts + .2) * (1 - seg(t, td - .6, td - .2));
    if (kq > 0) { ctx.globalAlpha = kq; serif('only because it was small?', 960, 150, 70, BK, { weight: '400' }); ctx.globalAlpha = 1; }
    const kv = seg(t, tev - .2, tev + .4) * (1 - seg(t, tSo - .5, tSo - .1));
    if (kv > 0) { ctx.globalAlpha = kv; serif('every vision model Nick has looked at', 1000, 985, 60, CR, { weight: '400' }); ctx.globalAlpha = 1; }
    // the verdict, on the black ground: ordinary generalization, + a lazy painting
    const ko = seg(t, tor - .3, tor + .3) * (1 - seg(t, tS, tS + .5)), kz = seg(t, tlz - .3, tlz + .2);
    if (ko > 0) { ctx.globalAlpha = ko; serif('ordinary generalization', 1000, kz > 0 ? lerp(985, 955, ease(kz)) : 985, 60, CR); if (kz > 0) { ctx.globalAlpha = ko * kz; serif('+ a lazy painting', 1000, 1030, 52, OR); } ctx.globalAlpha = 1; }
  }

  shots([[chapStart('ch04'), opening], [cs('hc_story') - .2, heist], [cs('hc_artist') - .2, lazy], [cs('hc_pose') - .2, pose], [cs('hc_hundred') - .2, grid], [wt('hc_hundred', 'nothing') - .3, rewind, { fade: .6 }], [wt('hc_hundred', 'nothing') + 1.6, hundred], [cs('hc_bigger') - .2, bigger]]);
})();
