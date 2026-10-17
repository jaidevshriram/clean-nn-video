# Review loop

The user's standard: "it was 90% good before, now we're making it 100%". Every pass finds real problems; keep passing
until a pass comes back with only nits.

## Automated audits (run after every batch of changes)

```bash
node tools/check.mjs --step=0.5 --workers=4               # 0 ERROR lines and "unmatched words (0)"
node tools/motionaudit.mjs --range=a:b                    # hard jumps, empty frames, static stretches
node tools/textaudit.mjs --step=1                         # text outside the frame/safe margin
node render.mjs --sheet=cue:<cue> --n=6 --out=out/check/x.jpg   # look at it (Read the image)
node render.mjs --strip=a:b --cols=6 --w=320 --out=out/check/s.jpg
```

## Passes

1. **Layout:** every beat present, composed, readable, nothing cut off.
2. **Timing/motion:** beats land on their words; no static stretches; transitions smooth; every frame earns its place.
3. **Script ↔ picture:** for each cue, read the line and look at the frames: does the screen show what's said, and only
   that? This found the most bugs (stale text, missing callbacks, captions that contradicted the narration, a key
   payoff on screen for 0.5 s, the wrong photo).
4. **Craft:** props, characters, accessories, materials, lighting; does every object look like what it is.
5. **Watch-through:** contact sheets of the whole film at ~2 s spacing, plus one full render watched at speed; check
   the structure is easy to follow and key takeaways stay visible (part maps, recap notes).

Write each review as a file of items with times, severity, file and line, and a concrete fix; then fix by file group.

## Subagent prompts

Always open with a WHY block, or agents may refuse because the latest user message was about something else:

> WHY: The user asked for this directly. Their words: "<quote>". They want the film "high quality and good in every
> way" and have approved as many passes as needed.

**Script reviewer (×3, parallel):** "Adversarially review `script/script.md` as <a first-time viewer with no
background | a fact-checker against the source at <path/URL> | a story editor checking structure and pacing>. Report
numbered findings with cue id, the problem, why it matters, and a proposed rewrite of the line. Rules the script must
follow: third person, never impersonate the author, keep hedges, credit sources, callbacks name concepts not chapters,
introduce metaphors before showing them. Don't edit files."

**Visual reviewer (one per chapter group):** "Review chapters chA–chB (times a–b from `audio/timeline.json`) against
the narration. Render contact sheets per cue and strips at key beats (commands above) into `out/vr/<x>/`. For every
cue: is what's said visible, is what's visible said, is everything readable, uncut, unambiguous, on time? Write
`<scratchpad>/vr/review_<x>.md`: a top-10 list, then per-chapter items with time range, severity, file:line and a
concrete fix. Note engine-level issues separately; don't edit files."

**Builder / fixer (one per chapter group, file-scoped):** "You own `scenes/cNN_*.js` for chapters … only. Read
`BUILD_BRIEF.md` (the visual rules, engine API, timing and seam rules) and the review file. Fix every item, then run
check.mjs (0 errors, 0 unmatched) and look at sheets for each fix. Don't edit engine/, other chapters, the script or
the timeline; describe needed engine changes in your report. Don't commit. Report what you changed per item and
anything you couldn't make good."

Keep engine edits, script edits, music and merges with the main session. After agents finish, run the audits yourself
and look at their key frames before trusting the reports.

## Build brief

Each film should have a `BUILD_BRIEF.md` (copy the reference one and rewrite it): who's on screen, the recurring
symbols, look and motion rules, the engine API cheat sheet, timing rules (`wt` only), the seam rules, the pass
checklist, the commands, and "don't touch shared files / don't commit".
