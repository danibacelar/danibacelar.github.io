/* =========================================================
   GROWING PLANTS: THE PLANT GARDEN MISSION
   Game logic — vanilla JS, no external libraries.
   ========================================================= */
(function(){
"use strict";

/* ---------------- Utilities ---------------- */
function $(sel, root){ return (root||document).querySelector(sel); }
function $all(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
function el(tag, cls, html){
  var e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html !== undefined) e.innerHTML = html;
  return e;
}
function shuffle(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var t=a[i]; a[i]=a[j]; a[j]=t;
  }
  return a;
}

/* ---------------- Sound (synthesized — no audio files needed) ---------------- */
var audioCtx = null;
function getAudioCtx(){
  try{
    if(!audioCtx){
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      audioCtx = new AC();
    }
    if(audioCtx.state === 'suspended'){ audioCtx.resume(); }
    return audioCtx;
  }catch(e){ return null; }
}
function playCorrectSound(){
  var ctx = getAudioCtx();
  if(!ctx) return;
  var now = ctx.currentTime;
  var notes = [523.25, 659.25, 783.99]; // cheerful C5-E5-G5 arpeggio
  notes.forEach(function(freq, i){
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    var start = now + i * 0.09;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.32);
  });
}
function playGentleSound(){
  var ctx = getAudioCtx();
  if(!ctx) return;
  var now = ctx.currentTime;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(330, now);
  osc.frequency.linearRampToValueAtTime(260, now + 0.18);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

/* Spoken word pronunciation using the browser's built-in Speech Synthesis —
   no audio files needed, works offline once the page is loaded. */
function speakWord(word){
  try{
    if(!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(word);
    utter.lang = 'en-US';
    utter.rate = 0.82;
    utter.pitch = 1.05;
    utter.volume = 1;
    window.speechSynthesis.speak(utter);
  }catch(e){ /* speech synthesis unavailable — silently skip */ }
}

var toastTimer = null;
function showToast(msg, kind){
  var t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show' + (kind ? ' toast-' + kind : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.className = 'toast'; }, 2200);
}

var CONFETTI_EMOJI = ['🌟','🌸','🍃','✨','🌻'];
function spawnConfetti(x, y, count){
  var layer = $('#confetti-layer');
  count = count || 14;
  for(var i=0;i<count;i++){
    var piece = el('div','confetti-piece', CONFETTI_EMOJI[Math.floor(Math.random()*CONFETTI_EMOJI.length)]);
    var angle = Math.random()*Math.PI*2;
    var dist = 60 + Math.random()*90;
    var dx = Math.cos(angle)*dist;
    var dy = Math.sin(angle)*dist - 40;
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.style.setProperty('--ctransform', 'translate('+dx+'px,'+dy+'px)');
    piece.style.setProperty('--crot', (Math.random()*360-180)+'deg');
    layer.appendChild(piece);
    (function(p){ setTimeout(function(){ p.remove(); }, 950); })(piece);
  }
}
function confettiFromElement(elm, count){
  var r = elm.getBoundingClientRect();
  spawnConfetti(r.left + r.width/2, r.top + r.height/2, count);
}

function computeStars(mistakes){
  if(mistakes <= 0) return 3;
  if(mistakes <= 2) return 2;
  return 1;
}

/* ---------------- Persistence ---------------- */
var STORAGE_KEY = 'plantGardenMissionProgress_v1';
function loadState(){
  var base = {
    currentStageId: null,
    totalScore: 0,
    stages: {
      1:{completed:false, stars:0, correct:0},
      2:{completed:false, stars:0, correct:0},
      3:{completed:false, stars:0, correct:0},
      4:{completed:false, stars:0, correct:0},
      5:{completed:false, stars:0, correct:0},
      6:{completed:false, stars:0, correct:0},
      7:{completed:false, stars:0, correct:0},
      8:{completed:false, stars:0, correct:0}
    }
  };
  try{
    var raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      var parsed = JSON.parse(raw);
      if(parsed && parsed.stages) return parsed;
    }
  }catch(e){ /* storage unavailable — ignore */ }
  return base;
}
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE)); }catch(e){ /* ignore */ }
}
var STATE = loadState();

function addScore(points){
  STATE.totalScore += points;
  saveState();
  var hs = $('#header-score'); if(hs) hs.textContent = STATE.totalScore;
  var ms = $('#menu-score'); if(ms) ms.textContent = STATE.totalScore;
}

