// ch10 The city of words — world: a POP-UP BOOK on a library desk (style frame 10). Language models are made of
// words, so the city is built of pages: every example is a new spread (a page turn), its neurons are cut-paper
// buildings that fold up off the page (windows show the words they fire for; basements are lift-the-flaps), and the
// mechanisms are paper devices: pull-tabs, volvelle dials, a paper river, bicycle couriers, a gatefold.
// Spreads: arrival (the taxi from the pixel city parks on a page) · 2023 · today (100 paper people) · the
// preeclampsia hub · Santa in the basements · the wallet route (gatefold) · plumbing (− × −) · experts (a dragon) ·
// the residual-stream river · couriers (attention) · the "don't end the sentence yet" neuron · the page tears out and
// folds into a dart (next world: the darts broadcast).
(() => {
  const C = { wall: '#3A2A2A', paper: '#F3EBDC', paper2: '#E9DFCA', fold: '#D9CFB9', line: '#C9BFA9', ink: '#3A2A2A', red: '#D2473F', orange: '#E87A5A', yellow: '#F2C14E', blue: '#7EB5D6', green: '#A4C97A', pink: '#E8A0B4', lilac: '#C9A0D0', navy: '#3A5A8A', gold: '#F0BE46', violet: '#7B5CA8', cover: '#7A2A2A', grey: '#B8B2A6', teal: '#5FA8A0', brown: '#8C5A3A', cream: '#FFF6D0' };
  const SERIF = 'serif', HANGUL = '"WenQuanYi Zen Hei"';
  const ps = (s, x, y, size, col = C.ink, o = {}) => txt(s, x, y, size, col, { font: o.font || SERIF, weight: o.weight || '700', ...o });
  const SH = [6, 8, 'rgba(40,24,16,.32)'];

  // ---------- the library and the book ----------
  function library(t) {
    layer('c10lib', () => {
      ctx.fillStyle = lgrad(0, -300, 0, 1400, [[0, '#2A1E1E'], [.5, '#3A2A2A'], [1, '#4A3426']]); ctx.fillRect(-500, -400, W + 1000, H + 900);
      const SP = ['#8C2A2A', '#2A4A6A', '#6A5A2A', '#3A5A3A', '#5A3A5A', '#7A4A2A', '#2A3A5A'];
      for (let r = 0; r < 4; r++) {
        const y0 = -220 + r * 230;
        for (let i = 0; i < 70; i++) { const x = -480 + i * 44 + (r % 2) * 18, h = 150 + 50 * hash(i + r * 9), w = 30 + 14 * hash(i * 3 + r); flat(rectPts(x, y0 + (200 - h), w, h), mixCol(SP[(i * 3 + r) % 7], '#1A1010', .25)); if (hash(i * 7 + r) > .6) flat(rectPts(x + 4, y0 + (200 - h) + 20, w - 8, 6), 'rgba(240,200,120,.35)'); }
        flat(rectPts(-500, y0 + 200, W + 1000, 24), '#5A3A26'); flat(rectPts(-500, y0 + 224, W + 1000, 8), '#2A1A12');
      }
      // the desk
      ctx.fillStyle = lgrad(0, 880, 0, 1400, [[0, '#6A4026'], [1, '#3A2214']]); ctx.fillRect(-500, 900, W + 1000, 600);
      for (let i = 0; i < 12; i++) flat(rectPts(-500, 930 + i * 40, W + 1000, 3), 'rgba(30,16,8,.25)');
    }, { x: -500, y: -400, w: W + 1000, h: H + 900, res: .6, variants: 1 });
    // the reading lamp's warm pool and dust motes in it
    glow(1500, 120, 900, '#FFC27A', .32 + .02 * Math.sin(t * 2.1));
    for (let i = 0; i < 26; i++) { const x = 900 + hash(i * 3.1) * 1200 + 30 * Math.sin(t * .3 + i), y = frac(hash(i * 7.7) - t * .015 * (1 + hash(i))) * 900; dot(x, y, 1.5 + 2 * hash(i), '#FFE3B0', .35 + .3 * Math.sin(t * 2 + i)); }
  }
  // the open book: cover, two pages (far edge rising to the spine), printed lines; o.gate 0..1 unfolds side panels
  const PG = { l: 130, r: 1790, sp: 960, far: 690, spFar: 655, near: 1048 };
  function book(o = {}) {
    const g = ease(o.gate || 0), gl = PG.l - 820 * g, gr = PG.r + 820 * g;
    flat([[gl - 26, PG.far - 6], [PG.sp, PG.spFar - 14], [gr + 26, PG.far - 6], [gr + 30, PG.near + 22], [gl - 30, PG.near + 22]], C.cover, { shadow: [0, 26, 'rgba(0,0,0,.45)'] });
    if (g > .01) { flat([[gl, PG.far + 4], [PG.l, PG.far], [PG.l, PG.near], [gl, PG.near + 6]], C.paper2, { shadow: [6, 10, 'rgba(0,0,0,.3)'] }); flat([[PG.r, PG.far], [gr, PG.far + 4], [gr, PG.near + 6], [PG.r, PG.near]], C.paper2, { shadow: [6, 10, 'rgba(0,0,0,.3)'] }); }
    flat([[PG.l, PG.far], [PG.sp - 6, PG.spFar], [PG.sp - 6, PG.near], [PG.l, PG.near]], C.paper);
    flat([[PG.sp + 6, PG.spFar], [PG.r, PG.far], [PG.r, PG.near], [PG.sp + 6, PG.near]], C.paper);
    ctx.save(); ctx.fillStyle = lgrad(PG.sp - 70, 0, PG.sp + 70, 0, [[0, 'rgba(120,96,70,0)'], [.5, 'rgba(120,96,70,.35)'], [1, 'rgba(120,96,70,0)']]); ctx.fillRect(PG.sp - 70, PG.spFar, 140, PG.near - PG.spFar); ctx.restore();
    // page edges (the stack of pages under the spread)
    for (let q = 0; q < 3; q++) { flat(rectPts(PG.l, PG.near + 4 + q * 5, PG.sp - PG.l - 6, 3), C.fold); flat(rectPts(PG.sp + 6, PG.near + 4 + q * 5, PG.r - PG.sp - 6, 3), C.fold); }
    if (o.lines !== false) for (let i = 0; i < 7; i++) { const y = 960 + i * 12; if (y > PG.near - 8) break; }
  }
  // a page turning over the spread (right to left), lt 0..dur
  function pageTurn(lt, dur = .9) {
    if (lt < 0 || lt >= dur) return; const k = easeInOut(lt / dur), xe = PG.sp + (PG.r - PG.sp) * Math.cos(Math.PI * k), lift = Math.sin(Math.PI * k);
    const tf = [xe, PG.far - 300 * lift], bf = [xe + 40 * lift * Math.sign(xe - PG.sp), PG.near - 90 * lift], sTop = [PG.sp, PG.spFar], sBot = [PG.sp, PG.near];
    const P = [sTop, [lerp(PG.sp, tf[0], .5), lerp(PG.spFar, tf[1], .5) - 40 * lift], tf, bf, [lerp(PG.sp, bf[0], .5), lerp(PG.near, bf[1], .5) - 20 * lift], sBot];
    flat(P, mixCol(C.paper, '#8A7A60', .04 + .3 * lift * (k < .5 ? 1 : .6)), { shadow: [k < .5 ? -30 * lift : 30 * lift, 20 * lift, 'rgba(40,24,16,.3)'] });
    if (lift > .05) { ctx.save(); ctx.globalAlpha = .5 * lift; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tf[0], tf[1]); ctx.lineTo(bf[0], bf[1]); ctx.stroke(); ctx.restore(); }
  }
  // pop-up timing in a spread that opens with a page turn: the right page rises first, then the left
  const kin = (lt, x) => { const a = x > PG.sp ? .45 : .85; return seg(lt, a, a + .5); };
  const kout = (lt, dur) => 1 - seg(lt, dur - .42, dur - .06);

  // ---------- pop-up pieces ----------
  // stand(x, y, k, w, draw): a piece hinged at its base line on the page; k folds it up (overshoot); a soft page shadow
  function stand(x, y, k, w, draw, o = {}) {
    if (k <= .01) return;
    const e = o.raw ? k : backOut(k);
    flat([[x - w / 2, y], [x + w / 2, y], [x + w / 2 + 34 * e, y + 12 * e], [x - w / 2 + 34 * e, y + 12 * e]], 'rgba(60,36,24,.22)');
    ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.max(.02, e)); draw(); ctx.restore();
    if (k < .98) flat(rectPts(x - w / 2, y - 2, w, 3), 'rgba(60,36,24,.4)');
  }
  // a paper building (drawn at the origin, base at y = 0): o.wins [{s, img, col, lit}], o.cols, o.sign, o.roof 'peak'|'flat'|'step'
  function pb(w, h, col, o = {}) {
    const roof = o.roof || 'peak', rh = roof === 'peak' ? w * .42 : roof === 'step' ? w * .2 : 0;
    const P = roof === 'peak' ? [[-w / 2, 0], [-w / 2, -h], [0, -h - rh], [w / 2, -h], [w / 2, 0]] : roof === 'step' ? [[-w / 2, 0], [-w / 2, -h], [-w * .25, -h], [-w * .25, -h - rh], [w * .25, -h - rh], [w * .25, -h], [w / 2, -h], [w / 2, 0]] : [[-w / 2, 0], [-w / 2, -h], [w / 2, -h], [w / 2, 0]];
    const lit = clamp(o.lit ?? 0);
    if (lit > .02) glow(0, -h * .55, Math.max(w, h) * .95, o.glowCol || '#FFD58A', .6 * lit);
    cutout(P, col, { jag: 2, shadow: SH });
    flat([[-w / 2, 0], [-w / 2, -h], [-w / 2 + 8, -h + 4], [-w / 2 + 8, 0]], 'rgba(0,0,0,.08)');
    const wins = o.wins || [], cols = o.cols || 1, pad = 14, cw = (w - pad * (cols + 1)) / cols, chh = o.winH || Math.min(cw * .62, 70), top = -h + (o.sign ? (o.signSize || 34) + 40 : 22);
    wins.forEach((wi, n) => {
      const cx = -w / 2 + pad + (n % cols) * (cw + pad), cy = top + Math.floor(n / cols) * (chh + pad), L = clamp(wi.lit ?? lit);
      flat(rectPts(cx - 4, cy - 4, cw + 8, chh + 8), mixCol(col, C.ink, .35));
      flat(rectPts(cx, cy, cw, chh), wi.bg || (L > .3 ? mixCol(C.cream, '#FFE9A0', L) : C.paper2));
      if (wi.img) { ctx.save(); ctx.globalAlpha = .55 + .45 * L; const I = img(wi.img), s = Math.min(I.width / cw, I.height / chh); ctx.drawImage(I, (I.width - cw * s) / 2, (I.height - chh * s) / 2, cw * s, chh * s, cx, cy, cw, chh); ctx.restore(); }
      if (wi.s) ps(wi.s, cx + cw / 2, cy + chh / 2 + 2, wi.size || Math.min(30, chh * .5), wi.col || C.ink, { font: wi.font || SERIF, weight: wi.weight || '700' });
      if (wi.draw) { ctx.save(); ctx.translate(cx + cw / 2, cy + chh / 2); wi.draw(cw, chh); ctx.restore(); }
      if (L > .3) glow(cx + cw / 2, cy + chh / 2, cw * .8, wi.glow || '#FFE08A', .35 * L);
    });
    if (o.sign) { const ss = o.signSize || 34; ctx.font = `700 ${ss}px ${SERIF}`; const sw = Math.max(w * .7, ctx.measureText(o.sign).width + 18); flat(rectPts(-sw / 2, -h + 10, sw, ss + 18), C.cream); ps(o.sign, 0, -h + 19 + ss / 2, ss, C.ink); }
    if (o.door !== false && h > 120) flat(rrPts(-w * .1, -Math.min(54, h * .22), w * .2, Math.min(54, h * .22) + 2, 8), mixCol(col, C.ink, .45));
  }
  // a paper person (origin at the feet): col body (two cols: two-tone), o.q shows a question mark, o.flip 0..1 card-flip
  function pp(s, col, o = {}) {
    const f = o.flip ?? 0, sx = Math.abs(Math.cos(f * Math.PI)) || .05;
    ctx.save(); ctx.scale(sx * s, s);
    const c2 = o.col2 || col;
    cutout([[-16, 0], [-14, -44], [0, -50], [14, -44], [16, 0]], col, { jag: 1.5, shadow: [4, 5, 'rgba(40,24,16,.25)'] });
    if (o.col2) cutout([[0, 0], [0, -50], [14, -44], [16, 0]], c2, { jag: 1, shadow: false });
    cutout(ellPts(0, -64, 13, 13, 14), o.skin || '#E9C9A6', { jag: 1.2, shadow: [3, 4, 'rgba(40,24,16,.2)'] });
    flat(rectPts(-6, -67, 3, 4), C.ink); flat(rectPts(3, -67, 3, 4), C.ink);
    ctx.restore();
    if (o.q) ps('?', 0, -96 * s, 34 * s, C.ink);
  }
  // a speech bubble (paper), centred at (x, y)
  function bubble(x, y, s, size, k, o = {}) {
    if (k <= .01) return; ctx.save(); ctx.translate(x, y); ctx.scale(backOut(k), backOut(k));
    ctx.font = `700 ${size}px ${o.font || SERIF}`; const w = ctx.measureText(s).width + size * 1.2, h = size * 1.8;
    cutout(rrPts(-w / 2, -h / 2, w, h, h * .4).concat([]), o.col || C.cream, { jag: 1.5, shadow: SH });
    cutout([[o.tail ?? -w * .2, h / 2 - 4], [(o.tail ?? -w * .2) - 10, h / 2 + 30], [(o.tail ?? -w * .2) + 24, h / 2 - 4]], o.col || C.cream, { jag: 1, shadow: false });
    ps(s, 0, 2, size, o.tcol || C.ink, { font: o.font || SERIF });
    ctx.restore();
  }
  // a placard on a stick (paper sign), base on the page at (x, y)
  function placard(x, y, s, col, k, size = 48, o = {}) {
    stand(x, y, k, 40, () => {
      ctx.font = `700 ${size}px ${SERIF}`; const w = Math.max(o.minW || 0, ctx.measureText(s).width + size), h = size * 1.6, top = -(o.stick ?? 120) - h;
      flat(rectPts(-5, -(o.stick ?? 120) - 4, 10, (o.stick ?? 120) + 4), C.brown);
      cutout(rectPts(-w / 2, top, w, h), col, { jag: 2, shadow: SH });
      ps(s, 0, top + h / 2 + 2, size, o.tcol || C.ink);
    });
  }
  // a gold paper thread from P0 through P1 to P2, drawn on with k
  function thread(P, k, col = C.gold, wdt = 9) {
    if (k <= .01) return; const Cc = through(P, 12), n = Math.max(2, Math.round(Cc.length * clamp(k)));
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(40,24,16,.25)'; ctx.lineWidth = wdt; ctx.beginPath(); Cc.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0] + 5, p[1] + 7) : ctx.moveTo(p[0] + 5, p[1] + 7)); ctx.stroke();
    ctx.strokeStyle = col; ctx.beginPath(); Cc.slice(0, n).forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = wdt * .3; ctx.setLineDash([14, 18]); ctx.lineDashOffset = -T * 60; ctx.stroke(); ctx.restore();
    if (col === C.gold) { const p = Cc[n - 1]; glow(p[0], p[1], 40, '#FFE08A', .7); }
  }
  // a paper pull-tab: a slot cut into the page at (x, y) with a strip coming out of it to the right, a rounded
  // finger-tab end and a printed arrow; k 0..1 pulls it out (at most 120 px more)
  function pullTab(x, y, k, label = 'pull') {
    const L = 150 + 120 * clamp(k), h = 34;
    flat(rrPts(x - 10, y - 6, 20, h + 12, 6), 'rgba(40,24,16,.55)');   // the slot
    cutout([[x, y], [x + L - h / 2, y], ...Array.from({ length: 9 }, (_, i) => { const q = -Math.PI / 2 + i / 8 * Math.PI; return [x + L - h / 2 + Math.cos(q) * h / 2, y + h / 2 + Math.sin(q) * h / 2]; }), [x, y + h]], C.red, { jag: 1, shadow: SH });
    flat(rectPts(x, y + h - 6, L - h / 2, 4), 'rgba(0,0,0,.12)');
    dot(x + L - h / 2, y + h / 2, 7, mixCol(C.red, C.ink, .45));
    ps(label, x + 50, y + h / 2 + 1, 24, C.paper);
    ctx.save(); ctx.strokeStyle = C.paper; ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; const ax = x + 92 + 10 * Math.sin(T * 4) * (1 - clamp(k)); ctx.beginPath(); ctx.moveTo(ax, y + h / 2); ctx.lineTo(ax + 30, y + h / 2); ctx.moveTo(ax + 20, y + h / 2 - 8); ctx.lineTo(ax + 30, y + h / 2); ctx.lineTo(ax + 20, y + h / 2 + 8); ctx.stroke(); ctx.restore();
    flat(rectPts(x - 12, y - 8, 12, h + 16), C.paper2);   // the page lip in front of the slot, so the strip goes into the page
  }
  // the lift-the-flap basement in front of a building: a hole on the page; the flap folds down toward us
  function flap(x, y, w, h, open, inner, col = C.navy) {
    const e = ease(open);
    flat(rectPts(x - w / 2, y, w, h), mixCol(col, C.ink, .45));
    if (e > .05) { ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y, w, h); ctx.clip(); inner && inner(x, y + h / 2, e); ctx.restore(); }
    const top = lerp(y, y + 2 * h, e), front = e < .5;
    flat([[x - w / 2 - 3, top], [x + w / 2 + 3, top], [x + w / 2 + 3, y + h], [x - w / 2 - 3, y + h]], front ? C.paper2 : mixCol(C.paper2, '#8A7A60', .25), { shadow: [3, 5, 'rgba(40,24,16,.25)'] });
    if (front && e < .3) { flat(rectPts(x - 10, top + (y + h - top) * .5 - 4, 20, 8), C.fold); }
  }
  function santaHat(x, y, s) { cutout([[x - 30 * s, y], [x + 30 * s, y], [x + 14 * s, y - 52 * s]], C.red, { jag: 1.5, shadow: [3, 4, 'rgba(0,0,0,.3)'] }); cutout(rectPts(x - 34 * s, y - 6 * s, 68 * s, 14 * s), '#FFFFFF', { jag: 1, shadow: false }); cutout(ellPts(x + 14 * s, y - 54 * s, 9 * s, 9 * s, 10), '#FFFFFF', { jag: 1, shadow: false }); }
  // a paper bicycle courier (origin at the ground), heading right; note text on the parcel
  function courier(s, t, note, col, lift = 0) {
    ctx.save(); ctx.scale(s, s);
    for (const wx of [-34, 34]) { ctx.save(); ctx.translate(wx, -24); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 22, 0, TAU); ctx.stroke(); ctx.rotate(t * 9); ctx.lineWidth = 1.5; for (let q = 0; q < 4; q++) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q * TAU / 4) * 20, Math.sin(q * TAU / 4) * 20); ctx.stroke(); } ctx.restore(); }
    ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-34, -24); ctx.lineTo(-6, -24); ctx.lineTo(18, -56); ctx.lineTo(-14, -56); ctx.lineTo(-34, -24); ctx.moveTo(-6, -24); ctx.lineTo(-14, -56); ctx.moveTo(18, -56); ctx.lineTo(34, -24); ctx.stroke();
    const ped = t * 9; cutout([[-20, -60], [-8, -96], [8, -96], [4, -60]], col, { jag: 1, shadow: false }); cutout(ellPts(-2, -110, 12, 12, 12), '#E9C9A6', { jag: 1, shadow: false }); cutout([[-14, -116], [10, -122], [14, -112], [-12, -108]], C.navy, { jag: 1, shadow: false });
    flat([[-8, -64], [-6 + 8 * Math.cos(ped), -36 + 8 * Math.sin(ped)], [-2 + 8 * Math.cos(ped), -34 + 8 * Math.sin(ped)], [0, -64]], C.ink);
    ctx.restore();
    if (note) { ctx.save(); ctx.translate(-4 * s, -142 * s - lift - 3 * Math.abs(Math.sin(t * 5))); ctx.strokeStyle = C.ink; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(4 * s, 18 * s); ctx.lineTo(10 * s, 40 * s); ctx.stroke(); glow(0, 0, 70 * s, '#FFE08A', .5); ctx.font = `700 ${22 * s}px ${SERIF}`; const w = ctx.measureText(note).width + 24 * s; cutout(rectPts(-w / 2, -18 * s, w, 36 * s), C.cream, { jag: 1, shadow: [4, 5, 'rgba(40,24,16,.3)'] }); ps(note, 0, 0, 22 * s); ctx.restore(); }
  }
  // Clawd the tourist in a beret, on the page
  const cl = (x, y, t, keys, o = {}) => tourist(x, y, o.u || 8, 'beret', { ...emotions(t, keys), view: 'q', flip: o.flip, boilKey: o.key || 'c10clawd', ...o.extra });
  // Clawd keeps a home spot at the right page's front corner; he hops when the page lifts under him, then walks to
  // where the spread needs him and back home before the next turn
  const HOME = [1650, 1005];
  function clS(t, lt, dur, x1, y1, keys, o = {}) {
    const t0 = t - lt, go = ease(seg(lt, 1.1, 2.3)), back = o.stay ? 0 : ease(seg(lt, dur - 1.7, dur - .7)), u = go * (1 - back);
    const x = lerp(HOME[0], x1, u), y = lerp(HOME[1], y1, u), moving = (lt > 1.1 && lt < 2.3 && Math.abs(x1 - HOME[0]) > 20) || (back > 0 && back < 1 && !o.stay && Math.abs(x1 - HOME[0]) > 20);
    const hop = jump(t, t0 + .12, t0 + .62, 80), dirLeft = lt < 3 ? x1 < HOME[0] : x1 > HOME[0];
    tourist(x, y + hop.dy, o.u || 7.5, o.hat || 'beret', { ...emotions(t, keys), ...(moving ? { view: 'side', walk: Math.abs(x - HOME[0]) / 30, flip: dirLeft } : { view: 'q', flip: o.flip }), sq: hop.sq, boilKey: o.key || 'c10clawd', ...o.extra });
  }
  // a caption: a cut-paper banner hung into the top of the frame on two strings (screen space, so it never sits on the
  // pop-ups and is never cropped). list: [[tIn, tOut, text, col?]]; o.x moves it sideways
  function caps(t, list, o = {}) {
    for (const [a, b, s, col] of list) {
      const k = on(t, a, b, .45, .35); if (k <= 0) continue;
      ctx.save(); resetMatrix(); ctx.font = `700 52px ${SERIF}`; const w = ctx.measureText(s).width + 70, h = 84, x = o.x ?? W / 2, y = lerp(-140, o.y ?? 92, backOut(k)) - (1 - k) * 20;
      ctx.translate(x, y); ctx.rotate(.012 * Math.sin(t * 1.3 + a));
      ctx.strokeStyle = 'rgba(30,20,14,.8)'; ctx.lineWidth = 3; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * w * .38, -h / 2); ctx.lineTo(sx * w * .38, -300); ctx.stroke(); }
      cutout(rectPts(-w / 2, -h / 2, w, h), col || C.cream, { jag: 2, shadow: [8, 10, 'rgba(0,0,0,.4)'] });
      for (const sx of [-1, 1]) flat(ellPts(sx * w * .38, -h / 2 + 10, 6, 6, 10), C.ink);
      ps(s, 0, 4, 52, C.ink); ctx.restore();
    }
  }
  // a printed heading on the page (world-native type)
  const heading = (s, x, y, size, k, col = C.ink) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k); ps(s, x, y, size, col); ctx.restore(); };
  // the knot, in paper colours
  const knotP = (x, y, s, o = {}) => knotBeast(x, y, s, { col: '#B48AD6', dark: C.violet, ...o });
  // camera that starts and ends on the full spread (so every page turn is seen whole)
  // all framings are authored for a 1920×1080 view of the spread and pushed in (the book fills the frame)
  const camB = (t, keys, drift = .5) => camKeys(t, keys.map(([tt, x, y, z]) => [tt, x, y + 120, z * 1.14]), drift);
  const camSpread = (t, a, b, mid, drift = .5) => camB(t, [[a, 960, 560, 1], [a + .9, 960, 560, 1], ...mid.map(k => [clamp(k[0], a + 1.2, b - .75), k[1], k[2], k[3]]).sort((p, q) => p[0] - q[0]), [b - .5, 960, 560, 1]], drift);


  // ---------- the three questions: introduced on arrival, then a small tracker in the corner for the whole chapter ----------
  const QS = [['cw_numbers', 'How many neurons can we read?', C.orange], ['cw_couriers', 'Can we follow its reasoning?', C.blue], ['cw_double', 'What about the leftover mess?', C.green]];
  const tThree = wt('cw_arrive', 'three'), qEnd = ce('cw_dot');
  function qCard(n, x, y, size, k, cur) {
    if (k <= 0) return; const [, label, col] = QS[n], s = `${n + 1}  ${label}`;
    ctx.save(); resetMatrix(); ctx.font = `700 ${size}px ${SERIF}`; const w = ctx.measureText(s).width + size * 1.6, h = size * 1.6;
    ctx.globalAlpha = clamp(k * 2) * (cur === false ? .55 : 1); ctx.translate(x + w / 2, y); ctx.scale(lerp(.6, 1, backOut(clamp(k))), lerp(.6, 1, backOut(clamp(k)))); ctx.rotate(.01 * Math.sin(n * 2.1));
    cutout(rectPts(-w / 2, -h / 2, w, h), C.cream, { jag: 2, shadow: [6, 8, 'rgba(0,0,0,.35)'] });
    flat(ellPts(-w / 2 + size * .8, 0, size * .55, size * .55, 18), col); ps(String(n + 1), -w / 2 + size * .8, 2, size * .8, C.cream);
    ps(label, -w / 2 + size * 1.55, 2, size, C.ink, { align: 'left' }); ctx.restore();
  }
  function qIntro(t) {   // on "three questions": the three cards are dealt onto the left page
    QS.forEach((q, n) => qCard(n, 110, 300 + n * 92, 44, on(t, tThree - .1 + n * .45, cs('cw_numbers') - .4, .45, .35)));
  }
  function qTag(t) {     // the tracker: the current question, bottom left, from its first word to the chapter's end
    const n = QS.reduce((m, q, i) => (t >= cs(q[0]) - .3 ? i : m), -1); if (n < 0) return;
    const k = on(t, cs(QS[n][0]) - .3, qEnd + .3, .5, .4); qCard(n, 40, 1028, 34, k);
  }
  const Qd = fn => (t, lt, dur) => { fn(t, lt, dur); qTag(t); };
  // the wrap-up: the three questions come back, each ticked as the narration answers it
  function qSum(t, tIn, tOut, ticks) {
    const k0 = on(t, tIn, tOut, .4, .35); if (k0 <= 0) return;
    ctx.save(); resetMatrix(); ctx.fillStyle = `rgba(30,18,12,${.6 * k0})`; ctx.fillRect(0, 0, W, H); ctx.restore();
    QS.forEach((q, n) => {
      const k = on(t, tIn + n * .25, tOut, .45, .35), size = 54, x = 330, y = 330 + n * 150; qCard(n, x, y, size, k);
      ctx.save(); resetMatrix(); ctx.font = `700 ${size}px ${SERIF}`; const w = ctx.measureText(`${n + 1}  ${q[1]}`).width + size * 1.6, tk = Math.min(popk(t, ticks[n] - .15, .4), k0);
      if (tk > 0) { ctx.translate(x + w + 80, y); ctx.scale(backOut(tk), backOut(tk)); ctx.rotate(-.08); cutout(ellPts(0, 0, 50, 50, 22), '#3A8A4A', { jag: 2, shadow: [5, 7, 'rgba(0,0,0,.35)'] }); ctx.strokeStyle = C.cream; ctx.lineWidth = 13; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-22, 2); ctx.lineTo(-6, 18); ctx.lineTo(24, -18); ctx.stroke(); }
      ctx.restore();
    });
  }

  // ================= arrival: the taxi parks on a page; the city of words pops up =================
  const A = { s: chapStart('ch10'), a: cs('cw_arrive'), tImg: wt('cw_arrive', 'Image'), tBut: wt('cw_arrive', 'but'), tLang: wt('cw_arrive', 'language', 1), tTalk: wt('cw_arrive', 'kind'), tPR: wt('cw_arrive', 'P'), tCol: wt('cw_arrive', 'Colorado') };
  const CITY = [[1080, 820, 130, 230, C.orange, 'once', 'peak'], [1250, 790, 120, 170, C.yellow, 'said', 'flat'], [1420, 830, 140, 270, C.blue, 'river', 'step'], [1590, 800, 120, 200, C.green, 'because', 'peak'], [1700, 860, 110, 150, C.pink, 'why', 'flat'], [1180, 930, 120, 140, C.lilac, 'if', 'peak']];
  function arriveShot(t, lt, dur) {
    const { s, a, tImg, tBut, tLang, tTalk, tPR, tCol } = A;
    library(t);
    camB(t, [[s, 900, 600, 1.06], [a, 900, 580, 1.02], [tBut, 1000, 560, 1.0], [tLang + .5, 1100, 540, 1.04], [cs('cw_numbers') - .9, 960, 560, 1]], .5);
    book();
    // the paper taxi drives in from the right and parks; Clawd hops out
    const tx = kf(t, [[s - .1, 2050], [s + 2.1, 760]], easeOut), tb = Math.max(0, t - (s + 2.1)), bounce = Math.exp(-6 * tb) * Math.sin(16 * tb) * 6;
    ctx.save(); ctx.translate(tx, 930 - Math.abs(bounce)); ctx.scale(-1.05, 1.05);
    flat(ellPts(0, 6, 76, 10, 16), 'rgba(40,24,16,.25)');
    cutout([[-70, 0], [-70, -34], [-40, -38], [-24, -64], [30, -64], [50, -38], [72, -32], [72, 0]], C.yellow, { jag: 2, shadow: [6, 8, 'rgba(0,0,0,.3)'] });
    cutout([[-18, -58], [24, -58], [38, -38], [-30, -38]], '#BFE6FF', { jag: 1, shadow: false }); flat(rectPts(-60, -26, 128, 8), '#1A1C2C'); for (let q = 0; q < 8; q++) flat(rectPts(-60 + q * 16, -26, 8, 8), '#F4F4F4');
    for (const wx of [-42, 44]) { cutout(ellPts(wx, 0, 17, 17, 14), '#1A1C2C', { jag: 1, shadow: false }); flat(ellPts(wx, 0, 6, 6, 8), '#94B0C2'); }
    flat(rectPts(-12, -76, 26, 12), '#1A1C2C'); flat(rectPts(-8, -74, 18, 8), '#F4F4F4');
    ctx.restore();
    if (t > s + 2.2 && t < s + 3.2) sfx('beep beep!', tx - 40, 820, 40, C.red, t - s - 2.2);
    // the image neuron (where we came from), as a framed photo on the left page
    const ki = popk(t, tImg - .2, .5) * (1 - ease(seg(t, tThree - .5, tThree + .1)));   // folds away for the three questions
    stand(420, 850, ki, 260, () => { flat(rectPts(-6, -60, 12, 60), C.brown); cutout(rectPts(-120, -300, 240, 240), C.cream, { jag: 2, shadow: SH }); const I = img('blog/raw/v-figure-10x/p47742'), sz = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, -104, -284, 208, 208); });
    if (ki > .5) heading('images', 420, 905, 40, ki);
    // the two language neurons met earlier (P R; Colorado) pop up as a reminder, and fold away at "But"
    const fk = 1 - ease(seg(t, tBut - .2, tBut + .3));
    stand(1230, 900, popk(t, tPR - .15, .5) * fk, 220, () => pb(200, 330, C.orange, { roof: 'peak', sign: 'P R', signSize: 40, wins: [{ s: 'pr' }, { s: 'cHJpbnQ=', font: 'monospace', size: 24 }, { s: 'প্রথম', font: '"FreeSans"', weight: '400', size: 38 }], cols: 1, winH: 54, lit: .8 }));
    stand(1560, 900, popk(t, tCol - .25, .5) * fk, 240, () => pb(220, 270, C.blue, { roof: 'flat', sign: 'Colorado', signSize: 36, wins: [{ s: 'west ,', size: 26 }, { s: 'Colorado ,', size: 26 }], cols: 1, winH: 54, lit: .8, glowCol: '#FFB13B' }));
    // the city of words rises on the right page, one building per beat
    CITY.forEach(([x, y, w, h, col, word, roof], n) => { const k = popk(t, tLang - .3 + n * .32, .55); stand(x, y, k, w, () => pb(w, h, col, { roof, sign: word, signSize: word.length > 5 ? 22 : 28, wins: [{}, {}], cols: 2, lit: .4 + .3 * Math.sin(t * 2 + n) ** 2 })); });
    // the kind of AI you talk to: a speech bubble from the city
    bubble(1450, 470, 'hello! how can I help?', 40, popk(t, tTalk - .2, .5), { tail: -60 });
    // Clawd hops out of the taxi and looks around
    const hop = jump(t, s + 2.7, s + 3.2, 60), wk = seg(t, tTalk + .2, cs('cw_numbers') - .35), cx = lerp(lerp(tx + 40, 880, ease(seg(t, s + 2.7, s + 3.2))), HOME[0], ease(wk)), cy = lerp(940, HOME[1], ease(wk));
    if (t > s + 2.6) cl(cx, cy + hop.dy, t, [[s, 'happy'], [s + 3.2, 'excited'], [tBut, 'surprised'], [tLang, 'happy'], [tTalk, 'laugh']], { u: 7.5, extra: { sq: hop.sq, ...(wk > 0 && wk < 1 ? { view: 'side', walk: (cx - 880) / 30 } : {}) } });
    camEnd();
    qIntro(t);
    title('language models', 1180, 150, 84, C.paper, seg(t, Math.max(tLang - .1, s + 4.9), Math.max(tLang - .1, s + 4.9) + 1), { shadow: false });
    GRAIN = .8;
  }

  // ================= 2023: a hundred paper people, almost none understood =================
  const N0 = { a: cs('cw_numbers'), tNone: wt('cw_numbers', 'none'), tUnd: wt('cw_numbers', 'understandable'), tOAI: wt('cw_numbers', 'OpenAI'), tTwo: wt('cw_numbers', 'two'), tMod: wt('cw_numbers', 'modern'), tQ: wt('cw_numbers', 'Kwen'), t90: wt('cw_numbers', 'ninety'), tJob: wt('cw_numbers', 'job'), t7: wt('cw_numbers', 'Seven'), tRel: wt('cw_numbers', 'related'), tOnly: wt('cw_numbers', 'Only'), tYet: wt('cw_numbers', 'yet') };
  const CROWD = Array.from({ length: 100 }, (_, n) => { const r = Math.floor(n / 20), c = n % 20, sc = .9 + r * .08, x = 210 + c * 78 + (r % 2) * 36 + (hash(n) - .5) * 14, y = 728 + r * 44; return { n, x, y, sc, kind: 0 }; });
  // which people are which today: 90 one job, 7 two related jobs, 3 not understood (scattered)
  const ORDER = CROWD.map(p => p.n).sort((a, b) => hash(a * 3.7) - hash(b * 3.7));
  ORDER.forEach((n, q) => { CROWD[n].kind = q < 90 ? 1 : q < 97 ? 2 : 3; CROWD[n].wave = hash(n * 5.3); });
  const JOBS = [C.red, C.blue, C.yellow, C.green, C.pink, C.teal, C.orange, C.lilac];
  function crowd(t, lt, dur, today) {
    const { tTwo, t90, t7, tOnly } = N0;
    CROWD.forEach(p => {
      const k = Math.min(kin(lt, p.x), kout(lt, dur)) ; if (k <= .01) return;
      let col = C.grey, col2 = null, q = false, flip = 0;
      if (!today) { const good = p.n === ORDER[0] || p.n === ORDER[1]; if (good && t > tTwo - .2) { col = C.gold; flip = seg(t, tTwo - .2, tTwo + .2); } else q = p.n % 4 === 0; }
      else {
        const t1 = t90 - .5 + p.wave * 1.6, tk = p.kind === 2 ? t7 - .2 + p.wave * .5 : t1;
        if (p.kind === 1 && t > t1) { col = JOBS[p.n % 8]; flip = seg(t, t1, t1 + .35); }
        else if (p.kind === 2 && t > tk) { col = JOBS[p.n % 8]; col2 = JOBS[(p.n + 3) % 8]; flip = seg(t, tk, tk + .35); }
        else q = p.kind === 3 || (p.n % 5 === 0 && t < t90);
        if (flip > 0 && flip < .5) { col = C.grey; col2 = null; }
      }
      const hot = today && p.kind === 3 && t > tOnly - .2;
      stand(p.x, p.y, k, 30 * p.sc, () => { if (hot) glow(0, -40, 60, '#FFFFFF', .35); pp(p.sc, col, { col2, q: q && k > .9, flip }); }, { raw: k < 1 });
      if (hot && k > .9) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(p.x, p.y - 40 * p.sc, 34, 56, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
    });
  }
  // the lens: a paper magnifier, fogged (2023) or clear (today)
  function lens(x, y, r, fog, t) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.5); flat(rrPts(r * .9, -14, r * 1.1, 28, 10), C.brown, { shadow: SH }); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fog > .5 ? 'rgba(230,226,214,.82)' : 'rgba(210,235,255,.18)'; ctx.fill();
    if (fog > .5) for (let q = 0; q < 6; q++) glow(x + Math.sin(t + q) * r * .4, y + Math.cos(t * .8 + q * 2) * r * .4, r * .7, '#FFFFFF', .3);
    else { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x, y, r * .7, -2.4, -1.6); ctx.stroke(); }
    ctx.lineWidth = 12; ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(x, y, r + 6, 0, TAU); ctx.stroke(); ctx.restore();
  }
  function y2023Shot(t, lt, dur) {
    const { a, tNone, tUnd, tOAI, tTwo } = N0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[a + .6, 960, 560, 1], [tNone, 960, 590, 1.02], [tOAI, 960, 600, 1.03], [tTwo + .5, 960, 610, 1.03]]);
    book();
    crowd(t, lt, dur, false);
    const kh = Math.min(seg(lt, .9, 1.4), kout(lt, dur));
    heading('2023', 540, 990, 96, kh);
    heading('small language models', 1370, 995, 44, kh);
    // the fogged lens drifts over the crowd
    if (kh > 0) lens(860 + 200 * Math.sin(t * .5), 790 + 25 * Math.sin(t * .7), 105, 1, t);   // kept low, over the crowd and clear of the placards
    placard(560, 900, 'understood: almost none', C.paper2, Math.min(popk(t, tNone - .2, .5), kout(lt, dur)), 46, { stick: 320 });
    placard(1110, 940, 'under 2%', C.gold, Math.min(popk(t, tTwo - .1, .5), kout(lt, dur)), 56, { stick: 260 });
    clS(t, lt, dur, 1700, 990, [[a, 'neutral'], [tNone, 'confused'], [tUnd + .5, 'sad'], [tTwo, 'thinking']], { u: 7.5, flip: true });
    pageTurn(lt);
    camEnd();
    GRAIN = .8;
  }
  function todayShot(t, lt, dur) {
    const { tMod, tQ, t90, tJob, t7, tRel, tOnly, tYet } = N0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[tQ + .5, 960, 560, 1], [t90 + .4, 960, 590, 1.02], [t7, 960, 600, 1.03], [tOnly, 960, 610, 1.03], [tYet + .5, 960, 600, 1.02]]);
    book();
    crowd(t, lt, dur, true);
    const kh = Math.min(seg(lt, .9, 1.4), kout(lt, dur));
    heading('today', 540, 990, 96, kh);
    heading('Qwen3-32B', 1370, 995, 56, Math.min(seg(t, tQ - .2, tQ + .4), kh));
    if (kh > 0) lens(1000 + 300 * Math.sin(t * .45), 790 + 25 * Math.sin(t * .6), 105, 0, t);
    placard(420, 900, '90%  one main job', C.gold, Math.min(popk(t, t90 - .1, .5), kout(lt, dur)), 44, { stick: 330 });
    placard(965, 920, '7%  two related jobs', C.paper2, Math.min(popk(t, t7 - .1, .5), kout(lt, dur)), 40, { stick: 350 });
    placard(1500, 900, '2–4%  not yet', C.grey, Math.min(popk(t, tOnly + .1, .5), kout(lt, dur)), 40, { stick: 330 });
    clS(t, lt, dur, 1630, 990, [[tMod, 'thinking'], [t90, 'surprised'], [t90 + 1, 'excited'], [t7 + .5, 'happy'], [tOnly, 'thinking'], [tYet, 'determined']], { u: 7.5, flip: true });
    pageTurn(lt);
    camEnd();
    GRAIN = .8;
  }

  // ================= the preeclampsia hub =================
  const M0 = { a: cs('cw_medical'), tFol: wt('cw_medical', 'follow'), tPreg: wt('cw_medical', 'pregnant'), tSym: wt('cw_medical', 'symptoms'), tFour: wt('cw_medical', 'four'), tConc: wt('cw_medical', 'concludes'), tPre: wt('cw_medical', 'preeclampsia'), tSw: wt('cw_medical', 'Switch'), tOff: wt('cw_medical', 'off'), tItch: wt('cw_medical', 'itching'), tDiff: wt('cw_medical', 'different'), tNext: wt('cw_medical', 'next'), tGuess: wt('cw_medical', 'guess') };
  const SYMS = [[470, 800, 'pregnant', C.pink], [720, 800, 'headache', C.orange], [670, 940, 'high blood pressure', C.blue]];   // two rows, ~40 px apart, clear of the bed
  const HUB = [[1120, 820], [1250, 860], [1150, 940], [1280, 960]];
  function medicalShot(t, lt, dur) {
    const { a, tFol, tPreg, tSym, tFour, tConc, tPre, tSw, tOff, tItch, tDiff, tNext, tGuess } = M0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[tFol, 820, 600, 1.06], [tPreg, 860, 600, 1.06], [tFour, 900, 590, 1.04], [tPre + .3, 920, 570, 1.03], [tItch + .5, 980, 580, 1.0], [tGuess + .2, 970, 580, 1.0]]);
    book();
    const ko = kout(lt, dur), off = ease(seg(t, tSw + .1, tOff + .3));
    // the patient, in a paper hospital bed, with a chart that fills in symptom by symptom
    stand(300, 960, Math.min(kin(lt, 300), ko), 260, () => {
      cutout(rectPts(-130, -70, 260, 50), C.paper2, { jag: 2, shadow: SH }); cutout(rectPts(-140, -150, 26, 150), C.blue, { jag: 1, shadow: SH }); cutout(rectPts(114, -110, 26, 110), C.blue, { jag: 1, shadow: SH });
      cutout(rrPts(-110, -110, 70, 40, 14), '#FFFFFF', { jag: 1, shadow: false }); cutout(ellPts(-74, -118, 22, 22, 14), '#E9C9A6', { jag: 1, shadow: false });
      cutout([[-50, -70], [-40, -112], [60, -104], [110, -70]], C.pink, { jag: 1.5, shadow: false }); cutout(ellPts(20, -112, 30, 22, 14), C.pink, { jag: 1, shadow: false });
      flat(rectPts(-84, -122, 4, 4), C.ink); flat(rectPts(-70, -122, 4, 4), C.ink);
    });
    // threads from the symptoms to the hub: drawn first and tucked behind the cards' tops, so they never cross the lettering
    SYMS.forEach(([x, y], n) => thread([[x + 40, y - 90], [lerp(x, 1120, .5), y - 230 - n * 24], [HUB[n % 4][0] - 20, HUB[n % 4][1] - 120]], Math.min(seg(t, tFour - .8 + n * .2, tFour + .4 + n * .2), ko) * (1 - ease(seg(off, .55, 1))), off > .5 ? C.grey : C.gold));   // switched off, they reel back in
    // symptoms pop up as folded tent cards
    SYMS.forEach(([x, y, s, col], n) => { const k = Math.min(popk(t, tFol + .5 + n * .55, .5), ko); stand(x, y, k, 200, () => { ctx.font = `700 32px ${SERIF}`; const w = ctx.measureText(s).width + 46; cutout([[-w / 2, 0], [-w / 2 + 14, -96], [w / 2 - 14, -96], [w / 2, 0]], col, { jag: 2, shadow: SH }); ps(s, 0, -48, 32); if (n === 0) { ctx.save(); ctx.translate(0, -100); pp(.9, C.pink, { skin: '#E9C9A6' }); ctx.restore(); } }); });
    // the hub of four neurons; the pull-tab switches them off (they fold flat)
    // (folded flat they would leave loose paper strips on the page, so once down they fade out)
    HUB.forEach(([x, y], n) => { const k = Math.min(kin(lt, x + 400), 1 - off * .97, ko), hot = on(t, tFour - .2 + n * .14, Infinity, .3), ga = 1 - seg(off, .75, 1); if (ga <= 0) return; ctx.save(); ctx.globalAlpha = ga; stand(x, y, k, 120, () => pb(120, 150, hot > .5 ? C.lilac : C.grey, { roof: 'peak', wins: [{}], lit: Math.max(hot * .5, on(t, tConc - .5)) * (1 - off), glowCol: '#FFD58A' }), { raw: off > 0 }); ctx.restore(); });
    // the other neurons of the hospital district, standing by
    [[1640, 750, C.blue], [1780, 790, C.green], [1590, 975, C.yellow]].forEach(([x, y, col], n) => stand(x, y, Math.min(kin(lt, x), ko, 1 - seg(t, tItch - .8, tItch - .4) * (n === 0 ? 1 : 0) * 0), 110, () => pb(110, 130, col, { roof: n % 2 ? 'flat' : 'peak', wins: [{}, {}], cols: 2, winH: 30, lit: .15 })));
    // the conclusion: a scroll unrolls above the hub
    const kp = Math.min(popk(t, tPre - .4, .6), ko), drop = ease(seg(t, tOff, tOff + .8));
    if (kp > 0) { ctx.save(); ctx.translate(1200, 560 + 300 * drop * drop); ctx.rotate(.5 * drop); ctx.scale(backOut(kp), backOut(kp)); ctx.globalAlpha = 1 - drop; cutout(rectPts(-200, -50, 400, 100), C.gold, { jag: 2, shadow: SH }); cutout(ellPts(-200, 0, 16, 54, 12), mixCol(C.gold, C.ink, .2), { jag: 1, shadow: false }); cutout(ellPts(200, 0, 16, 54, 12), mixCol(C.gold, C.ink, .2), { jag: 1, shadow: false }); ps('preeclampsia', 0, 3, 48); ctx.restore(); }
    // the pull-tab at the page edge
    pullTab(1290, 996, ease(seg(t, tSw - .3, tSw + .4)));
    // the next guess: a different building asks about itching
    const ki = Math.min(popk(t, tItch - .5, .55), ko);
    stand(1440, 880, ki, 280, () => pb(280, 240, C.teal, { roof: 'flat', sign: 'another condition', signSize: 30, wins: [{}, {}], cols: 2, lit: .7 }));
    bubble(1450, 500, 'any itching?', 46, Math.min(popk(t, tItch - .2, .5), ko), { tail: -40 });
    thread([[1200, 780], [1260, 640], [1360, 700]], Math.min(seg(t, tNext - .6, tNext + .3), ko), C.navy, 7);
    if (t > tNext - .4) heading('next guess', 1200, 830, 46, Math.min(seg(t, tNext - .4, tNext + .2), ko), C.navy);
    clS(t, lt, dur, 1600, 1010, [[a, 'happy'], [tPreg, 'thinking'], [tPre, 'proud'], [tSw - .6, 'determined'], [tItch, 'surprised'], [tGuess, 'thinking']], { u: 7, flip: true, extra: { aL: t > tSw - .5 && t < tSw + .6 ? 1.3 : undefined } });
    pageTurn(lt);
    camEnd();
    caps(t, [[tFol - .1, tPreg - .4, 'a line of reasoning, in plain neurons'], [tPreg - .3, t - lt + dur - .3, 'a pregnant patient']]);
    GRAIN = .8;
  }

  // ================= Santa in the basements =================
  const W0 = { a: cs('cw_wallet'), tTril: wt('cw_wallet', 'trillions'), tFound: wt('cw_wallet', 'found'), tFacts: wt('cw_wallet', 'facts'), tW: wt('cw_wallet', 'wallet', 1), tCash: wt('cw_wallet', 'cash'), tID: wt('cw_wallet', 'ID'), tLost: wt('cw_wallet', 'lost'), tHon: wt('cw_wallet', 'honesty'), tAns: wt('cw_wallet', 'answer', 1), tRet: wt('cw_wallet', 'return'), tFull: wt('cw_wallet', 'Full') };
  const BIG = Array.from({ length: 60 }, (_, n) => { const r = n % 3, x = -560 + Math.floor(n / 3) * 150 + r * 50 + (hash(n) - .5) * 40, y = 700 + r * 62; return [x, y, 70 + 40 * hash(n * 3), 90 + 140 * hash(n * 5), [C.orange, C.yellow, C.blue, C.green, C.pink, C.lilac][n % 6]]; });
  function walletShot(t, lt, dur) {
    const { a, tTril, tFound, tFacts, tW, tCash, tID, tLost, tHon, tAns, tRet, tFull } = W0;
    library(t);
    const gate = seg(t, tTril - .8, tTril + .4);
    camB(t, [[t - lt, 960, 560, 1], [t - lt + 1, 960, 560, 1], [tTril + .4, 960, 520, .6], [tFacts - .4, 960, 520, .62], [tW, 480, 640, 1.0], [tID + .4, 560, 640, 1.0], [tLost + .2, 960, 600, .9], [tHon + .5, 1100, 600, .9], [tRet - .4, 1500, 560, .92], [t - lt + dur - .6, 1400, 560, .8], [t - lt + dur, 960, 560, 1]], .4);
    book({ gate: gate * (1 - seg(lt, dur - .5, dur)) });
    const ko = kout(lt, dur);
    // the giant city (trillions of parameters): rows and rows of little buildings across the unfolded pages
    BIG.forEach(([x, y, w, h, col], n) => { const k = Math.min(n < 30 ? kin(lt, x) : 1, popk(t, tTril - .7 + (n % 16) * .04 + Math.floor(n / 16) * .02, .45), ko); const lit = [22, 23, 34, 35, 44].includes(n) ? 0 : .2; stand(x, y, k, w, () => pb(w, h, col, { roof: n % 3 ? 'peak' : 'flat', door: false, wins: [{}, {}], cols: 2, winH: 22, lit })); });
    // the question
    bubble(960, 400, 'I found a wallet. What should I do?', 50, Math.min(popk(t, tFound - .3, .5), 1 - seg(t, tFacts - .2, tFacts + .3), ko), { tail: 0 });
    // the facts: wallet, cash, an ID
    const kf1 = Math.min(popk(t, tW - .2, .5), ko), kf2 = Math.min(popk(t, tCash - .2, .5), ko), kf3 = Math.min(popk(t, tID - .2, .5), ko);
    stand(330, 990, kf1, 120, () => { cutout(rrPts(-70, -90, 140, 90, 14), C.brown, { jag: 2, shadow: SH }); cutout(rrPts(-70, -90, 140, 34, 10), mixCol(C.brown, C.ink, .25), { jag: 1, shadow: false }); flat(ellPts(46, -70, 8, 8, 10), C.gold); });
    stand(480, 1012, kf2, 130, () => { cutout(rectPts(-80, -70, 160, 70), '#8FBF7A', { jag: 2, shadow: SH }); flat(ellPts(0, -35, 22, 22, 14), '#6A9A5A'); ps('$', 0, -33, 34, C.paper); });
    stand(640, 990, kf3, 130, () => { cutout(rrPts(-80, -100, 160, 100, 10), C.cream, { jag: 2, shadow: SH }); flat(rectPts(-66, -86, 50, 60), C.blue); flat(ellPts(-41, -66, 12, 12, 10), '#E9C9A6'); for (let q = 0; q < 3; q++) flat(rectPts(-6, -84 + q * 22, 66, 8), C.line); ps('ID', 40, -20, 26); });
    // the route: a gold thread through lost property and honesty to the answer tower
    const LP = [900, 950], HO = [1210, 970], TW = [1590, 940];
    thread([[380, 900], [640, 760], [LP[0], LP[1] - 170]], Math.min(seg(t, tLost - .8, tLost + .1), ko));
    thread([[680, 900], [960, 700], [HO[0], HO[1] - 190]], Math.min(seg(t, tHon - .8, tHon + .1), ko));
    thread([[LP[0] + 40, LP[1] - 200], [1300, 520], [TW[0], TW[1] - 420]], Math.min(seg(t, tAns - .6, tRet), ko));
    thread([[HO[0] + 40, HO[1] - 200], [1400, 640], [TW[0], TW[1] - 380]], Math.min(seg(t, tAns - .4, tRet), ko));
    stand(LP[0], LP[1], Math.min(popk(t, tLost - .4, .5), ko), 190, () => pb(190, 200, C.yellow, { roof: 'flat', sign: 'lost property', signSize: 24, wins: [{ s: 'found:' }, { draw: () => { cutout(rrPts(-22, -14, 44, 28, 6), C.brown, { jag: 1, shadow: false }); } }], cols: 2, lit: on(t, tLost - .2) }));
    stand(HO[0], HO[1], Math.min(popk(t, tHon - .4, .5), ko), 190, () => pb(190, 210, C.pink, { roof: 'peak', sign: 'honesty', wins: [{ s: '♥', font: 'sans-serif', col: C.red }, { s: 'fair' }], cols: 2, lit: on(t, tHon - .2) }));
    stand(TW[0], TW[1], Math.min(popk(t, tRet - .7, .6), ko), 200, () => pb(200, 430, C.blue, { roof: 'step', wins: [{}, {}, {}, {}, {}, {}], cols: 2, lit: on(t, tRet - .3), winH: 40 }));
    bubble(TW[0], TW[1] - 590, 'return it.', 64, Math.min(popk(t, tRet - .2, .5), ko), { col: C.gold, tail: -20 });
    clS(t, lt, dur, 1820, 1000, [[a, 'happy'], [tTril, 'surprised'], [tFound, 'thinking'], [tHon, 'love'], [tRet, 'proud']], { u: 7.5, flip: true });
    pageTurn(lt);
    camEnd();
    caps(t, [[tTril - .2, tFound - .4, 'trillions of parameters'], [tW - .3, tLost - .4, 'a wallet · cash · an ID'], [tLost - .3, tRet - .4, 'lost property · honesty'], [tFull - .3, t - lt + dur - .3, 'full audits at this scale: not yet']]);   // the answer itself is the tower's bubble
    GRAIN = .8;
  }

  // ================= plumbing: − × − = + =================
  const D0 = { a: cs('cw_double'), tPl: wt('cw_double', 'plumbing'), tMul: wt('cw_double', 'multiply'), tSig: wt('cw_double', 'signals'), tBoth: wt('cw_double', 'both'), tNeg: wt('cw_double', 'negative'), tPos: wt('cw_double', 'positive'), tOpp: wt('cw_double', 'opposite'), tSep: wt('cw_double', 'Separate'), tCases: wt('cw_double', 'cases'), tNoise: wt('cw_double', 'noise'), tFrom: wt('cw_double', 'From'), tOut: wt('cw_double', 'out', 1) };
  function pipe(P, wdt, col = '#9AA7B8') { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(40,24,16,.28)'; ctx.lineWidth = wdt; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0] + 6, p[1] + 9) : ctx.moveTo(p[0] + 6, p[1] + 9)); ctx.stroke(); ctx.strokeStyle = C.ink; ctx.lineWidth = wdt + 6; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = wdt; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = wdt * .25; ctx.beginPath(); P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1] - wdt * .22) : ctx.moveTo(p[0], p[1] - wdt * .22)); ctx.stroke(); ctx.restore(); }
  function gauge(x, y, sign, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(backOut(k), backOut(k)); cutout(ellPts(0, 0, 50, 50, 24), C.cream, { jag: 1.5, shadow: SH }); ctx.strokeStyle = sign > 0 ? '#3A8A4A' : C.navy; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(22, 0); if (sign > 0) { ctx.moveTo(0, -22); ctx.lineTo(0, 22); } ctx.stroke(); ctx.restore(); }
  function drop(P, u, sign) { const Cc = through(P, 10), q = Cc[Math.floor(clamp(u) * (Cc.length - 1))]; glow(q[0], q[1], 56, sign > 0 ? '#BFE3A6' : '#9FC6FF', .9); cutout(ellPts(q[0], q[1], 22, 22, 16), sign > 0 ? '#8FCF7A' : C.blue, { jag: 1, shadow: [2, 3, 'rgba(40,24,16,.3)'], line: mixCol(sign > 0 ? '#8FCF7A' : C.blue, C.ink, .5), lw: 2.5 }); ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(q[0] - 11, q[1]); ctx.lineTo(q[0] + 11, q[1]); if (sign > 0) { ctx.moveTo(q[0], q[1] - 11); ctx.lineTo(q[0], q[1] + 11); } ctx.stroke(); ctx.restore(); }
  function doubleShot(t, lt, dur) {
    const { a, tPl, tMul, tSig, tBoth, tNeg, tPos, tOpp, tSep, tCases, tNoise, tFrom, tOut } = D0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[tMul, 1000, 570, 1.0], [tPos, 1010, 560, 1.02], [tOpp + .5, 1020, 560, 1.02], [tSep + .4, 1010, 570, 1.0], [tOut, 1000, 570, 1.0]]);
    book();
    const ko = kout(lt, dur), neg = t > tBoth - .2, split = ease(seg(t, tSep - .2, tSep + .8));
    const kp = Math.min(seg(lt, .7, 1.3), ko);
    if (kp > 0) {
      ctx.save(); ctx.globalAlpha = kp;
      const A1 = [[180, 640], [520, 640], [700, 720]], A2 = [[180, 900], [520, 900], [700, 820]], OUT = [[760, 770], [1160, 770], [1300, 700]], OUT2 = [[1160, 770], [1300, 880]];
      pipe(A1, 34); pipe(A2, 34); pipe(OUT, 40);
      if (split > 0) pipe([[1160, 770], [lerp(1160, 1330, split), lerp(770, 930, split)]], 40);
      // the multiplier junction
      ctx.save(); ctx.translate(740, 770); ctx.rotate(t * (t > tMul ? 2 : .3)); cutout(ellPts(0, 0, 70, 70, 28), C.gold, { jag: 2, shadow: SH }); for (let q = 0; q < 8; q++) flat(rectPts(-6 + Math.cos(q * TAU / 8) * 64, -6 + Math.sin(q * TAU / 8) * 64, 12, 12), mixCol(C.gold, C.ink, .3)); ctx.restore(); ps('×', 740, 772, 80);
      gauge(380, 560, neg ? -1 : 1, seg(t, tSig - .6, tSig - .1)); gauge(380, 980 - 160, neg ? -1 : 1, seg(t, tSig - .4, tSig + .1));
      // signals flowing
      for (let q = 0; q < 2; q++) { const u = frac((t - a) * .45 + q * .5); drop(A1, u, neg ? -1 : 1); drop(A2, frac(u + .17), neg ? -1 : 1); if (t > tMul) drop(OUT, frac(u + .3), 1); }
      ctx.restore();
    }
    // the building that lit up for the opposite of its job
    const wrong = neg && t > tPos - .3 ? 1 - split : 0, kb = Math.min(kin(lt, 1450), ko);
    // while it misfires, its real windows (joy, yay) go dark and the opposite ones (gloom, sob) light up blue
    // "from the outside, that looks like noise": the windows blink at random
    const nz = t > tFrom - .2 && t < tSep - .3, rl = n => hash(n * 7.3 + Math.floor(t * 6) * 3.1) > .5 ? 1 : 0;
    const wGood = (w, n) => nz ? { s: w, lit: rl(n), col: rl(n) ? C.ink : '#8A8478' } : ({ s: w, lit: 1 - wrong, col: wrong > .5 ? '#5E584C' : C.ink, bg: wrong > .5 ? '#C9C3B6' : undefined }), wBad = (w, n) => nz ? { s: w, size: 25, lit: rl(n), col: rl(n) ? C.cream : C.navy, bg: rl(n) ? C.navy : undefined, glow: '#7EB5FF' } : ({ s: w, size: 25, lit: wrong, col: wrong > .5 ? C.cream : split > .5 ? '#6E685C' : C.navy, bg: wrong > .5 ? C.navy : undefined, glow: '#7EB5FF' });
    stand(1480, 760, kb, 260, () => { pb(260, 300, C.yellow, { roof: 'peak', sign: 'glad', signSize: 34, wins: [wGood('joy', 0), wGood('yay', 1), wBad('gloom', 2), wBad('sob', 3)], cols: 2, lit: nz ? .5 : wrong ? .2 : .5, glowCol: wrong ? '#7EB5FF' : '#FFD58A' });
      // after the split its own case, + × +, gets a tag of its own up in the gable
      if (split > .02) { ctx.save(); ctx.translate(0, -300 - 44); ctx.scale(backOut(split), backOut(split)); cutout(rrPts(-62, -22, 124, 44, 14), C.cream, { jag: 1, shadow: SH }); ps('+ × +', 0, 2, 30, C.ink); ctx.restore(); } });
    if (wrong > .5 && t > tOpp - .4 && t < tFrom - .2) stamp('opposite!', 1130, 430, tOpp - .3, t, { col: C.red, size: 80 });
    // after the split: the − × − case gets its own building
    const ks = Math.min(popk(t, tCases - .3, .6), ko);
    stand(1440, 1010, ks, 240, () => pb(240, 170, C.navy, { roof: 'flat', sign: '− × −', signSize: 30, wins: [{ s: 'gloom', lit: .8, size: 23 }, { s: 'sob', lit: .8, size: 23 }], cols: 2, lit: .7 }));
    clS(t, lt, dur, 1730, 1000, [[a, 'neutral'], [tNeg, 'confused'], [tOpp, 'scared'], [tSep - .5, 'determined'], [tNoise, 'proud']], { u: 7.5, flip: true, hat: t > tSep - .6 ? 'hard' : 'beret', extra: { aR: t > tSep - .4 && t < tSep + .8 ? 1.4 : undefined } });
    pageTurn(lt);
    camEnd();
    caps(t, [[t - lt + 1, tBoth - .4, 'some of the mess was plumbing'], [tBoth - .3, tFrom - .4, '−  ×  −  =  +'], [tFrom - .3, tSep - .4, 'from the outside: noise'], [tSep - .3, t - lt + dur - .3, 'separate the two cases']]);
    GRAIN = .8;
  }

  // ================= experts: a gatekeeper and specialist neighbourhoods; one is all dice and dragons =================
  const R0 = { a: cs('cw_river'), tRiver: wt('cw_river', 'river'), tRes: wt('cw_river', 'residual'), tRead: wt('cw_river', 'read'), tWrite: wt('cw_river', 'write'), tWorr: wt('cw_river', 'worried'), tTang: wt('cw_river', 'tangle'), tPrac: wt('cw_river', 'far'), tRead2: wt('cw_river', 'read', 1), tSq: wt('cw_river', 'squeezed'), tMess: wt('cw_river', 'messier'), tNev: wt('cw_river', 'nothing'), tKn: wt('cw_river', 'knotted') };
  const RW = ['the', 'river', 'ran', 'and', 'she', 'said', 'why', 'if', 'so', 'once'], RI = ['p47742', 'n1070575', 'pTrain34', 'c4d201c', 'n1158528', 'pCarX5', 'p42708'].map(n => 'blog/raw/v-figure-10x/' + n);
  function riverShot(t, lt, dur) {
    const { a, tRiver, tRes, tRead, tWrite, tWorr, tTang, tPrac, tRead2, tSq, tMess, tNev, tKn } = R0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[tRiver + .5, 960, 600, 1.02], [tRead, 940, 630, 1.03], [tWrite + .6, 970, 630, 1.03], [tTang, 980, 600, 1.0], [tPrac + .3, 920, 640, 1.0], [tSq + .2, 960, 630, 1.0], [tKn + .4, 1040, 620, 1.03]]);
    book();
    const ko = kout(lt, dur), kr = Math.min(seg(lt, .7, 1.3), ko), dam = ease(seg(t, tSq - .3, tSq + .7)), twist = Math.sin(Math.PI * seg(t, tWorr, tPrac)) * (t < tPrac ? 1 : 0);
    const narrow = x => 1 - dam * (.3 + .32 * clamp(1 - Math.abs(x - 1200) / 420)), mess = ease(seg(t, tMess - .3, tMess + .6));   // squeezed: the whole river pinches; messier: the boats jostle
    const ry = x => 880 + 26 * Math.sin(x * .006 + 1) + twist * 60 * Math.sin((x - 900) * .02) * clamp(1 - Math.abs(x - 1000) / 300);
    if (kr > 0) {
      ctx.save(); ctx.globalAlpha = kr;
      const top = [], bot = []; for (let x = PG.l; x <= PG.r; x += 20) { const w = 70 * narrow(x); top.push([x, ry(x) - w]); bot.push([x, ry(x) + w]); }
      flat(top.concat(bot.reverse()), C.blue, { shadow: [4, 6, 'rgba(40,24,16,.25)'] });
      // paper wave strips sliding downstream; choppier at the dam
      for (let q = 0; q < 26; q++) { const x = PG.l + frac(hash(q * 3.1) + (t - a) * .06) * (PG.r - PG.l - 80), w = 54 * narrow(x), chop = (1 - narrow(x)) * 2.2, y = ry(x) + (hash(q * 7.7) - .5) * w * 1.2 + chop * 10 * Math.sin(t * 9 + q); flat([[x, y], [x + 60, y - 4 - chop * 3], [x + 70, y + 2], [x + 10, y + 5]], '#B8DAF0'); }
      ctx.restore();
      if (dam > 0) for (const sg of [-1, 1]) cutout(rectPts(1180, sg < 0 ? ry(1200) - 54 - 50 + 50 * (1 - dam) * 0 : ry(1200) + 54 * narrow(1200), 44, sg < 0 ? 50 + 54 * (1 - narrow(1200)) : 50), C.brown, { jag: 2, shadow: SH });
    }
    // buildings on the banks read from and write to the river
    const BANK = [300, 560, 820, 1440, 1660].map((x, n) => [x, 780 + 5 * (n % 2), [C.orange, C.yellow, C.green, C.pink, C.lilac][n], 'read · write']);
    BANK.forEach(([x, y, col, job], n) => stand(x, y, Math.min(kin(lt, x), ko), 190, () => pb(190, 220 + 30 * (n % 2), col, { roof: n % 2 ? 'flat' : 'peak', sign: job, signSize: 30, wins: [{}, {}], cols: 2, lit: .4 })));
    // word boats float downstream
    for (let q = 0; q < 7; q++) {
      const x = PG.l + 40 + frac(q / 7 + (t - a) * .05) * (PG.r - PG.l - 120) + mess * 70 * Math.sin(t * .9 + q * 2.1), y = ry(x) + (q % 2 ? -14 : 16) * (1 - .5 * dam) + (1 - narrow(x)) * 10 * Math.sin(t * 8 + q) + mess * 16 * Math.sin(t * 3.1 + q * 2.3), rot = (1 - narrow(x)) * .2 * Math.sin(t * 7 + q) + mess * .32 * Math.sin(t * 2.3 + q * 1.9), k = Math.min(kr, clamp((x - PG.l) / 60));
      if (k <= 0) continue; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = k;
      ctx.scale(1.45, 1.45); cutout([[-50, -10], [50, -10], [36, 12], [-36, 12]], C.cream, { jag: 1, shadow: [3, 5, 'rgba(40,24,16,.3)'] }); flat([[4, -10], [4, -62], [44, -16]], C.paper2);
      // once the squeeze starts (done in an image network), the cargo turns from words into little photos
      if (dam < 1) { ctx.save(); ctx.globalAlpha *= 1 - dam; ps(RW[q % RW.length], -4, 1, 21); ctx.restore(); }   // the word is painted on the hull, clear of the banks' houses
      if (dam > 0) { ctx.save(); ctx.globalAlpha *= dam; ctx.translate(-24, -30); ctx.rotate(mess * (hash(q * 5.3) - .5) * 1.4); ctx.translate(24, 30); const I = img(RI[q]), sz = Math.min(I.width, I.height); flat(rectPts(-44, -50, 40, 40), C.cream); ctx.drawImage(I, (I.width - sz) / 2, (I.height - sz) / 2, sz, sz, -42, -48, 36, 36); ctx.restore(); }
      ctx.restore();
    }
    // read: a bucket on a string lowered from the "read" house; write: a boat dropped from the "write" house
    const rb = Math.sin(Math.PI * seg(t, tRead - .4, tRead + 1.2)), wb = seg(t, tWrite - .3, tWrite + .9);
    if (rb > 0) { const bx = 360, by = lerp(740, ry(360) - 30, rb); inkLine([[340, 700], [bx, by - 30]], 1.5, C.ink, 'inkfine', 0); cutout([[bx - 22, by - 30], [bx + 22, by - 30], [bx + 16, by], [bx - 16, by]], C.gold, { jag: 1, shadow: false }); }
    if (wb > 0 && wb < 1) { const bx = 620, by = lerp(720, ry(620), easeIn(wb)); cutout([[bx - 40, by - 8], [bx + 40, by - 8], [bx + 28, by + 10], [bx - 28, by + 10]], C.gold, { jag: 1, shadow: false }); }
    // the Knot tries to tie the river, and fails
    const kk = Math.min(on(t, tWorr - .4, tRead2 + .9, .4, .6), ko), shrink = ease(seg(t, tPrac - .2, tRead2 + .5));   // "So far it has been readable": the Knot gives up
    if (kk > 0) { ctx.save(); ctx.translate(1000, 760 - 60 * kk + 120 * shrink); ctx.scale(kk * lerp(1, .35, shrink), kk * lerp(1, .35, shrink)); knotP(0, 0, 120, { look: [0, 1], grin: t < tPrac }); ctx.restore(); }
    // Clawd reads it, with a clear lens
    const lk = Math.min(on(t, tPrac - .3, tSq + .4), ko);
    if (lk > 0) { ctx.save(); ctx.globalAlpha = lk; lens(lerp(700, 860, seg(t, tPrac, tRead2 + .5)), ry(800) - 30, 80, 0, t); ctx.restore(); }
    clS(t, lt, dur, 560, 1010, [[a, 'happy'], [tWorr, 'nervous'], [tPrac, 'determined'], [tRead2, 'happy'], [tSq, 'thinking'], [tNev, 'smug']], { u: 7, flip: false });
    pageTurn(lt);
    camEnd();
    caps(t, [[tRiver - .2, tRes - .4, 'a river through every district'], [tRes - .3, tSq - .4, 'the residual stream'], [tSq - .3, tMess - .4, 'squeezed, in an image network'], [tMess - .3, t - lt + dur - .3, 'messier, but nothing knotted']]);
    GRAIN = .8;
  }

  // ================= attention: the courier service =================
  const Q0 = { a: cs('cw_couriers'), tAtt: wt('cw_couriers', 'attention'), tCour: wt('cw_couriers', 'courier'), tNotes: wt('cw_couriers', 'notes'), tKnow: wt('cw_couriers', 'know'), tAnoth: wt('cw_couriers', 'another'), tMed: wt('cw_couriers', 'medical'), tHead: wt('cw_couriers', 'headache'), tGath: wt('cw_couriers', 'gather'), tFacts: wt('cw_couriers', 'facts'), tOnePl: wt('cw_couriers', 'place', 1), tDiag: wt('cw_couriers', 'diagnosis') };
  const STREET = [[250, 'she', 120], [380, 'is', 120], [530, 'pregnant', 156], [680, 'with', 120], [805, 'a', 120], [950, 'headache', 156], [1095, 'and', 120], [1340, 'high blood pressure', 280]];
  function couriersShot(t, lt, dur) {
    const { a, tAtt, tCour, tNotes, tKnow, tAnoth, tMed, tHead, tGath, tFacts, tOnePl, tDiag } = Q0;
    library(t);
    camSpread(t, t - lt, t - lt + dur, [[tCour, 960, 560, 1], [tKnow, 960, 590, 1.02], [tMed, 960, 570, 1], [tFacts, 990, 590, 1.02], [tDiag + .4, 1000, 590, 1.02]]);
    book();
    const ko = kout(lt, dur);
    // the sentence as a street of word buildings
    STREET.forEach(([x, w, bw], n) => stand(x, 800 + (n % 2) * 20, Math.min(kin(lt, x), ko), bw + 4, () => pb(bw, 190 + 50 * ((n * 3) % 3), [C.orange, C.yellow, C.blue, C.green, C.pink, C.lilac][n % 6], { roof: n % 2 ? 'flat' : 'peak', sign: w, signSize: w.length > 10 ? 27 : w.length > 6 ? 30 : 40, wins: [{}, {}], cols: 2, lit: (w === 'headache' && t > tHead - .2) || (w[0] === 'h' && w.length > 10 && t > tGath - .2) || (w === 'pregnant' && t > tFacts - .2) ? .9 : .3 })));
    // the diagnosis house at the end of the street
    const lit = on(t, tDiag - .4);
    const ARR = [tOnePl - .1, tOnePl + .25, tOnePl + .6];   // when each note is delivered: it lands in one of the house's windows
    stand(1650, 830, Math.min(kin(lt, 1650), ko), 264, () => pb(260, 330, C.lilac, { roof: 'step', sign: 'diagnosis', signSize: 34, wins: ['headache', 'high blood pressure', 'pregnant'].map((s, n) => ({ s: t > ARR[n] ? s : '', size: n === 1 ? 19 : 23, lit: Math.max(lit, on(t, ARR[n], Infinity, .25) * .7) })), cols: 1, lit, winH: 40 }));
    if (lit > .3) bubble(1650, 390, '?', 72, Math.min(popk(t, tDiag, .5), ko), { col: C.gold, tail: -10 });   // the answer itself comes next, when it is spoken
    // couriers: first a demo between two words, then the three medical notes ride to the diagnosis house
    const ride = (t0, t1, x0, x1, y, note, col, ph, lift = 0) => { if (t < t0 || t > t1 + .4) return; const u = easeInOut(seg(t, t0, t1)); ctx.save(); ctx.translate(lerp(x0, x1, u), y - Math.abs(Math.sin(t * 7 + ph)) * 4); courier(1.3, t + ph, t < t1 ? note : null, col, lift); ctx.restore(); };
    ride(tNotes - 1, tAnoth, 250, 950, 960, 'she', C.teal, 0);
    ride(tFacts - .6, tOnePl + .6, 530, 1420, 945, 'pregnant', C.teal, 3);
    ride(tGath - .4, tOnePl + .25, 1340, 1580, 995, 'high blood pressure', C.navy, 2);
    ride(tHead - .4, tOnePl - .1, 950, 1500, 1045, 'headache', C.red, 1);   // its own lane, so its note never sits on another
    // a second courier lane: ambient traffic of notes so the street is alive
    for (let q = 0; q < 2; q++) { const ph = frac((t - a) * .12 + q * .5); if (t < tMed) { ctx.save(); ctx.translate(lerp(1700, 200, ph), 1000); ctx.scale(-1, 1); courier(.7, t + q, null, C.orange); ctx.restore(); } }
    caps(t, [[tAtt - .3, tKnow - .4, 'attention: the courier service'], [tKnow - .3, tMed - .4, 'knows what was said elsewhere'], [tMed - .3, t - lt + dur - .3, 'symptoms carried to one place']]);
    clS(t, lt, dur, 1820, 1000, [[a, 'happy'], [tAtt, 'excited'], [tMed, 'thinking'], [tDiag, 'proud']], { u: 7, flip: true });
    pageTurn(lt);
    camEnd();
    GRAIN = .8;
  }

  // ================= don't end the sentence yet; then the page tears out and folds into a dart =================
  const P0 = { a: cs('cw_dot'), tConf: wt('cw_dot', 'confusion'), tMix: wt('cw_dot', 'mix'), tCit: wt('cw_dot', 'citations'), tDia: wt('cw_dot', 'dialogue'), tWeb: wt('cw_dot', 'web'), tKor: wt('cw_dot', 'Korean'), tLooks: wt('cw_dot', 'looks'), tStop: wt('cw_dot', 'stop'), tPer: wt('cw_dot', 'period'), tEarly: wt('cw_dot', 'early'), tRem: wt('cw_dot', 'Remove'), tSoon: wt('cw_dot', 'sooner'), tStory: wt('cw_dot', 'story'), tRdbl: wt('cw_dot', 'readable'), tFoll: wt('cw_dot', 'followed'), tCaus: wt('cw_dot', 'causes'), e: ce('cw_dot'), nx: chapStart('ch11') };
  function dotShot(t, lt, dur) {
    const { a, tConf, tMix, tCit, tDia, tWeb, tKor, tLooks, tStop, tPer, tEarly, tRem, tSoon, tStory, tRdbl, tFoll, tCaus, e, nx } = P0;
    library(t);
    const tear = seg(t, e + .05, e + .7), fold = seg(t, e + .6, e + 1.5), fly = seg(t, e + 1.4, nx + 2);
    camB(t, [[t - lt, 960, 560, 1], [t - lt + 1, 960, 560, 1], [tMix, 960, 540, 1.04], [tLooks, 960, 520, 1.06], [tRem + .3, 980, 540, 1.04], [e, 960, 560, 1], [nx + 2, 1000, 520, 1.04]], .4);
    book();
    const ko = 1 - seg(t, e - .2, e + .2), pulled = ease(seg(t, tRem - .1, tRem + .5));
    const WINS = [{ s: 'as shown in [12, 14', t0: tCit }, { s: '"Well," she said', t0: tDia }, { s: 'GET /api/v2/users', t0: tWeb, font: 'monospace' }, { s: '안녕하세요 저는', t0: tKor, font: HANGUL }];
    const kb = Math.min(kin(lt, 960), ko);
    // the tall neuron with four windows; when its tab is pulled it folds flat
    stand(960, 920, kb * (1 - pulled * .97), 920, () => {
      const w = 920, h = 540; cutout([[-w / 2, 0], [-w / 2, -h], [-w * .2, -h], [-w * .2, -h - 50], [w * .2, -h - 50], [w * .2, -h], [w / 2, -h], [w / 2, 0]], C.lilac, { jag: 2, shadow: SH });
      WINS.forEach((wi, n) => {
        const cx = -w / 2 + 30 + (n % 2) * (w / 2), cy = -h + 40 + Math.floor(n / 2) * 240, ww = w / 2 - 60, wh = 200, L = on(t, wi.t0 - .3);
        flat(rectPts(cx - 6, cy - 6, ww + 12, wh + 12), mixCol(C.lilac, C.ink, .4)); flat(rectPts(cx, cy, ww, wh), L > .3 ? mixCol(C.cream, '#FFE9A0', L) : C.paper2);
        if (L > .3) glow(cx + ww / 2, cy + wh / 2, ww * .6, '#FFE08A', .3 * L);
        ctx.save(); ctx.globalAlpha = .4 + .6 * L; const fs0 = wi.font === HANGUL ? 44 : wi.font === 'monospace' ? 32 : 38, fw = wi.font === HANGUL ? '400' : '700'; ctx.font = `${fw} ${fs0}px ${wi.font || SERIF}`; const fs = Math.min(fs0, fs0 * (ww - 64) / ctx.measureText(wi.s).width);   // fits clear of the held-back period
        txt(wi.s, cx + 22, cy + 84, fs, C.ink, { font: wi.font || SERIF, weight: fw, align: 'left' }); ctx.restore();
        // the period that wants to come too early, held back
        if (t > tStop - .6) { const k2 = seg(t, tStop - .6, tStop), held = Math.sin(t * 6 + n) * 6; const px = cx + ww - 34, py = cy + 150 + held; flat(ellPts(px, py - 60 * (1 - k2), 13, 13, 12), C.ink); ctx.save(); ctx.translate(px + 30, py + 30); ctx.rotate(-.4); cutout(rrPts(-16, -40, 32, 60, 10), '#E9C9A6', { jag: 1, shadow: [2, 3, 'rgba(0,0,0,.2)'] }); ctx.restore(); }
      });
    });
    // after the pull: periods drop into every snippet, sentences end too soon
    if (pulled > 0) WINS.forEach((wi, n) => { const x = 960 - 380 + 30 + (n % 2) * 380 + 40 + n * 30, yy = 1000 + Math.floor(n / 2) * 0, k = popk(t, tRem + .4 + n * .18, .3); if (k <= 0) return; ctx.save(); ctx.translate(n % 2 ? 1330 : 600, (n < 2 ? 800 : 930) - 40 * (1 - easeOut(k))); ctx.font = `700 46px ${wi.font === HANGUL ? HANGUL : SERIF}`; const s = [ 'as shown in [12.', '"Well." She.', 'GET /api.', '안녕.'][n], w = ctx.measureText(s).width + 40; ctx.globalAlpha = ko * (1 - seg(t, tStory - 1.2, tStory - .7)); if (ctx.globalAlpha <= 0) { ctx.restore(); return; } cutout(rectPts(-w / 2, -40, w, 80), C.cream, { jag: 1, shadow: SH }); ps(s, 0, 2, 46, C.ink, { font: wi.font === HANGUL ? HANGUL : SERIF }); ctx.restore(); });
    // the Knot wraps the building while it looks like "confusion", then falls off
    const kc = Math.min(on(t, tConf - .3, tLooks + .8, .4, .8), ko);
    if (kc > 0) { ctx.save(); ctx.translate(1640, 470 + 300 * seg(t, tLooks, tLooks + .8)); ctx.scale(kc * lerp(1, .4, seg(t, tLooks, tLooks + .8)), kc * lerp(1, .4, seg(t, tLooks, tLooks + .8))); knotP(0, 0, 110, { grin: t < tLooks, look: [-1, 0] }); ctx.restore(); }
    // the pull-tab
    if (ko > 0) { ctx.save(); ctx.globalAlpha = ko; pullTab(1290, 998, ease(seg(t, tRem - .3, tRem + .3))); ctx.restore(); }
    clS(t, lt, dur, 1620, 1010, [[a, 'neutral'], [tConf, 'confused'], [tLooks, 'idea'], [tRem - .5, 'determined'], [tSoon, 'laugh'], [e + .3, 'surprised'], [e + 1.6, 'excited']], { u: 7, flip: true, extra: { aL: t > tRem - .5 && t < tRem + .5 ? 1.3 : undefined } });
    // the right page tears out and folds into a paper dart that flies off
    if (tear > 0) {
      const lift = easeOut(tear), fk = easeInOut(fold), fl = easeIn(fly);
      ctx.save();
      const cx = lerp(1375, 980, fk) + lerp(0, 1000, fl), cy = lerp(850, 560, fk) - 80 * lift + lerp(0, -380, fl) + 40 * Math.sin(fl * 6);
      ctx.translate(cx, cy); ctx.rotate(lerp(0, -.25, fk) + lerp(0, -.2, fl)); const sc = lerp(1, .55, fk) * lerp(1, .5, fl); ctx.scale(sc, sc);
      if (fk < .5) {
        // the page (a torn rectangle), its corners folding in
        const f = fk * 2, w = 830, h = 390;
        const P = [[-w / 2 + (w / 2) * f * .9, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2 + (w / 2) * f * .9, h / 2]];
        const tearEdge = []; for (let q = 0; q <= 12; q++) tearEdge.push([-w / 2 + (w / 2) * f * .9 + (hash(q * 3) - .5) * 20, h / 2 - q * h / 12]);
        flat([P[0], P[1], P[2], P[3]].concat(tearEdge.slice(1, -1)), C.paper, { shadow: [12, 16, 'rgba(0,0,0,.35)'] });
        for (let q = 0; q < 6; q++) flat(rectPts(-w / 2 + (w / 2) * f + 40, -h / 2 + 50 + q * 50, w * (1 - f * .5) - 120, 4), C.line);
        if (f > .1) { flat([[-w / 2 + (w / 2) * f * .9, -h / 2], [-w / 2 + (w / 2) * f * .9 + 120 * f, 0], [-w / 2 + (w / 2) * f * .9, h / 2]], C.paper2); }
      } else {
        // the dart
        const f = (fk - .5) * 2, wing = lerp(180, 90, f);
        flat([[-260, -wing], [260, 0], [-260, wing], [-200, 0]], C.paper, { shadow: [12, 18, 'rgba(0,0,0,.35)'] });
        flat([[-200, 0], [260, 0], [-260, wing]], C.paper2); flat([[-200, 0], [260, 0], [-230, 10]], C.fold);
        flat([[-260, -wing], [260, 0], [-200, -6]], mixCol(C.paper, '#FFFFFF', .3));
        flat(rectPts(-180, -wing * .5, 110, 10), C.red);
      }
      ctx.restore();
      if (fl > 0) for (let q = 0; q < 6; q++) { const u = fl - q * .04; if (u <= 0) continue; const x = lerp(980, 1980, easeIn(u)) - 120, y = 560 - 380 * easeIn(u) + 40 * Math.sin(u * 6); dot(x - q * 30, y + q * 8, 6 - q * .7, '#FFF6E0', .5 * (1 - q / 6)); }
    }
    pageTurn(lt);
    camEnd();
    caps(t, [[tMix - .3, tLooks - .4, 'citations · dialogue · web · Korean?'], [tStop - .3, tRem - .3, "don't end the sentence yet"], [tSoon - .5, tStory - .6, 'periods come sooner', C.gold]]);
    qSum(t, tStory - .9, e - .05, [tRdbl, tFoll, tCaus]);
    GRAIN = .8;
  }

  shots([[chapStart('ch10'), arriveShot], [cs('cw_numbers') - .3, Qd(y2023Shot)], [wt('cw_numbers', 'In', 1) - .45, Qd(todayShot)], [cs('cw_couriers') - .3, Qd(couriersShot)], [cs('cw_medical') - .3, Qd(medicalShot)], [cs('cw_wallet') - .3, Qd(walletShot)], [cs('cw_double') - .3, Qd(doubleShot)], [cs('cw_river') - .3, Qd(riverShot)], [cs('cw_dot') - .3, Qd(dotShot)]]);
})();
