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
- **Levels:** 94 built in — speed, strength, crazy, puzzle, contraption, water, portal, mazes, and five legendary ones.
- **Contraptions:** Rube Goldberg pieces. An alarm clock spooks a frog, rabbit, chicken, tortoise or a hamster in a wheel; add dominoes, a bowling ball, a trapdoor, a kicker boot, an anvil and floor buttons, and the chain reaction opens the gate the bot cannot reach.
- **Coins and the Store:** beating a level pays coins, and finishing a whole section pays a bonus. Coins unlock course-builder pieces, paint options and collectible special bots (Rare, Ultra Rare, Ultimate). Parts needed to beat levels are never locked.
- **Special bots (28):** 10 Rare, 10 Ultra Rare and 8 Ultimate. Each has free parts built in (for example the Shark Bot floats and has a snorkel). These perks only switch on in the sandbox, meaning courses players build or load. On the built-in levels a special bot is looks only, so nobody can buy a win.
- **Coin codes:** the Store has an "Enter a coin code" button. Five built-in codes are worth $1000 each, once per player. The teacher has the list; only scrambled forms are in the source.
- **Controller:** standard gamepads work for driving, gadgets and menus. Gadgets are assigned to A, X, B, RB, LB, R3, L3 in fitting order; a bot with more than seven keyed gadgets needs the keyboard for the rest.
- **Sandbox freedom:** in courses players build or load there is no ceiling, no gadget or upgrade slot limit and no ban on gadget pairs. A course rule set by its builder (for example "1 gadget") still applies, and so does its budget.
- **Ceiling:** every built-in course has a striped ceiling 13 m above the highest nearby ground. Flying into it sends the bot back to the last checkpoint with the usual reset penalty.
- **Checkpoints:** only count when the bot passes through the flag (within 2.8 m of its base). Flying over shows "Too high!" and does not save. The finish does not count until every checkpoint on the course has been passed.
- **Must-press notice:** `NEWS` in `js/core.js` shows every player a one-time notice with a single button that pays `NEWS_COINS`. Raise `NEWS` to send another.
- **Course assignments:** five named courses (`TASKS` in `js/core.js`) appear above My courses. Each has a minimum Start-to-Finish length and required pieces, which are free in that course. When the checklist is complete and the student has beaten the course since their last edit, Save file downloads `<Course> - <Player>.txt`, which Load a course code can open.
- **Next course:** after a win on a built-in level, a Next course button opens the following level (home-screen order) with the same bot.
- **Gold bonus:** every 20 gold medals on built-in levels pays $2000 (at 20, 40, 60 and 80 golds).
- **Time bonus:** beating your own best time on a built-in level pays $5 to $50 depending on how much faster you were, up to $150 per level in total.
- **Contraption pieces:** alarm clock, gong, frog, rabbit, chicken, tortoise, cat, mouse, dog, elephant, hamster wheel, cheese, carrot, egg timer, ball popper, toaster, hair dryer, balloon, pinball bumper, pipe, trapdoor, boot, anvil, dominoes and bowling ball. Triggers set off the nearest unused machine within 10 m, otherwise they open the nearest gate.
- **Puzzle courses and mazes:** a course rule limits how many gadgets fit, so students swap them at pit stops (Enter). Mazes are dark, have several floors, and drain the battery the whole time, so the route has to pass chargers.
- **Course editor:** paint terrain (dirt, ice, mud, rubber, sand, water, lava), drop in 39 kinds of things, set course rules (gadget limit, battery cap, drain, darkness), pick the scenery, test it, then share it as a link or code.
- **Coach + notebook:** after each run the game explains why the bot stalled, slipped, flipped, broke or ran out of battery, and logs the attempt.
- **Players:** each student signs in with a name and password, and their bot, medals, notebook and courses are saved separately on the same computer.
- **Settings:** sound, plus a password-locked teacher area for resetting student passwords, deleting players, turning damage and the coach on or off, giving a player coins, unlocking the whole Store for the computer, and the teacher notes.

Files: `js/core.js` (parts, courses, sharing), `js/levels.js` (the extra levels, built from reusable sections, plus the hand-built mazes), `js/sim.js` (physics and drawing), `js/ui.js` (screens and editor).
Physics by [planck.js](https://github.com/piqnt/planck.js) (MIT, see `js/planck.LICENSE.txt`).

## Windows app

`desktop/` wraps the game in a desktop window (Electron). To rebuild the exe:

    cd desktop
    npm install
    npm run build        # writes desktop/dist/BotAssemblyShop.exe

The exe is a single portable file: no installer. Saves are kept in the Windows user's app data folder.
