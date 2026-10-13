/* =========================================================
   SPELLING BEE - WEEK 1 — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/
     hintEN:      English clue shown after a wrong first try
     properWords: exact tokens from `word` whose capitalization
                  must match (none here — no proper nouns in
                  this list, so every word is case-insensitive)
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "isle", audio: "isle.mp3", hintEN: "A small island, especially in poetic or old-fashioned writing.", properWords: [] },
      { word: "islands", audio: "islands.mp3", hintEN: "More than one piece of land completely surrounded by water.", properWords: [] },
      { word: "ratio", audio: "ratio.mp3", hintEN: "A way of comparing two amounts, like 2 to 1.", properWords: [] },
      { word: "ratios", audio: "ratios.mp3", hintEN: "More than one comparison between two amounts.", properWords: [] },
      { word: "crawl", audio: "crawl.mp3", hintEN: "To move slowly on your hands and knees.", properWords: [] },
      { word: "crawls", audio: "crawls.mp3", hintEN: "Moves slowly on hands and knees (he/she/it form).", properWords: [] },
      { word: "crawled", audio: "crawled.mp3", hintEN: "Moved slowly on hands and knees, in the past.", properWords: [] },
      { word: "crawling", audio: "crawling.mp3", hintEN: "Moving slowly on hands and knees right now.", properWords: [] },
      { word: "brawl", audio: "brawl.mp3", hintEN: "A noisy, rough fight between people.", properWords: [] },
      { word: "brawls", audio: "brawls.mp3", hintEN: "Fights noisily (he/she/it form), or more than one rough fight.", properWords: [] },
      { word: "brawled", audio: "brawled.mp3", hintEN: "Fought noisily, in the past.", properWords: [] },
      { word: "brawling", audio: "brawling.mp3", hintEN: "Fighting noisily right now.", properWords: [] },
      { word: "foul", audio: "foul.mp3", hintEN: "Not fair, or very unpleasant — also a rule-breaking move in sports.", properWords: [] },
      { word: "fouls", audio: "fouls.mp3", hintEN: "Breaks a sports rule (he/she/it form), or more than one unfair move.", properWords: [] },
      { word: "fouled", audio: "fouled.mp3", hintEN: "Broke a sports rule, or made something smell bad, in the past.", properWords: [] },
      { word: "fouling", audio: "fouling.mp3", hintEN: "Breaking a sports rule right now.", properWords: [] },
      { word: "audio", audio: "audio.mp3", hintEN: "Sound, especially recorded or broadcast sound.", properWords: [] },
      { word: "audiovisual", audio: "audiovisual.mp3", hintEN: "Using both sound and pictures, like in a movie or presentation.", properWords: [] },
      { word: "shark", audio: "shark.mp3", hintEN: "A large ocean fish with very sharp teeth.", properWords: [] },
      { word: "sharks", audio: "sharks.mp3", hintEN: "More than one large, sharp-toothed ocean fish.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "park", audio: "park.mp3", hintEN: "A public area with grass and trees where people relax and play.", properWords: [] },
      { word: "parks", audio: "parks.mp3", hintEN: "More than one public green area, or leaves a vehicle somewhere (he/she form).", properWords: [] },
      { word: "parked", audio: "parked.mp3", hintEN: "Left a vehicle somewhere, in the past.", properWords: [] },
      { word: "parking", audio: "parking.mp3", hintEN: "Leaving a vehicle somewhere right now, or a place to leave vehicles.", properWords: [] },
      { word: "sparkle", audio: "sparkle.mp3", hintEN: "To shine with tiny flashes of light.", properWords: [] },
      { word: "sparkles", audio: "sparkles.mp3", hintEN: "Shines with tiny flashes of light (he/she/it form).", properWords: [] },
      { word: "sparkled", audio: "sparkled.mp3", hintEN: "Shone with tiny flashes of light, in the past.", properWords: [] },
      { word: "sparkling", audio: "sparkling.mp3", hintEN: "Shining with tiny flashes of light right now.", properWords: [] },
      { word: "embark", audio: "embark.mp3", hintEN: "To begin a journey, especially by getting on a ship or plane.", properWords: [] },
      { word: "embarks", audio: "embarks.mp3", hintEN: "Begins a journey (he/she/it form).", properWords: [] },
      { word: "embarked", audio: "embarked.mp3", hintEN: "Began a journey, in the past.", properWords: [] },
      { word: "embarking", audio: "embarking.mp3", hintEN: "Beginning a journey right now.", properWords: [] },
      { word: "mantle", audio: "mantle.mp3", hintEN: "A cloak-like covering, or the layer of the Earth beneath its crust.", properWords: [] },
      { word: "mantles", audio: "mantles.mp3", hintEN: "More than one cloak-like covering, or more than one Earth layer.", properWords: [] },
      { word: "mantel", audio: "mantel.mp3", hintEN: "The shelf above a fireplace.", properWords: [] },
      { word: "mantels", audio: "mantels.mp3", hintEN: "More than one shelf above a fireplace.", properWords: [] },
      { word: "dismantle", audio: "dismantle.mp3", hintEN: "To take something apart piece by piece.", properWords: [] },
      { word: "dismantles", audio: "dismantles.mp3", hintEN: "Takes something apart piece by piece (he/she/it form).", properWords: [] },
      { word: "dismantled", audio: "dismantled.mp3", hintEN: "Took something apart piece by piece, in the past.", properWords: [] },
      { word: "dismantling", audio: "dismantling.mp3", hintEN: "Taking something apart piece by piece right now.", properWords: [] },
    ]
  }
];

/* =========================================================
   CHALLENGE — LETTER SCRAMBLE
   -----------------------------------------------------------
   Every word in this list is a single word with no spaces or
   apostrophes, so all 40 are usable in the tap-the-letters
   Challenge round (unlike the original Spelling Bee, which had
   to filter out multi-word phrases and sentences).
   ========================================================= */
