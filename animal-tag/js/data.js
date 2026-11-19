// Wild Tag: all the game content lives here. Edit freely.
// Stats: spd = run speed, jmp = jump power, size = body scale, climb = wall-jump power.
// Ability: id is the effect (see ABILITY_FX in game.js), cd = cooldown seconds, dur = effect seconds.

const ANIMALS = [
  // ---- free starters ----
  { id:'gorilla', name:'Gorilla', emoji:'🦍', price:0, spd:9, jmp:10, size:1.15, climb:1.4, shape:'ape',
    c1:'#3d3a3e', c2:'#c8956a', parts:['ears_round','arms_long'],
    ab:{ id:'roar', name:'Chest Pound', cd:12, dur:1.6, r:8, desc:'Pound your chest: stuns everyone close to you.' } },
  { id:'monkey', name:'Monkey', emoji:'🐒', price:0, spd:9.5, jmp:11, size:0.9, climb:1.8, shape:'ape',
    c1:'#8a5a2b', c2:'#e8c79a', parts:['ears_round','tail_curly','arms_long'],
    ab:{ id:'climb', name:'Vine Climber', cd:10, dur:4, desc:'Run straight up walls and trees for a few seconds.' } },
  { id:'rabbit', name:'Rabbit', emoji:'🐇', price:0, spd:10, jmp:12, size:0.75, climb:1.0, shape:'quad',
    c1:'#d9d4cc', c2:'#ffb8c8', parts:['ears_long','tail_puff','snout_small'],
    ab:{ id:'burrow', name:'Burrow', cd:14, dur:3, desc:'Dig underground: nobody can tag you while hidden.' } },
  { id:'frog', name:'Frog', emoji:'🐸', price:0, spd:8.5, jmp:13, size:0.75, climb:1.0, shape:'blob',
    c1:'#3fae4a', c2:'#c8f27a', parts:['eyes_top'],
    ab:{ id:'tongue', name:'Tongue Grab', cd:10, r:14, desc:'Snap your tongue and yank the closest animal toward you.' } },
  { id:'penguin', name:'Penguin', emoji:'🐧', price:0, spd:8.5, jmp:9, size:0.85, climb:0.9, shape:'bird',
    c1:'#1f2430', c2:'#f4f4f4', parts:['beak','flippers'],
    ab:{ id:'slide', name:'Belly Slide', cd:7, dur:1.4, desc:'Flop down and zoom across the ground.' } },
  { id:'fox', name:'Fox', emoji:'🦊', price:0, spd:10, jmp:10, size:0.9, climb:1.1, shape:'quad',
    c1:'#e0702a', c2:'#fff3e6', parts:['ears_pointy','tail_fluffy','snout_long'],
    ab:{ id:'decoy', name:'Trick Twin', cd:14, dur:5, desc:'Drop a fake fox that runs off and fools taggers.' } },

  // ---- unlock with gems ----
  { id:'cheetah', name:'Cheetah', emoji:'🐆', price:200, spd:11, jmp:10, size:0.95, climb:1.0, shape:'quad',
    c1:'#e8b64a', c2:'#3a2a10', parts:['ears_round','tail_long','snout_small'], defPattern:'spots',
    ab:{ id:'sprint', name:'Turbo Sprint', cd:11, dur:2.5, desc:'The fastest burst of speed in the wild.' } },
  { id:'kangaroo', name:'Kangaroo', emoji:'🦘', price:200, spd:9.5, jmp:12, size:1.05, climb:1.2, shape:'biped',
    c1:'#b07a48', c2:'#e9cfae', parts:['ears_pointy','tail_thick','snout_long'],
    ab:{ id:'superjump', name:'Mega Hop', cd:6, desc:'Jump higher than anybody.' } },
  { id:'octopus', name:'Octopus', emoji:'🐙', price:250, spd:9, jmp:10, size:0.9, climb:1.6, shape:'blob',
    c1:'#d24a7a', c2:'#ffb0cf', parts:['tentacles'],
    ab:{ id:'ink', name:'Ink Cloud', cd:13, dur:5, r:7, desc:'Squirt a cloud of ink. Anyone inside is blinded and lost.' } },
  { id:'chameleon', name:'Chameleon', emoji:'🦎', price:300, spd:9, jmp:10, size:0.8, climb:1.5, shape:'quad',
    c1:'#5cbf3a', c2:'#f2d23a', parts:['tail_curly','eyes_top'],
    ab:{ id:'invis', name:'Camouflage', cd:16, dur:5, desc:'Turn nearly invisible. Bots cannot see you.' } },
  { id:'rhino', name:'Rhino', emoji:'🦏', price:300, spd:9, jmp:9, size:1.25, climb:0.9, shape:'quad',
    c1:'#8b8f96', c2:'#c4c7cc', parts:['ears_round','horn','tail_short'],
    ab:{ id:'charge', name:'Charge', cd:10, dur:0.9, r:3, desc:'Smash forward and knock everyone in the way flying.' } },
  { id:'squirrel', name:'Flying Squirrel', emoji:'🐿️', price:250, spd:9.5, jmp:11, size:0.7, climb:1.6, shape:'quad',
    c1:'#8d6e55', c2:'#efe1cf', parts:['ears_round','tail_fluffy','gliders'],
    ab:{ id:'glide', name:'Glide', cd:8, dur:5, desc:'Spread out and float through the air. Great off high places.' } },
  { id:'spider', name:'Spider', emoji:'🕷️', price:350, spd:9.5, jmp:10, size:0.8, climb:2.2, shape:'spider',
    c1:'#2a2230', c2:'#c33a3a', parts:['legs8'],
    ab:{ id:'web', name:'Web Trap', cd:9, dur:8, r:3.5, desc:'Leave a sticky web. Anyone who steps in gets stuck slow.' } },
  { id:'turtle', name:'Turtle', emoji:'🐢', price:300, spd:8, jmp:9, size:0.95, climb:0.9, shape:'quad',
    c1:'#5f8f3e', c2:'#7a5a2b', parts:['shell','snout_small','tail_short'],
    ab:{ id:'shield', name:'Shell Shield', cd:15, dur:3.5, desc:'Hide in your shell: you cannot be tagged.' } },
  { id:'bat', name:'Bat', emoji:'🦇', price:400, spd:9.5, jmp:10, size:0.75, climb:1.3, shape:'bird',
    c1:'#3b3046', c2:'#8a6fa0', parts:['ears_pointy','wings_bat'],
    ab:{ id:'blink', name:'Echo Blink', cd:9, r:13, desc:'Zip forward in a blink, even through things.' } },
  { id:'mouse', name:'Mouse', emoji:'🐭', price:200, spd:10.5, jmp:10, size:0.6, climb:1.2, shape:'quad',
    c1:'#a8a3a0', c2:'#ffb6c6', parts:['ears_big','tail_long','snout_small'],
    ab:{ id:'shrink', name:'Tiny Mode', cd:13, dur:5, desc:'Shrink super small and quick. Hard to catch!' } },
  { id:'tiger', name:'Tiger', emoji:'🐅', price:450, spd:10, jmp:10.5, size:1.1, climb:1.2, shape:'quad',
    c1:'#ec8a24', c2:'#1d1208', parts:['ears_round','tail_long','snout_small'], defPattern:'stripes',
    ab:{ id:'pounce', name:'Pounce', cd:8, r:16, desc:'Leap straight at the nearest animal.' } },
  { id:'eagle', name:'Eagle', emoji:'🦅', price:500, spd:9.5, jmp:10, size:0.9, climb:1.1, shape:'bird',
    c1:'#5a3a22', c2:'#ffffff', parts:['beak','wings_bird'],
    ab:{ id:'fly', name:'Soar', cd:14, dur:3.5, desc:'Take off and fly. Hold Jump to go up, Crouch (C) to go down.' } },
  { id:'elephant', name:'Elephant', emoji:'🐘', price:500, spd:8.5, jmp:9, size:1.4, climb:0.9, shape:'quad',
    c1:'#8f96a3', c2:'#d8c8b8', parts:['ears_huge','trunk','tail_short'],
    ab:{ id:'roar', name:'Trumpet Stomp', cd:14, dur:2, r:12, desc:'Stomp and trumpet: stuns everyone in a big circle.' } },
  { id:'sloth', name:'Sloth', emoji:'🦥', price:350, spd:8, jmp:9.5, size:0.95, climb:2.0, shape:'ape',
    c1:'#8a7a62', c2:'#d8cbb2', parts:['arms_long'],
    ab:{ id:'slowzone', name:'Sleepy Zone', cd:14, dur:5, r:9, desc:'Everybody near you gets s-l-o-w and yawny.' } },
  { id:'skunk', name:'Skunk', emoji:'🦨', price:300, spd:9.5, jmp:10, size:0.8, climb:1.0, shape:'quad',
    c1:'#1d1d22', c2:'#f5f5f5', parts:['ears_round','tail_fluffy','snout_small'], defPattern:'stripe1',
    ab:{ id:'stink', name:'Stink Bomb', cd:12, dur:4, r:7, desc:'A smelly cloud that pushes everyone away from you.' } },
  { id:'hedgehog', name:'Hedgehog', emoji:'🦔', price:350, spd:9, jmp:9.5, size:0.7, climb:1.0, shape:'quad',
    c1:'#6e5640', c2:'#f0d9bd', parts:['spikes','snout_small'],
    ab:{ id:'spikeball', name:'Spike Ball', cd:13, dur:2.5, desc:'Curl up and roll fast. Taggers who touch you bounce off.' } },
];

