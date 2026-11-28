#!/usr/bin/env python3
"""Mythbound creature data -> ROSTER.md, CREATURE_PROMPTS.md, creatures.csv.

Edit the data here, then run:  python3 mythbound/tools/build_roster.py
All creatures are ORIGINAL designs that nod to a trope/archetype. Never put a
real franchise or character name into a prompt.
"""
import csv
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)

STAGES = ["Seedling", "Rookie", "Veteran", "Elite", "Ascended"]

REGIONS = [
    dict(key="sakuraden", name="Sakuraden", theme="Anime Realm", genre="Ki",
         palette="cherry-blossom pink, neon cyan, ink black and gold"),
    dict(key="capeworth", name="Capeworth", theme="Heroes & Villains Realm", genre="Cape",
         palette="comic-book primaries (red, blue, yellow), halftone dots, bold ink outlines"),
    dict(key="toonvale", name="Toonvale", theme="Cartoon Realm", genre="Toon",
         palette="bright saturated cartoon colors with thick black outlines"),
    dict(key="pantheos", name="Pantheos", theme="Gods & Goddesses Realm", genre="Divine",
         palette="marble white, gold leaf, lapis blue, jade green and sunset red"),
    dict(key="respawn", name="Respawn Reach", theme="Video Game Realm", genre="Pixel",
         palette="8-bit primaries, neon arcade glow, CRT scanline feel"),
    dict(key="hollowmere", name="Hollowmere", theme="Cryptids & Monsters Realm", genre="Dread",
         palette="misty green, swamp brown, moonlight blue and campfire orange"),
]

