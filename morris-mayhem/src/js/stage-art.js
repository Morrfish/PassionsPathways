// Morris Mayhem: artwork for the illustrated arenas (the stage shapes are in data.js, MM.STAGES).
// Each arena has a background picture and one prop atlas (cut from the artist's prop sheet with
// tools/slice_stage_props.py). render.js draws them; nothing here changes how fighters collide.
//
//   bg, props  picture files
//   frames     where each prop is in the atlas: [x, y, w, h] (from <stage>-props.json)
//   main       the picture drawn for the solid floor
//   pics       the picture for each platform (by the platform's `pic` name in data.js)
//     sx0, sx1   left/right ends of the prop's walkable top, in atlas pixels (stretched to the platform width)
//     sy         height of the walkable top in the prop picture (lines up with the platform's y)
//     sub        use only part of the frame [x, y, w, h] (relative to the frame)
//     grid       [cols, rows]: stack copies of the prop (e.g. a 2 x 2 pile of crates)
//     behind     draw it before the floor (props that stand behind the floor's front edge)
//   decor      pictures with no collision: { pic, x (center), y (bottom), h (height), layer, flip, anim }
//              layer: 'back' (behind platforms and floor), 'mid' (on the floor, behind fighters),
//              'front' (in front of fighters)
//   fade       how much to darken the background below the floor line (keeps the painted ground from
//              looking like a second floor)
//   water      { y, color }: a see-through water surface drawn in front of everything below y
window.MM = window.MM || {};

