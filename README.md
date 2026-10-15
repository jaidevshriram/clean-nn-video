# Neural Networks Are Already Clean — the explainer video

A ~67-minute hand-painted explainer of Nick Cammarata's essay
[Neural Networks Are Already Clean](https://already-clean.goodfire.com/) (Goodfire, 2026). The narration is in the author's
first person, adapted from the essay, as if the author is teaching it, and the essay's own figures and images appear
throughout. The visual style follows [ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase):
brush-painted washes, boiling ink, paper grain and Clawd.

The voice is synthetic (Kokoro, a local open TTS model, voice `am_michael`). It is a stock voice, not a clone of the author.

## Chapters

```
00:00 Cold open                         34:19 Do weak activations matter?
00:41 The short version                 37:38 Exploring language models
09:31 Cars and animals                  46:57 Zooming out
14:36 A history of microscope errors    55:29 What a solution might look like
16:59 Recursive generalization          56:57 Further down the rabbit hole
19:10 Two learning principles           64:00 On the title
21:07 Superposition of the gaps
25:50 Exploring image models
```

## How it works

- `script/script.md`: the narration, 230 cues. `[cue_id]` marks a beat the picture syncs to; `{display|spoken}` fixes
  pronunciation without changing the subtitles.
- `tools/tts.py`: synthesizes each cue (cached), transcribes it with Whisper to get word timings and check the voice
  said the script (`audio/qa.txt`), aligns those timings to the script's own words, and lays out the timeline
  (`audio/timeline.json`), the voice track and `out/subtitles.srt`.
- `tools/music.py`: a quiet procedural music bed, ducked under the voice, then the final mix (`audio/mix.wav`, -16 LUFS).
- `engine/`: a CPU (Skia Canvas2D) re-implementation of ClaudeAnimationBase's p5.brush engine with the same API, so its
  `clawd.js` (MIT, included) runs unchanged, about 150× faster on a machine without a GPU. `kit.js` holds the
  explainer pieces (sets, neurons, wires, cards, figures, lettering, chapter cards).
- `scenes/`: one file per chapter. Shots and beats are keyed to cue and word times (`cs('cue')`, `wt('cue', 'word')`),
  so the picture re-times itself whenever the voice changes.
- `render.mjs`: contact sheets for review, and the parallel video render (resumable 60 s segments → concat → mux).

## Rebuild

```bash
npm install
node tools/fetch_assets.mjs                  # the essay's images and figure screenshots → assets/blog (not committed)
python tools/tts.py --kokoro=<dir with kokoro-v1.0.onnx and voices-v1.0.bin>
python tools/music.py
node tools/check.mjs                         # renders sampled frames: exceptions + unmatched word cues
node render.mjs --sheet=cue:ca_v --n=6       # look at a beat
node render.mjs --video --workers=4          # → out/video.mp4 (voice, music, soft subtitles)
```

Python needs `kokoro-onnx faster-whisper soundfile scipy`. The video build needs `ffmpeg`.

### Use a different voice (e.g. ElevenLabs)

```bash
ELEVENLABS_API_KEY=... python tools/tts.py --provider=elevenlabs --voice=<voice_id>
python tools/music.py && node render.mjs --video
```

Every scene re-times automatically, because nothing is keyed to fixed seconds.
