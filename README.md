# Advanced Algorithms — Exam Prep Site

## Current approach: practise the question bank with hints

Open **[index.html](index.html)**. All **234 question parts** in the existing 14-topic bank now have five progressively revealed help steps: Help me start, Relevant tool, Next step, Solution structure, and Check my answer. Write on paper; there are no required textboxes, automatic proof grades, or lesson-completion gates. Definitions and reusable structures are shared by technique; the start, next step and answer checks are authored per question part.

Hint position saves under `aa_hints_v1`, independently of existing marks, solution reveals and lesson progress. “Hide hints · try again” closes the ladder for that part. Full solutions remain a separate reveal. Topic references and answer-revealing exam summaries start collapsed. Homework crops that contain solution text are now opt-in source excerpts; their curated prompts remain visible. Major source/convention pitfalls are called out in the affected hints instead of silently repeated.

Hint mathematics uses the existing native MathML build, with no CDN or runtime dependency. Sources: `data/hints/tools.json` and `data/hints/questions-*.json`; compile with `python3 spec/build_hints.py`. The build rejects duplicates, unknown question keys, missing coverage, malformed records and unconverted math. `hints.js` is generated. The browser fixture `spec/test-hints.html?run=1` exercises all 1,170 reveal steps and persistence; run it in an isolated browser profile. It temporarily seeds test state and restores the previous values after completion.

Coverage refers to the existing question bank, not additional imported exams or the separate historical Exam Intel predictions. Hints are study guidance, not official marking schemes or a guarantee of exam readiness. The final check is explicitly self-assessment.

## Optional foundation lessons — previous course approach

The user chose question-first practice after finding lessons 1–4 insufficient preparation for the mixed probability question bank. The following records describe the optional lessons, not a required route before practising. Earlier “next session” instructions are historical.

Current status: **sessions 1–5 are available in the teaching-and-feedback format; sessions 6–24 remain drafts.** Select a session in the sidebar or use `course.html#session-5` to open session 5 directly.

Session 5 covers Karger's minimum-cut algorithm in about 60 minutes: contraction with parallel edges, fixed-cut survival, the conditional probability product, independent repetition, concrete runtime accounting, checked parameters, and 2024B Problem 3 as paper practice. It explicitly states connectedness and counts unordered partitions, resolving an assumption omitted in the original problem statement. Nine multiple-choice checks and two numerical gaps have authored feedback; the paper proof has hints and a six-part self-check rubric. Progress is stored separately as `lessonFive`; math uses `spec/lesson-five-math.json`.

Session 4 covers sampling and additive-error guarantees in about 60 minutes. It contains seven multiple-choice checks, two checked numerical gaps, a worked sample-size calculation, and 2025B Problem 5 as paper practice with hints and a six-part self-check rubric. Its equations, feedback and rubric use the same offline MathML notation as lesson 3. Formula definitions live in `spec/lesson-four-math.json`; the math build automatically includes `lesson-*-math.json` files. Progress is saved separately under `lessonFour` within the existing course state.

Lesson 3 now typesets mathematics consistently with page 1 of the formula sheet: blackboard-bold probability/expectation, stacked fractions, true subscripts, and powers of e. This includes answer choices, feedback, hints and the rubric, in light and dark modes. Math is native MathML and works offline. The build follows the existing guide pipeline: edit `spec/course-math.json`, then run `python3 spec/build_course_math.py` from this directory. The renderer replaces only authored text nodes and leaves typed answers and saved progress intact. New lessons should follow this notation standard instead of the earlier plain-text workaround.

Open **[course.html](course.html)** for the 24-session course. It has a fixed topic order, assigned practice, scheduled recall, writing prompts, collapsible solutions, and saved notes. Every session is accessible; completion and support ratings never change the sequence. Suggested dates respect the agreed holiday breaks and include Chol HaMoed study days.

