/* =========================================================
   SPELLING BEE — VOCABULARY LIST
   -----------------------------------------------------------
   Real vocabulary + audio recorded with ElevenLabs.
   Each entry:
     word:   the correct English spelling
     hintPT: clue in Portuguese, always shown
     hintEN: clue in English, hidden behind a toggle (optional)
     audio:  filename inside assets/audio/
   ========================================================= */
const SPELLING_WORDS = [
  { word: "Portuguese", hintPT: "Língua Portuguesa (matéria escolar).", hintEN: "The subject where you learn to read and write in Portuguese.", audio: "portuguese.mp3" },
  { word: "English", hintPT: "Inglês (matéria escolar).", hintEN: "The subject where you learn to read and write in English.", audio: "english.mp3" },
  { word: "Maths", hintPT: "Matemática (matéria escolar).", hintEN: "The subject where you learn numbers and calculations.", audio: "maths.mp3" },
  { word: "Science", hintPT: "Ciências (matéria escolar).", hintEN: "The subject where you learn about nature and how things work.", audio: "science.mp3" },
  { word: "Arts", hintPT: "Artes (matéria escolar).", hintEN: "The subject where you draw, paint, and create things.", audio: "arts.mp3" },
  { word: "Physical Education", hintPT: "Educação Física (matéria escolar).", hintEN: "The subject where you play sports and exercise.", audio: "physical-education.mp3" },
  { word: "alligator", hintPT: "Jacaré.", hintEN: "A large reptile with a long snout and sharp teeth that lives near water.", audio: "alligator.mp3" },
  { word: "giraffe", hintPT: "Girafa.", hintEN: "A tall African animal with a very long neck.", audio: "giraffe.mp3" },
  { word: "hippo", hintPT: "Hipopótamo.", hintEN: "A large, heavy animal that lives near rivers in Africa.", audio: "hippo.mp3" },
  { word: "iguana", hintPT: "Iguana.", hintEN: "A lizard with spikes along its back.", audio: "iguana.mp3" },
  { word: "leopard", hintPT: "Leopardo.", hintEN: "A wild cat with spots on its fur.", audio: "leopard.mp3" },
  { word: "lion", hintPT: "Leão.", hintEN: "A big wild cat known as the king of the jungle.", audio: "lion.mp3" },
  { word: "monkey", hintPT: "Macaco.", hintEN: "An animal that climbs trees and has a tail.", audio: "monkey.mp3" },
  { word: "panda", hintPT: "Panda.", hintEN: "A black and white bear that eats bamboo.", audio: "panda.mp3" },
  { word: "snake", hintPT: "Cobra.", hintEN: "A long reptile with no legs that slithers on the ground.", audio: "snake.mp3" },
  { word: "head", hintPT: "Cabeça.", hintEN: "The top part of your body, where your brain is.", audio: "head.mp3" },
  { word: "eye", hintPT: "Olho.", hintEN: "The body part you use to see.", audio: "eye.mp3" },
  { word: "ear", hintPT: "Orelha.", hintEN: "The body part you use to hear.", audio: "ear.mp3" },
  { word: "small nose", hintPT: "Nariz pequeno.", hintEN: "A tiny nose, not big.", audio: "small-nose.mp3" },
  { word: "big mouth", hintPT: "Boca grande.", hintEN: "A large mouth.", audio: "big-mouth.mp3" },
  { word: "tooth", hintPT: "Dente.", hintEN: "A hard white part inside your mouth used for chewing.", audio: "tooth.mp3" },
  { word: "sharp teeth", hintPT: "Dentes afiados.", hintEN: "Pointy teeth used for biting.", audio: "sharp-teeth.mp3" },
  { word: "long neck", hintPT: "Pescoço longo.", hintEN: "A neck that is very long, like a giraffe's.", audio: "long-neck.mp3" },
  { word: "short leg", hintPT: "Perna curta.", hintEN: "A leg that is not long.", audio: "short-leg.mp3" },
  { word: "tail", hintPT: "Rabo, cauda.", hintEN: "The part at the back of an animal's body.", audio: "tail.mp3" },
  { word: "tall", hintPT: "Alto(a).", hintEN: "Having a big height.", audio: "tall.mp3" },
  { word: "Brazil", hintPT: "Brasil.", hintEN: "The country where you live, famous for its rainforest and carnival.", audio: "brazil.mp3" },
  { word: "Canada", hintPT: "Canadá.", hintEN: "A large country in North America, north of the United States.", audio: "canada.mp3" },
  { word: "Italy", hintPT: "Itália.", hintEN: "A country in Europe shaped like a boot, famous for pizza and pasta.", audio: "italy.mp3" },
  { word: "Japan", hintPT: "Japão.", hintEN: "An island country in Asia, famous for sushi and anime.", audio: "japan.mp3" },
  { word: "Mexico", hintPT: "México.", hintEN: "A country south of the United States, famous for tacos.", audio: "mexico.mp3" },
  { word: "The United Kingdom", hintPT: "O Reino Unido.", hintEN: "A country in Europe that includes England, Scotland, and Wales.", audio: "the-united-kingdom.mp3" },
  { word: "The United States", hintPT: "Os Estados Unidos.", hintEN: "A large country in North America, north of Mexico.", audio: "the-united-states.mp3" },
  { word: "computer", hintPT: "Computador.", hintEN: "A machine you use to work, play games, and go online.", audio: "computer.mp3" },
  { word: "headphones", hintPT: "Fones de ouvido.", hintEN: "You wear them on your ears to listen to music.", audio: "headphones.mp3" },
  { word: "handbag", hintPT: "Bolsa.", hintEN: "A small bag people carry, usually by hand or on the shoulder.", audio: "handbag.mp3" },
  { word: "trousers", hintPT: "Calça.", hintEN: "Clothing you wear on your legs; also called pants.", audio: "trousers.mp3" },
  { word: "roller skates", hintPT: "Patins.", hintEN: "Shoes with wheels used to skate.", audio: "roller-skates.mp3" },
  { word: "towel", hintPT: "Toalha.", hintEN: "A cloth used to dry yourself after a bath.", audio: "towel.mp3" },
  { word: "Mike's jacket", hintPT: "A jaqueta do Mike.", hintEN: "The jacket that belongs to Mike.", audio: "mikes-jacket.mp3" },
  { word: "Calvin's glasses", hintPT: "Os óculos do Calvin.", hintEN: "The glasses that belong to Calvin.", audio: "calvins-glasses.mp3" },
  { word: "What have you got?", hintPT: "O que você tem?", hintEN: "", audio: "what-have-you-got.mp3" },
  { word: "I've got stickers.", hintPT: "Eu tenho adesivos.", hintEN: "", audio: "ive-got-stickers.mp3" },
  { word: "I love animals!", hintPT: "Eu amo animais!", hintEN: "", audio: "i-love-animals.mp3" },
  { word: "I like cats!", hintPT: "Eu gosto de gatos!", hintEN: "", audio: "i-like-cats.mp3" },
  { word: "I don't like monsters!", hintPT: "Eu não gosto de monstros!", hintEN: "", audio: "i-dont-like-monsters.mp3" },
  { word: "Where are you from?", hintPT: "De onde você é?", hintEN: "", audio: "where-are-you-from.mp3" },
  { word: "I'm from Brazil.", hintPT: "Eu sou do Brasil.", hintEN: "", audio: "im-from-brazil.mp3" },
  { word: "She's a teacher.", hintPT: "Ela é professora.", hintEN: "", audio: "shes-a-teacher.mp3" },
  { word: "He's my friend.", hintPT: "Ele é meu amigo.", hintEN: "", audio: "hes-my-friend.mp3" },
];
