/* =========================================================
   SPELLING BEE - WEEK 5 — VOCABULARY LIST
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
      { word: "hurry", audio: "hurry.mp3", hintEN: "To move or do something quickly because there isn't much time.", properWords: [] },
      { word: "hurries", audio: "hurries.mp3", hintEN: "Moves or does something quickly (he/she/it form).", properWords: [] },
      { word: "hurried", audio: "hurried.mp3", hintEN: "Moved or did something quickly, in the past.", properWords: [] },
      { word: "hurrying", audio: "hurrying.mp3", hintEN: "Moving or doing something quickly right now.", properWords: [] },
      { word: "appreciate", audio: "appreciate.mp3", hintEN: "To be thankful for something, or to understand how good or important it is.", properWords: [] },
      { word: "appreciated", audio: "appreciated.mp3", hintEN: "Was thankful for something, or understood its value, in the past.", properWords: [] },
      { word: "appreciative", audio: "appreciative.mp3", hintEN: "Feeling or showing thanks.", properWords: [] },
      { word: "appreciation", audio: "appreciation.mp3", hintEN: "A feeling of being thankful, or understanding the value of something.", properWords: [] },
      { word: "courtesy", audio: "courtesy.mp3", hintEN: "Polite behavior that shows respect for other people.", properWords: [] },
      { word: "courtesies", audio: "courtesies.mp3", hintEN: "More than one polite, respectful act.", properWords: [] },
      { word: "courteous", audio: "courteous.mp3", hintEN: "Polite and respectful.", properWords: [] },
      { word: "courteously", audio: "courteously.mp3", hintEN: "In a polite and respectful way.", properWords: [] },
      { word: "easy", audio: "easy.mp3", hintEN: "Not hard to do or understand.", properWords: [] },
      { word: "easier", audio: "easier.mp3", hintEN: "Less difficult, when comparing two things.", properWords: [] },
      { word: "easiest", audio: "easiest.mp3", hintEN: "The least difficult, when comparing three or more things.", properWords: [] },
      { word: "easily", audio: "easily.mp3", hintEN: "Without much difficulty.", properWords: [] },
      { word: "hypocrisy", audio: "hypocrisy.mp3", hintEN: "Saying you believe one thing but acting in a different, contradicting way.", properWords: [] },
      { word: "hypocrite", audio: "hypocrite.mp3", hintEN: "A person who says one thing but does another, contradicting what they said.", properWords: [] },
      { word: "hypocritical", audio: "hypocritical.mp3", hintEN: "Saying one thing but acting the opposite way.", properWords: [] },
      { word: "hypocritically", audio: "hypocritically.mp3", hintEN: "In a way that says one thing but does the opposite.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "jealous", audio: "jealous.mp3", hintEN: "Feeling unhappy because someone else has something you want.", properWords: [] },
      { word: "jealousy", audio: "jealousy.mp3", hintEN: "The feeling of being unhappy because someone else has something you want.", properWords: [] },
      { word: "profits", audio: "profits.mp3", hintEN: "Money a person or business earns after paying all its costs.", properWords: [] },
      { word: "prophet", audio: "prophet.mp3", hintEN: "A person believed to speak messages from God, or who predicts the future. Sounds just like \"profit\" — but spelled completely differently!", properWords: [] },
      { word: "daisy", audio: "daisy.mp3", hintEN: "A small white or yellow flower with a round center.", properWords: [] },
      { word: "daisies", audio: "daisies.mp3", hintEN: "More than one small white or yellow flower.", properWords: [] },
      { word: "cheesy", audio: "cheesy.mp3", hintEN: "Tasting or smelling like cheese, or silly and overly sentimental.", properWords: [] },
      { word: "cheesiest", audio: "cheesiest.mp3", hintEN: "The most cheesy, when comparing three or more things.", properWords: [] },
      { word: "queasy", audio: "queasy.mp3", hintEN: "Feeling like you might throw up.", properWords: [] },
      { word: "queasier", audio: "queasier.mp3", hintEN: "Feeling more like you might throw up, when comparing two things.", properWords: [] },
      { word: "greasy", audio: "greasy.mp3", hintEN: "Covered in or full of grease or oil.", properWords: [] },
      { word: "greasier", audio: "greasier.mp3", hintEN: "More covered in grease or oil, when comparing two things.", properWords: [] },
      { word: "drowsy", audio: "drowsy.mp3", hintEN: "Feeling sleepy and wanting to close your eyes.", properWords: [] },
      { word: "drowsier", audio: "drowsier.mp3", hintEN: "Feeling more sleepy, when comparing two things.", properWords: [] },
      { word: "drowsiest", audio: "drowsiest.mp3", hintEN: "The most sleepy, when comparing three or more things.", properWords: [] },
      { word: "drowsiness", audio: "drowsiness.mp3", hintEN: "The feeling of being sleepy.", properWords: [] },
      { word: "busy", audio: "busy.mp3", hintEN: "Having a lot to do, with little free time.", properWords: [] },
      { word: "busier", audio: "busier.mp3", hintEN: "Having more to do than usual, when comparing two things.", properWords: [] },
      { word: "busiest", audio: "busiest.mp3", hintEN: "Having the most to do, when comparing three or more things.", properWords: [] },
      { word: "business", audio: "business.mp3", hintEN: "Work done to make or sell things for money, or a company that does that.", properWords: [] },
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
  { word: "hurry", audio: "hurry.mp3", hintEN: "To move or do something quickly because there isn't much time." },
  { word: "hurries", audio: "hurries.mp3", hintEN: "Moves or does something quickly (he/she/it form)." },
  { word: "hurried", audio: "hurried.mp3", hintEN: "Moved or did something quickly, in the past." },
  { word: "hurrying", audio: "hurrying.mp3", hintEN: "Moving or doing something quickly right now." },
  { word: "appreciate", audio: "appreciate.mp3", hintEN: "To be thankful for something, or to understand how good or important it is." },
  { word: "appreciated", audio: "appreciated.mp3", hintEN: "Was thankful for something, or understood its value, in the past." },
  { word: "appreciative", audio: "appreciative.mp3", hintEN: "Feeling or showing thanks." },
  { word: "appreciation", audio: "appreciation.mp3", hintEN: "A feeling of being thankful, or understanding the value of something." },
  { word: "courtesy", audio: "courtesy.mp3", hintEN: "Polite behavior that shows respect for other people." },
  { word: "courtesies", audio: "courtesies.mp3", hintEN: "More than one polite, respectful act." },
  { word: "courteous", audio: "courteous.mp3", hintEN: "Polite and respectful." },
  { word: "courteously", audio: "courteously.mp3", hintEN: "In a polite and respectful way." },
  { word: "easy", audio: "easy.mp3", hintEN: "Not hard to do or understand." },
  { word: "easier", audio: "easier.mp3", hintEN: "Less difficult, when comparing two things." },
  { word: "easiest", audio: "easiest.mp3", hintEN: "The least difficult, when comparing three or more things." },
  { word: "easily", audio: "easily.mp3", hintEN: "Without much difficulty." },
  { word: "hypocrisy", audio: "hypocrisy.mp3", hintEN: "Saying you believe one thing but acting in a different, contradicting way." },
  { word: "hypocrite", audio: "hypocrite.mp3", hintEN: "A person who says one thing but does another, contradicting what they said." },
  { word: "hypocritical", audio: "hypocritical.mp3", hintEN: "Saying one thing but acting the opposite way." },
  { word: "hypocritically", audio: "hypocritically.mp3", hintEN: "In a way that says one thing but does the opposite." },
  { word: "jealous", audio: "jealous.mp3", hintEN: "Feeling unhappy because someone else has something you want." },
  { word: "jealousy", audio: "jealousy.mp3", hintEN: "The feeling of being unhappy because someone else has something you want." },
  { word: "profits", audio: "profits.mp3", hintEN: "Money a person or business earns after paying all its costs." },
  { word: "prophet", audio: "prophet.mp3", hintEN: "A person believed to speak messages from God, or who predicts the future. Sounds just like \"profit\" — but spelled completely differently!" },
  { word: "daisy", audio: "daisy.mp3", hintEN: "A small white or yellow flower with a round center." },
  { word: "daisies", audio: "daisies.mp3", hintEN: "More than one small white or yellow flower." },
  { word: "cheesy", audio: "cheesy.mp3", hintEN: "Tasting or smelling like cheese, or silly and overly sentimental." },
  { word: "cheesiest", audio: "cheesiest.mp3", hintEN: "The most cheesy, when comparing three or more things." },
  { word: "queasy", audio: "queasy.mp3", hintEN: "Feeling like you might throw up." },
  { word: "queasier", audio: "queasier.mp3", hintEN: "Feeling more like you might throw up, when comparing two things." },
  { word: "greasy", audio: "greasy.mp3", hintEN: "Covered in or full of grease or oil." },
  { word: "greasier", audio: "greasier.mp3", hintEN: "More covered in grease or oil, when comparing two things." },
  { word: "drowsy", audio: "drowsy.mp3", hintEN: "Feeling sleepy and wanting to close your eyes." },
  { word: "drowsier", audio: "drowsier.mp3", hintEN: "Feeling more sleepy, when comparing two things." },
  { word: "drowsiest", audio: "drowsiest.mp3", hintEN: "The most sleepy, when comparing three or more things." },
  { word: "drowsiness", audio: "drowsiness.mp3", hintEN: "The feeling of being sleepy." },
  { word: "busy", audio: "busy.mp3", hintEN: "Having a lot to do, with little free time." },
  { word: "busier", audio: "busier.mp3", hintEN: "Having more to do than usual, when comparing two things." },
  { word: "busiest", audio: "busiest.mp3", hintEN: "Having the most to do, when comparing three or more things." },
  { word: "business", audio: "business.mp3", hintEN: "Work done to make or sell things for money, or a company that does that." },
];
