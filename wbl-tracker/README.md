# WBL Hours: work-based learning tracker

Students on job sites send their hours from their phones. The school's WBL supervisor
keeps the records on a school computer or the school server. **No cloud storage.**

| Part | What it is | Where it runs |
|---|---|---|
| Student app | Phone web app, installed with "Add to Home Screen" | Hosted as plain files on any HTTPS site. It holds no student data |
| Supervisor app | One file, `WBL Supervisor.html` | Opened in Edge/Chrome on the supervisor's PC. Records go in a folder they choose (PC or network drive) |

## How a submission travels
1. The supervisor adds a student. The app makes a **QR code** that holds that student's
   private signing key.
2. The student scans it, and the phone app is set up.
3. The student photographs a pay stub and draws boxes around the **dates and hours**.
   Everything else is blacked out before anything is saved.
4. The phone makes a small signed `.txt` file, and the student shares it to their email app
   addressed to the supervisor. There are two fallbacks: download the file, or send the
   numbers as email text.
5. The supervisor saves attachments into the data folder's `Inbox` and clicks
   **Check Inbox folder**. Each file is checked for:
   - a valid signature (edited files are caught)
   - duplicates and overlapping pay periods
   - weekly hours over the limit
   - a missing photo
   - unpaid hours that need confirming

   Clean files are approved and anything odd goes to **Review**.

## Folders
```
src/student/      phone app source
src/supervisor/   supervisor app source
src/shared/       submission format + shared styles
src/vendor/       qrcode-generator (MIT), bundled for offline use
brands/<id>/      one folder per school: brand.json, logo, icon (_source/ = what the site showed)
dist/<id>/        built apps for each school (generated: don't edit by hand)
tools/            build.mjs, extract-brand.mjs, colors.mjs
tests/            unit tests + end-to-end browser test
```

## Commands
```bash
node tools/build.mjs default            # unbranded version
node tools/build.mjs greene-ccc         # one school
node tools/build.mjs --all
node tools/extract-brand.mjs <url> <id> # pull logo/colors candidates from a school website
node --test tests/format.test.mjs       # unit tests
node tests/e2e.mjs <id>                 # full loop in Chromium (SHOTS=dir saves screenshots)
```
Adding a school: use the **wbl-add-school** skill (`.claude/skills/wbl-add-school/`) and give it
the school's website.

## Schools
| id | School | Source |
|---|---|---|
| `default` | Unbranded | n/a |
| `greene-ccc` | Greene County Career Center (Xenia, OH) | greeneccc.com |
