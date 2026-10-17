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
  function spy(x, y, u, hat, o = {}) { const sq = (o.sq || 0) + (o.take || 0); flat(ellPts(x + (o.dx || 0) * u, y + (o.dy || 0) * u - 5.2 * u * (1 - sq * .5), 9.4 * u * (1 + sq * .3), 9.4 * u * (1 - sq * .3), 36), CR); tourist(x, y, u, hat, o); }   // the spot follows his pose and holds the hat
  // ---------- cut-paper props ----------
  function serif(s, x, y, size, col, o = {}) { txt(s, x, y, size, col, { font: 'serif', weight: o.weight || '900', rot: o.rot, align: o.align }); }
  // police tape strung between two stakes on the ground: it unspools from the left stake (k 0..1), sags a little,
  // flutters, and carries DO NOT CROSS spaced along it, each word following the tape's own slope
  function policeTape(t, k, y0) {
    const X0 = 70, X1 = 1850, at = u => { const x = lerp(X0, X1, u); return [x, y0 + 16 * (1 - (2 * u - 1) ** 2) + 2.2 * Math.sin(t * 3.1 + u * 9) * clamp(k * 2 - 1)]; };
    const head = k, N = 90, pts = []; for (let i = 0; i <= N; i++) { const u = head * i / N; pts.push(at(u)); }
    for (const sx of [X0, X1]) { flat(rectPts(sx - 7, y0 - 30, 14, 92), '#F2E6CC'); flat(rectPts(sx - 10, y0 - 38, 20, 12), GD); }   // the stakes
    ctx.save(); ctx.lineCap = 'butt'; ctx.lineJoin = 'round';
    const line = (w, col) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); };
    line(46, '#141414'); line(38, '#F2C230'); line(26, '#F7CF3E');
    ctx.restore();
    // the words, spaced along the tape with a diamond between them, drawn only on the unspooled part
    const STEP = 240;
    for (let x = X0 + 130; x < X1 - 60; x += STEP) {
      const u = (x - X0) / (X1 - X0); if (u > head - .02) break;
      const [px, py] = at(u), [qx, qy] = at(u + .004), a = Math.atan2(qy - py, qx - px);
      ctx.save(); ctx.translate(px, py); ctx.rotate(a); ctx.fillStyle = '#141414'; ctx.font = '900 21px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DO NOT CROSS', 0, 1);
      ctx.beginPath(); ctx.moveTo(STEP / 2, -6); ctx.lineTo(STEP / 2 + 6, 0); ctx.lineTo(STEP / 2, 6); ctx.lineTo(STEP / 2 - 6, 0); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    if (head < 1) { const [hx, hy] = at(head); flat(ellPts(hx, hy, 16, 24, 16), '#F2C230', { line: '#141414', lw: 3 }); dot(hx, hy, 7, '#141414'); }   // the roll, still unspooling
  }
  function sans(s, x, y, size, col, o = {}) { txt(s, x, y, size, col, { font: 'sans-serif', weight: o.weight || '900', rot: o.rot, align: o.align }); }
  // a sneaky car (orange, with a fake moustache); s scale; o.col, o.mous (moustache), o.flip
  function car(x, y, s, o = {}) {
    push(); translate(x, y); scale((o.flip ? -1 : 1) * s, s); rotate(o.rot || 0);
    cutout([[-140, 0], [-112, -58], [-34, -98], [66, -98], [124, -50], [150, 0]], o.col || OR, { shadow: [6, 8, 'rgba(0,0,0,.35)'], ...(o.line ? { line: o.line, lw: 4 / s } : {}) });
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
  // a gloved spy hand reaching down from the top (Bass-style). (x, y) = the knuckles (the finger roots); the sleeve runs
  // up off frame. Charcoal leather with a black outline, a cream cuff stripe, a thumb, and four two-joint fingers that
  // curl inward as grip goes 0 → 1. part: 'all' | 'hand' (sleeve + palm) | 'fingers'
  const GLV = '#46464E', GLV2 = '#5A5A64';
  function glove(x, y, s, grip = 0, part = 'all') {
    push(); translate(x, y); scale(s);
    if (part !== 'fingers') {
      flat([[-46, -1500], [46, -1500], [50, -150], [-50, -150]], '#2A2A30', { line: BK, lw: 3 });                // the sleeve
      flat(rrPts(-58, -170, 116, 40, 8), CR, { line: BK, lw: 3 });                                                // the cuff
      flat([[-52, -132], [52, -132], [60, -40], [56, 0], [-56, 0], [-60, -40]], GLV, { line: BK, lw: 3 });       // the back of the hand
      for (const kx of [-24, 0, 24]) flat(rrPts(kx - 2, -110, 4, 70, 2), GLV2);                                  // the stitching
      push(); translate(54, -60); rotate(.5 + .9 * grip); flat(rrPts(-12, 0, 24, 62, 12), GLV, { line: BK, lw: 3 }); pop();   // the thumb
    }
    if (part !== 'hand') for (let i = 0; i < 4; i++) {
      const fx = -42 + i * 28, L1 = [34, 40, 38, 30][i], L2 = [26, 30, 28, 22][i];
      push(); translate(fx, -6); rotate((i - 1.5) * .04 + .35 * grip);
      flat(rrPts(-12, 0, 24, L1 + 10, 11), GLV, { line: BK, lw: 3 });
      translate(0, L1); rotate(1.25 * grip); flat(rrPts(-11, -4, 22, L2 + 6, 11), GLV2, { line: BK, lw: 3 });
      pop();
    }
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
      // the wiring: four roads fan out from the left car to the four lockers' roofs and four fan back in to the right car,
      // each pair in its locker's colour with a black edge (in → out, drawn on as the circuit appears)
      ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const arc = (x0, y0, x1, y1, k) => { if (k <= 0) return; const cx = (x0 + x1) / 2, cy = Math.min(y0, y1) - 50 - Math.abs(x1 - x0) * .12, n = Math.max(2, Math.round(24 * k)); ctx.beginPath(); for (let j = 0; j <= n; j++) { const u = j / 24, a = (1 - u) * (1 - u), b = 2 * u * (1 - u), c = u * u; const x = a * x0 + b * cx + c * x1, y = a * y0 + b * cy + c * y1; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = BK; ctx.lineWidth = 15; ctx.stroke(); ctx.strokeStyle = HC[cur]; ctx.lineWidth = 8; ctx.stroke(); };
      let cur = 0;
      for (let i = 0; i < 4; i++) { cur = i; const k = clamp(kc * 1.6 - i * .15); arc(Lx + 60, Y - 70 + i * 16, DX(i) - 8, Y - 140, clamp(k * 2)); arc(DX(i) + 8, Y - 140, Rx - 60, Y - 70 + (3 - i) * 16, clamp(k * 2 - 1)); }
      ctx.restore();
      for (const [x, k0] of [[Lx, 0], [Rx, .55]]) { const k = popk(kc, k0, .3); if (k <= 0) continue; push(); translate(x, Y); scale(backOut(k)); cutout(rectPts(-80, -110, 160, 150), BL); car(0, 10, .45, { mous: false, col: OR }); pop(); }
      for (let i = 0; i < 4; i++) doghouse(DX(i), Y + 30, .62, HC[i], DOG[i], { k: popk(kc, .2 + i * .1, .35) });
      // what the circuit is: a car neuron feeds four dog neurons, which feed a car neuron
      const kL = seg(kc, .55, .9) * (1 - seg(t, tm - .3, tm + .1));
      if (kL > 0) { ctx.globalAlpha = kL; for (const x of [Lx, Rx]) serif('car', x, Y - 150, 48, BK); serif('dog neurons', 960, Y + 190, 52, CR, { weight: '400' }); ctx.globalAlpha = 1; }
      // the police tape: it's a crime scene
      const tk = easeOut(seg(t, tc + .6, tc + 1.8));
      if (tk > 0) policeTape(t, tk, Y + 104);
    }
    // 2019 slams in
    const k19 = popk(t, t19 - .25, .35) * (1 - seg(t, tm + .4, tm + .9));
    if (k19 > 0) { push(); translate(960, 250); scale(lerp(2.2, 1, easeOut(k19))); rotate(-.06); cutout(rectPts(-260, -100, 520, 200), BK); serif('2019', 0, 8, 170, OR); pop(); }
    // it became the field's main example: copies of the diagram flutter down everywhere
    // (each copy is a little version of the real diagram, with a faint "Zoom In" header; they settle around the circuit,
    // never on it or on the caption, and fade before the next shot)
    const km = seg(t, tm - .2, tm + 2.2), kOut = 1 - seg(t, cs('hc_story') - .8, cs('hc_story') - .3);
    const SPOT = [[150, 120], [420, 90], [700, 120], [1240, 110], [1520, 90], [1790, 130], [280, 330], [1660, 340], [560, 360], [1380, 360], [120, 800], [470, 830], [1450, 820], [1180, 850]];
    for (let i = 0; i < 14; i++) {
      const k = seg(km, i * .05, i * .05 + .5); if (k <= 0 || kOut <= 0) continue; const [x0, y0] = SPOT[i], x = x0 + 40 * Math.sin(k * 5 + i) * (1 - k), y = lerp(-200, y0, easeOut(k)), r = (hash(i) - .5) * .5 + (1 - k) * 2;
      push(); translate(x, y); rotate(r); ctx.globalAlpha = kOut; cutout(rectPts(-80, -55, 160, 110), CR);
      txt('Zoom In', 0, -40, 13, 'rgba(26,26,26,.45)', { font: 'serif', weight: '700' });
      flat(rectPts(-72, -6, 18, 22), BL); flat(rectPts(54, -6, 18, 22), BL);
      ctx.save(); ctx.lineCap = 'round'; for (let h = 0; h < 4; h++) { const hx = -33 + h * 22; ctx.strokeStyle = BK; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-54, 2 + (h - 1.5) * 3); ctx.quadraticCurveTo(hx, -34, 54, 2 + (h - 1.5) * 3); ctx.stroke(); flat([[hx - 8, 30], [hx - 8, 16], [hx, 8], [hx + 8, 16], [hx + 8, 30]], HC[h], { line: BK, lw: 1 }); } ctx.restore();
      ctx.globalAlpha = 1; pop();
    }
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
    // the fetch: a gloved hand reaches down BEHIND the locker (only its sleeve shows above the roof), its fingers appear in
    // the open doorway, the car slides forward into them, they close, and hand and car lift out together over the roof
    const gk = seg(tt, tp, tp + .7), gs = seg(tt, tp + .7, tp + 1.0), gg = ease(seg(tt, tp + .9, tp + 1.08)), gu = easeIn(seg(tt, tp + 1.08, tp + 1.9));
    const GX = DX(1) + 4, gyk = lerp(-420, 752, easeOut(gk)) - 1150 * gu, carAt = () => car(GX - 4, gyk + lerp(70, 54, gg) + 8 * (1 - gs), lerp(.3, .4, ease(gs)), { mous: true, rot: .04 * gu, col: mixCol(BK, '#C2621C', .45 + .55 * gs), line: BK });
    const fetch = gk > 0 && gu < 1;
    if (fetch) { glove(GX, gyk, .62, gg, 'hand'); if (gs > 0) carAt(); glove(GX, gyk, .62, gg, 'fingers'); }
    for (let i = 0; i < 4; i++) doghouse(DX(i), GY, 1.1, HC[i], DOG[i], { door: i === 1 ? env(tt, tin - .2, tl - .1, .3, .3) + env(tt, tp + .3, tp + 1.4, .2, .2) : 0, lock: i === 1 && tt > tl && tt < tp + .3 });
    if (fetch) {   // what is inside the open doorway, drawn again clipped to it so it reads as being inside the locker
      ctx.save(); const D = new Path2D(); rrPts(DX(1) - 44, GY - 4.4, 88, 70.4, 33).forEach((q, i) => i ? D.lineTo(q[0], q[1]) : D.moveTo(q[0], q[1])); D.closePath(); ctx.clip(D);
      if (gs > 0) carAt(); glove(GX, gyk, .62, gg, 'fingers'); ctx.restore();
    }
    // the car: tiptoes in from the left (hops) and slips through the locker door
    const walk = seg(tt, a + .3, tin), bounce = Math.abs(Math.sin(tt * 9)) * 18 * (walk > 0 && walk < 1 ? 1 : 0);
    if (tt < tin + .1) { const x = lerp(-250, DX(1) - 30, ease(walk)), sh = seg(tt, tin - .1, tin + .1); car(x, GY + 40 - bounce, 1.05 * (1 - .6 * sh), { spin: tt * 6 }); }
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
    const HX = 700, HY = 640, HW = 1240, P = hillPts(HX, HY, HW), cp = P[Math.round(.19 * 80)];   // Clawd stands on the dog valley's left rim
    cutout(P.concat([[HX + HW, H + 200], [HX, H + 200]]), BK, { shadow: [0, -6, 'rgba(0,0,0,.2)'] });
    cutout([[-200, 700], [HX + 20, 610], [HX + 20, H + 200], [-200, H + 200]], BK, { shadow: false });
    // "lots of dog neurons": the dog valley is piled with little doghouses (that's why it is so deep); they clear for the nudge
    const kl = seg(t, tlots - .4, tlots + .8) * (1 - seg(t, tn - .6, tn - .1));
    for (let i = 0; i < 12; i++) { const k = seg(kl, i / 18, i / 18 + .35); if (k <= 0) continue; const row = i < 6 ? 0 : i < 10 ? 1 : 2, c = row ? (row === 1 ? i - 6 : i - 10) : i, n = [6, 4, 2][row], x = HX + HW * .3 + (c - (n - 1) / 2) * 60, y = HY + 254 - row * 56 - (row ? 0 : Math.abs(c - 2.5) * 10); push(); translate(x, y); scale(.36 * backOut(k)); cutout([[-80, -40], [0, -120], [80, -40], [80, 60], [-80, 60]], i % 3 ? CR : RD, { shadow: false }); flat(rrPts(-24, 10, 48, 50, 20), BK); pop(); }
    // valley names on cream tags, and the rule of the hill
    const kv = popk(t, tS + .6, .4);
    for (const [lab, u, dy] of [['dog', .34, -250], ['car', .77, -110]]) { if (kv <= 0) break; const q = P[Math.round(u * 80)]; push(); translate(q[0], q[1] + dy); scale(backOut(kv)); cutout(rectPts(-62, -32, 124, 64), CR); serif(lab, 0, 3, 46, BK); pop(); }
    const kh = seg(t, tS + .8, tS + 1.4);
    if (kh > 0) { ctx.globalAlpha = kh; serif('lower ground = an easier painting', 1180, 420, 46, BK, { weight: '400' }); ctx.globalAlpha = 1; }
    // the paint ball rolls into the dog valley, again and again. On "Nudge" Clawd's stick pushes it up out of the valley
    // to the ridge (0.45 s), and from there it tips over and rolls down into the car valley
    // (each new ball pops in on the ridge and rolls down; the one at the bottom shrinks away into the painting. The last
    // one stays at the bottom for the nudge)
    const tP0 = tn - .05, tP1 = tn + .6, C0 = tE - 1.2, cyc = tt => Math.floor((tt - C0) / 1.6), cLast = cyc(tP0) - (tP0 - (C0 + cyc(tP0) * 1.6) < 1.1 ? 1 : 0);
    const pre = tt => { if (tt < C0) return [.3, 1]; const c = Math.min(cyc(tt), cLast), f = clamp((tt - C0 - c * 1.6) / 1.6); return [lerp(.5, .3, easeIn(clamp(f * 1.6))), c < cLast ? backOut(clamp(f * 7)) * (1 - ease(seg(f, .86, 1))) : (c ? backOut(clamp(f * 7)) : 1)]; };
    const [u0] = pre(tP0);
    let [u, bs] = t < tP0 ? pre(t) : [t < tP1 ? lerp(u0, .52, easeInOut(seg(t, tP0, tP1))) : lerp(.52, .77, easeInOut(seg(t, tP1 + .05, tP1 + 1.1))), 1];
    const j = Math.round(clamp(u) * 80), bp = P[j];
    if (bs > .02) { dot(bp[0], bp[1] - 34 * bs, 34 * bs, RD); dot(bp[0] - 10 * bs, bp[1] - 44 * bs, 9 * bs, '#F08A80'); }
    // Clawd's stick (held in his hand through the armR hook): it reaches the ball, pushes it while they touch, then lifts away
    const nk = env(t, tn - .6, tn + 1, .35, .4), SX = cp[0] + 5 * 9, SY = cp[1] + 2 - 4.5 * 9, ul = clamp(u, .3, .42), lp = P[Math.round(ul * 80)];
    const aim = [lp[0] - 30, lp[1] - 46];   // the ball's back, until it rolls out of reach (u .42), then where it left the stick
    const aimDev = ctx.getTransform().transformPoint({ x: aim[0], y: aim[1] });
    const aRs = nk > 0 ? -Math.atan2(aim[1] - SY, aim[0] - SX) * nk : undefined;
    const stick = nk > 0 ? (uu, sw) => { const L = ctx.getTransform().inverse().transformPoint(aimDev), len = Math.min(220, Math.hypot(L.x, L.y)) * nk, q = Math.atan2(L.y, L.x); push(); rotate(q); flat(rrPts(-uu * .3, -5, len + uu * .3, 10, 5), '#8A6440', { line: BK, lw: 2.5 }); flat(ellPts(len, 0, 8, 8, 10), '#6A4A30', { line: BK, lw: 2 }); pop(); } : undefined;
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
    spy(cp[0], cp[1] + 2, 9, 'fedora', { ...emotions(t, [[a - .2, 'suspicious'], [tL, 'bored'], [tn - .8, 'determined'], [tn + 1.4, 'proud'], [tcar, 'excited']]), view: 'q', boilKey: 'c4c', ...(nk > 0 ? { aR: aRs, armR: stick } : {}) });
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
    // (each change of view is a drawn turn through the in-between q view: front ↔ facing left)
    const nL = t > tf ? Math.floor((t - tf) * 1.2) : -1, tL0 = tf + nL / 1.2, hd = n => n < 0 ? 0 : n % 2 ? 0 : -.25;
    const tv = nL < 0 ? { view: 'front', flip: true } : turn(t, tL0, tL0 + .22, hd(nL - 1), hd(nL));
    spy(960, 1010, 11, 'fedora', { ...emotions(t, [[a - .2, 'thinking'], [tf, 'neutral'], [tp, 'happy']]), ...tv, boilKey: 'c4c' });
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
      // old film running backwards: the exposure flickers, vertical scratches and dust come and go, and the frame line
      // (with its sprocket holes) rolls up through the picture
      const j = Math.floor(t * 24), fl = hash(j * 1.3);
      if (fl > .5) flash(.1 * (fl - .5) * 2, '#FFF4DC'); else fade(.12 * (.5 - fl) * 2, BK);
      ctx.save(); ctx.lineCap = 'round';
      for (let i = 0; i < 4; i++) { if (hash(Math.floor(t * 8) * 5 + i) < .35) continue; const x = W * hash(Math.floor(t * 8) * 3 + i * 7) + (hash(j + i) - .5) * 6, y0 = H * hash(j * 2 + i) * .4; ctx.strokeStyle = i % 2 ? 'rgba(243,226,190,.75)' : 'rgba(26,26,26,.6)'; ctx.lineWidth = 1.2 + 2 * hash(i + j); ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x + (hash(i * 9) - .5) * 14, y0 + H * (.5 + .5 * hash(j + i * 3))); ctx.stroke(); }
      for (let i = 0; i < 9; i++) dot(W * hash(j * 7 + i * 11), H * hash(j * 5 + i * 3), 1.5 + 3 * hash(j + i), hash(i + j * 2) > .5 ? CR : BK, .7);
      ctx.restore();
      const fy = H - frac((t - rw0) * 1.3) * (H + 120) + 40;
      flat(rectPts(0, fy - 22, W, 44), BK);
      for (const sx of [0, W - 64]) { flat(rectPts(sx, 0, 64, H), 'rgba(26,26,26,.85)'); for (let i = -1; i < 9; i++) flat(rrPts(sx + 18, ((i * 130 + fy) % (H + 130)) - 40, 28, 40, 6), '#E9D9B8'); }
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
    const kx = seg(t, rw1, tk + .8), cx = lerp(-200, 1470, easeInOut(kx));   // it parks just short of the fork
    // the branching car route
    const root = [1650, 950], tree = [];
    const kb = seg(t, tsp - .7, tsp + 1.4);
    const SPR = [.62, .5, .42], LEN = [1, .85, .72];   // wide forks near the trunk, narrower at the top, so the 8 leaf tiles fan out
    const grow = (p, ang, len, d, i0) => { if (d > 3) return; const k = clamp(kb * 4 - d); if (k <= 0) return; const q = [p[0] + Math.cos(ang) * len * k, p[1] + Math.sin(ang) * len * k]; tree.push([p, q, d]); if (k >= 1 && d < 3) { grow(q, ang - SPR[d], len * LEN[d], d + 1, i0 * 2); grow(q, ang + SPR[d], len * LEN[d], d + 1, i0 * 2 + 1); } };
    grow(root, -Math.PI / 2 + .12, 260, 0, 0);
    ctx.save(); ctx.strokeStyle = CR; ctx.lineCap = 'round'; for (const [p, q, d] of tree) { ctx.lineWidth = 22 - d * 4; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); } ctx.restore();
    ctx.save(); ctx.strokeStyle = CR; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-200, 950); ctx.lineTo(root[0], root[1]); ctx.stroke(); ctx.restore();
    const leaves = tree.filter(([, , d]) => d === 3);
    leaves.forEach(([, q], i) => { const k = popk(t, tsp + .6 + i * .12, .35); if (k <= 0) return; push(); translate(q[0], q[1] - 34); scale(.98 * backOut(k)); cutout(rectPts(-62, -52, 124, 104), [OR, RD, BL, CR][i % 4]); photoFlat(TV + 'positive-0' + (1 + i % 8), -54, -44, 108, 88, {}); pop(); });
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
    // a signpost planted between them asks the question: a black post, a cream board, a big "?"
    if (kw > 0) { const ph = 250 * easeOut(kw), top = 800 - ph; flat(rectPts(654, top, 12, ph), BK); flat(rectPts(640, 790, 40, 12), BK);
      const kb = backOut(seg(kw, .4, 1)); if (kb > 0) { push(); translate(660, top + 6); rotate(-.05); scale(kb); cutout(rrPts(-56, -112, 112, 104, 10), CR); flat(rrPts(-48, -104, 96, 88, 7), CR, { line: BK, lw: 3 }); sans('?', 0, -56, 78, BK); pop(); } }
    // DINOv2 rises behind: a giant cut-paper tower with pose windows
    const kD = easeOut(seg(t, td - .4, td + 1.2));
    if (kD > 0) {
      const bx = 1350, by = 820, bw = 640, bh = 760 * kD, top = by - bh;
      // a cut-paper building: a black block with a charcoal side wing, a gable with a gold name plate, window frames, a door
      cutout([[bx - bw / 2, by], [bx - bw / 2, top], [bx, top - 110 * kD], [bx + bw / 2, top], [bx + bw / 2, by]], BK);
      flat([[bx + bw / 2 - 70, by], [bx + bw / 2 - 70, top + 6], [bx + bw / 2, top], [bx + bw / 2, by]], '#2C2C30');
      flat(rectPts(bx - bw / 2 - 14, top - 8, bw + 28, 18), '#2C2C30', { line: BK, lw: 2 });
      if (kD > .5) { const kp2 = backOut(seg(kD, .5, .9)); push(); translate(bx, top - 46 * kD); scale(kp2); cutout(rrPts(-120, -30, 240, 60, 8), GD); flat(rrPts(-111, -22, 222, 44, 6), GD, { line: BK, lw: 3 }); serif('DINOv2', 0, 3, 40, BK); pop(); }
      if (kD > .8) { flat(rrPts(bx - 40, by - 86, 80, 86, 36), '#2C2C30', { line: CR, lw: 4 }); dot(bx + 22, by - 40, 5, GD); }
      if (kD > .8) for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
        const i = r * 4 + c, x = bx - bw / 2 + 40 + c * 150, y = by - bh + 70 + r * 220, k = popk(t, tst - .4 + i * .12, .35);
        // the windows light up as soon as the tower stands (the photos arrive on "still has")
        flat(rectPts(x + 65 - 69, y + 80 - 85, 138, 170), '#3A3A40');   // the window frame
        if (k < 1) { const kl = popk(t, td + 1 + i * .06, .3); if (kl > 0) { flat(rectPts(x + 65 - 62, y + 80 - 78, 124, 156), mixCol(BK, GD, .85 * kl)); push(); translate(x + 65, y + 100); ctx.globalAlpha = kl; const SIL = mixCol(BK, '#6A4A10', .2);
          if (r) { flat([[-48, 10], [-40, -10], [-16, -26], [16, -26], [36, -8], [50, 10]], SIL); for (const wx of [-26, 30]) dot(wx, 12, 9, BK); }
          else { flat(ellPts(-2, -4, 30, 12, 18), SIL); flat(ellPts(32, -20, 12, 11, 14), SIL); flat(ellPts(43, -16, 9, 5, 10), SIL); flat([[24, -26], [30, -40], [34, -27]], SIL); for (const lx of [-26, -14, 12, 22]) flat(rrPts(lx - 3, 0, 7, 18, 3), SIL); flat([[-30, -8], [-46, -26], [-42, -28], [-26, -12]], SIL); }
          ctx.globalAlpha = 1; pop(); } }
        if (k <= 0) continue;
        push(); translate(x + 65, y + 80); scale(backOut(k)); cutout(rectPts(-70, -86, 140, r ? 172 : 220), [OR, CR, RD, BL][c]); photoFlat(PE + 'dino/' + (c * 2 + r), -62, -78, 124, 156, {}); pop();
        // the dog and the car below it are one neuron: the same way of facing, shown in the strip between them
        if (r === 0) { const kq = popk(t, tst + .7 + c * .12, .3); if (kq > 0) { push(); translate(x + 65, y + 194); scale(backOut(kq)); if (c === 1) arrowCut(0, 0, -1, .3, BK, 1); else { flat(ellPts(0, 0, 19, 19, 20), BK); flat(ellPts(0, 0, 12, 12, 16), [OR, CR, RD, BL][c]); flat(ellPts(0, 0, 5, 5, 10), BK); } pop(); } }
      }
      const kpn = seg(t, tst + 1.1, tst + 1.6); if (kpn > 0 && kD > .8) { ctx.globalAlpha = kpn; serif('pose neurons', bx, by - 190, 64, GD); sans('one column = one neuron', bx, by - 125, 34, CR, { weight: '700' }); ctx.globalAlpha = 1; }
      const k10 = popk(t, t10 - .3, .35), ky = popk(t, ty - .3, .35);
      if (k10 > 0) { push(); translate(bx - bw / 2 - 125, by - bh + 330); rotate(-.1); scale(backOut(k10)); cutout(ellPts(0, 0, 96, 96, 24), RD); serif('×10', 0, 0, 64, CR); pop(); }
      if (ky > 0) { push(); translate(bx + bw / 2 + 125, by - bh + 150); rotate(.1); scale(backOut(ky)); cutout(ellPts(0, 0, 96, 96, 24), BL); serif('+10 yrs', 0, 0, 40, CR); pop(); }
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
