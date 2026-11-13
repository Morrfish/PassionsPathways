/* Bot Assembly Shop — core data: parts, bot math, tiles, courses, storage */
'use strict';
const VERSION = '1.2';   // shown on the sign-in and home screens; keep in step with ?v= in index.html
const pl = planck, V = pl.Vec2;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const MPH = 2.237;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- Parts catalog ---------------- */
const PARTS = {
  chassis: [
    { id: 'skeleton', name: 'Skeleton', icon: '🦴', desc: 'Bare frame. Feather light, but breaks easily.', len: 1.6, ht: 0.4, mass: 16, slots: 2, up: 2, hp: 60, cost: 70 },
    { id: 'scout', name: 'Scout', icon: '🛹', desc: 'Light and quick.', len: 1.8, ht: 0.45, mass: 28, slots: 2, up: 2, hp: 80, cost: 100 },
    { id: 'dragster', name: 'Dragster', icon: '🏁', desc: 'Long and low. Very hard to flip, but fragile.', len: 3.0, ht: 0.4, mass: 38, slots: 2, up: 3, hp: 70, cost: 150 },
    { id: 'rover', name: 'Rover', icon: '🚙', desc: 'Good at everything.', len: 2.2, ht: 0.55, mass: 50, slots: 3, up: 3, hp: 100, cost: 180 },
    { id: 'cube', name: 'Box Bot', icon: '📦', desc: 'Short and tall. Lots of room for gadgets, but tippy.', len: 1.5, ht: 0.9, mass: 46, slots: 4, up: 2, hp: 110, cost: 200 },
    { id: 'crawler', name: 'Crawler', icon: '🦀', desc: 'Low, dense and tough. Built to push.', len: 2.4, ht: 0.5, mass: 115, slots: 3, up: 4, hp: 180, cost: 260 },
    { id: 'hauler', name: 'Hauler', icon: '🚛', desc: 'Big and heavy. Carries a lot.', len: 2.8, ht: 0.7, mass: 95, slots: 5, up: 4, hp: 140, cost: 300 },
    { id: 'tank', name: 'Tank', icon: '🛡️', desc: 'Enormous and nearly unbreakable.', len: 3.2, ht: 0.8, mass: 150, slots: 7, up: 5, hp: 220, cost: 420 },
  ],
  wheels: [
    { id: 'micro', name: 'Micro', desc: 'Skateboard wheels. Maximum push, hopeless on bumps.', r: 0.22, mass: 2, cost: 30 },
    { id: 'mini', name: 'Mini', desc: 'Tiny. Lots of push, low top speed. Gets stuck on bumps.', r: 0.3, mass: 3, cost: 40 },
    { id: 'std', name: 'Standard', desc: 'A solid all-around wheel.', r: 0.45, mass: 6, cost: 80 },
    { id: 'racing', name: 'Racing', desc: 'Hollow and very light. Quick to spin up.', r: 0.5, mass: 3, cost: 120 },
    { id: 'fat', name: 'Fat', desc: 'Extra wide for 20% more grip. Heavy.', r: 0.55, mass: 10, grip: 1.2, cost: 150 },
    { id: 'big', name: 'Big', desc: 'Rolls over steps and mud. Faster, but less push.', r: 0.65, mass: 11, cost: 140 },
    { id: 'monster', name: 'Monster', desc: 'Crushes obstacles. Needs a strong motor to turn.', r: 0.9, mass: 20, cost: 220 },
    { id: 'colossus', name: 'Colossus', desc: 'Taller than the bot. Rolls over almost anything.', r: 1.15, mass: 32, cost: 320 },
  ],
  tires: [
    { id: 'slick', name: 'Slick', desc: 'Smooth and cheap. Slips on hills and ice.', mu: 0.55, ice: 0.06, mass: 0, cost: 0 },
    { id: 'allterrain', name: 'All-Terrain', desc: 'Knobby tread for good grip.', mu: 0.95, ice: 0.14, mass: 1, cost: 60 },
    { id: 'balloon', name: 'Balloon', desc: 'Soft and puffy. Rolls over sand and mud like they are not there.', mu: 0.8, ice: 0.1, soft: 0.15, mass: 1, cost: 80 },
    { id: 'paddle', name: 'Paddle', desc: 'Big scoops that float over mud and sand.', mu: 0.85, ice: 0.1, soft: 0.3, mass: 2, cost: 90 },
    { id: 'soft', name: 'Racing Soft', desc: 'Sticky rubber. Superb on dry ground, terrible in mud and on ice.', mu: 1.25, ice: 0.04, soft: 1.5, mass: 1, cost: 100 },
    { id: 'chains', name: 'Snow Chains', desc: 'Steel chains. The best there is on ice. Heavy.', mu: 1.0, ice: 0.95, mass: 4, cost: 110 },
    { id: 'spiked', name: 'Spiked', desc: 'Maximum grip. Bites into ice.', mu: 1.5, ice: 0.75, mass: 2, cost: 130 },
  ],
  motor: [
    { id: 'micro', name: 'Micro Motor', desc: 'Tiny and cheap. Sips battery.', speed: 22, torque: 30, mass: 3, eff: 0.8, cost: 40 },
    { id: 'zip', name: 'Zip Motor', desc: 'Spins very fast, but weak.', speed: 30, torque: 60, mass: 6, eff: 1, cost: 80 },
    { id: 'std', name: 'Workhorse', desc: 'Balanced speed and torque.', speed: 20, torque: 140, mass: 10, eff: 1, cost: 120 },
    { id: 'sprinter', name: 'Sprinter', desc: 'Screaming fast. Thirsty.', speed: 40, torque: 90, mass: 12, eff: 1.2, cost: 180 },
    { id: 'titan', name: 'Torque Titan', desc: 'Slow but very strong.', speed: 11, torque: 420, mass: 18, eff: 1, cost: 200 },
    { id: 'mammoth', name: 'Mammoth', desc: 'Barely moves. Could tow a house.', speed: 7, torque: 900, mass: 40, eff: 1.1, cost: 320 },
    { id: 'beast', name: 'The Beast', desc: 'Fast AND strong. Heavy, pricey, drains batteries.', speed: 26, torque: 500, mass: 30, eff: 1.4, cost: 380 },
  ],
  gear: [
    { ratio: 0.5, name: 'Overdrive' }, { ratio: 0.75, name: 'Fast' }, { ratio: 1, name: 'Even' },
    { ratio: 1.5, name: 'Strong' }, { ratio: 2, name: 'Crawler' }, { ratio: 3, name: 'Tractor' }, { ratio: 4.5, name: 'Bulldozer' },
  ],
  battery: [
    { id: 'coin', name: 'Coin Cell', desc: 'Weighs almost nothing. Holds almost nothing.', mass: 2, energy: 40, cost: 20 },
    { id: 'small', name: 'Small Cell', desc: 'Light, but runs out fast.', mass: 5, energy: 80, cost: 40 },
    { id: 'supercap', name: 'Supercapacitor', desc: 'Small tank that slowly refills itself as you go.', mass: 6, energy: 100, regen: 2, cost: 130 },
    { id: 'medium', name: 'Power Pack', desc: 'Enough for most courses.', mass: 11, energy: 200, cost: 90 },
    { id: 'large', name: 'Mega Cell', desc: 'Lasts a long time. Heavy.', mass: 22, energy: 500, cost: 160 },
    { id: 'giga', name: 'Giga Brick', desc: 'Power for days. Weighs as much as a small bot.', mass: 40, energy: 900, cost: 260 },
  ],
  drive: [
    { id: 'rwd', name: 'Rear-Wheel Drive', desc: 'Only the back wheel pushes.', mass: 0, cost: 0 },
    { id: 'fwd', name: 'Front-Wheel Drive', desc: 'Only the front wheel pulls. Good at dragging itself up ledges.', mass: 0, cost: 0 },
    { id: 'awd', name: 'All-Wheel Drive', desc: 'Both wheels push. Much better traction.', mass: 5, cost: 80 },
    { id: 'smart', name: 'Smart All-Wheel Drive', desc: 'Both wheels push, and a computer stops them spinning uselessly.', mass: 7, cost: 170 },
  ],
  // key = label shown, code = keyboard code, hold = works while held, act = what the key does
  gadgets: [
    { id: 'saw', cat: 'Tools', name: 'Buzz Saw', icon: '🪚', desc: 'Cuts through wood walls and crates on contact.', mass: 6, cost: 110 },
    { id: 'drill', cat: 'Tools', name: 'Rock Drill', icon: '🔩', desc: 'Bores through rock, boulders and ice walls.', mass: 9, cost: 140 },
    { id: 'torch', cat: 'Tools', name: 'Heat Torch', icon: '🔥', desc: 'Melts ice walls fast. Burns wood slowly.', mass: 4, cost: 90 },
    { id: 'sledge', cat: 'Tools', name: 'Sledgehammer', icon: '🔨', key: 'B', code: 'KeyB', act: 'Swing hammer', desc: 'Smashes crates and glass in one hit. Cracks walls and rock.', mass: 9, cost: 120 },
    { id: 'bomb', cat: 'Tools', name: 'Mini Bombs', icon: '💣', key: 'K', code: 'KeyK', act: 'Toss a bomb', desc: '3 bombs. Tossed ahead, they blow up walls and rock. Stand back!', mass: 5, cost: 130 },
    { id: 'blade', cat: 'Tools', name: 'Dozer Blade', icon: '🚜', desc: 'Pushes crates without climbing on top of them.', mass: 8, cost: 70 },
    { id: 'lance', cat: 'Tools', name: 'Long Pole', icon: '🎣', desc: 'A 2 m pole out front. Pokes switches and topples stacks from a distance.', mass: 4, cost: 50 },
    { id: 'cannon', cat: 'Tools', name: 'Ball Cannon', icon: '💥', key: 'C', code: 'KeyC', act: 'Fire cannon', desc: '6 shots. Hits far-off switches, knocks things over, cracks wood walls.', mass: 8, cost: 150 },
    { id: 'claw', cat: 'Tools', name: 'Grabber Claw', icon: '🦞', key: 'G', code: 'KeyG', act: 'Grab / drop', desc: 'Pick up a crate or boulder and carry it. Stack crates to make a step.', mass: 7, cost: 130 },
    { id: 'magnet', cat: 'Tools', name: 'Magnet', icon: '🧲', key: 'M', code: 'KeyM', hold: true, act: 'Magnet (hold)', desc: 'Pulls steel crates toward you so you can drag them out of the way.', mass: 6, cost: 100 },
    { id: 'bridge', cat: 'Tools', name: 'Bridge Layer', icon: '🌉', key: 'L', code: 'KeyL', act: 'Lay a bridge', desc: '2 planks. Each lays a 5 m bridge in front of the bot.', mass: 10, cost: 120 },
    { id: 'hook', cat: 'Movement', name: 'Grapple Hook', icon: '🪝', key: 'E', code: 'KeyE', act: 'Hook on / let go', desc: 'Grab zip lines and grapple points. Hold ↑ to reel in.', mass: 4, cost: 120 },
    { id: 'jump', cat: 'Movement', name: 'Jump Jack', icon: '🦘', key: 'Space', code: 'Space', act: 'Jump', desc: 'Spring straight up. Light bots jump higher.', mass: 5, cost: 100 },
    { id: 'airjump', cat: 'Movement', name: 'Air Jets', icon: '💨', key: 'Space', code: 'Space', act: 'Mid-air hop', desc: 'One extra hop while already in the air. Refills when you land.', mass: 4, cost: 110 },
    { id: 'vault', cat: 'Movement', name: 'Vault Pole', icon: '🏑', key: 'V', code: 'KeyV', act: 'Pole vault', desc: 'Plant the pole and leap forward. 3 vaults, refilled at checkpoints.', mass: 5, cost: 90 },
    { id: 'rocket', cat: 'Movement', name: 'Rocket Booster', icon: '🚀', key: 'Shift', code: 'ShiftLeft', hold: true, act: 'Rocket (hold)', desc: '3 seconds of serious thrust.', mass: 7, cost: 160 },
    { id: 'prop', cat: 'Movement', name: 'Propeller', icon: '🚁', key: 'X', code: 'KeyX', hold: true, act: 'Propeller (hold)', desc: '4 seconds of flight, up to 8 m high. Refills at checkpoints. Heavy bots drain the battery faster.', mass: 8, cost: 170 },
    { id: 'hover', cat: 'Movement', name: 'Hover Skirt', icon: '🛸', key: 'U', code: 'KeyU', hold: true, act: 'Hover (hold)', desc: '3 seconds of floating just above the ground, water or lava. Refills at checkpoints.', mass: 6, cost: 150 },
    { id: 'balloon', cat: 'Movement', name: 'Balloon Pack', icon: '🎈', key: 'N', code: 'KeyN', hold: true, act: 'Balloons (hold)', desc: '6 seconds of helium. Floats light bots up and over. Refills at checkpoints.', mass: 2, cost: 80 },
    { id: 'chute', cat: 'Movement', name: 'Parachute', icon: '🪂', desc: 'Pops open on long falls so you land softly.', mass: 3, cost: 70 },
    { id: 'wing', cat: 'Movement', name: 'Glider Wing', icon: '🪽', desc: 'Glide over long gaps. Only lifts light, fast bots.', mass: 3, cost: 110 },
    { id: 'suction', cat: 'Movement', name: 'Wall Climber', icon: '🧗', key: 'Z', code: 'KeyZ', hold: true, act: 'Stick to walls (hold)', desc: 'Suction wheels drive straight up walls. Needs both wheels driven.', mass: 5, cost: 140 },
    { id: 'floats', cat: 'Movement', name: 'Pontoon Floats', icon: '🛟', desc: 'Float and paddle across water.', mass: 6, cost: 90 },
    { id: 'snorkel', cat: 'Movement', name: 'Snorkel', icon: '🤿', desc: 'Drive along the bottom of pools without shorting out.', mass: 2, cost: 50 },
    { id: 'anchor', cat: 'Movement', name: 'Ground Anchor', icon: '⚓', key: 'Y', code: 'KeyY', hold: true, act: 'Anchor (hold)', desc: 'Clamps the bot to the ground. Wind, belts and hammers cannot move it.', mass: 6, cost: 70 },
    { id: 'drone', cat: 'Helpers', name: 'Switch Drone', icon: '🛰️', key: 'Q', code: 'KeyQ', act: 'Send drone', desc: 'A little drone that flies to the nearest switch within 14 m and presses it.', mass: 3, cost: 140 },
    { id: 'beacon', cat: 'Helpers', name: 'Warp Beacon', icon: '📡', key: 'I', code: 'KeyI', act: 'Drop beacon / warp back', desc: 'Drop a beacon, explore, then warp back to it. One warp per checkpoint.', mass: 4, cost: 120 },
    { id: 'slowmo', cat: 'Helpers', name: 'Slow-Mo Chip', icon: '⏳', key: 'O', code: 'KeyO', act: 'Slow motion', desc: '2 uses. Everything runs at half speed for 4 seconds. The clock still counts.', mass: 1, cost: 90 },
    { id: 'map', cat: 'Helpers', name: 'Map Screen', icon: '🗺️', desc: 'Shows a map of the whole course with a dot for you.', mass: 1, cost: 60 },
    { id: 'scout', cat: 'Helpers', name: 'Scout Camera', icon: '🔭', key: 'T', code: 'KeyT', hold: true, act: 'Look ahead (hold)', desc: 'See what is coming before you drive into it.', mass: 1, cost: 40 },
    { id: 'mirror', cat: 'Helpers', name: 'Mirror Plating', icon: '🪞', desc: 'Lasers bounce off. They cannot hurt you.', mass: 4, cost: 100 },
    { id: 'shield', cat: 'Helpers', name: 'Bubble Shield', icon: '🫧', key: 'J', code: 'KeyJ', act: 'Shield', desc: '3 uses. Nothing can hurt you for 2.5 seconds.', mass: 4, cost: 130 },
    { id: 'righter', cat: 'Helpers', name: 'Roll Cage', icon: '🔄', key: 'F', code: 'KeyF', act: 'Flip upright', desc: 'Flip yourself back over when you crash.', mass: 5, cost: 60 },
    { id: 'horn', cat: 'Helpers', name: 'Horn', icon: '📯', key: 'H', code: 'KeyH', act: 'Honk', desc: 'Beep beep! Does nothing useful. Totally worth it.', mass: 0, cost: 5 },
  ],
  // Upgrades make the bot itself better. They have their own slots and never need a key.
  upgrades: [
    { id: 'shocks', name: 'Shock Absorbers', icon: '🛞', desc: 'Soak up hard landings. Much less fall damage.', mass: 5, cost: 80 },
    { id: 'armor', name: 'Armor Plating', icon: '🛡️', desc: 'Halves all damage. Heavy.', mass: 16, cost: 110 },
    { id: 'frame', name: 'Reinforced Frame', icon: '🦾', desc: '40 more health for very little weight.', mass: 4, cost: 90 },
    { id: 'bumper', name: 'Crash Bumper', icon: '🧽', desc: 'Crashing into things hurts 70% less.', mass: 5, cost: 60 },
    { id: 'heatshield', name: 'Heat Shield', icon: '🧯', desc: 'Survive 1.5 seconds in lava instead of melting at once.', mass: 6, cost: 100 },
    { id: 'alloy', name: 'Light Alloy', icon: '🪶', desc: 'Rebuilds the chassis in alloy: 25% lighter.', mass: 0, cost: 150 },
    { id: 'ballast', name: 'Ballast Weights', icon: '🧱', desc: 'Extra weight down low: more traction, harder to flip.', mass: 30, cost: 30 },
    { id: 'wbar', name: 'Wheelie Bar', icon: '🦯', desc: 'A rear arm that stops you flipping over backward on steep climbs.', mass: 4, cost: 40 },
    { id: 'gyro', name: 'Gyro Stabilizer', icon: '🌀', desc: 'Keeps the bot level in the air so it lands on its wheels.', mass: 4, cost: 80 },
    { id: 'spoiler', name: 'Spoiler', icon: '🏎️', desc: 'Air pushes the bot down at speed: more grip the faster you go.', mass: 3, cost: 60 },
    { id: 'gripx', name: 'Grip Coating', icon: '🧴', desc: '15% more grip from any tire.', mass: 0, cost: 70 },
    { id: 'turbo', name: 'Turbocharger', icon: '🌪️', desc: 'Motor spins 30% faster, but uses 50% more battery.', mass: 4, cost: 120 },
    { id: 'supercharger', name: 'Supercharger', icon: '💪', desc: 'Motor twists 25% harder, but uses 30% more battery.', mass: 6, cost: 130 },
    { id: 'heatsink', name: 'Cooling Fins', icon: '❄️', desc: 'A cooler motor wastes less: 25% less battery used.', mass: 3, cost: 80 },
    { id: 'regen', name: 'Regen Brakes', icon: '♻️', desc: 'Coasting and braking put energy back in the battery.', mass: 4, cost: 100 },
    { id: 'solar', name: 'Solar Panel', icon: '☀️', desc: 'Slowly recharges the battery as you drive. Not in the dark.', mass: 3, cost: 70 },
    { id: 'xbatt', name: 'Spare Battery', icon: '🔋', desc: 'An extra 150 kJ strapped on.', mass: 8, cost: 70 },
  ],
};
const byId = (list, id) => list.find(p => p.id === id) || list[0];
const BOT_COLORS = ['#ffc21a', '#ff5a36', '#2ad4c0', '#4d8dff', '#b46bff', '#7bd13b', '#ff6fb5', '#e8edf2', '#20242b', '#c0392b', '#1f4fa8', '#8a5a2b'];
// A new builder starts with an empty build bay: every part is the student's choice
const DEFAULT_BOT = { name: '', color: '#ffc21a', color2: '#20242b', hub: '#aab3bf', pattern: 'none', eyes: 'normal', topper: 'antenna', words: '', pic: '', chassis: null, wheels: null, tires: null, motor: null, gear: 2, battery: null, drive: null, gadgets: [], upgrades: [] };
const REQUIRED = [['chassis', 'a chassis'], ['wheels', 'wheels'], ['tires', 'tires'], ['motor', 'a motor'], ['battery', 'a battery'], ['drive', 'a drive type']];
const LOOKS = {
  pattern: [['none', 'Plain'], ['stripes', 'Stripes'], ['racing', 'Racing'], ['flames', 'Flames'], ['dots', 'Dots'], ['camo', 'Camo'], ['checker', 'Checkers'], ['zigzag', 'Zigzag']],
  eyes: [['normal', 'Friendly'], ['angry', 'Angry'], ['sleepy', 'Sleepy'], ['cyclops', 'One eye'], ['shades', 'Shades'], ['wide', 'Surprised'], ['none', 'None']],
  topper: [['antenna', 'Antenna'], ['crown', 'Crown'], ['horns', 'Horns'], ['party', 'Party hat'], ['mohawk', 'Mohawk'], ['tophat', 'Top hat'], ['ears', 'Cat ears'], ['none', 'None']],
  stickers: ['⭐', '⚡', '🔥', '💀', '❤️', '😎', '🤖', '👾', '🦖', '🐉', '🦈', '🐱', '🐶', '🦄', '🌈', '🍕', '⚽', '🏀', '🎵', '👑', '💎', '🚀', '🌮', '🐸'],
};

