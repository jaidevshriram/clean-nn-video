// style/frames.js: one still per world of the "teleport" film, for approval before animation.
// Each entry: [title, t, draw(t)]. Rendered by tools/styleframes.mjs.
const R = 'blog/raw/', VF = R + 'v-figure-10x/', NO = R + 'neuron-overflow/', SC = R + 'superposition-circuit/', NP = R + 'negative-poles-v2/', TVH = R + 'tiny-vehicles/', MT = R + 'microscope-timeline/', DV = 'blog/derived/', UC = R + 'umbrella-circuit/', OL = R + 'one-image-logits/';
const FR = [];

// helpers shared by frames

// 0 · COSMIC: a chat window falls into a galaxy of neuron-stars; the knot is a tangled black hole
FR.push(['0 · Cold open: deep space', 3, t => {
  vgrad([[0, '#05060F'], [.5, '#0B0E2A'], [1, '#141038']]);
  GRAIN = .5;
  // nebula clouds
  for (let i = 0; i < 9; i++) glow(300 + hash(i * 3) * 1400, 200 + hash(i * 5) * 700, 300 + 200 * hash(i), ['#5A2A8A', '#1E4A8A', '#8A2A6A'][i % 3], .35);
  // the galaxy: spiral arms of tiny lights, each a neuron
  const cx = 1150, cy = 520;
  for (let i = 0; i < 4200; i++) { const arm = i % 3, r = Math.pow(hash(i * 1.7), .7) * 520, q = arm * TAU / 3 + r * .011 + (hash(i * 2.3) - .5) * .5 + t * .02, x = cx + Math.cos(q) * r, y = cy + Math.sin(q) * r * .45; const c = ['#FFE3A6', '#BFE6FF', '#FFB3D9', '#FFFFFF'][i % 4]; dot(x, y, .8 + hash(i) * 1.8, c, .5 + .5 * hash(i * 9)); }
  for (let i = 0; i < 30; i++) { const r = 80 + hash(i) * 440, q = hash(i * 7) * TAU, x = cx + Math.cos(q) * r, y = cy + Math.sin(q) * r * .45; glow(x, y, 26, '#FFD58A', .9); }
  // a few close neurons with photos in them
  lampOrb(1500, 300, 46, VF + 'p47742'); lampOrb(820, 760, 40, VF + 'c4d201c'); lampOrb(1640, 700, 34, VF + 'pTrain34');
  // the knot as a tangled black hole with an accretion ring
  for (let k = 0; k < 3; k++) { ctx.save(); ctx.strokeStyle = ['#FF9A5A', '#FFD36B', '#FF5A8A'][k]; ctx.globalAlpha = .55; ctx.lineWidth = 6 - k; ctx.beginPath(); ctx.ellipse(cx, cy, 170 + k * 18, 40 + k * 6, -.15, 0, TAU); ctx.stroke(); ctx.restore(); }
  knotBeast(cx, cy, 120, { col: '#2A1A3A', dark: '#000000', look: [-.6, .3] });
  // the chat window and its comet trail
  ctx.save(); ctx.translate(420, 760); ctx.rotate(-.12); flat(rrPts(-230, -90, 460, 180, 26), '#F4F1E8', { shadow: [8, 10, 'rgba(0,0,0,.5)'] }); txt('How does an AI actually think?', 0, -10, 30, '#2A2340', { weight: '700' }); flat(rrPts(-200, 40, 120, 26, 13), '#C9C3DA'); ctx.restore();
  for (let i = 0; i < 60; i++) { const u = i / 60; glow(lerp(560, 1020, u) , lerp(700, 560, u) + Math.sin(u * 9) * 10, 30 * (1 - u) + 6, '#BFE6FF', .5 * (1 - u)); }
  tourist(1720, 980, 9, 'helmet', { ...feel('excited', t), view: 'q', flip: true });
  letter('a billion lights', 1150, 120, 64, '#F5E8FF', { face: 'marker', shadow: false });
}]);

// 1 · TILT-SHIFT MINIATURE: a toy city on a sunny table; a toy train carries photos past; one house goes bananas for a dog
FR.push(['1 · What a neuron is: tilt-shift toy town', 2, t => {
  vgrad([[0, '#BFE3F5'], [.3, '#E8F3E0'], [1, '#C9D9B0']]); GRAIN = .3;
  // camera looks down at a tabletop city: rows recede toward a high horizon, streets between them
  const k = z => 1 / (1 + z / 900), Y = z => 1130 - 820 * (1 - k(z)), X = (x, z) => 960 + (x - 960) * k(z);
  flat([[0, Y(4000)], [W, Y(4000)], [W, H], [0, H]], '#A9CC86');
  const rows = 7;
  for (let r = rows - 1; r >= 0; r--) {
    const z = r * 520 + 260, zs = z - 200;
    // the street in front of this row
    flat([[X(-1200, zs), Y(zs)], [X(3100, zs), Y(zs)], [X(3100, zs + 150), Y(zs + 150)], [X(-1200, zs + 150), Y(zs + 150)]], '#8E8C98');
    for (let d = 0; d < 30; d++) { const x0 = -1200 + d * 150; flat([[X(x0, zs + 72), Y(zs + 72)], [X(x0 + 60, zs + 72), Y(zs + 72)], [X(x0 + 60, zs + 80), Y(zs + 80)], [X(x0, zs + 80), Y(zs + 80)]], '#E8E2C0'); }
    // tiny cars on the street
    for (let c = 0; c < 3; c++) { const cx = X(((c * 700 + r * 230 + T * (r % 2 ? 90 : -90)) % 3600) - 1000, zs + (c % 2 ? 40 : 110)), cy = Y(zs + (c % 2 ? 40 : 110)), kk = k(zs); flat(rrPts(cx - 26 * kk, cy - 4 * kk, 52 * kk, 22 * kk, 5 * kk), ['#D2473F', '#3A64B8', '#F0BE46'][(c + r) % 3], { shadow: [4 * kk, 6 * kk, 'rgba(0,0,0,.25)'] }); }
    for (let i = -6; i < 18; i++) {
      const x = i * 300 + (r % 2) * 150, sx = X(x, z), sy = Y(z), kk = k(z); if (sx < -200 || sx > W + 200) continue;
      const hot = r === 1 && i === 4, h = (150 + 60 * hash(i * 3 + r)) * kk, w = 160 * kk;
      ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#2A3A20'; ctx.beginPath(); ctx.ellipse(sx + w * .25, sy + 4, w * .65, 10 * kk, 0, 0, TAU); ctx.fill(); ctx.restore();
      neuronHouse(sx, sy, w, h, { roof: ['peak', 'flat', 'dome'][(i + r + 9) % 3], on: hot ? 1 : .12 + .2 * hash(i + r * 7 + 30), imgs: hot ? [VF + 'c4d477c', VF + 'c4d477w', VF + 'c5a317c', VF + 'n750219'] : [], cols: 2, key: 'ts' + r + '_' + i, col: ['#E87A5A', '#F2C14E', '#7EB5D6', '#A4C97A', '#E8A0B4'][((i + 9) * 3 + r) % 5], awning: false, glowCol: '#FFE08A' });
      if (hash(i * 5 + r) > .7) { paint(ellPts(sx + w * .75, sy - 26 * kk, 26 * kk, 34 * kk, 12), { wash: '#4E8A44', ink: PAL.ink, sw: .6 }); }
    }
  }
  // the toy train along the front edge, carrying photos on flatcars
  const ty = 1040; flat(rectPts(0, ty, W, 12), '#6A5A4A');
  for (let c = 0; c < 6; c++) { const x = 1760 - c * 250; flat(rrPts(x - 105, ty - 62, 210, 54, 10), c === 0 ? '#D2473F' : ['#3A64B8', '#F0BE46', '#6E9F58'][c % 3], { line: PAL.ink, lw: 3 }); for (const wx of [-66, 66]) { dot(x + wx, ty - 6, 17, '#2A2340'); dot(x + wx, ty - 6, 6, '#9AA3B5'); } if (c > 0) photoFlat([VF + 'c4d477c', VF + 'pPool13', VF + 'c4d201c', VF + 'n1158528', VF + 'p10704'][c - 1], x - 66, ty - 182, 132, 112, { border: 6 }); else { flat(rectPts(x - 50, ty - 130, 70, 68), '#D2473F', { line: PAL.ink, lw: 3 }); flat(rectPts(x + 30, ty - 110, 24, 48), '#2A2340'); } }
  for (let i = 0; i < 5; i++) glow(1850 + i * 30, 900 - i * 40, 30 + i * 10, '#FFFFFF', .25);
  tourist(230, 1030, 8, 'safari', { ...feel('excited', t), view: 'q' });
  fxTiltShift(560, 940, 11);
  sfx('WOW!', X(4 * 300 + 150, 780) + 50, Y(780) - 230, 70, PAL.berry, .3);
}]);

