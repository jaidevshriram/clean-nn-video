// world.js: the film's world. A neural network imagined as a city at dusk: layers are districts receding toward the
// horizon, neurons are buildings whose lit windows show what they respond to, circuits are roads, activation is light.

// a full-frame gradient sky (screen space unless inside a camera), with optional stars and soft cloud bands
function sky(t, stops, o = {}) {
  const x0 = o.x ?? -400, y0 = o.y ?? -400, w = o.w ?? W + 800, h = o.h ?? H + 800;
  layer('sky' + stops.map(s => s.join()).join() + (o.stars || 0), () => {
    paint(rectPts(x0, y0, w, h), { grad: stops, gdir: [0, o.top ?? 0, 0, o.bottom ?? H], ink: null, tex: .35 });
    for (let i = 0; i < (o.stars || 0); i++) { const sx = x0 + hash(i * 9.1) * w, sy = y0 + hash(i * 3.3) * (o.starH ?? h * .45); paint(starPts(sx, sy, 1.5 + 2.5 * hash(i), .4, 4), { wash: '#FFF2C8', washOp: 140 + 115 * hash(i * 2), ink: null }); }
    for (let i = 0; i < (o.clouds || 0); i++) { const cx = x0 + hash(i * 7.7) * w, cy = (o.cloudY ?? H * .35) + (hash(i * 2.1) - .5) * 160; paint(ellPts(cx, cy, 300 + 260 * hash(i), 26 + 20 * hash(i * 5), 30), { fill: o.cloudCol || '#F7C9B0', fillOp: 120, bleed: .3, tex: .2, ink: null }); }
  }, { x: x0, y: y0, w, h, variants: 2 });
  // twinkle a few stars live
  if (o.stars) for (let i = 0; i < 14; i++) { const sx = x0 + hash(i * 19.1) * w, sy = y0 + hash(i * 13.3) * (o.starH ?? h * .45), tw = .5 + .5 * Math.sin(t * (1 + hash(i) * 2) + i); glow(sx, sy, 16 + 10 * tw, '#FFF2C8', .5 * tw); }
}

// one row of buildings: a deterministic skyline from x0 to x1 with its base at y. depth 0 = near, 1 = far (paler, bluer,
// smaller, fewer details). lit: fraction of windows lit; glowK: how much the lit windows glow.
function skyline(key, x0, x1, y, o = {}) {
  const d = o.depth ?? .5, hz = o.haze || '#8C7FB0', base = o.col || '#3B3561';
  const col = mixCol(base, hz, d * .75), dk = mixCol(col, '#1C1830', .25), win = o.win || '#FFD58A';
  layer('sky_' + key, () => {
    let x = x0, i = 0;
    while (x < x1) {
      const r = hash(i * 13.7 + key.length), bw = (o.bw || 90) * (.6 + .9 * r) * (1 - d * .4), bh = (o.bh || 260) * (.35 + 1.2 * hash(i * 7.3 + 1)) * (1 - d * .45);
      const roof = hash(i * 3.1) > .8 ? 'peak' : hash(i * 4.4) > .85 ? 'dome' : 'flat';
      boilSeed(key + i);
      const P = rectPts(x, y - bh, bw, bh + 40, 1), bc = mixCol(col, ['#5A3F6B', '#3B4A6B', '#4A3B5E', '#35405E'][i % 4], .35);
      paint(P, { grad: [[0, mixCol(bc, hz, .15)], [1, mixCol(bc, '#15122A', .3)]], gdir: [0, y - bh, 0, y], ink: d < .5 ? PAL.ink : null, sw: .8 * (1 - d), tex: .5 });
      paint(rectPts(x + bw * .82, y - bh, bw * .18, bh + 40, 0), { wash: '#15122A', washOp: 60, ink: null });
      if (hash(i * 5.3) > .6) { const sbw = bw * (.45 + .25 * hash(i * 2.2)), sbh = bh * (.15 + .2 * hash(i * 8.8)); paint(rectPts(x + (bw - sbw) / 2, y - bh - sbh, sbw, sbh + 4, 1), { wash: mixCol(col, '#FFFFFF', .05), ink: d < .5 ? PAL.ink : null, sw: .7 }); if (hash(i * 6.1) > .5) inkLine([[x + bw / 2, y - bh - sbh], [x + bw / 2, y - bh - sbh - 40 * (1 - d)]], 1.4 * (1 - d * .5), dk, 'inkfine', 0); }
      else if (hash(i * 9.9) > .75) { const tx = x + bw * .3; paint(rectPts(tx, y - bh - 26 * (1 - d * .4), bw * .3, 22 * (1 - d * .4), 1), { wash: dk, ink: d < .5 ? PAL.ink : null, sw: .6 }); paint([[tx - 2, y - bh - 26 * (1 - d * .4)], [tx + bw * .15, y - bh - 40 * (1 - d * .4)], [tx + bw * .3 + 2, y - bh - 26 * (1 - d * .4)]], { wash: dk, ink: null }); }
      if (roof === 'peak') paint([[x - 4, y - bh], [x + bw / 2, y - bh - bw * .45], [x + bw + 4, y - bh]], { wash: dk, ink: d < .5 ? PAL.ink : null, sw: .7 });
      if (roof === 'dome') paint(ellPts(x + bw / 2, y - bh, bw * .42, bw * .3, 16).filter(p => p[1] <= y - bh + 1).concat([[x + bw * .92, y - bh], [x + bw * .08, y - bh]]), { wash: dk, ink: d < .5 ? PAL.ink : null, sw: .7 });
      // windows
      const cols = Math.max(1, Math.floor(bw / (26 * (1 - d * .4)))), rows = Math.max(1, Math.floor(bh / (34 * (1 - d * .4))));
      const ww = bw / cols * .45, wh = bh / rows * .45;
      for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
        const lit = hash(i * 31 + c * 7 + rr * 3.3) < (o.lit ?? .35);
        const wx = x + (c + .5) * bw / cols - ww / 2, wy = y - bh + (rr + .5) * bh / rows - wh / 2;
        paint(rectPts(wx, wy, ww, wh), { wash: lit ? mixCol(win, hz, d * .5) : mixCol(dk, '#000000', .1), washOp: lit ? 255 : 200, ink: null, tex: .2 });
      }
      x += bw + (o.gap ?? 6) * (1 + hash(i * 1.7)); i++;
    }
  }, { x: x0 - 60, y: y - (o.bh || 260) * 2, w: x1 - x0 + 120, h: (o.bh || 260) * 2 + 80, variants: 3 });
  // a few windows glow live, flickering slowly
  if (o.glowK) for (let k = 0; k < 10; k++) { const gx = x0 + hash(k * 17.3 + key.length) * (x1 - x0), gy = y - 40 - hash(k * 5.9) * (o.bh || 260) * .8 * (1 - d * .45); glow(gx, gy, 40 * (1 - d * .5), win, o.glowK * (.4 + .3 * Math.sin(T * (.6 + hash(k)) + k))); }
}

