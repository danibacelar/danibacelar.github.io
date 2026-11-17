/* =========================================================
   SPELLING BEE - WEEK 6 — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/ (word clips live
                  in the words/ subfolder, sentence clips in the
                  sentences/ subfolder)
     hintEN:      English definition, always shown below "Listen"
     properWords: exact tokens from `word` whose capitalization
                  must match (none in the word lists — no proper
                  nouns here. The SENTENCES list below keeps it
                  empty too: every sentence starts with a capital
                  letter only because it's a sentence, not
                  because of a proper noun, so it stays
                  case-insensitive like everything else.)
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "beauty", audio: "words/beauty.mp3", hintEN: "The quality of being very pleasing to look at.", properWords: [] },
      { word: "beauties", audio: "words/beauties.mp3", hintEN: "More than one beautiful thing or person.", properWords: [] },
      { word: "beautiful", audio: "words/beautiful.mp3", hintEN: "Very pleasing to look at.", properWords: [] },
      { word: "beautifully", audio: "words/beautifully.mp3", hintEN: "In a way that is very pleasing to look at.", properWords: [] },
      { word: "safety", audio: "words/safety.mp3", hintEN: "The state of being free from danger or harm.", properWords: [] },
      { word: "safeties", audio: "words/safeties.mp3", hintEN: "More than one state or measure of being free from danger.", properWords: [] },
      { word: "treaty", audio: "words/treaty.mp3", hintEN: "A formal written agreement between countries.", properWords: [] },
      { word: "treaties", audio: "words/treaties.mp3", hintEN: "More than one formal written agreement between countries.", properWords: [] },
      { word: "pity", audio: "words/pity.mp3", hintEN: "A feeling of sadness for someone else's suffering.", properWords: [] },
      { word: "pities", audio: "words/pities.mp3", hintEN: "Feels sadness for someone else's suffering (he/she/it form).", properWords: [] },
      { word: "pitiful", audio: "words/pitiful.mp3", hintEN: "Causing feelings of sadness or sympathy; very weak or sad.", properWords: [] },
      { word: "pitying", audio: "words/pitying.mp3", hintEN: "Feeling sadness for someone else's suffering right now.", properWords: [] },
      { word: "duty", audio: "words/duty.mp3", hintEN: "Something a person must do because it's their job or responsibility.", properWords: [] },
      { word: "duties", audio: "words/duties.mp3", hintEN: "More than one task a person must do as part of their job.", properWords: [] },
      { word: "dutiful", audio: "words/dutiful.mp3", hintEN: "Doing what is expected or required out of respect or responsibility.", properWords: [] },
      { word: "dutifully", audio: "words/dutifully.mp3", hintEN: "In a way that shows you're doing what's expected or required.", properWords: [] },
      { word: "naughty", audio: "words/naughty.mp3", hintEN: "Behaving badly or not obeying the rules, especially for a child.", properWords: [] },
      { word: "naughtier", audio: "words/naughtier.mp3", hintEN: "Behaving worse, when comparing two people.", properWords: [] },
      { word: "naughtiest", audio: "words/naughtiest.mp3", hintEN: "Behaving the worst, when comparing three or more people.", properWords: [] },
      { word: "naughtiness", audio: "words/naughtiness.mp3", hintEN: "The quality of behaving badly or breaking the rules.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "society", audio: "words/society.mp3", hintEN: "A large group of people who live together in an organized community.", properWords: [] },
      { word: "societies", audio: "words/societies.mp3", hintEN: "More than one large, organized community of people.", properWords: [] },
      { word: "anxious", audio: "words/anxious.mp3", hintEN: "Feeling worried or nervous about something.", properWords: [] },
      { word: "anxiety", audio: "words/anxiety.mp3", hintEN: "A feeling of worry or nervousness.", properWords: [] },
      { word: "validity", audio: "words/validity.mp3", hintEN: "The quality of being based on sound reasoning, true, or legally acceptable.", properWords: [] },
      { word: "rickety", audio: "words/rickety.mp3", hintEN: "Likely to break or fall apart because it's old, weak, or shaky.", properWords: [] },
      { word: "entirety", audio: "words/entirety.mp3", hintEN: "The whole of something, with nothing left out.", properWords: [] },
      { word: "improper", audio: "words/improper.mp3", hintEN: "Not correct, not suitable, or not following the proper rules.", properWords: [] },
      { word: "timidity", audio: "words/timidity.mp3", hintEN: "The quality of being shy or easily scared.", properWords: [] },
      { word: "humidity", audio: "words/humidity.mp3", hintEN: "The amount of water vapor in the air.", properWords: [] },
      { word: "stupidity", audio: "words/stupidity.mp3", hintEN: "The quality of being unwise or not thinking carefully.", properWords: [] },
      { word: "profundity", audio: "words/profundity.mp3", hintEN: "Great depth of knowledge, thought, or feeling.", properWords: [] },
      { word: "commodity", audio: "words/commodity.mp3", hintEN: "A raw material or product that can be bought and sold.", properWords: [] },
      { word: "commodities", audio: "words/commodities.mp3", hintEN: "More than one raw material or product that can be bought and sold.", properWords: [] },
      { word: "absurdity", audio: "words/absurdity.mp3", hintEN: "Something that is extremely silly, unreasonable, or doesn't make sense.", properWords: [] },
      { word: "absurdities", audio: "words/absurdities.mp3", hintEN: "More than one extremely silly or unreasonable thing.", properWords: [] },
      { word: "technicality", audio: "words/technicality.mp3", hintEN: "A small, specific detail or rule, especially in law.", properWords: [] },
      { word: "technicalities", audio: "words/technicalities.mp3", hintEN: "More than one small, specific detail or rule.", properWords: [] },
      { word: "legality", audio: "words/legality.mp3", hintEN: "The state of being allowed or required by law.", properWords: [] },
      { word: "legalities", audio: "words/legalities.mp3", hintEN: "More than one legal detail or requirement.", properWords: [] },
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
  { word: "beauty", audio: "words/beauty.mp3", hintEN: "The quality of being very pleasing to look at." },
  { word: "beauties", audio: "words/beauties.mp3", hintEN: "More than one beautiful thing or person." },
  { word: "beautiful", audio: "words/beautiful.mp3", hintEN: "Very pleasing to look at." },
  { word: "beautifully", audio: "words/beautifully.mp3", hintEN: "In a way that is very pleasing to look at." },
  { word: "safety", audio: "words/safety.mp3", hintEN: "The state of being free from danger or harm." },
  { word: "safeties", audio: "words/safeties.mp3", hintEN: "More than one state or measure of being free from danger." },
  { word: "treaty", audio: "words/treaty.mp3", hintEN: "A formal written agreement between countries." },
  { word: "treaties", audio: "words/treaties.mp3", hintEN: "More than one formal written agreement between countries." },
  { word: "pity", audio: "words/pity.mp3", hintEN: "A feeling of sadness for someone else's suffering." },
  { word: "pities", audio: "words/pities.mp3", hintEN: "Feels sadness for someone else's suffering (he/she/it form)." },
  { word: "pitiful", audio: "words/pitiful.mp3", hintEN: "Causing feelings of sadness or sympathy; very weak or sad." },
  { word: "pitying", audio: "words/pitying.mp3", hintEN: "Feeling sadness for someone else's suffering right now." },
  { word: "duty", audio: "words/duty.mp3", hintEN: "Something a person must do because it's their job or responsibility." },
  { word: "duties", audio: "words/duties.mp3", hintEN: "More than one task a person must do as part of their job." },
  { word: "dutiful", audio: "words/dutiful.mp3", hintEN: "Doing what is expected or required out of respect or responsibility." },
  { word: "dutifully", audio: "words/dutifully.mp3", hintEN: "In a way that shows you're doing what's expected or required." },
  { word: "naughty", audio: "words/naughty.mp3", hintEN: "Behaving badly or not obeying the rules, especially for a child." },
  { word: "naughtier", audio: "words/naughtier.mp3", hintEN: "Behaving worse, when comparing two people." },
  { word: "naughtiest", audio: "words/naughtiest.mp3", hintEN: "Behaving the worst, when comparing three or more people." },
  { word: "naughtiness", audio: "words/naughtiness.mp3", hintEN: "The quality of behaving badly or breaking the rules." },
  { word: "society", audio: "words/society.mp3", hintEN: "A large group of people who live together in an organized community." },
  { word: "societies", audio: "words/societies.mp3", hintEN: "More than one large, organized community of people." },
  { word: "anxious", audio: "words/anxious.mp3", hintEN: "Feeling worried or nervous about something." },
  { word: "anxiety", audio: "words/anxiety.mp3", hintEN: "A feeling of worry or nervousness." },
  { word: "validity", audio: "words/validity.mp3", hintEN: "The quality of being based on sound reasoning, true, or legally acceptable." },
  { word: "rickety", audio: "words/rickety.mp3", hintEN: "Likely to break or fall apart because it's old, weak, or shaky." },
  { word: "entirety", audio: "words/entirety.mp3", hintEN: "The whole of something, with nothing left out." },
  { word: "improper", audio: "words/improper.mp3", hintEN: "Not correct, not suitable, or not following the proper rules." },
  { word: "timidity", audio: "words/timidity.mp3", hintEN: "The quality of being shy or easily scared." },
  { word: "humidity", audio: "words/humidity.mp3", hintEN: "The amount of water vapor in the air." },
  { word: "stupidity", audio: "words/stupidity.mp3", hintEN: "The quality of being unwise or not thinking carefully." },
  { word: "profundity", audio: "words/profundity.mp3", hintEN: "Great depth of knowledge, thought, or feeling." },
  { word: "commodity", audio: "words/commodity.mp3", hintEN: "A raw material or product that can be bought and sold." },
  { word: "commodities", audio: "words/commodities.mp3", hintEN: "More than one raw material or product that can be bought and sold." },
  { word: "absurdity", audio: "words/absurdity.mp3", hintEN: "Something that is extremely silly, unreasonable, or doesn't make sense." },
  { word: "absurdities", audio: "words/absurdities.mp3", hintEN: "More than one extremely silly or unreasonable thing." },
  { word: "technicality", audio: "words/technicality.mp3", hintEN: "A small, specific detail or rule, especially in law." },
  { word: "technicalities", audio: "words/technicalities.mp3", hintEN: "More than one small, specific detail or rule." },
  { word: "legality", audio: "words/legality.mp3", hintEN: "The state of being allowed or required by law." },
  { word: "legalities", audio: "words/legalities.mp3", hintEN: "More than one legal detail or requirement." },
];

/* =========================================================
   SENTENCE BUZZ — FULL SENTENCES
   -----------------------------------------------------------
   Same "type what you hear" engine as Phase 1/2, but each item
   is a full sentence built from this week's words instead of a
   single word. hintEN gives a non-revealing paraphrase of the
   sentence's meaning (never the sentence itself or its words),
   same spirit as the single-word definitions above.
   ========================================================= */
