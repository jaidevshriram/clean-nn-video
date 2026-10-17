"""score.py: a per-world music score, synthesized from scratch (no samples, no API).

Each of the film's 16 worlds gets its own cue in a fitting genre (space ambient, music box, 1930s ragtime, noir jazz,
spy surf, harpsichord, pizzicato, game-show swing, eerie drone, chiptune, celesta, pub piano, marimba, airy arps,
retro-futurist, jungle finale). Cues crossfade at chapter seams, each seam gets a whoosh + chime sting, the bed ducks
under the voice, and swells in the holds. Writes audio/music.wav and the final audio/mix.wav (-16 LUFS).

    python tools/score.py [--level=-25]
"""
import json, os, argparse, subprocess
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, lfilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser(); ap.add_argument('--level', type=float, default=-25.0); ap.add_argument('--only', default=''); ap.add_argument('--out', default='audio')
args = ap.parse_args()
SR = 48000
voice, vsr = sf.read(os.path.join(ROOT, 'audio/voice.wav'), dtype='float32'); assert vsr == SR
if voice.ndim > 1: voice = voice.mean(1)
TL = json.load(open(os.path.join(ROOT, 'audio/timeline.json')))
DUR = max(len(voice) / SR, TL['duration']); N = int(DUR * SR) + SR
CH = TL['chapters']; BOUNDS = [c['s'] for c in CH] + [DUR]
mtof = lambda m: 440.0 * 2 ** ((m - 69) / 12)
lp = lambda x, f, o=2: sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
hp = lambda x, f, o=2: sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)

# ---------- instruments: (freq, dur seconds, velocity, rng) -> mono array ----------
def env_adsr(n, a=.01, d=.1, s=.7, r=.2, L=None):
    L = L or n / SR; t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-4), np.where(t < a + d, 1 - (1 - s) * (t - a) / max(d, 1e-4), s))
    rel = np.clip((L - t) / max(r, 1e-4), 0, 1); return e * rel
def osc(kind, f, t, ph=0):
    p = 2 * np.pi * f * t + ph
    if kind == 'sine': return np.sin(p)
    if kind == 'tri': return 2 / np.pi * np.arcsin(np.sin(p))
    if kind == 'square': return np.sign(np.sin(p)) * .6
    if kind == 'pulse': return np.where((f * t) % 1 < .25, .6, -.6)
    if kind == 'saw': return 2 * ((f * t) % 1) - 1
