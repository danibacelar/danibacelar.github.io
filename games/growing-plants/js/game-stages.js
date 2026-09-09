/* =========================================================
   GROWING PLANTS — Stage implementations
   Depends on window.PGM (see game.js)
   ========================================================= */
(function(){
"use strict";
var P = window.PGM;
var $ = P.$, el = P.el, shuffle = P.shuffle;

function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

/* ---------------- shared UI builders ---------------- */

function stageIntro(container, kicker, heading, prompt){
  var wrap = el('div','stage-intro');
  wrap.innerHTML =
    '<div class="stage-kicker">'+kicker+'</div>'+
    '<h2 class="stage-heading">'+heading+'</h2>'+
    '<p class="stage-prompt">'+prompt+'</p>';
  container.appendChild(wrap);
  return wrap;
}

function progressBar(container, total){
  var track = el('div','progress-track');
  var fill = el('div','progress-fill');
  fill.style.width = '0%';
  track.appendChild(fill);
  container.appendChild(track);
  return {
    update: function(current){
      fill.style.width = Math.round((current/total)*100) + '%';
    }
  };
}

function stageCompleteBlock(stageId, mistakes, correctCount, reinforcementText){
  var stars = P.finishStage(stageId, mistakes, correctCount);
  P.addScore(correctCount*10);
  var box = el('div','reinforce-box');
  box.innerHTML = '💡 '+reinforcementText+'<br><br>'+
    '<span style="font-size:1.4rem;letter-spacing:3px;">'+'⭐'.repeat(stars)+'☆'.repeat(3-stars)+'</span><br>Nice work, Plant Scientist!';
  var actions = el('div','stage-actions');
  var btnMenu = el('button','btn btn-secondary','🏡 Back to Garden');
  btnMenu.onclick = P.goToMenu;
  actions.appendChild(btnMenu);
  var nextId = stageId < P.STAGE_META.length ? stageId+1 : null;
  if(nextId){
    var btnNext = el('button','btn btn-primary','➡️ Next Challenge');
    btnNext.onclick = function(){ P.goToStage(nextId); };
    actions.appendChild(btnNext);
  } else {
    var btnResults = el('button','btn btn-primary','🏆 See My Report');
    btnResults.onclick = P.goToResults;
    actions.appendChild(btnResults);
  }
  var wrap = el('div');
  wrap.appendChild(box);
  wrap.appendChild(actions);
  P.spawnConfetti(window.innerWidth/2, window.innerHeight/2, 22);
  return wrap;
}

function singleChoiceRow(choices, onAnswer){
  // choices: [{label, correct:bool}]
  var row = el('div','answer-row');
  var answered = false;
  choices.forEach(function(choice){
    var btn = el('button','answer-chip', choice.label);
    btn.type = 'button';
    btn.addEventListener('click', function(){
      if(answered) return;
      answered = true;
      P.$all('.answer-chip', row).forEach(function(b){ b.disabled = true; });
      btn.classList.add(choice.correct ? 'correct-answer' : 'wrong-answer');
      if(!choice.correct){
        row.querySelectorAll('.answer-chip').forEach(function(b, i){
          if(choices[i].correct) b.classList.add('correct-answer');
        });
      }
      onAnswer(choice.correct);
    });
    row.appendChild(btn);
  });
  return row;
}

/* ================================================================
   STAGE 1 — PLANT PARTS (drag and drop onto illustration)
   ================================================================ */
var STAGE1_TARGETS = [
  {key:'leaf',   x:36, y:48},
  {key:'flower', x:45, y:35},
  {key:'fruit',  x:59, y:38},
  {key:'stem',   x:51, y:62},
  {key:'root',   x:50, y:85}
];

function initStage1(container){
  var mistakes = 0, correctCount = 0, placedCount = 0;

  stageIntro(container, '🌱 Plant Parts',
    'Help Sprout Label the Plant!',
    'Drag each word to the matching part of the plant. Tap a labeled part any time to hear it again!');

  var prog = progressBar(container, STAGE1_TARGETS.length);

  var wrap = el('div','plant-diagram-wrap');
  var img = el('img');
  img.src = 'assets/plant-parts.jpg';
  img.alt = 'A tomato plant showing roots, stem, leaves, a flower and a fruit';
  wrap.appendChild(img);

  STAGE1_TARGETS.forEach(function(t){
    var zone = el('div','drop-zone');
    zone.dataset.key = t.key;
    zone.style.left = t.x + '%';
    zone.style.top = t.y + '%';
    var label = el('div','drop-zone-label','🎯');
    zone.appendChild(label);
    wrap.appendChild(zone);
  });
  container.appendChild(wrap);

  var tray = el('div','chip-tray');
  var order = shuffle(STAGE1_TARGETS.map(function(t){ return t.key; }));
  order.forEach(function(key){
    var chip = el('div','drag-chip', key);
    chip.dataset.key = key;
    chip.setAttribute('tabindex','0');
    tray.appendChild(chip);
    P.enableDrag(chip, wrap, '.drop-zone', function(zone, dragEl){
      if(zone && !zone.classList.contains('filled')){
        if(zone.dataset.key === dragEl.dataset.key){
          zone.classList.add('filled');
          zone.querySelector('.drop-zone-label').textContent = cap(dragEl.dataset.key) + ' 🔊';
          zone.classList.add('pop-anim');
          zone.style.cursor = 'pointer';
          zone.setAttribute('role','button');
          zone.setAttribute('aria-label','Hear the word ' + dragEl.dataset.key + ' again');
          zone.addEventListener('click', function(){ P.speakWord(zone.dataset.key); });
          dragEl.classList.add('placed');
          P.resetDraggablePosition(dragEl);
          placedCount++; correctCount++;
          P.confettiFromElement(zone, 10);
          P.playCorrectSound();
          setTimeout(function(){ P.speakWord(dragEl.dataset.key); }, 320);
          P.showToast('Great job! 🌱 That\'s the ' + dragEl.dataset.key + '!', 'good');
          prog.update(placedCount);
          if(placedCount === STAGE1_TARGETS.length){
            finishUp();
          }
        } else {
          mistakes++;
          P.resetDraggablePosition(dragEl);
          zone.classList.add('shake-anim');
          setTimeout(function(){ zone.classList.remove('shake-anim'); }, 400);
          P.showToast('Almost! Try again 🌿', 'bad');
        }
      } else {
        P.resetDraggablePosition(dragEl);
      }
    });
  });
  container.appendChild(tray);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  function finishUp(){
    bottomSlot.innerHTML = '';
    initStage1Listen(bottomSlot, mistakes, correctCount);
  }
}

/* ---- Stage 1, Round 2: Listen and Tap (audio recognition) ---- */
function initStage1Listen(container, mistakesRound1, correctRound1){
  var mistakes2 = 0, correctCount2 = 0, index = 0;
  var order = shuffle(STAGE1_TARGETS.map(function(t){ return t.key; }));

  var intro = el('div','stage-intro');
  intro.innerHTML =
    '<div class="stage-kicker">🎧 Bonus Round</div>'+
    '<h2 class="stage-heading">Listen and Tap!</h2>'+
    '<p class="stage-prompt">Listen to the word, then tap the matching part of the plant.</p>';
  container.appendChild(intro);

  var prog2 = progressBar(container, STAGE1_TARGETS.length);

  var playBtn = el('button','btn btn-secondary','🔊 Hear the Word');
  playBtn.type = 'button';
  playBtn.style.display = 'block';
  playBtn.style.margin = '16px auto';
  container.appendChild(playBtn);

  var wrap = el('div','plant-diagram-wrap');
  var img = el('img');
  img.src = 'assets/plant-parts.jpg';
  img.alt = 'A tomato plant showing roots, stem, leaves, a flower and a fruit';
  wrap.appendChild(img);

  STAGE1_TARGETS.forEach(function(t){
    var zone = el('div','drop-zone tap-zone');
    zone.dataset.key = t.key;
    zone.style.left = t.x + '%';
    zone.style.top = t.y + '%';
    var label = el('div','drop-zone-label','❓');
    zone.appendChild(label);
    zone.addEventListener('click', function(){ handleTap(zone); });
    wrap.appendChild(zone);
  });
  container.appendChild(wrap);

  var bottomSlot2 = el('div');
  container.appendChild(bottomSlot2);

  function currentWord(){ return order[index]; }
  function speakCurrent(){ P.speakWord(currentWord()); }
  playBtn.addEventListener('click', speakCurrent);

  function handleTap(zone){
    if(zone.classList.contains('filled') || index >= order.length) return;
    var word = currentWord();
    if(zone.dataset.key === word){
      zone.classList.add('filled');
      zone.querySelector('.drop-zone-label').textContent = cap(word) + ' ✅';
      zone.classList.add('pop-anim');
      correctCount2++;
      P.confettiFromElement(zone, 10);
      P.playCorrectSound();
      P.showToast('Yes! That\'s the ' + word + '! 🌱', 'good');
      index++;
      prog2.update(index);
      if(index < order.length){
        setTimeout(speakCurrent, 550);
      } else {
        playBtn.disabled = true;
        setTimeout(finishRound2, 550);
      }
    } else {
      mistakes2++;
      zone.classList.add('shake-anim');
      setTimeout(function(){ zone.classList.remove('shake-anim'); }, 400);
      P.showToast('Almost! Listen again 👂', 'bad');
      setTimeout(speakCurrent, 450);
    }
  }

  function finishRound2(){
    var totalMistakes = mistakesRound1 + mistakes2;
    var totalCorrect = correctRound1 + correctCount2;
    bottomSlot2.appendChild(stageCompleteBlock(1, totalMistakes, totalCorrect,
      'Most plants have roots, stems and leaves. Some plants also have flowers and fruit. You can listen for a word AND find the part — great Plant Scientist skills!'));
  }

  setTimeout(speakCurrent, 500);
}

/* ================================================================
   STAGE 2 — BUILD A HEALTHY PLANT (sort into baskets)
   ================================================================ */
var STAGE2_SCENARIOS = [
  {img:'healthy-plant.jpg',      label:'Healthy leaves',        group:'healthy'},
  {img:'cut-stem.jpg',           label:'A cut stem',            group:'help'},
  {img:'unhealthy-leaves.jpg',   label:'Unhealthy leaves',      group:'help'},
  {img:'water-journey.jpg',      label:'Getting water',         group:'healthy'},
  {img:'plant-toward-light.jpg', label:'Getting sunlight',      group:'healthy'},
  {img:'plant-parts.jpg',        label:'Healthy roots & stem',  group:'healthy'}
];

function initStage2(container){
  var mistakes = 0, correctCount = 0, sortedCount = 0;

  stageIntro(container, '🌿 Healthy Plant',
    'Build a Healthy Plant!',
    'Look at each picture. Tap Healthy or Needs Help.');

  var prog = progressBar(container, STAGE2_SCENARIOS.length);

  var grid = el('div','scenario-grid');
  var order = shuffle(STAGE2_SCENARIOS);
  order.forEach(function(s){
    var card = el('div','scenario-card');
    card.dataset.group = s.group;
    card.innerHTML = '<img src="assets/'+s.img+'" alt="'+s.label+'"><div class="scenario-label">'+s.label+'</div>';

    var choiceRow = el('div','scenario-choice-row');
    var bHeal = el('button','choice-btn choice-healthy','🌿 Healthy');
    var bHelp = el('button','choice-btn choice-help','🤒 Needs Help');
    bHeal.type = 'button'; bHelp.type = 'button';
    choiceRow.appendChild(bHeal);
    choiceRow.appendChild(bHelp);
    card.appendChild(choiceRow);

    function evaluate(groupChosen, btnEl){
      if(card.classList.contains('sorted-ok')) return;
      if(groupChosen === s.group){
        card.classList.add('sorted-ok');
        btnEl.classList.add('choice-correct');
        correctCount++; sortedCount++;
        P.confettiFromElement(card, 8);
        P.playCorrectSound();
        P.showToast('That\'s right! 🌱', 'good');
        prog.update(sortedCount);
        if(sortedCount === STAGE2_SCENARIOS.length){ afterSorting(); }
      } else {
        mistakes++;
        btnEl.classList.add('choice-wrong');
        card.classList.add('sorted-bad-flash');
        setTimeout(function(){
          card.classList.remove('sorted-bad-flash');
          btnEl.classList.remove('choice-wrong');
        }, 500);
        P.showToast('Almost! Look again 🔍', 'bad');
      }
    }
    bHeal.addEventListener('click', function(){ evaluate('healthy', bHeal); });
    bHelp.addEventListener('click', function(){ evaluate('help', bHelp); });

    grid.appendChild(card);
  });
  container.appendChild(grid);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  function afterSorting(){
    var mini = el('div','mini-question');
    mini.innerHTML = '<p>What do plants need to grow healthy?</p>';
    var row = singleChoiceRow([
      {label:'Healthy roots, stems and leaves', correct:true},
      {label:'Just soil', correct:false}
    ], function(correct){
      if(!correct) mistakes++;
      else correctCount++;
      P.showToast(correct ? 'Yes! Exactly right 🌿' : 'Plants need healthy roots, stems and leaves.', correct?'good':'bad');
      setTimeout(function(){
        bottomSlot.appendChild(stageCompleteBlock(2, mistakes, correctCount,
          'Plants need healthy roots, stems and leaves to grow.'));
      }, 500);
    });
    mini.appendChild(row);
    bottomSlot.appendChild(mini);
  }
}

/* ================================================================
   STAGE 3 — WATER JOURNEY (drag to build sequence)
   ================================================================ */
var STAGE3_STEPS = ['Soil','Roots','Stem','Leaves'];

function initStage3(container){
  var mistakes = 0, correctCount = 0;

  stageIntro(container, '💧 Water Journey',
    'Follow the Water!',
    'Drag the words in order to show how water travels through the plant.');

  var seqWrap = el('div','sequence-wrap');
  container.appendChild(seqWrap);

  var slotsRow = el('div','sequence-slots');
  seqWrap.appendChild(slotsRow);

  var trayRow = el('div','seq-piece-tray');
  seqWrap.appendChild(trayRow);

  function buildRound(){
    slotsRow.innerHTML = '';
    trayRow.innerHTML = '';
    var filledCount = 0;

    STAGE3_STEPS.forEach(function(name, idx){
      var slot = el('div','seq-slot');
      slot.dataset.slot = idx;
      var num = el('div','slot-num', (idx+1));
      slot.appendChild(num);
      var txt = el('div','', 'Step ' + (idx+1));
      slot.appendChild(txt);
      slotsRow.appendChild(slot);
    });

    var order = shuffle(STAGE3_STEPS.map(function(name, idx){ return {name:name, order:idx}; }));
    order.forEach(function(item){
      var piece = el('div','seq-piece', item.name);
      piece.dataset.order = item.order;
      trayRow.appendChild(piece);
      P.enableDrag(piece, seqWrap, '.seq-slot', function(zone, dragEl){
        if(zone && !zone.classList.contains('filled')){
          zone.classList.add('filled');
          zone.innerHTML = '';
          var num2 = el('div','slot-num', (parseInt(zone.dataset.slot,10)+1));
          zone.appendChild(num2);
          zone.appendChild(document.createTextNode(dragEl.textContent));
          dragEl.classList.add('placed');
          P.resetDraggablePosition(dragEl);
          filledCount++;
          if(parseInt(zone.dataset.slot,10) === parseInt(dragEl.dataset.order,10)){
            zone.classList.add('correct');
            correctCount++;
            P.confettiFromElement(zone, 6);
          } else {
            zone.classList.add('wrong');
            mistakes++;
          }
          if(filledCount === STAGE3_STEPS.length){
            setTimeout(checkRound, 500);
          }
        } else {
          P.resetDraggablePosition(dragEl);
        }
      });
    });
  }

  function checkRound(){
    var allCorrect = P.$all('.seq-slot', slotsRow).every(function(s){ return s.classList.contains('correct'); });
    if(allCorrect){
      P.showToast('Perfect! Water flows: Soil → Roots → Stem → Leaves 💧', 'good');
      showMiniQuestion();
    } else {
      P.showToast('Almost! Let\'s try the order again 🌱', 'bad');
      var retryBtn = el('button','btn btn-secondary','🔁 Try Again');
      retryBtn.style.display = 'block';
      retryBtn.style.margin = '18px auto 0';
      retryBtn.onclick = function(){ retryBtn.remove(); buildRound(); };
      seqWrap.appendChild(retryBtn);
    }
  }

  function showMiniQuestion(){
    var mini = el('div','mini-question');
    mini.innerHTML = '<p>Do all plants need the same amount of water?</p>';
    var row = singleChoiceRow([
      {label:'Yes', correct:false},
      {label:'No', correct:true}
    ], function(correct){
      if(!correct) mistakes++;
      else correctCount++;
      P.showToast(correct ? 'Correct! Some plants need more water than others.' : 'Actually, some plants need more water than others!', correct?'good':'bad');
      setTimeout(function(){
        showTracePath();
      }, 700);
    });
    mini.appendChild(row);
    seqWrap.appendChild(mini);
  }

  function showTracePath(){
    var traceMistakes = 0, traceCorrect = 0, step = 0;
    var STEPS = [
      {key:'soil',  label:'Soil',  x:50, y:97, prompt:'Where does water start?'},
      {key:'root',  label:'Roots', x:50, y:76, prompt:'water enters the plant here.'},
      {key:'stem',  label:'Stem',  x:50, y:44, prompt:'water travels up.'},
      {key:'leaf',  label:'Leaves',x:48, y:9,  prompt:'water reaches every part!'}
    ];

    var traceWrap = el('div','stage-intro');
    traceWrap.innerHTML =
      '<div class="stage-kicker">🔍 Bonus Round</div>'+
      '<h2 class="stage-heading">Trace the Water Path!</h2>'+
      '<p class="stage-prompt" id="trace-instruction">'+STEPS[0].prompt+'</p>';
    container.appendChild(traceWrap);

    var prog2 = progressBar(container, STEPS.length);

    var wrap = el('div','plant-diagram-wrap');
    var img = el('img');
    img.src = 'assets/water-path.jpg';
    img.alt = 'A glowing blue path shows water moving from the soil, through the roots and stem, up to the leaves and fruit';
    wrap.appendChild(img);

    STEPS.forEach(function(s){
      var zone = el('div','drop-zone tap-zone tap-zone-sm');
      zone.dataset.key = s.key;
      zone.style.left = s.x + '%';
      zone.style.top = s.y + '%';
      var label = el('div','drop-zone-label','❓');
      zone.appendChild(label);
      zone.addEventListener('click', function(){ handleTraceTap(zone); });
      wrap.appendChild(zone);
    });
    container.appendChild(wrap);

    var traceBottom = el('div');
    container.appendChild(traceBottom);

    function handleTraceTap(zone){
      if(zone.classList.contains('filled') || step >= STEPS.length) return;
      var target = STEPS[step];
      if(zone.dataset.key === target.key){
        zone.classList.add('filled');
        zone.querySelector('.drop-zone-label').textContent = cap(target.key) + ' ✅';
        zone.classList.add('pop-anim');
        traceCorrect++;
        P.confettiFromElement(zone, 8);
        P.playCorrectSound();
        P.showToast('Yes! 💧 ' + target.label, 'good');
        step++;
        prog2.update(step);
        if(step < STEPS.length){
          $('#trace-instruction').textContent = STEPS[step].prompt;
          setTimeout(function(){ P.speakWord(STEPS[step].prompt); }, 550);
        } else {
          $('#trace-instruction').textContent = 'Great tracing! Water flows: Soil → Roots → Stem → Leaves 💧';
          setTimeout(finishTrace, 600);
        }
      } else {
        traceMistakes++;
        zone.classList.add('shake-anim');
        setTimeout(function(){ zone.classList.remove('shake-anim'); }, 400);
        P.showToast('Not yet! Look for the next step 🔍', 'bad');
      }
    }

    function finishTrace(){
      var totalMistakes = mistakes + traceMistakes;
      var totalCorrect = correctCount + traceCorrect;
      traceBottom.appendChild(stageCompleteBlock(3, totalMistakes, totalCorrect,
        'Water moves from the soil, into the roots, up through the stem, to every part of the plant — even the leaves and fruit!'));
    }

    setTimeout(function(){ P.speakWord(STEPS[0].prompt); }, 500);
  }

  buildRound();
}

/* ================================================================
   STAGE 4 — WORD BANK: FILL IN THE BLANK
   ================================================================ */
var WORD_BANK = ['stem','leaves','soil','roots','water'];

var STAGE4_FILL_ITEMS = [
  {before:'A seedling grows healthily when it takes water from the ', after:'.', answer:'soil'},
  {before:'',                                                          after:' take in water from the soil.', answer:'roots', displayAnswer:'Roots'},
  {before:'Water moves through the ',                                  after:' to the leaves of a plant.', answer:'stem'},
  {before:'Plants need light and ',                                    after:' to grow.', answer:'water'},
  {before:'Most plants have roots, stems and ',                        after:'.', answer:'leaves'},
  {before:'When we water a plant, the roots get the water from the ',  after:'.', answer:'soil'},
  {before:'The water moves from the roots through the ',               after:' to every part of the plant.', answer:'stem'},
  {before:'When the ',                                                 after:' of a plant are very close together, they cannot get much water from the soil.', answer:'roots'},
  {before:'Plants need ',                                              after:' to survive.', answer:'water'}
];

function initStage4FillBlank(container){
  var mistakes = 0, correctCount = 0, answeredCount = 0;

  stageIntro(container, '✏️ Word Bank',
    'Fill in the Blank!',
    'Choose the correct word from the word bank to complete each sentence.');

  var bankRow = el('div','word-bank-row');
  WORD_BANK.forEach(function(w){
    bankRow.appendChild(el('span','word-bank-tag', w));
  });
  container.appendChild(bankRow);

  var prog = progressBar(container, STAGE4_FILL_ITEMS.length);

  var list = el('div','fill-blank-list');
  container.appendChild(list);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  STAGE4_FILL_ITEMS.forEach(function(item){
    var card = el('div','lab-card fill-blank-card');
    var q = el('p','lab-q');
    q.appendChild(document.createTextNode(item.before));
    var blankSpan = el('span','blank-slot','_____');
    q.appendChild(blankSpan);
    q.appendChild(document.createTextNode(item.after));
    card.appendChild(q);

    var choices = shuffle(WORD_BANK).map(function(w){ return {label:w, correct: w === item.answer}; });
    var row = singleChoiceRow(choices, function(correct){
      answeredCount++;
      blankSpan.textContent = item.displayAnswer || item.answer;
      blankSpan.classList.add('blank-filled');
      if(correct){
        correctCount++;
        P.confettiFromElement(card, 6);
        P.playCorrectSound();
      } else {
        mistakes++;
      }
      prog.update(answeredCount);
      if(answeredCount === STAGE4_FILL_ITEMS.length){
        setTimeout(finishUp, 500);
      }
    });
    card.appendChild(row);
    list.appendChild(card);
  });

  function finishUp(){
    bottomSlot.appendChild(stageCompleteBlock(4, mistakes, correctCount,
      'Water moves from the soil, into the roots, up through the stem, to every part of the plant. Plants need water and light to grow!'));
  }
}

/* ================================================================
   STAGE 5 — LIGHT & TEMPERATURE LAB (scenario quiz)
   ================================================================ */
var STAGE4_SCENES = [
  {scene:'scene-sun',  badge:'☀️', dim:false, q:'Does this plant have enough light?',
    choices:[{label:'Yes',correct:true},{label:'No',correct:false}],
    feedbackCorrect:'Yes! Plants need light to grow.', feedbackWrong:'Look at the sunshine — plants need light to grow.'},
  {scene:'scene-dark', badge:'🌙', dim:true, q:'Does this plant have enough light?',
    choices:[{label:'Yes',correct:false},{label:'No',correct:true}],
    feedbackCorrect:'Right, no light here! Plants need light to grow.', feedbackWrong:'Look again — it\'s dark, with no light.'},
  {scene:'scene-lamp', badge:'💡', dim:false, q:'Can this plant grow under a lamp?',
    choices:[{label:'Yes',correct:true},{label:'No',correct:false}],
    feedbackCorrect:'Yes! Plants can grow under the light of a lamp.', feedbackWrong:'A lamp makes light too — plants can grow under a lamp.'},
  {scene:'scene-hot',  badge:'🌡️', dim:false, q:'Is this the right temperature for this plant?',
    choices:[{label:'Yes',correct:false},{label:'No',correct:true}],
    feedbackCorrect:'Right — each plant needs the right temperature to be healthy.', feedbackWrong:'Each plant needs the right temperature — this looks too hot.'},
  {scene:'scene-cold', badge:'❄️', dim:true, q:'Do all plants grow at the same temperature?',
    choices:[{label:'Yes',correct:false},{label:'No',correct:true}],
    feedbackCorrect:'Correct! Different kinds of plants grow at different temperatures.', feedbackWrong:'Different kinds of plants grow at different temperatures.'}
];

function miniCssPlant(dim){
  var wrap = el('div','css-plant' + (dim ? ' dim' : ''));
  wrap.innerHTML =
    '<div class="css-plant-leaf css-plant-leaf-l"></div>'+
    '<div class="css-plant-leaf css-plant-leaf-r"></div>'+
    '<div class="css-plant-stem"></div>'+
    '<div class="css-plant-top"></div>';
  return wrap;
}

function initStage4(container){
  var mistakes = 0, correctCount = 0, answeredCount = 0;

  stageIntro(container, '☀️ Light & Temperature Lab',
    'Check Sprout\'s Garden Lab!',
    'Look at each plant and answer the question.');

  var prog = progressBar(container, STAGE4_SCENES.length);

  var grid = el('div','lab-grid');
  container.appendChild(grid);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  STAGE4_SCENES.forEach(function(sc){
    var card = el('div','lab-card');
    var scene = el('div','lab-scene ' + sc.scene);
    var badge = el('div','lab-badge', sc.badge);
    scene.appendChild(miniCssPlant(sc.dim));
    scene.appendChild(badge);
    card.appendChild(scene);
    var q = el('p','lab-q', sc.q);
    card.appendChild(q);
    var explain = el('p','', '');
    explain.style.fontSize = '0.85rem';
    explain.style.fontWeight = '700';
    explain.style.marginTop = '10px';
    explain.style.color = 'var(--ink-soft)';

    var row = singleChoiceRow(sc.choices, function(correct){
      answeredCount++;
      if(correct){ correctCount++; P.confettiFromElement(card, 6); }
      else { mistakes++; }
      explain.textContent = correct ? ('✅ ' + sc.feedbackCorrect) : ('🌿 ' + sc.feedbackWrong);
      prog.update(answeredCount);
      if(answeredCount === STAGE4_SCENES.length){
        setTimeout(function(){
          bottomSlot.appendChild(stageCompleteBlock(5, mistakes, correctCount,
            'Plants need light to grow, and each plant needs the right temperature to be healthy. Light and temperature affect plants.'));
        }, 400);
      }
    });
    card.appendChild(row);
    card.appendChild(explain);
    grid.appendChild(card);
  });
}

/* ================================================================
   STAGE 6 — PLANT DETECTIVE (true/false flip cards)
   ================================================================ */
var STAGE5_CASES = [
  {text:'A plant with a cut stem is healthy.', answer:false, explain:'A cut stem is NOT healthy. Plants need healthy stems to grow.'},
  {text:'Plants need healthy roots, stems and leaves to grow.', answer:true, explain:'Yes! All these parts must be healthy for the plant to grow well.'},
  {text:'Roots grow towards light.', answer:false, explain:'Roots grow towards the ground, not towards light.'},
  {text:'Plant stems and leaves grow towards light.', answer:true, explain:'That\'s right! Stems and leaves grow towards light.'},
  {text:'All plants need the same amount of water.', answer:false, explain:'Some plants need more water than other plants.'},
  {text:'Plants only grow in hot places.', answer:false, explain:'Different kinds of plants grow at different temperatures.'},
  {text:'Different plants can grow at different temperatures.', answer:true, explain:'Correct! Each plant needs the right temperature to be healthy.'},
  {text:'Plants make food in their roots.', answer:false, explain:'Plants make food in their green parts, not their roots.'},
  {text:'Plants use carbon dioxide from the air.', answer:true, explain:'Yes! Plants use carbon dioxide from the air.'},
  {text:'Plants produce oxygen.', answer:true, explain:'That\'s right! Plants produce oxygen.'}
];

function initStage5(container){
  var mistakes = 0, correctCount = 0, index = 0;
  var cases = shuffle(STAGE5_CASES);

  stageIntro(container, '🔍 Plant Detective',
    'Can You Spot the Mistake?',
    'Read each clue. Decide: is it TRUE or FALSE?');

  var counter = el('div','case-counter');
  container.appendChild(counter);

  var cardWrap = el('div','case-card');
  cardWrap.innerHTML =
    '<div class="case-inner">'+
      '<div class="case-face case-front"><div class="case-statement"></div></div>'+
      '<div class="case-face case-back"><div class="case-verdict"></div><div class="case-explain"></div></div>'+
    '</div>';
  container.appendChild(cardWrap);

  var controls = el('div','detective-controls');
  var btnTrue = el('button','btn btn-true','✅ True');
  var btnFalse = el('button','btn btn-false','❌ False');
  controls.appendChild(btnTrue);
  controls.appendChild(btnFalse);
  container.appendChild(controls);

  var nextWrap = el('div');
  nextWrap.style.textAlign = 'center';
  container.appendChild(nextWrap);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  function showCase(){
    var c = cases[index];
    counter.textContent = 'Case ' + (index+1) + ' of ' + cases.length;
    cardWrap.classList.remove('flipped');
    var statementEl = $('.case-statement', cardWrap);
    statementEl.textContent = '🔍 "' + c.text + '"';
    controls.style.display = 'flex';
    btnTrue.disabled = false; btnFalse.disabled = false;
    nextWrap.innerHTML = '';
  }

  function answer(guess){
    var c = cases[index];
    var correct = (guess === c.answer);
    if(correct) correctCount++; else mistakes++;
    var backFace = $('.case-back', cardWrap);
    backFace.classList.remove('back-true','back-false');
    backFace.classList.add(c.answer ? 'back-true' : 'back-false');
    $('.case-verdict', cardWrap).textContent = c.answer ? '✅ TRUE!' : '❌ FALSE!';
    $('.case-explain', cardWrap).textContent = c.explain;
    cardWrap.classList.add('flipped');
    controls.style.display = 'none';
    P.showToast(correct ? 'Great detective work! 🕵️' : 'Nice try! Here\'s the clue.', correct ? 'good' : 'bad');
    if(correct) P.confettiFromElement(cardWrap, 10);

    var btnNext = el('button','btn btn-primary btn-next-case',
      (index === cases.length-1) ? '🏁 Finish Cases' : '➡️ Next Case');
    btnNext.onclick = function(){
      index++;
      if(index < cases.length){
        showCase();
      } else {
        finishUp();
      }
    };
    nextWrap.appendChild(btnNext);
  }

  btnTrue.addEventListener('click', function(){ answer(true); });
  btnFalse.addEventListener('click', function(){ answer(false); });

  function finishUp(){
    counter.textContent = 'All cases solved!';
    cardWrap.style.display = 'none';
    controls.style.display = 'none';
    nextWrap.innerHTML = '';
    bottomSlot.appendChild(stageCompleteBlock(6, mistakes, correctCount,
      'Great detective work! Now you know the true facts about plants.'));
  }

  showCase();
}

/* ================================================================
   STAGE 7 — FINAL GARDEN CHALLENGE (mixed)
   ================================================================ */
function initStage6(container){
  var mistakes = 0, correctCount = 0, solvedCount = 0;
  var totalPlots = 6;

  stageIntro(container, '🏆 Final Garden Challenge',
    'Help Every Plant in the Garden!',
    'Six plants need your help. Solve each one to complete your mission.');

  var prog = progressBar(container, totalPlots);

  var plots = el('div','final-plots');
  container.appendChild(plots);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  function markSolved(card, correct){
    solvedCount++;
    if(correct){ correctCount++; P.confettiFromElement(card, 6); }
    else { mistakes++; }
    card.classList.add('solved');
    prog.update(solvedCount);
    if(solvedCount === totalPlots){
      setTimeout(function(){
        bottomSlot.appendChild(stageCompleteBlock(7, mistakes, correctCount,
          'You helped every plant in the garden! Plants need water, light, the right temperature, and healthy roots, stems and leaves to grow.'));
      }, 400);
    }
  }

  // Plot A: no water
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="background:#FBD9D2;">🥀</div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant A</p>'+
        '<p class="plot-desc">This plant has no water.</p>'+
      '</div>';
    var q = el('p','lab-q','What does this plant need?');
    var row = singleChoiceRow([
      {label:'Water', correct:true},
      {label:'Light', correct:false},
      {label:'Nothing', correct:false}
    ], function(correct){ markSolved(card, correct); });
    var body = $('.plot-body', card);
    body.appendChild(q); body.appendChild(row);
    plots.appendChild(card);
  })();

  // Plot B: unhealthy roots
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="padding:0;overflow:hidden;"><img src="assets/root-closeup.jpg" alt="A close-up view of a plant\'s roots underground" style="width:100%;height:100%;object-fit:cover;"></div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant B</p>'+
        '<p class="plot-desc">These are Plant B\'s roots. They are not healthy.</p>'+
      '</div>';
    var q = el('p','lab-q','Which part is unhealthy?');
    var row = singleChoiceRow([
      {label:'Root', correct:true},
      {label:'Stem', correct:false},
      {label:'Leaf', correct:false}
    ], function(correct){ markSolved(card, correct); });
    var body = $('.plot-body', card);
    body.appendChild(q); body.appendChild(row);
    plots.appendChild(card);
  })();

  // Plot C: no light
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="background:#D7DCEE;">🌑</div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant C</p>'+
        '<p class="plot-desc">This plant has no light.</p>'+
      '</div>';
    var q = el('p','lab-q','Can this plant grow healthily without light?');
    var row = singleChoiceRow([
      {label:'Yes', correct:false},
      {label:'No', correct:true}
    ], function(correct){ markSolved(card, correct); });
    var body = $('.plot-body', card);
    body.appendChild(q); body.appendChild(row);
    plots.appendChild(card);
  })();

  // Plot D: wrong temperature
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="background:#FCE3C7;">🌡️</div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant D</p>'+
        '<p class="plot-desc">This plant is not in the right temperature.</p>'+
      '</div>';
    var q = el('p','lab-q','What does this plant need?');
    var row = singleChoiceRow([
      {label:'The right temperature', correct:true},
      {label:'More fruit', correct:false},
      {label:'A different color', correct:false}
    ], function(correct){ markSolved(card, correct); });
    var body = $('.plot-body', card);
    body.appendChild(q); body.appendChild(row);
    plots.appendChild(card);
  })();

  // Plot E: flowering plant
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="padding:0;overflow:hidden;"><img src="assets/healthy-plant.jpg" alt="A plant with a big yellow flower" style="width:100%;height:100%;object-fit:cover;"></div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant E</p>'+
        '<p class="plot-desc">Look at this plant.</p>'+
      '</div>';
    var q = el('p','lab-q','Which group does it belong to?');
    var row = singleChoiceRow([
      {label:'Flowering plant', correct:true},
      {label:'Not flowering plant', correct:false}
    ], function(correct){ markSolved(card, correct); });
    var body = $('.plot-body', card);
    body.appendChild(q); body.appendChild(row);
    plots.appendChild(card);
  })();

  // Plot F: name the parts (multi-select)
  (function(){
    var card = el('div','plot-card');
    card.innerHTML =
      '<div class="plot-visual" style="padding:0;overflow:hidden;"><img src="assets/non-flowering-plant.jpg" alt="A leafy plant with roots, a stem and leaves, and no flower" style="width:100%;height:100%;object-fit:cover;object-position:center 30%;"></div>'+
      '<div class="plot-body">'+
        '<p class="plot-title">🌱 Plant F</p>'+
        '<p class="plot-desc">This is Plant F. It has no flower and no fruit.</p>'+
      '</div>';
    var q = el('p','lab-q','Which parts does Plant F have? Tap all that are true:');
    var body = $('.plot-body', card);
    body.appendChild(q);

    var options = [
      {label:'Root', ok:true}, {label:'Stem', ok:true}, {label:'Leaf', ok:true},
      {label:'Flower', ok:false}, {label:'Fruit', ok:false}
    ];
    var msRow = el('div','multiselect-row');
    options.forEach(function(opt){
      var chip = el('button','select-chip', opt.label);
      chip.type = 'button';
      chip.dataset.ok = opt.ok ? '1' : '0';
      chip.addEventListener('click', function(){
        chip.classList.toggle('toggled');
      });
      msRow.appendChild(chip);
    });
    body.appendChild(msRow);

    var checkBtn = el('button','btn btn-primary plot-submit','Check ✔️');
    checkBtn.type = 'button';
    var attempted = false;
    checkBtn.addEventListener('click', function(){
      var chips = P.$all('.select-chip', msRow);
      var allCorrect = chips.every(function(c){
        var toggled = c.classList.contains('toggled');
        var shouldToggle = c.dataset.ok === '1';
        return toggled === shouldToggle;
      });
      if(allCorrect){
        checkBtn.disabled = true;
        chips.forEach(function(c){ c.style.pointerEvents = 'none'; });
        P.showToast('Perfect! Root, stem and leaf! 🌿', 'good');
        markSolved(card, !attempted);
      } else {
        attempted = true;
        P.showToast('Almost! Look at the plant again 🔍', 'bad');
      }
    });
    body.appendChild(checkBtn);
    plots.appendChild(card);
  })();
}

