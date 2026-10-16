# Build brief: v3 "Teleport" chapters

You are building chapters of a ~27-minute explainer film of the essay "Neural Networks Are Already Clean" (Nick
Cammarata, Goodfire, 2026). The owner wants it **exciting and immersive (think Kurzgesagt)**, **top-notch visuals**,
**fun animation throughout**, **good pacing**, and complex ideas explained simply. They've approved the plan:
read `WORLDS.md` first (the tour of 16 worlds, why each exists, what crosses each seam).

## Who's on screen
- **No presenter.** The narrator ("I", the essay's author) is voice only.
- **Clawd** (engine/clawd.js) is a tiny **tourist**, restyled per world with a hat (`tourist(x, y, u, hat, clawdOpts)`;
  hats in engine/styles.js `hatOn`). He reacts (`feel(name, t)`, `emotions(t, [[time, 'mood'], ...])`), never explains.
  Moods: neutral happy excited laugh love shy proud smug relieved sad cry angry scared surprised confused thinking idea
  determined sleepy bored nervous suspicious. Use him for gags, not narration.
- **The Knot** (`knotBeast(x, y, size, {hat, fur, loose, look, grin, col, dark})`) = superposition, same creature in
  every world, shrinking/loosening each time it's proved wrong.
- **A neuron** = anything with **windows that show its photos** and lights up when it fires. In each world it takes a
  local form (house, book, leaf, podium, game building…). **Gold = clean/generalization, violet = superposition.**
- **The lens** = our tools (microscope/camera/telescope), foggy when tools are bad.

## Look and motion rules
- Match and *build on* your world's approved style frame in `style/frames.js` (same palette, devices, post passes).
  Top-notch means: clear silhouettes, strong composition, depth (fore/mid/background), lighting, no clutter,
  nothing cut off by the frame edge by accident, text never overlapping important art.
- **Something meaningful moves in every frame.** Camera moves (`camKeys`) gently through each shot; squash & stretch and
  overshoot on things that appear (`backOut`, `popk`); secondary motion (sway, bob, blink, flicker, particles).
- **A small visual gag every ~20–30 s** (Clawd, the Knot, or the world itself).
- **Show, then say:** a visual beat lands on or just before the word that names it (use `wt(cue, 'word')`).
- **Text is rare and large:** key terms and numbers only, ≥ 44 px, never paragraphs. Use `title()`, `hand()`,
  `letter()`, or world-native type (`txt()`), e.g. noir title cards, game-show marquees, broadcast lower thirds.
  Do NOT use the "→" glyph (missing from the fonts); "×", "·", "—" are fine.
- **The essay's real photos stay in the world:** in windows, polaroids, leaves, sprites, pages (`photoFlat`, `img()`,
  `neuronHouse({imgs})`, `lampOrb`). Never paste a whole essay figure flat on screen. Images live under
  `assets/blog/raw/<folder>/…` keyed like `'blog/raw/v-figure-10x/p47742'` (no extension) and `'blog/derived/...'`.
  Contact-sheet them with PIL if you need to see them (python venv: see below).
- Clawd and characters must never float: put them on the ground line, with shadows.

## Engine (read what you need; don't edit shared engine files)
- `engine/core.js`: paint() (watercolour shapes), inkLine/inkStroke, glow, letter, camBegin/camEnd, easing (ease,
  easeIn, easeOut, easeInOut, backOut), seg/env/kf/lerp/clamp/hash/frac, flash, fade, brushWipe, sfx(), stroll().
- `engine/kit.js`: camKeys(t, [[time, cx, cy, zoom, rot?], ...], drift) (call camEnd() after the world), title(),
  hand(), arrow(), ringBox(), tick(), cross(), print() (a photo print), card(), layer() (cache static art!),
  edges(lt, dur, {in, out, cols}).
- `engine/world.js`, `engine/world2.js`: neuronHouse(), skyline(), sky(), fog(), lightRoad(), knot() (the trefoil street),
  machine() (the Unfolding Machine = sparse autoencoder), artist() (the Sketch Artist = feature visualization),
  person(), rain(), splashes(), chalkboard(), vignette(), grade().