const CHALLENGE_WORDS = [
  { word: "isle", audio: "isle.mp3", hintEN: "A small island, especially in poetic or old-fashioned writing." },
  { word: "islands", audio: "islands.mp3", hintEN: "More than one piece of land completely surrounded by water." },
  { word: "ratio", audio: "ratio.mp3", hintEN: "A way of comparing two amounts, like 2 to 1." },
  { word: "ratios", audio: "ratios.mp3", hintEN: "More than one comparison between two amounts." },
  { word: "crawl", audio: "crawl.mp3", hintEN: "To move slowly on your hands and knees." },
  { word: "crawls", audio: "crawls.mp3", hintEN: "Moves slowly on hands and knees (he/she/it form)." },
  { word: "crawled", audio: "crawled.mp3", hintEN: "Moved slowly on hands and knees, in the past." },
  { word: "crawling", audio: "crawling.mp3", hintEN: "Moving slowly on hands and knees right now." },
  { word: "brawl", audio: "brawl.mp3", hintEN: "A noisy, rough fight between people." },
  { word: "brawls", audio: "brawls.mp3", hintEN: "Fights noisily (he/she/it form), or more than one rough fight." },
  { word: "brawled", audio: "brawled.mp3", hintEN: "Fought noisily, in the past." },
  { word: "brawling", audio: "brawling.mp3", hintEN: "Fighting noisily right now." },
  { word: "foul", audio: "foul.mp3", hintEN: "Not fair, or very unpleasant — also a rule-breaking move in sports." },
  { word: "fouls", audio: "fouls.mp3", hintEN: "Breaks a sports rule (he/she/it form), or more than one unfair move." },
  { word: "fouled", audio: "fouled.mp3", hintEN: "Broke a sports rule, or made something smell bad, in the past." },
  { word: "fouling", audio: "fouling.mp3", hintEN: "Breaking a sports rule right now." },
  { word: "audio", audio: "audio.mp3", hintEN: "Sound, especially recorded or broadcast sound." },
  { word: "audiovisual", audio: "audiovisual.mp3", hintEN: "Using both sound and pictures, like in a movie or presentation." },
  { word: "shark", audio: "shark.mp3", hintEN: "A large ocean fish with very sharp teeth." },
  { word: "sharks", audio: "sharks.mp3", hintEN: "More than one large, sharp-toothed ocean fish." },
  { word: "park", audio: "park.mp3", hintEN: "A public area with grass and trees where people relax and play." },
  { word: "parks", audio: "parks.mp3", hintEN: "More than one public green area, or leaves a vehicle somewhere (he/she form)." },
  { word: "parked", audio: "parked.mp3", hintEN: "Left a vehicle somewhere, in the past." },
  { word: "parking", audio: "parking.mp3", hintEN: "Leaving a vehicle somewhere right now, or a place to leave vehicles." },
  { word: "sparkle", audio: "sparkle.mp3", hintEN: "To shine with tiny flashes of light." },
  { word: "sparkles", audio: "sparkles.mp3", hintEN: "Shines with tiny flashes of light (he/she/it form)." },
  { word: "sparkled", audio: "sparkled.mp3", hintEN: "Shone with tiny flashes of light, in the past." },
  { word: "sparkling", audio: "sparkling.mp3", hintEN: "Shining with tiny flashes of light right now." },
  { word: "embark", audio: "embark.mp3", hintEN: "To begin a journey, especially by getting on a ship or plane." },
  { word: "embarks", audio: "embarks.mp3", hintEN: "Begins a journey (he/she/it form)." },
  { word: "embarked", audio: "embarked.mp3", hintEN: "Began a journey, in the past." },
  { word: "embarking", audio: "embarking.mp3", hintEN: "Beginning a journey right now." },
  { word: "mantle", audio: "mantle.mp3", hintEN: "A cloak-like covering, or the layer of the Earth beneath its crust." },
  { word: "mantles", audio: "mantles.mp3", hintEN: "More than one cloak-like covering, or more than one Earth layer." },
  { word: "mantel", audio: "mantel.mp3", hintEN: "The shelf above a fireplace." },
  { word: "mantels", audio: "mantels.mp3", hintEN: "More than one shelf above a fireplace." },
  { word: "dismantle", audio: "dismantle.mp3", hintEN: "To take something apart piece by piece." },
  { word: "dismantles", audio: "dismantles.mp3", hintEN: "Takes something apart piece by piece (he/she/it form)." },
  { word: "dismantled", audio: "dismantled.mp3", hintEN: "Took something apart piece by piece, in the past." },
  { word: "dismantling", audio: "dismantling.mp3", hintEN: "Taking something apart piece by piece right now." },
];
