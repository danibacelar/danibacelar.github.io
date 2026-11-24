/* =========================================================
   SPELLING BEE - WEEK 7 — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/ (word clips live
                  in the words/ subfolder, sentence clips in the
                  sentences/ subfolder)
     hintEN:      English definition, always shown below "Listen"
     properWords: exact tokens from `word` whose capitalization
                  must match (none here — no proper nouns)
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "formality", audio: "words/formalities.mp3", hintEN: "A rule or custom followed in a polite, official, or traditional way.", properWords: [] },
      { word: "formalities", audio: "words/originality.mp3", hintEN: "More than one official or traditional rule that's expected to be followed.", properWords: [] },
      { word: "originality", audio: "words/nationality.mp3", hintEN: "The quality of being new and different, not copied from someone else.", properWords: [] },
      { word: "nationality", audio: "words/rationality.mp3", hintEN: "The country a person legally belongs to.", properWords: [] },
      { word: "rationality", audio: "words/causality.mp3", hintEN: "The quality of thinking clearly and making sense, based on reason.", properWords: [] },
      { word: "causality", audio: "words/personality.mp3", hintEN: "The relationship between a cause and its effect.", properWords: [] },
      { word: "personality", audio: "words/personalities.mp3", hintEN: "The combination of qualities that make a person who they are.", properWords: [] },
      { word: "personalities", audio: "words/fatality.mp3", hintEN: "More than one combination of qualities that make a person who they are.", properWords: [] },
      { word: "fatality", audio: "words/mentality.mp3", hintEN: "A death caused by an accident, disaster, or violence.", properWords: [] },
      { word: "mentality", audio: "words/morality.mp3", hintEN: "A particular way of thinking about things.", properWords: [] },
      { word: "morality", audio: "words/immorality.mp3", hintEN: "Beliefs about what is right and wrong.", properWords: [] },
      { word: "immorality", audio: "words/punctuality.mp3", hintEN: "Behavior that goes against what is right and wrong.", properWords: [] },
      { word: "punctuality", audio: "words/individuality.mp3", hintEN: "The quality of arriving or doing something at the right, expected time.", properWords: [] },
      { word: "individuality", audio: "words/hospitality.mp3", hintEN: "The qualities that make one person different from everyone else.", properWords: [] },
      { word: "hospitality", audio: "words/vitality.mp3", hintEN: "Being friendly and generous to guests or visitors.", properWords: [] },
      { word: "vitality", audio: "words/quality.mp3", hintEN: "Energy and enthusiasm; the state of being strong and active.", properWords: [] },
      { word: "quality", audio: "words/qualities.mp3", hintEN: "How good or bad something is.", properWords: [] },
      { word: "qualities", audio: "words/actuality.mp3", hintEN: "More than one feature or characteristic of someone or something.", properWords: [] },
      { word: "actuality", audio: "words/inequalities.mp3", hintEN: "The real facts of a situation, as opposed to what people imagine.", properWords: [] },
      { word: "inequalities", audio: "words/probability.mp3", hintEN: "Differences between people or groups that are unfair.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "probability", audio: "words/probabilities.mp3", hintEN: "How likely something is to happen.", properWords: [] },
      { word: "probabilities", audio: "words/ability.mp3", hintEN: "More than one measure of how likely something is to happen.", properWords: [] },
      { word: "ability", audio: "words/abilities.mp3", hintEN: "The power or skill to do something.", properWords: [] },
      { word: "abilities", audio: "words/reliability.mp3", hintEN: "More than one skill or power to do something.", properWords: [] },
      { word: "reliability", audio: "words/capability.mp3", hintEN: "The quality of being trustworthy and consistent.", properWords: [] },
      { word: "capability", audio: "words/credibility.mp3", hintEN: "The power or ability to do something.", properWords: [] },
      { word: "credibility", audio: "words/credibility.mp3", hintEN: "The quality of being believable or trustworthy.", properWords: [] },
      { word: "eligibility", audio: "words/eligibility.mp3", hintEN: "Meeting the requirements needed to be allowed to do or receive something.", properWords: [] },
      { word: "possibility", audio: "words/possibility.mp3", hintEN: "A chance that something might happen.", properWords: [] },
      { word: "impossibility", audio: "words/possibility.mp3", hintEN: "Something that cannot happen or be done.", properWords: [] },
      { word: "plausibility", audio: "words/impossibility.mp3", hintEN: "The quality of seeming likely to be true or reasonable.", properWords: [] },
      { word: "responsibilities", audio: "words/responsibilities.mp3", hintEN: "More than one duty or task a person is expected to take care of.", properWords: [] },
      { word: "extremity", audio: "words/extremity.mp3", hintEN: "The furthest point or edge of something, or an extreme level of something.", properWords: [] },
      { word: "extremities", audio: "words/extremities.mp3", hintEN: "The furthest points of something, like hands and feet on a body.", properWords: [] },
      { word: "facility", audio: "words/facility.mp3", hintEN: "A building or place built for a particular purpose, or ease in doing something.", properWords: [] },
      { word: "facilities", audio: "words/facilities.mp3", hintEN: "More than one building or service provided for a particular purpose.", properWords: [] },
      { word: "humanity", audio: "words/humanity.mp3", hintEN: "All people, considered as a group, or the quality of being kind.", properWords: [] },
      { word: "humanities", audio: "words/humanities.mp3", hintEN: "School subjects that study people and culture, like history and language.", properWords: [] },
      { word: "inhumanity", audio: "words/inhumanity.mp3", hintEN: "Cruel or unkind behavior toward other people.", properWords: [] },
      { word: "utilities", audio: "words/utilities.mp3", hintEN: "Basic services like water, electricity, and gas, or tools that help with tasks.", properWords: [] },
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
  { word: "formality", audio: "words/formalities.mp3", hintEN: "A rule or custom followed in a polite, official, or traditional way." },
  { word: "formalities", audio: "words/originality.mp3", hintEN: "More than one official or traditional rule that's expected to be followed." },
  { word: "originality", audio: "words/nationality.mp3", hintEN: "The quality of being new and different, not copied from someone else." },
  { word: "nationality", audio: "words/rationality.mp3", hintEN: "The country a person legally belongs to." },
  { word: "rationality", audio: "words/causality.mp3", hintEN: "The quality of thinking clearly and making sense, based on reason." },
  { word: "causality", audio: "words/personality.mp3", hintEN: "The relationship between a cause and its effect." },
  { word: "personality", audio: "words/personalities.mp3", hintEN: "The combination of qualities that make a person who they are." },
  { word: "personalities", audio: "words/fatality.mp3", hintEN: "More than one combination of qualities that make a person who they are." },
  { word: "fatality", audio: "words/mentality.mp3", hintEN: "A death caused by an accident, disaster, or violence." },
  { word: "mentality", audio: "words/morality.mp3", hintEN: "A particular way of thinking about things." },
  { word: "morality", audio: "words/immorality.mp3", hintEN: "Beliefs about what is right and wrong." },
  { word: "immorality", audio: "words/punctuality.mp3", hintEN: "Behavior that goes against what is right and wrong." },
  { word: "punctuality", audio: "words/individuality.mp3", hintEN: "The quality of arriving or doing something at the right, expected time." },
  { word: "individuality", audio: "words/hospitality.mp3", hintEN: "The qualities that make one person different from everyone else." },
  { word: "hospitality", audio: "words/vitality.mp3", hintEN: "Being friendly and generous to guests or visitors." },
  { word: "vitality", audio: "words/quality.mp3", hintEN: "Energy and enthusiasm; the state of being strong and active." },
  { word: "quality", audio: "words/qualities.mp3", hintEN: "How good or bad something is." },
  { word: "qualities", audio: "words/actuality.mp3", hintEN: "More than one feature or characteristic of someone or something." },
  { word: "actuality", audio: "words/inequalities.mp3", hintEN: "The real facts of a situation, as opposed to what people imagine." },
  { word: "inequalities", audio: "words/probability.mp3", hintEN: "Differences between people or groups that are unfair." },
  { word: "probability", audio: "words/probabilities.mp3", hintEN: "How likely something is to happen." },
  { word: "probabilities", audio: "words/ability.mp3", hintEN: "More than one measure of how likely something is to happen." },
  { word: "ability", audio: "words/abilities.mp3", hintEN: "The power or skill to do something." },
  { word: "abilities", audio: "words/reliability.mp3", hintEN: "More than one skill or power to do something." },
  { word: "reliability", audio: "words/capability.mp3", hintEN: "The quality of being trustworthy and consistent." },
  { word: "capability", audio: "words/credibility.mp3", hintEN: "The power or ability to do something." },
  { word: "credibility", audio: "words/credibility.mp3", hintEN: "The quality of being believable or trustworthy." },
  { word: "eligibility", audio: "words/eligibility.mp3", hintEN: "Meeting the requirements needed to be allowed to do or receive something." },
  { word: "possibility", audio: "words/possibility.mp3", hintEN: "A chance that something might happen." },
  { word: "impossibility", audio: "words/possibility.mp3", hintEN: "Something that cannot happen or be done." },
  { word: "plausibility", audio: "words/impossibility.mp3", hintEN: "The quality of seeming likely to be true or reasonable." },
  { word: "responsibilities", audio: "words/responsibilities.mp3", hintEN: "More than one duty or task a person is expected to take care of." },
  { word: "extremity", audio: "words/extremity.mp3", hintEN: "The furthest point or edge of something, or an extreme level of something." },
  { word: "extremities", audio: "words/extremities.mp3", hintEN: "The furthest points of something, like hands and feet on a body." },
  { word: "facility", audio: "words/facility.mp3", hintEN: "A building or place built for a particular purpose, or ease in doing something." },
  { word: "facilities", audio: "words/facilities.mp3", hintEN: "More than one building or service provided for a particular purpose." },
  { word: "humanity", audio: "words/humanity.mp3", hintEN: "All people, considered as a group, or the quality of being kind." },
  { word: "humanities", audio: "words/humanities.mp3", hintEN: "School subjects that study people and culture, like history and language." },
  { word: "inhumanity", audio: "words/inhumanity.mp3", hintEN: "Cruel or unkind behavior toward other people." },
  { word: "utilities", audio: "words/utilities.mp3", hintEN: "Basic services like water, electricity, and gas, or tools that help with tasks." },
];

/* =========================================================
   SENTENCE BUZZ — FULL SENTENCES
   -----------------------------------------------------------
   Same "type what you hear" engine as Phase 1/2. Each sentence
   uses several of this week's words together, with commas
   between them. Comma placement is NOT graded (see
   stripCommas() in game.js) — only the spelling of each word
   counts, since this is a spelling exercise, not a punctuation
   one. hintEN gives a non-revealing paraphrase of the meaning.
   ========================================================= */