function finishStage(stageId, mistakes, correctCount){
  var stars = computeStars(mistakes);
  var s = STATE.stages[stageId];
  if(!s.completed || stars > s.stars){ s.stars = stars; }
  s.completed = true;
  s.correct = Math.max(s.correct, correctCount);
  saveState();
  return stars;
}

/* ---------------- Screen navigation ---------------- */
function showScreen(id){
  $all('.screen').forEach(function(s){ s.classList.remove('active'); });
  $('#'+id).classList.add('active');
  var header = $('#game-header');
  if(id === 'screen-stage'){ header.classList.remove('hidden'); }
  else { header.classList.add('hidden'); }
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant':'auto'});
}

function goToMenu(){
  renderMenu();
  showScreen('screen-menu');
}

function goToStage(stageId){
  STATE.currentStageId = stageId;
  saveState();
  var meta = STAGE_META[stageId-1];
  $('#header-stage-title').textContent = meta.icon + ' ' + meta.title;
  $('#header-score').textContent = STATE.totalScore;
  showScreen('screen-stage');
  var container = $('#stage-container');
  container.innerHTML = '';
  STAGE_INIT[stageId](container);
}

function goToResults(){
  renderResults();
  showScreen('screen-results');
}

/* ---------------- Stage metadata (for menu) ---------------- */
var STAGE_META = [
  {id:1, title:'Plant Parts', sub:'Label the plant', icon:'🌱', theme:'theme-1'},
  {id:2, title:'Healthy Plant', sub:'Sort healthy & unhealthy', icon:'🌿', theme:'theme-2'},
  {id:3, title:'Water Journey', sub:'Follow the water', icon:'💧', theme:'theme-3'},
  {id:4, title:'Fill in the Blank', sub:'Complete the sentences', icon:'✏️', theme:'theme-4'},
  {id:5, title:'Light & Temperature Lab', sub:'Check the conditions', icon:'☀️', theme:'theme-5'},
  {id:6, title:'Plant Detective', sub:'True or false?', icon:'🔍', theme:'theme-6'},
  {id:7, title:'Final Garden Challenge', sub:'Help every plant', icon:'🏆', theme:'theme-7'},
  {id:8, title:'Plant Safari', sub:'Flower, fruit, or not?', icon:'🌻', theme:'theme-8'}
];

// Migration safety-net: if a saved session predates this stage list
// (e.g. missing the newer "Fill in the Blank" stage), fill in any
// missing per-stage entries so the rest of the app can rely on
// STATE.stages[meta.id] always existing.
STAGE_META.forEach(function(meta){
  if(!STATE.stages[meta.id]){
    STATE.stages[meta.id] = {completed:false, stars:0, correct:0};
  }
});
saveState();

function renderMenu(){
  var pathEl = $('#garden-path');
  pathEl.innerHTML = '';
  var doneCount = 0;
  STAGE_META.forEach(function(meta){
    var s = STATE.stages[meta.id];
    if(s.completed) doneCount++;
    var btn = el('button', 'stage-node ' + meta.theme);
    btn.setAttribute('type','button');
    var starsStr = s.completed ? '⭐'.repeat(s.stars) + '☆'.repeat(3-s.stars) : '☆☆☆';
    btn.innerHTML =
      '<div class="node-icon">'+meta.icon+'</div>'+
      '<div class="node-body">'+
        '<div class="node-title">'+meta.title+'</div>'+
        '<div class="node-sub">'+meta.sub+'</div>'+
        '<div class="node-stars">'+starsStr+'</div>'+
      '</div>' +
      (s.completed ? '<div class="node-check">✓</div>' : '');
    btn.addEventListener('click', function(){ goToStage(meta.id); });
    pathEl.appendChild(btn);
  });
  $('#menu-progress-text').textContent = doneCount + ' of ' + STAGE_META.length + ' gardens explored';
  $('#menu-score').textContent = STATE.totalScore;
}

function renderResults(){
  var totalStars = 0, totalCorrect = 0;
  STAGE_META.forEach(function(meta){
    var s = STATE.stages[meta.id];
    totalStars += s.stars;
    totalCorrect += s.correct;
  });
  $('#results-stars').textContent = totalStars;
  $('#results-correct').textContent = totalCorrect;

  var badgesEl = $('#results-badges');
  badgesEl.innerHTML = '';
  STAGE_META.forEach(function(meta){
    var s = STATE.stages[meta.id];
    var b = el('div','result-badge');
    var starsStr = s.completed ? '⭐'.repeat(s.stars) + '☆'.repeat(3-s.stars) : '— not yet';
    b.innerHTML = '<span>'+meta.icon+'</span><span>'+meta.title+'</span><span class="rb-stars">'+starsStr+'</span>';
    badgesEl.appendChild(b);
  });

  var msg;
  if(totalStars >= 15){
    msg = "Wow, amazing work! 🌟 You are a true Plant Scientist. You know all about roots, water, light, and healthy plants!";
  } else if(totalStars >= 9){
    msg = "Great job! 🌱 You learned so much about plants. Play a few more challenges to earn even more stars!";
  } else {
    msg = "Good work! 🌻 Your plants need a little more practice. Try the challenges again to grow more stars!";
  }
  $('#results-message').textContent = msg;
}

