/* Bot Assembly Shop — 40 more levels, built from reusable course sections */
'use strict';

/* Each section draws itself with the course builder (b). b.need() records what the
   course checker's test bot carries; b.z() records where it presses a key. Neither is shown to players. */
const SEG = {
  flat: (b, p = 10) => b.flat(p),
  hills: (b, p = 2) => { for (let i = 0; i < p; i++) b.gup(2).flat(3).gdown(2).flat(4); },
  bighill: (b, p = 4) => b.gup(p).flat(4).gdown(p).flat(4),
  gap: (b, p = 3) => b.flat(10).gup(2).gap(p).flat(10),
  gaplava: (b, p = 3) => b.flat(10).gup(2).gap(p, LAVA, 5, 2).flat(10),
  steep: (b, p = 4) => b.flat(2).up(p).flat(5),
  fall: (b, p = 8) => { if (p >= 12) b.need('shocks', 'gyro'); b.flat(4).step(-p).flat(10); },
  ice: (b, p = 3) => b.mat(ICE).flat(6).gup(p).flat(4).gdown(p).flat(6).mat(DIRT),
  mud: (b, p = 10) => b.mat(MUD).flat(p).gup(2).flat(4).mat(DIRT),
  sand: (b, p = 12) => b.mat(SAND).flat(p).gup(2).flat(3).gdown(2).flat(3).mat(DIRT),
  rubber: (b, p = 12) => b.mat(RUBBER).flat(3).gdown(2).flat(p).gup(2).flat(3).mat(DIRT),
  ledges: (b, p = 2) => { b.need('big'); for (let i = 0; i < p; i++) b.flat(7).bump(3).step(1); b.flat(4); },
  crates: (b, p = 2) => { b.need('blade').flat(4); for (let i = 0; i < p; i++) for (let j = 0; j < 3; j++) b.o('crate', i, j); b.flat(10); },
  steel: (b) => b.flat(3).o('steel', 2).flat(8).o('ferry', 2, 0).gap(10).flat(6),
  wood: (b, p = 1) => { b.need('saw').flat(5); for (let i = 0; i < p; i++) b.o('woodwall', i * 1.4); b.flat(8 + p); },
  icew: (b, p = 1) => { b.need('torch').flat(5); for (let i = 0; i < p; i++) b.o('iceblock', i * 1.6); b.flat(8 + p * 2); },
  rock: (b, p = 1) => { b.need('drill').flat(5); for (let i = 0; i < p; i++) b.o('stone', i * 2.6); b.flat(8 + p * 3); },
  gateeasy: (b) => b.flat(4).o('switch', 2, 1.2).o('gate', 6).flat(10),
  gatehigh: (b) => b.need('cannon').flat(8).gup(2).o('switch', 5, 3.8).flat(10).o('gate', 0).flat(6),
  plate: (b) => b.need('heavy').flat(4).o('plate', 3).o('gate', 8).flat(12),
  zip: (b, p = 16) => b.need('hook').gup(3).flat(5).o('zip', -1, 5.5, [p + 3, 1.5]).gap(p, LAVA, 8, 2).step(-3).flat(10),
  swing: (b, p = 7) => b.need('hook').gup(1).flat(4).o('anchor', p / 2, 7).gap(p, LAVA, 6, 2).flat(8),
  pool: (b, p = 10) => b.need('floats').flat(2).pool(p, 3).flat(4),
  springup: (b, p = 3) => b.flat(4).o('spring', 3).flat(5).step(p).flat(6),
  lift: (b) => b.flat(5).o('lift', 2, 0).gap(4).step(5).flat(6),
  ferry: (b) => b.flat(5).o('ferry', 2, 0).gap(10).flat(6),
  hammers: (b, p = 2) => { b.need('righter').flat(4); for (let i = 0; i < p; i++) b.o('hammer', 4 + i * 9, 5.5); b.flat(6 + p * 9); },
  spinner: (b) => b.need('righter').flat(4).o('spinner', 5).flat(12),
  seesaw: (b) => b.flat(3).o('seesaw', 5).flat(12),
  bridge: (b, p = 10) => b.flat(3).o('bridge', 0, 0, [p, 0]).gap(p).flat(5),
  climb: (b, p = 5) => b.need('suction').flat(8).z(-4, 4, { climb: 1 }).step(p).flat(8),
  propgap: (b, p = 12) => b.need('prop').flat(6).z(-1.5, p + 1, { prop: 1 }).gap(p, LAVA, 8, 2).flat(8),
  propwall: (b, p = 6) => b.need('prop').flat(6).z(-4.5, 1.5, { prop: 1 }).step(p).flat(8),
  board: (b, p = 8) => b.flat(8).o('springboard', -1.5).gap(p).flat(10),
  launch: (b, p = 18) => b.flat(6).o('launcher', -1.5).gap(p).flat(20),
  launchwall: (b, p = 7) => b.flat(6).o('launcher', -0.5).flat(10).step(p).flat(24),
  tele: (b) => b.flat(6).o('tele', -2, 1, [8, 1]).step(8).flat(4).step(-8).flat(8),
  conveyor: (b, p = 2) => { b.flat(4); for (let i = 0; i < p; i++) b.o('convL', 3 + i * 6); b.flat(6 * p + 5); },
  blower: (b) => b.flat(13).o('blower', 0).flat(6),
  moon: (b, p = 10) => b.flat(8).gup(2).o('moon', p / 2, -3).gap(p).flat(10),
  lasers: (b, p = 2) => { b.flat(6); for (let i = 0; i < p; i++) b.o('laser', 3 + i * 7); b.flat(p * 7 + 4); },
  dropper: (b) => b.need('drill').flat(6).gup(4).o('dropper', 0, 7).flat(6).gdown(2),
  tnt: (b) => b.need('cannon').flat(12).o('tnt', 0).o('stone', 2).o('stone', 4.4).flat(12),
  glass: (b, p = 2) => { b.need('fast').flat(14); for (let i = 0; i < p; i++) b.o('glass', i * 5); b.flat(p * 5 + 8); },
  ballpit: (b) => b.flat(3).gdown(1).flat(1).o('ballpit', 3).flat(7).gup(1).flat(3),
  // --- puzzle sections
  bridgegap: (b) => b.need('bridge').flat(9).z(-2.0, -1.2, { bridge: 1 }).gap(3, LAVA, 5, 2).flat(8),
  droneswitch: (b) => b.need('drone').flat(8).z(-2, 3, { drone: 1 }).o('switch', 6, 9).o('gate', 6).flat(14),
  hoverlava: (b) => b.need('hover').flat(8).z(-1.5, 10.5, { hover: 1 }).gap(9, LAVA, 2).flat(8),
  mlasers: (b, p = 4) => { b.need('mirror').flat(6); for (let i = 0; i < p; i++) b.o('laser', 3 + i * 3); b.flat(p * 3 + 6); },
  charge: (b) => b.flat(2).o('charger', 1).flat(4),
  fix: (b) => b.flat(2).o('repair', 1).flat(4),
};

