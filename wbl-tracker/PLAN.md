# WBL Tracker: Plan

A work-based learning (WBL) hours tracker for vocational schools. Students on job
sites submit hours from their phones, and the school WBL supervisor tracks
200–400 students from a Windows PC. **Student data is never stored in a cloud
service.** It lives only on the student's phone (until sent) and on the
supervisor's computer.

## Decisions so far

| Question | Decision |
|---|---|
| How data travels | Email attachment, from the student's phone to the supervisor's school email |
| Pay stub photo | Send a **redacted** photo (only dates and hours visible) plus the numbers |
| Devices | Supervisor: Windows PC. Students: their own iPhone or Android phones |
| What's tracked | Paid hours from stubs, required-hours goals, employer and job info, employer evaluations, unpaid/hand-logged hours |
| Required hours | At least **250** (configurable per program) |
| Supervisors | Possibly **several**; a student can be set up to send to more than one email |
| Where data lives | Supervisor PC to start, then the **school's own server** (the design supports both) |
| Evaluation form | School will provide; build the form to match it |
| State | **Ohio**; export format to be confirmed (likely EMIS reporting through Ohio DEW) |

## How it works

```
 STUDENT PHONE (web app, works offline)          SUPERVISOR WINDOWS PC (desktop app)
 ───────────────────────────────────────         ─────────────────────────────────────
 1. Snap a photo of the pay stub
 2. On-device text reading finds the dates and hours
 3. Student checks and corrects the numbers
 4. Student boxes the hours area; the rest is blacked out
 5. App builds a signed .wbl file  ──email──▶  6. Save attachments to an inbox folder
    (numbers + redacted image)                  7. App imports and checks each file
                                                8. Local database updates totals
                                                9. Dashboard, alerts, Excel export
```

### 1. Student app (phone)
- **Installable web app (PWA).** Students open a link and tap "Add to Home Screen."
  There's no app store and no accounts. The app code is hosted as plain static
  files (for example, GitHub Pages). The host stores **no student data**; it only
  delivers the app.
- **Enrollment:** the supervisor app prints a QR code for each student. Scanning
  it loads the student's name, ID, the supervisor's email, and a private signing
  key onto the phone. This stops anyone from faking or editing a submission.
- **Pay stub capture:** camera, then **Tesseract.js**, which reads the text on the
  phone itself, so the photo never goes to a server. The app picks out the pay
  period dates, regular and overtime hours, and the employer. The student
  confirms or fixes every value.
- **Redaction:** the student drags a box over the dates and hours. Everything
  else (SSN, pay rates, address) is blacked out *before* the image is saved. The
  original photo is thrown away.
- **Unpaid hours:** the student logs date, hours and task. The workplace
  supervisor signs with a finger on the phone screen.
- **Employer evaluations:** a short rating form the workplace supervisor fills
  out and signs on the student's phone. It goes out in the same kind of file.
- **Sending:** the phone's Share sheet attaches the `.wbl` file to a new email
  addressed to the supervisor. If sharing isn't available, the app downloads the
  file so the student can attach it by hand. Unsent items wait in a queue on the
  phone.

### 2. The `.wbl` submission file
One small JSON file (about 100–300 KB):
`{ version, studentId, submissionId, type: paystub|manual|evaluation, employer,
periodStart, periodEnd, regularHours, overtimeHours, ocrConfidence,
studentEdited, signature(employer), redactedImage(JPEG, base64), createdAt,
hmac }`
- `submissionId` lets the supervisor app spot duplicates.
- `hmac` uses the student's enrollment key, so any edit made after sending is
  detected.

### 3. Supervisor app (Windows)
- **Built (phase 1):** one HTML file, `WBL Supervisor.html`, opened in Edge or
  Chrome. There's nothing to install. Records save to a folder the supervisor
  picks: `wbl-data.json`, an `images/` folder, an `Inbox/` folder, and daily
  snapshots in `backups/`.
  - The folder can be on the school server, which is how several supervisors
    share records.
  - If someone else saved changes while you had the records open, the app
    reloads their version instead of overwriting it.