/* Everything the physics and the stat panel need to know about a build */
/* rules = a course's special rules (mazes and puzzle courses limit gadgets and battery) */
function botSpec(cfg, rules) {
  rules = rules || {};
  const pick = k => PARTS[k].find(p => p.id === cfg[k]), fb = (k, id) => pick(k) || PARTS[k].find(p => p.id === id);
  const real = {}; REQUIRED.forEach(r => real[r[0]] = pick(r[0]));
  const missing = REQUIRED.filter(r => !real[r[0]]).map(r => r[1]);
  const ch = fb('chassis', 'rover'), wh = fb('wheels', 'std'), ti = fb('tires', 'slick'), mo = fb('motor', 'std'), ba = fb('battery', 'small'), dr = fb('drive', 'rwd');
  const ge = PARTS.gear[clamp(cfg.gear | 0, 0, PARTS.gear.length - 1)];
  const slots = real.chassis ? Math.min(ch.slots, rules.slots || 99) : 0, upSlots = real.chassis ? ch.up : 0;
  const gadgets = (cfg.gadgets || []).map(id => PARTS.gadgets.find(g => g.id === id)).filter(Boolean).slice(0, slots);
  const upgrades = (cfg.upgrades || []).map(id => PARTS.upgrades.find(g => g.id === id)).filter(Boolean).slice(0, upSlots);
  const has = {}; gadgets.concat(upgrades).forEach(g => has[g.id] = true);
  const extra = gadgets.concat(upgrades), gMass = extra.reduce((s, g) => s + g.mass, 0), gCost = extra.reduce((s, g) => s + g.cost, 0);
  const wheelMass = wh.mass + ti.mass;
  const bodyMass = ch.mass * (has.alloy ? 0.75 : 1) + mo.mass + ba.mass + dr.mass + gMass;
  const mass = bodyMass + wheelMass * 2;
  const T = mo.torque * ge.ratio * (has.supercharger ? 1.25 : 1), w = mo.speed / ge.ratio * (has.turbo ? 1.3 : 1);
  const driven = [dr.id !== 'fwd', dr.id !== 'rwd'], awd = driven[0] && driven[1], frac = awd ? 1 : dr.id === 'fwd' ? 0.45 : 0.55;
  const mu = ti.mu * (wh.grip || 1) * (has.gripx ? 1.15 : 1), ice = ti.ice * (wh.grip || 1) * (has.gripx ? 1.15 : 1);
  const weight = mass * 10;
  const push = Math.min(T / wh.r, mu * weight * frac);
  const climbTorque = Math.asin(Math.min(1, (T / wh.r) / weight));
  const climbGrip = Math.atan(mu * frac);
  const cost = REQUIRED.reduce((c, r) => c + (real[r[0]] ? real[r[0]].cost : 0), 0) + gCost;
  const wheelDX = Math.max(ch.len * 0.36, wh.r + 0.04);
  const energy = Math.min(ba.energy + (has.xbatt ? 150 : 0), rules.energy || 1e9);
  return {
    ch, wh, ti, mo, ge, ba, dr, gadgets, upgrades, has, awd, driven, di: driven[0] ? 0 : 1, smart: dr.id === 'smart', slots, upSlots, r: wh.r, mu, ice, wheelMass, bodyMass, mass, T, w, real, missing, ready: !missing.length,
    topSpeed: w * wh.r, push, climbDeg: Math.min(climbTorque, climbGrip) * 180 / Math.PI,
    limitedBy: climbTorque < climbGrip ? 'torque' : 'grip', energy, regen: ba.regen || 0, cost,
    eff: mo.eff * (has.turbo ? 1.5 : 1) * (has.supercharger ? 1.3 : 1) * (has.heatsink ? 0.75 : 1),
    hp: ch.hp + (has.frame ? 40 : 0), soft: ti.soft || 1, wheelDX, front: Math.max(ch.len / 2, wheelDX + wh.r) + 0.1, comY: -0.08 - (has.ballast ? 0.2 : 0),
  };
}
/* Older saves kept upgrades in the gadget list: move them across */
function tidyBot(cfg) {
  const isUp = id => PARTS.upgrades.some(u => u.id === id);
  cfg.upgrades = (cfg.upgrades || []).concat((cfg.gadgets || []).filter(isUp)).filter((v, i, a) => a.indexOf(v) === i && isUp(v));
  cfg.gadgets = (cfg.gadgets || []).filter(id => PARTS.gadgets.some(g => g.id === id));
  return cfg;
}