/* id, name, kind, stars, sky, start height, checkpoint every N sections, sections */
const LEVELS = [
  // ---- speed
  ['l01', 'Rolling Start', 'speed', 1, '', 10, 1, 'hills:2 flat:20 hills:1'],
  ['l02', 'Hop Scotch', 'speed', 2, '', 10, 1, 'gap:2 hills:1 gap:3'],
  ['l03', 'Boardwalk', 'speed', 2, 'desert', 10, 1, 'board:6 hills:2 board:8'],
  ['l04', 'Glass Dash', 'speed', 2, 'night', 10, 1, 'glass:2 hills:1 glass:3'],
  ['l05', 'Belt Buster', 'speed', 3, '', 10, 1, 'conveyor:2 gap:3 conveyor:3'],
  ['l06', 'Frozen Mile', 'speed', 3, 'snow', 10, 1, 'ice:2 gap:3 ice:3'],
  ['l07', 'Moon Hop', 'speed', 3, 'space', 10, 1, 'moon:10 hills:1 moon:12'],
  ['l08', 'Bounce House', 'speed', 3, 'candy', 14, 1, 'rubber:14 gap:3 rubber:18'],
  ['l09', 'Cannonball Run', 'speed', 3, 'night', 10, 1, 'launch:18 fix hills:2 launch:20'],
  ['l10', 'Dune Dash', 'speed', 3, 'desert', 10, 1, 'sand:12 hills:2 sand:16 gap:3'],
  ['l11', 'Wind Sprint', 'speed', 4, 'snow', 10, 1, 'blower hills:1 blower gap:3'],
  ['l12', 'Portal Rally', 'speed', 4, 'space', 10, 1, 'tele gap:3 tele board:8 tele'],
  // ---- strength
  ['l13', 'Stair Master', 'strength', 2, '', 8, 1, 'steep:3 flat:6 steep:4'],
  ['l14', 'Crate Expectations', 'strength', 2, '', 10, 1, 'crates:2 crates:3 steel'],
  ['l15', 'Mud Bath', 'strength', 2, '', 10, 1, 'mud:12 mud:16'],
  ['l16', 'Heavy Duty', 'strength', 3, 'night', 10, 1, 'plate steel plate'],
  ['l17', 'Lumber Yard', 'strength', 3, '', 10, 1, 'wood:1 crates:2 wood:3'],
  ['l18', 'Rock Bottom', 'strength', 3, 'desert', 8, 1, 'rock:1 steep:4 rock:2'],
  ['l19', 'Meltdown', 'strength', 3, 'snow', 10, 1, 'icew:1 ice:2 icew:2'],
  ['l20', 'Big Wheel Country', 'strength', 3, '', 8, 1, 'ledges:2 mud:10 ledges:2'],
  ['l21', 'Against the Wind', 'strength', 4, 'snow', 8, 1, 'blower steep:4 blower'],
  ['l22', 'Treadmill Mountain', 'strength', 4, '', 6, 1, 'conveyor:2 steep:5 conveyor:3 steep:4'],
  ['l23', 'Boom Town', 'strength', 4, 'desert', 10, 1, 'tnt hills:1 steep:3 tnt'],
  ['l24', 'Avalanche', 'strength', 4, 'snow', 8, 1, 'dropper steep:3 dropper'],
  // ---- crazy
  ['l25', 'Up and Over', 'crazy', 2, '', 8, 1, 'springup:3 lift bridge:8'],
  ['l26', 'Zip City', 'crazy', 3, 'night', 12, 1, 'zip:14 zip:18'],
  ['l27', 'Swing Set', 'crazy', 3, '', 10, 1, 'swing:6 swing:7'],
  ['l28', 'Splash Zone', 'crazy', 3, 'speed', 10, 1, 'pool:10 hills:1 pool:14'],
  ['l29', 'Laser Maze', 'crazy', 3, 'space', 10, 1, 'lasers:2 hills:1 lasers:3'],
  ['l30', 'Chopper Alley', 'crazy', 3, 'speed', 8, 1, 'propgap:10 propwall:5'],
  ['l31', 'Spider Bot', 'crazy', 4, 'night', 6, 1, 'climb:4 climb:6'],
  ['l32', 'Ball Pit Panic', 'crazy', 3, 'candy', 10, 1, 'ballpit hammers:1 ballpit seesaw'],
  ['l33', 'Free Fall', 'crazy', 4, 'space', 30, 1, 'fall:8 fall:10 fall:6'],
  ['l34', 'Gate Crashers', 'crazy', 4, '', 10, 1, 'gateeasy gatehigh plate'],
  ['l35', 'Mixed Nuts', 'crazy', 4, 'candy', 14, 1, 'tele board:7 pool:8 zip:12'],
  // ---- puzzle: a rule limits how many gadgets fit, and pit stops let you swap them
  ['l41', 'Pit Stop 101', 'puzzle', 2, 'speed', 10, 1, 'wood:1 pit icew:1 pit rock:1'],
  ['l42', 'Two Hands', 'puzzle', 3, 'desert', 10, 1, 'wood:2 rock:1 pit pool:10 icew:1'],
  ['l43', 'Mind the Gap', 'puzzle', 3, 'night', 10, 1, 'bridgegap pit droneswitch'],
  ['l44', 'Hot Foot', 'puzzle', 3, 'strength', 10, 1, 'hoverlava pit wood:2 pit hoverlava'],
  ['l45', 'Mirror Mirror', 'puzzle', 4, 'space', 10, 1, 'mlasers:4 pit gatehigh pit zip:14'],
  ['l46', 'Swap Meet', 'puzzle', 4, 'snow', 8, 1, 'zip:14 pit climb:5 pit propgap:10 pit rock:2'],
  ['l47', 'Toolbelt', 'puzzle', 4, 'candy', 10, 1, 'wood:1 icew:1 pit rock:1 tnt pit pool:10 droneswitch'],
  ['l48', 'The Long Con', 'puzzle', 5, 'crazy', 8, 2, 'bridgegap wood:2 pit hoverlava mlasers:3 pit climb:6 zip:16 pit rock:2 gatehigh'],
  // ---- legendary: long, few checkpoints, tight budgets
  ['l36', 'The Long Haul', 'boss', 5, 'desert', 5, 3, 'mud:16 steep:5 sand:14 conveyor:3 blower steep:6 charge rock:2 wood:2 crates:3 steep:4 blower rock:1'],
  ['l37', 'Leap of Faith', 'boss', 5, 'space', 30, 3, 'fall:12 board:9 launch:20 fix fall:13 moon:12 launchwall:7 gaplava:3 propgap:14 propwall:6 fall:12 launch:22'],
  ['l38', 'Toolbox Terror', 'boss', 5, 'night', 10, 3, 'wood:3 icew:2 rock:2 gatehigh lasers:3 tnt plate hammers:2 wood:2 rock:1'],
  ['l39', 'Sky Pirate', 'boss', 5, 'speed', 12, 3, 'zip:20 swing:7 climb:7 propgap:16 pool:14 zip:16 swing:7 propwall:6'],
  ['l40', 'The Impossible Course', 'boss', 5, 'crazy', 12, 4, 'lasers:3 climb:8 fall:13 zip:20 charge hammers:3 steep:6 fix propgap:16 climb:6 lasers:2 fall:12 plate launch:20'],
];
const LEVEL_BLURB = { 1: 'A gentle warm-up.', 2: 'Getting trickier.', 3: 'Plan before you build.', 4: 'For experienced engineers.', 5: 'Legendary. Few checkpoints. Good luck.' };

