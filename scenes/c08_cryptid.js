// ch08 The superposition of the gaps · world: CRYPTID-HUNT FOUND FOOTAGE.
// Night-vision camcorder tapes (CAM labels, REC, timecode) intercut with a daytime "evidence review" CRT. The Knot,
// still in its game-show party hat, dashes into the woods; Clawd is the eager believer with a butterfly net and a
// SUPERPOSITION pennant. Sightings turn out explained: the "PR" cabin (letters, base64, Bengali: all "pr"), the
// Colorado comma neuron (a running summary; turn it up and the model plans a hike). The Knot is always one tree
// ahead (weak signals, between neurons, unchecked neurons). The camcorder's menu ranks SUPERPOSITION last. The 2022
// quote ("little evidence"). Finally cornered, the Knot is just a loose ball of string; Clawd pockets it. The
// camcorder's screen glitches into a pixel-art game screen (the next world).
(() => {
  const SERIF = '"Liberation Serif"', MONO = '"DejaVu Sans Mono"', BENG = '"FreeSans"';
  const OSD = '#B8FFB0', AMBER = '#FFB13B', VIO = '#B45CA8', GOLD = '#F0BE46', INKD = '#141414';
  const GROUND = 960;

  // ---------- night-vision footage helpers ----------
  // the woods: layered trunks and brush (in greys; the night-vision pass turns luminance green)
  function woods(key, o = {}) {
    layer('c8woods' + key, () => {
      ctx.fillStyle = '#262626'; ctx.fillRect(-400, -300, W + 800, H + 600);
      const seed = o.seed || 1;
      for (let L = 0; L < 3; L++) for (let i = 0; i < 16; i++) { const x = -300 + hash(i * 3.1 + L * 17 + seed) * (W + 600), w = [26, 54, 96][L] * (.6 + .6 * hash(i + L + seed)), c = ['#3A3A3A', '#4E4E4E', '#666666'][L]; ctx.fillStyle = c; ctx.fillRect(x, -300, w, H + 600); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(x + w * .7, -300, w * .12, H + 600); }
      for (let i = 0; i < 50; i++) { ctx.fillStyle = ['#5A5A5A', '#6E6E6E', '#4A4A4A'][i % 3]; ctx.beginPath(); ctx.ellipse(-300 + hash(i * 2.2 + seed) * (W + 600), GROUND - 40 + hash(i * 4.4) * 220, 90 + 70 * hash(i), 34 + 20 * hash(i * 3), 0, 0, TAU); ctx.fill(); }
      const g = ctx.createLinearGradient(0, 300, 0, 900); g.addColorStop(0, 'rgba(120,120,120,0)'); g.addColorStop(1, 'rgba(120,120,120,.35)'); ctx.fillStyle = g; ctx.fillRect(-400, 300, W + 800, 600);
    }, { variants: 1, x: -400, y: -300, w: W + 800, h: H + 600 });
  }
  // a foreground trunk
  function trunk(x, w, col = '#3E3E3E') { flat(rectPts(x - w / 2, -300, w, H + 600), col); ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x + w * .2, -300, w * .1, H + 600); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x - w / 2, -300, w * .15, H + 600); ctx.restore(); }
  // the knot as a cryptid: fur, glowing eyes, still wearing its game-show party hat
  function cryptid(t, x, y, s, o = {}) {
    if (o.alpha != null && o.alpha <= 0) return;
    ctx.save(); if (o.alpha != null) ctx.globalAlpha = o.alpha;
    knotBeast(x, y, s, { fur: true, col: '#C8C8C8', dark: '#6A6A6A', look: o.look || [0, 0], hat: o.hat === false ? null : 'party', loose: o.loose || 0, grin: o.grin });
    ctx.restore();
    if ((o.loose || 0) < .5) for (const ex of [-.17, .17]) glow(x + ex * s, y - .04 * s, s * .22, '#FFFFFF', .8 * (o.alpha ?? 1) * (o.eyes ?? 1));
  }
  // the knot's true form: a loose ball of string with a trailing end
  function stringBall(x, y, r, k = 1) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#E0E0E0'; ctx.lineWidth = Math.max(2, r * .09); ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x + (hash(i) - .5) * r * .2, y + (hash(i * 2) - .5) * r * .2, r * (.75 + .25 * hash(i * 3)), r * (.45 + .3 * hash(i * 5)), hash(i * 7) * 3, 0, TAU); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(x + r * .8, y + r * .2); ctx.bezierCurveTo(x + r * 1.6, y + r * .9, x + r * 2.2, y - r * .1, x + r * 2.8, y + r * .6); ctx.stroke(); ctx.restore(); }
  // Clawd's butterfly net (arm hook): swing 0..1 sweeps it
  const net = (sw = 0) => (u, w) => { ctx.save(); ctx.rotate(-.4 + sw * 1.6); ctx.strokeStyle = '#8A7A6A'; ctx.lineWidth = u * .45; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(u * 9, 0); ctx.stroke(); ctx.strokeStyle = '#DADADA'; ctx.lineWidth = u * .35; ctx.beginPath(); ctx.ellipse(u * 11.4, 0, u * 2.4, u * 1.6, 0, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(230,230,230,.5)'; ctx.lineWidth = 1.5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(u * 11.4 + i * u * .9, -u * 1.5 + Math.abs(i) * u * .2); ctx.quadraticCurveTo(u * 11.4 + i * u * .4, u * 3, u * 11.4, u * 4.2); ctx.stroke(); } ctx.restore(); };
  // the SUPERPOSITION pennant (arm hook)
  const pennantOf = flipped => (u, w) => { ctx.save(); ctx.rotate(-.9); ctx.strokeStyle = '#8A7A6A'; ctx.lineWidth = u * .45; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(u * 12, 0); ctx.stroke(); ctx.translate(u * 12, 0); ctx.rotate(Math.PI / 2 + .9 + .08 * Math.sin(T * 5)); flat([[0, 0], [u * 15, u * 1.6 + u * .4 * Math.sin(T * 6)], [0, u * 3.6]], '#5A5A5A', { line: '#DADADA', lw: 2 }); ctx.save(); ctx.translate(u * 5.6, u * 1.7); ctx.rotate(.1); if (!flipped) ctx.scale(-1, 1); txt('SUPERPOSITION', 0, 0, u * 1.25, '#F2F2F2', { font: SERIF, weight: '900' }); ctx.restore(); ctx.restore(); };
  const pennant = pennantOf(false), pennantF = pennantOf(true);
  // Clawd the believer: safari hat, headlamp beam
  function hunter(t, x, y, u, o) {
    if (o.lamp !== false) { const dir = o.flip ? -1 : 1, a = (o.lampA ?? .05); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .22; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(x + dir * u * 2, y - u * 7.4); ctx.lineTo(x + dir * u * 70, y - u * 7.4 - u * 70 * Math.tan(a) - u * 16); ctx.lineTo(x + dir * u * 70, y - u * 7.4 - u * 70 * Math.tan(a) + u * 16); ctx.closePath(); ctx.fill(); ctx.restore(); glow(x + dir * u * 2, y - u * 7.4, u * 3, '#FFFFFF', .9); }
    tourist(x, y, u, 'safari', o);
    if (o.bag) { const bx = x + (o.flip ? 3.2 : -3.2) * u, by = y - 3.4 * u; ctx.save(); ctx.strokeStyle = '#6A5A4A'; ctx.lineWidth = u * .35; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(x + (o.flip ? -2 : 2) * u, y - 7.6 * u); ctx.stroke(); ctx.restore(); flat(rrPts(bx - 1.8 * u, by, 3.6 * u, 3 * u, u * .6), '#7A6A5A', { line: '#2A2A2A', lw: 2 }); flat(rrPts(bx - 1.9 * u, by - .2 * u, 3.8 * u, 1.2 * u, u * .4), '#8A7A6A', { line: '#2A2A2A', lw: 2 }); }
  }
  // a faster night-vision pass with the same look as fxNightVision (mono green, grain, scanlines, vignette, REC,
  // timecode, CAM label): compositing instead of a per-pixel loop, so a frame stays well under the render budget
  let NVC = null, NVS = null; const NVN = [];
  function nvInit() {
    if (NVC) return; NVC = createCanvas(W, H);
    for (let k = 0; k < 4; k++) { const c = createCanvas(W / 2, H / 2), x = c.getContext('2d'), d = x.createImageData(W / 2, H / 2), D = d.data; let s = 7919 * (k + 1); for (let i = 0; i < D.length; i += 4) { s = (s * 1103515245 + 12345) & 0x7fffffff; const v = 128 + (s / 0x7fffffff - .5) * 150; D[i] = D[i + 1] = D[i + 2] = v; D[i + 3] = 255; } x.putImageData(d, 0, 0); NVN.push(c); }
    NVS = createCanvas(W, H); const x = NVS.getContext('2d'); x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, W, H); x.fillStyle = '#D1D1D1'; for (let y = 0; y < H; y += 3) x.fillRect(0, y, W, 1);
  }
  function nightVision(t, o = {}) {
    nvInit();
    POST.push(() => {
      const c = NVC.getContext('2d'); c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1; c.filter = 'grayscale(1) brightness(1.25)'; c.drawImage(CANVAS, 0, 0); c.filter = 'none';
      c.imageSmoothingEnabled = false; c.globalCompositeOperation = 'overlay'; c.globalAlpha = .5; c.drawImage(NVN[Math.floor(t * 24) % 4], 0, 0, W, H); c.globalAlpha = 1;
      c.globalCompositeOperation = 'multiply'; c.fillStyle = '#1EFF46'; c.fillRect(0, 0, W, H); c.drawImage(NVS, 0, 0); c.globalCompositeOperation = 'source-over'; c.imageSmoothingEnabled = true;
      ctx.drawImage(NVC, 0, 0);
      const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .85); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.85)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = Math.floor(t * 2) % 2 ? '#FF3B30' : 'rgba(255,59,48,.2)'; ctx.beginPath(); ctx.arc(110, 90, 16, 0, TAU); ctx.fill();
      ctx.font = '40px monospace'; ctx.fillStyle = '#B8FFB0'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText('REC', 140, 92);
      const s = Math.floor(t), tc = `00:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(Math.floor(t * 24) % 24).padStart(2, '0')}`; ctx.textAlign = 'right'; ctx.fillText(tc, W - 100, 92);
      if (o.label) { ctx.textAlign = 'left'; ctx.font = '44px monospace'; ctx.fillText(o.label, 100, H - 90); }
      ctx.strokeStyle = '#B8FFB0'; ctx.lineWidth = 3; for (const [x, y, dx, dy] of [[80, 60, 1, 1], [W - 80, 60, -1, 1], [80, H - 60, 1, -1], [W - 80, H - 60, -1, -1]]) { ctx.beginPath(); ctx.moveTo(x, y + dy * 60); ctx.lineTo(x, y); ctx.lineTo(x + dx * 60, y); ctx.stroke(); }
    });
  }
  // camcorder post: night vision + optional OSD drawn crisp on top + cut static
  function nv(t, label, cutAt = [], o = {}) {
    GRAIN = 0;
    // the camcorder's infrared lamp lights the middle of the frame
    POST.unshift(() => { const g = ctx.createRadialGradient(W / 2, H * .55, 0, W / 2, H * .55, H * .75); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    nightVision(t, { label });
    if (o.osd) POST.push(o.osd);
    POST.push(() => staticBars(t, cutAt));
  }
  function staticBars(t, cutAt) {
    let k = 0; for (const c of cutAt) k = Math.max(k, 1 - Math.abs(t - c) / .18);
    if (k <= 0) return;
    ctx.save(); const f = Math.floor(t * 24);
    for (let i = 0; i < 26; i++) { const y = hash(f * 7.1 + i) * H, h = 4 + hash(f * 3.3 + i) * 40; ctx.globalAlpha = k * (.25 + .6 * hash(i + f)); ctx.fillStyle = hash(f + i * 5) > .5 ? '#E8FFE8' : '#0A140A'; ctx.fillRect(0, y, W, h); }
    ctx.globalAlpha = k * .5; for (let i = 0; i < 900; i++) { ctx.fillStyle = hash(i * 1.3 + f) > .5 ? '#FFFFFF' : '#000000'; ctx.fillRect(hash(i * 2.1 + f * .7) * W, hash(i * 3.7 + f * .3) * H, 6, 3); }
    ctx.restore();
  }
  // the camcorder's own crisp on-screen text (drawn after the night-vision pass)
  function osdText(s, x, y, size, col = OSD, o = {}) { ctx.save(); ctx.font = `${o.bold ? '700 ' : ''}${size}px ${MONO}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'middle'; ctx.globalAlpha = o.alpha ?? 1; if (o.shadow !== false) { ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillText(s, x + 3, y + 3); } ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.restore(); }

  // ---------- daytime evidence review: a CRT on a desk ----------
  const SCR = { x: 520, y: 150, w: 880, h: 560 };
  function desk(t, label) {
    layer('c8desk', () => {
      ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3A2E26'], [1, '#1E1814']]); ctx.fillRect(-300, -300, W + 600, H + 600);
      // the corkboard of blurry sightings behind
      flat(rrPts(80, 120, 360, 520, 10), '#8A6A44', { line: '#3A2A1A', lw: 6 }); for (let i = 0; i < 5; i++) { const x = 130 + (i % 2) * 150 + hash(i) * 30, y = 170 + Math.floor(i / 2) * 160; flat(rectPts(x, y, 120, 100), '#E9E2D0', { line: '#3A2A1A', lw: 2 }); flat(rectPts(x + 8, y + 8, 104, 66), '#2E4A2E'); ctx.fillStyle = 'rgba(200,255,200,.4)'; ctx.beginPath(); ctx.ellipse(x + 60, y + 40, 18, 14, 0, 0, TAU); ctx.fill(); dot(x + 60, y - 2, 6, '#C2456A'); }
      ctx.save(); ctx.strokeStyle = '#C2456A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(190, 170); ctx.lineTo(340, 330); ctx.lineTo(200, 490); ctx.stroke(); ctx.restore();
      // the desk top
      flat([[-300, 830], [W + 300, 830], [W + 300, H + 300], [-300, H + 300]], '#6A4A30', { grad: [[0, '#7A5A3A'], [1, '#3A2818']], gdir: [0, 830, 0, 1080] });
      flat(rectPts(-300, 822, W + 600, 14), '#8A6A4A');
      // the TV cabinet
      flat(rrPts(SCR.x - 70, SCR.y - 60, SCR.w + 140, SCR.h + 180, 40), '#4A4440', { line: '#1A1614', lw: 6, shadow: [14, 18, 'rgba(0,0,0,.5)'] });
      flat(rrPts(SCR.x - 30, SCR.y - 24, SCR.w + 60, SCR.h + 48, 50), '#1A1816');
      for (let i = 0; i < 2; i++) flat(ellPts(SCR.x + SCR.w - 60 + i * 70, SCR.y + SCR.h + 70, 22, 22, 16), '#8A847C', { line: '#1A1614', lw: 3 });
      ctx.save(); ctx.strokeStyle = '#2A2624'; ctx.lineWidth = 4; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(SCR.x + 30 + i * 22, SCR.y + SCR.h + 50); ctx.lineTo(SCR.x + 30 + i * 22, SCR.y + SCR.h + 95); ctx.stroke(); } ctx.restore();
      // a VCR under it
      flat(rrPts(SCR.x + 140, 846, 600, 70, 8), '#2A2828', { line: '#0A0A0A', lw: 3 }); flat(rrPts(SCR.x + 180, 866, 220, 22, 4), '#0A0A0A');
      // the desk lamp
      flat([[1640, 830], [1760, 830], [1720, 800], [1680, 800]], '#3A3A3A'); ctx.save(); ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(1700, 800); ctx.lineTo(1660, 560); ctx.lineTo(1560, 470); ctx.stroke(); ctx.restore(); flat([[1500, 420], [1600, 440], [1560, 520], [1470, 480]], '#5A6A3A', { line: '#1A1A1A', lw: 3 });
    }, { variants: 1, x: -300, y: -300, w: W + 600, h: H + 600 });
    glow(1530, 520, 380, '#FFC766', .5);
    // the VCR display
    txt(label, SCR.x + 600, 881, 26, '#7AFF9A', { font: MONO, weight: '700', align: 'right' });
  }
  // draw content into the CRT: f(w, h) in screen-local coords; then scanlines and glass
  function crt(t, f, o = {}) {
    const { x, y, w, h } = SCR;
    ctx.save(); const P = new Path2D(); P.roundRect(x, y, w, h, 34); ctx.clip(P);
    ctx.fillStyle = o.bg || '#101418'; ctx.fillRect(x, y, w, h);
    ctx.translate(x, y); f(w, h); ctx.translate(-x, -y);
    ctx.globalAlpha = .08; ctx.fillStyle = '#000000'; for (let yy = y; yy < y + h; yy += 4) ctx.fillRect(x, yy, w, 2);
    ctx.globalAlpha = 1; const g = ctx.createRadialGradient(x + w / 2, y + h / 2, h * .3, x + w / 2, y + h / 2, w * .62); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = .07; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(x + w * .3, y + h * .18, w * .35, h * .12, -.2, 0, TAU); ctx.fill();
    if (o.roll) { ctx.globalAlpha = .12; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x, y + frac(t * .4) * h, w, 30); }
    ctx.restore();
  }
  // Clawd at the desk, from behind, watching the TV
  function viewer(t, keys, o = {}) { tourist(o.x ?? 330, o.y ?? 838, 12, 'safari', { ...emotions(t, keys), view: o.view || 'q', flip: o.flip ?? false, ...o.pose, boilKey: 'c8viewer' }); }
  // a rubber stamp slammed onto the screen
  function slamStamp(s, x, y, at, t, col = '#D0302A', rot = -.12, size = 64) { stamp(s, x, y, at, t, { col, rot, size }); }

  // ---------- 1 · the believer: tape 1 ----------
  function believer(t, lt, dur) {
    const c0 = chapStart('ch08'), a = cs('sg_believer'), tTrue = wt('sg_believer', 'believer'), tSup = wt('sg_believer', 'superposition'), tStud = wt('sg_believer', 'studying'), tExp = wt('sg_believer', 'expecting'), tHit = wt('sg_believer', 'hit'), tDay = wt('sg_believer', 'day'), e = ce('sg_believer');
    const [hx, hy] = shakeXY(t, 4);
    // a whip pan follows the knot's dash, then settles on the clearing
    camKeys(t, [[c0, 500, 540, 1.1], [c0 + 1.8, 1300, 540, 1.1], [a, 1100, 560, 1.05], [tTrue, 900, 600, 1.12], [tExp, 1000, 610, 1.2], [tHit, 1080, 620, 1.28], [e + 1, 1000, 600, 1.15]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
    woods('a', { seed: 1 });
    // the knot dashes through, party hat and all, and vanishes behind a tree
    const dk = seg(t, c0 - .6, c0 + 2.2);
    if (dk < 1) cryptid(t, lerp(-200, 1560, dk), 640 - 40 * Math.abs(Math.sin(t * 12)), 84, { look: [1, 0] });
    trunk(1600, 170, '#444444'); trunk(420, 120, '#3A3A3A');
    // Clawd marches in: net in one arm, the pennant in the other
    const st = stroll(t, a - .2, tTrue + 1.4, -150, 820, 14), swing = env(t, tHit - .5, tHit + .6, .25, .3);
    // something in the bush: two eyes... it's only a moth
    const bush = [1250, GROUND - 20];
    flat(ellPts(bush[0], bush[1], 170, 90, 20), '#5A5A5A');
    if (t > tStud && t < tHit) for (const ex of [-18, 18]) glow(bush[0] + ex, bush[1] - 30, 22, '#FFFFFF', .9 * (Math.floor(t * 3) % 5 ? 1 : .1));
    if (t > tHit) { const mk = seg(t, tHit, tHit + 2.4), mx = bush[0] + 60 * mk + 30 * Math.sin(t * 9), my = bush[1] - 90 - 260 * mk; ctx.save(); ctx.fillStyle = '#E8E8E8'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(mx + sd * 9, my, 10, 6 + 3 * Math.sin(t * 40), sd * .6, 0, TAU); ctx.fill(); } ctx.restore(); glow(mx, my, 20, '#FFFFFF', .6); }
    const pose = st.walk > 0 && t < tTrue + 1.4 ? { walk: st.walk, view: 'q' } : { view: 'q' };
    const sneaking = t > tStud && t < tHit;
    hunter(t, sneaking ? lerp(820, 1000, ease(seg(t, tStud, tHit - .4))) : t >= tHit ? 1000 : st.x, GROUND - 40, 14, { ...emotions(t, [[c0, 'excited'], [tSup, 'proud'], [tStud, 'determined'], [tExp, 'suspicious'], [tHit, 'surprised'], [tDay, 'sad']]), ...pose, dy: st.dy, aR: sneaking ? .4 : .6 + 1.2 * swing, armR: net(swing), aL: .9, armL: pennant, lampA: sneaking ? -.15 : .05, boilKey: 'c8hunter' });
    camEnd();
    nv(t, t < a ? 'CAM 1 · MOTION DETECTED' : 'CAM 1 · NIGHT 1 · THE BELIEVER');
    if (t > tTrue - .3) letter('a true believer', 1350, 340, 64, OSD, { face: 'marker', shadow: false, reveal: seg(t, tTrue - .3, tTrue + .6), alpha: 1 - seg(t, tStud, tStud + .4) });
    if (t > tHit && t < tHit + 1.4) sfx('swish!', 1180, 520, 64, OSD, t - tHit, { face: 'marker' });
  }

  // ---------- 2 · the PR cabin, then the evidence review ----------
  const B64 = [['cHJpemU=', 'prize'], ['cHJvb2Y=', 'proof'], ['cHJlc3M=', 'press']];
  function cabin(t, x, y, w, h, wins, o = {}) {
    flat([[x - w / 2 - 30, y - h], [x, y - h - w * .4], [x + w / 2 + 30, y - h]], '#3A3A3A', { line: '#1A1A1A', lw: 4 });
    flat(rectPts(x - w / 2, y - h, w, h), '#555555', { line: '#1A1A1A', lw: 4 });
    ctx.save(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 3; for (let yy = y - h + 26; yy < y; yy += 28) { ctx.beginPath(); ctx.moveTo(x - w / 2, yy); ctx.lineTo(x + w / 2, yy); ctx.stroke(); } ctx.restore();
    flat(rrPts(x - 40, y - 150, 80, 150, 6), '#2A2A2A');
    const n = wins.length, ww = (w - 60) / n - 20;
    wins.forEach((f, i) => { const wx = x - w / 2 + 40 + i * (ww + 20), wy = y - h + 40, wh = h - 230; const lit = o.lit ? o.lit[i] : 1; flat(rectPts(wx - 8, wy - 8, ww + 16, wh + 16), '#2A2A2A'); flat(rectPts(wx, wy, ww, wh), lit > .05 ? mixCol('#3A3A3A', '#F4F0E0', lit) : '#2E2E2E'); if (lit > .05) { glow(wx + ww / 2, wy + wh / 2, ww * .9, '#FFFFFF', .5 * lit); ctx.save(); ctx.beginPath(); ctx.rect(wx, wy, ww, wh); ctx.clip(); ctx.globalAlpha = lit; f(wx, wy, ww, wh); ctx.restore(); } ctx.save(); ctx.strokeStyle = '#2A2A2A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke(); ctx.restore(); });
  }
  const winPR = (x, y, w, h) => txt('pr', x + w / 2, y + h / 2, h * .55, INKD, { font: SERIF, weight: '700' });
  const winB64 = (x, y, w, h) => B64.forEach(([c], i) => txt(c, x + w / 2, y + h * (.25 + i * .25), w * .15, INKD, { font: MONO, weight: '700' }));
  const winBN = (x, y, w, h) => { txt('প্রকাশ', x + w / 2, y + h * .38, w * .26, INKD, { font: BENG, weight: '400' }); txt('প্রথম', x + w / 2, y + h * .7, w * .22, INKD, { font: BENG, weight: '400' }); };
  function pr(t, lt, dur) {
    const a = cs('sg_pr'), tLet = wt('sg_pr', 'letters'), tStr = wt('sg_pr', 'strange'), tCode = wt('sg_pr', 'code'), tBen = wt('sg_pr', 'Bengali'), tFin = wt('sg_pr', 'Finally'), tMix = wt('sg_pr', 'mixture');
    const tThen = wt('sg_pr', 'Then'), tDec = wt('sg_pr', 'decoded'), tWords = wt('sg_pr', 'words'), tTr = wt('sg_pr', 'translated'), tBen2 = wt('sg_pr', 'Bengali', 1), tPR2 = wt('sg_pr', 'P', 2), e = ce('sg_pr');
    const cut = tThen - .2;
    if (t < cut) {
      const [hx, hy] = shakeXY(t, t > tFin - .2 && t < tMix + .6 ? 14 : 4);
      camKeys(t, [[a - .3, 960, 560, 1], [tLet, 900, 520, 1.15], [tCode, 960, 520, 1.15], [tBen, 1040, 520, 1.15], [tFin - .1, 960, 520, 1.1], [tFin + .3, 960, 480, 1.55], [cut, 960, 480, 1.6]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
      woods('b', { seed: 5 });
      cabin(t, 960, GROUND, 900, 560, [winPR, winB64, winBN], { lit: [seg(t, tLet - .2, tLet + .3), seg(t, tStr - .2, tStr + .3), seg(t, tBen - .2, tBen + .3)] });
      trunk(180, 160, '#444444'); trunk(1780, 130, '#3E3E3E');
      hunter(t, 1460, GROUND + 40, 14, { ...emotions(t, [[a, 'suspicious'], [tLet, 'surprised'], [tBen, 'thinking'], [tFin, 'excited']]), view: 'q', flip: true, aR: .9, armR: net(0), aL: t > tFin ? 1.5 + .3 * Math.sin(t * 10) : .9, armL: pennantF, lampA: .25, boilKey: 'c8hunter' });
      camEnd();
      nv(t, 'CAM 2 · CABIN 7 · SIGHTING #1', [], { osd: () => { if (t > tFin - .1) { const blink = Math.floor(t * 4) % 2; osdText('ARBITRARY MIXTURE?!', 960, 300, 76, blink ? '#FFFFFF' : OSD, { align: 'center', bold: true }); } } });
    } else {
      // evidence review (daytime): decode the code, translate the Bengali
      camKeys(t, [[cut, 960, 520, 1.05], [tDec, 960, 470, 1.18], [tTr, 960, 470, 1.18], [e + 1, 960, 500, 1.08]], .4);
      desk(t, 'TAPE 2  0:43');
      const dk = seg(t, tDec, tDec + .9), tk = seg(t, tTr, tTr + .8);
      crt(t, (w, h) => {
        // the frozen frame from the tape, decoded line by line
        ctx.fillStyle = '#E9E2D0'; ctx.fillRect(40, 40, w * .56, h - 80); ctx.fillStyle = '#F2EBDA'; ctx.fillRect(w * .62, 40, w * .34, h - 80);
        B64.forEach(([c, word], i) => { const y = 120 + i * 120, k = clamp(dk * 3 - i * .8); const s = k > .5 ? word : c; ctx.save(); ctx.font = `700 ${k > .5 ? 64 : 52}px ${k > .5 ? SERIF : MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; const x0 = 80; if (k > .5) { const pw = ctx.measureText('pr').width; ctx.fillStyle = 'rgba(255,211,107,.85)'; ctx.fillRect(x0 - 4, y - 34, pw + 8, 68); ctx.fillStyle = '#B0203A'; ctx.fillText('pr', x0, y); ctx.fillStyle = INKD; ctx.fillText(word.slice(2), x0 + pw, y); } else { ctx.fillStyle = INKD; ctx.fillText(s, x0, y); } ctx.restore(); });
        ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const cx = w * .79;
        ctx.font = `96px ${BENG}`; ctx.fillStyle = INKD; ctx.fillText('প্রকাশ', cx, 210);
        if (tk > 0) { ctx.globalAlpha = tk; ctx.fillStyle = 'rgba(255,211,107,.85)'; ctx.fillRect(cx - 80, 300, 160, 100); ctx.fillStyle = '#B0203A'; ctx.font = `700 84px ${SERIF}`; ctx.fillText('"pr"', cx, 352); }
        ctx.restore();
      }, { bg: '#2A2A2A', roll: true });
      // the decoder ring slides across the code; the translation lens over the Bengali
      if (t < tTr + .5) { const rx = lerp(SCR.x + 140, SCR.x + 420, ease(dk)), ry = SCR.y + 240; ctx.save(); ctx.strokeStyle = '#C9A15A'; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(rx, ry, 110, 0, TAU); ctx.stroke(); ctx.fillStyle = '#6A4B30'; ctx.font = `700 22px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; for (let i = 0; i < 12; i++) { const q = i / 12 * TAU + t * 1.5; ctx.save(); ctx.translate(rx + Math.cos(q) * 110, ry + Math.sin(q) * 110); ctx.rotate(q + Math.PI / 2); ctx.fillText('ABCDEFGHIJKL'[i], 0, 0); ctx.restore(); } ctx.restore(); }
      viewer(t, [[cut, 'thinking'], [tDec + .6, 'idea'], [tTr + .5, 'laugh']], { x: 280 });
      camEnd();
      slamStamp('EXPLAINED', 960, 640, tPR2 + .2, t, '#D0302A', -.1, 80);
      lower8(t, tWords - .2, tTr - .2, 'decoded: words with "pr"');
      lower8(t, tBen2 - .2, e + 1, 'translated: "pr"');
    }
  }
  // the evidence-review caption (an index card taped to the screen bezel)
  function lower8(t, a, b, s) { const k = env(t, a, b, .3, .3); if (k <= 0) return; const y = 960; flat(rrPts(560 - 20 + (1 - k) * 30, y - 46, 840, 92, 6), '#F6EEDA', { alpha: k, shadow: [6, 8, 'rgba(0,0,0,.35)'] }); letter(s, 960, y, 52, '#2A2A2A', { face: 'hand', alpha: k, shadow: false, screen: true }); }

  // ---------- 3 · Colorado: the comma neuron ----------
  const LINES = ['we drove west , past the plains ,', 'then up into Colorado , where', 'the air is thin , the pines tall ,', 'and every trail , every ridge ,'];
  const HIKE = ['DAY 1 · trailhead at dawn', 'pack: boots, water, map', 'summit by noon · 14,000 ft'];
  function colorado(t, lt, dur) {
    const a = cs('sg_colorado'), tRand = wt('sg_colorado', 'random'), tCom = wt('sg_colorado', 'commas'), tTrack = wt('sg_colorado', 'track'), tCol = wt('sg_colorado', 'Colorado'), tSum = wt('sg_colorado', 'summary'), tTurn = wt('sg_colorado', 'Turn'), tUp = wt('sg_colorado', 'up'), tPlan = wt('sg_colorado', 'planning'), tHike = wt('sg_colorado', 'hike'), e = ce('sg_colorado');
    camKeys(t, [[a - .3, 960, 500, 1.08], [tTrack, 960, 470, 1.15], [tSum, 960, 470, 1.15], [tTurn - .3, 1150, 560, 1.1], [tPlan, 1050, 500, 1.08], [e + 1, 960, 500, 1.06]], .4);
    desk(t, 'TAPE 3  1:12');
    const crank = ease(seg(t, tTurn, tUp + .6)), hikeK = seg(t, tPlan - .3, tHike + .3);
    crt(t, (w, h) => {
      ctx.fillStyle = '#F2EBDA'; ctx.fillRect(30, 30, w - 60, h - 60);
      if (hikeK < .5) {
        let seenCol = false;
        LINES.forEach((L, li) => {
          let x = 70; const y = 100 + li * 104; ctx.save(); ctx.font = `700 46px ${SERIF}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
          L.split(' ').forEach((wd, wi) => {
            const isC = wd === ','; if (wd === 'Colorado') seenCol = true;
            const flick = hash(li * 31 + wi * 7 + Math.floor(t * 3)) > .55, lit = isC && (t < tTrack ? (t > tRand - .4 && flick) : seenCol);
            if (lit) { const g = ctx.createRadialGradient(x + 8, y + 8, 0, x + 8, y + 8, 36); g.addColorStop(0, 'rgba(255,177,59,.9)'); g.addColorStop(1, 'rgba(255,177,59,0)'); ctx.fillStyle = g; ctx.fillRect(x - 30, y - 30, 76, 76); }
            ctx.fillStyle = lit ? '#C05A00' : wd === 'Colorado' && t > tCol - .2 ? '#B0203A' : INKD;
            if (wd === 'Colorado' && t > tCol - .2) { const ww = ctx.measureText(wd).width; ctx.save(); ctx.fillStyle = 'rgba(255,211,107,.8)'; ctx.fillRect(x - 4, y - 28, ww + 8, 56); ctx.restore(); ctx.fillStyle = '#B0203A'; }
            ctx.fillText(wd, x, y); x += ctx.measureText(wd).width + (isC ? 8 : 14);
            // a running summary kept at each lit comma: a tiny mountain
            if (lit && t > tSum - .4) { const k = clamp((t - tSum + .4) * 2 - li * .2); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#5A6A8A'; ctx.beginPath(); ctx.moveTo(x - 30, y - 30); ctx.lineTo(x - 16, y - 54); ctx.lineTo(x - 2, y - 30); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(x - 20, y - 47); ctx.lineTo(x - 16, y - 54); ctx.lineTo(x - 12, y - 47); ctx.closePath(); ctx.fill(); ctx.restore(); }
          });
          ctx.restore();
        });
      } else {
        // turned up: the model starts planning a hike
        ctx.save(); ctx.globalAlpha = clamp((hikeK - .5) * 3);
        ctx.fillStyle = '#7A8AA8'; ctx.beginPath(); ctx.moveTo(w * .55, h - 40); ctx.lineTo(w * .72, 120); ctx.lineTo(w * .8, 200); ctx.lineTo(w * .88, 90); ctx.lineTo(w - 30, h - 40); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(w * .69, 165); ctx.lineTo(w * .72, 120); ctx.lineTo(w * .75, 160); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(w * .86, 130); ctx.lineTo(w * .88, 90); ctx.lineTo(w * .91, 125); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#FFD36B'; ctx.beginPath(); ctx.arc(w * .63, 120, 34, 0, TAU); ctx.fill();
        ctx.strokeStyle = '#8C5A3A'; ctx.lineWidth = 5; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(w * .58, h - 50); ctx.lineTo(w * .66, h - 160); ctx.lineTo(w * .7, h - 240); ctx.lineTo(w * .75, h - 300); ctx.lineTo(w * .82, h - 390); ctx.stroke(); ctx.setLineDash([]);
        ctx.font = `700 42px ${SERIF}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; HIKE.forEach((s, i) => { ctx.globalAlpha = clamp((hikeK - .5) * 3 - i * .5); ctx.fillStyle = INKD; ctx.fillText(s, 60, 110 + i * 90); });
        ctx.restore();
      }
    }, { bg: '#2A2A2A', roll: true });
    // the field meter: Clawd cranks the neuron up
    const mx = 1560, my = 700; push(); translate(mx, my);
    flat(rrPts(-110, -150, 220, 300, 24), '#3A3A40', { line: '#0A0A0A', lw: 4, shadow: [8, 10, 'rgba(0,0,0,.45)'] }); flat(rrPts(-86, -126, 172, 100, 10), '#E9E2D0');
    ctx.save(); ctx.strokeStyle = INKD; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -40, 70, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); const na = lerp(Math.PI * 1.2, Math.PI * 1.8, lerp(.15 + .05 * Math.sin(t * 7), .98, crank)); ctx.strokeStyle = '#D0302A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(Math.cos(na) * 66, -40 + Math.sin(na) * 66); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 5; i++) { const on = crank * 5 > i + .2; dot(-60 + i * 30, 10, 10, on ? ['#7AE07A', '#B9E07A', '#FFD36B', '#FFB13B', '#FF5A3A'][i] : '#2A2A2A'); if (on) glow(-60 + i * 30, 10, 26, '#FFD36B', .5); }
    push(); translate(0, 80); rotate(-2.2 + crank * 3.4); flat(ellPts(0, 0, 38, 38, 18), '#8A847C', { line: '#0A0A0A', lw: 3 }); flat(rectPts(-5, -36, 10, 26), '#2A2A2A'); pop();
    pop();
    txt('NEURON', mx, my + 140, 26, '#E9E2D0', { font: MONO, weight: '700' });
    viewer(t, [[a, 'neutral'], [tCom, 'confused'], [tCol, 'surprised'], [tSum, 'thinking'], [tTurn, 'determined'], [tHike, 'excited']], { x: 1720, view: 'q', flip: true, pose: { aL: .3 + (crank > 0 && crank < 1 ? .4 * Math.sin(t * 14) : 0) } });
    camEnd();
    lower8(t, tCom - .4, tTrack - .2, 'fires on random commas?');
    lower8(t, tTrack - .1, tSum - .4, 'it tracks Colorado');
    lower8(t, tSum - .3, tTurn - .3, 'a running summary at the commas');
    lower8(t, tPlan - .3, e + 1.2, 'turned up: it plans a hike');
  }

  // ---------- 4 · case after case; the knot keeps moving ----------
  function tapes(t, a) {
    desk(t, 'ARCHIVE');
    crt(t, (w, h) => { ctx.fillStyle = '#0A0A10'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < 300; i++) { ctx.fillStyle = hash(i + Math.floor(t * 24)) > .5 ? '#3A3A44' : '#0A0A10'; ctx.fillRect(hash(i * 3.3 + Math.floor(t * 24)) * w, hash(i * 7.1) * h, 6, 3); } }, { bg: '#0A0A10' });
    // a stack of tapes on the desk, each stamped as it's explained
    ['PR NEURON', 'COLORADO', 'CURVES'].forEach((s, i) => { const k = popk(t, a + .1 + i * .45, .35), x = 960 + (i - 1) * 300, y = 770 - (i % 2) * 6; push(); translate(x, y); rotate((i - 1) * .05); scale(backOut(k) * 1.05); flat(rrPts(-130, -60, 260, 120, 8), '#1A1A1A', { line: '#000000', lw: 3, shadow: [6, 8, 'rgba(0,0,0,.4)'] }); flat(rrPts(-100, -40, 200, 54, 4), '#F6EEDA'); txt(s, 0, -13, 26, INKD, { font: MONO, weight: '700' }); pop(); });
  }
  function moving(t, lt, dur) {
    const a = cs('sg_moving'), tRes = wt('sg_moving', 'resolved'), tEach = wt('sg_moving', 'each'), tMoved = wt('sg_moving', 'moved'), tIf = wt('sg_moving', 'If'), tWeak = wt('sg_moving', 'weak'), tOr = wt('sg_moving', 'Or'), tBet = wt('sg_moving', 'between'), tOr2 = wt('sg_moving', 'Or', 1), tChk = wt('sg_moving', 'checked'), e = ce('sg_moving');
    const c1 = tEach - .3, c2 = tIf - .1, c3 = tOr - .15, c4 = tOr2 - .15;
    if (t < c1) {
      camKeys(t, [[a - .3, 960, 700, 1.45], [c1, 960, 720, 1.55]], .4);
      tapes(t, a);
      ['EXPLAINED', 'EXPLAINED', 'EXPLAINED'].forEach((s, i) => stamp(s, 960 + (i - 1) * 300, 790, a + .5 + i * .45, t, { col: '#D0302A', rot: -.15 + i * .08, size: 44 }));
      camEnd();
      lower8(t, a + .2, c1 + .2, 'case after case, the mess resolved');
      return;
    }
    const [hx, hy] = shakeXY(t, 5);
    if (t < c2) {
      // CAM 3: it peeks from behind a tree... then it's behind the next one
      camKeys(t, [[c1, 900, 560, 1.1], [c2, 1000, 560, 1.15]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
      woods('c', { seed: 9 });
      const hop = seg(t, tMoved - .1, tMoved + .25), kx = hop < 1 ? 1180 : 1700, peek = hop > 0 && hop < 1 ? 0 : 1;
      cryptid(t, kx - 30 * Math.sin(Math.min(1, (t - c1) * 2) * Math.PI / 2), 520, 150, { look: [1, 0], alpha: peek });
      trunk(1180, 220, '#4A4A4A'); trunk(1730, 200, '#444444');
      if (hop > 0 && hop < 1) { ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = '#BBBBBB'; ctx.fillRect(1180, 470, 520 * hop, 60); ctx.restore(); }
      const sw = env(t, tMoved + .1, tMoved + .9, .2, .3);
      hunter(t, 900, GROUND + 20, 15, { ...emotions(t, [[c1, 'determined'], [tMoved + .2, 'surprised']]), view: 'q', aR: .6 + 1.4 * sw, armR: net(sw), aL: .9, armL: pennant, boilKey: 'c8hunter' });
      camEnd();
      nv(t, 'CAM 3 · TREE LINE', [c1]);
      if (t > tMoved - .3) letter('superposition just moved', 960, 230, 64, OSD, { face: 'marker', shadow: false, reveal: seg(t, tMoved - .3, tMoved + .5) });
    } else if (t < c3) {
      // CAM 4: hiding in the weak signals: faint, through fog and noise
      camKeys(t, [[c2, 960, 540, 1.05], [c3, 1000, 540, 1.12]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
      woods('d', { seed: 13 });
      ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = '#6A6A6A'; ctx.fillRect(-400, -300, W + 800, H + 600); ctx.restore();
      cryptid(t, 1320 + 20 * Math.sin(t), 560, 70, { alpha: .14 + .06 * Math.sin(t * 6), look: [-1, 0], eyes: .35 });
      const beamA = lerp(-.4, .25, ease(seg(t, tWeak - .9, tWeak + .2)));
      hunter(t, 520, GROUND + 20, 15, { ...emotions(t, [[c2, 'suspicious'], [tWeak + .3, 'confused']]), view: 'q', aR: .6, armR: net(0), aL: .9, armL: pennant, lampA: beamA, boilKey: 'c8hunter' });
      camEnd();
      nv(t, 'CAM 4 · WEAK SIGNALS', [c2]);
    } else if (t < c4) {
      // CAM 5: between two neurons
      camKeys(t, [[c3, 960, 560, 1.05], [c4, 960, 560, 1.12]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
      woods('e', { seed: 17 });
      const NPV = 'blog/raw/negative-poles-v2/';
      neuronHouse(640, GROUND, 360, 380, { roof: 'peak', on: .9, imgs: [NPV + 'cats-positive-1', NPV + 'cats-positive-2'], cols: 2, key: 'c8h1', col: '#5A5A5A', roofCol: '#3A3A3A', awning: false });
      neuronHouse(1280, GROUND, 360, 380, { roof: 'peak', on: .9, imgs: [NPV + 'wolves-positive-1', NPV + 'wolves-positive-2'], cols: 2, key: 'c8h2', col: '#5A5A5A', roofCol: '#3A3A3A', awning: false });
      const lunge = seg(t, tBet + .1, tBet + .5), esc = seg(t, tBet + .3, tBet + .8);
      cryptid(t, 960, 640 - 600 * easeIn(esc), 90, { look: [0, -1], alpha: 1 - esc });
      hunter(t, lerp(380, 820, ease(lunge)), GROUND + 30, 15, { ...emotions(t, [[c3, 'determined'], [tBet + .5, 'angry']]), view: 'q', aR: .6 + 1.2 * lunge, armR: net(lunge), aL: .9, armL: pennant, boilKey: 'c8hunter' });
      camEnd();
      nv(t, 'CAM 5 · BETWEEN NEURONS', [c3]);
    } else {
      // CAM 6: in the neurons nobody has checked yet
      camKeys(t, [[c4, 960, 560, 1.05], [e + 1, 1060, 560, 1.15]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.5);
      woods('f', { seed: 21 });
      for (let i = 0; i < 5; i++) { const x = 360 + i * 300, s = 1 - i * .08; cabin(t, x, GROUND - 40 - i * 10, 220 * s, 260 * s, [() => {}], { lit: [0] }); txt('?', x, GROUND - 120 - i * 10, 70 * s, '#BDBDBD', { font: SERIF, weight: '900' }); }
      const eyeK = Math.floor(t * 2.3) % 7 ? 1 : 0, ex = 360 + 3 * 300, ey = GROUND - 40 - 30 - 260 * .76 + 40; for (const dx of [-12, 12]) { glow(ex + dx, ey, 26, '#FFFFFF', .95 * eyeK); dot(ex + dx, ey, 5, '#FFFFFF', eyeK); }
      hunter(t, 330, GROUND + 30, 15, { ...emotions(t, [[c4, 'nervous'], [tChk + .2, 'sad']]), view: 'q', aR: .2, armR: net(0), aL: .5, armL: pennant, lampA: .1, boilKey: 'c8hunter' });
      camEnd();
      nv(t, 'CAM 6 · UNCHECKED NEURONS', [c4]);
    }
  }

  // ---------- 5 · the camcorder's own ranking: SUPERPOSITION drops to last ----------
  const ROWS = ['BAD TOOLS', 'BAD DESIGN', 'UNFOLLOWED BRANCH', 'UNKNOWN PATTERN'];
  function last(t, lt, dur) {
    const a = cs('sg_last'), tSup = wt('sg_last', 'superposition'), tDef = wt('sg_last', 'default'), tLast = wt('sg_last', 'last'), tRes = wt('sg_last', 'resort'), tRad = wt('sg_last', 'radical'), tHard = wt('sg_last', 'hardest'), tSym = wt('sg_last', 'symptom'), tSense = wt('sg_last', 'sense');
    const tTool = wt('sg_last', 'tool'), tDes = wt('sg_last', 'design'), tBr = wt('sg_last', 'branch'), tLooks = wt('sg_last', 'looks'), e = ce('sg_last');
    const [hx, hy] = shakeXY(t, 3);
    camKeys(t, [[a - .3, 860, 600, 1.15], [e, 900, 600, 1.2]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.2);
    woods('g', { seed: 25 });
    // a little campfire; Clawd on a log, thinking it over
    for (const [dx, a2] of [[-50, .5], [50, -.5]]) { push(); translate(560 + dx * .4, GROUND + 10); rotate(a2); flat(rrPts(-70, -12, 140, 24, 10), '#5A5A5A'); pop(); }
    for (let i = 0; i < 5; i++) { const fl = Math.sin(t * 11 + i * 2), hh = 120 + 40 * Math.sin(t * 7 + i), x = 520 + i * 20; flat([[x - 26, GROUND], [x + (fl * 10), GROUND - hh * (1 - Math.abs(i - 2) * .22)], [x + 26, GROUND]], i === 2 ? '#FFFFFF' : '#D8D8D8', { alpha: .9 }); }
    for (let i = 0; i < 6; i++) { const f = frac(t * .9 + i / 6); dot(560 + Math.sin(i * 3 + t * 2) * 30 * f, GROUND - 120 - f * 260, 4, '#FFFFFF', 1 - f); }
    glow(560, GROUND - 40, 220, '#FFFFFF', .7 + .1 * Math.sin(t * 13));
    flat(rrPts(700, GROUND - 10, 420, 60, 30), '#5A5A5A'); ctx.save(); ctx.strokeStyle = '#3A3A3A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(1110, GROUND + 20, 14, 28, 0, 0, TAU); ctx.stroke(); ctx.restore();
    // gag: the lens fogs up at "a bad tool", and Clawd wipes it clean
    const fog = env(t, tTool - .3, tTool + 1.1, .3, .4), wipe = seg(t, tTool + .5, tTool + 1.1);
    hunter(t, 900, GROUND - 4, 14, { ...emotions(t, [[a, 'thinking'], [tRes, 'surprised'], [tSym, 'confused'], [tTool + .4, 'determined'], [tLooks, 'relieved']]), view: 'front', aR: -.4, aL: -.3, lamp: false, boilKey: 'c8hunter' });
    flat(rrPts(1010, GROUND - 120, 26, 140, 10), '#8A7A6A');
    camEnd();
    nv(t, 'CAM 1 · BASE CAMP', [], { osd: () => {
      if (fog > 0) { ctx.save(); ctx.globalAlpha = .75 * fog; ctx.filter = 'blur(2px)'; ctx.fillStyle = '#CFE9CF'; ctx.fillRect(0, 0, W, H); ctx.restore(); if (wipe > 0 && wipe < 1) { ctx.save(); ctx.globalAlpha = .9; ctx.fillStyle = '#4A2A1A'; const wx = lerp(-300, W + 300, wipe); ctx.beginPath(); ctx.ellipse(wx, 560, 260, 420, .3, 0, TAU); ctx.fill(); ctx.restore(); } }
      // the menu
      const mk = seg(t, a - .2, a + .3); if (mk <= 0) return;
      const X = 1100, Y = 230, w = 700, rh = 92;
      ctx.save(); ctx.globalAlpha = .82 * mk; ctx.fillStyle = '#0A1A0A'; ctx.fillRect(X - 30, Y - 80, w, 680); ctx.globalAlpha = mk; ctx.strokeStyle = OSD; ctx.lineWidth = 3; ctx.strokeRect(X - 30, Y - 80, w, 680); ctx.restore();
      osdText('MOST LIKELY CAUSE', X, Y - 34, 40, OSD, { bold: true, alpha: mk });
      const drop = ease(seg(t, tLast - .2, tRes + .6));
      ROWS.forEach((s, i) => { const k = seg(t, [tTool, tDes, tBr, tLooks][i] - .4, [tTool, tDes, tBr, tLooks][i]); const y = Y + 50 + i * rh; osdText(`${i + 1}.`, X, y, 44, OSD, { alpha: mk }); if (k > 0) { osdText(s.slice(0, Math.ceil(s.length * k)), X + 70, y, 44, '#FFFFFF', { bold: true }); } else osdText('- - -', X + 70, y, 44, 'rgba(184,255,176,.45)'); });
      // SUPERPOSITION starts at the top and drops to the bottom
      const sy = lerp(Y + 50, Y + 50 + 4 * rh, drop), blink = Math.floor(t * 3) % 2;
      if (drop < .02) { ctx.save(); ctx.fillStyle = '#0A1A0A'; ctx.fillRect(X + 60, sy - 36, 560, 72); ctx.restore(); }
      osdText(drop > .5 ? '5.' : '', X, sy, 44, OSD);
      osdText('> SUPERPOSITION', X + 40, sy, 44, drop < 1 && blink ? '#FFFFFF' : '#FF9AE0', { bold: true, alpha: mk });
      if (t > tRes) osdText('the last resort', X + 70, sy + 50, 32, '#FF9AE0', { alpha: seg(t, tRes, tRes + .4) });
      if (t > tRad - .2) osdText('most radical · hardest to test', X + 70, sy + 50 + 38, 28, OSD, { alpha: seg(t, tRad - .2, tRad + .3) * (1 - seg(t, tHard + 1.8, tHard + 2.2)) });
      if (t > tSym - .2) osdText('only symptom: ???', X + 70, sy + 50 + 38, 28, OSD, { alpha: seg(t, tHard + 2.2, tHard + 2.5) });
    } });
    if (t > tSense - .4 && t < tSense + 1.4) sfx('?', 900, 700, 120, OSD, t - tSense + .4, { face: 'marker', life: 1.8 });
  }

  // ---------- 6 · little evidence; the knot, cornered, is a loose ball of string; the screen turns into a game ----------
  // a tiny 5x7 pixel font for the game screen
  const PF = { L: '#....#....#....#....#....#....#####', E: '######....#....####.#....#....#####', V: '#...##...##...##...##...#.#.#..#..', 1: '..#...##....#....#....#....#...###.', P: '####.#...##...#####.#....#....#....', R: '####.#...##...#####.#.#..#..#.#...#', S: '.#####....#.....###.....#....######.', T: '#####..#....#....#....#....#....#..', A: '.###.#...##...#######...##...##...#', ' ': '...................................', '!': '..#....#....#....#....#.........#..', C: '.###.#...##....#....#....#...#.###.', I: '.###...#....#....#....#....#...###.', Y: '#...##...#.#.#...#....#....#....#..', O: '.###.#...##...##...##...##...#.###.', D: '####.#...##...##...##...##...#####.', N: '#...###..##.#.##..###...##...##...#' };
  function pxText(s, x, y, px, col) { const cw = 6 * px, w0 = s.length * cw - px; let xx = x - w0 / 2; ctx.fillStyle = col; for (const c of s) { const g = PF[c] || PF[' ']; for (let i = 0; i < 35; i++) if (g[i] === '#') ctx.fillRect(Math.round(xx + (i % 5) * px), Math.round(y + Math.floor(i / 5) * px), px, px); xx += cw; } }
  function gameScreen(t, k) {
    const P = 8, K = { ink: '#1A1C2C', navy: '#29366F', blue: '#3B5DC9', sky: '#41A6F6', cyan: '#73EFF7', green: '#38B764', lime: '#A7F070', gold: '#FFCD75', orange: '#EF7D57', red: '#B13E53', white: '#F4F4F4', slate: '#566C86' };
    ctx.save(); ctx.globalAlpha = k;
    for (let y = 0; y < H; y += P * 4) { ctx.fillStyle = mixCol(K.navy, K.sky, y / H); ctx.fillRect(0, y, W, P * 4); }
    // an isometric pixel island with little buildings
    const cx = 960, cy = 640;
    for (let r = 0; r < 12; r++) for (let c = 0; c < 12; c++) { const x = cx + (c - r) * 40, y = cy + (c + r) * 20 - 240; ctx.fillStyle = (r + c) % 2 ? K.green : K.lime; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 40, y + 20); ctx.lineTo(x, y + 40); ctx.lineTo(x - 40, y + 20); ctx.closePath(); ctx.fill(); }
    [[2, 3, 5, K.orange], [5, 2, 8, K.blue], [7, 6, 4, K.red], [3, 8, 6, K.gold], [8, 3, 10, K.slate]].forEach(([r, c, hgt, col]) => { const x = cx + (c - r) * 40, y = cy + (c + r) * 20 - 240, hh = hgt * P * 2; ctx.fillStyle = col; ctx.fillRect(x - 32, y + 20 - hh, 64, hh); ctx.fillStyle = mixCol(col, '#000000', .3); ctx.fillRect(x, y + 20 - hh, 32, hh); for (let j = 0; j < hgt; j += 2) { ctx.fillStyle = Math.floor(t * 4 + j + r) % 3 ? K.gold : K.ink; ctx.fillRect(x - 24, y + 12 - hh + j * P * 2 + P, P * 2, P * 2); } });
    pxText('LEVEL 1', 960, 150, 14, K.white);
    if (Math.floor(t * 2.5) % 2) pxText('PRESS START', 960, 900, 9, K.gold);
    ctx.restore();
  }
  function rgbTear(t, k) { if (k <= 0) return; ctx.save(); const f = Math.floor(t * 24); for (let i = 0; i < 14; i++) { const y = hash(f * 3.7 + i) * H, h = 10 + hash(f + i * 9) * 70, dx = (hash(f * 1.9 + i) - .5) * 260 * k; ctx.drawImage(CANVAS, 0, y, W, h, dx, y, W, h); } ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .3 * k; ctx.fillStyle = '#FF0040'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function evidence(t, lt, dur) {
    const a = cs('sg_evidence'), tAnt = wt('sg_evidence', 'Anthropic'), t22 = wt('sg_evidence', '2022'), tDef = wt('sg_evidence', 'default'), tInt = wt('sg_evidence', 'intuitive'), tLit = wt('sg_evidence', 'little'), tTo = wt('sg_evidence', 'To');
    const tNo = wt('sg_evidence', 'no'), tCirc = wt('sg_evidence', 'circuit'), t19 = wt('sg_evidence', '2019'), tAnd = wt('sg_evidence', 'And'), tMis = wt('sg_evidence', 'mistake'), e = ce('sg_evidence');
    const cut = tTo - .3, gl0 = wt('sg_evidence', 'mistake') + 1.15, gl1 = chapStart('ch09') - .05;
    if (t < cut) {
      camKeys(t, [[a - .3, 960, 500, 1.05], [tDef, 960, 460, 1.16], [tLit, 960, 440, 1.24], [cut, 960, 440, 1.26]], .4);
      desk(t, 'FILE 2022');
      crt(t, (w, h) => {
        ctx.fillStyle = '#F6F2E8'; ctx.fillRect(60, 30, w - 120, h - 60);
        ctx.fillStyle = INKD; ctx.font = `700 40px ${SERIF}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('ANTHROPIC · 2022', 110, 90);
        ctx.fillRect(110, 122, w - 220, 3);
        // greeked body text, with the quoted lines legible
        for (let i = 0; i < 9; i++) { ctx.fillStyle = 'rgba(40,40,40,.25)'; ctx.fillRect(110, 160 + i * 38, (w - 220) * (.6 + .4 * hash(i * 3)), 12); }
        const q1 = seg(t, tDef - .6, tDef + .2), q2 = seg(t, tLit - .3, tLit + .3);
        if (q1 > 0) { ctx.save(); ctx.globalAlpha = q1; ctx.fillStyle = 'rgba(255,240,140,.9)'; ctx.fillRect(100, 205, 610, 58); ctx.fillStyle = INKD; ctx.font = `italic 700 46px ${SERIF}`; ctx.fillText('"treated as the default"', 110, 234); ctx.restore(); }
        if (q2 > 0) { ctx.save(); ctx.fillStyle = 'rgba(255,211,107,.95)'; ctx.fillRect(100, 340, 640 * easeOut(q2), 110); ctx.fillStyle = '#B0203A'; ctx.font = `italic 700 84px ${SERIF}`; ctx.globalAlpha = clamp(q2 * 2); ctx.fillText('little evidence', 120, 396); ctx.restore(); }
      }, { bg: '#2A2A2A' });
      viewer(t, [[a, 'suspicious'], [tLit, 'surprised']], { x: 280 });
      camEnd();
      lower8(t, tAnt - .3, tDef - .6, 'an Anthropic paper, 2022');
      lower8(t, tInt - .4, cut + .2, 'it feels intuitive, but…');
      return;
    }
    // the final night: the knot, cornered against the rocks
    const [hx, hy] = shakeXY(t, t > tAnd - .2 && t < tMis + .3 ? 10 : 4);
    camKeys(t, [[cut, 900, 600, 1.05], [t19, 1100, 680, 1.3], [tAnd, 1250, 800, 1.65], [tMis + .4, 1240, 800, 1.7], [gl1 + 3, 1230, 790, 1.72]].map(k => [k[0], k[1] + hx, k[2] + hy, k[3]]), 1.4);
    woods('h', { seed: 29 });
    flat([[1100, GROUND + 40], [1200, 520], [1420, 430], [1700, 480], [1820, GROUND + 40]], '#6A6A6A'); flat([[1300, 600], [1420, 470], [1560, 520], [1520, 640]], '#7A7A7A');
    const loose = ease(seg(t, tAnd + .3, tMis + .1)), take = seg(t, tMis + .3, tMis + 1);
    const ks = lerp(100, 60, loose), kx = 1360, ky = lerp(800, 900, loose) + (1 - loose) * 4 * Math.sin(t * 30);
    if (loose < .9) cryptid(t, kx, ky, ks, { look: [-1, .2], loose, hat: loose < .5, grin: false, alpha: 1 - seg(loose, .6, .9) });
    if (loose > .6 && take <= 0) stringBall(kx, ky + 30, 40, seg(loose, .6, .9));
    // Clawd creeps up, nets it, and pockets the string
    const creep = ease(seg(t, cut, tAnd - .1)), cx = lerp(560, 1150, creep), sw = env(t, tAnd - .3, tAnd + .5, .25, .3);
    const hold = take > 0 && take < .8 ? (u, w) => stringBall(u * 1.8, 0, u * 1.8, 1) : null;
    hunter(t, cx, GROUND + 60, 13, { ...emotions(t, [[cut, 'determined'], [t19, 'suspicious'], [tAnd + .3, 'surprised'], [tMis + .3, 'smug']]), view: 'q', walk: creep > 0 && creep < 1 ? (t - cut) * 1.2 : undefined, aR: take > 0 ? (take < .45 ? lerp(.4, 1.3, take / .45) : lerp(1.3, -.8, (take - .45) / .35)) : .6 + 1.3 * sw, armR: take > 0 ? hold : net(sw), aL: .9, armL: pennant, lampA: .42, bag: true, boilKey: 'c8hunter' });
    if (take > .8 && take < 1) sfx('pocketed.', cx, GROUND - 260, 50, '#FFFFFF', (t - (wt('sg_evidence', 'mistake') + .3 + .56)), { face: 'marker' });
    // the dropped party hat lies in the leaves
    if (loose > .6) hatOn('party', kx + 120, GROUND + 20, 60);
    camEnd();
    const gk = seg(t, gl0, gl1), sw2 = seg(t, gl1 - .45, gl1 - .1);
    nv(t, 'CAM 7 · FINAL NIGHT', [cut], { osd: () => {
      if (t > tNo - .2 && t < tMis - .3) osdText('LAST REAL SUPERPOSITION CIRCUIT: 2019', 960, 240, 46, '#FFFFFF', { align: 'center', bold: true, alpha: seg(t, tNo - .2, tNo + .3) });
      if (t > tMis - .2 && t < gl0 + .1) osdText('...A MISTAKE.', 960, 240, 56, '#FFFFFF', { align: 'center', bold: true, alpha: seg(t, tMis - .2, tMis + .2) });
      // the screen glitches and becomes a game screen
      if (gk > 0) { rgbTear(t, Math.sin(gk * Math.PI) + sw2); if (Math.floor(t * 24) % 3 === 0 && gk < .9) staticBars(t, [t]); }
      if (sw2 > 0) gameScreen(t, sw2 > .5 ? 1 : sw2 * 2 * (Math.floor(t * 24) % 2));
    } });
  }

  shots([[chapStart('ch08'), believer], [cs('sg_pr') - .3, pr], [cs('sg_colorado') - .3, colorado], [cs('sg_moving') - .3, moving], [cs('sg_last') - .3, last], [cs('sg_evidence') - .3, evidence]]);
})();