// Mythical creatures: cost gems AND need a goal reached first.
const MYTHICS = [
  { id:'dragon', name:'Dragon', emoji:'🐉', price:2500, need:{wins:10}, spd:10.5, jmp:11, size:1.3, climb:1.4, shape:'quad', glow:'#ff5a1f',
    c1:'#2f9a4c', c2:'#eedba6', parts:['horns','wings_bat','tail_long','spikes_back','snout_long'],
    ab:{ id:'firetrail', name:'Fire Dash', cd:10, dur:1.2, r:3, desc:'Blast forward leaving flames that stun anyone who touches them.' } },
  { id:'phoenix', name:'Phoenix', emoji:'🔥', price:2500, need:{rounds:25}, spd:10, jmp:11, size:0.95, climb:1.2, shape:'bird', glow:'#ffb020',
    c1:'#ff5a1f', c2:'#ffd23f', parts:['beak','wings_bird','crest','flames'],
    ab:{ id:'fly', name:'Blaze Flight', cd:11, dur:5, desc:'Fly on wings of fire for a long time.' } },
  { id:'unicorn', name:'Unicorn', emoji:'🦄', price:2000, need:{wins:5}, spd:11, jmp:10.5, size:1.15, climb:1.1, shape:'quad', glow:'#ff8ff0',
    c1:'#ffffff', c2:'#c48aff', parts:['horn_spiral','mane','tail_fluffy','ears_pointy','snout_long'], defPattern:'rainbow',
    ab:{ id:'blink', name:'Rainbow Warp', cd:7, r:22, desc:'Teleport a long way forward on a rainbow.' } },
  { id:'griffin', name:'Griffin', emoji:'🦅', price:3000, need:{tags:60}, spd:10.5, jmp:11.5, size:1.2, climb:1.3, shape:'quad', glow:'#ffe08a',
    c1:'#d8a24a', c2:'#ffffff', parts:['beak','wings_bird','tail_long'],
    ab:{ id:'divebomb', name:'Dive Bomb', cd:9, r:24, desc:'Rocket into the sky, then slam down on the nearest animal.' } },
  { id:'kraken', name:'Kraken', emoji:'🦑', price:3000, need:{tags:80}, spd:9.5, jmp:10.5, size:1.3, climb:2.0, shape:'blob', glow:'#3ad6ff',
    c1:'#2a5ab0', c2:'#7ff0ff', parts:['tentacles','eyes_top'],
    ab:{ id:'megatongue', name:'Kraken Grab', cd:10, r:26, desc:'Grab EVERYONE nearby with giant tentacles and pull them in.' } },
  { id:'yeti', name:'Yeti', emoji:'❄️', price:3500, need:{wins:20}, spd:9.5, jmp:10.5, size:1.4, climb:1.5, shape:'ape', glow:'#bfefff',
    c1:'#f2f7ff', c2:'#7ab8ff', parts:['ears_round','arms_long','horns'],
    ab:{ id:'freeze', name:'Blizzard', cd:16, dur:2.5, r:16, desc:'Freeze everyone around you solid.' } },
  { id:'pegasus', name:'Pegasus', emoji:'🪽', price:3500, need:{rounds:50}, spd:11, jmp:11, size:1.15, climb:1.1, shape:'quad', glow:'#e8f4ff',
    c1:'#f5f7ff', c2:'#9ad0ff', parts:['wings_bird','mane','tail_fluffy','ears_pointy','snout_long'],
    ab:{ id:'fly', name:'Sky Gallop', cd:9, dur:6, desc:'Gallop through the sky. Longest flight of all.' } },
  { id:'kitsune', name:'Kitsune', emoji:'🦊', price:4000, need:{wins:30}, spd:11, jmp:11, size:1.0, climb:1.4, shape:'quad', glow:'#9a6bff',
    c1:'#f7f0ff', c2:'#9a6bff', parts:['ears_pointy','tails9','snout_long'],
    ab:{ id:'foxfire', name:'Foxfire Clones', cd:15, dur:5, desc:'Turn invisible and send out three ghost clones.' } },
  { id:'thunderbird', name:'Thunderbird', emoji:'⚡', price:5000, need:{tags:200}, spd:10.5, jmp:11, size:1.2, climb:1.2, shape:'bird', glow:'#fff35a',
    c1:'#2b3a8f', c2:'#ffe94a', parts:['beak','wings_bird','crest'],
    ab:{ id:'thunder', name:'Thunder Strike', cd:15, dur:2, r:22, desc:'Lightning stuns every animal in a huge circle.' } },
  { id:'sphinx', name:'Sphinx', emoji:'🦁', price:6000, need:{wins:50}, spd:10.5, jmp:11, size:1.2, climb:1.3, shape:'quad', glow:'#ffd27a',
    c1:'#d9b26a', c2:'#3a7bd5', parts:['ears_round','mane','wings_bird','tail_long','snout_small'],
    ab:{ id:'timewarp', name:'Time Warp', cd:18, dur:4, desc:'Slow down time for everyone but you.' } },
];