**Lesson 1 is now a teaching-and-feedback pilot:** open [session 1](course.html#session-1). Six short sections introduce random variables, expectation, indicators, an annotated proof, guided completion, and a graph-cut transfer exercise. All 10 checks have answer-specific explanations and allow retries without locking navigation. Section position, chosen answers, and attempt counts persist in the course state and are included in its backup. No free-form answers are automatically graded. Sessions 2–24 remain explicitly labeled drafts pending review of this format.

**Added practice:** sections 7–8 extend lesson 1 with two problems (about 40 minutes, suitable for a separate sitting). Practice A completes a directed-cut proof with two checked numerical gaps and two reasoning/runtime choices. Practice B asks for a three-coloring algorithm and proof on paper, with three optional hints, staged solutions, and six saved self-check criteria. Numerical answers accept decimals or fractions with a nonzero denominator; no arbitrary expressions are evaluated. The rubric is self-assessment, not automatic proof grading. Existing lesson answers and completion marks are preserved.

**Session 2 is ready in the same format:** select “Existence through random choices” or open `course.html#session-2`. Its six sections take about 60 minutes: fixed recall, averaging and existence, an annotated cut proof, the expected-failure-count argument, a guided 3-CNF proof, and a paper proof about coloring three-element sets. It includes eight multiple-choice checks and two numerical gaps with authored feedback, followed by a six-criterion self-check rubric. Lesson 2 saves separately from lesson 1; both share the same interaction code. Sessions 3–24 remain drafts. Feedback does not alter the curriculum or block access.

**Session 3: concentration and union bounds.** Seven sections total about 60 minutes: recall, Markov/Chebyshev assumptions, the course's additive Chernoff form, an annotated fixed-vertex calculation, combining bad events, checked subset-count practice, and a paper proof of a simultaneous red/blue neighbor guarantee. Nine multiple-choice checks and two numerical gaps provide specific feedback; the paper proof has optional hints and six self-check criteria. State is saved under `lessonThree` within the existing Exam C storage. Earlier progress and dark-mode settings are preserved. The statements above about later lessons being drafts describe earlier build stages; current readiness is listed at the top.

The course uses fresh browser storage (`aa_exam_c_course_v1`) and does not read or reset the original library's progress. Notes save in the current browser; use Download progress backup for a JSON copy. The course reuses the existing guides and official question/solution images, with introductory PSD and lattice material added inline. It works offline without a server. The 2025C paper is split into timed sections within daily availability; this is rehearsal, not a full three-hour simulation or a guarantee of readiness.

The original topic library remains available through `index.html`, which now links prominently to the course. The library instructions below describe that older browse-by-topic mode.

A self-contained, offline study site. **Open `index.html` in your browser** (double-click it, or drag it into a browser tab). No server, no internet needed — everything is local.

## How it's organized

- **Left sidebar** — the 4 units and their topics, with your progress (e.g. `5/12`) on each.
- **Each topic page** shows:
  1. **📘 Study guide** — the strategy: when to reach for the technique, the core theorems, a worked example, common traps, and a checklist. Read this first.
  2. **Question ladder** in three priority tiers, each ordered easy → hard:
     - **Priority 1 — 2023+ Exams** (your main focus, open by default)
     - **Priority 2 — Homework**
     - **Priority 3 — Pre-2023 Exams** (extra practice)

## How to study

1. Pick a topic, read its study guide.
2. Work the **Priority 1 (2023+)** questions top to bottom (easy first).
3. For each sub-question: try it yourself, then **Reveal solution**, then mark **✓ Got it / ~ Shaky / ✗ Failed**.
4. Use **"Show only my Shaky / Failed"** (top bar) to come back and drill your weak spots.
5. Once you've cleared the 2023+ exams for a topic, tick on the **Homework** and **Pre-2023** tiers for more practice.

Your progress and reveals are saved in your browser automatically (localStorage). **Reset progress** (top bar) clears them.

## Notes on the source material

- Multi-part questions are split into sub-questions (a, b, c…) so you can do them piece by piece; each has its own screenshot, reveal, and marking.
- **Homework** PDFs are solution-only, so the homework "question" is the curated summary text; the image is the solution's framing.
- **2021 exam** questions are shown in Hebrew (the originals had no English); the English summary is above each.

## Files (for reference)

- `index.html`, `style.css`, `app.js` — the site.
- `data.js` — all questions/metadata (generated from `data/questions.json`).
- `guides.js` — the study guides.
- `images/` — the question & solution screenshots.
- `review/contact-sheet.html` — a flat QA gallery of every crop.
- `spec/` — the build pipeline (crop tool, generators) and the curation spec.
- `data/` — manifests, per-source crop tasks, and curation inventories.
