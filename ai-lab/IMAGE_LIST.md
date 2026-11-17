# Chapter 3 AI Lab: Image List

**Good news first:** the lab already works with **zero images**. It draws its own creatures (as SVG), a small robot mascot, charts, and pixel grids in code. Everything below is optional polish. Add art whenever you have it.

Legend for the "Wired?" column:

- **Yes** = drop the file in the exact folder with the exact name and the lab uses it automatically.
- **Not yet** = recommended art, but I have not wired it into a screen. Send me the files (or tell me where you want them) and I will connect them.

General rules for every image:

- **PNG with a transparent background** (SVG is fine for icons). Keep each file under 300 KB so Chromebooks load fast.
- **Original, public-domain/CC0, purchased-with-license, or generated art your district allows.** Check your district policy on AI-generated images. Keep a note of where each image came from.
- **No photos or likenesses of real people**, especially not Robert Williams, his family, police officers, or students. Use abstract, illustrated, or silhouette art only.
- **Do not rely on color alone.** Species must be tellable apart by silhouette and shape too (the lab also uses circle / triangle / square markers).
- Give every image a short plain-language description. I will use it as alt text for screen readers.

---

## 1. Train the Machine (Activity 3): the important set

The three species are the heart of this activity. Students see them small (about 80 px) next to the plot, so **bold silhouettes beat tiny details.**

### 1a. Creature bodies (Wired? Yes)

The lab draws the **eyes and the spots on top of your body art**, so the body must have **no eyes and no spots**. Leave a smooth blank "face area" in the upper third.

