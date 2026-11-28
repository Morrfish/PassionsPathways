# MYTHBOUND: Complete Art and Sprite List for ChatGPT

Creature prompts are in **`CREATURE_PROMPTS.md`** (one copy-paste prompt per evolution line).
This file has the **Style Lock**, the **workflow**, and **everything else** the game needs.
Check things off in `creatures.csv` as you go.

---

## Step 1: Paste this Style Lock first in every new ChatGPT chat

```
For this whole chat you are making art for my original creature-collecting RPG called "Mythbound".
Style rules for EVERY image:
- Pixel art, Game Boy Color / Game Boy Advance era monster-RPG look
- Crisp 1-pixel dark outlines, simple 2-3 step shading, limited palette (6-8 colors per sprite)
- Plain solid white background unless I ask for a scene (so I can remove it)
- No text, no labels, no watermark, no frame
- All creatures and characters are ORIGINAL designs. Never copy an existing franchise character,
  even if a description sounds like a famous trope.
- Battle sprites face 3/4 toward the viewer (front) or away (back). Keep proportions chunky and readable at small size.
Reply "Ready" and wait for my first request.
```

## Step 2: Workflow tips
1. **One evolution line per message.** The prompt asks for all 5 stages in one sheet, so they look like the same creature.
2. **Then ask for the back views** and **party icons** using the short prompts under each line.
3. If one stage comes out wrong, say: *"Redo only stage 3, keep everything else the same."*
4. **Clean-up after downloading:** crop each sprite, remove the white background, and resize with **nearest-neighbor** (no smoothing) to the final size below. ChatGPT can't hit exact pixel sizes, so you always shrink afterwards.
5. Save with the file names below so the game can load them automatically.

## Final sizes and file names

| Asset | Final size | File name example |
|---|---|---|
| Creature front (battle) | 64 x 64 px | `creatures/front/001_kipkip.png` |
| Creature back (battle) | 64 x 64 px | `creatures/back/001_kipkip.png` |
| Sovereign / Paragon Stage V front | 96 x 96 px (bigger on purpose) | `creatures/front/036_eternoryu.png` |
| Party icon (2 frames) | 16 x 16 px each, side by side (32 x 16) | `creatures/icon/001_kipkip.png` |
| Overworld tiles | 16 x 16 px | `tiles/sakuraden_town.png` |
| Characters, overworld | 16 x 24 px per frame | `chars/player_a_walk.png` |
| Trainer battle portrait | 64 x 64 px | `trainers/hayate.png` |
| Item icon | 16 x 16 px | `items/moon_locket.png` |
| Battle background | 240 x 112 px | `battle_bg/sakuraden_grass.png` |
| Screen size of the game | 240 x 160 px (scaled up 3-4x) | |

The dex number is the `dex` column in `creatures.csv`.

---

## A. Creatures (see `CREATURE_PROMPTS.md`)

| Group | Designs | Images (front + back + icon) |
|---|---|---|
| 6 starter lines (5 stages) | 30 | 90 |
| 30 regular lines (5 stages) + 2 Webbit villain-branch stages | 152 | 456 |
| 6 Paragon lines (5 stages) | 30 | 90 |
| 12 Sovereigns (normal + Awakened) | 24 | 72 |
| Quillion (normal + Awakened) | 2 | 6 |
| **Total** | **238** | **714** |

Also needed:
- [ ] **Shiny palettes**: no new art. Recolor in code.
- [ ] **Silhouette versions**: no new art. The game blacks out uncaught creatures in the Lorebook automatically.
- [ ] **Hollowmere "blurry evidence" versions**: no new art. The game blurs the sprite.

---

## B. Characters

Each character needs: **battle portrait** (64x64) and, if they walk around, an **overworld sheet** (4 directions x 3 walk frames = 12 frames, 16x24 each).

**Overworld-sheet prompt template:**
```
Top-down overworld walking sprite sheet for a Game Boy Color style RPG. Character: [DESCRIPTION].
4 rows (facing down, up, left, right) x 3 columns (step left, standing, step right). Tiny chunky 16x24 pixel proportions,
big head, white background, no text.
```
**Battle-portrait prompt template:**
```
Full-body trainer battle sprite for a Game Boy Color style RPG, 3/4 view, confident pose. Character: [DESCRIPTION]. White background.
```

