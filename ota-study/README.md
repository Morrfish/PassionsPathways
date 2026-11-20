# OTA 1050 Study Hub

An interactive kinesiology study site for occupational therapy assistant students. Open `index.html` in any browser. It needs no install, server or login.

## What's in it

- **Table of contents**: seven units of notes, each split into sections. Students can tick "I've studied this" to track progress.
- **Search**: the bar at the top (or press `/`) searches every note, key term, muscle and practice question.
- **Flashcards**: one deck per unit or all terms together; flip, shuffle, and set aside the ones you know.
- **Quizzes**: pick units, question type, length and difficulty, and get instant feedback with an explanation and a link back to the notes. Questions come in the real exam formats: multiple choice, select all that apply, and short answer (compare with a model answer and tick off the key points).
- **Muscle Finder**: every muscle with origin, insertion, actions, nerve, roots and stretch. Filter by region, nerve, joint crossed, motion or two-joint muscles, then click "Quiz me on these" for a drill built from the filtered list.
- **Practice exams**: timed Exam 1, Exam 2 and Exam 3 practice plus a comprehensive final, each with short-answer questions at the end. Each is scored at the end, with a score-by-topic breakdown and a review of every miss.
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
7. Ankle and foot (written from standard anatomy references; the course files didn't cover it)

The notes are summarized from the OTA 1050 course slides, packets, labs and study guides. Muscle tables that were blank in the packets were filled in from standard anatomy references, and a few source errors were corrected. Please check anything that matters for grading against your instructor's materials.

## Editing the content

Each unit lives in `content/u1.json` … `content/u7.json`, with extra exam-format questions in `content/uN.extra.json` and the Muscle Finder data in `content/muscles.json`:

- `sections`: headings and note text (simple HTML such as `<b>`, `<ul>`, `<table>` is allowed)
- `terms`: `{ "term", "def", "section" }`
- `questions`, one of three kinds:
  - multiple choice: `{ "q", "choices": [4 options], "answer": index of the right choice (0–3), "explain", "section", "difficulty": 1–3 }`
  - select all that apply: `{ "type": "multi", "q", "choices": [5–6 options], "answers": [indexes of every right choice], "explain", "section", "difficulty" }`
  - short answer: `{ "type": "short", "q", "model": "model answer", "points": ["key points"], "section", "difficulty" }`
- `muscles.json`: `{ "name", "region", "unit", "section", "joints", "twoJoint", "origin", "insertion", "actions", "nerve", "roots", "stretch", "notes" }`

After editing, rebuild the site data:

```bash
python3 ota-study/tools/build_data.py
```

Exam lengths, time limits and which units each exam covers are set at the top of `tools/build_data.py`.
