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

## Watch page on GitHub Pages (public repos)

A super-minimal page where the video is the focus: dark background, the player sized to the viewport, one line of
title and links, no other chrome. Repackage the size-limited 1080p (no re-encode; keyframes every ~10 s):
`ffmpeg -i film_1080p.mp4 -c copy -f hls -hls_time 10 -hls_playlist_type vod -hls_segment_type fmp4 -hls_segment_filename film/s%03d.m4s film/film.m3u8`,
convert the SRT to `film/subtitles.vtt`, add `poster.jpg`, `.nojekyll` and an `index.html` (native HLS on Safari,
hls.js from jsDelivr elsewhere; og:image for link previews). Push it as an orphan `gh-pages` branch from a separate
directory; Pages turns on by itself. Check the live URL with curl: if the owner has a custom domain, project pages
redirect there (this film lives at jaidevshriram.com/clean-nn-video/). The session can't edit repo settings, so give
the user the description/website text to paste into the repo's About box.

## README and repo

- README: what the film is, a hero still, a stills gallery (one frame per stop, extracted from the master with
  `ffmpeg -ss T -frames:v 1 -vf scale=800:-1 -q:v 4`, saved in `docs/`), the chapter table from `audio/timeline.json`,
  how it works, rebuild commands, review tools, and credits: the source and its author, the people and papers it
  cites, ClaudeAnimationBase by John Heibel (MIT, link and license file), the voice, the music.
- Don't commit the source's images or rendered audio/video; do commit script, scenes, engine, tools and docs stills.
- Commit in meaningful steps with clear messages; push to the working branch; share the branch and README links. Don't
  open a PR unless asked.
