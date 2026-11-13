# Bot Assembly Shop

A browser game where students build a robot from parts and drive it through obstacle courses.
Open `index.html` — no install, no accounts, works offline. Progress saves in the browser.

- **Empty build bay:** nothing is pre-picked. Students choose every part, and the course info says what is out there, never what to buy.
- **Shop:** 8 chassis, 8 wheel sizes, 7 tire types, 7 motors, a 7-step gearbox, 6 batteries, 4 drive types, 34 gadgets and 17 upgrades, all inside a course budget.
- **Gadgets and upgrades:** gadgets are tools and tricks (saw, hook, bridge layer, switch drone...). Upgrades make the bot itself better (armor, shocks, turbo...) and have their own slots.
- **Limits on flying:** the propeller has 4 seconds of rotor time and an 8 m ceiling; the vault pole has 3 vaults. Both refill at checkpoints.
- **Turn around:** Tab flips the bot so its tools point the other way.
- **Damage:** bots have health. Long falls and hard crashes break them.
- **Paint shop:** colours, patterns, eyes, hats, words on a flag, and a picture (sticker, photo, or draw your own).
- **Levels:** 65 built in — speed, strength, crazy, puzzle, mazes, and five legendary ones.
- **Puzzle courses and mazes:** a course rule limits how many gadgets fit, so students swap them at pit stops (Enter). Mazes are dark, have several floors, and drain the battery the whole time, so the route has to pass chargers.
- **Course editor:** paint terrain (dirt, ice, mud, rubber, sand, water, lava), drop in 39 kinds of things, set course rules (gadget limit, battery cap, drain, darkness), pick the scenery, test it, then share it as a link or code.
- **Coach + notebook:** after each run the game explains why the bot stalled, slipped, flipped, broke or ran out of battery, and logs the attempt.
- **Players:** each student signs in with a name and password, and their bot, medals, notebook and courses are saved separately on the same computer.
- **Settings:** sound, plus a password-locked teacher area for resetting student passwords, deleting players, turning damage and the coach on or off, and the teacher notes.

Files: `js/core.js` (parts, courses, sharing), `js/levels.js` (the extra levels, built from reusable sections, plus the hand-built mazes), `js/sim.js` (physics and drawing), `js/ui.js` (screens and editor).
Physics by [planck.js](https://github.com/piqnt/planck.js) (MIT, see `js/planck.LICENSE.txt`).

## Windows app

`desktop/` wraps the game in a desktop window (Electron). To rebuild the exe:

    cd desktop
    npm install
    npm run build        # writes desktop/dist/BotAssemblyShop.exe

The exe is a single portable file: no installer. Saves are kept in the Windows user's app data folder.