# Each line: (line_name, kind, archetype_nod, [4 evolution methods], [5 stages of (name, types, look)])
# kind: "starter", "standard" or "paragon"
LINES = {
"sakuraden": [
 ("Kipkip", "starter", "spiky-haired martial artist who powers up with golden auras",
  ["Level 14", "Level 28", "Comeback: win a battle while it is under 10% HP (Lv 40+)", "Level 55 after the 'Limit Break' story chapter"],
  [("Kipkip", "Ki", "tiny monkey cub with one spiky tuft of black hair, oversized orange wristbands, curly tail, determined grin"),
   ("Kiyaru", "Ki", "lean young monkey in an orange training gi, hair grown into three spikes, wrapped fists"),
   ("Kaizenka", "Ki/Brawl", "muscular monkey fighter with torn gi sleeves, faint white aura, battle scar, taller hair spikes"),
   ("Goldenrai", "Ki/Brawl", "powered-up monkey whose hair glows gold and stands straight up, crackling golden aura, teal eyes"),
   ("Zenkaiyo", "Ki/Radiant", "ultimate monkey with long flowing silver-blue glowing hair, calm face, translucent blue aura and floating sparks")]),
 ("Kunikit", "standard", "ninja with a sealed fox spirit and shadow clones",
  ["Level 16", "Level 30 at night", "Knows the move Clone Dance", "Walk 10,000 steps with it leading"],
  [("Kunikit", "Shadow", "one-tailed fox kit with a navy scarf and a toy throwing knife in its mouth, big ears"),
   ("Shinobix", "Shadow/Ki", "two-tailed fox in a navy ninja wrap and metal forehead plate, crouched on a scroll"),
   ("Kagetsune", "Shadow/Ki", "four-tailed fox ninja making a hand sign, two smoky shadow copies beside it"),
   ("Hakuretsu", "Shadow/Ki", "seven-tailed fox with red swirl markings, a spinning wind orb in its paw, torn cloak"),
   ("Kyubirai", "Shadow/Spirit", "colossal nine-tailed fox spirit wreathed in red-orange flame with sage-like eye markings")]),
 ("Mechakko", "standard", "giant-robot anime and combining super robots",
  ["Level 20", "Use a Core Drive", "Level up at the Neon Hangar", "Level up with another Metal-type in the party (they combine)"],
  [("Mechakko", "Metal", "small round robot cub with one antenna, glowing visor eye, stubby arms, white and blue plating"),
   ("Pilodyne", "Metal/Volt", "bipedal robot with a tiny cockpit dome on its chest, shoulder fins, V-shaped head crest"),
   ("Frameheart", "Metal/Volt", "sleek mech with a glowing heart reactor, energy saber at its hip, folded thruster wings"),
   ("Titanframe", "Metal/Volt", "towering red, white and blue battle mech with a giant drill arm and an energy cape"),
   ("Gattaigon", "Metal/Radiant", "huge combined super robot built from five vehicles, galaxy-pattern chest core, enormous drill sword")]),
 ("Mewlet", "standard", "transforming magical-girl heroines with moon wands",
  ["Max Bond", "Level 30 at night", "Use a Moon Locket", "Level 52 while holding a Star Brooch"],
  [("Mewlet", "Radiant", "kitten with a crescent-moon mark on its forehead, pink bow, sparkly eyes"),
   ("Ribbonette", "Radiant/Mind", "cat standing on hind legs with a sailor-collar ribbon and a tiny star wand"),
   ("Lunastra", "Radiant/Mind", "elegant cat in a ribbon dress with long twin-tail fur and a glowing moon tiara"),
   ("Prismheart", "Radiant/Mind", "cat warrior with crystal wings, heart-shaped scepter, swirling ribbons and sparkles"),
   ("Seraphine", "Radiant/Gale", "celestial cat goddess in a gown of light with a crescent halo and giant feathered wings")]),
 ("Fledgedge", "standard", "soul-reaping swordsmen with oversized blades",
  ["Level 18", "Land 30 critical hits", "Level up at the Spirit Gate at dusk", "Level 52"],
  [("Fledgedge", "Spirit", "fluffy black crow chick with a too-big samurai topknot, carrying a wooden sword"),
   ("Ravenin", "Spirit/Brawl", "wandering crow swordsman in a tattered black kimono and straw hat, katana at its side"),
   ("Kurozan", "Spirit/Brawl", "tall crow swordsman with a huge cleaver-like blade, white sash, glowing blue eyes"),
   ("Tsukikage", "Spirit/Brawl", "crow warrior with a cracked white bone mask, black flame wings, blade wrapped in spirit energy"),
   ("Soulrend", "Spirit/Shadow", "towering crow reaper in a long coat of black feathers holding two moonlit blades")]),
 ("Ottskip", "standard", "rubber-limbed pirate captain hunting a legendary treasure",
  ["Level 15", "Surf 5,000 steps", "Use a Strange Fruit", "Max Bond + Level 55"],
  [("Ottskip", "Tide", "baby sea otter in a small straw hat hugging a shell like treasure"),
   ("Buccotter", "Tide/Brawl", "otter in a red vest and straw hat stretching one arm extra long"),
   ("Stretchcap", "Tide/Brawl", "pirate otter with rubbery stretched limbs, scar under one eye, skull-and-bones sash"),
   ("Kaizotter", "Tide/Brawl", "otter captain with a long red coat draped on its shoulders, cutlass, wild grin"),
   ("Solbuccan", "Tide/Radiant", "white-furred laughing otter sun-spirit, swirling clouds, glowing eyes, bouncy rubbery pose")]),
 ("Starbead", "paragon", "a wish-granting eternal dragon summoned from seven orbs",
  ["Level 30", "Level 45", "Collect all 7 Star Beads hidden in Sakuraden", "Level 70"],
  [("Starbead", "Ki", "glowing orange orb with a red star inside and a tiny green serpent curled within"),
   ("Wishwyrm", "Ki/Gale", "small jade serpent dragon with long whiskers, hugging the star orb"),
   ("Ryuuden", "Ki/Gale", "long green dragon coiling through clouds, antlers and red eyes"),
   ("Skycoil", "Ki/Gale", "enormous emerald sky dragon in storm clouds with seven orbs orbiting it"),
   ("Eternoryu", "Ki/Radiant", "colossal golden-green eternal dragon filling the sky, seven blazing orbs in a ring, aurora")]),
],
"capeworth": [
 ("Capup", "starter", "the caped flying strongman",
  ["Level 16", "Level 32", "Level up in daytime holding a Sun Crystal", "Level 55 with Hero alignment"],
  [("Capup", "Cape", "puppy with a red cape, shield emblem on its chest and a curl of fur on its forehead"),
   ("Valorpup", "Cape/Gale", "young dog flying fists-first with its cape billowing"),
   ("Steelhound", "Cape/Metal", "muscular hound with steel-blue fur, glowing heat-vision eyes, big chest emblem"),
   ("Skyguardian", "Cape/Gale", "heroic dog floating above a city in sunlight, cape torn from battle"),
   ("Omnihound", "Cape/Radiant", "godlike gold and blue hero dog radiating solar energy, emblem glowing like a star")]),
 ("Nightpip", "standard", "the dark-knight vigilante detective",
  ["Level 18 at night", "Use a Utility Belt", "Win 10 battles at night", "Level 50"],
  [("Nightpip", "Shadow", "tiny bat with pointed ear-cowl, little grey cape and a serious frown"),
   ("Gadgebat", "Shadow/Cape", "bat wearing a yellow utility belt, grappling hook in its claw"),
   ("Vigilbat", "Shadow/Cape", "armored bat in a black cowl and scalloped cape with glowing white eyes"),
   ("Cowlord", "Shadow/Metal", "heavy armored bat knight with gadget gauntlets and a rain-soaked cape"),
   ("Duskwarden", "Shadow/Cape", "giant mech-armored bat guardian perched on a gargoyle, signal-light emblem behind it")]),
 ("Webbit", "standard", "the friendly wall-crawling hero and his black-goo rival (branches by alignment)",
  ["Level 15", "Level 28", "Level 42: Hero alignment -> Amazarach, Villain alignment -> Symbiax", "Level 56"],
  [("Webbit", "Venom", "small red and blue spider with big white eye patches, sitting in a web"),
   ("Swingling", "Venom/Cape", "spider swinging on a web line, mask-like face pattern"),
   ("Arachnero", "Venom/Cape", "athletic spider hero with a red-blue web pattern, crouched on a wall"),
   ("Amazarach", "Venom/Radiant", "HERO PATH: spider hero in sleek red-gold armor with four mechanical legs"),
   ("Spectacurach", "Cape/Radiant", "HERO PATH: avatar of every spider hero, multiverse portals behind it")]),
 ("Gigglet", "standard", "the chaotic clown-prince villain and his jester partner",
  ["Level 20", "Inflict 25 status conditions", "Use a Wild Card", "Level 54 with Villain alignment"],
  [("Gigglet", "Mind", "hyena pup with a green tuft of fur, purple bow tie and a huge grin"),
   ("Cackleyena", "Mind/Venom", "hyena in a purple suit jacket holding a joy buzzer, pale face markings"),
   ("Jestrix", "Mind/Venom", "lanky hyena jester fanning out playing cards, red smile markings"),
   ("Harlequeen", "Mind/Venom", "chaotic hyena in red and black harlequin diamonds swinging a giant mallet"),
   ("Chaosjest", "Mind/Shadow", "towering hyena ringmaster of chaos, top hat, cards swirling, toxic green smoke")]),
 ("Pebblox", "standard", "the mad purple titan collecting gems for his gauntlet",
  ["Level 22", "Level 36", "Hold Realm Gems from 5 regions", "Level up holding all 6 Realm Gems (one per region)"],
  [("Pebblox", "Stone", "small purple rock creature with a ridged chin and one empty gem socket on its fist"),
   ("Gemfist", "Stone/Brawl", "rock golem with a golden gauntlet holding two glowing gems"),
   ("Titanox", "Stone/Brawl", "massive purple stone brute in gold armor, four gems in its gauntlet"),
   ("Gauntlord", "Stone/Mind", "colossal titan in a gold helm, five gems blazing in its gauntlet, grim face"),
   ("Infinitox", "Stone/Mind", "cosmic titan with six realm gems glowing in its gauntlet, poised to snap, galaxy cape")]),
 ("Tinkerbeetle", "standard", "the genius in red-and-gold powered armor",
  ["Level 17", "Use an Arc Core", "Knows the move Repulse Beam", "Trade it (a 'tech upgrade')"],
  [("Tinkerbeetle", "Metal", "small beetle in welding goggles holding a wrench, sparks flying"),
   ("Rivetle", "Metal/Volt", "beetle in a clunky grey prototype armor shell with a glowing chest light"),
   ("Armorantle", "Metal/Volt", "sleek red and gold armored beetle with glowing palms and a chest reactor"),
   ("Repulsor", "Metal/Gale", "flying armored beetle with jet boots and shoulder missile pods"),
   ("Markomega", "Metal/Volt", "nanotech armored beetle with energy wings and a ring of floating drones")]),
 ("Cindrel", "paragon", "the psychic heroine consumed by a cosmic firebird",
  ["Level 30", "Level 45", "Max Bond while it knows a Mind move", "Level 70"],
  [("Cindrel", "Blaze", "small ember bird chick with a glowing red crest, eyes closed"),
   ("Pyrelet", "Blaze/Mind", "young firebird with a green-gold mask pattern and a telekinetic glow"),
   ("Mindflare", "Blaze/Mind", "elegant phoenix with wings of fire and debris floating around it"),
   ("Phoenixa", "Blaze/Mind", "huge golden phoenix with raptor-shaped flame wings and blazing white eyes"),
   ("Cosmiflare", "Blaze/Radiant", "cosmic phoenix of white and crimson fire with galaxies in its feathers")]),
],
"toonvale": [
 ("Squeakit", "starter", "rubber-hose cartoon mice through every era of animation",
  ["Level 15", "Level 30", "Use a Remaster Reel", "Max Bond + Level 55"],
  [("Squeakit", "Toon", "1930s black-and-white rubber-hose mouse with pie-cut eyes, white gloves, button shorts, film grain"),
   ("Toonmouse", "Toon", "1940s technicolor mouse in red shorts and yellow shoes, bouncy squash-and-stretch pose"),
   ("Saturdaze", "Toon/Gale", "1990s Saturday-morning cartoon mouse in sneakers and a backwards cap, thick outlines, attitude"),
   ("Pixmouse", "Toon/Radiant", "modern 3D-animated-movie mouse with soft fur, huge shiny eyes and soft lighting"),
   ("Animagnus", "Toon/Radiant", "mouse whose body shifts between every animation style, film-reel cape, director's megaphone")]),
 ("Pupyote", "standard", "the scheming coyote who mail-orders gadgets to catch a speedy bird",
  ["Level 18", "Lose 10 battles with it in the party (it never gives up)", "Use a Mail-Order Crate", "Level 52"],
  [("Pupyote", "Toon", "scrawny coyote pup with a bandaged nose holding a fork and napkin"),
   ("Schemeote", "Toon/Metal", "coyote with blueprints and a lit dynamite stick, sly grin"),
   ("Rocketyote", "Toon/Metal", "coyote strapped to a backfiring rocket wearing roller skates and goggles"),
   ("Contraptor", "Toon/Metal", "coyote piloting a clanky catapult-mech built from crates stamped WACKO"),
   ("Supergeniote", "Toon/Mind", "coyote in a lab coat with a giant brain-dome helmet, gadgets orbiting, anvil hovering overhead")]),
 ("Spongelet", "standard", "the cheerful undersea sponge fry cook",
  ["Level 16", "Knows the move Bubble Blow", "Level up at Pineapple Reef", "Level 50"],
  [("Spongelet", "Tide", "tiny yellow sea sponge with big blue eyes and buck teeth, bubbles around it"),
   ("Soakster", "Tide/Toon", "square sponge in a little white shirt and red tie holding a spatula"),
   ("Bubblebod", "Tide/Toon", "sponge in karate headgear blowing giant shaped bubbles"),
   ("Absorbo", "Tide/Toon", "huge waterlogged sponge giant with coral armor and a pineapple-shaped helmet"),
   ("Oceanspong", "Tide/Radiant", "majestic sponge king with a trident-spatula and jellyfish crown, waves around it")]),
 ("Snackpup", "standard", "the cowardly mystery-solving Great Dane",
  ["Feed it 10 Mystery Snacks", "Level 28 at night", "Level up in Hollowmere (it unmasks a monster)", "Level 52"],
  [("Snackpup", "Toon", "gangly brown Great Dane puppy with black spots and a diamond-tag collar, nervous face"),
   ("Mysterhound", "Toon/Mind", "lanky dog holding a magnifying glass, knees knocking"),
   ("Sleuthane", "Toon/Spirit", "Great Dane detective in a deerstalker hat with a flashlight, a bedsheet ghost nearby"),
   ("Unmaskane", "Toon/Spirit", "brave dog ripping a rubber mask off a fake ghost"),
   ("Mythdane", "Spirit/Toon", "legendary ghost-hunting Great Dane with a spectral glow and a giant-sandwich shield")]),
 ("Spinnip", "standard", "the hungry whirlwind-spinning devil",
  ["Level 18", "Level up in windy weather", "Use spinning moves 50 times", "Level 50"],
  [("Spinnip", "Gale", "stocky brown devil-imp with tiny horns, a huge mouth and drool"),
   ("Twisterdevil", "Gale/Brawl", "devil spinning into a mini tornado, legs blurred"),
   ("Whirlspin", "Gale/Brawl", "big-jawed devil inside a dust cyclone with debris flying"),
   ("Cyclonemaw", "Gale/Brawl", "tornado-shaped beast with a giant toothy mouth in its center"),
   ("Vortexx", "Gale/Toon", "grinning storm titan made of spinning cartoon wind lines, sucking up the landscape")]),
 ("Duckat", "standard", "the miserly money-swimming duck tycoon",
  ["Level 15", "Level up while you have 50,000 coins", "Use a Lucky Dime", "Level 50"],
  [("Duckat", "Metal", "duckling with spectacles and a tiny top hat holding one gold coin"),
   ("Penniquack", "Metal/Gale", "duck in a blue frock coat and spats with a cane, coins jingling"),
   ("Tycoonard", "Metal/Gale", "rich duck diving into a pool of gold coins"),
   ("Vaultduck", "Metal/Stone", "armored duck with a bank-vault door for a chest, stacks of gold"),
   ("Fortunquack", "Metal/Radiant", "golden duck emperor on a treasure-chest throne, coins raining down")]),
 ("Doodlet", "paragon", "a pencil sketch that comes to life as an animated dragon",
  ["Level 30", "Level 45", "Use a Golden Pencil", "Level 70"],
  [("Doodlet", "Toon", "rough pencil scribble of a baby dragon on paper with eraser smudges and stick wings"),
   ("Sketchwyrm", "Toon/Mind", "cleaner pencil-line dragon with construction lines and guide circles still visible"),
   ("Inkdrake", "Toon/Shadow", "fully inked black-line dragon with ink splatter drips and bold outlines"),
   ("Animadrake", "Toon/Blaze", "colored cel-shaded dragon breathing paint-colored fire, motion lines"),
   ("Magnumopus", "Toon/Radiant", "masterpiece dragon in a golden frame, painted in every art style, quill-feather wings")]),
],
"pantheos": [
 ("Bleatbolt", "starter", "thunder gods of many lands: sky father, hammer god, drum-beating storm spirit",
  ["Level 16", "Level 32 during a thunderstorm", "Use a Storm Hammer", "Level 55 on the Sky Bridge"],
  [("Bleatbolt", "Divine", "baby goat with lightning-bolt horns and a tiny storm cloud over its head"),
   ("Thundram", "Divine/Volt", "young ram with a red cape, crackling horns and a small hammer charm"),
   ("Stormhorn", "Divine/Volt", "mighty goat pulling a chariot, hammer-shaped horns, wild white beard"),
   ("Raikram", "Volt/Gale", "storm ram with a ring of thunder drums floating behind it, eagle-feather mane"),
   ("Allthunder", "Divine/Volt", "colossal sky-father goat with a lightning bolt, hammer and drum ring, golden laurel")]),
 ("Duatpup", "standard", "the jackal-headed guide of the dead (ancient Egypt)",
  ["Level 17 at dusk", "Level up inside the Great Pyramid", "Use a Feather of Truth", "Level 50"],
  [("Duatpup", "Spirit", "black jackal puppy with a gold collar and blue eyeliner markings"),
   ("Sandjackal", "Spirit/Stone", "jackal in a gold-striped headdress with an ankh charm"),
   ("Embalmor", "Spirit/Divine", "tall jackal priest wrapped in linen strips holding a crook and flail"),
   ("Anubix", "Spirit/Divine", "regal jackal guardian in gold armor holding golden scales"),
   ("Scalesoul", "Spirit/Divine", "towering judge of souls weighing a heart against a feather under a starry desert sky")]),
 ("Hootlet", "standard", "the owl of the goddess of wisdom and strategy (ancient Greece)",
  ["Level 16", "Win 20 battles", "Use an Olive Branch", "Max Bond + Level 52"],
  [("Hootlet", "Mind", "round grey owlet wearing a tiny bronze helmet"),
   ("Strateowl", "Mind/Metal", "owl holding a scroll and a spear-quill, olive-leaf crown"),
   ("Aegowl", "Mind/Metal", "warrior owl with a round shield bearing a snake-haired face emblem"),
   ("Wisdomhelm", "Mind/Metal", "armored owl general in a crested bronze helm with spear and battle plans"),
   ("Palladion", "Mind/Divine", "giant marble-and-gold owl guardian statue with shield and olive branches, glowing wise eyes")]),
 ("Mochibun", "standard", "the jade rabbit who makes the elixir on the moon (Chinese legend)",
  ["Max Bond", "Level 30 at night", "Use an Elixir Peach", "Level 52 under a full moon"],
  [("Mochibun", "Radiant", "white rabbit with jade-green ear tips holding a tiny mortar"),
   ("Mortarabbit", "Radiant/Mind", "rabbit pounding a glowing mortar and pestle, moon-shaped tail"),
   ("Jadehare", "Radiant/Mind", "elegant jade-white hare in silk robes with flowing sleeves and floating herbs"),
   ("Lunarch", "Radiant/Divine", "moon-palace hare with cinnamon-tree branches and a crescent staff"),
   ("Moonelixa", "Radiant/Divine", "celestial hare riding a crescent moon with a glowing elixir and silk streamers")]),
 ("Gleipup", "standard", "the giant chained wolf of the end of the world (Norse)",
  ["Level 18", "Level up in a blizzard", "Faint 3 times, then win a battle (it breaks its chains)", "Level 54"],
  [("Gleipup", "Frost", "grey wolf pup with a thin broken silk ribbon around its neck"),
   ("Chainfang", "Frost/Shadow", "wolf straining against glowing chains, frosty breath"),
   ("Fenrisk", "Frost/Shadow", "massive wolf with ice-crusted fur and broken chain links dangling"),
   ("Ragnarow", "Frost/Shadow", "giant wolf howling at a darkened sun, jaws dripping frost"),
   ("Worldmaw", "Frost/Divine", "world-sized wolf with starry fur and shattered chains, jaws stretching earth to sky")]),
 ("Fawnling", "standard", "the antlered lord of the wild forest (Celtic)",
  ["Level 15", "Walk 8,000 steps with it leading", "Level up at the Sacred Oak at dawn", "Level 50"],
  [("Fawnling", "Verdant", "spotted fawn with tiny glowing antler nubs and moss on its back"),
   ("Antlerkin", "Verdant/Divine", "young stag with ivy-wrapped antlers and a gold torc necklace"),
   ("Grovestag", "Verdant/Divine", "stag with tree-branch antlers full of birds and leaves"),
   ("Wildking", "Verdant/Divine", "upright horned forest lord in a cloak of leaves holding a golden torc"),
   ("Cernunnox", "Verdant/Divine", "ancient god-stag whose antlers form a forest canopy with animals sheltering beneath")]),
 ("Quetzlet", "paragon", "the feathered serpent of the Mesoamerican skies",
  ["Level 30", "Level 45", "Level up at dawn atop the Sun Pyramid", "Level 70"],
  [("Quetzlet", "Gale", "small green serpent with a tuft of long quetzal feathers, curled in a jade egg"),
   ("Plumeserp", "Gale/Divine", "winged serpent with emerald and red feathers and stepped-pyramid patterns on its scales"),
   ("Featherwyrm", "Gale/Divine", "long feathered serpent dragon coiled around a carved temple pillar"),
   ("Sunserpent", "Gale/Blaze", "giant feathered serpent with a sun disk behind its head and wind spirals"),
   ("Quetzalcoron", "Gale/Divine", "colossal rainbow-feathered sky serpent wrapped around the sun, gold and jade ornaments")]),
],
"respawn": [
 ("Shroomy", "starter", "the jumping hero who grows with every power-up",
  ["Use a Grow Shroom (Lv 15+)", "Use a Flame Bloom (Lv 30+)", "Use an Invinci-Star (Lv 42+)", "Use a Hero Leaf (Lv 55+)"],
  [("Shroomy", "Pixel", "small red-capped mushroom sprite with white spots, bushy mustache and tiny overalls"),
   ("Jumpcap", "Pixel/Brawl", "taller mushroom in blue overalls mid-jump with a fist raised"),
   ("Flarecap", "Pixel/Blaze", "white and red mushroom tossing a bouncing fireball"),
   ("Starcap", "Pixel/Radiant", "rainbow-flashing invincible mushroom surrounded by star sparkles"),
   ("Legendcap", "Pixel/Radiant", "giant mushroom hero with a cape, striped raccoon-like tail and a golden crown cap")]),
 ("Rollpip", "standard", "the blue speedster who collects golden rings",
  ["Walk 3,000 steps with it leading", "Level 30", "Win 10 battles in 3 turns or fewer", "Level up holding 50 Gold Rings"],
  [("Rollpip", "Gale", "small blue pangolin with red sneakers, half curled into a ball"),
   ("Dashadillo", "Gale/Volt", "pangolin sprinting with speed lines and spiky blue scales"),
   ("Spindash", "Gale/Volt", "pangolin spinning as a bladed blue ball with a shockwave ring"),
   ("Boostgolin", "Gale/Volt", "sleek blue pangolin with jet sneakers and a trail of golden rings"),
   ("Hyperolin", "Gale/Radiant", "glowing golden pangolin with swept-up spikes and seven gems orbiting")]),
 ("Questlet", "standard", "the green-capped sword-and-shield adventurer and his fairy",
  ["Level 16", "Open 20 treasure chests", "Clear the Lag Temple dungeon", "Use an Ancient Blade (Lv 50+)"],
  [("Questlet", "Verdant", "little green gecko in a pointed green cap with a wooden sword and a fairy light hovering by it"),
   ("Wanderko", "Verdant/Metal", "gecko in a green tunic carrying a shield and bow"),
   ("Bladesong", "Verdant/Metal", "gecko knight drawing a glowing sacred sword, a small flute on its belt"),
   ("Keeperko", "Metal/Radiant", "armored gecko hero with a bird-crest shield and three golden triangles glowing on its hand"),
   ("Courageko", "Metal/Radiant", "legendary gecko champion riding a lizard steed, glowing sword raised, golden relic above")]),
 ("Pixcube", "standard", "the block-building survival world",
  ["Level 15", "Level up in the Deep Mine", "Level up holding 64 Ore Blocks", "Level 50"],
  [("Pixcube", "Stone", "tiny cube creature made of a grass-topped dirt block with square eyes"),
   ("Blockbuddy", "Stone/Pixel", "cube creature with a pickaxe arm and stone texture"),
   ("Cubolem", "Stone/Pixel", "blocky iron golem holding a single flower"),
   ("Craftitan", "Stone/Metal", "huge blocky titan of blue diamond-ore blocks with a crafting-table chest"),
   ("Bedrockon", "Stone/Pixel", "colossal world-cube of bedrock and glowing ore with lava cracks and pixel trees on its shoulders")]),
 ("Chompip", "standard", "the maze-running pellet eater and its ghosts",
  ["Feed it 100 berries", "Level 30 at night", "Use a Power Pellet", "Level 52"],
  [("Chompip", "Pixel", "round yellow pixel creature with a big wedge-shaped chomping mouth"),
   ("Mazemaw", "Pixel/Shadow", "yellow chomper with a little ghost following it and a maze pattern on its belly"),
   ("Pelletron", "Pixel/Spirit", "chomper glowing blue with power while scared pixel ghosts orbit it"),
   ("Ghostgobbler", "Pixel/Spirit", "huge chomper with four colorful ghost tails"),
   ("Arcadivore", "Pixel/Spirit", "giant arcade-cabinet monster with a chomping screen mouth and joystick antennae")]),
 ("Quadlet", "standard", "the falling-block puzzle game",
  ["Level 15", "Score 10,000 in the Stack Attack minigame", "Trade it", "Level 50"],
  [("Quadlet", "Pixel", "T-shaped creature made of four blocks with pixel eyes"),
   ("Stackit", "Pixel/Mind", "creature made of stacked colorful four-block pieces"),
   ("Lineclear", "Pixel/Mind", "block-stack creature with one flashing row about to clear"),
   ("Combotron", "Pixel/Mind", "tall tower of blocks with floating combo-multiplier numbers"),
   ("Tetramax", "Pixel/Volt", "huge puzzle-grid giant with flashing lines, music notes and a crown of falling blocks")]),
 ("Bitling", "paragon", "the final-boss dragon that gains better graphics every console generation",
  ["Level 30", "Level 45", "Use a Render Core", "Level 70"],
  [("Bitling", "Pixel", "extremely blocky 8-bit baby dragon with only 4 colors and chunky pixels"),
   ("Bytewyrm", "Pixel/Blaze", "16-bit dragon with more colors and detail and small wings"),
   ("Polydrake", "Pixel/Blaze", "low-poly 3D-style dragon made of flat triangular facets"),
   ("Raytrake", "Pixel/Blaze", "high-definition sleek dragon with shiny reflections and glow"),
   ("Maxrez", "Pixel/Radiant", "ultra-detailed final-boss dragon with a giant health bar floating above it")]),
],
"hollowmere": [
 ("Footling", "starter", "the big-footed ape of the deep woods and its snowy mountain cousin",
  ["Level 16", "Level 32", "Level up on Frostpeak (snowy mountain)", "Level 55 after the 'Last Sighting' story chapter"],
  [("Footling", "Dread", "small shaggy brown ape-child with huge feet and pine needles in its fur"),
   ("Shagfoot", "Dread/Brawl", "lanky hairy forest ape caught mid-stride like a blurry photo"),
   ("Sasquatchet", "Dread/Brawl", "big muscular forest giant carrying a log, footprint trail behind it"),
   ("Yetimount", "Frost/Dread", "white-furred mountain ape with icicle claws and snowy breath"),
   ("Gigantopith", "Stone/Dread", "colossal ancient ape with mossy boulder shoulders and trees growing from its back")]),
 ("Ripplet", "standard", "the long-necked monster of the Scottish loch",
  ["Level 15", "Level up in fog", "Level up in Loch Morrow at night", "Level 52"],
  [("Ripplet", "Tide", "baby long-necked lake reptile peeking out of water with round flippers"),
   ("Lochling", "Tide/Dread", "green plesiosaur with a tartan-patterned fin"),
   ("Nessaur", "Tide/Dread", "long-necked lake monster with humps showing above the water"),
   ("Plesiosovran", "Tide/Dread", "huge dark lake monster rising from fog with glowing eyes"),
   ("Lochleviath", "Tide/Dread", "ancient lake leviathan with castle ruins on its back, wrapped in mist")]),
 ("Mothlet", "standard", "the red-eyed winged omen of the bridge",
  ["Level 15", "Level up at night near a street lamp", "Level up on the Silver Bridge", "Level 50"],
  [("Mothlet", "Gale", "fuzzy grey moth larva with two glowing red dots for eyes"),
   ("Glowmoth", "Gale/Dread", "dusty-winged moth drawn to a lamp"),
   ("Pleasantwing", "Gale/Dread", "tall humanoid moth with folded wings and red eyes standing on a bridge"),
   ("Mothmaw", "Gale/Dread", "giant dark winged figure with huge glowing red eyes"),
   ("Omenmoth", "Gale/Mind", "colossal prophecy moth with wings patterned with eyes and stars, red light beams")]),
 ("Chupip", "standard", "the spiny goat-sucker of the countryside",
  ["Level 17", "Drain 1,000 HP total with draining moves", "Level 34 at night", "Level 52"],
  [("Chupip", "Venom", "small spiny lizard-dog pup with big red eyes"),
   ("Spinechupa", "Venom/Shadow", "hairless grey creature with quills along its back and fangs"),
   ("Chupacabrix", "Venom/Shadow", "kangaroo-like hopping cryptid with a spiked back and glowing eyes"),
   ("Barbfiend", "Venom/Shadow", "larger spike-backed beast with dripping venomous barbs"),
   ("Nightchupa", "Venom/Dread", "huge alpha cryptid under a red moon with glowing spines and fangs")]),
 ("Stitchit", "standard", "the stitched-together creature brought to life by lightning",
  ["Level up during a thunderstorm", "Level 30", "Use a Lightning Rod", "Level 52 at the Castle Lab"],
  [("Stitchit", "Volt", "small patchwork doll creature with stitches and two neck bolts"),
   ("Boltneck", "Volt/Stone", "green patchwork golem kid with a flat head and sparking bolts"),
   ("Patchlem", "Volt/Stone", "tall stitched giant in a too-small coat, arms held forward"),
   ("Reanimator", "Volt/Dread", "hulking creature crackling with lab lightning and dragging chains"),
   ("Prometheon", "Volt/Dread", "towering electrified giant with a storm crown, sad thoughtful face, lab machines fused to its body")]),
 ("Hoofkit", "standard", "the winged devil of the pine barrens, the 13th child",
  ["Level 16", "Level up in the Pine Barrens at night", "Win 13 battles in a row", "Level 50"],
  [("Hoofkit", "Blaze", "small hooved creature with bat wings and a goat-like face"),
   ("Pinewing", "Blaze/Dread", "flying horse-headed creature with leathery wings, pine forest behind"),
   ("Leedsfiend", "Blaze/Dread", "taller screeching devil-beast with a forked tail and glowing eyes"),
   ("Barrenshade", "Blaze/Dread", "big winged hooved cryptid with flames from its nostrils"),
   ("Infernohorn", "Blaze/Dread", "giant horned beast of the pine barrens with flaming wings")]),
 ("Kaijuvi", "paragon", "the atomic-breathing king of giant monsters",
  ["Level 30", "Level 45", "Use an Atomic Core", "Level 70"],
  [("Kaijuvi", "Stone", "baby grey lizard with tiny dorsal spikes and an oversized head"),
   ("Lizaurus", "Stone/Blaze", "upright reptile with jagged spines glowing blue"),
   ("Megasaur", "Stone/Blaze", "tall giant-monster lizard with radiation-blue dorsal plates"),
   ("Atomaw", "Stone/Blaze", "giant monster breathing a blue atomic beam over city ruins"),
   ("Kaijuggernaut", "Stone/Dread", "colossal king of monsters with red-glowing spines and magma cracks")]),
],
}

