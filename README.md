# Advanced Algorithms — Exam Prep Site

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