/* ---------------- Tiles ---------------- */
const SHAPES = [null,
  [[0, 0], [1, 0], [1, 1], [0, 1]],       // 1 block
  [[0, 0], [1, 0], [1, 1]],               // 2 steep ramp up
  [[0, 0], [1, 0], [0, 1]],               // 3 steep ramp down
  [[0, 0], [1, 0], [1, .5]],              // 4 gentle up (low half)
  [[0, 0], [1, 0], [1, 1], [0, .5]],      // 5 gentle up (high half)
  [[0, 0], [1, 0], [1, .5], [0, 1]],      // 6 gentle down (high half)
  [[0, 0], [1, 0], [0, .5]],              // 7 gentle down (low half)
  [[0, 0], [1, 0], [1, .5], [0, .5]],     // 8 half slab
];
const WATER = 30, LAVA = 31, DIRT = 0, ICE = 1, MUD = 2, RUBBER = 3, SAND = 4;
const tShape = c => (c > 0 && c <= 24) ? ((c - 1) % 8) + 1 : (c >= 33 && c <= 48) ? ((c - 33) % 8) + 1 : 0;
const tMat = c => (c > 0 && c <= 24) ? ((c - 1) / 8 | 0) : (c >= 33 && c <= 48) ? 3 + ((c - 33) / 8 | 0) : 0;
const tcode = (shape, mat) => mat < 3 ? shape + mat * 8 : 32 + shape + (mat - 3) * 8;
const COURSE_H = 40;

