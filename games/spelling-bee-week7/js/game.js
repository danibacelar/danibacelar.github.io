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
    mode: 'sentences', // only mode left: Sentence Buzz (Practice/Phase 1/2 disabled — see README)
    phaseIndex: 0,
    roundLabel: '',
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
    document.getElementById('word-definition').textContent = word.hintEN || '';
    // TEMPORARY audio-check aid — remove once the teacher finishes verifying
    // that every word/sentence audio clip matches its text. See README.
    document.getElementById('debug-answer').textContent = 'ANSWER: ' + word.word;
    document.getElementById('btn-next').classList.add('hidden');
    document.getElementById('btn-check').disabled = false;
    document.getElementById('btn-skip').disabled = false;

    updateHeader();
    input.focus();
    playWord(word);
  }

  function tokenize(text) {
    // Commas are stripped from every token (not just the sentence-final
    // punctuation handled by stripTrailingPunct) because this is a
    // spelling exercise, not a punctuation one — comma placement never
    // affects whether an answer counts as correct.
    return text.trim().split(/\s+/).filter(Boolean).map(w => w.replace(/,/g, ''));
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
      results.push({ text: g, ok, correct: cClean, caseSensitive: isProper });
    }
    return { allMatch, results };
  }

  function diffLetters(guess, correct, caseSensitive) {
    const eq = (a, b) => caseSensitive ? a === b : a.toLowerCase() === b.toLowerCase();
    const n = guess.length;
    const m = correct.length;

    // Levenshtein distance table (substitution/insertion/deletion all cost 1).
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = 0; i <= n; i++) dp[i][0] = i;
    for (let j = 0; j <= m; j++) dp[0][j] = j;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = eq(guess[i - 1], correct[j - 1])
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }

    // Backtrack to a letter-by-letter alignment: matches, substitutions,
    // extra typed letters, and missing letters (shown as "_").
    let i = n, j = m;
    const ops = [];
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && eq(guess[i - 1], correct[j - 1]) && dp[i][j] === dp[i - 1][j - 1]) {
        ops.push({ type: 'match', ch: guess[i - 1] });
        i--; j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        ops.push({ type: 'sub', ch: guess[i - 1] });
        i--; j--;
      } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
        ops.push({ type: 'extra', ch: guess[i - 1] });
        i--;
      } else {
        ops.push({ type: 'missing' });
        j--;
      }
    }
    ops.reverse();

    return ops.map(op => {
      if (op.type === 'match') return escapeHtml(op.ch);
      if (op.type === 'missing') return '<span class="word-bad">_</span>';
      return `<span class="word-bad">${escapeHtml(op.ch)}</span>`;
    }).join('');
  }

  function checkAnswer() {
    const input = document.getElementById('spell-input');
    const word = state.words[state.index];
    const rawGuess = input.value.trim();
    if (!rawGuess) return;

    const feedback = document.getElementById('feedback');
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
        .map(r => {
          if (r.ok) return `<span class="word-ok">${escapeHtml(r.text)}</span>`;
          if (r.correct === undefined) return `<span class="word-bad">${escapeHtml(r.text)}</span>`;
          return diffLetters(r.text, r.correct, r.caseSensitive);
        })
        .join(' ');
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

  function startSentences() {
    state.mode = 'sentences';
    state.roundLabel = 'Sentence Buzz';
    state.words = shuffle(SENTENCES);
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.missedWords = [];
    showScreen('game');
    loadWord();
  }

  document.getElementById('btn-sentences').addEventListener('click', () => startSentences());
  document.getElementById('btn-replay').addEventListener('click', () => startSentences());
  document.getElementById('btn-back-start').addEventListener('click', () => {
    document.getElementById('word-audio').pause();
    speechSynthesis.cancel();
    showScreen('start');
  });
  document.getElementById('btn-results-menu').addEventListener('click', () => {
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