/* The bot the course checker drives. Budgets are set from what it costs. */
const REF_GADGETS = ['hook', 'saw', 'drill', 'torch', 'cannon', 'suction', 'prop', 'floats', 'blade', 'bridge', 'drone', 'hover', 'mirror'];
const gadgetsFor = needs => REF_GADGETS.filter(g => needs[g]);
function refBuild(needs, gad, slots) {
  gad = gad.slice(); const n = slots || gad.length;
  if (!slots && gad.length !== 3 && gad.length < 5) gad.push('righter');   // a spare slot gets a roll cage
  const chassis = n > 5 ? 'tank' : n > 3 ? 'hauler' : 'rover';
  const gear = needs.suction ? (chassis === 'rover' ? 4 : 5) : needs.fast && !needs.big ? 2 : needs.big ? 4 : 3;
  return { name: 'Checker', color: '#ffc21a', chassis, wheels: needs.big ? 'big' : 'std', tires: 'spiked', motor: 'beast', gear, battery: 'large', drive: 'awd', gadgets: gad, upgrades: ['shocks', 'gyro'].filter(u => needs[u]) };
}

function moreLevels() {
  const made = LEVELS.map(([id, name, kind, stars, sky, h0, cpEvery, segs], idx) => {
    const boss = kind === 'boss', puzzle = kind === 'puzzle', b = CB(id, name, boss || puzzle ? 'crazy' : kind, 1000, puzzle ? 'A puzzle course. Read the rule, then plan your pit stops.' : LEVEL_BLURB[stars], null);
    const groups = [{}], pits = [], c0 = b.c; c0.needs = groups[0];
    b.setH(h0).flat(4).o('start').flat(8);
    segs.split(' ').forEach((sg, i) => {
      const [nm, par] = sg.split(':');
      if (nm === 'pit') { b.flat(4).o('pit', 0).flat(5); pits.push(b.x - 5); groups.push({}); c0.needs = groups[groups.length - 1]; return; }
      if (i % cpEvery === 0 && i) b.flat(3).o('checkpoint', -1.5).flat(2);
      SEG[nm](b, par ? +par : undefined);
      if (b.h < 3 || b.h > 31) throw new Error(`${id} ${nm}: height ${b.h} out of range`);
    });
    b.flat(6).o('finish', -2).flat(6);
    const c = b.done(), all = Object.assign({}, ...groups), lists = groups.map(gadgetsFor);
    c.needs = all;
    if (puzzle) { c.rules = { slots: Math.max(1, ...lists.map(l => l.length)) }; c.plan = pits.map((x, i) => ({ x, gadgets: lists[i + 1] })); }
    const ref = refBuild(all, puzzle ? lists[0] : gadgetsFor(all), puzzle ? c.rules.slots : 0);
    const cost = Math.max(...lists.map(l => botSpec(Object.assign({}, ref, { gadgets: puzzle ? l : ref.gadgets })).cost));
    Object.assign(c, { stars, boss, group: boss ? 'boss' : puzzle ? 'puzzle' : '', sky: sky || '', num: idx + 1, ref });
    c.budget = Math.ceil(cost * (boss ? 1.03 : 1.12) / 50) * 50;
    if (REF_TIMES[id]) c.medals = [Math.ceil(REF_TIMES[id] * 1.05), Math.ceil(REF_TIMES[id] * 1.7)];
    return c;
  });
  return made.concat(mazes());
}

