// Morris Mayhem: artwork for the illustrated arenas (the stage shapes are in data.js, MM.STAGES).
// Each arena has a background picture and one prop atlas (cut from the artist's prop sheet with
// tools/slice_stage_props.py). render.js draws them; nothing here changes how fighters collide.
//
//   bg, props  picture files
//   frames     where each prop is in the atlas: [x, y, w, h] (from <stage>-props.json)
//   main       the picture drawn for the solid floor (grid [n, 1] lays n copies side by side)
//   pics       every prop that can be stood on, by name (platforms in data.js pick one with `pic`; the
//              Arena Maker offers all of them)
//     pic        atlas frame (defaults to the name)
//     label      name shown in the Arena Maker
//     sx0, sx1   left/right ends of the prop's walkable top, in atlas pixels (stretched to the platform width,
//                keeping the picture's shape)
//     sy         height of the walkable top in the prop picture (lines up with the platform's y)
//     sub        use only part of the frame [x, y, w, h] (relative to the frame)
//     grid       [cols, rows]: stack copies of the prop (e.g. a 2 x 2 pile of crates)
//     behind     draw it before the floor (props that stand behind the floor's front edge)
//     front      draw it after the other platforms (still behind fighters)
//     float      it floats (boats, rafts): the Arena Maker makes it bob by default
//     decorAnim  draw it with a decor animation (the Hardin scoreboard shows the match clock)
//   decor      pictures with no collision: { pic, x (center), y (bottom), h (height), layer, flip, anim }
//              layer: 'back' (behind platforms and floor), 'mid' (on the floor, behind fighters),
//              'front' (in front of fighters)
//   fade       how much to darken the background below the floor line (keeps the painted ground from
//              looking like a second floor)
//   water      { y, color }: a see-through water surface drawn in front of everything below y
//
// Platforms in data.js can give `base` (the y of whatever the prop stands on) instead of `y`: the
// platform's y is then worked out from the picture so the prop's feet rest exactly on that surface.
window.MM = window.MM || {};