function newCourse(w = 120) {
  return { v: 1, id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: 'My Course', kind: 'crazy', budget: 1000, w, h: COURSE_H, tiles: new Uint8Array(w * COURSE_H), objs: [], par: null, desc: '' };
}
const tget = (c, x, y) => (x < 0 || y < 0 || x >= c.w || y >= c.h) ? 0 : c.tiles[y * c.w + x];
const tset = (c, x, y, v) => { if (x >= 0 && y >= 0 && x < c.w && y < c.h) c.tiles[y * c.w + x] = v; };
function resizeCourse(c, w) {
  const t = new Uint8Array(w * c.h);
  for (let y = 0; y < c.h; y++) for (let x = 0; x < Math.min(w, c.w); x++) t[y * w + x] = c.tiles[y * c.w + x];
  c.tiles = t; c.w = w;
}

/* Merge solid tiles into smooth outline loops (so wheels never snag on tile seams) */
function buildOutline(c) {
  const E = new Map();
  const add = (ax, ay, bx, by) => {
    const rk = bx + ',' + by + '>' + ax + ',' + ay;
    if (E.has(rk)) { E.delete(rk); return; }
    E.set(ax + ',' + ay + '>' + bx + ',' + by, [ax, ay, bx, by]);
  };
  for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) {
    const s = tShape(c.tiles[y * c.w + x]); if (!s) continue;
    const p = SHAPES[s];
    for (let i = 0; i < p.length; i++) {
      const a = p[i], b = p[(i + 1) % p.length];
      const ax = (x + a[0]) * 2, ay = (y + a[1]) * 2, bx = (x + b[0]) * 2, by = (y + b[1]) * 2;
      if ((ax === bx || ay === by) && Math.abs(bx - ax) + Math.abs(by - ay) === 2) {
        const mx = (ax + bx) / 2, my = (ay + by) / 2; add(ax, ay, mx, my); add(mx, my, bx, by);
      } else add(ax, ay, bx, by);
    }
  }
  const from = new Map();
  for (const e of E.values()) { const k = e[0] + ',' + e[1]; (from.get(k) || from.set(k, []).get(k)).push(e); }
  const loops = [];
  for (const start of E.values()) {
    if (start.used) continue;
    const pts = []; let e = start;
    while (e && !e.used) {
      e.used = true; pts.push([e[0] / 2, e[1] / 2]);
      const outs = from.get(e[2] + ',' + e[3]) || [];
      // prefer the sharpest left turn so touching corners stay separate loops
      let best = null, bestA = -9; const dx = e[2] - e[0], dy = e[3] - e[1];
      for (const o of outs) { if (o.used) continue; const a = Math.atan2(dx * (o[3] - o[1]) - dy * (o[2] - o[0]), dx * (o[2] - o[0]) + dy * (o[3] - o[1])); if (a > bestA) { bestA = a; best = o; } }
      e = best;
    }
    // drop collinear points
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[(i + pts.length - 1) % pts.length], b = pts[i], d = pts[(i + 1) % pts.length];
      if (Math.abs((b[0] - a[0]) * (d[1] - b[1]) - (b[1] - a[1]) * (d[0] - b[0])) > 1e-9) out.push(b);
    }
    if (out.length >= 3) loops.push(out);
  }
  return loops;
}

