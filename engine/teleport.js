// teleport.js: moving between worlds. Chapter files only draw their own world; this module handles everything at the
// seams, automatically, from the timeline:
//   * a TRANSITION at every chapter start: the outgoing world and the incoming world are both rendered (each into its
//     own offscreen canvas, with its own style passes and lettering) and composited through a portal that grows:
//       'flash'  white bloom crossfade (ch00 → ch01: a continuous dive)       'film'  a projector frame (ch01 → ch02)
//       'tear'   a ragged rip in reality (before the V is revealed)           'v'     the V portal (from ch03 on)
//   * at the three ACT BREAKS the tour stops at Clawd's passport: the itinerary map, then a zoom into the next stop
//   * an ARRIVAL STAMP (stop number, world name) and the chapter title as each world settles in
// Chapter files must: start their first shot exactly at chapStart(id); keep their last shot drawable until ~2 s into the
// next chapter (no exit wipes of their own); avoid the top-left corner during the first ~5 s (the stamp lives there).

const ACTS = ['ch03', 'ch09', 'ch13'];
const TRANS_KIND = { ch01: 'flash', ch02: 'film', ch03: 'tear' };   // everything later: 'v'
// portal centres per incoming chapter (default: the middle of the screen)
const TRANS_AT = {};
const _OFF = [];
function _off(i) { if (!_OFF[i]) _OFF[i] = createCanvas(W, H); return _OFF[i]; }
function _shotIndexAt(t) { let i = 0; while (i + 1 < SHOTS.length && t >= SHOTS[i + 1][0]) i++; return i; }
// render one shot (by index) at time t into an offscreen canvas, with its own POST passes and letters
function renderShotInto(cv, idx, t) {
  const g = globalThis, saved = { ctx: g.ctx, CANVAS: g.CANVAS, LETTERS, POST, GRAIN, CAM, LAST_CAM };
  g.ctx = cv.getContext('2d'); g.CANVAS = cv; LETTERS = []; POST = []; CAM = LAST_CAM = null;
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(PAPERC, 0, 0);
  const s = SHOTS[idx], t0 = s[0], end = idx + 1 < SHOTS.length ? SHOTS[idx + 1][0] : DUR;
  s[1](t, t - t0, end - t0); CAM = null;
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  for (const f of POST) { resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; f(); }
  resetMatrix(); ctx.globalAlpha = 1; flushLetters();
  const grain = GRAIN;
  g.ctx = saved.ctx; g.CANVAS = saved.CANVAS; LETTERS = saved.LETTERS; POST = saved.POST; GRAIN = saved.GRAIN; CAM = saved.CAM; LAST_CAM = saved.LAST_CAM;
  return grain;
}
function renderFnInto(cv, fn) {
  const g = globalThis, saved = { ctx: g.ctx, CANVAS: g.CANVAS, LETTERS, POST, CAM };
  g.ctx = cv.getContext('2d'); g.CANVAS = cv; LETTERS = []; POST = []; CAM = null;
  resetMatrix(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(PAPERC, 0, 0);
  fn(); CAM = null; resetMatrix(); for (const f of POST) { resetMatrix(); ctx.globalAlpha = 1; f(); } resetMatrix(); flushLetters();
  g.ctx = saved.ctx; g.CANVAS = saved.CANVAS; LETTERS = saved.LETTERS; POST = saved.POST; CAM = saved.CAM;
}

// the shapes a portal can take, as a Path2D centred at (x, y) with overall size r
function tearPath(x, y, r) { const p = new Path2D(), n = 26; for (let i = 0; i < n; i++) { const a = i / n * TAU, rr = r * (.72 + .5 * hash(i * 7.7 + 3) + .08 * Math.sin(T * 6 + i)) * (i % 2 ? .8 : 1.15); i ? p.lineTo(x + Math.cos(a) * rr * 1.25, y + Math.sin(a) * rr) : p.moveTo(x + Math.cos(a) * rr * 1.25, y + Math.sin(a) * rr); } p.closePath(); return p; }
function vPath(x, y, r) { const ww = r * 2.2, hh = r * 1.9, th = r * .75, K = [[x - ww / 2, y - hh / 2], [x, y + hh / 2], [x + ww / 2, y - hh / 2], [x + ww / 2 - th, y - hh / 2], [x, y + hh / 2 - th * 1.7], [x - ww / 2 + th, y - hh / 2]]; const p = new Path2D(); K.forEach((q, i) => { const nx = K[(i + 1) % K.length]; for (let j = 0; j < 8; j++) { const u = j / 8, jag = (j % 2 ? 1 : -1) * r * .03; const px = lerp(q[0], nx[0], u) + jag, py = lerp(q[1], nx[1], u) - jag; (i || j) ? p.lineTo(px, py) : p.moveTo(px, py); } }); p.closePath(); return p; }

// composite: A (outgoing) and B (incoming) canvases, k 0..1 through the transition
function compositePortal(A, B, k, kind, cx = W / 2, cy = H / 2) {
  const e = easeInOut(clamp(k));
  // the outgoing world leans into the portal
  ctx.save(); resetMatrix(); ctx.translate(cx, cy); ctx.scale(1 + .22 * e, 1 + .22 * e); ctx.rotate(kind === 'tear' || kind === 'v' ? .03 * e : 0); ctx.translate(-cx, -cy); ctx.drawImage(A, 0, 0); ctx.restore();
  if (kind === 'flash') {
    ctx.save(); resetMatrix(); ctx.globalAlpha = clamp((k - .35) / .4); const s = 1.25 - .25 * e; ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-W / 2, -H / 2); ctx.drawImage(B, 0, 0); ctx.restore();
    flash(Math.sin(clamp(k) * Math.PI) * .85, '#FFF8E8'); return;
  }
  let path;
  if (kind === 'film') { const fw = lerp(60, W * 1.06, easeIn(clamp(k * 1.1))), fh = fw * 9 / 16; path = new Path2D(); path.rect(cx - fw / 2, cy - fh / 2, fw, fh); }
  else { const r = lerp(8, Math.max(W, H) * (kind === 'v' ? 1.6 : 1.1), easeIn(clamp(k))); path = kind === 'v' ? vPath(cx, cy, r) : tearPath(cx, cy, r); }
  // darken the old world around the opening
  ctx.save(); resetMatrix(); ctx.fillStyle = `rgba(10,6,24,${.35 * Math.sin(clamp(k) * Math.PI)})`; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); resetMatrix(); ctx.clip(path); const s = 1.35 - .35 * e; ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); ctx.drawImage(B, 0, 0); if (kind === 'film' && k < .95) { ctx.globalAlpha = .12 * hash(Math.floor(T * 24)); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); } ctx.restore();
  // the incoming world takes over completely near the end (a V never covers the whole screen on its own)
  if (k > .72) { ctx.save(); resetMatrix(); ctx.globalAlpha = easeInOut((k - .72) / .28); ctx.drawImage(B, 0, 0); ctx.restore(); }
  // glowing rim and sparks
  if (k < .9) {
    const col = kind === 'film' ? '#FFF6D0' : kind === 'v' ? '#F5E8FF' : '#FFE0F0', gl = kind === 'v' ? '#C9A0FF' : '#FF9AD0';
    ctx.save(); resetMatrix(); ctx.strokeStyle = col; ctx.lineWidth = kind === 'film' ? 10 : 7; ctx.shadowColor = gl; ctx.shadowBlur = 40; ctx.globalAlpha = 1 - clamp((k - .7) / .2); ctx.stroke(path); ctx.restore();
    if (kind !== 'film') for (let i = 0; i < 40; i++) { const a = hash(i * 3.3) * TAU, f = frac(T * 1.7 + hash(i)), r = lerp(8, Math.max(W, H) * 1.1, easeIn(clamp(k))) * (.9 + .3 * f); glow(cx + Math.cos(a) * r * 1.1, cy + Math.sin(a) * r * .8, 14 * (1 - f) + 4, col, (1 - f) * (1 - k)); }
  }
}

