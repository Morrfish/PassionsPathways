# Checkfire

Chess where every capture is a firefight. Open `index.html` in a browser — it's one self-contained file (Three.js is inlined), so it also runs offline or from a USB drive.

- **Real chess:** castling, en passant, promotion, check, checkmate, stalemate, draw by threefold repetition and the fifty-move rule.
- **Story mode:** beat eight toy parodies of famous chess champions, one after another; each one you beat unlocks their colours for your own pieces.
- **Play a friend (same network):** run `Checkfire.exe` on one computer, choose Host, and other players on the same Wi-Fi open the address it shows; pair up with a 4-letter code. Every capture is a live duel between the two players.
- **Game rules:** switch off flying gadgets or limit everyone to plain starter blasters. Every duel starts with a 3-second shield, a scoped miss drops your scope, and most blasters do less damage at long range.
- **The King fights up close:** press V to swing a Broadsword, upgradable to a Glow Blade and then a Lightning Hammer that throws lightning. Once per duel a knocked-down King gets a Last Stand: one pistol shot, and a hit puts him back on his feet.
- **Sights:** buy a different aiming mark in the Armory (dot, ring, star, heart, laser sight).
- **Settings:** teacher tools (practice unlock and more) open with a code.
- **Captures become FPS duels.** Win and you take the square; lose and your attacker is destroyed.
- **Six classes:** each piece has its own HP, weapon and ability (Vanguard, Lancer, Oracle, Bastion, Sovereign, Monarch).
- **Wounds carry over** between battles, with 8 HP of repairs per turn.
- **Regicide:** a failed attack can expose a king to a direct duel.
- **Pick your room before every duel (14 rooms):** Kid's Bedroom (teal star walls, star duvet, red rug, wind-up tin robot, boxing ring with stretchy ropes, rideable red-and-blue train with open cars), Chess Park (the duel is on a stone park table; two older friends play a quiet game at their own table nearby, with benches, paths, flower borders, trees and a fountain), Library Table, Diner Counter (hot coffee spills hurt), School Gym (bleachers, trampolines), Toy Store (spring boxes, display train, giant rubber duck), Greenhouse (cactus patches hurt), Arcade (pinball bumpers launch you), Attic and Beach Boardwalk, plus four neon arenas.
- **Look:** the toy fighters stand on the board in ivory/teal vs charcoal/orange (classic chess silhouettes are a menu option), and every fighter — yours in first person, the enemy, and the loadout preview — holds its blaster in both gloved hands; enemies wear a Propeller Hat or Jetpack in their team colours (for looks only); weapons are colorful toy plastic until you bling them.
- **Armory:** 14 weapons. Each piece type starts with its own, can buy more, and the Crossbow fits Pawns, Knights, Bishops and Kings. Mods: Stock, Scope, Big Clip, Power I–III, and Chrome/Gold/Diamond bling (each tier adds damage). Credits come from duels and wins.
- **Gadgets (F):** Grappling Hook, Jetpack and the Propeller Hat.
- **Computer opponent** at three levels, and bots that dodge, strafe, take cover, grab health and use abilities.
- **Auto-battle mode** for phones, Chromebooks without a mouse, or quick games.
- **Four arena themes**, picked by the file of the square being fought over and laid out symmetrically so neither side is favored.

## Editing
Change `game.src.html`, then rebuild:

```bash
npm pack three@0.128.0 && tar xzf three-0.128.0.tgz
python3 build.py package
```

## 3D models (Blender)
`blender/park_assets.py` and `blender/bedroom_assets.py` build the Chess Park and Kid's Bedroom models, and `blender/rooms_assets.py` builds the props for the other eight rooms (Library Table, Diner Counter, School Gym, Toy Store, Greenhouse, Arcade, Attic, Beach Boardwalk), all in a beveled low-poly toy style (shared helpers in `blender/toykit.py`). They write `assets/*.glb`, which `build.py` embeds into `index.html`, plus preview renders (`blender/previews/`).

```bash
blender -b --python blender/park_assets.py -- assets
blender -b --python blender/bedroom_assets.py -- assets
blender -b --python blender/rooms_assets.py -- assets
```
