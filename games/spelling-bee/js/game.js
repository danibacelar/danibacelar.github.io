/* =========================================================
   SPELLING BEE — GAME ENGINE
   ========================================================= */
(function () {
  const screens = {
    start: document.getElementById('screen-start'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
  };
  const header = document.getElementById('game-header');

  const state = {
    phaseIndex: 0,
    words: [],
    index: 0,
    score: 0,
    correctCount: 0,
    missedWords: [],
    wrongOnCurrent: false
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
    header.classList.toggle('hidden', name !== 'game');
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    speechSynthesis.speak(utter);
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
    const phaseName = SPELLING_PHASES[state.phaseIndex].name;
    document.getElementById('header-progress').textContent =
      `${phaseName} · Word ${state.index + 1} of ${state.words.length}`;
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
    } else {
      loadWord();
    }
  }

  function showResults() {
    document.getElementById('word-audio').pause();
    speechSynthesis.cancel();
    showScreen('results');
    document.getElementById('results-banner').textContent =
      `🍯 ${SPELLING_PHASES[state.phaseIndex].name.toUpperCase()} COMPLETE! 🍯`;
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
    state.words = shuffle(SPELLING_PHASES[state.phaseIndex].words);
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.missedWords = [];
    showScreen('game');
    loadWord();
  }

  document.getElementById('btn-phase-1').addEventListener('click', () => startGame(0));
  document.getElementById('btn-phase-2').addEventListener('click', () => startGame(1));
  document.getElementById('btn-replay').addEventListener('click', () => startGame());
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
})();
