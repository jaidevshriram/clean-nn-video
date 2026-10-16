// ch02 The knot · a 1930s RUBBER-HOSE EDUCATIONAL CARTOON (grey film, scratches, flicker, iris cuts, art-deco title
// cards). The theory everyone was taught: a bouncing street of neuron-houses with one that makes no sense (cats AND
// cars), "polysemantic", the last district where nothing makes sense, superposition as strangers sharing capsule beds in
// shifts (rarely colliding; BONK when they do), the city as a knot, the Unfolding Machine, and "Nick believed it" (a
// young believer, years ago). At the end the reel burns through.
(() => {
  // the machine with its jargon name plate dropped (machine() letters it on top of everything, even the iris);
  // this world paints its own plate, under the grey grade
  function machineL(t, x, y, s, o) { const n = LETTERS.length, C0 = CAM; CAM = null; machine(t, x, y, s, o); CAM = C0; LETTERS.length = n; }   // (its only lettering is the plate)
  // a hand-painted sign on a stick pointing at (x, y) from (x + dx, y + dy); k 0..1 pops it in
  function hoseTag(s, x, y, dx, dy, k, size = 44) {
    if (k <= 0) return; const tx = x + dx, ty = y + dy, w = s.length * size * .62 + 50, h = size * 1.5;
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(lerp(x, tx, clamp(k * 1.5)), lerp(y, ty, clamp(k * 1.5))); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(tx, ty); ctx.scale(backOut(k), backOut(k)); ctx.rotate(-.04); fillS('#F4F1E8', () => ctx.rect(-w / 2, -h / 2, w, h), 5); txt(s, 0, 3, size, INK, { font: 'serif', weight: '900' }); ctx.restore();
  }
  const V = 'blog/raw/v-figure-10x/', PE = 'blog/raw/pose-everywhere/';
  const CAT = [V + 'p47742', V + 'c5a352d'], CAR = [V + 'c4d201c', V + 'c4d201d', V + 'pCarX5'];
  const MIX = [V + 'p47742', V + 'c5a94a', V + 'pPool13', V + 'n282687', V + 'n1158528', V + 'c4d201c', V + 'c5a94c', V + 'n1070575', V + 'c5a317d', V + 'n132986'];
  const INK = '#111111', PAPERC_ = '#E9E4D6';
  const beat = t => Math.sin(bpOf(t) * Math.PI);   // a bounce on the beat (−1..1)

  // ---------- 1930s drawing kit ----------
  const fillS = (col, f, lw = 6) => { ctx.fillStyle = col; ctx.strokeStyle = INK; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); f(); ctx.fill(); ctx.stroke(); };
  // a rubber-hose character: round body, noodle limbs, white gloves, pie eyes. o: col, hat, walk (phase), flip, armUp,
  // armUp2, mood ('happy' | 'sleep' | 'ouch' | 'wow' | 'sad'), lean, sq (squash), key
  function hoseGuy(x, y, s, o = {}) {
    ctx.save(); ctx.translate(x, y); ctx.scale((o.flip ? -1 : 1) * s * (1 + (o.sq || 0)), s * (1 - (o.sq || 0))); ctx.rotate(o.lean || 0);
    ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = 9;
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 6, 60, 10, 0, 0, TAU); ctx.fill();
    const wk = o.walk, legA = wk != null ? Math.sin(wk * TAU) : .3, bob = wk != null ? Math.abs(Math.sin(wk * TAU)) * 8 : 0;
    const leg = (sx, ph) => { ctx.beginPath(); ctx.moveTo(sx, -60); ctx.bezierCurveTo(sx + 30 * ph, -30, sx - 20 * ph, -10, sx + 10 * ph, 0); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(sx + 10 * ph + 14, 2, 26, 12, 0, 0, TAU); ctx.fill(); };
    leg(-18, legA); leg(18, -legA);
    ctx.translate(0, -bob);
    ctx.fillStyle = o.col || '#222'; ctx.beginPath(); ctx.ellipse(0, -110, 56, 62, 0, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.ellipse(0, -96, 34, 30, 0, 0, TAU); ctx.fill();
    const arm = (sd, up) => { ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(sd * 50, -120); ctx.bezierCurveTo(sd * 90, -140 - up * 60, sd * 70, -60 - up * 120, sd * 100, -90 - up * 110); ctx.stroke(); ctx.fillStyle = '#FFF'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(sd * 104, -96 - up * 110, 22, 18, 0, 0, TAU); ctx.fill(); ctx.stroke(); };
    arm(-1, o.armUp ?? (wk != null ? .1 * legA : 0)); arm(1, o.armUp2 ?? (wk != null ? -.1 * legA : .3));
    ctx.lineWidth = 9; ctx.fillStyle = o.col || '#222'; ctx.beginPath(); ctx.arc(0, -210, 50, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.ellipse(0, -195, 38, 28, 0, 0, TAU); ctx.fill();
    const m = o.mood || 'happy';
    for (const ex of [-16, 16]) {
      ctx.fillStyle = '#FFF'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(ex, -222, 14, m === 'wow' ? 24 : 20, 0, 0, TAU); ctx.fill(); ctx.stroke();
      if (m === 'sleep') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 10, -220); ctx.lineTo(ex + 10, -220); ctx.stroke(); }
      else if (m === 'ouch') { ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ex - 8, -230); ctx.lineTo(ex + 8, -214); ctx.moveTo(ex + 8, -230); ctx.lineTo(ex - 8, -214); ctx.stroke(); }
      else { const lx = (o.look || 0) * 4; ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(ex + lx, -216); ctx.arc(ex + lx, -216, 9, -Math.PI * .35, Math.PI * 1.35); ctx.closePath(); ctx.fill(); }
    }
    ctx.lineWidth = 5; ctx.beginPath();
    if (m === 'sleep' || m === 'sad') { ctx.moveTo(-14, -183); ctx.quadraticCurveTo(0, m === 'sad' ? -192 : -185, 14, -183); }
    else if (m === 'wow' || m === 'ouch') { ctx.ellipse(0, -182, 9, 12, 0, 0, TAU); }
    else ctx.arc(0, -192, 16, .1 * Math.PI, .9 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, -200, 10, 7, 0, 0, TAU); ctx.fill();
    const h = o.hat;
    if (h === 'top') { ctx.fillStyle = INK; ctx.fillRect(-40, -266, 80, 14); ctx.fillRect(-26, -320, 52, 58); }
    if (h === 'bowler') { fillS(INK, () => { ctx.ellipse(0, -254, 50, 9, 0, 0, TAU); }, 3); fillS(INK, () => { ctx.ellipse(0, -258, 32, 28, 0, Math.PI, TAU); }, 3); }
    if (h === 'sailor') { fillS('#FFF', () => { ctx.moveTo(-34, -250); ctx.lineTo(-26, -276); ctx.lineTo(26, -276); ctx.lineTo(34, -250); ctx.closePath(); }, 4); }
    if (h === 'chef') { fillS('#FFF', () => { ctx.moveTo(-30, -252); ctx.lineTo(-40, -300); ctx.arc(0, -300, 40, Math.PI, TAU); ctx.lineTo(30, -252); ctx.closePath(); }, 4); }
    if (h === 'night') { fillS('#DDD', () => { ctx.moveTo(-42, -248); ctx.quadraticCurveTo(0, -330, 70, -270); ctx.lineTo(30, -250); ctx.closePath(); }, 4); fillS('#FFF', () => ctx.arc(72, -268, 10, 0, TAU), 3); }
    if (h === 'cap') { fillS('#555', () => { ctx.moveTo(-40, -250); ctx.quadraticCurveTo(0, -300, 40, -250); ctx.lineTo(75, -246); ctx.lineTo(40, -240); ctx.closePath(); }, 4); }
    if (o.prop) o.prop();
    ctx.restore();
  }
  // a rubber-hose neuron house: it breathes and bounces, its two windows are its eyes (photos inside), the door its mouth.
  // o: imgs [l, r], sq (squash), cat 0..1 (cat ears + whiskers), car 0..1 (headlights + grille), arms (shrug 0..1),
  // mood ('smile' | 'o' | 'wobble' | 'grin'), lean, sign
  function hoseHouse(x, y, w, h, o = {}) {
    const sq = o.sq || 0;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.lean || 0); ctx.scale(1 + sq, 1 - sq);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.ellipse(0, 6, w * .6, 12, 0, 0, TAU); ctx.fill();
    // noodle arms (behind the body)
    if (o.arms != null) for (const sd of [-1, 1]) { const up = o.arms; ctx.strokeStyle = INK; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sd * w * .45, -h * .45); ctx.bezierCurveTo(sd * w * .75, -h * .4 - up * 60, sd * w * .7, -h * .3 - up * 140, sd * w * .82, -h * .5 - up * 120); ctx.stroke(); ctx.fillStyle = '#FFF'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(sd * w * .84, -h * .52 - up * 120, 24, 19, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
    // body: a soft rounded box, a little wider at the bottom
    fillS(o.col || '#D8D3C6', () => { ctx.moveTo(-w * .5, 0); ctx.bezierCurveTo(-w * .56, -h * .4, -w * .46, -h * .8, -w * .42, -h); ctx.lineTo(w * .42, -h); ctx.bezierCurveTo(w * .46, -h * .8, w * .56, -h * .4, w * .5, 0); ctx.closePath(); }, 7);
    // roof
    fillS(o.roofCol || '#333', () => { ctx.moveTo(-w * .58, -h + 10); ctx.quadraticCurveTo(0, -h - w * .62, w * .58, -h + 10); ctx.closePath(); }, 7);
    // chimney with puffs
    fillS('#555', () => ctx.rect(w * .18, -h - w * .44, w * .12, w * .2), 5);
    // cat ears on the roof
    const ck = clamp(o.cat || 0), rk = clamp(o.car || 0);
    if (ck > 0) for (const sd of [-1, 1]) fillS('#333', () => { ctx.moveTo(sd * w * .2, -h - w * .3); ctx.lineTo(sd * w * .42, -h - w * (.3 + .5 * ck)); ctx.lineTo(sd * w * .52, -h - w * .05); ctx.closePath(); }, 6);
    // window eyes with photos
    const ew = w * .26, eh = h * .3, ey = -h * .72;
    (o.imgs || []).forEach((im, i) => {
      const ex = (i ? 1 : -1) * w * .2 - ew / 2;
      ctx.save(); const p = new Path2D(); p.ellipse(ex + ew / 2, ey + eh / 2, ew / 2, eh / 2 * (o.blink ? .1 : 1), 0, 0, TAU); ctx.clip(p);
      ctx.fillStyle = '#FFF'; ctx.fillRect(ex, ey, ew, eh); const I = img(im), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, ex, ey, ew, eh); ctx.restore();
      ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(ex + ew / 2, ey + eh / 2, ew / 2, eh / 2 * (o.blink ? .1 : 1), 0, 0, TAU); ctx.stroke();
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk; ctx.strokeStyle = '#FFF'; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(ex + ew / 2, ey + eh / 2, ew / 2 + 8, eh / 2 + 8, 0, 0, TAU); ctx.stroke(); ctx.restore(); glow(ex + ew / 2, ey + eh / 2, ew * 1.4, '#FFFFFF', .6 * rk); }
    });
    // door mouth (or a car grille)
    const md = o.mood || 'smile';
    if (rk > .5) { fillS('#999', () => ctx.rect(-w * .3, -h * .32, w * .6, h * .2), 6); ctx.strokeStyle = INK; ctx.lineWidth = 4; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-w * .3 + i * w * .1, -h * .32); ctx.lineTo(-w * .3 + i * w * .1, -h * .12); ctx.stroke(); } fillS('#DDD', () => ctx.rect(-w * .52, -h * .1, w * 1.04, h * .07), 5); }
    else {
      fillS('#2A2A2A', () => { if (md === 'o') ctx.ellipse(0, -h * .2, w * .1, h * .1, 0, 0, TAU); else if (md === 'wobble') { ctx.moveTo(-w * .16, -h * .2); for (let i = 0; i <= 8; i++) ctx.lineTo(-w * .16 + i * w * .04, -h * .2 + (i % 2 ? -8 : 8)); ctx.lineTo(w * .16, -h * .08); ctx.lineTo(-w * .16, -h * .08); ctx.closePath(); } else { ctx.moveTo(-w * .2, -h * .28); ctx.quadraticCurveTo(0, md === 'grin' ? -h * .02 : -h * .08, w * .2, -h * .28); ctx.closePath(); } }, 6);
      if (md === 'smile' || md === 'grin') { fillS('#FFF', () => ctx.rect(-w * .12, -h * .27, w * .24, h * .05), 3); }
    }
    // whiskers
    if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; ctx.strokeStyle = INK; ctx.lineWidth = 4; for (const sd of [-1, 1]) for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(sd * w * .3, -h * .3 + i * 12); ctx.lineTo(sd * w * .75, -h * .34 + i * 26); ctx.stroke(); } ctx.restore(); }
    if (o.sign) { fillS('#FFF', () => ctx.rect(-w * .3, -h * .5, w * .6, h * .1), 4); txt(o.sign, 0, -h * .45, Math.min(34, h * .07), INK, { font: 'serif', weight: '900' }); }
    ctx.restore();
  }
  // a cartoon backdrop: sky with outlined puffy clouds, rolling hills, a road
  function backdrop(t, o = {}) {
    bg(PAPERC_); GRAIN = .9;
    for (let i = 0; i < 5; i++) { const cx = (i * 560 + t * 18) % 2800 - 440, cy = 150 + (i % 2) * 70, B = [0, 1, 2, 3].map(k => [cx + k * 60 - 90, cy + (k % 2) * -24]); ctx.strokeStyle = INK; ctx.lineWidth = 10; for (const [x, y] of B) { ctx.beginPath(); ctx.arc(x, y, 52, 0, TAU); ctx.stroke(); } ctx.fillStyle = '#F4F1E8'; for (const [x, y] of B) { ctx.beginPath(); ctx.arc(x, y, 52, 0, TAU); ctx.fill(); } }
    fillS('#BDB6A6', () => { ctx.moveTo(-400, 760); for (let i = -2; i <= 15; i++) ctx.quadraticCurveTo(i * 170 - 85, 640 + ((i + 2) % 2) * 50, i * 170, 700); ctx.lineTo(W + 500, H + 260); ctx.lineTo(-400, H + 260); ctx.closePath(); }, 6);
    fillS('#9A9488', () => ctx.rect(-400, o.groundY ?? 880, W + 900, 600), 6);
    for (let i = -2; i < 13; i++) { ctx.fillStyle = '#F4F1E8'; ctx.fillRect(i * 220 + 40, (o.groundY ?? 880) + 70, 110, 14); }
  }
  // an art-deco title card in screen space; k 0..1 slides it in
  function decoCard(lines, k, o = {}) {
    if (k <= 0) return;
    ctx.save(); let tw = 0; lines.forEach(([s_, size], i) => { ctx.font = `${i ? '400' : '900'} ${size}px serif`; tw = Math.max(tw, ctx.measureText(s_).width); }); ctx.restore();
    const w = Math.max(o.w ?? 1300, tw + 300), h = o.h ?? 560, x = o.x ?? W / 2, y = (o.y ?? H / 2) + (1 - easeOut(k)) * 60, a = o.full ? easeInOut(clamp(k)) : ease(clamp(k * 1.25));   // a full-frame card dissolves, never pops
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y);
    if (o.full) { ctx.fillStyle = '#0E0E10'; ctx.fillRect(-W, -H, W * 2, H * 2); }
    ctx.fillStyle = '#141414'; ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.strokeStyle = '#EDE6D4'; ctx.lineWidth = 6; ctx.strokeRect(-w / 2 + 24, -h / 2 + 24, w - 48, h - 48); ctx.lineWidth = 2; ctx.strokeRect(-w / 2 + 40, -h / 2 + 40, w - 80, h - 80);
    // corner fans
    for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(sx * (w / 2 - 40), sy * (h / 2 - 40)); const a0 = Math.atan2(-sy, -sx) - .5 + i * .25; ctx.lineTo(sx * (w / 2 - 40) + Math.cos(a0) * 90, sy * (h / 2 - 40) + Math.sin(a0) * 90); ctx.stroke(); }
    ctx.restore();
    lines.forEach(([s, size, dy, col], i) => txt(s, x, y + dy, size, col || '#EDE6D4', { font: 'serif', weight: i ? '400' : '900' }));
  }
  // the classic iris: black outside a circle of radius r around (cx, cy)
  const irisAt = (r, cx = W / 2, cy = H / 2) => { if (r < 1600) iris(cx, cy, Math.max(0, r), '#0A0A0A'); };
  // closing iris: the open area shrinks at an even rate (radius ~ sqrt), so no frame jumps
  // the iris stops at a small peephole (never a black frame) and the next shot opens from the same peephole
  const irisR = k => Math.sqrt(70 * 70 + (1400 * 1400 - 70 * 70) * k);
  const irisClose = (u, cx, cy) => irisAt(irisR(1 - (easeInOut(clamp(u)) * .5 + clamp(u) * .5)), cx, cy);
  const irisOpen = (u, cx, cy) => { if (u < 1) irisAt(irisR(easeInOut(clamp(u)) * .5 + clamp(u) * .5), cx, cy); };
  // stars circling a bonked head
  function bonkStars(x, y, t, k = 1) { for (let i = 0; i < 4; i++) { const a = t * 6 + i * TAU / 4; paint(starPts(x + Math.cos(a) * 70, y + Math.sin(a) * 18, 16 * k, .45, 5), { wash: '#FFFFFF', ink: INK, sw: 1.2 }); } }
  // grey film: Skia's own filters (much faster than a per-pixel pass), then a warm paper multiply
  let GC = null;
  function oldFilm(t) {
    POST.push(() => { if (!GC) GC = createCanvas(W, H); const c = GC.getContext('2d'); c.filter = 'grayscale(1) contrast(1.35)'; c.drawImage(CANVAS, 0, 0); c.filter = 'none'; ctx.drawImage(GC, 0, 0); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#F4F0E4'; ctx.fillRect(0, 0, W, H); ctx.restore(); });
    fxFilm(t, 1);
  }

  // ---------- shot 1 · the bouncing street; the house that makes no sense: cats AND cars; "polysemantic" ----------
  function street(t, lt, dur) {
    const a = cs('kn_problem'), tsn = wt('kn_problem', 'sense'), c0 = cs('kn_catcar'), tinc = wt('kn_catcar', 'Inception'), tcat = wt('kn_catcar', 'cat'), tcar = wt('kn_catcar', 'cars'), tcc = wt('kn_catcar', 'Cats'), tcom = wt('kn_catcar', 'What'), p0 = cs('kn_poly'), tpoly = wt('kn_poly', 'polysemantic'), tworse = wt('kn_poly', 'worse');
    camKeys(t, [[chapStart('ch02'), 960, 560, 1], [a + .6, 960, 560, 1], [tsn, 960, 520, 1.25], [tcat - .6, 960, 470, 1.45], [tcom, 960, 470, 1.5], [p0 + .5, 960, 520, 1.15]], .5);
    backdrop(t);
    const b = beat(t);
    // the sensible neighbours: dogs, a candle, a clock, all happily bouncing to the music
    const NB = [[180, [PE + 'large/0', PE + 'medium/0']], [520, [V + 'c5a94a', V + 'c5a94a']], [1400, [V + 'n1158528', V + 'n1158528']], [1740, [PE + 'large/4', PE + 'medium/4']]];
    NB.forEach(([x, imgs], i) => hoseHouse(x, 890, 250, 330, { imgs, sq: .05 * b * (i % 2 ? 1 : -1), lean: .05 * b * (i % 2 ? -1 : 1), mood: 'smile', blink: Math.floor(t * 1.3 + i) % 7 === 0 }));
    // the odd one: cat → car → cat-car, and a shrug
    const catK = env(t, tcat - .3, tcar - .1, .3, .2) + (t > tcc ? (Math.floor(t * 6) % 2 ? 1 : 0) * (1 - seg(t, tcom - .2, tcom)) : 0);
    const carK = env(t, tcar - .2, tcc, .25, .1) + (t > tcc ? (Math.floor(t * 6) % 2 ? 0 : 1) * (1 - seg(t, tcom - .2, tcom)) : 0);
    const flick = Math.floor(t * 2.2) % 2, imgs = catK > .5 ? CAT : carK > .5 ? [CAR[0], CAR[1]] : flick ? [CAT[0], CAR[0]] : [CAR[2], CAT[1]];
    const odd = t < tsn ? .03 * Math.sin(t * 17) : 0;
    const shrug = env(t, tcom + .2, p0 + .3, .25, .3);
    hoseHouse(960, 890, 320, 400, { imgs, cat: catK, car: carK, sq: .06 * -b + (t > tcc && t < tcom ? .05 * Math.sin(t * 40) : 0), lean: odd, arms: shrug, mood: catK > .5 ? 'grin' : shrug > .3 ? 'wobble' : 'o' });
    if (t > tcat - .1 && t < tcat + 1) sfx('MEOW!', 1300, 380, 70, INK, t - tcat + .1, { life: 1, face: 'serif' });
    if (t > tcar - .1 && t < tcar + 1) sfx('HONK!', 1300, 380, 70, INK, t - tcar + .1, { life: 1, face: 'serif' });
    // Clawd, top hat on, tries to work it out
    tourist(1240, 900, 10, 'top', { ...emotions(t, [[a - 2, 'happy'], [tsn, 'suspicious'], [tcat, 'surprised'], [tcc, 'confused'], [p0, 'thinking']]), view: 'q', flip: true });
    camEnd();
    // lower card: "Inception V1"
    if (t > tinc - .4 && t < tcat - .4) decoCard([['an older image model: Inception V1', 60, 4]], seg(t, tinc - .4, tinc + .1) * (1 - seg(t, tcat - .9, tcat - .4)), { y: 960, h: 150, w: 1000 });
    if (t > tcc - .2 && t < p0) decoCard([['CATS & CARS?', 90, 6]], seg(t, tcc - .2, tcc + .3) * (1 - seg(t, p0 - .4, p0)), { y: 160, h: 190, w: 900 });
    // the full title card: POLYSEMANTIC
    const pk = seg(t, tpoly - 1.1, tpoly + .1) * (1 - seg(t, tworse - 1.5, tworse - .5));
    decoCard([['POLYSEMANTIC', 130, -40], ['one neuron · many meanings', 54, 90]], pk, { full: true, w: 1500, h: 600 });
    // iris out on "worse"
    if (t > tworse - .7) irisClose(seg(t, tworse - .7, tworse + .4), 960, 600);
    oldFilm(t);
  }

  // ---------- shot 2 · the last district: crooked houses, nothing makes sense ----------
  function lastDistrict(t, lt, dur) {
    const tl = wt('kn_poly', 'last'), tall = wt('kn_poly', 'all'), r0 = cs('kn_roommates');
    const st = wt('kn_poly', 'worse') + .4;
    camKeys(t, [[st, 900, 560, 1.15], [r0, 1020, 540, 1]], .6);
    backdrop(t, { groundY: 860 });
    for (let i = 0; i < 6; i++) { const x = 140 + i * 330, ph = t * (1.3 + hash(i) * 2) + i * 2; hoseHouse(x, 870, 240 + 40 * hash(i), 300 + 120 * hash(i * 3), { imgs: [MIX[i % MIX.length], MIX[(i * 3 + 4 + Math.floor(t * 1.5)) % MIX.length]], lean: .14 * Math.sin(ph), sq: .08 * Math.sin(ph * 1.7), mood: ['wobble', 'o', 'grin'][i % 3], cat: i === 2 ? .7 : 0, car: i === 4 ? .7 : 0 }); }
    for (let i = 0; i < 7; i++) { const f = frac(t * .3 + hash(i)); txt(i % 2 ? '?' : '!?', 210 + i * 240, 600 - f * 400, 70, INK, { font: 'serif', weight: '900', rot: Math.sin(t * 3 + i) * .3 }); }
    const w = stroll(t, tl - 1, tall + 1, 2100, 1500, 10);
    tourist(w.x, 880, 10, 'top', { ...feel('scared', t), view: 'q', flip: true, walk: t < tall + 1 ? t * 2.4 : undefined });
    camEnd();
    decoCard([['THE LAST DISTRICT', 76, 0]], seg(t, tl - .3, tl + .3) * (1 - seg(t, r0 - .8, r0 - .4)), { y: 150, h: 160, w: 1000 });
    irisOpen(seg(t, st, st + .7), 960, 600);
    if (t > r0 - 1) irisClose(seg(t, r0 - 1, r0), 960, 560);
    oldFilm(t);
  }

  // ---------- shot 3 · SUPERPOSITION: more people than houses; a family per house ----------
  const JOB = ['bowler', 'sailor', 'chef', 'cap'], JCOL = ['#333', '#777', '#AAA', '#555'];
  function crowd(t, lt, dur) {
    const r0 = cs('kn_roommates'), tim = wt('kn_roommates', 'Imagine'), tmore = wt('kn_roommates', 'more'), tfam = wt('kn_roommates', 'family'), tstr = wt('kn_roommates', 'stranger');
    const tTh = wt('kn_roommates', 'The', 1), tneu = wt('kn_roommates', 'neurons'), tide = wt('kn_roommates', 'ideas'), tsim = wt('kn_roommates', 'similar');
    const cardK = seg(t, r0 - .2, r0 + .8) * (1 - seg(t, tim - 1.5, tim - .4));
    camKeys(t, [[r0, 960, 560, 1.05], [tim, 960, 560, 1.05], [tfam, 860, 560, 1.18], [tstr, 900, 560, 1.1]], .5);
    backdrop(t);
    const HX = [360, 760, 1160, 1560];
    HX.forEach((x, i) => hoseHouse(x, 890, 250, 300, { imgs: [], sq: .04 * beat(t + i * .2) + (i === 0 ? .08 * env(t, tfam + .2, tfam + 1.5, .2, .6) * Math.sin(t * 14) : 0), mood: i === 0 && t > tfam ? 'grin' : 'smile', col: '#D8D3C6' }));
    // 16 people march in; then the four bowler hats file into house 0 (they shrink through the door)
    for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) {
      const id = k * 4 + j, x0 = -200 - id * 110, xA = 260 + id * 92;
      let x = lerp(x0, xA, easeOut(seg(t, tim - .4 + id * .04, tmore + 1.6 + id * .04))), y = 1010 + (id % 2) * 24, s = .42, vis = 1;
      if (j === 0) { const k2 = seg(t, tfam - .9 + k * .25, tfam + .2 + k * .25); x = lerp(x, HX[0], easeInOut(k2)); y = lerp(y, 880, easeInOut(k2)); s = lerp(.42, .2, easeIn(k2)); vis = k2 < 1 ? 1 : 0; }
      const moving = t > tim - .4 + id * .04 && t < tmore + 1.6 + id * .04;
      if (vis) hoseGuy(x, y, s, { hat: JOB[j], col: JCOL[j], walk: moving ? t * 2.2 + id * .3 : null, mood: 'happy', armUp2: moving ? null : .2 * beat(t + id) });
    }
    if (t > tfam - .2) { const k = seg(t, tfam + .4, tfam + 1); for (let i = 0; i < 3; i++) if (k > 0 && k < 1) paint(heartPtsC(HX[0] + (i - 1) * 50, 520 - k * 140, 22), { wash: '#FFF', ink: INK, sw: 1.4 }); }
    tourist(1820, 1030, 9, 'top', { ...emotions(t, [[r0, 'happy'], [tmore, 'surprised'], [tfam + .3, 'love']]), view: 'q', flip: true });
    hoseTag('a neuron', HX[2] + 60, 700, 150, -140, seg(t, tneu - .3, tneu + .3) * (1 - seg(t, tsim - .4, tsim)));
    hoseTag('an idea', 260 + 9 * 92, 870, -150, -110, seg(t, tide - .3, tide + .3) * (1 - seg(t, tsim - .4, tsim)));
    camEnd();
    if (t > tmore - .3 && t < tTh) decoCard([['MORE PEOPLE THAN HOUSES', 64, 0]], seg(t, tmore - .3, tmore + .2) * (1 - seg(t, tTh - .4, tTh)), { y: 150, h: 150, w: 1150 });
    // the metaphor, spelled out: a house is a neuron, a person is an idea
    const mk = seg(t, tneu - .4, tneu + .1) * (1 - seg(t, tsim - .4, tsim));
    if (mk > 0) decoCard(t < tide - .3 ? [['HOUSES = NEURONS', 64, 0]] : [['HOUSES = NEURONS', 60, -38], ['PEOPLE = IDEAS', 60, 42]], mk, { y: t < tide - .3 ? 150 : 190, h: t < tide - .3 ? 150 : 230, w: 1000 });

    if (t > tfam - .3) decoCard([['a family per house', 64, 0]], seg(t, tfam - .3, tfam + .2) * (1 - seg(t, tstr - .6, tstr - .2)), { y: 150, h: 150, w: 900 });
    decoCard([['SUPERPOSITION', 140, -40], ['the leading explanation', 54, 90]], cardK, { full: true, w: 1500, h: 600 });
    if (t > tstr - .5) irisClose(seg(t, tstr - .5, tstr + .5), 500, 700);
    oldFilm(t);
  }

  // ---------- shot 4 · strangers sharing capsule beds in shifts; they rarely bump; the city is short on houses ----------
  const CAPS = []; for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) CAPS.push({ x: 300 + c * 345, y: 230 + f * 245, f, c });
  function hotel(t, lt, dur) {
    const tin = wt('kn_roommates', 'stranger') + .5, tsame = wt('kn_roommates', 'house', 1), tnev = wt('kn_roommates', 'never'), w0 = cs('kn_why'), tbump = wt('kn_why', 'bump'), twk = wt('kn_why', 'works'), tshort = wt('kn_why', 'short'), tpack = wt('kn_why', 'pack'), tcol = wt('kn_why', 'collide'), e = ce('kn_why');
    camKeys(t, [[tin, 840, 590, 1.9], [tnev - .3, 820, 590, 1.85], [tnev + 1.2, 900, 570, 1.3], [w0 + 2, 960, 560, 1], [tshort, 960, 560, .98], [tpack + .5, 960, 580, 1.06], [e, 960, 580, 1.1]], .5);
    bg('#E9E4D6'); GRAIN = .9;
    // wall clock and window (sun / moon) over the hotel
    const ang = t < tnev ? 0 : t < w0 + 1 ? (t - tnev) * 1.2 : (w0 + 1 - tnev) * 1.2 + (t - w0 - 1) * 3.2, day = Math.sin(ang * .5) > 0;
    flat(rectPts(240, 150, 1440, 830), '#CFC8B8', { line: INK, lw: 8 });
    // capsules
    const closed = c => t > tshort && (c.c === 3 || (c.c === 2 && c.f === 1)) ? seg(t, tshort + c.f * .2, tshort + .5 + c.f * .2) : 0;
    CAPS.forEach((c, i) => {
      flat(rrPts(c.x, c.y, 300, 200, 30), '#F4F1E8', { line: INK, lw: 6 }); flat(rrPts(c.x + 20, c.y + 140, 260, 40, 10), '#BDB6A6', { line: INK, lw: 4 });
      const cl = closed(c);
      if (cl > 0) { ctx.save(); ctx.globalAlpha = cl; for (const a of [-.3, .3]) { ctx.save(); ctx.translate(c.x + 150, c.y + 100); ctx.rotate(a); flat(rectPts(-170, -16, 340, 32), '#8A7A60', { line: INK, lw: 4 }); ctx.restore(); } ctx.restore(); }
    });
    // the shift: each capsule has two strangers; one sleeps while the other is out, and they swap when the clock turns
    const lying = (x, y, j, o = {}) => hoseGuy(x, y, .5, { hat: o.hat || JOB[j], col: JCOL[j], mood: o.mood || 'sleep', lean: -1.5, armUp: -.4, armUp2: -.4, sq: o.sq || 0 });
    CAPS.forEach((c, i) => {
      if (closed(c) > .5) return;
      if (t < tnev && i !== 5) return;   // first, only the demo capsule
      if (i === 5 && [tbump, tcol + .4].some(tb => t > tb - .6 && t < tb + 1.6)) return;   // the doorway is busy: the BONK
      const jA = i % 4, jB = (i + 2) % 4, bx = c.x + 235, by = c.y + 150;
      const ph = t < tnev ? 0 : (ang + (i === 5 ? 0 : i * .9)) / Math.PI, sh = Math.floor(ph) % 2, fr = frac(ph), dur_ = t < w0 + 1 ? .22 : .14;
      const who = sh ? jB : jA, prev = sh ? jA : jB;
      ctx.save(); ctx.beginPath(); ctx.rect(c.x - 10, c.y - 140, 320, 345); ctx.clip();
      if (t >= tnev && fr < dur_) { const u = fr / dur_; hoseGuy(lerp(c.x + 150, c.x - 120, u), c.y + 185, .45, { hat: JOB[prev], col: JCOL[prev], walk: t * 4, flip: true }); hoseGuy(lerp(c.x + 420, c.x + 150, u), c.y + 185, .45, { hat: JOB[who], col: JCOL[who], walk: t * 4 }); }
      else lying(bx, by, who);
      const packed = t > tpack && [1, 8, 10].includes(i) ? clamp((t - tpack) * 2 - (i % 3) * .3) : 0;   // a few get packed: rare
      if (packed > 0) { ctx.save(); ctx.globalAlpha = 1; lying(bx - 10, by - 40 * packed, (who + 1) % 4, { mood: 'ouch', sq: .1 * Math.sin(t * 9 + i) }); lying(bx + 20, by - 80 * packed, (who + 3) % 4, { mood: 'ouch', sq: .1 * Math.sin(t * 9 + i + 2) }); ctx.restore(); }
      ctx.restore();
      if (!(t >= tnev && fr < dur_) && (i + sh) % 2 === 0) txt('z', c.x + 250, c.y + 40 - 10 * Math.sin(t * 3 + i), 40, INK, { font: 'serif' });
    });
    // the demo: a stranger with a suitcase waits at the door while the first one sleeps
    if (t < tnev + .1) { const c = CAPS[5]; hoseGuy(c.x + 360, c.y + 200, .45, { hat: 'chef', col: '#AAA', flip: true, mood: 'happy', armUp: -.3, armUp2: .1 + .1 * Math.sin(t * 6), prop: () => { fillS('#555', () => ctx.rect(70, -110, 50, 40), 4); } }); }
    // the rare collision: two strangers in one doorway, BONK
    const bonks = [tbump, tcol + .4];
    bonks.forEach(tb => { const k = seg(t, tb - .5, tb); if (t < tb - .5 || t > tb + 1.6) return; const c = CAPS[5], x = c.x + 150; hoseGuy(x - 200 + 170 * easeIn(k), c.y + 168, .5, { hat: 'sailor', col: '#777', walk: k < 1 ? t * 4 : null, mood: k < 1 ? 'happy' : 'ouch', lean: k >= 1 ? -.3 : 0 }); hoseGuy(x + 200 - 170 * easeIn(k), c.y + 168, .5, { hat: 'chef', col: '#AAA', walk: k < 1 ? t * 4 : null, mood: k < 1 ? 'happy' : 'ouch', flip: true, lean: k >= 1 ? .3 : 0 }); if (t > tb) { paint(starPts(x, c.y + 40, 120, .45, 10), { wash: '#FFFFFF', ink: INK, sw: 2 }); txt('BONK!', x, c.y + 40, 70, INK, { font: 'serif', weight: '900', rot: -.15 }); bonkStars(x, c.y - 30, t); } });
    // the clock
    const kx = 960, ky = 95; fillS('#F4F1E8', () => ctx.arc(kx, ky, 70, 0, TAU), 6); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(ang * 6) * 55, ky + Math.sin(ang * 6) * 55); ctx.moveTo(kx, ky); ctx.lineTo(kx + Math.cos(ang) * 36, ky + Math.sin(ang) * 36); ctx.stroke();
    for (const sx of [760, 1160]) { fillS(day ? '#F4F1E8' : '#555', () => ctx.rect(sx - 60, 40, 120, 110), 6); if (day) fillS('#FFF', () => ctx.arc(sx, 95, 30, 0, TAU), 4); else { fillS('#DDD', () => ctx.arc(sx, 95, 30, 0, TAU), 4); fillS('#555', () => ctx.arc(sx + 14, 88, 26, 0, TAU), 0); } }
    tourist(140, 1040, 9, 'top', { ...emotions(t, [[tin, 'thinking'], [tbump, 'surprised'], [twk - .3, 'happy'], [tshort, 'nervous'], [tpack, 'scared'], [tcol + .4, 'laugh']]), view: 'q' });
    camEnd();
    // cards (screen space, so they sit at the bottom of the frame even while the camera is pushed in)
    if (t < tnev) decoCard([['INSIDE ONE HOUSE', 60, 0]], seg(t, tin + .2, tin + .7) * (1 - seg(t, tnev - .4, tnev)), { y: 120, h: 130, w: 800 });
    if (t > tnev - .3 && t < w0) decoCard([['NEVER HOME AT THE SAME TIME', 60, 0]], seg(t, tnev - .3, tnev + .2) * (1 - seg(t, w0 - .4, w0)), { y: 990, h: 130, w: 1200 });
    if (t > tshort - .3 && t < tpack) decoCard([['SHORT ON NEURONS', 70, 0]], seg(t, tshort - .3, tshort + .2) * (1 - seg(t, tpack - .5, tpack - .1)), { y: 990, h: 130, w: 900 });
    if (t > tcol - 1) decoCard([['THEY RARELY COLLIDE', 72, 0]], seg(t, tcol - 1, tcol - .5) * (1 - seg(t, e + .2, e + .4)), { y: 990, h: 130, w: 1000 });
    irisOpen(seg(t, tin, tin + .7), 500, 700);
    oldFilm(t);
  }

  // ---------- shot 5 · EXTRA! terrible news: the city would be a knot ----------
  function news(t, lt, dur) {
    const b0 = cs('kn_bad'), tter = wt('kn_bad', 'terrible'), tnot = wt('kn_bad', 'nothing'), tknot = wt('kn_bad', 'knot'), m0 = cs('kn_machine');
    camKeys(t, [[b0, 960, 560, 1], [tknot, 960, 520, 1.05], [m0, 960, 540, 1]], .5);
    backdrop(t);
    // the street from the start of the reel twists up into the Knot
    const rise = seg(t, tnot - .4, tknot + .3);
    for (let i = 0; i < 5; i++) { const x = 180 + i * 390, k = clamp(rise * 1.6 - i * .12), q = k * (i - 2) * .9; ctx.save(); ctx.translate(lerp(x, 960 + Math.cos(i * 1.3 + t) * 260, k), lerp(0, -330 + Math.sin(i * 1.3 + t) * 120, k)); ctx.rotate(q); hoseHouse(0, 890, 240 * (1 - .5 * k), 300 * (1 - .5 * k), { imgs: [MIX[i], MIX[(i + 5) % MIX.length]], mood: k > .3 ? 'o' : 'smile', sq: .05 * beat(t + i) }); ctx.restore(); }
    if (rise > 0) knotBeast(960, 470, 260 * backOut(rise), { col: '#DDD', dark: '#222', grin: true, look: [Math.sin(t), .3], hat: 'top' });
    tourist(1700, 1010, 10, 'top', { ...emotions(t, [[b0, 'surprised'], [tter + .4, 'cry'], [tknot, 'scared']]), view: 'q', flip: true });
    camEnd();
    // the spinning newspaper
    const nk = seg(t, b0 - .1, tter + .2), out = seg(t, tnot - 1.2, tnot - .5);
    if (nk > 0 && out < 1) { ctx.save(); ctx.translate(960, 520); ctx.rotate((1 - easeOut(nk)) * 12); const s = easeOut(nk) * (1 - easeIn(out)); ctx.scale(s, s); flat(rectPts(-520, -340, 1040, 680), '#F4F1E8', { line: INK, lw: 8, shadow: [16, 20, 'rgba(0,0,0,.4)'] }); txt('THE DAILY NEURON', 0, -270, 54, INK, { font: 'serif', weight: '900' }); flat(rectPts(-480, -230, 960, 6), INK); txt('EXTRA!', 0, -150, 110, INK, { font: 'serif', weight: '900' }); txt('TERRIBLE NEWS', 0, -30, 96, INK, { font: 'serif', weight: '900' }); txt('NEURONS FULL OF STRANGERS', 0, 70, 50, INK, { font: 'serif', weight: '700' }); for (let i = 0; i < 6; i++) flat(rectPts(-470 + (i % 3) * 320, 130 + Math.floor(i / 3) * 70, 280, 14), '#999'); ctx.restore(); }
    if (t > tknot - .3) decoCard([['THE CITY WOULD BE A KNOT', 70, 0]], seg(t, tknot - .3, tknot + .2) * (1 - seg(t, m0 - .2, m0 + .1)), { y: 1010, h: 130, w: 1150 });
    oldFilm(t);
  }

  // ---------- shot 6 · the Unfolding Machine: a sparse autoencoder unrolls the knot into a long list of pieces ----------
  function unfold(t, lt, dur) {
    const m0 = cs('kn_machine'), tun = wt('kn_machine', 'unfold'), tsp = wt('kn_machine', 'sparse'), tap = wt('kn_machine', 'apart'), tlist = wt('kn_machine', 'list'), tstudy = wt('kn_machine', 'study'), tUM = wt('kn_machine', 'Unfolding'), e = ce('kn_machine');
    camKeys(t, [[m0, 960, 540, 1], [tap, 1000, 560, 1.0], [tlist, 1100, 580, 1.0], [tstudy, 1300, 640, 1.05], [e + .5, 1320, 640, 1.08]], .4);
    backdrop(t);
    const mx = lerp(2500, 760, easeOut(seg(t, m0 + .2, tun + .8))), chug = Math.abs(Math.sin(t * 7)) * .03;
    const eat = seg(t, tap - 1.6, tlist + .5);
    // the knot gets pulled into the funnel, unravelling as it goes
    if (eat < 1) { const kx = lerp(1250, mx, easeIn(eat)), ky = lerp(470, 870 - 560 * .9, easeIn(eat)); ctx.save(); ctx.translate(kx, ky); ctx.scale(1 - .7 * eat, 1 + .4 * eat * Math.sin(t * 9)); knotBeast(0, 0, 230, { col: '#DDD', dark: '#222', grin: eat < .2, look: [-1, .4], loose: .6 * eat, hat: eat < .3 ? 'top' : null }); ctx.restore(); }
    ctx.save(); ctx.translate(0, 0); push(); translate(mx, 900); scale(1 + chug, 1 - chug); translate(-mx, -900);
    CAM = null; machineL(t, mx, 900, .9, { on: 1, belt: seg(t, tap, tap + .6), mouth: .7 + .3 * Math.sin(t * 6), items: [i => { const im = MIX[i % MIX.length], I = img(im), s = Math.min(I.width, I.height); flat(rrPts(-46, -100, 92, 100, 10), '#F4F1E8', { line: INK, lw: 4 }); ctx.save(); ctx.beginPath(); ctx.rect(-36, -90, 72, 72); ctx.clip(); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -36, -90, 72, 72); ctx.restore(); }] });
    // its name plate, painted on at "Think of it as an Unfolding Machine"
    const pk = popk(t, tUM - .2, .4); if (pk > 0) { push(); translate(mx, 900); scale(.9); translate(0, -150); scale(backOut(pk)); fillS('#2A2A2A', () => ctx.rect(-205, -36, 410, 72), 6); txt('UNFOLDING MACHINE', 0, 3, 27, '#EEE', { font: 'serif', weight: '900' }); pop(); }
    pop(); ctx.restore();
    // steam whistle puffs
    for (let i = 0; i < 3; i++) { const ph = frac(t * .9 + i / 3); fillS('#F4F1E8', () => ctx.arc(mx + 160 + ph * 80, 900 - 470 * .9 - ph * 220, 20 + 40 * ph, 0, TAU), 4); }
    if (t > tun && t < tun + 1.2) sfx('TOOT TOOT!', mx + 200, 300, 64, INK, t - tun, { life: 1.2, face: 'serif' });
    // Clawd studies the pieces with a magnifier
    const cw = stroll(t, tlist, tstudy, 2000, 1560, 10);
    tourist(cw.x, 1040, 10, 'top', { ...emotions(t, [[m0, 'surprised'], [tun + .5, 'excited'], [tstudy, 'thinking']]), view: t < tstudy ? 'side' : 'q', flip: true, walk: t > tlist && t < tstudy ? t * 2.4 : undefined, aR: t > tstudy ? 1.1 : undefined, armR: t > tstudy ? (u, sw) => { inkLine([[0, 0], [u * 1.2, 0]], sw * 2, '#555', 'ink', 0); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = u * .4; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * 1.2, 0, TAU); ctx.stroke(); ctx.restore(); } : undefined });
    camEnd();
    decoCard([['A SPARSE AUTOENCODER', 92, -20], ['the Unfolding Machine', 50, 70]], seg(t, tsp - .5, tsp) * (1 - seg(t, tap - .4, tap)), { y: 300, h: 320, w: 1300 });
    if (t > e - .75) irisClose(seg(t, e - .75, cs('kn_both') - .2), 1100, 640);
    oldFilm(t);
  }

  // ---------- shot 7 · "Nick believed it": the young believer, years ago ----------
  function believer(t, lt, dur) {
    const b0 = cs('kn_both'), tnk = wt('kn_both', 'Nick'), tcase = wt('kn_both', 'case'), tfst = wt('kn_both', 'first'), tprop = wt('kn_both', 'proposed'), tbel = wt('kn_both', 'believed'), tyrs = wt('kn_both', 'years'), e = ce('kn_both'), end = chapStart('ch03');
    camKeys(t, [[b0, 960, 580, 1], [tprop, 920, 580, 1.05], [tbel, 880, 560, 1.12], [end + 2, 880, 560, 1.15]], .4);
    backdrop(t);
    // the soapbox and the crowd
    fillS('#888', () => ctx.rect(700, 820, 300, 90), 6); txt('SOAP', 850, 865, 40, INK, { font: 'serif', weight: '900' });
    for (let i = 0; i < 5; i++) { const x = 1150 + i * 140, ch = Math.max(0, Math.sin(t * 6 + i)); hoseGuy(x, 1000 + (i % 2) * 20, .5, { hat: JOB[i % 4], col: JCOL[i % 4], flip: true, armUp: t > tcase ? .5 + .5 * ch : 0, armUp2: t > tcase ? .5 + .5 * ch : .2, mood: t > tcase ? 'wow' : 'happy', sq: .05 * ch }); }
    // the believer (years ago): hands up for superposition, then hugging a plush knot
    const hug = seg(t, tbel - .2, tbel + .4);
    hoseGuy(850, 820, .95, { col: '#444', hat: 'cap', armUp: hug > 0 ? lerp(1.2, -.2, hug) : 1 + .1 * Math.sin(t * 8), armUp2: hug > 0 ? lerp(1.2, -.2, hug) : .9 + .1 * Math.sin(t * 8 + 1), mood: 'happy', sq: .04 * beat(t) });
    if (hug > 0) { knotBeast(850, 640, 90 * hug, { col: '#EEE', dark: '#333', grin: true }); for (let i = 0; i < 3; i++) { const k = frac(t * .8 + i / 3); paint(heartPtsC(850 + (i - 1) * 60, 560 - k * 160, 20), { wash: '#FFF', ink: INK, sw: 1.2 }); } }
    // the placard
    if (hug <= 0) { ctx.save(); ctx.translate(1040, 420 + 10 * Math.sin(t * 8)); ctx.rotate(.06); fillS('#777', () => ctx.rect(-8, 0, 16, 220), 4); fillS('#F4F1E8', () => ctx.rect(-230, -120, 460, 140), 6); txt('SUPERPOSITION!', 0, -50, 52, INK, { font: 'serif', weight: '900' }); ctx.restore(); }
    // who it is, and that the idea was his: a light bulb pops over the cap on "first proposed it"
    hoseTag('NICK', 850, 560, -230, -90, seg(t, Math.max(tnk, b0 + .7) - .2, Math.max(tnk, b0 + .7) + .3) * (1 - seg(t, tbel - .5, tbel - .1)), 48);
    const bk = popk(t, tfst - .2, .35) * (1 - seg(t, tbel - .3, tbel)); if (bk > 0) { ctx.save(); ctx.translate(850, 470); ctx.scale(backOut(bk), backOut(bk)); for (let i = 0; i < 8; i++) { const q = i / 8 * TAU; ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(Math.cos(q) * 62, Math.sin(q) * 62 - 10); ctx.lineTo(Math.cos(q) * 84, Math.sin(q) * 84 - 10); ctx.stroke(); } fillS('#FFF', () => ctx.arc(0, -10, 44, 0, TAU), 6); fillS('#888', () => ctx.rect(-20, 30, 40, 26), 5); ctx.restore(); }
    // the calendar: its pages fly off for years
    const yrs = Math.floor(clamp((t - tyrs + .4) * 3, 0, 4)), cy = 'YEAR ' + (yrs + 1);
    fillS('#F4F1E8', () => ctx.rect(240, 300, 260, 300), 6); fillS('#444', () => ctx.rect(240, 300, 260, 60), 6); txt(cy, 370, 470, 56, INK, { font: 'serif', weight: '900' });
    if (t > tyrs - .4) for (let i = 0; i < yrs; i++) { const k = clamp((t - tyrs + .4) * 3 - i); if (k < 1.6) { ctx.save(); ctx.translate(370 + k * 500, 450 - k * 300); ctx.rotate(k * 4); fillS('#F4F1E8', () => ctx.rect(-80, -90, 160, 180), 4); ctx.restore(); } }
    tourist(590, 990, 11, 'top', { ...emotions(t, [[b0, 'happy'], [tcase, 'excited'], [tbel, 'love']]), view: 'q' });
    camEnd();
    irisOpen(seg(lt, 0, .7), 1100, 640);
    decoCard([['NICK BELIEVED IT', 92, 0]], seg(t, tbel - .2, tbel + .3), { y: 150, h: 170, w: 900 });
    oldFilm(t);
    // the reel jams and burns: a hole melts out from the frame's middle (drawn after the grey pass, so it glows orange)
    const burn = seg(t, e + .1, end + .5);
    if (burn > 0) POST.push(() => filmBurn(t, burn));
  }
  function filmBurn(t, k) {
    const cx = 1010, cy = 520, r = lerp(10, 1500, easeIn(k)), n = 40;
    const P = []; for (let i = 0; i < n; i++) { const a = i / n * TAU, rr = r * (1 + .25 * Math.sin(i * 3.1 + t * 4) + .15 * hash(i * 7.7)); P.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .85]); }
    const path = pathOf(P);
    ctx.save(); ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(120,60,10,.55)'; ctx.lineWidth = 120; ctx.stroke(path);
    ctx.strokeStyle = '#E8822A'; ctx.lineWidth = 34; ctx.shadowColor = '#FFB040'; ctx.shadowBlur = 40; ctx.stroke(path);
    ctx.strokeStyle = '#FFF2C8'; ctx.lineWidth = 8; ctx.stroke(path); ctx.shadowBlur = 0;
    ctx.clip(path); ctx.fillStyle = '#FFF8E8'; ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  shots([
    [chapStart('ch02'), street],
    [wt('kn_poly', 'worse') + .4, lastDistrict, { fade: 0 }],
    [cs('kn_roommates'), crowd],
    [wt('kn_roommates', 'stranger') + .5, hotel, { fade: 0 }],
    [cs('kn_bad') - .2, news],
    [cs('kn_machine') - .2, unfold],
    [cs('kn_both') - .2, believer, { fade: 0 }],
  ]);
})();
