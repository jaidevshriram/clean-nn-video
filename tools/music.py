"""music.py: a quiet procedural music bed under the narration, then the final mix.

Soft additive pad chords (a slow I–vi–IV–V-ish cycle), sparse plucked pentatonic notes, gentle tape-ish saturation.
The bed is ducked under the voice (envelope follower) and swells a little in the gaps at chapter breaks.
Writes audio/music.wav and audio/mix.wav (voice + bed), loudness-normalised with ffmpeg to -16 LUFS.

    python tools/music.py [--level=-27]
"""
import json, os, sys, subprocess, argparse
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, resample_poly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser(); ap.add_argument('--level', type=float, default=-27.0); ap.add_argument('--tail', type=float, default=7.0)
args = ap.parse_args()
SR = 48000
voice, vsr = sf.read(os.path.join(ROOT, 'audio/voice.wav'), dtype='float32')
assert vsr == SR
tl = json.load(open(os.path.join(ROOT, 'audio/timeline.json')))
dur = max(len(voice) / SR, tl['duration']) + args.tail
N = int(dur * SR); t = np.arange(N) / SR
rng = np.random.default_rng(7)

def note(f): return 440.0 * 2 ** ((f - 69) / 12)
# chords as MIDI notes (C major-ish, warm voicings), 8 s each
CH = [[48, 55, 60, 64, 67], [45, 52, 57, 60, 64], [41, 53, 57, 60, 65], [43, 50, 55, 59, 62], [48, 55, 59, 64, 67], [45, 52, 55, 60, 64], [41, 48, 57, 60, 64], [43, 50, 53, 59, 65]]
BAR = 8.0
pad = np.zeros(N, np.float32)
for i in range(int(dur / BAR) + 2):
    s0 = i * BAR - 1.5; chord = CH[i % len(CH)]
    a, b = max(0, int(s0 * SR)), min(N, int((s0 + BAR + 3) * SR))
    if a >= b: continue
    tt = t[a:b] - s0
    envl = np.clip(tt / 2.5, 0, 1) * np.clip((BAR + 3 - tt) / 3.0, 0, 1)
    seg = np.zeros(b - a, np.float32)
    for m in chord:
        f = note(m)
        for h, amp in [(1, 1), (2, .35), (3, .12)]:
            det = 1 + rng.uniform(-.0015, .0015)
            seg += amp * np.sin(2 * np.pi * f * h * det * tt + rng.uniform(0, 6.28)) * (1 + .15 * np.sin(2 * np.pi * .13 * tt + m))
    pad[a:b] += (seg * envl / len(chord)).astype(np.float32)
pad = sosfilt(butter(2, 1400, 'low', fs=SR, output='sos'), pad).astype(np.float32)
# plucks: sparse pentatonic notes, soft decays
pl = np.zeros(N, np.float32); PENT = [72, 74, 76, 79, 81, 84]
tp = 2.0
while tp < dur:
    m = PENT[rng.integers(len(PENT))]; f = note(m); L = int(3.5 * SR); a = int(tp * SR); b = min(N, a + L)
    tt = np.arange(b - a) / SR
    pl[a:b] += (np.sin(2 * np.pi * f * tt) * np.exp(-tt * 2.2) * .5 + np.sin(2 * np.pi * 2 * f * tt) * np.exp(-tt * 4) * .15).astype(np.float32)
    tp += rng.choice([2.0, 3.0, 4.0, 6.0])
pl = sosfilt(butter(2, 2600, 'low', fs=SR, output='sos'), pl).astype(np.float32)
bed = np.tanh((pad * 1.0 + pl * .35) * 1.4) / 1.4
# duck under the voice: envelope follower on the voice, smoothed
v = np.zeros(N, np.float32); v[:len(voice)] = voice
e = np.sqrt(sosfilt(butter(1, 3, 'low', fs=SR, output='sos'), v ** 2).clip(0))
e = e / (e.max() + 1e-9)
duck = 1 - .55 * np.clip(e * 6, 0, 1)
duck = sosfilt(butter(1, 1.2, 'low', fs=SR, output='sos'), duck).astype(np.float32)
# fades
bed *= np.clip(t / 4, 0, 1) * np.clip((dur - t) / 5, 0, 1)
bed = bed / (np.sqrt(np.mean(bed ** 2)) + 1e-9) * (10 ** (args.level / 20))
bed *= duck
st = np.stack([bed * (1 + .08 * np.sin(2 * np.pi * .05 * t)), bed * (1 - .08 * np.sin(2 * np.pi * .05 * t))], 1).astype(np.float32)
sf.write(os.path.join(ROOT, 'audio/music.wav'), st, SR, subtype='PCM_24')
mix = st + np.stack([v, v], 1)
tmp = os.path.join(ROOT, 'audio/mix_raw.wav'); sf.write(tmp, mix.astype(np.float32), SR, subtype='FLOAT')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', str(SR), '-c:a', 'pcm_s24le', os.path.join(ROOT, 'audio/mix.wav')], check=True)
os.remove(tmp)
print(f'mix: {dur / 60:.1f} min → audio/mix.wav')
