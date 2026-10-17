---
name: explainer-video
description: Turn a pasted blog post, essay, paper or book (text or URL) into a long-form, Kurzgesagt-style animated explainer video with a natural voice-over, procedural music, subtitles and a shareable cut. Use when the user wants "a video of this article/book/post", an animated explainer, or to continue/polish a film built with this toolkit.
---

# Explainer video from a text

Builds a narrated, fully animated explainer (typically 10–40 min) from a source text, using the CPU Canvas engine in
this repo (`engine/`, `render.mjs`, `tools/`), built on
[ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) by John Heibel (MIT). The reference build is "Neural
Networks Are Already Clean" (this repo, branch `claude/explainer-video`): when unsure how to do something, look at how
`scenes/`, `script/script.md` and `tools/` do it there.

The user cares about quality above runtime and will happily allow many passes. The target is not "good" but "nothing a
viewer would trip over". Most of the hard-won lessons below came from the user catching things the first build missed;
treat them as requirements, not suggestions.

## Read before starting

- `references/toolkit.md`: what each file does, what is generic vs. film-specific, how to start a new film from this repo.
- `references/script.md`: narration rules and the script format. **Read before writing a single cue.**
- `references/visuals.md`: the visual system (worlds, metaphors, characters, text, motion, props).
- `references/audio.md`: voice (ElevenLabs), pronunciation, pauses, QA, the music score.
- `references/review.md`: the review loop, audits, and subagent prompt templates.
- `references/delivery.md`: render, encode, subtitles, sharing, README, commit.

## Workflow (with user checkpoints)

1. **Intake.** Get the source: fetch the URL (and its images/figures with `tools/fetch_assets.mjs`, adapted), or take
   the pasted text. For a book, ask which chapters/scope. Ask only what changes the plan: target length (default: long
   enough to cover everything without rushing), audience, voice preference, whether the author's images may appear.
   Note the author's own hedges, credits and terms of art: the script must keep them.
2. **Outline + concept map** (checkpoint). Split the argument into 10–20 chapters, each one idea. For each: the claim,
   the example, what the viewer must already know, the callback it will need later. Group chapters into 3–4 parts.
   Show the user the outline before writing narration.
3. **Visual treatment** (checkpoint). Pick the visual system (`references/visuals.md`): a world per chapter whose style
   *is* the chapter's metaphor, the recurring symbols, the character(s), the transition device, the progress map.
   Render one style frame per world (`tools/styleframes.mjs`) and **show them to the user before animating anything**.
4. **Script** (checkpoint). Write `script/script.md` in third person (`references/script.md`). Then run the
   adversarial script review (three parallel subagents: clarity, fact-check, structure; prompts in
   `references/review.md`), merge their findings, rewrite, and show the user.
5. **Voice.** Generate narration with `tools/tts.py` (ElevenLabs; default voice "Chris", `iP95p4xoKVk53GoZ742B`, or let
   the user pick from samples). Fix every QA mismatch and mispronunciation. This writes `audio/timeline.json`, which
   everything else is keyed to.
6. **Animate.** One scene file per chapter, beats keyed to spoken words (`wt(cue, word)`), never to hard seconds.
   Parallelise across subagents by chapter group with a build brief (template in `references/review.md`); keep shared
   engine edits to yourself.
7. **Music.** `tools/score.py`: one calm cue per world, ducked under the voice (`references/audio.md`). Preview the
   loudest/most unusual worlds with `tools/music_preview.py` before the full mix.
8. **Review passes** until clean: automated audits, per-chapter visual review against the script, a craft pass on
   props and characters, then a full-film watch-through of contact sheets (`references/review.md`). Fix, re-render, repeat.
9. **Deliver.** Final render, a size-limited 1080p, a 720p, part files, an SRT, a streaming screening page, README with
   stills and credits, commit and push (`references/delivery.md`).

Send the user a preview cut (first few minutes) as soon as one exists, and every meaningfully improved full cut; they
give the most useful feedback from watching.

## Non-negotiables (each one was a user correction)

- **Narrate in the third person**, as a teacher summarising the work ("Nick found…", "the essay argues…"). Never
  impersonate the author; never "I"/"my" for the author. Credit the people and papers the author credits.
- **Never reference chapters, worlds or art styles in narration or on screen** ("back in the noir chapter", "in the
  pop-up book"). Callbacks name the *concept or example* ("remember the V neuron: pointed versus round"), and say
  explicitly that it is a callback. Progress maps and stop names use the source's concepts, not the art style.
- **Introduce before you show.** A visual metaphor (an animal, a machine, a creature) appears only on or after the line
  that explains what it stands for. Nothing unexplained sits on screen "for later".
- **The opening's words must match its pictures.** If the picture is a galaxy, the narration talks about lights, not
  cities; then bridge explicitly when the metaphor changes.
- **One idea at a time.** If a chapter is "hard to follow", it has too many concepts or too many transitions: cut
  examples, add a bridge sentence, slow down with pauses. Never rush through a concept to fit a scene.
- **Don't invent jargon or keep weird words.** No coined terms the source doesn't use (the reference film had to purge
  "basement"); no Latin/pseudo-academic captions; no unspoken numbers or IDs on screen (e.g. "4e:55").
- **Remake the author's figures** in the film's style; don't paste crops flat on screen. Real photos may appear inside
  the world (windows, polaroids, leaves, screens).
- **Props and accessories ride the character's transform** (hats, held items move with the body, squash and walk);
  test them on every pose (`tools/clawd_posesheet.mjs`, `tools/clawd_probe.mjs`).
- **Music is calm and subordinate.** Soft timbres, moderate tempo, low gain. The user found bright square-wave arps,
  busy drums, sax and dense layers "grating" and "upsetting". Preview before mixing.
- **Secrets:** the ElevenLabs key goes in a scratchpad file, passed per command as `ELEVENLABS_API_KEY=$(cat <file>)`;
  never into the repo, the script, a log or a commit. Advise rotating any key pasted in chat.
- **Don't commit the source's images** or rendered media (gitignore `assets/<source>/`, `out/`, `audio/*.wav`).

## Subagents

Use subagents generously for reviews and for building chapters in parallel. Every subagent prompt must open with a
short WHY block quoting the user's own words for this request ("the user said: '…'"), because agents otherwise decline
work that doesn't match the latest user message. Give each agent a file scope it owns, the build brief, the review
tools, and the rule not to touch shared engine files or commit.

## Lineage and credit

The engine is built on [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) by John Heibel (MIT):
its painterly Canvas2D toolkit, the Clawd character and the frame-as-a-function-of-time approach. `engine/core.js` is a
CPU (Skia) re-implementation of its `core.js` paint API, and `engine/clawd.js` and `render.mjs` grew out of its Clawd and
renderer. His [PDoomVideo](https://github.com/JohnHeibel/PDoomVideo) was the reference for a narrated explainer on
that base. For a new film, check those repos for anything newer worth pulling in. Always keep
`engine/LICENSE-ClaudeAnimationBase` with the engine, and credit ClaudeAnimationBase (with link) in every film's
README and, if the film has end credits, on screen.
