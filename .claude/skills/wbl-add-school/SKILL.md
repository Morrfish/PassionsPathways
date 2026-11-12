---
name: wbl-add-school
description: Add a new school to ClockedIn, the WBL (work-based learning) hours tracker app for vocational / career-tech schools, with that school's colors and logo pulled from its website, then build its branded student phone app and supervisor app. Use whenever the user wants to add, brand, set up, re-skin, or update a school, district, career center, or JVSD for the WBL tracker or "WBL Hours" app, gives a school website and asks for a version for them, or wants to change a school's logo/colors/name in the tracker, even if they don't say "skill" or "brand".
---

# Add a school to ClockedIn (the WBL hours tracker)

The WBL tracker lives in the `wbl-tracker/` folder of the `morrfish/passionspathways`
repository. Every school is a folder in `wbl-tracker/brands/<school-id>/` holding a
`brand.json`, a logo, and an optional square icon. A build script turns a brand folder into:

- `dist/<school-id>/student/`: the phone app (static files to host on any HTTPS site)
- `dist/<school-id>/supervisor/ClockedIn Supervisor.html`: one file the supervisor opens in Edge/Chrome

`brands/default/` is the unbranded version. Never edit it for a specific school.

Every school's version also shows the **ClockedIn product logo**
(`wbl-tracker/src/shared/clockedin-logo.png`): it sits at the top of the phone's welcome screen,
on the supervisor's setup screen, and in a small "Powered by ClockedIn" footer. The build adds it
automatically. Don't remove it, and don't use it as a school's logo. (`"showPoweredBy": false` is only
for the unbranded version, which already uses the ClockedIn logo in its header.)

The user is a teacher, not a developer. Talk in plain language, show them pictures of the
result, and keep technical detail out of the final message unless they ask.

## What you need from the user

Only the **school website URL** is required. Work out everything else from the site. Ask
only if the site truly doesn't say (for example, two very different logos are both prominent).
Optional extras they may give you: a short name, a required-hours number other than 250,
the web address where the student app will be hosted.

## Steps

### 1. Find the repo
`cd` into the repo root (the folder holding `wbl-tracker/`). If the session doesn't have the
repository, add `morrfish/passionspathways` with the add-repo tool, clone it, and work on the
branch the session tells you to use.

### 2. Pick the school id
Lowercase words joined with dashes, short and recognizable: `greene-ccc`, `miami-valley-ctc`.
If `brands/<id>/` already exists, this is an **update**: keep the existing files and only
change what the user asked for.

### 3. Pull brand candidates from the website
```bash
cd wbl-tracker
node tools/extract-brand.mjs <url> <id>
```
This writes `brands/<id>/_source/` with `site.png` (screenshot), `logos.png` (logo candidates on
light and dark), `logo-N.*` files, and `candidates.json` (name, colors ranked by weight with
where each was seen, CSS variables).

**If the site is blocked** (`ERR_TUNNEL_CONNECTION_FAILED`, `403` from the proxy, `ENOTFOUND`):
the session's network doesn't allow that host. Call `get_environment`, then propose adding the
school's exact host(s) (`www.school.org` and `school.org`) with `update_environment`, or with
`create_environment` if the description says so. Say one sentence first about why. If images
come from another host (check `src=` hosts in the page), add that one too. If the user declines,
ask them to send the logo file and say the school colors instead, then continue from step 5.

### 4. Look before you choose
Open `site.png` and `logos.png` with the Read tool. Don't choose from numbers alone.

**Logo:** use the school's main header or wordmark logo, ideally SVG, otherwise the largest
PNG. Avoid favicons, social icons, sponsor logos, and hero photos. Copy it to
`brands/<id>/logo.<ext>`.
- A logo that is white or light (made for a dark header) disappears on the default white tile.
  Set `colors.logoBg` to the school's dark color in brand.json.
- The logo sits in a box about 44px tall and up to 240px wide, so very detailed seals get small.
  A wordmark is usually better than a seal if both exist.

**Icon (phone home screen, square):** if the logo is wide (wider than about 1.5:1) and has a
separate symbol (a letter mark, mascot, or emblem), make a square icon of just that symbol:
- SVG: copy the file and change its `viewBox` to a square around the symbol (find the symbol's
  group and its coordinates in the paths). Save it as `icon-mark.svg` and check the result by
  building and viewing `dist/<id>/student/icon-192.png`.
- PNG: crop with Playwright or Python/PIL to a square around the symbol, then save as `icon-mark.png`.
- If there's no separable symbol, leave `icon` out. The build centers the full logo instead.

