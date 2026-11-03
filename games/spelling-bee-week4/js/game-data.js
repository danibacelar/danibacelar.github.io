/* =========================================================
   SPELLING BEE - WEEK 4 — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/
     hintEN:      English definition, always shown below "Listen"
     properWords: exact tokens from `word` whose capitalization
                  must match (none here — no proper nouns in
                  this list, so every word is case-insensitive)

   NOTE: the original word list the teacher sent repeated the word
   "injury", "luxury" and "century" a second time (as the 4th item
   of each of those families). She asked to drop those repeats, so
   this list has 37 words instead of the usual 40, and the audio
   clips skip those 3 repeated segments from the single recording.
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "nursery", audio: "nursery.mp3", hintEN: "A room or place set up for young babies or children, or a place where young plants are grown.", properWords: [] },
      { word: "nurseries", audio: "nurseries.mp3", hintEN: "More than one room for young babies or children, or more than one place where young plants are grown.", properWords: [] },
      { word: "watery", audio: "watery.mp3", hintEN: "Full of water, or thin and weak like water.", properWords: [] },
      { word: "wintry", audio: "wintry.mp3", hintEN: "Cold and grey, like winter weather.", properWords: [] },
      { word: "mastery", audio: "mastery.mp3", hintEN: "Complete skill or control over something.", properWords: [] },
      { word: "mystery", audio: "mystery.mp3", hintEN: "Something strange or puzzling that is hard to explain or understand.", properWords: [] },
      { word: "mysteries", audio: "mysteries.mp3", hintEN: "More than one strange, puzzling thing that is hard to explain.", properWords: [] },
      { word: "mysterious", audio: "mysterious.mp3", hintEN: "Strange, secret, or hard to explain.", properWords: [] },
      { word: "battery", audio: "battery.mp3", hintEN: "A device that stores electricity to power things, like a toy or a phone.", properWords: [] },
      { word: "pottery", audio: "pottery.mp3", hintEN: "Pots, bowls, and other objects made from clay, or the craft of making them.", properWords: [] },
      { word: "lottery", audio: "lottery.mp3", hintEN: "A game where people buy tickets for a chance to win a prize by luck.", properWords: [] },
      { word: "bravery", audio: "bravery.mp3", hintEN: "Courage; not being afraid to do something difficult or dangerous.", properWords: [] },
      { word: "every", audio: "every.mp3", hintEN: "Used to talk about each one of a group, with none left out.", properWords: [] },
      { word: "recovery", audio: "recovery.mp3", hintEN: "The process of getting better after being sick, hurt, or having a problem.", properWords: [] },
      { word: "delivery", audio: "delivery.mp3", hintEN: "The act of bringing something, like a package, to where it needs to go.", properWords: [] },
      { word: "deliveries", audio: "deliveries.mp3", hintEN: "More than one act of bringing something to where it needs to go.", properWords: [] },
      { word: "discovery", audio: "discovery.mp3", hintEN: "The act of finding something for the first time.", properWords: [] },
      { word: "discoveries", audio: "discoveries.mp3", hintEN: "More than one thing found for the first time.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "buried", audio: "buried.mp3", hintEN: "Put underground and covered with earth, in the past.", properWords: [] },
      { word: "burial", audio: "burial.mp3", hintEN: "The act of putting a dead body into the ground.", properWords: [] },
      { word: "injury", audio: "injury.mp3", hintEN: "Damage done to part of the body, like a cut or a broken bone.", properWords: [] },
      { word: "injuries", audio: "injuries.mp3", hintEN: "More than one damage done to the body.", properWords: [] },
      { word: "injurious", audio: "injurious.mp3", hintEN: "Causing harm or damage.", properWords: [] },
      { word: "luxury", audio: "luxury.mp3", hintEN: "Something very comfortable and expensive that isn't necessary.", properWords: [] },
      { word: "luxuries", audio: "luxuries.mp3", hintEN: "More than one very comfortable, expensive thing that isn't necessary.", properWords: [] },
      { word: "luxurious", audio: "luxurious.mp3", hintEN: "Very comfortable and expensive, in a fancy way.", properWords: [] },
      { word: "century", audio: "century.mp3", hintEN: "A period of one hundred years.", properWords: [] },
      { word: "centuries", audio: "centuries.mp3", hintEN: "More than one period of one hundred years.", properWords: [] },
      { word: "centennial", audio: "centennial.mp3", hintEN: "Relating to a 100th anniversary, or happening every hundred years.", properWords: [] },
      { word: "worry", audio: "worry.mp3", hintEN: "To feel nervous or uneasy about something that might happen.", properWords: [] },
      { word: "worries", audio: "worries.mp3", hintEN: "Feels nervous about something that might happen (he/she/it form).", properWords: [] },
      { word: "worried", audio: "worried.mp3", hintEN: "Felt nervous or uneasy about something, in the past.", properWords: [] },
      { word: "worrying", audio: "worrying.mp3", hintEN: "Feeling nervous or uneasy about something right now.", properWords: [] },
      { word: "scurry", audio: "scurry.mp3", hintEN: "To run with short, quick steps, often in a hurry or because you are scared.", properWords: [] },
      { word: "scurries", audio: "scurries.mp3", hintEN: "Runs with short, quick steps (he/she/it form).", properWords: [] },
      { word: "scurried", audio: "scurried.mp3", hintEN: "Ran with short, quick steps, in the past.", properWords: [] },
      { word: "scurrying", audio: "scurrying.mp3", hintEN: "Running with short, quick steps right now.", properWords: [] },
    ]
  }
];

/* =========================================================
   PRACTICE — LETTER SCRAMBLE
   -----------------------------------------------------------
   Every word in this list is a single word with no spaces or
   apostrophes, so all 37 are usable in the tap-the-letters
   Practice round.
   ========================================================= */
