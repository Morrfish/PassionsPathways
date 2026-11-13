# Bot Assembly Shop

A browser game where students build a robot from parts and drive it through obstacle courses.
Open `index.html` — no install, no accounts, works offline. Progress saves in the browser.

- **Empty build bay:** nothing is pre-picked. Students choose every part, and the course info says what is out there, never what to buy.
- **Shop:** 5 chassis, 4 wheel sizes, 4 tire types, 4 motors, gearbox, 3 batteries, drive type and 33 gadgets, all inside a course budget.
- **Damage:** bots have health. Long falls and hard crashes break them. Shocks, armor, a parachute or a bubble shield help.
- **Paint shop:** colours, patterns, eyes, hats, words on a flag, and a picture (sticker, photo, or draw your own).
- **Levels:** 52 built in — speed, strength, crazy, and five legendary ones.
- **Course editor:** paint terrain (dirt, ice, mud, rubber, sand, water, lava), drop in 38 kinds of things (springboards, bot cannons, teleporters, conveyors, giant propellers, lasers, TNT, gates and switches, signs with your own words...), pick the scenery, test it, then share it as a link or code.
- **Coach + notebook:** after each run the game explains why the bot stalled, slipped, flipped, broke or ran out of battery, and logs the attempt. The coach can be turned off in Settings.
- **Players:** each student signs in with a name and password, and their bot, medals, notebook and courses are saved separately on the same computer.
- **Settings:** sound, plus a password-locked teacher area for resetting student passwords, deleting players, turning damage and the coach on or off, and the teacher notes.

Files: `js/core.js` (parts, courses, sharing), `js/levels.js` (the 40 extra levels, built from reusable sections), `js/sim.js` (physics and drawing), `js/ui.js` (screens and editor).
Physics by [planck.js](https://github.com/piqnt/planck.js) (MIT, see `js/planck.LICENSE.txt`).

## Windows app

`desktop/` wraps the game in a desktop window (Electron). To rebuild the exe:

    cd desktop
    npm install
    npm run build        # writes desktop/dist/BotAssemblyShop.exe

The exe is a single portable file: no installer. Saves are kept in the Windows user's app data folder.
