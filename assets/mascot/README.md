# Mascot assets — Mrs. Dani fox

This folder is the drop-in location for the official fox mascot, exported as
individual transparent PNG/WebP files from the reference sheet. The mascot
itself must NOT be redrawn or altered — only cropped/exported per pose.

Files go directly in this folder (no subfolders) — e.g. `happy.png`,
`pointing.png` — since that's the simplest to upload through GitHub's web
interface without dragging nested folders.

Until a real file exists for a given pose, the site shows a text placeholder
like `[FOX: pose-name]` at that point, so swapping in a real asset later is a
straightforward find-and-replace (see `js/main.js` and each `.html` file for
`[FOX: ...]` markers, and the `.mascot` / `.mascot-inline` / `.mascot-badge`
CSS classes in `css/components.css`).

## Currently in use
- `happy.png` → homepage hero badge ✅ live

## Expected filenames, mapped to the reference sheet (not yet added)
**Expressions:** very-happy.png · proud.png · curious.png · thinking.png ·
surprised.png · concentrating.png · pointing.png · thumbs-up.png

**Interaction:** celebrating-correct.png (correct answer) ·
encouraging-incorrect.png (wrong answer) · giving-hint.png (student asks for
help) · asking-question.png · pointing-clue.png · celebrating-level-complete.png
· welcoming-student.png (student dashboard header) · reacting-challenge.png ·
inviting-next-level.png

**Speech (mascot + short phrase):** great-job.png · well-done.png ·
awesome.png · keep-going.png · almost-there.png · excellent.png ·
good-thinking.png · lets-explore.png · ready.png · fantastic.png

**Activity:** laptop.png · reading-book.png · exploring-map.png · sitting.png
· standing.png · excited.png · calm-reassuring.png

## Where each pose is used once added
- Game product page → pointing.png ("Let's practice together!")
- Student dashboard header → welcoming-student.png
- Student dashboard "ready to start" bubble → ready.png
- Student profile picker (login/aluno.html) → standing.png
- Empty game grid / empty student dashboard → curious.png