/* ================================================================
   STAGE 8 — PLANT SAFARI (real photos: flower, fruit, or not flowering?)
   ================================================================ */
var SAFARI_ITEMS = [
  {img:'sunflower.jpg',            label:'Sunflower',            group:'flower'},
  {img:'lemons.jpg',               label:'Lemons',                group:'fruit'},
  {img:'orchid.jpg',               label:'Orchid',                group:'flower'},
  {img:'pine-tree.jpg',            label:'Pine Tree',             group:'not-flower'},
  {img:'strawberries.jpg',         label:'Strawberries',          group:'fruit'},
  {img:'cherry-blossom.jpg',       label:'Cherry Blossom Tree',   group:'flower'},
  {img:'basil.jpg',                label:'Basil',                 group:'not-flower'},
  {img:'apples.jpg',               label:'Apples',                group:'fruit'},
  {img:'daisies.jpg',              label:'Daisies',               group:'flower'},
  {img:'orange-tree.jpg',          label:'Orange Tree',           group:'fruit'},
  {img:'tulips.jpg',               label:'Tulips',                group:'flower'},
  {img:'monstera.jpg',             label:'Monstera Leaves',       group:'not-flower'},
  {img:'jacaranda.jpg',            label:'Jacaranda Tree',        group:'flower'},
  {img:'mangosteen.jpg',           label:'Mangosteen',            group:'fruit'},
  {img:'white-blossom-tree1.jpg',  label:'Flowering Tree',        group:'flower'},
  {img:'cactus.jpg',               label:'Cactus',                group:'not-flower'},
  {img:'blueberries.jpg',          label:'Blueberries',           group:'fruit'},
  {img:'hibiscus.jpg',             label:'Hibiscus',              group:'flower'},
  {img:'peace-lily.jpg',           label:'Peace Lily',            group:'flower'},
  {img:'peaches.jpg',              label:'Peaches',               group:'fruit'},
  {img:'fern.jpg',                 label:'Fern',                  group:'not-flower'},
  {img:'white-blossom-tree2.jpg',  label:'Blossom Tree',          group:'flower'},
  {img:'papaya.jpg',               label:'Papaya',                group:'fruit'},
  {img:'sunflower-field.jpg',      label:'Sunflowers',            group:'flower'}
];

