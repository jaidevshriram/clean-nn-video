"""tts.py: narration → audio/cues/*.wav, audio/mix.wav, audio/timeline.json, out/subtitles.srt, out/chapters.txt

    python tools/tts.py                      # Kokoro (local), voice am_michael
    python tools/tts.py --voice=bm_george --speed=1.0
    ELEVENLABS_API_KEY=... python tools/tts.py --provider=elevenlabs --voice=<voice_id>

Each cue is synthesized on its own (cached by provider/voice/speed/text), sentence by sentence, with silences trimmed
and replaced by consistent gaps. Whisper then transcribes every cue: that gives word timings for the picture (wt() in
timeline.js) and a check that the voice said what the script says (cues that drift are listed in audio/qa.txt).
The timeline places cues back to back with the script's pauses, plus a hold before each chapter for its title card.
"""
import argparse, hashlib, json, os, re, sys, subprocess, base64, urllib.request
import numpy as np, soundfile as sf
from scipy.signal import resample_poly

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument('--provider', default='kokoro')
ap.add_argument('--voice', default='am_michael')
ap.add_argument('--speed', type=float, default=1.0)
ap.add_argument('--kokoro', default=os.environ.get('KOKORO_DIR', ''))
ap.add_argument('--only', default='')
ap.add_argument('--whisper', default='small.en')
ap.add_argument('--chapter-hold', type=float, default=2.6)
ap.add_argument('--lead', type=float, default=1.2)
ap.add_argument('--acts', default='ch03,ch09,ch13')          # act breaks get extra silence for the itinerary map
ap.add_argument('--act-hold', type=float, default=4.0)
ap.add_argument('--tail', type=float, default=10.0)          # silence after the last line, for the end card
args = ap.parse_args()

SR = 24000
CUE_DIR = os.path.join(ROOT, 'audio/cues'); os.makedirs(CUE_DIR, exist_ok=True)
os.makedirs(os.path.join(ROOT, 'out'), exist_ok=True)

# ---------- parse the script ----------
def parse(path):
    chapters, cues, ch = [], [], None
    for line in open(path, encoding='utf8'):
        line = line.rstrip('\n')
        m = re.match(r'^## (\w+) \| (.+)$', line)
        if m: ch = {'id': m.group(1), 'title': m.group(2), 'cues': []}; chapters.append(ch); continue
        m = re.match(r'^\[(\w+)\] (.+)$', line)
        if m and ch:
            body = m.group(2); pause = None
            pm = re.search(r'\(pause ([\d.]+)\)\s*$', body)
            if pm: pause = float(pm.group(1)); body = body[:pm.start()].strip()
            display = re.sub(r'\{([^|}]*)\|[^}]*\}', r'\1', body)
            spoken = re.sub(r'\{[^|}]*\|([^}]*)\}', r'\1', body)
            c = {'id': m.group(1), 'chapter': ch['id'], 'display': display, 'spoken': spoken, 'pause': pause}
            cues.append(c); ch['cues'].append(c['id'])
    return chapters, cues

chapters, cues = parse(os.path.join(ROOT, 'script/script.md'))
print(f'{len(chapters)} chapters, {len(cues)} cues')

def sentences(text):
    parts = re.split(r'(?<=[.!?])\s+(?=[A-Z"“(])', text.strip())
    return [p for p in parts if p.strip()]

def trim(a, thr=0.008, pad=0.04):
    env = np.convolve(np.abs(a), np.ones(240) / 240, mode='same')
    idx = np.where(env > thr)[0]
    if not len(idx): return a
    s, e = max(0, idx[0] - int(pad * SR)), min(len(a), idx[-1] + int(pad * SR * 2))
    return a[s:e]

# ---------- providers ----------
_kok = None
def kokoro(text):
    global _kok
    if _kok is None:
        from kokoro_onnx import Kokoro
        d = args.kokoro or os.path.join(os.environ.get('SCRATCH', ''), 'kokoro')
        _kok = Kokoro(os.path.join(d, 'kokoro-v1.0.onnx'), os.path.join(d, 'voices-v1.0.bin'))
    a, sr = _kok.create(text, voice=args.voice, speed=args.speed, lang='en-gb' if args.voice.startswith('b') else 'en-us')
    assert sr == SR
    return a.astype(np.float32)

def elevenlabs(text, prev_text='', next_text=''):
    key = os.environ['ELEVENLABS_API_KEY']
    body = json.dumps({'text': text, 'model_id': os.environ.get('ELEVENLABS_MODEL', 'eleven_multilingual_v2'), 'previous_text': prev_text, 'next_text': next_text,
                       'voice_settings': {'stability': .5, 'similarity_boost': .8, 'style': .15, 'use_speaker_boost': True, 'speed': args.speed}}).encode()
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{args.voice}?output_format=pcm_24000', data=body,
                                 headers={'xi-api-key': key, 'Content-Type': 'application/json'})
    pcm = urllib.request.urlopen(req, timeout=300).read()
    return (np.frombuffer(pcm, dtype='<i2').astype(np.float32) / 32768.0)