/* ---------------- Generic Pointer Drag Helper ----------------
   Makes `draggable` elements moveable with mouse/touch/pen using
   Pointer Events. On release, hit-tests against elements matching
   `dropSelector` inside `container` and calls onDrop(zoneEl|null, draggableEl).
------------------------------------------------------------- */
function enableDrag(draggableEl, container, dropSelector, onDrop){
  var startX, startY, origX, origY, dragging = false;

  draggableEl.style.touchAction = 'none';

  draggableEl.addEventListener('pointerdown', function(ev){
    if(draggableEl.classList.contains('placed')) return;
    dragging = true;
    draggableEl.setPointerCapture(ev.pointerId);
    draggableEl.classList.add('dragging');
    var rect = draggableEl.getBoundingClientRect();
    origX = rect.left; origY = rect.top;
    startX = ev.clientX; startY = ev.clientY;
    draggableEl.style.position = 'fixed';
    draggableEl.style.left = origX + 'px';
    draggableEl.style.top = origY + 'px';
    draggableEl.style.width = rect.width + 'px';
    draggableEl.style.margin = '0';
  });

  draggableEl.addEventListener('pointermove', function(ev){
    if(!dragging) return;
    var dx = ev.clientX - startX;
    var dy = ev.clientY - startY;
    draggableEl.style.left = (origX + dx) + 'px';
    draggableEl.style.top = (origY + dy) + 'px';
  });

  function endDrag(ev){
    if(!dragging) return;
    dragging = false;
    draggableEl.classList.remove('dragging');
    try{ draggableEl.releasePointerCapture(ev.pointerId); }catch(e){}

    // hit test: temporarily hide dragged element from pointer-events
    draggableEl.style.pointerEvents = 'none';
    var elAtPoint = document.elementFromPoint(ev.clientX, ev.clientY);
    draggableEl.style.pointerEvents = '';

    var zone = null;
    if(elAtPoint){
      zone = elAtPoint.closest(dropSelector);
      if(zone && container && !container.contains(zone)) zone = null;
    }
    onDrop(zone, draggableEl);
  }

  draggableEl.addEventListener('pointerup', endDrag);
  draggableEl.addEventListener('pointercancel', endDrag);
}

function resetDraggablePosition(draggableEl){
  draggableEl.style.position = '';
  draggableEl.style.left = '';
  draggableEl.style.top = '';
  draggableEl.style.width = '';
  draggableEl.style.margin = '';
}

/* expose namespace used by stage modules defined in game-stages.js */
window.PGM = {
  $: $, $all: $all, el: el, shuffle: shuffle,
  showToast: showToast, spawnConfetti: spawnConfetti, confettiFromElement: confettiFromElement,
  playCorrectSound: playCorrectSound, playGentleSound: playGentleSound, speakWord: speakWord,
  computeStars: computeStars, STATE: STATE, addScore: addScore, finishStage: finishStage,
  goToMenu: goToMenu, goToStage: goToStage, goToResults: goToResults,
  enableDrag: enableDrag, resetDraggablePosition: resetDraggablePosition,
  STAGE_META: STAGE_META
};

/* ---------------- Boot ---------------- */
document.addEventListener('DOMContentLoaded', function(){
  $('#btn-start').addEventListener('click', function(){ goToMenu(); showScreen('screen-menu'); });
  $('#btn-back-menu').addEventListener('click', goToMenu);
  $('#btn-see-results').addEventListener('click', goToResults);
  $('#btn-replay').addEventListener('click', function(){
    STATE.totalScore = 0;
    STAGE_META.forEach(function(m){ STATE.stages[m.id] = {completed:false, stars:0, correct:0}; });
    saveState();
    goToMenu();
  });
  $('#btn-to-garden').addEventListener('click', goToMenu);

  if(STATE.stages && Object.keys(STATE.stages).some(function(k){ return STATE.stages[k].completed; })){
    // returning player: still start at the start screen per spec, menu reachable after clicking play
  }
});

})();