# Extra branch stages (villain path for Webbit)
BRANCHES = {
    "Webbit": [
        ("Symbiax", "Venom/Shadow", "VILLAIN PATH: spider covered in black living goo with white jagged eyes and a long tongue"),
        ("Voidmaw", "Venom/Shadow", "VILLAIN PATH: hulking black and red goo-spider monster with many fanged mouths and tendrils"),
    ]
}

# Sovereigns (legendaries): base form + Awakened form
SOVEREIGNS = {
"sakuraden": [
 ("Shoukai", "Ki/Radiant", "The Protagonist", "winged white lion with a flowing red scarf, glowing chest emblem and spiky golden mane",
  "True Ending Form", "mane becomes a sun crown and the scarf turns into wings of flame"),
 ("Maouryn", "Shadow/Ki", "The Demon Lord", "horned shadow emperor beast in a tattered royal cape with crimson eyes and a floating dark crown",
  "Final Boss Form", "giant multi-armed silhouette in cracked armor leaking violet light")],
"capeworth": [
 ("Aegisor", "Cape/Radiant", "The Ultimate Hero", "golden armored lion-knight statue come to life with a shield emblem chest and cape of light",
  "Crisis Form", "cape becomes a field of stars and the shield splits into orbiting plates"),
 ("Malefax", "Cape/Shadow", "The Ultimate Villain", "iron-masked armored overlord in a green hooded cloak with sorcery glowing in its gauntlets",
  "Doomsday Form", "mask cracked, a throne of dark energy rising behind it")],
"toonvale": [
 ("Inkara", "Toon/Radiant", "The Pen", "great inkwell serpent with a fountain-pen nib for a head, drawing rainbow lines in the air",
  "Final Cut Form", "body ringed by a glowing animation-cel halo and film strips"),
 ("Erazor", "Toon/Shadow", "The Eraser", "giant pink and grey rubber eraser beast, everything behind it erased to blank white, crumbs swirling",
  "Delete Form", "body becomes a hollow white void drawn only as an outline")],
"pantheos": [
 ("Solarchon", "Blaze/Divine", "Sun Above", "radiant sun-disk falcon-lion with a halo of rays, golden mask and bronze mirror",
  "Eclipse Form", "sun covered by a black disc with a wild corona of flame"),
 ("Nyxarion", "Shadow/Divine", "Night Below", "star-veiled moth-serpent goddess of night with crescent horns and a cloak of stars",
  "Eclipse Form", "the night sky opens into a full galaxy behind her")],
"respawn": [
 ("Respawnix", "Blaze/Pixel", "The Extra Life", "phoenix made of green and gold pixels trailing extra-life heart icons",
  "New Game+ Form", "rainbow pixel wings and a crown, counters spinning"),
 ("Nullcrash", "Pixel/Shadow", "The Fatal Error", "corrupted data kraken with missing-texture checkerboard skin and tentacles of glitched code",
  "Blue Screen Form", "body breaks into scrambled floating squares over a blue error screen")],
"hollowmere": [
 ("Sanguinar", "Dread/Shadow", "The Count", "vampire bat-lord in a high-collared cape with crimson eyes, castle silhouette behind",
  "Blood Moon Form", "huge red moon behind it, wings made of a swarm of bats"),
 ("Cthaloth", "Dread/Tide", "The Dreamer in the Deep", "tentacled winged sea horror with an octopus head rising from a sunken city",
  "Dreaming Form", "cosmic tentacles reaching from a starry void")],
}

