# Checkfire — handoff notes (for the next session)

**Branch:** `claude/laughing-fermat-0bn51x` (all work committed and pushed). Game = `checkfire/index.html` (single self-contained file, ~9 MB).

## Build
```bash
cd checkfire
npm pack three@0.128.0 && tar xzf three-0.128.0.tgz      # Three.js r128 (cdnjs is blocked here; npm works)
python3 build.py package                                   # game.src.html + assets/*.glb + assets/thumbs -> index.html
```
- Edit `game.src.html` (never `index.html`). Rebuild after every change.
- Blender 4.0 (Ubuntu package, headless) is installed by the environment setup script. Models:
  `blender -b --python blender/<script>.py -- assets` for `park_assets.py`, `bedroom_assets.py`, `figures.py`, `equipment.py`
  (shared helpers in `blender/toykit.py`; previews go to `blender/previews/`).
- Room picker cards: `node tools/make_thumbs.js`, then rebuild.

## Tests (Playwright + bundled Chromium, software GL ~9 fps)
- `node tools/tests/full_games.js` — 4 computer-vs-computer games in auto-battle mode (slow: ~10–20 min).
- `node tools/tests/ui_screens.js` — menu, board, loadout, room picker, HUD screenshots.
- `node tools/tests/equipment_rooms.js` — armory/loadout with everything unlocked, abilities, darts, room interactables.

## What exists
- Real chess + alpha-beta AI; every capture is an FPS duel (attacker loses → attacker removed). Wounds persist.
- 6 toy fighters (Blender, `figures.glb`), 14 blasters + Scope/Stock/Big Clip/Power I–III + Chrome/Gold/Diamond (`equipment.glb`),
  gadgets (Grappling Hook, Jetpack, Propeller Hat), foam darts/rockets, ability visuals, interactables.
- Cream/navy/teal/orange UI: menu, board HUD, loadout screen (turntable), room picker, in-match HUD, armory.
- 14 rooms. Blender-modelled: **Kid's Bedroom** (`bedroom.glb`), **Chess Park** (`park.glb`).
  Still simple built-in shapes: Library Table, Diner Counter, School Gym, Toy Store, Greenhouse, Arcade, Attic, Beach Boardwalk
  (+ 4 neon arenas: Ruins, Citadel, Forge, Maze).

## Art direction (from Courtnee's ChatGPT reference sheets)
Stylized toy, beveled low-poly, warm/clean/playful. Palette: cream `#f6ead6`, navy `#1d2a44`, teal `#1f8a86`, orange `#f07a22`.
Teams: ivory/teal vs charcoal/orange. Keep exact displayed names and current gameplay as the baseline.
Decisions made: Thunder Coach twin openings side by side; Twin Blasters side by side; attachments teal+orange; foam dart =
blaster-coloured body + orange suction cup; foam rocket teal with orange nose/fins; Repair Core stays a green diamond.

## Next up
1. Courtnee's play-test feedback (performance, difficulty, gadget feel).
2. Blender models for the 8 remaining rooms (waiting on reference sheets, or model from the descriptions in `ROOM_BUILD`).
3. Polish: first-person toy hands, white crosses on the Repair Core, gadgets visible on enemies,
   decide if board pieces become toy figures.
4. Sharing: shareable link, Game Closet, pull request (only when asked).
5. Windows build: see `desktop/README.md` (Electron portable exe, rebuild after every game change).
