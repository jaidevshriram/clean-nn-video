// ch01 A city of neurons · TILT-SHIFT TOY TOWN. It opens at night, seen from high up: a field of lit windows, like the
// galaxy; on "zoom all the way in" the camera dives to one lit house, and day comes up on "a little building in a town". A miniature town on a sunny table, seen through a real perspective
// camera (so it has parallax as we fly over it), finished with a tilt-shift blur. A neuron is a little house whose
// windows show the photos that light it up: a toy train carries photos past, and dogs make the dog house blaze. Layers
// are rows of houses from the coast at the table's edge (pixels arrive) to the tall far rows (whole objects); a circuit
// is a lit route; the hope is to read it. It ends on a toy projector beaming onto a bedsheet in the town square (the
// 1930s film opens inside that frame).
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
  // (the rows line up nearly vertically on screen from here, so the arc bows out sideways, side = ±1, like a bridge
  // seen from above, never folding into a hairpin)
  function arcLink(a, b, k, t, side = 1) {
    if (k <= 0) return; const A = roofTop(a), B = roofTop(b), dx = B[0] - A[0], dy = B[1] - A[1], d = Math.hypot(dx, dy) || 1, bow = .38 * d + 60;
    const M1 = [lerp(A[0], B[0], .3) - dy / d * bow * side * .9, lerp(A[1], B[1], .3) + dx / d * bow * side * .9 - 30], M2 = [lerp(A[0], B[0], .7) - dy / d * bow * side * .9, lerp(A[1], B[1], .7) + dx / d * bow * side * .9 - 30];
    const Cq = through([A, M1, M2, B], 14), n = Math.max(2, Math.round(Cq.length * ease(k)));
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
  // the toy train on the beach rails: cars [im], head at x. A tin steam engine (cowcatcher, boiler, dome, stack, cab
  // with a roof, spoked drivers with a side rod that turns with the distance travelled) pulls flatcars, coupled bar to
  // bar; each flatcar carries its photo upright in a wooden slot block, like a picture on a stand.
  function train(t, xHead, cars, o = {}) {
    const z = 108, INK_ = '#2A2340';
    const wheel = (wx, wy, r, zz, ang, rim = '#2A2340') => {   // a spoked wheel in the side plane; returns its crank pin
      const [px, py, k] = P(wx, wy, zz), R = r * k; dot(px, py, R, rim); dot(px, py, R * .78, '#9AA3B5'); dot(px, py, R * .22, rim);
      ctx.save(); ctx.strokeStyle = rim; ctx.lineWidth = Math.max(1, R * .12); ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = ang + i * Math.PI / 3; ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a) * R * .76, py + Math.sin(a) * R * .76); } ctx.stroke(); ctx.restore();
      return [px + Math.cos(ang) * R * .5, py + Math.sin(ang) * R * .5];
    };
    for (let c = cars.length; c >= 0; c--) {
      const x = xHead - c * 230, L = c === 0 ? 170 : 190, x0 = x - L / 2, x1 = x + L / 2, col = c === 0 ? '#D2473F' : ['#3A64B8', '#F0BE46', '#6E9F58'][c % 3];
      if (P(x1 + 60, 0, z)[0] < -300 || P(x0 - 60, 0, z)[0] > W + 300) continue;
      const lw = 2 * P(x, 0, z)[2], ln = { line: INK_, lw }, ang = -x / 16;   // wheels roll with the distance travelled
      // the coupler to the car in front: a bar with a knuckle at each end
      if (c > 0) { const xa = x1 - 4, xb = x1 + 230 - (c === 1 ? 170 : 190) / 2 + 4 + (c === 1 ? -10 : 0); poly([[xa, 22, z + 24], [xb, 22, z + 24], [xb, 30, z + 24], [xa, 30, z + 24]], '#4A4A58', ln); for (const kx of [xa + 6, xb - 6]) { const [qx, qy, k] = P(kx, 26, z + 24); dot(qx, qy, 6 * k, '#2A2340'); } }
      // deck: top and side, with a trim stripe
      poly([[x0, 40, z], [x1, 40, z], [x1, 40, z + 50], [x0, 40, z + 50]], mixCol(col, '#FFFFFF', .25), c === 0 ? {} : ln);
      poly([[x0, 14, z], [x1, 14, z], [x1, 40, z], [x0, 40, z]], col, ln);
      poly([[x0 + 6, 30, z - .5], [x1 - 6, 30, z - .5], [x1 - 6, 34, z - .5], [x0 + 6, 34, z - .5]], mixCol(col, '#FFFFFF', .45));
      if (c === 0) {
        // cowcatcher at the front
        const cw = poly([[x1, 40, z], [x1, 14, z], [x1 + 36, 4, z]], '#5A5A66', ln);
        ctx.save(); ctx.strokeStyle = INK_; ctx.lineWidth = Math.max(1, lw * .6); for (let i = 1; i < 4; i++) { const a = P(x1 + 36 * i / 4, 4 + 10 * (1 - i / 4) * 0, z), b = P(x1, 14 + 26 * i / 4, z); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } ctx.restore();
        // boiler: a cylinder, lit along its top, banded, with a dark smokebox at the front and a headlamp
        const bz = z + 6;
        poly([[x0 + 64, 40, bz], [x1 - 6, 40, bz], [x1 - 6, 96, bz], [x0 + 64, 96, bz]], '#C23A33', ln);
        poly([[x0 + 64, 80, bz - .5], [x1 - 6, 80, bz - .5], [x1 - 6, 90, bz - .5], [x0 + 64, 90, bz - .5]], '#E8776A');
        for (const bx of [x0 + 90, x0 + 125]) poly([[bx, 40, bz - 1], [bx + 6, 40, bz - 1], [bx + 6, 96, bz - 1], [bx, 96, bz - 1]], '#F0BE46');
        poly([[x1 - 30, 40, bz - 1], [x1 - 6, 40, bz - 1], [x1 - 6, 96, bz - 1], [x1 - 30, 96, bz - 1]], '#3A3A46', ln);
        { const [hx, hy, k] = P(x1 - 2, 102, bz); glow(hx, hy, 26 * k, '#FFE9A8', .7); dot(hx, hy, 7 * k, '#FFF6D8'); }
        // dome and smokestack (flared cap), with puffs
        { const [dx, dy, k] = P(x0 + 112, 96, bz); ctx.save(); ctx.fillStyle = '#F0BE46'; ctx.strokeStyle = INK_; ctx.lineWidth = lw; ctx.beginPath(); ctx.ellipse(dx, dy, 15 * k, 13 * k, 0, Math.PI, TAU); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
        poly([[x1 - 44, 96, bz], [x1 - 28, 96, bz], [x1 - 26, 126, bz], [x1 - 46, 126, bz]], '#2A2340', ln);
        poly([[x1 - 52, 126, bz], [x1 - 20, 126, bz], [x1 - 24, 136, bz], [x1 - 48, 136, bz]], '#3A3A46', ln);
        for (let i = 0; i < 4; i++) { const ph = frac(t * 1.4 + i / 4), [sx, sy, k] = P(x1 - 36 - ph * 70, 146 + ph * 90, bz); dot(sx, sy, (12 + 26 * ph) * k, '#FFFFFF', .7 * (1 - ph)); }
        // cab with a window and an overhanging roof
        poly([[x0 + 4, 40, bz], [x0 + 66, 40, bz], [x0 + 66, 118, bz], [x0 + 4, 118, bz]], '#D2473F', ln);
        poly([[x0 + 16, 78, bz - .5], [x0 + 54, 78, bz - .5], [x0 + 54, 108, bz - .5], [x0 + 16, 108, bz - .5]], '#FFE9A8', ln);
        poly([[x0 - 6, 118, bz - 6], [x0 + 76, 118, bz - 6], [x0 + 76, 118, bz + 46], [x0 - 6, 118, bz + 46]], '#3A3A46', ln);
        poly([[x0 - 6, 118, bz - 6], [x0 + 76, 118, bz - 6], [x0 + 76, 126, bz - 6], [x0 - 6, 126, bz - 6]], '#2A2340');
        // drivers with a side rod, and a small leading wheel
        const p1 = wheel(x0 + 46, 16, 19, z - 2, ang), p2 = wheel(x0 + 98, 16, 19, z - 2, ang); wheel(x1 - 22, 12, 12, z - 2, ang * 1.6);
        ctx.save(); ctx.strokeStyle = '#C9CDD6'; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2, 5 * P(x, 0, z)[2]); ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke(); ctx.strokeStyle = INK_; ctx.lineWidth = Math.max(1, lw * .5); ctx.stroke(); ctx.restore();
      } else {
        for (const wx of [x0 + 34, x1 - 34]) wheel(wx, 14, 16, z - 2, ang);
        const im = cars[c - 1]; if (!im) continue;
        // the photo stands in a slot cut into a wooden block on the deck (the block's face hides the photo's foot)
        poly([[x - 74, 52, z + 18], [x + 74, 52, z + 18], [x + 74, 52, z + 34], [x - 74, 52, z + 34]], '#C99A62', ln);
        const [px, py, k] = P(x - 60, 132, z + 26), [qx, qy] = P(x + 60, 44, z + 26); photoFlat(im, px, py, qx - px, qy - py, { border: 5 * k, shadow: false });
        poly([[x - 74, 40, z + 18], [x + 74, 40, z + 18], [x + 74, 52, z + 18], [x - 74, 52, z + 18]], '#A9784A', ln);
        for (const sx of [x - 64, x + 64]) poly([[sx - 4, 52, z + 18], [sx + 4, 52, z + 18], [sx + 4, 70, z + 18], [sx - 4, 70, z + 18]], '#8A5E3A', ln);
      }
    }
  }
  // Clawd standing on the table at world (x, z)
  // (extra.noHat: the safari hat is off his head, e.g. while the wind has it)
  function tClawd(t, x, z, keys, extra = {}) { const [sx, sy, k] = P(x, 0, z); if (k <= 0) return; tourist(sx, sy, 8 * k, extra.noHat ? null : 'safari', { ...emotions(t, keys), view: 'q', ...extra }); return [sx, sy, k]; }

  // night over the table: everything dims, and the lit windows glow like stars (the dog house brightest)
  function nightfall(t, k, drawn) {
    ctx.save(); resetMatrix(); ctx.globalAlpha = .84 * k; ctx.fillStyle = '#0B0F2A'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const wq = [P(-900, 1500, 3200), P(900, 300, 3200)]; for (let i = 0; i < 40; i++) dot(lerp(wq[0][0], wq[1][0], hash(i * 3.7)), lerp(wq[0][1], wq[1][1], hash(i * 5.3)), 1 + 1.5 * hash(i), '#FFFFFF', k * (.5 + .4 * Math.sin(t * 2 + i)));
    HOUSES.forEach(q => {
      const R = drawn[q.feat || q.key]; if (!R || !(q.lit < .45 || q.feat)) return; const dog = q.feat === 'dog', { fx, fy, fw, fh } = R;
      if (dog) glow(fx + fw / 2, fy + fh / 2, fw * 2.2, '#FFC766', k * (.85 + .15 * Math.sin(t * 3)));
      for (const u of [.14, .62]) { const wx = fx + fw * u, wy = fy + fh * .22, ww = fw * .24, wh = fh * .2; glow(wx + ww / 2, wy + wh / 2, Math.max(8, fw * (dog ? .5 : .3)), '#FFD27A', k * (dog ? 1 : .7)); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#FFE9A8'; ctx.fillRect(wx, wy, ww, wh); ctx.restore(); }
    });
  }
  // ---------- shot 1 · a neuron is a tiny detector; its windows show what lights it up ----------
  // train cars (photos); the car order is set so a dog reaches the dog house exactly on "lights up"
  const CARS = [V + 'pPool13', V + 'c5a94a', V + 'n282687', PE + 'large/0', V + 'c4d201c', PE + 'medium/0', V + 'n1158528', V + 'p10704', V + 'pTrain34', PE + 'large/4', V + 'c5a94c', V + 'n1070575', PE + 'medium/4', V + 'pCarX5', V + 'n132986', PE + 'large/2', V + 'p42708', PE + 'medium/2'];
  const isDog = im => im.includes('pose-everywhere') || im.includes('p10704');
  function detector(t, lt, dur) {
    const s0 = chapStart('ch01'), a = cs('nr_what'), tn = wt('nr_what', 'neuron'), tdet = wt('nr_what', 'detector'), tl = wt('nr_what', 'lights'), w0 = cs('nr_windows'), tsh = wt('nr_windows', 'showing'), tkeep = wt('nr_windows', 'keeping'), tbr = wt('nr_windows', 'brightest'), twin = wt('nr_windows', 'windows'), e = ce('nr_windows');
    const D = FEAT.dog, tz = wt('nr_what', 'zoom'), tbd = wt('nr_what', 'building'), ttn = wt('nr_what', 'town'), tso = wt('nr_what', 'So');
    // night until "building": the town is a field of lights; the dive to the one lit house; day comes up on "town"
    const night = 1 - ease(seg(t, tbd - .3, ttn + .9));
    camKeys3(t, [[s0, 0, 0, 1150, 3300, 2300], [tz, 0, 0, 1050, 3000, 2150], [lerp(tz, tbd, .55), 0, 90, 270, 1100, 700], [tbd, 0, 112, 260, 420, 250], [tso + .4, 0, 110, 260, 560, 380], [tdet, 30, 100, 250, 600, 400], [tl + 1, 60, 100, 250, 640, 420], [tsh, 20, 90, 230, 760, 470], [tbr, 0, 100, 240, 700, 450], [e, -30, 100, 240, 660, 430]]);
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
    const fill = ease(seg(t, tkeep + .4, twin + .2)), on = Math.max(t < ttn + 1.2 ? .95 * (1 - seg(t, ttn + .2, ttn + 1.2)) : fire, fill * (.75 + .25 * Math.sin(t * 4)));
    const drawn = town(t, q => q === D ? on : q.feat ? .15 : 0, { houseOpts: q => q === D ? { kWin: t < w0 ? 1 : t < tkeep + .4 ? 1 - seg(t, w0, w0 + .6) : Math.max(fill, t > twin ? 1 : 0) } : {} });
    // the train rides in front of everything
    if (sp > 300) { ctx.save(); ctx.globalAlpha = .9; train(t, xh, cars); ctx.restore(); const [, by] = P(0, 90, 120); for (let i = 0; i < 9; i++) { ctx.save(); ctx.globalAlpha = .5; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; const yy = by - 60 + i * 18, xx = (hash(i * 3) * W + t * 3000) % W; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 180, yy); ctx.stroke(); ctx.restore(); } }
    else train(t, xh, cars);
    // Clawd on the beach by the rails, watching
    // the gag: the rush of the train lifts the hat off his head; it tumbles up and away on the wind, loops back, and he
    // catches it on his head (it lands exactly where his own hat sits, so there is only ever one hat)
    const hatOff = seg(t, tsh + .9, tsh + 2.6), hf = hatOff > 0 && hatOff < 1, land = env(t, tsh + 2.5, tsh + 2.95, .08, .3);
    const reach = hf ? Math.sin(Math.PI * seg(hatOff, .55, 1)) : 0;
    const cl = tClawd(t, -280, 80, [[s0, 'happy'], [a + 1, 'thinking'], [tl - .1, 'excited'], [tsh + .9, 'surprised'], [tsh + 2.5, 'happy'], [tbr + .5, 'laugh'], [twin, 'love']], { flip: false, lookX: hf ? .5 : .7, lookY: hf ? -1 : -.3, dx: 0, noHat: hf, aL: hf ? lerp(.2, 1.5, reach) : undefined, aR: hf ? lerp(.2, 1.3, reach) : undefined, sq: .12 * Math.sin(land * Math.PI) });
    if (hf && cl) { const [sx, sy, k] = cl, u = 8 * k, f = hatOff, hx = sx + .6 * u, hy = sy - 8.05 * u;
      const ox = u * (44 * Math.sin(Math.PI * f) * (1 - .35 * f)), oy = -u * (30 * Math.sin(Math.PI * Math.pow(f, .8)) + 6 * Math.sin(TAU * f));
      ctx.save(); ctx.translate(hx + ox, hy + oy); ctx.rotate(TAU * 2 * easeInOut(f)); ctx.scale(1, 1 - .5 * Math.abs(Math.sin(f * 11)) * (1 - f)); hatOn('safari', 0, 0, 9 * u); ctx.restore(); }
    // the brightest photos fly from the train up into the windows
    if (t > tkeep && t < twin + .5 && drawn.dog) DOGS.forEach((im, i) => { const k = seg(t, tkeep + .4 + i * .7, tkeep + 1.3 + i * .7); if (k <= 0 || k >= 1) return; const R = drawn.dog, tx = R.fx + R.fw * (i % 2 ? .75 : .25), ty = R.fy + R.fh * (.2 + Math.floor(i / 2) * .3), [sx, sy] = P(i * 60 - 90, 100, 120), q = arcPt([sx, sy], [tx, ty], 160, easeInOut(k)); photoFlat(im, q[0] - 50, q[1] - 40, 100, 80, { border: 5, rot: (1 - k) * .5 }); });
    if (night > 0) nightfall(t, night, drawn);
    if (drawn.dog) { const R = drawn.dog; hand('a neuron', R.fx + R.fw / 2, R.fy - R.fh * .62, 64, PAL.ink, seg(t, tn - .3, tn + .5), { stroke: '#FFF6E2', strokeW: .14, alpha: 1 - seg(t, w0, w0 + .4) }); }
    if (t > tsh - .2 && t < tbr + 1) title('a lot of pictures', 960, 160, 80, '#3A2A1A', seg(t, tsh - .2, tsh + .8), { stroke: '#FFF6E2', strokeW: .1, alpha: 1 - seg(t, tbr + .4, tbr + 1) });
    if (t > a - .3 && t < a + 4) title('Part I · the belief', 1120, 1000, 64, '#6E4FB0', seg(t, a - .2, a + .6), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, a + 3.2, a + 3.8) });
    if (t > tl - .2 && t < tl + 1.3) sfx('DING!', W / 2 + 300, 560, 72, PAL.berry, t - tl + .1, { life: 1.2 });   // (low enough to sit in the sharp band, clear of the roofs)
    fxTiltShift(330, 820, 10);
  }

  // a small pixel cube at world (x, y, z) (its bottom-front-centre), size s: front, top and the side facing the camera
  function pixCube(x, y, z, s, col) {
    const a = x - s / 2, b = x + s / 2, L = { line: 'rgba(40,24,30,.55)', lw: Math.max(1, 1.4 * P(x, y, z)[2]) }, d = s * .6;   // (depth foreshortened a little: toy blocks read as cubes from up here)
    if (C.x > b) poly([[b, y, z], [b, y, z + d], [b, y + s, z + d], [b, y + s, z]], mixCol(col, '#2A1A2A', .3), L);
    else if (C.x < a) poly([[a, y, z], [a, y, z + d], [a, y + s, z + d], [a, y + s, z]], mixCol(col, '#2A1A2A', .3), L);
    if (C.y > y + s) poly([[a, y + s, z], [b, y + s, z], [b, y + s, z + d], [a, y + s, z + d]], mixCol(col, '#FFFFFF', .35), L);
    poly([[a, y, z], [b, y, z], [b, y + s, z], [a, y + s, z]], col, L);
  }
  // a big toy sand pail standing on the beach at (x, 0, z); tip 0..1 tips it over to the right about its base corner.
  // Returns the world position of its mouth (where the cubes come out).
  function pail(t, x, z, tip) {
    const a = -1.95 * easeInOut(clamp(tip)) + .06 * Math.sin(t * 9) * Math.sin(Math.PI * clamp(tip)), ca = Math.cos(a), sa = Math.sin(a), px = x + 42;
    const W_ = (u, v) => [px + (u - 42) * ca - v * sa, (u - 42) * sa + v * ca];   // local (u, v), pivot at the base's right corner
    const Q = (pts, dz = 0) => pts.map(([u, v]) => { const [wx, wy] = W_(u, v); return [wx, wy, z + dz]; });
    const L = { line: 'rgba(40,24,30,.8)', lw: Math.max(1.5, 2.6 * P(x, 0, z)[2]) };
    ctx.save(); ctx.globalAlpha = .22; poly([[x - 50, 0, z], [x + 60 + 120 * clamp(tip), 0, z], [x + 60 + 120 * clamp(tip), 0, z + 60], [x - 50, 0, z + 60]], '#2A3A20'); ctx.restore();
    // the inside of the mouth (seen past the rim when tipped), then the body, stripes, rim and handle
    const rim = th => { const [wx, wy] = W_(58 * Math.cos(th), 118); return [wx, wy, z + 26 * Math.sin(th)]; };
    poly(Array.from({ length: 20 }, (_, i) => rim(i / 20 * TAU)), '#7A2038', L);
    poly(Q([[-42, 0], [42, 0], [58, 118], [-58, 118]]), '#E2476E', L);
    poly(Q([[-47, 34], [47, 34], [50, 54], [-50, 54]], -.5), '#F2C14E');
    poly(Q([[-60, 106], [60, 106], [60, 122], [-60, 122]], -1), '#F07890', L);
    const H = Array.from({ length: 13 }, (_, i) => { const q = Math.PI * i / 12, [wx, wy] = W_(-56 * Math.cos(q), 118 + 70 * Math.sin(q)); return P(wx, wy, z - 2); });
    ctx.save(); ctx.strokeStyle = '#3A3A46'; ctx.lineWidth = Math.max(2, 4 * P(x, 0, z)[2]); ctx.lineCap = 'round'; ctx.beginPath(); H.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore();
    const [mx, my] = W_(0, 120); return { mx, my: Math.max(20, my), mz: z };
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
    // the input arrives: a giant toy sand pail on the beach tips over and pours pixel cubes into the sea; they bob and
    // wash up on the sand. Everything is drawn at its own depth (it all sits in front of the first row of houses).
    const PB = pail(t, -380, 55, seg(t, tc - 1.3, tc - .7) - seg(t, ted - .2, ted + .5));
    const PCOL = ['#E2476E', '#3A9C98', '#E8AA38', '#7B5CA8', '#8EC3E6', '#6E9F58'], N = 90, p0 = tc - .75, p1 = ted - .6, gone = 1 - seg(t, ted - .4, ted + .2);
    const CUBES = [];
    if (rain > 0 && gone > 0) for (let i = 0; i < N; i++) {
      const L = lerp(p0, p1, (i + hash(i * 1.9) * .6) / N), tau = t - L; if (tau < 0) continue;
      const vx = 100 + 420 * hash(i * 3.3), vz = -30 - 260 * hash(i * 2.1), vy = 200 + 220 * hash(i * 4.7), G_ = 900;
      const tl_ = (vy + Math.sqrt(vy * vy + 2 * G_ * PB.my)) / G_;   // when it hits the water
      let x, y, z;
      if (tau < tl_) { x = PB.mx + vx * tau; z = PB.mz + vz * tau; y = PB.my + vy * tau - G_ / 2 * tau * tau; }
      else { const d = tau - tl_, ashore = 1 - Math.exp(-d * .6); x = PB.mx + vx * tl_ + 10 * Math.sin(d * 1.3 + i); z = lerp(PB.mz + vz * tl_, 22 + 24 * hash(i * 6.1), ashore); y = 3 * Math.sin(d * 4 + i) * (1 - ashore); }
      CUBES.push([x, y, z, 24 + 10 * hash(i * 8.3), PCOL[i % 6]]);
    }
    CUBES.sort((a, b) => b[2] - a[2]);
    ctx.save(); ctx.globalAlpha = gone; CUBES.filter(c => c[2] >= 70).forEach(c => pixCube(...c)); ctx.restore();
    // the circuit: arcs of light hop over the rooftops, neuron to neuron
    // simple shapes near the coast, a whole idea on the horizon: curve hut → eye house → dog tower
    [['curveA', 'eye'], ['eye', 'dogT']].forEach(([p, q], i) => arcLink(p, q, seg(t, c0 + 1 + i * 1.1, c0 + 2.1 + i * 1.1), t, i ? -1 : 1));
    // reading the circuit: each neuron's best photo pops up on a short stalk right over its roof
    // (staggered out to the sides and up, on bent stalks, so the three photos never cover each other)
    const STALK = { curveA: [-190, 30], eye: [200, 40], dogT: [-220, 0] };
    ['curveA', 'eye', 'dogT'].forEach((n, i) => { const k = popk(t, tread + i * .5, .5); if (k <= 0) return; const [x, y] = roofTop(n), F = FEAT[n], [ox, oh] = STALK[n], bw = 112 * backOut(k), al = 1 - seg(t, e + .6, e + 1.2), px = x + ox * easeOut(k), py = y - oh - 40 * easeOut(k);
      ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = '#FFF6D0'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x, py, px, py); ctx.stroke(); dot(x, y, 6, '#FFF6D0'); photoFlat(F.imgs[0], px - bw / 2, py - bw - 8, bw, bw, { border: 7 }); ctx.restore(); });
    if (false) { const C_ = through(route, 8), q = C_[Math.min(C_.length - 1, Math.round((C_.length - 1) * circK))], [sx, sy, k] = P(q[0], 0, q[1]); glow(sx, sy - 10 * k, 60 * k + 20, '#FFC766', 1); flat(rrPts(sx - 30 * k, sy - 22 * k, 60 * k, 22 * k, 6 * k), '#F0BE46', { line: '#3A2A1A', lw: 2 }); dot(sx - 18 * k, sy, 7 * k, '#2A2340'); dot(sx + 18 * k, sy, 7 * k, '#2A2340'); }
    // Clawd on the beach (seen from high up he's tiny), a pixel cube bonks him
    const bonk = wt('nr_layers', 'come');
    tClawd(t, 220, 70, [[a - 1, 'love'], [tly, 'excited'], [bonk + .25, 'dizzy'], [bonk + 2.2, 'happy'], [c0, 'excited']], { flip: true, lookX: -.4, lookY: -.6 });
    ctx.save(); ctx.globalAlpha = gone; CUBES.filter(c => c[2] < 70).forEach(c => pixCube(...c)); ctx.restore();
    // one stray cube sails out of the pail and bonks him on the hat, then bounces off onto the sand
    if (t > bonk - .7 && t < bonk + .8) { const f = seg(t, bonk - .7, bonk + .2), g = seg(t, bonk + .2, bonk + .8);
      if (t < bonk + .2) pixCube(lerp(PB.mx, 220, f), lerp(PB.my, 80, f) + 260 * Math.sin(f * Math.PI), lerp(PB.mz, 70, f), 26, '#E2476E');
      else pixCube(lerp(220, 330, g), 80 * Math.abs(Math.cos(g * Math.PI * 1.5)) * (1 - g), lerp(70, 60, g), 26, '#E2476E'); }
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


  // ---------- the town cinema: projector + leader ----------
  // a film leader on the sheet: the classic circle, cross, sweeping hand and big numbers, scratched and flickering;
  // it counts 3, 2, 1 across the last line so the next world can start on the reel
  function leader(t, S, beam, flick, t0, t1) {
    const X0 = Math.min(S[0][0], S[1][0]), Y0 = Math.min(S[0][1], S[2][1]), w = Math.abs(S[1][0] - S[0][0]), h = Math.abs(S[2][1] - S[0][1]), cx = X0 + w / 2, cy = Y0 + h / 2, R = Math.min(w, h) * .36;
    ctx.save(); ctx.beginPath(); ctx.rect(X0, Y0, w, h); ctx.clip();
    ctx.globalAlpha = beam; ctx.fillStyle = `rgba(250,246,232,${.55 + .35 * flick})`; ctx.fillRect(X0, Y0, w, h);
    const k = clamp((t - t0) / Math.max(.6, t1 - t0)), n = 3 - Math.min(2, Math.floor(k * 3)), sweep = (k * 3) % 1;
    ctx.strokeStyle = '#5A5650'; ctx.lineWidth = Math.max(2, w * .012);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU * .999); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, R * .78, 0, TAU * .999); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X0, cy); ctx.lineTo(X0 + w, cy); ctx.moveTo(cx, Y0); ctx.lineTo(cx, Y0 + h); ctx.stroke();
    ctx.fillStyle = 'rgba(70,66,60,.32)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R * 1.9, -Math.PI / 2, -Math.PI / 2 + sweep * TAU); ctx.closePath(); ctx.fill();
    if (t > t0 - .2) { ctx.globalAlpha = beam * clamp((t - t0 + .2) / .3); ctx.fillStyle = '#2E2C28'; ctx.font = `900 ${Math.round(R * 1.15)}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(n), cx, cy + R * .05); }
    ctx.globalAlpha = beam * .5; ctx.strokeStyle = '#3A3630'; ctx.lineWidth = 1.2;   // scratches and dust on the film
    for (let i = 0; i < 4; i++) { const sx = X0 + w * hash(Math.floor(t * 12) * 7 + i), len = h * (.3 + .6 * hash(i + Math.floor(t * 12))); ctx.beginPath(); ctx.moveTo(sx, Y0 + h * hash(i * 3 + Math.floor(t * 12))); ctx.lineTo(sx + 2, Y0 + h * hash(i * 3 + Math.floor(t * 12)) + len); ctx.stroke(); }
    for (let i = 0; i < 6; i++) dot(X0 + w * hash(Math.floor(t * 24) + i * 11), Y0 + h * hash(Math.floor(t * 24) * 3 + i), 1.5 + 2 * hash(i), '#3A3630', .6 * beam);
    const vg = ctx.createRadialGradient(cx, cy, R * .4, cx, cy, Math.max(w, h) * .75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(60,50,30,.35)'); ctx.globalAlpha = beam; ctx.fillStyle = vg; ctx.fillRect(X0, Y0, w, h);
    ctx.restore();
  }
  // a toy film projector seen from behind on a wooden crate at world (x, 0, z); the lens points down the square at the
  // sheet (screen quad at depth SZ). Reels spin and the light cone, with drifting dust, lands exactly on the sheet.
  function projector(t, x, z, beam, flick, SZ) {
    const [bx, by, k] = P(x, 0, z), u = k;   // u: pixels per world unit at the projector
    const lens = P(x, 78, z + 40), S = [P(-160, 262, SZ), P(160, 262, SZ), P(160, 70, SZ), P(-160, 70, SZ)];
    // the light cone first, so the projector body sits in front of its own beam
    if (beam > 0) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(lens[0], lens[1], (S[0][0] + S[1][0]) / 2, (S[0][1] + S[2][1]) / 2);
      g.addColorStop(0, `rgba(255,244,210,${.85 * beam * flick})`); g.addColorStop(1, `rgba(255,244,210,${.34 * beam * flick})`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(lens[0], lens[1]); ctx.lineTo(S[0][0], S[0][1]); ctx.lineTo(S[1][0], S[1][1]); ctx.lineTo(S[2][0], S[2][1]); ctx.lineTo(S[3][0], S[3][1]); ctx.closePath(); ctx.fill();
      for (let i = 0; i < 26; i++) {   // dust motes drifting through the beam
        const f = hash(i * 1.7), q = frac(t * (.05 + .05 * hash(i)) + hash(i * 3.1)), tx = lerp(S[3][0], S[2][0], f), ty = lerp(S[3][1], S[0][1], hash(i * 5.3));
        dot(lerp(lens[0], tx, q), lerp(lens[1], ty, q), (1 + 1.8 * hash(i * 9)) * Math.max(.6, k * .9), '#FFF6DA', .5 * beam * Math.sin(q * Math.PI));
      }
      ctx.restore();
      glow(lens[0], lens[1], 40 * k, '#FFF2C8', .9 * beam * flick);
    }
    // crate: two visible faces with planks and a stencilled mark
    const cw = 96 * u, ch = 44 * u, cd = 26 * u, x0 = bx - cw / 2, y0 = by - ch;
    flat([[x0, by], [x0 + cw, by], [x0 + cw, y0], [x0, y0]], '#A0764C', { line: '#4A3020', lw: Math.max(1.5, 2.2 * u) });
    flat([[x0, y0], [x0 + cw, y0], [x0 + cw - cd * .5, y0 - cd * .55], [x0 + cd * .5, y0 - cd * .55]], '#B98A5A', { line: '#4A3020', lw: Math.max(1.5, 2.2 * u) });
    ctx.save(); ctx.strokeStyle = 'rgba(74,48,32,.55)'; ctx.lineWidth = Math.max(1, 1.4 * u);
    for (let i = 1; i < 3; i++) { ctx.beginPath(); ctx.moveTo(x0, y0 + ch * i / 3); ctx.lineTo(x0 + cw, y0 + ch * i / 3); ctx.stroke(); }
    ctx.restore();
    // the body: a rounded steel box seen from behind, with a vent grille, the crank and the lens barrel poking forward
    const pw = 64 * u, ph = 40 * u, px0 = bx - pw / 2, py1 = y0 - cd * .3, py0 = py1 - ph;
    flat(rrPts(px0, py0, pw, ph, 7 * u), '#3E4A5E', { line: '#151A24', lw: Math.max(1.5, 2.4 * u) });
    flat(rrPts(px0 + 6 * u, py0 + 6 * u, pw - 12 * u, 9 * u, 3 * u), '#56647C');
    ctx.save(); ctx.strokeStyle = '#1E2533'; ctx.lineWidth = Math.max(1, 1.6 * u);
    for (let i = 0; i < 5; i++) { const gy = py0 + 20 * u + i * 3.6 * u; ctx.beginPath(); ctx.moveTo(px0 + 14 * u, gy); ctx.lineTo(px0 + pw - 14 * u, gy); ctx.stroke(); }
    ctx.restore();
    flat(rrPts(bx - 9 * u, py0 - 6 * u, 18 * u, 8 * u, 3 * u), '#2A3242', { line: '#151A24', lw: Math.max(1, 1.8 * u) });   // the barrel, seen end-on past the top
    // the crank on the right side, turning while the film runs
    const ca = t * (beam > 0 ? 7 : 0), hx = px0 + pw + 4 * u, hy = py0 + ph * .55;
    ctx.save(); ctx.strokeStyle = '#151A24'; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2, 3 * u); ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + Math.cos(ca) * 11 * u, hy + Math.sin(ca) * 11 * u); ctx.stroke(); ctx.restore();
    dot(hx + Math.cos(ca) * 11 * u, hy + Math.sin(ca) * 11 * u, 3.4 * u, '#C9A45A'); dot(hx, hy, 2.6 * u, '#56647C');
    // two spoked reels on arms, the film looping down into the body; they spin while the beam is on
    const spin = t * (beam > 0 ? 5 : 0);
    [[-17, 1.06], [19, .92]].forEach(([rx, sc], i) => {
      const cx = bx + rx * u, cy = py0 - 24 * u * sc, r = 17 * u * sc;
      ctx.save(); ctx.strokeStyle = '#151A24'; ctx.lineWidth = Math.max(1.5, 2.2 * u); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx + rx * .4 * u, py0); ctx.stroke(); ctx.restore();
      flat(ellPts(cx, cy, r, r, 28), '#2A303C', { line: '#11151C', lw: Math.max(1.5, 2.2 * u) });
      flat(ellPts(cx, cy, r * .82, r * .82, 24), '#4A3A2E');   // the wound film
      ctx.save(); ctx.strokeStyle = '#8A93A6'; ctx.lineWidth = Math.max(1.5, 2.4 * u);
      for (let s = 0; s < 3; s++) { const a = spin * (i ? 1.2 : 1) + s * TAU / 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r * .8, cy + Math.sin(a) * r * .8); ctx.stroke(); }
      ctx.restore(); dot(cx, cy, 2.6 * u, '#C9A45A');
    });
    ctx.save(); ctx.strokeStyle = '#2A2018'; ctx.lineWidth = Math.max(1, 1.6 * u);   // the film loop between the reels
    ctx.beginPath(); ctx.moveTo(bx - 17 * u - 15 * u, py0 - 24 * u); ctx.quadraticCurveTo(bx - 30 * u, py0 + 6 * u, bx - 8 * u, py0 + 4 * u); ctx.moveTo(bx + 19 * u + 13 * u, py0 - 22 * u); ctx.quadraticCurveTo(bx + 30 * u, py0 + 6 * u, bx + 8 * u, py0 + 4 * u); ctx.stroke(); ctx.restore();
  }

  // ---------- shot 3 · the hope: look inside, read the parts, understand the machine; then the town cinema ----------
  function hope(t, lt, dur) {
    const a = cs('nr_hope'), tm = wt('nr_hope', 'mechanistic'), tlk = wt('nr_hope', 'Look'), trd = wt('nr_hope', 'Read'), tun = wt('nr_hope', 'Understand'), tnw = wt('nr_hope', 'network'), tcl = wt('nr_hope', 'clean'), e = ce('nr_hope'), end = chapStart('ch02');
    // projector in the square at (0, 380); bedsheet screen at (0, ROWZ(2) + 40), 300 wide, bottom at y 70
    const SZ = ROWZ(2) + 40, PZ = 640;
    camKeys3(t, [[a - .5, -150, 220, 950, 1550, 1150], [tm, 150, 60, 560, 900, 900], [tlk, 280, 60, 520, 480, 560], [trd + .6, 260, 70, 520, 460, 540], [tun + .3, -60, 30, 620, 440, 430], [tun + 1.6, 0, 110, SZ, 720, 400], [end + 2.5, 0, 118, SZ, 690, 392]]);
    table(t);
    const beam = seg(t, tun + 1.1, e + .2), flick = .85 + .15 * hash(Math.floor(t * 24));
    // Clawd with a magnifier: looks inside a house, reads its windows, then walks back along the street in front of row 1
    // and up into the square to switch the projector on. He is drawn inside the town, at his own depth, so the
    // houses in front of him hide him like any other toy on the table.
    // (the square is open from x -255 to 50 in row 1; the projector's crate spans x -88..8, so he ends up at its left)
    const W0 = tun - .9, W1 = tun + .35, W2 = tun + 1;   // west along the street (z 500), then up into the square
    const walk = stroll(t, a, tlk - .3, 240, 330, 1);
    const wx = t < W0 ? walk.x : t < W1 ? lerp(330, -150, easeInOut(seg(t, W0, W1))) : -150, wz = t < W0 ? lerp(470, 500, seg(t, tlk - .3, W0)) : t < W1 ? 500 : lerp(500, 700, easeInOut(seg(t, W1, W2)));
    const walking = (t > a && t < tlk - .3) || (t > W0 && t < W2), side = t > W0 && t < W1;
    const [cx, cy, ck] = P(wx, 0, wz);
    const drawClawd = () => tourist(cx, cy, 8 * ck, 'safari', { ...emotions(t, [[a - 1, 'excited'], [tlk, 'thinking'], [trd, 'idea'], [W2 + .1, 'proud'], [e, 'excited']]), view: side ? 'side' : t > W1 && t < W2 ? 'qback' : 'q', flip: t > W0 && t < W1, walk: walking ? t * 2.4 : undefined, aR: t < W0 ? 1.1 : t > W2 ? .5 + .5 * Math.sin(Math.PI * seg(t, W2, W2 + .5)) : undefined, armR: t < W0 ? (u, sw) => { inkLine([[0, 0], [u * 1.2, 0]], sw * 2, '#7A5B3E', 'ink', 0); ctx.save(); ctx.strokeStyle = '#C99A45'; ctx.lineWidth = u * .4; ctx.beginPath(); ctx.arc(u * 2.4, 0, u * 1.2, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); ctx.restore(); } : undefined, boilKey: 'c1hope' });
    const inSquare = wz > 530;   // on the street he stands between rows 0 and 1; in the square nothing stands in front of him
    town(t, q => q.feat === 'curveB' ? .3 + .7 * on(t, trd - .2, e + .4) : q.feat ? .25 + .1 * Math.sin(t * 2 + q.x) : 0, { between: r => {
      if (r === 0 && !inSquare) drawClawd();
      if (r !== 2) return;
      // the bedsheet screen on two poles, in the square
      for (const sx of [-170, 170]) poly([[sx - 6, 0, SZ], [sx + 6, 0, SZ], [sx + 6, 270, SZ], [sx - 6, 270, SZ]], '#7A5233');
      const S = poly([[-160, 70, SZ], [160, 70, SZ], [160, 262, SZ], [-160, 262, SZ]], mixCol('#F4F1E8', '#FFFFFF', beam * flick), { line: '#B9AF99', lw: 2 });
      for (let i = 0; i < 5; i++) { const xx = lerp(S[0][0], S[1][0], (i + .5) / 5); ctx.save(); ctx.strokeStyle = 'rgba(160,150,130,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xx, S[2][1]); ctx.quadraticCurveTo(xx + 6 * Math.sin(t + i), (S[0][1] + S[2][1]) / 2, xx, S[0][1]); ctx.stroke(); ctx.restore(); }
      if (beam > 0) leader(t, S, beam, flick, tcl, end);
    } });
    // the projector: a 1930s film projector on a crate in the square, seen from behind, its lens aimed at the sheet
    // lights down for the picture: the town dims, except the sheet, so the beam reads
    if (beam > 0) { const S0 = [P(-160, 262, SZ), P(160, 262, SZ), P(160, 70, SZ), P(-160, 70, SZ)]; ctx.save(); resetMatrix(); ctx.fillStyle = `rgba(18,20,44,${.5 * beam})`; ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.moveTo(S0[0][0], S0[0][1]); S0.slice(1).forEach(q => ctx.lineTo(q[0], q[1])); ctx.closePath(); ctx.fill('evenodd'); ctx.restore(); }
    projector(t, -40, PZ, beam, flick, SZ);
    if (inSquare) drawClawd();
    // words
    // the three words, laid out by their measured widths so they never collide, centred as one line
    const words = [['look inside', tlk], ['read the parts', trd], ['understand the machine', tun]], FS = 54, GAP = 70;
    ctx.save(); ctx.font = `${FS}px "Permanent Marker"`; const ws = words.map(([w]) => ctx.measureText(w).width * 1.06); ctx.restore();   // measured in the lettering's own face
    let wx0 = 960 - (ws.reduce((p, q) => p + q, 0) + GAP * 2) / 2;
    words.forEach(([w, ta], i) => {
      const cxw = wx0 + ws[i] / 2, fade = 1 - seg(t, tnw - .2, tnw + .3);
      title(w, cxw, 170, FS, '#3A2A1A', seg(t, ta - .2, ta + .6), { stroke: '#FFF6E2', strokeW: .12, alpha: fade });
      if (i) title('·', wx0 - GAP / 2, 170, FS, '#3A2A1A', seg(t, ta - .3, ta), { stroke: '#FFF6E2', strokeW: .12, alpha: fade });
      wx0 += ws[i] + GAP;
    });
    // the word the whole film is about
    if (t > tcl - .4) title('clean', 960, 200, 150, '#FFF6E2', seg(t, tcl - .3, tcl + .4), { stroke: '#3A2A1A', strokeW: .1, alpha: 1 - seg(t, end - .4, end + .2) });
    if (t > tnw - .3 && t < tcl + .5) hand('a network you can read like that…', 960, 262, 60, '#3A2A1A', seg(t, tnw - .3, tnw + 1.2), { stroke: '#FFF6E2', strokeW: .14, alpha: 1 - seg(t, tcl - .4, tcl) });
    if (t < tlk) title('mechanistic interpretability', 960, 170, 80, '#3A2A1A', seg(t, tm - .3, tm + 1.2), { stroke: '#FFF6E2', strokeW: .12, alpha: 1 - seg(t, tlk - .6, tlk - .1) });
    if (t > tun + 1 && t < tun + 2.5) sfx('click!', P(30, 150, PZ)[0], P(30, 150, PZ)[1], 52, PAL.berry, t - tun - 1.1, { life: 1.1 });
    fxTiltShift(300, 820, 9);
  }

  shots([[chapStart('ch01'), detector], [cs('nr_layers') - .5, districts], [cs('nr_hope') - .5, hope]]);
})();
