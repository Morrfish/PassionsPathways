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
// Only real Morris family members are in the roster.
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
    // 2.4 s: deer call .4 s, woodland stampede runs across from .8 s for .9 s (22 damage once each, 1.45x), proud finish
    ultimate: { name: 'Opening Day', sprite: 'jeffery-ult', type: 'stampede', dur: 144, spawnAt: 48, sweepDur: 54, dmg: 22, kbMul: 1.45,
      desc: 'blows the deer call and a deer, rabbit and squirrel stampede runs across the stage',
      poses: [[0, 'ult0'], [24, 'ult1'], [48, 'ult2'], [108, 'ult3']] },
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
    // 2.4 s: catch at .45 s, SALE sign, parcel vortex, laugh, finisher at 1.75 s (26 damage, 1.6x knockback)
    ultimate: { name: "Mawmaw's Last Laugh", sprite: 'patty-ult', type: 'catch', dur: 144, catchAt: 27, finishAt: 105, radius: 2.6, dmg: 26, kbMul: 1.6,
      desc: 'grabs everyone close, then SALE sign, parcel whirlwind, the dogs and an EVERYTHING MUST GO blast',
      poses: [[0, 'ult0'], [39, 'ult1'], [78, 'ult2'], [100, 'ult3']] },
  },
  {
    // Mandi Crist, "The Big Sister": two outfits that change her moves. Down-special (or the Switch button)
    // = Wardrobe Whirl: 0.65 s spin you can be hit out of, then the other outfit; 2 s cooldown.
    // Moves/numbers from ChatGPT's handoff (proposed, editable). Art: ChatGPT sheets.
    id: 'mandi', name: 'Mandi Crist', title: 'The Big Sister', photo: 'img/mandi.png',
    stats: { speed: 6.2, air: 5.8, jump: 14.4, weight: 1.08, power: 1.12, size: 1 },
    taunt: "Big sister's in charge!",
    forms: [
      {
        form: 'witch', formName: 'WITCH!', title: 'Witch outfit', sprite: 'mandi-witch',
        color: '#ff7a1a', accent: '#2a1a2e', skin: '#f1c7a8', hair: '#8a6a4a',
        stats: { speed: 6.2, air: 5.8, jump: 14.4, weight: 1.08, power: 1.12, size: 1 },
        normalSpeed: 0.95,
        attackNames: { jab: 'Brush Off', side: 'Brush Off', down: 'Ground Rules', up: 'Big Sister Says Up', air: 'Broom Boot' },
        specials: {
          neutral: { kind: 'projectile', name: 'Trick or Treat', thing: 'a pumpkin candy bucket', sprite: 'pumpkin', speed: 9, vy: -7, grav: 0.36, dmg: 9, kb: 7, kbg: 0.09, r: 18, life: 100, cd: 40 },
          side: { kind: 'trap', name: 'Salon Spell', thing: 'a hairdryer', sprite: 'dryer', gust: true, dmg: 7, kb: 10, kbg: 0.09, ang: 20, life: 480, cd: 110 },
          up: { kind: 'rise', name: 'Broom Service', power: 17, forward: 6, dmg: 6, kb: 6, kbg: 0.06 },
          down: { kind: 'transform', name: 'Wardrobe Whirl', into: 'Mermaid Fangirl' },
        },
        ultimate: { name: 'Big Sister Spell', sprite: 'mandi-witch-ult', type: 'catch', dur: 144, catchAt: 30, finishAt: 105, radius: 2.4, dmg: 24, kbMul: 1.5,
          desc: 'a pumpkin, ghost and hairbrush vortex catches everyone close, then a big burst',
          poses: [[0, 'ult0'], [48, 'ult1'], [72, 'ult2'], [105, 'ult3']] },
      },
      {
        form: 'mermaid', formName: 'MERMAID FANGIRL!', title: 'Mermaid Fangirl outfit', sprite: 'mandi-mermaid',
        color: '#14b8a6', accent: '#7c3aed', skin: '#f1c7a8', hair: '#8a6a4a',
        stats: { speed: 7.7, air: 6.8, jump: 15.5, weight: 1, power: 0.95, size: 1 },
        attackNames: { jab: 'Shell Shock', side: 'Shell Shock', down: 'Deep Dive', up: 'Rising Tide', air: 'Fin Kick' },
        specials: {
          neutral: { kind: 'projectile', name: 'Bubble Boss', thing: 'three bubbles', sprite: 'bubbleball', speed: 10, dmg: 3, kb: 4, kbg: 0.04, r: 14, life: 70, count: 3, spread: 0.28, cd: 45 },
          side: { kind: 'dash', name: 'Mermaid Mischief', speed: 15, dur: 16, dmg: 9, kb: 7, kbg: 0.11, ang: 35, box: [-10, -90, 110, 90] },
          up: { kind: 'rise', name: 'Surface Break', power: 20, dmg: 7, kb: 7, kbg: 0.07 },
          down: { kind: 'transform', name: 'Wardrobe Whirl', into: 'Witch' },
        },
        ultimate: { name: 'Big Sister Splash', sprite: 'mandi-mermaid-ult', type: 'catch', dur: 144, catchAt: 30, finishAt: 105, radius: 2.4, dmg: 22, kbMul: 1.4,
          desc: 'a whirlpool pulls everyone close, then a giant shell of water bursts',
          poses: [[0, 'ult0'], [48, 'ult1'], [72, 'ult2'], [105, 'ult3']] },
      },
    ],
  },
  {
    // Jadden Morris, "The Irish Powerhouse": coach, Notre Dame fan, loves Mustangs and Ice Ice Baby.
    // Moves/numbers from ChatGPT's JADDEN_HANDOFF (proposed). Art: ChatGPT sheets.
    id: 'jadden', name: 'Jadden Morris', title: 'The Irish Powerhouse', photo: 'img/jadden.png', sprite: 'jadden',
    color: '#0C2340', accent: '#C99700', skin: '#f0b48e', hair: '#8a7356',
    stats: { speed: 6.5, air: 5.8, jump: 14.5, weight: 1.18, power: 1.18, size: 1.05 },
    attackNames: { jab: "Coach's Combo", side: "Coach's Combo", up: 'Header Hero', down: 'Cleat Sweep', air: 'Overtime Volley, Retro Roundhouse, End Zone Stomp' },
    specials: {
      neutral: { kind: 'projectile', name: 'Irish Hail Mary', thing: 'a football in a long arc', sprite: 'football', speed: 11, vy: -8, grav: 0.33, dmg: 9, kb: 7, kbg: 0.09, r: 16, life: 110, cd: 40 },
      side: { kind: 'dash', name: 'Irish Drive', speed: 16, dur: 18, dmg: 11, kb: 8.5, kbg: 0.13, ang: 32, box: [-10, -105, 110, 100] },
      up: { kind: 'rise', name: 'Victory Leap', power: 19, dmg: 7, kb: 7, kbg: 0.08 },
      // 0.4 s dance, one ice wave along the floor (6 dmg), slows to 70% for 0.65 s, 3 s cooldown
      down: { kind: 'icewave', name: 'Ice Ice Jadden', thing: 'an ice wave', startup: 24, recovery: 21, cd: 180, speed: 10.5, life: 54, dmg: 6, kb: 5, kbg: 0.05, slowMul: 0.7, slowFrames: 39 },
    },
    taunt: 'Go Irish!',
    // 2.4 s: spotlight (.45 s catch), ND backdrop, running kick, finisher at 1.75 s (25 dmg, 1.5x)
    ultimate: { name: "Jadden's Irish Takeover", sprite: 'jadden-ult', type: 'catch', dur: 144, catchAt: 27, finishAt: 105, radius: 2.5, dmg: 25, kbMul: 1.5,
      desc: 'a spotlight catches everyone close, then the ND backdrop, a running kick and a big finish',
      poses: [[0, 'ult0'], [39, 'ult1'], [66, 'ult2'], [100, 'ult3']] },
  },
  {
    // Courtnee Morris, "The Tech Titan": tech, cartoons, video games, anime. Down-special turns him Super Saiyan
    // for 8 s (stronger); when it wears off he takes +25% damage (the game's version of "a quarter of life").
    // Moves/numbers from ChatGPT's Courtnee pack (proposed). Art: ChatGPT sheets.
    id: 'courtnee', name: 'Courtnee Morris', title: 'The Tech Titan', photo: 'img/courtnee.png',
    // the tallest in the family
    stats: { speed: 6.6, air: 6.1, jump: 15, weight: 1.05, power: 1, size: 1.15 },
    taunt: 'Time for an upgrade!',
    forms: [
      {
        form: 'normal', formName: 'NORMAL', title: 'Normal', sprite: 'courtnee',
        color: '#d32f2f', accent: '#1fd1ef', skin: '#efc19c', hair: '#6b3f22',
        stats: { speed: 6.6, air: 6.1, jump: 15, weight: 1, power: 1 },
        attackNames: { jab: 'Combo Click', side: 'Reboot Throw', up: 'System Uppercut', down: 'Low Battery', air: 'Air Combo, Upload Kick, Crash Landing, Retro Roundhouse' },
        specials: {
          neutral: { kind: 'beam', name: 'Courtnee-Hameha!', thing: 'an energy beam (hold Special to charge it bigger)', startup: 22, active: 22, recovery: 20, maxCharge: 45, len: 520, dmg: 9, kb: 7, kbg: 0.1, cd: 50 },
          side: { kind: 'dash', name: 'Pixel Rush', trail: 'aura2', speed: 17, dur: 18, dmg: 9, kb: 7.5, kbg: 0.11, ang: 33, box: [-10, -100, 105, 95] },
          up: { kind: 'rise', name: 'Tech Takeoff', power: 19.5, forward: 3, dmg: 5, kb: 6, kbg: 0.05 },
          down: { kind: 'supersaiyan', name: 'Super Saiyan Courtnee', dur: 480, cost: 25, cooldown: 900 },
        },
        ultimate: { name: 'Maximum Morris', sprite: 'courtnee', type: 'beam', dur: 192, beamAt: 84, beamEnd: 129, len: 1500, dmg: 28, kbMul: 1.5, beamX: 230, beamY: 1.1, beamTh: 170, beamX: 230, beamY: 1.1, beamTh: 170,
          desc: 'builds a tech mech, charges up with floating game screens and fires a giant beam straight ahead',
          poses: [[0, 'asm0'], [12, 'asm1'], [24, 'asm2'], [38, 'asm3'], [48, 'ult0'], [64, 'ult1'], [84, 'ult2'], [129, 'ult3'], [144, 'ret0'], [156, 'ret1'], [168, 'ret2'], [180, 'ret3']] },
      },
      {
        form: 'super', formName: 'SUPER SAIYAN!', title: 'Super Saiyan', sprite: 'courtnee-super',
        color: '#d32f2f', accent: '#ffd23f', skin: '#efc19c', hair: '#ffd23f',
        stats: { speed: 7.2, air: 6.6, jump: 15.6, weight: 1, power: 1.3 },
        attackNames: { jab: 'Powered Combo Click', side: 'Powered Reboot Throw', up: 'Powered System Uppercut', down: 'Powered Low Battery', air: 'powered air attacks' },
        specials: {
          neutral: { kind: 'beam', name: 'Powered Courtnee-Hameha!', thing: 'a golden energy beam (hold Special to charge)', startup: 18, active: 24, recovery: 18, maxCharge: 45, len: 600, dmg: 9, kb: 7.5, kbg: 0.1, cd: 45 },
          side: { kind: 'dash', name: 'Powered Pixel Rush', trail: 'aura2', speed: 19, dur: 18, dmg: 9, kb: 8, kbg: 0.12, ang: 33, box: [-10, -100, 110, 95] },
          up: { kind: 'rise', name: 'Powered Tech Takeoff', power: 20.5, forward: 3, dmg: 6, kb: 6, kbg: 0.06 },
          down: { kind: 'supersaiyan', name: 'Super Saiyan (already on)', dur: 480, cost: 25, cooldown: 900 },
        },
        ultimate: { name: 'Maximum Morris', sprite: 'courtnee', type: 'beam', dur: 192, beamAt: 84, beamEnd: 129, len: 1500, dmg: 28, kbMul: 1.5, beamX: 230, beamY: 1.1, beamTh: 170, beamX: 230, beamY: 1.1, beamTh: 170,
          desc: 'builds a tech mech and fires a giant beam straight ahead (the Super Saiyan timer keeps running)',
          poses: [[0, 'asm0'], [12, 'asm1'], [24, 'asm2'], [38, 'asm3'], [48, 'ult0'], [64, 'ult1'], [84, 'ult2'], [129, 'ult3'], [144, 'ret0'], [156, 'ret1'], [168, 'ret2'], [180, 'ret3']] },
      },
    ],
  },
  {
    // Megan Morris, "The Book & Beat Queen": books, K-pop/BTS, cats (her orange tabby Krillin) and naps.
    // Moves/numbers from ChatGPT's Megan pack (proposed). Art: ChatGPT sheets.
    id: 'megan', name: 'Megan Morris', title: 'The Book & Beat Queen', photo: 'img/megan.png', sprite: 'megan',
    color: '#2e7d32', accent: '#c8a24a', skin: '#f1c2a0', hair: '#6b4226',
    stats: { speed: 6.8, air: 6.3, jump: 15.4, weight: 0.95, power: 1, size: 0.98 },
    attackNames: { jab: 'Hardcover Hit', side: 'Overdue Return', up: 'Rising Chapter', down: 'Beat Drop', air: 'Page Turner, High Note, Book Drop, Fan Spin' },
    specials: {
      neutral: { kind: 'projectile', name: 'Plot Twist', thing: 'three glowing green pages', sprite: 'prop3', scale: 0.32, speed: 11, dmg: 3, kb: 4, kbg: 0.04, r: 16, life: 60, count: 3, spread: 0.22, cd: 72 },
      side: { kind: 'pack', name: 'Krillin Pounce', thing: 'Krillin', sprites: ['krun0'], anim: ['krun0', 'krun1', 'krun2', 'krun3'], names: ['Krillin'], scale: 0.42, speed: 9, life: 72, dmg: 6, kb: 6, kbg: 0.07, cd: 180 },
      up: { kind: 'rise', name: 'Encore Rise', power: 19.5, dmg: 6, kb: 6, kbg: 0.06 },
      down: { kind: 'heal', name: 'Power Nap', amount: 8, channel: 72, recovery: 21, grounded: true, cd: 600 },
    },
    taunt: 'Just one more chapter… then you\'re next!',
    // 2.8 s: open the giant book, lightstick rally, page wave with Krillin's hologram (forward only), seal the book
    ultimate: { name: 'Main Character Moment', sprite: 'megan', type: 'beam', noBeamArt: true, dur: 168, beamAt: 66, beamEnd: 102, len: 650, beamX: 60, beamY: 0.55, beamTh: 190, dmg: 26, kbMul: 1.5,
      desc: 'opens a giant storybook stage, rallies with a lightstick, then sends a wave of pages with a Krillin hologram straight ahead',
      poses: [[0, 'ult0'], [36, 'ult1'], [66, 'ult2'], [120, 'ult3']] },
  },
  {
    // Siren Morris, "The Creative Chaos" (16): art, singing, LEGO-style bricks, block games, K-pop and mac and cheese.
    // A teen, drawn at near-adult height (0.94). Moves/numbers from ChatGPT's Siren pack (proposed). Art: ChatGPT sheets.
    id: 'siren', name: 'Siren Morris', title: 'The Creative Chaos', photo: 'img/siren.png', sprite: 'siren',
    color: '#e0218a', accent: '#ffd400', skin: '#f2c4a4', hair: '#7a4a2a',
    stats: { speed: 7, air: 6.5, jump: 15.6, weight: 0.9, power: 0.97, size: 0.94 },
    attackNames: { jab: 'Pencil Pop', side: 'Masterpiece Toss', up: 'Rising Rainbow', down: 'Color Sweep', air: 'Doodle Swipe, Sky Scribble, Brick Boots, Stage Spin' },
    specials: {
      neutral: { kind: 'pack', name: 'Sketch Attack', thing: 'her doodle dragon', sprites: ['drag1'], anim: ['drag1', 'drag2', 'drag3', 'drag2'], names: ['her doodle dragon'], scale: 0.62, speed: 10, life: 72, dmg: 6, kb: 6, kbg: 0.07, cd: 90 },
      side: { kind: 'dash', name: 'Brick Blitz', ride: true, speed: 14, dur: 27, dmg: 8, kb: 7.5, kbg: 0.11, ang: 30, cd: 180, box: [-10, -95, 115, 95] },
      up: { kind: 'rise', name: 'High Note', power: 19.5, dmg: 6, kb: 6, kbg: 0.06 },
      down: { kind: 'projectile', name: 'Mac Attack', thing: 'a glob of mac and cheese that leaves a slippery puddle', sprite: 'mprop2', scale: 0.55, speed: 8, vy: -6, grav: 0.4, dmg: 3, kb: 4, kbg: 0.03, r: 18, life: 120, cd: 180,
        slow: { mul: 0.75, t: 36 }, puddle: { sprite: 'mprop3', scale: 0.7, slowOnly: true, slow: { mul: 0.75, t: 36 }, life: 90 } },
    },
    taunt: 'Watch what I can create!',
    // 2.8 s: sketchbook, block concert stage, paint wave straight ahead (26 dmg once each), confetti finish
    ultimate: { name: "Siren's World", sprite: 'siren', type: 'beam', noBeamArt: true, dur: 168, beamAt: 66, beamEnd: 105, len: 650, beamX: 60, beamY: 0.55, beamTh: 190, dmg: 26, kbMul: 1.5,
      desc: 'draws in her sketchbook, a block concert stage rises, then a rainbow paint wave sweeps straight ahead',
      poses: [[0, 'ult0'], [36, 'ult1'], [66, 'ult2'], [120, 'ult3']] },
  },
  {
    // Codee Morris, "The Dirty Work Perfectionist": hard worker, ran a landscaping business, likes everything clean.
    // Landscaping moves fill his Mess Meter (grass and mud build up on his clothes). When it's full, Switch form
    // (R / Num 4 / controller Y) cleans him up into the Clean Freak for 12 s: cleaning tools, +10% power, +8% speed.
    // Moves/numbers from ChatGPT's CODEE_HANDOFF (proposed, editable). Art: ChatGPT sheets.
    id: 'codee', name: 'Codee Morris', title: 'The Dirty Work Perfectionist', photo: 'img/codee.png',
    stats: { speed: 6.8, air: 6.2, jump: 15, weight: 1.06, power: 1.02, size: 1.05 },
    taunt: 'Time to clean this up!',
    mess: { action: 4, hit: 6, cleanFrames: 720 }, // Mess Meter: +4 per landscaping move, +6 once per move that lands
    forms: [
      {
        form: 'land', formName: 'BACK TO WORK!', title: 'Landscaping', sprite: 'codee',
        color: '#b8742e', accent: '#5fae3a', skin: '#e8b996', hair: '#5a3a22',
        stats: { speed: 6.8, air: 6.2, jump: 15, weight: 1.06, power: 1.02, size: 1.05 },
        attackNames: { jab: 'Weed Whack', side: 'Yard Waste', up: 'Rake Raise', down: 'Sod Stomp', air: 'Trim the Hedge, High Branch, Boot Print, Yard Spin' },
        specials: {
          neutral: { kind: 'projectile', name: 'Mulch Madness', thing: 'a clump of mulch', sprite: 'fx0', scale: 0.45, speed: 11, vy: -3, grav: 0.25, dmg: 6, kb: 5, kbg: 0.06, r: 18, life: 70, cd: 84 },
          side: { kind: 'dash', name: 'Mow Down', ride: true, speed: 13, dur: 26, dmg: 8, kb: 7.5, kbg: 0.11, ang: 30, cd: 180, box: [-10, -95, 120, 95] },
          up: { kind: 'rise', name: 'Leaf Lift', power: 18.5, forward: 4, dmg: 5, kb: 6, kbg: 0.06 },
          down: { kind: 'trap', name: 'Mud Patch', thing: 'a mud patch that slows anyone who steps in it', sprite: 'fx1', scale: 0.7, slowOnly: true, slow: { mul: 0.75, t: 36 }, life: 90, cd: 180 },
        },
        // 2.8 s: checks his watch, opens the front door, a giant broom sweeps everyone in front of him, door slams
        ultimate: { name: 'Time to Go', sprite: 'codee', type: 'catch', ahead: 3.5, dur: 168, catchAt: 54, finishAt: 102, dmg: 28, kbMul: 1.5,
          desc: 'checks his watch, opens the front door, sweeps everyone in front of him out with a giant broom and slams the door: HOUSE CLOSED',
          poses: [[0, 'ult0'], [27, 'ult1'], [54, 'ult2'], [102, 'ult3']] },
      },
      {
        form: 'clean', formName: 'CLEAN FREAK!', title: 'Clean Freak', sprite: 'codee-clean',
        color: '#e9f1f7', accent: '#4aa8e8', skin: '#e8b996', hair: '#5a3a22',
        stats: { speed: 7.34, air: 6.7, jump: 15, weight: 1.06, power: 1.12, size: 1.05 },
        attackNames: { jab: 'Sweep It Up', side: 'Take Out the Trash', up: 'Ceiling Check', down: 'Spotless Sweep', air: 'Dust Buster, High Duster, Squeaky Stomp, Polish Spin' },
        specials: {
          neutral: { kind: 'projectile', name: 'Suds Delivery', thing: 'a cloud of soap foam', sprite: 'fx2', scale: 0.45, speed: 9, dmg: 6, kb: 5, kbg: 0.06, r: 20, life: 60, cd: 84 },
          side: { kind: 'dash', name: 'Floor Patrol', ride: true, speed: 13, dur: 26, dmg: 8, kb: 7.5, kbg: 0.11, ang: 30, cd: 180, box: [-10, -95, 120, 95] },
          up: { kind: 'rise', name: 'Vacuum Lift', power: 18.5, forward: 4, dmg: 5, kb: 6, kbg: 0.06 },
          down: { kind: 'trap', name: 'Wet Floor', thing: 'a slippery wet patch that slows anyone who steps in it', sprite: 'fx3', scale: 0.7, slowOnly: true, slow: { mul: 0.8, t: 30 }, life: 90, cd: 180 },
        },
        ultimate: { name: 'Time to Go', sprite: 'codee-clean', type: 'catch', ahead: 3.5, dur: 168, catchAt: 54, finishAt: 102, dmg: 28, kbMul: 1.5,
          desc: 'checks his watch, opens the front door, sweeps everyone in front of him out with a giant broom and slams the door: HOUSE CLOSED',
          poses: [[0, 'ult0'], [27, 'ult1'], [54, 'ult2'], [102, 'ult3']] },
      },
    ],
  },
];

