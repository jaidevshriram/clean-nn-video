// ch11 What a solution might look like: the network is ready for its readers; a lab of automated scientists.
(() => {
  function cardShot(t, lt, dur) { setCountry(t, { mood: 'dawn' }); clawd(400, 960, 22, feel('hopeful', t)); chapterCard(t, lt, dur + .3, '11', 'What a solution might look like', '#D9893B'); if (lt < .3) brushWipe(.5 + lt / .6, ['#C99AB8', '#F4B39A']); }
  function solution(t, lt, dur) {
    const h = cs('so_hard'), r = cs('so_ready'), l = cs('so_lab'), p = cs('so_plug'), al = cs('so_alignment'), hi = cs('so_history'), e = ce('so_history');
    setCountry(t, { mood: 'dawn' });
    // sunrise over the hills, rising through the chapter
    const sun = kf(t, [[h, 760], [e, 300]], easeInOut);
    boilSeed('sun'); glow(1450, sun, 260, '#FFD27A', .8); paint(ellPts(1450, sun, 90, 90, 24), { wash: '#FFE3A6', ink: null });
    const kH = on(t, h, r + .2);
    if (kH > 0) { title('what if it isn’t that hard?', 960, 200, 64, PAL.ink, seg(t, wt('so_hard', 'What') - .3, wt('so_hard', 'isn') + .5)); }
    const kR = on(t, r - .1, l);
    if (kR > 0) { title('already prepared to be understood…', 960, 200, 56, PAL.ink, seg(t, wt('so_ready', 'prepared') - .8, wt('so_ready', 'understood') + .3)); hand('…for its own readers', 960, 280, 44, PAL.clayDk, seg(t, wt('so_ready', 'readers') - .4, wt('so_ready', 'readers') + .3)); hand('become another reader', 960, 350, 40, PAL.sap, seg(t, wt('so_ready', 'become') - .3, wt('so_ready', 'reader') + .3)); }
    const kL = on(t, l - .1, al);
    if (kL > 0) {
      fig('blog/figs/fig043', 960, 400, 1000, kL, { key: 'f43', tape: true });
      notes(t, 640, 700, [[wt('so_lab', 'labeling') - .3, 'label neurons'], [wt('so_lab', 'finding') - .3, 'find patterns, test them'], [wt('so_lab', 'following') - .3, 'follow data through circuits']], { size: 40, gap: 60 });
      const kp = seg(t, wt('so_plug', 'plug') - .5, wt('so_plug', 'other') + .3);
      if (kp > 0) {
        // two plugs meeting
        const gap = lerp(260, 0, ease(kp));
        boilSeed('plug'); paint(rrPts(1250 - gap - 160, 760, 160, 80, 16), { wash: PAL.clay, ink: PAL.ink, sw: 1 }); paint(rrPts(1250 + gap, 760, 160, 80, 16), { wash: PAL.teal, ink: PAL.ink, sw: 1 });
        inkLine([[1250 + gap, 785], [1250 + gap - 30, 785]], 5, '#C99A45', 'ink', 0); inkLine([[1250 + gap, 815], [1250 + gap - 30, 815]], 5, '#C99A45', 'ink', 0);
        hand('capable agents', 1250 - gap - 80, 870, 28, PAL.ink, kp); hand('architectures that learn well', 1250 + gap + 80, 870, 28, PAL.ink, kp);
        if (kp > .95) glow(1250, 800, 120, '#FFD27A', .8);
      }
    }
    const kA = on(t, al - .1, hi);
    if (kA > 0) {
      title('alignment, if we can see inside', 960, 200, 56, PAL.ink, seg(t, al + .3, al + 1.6));
      notes(t, 600, 330, [[wt('so_alignment', 'assume') - .3, 'the usual arguments assume we can’t see inside'], [wt('so_alignment', 'simple') - .3, 'simple, careful changes instead'], [wt('so_alignment', 'environment') - .5, 'e.g. remove a training environment that turns out toxic'], [wt('so_alignment', 'lot') - .3, 'each fix simple — maybe just a lot of them', { col: PAL.sap }]], { size: 40, gap: 80 });
    }
    const kHi = on(t, hi - .1);
    if (kHi > 0) { title('the history of deep learning', 960, 300, 64, PAL.ink, seg(t, hi + .1, wt('so_history', 'learning') + .3)); title('may also be the history of understanding and aligning what it builds', 960, 400, 44, PAL.clayDk, seg(t, wt('so_history', 'also') - .3, wt('so_history', 'builds') + .5), { maxW: 1500 }); }
    // Clawd walks toward the sunrise
    const cx = lerp(260, 760, ease(seg(t, h, e)));
    clawd(cx, 960, 20, { ...emotions(t, [[h - 1, 'hopeful'], [r + .3, 'happy'], [l + .3, 'excited'], [al + .3, 'thinking'], [hi + .2, 'proud']]), view: t > hi ? 'q' : 'front' });
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.sap, PAL.moss]);
  }
  shots([[chapStart('ch11'), cardShot], [cs('so_hard') - .25, solution]]);
})();
