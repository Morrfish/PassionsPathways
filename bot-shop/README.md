# Bot Assembly Shop

A browser game where students build a robot from parts and drive it through obstacle courses.
Open `index.html` — no install, no accounts, works offline. Progress saves in the browser.

- **Shop:** chassis, wheels, tires, motor, gearbox, battery, drive type and gadgets (grapple hook, jump jack, dozer blade, rocket, ballast, floats, roll cage, glider wing), all inside a course budget.
- **Courses:** 10 built in — speed, strength and crazy.
- **Course editor:** paint terrain (dirt, ice, mud, water, lava), drop in obstacles, test it, then share it as a link or code.
- **Coach + notebook:** after each run the game explains why the bot stalled, slipped, flipped or ran out of battery, and logs the attempt.

Files: `js/core.js` (parts, courses, sharing), `js/sim.js` (physics and drawing), `js/ui.js` (screens and editor).
Physics by [planck.js](https://github.com/piqnt/planck.js) (MIT, see `js/planck.LICENSE.txt`).
