// ch14 The lab of the future: a 1960s WORLD'S FAIR POSTER that comes alive panel by panel. The postcard's back from
// the globe is the hero panel (the Laboratory of Tomorrow: a network tower with porthole neurons, hundreds of tiny robot
// scientists labelling them); side panels print in for AGENTS and ARCHITECTURES and their giant plugs meet; every
// window lights, a twin tower for rerunnable experiments; one lonely scientist, then a flood of them; the bitter lesson
// (one clever contraption vs a field of thousands: the field wins); four beacons: ONE PRINCIPLE · IT WORKS · IT
// COMPOUNDS · MAYBE ENOUGH; and a leaf from the poster's garden drifts loose toward the jungle.
(() => {
  const CH = chapStart('ch14'), NEXT = chapStart('ch15');
  const SERIF = '"DejaVu Serif"', KAL = '"Kalam"';
  const PAPERC_ = '#F1E3C6', ORA = '#F2B04A', ORA_D = '#E8862A', TEAL = '#2E6A6A', TEAL_D = '#1A3A3A', MINT = '#9FE3C8', RED = '#C8402A', CLAY = '#D97757';
  const T = (s, x, y, size, col, o = {}) => { if ((o.alpha ?? 1) <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(o.alpha ?? 1); txt(s, x, y, size, col, { font: o.font || SERIF, weight: o.weight || '900', ...o }); ctx.restore(); };
  // a caption on a cream plate (so it reads over the robot crowd), in screen space
  function plateL(s, x, y, size, col, o = {}) {
    const a = (o.alpha ?? 1) * (o.reveal != null ? clamp(o.reveal * 3) : 1) * (o.pop != null ? clamp(o.pop * 2) : 1);
    if (a > .01) { ctx.save(); resetMatrix(); ctx.font = `${size}px "Permanent Marker"`; const tw = ctx.measureText(s).width, pad = size * .55, rv = o.reveal != null ? clamp(o.reveal) : 1; ctx.globalAlpha = .92 * a; flat(rrPts(x - tw / 2 - pad, y - size * .72, tw * rv + 2 * pad, size * 1.44, size * .4), '#FFF6E0', { line: TEAL_D, lw: 5 }); ctx.restore(); }
    letter(s, x, y, size, col, { face: 'marker', shadow: false, screen: true, ...o });
  }
  // poster layout in world units: A hero (the ch13 poster), B agents, C architectures, D the field, E beacons + garden
  const PA = [960, 0, 1920, 1080], PB = [0, 0, 960, 1080], PC = [2880, 0, 960, 1080], PD = [0, 1080, 2240, 1080], PE = [2240, 1080, 1600, 1080];
  const IMGS = ['blog/raw/v-figure-10x/p47742', 'blog/raw/v-figure-10x/c4d201d', 'blog/raw/v-figure-10x/p10704', 'blog/raw/v-figure-10x/pTrain34', 'blog/raw/negative-poles-v2/toucans-positive-1', 'blog/raw/negative-poles-v2/broccoli-positive-1', 'blog/raw/negative-poles-v2/lighthouses-positive-1', 'blog/raw/negative-poles-v2/wolves-positive-2', 'blog/raw/negative-poles-v2/taxis-positive-2', 'blog/raw/negative-poles-v2/spoonbills-positive-1', 'blog/raw/v-figure-10x/pPool13', 'blog/raw/negative-poles-v2/pretzels-positive-1', 'blog/raw/umbrella-circuit/b17-797-ex1', 'blog/raw/v-figure-10x/n1158528', 'blog/raw/negative-poles-v2/cats-positive-2', 'blog/raw/v-figure-10x/n750219'];
  const TS = .86;   // the hero tower's scale: five floors stop just under OF TOMORROW
  const LABELS = ['cat', 'car', 'dog', 'train', 'toucan', 'broccoli', 'lighthouse', 'wolf', 'taxi', 'spoonbill', 'pool table', 'pretzel', 'bee', 'clock', 'cat', 'mastiff'];

  // ---------- the poster's pieces ----------
  // an unprinted panel: blank paper with a pencil layout grid (nothing of it shows before its moment); it prints in as k goes 0 → 1 (a wipe of ink)
  function panel(R, k, draw, t, ghost = 0) {
    const [x, y, w, h] = R;
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.fillStyle = PAPERC_; ctx.fillRect(x, y, w, h);
    if (k < 1 && ghost > 0) { ctx.save(); ctx.globalAlpha = ghost; ctx.filter = 'grayscale(.85) sepia(.35)'; draw(x, y, w, h); ctx.restore(); ctx.fillStyle = 'rgba(241,227,198,.4)'; ctx.fillRect(x, y, w, h); }   // a faint proof of what will print here
    if (k < 1) { ctx.strokeStyle = 'rgba(120,100,70,.18)'; ctx.lineWidth = 2; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(x + i * w / 6, y); ctx.lineTo(x + i * w / 6, y + h); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y + i * h / 6); ctx.lineTo(x + w, y + h * i / 6); ctx.stroke(); } }
    if (k > 0) { ctx.save(); ctx.beginPath(); const r = Math.hypot(w, h) * easeInOut(k); ctx.arc(x + w / 2, y + h / 2, r, 0, TAU); ctx.clip(); draw(x, y, w, h); ctx.restore(); }
    ctx.restore();
    ctx.strokeStyle = TEAL_D; ctx.lineWidth = 10; ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
  }
  function sunburst(cx, cy, n, rot, col, r = 2400) { ctx.fillStyle = col; for (let i = 0; i < n; i++) { const a0 = i / n * TAU + rot, a1 = a0 + .5 / n * TAU; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r); ctx.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r); ctx.closePath(); ctx.fill(); } }
  // a tiny robot scientist; s scale, ph walk phase, o.clip clipboard, o.lit head light
  function bot(x, y, s, ph, o = {}) {
    const b = Math.abs(Math.sin(ph * TAU)) * 4;
    ctx.save(); ctx.translate(x, y - b * s); ctx.scale(s * (o.flip ? -1 : 1), s);
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, b + 2, 18, 4, 0, 0, TAU); ctx.fill();
    flat(rectPts(-11, -8, 7, 10), TEAL_D); flat(rectPts(4, -8, 7, 10), TEAL_D);
    flat(rrPts(-15, -34, 30, 28, 6), o.col || CLAY, { line: TEAL_D, lw: 2 });
    flat(ellPts(0, -40, 12, 10, 14), '#E9E4D6', { line: TEAL_D, lw: 2 }); dot(-4, -41, 2.4, TEAL_D); dot(4, -41, 2.4, TEAL_D);
    ctx.strokeStyle = TEAL_D; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, -50); ctx.lineTo(0, -58); ctx.stroke(); dot(0, -60, 4, o.lit ? '#FFE08A' : ORA_D);
    if (o.clip) { flat(rectPts(12, -30, 14, 18), '#FFFFFF', { line: TEAL_D, lw: 1.5 }); }
    ctx.restore();
    if (o.lit) glow(x, y - 60 * s, 18 * s, '#FFE08A', .6);
  }
  // the network tower: floors of porthole windows; n floors built; lit 0..1; labels 0..1 (tags stuck on windows)
  function tower(cx, base, s, t, o = {}) {
    const floors = o.floors ?? 5, lit = o.lit ?? .3, lab = o.labels ?? 0, fh = 130 * s, w = 300 * s;
    ctx.save();
    if (o.ghost) ctx.globalAlpha = o.ghost;
    flat([[cx - w * .62, base], [cx - w / 2, base - 60 * s], [cx + w / 2, base - 60 * s], [cx + w * .62, base]], TEAL_D);
    for (let f = 0; f < floors; f++) {
      const y = base - 60 * s - (f + 1) * fh, k = clamp((o.build ?? floors) - f);
      if (k <= 0) continue;
      ctx.save(); ctx.translate(cx, y + fh); ctx.scale(1, backOut(k)); ctx.translate(-cx, -(y + fh));
      flat(rectPts(cx - w / 2, y, w, fh + 2), f % 2 ? TEAL : '#347878', { line: TEAL_D, lw: 4 });
      for (let c = 0; c < 2; c++) {
        const i = (f * 2 + c) % IMGS.length, wx = cx + (c ? 1 : -1) * w * .23, wy = y + fh / 2, r = 46 * s, L = clamp(lit * 1.6 - (f * 2 + c) / 12 * .6 + .1 * Math.sin(t * 2 + i));
        if (L > .2) glow(wx, wy, r * 2.4, '#FFE08A', .5 * L);
        dot(wx, wy, r + 6 * s, '#B9C0CE'); ctx.save(); ctx.beginPath(); ctx.arc(wx, wy, r, 0, TAU); ctx.clip(); const I = img(IMGS[i]), sq = Math.min(I.width, I.height); ctx.globalAlpha = .35 + .65 * L; ctx.drawImage(I, (I.width - sq) / 2, (I.height - sq) / 2, sq, sq, wx - r, wy - r, 2 * r, 2 * r); ctx.restore();
        ctx.strokeStyle = TEAL_D; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.arc(wx, wy, r + 6 * s, 0, TAU); ctx.stroke();
        const lk = clamp(lab * 12 - (f * 2 + c)); if (lk > 0) { const b = backOut(clamp(lk)); ctx.save(); ctx.translate(wx + (c ? 1 : -1) * r * 1.5, wy - r * .6); ctx.rotate((c ? 1 : -1) * .12); ctx.scale(b, b); flat(rrPts(-56 * s, -18 * s, 112 * s, 36 * s, 6 * s), '#FFF6E0', { line: RED, lw: 2.5 * s }); T(LABELS[i], 0, 2 * s, 22 * s, RED, { font: KAL, weight: '700' }); ctx.restore(); }
      }
      ctx.restore();
    }
    const top = base - 60 * s - Math.min(floors, o.build ?? floors) * fh;
    flat(ellPts(cx, top, w * .62, 34 * s, 30), TEAL_D); flat(ellPts(cx, top - 10 * s, w * .46, 22 * s, 30), MINT);
    glow(cx, top - 14 * s, 140 * s, MINT, .5 + .3 * Math.sin(t * 3));
    ctx.restore();
    return top;
  }
  function plug(x, y, s, col, dir, label) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
    flat(rrPts(-220, -50, 220, 100, 24), col, { line: TEAL_D, lw: 6, shadow: [8, 10, 'rgba(0,0,0,.25)'] });
    flat(rectPts(0, -32, 60, 16), '#B9C0CE', { line: TEAL_D, lw: 3 }); flat(rectPts(0, 16, 60, 16), '#B9C0CE', { line: TEAL_D, lw: 3 });
    for (let i = 0; i < 3; i++) flat(rectPts(-190 + i * 30, -50, 10, 100), 'rgba(0,0,0,.15)');
    ctx.restore();
    if (label) T(label, x - dir * 110 * s, y + 90 * s, 44 * s, TEAL_D);
  }
  function cable(P, w, col, k = 1) { const C = through(P, 12), n = Math.max(2, Math.round(C.length * clamp(k))); ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = TEAL_D; ctx.lineWidth = w + 10; ctx.beginPath(); C.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); return C; }

  // ---------- the panels ----------
  // A: the Laboratory of Tomorrow (matches the back of the last postcard)
  function heroA(t, o = {}) {
    panel(PA, 1, (x, y, w, h) => {
      sunburst(x + w / 2, y + h * .5, 36, o.alive ? t * .03 : 0, ORA);
      dot(x + w / 2, y + h * .5, 260, ORA_D);
      if (o.flash > 0) glow(x + w / 2, y + h * .5, 900, '#FFF6D8', o.flash);
      flat(rectPts(x, y + h * .82, w, h * .18), TEAL);
      { const [lx, ty] = CAM ? toScreen(x + w / 2 - 520, y + 30) : [0, 999], [rx] = CAM ? toScreen(x + w / 2 + 520, y + 30) : [W]; const ta = clamp(Math.min(ty - 80, lx - 80, W - 80 - rx) / 40); if (ta > 0) { T('THE LABORATORY', x + w / 2, y + 90, 100, TEAL_D, { alpha: ta }); T('OF TOMORROW', x + w / 2, y + 180, 70, RED, { alpha: ta }); } }
      if (o.inner) o.inner(x, y, w, h);
    }, t);
  }
  // B: AGENTS — capable robots built for other reasons
  function agentsB(t, k, act) {
    panel(PB, k, (x, y, w, h) => {
      ctx.fillStyle = '#E9D3A9'; ctx.fillRect(x, y, w, h); sunburst(x + w / 2, y + h * .62, 24, t * .02 * act, '#F2C77A', 1400);
      flat(rectPts(x, y + h * .8, w, h * .2), '#C8402A');
      T('AGENTS', x + w / 2, y + 110, 96, TEAL_D);
      T('built for other reasons', x + w / 2, y + 190, 40, RED, { font: KAL, weight: '700' });
      // a big agent robot doing chores: typing, carrying parcels
      const bx = x + w / 2, by = y + h * .8, bob = Math.sin(t * 4 * act) * 6;
      flat(rectPts(bx - 34, by - 70, 26, 70), TEAL_D); flat(rectPts(bx + 8, by - 70, 26, 70), TEAL_D);
      flat(rrPts(bx - 120, by - 320 + bob, 240, 250, 30), TEAL, { line: TEAL_D, lw: 6 });
      flat(ellPts(bx, by - 380 + bob, 90, 70, 30), '#E9E4D6', { line: TEAL_D, lw: 6 }); dot(bx - 30, by - 384 + bob, 12, TEAL_D); dot(bx + 30, by - 384 + bob, 12, TEAL_D);
      ctx.strokeStyle = TEAL_D; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bx, by - 450 + bob); ctx.lineTo(bx, by - 500 + bob); ctx.stroke(); dot(bx, by - 506 + bob, 14, '#FFE08A'); glow(bx, by - 506 + bob, 60, '#FFE08A', .6);
      flat(rrPts(bx - 70, by - 260 + bob, 140, 90, 10), '#1A3A3A'); for (let i = 0; i < 3; i++) flat(rectPts(bx - 56, by - 246 + bob + i * 26, 60 + 40 * frac(t * act * (1 + i * .3)), 12), MINT);
      // arms: one types on a laptop, one carries a parcel
      const ty = Math.sin(t * 16 * act) * 6;
      ctx.lineCap = 'round'; ctx.strokeStyle = TEAL_D; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(bx - 120, by - 240 + bob); ctx.lineTo(bx - 200, by - 160 + ty); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx + 120, by - 240 + bob); ctx.lineTo(bx + 210, by - 300 + bob); ctx.stroke();
      flat([[bx - 300, by - 120], [bx - 160, by - 120], [bx - 140, by - 160], [bx - 280, by - 160]], '#B9C0CE', { line: TEAL_D, lw: 4 });
      flat(rectPts(bx + 160, by - 380 + bob, 120, 90), '#C9A06B', { line: TEAL_D, lw: 4 }); flat(rectPts(bx + 210, by - 380 + bob, 20, 90), '#E9D3A9');
    }, t);
  }
  // C: ARCHITECTURES — built because they learn well
  function archC(t, k, act) {
    panel(PC, k, (x, y, w, h) => {
      ctx.fillStyle = '#CFE6D8'; ctx.fillRect(x, y, w, h); sunburst(x + w / 2, y + h * .62, 24, -t * .02 * act, '#B8E0CC', 1400);
      flat(rectPts(x, y + h * .8, w, h * .2), TEAL);
      T('ARCHITECTURES', x + w / 2, y + 110, 76, TEAL_D);
      T('built because they learn well', x + w / 2, y + 190, 40, RED, { font: KAL, weight: '700' });
      // a stack of glowing layers with light flowing up through it
      const cx = x + w / 2, by = y + h * .8;
      for (let i = 0; i < 6; i++) { const ly = by - 80 - i * 95, lw = 520 - i * 40, on = .5 + .5 * Math.sin(t * 3 * act - i * .8); flat([[cx - lw / 2, ly], [cx - lw / 2 + 40, ly - 60], [cx + lw / 2 + 40, ly - 60], [cx + lw / 2, ly]], mixCol(TEAL, MINT, on * act), { line: TEAL_D, lw: 5 }); for (let j = 0; j < 6; j++) dot(cx - lw / 2 + 60 + j * (lw - 60) / 6 + 20, ly - 30, 9, on * act > .5 ? '#FFE08A' : TEAL_D); }
      if (act > 0) for (let i = 0; i < 8; i++) { const f = frac(t * .5 + i / 8); glow(cx + Math.sin(i * 2.3) * 160, by - 80 - f * 560, 26, '#FFE08A', act * (1 - f)); }
    }, t);
  }
  // D: the field — a lonely scientist, then thousands; the clever contraption vs the field
  function fieldD(t, k, o = {}) {
    panel(PD, k, (x, y, w, h) => {
      ctx.fillStyle = '#F6D9A0'; ctx.fillRect(x, y, w, h); sunburst(x + w * .7, y + h * .5, 30, t * .015, '#F2C77A', 2000);
      flat([[x, y + h * .58], [x + w * .3, y + h * .52], [x + w * .7, y + h * .56], [x + w, y + h * .5], [x + w, y + h], [x, y + h]], '#7EA85A');
      flat([[x, y + h * .72], [x + w * .5, y + h * .66], [x + w, y + h * .7], [x + w, y + h], [x, y + h]], '#5E8A44');
      if (o.inner) o.inner(x, y, w, h);
    }, t, o.ghost || 0);
  }
  // E: four beacons on a hill, and a garden along the bottom
  function beaconsE(t, k, o = {}) {
    panel(PE, k, (x, y, w, h) => {
      ctx.fillStyle = lgrad(0, y, 0, y + h, [[0, '#1E2A5A'], [.6, '#6A5A8A'], [1, '#F0A080']]); ctx.fillRect(x, y, w, h);
      for (let i = 0; i < 40; i++) dot(x + hash(i * 3.1) * w, y + hash(i * 7.7) * h * .4, 2 + 2 * hash(i), '#FFF2C8', .7);
      flat([[x, y + h * .78], [x + w * .25, y + h * .6], [x + w * .5, y + h * .56], [x + w * .75, y + h * .6], [x + w, y + h * .74], [x + w, y + h], [x, y + h]], TEAL_D);
      if (o.inner) o.inner(x, y, w, h);
      // the garden band at the bottom
      flat(rectPts(x, y + h * .86, w, h * .14), '#3E7A4A');
      for (let i = 0; i < 16; i++) { const gx = x + 40 + i * (w - 80) / 15, gy = y + h * .9, sw = Math.sin(t * 1.2 + i) * .08; ctx.save(); ctx.translate(gx, gy); ctx.rotate(sw); for (let j = 0; j < 3; j++) { ctx.save(); ctx.rotate((j - 1) * .6); flat(ellPts(0, -50, 16, 50, 16), ['#5EA85A', '#8AC86A', '#3E8A4A'][(i + j) % 3], { line: TEAL_D, lw: 2 }); ctx.restore(); } ctx.restore(); if (i % 3 === 1) { dot(gx, gy - 100, 16, ['#E8862A', '#C8402A', '#F2B04A'][i % 3]); dot(gx, gy - 100, 6, '#FFF6E0'); } if (i % 4 === 2) rLeaf(gx, gy - 40, 70, -1.2 + sw, 'heart', '#E8A02A'); }
    }, t, o.ghost || 0);
  }
  const BEAC = [['ONE PRINCIPLE', 'principle'], ['STUDYING WORKS', 'works'], ['IT COMPOUNDS', 'compounds'], ['MAYBE ENOUGH', 'maybe']];
  // a searchlight tower: a tapering steel lattice on a footing, a gallery rail, and a lamp drum whose beam sweeps the sky
  function beacon(x, base, s, k, t, label, fadeOut = 0, ly = base + 70 * s) {
    const L = clamp(k), hy = base - 300 * s, a = -Math.PI / 2 + Math.sin(t * .8 + x) * .25;
    if (L > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, hy, 10, x, hy, 1500); g.addColorStop(0, `rgba(255,236,170,${.55 * L})`); g.addColorStop(.5, `rgba(255,226,150,${.22 * L})`); g.addColorStop(1, 'rgba(255,220,140,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x + Math.cos(a + Math.PI / 2) * 22 * s, hy + Math.sin(a + Math.PI / 2) * 22 * s); ctx.lineTo(x + Math.cos(a - .1) * 1500, hy + Math.sin(a - .1) * 1500); ctx.lineTo(x + Math.cos(a + .1) * 1500, hy + Math.sin(a + .1) * 1500); ctx.lineTo(x + Math.cos(a - Math.PI / 2) * 22 * s, hy + Math.sin(a - Math.PI / 2) * 22 * s); ctx.closePath(); ctx.fill(); ctx.restore(); glow(x, hy, 220 * s * L, '#FFE08A', L); }
    flat(rrPts(x - 52 * s, base - 14 * s, 104 * s, 18 * s, 4 * s), '#6A6A7A', { line: TEAL_D, lw: 3 });
    const lx = f => 40 * s * (1 - f) + 14 * s * f, ys = f => base - f * 250 * s;
    ctx.strokeStyle = TEAL_D; ctx.lineWidth = 7 * s; ctx.lineJoin = 'round'; ctx.beginPath(); for (const sd of [-1, 1]) { ctx.moveTo(x + sd * lx(0), ys(0)); ctx.lineTo(x + sd * lx(1), ys(1)); } ctx.stroke();
    ctx.strokeStyle = '#B9C0CE'; ctx.lineWidth = 4 * s; ctx.stroke();
    ctx.strokeStyle = '#8A92A2'; ctx.lineWidth = 2.5 * s; ctx.beginPath(); for (let i = 0; i < 5; i++) { const f0 = i / 5, f1 = (i + 1) / 5; ctx.moveTo(x - lx(f0), ys(f0)); ctx.lineTo(x + lx(f1), ys(f1)); ctx.moveTo(x + lx(f0), ys(f0)); ctx.lineTo(x - lx(f1), ys(f1)); ctx.moveTo(x - lx(f1), ys(f1)); ctx.lineTo(x + lx(f1), ys(f1)); } ctx.stroke();
    flat(rectPts(x - 34 * s, base - 262 * s, 68 * s, 10 * s), '#6A6A7A', { line: TEAL_D, lw: 3 });
    ctx.strokeStyle = TEAL_D; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(x - 34 * s, base - 262 * s); ctx.lineTo(x - 34 * s, base - 280 * s); ctx.lineTo(x + 34 * s, base - 280 * s); ctx.lineTo(x + 34 * s, base - 262 * s); ctx.stroke();
    // the lamp drum, turned toward its beam
    ctx.save(); ctx.translate(x, hy); ctx.rotate(a + Math.PI / 2); flat(rrPts(-30 * s, -16 * s, 60 * s, 40 * s, 8 * s), '#3A4A5A', { line: TEAL_D, lw: 3 }); flat(ellPts(0, -16 * s, 28 * s, 9 * s, 20), L > .5 ? '#FFF6D0' : '#8A8A9A', { line: TEAL_D, lw: 3 }); flat(rectPts(-6 * s, 24 * s, 12 * s, 16 * s), '#3A4A5A', { line: TEAL_D, lw: 2 }); ctx.restore();
    if (L > 0 && fadeOut < 1 && label) { const b = backOut(clamp(L * 1.5)); ctx.save(); ctx.globalAlpha *= 1 - fadeOut; ctx.translate(x, ly); ctx.scale(b, b); ctx.font = `900 ${27 * s}px ${SERIF}`; const hw = ctx.measureText(label).width / 2 + 16 * s; flat(rrPts(-hw, -30 * s, 2 * hw, 60 * s, 10 * s), RED, { line: TEAL_D, lw: 4 }); T(label, 0, 2, 27 * s, '#FFF6E0'); ctx.restore(); }
  }
  // the clever contraption: a riveted steel frame on splayed legs carrying meshed gears, a hopper on top, a pressure
  // gauge, and two levers on pivots ending in a knob and a pair of pliers; it strains, rattles and smokes
  function contraption(x, y, s, t, strain) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const ST = '#B9C0CE', STD = '#8A92A2', L = { line: TEAL_D, lw: 4 }, sh = strain > .6 ? Math.sin(t * 40) * 2 * (strain - .6) : 0;
    ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 4, 190, 16, 0, 0, TAU); ctx.fill();
    ctx.translate(sh, 0);
    // legs, feet, beams and cross-bracing
    for (const sd of [-1, 1]) { flat([[sd * 150, 0], [sd * 116, -270], [sd * 98, -270], [sd * 128, 0]], ST, L); flat(rrPts(sd * 139 - 28, -12, 56, 14, 4), STD, L); }
    ctx.strokeStyle = STD; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-122, -40); ctx.lineTo(108, -250); ctx.moveTo(122, -40); ctx.lineTo(-108, -250); ctx.stroke();
    for (const by of [-276, -62]) { flat(rectPts(-138, by - 14, 276, 26), ST, L); for (let i = 0; i < 9; i++) dot(-122 + i * 30.5, by - 1, 3.5, TEAL_D); }
    // meshed gears on axles, each with spokes, a hub and a bolt
    for (const [gx, gy, r, sp] of [[-58, -168, 62, 1], [44, -196, 44, -1.4], [92, -118, 34, 1.8]]) {
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(t * sp * (1 - .8 * strain) + (strain > .6 ? Math.sin(t * 40) * .1 : 0));
      const P = [], nT = Math.round(r / 6); for (let i = 0; i < nT; i++) { const a = i / nT * TAU, d = TAU / nT; for (const [da, rr] of [[0, r], [d * .18, r * 1.17], [d * .45, r * 1.17], [d * .63, r]]) P.push([Math.cos(a + da) * rr, Math.sin(a + da) * rr]); }
      const G = flat(P, '#D6A94E', L); ctx.save(); ctx.clip(G); ctx.fillStyle = 'rgba(255,240,200,.25)'; ctx.beginPath(); ctx.arc(-r * .3, -r * .3, r * .8, 0, TAU); ctx.fill(); ctx.restore();
      for (let k = 0; k < 4; k++) { ctx.save(); ctx.rotate(k / 4 * TAU + .4); flat(ellPts(r * .55, 0, r * .17, r * .13, 12), '#9A7430', { line: TEAL_D, lw: 2 }); ctx.restore(); }
      dot(0, 0, r * .3, '#9A7430'); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, TAU); ctx.stroke(); dot(0, 0, r * .11, TEAL_D);
      ctx.restore();
    }
    // the hopper on top
    flat([[-50, -360], [50, -360], [16, -292], [-16, -292]], ST, L); flat(rrPts(-58, -372, 116, 16, 6), STD, L); flat(rectPts(-16, -294, 32, 22), STD, L);
    // the pressure gauge, its needle climbing with the strain
    dot(-86, -102, 24, '#FFF6E0'); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-86, -102, 24, 0, TAU); ctx.stroke();
    { const na = -Math.PI * .85 + strain * Math.PI * .75 + (strain > .6 ? Math.sin(t * 30) * .12 : 0); ctx.strokeStyle = RED; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-86, -102); ctx.lineTo(-86 + Math.cos(na) * 18, -102 + Math.sin(na) * 18); ctx.stroke(); dot(-86, -102, 4, TEAL_D); }
    // two levers on pivots: a knob, and pliers that snap open and shut
    const lv = Math.sin(t * 6) * (1 - .5 * strain);
    for (const [py, len, a0, tipK] of [[-140, 120, -.55 + .14 * lv, 0], [-86, 130, -.18 - .12 * lv, 1]]) {
      ctx.save(); ctx.translate(124, py); ctx.rotate(a0); flat(rrPts(-6, -7, len, 14, 6), STD, L);
      if (!tipK) { dot(len, 0, 16, RED); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(len, 0, 16, 0, TAU); ctx.stroke(); dot(len - 5, -5, 4, '#FFD0C0'); }
      else { const op = .2 + .2 * Math.abs(Math.sin(t * 7)); for (const sd of [-1, 1]) { ctx.save(); ctx.translate(len - 4, 0); ctx.rotate(sd * op); flat([[0, -5 * sd], [44, -2 * sd], [48, 6 * sd], [0, 6 * sd]], ST, { line: TEAL_D, lw: 3 }); ctx.restore(); } }
      ctx.restore(); dot(124, py, 9, ORA_D); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(124, py, 9, 0, TAU); ctx.stroke();
    }
    ctx.restore();
    // smoke when it strains: overlapping puffs with a lit top and an outline, rising and spreading from the hopper
    if (strain > .3) for (let i = 0; i < 7; i++) {
      const f = frac(t * .45 + i / 7), a = clamp((strain - .3) * 1.6) * Math.sin(f * Math.PI), r = (18 + 46 * f) * s, sx = x + (6 * Math.sin(i * 2.1) + f * 70 + 20 * Math.sin(t * 1.3 + i)) * s, sy = y + (-380 - f * 260) * s;
      if (a <= .01) continue; ctx.save(); ctx.globalAlpha = a; const C = new Path2D(); for (const [px, py, pr] of [[0, 0, 1], [-.7, .35, .7], [.7, .3, .75], [0, .45, .8], [.35, -.45, .6]]) { C.moveTo(sx + px * r + pr * r, sy + py * r); C.arc(sx + px * r, sy + py * r, pr * r, 0, TAU); }
      ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(40,50,60,.55)'; ctx.stroke(C); ctx.fillStyle = lgrad(0, sy - r, 0, sy + r, [[0, '#D9DCE2'], [1, '#8A8E98']]); ctx.fill(C);
      ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(sx - r * .25, sy - r * .35, r * .35, r * .18, -.3, 0, TAU); ctx.fill(); ctx.restore();
    }
  }

  // the whole poster, one call; o: which panels are printed / alive, extra inner drawings
  function poster(t, o = {}) {
    agentsB(t, o.b ?? 0, o.bAct ?? 0); archC(t, o.c ?? 0, o.cAct ?? 0);
    fieldD(t, o.d ?? 0, { inner: o.dInner, ghost: o.dGhost }); beaconsE(t, o.e ?? 0, { inner: o.eInner, ghost: o.eGhost });
    heroA(t, { alive: o.alive, flash: o.flash, inner: o.aInner });
  }
  function camRects(t, keys, drift = 1) { const v = kf(t, keys.map(k => [k[0], [k[1], k[2], k[3]]]), easeInOut), z = W / v[2]; camBegin(v[0] + v[2] / 2 + drift * 6 * Math.sin(t * .31), v[1] + v[2] * H / W / 2 + drift * 4 * Math.sin(t * .23 + 1), z); }
  // a prop in Clawd's right hand, drawn in front of him (the q view paints that arm, and its armR hook, behind the body)
  const inHand = (aR, prop, level = 1) => (u, sw) => { push(); translate((5 + .55 * clamp((Math.abs(aR) - .7) / .9)) * u, -4.5 * u); rotate(-aR); translate(2.2 * u, 0); rotate(aR * level); prop(u, sw); pop(); };
  // half a lemon, cut face out, with a leaf: the bitter lesson, tasted
  const lemon = (u, sw) => { flat(ellPts(u * .6, -u * .9, u * 1.5, u * 1.1, 22), '#F2D04A', { line: TEAL_D, lw: 2 }); flat(ellPts(u * .7, -u * .9, u * 1.05, u * .8, 20), '#FFF3A8', { line: '#D9B030', lw: 1.5 }); ctx.strokeStyle = '#E8C23A'; ctx.lineWidth = Math.max(1, u * .12); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; ctx.beginPath(); ctx.moveTo(u * .7, -u * .9); ctx.lineTo(u * .7 + Math.cos(a) * u * .9, -u * .9 + Math.sin(a) * u * .7); ctx.stroke(); } flat(ellPts(u * .2, -u * 2.1, u * .7, u * .3, 12, 0, -.5), '#5EA85A', { line: TEAL_D, lw: 1.5 }); };
  const visitor = (t, x, y, u, keys, o = {}) => tourist(x, y, u, 'helmet', { ...emotions(t, keys), view: 'q', ...o });
  // the robot crowd marching across the hero's ground
  function march(t, x, y, w, rows, k, o = {}) { for (let r = 0; r < rows; r++) for (let i = 0; i < 40; i++) { if (hash(i * 3.7 + r) > k) continue; const bx = x + frac((i * 50 + r * 25) / w + t * (o.speed ?? .02)) * w, by = y + r * 46; bot(bx, by, .9 + r * .18, t * 2 + i * .3, { clip: (i + r) % 3 === 0, lit: o.lit && (i + r) % 2 === 0 }); } }

  // ---------- 1 · the laboratory of automated scientists ----------
  function lab(t, lt, dur) {
    const a = cs('lf_lab'), tLa = wt('lf_lab', 'laboratory'), tWa = wt('lf_lab', 'watching'), tLe = wt('lf_lab', 'learns'), tLb = wt('lf_lab', 'labeling'), tFi = wt('lf_lab', 'finding'), tTe = wt('lf_lab', 'testing'), tAg = wt('lf_lab', 'again', 0), tAi = wt('lf_lab', 'AI'), tSe = wt('lf_lab', 'sentences'), e = ce('lf_lab');
    const alive = seg(t, a - .5, a + 1);
    camKeys(t, [[CH, 1920, 540, 1], [CH + 1.6, 1920, 540, 1], [CH + 2.5, 1900, 560, 1.04], [tLa - .7, 1910, 560, 1.04], [tLa + .3, 1920, 640, 1.25], [tWa, 1920, 560, 1.1], [tLb, 1980, 520, 1.3], [tTe, 1920, 540, 1.05], [e + .6, 1920, 540, 1.0]], alive * .5);
    poster(t, { alive: alive > 0, aInner: (x, y, w, h) => {
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = TEAL_D; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h * .42 + i * 110, 240 - i * 40, 46, alive * Math.sin(t + i) * .05, 0, TAU); ctx.stroke(); }
      const grow = seg(t, tWa - .4, tLe + .8);
      tower(x + w / 2, y + h * .82, TS, t, { floors: 5, build: lerp(3, 5, grow), lit: .2 + .6 * seg(t, tLb - .5, tAg), labels: seg(t, tLb - .3, tFi + .6) });
      march(t, x + 60, y + h * .86, w - 120, 3, seg(t, tLa - .6, tLa + .8), { lit: t > tTe });
      // testing, again and again: little ticks spark over the windows
      if (t > tTe - .3) for (let i = 0; i < 5; i++) { const f = frac(t * .9 + i / 5), wx = x + w / 2 + (i % 2 ? 70 : -70), wy = y + h * .82 - 120 - (i % 5) * 130; ctx.save(); ctx.globalAlpha = 1 - f; ctx.translate(wx + (i % 2 ? 60 : -60), wy - f * 40); ctx.strokeStyle = '#3A8A4A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-12, 0); ctx.lineTo(-3, 10); ctx.lineTo(14, -12); ctx.stroke(); ctx.restore(); }
      visitor(t, x + w * .82, y + h * .84, 12, [[CH, 'happy'], [tLa, 'excited'], [tLb, 'starstruck'], [tTe, 'proud']], { flip: true });
    } });
    camEnd();
    if (t > tFi - .3) plateL('label · find patterns · test · again', 960, 960, 66, TEAL_D, { reveal: seg(t, tLb - .3, tAg + .4) });
    if (t > tAi - .3 && t < tWa - .1) plateL('AI agents, like the ones that wrote the test sentences', 960, 960, 54, TEAL_D, { reveal: seg(t, tAi - .3, tSe + .3), alpha: 1 - seg(t, tWa - .5, tWa - .1) });
    GRAIN = 1; PAPER = false;
  }

  // ---------- 2 · AGENTS + ARCHITECTURES: plug one into the other ----------
  function plugs(t, lt, dur) {
    const a = cs('lf_plug'), tPi = wt('lf_plug', 'pieces'), tAg = wt('lf_plug', 'agents'), tMo = wt('lf_plug', 'Modern'), tBo = wt('lf_plug', 'Both'), tIn = wt('lf_plug', 'interpretability'), tSo = wt('lf_plug', 'So'), tPl = wt('lf_plug', 'plug'), e = ce('lf_plug');
    const bK = seg(t, tAg - 1.4, tAg - .2), cK = seg(t, tMo - 1.2, tMo + .7), join = easeInOut(seg(t, tSo - .2, tPl + .05)), surge = seg(t, tPl + .05, tPl + 1.4);
    camRects(t, [[t - lt, 960, 0, 1920], [tAg - .5, 0, 0, 1920], [tAg + .2, 0, 0, 1920], [tMo, 1920, 0, 1920], [tMo + 1.6, 1920, 0, 1920], [tBo, 30, 0, 3780], [tSo, 50, 0, 3740], [e + .6, 70, 0, 3700]], .4);
    poster(t, { b: bK, bAct: bK, c: cK, cAct: cK, d: 0, e: 0, dGhost: .7 * seg(t, tBo - 1, tBo), eGhost: .7 * seg(t, tBo - 1, tBo), dInner: (x, y, w, h) => { for (let r = 0; r < 4; r++) for (let i = 0; i < 26; i++) bot(x + 860 + i * 52 + (r % 2) * 26, y + h * .6 + r * 56, 1 + r * .12, 0, {}); }, eInner: (x, y, w, h) => { BEAC.forEach((b_, i) => beacon(x + w * (.14 + i * .24), y + h * (.62 - Math.sin((i + .5) / 4 * Math.PI) * .05), 1.1, 0, t, '')); }, alive: true, flash: surge * (1 - surge) * 3, aInner: (x, y, w, h) => {
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = TEAL_D; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h * .42 + i * 110, 240 - i * 40, 46, Math.sin(t + i) * .05, 0, TAU); ctx.stroke(); }
      tower(x + w / 2, y + h * .82, TS, t, { floors: 5, lit: .4 + .6 * surge, labels: 1 });
      march(t, x + 60, y + h * .86, w - 120, 3, 1, { lit: surge > 0 });
    } });
    // both make interpretability easier: little magnifiers pop on both panels
    for (const [px, i] of [[480, 0], [3360, 1]]) { const k = popk(t, tIn - .4 + i * .2, .4) * (1 - seg(t, tSo - .4, tSo)); if (k > 0) { ctx.save(); ctx.translate(px + 280, 300); ctx.scale(backOut(k) * 1.4, backOut(k) * 1.4); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, 0, 50, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(159,227,200,.6)'; ctx.fill(); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(36, 36); ctx.lineTo(90, 90); ctx.stroke(); ctx.restore(); } }
    // the cables and the giant plugs
    if (bK > .6 && cK > .6) {
      const ck = seg(t, tBo - .6, tBo + .6), px = lerp(1300, 1840, join), qx = lerp(2540, 2000, join), py = 960;
      cable([[600, 820], [700, 1060], [1000, 1000], [px - 380, py]], 56, '#3A3550', ck);
      cable([[3240, 820], [3140, 1060], [2840, 1000], [qx + 380, py]], 56, RED, ck);
      if (ck > .9) { plug(px, py, 1.8, TEAL, 1, null); plug(qx, py, 1.8, ORA_D, -1, null); for (const [s1, lx] of [['AGENTS', px - 300], ['ARCHITECTURES', qx + 380]]) { ctx.font = `900 80px ${SERIF}`; const hw = ctx.measureText(s1).width / 2 + 40; flat(rrPts(lx - hw, py + 92, 2 * hw, 116, 18), PAPERC_, { line: TEAL_D, lw: 6, shadow: [8, 10, 'rgba(0,0,0,.25)'] }); T(s1, lx, py + 152, 80, TEAL_D); } }
      if (surge > 0 && surge < 1) { for (let i = 0; i < 16; i++) { const q = i / 16 * TAU, f = easeOut(surge); glow(1920 + Math.cos(q) * 600 * f, py + Math.sin(q) * 400 * f, 40, '#FFF2C8', 1 - surge); } }
    }
    visitor(t, 2790, 1070, 16, [[t - lt, 'happy'], [tPi, 'thinking'], [tSo, 'determined'], [tPl + .1, 'excited']], { flip: true });
    camEnd();
    if (t > tPl - .1 && t < tPl + 1.2) sfx('CLICK!', 960, 400, 90, RED, t - tPl, { stroke: '#FFF6E0', strokeW: .12 });
    if (t < tAg - 1.4) letter('the pieces already exist', 960, 948, 72, TEAL_D, { face: 'marker', shadow: false, screen: true, stroke: '#FFF6E0', strokeW: .12, reveal: seg(t, tPi - .5, tPi + .5) });
    if (t > tBo - .3 && t < tSo) plateL('both make interpretability easier', 960, 900, 66, TEAL_D, { reveal: seg(t, tBo - .3, tIn + .6), alpha: 1 - seg(t, tSo - .4, tSo) });
    GRAIN = 1; PAPER = false;
  }

  // ---------- 3 · the best laboratory in natural science; never enough scientists — now we do ----------
  function lab2(t, lt, dur) {
    const a = cs('lf_lab2'), tRe = wt('lf_lab2', 'read'), tEx = wt('lf_lab2', 'experiment'), tId = wt('lf_lab2', 'identical'), tBe = wt('lf_lab2', 'best'), tNe = wt('lf_lab2', 'never'), tSc = wt('lf_lab2', 'scientists'), tNo = wt('lf_lab2', 'Now'), e = ce('lf_lab2');
    const twin = easeOut(seg(t, tEx - .2, tId + .4)), flood = seg(t, tNo - .3, e + .6);
    camKeys(t, [[t - lt, 1920, 775, .7], [tRe, 1920, 540, 1.0], [tId + .4, 1920, 540, 1.0], [tBe + .8, 1920, 605, .88], [tNe - .2, 1920, 605, .88], [tNe + .8, 1120, 1620, 1.0], [e + .6, 1120, 1620, 1.0]], .4);
    poster(t, { b: 1, bAct: 1, c: 1, cAct: 1, d: seg(t, tNe - .6, tNe + .5), e: 0, alive: true, aInner: (x, y, w, h) => {
      for (let i = 0; i < 3; i++) { ctx.strokeStyle = TEAL_D; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x + w / 2, y + h * .42 + i * 110, 240 - i * 40, 46, Math.sin(t + i) * .05, 0, TAU); ctx.stroke(); }
      if (twin > 0) { tower(x + w / 2 + 380 * twin, y + h * .82, .8, t, { floors: 5, lit: 1, labels: 1, ghost: .85 * twin }); if (twin > .8) T('= identical copy', x + w / 2 + 380, y + 196, 52, TEAL_D, { font: KAL, weight: '700', alpha: clamp((twin - .8) * 5) * (1 - seg(t, tBe - .5, tBe - .2)) }); }
      tower(x + w / 2 - 20 * twin, y + h * .82, TS, t, { floors: 5, lit: seg(t, a - .3, tRe + .4), labels: 1 });
      march(t, x + 60, y + h * .86, w - 120, 3, 1, { lit: true });
      // the ribbon banner
      const bk = seg(t, tBe - .4, tBe + .4); if (bk > 0) { ctx.save(); ctx.translate(x + w / 2, y + 300); ctx.scale(backOut(bk), backOut(bk)); flat([[-700, -60], [700, -60], [660, 0], [700, 60], [-700, 60], [-660, 0]], RED, { line: TEAL_D, lw: 5, shadow: [8, 10, 'rgba(0,0,0,.25)'] }); T('THE BEST LABORATORY IN NATURAL SCIENCE', 0, 4, 44, '#FFF6E0'); ctx.restore(); }
    }, dInner: (x, y, w, h) => {
      // one lonely scientist and a long queue of neurons waiting to be read; then a flood
      const qx = x + 300, qy = y + h * .74;
      for (let i = 0; i < 14; i++) { const r = 34, wx = qx + 140 + i * 110, wy = qy - 40; dot(wx, wy, r + 5, '#B9C0CE'); ctx.save(); ctx.beginPath(); ctx.arc(wx, wy, r, 0, TAU); ctx.clip(); const I = img(IMGS[i % IMGS.length]), sq = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - sq) / 2, (I.height - sq) / 2, sq, sq, wx - r, wy - r, 2 * r, 2 * r); ctx.restore(); }
      bot(qx, qy, 2.4, t * (flood > 0 ? 2 : .4), { clip: true, lit: true });
      if (t > tNe - .2 && flood <= 0) { ctx.save(); ctx.globalAlpha = seg(t, tNe - .2, tNe + .3); T('…', qx + 70, qy - 190, 80, TEAL_D); ctx.restore(); }
      for (let i = 0; i < 260; i++) { const k = clamp(flood * 1.4 - hash(i * 3.3) * .8); if (k <= 0) continue; const rx = x + 120 + hash(i * 1.7) * (w - 240), ry = y + h * .6 + hash(i * 5.1) * h * .34, sx = x - 200 + (rx - x) * .2; bot(lerp(sx, rx, easeOut(k)), ry, 1 + ry / (y + h) * .6, t * 2 + i, { clip: i % 3 === 0, lit: i % 2 === 0 }); }
    } });
    camEnd();
    if (t > tRe - .4 && t < tEx - .2) plateL('every neuron can be read', 960, 960, 68, TEAL_D, { reveal: seg(t, tRe - .4, tRe + .4) });
    if (t > tEx - .2 && t < tBe - .5) plateL('every experiment can be rerun', 960, 960, 68, TEAL_D, { reveal: seg(t, tEx - .2, tId + .3) });
    if (t > tNe + .7 && t < tNo - .2) letter('never enough scientists', 960, 200, 64, TEAL_D, { face: 'marker', shadow: false, screen: true, stroke: '#FFF6E0', strokeW: .12, reveal: seg(t, tNe + .7, tSc + .9) });   // after the camera has left the banner
    if (t > tNo - .2) letter('now we do', 960, 200, 90, RED, { face: 'marker', shadow: false, screen: true, stroke: '#FFF6E0', strokeW: .12, pop: seg(t, tNo - .2, tNo + .2) < 1 ? seg(t, tNo - .2, tNo + .2) : null });
    GRAIN = 1; PAPER = false;
  }

  // ---------- 4 · the bitter lesson: one clever contraption vs a field of thousands ----------
  function bitter(t, lt, dur) {
    const a = cs('lf_bitter'), tSi = wt('lf_bitter', 'simple'), tSca = wt('lf_bitter', 'scale'), tCl = wt('lf_bitter', 'clever'), tRi = wt('lf_bitter', 'Rich'), tBi = wt('lf_bitter', 'bitter'), tMa = wt('lf_bitter', 'Maybe'), tSc = wt('lf_bitter', 'scaling'), tBe = wt('lf_bitter', 'beats', 1), tIn = wt('lf_bitter', 'inventing'), tAp = wt('lf_bitter', 'apart'), e = ce('lf_bitter');
    const tB0 = wt('lf_bitter', 'beats'), strain = Math.max(seg(t, tIn - .5, tAp), .75 * env(t, tB0 - .1, tB0 + 1.6, .2, .6)), win = seg(t, tBe - .2, tBe + .6);
    camKeys(t, [[t - lt, 1120, 1620, 1.0], [tCl, 880, 1640, 1.1], [tRi, 1120, 1620, 1.0], [tSc, 1120, 1620, 1.0], [tBe, 1120, 1620, 1.0], [e + .6, 1120, 1620, 1.0]], .4);
    poster(t, { b: 1, c: 1, d: 1, e: 0, alive: true, aInner: (x, y, w, h) => { tower(x + w / 2, y + h * .82, TS, t, { floors: 5, lit: 1, labels: 1 }); }, dInner: (x, y, w, h) => {
      // the contraption on the left, a field of scientists on the right
      contraption(x + 420, y + h * .78, 1.4, t, strain);
      const fieldK = seg(t, tSca - 1, tSca + .6);
      for (let r = 0; r < 7; r++) for (let i = 0; i < 26; i++) { if (hash(i * 7.1 + r * 3) > fieldK) continue; const bx = x + 860 + i * 52 + (r % 2) * 26, by = y + h * .6 + r * 56; bot(bx, by, 1 + r * .12, t * 2 + i + r, { clip: (i + r) % 3 === 0, lit: win > .5 || (i * r) % 5 === 0 }); }
      if (win > 0) { glow(x + w * .72, y + h * .7, 700 * win, '#FFE08A', .6 * win); const k = backOut(win); ctx.save(); ctx.translate(x + w * .8 + 70, y + h * .43 - 30); ctx.scale(k, k); ctx.font = `900 54px ${SERIF}`; const br = ctx.measureText('WINS').width / 2 / .62 + 26; flat(starPts(0, 0, br, .66, 14), RED, { line: TEAL_D, lw: 5 }); flat(starPts(0, 0, br * .78, .8, 14), '#E0583E'); T('WINS', 0, 4, 54, '#FFF6E0'); ctx.restore(); }
      // the title band
      const tk = seg(t, tBi - .5, tBi + .3); if (tk > 0) { ctx.save(); ctx.translate(x + w / 2, y + 160); ctx.scale(backOut(tk), backOut(tk)); flat([[-560, -70], [560, -70], [520, 0], [560, 70], [-560, 70], [-520, 0]], TEAL, { line: TEAL_D, lw: 5 }); T('THE BITTER LESSON', 0, 4, 76, '#FFF6E0'); ctx.restore(); }
      if (t > tBi) T('— Rich Sutton', x + w / 2 + 380, y + 270, 44, RED, { font: KAL, weight: '700', alpha: seg(t, tBi, tBi + .5) });
      // the clever thing, named: a tag on "the clever thing", then what it is
      { const ck = seg(t, tCl - .3, tCl + .2) * (1 - seg(t, tIn - .8, tIn - .4)); if (ck > 0) { const b = backOut(ck); ctx.save(); ctx.translate(x + 640, y + h * .78 - 470); ctx.rotate(-.06 + .03 * Math.sin(t * 2)); ctx.scale(b, b); ctx.strokeStyle = TEAL_D; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-60, 30); ctx.lineTo(-170, 130); ctx.stroke(); ctx.font = `700 34px ${KAL}`; const hw = ctx.measureText('the clever thing').width / 2 + 24; flat(rrPts(-hw, -36, 2 * hw, 72, 12), '#FFF6E0', { line: TEAL_D, lw: 4 }); T('the clever thing', 0, 2, 34, TEAL_D, { font: KAL, weight: '700' }); ctx.restore(); } }
      if (t > tIn - .4) { const ak = seg(t, tIn - .4, tIn + .2); T('clever ways to', x + 700, y + h * .78 - 500, 40, TEAL_D, { font: KAL, weight: '700', alpha: ak }); T('take networks apart', x + 700, y + h * .78 - 454, 40, TEAL_D, { font: KAL, weight: '700', alpha: ak }); }
      // a lemon for the visitor: it really is bitter
      const lk = env(t, tBi - .2, tMa + .4, .3, .3);
      const lA = lerp(.3, 1.25, lk); visitor(t, x + 760, y + h * .9, 14, [[t - lt, 'thinking'], [tBi + .1, 'disgusted'], [tMa + .4, 'thinking'], [tBe, 'excited']], { aR: lA, draw: lk > .1 ? inHand(lA, lemon) : null });
    } });
    camEnd();
    if (t < tRi - .3) letter('the simple thing, at enormous scale,\nbeats the clever thing', 960, 200, 60, TEAL_D, { face: 'marker', shadow: false, screen: true, stroke: '#FFF6E0', strokeW: .12, reveal: seg(t, tSi - .3, tCl + .4) });
    if (t > tSc - .3) plateL('scaling ordinary investigation', 960, 530, 66, TEAL_D, { reveal: seg(t, tSc - .3, tSc + .9) });
    GRAIN = 1; PAPER = false;
  }

  // ---------- 5 · four beacons; a leaf drifts loose from the garden ----------
  function steps(t, lt, dur) {
    const a = cs('lf_steps'), e = ce('lf_steps'), TB = BEAC.map(([s, w]) => wt('lf_steps', w)), tNe = wt('lf_steps', 'need');
    const leafT0 = tNe - .6, lf = seg(t, leafT0, NEXT + 1.6);
    const ex = PE[0], ey = PE[1], ew = PE[2], eh = PE[3];
    const lx = lerp(ex + ew * .7, ex + ew * .5, ease(lf)) + Math.sin(lf * 9) * 60 * (1 - lf), ly = lerp(ey + eh * .82, ey + eh * .46, easeOut(lf)) + Math.sin(lf * 5) * 30;
    camKeys(t, [[t - lt, 1120, 1620, 1.0], [a + .5, 2080, 1560, .7], [a + 1.5, 3040, 1620, 1.2], [TB[3] + 1, 3040, 1620, 1.22], [leafT0, 3040, 1620, 1.22], [NEXT + 2.2, lx, ly, 3.4]], .3);
    poster(t, { b: 1, c: 1, d: 1, e: seg(t, a - .2, a + 1.1), alive: true, aInner: (x, y, w, h) => { tower(x + w / 2, y + h * .82, TS, t, { floors: 5, lit: 1, labels: 1 }); }, dInner: (x, y, w, h) => { for (let r = 0; r < 5; r++) for (let i = 0; i < 26; i++) bot(x + 860 + i * 52 + (r % 2) * 26, y + h * .6 + r * 56, 1 + r * .12, t * 2 + i + r, { lit: true }); contraption(x + 420, y + h * .78, 1.4, t, .9); }, eInner: (x, y, w, h) => {
      BEAC.forEach(([lab], i) => { const bx = x + w * (.14 + i * .24), base = y + h * (.62 - Math.sin((i + .5) / 4 * Math.PI) * .05); beacon(bx, base, 1.1, seg(t, TB[i] - .4, TB[i] + .3), t, lab, ease(seg(t, leafT0 - .3, leafT0 + .3)), y + h * .62 + 77 - h * .05 * Math.sin(1.5 / 4 * Math.PI)); });
      visitor(t, x + w * .5, y + h * .84, 11, [[t - lt, 'happy'], [TB[1], 'excited'], [TB[3], 'hopeful'], [leafT0 + .4, 'surprised']], { flip: lf > .3 });
    } });
    // the leaf from the garden, drifting loose toward the next world
    if (lf > 0) { glow(lx, ly, 120, '#FFF2C8', .4 * lf); rLeaf(lx - 45, ly, 90, Math.sin(t * 2.2) * .5 + lf * 1.5, 'heart', '#E8A02A'); }
    camEnd();
    { const hk = seg(t, a + .2, a + .9) * (1 - seg(t, leafT0, leafT0 + .6)); if (hk > 0) letter("Nick's bet", 960, 150, 84, '#FFE08A', { face: 'marker', shadow: false, screen: true, stroke: TEAL_D, strokeW: .12, alpha: hk }); }
    GRAIN = 1; PAPER = false;
  }

  shots([[CH, lab], [cs('lf_plug') - .3, plugs], [cs('lf_lab2') - .3, lab2], [cs('lf_bitter') - .4, bitter], [cs('lf_steps') - .3, steps]]);
})();
