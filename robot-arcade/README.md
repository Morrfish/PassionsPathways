# Robot Code Arcade

Three browser coding games for robotics class. Open `index.html`: no install, no accounts, works offline.
Students type simple commands (one per line), press **Run**, and watch a 3D machine follow them.
The camera starts in front and, in **Auto**, swings to a top view while the machine moves.

- **Code Claw** (`claw.html`): program a claw machine. `left/right/back/front N`, `down`, `up`, `open`, `close`.
  Grab a prize and retrace the steps to the chute. Prizes are common to legendary (funny, food, brain rot...)
  and go on a Prize Shelf. Each emoji is turned into a 3D voxel toy, and about 125 of them are piled into the machine; the claw grabs the top toy where it lands, but only holds it if it landed within 0.25 of the toy's middle (otherwise the toy slips out). When a toy is pulled out, nearby toys get jolted and roll into the gap, so the same program will not keep working. Tapping a toy shows its exact position (e.g. right 2.3, back 1.8) so students can aim with decimals. A red aiming laser shows where the claw will drop. **Edit the prize list in `js/prizes.js`.**
- **Crane Crew** (`crane.html`): a construction tower crane. `rotate left/right DEG`, `trolley out/in N`,
  `lower/raise N`, `hook`, `unhook`. Ten missions (beam to pad, crate to truck, AC to roof, stack 3 blocks, three jobs at once,
  unload the truck, skyscraper topper, kitty rescue, swap shop, free build). Loads must clear anything in the way and be set down gently.
- **Rover Run** (`rover.html`): a Mars rover. `forward/backward N`, `turn left/right`, `drill`, plus `repeat N ... end`
  loops. Twelve missions (including backing up, nested loops and a return-home maze); stars depend on how few lines the program uses, so later levels need loops.

Movement numbers can be decimals (up to 2 places, e.g. `right 1.5`, `lower 0.5`, `forward 2.25`); `repeat` takes whole numbers.

All games: Step mode, speed control, plain-English error messages with the line highlighted, sound toggle,
Front/Top camera buttons (plus Cab view on the crane and Chase view on the rover), scroll to zoom.

Files: `js/shared.js` (parser, runner, editor, 3D stage), `js/claw.js`, `js/crane.js`, `js/rover.js`, `js/prizes.js`, `shared.css`.
3D by [three.js](https://threejs.org) r149 (MIT, see `js/three.LICENSE.txt`).
