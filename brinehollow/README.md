# Brinehollow

A playable prototype of the **tide and lantern loop** from the Brinehollow design: a third-person lane shooter in a salvage-punk harbor city, where the sea rises and falls and changes the map. Open `index.html` in a desktop browser (mouse and keyboard) — it is one self-contained file with Three.js inlined, so it also runs offline.

## What is in this prototype
- **One lane, 3 v 3.** You and two Teal bots against three Rust bots. Silence the Rust **Foghorn**, then cut their **Anchor Chain**; their ship lists and drifts off.
- **The tide** turns every 70 seconds (the design calls for 4 minutes).
  - Low tide: the seabed trench is a dry flank, and **Reef Crabs** are out. Each crab leaves a Pearl to pick up.
  - High tide: the street floods and slows heroes, so the boardwalks, crow's nests and your tether matter. The trench becomes a fast **current**, which reverses direction each high tide.
- **Lantern-Bearers.** Every wave of Wickies has one. Kill it and the lantern drops for either crew to grab. Run it to one of your buoys for a team Spark payout and three extra Wickies in your next wave. The forward buoy in the trench pays 50% more. The carrier cannot shoot or tether.
- **Movement:** a harpoon **tether** that pulls you to whatever you hit, or yanks an enemy hero toward you and slows them.
- **Wake:** moving fast (tether, current) fills the blue ring. A full Wake makes your next shot hit ×3 and refills the magazine.
- **Shove and Brace:** Shove knocks enemies back; a timed Brace throws a Shove back at the attacker. Bots show a "SHOVE!" tell first.
- **Rigging:** three items, each with a Low-Tide face and a High-Tide face. Bilge Pump also costs Pearls, so it needs a trip to the seabed.
- **Foghorns** knock heroes back with a sound-cannon blast, and guard the chain until they fall.

## Look
The game is drawn as a graphic novel, following the art sheets in `reference/` (first look, tides and dock, props, the Teal and Rust crew turnarounds, the face and gear-pose sheets, and the inked style sheets):
- **Dusk harbour:** deep blue sky with cloud banks, timber fronts with lamp-lit windows that glow in shadow, a slab dock, a muddy seabed at low tide and a navy sea at high tide.
- **Ink and cel shadows:** flat three-band toon shading, hard cast shadows, black ink outlines found from scene depth, halftone dots in the shadows and sky, and paper grain.
- **Hand-inked models:** every model has a heavy black outline whose thickness wavers like a brush line, a hard two-tone shadow, hatching in shadow with cross-hatching only in the deepest parts, and ink in its seams. Wear is localized: it gathers on seams and edges, and each surface wears its own way (pale threadbare patches on cloth, dark scuffs on leather and wood, rust and pitting on metal). Skin takes only faint marks.
- **Anatomical rig (pilot: Mainsail):** `adult()`, `head()`, `hand()` and `sleeve()` in `blender/models.py` build adult proportions, a hand-placed head surface driven by the `HEAD_PROFILE` table (side-view profile and front-view outline per height, then brow, sockets, lid crease, nose, cheekbones, lips and chin), articulated hands and folded cloth, following `reference/target-*.webp`. Ink is projected onto the sculpted head in the game. The other characters still use the earlier rig.
- **Drawn faces:** each character's eyes, brows, mouth, scars, freckles and face lines are inked on a canvas and wrapped over the front of the head, above a sculpted nose and jaw. The `FACES` table in `game.src.html` sets each expression.
- **Proportions and faces:** characters have long legs, heads a third larger than the body suggests, and big hands. Skin takes only faint ink marks and never falls into hat shadow, so faces stay readable.
- **Rounded forms:** models are smooth-shaded with rounded edges, tapered limbs and soft shoulders. Faces have rounded cheeks and noses, lidded eyes, brows and framing hair; coats have open tilted collars, buttons, turned cuffs and pleated skirts, so the cel shading reads as folds. Mainsail's ribbon comes over the shoulder, Undertow's wave is on the chest, and Wickie has open cheeks over a parted beard.
- **The starting cast (Blender):** twenty characters built from one rig in `blender/models.py`, each with its own build, coat length, headgear and one piece of signature gear. Every hero carries the harpoon gun; the signature gear is in the free hand or on the back.
  - **Teal heroes:** Breakwater (the biggest body, long white beard, huge rope coil on one shoulder), Mainsail (tall, floor-length coat, one long ribboned braid, spyglass), Drift (small, short tunic, red scarf, knife), Rivet (bare arms, apron, goggles, great wrench), Bell (the smallest, twin braids, a brass bell held high), Kelp (weed bundle and wicker basket), Skiff (square, bedroll pack, oar taller than the hat), Brine (headscarf instead of a hat, cross apron, bottle).
  - **Rust heroes:** Netter (twin braids, net bundle at the hip), Cinder (the widest, cap and goggles, black beard, forge apron, shovel), Gaff (tall and plain, square cuffs, gaff hook over the shoulder), Knuckle (iron hat, pauldrons, knee plates), Soot (small, masked, torn scarf tails, canisters), Tiller (bare wrapped forearms, a tiller oar), Barnacle (short, brass diving helmet, tank frame, glass floats), Copper (flat cap, moustache, brass horn rig), Undertow (long coat with a wave on the back, cleaver).
  - **Crew:** Wickie is the crew unit for both sides (recoloured for Rust). Glimmer carries Teal's lantern and Ember carries Rust's.
  - Pick your Teal hero on the title screen; your two allies and the three Rust heroes are drawn at random. For now the characters differ in look only: they share one kit and one set of stats.
- **Objectives:** a brass Foghorn on an iron pedestal bracketed off a braced timber tower, and a stepped riveted anchor block with a great shackle and rust-blotched links running up to the ship.
- **Buoys:** Teal banks at a round teal buoy with a teardrop lamp cage; Rust banks at a red-and-white buoy with a lattice tower and flag.
- **Seabed:** at low tide a stream winds between weed-and-barnacle rocks, and spiked Reef Crabs guard it. A cracked crab leaves a Pearl in its shell.
- **Dock dressing:** rope-wrapped pilings with barnacles and weed, barrels, glass floats in rope nets, rope coils, cleats, cross-braced crates, timber cranes with cargo nets, wall lamps, timber ships, and a lighthouse on each headland.
- **Lettering:** the HUD is paper panels and caption boxes, with sound effects (BWAAAM!, THWIP!, KRAK!) over the action, speed lines when you move fast, and a "Meanwhile…" banner when the tide turns.

## Controls
| Key | Action |
| --- | --- |
| WASD, Space | Move, jump |
| Mouse, left click, R | Aim, fire, reload |
| E or right click | Tether |
| F, Q | Shove, Brace |
| 1, 2, 3 | Buy Rigging |

## Not in yet
The other two lanes, 5 v 5, per-character abilities and stats, Knot upgrades, fog banks and sound ripples, The Catch, Rogue Wave, the Titan stirring, Scrap and Ember, Crew Charms, online play, touch controls.

## Editing
Change `game.src.html`, then rebuild:

```bash
npm pack three@0.128.0 && tar xzf three-0.128.0.tgz
python3 build.py package
```

The models are built by `blender/models.py`, which writes `assets/models.glb`; `build.py` embeds it. Material names carry the paint: `c_RRGGBB` is a flat colour, `glow_RRGGBB` is unlit, and `team`, `team2` and `hull` are recoloured per crew.

```bash
blender -b --python blender/models.py -- assets
```

Add `?auto=1` to the address to watch the bots play your hero, and `?speed=3` to run the match faster.
