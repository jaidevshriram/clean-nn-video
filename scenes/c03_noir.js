// ch03 The case of the cat and the car: FILM NOIR. A rainy detective's office. The 4e:55 neuron's photos (cats and
// cars) lie on the desk; time freezes on "what one thing could this be?"; the lamp's spotlight finds a V in every
// photo and the ragged tear on the wall snaps into a V (every portal from now on is a V); the evidence board (flame,
// fireboat, fox); the darkroom of round things that switch it off; new pointed suspects; the typewriter
// (nouns vs verbs); the police sketch artist who wanders down the cat route; CASE 1 SOLVED, and CASE FILE #2.
// Everything is grey except gold: the V strokes (generalization) and, at the very end, the next case's cover art.
(() => {
  // lettering that writes on glyph by glyph (each letter pops up and fades in, so no clip ever slices through a letter)
  // and leaves by fading (o.alpha), never by un-writing. k 0..1 is the entrance only. Shadows kit's title() / hand().
  function writeOn(s, x, y, size, col, k, o = {}) {
    if (k <= 0 || (o.alpha ?? 1) <= .01) return;
    if (CAM && !o.screen) { [x, y] = toScreen(x, y); size *= CAM.zoom; o = { ...o, rot: (o.rot || 0) + CAM.rot }; }
    const fam = { marker: '"Permanent Marker"', hand: '"Patrick Hand"', kalam: '"Kalam"' }[o.face || 'marker'] || o.face;
    const G = [...String(s)], X = [];
    ctx.save(); ctx.font = `${o.bold ? 'bold ' : ''}${size}px ${fam}`; const wAll = ctx.measureText(s).width; let pre = '';
    for (const g of G) { const w0 = ctx.measureText(pre).width; pre += g; X.push((w0 + ctx.measureText(pre).width) / 2 - (o.align === 'left' ? 0 : wAll / 2)); } ctx.restore();
    const n = G.length, sp = 2.5, rot = o.rot || 0, c = Math.cos(rot), sn = Math.sin(rot), a = o.alpha ?? 1;
    const pass = stroke => G.forEach((g, i) => {
      if (g === ' ') return; const kk = clamp((k * (n + sp) - i) / sp); if (kk <= 0) return;
      const dy = (1 - easeOut(kk)) * size * .14, gx = x + c * X[i] - sn * dy, gy = y + sn * X[i] + c * dy;
      letter(g, gx, gy, size, stroke ? 'rgba(0,0,0,0)' : col, { ...o, align: 'center', screen: true, reveal: undefined, pop: .25 + .75 * kk, alpha: a * ease(clamp(kk * 1.6)), stroke: stroke ? o.stroke : undefined, shadow: stroke ? false : o.shadow });
    });
    if (o.stroke) pass(true);
    pass(false);
  }
  function title(s, x, y, size, col = PAL.ink, k = 1, o = {}) { writeOn(s, x, y, size, col, k, { shadow: false, ...o }); }
  function hand(s, x, y, size, col = PAL.ink, k = 1, o = {}) { writeOn(s, x, y, size * (o.raw ? 1 : 1.2), col, k, { face: 'hand', ...o }); }
  const V = 'blog/raw/v-figure-10x/';
  const GRID = [V + 'p47742', V + 'c4d201c', V + 'p42708', V + 'c4d201d', V + 'c5a352d', V + 'pCarX5'];
  const VAP = [{ ax: .5, ay: .8, ty: .05, lx: .1, rx: .9 }, { ax: .5, ay: .95, ty: .42, lx: .14, rx: .86 }, { ax: .5, ay: .74, ty: .06, lx: .12, rx: .88 }, { ax: .5, ay: .96, ty: .3, lx: .12, rx: .88 }, { ax: .5, ay: .78, ty: .06, lx: .14, rx: .86 }, { ax: .52, ay: .9, ty: .45, lx: .3, rx: .78 }];
  const GOLD = '#FFD36B', CREAM = '#F2EEE2', INK = '#101014';
  const PW = 190, PH = 170, PX = i => 250 + i * 215, PY = i => 790 + (i % 2) * 60, PR = i => (hash(i * 3.7) - .5) * .26;

  // ---------- colour that survives the grey pass ----------
  // anything drawn through inColor() runs after fxGray, with the transform it was called under
  const COLQ = [];
  function inColor(fn) { const m = ctx.getTransform(), a = ctx.globalAlpha; COLQ.push(() => { ctx.save(); ctx.setTransform(m); ctx.globalAlpha = a; fn(); ctx.restore(); }); }
  // the grey pass (the look of fxGray(1.45, '#08080A', '#F2EEE2')), done with canvas filters: much faster than per pixel
  let GRC = null;
  function fastGray(contrast) {
    POST.push(() => {
      if (!GRC) GRC = createCanvas(W, H); const g = GRC.getContext('2d'); g.clearRect(0, 0, W, H); g.drawImage(CANVAS, 0, 0);
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.filter = `grayscale(1) brightness(1.18) contrast(${contrast})`; ctx.drawImage(GRC, 0, 0); ctx.restore();
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#F2EEE2'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'lighten'; ctx.fillStyle = '#08080A'; ctx.fillRect(0, 0, W, H); ctx.restore();
    });
  }
  function noir(o = {}) {
    GRAIN = 1.15;
    fastGray(o.contrast ?? 1.25);
    POST.push(() => { const q = COLQ.splice(0); for (const f of q) f(); });
  }
  // a gold stroke along P, drawn on as k goes 0 → 1 (always in colour)
  function goldLine(P, k, w = 8, a = 1) {
    if (k <= 0) return;
    const L = []; let tot = 0; for (let i = 1; i < P.length; i++) { const d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
    let left = tot * clamp(k); const Q = [P[0]];
    for (let i = 1; i < P.length && left > 0; i++) { const u = Math.min(1, left / L[i - 1]); Q.push([lerp(P[i - 1][0], P[i][0], u), lerp(P[i - 1][1], P[i][1], u)]); left -= L[i - 1]; }
    inColor(() => {
      ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(255,200,90,.35)'; ctx.lineWidth = w * 3.2; ctx.shadowColor = '#FFC04A'; ctx.shadowBlur = 30;
      ctx.beginPath(); Q.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      ctx.shadowBlur = 12; ctx.strokeStyle = GOLD; ctx.lineWidth = w; ctx.stroke();
      ctx.shadowBlur = 0; ctx.strokeStyle = '#FFF4CC'; ctx.lineWidth = w * .35; ctx.stroke();
    });
  }
  // a V over a box (x, y, w, h) rotated by rot about its centre; vo = apex/arm fractions; flip draws a Λ
  function vOver(x, y, w, h, rot, vo, k, o = {}) {
    if (k <= 0) return;
    push(); translate(x + w / 2, y + h / 2); rotate(rot);
    const f = (fx, fy) => [-w / 2 + w * fx, -h / 2 + h * fy];
    const ty = vo.ty ?? .1, P = o.flip ? [f(vo.lx ?? .15, 1 - ty), f(vo.ax ?? .5, 1 - (vo.ay ?? .8)), f(vo.rx ?? .85, 1 - ty)] : [f(vo.lx ?? .15, ty), f(vo.ax ?? .5, vo.ay ?? .8), f(vo.rx ?? .85, ty)];
    goldLine(P, k, o.sw ?? 7, o.a ?? 1);
    pop();
  }
  function polaroid(name, x, y, w, h, rot, o = {}) { if (o.crop) return polaroidC(name, x, y, w, h, rot, o.crop, o.border ?? 10); photoFlat(name, x, y, w, h, { border: o.border ?? 10, polaroid: true, rot, borderCol: o.col || '#ECE8DE' }); }
  // a polaroid of one region (cr = [sx, sy, sw, sh] in image pixels) of a photo
  function polaroidC(name, x, y, w, h, rot, cr, b) { const I = img(name); ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate(rot); ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(-w / 2 - b + 6, -h / 2 - b + 9, w + 2 * b, h + 5 * b); ctx.fillStyle = '#ECE8DE'; ctx.fillRect(-w / 2 - b, -h / 2 - b, w + 2 * b, h + 5 * b); ctx.drawImage(I, cr[0], cr[1], cr[2], cr[3], -w / 2, -h / 2, w, h); ctx.restore(); }

  // ---------- the office ----------
  const WIN = { x: 1290, y: 70, w: 500, h: 470 };
  function outside(t, rt, o = {}) {
    // the city in the rain, seen through the window (with a blinking neon sign: the neuron's building)
    ctx.save(); const P = new Path2D(); P.rect(WIN.x, WIN.y, WIN.w, WIN.h); ctx.clip(P);
    layer('c3out', () => {
      flat(rectPts(WIN.x - 10, WIN.y - 10, WIN.w + 20, WIN.h + 20), '#1A1A22');
      for (let i = 0; i < 9; i++) { const bx = WIN.x - 30 + i * 62, bh = 120 + 220 * hash(i * 4.1); flat(rectPts(bx, WIN.y + WIN.h - bh, 56, bh + 10), ['#2A2A32', '#24242C', '#303038'][i % 3]); for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) if (hash(i * 31 + r * 7 + c) > .62) flat(rectPts(bx + 8 + c * 16, WIN.y + WIN.h - bh + 14 + r * 26, 9, 13), '#8A8A80'); }
      // the hotel: a tall block with a vertical neon sign
      flat(rectPts(WIN.x + 250, WIN.y + 110, 170, WIN.h), '#34343C');
      for (let r = 0; r < 9; r++) for (let c = 0; c < 4; c++) flat(rectPts(WIN.x + 268 + c * 38, WIN.y + 135 + r * 40, 20, 24), hash(r * 9 + c) > .5 ? '#9A968A' : '#1E1E24');
    }, { x: WIN.x - 20, y: WIN.y - 20, w: WIN.w + 40, h: WIN.h + 40, variants: 1 });
    const fl = hash(Math.floor(rt * 8)) > .12 ? 1 : .25;
    flat(rrPts(WIN.x + 196, WIN.y + 130, 70, 300, 10), '#1C1C22');
    ctx.save(); ctx.restore();
    glow(WIN.x + 231, WIN.y + 280, 190, '#FFFFFF', .45 * fl);
    if (o.neon !== false) for (let i = 0; i < 5; i++) txt('HOTEL'[i], WIN.x + 231, WIN.y + 168 + i * 56, 48, fl > .5 ? '#FFFFFF' : '#77777A', { font: 'serif' });
    rain(rt, 1, { n: 160, col: '#D8D8E0' });
    ctx.restore();
    // frame, mullions and the blind pulled half way
    ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 18; ctx.strokeRect(WIN.x, WIN.y, WIN.w, WIN.h); ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(WIN.x + WIN.w / 2, WIN.y); ctx.lineTo(WIN.x + WIN.w / 2, WIN.y + WIN.h); ctx.moveTo(WIN.x, WIN.y + WIN.h * .55); ctx.lineTo(WIN.x + WIN.w, WIN.y + WIN.h * .55); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 6; i++) flat(rectPts(WIN.x - 6, WIN.y + i * 20, WIN.w + 12, 13), i % 2 ? '#6A6A70' : '#77777C');
    // drops running down the glass
    for (let i = 0; i < 14; i++) { const x = WIN.x + 20 + hash(i * 5.1) * (WIN.w - 40), ph = frac(rt * (.15 + .2 * hash(i)) + hash(i * 2)), y = WIN.y + 130 + ph * (WIN.h - 140); dot(x, y, 3, '#E8E8F0', .5); ctx.save(); ctx.strokeStyle = 'rgba(232,232,240,.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 1, y - 40 * ph); ctx.stroke(); ctx.restore(); }
  }
  // light through the blinds: bands falling down-left from the window that widen and fade with distance, with soft
  // edges (a faint wide halo under each core); never over the window glass itself (o.win); weaker low down over the desk
  function blinds(t, a = .42, x0 = 760, o = {}) {
    ctx.save(); if (o.win) { const c = new Path2D(); c.rect(-400, -400, W + 800, H + 800); c.rect(WIN.x - 10, WIN.y - 10, WIN.w + 20, WIN.h + 20); ctx.clip(c, 'evenodd'); }
    const sw = 6 * Math.sin(t * .4), g = ctx.createLinearGradient(0, -60, 0, 1160);
    g.addColorStop(0, 'rgba(233,228,214,1)'); g.addColorStop(.55, 'rgba(233,228,214,.7)'); g.addColorStop(1, 'rgba(233,228,214,.28)');
    ctx.fillStyle = g;
    for (const [grow, al] of [[16, .35], [0, 1]]) { ctx.globalAlpha = a * al;
      for (let i = 0; i < 13; i++) { const xt = x0 + i * 72 + sw, spread = 18 + i * 1.5; ctx.beginPath(); ctx.moveTo(xt - grow * .5, -60); ctx.lineTo(xt + 30 + grow * .5, -60); ctx.lineTo(xt + 30 + spread + grow - 760, 1160); ctx.lineTo(xt - spread - grow - 760, 1160); ctx.closePath(); ctx.fill(); } }
    ctx.restore();
  }
  // the ragged tear on the wall; m 0..1 snaps it into a V
  const TEAR = [600, 330, 125];
  function tearPts(x, y, r, m, t) {
    const N = 48, out = [];
    // a V outline as a closed polygon, resampled by arc length to N points (starting at its left tip)
    const ww = r * 2.4, hh = r * 2.1, th = r * .8, K = [[x - ww / 2, y - hh / 2], [x - ww / 2 + th, y - hh / 2], [x, y + hh / 2 - th * 1.6], [x + ww / 2 - th, y - hh / 2], [x + ww / 2, y - hh / 2], [x, y + hh / 2]];
    const VP = resample(K, 1, true), step = VP.length / N;
    for (let i = 0; i < N; i++) {
      const a = Math.PI + .5 + i / N * TAU, rr = r * (.72 + .45 * hash(i * 7.7 + 3) + .05 * Math.sin(t * 5 + i)) * (i % 2 ? .78 : 1.12);
      const tp = [x + Math.cos(a) * rr * 1.2, y + Math.sin(a) * rr], vp = VP[Math.floor(i * step) % VP.length], jag = (i % 2 ? 1 : -1) * 6 * (1 - m * .6);
      out.push([lerp(tp[0], vp[0], m) + jag, lerp(tp[1], vp[1], m) - jag]);
    }
    return out;
  }
  function tear(t, m, o = {}) {
    const [x, y, r] = TEAR, P = tearPts(x, y, r * (o.s ?? 1), m, t), path = polyPath(P), dim = o.dim ?? 1;   // dim: a faint crack until the V is found
    ctx.save(); ctx.globalAlpha *= dim;
    glow(x, y, r * 2.6, '#FFFFFF', .35 + .25 * m + .1 * Math.sin(t * 3));
    ctx.save(); ctx.clip(path); ctx.fillStyle = '#05060C'; ctx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6);
    for (let i = 0; i < 60; i++) dot(x + (hash(i) - .5) * r * 3, y + (hash(i * 3) - .5) * r * 3, 1 + 1.5 * hash(i * 5), '#FFFFFF', .5 + .5 * Math.sin(t * 2 + i));
    ctx.restore();
    ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.shadowColor = '#FFFFFF'; ctx.shadowBlur = 24; ctx.lineJoin = 'round'; ctx.stroke(path); ctx.restore();
    if (m > .5) inColor(() => { ctx.strokeStyle = GOLD; ctx.globalAlpha *= clamp((m - .5) * 2) * (.55 + .2 * Math.sin(t * 4)); ctx.lineWidth = 4; ctx.shadowColor = '#FFC04A'; ctx.shadowBlur = 30; ctx.lineJoin = 'round'; ctx.stroke(path); });
    for (let i = 0; i < 10; i++) { const p = P[Math.floor(hash(i * 7.3) * P.length)], f = frac(t * 1.1 + hash(i)); glow(p[0] + (hash(i * 3) - .5) * 60 * f, p[1] - 50 * f, 8 * (1 - f) + 2, '#FFFFFF', (1 - f) * dim); }
    ctx.restore();
  }
  function lamp(t, k, x = 300) {
    // a banker's lamp at the left of the desk; its light pool falls right
    if (k > .02) { ctx.save(); const g = ctx.createRadialGradient(x + 420, 860, 40, x + 420, 880, 900); g.addColorStop(0, `rgba(255,250,230,${.5 * k})`); g.addColorStop(1, 'rgba(255,250,230,0)'); ctx.fillStyle = g; ctx.fillRect(-200, 560, W + 400, 700); ctx.restore(); }
    flat(ellPts(x, 744, 70, 16, 18), '#1C1C20'); flat(rectPts(x - 7, 600, 14, 144), '#2A2A30');
    flat([[x - 110, 610], [x + 120, 610], [x + 90, 548], [x - 80, 548]], '#3A3A40', { line: '#141418', lw: 3 });
    if (k > .02) { glow(x + 5, 614, 90, '#FFFFFF', .9 * k); flat(ellPts(x + 5, 612, 108, 9, 18), '#FFFBEA', { alpha: k }); }
    flat(rectPts(x + 60, 610, 4, 60), '#1C1C20'); dot(x + 62, 674, 7, '#1C1C20');
  }
  // the coat stand: a turned wooden pole on three splayed feet, curled hooks at the top, a belted trench coat hanging
  // from one hook (collar, lapels, sleeves, buttons) and the fedora on the top knob
  function coatRack(x, y) {
    const L = { line: '#101012', lw: 3 };
    for (const dx of [-62, 0, 58]) flat([[x - 5, y - 30], [x + 5, y - 30], [x + dx + 6, y], [x + dx - 6, y]], '#202024', L);
    flat(rectPts(x - 6, 150, 12, y - 170), '#26262A', L); for (const yy of [150, 300, 470]) flat(ellPts(x, yy, 11, 6, 12), '#323238', L);
    ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x, 182); ctx.quadraticCurveTo(x + sd * 46, 176, x + sd * 46, 150); ctx.stroke(); } ctx.restore();
    for (const sd of [-1, 1]) dot(x + sd * 46, 148, 6, '#3A3A40');
    // the trench coat on the right hook: shoulders, flared skirt, sleeves, a belt and two rows of buttons
    const cx = x + 30;
    flat([[cx - 44, 196], [cx + 44, 196], [cx + 58, 330], [cx + 74, 560], [cx - 66, 560], [cx - 52, 330]], '#1E1E24', L);
    flat([[cx - 44, 196], [cx - 62, 214], [cx - 70, 400], [cx - 50, 404], [cx - 44, 250]], '#18181C', L);
    flat([[cx + 44, 196], [cx + 62, 214], [cx + 72, 400], [cx + 52, 404], [cx + 44, 250]], '#18181C', L);
    flat([[cx - 26, 192], [cx, 186], [cx + 26, 192], [cx + 14, 300], [cx, 270], [cx - 14, 300]], '#303036', L);
    flat([[cx, 270], [cx - 14, 300], [cx - 2, 330], [cx + 14, 300]], '#202024');
    flat(rectPts(cx - 58, 372, 124, 18), '#2A2A30', L); flat(rectPts(cx - 6, 368, 20, 26), '#5A5A62', L);
    for (const bx of [-18, 18]) for (const by of [320, 420, 470]) dot(cx + bx, by, 4, '#5A5A62');
    inkLine([[cx, 394], [cx + 6, 556]], 1.4, '#141418', 'inkfine', 0);
    // the fedora on the top knob
    flat(ellPts(x, 142, 62, 12, 20), '#1C1C20', L); flat([[x - 36, 142], [x - 30, 102], [x - 10, 94], [x, 104], [x + 10, 94], [x + 30, 102], [x + 36, 142]], '#26262C', L); flat(rectPts(x - 35, 126, 70, 10), '#4A4A52');
  }
  function office(t, rt, o = {}) {
    layer('c3office', () => {
      flat(rectPts(-200, -200, W + 400, 900), '#4A4A50');
      for (let i = 0; i < 30; i++) flat(rectPts(-200 + i * 80, -200, 3, 900), '#47474D');
      flat(rectPts(-200, 600, W + 400, 100), '#3E3E44'); flat(rectPts(-200, 596, W + 400, 8), '#5A5A62');
      // a hat stand and a filing cabinet at the far left; a wall clock frame
      flat(rectPts(-180, 300, 230, 330), '#38383E', { line: '#222226', lw: 3 }); for (let i = 0; i < 3; i++) { flat(rectPts(-165, 320 + i * 100, 200, 84), '#404046', { line: '#222226', lw: 2 }); flat(rrPts(-90, 350 + i * 100, 50, 14, 5), '#7A7A80'); }
      flat(rectPts(-200, 700, W + 400, 600), '#3A2E26'); flat(rectPts(-200, 700, W + 400, 14), '#5A4636');
      for (let i = 0; i < 12; i++) { ctx.save(); ctx.strokeStyle = 'rgba(20,14,10,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-200, 740 + i * 34 + 6 * Math.sin(i)); for (let x = -200; x <= W + 200; x += 80) ctx.lineTo(x, 740 + i * 34 + 6 * Math.sin(i + x * .004)); ctx.stroke(); ctx.restore(); }
    }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    // the clock: its second hand runs on rt (and stops when time freezes)
    const cx = 160, cy = 190;
    flat(ellPts(cx, cy, 70, 70, 30), '#E6E2D8', { line: '#1A1A1E', lw: 7 });
    for (let i = 0; i < 12; i++) { const q = i / 12 * TAU; flat(rectPts(cx + Math.cos(q) * 56 - 3, cy + Math.sin(q) * 56 - 3, 6, 6), '#1A1A1E'); }
    const hand = (a, l, w) => { ctx.save(); ctx.strokeStyle = '#1A1A1E'; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(a) * l, cy - Math.cos(a) * l); ctx.stroke(); ctx.restore(); };
    hand(-.6, 34, 6); hand(1.9, 50, 4); hand(rt * TAU / 6, 56, 2);
    outside(t, rt, o);
    glow(WIN.x + 231, WIN.y + 280, 420, '#FFFFFF', .12 * (hash(Math.floor(rt * 8)) > .12 ? 1 : .3));
    if (o.tear !== false) tear(t, o.vm ?? 0, o);
    if (o.photos !== false) GRID.forEach((im, i) => polaroid(im, PX(i), PY(i), PW, PH, PR(i)));
    // a coffee cup with steam (the steam freezes with time)
    const CX = 120;
    flat(rrPts(CX - 35, 720, 70, 80, 10), '#D8D4CA', { line: '#1A1A1E', lw: 3 }); flat(ellPts(CX, 722, 35, 8, 14), '#2A2420');
    ctx.save(); ctx.strokeStyle = 'rgba(240,240,240,.5)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 2; i++) { ctx.beginPath(); for (let s = 0; s < 12; s++) { const yy = 710 - s * 12, xx = CX - 13 + i * 26 + 9 * Math.sin(rt * 3 + s * .6 + i * 2); s ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); } ctx.restore();
    // the hat stand with the detective's trench coat (the detective himself is never seen)
    coatRack(1201, 632);
    const lt_ = Math.max(env(t, cs('cc_return') + .5, cs('cc_return') + .75, .05, .2), env(t, cs('cc_return') + 4.1, cs('cc_return') + 4.3, .04, .25));
    if (lt_ > 0) { ctx.save(); ctx.globalAlpha = .55 * lt_; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(WIN.x, WIN.y, WIN.w, WIN.h); ctx.restore(); glow(WIN.x + WIN.w / 2, WIN.y + WIN.h / 2, 900, '#FFFFFF', .5 * lt_); }
    lamp(t, o.lamp ?? 1);
    blinds(t, o.blinds ?? .3, 760, { win: true });
  }
  // dust motes floating in the lamp light
  function dust(rt, x0, y0, w, h, n = 30) { for (let i = 0; i < n; i++) { const x = x0 + frac(hash(i * 3.3) + rt * .01 * (hash(i) - .5)) * w, y = y0 + frac(hash(i * 7.1) - rt * .02 * (.3 + hash(i * 2))) * h; dot(x, y, 1.5 + 2 * hash(i * 5), '#FFFFFF', .25 + .3 * Math.sin(rt * 2 + i)); } }

  // 1 · back at the crime scene: rain, neon, the desk lamp, the photos; "what one thing could this be?" freezes time
  const tq = () => wt('cc_grid', 'asking') - .3;
  const slowT = t => { const q = tq(), s = seg(t, q, q + 1.2); return t < q ? t : q + (t - q) * (1 - .985 * s) - .5 * (s * s) * 0 ; };
  function returnShot(t, lt, dur) {
    const a = cs('cc_return'), tc = wt('cc_return', 'crime'), tg = cs('cc_grid'), th = wt('cc_grid', 'hundreds'), tn = wt('cc_grid', 'This'), q = tq();
    const rt = slowT(t), frz = seg(t, q, q + 1.2);
    bg('#2A2A2E');
    camKeys(t, [[chapStart('ch03'), 1400, 330, 1.3], [a + 3, 1400, 340, 1.3], [tc - .6, 980, 600, 1], [tg + 1, 960, 700, 1.08], [q + 1.4, 950, 810, 1.15], [ce('cc_grid') + 1, 950, 815, 1.16]], .5 * (1 - frz));
    const lk = t < tc ? .12 : t < tc + .12 ? 1 : .92 + .08 * Math.sin(rt * 9) * (1 - frz);
    office(t, rt, { lamp: lk, dim: .3 });
    // a lightning flicker outside early on
    // the "hundreds of times" pile: a fat stack of prints beside the cup
    const sk = seg(t, th - .8, th + .2);
    for (let i = 0; i < Math.round(26 * sk); i++) flat(rectPts(1530 + (hash(i) - .5) * 14, 778 - i * 4, 120, 10), i % 2 ? '#DAD6CC' : '#C8C4BA', { line: '#2A2A2E', lw: 1 });
    // Clawd walks in from the right, shakes off the rain, gets bored, then perks up and thinks
    const walk = stroll(t, a + 1.2, a + 4.5, 2100, 1670, 12), walking = t > a + 1.2 && t < a + 4.5, shake = env(t, a + 4.6, a + 6, .1, .2);
    const em = emotions(rt, [[a, 'neutral'], [a + 4.6, 'relieved'], [tc, 'surprised'], [th - .6, 'sleepy'], [tn, 'determined'], [q - .5, 'thinking']]);
    tourist(walk.x + (shake ? 5 * Math.sin(t * 60) : 0), 800, 12, 'fedora', { ...em, view: walking ? 'side' : 'q', flip: true, walk: walking ? t * 2.2 : undefined, boilKey: 'c3c' });
    if (shake > 0) for (let i = 0; i < 10; i++) { const f = frac((t - a - 4.6) * 1.5 + hash(i)), ang = hash(i * 3) * TAU; dot(walk.x + Math.cos(ang) * (40 + 120 * f), 740 + Math.sin(ang) * 50 * f + 140 * f * f, 5 * (1 - f), '#E8E8F0', shake * (1 - f)); }
    dust(rt, 300, 560, 900, 400, 26);
    camEnd();
    vignette(.55, '#000000');
    // frozen time: a faint ring of stopped rain and the question
    const kq = seg(t, wt('cc_grid', 'what') - .3, wt('cc_grid', 'be') + .3);
    if (kq > 0) writeOn('what ONE thing could this be?', 1000, 345, 64, CREAM, kq, { face: 'marker', shadow: false });
    // time has passed, and the new neurons looked clean
    const ky = seg(t, a - .1, a + .6), kyO = 1 - seg(t, wt('cc_return', 'finding') - .5, wt('cc_return', 'finding') - .1);
    if (ky > 0) writeOn('years later…', 1500, 300, 72, CREAM, ky, { face: 'marker', alpha: kyO, shadow: false, screen: true, stroke: '#141414', strokeW: .14 });   // screen space, clear of the arrival title
    const kc = seg(t, wt('cc_return', 'surprisingly') - .3, wt('cc_return', 'clean') + .3), kcO = 1 - seg(t, tc - .6, tc - .2);
    if (kc > 0) writeOn('modern models: surprisingly clean', 960, 110, 64, CREAM, kc, { face: 'marker', alpha: kcO, shadow: false });
    if (frz > 0) sfx('...', 1700, 600, 60, CREAM, t - q, { life: 1.6 });
    noir();
  }

  // 2 · the spotlight finds a V in every photo; the tear on the wall snaps into a V
  function vShot(t, lt, dur) {
    const to = wt('cc_v', 'obvious'), tv = wt('cc_v', 'V'), tl = wt('cc_inputs', 'light'), q = tq();
    const rt = slowT(Math.min(t, to)) + Math.max(0, t - to) * ease(seg(t, to, to + 1.5));
    const sweep = seg(t, to - .2, wt('cc_v', 'neuron') - .1), pull = seg(t, wt('cc_v', 'neuron') - .1, tv - .1), snap = seg(t, tv - .05, tv + .55);
    bg('#2A2A2E');
    const cam = camKeys(t, [[cs('cc_v') - .2, 950, 815, 1.16], [to, 950, 815, 1.16], [wt('cc_v', 'neuron') - .1, 950, 810, 1.12], [tv - .1, 960, 560, .96], [tl + 2, 980, 560, 1.0]], .3);
    if (snap > 0 && snap < .5) { const [sx, sy] = shakeXY(t, 10 * (1 - snap * 2)); translate(sx, sy); }
    const vm = snap > 0 ? clamp(elasticOut(snap)) : 0;
    office(t, rt, { lamp: lerp(.92, .35, ease(seg(t, to - .3, to + .2))) * (1 - .4 * pull) + .5 * pull, vm, blinds: .3 - .18 * (sweep * (1 - pull)), dim: lerp(.3, 1, ease(seg(t, wt('cc_v', 'neuron') - .1, tv))) });
    // the spotlight sweeps along the photos; each V paints itself as the beam passes
    const sx = lerp(220, 1720, ease(sweep));
    if (sweep > 0 && pull < 1) {
      const kin = ease(seg(t, to - .2, to + .3));   // the dark comes down smoothly as the beam switches on
      ctx.save(); const p = new Path2D(); p.rect(-400, -400, W + 800, H + 800); p.ellipse(sx, 880, 230, 190, 0, 0, TAU); ctx.fillStyle = `rgba(0,0,0,${.6 * (1 - pull) * kin})`; ctx.fill(p, 'evenodd'); ctx.restore();
      glow(sx, 880, 260, '#FFFFFF', .35 * (1 - pull) * kin);
    }
    GRID.forEach((im, i) => { const cx = PX(i) + PW / 2, k = sweep >= 1 ? 1 : seg(sx, cx - 120, cx + 40); vOver(PX(i), PY(i), PW, PH, PR(i), VAP[i], k, { sw: 6, a: .9 + .1 * Math.sin(t * 5 + i) }); });
    if (snap > 0 && snap < .35) { glow(TEAR[0], TEAR[1], 600 * snap, '#FFFFFF', 1 - snap * 2.5); }
    const em = emotions(t, [[cs('cc_v'), 'thinking'], [to + .1, 'idea'], [tv, 'surprised', { mouth: 'O' }], [tv + 1.6, 'excited']]);
    tourist(1670, 800, 12, 'fedora', { ...em, view: 'q', flip: true, boilKey: 'c3c' });
    camEnd();
    vignette(.5, '#000000');
    const kt = seg(t, tv - .1, tv + .5);
    if (kt > 0) writeOn('a V neuron', 960, 470, 96, GOLD, kt, { face: 'marker', shadow: false, stroke: '#141418', strokeW: .08 });
    if (snap > 0 && snap < 1) sfx('SNAP!', TEAR[0] - 40, 560, 62, CREAM, (t - tv) * 1.2, { rot: -.12 });
    const kpt = seg(t, wt('cc_inputs', 'Pointed') - .2, wt('cc_inputs', 'up') + .2);
    if (kpt > 0) writeOn('pointed things light it up', 960, 590, 56, CREAM, kpt, { face: 'marker', shadow: false, stroke: '#141418', strokeW: .1 });
    noir();
  }

  // 3 · the evidence board: strings from a flame, a fireboat's jets and fox faces
  function inputs(t, lt, dur) {
    const tf = wt('cc_inputs', 'flame'), tw = wt('cc_inputs', 'water'), tx = wt('cc_inputs', 'fox'), tV = wt('cc_inputs', 'V-shaped'), tL = wt('cc_inputs', 'Look');
    bg('#2A2A2E');
    camKeys(t, [[tL - .4, 960, 500, 1.06], [tx, 960, 520, 1.02], [ce('cc_inputs') + .4, 960, 540, 1.0]], .5);
    layer('c3board', () => {
      flat(rectPts(-200, -200, W + 400, 1500), '#4A4A50');
      for (let i = 0; i < 30; i++) flat(rectPts(-200 + i * 80, -200, 3, 1500), '#47474D');
      flat(rectPts(170, 70, 1580, 820), '#2E2620', { shadow: [10, 14, 'rgba(0,0,0,.45)'] }); flat(rectPts(190, 90, 1540, 780), '#8A7458');
      for (let i = 0; i < 900; i++) dot(190 + hash(i * 3.1) * 1540, 90 + hash(i * 7.7) * 780, 1 + 2 * hash(i), hash(i * 5) > .5 ? '#6E5A44' : '#A08A6C', .7);
      flat(rectPts(-200, 920, W + 400, 400), '#3A2E26'); flat(rectPts(-200, 920, W + 400, 12), '#5A4636');
      // old notes pinned around the edges
      for (const [x, y, r] of [[300, 160, -.1], [1560, 760, .08], [1600, 150, .12], [260, 760, .06]]) { push(); translate(x, y); rotate(r); flat(rectPts(-70, -50, 140, 100), '#D8D2C2'); for (let l = 0; l < 4; l++) flat(rectPts(-55, -30 + l * 20, 90 + 20 * hash(l + x), 4), '#8A867C'); pop(); }
    }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    const C = [975, 440];
    // the case photo pair at the centre, under its own light
    const on = .4 + .6 * Math.max(env(t, tf - .2, tf + 1.2), env(t, tw - .2, tw + 1.2), env(t, tx - .2, tx + 1.2), seg(t, tV - .5, tV));
    glow(C[0], C[1], 330, '#FFFFFF', .25 + .35 * on);
    polaroid(GRID[0], 720, 320, 250, 220, -.08); polaroid(GRID[1], 985, 335, 250, 220, .07);
    vOver(720, 320, 250, 220, -.08, VAP[0], 1, { sw: 6, a: .5 + .5 * on }); vOver(985, 335, 250, 220, .07, VAP[1], 1, { sw: 6, a: .5 + .5 * on });
    dot(845, 312, 10, '#C8C4BA'); dot(1110, 327, 10, '#C8C4BA');
    letter('the V neuron', 975, 640, 56, GOLD, { face: 'marker', shadow: false });
    const SRC = [[V + 'c5a94a', 250, 130, tf, 'flame', -.06, { ax: .5, ay: .82, ty: .12, lx: .32, rx: .68 }, true], [V + 'c5a94c', 280, 540, tw, 'water jets', .05, { ax: .45, ay: .78, ty: .1, lx: .08, rx: .9 }], [V + 'c4d493a', 1400, 200, tx, 'fox faces', .07, { ax: .5, ay: .82, ty: .14, lx: .14, rx: .86 }]];
    SRC.forEach(([im, x, y, tw0, lab, r, vo, flip], i) => {
      const k = popk(t, tw0 - .55, .45); if (k <= 0) return;
      const w = 280, h = 250, cx = x + w / 2, cy = y + h / 2;
      // the string, drawn from the photo's pin to the centre; light runs along it while it fires
      const sk = seg(t, tw0 - .2, tw0 + .5), P = [[cx, y - 4], [lerp(cx, C[0], .5), lerp(y, C[1], .5) + 40], [C[0] + (cx < C[0] ? -60 : 60), C[1] - 40]];
      if (sk > 0) { const Q = through(P, 10), n = Math.max(2, Math.round(Q.length * sk)); ctx.save(); ctx.strokeStyle = '#E6E2D8'; ctx.lineWidth = 3.5; ctx.beginPath(); Q.slice(0, n).forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore();
        if (sk >= 1) for (let j = 0; j < 3; j++) { const f = frac(t * .6 + j / 3 + i * .2), p = Q[Math.floor(f * (Q.length - 1))]; inColor(() => glow(p[0], p[1], 34, '#FFC04A', .9)); } }
      push(); translate(cx, cy); scale(backOut(k)); rotate((1 - k) * .5); translate(-cx, -cy);
      polaroid(im, x, y, w, h, r);
      dot(cx, y - 4, 10, '#D8D4CA');
      pop();
      vOver(x, y, w, h, r, vo, seg(t, tV - .5 + i * .18, tV + .1 + i * .18), { sw: 7, flip });
      if (k > .8) letter(lab, cx, y + h + 62, 50, CREAM, { face: 'marker', shadow: false, alpha: seg(t, tw0, tw0 + .3) });
    });
    // Clawd with a magnifying glass on the desk below
    const em = emotions(t, [[tL - .4, 'suspicious'], [tx, 'surprised'], [tV, 'excited']]);
    tourist(1640, 935, 11, 'fedora', { ...em, view: 'q', flip: true, aR: 1.1, armR: (u, sw) => { inkLine([[0, 0], [u * 1.6, 0]], sw * 2, '#1A1A1E', 'ink', 0); flat(ellPts(u * 2.8, 0, u * 1.3, u * 1.3, 18), 'rgba(230,230,240,.35)', { line: '#1A1A1E', lw: 4 }); }, boilKey: 'c3c' });
    blinds(t, .22, 600);
    camEnd();
    vignette(.55, '#000000');
    const kp = 1 - seg(t, tf - .8, tf - .5);   // carried over from the previous shot, already written
    if (kp > 0) writeOn('pointed things light it up', 960, 980, 52, CREAM, 1, { face: 'marker', alpha: kp, shadow: false });
    noir();
  }

  // 4 · the darkroom downstairs: round things switch it off. A ball bounces down the stairs and hits the switch.
  const ROUND = [[V + 'n1070575', 'tennis', [.5, .5, .125], [130, 125, 220, 220]], [V + 'n1158528', 'clock', [.5, .45, .3]], [V + 'n282687', 'snail', [.55, .43, .13]]];
  function darkroom(t, lt, dur) {
    const a = cs('cc_round'), toff = wt('cc_round', 'off'), tR = wt('cc_round', 'Round'), top = wt('cc_round', 'opposite'), tap = wt('cc_round', 'apart'), e = ce('cc_round');
    bg('#1A1A1E');
    camKeys(t, [[cs('cc_round') - .2, 700, 470, 1.08], [toff - .2, 820, 560, 1.0], [tR - .4, 1220, 500, 1.08], [e + .3, 1260, 480, 1.12]], .4);
    const lit = 1 - seg(t, toff, toff + .08);
    layer('c3base', () => {
      flat(rectPts(-200, -200, W + 400, 1500), '#45454C');
      for (let r = 0; r < 24; r++) for (let c = 0; c < 26; c++) flat(rectPts(-200 + c * 96 + (r % 2) * 48, -200 + r * 46, 90, 40), ['#56565D', '#4E4E55', '#5C5C63'][(r * 3 + c) % 3]);
      flat(rectPts(-200, 940, W + 400, 400), '#2A2A2E'); flat(rectPts(-200, 936, W + 400, 8), '#4A4A50');
      // the stairs down from the office (top left)
      for (let i = 0; i < 9; i++) flat(rectPts(-200, 60 + i * 100, 300 + i * 70, 100), i % 2 ? '#2E2E34' : '#34343A', { line: '#1A1A1E', lw: 3 });
      flat([[100 + 0, 60], [170 + 8 * 70, 940], [190 + 8 * 70, 940], [120, 60]], '#1E1E22');
      // a little street-level window, high up: cold light comes in
      flat(rectPts(1560, 40, 260, 110), '#9A9A9E', { line: '#141418', lw: 6 }); flat(rectPts(1688, 40, 6, 110), '#141418');
    }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    // the bulb (the neuron's light): on until a round thing flips the switch
    const bx = 1180, by = 120, swing = .08 * Math.sin(t * 1.4) + (t > toff ? .25 * Math.exp(-(t - toff) * 1.5) * Math.sin((t - toff) * 7) : 0);
    const bxx = bx + Math.sin(swing) * 160;
    // darkness when the bulb is off (drawn under the photos, so they stay readable)
    if (lit < 1) { ctx.save(); ctx.globalAlpha = .45 * (1 - lit); ctx.fillStyle = '#000000'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.restore(); glow(1690, 120, 700, '#FFFFFF', .22 * (1 - lit)); }
    ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx, -200); ctx.lineTo(bxx, by); ctx.stroke(); ctx.restore();
    flat(rectPts(bxx - 14, by - 14, 28, 22), '#2A2A30'); flat(ellPts(bxx, by + 38, 44, 50, 18), lit > .5 ? '#FFFFFF' : '#5A5A60', { line: '#141418', lw: 3 });
    if (lit > 0) { glow(bxx, by + 38, 760, '#FFFFFF', .6 * lit); }
    // the bulb is the V neuron: a gold V filament that dies when the light goes out
    { const P = [[bxx - 22, by + 18], [bxx, by + 60], [bxx + 22, by + 18]]; if (lit > .02) goldLine(P, 1, 6, lit); else { ctx.save(); ctx.strokeStyle = '#2A2A30'; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); } }
    // the switch on the wall
    flat(rrPts(750, 520, 50, 80, 6), '#C8C4BA', { line: '#141418', lw: 3 }); flat(rrPts(767, lit > .5 ? 534 : 562, 16, 24, 4), '#2A2A2E');
    // Clawd's flashlight beam on the photo being named
    const TW = [wt('cc_round', 'tennis'), wt('cc_round', 'clock'), wt('cc_round', 'snail')];
    const ai = Math.min(2, Math.max(0, [0, 1, 2].filter(i => t > TW[i] - .5).length - 1)), tx = 1060 + ai * 330, fx = 720, fy = 850;
    if (lit < 1 && t > toff + .4) { const fk = seg(t, toff + .4, toff + .6); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(fx, fy, tx, 400); g.addColorStop(0, `rgba(255,255,240,${.5 * fk})`); g.addColorStop(1, `rgba(255,255,240,${.3 * fk})`); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(fx, fy - 10); ctx.lineTo(tx - 190, 260); ctx.lineTo(tx + 190, 600); ctx.lineTo(fx, fy + 10); ctx.closePath(); ctx.fill(); ctx.restore(); glow(tx, 420, 260, '#FFFFFF', .35 * fk); }
    // the clothesline with the round photos (the neuron's negative side), drying like a darkroom's prints
    ctx.save(); ctx.strokeStyle = '#B8B4AA'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(760, 250); ctx.quadraticCurveTo(1340, 320, 1900, 250); ctx.stroke(); ctx.restore();
    ROUND.forEach(([im, , rg, cr], i) => {
      const k = popk(t, TW[i] - .45, .5); if (k <= 0) return;
      const x = 930 + i * 330, w = 260, h = 260, sway = .05 * Math.sin(t * 2 + i), y = 262 + 26 * Math.sin((i + .5) / 3 * Math.PI);
      push(); translate(x + w / 2, y); rotate(sway + (1 - backOut(k)) * .6); translate(-(x + w / 2), -y);
      if (cr) { ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.fillRect(x - 3, y + 14, w + 18, h + 18); ctx.fillStyle = '#E2DED4'; ctx.fillRect(x - 9, y + 5, w + 18, h + 18); ctx.drawImage(img(im), cr[0], cr[1], cr[2], cr[3], x, y + 14, w, h); }   // (cropped close, so the ball reads)
      else photoFlat(im, x, y + 14, w, h, { border: 9, borderCol: '#E2DED4' });
      flat(rectPts(x + w / 2 - 8, y - 6, 16, 34), '#8A867C');
      // a cream ring around the round thing
      const rk = seg(t, TW[i] + .1, TW[i] + .6); if (rk > 0) { ctx.save(); ctx.strokeStyle = CREAM; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(x + w * rg[0], y + 14 + h * rg[1], w * rg[2] * 1.6 + 10, w * rg[2] * 1.6 + 10, 0, -1.6, -1.6 + TAU * rk); ctx.stroke(); ctx.restore(); }
      pop();
    });
    // the ball: bounces down the stairs, hits the switch, rolls away
    const t0 = a + .2, P = (s) => { const u = clamp(s); const step = Math.floor(u * 8), f = u * 8 - step; return [130 + step * 70 + 70 * f, 120 + step * 100 - 90 * Math.sin(f * Math.PI) + 100 * f]; };
    let ball = null;
    if (t > t0 && t < toff) { const u = seg(t, t0, toff - .5); ball = u < 1 ? P(u) : [lerp(P(1)[0], 775, ease(seg(t, toff - .5, toff))), lerp(P(1)[1], 560, ease(seg(t, toff - .5, toff))) - 120 * Math.sin(seg(t, toff - .5, toff) * Math.PI)]; }
    else if (t >= toff && t < toff + 3) { const u = seg(t, toff, toff + 3); ball = [lerp(775, 1500, easeOut(u)), 560 + (920 - 560) * Math.min(1, u * 3) - (u > .33 ? 90 * Math.abs(Math.sin((u - .33) * 9)) * (1 - u) : 0)]; }
    if (ball) { flat(ellPts(ball[0], ball[1] - 30, 30, 30, 18), '#D8D8C0', { line: '#141418', lw: 3 }); ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(ball[0] - 34, ball[1] - 30, 28, -.9, .9); ctx.stroke(); ctx.beginPath(); ctx.arc(ball[0] + 34, ball[1] - 30, 28, Math.PI - .9, Math.PI + .9); ctx.stroke(); ctx.restore(); }
    letter('the V neuron', bxx + 190, by + 40, 46, CREAM, { face: 'marker', shadow: false, alpha: seg(t, a, a + .5) * (1 - seg(t, tR - .6, tR - .2)) });
    // Clawd at the foot of the stairs: ducks the ball, then holds the flashlight
    const em = emotions(t, [[cs('cc_round') - .2, 'neutral'], [t0 + 1.5, 'scared'], [toff + .8, 'determined'], [TW[2], 'suspicious'], [top, 'thinking']]);
    tourist(660, 940, 12, 'fedora', { ...em, view: 'q', aR: t > toff + .4 ? .9 : em.aR, armR: t > toff + .4 ? (u, sw) => { flat(rrPts(0, -u * .6, u * 2.2, u * 1.2, u * .3), '#2A2A2E', { line: '#141418', lw: 2 }); flat(ellPts(u * 2.3, 0, u * .4, u * .7, 10), '#FFFFFF'); } : undefined, boilKey: 'c3c' });
    camEnd();
    vignette(.4, '#000000');
    if (t > toff && t < toff + .8) sfx('click', 860, 470, 54, CREAM, t - toff);
    const kb = seg(t, wt('cc_round', 'switches') - .2, wt('cc_round', 'switches') + .5), kbO = 1 - seg(t, tR - .7, tR - .3);
    if (kb > 0) writeOn('what switches it OFF', 1100, 980, 54, CREAM, kb, { face: 'marker', alpha: kbO, shadow: false });
    const kr = seg(t, tR - .2, tR + .4), krO = 1 - seg(t, top - .5, top - .1);
    if (kr > 0) writeOn('round things', 1300, 980, 74, CREAM, kr, { face: 'marker', alpha: krO, shadow: false });
    // not the V's opposite: what the V is told apart from. A gold V beside a cream O
    const kv = seg(t, top - .3, top + .3);
    if (kv > 0) {
      goldLine([[930, 900], [1000, 1030], [1070, 900]], kv, 12);
      letter('vs', 1170, 965, 60, CREAM, { face: 'marker', shadow: false, alpha: kv });
      ctx.save(); ctx.setLineDash([]); ctx.globalAlpha = kv; ctx.strokeStyle = CREAM; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(1330, 965, 64, -Math.PI / 2, -Math.PI / 2 + TAU * Math.min(kv, .999)); ctx.stroke(); ctx.restore();
      const ka = seg(t, tap - .5, tap + .3); if (ka > 0) writeOn('told apart', 1620, 965, 64, CREAM, ka, { face: 'marker', shadow: false });
    }
    noir();
  }

  // 5 · new suspects: a bullet train, the rack of pool balls. Each gets a V. Cats and cars get shoved off.
  const NEW = [[V + 'pTrain34', 'Bullet', { ax: .52, ay: .62, ty: .5, lx: .2, rx: .95 }], [V + 'pPool13', 'triangle', { ax: .56, ay: .62, ty: .3, lx: .4, rx: .72 }, [285, 92, 120, 101]]];
  function newShot(t, lt, dur) {
    const tn = wt('cc_new', 'never'), ts = wt('cc_new', 'shape'), e = ce('cc_new');
    bg('#2A2A2E');
    camKeys(t, [[cs('cc_new') - .2, 960, 640, 1.08], [tn, 960, 660, 1.12], [e + .5, 960, 620, 1.04]], .4);
    office(t, t, { photos: false, lamp: .95 + .05 * Math.sin(t * 7), vm: 1 });
    // the old cat and car prints at the front of the desk: Clawd shoves them off
    const push_ = seg(t, tn - .3, tn + 1.1);
    [[0, 330, 930, -.12], [1, 560, 950, .1], [4, 1500, 940, .14], [3, 1290, 950, -.08]].forEach(([g, x, y, r], i) => { const f = easeIn(clamp(push_ * 1.4 - i * .12)); polaroid(GRID[g], x + f * 120 * (i < 2 ? -1 : 1), y + f * 420, 150, 130, r + f * 1.5 * (i % 2 ? 1 : -1)); });
    NEW.forEach(([im, w0, vo, crop], i) => {
      const tw = wt('cc_new', w0), k = seg(t, tw - .5, tw + .1); if (k <= 0) return;
      const x = 510 + i * 520, y = 600 + (i % 2) * 30, w = 380, h = 320, r = (i - .5) * .1;
      const ox = lerp(1500, 0, easeOut(k)), rot = r + (1 - easeOut(k)) * 1.2;
      polaroid(im, x + ox, y - 80 * Math.sin(k * Math.PI), w, h, rot, { border: 14, crop });
      if (k >= 1) vOver(x, y, w, h, r, vo, seg(t, tw + .15, tw + .6), { sw: 9 });
    });
    const em = emotions(t, [[cs('cc_new') - .2, 'excited'], [tn - .4, 'determined'], [tn + 1.1, 'smug'], [ts, 'proud']]);
    const cx = 960 + 520 * Math.sin(lerp(-1.2, 1.2, ease(push_)));
    tourist(push_ > 0 && push_ < 1 ? cx : push_ >= 1 ? 1700 : 1700, 1040, 12, 'fedora', { ...em, view: push_ > 0 && push_ < 1 ? 'side' : 'q', flip: push_ < .5, walk: push_ > 0 && push_ < 1 ? t * 3 : undefined, boilKey: 'c3c' });
    camEnd();
    vignette(.55, '#000000');
    const kn = seg(t, tn - .3, tn + .6), knO = 1 - seg(t, ts - .8, ts - .4);
    if (kn > 0) writeOn('never about cats or cars', 960, 1010, 64, CREAM, kn, { face: 'marker', alpha: knO, shadow: false });
    const ks = seg(t, ts - .3, ts + .4);
    if (ks > 0) writeOn("it's a shape", 960, 1000, 100, GOLD, ks, { face: 'marker', shadow: false, stroke: '#141418', strokeW: .08 });
    noir();
  }

  // the typewriter's face (a real typewriter face, not the generic monospace) and its keyboard rows
  const TYPE = '"Courier 10 Pitch"', KEYS = ['1234567890-', 'QWERTYUIOP:', 'ASDFGHJKL;.', 'ZXCVBNM,'];
  // 6 · the typewriter: SUSPECTS: CATS, CARS (nouns) is struck out; a neuron is a verb: POINTED, NOT ROUND
  function typewriter(t, lt, dur) {
    const a = cs('cc_noun'), tAI = wt('cc_noun', 'AI'), tB = wt('cc_noun', 'But'), tpass = wt('cc_noun', 'passing'), e = ce('cc_noun');
    const tno = wt('cc_noun', 'nouns'), L = [[tno - .1, tno + .9, 'RULE: NO NOUNS.'], [wt('cc_noun', 'describing'), wt('cc_noun', 'cars') + .3, 'SUSPECTS: CATS, CARS'], [wt('cc_noun', 'often') - .2, wt('cc_noun', 'verb') + .25, 'NOT A NOUN. A VERB.'], [wt('cc_noun', 'distinction') - .2, wt('cc_noun', 'round') + .3, 'POINTED, NOT ROUND.']];
    bg('#2A2A2E');
    const fly = seg(t, tpass - .1, tpass + 1.7);
    camKeys(t, [[a - .2, 960, 560, 1.0], [L[2][0], 960, 520, 1.08], [L[3][1], 960, 500, 1.12], [e + .5, 980, 480, 1.0]], .4);
    layer('c3tw', () => { flat(rectPts(-200, -200, W + 400, 900), '#4A4A50'); for (let i = 0; i < 30; i++) flat(rectPts(-200 + i * 80, -200, 3, 900), '#47474D'); flat(rectPts(-200, 760, W + 400, 600), '#3A2E26'); flat(rectPts(-200, 760, W + 400, 14), '#5A4636'); }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    blinds(t, .3, 900);
    lamp(t, .9, 260);
    // typed progress
    let nLines = 0, cur = [];
    L.forEach(([t0, t1, s], i) => { if (t < t0) return; nLines = i + 1; const n = Math.floor(s.length * seg(t, t0, t1)); cur[i] = s.slice(0, n); });
    const col = nLines ? cur[nLines - 1].length : 0;
    // the key being struck now: the last character typed on the current line, and how far down it is (1 → 0 per char)
    const press = { ch: null, k: 0, n: 0 };
    L.forEach(([t0, t1, s_]) => { if (t < t0 || t > t1) return; const f = s_.length * seg(t, t0, t1), n = Math.floor(f), c_ = s_[Math.max(0, n - 1)]; if (n > 0 && c_ !== ' ') { press.ch = c_.toUpperCase(); press.k = 1 - frac(f); press.n = n; } });
    // carriage return: the paper rolls up a line and the carriage slides back over .4 s (never a one-frame jump)
    const cw = 30.4, ret = i => easeInOut(seg(t, L[i][0] - .4, L[i][0]));
    let scroll = 0, carX = -col * cw + 300;
    for (let i = 1; i < L.length; i++) { const r = ret(i); scroll += 86 * r; if (r > 0 && t < L[i][0]) carX = lerp(-L[i - 1][2].length * cw + 300, 300, r); }
    // the paper (rises out of the roller); after "passing that on" it is yanked out and folded into a plane
    const roll = seg(t, a + .2, a + 1.2);
    if (fly < .25) {
      const py = 610 - 260 * ease(roll) - scroll, pfly = fly / .25;
      // (clipped at the roller: the sheet feeds out of the machine, it never hangs down past it)
      ctx.save(); if (pfly <= 0) { ctx.beginPath(); ctx.rect(-400, -400, W + 800, 596 + 400); ctx.clip(); }
      push(); translate(960 + carX * 0, -500 * easeIn(pfly));
      flat(rectPts(-380 + carX + 0, py - 120, 760, 760), '#EDE9DF', { shadow: [8, 10, 'rgba(0,0,0,.35)'] });
      cur.forEach((s, i) => { if (!s) return; txt(s, -340 + carX, py + 30 + i * 86, 50, '#1A1A1E', { font: TYPE, align: 'left', weight: '700' }); });
      if (t > tB) { const sk = seg(t, tB, tB + .6), sl = L[1][2].length * cw + 20; ctx.save(); ctx.strokeStyle = '#1A1A1E'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-350 + carX, py + 116); ctx.lineTo(-350 + carX + sl * sk, py + 116 + 4 * Math.sin(sk * 9)); ctx.stroke(); ctx.restore(); }
      pop(); ctx.restore();
    }
    // the typewriter body (the carriage slides with the typing)
    push(); translate(960, 0);
    flat(rrPts(-440 + carX * .0 - 40, 590, 960, 70, 30), '#1E1E22');
    flat(rrPts(-440 + carX, 576, 880, 46, 20), '#2E2E34', { line: '#101012', lw: 3 }); flat(ellPts(-450 + carX, 599, 26, 34, 16), '#26262C'); flat(ellPts(450 + carX, 599, 26, 34, 16), '#26262C'); flat(rectPts(-500 + carX, 590, 50, 12), '#3A3A42');
    flat([[-420, 650], [420, 650], [500, 940], [-500, 940]], '#222228', { line: '#0E0E10', lw: 4 });
    flat([[-380, 660], [380, 660], [400, 700], [-400, 700]], '#3A3A42');
    // the keys: round caps with a chrome rim and a letter, each on a stem down into the basket; the key for the letter
    // being typed goes down (and Clawd's arm with it)
    flat([[-360, 700], [360, 700], [372, 712], [-372, 712]], '#141418');
    const keyAt = (r, c) => [-400 + r * 22 + c * 76 + (r === 3 ? 76 : 0) + 30, 744 + r * 52, KEYS[r][c]];
    for (let r = 3; r >= 0; r--) for (let c = 0; c < KEYS[r].length; c++) { const [kx, ky, ch_] = keyAt(r, c), dn = ch_ === press.ch ? 7 * press.k : 0; ctx.save(); ctx.strokeStyle = '#0E0E10'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx, ky + dn); ctx.lineTo(kx - (kx * .06), 704); ctx.stroke(); ctx.strokeStyle = '#4A4A52'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }   // stems first, so no stem crosses a cap
    for (let r = 0; r < 4; r++) for (let c = 0; c < KEYS[r].length; c++) {
      const [kx, ky, ch_] = keyAt(r, c), dn = ch_ === press.ch ? 7 * press.k : 0;
      flat(ellPts(kx, ky + 6 + dn, 27, 21, 18), '#0A0A0C');
      flat(ellPts(kx, ky + dn, 26, 20, 18), '#B8B4AA', { line: '#0E0E10', lw: 2 });
      flat(ellPts(kx, ky - 1 + dn, 20, 15, 16), '#1C1C20');
      txt(ch_, kx, ky + dn, 20, '#E6E2D8', { font: TYPE, weight: '700' });
    }
    flat(rrPts(-250, 940, 500, 34, 10), '#14141A');
    pop();
    // the next neuron down the road: a little house on the shelf; the paper plane flies to it and lands at its door
    const land = seg(fly, .97, 1), HX = 1700, HY = 330;
    flat(rectPts(HX - 140, HY + 52, 280, 16), '#2A2420', { line: '#141418', lw: 2 });
    flat(rectPts(HX - 60, HY - 28, 120, 80), '#5A5A62', { line: '#141418', lw: 3 }); flat([[HX - 74, HY - 26], [HX, HY - 86], [HX + 74, HY - 26]], '#34343A', { line: '#141418', lw: 3 }); flat(rectPts(HX - 12, HY + 12, 24, 40), '#26262C');
    for (const wx of [HX - 42, HX + 20]) flat(rectPts(wx, HY - 14, 22, 20), land > 0 ? mixCol('#3A3A40', '#FFFFFF', land) : '#3A3A40', { line: '#141418', lw: 2 });
    if (land > 0) glow(HX, HY, 220, '#FFFFFF', .6 * land);
    // the paper plane after it's yanked out
    if (fly > .2) { const u = seg(fly, .2, 1), px = lerp(980, HX - 20, easeInOut(u)), py = lerp(260, HY + 30, u) - 120 * Math.sin(u * Math.PI), s = lerp(2.2, .6, u); if (u < 1 || t < tpass + 2.2) { push(); translate(px, py); rotate(lerp(-.3, .1, u) + .15 * Math.sin(u * 9) * (1 - u)); scale(s); flat([[-70, -10], [70, 0], [-70, 26], [-40, 4]], '#EDE9DF', { line: '#1A1A1E', lw: 3 }); pop(); } }
    if (land > 0) letter('the next neuron', HX, HY + 105, 50, CREAM, { face: 'marker', shadow: false, alpha: land });
    // Clawd types (and blushes at "AI assistants")
    const typing = L.some(([t0, t1]) => t > t0 && t < t1);
    const em = emotions(t, [[a - .2, 'determined'], [tAI - .1, 'shy'], [wt('cc_noun', 'love') + .9, 'determined'], [tB, 'surprised'], [L[2][0] + .3, 'idea'], [L[3][0], 'determined'], [tpass, 'proud']]);
    // he stands at the machine's front right corner and hunts and pecks: each struck key dips one arm onto the keys
    const ty = typing ? { aL: press.n % 2 ? .45 - .5 * press.k : .45, aR: press.n % 2 ? .45 : .45 - .5 * press.k } : {};
    tourist(1430, 975, 15, 'fedora', { ...em, ...ty, view: t > tAI - .1 && t < wt('cc_noun', 'love') + .9 ? 'front' : 'q', flip: true, boilKey: 'c3c' });
    // dings at the end of lines
    L.forEach(([, t1]) => { if (t > t1 && t < t1 + 1) sfx('ding!', 1500, 560, 50, CREAM, t - t1); });
    if (fly > 0 && fly < .6) sfx('zip!', 1200, 300, 54, CREAM, (t - tpass) * 1.3);
    camEnd();
    vignette(.55, '#000000');
    const kp = seg(t, tpass - .2, tpass + .5);
    if (kp > 0) writeOn('...and passing that on', 960, 120, 64, CREAM, kp, { face: 'marker', shadow: false });

    noir();
  }

  // 7 · the police sketch artist (feature visualization): paints the portrait; follows the easiest route, the cat route
  function sketch(t, lt, dur) {
    const a = cs('cc_whiskers'), tp = wt('cc_whiskers', 'portrait'), tf = wt('cc_whiskers', 'feature'), tw1 = wt('cc_whiskers', 'whiskers'), tE = wt('cc_whiskers', 'easiest'), tc = wt('cc_whiskers', 'cat', 1), tw2 = wt('cc_whiskers', 'whiskers', 1), e = ce('cc_whiskers');
    bg('#2A2A2E');
    camKeys(t, [[a - .2, 960, 540, 1.0], [tw1, 990, 490, 1.12], [tE - .3, 1000, 520, 1.0], [tc, 1130, 520, 1.06], [tw2, 1000, 500, 1.08], [e + .5, 960, 520, 1.02]], .4);
    layer('c3sk', () => { flat(rectPts(-200, -200, W + 400, 1180), '#4A4A50'); for (let i = 0; i < 30; i++) flat(rectPts(-200 + i * 80, -200, 3, 1180), '#47474D'); flat(rectPts(-200, 960, W + 400, 400), '#2E2E34'); for (let i = 0; i < 14; i++) flat(rectPts(-200 + i * 180, 960, 4, 400), '#26262C'); }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    blinds(t, .3, 600);
    // the street map on the wall: the V crossing, a wide downhill road to the cat district (pinned up when the route is named)
    const MX = 1290, MY = 150, mk = ease(seg(t, tE - .5, wt('cc_whiskers', 'route')));
    if (mk > 0) { ctx.save(); ctx.globalAlpha = mk;
    flat(rectPts(MX, MY, 520, 440), '#CFCBC0', { shadow: [8, 10, 'rgba(0,0,0,.35)'] });
    for (let i = 0; i < 9; i++) flat(rectPts(MX + 20 + i * 56, MY + 20, 2, 400), '#BDB9AE');
    const node = [MX + 260, MY + 90], CAT = [[MX + 260, MY + 90], [MX + 200, MY + 200], [MX + 140, MY + 300], [MX + 110, MY + 390]], CAR = [[MX + 260, MY + 90], [MX + 380, MY + 160], [MX + 450, MY + 230]], FOX = [[MX + 260, MY + 90], [MX + 330, MY + 260], [MX + 360, MY + 370]];
    const road = (P, w, c) => { ctx.save(); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); through(P, 6).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); };
    road(CAT, 46, '#6A6A70'); road(CAR, 12, '#7A7A80'); road(FOX, 12, '#7A7A80'); road(CAT, 4, '#E6E2D8');
    dot(node[0], node[1], 22, '#2A2A2E', mk);
    txt('V', node[0], node[1] + 2, 30, '#E6E2D8', { font: 'serif' });
    txt('CATS', MX + 120, MY + 420, 40, '#2A2A2E', { font: 'serif' }); txt('cars', MX + 405, MY + 272, 30, '#4A4A50', { font: 'serif' }); txt('fox', MX + 380, MY + 400, 30, '#4A4A50', { font: 'serif' });
    // the painter's pin wanders from the V down the cat road
    const wander = seg(t, tE + .2, tc + .6), Cc = through(CAT, 10), pp = Cc[Math.floor(ease(wander) * (Cc.length - 1))];
    inColor(() => { glow(pp[0], pp[1], 50, '#FFC04A', .9 * mk); });
    dot(pp[0], pp[1], 12, '#FFFFFF', mk);
    ctx.restore(); }
    // the artist: first the real portrait (whiskers and all); then a rewind: it starts again from a clean V, then
    // goes down the cat route and adds the cat's whiskers
    const rew = seg(t, tE - .9, tE - .1), redo = seg(t, tE, tE + 1.2), cat = seg(t, tc + .2, tc + 1.6);
    const showFirst = rew < 1 ? seg(t, tp - .4, tf + .4) * (1 - ease(rew)) : 0;
    artist(t, 470, 990, 1.85, { img2: V + 'fv-pointed', k2: rew < 1 ? 0 : cat, paintCol: '#CFCBC0' });
    // the portrait appears where the brush has been (dabs along the brush's own path), not as a wipe; then the brush and
    // the end of the arm are drawn again on top, so the hand stays over the paint it is laying down
    { const im = rew < 1 ? V + 'fv-pointed' : V + 'gen-pointed-old', p0 = rew < 1 ? tp - .4 : tE, p1 = rew < 1 ? tf + .4 : tE + 1.2, al = rew < 1 ? 1 - ease(rew) : 1;
      const brush = q => [170 + 170 * (.5 + .5 * Math.sin(q * 3)), -330 + 70 * Math.sin(q * 2.3)];
      if (t > p0 && al > 0 && cat < 1) {
        push(); translate(470, 990); scale(1.85);
        const prog = seg(t, p0, p1), I = img(im), sz = Math.min(I.width, I.height), clip = new Path2D();
        if (prog >= 1) clip.rect(140, -410, 220, 220);
        else for (let q = p0; q <= t; q += 1 / 48) { const [bx, by] = brush(q), r = 26 + 120 * Math.pow(seg(q, p0, p1), 2); clip.moveTo(bx + r, by + 30); clip.arc(bx, by + 30, r, 0, TAU); }
        ctx.save(); ctx.globalAlpha *= al; ctx.beginPath(); ctx.rect(140, -410, 220, 220); ctx.clip(); ctx.clip(clip); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, 140, -410, 220, 220); ctx.restore();
        const [bx, by] = brush(t); inkLine([[110, -250], [bx - 24, by + 26]], 5, '#8C8A9A', 'ink', .4); inkLine([[bx - 24, by + 26], [bx, by]], 3.4, '#7A5B3E', 'ink', 0); paint(ellPts(bx, by, 7, 7, 8), { wash: '#CFCBC0', ink: null });
        pop(); } }
    // canvas rect in world coords (artist local 140..360, -410..-190, scaled 1.85 about (470, 990))
    const s = 1.85, cx0 = 470 + 140 * s, cy0 = 990 - 410 * s, cw = 220 * s;
    if (t > tw1 - .3 && t < tE - .9) { const rk = seg(t, tw1 - .3, tw1 + .3); ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 9; ctx.setLineDash([22, 12]); ctx.beginPath(); ctx.ellipse(cx0 + cw * .5, cy0 + cw * .66, cw * .32, cw * .16, 0, 0, TAU * rk); ctx.stroke(); ctx.restore(); }
    // the whiskers flourish
    const wk = seg(t, tw2 - .5, tw2 + .3);
    // (in ink, not gold: gold is the V's colour, and the whiskers are the artist's detour)
    if (wk > 0) for (let i = 0; i < 6; i++) { const sd = i < 3 ? -1 : 1, j = i % 3, A = [cx0 + cw * (.5 + sd * .1), cy0 + cw * (.62 + j * .04)], B = [cx0 + cw * (.5 + sd * .45), cy0 + cw * (.52 + j * .1)], k = clamp(wk * 3 - i * .3); if (k > 0) { ctx.save(); ctx.strokeStyle = '#141418'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(lerp(A[0], B[0], k), lerp(A[1], B[1], k)); ctx.stroke(); ctx.restore(); } }
    if (redo > 0 && rew >= 1) vOver(cx0, cy0, cw, cw, 0, { ax: .5, ay: .82, ty: .1, lx: .12, rx: .88 }, seg(t, tE + .1, tE + .8) * (1 - .7 * cat), { sw: 7 });
    const em = emotions(t, [[a - .2, 'confused'], [tf, 'neutral'], [tw1, 'surprised'], [tE, 'thinking'], [tc + .5, 'suspicious'], [tw2 + .2, 'bored']]);
    tourist(1520, 975, 12, 'fedora', { ...em, view: 'q', flip: true, boilKey: 'c3c' });
    camEnd();
    vignette(.55, '#000000');
    const kf2 = seg(t, tf - .2, tf + .5), kf2O = 1 - seg(t, tE - 1.2, tE - .8);
    if (kf2 > 0) writeOn('feature visualization', 760, 110, 66, CREAM, kf2, { face: 'marker', alpha: kf2O, shadow: false });
    const ke = seg(t, tE - .2, tE + .5), keO = 1 - seg(t, tw2 - 1, tw2 - .6);
    if (ke > 0) writeOn('the easiest route', 760, 110, 66, CREAM, ke, { face: 'marker', alpha: keO, shadow: false });
    const kw = seg(t, tw2 - .3, tw2 + .4);
    if (kw > 0) writeOn('whiskers included', 760, 110, 66, CREAM, kw, { face: 'marker', shadow: false });
    noir();
  }

  // 8 · case closed: CASE 1 SOLVED (Clawd stamps his own forehead). CASE FILE #2 lands on the desk, in colour.
  function lesson(t, lt, dur) {
    const a = cs('cc_lesson'), to = wt('cc_lesson', 'one'), tg = wt('cc_lesson', 'grouping'), tc = wt('cc_lesson', 'clue'), t2 = ce('cc_lesson') + .5;
    bg('#2A2A2E');
    camKeys(t, [[a - .2, 1000, 790, 1.22], [tg, 1000, 800, 1.28], [t2 + .3, 1040, 795, 1.28], [chapStart('ch04') + .1, 1440, 770, 1.6], [chapStart('ch04') + 2, 1440, 770, 1.9]], .3);
    office(t, t, { photos: false, vm: 1, lamp: .95, tear: false, neon: false });
    // the CASE 1 folder
    const fk = popk(t, a + .1, .6);
    if (fk > 0) {
      push(); translate(860, 860); rotate(-.05); scale(backOut(fk)); translate(-860, -860);
      flat(rrPts(505, 700, 330, 50, 10), '#A8A090'); flat(rrPts(500, 720, 720, 330, 10), '#B8B0A0', { shadow: [10, 14, 'rgba(0,0,0,.4)'] });
      txt('CASE 1 · CAT & CAR', 670, 726, 28, '#1A1A1E', { font: '"Courier 10 Pitch"', weight: '700' });
      polaroid(GRID[0], 590, 770, 220, 190, -.07); polaroid(GRID[1], 900, 780, 220, 190, .06);
      // one V across both: one thing
      goldLine([[620, 790], [860, 1000], [1110, 790]], seg(t, to - .3, to + .6), 10);
      pop();
    }
    // Clawd with the rubber stamp: stamps the folder, then (by mistake) his own forehead
    const ts1 = tc - .15, ts2 = tc + .65;
    const hop1 = env(t, ts1 - .5, ts1 + .1, .3, .1), hop2 = env(t, ts2 - .4, ts2 + .1, .25, .1);
    if (t > ts1) { const k = popk(t, ts1, .2), s = lerp(1.5, 1, easeOut(k)); push(); translate(880, 985); rotate(-.08); scale(s); ctx.strokeStyle = '#141418'; ctx.lineWidth = 8; ctx.strokeRect(-170, -46, 340, 92); pop(); txt('SOLVED', 880, 985, 74 * s, '#141418', { font: 'serif', rot: -.08 }); }
    const em = emotions(t, [[a - .2, 'happy'], [tg, 'proud'], [ts1, 'excited'], [ts2, 'dizzy'], [ts2 + 1.2, 'laugh']]);
    const HOME = 340, cx = t < ts1 ? HOME : lerp(1040, 1160, ease(seg(t, ts1 + .15, ts1 + .5)));
    const cxx = t > ts1 - .6 && t < ts1 + .2 ? lerp(HOME, 1040, ease(seg(t, ts1 - .6, ts1 - .2))) : cx;
    const stampArm = (u, sw) => { flat(rectPts(0, -u * .5, u * 1.4, u), '#2A2A2E'); flat(rrPts(u * 1.4, -u * 1.2, u * 1.2, u * 2.4, u * .2), '#5A4636', { line: '#141418', lw: 2 }); };
    tourist(cxx, 1000 - 60 * Math.sin(hop1 * Math.PI) - 40 * Math.sin(hop2 * Math.PI), 16, 'fedora', { ...em, view: 'q', flip: cxx > 800, aR: t > ts2 - .5 && t < ts2 + .2 ? 2.4 : 1.0, armR: stampArm, boilKey: 'c3c' });
    if (t > ts2) txt('SOLVED', cxx - 14, 1000 - 16 * 6.4, 34, '#141418', { font: 'serif', rot: .12 });
    if (t > ts2 && t < ts2 + .5) sfx('thunk!', cxx - 30, 800, 54, CREAM, t - ts2, { life: .5 });
    // CASE FILE #2 slides onto the desk: its cover art is the next world (orange and black cut paper), in colour
    const k2 = seg(t, t2 + .1, t2 + .7);   // after the stamps have landed
    if (k2 > 0) {
      const x = lerp(2400, 1440, easeOut(k2)), y = 770, r = lerp(.4, .06, easeOut(k2));
      push(); translate(x, y); rotate(r);
      inColor(() => {
        ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-190 + 12, -230 + 16, 380, 460);
        ctx.fillStyle = '#C9A15A'; ctx.fillRect(-190, -230, 380, 460); ctx.fillRect(-170, -258, 140, 40);
        ctx.fillStyle = '#E8862A'; ctx.fillRect(-170, -210, 340, 420);
        ctx.fillStyle = '#1A1A1A'; ctx.beginPath(); ctx.moveTo(-170, 60); ctx.lineTo(170, 20); ctx.lineTo(170, 210); ctx.lineTo(-170, 210); ctx.closePath(); ctx.fill();
        // four little doghouses and a sneaky car, cut paper
        const cols = ['#D2473F', '#F3E2BE', '#3A64B8', '#F3E2BE'];
        for (let i = 0; i < 4; i++) { const hx = -125 + i * 82; ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.moveTo(hx - 30, 100); ctx.lineTo(hx, 64); ctx.lineTo(hx + 30, 100); ctx.lineTo(hx + 30, 150); ctx.lineTo(hx - 30, 150); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#1A1A1A'; ctx.fillRect(hx - 9, 120, 18, 30); }
        ctx.fillStyle = '#E8862A'; ctx.beginPath(); ctx.moveTo(-70, 195); ctx.lineTo(-58, 172); ctx.lineTo(-20, 160); ctx.lineTo(25, 160); ctx.lineTo(50, 178); ctx.lineTo(62, 195); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#1A1A1A'; ctx.font = '900 72px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('CASE 2', 0, -120);
      });
      pop();
    }
    camEnd();
    vignette(.5, '#000000');
    const kl = seg(t, tg - .3, tg + .7), klO = 1 - seg(t, t2 - .6, t2 - .2);
    if (kl > 0) writeOn("a grouping isn't noise — it's a clue", 960, 140, 62, CREAM, kl, { face: 'marker', alpha: klO, shadow: false });
    const k1 = seg(t, wt('cc_lesson', 'one', 0) - .2, wt('cc_lesson', 'one', 0) + .4), k1O = 1 - seg(t, tg - .7, tg - .3);
    if (k1 > 0) writeOn('one thing we have no word for yet', 960, 140, 58, CREAM, k1, { face: 'marker', alpha: k1O, shadow: false });
    const ks = seg(t, wt('cc_lesson', 'small') - .3, wt('cc_lesson', 'ones') + .2), ksO = 1 - seg(t, tg - .7, tg - .3);
    if (ks > 0) writeOn('…or a small family of related ones', 960, 215, 46, CREAM, ks, { face: 'marker', alpha: ksO, shadow: false });
    noir();
  }

  shots([[chapStart('ch03'), returnShot], [cs('cc_v') - .2, vShot], [wt('cc_inputs', 'Look') - .4, inputs], [cs('cc_round') - .2, darkroom], [cs('cc_new') - .2, newShot], [cs('cc_noun') + .4, typewriter], [cs('cc_whiskers') - .2, sketch], [cs('cc_lesson') - .2, lesson]]);
})();
