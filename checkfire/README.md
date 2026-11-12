# Checkfire

Chess where every capture is a firefight. Open `index.html` in a browser — it's one self-contained file (Three.js is inlined), so it also runs offline or from a USB drive.

- **Real chess:** castling, en passant, promotion, check, checkmate, stalemate.
- **Captures become FPS duels.** Win and you take the square; lose and your attacker is destroyed.
- **Six classes:** each piece has its own HP, weapon and ability (Vanguard, Lancer, Oracle, Bastion, Sovereign, Monarch).
- **Wounds carry over** between battles, with 8 HP of repairs per turn.
- **Regicide:** a failed attack can expose a king to a direct duel.
- **Computer opponent** at three levels, and bots that dodge, strafe, take cover, grab health and use abilities.
- **Auto-battle mode** for phones, Chromebooks without a mouse, or quick games.
- **Four arena themes**, picked by the file of the square being fought over and laid out symmetrically so neither side is favored.

## Editing
Change `game.src.html`, then rebuild:

```bash
npm pack three@0.128.0 && tar xzf three-0.128.0.tgz
python3 build.py package
```
