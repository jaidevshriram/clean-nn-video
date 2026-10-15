// ch00 Cold open: a phone → a city of lights → the knot → "we were wrong" → title.
(() => {
  const V = 'blog/raw/v-figure-10x/';
  const MIX = [V + 'p47742', V + 'c4d201c', V + 'c5a94a', V + 'n1070575', V + 'pPool13', V + 'n282687', V + 'c5a317d', V + 'n1158528', V + 'c4d493a'];
  const DUSK = [[0, '#141842'], [.38, '#3E3170'], [.66, '#B0628E'], [.84, '#F09C76'], [1, '#FAD39A']];

  // 1 · the phone, the question, and the push into the screen
  function phone(t, lt, dur) {
    const a = cs('open_phone'), e = ce('open_phone'), q = 'How does an AI actually think?';
    const n = Math.round(q.length * seg(t, a + .4, a + 2.6));
    const z = kf(t, [[a - 1, 1], [e - 1.6, 1.12], [e + .3, 9]], easeIn);
    camBegin(960, 556, z);
    phoneRoom(t, q.slice(0, n) + (n < q.length && Math.floor(t * 3) % 2 ? '|' : ''));
    camEnd();
    // the screen's glass becomes a field of tiny lights
    const k = seg(t, e - .9, e + .2);
    if (k > 0) { sky(t, [[0, '#0E1236'], [1, '#2A2560']], { stars: 260, starH: H + 800 }); ctx.save(); ctx.globalAlpha = 1; ctx.restore(); fade(1 - k, '#DCEBFA'); }
    if (lt < 1) fade(1 - ease(lt), PAL.ink);
  }

  // 2 · falling toward the city: the lights are windows; one building flares as a pulse arrives
  function fall(t, lt, dur) {
    const a = cs('open_city'), e = ce('open_city'), tn = wt('open_city', 'neuron');
    sky(t, DUSK, { stars: 150, starH: 380, clouds: 6, cloudY: 430, cloudCol: '#E9A5A8' });
    glow(1100, 600, 600, '#FFB46A', .5);
    const cam = camKeys(t, [[a - .3, 3600, 160, .42], [a + 3, 3500, 420, .55], [tn - 1.4, 3140, 610, .92], [tn + 1.2, 3080, 640, 1.08], [e + .2, 3300, 560, .7]], .3);
    cityPanorama(t, cam[0]);
    const flare = tn ? clamp(1.2 - Math.abs(t - tn - .3) * .9) : 0;
    cityStreet(t, { on: (i, S) => i === 6 ? .3 + .7 * flare : .3 + .25 * Math.sin(t * .8 + i * 1.7) });
    // a pulse travels along the rooftops toward house 6, then on
    for (let i = 3; i < 9; i++) { const t0 = a + 1 + (i - 3) * .9; streetArc(i, i + 1, seg(t, t0, t0 + .9)); }
    pixelRain(t, -600, 600, 840, .8);
    camEnd();
    for (let i = 0; i < 40; i++) { const fx = hash(i * 3.3) * W, fy = H - frac(t * .06 + hash(i)) * H; glow(fx, fy, 8, '#FFD58A', .5 * Math.sin(frac(t * .06 + hash(i)) * Math.PI)); }
    if (lt < .5) fade(1 - ease(lt / .5), '#0E1236');
  }

  // 3–5 · the knot rises; the Unfolding Machine starts on it; the Professor turns to us
  function knotShot(t, lt, dur) {
    const k0 = cs('open_knot'), u = cs('open_untangle'), w = cs('open_wrong'), e = ce('open_wrong');
    sky(t, [[0, '#15183C'], [.6, '#3E3368'], [1, '#7C5A86']], { stars: 120, starH: 700 });
    glow(960, 560, 640, '#C9A0D0', .3);
    const rise = seg(t, wt('open_knot', 'tangled') - 2.2, wt('open_knot', 'fit') + .3), unpull = seg(t, u + 1.6, w + 1), sag = seg(t, wt('open_wrong', 'read') - .5, e);
    const morph = rise - .28 * unpull - .12 * sag;
    const [sx, sy] = t < wt('open_knot', 'fit') + .5 ? shakeXY(t, 9 * Math.sin(Math.PI * rise)) : [0, 0];
    camKeys(t, [[k0 - .3, 960, 760, 1.12], [k0 + 2, 960, 640, 1], [u, 960, 600, .92], [w + .5, 760, 640, 1.05], [e, 700, 660, 1.12]], .4);
    push(); translate(sx, sy);
    knot(t, morph, { imgs: MIX, streetY: 960 });
    // the Unfolding Machine rolls in from the right and starts laying houses out on its belt
    const mx = lerp(2400, 1500, easeOut(seg(t, u - .3, u + 2.2))), mOn = 1 - seg(t, w + 1.2, w + 2.6);
    if (t > u - .5) machine(t, mx, 1010, .5, { on: mOn, belt: mOn, mouth: .8, items: [i => { boilSeed('hb' + i); paint(rectPts(-20, -50, 40, 50, 0), { wash: [PAL.brick, '#D9C9A8', '#C77B5A', '#9FB59A'][i % 4], ink: PAL.ink, sw: .7 }); paint([[-24, -50], [0, -72], [24, -50]], { wash: '#9C4A35', ink: PAL.ink, sw: .6 }); }] });
    if (t > w && t < w + 3) { const ph = seg(t, w + .5, w + 2.6); paint(ellPts(mx + 90, 750 - ph * 120, 30 + 90 * ph, 24 + 60 * ph, 18), { wash: '#4A4A5A', washOp: 220 * (1 - ph), ink: null }); }
    pop();
    // the Professor and Clawd in front of it all
    const turnK = seg(t, w - .2, w + .4);
    const keysC = [[k0 - 1, 'neutral'], [wt('open_knot', 'tangled'), 'scared', { lookX: .6, lookY: -.6 }], [u + 1, 'nervous', { lookX: .9 }], [wt('open_wrong', 'wrong') , 'surprised'], [wt('open_wrong', 'read'), 'hopeful', { lookX: -.6, lookY: -.5 }]];
    clawd(470, 1000, 12, { ...emotions(t, keysC), flip: t < wt('open_wrong', 'wrong'), view: t < wt('open_wrong', 'wrong') ? 'q' : 'front' });
    const lift = seg(t, wt('open_wrong', 'read') - .6, wt('open_wrong', 'read') + .4);
    const g = gesture(t, [[k0, 'rest'], [wt('open_knot', 'believed') - .3, 'explain'], [wt('open_knot', 'crammed'), 'shrug'], [u + .5, 'point'], [w, 'explain2'], [wt('open_wrong', 'city'), 'present'], [wt('open_wrong', 'read') - .6, { aL: [.12, .06], aR: [2.3, 2.7] }]]);
    prof(380, 1000, .58, { view: turnK > .5 ? 'front' : 'q', pose: g, mood: t < w ? 'serious' : t < wt('open_wrong', 'city') ? 'serious' : 'warm', talk: turnK > .5 ? speak(t, ['open_wrong']) : 0, look: turnK > .5 ? [0, 0] : [.8, -.4], holdR: lift > 0 ? lanternHand(lift) : null });
    if (lift > 0) glow(520, 560, 520 * lift, '#FFC766', .45 * lift);
    camEnd();
    vignette(.45);
    if (lt < .5) brushWipe(.5 + lt, ['#2A2560', '#3E3368']);
  }

  // 6 · the title over the city
  function titleShot(t, lt, dur) {
    const a = cs('open_title');
    sky(t, DUSK, { stars: 150, starH: 380, clouds: 6, cloudY: 430, cloudCol: '#E9A5A8' });
    glow(1100, 600, 640, '#FFB46A', .55);
    const cam = camKeys(t, [[a - .3, 3700, 520, .62], [a + dur, 3900, 520, .66]], .3);
    cityPanorama(t, cam[0]);
    cityStreet(t, { on: (i) => .45 + .35 * Math.sin(t * 1.2 + i) });
    for (let i = 6; i < 13; i++) streetArc(i, i + 1, 1, { sw: 4 });
    camEnd();
    title('Neural Networks Are Already Clean', 960, 180, 96, PAL.cream, seg(t, a + .2, a + 2.2), { stroke: '#1B1F4A', strokeW: .12 });
    hand('adapted from the essay by Nick Cammarata · Goodfire', 960, 280, 40, '#F6E3D0', seg(t, a + 1.6, a + 3.2), { stroke: '#1B1F4A', strokeW: .14 });
    if (lt < .4) fade(1 - ease(lt / .4), PAL.cream);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, ['#3E3170', '#5B3F7B']);
  }

  shots([
    [0, phone],
    [cs('open_city') - .1, fall],
    [cs('open_knot') - .3, knotShot],
    [cs('open_title') - .25, titleShot],
  ]);
})();