| File | Wired? | Size | Description |
|---|---|---|---|
| `assets/species/zorb_body.png` | Yes | 256 x 256, transparent | **Zorb.** Round, soft blob with two short antennae. Cool teal body (#0091B3 family). Friendly, bouncy. |
| `assets/species/quib_body.png` | Yes | 256 x 256 | **Quib.** Taller, oval body with two pointed ears. Warm amber body (#E89A12 family). Alert, curious. |
| `assets/species/flonk_body.png` | Yes | 256 x 256 | **Flonk.** Squat, boxy body with a small head fin and a tail. Magenta body (#B53390 family). Calm, sturdy. |

Optional height versions (the lab picks one by the creature's height; if absent it uses the file above):

| Files | Wired? | Use when height is |
|---|---|---|
| `zorb_body_s.png`, `quib_body_s.png`, `flonk_body_s.png` | Yes | under 20 cm (short) |
| `zorb_body_m.png`, `quib_body_m.png`, `flonk_body_m.png` | Yes | 20 to 31 cm |
| `zorb_body_l.png`, `quib_body_l.png`, `flonk_body_l.png` | Yes | 32 cm and up (tall) |

Style: flat vector or soft painted, thick outline in the species color, no gradients that disappear at small sizes. **Same style, same lighting, same outline weight across all species.** Keep the three silhouettes clearly different from each other.

### 1b. Species field-guide art (Wired? Not yet)

For a "field guide" card and for the Mission intro screens. I would use these to make the species feel like real characters.

| Files | Size | Count | Description |
|---|---|---|---|
| `species/zorb_portrait.png`, `quib_portrait.png`, `flonk_portrait.png` | 512 x 512 | 3 | Front-facing portrait, neutral pose, **no spots** (spots are the data). |
| `species/zorb_happy.png`, `quib_happy.png`, `flonk_happy.png` | 512 x 512 | 3 | Same creature "found it!" pose, for correct results. |
| `species/zorb_confused.png`, `quib_confused.png`, `flonk_confused.png` | 512 x 512 | 3 | Same creature puzzled pose, for misclassified results. |
| `species/mystery_silhouette.png` | 512 x 512 | 1 | Dark "?" silhouette for unlabeled/test creatures. |

### 1c. Scene and badges for the missions (Wired? Not yet)

| File | Size | Description |
|---|---|---|
| `ui/habitat_meadow.png` | 1600 x 900 | Soft, low-contrast meadow/lab background for the plot area. Must stay pale so data points remain visible. |
| `ui/badge_m1_line.png` ... `badge_m6_sample.png` | 256 x 256 each (6) | One badge per mission: **Line Drawer, Dial Tuner, Flag Planter, Generalizer, Group Namer, Fair Sampler.** |
| `ui/badge_replay.png` | 256 x 256 | "Replayed 3 times" badge. |
| `ui/icon_dial.png`, `icon_flag.png`, `icon_magnifier.png`, `icon_scales.png` | 128 x 128 (4) | Small icons for dials (parameters), flags (prototypes), the k-neighbors lens, and the fairness scales. |

### 1d. Machine mascot "Nibble" (Wired? Yes, two poses)

| File | Wired? | Size | Description |
|---|---|---|---|
| `assets/mascot/nibble_think.png` | Yes | 128 x 128 | Friendly small robot, navy body (#1E2761), glowing cyan eyes (#00D4FF), amber smile (#F5A623), one antenna. Thinking / pleased expression. |
| `assets/mascot/nibble_oops.png` | Yes | 128 x 128 | Same robot, slightly worried "oops" expression. |
| `mascot/nibble_cheer.png`, `nibble_wave.png` | Not yet | 128 x 128 | Optional: celebrating and greeting poses. |

---

## 2. Be the Neural Network (Activity 4)

The pixel grids are drawn by code. Optional art:

| File | Wired? | Size | Description |
|---|---|---|---|
| `ui/layer_inspector_1.png`, `_2.png`, `_3.png` | Not yet | 256 x 256 (3) | Three small "inspector" characters: one holding a magnifier over edges, one assembling shapes, one wearing a "decider" badge. |
| `ui/network_diagram.png` | Not yet | 1200 x 500 | Clean layered diagram: input pixels, three layers, output letter. |

---

## 3. Fraud Detective (Activity 5)

| File | Wired? | Size | Description |
|---|---|---|---|
| `ui/icon_card.png` | Not yet | 128 x 128 | Simple credit card (no real brand marks, no real numbers). |
| `ui/icon_alarm.png`, `icon_shield.png` | Not yet | 128 x 128 | Alarm bell (false alarm) and shield (caught fraud). |
| `ui/icon_traveler.png`, `icon_local.png` | Not yet | 128 x 128 | A suitcase and a house, for the traveler and local groups. |

---

## 4. Bias Detective Lab (Activity 6)

Use **abstract, non-identifying** art here. No faces. No stereotypes of any group.

| File | Wired? | Size | Description |
|---|---|---|---|
| `bias/applicant_silhouette_1.png` ... `_6.png` | Not yet | 256 x 256 (6) | Neutral, varied **silhouette** icons (different shapes, heights, hairstyles, mobility aids, headscarves) in a single flat color. Used for the "what-if applicant." |
| `bias/office_building.png` | Not yet | 800 x 400 | Illustrated fictional "SkyBright Tech" building. |
| `bias/icon_resume.png`, `icon_gap.png`, `icon_school.png`, `icon_club.png` | Not yet | 128 x 128 (4) | Icons for the four features the AI sees. |
| `bias/icon_scales_balanced.png`, `icon_scales_tipped.png` | Not yet | 256 x 256 (2) | For the four-fifths rule: fair vs. tipped. |

---

## 5. Case File: Robert Williams (Activity 7)

Be respectful. This is a real person. Everything should be **illustrated and generic**, never a depiction of him, his family, or any officer.

| File | Wired? | Size | Description |
|---|---|---|---|
| `case/evidence_blurry_still.png` | Not yet | 640 x 360 | An **illustrated** blurry security-camera still of a generic, faceless figure, with a timestamp. Must not look like a real photo of a real person. |
| `case/evidence_many_matches.png` | Not yet | 640 x 360 | Grid of six generic **silhouette** cards with "possible match" labels, to illustrate a candidate list. |
| `case/icon_lineup.png`, `icon_handcuffs_crossed.png`, `icon_courthouse.png`, `icon_document.png` | Not yet | 128 x 128 (4) | Simple icons for the lineup, arrest, settlement/court, and policy document steps. |
| `case/timeline_strip.png` | Not yet | 1600 x 200 | Optional decorative strip: 2018, 2020, 2024 milestone markers (no text needed; the lab writes the text). |

---

## 6. Global UI (optional)

| File | Wired? | Size | Description |
|---|---|---|---|
| `ui/favicon.png` | Not yet | 64 x 64 | Navy square with a cyan dial. |
| `ui/logo_ailab.png` | Not yet | 400 x 80 | "Chapter 3 AI Lab" wordmark for the top bar (white text, transparent background). |
| `ui/social_preview.png` | Not yet | 1200 x 630 | Image shown if the link is pasted into Classroom or chat. |

---

## Quick prompts if you use an image generator (check district policy first)

Use the same style words for every creature so the set matches:

> "Flat vector illustration of a cute imaginary creature, front view, thick dark-navy outline, **{round teal blob with two short antennae | tall amber oval with two pointed ears | squat magenta box with a head fin and tail}**, **no eyes, no spots, plain blank face area**, centered, transparent background, simple shapes, readable at 80 pixels."

> "Friendly small robot mascot, navy body, glowing cyan round eyes, amber smile, single antenna, flat vector, transparent background, **{thinking / slightly worried}** expression."

Generated art needs a human check for consistency, stray text, and anything that looks like a real person.

## Priority order if you only have time for a little

1. The three `*_body.png` creatures (students look at these the most).
2. The two Nibble mascot poses.
3. Species portraits, happy, and confused poses (next release).
4. Everything else.
