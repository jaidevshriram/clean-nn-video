// ch05 The foggy district: VICTORIAN COPPER ENGRAVING that turns into clean modern colour. The brass magnifier from
// the spy file is the lens of a great microscope on a cart in a foggy London street; the focus knob turns 2009 → 2017
// → 2026; InceptionV1's last district sags in the fog (crooked signs, tangled windows, a 5% hoarding); the fog curls
// into the Knot; ConvNeXt renovates it (an elevated railway bypass, even gas lamps; captioned with the narrated
// terms only); the fog lifts in a wave and the engraving itself dissolves into clean colour; 5% → 50% → 70% → 99%; the lesson
// on a rooftop at dawn; a seed sprouts in the renovated park (the next world is a botanical plate).
(() => {
  const MT = 'blog/raw/microscope-timeline/', LL = 'blog/raw/last-layer-neurons/medium/images/', CL = 'blog/raw/crushed-last-layer/images/', V = 'blog/raw/v-figure-10x/';
  const MIX = [V + 'p47742', V + 'c4d201c', V + 'c5a94a', V + 'n1070575', V + 'pPool13', V + 'n282687', V + 'c5a317d', V + 'n1158528', V + 'c4d493a', V + 'pTrain34', V + 'c5a352d', V + 'n132986'];
  const LADY = ['img-02651-x32-y64', 'img-04173-x32-y32', 'img-05390-x32-y00', 'img-21789-x32-y32', 'img-23690-x32-y00', 'img-37284-x64-y00', 'img-41574-x32-y32', 'img-47708-x32-y32'].map(n => LL + n);
  const CN = n => CL + 'n' + String(n).padStart(2, '0') + '_positive_00';
  const CLEAN = [LADY.slice(0, 4), [CN(10), CN(11), CN(12), CN(10)], [CN(5), CN(7), CN(5), CN(7)], LADY.slice(4, 8), [CN(1), CN(3), CN(1), CN(3)]];
  const INK = '#2A2018', PAPER = '#EFE4CC';

  // ---------- the engraving pass, with a moving front: left of the front is clean modern colour ----------
  // the hatch pattern is static, so its two line-distance fields are computed once (0..255 per pixel)
  let HT = null, ENG_ID = null;
  function hatch() { if (HT) return HT; const sp = 6, T1 = new Uint8Array(W * 6), T2 = new Uint8Array(W * 6); for (let y = 0; y < 6; y++) for (let x = 0; x < W; x++) { const u = ((x + y) % sp) / sp, v = ((x - y + 4096) % sp) / sp; T1[y * W + x] = Math.round(Math.abs(u - .5) * 2 * 255); T2[y * W + x] = Math.round(Math.abs(v - .5) * 2 * 255); } return (HT = [T1, T2]); }
  function engrave(front = -1e4, soft = 160, lens = null) {
    POST.push(() => {
      // (getImageData leaks a full frame per call in @napi-rs/canvas; read the canvas's raw pixels into one reused buffer)
      const [T1, T2] = hatch(), raw = CANVAS.data && CANVAS.width === W && CANVAS.height === H ? CANVAS.data() : null;
      let d; if (raw) { if (!ENG_ID) ENG_ID = ctx.createImageData(W, H); d = ENG_ID; d.data.set(raw); } else d = ctx.getImageData(0, 0, W, H);
      const D = d.data, tk = .16, Ls = !lens ? [] : Array.isArray(lens[0]) ? lens : [lens];
      const inkR = 86 * .84, inkG = 50 * .84, inkB = 28 * .84, pR = 246 * .84, pG = 232 * .84, pB = 204 * .84;
      for (let y = 0; y < H; y++) {
        const fy = front + 60 * Math.sin(y * .013) + (y - 540) * .35, row = (y % 6) * W;
        let x0 = Math.max(0, Math.floor(fy)); if (x0 >= W) continue;
        for (let x = x0, i = (y * W + x0) * 4; x < W; x++, i += 4) {
          let m = x - fy >= soft ? 1 : (x - fy) / soft; if (m <= 0) continue;
          for (const L of Ls) {
            if (L[5] === 'rect') { if (x > L[0] && x < L[2] && y > L[1] && y < L[3]) { const e = Math.min(x - L[0], L[2] - x, y - L[1], L[3] - y); m *= lerp(L[4], 1, 1 - clamp(e / 10)); break; } continue; }
            const dx = x - L[0], dy = y - L[1];
            if (L.length > 4) { const q = (dx * dx) / (L[2] * L[2]) + (dy * dy) / (L[4] * L[4]); if (q < 1) { m *= lerp(L[3], 1, clamp((Math.sqrt(q) - .85) / .15)); break; } continue; }   // an ellipse with a tight edge
            const q = (dx * dx + dy * dy) / (L[2] * L[2]); if (q < 1) { m *= L.length > 3 ? lerp(L[3], 1, q * q) : .3; break; }
          }
          const r = D[i], g = D[i + 1], bl = D[i + 2], l = Math.min(255, (r * .3 + g * .59 + bl * .11) * .86 + 44);   // lifted, so more paper shows
          const t1 = T1[row + x], t2 = T2[row + x];
          const ink = l < 52 || t1 < (255 - l) * .95 || (l < 115 && t2 < (115 - l) * 1.7);
          let er, eg, eb;
          if (ink) { er = inkR + r * tk * .4; eg = inkG + g * tk * .4; eb = inkB + bl * tk * .4; } else { er = pR + r * tk; eg = pG + g * tk; eb = pB + bl * tk; }
          if (m >= 1) { D[i] = er; D[i + 1] = eg; D[i + 2] = eb; } else { D[i] = r + (er - r) * m; D[i + 1] = g + (eg - g) * m; D[i + 2] = bl + (eb - bl) * m; }
        }
      }
      ctx.putImageData(d, 0, 0);
    });
  }
  // blurred copies of photos, made once (a fogged window pane)
  const BLUR = new Map();
  function blurred(im, px) { const k = im + '|' + Math.round(px); let c = BLUR.get(k); if (!c) { const I = img(im); c = createCanvas(I.width, I.height); const g = c.getContext('2d'); g.filter = `blur(${Math.round(px) * I.width / 260}px)`; g.drawImage(I, 0, 0); BLUR.set(k, c); } return c; }
  // the dissolve front (screen x) at time t: everything engraved before 'beautiful', clean after the wave
  const waveFront = t => { const tb = wt('fd_renovate', 'last', 0) - .1, k = seg(t, tb, tb + 2.4); return k <= 0 ? -1e4 : k >= 1 ? 1e4 : lerp(-500, 2500, easeInOut(k)); };
  const waveK = t => clamp((waveFront(t) + 500) / 3000);

  // a caption on an engraved paper label (a POST after the engraving, so it stays legible over the hatching)
  function cap(txt, k, o = {}) {
    if (k <= 0) return; const sz = o.size || 60, x = o.x || 960, y = o.y || 150, face = o.face || 'serif', bold = face === 'serif';
    // the whole plaque pops open from its centre first, then the words are written inside it
    const pk = seg(k, 0, .3), tk = seg(k, .22, 1);
    POST.push(() => { ctx.save(); ctx.font = `${bold ? 'bold ' : ''}${sz}px ${FONTS[face] || face}`; const w = ctx.measureText(txt).width + sz * 1.1, h = sz * 1.5; ctx.translate(x, y); ctx.scale(Math.max(.02, backOut(pk)), Math.max(.02, ease(clamp(pk * 1.6)))); ctx.globalAlpha = clamp(pk * 3); ctx.fillStyle = o.bg || PAPER; ctx.strokeStyle = INK; ctx.lineWidth = 2.5; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 1; ctx.strokeRect(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14); ctx.restore(); });
    if (tk > 0) letter(txt, x, y, sz, o.col || INK, { face, bold, reveal: tk, shadow: false });
  }
  // Clawd stays in colour through the engraving (a soft hole in the pass around him), so he never sinks into the hatching
  // (a tall ellipse from his feet to the top of the tallest hat, with a tight edge, so no muddy ring is left around him)
  const scr = (x, y) => { const z = LAST_CAM ? LAST_CAM.zoom : 1; return LAST_CAM ? [(x - LAST_CAM.cx) * z + 960, (y - LAST_CAM.cy) * z + 540, z] : [x, y, 1]; };
  const clawdHole = (x, y, s) => { const [sx, sy, z] = scr(x, y); return [sx, sy - 6.6 * s * z, 7.6 * s * z, 0, 8.4 * s * z]; };
  // a hole for a loose hat in flight (x, y = the brim centre in world space; s = the hat size)
  const hatHole = (x, y, s) => { const [sx, sy, z] = scr(x, y - s * .28); return [sx, sy, s * .62 * z, 0, s * .5 * z]; };

  // where a point of Clawd's body (body-local, in u) lands in the world, for the pose o given to clawd(); armTip finds his
  // hand, so a prop he works (the focus knob) can follow it exactly
  function bodyPt(x, y, u, o, bx, by) {
    const sq = (o.sq || 0) + (o.take || 0), sm = clamp(o.smear || 0), fx = (o.flip ? -1 : 1) * (o.sx ?? 1) * (1 + sq * .6) * (1 + sm * .35), fy = (o.sy ?? 1) * (1 - sq);
    const px = bx * u * fx, py = by * u * fy, r = o.rot || 0, c = Math.cos(r), s = Math.sin(r);
    return [x + (o.dx || 0) * u + px * c - py * s, y + (o.dy || 0) * u + px * s + py * c];
  }
  function armTip(x, y, u, o, which = 'R') {
    const V = VIEWS[o.view] || VIEWS.front, A = V.arms.find(q => q[2] === which), a = which === 'L' ? (o.aL ?? .2) : (o.aR ?? .2);
    const [px, dir] = A; let rx, ry, ang, len;
    if (dir === 0) { rx = px; ry = -4.2; ang = .7 - a; len = 2.1; } else { rx = px + dir * .55 * clamp((Math.abs(a) - .7) / .9); ry = -4.5; ang = dir < 0 ? a : -a; len = 2.2 * (dir < 0 ? -1 : 1); }
    return bodyPt(x, y, u, o, rx + Math.cos(ang) * len, ry + Math.sin(ang) * len);
  }

  // ---------- pieces ----------
  function fill(im, cx, cy, r, a = 1, blur = 0) { if (a <= 0) return; const I = blur > .5 ? blurred(im, Math.min(16, Math.round(blur / 2) * 2)) : img(im), s = Math.min(I.width, I.height); ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, cx - r, cy - r, 2 * r, 2 * r); ctx.restore(); }
  // the great microscope on its cart: brass ring lens at (x, y - 380*s); o.view(cx, cy, r) draws inside the lens
  function scope(t, x, y, s, o = {}) {
    boilSeed('c5scope');
    push(); translate(x, y); scale(s);
    paint(rrPts(-210, -70, 420, 70, 14), { wash: '#7A5B3E', ink: INK, sw: 1.3 });
    for (const wx of [-140, 140]) { paint(ellPts(wx, 0, 46, 46, 20), { wash: '#4A4038', ink: INK, sw: 1.2 }); const q = (o.roll || 0) * 3; for (let k = 0; k < 6; k++) inkLine([[wx, 0], [wx + Math.cos(q + k) * 40, Math.sin(q + k) * 40]], 1, INK, 'inkfine', 0); }
    paint([[-30, -70], [30, -70], [16, -200], [-16, -200]], { wash: '#9A7A3A', ink: INK, sw: 1.1 });
    paint(rectPts(-12, -330, 24, 140, 1), { grad: [[0, '#D9B46A'], [1, '#9A7A3A']], gdir: [-12, 0, 12, 0], ink: INK, sw: 1 });
    paint(ellPts(0, -380, 220, 220, 44), { grad: [[0, '#E8C27A'], [1, '#A87A3A']], ink: INK, sw: 1.8 });
    for (let k = 0; k < 24; k++) { const q = k / 24 * TAU; inkLine([[Math.cos(q) * 196, -380 + Math.sin(q) * 196], [Math.cos(q) * 214, -380 + Math.sin(q) * 214]], .8, INK, 'inkfine', 0); }
    pop();
    const cx = x, cy = y - 380 * s, r = 186 * s;
    ctx.save(); const P = new Path2D(); P.arc(cx, cy, r, 0, TAU); ctx.clip(P); ctx.fillStyle = '#D9D3C9'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); if (o.view) o.view(cx, cy, r); ctx.restore();
    ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(cx - r * .4, cy - r * .45, r * .36, r * .16, -.6, 0, TAU); ctx.fill(); ctx.restore();
    // focus knob on the right of the ring
    push(); translate(x + 50 * s, y - 130 * s); rotate(o.knob || 0); boilSeed('c5knob'); paint(ellPts(0, 0, 46 * s, 46 * s, 18), { wash: '#C9A15A', ink: INK, sw: 1.3 }); for (let i = 0; i < 10; i++) { const q = i / 10 * TAU; inkLine([[Math.cos(q) * 30 * s, Math.sin(q) * 30 * s], [Math.cos(q) * 46 * s, Math.sin(q) * 46 * s]], 1.4, INK, 'inkfine', 0); } paint(ellPts(0, -30 * s, 7 * s, 7 * s, 10), { wash: INK, ink: null }); pop();
  }
  // a Victorian terrace house; its windows (2 × 2) show the neuron's photos. tilt sags it, blur fogs the panes
  function house(x, base, w, h, imgs, o = {}) {
    const tilt = o.tilt || 0, key = o.key || 'h' + x, col = o.col || '#6A5A4E';
    boilSeed(key);
    push(); translate(x, base); rotate(tilt); translate(-x, -base);
    paint(rectPts(x - w / 2, base - h, w, h + 10, 1), { grad: [[0, mixCol(col, '#FFFFFF', .1)], [1, mixCol(col, '#000000', .25)]], gdir: [0, base - h, 0, base], ink: INK, sw: 1.3, tex: .3 });
    for (const cx of [x - w * .3, x + w * .25]) paint(rectPts(cx - 16, base - h - 58, 32, 62, 1), { wash: mixCol(col, '#000000', .3), ink: INK, sw: 1 });
    paint(rectPts(x - w / 2 - 10, base - h - 14, w + 20, 18, 1), { wash: mixCol(col, '#000000', .35), ink: INK, sw: 1 });
    // brick courses
    for (let r = 0; r < 10; r++) inkLine([[x - w / 2 + 8, base - h + 40 + r * (h - 60) / 10], [x + w / 2 - 8, base - h + 40 + r * (h - 60) / 10]], .5, mixCol(col, '#000000', .45), 'inkfine', 0);
    const ww = w * .32, wh = (h * .6) / 2 - 24;
    for (let i = 0; i < 4; i++) {
      const wx = x - w / 2 + w * .12 + (i % 2) * (w * .44), wy = base - h + 36 + Math.floor(i / 2) * (wh + 34);
      paint(rectPts(wx - 7, wy - 7, ww + 14, wh + 14, .5), { wash: '#2A2420', ink: INK, sw: 1 });
      const im = imgs[i % imgs.length], bq = Math.round((o.blur || 0) * 2) / 2, I = bq > .4 ? blurred(im, bq * 2) : img(im), s = Math.min(I.width, I.height * ww / wh);
      ctx.save(); ctx.globalAlpha = o.lit ?? 1; ctx.drawImage(I, (I.width - s) / 2, (I.height - s * wh / ww) / 2, s, s * wh / ww, wx, wy, ww, wh); ctx.restore();
      if (o.glow) glow(wx + ww / 2, wy + wh / 2, ww * .8, '#FFD58A', o.glow * .5);
      inkLine([[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], 1.4, '#2A2420', 'inkfine', 0); inkLine([[wx, wy + wh / 2], [wx + ww, wy + wh / 2]], 1.4, '#2A2420', 'inkfine', 0);
    }
    paint(rrPts(x - w * .13, base - h * .26, w * .26, h * .26, w * .12), { wash: '#3A2A22', ink: INK, sw: 1.1 });
    paint(rectPts(x - w * .2, base - 12, w * .4, 14, 1), { wash: '#8A7A6A', ink: INK, sw: .8 });
    pop();
  }
  // a crooked hanging sign
  function crookedSign(x, y, ang, label, t) { boilSeed('cs' + x); push(); translate(x, y); rotate(ang + .05 * Math.sin(t * 1.7 + x)); inkLine([[-50, -40], [-40, 0]], 1.4, INK, 'inkfine', 0); inkLine([[50, -40], [40, 0]], 1.4, INK, 'inkfine', 0); paint(rectPts(-70, 0, 140, 44, 1), { wash: '#C9B48E', ink: INK, sw: .9 }); pop(); if (label) letter(label, x, y + 22, 26, INK, { face: 'serif', rot: ang, shadow: false }); }
  function gasLamp(x, base, k, lit, o = {}) {
    if (k <= 0) return; const h = 230 * backOut(k); boilSeed('gl' + x);
    inkLine([[x, base], [x, base - h]], 5, '#2A2420', 'ink', 0); paint(rectPts(x - 12, base - 10, 24, 12, 0), { wash: '#2A2420', ink: null });
    paint([[x - 24, base - h - 46], [x + 24, base - h - 46], [x + 16, base - h], [x - 16, base - h]], { wash: lit > .5 ? '#FFE3A6' : '#B8A27A', ink: INK, sw: 1 });
    paint([[x - 28, base - h - 46], [x, base - h - 66], [x + 28, base - h - 46]], { wash: '#2A2420', ink: INK, sw: .8 });
    if (lit > 0) glow(x, base - h - 24, (o.r || 150), '#FFE3A6', .8 * lit);
  }
  function hoarding(x, y, txt_, k, o = {}) {
    if (k <= 0) return; boilSeed('hoard');
    const bw = o.big ? 250 : 210, bb = o.big ? 170 : 120, gy = o.ground || 905, pk = easeOut(clamp(k * 1.6));
    // two straight timber posts under the board's ends, braced, standing on the pavement (they rise first, then the board unfolds)
    for (const sd of [-1, 1]) {
      const px = x + sd * (bw - 40), top = lerp(gy, y - 60, pk);
      paint(rectPts(px - 13, top, 26, gy - top, 0), { grad: [[0, '#6A5442'], [1, '#3E3026']], gdir: [px - 13, 0, px + 13, 0], ink: INK, sw: 1.2, tex: .4 });
      for (let g = 0; g < 3; g++) inkLine([[px - 5 + g * 5, top + 20], [px - 5 + g * 5, gy - 14]], .5, '#2A2018', 'inkfine', 0);
      paint(rectPts(px - 20, gy - 12, 40, 14, 0), { wash: '#3E3026', ink: INK, sw: .9 });
    }
    if (pk > .6) { const by = lerp(gy, y + bb + 60, pk); paint([[x - bw + 40, by + 8], [x - bw + 52, by - 6], [x + bw - 40, by + 120 - 6], [x + bw - 52, by + 120 + 8]].map(([px, py]) => [px, Math.min(gy - 20, py)]), { wash: '#4E3E32', ink: INK, sw: .9 }); }
    push(); translate(x, y + 120); scale(1, backOut(k) * (o.flip ?? 1)); translate(-x, -(y + 120));
    paint(rectPts(x - bw, y - 120, bw * 2, 120 + bb, 0), { wash: o.col || '#E9DCC0', ink: INK, sw: 1.8 });
    paint(rectPts(x - bw + 20, y - 100, bw * 2 - 40, 80 + bb, 0), { wash: null, ink: INK, sw: .7 });
    pop();
    if (k > .6 && (o.flip ?? 1) > .3) {
      letter(txt_, x, y - 4, 130, o.tcol || '#8C2A1E', { face: 'serif', bold: true, shadow: false });
      if (o.sub) { const sz0 = o.big ? 72 : 36; ctx.save(); ctx.font = `${o.big ? 'bold ' : ''}${sz0}px serif`; const sw0 = ctx.measureText(o.sub).width; ctx.restore(); const sz = sz0 * Math.min(1, (bw * 2 - 60) / Math.max(1, sw0)); letter(o.sub, x, o.big ? y + 100 : y + 76, sz, INK, { face: 'serif', bold: !!o.big, shadow: false }); }
    }
  }
  function street(t, o = {}) {
    layer('c5street' + (o.v || ''), () => {
      paint(rectPts(-300, -300, W + 600, 1300), { grad: [[0, '#9A9590'], [1, '#D9D3C9']], gdir: [0, 0, 0, 900], ink: null, tex: .3 });
      // far chimneys and a church spire in the fog
      for (let i = 0; i < 12; i++) { const x = -200 + i * 200, h = 260 + 140 * hash(i * 5.7); paint(rectPts(x, 900 - h, 180, h, 1), { wash: '#B7B0A6', ink: null, tex: .2 }); paint(rectPts(x + 30, 900 - h - 40, 22, 44, 0), { wash: '#ABA49A', ink: null }); }
      paint([[1460, 300], [1490, 120], [1520, 300]], { wash: '#ABA49A', ink: null }); paint(rectPts(1440, 300, 100, 500, 0), { wash: '#ABA49A', ink: null });
      paint(rectPts(-300, 900, W + 600, 400, 1), { grad: [[0, '#6A6058'], [1, '#4A4038']], gdir: [0, 900, 0, 1200], ink: INK, sw: 1.2 });
      for (let r = 0; r < 6; r++) for (let c = 0; c < 26; c++) paint(ellPts(-280 + c * 96 + (r % 2) * 48, 930 + r * 34, 40, 13, 10), { wash: r % 2 ? '#5A5048' : '#625850', ink: INK, sw: .4 });
    }, { x: -300, y: -300, w: W + 600, h: H + 600, variants: 2 });
  }
  function fogBands(t, a, front = -1e4) {
    for (let i = 0; i < 4; i++) { const fy = 560 + i * 120 + 18 * Math.sin(t * .3 + i), k = a; if (k <= 0) continue; ctx.save(); ctx.globalAlpha = k; fog(fy, 150, '#BDB6AC', .32); ctx.restore(); }
    // drifting wisps
    for (let i = 0; i < 5; i++) { const x = frac(hash(i * 3) + t * .012 * (1 + hash(i))) * (W + 1200) - 600, y = 420 + hash(i * 7) * 420; ctx.save(); ctx.globalAlpha = .28 * a; const g = ctx.createRadialGradient(x, y, 10, x, y, 420); g.addColorStop(0, 'rgba(205,198,188,1)'); g.addColorStop(1, 'rgba(205,198,188,0)'); ctx.fillStyle = g; ctx.fillRect(x - 420, y - 420, 840, 840); ctx.restore(); }
  }

  // 1 · the microscope: the lens pulls back from the magnifier; through it, a smear; the knob: 2009 → 2017 → 2026
  function micro(t, lt, dur) {
    const a = cs('fd_microscope'), f = cs('fd_fv'), tu = wt('fd_microscope', 'tuned'), tn = wt('fd_fv', 'noisy'), tT = wt('fd_fv', 'transformation'), tc = wt('fd_fv', 'crisp'), tw = wt('fd_fv', 'tweaks'), td = wt('fd_fv', 'deeper');
    street(t);
    camKeys(t, [[chapStart('ch05'), 960, 500, 1.68], [a + .2, 960, 500, 1.6], [a + 4, 960, 560, 1.0], [tu - .5, 960, 560, 1.0], [tn, 960, 520, 1.28], [tc + 1, 960, 520, 1.32], [td + .5, 960, 510, 1.36]], .3);
    for (let i = 0; i < 4; i++) house(150 + i * 560 - (i > 1 ? 0 : 0), 900, 300, 460 + 60 * hash(i), [MIX[i], MIX[i + 4], MIX[i + 8], MIX[(i + 2) % 12]], { key: 'c5mh' + i, blur: 5, lit: .7, col: ['#6A5A4E', '#5A4E46', '#6E6052', '#5E5048'][i] });
    for (const x of [380, 1560]) gasLamp(x, 920, 1, .8 + .2 * Math.sin(t * 7 + x));
    fogBands(t, .8);
    const roll = seg(t, a + 3.4, a + 5.8);
    const st = t < tT + .2 ? 0 : t < tw + .2 ? 1 : 2;
    const tNg = wt('fd_fv', 'nudged'), tLi = wt('fd_fv', 'little'), jg = env(t, tNg - .3, tLi + .4, .2, Math.max(.3, tc - tLi - .4)), jr = jg * .14 * Math.sin((t - tNg) * 6), jx = jg * 14 * Math.sin((t - tNg) * 4.3), jy = jg * 8 * Math.cos((t - tNg) * 3.7);
    // Clawd walks in, hops up onto the cart and works the focus knob on the column; at the second click his top hat jumps off
    const em = emotions(t, [[chapStart('ch05'), 'happy'], [a + 5.8, 'neutral'], [tu - .6, 'determined'], [tn, 'confused'], [tT, 'determined'], [tc - .2, 'excited'], [tw + .5, 'surprised'], [tw + 1.6, 'proud']]);
    const up = seg(t, a + 6, a + 6.7), cx = up > 0 ? lerp(1290, 1121, ease(up)) : lerp(1700, 1290, ease(seg(t, a + 3, a + 5.8))), cy = up > 0 ? lerp(960, 810, ease(up)) - 90 * Math.sin(up * Math.PI) : 960;
    const walking = roll > 0 && roll < 1, po = { ...em, view: walking ? 'side' : 'q', flip: true, walk: walking ? t * 2 : undefined, boilKey: 'c5c' };
    // his near hand grips the knob's rim: each turn is two strokes (push the hand down, the knob turns with it; lift it back
    // up, the knob stays), and the knob's angle is read off the hand's own position, so the grip never slips
    const KX = 960 + 50, KY = 880 - 130, aTop = .55, aBot = -.3;
    let knob = 0;
    if (up >= 1) {
      Object.assign(po, { rot: 0, dx: 0 });
      const ang = aa => { const [hx, hy] = armTip(cx, cy, 11, { ...po, aR: aa }); return Math.atan2(hy - KY, hx - KX); }, dl = ang(aBot) - ang(aTop);
      let aR = aTop, done = 0, push_ = false;
      for (const [w0, w1] of [[tu - .6, tu + .4], [tT - .2, tT + .6], [tw - .3, tw + .4]]) {
        if (t >= w1) { done += 2; continue; }
        if (t > w0) { const ph = (t - w0) / (w1 - w0) * 2, n = Math.floor(ph), p = ph - n; done += n; if (p < .6) { aR = lerp(aTop, aBot, easeInOut(p / .6)); push_ = true; } else { aR = lerp(aBot, aTop, easeInOut((p - .6) / .4)); done += 1; } }
        break;
      }
      const rel = seg(t, tw + .45, tw + .75); if (rel > 0) aR = lerp(aTop, em.aR ?? .2, ease(rel));
      knob = done * dl + (push_ ? ang(aR) - ang(aTop) : 0);
      po.aR = aR;
    }
    scope(t, 960, 880, 1, {
      roll, knob, view: (cx, cy, r) => {
        if (t < tn - .6) {   // the city through a bad lens: a smear
          fill(MIX[9], cx - 40, cy, r * 1.3, .9, 16); fill(MIX[4], cx + 90, cy + 30, r, .6, 16);
        } else {
          const fk = seg(t, tT + .2, tc), fk2 = seg(t, tw, tw + .6);
          if (jg > 0) { ctx.translate(cx + jx, cy + jy); ctx.rotate(jr); ctx.translate(-cx, -cy); }
          fill(MT + '2009-mixed4d-161', cx, cy, r, 1, 0);
          if (fk > 0) fill(MT + '2017-mixed4d-161', cx, cy, r, fk, 10 * (1 - fk));
          if (fk2 > 0) fill(MT + '2026-mixed4d-161', cx, cy, r, fk2, 6 * (1 - fk2));
        }
      }
    });
    // nudge and turn arrows around the lens
    if (jg > .05) { ctx.save(); ctx.globalAlpha = clamp(jg * 1.5); ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 11; ctx.lineCap = 'round'; const R0 = 240, ar = (x, y, q) => { ctx.beginPath(); ctx.moveTo(x + Math.cos(q) * 18, y + Math.sin(q) * 18); ctx.lineTo(x + Math.cos(q + 2.4) * 18, y + Math.sin(q + 2.4) * 18); ctx.lineTo(x + Math.cos(q - 2.4) * 18, y + Math.sin(q - 2.4) * 18); ctx.closePath(); ctx.fill(); };
      for (const sd of [-1, 1]) { const q0 = sd > 0 ? -1.15 : 1.99, q1 = q0 + .55 * Math.sign(Math.sin((t - tNg) * 6) || 1); ctx.beginPath(); ctx.arc(960, 500, R0, Math.min(q0, q1), Math.max(q0, q1)); ctx.stroke(); const qe = q1, ex = 960 + Math.cos(qe) * R0, ey = 500 + Math.sin(qe) * R0; ar(ex, ey, qe + Math.PI / 2 * Math.sign(q1 - q0)); }
      for (const sd of [-1, 1]) { const x0 = 960 + sd * (R0 + 20), x1 = x0 + sd * 50 * Math.sign(Math.sin((t - tNg) * 4.3) || 1) * sd; ctx.beginPath(); ctx.moveTo(x0, 500); ctx.lineTo(x1, 500); ctx.stroke(); ar(x1, 500, x1 > x0 ? 0 : Math.PI); }
      ctx.restore(); }
    // click bursts as the focus snaps
    for (const tt of [tc - .2, tw + .5]) { const k = seg(t, tt, tt + .5); if (k > 0 && k < 1) glow(960, 500, 460 * k, '#FFF3C8', .8 * (1 - k)); }
    // the hat: one clean parabola off his head and back onto it, with a flip, at the second click
    const hu = seg(t, tw + .5, tw + 1.2), flying = hu > 0 && hu < 1;
    tourist(cx, cy, 11, flying ? null : 'top', po);
    let hh = null;
    if (flying) {
      const V = VIEWS[po.view], [hx, hy] = bodyPt(cx, cy, 11, po, V.hat, -8.05), yy = hy - 160 * 4 * hu * (1 - hu);
      push(); translate(hx, yy - 30); rotate(-TAU * easeInOut(hu)); translate(-hx, -(yy - 30)); hatOn('top', hx, yy, 99); pop();
      hh = hatHole(hx, yy, 99);
    }
    camEnd();
    { const z = LAST_CAM.zoom; engrave(-1e4, 160, [...(hh ? [hh] : []), clawdHole(cx, cy, 11), [(960 - LAST_CAM.cx) * z + 960, (500 - LAST_CAM.cy) * z + 540, 186 * z]]); }
    // engraved plate under the lens: which stage of the story the lens is at, and the ingredient's name
    if (t > tn - .6) { const yr = ['first', 'then', 'later'][st]; letter(yr, 420, 560, 96, INK, { face: 'serif', bold: true, shadow: false, stroke: PAPER, strokeW: .12, pop: st ? seg(t, [0, tc - .2, tw + .5][st], [0, tc - .2, tw + .5][st] + .3) : null }); }
    const ks = seg(t, tn - .4, tn + .4) * (1 - seg(t, tT - .8, tT - .4));
    cap('noisy, psychedelic smears', ks);
    const kt = seg(t, tT - .2, tT + .8) * (1 - seg(t, tw - .5, tw - .1));
    cap('+ transformation robustness', kt);
    const kd = seg(t, tw - .1, tw + .6);
    cap('+ a few small tweaks', kd);
    const km = seg(t, wt('fd_microscope', 'better') - .3, wt('fd_microscope', 'better') + .6) * (1 - seg(t, tu - .6, tu - .2));
    cap('better than anyone thought', km, { size: 64 });
  }

  // the last district: five houses that sag in the fog (fix 0..1 straightens them; clean swaps their photos)
  const HX = i => 230 + i * 300;
  function district(t, fix, o = {}) {
    for (let i = 0; i < 5; i++) {
      const x = HX(i), h = 470 + 90 * hash(i * 3), fx = Array.isArray(fix) ? fix[i] : fix, tilt = (hash(i * 9) - .5) * .16 * (1 - fx);
      const sh = o.shuffle ? Math.floor(t * 6 + i) : 0, imgs = fx > .5 ? CLEAN[i] : [0, 1, 2, 3].map(k => o.read > .5 && (i + k) % 2 === 0 ? CLEAN[i][k] : MIX[(i * 3 + k + sh) % MIX.length]);
      house(x, 900, 250, h, imgs, { key: 'c5d' + i, tilt, blur: (1 - fx) * 2.5 * (1 - (o.sharp || 0)), lit: lerp(.75, 1, fx), glow: o.glow ? o.glow * fx : 0, col: mixCol(['#4E4038', '#43383A', '#544638', '#463A34', '#4C4036'][i], ['#C8705A', '#5C8AB8', '#E0B04A', '#6AA27A', '#B86A9A'][i], fx * (o.colour ?? 0)) });
      if (fx < .5) crookedSign(x + 90, 900 - h * .55, .35 + .2 * hash(i), null, t);
    }
  }

  // 2 · the worst place: InceptionV1's last district; the 5% hoarding; the fog curls into the Knot
  function foggy(t, lt, dur) {
    const a = cs('fd_last'), te = wt('fd_last', 'essentially'), t5 = wt('fd_last', 'five'), st = cs('fd_story'), tk = wt('fd_story', 'knot'), tm = wt('fd_story', 'many'), tcr = wt('fd_story', 'crammed'), e = ce('fd_story');
    street(t);
    camKeys(t, [[a - .3, 700, 560, 1.2], [a + 3, 900, 560, 1.0], [t5 - .5, 1100, 520, 1.0], [st, 960, 520, .96], [e + .4, 960, 500, .94]], .4);
    district(t, 0, { shuffle: t > tcr - .3 && t < e });
    // the district sign, hanging crooked
    crookedSign(560, 300, -.12, null, t);
    // the handbill on the wall: "no interpretable neurons"
    const kb = popk(t, te - .4, .4);
    if (kb > 0) { boilSeed('c5bill'); push(); translate(1040, 420); rotate(.06); scale(backOut(kb)); paint(rectPts(-150, -110, 300, 220, 1), { wash: '#F2E8D2', ink: INK, sw: 1.2 }); pop(); }
    gasLamp(1580, 920, 1, .7 + .3 * hash(Math.floor(t * 9)));
    hoarding(1660, 360, '5%', popk(t, t5 - .4, .5), { sub: "Nick's guess" });
    // the fog curls into the Knot over the district
    const kk = seg(t, tk - 1.2, tk + .4);
    fogBands(t, 1 - .4 * kk);
    if (kk > 0) {
      ctx.save(); ctx.globalAlpha = .9 * kk;
      const kx = 600 + 40 * Math.sin(t * .7), ky = 470 + 20 * Math.sin(t * 1.1);
      for (let i = 0; i < 5; i++) paint(ellPts(kx + (hash(i) - .5) * 500 * (1 - kk), ky + (hash(i * 3) - .5) * 200, 200, 60, 20), { fill: '#E2DCD2', fillOp: 150 * (1 - kk), bleed: .3, ink: null });
      knotBeast(kx, ky, 220 * kk, { hat: 'top', col: '#B9A6C9', dark: '#5A4A6A', grin: t > tm, look: [Math.sin(t), .2] });
      // too many ideas: things orbit and get crammed into windows
      if (t > tm - .3) for (let i = 0; i < 8; i++) { const q = t * 1.8 + i / 8 * TAU, rr = 290 + 20 * Math.sin(t * 3 + i), px = kx + Math.cos(q) * rr, py = ky + Math.sin(q) * rr * .45; fill(MIX[i], px, py, 34, 1); inkStroke(ellPts(px, py, 34, 34, 18), true, 1, INK, 'inkfine'); }
      ctx.restore();
    }
    const em = emotions(t, [[a - .3, 'nervous'], [t5, 'sad'], [tk, 'scared'], [tcr, 'dizzy']]);
    tourist(1420, 980, 10, 'top', { ...em, view: 'q', flip: true, boilKey: 'c5c' });
    camEnd();
    engrave(-1e4, 160, [clawdHole(1420, 980, 10)]);
    if (kb > 0) { const [sx, sy] = [(1040 - LAST_CAM.cx) * LAST_CAM.zoom + 960, (420 - LAST_CAM.cy) * LAST_CAM.zoom + 540], z = LAST_CAM.zoom; letter('NOTICE', sx, sy - 60 * z, 34 * z, INK, { face: 'serif', bold: true, shadow: false, rot: .06 }); letter('essentially no\ninterpretable\nneurons', sx, sy + 20 * z, 30 * z, INK, { face: 'serif', shadow: false, rot: .06, alpha: kb }); }
    const kl = seg(t, a + .2, a + 1.2) * (1 - seg(t, te - .8, te - .4));
    cap('InceptionV1 · the last district', kl, { size: 64 });
    const ki = seg(t, tm - .3, tm + .6) * (1 - seg(t, tcr + .8, tcr + 1.2));
    cap('too many ideas, too few neurons?', ki);
  }

  // 3 · the renovation: ConvNeXt plans; the viaduct bypass (residual connections); even gas lamps (layer norm);
  //     the fog lifts in a wave and the engraving dissolves into colour; 5% → 50% → 70% → 99%
  function renovate(t, lt, dur) {
    const a = cs('fd_renovate'), tC = wt('fd_renovate', 'Conv'), tsame = wt('fd_renovate', 'same'), tpar = wt('fd_renovate', 'parameters'), tpic = wt('fd_renovate', 'pictures'), tr = wt('fd_renovate', 'residual'), tl = wt('fd_renovate', 'layer'), tbe = wt('fd_renovate', 'beautiful');
    const n = cs('fd_numbers'), tB = wt('fd_numbers', 'Better'), t50 = wt('fd_numbers', 'fifty'), t70 = wt('fd_numbers', 'seventy'), t99 = wt('fd_numbers', 'Ninety-nine'), tez = wt('fd_numbers', 'easy'), e = ce('fd_numbers');
    const wk = waveK(t), dawn = wk, tW = wt('fd_renovate', 'last', 0) - .1;
    // the numbers: the old network comes back (engraved), and the clean front reaches 50%, then 70% of its district; the new design is all clean
    const old = seg(t, tB - .2, tB + .6) * (1 - seg(t, t99 - .3, t99 + .9));
    // better tools (50%) only clear the view: the old houses stay engraved and crooked, their windows go sharp. Retraining
    // (70%) straightens four of them; only the new design (99%) is the whole bright street
    const tRe = wt('fd_numbers', 'Retraining'), sharp = seg(t, t50 - .6, t50 + .2) * old;
    const front = t < tB - .2 ? waveFront(t) : kf(t, [[tB - .2, 2700], [tB + .8, -700], [t70 - .7, -700], [t70 + .2, 1130], [t99 - .3, 1130], [t99 + 1.2, 2700]]);
    // sky: grey London → clean modern blue
    vgrad([[0, mixCol('#9A9590', '#5FA8E0', dawn)], [1, mixCol('#D9D3C9', '#F4E6CC', dawn)]]);
    camKeys(t, [[a - .3, 960, 520, .96], [tC, 1000, 480, 1.04], [tr - .6, 960, 520, .92], [tbe, 960, 520, .92], [e + .4, 960, 520, .96]], .4);
    if (dawn < 1) { ctx.save(); ctx.globalAlpha = 1 - dawn; street(t); ctx.restore(); }
    if (dawn > 0) { ctx.save(); ctx.globalAlpha = dawn; layer('c5modern', () => { for (let i = 0; i < 12; i++) { const x = -200 + i * 200, h = 260 + 140 * hash(i * 5.7); paint(rectPts(x, 900 - h, 180, h, 1), { wash: ['#BFD3E6', '#D6C8E0', '#C8E0D2'][i % 3], ink: null, tex: .2 }); } paint(rectPts(-300, 900, W + 600, 400, 1), { grad: [[0, '#8C9AA6'], [1, '#6A7884']], gdir: [0, 900, 0, 1200], ink: INK, sw: 1 }); for (let i = 0; i < 26; i++) paint(rectPts(-300 + i * 100, 960, 60, 10, 0), { wash: '#F4F0E6', ink: null }); }, { x: -300, y: -300, w: W + 600, h: H + 600, variants: 1 }); glow(1500, 300, 600, '#FFE3A6', .6); ctx.restore(); }
    // the viaduct: arches rise behind the houses; a train runs along it, bypassing the street
    const hk = easeOut(seg(t, tr - .9, tr + .9)) * (1 - old);
    if (hk > 0) {
      const top = 380 + 520 * (1 - hk); boilSeed('c5via');
      paint(rectPts(-300, top, W + 600, 40, 1), { wash: mixCol('#8A6A56', '#E8E2D6', dawn), ink: INK, sw: 1.3 });
      for (let i = 0; i < 12; i++) { const x = -200 + i * 200; paint([[x, top + 40], [x + 40, top + 40], [x + 40, 900], [x, 900]], { wash: mixCol('#7A5A48', '#D8D0C2', dawn), ink: INK, sw: 1 }); inkStroke(ellPts(x + 120, top + 160, 80, 110, 20).filter(p => p[1] <= top + 160), false, 1, INK, 'inkfine'); }
      if (hk >= 1) { const tx = frac((t - tr) * .12) * (W + 1400) - 700; boilSeed('c5train'); for (let c = 0; c < 4; c++) paint(rrPts(tx - c * 190, top - 80, 180, 80, 14), { wash: c ? mixCol('#3A5A7A', '#4A90C8', dawn) : mixCol('#8C2A1E', '#E05A3A', dawn), ink: INK, sw: 1.1 }); glow(tx + 180, top - 40, 120, '#FFE3A6', .6); }
    }
    // the houses: straighten as the wave passes; clean photos; colour after the wave
    const fixes = [0, 1, 2, 3, 4].map(i => t < tB - .2 ? clamp((front - (HX(i) - 480 - 300)) / 500) : clamp((front - ((HX(i) - 960) * .93 + 960)) / 240 + .5));
    district(t, fixes, { colour: 1 - old, glow: seg(t, tez - .4, tez + .3), sharp, read: sharp });
    // gas lamps: all the same height and brightness (layer norm)
    for (let i = 0; i < 7; i++) gasLamp(80 + i * 300, 930, popk(t, tl - .5 + i * .1, .4) * (1 - old), 1, { r: 130 });
    // the Knot loosens and slinks away as the fog lifts
    const kgo = seg(t, tW - .6, tbe - .2);
    if (kgo > 0 && kgo < 1) { const kx = lerp(900, 2300, easeIn(kgo)), ky = 330 + 100 * kgo; knotBeast(kx, ky, 220 * (1 - .5 * kgo), { hat: 'top', col: '#B9A6C9', dark: '#5A4A6A', loose: kgo * .8, look: [1, 0] }); }
    fogBands(t, (1 - wk) * .9 * (1 - .6 * hk) + .9 * old * (1 - seg(t, t50 - .6, t50 + .2)));
    // the hoarding: 5% → 50% → 70% → 99%
    const nums = [[a - 1, '5%', 'InceptionV1'], [tB - .2, '5%', 'old network'], [t50 - .15, '50%', 'better tools'], [t70 - .15, '70%', 'retrained'], [t99 - .15, '99%', 'new design']];
    let cur = nums[0], ft = -10; for (const q of nums) if (t >= q[0]) { cur = q; ft = q[0]; }
    const fl = seg(t, ft, ft + .3);
    const kp = seg(t, tC - .6, tC + .4) * (1 - seg(t, tr - 1.3, tr - .8));
    hoarding(1600, 250, cur[1], t < tW ? 1 - ease(clamp(kp * 1.5)) : t < tB - .2 ? 1 - seg(t, tW, tW + .4) : popk(t, tB - .2, .5), { big: 1, flip: Math.abs(Math.cos(fl * Math.PI)) * (fl < .5 ? 1 : 1), sub: cur[2], tcol: cur[1] === '99%' ? '#2E7A3A' : '#8C2A1E', col: mixCol('#E9DCC0', '#FFFFFF', dawn) });
    // the architect's plan: CONVNEXT blueprint unrolled on an easel
    if (kp > 0) { boilSeed('c5plan'); push(); translate(560, 640); scale(1, ease(kp)); paint(rectPts(-300, -200, 600, 400, 1), { wash: '#2E5A8A', ink: INK, sw: 1.4 }); for (let i = 0; i < 6; i++) inkLine([[-260, -150 + i * 60], [260, -150 + i * 60]], .6, '#BFD8F0', 'inkfine', 0); pop(); }
    const lk = env(t, t50 - .7, t70 - .7, .4, .4) * old, lx = lerp(330, 1250, ease(seg(t, t50 - .5, t70 - .9))), ly = 560, lr = 300;
    if (lk > 0) { push(); translate(lx, ly); scale(backOut(clamp(lk * 1.2))); boilSeed('c5blens'); paint(rrPts(lr * .72, lr * .62, 70, 260, 26).map(([px, py]) => [px * .8 + py * .45, -px * .3 + py * .8]), { wash: '#5A3A22', ink: INK, sw: 1.2 }); inkStroke(ellPts(0, 0, lr, lr, 48), true, 26, '#C9A15A', 'ink'); inkStroke(ellPts(0, 0, lr + 14, lr + 14, 48), true, 2, INK, 'inkfine'); inkStroke(ellPts(0, 0, lr - 14, lr - 14, 48), true, 2, INK, 'inkfine'); pop(); }
    const em = emotions(t, [[a - .3, 'sad'], [tC, 'hopeful'], [tr, 'excited'], [tbe, 'starstruck'], [t99, 'happy']]);
    tourist(1380, 980, 10, t > tC + .5 && t < tbe + .8 ? 'hard' : 'top', { ...em, view: 'q', flip: true, boilKey: 'c5c' });
    camEnd();
    { const z = LAST_CAM.zoom, H0 = [clawdHole(1380, 980, 10)]; if (lk > .2) H0.unshift([(lx - LAST_CAM.cx) * z + 960, (ly - LAST_CAM.cy) * z + 540, (lr - 16) * z * clamp(lk * 1.2), 0]); engrave(front, 160, H0); }
    if (kp > .5) { const z = LAST_CAM.zoom, sx = (560 - LAST_CAM.cx) * z + 960, sy = (640 - LAST_CAM.cy) * z + 540; letter('ConvNeXt', sx, sy - 70 * z, 76 * z, '#F2F6FA', { face: 'serif', bold: true, shadow: false }); const ks = seg(t, tsame - .2, tsame + .4); if (ks > 0) letter('same size', sx, sy + 30 * z, 46 * z, '#F2F6FA', { face: 'serif', shadow: false, alpha: ks }); const kq = seg(t, tpic - .5, tpic); if (kq > 0) letter('same pictures', sx, sy + 100 * z, 46 * z, '#F2F6FA', { face: 'serif', shadow: false, alpha: kq }); }
    const krc = seg(t, tr - .2, tr + .6) * (1 - seg(t, tl - .4, tl - .1));
    cap('residual connections', krc);
    const kln = seg(t, tl - .1, tl + .6) * (1 - seg(t, tbe - .8, tbe - .5));
    cap('layer normalization', kln);
    const kbe = seg(t, tbe - .4, tbe + .4) * (1 - seg(t, n - .2, n + .1));
    if (kbe > 0) letter('beautiful', 960, 150, 90, '#2A5A8A', { face: 'marker', reveal: kbe, shadow: false });
    const kn = seg(t, n - .1, n + .6) * (1 - seg(t, tB - .4, tB));
    if (kn > 0) letter('same size · same data', 860, 150, 64, '#2A3A4A', { face: 'marker', reveal: kn, shadow: false });
  }

  // 4 · the rooftop at dawn; Clawd polishes the lens; then a seed sprouts in the renovated park
  function lesson(t, lt, dur) {
    const a = cs('fd_lesson'), tb = wt('fd_lesson', 'badly'), tlen = wt('fd_lesson', 'lens'), tu = wt('fd_lesson', 'Upgrades'), tre = wt('fd_lesson', 'readable'), tP = ce('fd_lesson') - .4;
    vgrad([[0, '#5FA6E6'], [.6, '#F4DCC0'], [1, '#F6C08A']]);
    const sun = 1 - .25 * seg(t, a, tP);
    glow(1480, 560 - 80 * seg(t, a, tP + 3), 720, '#FFE0A0', .65 * sun); dot(1480, 560 - 80 * seg(t, a, tP + 3), 70, '#FFF2C8', .9);
    camKeys(t, [[a - .3, 960, 560, 1.0], [tu, 980, 540, 1.04], [tP, 960, 620, 1.02], [tP + 2.4, 960, 930, 1.9], [chapStart('ch06') + 2.2, 960, 940, 2.6]], .3);
    // the renovated district below, seen from the rooftop: far skyline, the viaduct with its train, the clean houses
    push(); translate(960, 790); scale(.72); translate(-960, -900);
    layer('c5mod2', () => { for (let i = 0; i < 12; i++) { const x = -200 + i * 200, h = 260 + 140 * hash(i * 5.7); paint(rectPts(x, 900 - h, 180, h, 1), { wash: ['#BFD3E6', '#D6C8E0', '#C8E0D2'][i % 3], ink: null, tex: .2 }); } }, { x: -300, y: -300, w: W + 600, h: H + 600, variants: 1 });
    boilSeed('c5via2'); paint(rectPts(-600, 380, W + 1200, 40, 1), { wash: '#E8E2D6', ink: INK, sw: 1.3 }); for (let i = 0; i < 16; i++) paint(rectPts(-560 + i * 200, 420, 40, 480, 0), { wash: '#D8D0C2', ink: INK, sw: 1 });
    { const tx = frac(t * .1) * (W + 2400) - 1200; for (let c = 0; c < 4; c++) paint(rrPts(tx - c * 190, 300, 180, 80, 14), { wash: c ? '#4A90C8' : '#E05A3A', ink: INK, sw: 1.1 }); }
    district(t, 1, { colour: 1, glow: .6 + .3 * Math.sin(t * 2) });
    for (let i = 0; i < 7; i++) gasLamp(80 + i * 300, 930, 1, 1, { r: 110 });
    paint(rectPts(-600, 930, W + 1200, 300, 1), { wash: '#C9D3DC', ink: INK, sw: 1 });
    pop();
    // the rooftop in the foreground: slate roof, chimney pots, and a little roof garden
    boilSeed('c5roof');
    paint([[-300, 950], [W + 300, 930], [W + 300, H + 300], [-300, H + 300]], { grad: [[0, '#4A5260'], [1, '#2E343E']], gdir: [0, 930, 0, 1100], ink: INK, sw: 1.4 });
    for (let r = 0; r < 6; r++) for (let c = 0; c < 22; c++) inkLine([[-260 + c * 110 + (r % 2) * 55, 975 + r * 30], [-200 + c * 110 + (r % 2) * 55, 975 + r * 30]], .7, '#232830', 'inkfine', 0);
    paint(rectPts(180, 740, 150, 220, 1), { wash: '#B86A4E', ink: INK, sw: 1.3 }); for (const px of [205, 260]) paint(rectPts(px, 700, 40, 44, 1), { wash: '#C98A5A', ink: INK, sw: 1 });
    for (let i = 0; i < 3; i++) { const f = frac(t * .25 + i / 3); paint(ellPts(225 + 30 * f + 10 * Math.sin(t + i), 680 - 160 * f, 18 + 30 * f, 14 + 24 * f, 14), { wash: '#F2F2F2', washOp: 160 * (1 - f), ink: null }); }
    // the planter (the renovated park, in miniature) where the seed lands
    paint(rectPts(780, 950, 360, 90, 1), { wash: '#9A6E48', ink: INK, sw: 1.3 }); paint(rectPts(790, 942, 340, 18, 1), { wash: '#6A4A30', ink: INK, sw: .9 });
    for (let i = 0; i < 9; i++) { const gx = 800 + i * 38 + 10 * hash(i), gy = 946; if (Math.abs(gx - 960) < 40) continue; inkLine([[gx, gy], [gx - 5, gy - 22 - 10 * hash(i * 3)]], 1.4, '#3E7A34', 'ink', 0); inkLine([[gx + 6, gy], [gx + 10, gy - 16]], 1.2, '#3E7A34', 'ink', 0); }
    // Clawd polishes the lens (the microscope's brass lens, now clear glass)
    const pol = Math.sin(t * 9);
    tourist(560, 945, 12, 'top', { ...emotions(t, [[a - .3, 'happy'], [tb, 'thinking'], [tu, 'proud'], [tre, 'love']]), view: 'q', aR: 1 + .3 * pol, armR: (u, sw) => { paint(ellPts(u * 1.8, 0, u * 2.2, u * 2.2, 22), { wash: '#C9A15A', ink: INK, sw }); paint(ellPts(u * 1.8, 0, u * 1.7, u * 1.7, 20), { wash: '#DCF0FA', ink: INK, sw: sw * .7 }); }, boilKey: 'c5c' });
    if (t < tre + 1) for (let i = 0; i < 3; i++) { const f = frac(t * 1.5 + i / 3); glow(640 + 40 * Math.cos(i * 2), 835 - 30 * f, 16 * (1 - f), '#FFFFFF', 1 - f); }
    // the seed: drops from the sky into the planter and sprouts
    const ts = tP - .2, fall = seg(t, ts, ts + 1), sprout = seg(t, ts + 1, ts + 2.6), SY = 948;
    if (fall > 0 && fall < 1) { const sy = lerp(200, SY, easeIn(fall)); paint(ellPts(960 + 30 * Math.sin(fall * 6), sy, 9, 13, 12), { wash: '#8C5A2A', ink: INK, sw: .8 }); }
    if (sprout > 0) {
      const h = 90 * easeOut(sprout); boilSeed('c5sp');
      inkLine([[960, SY], [962, SY - h * .6], [958, SY - h]], 4, '#3E7A34', 'ink', .5);
      for (const sd of [-1, 1]) { const k = seg(sprout, .4, 1); if (k <= 0) continue; push(); translate(959, SY - h * .9); rotate(sd * .7); scale(backOut(k)); paint([[0, 0], [sd * 20, -16], [sd * 44, -6], [sd * 22, 8]], { wash: '#7CC05A', ink: INK, sw: .9, curv: .5 }); pop(); }
      glow(960, SY - 30, 120 * sprout, '#FFF0B0', .5 * sprout);
    }
    camEnd();
    const k1 = seg(t, tb - .5, tlen + .3) * (1 - seg(t, tu - .6, tu - .2));
    // a memory of the old street behind the caption: sepia, sagging, seen through a smeared lens
    const gk = env(t, tb - .7, tu - .3, .35, .35);
    if (gk > 0) { ctx.save(); ctx.globalAlpha = .92 * gk; const bx = 960, by = 300, bw = 820, bh = 290; ctx.beginPath(); ctx.rect(bx - bw / 2, by - bh / 2, bw, bh); ctx.clip(); ctx.fillStyle = '#D9CFBE'; ctx.fillRect(bx - bw / 2, by - bh / 2, bw, bh);
      push(); translate(bx, by + bh / 2 - 20); scale(.44); translate(-830, -900); district(t, 0, {}); paint(rectPts(-300, 900, W + 600, 200, 1), { wash: '#6A6058', ink: INK, sw: 1 }); pop();
      ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#8A6A48'; ctx.fillRect(bx - bw / 2, by - bh / 2, bw, bh); ctx.globalCompositeOperation = 'source-over';
      fog(by + 60, 120, '#CFC6B8', .45);
      const lx = bx + 210 * Math.min(1, seg(t, tlen - .9, tlen - .2) * 1.0) - 60, ly = by - 6, lr = 110, sm = seg(t, tlen - .9, tlen - .2);
      if (sm > 0) { ctx.save(); ctx.globalAlpha *= sm; const g = ctx.createRadialGradient(lx, ly, 10, lx, ly, lr); g.addColorStop(0, 'rgba(120,100,80,.55)'); g.addColorStop(1, 'rgba(90,70,50,.8)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(lx, ly, lr, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(240,230,210,.55)'; ctx.lineWidth = 14; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(lx - 70 + i * 30, ly - 60 + i * 12); ctx.quadraticCurveTo(lx + i * 10, ly - 10, lx - 20 + i * 34, ly + 70 - i * 8); ctx.stroke(); } ctx.strokeStyle = '#A87A3A'; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(lx, ly, lr, 0, TAU); ctx.stroke(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
      ctx.restore(); ctx.save(); ctx.globalAlpha = gk; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(bx - bw / 2, by - bh / 2, bw, bh); ctx.restore(); }
    if (k1 > 0) letter('built badly · seen through a dirty lens', 960, 110, 72, '#2A3A4A', { face: 'marker', reveal: k1, shadow: false });
    const k2 = seg(t, tu - .1, tu + .8) * (1 - seg(t, tP + .3, tP + .7));
    if (k2 > 0) letter('ordinary upgrades made it readable', 960, 150, 60, '#2A3A4A', { face: 'marker', reveal: k2, shadow: false });
    const k0 = seg(t, a - .1, a + .8) * (1 - seg(t, tb - 1, tb - .6));
    if (k0 > 0) letter('not strangers packed together', 960, 150, 60, '#2A3A4A', { face: 'marker', reveal: k0, shadow: false });
  }

  shots([[chapStart('ch05'), micro], [cs('fd_last') - .3, foggy], [cs('fd_renovate') - .3, renovate], [cs('fd_lesson') - .3, lesson]]);
})();
