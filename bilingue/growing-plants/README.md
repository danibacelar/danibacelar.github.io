# 🌱 Growing Plants: The Plant Garden Mission

A playful, self-contained HTML/CSS/JS educational game to help a young student
review the "Growing Plants" science unit (parts of a plant, water, light,
temperature, healthy plants, flowering vs. non-flowering plants, and air/oxygen).

No backend, no login, no build step — just static files that run in any
browser, perfect for GitHub Pages.

## 📁 What's inside

```
index.html          → the game shell (start screen, garden menu, results screen)
css/style.css        → all visual design (colors, layout, animations)
js/game.js            → core engine: navigation, scoring, drag helper, menu/results rendering
js/game-stages.js     → the 8 stages and their content (easy to edit!)
assets/               → the illustrations you provided (already compressed for fast loading)
assets/safari/         → 24 real photos used in the "Plant Safari" stage
dist/standalone.html → OPTIONAL: the whole game in a single file (CSS/JS/images inlined)
                        — handy for a quick local preview, not needed for deployment
```

## 🚀 Publish it on GitHub Pages

1. Create a new repository on GitHub (e.g. `plant-garden-mission`).
2. Upload everything **except** the `dist/` folder to the root of the repo
   (`index.html`, `css/`, `js/`, `assets/`) — or upload it too, it won't hurt anything.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", choose **Deploy from a branch**, branch
   `main`, folder `/ (root)`. Save.
5. Wait a minute, then open the URL GitHub gives you
   (usually `https://<your-username>.github.io/plant-garden-mission/`).

That's it — no build tools, no npm install, nothing else needed.

## 🖼️ Replacing or adding images later

Images are referenced by filename inside `js/game-stages.js`. To swap one:

1. Replace the file in `assets/` **keeping the exact same filename**
   (e.g. drop in a new `assets/healthy-plant.jpg`), or
2. Add a new image and update the matching filename string inside
   `js/game-stages.js` (search for `.jpg` to find every reference).

If you ever remove an image without updating the code, the game will simply
show a broken image icon in that one spot — nothing else will break.

## 🎮 The 8 stages (each a different mechanic)

1. **Plant Parts** — drag-and-drop labels onto a plant illustration, then a
   "Listen and Tap!" bonus round: the child hears a word spoken out loud and
   must tap the matching part of the plant (no labels shown).
2. **Healthy Plant** — tap Healthy / Needs Help directly on each picture.
3. **Water Journey** — drag word-tiles into the correct order (Soil → Roots → Stem → Leaves),
   then a "Trace the Water Path!" bonus round: tap the glowing water path on
   a real illustration, in the correct order, from the soil all the way to the leaves.
4. **Fill in the Blank** — a word-bank exercise (stem, leaves, soil, roots,
   water) with 9 sentences to complete about the whole unit.
5. **Light & Temperature Lab** — scenario cards with Yes/No questions.
6. **Plant Detective** — flip-card True/False statements.
7. **Final Garden Challenge** — six mini-problems mixing multiple-choice and multi-select.
8. **Plant Safari** — 24 real photos (sunflowers, cacti, fruit trees, ferns...)
   the child sorts into Flower / Not flower / Fruit.

Every stage can be played independently and replayed from the garden menu at
any time — nothing is locked behind another stage.

## ⭐ Scoring

- Each stage awards 1–3 stars based on how many mistakes were made
  (0 mistakes = 3 stars, 1–2 mistakes = 2 stars, 3+ = 1 star — every stage
  can still be finished and always gives at least 1 star).
- Progress and stars are saved in the browser's `localStorage`, so a
  student's stars are still there if they close the tab and come back later
  on the same device/browser. "Play Again" on the results screen resets
  everything.

## ✏️ Editing the questions or text

All wording, statements, and answer choices live in plain JavaScript data
structures at the top of each stage's section inside `js/game-stages.js`
(e.g. `STAGE5_CASES`, `STAGE4_SCENES`, `STAGE1_TARGETS`) — edit the text
there and reload the page, no other changes needed.

## 🔊 Sound

Stage 1 (Plant Parts) plays a short cheerful chime whenever the student drops
a word on the correct part of the plant, and then **speaks the word out loud**
("leaf", "flower", "fruit", "stem", "root") using the browser's built-in
Speech Synthesis — no audio files to manage, works offline once the page is
loaded. Tap any labeled part again afterwards to hear the word repeated.
The stage's bonus round ("Listen and Tap!") flips this around: the child
hears the word first and has to find the matching part on the plant with no
text hints. Want spoken audio like this on the other stages too? Just say
the word.

## 🧪 Tested

Click-through tested on mobile (420px), tablet (820px) and desktop (1280px)
viewports, including drag-and-drop on every stage that uses it, with no
console errors.
