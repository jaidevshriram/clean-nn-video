const FR = [];
FR.push(['tiger', 1, t => { bg('#DDE3B0'); GRAIN = .6; tigerArt(900, 820, 1.5, { walk: .15 }); tigerArt(1500, 1030, .6, { walk: .6, deer: 1 }); }]);
FR.push(['jungle', 1, t => { const front = rousseau(t, { clear: true }); tigerArt(820, 900, 1.25, { walk: .3 }); front(); }]);
FR.push(['savanna', 1, t => { bg('#F2C77A'); grazer(800, 900, 1.3, t, { walk: .2 }); meerkat(1400, 900, 2.2, {}); }]);
globalThis.FRAMES = FR;
