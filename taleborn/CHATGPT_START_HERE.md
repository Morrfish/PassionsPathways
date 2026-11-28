# How to Make Taleborn's Art in ChatGPT

Follow these steps in order. A ChatGPT **Project** keeps all of Taleborn's files and rules in one place, so every chat inside it already knows the game.

---

## Step 1: Get the files

Download these 6 files from the `taleborn` folder:

| File | What ChatGPT uses it for |
|---|---|
| `CHATGPT_START_HERE.md` | This guide |
| `GAME_DESIGN.md` | The world, story, realms and rules (background knowledge) |
| `ROSTER.md` | Every creature: name, type, look, evolution |
| `CREATURE_PROMPTS.md` | The ready-made image prompts, each with an ID like `SAK-01-F` |
| `ART_LIST.md` | Everything that isn't a creature: characters, maps, items, menus, effects |
| `creatures.csv` | Your checklist. Keep this one for yourself; ChatGPT doesn't need it. |

Get them from GitHub at `github.com/Morrfish/PassionsPathways`, branch `claude/pokemon-game-design-plan-n5cka2`, folder `taleborn`. Or use the copies attached in the Claude chat.

---

## Step 2: Make a ChatGPT Project

1. In ChatGPT, click **Projects → New project** and name it **Taleborn**.
2. Open the project's **Files** (or "Add files") and upload: `GAME_DESIGN.md`, `ROSTER.md`, `CREATURE_PROMPTS.md`, `ART_LIST.md`, `CHATGPT_START_HERE.md`.
3. Open the project's **Instructions** and paste in this whole box:

```
You are the art department for my original creature-collecting RPG "Taleborn: The Six Realms".
The project files hold everything: GAME_DESIGN.md (world and rules), ROSTER.md (every creature),
CREATURE_PROMPTS.md (image prompts, each with an ID like SAK-01-F) and ART_LIST.md (all other art).

When I say "Make prompt [ID]", find that exact ID in CREATURE_PROMPTS.md and generate the image from
that prompt, word for word. Don't change the creature designs or names.

Style for EVERY image:
- Pixel art, Game Boy Color / Game Boy Advance era monster-RPG look
- Crisp 1-pixel dark outlines, simple 2-3 step shading, 6-8 colors per sprite
- Plain solid white background unless I ask for a scene
- No text, labels, numbers, watermarks or frames in the image
- Every creature and character is an ORIGINAL design. Never copy or name an existing franchise
  character, even when a description sounds like a famous trope.

Every creature needs TWO battle sprites:
- FRONT (prompt IDs ending in -F): faces the viewer in a 3/4 front pose (the enemy/wild view)
- BACK (prompt IDs ending in -B): seen from behind in a 3/4 rear pose (the player's own creature)
The BACK sprite must match its FRONT sprite exactly: same design, colors, markings and size.
Always make the FRONT first, and the BACK in the same chat right after it.
If I upload a style reference image, match its pixel size, outline and shading.
```

---

## Step 3: Test the style with one line

In a new chat inside the project, type:

> **Make prompt SAK-01-F**

That's the Kipkip starter line facing you. Ask for changes until you love the look, for example *"Redo only stage 3, keep the rest"* or *"chunkier pixels, fewer colors"*. Then:

> **Make prompt SAK-01-B**

That's the same 5 creatures from behind. Then:

> **Make prompt SAK-01-I**

That's the little party-menu icons.

**Save your favorite FRONT sheet as your "style reference."** From now on, attach that image to the first message of every new chat and say *"Match this style."* This is the best way to keep 300+ creatures looking like one game.

---

## Step 4: Work through the list

- **One new chat per realm**, or about every 10 prompts. Very long chats start drifting off style. Attach your style reference each time.
- **The order for every line:** `-F` (front), then `-B` (back), then `-I` (icons).
- **Prompt IDs by realm:**

