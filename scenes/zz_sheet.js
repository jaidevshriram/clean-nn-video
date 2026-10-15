// style frames (temporary)
(() => {
  DUR = 30;
  const V = 'blog/raw/v-figure-10x/';
  // A: the overlook
  function frameA(t) {
    sky(t, [[0, '#1B1F4A'], [.4, '#4F3B78'], [.66, '#C46F96'], [.82, '#F2A678'], [1, '#FAD39A']], { stars: 140, starH: 360, clouds: 6, cloudY: 430, cloudCol: '#E9A5A8' });
    glow(1180, 560, 560, '#FFB46A', .6);
    skyline('far', -100, 2100, 600, { depth: .95, bh: 130, bw: 50, lit: .2, haze: '#E39A9E' });
    fog(600, 90, '#E8A39C', .7);
    neuronHouse(1180, 610, 90, 330, { roof: 'peak', on: .9, col: '#6A5590', key: 'out1', awning: false });
    neuronHouse(1320, 616, 74, 250, { roof: 'dome', on: .7, col: '#6A5590', key: 'out2', awning: false });
    skyline('mid2', -100, 2100, 650, { depth: .75, bh: 160, bw: 60, lit: .3, haze: '#C47A9A', glowK: .4 });
    fog(660, 80, '#B9789E', .55);
    lightRoad([[-60, 860], [420, 790], [840, 720], [1150, 640]], 26, 1, { col: '#3D3563' });
    lightRoad([[2000, 880], [1660, 780], [1420, 690], [1260, 640]], 22, 1, { col: '#3D3563', speed: .1 });
    skyline('mid', -100, 2100, 760, { depth: .5, bh: 170, bw: 70, lit: .35, haze: '#8C6B9C', glowK: .6 });
    fog(780, 70, '#7B5E95', .45);
    boilSeed('ground'); paint(rectPts(-100, 860, W + 200, 400, 1), { grad: [[0, '#3A2F5A'], [1, '#1E1A35']], gdir: [0, 860, 0, 1080], ink: null, tex: .5 });
    skyline('near', 640, 2100, 900, { depth: .2, bh: 150, bw: 100, lit: .45, glowK: .8 });
    lightRoad([[700, 1100], [980, 990], [1300, 950], [1700, 980], [2000, 1040]], 34, 1, { col: '#2E2850', speed: .08, pulses: 6 });
    lightRoad([[1300, 950], [1250, 860], [1220, 780]], 20, 1, { col: '#2E2850', speed: .15, pulses: 3 });
    // foreground hill: the Professor and Clawd look out over it all
    boilSeed('hill'); paint([[-100, 1180], [-100, 760], [250, 730], [560, 790], [800, 940], [980, 1180]], { grad: [[0, '#3E5A52'], [1, '#1E2E2A']], gdir: [0, 730, 0, 1080], ink: PAL.ink, sw: 1.3, curv: .6 });
    for (let i = 0; i < 20; i++) { const gx = 10 + i * 42, gy = 760 + 22 * Math.sin(i * .55) + (i > 12 ? (i - 12) * 18 : 0); inkLine([[gx, gy], [gx - 6, gy - 26]], 1.1, '#1C2A26', 'inkfine', 0); }
    prof(300, 800, .62, { pose: 'point', mood: 'warm', view: 'q', talk: .5 * (1 + Math.sin(t * 9)) * .5, look: [.6, -.2] });
    helper(t, 500, 812, 12, [[0, 'starstruck']], { aR: 1.2, armR: (u, sw) => { glow(u * .6, -u * 1.5, u * 4, '#FFC766', .9); paint(rrPts(-u * .3, -u * 2.4, u * 1.6, u * 1.8, u * .4), { wash: '#FFE3A6', ink: PAL.ink, sw }); } });
    for (let i = 0; i < 30; i++) { const fx = hash(i * 3.3) * W, fy = H - frac(t * .05 + hash(i)) * H * .8; glow(fx, fy, 10, '#FFD58A', .6 * Math.sin(frac(t * .05 + hash(i)) * Math.PI)); }
  }
  // B: street level, the V neuron's house
  function frameB(t) {
    sky(t, [[0, '#26305C'], [.6, '#4E4A86'], [1, '#B07AA8']], { stars: 60, starH: 300 });
    skyline('bfar', -100, 2100, 760, { depth: .8, bh: 260, bw: 90, lit: .3, haze: '#7B6AA5', glowK: .3 });
    fog(760, 80, '#8C7AB0', .5);
    skyline('bmid', -100, 2100, 860, { depth: .4, bh: 300, bw: 120, lit: .35, haze: '#6B5A95', glowK: .5 });
    fog(870, 60, '#5E4E86', .4);
    boilSeed('street'); paint(rectPts(-60, 880, W + 120, 260, 2), { grad: [[0, '#4A4470'], [1, '#2A2545']], gdir: [0, 880, 0, 1080], ink: PAL.ink, sw: 1, tex: .6 });
    for (let i = 0; i < 9; i++) paint(rectPts(i * 230 + 40, 986, 110, 10, 1), { wash: '#E8C98A', washOp: 200, ink: null });
    neuronHouse(1180, 900, 420, 560, { roof: 'v', on: .85, imgs: [V + 'p47742', V + 'c4d201c', V + 'c5a352d', V + 'pCarX5'], cols: 2, key: 'vhouse', col: '#5A4A86', sign: '4e:55' });
    // a street lamp
    boilSeed('lamp'); inkLine([[1620, 900], [1620, 520], [1580, 480]], 6, PAL.ink, 'ink', .4); glow(1570, 490, 120, '#FFC766', .9); paint(ellPts(1570, 492, 20, 14, 12), { wash: '#FFE3A6', ink: PAL.ink, sw: .8 });
    prof(560, 930, .78, { pose: 'think', mood: 'think', view: 'q', look: [.8, -.4] });
    helper(t, 800, 940, 14, [[0, 'confused', { lookX: 1 }]]);
  }
  // C: the knot (our own): one street of houses wound round and round itself
  function frameC(t) {
    sky(t, [[0, '#24243F'], [.7, '#5A4A72'], [1, '#8A6A86']], { stars: 60, starH: 500 });
    glow(960, 560, 600, '#C9A0D0', .25);
    const N = 420, K = []; for (let i = 0; i < N; i++) { const q = i / N * TAU; K.push([960 + 360 * (Math.sin(q) + 2 * Math.sin(2 * q)) / 3, 560 + 330 * (Math.cos(q) - 2 * Math.cos(2 * q)) / 3, -Math.sin(3 * q)]); }   // trefoil
    // draw in depth order: segments with lower z first, so crossings over/under read
    const segs = []; for (let i = 0; i < N; i += 3) segs.push(i); segs.sort((a, b) => K[a][2] - K[b][2]);
    for (const i of segs) {
      const p = K[i], q = K[(i + 3) % N], a = Math.atan2(q[1] - p[1], q[0] - p[0]), z = p[2], sh = .75 + .25 * z;
      boilSeed('kn' + i); push(); translate(p[0], p[1]); rotate(a);
      paint(rectPts(-9, -34, 20, 68, 0), { wash: mixCol('#B9A98F', '#3A3550', .35 - z * .3), ink: null });                  // the street
      inkLine([[-9, -34], [11, -34]], 1, PAL.ink, 'inkfine', 0); inkLine([[-9, 34], [11, 34]], 1, PAL.ink, 'inkfine', 0);
      if (i % 6 === 0) for (const sd of [-1, 1]) { const hh = 18 + 16 * hash(i + sd); const c = [PAL.brick, '#D9C9A8', '#C77B5A', '#9FB59A', '#C9A15A'][(i / 6 + (sd > 0 ? 2 : 0)) % 5]; push(); translate(0, sd * 34); if (sd < 0) scale(1, -1); paint(rectPts(-8, 0, 16, hh, 0), { wash: mixCol(c, '#2A2340', .3 - z * .25), ink: PAL.ink, sw: .5 }); paint([[-10, hh], [0, hh + 10], [10, hh]], { wash: mixCol('#9C4A35', '#2A2340', .3 - z * .25), ink: PAL.ink, sw: .4 }); if (hash(i * 3 + sd) > .5) paint(rectPts(-3, 6, 6, 6, 0), { wash: '#FFD58A', ink: null }); pop(); }
      pop();
    }
    prof(250, 1010, .55, { pose: 'shrug', mood: 'wry', view: 'q', look: [.8, -.3] });
    helper(t, 420, 1020, 11, [[0, 'dizzy']]);
  }
  shots([[0, frameA], [10, frameB], [20, frameC]]);
})();
