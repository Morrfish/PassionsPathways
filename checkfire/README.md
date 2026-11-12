# Checkfire

Chess where every capture is a firefight. Open `index.html` in a browser — it's one self-contained file (Three.js is inlined), so it also runs offline or from a USB drive.

- **Real chess:** castling, en passant, promotion, check, checkmate, stalemate.
- **Captures become FPS duels.** Win and you take the square; lose and your attacker is destroyed.
- **Six classes:** each piece has its own HP, weapon and ability (Vanguard, Lancer, Oracle, Bastion, Sovereign, Monarch).
- **Wounds carry over** between battles, with 8 HP of repairs per turn.
- **Regicide:** a failed attack can expose a king to a direct duel.
- **Pick your room before every duel:** Kid's Bedroom (a walking toy robot, a boxing ring whose ropes fling you back, a toy train you can ride, giant alphabet blocks, a bed and a dresser to climb), Neon Ruins, Glass Citadel (jump pads), Ember Forge (lava channels and bridges) and Verdant Maze.
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