/* ---------------- Sharing ---------------- */
function packCourse(c) {
  const t = c.tiles, out = [];
  for (let i = 0; i < t.length;) { let j = i; while (j < t.length && t[j] === t[i]) j++; out.push(t[i].toString(36) + (j - i > 1 ? '*' + (j - i).toString(36) : '')); i = j; }
  return { v: 1, id: c.id, name: c.name, kind: c.kind, budget: c.budget, w: c.w, h: c.h, par: c.par, desc: c.desc || '', author: c.author || '', sky: c.sky || '', rules: c.rules || null, objs: c.objs, t: out.join(',') };
}
function unpackCourse(o) {
  if (!o || !o.w || !o.h || o.w > 600 || o.h !== COURSE_H) throw new Error('bad course');
  const c = newCourse(o.w);
  Object.assign(c, { id: o.id || c.id, name: String(o.name || 'Course').slice(0, 40), kind: ['speed', 'strength', 'crazy'].includes(o.kind) ? o.kind : 'crazy', budget: clamp(+o.budget || 1000, 200, 9999), par: o.par || null, desc: String(o.desc || '').slice(0, 200), author: String(o.author || '').slice(0, 30), sky: SKIES.includes(o.sky) ? o.sky : '' });
  if (o.rules && typeof o.rules === 'object') { const r = {}; if (+o.rules.slots > 0) r.slots = clamp(+o.rules.slots | 0, 1, 7); if (+o.rules.energy > 0) r.energy = clamp(+o.rules.energy, 10, 900); if (+o.rules.drain > 0) r.drain = clamp(+o.rules.drain, 0.1, 5); if (o.rules.dark) r.dark = true; if (Object.keys(r).length) c.rules = r; }
  let i = 0;
  for (const run of String(o.t || '').split(',')) { if (!run) continue; const [v, n] = run.split('*'); const val = parseInt(v, 36), cnt = n ? parseInt(n, 36) : 1; for (let k = 0; k < cnt && i < c.tiles.length; k++) c.tiles[i++] = val; }
  c.objs = (o.objs || []).filter(b => b && OBJ[b.t]).slice(0, 400).map(b => { const r = { t: b.t, x: +b.x || 0, y: +b.y || 0 }; if (OBJ[b.t].two) { r.x2 = +b.x2 || 0; r.y2 = +b.y2 || 0; } if (b.txt) r.txt = String(b.txt).slice(0, 30); return r; });
  return c;
}
const courseToCode = c => 'BOT1.' + btoa(unescape(encodeURIComponent(JSON.stringify(packCourse(c))))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
function codeToCourse(code) {
  const m = String(code).trim().match(/BOT1\.([A-Za-z0-9_\-]+)/); if (!m) throw new Error('no code');
  return unpackCourse(JSON.parse(decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))))));
}

