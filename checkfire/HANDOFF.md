# Checkfire — handoff notes (for the next session)

**Branch:** `claude/vigilant-fermi-qapd7m` (continues `claude/laughing-fermat-0bn51x`; all work committed and pushed). Game = `checkfire/index.html` (single self-contained file, ~12.5 MB).

## Build
```bash
cd checkfire
npm pack three@0.128.0 && tar xzf three-0.128.0.tgz      # Three.js r128 (cdnjs is blocked here; npm works)
python3 build.py package                                   # game.src.html + assets/*.glb + assets/thumbs -> index.html
```
- Edit `game.src.html` (never `index.html`). Rebuild after every change.
- Blender 4.0 (Ubuntu package, headless) is installed by the environment setup script. Models:
  `blender -b --python blender/<script>.py -- assets` for `park_assets.py`, `bedroom_assets.py`, `rooms_assets.py`, `figures.py`, `equipment.py`
  (`rooms_assets.py` takes `--no-previews` after `assets` to skip its eight line-up renders)
  (shared helpers in `blender/toykit.py`; previews go to `blender/previews/`).
- Room picker cards: `node tools/make_thumbs.js`, then rebuild.

## Tests (Playwright + bundled Chromium, software GL ~9 fps)
- `node tools/tests/full_games.js` — 4 computer-vs-computer games in auto-battle mode (slow: ~10–20 min).
- `node tools/tests/ui_screens.js` — menu, board, loadout, room picker, HUD screenshots.
- `node tools/tests/equipment_rooms.js` — armory/loadout with everything unlocked, abilities, darts, room interactables.
- `node tools/tests/board_hands.js` — the board with toy-fighter pieces + the first-person hands on every blaster.
- `node tools/tests/room_views.js [room ...]` — two screenshots of each room (player start + raised corner) to check props.

## What exists
- Real chess + alpha-beta AI; every capture is an FPS duel (attacker loses → attacker removed). Wounds persist.
- 6 toy fighters (Blender, `figures.glb`), 14 blasters + Scope/Stock/Big Clip/Power I–III + Chrome/Gold/Diamond (`equipment.glb`),
  gadgets (Grappling Hook, Jetpack, Propeller Hat), foam darts/rockets, ability visuals, interactables.
- Board pieces are the toy fighters on team-coloured bases (`boardPiece()`); the menu option "Board pieces" switches back to
  classic chess shapes. First-person view has gloved toy arms holding the blaster (`viewHands()`, model `Fig_hand` in
  `figures.glb`, mirrored for the left hand; per-blaster hand spots in `HAND_POS`).
- Cream/navy/teal/orange UI: menu, board HUD, loadout screen (turntable), room picker, in-match HUD, armory.
- 14 rooms. Blender-modelled from reference sheets: **Kid's Bedroom** (`bedroom.glb`), **Chess Park** (`park.glb`).
  Blender-modelled from the written descriptions (no sheets yet): **Library Table, Diner Counter, School Gym, Toy Store,
  Greenhouse, Arcade, Attic, Beach Boardwalk** — 72 props in `rooms.glb` (`blender/rooms_assets.py`, prefixes
  `L_ D_ G_ T_ H_ C_ A_ B_`). Layouts and collision boxes are unchanged from the block versions; in `game.src.html`
  each prop is placed with `roomKit().prop(model, x, z, turn, w, d, h, fallbackColour)` = model + invisible box.
  Still built-in shapes: the 4 neon arenas (Ruins, Citadel, Forge, Maze), and the far backgrounds (walls, signs, Ferris wheel).

## Art direction (from Courtnee's ChatGPT reference sheets)
Stylized toy, beveled low-poly, warm/clean/playful. Palette: cream `#f6ead6`, navy `#1d2a44`, teal `#1f8a86`, orange `#f07a22`.
Teams: ivory/teal vs charcoal/orange. Keep exact displayed names and current gameplay as the baseline.
Decisions made: Thunder Coach twin openings side by side; Twin Blasters side by side; attachments teal+orange; foam dart =
blaster-coloured body + orange suction cup; foam rocket teal with orange nose/fins; Repair Core stays a green diamond.

## Next up
1. Courtnee's play-test feedback (performance, difficulty, gadget feel).
2. When Courtnee's reference sheets for the 8 rooms arrive, restyle the matching props in `blender/rooms_assets.py`
   (keep the footprints in the `prop(...)` calls). Decide whether the 4 neon arenas stay, get restyled, or go.
3. Polish: tune the first-person hand positions per blaster after play-testing, give enemy fighters a two-handed hold,
   white crosses on the Repair Core, gadgets visible on enemies.
4. Sharing: shareable link, Game Closet, pull request (only when asked).