// rubber-hose character: round body, noodle limbs, white gloves, pie eyes
function hoseGuy(x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.strokeStyle = '#111'; ctx.lineWidth = 9;
  const leg = (sx, ph) => { ctx.beginPath(); ctx.moveTo(sx, -60); ctx.bezierCurveTo(sx + 30 * ph, -30, sx - 20 * ph, -10, sx + 10 * ph, 0); ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(sx + 10 * ph + 14, 4, 26, 12, 0, 0, TAU); ctx.fill(); };
  leg(-18, o.walk ? Math.sin(T * 8) : .3); leg(18, o.walk ? -Math.sin(T * 8) : -.3);
  ctx.fillStyle = o.col || '#222'; ctx.beginPath(); ctx.ellipse(0, -110, 56, 62, 0, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.ellipse(0, -96, 34, 30, 0, 0, TAU); ctx.fill();
  const arm = (sd, up) => { ctx.beginPath(); ctx.moveTo(sd * 50, -120); ctx.bezierCurveTo(sd * 90, -140 - up * 60, sd * 70, -60 - up * 120, sd * 100, -90 - up * 110); ctx.stroke(); ctx.fillStyle = '#FFF'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(sd * 104, -96 - up * 110, 22, 18, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 9; };
  arm(-1, o.armUp ?? 0); arm(1, o.armUp2 ?? .6);
  // head with pie eyes
  ctx.fillStyle = o.col || '#222'; ctx.beginPath(); ctx.arc(0, -210, 50, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.ellipse(0, -195, 38, 28, 0, 0, TAU); ctx.fill();
  for (const ex of [-16, 16]) { ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.ellipse(ex, -222, 14, 20, 0, 0, TAU); ctx.fill(); ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.moveTo(ex, -216); ctx.arc(ex, -216, 9, -Math.PI * .35, Math.PI * 1.35); ctx.closePath(); ctx.fill(); }
  ctx.lineWidth = 5; ctx.beginPath(); if (o.sleep) { ctx.moveTo(-14, -185); ctx.lineTo(14, -185); } else ctx.arc(0, -192, 16, .1 * Math.PI, .9 * Math.PI); ctx.stroke();
  ctx.fillStyle = '#111'; ctx.beginPath(); ctx.ellipse(0, -200, 10, 7, 0, 0, TAU); ctx.fill();
  if (o.hat) { ctx.fillStyle = '#111'; ctx.fillRect(-40, -266, 80, 14); ctx.fillRect(-26, -310, 52, 48); }
  ctx.restore();
}
// 2 · 1930s RUBBER-HOSE: the capsule hotel where strangers share beds in shifts
FR.push(['2 · The knot: 1930s rubber-hose cartoon', 2.2, t => {
  bg('#E9E4D6'); GRAIN = .9;
  // the hotel in cross-section: 3 floors × 4 capsules
  flat(rectPts(240, 160, 1440, 820), '#CFC8B8', { line: '#111', lw: 8 });
  for (let f = 0; f < 3; f++) for (let c = 0; c < 4; c++) { const x = 300 + c * 345, y = 210 + f * 255; flat(rrPts(x, y, 300, 200, 30), '#F4F1E8', { line: '#111', lw: 6 }); flat(rrPts(x + 20, y + 140, 260, 40, 10), '#BDB6A6', { line: '#111', lw: 4 }); }
  // sleepers (day shift), with Z's
  for (const [x, y] of [[450, 400], [1140, 400], [790, 655], [1480, 655]]) { hoseGuy(x, y, .55, { sleep: true, armUp: -.3, armUp2: -.3 }); txt('Z', x + 60, y - 170 + 10 * Math.sin(T * 3 + x), 40, '#111', { font: 'serif' }); txt('z', x + 90, y - 210, 28, '#111', { font: 'serif' }); }
  // the night-shift guy crashing in at the door: BONK
  hoseGuy(1600, 970, .9, { walk: true, armUp: .8, armUp2: 1, hat: true });
  hoseGuy(1350, 970, .85, { armUp: -.2, armUp2: .3 });
  starPts && paint(starPts(1480, 650, 120, .45, 10), { wash: '#FFFFFF', ink: '#111', sw: 2 });
  txt('BONK!', 1480, 650, 70, '#111', { font: 'serif', rot: -.15 });
  // art-deco title card
  flat(rectPts(560, 40, 800, 100), '#111'); txt('STRANGERS IN SHIFTS', 960, 92, 56, '#E9E4D6', { font: 'serif' });
  tourist(170, 1010, 8, 'top', { ...feel('surprised', t), view: 'q' });
  fxGray(1.35); fxFilm(t, 1);
}]);

// 3 · FILM NOIR: the detective's desk at night; the V appears over every photo; the portal glows on the wall
FR.push(['3 · Cat & car case: film noir', 2.6, t => {
  bg('#2A2A2E'); GRAIN = 1.2;
  // wall and window light through blinds
  flat(rectPts(0, 0, W, 700), '#4A4A50');
  for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = '#E9E4D6'; ctx.beginPath(); ctx.moveTo(300 + i * 70, 0); ctx.lineTo(340 + i * 70, 0); ctx.lineTo(980 + i * 70, 1080); ctx.lineTo(950 + i * 70, 1080); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // the V portal glimmering on the wall like a clue nobody has read yet
  vPortal(1500, 300, 300, 260, .8, () => { vgrad([[0, '#05060F'], [1, '#141038']]); for (let i = 0; i < 200; i++) dot(hash(i) * W, hash(i * 3) * H, 1.5, '#FFE3A6', .8); }, { glow: '#FFFFFF', edge: '#FFFFFF' });
  // the desk with case photos
  flat(rectPts(0, 700, W, 380), '#3A2E26');
  const PH = [VF + 'p47742', VF + 'c4d201c', VF + 'p42708', VF + 'c4d201d', VF + 'c5a352d', VF + 'pCarX5'];
  PH.forEach((p, i) => { const x = 250 + i * 240, y = 760 + (i % 2) * 70, r = (hash(i) - .5) * .3; photoFlat(p, x, y, 190, 170, { border: 10, polaroid: true, rot: r }); ctx.save(); ctx.translate(x + 95, y + 85); ctx.rotate(r); ctx.strokeStyle = '#FFF6C8'; ctx.lineWidth = 9; ctx.shadowColor = '#FFFFFF'; ctx.shadowBlur = 20; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-70, -60); ctx.lineTo(0, 55); ctx.lineTo(70, -60); ctx.stroke(); ctx.restore(); });
  // desk lamp cone
  ctx.save(); const g = ctx.createRadialGradient(700, 760, 50, 700, 860, 700); g.addColorStop(0, 'rgba(255,250,230,.45)'); g.addColorStop(1, 'rgba(255,250,230,0)'); ctx.fillStyle = g; ctx.fillRect(0, 500, W, 580); ctx.restore();
  tourist(1650, 760, 13, 'fedora', { ...feel('surprised', t), view: 'q', flip: true });
  // rain on the window side
  rain(t, .6);
  fxGray(1.5, '#08080A', '#F2EEE2');
  letter('it was never cats and cars', 700, 120, 60, '#F2EEE2', { face: 'marker', shadow: false });
}]);

// 4 · SPY TITLES / CUT PAPER (Saul Bass): the car sneaks into the dog locker
FR.push(['4 · Hidden car: 1960s spy titles, cut paper', 2, t => {
  bg('#E8862A'); GRAIN = .8; PAPER = false;
  cutout([[0, 640], [W, 520], [W, H], [0, H]], '#1A1A1A', { shadow: false });
  cutout([[1180, 120], [1820, 160], [1760, 640], [1240, 600]], '#F3E2BE');
  // four dog lockers (doghouses) on the black ground, one with a car slipping in
  for (let i = 0; i < 4; i++) { const x = 220 + i * 260, y = 700; cutout([[x - 90, y], [x, y - 110], [x + 90, y], [x + 90, y + 150], [x - 90, y + 150]], ['#D2473F', '#F3E2BE', '#3A64B8', '#F3E2BE'][i]); cutout(rrPts(x - 30, y + 60, 60, 90, 28), '#1A1A1A', { shadow: false }); }
  // a sneaky cut-paper car with a fake mustache
  ctx.save(); ctx.translate(640, 980); ctx.rotate(-.04); ctx.scale(1.3, 1.3); cutout([[-140, 0], [-110, -60], [-30, -100], [70, -100], [130, -50], [150, 0]], '#E8862A'); cutout(ellPts(-80, 4, 34, 34, 12), '#1A1A1A', { shadow: false }); cutout(ellPts(90, 4, 34, 34, 12), '#1A1A1A', { shadow: false }); cutout([[100, -40], [130, -46], [150, -30], [118, -30]], '#1A1A1A', { shadow: false }); ctx.restore();
  // the dog visualizations framed in jagged cutouts on the poster panel
  [SC + 'dream02/4d417', SC + 'dream02/4d167', SC + 'dream02/4d295', SC + 'dream02/4d241'].forEach((p, i) => { const x = 1270 + (i % 2) * 260, y = 190 + Math.floor(i / 2) * 210; ctx.save(); const P = new Path2D(); P.moveTo(x, y + 6); P.lineTo(x + 200, y); P.lineTo(x + 196, y + 180); P.lineTo(x + 4, y + 176); P.closePath(); ctx.clip(P); photoFlat(p, x, y, 200, 180, {}); ctx.restore(); });
  txt('THE HIDDEN CAR', 640, 220, 96, '#1A1A1A', { font: 'serif', rot: -.04 }); txt('a case in superposition', 640, 320, 44, '#F3E2BE', { font: 'serif', weight: '400' });
  tourist(1640, 980, 10, 'fedora', { ...feel('suspicious', t), view: 'q', flip: true });
}]);

// 5 · VICTORIAN ENGRAVING: London fog, gas lamps, a brass microscope on a cart
FR.push(['5 · Foggy district: Victorian engraving', 3, t => {
  vgrad([[0, '#9A9590'], [1, '#D9D3C9']]); GRAIN = .4;
  for (let i = 0; i < 9; i++) { const x = i * 230 - 40, h = 360 + 200 * hash(i * 3); paint(rectPts(x, 900 - h, 200, h + 20, 1), { wash: '#5A5048', ink: PAL.ink, sw: 1.2 }); for (let c = 0; c < 2; c++) paint(rectPts(x + 30 + c * 100, 900 - h - 60, 30, 60, 1), { wash: '#4A4038', ink: PAL.ink, sw: 1 }); for (let w = 0; w < 6; w++) paint(rectPts(x + 30 + (w % 2) * 90, 900 - h + 50 + Math.floor(w / 2) * 110, 50, 70, 1), { wash: hash(i * 7 + w) > .6 ? '#E8C27A' : '#2A2420', ink: PAL.ink, sw: .8 }); }
  for (let i = 0; i < 4; i++) fog(560 + i * 110, 140, '#C9C3BA', .55);
  for (const x of [200, 1500]) { paint(rectPts(x - 6, 620, 12, 300, 1), { wash: '#2A2420', ink: PAL.ink, sw: 1 }); paint([[x - 30, 560], [x + 30, 560], [x + 20, 620], [x - 20, 620]], { wash: '#E8C27A', ink: PAL.ink, sw: 1 }); glow(x, 590, 120, '#FFE3A6', .7); }
  paint(rectPts(-100, 900, W + 200, 200, 1), { wash: '#6A6058', ink: PAL.ink, sw: 1 });
  // the microscope on its cart, its lens showing the crisp 2026 portrait
  paint(rrPts(760, 880, 400, 70, 12), { wash: '#7A5B3E', ink: PAL.ink, sw: 1.3 }); for (const wx of [820, 1100]) paint(ellPts(wx, 960, 44, 44, 18), { wash: '#4A4038', ink: PAL.ink, sw: 1.2 });
  paint(rectPts(948, 640, 24, 240, 1), { wash: '#B08A4A', ink: PAL.ink, sw: 1.2 });
  paint(ellPts(960, 500, 200, 200, 40), { grad: [[0, '#E8C27A'], [1, '#A87A3A']], ink: PAL.ink, sw: 1.6 });
  ctx.save(); ctx.beginPath(); ctx.arc(960, 500, 170, 0, TAU); ctx.clip(); const I = img(MT + '2026-mixed4d-161'); ctx.drawImage(I, 790, 330, 340, 340); ctx.restore();
  tourist(1260, 960, 11, 'top', { ...feel('happy', t), view: 'q', flip: true });
  fxEngrave('#2A2018', '#EFE4CC', 6, .3);
  letter('the lens comes into focus', 960, 120, 60, '#2A2018', { face: 'marker', shadow: false });
}]);

// 6 · BOTANICAL PLATE: a neuron grows like a plant; each branch's leaves are its photos
FR.push(['6 · Watching a neuron grow: botanical plate', 2, t => {
  bg('#F1E6CC'); GRAIN = 1.1;
  ctx.save(); ctx.strokeStyle = '#5A4A3A'; ctx.lineWidth = 3; ctx.strokeRect(80, 60, W - 160, H - 120); ctx.lineWidth = 1; ctx.strokeRect(96, 76, W - 192, H - 152); ctx.restore();
  letter('Neuronium recursivum', 960, 140, 64, '#3A2A1A', { face: 'marker', shadow: false }); letter('Fig. VI — a single neuron, grown over 30,024 steps of training', 960, 210, 34, '#5A4A3A', { face: 'hand', shadow: false });
  // the stem and branches
  const stem = [[960, 980], [950, 820], [970, 660], [960, 520]], B = [[[955, 760], [760, 640], [560, 520]], [[760, 640], [600, 720], [430, 760]], [[965, 680], [1160, 560], [1380, 460]], [[1160, 560], [1340, 660], [1520, 700]]];
  inkLine(stem, 10, '#4E6A3A', 'ink', .5); B.forEach(P => inkLine(P, 6, '#4E6A3A', 'ink', .5));
  const LEAF = [[960, 430, NO + 'iv1_1654_0_0', 'a. flores'], [560, 500, NO + 'iv1_3753_1_2', 'b. pilae'], [430, 740, NO + 'iv1_7506_2_0', 'c. poma'], [1380, 440, NO + 'iv1_7506_3_0', 'd. canes'], [1520, 690, NO + 'iv1_15012_4_2', 'e. brassica']];
  LEAF.forEach(([x, y, im, lab], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate((hash(i) - .5) * .5); ctx.scale(1.6, 1.6); const P = new Path2D(); P.moveTo(-110, 0); P.quadraticCurveTo(0, -95, 110, 0); P.quadraticCurveTo(0, 95, -110, 0); ctx.clip(P); const I = img(im), s = Math.min(I.width, I.height); ctx.drawImage(I, (I.width - s) / 2, (I.height - s) / 2, s, s, -110, -95, 220, 190); ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.rotate((hash(i) - .5) * .5); ctx.scale(1.6, 1.6); ctx.strokeStyle = '#3A4A2A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-110, 0); ctx.quadraticCurveTo(0, -95, 110, 0); ctx.quadraticCurveTo(0, 95, -110, 0); ctx.moveTo(-110, 0); ctx.lineTo(110, 0); ctx.stroke(); ctx.restore(); letter(lab, x, y + 170, 36, '#5A4A3A', { face: 'hand', shadow: false }); });
  paint(ellPts(960, 990, 160, 30, 20), { wash: '#8C6A48', ink: PAL.ink, sw: 1 });
  tourist(1620, 990, 9, 'safari', { ...feel('thinking', t), view: 'q', flip: true });
}]);

// 7 · GAME SHOW: GENERALIZATION vs SUPERPOSITION; the knot is a contestant
FR.push(['7 · Two explanations: retro game show', 2.4, t => {
  vgrad([[0, '#2A0A3A'], [1, '#5A1A4A']]); GRAIN = .5;
  // curtains
  for (const sd of [0, 1]) for (let i = 0; i < 6; i++) { const x = sd ? W - 260 + i * 44 : i * 44; paint(rectPts(x, 0, 48, H, 1), { grad: [[0, '#B0203A'], [1, '#6A1020']], gdir: [x, 0, x + 48, 0], ink: '#3A0A14', sw: 1 }); }
  // stage, spotlights
  flat([[200, 820], [1720, 820], [1920, 1080], [0, 1080]], '#3A2A4A');
  for (const x of [600, 1320]) { ctx.save(); ctx.globalAlpha = .22; ctx.fillStyle = '#FFF6D0'; ctx.beginPath(); ctx.moveTo(x - 30, 0); ctx.lineTo(x + 30, 0); ctx.lineTo(x + 260, 900); ctx.lineTo(x - 260, 900); ctx.closePath(); ctx.fill(); ctx.restore(); }
  // marquee with bulbs
  flat(rrPts(460, 60, 1000, 170, 30), '#F0BE46', { line: '#3A1A0A', lw: 6 }); txt('WHICH ONE IS IT?!', 960, 145, 84, '#B0203A', { font: 'serif', stroke: '#FFF6D0', sw: 8 });
  for (let i = 0; i < 26; i++) { const u = i / 26, x = 470 + u * 980; dot(x, 70, 9, Math.floor(T * 6 + i) % 2 ? '#FFF6D0' : '#C98A2A'); dot(x, 222, 9, Math.floor(T * 6 + i + 1) % 2 ? '#FFF6D0' : '#C98A2A'); }
  // podiums
  for (const [x, lab, sc, col] of [[600, 'GENERALIZATION', '99', '#3AA5A3'], [1320, 'SUPERPOSITION', '0', '#B45CA8']]) { flat([[x - 200, 820], [x + 200, 820], [x + 170, 560], [x - 170, 560]], col, { line: '#1A0A2A', lw: 5, shadow: [10, 10, 'rgba(0,0,0,.4)'] }); flat(rrPts(x - 150, 590, 300, 80, 10), '#1A0A2A'); txt(sc, x, 632, 60, '#FF6A3A', { font: 'monospace' }); txt(lab, x, 730, 36, '#FFF6D0'); }
  neuronHouse(600, 560, 150, 190, { roof: 'peak', on: .9, imgs: [VF + 'c4d477c', VF + 'c5a317c'], cols: 2, key: 'gs1', col: '#5A7A6A', awning: false });
  knotBeast(1320, 440, 110, { look: [-.5, .2], hat: 'party', grin: true });
  // the hydraulic press waiting in the wings
  paint(rectPts(1640, 300, 30, 520, 1), { wash: '#6E7891', ink: PAL.ink, sw: 1 }); paint(rectPts(1560, 520, 200, 50, 1), { wash: '#9AA3B5', ink: PAL.ink, sw: 1 }); letter('next round: THE PRESS', 1660, 260, 30, '#FFF6D0', { face: 'hand', shadow: false });
  // audience silhouettes
  for (let i = 0; i < 22; i++) { const x = 60 + i * 86, y = 1040 + (i % 2) * 20; dot(x, y - 60, 30, '#140818'); flat(rrPts(x - 40, y - 34, 80, 80, 30), '#140818'); }
  tourist(960, 1050, 9, 'party', { ...feel('excited', t), view: 'front' });
  paint(starPts(960, 330, 90, .5, 8), { wash: '#FFF6D0', ink: '#3A1A0A', sw: 2 }); txt('VS', 960, 332, 64, '#B0203A', { font: 'serif' });
}]);

// 8 · CRYPTID HUNT: night-vision found footage; the knot is Bigfoot, half behind a tree
FR.push(['8 · Superposition of the gaps: cryptid-hunt footage', 3.1, t => {
  bg('#3A3A3A'); GRAIN = 0;
  for (let i = 0; i < 14; i++) { const x = hash(i * 3.1) * W, w = 50 + hash(i) * 90, d = hash(i * 5); paint(rectPts(x, -50, w, H + 100, 1), { wash: mixCol('#5A5A5A', '#9A9A9A', d), ink: null }); }
  for (let i = 0; i < 40; i++) paint(ellPts(hash(i * 2.2) * W, 900 + hash(i * 4.4) * 200, 120, 40, 14), { wash: '#6A6A6A', ink: null });
  // a big tree in the foreground, the knot peeking out from behind it
  knotBeast(1180, 540, 170, { fur: true, col: '#B0B0B0', dark: '#5A5A5A', look: [1, 0] });
  paint(rectPts(1180, -50, 220, H + 100, 1), { wash: '#4A4A4A', ink: null });
  // glowing eyes (they shine in night vision)
  glow(1150, 530, 40, '#FFFFFF', .7);
  tourist(420, 1020, 12, 'safari', { ...feel('scared', t), view: 'q' });
  fxNightVision(t, { label: 'CAM 2 · SUPERPOSITION SIGHTING?' });
}]);

// 9 · ISOMETRIC PIXEL GAME: neurons route traffic; a HUD toast
FR.push(['9 · Traffic, votes & whispers: isometric pixel game', 2, t => {
  bg('#6FB7D8'); GRAIN = 0; PAPER = false;
  const iso = (i, j) => [960 + (i - j) * 64 * 1.35, 120 + (i + j) * 32 * 1.35];
  for (let i = 0; i < 14; i++) for (let j = 0; j < 14; j++) { const [x, y] = iso(i, j), road = i === 6 || j === 7; flat([[x, y], [x + 86, y + 43], [x, y + 86], [x - 86, y + 43]], road ? '#7A7A8A' : ((i + j) % 2 ? '#7EC86A' : '#72BC5E')); if (road && (i + j) % 2) flat([[x - 4, y + 30], [x + 4, y + 30], [x + 4, y + 34], [x - 4, y + 34]], '#F0E6A0'); }
  // buildings: little iso boxes with a photo "sign" on top
  const BLD = [[3, 3, '#E87A5A', NP + 'taxis-positive-1'], [3, 10, '#F2C14E', NP + 'broccoli-positive-1'], [10, 3, '#7EB5D6', VF + 'c4d477c'], [10, 10, '#A47AC8', NP + 'toucans-positive-1'], [5, 5, '#E8A0B4', NP + 'lighthouses-positive-1']];
  BLD.forEach(([i, j, col, im]) => { const [x, y] = iso(i, j), h = 120; flat([[x - 64, y + 32], [x, y + 64], [x, y + 64 - h], [x - 64, y + 32 - h]], mixCol(col, '#000000', .2)); flat([[x + 64, y + 32], [x, y + 64], [x, y + 64 - h], [x + 64, y + 32 - h]], mixCol(col, '#000000', .35)); flat([[x, y - h], [x + 64, y + 32 - h], [x, y + 64 - h], [x - 64, y + 32 - h]], col); for (let w = 0; w < 3; w++) flat(rectPts(x - 50 + w * 16, y + 10 - h * .6 + w * 8, 10, 14), '#FFF6B0'); photoFlat(im, x - 40, y - h - 110, 80, 80, { border: 5 }); });
  // traffic: cars and dogs on the roads
  for (let k = 0; k < 8; k++) { const u = frac(T * .1 + k / 8) * 13, [x, y] = k % 2 ? iso(6, u) : iso(u, 7); if (k % 2) flat(rrPts(x - 18, y + 14, 36, 22, 4), ['#D2473F', '#F0BE46', '#3A64B8'][k % 3]); else { flat(ellPts(x, y + 26, 16, 10, 10), '#C9A26B'); flat(ellPts(x + 14, y + 18, 7, 7, 8), '#C9A26B'); } }
  fxPixelate(5, ['#1A1C2C', '#5D275D', '#B13E53', '#EF7D57', '#FFCD75', '#A7F070', '#38B764', '#257179', '#29366F', '#3B5DC9', '#41A6F6', '#73EFF7', '#F4F4F4', '#94B0C2', '#566C86', '#333C57', '#C9A26B', '#7A5A3A']);
  // HUD (drawn crisp after pixelation is fine for a game UI)
  POST.push(() => { flat(rectPts(0, 0, W, 70), '#1A1C2C'); ctx.font = '36px monospace'; ctx.fillStyle = '#FFCD75'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText('NEURONS 1,024   ▲ CARS 412   ▼ DOGS 389   WHISPERS: MUTED', 30, 36); flat(rrPts(1300, 120, 560, 90, 10), '#1A1C2C', { line: '#FFCD75', lw: 4 }); ctx.fillStyle = '#A7F070'; ctx.fillText('+1 TAXI DISTRICT UNLOCKED!', 1330, 166); });
  tourist(1750, 1020, 9, 'party', { ...feel('happy', t), view: 'q', flip: true });
}]);

// 10 · POP-UP BOOK LIBRARY: a paper city rises from an open book; a paper river; Santa pops out of a basement flap
FR.push(['10 · City of words: pop-up book', 2.4, t => {
  vgrad([[0, '#3A2A2A'], [1, '#6A4A3A']]); GRAIN = .8;
  // bookshelves behind
  for (let r = 0; r < 3; r++) for (let i = 0; i < 40; i++) { const x = i * 50 + (r % 2) * 20, h = 130 + 40 * hash(i + r * 9); flat(rectPts(x, 60 + r * 180 + (170 - h), 44, h), ['#8C2A2A', '#2A4A6A', '#6A5A2A', '#3A5A3A', '#5A3A5A'][(i + r) % 5]); }
  // the open book
  flat([[160, 760], [940, 700], [940, 1060], [160, 1060]], '#F3EBDC', { shadow: [0, 16, 'rgba(0,0,0,.4)'] }); flat([[980, 700], [1760, 760], [1760, 1060], [980, 1060]], '#F3EBDC', { shadow: [0, 16, 'rgba(0,0,0,.4)'] }); flat(rectPts(940, 700, 40, 360), '#D9CFB9');
  for (let i = 0; i < 9; i++) { inkLine([[200, 800 + i * 26], [900, 760 + i * 26]], 1.4, '#B9AF99', 'inkfine', 0); inkLine([[1020, 760 + i * 26], [1720, 800 + i * 26]], 1.4, '#B9AF99', 'inkfine', 0); }
  // the paper river winding across both pages
  flat([[160, 960], [500, 900], [900, 960], [1300, 900], [1760, 950], [1760, 1000], [1300, 950], [900, 1010], [500, 950], [160, 1010]], '#7EB5D6', { shadow: [4, 6, 'rgba(0,0,0,.25)'] });
  // pop-up buildings: book-stacks and folded paper houses standing up off the pages
  [[320, 'once'], [520, 'said'], [760, 'river'], [1180, 'because'], [1420, 'why'], [1620, 'if']].forEach(([x, w], i) => { const h = 200 + 80 * hash(i); cutout([[x - 70, 860], [x - 70, 860 - h], [x, 860 - h - 60], [x + 70, 860 - h], [x + 70, 860]], ['#E87A5A', '#F2C14E', '#7EB5D6', '#A4C97A', '#E8A0B4', '#C9A0D0'][i], { jag: 2, shadow: [10, 6, 'rgba(0,0,0,.35)'] }); flat(rectPts(x - 40, 860 - h + 40, 80, 40), '#FFF6D0'); txt(w, x, 860 - h + 60, 26, '#3A2A2A', { font: 'serif' }); });
  // Santa popping out of a basement flap
  cutout([[1260, 860], [1380, 860], [1400, 930], [1240, 930]], '#3A5A8A'); ctx.save(); ctx.translate(1320, 860 - 40 * Math.abs(Math.sin(T * 4))); cutout([[-40, 0], [40, 0], [16, -80]], '#D2473F'); cutout(rectPts(-46, -8, 92, 22), '#FFFFFF'); cutout(ellPts(18, -84, 12, 12, 10), '#FFFFFF'); ctx.restore();
  tourist(1720, 760, 9, 'beret', { ...feel('happy', t), view: 'q', flip: true });
  letter('the city of words', 960, 110, 80, '#F3EBDC', { face: 'marker', shadow: false });
}]);

// 11 · PUB DARTS, BROADCAST GRAPHICS
FR.push(['11 · Explanations that can lose: darts broadcast', 2, t => {
  vgrad([[0, '#3A2416'], [1, '#1E140C']]); GRAIN = .6;
  for (let i = 0; i < 12; i++) flat(rectPts(i * 170, 0, 160, H), i % 2 ? '#3E2818' : '#38241A');
  // the board: concentric rings with a neuron house at the bull
  const cx = 820, cy = 520;
  for (let r = 0; r < 6; r++) { const R = 380 - r * 60; for (let s = 0; s < 20; s++) { const a0 = s / 20 * TAU, a1 = (s + 1) / 20 * TAU; ctx.fillStyle = (s + r) % 2 ? (r % 2 ? '#D2473F' : '#1A1A1A') : (r % 2 ? '#3A8A4A' : '#F0E6C8'); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath(); ctx.fill(); } }
  dot(cx, cy, 30, '#D2473F'); glow(cx, cy, 160, '#FFE08A', .8);
  // dozens of grey darts in the outer rings (ten billion words), one red dart in the bull
  const dart = (x, y, a, col, s = 1) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); flat(rectPts(-80, -3, 80, 6), '#6A5A4A'); flat([[-80, 0], [-110, -18], [-96, 0], [-110, 18]], col); flat([[0, -5], [24, 0], [0, 5]], '#B9C0CE'); ctx.restore(); };
  for (let i = 0; i < 40; i++) { const q = hash(i * 3.1) * TAU, r = 260 + 110 * hash(i); dart(cx + Math.cos(q) * r, cy + Math.sin(q) * r, Math.PI + .3 * hash(i), '#9A9AA8', .8); }
  dart(cx + 6, cy - 4, Math.PI + .2, '#D2473F', 1.2);
  // telestrator scribble
  ctx.save(); ctx.strokeStyle = '#FFE34A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(cx, cy, 90, 80, .2, 0, TAU * .95); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx + 120, cy - 60); ctx.quadraticCurveTo(1100, 300, 1240, 330); ctx.stroke(); ctx.restore();
  // broadcast graphics
  flat(rectPts(0, 880, W, 130), 'rgba(10,20,60,.92)'); flat(rectPts(0, 880, 360, 130), '#D2473F'); txt('LIVE', 180, 945, 64, '#FFFFFF');
  txt('ONE SENTENCE  180!', 760, 920, 52, '#FFE34A', { align: 'left' }); txt('vs  10,000,000,000 WORDS OF REAL TEXT', 760, 978, 34, '#FFFFFF', { align: 'left', weight: '600' });
  flat(rrPts(1240, 260, 560, 150, 14), 'rgba(10,20,60,.92)'); txt('BULLSEYE', 1520, 310, 56, '#FFE34A'); txt('explanation written blind', 1520, 370, 30, '#FFFFFF', { weight: '600' });
  tourist(1640, 860, 11, 'party', { ...feel('excited', t), view: 'q', flip: true });
}]);

// 12 · NATURE DOCUMENTARY: golden savanna; the broad circuit and the tiny pixel circuit race
FR.push(['12 · How networks learn: nature documentary', 2.2, t => {
  vgrad([[0, '#F6B25A'], [.5, '#F7D08A'], [.62, '#E8A85A'], [1, '#B8803A']]); GRAIN = .7;
  glow(1400, 420, 300, '#FFF2C8', .9); dot(1400, 420, 120, '#FFE9B0');
  for (const [x, s] of [[230, 1], [1580, .7], [1760, .5]]) { ctx.save(); ctx.translate(x, 640); ctx.scale(s, s); flat(pathOf(taper([[0, 0], [10, -140], [-10, -260]], [30, 22, 16])) && taper([[0, 0], [10, -140], [-10, -260]], [30, 22, 16]), '#3A2410'); for (let k = 0; k < 4; k++) flat(ellPts(-40 + k * 50 - 60, -270 - 8 * Math.sin(k), 130, 28, 20), '#3A2410'); ctx.restore(); }
  flat([[0, 640], [W, 620], [W, H], [0, H]], '#C9963A');
  for (let i = 0; i < 140; i++) { const x = hash(i) * W, y = 660 + hash(i * 3) * 420, h = 14 + 22 * hash(i * 5); ctx.strokeStyle = mixCol('#8C6424', '#E8C27A', hash(i * 7)); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 3, y - h * .6, x + 6 * (hash(i) - .5), y - h); ctx.stroke(); }
  for (let i = 0; i < 8; i++) glow(700 - i * 50, 900 + (hash(i) - .5) * 30, 60 - i * 5, '#E8C98A', .45);
  grazer(1060, 930, 1.25, t, { walk: .3 });
  meerkat(330, 950, 1.5, { sad: true });
  letter('the broad one gets more of the learning signal', 960, 160, 46, '#3A2410', { face: 'hand', shadow: false });
  fxLetterbox(90);
  POST.push(() => { flat(rectPts(120, 870, 700, 100), 'rgba(0,0,0,.55)'); ctx.font = 'italic 36px serif'; ctx.fillStyle = '#FFF2C8'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Circuitus latus — the broad circuit', 150, 902); ctx.font = '26px serif'; ctx.fillText('it fires on more of the picture, so it grows faster', 150, 942); });
  tourist(1720, 960, 9, 'safari', { ...feel('excited', t), view: 'q', flip: true });
}]);

// 13 · GLOBE + POSTCARDS: Google-Earth zoom; Tokyo vs Brooklyn
FR.push(['13 · Zooming out: globe and postcards', 2, t => {
  vgrad([[0, '#020410'], [1, '#0A1430']]); GRAIN = .4;
  for (let i = 0; i < 300; i++) dot(hash(i * 1.3) * W, hash(i * 7.1) * H, hash(i) * 1.6 + .3, '#FFFFFF', .7);
  const cx = 760, cy = 560, R = 430, lon0 = -152 * Math.PI / 180, lat0 = 28 * Math.PI / 180;
  const proj = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180, c = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l - lon0); return [cx + R * Math.cos(p) * Math.sin(l - lon0), cy - R * (Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l - lon0)), c]; };
  glow(cx, cy, R * 1.35, '#4A8AFF', .35);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
  ctx.fillStyle = lgrad(cx - R, cy - R, cx + R, cy + R, [[0, '#3A86D0'], [1, '#123A7A']]); ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  // graticule
  ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = 1.5;
  for (let lo = -180; lo < 180; lo += 30) { ctx.beginPath(); let st = false; for (let la = -90; la <= 90; la += 5) { const [x, y, c] = proj(lo, la); if (c < 0) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); }
  for (let la = -60; la <= 60; la += 30) { ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 5) { const [x, y, c] = proj(lo, la); if (c < 0) { st = false; continue; } st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } ctx.stroke(); }
  const LAND = [
    [[-168, 66], [-140, 70], [-100, 72], [-80, 68], [-62, 60], [-55, 50], [-70, 42], [-81, 30], [-97, 26], [-105, 20], [-90, 15], [-83, 9], [-78, 8], [-92, 17], [-106, 23], [-117, 32], [-124, 40], [-124, 48], [-135, 58], [-150, 60], [-165, 62]],
    [[-80, 8], [-62, 10], [-50, 0], [-35, -7], [-40, -22], [-58, -38], [-68, -55], [-74, -45], [-71, -18], [-81, -5]],
    [[-10, 36], [-9, 44], [-2, 48], [5, 52], [10, 58], [20, 70], [40, 68], [70, 73], [100, 77], [140, 72], [170, 68], [180, 66], [160, 60], [140, 52], [130, 42], [122, 30], [110, 20], [105, 10], [100, 13], [92, 22], [80, 15], [73, 20], [66, 25], [57, 25], [50, 30], [35, 36], [28, 41], [20, 40], [12, 44], [5, 43], [-5, 36]],
    [[-17, 21], [-5, 36], [10, 37], [32, 31], [43, 12], [51, 12], [40, -15], [32, -28], [20, -35], [12, -18], [9, 4], [-8, 5], [-17, 14]],
    [[114, -22], [130, -12], [142, -11], [153, -28], [146, -39], [135, -35], [115, -34]],
    [[130, 31], [136, 34], [141, 38], [142, 44], [140, 42], [135, 35]], [[-55, 60], [-30, 68], [-20, 78], [-50, 82], [-65, 76]], [[-160, 19], [-155, 20], [-155, 18.5]]];
  LAND.forEach((L, li) => { const P = []; for (let i = 0; i < L.length; i++) { const a = L[i], b = L[(i + 1) % L.length]; for (let k2 = 0; k2 < 6; k2++) { const [x, y, c] = proj(lerp(a[0], b[0], k2 / 6), lerp(a[1], b[1], k2 / 6)); P.push(c < 0 ? null : [x, y]); } } const Q = P.filter(Boolean); if (Q.length < 3) return; ctx.fillStyle = lgrad(0, cy - R, 0, cy + R, [[0, '#9CC27A'], [.5, '#6E9F58'], [1, '#C9B48E']]); ctx.strokeStyle = '#3E6A3A'; ctx.lineWidth = 2; ctx.beginPath(); Q.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); });
  for (let i = 0; i < 7; i++) { ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(cx + (hash(i * 9) - .5) * R * 1.6, cy + (hash(i * 4) - .5) * R * 1.6, 120 + 60 * hash(i), 18, (hash(i * 2) - .5) * .6, 0, TAU); ctx.fill(); ctx.restore(); }
  const sh = ctx.createRadialGradient(cx - 160, cy - 170, 60, cx, cy, R); sh.addColorStop(0, 'rgba(255,255,255,.18)'); sh.addColorStop(.7, 'rgba(0,0,40,.1)'); sh.addColorStop(1, 'rgba(0,0,40,.6)'); ctx.fillStyle = sh; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  ctx.restore();
  ctx.save(); ctx.strokeStyle = 'rgba(160,210,255,.6)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R + 4, 0, TAU); ctx.stroke(); ctx.restore();
  // the flight arc Brooklyn → Tokyo, pins
  const tk = proj(139.7, 35.7), ny = proj(-73.9, 40.7);
  ctx.save(); ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 4; ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.moveTo(ny[0], ny[1]); ctx.quadraticCurveTo((ny[0] + tk[0]) / 2, Math.min(ny[1], tk[1]) - 260, tk[0], tk[1]); ctx.stroke(); ctx.restore();
  for (const [p, lab] of [[tk, 'Tokyo'], [ny, 'Brooklyn']]) { const [x, y] = p; flat([[x, y], [x - 16, y - 36], [x + 16, y - 36]], '#D2473F'); dot(x, y - 44, 18, '#D2473F'); dot(x, y - 44, 7, '#FFFFFF'); txt(lab, x, y - 92, 34, '#FFFFFF', { weight: '800', stroke: '#0A1430', sw: 6 }); }
  // postcards
  ctx.save(); ctx.translate(1500, 330); ctx.rotate(.08); flat(rectPts(-230, -150, 460, 300), '#F3EBDC', { shadow: [10, 12, 'rgba(0,0,0,.5)'] }); flat(rectPts(-210, -130, 420, 210), '#2A1A3A'); for (let i = 0; i < 6; i++) { flat(rectPts(-200 + i * 70, -70 - 60 * hash(i), 58, 170), '#4A3A6A'); flat(rectPts(-170 + i * 70, -50, 12, 70), ['#FF6FA8', '#6FE3FF', '#FFD36B'][i % 3]); glow(-164 + i * 70 + 1500, 300, 40, ['#FF6FA8', '#6FE3FF', '#FFD36B'][i % 3], .3); } txt('Greetings from TOKYO', 0, 118, 32, '#2A1A3A', { font: 'serif' }); ctx.restore();
  ctx.save(); ctx.translate(1520, 770); ctx.rotate(-.06); flat(rectPts(-230, -150, 460, 300), '#F3EBDC', { shadow: [10, 12, 'rgba(0,0,0,.5)'] }); flat(rectPts(-210, -130, 420, 210), '#E8B48A'); flat(rectPts(-210, 20, 420, 60), '#6A8AB5'); for (const bx of [-120, 120]) { flat(rectPts(bx - 22, -110, 44, 160), '#8C5A4A'); flat([[bx - 22, -110], [bx, -130], [bx + 22, -110]], '#8C5A4A'); } ctx.strokeStyle = '#3A2A2A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-210, -40); ctx.quadraticCurveTo(-120, -110, 0, 0); ctx.quadraticCurveTo(120, -110, 210, -40); ctx.stroke(); for (let i = -9; i <= 9; i++) { ctx.beginPath(); ctx.moveTo(i * 22, 0 - Math.abs(i) * 0); ctx.lineTo(i * 22, -50 + Math.abs(i) * 4); ctx.stroke(); } txt('Greetings from BROOKLYN', 0, 118, 32, '#3A2A2A', { font: 'serif' }); ctx.restore();
  tourist(1180, 1010, 10, 'safari', { ...feel('confused', t), view: 'q', flip: true });
}]);