ORIGIN = ("Quillion", "Radiant/Mind", "The First Storyteller",
          "great feathered serpent-bird made of book pages and ink, a giant quill as its crest, six colored tail feathers (one per realm)",
          "Epilogue Form", "pages unfold into vast wings showing scenes from all six realms")

STYLE = ("Pixel art battle sprite in the style of a Game Boy Color era monster-collecting RPG. "
         "ORIGINAL creature design, not a copy of any existing character. Limited palette (6-8 colors), "
         "crisp 1-pixel dark outline, simple shading, plain white background, no text, no border.")


def build():
    rows = []
    dex = 0
    for reg in REGIONS:
        for (lname, kind, nod, evos, stages) in LINES[reg["key"]]:
            branch = BRANCHES.get(lname, [])
            for i, (name, types, look) in enumerate(stages):
                dex += 1
                rows.append(dict(dex=dex, region=reg["name"], line=lname, kind=kind, stage=f"{i+1} {STAGES[i]}",
                                 name=name, types=types, evolves_next=(evos[i] if i < 4 else "-"),
                                 look=look, nod=nod))
            for j, (name, types, look) in enumerate(branch):
                dex += 1
                rows.append(dict(dex=dex, region=reg["name"], line=lname, kind=kind, stage=f"{4+j} {STAGES[3+j]} (branch)",
                                 name=name, types=types, evolves_next=(evos[3] if j == 0 else "-"),
                                 look=look, nod=nod))
        for (name, types, title, look, aw_name, aw_look) in SOVEREIGNS[reg["key"]]:
            dex += 1
            rows.append(dict(dex=dex, region=reg["name"], line=name, kind="sovereign", stage="Sovereign",
                             name=name, types=types, evolves_next="Awaken via Pact (see design doc)",
                             look=look, nod=title))
            rows.append(dict(dex=f"{dex}-A", region=reg["name"], line=name, kind="sovereign", stage="Awakened",
                             name=f"{name} ({aw_name})", types=types, evolves_next="-",
                             look=aw_look + f" (awakened form of: {look})", nod=title))
    dex += 1
    n, t, title, look, aw, awl = ORIGIN
    rows.append(dict(dex=dex, region="All Realms", line=n, kind="origin", stage="Origin", name=n, types=t,
                     evolves_next="Awaken after catching all 12 Sovereigns", look=look, nod=title))
    rows.append(dict(dex=f"{dex}-A", region="All Realms", line=n, kind="origin", stage="Awakened",
                     name=f"{n} ({aw})", types=t, evolves_next="-", look=awl + f" (awakened form of: {look})", nod=title))
    return rows


