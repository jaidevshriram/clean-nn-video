# Neural Networks Are Already Clean — the explainer video

A 35-minute animated guide to Nick Cammarata's essay
[Neural Networks Are Already Clean](https://already-clean.goodfire.com/) (Goodfire, 2026). A narrator walks through the
essay's argument in the third person, crediting the people and papers it draws on. Clawd, a small silent tourist,
travels through sixteen worlds, each in its own art style (deep space, a toy town, a 1930s cartoon, film noir, spy
titles, a Victorian street, a botanical plate, a game show, a cryptid hunt, a pixel city, a pop-up book, a pub, a
savanna, a globe of postcards, a World's Fair poster and a jungle). A passport map marks the four parts, and the essay's
own figures and photographs appear throughout.

The narration is voiced with ElevenLabs ("Chris"); the music is procedural, one cue per world.

## Chapters

```
00:00  Stop 0  the question       What happens inside an AI?
01:18  Stop 1  neurons            What a neuron is
02:45  Stop 2  the knot           The knot
04:28  Stop 3  the cat & car case The case of the cat and the car
06:56  Stop 4  the hidden car     The case of the hidden car
08:40  Stop 5  better tools       Better tools, clearer neurons
10:32  Stop 6  how they grow      Watching a neuron grow
12:13  Stop 7  two theories       Two explanations
14:52  Stop 8  a moving target    The superposition of the gaps
17:01  Stop 9  gates & votes      Gates, votes and whispers
19:49  Stop 10 language models    Language models
23:12  Stop 11 testing labels     Explanations that can lose
24:46  Stop 12 why it's clean     How networks learn to be clean
27:34  Stop 13 what clean means   What "clean" means
30:53  Stop 14 AI scientists      The lab of the future
32:32  Stop 15 why it matters     Why it matters
```

## How it works

- `script/script.md`: the narration (117 cues). `[cue_id]` marks a beat the picture syncs to; `{display|spoken}` fixes
  pronunciation without changing the subtitles; `(pause s)` adds silence, inline or at the end of a cue.
- `tools/tts.py`: voices each cue (cached), transcribes it with Whisper for word timings and a check that the voice said
  the script (`audio/qa.txt`), and lays out the timeline (`audio/timeline.json`), the voice track and `out/subtitles.srt`.
- `tools/score.py`: the music. Each world has a small procedural cue (instruments, tempo, harmony and level in its `S`
  entry), ducked under the voice, with a soft chime at each world change; writes `audio/music.wav` and the final mix
  `audio/mix.wav` (-16 LUFS).
- `engine/`: a CPU (Skia Canvas2D) painting engine. `clawd.js` draws Clawd (hats and held props ride his pose),
  `styles.js` the per-world styling, stamps and stops, `teleport.js` the portals between worlds and the part-break map.
- `scenes/`: one file per world (`c00_space.js` … `c15b_recap.js`). Shots and beats are keyed to cue and word times
  (`cs('cue')`, `wt('cue', 'word')`), so the picture re-times itself whenever the narration changes.
- `render.mjs`: contact sheets and frame strips for review, and the parallel video render (resumable 60 s segments,
  then concat and mux with voice, music and soft subtitles).

## Rebuild

```bash
npm install
node tools/fetch_assets.mjs                      # the essay's images and figures → assets/blog (not committed)
ELEVENLABS_API_KEY=... python tools/tts.py --provider=elevenlabs --voice=iP95p4xoKVk53GoZ742B
python tools/score.py                            # music + final mix
node tools/check.mjs                             # every sampled frame renders; every word cue resolves
node render.mjs --video --workers=4 --out=out/video_final.mp4
```

Python needs `faster-whisper soundfile scipy numpy`; the video build needs `ffmpeg`.

## Review tools

- `node render.mjs --sheet=T1,T2,… --out=x.jpg` (stills) and `--strip=a:b` (every frame of a stretch)
- `node tools/motionaudit.mjs --range=a:b` (hard jumps, empty frames, static stretches) and `tools/textaudit.mjs` (text off the frame)
- `python tools/music_preview.py ch05 out.m4a` (one world's cue under the narration) and `python tools/music_tour.py out.m4a` (15 s of every world)
- `node tools/clawd_posesheet.mjs out.jpg` (Clawd in every pose with each hat), `tools/clawd_probe.mjs` + `tools/clawd_crops.mjs`
  (record every Clawd draw in a range, then close-up crops of the hardest moments)
