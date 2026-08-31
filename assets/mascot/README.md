# Mascot assets — Mrs. Dani fox

This folder is the drop-in location for the official fox mascot, exported as
individual transparent PNG/WebP files from the reference sheet. The mascot
itself must NOT be redrawn or altered — only cropped/exported per pose.

Until real files are placed here, the site shows text placeholders like
`[FOX: pose-name]` at every point a mascot image will appear, so swapping in
real assets later is a straightforward find-and-replace (see
`js/main.js` and each `.html` file for `[FOX: ...]` markers, and the
`.mascot` / `.mascot-inline` / `.mascot-badge` CSS classes in
`css/components.css`).

## Expected filenames, mapped to the reference sheet

### /character/ — turnaround views (branding use only, not UI states)
front.png · three-quarter-left.png · three-quarter-right.png ·
side-profile.png · side-profile-right.png · back.png

### /expressions/
happy.png · very-happy.png · proud.png · curious.png · thinking.png ·
surprised.png · concentrating.png · pointing.png · thumbs-up.png

### /interaction/ — used at specific product moments
celebrating-correct.png      → correct answer in a game
encouraging-incorrect.png    → wrong answer in a game
giving-hint.png              → student asks for help
asking-question.png          → game presents a question
pointing-clue.png            → instructional moments
celebrating-level-complete.png → activity finished
welcoming-student.png        → student dashboard header
welcoming-student-2.png      → alternate welcome pose
reacting-challenge.png       → harder activity intro
inviting-next-level.png      → "keep going" moments

### /speech/ — mascot + short phrase, used sparingly
great-job.png · well-done.png · awesome.png · keep-going.png ·
almost-there.png · excellent.png · good-thinking.png · lets-explore.png ·
ready.png · fantastic.png

### /activity/ — supporting illustrations (marketing/empty states)
laptop.png · reading-book.png · exploring-map.png · sitting.png ·
standing.png · excited.png · calm-reassuring.png

## Current placeholder → pose mapping in the code
- Homepage hero badge → happy.png
- Game product page → pointing.png ("Let's practice together!")
- Student dashboard header → welcoming-student.png
- Student dashboard "ready to start" bubble → ready.png
- Student profile picker (login/aluno.html) → standing.png
- Empty game grid (library, no filter matches) → curious.png
- Empty student dashboard (no games assigned) → curious.png