const SKIES = ['speed', 'strength', 'crazy', 'night', 'space', 'snow', 'candy', 'desert', 'cave'];
const SKY_NAMES = { speed: 'Blue sky', strength: 'Sunset', crazy: 'Purple dusk', night: 'Night', space: 'Outer space', snow: 'Snowy', candy: 'Candy land', desert: 'Desert', cave: 'Underground' };
/* ---------------- Course objects ---------------- */
const OBJ = {
  start: { name: 'Start', icon: '🟢', one: true, tip: 'Where the bot begins.' },
  finish: { name: 'Finish', icon: '🏁', one: true, tip: 'Reach this flag to win.' },
  checkpoint: { name: 'Checkpoint', icon: '🚩', tip: 'Bots respawn here after a crash.' },
  crate: { name: 'Wood Crate', icon: '📦', tip: 'Light. Easy to push or smash through.' },
  steel: { name: 'Steel Crate', icon: '🗄️', tip: 'Very heavy. Needs real pushing power.' },
  boulder: { name: 'Boulder', icon: '🪨', tip: 'Heavy and it rolls. A drill breaks it.' },
  woodwall: { name: 'Wood Wall', icon: '🪵', tip: '3 m tall. Saw it, burn it, shoot it, or get over it.' },
  iceblock: { name: 'Ice Wall', icon: '🧊', tip: '3 m tall. Melt it with a torch or drill it.' },
  stone: { name: 'Rock', icon: '⛰️', tip: 'A 2 m rock. Only a drill breaks it.' },
  gate: { name: 'Gate', icon: '🚧', tip: 'Stays shut until the nearest switch is hit.' },
  switch: { name: 'Switch', icon: '🔴', air: true, tip: 'Opens the nearest gate when anything hits it: a bot, a pole, a cannonball, a crate.' },
  seesaw: { name: 'Seesaw', icon: '⚖️', tip: 'Tips when you drive across it.' },
  bridge: { name: 'Rope Bridge', icon: '🌉', two: true, tip: 'Click one end, then the other. Sags under heavy bots.' },
  zip: { name: 'Zip Line', icon: '🚡', two: true, air: true, tip: 'Click the start (high end), then the end. Needs a Grapple Hook.' },
  anchor: { name: 'Grapple Point', icon: '📍', air: true, tip: 'Hook on and swing or winch up.' },
  hammer: { name: 'Swinging Hammer', icon: '🔨', air: true, tip: 'Place the pivot up high. Time your run!' },
  spinner: { name: 'Spinner', icon: '✳️', tip: 'A big turning bar.' },
  lift: { name: 'Elevator', icon: '🛗', tip: 'Platform that rises 5 m and comes back.' },
  ferry: { name: 'Moving Platform', icon: '↔️', tip: 'Platform that slides 6 m to the right and back.' },
  boost: { name: 'Boost Pad', icon: '⏩', tip: 'Shoves the bot forward.' },
  spring: { name: 'Spring Pad', icon: '🌀', tip: 'Launches the bot up. Light bots fly higher.' },
  fan: { name: 'Fan', icon: '💨', tip: 'Blows upward. Lifts light bots and gliders.' },
  springboard: { name: 'Springboard', icon: '🤸', tip: 'Flings the bot up and forward about 12 m.' },
  launcher: { name: 'Bot Cannon', icon: '🎪', tip: 'Drive in and get fired about 28 m. Hard landing!' },
  tele: { name: 'Teleporter', icon: '🌀', two: true, air: true, tip: 'Click the way in, then the way out.' },
  convL: { name: 'Conveyor ◀', icon: '⏪', tip: 'A 6 m belt that drags the bot backward.' },
  convR: { name: 'Conveyor ▶', icon: '⏩', tip: 'A 6 m belt that carries the bot forward.' },
  blower: { name: 'Giant Propeller', icon: '🌬️', tip: 'Blows a hard wind to the left for 10 m.' },
  moon: { name: 'Low Gravity', icon: '🌙', tip: 'A 12 m wide zone where everything floats.' },
  laser: { name: 'Laser', icon: '🚨', tip: 'Blinks on and off. Burns when it is on.' },
  dropper: { name: 'Boulder Dropper', icon: '☄️', air: true, tip: 'Drops a new boulder every few seconds.' },
  tnt: { name: 'TNT', icon: '🧨', tip: 'Explodes when shot, cut or smashed. Blows up walls and rock nearby.' },
  glass: { name: 'Glass Wall', icon: '🪟', tip: 'Shatters if hit fast enough. Stops slow bots.' },
  plate: { name: 'Weight Plate', icon: '⚖️', tip: 'Opens the nearest gate when 120 kg or more sits on it.' },
  ballpit: { name: 'Ball Pit', icon: '🎱', tip: 'A pile of bouncy balls.' },
  repair: { name: 'Repair Station', icon: '🔧', tip: 'Fixes damage while the bot is parked on it.' },
  charger: { name: 'Charger', icon: '🔌', tip: 'Recharges the battery while the bot is parked on it.' },
  pit: { name: 'Pit Stop', icon: '🛠️', tip: 'Park here and press Enter to swap gadgets in the middle of a course.' },
  sign: { name: 'Sign', icon: '🪧', text: true, tip: 'A sign with your own words on it.' },
};

/* ---------------- Built-in courses ---------------- */
function CB(id, name, kind, budget, desc, medals) {
  const c = newCourse(600); Object.assign(c, { id, name, kind, budget, desc, medals, builtin: true, needs: {}, test: [] });
  let x = 0, h = 10, mat = 0;
  const col = (top, cap) => { for (let y = 0; y < top; y++) tset(c, x, y, tcode(1, y >= top - 3 ? mat : 0)); if (cap) tset(c, x, top, tcode(cap, mat)); x++; };
  const rep = (n, f) => { for (let i = 0; i < n; i++) f(); return api; };
  const api = {
    mat(m) { mat = m; return api; },
    flat: (n = 1) => rep(n, () => col(h)),
    up: (n = 1) => rep(n, () => { col(h, 2); h++; }),
    down: (n = 1) => rep(n, () => { h--; col(h, 3); }),
    gup: (n = 1) => rep(n, () => { col(h, 4); col(h, 5); h++; }),
    gdown: (n = 1) => rep(n, () => { h--; col(h, 6); col(h, 7); }),
    bump: (n = 1) => rep(n, () => col(h, 8)),
    step(d) { h += d; return api; },
    // gap(n): bottomless. gap(n, LAVA, depth, level): pit `depth` deep with `level` tiles of liquid on its floor
    gap: (n, fill = 0, depth = 3, level = depth) => rep(n, () => { if (fill) { const fl = Math.max(1, h - depth); for (let y = 0; y < fl; y++) tset(c, x, y, tcode(1, 0)); for (let y = fl; y < fl + level; y++) tset(c, x, y, fill); } x++; }),
    // a pool you can drive into and out of: gentle ramps at both ends
    pool(n, depth) {
      const h0 = h, wet = () => { for (let y = h + 1; y < h0; y++) tset(c, x - 1, y, WATER); };
      for (let i = 0; i < depth; i++) { h--; col(h, 6); wet(); col(h, 7); wet(); }
      for (let i = 0; i < n; i++) { col(h); tset(c, x - 1, h, WATER); wet(); }
      for (let i = 0; i < depth; i++) { col(h, 4); wet(); col(h, 5); wet(); h++; }
      return api;
    },
    o(t, dx = 0, dy = 0, ex) { c.objs.push(Object.assign({ t, x: x + dx, y: h + dy }, Array.isArray(ex) ? { x2: x + ex[0], y2: h + ex[1] } : ex)); return api; },
    setH(v) { h = v; return api; }, get x() { return x; }, get h() { return h; }, c,
    need(...n) { n.forEach(k => c.needs[k] = 1); return api; },
    z(a, b2, keys) { c.test.push([x + a, x + b2, keys]); return api; },   // test-drive script for the course checker
    done() { resizeCourse(c, x); return c; },
  };
  return api;
}

