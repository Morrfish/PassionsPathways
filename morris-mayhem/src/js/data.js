// Morris Mayhem: the roster and the stages.
// Each fighter is one entry. To add a family member, copy an entry and change it.
//
//   id        short name with no spaces (also the photo file name: img/<id>.png)
//   name      name shown in the game
//   title     a nickname shown under the name, e.g. "The Grill Master"
//   photo     'img/<id>.png' once there is a face cutout (transparent background), or null
//   color     main outfit color; accent = second color
//   stats     speed (run), air (air control), jump, weight (heavier = harder to launch),
//             power (multiplies all damage), size (1 = normal height)
//   specials  four signature moves: neutral (special alone), side (special + left/right),
//             up (special + up, also the recovery), down (special + down).
//             Each one has a `kind` from the list in engine.js (ABILITIES) and its own numbers.
//   taunt     a line shown in a speech bubble on KO
//   sprite    (optional) id in MM.SPRITES (sprites.js): draw the fighter from artwork instead of the cartoon body
//   normalSpeed  (optional) under 1 = slower basic attacks (for heavy hitters)
//
// Real family members come first. The rest are PLACEHOLDERS that show off the different kinds of
// ability and get replaced by the Morris family one by one.
window.MM = window.MM || {};

MM.FIGHTERS = [
  {
    // Jeffery Morris, "The Boss" (PawPaw): the story mode boss before secret final boss Patty.
    id: 'jeffery', name: 'Jeffery Morris', title: 'The Boss', photo: 'img/jeffery.png', sprite: 'jeffery',
    color: '#5b6b3a', accent: '#a8874f', skin: '#e9b28f', hair: '#d9d9d9',
    // quiet, stubborn, competitive: heavy and hard to move, steady hitter
    stats: { speed: 5.8, air: 5.3, jump: 14.8, weight: 1.3, power: 1.15, size: 1.1 },
    normalSpeed: 0.92,
    attackNames: { jab: 'PawPaw One-Two', side: 'Big Catch', down: "Reel 'Em In", air: 'Trail Boot' },
    specials: {
      neutral: { kind: 'projectile', name: "Gone Fishin'", thing: 'a fishing bobber that reels people in', sprite: 'bobber', speed: 12, vy: -4, grav: 0.25, boomerang: true, pull: true, line: true, dmg: 7, kb: 6, kbg: 0.05, ang: 25, r: 16, life: 75, cd: 45 },
      side: { kind: 'dash', name: 'Buck Stops Here', speed: 15, dur: 18, dmg: 13, kb: 9, kbg: 0.14, ang: 35, armor: true, box: [-10, -110, 110, 105] },
      up: { kind: 'rise', name: 'Tree Stand', power: 19.5, dmg: 7, kb: 7, kbg: 0.08 },
      down: { kind: 'counter', name: 'Camo Cover', window: 28, mult: 1.5 },
    },
    taunt: "PawPaw's still got it!",
  },
  {
    // Patty Morris: the secret final boss of story mode. Art: ChatGPT graphic-novel sheets (img/patty-atlas.webp).
    id: 'patty', name: 'Patty Morris', title: 'Mawmaw Mayhem', photo: 'img/patty.png', sprite: 'patty',
    color: '#7B2CBF', accent: '#C8A2C8', skin: '#f0c49a', hair: '#ecebf3',
    // deliberate and powerful: slow, heavy, hits hard, slower basic attacks leave openings
    stats: { speed: 5.4, air: 5, jump: 14.6, weight: 1.25, power: 1.22, size: 1.05 },
    normalSpeed: 0.85,
    attackNames: { jab: 'Ring-a-Ding', side: 'No Cutting in Line', down: 'Price Drop', air: 'Clearance Kick' },
    specials: {
      neutral: { kind: 'projectile', name: 'TEMU Treasure Toss', thing: 'a TEMU parcel', sprite: 'parcel', speed: 9, vy: -7, grav: 0.38, dmg: 10, kb: 7, kbg: 0.1, r: 20, life: 110, cd: 40 },
      side: { kind: 'dash', name: 'Garage Sale Stampede', speed: 13, dur: 24, dmg: 12, kb: 8.5, kbg: 0.13, ang: 30, armor: true, box: [0, -95, 120, 95] },
      up: { kind: 'rise', name: 'Express Delivery', power: 18, dmg: 8, kb: 7, kbg: 0.08, parachute: true },
      down: { kind: 'pack', name: "Mawmaw's Pack", sprites: ['dog0', 'dog1', 'dog2'], names: ['Tippie', 'Spike', 'Poppie'], speed: 7.5, dmg: 5, kb: 6, kbg: 0.08, cd: 150 },
    },
    taunt: 'Mawmaw gets the last word!',
  },
  {
    id: 'speedster', name: 'Speedster', title: 'Placeholder: fast and light', photo: null,
    color: '#25c4ff', accent: '#ffffff', skin: '#c98c5b', hair: '#111111',
    stats: { speed: 8.6, air: 7, jump: 16, weight: 0.85, power: 0.9, size: 0.92 },
    specials: {
      neutral: { kind: 'projectile', name: 'Boomerang', emoji: '🪃', speed: 13, dmg: 5, kb: 4, kbg: 0.05, r: 15, life: 80, boomerang: true, cd: 50 },
      side: { kind: 'teleport', name: 'Blink', dist: 220, dmg: 6, kb: 6, kbg: 0.08 },
      up: { kind: 'teleport', name: 'Sky Blink', dist: 260, up: true, dmg: 0 },
      down: { kind: 'spin', name: 'Tornado', hits: 5, dur: 34, dmg: 2, kb: 7, kbg: 0.1 },
    },
    taunt: 'Too slow!',
  },
  {
    id: 'zoner', name: 'Zoner', title: 'Placeholder: fights from far away', photo: null,
    color: '#8e44ec', accent: '#ff7ad9', skin: '#f1c7a1', hair: '#b5651d',
    stats: { speed: 5.8, air: 6, jump: 15, weight: 0.95, power: 1, size: 1 },
    specials: {
      neutral: { kind: 'projectile', name: 'Triple Star', emoji: '⭐', speed: 12, dmg: 4, kb: 4, kbg: 0.04, r: 13, life: 60, count: 3, spread: 0.25, cd: 55 },
      side: { kind: 'projectile', name: 'Big Bubble', emoji: '🫧', speed: 4, dmg: 9, kb: 8, kbg: 0.1, r: 30, life: 120, cd: 80 },
      up: { kind: 'rise', name: 'Float Up', power: 17, dmg: 4, kb: 5, kbg: 0.05 },
      down: { kind: 'trap', name: 'Banana Peel', emoji: '🍌', dmg: 7, kb: 7, kbg: 0.08, life: 600, cd: 120 },
    },
    taunt: 'Stay over there!',
  },
  {
    id: 'trickster', name: 'Trickster', title: 'Placeholder: tricky and sneaky', photo: null,
    color: '#1db37a', accent: '#202020', skin: '#e8b48a', hair: '#e8d06a',
    stats: { speed: 7, air: 6.5, jump: 15.5, weight: 0.9, power: 1, size: 0.95 },
    specials: {
      neutral: { kind: 'buff', name: 'Sugar Rush', dur: 300, speedMul: 1.35, powerMul: 1.25, cd: 900 },
      side: { kind: 'projectile', name: 'Water Balloon', emoji: '🎈', speed: 9, dmg: 8, kb: 7, kbg: 0.09, r: 18, life: 90, grav: 0.35, vy: -7, cd: 45 },
      up: { kind: 'teleport', name: 'Poof', dist: 240, up: true, dmg: 0 },
      down: { kind: 'trap', name: 'Whoopee Cushion', emoji: '💨', dmg: 5, kb: 10, kbg: 0.05, ang: 85, life: 600, cd: 120 },
    },
    taunt: 'Gotcha!',
  },
  {
    id: 'healer', name: 'Healer', title: 'Placeholder: the one who takes care of everyone', photo: null,
    color: '#ff9a3c', accent: '#ffffff', skin: '#f3d2b3', hair: '#7a3e1d',
    stats: { speed: 6, air: 5.8, jump: 15, weight: 1, power: 0.95, size: 0.98 },
    specials: {
      neutral: { kind: 'projectile', name: 'Hot Cookie', emoji: '🍪', speed: 10, dmg: 7, kb: 6, kbg: 0.07, r: 15, life: 70, grav: 0.25, vy: -5, cd: 35 },
      side: { kind: 'dash', name: 'Mom Swoop', speed: 15, dur: 16, dmg: 9, kb: 7, kbg: 0.11, ang: 40 },
      up: { kind: 'rise', name: 'Angel Lift', power: 20, dmg: 5, kb: 6, kbg: 0.06 },
      down: { kind: 'heal', name: 'Band-Aid', amount: 20, cd: 720 },
    },
    taunt: 'Go to your room!',
  },
];