- `engine/styles.js`: fx passes (fxGray, fxTint, fxPixelate, fxEngrave, fxNightVision, fxFilm, fxTiltShift,
  fxLetterbox, fxHalftone; they push onto POST each frame), flat(), cutout(), pix(), photoFlat(), vPortal(),
  knotBeast(), hatOn(), tourist(), passStamp(), bg(), vgrad(), txt(), dot(), lampOrb(). GRAIN (0..1.2) per frame.
- `engine/art.js`: tigerArt(), rousseau() jungle, grazer(), meerkat(), taper()/pathOf()/fillPath()/lgrad().
- `scenes/00_common.js`: chapStart(id), on(t, a, b), popk(t, a), stamp(), shape()/SHAPES (32 coloured shapes), fig().
- `engine/timeline.js`: cs(id), ce(id), wt(id, word, nth), cueP(t, id), shots([[startTime, fn(t, lt, dur)], ...]).
- `engine/teleport.js`: the seams between worlds are AUTOMATIC (portals, the act-break passport map, the arrival stamp
  in the top-left with the chapter title). You only draw your world.

## Timing
- Narration timing is in `audio/timeline.json` (cues with word timings). The narration text and the *old* storyboard
  notes are in `script/script.md` (notes starting with `>` describe the previous city version; adapt the ideas to your
  world). Every story beat must be timed from cues/words, never hard-coded seconds.
- `scenes_v2/cNN_*.js` is the previous version of your chapter (city style). It's a great reference for beat
  structure and correct cue ids/words, but restage everything in the new world; don't just restyle it.

## File and seam rules (important)
- One file per chapter: `scenes/cNN_<world>.js`, wrapped in an IIFE, ending with `shots([...])`.
- Your **first shot starts exactly at `chapStart('chNN')`**. The arrival stamp sits in the **top-left (x < 760,
  y < 330) for ~5 s after the world arrives**: keep that area free of important things then.
- Your **last shot must keep drawing nicely until `chapStart(next chapter) + 2`** (the portal renders it while
  opening). No exit wipes/fades of your own at the end; no entry wipes at the start (the portal does both).
- Draw the "carried through" object from WORLDS.md at your ends: at the start, the object arriving; near the end,
  the object for the next world (e.g. the case file that will open into the spy world).
- Chapter durations: look them up (chapStart of next minus yours). Fill all of it; no dead air.

## Workflow (do at least three passes)
- Check for errors/unmatched words: `node tools/check.mjs --only=cNN --range=<start>:<end> --step=.5 --workers=1`
  → must print no ERROR lines and `unmatched words (0)`.
- Contact sheets: `node render.mjs --only=cNN --sheet=<t1,t2,...> --cols=5 --w=384 --out=out/check/<you>_x.jpg`
  or `--sheet=cue:<cueId> --n=6`; motion strips: `--strip=<a>:<b> --cols=6 --w=320`; full-res stills:
  `--sheet=<t> --cols=1 --w=1920`. View them with the Read tool. Keep your outputs under `out/check/`.
- Pass 1 (layout): every beat present, readable, composed, nothing cut off. Pass 2 (motion and timing): strips at key
  beats; things move smoothly, beats land on the words, no long static stretches. Pass 3 (polish): gags, colour,
  depth, text sizes, overlaps, performance (sheet prints ms/frame; keep the average under ~700 ms; cache static
  backgrounds with layer()).
- Python with PIL: `/tmp/claude-0/-home-user-clean-nn-video/a052aef5-395f-5ee0-972b-2dd55acf119d/scratchpad/tts-venv/bin/python -I`.
- Don't modify engine/*.js, other chapters, the script, or the timeline. If you need an engine change, describe it in
  your report. Don't commit or push. Other builders are working in parallel on other chapters.
- Finish with a short report: the beats per cue, what you checked, and anything you couldn't make good.
