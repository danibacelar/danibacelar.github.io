/* MISSION STARLIGHT: Cadet Training — all lesson content (English only) */
(function (root) {
  'use strict';

  var H = {
    bgt: "Hint: be going to = am / is / are + going to + verb.  I → am · he / she / it → is · you / we / they → are.",
    neg: "Hint: Negative = am / is / are + NOT + going to + verb. (isn't · aren't · I'm not)",
    q: "Hint: For a question, put am / is / are BEFORE the subject: Are you going to …?",
    short: "Hint: Short answer = Yes / No + subject + am / is / are. Do not repeat “going to”! (Yes, I am. · No, she isn't.)",
    full: "Hint: A full answer says the whole idea: Yes, I am going to …",
    will: "Hint: Change WILL → am / is / are + going to + verb.",
    pred: "Hint: PLAN = you decided before. PREDICTION = you see a sign right now.",
    and: "Hint: AND adds a similar idea. BUT shows a different or opposite idea.",
    comma: "Remember the comma before and / but when you join two full sentences.",
    order: "Hint: Start with the subject. Remember: subject + am / is / are + going to + verb."
  };

  var PASSAGES = {
    journal: {
      title: "Captain Nova's Journal",
      s: [
        "Today I am looking at Earth from my spaceship.",
        "Earth is a blue sphere in the dark sky.",
        "It is one of eight planets that travel around the sun.",
        "Earth rotates, so we have day and night.",
        "On the moon, I can see many big craters.",
        "Billions of stars are shining, but I can only name a few."
      ]
    },
    soup: {
      title: "Grandma's Soup",
      s: [
        "Grandma has a traditional recipe for rice soup.",
        "The soup consists of rice, carrots, and a little salt.",
        "Every Sunday, our family makes it together.",
        "Mom assigns a job to each person.",
        "I wash the rice, and my brother cuts the carrots."
      ]
    },
    mia: {
      title: "Mia's Saturday",
      s: [
        "Mia has a big plan for Saturday.",
        "In the morning, she is going to bake a cake with her mom.",
        "In the afternoon, she and her friends are going to watch a movie.",
        "Mia has two tickets, but her friend Ana isn't going to come because she is sick.",
        "Now Mia looks at the sky.",
        "The clouds are dark.",
        "It is going to rain!"
      ]
    },
    moon: {
      title: "The Moon Mystery",
      s: [
        "Long ago, people looked at the moon, and they saw a face.",
        "Some people said the moon was a lady, but others said it was a rabbit.",
        "Today, scientists know that the moon is made of rock, and it has many craters.",
        "The moon looks small in the sky, but it is very big."
      ]
    },
    leo: {
      title: "Leo's Message (script)",
      s: [
        "Hi Cadet.",
        "My name is Leo.",
        "Tomorrow is Saturday, and I'm going to visit my grandfather.",
        "He lives near a river.",
        "We are going to take a canoe, but my sister isn't going to come.",
        "She is going to study for a test.",
        "Our family has a traditional dinner on Saturdays, and my grandfather always cooks.",
        "In the evening, we are going to look at the stars.",
        "Maybe we are going to see a rainbow or a beautiful phenomenon in the sky, but I think it is going to be cloudy."
      ]
    }
  };

  /* ---------- helpers to keep the data short ---------- */
  function ch(prompt, options, answer, o) {
    return Object.assign({ type: 'choice', prompt: prompt, options: options, answer: answer }, o || {});
  }
  function tf(prompt, isTrue, o) {
    return ch(prompt, ['True', 'False'], isTrue ? 0 : 1, Object.assign({ keepOrder: true, tag: 'True or False?' }, o || {}));
  }
  function rq(pid, prompt, options, answer, ev, hint, o) {
    return ch(prompt, options, answer, Object.assign({ passage: pid, ev: ev, hint: hint, tag: 'Reading check' }, o || {}));
  }
  function ty(o) { return Object.assign({ type: 'type' }, o); }
  function op(o) { return Object.assign({ type: 'open' }, o); }
  function ord(o) { return Object.assign({ type: 'order', tag: 'Unscramble the sentence', hint: H.order }, o); }

  var R1 = ['sphere', 'craters', 'billions', 'planets', 'rotates', 'continents'];
  var R2 = ['bark', 'rainbow', 'canoe', 'handprints'];
  var ACAD = ['assign', 'consist of', 'phenomenon', 'traditional'];

  var WORDS = [
    ['sphere', 'w01'], ['craters', 'w02'], ['billions', 'w03'], ['planets', 'w04'], ['rotates', 'w05'],
    ['continents', 'w06'], ['bark', 'w07'], ['rainbow', 'w08'], ['canoe', 'w09'], ['handprints', 'w10'],
    ['phenomenon', 'w11'], ['traditional', 'w12'], ['assign', 'w13'], ['consist of', 'w14']
  ];

  var LEVELS = [
    /* ---------------------------------------------------------------- 0 BRIEFING */
    {
      id: 'briefing', icon: '📡', name: 'Briefing', sub: 'Mission message', mins: 5,
      intro: "Welcome aboard, Space Cadet! Press play to hear your mission.", mascot: 1,
      items: [
        { type: 'card', tag: 'Incoming message', title: 'Captain Nova is calling…', mascot: 1,
          body: '<p>Press <b>▶ Play</b> and listen carefully.<br>Then answer <b>3 questions</b>. You can listen again!</p>',
          audio: 'audio/a1.mp3', cta: "I listened! Next →" },
        ch('Who is talking?', ['Captain Nova', 'Leo', 'Mia'], 0, { tag: 'Listen and choose', audio: 'audio/a1.mp3', hint: "Listen again: “I am …”", model: "Captain Nova is talking." }),
        ch('What are you going to learn today?',
          ['New words about space and nature', 'New words about food and animals', 'New words about school and sports'], 0,
          { tag: 'Listen and choose', audio: 'audio/a1.mp3', hint: "Listen again: “You are going to learn new words about …”", model: "You are going to learn new words about space and nature." }),
        ch('Which grammar are you going to practice?',
          ['The future with be going to', 'The past with was / were', 'The present with am / is / are'], 0,
          { tag: 'Listen and choose', audio: 'audio/a1.mp3', hint: "Listen again: “the future with …”", model: "You are going to practice the future with be going to — and sentences with and / but." })
      ]
    },

    /* ---------------------------------------------------------------- 1 LAUNCH PAD */
    {
      id: 'launch', icon: '🛰️', name: 'Level 1 · Launch Pad', sub: 'Key Words', mins: 10,
      intro: "Level 1! Let's learn the key words of space and nature. Listen, match and spell!", mascot: 3,
      items: [
        { type: 'wordcheck', tag: 'Word Check', title: 'Listen and repeat', words: WORDS.slice(0, 10) },
        { type: 'match', tag: 'Match', xp: 20,
          prompt: 'Match each picture with its word. Tap a picture, then tap a word.',
          pairs: [
            { img: 'img/g1_1.jpg', word: 'sphere', audio: 'audio/w01.mp3' },
            { img: 'img/g1_2.jpg', word: 'craters', audio: 'audio/w02.mp3' },
            { img: 'img/g1_3.jpg', word: 'billions', audio: 'audio/w03.mp3' },
            { img: 'img/g1_4.jpg', word: 'planets', audio: 'audio/w04.mp3' },
            { img: 'img/g1_5.jpg', word: 'rotates', audio: 'audio/w05.mp3' },
            { img: 'img/g1_6.jpg', word: 'continents', audio: 'audio/w06.mp3' }
          ] },
        { type: 'match', tag: 'Match', xp: 15,
          prompt: 'Now match the nature words!',
          pairs: [
            { img: 'img/g2_1.jpg', word: 'bark', audio: 'audio/w07.mp3' },
            { img: 'img/g2_2.jpg', word: 'rainbow', audio: 'audio/w08.mp3' },
            { img: 'img/g2_3.jpg', word: 'canoe', audio: 'audio/w09.mp3' },
            { img: 'img/g2_4.jpg', word: 'handprints', audio: 'audio/w10.mp3' }
          ] },
        ch('Listen. Which picture is it?',
          [{ img: 'img/g1_1.jpg' }, { img: 'img/g1_4.jpg' }, { img: 'img/g1_6.jpg' }], 1,
          { tag: 'Listen and choose', audio: 'audio/w04.mp3', hint: "Listen again. Eight of them travel around the sun!", model: "planets" }),
        ch('The Earth ___ once every 24 hours, so we have day and night.', R1, 4,
          { tag: 'Complete the sentence', bank: true, hint: "Hint: rotates = turns around and around. Earth turns once a day!", model: "The Earth rotates once every 24 hours, so we have day and night." }),
        ch('There are ___ of grains of sand on a beach.', R1, 2,
          { tag: 'Complete the sentence', bank: true, hint: "Hint: billions = a VERY, VERY big number. Think about the sand!", model: "There are billions of grains of sand on a beach." }),
        ch('We are going to paddle the ___ down the river.', R2, 2,
          { tag: 'Complete the sentence', bank: true, hint: "Hint: A canoe is a small, narrow boat. You use a paddle!", model: "We are going to paddle the canoe down the river." }),
        ch('The children made colorful ___ on the wall with paint.', R2, 3,
          { tag: 'Complete the sentence', bank: true, hint: "Hint: Handprints are the marks of your hands.", model: "The children made colorful handprints on the wall with paint." }),
        { type: 'letters', tag: 'Unscramble the letters', word: 'continents', img: 'img/g1_6.jpg',
          prompt: 'Put the letters in order. (Asia, Africa, Europe… there are seven of them!)',
          hint: "Hint: It starts with C and ends with S. They are the big pieces of land." },
        rq('journal', 'Where is Captain Nova?', ['On a spaceship', 'At school', 'On the beach'], 0, 1,
          "Hint: Read sentence 1 again. Look for the place."),
        tf('Earth is the only planet in the solar system.', false,
          { passage: 'journal', ev: 3, hint: "Hint: Read sentence 3. How many planets are there?", tag: 'Reading check' }),
        rq('journal', 'What does “rotates” mean in sentence 4?', ['turns around', 'falls down', 'gets bigger'], 0, 4,
          "Hint: Think about Earth. It turns around and around — and we have day and night.")
      ]
    },

    /* ---------------------------------------------------------------- 2 MISSION CONTROL */
    {
      id: 'control', icon: '🧭', name: 'Level 2 · Mission Control', sub: 'Academic Words', mins: 7,
      intro: "Level 2! Four powerful words: assign, consist of, phenomenon and traditional.", mascot: 2,
      items: [
        { type: 'card', tag: 'New words', title: 'Academic Words', mascot: 3, cta: "I understand! Next →",
          html: '<div class="aw">' +
            '<div class="aw-item"><b>assign</b><span>give a duty or task</span><em>Teachers often assign homework.</em></div>' +
            '<div class="aw-item"><b>consist of</b><span>be made up of</span><em>A story consists of plot, characters and setting.</em></div>' +
            '<div class="aw-item"><img src="img/g2_5.jpg" alt=""><b>phenomenon</b><span>something we can observe or see</span><em>A double rainbow is uncommon.</em></div>' +
            '<div class="aw-item"><img src="img/g2_6.jpg" alt=""><b>traditional</b><span>following ideas or methods that have existed for a long time</span><em>A hanbok is a traditional Korean dress.</em></div>' +
            '</div>' },
        ch('My teacher is going to ___ a new project to our class.', ACAD, 0,
          { tag: 'Choose the word', bank: true, hint: "Hint: assign = give a task or a duty.", model: "My teacher is going to assign a new project to our class." }),
        ch('Our soccer team ___ eleven players.', ['assign', 'consists of', 'phenomenon', 'traditional'], 1,
          { tag: 'Choose the word', bank: true, hint: "Hint: consist of = be made up of. The team is made up of eleven players.", model: "Our soccer team consists of eleven players." }),
        ch('Look at the northern lights! It is a beautiful natural ___ .', ACAD, 2,
          { tag: 'Choose the word', bank: true, img: 'img/g2_5.jpg', hint: "Hint: A phenomenon is something we can see or observe in nature.", model: "Look at the northern lights! It is a beautiful natural phenomenon." }),
        ch('She is wearing a hanbok. It is a ___ Korean dress.', ACAD, 3,
          { tag: 'Choose the word', bank: true, img: 'img/g2_6.jpg', hint: "Hint: traditional = from a long time ago and still used today.", model: "She is wearing a hanbok. It is a traditional Korean dress." }),
        ch('The Moon ___ rock and dust.', ['consists of', 'consist of', 'consisting of'], 0,
          { tag: 'Complete the sentence', bank: true, hint: "Hint: The Moon = ONE thing (singular) → consists of.", model: "The Moon consists of rock and dust." }),
        ord({ words: ['My', 'family', 'has', 'a', 'traditional', 'dinner', 'on', 'Sundays'], end: '.',
          answer: 'My family has a traditional dinner on Sundays', model: "My family has a traditional dinner on Sundays.",
          hint: "Hint: Start with “My family …”. The word traditional comes before “dinner”." }),
        rq('soup', 'What does the soup consist of?',
          ['Rice, carrots, and a little salt', 'Rice, beans, and sugar', 'Water, milk, and salt'], 0, 2,
          "Hint: Look at sentence 2. “consists of” tells you what is inside the soup."),
        rq('soup', 'Who assigns a job to each person?', ['Grandma', 'Mom', 'My brother'], 1, 4,
          "Hint: assign = give a job. Read sentence 4."),
        rq('soup', 'What does “traditional” mean in sentence 1?',
          ['Old and used for a long time', 'New and modern', 'Very expensive'], 0, 1,
          "Hint: Grandma's recipe is old. Families keep traditional recipes for many years.")
      ]
    },

    /* ---------------------------------------------------------------- 3 FUTURE GALAXY */
    {
      id: 'future', icon: '🌌', name: 'Level 3 · Future Galaxy', sub: 'be going to · will', mins: 25,
      intro: "Level 3: the big one! Plans and predictions with be going to — and the difference between going to and will. Let's go!", mascot: 1,
      items: [
        { type: 'card', tag: 'Captain Nova’s Rules', title: 'be going to', mascot: 3, cta: "Ready! Let's practice →",
          html: '<div class="rule">' +
            '<div class="rule-two"><div class="rb plan"><h4>PLAN</h4><small>you decided before</small><p>I\'m going to watch a movie on Saturday.</p></div>' +
            '<div class="rb pred"><h4>PREDICTION</h4><small>you see a sign now</small><p>Look at the dark clouds! It\'s going to rain.</p></div></div>' +
            '<table class="rt">' +
            '<tr><th>＋</th><td>I <b>am</b> going to study. · He / She / It <b>is</b> going to rain. · You / We / They <b>are</b> going to watch.</td></tr>' +
            '<tr><th>－</th><td>I am <b>not</b> going to study. · She is<b>n\'t</b> going to go. · They are<b>n\'t</b> going to practice.</td></tr>' +
            '<tr><th>？</th><td><b>Are</b> you going to walk home? · <b>Is</b> she going to bake a cake?</td></tr>' +
            '<tr><th>✔</th><td>Yes, I <b>am</b>. · No, I\'m not. · Yes, she <b>is</b>. · No, she isn\'t. · Yes, they <b>are</b>. · No, they aren\'t.</td></tr>' +
            '<tr><th>↻</th><td>I <b>will</b> climb to the moon. → I <b>am going to</b> climb to the moon.</td></tr>' +
            '</table></div>' },
        ch('Listen. Which sentence did you hear?',
          ["She isn't going to go to school tomorrow.", "She is going to go to school tomorrow.", "She isn't going to go to school today."], 0,
          { tag: 'Listen and choose', audio: 'audio/l4.mp3', hint: "Listen again. Is it negative (isn't)? And is it tomorrow or today?", model: "She isn't going to go to school tomorrow because she is sick." }),
        ch('Listen. Which question did you hear?',
          ["What are you going to be when you grow up?", "What are you going to do when you grow up?", "What is he going to be when he grows up?"], 0,
          { tag: 'Listen and choose', audio: 'audio/l8.mp3', hint: "Listen again: Who? (you / he) and what? (be / do)", model: "What are you going to be when you grow up?" }),
        ch('We ___ a video about Earth today.  (watch)', ['are going to watch', 'is going to watch', 'are going to watching'], 0,
          { tag: 'be going to + verb', bank: true, hint: H.bgt, model: "We are going to watch a video about Earth today." }),
        ch("She didn't study. She ___ an A on the test.  (not get)", ['is not going to get', 'are not going to get', 'is not going get'], 0,
          { tag: 'be going to + verb', bank: true, hint: H.neg, model: "She didn't study. She isn't going to get an A on the test." }),
        ch("They're tired. They ___ after school.  (not practice)", ['are not going to practice', 'is not going to practice', 'are going to not practice'], 0,
          { tag: 'be going to + verb', bank: true, hint: H.neg, model: "They're tired. They aren't going to practice after school." }),
        ch('Look at the dark clouds! It ___ .  (rain)', ['is going to rain', 'are going to rain', 'is going to raining'], 0,
          { tag: 'be going to + verb', bank: true, img: 'img/g3_1.jpg', hint: H.bgt, model: "Look at the dark clouds! It is going to rain." }),
        ch('Look! The boy has too many boxes. “Watch out! He is going to drop the boxes.” Is it a plan or a prediction?',
          ['A plan', 'A prediction'], 1,
          { tag: 'Plan or prediction?', img: 'img/g3_4.jpg', keepOrder: true, hint: H.pred, model: "A prediction — you can see a sign: the boxes are falling!" }),
        ch('“I bought two tickets yesterday. I\'m going to watch a movie on Saturday.” Is it a plan or a prediction?',
          ['A plan', 'A prediction'], 0,
          { tag: 'Plan or prediction?', img: 'img/g3_2.jpg', keepOrder: true, hint: H.pred, model: "A plan — she decided before (she already has the tickets)." }),
        { type: 'card', tag: 'Captain Nova’s Rules', title: 'going to  or  will?', mascot: 3, cta: "Got it! Let's practice →",
          html: '<div class="rule"><div class="rule-two">' +
            '<div class="rb plan"><h4>be going to</h4><small>a PLAN · a SIGN you can see</small>' +
            '<p class="rp">🗓 I bought tickets. I\'m <b>going to</b> watch a movie.</p>' +
            '<p class="rp">👀 Look at the dark clouds! It\'s <b>going to</b> rain.</p></div>' +
            '<div class="rb pred"><h4>will</h4><small>decide NOW · promise / offer · “I think…”</small>' +
            '<p class="rp">⚡ The phone is ringing. I<b>\'ll</b> answer it!</p>' +
            '<p class="rp">🤝 Don\'t worry. I <b>will</b> help you.</p>' +
            '<p class="rp">💭 I think it <b>will</b> be sunny tomorrow.</p></div></div>' +
            '<p class="tip">💡 Ask yourself: Did I decide BEFORE? Can I SEE a sign? → <b>be going to</b>.<br>Am I deciding RIGHT NOW, promising, or just thinking? → <b>will</b>.</p>' +
            '<table class="rt">' +
            '<tr><th>＋</th><td>I <b>will</b> help. (I<b>\'ll</b> help.) · She <b>will</b> go. — will + BASE verb (no “to”, no -s)</td></tr>' +
            '<tr><th>－</th><td>She will <b>not</b> go. = She <b>won\'t</b> go.</td></tr>' +
            '<tr><th>？</th><td><b>Will</b> you help me?</td></tr>' +
            '<tr><th>✔</th><td>Yes, I <b>will</b>. · No, I <b>won\'t</b>.</td></tr>' +
            '</table></div>' },
        { type: 'sort', tag: 'Sort it!', xp: 20,
          prompt: 'Which one do we use? Tap a sentence, then tap the correct box.',
          cols: [{ name: 'be going to', sub: 'plan · sign' }, { name: 'will', sub: 'now · promise · I think' }],
          cards: [
            { t: "I'm going to visit my cousin. We planned it last week.", c: 0 },
            { t: "Look at those dark clouds! It's going to rain.", c: 0 },
            { t: "The doorbell is ringing. I'll open the door!", c: 1 },
            { t: "Don't worry. I'll help you with your homework.", c: 1 },
            { t: "We have plane tickets. We're going to travel in July.", c: 0 },
            { t: "I think she will win the game.", c: 1 }
          ],
          hint: "Hint: PLAN (decided before) or SIGN you can see → be going to.  Decision NOW, promise / offer, or “I think” → will." },
        ch('I bought two tickets yesterday. I ___ watch a movie on Saturday.', ['am going to', 'will'], 0,
          { tag: 'will or be going to?', bank: true, keepOrder: true, hint: "Hint: You decided BEFORE (you bought the tickets) → be going to.", model: "I bought two tickets yesterday. I am going to watch a movie on Saturday." }),
        ch('The phone is ringing! I ___ answer it.', ['am going to', 'will'], 1,
          { tag: 'will or be going to?', bank: true, keepOrder: true, hint: "Hint: You decide RIGHT NOW, at the moment you speak → will.", model: "The phone is ringing! I will answer it." }),
        ch('Look at the dark clouds! It ___ rain.', ['is going to', 'will'], 0,
          { tag: 'will or be going to?', bank: true, keepOrder: true, img: 'img/g3_1.jpg', hint: "Hint: You can SEE a sign (dark clouds) → be going to.", model: "Look at the dark clouds! It is going to rain." }),
        ch('“It\'s cold in here.”  “OK, I ___ close the window.”', ['am going to', 'will'], 1,
          { tag: 'will or be going to?', bank: true, keepOrder: true, hint: "Hint: A decision at the moment of speaking (and an offer to help) → will.", model: "“OK, I will close the window.”" }),
        ch('We have plane tickets for July. We ___ travel to Rio.', ['are going to', 'will'], 0,
          { tag: 'will or be going to?', bank: true, keepOrder: true, hint: "Hint: They already have tickets → a PLAN → be going to.", model: "We have plane tickets for July. We are going to travel to Rio." }),
        ch('I think she ___ win the game.', ['is going to', 'will'], 1,
          { tag: 'will or be going to?', bank: true, keepOrder: true, hint: "Hint: “I think…” = an opinion, no sign you can see → will.", model: "I think she will win the game." }),
        ch('Mia bought a ticket yesterday. She ___ tomorrow.  (travel)', ['is going to travel', 'will travel', 'are going to travel'], 0,
          { tag: 'will or be going to?', bank: true, hint: "Hint: Mia bought the ticket yesterday → a PLAN → is going to + verb.", model: "Mia bought a ticket yesterday. She is going to travel tomorrow." }),
        ch("“I forgot my pencil!”  “Don't worry, I ___ you one!”  (lend)", ['will lend', 'am going to lend', 'will to lend'], 0,
          { tag: 'will or be going to?', bank: true, hint: "Hint: An offer, decided right now → will + verb.", model: "“Don't worry, I will lend you one!”" }),
        ch('Look at the boy with the boxes! He ___ them.  (drop)', ['is going to drop', 'will drop', 'are going to drop'], 0,
          { tag: 'will or be going to?', bank: true, img: 'img/g3_4.jpg', hint: "Hint: A sign you can see (the boxes are falling) → is going to + verb.", model: "Look at the boy with the boxes! He is going to drop them." }),
        ch("“I'm hungry.”  “I ___ you a sandwich.”  (make)", ['will make', 'am going to make', 'will making'], 0,
          { tag: 'will or be going to?', bank: true, hint: "Hint: A decision / offer right now → will + verb.", model: "“I will make you a sandwich.”" }),
        ch('He is sick! Make the sentence NEGATIVE:  “He is going to go to school tomorrow.”',
          ["He isn't going to go to school tomorrow.", "He doesn't going to go to school tomorrow.", "He not going to go to school tomorrow."], 0,
          { tag: 'Make it negative', img: 'img/g3_3.jpg', hint: H.neg, model: "He isn't going to go to school tomorrow." }),
        ord({ tag: 'Make it negative', prompt: 'Make the sentence NEGATIVE. Put the words in order.', given: 'I am going to study tonight.',
          words: ['I', 'am', 'not', 'going', 'to', 'study', 'tonight'], end: '.', answer: 'I am not going to study tonight',
          hint: "Hint: I am NOT going to … (we say I'm not, never “I amn't”).", model: "I am not going to study tonight." }),
        ord({ tag: 'Make a question', prompt: 'Make a QUESTION. Put the words in order.', given: 'You are going to walk home.',
          words: ['Are', 'you', 'going', 'to', 'walk', 'home'], end: '?', answer: 'Are you going to walk home',
          hint: H.q, model: "Are you going to walk home?" }),
        ch('Make a QUESTION:  “She is going to bake a cake.”',
          ['Is she going to bake a cake?', 'Does she going to bake a cake?', 'She is going to bake a cake?'], 0,
          { tag: 'Make a question', img: 'img/g3_5.jpg', hint: H.q, model: "Is she going to bake a cake?" }),
        ord({ words: ['We', 'are', 'going', 'to', 'visit', 'our', 'grandparents', 'on', 'Sunday'], end: '.',
          answer: 'We are going to visit our grandparents on Sunday', model: "We are going to visit our grandparents on Sunday." }),
        ord({ words: ['She', "isn't", 'going', 'to', 'go', 'to', 'school', 'tomorrow'], end: '.',
          answer: "She isn't going to go to school tomorrow", model: "She isn't going to go to school tomorrow." }),
        ord({ words: ['What', 'are', 'you', 'going', 'to', 'be', 'when', 'you', 'grow up'], end: '?',
          answer: 'What are you going to be when you grow up', model: "What are you going to be when you grow up?",
          hint: "Hint: Question words (What) go first, then are + you + going to + verb." }),
        ch('“Are you going to walk home?”  Choose the correct SHORT answer (Yes!).',
          ['Yes, I am.', "Yes, I'm.", 'Yes, I am going.', 'Yes, I do.'], 0,
          { tag: 'Short answer', hint: H.short, model: "Yes, I am." }),
        ch('Look at the picture. “Is he going to go to school tomorrow?”  Choose the SHORT answer (No!).',
          ["No, he isn't.", "No, he doesn't.", "No, he isn't going.", 'No, he not.'], 0,
          { tag: 'Short answer', img: 'img/g3_3.jpg', hint: H.short, model: "No, he isn't." }),
        ch('“Are you going to be home this weekend?”  Choose the FULL answer (Yes!).',
          ['Yes, I am going to be home this weekend.', 'Yes, I am.', 'Yes, I going to be home this weekend.', 'Yes, I will going to be home this weekend.'], 0,
          { tag: 'Full answer', hint: H.full, model: "Yes, I am going to be home this weekend." }),
        ord({ tag: 'Rewrite', prompt: 'Rewrite the sentence with be going to. Put the words in order.', given: 'They will not play soccer today.',
          words: ['They', 'are', 'not', 'going', 'to', 'play', 'soccer', 'today'], end: '.', answer: 'They are not going to play soccer today',
          hint: H.will + " Negative: are not / aren't.", model: "They are not going to play soccer today. (= They aren't going to play soccer today.)" }),
        { type: 'card', tag: 'Practice: will', title: 'Now the forms of will', mascot: 3, cta: "Let's go →",
          html: '<div class="rule"><table class="rt">' +
            '<tr><th>＋</th><td>I <b>will</b> help you. · She <b>will</b> go. · will + <b>base verb</b></td></tr>' +
            '<tr><th>－</th><td>She will <b>not</b> go. = She <b>won\'t</b> go.</td></tr>' +
            '<tr><th>？</th><td><b>Will</b> you help me?</td></tr>' +
            '<tr><th>✔</th><td>Yes, I <b>will</b>. · No, it <b>won\'t</b>.</td></tr></table>' +
            '<p class="tip">⚠️ Not: She will to go · She wills go · She will going.</p></div>' },
        ch('Choose the correct sentence.', ['She will go to school.', 'She will to go to school.', 'She wills go to school.'], 0,
          { tag: 'Correct form: will', hint: "Hint: will + BASE verb. No “to” and no -s!", model: "She will go to school." }),
        ch('Choose the correct sentence.', ['We are going to eat pizza.', 'We will going to eat pizza.', 'We going to eat pizza.'], 0,
          { tag: 'Correct form: be going to', hint: "Hint: be going to = am / is / are + going to + verb. Do not mix it with will!", model: "We are going to eat pizza." }),
        ch('The sky is very dark — there is a SIGN. Which sentence is the best?',
          ['It is going to rain.', 'It will rain.', 'It is going to rains.'], 0,
          { tag: 'Fix the mistake', hint: "Hint: There is a SIGN (dark sky) → it is going to rain.", model: "The sky is very dark. It is going to rain." }),
        ord({ tag: 'Rewrite', prompt: 'It is a PLAN (decided last week). Rewrite with be going to. Put the words in order.', given: 'I will visit my grandparents on Saturday.',
          words: ['I', 'am', 'going', 'to', 'visit', 'my', 'grandparents', 'on', 'Saturday'], end: '.', answer: 'I am going to visit my grandparents on Saturday',
          hint: H.will, model: "I am going to visit my grandparents on Saturday." }),
        ch('Make it NEGATIVE:  “She will go to the party.”',
          ["She won't go to the party.", "She doesn't will go to the party.", "She won't goes to the party."], 0,
          { tag: 'Make it negative', hint: "Hint: will + not = won't.  She won't go …", model: "She won't go to the party." }),
        ord({ tag: 'Make a question', prompt: 'Make a QUESTION. Put the words in order.', given: 'You will help me.',
          words: ['Will', 'you', 'help', 'me'], end: '?', answer: 'Will you help me',
          hint: "Hint: Put WILL before the subject: Will you …?", model: "Will you help me?" }),
        ch('“Will you help me?”  Choose the SHORT answer (Yes!).', ['Yes, I will.', 'Yes, I do.', 'Yes, I am.', 'Yes, I willing.'], 0,
          { tag: 'Short answer', hint: "Hint: Yes, I will.  /  No, I won't.  Do not repeat the verb!", model: "Yes, I will." }),
        ch('“Will it rain tomorrow?”  Choose the SHORT answer (No!).', ["No, it won't.", "No, it doesn't.", "No, it isn't.", 'No, it not will.'], 0,
          { tag: 'Short answer', hint: "Hint: No, it won't.  (won't = will not)", model: "No, it won't." }),
        ord({ words: ['I', 'will', 'help', 'you', 'with', 'your', 'homework'], end: '.',
          answer: 'I will help you with your homework', model: "I will help you with your homework.",
          hint: "Hint: subject + will + base verb + the rest." }),
        rq('mia', 'What is Mia going to do in the morning?',
          ['Bake a cake with her mom', 'Watch a movie', 'Go to the beach'], 0, 2,
          "Hint: “In the morning” is in sentence 2."),
        rq('mia', "Why isn't Ana going to come?",
          ['She is sick.', 'She is going to study.', "She doesn't like movies."], 0, 4,
          "Hint: Read sentence 4. Look after the word “because”."),
        rq('mia', 'Which sentence is a PREDICTION (there is a sign now)?',
          ['Mia is going to bake a cake.', 'It is going to rain.', 'Mia has two tickets.'], 1, 7,
          "Hint: What sign does Mia see in the sky? The clouds are dark!")
      ]
    },

    /* ---------------------------------------------------------------- 4 DOUBLE ENGINES */
    {
      id: 'engines', icon: '⚙️', name: 'Level 4 · Double Engines', sub: 'and / but', mins: 10,
      intro: "Level 4! Two engines are stronger than one. Join sentences with AND and BUT.", mascot: 2,
      items: [
        { type: 'card', tag: 'Captain Nova’s Rules', title: 'and  /  but', mascot: 3, cta: "Ready! →",
          html: '<div class="rule"><div class="rule-two">' +
            '<div class="rb plan"><h4>AND</h4><small>adds a similar idea</small><p>I like pizza<b>, and</b> my brother likes pasta.</p></div>' +
            '<div class="rb pred"><h4>BUT</h4><small>shows a different idea</small><p>It is sunny<b>, but</b> I am going to stay home.</p></div></div>' +
            '<p class="tip">💡 Join two full sentences with a <b>comma</b> + and / but.</p></div>' },
        ch('I like apples, ___ my sister likes bananas.', ['and', 'but'], 0,
          { tag: 'Choose and / but', bank: true, keepOrder: true, hint: H.and, model: "I like apples, and my sister likes bananas." }),
        ch('It is cold, ___ I am going to swim in the sea.', ['and', 'but'], 1,
          { tag: 'Choose and / but', bank: true, keepOrder: true, hint: H.and + " Cold… swim? That is a surprise!", model: "It is cold, but I am going to swim in the sea." }),
        ch('The moon has craters, ___ Earth has oceans.', ['and', 'but'], 0,
          { tag: 'Choose and / but', bank: true, keepOrder: true, hint: H.and, model: "The moon has craters, and Earth has oceans." }),
        ord({ tag: 'Join the sentences', prompt: 'Join the two sentences with AND. Put the words in order.', given: 'Earth is a planet. Mars is a planet.',
          words: ['Earth', 'is', 'a', 'planet,', 'and', 'Mars', 'is', 'a', 'planet'], end: '.',
          answer: 'Earth is a planet and Mars is a planet', alt: ['Mars is a planet and Earth is a planet'],
          hint: H.comma + "  Earth is a planet, and …", model: "Earth is a planet, and Mars is a planet." }),
        ord({ tag: 'Join the sentences', prompt: 'Join the two sentences with BUT. Put the words in order.', given: 'I am tired. I am going to finish my homework.',
          words: ['I', 'am', 'tired,', 'but', 'I', 'am', 'going', 'to', 'finish', 'my', 'homework'], end: '.',
          answer: 'I am tired but I am going to finish my homework',
          hint: H.comma + "  I am tired, but …", model: "I am tired, but I am going to finish my homework." }),
        ord({ words: ['Sam', 'is', 'going', 'to', 'cook,', 'and', 'I', 'am', 'going', 'to', 'eat'], end: '.',
          answer: 'Sam is going to cook and I am going to eat', model: "Sam is going to cook, and I am going to eat.",
          hint: "Hint: Two sentences + “and”. First: Sam … cook. Then: I … eat." }),
        ch('I want to play outside, but ___ .', ['it is going to rain', 'the sun is shining', 'I love to play outside'], 0,
          { tag: 'Complete the sentence', hint: "Hint: BUT shows a different idea — a problem! Which ending is a problem?", model: "I want to play outside, but it is going to rain." }),
        rq('moon', 'What did people see on the moon long ago?', ['A face', 'A canoe', 'A rainbow'], 0, 1,
          "Hint: Read sentence 1: “…they saw a …”"),
        rq('moon', 'Why does sentence 2 use the word “but”?',
          ['To show two different ideas', 'To add the same idea', 'To say when it happened'], 0, 2,
          H.and),
        rq('moon', 'How does the moon look from Earth?',
          ['It looks small, but it is very big.', 'It looks big, and it is very small.', 'It looks small, and it is very small.'], 0, 4,
          "Hint: Read sentence 4 slowly. Small… but big.")
      ]
    },

    /* ---------------------------------------------------------------- 5 BOSS */
    {
      id: 'boss', icon: '👾', name: 'Level 5 · BOSS BATTLE', sub: 'Dr. Grammar-Bot', mins: 9, boss: true,
      intro: "Dr. Grammar-Bot is here! You have 3 hearts. If they all disappear, the battle starts again. You can do it!", mascot: 3,
      items: [
        ch("Listen to Leo's message. Where is Leo going to go tomorrow?",
          ["To his grandfather's house", 'To the beach', 'To his school'], 0,
          { tag: 'Listen and choose', audio: 'audio/a4.mp3', slow: true, passage: 'leo', hidePassage: true, ev: 3,
            hint: "Listen again: “Tomorrow is Saturday, and I'm going to visit my …”", model: "Leo is going to visit his grandfather." }),
        ch('How are they going to travel on the river?', ['By canoe', 'By bus', 'By plane'], 0,
          { tag: 'Listen and choose', audio: 'audio/a4.mp3', slow: true, passage: 'leo', hidePassage: true, ev: 5,
            hint: "Listen again: “We are going to take a …”", model: "They are going to take a canoe." }),
        ch("Who isn't going to come, and why?",
          ['His sister. She is going to study for a test.', 'His grandfather. He is sick.', 'His sister. She is sick.'], 0,
          { tag: 'Listen and choose', audio: 'audio/a4.mp3', slow: true, passage: 'leo', hidePassage: true, ev: [5, 6],
            hint: "Listen for “but my sister isn't going to come. She is going to …”", model: "His sister isn't going to come. She is going to study for a test." }),
        tf('Leo thinks it is going to be sunny in the evening.', false,
          { audio: 'audio/a4.mp3', slow: true, passage: 'leo', hidePassage: true, ev: 9, tag: 'Listen: True or False?',
            hint: "Listen to the end: “…but I think it is going to be …”" }),
        ord({ tag: 'Rewrite', prompt: 'Rewrite the sentence with be going to. Put the words in order.', given: 'Leo will visit his grandfather.',
          words: ['Leo', 'is', 'going', 'to', 'visit', 'his', 'grandfather'], end: '.', answer: 'Leo is going to visit his grandfather',
          hint: H.will, model: "Leo is going to visit his grandfather." }),
        ord({ tag: 'Make a question', prompt: 'Make a QUESTION. Put the words in order.', given: 'Leo is going to take a canoe.',
          words: ['Is', 'Leo', 'going', 'to', 'take', 'a', 'canoe'], end: '?', answer: 'Is Leo going to take a canoe',
          hint: H.q, model: "Is Leo going to take a canoe?" }),
        ch("“Is Leo's sister going to come?”  Choose the SHORT answer (No!). Remember: she is going to study.",
          ["No, she isn't.", "No, she doesn't.", "Yes, she isn't."], 0,
          { tag: 'Short answer', hint: H.short, model: "No, she isn't." }),
        ch('“What are Leo and his family going to do in the evening?”  Choose the FULL answer.',
          ['They are going to look at the stars.', 'They are going to take a canoe.', 'They are look at the stars.', 'They going to look at the stars.'], 0,
          { tag: 'Full answer', passage: 'leo', ev: 8, hint: H.full + "  Look at sentence 8 in the story!", model: "They are going to look at the stars." }),
        ord({ tag: 'Join the sentences', prompt: 'Join the two sentences with BUT. Put the words in order.', given: 'Leo is going to take a canoe. His sister is going to study.',
          words: ['Leo', 'is', 'going', 'to', 'take', 'a', 'canoe,', 'but', 'his', 'sister', 'is', 'going', 'to', 'study'], end: '.',
          answer: 'Leo is going to take a canoe but his sister is going to study',
          hint: H.comma + "  Leo is going to take a canoe, but …", model: "Leo is going to take a canoe, but his sister is going to study." }),
        ch('Read the script. What is a “traditional” dinner?',
          ['A dinner the family has in the same way for a long time', 'A dinner at a restaurant', 'A dinner with only new food'], 0,
          { tag: 'Reading check', passage: 'leo', ev: 7, hint: "Hint: Look at sentence 7. The family has this dinner every Saturday.", model: "A traditional dinner is a custom that the family keeps for a long time." })
      ]
    },

    /* ---------------------------------------------------------------- 6 FINAL */
    {
      id: 'final', icon: '🏅', name: 'Final Report', sub: 'Certificate', mins: 3,
      intro: "Mission complete! One last thing: a speaking report.", mascot: 7,
      items: [{ type: 'final' }]
    }
  ];

  root.LEVELS = LEVELS;
  root.PASSAGES = PASSAGES;
  root.WORDS = WORDS;
  root.HINTS = H;
  if (typeof module !== 'undefined' && module.exports) module.exports = { LEVELS: LEVELS, PASSAGES: PASSAGES, WORDS: WORDS };
})(typeof window !== 'undefined' ? window : globalThis);
