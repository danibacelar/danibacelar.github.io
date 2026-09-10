/* =========================================================
   SPELLING BEE — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs, split into
   two phases. Each entry:
     word:        the correct English spelling
     audio:       filename inside assets/audio/
     hintEN:      English clue shown after a wrong first try
     properWords: exact tokens from `word` whose capitalization
                  must match (proper nouns/names); every other
                  word is checked case-insensitively
   ========================================================= */
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "Portuguese", audio: "portuguese.mp3", hintEN: "The subject where you learn to read and write in Portuguese.", properWords: ["Portuguese"] },
      { word: "English", audio: "english.mp3", hintEN: "The subject where you learn to read and write in English.", properWords: ["English"] },
      { word: "Maths", audio: "maths.mp3", hintEN: "The subject where you learn numbers and calculations.", properWords: [] },
      { word: "Science", audio: "science.mp3", hintEN: "The subject where you learn about nature and how things work.", properWords: [] },
      { word: "Arts", audio: "arts.mp3", hintEN: "The subject where you draw, paint, and create things.", properWords: [] },
      { word: "Physical Education", audio: "physical-education.mp3", hintEN: "The subject where you play sports and exercise.", properWords: [] },
      { word: "alligator", audio: "alligator.mp3", hintEN: "A large reptile with a long snout and sharp teeth that lives near water.", properWords: [] },
      { word: "giraffe", audio: "giraffe.mp3", hintEN: "A tall African animal with a very long neck.", properWords: [] },
      { word: "hippo", audio: "hippo.mp3", hintEN: "A large, heavy animal that lives near rivers in Africa.", properWords: [] },
      { word: "iguana", audio: "iguana.mp3", hintEN: "A lizard with spikes along its back.", properWords: [] },
      { word: "leopard", audio: "leopard.mp3", hintEN: "A wild cat with spots on its fur.", properWords: [] },
      { word: "lion", audio: "lion.mp3", hintEN: "A big wild cat known as the king of the jungle.", properWords: [] },
      { word: "monkey", audio: "monkey.mp3", hintEN: "An animal that climbs trees and has a tail.", properWords: [] },
      { word: "panda", audio: "panda.mp3", hintEN: "A black and white bear that eats bamboo.", properWords: [] },
      { word: "snake", audio: "snake.mp3", hintEN: "A long reptile with no legs that slithers on the ground.", properWords: [] },
      { word: "head", audio: "head.mp3", hintEN: "The top part of your body, where your brain is.", properWords: [] },
      { word: "eye", audio: "eye.mp3", hintEN: "The body part you use to see.", properWords: [] },
      { word: "ear", audio: "ear.mp3", hintEN: "The body part you use to hear.", properWords: [] },
      { word: "small nose", audio: "small-nose.mp3", hintEN: "A tiny nose, not big.", properWords: [] },
      { word: "big mouth", audio: "big-mouth.mp3", hintEN: "A large mouth.", properWords: [] },
      { word: "tooth", audio: "tooth.mp3", hintEN: "A hard white part inside your mouth used for chewing.", properWords: [] },
      { word: "sharp teeth", audio: "sharp-teeth.mp3", hintEN: "Pointy teeth used for biting.", properWords: [] },
      { word: "long neck", audio: "long-neck.mp3", hintEN: "A neck that is very long, like a giraffe's.", properWords: [] },
      { word: "short leg", audio: "short-leg.mp3", hintEN: "A leg that is not long.", properWords: [] },
      { word: "tail", audio: "tail.mp3", hintEN: "The part at the back of an animal's body.", properWords: [] },
    ]
  },
  {
    name: "Phase 2",
    words: [
      { word: "tall", audio: "tall.mp3", hintEN: "Having a big height.", properWords: [] },
      { word: "Brazil", audio: "brazil.mp3", hintEN: "The country where you live, famous for its rainforest and carnival.", properWords: ["Brazil"] },
      { word: "Canada", audio: "canada.mp3", hintEN: "A large country in North America, north of the United States.", properWords: ["Canada"] },
      { word: "Italy", audio: "italy.mp3", hintEN: "A country in Europe shaped like a boot, famous for pizza and pasta.", properWords: ["Italy"] },
      { word: "Japan", audio: "japan.mp3", hintEN: "An island country in Asia, famous for sushi and anime.", properWords: ["Japan"] },
      { word: "Mexico", audio: "mexico.mp3", hintEN: "A country south of the United States, famous for tacos.", properWords: ["Mexico"] },
      { word: "The United Kingdom", audio: "the-united-kingdom.mp3", hintEN: "A country in Europe that includes England, Scotland, and Wales.", properWords: ["The", "United", "Kingdom"] },
      { word: "The United States", audio: "the-united-states.mp3", hintEN: "A large country in North America, north of Mexico.", properWords: ["The", "United", "States"] },
      { word: "computer", audio: "computer.mp3", hintEN: "A machine you use to work, play games, and go online.", properWords: [] },
      { word: "headphones", audio: "headphones.mp3", hintEN: "You wear them on your ears to listen to music.", properWords: [] },
      { word: "handbag", audio: "handbag.mp3", hintEN: "A small bag people carry, usually by hand or on the shoulder.", properWords: [] },
      { word: "trousers", audio: "trousers.mp3", hintEN: "Clothing you wear on your legs; also called pants.", properWords: [] },
      { word: "roller skates", audio: "roller-skates.mp3", hintEN: "Shoes with wheels used to skate.", properWords: [] },
      { word: "towel", audio: "towel.mp3", hintEN: "A cloth used to dry yourself after a bath.", properWords: [] },
      { word: "Mike's jacket", audio: "mikes-jacket.mp3", hintEN: "The jacket that belongs to Mike.", properWords: ["Mike's"] },
      { word: "Calvin's glasses", audio: "calvins-glasses.mp3", hintEN: "The glasses that belong to Calvin.", properWords: ["Calvin's"] },
      { word: "What have you got?", audio: "what-have-you-got.mp3", hintEN: "A question you ask when you want to know what someone is holding or owns.", properWords: [] },
      { word: "I've got stickers.", audio: "ive-got-stickers.mp3", hintEN: "An answer using 'have got' to say what you own.", properWords: [] },
      { word: "I love animals!", audio: "i-love-animals.mp3", hintEN: "An exclamation showing how much you enjoy animals.", properWords: [] },
      { word: "I like cats!", audio: "i-like-cats.mp3", hintEN: "An exclamation about enjoying a specific pet.", properWords: [] },
      { word: "I don't like monsters!", audio: "i-dont-like-monsters.mp3", hintEN: "A negative exclamation about something you don't enjoy.", properWords: [] },
      { word: "Where are you from?", audio: "where-are-you-from.mp3", hintEN: "A question asking about someone's home country.", properWords: [] },
      { word: "I'm from Brazil.", audio: "im-from-brazil.mp3", hintEN: "An answer saying where you are from, naming a country in South America.", properWords: ["Brazil"] },
      { word: "She's a teacher.", audio: "shes-a-teacher.mp3", hintEN: "A sentence describing someone's job, using 'she'.", properWords: [] },
      { word: "He's my friend.", audio: "hes-my-friend.mp3", hintEN: "A sentence describing a relationship, using 'he'.", properWords: [] },
    ]
  }
];

