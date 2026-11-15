# Brinehollow

A playable prototype of the **tide and lantern loop** from the Brinehollow design: a third-person lane shooter in a salvage-punk harbor city, where the sea rises and falls and changes the map. Open `index.html` in a desktop browser (mouse and keyboard) — it is one self-contained file with Three.js inlined, so it also runs offline.

## What is in this prototype
- **One lane, 3 v 3.** You and two Teal bots against three Rust bots. Silence the Rust **Foghorn**, then cut their **Anchor Chain**; their ship lists and drifts off.
- **The tide** turns every 70 seconds (the design calls for 4 minutes).
  - Low tide: the seabed trench is a dry flank, and **Reef Crabs** are out. Each crab drops a Pearl.
  - High tide: the street floods and slows heroes, so the boardwalks, crow's nests and your tether matter. The trench becomes a fast **current**, which reverses direction each high tide.
- **Lantern-Bearers.** Every wave of Wickies has one. Kill it and the lantern drops for either crew to grab. Run it to one of your buoys for a team Spark payout and three extra Wickies in your next wave. The forward buoy in the trench pays 50% more. The carrier cannot shoot or tether.
- **Movement:** a harpoon **tether** that pulls you to whatever you hit, or yanks an enemy hero toward you and slows them.
- **Wake:** moving fast (tether, current) fills the blue ring. A full Wake makes your next shot hit ×3 and refills the magazine.
- **Shove and Brace:** Shove knocks enemies back; a timed Brace throws a Shove back at the attacker. Bots show a "SHOVE!" tell first.
- **Rigging:** three items, each with a Low-Tide face and a High-Tide face. Bilge Pump also costs Pearls, so it needs a trip to the seabed.
- **Foghorns** knock heroes back with a sound-cannon blast, and guard the chain until they fall.

## Look
The game is drawn as a graphic novel, following the art sheet in `reference/art-sheet.webp`:
- **Dusk harbour:** deep blue sky with cloud banks, timber fronts with lamp-lit windows that glow in shadow, a slab dock, a muddy seabed at low tide and a navy sea at high tide.
- **Ink and cel shadows:** flat three-band toon shading, hard cast shadows, black ink outlines found from scene depth, halftone dots in the shadows and sky, and paper grain.
- **Faction silhouettes (Blender):** every crew wears a conical straw hat. Teal heroes are broad, with big cuffs, rope slung across the chest and a gaff on the back. Rust heroes are lean, with a flared coat, a long braid and a paddle on the back.
- **The rest of the cast:** a stout bearded Wickie with a rope coil, a caped Lantern-Bearer holding the lantern up, a brass Foghorn on a braced timber tower, a stepped anchor block with great rusted links, Reef Crabs, buoys, timber ships, and dock dressing (rope-wrapped pilings, barrels, wall lamps, cross-braced crates).
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
The other two lanes, 5 v 5, the hero roster and Knot upgrades, fog banks and sound ripples, The Catch, Rogue Wave, the Titan stirring, Scrap and Ember, Crew Charms, online play, touch controls.

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
