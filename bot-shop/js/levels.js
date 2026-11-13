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
  // ---- legendary: long, few checkpoints, tight budgets
  ['l36', 'The Long Haul', 'boss', 5, 'desert', 5, 3, 'mud:16 steep:5 sand:14 conveyor:3 blower steep:6 charge rock:2 wood:2 crates:3 steep:4 blower rock:1'],
  ['l37', 'Leap of Faith', 'boss', 5, 'space', 30, 3, 'fall:12 board:9 launch:20 fix fall:13 moon:12 launchwall:7 gaplava:3 propgap:14 propwall:6 fall:12 launch:22'],
  ['l38', 'Toolbox Terror', 'boss', 5, 'night', 10, 3, 'wood:3 icew:2 rock:2 gatehigh lasers:3 tnt plate hammers:2 wood:2 rock:1'],
  ['l39', 'Sky Pirate', 'boss', 5, 'speed', 12, 3, 'zip:20 swing:7 climb:7 propgap:16 pool:14 zip:16 swing:7 propwall:6'],
  ['l40', 'The Impossible Course', 'boss', 5, 'crazy', 12, 4, 'lasers:3 climb:8 fall:13 zip:20 charge hammers:3 steep:6 fix propgap:16 climb:6 lasers:2 fall:12 plate launch:20'],
];
const LEVEL_BLURB = { 1: 'A gentle warm-up.', 2: 'Getting trickier.', 3: 'Plan before you build.', 4: 'For experienced engineers.', 5: 'Legendary. Few checkpoints. Good luck.' };

/* The bot the course checker drives. Budgets are set from what it costs. */
function refBuild(needs) {
  const gad = ['hook', 'saw', 'drill', 'torch', 'cannon', 'suction', 'prop', 'floats', 'shocks', 'gyro', 'blade'].filter(g => needs[g]);
  if (gad.length !== 3 && gad.length < 5) gad.push('righter');   // a spare slot gets a roll cage
  const chassis = gad.length > 5 ? 'tank' : gad.length > 3 ? 'hauler' : 'rover';
  const gear = needs.suction ? (chassis === 'rover' ? 4 : 5) : needs.fast && !needs.big ? 2 : needs.big ? 4 : 3;
  return { name: 'Checker', color: '#ffc21a', chassis, wheels: needs.big ? 'big' : 'std', tires: 'spiked', motor: 'beast', gear, battery: 'large', drive: 'awd', gadgets: gad };
}

function moreLevels() {
  return LEVELS.map(([id, name, kind, stars, sky, h0, cpEvery, segs], idx) => {
    const boss = kind === 'boss', b = CB(id, name, boss ? 'crazy' : kind, 1000, LEVEL_BLURB[stars], null);
    b.setH(h0).flat(4).o('start').flat(8);
    segs.split(' ').forEach((sg, i) => {
      const [nm, par] = sg.split(':');
      if (i % cpEvery === 0 && i) b.flat(3).o('checkpoint', -1.5).flat(2);
      SEG[nm](b, par ? +par : undefined);
      if (b.h < 3 || b.h > 31) throw new Error(`${id} ${nm}: height ${b.h} out of range`);
    });
    b.flat(6).o('finish', -2).flat(6);
    const c = b.done();
    Object.assign(c, { stars, boss, sky: sky || '', num: idx + 1, ref: refBuild(c.needs) });
    c.budget = Math.ceil(botSpec(c.ref).cost * (boss ? 1.03 : 1.12) / 50) * 50;
    if (REF_TIMES[id]) c.medals = [Math.ceil(REF_TIMES[id] * 1.05), Math.ceil(REF_TIMES[id] * 1.7)];
    return c;
  });
}
/* Finish times of the course checker's test bot, used to set medal times */
const REF_TIMES = {l01: 12,  l02: 12.2,  l03: 14.1,  l04: 10.2,  l05: 17,  l06: 13.8,  l07: 14.2,  l08: 14.9,  l09: 19,  l10: 19.5,  l11: 14.3,  l12: 14.6,  l13: 8.2,  l14: 26.1,  l15: 8.6,  l16: 71.1,  l17: 14.9,  l18: 17.1,  l19: 13,  l20: 15.1,  l21: 10.1,  l22: 18.8,  l23: 21.7,  l24: 20.9,  l25: 25,  l26: 8.3,  l27: 10.9,  l28: 13.1,  l29: 13.2,  l30: 11,  l31: 12.5,  l32: 18,  l33: 14.4,  l34: 10.7,  l35: 14.6,  l36: 49.2,  l37: 46.1,  l38: 50.8,  l39: 51.9,  l40: 90};