| Code | Realm | Lines | Legendaries |
|---|---|---|---|
| SAK | Sakuraden (anime) | SAK-01 to SAK-07 | SAK-S1, SAK-S2 |
| CAP | Capeworth (heroes & villains) | CAP-01 to CAP-07 (CAP-03 also has -VF and -VB for the villain branch) | CAP-S1, CAP-S2 |
| TOO | Toonvale (cartoons) | TOO-01 to TOO-07 | TOO-S1, TOO-S2 |
| PAN | Pantheos (gods) | PAN-01 to PAN-07 | PAN-S1, PAN-S2 |
| RES | Respawn Reach (video games) | RES-01 to RES-07 | RES-S1, RES-S2 |
| HOL | Hollowmere (cryptids) | HOL-01 to HOL-07 | HOL-S1, HOL-S2 |
| MAR | The Midnight Marquee (secret 7th realm) | MAR-01 to MAR-13 | MAR-S1, MAR-S2 |
| ORI | Quillion | | ORI-1 |

Line 01 in each ground realm is the starter, and line 07 is the Paragon (line 13 in the Marquee).

- **For everything else** (characters, maps, items, menus), say for example:
  > *"From ART_LIST.md section B, make the overworld sprite sheet for Professor Inkwell."*
  > *"From ART_LIST.md section E, make the Inks item icon sheet."*

**If ChatGPT can't find an ID** or mixes up a creature, open `CREATURE_PROMPTS.md` yourself, copy the prompt text inside the grey box, and paste it in. Pasting always works.

---

## Step 5: Save and check off

1. Download each image. Crop each creature out, remove the white background, and shrink it with **nearest-neighbor** resizing (no smoothing) to 64x64 px. The free sites remove.bg and Piskel can do this.
2. Name the files with the dex number from `ROSTER.md`:
   - `creatures/front/001_kipkip.png`
   - `creatures/back/001_kipkip.png`
   - `creatures/icon/001_kipkip.png`
3. In `creatures.csv`, put an **x** in the `front_sprite`, `back_sprite` and `party_icon` columns as you finish each one.

## The Google Drive loop (ChatGPT ↔ you ↔ Claude)

Your Google Drive has a folder called **Taleborn Art**:

| Folder or file | Who uses it | What goes there |
|---|---|---|
| `1 Inbox (new images from ChatGPT)` | You drop images in. Claude reads them. | Every image you download from ChatGPT, still uncropped |
| `2 Approved (game-ready sprites)` | Claude | Cropped, background-removed, resized and renamed sprites |
| `3 Style Reference` | You and ChatGPT | Your favorite "this is the look" image(s) |
| `4 Project Files (for ChatGPT to read)` | ChatGPT reads. Claude keeps them up to date. | These guides, the roster and the prompts |
| `5 Review (size tests and previews)` | Claude | In-game mockups and size tests to look at before anything is approved |
| `6 Messages` | Both of them | One dated note per message, for example `2026-11-28 0445 Claude - SAK-01 review`. The newest is at the top. Replies are new files, not edits. |

**The loop:**
1. In ChatGPT, make the images (for example `Make prompt SAK-01-F`).
2. Save them into **1 Inbox** (ChatGPT can upload them there directly once Drive is connected). Name each file with its prompt ID, like `SAK-01-F.png` (add `-v2` for redos).
3. Tell Claude: *"Check the Taleborn inbox."* Claude reviews the images (do they match the roster, do the front and back match, is the style consistent), prepares the game-ready sprites, ticks off the checklist, and writes a review note in **6 Messages**.
4. In ChatGPT, say: *"Read the newest Claude note in 6 Messages and do its redo requests, then upload a reply note there."* (ChatGPT needs Google Drive connected under Settings → Connectors / Apps for this.)
5. Repeat.

**Faster downloads:** install **Google Drive for desktop**. It puts a Drive folder on your computer, so saving a ChatGPT image into `Taleborn Art/1 Inbox` uploads it automatically.

**Your Synology NAS:** Claude runs in the cloud and can't reach your NAS directly. Use the free Synology app **Cloud Sync** to mirror the `Taleborn Art` Drive folder to the NAS. You get a backup there automatically, and Drive stays the place Claude and ChatGPT share.

## Good to know
- Image generation has daily limits on most ChatGPT plans. The creatures alone are 212 prompts, so plan on doing a realm or two a week.
- ChatGPT won't draw copyrighted characters. The prompts already avoid character names, so don't add any.
- Start with **Phase 1** (`GAME_DESIGN.md`, Section 9): the Sakuraden creatures, the player, the Professor, the rival, the Sakuraden tileset and the battle UI. You'll be able to test the first playable piece of the game sooner.
