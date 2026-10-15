// ch00 Cold open: the city beside the knot.
(() => {
  const at = (ix, iy) => HERO.at(ix, iy);
  function open(t, lt, dur) {
    setSky(t, { tint: '#ECEEEC' });
    const tq = cs('open_question'), tk = cs('open_knot'), tt = cs('open_title');
    const city = at(470, 470), knot = at(1345, 450), towers = at(600, 250), harbor = at(400, 690);
    const cam = camKeys(t, [
      [0, city[0] + 60, city[1] - 30, 2.05], [wt('open_city', 'financial') - .4, towers[0], towers[1] + 80, 2.2],
      [wt('open_city', 'harbor') - .3, harbor[0] + 60, harbor[1] - 60, 2.1], [ce('open_city'), city[0], city[1], 1.75],
      [tk + .2, city[0] + 120, city[1], 1.7], [tk + 2.6, knot[0], knot[1], 1.85], [ce('open_knot'), knot[0] - 30, knot[1] + 20, 2.05],
      [tq + .2, knot[0] - 60, knot[1] + 20, 1.9], [tq + 3.2, 960, 600, 1.0], [tt, 960, 600, 1.0], [tt + 2.5, 960, 560, .9]]);
    // islands bob gently
    boilSeed('hero');
    hero(960, 540 + 6 * Math.sin(t * .5), 1800);
    // drifting clouds in front, parallax
    for (let i = 0; i < 4; i++) { boilSeed('cl' + i); const cx = (hash(i * 3) * 2400 + t * (14 + 8 * i)) % 2600 - 300, cy = 160 + i * 230; paint(ellPts(cx, cy, 180 + 40 * i, 34 + 6 * i, 22), { fill: '#FFFFFF', fillOp: 150, bleed: .3, tex: .2, ink: null }); }
    // tags on the city
    tag('financial district', towers[0], towers[1] + 60, on(t, wt('open_city', 'financial'), ce('open_city') + .4), { dx: 150, dy: -40, size: 22 });
    tag('harbor', harbor[0], harbor[1], on(t, wt('open_city', 'harbor'), ce('open_city') + .4), { dx: -140, dy: -40, size: 22 });
    if (on(t, wt('open_city', 'streets'), tk + 1) > 0) { boilSeed('streets'); const P = [at(170, 380), at(330, 420), at(520, 470), at(760, 420)]; wire(P, seg(t, wt('open_city', 'streets'), wt('open_city', 'streets') + 1.4), { col: PAL.berry, sw: 1.4, flow: on(t, wt('open_city', 'streets') + 1.2, tk + 1), flowCol: '#FFD27A' }); }
    // the knot: question marks where unrelated houses press together
    const kq = on(t, wt('open_knot', 'pressed'), tq + 2.5);
    if (kq > 0) for (const [ix, iy, i] of [[1180, 330, 0], [1480, 560, 1], [1290, 640, 2], [1560, 300, 3]]) { const p = at(ix, iy); emote('?', p[0], p[1] - 40, 13, seg(t, wt('open_knot', 'pressed') + i * .25, wt('open_knot', 'pressed') + i * .25 + .4) * kq, t); }
    camEnd();
    // foreground: Clawd on a knoll, looking up at the knot (screen space so it stays put while the camera pulls back)
    const kc = ease(seg(t, tq + 1.4, tq + 3)); if (kc > 0) {
      const y = lerp(H + 260, 0, kc);
      push(); translate(0, y);
      boilSeed('knoll'); paint([[-100, H + 50], [-100, 930], [300, 880], [700, 905], [1000, 960], [1100, H + 50]], { wash: '#8EA67B', ink: PAL.ink, sw: 1.2, curv: .6 });
      for (let i = 0; i < 14; i++) { const gx = 40 + i * 70; inkLine([[gx, 905 + 25 * Math.sin(i)], [gx - 5, 885 + 25 * Math.sin(i)]], .8, '#4E6B44', 'inkfine', 0); }
      const keys = [[tq, 'nervous', { lookX: .7, lookY: -.8 }], [wt('open_question', 'why') - .2, 'thinking', { lookX: .8, lookY: -.7 }], [wt('open_question', 'wrong') - .1, 'hopeful', { lookX: 0, lookY: 0 }], [tt + .3, 'happy']];
      const tn = turn(t, wt('open_question', 'wrong') - .3, wt('open_question', 'wrong') + .1, .2, 0);
      clawd(520, 902, 17, { ...emotions(t, keys), ...(t < wt('open_question', 'wrong') - .3 ? { view: 'q' } : tn), aR: t > tt + .5 ? 1.2 + .3 * Math.sin(t * 9) : undefined });
      pop();
    }
    // title
    const k1 = seg(t, tt + .2, tt + 2.2), k2 = seg(t, wt('open_title', 'Neural') , wt('open_title', 'Clean') + .6);
    if (k1 > 0) {
      swash(380, 128, 1160, 120, '#F6EBD4', k1, 'tsw');
      title('Neural Networks Are Already Clean', 960, 128, 76, PAL.ink, Math.max(k1, k2));
      hand('adapted from the essay by Nick Cammarata  ·  Goodfire, 2026', 960, 215, 34, PAL.slate, seg(t, tt + 1.4, tt + 3.4));
    }
    if (lt < 1.4) fade(1 - ease(lt / 1.4), PAL.paper);
    if (lt > dur - .3) brushWipe((lt - (dur - .3)) / .6, [PAL.clayDk, PAL.clay]);
  }
  shots([[0, open]]);
})();
