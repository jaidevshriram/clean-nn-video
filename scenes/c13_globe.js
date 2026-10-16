// ch13 Zooming out: GLOBE AND TRAVEL POSTCARDS. The camera has risen from the savanna into orbit: an orthographic
// globe with real continents turns in space, and every scene is a vintage postcard that slides in front of it.
// "Already clean" = built to be read (a street sign in an unknown alphabet that the city's own buildings read, and then
// we can too); a small town vs New York; looking for Brooklyn in Tokyo (70 scraps stitched, a collapse, the V neuron);
// better maps down to the "killer whale" decision with three drawn routes; a huge lit building nobody noticed; the
// asymmetry (a lead vs a dead end); a postcard to Nick's younger self, posted through time; the crossword that fills
// slowly and then in a rush; the last postcard flips over and its back is a World's Fair poster.
(() => {
  const V = 'blog/raw/v-figure-10x/', SL = 'blog/raw/sae-last-layer/img/';
  const CH = chapStart('ch13'), NEXT = chapStart('ch14');
  const SERIF = '"DejaVu Serif"', MARK = '"Permanent Marker"', HANDF = '"Patrick Hand"', KAL = '"Kalam"';
  const CREAM = '#F3EBDC', INK = '#2A2340';
  let NOW = 0;
  const T = (s, x, y, size, col, o = {}) => { if ((o.alpha ?? 1) <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(o.alpha ?? 1); txt(s, x, y, size, col, { font: o.font || MARK, weight: o.weight || '400', ...o }); ctx.restore(); };

  // ---------- space and the globe ----------
  function space(t) {
    if (SKIPBG) return;
    layer('c13space', () => { ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#020410'], [1, '#0A1430']]); ctx.fillRect(-200, -200, W + 400, H + 400); for (let i = 0; i < 420; i++) dot(-200 + hash(i * 1.3) * (W + 400), -200 + hash(i * 7.1) * (H + 400), hash(i) * 1.7 + .3, '#FFFFFF', .3 + .6 * hash(i * 3)); for (let i = 0; i < 5; i++) glow(hash(i * 9) * W, hash(i * 4) * H, 400, ['#2A3A8A', '#4A2A6A', '#1A4A6A'][i % 3], .25); }, { x: -200, y: -200, w: W + 400, h: H + 400, variants: 1 });
    for (let i = 0; i < 10; i++) { const tw = .5 + .5 * Math.sin(t * (1 + hash(i)) + i * 3); glow(hash(i * 19.1) * W, hash(i * 13.3) * H, 10 + 8 * tw, '#FFFFFF', .5 * tw); }
  }
  const LAND = [
    [[-168, 66], [-140, 70], [-100, 72], [-80, 68], [-62, 60], [-55, 50], [-70, 42], [-81, 30], [-97, 26], [-105, 20], [-90, 15], [-83, 9], [-78, 8], [-92, 17], [-106, 23], [-117, 32], [-124, 40], [-124, 48], [-135, 58], [-150, 60], [-165, 62]],
    [[-80, 8], [-62, 10], [-50, 0], [-35, -7], [-40, -22], [-58, -38], [-68, -55], [-74, -45], [-71, -18], [-81, -5]],
    [[-10, 36], [-9, 44], [-2, 48], [5, 52], [10, 58], [20, 70], [40, 68], [70, 73], [100, 77], [140, 72], [170, 68], [180, 66], [160, 60], [140, 52], [130, 42], [122, 30], [110, 20], [105, 10], [100, 13], [92, 22], [80, 15], [73, 20], [66, 25], [57, 25], [50, 30], [35, 36], [28, 41], [20, 40], [12, 44], [5, 43], [-5, 36]],
    [[-17, 21], [-5, 36], [10, 37], [32, 31], [43, 12], [51, 12], [40, -15], [32, -28], [20, -35], [12, -18], [9, 4], [-8, 5], [-17, 14]],
    [[114, -22], [130, -12], [142, -11], [153, -28], [146, -39], [135, -35], [115, -34]],
    [[130, 31], [136, 34], [141, 38], [142, 44], [140, 42], [135, 35]], [[-55, 60], [-30, 68], [-20, 78], [-50, 82], [-65, 76]], [[-6, 50], [2, 51], [-2, 58], [-6, 56]]];
  const SAV = [[28, 5], [40, 4], [38, -8], [26, -10], [22, -2]];
  function globe(t, cx, cy, R, lonD, latD, o = {}) {
    if (SKIPBG) return () => [0, 0, -1];
    const lon0 = lonD * Math.PI / 180, lat0 = latD * Math.PI / 180;
    const proj = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180, c = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l - lon0); return [cx + R * Math.cos(p) * Math.sin(l - lon0), cy - R * (Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l - lon0)), c]; };
    glow(cx, cy, R * 1.35, '#4A8AFF', .35);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
    ctx.fillStyle = lgrad(cx - R, cy - R, cx + R, cy + R, [[0, '#3A86D0'], [1, '#123A7A']]); ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = Math.max(1, R / 280);
    for (let lo = -180; lo < 180; lo += 30) { ctx.beginPath(); let st = false; for (let la = -90; la <= 90; la += 5) { const [x, y, c] = proj(lo, la); if (c < 0) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); }
    for (let la = -60; la <= 60; la += 30) { ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 5) { const [x, y, c] = proj(lo, la); if (c < 0) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); }
    const poly = (L, fill, stroke) => { const P = []; for (let i = 0; i < L.length; i++) { const a = L[i], b = L[(i + 1) % L.length]; for (let k = 0; k < 6; k++) { const [x, y, c] = proj(lerp(a[0], b[0], k / 6), lerp(a[1], b[1], k / 6)); P.push(c < 0 ? null : [x, y]); } } const Q = P.filter(Boolean); if (Q.length < 3) return; ctx.fillStyle = fill; ctx.beginPath(); Q.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = Math.max(1.5, R / 200); ctx.stroke(); } };
    const lg = lgrad(0, cy - R, 0, cy + R, [[0, '#9CC27A'], [.5, '#6E9F58'], [1, '#C9B48E']]);
    LAND.forEach(L => poly(L, lg, '#3E6A3A'));
    poly(SAV, 'rgba(232,180,90,.9)', null);
    if (o.night) { ctx.fillStyle = `rgba(4,8,30,${.6 * o.night})`; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); }
    for (let i = 0; i < 7; i++) { ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(cx + (frac(hash(i * 9) + t * .006) - .5) * R * 1.8, cy + (hash(i * 4) - .5) * R * 1.6, R * (.26 + .14 * hash(i)), R * .04, (hash(i * 2) - .5) * .6, 0, TAU); ctx.fill(); ctx.restore(); }
    const sh = ctx.createRadialGradient(cx - R * .37, cy - R * .4, R * .14, cx, cy, R); sh.addColorStop(0, 'rgba(255,255,255,.18)'); sh.addColorStop(.7, 'rgba(0,0,40,.1)'); sh.addColorStop(1, 'rgba(0,0,40,.6)'); ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(160,210,255,.6)'; ctx.lineWidth = Math.max(4, R / 55); ctx.beginPath(); ctx.arc(cx, cy, R + R / 110, 0, TAU); ctx.stroke(); ctx.restore();
    return proj;
  }
  // one continuous slow spin behind all the postcards (so a card swap never jumps the globe); night falls for deception
  const gLon = t => -10 - (t - cs('zo_clean')) * .55;
  const gNight = t => env(t, cs('zo_deception') - 1.2, ce('zo_deception') + .2, 1.2, 1.2);
  let SKIPBG = false;
  // the bottom caption: hand lettering on a dark plate just under the postcard (so it never sits on the card's art)
  function capL(s, x, y, size, col, o = {}) {
    if (SKIPBG) return;
    const a = (o.alpha ?? 1) * (o.reveal != null ? clamp(o.reveal * 3) : 1) * (o.pop != null ? clamp(o.pop * 2) : 1);
    if (a > .01) { ctx.save(); resetMatrix(); ctx.font = `${size}px ${o.face === 'marker' ? MARK : HANDF}`; const w = ctx.measureText(s).width + size * 1.3; ctx.globalAlpha = .8 * a; ctx.fillStyle = '#0E1430'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - size * .7, w, size * 1.4, size * .5); ctx.fill(); ctx.restore(); }
    letter(s, x, y, size, col, o);
  }
  // a map pin
  function pin(x, y, s, col = '#D2473F', k = 1) { if (k <= 0) return; const b = backOut(k); ctx.save(); ctx.translate(x, y); ctx.scale(b * s, b * s); flat([[0, 0], [-16, -36], [16, -36]], col); dot(0, -44, 18, col); dot(0, -44, 7, '#FFFFFF'); ctx.restore(); }

  // ---------- the city's own alphabet ----------
  function glyph(x, y, s, seed, col, a = 1) {
    if (a <= 0) return; const r = j => hash(seed * 31.7 + j * 7.3);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col; ctx.lineWidth = s * .14; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x - s * .4 + r(1) * s * .3, y - s * .45); ctx.quadraticCurveTo(x + (r(2) - .5) * s, y - s * .1, x + (r(3) - .5) * s * .6, y + s * .1); ctx.lineTo(x + s * .35 * (r(4) > .5 ? 1 : -1), y + s * .45); ctx.stroke();
    if (r(5) > .4) { ctx.beginPath(); ctx.arc(x + (r(6) - .5) * s * .5, y - s * .1, s * .16, 0, TAU * (.5 + r(7) * .5)); ctx.stroke(); }
    if (r(8) > .5) dot(x + s * .3, y - s * .5, s * .08, col);
    ctx.restore();
  }
  // a line of glyphs that resolves into readable words as k goes 0 → 1
  function glyphLine(x, y, s, n, seed, col, words, k, o = {}) {
    for (let i = 0; i < n; i++) glyph(x + (i - (n - 1) / 2) * s * 1.05, y, s, seed + i, col, 1 - ease(clamp(k * 1.6 - i / n * .6)));
    if (k > .1) T(words, x, y + s * .05, o.size || s * .92, col, { alpha: ease(clamp((k - .1) * 1.5)), font: o.font || MARK });
  }

  // ---------- postcards ----------
  // a postcard at (x, y) (centre), size w × h, rotation rot, scale s; inner(w, h) draws in card coords (0..w, 0..h)
  function postcard(x, y, w, h, o, inner) {
    const s = o.s ?? 1, fx = o.flipX ?? 1; if (s <= .01 || Math.abs(fx) < .01) return;
    { const M = ctx.getTransform(), sx = M.a * x + M.c * y + M.e, sy = M.b * x + M.d * y + M.f, r = Math.hypot(M.a, M.b) * s * Math.hypot(w, h) / 2; if (sx + r < 0 || sx - r > W || sy + r < 0 || sy - r > H) return; }
    const ph = x * .013 + w * .007, rot = (o.rot || 0) + .006 * Math.sin(NOW * .7 + ph); y += 7 * Math.sin(NOW * .55 + ph); x += 5 * Math.sin(NOW * .4 + ph * 2);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s * fx, s); ctx.translate(-w / 2, -h / 2);
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetX = 18 + 6 * Math.sin(NOW * .4 + ph); ctx.shadowOffsetY = 30; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(4, 8, w, h); ctx.restore();
    ctx.fillStyle = o.paper || CREAM; ctx.fillRect(0, 0, w, h);
    const bd = o.border ?? 24;
    ctx.save(); ctx.beginPath(); ctx.rect(bd, bd, w - 2 * bd, h - 2 * bd); ctx.clip(); ctx.translate(bd, bd); inner(w - 2 * bd, h - 2 * bd); ctx.restore();
    // aged paper: corner wear and a faint warm wash
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(240,215,170,.18)'; ctx.fillRect(0, 0, w, h); ctx.restore();
    ctx.strokeStyle = 'rgba(80,60,40,.35)'; ctx.lineWidth = 2; ctx.strokeRect(1, 1, w - 2, h - 2);
    { const g = ctx.createLinearGradient(0, 0, w, h); g.addColorStop(0, 'rgba(255,255,255,.10)'); g.addColorStop(.5, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.12)'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
    if (o.caption) { const cw = o.capW || 760; ctx.save(); ctx.translate(w / 2, h - bd - 66); ctx.rotate(-.02); ctx.font = '900 58px ' + SERIF; const cw2 = Math.max(cw * .5, ctx.measureText(o.caption).width + 80); flat(rrPts(-cw2 / 2, -62, cw2, 124, 12), o.capCol || '#C8402A', { shadow: [6, 8, 'rgba(0,0,0,.35)'] }); T('Greetings from', 0, -30, 34, '#FFF6E0', { font: KAL, weight: '700' }); T(o.caption, 0, 22, 58, '#FFE08A', { font: SERIF, weight: '900', stroke: '#5A1A10', sw: 8 }); ctx.restore(); }
    ctx.restore();
  }
  // card motion helpers: slide in at a (from dir), out at b
  const slide = (t, a, b, dx = 0, dy = 1) => { const ki = easeOut(seg(t, a, a + .6)), ko = easeIn(seg(t, b - .5, b)); return { k: ki * (1 - ko), x: (1 - ki) * dx * 1400 + ko * dx * -1400, y: (1 - ki) * dy * 1200 + ko * -dy * 1200, rot: (1 - ki) * .2 - ko * .2 }; };

  // ---------- Clawd the tourist ----------
  const tour = (t, x, y, u, keys, o = {}) => tourist(x, y, u, 'beret', { ...emotions(t, keys), view: 'q', ...o });
  const bookProp = (lit = 0) => (u, sw) => { if (lit > 0) glow(u * 1.2, -u * .4, u * 5, '#FFE08A', .7 * lit); flat([[0, -u * 1.4], [u * 1.3, -u * 1.7], [u * 1.3, u * .5], [0, u * .8]], '#F3EBDC', { line: '#2A2340', lw: 2 }); flat([[0, -u * 1.4], [-u * 1.3, -u * 1.7], [-u * 1.3, u * .5], [0, u * .8]], '#E9DFC8', { line: '#2A2340', lw: 2 }); };
  const cardProp = (label) => (u, sw) => { ctx.save(); ctx.rotate(1.2); ctx.scale(1.7, 1.7); flat(rectPts(-u * .4, -u * 3.2, u * 6, u * 3.4), '#F3EBDC', { line: '#2A2340', lw: 2 }); ctx.fillStyle = '#E8B48A'; ctx.fillRect(-u * .1, -u * 2.9, u * 5.4, u * 1.8); ctx.strokeStyle = '#3A2A2A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-u * .1, -u * 1.9); ctx.quadraticCurveTo(u * 2.6, -u * 3, u * 5.3, -u * 1.9); ctx.stroke(); T(label, u * 2.6, -u * .5, u * .74, '#C2456A', { font: SERIF, weight: '900' }); ctx.restore(); };

  // ---------- 1 · the globe; "already clean" ----------
  function orbit(t, lt, dur) {
    const a = cs('zo_clean'), tAl = wt('zo_clean', 'already'), tNo = wt('zo_clean', 'Not'), tWo = wt('zo_clean', 'word'), tGo = wt('zo_clean', 'have') + .3;
    space(t);
    const z = easeIn(seg(t, tGo - 1.5, tGo + .3)), zf = easeIn(seg(t, tGo - .75, tGo));
    const R = lerp(380, 2600, z), cx = lerp(1120, 900, z), cy = lerp(540, 900, z);
    const proj = globe(t, cx, cy, R, lerp(20, -18, seg(t, CH, tGo)), 12);
    // pins pop up, labelled in an alphabet nobody knows
    [[2, 48, 1], [-74, 40.7, 2], [139.7, 35.7, 3], [-46, -23, 4], [77, 28, 5], [-3, 40, 6]].forEach(([lo, la, i]) => { const [x, y, c] = proj(lo, la); if (c < .1) return; const k = popk(t, tNo - .4 + i * .18, .4); pin(x, y, R / 380, '#D2473F', k); if (k > .5) { flat(rrPts(x + 18, y - 82, 110, 44, 8), 'rgba(10,20,48,.85)'); for (let g = 0; g < 3; g++) glyph(x + 44 + g * 30, y - 60, 26, i * 5 + g, '#FFE08A'); } });
    // the title, in postcard lettering
    const k = seg(t, tAl - .3, tAl + .5) * (1 - seg(t, tGo - .9, tGo - .5));
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.translate(1120, 980); ctx.rotate(-.02); T('"already clean"', 0, -40, 96, '#FFE08A', { font: SERIF, weight: '900', stroke: '#5A1A10', sw: 12 }); ctx.restore(); }
    if (t > tNo - .3) { const k2 = seg(t, tNo - .3, tNo + .3) * (1 - seg(t, tGo - .5, tGo - .2)); letter('not: every neuron\nmatches a word we have', 400, 500, 54, '#FFF6E0', { face: 'hand', shadow: false, alpha: k2, screen: true }); }
    flash(zf * .92, '#FFF6E0');
  }

  // ---------- 2 · a street sign in the network's own alphabet; the buildings read it; then we can ----------
  function streetCorner(w, h, t, rd, lit, dn) {
    ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#F6B87A'], [.55, '#F2D2A0'], [1, '#E9C08A']]); ctx.fillRect(0, 0, w, h);
    dot(w * .78, h * .3, 70, '#FFF2C8'); glow(w * .78, h * .3, 220, '#FFF2C8', .6);
    for (let i = 0; i < 9; i++) { const bx = i * 190 - 40, bh = 250 + 160 * hash(i * 3.3); flat(rectPts(bx, h * .64 - bh, 180, bh), mixCol('#9A6A8A', '#C98A7A', hash(i)), { alpha: .55 }); }
    flat(rectPts(0, h * .66, w, h * .34), '#8A7A72'); flat(rectPts(0, h * .66, w, 14), '#6A5A52');
    for (let i = 0; i < 8; i++) flat(rectPts(i * 220 + 30, h * .82, 110, 14), '#E9E0CC');
    // downstream buildings: their windows face the sign and light up as they read it
    const B = [[w * .08, 420, '#4E7AA8'], [w * .62, 470, '#C2456A'], [w * .86, 380, '#3A9C98']];
    B.forEach(([bx, bh, col], i) => {
      flat(rectPts(bx, h * .68 - bh, 220, bh), col, { line: INK, lw: 4 }); flat(rectPts(bx - 10, h * .68 - bh - 20, 240, 24), mixCol(col, '#000000', .3), { line: INK, lw: 3 });
      for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) { const wx = bx + 30 + c * 100, wy = h * .68 - bh + 40 + r * 90, L = clamp(lit * 1.4 - i * .2 - r * .05); flat(rectPts(wx, wy, 60, 56), mixCol('#2A2340', '#FFD36B', L), { line: INK, lw: 3 }); if (L > .3) glow(wx + 30, wy + 28, 60, '#FFD36B', .5 * L); }
    });
    // the sign on its post
    const sx = w * .38, sy = h * .3;
    flat(rectPts(sx - 10, sy, 20, h * .68 - sy), '#5A5A60', { line: INK, lw: 3 });
    flat(rrPts(sx - 290, sy - 90, 580, 170, 14), '#2E6A4A', { line: '#F3EBDC', lw: 8, shadow: [8, 10, 'rgba(0,0,0,.35)'] });
    glyphLine(sx, sy - 4, 66, 7, 11, '#F3EBDC', 'built to be read', rd, { size: 64 });
    // reading beams from the sign into the buildings
    if (dn > 0) B.forEach(([bx, bh], i) => { const tx = bx + 110, ty = h * .68 - bh + 120; for (let j = 0; j < 3; j++) { const f = frac(t * .7 + j / 3 + i * .2), p = arcPt([sx, sy], [tx, ty], 60, f); ctx.save(); ctx.globalAlpha = dn * (1 - f * .4); glyph(p[0], p[1], 30, 11 + j + i, '#FFE08A'); ctx.restore(); glow(p[0], p[1], 30, '#FFE08A', .4 * dn); } });
  }
  function readable(t, lt, dur) {
    const a = cs('zo_clean'), tBu = wt('zo_clean', 'built'), tRe = wt('zo_clean', 'read,'), tDo = wt('zo_clean', 'downstream'), tLe = wt('zo_clean', 'learn'), tRd = wt('zo_clean', 'read', 1), tUn = wt('zo_clean', 'understand'), e = ce('zo_clean');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .7)), ko = 0;
    const rd = seg(t, tRd - .4, tUn + .2), lit = seg(t, tRe - .3, tDo + .6), dn = env(t, tRe - .3, tLe, .4, .4);
    postcard(960, 520 - ko * 1200, 1680, 900, { s: lerp(.25, 1, ki), rot: lerp(.15, -.015, ki), caption: 'the NETWORK', capW: 820 }, (w, h) => {
      streetCorner(w, h, t, rd, lit, dn);
      const cl = [[t - lt, 'confused'], [tLe - .2, 'thinking'], [tRd, 'idea'], [tUn, 'happy']];
      tour(t, w * .25, h * .93, 17, cl, { aR: 1.4, armR: bookProp(seg(t, tLe, tRd)) });
    });
    // we arrive out of the white of the zoom
    flash(.92 * (1 - easeOut(seg(lt, 0, 1.1))), '#FFF6E0');
    if (t > tBu - .3 && t < tLe) capL("read by the network's own neurons", 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tBu - .3, tDo + .5) });
    if (t > tLe - .2) capL('learn to read it the same way', 960, 1016, 54, '#FFE08A', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tLe - .2, tRd + .4) });
  }

  // ---------- 3 · bigger isn't harder: a small town vs New York ----------
  function smallTown(w, h, t, kB, kO) {
    ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#9FD0E6'], [1, '#E6F2E0']]); ctx.fillRect(0, 0, w, h);
    flat([[0, h * .55], [w * .3, h * .45], [w * .6, h * .52], [w, h * .44], [w, h], [0, h]], '#8FBF73'); flat([[0, h * .7], [w * .4, h * .62], [w, h * .7], [w, h], [0, h]], '#6E9F58');
    ctx.strokeStyle = '#D9C9A0'; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, h * .84); ctx.quadraticCurveTo(w * .5, h * .7, w, h * .82); ctx.stroke();
    const HS = [[.12, .62, '#E8B48A', 'BANK', kB], [.32, .56, '#D9C9A0'], [.5, .66, '#C98A7A'], [.7, .58, '#E9D3A9'], [.88, .64, '#9AA3B5', 'OFFICE', kO]];
    HS.forEach(([fx, fy, col, lab, k], i) => { const x = fx * w, y = fy * h; flat(rectPts(x - 50, y - 70, 100, 70), col, { line: INK, lw: 3 }); flat([[x - 62, y - 70], [x, y - 120], [x + 62, y - 70]], '#B5533C', { line: INK, lw: 3 }); flat(rectPts(x - 14, y - 36, 28, 36), '#4A3A3A'); if (lab && k > 0) { const s = backOut(k); ctx.save(); ctx.translate(x, y - 160); ctx.scale(s, s); flat(rrPts(-90, -32, 180, 64, 10), CREAM, { line: INK, lw: 3 }); T(lab, 0, 2, 40, INK, { font: SERIF, weight: '900' }); ctx.restore(); } });
    if (kO > .5) { ctx.save(); ctx.strokeStyle = '#C2456A'; ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(.12 * w + 90, .62 * h - 160); ctx.quadraticCurveTo(w * .5, h * .2, .88 * w - 90, .64 * h - 160); ctx.stroke(); ctx.restore(); }
  }
  function newYork(w, h, t, kF, kM) {
    ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#2A3A7A'], [.7, '#E89A7A'], [1, '#F6C08A']]); ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { const bx = i * 34 - 10, bh = 140 + 260 * hash(i * 2.7), fin = i > 11 && i < 18; flat(rectPts(bx, h * .78 - bh - (fin ? 120 : 0), 30, bh + (fin ? 120 : 0)), fin ? mixCol('#3A4A7A', '#FFE08A', .25 * kF) : '#3A3A6A', { line: '#1A1A3A', lw: 2 }); for (let r = 0; r < 8; r++) if (hash(i * 13 + r) > .45) flat(rectPts(bx + 8, h * .78 - bh + r * 30 - (fin ? 100 : 0), 12, 12), fin && kF > .3 ? '#FFE08A' : '#E8C27A', { alpha: fin ? .6 + .4 * kF : .55 }); }
    if (kF > 0) glow(w * .5, h * .4, 260, '#FFE08A', .6 * kF);
    flat(rectPts(0, h * .78, w, h * .22), '#2A3A5A'); for (let i = 0; i < 9; i++) flat(rectPts(i * 100 + 20, h * .86, 60, 6), '#8AA0C8', { alpha: .6 });
    // the fold-out map: the district is circled, found in under a minute
    if (kM > 0) { const s = backOut(kM); ctx.save(); ctx.translate(w * .5, h * .42); ctx.rotate(.04); ctx.scale(s, s); flat(rectPts(-250, -150, 500, 300), '#F3E2BE', { line: INK, lw: 3, shadow: [8, 10, 'rgba(0,0,0,.4)'] }); for (let i = 0; i < 7; i++) { ctx.strokeStyle = '#C9B48E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-240, -130 + i * 44); ctx.lineTo(240, -110 + i * 40); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-220 + i * 76, -150); ctx.lineTo(-200 + i * 70, 150); ctx.stroke(); } ctx.fillStyle = 'rgba(194,69,106,.25)'; ctx.beginPath(); ctx.ellipse(30, 50, 205, 80, -.06, 0, TAU); ctx.fill(); ctx.strokeStyle = '#C2456A'; ctx.lineWidth = 8; ctx.stroke(); T('financial district', 30, 50, 38, '#8A1A3A', { font: MARK }); dot(170, -100, 46, '#FFFFFF'); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(170, -100, 46, 0, TAU); ctx.stroke(); T('0:59', 170, -98, 32, INK, { font: SERIF, weight: '900' }); ctx.restore(); }
  }
  // the car neurons: a broad "car" building (smallest network) that splits into three specialist towers (biggest)
  const NPB = 'blog/raw/negative-poles-v2/';
  function carSplit(w, h, t, k) {
    ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#9FC0E6'], [1, '#F2E2C0']]); ctx.fillRect(0, 0, w, h);
    flat(rectPts(0, h * .82, w, h * .18), '#8A9A7A');
    T(k < .5 ? 'the smallest network' : 'the biggest network', w / 2, 50, 46, INK, { font: SERIF, weight: '900' });
    const S = [[V + 'c4d201c', 'cars'], [NPB + 'taxis-positive-1', 'taxis'], [NPB + 'taxis-negative-1', 'ambulances']];   // the essay's own split: taxis vs ambulances
    // the one broad building
    if (k < 1) { ctx.save(); ctx.globalAlpha = 1 - k; const bw = 380, bh = 330, x0 = w / 2 - bw / 2, y0 = h * .82 - bh; flat(rectPts(x0, y0, bw, bh), '#C98A7A', { line: INK, lw: 4 }); flat([[x0 - 20, y0], [w / 2, y0 - 70], [x0 + bw + 20, y0]], '#B5533C', { line: INK, lw: 4 }); photoFlat(S[0][0], x0 + 40, y0 + 30, bw - 80, 180, { border: 6, borderCol: '#2A2340', shadow: false }); flat(rrPts(w / 2 - 110, y0 + 236, 220, 66, 12), CREAM, { line: INK, lw: 3 }); T('car', w / 2, y0 + 270, 46, INK, { font: MARK }); ctx.restore(); }
    // two narrow specialists
    if (k > 0) for (let i = 0; i < 2; i++) { const tw = 220, th = 350 + 40 * i, cx = lerp(w / 2, w / 2 + (i - .5) * 290, k), y0 = h * .82 - th; ctx.save(); ctx.globalAlpha = clamp(k * 2); flat(rectPts(cx - tw / 2, y0, tw, th), ['#3A64B8', '#E8AA38', '#3A9C98'][i], { line: INK, lw: 4 }); photoFlat(S[i + 1][0], cx - tw / 2 + 18, y0 + 24, tw - 36, 130, { border: 5, borderCol: '#2A2340', shadow: false }); flat(rrPts(cx - 102, y0 + 176, 204, 56, 10), CREAM, { line: INK, lw: 3 }); T(S[i + 1][1], cx, y0 + 205, S[i + 1][1].length > 6 ? 26 : 28, INK, { font: MARK }); ctx.restore(); }
  }
  function bigger(t, lt, dur) {
    const a = cs('zo_bigger'), tSm = wt('zo_bigger', 'small'), tBa = wt('zo_bigger', 'bank'), tOf = wt('zo_bigger', 'office'), tNY = wt('zo_bigger', 'New'), tMa = wt('zo_bigger', 'map'), tBi = wt('zo_bigger', 'Bigger', 1), tRm = wt('zo_bigger', 'Remember'), tSp = wt('zo_bigger', 'specialists'), e = ce('zo_bigger');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const L = slide(t, t - lt, e + .4, -1, 0), Rr = slide(t, tNY - .6, e + .4, 1, 0);
    postcard(500 + L.x, 520, 860, 660, { rot: -.035 + L.rot, caption: 'SMALL TOWN', capW: 700 }, (w, h) => { smallTown(w, h, t, popk(t, tBa - .2, .4), popk(t, tOf - .2, .4)); });
    // remember the car neurons: one broad car building in the smallest network, two specialists in the biggest
    const Cc = slide(t, tRm - .5, tNY - .7, 1, 0);
    if (Cc.k > 0) postcard(1440 + Cc.x, 520, 800, 640, { rot: .03 - Cc.rot, paper: '#F3EBDC' }, (w, h) => { carSplit(w, h, t, easeInOut(seg(t, tSp - .4, tSp + .6))); });
    postcard(1430 + Rr.x, 500, 860, 660, { rot: .03 - Rr.rot, caption: 'NEW YORK', capW: 640 }, (w, h) => { newYork(w, h, t, seg(t, tNY, tNY + .8), popk(t, tMa - .5, .5)); });
    const tk = seg(t, a, a + .6) * (1 - seg(t, tNY - .6, tNY - .2));
    if (tk > 0) letter("bigger isn't necessarily harder", 960, 125, 72, '#FFE08A', { face: 'marker', shadow: false, alpha: tk, stroke: '#5A1A10', strokeW: .12, screen: true });
    if (t > tBi - .3) capL('bigger models: narrower, cleaner neurons', 960, 1016, 56, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tBi - .3, tBi + 1) });
  }

  // ---------- 4 · looking for Brooklyn in Tokyo; the V neuron ----------
  const SCR = Array.from({ length: 70 }, (_, i) => ({ sx: 40 + hash(i * 3.7) * 1460, sy: 60 + hash(i * 5.3) * 560, sw: 34 + 30 * hash(i * 2.1), sh: 30 + 26 * hash(i * 6.6) }));
  // the target shape: a patchwork Brooklyn Bridge (two towers, a deck and cables), 70 slots
  const BRK = (() => { const P = []; for (let i = 0; i < 70; i++) { if (i < 24) { const tw = i % 2, j = Math.floor(i / 2); P.push([tw ? 520 : 180, 120 + j * 34]); } else if (i < 46) { const j = i - 24; P.push([60 + j * 30, 520]); } else { const j = i - 46, tw = j % 2 ? 1 : 0, u = Math.floor(j / 2) / 12; P.push([tw ? lerp(520, 680, u) : lerp(180, 520, u), tw ? 120 + 400 * u * u : 120 + 260 * Math.sin(u * Math.PI)]); } } return P; })();
  function tokyoStreet(w, h, t, holes) {
    ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#120E2A'], [1, '#3A1E4A']]); ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) { const x = i * 190 - 30, bh = 420 + 220 * hash(i * 3), nc = ['#FF6FA8', '#6FE3FF', '#FFD36B', '#9FE3A6'][i % 4]; flat(rectPts(x, h * .8 - bh, 176, bh), lgrad(0, h * .8 - bh, 0, h * .8, [[0, '#4A3A6A'], [1, '#2A2240']])); flat(rectPts(x + 128, h * .8 - bh + 30, 36, bh * .5), nc, { alpha: .85 }); glow(x + 146, h * .8 - bh * .7, 90, nc, .45); for (let g = 0; g < 4; g++) glyph(x + 146, h * .8 - bh + 70 + g * 52, 26, i * 9 + g, '#2A2240'); for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) if (hash(i * 7 + r * 3 + c) > .4) flat(rectPts(x + 18 + c * 50, h * .8 - bh + 40 + r * 60, 34, 30), '#FFE6A8', { alpha: .5 }); for (let j = 0; j < 3; j++) { const lx = x + 30 + j * 40, ly = h * .8 - bh * .28; dot(lx, ly, 15, '#E2473F'); glow(lx, ly, 34, '#FF8A6A', .45); } }
    flat(rectPts(0, h * .8, w, h * .2), '#1E1830'); for (let i = 0; i < 12; i++) flat(rectPts(i * 140, h * .9, 80, 8), '#FF6FA8', { alpha: .4 });
    // holes where scraps were cut out
    ctx.fillStyle = '#0A0814'; for (let i = 0; i < holes; i++) { const S = SCR[i]; ctx.fillRect(S.sx, S.sy, S.sw, S.sh); }
  }
  function tokyo(t, lt, dur) {
    const a = cs('zo_tokyo'), tFo = wt('zo_tokyo', 'forcing'), tTk = wt('zo_tokyo', 'Tokyo'), tBr = wt('zo_tokyo', 'Brooklyn'), tSt = wt('zo_tokyo', 'stitch'), tSe = wt('zo_tokyo', 'seventy'), tDe = wt('zo_tokyo', 'decide'), tMe = wt('zo_tokyo', 'mess'), tTh = wt('zo_tokyo', "That's"), tV = wt('zo_tokyo', 'V'), tCa = wt('zo_tokyo', 'cats'), tUf = wt('zo_tokyo', 'Unfolding'), tSp = wt('zo_tokyo', 'splits'), e = ce('zo_tokyo');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .6));
    const cut = seg(t, tSt - .3, tSe + 1.2), held = Math.floor(70 * cut), fall = seg(t, tMe - .4, tMe + 1.2);
    const flip = seg(t, tTh - .2, tV - .1), fx = Math.cos(flip * Math.PI);
    postcard(960, 520 + (1 - ki) * 1100, 1640, 880, { rot: -.015, caption: fx > 0 ? 'TOKYO' : null, capW: 600, flipX: fx > 0 ? fx : -fx }, (w, h) => {
      if (fx > 0) {
        tokyoStreet(w, h, t, held);
        tour(t, 260, h * .94, 16, [[t - lt, 'happy'], [tFo, 'thinking'], [tBr - .2, 'determined'], [tSt, 'determined'], [tMe - .2, 'cry']], { aR: 1.5, armR: cardProp('BROOKLYN') });
        // the patchwork Brooklyn, stitched from 70 scraps of Tokyo
        for (let i = 0; i < held; i++) {
          const S = SCR[i], k = clamp((cut * 70 - i) / 6), [bx, by] = BRK[i], tx = 820 + bx, ty = 80 + by, fl = fall * (300 + 500 * hash(i)) * fall;
          const x = lerp(S.sx, tx, easeInOut(k)), y = lerp(S.sy, ty, easeInOut(k)) - Math.sin(k * Math.PI) * 80 + fl;
          ctx.save(); ctx.translate(x + S.sw / 2, y + S.sh / 2); ctx.rotate(fall * (hash(i * 3) - .5) * 4 + (1 - k) * .4); ctx.scale(lerp(1, 44 / S.sw, k), lerp(1, 40 / S.sh, k));
          ctx.fillStyle = ['#4A3A6A', '#FF6FA8', '#6FE3FF', '#E2473F', '#FFD36B', '#2A2240'][i % 6]; ctx.fillRect(-S.sw / 2, -S.sh / 2, S.sw, S.sh); ctx.strokeStyle = '#F3EBDC'; ctx.lineWidth = 3; ctx.strokeRect(-S.sw / 2, -S.sh / 2, S.sw, S.sh);
          ctx.restore();
        }
        if (held > 0 && fall < .2) { T(String(held), 1480, 80, 72, '#FFE08A', { font: SERIF, weight: '900', stroke: '#2A1A3A', sw: 10 }); T('scraps', 1480, 140, 40, '#FFF6E0', { font: KAL, weight: '700' }); }
      } else {
        // the back: the V neuron, a Tokyo tower with a V roof, its windows full of cats and cars; then an Unfolding
        // Machine splits it down the V into a cat piece (left) and a car piece (right)
        ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#120E2A'], [1, '#2A1E4A']]); ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 40; i++) dot(hash(i * 3.1) * w, hash(i * 7.7) * h * .5, 2, '#FFFFFF', .5);
        const bx = w / 2, by = h * .95, bw = 520, bh = 560, hi = seg(t, tCa - .4, tCa + .4), sp = easeInOut(seg(t, tSp - .3, tSp + .9));
        glow(bx, by - bh * .5, 600, '#C9A0FF', .35 * (1 - sp));
        for (const sd of [-1, 1]) {
          ctx.save(); ctx.translate(sd * 330 * sp, 0); ctx.rotate(sd * .05 * sp); ctx.beginPath(); ctx.rect(sd < 0 ? -w : bx, -h, w + (sd < 0 ? bx : 0) + (sd > 0 ? w : 0), 3 * h); ctx.clip();
          if (sp > 0) glow(bx + sd * bw * .25, by - bh * .5, 380, sd < 0 ? '#FFB3D9' : '#9FD8FF', .4 * sp);
          flat(rectPts(bx - bw / 2, by - bh, bw, bh), '#5C4A7A', { line: '#F3EBDC', lw: 5 });
          flat([[bx - bw / 2 - 30, by - bh - 240], [bx, by - bh + 10], [bx + bw / 2 + 30, by - bh - 240], [bx + bw / 2 + 30, by - bh], [bx - bw / 2 - 30, by - bh]], '#8A5A9A', { line: '#F3EBDC', lw: 5 });
          // left column: the cat and the fox (pointed faces); right column: the two cars
          [V + 'p47742', V + 'c4d201c', V + 'p42708', V + 'c4d201d'].forEach((im, i) => { const wx = bx - bw / 2 + 40 + (i % 2) * 240, wy = by - bh + 50 + Math.floor(i / 2) * 230; flat(rectPts(wx - 8, wy - 8, 216, 196), '#2A2340'); photoFlat(im, wx, wy, 200, 180, {}); if (hi > 0) { ctx.save(); ctx.strokeStyle = '#FFE08A'; ctx.globalAlpha = hi * (1 - sp); ctx.lineWidth = 8; ctx.strokeRect(wx - 4, wy - 4, 208, 188); ctx.restore(); } });
          ctx.restore();
          if (sp > .4) { const k = backOut(clamp((sp - .4) / .5)), tx = bx + sd * (bw * .25 + 330 * sp); ctx.save(); ctx.translate(tx, by - bh - 40); ctx.scale(k, k); flat(rrPts(-130, -42, 260, 84, 14), sd < 0 ? '#C2456A' : '#3A64B8', { line: '#F3EBDC', lw: 4 }); T(sd < 0 ? 'cat piece' : 'car piece', 0, 2, 52, '#FFF6E0', { font: MARK }); ctx.restore(); }
        }
        // the Unfolding Machine's cut: a bright seam down the middle of the V
        const cutK = env(t, tSp - .6, tSp + .6, .3, .4); if (cutK > 0) { ctx.save(); ctx.globalAlpha = cutK; ctx.strokeStyle = '#FFF6D8'; ctx.lineWidth = 10; ctx.setLineDash([26, 14]); ctx.lineDashOffset = -t * 120; ctx.beginPath(); ctx.moveTo(bx, by - bh); ctx.lineTo(bx, by); ctx.stroke(); ctx.restore(); glow(bx, by - bh * .5, 200, '#FFF6D8', .6 * cutK); }
      }
    });
    if (fall > .05 && fx > 0) capL('"Tokyo is a mess!"', 960, 1016, 66, '#FFE08A', { face: 'marker', shadow: false, stroke: '#2A1A3A', strokeW: .12, screen: true, pop: seg(t, tMe - .3, tMe + .1) < 1 ? seg(t, tMe - .3, tMe + .1) : null });
    if (t > tV - .2 && t < tCa - .4) capL('the V neuron', 960, 1016, 60, '#FFE08A', { face: 'marker', shadow: false, screen: true, stroke: '#2A1A3A', strokeW: .12, reveal: seg(t, tV - .2, tV + .4) });
    if (t > tCa - .4 && t < tUf - .4) capL('they went looking for cats and cars', 960, 1016, 60, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tCa - .4, tCa + .6) });
    if (t > tUf - .4) capL('an Unfolding Machine: a cat piece + a car piece', 960, 1016, 58, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tUf - .4, tSp + .4) });
    if (t > tSt - .3 && t < tDe) capL('stitching Brooklyn out of Tokyo', 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tSt - .3, tSt + .8) });
  }

  // ---------- 5 · better maps, down to the "killer whale" decision ----------
  function orca(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const B = new Path2D(); B.moveTo(-120, 0); B.bezierCurveTo(-90, -46, 40, -52, 110, -12); B.bezierCurveTo(130, 0, 120, 20, 100, 22); B.bezierCurveTo(30, 40, -60, 34, -120, 0); B.closePath(); fillPath(B, '#1E1E2A', '#0A0A12', 3); fillPath(pathOf([[-20, -40], [-4, -100], [14, -44]]), '#1E1E2A', '#0A0A12', 3); fillPath(pathOf([[-118, 0], [-160, -34], [-150, 0], [-162, 30]]), '#1E1E2A', '#0A0A12', 3); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(70, -18, 16, 8, -.2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(10, 18, 60, 12, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  function rayFish(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const fl = Math.sin(t * 3) * 10; fillPath(pathOf([[0, -40], [90, -fl], [10, 34], [-90, -fl]]), '#7A8AA8', '#2A3A5A', 3); ctx.strokeStyle = '#2A3A5A'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 30); ctx.quadraticCurveTo(10, 70, -6, 110); ctx.stroke(); dot(-14, -12, 4, '#111'); dot(14, -12, 4, '#111'); ctx.translate(150, -30); fillPath(pathOf([[-70, 0], [-20, -22], [50, -10], [70, 0], [50, 12], [-20, 18]]), '#8A9AB0', '#2A3A5A', 3); fillPath(pathOf([[-6, -18], [6, -50], [16, -14]]), '#8A9AB0', '#2A3A5A', 3); fillPath(pathOf([[-68, 0], [-96, -24], [-90, 0], [-96, 24]]), '#8A9AB0', '#2A3A5A', 3); dot(44, -4, 4, '#111'); ctx.restore(); }
  function fisherman(x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); person(0, 0, 1.4, { col: '#3A64B8', key: 'c13fish', hat: 'cap', hatCol: '#E8862A', mood: 'happy' }); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 8; ctx.lineCap = 'round'; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sd * 22, -100); ctx.lineTo(sd * 46, -150); ctx.stroke(); } ctx.save(); ctx.translate(0, -158 + Math.sin(t * 4) * 3); fillPath(pathOf([[-80, 0], [-30, -24], [40, -20], [70, 0], [40, 22], [-30, 22]]), '#C9B48E', '#5A4A2A', 3); fillPath(pathOf([[68, 0], [100, -26], [94, 0], [100, 26]]), '#C9B48E', '#5A4A2A', 3); dot(-50, -4, 5, '#111'); ctx.restore(); ctx.restore(); }
  const HOODS = [[-560, -230, 'DOGS', '#E9C9A0'], [-150, -260, 'BIRDS', '#C9E0E9'], [260, -220, 'FOOD', '#E9D9A0'], [-520, 60, 'CARS', '#D9C9E9'], [-120, 40, 'TEXT', '#E0E9C9'], [300, 90, 'SEA LIFE', '#A9D9E9'], [-330, 280, 'TOOLS', '#E9C9C9'], [560, 300, 'PLANTS', '#C9E9C0']];
  function maps(t, lt, dur) {
    const a = cs('zo_maps'), tMa = wt('zo_maps', 'maps'), tNe = wt('zo_maps', 'neighborhoods'), tSt = wt('zo_maps', 'street'), tBu = wt('zo_maps', 'buildings'), tZo = wt('zo_maps', 'Zoom', 1), tKi = wt('zo_maps', 'killer'), tTh = wt('zo_maps', 'three'), tWh = wt('zo_maps', 'whales'), tSh = wt('zo_maps', 'sharks'), tFi = wt('zo_maps', 'fish'), tPr = wt('zo_maps', 'proud'), e = ce('zo_maps');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const unf = easeOut(seg(t, t - lt + .1, tMa + .4)), ki = easeOut(seg(t, t - lt, t - lt + .6));
    const zk = easeInOut(seg(t, tZo - .3, tKi + .5));
    postcard(960, 520 + (1 - ki) * 1100, 1680, 900, { flipX: Math.max(.12, unf), caption: t < tMa - .3 ? 'the MAP' : null, capW: 560, paper: '#F3E2BE' }, (w, h) => {
      ctx.fillStyle = '#EFE0C0'; ctx.fillRect(0, 0, w, h);
      // zoom into the sea-life district
      ctx.save(); const zc = [w / 2 + 300, h / 2 + 90], zs = lerp(1, 3.6, zk); ctx.translate(w / 2, h / 2); ctx.scale(zs, zs); ctx.translate(-lerp(w / 2, zc[0], zk), -lerp(h / 2, zc[1], zk));
      ctx.translate(w / 2, h / 2);
      // the overview: neighbourhood blobs and the streets between them
      ctx.strokeStyle = '#D9C49A'; ctx.lineWidth = 10; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-800, -330 + i * 130); ctx.quadraticCurveTo(0, -300 + i * 130 + 40 * Math.sin(i), 800, -330 + i * 130); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-700 + i * 280, -420); ctx.quadraticCurveTo(-660 + i * 280, 0, -700 + i * 280, 420); ctx.stroke(); }
      HOODS.forEach(([x, y, lab, col], i) => { const k = popk(t, tMa - .5 + i * .14, .5); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(backOut(k), backOut(k)); flat(ellPts(0, 0, 170, 100, 24), col, { line: '#8A7A5A', lw: 4 }); T(lab, 0, -34, 44, '#4A3A2A', { font: SERIF, weight: '900', alpha: 1 - seg(zk, .1, .4) }); ctx.restore(); });
      // inside each neighbourhood, its real buildings rise on a street that joins the label: zoomed out, still connected
      const bk = seg(t, tSt - .3, tBu + .3);
      HOODS.forEach(([hx, hy], j) => { if (j === 5 && zk > .3) return; const k0 = clamp(bk * 8 - j); if (k0 <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k0 * 3); ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(hx - 100, hy + 56); ctx.lineTo(hx + 100, hy + 56); ctx.moveTo(hx, hy - 6); ctx.lineTo(hx, hy + 56); ctx.stroke(); ctx.restore(); for (let i = 0; i < 4; i++) { const k = clamp(k0 * 2 - i * .25); if (k <= 0) continue; ctx.save(); ctx.translate(hx - 84 + i * 56, hy + 52); ctx.scale(1, backOut(k)); flat(rectPts(-18, -46, 36, 46), ['#C2456A', '#3A64B8', '#3A9C98', '#E8862A'][(i + j) % 4], { line: INK, lw: 2 }); flat(rectPts(-10, -38, 20, 14), '#FFE08A'); ctx.restore(); } });
      // the killer-whale tower and its three routes (visible once we zoom in)
      if (zk > .3) {
        ctx.save(); ctx.globalAlpha = clamp((zk - .3) / .4); ctx.translate(300, 90); ctx.scale(1 / 3.6, 1 / 3.6);
        ctx.fillStyle = '#A9D9E9'; ctx.fillRect(-1200, -700, 2400, 1400);
        const R3 = [[tWh, [[-470, -230], [-260, -190], [-60, -60]], '#3A64B8'], [tSh, [[-470, 20], [-260, 15], [-60, 0]], '#6A7A9A'], [tFi, [[-470, 260], [-260, 200], [-60, 60]], '#C2456A']];
        R3.forEach(([tt, P, col], i) => { const k = seg(t, tTh - .4 + i * .25, tTh + .4 + i * .25), C = through(P, 10), n = Math.max(2, Math.round(C.length * k)); ctx.strokeStyle = col; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); C.slice(0, n).forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); const lk = seg(t, tt - .3, tt + .3); if (lk > 0) for (let j = 0; j < 3; j++) { const q = C[Math.floor(frac(t * .5 + j / 3) * (C.length - 1))]; glow(q[0], q[1], 50, '#FFF2C8', lk); } });
        const wk = popk(t, tWh - .4, .5), sk = popk(t, tSh - .4, .5), fk = popk(t, tFi - .3, .5);
        if (wk > 0) { ctx.save(); ctx.translate(-600, -250 + Math.sin(t * 2) * 6); ctx.scale(backOut(wk), backOut(wk)); orca(0, 0, 1.1); ctx.restore(); }
        if (sk > 0) { ctx.save(); ctx.translate(-660, 0); ctx.scale(backOut(sk), backOut(sk)); rayFish(0, 0, .95, t); ctx.restore(); }
        if (fk > 0) { ctx.save(); ctx.translate(-600, 380); ctx.scale(backOut(fk), backOut(fk)); fisherman(0, 0, 1.0, t); ctx.restore(); }
        // the tower: the decision "killer whale"
        glow(40, -100, 300, '#9FD8FF', .5 + .2 * Math.sin(t * 3)); flat(rectPts(-60, -230, 200, 380), '#2A3A5A', { line: '#F3EBDC', lw: 6 }); flat([[-80, -230], [40, -310], [160, -230]], '#3A64B8', { line: '#F3EBDC', lw: 6 });
        photoFlat(SL + 'v19610', -30, -200, 140, 140, { border: 8, borderCol: '#F3EBDC', shadow: false });
        T('"killer whale"', 40, -355, 60, '#2A2340', { font: MARK });
        ctx.restore();
      }
      ctx.restore();
    });
    if (t > tNe - .8 && zk < .1) capL('zoom out to whole neighbourhoods', 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tNe - .8, tNe + .4) * (1 - seg(t, tSt - .6, tSt - .3)) });
    if (t > tSt - .3 && zk < .1) capL('every street connected to real buildings', 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tSt - .3, tBu + .3) });
    if (t > tTh - .3) capL('three routes', 960, 1016, 60, '#FFE08A', { face: 'marker', shadow: false, screen: true, stroke: '#2A1A3A', strokeW: .12, reveal: seg(t, tTh - .3, tTh + .3) });
  }

  // ---------- 6 · deception can't hide from the model's own circuits ----------
  function deception(t, lt, dur) {
    const a = cs('zo_deception'), tDe = wt('zo_deception', 'deception'), tHi = wt('zo_deception', 'hide'), tEl = wt('zo_deception', 'else'), tPl = wt('zo_deception', 'plain'), tRe = wt('zo_deception', 'read'), tAn = wt('zo_deception', 'answers'), tBu = wt('zo_deception', 'But'), tCi = wt('zo_deception', 'circuits'), tBe = wt('zo_deception', 'become'), tUs = wt('zo_deception', 'us'), tFe = wt('zo_deception', 'fear'), e = ce('zo_deception');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .6)), circ = seg(t, tBu, tCi + .6), rd = seg(t, tBe - .2, tUs) * (1 - seg(t, tFe, tFe + .8));
    postcard(960, 520 + (1 - ki) * 1100, 1680, 900, { rot: .012, caption: t < a + 1.2 ? 'the NETWORK by night' : null, capW: 900, capCol: '#3A2A6A' }, (w, h) => {
      ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#0E1236'], [1, '#2A2A5A']]); ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 60; i++) dot(hash(i * 3.1) * w, hash(i * 7.7) * h * .4, 1.5 + hash(i), '#FFFFFF', .6);
      // ordinary buildings, left and right
      const NB = []; for (let i = 0; i < 10; i++) { const bx = i < 5 ? 20 + i * 120 : w - 620 + (i - 5) * 120, bh = 200 + 180 * hash(i * 4.1); NB.push([bx + 50, h * .74 - bh]); flat(rectPts(bx, h * .74 - bh, 104, bh), '#3A3A6A', { line: '#1A1A3A', lw: 2 }); for (let r = 0; r < 6; r++) for (let c = 0; c < 2; c++) if (hash(i * 9 + r * 2 + c) > .5) flat(rectPts(bx + 16 + c * 44, h * .74 - bh + 20 + r * 34, 26, 20), '#FFD58A', { alpha: .3 + .7 * clamp(circ * 2 - Math.abs(i - 4.5) * .15) }); }
      // the circuits: roads of light from the big building to its neighbours
      if (circ > 0) NB.forEach(([nx, ny], i) => { const C = through([[w / 2, h * .4], [(w / 2 + nx) / 2, Math.min(ny, h * .4) - 80], [nx, ny]], 10), n = Math.max(2, Math.round(C.length * circ)); ctx.strokeStyle = 'rgba(255,214,110,.75)'; ctx.lineWidth = 6; ctx.beginPath(); C.slice(0, n).forEach((p, j) => j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); if (circ >= 1) { const q = C[Math.floor(frac(t * .6 + i * .13) * (C.length - 1))]; glow(q[0], q[1], 26, '#FFE08A', .9); } });
      // the huge lit building, right in the middle
      const bx = w / 2, bw = 380, bh = 500, pul = .7 + .3 * Math.sin(t * 2.4);
      glow(bx, h * .74 - bh * .5, 600, '#C9A0FF', .45 * pul);
      flat(rectPts(bx - bw / 2, h * .74 - bh, bw, bh), '#6A4A8A', { line: '#F3EBDC', lw: 5 }); flat(ellPts(bx, h * .74 - bh, bw * .46, 90, 30).filter(p => p[1] <= h * .74 - bh), '#8A6AAA');
      for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) flat(rectPts(bx - bw / 2 + 30 + c * 88, h * .74 - bh + 190 + r * 60, 56, 40), '#FFE6A8', { alpha: .55 + .45 * pul });
      flat(rrPts(bx - 230, h * .74 - bh + 30, 460, 120, 14), '#2A1A3A', { line: '#FFE08A', lw: 6 });
      glyphLine(bx, h * .74 - bh + 90, 60, 6, 41, '#FFE08A', 'DECEPTION', rd, { size: 66, font: SERIF });
      // the street, and passers-by who never look up
      flat(rectPts(0, h * .74, w, h * .26), '#1E1A36');
      for (let i = 0; i < 7; i++) { const ph = frac((t - a) * .04 + i / 7), x = -80 + ph * (w + 160); person(x, h * .9 + (i % 2) * 20, 1.1, { col: ['#3A9C98', '#C2456A', '#E8AA38', '#7B5CA8', '#3A64B8', '#6E9F58', '#D97757'][i], key: 'c13pp' + i, walk: t * 2 + i, look: .2, flip: false }); }
      // the answer booth: reads only the model's answers, and smiles
      flat(rectPts(w * .2 - 170, h * .74 - 240, 340, 240), '#3A6A5A', { line: '#F3EBDC', lw: 4 }); T('ANSWERS', w * .2, h * .74 - 196, 44, '#F3EBDC', { font: SERIF, weight: '900' }); const ak = seg(t, tAn - .6, tAn); if (ak > 0) T('all fine :)', w * .2, h * .74 - 100, 72, '#9FE3A6', { font: HANDF, alpha: ak });
      const turn = seg(t, tBe - .4, tBe);
      const shut = seg(t, tFe - .2, tFe + .3);
      tour(t, w * .88, h * .97, 19, [[t - lt, 'neutral'], [tPl, 'thinking'], [tRe, 'confused'], [tAn, 'suspicious'], [tBe, 'surprised'], [tUs, 'excited'], [tFe, 'nervous']], { flip: true, aR: turn > .5 && shut < .5 ? 1.8 : .4, armR: turn > .5 && shut < .5 ? bookProp(1) : null });
    });
    capL('the answer was in plain sight', 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tPl - .5, tPl + .5), alpha: 1 - seg(t, tAn - 1.2, tAn - .8) });
    if (t > tCi - .6) capL("it can't hide from the model's own circuits", 960, 1016, 54, '#FFE08A', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tCi - .6, tCi + .4), alpha: 1 - seg(t, tBe - .5, tBe - .2) });
    if (t > tBe - .2 && t < tFe - .3) capL('become readers too, and we can read it', 960, 1016, 60, '#FFE08A', { face: 'marker', shadow: false, screen: true, stroke: '#2A1A3A', strokeW: .12, reveal: seg(t, tBe - .2, tBe + .5) });
    if (t > tFe - .3) capL("Nick's fear: right there, and unread", 960, 1016, 60, '#E7D4FF', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tFe - .3, tFe + .6) });
  }

  // ---------- 7 · the asymmetry: a lead, or a dead end ----------
  function asym(t, lt, dur) {
    const a = cs('zo_asym'), tCl = wt('zo_asym', 'clean'), tLe = wt('zo_asym', 'lead'), tIn = wt('zo_asym', 'investigate'), tKn = wt('zo_asym', 'knot'), tDe = wt('zo_asym', 'dead'), tSt = wt('zo_asym', 'stop'), tYe = wt('zo_asym', 'years'), tMa = wt('zo_asym', 'made'), e = ce('zo_asym');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .6));
    postcard(960, 520 + (1 - ki) * 1100, 1680, 900, { rot: -.012, caption: 'the ROAD AHEAD', capW: 820, capCol: '#3A6A5A' }, (w, h) => {
      ctx.fillStyle = lgrad(0, 0, 0, h, [[0, '#9FD0E6'], [1, '#F2E2C0']]); ctx.fillRect(0, 0, w, h);
      flat([[0, h * .5], [w, h * .46], [w, h], [0, h]], '#B9D49A');
      // the two roads from the messy building
      const RA = [[300, h * .72], [700, h * .5], [1100, h * .28], [1500, h * .22]], RB = [[300, h * .74], [700, h * .82], [1050, h * .86], [1240, h * .86]];
      for (const [P, col] of [[RA, '#D9C9A0'], [RB, '#C9B9A0']]) { const C = through(P, 10); ctx.strokeStyle = mixCol(col, '#000000', .25); ctx.lineWidth = 70; ctx.lineCap = 'round'; ctx.beginPath(); C.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = 58; ctx.stroke(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.setLineDash([24, 22]); ctx.stroke(); ctx.setLineDash([]); }
      // a lit city of discoveries at the top right
      const ck = seg(t, tLe - .3, tIn + .8);
      for (let i = 0; i < 9; i++) { const bx = 1260 + i * 40, bh = 80 + 120 * hash(i * 3); flat(rectPts(bx, h * .26 - bh, 36, bh), mixCol('#5A6A9A', '#FFE08A', ck * .5), { line: INK, lw: 2 }); }
      if (ck > 0) { glow(1440, h * .16, 300, '#FFE08A', .7 * ck); for (let i = 0; i < 8; i++) { const f = frac(t * .5 + i / 8), q = i / 8 * TAU; ctx.save(); ctx.globalAlpha = ck * (1 - f); ctx.translate(1440 + Math.cos(q) * 200 * f, h * .14 + Math.sin(q) * 100 * f); flat(starPts(0, 0, 20, .4, 4), '#FFE08A'); ctx.restore(); } }
      // the brick wall at the end of the other road
      for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) flat(rectPts(1250 + c * 62 + (r % 2) * 31, h * .62 + r * 36, 60, 34), '#B5533C', { line: '#5A2A1A', lw: 2 });
      // the messy building at the fork: a tangle of violet
      flat(rectPts(140, h * .74 - 260, 220, 260), '#6A4A8A', { line: INK, lw: 4 }); knotBeast(250, h * .74 - 320, 60, { look: [1, 0] });
      // signposts
      const sign = (x, y, s1, col, k) => { if (k <= 0) return; const b = backOut(k); ctx.save(); ctx.translate(x, y); ctx.scale(b, b); flat(rectPts(-8, 0, 16, 140), '#6A4A2A'); flat([[-170, -70], [170, -70], [210, -35], [170, 0], [-170, 0]], col, { line: INK, lw: 4 }); T(s1, 0, -34, 40, '#FFFFFF', { font: SERIF, weight: '900' }); ctx.restore(); };
      sign(640, h * .4, 'ASSUME CLEAN', '#3A8A4A', popk(t, tCl - .4, .4)); sign(660, h * .7, 'ASSUME A KNOT', '#7B5CA8', popk(t, tKn - .4, .4));
      // the cars: one finds a lead, one hits the wall (and parks there for years)
      const carA = seg(t, tLe - .6, tIn + .6), carB = seg(t, tDe - 1.4, tDe - .1);
      const car = (P, k, col, rot0 = 0) => { const C = through(P, 10), i = Math.floor(clamp(k) * (C.length - 1)), p = C[i], q = C[Math.min(C.length - 1, i + 1)], ang = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.save(); ctx.translate(p[0], p[1] - 26); ctx.rotate(ang * .6 + rot0); flat(rrPts(-60, -30, 120, 44, 14), col, { line: INK, lw: 3 }); flat(rrPts(-34, -52, 64, 26, 8), '#BFE6FF', { line: INK, lw: 3 }); dot(-34, 16, 14, '#2A2340'); dot(34, 16, 14, '#2A2340'); ctx.restore(); };
      if (carA > 0) car(RA, carA, '#E8862A');
      if (carB > 0) car(RB, carB, '#3A64B8', t > tDe - .1 ? Math.sin((t - tDe) * 30) * .06 * Math.exp(-(t - tDe) * 4) : 0);
      if (t > tDe - .15 && t < tDe + 1.2) { const age = t - tDe + .15; ctx.save(); ctx.globalAlpha = 1 - age / 1.35; T('BONK!', 1180, h * .62, 70, '#D2473F', { font: MARK, stroke: '#FFFFFF', sw: 10 }); ctx.restore(); }
      // years pass at the wall: cobwebs and a calendar flipping
      const yk = seg(t, tMa - .5, tYe + .6);
      if (yk > 0) { const yr = 2017 + Math.floor(yk * 6.99); ctx.save(); ctx.translate(1050, h * .6); flat(rectPts(-70, -80, 140, 110), '#FFFFFF', { line: INK, lw: 3 }); flat(rectPts(-70, -80, 140, 30), '#D2473F'); T(String(yr), 0, -10, 46, INK, { font: SERIF, weight: '900' }); ctx.restore(); ctx.save(); ctx.globalAlpha = yk; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(1250, h * .62); ctx.lineTo(1250 - 60 + i * 10, h * .62 + 20 + i * 12); ctx.stroke(); } ctx.restore(); }
    });
    if (t > tLe - .3) capL('assume clean: a mess is a lead', 960, 1016, 54, '#FFE08A', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tLe - .3, tLe + .6), alpha: 1 - seg(t, tKn - .6, tKn - .3) });
    if (t > tKn - .3) capL('assume a knot: a mess is a dead end', 960, 1016, 54, '#E7D4FF', { face: 'hand', shadow: false, screen: true, reveal: seg(t, tKn - .3, tDe + .4), alpha: 1 - seg(t, tMa - .5, tMa - .2) });
    if (t > tMa - .2) capL('Nick made that mistake for years', 960, 1016, 58, '#FFF6E0', { face: 'marker', shadow: false, screen: true, stroke: '#2A1A3A', strokeW: .12, reveal: seg(t, tMa - .2, tYe + .2) });
  }

  // ---------- 8 · a postcard to Nick's younger self, posted through time ----------
  const TIPS = [['look at the giant pose circuit', 'pose'], ['what switches it off is a gate', 'gate'], ["last districts: don't trust the Sketch Artist", 'trust', 47], ['a mess? look harder', 'harder']];
  function advice(t, lt, dur) {
    const a = cs('zo_advice'), tNo = wt('zo_advice', 'note'), tEi = wt('zo_advice', 'eight'), tMe = wt('zo_advice', 'mess', 1), tUn = wt('zo_advice', 'understood'), e = ce('zo_advice');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .6)), post = seg(t, tUn - .8, e + .2), stampK = popk(t, tMe - .4, .35);
    // the time-mailbox
    const mb = seg(t, tMe - 1, tMe);
    if (mb > 0) { const mx = 1660, my = 900; for (let i = 0; i < 7; i++) { ctx.save(); ctx.globalAlpha = mb * (.25 + .1 * i); ctx.strokeStyle = ['#C9A0FF', '#9FD8FF', '#FFE08A'][i % 3]; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(mx, my - 260, 40 + i * 28 + 8 * Math.sin(t * 3 + i), 30 + i * 20, t * (.5 + i * .1), 0, TAU); ctx.stroke(); ctx.restore(); } ctx.save(); ctx.translate(mx, my); ctx.scale(1, backOut(mb)); flat(rectPts(-14, -160, 28, 170), '#3A3A44'); flat(rrPts(-110, -360, 220, 220, 30), '#C8402A', { line: '#2A1A10', lw: 5 }); flat(rectPts(-70, -300, 140, 18), '#1A0A08'); T('MAIL · 2018', 0, -200, 30, '#FFF6E0', { font: SERIF, weight: '900' }); ctx.restore(); }
    const pX = lerp(900, 1660, easeIn(post)), pY = lerp(520, 600, easeIn(post)) - Math.sin(post * Math.PI) * 120, pS = lerp(1, .08, easeIn(post));
    postcard(pX, pY + (1 - ki) * 1100, 1500, 900, { s: pS, rot: lerp(-.02, .6, post), paper: '#F7F1E4' }, (w, h) => {
      ctx.fillStyle = '#F7F1E4'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#C9B48E'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .62, 40); ctx.lineTo(w * .62, h - 40); ctx.stroke();
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(w * .66, h * .5 + i * 80); ctx.lineTo(w - 50, h * .5 + i * 80); ctx.stroke(); }
      T('to: Nick, eight years ago', w * .81, h * .5 - 30, 40, '#3A64B8', { font: HANDF });
      // the stamp and the postmark
      ctx.save(); ctx.translate(w - 150, 140); flat(rectPts(-80, -100, 160, 200), '#FFFFFF', { line: '#C9B48E', lw: 3 }); ctx.fillStyle = lgrad(0, -80, 0, 80, [[0, '#F0A24E'], [1, '#C9963A']]); ctx.fillRect(-64, -84, 128, 168); dot(20, -30, 26, '#FFE9B0'); acaciaMini(-20, 60, .5); ctx.restore();
      if (stampK > 0) { ctx.save(); ctx.translate(w - 270, 170); ctx.rotate(-.25); ctx.scale(lerp(1.6, 1, easeOut(stampK)), lerp(1.6, 1, easeOut(stampK))); ctx.globalAlpha = .85; ctx.strokeStyle = '#3A3A6A'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 90, 0, TAU); ctx.stroke(); T('2026', 0, 0, 44, '#3A3A6A', { font: SERIF, weight: '900' }); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(100, -30 + i * 20); ctx.quadraticCurveTo(160, -40 + i * 20, 220, -30 + i * 20); ctx.stroke(); } ctx.restore(); }
      T('Dear Nick,', 70, 90, 60, INK, { font: HANDF, align: 'left', alpha: seg(t, tNo - .3, tNo + .3) });
      TIPS.forEach(([s1, w1, fs = 58], i) => { const tw = wt('zo_advice', w1), k = seg(t, tw - .8, tw + .4); if (k <= 0) return; ctx.save(); ctx.beginPath(); ctx.rect(40, 150 + i * 150, 60 + 860 * k, 140); ctx.clip(); dot(80, 230 + i * 150, 10, '#C2456A'); T(s1, 110, 230 + i * 150, fs, '#C2456A', { font: HANDF, align: 'left' }); ctx.restore(); });
    });
    if (t > tEi - .3 && t < tNo + 3.5) capL('a note back in time', 960, 1016, 54, '#FFF6E0', { face: 'hand', shadow: false, screen: true, reveal: seg(t, a, a + .8) });
    tour(t, 1440, 1010, 13, [[t - lt, 'thinking'], [tMe, 'determined'], [tUn, 'happy']], { flip: true, aR: post > 0 ? 1.4 : .3 });
  }
  function acaciaMini(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); flat(taper([[0, 0], [6, -60], [-4, -110]], [12, 9, 6]), '#3A2410'); for (let k = 0; k < 3; k++) flat(ellPts(-50 + k * 50, -116, 50, 14, 14), '#3A2410'); ctx.restore(); }

  // ---------- 9 · the crossword fills slowly, then in a rush; the card flips to a World's Fair poster ----------
  const GRID = ['VPOSEXGATEXX', 'XXOXXCURVEXD', 'TAXIXAXXDOGX', 'XXRXSANTAXXX', 'WHALEXRIVERX', 'XXXDIYXVOTEX', 'TREEXXCARXSX'];
  function fairPoster(w, h, t) {
    ctx.fillStyle = '#F1E3C6'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 36; i++) { const a0 = i / 36 * TAU + t * .02, a1 = a0 + .5 / 36 * TAU; ctx.fillStyle = '#F2B04A'; ctx.beginPath(); ctx.moveTo(w / 2, h * .5); ctx.lineTo(w / 2 + Math.cos(a0) * 1600, h * .5 + Math.sin(a0) * 1600); ctx.lineTo(w / 2 + Math.cos(a1) * 1600, h * .5 + Math.sin(a1) * 1600); ctx.closePath(); ctx.fill(); }
    dot(w / 2, h * .5, 260, '#E8862A');
    flat([[w / 2 - 70, h * .82], [w / 2 - 36, h * .26], [w / 2 + 36, h * .26], [w / 2 + 70, h * .82]], '#2E6A6A'); flat(ellPts(w / 2, h * .26, 110, 36, 30), '#2E6A6A'); flat(ellPts(w / 2, h * .25, 80, 22, 30), '#9FE3C8');
    for (let i = 0; i < 3; i++) { ctx.strokeStyle = '#1A3A3A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(w / 2, h * .42 + i * 110, 240 - i * 40, 46, 0, 0, TAU); ctx.stroke(); }
    flat(rectPts(0, h * .82, w, h * .18), '#2E6A6A');
    T('THE LABORATORY', w / 2, 90, 100, '#1A3A3A', { font: SERIF, weight: '900' }); T('OF TOMORROW', w / 2, 180, 70, '#C8402A', { font: SERIF, weight: '900' });
  }
  function crossword(t, lt, dur) {
    const a = cs('zo_crossword'), tCo = wt('zo_crossword', 'compounds'), tSt = wt('zo_crossword', 'stuck'), tFi = wt('zo_crossword', 'fill'), tFa = wt('zo_crossword', 'faster'), e = ce('zo_crossword');
    space(t); globe(t, 960, 2300, 1900, gLon(t), 30, { night: gNight(t) });
    const ki = easeOut(seg(t, t - lt, t - lt + .6)), flip = seg(t, e - .2, e + .9), fx = Math.cos(flip * Math.PI), grow = easeInOut(seg(t, e + .6, NEXT + .1));
    const k = seg(t, tSt - .3, tFa + .6), filled = Math.round(84 * Math.pow(k, 2.6)), oneClue = t > tSt - .5 && filled < 3;
    postcard(960, lerp(520, 540, grow) + (1 - ki) * 1100, lerp(1500, 1920, grow), lerp(900, 1080, grow), { rot: lerp(-.015, 0, grow), flipX: Math.abs(fx), border: lerp(24, 0, grow), paper: '#F7F1E4' }, (w, h) => {
      if (fx >= 0) {
        ctx.fillStyle = '#F7F1E4'; ctx.fillRect(0, 0, w, h);
        T('THE CROSSWORD', w / 2, 70, 56, INK, { font: SERIF, weight: '900' });
        const cs_ = 84, gx = (w - 12 * cs_) / 2, gy = 130; let n = 0;
        GRID.forEach((row, r) => { for (let c = 0; c < 12; c++) { const ch = row[c], x = gx + c * cs_, y = gy + r * cs_; if (ch === 'X') { ctx.fillStyle = INK; ctx.fillRect(x, y, cs_, cs_); continue; } const ord = Math.floor(hash(r * 12 + c) * 84); ctx.fillStyle = ord < filled ? ['#F7E2A8', '#D9EBC9', '#CFE0F0', '#F2D0D8'][(r + c) % 4] : '#FFFFFF'; ctx.fillRect(x, y, cs_, cs_); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(x, y, cs_, cs_); if (ord < filled) T(ch, x + cs_ / 2, y + cs_ / 2 + 4, 52, INK, { font: MARK }); n++; } });
        if (oneClue) { ctx.strokeStyle = '#C2456A'; ctx.lineWidth = 8; ctx.strokeRect(gx + 1 * cs_ - 6, gy - 6, 4 * cs_ + 12, cs_ + 12); T('?', gx + 3 * cs_, gy + cs_ * .5, 60, '#C2456A', { font: MARK }); }
      } else fairPoster(w, h, t);
    });
    if (filled < 84 && fx > 0) { const sp = Math.pow(k, 1.6); letter(sp < .3 ? 'slowly…' : sp < .7 ? 'faster…' : 'FASTER!', 1640, 160, 50 + 30 * sp, '#FFE08A', { face: 'marker', shadow: false, stroke: '#2A1A3A', strokeW: .12, screen: true, rot: -.08, alpha: seg(t, tFi - .5, tFi) }); }
    if (fx > 0 && t < e) capL('understanding compounds', 960, 1016, 60, '#FFF6E0', { face: 'marker', shadow: false, screen: true, stroke: '#2A1A3A', strokeW: .12, reveal: seg(t, tCo - .6, tCo + .4) });
    if (flip < .5) tour(t, 1700, 1010, 12, [[t - lt, 'thinking'], [tFi, 'determined'], [tFa, 'excited'], [e, 'starstruck']], { flip: true });
  }

  // shots: each new postcard slides up from below while the previous one is tossed off the top, so a card is always
  // arriving as the old one leaves (the globe behind is one continuous spin)
  const LIST = [[CH, orbit], [wt('zo_clean', 'have') + .3, readable], [cs('zo_bigger') - .3, bigger], [cs('zo_tokyo') - .3, tokyo], [cs('zo_maps') - .3, maps], [cs('zo_deception') - .3, deception], [cs('zo_asym') - .3, asym], [cs('zo_advice') - .3, advice], [cs('zo_crossword') - .3, crossword]];
  const HAND = new Set([bigger, tokyo, maps, deception, asym, advice]);
  const TOSS = .95;
  const W_ = i => (t, lt, dur) => {
    NOW = t; const [t0, f] = LIST[i]; f(t, lt, dur);
    if (!HAND.has(f) || lt >= TOSS) return;
    const [p0, pf] = LIST[i - 1], k = easeIn(lt / TOSS), n = LETTERS.length;
    ctx.save(); ctx.translate(960, 540); ctx.translate(-160 * k, -1250 * k); ctx.rotate(-.22 * k); ctx.translate(-960, -540);
    SKIPBG = true; try { pf(t, t - p0, t0 - p0); } finally { SKIPBG = false; LETTERS.length = n; ctx.restore(); }
  };
  shots(LIST.map(([t0, f], i) => [t0, W_(i), { fade: HAND.has(f) || f === readable ? 0 : .8 }]));
})();
