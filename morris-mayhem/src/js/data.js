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
//
// The six below are PLACEHOLDERS that show off the different kinds of ability.
// They get replaced by the Morris family one by one.
window.MM = window.MM || {};

MM.FIGHTERS = [
  {
    id: 'brawler', name: 'Brawler', title: 'Placeholder: all-rounder', photo: null,
    color: '#e8452c', accent: '#ffd23f', skin: '#e0ac7e', hair: '#3b2414',
    stats: { speed: 6.4, air: 5.6, jump: 15, weight: 1.05, power: 1.1, size: 1 },
    specials: {
      neutral: { kind: 'projectile', name: 'Fireball', emoji: '🔥', speed: 11, dmg: 6, kb: 5, kbg: 0.05, r: 16, life: 70, cd: 40 },
      side: { kind: 'dash', name: 'Rocket Punch', speed: 17, dur: 14, dmg: 11, kb: 8, kbg: 0.13, ang: 30 },
      up: { kind: 'rise', name: 'Rising Uppercut', power: 19, dmg: 9, kb: 8, kbg: 0.1 },
      down: { kind: 'counter', name: 'Counter', window: 24, mult: 1.4 },
    },
    taunt: "That's how we do it!",
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
    id: 'tank', name: 'Tank', title: 'Placeholder: big and heavy', photo: null,
    color: '#5a6b3a', accent: '#c9a227', skin: '#8d5a3b', hair: '#222222',
    stats: { speed: 5, air: 4.4, jump: 13.5, weight: 1.35, power: 1.3, size: 1.15 },
    specials: {
      neutral: { kind: 'shockwave', name: 'Ground Quake', dmg: 9, kb: 8, kbg: 0.09, speed: 9, cd: 60 },
      side: { kind: 'dash', name: 'Shoulder Charge', speed: 13, dur: 20, dmg: 13, kb: 9, kbg: 0.14, ang: 25, armor: true },
      up: { kind: 'rise', name: 'Big Leap', power: 18, dmg: 7, kb: 7, kbg: 0.08 },
      down: { kind: 'slam', name: 'Belly Flop', dmg: 15, kb: 9, kbg: 0.15 },
    },
    taunt: 'Nobody moves me.',
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
