# TALEBORN: The Six Realms

_A creature-collecting RPG in the spirit of the classic Game Boy monster games: top-down overworld, turn-based battles, a creature encyclopedia to fill, badges, a rival and a final league._

Other files in this folder:
- `CHATGPT_START_HERE.md`: step-by-step guide to making all the art in ChatGPT
- `ROSTER.md`: every creature, its types, look and how it evolves
- `CREATURE_PROMPTS.md`: copy-paste ChatGPT prompts for every creature sprite
- `ART_LIST.md`: the Style Lock plus every other image the game needs (characters, maps, UI, items)
- `creatures.csv`: tracking sheet (open in Excel or Google Sheets and check off sprites as you make them)
- `tools/build_roster.py`: the source of the creature data. Change creatures here and re-run it.

---

## The Name

**Taleborn: The Six Realms.** The subtitle says six on purpose: at the start, the seventh Realm is only a myth (see Section 1).

Name check, done with web searches on 2026-11-28: no game, app or trademark called "Taleborn" turned up (the closest was *Fableborne*, a different game). "Mythbound" was dropped because other games already use it. A web search is not a trademark search, so check the USPTO trademark database, Steam and the app stores before you publish.

---

## 1. The Story Hook

Every story people have ever told leaves an echo. In the world of **Taleborn**, those echoes come alive as creatures called **Echoes**. Six Realms grew around six kinds of stories. Everyone knows the six. Only old storytellers talk about a **seventh**:

| # | Realm | Stories it grew from | Signature type | Look and feel |
|---|---|---|---|---|
| 1 | **Sakuraden** | Anime | Ki | Cherry-blossom villages, ninja forests, a neon mecha city, a spirit shrine, a school rooftop |
| 2 | **Capeworth** | Superheroes and villains | Cape | Comic-book skyline, crime alleys, a secret lab, a villain's lair, an orbiting watchtower |
| 3 | **Toonvale** | Cartoons | Toon | Starts in 1930s black and white and gets more colorful as you go: desert canyon roads, a seafloor town, a haunted mansion |
| 4 | **Pantheos** | Gods and goddesses of many cultures | Divine | Floating temple districts: Greek, Egyptian, Norse, Chinese, Celtic and Mesoamerican |
| 5 | **Respawn Reach** | Video games | Pixel | 8-bit plains, a mushroom kingdom, a block-built mine, a dungeon, an arcade city, a racetrack |
| 6 | **Hollowmere** | Cryptids and monsters | Dread | Foggy pine woods, a misty loch, a moth-haunted bridge, a monster castle, a sunken city |
| 7? | **The Midnight Marquee** (a myth, until the post-game) | Horror movies | Fright | A haunted movie palace floating in storm clouds under a red moon. Each island is a different scary-movie set. See Section 12. |

At the center is the hub, **Prologue Village**, home of **Professor Inkwell**. The player is a new **Pathfinder** who gets a **Lorebook** (the creature encyclopedia and storage) and one starter Echo.

**The Seventh Realm is a myth.** Nothing in the game's title, menus or maps admits it exists. The player only hears about it:
- A spooky nursery rhyme kids sing in every Realm: *"Six lands below and one above, where the stories go that no one loves."*
- Old storytellers and a few Chapter Masters tell of a movie palace "above the storms." Professor Inkwell laughs it off as a campfire tale.
- The Lorebook has six Realm tabs, and a seventh tab that's blank and won't open.
- On stormy nights, a red light sometimes flickers in the clouds above the hub.
- Quillion's old carvings show seven tail feathers, but no one knows why.

Then, after the Grand Champion, the myth turns out to be true (Section 12).

**The bad guys: The Redactors.** Led by **The Editor**, they want to erase every story and return the world to a blank page. They are stealing the Sovereigns' power to do it. Each Realm has one Redactor Admin. Their partner Sovereign is **Erazor** (the Eraser of Toonvale), and freeing it is a midgame twist.