const SENTENCES = [
  { word: "Beauty and safety improve society.", audio: "sentences/beauty-safety-society.mp3", hintEN: "Loveliness and security make a community better.", properWords: [] },
  { word: "The beautiful garden was admired by everyone.", audio: "sentences/beautiful-garden.mp3", hintEN: "Everyone loved how lovely the yard looked.", properWords: [] },
  { word: "She dutifully completed her duties every day.", audio: "sentences/dutifully-duties.mp3", hintEN: "She responsibly finished her daily tasks.", properWords: [] },
  { word: "The naughty boy became even naughtier.", audio: "sentences/naughty-naughtier.mp3", hintEN: "The misbehaving boy misbehaved even more.", properWords: [] },
  { word: "His anxiety caused him to feel anxious.", audio: "sentences/anxiety-anxious.mp3", hintEN: "His nervous feeling made him feel worried.", properWords: [] },
  { word: "The validity of the agreement was questioned.", audio: "sentences/validity-agreement.mp3", hintEN: "People doubted whether the agreement was legally sound.", properWords: [] },
  { word: "The old bridge looked rickety in the wind.", audio: "sentences/rickety-bridge.mp3", hintEN: "The old bridge seemed shaky and unstable in the wind.", properWords: [] },
  { word: "High humidity made the afternoon uncomfortable.", audio: "sentences/humidity-afternoon.mp3", hintEN: "The wet, sticky air made the afternoon unpleasant.", properWords: [] },
  { word: "The absurdity of the situation made us laugh.", audio: "sentences/absurdity-situation.mp3", hintEN: "How ridiculous the situation was made everyone laugh.", properWords: [] },
  { word: "The legality of the decision became a technicality.", audio: "sentences/legality-technicality.mp3", hintEN: "Whether the decision followed the law came down to a small technical detail.", properWords: [] },
];