/* ---------------- Mazes ----------------
   Underground, dark, several floors. A rule allows one gadget at a time and a small battery that
   drains the whole time, so the route has to pass chargers and pit stops in the right order.
   Floors are 5 apart: a hall at height y is clear from y to y+3. `solve` is the checker's route. */
function MZ(id, name, w, stars, desc) {
  const c = newCourse(w);
  Object.assign(c, { id, name, kind: 'crazy', group: 'maze', stars, builtin: true, desc, sky: 'cave', needs: {}, test: [], rules: { slots: 1, energy: 50, drain: 0.3, dark: true } });
  for (let x = 0; x < w; x++) for (let y = 0; y < 36; y++) tset(c, x, y, tcode(1, 0));
  const clear = (x0, x1, y0, y1, v = 0) => { for (let x = x0; x < x1; x++) for (let y = y0; y < y1; y++) tset(c, x, y, v); };
  const m = {
    c, clear,
    hall(x0, x1, y) { clear(x0, x1, y, y + 4); return m; },
    lift(x, y) { clear(x, x + 4, y, y + 9); c.objs.push({ t: 'lift', x: x + 2, y }); return m; },   // carries from floor y to floor y+5
    hole(x, y) { clear(x, x + 3, y - 1, y); return m; },                                           // a hole in the floor of hall y
    o(t, x, y, ex) { c.objs.push(Object.assign({ t, x, y }, ex)); return m; },
    done(first, solve) {
      c.ref = { name: 'Checker', color: '#ffc21a', chassis: 'rover', wheels: 'std', tires: 'spiked', motor: 'titan', gear: 2, battery: 'small', drive: 'awd', gadgets: [first], upgrades: ['ballast'] };
      c.solve = solve;
      const cost = Math.max(...[first].concat(solve.filter(s => s[0] === 'swap').map(s => s[1][0])).map(g => botSpec(Object.assign({}, c.ref, { gadgets: [g] })).cost));
      c.budget = Math.ceil(cost * 1.15 / 50) * 50;
      if (REF_TIMES[id]) c.medals = [Math.ceil(REF_TIMES[id] * 1.05), Math.ceil(REF_TIMES[id] * 1.7)];
      return c;
    },
  };
  return m;
}
function mazes() {
  const A = 5, B = 10, C = 15, D = 20, E = 25, L = [];
  L.push(MZ('m1', 'Mouse House', 70, 3, 'Three floors, two lifts and a couple of dead ends.')
    .hall(2, 66, A).hall(2, 66, B).hall(2, 66, C)
    .o('start', 5, A).o('woodwall', 20, A).lift(40, A).o('sign', 52, A, { txt: 'Dead end!' }).o('charger', 58, A)
    .o('checkpoint', 36, B).o('pit', 32, B).o('charger', 27, B).o('iceblock', 18, B).lift(6, B).o('repair', 56, B).o('checkpoint', 13, C)
    .o('laser', 26, C).o('charger', 36, C).o('laser', 46, C).o('finish', 60, C)
    .done('saw', [['go', 36], ['lift', 42], ['go', 32], ['swap', ['torch']], ['go', 27], ['charge'], ['go', 12], ['lift', 8], ['go', 36], ['charge'], ['go', 60]]));

  L.push(MZ('m2', 'Portal Puzzle', 80, 3, 'Three portals. Only one of them helps.')
    .hall(2, 76, A).hall(2, 46, B).hall(50, 76, B).hall(2, 76, C)
    .o('start', 5, A).o('woodwall', 14, A).lift(20, A).o('sign', 34, A, { txt: 'Shortcut? ->' }).o('tele', 56, A + 1, { x2: 60, y2: B + 1 })
    .o('checkpoint', 17, B).o('pit', 14, B).o('charger', 10, B).o('tele', 4, B + 1, { x2: 8, y2: C + 1 }).o('checkpoint', 12, C).o('repair', 36, B)
    .o('charger', 66, B).o('tele', 72, B + 1, { x2: 8, y2: A + 1 })
    .o('switch', 20, C + 1.2).o('gate', 28, C).o('charger', 38, C).o('stone', 48, C).o('finish', 70, C)
    .done('saw', [['go', 17.5], ['lift', 22], ['go', 14], ['swap', ['drill']], ['go', 10], ['charge'], ['tele', 4], ['go', 38], ['charge'], ['go', 70]]));

  L.push(MZ('m3', 'Flooded Basement', 80, 4, 'Start at the top and work down. The middle floor is under water.')
    .hall(2, 76, C).hall(2, 76, B).hall(2, 76, A)
    .o('start', 5, C).o('iceblock', 16, C).hole(30, C).o('sign', 40, C, { txt: 'Mind the hole' }).o('charger', 52, C)
    .o('checkpoint', 28, B).o('pit', 24, B).o('charger', 19, B).o('sign', 8, B, { txt: 'Nothing here' }).hole(66, B).o('checkpoint', 62, A)
    .o('convR', 50, A).o('laser', 36, A).o('charger', 28, A).o('laser', 20, A).o('finish', 8, A));
  L[2].clear(40, 60, B, B + 2, WATER);
  L[2] = L[2].done('torch', [['go', 27.5], ['go', 31.5], ['go', 24], ['swap', ['snorkel']], ['go', 19], ['charge'], ['go', 67.5], ['go', 28], ['charge'], ['go', 8]]);

  L.push(MZ('m4', 'Switchback Tower', 70, 4, 'Five floors, four lifts, and a different tool on every other floor.')
    .hall(2, 66, A).hall(2, 66, B).hall(2, 66, C).hall(2, 66, D).hall(2, 66, E)
    .o('start', 5, A).o('plate', 20, A).o('gate', 30, A).lift(56, A)
    .o('stone', 44, B).o('checkpoint', 39, B).o('pit', 36, B).o('charger', 32, B).o('woodwall', 22, B).lift(6, B)
    .o('checkpoint', 13, C).o('laser', 22, C).o('charger', 32, C).o('laser', 42, C).lift(56, C).o('checkpoint', 52, D).o('checkpoint', 13, E)
    .o('switch', 46, D + 1.2).o('gate', 38, D).o('pit', 30, D).o('charger', 26, D).o('iceblock', 18, D).lift(6, D)
    .o('charger', 30, E).o('finish', 58, E)
    .done('drill', [['go', 52], ['lift', 58], ['go', 36], ['swap', ['saw']], ['go', 32], ['charge'], ['go', 12], ['lift', 8], ['go', 32], ['charge'], ['go', 52], ['lift', 58], ['go', 30], ['swap', ['torch']], ['go', 26], ['charge'], ['go', 12], ['lift', 8], ['go', 30], ['charge'], ['go', 58]]));

  L.push(MZ('m5', 'The Labyrinth', 100, 5, 'A hole, a lake of lava and a switch nobody can reach. Four gadgets, one slot.')
    .hall(2, 66, A).hall(2, 96, B).hall(2, 96, C)
    .o('start', 5, A).o('woodwall', 14, A).lift(26, A).o('sign', 44, A, { txt: 'Wrong way' }).o('charger', 52, A).o('tele', 62, A + 1, { x2: 8, y2: A + 1 })
    .o('checkpoint', 31, B).o('pit', 33, B).o('charger', 36, B).hole(44, B).o('checkpoint', 55, B).o('checkpoint', 87, C).o('laser', 51, B).o('pit', 58, B).o('charger', 62, B).lift(90, B)
    .o('pit', 84, C).o('switch', 76, C + 3.4).o('gate', 72, C).o('charger', 60, C).o('laser', 50, C).o('charger', 30, C).o('finish', 8, C));
  L[4].clear(70, 80, B - 1, B, LAVA);
  L[4] = L[4].done('saw', [['go', 22.5], ['lift', 28], ['go', 33], ['swap', ['bridge']], ['go', 36], ['charge'], ['go', 41.2], ['press', 'bridge'], ['go', 58], ['swap', ['hover']], ['go', 62], ['charge'], ['go', 67.5], ['goK', 83, { hover: 1 }], ['go', 86], ['lift', 92], ['go', 84], ['swap', ['drone']], ['press', 'drone'], ['wait', 2.5], ['go', 60], ['charge'], ['go', 30], ['charge'], ['go', 8]]);
  L.forEach((c, i) => { c.num = LEVELS.length + i + 1; });
  return L;
}

/* Finish times of the course checker's test bot, used to set medal times */
const REF_TIMES = {l01: 12.1,  l02: 12.4,  l03: 14.3,  l04: 10.1,  l05: 13.8,  l06: 13.8,  l07: 14.5,  l08: 15.1,  l09: 19.2,  l10: 19.8,  l11: 14.4,  l12: 14.6,  l13: 8.2,  l14: 26.1,  l15: 8.6,  l16: 51.6,  l17: 15,  l18: 17.6,  l19: 13,  l20: 15.1,  l21: 10.2,  l22: 15.3,  l23: 23,  l24: 21.1,  l25: 22,  l26: 8.1,  l27: 10.9,  l28: 13.3,  l29: 13.3,  l30: 10.6,  l31: 12.6,  l32: 14.2,  l33: 9.3,  l34: 11.3,  l35: 14.7,  l41: 27,  l42: 22.7,  l43: 12.9,  l44: 26.3,  l45: 20.2,  l46: 34.4,  l47: 38.1,  l48: 64.2,  l36: 47.5,  l37: 46.5,  l38: 49.2,  l39: 48.4,  l40: 84.2,  m1: 75.9,  m2: 30.2,  m3: 41,  m4: 151.9,  m5: 106.9};