**Why the creatures look familiar:** they are echoes of famous stories, so each one is a *nod* to a famous character type, never the character itself (see Section 10).

---

## 2. How the Adventure Flows

1. **Prologue Village:** pick 1 of 6 starters (one from each Realm). The rival, **Sage**, picks the starter whose genre type beats yours.
2. **Open world:** the six Realms ring the hub like a hexagon. Realm 1 is your starter's home and opens first. After its 2nd badge, the roads to the two neighboring Realms open, and so on.
3. **Each Realm** has 4 **Chapter Masters** (gym leaders), a Redactor Admin hideout, a Paragon Egg quest, and a Sovereign Trial.
4. **24 Chapter Seals** (badges) in total. Wild Echo levels scale with how many seals you hold, so you can do the Realms in many orders.
5. **The Grand Anthology** (the league): beat the 6 **Realm Champions** in a row, then the **Grand Champion**.
6. **Post-game, part 1:** after the Grand Champion, a red beam shoots into the sky and **The Midnight Marquee** rises. Ride the Night Ferry up to it (Section 12).
7. **Post-game, part 2:** gather all 14 Sovereigns to summon **Quillion, the First Storyteller**.

### Chapter Masters and Champions

| Realm | Chapter Masters (type) | Realm Champion |
|---|---|---|
| Sakuraden | Sensei Hayate (Ki), Captain Rin (Metal), Mira Starlight (Radiant), Kuro the Ronin (Spirit) | Shogun Akari |
| Capeworth | Captain Valor (Cape), The Nightjar (Shadow), Dr. Volta (Volt), Queen Mayhem, a reformed villain (Mind) | Commissioner Steele |
| Toonvale | Mayor Gigglesworth (Toon), Professor Wackoff (Metal), Captain Barnacle (Tide), Madame Mystery (Spirit) | Director Reel |
| Pantheos | Oracle Delphine (Mind), Pharaoh Sefu (Spirit), Skald Bjorn (Frost), Priestess Itzel (Gale) | High Archon Selene |
| Respawn Reach | Speedrunner Zip (Gale), Builder Bex (Stone), Arcade King Pix (Pixel), Dungeon Master Lyle (Metal) | Player Zero |
| Hollowmere | Ranger Hollis (Verdant), Professor Fogg (Tide), Countess Vesper (Dread), Dr. Ada Galvani (Volt) | Old Man Barrow |

**Grand Champion:** Lexa, a Pathfinder who has walked all six Realms. Her team has one Echo from each Realm.

---

## 3. The Creatures

### Echo classes (your names for "legendary" and "pseudo-legendary")

| Class | Like a... | How many | Stages | What makes it special |
|---|---|---|---|---|
| **Echo** | Normal creature | 48 lines (6 per ground Realm including the starter, 12 in the sky Realm) | 5 | Common to rare. Caught with Inks. |
| **Paragon** | Pseudo-legendary | 7 lines (1 per Realm) | 5 | Slow to level, very strong (about 600 total stats). One per save file, from a Paragon Egg quest. |
| **Sovereign** | Legendary | 14 (a rival pair per Realm) | 1 + Awakened form | Can't be caught with Inks. Joins only through a **Pact** (Section 5). About 680 total stats. |
| **Origin** | Mythical / the "final" one | 1 (Quillion) | 1 + Awakened form | Post-game. Wrote all the Realms, even the seventh. 720 total stats. |

**Total: 307 creature designs** (275 Echo and Paragon stages + 2 extra for the Webbit branch + 28 Sovereign forms + 2 Quillion forms). That's about twice the 151 in the original Game Boy games.

### Starters (pick one)