def synth_cue(c, i):
    key = hashlib.sha1(f"{args.provider}|{args.voice}|{args.speed}|{c['spoken']}".encode()).hexdigest()[:12]
    path = os.path.join(CUE_DIR, f"{c['id']}.{key}.wav")
    if os.path.exists(path): return path
    if args.provider == 'elevenlabs':
        prev = cues[i - 1]['spoken'] if i else ''; nxt = cues[i + 1]['spoken'] if i + 1 < len(cues) else ''
        a = trim(elevenlabs(c['spoken'], prev, nxt))
    else:
        parts = []
        for s in sentences(c['spoken']):
            a = trim(kokoro(s))
            parts += [a, np.zeros(int(.3 * SR), np.float32)]
        a = np.concatenate(parts[:-1])
    # level: peak-safe RMS normalisation per cue
    rms = np.sqrt(np.mean(a ** 2)) + 1e-9; a = a * min(.075 / rms, .97 / (np.abs(a).max() + 1e-9))
    for f in os.listdir(CUE_DIR):
        if f.startswith(c['id'] + '.') and f != os.path.basename(path): os.remove(os.path.join(CUE_DIR, f))
    sf.write(path, a, SR, subtype='PCM_16')
    print(f"  synth {c['id']}  {len(a) / SR:.1f}s")
    return path

for i, c in enumerate(cues):
    c['wav'] = synth_cue(c, i)

# ---------- words + QA via whisper ----------
WCACHE = os.path.join(ROOT, 'audio/words.json')
wcache = json.load(open(WCACHE)) if os.path.exists(WCACHE) else {}
need = [c for c in cues if os.path.basename(c['wav']) not in wcache]
if need:
    from faster_whisper import WhisperModel
    m = WhisperModel(args.whisper, device='cpu', compute_type='int8', cpu_threads=os.cpu_count())
    for c in need:
        a, _ = sf.read(c['wav'], dtype='float32')
        segs, _ = m.transcribe(resample_poly(a, 2, 3).astype(np.float32), word_timestamps=True, language='en', condition_on_previous_text=False)
        ws = [{'w': w.word.strip(), 's': round(float(w.start), 3), 'e': round(float(w.end), 3)} for s in segs for w in s.words]
        wcache[os.path.basename(c['wav'])] = ws
        print(f"  words {c['id']}  {len(ws)}")
    json.dump(wcache, open(WCACHE, 'w'))

def norm_words(s):
    s = s.lower().replace('-', ' ')
    return re.sub(r"[^a-z0-9' ]", ' ', s).split()

def wer(ref, hyp):
    r, h = norm_words(ref), norm_words(hyp)
    d = list(range(len(h) + 1))
    for i in range(1, len(r) + 1):
        p, d[0] = d[0], i
        for j in range(1, len(h) + 1):
            p, d[j] = d[j], min(d[j] + 1, d[j - 1] + 1, p + (r[i - 1] != h[j - 1]))
    return d[len(h)] / max(1, len(r))

def align(ref_text, hyp):
    """Give every script token a time: edit-distance alignment of script tokens to whisper words (numbers and
    spellings differ: "ninety-nine" vs "99"), interpolating times for script tokens whisper has no match for."""
    ref = ref_text.split()
    nr = [re.sub(r"[^a-z0-9']", '', r.lower()) for r in ref]
    nh = [re.sub(r"[^a-z0-9']", '', h['w'].lower()) for h in hyp]
    R, Hn = len(ref), len(hyp)
    D = np.zeros((R + 1, Hn + 1), np.int32); D[:, 0] = np.arange(R + 1); D[0, :] = np.arange(Hn + 1)
    for i in range(1, R + 1):
        for j in range(1, Hn + 1):
            D[i, j] = min(D[i - 1, j] + 1, D[i, j - 1] + 1, D[i - 1, j - 1] + (0 if nr[i - 1] == nh[j - 1] else 1))
    i, j, match = R, Hn, [None] * R
    while i > 0 and j > 0:
        if D[i, j] == D[i - 1, j - 1] + (0 if nr[i - 1] == nh[j - 1] else 1): match[i - 1] = j - 1; i -= 1; j -= 1
        elif D[i, j] == D[i - 1, j] + 1: i -= 1
        else: j -= 1
    out = [{'w': r, 's': hyp[m]['s'], 'e': hyp[m]['e']} if m is not None else {'w': r, 's': None, 'e': None} for r, m in zip(ref, match)]
    end = hyp[-1]['e'] if hyp else 0
    for k, o in enumerate(out):   # interpolate gaps between known neighbours
        if o['s'] is None:
            prv = next((out[q]['e'] for q in range(k - 1, -1, -1) if out[q]['s'] is not None), 0.0)
            nxt = next((out[q]['s'] for q in range(k + 1, len(out)) if out[q]['s'] is not None), end)
            o['s'] = round(prv + (nxt - prv) * .3, 3); o['e'] = round(prv + (nxt - prv) * .7, 3)
    return out