// 14 · WORLD'S FAIR POSTER: retro-futurist lab of tomorrow; thousands of little robot scientists; two plugs connect
FR.push(["14 · Lab of the future: 1960s World's Fair poster", 2, t => {
  bg('#F1E3C6'); GRAIN = 1; PAPER = false;
  // sunburst
  for (let i = 0; i < 36; i++) { const a0 = i / 36 * TAU, a1 = (i + .5) / 36 * TAU; ctx.fillStyle = '#F2B04A'; ctx.beginPath(); ctx.moveTo(960, 520); ctx.lineTo(960 + Math.cos(a0) * 1600, 520 + Math.sin(a0) * 1600); ctx.lineTo(960 + Math.cos(a1) * 1600, 520 + Math.sin(a1) * 1600); ctx.closePath(); ctx.fill(); }
  dot(960, 520, 300, '#E8862A');
  // the tower of the laboratory, with orbit rings
  flat([[880, 820], [920, 260], [1000, 260], [1040, 820]], '#2E6A6A'); flat(ellPts(960, 260, 120, 40, 30), '#2E6A6A'); flat(ellPts(960, 250, 90, 26, 30), '#9FE3C8');
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.strokeStyle = '#1A3A3A'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(960, 420 + i * 120, 260 - i * 40, 50, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
  // ground and marching scientists
  flat([[0, 820], [W, 820], [W, H], [0, H]], '#2E6A6A');
  for (let r = 0; r < 4; r++) for (let i = 0; i < 40; i++) { const x = i * 50 + (r % 2) * 25 + (T * 30) % 50, y = 860 + r * 50, s = .6 + r * .15; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); flat(rrPts(-14, -24, 28, 20, 4), '#D97757'); flat(rectPts(-10, -4, 4, 8), '#1A3A3A'); flat(rectPts(6, -4, 4, 8), '#1A3A3A'); dot(14, -30, 6, '#FFE08A'); ctx.restore(); }
  // the two giant plugs meeting
  flat(rrPts(560, 600, 200, 90, 20), '#1A3A3A'); flat(rectPts(760, 625, 50, 12), '#B9C0CE'); flat(rectPts(760, 655, 50, 12), '#B9C0CE'); flat(rrPts(820, 600, 200, 90, 20), '#E8862A', { line: '#1A3A3A', lw: 6 });
  txt('AGENTS', 660, 720, 30, '#1A3A3A'); txt('ARCHITECTURES', 920, 720, 30, '#1A3A3A');
  txt('THE LABORATORY', 960, 90, 110, '#1A3A3A', { font: 'serif' }); txt('OF TOMORROW', 960, 190, 80, '#C8402A', { font: 'serif' });
  txt('WORLD’S FAIR OF MINDS · 2026', 960, 1040, 36, '#F1E3C6');
  tourist(1520, 800, 10, 'helmet', { ...feel('proud', t), view: 'q', flip: true });
}]);

