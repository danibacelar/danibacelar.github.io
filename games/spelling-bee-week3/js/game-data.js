/* =========================================================
   SPELLING BEE - WEEK 3 — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/
     hintEN:      English definition, always shown below "Listen"
     properWords: exact tokens from `word` whose capitalization
                  must match (none here — no proper nouns in
                  this list, so every word is case-insensitive)
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "paddle", audio: "paddle.mp3", hintEN: "A short, wide oar used to move a small boat through water, or to move a boat using one.", properWords: [] },
      { word: "paddles", audio: "paddles.mp3", hintEN: "Moves a boat using a short, wide oar (he/she/it form), or more than one of those oars.", properWords: [] },
      { word: "paddled", audio: "paddled.mp3", hintEN: "Moved a boat using a short, wide oar, in the past.", properWords: [] },
      { word: "paddling", audio: "paddling.mp3", hintEN: "Moving a boat using a short, wide oar right now.", properWords: [] },
      { word: "straddle", audio: "straddle.mp3", hintEN: "To sit or stand with one leg on each side of something.", properWords: [] },
      { word: "straddles", audio: "straddles.mp3", hintEN: "Sits or stands with one leg on each side of something (he/she/it form).", properWords: [] },
      { word: "straddled", audio: "straddled.mp3", hintEN: "Sat or stood with one leg on each side of something, in the past.", properWords: [] },
      { word: "straddling", audio: "straddling.mp3", hintEN: "Sitting or standing with one leg on each side of something right now.", properWords: [] },
      { word: "huddle", audio: "huddle.mp3", hintEN: "To crowd together closely, often for warmth or to make a plan.", properWords: [] },
      { word: "huddles", audio: "huddles.mp3", hintEN: "Crowds together closely (he/she/it form), or a close group of people.", properWords: [] },
      { word: "huddled", audio: "huddled.mp3", hintEN: "Crowded together closely, in the past.", properWords: [] },
      { word: "huddling", audio: "huddling.mp3", hintEN: "Crowding together closely right now.", properWords: [] },
      { word: "waddle", audio: "waddle.mp3", hintEN: "To walk with short steps, rocking side to side, like a duck.", properWords: [] },
      { word: "waddles", audio: "waddles.mp3", hintEN: "Walks with short, rocking steps like a duck (he/she/it form).", properWords: [] },
      { word: "waddled", audio: "waddled.mp3", hintEN: "Walked with short, rocking steps like a duck, in the past.", properWords: [] },
      { word: "waddling", audio: "waddling.mp3", hintEN: "Walking with short, rocking steps like a duck right now.", properWords: [] },
      { word: "artist", audio: "artist.mp3", hintEN: "A person who creates paintings, drawings, music, or other art.", properWords: [] },
      { word: "artistic", audio: "artistic.mp3", hintEN: "Having a natural talent or skill for art, or relating to art.", properWords: [] },
      { word: "artistry", audio: "artistry.mp3", hintEN: "Great skill and creativity in making or doing something.", properWords: [] },
      { word: "artistically", audio: "artistically.mp3", hintEN: "In a way that shows skill and creativity, like an artist.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "chart", audio: "chart.mp3", hintEN: "A drawing, graph, or map that shows information clearly.", properWords: [] },
      { word: "charted", audio: "charted.mp3", hintEN: "Drew a map or graph of something, in the past.", properWords: [] },
      { word: "charter", audio: "charter.mp3", hintEN: "To rent an entire vehicle like a plane or bus for private use, or an official written agreement.", properWords: [] },
      { word: "chartering", audio: "chartering.mp3", hintEN: "Renting an entire vehicle like a plane or bus for private use, right now.", properWords: [] },
      { word: "start", audio: "start.mp3", hintEN: "To begin doing something, or the beginning of something.", properWords: [] },
      { word: "starts", audio: "starts.mp3", hintEN: "Begins doing something (he/she/it form).", properWords: [] },
      { word: "started", audio: "started.mp3", hintEN: "Began doing something, in the past.", properWords: [] },
      { word: "starting", audio: "starting.mp3", hintEN: "Beginning to do something right now.", properWords: [] },
      { word: "merge", audio: "merge.mp3", hintEN: "To join or combine two or more things into one.", properWords: [] },
      { word: "emergent", audio: "emergent.mp3", hintEN: "Just starting to appear, grow, or become important.", properWords: [] },
      { word: "emergency", audio: "emergency.mp3", hintEN: "A sudden, serious situation that needs help right away.", properWords: [] },
      { word: "emergencies", audio: "emergencies.mp3", hintEN: "More than one sudden, serious situation that needs help right away.", properWords: [] },
      { word: "emerge", audio: "emerge.mp3", hintEN: "To come out from somewhere hidden, or to appear.", properWords: [] },
      { word: "emerges", audio: "emerges.mp3", hintEN: "Comes out from somewhere hidden, or appears (he/she/it form).", properWords: [] },
      { word: "emerged", audio: "emerged.mp3", hintEN: "Came out from somewhere hidden, or appeared, in the past.", properWords: [] },
      { word: "emerging", audio: "emerging.mp3", hintEN: "Coming out from somewhere hidden, or appearing, right now.", properWords: [] },
      { word: "submerge", audio: "submerge.mp3", hintEN: "To go completely under water, or to put something completely under water.", properWords: [] },
      { word: "submerges", audio: "submerges.mp3", hintEN: "Goes completely under water (he/she/it form).", properWords: [] },
      { word: "submerged", audio: "submerged.mp3", hintEN: "Went completely under water, in the past.", properWords: [] },
      { word: "submerging", audio: "submerging.mp3", hintEN: "Going completely under water right now.", properWords: [] },
    ]
  }
];

/* =========================================================
   PRACTICE — LETTER SCRAMBLE
   -----------------------------------------------------------
   Every word in this list is a single word with no spaces or
   apostrophes, so all 40 are usable in the tap-the-letters
   Practice round.
   ========================================================= */