### Main cast
| # | Character | Description for the prompt | Needs |
|---|---|---|---|
| 1 | Player A | young Pathfinder with a red explorer jacket, satchel holding a glowing book, cap with a quill pin | Portrait, back view (for battle), walk, run, bike, surf, glide, cheer pose |
| 2 | Player B | young Pathfinder with a teal explorer coat, braided hair, satchel with a glowing book, quill hair clip | Same as Player A |
| 3 | Sage (rival) | cocky young Pathfinder in a purple hoodie with a pen behind one ear | Portrait (3 versions: early, middle, final), walk |
| 4 | Professor Inkwell | kind older scholar with an ink-stained lab coat, round glasses, giant quill | Portrait, walk |
| 5 | Player's family member | friendly adult in an apron at home | Walk |
| 6 | Lexa (Grand Champion) | calm champion in a long coat with patches from all six realms | Portrait, walk |
| 7 | The Editor (villain boss) | tall figure in a white suit and mask shaped like a blank page, holding a giant red pen | Portrait, walk |
| 8 | Redactor Grunt (x2: two looks) | uniform of grey hoodies with a black bar across the chest, face masks | Portrait, walk |
| 9-14 | 6 Redactor Admins | one per realm, each in a Redactor uniform mixed with that realm's style (ninja, villain, cartoon, priest, gamer, monster hunter) | Portrait, walk |

### Chapter Masters (24) and Realm Champions (6)
Each needs a portrait and a walk sheet. **30 characters.** Also a **Chapter Seal** badge icon for each Master (24 badges).

| Realm | Character | Description | Badge |
|---|---|---|---|
| Sakuraden | Sensei Hayate | martial arts master in a white gi with a black belt and a headband | Fist Seal |
| | Captain Rin | mecha pilot in a plugsuit with a helmet under one arm | Gear Seal |
| | Mira Starlight | magical idol girl with a star wand and ribbons | Star Seal |
| | Kuro the Ronin | masked wandering swordsman with a straw hat | Blade Seal |
| | Shogun Akari (Champion) | warrior in red-and-gold armor with a fan | |
| Capeworth | Captain Valor | caped superhero with a big chest emblem | Shield Seal |
| | The Nightjar | cowled detective vigilante in dark grey | Night Seal |
| | Dr. Volta | inventor in a lab coat with an electric gauntlet | Bolt Seal |
| | Queen Mayhem | reformed villain with a jester crown and playing cards | Card Seal |
| | Commissioner Steele (Champion) | police chief in a trench coat with a signal lamp | |
| Toonvale | Mayor Gigglesworth | black-and-white rubber-hose mayor with a top hat | Grin Seal |
| | Professor Wackoff | wild-haired inventor with crates and gadgets | Crate Seal |
| | Captain Barnacle | cartoon sea captain with a captain's hat and an anchor | Anchor Seal |
| | Madame Mystery | fortune teller in a van-shaped hat with a crystal ball | Mask Seal |
| | Director Reel (Champion) | film director with a beret and megaphone | |
| Pantheos | Oracle Delphine | Greek oracle in a white chiton with laurels | Laurel Seal |
| | Pharaoh Sefu | young pharaoh with a striped headdress and crook | Ankh Seal |
| | Skald Bjorn | Norse poet-warrior with fur cloak and harp | Rune Seal |
| | Priestess Itzel | Mesoamerican sky priestess in a feather headdress | Plume Seal |
| | High Archon Selene (Champion) | robed leader with a sun and moon staff | |
| Respawn Reach | Speedrunner Zip | gamer with a headset and a stopwatch | Rush Seal |
| | Builder Bex | blocky-style miner with a pickaxe | Block Seal |
| | Arcade King Pix | gamer in a crown made of coins | Coin Seal |
| | Dungeon Master Lyle | robed game master with dice | Dice Seal |
| | Player Zero (Champion) | mysterious gamer whose face is a pixelated blur | |
| Hollowmere | Ranger Hollis | forest ranger with a hat and binoculars | Track Seal |
| | Professor Fogg | cryptozoologist in a rain slicker with a sonar device | Ripple Seal |
| | Countess Vesper | gothic noble in a high-collared cape | Fang Seal |
| | Dr. Ada Galvani | scientist with goggles and lightning rods | Spark Seal |
| | Old Man Barrow (Champion) | grizzled monster hunter with a lantern and camera | |

### Regular trainers and townspeople (per realm: 6 trainer classes + 4 townspeople)
| Realm | Trainer classes | Townspeople |
|---|---|---|
| Sakuraden | Dojo Student, Ninja, Mecha Cadet, Idol, Ronin, School Kid | Tea seller, shrine keeper, old sensei, kid |
| Capeworth | Sidekick, Cop, Lab Assistant, Henchman, Reporter, Masked Vigilante | Newspaper seller, citizen, scientist, kid |
| Toonvale | Prankster, Inventor, Sailor, Ghost Hunter, Cartoon Kid, Rubber-Hose Band Member | Baker, mail carrier, theater usher, kid |
| Pantheos | Hoplite, Temple Scribe, Viking, Moon Maiden, Druid, Sky Priest | Merchant, shepherd, pilgrim, kid |
| Respawn Reach | Speedrunner, Builder, Arcade Kid, Racer, Bard (RPG class), Pro Gamer | Shopkeeper NPC, quest giver, robot, kid |
| Hollowmere | Camper, Ghost Tour Guide, Fisher, Monster Hunter, Mad Scientist, Night Watch | Innkeeper, lumberjack, farmer, kid |