function initStage8(container){
  var mistakes = 0, correctCount = 0, sortedCount = 0;

  stageIntro(container, '🌻 Plant Safari',
    'Flower, Fruit, or Not Flowering?',
    'Look at each real photo. Tap the group it belongs to.');

  var prog = progressBar(container, SAFARI_ITEMS.length);

  var grid = el('div','scenario-grid safari-grid');
  var order = shuffle(SAFARI_ITEMS);
  order.forEach(function(s){
    var card = el('div','scenario-card');
    card.dataset.group = s.group;
    card.innerHTML = '<img src="assets/safari/'+s.img+'" alt="'+s.label+'"><div class="scenario-label">'+s.label+'</div>';

    var row = el('div','scenario-choice-row safari-choice-row');
    var bFlower = el('button','choice-btn choice-flower','🌸 Flower');
    var bNot = el('button','choice-btn choice-notflower','🌱 Not flower');
    var bFruit = el('button','choice-btn choice-fruit','🍎 Fruit');
    bFlower.type = 'button'; bNot.type = 'button'; bFruit.type = 'button';
    row.appendChild(bFlower);
    row.appendChild(bNot);
    row.appendChild(bFruit);
    card.appendChild(row);

    function evaluate(groupChosen, btnEl){
      if(card.classList.contains('sorted-ok')) return;
      if(groupChosen === s.group){
        card.classList.add('sorted-ok');
        btnEl.classList.add('choice-correct');
        correctCount++; sortedCount++;
        P.confettiFromElement(card, 8);
        P.playCorrectSound();
        P.showToast('Yes! 🌟', 'good');
        prog.update(sortedCount);
        if(sortedCount === SAFARI_ITEMS.length){ finishUp(); }
      } else {
        mistakes++;
        btnEl.classList.add('choice-wrong');
        card.classList.add('sorted-bad-flash');
        setTimeout(function(){
          card.classList.remove('sorted-bad-flash');
          btnEl.classList.remove('choice-wrong');
        }, 500);
        P.showToast('Almost! Look again 🔍', 'bad');
      }
    }
    bFlower.addEventListener('click', function(){ evaluate('flower', bFlower); });
    bNot.addEventListener('click', function(){ evaluate('not-flower', bNot); });
    bFruit.addEventListener('click', function(){ evaluate('fruit', bFruit); });

    grid.appendChild(card);
  });
  container.appendChild(grid);

  var bottomSlot = el('div');
  container.appendChild(bottomSlot);

  function finishUp(){
    bottomSlot.appendChild(stageCompleteBlock(8, mistakes, correctCount,
      'Plants can be flowering or not flowering. Fruit grows from a flowering plant after its flower has done its job!'));
  }
}

/* ---------------- register ----------------
   Function names below still reflect their original numbering
   (initStage4 = Light & Temperature Lab, initStage5 = Plant Detective,
   initStage6 = Final Garden Challenge) but are mapped here to their
   current position in the garden, one slot later, to make room for
   the new "Fill in the Blank" stage at position 4. */
window.STAGE_INIT = {
  1: initStage1,
  2: initStage2,
  3: initStage3,
  4: initStage4FillBlank,
  5: initStage4,
  6: initStage5,
  7: initStage6,
  8: initStage8
};

})();
