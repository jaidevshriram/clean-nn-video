// prof.js: the Professor, the narrator and main presenter. A painted, simple-shaped human (bean torso, round head,
// mitten hands), drawn with the same paint()/inkLine() as everything else so he belongs to the world.
//
// prof(x, y, s, o): (x, y) = ground point between the feet; s = scale (1 ≈ 520 px tall).
//   view: 'front' | 'q' (3/4, facing right; flip for left)      flip: mirror
//   talk: 0..1 mouth openness (use speak(t) for lip-sync)        mood: neutral|happy|think|surprise|serious|warm|wry
//   look: [x, y] −1..1 eye direction                              blink seed via o.seed
//   pose: a gesture name (see POSES) or { aL: [shoulder, elbow], aR: [...] } in radians (0 = hanging down)
//   lean, bob, dx: body motion                                     walk: phase (legs step)
//   holdR(s) / holdL(s): draw a prop in the hand's local space    hat: null | 'none'
// gestures blend: gesture(t, [[t0, 'explain'], [t1, 'point', {at: [x, y]}], ...]) → pose fields with eased blends.

const PROF = {
  skin: '#E8B48F', skinDk: '#C98E6B', hair: '#3A2A2A', coat: '#F2EBDD', coatDk: '#D9CFBD', coatLt: '#FBF7EE',
  sweater: '#2F7F7A', sweaterDk: '#225F5B', shirt: '#F6F0E4', pants: '#3B3550', shoe: '#5A3A2E', glass: '#2B2233'
};
// arm angles: [shoulder, forearm] in radians, both arms measured the same way: 0 = hanging down, π/2 = straight out
// to that side, π = straight up; a forearm angle past π (or below 0) folds it inward across the body.
const POSES = {
  rest:    { aL: [.12, .06], aR: [.12, .06] },
  explain: { aL: [.14, .08], aR: [.4, 1.95] },
  explain2:{ aL: [.42, 1.8], aR: [.14, .08] },
  open:    { aL: [.5, 1.5], aR: [.5, 1.6] },
  point:   { aL: [.12, .06], aR: [1.45, 1.55] },
  pointUp: { aL: [.12, .06], aR: [2.4, 2.65] },
  think:   { aL: [.28, -1.0], aR: [-.2, 3.45] },
  shrug:   { aL: [.75, 2.2], aR: [.75, 2.2] },
  present: { aL: [1.0, 1.35], aR: [1.0, 1.35] },
  hold:    { aL: [.12, .06], aR: [.25, 1.25] },
  wave:    { aL: [.12, .06], aR: [2.25, 2.9] },
  count:   { aL: [.3, 2.0], aR: [.35, 2.5] },
};
function lerpPose(a, b, k) { return { aL: [lerp(a.aL[0], b.aL[0], k), lerp(a.aL[1], b.aL[1], k)], aR: [lerp(a.aR[0], b.aR[0], k), lerp(a.aR[1], b.aR[1], k)] }; }
// keyed gestures with overlap: each key blends in over .45 s with backOut, and the hands drift a little while held
function gesture(t, keys) {
  let i = 0; while (i + 1 < keys.length && t >= keys[i + 1][0]) i++;
  const P = k => { const g = keys[k][1]; return typeof g === 'string' ? POSES[g] || POSES.rest : g; };
  const cur = P(i), prev = i > 0 ? P(i - 1) : cur, k = backOut(seg(t, keys[i][0], keys[i][0] + .45));
  const p = lerpPose(prev, cur, k), w = Math.sin(t * 2.1) * .05, w2 = Math.sin(t * 1.7 + 1) * .06;
  return { aL: [p.aL[0] + w * .5, p.aL[1] + w2 * .5], aR: [p.aR[0] + w, p.aR[1] + w2], over: keys[i][2] || {} };
}
// lip-sync from the narration's word timings: mouth opens on each word with a syllable flutter, closes in gaps
function speak(t, ids) {
  for (const id of ids) {
    const c = CUES.cues[id]; if (!c || t < c.s - .05 || t > c.e + .05) continue;
    for (const w of c.words) if (t >= w.s - .02 && t <= w.e + .02) {
      const syl = Math.max(1, Math.round(w.w.replace(/[^aeiouy]/gi, '').length * .8)), ph = (t - w.s) / Math.max(.08, w.e - w.s);
      return clamp(.35 + .65 * Math.abs(Math.sin(ph * syl * Math.PI)), 0, 1) * clamp((t - w.s + .02) * 12, 0, 1);
    }
    return 0;
  }
  return 0;
}
const allCues = () => Object.keys(CUES.cues);