MM.STAGE_PICS = {
  dunkirk: {
    bg: 'img/stages/dunkirk-bg.webp', props: 'img/stages/dunkirk-props.webp',
    frames: { crossing: [0, 0, 207, 349], lamp: [211, 0, 77, 330], storefront: [292, 0, 435, 293], train: [731, 0, 594, 269], crates: [1329, 0, 322, 262], bench: [0, 353, 402, 185], gatearm: [406, 353, 552, 175], sidewalk: [962, 353, 574, 103] },
    main: { pic: 'sidewalk', sx0: 4, sx1: 570, sy: 12 },
    pics: {
      // the shop's flat roof is the platform; the shop stands behind the sidewalk
      storefront: { sx0: 32, sx1: 402, sy: 26, behind: true },
      // a 2 x 2 pile of the top crate from the artist's crate stack
      crates: { pic: 'crates', sub: [78, 0, 171, 126], sx0: 0, sx1: 171, sy: 6, grid: [2, 2], behind: true },
    },
    decor: [
      { pic: 'train', x: 0, y: -12, h: 150, layer: 'back', anim: 'train' },
      { pic: 'crossing', x: 70, y: -20, h: 210, layer: 'back', anim: 'crossing' },
      { pic: 'lamp', x: -585, y: 2, h: 230, layer: 'mid' },
      { pic: 'lamp', x: 585, y: 2, h: 230, layer: 'mid' },
      { pic: 'bench', x: -60, y: 4, h: 62, layer: 'mid' },
    ],
    fade: 0.45,
  },
  hardin: {
    bg: 'img/stages/hardin-bg.webp', props: 'img/stages/hardin-props.webp',
    frames: { hoop: [0, 0, 259, 386], trophy: [263, 0, 317, 294], vault: [584, 0, 529, 281], pennant: [1117, 0, 516, 272], scoreboard: [0, 390, 529, 269], ballrack: [533, 390, 430, 262], court: [967, 390, 658, 179], bleachers: [0, 663, 454, 178] },
    main: { pic: 'court', sx0: 5, sx1: 655, sy: 8 },
    pics: {
      bleachers: { sx0: 27, sx1: 423, sy: 5 },
      vault: { sx0: 50, sx1: 490, sy: 8 },
    },
    decor: [
      { pic: 'scoreboard', x: 0, y: -560, h: 120, layer: 'back', anim: 'scoreboard' },
      { pic: 'ballrack', x: -500, y: 4, h: 80, layer: 'mid' },
      { pic: 'trophy', x: 520, y: 4, h: 78, layer: 'mid' },
    ],
    fade: 0.45,
  },
  williamstown: {
    bg: 'img/stages/williamstown-bg.webp', props: 'img/stages/williamstown-props.webp',
    frames: { musicstand: [0, 0, 201, 266], banquet: [205, 0, 653, 260], planter: [862, 0, 317, 256], bell: [1183, 0, 358, 237], bench: [0, 270, 507, 228], picnic: [511, 270, 533, 225], bunting: [1048, 270, 637, 195], stage: [0, 502, 810, 192] },
    main: { pic: 'stage', sx0: 20, sx1: 790, sy: 22 },
    pics: {
      picnic: { sx0: 45, sx1: 488, sy: 32 },
      bench: { sx0: 3, sx1: 503, sy: 112 },
    },
    decor: [
      { pic: 'bunting', x: 0, y: 8, h: 150, layer: 'back' },
      { pic: 'banquet', x: 0, y: 6, h: 78, layer: 'mid' },
      { pic: 'bell', x: 565, y: 6, h: 105, layer: 'mid', anim: 'bell' },
      { pic: 'musicstand', x: -575, y: 6, h: 92, layer: 'mid' },
      { pic: 'planter', x: -390, y: 6, h: 56, layer: 'mid' },
      { pic: 'planter', x: 330, y: 6, h: 56, layer: 'mid' },
    ],
    fade: 0.45,
  },
  graceland: {
    bg: 'img/stages/graceland-bg.webp', props: 'img/stages/graceland-props.webp',
    frames: { van: [0, 0, 845, 389], jukebox: [849, 0, 284, 364], flowers: [1137, 0, 388, 346], mic: [1529, 0, 169, 314], record: [1702, 0, 241, 305], gate: [0, 393, 576, 256], balustrade: [580, 393, 686, 171], riser: [1270, 393, 390, 149], piano: [0, 653, 497, 115] },
    main: { pic: 'balustrade', sx0: 2, sx1: 684, sy: 8 },
    pics: {
      piano: { sx0: 5, sx1: 492, sy: 5 },
      riser: { sx0: 5, sx1: 385, sy: 5 },
      // the family's green-and-cream van: the flat roof (not the nose, roof rack or spare tire) is the
      // platform, and at this size its wheels rest on the terrace
      van: { sx0: 225, sx1: 745, sy: 11, front: true },
    },
    decor: [
      { pic: 'jukebox', x: -565, y: 6, h: 132, layer: 'mid' },
      { pic: 'mic', x: -385, y: 6, h: 105, layer: 'mid' },
      { pic: 'record', x: 385, y: 6, h: 72, layer: 'mid' },
      { pic: 'flowers', x: 585, y: 6, h: 112, layer: 'mid' },
    ],
    fade: 0.45,
  },
  agnew: {
    bg: 'img/stages/agnew-bg.webp', props: 'img/stages/agnew-props.webp',
    frames: { pine: [0, 0, 219, 252], lifering: [223, 0, 259, 233], boat: [486, 0, 778, 224], shortdock: [1268, 0, 474, 214], dock: [0, 256, 895, 180], tackle: [899, 256, 759, 177], rocks: [0, 440, 649, 158], raft: [653, 440, 644, 143] },
    main: { pic: 'dock', sx0: 3, sx1: 892, sy: 12 },
    pics: {
      shortdock: { sx0: 77, sx1: 397, sy: 60 },
      boat: { sx0: 100, sx1: 740, sy: 78 },
    },
    decor: [
      { pic: 'pine', x: -720, y: 175, h: 290, layer: 'back' },
      { pic: 'rocks', x: -640, y: 225, h: 90, layer: 'back' },
      { pic: 'lifering', x: -560, y: 6, h: 62, layer: 'mid' },
      { pic: 'tackle', x: 420, y: 6, h: 58, layer: 'mid' },
    ],
    // the lake: falling in is just falling (the blast zone is below)
    water: { y: 196, color: 'rgba(28,110,140,.55)' },
    fade: 0,
  },
};

// The solid floor is as thick as its picture.
for (const s of MM.STAGES) {
  const P = MM.STAGE_PICS[s.theme];
  if (!P) continue;
  const fr = P.frames[P.main.pic], k = (s.main.right - s.main.left) / (P.main.sx1 - P.main.sx0);
  s.main.depth = Math.round((fr[3] - P.main.sy) * k);
}
