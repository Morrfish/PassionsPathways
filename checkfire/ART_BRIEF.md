# Checkfire — Art Brief (for ChatGPT reference sheets → Claude's Blender models)

Paste this whole file into ChatGPT when asking for new reference sheets. It lists what is already modelled,
what still needs art, the exact in-game names, and how sheets should be laid out so they can be built in Blender.

## The game in one line
Chess where every capture becomes a first-person toy-blaster duel between two toy fighters, fought in a "room"
the player picks (a kid's bedroom floor, a park chess table, a diner counter, …). Everything is toy-sized and toy-styled.

## Style rules (match these on every sheet)
- **Stylized toy, beveled low-poly**: chunky rounded edges like moulded plastic or carved stone; warm, clean, playful.
- **Palette**: cream `#f6ead6`, navy `#1d2a44`, teal `#1f8a86`, orange `#f07a22`, plus each prop's own toy colours.
- **Teams**: ivory + teal vs charcoal + orange.
- **Fictional, nonfunctional foam toys only** — no real brands, logos or real-world weapons.
- Keep the **exact displayed names** below; labels on sheets are visual concepts, current gameplay stays the same.

## Already done (references received and modelled — no new art needed)
- Six toy fighters (Pawn, Knight, Bishop, Rook, Queen, King) in both team colours.
- **Kid's Bedroom** (tin robot, boxing ring, toy train + flatbed, loading platform, bed, dresser, bookshelf, window, star poster).
- **Chess Park** (stone chess table, benches, the two older players at their own table, fountain, lampposts, trees, flower beds).
- All 14 blasters, Scope / Stock / Big Clip, Power I–III sleeves, Plain / Chrome / Gold / Diamond finishes.
- Gadgets: Grappling Hook, Jetpack, Propeller Hat. Pickup: Repair Core (green diamond).
- Foam Dart, Foam Rocket, Impact Star, Barrier, Rampart, Pounce, Blink, Overdrive, Royal Mend.
- Interactables: Jump Pad, Spring Box, Trampoline, Pinball Bumper, Lava, Hot Coffee, Cactus Patch.
- Game UI (menus, loadout, room picker, in-match HUD).

## FIRST PASS DONE, SHEETS WELCOME — the eight remaining rooms
These eight rooms now have Blender toy models made from the written descriptions below (see
`blender/previews/rooms_<room>.png` for a line-up of each room's props). A reference sheet for any of them will be used
to restyle those props to match — so sheets are still the best way to steer the look.
Each room is a square play area about 48 × 48 (the toy fighters are ~2 tall, so the room is "giant" around them).
For each room, please make one sheet with: **an eye-level overview, a top-down layout, and one panel per key prop**
(front + side, or 3/4). Note anything that moves or can be climbed. The props listed are what's in the game now — feel free
to restyle them, but keep the same kinds of objects so the layout still works.

| Room (exact name) | Setting | Key props currently in the room |
|---|---|---|
| **Library Table** | duel on top of a wooden library table; giant bookshelves around | book stacks, book "stairs" you can climb, open book in the middle, pencil cup with pencils, ruler, erasers, desk lamp |
| **Diner Counter** | duel on a mint speckled diner counter; stools, jukebox, neon "DINER" sign around | ketchup + mustard bottles, salt + pepper shakers, pie under a glass dome, coffee mugs, plate stack, napkin dispenser, menu stand, hot coffee spills (hazard) |
| **School Gym** | gym floor with court lines, painted block walls | climbable bleachers on both sides, gym mats, traffic cones, trampolines, ball cart, vaulting box, basketball hoops, "GO TEAM!" banner |
| **Toy Store** | pastel checker floor, striped walls, "TOYS!" sign | shelf aisles of boxed toys, giant rubber duck (centre), teddy bears, building bricks, spring boxes, spinning tops, display toy train on a loop |
| **Greenhouse** | terracotta tile floor, glass walls and roof | raised planters, big potted plants, cactus patches (hazard), potting bench, hanging baskets, central water bed/fountain |
| **Arcade** | dark neon carpet, neon strips, "ARCADE" sign | game cabinets, air hockey tables, claw machines, pinball bumpers, ticket counter |
| **Attic** | old planks, wooden beams, round window with a dusty light beam | cardboard box stacks, old trunk, rolled-up rug, rocking horse, dress form, brick chimney (centre), hanging light bulb |
| **Beach Boardwalk** | half boardwalk, half sand; ocean and Ferris wheel in the distance | benches, trash cans, lamp posts, lemonade stand, beach umbrellas, sandcastles, lifeguard chair, cooler, beach towels, beach ball |

Optional: the four **neon arenas** (Neon Ruins, Glass Citadel, Ember Forge, Verdant Maze) still have their original
dark sci-fi look. Courtnee can decide whether to keep, restyle or remove them.

## Optional smaller sheets
- **First-person toy hands** — a first version is in (gloved hands in team colours); a sheet would help refine them.
- **Repair Core detail** — done: the green diamond now has a large white cross on every face.
- **Gadgets worn by fighters** — a first version is in (see `tools/tests/shots/gear_*.jpg`); a sheet would refine how the
  Propeller Hat sits on crowns, plumes and mitres.
- **Board pieces** — the board now uses the toy fighters (classic shapes are still a menu option).

## Exact names (for reference)
**Blasters → who can use them**
| Blaster | Pieces |
|---|---|
| Carbine | Pawn (starting) |
| Nail Driver | Pawn |
| Crossbow | Pawn, Knight, Bishop, King |
| Scattergun | Knight (starting) |
| Thunder Coach | Knight |
| Ray Lance | Bishop (starting) |
| Arc Pistol | Bishop |
| Siege Mortar | Rook (starting) |
| Rampart Minigun | Rook |
| Storm Rifle | Queen (starting) |
| Twin Blasters | Queen |
| Railgun | Queen |
| Crown Repeater | King (starting) |
| Hand Cannon | King |

**Classes / abilities**: Pawn = Vanguard / Barrier · Knight = Lancer / Pounce · Bishop = Oracle / Blink ·
Rook = Bastion / Rampart · Queen = Sovereign / Overdrive · King = Monarch / Royal Mend.

**Attachments**: Scope (Optic slot), Stock, Big Clip (Clip slot), Power I / II / III (Barrel slot).
**Finishes**: Plain, Chrome, Gold, Diamond. **Gadgets**: Grappling Hook, Jetpack, Propeller Hat. **Pickup**: Repair Core.

## How to lay out a sheet (works best for Blender)
- One item per panel, plain light background, even lighting, no heavy shadows.
- Straight-on **front / side / top** views (back too for anything worn), plus one 3/4 "beauty" view.
- Show scale next to a toy fighter outline (~2 units tall) or give rough proportions.
- Colour callouts with hex codes; mark team-coloured parts.
- For rooms: top-down layout + eye-level overview, and say which props move or can be climbed.