| Starter | Realm | Nod | Final stage |
|---|---|---|---|
| Kipkip (Ki) | Sakuraden | Spiky-haired martial artist who powers up | Zenkaiyo |
| Capup (Cape) | Capeworth | Caped flying strongman | Omnihound |
| Squeakit (Toon) | Toonvale | Rubber-hose cartoon mouse through every era of animation | Animagnus |
| Bleatbolt (Divine) | Pantheos | Thunder gods of many lands | Allthunder |
| Shroomy (Pixel) | Respawn Reach | Jumping hero who grows from power-ups | Legendcap |
| Footling (Dread) | Hollowmere | Big-footed ape of the woods | Gigantopith |

### Paragons

| Paragon line | Realm | Nod |
|---|---|---|
| Starbead → Eternoryu | Sakuraden | Wish-granting dragon summoned from 7 orbs |
| Cindrel → Cosmiflare | Capeworth | Psychic heroine consumed by a cosmic firebird |
| Doodlet → Magnumopus | Toonvale | Pencil sketch that becomes a fully animated dragon |
| Quetzlet → Quetzalcoron | Pantheos | Mesoamerican feathered serpent |
| Bitling → Maxrez | Respawn Reach | Final-boss dragon whose graphics improve each stage (8-bit to HD) |
| Kaijuvi → Kaijuggernaut | Hollowmere | Atomic-breathing king of giant monsters |
| Finlet → Skymegalodon | The Midnight Marquee | The giant summer-beach shark, now swimming through storm clouds |

### Sovereigns (rival pairs)

| Realm | Sovereign A | Sovereign B |
|---|---|---|
| Sakuraden | **Shoukai**, the Protagonist | **Maouryn**, the Demon Lord |
| Capeworth | **Aegisor**, the Ultimate Hero | **Malefax**, the Ultimate Villain |
| Toonvale | **Inkara**, the Pen | **Erazor**, the Eraser |
| Pantheos | **Solarchon**, Sun Above | **Nyxarion**, Night Below |
| Respawn Reach | **Respawnix**, the Extra Life | **Nullcrash**, the Fatal Error |
| Hollowmere | **Sanguinar**, the Count | **Cthaloth**, the Dreamer in the Deep |
| The Midnight Marquee | **Lastlight**, the Final Girl | **Bogeyreign**, the Boogeyman |

The full list of every creature is in `ROSTER.md`.

---

## 4. Evolution: "Ascension"

Every Echo and Paragon has **5 Ascension stages**:

| Stage | Name | Usual timing |
|---|---|---|
| I | **Seedling** | Caught or hatched |
| II | **Rookie** | around Lv 15 to 20 |
| III | **Veteran** | around Lv 28 to 36 |
| IV | **Elite** | around Lv 42 to 50 |
| V | **Ascended** | around Lv 50 to 55 (Paragons: Lv 70) |

When an Echo Ascends, a page-turning animation plays and its art changes. Players can cancel it with a button, like the old games.

### The ways to Ascend

Every line uses a mix of these, so no two lines feel the same:

