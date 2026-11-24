---
name: morris-mayhem-builder
description: Build, extend, fix and ship Morris Mayhem, the 2-4 player Brawlhalla/Smash-style platform fighter where every character is a member of the Morris family (in morris-mayhem/ of morrfish/passionspathways). Use whenever the user wants to add or change a family fighter (from photos and a description), design or balance special moves, add a stage, change controls/menus/AI, or build the Windows .exe or Android app, even if they just say "the fighting game", "the family game" or name a family member.
---

# Morris Mayhem builder

Morris Mayhem lives in `morris-mayhem/` in the `morrfish/passionspathways` repo. It is plain
JavaScript on a canvas: no game engine, no bundler, no external libraries. It ships three ways from the
same `src/` folder: a web page, a Windows portable exe (Electron in `desktop/`), and an Android APK
(Capacitor). The GitHub Action `.github/workflows/morris-mayhem-apps.yml` builds both apps on push.

The user (Courtnee) is a teacher, not a developer. Speak plainly, show screenshots, and keep
technical detail out of the final message unless asked. Keep content family-friendly: it's their real
family, so jokes are affectionate, never mean.

## Where the family info lives
Courtnee works out the family details with ChatGPT. The shared source of truth is her Google Drive folder
**"Morris Mayhem (family fighting game)"** (folder id `1IkLvScrsMOngzETPGYWHJ2Hu8jN7T3GE`):
- Doc **"Morris Mayhem - Family Fighters (fill this in)"** (id `157WX7olQfRaXnhOyR-zpXnydPu7ntIfHvex-MLdab1o`):
  one templated section per person with a STATUS line. Build fighters marked **READY**, then change their
  status to **IN GAME** (needs the Google Docs connector; if it isn't on, tell her instead of making a copy).
- Subfolder **"Photos and art"** (id `1yIfBH_4MyfGRpqaA0XolfcBACCmoja97`): pictures named `<id>-face.png`, `<id>-body.png`.
Read the doc with the Drive connector's `read_file_content` and download pictures with `download_file_content`.
If it isn't reachable, ask her to paste the info and attach the pictures in chat.

## Art direction and artwork fighters
- Style: fun graphic novel. Brand colors (from the MM logo): purple `#8f2bd6`/`#7B2CBF`, gold `#ffc21a`,
  orange `#ff7a00`, cyan `#1fd1ef`, dark `#1a0b2e`. Logo `src/img/logo.webp`, icon `assets/icon-only.png`.
- ChatGPT's art IS the game art (Courtnee said: use the images as the game images, not as references).
- Artwork fighters set `sprite: '<id>'` in `MM.FIGHTERS`; `src/js/sprites.js` holds `MM.SPRITES[id]` =
  atlas image + frames `[x,y,w,h,anchorX,anchorY]` (anchor = under the head, at the feet) + `moves`
  (which pose row each attack/special uses). `render.js` `pickFrame()` maps state → pose
  (idle/run/jump/hurt rows, attack rows windup→hit→follow-through→recover). Projectiles can use
  `sprite: '<frame>'` (e.g. the parcel, the dogs). Cartoon bodies are only for placeholders.
- ChatGPT sheets come as labeled 4×4 grids (labels in the left column, title banner on top, near-invisible
  colored fringe pixels that must be dropped). `tools/slice_patty.py <art dir> <out dir>` cuts poses by
  connected components, drops labels/title, anchors each pose, scales by 0.62 and packs a WebP atlas plus
  frames JSON. Use `tools/slice_sprites.py <id> <art dir> <out dir>` (newer sheets with yellow name tags under each
  pose; add the character to its `CHARACTERS` config with row names). Paste the JSON into `sprites.js` with a
  `moves` map (row per attack/special, `airRow`, `upPose`, `riseLate`, optional `counterHit`). Pose timing comes
  from the special's `kind`, so new fighters usually need no render code. Always use the newest APPROVED
  portrait named in the doc (e.g. patty-face-v6, jeff-face-v3); sprite sheets keep their own designs.
- Face art → `src/img/<id>.png` 512² (used for HUD, select, family cards).
- Story mode plan (not built yet): protagonists Mandi, Jadden, Courtnee, Codee, Haylie, Sara, Jorie fight
  through the family, beat Jeff ("The Boss"), then Patty appears as the real, harder secret final boss.
  Quick matches: 1v1, 1v1v1, 1v1v1v1, 2v2 (teams not built yet). Every fighter name includes their real name.
  Patty's ultimate "Mawmaw's Last Laugh" and entrance/taunt/victory poses are drawn (ultimate sheet) but not wired in yet.

## Forms, teams, move list (built)
- Forms: a fighter with `forms: [...]` (see Mandi in data.js) gets one merged def per form (`MM.formDefs`).
  `applyForm()` swaps look/stats/moves; the `transform` ability kind (down-special, also the Switch input:
  R / Num 4·J / pad Y / touch ⇄) is a 0.65 s vulnerable spin, cancelled by a hit, 2 s cooldown; cooldowns
  (`f.cd`) are shared across forms. Each form has its own `sprite` atlas.
- 2v2: `MM.newGame(players, stage, stocks, { teams, ff, time })`; players carry `team: 'A'|'B'`; `MM.sameTeam`
  blocks friendly fire in `applyHit` and AI targeting; team out only when all members out; timer tiebreak =
  lives, then lower damage, else draw.
- Move List screen (`#moves`) is built from each def's `attackNames` and `specials` + `KIND_TEXT` in ui.js.
- Ultimates (built): `def.ultimate` {name, sprite (<id>-ult atlas from tools/slice_ultimates.py), type
  'catch' (catchAt/finishAt/radius/dmg/kbMul) or 'stampede' (spawnAt/sweepDur/dmg/kbMul), poses}. Meter
  0.65/dmg dealt, 0.35/dmg taken, full → Ultimate input (E · Num5/U · stick click · touch ULT · Attack+Special).
  A hit cancels it and releases caught fighters (`releaseUlt`). Placeholders get "Mayhem Burst".
- Story mode (built, src/js/story.js): the 7 Morris kids are the heroes (mandi, jadden, courtnee, codee, haylie,
  sara, jorie); routes = ChatGPT's storyRoute() rule (= story-routes.json); 10 family free-for-alls, Jeff
  (The Boss), then secret Patty. Fights with relatives not yet in MM.FIGHTERS show "coming soon" and are
  skipped (never substitute someone else); a hero is playable once that kid is a fighter. Saves per hero in
  `mm_story_v1_<hero>`. Story ids map `jeff` → `jeffery`; route places map to stage ids by name prefix.
- Still to build: entrance/taunt/victory poses (row 2 of the ultimate-personality sheets).

## Code map
| File | What's in it |
|---|---|
| `src/js/data.js` | `MM.FIGHTERS` (roster), `MM.STAGES`, `MM.NORMALS` (shared basic attacks). Most edits happen here. |
| `src/js/engine.js` | Fixed 60 Hz sim: movement, jumps (1 + 2 air), dodge, hitboxes, knockback, `ABILITIES` (every special kind), projectiles, traps, blast zones/KOs, WebAudio sfx. |
| `src/js/ai.js` | `MM.aiThink(G, f)` returns a controller-shaped input. Levels 1–3. |
| `src/js/stage-art.js` | Illustrated arenas: background + prop atlas per stage (`src/img/stages/`), where each platform prop's walkable top is (`sx0`,`sx1`,`sy`), decor. Atlases come from `tools/slice_stage_props.py`. Collision stays in `MM.STAGES` (data.js; `move` makes a platform sway and carry fighters). |
| `src/js/render.js` | Camera, procedural stage art (`STAGE_ART` keyed by stage `theme`), fighter drawing, `MM.drawHead` (photo or cartoon face), HUD, portraits. |
| `src/js/input.js` | Devices `k1`, `k2`, `p0`–`p3` (Gamepad API), `touch`. All return `{x,y,jump,attack,special,dodge,pause}`. |
| `src/js/ui.js` | Screens (title with a CPU demo behind it, select, how-to, family cards, pause, results), slot setup saved under `mm_*` localStorage keys, main loop. `MM.debug.startMatch(setup)` starts a match for tests. |

Scripts are classic `<script>` tags with a global `MM` namespace (not ES modules) so the game runs from
`file://`, Electron and Capacitor without a server. Keep it that way.

## Adding a family member (the main job)
1. **Photo → head.** Fighters are cartoon bodies with a big round photo head. Crop the face photo square
   around the head with a little margin, remove the background (Python `rembg` if installable, otherwise a
   careful manual crop on a circle is fine because the head is clipped to a circle anyway), and save
   512×512 PNG as `src/img/<id>.png`. Never commit original full-size family photos; only the cutout.
   If they send a body photo, take the outfit colors from it for `color`/`accent`, plus `skin` and `hair`.
2. **Entry in `MM.FIGHTERS`.** Copy an existing entry. Replace a placeholder (Brawler, Speedster,
   Zoner, Healer; Brawler → Jeffery, Tank → Patty, Trickster → Mandi) rather than piling on, until all placeholders are gone. Fields are documented
   at the top of `data.js`.
3. **Stats.** Keep within these ranges: speed 5–9, air 4.4–7, jump 13.5–16.5, weight 0.8–1.4,
   power 0.85–1.35, size 0.85–1.2. Trade-offs: fast fighters are light/weak, heavy ones are slow.
   Little kids can be small and fast; that's a fun advantage, not a weakness.
4. **Specials.** Turn each move idea into an ability `kind`:
   - `projectile` (throw something; `emoji` sets the picture, plus `count`/`spread`, `grav`+`vy` for arcs, `boomerang`)
   - `shockwave` (waves along the ground both ways), `dash` (charge; `armor:true` ignores small hits)
   - `rise` (up recovery with a hit; `parachute:true` floats down after), `teleport` (`up:true` for recovery; aims with the stick)
   - `slam` (dive + landing wave), `spin` (multi-hit), `counter` (blocks and reflects)
   - `pack` (several runners along the floor, e.g. Patty's dogs; `sprites`, `names`)
   - `heal` (removes damage %), `trap` (lies on the floor; `emoji`), `buff` (faster/stronger for `dur` frames)
   Every fighter must have an `up` special that recovers (`rise` or `teleport` with `up:true`).
   If an idea needs a new kind, add it to `ABILITIES` in `engine.js` with `start()` and `tick()`;
   set `a.box` + `a.hitProps` on frames it should hit. Add a line to `KIND_TEXT` in `ui.js`.
   An emoji projectile is the quickest way to make a move personal ("throws 🍕"). For custom art, a
   small transparent PNG can be added later by extending `drawProj`.
5. `taunt`: their catchphrase, short (≤ 30 characters).

## Rules to keep
- 2–4 players, any mix of people and CPUs; up to 4 controllers plus 2 keyboard players plus touch.
- Damage % + knockback, lives (stocks), blast zones. Basic attacks are shared; specials are personal.
- Photos are drawn mirrored when facing left (fine for faces); text is never mirrored.
- Keep it 60 fps on a school laptop: no per-frame image filters, few `shadowBlur`s.
- Balance check after changing numbers: run the KO test (below). Side attacks should KO around
  100–130% from mid-stage and up attacks around 150–170%.

## Testing (always before shipping)
- `npm run build`, serve `src/` (e.g. `python3 -m http.server`), and drive it with Playwright Chromium.
  Clear localStorage first. Start matches with `MM.debug.startMatch({ players: [{slot:0, fighter:'id', dev:'k1'}, {slot:1, fighter:'id', cpu:true, level:3}], stage:'backyard', stocks:3 })`.
- Check: no page errors; a 4-CPU match finishes and shows results; keyboard input moves P1 (hold keys
  ≥ 50 ms, since `press` is too fast for a 60 Hz poll); phone landscape (`devices['iPhone 13 landscape']`)
  shows touch controls; the family cards screen lists each fighter's specials.
- KO test: put two fighters 60 px apart, set the defender's damage, start an attack on the attacker
  (`f.act = {type:'normal', name, m: MM.NORMALS[name], t:0, hit:new Set(), pose, air:false, dur}`),
  step until KO, and read the KO %.
- Look at screenshots of each new fighter in a match and on the select screen.

## Building the apps
- **Windows:** `cd desktop && npm install && npm run build` gives `desktop/dist/MorrisMayhem.exe`
  (portable, ~75 MB; this works on Linux without wine). Smoke test: `xvfb-run` + Playwright `_electron`
  with `executablePath: desktop/node_modules/electron/dist/electron`, args `['--no-sandbox', '.']`.
  The exe is too big for most chat or Drive uploads, so point her to the GitHub Action artifact
  `MorrisMayhem-Windows`. Remind her: SmartScreen → More info → Run anyway.
- **Android:** built only by the GitHub Action (needs Java + the Android SDK): artifact `MorrisMayhem-Android`.
  The app is locked to landscape.
- Icon: `assets/icon-only.png` (1024², used by both apps) and `src/icon.png` (256²).

## Shipping
Commit to the session's branch and push. The Action runs on that branch and on `main`. Tell her what
changed in a few short bullets, with a screenshot of the new fighter in action.
