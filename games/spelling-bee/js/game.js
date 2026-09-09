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

  function updateHeader() {
    document.getElementById('header-progress').textContent =
      `Word ${state.index + 1} of ${state.words.length}`;
    document.getElementById('header-score').textContent = state.score;
  }

  function loadWord() {
    const word = state.words[state.index];
    state.wrongOnCurrent = false;

    document.getElementById('word-counter-badge').textContent =
      `${state.index + 1} / ${state.words.length}`;
    document.getElementById('hint-pt').textContent = word.hintPT || '';
    const hintEnEl = document.getElementById('hint-en');
    hintEnEl.textContent = word.hintEN || '';
    hintEnEl.classList.add('hidden');
    document.getElementById('btn-toggle-hint-en').textContent = '💡 Ver dica em inglês';

    const input = document.getElementById('spell-input');
    input.value = '';
    input.disabled = false;
    input.classList.remove('shake');

    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('btn-next').classList.add('hidden');
    document.getElementById('btn-check').disabled = false;
    document.getElementById('btn-skip').disabled = false;

    updateHeader();
    input.focus();
    speak(word.word);
  }

  function checkAnswer() {
    const input = document.getElementById('spell-input');
    const word = state.words[state.index];
    const guess = input.value.trim().toLowerCase();
    if (!guess) return;

    const feedback = document.getElementById('feedback');

    if (guess === word.word.toLowerCase()) {
      state.score += state.wrongOnCurrent ? 5 : 10;
      state.correctCount++;
      feedback.textContent = '🎉 Correto!';
      feedback.className = 'feedback correct';
      input.disabled = true;
      document.getElementById('btn-check').disabled = true;
      document.getElementById('btn-skip').disabled = true;
      document.getElementById('btn-next').classList.remove('hidden');
      updateHeader();
    } else {
      state.wrongOnCurrent = true;
      feedback.textContent = '❌ Tente de novo!';
      feedback.className = 'feedback incorrect';
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
    feedback.textContent = `A palavra era: ${word.word}`;
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
    speechSynthesis.cancel();
    showScreen('results');
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
    if (ratio === 1) msg.textContent = 'Perfeito! Você é a abelha rainha da ortografia! 👑🐝';
    else if (ratio >= 0.7) msg.textContent = 'Muito bem! Continue praticando! 🌻';
    else msg.textContent = 'Bom esforço! Vamos praticar mais essas palavras. 💪';
  }

  function startGame() {
    state.words = shuffle(SPELLING_WORDS);
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.missedWords = [];
    showScreen('game');
    loadWord();
  }

  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-replay').addEventListener('click', startGame);
  document.getElementById('btn-back-start').addEventListener('click', () => {
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
    speak(state.words[state.index].word);
  });
  document.getElementById('btn-toggle-hint-en').addEventListener('click', (e) => {
    const hintEnEl = document.getElementById('hint-en');
    hintEnEl.classList.toggle('hidden');
    e.target.textContent = hintEnEl.classList.contains('hidden')
      ? '💡 Ver dica em inglês'
      : '🙈 Esconder dica em inglês';
  });
})();
