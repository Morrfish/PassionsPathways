# CLAUDE.md: Chapter 3 AI Lab

Project context for Claude Code. Read this first.

## What this is
A **static website** (no build step, no server, no dependencies) for a high-school course, *Foundations of Artificial Intelligence*, taught by **Dr. Morris** (morrisc@blufftonschools.org). It gives students hands-on activities for **Chapter 3: Types of AI and How Machines Learn**, and gives the teacher a page that scores every submission. It is hosted on **GitHub Pages** and used through **Google Classroom**.

- `student.html`: the lab (Activities 3 to 7 plus Final Check). Work autosaves to `localStorage`; students download `_PROGRESS.json` and a final `_SUBMISSION.json`.
- `teacher.html`: drop in many submission files, get scores, review written answers, export CSV.
- `index.html`: landing page.
- Everything is vanilla JS with classic `<script>` tags (so it also works from `file://`). **Do not introduce a build step, bundler, framework, CDN dependency, analytics, or any network call that sends student data.** Student privacy is a hard requirement: nothing leaves the browser except files the student downloads.

## File map
| File | Role |
|---|---|
| `js/core.js` | state (`AI.S`), autosave, download/upload, file fingerprint (`AI.checksum`), helpers |
| `js/viz.js` | `AI.Plot` canvas, tiny ML library (`AI.ml`: logistic, kNN, k-means), creature SVG sprites, optional art lookup |
| `js/items.js` | **check questions (`AI.CFU`)**, **written prompts (`AI.OPEN`)**, activity list |
| `js/data.js` | deterministic datasets: pixel letters, fraud (400 txns), hiring (20 rows + 1,000-applicant pool), case-file items |
| `js/gen.js` | seeded creature generators for Activity 3 missions |
| `js/scoring.js` | `AI.score(submission, overrides)`: the single scorer used by BOTH student and teacher pages |
| `js/ui.js` | shared widgets (check questions with 2 tries, open responses, inputs, tabs) |
| `js/a3.js`, `a45.js`, `a67.js` | the activities |
| `js/student.js`, `js/teacher.js` | the two app shells |
| `tests/` | `node tests/unit.js` (fast) and `node tests/e2e.js` (Playwright) |
| `IMAGE_LIST.md`, `assets/` | optional art; see below |
| `sample-submissions/` | fictional students for testing the teacher page |

## Rules that must not break
1. **Scoring is recomputed from raw answers and logs.** Never trust a score stored in a file. Student and teacher share `scoring.js`, so a change there changes both.
2. **Total is 112 points** (A3 32, A4 15, A5 15, A6 22, A7 15, Final 13). If you change point values, update `tests/unit.js`, the README table, and the teacher page text.
3. **Only the first test on each dataset counts** (Activity 3 missions 1 and 3) to prevent tuning to test answers. Check questions: correct on try 1 = full, try 2 = half.
4. **Do not rename question or prompt IDs** (`a3q1`, `a6o2`, ...) or localStorage/answer keys. Students' saved files depend on them. Add new IDs instead.
5. **The file fingerprint is a tamper deterrent, not security.** Do not claim otherwise in UI text or docs. The answer key is in client code; this is formative scoring.
6. **Accessibility floor:** visible focus, keyboard alternatives for every drag interaction, shapes plus color for species, `prefers-reduced-motion` respected, plain-language errors.
7. **Brand:** navy `#141B3C` / `#1E2761`, cyan `#00D4FF` (the machine), amber `#F5A623` (the human). Every page keeps the **TECH footer** (Take Risks, Evaluate Work, Create, Have Fun) and Dr. Morris's name and email.
8. **Content accuracy:** the Robert Williams case file follows ACLU, University of Michigan Law, AP, and CBS Detroit reporting. Keep it respectful, illustrated or generic art only, never a real person's likeness. The fraud and hiring data are fictional. Do not state contested claims as settled.

## Testing
```
node tests/unit.js                 # datasets + scorer sanity (no browser)
npm i -D playwright && npx playwright install chromium
node tests/e2e.js                  # plays a student through everything, loads the file in the teacher page
```
Run both before every commit. They were green at handoff.

## Known gaps and good next tasks
- **Not browser-tested beyond Chromium.** Try Safari, Firefox, and a real Chromebook (1366x768).
- **Activity numbering mismatch with print materials:** online Activity 5 is *Fraud Detective* (new), so online Bias = Activity 6 and Case File = Activity 7, but the printed packet and teacher handout (Word files, not in this repo) call them 5 and 6. Either renumber the Word files or note it for students.
- **Art not yet wired** (see `IMAGE_LIST.md`): species portraits/happy/confused, badges, mission backdrops, bias/case/fraud icons. The three creature bodies, three height variants each, and two Nibble mascot poses ARE wired via `assets/species/*` and `assets/mascot/*` (exact names in `assets/README.md`).
- **Activities 1 and 2** (Report Card/Claim Checker, Four Families Sort) are still paper-only. Candidates for online versions.
- **Written-answer scoring** is a keyword and length rubric (`AI.openScore`). Teacher can override per answer. Do not make it look like final grading.
- Keyboard-only users cannot drag handles; they use nudge/rotate buttons. No full screen-reader audit yet.
- Student answers for unfinished tasks earn 0; the Submit page warns but allows submitting.

## Style for changes
Small, readable vanilla JS. Plain-language UI copy in sentence case, active voice, buttons that say what they do. Keep pages usable at 1366x768. Keep the repo free of generated or student data except `sample-submissions/` (fictional).
