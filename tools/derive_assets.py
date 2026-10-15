"""derive_assets.py: crop individual photos out of the essay's composite figures (into assets/blog/derived/, which is
gitignored like the rest of assets/blog). Run after tools/fetch_assets.mjs.

    python tools/derive_assets.py
"""
import os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, 'assets/blog')
OUT = os.path.join(B, 'derived'); os.makedirs(OUT, exist_ok=True)
CROPS = {
    'september-revision/rare-image-mini/rare-images-neurons@3x.webp': {
        'rare-banana': (48, 99, 606, 656), 'rare-hummingbird': (681, 99, 1239, 656), 'rare-wheelbarrow': (1314, 99, 1872, 656),
        'n58-vault-1': (48, 771, 318, 1041), 'n58-vault-2': (336, 771, 606, 1041),
        'n755-icecream-1': (681, 771, 951, 1041), 'n755-icecream-2': (969, 771, 1239, 1041),
        'n786-mower-1': (1314, 771, 1584, 1041), 'n786-mower-2': (1602, 771, 1872, 1041),
    },
}
for src, crops in CROPS.items():
    im = Image.open(os.path.join(B, 'raw', src)).convert('RGB')
    for name, box in crops.items():
        im.crop(box).save(os.path.join(OUT, name + '.jpg'), quality=92)
        print('  ' + name)