/* =========================================================
   CHALLENGE — LETTER SCRAMBLE
   -----------------------------------------------------------
   Single-word items mixed from both phases (no spaces, so the
   letters can be tapped into place one by one). Same fields as
   above, minus properWords (not needed — the child taps from a
   fixed set of letters, there is nothing to type).
   ========================================================= */
const CHALLENGE_WORDS = [
  { word: "Portuguese", audio: "portuguese.mp3", hintEN: "The subject where you learn to read and write in Portuguese." },
  { word: "English", audio: "english.mp3", hintEN: "The subject where you learn to read and write in English." },
  { word: "Maths", audio: "maths.mp3", hintEN: "The subject where you learn numbers and calculations." },
  { word: "Science", audio: "science.mp3", hintEN: "The subject where you learn about nature and how things work." },
  { word: "Arts", audio: "arts.mp3", hintEN: "The subject where you draw, paint, and create things." },
  { word: "alligator", audio: "alligator.mp3", hintEN: "A large reptile with a long snout and sharp teeth that lives near water." },
  { word: "giraffe", audio: "giraffe.mp3", hintEN: "A tall African animal with a very long neck." },
  { word: "hippo", audio: "hippo.mp3", hintEN: "A large, heavy animal that lives near rivers in Africa." },
  { word: "iguana", audio: "iguana.mp3", hintEN: "A lizard with spikes along its back." },
  { word: "leopard", audio: "leopard.mp3", hintEN: "A wild cat with spots on its fur." },
  { word: "lion", audio: "lion.mp3", hintEN: "A big wild cat known as the king of the jungle." },
  { word: "monkey", audio: "monkey.mp3", hintEN: "An animal that climbs trees and has a tail." },
  { word: "panda", audio: "panda.mp3", hintEN: "A black and white bear that eats bamboo." },
  { word: "snake", audio: "snake.mp3", hintEN: "A long reptile with no legs that slithers on the ground." },
  { word: "head", audio: "head.mp3", hintEN: "The top part of your body, where your brain is." },
  { word: "eye", audio: "eye.mp3", hintEN: "The body part you use to see." },
  { word: "ear", audio: "ear.mp3", hintEN: "The body part you use to hear." },
  { word: "tooth", audio: "tooth.mp3", hintEN: "A hard white part inside your mouth used for chewing." },
  { word: "tail", audio: "tail.mp3", hintEN: "The part at the back of an animal's body." },
  { word: "tall", audio: "tall.mp3", hintEN: "Having a big height." },
  { word: "Brazil", audio: "brazil.mp3", hintEN: "The country where you live, famous for its rainforest and carnival." },
  { word: "Canada", audio: "canada.mp3", hintEN: "A large country in North America, north of the United States." },
  { word: "Italy", audio: "italy.mp3", hintEN: "A country in Europe shaped like a boot, famous for pizza and pasta." },
  { word: "Japan", audio: "japan.mp3", hintEN: "An island country in Asia, famous for sushi and anime." },
  { word: "Mexico", audio: "mexico.mp3", hintEN: "A country south of the United States, famous for tacos." },
  { word: "computer", audio: "computer.mp3", hintEN: "A machine you use to work, play games, and go online." },
  { word: "headphones", audio: "headphones.mp3", hintEN: "You wear them on your ears to listen to music." },
  { word: "handbag", audio: "handbag.mp3", hintEN: "A small bag people carry, usually by hand or on the shoulder." },
  { word: "trousers", audio: "trousers.mp3", hintEN: "Clothing you wear on your legs; also called pants." },
  { word: "towel", audio: "towel.mp3", hintEN: "A cloth used to dry yourself after a bath." },
];
