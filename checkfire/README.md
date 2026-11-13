# Checkfire

Chess where every capture is a firefight. Open `index.html` in a browser — it's one self-contained file (Three.js is inlined), so it also runs offline or from a USB drive.

- **Real chess:** castling, en passant, promotion, check, checkmate, stalemate.
- **Captures become FPS duels.** Win and you take the square; lose and your attacker is destroyed.
- **Six classes:** each piece has its own HP, weapon and ability (Vanguard, Lancer, Oracle, Bastion, Sovereign, Monarch).
- **Wounds carry over** between battles, with 8 HP of repairs per turn.
- **Regicide:** a failed attack can expose a king to a direct duel.
- **Pick your room before every duel (14 rooms):** Kid's Bedroom (teal star walls, star duvet, red rug, wind-up tin robot, boxing ring with stretchy ropes, rideable red-and-blue train with open cars), Chess Park (the duel is on a stone park table; two older friends play a quiet game at their own table nearby, with benches, paths, flower borders, trees and a fountain), Library Table, Diner Counter (hot coffee spills hurt), School Gym (bleachers, trampolines), Toy Store (spring boxes, display train, giant rubber duck), Greenhouse (cactus patches hurt), Arcade (pinball bumpers launch you), Attic and Beach Boardwalk, plus four neon arenas.
- **Look:** classic chess silhouettes in ivory/teal vs charcoal/orange; weapons are colorful toy plastic until you bling them.
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
`blender/park_assets.py` and `blender/bedroom_assets.py` build the Chess Park and Kid's Bedroom models in a beveled low-poly toy style (shared helpers in `blender/toykit.py`). They write `assets/*.glb`, which `build.py` embeds into `index.html`, plus preview renders (`blender/previews/`).

```bash
blender -b --python blender/park_assets.py -- assets
blender -b --python blender/bedroom_assets.py -- assets
```
