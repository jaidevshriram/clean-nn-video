# music_tour.py OUT.m4a: 15 s of every world's music, in order, with the narration over it and a short gap between
import sys, os, subprocess, numpy as np, soundfile as sf
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[1]
src = open(os.path.join(ROOT, 'tools/score.py')).read().split('# ---------- assemble')[0]
sys.argv = ['score.py']; g = {'__file__': os.path.join(ROOT, 'tools/score.py')}; exec(src, g)
TL, SR, S = g['TL'], g['SR'], g['S']; L = 15; parts = []
for i, ch in enumerate(TL['chapters']):
    a = ch['s'] + 6; x = g['render_cue'](ch['id'], a, a + L, 100 + i)[:int(L * SR)]
    x = x / (np.sqrt(np.mean(x ** 2)) + 1e-9) * S[ch['id']].get('gain', 1.0)
    v, _ = sf.read(os.path.join(ROOT, 'audio/voice.wav'), start=int(a * SR), frames=int(L * SR), dtype='float32'); v = v.mean(1) if v.ndim > 1 else v
    e = np.sqrt(np.clip(g['lp'](v ** 2, 3, 1), 0, None)); e = e / (e.max() + 1e-9); duck = g['lp'](1 - .72 * np.clip(e * 7, 0, 1), 1.0, 1)
    m = x * 10 ** (-25 / 20) * duck[:len(x)] + v[:len(x)]; f = np.clip(np.arange(len(m)) / (SR * .6), 0, 1) * np.clip((len(m) - np.arange(len(m))) / (SR * .8), 0, 1)
    parts += [m * f, np.zeros(int(.8 * SR))]; print(ch['id'], S[ch['id']]['layers'])
mix = np.concatenate(parts); tmp = out + '.wav'
sf.write(tmp, np.stack([mix, mix], 1).astype(np.float32), SR)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-af', 'loudnorm=I=-16:TP=-1.5', '-c:a', 'aac', '-b:a', '160k', out], check=True)
import os; os.remove(tmp); print('ok', out)