- *Later, if needed:* wrap it as an installed Windows app (Electron), or add a
  small server program for heavy simultaneous use.
- **Import:** watches an "WBL Inbox" folder. In Outlook, the supervisor selects
  the emails and saves the attachments there (or drags them onto the app). A
  later phase could read the school mailbox directly over IMAP, still storing
  nothing outside the PC.
- **Checks on import:** valid signature, duplicate or overlapping pay periods,
  hours over a set limit (for example, more than 60 a week), low text-reading
  confidence, and numbers the student changed. Flagged items go to a **review
  queue** with the redacted image next to the numbers. Clean ones are
  auto-approved.
- **Tracking:** a profile for each student (program, employer, job title,
  workplace supervisor contact, start date), a required-hours goal for each
  program or student, progress bars, and a "behind pace" list (for example, no
  submission in 3 weeks, or under the needed pace).
- **Reports:** Excel and CSV export for each student, program or date range, plus
  a printable transcript for each student.
- **Backups:** one-click encrypted backup to a USB drive or the district network
  drive, and a reminder if there's been no backup in 7 days. This matters
  because the PC holds the only copy.
- **Roster:** import students from a CSV and print enrollment QR codes in bulk.

### Scale
400 students × weekly stubs ≈ 15,000 submissions a year. That's trivial for
SQLite. Redacted images are about 150 KB each, roughly 2 GB a year, and they can
be archived by school year.

## Where student data lives (and who can reach it)
| Place | What's there | Who controls it |
|---|---|---|
| Student's phone | Their own submissions until sent; original photos are deleted right after redaction | The student |
| Email in transit and in mailboxes | The `.wbl` files (hours, dates, employer, redacted image) | The district's email system. If it's Google Workspace or Microsoft 365, the files sit on their servers under the district's existing agreement, the same as any other school email |
| Supervisor PC or **school server** | The database and all records | The school/district only |
| App hosting (e.g., GitHub Pages or the school's web server) | App code only, **no student data** | Whoever hosts it; the school server works too |

The supervisor app can delete each email after importing it, to keep copies out of mailboxes.

### Several supervisors on a school server
- **Phase 1:** a single supervisor PC with a local database.
- **Later:** a small "WBL Server" program runs on the school's server and holds
  the one shared database. Each supervisor's PC runs the desktop app, which
  connects to it over the school network. Everyone sees the same totals, and
  each supervisor can filter to their own students.
- **Students and multiple emails:** the enrollment QR code can list several
  supervisor addresses. The student picks one or more when sending, and the
  `submissionId` keeps duplicates from being counted twice.

## Privacy notes
- Records are FERPA-protected student records kept on district hardware. Check
  the district's data policy and whether the student email accounts are
  district-managed.
- Pay amounts and SSNs never leave the phone. Only hours, dates, the employer,
  and the redacted image are sent.
- The supervisor app's database should sit on an encrypted drive (BitLocker),
  and the app should have a password.

## Build phases
0. **Branding: done.** `brands/<school>/` is built into each school's apps,
   and the `wbl-add-school` skill pulls a school's logo and colors from its
   website. The first school is Greene County Career Center.
1. **Core loop: done.** the `.wbl` format, student capture with manual entry, email
   sharing, supervisor import, student list and totals. *(Useful on its own.)*
2. **Pay stub reading:** Tesseract.js reading, hour and date extraction, and the
   redaction step.
3. **Supervisor tools:** review queue, goals and alerts, Excel export, backups,
   bulk QR enrollment.
4. **Unpaid hours and evaluations:** employer signature capture and
   configurable evaluation forms.
5. **Polish:** Windows installer, optional IMAP auto-import, pilot with one class.

## Open questions
- Evaluation form (school is getting a copy)
- Ohio reporting format (EMIS or other; school is checking)
- Does the district use Google Workspace or Microsoft 365 for email? Who manages
  the school server (district IT)?
- Do students send from district email or personal email?