def I_pad(f, d, v, r):
    n = int((d + 1.5) * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for det in (-.004, 0, .004): x += osc('saw', f * (1 + det), t, r.uniform(0, 6))
    return lp(x * env_adsr(n, 1.2, .5, .8, 1.4, d + 1.5) * v * .25, 1200)
def I_warm(f, d, v, r):   # soft sine/triangle pad
    n = int((d + 1.5) * SR); t = np.arange(n) / SR
    x = osc('sine', f, t) + .3 * osc('tri', 2 * f, t) + .1 * osc('sine', 3 * f, t)
    return x * env_adsr(n, .8, .4, .8, 1.3, d + 1.5) * (1 + .1 * np.sin(2 * np.pi * .3 * t)) * v * .3
def I_bell(f, d, v, r, ratio=3.5, dec=2.2):
    n = int(min(d + 3, 4) * SR); t = np.arange(n) / SR
    mod = np.sin(2 * np.pi * f * ratio * t) * 2.5 * np.exp(-t * 3)
    return np.sin(2 * np.pi * f * t + mod) * np.exp(-t * dec) * v * .4
def I_musicbox(f, d, v, r): return I_bell(f, d, v, r, ratio=5.01, dec=3.5) + I_bell(2 * f, d, v * .3, r, 7, 5)
def I_celesta(f, d, v, r): return I_bell(f, d, v, r, ratio=4.0, dec=2.8)
def I_pluck(f, d, v, r, bright=.5, dec=.996):     # Karplus-Strong
    n = int(min(d + 1.5, 3) * SR); P = max(2, int(SR / f)); buf = r.uniform(-1, 1, P); out = np.zeros(n)
    for i in range(0, n, P):
        seg = buf.copy(); out[i:i + P] = seg[:min(P, n - i)]
        buf = dec * .5 * (buf + np.roll(buf, 1))
    return out * v * .6
def I_piano(f, d, v, r):
    n = int(min(d + 1.2, 3) * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for h, a in [(1, 1), (2, .5), (3, .25), (4, .12), (5, .06)]: x += a * np.sin(2 * np.pi * f * h * t * (1 + .0004 * h * h)) * np.exp(-t * (1.6 + h * .9))
    return x * np.clip(t / .004, 0, 1) * v * .35
def I_marimba(f, d, v, r):
    n = int(1.2 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * np.exp(-t * 5) + .25 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 14)) * v * .5
def I_harpsi(f, d, v, r):
    n = int(min(d + .8, 2) * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for h in range(1, 9): x += (1 / h ** .7) * np.sin(2 * np.pi * f * h * t) * np.exp(-t * (3 + h))
    return x * v * .2
def I_brass(f, d, v, r):
    n = int((d + .3) * SR); t = np.arange(n) / SR; x = osc('saw', f, t) + .5 * osc('saw', f * 1.003, t)
    e = env_adsr(n, .04, .1, .8, .15, d + .3); cut = 600 + 2600 * np.clip(t / .08, 0, 1)
    return lp(x * e, 2400) * v * .22
def I_flute(f, d, v, r):
    n = int((d + .4) * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t + .004 * f / 5 * np.sin(2 * np.pi * 5 * t)) + .08 * r.normal(0, 1, n)
    return lp(x, 3500) * env_adsr(n, .08, .1, .85, .3, d + .4) * v * .3
def I_chip(f, d, v, r):
    n = int(d * SR); t = np.arange(n) / SR; return osc('pulse', f, t) * env_adsr(n, .002, .05, .6, .04, d) * v * .22
def I_tri(f, d, v, r):
    n = int(d * SR); t = np.arange(n) / SR; return osc('tri', f, t) * env_adsr(n, .002, .05, .9, .03, d) * v * .5
def I_bass(f, d, v, r):
    n = int((d + .1) * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t) + .4 * np.sin(4 * np.pi * f * t) * np.exp(-t * 6)
    return x * env_adsr(n, .005, .15, .6, .08, d + .1) * v * .7
def I_upright(f, d, v, r):
    n = int(min(d + .4, 1.5) * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + .3 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 3.5) * np.clip(t / .006, 0, 1) * v * .8
def I_guitar(f, d, v, r):   # twangy surf guitar: bright pluck + tremolo
    x = I_pluck(f, d, v * 1.3, r); t = np.arange(len(x)) / SR; return x * (1 + .35 * np.sin(2 * np.pi * 7 * t))
def I_strings(f, d, v, r):
    n = int((d + .8) * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for det in (-.003, .003): x += osc('saw', f * (1 + det) * (1 + .003 * np.sin(2 * np.pi * 5.5 * t)), t, r.uniform(0, 6))
    return lp(x * env_adsr(n, .25, .2, .85, .5, d + .8), 2000) * v * .18
def I_vibes(f, d, v, r):   # vibraphone: soft sine bar, a touch of 4th partial, motor tremolo
    n = int(min(d + 2, 3.5) * SR); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t) + .22 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 6)
    return x * np.exp(-t * 1.3) * np.clip(t / .006, 0, 1) * (1 - .22 * (.5 + .5 * np.sin(2 * np.pi * 5.2 * t))) * v * .33
def I_ep(f, d, v, r):      # electric piano (tine): gentle FM bell that settles into a round sine
    n = int(min(d + 1.6, 3) * SR); t = np.arange(n) / SR
    mod = np.sin(2 * np.pi * f * t) * 1.1 * np.exp(-t * 5)
    return np.sin(2 * np.pi * f * t + mod) * np.exp(-t * 1.7) * np.clip(t / .004, 0, 1) * v * .34
INST = {k[2:]: fn for k, fn in globals().items() if k.startswith('I_')}
# drums
def D(kind, v, r):
    if kind == 'kick': n = int(.35 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * (45 + 90 * np.exp(-t * 30)) * t) * np.exp(-t * 9) * v
    if kind == 'snare': n = int(.25 * SR); t = np.arange(n) / SR; return (hp(r.normal(0, 1, n), 1500) * .6 + .4 * np.sin(2 * np.pi * 190 * t)) * np.exp(-t * 18) * v * .6
    if kind == 'hat': n = int(.06 * SR); t = np.arange(n) / SR; return hp(r.normal(0, 1, n), 7000) * np.exp(-t * 70) * v * .35
    if kind == 'brush': n = int(.22 * SR); t = np.arange(n) / SR; return lp(hp(r.normal(0, 1, n), 2500), 6000) * np.clip(t / .05, 0, 1) * np.exp(-t * 12) * v * .25
    if kind == 'shaker': n = int(.08 * SR); t = np.arange(n) / SR; return hp(r.normal(0, 1, n), 5000) * np.sin(np.pi * t / .08) * v * .25
    if kind == 'noise': n = int(.08 * SR); t = np.arange(n) / SR; return np.sign(r.normal(0, 1, n)) * np.exp(-t * 40) * v * .25
    if kind == 'tick': n = int(.02 * SR); t = np.arange(n) / SR; return hp(r.normal(0, 1, n), 3000) * np.exp(-t * 200) * v * .4
    if kind == 'bongo': n = int(.2 * SR); t = np.arange(n) / SR; return np.sin(2 * np.pi * (300 + 120 * np.exp(-t * 40)) * t) * np.exp(-t * 16) * v * .5
    if kind == 'crackle': n = int(.004 * SR); return r.normal(0, 1, n) * v * .5

# ---------- harmony ----------
MODES = {'maj': [0, 2, 4, 5, 7, 9, 11], 'min': [0, 2, 3, 5, 7, 8, 10], 'dor': [0, 2, 3, 5, 7, 9, 10], 'lyd': [0, 2, 4, 6, 7, 9, 11], 'mix': [0, 2, 4, 5, 7, 9, 10], 'hmin': [0, 2, 3, 5, 7, 8, 11]}
def chord(root, mode, deg, ext=4):
    sc = MODES[mode]; return [root + sc[(deg + 2 * k) % 7] + 12 * ((deg + 2 * k) // 7) for k in range(ext)]
def scale_note(root, mode, i): sc = MODES[mode]; return root + sc[i % 7] + 12 * (i // 7)

# ---------- the world styles ----------
# bpm, root (MIDI), mode, progression (scale degrees, one per bar), swing, layers
S = {
 'ch00': dict(bpm=66, root=50, mode='lyd', prog=[0, 0, 4, 1], layers=['pad', 'bells', 'drone']),
 'ch01': dict(bpm=104, root=60, mode='maj', prog=[0, 5, 3, 4], layers=['musicbox_arp', 'warm', 'tri_bass_soft', 'tick']),
 'ch02': dict(bpm=126, root=55, mode='maj', prog=[0, 0, 4, 4, 0, 3, 4, 0], layers=['ragtime', 'oompah', 'crackle'], lofi=True),
 'ch03': dict(bpm=78, root=50, mode='dor', prog=[0, 3, 0, 4], swing=.62, layers=['walk', 'brush', 'jazz_chords', 'sax']),
 'ch04': dict(bpm=112, root=50, mode='hmin', prog=[0, 0, 5, 4], swing=.6, layers=['spy_bass', 'vibes_comp', 'brush', 'flute']),   # cool 60s spy jazz: the minor-major 7th
 'ch05': dict(bpm=72, root=50, mode='min', prog=[0, 5, 3, 4], layers=['piano_soft', 'warm', 'bass_soft'], gain=.5),   # foggy and calm: slow soft piano over a pad
 'ch06': dict(bpm=92, root=62, mode='maj', prog=[0, 3, 5, 4], layers=['pizz', 'flute', 'warm']),
 'ch07': dict(bpm=144, root=58, mode='maj', prog=[0, 5, 1, 4], swing=.6, layers=['brass_stabs', 'walk', 'kit_swing', 'piano_comp']),
 'ch08': dict(bpm=60, root=45, mode='min', prog=[0, 0, 5, 5], layers=['drone', 'heartbeat', 'eerie']),
 'ch09': dict(bpm=124, root=57, mode='min', prog=[0, 5, 2, 6], layers=['chip_arp', 'chip_lead', 'tri_bass', 'noise_kit']),
 'ch10': dict(bpm=100, root=65, mode='maj', prog=[0, 3, 1, 4], layers=['celesta_arp', 'pizz', 'warm']),
 'ch11': dict(bpm=112, root=60, mode='mix', prog=[0, 3, 4, 3], swing=.58, layers=['pub_piano', 'walk', 'kit_swing']),
 'ch12': dict(bpm=96, root=57, mode='dor', prog=[0, 6, 3, 4], layers=['marimba', 'shaker', 'warm', 'bass_roots']),
 'ch13': dict(bpm=84, root=53, mode='lyd', prog=[0, 4, 5, 3], layers=['pluck_arp', 'pad', 'bass_roots']),
 'ch14': dict(bpm=100, root=60, mode='maj', prog=[0, 4, 5, 3], layers=['ep_arp', 'warm', 'bass_roots', 'tick']),   # warm retro-future: tine piano over a pad
 'ch15': dict(bpm=76, root=55, mode='maj', prog=[0, 5, 3, 4, 0, 5, 3, 0], layers=['piano_soft', 'warm', 'bass_soft'], finale=True, gain=.55),   # a calm, warm ending under the reflective lines
}

def place(buf, x, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf) or i + len(x) <= 0: return
    a = max(0, i); b = min(len(buf), i + len(x)); buf[a:b] += x[a - i:b - i] * gain

def render_cue(cid, t0, t1, seed):
    st = S[cid]; r = np.random.default_rng(seed); L = t1 - t0; n = int(L * SR) + SR
    out = np.zeros(n); beat = 60 / st['bpm']; bar = 4 * beat; sw = st.get('swing', .5)
    root, mode, prog = st['root'], st['mode'], st['prog']
    eighth = lambda b, k: b * bar + (k // 2) * beat + (sw if k % 2 else 0) * beat   # time of the k-th eighth in bar b
    nb = int(L / bar) + 1
    mel_i = 7
    for b in range(nb):
        deg = prog[b % len(prog)]; C = chord(root, mode, deg); bt = b * bar
        prog_bright = st.get('brighten') and bt > L * .7
        if prog_bright: C = chord(root + 3, 'maj', deg)
        for lay in st['layers']:
            if lay == 'pad':
                for m in C: place(out, I_pad(mtof(m - 12), bar, .5, r), bt)
            elif lay == 'warm':
                for m in C[:3]: place(out, I_warm(mtof(m - 12), bar, .45, r), bt)
            elif lay == 'brass_pad':
                for m in C[:3]: place(out, I_strings(mtof(m), bar, .6, r), bt)
            elif lay == 'strings':
                for m in C[:3]: place(out, I_strings(mtof(m), bar, .55, r), bt)
            elif lay == 'drone': place(out, I_warm(mtof(root - 24), bar, .7, r), bt); place(out, I_warm(mtof(root - 17), bar, .3, r), bt)
            elif lay == 'bells':
                for k in range(3):
                    if r.random() < .6: place(out, I_bell(mtof(scale_note(root + 12, mode, r.integers(0, 10))), 3, .35, r), bt + r.integers(0, 8) * beat / 2)
            elif lay in ('musicbox_arp', 'celesta_arp', 'harpsi_arp', 'pluck_arp', 'bright_arp', 'chip_arp'):
                fn = {'musicbox_arp': I_musicbox, 'celesta_arp': I_celesta, 'harpsi_arp': I_harpsi, 'pluck_arp': I_pluck, 'bright_arp': I_pluck, 'chip_arp': I_chip}[lay]
                oct = {'musicbox_arp': 24, 'celesta_arp': 24, 'harpsi_arp': 12, 'pluck_arp': 12, 'bright_arp': 12, 'chip_arp': 12}[lay]
                pat = [0, 1, 2, 3, 2, 1, 2, 3] if lay != 'chip_arp' else [0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3, 0, 2, 1, 3]
                step = 8 if lay != 'chip_arp' else 16
                for k in range(step):
                    tk = bt + k * bar / step if lay == 'chip_arp' else eighth(b, k)
                    place(out, fn(mtof(C[pat[k % len(pat)]] + oct), bar / step, .5 if lay != 'chip_arp' else .45, r), tk)
            elif lay == 'pizz':
                for k in (0, 2, 3, 5, 6):
                    place(out, I_pluck(mtof(C[k % 3] + 12), .4, .45, r), eighth(b, k))
            elif lay == 'marimba':
                for k in range(8):
                    if k in (0, 3, 5, 6) or r.random() < .3: place(out, I_marimba(mtof(C[(k * 2) % 4] + 12), .3, .55, r), eighth(b, k))
            elif lay in ('flute', 'sax', 'chip_lead', 'eerie'):
                fn = {'flute': I_flute, 'sax': I_brass, 'chip_lead': I_chip, 'eerie': I_warm}[lay]
                if b % 2 == 1 or lay == 'chip_lead':
                    k = 0
                    while k < 8:
                        dlen = r.choice([1, 2, 2, 3]); mel_i = int(np.clip(mel_i + r.choice([-2, -1, 1, 1, 2]), 4, 13))
                        if r.random() < .8:
                            place(out, fn(mtof(scale_note(root + (12 if lay != 'eerie' else 0), mode, mel_i)), dlen * beat / 2 * .95, .35 if lay != 'chip_lead' else .3, r), eighth(b, k))
                        k += dlen
            elif lay == 'tri_bass' or lay == 'tri_bass_soft':
                for k in range(8): place(out, I_tri(mtof(C[0] - 12 + (7 if k % 4 == 2 else 0)), beat / 2 * .9, .5 if lay == 'tri_bass' else .25, r), eighth(b, k))
            elif lay == 'bass_roots':
                for q in range(4): place(out, I_bass(mtof(C[0] - 24 + (7 if q == 2 else 0)), beat * .9, .5, r), bt + q * beat)
            elif lay == 'walk':
                nxt = chord(root, mode, prog[(b + 1) % len(prog)])[0]
                line = [C[0], C[1], C[2], nxt - 1 if r.random() < .5 else nxt + 1]
                for q in range(4): place(out, I_upright(mtof(line[q] - 24), beat, .6, r), bt + q * beat)
            elif lay == 'oompah':
                for q in range(4): place(out, I_piano(mtof(C[0] - 24 if q % 2 == 0 else C[0] - 17), beat, .55, r), bt + q * beat)
            elif lay == 'ragtime':
                for q in (1, 3):
                    for m in C[:3]: place(out, I_piano(mtof(m), beat * .5, .3, r), bt + q * beat)
                for k in range(8):
                    if k in (0, 3, 4, 6, 7) or r.random() < .2: place(out, I_piano(mtof(scale_note(root + 12, mode, (deg + [0, 2, 4, 7, 4, 2, 5, 4][k]) % 14)), beat / 2, .38, r), eighth(b, k) + (beat / 4 if k in (3,) else 0))
            elif lay == 'jazz_chords':
                for at in ((beat * 1.5) if b % 2 else beat * .5, beat * 2.5):
                    for m in C: place(out, I_piano(mtof(m), beat * .7, .2, r), bt + at)
            elif lay == 'piano_comp':
                for q in (1, 3):
                    for m in C: place(out, I_piano(mtof(m), beat * .5, .22, r), bt + q * beat)
            elif lay == 'pub_piano':
                for k in range(8):
                    if k % 2 == 1:
                        for m in C[:3]: place(out, I_piano(mtof(m), beat * .4, .25, r), eighth(b, k))
                    else: place(out, I_piano(mtof(C[0] - 12), beat * .4, .35, r), eighth(b, k))
            elif lay == 'spy_riff':
                riff = [0, 0, 1, 1, 2, 2, 1, 1]   # semitone climb: the classic spy line
                for k in range(8): place(out, I_guitar(mtof(root - 12 + [0, 0, 1, 1, 2, 2, 1, 1][k] + (7 if b % 4 == 2 else 0)), beat / 2, .5, r), eighth(b, k))
                if b % 2 == 1: place(out, I_guitar(mtof(root + 12 + 3), beat * 2, .4, r), bt + beat * 2)
            elif lay == 'spy_bass':      # swung upright ostinato with the spy's flat sixth
                line = [0, None, 0, 7, 8, 7, 5, 3]
                for k, iv in enumerate(line):
                    if iv is not None: place(out, I_upright(mtof(C[0] - 24 + iv), beat * .55, .55 if k % 2 == 0 else .42, r), eighth(b, k))
            elif lay == 'vibes_comp':    # soft vibes on the offbeats: the full 4-note chord (i = minor-major 7th)
                for at in ((beat * 1.5, beat * 3.5) if b % 2 == 0 else (beat * 1.5,)):
                    for m in C: place(out, I_vibes(mtof(m), beat * 1.5, .2, r), bt + at + (sw - .5) * beat)
            elif lay == 'ep_arp':
                pat = [0, 1, 2, 1, 3, 2, 1, 2]
                for k in range(8): place(out, I_ep(mtof(C[pat[k]] + 12), bar / 8, .42 if k % 2 == 0 else .3, r), eighth(b, k))
            elif lay == 'piano_soft':    # a slow broken chord in quarters, quiet, letting each note ring
                for q, ci in enumerate([0, 2, 1, 2]): place(out, I_piano(mtof(C[ci] + 12), beat * 1.8, .26 if q else .32, r), bt + q * beat)
            elif lay == 'bass_soft':
                place(out, I_bass(mtof(C[0] - 24), bar * .9, .32, r), bt)
            elif lay == 'brass_hits':
                if b % 4 == 3:
                    for m in C[:3]: place(out, I_brass(mtof(m), beat * .8, .5, r), bt + 3 * beat)
            elif lay == 'brass_stabs':
                for at in (0, 1.5 * beat, 3 * beat):
                    if at == 0 or r.random() < .7:
                        for m in C[:3]: place(out, I_brass(mtof(m), beat * .45, .45, r), bt + at)
            elif lay == 'brush':
                for k in range(8): place(out, D('brush', .5 if k % 2 == 0 else .3, r), eighth(b, k))
            elif lay == 'kick_snare':
                for q in range(4): place(out, D('kick' if q % 2 == 0 else 'snare', .55, r), bt + q * beat)
                for k in range(8): place(out, D('hat', .35, r), eighth(b, k))
            elif lay == 'kit_swing':
                for q in range(4): place(out, D('kick' if q in (0, 2) else 'snare', .4, r), bt + q * beat)
                for k in range(8): place(out, D('hat', .4 if k % 2 == 0 else .25, r), eighth(b, k))
            elif lay == 'noise_kit':
                for q in range(4): place(out, D('kick' if q % 2 == 0 else 'noise', .5, r), bt + q * beat)
                for k in range(8): place(out, D('noise', .12, r), eighth(b, k))
            elif lay == 'bongo':
                for k in range(8):
                    if k in (0, 3, 5, 6): place(out, D('bongo', .5, r), eighth(b, k))
            elif lay == 'shaker':
                for k in range(8): place(out, D('shaker', .5 if k % 2 else .3, r), eighth(b, k))
            elif lay == 'tick':
                for q in range(4): place(out, D('tick', .3, r), bt + q * beat)
            elif lay == 'heartbeat':
                for at in (0, .28, 2 * beat, 2 * beat + .28): place(out, D('kick', .45, r), bt + at)
            elif lay == 'crackle':
                for _ in range(int(bar * 25)): place(out, D('crackle', r.uniform(.05, .4), r), bt + r.uniform(0, bar))
    if st.get('lofi'): out = lp(hp(out, 250), 3200) * 1.4   # 1930s gramophone band
    if st.get('finale'):
        fin = np.zeros(n); end = L - 9
        for m in chord(root, 'maj', 0, 5): place(fin, I_strings(mtof(m), 7, .9, r), end); place(fin, I_bell(mtof(m + 12), 4, .4, r), end)
        out = out * np.clip((end - np.arange(n) / SR) / 1.5 + 1, 0, 1) + fin
    return out

# ---------- assemble ----------
music = np.zeros(N)
for i, c in enumerate(CH):
    if args.only and c['id'] not in args.only.split(','): continue
    a, b = BOUNDS[i], BOUNDS[i + 1]
    x = render_cue(c['id'], a - 1.0, b + 1.6, 100 + i)
    rms = np.sqrt(np.mean(x[:int((b - a) * SR)] ** 2)) + 1e-9; x = x / rms * S[c['id']].get('gain', 1.0)   # per-world level
    tt = np.arange(len(x)) / SR + a - 1.0
    fade = np.clip((tt - (a - 1.0)) / 1.2, 0, 1) * np.clip((b + 1.6 - tt) / 1.4, 0, 1)
    place(music, x * fade, a - 1.0)
    print(f'  cue {c["id"]}  {S[c["id"]]["layers"]}')
# reverb: four feedback combs + a lowpass, mixed wet
def reverb(x, wet=.22):
    y = np.zeros_like(x)
    for d, g in [(1557, .78), (1617, .77), (1491, .79), (1422, .8)]:
        dd = int(d * SR / 44100); y += lfilter([1], np.r_[1, np.zeros(dd - 1), -g], x)
    return x + lp(y / 4, 4000) * wet
music = reverb(music)
# portal stings: a whoosh rising into each seam, then a soft chime
r = np.random.default_rng(3)
sting = np.zeros(N)
for i, c in enumerate(CH[1:], 1):
    s = c['s']; L = int(1.4 * SR); t = np.arange(L) / SR
    wh = lp(hp(r.normal(0, 1, L), 400), 3500) * (t / 1.4) ** 2.5; place(sting, wh * .3, s - 1.2)   # a gentler whoosh
    for k, m in enumerate([72, 76, 79, 84]): place(sting, I_bell(mtof(m), 2, .3, r, 3.0, 2.5), s + .15 + k * .07)   # a soft, low chime
sting = sting / (np.sqrt(np.mean(sting[sting != 0] ** 2)) + 1e-9) * .5 if np.any(sting) else sting
# duck under the voice, swell in the holds
v = np.zeros(N); v[:len(voice)] = voice
e = np.sqrt(np.clip(lp(v ** 2, 3, 1), 0, None)); e = e / (e.max() + 1e-9)
duck = 1 - .72 * np.clip(e * 7, 0, 1); duck = lp(duck, 1.0, 1)
t = np.arange(N) / SR
bed = music * np.clip(t / 3, 0, 1) * np.clip((DUR + .5 - t) / 3, 0, 1)
bed = bed / (np.sqrt(np.mean(bed ** 2)) + 1e-9) * 10 ** (args.level / 20) * duck + sting * 10 ** ((args.level - 4) / 20)
bed = np.tanh(bed * 1.2) / 1.2
st = np.stack([bed * (1 + .1 * np.sin(2 * np.pi * .07 * t)), bed * (1 - .1 * np.sin(2 * np.pi * .07 * t))], 1).astype(np.float32)
sf.write(os.path.join(ROOT, args.out, 'music.wav'), st, SR, subtype='PCM_24')
mix = st + np.stack([v, v], 1).astype(np.float32)
tmp = os.path.join(ROOT, args.out, 'mix_raw.wav'); sf.write(tmp, mix, SR, subtype='FLOAT')
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', str(SR), '-c:a', 'pcm_s24le', os.path.join(ROOT, args.out, 'mix.wav')], check=True)
os.remove(tmp)
print(f'score: {DUR / 60:.1f} min → audio/music.wav, audio/mix.wav')