const ALL_CREATURES = ANIMALS.concat(MYTHICS);
const CREATURE = {}; ALL_CREATURES.forEach(a => { CREATURE[a.id] = a; a.mythic = MYTHICS.includes(a); });

// Patterns are drawn on the body using your two colors.
const PATTERNS = [
  { id:'solid', name:'Solid', price:0 },
  { id:'stripe1', name:'Racing Stripe', price:0 },
  { id:'spots', name:'Spots', price:80 },
  { id:'stripes', name:'Tiger Stripes', price:80 },
  { id:'polka', name:'Polka Dots', price:100 },
  { id:'checker', name:'Checkers', price:120 },
  { id:'zigzag', name:'Zigzag', price:120 },
  { id:'hearts', name:'Hearts', price:150 },
  { id:'stars', name:'Stars', price:150 },
  { id:'camo', name:'Camo', price:180 },
  { id:'swirl', name:'Swirl', price:200 },
  { id:'lava', name:'Lava', price:300, glow:true },
  { id:'ice', name:'Ice Crystal', price:300 },
  { id:'galaxy', name:'Galaxy', price:450, glow:true },
  { id:'rainbow', name:'Rainbow', price:500 },
  { id:'gold', name:'Solid Gold', price:800, metal:true },
  { id:'neon', name:'Neon Grid', price:600, glow:true },
  { id:'diamond', name:'Diamond', price:1200, metal:true },
];
const PATTERN = {}; PATTERNS.forEach(p => PATTERN[p.id] = p);

