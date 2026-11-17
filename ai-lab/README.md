# Chapter 3 AI Lab

Interactive student activities (Activities 3 to 7 plus a Final Check) for *Foundations of AI, Chapter 3: Types of AI and How Machines Learn*, with a teacher scoring page.

- **No server, no accounts, no tracking.** It is a plain static website (HTML, CSS, JavaScript). Student work stays in the student's browser until they download it.
- **Students** work, download a progress file any time, and download a final `_SUBMISSION.json` to turn in on Google Classroom.
- **Teacher** opens `teacher.html`, drops in all the submission files, and every activity is scored. Written answers get a provisional score you can override.

Dr. Morris, morrisc@blufftonschools.org. TECH: Take Risks, Evaluate Work, Create, Have Fun.

---

## 1. Put it on GitHub Pages (about 5 minutes)

I cannot log in to your GitHub from here, so you will do these steps once. Option A needs no command line.

**Option A: in the browser**

1. Sign in at github.com and click **New repository**. Name it something like `ch3-ai-lab`. Choose **Public** (free GitHub Pages needs a public repo unless your account has Pages for private repos). Click **Create repository**.
2. Unzip the download on your computer. Open the unzipped `ai-lab` folder.
3. In the new repo click **Add file, Upload files**. Drag **everything inside** the `ai-lab` folder (the `index.html`, `student.html`, `teacher.html`, `css`, `js`, `assets`, `sample-submissions` and the `.nojekyll` file) onto the page. The files must sit at the top level of the repo, not inside another folder.
4. Click **Commit changes**.
5. Go to **Settings, Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, branch **main**, folder **/ (root)**, and **Save**.
6. After a minute or two GitHub shows your address: `https://YOUR-USERNAME.github.io/ch3-ai-lab/`
   - Student link: `.../student.html`
   - Teacher link: `.../teacher.html`

**Option B: command line**

```
cd ai-lab
git init
git add .
git commit -m "Chapter 3 AI Lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ch3-ai-lab.git
git push -u origin main
```

Then do step 5 above.

**Updating later:** change files and upload or push again. Students' saved work lives in their browsers, so updating the site does not erase it. (If you change question IDs in `js/items.js`, old answers to those questions will no longer match.)

**Privacy note about the teacher page:** `teacher.html` is public on the web like every other page. It does nothing without student files, and all processing happens in your browser. Anyone who finds the link sees an empty dashboard.

## 2. Test it before you teach it (3 minutes)

1. Open `teacher.html`.
2. Click the drop zone and select the three files in `sample-submissions/` (fictional students: Ada Lovelace, Grace Hopper, and a deliberately edited file for "Eve Edited").
3. You should see: Ada near the top, Grace with almost nothing and a "Short active time" flag, and Eve marked **Edited** because her file was changed after download.
4. Click a name to read every answer. Change a written-answer score and watch the total change. Try **Export class scores (CSV)**.
5. Then open `student.html` yourself, enter a name, and play Mission 1.

## 3. Run it with Google Classroom

**Create the assignment**

1. In Classroom: **Classwork, Create, Assignment**.
2. Title: *Chapter 3 AI Lab.* In the instructions paste the student link and this text:

   > Go to the link and enter your name. Work through Activities 3 to 7 and the Final Check. Your work saves on your computer automatically. When you finish: open **Submit**, press **Download my submission file**, then in this assignment click **Add or create, File, Upload**, choose the file that ends in `_SUBMISSION.json` (look in Downloads), and **Turn in**. If you use a shared or guest Chromebook, press **Download my progress** at the end of every class so you can pick up where you left off.

3. Set points (see scoring below), and optionally attach `student.html` as a link.

**Collect the files**

- Open the assignment, **Student work**. Classroom stores each student's file in your Drive folder for the assignment (usually *Classroom, Class name, Assignment name*). Select all the `_SUBMISSION.json` files in that Drive folder and download them together, or download them individually.
- Open `teacher.html`, select all the files at once, and drop them in.
- If a student submits twice, the **newest Submission** for the same name and period is used.

**Back to Classroom**

- Use **Export class scores (CSV)** and copy the totals into Classroom's grade column (Classroom does not import a CSV, so it is copy and paste).
- Tell students to resubmit if they edit after turning in.

## 4. How scoring works

Total **112 points** (use the percent for your gradebook).