**60 trainer types and townspeople** (portrait for trainer classes, walk sheet for all).

**Shop and inn staff (shared):** Inn Healer, Ink Shop Clerk, Bindery Keeper (2 portraits + 3 walk sheets).

---

## C. Maps and Tilesets

**Tileset prompt template:**
```
Top-down 16x16 pixel tileset sheet for a Game Boy Color style RPG, [REALM] theme: [DESCRIPTION].
Include: ground, path, grass, tall grass (wild creature grass), water edges, trees, cliffs, fences, signs,
building roofs and walls, doors, windows. Arrange as a neat grid of square tiles, no text.
```

| Realm | Outdoor tileset | Town buildings | Interiors | Dungeon / special |
|---|---|---|---|---|
| Prologue Village (hub) | Meadow with ink-blue flowers, paved paths | Cottages, Professor's library-lab | House, lab with bookshelves | The Rift Gate (6 colored portals) |
| Sakuraden | Cherry trees, bamboo, stone lanterns, rice fields | Pagodas, dojos, neon tower blocks | Dojo, ramen shop, school room | Ninja Forest, Neon Hangar, Spirit Gate shrine |
| Capeworth | City streets, rooftops, parks, alleys | Skyscrapers, bank, newsroom | Apartment, lab, police HQ | Villain lair, sewer, orbital watchtower |
| Toonvale | Rolling cartoon hills, a desert road, the seafloor. **Make the first area black and white**, later areas in color | Squiggly houses, theater, a water tower | Cartoon house, theater stage | Haunted mansion, Pineapple Reef, WACKO factory |
| Pantheos | Marble paths, olive groves, desert sand, snowy fjord, jungle | Greek temples, pyramids, longhouses, Chinese moon pavilion, stone circle, step pyramid | Temple hall, tomb | Great Pyramid, Sky Bridge, Sacred Oak, Sun Pyramid |
| Respawn Reach | Chunky 8-bit plains, mushroom forest, blocky hills, racetrack | Arcade cabinets as buildings, castle | Arcade hall, save-point inn | Deep Mine (block world), Lag Temple dungeon, glitch zone |
| Hollowmere | Foggy pine woods, swamp, loch shore, snowy Frostpeak | Cabins, old church, castle | Cabin, castle lab | Silver Bridge, Pine Barrens, Loch Morrow, sunken city |
| Grand Anthology (league) | Giant open book plaza | Library-palace | 7 champion rooms (one per realm style + final) | |

**Count:** about 8 outdoor tilesets, 8 building sets, 8 interior sets, about 20 special-area tilesets.

**World map** (1 image): a hexagon of six realms around Prologue Village, drawn like a page in a storybook.
**Realm maps** (6 images): the town map screen for each realm.

---

## D. Battle Backgrounds (240 x 112 each)
```
Pixel art battle background for a Game Boy Color style monster RPG, [SCENE]. Two flat oval ground pads
(one lower-left for the player, one upper-right for the enemy). No creatures, no text.
```
3 per realm (grass, cave or indoor, and a special) + the hub + league + 12 Sovereign arenas = **32 backgrounds**.

| Realm | Grass | Cave / indoor | Special |
|---|---|---|---|
| Hub | Meadow | Professor's lab | |
| Sakuraden | Cherry field | Dojo | Neon rooftop |
| Capeworth | City park | Lab | Skyscraper roof at night |
| Toonvale | Cartoon hills | Theater stage | Seafloor |
| Pantheos | Olive grove | Tomb | Clouds above a temple |
| Respawn Reach | 8-bit plains | Mine | Inside an arcade screen |
| Hollowmere | Foggy woods | Castle lab | Loch at night |
| League | Open-book stadium | | |
| Sovereign arenas | One for each of the 12 Sovereigns, matching its look | | |

---

## E. Items (16 x 16 icons)

**Item-icon prompt template (do 10 to 16 at once):**
```
Sheet of 16x16 pixel art item icons for a Game Boy Color style RPG, evenly spaced in a grid, white background, no text:
[LIST OF ITEMS WITH SHORT DESCRIPTIONS]
```

