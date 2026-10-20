/* =========================================================
   SPELLING BEE - WEEK 2 — VOCABULARY LIST
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
      { word: "record", audio: "record.mp3", hintEN: "To store sound, images, or information so people can use or check it later.", properWords: [] },
      { word: "records", audio: "records.mp3", hintEN: "Stores sound or information for later use (he/she/it form).", properWords: [] },
      { word: "recorded", audio: "recorded.mp3", hintEN: "Stored sound or information for later use, in the past.", properWords: [] },
      { word: "recording", audio: "recording.mp3", hintEN: "Storing sound or information for later use right now, or the sound/video file itself.", properWords: [] },
      { word: "afford", audio: "afford.mp3", hintEN: "To have enough money or time to be able to do or buy something.", properWords: [] },
      { word: "affords", audio: "affords.mp3", hintEN: "Has enough money or time for something (he/she/it form).", properWords: [] },
      { word: "afforded", audio: "afforded.mp3", hintEN: "Had enough money or time for something, in the past.", properWords: [] },
      { word: "affording", audio: "affording.mp3", hintEN: "Having enough money or time for something right now.", properWords: [] },
      { word: "order", audio: "order.mp3", hintEN: "To ask for something to be brought, made, or done — or the arrangement of things.", properWords: [] },
      { word: "orders", audio: "orders.mp3", hintEN: "Asks for something to be brought or done (he/she/it form), or more than one request.", properWords: [] },
      { word: "ordered", audio: "ordered.mp3", hintEN: "Asked for something to be brought or done, in the past.", properWords: [] },
      { word: "ordering", audio: "ordering.mp3", hintEN: "Asking for something to be brought or done right now.", properWords: [] },
      { word: "border", audio: "border.mp3", hintEN: "The line that divides one country, state, or area from another.", properWords: [] },
      { word: "borders", audio: "borders.mp3", hintEN: "Touches another place along a dividing line (he/she/it form), or more than one dividing line.", properWords: [] },
      { word: "bordered", audio: "bordered.mp3", hintEN: "Touched another place along a dividing line, in the past.", properWords: [] },
      { word: "bordering", audio: "bordering.mp3", hintEN: "Touching another place along a dividing line right now.", properWords: [] },
      { word: "young", audio: "young.mp3", hintEN: "Not having lived or existed for very long.", properWords: [] },
      { word: "younger", audio: "younger.mp3", hintEN: "Less old than someone else, when comparing two people or things.", properWords: [] },
      { word: "youngest", audio: "youngest.mp3", hintEN: "The least old, when comparing three or more people or things.", properWords: [] },
      { word: "youthful", audio: "youthful.mp3", hintEN: "Looking or feeling young and full of energy.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "wrestle", audio: "wrestle.mp3", hintEN: "To fight by holding and pushing another person, trying to throw them down.", properWords: [] },
      { word: "wrestles", audio: "wrestles.mp3", hintEN: "Fights by holding and pushing someone down (he/she/it form).", properWords: [] },
      { word: "wrestled", audio: "wrestled.mp3", hintEN: "Fought by holding and pushing someone down, in the past.", properWords: [] },
      { word: "wrestling", audio: "wrestling.mp3", hintEN: "Fighting by holding and pushing someone down right now, or the sport itself.", properWords: [] },
      { word: "whistle", audio: "whistle.mp3", hintEN: "To make a high, clear sound by blowing air through your lips, or a small tool that makes that sound.", properWords: [] },
      { word: "whistles", audio: "whistles.mp3", hintEN: "Makes a high, clear sound by blowing air through the lips (he/she/it form).", properWords: [] },
      { word: "whistled", audio: "whistled.mp3", hintEN: "Made a high, clear whistling sound, in the past.", properWords: [] },
      { word: "whistling", audio: "whistling.mp3", hintEN: "Making a high, clear whistling sound right now.", properWords: [] },
      { word: "rustle", audio: "rustle.mp3", hintEN: "To make a soft, dry sound, like leaves or paper rubbing together.", properWords: [] },
      { word: "rustles", audio: "rustles.mp3", hintEN: "Makes a soft, dry rubbing sound (he/she/it form).", properWords: [] },
      { word: "rustled", audio: "rustled.mp3", hintEN: "Made a soft, dry rubbing sound, in the past.", properWords: [] },
      { word: "rustling", audio: "rustling.mp3", hintEN: "Making a soft, dry rubbing sound right now.", properWords: [] },
      { word: "dial", audio: "dial.mp3", hintEN: "To call a phone number, or the round control on some clocks, phones, or radios.", properWords: [] },
      { word: "dials", audio: "dials.mp3", hintEN: "Calls a phone number by pressing or turning (he/she/it form), or more than one round control.", properWords: [] },
      { word: "dialed", audio: "dialed.mp3", hintEN: "Called a phone number, in the past.", properWords: [] },
      { word: "dialing", audio: "dialing.mp3", hintEN: "Calling a phone number right now.", properWords: [] },
      { word: "sniffle", audio: "sniffle.mp3", hintEN: "To sniff quietly and repeatedly, often because of a cold or crying.", properWords: [] },
      { word: "sniffles", audio: "sniffles.mp3", hintEN: "Sniffs quietly and repeatedly (he/she/it form), or a mild head cold.", properWords: [] },
      { word: "sniffled", audio: "sniffled.mp3", hintEN: "Sniffed quietly and repeatedly, in the past.", properWords: [] },
      { word: "sniffling", audio: "sniffling.mp3", hintEN: "Sniffing quietly and repeatedly right now.", properWords: [] },
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
  { word: "record", audio: "record.mp3", hintEN: "To store sound, images, or information so people can use or check it later." },
  { word: "records", audio: "records.mp3", hintEN: "Stores sound or information for later use (he/she/it form)." },
  { word: "recorded", audio: "recorded.mp3", hintEN: "Stored sound or information for later use, in the past." },
  { word: "recording", audio: "recording.mp3", hintEN: "Storing sound or information for later use right now, or the sound/video file itself." },
  { word: "afford", audio: "afford.mp3", hintEN: "To have enough money or time to be able to do or buy something." },
  { word: "affords", audio: "affords.mp3", hintEN: "Has enough money or time for something (he/she/it form)." },
  { word: "afforded", audio: "afforded.mp3", hintEN: "Had enough money or time for something, in the past." },
  { word: "affording", audio: "affording.mp3", hintEN: "Having enough money or time for something right now." },
  { word: "order", audio: "order.mp3", hintEN: "To ask for something to be brought, made, or done — or the arrangement of things." },
  { word: "orders", audio: "orders.mp3", hintEN: "Asks for something to be brought or done (he/she/it form), or more than one request." },
  { word: "ordered", audio: "ordered.mp3", hintEN: "Asked for something to be brought or done, in the past." },
  { word: "ordering", audio: "ordering.mp3", hintEN: "Asking for something to be brought or done right now." },
  { word: "border", audio: "border.mp3", hintEN: "The line that divides one country, state, or area from another." },
  { word: "borders", audio: "borders.mp3", hintEN: "Touches another place along a dividing line (he/she/it form), or more than one dividing line." },
  { word: "bordered", audio: "bordered.mp3", hintEN: "Touched another place along a dividing line, in the past." },
  { word: "bordering", audio: "bordering.mp3", hintEN: "Touching another place along a dividing line right now." },
  { word: "young", audio: "young.mp3", hintEN: "Not having lived or existed for very long." },
  { word: "younger", audio: "younger.mp3", hintEN: "Less old than someone else, when comparing two people or things." },
  { word: "youngest", audio: "youngest.mp3", hintEN: "The least old, when comparing three or more people or things." },
  { word: "youthful", audio: "youthful.mp3", hintEN: "Looking or feeling young and full of energy." },
  { word: "wrestle", audio: "wrestle.mp3", hintEN: "To fight by holding and pushing another person, trying to throw them down." },
  { word: "wrestles", audio: "wrestles.mp3", hintEN: "Fights by holding and pushing someone down (he/she/it form)." },
  { word: "wrestled", audio: "wrestled.mp3", hintEN: "Fought by holding and pushing someone down, in the past." },
  { word: "wrestling", audio: "wrestling.mp3", hintEN: "Fighting by holding and pushing someone down right now, or the sport itself." },
  { word: "whistle", audio: "whistle.mp3", hintEN: "To make a high, clear sound by blowing air through your lips, or a small tool that makes that sound." },
  { word: "whistles", audio: "whistles.mp3", hintEN: "Makes a high, clear sound by blowing air through the lips (he/she/it form)." },
  { word: "whistled", audio: "whistled.mp3", hintEN: "Made a high, clear whistling sound, in the past." },
  { word: "whistling", audio: "whistling.mp3", hintEN: "Making a high, clear whistling sound right now." },
  { word: "rustle", audio: "rustle.mp3", hintEN: "To make a soft, dry sound, like leaves or paper rubbing together." },
  { word: "rustles", audio: "rustles.mp3", hintEN: "Makes a soft, dry rubbing sound (he/she/it form)." },
  { word: "rustled", audio: "rustled.mp3", hintEN: "Made a soft, dry rubbing sound, in the past." },
  { word: "rustling", audio: "rustling.mp3", hintEN: "Making a soft, dry rubbing sound right now." },
  { word: "dial", audio: "dial.mp3", hintEN: "To call a phone number, or the round control on some clocks, phones, or radios." },
  { word: "dials", audio: "dials.mp3", hintEN: "Calls a phone number by pressing or turning (he/she/it form), or more than one round control." },
  { word: "dialed", audio: "dialed.mp3", hintEN: "Called a phone number, in the past." },
  { word: "dialing", audio: "dialing.mp3", hintEN: "Calling a phone number right now." },
  { word: "sniffle", audio: "sniffle.mp3", hintEN: "To sniff quietly and repeatedly, often because of a cold or crying." },
  { word: "sniffles", audio: "sniffles.mp3", hintEN: "Sniffs quietly and repeatedly (he/she/it form), or a mild head cold." },
  { word: "sniffled", audio: "sniffled.mp3", hintEN: "Sniffed quietly and repeatedly, in the past." },
  { word: "sniffling", audio: "sniffling.mp3", hintEN: "Sniffing quietly and repeatedly right now." },
];
