// ch12 How networks learn to be clean: NATURE DOCUMENTARY on a golden savanna (letterbox, lower thirds in latin).
// The dart's seed sprouts; the Knot peeks out of the grass ("why not a knot?"); one Labrador photo on a field post;
// the narrow meerkat (one pixel) and the broad grazer (grass + tan fur) race to explain it; the learning signal pours
// into the grazer, which grows while the meerkat starves; the next grassy photo and the grazer's head start; a
// time-lapse of herds where newcomers join their own kind; a search for rare things, then one great triceratops;
// camera-trap prints of understandable mistakes; the Knot paints a cat face on the skull and the real jaguars wake;
// an aerial view of migration trails, where in nine steps an off-ramp joins the umbrella trail to the bee trail; a
// sterile zoo of strangers beside the living savanna; then the camera rises into the sky, toward orbit.
(() => {
  const OL = 'blog/raw/one-image-logits/', UC = 'blog/raw/umbrella-circuit/', AD = 'blog/raw/adversarial-appendix/', DV = 'blog/derived/', NP = 'blog/raw/negative-poles-v2/';
  const CH = chapStart('ch12'), NEXT = chapStart('ch13');
  const HZ = 600, INK = '#3A2410';

  // ---------- the savanna ----------
  function skyL(k = 0) {
    layer('c12sky', () => { ctx.fillStyle = lgrad(0, -300, 0, HZ + 40, [[0, '#F0A24E'], [.55, '#F6C27A'], [1, '#F8DCA0']]); ctx.fillRect(-400, -400, W + 800, HZ + 500); }, { x: -400, y: -400, w: W + 800, h: HZ + 500, variants: 1 });
  }
  function acacia(x, y, s, col = '#3A2410') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); flat(taper([[0, 0], [10, -140], [-10, -260]], [30, 22, 16]), col); flat(taper([[2, -150], [60, -210], [110, -250]], [14, 10, 8]), col); flat(taper([[-4, -170], [-60, -230], [-120, -255]], [14, 10, 8]), col); for (let k = 0; k < 5; k++) flat(ellPts(-130 + k * 62, -266 - 10 * Math.sin(k * 1.3), 92, 26, 20), col); ctx.restore(); }
  function groundL() {
    layer('c12ground', () => {
      // distant hills, haze
      flat([[-400, HZ + 10], [-100, HZ - 40], [300, HZ - 20], [700, HZ - 60], [1100, HZ - 25], [1500, HZ - 55], [1900, HZ - 20], [2400, HZ - 40], [2400, HZ + 40], [-400, HZ + 40]].map(p => p), '#D9A86A');
      flat([[-400, HZ + 10], [200, HZ - 10], [800, HZ + 4], [1300, HZ - 14], [2400, HZ + 6], [2400, HZ + 60], [-400, HZ + 60]], '#CDA060');
      acacia(-60, HZ + 30, .7, '#7A5A3A'); acacia(1580, HZ + 26, .6, '#6A4A2A'); acacia(1820, HZ + 22, .42, '#8A6A4A'); acacia(560, HZ + 22, .38, '#9A7A5A');
      ctx.fillStyle = lgrad(0, HZ + 20, 0, 1300, [[0, '#D2A048'], [.35, '#C9963A'], [1, '#A87428']]); ctx.fillRect(-400, HZ + 20, W + 800, 1300 - HZ);
      for (let i = 0; i < 520; i++) { const x = -400 + hash(i) * (W + 800), yy = Math.pow(hash(i * 3), 1.6), y = HZ + 40 + yy * 660, h = (6 + 26 * hash(i * 5)) * (.4 + 1.6 * yy); ctx.strokeStyle = mixCol('#8C6424', '#EBC67E', hash(i * 7)); ctx.lineWidth = 1.5 + 2 * yy; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 3, y - h * .6, x + 8 * (hash(i) - .5), y - h); ctx.stroke(); }
      for (let i = 0; i < 14; i++) { const x = -300 + hash(i * 4.4) * (W + 600), y = HZ + 120 + hash(i * 1.9) * 500; ctx.fillStyle = 'rgba(120,80,30,.18)'; ctx.beginPath(); ctx.ellipse(x, y, 120 + 80 * hash(i), 16 + 10 * hash(i * 2), 0, 0, TAU); ctx.fill(); }
    }, { x: -400, y: HZ - 120, w: W + 800, h: 1300 - HZ + 120, variants: 1 });
  }
  function sun(x = 1400, y = 380, r = 110) { glow(x, y, r * 3.4, '#FFF2C8', .8); dot(x, y, r, '#FFE9B0'); }
  function savanna(t, o = {}) {
    skyL(); sun(o.sx, o.sy);
    // birds drifting across the sky
    for (let i = 0; i < 5; i++) { const f = frac(t * .02 + hash(i * 3)), x = -200 + f * (W + 400), y = 200 + 80 * hash(i * 7) + 10 * Math.sin(t * 2 + i), fl = Math.sin(t * 8 + i) * 8; ctx.strokeStyle = '#4A3420'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 14, y - fl); ctx.quadraticCurveTo(x - 6, y - 4, x, y); ctx.quadraticCurveTo(x + 6, y - 4, x + 14, y - fl); ctx.stroke(); }
    groundL();
    acacia(230, HZ + 50, 1, INK);
  }
  // swaying grass in front (screen-ish foreground), call after the animals
  function frontGrass(t, y0 = 990, n = 46, o = {}) {
    for (let i = 0; i < n; i++) { const x = -300 + hash(i * 9.1 + (o.seed || 0)) * (W + 600), y = y0 + hash(i * 2.3) * 160, h = (o.h || 110) * (.6 + .8 * hash(i * 4.7)), sw = Math.sin(t * 1.6 + i) * 12; ctx.strokeStyle = mixCol('#8C6020', '#E6BE70', hash(i * 1.3)); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sw * .4, y - h * .6, x + sw, y - h); ctx.stroke(); }
  }
  function dust(t, k = 1) { for (let i = 0; i < 22; i++) { const f = frac(t * .04 + hash(i)), x = hash(i * 3.3) * W * 1.2 - 100 + f * 200, y = 300 + hash(i * 7.1) * 700 - f * 80; dot(x, y, 2 + 3 * hash(i * 5), '#FFF2C8', .4 * k * Math.sin(f * Math.PI)); } }
  // documentary grade, letterbox and lower thirds (italic latin names)
  function docPost(t) { GRAIN = .75; fxLetterbox(90); }
  function lower(t, a, b, latin, common, side = 0) {
    const k = ease(seg(t, a, a + .6)) * (1 - ease(seg(t, b - .5, b))); if (k <= 0) return;
    POST.push(() => {
      ctx.save(); ctx.globalAlpha = k;
      ctx.font = 'italic 58px "DejaVu Serif"'; const w1 = ctx.measureText(latin).width; ctx.font = '40px "DejaVu Serif"'; const w2 = ctx.measureText(common).width, w = Math.max(w1, w2) + 90;
      const x0 = side ? W - 110 - w : 110;
      ctx.fillStyle = 'rgba(20,12,4,.6)'; ctx.fillRect(x0, 800, w, 160); ctx.fillStyle = '#F0BE46'; ctx.fillRect(x0, 800, 8, 160);
      ctx.fillStyle = '#FFF2C8'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.font = 'italic 58px "DejaVu Serif"'; ctx.fillText(latin, x0 + 40, 850); ctx.font = '40px "DejaVu Serif"'; ctx.fillStyle = '#F3DDB0'; ctx.fillText(common, x0 + 40, 915);
      ctx.restore();
    });
  }
  // a documentary caption at the top of the picture (inside the letterbox)
  function caption(t, a, b, s, y = 170) { const k = ease(seg(t, a, a + .5)) * (1 - ease(seg(t, b - .4, b))); if (k > 0) letter(s, 960, y, 68, '#FFF6E0', { face: 'hand', shadow: false, alpha: k, stroke: '#3A2410', strokeW: .16, screen: true }); }

  // ---------- props and animals ----------
  // a field post holding a print (a photo in the world): bottom of the posts at (x, y)
  function photoPost(im, x, y, w, h, k = 1, o = {}) {
    if (k <= .01) return; const s = backOut(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(1, s);
    ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 4, w * .55, 14, 0, 0, TAU); ctx.fill();
    for (const sd of [-1, 1]) flat(rectPts(sd * w * .36 - 9, -h - 120, 18, h + 124), '#6A4A2A', { line: INK, lw: 3 });
    flat(rectPts(-w / 2 - 14, -h - 104 - 14, w + 28, h + 28), '#8C6A48', { line: INK, lw: 4, shadow: [10, 12, 'rgba(40,20,0,.3)'] });
    photoFlat(im, -w / 2, -h - 104, w, h, {});
    ctx.fillStyle = 'rgba(255,240,200,.12)'; ctx.fillRect(-w / 2, -h - 104, w, h);
    ctx.restore();
    return { x0: x - w / 2, y0: y - h - 104, w, h };
  }
  // the broad circuit, optionally carrying a photo on its flank (a neuron's window)
  function beast(x, y, s, t, o = {}) {
    ctx.save(); if (o.flip) { ctx.translate(x, 0); ctx.scale(-1, 1); ctx.translate(-x, 0); }
    grazer(x, y, s, t, { walk: o.walk ?? 0 });
    ctx.restore();
    if (o.im) { const fx = x + (o.flip ? 10 : -10) * s - 78 * s, fy = y - 236 * s; if (o.lit) glow(x, fy + 50 * s, 160 * s, '#FFE08A', .5 * o.lit); photoFlat(o.im, fx, fy, 156 * s, 104 * s, { border: Math.max(3, 8 * s), borderCol: '#F3DDB0', shadow: false }); }
  }
  // a jaguar crouched in the grass, facing right; on 0..1 = its neuron fires (spots and eyes glow)
  function jaguar(x, y, s, t, on = 0, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -s : s, s);
    const coat = mixCol('#D9A040', '#FFE08A', on * .5), OUT = '#3A1E08';
    if (on > .02) { glow(0, -80, 360, '#FFD36B', .8 * on); glow(150, -110, 120, '#FFFFFF', .5 * on); }
    ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 2, 210, 14, 0, 0, TAU); ctx.fill();
    fillPath(pathOf(taper([[-140, -70], [-210, -40], [-250, -70], [-262, -110]], [24, 18, 14, 10])), coat, OUT, 3);
    for (const [lx, far] of [[-110, 1], [70, 1], [-80, 0], [100, 0]]) fillPath(pathOf(taper([[lx, -70], [lx + 12, -30], [lx + 22, -6]], [40, 30, 26])), far ? mixCol(coat, '#000000', .2) : coat, OUT, 3);
    const B = new Path2D(); B.ellipse(-10, -78, 160, 56, 0, 0, TAU); fillPath(B, lgrad(0, -134, 0, -22, [[0, mixCol(coat, '#8A5A20', .3)], [1, '#F3DDB0']]), OUT, 3.5);
    ctx.save(); ctx.clip(B); for (let i = 0; i < 26; i++) { const sx = -160 + hash(i * 3.1) * 300, sy = -124 + hash(i * 7.3) * 80; ctx.strokeStyle = on > .1 ? mixCol('#3A1E08', '#FFF2A0', on) : '#3A1E08'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(sx, sy, 9 + 4 * hash(i), .3, TAU - .6); ctx.stroke(); dot(sx, sy, 3, '#8A5A20'); } ctx.restore();
    const hx = 150, hy = -100, HD = new Path2D(); HD.ellipse(hx, hy, 52, 46, 0, 0, TAU); fillPath(HD, coat, OUT, 3.5);
    for (const ex of [-26, 18]) { const E = new Path2D(); E.ellipse(hx + ex, hy - 42, 14, 14, 0, 0, TAU); fillPath(E, coat, OUT, 3); }
    fillPath((() => { const p = new Path2D(); p.ellipse(hx + 40, hy + 14, 28, 20, 0, 0, TAU); return p; })(), '#F3DDB0', OUT, 2.5);
    dot(hx + 58, hy + 6, 7, '#2A1A10');
    for (const ex of [6, 34]) { if (on > .1) { glow(hx + ex, hy - 10, 30, '#FFF2A0', on); dot(hx + ex, hy - 10, 8, '#FFF2A0'); dot(hx + ex, hy - 10, 3, '#2A1A10'); } else { ctx.strokeStyle = '#2A1A10'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(hx + ex - 8, hy - 10); ctx.quadraticCurveTo(hx + ex, hy - 6, hx + ex + 8, hy - 10); ctx.stroke(); } }
    ctx.restore();
    if (o.im) { const fx = x + (o.flip ? -1 : 1) * -70 * s, fy = y - 120 * s; photoFlat(o.im, fx - 60 * s, fy, 120 * s, 84 * s, { border: 6 * s, borderCol: '#F3DDB0', shadow: false, alpha: .45 + .55 * on }); }
  }
  // the triceratops: one grand animal, facing left; its flank window shows the essay's triceratops photo
  function triceratops(x, y, s, t, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const C = '#7E8A66', D = '#5E6A4A', L = '#A9B48A', OUT = '#22301A', br = Math.sin(t * 1.4) * 3;
    ctx.fillStyle = 'rgba(30,20,0,.28)'; ctx.beginPath(); ctx.ellipse(0, 4, 300, 22, 0, 0, TAU); ctx.fill();
    fillPath(pathOf(taper([[150, -160], [250, -130], [330, -70]], [80, 40, 10])), D, OUT, 3);
    for (const [lx, far] of [[110, 1], [-110, 1]]) fillPath(pathOf(taper([[lx, -140], [lx, -70], [lx + 4, -4]], [60, 52, 56])), D, OUT, 3);
    const B = new Path2D(); B.ellipse(10, -170 + br, 210, 110, 0, 0, TAU); fillPath(B, lgrad(0, -280, 0, -60, [[0, D], [.5, C], [1, L]]), OUT, 4);
    ctx.save(); ctx.clip(B); ctx.strokeStyle = 'rgba(40,50,20,.35)'; ctx.lineWidth = 6; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(-180 + i * 44, -276); ctx.quadraticCurveTo(-170 + i * 44, -220, -186 + i * 44, -190); ctx.stroke(); } ctx.restore();
    for (const [lx] of [[140], [-80]]) fillPath(pathOf(taper([[lx, -130], [lx - 4, -66], [lx - 2, -4]], [70, 60, 64])), C, OUT, 3.5);
    // head: frill fan, face, beak, horns
    ctx.save(); ctx.translate(-220, -200 + br); ctx.rotate(.1 + .03 * Math.sin(t * .9));
    const FR = new Path2D(); for (let i = 0; i <= 14; i++) { const a = -Math.PI * .1 - i / 14 * Math.PI * .95, r = 150 + (i % 2) * 18; i ? FR.lineTo(Math.cos(a) * r + 40, Math.sin(a) * r) : FR.moveTo(Math.cos(a) * r + 40, Math.sin(a) * r); } FR.lineTo(40, 40); FR.closePath(); fillPath(FR, lgrad(0, -160, 0, 30, [[0, '#C9763A'], [1, '#8A5A2A']]), OUT, 4);
    ctx.strokeStyle = 'rgba(60,30,10,.4)'; ctx.lineWidth = 4; for (let i = 0; i < 6; i++) { const a = -Math.PI * .2 - i / 6 * Math.PI * .75; ctx.beginPath(); ctx.moveTo(40, -10); ctx.lineTo(40 + Math.cos(a) * 130, Math.sin(a) * 130); ctx.stroke(); }
    const F = new Path2D(); F.moveTo(60, -40); F.bezierCurveTo(20, -80, -80, -70, -120, -20); F.lineTo(-150, 20); F.bezierCurveTo(-120, 40, -40, 50, 50, 40); F.closePath(); fillPath(F, lgrad(0, -80, 0, 50, [[0, C], [1, L]]), OUT, 4);
    fillPath(pathOf([[-120, -20], [-176, 10], [-150, 30]]), '#4A3A2A', OUT, 3);
    for (const [hx, hy, ang, len] of [[-20, -60, -1.25, 120], [10, -56, -1.05, 110], [-110, -30, -1.9, 50]]) fillPath(pathOf(taper([[hx, hy], [hx + Math.cos(ang) * len * .5, hy + Math.sin(ang) * len * .5], [hx + Math.cos(ang + .2) * len, hy + Math.sin(ang + .2) * len]], [22, 12, 1])), '#F3E6CC', OUT, 3);
    dot(-50, -30, 9, '#1A1210'); dot(-48, -33, 3, '#FFFFFF');
    ctx.restore();
    ctx.restore();
    if (o.im) { const fx = x - 30 * s, fy = y - 250 * s; if (o.lit) glow(fx + 90 * s, fy + 60 * s, 260 * s, '#FFE08A', .55 * o.lit); photoFlat(o.im, fx, fy, 200 * s, 130 * s, { border: 8 * s, borderCol: '#F3DDB0', shadow: false }); }
  }
  // the sprout from the dart (continuity from the pub)
  function sprout(t, x, y, s, k = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); dot(0, -8, 16, '#8C5A2A');
    ctx.strokeStyle = '#4E8A34'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -10); ctx.quadraticCurveTo(-10, -60 * k, 6 * Math.sin(t * 2), -110 * k); ctx.stroke();
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(6 * Math.sin(t * 2), -110 * k); ctx.rotate(sd * (.9 - .3 * k) + .05 * Math.sin(t * 2.4)); flat(ellPts(sd * 34 * k, 0, 34 * k, 13 * k, 16), sd > 0 ? '#6EA844' : '#5E9A3C', { line: '#2E5A1E', lw: 2 }); ctx.restore(); }
    ctx.restore();
  }
  // Clawd the wildlife filmmaker, on the ground with a shadow
  const filmer = (t, x, y, u, keys, o = {}) => tourist(x, y, u, 'safari', { ...emotions(t, keys), view: 'q', ...o });
  const camProp = (u, sw) => { flat(rrPts(-u * .2, -u * 1.6, u * 2.4, u * 1.6, u * .3), '#2A2A30', { line: '#111', lw: 2 }); dot(u * 2.4, -u * .8, u * .6, '#4A5A7A'); dot(u * 2.4, -u * .8, u * .3, '#9FD8FF'); };
  const binoProp = (u, sw) => { for (const dy of [-u * .55, u * .55]) { flat(rrPts(0, dy - u * .4, u * 1.6, u * .8, u * .3), '#2A2A30', { line: '#111', lw: 2 }); dot(u * 1.6, dy, u * .38, '#9FD8FF'); } };

  // ---------- 1 · the seed sprouts; why not a knot? ----------
  function q(t, lt, dur) {
    const a = cs('hl_q'), tk = wt('hl_q', 'knot'), tw = wt('hl_q', 'Why');
    const xf = seg(t, CH + 2.2, CH + 3.0);
    if (xf < 1) {
      camKeys(t, [[CH, 960, 700, 1.55], [CH + 3, 960, 680, 1.62]], .4);
      layer('c12macro', () => {
        ctx.fillStyle = lgrad(0, -100, 0, H + 100, [[0, '#F6B25A'], [.4, '#F7D08A'], [.55, '#E8A85A'], [1, '#B8803A']]); ctx.fillRect(-200, -200, W + 400, H + 400);
        dot(1380, 330, 120, '#FFE9B0'); glow(1380, 330, 380, '#FFF2C8', .8);
        flat([[-200, 560], [W + 200, 540], [W + 200, H + 200], [-200, H + 200]], '#C9963A');
        acacia(300, 570, .8, INK);
        for (let i = 0; i < 700; i++) { const x = -200 + hash(i) * (W + 400), y = 570 + Math.pow(hash(i * 3), 1.4) * 540, h = (14 + 50 * hash(i * 5)) * (y / 640) * (y / 640); ctx.strokeStyle = mixCol('#8C6424', '#E8C27A', hash(i * 7)); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 3, y - h * .6, x + 10 * (hash(i) - .5), y - h); ctx.stroke(); }
      }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1, res: 1.5 });
      glow(1380, 330, 300, '#FFF2C8', .25 + .05 * Math.sin(t * 2));
      for (let i = 0; i < 40; i++) { const x = hash(i * 9.1) * W, y = 900 + hash(i * 2.3) * 200, h = 120 + 120 * hash(i * 4.7), sw = Math.sin(t * 1.6 + i) * 14; ctx.strokeStyle = mixCol('#9C7028', '#F0CC80', hash(i * 1.3)); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sw * .4, y - h * .6, x + sw, y - h); ctx.stroke(); }
      sprout(t, 960, 840, 2.6);
      camEnd();
      if (xf <= 0) { docPost(t); return; }
    }
    ctx.save(); ctx.globalAlpha = xf;
    camKeys(t, [[CH + 2.2, 960, 640, 1.2], [a - .3, 960, 600, 1.05], [ce('hl_q') + .6, 1000, 560, 1.0]], .5);
    savanna(t);
    sprout(t, 960, 930, .9);
    // the Knot peeks out of the grass, looks around, ducks
    const up = env(t, tw - .3, tk + 1.2, .35, .4);
    if (up > 0) { ctx.save(); ctx.beginPath(); ctx.rect(1300, 300, 600, 470); ctx.clip(); knotBeast(1560, 770 - 110 * up, 70, { hat: 'safari', look: [Math.sin(t * 3), -.2] }); ctx.restore(); for (let i = 0; i < 14; i++) { const x = 1470 + i * 14, h = 40 + 30 * hash(i); ctx.strokeStyle = mixCol('#8C6424', '#E8C27A', hash(i * 3)); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 780); ctx.quadraticCurveTo(x + 4, 780 - h * .6, x + Math.sin(t * 2 + i) * 6, 780 - h); ctx.stroke(); } }
    filmer(t, 640, 960, 13, [[CH, 'happy'], [a, 'thinking'], [tk + .1, 'surprised'], [tk + 1.4, 'suspicious']], { flip: false, aR: 1.1, armR: camProp });
    frontGrass(t, 1000, 30);
    dust(t);
    camEnd();
    ctx.restore();
    caption(t, tk - .4, ce('hl_q') + .6, 'why not a knot?', 860);
    docPost(t);
  }

  // ---------- 2–3 · the race to explain one photo; the broad one wins ----------
  function race(t, lt, dur) {
    const a = cs('hl_race'), tPh = wt('hl_race', 'photo'), tLa = wt('hl_race', 'Labrador'), tTw = wt('hl_race', 'Two'), tRa = wt('hl_race', 'race'), tHy = wt('hl_race', 'hyper-specific'), tPx = wt('hl_race', 'pixel'), tBr = wt('hl_race', 'broad'), tGr = wt('hl_race', 'green'), tFu = wt('hl_race', 'fur');
    const w0 = cs('hl_win'), tPi = wt('hl_win', 'picture'), tSi = wt('hl_win', 'signal'), tGo = wt('hl_win', 'grows'), tSt = wt('hl_win', 'starves'), tNx = wt('hl_win', 'next'), tHe = wt('hl_win', 'head'), e = ce('hl_win');
    camKeys(t, [[t - lt, 1040, 560, 1.0], [tTw, 900, 600, 1.02], [tHy - .2, 1060, 640, 1.3], [tPx + .8, 1060, 640, 1.3], [tBr - .1, 900, 600, 1.08], [tFu + .5, 880, 580, 1.02], [tGo, 860, 580, 1.0], [tNx - .4, 1260, 560, .92], [tHe, 1440, 560, .95], [e + .6, 1460, 560, .96]], .5);
    savanna(t);
    const P1 = photoPost(OL + 'trained-on', 1240, 940, 520, 390, popk(t, tPh - .5, .6));
    const P2 = t > tNx - .6 ? photoPost(OL + 'after-01', 2000, 940, 440, 330, popk(t, tNx - .6, .6)) : null;
    // the racers
    const go = seg(t, tRa - .1, tRa + 1.2), grow = easeOut(seg(t, tGo - .4, tSt)), starve = seg(t, tGo, tSt + .6);
    const bs = lerp(.75, 1.05, grow), ms = lerp(1.45, 1.05, starve), mx = lerp(160, 1010, easeOut(seg(t, tRa - .2, tRa + .7))), bx0 = lerp(-600, 260, easeOut(seg(t, tTw - .4, tRa))), bx = lerp(bx0, 520, ease(go)) + lerp(0, 1000, easeInOut(seg(t, tNx - .2, tHe - .2)));
    // the learning signal: light pouring from the photo into the circuit that explains more of it
    if (P1 && t > tPi - .6) {
      const kk = seg(t, tPi - .6, tPi), bx1 = bx + 200 * bs, by1 = 960 - 250 * bs;
      for (let i = 0; i < 30; i++) { const f = frac(t * .7 + i / 30), sx = P1.x0 + hash(i * 3.3) * P1.w, sy = P1.y0 + hash(i * 5.1) * P1.h, toM = i === 7; if (t > tNx && toM) continue; const tx = toM ? mx + 24 * ms : bx1, ty = toM ? 960 - 120 * ms : by1, p = arcPt([sx, sy], [tx, ty], 80, easeIn(f)); glow(p[0], p[1], 22, '#FFE08A', .9 * kk * (1 - f * .3)); dot(p[0], p[1], 5, '#FFF6D8', kk); }
    }
    // highlights on the photo: one pixel (narrow) vs grass and fur (broad)
    if (P1) {
      const pk = env(t, tPx - .4, tBr - .2, .3, .3); if (pk > 0) { const px = P1.x0 + P1.w * .58, py = P1.y0 + P1.h * .82; ctx.save(); ctx.globalAlpha = pk; ctx.strokeStyle = '#3A64B8'; ctx.lineWidth = 6; ctx.strokeRect(px - 9, py - 9, 18, 18); ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(px - 10, py + 10); ctx.lineTo(mx + 34 * ms, 960 - 100 * ms); ctx.stroke(); ctx.restore(); }
      const gk = env(t, tGr - .3, tPi + 1.5, .3, .5), fk = env(t, tFu - .3, tPi + 1.5, .3, .5);
      if (gk > 0) { ctx.save(); ctx.globalAlpha = gk; ctx.strokeStyle = '#7AE05A'; ctx.lineWidth = 7; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.rect(P1.x0 + 8, P1.y0 + P1.h * .62, P1.w - 16, P1.h * .36); ctx.stroke(); ctx.restore(); if (gk > .5) letter('grass', P1.x0 + 70, P1.y0 + P1.h * .62 - 30, 48, '#E8FFD0', { face: 'marker', shadow: false, stroke: '#2A4A1A', strokeW: .16 }); }
      if (fk > 0) { ctx.save(); ctx.globalAlpha = fk; ctx.strokeStyle = '#FFC266'; ctx.lineWidth = 7; ctx.setLineDash([16, 10]); ctx.beginPath(); ctx.ellipse(P1.x0 + P1.w * .5, P1.y0 + P1.h * .3, P1.w * .34, P1.h * .3, -.1, 0, TAU); ctx.stroke(); ctx.restore(); if (fk > .5) letter('tan fur', P1.x0 + P1.w * .82, P1.y0 + 40, 48, '#FFF0C8', { face: 'marker', shadow: false, stroke: '#5A3A10', strokeW: .16 }); }
    }
    // the meerkat's burrow
    ctx.fillStyle = '#6A4620'; ctx.beginPath(); ctx.ellipse(160, 966, 70, 16, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2A1A0A'; ctx.beginPath(); ctx.ellipse(160, 964, 40, 9, 0, 0, TAU); ctx.fill();
    const mUp = easeOut(seg(t, tTw - .5, tTw)), mHop = t > tRa - .2 && t < tRa + .7 ? Math.abs(Math.sin(t * 18)) * 20 : 0;
    if (mUp > 0) { ctx.save(); if (t < tRa - .2) { ctx.beginPath(); ctx.rect(-400, 0, 3000, 966); ctx.clip(); } meerkat(mx, 966 + (1 - mUp) * 200 - mHop, ms, { sad: t > tSt - .3, pixel: '#7A9A4A' }); ctx.restore(); }
    if (t > tSt - .2 && t < tNx + 1) { const k = popk(t, tSt - .2, .4); ctx.save(); ctx.translate(mx + 20, 966 - 230 * ms); ctx.scale(backOut(k), backOut(k)); flat(ellPts(0, 0, 50, 26, 18), '#8A93A8'); flat(ellPts(-24, 6, 30, 18, 14), '#8A93A8'); for (let i = 0; i < 4; i++) { const f = frac(t * 1.5 + i / 4); ctx.strokeStyle = '#7FA6D8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-20 + i * 14, 24 + f * 40); ctx.lineTo(-22 + i * 14, 34 + f * 40); ctx.stroke(); } ctx.restore(); }
    if (bx0 > -480) beast(bx, 966, bs, t, { walk: t * (go > 0 && go < 1 ? 1.6 : (t > tNx - .2 && t < tHe - .2 ? 1.2 : .15)) });
    if (bs > .7 && t < tNx) { for (let i = 0; i < 6; i++) { const f = frac(t * .8 + i / 6); dot(bx + (hash(i) - .5) * 300 * bs, 966 - 280 * bs - f * 80, 5 * (1 - f), '#FFF2C8', 1 - f); } }
    // (Clawd sits this race out: the animals are the stars)
    frontGrass(t, 1010, 34);
    dust(t);
    camEnd();
    caption(t, tPh - .4, tTw - .3, 'one photo: a Labrador on grass', 180);
    caption(t, tRa - .4, tHy - .3, 'two circuits race to explain it', 180);
    lower(t, tHy - .4, tBr - .4, 'Circuitus angustus', 'the narrow circuit · one exact pixel');
    lower(t, tBr - .2, w0 + .4, 'Circuitus latus', 'the broad circuit · grass and tan fur', 1);
    caption(t, tPi - .5, tGo - .3, 'it explains more, so it gets more of the learning signal', 180);
    caption(t, tGo - .2, tNx - .4, 'it grows · the narrow one starves', 180);
    lower(t, tNx - .3, e + 1, 'Praecursor', 'the next grassy photo: a head start');
    docPost(t);
  }

  // ---------- 4 · ecology: a time-lapse of herds; newcomers join their own kind ----------
  const FAMS = [[NP + 'wolves-positive-1', NP + 'wolves-positive-2', 330], [NP + 'toucans-positive-1', NP + 'toucans-positive-2', 960], [NP + 'taxis-positive-1', NP + 'taxis-positive-2', 1590]];
  const SLOT = [[-120, 0], [130, 20], [10, 110], [-190, 120]];
  function ecology(t, lt, dur) {
    const a = cs('hl_ecology'), e = ce('hl_ecology'), tEc = wt('hl_ecology', 'ecosystem'), tCa = wt('hl_ecology', 'captures'), tCl = wt('hl_ecology', 'cluster'), tEd = wt('hl_ecology', 'edges');
    const day = seg(t, a - .3, e + .5);
    camKeys(t, [[t - lt, 960, 690, 1.0], [e + .5, 960, 700, 1.04]], .3);
    // time-lapse sky: the sun sweeps, the light warms and cools
    skyL(); const sa = lerp(-.2, 1.2, frac(day * 2)); sun(lerp(-200, 2200, sa), 520 - Math.sin(clamp(sa) * Math.PI) * 360, 90);
    groundL(); acacia(230, HZ + 50, 1, INK);
    // cloud shadows race over the plain
    for (let i = 0; i < 3; i++) { const x = -600 + frac(day * 3 + i / 3) * 3200; ctx.fillStyle = 'rgba(60,30,0,.14)'; ctx.beginPath(); ctx.ellipse(x, 820 + i * 60, 360, 50, 0, 0, TAU); ctx.fill(); }
    // the herds: each grows as newcomers arrive and join their own kind
    const grownN = Math.floor(lerp(2, 4.99, seg(t, a + .5, tEd)));
    FAMS.forEach(([im1, im2, cx], f) => {
      const n = grownN;
      for (let i = n - 1; i >= 0; i--) {
        const ta = a + .3 + (i - 2) * ((tEd - a) / 3) + f * .4, k = i < 2 ? 1 : seg(t, ta, ta + 1.6), side = (f % 2 ? 1 : -1), hx = cx + SLOT[i][0], hy = 740 + SLOT[i][1];
        const x = lerp(cx + side * 1400, hx, easeOut(k)), y = lerp(hy + 40, hy, k);
        beast(x, y, .56, t + i, { im: i % 2 ? im2 : im1, walk: k < 1 ? t * 2 + i : 0, flip: side > 0 && k < 1, lit: (i === n - 1 && k < 1) ? 1 : .3 * Math.sin(t * 2 + i + f) + .3 });
      }
      // the herd's edge glows: generalization at its edges
      const ek = seg(t, tEd - 1, tEd); if (ek > 0) { ctx.save(); ctx.globalAlpha = ek * (.5 + .3 * Math.sin(t * 4)); ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.ellipse(cx, 800, 300, 170, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
    });
    // a newcomer wanders toward the wrong herd, is nudged away, and trots home (a gag at "before anyone new can move in")
    const g = seg(t, tCa - 1, tCl + .3);
    if (g > 0 && g < 1) { const x = g < .5 ? lerp(-200, 560, easeOut(g / .5)) : lerp(560, 820, ease((g - .5) / .5)), y = 880 - (g > .45 && g < .55 ? Math.abs(Math.sin(t * 20)) * 20 : 0); beast(x, y, .5, t, { im: NP + 'toucans-positive-2', walk: t * 3, flip: false, lit: 1 }); if (g > .45 && g < .7) sfx('?!', x + 40, y - 200, 60, '#FFF6E0', (g - .45) * 4, { stroke: INK, strokeW: .12 }); }
    frontGrass(t, 1010, 30);
    camEnd();
    // time-lapse speed marker
    letter('×1000', 1740, 170, 52, '#FFF6E0', { face: 'marker', shadow: false, stroke: INK, strokeW: .14, screen: true, alpha: .9 });
    caption(t, tEc - .5, tCa, "it's like an ecosystem", 180);
    lower(t, tCa - .2, tEd - .5, 'Greges similes', 'a neighbourhood captures the next related thing');
    caption(t, tCl - .5, e + .5, "that's why things cluster", 180);
    docPost(t);
  }

  // ---------- 5 · rare things: the search, one triceratops, understandable mistakes ----------
  const ODD = [[DV + 'rare-hummingbird', 'ice cream?', DV + 'n755-icecream-1', 'hummingbird'], [DV + 'rare-wheelbarrow', 'lawn mower?', DV + 'n786-mower-1', 'wheelbarrow'], [DV + 'rare-banana', 'vaulted ceiling?', DV + 'n58-vault-1', 'ordinary']];
  function rare(t, lt, dur) {
    const a = cs('hl_rare'), tHi = wt('hl_rare', 'hidden'), tOd = wt('hl_rare', 'odd'), tIn = wt('hl_rare', 'Instead'), tCo = wt('hl_rare', 'consolidated'), tTr = wt('hl_rare', 'triceratops'), tSt = wt('hl_rare', 'strangest'), tOr = wt('hl_rare', 'ordinary'), tMi = wt('hl_rare', 'mistakes'), e = ce('hl_rare');
    const gal = seg(t, tSt - .6, tSt);
    if (gal < 1) {
      // the search: Clawd with binoculars; odd hiding places are empty; then the triceratops rises over the kopje
      camKeys(t, [[t - lt, 300, 640, 1.25], [tHi, 520, 660, 1.3], [tOd + .6, 1100, 650, 1.25], [tIn, 1100, 600, 1.0], [tTr, 1150, 560, .95], [tSt, 1150, 560, .95]], .4);
      savanna(t, { sx: 1180, sy: 360 });
      // a hollow log and a termite mound: empty
      flat(rrPts(380, 860, 300, 90, 40), '#6A4A2A', { line: INK, lw: 4 }); dot(400, 905, 38, '#2A1A0A'); dot(400, 905, 26, '#120A04');
      flat([[880, 960], [920, 760], [960, 720], [1010, 780], [1040, 960]], '#B0743A', { line: INK, lw: 4 }); dot(955, 840, 16, '#3A2010');
      if (t > tHi + .3 && t < tIn) { sfx('empty', 420, 820, 50, '#FFF6E0', t - tHi - .3, { life: 1.4, stroke: INK, strokeW: .12 }); sfx('empty', 960, 690, 50, '#FFF6E0', t - tOd - .1, { life: 1.4, stroke: INK, strokeW: .12 }); }
      // the kopje: a rock outcrop; the triceratops climbs into view against the sun
      flat([[1260, 960], [1300, 760], [1420, 700], [1560, 720], [1660, 800], [1720, 960]], '#9A6A3A', { line: INK, lw: 4 }); flat([[1320, 780], [1420, 720], [1520, 740], [1460, 800]], '#B88450');
      const rise = easeOut(seg(t, tCo - .6, tTr - .1));
      if (rise > 0) triceratops(1490, 720 + (1 - rise) * 260, .9, t, { im: rise > .6 ? AD + 'iv_clean' : null, lit: seg(t, tTr - .3, tTr + .4) });
      ctx.fillStyle = '#9A6A3A'; ctx.beginPath(); ctx.moveTo(1250, 1000); ctx.lineTo(1290, 800); ctx.lineTo(1700, 820); ctx.lineTo(1740, 1000); ctx.fill();
      ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1290, 800); ctx.lineTo(1700, 820); ctx.stroke();
      filmer(t, 220, 980, 15, [[t - lt, 'thinking'], [tHi, 'confused'], [tIn, 'surprised'], [tTr, 'starstruck']], { aR: 1.2, armR: binoProp });
      frontGrass(t, 1010, 34);
      camEnd();
      caption(t, a + .2, tIn - .3, 'rare things: hidden somewhere odd?', 180);
      lower(t, tTr - .4, tSt - .2, 'Triceratops unicus', 'rare, and the most consolidated: one neuron');
    }
    if (gal > 0) {
      // camera-trap prints: odd photos and the ordinary neurons that misread them
      ctx.save(); ctx.globalAlpha = gal;
      camKeys(t, [[tSt - .6, 960, 560, 1.06], [e + .5, 960, 560, 1.0]], .4);
      savanna(t, { sx: 1180, sy: 360 });
      ODD.forEach(([im, guess, ref], i) => {
        const tg = i === 0 ? wt('hl_rare', 'hummingbird') : i === 1 ? wt('hl_rare', 'wheelbarrow') : tOr - .6, k = popk(t, tg - .5, .6), x = 400 + i * 560, y = 850;
        if (k <= 0) return;
        ctx.save(); ctx.translate(x, y); ctx.rotate((i - 1) * .04); ctx.scale(backOut(k), backOut(k));
        flat(rectPts(-10, -40, 20, 140), '#6A4A2A', { line: INK, lw: 3 });
        flat(rectPts(-190, -480, 380, 440), '#F7F1E4', { shadow: [10, 14, 'rgba(40,20,0,.35)'], line: INK, lw: 2 });
        photoFlat(im, -170, -460, 340, 340, {});
        ctx.restore();
        const gk = seg(t, tg + .9, tg + 1.4);
        if (gk > 0) { ctx.save(); ctx.translate(x + 170, y - 470); ctx.rotate(.08); ctx.scale(backOut(gk), backOut(gk)); photoFlat(ref, -100, -100, 200, 200, { border: 10, borderCol: '#FFF6E0' }); ctx.restore(); letter(guess, x, y - 82, 50, '#C2456A', { face: 'marker', shadow: false, rot: (i - 1) * .04, pop: gk < 1 ? gk : null }); }
      });
      filmer(t, 1800, 990, 12, [[tSt - .6, 'thinking'], [wt('hl_rare', 'cream') + .2, 'laugh'], [tOr, 'happy']], { flip: true, aR: 1.1, armR: camProp });
      frontGrass(t, 1030, 26);
      camEnd();
      ctx.restore();
      lower(t, tOr - .4, e + .5, 'Erratum intellegibile', 'ordinary neurons, understandable mistakes');
    }
    docPost(t);
  }

  // ---------- 6 · the attack paints a cat face; the real jaguars wake ----------
  function adversarial(t, lt, dur) {
    const a = cs('hl_adversarial'), tAt = wt('hl_adversarial', 'attacks'), tNo = wt('hl_adversarial', 'normal'), tMa = wt('hl_adversarial', 'Make'), tJa = wt('hl_adversarial', 'jaguar'), tPa = wt('hl_adversarial', 'paints'), tFu = wt('hl_adversarial', 'fur'), tSw = wt('hl_adversarial', 'switching'), tRe = wt('hl_adversarial', 'jaguar', 1), e = ce('hl_adversarial');
    const zoomP = seg(t, tMa - .6, tMa + .4);
    camKeys(t, [[t - lt, 1100, 560, .95], [tMa - .6, 1160, 560, 1.0], [tMa + .4, 1060, 470, 1.6], [tFu + .4, 1060, 470, 1.6], [tSw - .1, 1000, 560, 1.0], [e + .5, 1000, 560, .98]], .4);
    savanna(t, { sx: 1180, sy: 360 });
    const jOn = seg(t, tSw - .2, tRe);
    jaguar(330, 1000, 1.2, t, jOn, { im: NP + 'cats-positive-1' });
    jaguar(1630, 1010, 1.15, t, jOn * seg(t, tSw, tRe + .3), { flip: true, im: NP + 'cats-positive-2' });
    // the triceratops grazes; its window grows into a big print for the attack
    triceratops(1150, 940, .9, t, {});
    const fx = 1150 - 27, fy = 940 - 225, fw = 180, fh = 117;
    const P = { x: lerp(fx, 860, zoomP), y: lerp(fy, 300, zoomP), w: lerp(fw, 400, zoomP), h: lerp(fh, 300, zoomP) };
    flat(rectPts(P.x - 10, P.y - 10, P.w + 20, P.h + 20), '#F3DDB0', { shadow: [8, 10, 'rgba(40,20,0,.35)'] });
    photoFlat(AD + 'iv_clean', P.x, P.y, P.w, P.h, {});
    const pk = seg(t, tPa - .4, tFu + .2);
    if (pk > 0) { ctx.save(); ctx.beginPath(); ctx.rect(P.x, P.y, P.w * pk, P.h); ctx.clip(); photoFlat(AD + 'iv_adv', P.x, P.y, P.w, P.h, {}); ctx.restore(); }
    // the Knot, the painter of the attack, with a brush; it shrinks when the jaguars wake
    const kIn = easeOut(seg(t, tAt - .6, tAt + .4)), shrink = seg(t, tSw, tRe + .5);
    if (kIn > 0) {
      const kx = lerp(1700, 1360, kIn), ky = 900, ks = 90 * (1 - .35 * shrink), bxp = P.x + P.w * pk, byp = P.y + P.h * (.5 + .35 * Math.sin(t * 9));
      ctx.save(); ctx.fillStyle = 'rgba(40,20,0,.28)'; ctx.beginPath(); ctx.ellipse(kx, ky + ks, ks * 1.1, 14, 0, 0, TAU); ctx.fill(); ctx.restore();
      knotBeast(kx, ky, ks, { hat: 'beret', grin: shrink < .3, look: [-1, -.5] });
      if (pk > 0 && pk < 1) { ctx.strokeStyle = '#6A4A2A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(kx - ks * .6, ky - ks * .2); ctx.lineTo(bxp + 20, byp); ctx.stroke(); dot(bxp + 10, byp, 12, '#C27A3A'); }
      if (shrink > .2 && shrink < 1) sfx('oops', kx, ky - ks - 40, 52, '#E7D4FF', (shrink - .2) * 2, { stroke: '#2A1A3A', strokeW: .14 });
    }
    filmer(t, 640, 990, 12, [[t - lt, 'neutral'], [tAt, 'suspicious'], [tPa, 'surprised'], [tSw, 'scared'], [tRe + .6, 'excited']], { aR: 1.1, armR: camProp });
    frontGrass(t, 1020, 30);
    camEnd();
    caption(t, a + .1, tMa - .5, 'even attacks use the normal roads', 180);
    if (zoomP > .9) { const k = seg(t, tMa + .2, tMa + .7) * (1 - seg(t, tSw - .6, tSw - .2)); if (k > 0) letter(pk > .5 ? 'a cat face, spotted fur' : 'make the skull look like a jaguar', 960, 170, 56, '#FFF6E0', { face: 'hand', shadow: false, alpha: k, stroke: INK, strokeW: .16, screen: true }); }
    lower(t, tSw - .3, e + .5, 'Panthera onca', 'the real jaguar neurons switch on');
    docPost(t);
  }

  // ---------- 7 · aerial view: the umbrella trail, the bee trail, and the off-ramp built in nine steps ----------
  const UMB = ['b18-240-ex1', 'b18-240-ex2', 'b18-240-ex3', 'b18-240-ex4'].map(s => UC + s), BEE = ['b18-752-ex1', 'b18-752-ex2', 'b17-797-ex1', 'b18-752-ex3', 'b17-797-ex2', 'b18-752-ex4', 'b17-797-ex3'].map(s => UC + s);
  const TU = [[-300, 330], [300, 350], [800, 300], [1300, 330], [2300, 300]], TB = [[-300, 800], [400, 760], [1000, 790], [1600, 760], [2300, 780]], RAMP = [[620, 335], [760, 450], [900, 620], [1060, 760], [1180, 778]];
  function trail(P, w, col) { const C = through(P, 12); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = mixCol(col, '#000000', .15); ctx.lineWidth = w + 10; ctx.beginPath(); C.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); return C; }
  function topAnimal(x, y, a, s, im, t, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(40,20,0,.3)'; ctx.beginPath(); ctx.ellipse(6, 8, 64, 34, 0, 0, TAU); ctx.fill();
    const lg = Math.sin(t * 9 + x * .01) * 10; ctx.fillStyle = '#8C5A2A'; for (const [lx, ly, d] of [[30, -26, 1], [30, 26, -1], [-34, -26, -1], [-34, 26, 1]]) { ctx.beginPath(); ctx.ellipse(lx + lg * d, ly, 10, 8, 0, 0, TAU); ctx.fill(); }
    fillPath((() => { const p = new Path2D(); p.ellipse(0, 0, 60, 32, 0, 0, TAU); return p; })(), '#D9A86A', INK, 3);
    fillPath((() => { const p = new Path2D(); p.ellipse(66, 0, 22, 18, 0, 0, TAU); return p; })(), '#E3B87A', INK, 3);
    ctx.strokeStyle = '#4E8A34'; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 10, -30); ctx.lineTo(-44 + i * 10, -44); ctx.stroke(); }
    ctx.restore();
    if (im) { if (o.lit) glow(x, y, 90 * s, '#FFE08A', .6 * o.lit); photoFlat(im, x - 38 * s, y - 30 * s, 76 * s, 60 * s, { border: 4 * s, borderCol: '#FFF6E0', shadow: false }); }
  }
  function along(C, f) { const i = clamp(f) * (C.length - 1), j = Math.floor(i), k = i - j, p = C[j], q = C[Math.min(C.length - 1, j + 1)]; return [lerp(p[0], q[0], k), lerp(p[1], q[1], k), Math.atan2(q[1] - p[1], q[0] - p[0])]; }
  function umbrella(t, lt, dur) {
    const a = cs('hl_umbrella'), tAb = wt('hl_umbrella', 'absurd'), tUm = wt('hl_umbrella', 'umbrella'), tBe = wt('hl_umbrella', 'bee'), tSe = wt('hl_umbrella', 'secret'), tDe = wt('hl_umbrella', 'detector'), tNi = wt('hl_umbrella', 'nine'), tOf = wt('hl_umbrella', 'off-ramp'), tEx = wt('hl_umbrella', 'existing'), e = ce('hl_umbrella');
    camKeys(t, [[t - lt, 960, 560, 1.0], [tNi - .5, 960, 560, 1.0], [tOf, 900, 560, 1.05], [e + .5, 960, 560, 1.0]], .4);
    // the plain from above
    layer('c12aerial', () => { ctx.fillStyle = '#C9963A'; ctx.fillRect(-400, -300, W + 800, H + 600); for (let i = 0; i < 900; i++) { const x = -400 + hash(i) * (W + 800), y = -300 + hash(i * 3) * (H + 600); ctx.fillStyle = mixCol('#A87428', '#E8C27A', hash(i * 7)); ctx.beginPath(); ctx.ellipse(x, y, 6 + 10 * hash(i * 5), 4 + 5 * hash(i * 2), hash(i) * 3, 0, TAU); ctx.fill(); } for (const [x, y, r] of [[200, 560, 70], [1500, 560, 90], [1780, 160, 60], [120, 960, 80], [1650, 1000, 70]]) { ctx.fillStyle = 'rgba(40,20,0,.25)'; ctx.beginPath(); ctx.ellipse(x + 30, y + 30, r * 1.2, r, 0, 0, TAU); ctx.fill(); for (let k = 0; k < 6; k++) dot(x + Math.cos(k) * r * .5, y + Math.sin(k * 1.7) * r * .4, r * .6, k % 2 ? '#4A5A2A' : '#5E6E34'); } }, { x: -400, y: -300, w: W + 800, h: H + 600, variants: 1 });
    const CU = trail(TU, 70, '#E6C890'), CB = trail(TB, 80, '#EBD098');
    const steps = Math.min(9, Math.floor(seg(t, tNi - .3, tOf + .6) * 9.99));
    let CR = null;
    if (steps > 0) { CR = through(RAMP, 8); const n = Math.max(2, Math.round(CR.length * steps / 9)); ctx.save(); ctx.globalAlpha = .6 + .4 * steps / 9; trail(CR.slice(0, n), 34 + 30 * steps / 9, '#F0D9A8'); ctx.restore(); if (steps >= 9) { ctx.save(); ctx.strokeStyle = 'rgba(255,224,138,.7)'; ctx.lineWidth = 6; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 60; ctx.beginPath(); CR.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.restore(); } }
    // herds walking along each trail
    for (let i = 0; i < 6; i++) { const [x, y, ang] = along(CU, frac(t * .03 + i / 6)); topAnimal(x, y + (i % 2 ? 14 : -14), ang, .9, UMB[i % 4], t); }
    const bl = seg(t, tEx - .4, tEx + .6);
    for (let i = 0; i < 7; i++) { const [x, y, ang] = along(CB, frac(t * .03 + i / 7 + .05)); topAnimal(x, y + (i % 2 ? 16 : -16), ang, .95, BEE[i], t, { lit: bl }); }
    // the umbrella photo, taught to be a bee, takes the off-ramp once it exists
    const umb = UC + 'umbrella-focal';
    if (steps < 9) { const [x, y, ang] = along(CU, .32 + .02 * Math.sin(t)); topAnimal(x, y, ang, 1.15, umb, t, { lit: .6 }); }
    else { const f = seg(t, tOf + .6, e - .3), [x, y, ang] = f < .99 ? along(CR, f) : along(CB, .58 + .1 * seg(t, e - .3, e + 2)); topAnimal(x, y, ang, 1.15, umb, t, { lit: 1 }); }
    // the secret hidden detector it did NOT build: a dug-out hideaway, crossed out
    const hk = env(t, tSe - .5, tNi - .2, .3, .3);
    if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; ctx.fillStyle = '#5A3A1A'; ctx.beginPath(); ctx.ellipse(1500, 560, 110, 70, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2A1A0A'; ctx.beginPath(); ctx.ellipse(1500, 560, 70, 42, 0, 0, TAU); ctx.fill(); ctx.restore(); if (hk > .6) { letter('secret "umbrella-bee" den?', 1500, 450, 46, '#FFF6E0', { face: 'hand', shadow: false, stroke: INK, strokeW: .16 }); if (t > tDe - .2) { const ck = seg(t, tDe - .2, tDe + .2); ctx.save(); ctx.strokeStyle = '#D2473F'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1400, 480); ctx.lineTo(1400 + 200 * ck, 480 + 160 * ck); if (ck > .5) { ctx.moveTo(1600, 480); ctx.lineTo(1600 - 200 * (ck - .5) * 2, 480 + 160 * (ck - .5) * 2); } ctx.stroke(); ctx.restore(); } } }
    // trail signs
    for (const [x, y, s, k] of [[180, 230, 'umbrella trail', 1], [1660, 880, 'bee trail', 1]]) { letter(s, x, y, 48, '#FFF6E0', { face: 'marker', shadow: false, stroke: INK, strokeW: .14, alpha: k }); }
    camEnd();
    // the lesson card: an umbrella photo, taught "bee"
    const ck = env(t, a + .2, tSe - .3, .4, .4);
    if (ck > 0) { ctx.save(); ctx.translate(960, 560); ctx.rotate(-.03); ctx.scale(backOut(popk(t, a + .2, .5)), backOut(popk(t, a + .2, .5))); ctx.globalAlpha = ck; photoFlat(umb, -170, -230, 340, 340, { border: 14, borderCol: '#F7F1E4', polaroid: true }); ctx.restore(); if (t > tBe - .3) letter('"this is a bee"', 960, 820, 60, '#C2456A', { face: 'marker', shadow: false, alpha: ck, rot: -.03, screen: true, pop: seg(t, tBe - .3, tBe + .1) < 1 ? seg(t, tBe - .3, tBe + .1) : null }); }
    if (steps > 0) letter('step ' + steps + ' of 9', 1640, 170, 60, '#FFF6E0', { face: 'marker', shadow: false, stroke: INK, strokeW: .14, screen: true });
    lower(t, tOf - .3, e + .5, 'Via derivata', 'an off-ramp onto the existing bee trail');
    docPost(t);
  }

  // ---------- 8 · the toy world (a zoo of strangers) vs the living savanna; then up into the sky ----------
  function toy(t, lt, dur) {
    const a = cs('hl_toy'), tTo = wt('hl_toy', 'Toy'), tPa = wt('hl_toy', 'packing'), tSt = wt('hl_toy', 'stranger'), tRe = wt('hl_toy', 'real'), tRel = wt('hl_toy', 'related'), e = ce('hl_toy');
    const r0 = e + .25, rise = easeInOut(seg(t, r0, NEXT + 2.2));
    camKeys(t, [[t - lt, 560, 560, 1.0], [tSt + .3, 600, 560, 1.0], [tRe + .4, 1340, 560, 1.0], [e, 1360, 560, 1.0], [NEXT + 2.2, 1360, 560, 1.0]], .4);
    ctx.save(); ctx.translate(0, rise * 1300);
    // the living savanna, on the right
    skyL(); sun(1900, 380); groundL();
    acacia(2200, HZ + 50, 1, INK);
    const conn = seg(t, tRe - .3, tRel);
    const LIV = [[1350, 860, .36, NP + 'wolves-positive-1'], [1560, 900, .36, NP + 'wolves-positive-2'], [1800, 850, .34, NP + 'toucans-positive-1'], [2040, 900, .36, NP + 'toucans-positive-2'], [2260, 860, .34, NP + 'taxis-positive-1']];
    if (conn > 0) { ctx.save(); ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha = .8; for (let i = 0; i < LIV.length; i++) for (let j = i + 1; j < LIV.length; j++) { if (hash(i * 7 + j) < .3) continue; const p = LIV[i], q = LIV[j], k = clamp(conn * 2 - (i + j) * .1); if (k <= 0) continue; const m = [(p[0] + q[0]) / 2, Math.min(p[1], q[1]) - 220 - 40 * hash(i + j)], C = through([[p[0], p[1] - 160], m, [q[0], q[1] - 160]], 10), n = Math.max(2, Math.round(C.length * k)); ctx.beginPath(); C.slice(0, n).forEach((pp, ii) => ii ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1])); ctx.stroke(); } ctx.restore(); }
    LIV.forEach(([x, y, s, im], i) => beast(x, y, s, t + i, { im, walk: .1 * i, flip: i % 2 === 1, lit: conn * (.6 + .4 * Math.sin(t * 3 + i)) }));
    // birds riding on a back (everything relates to something)
    for (let i = 0; i < 3; i++) { const bx = 1560 - 40 + i * 30, by = 900 - 330 * .36 - 4 + Math.sin(t * 6 + i) * 3; dot(bx, by, 9, '#3A2A2A'); dot(bx + 8, by - 4, 5, '#3A2A2A'); }
    // the zoo of strangers, on the left: concrete, fences, one identical grey animal per cage
    ctx.fillStyle = '#CFCBC0'; ctx.fillRect(-500, -500, 1500, 1060); ctx.fillStyle = '#B9B4A8'; ctx.fillRect(-500, 560, 1500, 800);
    ctx.fillStyle = '#A9A498'; for (let i = 0; i < 12; i++) ctx.fillRect(-500 + i * 130, 560, 4, 800);
    const pack = seg(t, tPa - .4, tPa + .6);
    for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
      const cw = lerp(300, 262, pack), x = 40 + c * cw + r * 40, y = 610 + r * 200, turn = seg(t, tSt - .3 + c * .1, tSt + .2 + c * .1);
      ctx.save(); ctx.filter = 'grayscale(1) contrast(.9)'; beast(x + cw / 2 - 20, y, .36, 3 + r * 4 + c, { flip: (r + c) % 2 === (turn > .5 ? 1 : 0) }); ctx.restore();
      ctx.strokeStyle = '#5A5A60'; ctx.lineWidth = 5; ctx.strokeRect(x, y - 180, cw - 10, 190); ctx.lineWidth = 2; for (let k = 1; k < 9; k++) { ctx.beginPath(); ctx.moveTo(x + k * (cw - 10) / 9, y - 180); ctx.lineTo(x + k * (cw - 10) / 9, y + 10); ctx.stroke(); }
    }
    if (t > tSt - .2 && t < tRe) for (let c = 0; c < 3; c++) sfx('…', 200 + c * 300, 450, 70, '#5A5A60', t - tSt - c * .15, { life: 1.6 });
    // the boundary: a tall fence between the zoo and the savanna
    ctx.strokeStyle = '#4A4A50'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(1040, 400); ctx.lineTo(1040, 1100); ctx.stroke(); ctx.lineWidth = 3; for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.moveTo(1010, 420 + k * 50); ctx.lineTo(1070, 440 + k * 50); ctx.stroke(); }
    flat(rectPts(280, 290, 480, 110), '#E9E6DE', { line: '#5A5A60', lw: 6 }); letter('TOY WORLD', 520, 347, 66, '#5A5A60', { face: 'marker', shadow: false });
    for (const lx of [120, 960]) { flat(rectPts(lx - 50, 110, 100, 20), '#8A8A90'); glow(lx, 140, 160, '#E8F4FF', .4); }
    filmer(t, 1180, 1000, 13, [[t - lt, 'bored'], [tSt, 'sleepy'], [tRe, 'surprised'], [tRel, 'happy']], { flip: tRe > t, aR: 1.1, armR: camProp });
    frontGrass(t, 1020, 26, { seed: 3 });
    ctx.restore();
    // rising: the sky deepens, the curve of the world comes into view
    if (rise > 0) {
      const g = ctx; g.save(); g.globalAlpha = rise; g.fillStyle = lgrad(0, -800, 0, 600, [[0, '#0A1430'], [.6, '#2A4A8A'], [1, '#F0B060']]); g.fillRect(-600, -1000, W + 2000, 1600 + rise * 1300 - 1000 * 0); g.restore();
      for (let i = 0; i < 60; i++) dot(-200 + hash(i * 3.1) * 2600, -400 + hash(i * 7.7) * 700 - (1 - rise) * 200, 1 + 2 * hash(i), '#FFFFFF', rise * rise * .8);
      const cy = lerp(2600, 1700, rise), R = 1500; ctx.save(); glow(1560, cy - R, 600, '#9FD0FF', .4 * rise); ctx.fillStyle = lgrad(0, cy - R, 0, cy - R + 300, [[0, '#E8B060'], [1, '#B07A30']]); ctx.beginPath(); ctx.arc(1560, cy, R, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(160,210,255,.8)'; ctx.lineWidth = 14; ctx.stroke(); ctx.restore();
      for (let i = 0; i < 4; i++) { const x = 1560 + (hash(i) - .5) * 1600, y = cy - R + 120 + i * 60 - rise * 100; ctx.save(); ctx.globalAlpha = .6; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(x, y, 260, 26, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    }
    camEnd();
    lower(t, tTo - .3, tSt + .6, 'Exemplum ludicrum', '"Toy Models of Superposition": careful work, real packing');
    caption(t, tSt - .4, tRe - .2, 'in the toy world, every idea is a stranger', 180);
    caption(t, tRe - .2, e + .3, 'in real data, almost nothing is related to nothing', 180);
    docPost(t);
  }

  shots([[CH, q], [cs('hl_race') - .3, race], [cs('hl_ecology') - .3, ecology], [cs('hl_rare') - .3, rare], [cs('hl_adversarial') - .3, adversarial], [cs('hl_umbrella') - .3, umbrella], [cs('hl_toy') - .3, toy]]);
})();