def write_csv(rows):
    path = os.path.join(OUT, "creatures.csv")
    cols = ["dex", "region", "line", "kind", "stage", "name", "types", "evolves_next", "look",
            "front_sprite", "back_sprite", "party_icon"]
    with open(path, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            w.writerow({**r, "front_sprite": "", "back_sprite": "", "party_icon": ""})


def write_roster(rows):
    L = ["# Mythbound Lorebook (Creature Roster)", "",
         "_Generated by `tools/build_roster.py`. Edit the script, not this file._", ""]
    for reg in REGIONS:
        L += [f"## {reg['name']}: {reg['theme']}", f"Signature type: **{reg['genre']}**", ""]
        for (lname, kind, nod, evos, stages) in LINES[reg["key"]]:
            tag = {"starter": " (Starter)", "paragon": " (PARAGON)"}.get(kind, "")
            L += [f"### {lname} line{tag}", f"_Nod: {nod}_", "",
                  "| # | Stage | Name | Type | Evolves by | Look |", "|---|---|---|---|---|---|"]
            for r in rows:
                if r["line"] == lname and r["kind"] == kind:
                    L.append(f"| {r['dex']} | {r['stage']} | **{r['name']}** | {r['types']} | {r['evolves_next']} | {r['look']} |")
            L.append("")
        L += ["### Sovereigns", "", "| # | Name | Title | Type | Look |", "|---|---|---|---|---|"]
        for r in rows:
            if r["region"] == reg["name"] and r["kind"] == "sovereign":
                L.append(f"| {r['dex']} | **{r['name']}** | {r['nod']} | {r['types']} | {r['look']} |")
        L.append("")
    L += ["## The Origin", "", "| # | Name | Title | Type | Look |", "|---|---|---|---|---|"]
    for r in rows:
        if r["kind"] == "origin":
            L.append(f"| {r['dex']} | **{r['name']}** | {r['nod']} | {r['types']} | {r['look']} |")
    with open(os.path.join(OUT, "ROSTER.md"), "w") as f:
        f.write("\n".join(L) + "\n")


def write_prompts(rows):
    L = ["# Mythbound: ChatGPT Creature Prompts", "",
         "_Generated by `tools/build_roster.py`._", "",
         "**How to use:** paste the Style Lock (in `ART_LIST.md`) once at the start of a ChatGPT chat. "
         "Then send ONE evolution-sheet prompt per message. Generating the whole line in one image keeps the "
         "5 stages looking like the same creature. Crop each stage out afterwards, then ask for the back view "
         "of each (prompt at the bottom of each line).", ""]
    for reg in REGIONS:
        L += [f"## {reg['name']} ({reg['theme']})", ""]
        for (lname, kind, nod, evos, stages) in LINES[reg["key"]]:
            mine = [r for r in rows if r["line"] == lname and r["kind"] == kind]
            main = [r for r in mine if "branch" not in r["stage"]]
            alt = [r for r in mine if "branch" in r["stage"]]
            def sheet(items, label):
                parts = " ".join(f"({k+1}) {r['name']}: {r['look']}." for k, r in enumerate(items))
                return (f"**{label}**\n\n```\n{STYLE} Evolution sheet: {len(items)} stages of one creature line in a row, "
                        f"left to right, each bigger and more powerful than the last but clearly the same species. "
                        f"Region colors: {reg['palette']}. {parts}\n```\n")
            L.append(f"### {lname} line" + (" (Paragon)" if kind == "paragon" else "") + (" (Starter)" if kind == "starter" else ""))
            L.append(sheet(main, "Front sprites, evolution sheet"))
            if alt:
                L.append(sheet(main[:3] + alt, "Villain branch sheet (stages 1-3 + villain 4-5)"))
            L.append("**Back sprites:**\n\n```\nUsing the exact creatures from the sheet above, draw each one from BEHIND "
                     "(rear 3/4 view, as seen by the player in battle), same order, same palette, same pixel style, white background.\n```\n")
            L.append("**Party icons:**\n\n```\nTurn each creature above into a tiny 16x16-pixel party menu icon, "
                     "two-frame idle bounce, very simple, same colors, white background.\n```\n")
        L += [f"### {reg['name']} Sovereigns (legendaries)", ""]
        for r in [x for x in rows if x["region"] == reg["name"] and x["kind"] == "sovereign" and x["stage"] == "Sovereign"]:
            aw = next(x for x in rows if x["dex"] == f"{r['dex']}-A")
            L.append(f"**{r['name']}, {r['nod']}**\n\n```\n{STYLE} A legendary creature, larger and more detailed "
                     f"than normal, majestic pose. Region colors: {reg['palette']}. {r['name']}: {r['look']}. "
                     f"Draw two versions side by side: left = normal form, right = awakened form: {aw['look'].split(' (awakened')[0]}.\n```\n")
    o = [x for x in rows if x["kind"] == "origin"]
    L += ["## The Origin", "", f"**{o[0]['name']}, {o[0]['nod']}**\n\n```\n{STYLE} The final, most powerful creature in the game. "
          f"{o[0]['look']}. Draw two versions side by side: left = normal form, right = awakened form: "
          f"{o[1]['look'].split(' (awakened')[0]}.\n```\n"]
    with open(os.path.join(OUT, "CREATURE_PROMPTS.md"), "w") as f:
        f.write("\n".join(L) + "\n")


if __name__ == "__main__":
    rows = build()
    write_csv(rows)
    write_roster(rows)
    write_prompts(rows)
    kinds = {}
    for r in rows:
        kinds[r["kind"]] = kinds.get(r["kind"], 0) + 1
    print("total designs:", len(rows), kinds)
