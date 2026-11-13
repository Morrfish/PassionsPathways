# Bot Assembly Shop

A browser game where students build a robot from parts and drive it through obstacle courses.
Open `index.html` — no install, no accounts, works offline. Progress saves in the browser.

- **Shop:** chassis, wheels, tires, motor, gearbox, battery, drive type and 23 gadgets, all inside a course budget.
  - Tools: buzz saw, rock drill, heat torch, dozer blade, long pole, ball cannon, grabber claw, magnet.
  - Movement: grapple hook, jump jack, vault pole, rocket, propeller, glider wing, wall climber, floats, snorkel.
  - Upgrades: ballast, roll cage, wheelie bar, turbocharger, solar panel, horn.
- **Courses:** 12 built in — speed, strength and crazy.
- **Course editor:** paint terrain (dirt, ice, mud, water, lava), drop in obstacles (crates, wood/ice/rock walls, gates and switches, zip lines, hammers, lifts...), test it, then share it as a link or code.
- **Coach + notebook:** after each run the game explains why the bot stalled, slipped, flipped or ran out of battery, and logs the attempt.

Files: `js/core.js` (parts, courses, sharing), `js/sim.js` (physics and drawing), `js/ui.js` (screens and editor).
Physics by [planck.js](https://github.com/piqnt/planck.js) (MIT, see `js/planck.LICENSE.txt`).
