# OTA 1050 Study Hub

An interactive kinesiology study site for occupational therapy assistant students. Open `index.html` in any browser. It needs no install, server or login.

## What's in it

- **Table of contents**: six units of notes, each split into sections. Students can tick "I've studied this" to track progress.
- **Search**: the bar at the top (or press `/`) searches every note, key term and practice question.
- **Flashcards**: one deck per unit or all terms together; flip, shuffle, and set aside the ones you know.
- **Quizzes**: pick units, length and difficulty, and get instant feedback with an explanation and a link back to the notes.
- **Practice exams**: timed Exam 1, Exam 2 and Exam 3 practice plus a comprehensive final. Each is scored at the end, with a score-by-topic breakdown and a review of every miss.
- **Review my misses**: wrong answers come back here until the student gets them right.
- **Games**: Kinesiology Jeopardy (solo or up to 4 teams, good for projecting in class), Speed Match, and a 60-second Lightning Round.

Progress and scores are saved in each student's own browser only.

## Units

1. Foundations: terminology, kinesiology and pathology
2. Skeletal system and arthrology (includes the ROM norms tables)
3. Myology and the nervous system
4. Shoulder girdle and shoulder joint
5. Elbow, forearm, wrist and hand
6. TMJ, trunk, thorax, pelvis, hip and knee

The notes are summarized from the OTA 1050 course slides, packets, labs and study guides. Muscle tables that were blank in the packets were filled in from standard anatomy references, and a few source errors were corrected. Please check anything that matters for grading against your instructor's materials.

## Editing the content

Each unit lives in `content/u1.json` … `content/u6.json`:

- `sections`: headings and note text (simple HTML such as `<b>`, `<ul>`, `<table>` is allowed)
- `terms`: `{ "term", "def", "section" }`
- `questions`: `{ "q", "choices": [4 options], "answer": index of the right choice (0–3), "explain", "section", "difficulty": 1–3 }`

After editing, rebuild the site data:

```bash
python3 ota-study/tools/build_data.py
```

Exam lengths, time limits and which units each exam covers are set at the top of `tools/build_data.py`.