function builtinCourses() {
  const L = [];
  L.push(CB('b_test', 'Test Track', 'speed', 600, 'Your first drive. Learn the controls and see how your bot handles.', [8.5, 13])
    .flat(4).o('start').flat(14).gup(2).flat(6).gdown(2).flat(16).gup(1).flat(5).gdown(1).flat(10).o('finish').flat(6).done());

  L.push(CB('b_drag', 'Drag Strip', 'speed', 750, 'A long straight shot.', [11.5, 15])
    .flat(4).o('start').flat(30).o('boost').flat(40).gup(2).flat(4).gdown(2).flat(30).o('boost').flat(36).o('finish').flat(8).done());

  L.push(CB('b_thunder', 'Rolling Thunder', 'speed', 950, 'Hills and jumps.', [18, 26])
    .flat(4).o('start').flat(16).gup(3).flat(3).gdown(3).flat(8).gup(2).gap(4).flat(10).o('checkpoint', -6).gdown(2).flat(10)
    .gup(3).flat(2).gdown(2).flat(6).gup(2).gap(4).flat(12).o('checkpoint', -8).flat(14).gdown(3).flat(14).gup(2).gap(4).flat(12).o('finish', -4).flat(6).done());

  L.push(CB('b_ice', 'Ice Sprint', 'speed', 1000, 'A frozen track with icy hills.', [14, 22])
    .flat(4).o('start').flat(10).mat(ICE).flat(16).gup(2).flat(6).gdown(2).flat(10).mat(DIRT).flat(6).o('checkpoint', -3)
    .mat(ICE).gup(4).flat(6).gdown(1).flat(8).gup(2).flat(3).mat(DIRT).flat(5).o('checkpoint', -2).mat(ICE).gdown(5).flat(16).gup(3).mat(DIRT).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_hill', 'Hill Climb', 'strength', 800, 'Each hill is steeper than the last.', [21, 32])
    .flat(4).o('start').flat(12).gup(4).flat(8).o('checkpoint', -4).up(3).flat(8).o('checkpoint', -4).gup(2).up(6).flat(8).o('checkpoint', -4).down(2).flat(6).up(9).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_shove', 'Warehouse Shove', 'strength', 1100, 'Crates block the way to a moving platform.', [38, 60])
    .flat(4).o('start').flat(12).o('crate', 0).o('crate', 0, 1).o('crate', 0, 2).o('crate', 1).o('crate', 1, 1).flat(14).o('checkpoint', -4)
    .o('steel', 2).flat(12).o('ferry', 2, 0).gap(10).flat(8).o('checkpoint', -6).mat(MUD).flat(14).mat(DIRT).flat(8).gdown(2).flat(6).up(4).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_mud', 'Mud Mountain', 'strength', 1300, 'Deep mud, tall ledges and a long steep climb.', [18, 32])
    .flat(4).o('start').flat(8).mat(MUD).flat(12).gup(3).flat(6).mat(DIRT).flat(8).o('checkpoint', -5).bump(3).step(1).flat(8).bump(3).step(1).flat(6).o('checkpoint', -3).flat(8).gup(3).flat(4).gdown(1).mat(MUD).flat(10).gup(3).mat(DIRT).flat(3).up(5).flat(10).o('finish', -4).flat(6).done());

  L.push(CB('b_zip', 'Zip & Dip', 'crazy', 1000, 'A lava canyon with a zip line across it.', [18, 28])
    .flat(4).o('start').flat(12).gup(3).flat(6).o('checkpoint', -3).o('zip', -1, 5.5, [21, 1.5]).gap(18, LAVA, 8, 2).step(-3).flat(12).o('checkpoint', -8)
    .gup(1).flat(4).o('anchor', 3.5, 7).gap(7, LAVA, 6, 2).flat(10).o('checkpoint', -7).o('spring', 3).flat(5).step(3).flat(8).o('checkpoint', -5)
    .o('zip', -2, 5, [18, -3]).gap(14).step(-6).flat(14).o('finish', -6).flat(6).done());

  L.push(CB('b_hammer', 'Hammer Time', 'crazy', 1200, 'Swinging hammers, a spinner, a seesaw, an elevator and a wobbly bridge.', [26, 42])
    .flat(4).o('start').flat(10).o('hammer', 4, 5.5).flat(12).o('hammer', 2, 5.5).flat(10).o('checkpoint', -3).o('seesaw', 5).flat(12).o('spinner', 4)
    .flat(10).o('checkpoint', -2).flat(4).o('lift', 2, 0).gap(4).step(5).flat(10).o('checkpoint', -8).o('bridge', 0, 0, [10, 0]).gap(10).flat(8)
    .o('hammer', 3, 5.5).flat(8).gdown(3).flat(10).o('boost', -1.5).gup(2).gap(5, LAVA, 5, 2).flat(12).o('finish', -6).flat(6).done());

  L.push(CB('b_gauntlet', 'The Gauntlet', 'crazy', 1600, 'A bit of everything, and more than one way through.', [30, 50])
    .flat(4).o('start').flat(10).o('zip', -1, 6, [27, 2.5]).pool(12, 3).flat(8).o('checkpoint', -5).mat(ICE).gup(3).flat(4).mat(DIRT).flat(3)
    .o('checkpoint', -2).gup(2).o('fan', 3, -2).o('anchor', 3, 7.5).gap(6).flat(10).o('checkpoint', -6)
    .flat(10).o('spring', 3).flat(5).step(3).flat(6).o('hammer', 4, 5.5).flat(10).o('checkpoint', -2).mat(MUD).gdown(2).flat(6).mat(DIRT).up(3)
    .flat(4).o('bridge', 0, 0, [8, 0]).gap(8, WATER, 5, 2).flat(6).up(2).flat(5).o('crate', 0).o('crate', 0, 1).o('crate', 1).o('crate', 1, 1).o('crate', 0.5, 2).flat(8).o('finish', -3).flat(6).done());

  L.push(CB('b_demo', 'Demolition Day', 'strength', 1300, 'Wood walls, ice walls and solid rock.', [20, 34])
    .flat(4).o('start').flat(12).o('woodwall', 0).flat(10).o('crate', 0).o('crate', 0, 1).o('crate', 1).o('crate', 1, 1).o('crate', 0, 2).o('crate', 1, 2).flat(10).o('checkpoint', -3)
    .o('iceblock', 2).flat(12).o('checkpoint', -3).gup(2).flat(4).o('stone', 2).flat(10).o('checkpoint', -3).o('woodwall', 2).o('woodwall', 3).o('woodwall', 4).flat(12).up(3).flat(8).o('finish', -3).flat(6).done());

  L.push(CB('b_switch', 'Switch Yard', 'crazy', 1300, 'Gates block the track. Each one has a switch somewhere.', [15, 26])
    .flat(4).o('start').flat(14).o('switch', 2, 1.2).o('gate', 6).flat(14).o('checkpoint', -4).o('woodwall', 3).o('switch', 5, 1.2).o('gate', 9).flat(18).o('checkpoint', -4)
    .gup(2).gap(4, LAVA, 5, 2).flat(10).o('checkpoint', -6).flat(4).gup(2).o('switch', 5, 3.8).flat(10).o('gate', 0).flat(12).o('finish', -3).flat(6).done());
  return L.concat(moreLevels());
}

