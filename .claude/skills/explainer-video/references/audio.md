# Voice and music

## Voice (`tools/tts.py`)

- The user wanted "a smooth human-like voice, a confident man explaining". ElevenLabs "Chris"
  (`iP95p4xoKVk53GoZ742B`) was their pick after hearing samples; offer 3–4 short samples of the same paragraph if
  they haven't chosen. Local Kokoro (`--provider=kokoro`) works for drafts without a key.
- Key handling: ask the user for a key; write it to a scratchpad file (chmod 600); run
  `ELEVENLABS_API_KEY=$(cat <scratchpad>/.el_key) python tools/tts.py --provider=elevenlabs --voice=<id>`. Never echo it,
  never commit it, never write it into the repo or logs. Recommend rotation if it was pasted in chat.
- Each cue is synthesized separately (with previous/next text as context for natural intonation), cached by text hash,
  silences trimmed and replaced by the script's pauses. Only changed cues cost credits on a re-run.
- Whisper (`faster-whisper small.en`) transcribes every cue: word timings drive the animation, and mismatches against
  the script are listed in `audio/qa.txt`. Read it after every run; fix mispronunciations with `{display|spoken}` and
  re-voice those cues (the user corrected "DINOv2" pronunciation).
- Outputs: `audio/timeline.json` (chapters, cues, words), `audio/voice.wav`, `out/subtitles.srt`.
- Chapter holds (`--chapter-hold`), act-break holds (`--acts`, `--act-hold`) and the end-card tail leave silence for
  transitions, the itinerary map and the end card.

## Music (`tools/score.py`)

Procedural, no samples, one cue per world in a fitting genre; crossfades at seams; a soft sting (low chime + gentle
whoosh, about −4 dB under the bed) at each world change; ducked under the voice; mixed to −16 LUFS.

Each world is an `S` entry: `bpm, root, mode, prog, layers, swing, gain`. Lessons from the user's reactions:
- They called a spy cue (fast surf guitar, bright arps) "really bad and annoying… quite upsetting", a futurist cue
  "grating… just noise", a Victorian cue "too loud and disturbing", and a jungle finale "distracting".
- What fixed it: slower tempos (72–112 bpm), soft timbres (vibes, electric piano, soft piano, warm pads, round bass,
  brushes instead of kits), smoothed pluck excitation (no harsh attack), fewer layers (3–4), no sax/shaker/square leads,
  and per-world `gain` well below 1 (0.5–0.85) on top of loudness matching. Heavy ducking (~0.72) under the voice.
- Music should be felt, not noticed. When in doubt, quieter and simpler.
- Audition before mixing: `python tools/music_preview.py chNN out/previews/chNN.m4a` (40 s under the narration) and
  `python tools/music_tour.py out/previews/tour.m4a` (15 s of every world). Listen to the outliers, not just one.
- Render the full score alone (it's memory-hungry); then mux into the video.