// Stages. Units are world pixels; y grows downward; the main floor top is y = 0.
//   main      the solid floor: x from left to right, top at y 0, depth = how thick it looks
//   plats     pass-through platforms (jump up through them, press down to drop)
//   blast     how far past the floor edge you go before you're KO'd
//   theme     which background to draw (render.js STAGE_ART)
// Illustrated arenas (from the family's artwork) also have:
//   pic       on a platform: which prop picture to draw for it (art details in stage-art.js)
//   move      on a platform: it sways { ax, ay (world px), period (frames) }; fighters standing on it ride along
//   main.depth of an illustrated arena is set from its floor picture in stage-art.js.
MM.STAGES = [
  // Each illustrated arena has one solid floor along the bottom; the other platforms are props standing
  // on it (`base: 0` = their feet rest on the floor, see stage-art.js) or floating on the water
  // (`afloat`). spawnX = middle of the floor (where fighters start and come back); blast.left/right
  // when the stage isn't centered.
  { id: 'dunkirk', name: 'Main Street Mayhem (Dunkirk)', theme: 'dunkirk',
    main: { left: -640, right: 640, depth: 200 },
    // the shop's roof (left), the railroad crossing gate arm (middle) and a pile of crates (right)
    plats: [{ x: -600, base: 0, w: 296, pic: 'storefront' }, { x: -125, base: 0, w: 300, pic: 'gatearm' }, { x: 390, base: 0, w: 190, pic: 'crates' }],
    blast: { side: 1250, top: -1050, bottom: 800 } },
  { id: 'hardin-northern', name: 'Polar Bear Gym (Hardin Northern)', theme: 'hardin',
    main: { left: -640, right: 640, depth: 200 },
    // bleachers on both sides of the court, the scoreboard hanging high in the middle
    plats: [{ x: -610, base: 0, w: 340, pic: 'bleachers' }, { x: 270, base: 0, w: 340, pic: 'bleachers' }, { x: -150, y: -300, w: 300, pic: 'scoreboard' }],
    blast: { side: 1250, top: -1050, bottom: 800 } },
  { id: 'williamstown', name: 'Family Picnic (Williamstown)', theme: 'williamstown',
    main: { left: -640, right: 640, depth: 200 },
    // picnic tables on the stage, the church bell's frame in the middle (walk under it, stand on top)
    plats: [{ x: -595, base: 0, w: 250, pic: 'picnic' }, { x: -140, base: 0, w: 280, pic: 'bell' }, { x: 345, base: 0, w: 250, pic: 'picnic' }],
    blast: { side: 1250, top: -1050, bottom: 800 } },
  { id: 'graceland', name: 'Music Gate Mix-Up (Graceland)', theme: 'graceland',
    main: { left: -640, right: 640, depth: 200 },
    // the family van is parked on the terrace (only its flat roof is a platform), gold stages either side
    plats: [{ x: -615, base: 0, w: 250, pic: 'riser' }, { x: -103, base: 0, w: 270, pic: 'van' }, { x: 365, base: 0, w: 250, pic: 'riser' }],
    blast: { side: 1250, top: -1050, bottom: 800 } },
  { id: 'agnew', name: "PawPaw's Dock (Agnew Lake)", theme: 'agnew',
    // the dock runs out from the rocky shore on the left and ends; then open water with PawPaw's
    // fishing boat floating in it (it bobs and drifts a little and carries whoever stands in it)
    main: { left: -820, right: 40, depth: 200 }, spawnX: -390,
    plats: [{ x: -700, base: 0, w: 320, pic: 'shortdock' }, { x: 165, afloat: true, w: 400, pic: 'boat', move: { ax: 22, ay: 5, period: 300 } }],
    blast: { left: -1460, right: 1270, top: -1050, bottom: 800 } },
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

// Fighters with forms (e.g. Mandi): each form is a full fighter look + move set. The base entry's
// own fields are shared, and each form overrides what it changes. formDefs() merges them once.
MM.formDefs = function (def) {
  if (!def._forms) def._forms = def.forms.map((fm, i) => Object.assign({}, def, fm, {
    id: def.id + (i ? '-' + fm.form : ''), baseId: def.id, formName: fm.formName, forms: undefined,
    stats: Object.assign({}, def.stats, fm.stats),
  }));
  return def._forms;
};
// The base entry shows form 1 on menus.
for (const d of MM.FIGHTERS) if (d.forms) for (const k of ['color', 'accent', 'skin', 'hair', 'hat', 'photo', 'sprite', 'specials', 'taunt', 'attackNames', 'normalSpeed']) if (d[k] === undefined && d.forms[0][k] !== undefined) d[k] = d.forms[0][k];

// Fighters without their own ultimate art yet get a simple one.
for (const d of MM.FIGHTERS) if (!d.ultimate && !d.forms) d.ultimate = { name: 'Mayhem Burst', type: 'catch', dur: 120, catchAt: 27, finishAt: 80, radius: 2.2, dmg: 20, kbMul: 1.35, emoji: '💥', desc: 'catches everyone close, then explodes', poses: [] };