| Section | Hands-on tasks (auto) | Check questions | Written answers | Total |
|---|---|---|---|---|
| Activity 3: Train the Machine | 14 | 8 | 10 | **32** |
| Activity 4: Be the Neural Network | 8 | 3 | 4 | **15** |
| Activity 5: Fraud Detective | 8 | 3 | 4 | **15** |
| Activity 6: Bias Detective Lab | 12 | 4 | 6 | **22** |
| Activity 7: Case File | 8 | 3 | 4 | **15** |
| Final Check and Exit Ticket | 1 | 10 | 2 | **13** |

- **Hands-on tasks** are recomputed from each student's raw choices using the same code the students ran. A stored score in a file is never trusted. Examples: Mission 1 test accuracy, number of different `k` values tried, whether the fraud settings meet Goal A and Goal B, whether the hiring fixes were tried, whether the letter network was truly fooled.
- **Replay rule:** in the data missions students can replay with new datasets as often as they like, but **only the first test on each dataset counts**. This stops them from tuning to the answers.
- **Check questions** give two tries: a correct first try is a full point, a correct second try is half a point.
- **Written answers** get a **provisional** score from a transparent rubric: enough words and at least two key ideas for the prompt gets full credit, some effort gets partial credit, blank or tiny gets zero. Read them in the student detail view and type an override. Overrides are saved in your browser. The checkbox **Count provisional written scores in totals** lets you hold those points back until you review.
- **Flags** are hints, not verdicts: very short active time, duplicate written answers, missing name.
- **Class insights** shows which questions most students missed first try (with the most common wrong answer) so you know what to reteach.

To change point values or wording, edit `js/scoring.js` and `js/items.js`. Everything is plain JavaScript.

## 5. What is in the folder

```
index.html            landing page (student / teacher)
student.html          the lab
teacher.html          scoring dashboard
css/style.css         look and feel
js/core.js            saving, downloading, file fingerprint
js/viz.js             plots, tiny machine-learning library, creature drawings
js/items.js           check questions and written prompts
js/data.js            fixed datasets (fraud, hiring, pixels, case file)
js/gen.js             creature dataset generators
js/scoring.js         the scorer used by the teacher page
js/ui.js, a3.js, a45.js, a67.js, student.js   the activities
js/teacher.js         the teacher page
sample-submissions/   three fictional files to test the teacher page
assets/               put optional art here (see IMAGE_LIST.md)
IMAGE_LIST.md         every image you might want, with sizes and names
```

## 6. Honest limits (please read)

- **It is formative, not locked-down.** The answer key lives in the page's code, so a determined student could find it. Each file also carries a fingerprint that shows **Edited** if someone changes it after downloading, but that deters casual tampering, not a skilled student. For a high-stakes grade, give an in-class check on paper or Classroom Quiz as well.
- **Shared or guest Chromebooks can erase saved work** when the student signs out. That is why the lab nags students to download their progress.
- **Browser storage is per browser and per computer.** A student who switches computers must use **Load a saved file**.
- **Tested in headless Chrome/Chromium** on a laptop-size screen, with a full simulated student run and the teacher page. I have **not** tested Safari, Firefox, iPads, or an actual Chromebook. Please try one Chromebook before class.
- **Fonts** load from Google Fonts; if your network blocks them, the lab falls back to system fonts and works fine.
- **Mouse or touch** is needed to drag line handles and flags; each has button alternatives (nudge, rotate, snap to averages) for keyboard users, and all other activities work with a keyboard. I have not run a full screen-reader audit.
- **Content check:** the case file reflects ACLU, University of Michigan Law, AP, and CBS Detroit reporting as of November 2026,. The fraud and hiring data are fictional.
- **Written-answer scoring is a first pass.** It checks length and key ideas, not whether the reasoning is correct. Read a sample.

## 7. Customizing

- Questions and prompts: `js/items.js` (keep each `id` the same if students have already started).
- Hiring data, fraud data, case-file statements: `js/data.js`.
- Colors and fonts: top of `css/style.css`.
- Art: see `IMAGE_LIST.md`.

## Teacher password

`teacher.html` asks for a password before it shows anything. Only a salted SHA-256 hash of the password is stored in the page (`SALT` and `HASH` near the top of `teacher.html`). This is a speed bump, not real security: the site is public with no server, so a tech-savvy student could get past it. The answer key also lives in the lab's own code. To change the password, ask Claude, or compute `sha256(SALT + newPassword)` and paste the hex into `HASH`. Once unlocked, the page stays open until that browser tab is closed.
