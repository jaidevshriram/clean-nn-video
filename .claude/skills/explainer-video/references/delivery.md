# Rendering and delivery

## Render

```bash
python tools/score.py                                   # music + audio/mix.wav (run alone)
node render.mjs --video --workers=4 --out=out/video_final.mp4
```

Resumable 60 s segments, concatenated and muxed with the mix and soft subtitles. A 35-min film took a few hours on 4
workers; tell the user the ETA and keep working on reviews meanwhile. Verify the result: frame count × fps = duration,
loudness ≈ −16 LUFS (`ffmpeg -af ebur128`), spot-check frames at seams.

## Files the user can actually receive

The user couldn't download the first large file, and uploads have a size cap (~400 MiB per file). Deliver:
- **1080p** under the cap: two-pass x264 at a computed bitrate (e.g. ~1330k for 35 min ≈ 376 MiB), AAC 160k.
- **720p** at CRF ~26 as a lighter copy.
- **Parts** split at the part breaks (stream copy, cut on keyframes near the act starts) for easy sharing.
- **SRT** subtitles (`out/subtitles.srt`, renamed after the film).
- Send with `SendUserFile`; resend on a 503.

## Screening page (stream in the browser)

An HTML artifact with a video player, a chapter list named by concepts (click to seek), and the film as fMP4 HLS
(~780k video) so it streams instead of downloading. Artifact files are published in batches under ~56 MB each; publish
the media segments first and the playlist (named e.g. `film.txt`, served as text) and the page last. When updating an
existing artifact, list its files first (unread files can't be overwritten). Republish to the same URL on new cuts.

## README and repo

- README: what the film is, a hero still, a stills gallery (one frame per stop, extracted from the master with
  `ffmpeg -ss T -frames:v 1 -vf scale=800:-1 -q:v 4`, saved in `docs/`), the chapter table from `audio/timeline.json`,
  how it works, rebuild commands, review tools, and credits: the source and its author, the people and papers it
  cites, ClaudeAnimationBase by John Heibel (MIT, link and license file), the voice, the music.
- Don't commit the source's images or rendered audio/video; do commit script, scenes, engine, tools and docs stills.
- Commit in meaningful steps with clear messages; push to the working branch; share the branch and README links. Don't
  open a PR unless asked.