// Bonus abilities ("perks") you can buy and equip on top of any animal. Equip up to 2.
const PERKS = [
  { id:'doublejump', name:'Double Jump', emoji:'🦘', price:300, desc:'Jump one more time in mid-air.' },
  { id:'longarms', name:'Long Arms', emoji:'🙌', price:350, desc:'Tag from farther away.' },
  { id:'quickcharge', name:'Quick Charge', emoji:'⚡', price:400, desc:'Your animal ability recharges 30% faster.' },
  { id:'speedpaws', name:'Speed Paws', emoji:'👟', price:450, desc:'Run 8% faster all the time.' },
  { id:'featherfall', name:'Feather Fall', emoji:'🪶', price:250, desc:'Fall slower so you can steer in the air.' },
  { id:'walljumper', name:'Wall Jumper', emoji:'🧗', price:300, desc:'Push off walls much harder.' },
  { id:'gemmagnet', name:'Gem Magnet', emoji:'💎', price:500, desc:'Earn 50% more gems every round.' },
  { id:'secondwind', name:'Second Wind', emoji:'💨', price:600, desc:'The first time you would be tagged each round, you dodge it.' },
];
const PERK = {}; PERKS.forEach(p => PERK[p.id] = p);

const COLORS = ['#3a3a3f','#ffffff','#e0702a','#ec8a24','#e8b64a','#ffd23f','#3fae4a','#5cbf3a','#2f8f4a','#2ee6d0',
  '#3ad6ff','#3a7bd5','#2a5ab0','#9a6bff','#c48aff','#ff8ff0','#ff4fa3','#d24a7a','#c33a3a','#8a5a2b','#6e5640','#1d1d22'];

