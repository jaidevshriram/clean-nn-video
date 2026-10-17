# The toolkit

The engine is built on [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) by John Heibel
(MIT; license kept at `engine/LICENSE-ClaudeAnimationBase`), re-implemented for fast CPU rendering.

Everything is plain JavaScript drawn with Skia (`@napi-rs/canvas`) on the CPU, plus Python for audio. A frame is a pure
function of time `t`, so any frame can be rendered in any order, in parallel, and re-timed when the narration changes.

## Starting a new film

The toolkit lives in `jaidevshriram/clean-nn-video` (branch `claude/explainer-video`). For a new video:

1. Work in a new repo (or a new branch/folder) and copy in: `engine/`, `render.mjs`, `package.json`, `tools/`,
   `scenes/00_common.js`, `assets/fonts/`, `.gitignore`, `engine/LICENSE-ClaudeAnimationBase` (keep it, MIT). If the
   repo isn't in the session, attach it with `add_repo` and clone it.
2. `npm install`. Python: `pip install faster-whisper soundfile scipy numpy` (reinstall after a container restart).
   Needs `ffmpeg`. Playwright's Chromium is preinstalled in cloud sessions (for fetching figures).
3. Reset the film-specific parts (below), write the new script, voice it, then build scenes.
4. Gitignore the source's assets folder, `out/`, `audio/cues/`, `audio/*.wav`, `audio/words.json`.

## Files

| File | Role | Generic? |
|---|---|---|
| `engine/host.mjs` | loads engine + scene scripts into one vm context; fonts, images, timeline; maps `sans-serif`/`serif`/`monospace` to bundled fonts | generic |
| `engine/core.js` | paint engine: watercolour `paint()`, `inkLine`, `glow`, `letter()` (feathered reveal), camera, easing (`ease`, `backOut`, `seg`, `env`, `kf`), `hash`, `flash`, `brushWipe` | generic |
| `engine/kit.js` | `camKeys(t, [[time, cx, cy, zoom]])`, `title`, `hand`, `arrow`, `ringBox`, `card`, `layer()` (cache static art!) | generic |
| `engine/timeline.js` | `cs(id)`, `ce(id)`, `wt(id, word, nth)`, `cueP`, `shots([[start, fn]])`, same-world dissolves | generic |
| `engine/clawd.js` | Clawd: poses, walk, 24 moods/emotes, held props (`hold` hooks), hats inside the body transform (`o.worldHat`) | generic character |
| `engine/styles.js` | per-world post passes (`fxGray`, `fxPixelate`, `fxNightVision`, `fxFilm`, `fxHalftone`, …), `flat()`, `cutout()`, `pix()`, `txt()`, `photoFlat()`, `hatOn()`, `tourist()`, `passStamp()` | mostly generic; `STOPS`, `knotBeast` are film-specific |
| `engine/teleport.js` | automatic seams between worlds (portal kinds), act-break itinerary map, `ACT_NOTES` recap notes pinned to words | generic mechanism; `ACTS`, `TRANS_KIND`, `ACT_NOTES`, act titles are film-specific |
| `engine/art.js` | hand-built vector set pieces (tiger, jungle, meerkat, grazer) | film-specific, reusable as examples |
| `engine/world.js`, `world2.js`, `prof.js` | earlier cuts' city kit and presenter | legacy |
| `scenes/00_common.js` | `chapStart`, `on()`, `popk()`, `stamp()`, `tag()`, `fig()` | generic (drop `hero()`) |
| `scenes/cNN_<world>.js` | one IIFE per chapter ending in `shots([...])` | per film |
| `style/frames.js` | one style frame per world, rendered by `tools/styleframes.mjs` | per film |
| `render.mjs` | `--sheet=`, `--sheet=cue:<id> --n=6`, `--strip=a:b`, `--crop=`, `--stills=`, `--video --workers=4 [--range=] [--only=]` | generic |
| `tools/tts.py` | narration (ElevenLabs or local Kokoro), Whisper word timings, QA, `audio/timeline.json`, `out/subtitles.srt` | generic (`--acts` per film) |
| `tools/score.py` | procedural music, one `S[chNN]` entry per world, ducking, stings, mix at −16 LUFS | generic engine; `S` per film |
| `tools/check.mjs` | renders sampled frames in parallel; reports exceptions and `wt()` words that didn't match | generic |
| `tools/motionaudit.mjs` | hard jumps, empty frames, static stretches | generic |
| `tools/textaudit.mjs` | text drawn off-frame / outside the safe margin | generic |
| `tools/clawd_posesheet.mjs`, `clawd_probe.mjs`, `clawd_crops.mjs` | character/prop verification | generic |
| `tools/music_preview.py`, `music_tour.py` | audition music without a full mix | generic |
| `tools/fetch_assets.mjs`, `derive_assets.py` | download the source's images, screenshot its figures, crop composites | adapt per source |

## Scene conventions

- First shot starts exactly at `chapStart('chNN')`; the last shot must keep drawing until `chapStart(next) + 2` (the
  portal renders it while opening). No entry/exit wipes of your own; teleport.js does the seams.
- Keep the top-left clear for ~5 s after arrival (the arrival stamp).
- Every beat is `wt(cue, 'word')` or `cs/ce(cue)`. `wt` matches case-insensitively, prefix match for words over 3 chars;
  `nth` picks a later occurrence. After any script change, re-run `tools/check.mjs` and re-point unmatched words.
- Cache static backgrounds with `layer(key, fn, {x, y, w, h})`; keep sheets under ~700 ms/frame.
- Fill backgrounds well past the frame (`-800 … W+800`) whenever the camera can zoom out or pan.
- Fonts: bundled faces only; avoid glyphs the fonts lack (the reference film banned "→").
- Images are referenced as `'blog/raw/<folder>/<name>'` without extension; preloaded by host.mjs.

## Gotchas met along the way

- A camera transform left set (CAM) can shove screen-space text off; draw overlays with `screen: true` or reset.
- Cream text on a cream page is "invisible", not "clipped": give overlay text a stroke or plate.
- Radial gradients with negative radii throw; normalise boxes with `Math.abs/min`.
- Parallel heavy jobs (score render + audits + video) can OOM the container; run the score alone.
- `pgrep -f pattern` in a wait loop matches itself; wait on a PID or run the job in the foreground/background tool.
- In `while read` loops, give `ffmpeg` `-nostdin`, or it eats the loop's input.
