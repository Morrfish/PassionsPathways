# Robot Code Arcade

Three browser coding games for robotics class. Open `index.html`: no install, no accounts, works offline.
Students type simple commands (one per line), press **Run**, and watch a 3D machine follow them.
The camera starts in front and, in **Auto**, swings to a top view while the machine moves.

- **Code Claw** (`claw.html`): program a claw machine. `left/right/back/front N`, `down`, `up`, `open`, `close`.
  Grab a prize and retrace the steps to the chute. Prizes are common to legendary (funny, food, brain rot...)
  and go on a Prize Shelf. Each emoji is turned into a 3D voxel toy, and about 125 of them are piled into the machine; the claw grabs the top toy where it lands and the pile settles afterward. A red aiming laser shows where the claw will drop. **Edit the prize list in `js/prizes.js`.**
- **Crane Crew** (`crane.html`): a construction tower crane. `rotate left/right DEG`, `trolley out/in N`,
  `lower/raise N`, `hook`, `unhook`. Six missions (beam to pad, crate to truck, AC to roof, stack 3 blocks,
  three jobs at once, free build). Loads must clear anything in the way and be set down gently.
- **Rover Run** (`rover.html`): a Mars rover. `forward/backward N`, `turn left/right`, `drill`, plus `repeat N ... end`
  loops. Seven missions; stars depend on how few lines the program uses, so later levels need loops.

All games: Step mode, speed control, plain-English error messages with the line highlighted, sound toggle,
Front/Top camera buttons (plus Cab view on the crane and Chase view on the rover), scroll to zoom.

Files: `js/shared.js` (parser, runner, editor, 3D stage), `js/claw.js`, `js/crane.js`, `js/rover.js`, `js/prizes.js`, `shared.css`.
3D by [three.js](https://threejs.org) r149 (MIT, see `js/three.LICENSE.txt`).