| Method | Example in the game |
|---|---|
| **Level** | Kipkip → Kiyaru at Lv 14 |
| **Bond** (friendship) | Mewlet needs max Bond. Bond goes up from walking, battling and treats, and down when it faints. |
| **Item** | Use a Moon Locket, a Storm Hammer, a Golden Pencil |
| **Time of day / moon phase** | Level up at night, at dusk, at dawn, under a full moon (the game has a day clock and a moon calendar) |
| **Weather** | During a thunderstorm, blizzard, fog or wind |
| **Place** | Level up at the Neon Hangar, inside the Great Pyramid, on the Silver Bridge |
| **Battle feat** | Land 30 critical hits, inflict 25 status conditions, win 13 battles in a row |
| **Comeback** | Win a battle while under 10% HP (the anime power-up trope) |
| **Never give up** | Lose 10 battles (Pupyote the coyote keeps trying) |
| **Knows a move** | Knows Clone Dance, Bubble Blow or Repulse Beam |
| **Steps** | Walk 10,000 steps with it leading the party |
| **Partner** | Level up with another Metal type in the party (Mechakko "combines") |
| **Trade** | Tinkerbeetle and Quadlet get a "tech upgrade" when traded |
| **Cross-Realm** | Take it to another Realm: Snackpup the detective dog Ascends in Hollowmere by "unmasking a monster" |
| **Collection** | Gather all 7 Star Beads, or hold Realm Gems from all six Realms (Pebblox's gauntlet) |
| **Alignment** | Your Hero/Villain meter decides: Webbit becomes a hero spider or a goo-villain spider |
| **Story** | Some starters' final stage needs a story chapter cleared |
| **Power-up chain** | Shroomy only Ascends by eating power-ups (Grow Shroom, Flame Bloom, Invinci-Star, Hero Leaf) |
| **Minigame score** | Quadlet needs 10,000 points in Stack Attack |

**Hero/Villain alignment:** In Capeworth you make choices (help or rob, spare or finish off a foe, return or keep a stolen item). A meter tracks it. It changes Webbit's branch, Capup's and Gigglet's final stage, and some story scenes.

---

## 5. Catching: "Inscribing"

There are no balls. Pathfinders **write creatures into their Lorebook** with magic **Ink**.

### The basic Inscription
1. Weaken the wild Echo in battle.
2. Use an **Ink**. A **Rune Ring** minigame appears: a needle spins around a circle with a glowing zone.
3. Press the button when the needle is in the zone. You need **3 hits in a row** (3 lines of its story).
4. The zone is **bigger** when the Echo has low HP or a status condition, when you use better Ink, and when you've already Inscribed that species before.
5. Miss and the ink smudges: the Echo breaks free, and it may flee.

**Ink types:** Plain Ink, Fine Ink, Gilded Ink, Master Ink (can't miss), and 7 **Realm Inks** that are extra strong in their home Realm: Sakura Ink, Comic Ink, Toon Ink, Ichor Ink, Pixel Ink, Moonblood Ink and Reel Ink (sky Realm).

### Each Realm adds its own twist

| Realm | Twist | How it works |
|---|---|---|
| Sakuraden | **Rival's Respect** | Some Echoes won't accept Ink. Beat them in a 1-on-1 duel without switching, and they join you on their own (the "defeat means friendship" trope). |
| Capeworth | **Rescue or Reform** | Hero-type Echoes join after you finish an overworld rescue. Villain-type Echoes must be **Reformed**: fill their Redemption bar by using Cape or Radiant moves, then Ink them. |
| Toonvale | **The Chase** | Some Toon Echoes run away in the overworld. Catch them with gag items (Banana Peel, Painted Tunnel, Giant Magnet, Falling Anvil), then Ink them. |
| Pantheos | **Offerings** | Gods' Echoes appear at shrines. Bring the right Offering (honey, olive branch, feather, gold) and answer a riddle for a much bigger Rune Ring zone. |
| Respawn Reach | **High Score** | The Rune Ring turns into a quick arcade game (dodge, rhythm or block stack). Beat the score to catch. |
| Hollowmere | **Evidence** | Cryptids are blurry shadows until you photograph them 3 times with the **Evidence Lens**. Then you can battle and Ink them. |

### Paragons: the Paragon Egg
Each Realm has a side quest that ends with a **Paragon Egg** (one per save file). It hatches into the Stage I Paragon after walking a set number of steps. Paragons never appear in the wild.

### Sovereigns: the Pact
Sovereigns can't be Inked. To make a **Pact**:
1. Earn all 4 Chapter Seals in that Realm.
2. Find the Sovereign's **Crest** (a story quest).
3. Take the **Sovereign Trial**: a special battle with a goal that matches its story, not just "bring HP to zero."
   - Shoukai (Protagonist): survive 10 turns, then win with a Comeback.
   - Maouryn (Demon Lord): beat its 3-phase "final boss" fight.
   - Aegisor: protect a falling city meter while battling.
   - Malefax: win while Hero alignment stays high.
   - Inkara / Erazor: keep your team's "outline" from being erased (a timer).
   - Solarchon / Nyxarion: win at noon / at midnight.
   - Respawnix: beat it 3 times in a row (it respawns).
   - Nullcrash: win while the screen glitches and your menu shuffles.
   - Sanguinar: win before dawn. Cthaloth: win while your team slowly loses Sanity (a status condition).
4. Win, and you sign the Pact. The Sovereign joins at Lv 60.
5. **Awakening:** a Sovereign takes its Awakened form in battle after you've made a Pact with its rival too and both are in your party.

### Quillion
After all 14 Pacts, the Lorebook's last page opens. Quillion's Trial is a battle in which every Realm's rules (Comeback, Alignment, Evidence and so on) switch on and off.

---

## 6. Types

21 types: **14 elements** + **7 genre types** (one per Realm).

**Elements:** Blaze, Tide, Verdant, Volt, Frost, Stone, Gale, Brawl, Venom, Mind, Spirit, Shadow, Metal, Radiant
**Genres:** Ki, Cape, Toon, Divine, Pixel, Dread, Fright

### The Genre Cycle (the heart of the game)
Each genre beats the next one around the circle:

**Cape → Dread → Divine → Pixel → Toon → Ki → Cape**

- Cape beats Dread: heroes slay monsters.
- Dread beats Divine: the oldest fears outlast the gods.
- Divine beats Pixel: order defeats the glitch.
- Pixel beats Toon: the game crashes the cartoon.
- Toon beats Ki: the anvil gag beats the serious hero.
- Ki beats Cape: training beats gadgets and capes.

The rival uses this cycle to pick the starter that beats yours.

**Fright sits outside the cycle** (it's the sky Realm's type): strong against Mind, Cape and Toon (fear breaks heroes, cartoons and minds); weak to Radiant, Brawl and Divine (the light, the final girl who fights back, and the gods).

### Element strengths (first draft, to balance later)
| Type | Strong against (2x) |
|---|---|
| Blaze | Verdant, Frost, Metal, Toon (paper and ink burn) |
| Tide | Blaze, Stone, Pixel (water shorts out electronics) |
| Verdant | Tide, Stone |
| Volt | Tide, Gale, Metal |
| Frost | Verdant, Gale, Divine |
| Stone | Blaze, Gale, Frost |
| Gale | Verdant, Brawl |
| Brawl | Stone, Metal, Frost, Shadow |
| Venom | Verdant, Toon, Cape |
| Mind | Brawl, Venom, Ki |
| Spirit | Mind, Spirit, Divine |
| Shadow | Mind, Spirit |
| Metal | Frost, Stone, Radiant |
| Radiant | Shadow, Dread, Spirit |

Rule of thumb: a type resists anything it's strong against, and every genre type resists itself.

---

## 7. Battle Basics
- Turn-based, 1 vs 1, teams of up to 6, 4 moves each (same feel as the classics).
- Stats: HP, Attack, Defense, Focus (special attack), Will (special defense), Speed.
- Status conditions: Burn, Freeze, Paralysis, Poison, Sleep, Confusion, plus **Fear** (Dread and Fright moves, skip a turn) and **Sanity** (Cthaloth and Bogeyreign only).
- **Bond** shows as hearts on the summary page. High Bond Echoes sometimes hang on at 1 HP.

---

## 8. Overworld Features
- Day/night clock, moon phases and weather (needed for Ascension).
- Travel moves, unlocked by Chapter Seals: Cut, Surf, Climb, Glide, Light (dark caves) and **Rift** (fast travel between Realms).
- A Healing Inn and an Ink Shop in every town.
- A Hero/Villain meter in Capeworth and a camera (Evidence Lens) in Hollowmere.

---

## 9. Build Plan (suggested)

| Phase | What gets built | Art needed first |
|---|---|---|
| 1. Vertical slice | Prologue Village + Sakuraden, 1 starter line, 5 wild lines, 1 Chapter Master, battles, Inscribing | Style Lock, player, Professor, rival, Sakuraden tileset, Sakuraden creatures, battle UI |
| 2. Core loop | Ascension methods, Bond, items, saving, the Lorebook screen | Item icons, Lorebook UI |
| 3. All Realms | Remaining 5 Realms, 20 more Chapter Masters, Redactors | Each Realm's tileset, trainers and creatures |
| 4. Endgame | Paragon Eggs, Sovereign Trials, Grand Anthology | Sovereigns, champions, league tileset |
| 5. Sky Realm | The Midnight Marquee, Night Ferry, Lantern and Survive-the-Night systems | Marquee tilesets, 13 lines, Lastlight and Bogeyreign |
| 6. Polish | Quillion, music, balance | Title screen, effects |

Build it like your other games, as an HTML5 game that runs in a browser and can also be packaged as a Windows app.

---

## 10. Keeping It Original (important)

The creatures are **echoes**: they nod to a famous character *type* (a spiky-haired fighter, a caped strongman, a rubber-hose mouse) but are **original animals with original names**. That's on purpose:

- **ChatGPT will refuse** or water down prompts that name copyrighted characters (Goku, Batman, Mickey, Mario and so on). Every prompt in `CREATURE_PROMPTS.md` describes the design instead and never names a character.
- **If you ever share or sell the game**, copying a real character's name or exact look can get it taken down. Nods to tropes are fine. The classic games do this too (their kicking and punching fighters nod to famous martial-arts movie stars).
- **Gods and myths** are public domain, but some come from religions people practice today. The Pantheos lines are built on ancient pantheons (Greek, Egyptian, Norse, Celtic, Mesoamerican) and folklore (the Jade Rabbit), and use the gods' animals and symbols (Athena's owl, Anubis's jackal, Thor's goats), not cartoons of the gods themselves. Keep it that way if you add more.
- **Horror movie villains** (the sky Realm) are copyrighted, more than any other group in the game. The Marquee creatures nod to horror *tropes* (a masked lake slasher, a dream stalker, a killer doll, a sewer clown, a TV ghost) and are animals with new names. Never put a movie title or villain's name in a prompt.
- **Cryptids and classic monsters** (Bigfoot, Nessie, Mothman, the Chupacabra, the Jersey Devil, Frankenstein's creature, Dracula, the deep-sea horror) are folklore or public-domain books, so they're safe. Avoid using the look of any specific movie version.

---

## 11. Ideas to Add Later
- 7 hidden **Lost Echoes** (event-only mythicals, one per Realm).
- **Crossover forms:** a Sakuraden Echo raised in Toonvale gets a cartoon variant.
- **Echo Fusion** of two Seedlings at the Hub's Bindery.
- More lines per Realm (aim for 10 to 12 each once the first 7 work).

---

## 12. The Seventh Realm: The Midnight Marquee

### Why it's there (and why everyone thought it was a myth)
Long ago, Quillion sealed away the stories people were too scared to finish, and locked them in a movie palace above the clouds. When you beat the Grand Champion, **The Editor** makes a last stand and fails, then flees **up** a red beam of light. That beam breaks the seal, and the Marquee rises over the hub. The blank seventh Lorebook tab fills in, the title screen's hidden seventh symbol lights up, and the subtitle changes to **The Seven Realms** for the rest of the save file. The Editor was working for the Boogeyman all along.

### Getting there
- The **Night Ferry**, a ghostly airship, docks at the Grand Anthology after the credits roll. Its ticket is the reward for beating the Grand Champion.
- The Realm is a cluster of **floating islands**, each one a different scary-movie "set," joined by rope bridges, cable cars and the Ferry. The **Projection Tower** stands at the top.
- Wild Echoes are Lv 55 to 75. The whole Realm is a post-game area.

### The movie-set islands
| Island | Horror trope it nods to | Who lives there |
|---|---|---|
| Camp Blackwater | Summer-camp slasher by the lake | Campcub line |
| Dreamlane Suburbs | Nightmare stalker in your dreams | Napcoon line |
| Dollhouse Manor | Possessed dolls | Dollypop line |
| Carnival of Grins | Sewer clown and creepy carnival | Croakle line |
| Static Video & the Old Well | Cursed videotape ghost | Fuzzlet line |
| The Old Farmhouse & Cornfield | Chainsaw farmhouse, scary scarecrows | Sawlet and Jackolette lines |
| The Puzzle Works | Trap-puzzle game master | Tickit line |
| Ring Road Cul-de-sac | Ghost-masked phone caller | Dialhoot line |
| Hilltop Haunted House | Poltergeists and living houses | Creaklet line |
| Deadmart Mall | Zombie horde at the mall | Shamblebun line |
| The Arctic Outpost Set | Shape-copying thing from the ice | Huskling line |
| Thunderhead Bay | The giant shark (Paragon) | Finlet line |
| Projection Tower | The Final Girl vs the Boogeyman | Lastlight and Bogeyreign |

### New creatures up here
**12 new Echo lines + 1 Paragon line = 65 creature stages, plus 2 Sovereigns (4 forms).** Full details are in `ROSTER.md`. Their Ascension methods include some of the strangest in the game:
- **Sequel:** Campcub has to faint 5 times, because it always comes back.
- **Low Bond:** Dollypop only Ascends when it's *unhappy* with you, because the doll turns on its owner.
- **7-day curse:** use a Cursed Tape on Fuzzlet, then wait 7 in-game days.
- **27-day cycle:** Carnivoad takes its final stage 27 in-game days after its last Ascension.
- **Horde grows:** Shamblebun Ascends when another Shamblebun-line Echo is in the party.
- **Friday night** (Campcub) and **Halloween night, Oct 31** (Jackolette) on the in-game calendar.
- **Phone calls:** Dialhoot needs 10 calls on your in-game phone.

### Catching in the sky Realm: "Survive the Night"
- **Lights Out:** the islands are dark. You carry a **Lantern** that runs on oil. When it's out, Fright Echoes come closer and battles start with a **jump scare** (your lead gets Fear).
- **They hunt you:** many Fright Echoes are visible on the map and **chase** you, slasher-movie style. Hide in lockers and closets, or turn and fight.
- **Final Girl rule:** a Fright Echo can't be Inked until your lead Echo has **survived 3 of its turns**. After that, the Rune Ring works as normal, and Moonblood Ink and the new **Reel Ink** work best.

### Sovereign Pacts
- **Lastlight, the Final Girl:** escort her lantern across the islands until sunrise, then win the battle before your lantern runs out.
- **Bogeyreign, the Boogeyman:** a battle that changes "movies" every 3 turns (lake, dream, carnival, TV). Each one has its own rules.
- With both Pacts made, you have 14 Sovereigns and Quillion's last page opens.

### Night Masters (post-game gym leaders)
They give out **4 Ticket Stubs** instead of Chapter Seals.
| Night Master | Type | Ticket Stub |
|---|---|---|
| Scout Calloway, the last camp counselor still standing | Fright/Tide | Campfire Stub |
| Madame Marionette, the doll collector | Fright/Spirit | Puppet Stub |
| Professor Static, owner of the video store | Fright/Volt | Rewind Stub |
| Bonnie Graves, survivor of the mall | Fright/Venom | Survivor Stub |
| **The Projectionist** (Realm boss), the Editor unmasked | Fright/Shadow | the Final Reel |

### Keep it spooky, not gory
Your players include kids, so keep this Realm at "scary sleepover movie" level: no blood or wounds. Weapons look like props (motor-tusks, claw tips, an oar). Jump scares, creepy music and chases are where the fear comes from.