/* What is out on the course. It says what is there, never what to buy: that is the builder's job */
function analyzeCourse(c) {
  const f = {}, n = {};
  for (let i = 0; i < c.tiles.length; i++) {
    const t = c.tiles[i]; if (!t) continue;
    if (t === WATER) f.water = 1; else if (t === LAVA) f.lava = 1;
    else { const s = tShape(t), m = tMat(t); if (s === 2) f.steep = 1; if (s === 8) f.slab = 1; if (m === ICE) f.ice = 1; if (m === MUD) f.mud = 1; if (m === RUBBER) f.rubber = 1; if (m === SAND) f.sand = 1; }
  }
  for (const o of c.objs) n[o.t] = (n[o.t] || 0) + 1;
  const top = []; for (let x = 0; x < c.w; x++) { let y = c.h - 1; while (y >= 0 && !tShape(tget(c, x, y))) y--; top.push(y + 1); }
  let gap = 0, run = 0, wall = 0, drop = 0, last = top[0] || 0;
  for (let x = 1; x < c.w; x++) {
    if (top[x] < last - 2 && !(top[x] > 0 && top[x + 1] === top[x] && top[x + 2] === top[x] && top[x + 3] === top[x])) { run++; gap = Math.max(gap, run); }
    else { if (!run && top[x] > last && tShape(tget(c, x, top[x] - 1)) === 1 && tShape(tget(c, x, last)) === 1) wall = Math.max(wall, top[x] - last); if (top[x] < last - 2) drop = Math.max(drop, last - top[x]); run = 0; last = top[x]; }
  }
  const out = [], add = (ok, icon, label) => { if (ok) out.push([icon, label]); };
  add(f.steep, '⛰️', 'Steep 45° climbs'); add(wall, '🧗', `Walls up to ${wall} m`); add(drop, '🪂', `Drops up to ${drop} m`); add(f.slab, '🪜', 'Half-meter ledges'); add(gap, '🕳️', `Gaps up to ${gap} m`);
  add(f.ice, '🧊', 'Ice'); add(f.mud, '🟤', 'Mud'); add(f.sand, '🏖️', 'Soft sand'); add(f.rubber, '🩷', 'Bouncy rubber'); add(f.water, '🌊', 'Water'); add(f.lava, '🌋', 'Lava');
  const names = { zip: 'Zip lines', anchor: 'Grapple points', steel: 'Steel crates', boulder: 'Boulders', crate: 'Wood crates', woodwall: 'Wood walls', iceblock: 'Ice walls', stone: 'Rocks', gate: 'Gates and switches', hammer: 'Swinging hammers', spinner: 'Spinners', bridge: 'Rope bridges', seesaw: 'Seesaws', lift: 'Elevators', ferry: 'Moving platforms', spring: 'Spring pads', fan: 'Fans', boost: 'Boost pads', springboard: 'Springboards', launcher: 'Bot cannons', tele: 'Teleporters', convL: 'Conveyor belts', convR: 'Conveyor belts', blower: 'Giant propellers', moon: 'Low gravity', laser: 'Lasers', dropper: 'Falling boulders', tnt: 'TNT', glass: 'Glass walls', plate: 'Weight plates', ballpit: 'Ball pits', repair: 'Repair stations', charger: 'Chargers', pit: 'Pit stops' };
  const seen = {};
  for (const k in names) if (n[k] && !seen[names[k]]) { seen[names[k]] = 1; out.push([OBJ[k].icon, names[k]]); }
  if (!out.length) out.push(['🛣️', 'Open road']);
  return out;
}

/* ---------------- Storage ---------------- */
/* Each player's bot, medals, notebook and courses are saved under their own name */
const USER_KEYS = ['bot', 'best', 'log', 'courses'];
const Store = {
  user: null,
  key(k, user = Store.user) { return 'botshop.' + (user && USER_KEYS.includes(k) ? 'u.' + user + '.' : '') + k; },
  get(k, d, user) { try { const v = localStorage.getItem(Store.key(k, user)); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v, user) { try { localStorage.setItem(Store.key(k, user), JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k, user) { try { localStorage.removeItem(Store.key(k, user)); } catch (e) { } },
};
/* ---------------- Players ----------------
   Passwords are scrambled before saving, never stored as typed. This keeps classmates out of each
   other's saves; it is not bank-grade security, because everything lives on this one computer. */
function scramble(str) {
  let a = 0xdeadbeef ^ str.length, b = 0x41c6ce57 ^ str.length;
  for (let r = 0; r < 600; r++) for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i) + r; a = Math.imul(a ^ c, 2654435761); b = Math.imul(b ^ c, 1597334677);
    a = Math.imul(a ^ (a >>> 16), 2246822507) ^ Math.imul(b ^ (b >>> 13), 3266489909); b = Math.imul(b ^ (b >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909);
  }
  return (b >>> 0).toString(16).padStart(8, '0') + (a >>> 0).toString(16).padStart(8, '0');
}
const TEACHER_HASH = '2bce514a6dffff96';
const isTeacherPw = pw => scramble('teacher|' + String(pw).trim()) === TEACHER_HASH;
const Players = {
  all() { return Store.get('players', {}); },
  id: name => String(name).trim().toLowerCase().replace(/\s+/g, ' '),
  list() { const a = Players.all(); return Object.keys(a).map(id => Object.assign({ id }, a[id])).sort((x, y) => x.name.localeCompare(y.name)); },
  check(name, pw) { const p = Players.all()[Players.id(name)]; return !!p && p.hash === scramble(p.salt + '|' + pw); },
  // returns an error message, or '' when the player was made
  create(name, pw) {
    name = String(name).trim().replace(/\s+/g, ' '); const id = Players.id(name), a = Players.all();
    if (!/^[A-Za-z0-9 _-]{2,16}$/.test(name)) return 'Names are 2 to 16 letters or numbers.';
    if (a[id]) return 'Someone already has that name. Pick another.';
    if (String(pw).length < 3) return 'Passwords need at least 3 characters.';
    const first = !Object.keys(a).length, salt = Math.random().toString(36).slice(2, 10);
    a[id] = { name, salt, hash: scramble(salt + '|' + pw), made: Date.now() };
    if (!Store.set('players', a)) return 'This computer would not save the new player.';
    if (first) for (const k of USER_KEYS) { const old = Store.get(k, null, null); if (old != null) { Store.set(k, old, id); Store.del(k, null); } }   // saves from before sign-in existed go to the first player
    return '';
  },
  setPassword(id, pw) { const a = Players.all(); if (!a[id] || String(pw).length < 3) return false; a[id].salt = Math.random().toString(36).slice(2, 10); a[id].hash = scramble(a[id].salt + '|' + pw); return Store.set('players', a); },
  remove(id) { const a = Players.all(); delete a[id]; Store.set('players', a); for (const k of USER_KEYS) Store.del(k, id); },
  beaten: id => Object.keys(Store.get('best', {}, id)).length,
};
function loadMyCourses() { return Store.get('courses', []).map(o => { try { return unpackCourse(o); } catch (e) { return null; } }).filter(Boolean); }
function saveMyCourse(c) { const all = Store.get('courses', []); const i = all.findIndex(o => o.id === c.id); const p = packCourse(c); if (i >= 0) all[i] = p; else all.push(p); Store.set('courses', all); }
function deleteMyCourse(id) { Store.set('courses', Store.get('courses', []).filter(o => o.id !== id)); }
function medalFor(c, time) {
  let g, s;
  if (c.medals) [g, s] = c.medals; else if (c.par) { g = c.par * 1.1; s = c.par * 1.5; } else return 'finish';
  return time <= g ? 'gold' : time <= s ? 'silver' : 'bronze';
}
const MEDAL_ICON = { gold: '🥇', silver: '🥈', bronze: '🥉', finish: '✅' };
