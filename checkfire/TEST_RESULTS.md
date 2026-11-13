# Checkfire — test results (build of 13 Nov 2026, branch `claude/vigilant-fermi-qapd7m`)

**What these are:** automated checks run in a headless test browser with software graphics (about 9 frames a second).
They prove the game loads, plays through and draws the right things without errors.
**What these are not:** a play-test. Nothing here says how smooth the game is on a real PC, how the hands look in motion at
full speed, or how difficulty and gadgets feel. Those are in `PLAYTEST_NOTES.md` and are all still open.

## Automated coverage

| Check | Script | Result |
|---|---|---|
| Full computer-vs-computer games after the board change (toy-fighter board, auto-battle) | `tools/tests/full_games.js` | **3 of 4 finished** in the main run: checkmate in 129 s, 169 s and 194 s with 9, 12 and 15 duels, no errors. The 4th did **not finish** within 10 minutes (9 duels, no errors). See note 1. |
| Same setup as the unfinished game, repeated | scratch diagnostic (stall detector) | **7 of 7 finished** by checkmate (110–257 s), no errors, no stall |
| Board style: Toy fighters — start, a move, a reply, a capture resolved | `tools/tests/board_gadgets.js` | Pass: 32 toy pieces at the start, 31 after the capture, board matches the game state, no errors |
| Board style: Classic chess shapes — same steps | `tools/tests/board_gadgets.js` | Pass: 32 classic pieces, 31 after the capture, no errors (toggle preserved) |
| All 14 blasters, two-handed hold on a fighter (3 angles, aiming up, aiming down) | `tools/tests/holds.js` | Pass: 70 screenshots, no errors. Sheets: `tools/tests/shots/holds_fighter_1.jpg`, `_2.jpg` |
| All 14 blasters, first person (idle, aiming down sights, mid-reload) | `tools/tests/holds.js` | Pass: 42 screenshots, no errors. Sheets: `holds_first_person_1.jpg`, `_2.jpg` |
| Enemy gear: Propeller Hat and Jetpack on all 6 fighter types, both teams, front and back | `tools/tests/gear.js` | Pass: 48 screenshots, no errors. Sheets: `gear_charcoal_team.jpg`, `gear_ivory_team.jpg` |
| Loadout preview with None / Grappling Hook / Jetpack / Propeller Hat, two-handed hold | `tools/tests/board_gadgets.js` | Pass: all four, no errors. Sheet: `loadout_gadgets.jpg` |
| Repair Core at 5.5 and 12 units in bright rooms (School Gym, Beach Boardwalk) and dark rooms (Attic, Arcade, Glass Citadel) | `tools/tests/gear.js` | Pass with a caveat: see note 2. Sheet: `repair_core.jpg` |
| Room loading: all 14 rooms built and drawn from two camera spots | `tools/tests/room_views.js` | Pass: 28 screenshots, no errors. Sheet: `rooms_all_14.jpg` |
| Menu, board, loadout, room picker, a live first-person duel against a moving enemy | `tools/tests/ui_screens.js` | Pass, no errors |
| Armory with everything unlocked, abilities, darts, room interactables | `tools/tests/equipment_rooms.js` | Pass, no errors |

### Notes
1. **The unfinished game.** An earlier run of the four games overlapped with other tests and three ran out of the old
   150-second limit, so that run does not count. Run alone with a 10-minute limit, three finished and one did not. The same
   setup then finished 7 times out of 7. The cause of the one unfinished game is **not confirmed**. The likely explanation
   is that the game has no draw rules (no threefold repetition, no 50-move rule), so two computer players can shuffle pieces
   for ever in an endgame; that would be how the game already behaved before this work, not something the board change did.
   Adding draw rules would be a gameplay change, so it is left for Courtnee to decide.
2. **Repair Core.** Up close (5.5 units) the white crosses read clearly in all five rooms. At 12 units the core reads as a
   green gem with bright white marks; the cross shape itself is small at that distance in a 400-pixel-wide crop. Whether it
   is easy to spot in a real duel is a play-test question.
3. **Hat placement.** On the knight the Propeller Hat sits on top of the plume rather than on the helmet. It clears the
   head, but it is the least natural of the six; a reference sheet for worn gadgets would settle it.
4. **Board speed.** The toy-fighter board is heavier to draw than the classic one (games took roughly 2–4 minutes each in
   the test browser). On a real graphics card this should not matter, but it is the first thing to check on Courtnee's PC;
   the Classic option is the fallback.

## What changed in this build (so the play-test knows what to look at)
- Every blaster is held in both gloved hands: by you in first person, by enemies, and in the loadout preview.
  Long blasters: fist on the grip, open palm under the front. Arc Pistol, Crown Repeater, Hand Cannon: both hands on the
  grip. Twin Blasters: one in each hand.
- Enemies wear a Propeller Hat or a Jetpack in their team colours. Looks only: enemy movement, aim, difficulty,
  cooldowns and where their shots start are unchanged.
- Repair Core: big glowing white crosses on every face (the old ones were hidden under the surface).
- Unchanged and still pending Courtnee's decision: the four neon arenas, publishing, a main-branch pull request, the Game Closet.

## Not covered by automation (needs Courtnee's PC)
- Smoothness in each of the eight rebuilt rooms and on the toy-fighter board.
- How the hands look in motion at full speed, on which blaster and during which action.
- Whether any board pieces get confused, and for which team.
- Difficulty and gadget feel.