// ---------- the itinerary map (Clawd's passport), shown at act breaks ----------
function itineraryMap(t, here, o = {}) {
  ctx.save(); resetMatrix(); ctx.fillStyle = lgrad(0, 0, 0, H, [[0, '#3A2A2A'], [1, '#1E1414']]); ctx.fillRect(0, 0, W, H); ctx.restore();
  GRAIN = 1;
  const open = easeOut(clamp(o.open ?? 1));
  ctx.save(); resetMatrix(); ctx.translate(960, 540); ctx.scale(lerp(.6, 1, open), 1); ctx.translate(-960, -540);
  flat(rrPts(150, 90, 1620, 900, 30), '#5A2A3A', { shadow: [14, 18, 'rgba(0,0,0,.5)'] });
  flat(rrPts(180, 115, 780, 850, 16), '#F1E6CC'); flat(rrPts(960, 115, 780, 850, 16), '#F1E6CC'); flat(rectPts(950, 115, 20, 850), '#D9CBAA');
  const P = []; for (let i = 0; i < 16; i++) { const page = i < 8 ? 0 : 1, j = i % 8; P.push([(page ? 1040 : 260) + (j % 2 ? 300 : 40), 210 + j * 90]); }
  const ACT = ['', 'I · the belief', 'II · the evidence', 'III · how it works', 'IV · what it means'], ACOL = ['', '#7B5CA8', '#C2456A', '#3A9C98', '#E8AA38'];
  // the dotted road, drawn as far as "here", animating the last leg
  const leg = clamp(o.walk ?? 1), C1 = through(P.slice(0, 8), 8), C2 = through(P.slice(8), 8);
  const drawRoad = (C, upto, col, dash) => { if (upto < 2) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.setLineDash(dash); ctx.beginPath(); C.slice(0, upto).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore(); };
  drawRoad(C1, C1.length, '#D9C9A8', [16, 12]); drawRoad(C2, C2.length, '#D9C9A8', [16, 12]);
  const doneTo = (C, a, b) => Math.round(clamp((here - 1 + leg - a) / (b - a)) * (C.length - 1)) + 1;
  drawRoad(C1, doneTo(C1, 0, 7), '#8C5A3A', [16, 12]); if (here > 8 || (here === 8 && leg > 0)) drawRoad(C2, here >= 8 ? doneTo(C2, 8, 15) : 0, '#8C5A3A', [16, 12]);
  STOPS.forEach(([name, act], i) => {
    const [x, y] = P[i], done = i < here, cur = i === here, r = cur ? 30 + 4 * Math.sin(T * 5) : 22;
    if (cur) glow(x, y, 90, '#FFE08A', .8);
    dot(x, y, r, done ? ACOL[act] : cur ? ACOL[act] : '#D9CBAA'); ctx.save(); resetMatrix(); ctx.strokeStyle = '#3A2A2A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke(); ctx.restore();
    txt(String(i), x, y + 1, cur ? 26 : 20, done || cur ? '#FFFFFF' : '#8C7A5A', { weight: '800' });
    txt(name, x + (cur ? 48 : 40), y, 30, cur ? '#C2456A' : '#3A2A2A', { align: 'left', weight: cur ? '800' : '600', font: 'serif' });
    if (cur) txt('next stop', x + 48, y + 34, 22, '#C2456A', { align: 'left', weight: '800' });
  });
  for (let a = 1; a <= 4; a++) { const lx = a <= 2 ? 230 + (a - 1) * 360 : 1010 + (a - 3) * 360; dot(lx, 930, 12, ACOL[a]); txt(ACT[a], lx + 22, 930, 24, ACOL[a], { align: 'left', weight: '900' }); }
  // stamps collected so far
  for (let i = 0; i < here; i++) { const sx = (i < 8 ? 880 : 1690) + (hash(i * 3) - .5) * 30, sy = 230 + (i % 8) * 90; passStamp(i, STOPS[i][0], sx, sy, 1, { rot: (hash(i) - .5) * .6, scale: .42, col: ['#C2456A', '#3A64B8', '#3A9C98'][i % 3] }); }
  // Clawd walks the last leg on the map
  const [hx, hy] = P[Math.max(0, here - 1)], [nx, ny] = P[here], cxk = lerp(hx, nx, easeInOut(leg)), cyk = lerp(hy, ny, easeInOut(leg));
  ctx.restore();
  tourist(cxk + 10, cyk - 20, 5, 'safari', { ...feel('happy', t), view: 'side', walk: leg < 1 ? t * 2.5 : undefined, flip: nx < hx });
  if (o.title) letter(o.title, 960, 54, 50, '#F1E6CC', { face: 'marker', shadow: false, reveal: clamp((o.open ?? 1) * 1.5) });
  return P[here];
}

