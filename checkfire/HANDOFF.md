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

## Windows .exe
`launcher/build_exe.sh` (needs Go) cross-compiles `dist/Checkfire.exe`: one file that carries `index.html`, serves it on
this computer only (127.0.0.1:47616) and opens it in its own Edge/Chrome app window with a private profile, so saves and
unlocks persist. A copy is committed as `checkfire/Checkfire.exe` so there is a download link; rebuild it after every `build.py`
(`launcher/build_exe.sh`, then copy `dist/Checkfire.exe` over it). Not code-signed, and never run on real
Windows from this environment (only the same code as a Linux build was tested).

## Same-network multiplayer ("Play a friend")
- **Host side:** `launcher/net.go`. Only after "Host on this network" is clicked in the exe's own window does the launcher
  listen on the network (port 47620): it serves the same page plus `/ws`, a tiny WebSocket relay (standard library only).
  Players pair by a 4-letter room code; the relay just passes messages between the two. No names, no accounts.
- **Game side:** the `NET` block in `game.src.html`. The player who makes the game is White. Moves are sent as made
  (`mv`). A capture sends both players to the loadout; when both press "Enter the room" they exchange blaster, gadget and
  (from the attacker) room and seed (`rdy`), then fight in one shared room, attacker at one end, defender at the other.
  In the duel each machine sends its position ~20×/s (`s`), decides the hits it lands (`hit`), and owns its own health;
  `dead` / `fin` settle the result so both boards agree. Shots, rockets and abilities are mirrored for looks
  (`f`, `pj`, `ab`). If a player leaves, the computer takes over their side. Network games are not saved.
- **Limits:** needs the exe (a page opened as a plain file or from an https site cannot host or join); not cheat-proof
  (each machine is trusted about its own hits); moving props such as the train are simulated separately on each machine;
  the grappling rope is not shown on the other player; team colours are the classic two.
- Test: build the launcher for this machine, then `node tools/tests/network.js <launcher binary>` (two browsers, ~3 min).

## Tests (Playwright + bundled Chromium, software GL ~9 fps)
- `node tools/tests/full_games.js` — 4 computer-vs-computer games in auto-battle mode (slow: ~10–20 min).
- `node tools/tests/ui_screens.js` — menu, board, loadout, room picker, HUD screenshots.
- `node tools/tests/equipment_rooms.js` — armory/loadout with everything unlocked, abilities, darts, room interactables.
- `node tools/tests/board_hands.js` — the board with toy-fighter pieces + the first-person hands on every blaster.
- `node tools/tests/holds.js [index.html] [prefix]` — every blaster's two-handed hold: on a fighter (3 angles + aiming up/down)
  and in first person (idle, aiming, mid-reload). Point it at an older build to make "before" shots.
- `node tools/tests/gear.js` — Propeller Hat / Jetpack on all six fighter types in both teams; Repair Core in five rooms.
- `node tools/tests/board_gadgets.js` — both board styles through a move and a capture; loadout preview with each gadget.
- `GAME_MS=600000 node tools/tests/full_games.js` — the per-game time limit is adjustable; unfinished games are reported.
- `node tools/tests/story_draw.js` — the code-locked teacher settings, both draw rules, story mode colours and unlocks.
- `node tools/tests/floors.js` — scans every room for two level surfaces at the same height (what makes floors flicker).
- Latest results: `TEST_RESULTS.md`; comparison sheets: `tools/tests/shots/`. Things only a real PC can answer: `PLAYTEST_NOTES.md`.
- `node tools/tests/room_views.js [room ...]` — two screenshots of each room (player start + raised corner) to check props.

## What exists
- Real chess + alpha-beta AI; every capture is an FPS duel (attacker loses → attacker removed). Wounds persist.
- 6 toy fighters (Blender, `figures.glb`), 14 blasters + Scope/Stock/Big Clip/Power I–III + Chrome/Gold/Diamond (`equipment.glb`),
  gadgets (Grappling Hook, Jetpack, Propeller Hat), foam darts/rockets, ability visuals, interactables.
- Board pieces are the toy fighters on team-coloured bases (`boardPiece()`); the menu option "Board pieces" switches back to
  classic chess shapes.
- Two-handed holds everywhere (first person, enemies, loadout turntable) from one function, `holdHands()`:
  a fist on the grip plus, per blaster (`HOLD` table), an open palm under the fore-end, both hands round the grip
  (pistols: Arc Pistol, Crown Repeater, Hand Cannon) or one blaster per hand (Twin Blasters). The palm's height and width
  are measured from each blaster model (`gunUnder()`). Fighters' arms are stretched shoulder→elbow→wrist every frame
  (`poseArms()`), so the hands stay on when the enemy aims up or down. Bot shots still start from the old one-handed
  muzzle spot (`shotMuzzle`), so gameplay is unchanged. Models: `Fig_hand`, `Fig_fist`, `Fig_palm`, `Fig_upper`, `Fig_fore`,
  `Fig_sleeve` in `figures.glb`.
- Enemies wear a Propeller Hat or Jetpack (by piece id, even/odd) in team colours — looks only (`wearGear()`; it measures
  each fighter's head gear and back so hats clear crowns/plumes and jetpacks sit outside capes). The loadout preview uses
  the same placement.
- Repair Core has a large glowing white cross on all eight faces (the old ones were buried under the surface).
- **Draw rules:** threefold repetition and the fifty-move rule (`checkEnd()`, `posKey()`, `drawSig()`; history is saved with the game).
- **Flickering floors fixed:** the library/diner tabletop slab sat at exactly floor height, and the same slab was being
  built by mistake under all four neon arenas (their `edge` colour was read as "this is a tabletop room").
- **Settings + teacher code:** main menu → Settings. The old Armory "Practice: unlock everything" button is gone; it now
  lives under Teacher tools, shown after entering the code **MORRISFIGHT6** (only a hash of it is in the page; tools stay
  open until the page is closed). Tools: practice unlock, unlock all story colours/opponents, +1000 credits.
- **Story mode:** main menu → Story mode. Eight parody champions in `STORY` (Paul Morefun, José Capablanket, Mikhail Tall,
  Bobby Fidget, Anatoly Carpool, Judit Polka-Dot, Garry Casserole, Magnet Carlsbad), each with a difficulty, a home room
  (used when the room is "Battlefield pick"), lines of dialogue and a colour set. You play White; beating one unlocks the
  next and their colours (`PROF.skins`, `PROF.story`), chosen under "Your colours" (`PROF.skin`). `applySkins()` recolours
  both sides (toy fighters, classic pieces, hands, gear, glows).
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
3. Act on `PLAYTEST_NOTES.md` when Courtnee returns it (hand spots per blaster live in `HOLD`; board readability; difficulty).
4. Still pending Courtnee's say-so: the four neon arenas (left as-is), publishing, a main-branch pull request, the Game Closet.