// a road of light: a painted ribbon with glowing pulses flowing along it. P = centreline; k = draw-on progress
function lightRoad(P, w, k = 1, o = {}) {
  if (k <= .01) return;
  const C = through(P, 10), n = Math.max(2, Math.round(C.length * ease(k)));
  boilSeed('road' + P[0][0] + P[0][1]);
  paint(ribbon(C.slice(0, n), w, w * (o.taper ?? .8)), { wash: o.col || '#4A4470', ink: o.ink === false ? null : PAL.ink, sw: .6, tex: .4 });
  inkLine(C.slice(0, n), Math.max(.4, w / 22), o.lane || '#FFD58A', 'inkfine', 0);
  if (k >= 1 && (o.flow ?? 1) > 0) {
    const m = o.pulses ?? 4;
    for (let i = 0; i < m; i++) { const f = frac(T * (o.speed ?? .12) + i / m + hashS(String(P[0]))), q = C[Math.floor(f * (C.length - 1))]; glow(q[0], q[1], w * 1.6, o.light || '#FFC766', (o.flow ?? 1) * .9); paint(ellPts(q[0], q[1], w * .22, w * .22, 10), { wash: '#FFF0C8', ink: null }); }
  }
}

// a neuron house: the featured building of a neuron. Its windows show photos of what it responds to (glowing when it
// fires). roof: 'v' | 'o' | 'peak' | 'flat' | 'dome'. o.on 0..1 lights it; o.imgs: window photos; o.k: build-up.
function neuronHouse(x, y, w, h, o = {}) {
  const k = o.k ?? 1; if (k <= .01) return;
  const on = clamp(o.on ?? .6), col = o.col || '#4A3F6B', key = o.key || ('nh' + x);
  boilSeed(key);
  push(); translate(x, y); scale(1, backOut(k)); translate(-x, -y);
  if (on > .05) glow(x, y - h * .55, Math.max(w, h) * .9, o.glowCol || '#FFC766', on * .55);
  paint(rectPts(x - w / 2, y - h, w, h, 1.5), { grad: [[0, mixCol(col, '#FFFFFF', .12)], [1, mixCol(col, '#000000', .18)]], gdir: [0, y - h, 0, y], ink: PAL.ink, sw: 1.4, tex: .7 });
  // roof
  const rc = o.roofCol || mixCol(col, PAL.brick, .55);
  if (o.roof === 'v') paint([[x - w / 2 - 14, y - h - w * .5], [x, y - h + 4], [x + w / 2 + 14, y - h - w * .5], [x + w / 2 + 14, y - h], [x - w / 2 - 14, y - h]], { wash: rc, ink: PAL.ink, sw: 1.3 });
  else if (o.roof === 'o') paint(ellPts(x, y - h, w * .56, w * .5, 30).filter(p => p[1] <= y - h + 2), { wash: rc, ink: PAL.ink, sw: 1.3 });
  else if (o.roof === 'peak') paint([[x - w / 2 - 12, y - h], [x, y - h - w * .55], [x + w / 2 + 12, y - h]], { wash: rc, ink: PAL.ink, sw: 1.3 });
  else if (o.roof === 'dome') paint(ellPts(x, y - h, w * .45, w * .38, 24).filter(p => p[1] <= y - h + 2).concat([[x + w * .45, y - h], [x - w * .45, y - h]]), { wash: rc, ink: PAL.ink, sw: 1.3 });
  else paint(rectPts(x - w / 2 - 8, y - h - 18, w + 16, 20, 1), { wash: rc, ink: PAL.ink, sw: 1.1 });
  // windows: photos in glowing frames
  const imgs = o.imgs || [], cols = o.cols || 2, rows = Math.ceil(Math.max(1, imgs.length) / cols), pad = w * .1;
  const cw = (w - pad * (cols + 1)) / cols, ch = Math.min(cw, (h * .72 - pad * (rows + 1)) / rows);
  imgs.forEach((im, i) => {
    const cx = x - w / 2 + pad + (i % cols) * (cw + pad), cy = y - h + pad * 1.4 + Math.floor(i / cols) * (ch + pad), lit = clamp(on * 1.3 - .1 + .15 * Math.sin(T * 2 + i));
    boilSeed(key + 'w' + i);
    paint(rectPts(cx - 6, cy - 6, cw + 12, ch + 12, .8), { wash: '#2A2340', ink: PAL.ink, sw: .9 });
    const I = img(im), s = Math.min(I.width, I.height);
    ctx.save(); ctx.globalAlpha = .35 + .65 * lit; ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s * ch / cw, cx, cy, cw, ch); ctx.restore();
    ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .25; ctx.fillStyle = o.tintWin || '#F2C98A'; ctx.fillRect(cx, cy, cw, ch); ctx.restore();
    inkLine([[cx + cw / 2, cy], [cx + cw / 2, cy + ch]], .8, '#2A2340', 'inkfine', 0); inkLine([[cx, cy + ch / 2], [cx + cw, cy + ch / 2]], .8, '#2A2340', 'inkfine', 0);   // mullions
  });
  // brick courses, an awning and flower boxes
  for (let r = 0; r < 14; r++) { const by = y - h + 30 + r * (h - 40) / 14; for (let c = 0; c < 6; c++) if (hash(r * 7 + c * 3 + x) > .7) inkLine([[x - w / 2 + 10 + c * w / 6 + (r % 2) * 20, by], [x - w / 2 + 40 + c * w / 6 + (r % 2) * 20, by]], .7, mixCol(col, '#000000', .3), 'inkfine', 0); }
  if (o.awning !== false) { const ay = y - h * .27; for (let i = 0; i < 6; i++) paint([[x - w * .3 + i * w * .1, ay], [x - w * .2 + i * w * .1, ay], [x - w * .25 + i * w * .1, ay + 26]], { wash: i % 2 ? PAL.cream : PAL.berry, ink: PAL.ink, sw: .6 }); }
  // door and steps
  paint(rrPts(x - w * .12, y - h * .2, w * .24, h * .2, w * .1), { wash: '#2A2340', ink: PAL.ink, sw: 1 });
  paint(rectPts(x - w * .18, y - 10, w * .36, 12, 1), { wash: mixCol(col, '#C9B48E', .5), ink: PAL.ink, sw: .7 });
  if (on > .05) glow(x, y - h * .1, w * .25, '#FFC766', on * .6);
  if (o.sign) { paint(rectPts(x - w * .3, y - h * .35, w * .6, h * .07, 1), { wash: PAL.cream, ink: PAL.ink, sw: .8 }); }
  pop();
  if (o.sign && k > .6) letter(o.sign, x, y - h * .315, Math.min(36, w * .09), PAL.ink, { face: 'hand', shadow: false });
}

// Clawd as the Professor's helper: smaller, carries things, reacts. Same character as the kit's, a sidekick here.
function helper(t, x, y, u, keys, o = {}) { clawd(x, y, u, { ...emotions(t, keys, { take: .7 }), ...o }); }

// a band of haze between layers: soft gradient from clear (top) to the haze colour (at y), fading again below
function fog(y, h, col, a = .6) {
  boilSeed('fog' + y);
  paint(rectPts(-400, y - h, W + 800, h * 1.6), { grad: [[0, rgba(col, 0)], [.6, rgba(col, a)], [1, rgba(col, 0)]], gdir: [0, y - h, 0, y + h * .6], ink: null, tex: 0 });
}