// Stages. Units are world pixels; y grows downward; the main floor top is y = 0.
//   main      the solid floor: x from left to right, top at y 0, depth = how thick it looks
//   plats     pass-through platforms (jump up through them, press down to drop)
//   blast     how far past the floor edge you go before you're KO'd
//   theme     which background to draw (render.js STAGE_ART)
MM.STAGES = [
  { id: 'backyard', name: 'Backyard BBQ', theme: 'backyard',
    main: { left: -620, right: 620, depth: 220 },
    plats: [{ x: -360, y: -210, w: 260 }, { x: 100, y: -210, w: 260 }, { x: -130, y: -390, w: 260 }],
    blast: { side: 1250, top: -1050, bottom: 800 } },
  { id: 'rooftop', name: 'Rooftop Night', theme: 'rooftop',
    main: { left: -560, right: 560, depth: 300 },
    plats: [{ x: -480, y: -230, w: 220 }, { x: 260, y: -230, w: 220 }],
    blast: { side: 1200, top: -1050, bottom: 800 } },
  { id: 'table', name: 'The Dinner Table', theme: 'table',
    main: { left: -700, right: 700, depth: 160 },
    plats: [],
    blast: { side: 1300, top: -1050, bottom: 800 } },
];

// Normal attacks everyone shares (the specials are what make each fighter different).
// box = [forward, up-from-feet, width, height] in world px for a size-1 fighter.
// start/active/end = frames (60 per second). kb = base knockback, kbg = growth with damage %,
// ang = launch angle in degrees (90 = straight up, negative = spike down).
MM.NORMALS = {
  jab:  { start: 3, active: 4, end: 9,  box: [18, -78, 50, 32], dmg: 4,  kb: 4,  kbg: 0.04, ang: 35, pose: 'punch' },
  side: { start: 9, active: 5, end: 18, box: [20, -70, 72, 36], dmg: 10, kb: 7,  kbg: 0.15, ang: 38, pose: 'kick', lunge: 5 },
  up:   { start: 6, active: 6, end: 15, box: [-40, -150, 80, 70], dmg: 8, kb: 7,  kbg: 0.13, ang: 88, pose: 'uppercut' },
  down: { start: 6, active: 5, end: 16, box: [10, -26, 78, 26], dmg: 7,  kb: 6,  kbg: 0.11, ang: 22, pose: 'sweep' },
  nair: { start: 4, active: 9, end: 12, box: [-50, -100, 100, 92], dmg: 7, kb: 5, kbg: 0.09, ang: 45, pose: 'spin' },
  fair: { start: 6, active: 5, end: 14, box: [16, -85, 66, 50], dmg: 9,  kb: 6,  kbg: 0.13, ang: 40, pose: 'kick' },
  uair: { start: 5, active: 6, end: 12, box: [-40, -150, 80, 60], dmg: 7, kb: 6,  kbg: 0.11, ang: 85, pose: 'uppercut' },
  dair: { start: 8, active: 6, end: 18, box: [-30, -30, 60, 50], dmg: 10, kb: 6,  kbg: 0.11, ang: -75, pose: 'stomp' },
};