MM.STAGE_PICS = {
  dunkirk: {
    name: 'Main Street (Dunkirk)',
    bg: 'img/stages/dunkirk-bg.webp', props: 'img/stages/dunkirk-props.webp',
    frames: { crossing: [0, 0, 207, 349], lamp: [211, 0, 77, 330], storefront: [292, 0, 435, 293], train: [731, 0, 594, 269], crates: [1329, 0, 322, 262], bench: [0, 353, 402, 185], gatearm: [406, 353, 552, 175], sidewalk: [962, 353, 574, 103] },
    main: { pic: 'sidewalk', sx0: 4, sx1: 570, sy: 12, grid: [2, 1] },
    pics: {
      sidewalk: { label: 'Sidewalk', sx0: 4, sx1: 570, sy: 12, w: 560 },
      // the shop's flat roof is the platform; the shop stands behind the sidewalk
      storefront: { label: 'Shop roof', sx0: 32, sx1: 402, sy: 26, behind: true, w: 296 },
      // a 2 x 2 pile of the top crate from the artist's crate stack
      crates: { label: 'Crate pile', pic: 'crates', sub: [78, 0, 171, 126], sx0: 0, sx1: 171, sy: 6, grid: [2, 2], behind: true, w: 190 },
      crate: { label: 'Crate', pic: 'crates', sub: [78, 0, 171, 126], sx0: 0, sx1: 171, sy: 6, w: 100 },
      gatearm: { label: 'Crossing gate', sx0: 105, sx1: 545, sy: 40, w: 300 },
      bench: { label: 'Park bench', sx0: 6, sx1: 388, sy: 80, w: 220 },
    },
    decor: [
      { pic: 'train', x: 0, y: -12, h: 150, layer: 'back', anim: 'train' },
      { pic: 'crossing', x: -235, y: 2, h: 210, layer: 'back', anim: 'crossing' },
      { pic: 'lamp', x: -615, y: 2, h: 230, layer: 'mid' },
      { pic: 'lamp', x: 615, y: 2, h: 230, layer: 'mid' },
      { pic: 'bench', x: 255, y: 4, h: 62, layer: 'mid' },
    ],
    fade: 0.45,
  },
  hardin: {
    name: 'Polar Bear Gym (Hardin Northern)',
    bg: 'img/stages/hardin-bg.webp', props: 'img/stages/hardin-props.webp',
    frames: { hoop: [0, 0, 259, 386], trophy: [263, 0, 317, 294], vault: [584, 0, 529, 281], pennant: [1117, 0, 516, 272], scoreboard: [0, 390, 529, 269], ballrack: [533, 390, 430, 262], court: [967, 390, 658, 179], bleachers: [0, 663, 454, 178] },
    main: { pic: 'court', sx0: 5, sx1: 655, sy: 8, grid: [2, 1] },
    pics: {
      court: { label: 'Gym floor', sx0: 5, sx1: 655, sy: 8, w: 640 },
      bleachers: { label: 'Bleachers', sx0: 27, sx1: 423, sy: 5, w: 340 },
      vault: { label: 'Vault box', sx0: 50, sx1: 490, sy: 8, w: 200 },
      // the scoreboard hangs from the gym ceiling; its top is the high platform
      scoreboard: { label: 'Scoreboard', sx0: 8, sx1: 521, sy: 30, decorAnim: 'scoreboard', hang: [115, 413], w: 300 },
      ballrack: { label: 'Ball rack', sx0: 20, sx1: 410, sy: 44, w: 160 },
    },
    decor: [
      { pic: 'ballrack', x: -175, y: 4, h: 76, layer: 'mid' },
      { pic: 'trophy', x: 180, y: 4, h: 70, layer: 'mid' },
    ],
    fade: 0.45,
  },
  williamstown: {
    name: 'Family Picnic (Williamstown)',
    bg: 'img/stages/williamstown-bg.webp', props: 'img/stages/williamstown-props.webp',
    frames: { musicstand: [0, 0, 201, 266], banquet: [205, 0, 653, 260], planter: [862, 0, 317, 256], bell: [1183, 0, 358, 237], bench: [0, 270, 507, 228], picnic: [511, 270, 533, 225], bunting: [1048, 270, 637, 195], stage: [0, 502, 810, 192] },
    main: { pic: 'stage', sx0: 20, sx1: 790, sy: 22, grid: [2, 1] },
    pics: {
      stage: { label: 'Wooden stage', sx0: 20, sx1: 790, sy: 22, w: 640 },
      picnic: { label: 'Picnic table', sx0: 45, sx1: 488, sy: 32, w: 250 },
      bench: { label: 'Bench seat', sx0: 3, sx1: 503, sy: 112, w: 260 },
      // the church bell hangs in a wooden frame; fighters stand on the top beam and walk under it
      bell: { label: 'Bell frame', sx0: 32, sx1: 324, sy: 9, w: 280 },
      banquet: { label: 'Potluck table', sx0: 32, sx1: 625, sy: 68, w: 300 },
    },
    decor: [
      { pic: 'musicstand', x: 262, y: 6, h: 92, layer: 'mid' },
      { pic: 'planter', x: -612, y: 6, h: 56, layer: 'mid' },
      { pic: 'planter', x: 612, y: 6, h: 56, layer: 'mid' },
    ],
    fade: 0.45,
  },
  graceland: {
    name: 'Music Gate (Graceland)',
    bg: 'img/stages/graceland-bg.webp', props: 'img/stages/graceland-props.webp',
    frames: { van: [0, 0, 845, 389], jukebox: [849, 0, 284, 364], flowers: [1137, 0, 388, 346], mic: [1529, 0, 169, 314], record: [1702, 0, 241, 305], gate: [0, 393, 576, 256], balustrade: [580, 393, 686, 171], riser: [1270, 393, 390, 149], piano: [0, 653, 497, 115] },
    main: { pic: 'balustrade', sx0: 2, sx1: 684, sy: 8, grid: [2, 1] },
    pics: {
      balustrade: { label: 'Stone terrace', sx0: 2, sx1: 684, sy: 8, w: 640 },
      riser: { label: 'Gold stage', sx0: 5, sx1: 385, sy: 5, w: 220 },
      piano: { label: 'Piano keys', sx0: 5, sx1: 492, sy: 5, w: 260 },
      // the family's green-and-cream van: the flat roof (not the nose, roof rack or spare tire) is the
      // platform, and its wheels rest on the terrace
      van: { label: 'Family van', sx0: 225, sx1: 745, sy: 11, front: true, w: 270 },
    },
    decor: [
      { pic: 'jukebox', x: -300, y: 6, h: 120, layer: 'mid' },
      { pic: 'mic', x: -490, y: -92, h: 100, layer: 'mid' },
      { pic: 'record', x: 490, y: -92, h: 66, layer: 'mid' },
      { pic: 'flowers', x: 300, y: 6, h: 100, layer: 'mid' },
    ],
    fade: 0.45,
  },
  agnew: {
    name: "PawPaw's Dock (Agnew Lake)",
    bg: 'img/stages/agnew-bg.webp', props: 'img/stages/agnew-props.webp',
    frames: { pine: [0, 0, 219, 252], lifering: [223, 0, 259, 233], boat: [486, 0, 778, 224], shortdock: [1268, 0, 474, 214], dock: [0, 256, 895, 180], tackle: [899, 256, 759, 177], rocks: [0, 440, 649, 158], raft: [653, 440, 644, 143] },
    main: { pic: 'dock', sx0: 3, sx1: 892, sy: 12 },
    pics: {
      dock: { label: 'Long dock', sx0: 3, sx1: 892, sy: 12, w: 700 },
      // a short pier section; its mossy post ends are cut off so it can stand on the dock as a lookout
      shortdock: { label: 'Dock lookout', sub: [0, 0, 474, 180], sx0: 77, sx1: 397, sy: 60, w: 320 },
      pier: { label: 'Pier (in water)', pic: 'shortdock', sx0: 77, sx1: 397, sy: 60, w: 260 },
      // the fishing boat: fighters stand inside it, on the near gunwale line
      boat: { label: 'Fishing boat', sx0: 95, sx1: 740, sy: 82, float: 150, w: 400 },
      raft: { label: 'Log raft', sx0: 14, sx1: 632, sy: 6, float: 110, w: 260 },
    },
    decor: [
      { pic: 'pine', x: -930, y: 120, h: 230, layer: 'back' },
      { pic: 'rocks', x: -880, y: 175, h: 120, layer: 'front' },
      { pic: 'lifering', x: -330, y: 4, h: 56, layer: 'mid' },
      { pic: 'tackle', x: -130, y: 4, h: 48, layer: 'mid' },
    ],
    // the lake: falling in is just falling (the blast zone is below)
    water: { y: 130, color: 'rgba(28,110,140,.55)' },
    fade: 0,
  },
};

