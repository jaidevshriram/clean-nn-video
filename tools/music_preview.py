# music_preview.py CUE OUT.m4a: render one world's music cue (40 s) with the narration over it, without a full-score render
#   python tools/music_preview.py ch05 out/previews/ch05.m4a
import sys, os, subprocess, numpy as np, soundfile as sf
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cid, out = sys.argv[1], sys.argv[2]
src = open(os.path.join(ROOT, 'tools/score.py')).read().split('# ---------- assemble')[0]
sys.argv = ['score.py']; g = {'__file__': os.path.join(ROOT, 'tools/score.py')}; exec(src, g)
TL = g['TL']; SR = g['SR']; ch = next(c for c in TL['chapters'] if c['id'] == cid); a = ch['s']; L = 40
x = g['render_cue'](cid, a, a + L, 7); x = x[:int(L * SR)]
x = x / (np.sqrt(np.mean(x ** 2)) + 1e-9) * g['S'][cid].get('gain', 1.0)
v, vsr = sf.read(os.path.join(ROOT, 'audio/voice.wav'), start=int(a * SR), frames=int(L * SR), dtype='float32'); v = v.mean(1) if v.ndim > 1 else v
e = np.sqrt(np.clip(g['lp'](v ** 2, 3, 1), 0, None)); e = e / (e.max() + 1e-9); duck = g['lp'](1 - .6 * np.clip(e * 7, 0, 1), 1.0, 1)
bed = x * 10 ** (-25 / 20) * duck[:len(x)]; mix = bed + v[:len(bed)]
sf.write(out + '.wav', np.stack([mix, mix], 1).astype(np.float32), SR)
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', out + '.wav', '-af', 'loudnorm=I=-16:TP=-1.5,afade=t=in:d=1,afade=t=out:st=38.5:d=1.5', '-c:a', 'aac', '-b:a', '192k', out], check=True)
print('ok', out)
os.remove(out + '.wav')