// 15 · ROUSSEAU JUNGLE: the tiger in a lush painted jungle; through a V portal, the galaxy is now an ordered map
FR.push(['15 · Why it matters: Rousseau jungle → home', 2.4, t => {
  GRAIN = .9;
  const front = rousseau(t, { clear: true, mx: 1560, my: 190 });
  tigerArt(800, 905, 1.2, { walk: .3 });
  // the V portal home: the opening galaxy, now an ordered map of constellations
  vPortal(1500, 430, 400, 340, 1, () => { vgrad([[0, '#05060F'], [1, '#141038']]); for (let c = 0; c < 6; c++) { const qx = 1370 + (c % 3) * 130, qy = 330 + Math.floor(c / 3) * 130; for (let i = 0; i < 6; i++) { const x = qx + Math.cos(i) * 42, y = qy + Math.sin(i * 1.7) * 30; dot(x, y, 3.2, '#FFE3A6'); glow(x, y, 10, '#FFE3A6', .6); if (i) { ctx.strokeStyle = 'rgba(255,227,166,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(qx + Math.cos(i - 1) * 42, qy + Math.sin((i - 1) * 1.7) * 30); ctx.lineTo(x, y); ctx.stroke(); } } } }, { glow: '#FFE3A6', edge: '#FFF6D0' });
  front();
  tourist(1300, 1030, 9, null, { ...feel('love', t), view: 'q' });
  letter('clean the way a rainforest is clean', 720, 120, 56, '#1A2A1A', { face: 'marker', shadow: false });
}]);

// 16 · the ITINERARY MAP: Clawd's passport opens at each act break; a painted map of every stop, "you are here"
FR.push(['Act breaks: the itinerary map', 2, t => {
  vgrad([[0, '#3A2A2A'], [1, '#1E1414']]); GRAIN = 1;
  // an open passport
  flat(rrPts(150, 90, 1620, 900, 30), '#5A2A3A', { shadow: [14, 18, 'rgba(0,0,0,.5)'] });
  flat(rrPts(180, 115, 780, 850, 16), '#F1E6CC'); flat(rrPts(960, 115, 780, 850, 16), '#F1E6CC'); flat(rectPts(950, 115, 20, 850), '#D9CBAA');
  // the winding road through the four acts
  const P = []; for (let i = 0; i < 16; i++) { const page = i < 8 ? 0 : 1, j = i % 8, x = (page ? 1040 : 260) + (j % 2 ? 300 : 40), y = 210 + j * 90; P.push([x, y]); }
  ctx.save(); ctx.strokeStyle = '#8C6A48'; ctx.lineWidth = 5; ctx.setLineDash([16, 12]); ctx.beginPath(); through(P.slice(0, 8), 8).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.beginPath(); through(P.slice(8), 8).forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke(); ctx.restore();
  const here = 8, ACT = ['', 'I · the belief', 'II · the investigation', 'III · how it works', 'IV · what it means'], ACOL = ['', '#7B5CA8', '#C2456A', '#3A9C98', '#E8AA38'];
  STOPS.forEach(([name, act], i) => { const [x, y] = P[i], done = i < here, cur = i === here; dot(x, y, cur ? 30 : 22, done ? ACOL[act] : '#D9CBAA'); ctx.save(); ctx.strokeStyle = '#3A2A2A'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, cur ? 30 : 22, 0, TAU); ctx.stroke(); ctx.restore(); txt(String(i), x, y + 1, cur ? 26 : 20, done || cur ? '#FFFFFF' : '#8C7A5A', { weight: '800' }); txt(name, x + (cur ? 48 : 40), y, 30, '#3A2A2A', { align: 'left', weight: '600', font: 'serif' }); if (cur) { glow(x, y, 80, '#FFE08A', .7); txt('you are here', x + 48, y + 36, 24, '#C2456A', { align: 'left', weight: '800' }); } });
  for (let a = 1; a <= 4; a++) { const lx = a <= 2 ? 230 + (a - 1) * 360 : 1010 + (a - 3) * 360; dot(lx, 930, 12, ACOL[a]); txt(ACT[a], lx + 22, 930, 24, ACOL[a], { align: 'left', weight: '900' }); }
  passStamp(3, 'film noir', 800, 330, 1, { rot: .12 }); passStamp(7, 'game show', 830, 640, 1, { rot: -.2, col: '#3A64B8' });
  tourist(1660, 1020, 10, 'safari', { ...feel('happy', t), view: 'q', flip: true });
  letter('Act III: how it really works', 960, 60, 50, '#F1E6CC', { face: 'marker', shadow: false });
}]);

FR.forEach((f, i) => { if (i > 15) return; const d = f[2]; f[2] = t => { d(t); POST.push(() => passStamp(i, STOPS[i][0], 1760, 920, 1, { col: [3, 8].includes(i) ? '#F2EEE2' : '#C2456A' })); }; });
globalThis.FRAMES = FR;