// ---------- the arrival stamp and chapter title ----------
function arrival(t, i, t0) {
  const k = seg(t, t0, t0 + .35), out = seg(t, t0 + 4.2, t0 + 4.9); if (k <= 0 || out >= 1) return;
  ctx.save(); resetMatrix(); ctx.globalAlpha = 1 - out;
  passStamp(i, STOPS[i][0], 190, 190, k, { rot: -.12 });
  ctx.restore();
  if (k > .6 && out < .6) { const ch = CUES.chapters[i]; letter(ch.title, 320, 190, 46, '#FFF6E8', { face: 'marker', shadow: false, align: 'left', stroke: '#1A1420', strokeW: .16, reveal: clamp((t - t0 - .3) / .8), alpha: 1 - out / .6 }); }
  if (k > 0 && k < 1) { const s = Math.sin(k * Math.PI); glow(190, 190, 140 * s, '#FFFFFF', .3 * s); }
}

// ---------- the seam logic, called from drawWorld ----------
function teleport(t) {
  if (!SHOTS.length || !CUES.chapters) return false;
  const chs = CUES.chapters;
  for (let i = 1; i < chs.length; i++) {
    const s = chs[i].s, isAct = ACTS.includes(chs[i].id), kind = TRANS_KIND[chs[i].id] || 'v';
    // at an act break the first cue is the narrated bridge line, spoken over the passport map; the world arrives with the next cue
    let first = CUES.cues[chs[i].first].s;
    if (isAct && /_act$/.test(chs[i].first)) { const ids = Object.keys(CUES.cues), j = ids.indexOf(chs[i].first); if (j >= 0 && j + 1 < ids.length) first = CUES.cues[ids[j + 1]].s; }
    if (t < s || t > first + 5.2) continue;
    const at = TRANS_AT[chs[i].id] || [W / 2, H / 2];
    const iA = _shotIndexAt(s - .001), iB = _shotIndexAt(Math.max(s, t)), A = _off(0), B = _off(1);
    if (!isAct) {
      const w0 = s, w1 = s + 1.6;
      if (t >= w0 && t < w1) { renderShotInto(A, iA, t); GRAIN = renderShotInto(B, iB, t); compositePortal(A, B, (t - w0) / (w1 - w0), kind, at[0], at[1]); arrivalLater(t, i, w1); return true; }
      if (t >= w1) { arrivalLater(t, i, w1); return false; }
      return false;
    }
    // act break: old world → passport map (Clawd walks to the next stop) → zoom through the stop into the new world
    const m0 = s, m1 = s + 1.4, z0 = first - 1.9, z1 = first - .4;
    if (t < m0) return false;
    if (t < m1) { renderShotInto(A, iA, t); renderFnInto(B, () => itineraryMap(t, i, { open: (t - m0) / (m1 - m0), walk: 0, title: actTitle(i) })); compositePortal(A, B, (t - m0) / (m1 - m0), kind, at[0], at[1]); return true; }
    if (t < z0) {
      // hold on the map while the bridge line is spoken: Clawd walks the last leg and the camera eases toward the next stop
      const M = _off(0); let dotXY; renderFnInto(M, () => { dotXY = itineraryMap(t, i, { open: 1, walk: seg(t, m1 + .3, z0 - .6) }); });
      const dz = 1 + .14 * easeInOut(seg(t, m1, z0)), n0 = noteStart(chs[i].first), nk = n0 == null ? 0 : easeInOut(seg(t, n0 - .5, n0 + .3));
      // once the recap notes start, the map lifts and shrinks a little so they sit below it rather than on it
      ctx.save(); resetMatrix(); ctx.translate(W / 2, 40); ctx.scale(1 - .16 * nk, 1 - .16 * nk); ctx.translate(-W / 2, -40);
      ctx.translate(dotXY[0], dotXY[1]); ctx.scale(dz, dz); ctx.translate(-dotXY[0], -dotXY[1]); ctx.drawImage(M, 0, 0); ctx.restore();
      actOverlay(t, i, chs[i].first, 1);   // the title and the recap notes sit on top, so the push-in never crops them
      return true;
    }
    if (t < z1) {
      const k = (t - z0) / (z1 - z0), M = _off(0); let dotXY;
      renderFnInto(M, () => { dotXY = itineraryMap(t, i, { open: 1, walk: 1 }); });
      GRAIN = renderShotInto(B, iB, t);
      const e = easeIn(clamp(k)), z = lerp(1.14, 9, e), n0 = noteStart(chs[i].first), nk = (n0 == null || n0 > z0 + .3 ? 0 : 1) * (1 - e);
      ctx.save(); resetMatrix(); ctx.translate(W / 2, 40); ctx.scale(1 - .16 * nk, 1 - .16 * nk); ctx.translate(-W / 2, -40);
      ctx.translate(dotXY[0], dotXY[1]); ctx.scale(z, z); ctx.translate(-dotXY[0], -dotXY[1]); ctx.drawImage(M, 0, 0); ctx.restore();
      ctx.save(); resetMatrix(); const r = lerp(30, 1400, e); const p = new Path2D(); p.arc(dotXY[0] + (W / 2 - dotXY[0]) * e, dotXY[1] + (H / 2 - dotXY[1]) * e, r, 0, TAU); ctx.clip(p); ctx.drawImage(B, 0, 0); ctx.restore();
      actOverlay(t, i, chs[i].first, 1 - seg(t, z0, z0 + .5));
      return true;
    }
    arrivalLater(t, i, z1);
    return false;
  }
  return false;
}
// arrival overlay is drawn after the world; we defer it to the end of drawWorld
function arrivalLater(t, i, t0) { globalThis._ARRIVE = [i, t0]; }
// the recap of each part break, as paper notes pinned to the map on the words of the bridge line: [word, nth, note]
const ACT_NOTES = {
  cc_act: [['strangers', 0, 'neurons packed with strangers?'], ['machine', 0, 'a machine to pull them apart'], ['cases', 0, 'now: reopen the famous cases']],
  tv_act: [['tool', 0, 'a blurry tool'], ['design', 0, 'an older design'], ['branch', 0, 'a branch nobody followed'], ['Never', 0, 'never strangers packed together']],
  zo_act: [['clean', 0, 'clean, readable parts'], ['generalization', 0, 'one way of learning: generalization'], ['never', 0, 'never strangers packed together'], ['tear', 0, 'no need to tear the knot apart first?']],
};
function noteStart(cue) { const L = ACT_NOTES[cue]; return L && L.length ? wt(cue, L[0][0], L[0][1]) : null; }
function actOverlay(t, i, cue, alpha) {
  if (alpha <= 0) return;
  const title = actTitle(i); if (title) letter(title, 960, 50, 52, '#FFF6E8', { face: 'marker', shadow: false, alpha, screen: true, stroke: '#2A1A2A', strokeW: .2 });
  const notes = (ACT_NOTES[cue] || []).map(([w, n, txt]) => [wt(cue, w, n), txt]).filter(([tw]) => t > tw - .25); if (!notes.length) return;
  ctx.save(); resetMatrix(); ctx.font = '700 36px serif';
  // lay the notes out in centred rows, two to a row, growing upward from the bottom edge
  const ws = notes.map(([, s]) => ctx.measureText(s).width + 60), gap = 24, rows = [];
  ws.forEach((w, j) => { if (!rows.length || rows[rows.length - 1].length === 2) rows.push([]); rows[rows.length - 1].push(j); });
  const RH = 80, top = H - 26 - rows.length * RH;
  const band = ctx.createLinearGradient(0, top - 60, 0, H); band.addColorStop(0, 'rgba(18,12,20,0)'); band.addColorStop(.35, 'rgba(18,12,20,.62)'); band.addColorStop(1, 'rgba(18,12,20,.78)');
  ctx.globalAlpha = alpha; ctx.fillStyle = band; ctx.fillRect(0, top - 60, W, H - top + 60);
  rows.forEach((row, r) => {
    const tot = row.reduce((a, j) => a + ws[j], 0) + gap * (row.length - 1); let x = W / 2 - tot / 2; const cy = top + r * RH + RH / 2;
    row.forEach(j => {
      const [tw, s] = notes[j], k = easeOut(clamp((t - tw + .25) / .4)), w = ws[j], last = j === notes.length - 1, cx = x + w / 2;
      ctx.save(); ctx.globalAlpha = alpha * clamp(k * 1.6); ctx.translate(cx, cy + lerp(-30, 0, k)); ctx.rotate((hash(j * 7 + i) - .5) * .05);
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillRect(-w / 2 + 6, -28, w, 64);
      ctx.fillStyle = last ? '#FFF3C4' : '#EFE4CB'; ctx.fillRect(-w / 2, -34, w, 64);
      ctx.fillStyle = '#C2456A'; ctx.beginPath(); ctx.arc(0, -34, 7, 0, TAU); ctx.fill();
      ctx.fillStyle = '#3A2A2A'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 0, -1); ctx.restore();
      x += w + gap;
    });
  });
  ctx.restore();
}
function actTitle(i) { return ({ 3: 'Part II · the evidence', 9: 'Part III · how it works', 13: 'Part IV · what it means' })[i] || ''; }
