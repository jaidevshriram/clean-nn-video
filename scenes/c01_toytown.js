// ch01 A city of neurons · TILT-SHIFT TOY TOWN. A miniature town on a sunny table, seen through a real perspective
// camera (so it has parallax as we fly over it), finished with a tilt-shift blur. A neuron is a little house whose
// windows show the photos that light it up: a toy train carries photos past, and dogs make the dog house blaze. Layers
// are rows of houses from the coast at the table's edge (pixels arrive) to the tall far rows (whole objects); a circuit
// is a lit route; the hope is to read it. It ends on a toy projector beaming onto a bedsheet in the town square (the
// 1930s film opens inside that frame).
(() => {
  const V = 'blog/raw/v-figure-10x/', PE = 'blog/raw/pose-everywhere/', C3 = 'blog/raw/crushed-3b-v3/', CX = 'blog/raw/crushed-3b/examples/', NP = 'blog/raw/negative-poles-v2/', CC = 'blog/raw/circuit-carousel/images/';
  const DOGS = [PE + 'large/0', PE + 'medium/0', PE + 'large/4', PE + 'medium/4'];
  const TOY = ['#E87A5A', '#F2C14E', '#7EB5D6', '#A4C97A', '#E8A0B4', '#F29A5A', '#9FB8E8'];
  const ROOF = ['#C2453A', '#3A64B8', '#6E4A86', '#3E7A4A', '#B5533C'];

  // ---------- the camera: a pinhole with a shifted lens (horizon at h0), f = focal length ----------
  let C = { x: 0, y: 300, z: -400, h0: 200, f: 1100 };
  const P = (x, y, z) => { const d = Math.max(8, z - C.z), k = C.f / d; return [W / 2 + (x - C.x) * k, C.h0 - (y - C.y) * k, k]; };
  // keys: [time, x, yTarget, zTarget, distance, height]: the camera looks at (x, yT, zT) from `distance` in front, at `height`
  function camKeys3(t, keys) { const v = kf(t, keys.map(k => [k[0], [k[1], k[2], k[3], Math.log(k[4]), k[5]]]), easeInOut), d = Math.exp(v[3]); C = { x: v[0] + 5 * Math.sin(t * .31), y: v[4] + 3 * Math.sin(t * .23), z: v[2] - d, h0: 540 + (v[1] - v[4]) * 1100 / d, f: 1100 }; return C; }
  const poly = (pts, col, o = {}) => { const Q = pts.map(p => P(p[0], p[1], p[2])); flat(Q, col, o); return Q; };

  // ---------- the town ----------
  const ROWZ = r => 260 + r * 300;   // front of row r
  const HOUSES = [];
  const FEAT = {};   // featured neurons by name
  (() => {
    for (let r = 0; r < 7; r++) for (let i = -6; i <= 6; i++) {
      const x = i * 250 + (r % 2) * 120 + (hash(r * 31 + i) - .5) * 30;
      if (hash(i * 17 + r * 5) < .22 && r > 0) continue;   // gaps (trees grow there)
      if ((r === 1 || r === 2) && Math.abs(x) < 120) continue;   // the town square (projector + bedsheet)
      const tall = r < 2 ? 1 : r < 4 ? 1.4 : 1.9, h = (95 + 50 * hash(i * 3 + r)) * tall, w = 120 + 30 * hash(i + r * 7), d = 110;
      HOUSES.push({ r, x, z: ROWZ(r) + (hash(i * 5 + r) - .5) * 30, w, d, h, roof: hash(i * 9 + r) > .3 ? 'gable' : 'flat', col: TOY[Math.abs(i * 3 + r * 5) % TOY.length], roofCol: ROOF[Math.abs(i + r * 2) % ROOF.length], lit: hash(i * 13 + r * 3), key: 'h' + r + '_' + i });
    }
    // featured neurons: the dog house (row 0), curve huts (row 1), eye and wheel houses (row 3), dog/car/ladybug towers
    const feat = (name, r, x, imgs, o = {}) => { const H = { r, x, z: ROWZ(r), w: o.w || 170, d: 120, h: o.h || 150, roof: o.roof || 'gable', col: o.col || '#E8D3B0', roofCol: o.roofCol || '#C2453A', imgs, key: 'f' + name, feat: name }; HOUSES.forEach((q, i) => { if (q.r === r && Math.abs(q.x - x) < 190) q.dead = true; }); HOUSES.push(H); FEAT[name] = H; };
    feat('dog', 0, 0, DOGS, { w: 190, h: 165, col: '#F2C14E', roofCol: '#C2453A' });
    feat('curveA', 1, -330, [C3 + 'curve-324', C3 + 'curve-379'], { w: 150, h: 120, col: '#9FD0E8', roofCol: '#3A64B8' });
    feat('curveB', 1, 330, [C3 + 'curve-342', C3 + 'sq-3'], { w: 150, h: 120, col: '#E8A0B4', roofCol: '#6E4A86' });
    feat('eye', 3, -210, [CX + '0-0-1', CX + '7-0-4', CX + '5-0-0', CX + '3-0-3'], { w: 180, h: 190, col: '#A4C97A', roofCol: '#3E7A4A' });
    feat('wheel', 3, 230, [CX + '0-0-0', CX + '2-0-4', CX + '3-0-2', CX + '6-0-2'], { w: 180, h: 190, col: '#F29A5A', roofCol: '#B5533C' });
    feat('dogT', 5, -260, [PE + 'large/2', PE + 'medium/6', PE + 'large/6', PE + 'medium/2'], { w: 200, h: 300, roof: 'flat', col: '#E87A5A' });
    feat('carT', 5, 250, [NP + 'taxis-positive-1', TVH('positive-04'), TVH('positive-02'), NP + 'taxis-positive-2'], { w: 200, h: 300, roof: 'flat', col: '#7EB5D6' });
    feat('lady', 6, 20, [CC + 'ladybug-stage3_block2-34-example-1', CC + 'ladybug-stage3_block2-34-example-2', CC + 'ladybug-stage3_block2-34-example-3', CC + 'ladybug-stage3_block2-34-example-4'], { w: 210, h: 330, roof: 'flat', col: '#E8A0B4' });
    for (let i = HOUSES.length - 1; i >= 0; i--) if (HOUSES[i].dead) HOUSES.splice(i, 1);
  })();
  function TVH(n) { return 'blog/raw/tiny-vehicles/' + n; }
  const TREES = []; for (let r = 0; r < 7; r++) for (let i = 0; i < 12; i++) { const x = -1500 + hash(i * 7 + r) * 3000, z = ROWZ(r) + 190 + hash(i * 3 + r * 11) * 40; if (Math.abs(x) < 160 && r < 3) continue; TREES.push({ x, z, s: .8 + .5 * hash(i + r) }); }

  // draw one house; on 0..1 lights it (windows, glow, gold aura); o.kWin: photo windows fill (0..1)
  function house(H, on = 0, o = {}) {
    const { x, z, w, d, h } = H, x0 = x - w / 2, x1 = x + w / 2, rh = H.roof === 'gable' ? w * .42 : 0, pop = o.pop ?? 1;
    if (z < C.z + Math.max(70, .45 * C.y)) return;   // too close to the lens: out of shot
    const hh = h * pop;
    // shadow on the ground (sun from back-left)
    ctx.save(); ctx.globalAlpha = .2; poly([[x0, 0, z], [x1, 0, z], [x1 + hh * .5, 0, z + d * .5], [x1 + hh * .5, 0, z + d + 40], [x0, 0, z + d]], '#2A3A20'); ctx.restore();
    if (on > .05) { const [gx, gy, k] = P(x, hh * .55, z); glow(gx, gy, (w + h) * .9 * k, '#FFC766', .55 * on); }
    const side = mixCol(H.col, '#3A2A3A', .3), top = mixCol(H.roofCol, '#FFFFFF', .12), topD = mixCol(H.roofCol, '#1A1020', .25);
    const L = 'rgba(40,24,30,.75)', lw = Math.max(1, 2.2 * P(x, 0, z)[2]);
    if (C.x < x0) poly([[x0, 0, z], [x0, 0, z + d], [x0, hh, z + d], [x0, hh, z]], side, { line: L, lw });
    if (C.x > x1) poly([[x1, 0, z], [x1, 0, z + d], [x1, hh, z + d], [x1, hh, z]], side, { line: L, lw });
    if (H.roof === 'gable') {
      const Rf = [x, hh + rh, z], Rb = [x, hh + rh, z + d], left = [[x0 - 6, hh - 4, z - 6], Rf, Rb, [x0 - 6, hh - 4, z + d + 6]], right = [[x1 + 6, hh - 4, z - 6], Rf, Rb, [x1 + 6, hh - 4, z + d + 6]];
      if (C.x < x) { poly(right, topD, { line: L, lw }); poly(left, top, { line: L, lw }); } else { poly(left, topD, { line: L, lw }); poly(right, top, { line: L, lw }); }
      poly([[x0, hh, z], Rf, [x1, hh, z]], mixCol(H.col, '#FFFFFF', .1), { line: L, lw });
    } else if (C.y > hh) poly([[x0 - 5, hh, z - 5], [x1 + 5, hh, z - 5], [x1 + 5, hh, z + d], [x0 - 5, hh, z + d]], top, { line: L, lw });
    const F = poly([[x0, 0, z], [x1, 0, z], [x1, hh, z], [x0, hh, z]], H.col, { line: L, lw });
    const fx = F[0][0], fy = F[2][1], fw = F[1][0] - F[0][0], fh = F[0][1] - F[2][1];
    if (H.roof === 'flat') flat(rectPts(fx - fw * .03, fy - fh * .06, fw * 1.06, fh * .08), topD, { line: L, lw });
    // windows
    const win = mixCol('#4A4A66', '#FFE38A', clamp(on * 1.2));
    if (H.imgs) {
      const n = H.imgs.length, cols = 2, rows = Math.ceil(n / cols), ww = fw * .34, wh = Math.min(ww, fh * .62 / rows - fw * .05);
      H.imgs.forEach((im, i) => {
        const wx = fx + fw * (i % cols ? .58 : .08), wy = fy + fh * .1 + Math.floor(i / cols) * (wh + fw * .06);
        flat(rectPts(wx - 4, wy - 4, ww + 8, wh + 8), '#FFF6E2', { line: L, lw });
        const kw = o.kWin ? clamp(o.kWin * n - i) : 1;
        if (kw > 0) { photoFlat(im, wx, wy, ww, wh, { alpha: (.3 + .7 * clamp(on * 1.3)) * kw }); }
        if (on < .9) { ctx.save(); ctx.globalAlpha = .6 * (1 - on); ctx.fillStyle = '#2A2A40'; ctx.fillRect(wx, wy, ww, wh); ctx.restore(); }
        ctx.save(); ctx.strokeStyle = '#FFF6E2'; ctx.lineWidth = Math.max(1, lw * .7); ctx.beginPath(); ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh); ctx.stroke(); ctx.restore();
      });
    } else {
      const lit = H.lit < .35 || on > .3;
      for (const [u, v] of h > 200 ? [[.15, .12], [.6, .12], [.15, .38], [.6, .38]] : [[.14, .22], [.62, .22]]) flat(rectPts(fx + fw * u, fy + fh * v, fw * .24, fh * (h > 200 ? .14 : .2)), lit ? mixCol('#FFE38A', win, .5) : '#55607A', { line: L, lw: lw * .7 });
    }
    flat(rrPts(fx + fw * .4, fy + fh * .72, fw * .2, fh * .28, fw * .06), '#5A3A2A', { line: L, lw: lw * .7 });
    if (on > .55) { ctx.save(); ctx.strokeStyle = '#FFD84A'; ctx.globalAlpha = (on - .55) / .45; ctx.lineWidth = lw * 2.4; ctx.shadowColor = '#FFC020'; ctx.shadowBlur = 30; ctx.strokeRect(fx, fy, fw, fh); ctx.restore(); }
    if (on > .7) for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + T * .6, r0 = Math.max(fw, fh) * .7, r1 = r0 + fh * .35 * (on - .7) / .3, cx = fx + fw / 2, cy = fy + fh / 2; ctx.save(); ctx.strokeStyle = '#FFD84A'; ctx.lineWidth = lw * 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * .8); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1 * .8); ctx.stroke(); ctx.restore(); }
    // a beacon of light rising from a firing neuron, so it reads from far away
    if (H.feat && on > .4) {
      const b = clamp((on - .4) / .4), [bx, by, k] = P(x, hh + rh, z + d * .5), bw = w * .32 * k, bh = 900 * k * b;
      ctx.save(); const g = ctx.createLinearGradient(0, by, 0, by - bh); g.addColorStop(0, 'rgba(255,214,80,.75)'); g.addColorStop(1, 'rgba(255,214,80,0)'); ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(bx - bw * .5, by); ctx.lineTo(bx - bw * 1.4, by - bh); ctx.lineTo(bx + bw * 1.4, by - bh); ctx.lineTo(bx + bw * .5, by); ctx.closePath(); ctx.fill(); ctx.restore();
      glow(bx, by, 80 * k + 20, '#FFE38A', b);
    }
    return { fx, fy, fw, fh };
  }
  const roofTop = n => { const F = FEAT[n]; return P(F.x, F.h + (F.roof === 'gable' ? F.w * .42 : 0) + 30, F.z + F.d * .5); };
  // a glowing arc over the rooftops from one firing neuron to the next (k draws it on); pulses run along it when done
  function arcLink(a, b, k, t) {
    if (k <= 0) return; const A = roofTop(a), B = roofTop(b), M = [(A[0] + B[0]) / 2, Math.min(A[1], B[1]) - 120 - .25 * Math.abs(A[0] - B[0])], Cq = through([A, M, B], 16), n = Math.max(2, Math.round(Cq.length * ease(k)));
    ctx.save(); ctx.lineCap = 'round'; ctx.shadowColor = '#FFB020'; ctx.shadowBlur = 26; ctx.strokeStyle = '#FFC93A'; ctx.lineWidth = 22; ctx.beginPath(); Cq.slice(0, n).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.shadowBlur = 0; ctx.strokeStyle = '#FFF6D0'; ctx.lineWidth = 7; ctx.stroke(); ctx.restore();
    if (k < 1) glow(Cq[n - 1][0], Cq[n - 1][1], 70, '#FFE38A', 1);
    else for (let i = 0; i < 2; i++) { const q = Cq[Math.floor(frac(t * .7 + i / 2) * (Cq.length - 1))]; glow(q[0], q[1], 50, '#FFFFFF', .9); }
  }
  function tree(T_) { const [x, y, k] = P(T_.x, 0, T_.z); if (k < .02 || T_.z < C.z + 40) return; const s = T_.s * k; ctx.save(); ctx.globalAlpha = .2; ctx.fillStyle = '#2A3A20'; ctx.beginPath(); ctx.ellipse(x + 20 * s, y, 34 * s, 8 * s, 0, 0, TAU); ctx.fill(); ctx.restore(); flat(rectPts(x - 4 * s, y - 50 * s, 8 * s, 50 * s), '#7A5233'); dot(x, y - 70 * s, 34 * s, '#4E8A44'); dot(x - 10 * s, y - 80 * s, 16 * s, '#6EAA5A'); }

  // the tabletop: wall and window behind, wooden table, a painted sea at the front edge (the coast), felt land,
  // streets between the rows, the railway along the beach
  function table(t) {
    vgrad([[0, '#F4D9A8'], [.5, '#F7E8C8'], [1, '#E9D3A6']]);
    GRAIN = .3;
    // a big sunny window on the far wall
    const wq = [P(-900, 1500, 3200), P(900, 1500, 3200), P(900, 300, 3200), P(-900, 300, 3200)];
    flat(wq, '#CFEAF5', { line: '#C9A06B', lw: 10 }); const [wx, wy] = P(0, 900, 3200); glow(wx, wy, 900 * wq[0][2], '#FFFFFF', .6);
    flat([P(0, 1500, 3200), P(0, 300, 3200)].concat([]), '#C9A06B');
    ctx.save(); ctx.strokeStyle = '#C9A06B'; ctx.lineWidth = 8 * wq[0][2] * 3; const a = P(0, 1500, 3200), b = P(0, 300, 3200), c = P(-900, 900, 3200), d = P(900, 900, 3200); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke(); ctx.restore();
    // floor below everything, table top, its front edge
    flat([[-100, H * .5], [W + 100, H * .5], [W + 100, H + 100], [-100, H + 100]], '#6A4A34');
    poly([[-1900, 0, -200], [1900, 0, -200], [1900, 0, 2600], [-1900, 0, 2600]], '#C9A06B');
    poly([[-1900, 0, -200], [1900, 0, -200], [1900, -60, -200], [-1900, -60, -200]], '#9A6E44');
    // felt land and sea
    poly([[-1700, 0, 100], [1700, 0, 100], [1700, 0, 2400], [-1700, 0, 2400]], '#A9CC86');
    poly([[-1700, 0, -150], [1700, 0, -150], [1700, 0, 40], [-1700, 0, 40]], '#5FA8D5');
    poly([[-1700, 0, 40], [1700, 0, 40], [1700, 0, 100], [-1700, 0, 100]], '#F2DDA8');
    for (let i = 0; i < 14; i++) { const z = -130 + (i % 4) * 45, x = -1500 + i * 230 + 40 * Math.sin(t * .8 + i); poly([[x, 0, z], [x + 90, 0, z], [x + 90, 0, z + 6], [x, 0, z + 6]], '#CFEAF5'); }
    // rails along the beach
    poly([[-1700, 0, 118], [1700, 0, 118], [1700, 0, 150], [-1700, 0, 150]], '#B9A486');
    for (let i = -40; i < 40; i++) { const x = i * 42; if (Math.abs(x - C.x) > 2500) continue; poly([[x, 0, 116], [x + 14, 0, 116], [x + 14, 0, 152], [x, 0, 152]], '#7A5A3A'); }
    for (const z of [124, 144]) poly([[-1700, 1, z], [1700, 1, z], [1700, 1, z + 3], [-1700, 1, z + 3]], '#5A5A66');
    // streets in front of each row
    for (let r = 0; r < 7; r++) { const z0 = ROWZ(r) - 95, z1 = ROWZ(r) - 25; if (r === 0) continue; poly([[-1700, 0, z0], [1700, 0, z0], [1700, 0, z1], [-1700, 0, z1]], '#8E8C98'); for (let i = -12; i < 12; i++) { const x = i * 150; poly([[x, 0, (z0 + z1) / 2 - 3], [x + 60, 0, (z0 + z1) / 2 - 3], [x + 60, 0, (z0 + z1) / 2 + 3], [x, 0, (z0 + z1) / 2 + 3]], '#E8E2C0'); } }
    // the square between rows 1 and 2
    poly([[-130, 0, ROWZ(1) - 25], [130, 0, ROWZ(1) - 25], [130, 0, ROWZ(2) + 140], [-130, 0, ROWZ(2) + 140]], '#D9CFB0');
  }
  // the town: rows back to front (each row sorted by distance from the camera), trees between
  function town(t, onOf, o = {}) {
    const drawn = {};
    for (let r = 6; r >= 0; r--) {
      TREES.filter(q => q.z > ROWZ(r) + 150 && q.z < ROWZ(r + 1)).forEach(tree);
      if (o.between) o.between(r);
      HOUSES.filter(q => q.r === r).sort((a, b) => Math.abs(b.x - C.x) - Math.abs(a.x - C.x)).forEach(q => { const on = onOf ? onOf(q) : 0; drawn[q.feat || q.key] = house(q, on, o.houseOpts ? o.houseOpts(q) : {}); });
    }
    return drawn;
  }
  // the toy train on the beach rails: cars [im], head at x
  function train(t, xHead, cars, o = {}) {
    const z = 108;
    for (let c = cars.length; c >= 0; c--) {
      const x = xHead - c * 230, L = c === 0 ? 170 : 190, x0 = x - L / 2, x1 = x + L / 2, col = c === 0 ? '#D2473F' : ['#3A64B8', '#F0BE46', '#6E9F58'][c % 3];
      if (P(x1, 0, z)[0] < -300 || P(x0, 0, z)[0] > W + 300) continue;
      poly([[x0, 14, z], [x1, 14, z], [x1, 14, z + 50], [x0, 14, z + 50]], mixCol(col, '#FFFFFF', .2));
      poly([[x0, 14, z], [x1, 14, z], [x1, 40, z], [x0, 40, z]], col, { line: '#2A2340', lw: 2 * P(x, 0, z)[2] });
      for (const wx of [x0 + 34, x1 - 34]) { const [px, py, k] = P(wx, 14, z); dot(px, py, 16 * k, '#2A2340'); dot(px, py, 6 * k, '#9AA3B5'); }
      if (c === 0) { poly([[x0 + 20, 40, z + 10], [x0 + 90, 40, z + 10], [x0 + 90, 110, z + 10], [x0 + 20, 110, z + 10]], '#D2473F', { line: '#2A2340', lw: 2 * P(x, 0, z)[2] }); poly([[x0 + 110, 40, z + 10], [x1 - 10, 40, z + 10], [x1 - 10, 80, z + 10], [x0 + 110, 80, z + 10]], '#2A2340'); poly([[x1 - 50, 80, z + 20], [x1 - 26, 80, z + 20], [x1 - 26, 120, z + 20], [x1 - 50, 120, z + 20]], '#2A2340'); for (let i = 0; i < 4; i++) { const ph = frac(t * 1.4 + i / 4), [sx, sy, k] = P(x1 - 38 - ph * 60, 130 + ph * 90, z + 20); dot(sx, sy, (12 + 26 * ph) * k, '#FFFFFF', .7 * (1 - ph)); } }
      else { const im = cars[c - 1]; if (!im) continue; const [px, py, k] = P(x - 60, 128, z + 20), [qx, qy] = P(x + 60, 44, z + 20); photoFlat(im, px, py, qx - px, qy - py, { border: 5 * k, shadow: false }); }
    }
  }
  // Clawd standing on the table at world (x, z)
  function tClawd(t, x, z, keys, extra = {}) { const [sx, sy, k] = P(x, 0, z); if (k <= 0) return; tourist(sx, sy, 8 * k, 'safari', { ...emotions(t, keys), view: 'q', ...extra }); return [sx, sy, k]; }

  // ---------- shot 1 · a neuron is a tiny detector; its windows show what lights it up ----------
  // train cars (photos); the car order is set so a dog reaches the dog house exactly on "lights up"
  const CARS = [V + 'pPool13', V + 'c5a94a', V + 'n282687', PE + 'large/0', V + 'c4d201c', PE + 'medium/0', V + 'n1158528', V + 'p10704', V + 'pTrain34', PE + 'large/4', V + 'c5a94c', V + 'n1070575', PE + 'medium/4', V + 'pCarX5', V + 'n132986', PE + 'large/2', V + 'p42708', PE + 'medium/2'];
  const isDog = im => im.includes('pose-everywhere') || im.includes('p10704');
  function detector(t, lt, dur) {
    const s0 = chapStart('ch01'), a = cs('nr_what'), tn = wt('nr_what', 'neuron'), tdet = wt('nr_what', 'detector'), tl = wt('nr_what', 'lights'), w0 = cs('nr_windows'), tsh = wt('nr_windows', 'showing'), tkeep = wt('nr_windows', 'keeping'), tbr = wt('nr_windows', 'brightest'), twin = wt('nr_windows', 'windows'), e = ce('nr_windows');
    const D = FEAT.dog;
    camKeys3(t, [[s0, 0, 112, 260, 80, 112], [s0 + .4, 0, 112, 260, 84, 115], [a + .8, 0, 110, 260, 560, 380], [tdet, 30, 100, 250, 600, 400], [tl + 1, 60, 100, 250, 640, 420], [tsh, 20, 90, 230, 760, 470], [tbr, 0, 100, 240, 700, 450], [e, -30, 100, 240, 660, 430]]);
    table(t);
    // train: a steady speed, then a blur of thousands of photos, then it slows again
    const v = 150, sp = t < tsh ? 0 : t < tbr + .6 ? Math.pow(seg(t, tsh, tsh + 1.4), 2) * 2400 * (1 - seg(t, tbr - .3, tbr + .6)) : 0;
    // head position with the dog car (index 3 → car c = 4) at the house (x = 0) when the word "lights" is said
    let xh = v * (t - tl) + 4 * 230;
    const extra = t < tsh ? 0 : (() => { let s = 0; const dt = 1 / 48; for (let q = tsh; q < t; q += dt) s += (q < tbr + .6 ? Math.pow(seg(q, tsh, tsh + 1.4), 2) * 2400 * (1 - seg(q, tbr - .3, tbr + .6)) : 0) * dt; return s; })();
    xh += extra;
    // which car is at the door? the house fires for dogs
    let fire = 0;
    for (let c = 1; c <= CARS.length * 3; c++) { const x = xh - c * 230, im = CARS[(c - 1) % CARS.length]; if (Math.abs(x) < 140 && isDog(im)) fire = Math.max(fire, 1 - Math.abs(x) / 140); }
    const cars = Array.from({ length: CARS.length * 3 }, (_, i) => CARS[i % CARS.length]);
    const fill = ease(seg(t, tkeep + .4, twin + .2)), on = Math.max(t < a ? .9 * (1 - seg(t, s0 + .8, a - .5)) : fire, fill * (.75 + .25 * Math.sin(t * 4)));
    const drawn = town(t, q => q === D ? on : q.feat ? .15 : 0, { houseOpts: q => q === D ? { kWin: t < w0 ? 1 : t < tkeep + .4 ? 1 - seg(t, w0, w0 + .6) : Math.max(fill, t > twin ? 1 : 0) } : {} });
    // the train rides in front of everything
    if (sp > 300) { ctx.save(); ctx.globalAlpha = .9; train(t, xh, cars); ctx.restore(); const [, by] = P(0, 90, 120); for (let i = 0; i < 9; i++) { ctx.save(); ctx.globalAlpha = .5; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; const yy = by - 60 + i * 18, xx = (hash(i * 3) * W + t * 3000) % W; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 180, yy); ctx.stroke(); ctx.restore(); } }
    else train(t, xh, cars);
    // Clawd on the beach by the rails, watching
    const hatOff = seg(t, tsh + .9, tsh + 2.2);
    tClawd(t, -280, 80, [[s0, 'happy'], [a + 1, 'thinking'], [tl - .1, 'excited'], [tsh + .9, 'surprised'], [tbr + .5, 'laugh'], [twin, 'love']], { flip: false, lookX: .7, lookY: -.3, dx: 0 });
    if (hatOff > 0 && hatOff < 1) { const [sx, sy, k] = P(-280 + 600 * hatOff, 70 + 260 * Math.sin(hatOff * Math.PI), 80 - 40 * hatOff); ctx.save(); ctx.translate(sx, sy); ctx.rotate(hatOff * 9); hatOn('safari', 0, 0, 70 * k); ctx.restore(); }
    // the brightest photos fly from the train up into the windows
    if (t > tkeep && t < twin + .5 && drawn.dog) DOGS.forEach((im, i) => { const k = seg(t, tkeep + .4 + i * .7, tkeep + 1.3 + i * .7); if (k <= 0 || k >= 1) return; const R = drawn.dog, tx = R.fx + R.fw * (i % 2 ? .75 : .25), ty = R.fy + R.fh * (.2 + Math.floor(i / 2) * .3), [sx, sy] = P(i * 60 - 90, 100, 120), q = arcPt([sx, sy], [tx, ty], 160, easeInOut(k)); photoFlat(im, q[0] - 50, q[1] - 40, 100, 80, { border: 5, rot: (1 - k) * .5 }); });
    if (drawn.dog) { const R = drawn.dog; hand('a neuron', R.fx + R.fw / 2, R.fy - R.fh * .62, 64, PAL.ink, seg(t, tn - .3, tn + .5) * (1 - seg(t, w0, w0 + .4)), { stroke: '#FFF6E2', strokeW: .14 }); }
    if (t > tsh - .2 && t < tbr + 1) title('a lot of pictures', 960, 160, 80, '#3A2A1A', seg(t, tsh - .2, tsh + .8) * (1 - seg(t, tbr + .4, tbr + 1)), { stroke: '#FFF6E2', strokeW: .1 });
    if (t > a - .3 && t < a + 4) title('Part I · the belief', 1120, 1000, 64, '#6E4FB0', seg(t, a - .2, a + .6) * (1 - seg(t, a + 3.2, a + 3.8)), { stroke: '#FFF6E2', strokeW: .12 });
    if (t > tl - .2 && t < tl + 1.3) sfx('DING!', W / 2 + 200, 330, 64, PAL.berry, t - tl + .1, { life: 1.2 });
    fxTiltShift(330, 820, 10);
  }

  // ---------- shot 2 · layers are districts: the coast (pixels), then edges, textures, whole ideas; then a circuit ----------
  function districts(t, lt, dur) {
    const a = cs('nr_layers'), tly = wt('nr_layers', 'layers'), tc = wt('nr_layers', 'coast'), tsim = wt('nr_layers', 'simple'), ted = wt('nr_layers', 'edges'), tin = wt('nr_layers', 'inland'), ttx = wt('nr_layers', 'textures'), thz = wt('nr_layers', 'horizon'), tdog = wt('nr_layers', 'dogs'), tlb = wt('nr_layers', 'ladybugs');
    const c0 = cs('nr_circuits'), tcir = wt('nr_circuits', 'circuit'), tread = wt('nr_circuits', 'read'), tdo = wt('nr_circuits', 'doing'), e = ce('nr_circuits');
    camKeys3(t, [[a - .5, -30, 100, 240, 660, 430], [tly - .3, 0, 0, 1000, 2500, 1300], [tc - .4, 0, 0, 1000, 2400, 1250], [tc + .8, -100, 0, 60, 900, 650], [tsim - .3, 0, 40, 200, 950, 650], [ted + .2, 0, 70, 560, 620, 860], [tin - .3, 0, 70, 560, 640, 880], [ttx, 0, 110, 1160, 680, 950], [thz - .6, 0, 120, 1160, 700, 980], [tdog - .4, 0, 190, 1850, 820, 1150], [tlb + .4, 0, 190, 1850, 860, 1180], [c0 + .2, -100, 180, 1000, 1700, 1250], [tcir, -150, 210, 950, 1600, 1200], [tdo, -160, 220, 950, 1550, 1150], [e + .4, -150, 220, 950, 1550, 1150]]);
    table(t);
    // a toy bucket tipping pixel cubes into the sea: the input arriving at the coast
    const rain = on(t, tc - 1, ted);
    const lightOf = q => {
      const n = q.feat;
      if (!n) return q.r <= 1 ? .2 * on(t, ted - .5, tin) : q.r <= 4 ? .2 * on(t, ttx - .4, thz) : .2 * on(t, tdog - .5, c0);
      const tt = { curveA: ted, curveB: wt('nr_layers', 'curves'), eye: wt('nr_layers', 'eyes'), wheel: wt('nr_layers', 'wheels'), dogT: tdog, carT: wt('nr_layers', 'cars'), lady: tlb }[n];
      const circ = { curveA: c0 + .6, eye: c0 + 1.7, dogT: c0 + 2.8 }[n];
      let k = tt ? env(t, tt - .3, tt + 2.6, .3, .8) : 0;
      if (circ) k = Math.max(k, on(t, circ, e + 2));
      return .15 + .85 * k;
    };
    const route = [[0, 165], [0, 455], [-330, 455], [-330, 560], [-330, 455], [-210, 455], [-210, 1055], [-210, 1160], [-210, 1055], [-260, 1055], [-260, 1655], [-260, 1760]];
    const circK = 0;
    town(t, lightOf, { between: r => {
      // the circuit: a glowing route painted on the streets (drawn under the rows it passes)
      if (circK <= 0) return;
      const C_ = through(route, 8), n = Math.max(2, Math.round(C_.length * circK));
      const Q = C_.slice(0, n).filter(p => p[1] < ROWZ(r) + 40 && p[1] >= ROWZ(r) - 300).map(p => P(p[0], 1, p[1]));
      if (Q.length > 1) { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = '#FFC020'; ctx.shadowBlur = 24; ctx.strokeStyle = '#FFD84A'; ctx.lineWidth = Math.max(4, 22 * P(0, 0, (ROWZ(r) - 100))[2]); ctx.beginPath(); Q.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore(); }
    } });
    // the beach: pixel cubes falling into the sea and washing ashore
    if (rain > 0) for (let i = 0; i < 140; i++) { const f = frac(t * .5 + hash(i)), x = -1300 + hash(i * 3.3) * 2600, z = -120 + hash(i * 5.1) * 140, y = lerp(700, 0, f); const [sx, sy, k] = P(x, y, z); const c = ['#E2476E', '#3A9C98', '#E8AA38', '#7B5CA8', '#8EC3E6', '#6E9F58'][i % 6]; ctx.save(); ctx.globalAlpha = rain * Math.min(1, (1 - f) * 4); flat(rectPts(sx - 20 * k, sy - 20 * k, 40 * k, 40 * k), c, { line: 'rgba(0,0,0,.25)', lw: 1 }); ctx.restore(); }
    // the circuit: arcs of light hop over the rooftops, neuron to neuron
    // simple shapes near the coast, a whole idea on the horizon: curve hut → eye house → dog tower
    [['curveA', 'eye'], ['eye', 'dogT']].forEach(([p, q], i) => arcLink(p, q, seg(t, c0 + 1 + i * 1.1, c0 + 2.1 + i * 1.1), t));
    // reading the circuit: each neuron's best photo pops up on a short stalk right over its roof
    ['curveA', 'eye', 'dogT'].forEach((n, i) => { const k = popk(t, tread + i * .5, .5); if (k <= 0) return; const [x, y] = roofTop(n), F = FEAT[n], bw = 112 * backOut(k), al = 1 - seg(t, e + .6, e + 1.2); ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = '#FFF6D0'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 36); ctx.stroke(); photoFlat(F.imgs[0], x - bw / 2, y - 36 - bw - 8, bw, bw, { border: 7 }); ctx.restore(); });
    if (false) { const C_ = through(route, 8), q = C_[Math.min(C_.length - 1, Math.round((C_.length - 1) * circK))], [sx, sy, k] = P(q[0], 0, q[1]); glow(sx, sy - 10 * k, 60 * k + 20, '#FFC766', 1); flat(rrPts(sx - 30 * k, sy - 22 * k, 60 * k, 22 * k, 6 * k), '#F0BE46', { line: '#3A2A1A', lw: 2 }); dot(sx - 18 * k, sy, 7 * k, '#2A2340'); dot(sx + 18 * k, sy, 7 * k, '#2A2340'); }
    // Clawd on the beach (seen from high up he's tiny), a pixel cube bonks him
    const bonk = wt('nr_layers', 'come');
    tClawd(t, 220, 70, [[a - 1, 'love'], [tly, 'excited'], [bonk + .25, 'dizzy'], [bonk + 2.2, 'happy'], [c0, 'excited']], { flip: true, lookX: -.4, lookY: -.6 });
    if (t > bonk - .6 && t < bonk + .25) { const [sx, sy, k] = P(220, lerp(400, 70, seg(t, bonk - .6, bonk + .25)), 70); flat(rectPts(sx - 14 * k, sy - 14 * k, 28 * k, 28 * k), '#E2476E'); }
    // labels: the districts, in big hand lettering
    const lab = (s, ta, tb, y = 170) => title(s, 960, y, 84, '#3A2A1A', seg(t, ta - .2, ta + .8), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, tb - .4, tb) });
    if (t < tc) lab('layers, like districts', tly, tc);
    else if (t < ted - .4) lab('the coast: pixels arrive', tc, ted - .4);
    else if (t < tin) lab('edges · curves · colors', ted - .3, tin);
    else if (t < thz) lab('textures · eyes · wheels', ttx - .2, thz);
    else if (t < c0) lab('dogs · cars · ladybugs', tdog - .3, c0);
    else lab('a circuit', tcir - .4, e + 1.5, 980);
    fxTiltShift(t < c0 ? 300 : 260, t < c0 ? 800 : 860, 9);
  }

  // ---------- shot 3 · the hope: look inside, read the parts, understand the machine; then the town cinema ----------
  function hope(t, lt, dur) {
    const a = cs('nr_hope'), tm = wt('nr_hope', 'mechanistic'), tlk = wt('nr_hope', 'Look'), trd = wt('nr_hope', 'Read'), tun = wt('nr_hope', 'Understand'), tnw = wt('nr_hope', 'network'), tcl = wt('nr_hope', 'clean'), e = ce('nr_hope'), end = chapStart('ch02');
    // projector in the square at (0, 380); bedsheet screen at (0, ROWZ(2) + 40), 300 wide, bottom at y 70
    const SZ = ROWZ(2) + 40;
    camKeys3(t, [[a - .5, -150, 220, 950, 1550, 1150], [tm, 150, 60, 560, 900, 900], [tlk, 280, 60, 520, 480, 560], [trd + .6, 260, 70, 520, 460, 540], [tun + .3, 100, 90, 650, 600, 560], [e + .3, 0, 150, SZ, 760, 480], [end, 0, 166, SZ, 700, 400], [end + 2.5, 0, 166, SZ, 640, 380]]);
    table(t);
    const beam = seg(t, tun + .6, e + .2), flick = .85 + .15 * hash(Math.floor(t * 24));
    town(t, q => q.feat === 'curveB' ? .3 + .7 * on(t, trd - .2, e + .4) : q.feat ? .25 + .1 * Math.sin(t * 2 + q.x) : 0, { between: r => {
      if (r !== 2) return;
      // the bedsheet screen on two poles, in the square
      for (const sx of [-170, 170]) poly([[sx - 6, 0, SZ], [sx + 6, 0, SZ], [sx + 6, 270, SZ], [sx - 6, 270, SZ]], '#7A5233');
      const S = poly([[-160, 70, SZ], [160, 70, SZ], [160, 262, SZ], [-160, 262, SZ]], mixCol('#F4F1E8', '#FFFFFF', beam * flick), { line: '#B9AF99', lw: 2 });
      for (let i = 0; i < 5; i++) { const xx = lerp(S[0][0], S[1][0], (i + .5) / 5); ctx.save(); ctx.strokeStyle = 'rgba(160,150,130,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xx, S[2][1]); ctx.quadraticCurveTo(xx + 6 * Math.sin(t + i), (S[0][1] + S[2][1]) / 2, xx, S[0][1]); ctx.stroke(); ctx.restore(); }
      if (beam > 0) { // flickering projected light and a leader countdown circle, in grey
        const cx = (S[0][0] + S[1][0]) / 2, cy = (S[0][1] + S[2][1]) / 2, R = (S[1][0] - S[0][0]) * .2;
        ctx.save(); ctx.globalAlpha = beam * .8; ctx.strokeStyle = '#6A6A6A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.moveTo(S[0][0], cy); ctx.lineTo(S[1][0], cy); ctx.moveTo(cx, S[2][1]); ctx.lineTo(cx, S[0][1]); ctx.stroke();
        ctx.fillStyle = 'rgba(90,90,90,.35)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R * 1.6, -Math.PI / 2, -Math.PI / 2 + frac(t) * TAU); ctx.closePath(); ctx.fill(); ctx.restore();
        if (t > e) txt(String(clamp(3 - Math.floor((t - e) * 1.6), 1, 3)), cx, cy, R * 1.3, '#4A4A4A', { font: 'serif', weight: '900' });
      }
    } });
    // the projector on its crate in the square, and its beam
    const PZ = 620, [px, py, pk] = P(0, 60, PZ);
    poly([[-50, 0, PZ - 20], [50, 0, PZ - 20], [50, 40, PZ - 20], [-50, 40, PZ - 20]], '#8C6A48', { line: '#3A2A1A', lw: 2 });
    poly([[-36, 40, PZ - 10], [36, 40, PZ - 10], [36, 86, PZ - 10], [-36, 86, PZ - 10]], '#4A5268', { line: '#1A1A22', lw: 2 });
    for (const rx of [-18, 20]) { const [rx_, ry, rk] = P(rx, 104, PZ - 5); dot(rx_, ry, 20 * rk, '#2A2A33'); ctx.save(); ctx.strokeStyle = '#9AA3B5'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(rx_, ry); ctx.lineTo(rx_ + Math.cos(t * 6 + rx) * 17 * rk, ry + Math.sin(t * 6 + rx) * 17 * rk); ctx.stroke(); ctx.restore(); }
    if (beam > 0) { const A = P(0, 64, PZ - 5), B1 = P(-160, 262, SZ), B2 = P(160, 70, SZ), B3 = P(-160, 70, SZ), B4 = P(160, 262, SZ); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .28 * beam * flick; ctx.fillStyle = '#FFF2C8'; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B1[0], B1[1]); ctx.lineTo(B4[0], B4[1]); ctx.lineTo(B2[0], B2[1]); ctx.lineTo(B3[0], B3[1]); ctx.closePath(); ctx.fill(); ctx.restore(); glow(A[0], A[1], 60 * pk, '#FFFFFF', beam); }
    // Clawd with a magnifier: looks inside a house, reads its windows, then switches the projector on
    const walk = stroll(t, a, tlk - .3, 240, 330, 1), wx = t < tun ? walk.x : lerp(330, 90, ease(seg(t, tun - .3, tun + .5)));
    const [cx, cy, ck] = P(wx, 0, t < tun - .3 ? 470 : lerp(470, 600, seg(t, tun - .3, tun + .5)));
    tourist(cx, cy, 8 * ck, 'safari', { ...emotions(t, [[a - 1, 'excited'], [tlk, 'thinking'], [trd, 'idea'], [tun + .6, 'proud'], [e, 'excited']]), view: t > tun - .3 && t < tun + .5 ? 'side' : 'q', flip: t > tun - .3, walk: (t > a && t < tlk - .3) || (t > tun - .3 && t < tun + .5) ? t * 2.4 : undefined, aR: t < tun ? 1.1 : undefined, armR: t < tun ? (u, sw) => { inkLine([[0, 0], [u * 1.2, 0]], sw * 2, '#7A5B3E', 'ink', 0); ctx.save(); ctx.strokeStyle = '#C99A45'; ctx.lineWidth = u * .4; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * 1.2, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); ctx.restore(); } : undefined });
    // words
    const words = [['look inside', tlk, 370], ['read the parts', trd, 812], ['understand the machine', tun, 1435]];
    words.forEach(([s, ta, x], i) => { title(s, x, 170, 60, '#3A2A1A', seg(t, ta - .2, ta + .6), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, tnw - .2, tnw + .3) }); if (i) title('·', i === 1 ? 578 : 1042, 170, 60, '#3A2A1A', seg(t, ta - .3, ta), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, tnw - .2, tnw + .3) }); });
    // the word the whole film is about
    if (t > tcl - .4) title('clean', 960, 200, 150, '#FFF6E2', seg(t, tcl - .3, tcl + .4), { stroke: '#3A2A1A', strokeW: .1, alpha: 1 - seg(t, end - .4, end + .2) });
    if (t > tnw - .3 && t < tcl + .5) hand('a network you can read like that…', 960, 990, 60, '#3A2A1A', seg(t, tnw - .3, tnw + 1.2) * (1 - seg(t, tcl - .4, tcl)), { stroke: '#FFF6E2', strokeW: .14 });
    if (t < tlk) title('mechanistic interpretability', 960, 170, 80, '#3A2A1A', seg(t, tm - .3, tm + 1.2), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, tlk - .6, tlk - .1) });
    if (t > tun + .5 && t < tun + 2) sfx('click!', cx - 60, Math.min(cy - 90, 930), 52, PAL.berry, t - tun - .6, { life: 1.1 });
    fxTiltShift(300, 820, 9);
  }

  shots([[chapStart('ch01'), detector], [cs('nr_layers') - .5, districts], [cs('nr_hope') - .5, hope]]);
})();