// Where a platform prop's picture lands when its walkable top is x..x+w at height y:
// { k (scale), left, top, width, height, bottom } of the whole drawn picture (all grid copies).
MM.propBox = function (P, spec, x, y, w) {
  const f = P.frames[spec.pic], r = spec.sub ? [0, 0, spec.sub[2], spec.sub[3]] : [0, 0, f[2], f[3]];
  const cols = spec.grid ? spec.grid[0] : 1, rows = spec.grid ? spec.grid[1] : 1;
  const k = w / cols / (spec.sx1 - spec.sx0), step = (r[3] - spec.sy * 2) * k;
  const left = x - spec.sx0 * k, top = y - spec.sy * k;
  const width = (w / cols) * (cols - 1) + r[2] * k, height = r[3] * k + (rows - 1) * step;
  return { k, left, top, width, height, bottom: top + height };
};
// The spec for one platform (its `pic` within the arena's atlas).
MM.platSpec = (P, pic) => P.pics[pic] && Object.assign({ pic }, P.pics[pic]);

for (const s of MM.STAGES) {
  const P = MM.STAGE_PICS[s.theme];
  if (!P) continue;
  // the solid floor is as thick as its picture
  s.main.depth = Math.round(MM.propBox(P, P.main, s.main.left, 0, s.main.right - s.main.left).bottom);
  // props that stand on something: put the walkable top where the picture's feet touch `base`
  for (const p of s.plats) {
    const sp = MM.platSpec(P, p.pic);
    if (sp && p.base !== undefined) { const b = MM.propBox(P, sp, p.x, 0, p.w); p.y = Math.round(p.base - b.bottom); }
    // floating props (the boat) sit in the water up to their waterline
    if (sp && p.afloat && P.water) { const b = MM.propBox(P, sp, p.x, 0, p.w); p.y = Math.round(P.water.y - (sp.float - sp.sy) * b.k); }
  }
}