function prof(x, y, s, o = {}) {
  const id = o.boilKey || 'prof', rs = p => boilSeed(id + p), C = { ...PROF, ...(o.colors || {}) };
  const view = o.view || 'front', q = view === 'q', sw = clamp(1.7 * s, .6, 2.8);
  const bob = (o.bob ?? 1) * Math.sin(T * 2.2) * 3 * s, lean = (o.lean || 0) + Math.sin(T * 1.3) * .01;
  const pose = o.pose ? (typeof o.pose === 'string' ? POSES[o.pose] : o.pose) : POSES.rest;
  push(); translate(x + (o.dx || 0) * s, y + (o.dy || 0) * s); if (o.flip) scale(-1, 1); scale(s);
  rs('sh'); if (!o.noShadow) paint(ellPts(0, 4, 120, 18, 20), { fill: PAL.ink, fillOp: 80, bleed: .2, tex: .2, border: .1, ink: null });
  // legs
  rs('legs');
  const wk = o.walk;
  for (const side of (q ? [-1, 1] : [-1, 1])) {
    const ph = wk != null ? Math.sin((wk + (side > 0 ? .5 : 0)) * TAU) : 0, lift = wk != null ? Math.max(0, Math.cos((wk + (side > 0 ? .5 : 0)) * TAU)) * 16 : 0;
    const hx = side * (q ? 16 : 30), fx = hx + ph * 40 + (q ? 6 : side * 4);
    paint(ribbon([[hx, -150], [lerp(hx, fx, .5) + side * 2, -80], [fx, -16 - lift]], 48, 40), { wash: C.pants, ink: PAL.ink, sw: sw * .8 });
    paint([[fx - 30 + (q ? 4 : side * -4), -4 - lift], [fx - 26, -30 - lift], [fx + 20, -30 - lift], [fx + 40 + (q ? 12 : 0), -12 - lift], [fx + 38, -2 - lift]], { wash: C.shoe, ink: PAL.ink, sw: sw * .8, curv: .4 });
  }
  translate(0, -140 + bob); rotate(lean);
  // arms: one smooth stroke from shoulder through elbow to wrist, then a mitten hand
  const arm = (side, a, hold, far) => {
    rs('arm' + side);
    const shx = side * (q ? (side > 0 ? 58 : 44) : 70), shy = -232, L1 = 96, L2 = 88;
    const dir = ang => [side * Math.sin(ang), Math.cos(ang)];
    const d1 = dir(a[0]), d2 = dir(a[1]);
    const S = [shx, shy], E = [shx + d1[0] * L1, shy + d1[1] * L1], Wr = [E[0] + d2[0] * L2, E[1] + d2[1] * L2];
    const sleeve = far ? C.coatDk : C.coat;
    paint(ribbon([S, [lerp(S[0], E[0], .6), lerp(S[1], E[1], .6)], E, [lerp(E[0], Wr[0], .5), lerp(E[1], Wr[1], .5)], Wr], 46, 36), { wash: sleeve, ink: PAL.ink, sw: sw * .8 });
    push(); translate(Wr[0], Wr[1]); rotate(-side * a[1]);
    paint(ellPts(0, 2, 18, 7, 10), { wash: C.sweater, ink: PAL.ink, sw: sw * .4 });   // sweater cuff
    translate(0, 20);
    paint(ellPts(0, 0, 21, 24, 16), { wash: C.skin, ink: PAL.ink, sw: sw * .7 });
    paint(ellPts(side * -15, -6, 8, 13, 10, 0, side * .45), { wash: C.skin, ink: PAL.ink, sw: sw * .6 });
    if (hold) hold(s);
    pop();
  };
  if (q) arm(-1, pose.aL, o.holdL, true);
  // torso: sweater underneath, open lab coat over it
  rs('torso');
  const lx = q ? 18 : 0, tw = q ? 140 : 156;
  const body = [[-tw / 2 + 14, -250], [tw / 2 - 14, -250], [tw / 2 + 2, -200], [tw / 2 + 6, -60], [tw / 2 + 14, 4], [-tw / 2 - 14, 4], [-tw / 2 - 6, -60], [-tw / 2 - 2, -200]];
  paint(body, { wash: C.coat, ink: null, curv: .45, tex: .6 });
  paint([[lx - 44, -248], [lx + 44, -248], [lx + 44, 2], [lx - 44, 2]], { wash: C.sweater, ink: null, curv: .2 });   // sweater front
  paint([[lx - 16, -252], [lx + 16, -252], [lx + 8, -226], [lx - 8, -226]], { wash: C.shirt, ink: PAL.ink, sw: sw * .4 });             // collar
  for (let i = 0; i < 4; i++) inkLine([[lx - 34, -200 + i * 46], [lx + 34, -200 + i * 46 + 2]], sw * .35, C.sweaterDk, 'inkfine', .3);   // knit
  // coat: short lapels at the top, the open front edges as single lines
  paint([[lx - 44, -252], [lx - 12, -250], [lx - 40, -170], [lx - 62, -214]], { wash: C.coatLt, ink: PAL.ink, sw: sw * .6 });
  paint([[lx + 44, -252], [lx + 12, -250], [lx + 40, -170], [lx + 62, -214]], { wash: C.coatLt, ink: PAL.ink, sw: sw * .6 });
  inkLine([[lx - 42, -172], [lx - 44, -90], [lx - 46, 2]], sw * .7, PAL.ink, 'ink', .3); inkLine([[lx + 42, -172], [lx + 44, -90], [lx + 46, 2]], sw * .7, PAL.ink, 'ink', .3);
  paint([[lx - 44, -100], [lx - 30, -100], [lx - 32, -40], [lx - 46, -40]], { fill: C.coatDk, fillOp: 90, bleed: .05, ink: null });
  paint(body, { ink: PAL.ink, sw, curv: .45 });
  paint(rectPts(lx + 52, -190, 30, 34, 1), { wash: C.coatDk, ink: PAL.ink, sw: sw * .4 });   // breast pocket
  paint(rectPts(lx + 58, -204, 6, 22, 1), { wash: PAL.berry, ink: null }); paint(rectPts(lx + 68, -200, 6, 18, 1), { wash: PAL.ochre, ink: null });
  // head
  push(); translate(lx * .7, -262); rotate((o.tilt || 0) + Math.sin(T * .9) * .02); scale(1.12);
  head(s, o, C, sw, q);
  pop();
  if (q) arm(1, pose.aR, o.holdR, false); else { arm(-1, pose.aL, o.holdL, false); arm(1, pose.aR, o.holdR, false); }
  pop();
}
function head(s, o, C, sw, q) {
  const rs = p => boilSeed((o.boilKey || 'prof') + p), mood = o.mood || 'neutral';
  rs('neck'); paint(rectPts(-22, -16, 44, 30, 2), { wash: C.skinDk, ink: null });
  rs('head');
  const hx = q ? 10 : 0;
  // ears
  if (!q) for (const sd of [-1, 1]) paint(ellPts(sd * 76, -96, 15, 22, 12), { wash: C.skin, ink: PAL.ink, sw: sw * .6 });
  else paint(ellPts(-58, -96, 15, 22, 12), { wash: C.skin, ink: PAL.ink, sw: sw * .6 });
  // face: a soft rounded square
  const F = rrPts(-74 + hx * .3, -190, 148, 182, 66);
  paint(F, { wash: C.skin, ink: PAL.ink, sw, curv: .3 });
  paint(ellPts(hx - 44, -64, 18, 10, 10), { fill: '#E58A7A', fillOp: 90, bleed: .2, ink: null }); paint(ellPts(hx + 44, -64, 18, 10, 10), { fill: '#E58A7A', fillOp: 90, bleed: .2, ink: null });
  // beard: a short trimmed beard along the jaw
  const bd = [[-72, -96], [-62, -42], [-32, -12], [0, -6], [32, -12], [62, -42], [72, -96], [62, -82], [48, -40], [20, -26], [0, -28], [-20, -26], [-48, -40], [-62, -82]].map(([a, b]) => [a + hx * .4, b]);
  if (o.beard !== false) paint(bd, { wash: C.hair, ink: PAL.ink, sw: sw * .6, curv: .5 });
  // hair: a swept top
  const hr = [[-80, -130], [-82, -176], [-56, -214], [-10, -226], [44, -222], [80, -196], [86, -150], [70, -150], [56, -184], [10, -190], [-30, -186], [-60, -164], [-66, -128]].map(([a, b]) => [a + hx * .3, b]);
  paint(hr, { wash: C.hair, ink: PAL.ink, sw: sw * .7, curv: .45 });
  inkLine([[-40 + hx, -210], [10 + hx, -205], [56 + hx, -185]], sw * .5, '#5A4646', 'inkfine', .5);
  // eyes behind round glasses
  const lk = o.look || [0, 0], ex = hx, blink = ((T * .8 + (o.seed || 0)) % 3.7) < .12 && mood !== 'happy';
  const browY = { neutral: 0, happy: -4, think: 6, surprise: -16, serious: 8, warm: -2, wry: 0 }[mood] ?? 0;
  for (const sd of [-1, 1]) {
    const cx = ex + sd * 34, cy = -110;
    // brows
    const tiltB = mood === 'think' ? (sd < 0 ? -.25 : .15) : mood === 'serious' ? sd * .18 : mood === 'wry' ? (sd < 0 ? 0 : -.3) : mood === 'surprise' ? -sd * .1 : 0;
    push(); translate(cx, cy - 38 + browY); rotate(tiltB); inkLine([[-20, 2], [0, -3], [20, 2]], sw * 2, C.hair, 'ink', .5); pop();
    if (blink || mood === 'happy') inkLine([[cx - 12, cy + (mood === 'happy' ? 2 : 0)], [cx, cy - (mood === 'happy' ? 6 : -2)], [cx + 12, cy + (mood === 'happy' ? 2 : 0)]], sw * 1.2, PAL.ink, 'ink', .5);
    else {
      const er = mood === 'surprise' ? 1.3 : 1;
      paint(ellPts(cx + lk[0] * 6, cy + lk[1] * 5, 7 * er, 9 * er, 12), { wash: PAL.ink, ink: null });
      paint(ellPts(cx + lk[0] * 6 - 2.5, cy + lk[1] * 5 - 3, 2.4, 2.4, 6), { wash: '#FFFFFF', ink: null });
    }
    inkStroke(ellPts(cx, cy, 25, 23, 22), true, sw * .9, C.glass, 'ink');
    paint(ellPts(cx - 9, cy - 9, 7, 4, 8, 0, -.6), { wash: '#FFFFFF', washOp: 120, ink: null });
  }
  inkLine([[ex - 9, -112], [ex, -116], [ex + 9, -112]], sw * .8, C.glass, 'ink', .5);   // bridge
  // nose
  inkLine([[ex + 4, -100], [ex + 8, -78], [ex - 2, -72]], sw * .9, C.skinDk, 'ink', .6);
  // mouth: talk 0..1 opens it; mood shapes the corners
  const tk = clamp(o.talk || 0), my = -58, cw = mood === 'happy' || mood === 'warm' ? 20 : 15, up = mood === 'happy' ? 6 : mood === 'warm' ? 4 : mood === 'serious' ? -2 : mood === 'wry' ? 2 : 0;
  if (tk > .08) {
    const h = 4 + 16 * tk;
    paint([[ex - cw, my - up], [ex - cw * .4, my - 4], [ex + cw * .4, my - 4], [ex + cw, my - up - (mood === 'wry' ? 4 : 0)], [ex + cw * .5, my + h], [ex - cw * .5, my + h]], { wash: '#5A2A32', ink: PAL.ink, sw: sw * .7, curv: .5 });
    if (tk > .4) paint(ellPts(ex, my + h * .7, cw * .45, h * .25, 10), { wash: '#D86A72', ink: null });
    paint(rectPts(ex - cw * .55, my - 4, cw * 1.1, 5, 0), { wash: '#F6F0E4', washOp: 220, ink: null });
  } else if (mood === 'surprise') paint(ellPts(ex, my + 4, 9, 11, 12), { wash: '#5A2A32', ink: PAL.ink, sw: sw * .7 });
  else inkLine([[ex - cw, my - up], [ex, my + (up > 0 ? 3 : 0)], [ex + cw, my - up - (mood === 'wry' ? 6 : 0)]], sw * 1.1, PAL.ink, 'ink', .6);
}