**Colors:** two colors are needed.
- `primary`: the school's main color, used for the header bar, main buttons, and progress
  bars. Usually the nav/header background or the dominant link/heading color. It needs
  enough contrast for text on it: prefer a darker/stronger shade if the site has one.
- `accent`: the second school color, used for the stripe under the header, highlight
  buttons, and focus rings. Often the button color.
- Use the site's real hex values from `candidates.json` (`theme-color`, header/nav/button
  backgrounds, CSS variables), cross-checked against what you see in `site.png`. Don't invent
  shades. If the school has only one color, pick a darker or lighter step of it for accent, or
  a neutral gold/gray that the site uses.
- The build picks white or black text for each color automatically and warns below 4.5:1
  contrast. If it warns about `primary`, choose a darker shade of the same hue (the build's
  `readableOnWhite` helper in `tools/colors.mjs` shows how).

**Name:** `schoolName` is the official full name from the site title or logo.
`schoolShort` is what fits on a phone header (about 20 characters), such as "Greene CCC".

### 5. Write `brands/<id>/brand.json`
```json
{
  "id": "<id>",
  "schoolName": "Full School Name",
  "schoolShort": "Short Name",
  "appName": "ClockedIn",
  "website": "<url>",
  "state": "OH",
  "logo": "logo.svg",
  "icon": "icon-mark.svg",
  "colors": { "primary": "#335ba5", "accent": "#40a2da" },
  "studentAppUrl": "https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/<id>/student/",
  "defaultGoalHours": 250,
  "notes": "Where each choice came from, e.g. primary = nav bar blue on <url> (date)."
}
```
- Optional: `colors.logoBg`, `colors.onPrimary`, `colors.onAccent`, `colors.link`. Only add these
  to override the automatic choices.
- Keep `appName` as "ClockedIn" unless the user names the app something else.
- `studentAppUrl`: the student app is hosted free on GitHub Pages from the repo's `main`
  branch, so use `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/<id>/student/`
  unless the user says it's hosted somewhere else. It only goes live after the branch is merged
  into `main`. Offer to open a pull request.
- `state`: the school's state abbreviation.
- `email` (optional, add only when the user gives you IDs from district IT): presets the
  supervisor's **Check email** connection for everyone at that school. Use
  `{ "provider": "google", "googleClientId": "…" }` or
  `{ "provider": "microsoft", "microsoftClientId": "…", "microsoftTenant": "…" }`.

### 6. Build and test
```bash
node tools/build.mjs <id>
SHOTS=<scratchpad>/shots-<id> node tests/e2e.mjs <id>
```
- The build prints `✓` and any contrast warnings. Fix warnings by adjusting colors.
- The test runs the whole loop (supervisor adds a student, phone enrolls and sends a redacted
  pay stub, supervisor imports) and must end with **All checks passed**.
- Open these screenshots and check them: the logo is visible and not squashed, the colors match
  the school, and the text is readable:
  - `03-student-home.png` (phone)
  - `06-student-send.png`
  - `11-practice-dashboard.png` (supervisor)
  - `dist/<id>/student/icon-192.png` (home-screen icon)
- Fix anything off and rebuild.

Also add the new school's row to the table in `wbl-tracker/docs/email-setup.md`. Its return
address is `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/<id>/supervisor/oauth-callback.html`.

### 7. Save
Leave `brands/<id>/_source/` in place: it's a record of where the branding came from. Then
commit `brands/<id>/` and `dist/<id>/` with a message like `Add <School Name> brand` and push to
the session's branch.

### 8. Tell the user
In plain language:
- which logo and colors you used, and where on their site they came from
- a phone screenshot and a supervisor screenshot (send the files)
- the files to hand over:
  - `wbl-tracker/dist/<id>/supervisor/ClockedIn Supervisor.html` goes to the supervisor's computer
  - `wbl-tracker/dist/<id>/student/` goes on a web host
- the supervisor web address to bookmark:
  `https://morrfish.github.io/PassionsPathways/wbl-tracker/dist/<id>/supervisor/ClockedIn%20Supervisor.html`
- for the **Check email** button, the school's IT follows `wbl-tracker/docs/email-setup.md`
- anything you guessed that they should confirm, for example "the site uses two blues, so I
  used the darker one for headers"

## Changing an existing school
Edit `brands/<id>/brand.json` or the logo files, then repeat steps 6–8. A school's supervisor
data is never in the repo. It lives in their own data folder, so rebuilding doesn't touch
anyone's records. A supervisor only has to replace their `ClockedIn Supervisor.html` file.
