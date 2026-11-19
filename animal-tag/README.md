# Wild Tag

A third-person animal tag game in the browser. Open `index.html` (it has to be served over http, e.g. GitHub Pages; no install, no accounts).

## How it plays
- Run around **Wildwood Grove**: the Great Tree with four decks, treehouses with bridges, a climbing cliff, a log jungle gym, leafy treetops you can stand on, and red mushroom bounce pads.
- Movement is inspired by arm-swing tag games: **jump while touching a wall or tree to push off it**, and chain wall jumps to climb. Each animal has its own speed, jump and climb power.
- Controls: WASD + mouse, Space jump, E (or right-click) ability, C fly down, Tab scores, Esc menu, scroll to zoom. Tablets get a joystick and buttons.
- Modes: **Infection** (tagged animals turn IT), **Classic Tag** (pass IT on; whoever is IT at the end loses) and **Freeze Tag** (taggers freeze runners, runners unfreeze friends).
- Animals that are IT glow red with a ring over their head; the radar shows them as red dots.

## Content (edit `js/data.js`)
- **22 animals**, each with its own ability (Gorilla Chest Pound stun, Cheetah sprint, Kangaroo mega hop, Frog tongue grab, Octopus ink cloud, Chameleon camouflage, Rhino charge, Flying Squirrel glide, Spider web trap, Turtle shell shield, Bat blink, Mouse tiny mode, Tiger pounce, Eagle flight, Elephant stomp, Sloth sleepy zone, Skunk stink bomb, Hedgehog spike ball, Rabbit burrow, Monkey wall climbing, Penguin belly slide, Fox decoy). 6 are free.
- **10 mythical creatures** (Dragon, Phoenix, Unicorn, Griffin, Kraken, Yeti, Pegasus, Kitsune, Thunderbird, Sphinx). Each needs a goal first (wins, tags or rounds played), then gems.
- **18 patterns** (with your own two colors), **32 wearables** (hats, glasses/face, neck, back) and **8 bonus abilities** (equip 2), e.g. Double Jump, Long Arms, Second Wind.
- **Gems**: +10 per round, +40 for winning, +8 per tag, +30 for surviving, +100 daily. Saved in the browser (localStorage).

## Solo and online
- **Solo**: 3 to 15 bots (easy, normal or hard). The bots chase, flee, climb and use their abilities.
- **Online**: one player hosts and gets a 5-letter room code; friends join with it. Connections are peer-to-peer through [PeerJS](https://peerjs.com) (MIT, `js/peerjs.min.js`) and its free public matchmaking server (`0.peerjs.com`). School networks that block WebRTC or that server will show a message; solo still works. The host's browser runs the round and the bots, so the host should keep the tab in front.

Files: `js/data.js` (all content), `js/models.js` (animals, patterns, wearables built from 3D shapes), `js/world.js` (map + collision), `js/game.js` (movement, abilities, tagging, bots, rounds, network sync), `js/net.js` (rooms), `js/ui.js` (menus, shop, HUD).
3D by [three.js](https://threejs.org) r149 (MIT, `js/three.LICENSE.txt`).
