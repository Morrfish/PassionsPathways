# Morris Mayhem

A 2–4 player platform fighter (like Brawlhalla or Smash Bros.) where every fighter is a member of the
Morris family. It runs as a **Windows app (exe)**, an **Android app (APK)**, and in a web browser.

> **Status:** the game works end to end. **Jeffery Morris ("The Boss")** and **Patty Morris ("Mawmaw Mayhem")** are in,
> drawn from their graphic-novel artwork. The other 4 fighters (Speedster, Zoner, Trickster, Healer) are still **placeholders** that get
> replaced by family members as art and info come in. The shared family list is the Google Doc
> "Morris Mayhem - Family Fighters (fill this in)" in the "Morris Mayhem (family fighting game)" Drive folder.

## How the game works
- Hits raise a player's **damage %**. The higher it is, the farther they fly.
- Fly off the screen and you lose a life. Last one standing wins.
- 2–4 players: any mix of people and computer players (Easy, Normal, Hard).
- Controls: 2 people can share one keyboard, up to 4 game controllers work (Xbox, PlayStation, Switch Pro,
  or any USB/Bluetooth pad), and phones and tablets get on-screen touch buttons.
- Each fighter has the same basic attacks (attack + a direction) and **4 specials of their own**
  (special alone, side + special, up + special, down + special).
- Stages: Backyard BBQ, Rooftop Night, The Dinner Table.

## Controls
| | Keyboard 1 | Keyboard 2 | Controller |
|---|---|---|---|
| Move | A / D | ← / → | Stick or D-pad |
| Jump (3 in a row) | W or Space | ↑ or Num 0 | A or Y |
| Attack | F | Num 1 or K | X |
| Special | G | Num 2 or L | B |
| Dodge | H | Num 3 or ; | Bumpers / triggers |
| Pause | Esc | Backspace | Start |

On the fighter-select screen, press **Attack on a controller** to join. Use **left/right** to change fighters
and **Start** to begin.

## Getting the apps
Every push that changes `morris-mayhem/` runs the **Morris Mayhem apps** GitHub Action. Open the run in the
repo's **Actions** tab and download:
- **MorrisMayhem-Windows**: unzip it to get `MorrisMayhem.exe`. Windows may say it's from an unknown
  publisher. Click **More info → Run anyway**. It opens full screen; **F11** switches to a window, **Ctrl+Q** quits.
- **MorrisMayhem-Android**: unzip it to get `MorrisMayhem.apk`. Copy it to the phone, open it, and allow
  "install unknown apps".

## Adding a family member
1. Put a face photo with the background cut out at `src/img/<id>.png` (square, about 512×512).
2. In `src/js/data.js`, copy one fighter entry, set `id`, `name`, `title`, `photo: 'img/<id>.png'`,
   colors, stats and the 4 specials. The ability kinds are listed at the top of the file and in
   `ABILITIES` in `src/js/engine.js`.

## Files
- `src/js/data.js`: fighters, stages, basic attacks (most changes happen here)
- `src/js/engine.js`: physics, hits, knockback, ability kinds, KOs, sound
- `src/js/ai.js`: computer players
- `src/js/sprites.js`: artwork fighters (pose atlas + which pose each move uses)
- `src/js/render.js`: stage art, fighter drawing, HUD
- `tools/slice_sprites.py`: cuts the artist's labeled pose sheets (with name tags) into a game atlas (`slice_patty.py` for Patty's untagged sheets)
- `src/js/input.js`: keyboard, controllers, touch
- `src/js/ui.js`: menus and the game loop
- `desktop/`: Windows app shell (Electron). `www/` and `android/` are generated.

## Developer commands
```bash
npm install && npm run build      # copies src/ to www/
cd desktop && npm install && npm start   # run as a desktop app
cd desktop && npm run build       # makes desktop/dist/MorrisMayhem.exe
```