const CHALLENGE_WORDS = [
  { word: "paddle", audio: "paddle.mp3", hintEN: "A short, wide oar used to move a small boat through water, or to move a boat using one." },
  { word: "paddles", audio: "paddles.mp3", hintEN: "Moves a boat using a short, wide oar (he/she/it form), or more than one of those oars." },
  { word: "paddled", audio: "paddled.mp3", hintEN: "Moved a boat using a short, wide oar, in the past." },
  { word: "paddling", audio: "paddling.mp3", hintEN: "Moving a boat using a short, wide oar right now." },
  { word: "straddle", audio: "straddle.mp3", hintEN: "To sit or stand with one leg on each side of something." },
  { word: "straddles", audio: "straddles.mp3", hintEN: "Sits or stands with one leg on each side of something (he/she/it form)." },
  { word: "straddled", audio: "straddled.mp3", hintEN: "Sat or stood with one leg on each side of something, in the past." },
  { word: "straddling", audio: "straddling.mp3", hintEN: "Sitting or standing with one leg on each side of something right now." },
  { word: "huddle", audio: "huddle.mp3", hintEN: "To crowd together closely, often for warmth or to make a plan." },
  { word: "huddles", audio: "huddles.mp3", hintEN: "Crowds together closely (he/she/it form), or a close group of people." },
  { word: "huddled", audio: "huddled.mp3", hintEN: "Crowded together closely, in the past." },
  { word: "huddling", audio: "huddling.mp3", hintEN: "Crowding together closely right now." },
  { word: "waddle", audio: "waddle.mp3", hintEN: "To walk with short steps, rocking side to side, like a duck." },
  { word: "waddles", audio: "waddles.mp3", hintEN: "Walks with short, rocking steps like a duck (he/she/it form)." },
  { word: "waddled", audio: "waddled.mp3", hintEN: "Walked with short, rocking steps like a duck, in the past." },
  { word: "waddling", audio: "waddling.mp3", hintEN: "Walking with short, rocking steps like a duck right now." },
  { word: "artist", audio: "artist.mp3", hintEN: "A person who creates paintings, drawings, music, or other art." },
  { word: "artistic", audio: "artistic.mp3", hintEN: "Having a natural talent or skill for art, or relating to art." },
  { word: "artistry", audio: "artistry.mp3", hintEN: "Great skill and creativity in making or doing something." },
  { word: "artistically", audio: "artistically.mp3", hintEN: "In a way that shows skill and creativity, like an artist." },
  { word: "chart", audio: "chart.mp3", hintEN: "A drawing, graph, or map that shows information clearly." },
  { word: "charted", audio: "charted.mp3", hintEN: "Drew a map or graph of something, in the past." },
  { word: "charter", audio: "charter.mp3", hintEN: "To rent an entire vehicle like a plane or bus for private use, or an official written agreement." },
  { word: "chartering", audio: "chartering.mp3", hintEN: "Renting an entire vehicle like a plane or bus for private use, right now." },
  { word: "start", audio: "start.mp3", hintEN: "To begin doing something, or the beginning of something." },
  { word: "starts", audio: "starts.mp3", hintEN: "Begins doing something (he/she/it form)." },
  { word: "started", audio: "started.mp3", hintEN: "Began doing something, in the past." },
  { word: "starting", audio: "starting.mp3", hintEN: "Beginning to do something right now." },
  { word: "merge", audio: "merge.mp3", hintEN: "To join or combine two or more things into one." },
  { word: "emergent", audio: "emergent.mp3", hintEN: "Just starting to appear, grow, or become important." },
  { word: "emergency", audio: "emergency.mp3", hintEN: "A sudden, serious situation that needs help right away." },
  { word: "emergencies", audio: "emergencies.mp3", hintEN: "More than one sudden, serious situation that needs help right away." },
  { word: "emerge", audio: "emerge.mp3", hintEN: "To come out from somewhere hidden, or to appear." },
  { word: "emerges", audio: "emerges.mp3", hintEN: "Comes out from somewhere hidden, or appears (he/she/it form)." },
  { word: "emerged", audio: "emerged.mp3", hintEN: "Came out from somewhere hidden, or appeared, in the past." },
  { word: "emerging", audio: "emerging.mp3", hintEN: "Coming out from somewhere hidden, or appearing, right now." },
  { word: "submerge", audio: "submerge.mp3", hintEN: "To go completely under water, or to put something completely under water." },
  { word: "submerges", audio: "submerges.mp3", hintEN: "Goes completely under water (he/she/it form)." },
  { word: "submerged", audio: "submerged.mp3", hintEN: "Went completely under water, in the past." },
  { word: "submerging", audio: "submerging.mp3", hintEN: "Going completely under water right now." },
];