const MODES = {
  infection: { name:'Infection', time:150, desc:'One animal starts IT. Anyone tagged turns IT too. Survive to the end, or catch everyone!' },
  classic:   { name:'Classic Tag', time:120, desc:'One animal is IT. Tag someone to pass it on. Whoever is IT when time runs out loses.' },
  freeze:    { name:'Freeze Tag', time:150, desc:'Taggers freeze runners. Runners unfreeze friends by touching them. Freeze everyone to win!' },
};

const REWARDS = { play:10, win:40, tag:8, surviveBonus:30, daily:100 };

const BOT_NAMES = ['Zippy','Mango','Pebble','Biscuit','Nova','Rocket','Sprout','Pickles','Luna','Boomer','Tofu','Comet',
  'Waffles','Pixel','Noodle','Ziggy','Maple','Bean','Echo','Fuzzy','Jinx','Sunny','Rascal','Pudding'];

// Wearables: one per slot (hat, face, neck, back). They fit every animal.
const WEARABLES = [
  // hats
  { id:'cap', slot:'hat', name:'Ball Cap', emoji:'🧢', price:60 },
  { id:'beanie', slot:'hat', name:'Beanie', emoji:'🧶', price:60 },
  { id:'tophat', slot:'hat', name:'Top Hat', emoji:'🎩', price:150 },
  { id:'cowboy', slot:'hat', name:'Cowboy Hat', emoji:'🤠', price:150 },
  { id:'party', slot:'hat', name:'Party Hat', emoji:'🥳', price:80 },
  { id:'crown', slot:'hat', name:'Crown', emoji:'👑', price:600 },
  { id:'wizard', slot:'hat', name:'Wizard Hat', emoji:'🧙', price:300 },
  { id:'pirate', slot:'hat', name:'Pirate Hat', emoji:'🏴‍☠️', price:250 },
  { id:'propeller', slot:'hat', name:'Propeller Cap', emoji:'🚁', price:200 },
  { id:'chef', slot:'hat', name:'Chef Hat', emoji:'👨‍🍳', price:120 },
  { id:'halo', slot:'hat', name:'Halo', emoji:'😇', price:700 },
  { id:'flower', slot:'hat', name:'Flower Crown', emoji:'🌸', price:180 },
  { id:'viking', slot:'hat', name:'Viking Helmet', emoji:'⚔️', price:350 },
  { id:'headphones', slot:'hat', name:'Headphones', emoji:'🎧', price:220 },
  // face
  { id:'shades', slot:'face', name:'Sunglasses', emoji:'🕶️', price:100 },
  { id:'nerd', slot:'face', name:'Round Glasses', emoji:'🤓', price:90 },
  { id:'heartglasses', slot:'face', name:'Heart Glasses', emoji:'😍', price:200 },
  { id:'starglasses', slot:'face', name:'Star Glasses', emoji:'🤩', price:200 },
  { id:'goggles', slot:'face', name:'Ski Goggles', emoji:'🥽', price:180 },
  { id:'monocle', slot:'face', name:'Monocle', emoji:'🧐', price:250 },
  { id:'mask', slot:'face', name:'Hero Mask', emoji:'🦸', price:300 },
  { id:'mustache', slot:'face', name:'Mustache', emoji:'👨', price:120 },
  // neck
  { id:'bowtie', slot:'neck', name:'Bow Tie', emoji:'🎀', price:80 },
  { id:'scarf', slot:'neck', name:'Scarf', emoji:'🧣', price:120 },
  { id:'chain', slot:'neck', name:'Gold Chain', emoji:'📿', price:400 },
  { id:'bandana', slot:'neck', name:'Bandana', emoji:'🤠', price:100 },
  { id:'medal', slot:'neck', name:'Champion Medal', emoji:'🥇', price:900 },
  // back
  { id:'cape', slot:'back', name:'Hero Cape', emoji:'🦸', price:350 },
  { id:'backpack', slot:'back', name:'Backpack', emoji:'🎒', price:200 },
  { id:'jetpack', slot:'back', name:'Toy Jetpack', emoji:'🚀', price:600 },
  { id:'fairywings', slot:'back', name:'Fairy Wings', emoji:'🧚', price:500 },
  { id:'balloon', slot:'back', name:'Balloon', emoji:'🎈', price:150 },
];
const WEAR = {}; WEARABLES.forEach(w => WEAR[w.id] = w);
const WEAR_SLOTS = [['hat','Hats'],['face','Glasses & Face'],['neck','Neck'],['back','Back']];