qa = []
for c in cues:
    c['heard'] = wcache[os.path.basename(c['wav'])]
    c['words'] = align(c['spoken'], c['heard'])
    c['wer'] = wer(c['spoken'], ' '.join(w['w'] for w in c['heard']))
    if c['wer'] > .12: qa.append(f"{c['id']}  WER {c['wer']:.2f}\n  script:  {c['spoken']}\n  heard:   {' '.join(w['w'] for w in c['heard'])}\n")
open(os.path.join(ROOT, 'audio/qa.txt'), 'w').write('\n'.join(qa) or 'all cues match\n')
print(f'QA: {len(qa)} cues flagged (audio/qa.txt)')

# ---------- timeline ----------
t = args.lead; out_cues = {}; ch_out = []; segs = []
for ch in chapters:
    hold = args.chapter_hold + (args.act_hold if ch['id'] in args.acts.split(',') else 0)
    if ch['id'] != chapters[0]['id']: t += hold
    ch_start = t - (hold if ch['id'] != chapters[0]['id'] else args.lead)
    for cid in ch['cues']:
        c = next(x for x in cues if x['id'] == cid)
        a, _ = sf.read(c['wav'], dtype='float32'); d = len(a) / SR
        out_cues[cid] = {'s': round(t, 3), 'e': round(t + d, 3), 'ch': ch['id'], 'text': c['display'],
                         'words': [{'w': w['w'], 's': round(t + w['s'], 3), 'e': round(t + w['e'], 3)} for w in c['words']]}
        segs.append((t, a))
        last = cid == ch['cues'][-1]
        t += d + (c['pause'] if c['pause'] is not None else (1.6 if last else .45))
    ch_out.append({'id': ch['id'], 'title': ch['title'], 's': round(ch_start, 3), 'first': ch['cues'][0], 'last': ch['cues'][-1]})
total = t + args.tail
mix = np.zeros(int(total * SR) + SR, np.float32)
for s, a in segs: i = int(round(s * SR)); mix[i:i + len(a)] += a
sf.write(os.path.join(ROOT, 'audio/voice.wav'), resample_poly(mix, 2, 1).astype(np.float32), SR * 2, subtype='PCM_24')
json.dump({'duration': round(total, 3), 'voice': f'{args.provider}:{args.voice}@{args.speed}', 'chapters': ch_out, 'cues': out_cues},
          open(os.path.join(ROOT, 'audio/timeline.json'), 'w'), indent=0)

# ---------- subtitles: display text in short chunks, timed through the cue's words ----------
def fmt(x): h, r = divmod(x, 3600); m, s = divmod(r, 60); return f'{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s % 1) * 1000)) % 1000:03d}'
def chunks(text, n=84):
    out, cur = [], ''
    for tok in re.split(r'(?<=[.!?,;:])\s+', text):
        for w in tok.split(' '):
            if len(cur) + len(w) + 1 > n and cur: out.append(cur); cur = w
            else: cur = (cur + ' ' + w).strip()
        if len(cur) > n * .55: out.append(cur); cur = ''
    if cur: out.append(cur)
    return out
srt, k = [], 1
for cid, c in out_cues.items():
    ws = c['words'] or [{'s': c['s'], 'e': c['e']}]
    parts = chunks(c['text']); L = sum(len(p) for p in parts); acc = 0
    def at(f):  # time at character fraction f, through the word timeline
        i = min(len(ws) - 1, int(f * len(ws))); return ws[i]['s'] if f < 1 else ws[-1]['e']
    for p in parts:
        a, b = at(acc / L), at((acc + len(p)) / L) if acc + len(p) < L else c['e']
        srt.append(f"{k}\n{fmt(a)} --> {fmt(max(b, a + .8))}\n{p}\n"); k += 1; acc += len(p)
open(os.path.join(ROOT, 'out/subtitles.srt'), 'w').write('\n'.join(srt))
open(os.path.join(ROOT, 'out/chapters.txt'), 'w').write('\n'.join(f"{int(c['s'] // 60):02d}:{int(c['s'] % 60):02d} {c['title']}" for c in ch_out) + '\n')
print(f'timeline: {total / 60:.1f} min, {len(out_cues)} cues → audio/timeline.json, audio/voice.wav, out/subtitles.srt')
