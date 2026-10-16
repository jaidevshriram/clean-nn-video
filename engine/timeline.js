// timeline.js: shots, narration cues and loops.
//
// The narration drives the picture. audio/timeline.json (built by tools/tts.py) holds every cue's start and end in
// video time, plus word timings. Scenes never hard-code seconds for story beats: they ask the cues.
//   cs('v_reveal')            start of a cue      ce('v_reveal')   its end
//   wt('v_reveal', 'V')       time the word "V" is spoken in that cue (first match; or a word index)
//   cueP(t, 'v_reveal')       0..1 progress through the cue
// So when the voice is regenerated (another voice, another speed), everything re-times itself.

const SHOTS = [];
function shots(list) { SHOTS.push(...list); SHOTS.sort((a, b) => a[0] - b[0]); }
const LOOPS = {};

function cue(id) { const c = CUES.cues[id]; if (!c) throw new Error('unknown cue ' + id); return c; }
const cs = id => cue(id).s;
const ce = id => cue(id).e;
const cueP = (t, id) => seg(t, cs(id), ce(id));
function wt(id, w, nth = 0) {
  const c = cue(id);
  if (typeof w === 'number') return (c.words[Math.min(w, c.words.length - 1)] || { s: c.s }).s;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9%\-]/g, '');
  const target = norm(w); let k = 0;
  for (const x of c.words) if (norm(x.w) === target || norm(x.w).startsWith(target) && target.length > 3) { if (k++ === nth) return x.s; }
  (globalThis.MISSING ||= new Set()).add(id + ':' + w + (nth ? '#' + nth : ''));
  return c.s + (c.e - c.s) * .5;   // not found: middle of the cue (logged by the checker)
}
const wte = (id, w, nth = 0) => { const c = cue(id), s = wt(id, w, nth), x = c.words.find(q => q.s === s); return x ? x.e : s + .3; };
// section helpers: a chapter is a run of cues; its scene spans from a little before its first cue to its last cue's end
function span(first, last, lead = .5, tail = .6) { return [cs(first) - lead, ce(last) + tail]; }

function drawWorld(t) {
  if (globalThis.LOOP) return globalThis.LOOP(t);
  if (!SHOTS.length) return;
  globalThis._ARRIVE = null;
  // the seams between worlds (portal transitions, the act-break map) are handled by teleport.js
  const handled = typeof teleport === 'function' && teleport(t);
  if (!handled) {
    let i = 0; while (i + 1 < SHOTS.length && t >= SHOTS[i + 1][0]) i++;
    const t0 = SHOTS[i][0], end = i + 1 < SHOTS.length ? SHOTS[i + 1][0] : DUR;
    // a cut between two shots of the same world gets a short dissolve (chapter seams are teleport's job)
    const fd = (SHOTS[i][2] && SHOTS[i][2].fade) ?? .4, isSeam = CUES.chapters && CUES.chapters.some(c => Math.abs(c.s - t0) < .05);
    if (i > 0 && !isSeam && fd > 0 && t - t0 < fd && typeof renderShotInto === 'function') {
      const A = _off(0), B = _off(1); renderShotInto(A, i - 1, t); GRAIN = renderShotInto(B, i, t);
      ctx.save(); resetMatrix(); ctx.globalAlpha = 1; ctx.drawImage(A, 0, 0); ctx.globalAlpha = easeInOut((t - t0) / fd); ctx.drawImage(B, 0, 0); ctx.restore();
    } else SHOTS[i][1](t, t - t0, end - t0);
  }
  CAM = null;
  // the arrival stamp goes on top of the world's own style passes
  const A = globalThis._ARRIVE || (t < 7 && typeof arrival === 'function' ? [0, .8] : null);
  if (A && typeof arrival === 'function') POST.push(() => arrival(t, A[0], A[1]));
}
