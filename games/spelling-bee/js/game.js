/* =========================================================
   SPELLING BEE — GAME ENGINE
   ========================================================= */
(function () {
  const screens = {
    start: document.getElementById('screen-start'),
    game: document.getElementById('screen-game'),
    challenge: document.getElementById('screen-challenge'),
    results: document.getElementById('screen-results')
  };
  const header = document.getElementById('game-header');

  const state = {
    mode: 'type', // 'type' (Phase 1/2) or 'scramble' (Challenge)
    phaseIndex: 0,
    roundLabel: '',
    words: [],
    index: 0,
    score: 0,
    correctCount: 0,
    missedWords: [],
    wrongOnCurrent: false,
    scramble: null // { letters, slotAssignment, tileUsed, locked } — Challenge only
  };

  function shuffle(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    header.classList.toggle('hidden', name !== 'game' && name !== 'challenge');
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    speechSynthesis.speak(utter);
  }

  let audioCtx = null;

  function playSuccessSound() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = now + i * 0.09;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.26);
      });
    } catch (e) { /* Web Audio unavailable — silently skip the chime */ }
  }

  function burstBeeConfetti() {
    const layer = document.getElementById('confetti-layer');
    const count = 18;
    for (let i = 0; i < count; i++) {
      const bee = document.createElement('span');
      bee.className = 'confetti-bee';
      bee.textContent = '🐝';
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 220;
      bee.style.setProperty('--bee-x', `${Math.cos(angle) * distance}px`);
      bee.style.setProperty('--bee-y', `${Math.sin(angle) * distance}px`);
      bee.style.setProperty('--bee-rot', `${(Math.random() * 720 - 360)}deg`);
      bee.style.setProperty('--bee-size', `${1.2 + Math.random() * 1.4}rem`);
      bee.style.setProperty('--bee-duration', `${0.8 + Math.random() * 0.6}s`);
      layer.appendChild(bee);
      bee.addEventListener('animationend', () => bee.remove());
    }
  }

  function playWord(word) {
    const audioEl = document.getElementById('word-audio');
    if (!word.audio) {
      speak(word.word);
      return;
    }
    audioEl.onerror = () => speak(word.word);
    audioEl.src = `assets/audio/${word.audio}`;
    audioEl.play().catch(() => speak(word.word));
  }

  function updateHeader() {
    document.getElementById('header-progress').textContent =
      `${state.roundLabel} · Word ${state.index + 1} of ${state.words.length}`;
    document.getElementById('header-score').textContent = state.score;
  }

  function loadWord() {
    const word = state.words[state.index];
    state.wrongOnCurrent = false;

    document.getElementById('word-counter-badge').textContent =
      `${state.index + 1} / ${state.words.length}`;

    const input = document.getElementById('spell-input');
    input.value = '';
    input.disabled = false;
    input.classList.remove('shake');

    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('hint-reveal').textContent = '';
    document.getElementById('hint-reveal').classList.add('hidden');
    document.getElementById('btn-next').classList.add('hidden');
    document.getElementById('btn-check').disabled = false;
    document.getElementById('btn-skip').disabled = false;

    updateHeader();
    input.focus();
    playWord(word);
  }

  function tokenize(text) {
    return text.trim().split(/\s+/).filter(Boolean);
  }

  function stripTrailingPunct(w) {
    return w.replace(/[.!?]+$/, '');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function compareWords(guessWords, correctWords, properWords) {
    const isLastCorrectIndex = correctWords.length - 1;
    const len = Math.max(guessWords.length, correctWords.length);
    const results = [];
    let allMatch = guessWords.length === correctWords.length;

    for (let i = 0; i < len; i++) {
      const g = guessWords[i];
      const c = correctWords[i];
      if (g === undefined) { allMatch = false; continue; }
      const gClean = i === isLastCorrectIndex ? stripTrailingPunct(g) : g;
      const cClean = c !== undefined && i === isLastCorrectIndex ? stripTrailingPunct(c) : c;
      const isProper = c !== undefined && properWords.includes(cClean);
      const ok = c !== undefined && (isProper ? gClean === cClean : gClean.toLowerCase() === cClean.toLowerCase());
      if (!ok) allMatch = false;
      results.push({ text: g, ok });
    }
    return { allMatch, results };
  }

  function checkAnswer() {
    const input = document.getElementById('spell-input');
    const word = state.words[state.index];
    const rawGuess = input.value.trim();
    if (!rawGuess) return;

    const feedback = document.getElementById('feedback');
    const hintEl = document.getElementById('hint-reveal');
    const { allMatch, results } = compareWords(tokenize(rawGuess), tokenize(word.word), word.properWords || []);

    if (allMatch) {
      state.score += state.wrongOnCurrent ? 5 : 10;
      state.correctCount++;
      feedback.textContent = '🎉 Correct!';
      feedback.className = 'feedback correct';
      input.disabled = true;
      document.getElementById('btn-check').disabled = true;
      document.getElementById('btn-skip').disabled = true;
      document.getElementById('btn-next').classList.remove('hidden');
      updateHeader();
      playSuccessSound();
      burstBeeConfetti();
    } else {
      state.wrongOnCurrent = true;
      feedback.innerHTML = results
        .map(r => `<span class="${r.ok ? 'word-ok' : 'word-bad'}">${escapeHtml(r.text)}</span>`)
        .join(' ');
      feedback.className = 'feedback incorrect';
      if (word.hintEN) {
        hintEl.textContent = `💡 ${word.hintEN}`;
        hintEl.classList.remove('hidden');
      }
      input.classList.remove('shake');
      requestAnimationFrame(() => input.classList.add('shake'));
      input.select();
    }
  }

  function skipWord() {
    const word = state.words[state.index];
    if (!state.missedWords.includes(word.word)) {
      state.missedWords.push(word.word);
    }
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `The word was: <span class="word-bad">${escapeHtml(word.word)}</span>`;
    feedback.className = 'feedback incorrect';
    document.getElementById('spell-input').disabled = true;
    document.getElementById('btn-check').disabled = true;
    document.getElementById('btn-skip').disabled = true;
    document.getElementById('btn-next').classList.remove('hidden');
  }

  function nextWord() {
    state.index++;
    if (state.index >= state.words.length) {
      showResults();
    } else if (state.mode === 'scramble') {
      loadChallengeWord();
    } else {
      loadWord();
    }
  }

  function showResults() {
    document.getElementById('word-audio').pause();
    speechSynthesis.cancel();
    showScreen('results');
    document.getElementById('results-banner').textContent =
      `🍯 ${state.roundLabel.toUpperCase()} COMPLETE! 🍯`;
    document.getElementById('results-score').textContent = state.score;
    document.getElementById('results-correct').textContent =
      `${state.correctCount}/${state.words.length}`;

    const reviewWrap = document.getElementById('results-review-wrap');
    const reviewList = document.getElementById('results-review-list');
    if (state.missedWords.length) {
      reviewWrap.classList.remove('hidden');
      reviewList.innerHTML = state.missedWords.map(w => `<li>${w}</li>`).join('');
    } else {
      reviewWrap.classList.add('hidden');
    }

    const ratio = state.correctCount / state.words.length;
    const msg = document.getElementById('results-message');
    if (ratio === 1) msg.textContent = 'Perfect! You are the spelling queen bee! 👑🐝';
    else if (ratio >= 0.7) msg.textContent = 'Great job! Keep practicing! 🌻';
    else msg.textContent = 'Good effort! Let\'s practice these words some more. 💪';
  }

  function startGame(phaseIndex) {
    if (phaseIndex !== undefined) state.phaseIndex = phaseIndex;
    state.mode = 'type';
    state.roundLabel = SPELLING_PHASES[state.phaseIndex].name;
    state.words = shuffle(SPELLING_PHASES[state.phaseIndex].words);
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.missedWords = [];
    showScreen('game');
    loadWord();
  }

  /* ===== CHALLENGE — LETTER SCRAMBLE ===== */

  function renderScrambleTiles() {
    const { letters, tileUsed, locked } = state.scramble;
    const tilesEl = document.getElementById('scramble-tiles');
    tilesEl.innerHTML = letters.map((letter, i) => `
      <button type="button" class="scramble-tile${tileUsed[i] ? ' used' : ''}" data-tile-index="${i}" ${locked ? 'disabled' : ''}>${escapeHtml(letter)}</button>
    `).join('');
    tilesEl.querySelectorAll('.scramble-tile').forEach(btn => {
      btn.addEventListener('click', () => handleTileClick(Number(btn.dataset.tileIndex)));
    });
  }

  function renderScrambleSlots() {
    const { slotAssignment, letters } = state.scramble;
    const slotsEl = document.getElementById('scramble-slots');
    slotsEl.innerHTML = slotAssignment.map((tileIndex, i) => {
      const filled = tileIndex !== null;
      const letter = filled ? letters[tileIndex] : '';
      return `<div class="scramble-slot${filled ? ' filled' : ''}" data-slot-index="${i}">${escapeHtml(letter)}</div>`;
    }).join('');
    slotsEl.querySelectorAll('.scramble-slot.filled').forEach(el => {
      el.addEventListener('click', () => handleSlotClick(Number(el.dataset.slotIndex)));
    });
  }

  function handleTileClick(tileIndex) {
    const s = state.scramble;
    if (s.locked || s.tileUsed[tileIndex]) return;
    const emptySlot = s.slotAssignment.indexOf(null);
    if (emptySlot === -1) return;
    s.slotAssignment[emptySlot] = tileIndex;
    s.tileUsed[tileIndex] = true;
    renderScrambleTiles();
    renderScrambleSlots();
    if (s.slotAssignment.every(v => v !== null)) {
      checkChallengeAnswer();
    }
  }

  function handleSlotClick(slotIndex) {
    const s = state.scramble;
    if (s.locked) return;
    const tileIndex = s.slotAssignment[slotIndex];
    if (tileIndex === null) return;
    s.tileUsed[tileIndex] = false;
    s.slotAssignment[slotIndex] = null;
    renderScrambleTiles();
    renderScrambleSlots();
  }

  function checkChallengeAnswer() {
    const word = state.words[state.index];
    const s = state.scramble;
    const assembled = s.slotAssignment.map(i => s.letters[i]).join('');
    const target = word.word.toUpperCase();
    const feedback = document.getElementById('challenge-feedback');
    const hintEl = document.getElementById('challenge-hint');

    if (assembled === target) {
      s.locked = true;
      state.score += state.wrongOnCurrent ? 5 : 10;
      state.correctCount++;
      feedback.textContent = '🎉 Correct!';
      feedback.className = 'feedback correct';
      document.getElementById('scramble-slots').classList.add('correct');
      document.getElementById('btn-challenge-skip').disabled = true;
      document.getElementById('btn-challenge-next').classList.remove('hidden');
      renderScrambleTiles();
      updateHeader();
      playSuccessSound();
      burstBeeConfetti();
    } else {
      state.wrongOnCurrent = true;
      feedback.textContent = '❌ Not quite — try again!';
      feedback.className = 'feedback incorrect';
      if (word.hintEN) {
        hintEl.textContent = `💡 ${word.hintEN}`;
        hintEl.classList.remove('hidden');
      }
      const slotsEl = document.getElementById('scramble-slots');
      slotsEl.classList.remove('shake');
      requestAnimationFrame(() => slotsEl.classList.add('shake'));
      setTimeout(() => {
        s.slotAssignment = s.slotAssignment.map(() => null);
        s.tileUsed = s.tileUsed.map(() => false);
        slotsEl.classList.remove('shake');
        renderScrambleTiles();
        renderScrambleSlots();
      }, 700);
    }
  }

  function skipChallengeWord() {
    const word = state.words[state.index];
    if (!state.missedWords.includes(word.word)) {
      state.missedWords.push(word.word);
    }
    state.scramble.locked = true;
    const feedback = document.getElementById('challenge-feedback');
    feedback.innerHTML = `The word was: <span class="word-bad">${escapeHtml(word.word)}</span>`;
    feedback.className = 'feedback incorrect';
    document.getElementById('btn-challenge-skip').disabled = true;
    document.getElementById('btn-challenge-next').classList.remove('hidden');
    renderScrambleTiles();
  }

  function loadChallengeWord() {
    const word = state.words[state.index];
    state.wrongOnCurrent = false;

    document.getElementById('challenge-counter-badge').textContent =
      `${state.index + 1} / ${state.words.length}`;

    const letters = shuffle(word.word.toUpperCase().split(''));
    state.scramble = {
      letters,
      slotAssignment: letters.map(() => null),
      tileUsed: letters.map(() => false),
      locked: false
    };
    renderScrambleTiles();
    renderScrambleSlots();

    const feedback = document.getElementById('challenge-feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';
    document.getElementById('challenge-hint').textContent = '';
    document.getElementById('challenge-hint').classList.add('hidden');
    document.getElementById('scramble-slots').classList.remove('correct');
    document.getElementById('btn-challenge-next').classList.add('hidden');
    document.getElementById('btn-challenge-skip').disabled = false;

    updateHeader();
    playWord(word);
  }

  function startChallenge() {
    state.mode = 'scramble';
    state.roundLabel = 'Challenge';
    state.words = shuffle(CHALLENGE_WORDS);
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.missedWords = [];
    showScreen('challenge');
    loadChallengeWord();
  }

  document.getElementById('btn-phase-1').addEventListener('click', () => startGame(0));
  document.getElementById('btn-phase-2').addEventListener('click', () => startGame(1));
  document.getElementById('btn-challenge').addEventListener('click', () => startChallenge());
  document.getElementById('btn-replay').addEventListener('click', () => {
    if (state.mode === 'scramble') startChallenge(); else startGame();
  });
  document.getElementById('btn-back-start').addEventListener('click', () => {
    document.getElementById('word-audio').pause();
    speechSynthesis.cancel();
    showScreen('start');
  });

  document.getElementById('spell-form').addEventListener('submit', (e) => {
    e.preventDefault();
    checkAnswer();
  });
  document.getElementById('btn-skip').addEventListener('click', skipWord);
  document.getElementById('btn-next').addEventListener('click', nextWord);
  document.getElementById('btn-listen').addEventListener('click', () => {
    playWord(state.words[state.index]);
  });

  document.getElementById('btn-challenge-skip').addEventListener('click', skipChallengeWord);
  document.getElementById('btn-challenge-next').addEventListener('click', nextWord);
  document.getElementById('btn-challenge-listen').addEventListener('click', () => {
    playWord(state.words[state.index]);
  });
})();