### Inks (capture items): 10
Plain Ink (black ink pot), Fine Ink (blue ink pot with ribbon), Gilded Ink (gold ink pot), Master Ink (rainbow ink pot with crown), Sakura Ink (pink, blossom), Comic Ink (red, halftone dots), Toon Ink (black and white, cartoon eyes), Ichor Ink (gold glowing, Greek pattern), Pixel Ink (green, 8-bit cube), Moonblood Ink (dark red, crescent moon)

### Ascension items: 34
Core Drive (glowing robot core), Moon Locket, Star Brooch, Strange Fruit (swirly patterned fruit), Star Bead (orange orb with a red star), Sun Crystal, Utility Belt, Wild Card (a joker-style playing card, no face), Realm Gems x6 (pink, red, black-and-white, gold, green, dark blue), Arc Core (glowing chest reactor), Remaster Reel (film reel), Mail-Order Crate (crate stamped WACKO), Mystery Snack (dog biscuit box), Lucky Dime, Golden Pencil, Storm Hammer, Feather of Truth, Olive Branch, Elixir Peach, Grow Shroom (red mushroom), Flame Bloom (fire flower), Invinci-Star, Hero Leaf, Gold Ring, Ore Block, Power Pellet, Render Core (computer chip), Lightning Rod, Atomic Core

### Capture tools and offerings: 10
Banana Peel, Painted Tunnel, Giant Magnet, Falling Anvil, Honey Jar, Olive Branch Bundle, Sacred Feather, Gold Offering, Evidence Lens (old camera), Lorebook (glowing book)

### Sovereign Crests: 12 (one per Sovereign, a round medallion of its symbol) + Paragon Eggs: 6 (one per Paragon, patterned like its line)

### Healing and everyday items: about 14
Tonic, Super Tonic, Max Tonic, Full Restore Tonic, Revive Quill, Max Revive Quill, Burn Salve, Thaw Tea, Wake Bell, Antidote, Calm Charm (cures Fear), Clarity Tea (cures Sanity), Bond Treat, Repel Spray

**Item total: about 86 icons.**

---

## F. User Interface

| UI piece | Notes |
|---|---|
| Title screen + logo | "MYTHBOUND: The Six Realms", open book with six glowing realm symbols |
| Dialogue box | Paper-scroll style 9-slice frame |
| Menus | Pause menu, bag, party, Lorebook, save, options (frame + cursor arrow) |
| Battle HUD | Enemy and player HP boxes, HP bar (green/yellow/red), EXP bar, Bond hearts, status badges |
| Move menu | 4-move box + type color tags |
| **Type icons** | **20 badges**: Blaze, Tide, Verdant, Volt, Frost, Stone, Gale, Brawl, Venom, Mind, Spirit, Shadow, Metal, Radiant, Ki, Cape, Toon, Divine, Pixel, Dread |
| Status icons | 9: Burn, Freeze, Paralysis, Poison, Sleep, Confusion, Fear, Sanity, Fainted |
| **Rune Ring** (capture minigame) | Circle, spinning needle, glowing target zone, 3 success marks, ink-splat for a miss |
| Realm minigame screens | Arcade "High Score" overlay (Respawn Reach), Evidence Lens camera viewfinder (Hollowmere), Redemption bar (Capeworth), riddle stone tablet (Pantheos) |
| Hero/Villain meter | Bar with a shield icon on one end and a skull-mask on the other |
| Lorebook screens | Page layout, seen/caught markers, realm tabs (6), Sovereign pages |
| Ascension animation | Book pages flipping + glow burst frames (4 to 6 frames) |
| Chapter Seals case | Book cover with 24 badge slots |
| Fonts | Use a free pixel font (search "free pixel font OFL") rather than drawing one |

---

## G. Battle Effects (small animated sprite sheets, 4 to 6 frames)
One effect per type (**20 effects**) + Inscription ink-swirl + ink-splat (miss) + level-up sparkle + Awakening burst + "Comeback" flare = **25 effect sheets**.
```
Pixel art battle effect animation, 6 frames in a row, Game Boy Color style, [TYPE] attack: [DESCRIPTION, e.g. "a swirl of golden ki energy"]. White background.
```

---

## Grand Total

| Category | Images |
|---|---|
| Creatures (front, back, icon) | 714 |
| Characters (portraits + walk sheets, including main cast, 30 bosses, 60 trainers and townspeople, staff) | about 175 |
| Chapter Seal badges | 24 |
| Tilesets and maps | about 51 |
| Battle backgrounds | 32 |
| Items | about 86 |
| UI pieces | about 60 |
| Battle effects | 25 |
| **Total** | **about 1,170 images** |

**Don't make them all at once.** Start with the Phase 1 list (Section 9 of `GAME_DESIGN.md`): Style Lock test, the player, the Professor, the rival, the Sakuraden tileset, the 7 Sakuraden creature lines and the battle UI. Once those look right together, the rest follows the same recipe.