const CHALLENGE_WORDS = [
  { word: "nursery", audio: "nursery.mp3", hintEN: "A room or place set up for young babies or children, or a place where young plants are grown." },
  { word: "nurseries", audio: "nurseries.mp3", hintEN: "More than one room for young babies or children, or more than one place where young plants are grown." },
  { word: "watery", audio: "watery.mp3", hintEN: "Full of water, or thin and weak like water." },
  { word: "wintry", audio: "wintry.mp3", hintEN: "Cold and grey, like winter weather." },
  { word: "mastery", audio: "mastery.mp3", hintEN: "Complete skill or control over something." },
  { word: "mystery", audio: "mystery.mp3", hintEN: "Something strange or puzzling that is hard to explain or understand." },
  { word: "mysteries", audio: "mysteries.mp3", hintEN: "More than one strange, puzzling thing that is hard to explain." },
  { word: "mysterious", audio: "mysterious.mp3", hintEN: "Strange, secret, or hard to explain." },
  { word: "battery", audio: "battery.mp3", hintEN: "A device that stores electricity to power things, like a toy or a phone." },
  { word: "pottery", audio: "pottery.mp3", hintEN: "Pots, bowls, and other objects made from clay, or the craft of making them." },
  { word: "lottery", audio: "lottery.mp3", hintEN: "A game where people buy tickets for a chance to win a prize by luck." },
  { word: "bravery", audio: "bravery.mp3", hintEN: "Courage; not being afraid to do something difficult or dangerous." },
  { word: "every", audio: "every.mp3", hintEN: "Used to talk about each one of a group, with none left out." },
  { word: "recovery", audio: "recovery.mp3", hintEN: "The process of getting better after being sick, hurt, or having a problem." },
  { word: "delivery", audio: "delivery.mp3", hintEN: "The act of bringing something, like a package, to where it needs to go." },
  { word: "deliveries", audio: "deliveries.mp3", hintEN: "More than one act of bringing something to where it needs to go." },
  { word: "discovery", audio: "discovery.mp3", hintEN: "The act of finding something for the first time." },
  { word: "discoveries", audio: "discoveries.mp3", hintEN: "More than one thing found for the first time." },
  { word: "buried", audio: "buried.mp3", hintEN: "Put underground and covered with earth, in the past." },
  { word: "burial", audio: "burial.mp3", hintEN: "The act of putting a dead body into the ground." },
  { word: "injury", audio: "injury.mp3", hintEN: "Damage done to part of the body, like a cut or a broken bone." },
  { word: "injuries", audio: "injuries.mp3", hintEN: "More than one damage done to the body." },
  { word: "injurious", audio: "injurious.mp3", hintEN: "Causing harm or damage." },
  { word: "luxury", audio: "luxury.mp3", hintEN: "Something very comfortable and expensive that isn't necessary." },
  { word: "luxuries", audio: "luxuries.mp3", hintEN: "More than one very comfortable, expensive thing that isn't necessary." },
  { word: "luxurious", audio: "luxurious.mp3", hintEN: "Very comfortable and expensive, in a fancy way." },
  { word: "century", audio: "century.mp3", hintEN: "A period of one hundred years." },
  { word: "centuries", audio: "centuries.mp3", hintEN: "More than one period of one hundred years." },
  { word: "centennial", audio: "centennial.mp3", hintEN: "Relating to a 100th anniversary, or happening every hundred years." },
  { word: "worry", audio: "worry.mp3", hintEN: "To feel nervous or uneasy about something that might happen." },
  { word: "worries", audio: "worries.mp3", hintEN: "Feels nervous about something that might happen (he/she/it form)." },
  { word: "worried", audio: "worried.mp3", hintEN: "Felt nervous or uneasy about something, in the past." },
  { word: "worrying", audio: "worrying.mp3", hintEN: "Feeling nervous or uneasy about something right now." },
  { word: "scurry", audio: "scurry.mp3", hintEN: "To run with short, quick steps, often in a hurry or because you are scared." },
  { word: "scurries", audio: "scurries.mp3", hintEN: "Runs with short, quick steps (he/she/it form)." },
  { word: "scurried", audio: "scurried.mp3", hintEN: "Ran with short, quick steps, in the past." },
  { word: "scurrying", audio: "scurrying.mp3", hintEN: "Running with short, quick steps right now." },
];