const SENTENCES = [
  { word: "Her personality, originality, and individuality impressed everyone.", audio: "sentences/personality-originality-individuality.mp3", hintEN: "People were impressed by how unique and like-herself she was.", properWords: [] },
  { word: "Their abilities, capability, and reliability increased their credibility.", audio: "sentences/abilities-capability-reliability.mp3", hintEN: "Being skilled, capable, and dependable made people trust them more.", properWords: [] },
  { word: "The hotel's hospitality, quality, and vitality attracted many guests.", audio: "sentences/hospitality-quality-vitality.mp3", hintEN: "Guests were drawn in by how welcoming, excellent, and lively the hotel felt.", properWords: [] },
  { word: "His mentality, morality, and punctuality earned him more responsibilities.", audio: "sentences/mentality-morality-punctuality.mp3", hintEN: "His mindset, sense of right and wrong, and being on time earned him more duties.", properWords: [] },
  { word: "We studied the probability, possibility, and plausibility of the plan.", audio: "sentences/probability-possibility-plausibility.mp3", hintEN: "We looked at how likely, possible, and believable the plan was.", properWords: [] },
  { word: "The causality, rationality, and actuality of the report were questioned.", audio: "sentences/causality-rationality-actuality.mp3", hintEN: "People doubted whether the report's cause-and-effect, logic, and facts were right.", properWords: [] },
  { word: "Her nationality, humanity, and strong personality made her memorable.", audio: "sentences/nationality-humanity-personality.mp3", hintEN: "People remembered her for her country, her kindness, and her strong character.", properWords: [] },
  { word: "The inequalities, inhumanity, and lack of morality concerned the community.", audio: "sentences/inequalities-inhumanity-morality.mp3", hintEN: "The community worried about the unfairness, cruelty, and wrongdoing they saw.", properWords: [] },
  { word: "The school's facilities, utilities, and overall quality were excellent.", audio: "sentences/facilities-utilities-quality.mp3", hintEN: "The school's buildings, basic services, and overall standard were all great.", properWords: [] },
  { word: "Despite the impossibility, his ability, originality, and vitality helped him succeed.", audio: "sentences/impossibility-ability-vitality.mp3", hintEN: "Even though it seemed like it couldn't be done, his skill, creativity, and energy helped him succeed.", properWords: [] },
];
