/* MISSION STARLIGHT — game engine */
(function () {
  'use strict';
  var LEVELS = window.LEVELS, PASSAGES = window.PASSAGES, K = window.Check;
  var KEY = 'starlight_mrsdani_v1';

  /* ---------------- tiny helpers ---------------- */
  function h(tag, props) {
    var el = document.createElement(tag);
    if (props) for (var k in props) {
      var v = props[k];
      if (v === false || v == null) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mimg(n, cls) { return h('img', { src: 'img/m' + n + '.png', alt: 'Captain Nova', class: cls || '' }); }
  function isScored(it) { return it.type !== 'card' && it.type !== 'wordcheck' && it.type !== 'final'; }

  /* ---------------- state ---------------- */
  var S = fresh();
  function fresh() {
    return { name: '', li: 0, qi: 0, run: 0, best: {}, prog: {}, inLevel: false, lives: 3, wrong: 0, recharged: false, stars: [], infinite: false, sound: true, started: false };
  }
  function totalXp() {
    var t = 0;
    for (var i = 0; i < LEVELS.length; i++) {
      var b = S.best[i] || 0;
      if (S.prog[i]) b = Math.max(b, S.prog[i].run || 0);
      if (S.inLevel && i === S.li) b = Math.max(b, S.run);
      t += b;
    }
    return t;
  }
  function stash() {
    var lv = LEVELS[S.li];
    if (S.inLevel && lv && S.qi > 0 && S.qi < lv.items.length) S.prog[S.li] = { qi: S.qi, lives: S.lives, wrong: S.wrong, recharged: S.recharged, run: S.run };
    S.inLevel = false; S.lives = 3; save();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function load() { try { var r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function wipe() { try { localStorage.removeItem(KEY); } catch (e) { } }

  /* ---------------- sound ---------------- */
  var ac = null, curAudio = null, curBtn = null;
  function tone(freqs, dur, type, vol) {
    if (!S.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var t = ac.currentTime; dur = dur || 0.12;
      freqs.forEach(function (f, i) {
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = type || 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(vol || 0.13, t + i * dur);
        g.gain.exponentialRampToValueAtTime(0.001, t + i * dur + dur);
        o.connect(g); g.connect(ac.destination); o.start(t + i * dur); o.stop(t + i * dur + dur);
      });
    } catch (e) { }
  }
  var sfx = {
    good: function () { tone([659, 880, 1175], 0.1); },
    bad: function () { tone([240, 170], 0.17, 'sawtooth', 0.07); },
    win: function () { tone([523, 659, 784, 1047, 784, 1047], 0.13); }
  };
  function stopAudio() {
    if (curAudio) { try { curAudio.pause(); } catch (e) { } curAudio = null; }
    if (curBtn) { curBtn.classList.remove('playing'); curBtn = null; }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { }
  }
  function playAudio(src, rate, btn, onend) {
    stopAudio();
    try {
      var a = new Audio(src); a.playbackRate = rate || 1; curAudio = a;
      if (btn) { btn.classList.add('playing'); curBtn = btn; }
      a.onended = function () { if (btn) btn.classList.remove('playing'); if (curAudio === a) curAudio = null; if (onend) onend(); };
      var p = a.play(); if (p && p.catch) p.catch(function () { toast('Tap the play button again 🔊'); if (btn) btn.classList.remove('playing'); });
    } catch (e) { }
  }
  function audioRow(src) {
    var row = h('div', { class: 'audio-row' });
    var b1 = h('button', { class: 'play', type: 'button', onclick: function () { playAudio(src, 1, b1); } }, '▶ Play');
    row.appendChild(b1);
    if (!/audio\/w\d+/.test(src)) {
      var b2 = h('button', { class: 'play slow', type: 'button', onclick: function () { playAudio(src, 0.8, b2); } }, '🐢 Slow');
      row.appendChild(b2);
    }
    return row;
  }
  function speakText(txt) {
    try {
      var ss = window.speechSynthesis; if (!ss) return; stopAudio();
      var u = new SpeechSynthesisUtterance(txt); u.lang = 'en-US'; u.rate = 0.85;
      var v = (ss.getVoices() || []).filter(function (x) { return /^en/i.test(x.lang); })[0]; if (v) u.voice = v;
      ss.speak(u);
    } catch (e) { }
  }

  /* ---------------- shell ---------------- */
  var stage, hud;
  function toast(msg, ms) {
    var t = h('div', { class: 'toast' }, msg); document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, ms || 2600);
  }
  function floatXp(n) {
    var el = h('div', { class: 'floatxp' }, '+' + n + ' XP');
    var r = document.getElementById('xpPill'); var b = r ? r.getBoundingClientRect() : { left: 200, top: 60 };
    el.style.left = (b.left + 10) + 'px'; el.style.top = (b.top + 30) + 'px';
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 1200);
  }
  function confetti(n) {
    var em = ['⭐', '✨', '🌟', '🚀', '🪐', '💫'];
    for (var i = 0; i < (n || 36); i++) {
      var c = h('div', { class: 'confetti' }, pick(em));
      c.style.left = Math.random() * 100 + 'vw'; c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
      c.style.animationDelay = Math.random() * 0.8 + 's'; c.style.fontSize = (20 + Math.random() * 22) + 'px';
      document.body.appendChild(c); setTimeout((function (x) { return function () { x.remove(); }; })(c), 5200);
    }
  }
  function go(node) { stopAudio(); stage.replaceChildren(node); window.scrollTo(0, 0); updateHud(); }

  function buildHud() {
    hud = h('header', { class: 'hud' },
      h('div', { class: 'brand' }, '🚀 MISSION STARLIGHT'),
      h('div', { class: 'dots', id: 'dots' }),
      h('div', { class: 'pill xp', id: 'xpPill' }),
      h('div', { class: 'pill hearts', id: 'hearts', title: 'Hearts' }),
      h('button', { class: 'icon-btn', id: 'sndBtn', type: 'button', title: 'Sound', onclick: function () { S.sound = !S.sound; save(); updateHud(); } }),
      h('button', { class: 'icon-btn', type: 'button', title: 'Teacher menu', onclick: openTeacher }, '⚙️'));
    document.getElementById('app').insertBefore(hud, stage);
  }
  function updateHud() {
    if (!hud) return;
    var dots = document.getElementById('dots'); dots.replaceChildren();
    LEVELS.forEach(function (lv, i) {
      var cls = 'dot' + (S.started && S.inLevel && i === S.li ? ' on' : '') + (S.stars[i] != null ? ' done' : '');
      dots.appendChild(h('button', { class: cls, type: 'button', title: lv.name + ' — back to the menu', onclick: function () { if (S.started) toMenu(); } }, i === 0 ? '📡' : (i === LEVELS.length - 1 ? '🏅' : String(i))));
    });
    document.getElementById('xpPill').textContent = '⭐ ' + totalXp() + ' XP';
    document.getElementById('hearts').textContent = !S.inLevel ? '' : (S.infinite ? '❤️ ∞' : '❤️'.repeat(Math.max(0, S.lives)) + '🖤'.repeat(Math.max(0, 3 - S.lives)));
    document.getElementById('hearts').style.display = S.inLevel ? '' : 'none';
    document.getElementById('sndBtn').textContent = S.sound ? '🔊' : '🔇';
  }

  /* ---------------- home ---------------- */
  function showHome() {
    var saved = load();
    var input = h('input', { type: 'text', placeholder: 'Your cadet name', maxlength: '24', 'aria-label': 'Cadet name', value: (saved && saved.name) || '' });
    var box = h('div', { class: 'hero' },
      h('h1', null, 'MISSION STARLIGHT'), h('h2', null, 'Cadet Training'),
      mimg(1, 'mascot'),
      h('p', { style: 'font-size:22px;font-weight:800;margin:0' }, 'Welcome, Space Cadet! Are you ready for your mission?'),
      h('div', { class: 'namebox' }, input,
        h('button', { class: 'btn', type: 'button', onclick: function () {
          var nm = input.value.trim(); if (!nm) { input.focus(); input.classList.add('shake'); setTimeout(function () { input.classList.remove('shake'); }, 400); return; }
          S = fresh(); S.name = nm; S.started = true; save(); sfx.good(); showMenu();
        } }, '🚀 Start Mission')));
    if (saved && saved.started) {
      box.appendChild(h('div', null, h('button', { class: 'btn alt sm', type: 'button', onclick: function () {
        S = Object.assign(fresh(), saved); S.started = true; if (!S.best) S.best = {}; if (!S.prog) S.prog = {}; stash(); showMenu();
      } }, '↻ Continue as ' + (saved.name || 'Cadet') + ' (' + (function () { var t = 0; for (var k in (saved.best || {})) t += saved.best[k]; return t; })() + ' XP)')));
    }
    go(box);
  }
  /* ---------------- level intro ---------------- */
  function toMenu() { stash(); showMenu(); }
  function backBtn() { return h('button', { class: 'btn sm soft', type: 'button', onclick: toMenu }, '☰ Menu'); }

  function showMenu() {
    S.inLevel = false; S.lives = 3; save();
    var grid = h('div', { class: 'mapgrid' });
    LEVELS.forEach(function (lv, i) {
      var n = lv.items.filter(isScored).length, st = S.stars[i], pr = S.prog[i];
      var badge = st != null ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : (pr ? '● in progress' : (lv.id === 'final' ? '🎤 speaking + certificate' : 'NEW'));
      var meta = lv.id === 'final' ? '⏱ about ' + lv.mins + ' min' : '⏱ ' + lv.mins + ' min · ✏️ ' + n + ' exercises';
      grid.appendChild(h('button', { class: 'mapcard' + (st != null ? ' done' : '') + (lv.boss ? ' boss' : ''), type: 'button', onclick: function () { sfx.good(); openLevel(i); } },
        h('div', { class: 'mc-ic' }, lv.icon), h('div', { class: 'mc-t' }, lv.name), h('div', { class: 'mc-s' }, lv.sub),
        h('div', { class: 'mc-m' }, meta), h('div', { class: 'mc-b' }, badge)));
    });
    go(h('div', null,
      h('section', { class: 'card' },
        h('div', { class: 'cardhead' }, mimg(1), h('div', null,
          h('div', { class: 'tag' }, 'Mission map'),
          h('h2', { class: 'big' }, 'Choose your mission, ' + (S.name || 'Cadet') + '!'),
          h('p', { style: 'margin:4px 0 0;font-weight:700;color:#5d6499' }, 'Pick any level you want to practice. New here? Start with the Briefing 📡'))),
        grid)));
  }

  function openLevel(i) {
    S.li = i; S.inLevel = false; save();
    if (LEVELS[i].id === 'final') return showFinal();
    showIntro();
  }

  function showIntro() {
    var lv = LEVELS[S.li], pr = S.prog[S.li];
    if (lv.id === 'final') return showFinal();
    var n = lv.items.filter(isScored).length;
    function startFresh() { S.qi = 0; S.lives = 3; S.wrong = 0; S.recharged = false; S.run = 0; S.inLevel = true; delete S.prog[S.li]; save(); sfx.good(); showQuestion(); }
    function cont() { S.qi = pr.qi; S.lives = pr.lives; S.wrong = pr.wrong; S.recharged = pr.recharged; S.run = pr.run; S.inLevel = true; delete S.prog[S.li]; save(); sfx.good(); showQuestion(); }
    var btns = h('div', { class: 'checkrow' });
    if (pr) {
      btns.appendChild(h('button', { class: 'btn', type: 'button', onclick: cont }, '↻ Continue (exercise ' + (pr.qi + 1) + ')'));
      btns.appendChild(h('button', { class: 'btn alt', type: 'button', onclick: startFresh }, 'Start over'));
    } else {
      btns.appendChild(h('button', { class: 'btn', type: 'button', onclick: startFresh }, lv.boss ? '⚔️ Start the battle!' : "Let's go! →"));
    }
    btns.appendChild(backBtn());
    go(h('section', { class: 'card intro' },
      mimg(lv.mascot || 1),
      h('div', null,
        h('div', { class: 'lvl' }, lv.icon + ' ' + lv.sub),
        h('h2', null, lv.name),
        h('div', { class: 'bubble' }, lv.intro),
        h('div', { class: 'meta' }, '⏱ about ' + lv.mins + ' min  ·  ✏️ ' + n + ' exercises  ·  ❤️ 3 hearts'),
        btns)));
  }

  /* ---------------- question engine ---------------- */
  var PRAISE = ['Great job!', 'Excellent!', 'Perfect!', 'Awesome, Cadet!', 'You got it!', 'Super!', 'Stellar!'];

  function modelText(it) {
    if (it.model) return it.model;
    if (it.type === 'choice') { var o = it.options[it.answer]; return typeof o === 'string' ? o : ''; }
    if (it.type === 'type') return it.sentence ? K.fill(it.sentence, it.answers[0]) : it.answers[0];
    if (it.type === 'order') return it.answer + (it.end || '');
    if (it.type === 'letters') return it.word;
    return '';
  }

  function showQuestion() {
    var lv = LEVELS[S.li], it = lv.items[S.qi];
    if (!it) return levelDone();
    if (it.type === 'final') return showFinal();
    save();
    var scored = isScored(it);
    var total = lv.items.filter(isScored).length;
    var n = lv.items.slice(0, S.qi).filter(isScored).length + (scored ? 1 : 0);

    S.inLevel = true;
    var card = h('section', { class: 'card' });
    card.appendChild(h('div', { class: 'q-top' },
      backBtn(),
      h('span', { class: 'tag' }, it.tag || 'Mission'),
      scored ? h('span', { class: 'counter' }, 'Exercise ' + n + ' / ' + total) : null));
    card.appendChild(h('div', { class: 'bar' }, h('i', { style: 'width:' + Math.round((scored ? n - 1 : n) / total * 100) + '%' })));

    var ctx = { it: it, att: 0, locked: false, card: card, lockUI: function () { }, fbBox: h('div', { class: 'fb', hidden: true }) };
    var passHolder = h('div'); ctx.passHolder = passHolder; ctx.passNode = null;
    if (it.passage) {
      ctx.passNode = passageNode(it.passage);
      if (!it.hidePassage) passHolder.appendChild(ctx.passNode);
    }
    card.appendChild(passHolder);
    if (it.audio && it.type !== 'card') card.appendChild(audioRow(it.audio));

    var body = h('div'); card.appendChild(body); ctx.body = body;
    card.appendChild(ctx.fbBox);

    ctx.next = function () { S.qi++; showQuestion(); };

    ctx.showFb = function (kind, title, lines, finished, mascot, gain) {
      var tx = h('div', { class: 'tx' }, h('h4', null, title));
      (lines || []).forEach(function (l) { if (l) tx.appendChild(h('p', { class: l.cls || '' }, l.t)); });
      var fb = ctx.fbBox; fb.className = 'fb ' + kind; fb.hidden = false; fb.replaceChildren(mimg(mascot || 1), tx);
      if (finished) tx.appendChild(h('div', { style: 'margin-top:8px' }, h('button', { class: 'btn go', type: 'button', onclick: ctx.next, id: 'nextBtn' }, 'Continue →')));
      setTimeout(function () { try { fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { } }, 40);
    };
    ctx.clearFb = function () { ctx.fbBox.hidden = true; };

    ctx.evidence = function () {
      if (!it.passage || it.ev == null) return;
      if (it.hidePassage && !ctx.passNode.parentNode) passHolder.appendChild(ctx.passNode);
      var evs = [].concat(it.ev);
      evs.forEach(function (i) { var s = ctx.passNode.querySelector('[data-i="' + i + '"]'); if (s) { s.classList.remove('hintflash'); s.classList.add('ev'); } });
      var old = ctx.passNode.querySelector('.ev-note'); if (old) old.remove();
      ctx.passNode.appendChild(h('div', { class: 'ev-note' }, '🔎 Evidence in the text: sentence ' + evs.join(' + ')));
    };

    ctx.ok = function () {
      if (ctx.locked) return; ctx.locked = true; ctx.lockUI();
      var base = it.xp || 10, gain = ctx.att === 0 ? base : (ctx.att === 1 ? Math.round(base * 0.6) : Math.round(base * 0.3));
      S.run += gain; updateHud(); floatXp(gain); sfx.good(); save();
      var lines = [];
      var m = modelText(it);
      if (m && it.type !== 'match') lines.push({ t: (it.type === 'choice' && !it.model ? '✔ ' : '✔ ') + m, cls: 'model' });
      ctx.evidence();
      ctx.showFb('good', ctx.att === 0 ? pick(PRAISE) : 'Good! You fixed it!', lines, true, pick([2, 6]), gain);
    };

    ctx.bad = function (hint, opts) {
      if (ctx.locked) return; opts = opts || {};
      ctx.att++; S.wrong++; sfx.bad();
      var empty = false;
      if (!opts.free && !S.infinite) { S.lives = Math.max(0, S.lives - 1); if (S.lives === 0) empty = true; }
      updateHud(); save();
      if (it.passage && it.ev != null && ctx.att >= 2 && !it.hidePassage) {
        [].concat(it.ev).forEach(function (i) { var s = ctx.passNode.querySelector('[data-i="' + i + '"]'); if (s) s.classList.add('hintflash'); });
      }
      var reveal = ctx.att >= 3 && !opts.noReveal;
      var generic = it.hint || 'Think again and try once more!';
      var hintTxt = hint || generic;
      if (reveal) {
        ctx.locked = true; ctx.lockUI(); ctx.evidence();
        ctx.showFb('bad', "Let's learn it together!", [{ t: 'The answer is:  ' + modelText(it), cls: 'model' }, { t: hintTxt, cls: 'hint' }], true, 4);
      } else {
        ctx.showFb('bad', ctx.att === 1 ? 'Not yet!  Try again.' : 'Almost! Try again.', [{ t: hintTxt, cls: 'hint' }], false, ctx.att === 1 ? 5 : 4);
      }
      if (empty) {
        if (LEVELS[S.li].boss) { setTimeout(bossDefeat, 900); }
        else { S.lives = 3; S.recharged = true; updateHud(); toast('💔 No hearts left! Captain Nova recharged you ❤️❤️❤️ (keep going!)', 3600); }
      }
    };

    var R = { sort: rSort, choice: rChoice, type: rType, open: rType, order: rOrder, letters: rOrder, match: rMatch, wordcheck: rWordcheck, card: rCard }[it.type];
    R(it, ctx, body);
    go(card);
  }

  /* ---------------- passage ---------------- */
  function passageNode(pid) {
    var p = PASSAGES[pid];
    var head = h('div', { class: 'p-head' }, h('strong', null, '📖 ' + p.title));
    if (window.speechSynthesis && !/script/i.test(p.title)) head.appendChild(h('button', { class: 'play slow', type: 'button', style: 'padding:4px 14px;font-size:15px', onclick: function () { speakText(p.s.join(' ')); } }, '🔊 Read to me'));
    var box = h('div', { class: 'passage' }, head);
    var para = h('div'); box.appendChild(para);
    p.s.forEach(function (t, i) { para.appendChild(h('span', { class: 'sent', 'data-i': String(i + 1) }, h('sup', null, String(i + 1)), ' ' + t + ' ')); });
    return box;
  }

  /* ---------------- renderers ---------------- */
  function promptNode(it) {
    var p = h('div', { class: 'prompt' }), blank = null;
    if (it.prompt && it.prompt.indexOf('___') > -1) {
      var parts = it.prompt.split('___');
      blank = h('span', { class: 'blank' }, '     ');
      p.appendChild(document.createTextNode(parts[0])); p.appendChild(blank); p.appendChild(document.createTextNode(parts.slice(1).join('___')));
    } else if (it.prompt) p.appendChild(document.createTextNode(it.prompt));
    return { node: p, blank: blank };
  }

  function rChoice(it, ctx, body) {
    var pn = promptNode(it);
    if (it.img) body.appendChild(h('img', { class: 'qimg', src: it.img, alt: '' }));
    body.appendChild(pn.node);
    var hasImgOpts = it.options.some(function (o) { return typeof o === 'object'; });
    var list = it.options.map(function (o, i) { return { o: typeof o === 'string' ? { text: o } : o, i: i }; });
    if (!it.keepOrder) list = shuffle(list);
    var wrap = h('div', { class: 'opts ' + (it.bank ? 'bank' : (hasImgOpts ? 'pics' : 'cols')) });
    var btns = [];
    list.forEach(function (x) {
      var b = h('button', { class: 'opt', type: 'button', onclick: function () {
        if (ctx.locked) return;
        if (x.i === it.answer) {
          b.classList.add('right');
          if (pn.blank) pn.blank.textContent = x.o.text;
          ctx.ok();
        } else { b.classList.add('wrong'); b.disabled = true; ctx.bad(); }
      } }, x.o.img ? h('img', { src: x.o.img, alt: '' }) : x.o.text);
      btns.push(b); wrap.appendChild(b);
    });
    ctx.lockUI = function () { btns.forEach(function (b) { b.disabled = true; }); btns.forEach(function (b, i) { if (list[i].i === it.answer) b.classList.add('right'); }); };
    body.appendChild(wrap);
  }

  function rType(it, ctx, body) {
    if (it.img) body.appendChild(h('img', { class: 'qimg', src: it.img, alt: '' }));
    if (it.prompt) body.appendChild(h('p', { class: 'prompt' }, it.prompt));
    if (it.given) body.appendChild(h('div', { class: 'given' }, it.given));
    var input = h('input', { class: 'ans', type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': 'Your answer' });
    if (it.sentence) {
      var parts = it.sentence.split('___');
      body.appendChild(h('div', { class: 'typeline' }, parts[0], input, (parts[1] || '').trim(), it.verb ? h('span', { class: 'verb' }, '(' + it.verb + ')') : null));
    } else { input.classList.add('wide'); body.appendChild(h('div', { class: 'typeline' }, input)); }
    function check() {
      if (ctx.locked) return;
      var v = input.value.trim();
      if (!v) { input.classList.add('shake'); setTimeout(function () { input.classList.remove('shake'); }, 400); input.focus(); return; }
      if (it.type === 'open') {
        var r = K.checkOpen(it, v);
        if (r.ok) { input.classList.add('ok'); input.disabled = true; ctx.ok(); }
        else ctx.bad(r.short ? 'Write a longer answer — at least ' + it.minWords + ' words. ' + (it.hint || '') : (K.apostropheHint(v) || it.hint));
      } else {
        if (K.checkType(it, v)) { input.classList.add('ok'); input.disabled = true; ctx.ok(); }
        else ctx.bad(K.apostropheHint(v) || it.hint);
      }
    }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    var btn = h('button', { class: 'btn alt', type: 'button', onclick: check }, 'Check ✓');
    body.appendChild(h('div', { class: 'checkrow' }, btn));
    ctx.lockUI = function () { input.disabled = true; btn.disabled = true; };
    setTimeout(function () { try { input.focus(); } catch (e) { } }, 80);
  }

  function rOrder(it, ctx, body) {
    var isL = it.type === 'letters';
    if (it.img) body.appendChild(h('img', { class: 'qimg', src: it.img, alt: '', style: 'max-width:220px' }));
    body.appendChild(h('p', { class: 'prompt' }, it.prompt || (isL ? 'Put the letters in order.' : 'Put the words in the correct order.')));
    if (it.given) body.appendChild(h('div', { class: 'given' }, it.given));
    var src = isL ? it.word.split('') : it.words.slice();
    var order = shuffle(src.map(function (t, i) { return { t: t, i: i }; })), tries = 0;
    while (src.length > 1 && order.every(function (o, k) { return o.i === k; }) && tries++ < 12) order = shuffle(order);
    var placed = [];
    var line = h('div', { class: 'line' + (isL ? ' letters' : '') });
    var chips = h('div', { class: 'chips' + (isL ? ' letters' : '') });
    function draw() {
      line.replaceChildren();
      if (!placed.length) line.appendChild(h('span', { style: 'color:#9aa0d0;font-weight:800' }, isL ? 'Tap the letters…' : 'Tap the words in order…'));
      placed.forEach(function (o) {
        line.appendChild(h('button', { class: 'chip placed', type: 'button', onclick: function () { if (ctx.locked) return; placed = placed.filter(function (p) { return p !== o; }); draw(); } }, o.t));
      });
      if (it.end && !isL) line.appendChild(h('span', { class: 'end' }, it.end));
      chips.replaceChildren();
      order.forEach(function (o) {
        var used = placed.indexOf(o) > -1;
        chips.appendChild(h('button', { class: 'chip' + (used ? ' used' : ''), type: 'button', disabled: used, onclick: function () { if (ctx.locked) return; placed.push(o); draw(); } }, o.t));
      });
    }
    draw();
    body.appendChild(line); body.appendChild(chips);
    var check = h('button', { class: 'btn alt', type: 'button', onclick: function () {
      if (ctx.locked) return;
      if (placed.length !== src.length) { toast(isL ? 'Use all the letters!' : 'Use all the words!'); return; }
      var arr = placed.map(function (o) { return o.t; });
      var ok = isL ? K.checkLetters(it, arr) : K.checkOrder(it, arr);
      if (ok) ctx.ok(); else { line.classList.add('shake'); setTimeout(function () { line.classList.remove('shake'); }, 400); ctx.bad(it.hint); }
    } }, 'Check ✓');
    var clear = h('button', { class: 'btn ghost sm', type: 'button', style: 'color:#5d6499;border-color:#d9defa', onclick: function () { if (!ctx.locked) { placed = []; draw(); } } }, '↺ Clear');
    body.appendChild(h('div', { class: 'checkrow' }, check, clear));
    ctx.lockUI = function () { check.disabled = true; clear.disabled = true; placed = order.slice().sort(function (a, b) { return a.i - b.i; }); draw(); chips.querySelectorAll('button').forEach(function (b) { b.disabled = true; }); };
  }

  function rSort(it, ctx, body) {
    body.appendChild(h('p', { class: 'prompt' }, it.prompt));
    var cards = shuffle(it.cards.map(function (c, i) { return { c: c, i: i }; })), sel = null, left = cards.length, mistakes = 0;
    var pool = h('div', { class: 'sortcards' }), cols = h('div', { class: 'sortcols' }), lists = [];
    function clearSel() { if (sel) sel.el.classList.remove('m-sel'); sel = null; }
    cards.forEach(function (x) {
      var el = h('button', { class: 'scard', type: 'button' }, x.c.t);
      el.addEventListener('click', function () { if (ctx.locked) return; clearSel(); el.classList.add('m-sel'); sel = { x: x, el: el }; });
      pool.appendChild(el);
    });
    it.cols.forEach(function (col, ci) {
      var list = h('div', { class: 'got' }); lists.push(list);
      var box = h('button', { class: 'scol', type: 'button' }, h('h4', null, col.name), h('small', null, col.sub), list);
      box.addEventListener('click', function () {
        if (ctx.locked || !sel) return;
        if (sel.x.c.c === ci) {
          list.appendChild(h('div', { class: 'gotitem' }, '✔ ' + sel.x.c.t)); sel.el.remove(); clearSel(); left--; sfx.good(); ctx.clearFb();
          if (left === 0) ctx.ok();
        } else {
          var e = sel.el; e.classList.add('shake'); setTimeout(function () { e.classList.remove('shake'); }, 400); clearSel(); mistakes++;
          ctx.bad('Not this box! ' + (it.hint || ''), { free: mistakes > 1, noReveal: true });
        }
      });
      cols.appendChild(box);
    });
    body.appendChild(pool); body.appendChild(cols);
    ctx.lockUI = function () { };
  }

  function rMatch(it, ctx, body) {
    body.appendChild(h('p', { class: 'prompt' }, it.prompt));
    var pairs = it.pairs, imgs = shuffle(pairs.map(function (p, i) { return { p: p, i: i }; })), words = shuffle(pairs.map(function (p, i) { return { p: p, i: i }; }));
    var selI = null, selW = null, matched = 0, mistakes = 0;
    var gi = h('div', { class: 'm-imgs' }), gw = h('div', { class: 'm-words' });
    function clearSel() { [].forEach.call(body.querySelectorAll('.m-sel'), function (e) { e.classList.remove('m-sel'); }); selI = selW = null; }
    function tryPair() {
      if (!selI || !selW) return;
      if (selI.x.i === selW.x.i) {
        var au = selI.x.p.audio;
        selI.el.classList.add('m-done'); selW.el.classList.add('m-done'); clearSel(); matched++; sfx.good();
        if (au) setTimeout(function () { playAudio(au); }, 200);
        ctx.clearFb();
        if (matched === pairs.length) ctx.ok();
      } else {
        var a = selI.el, b = selW.el; a.classList.add('shake'); b.classList.add('shake');
        setTimeout(function () { a.classList.remove('shake'); b.classList.remove('shake'); }, 400);
        clearSel(); mistakes++;
        ctx.bad('Not a match! Look at the picture again and say the word.', { free: mistakes > 1, noReveal: true });
      }
    }
    imgs.forEach(function (x) {
      var el = h('button', { type: 'button', 'aria-label': 'picture' }, h('img', { src: x.p.img, alt: '' }));
      el.addEventListener('click', function () { if (ctx.locked) return; [].forEach.call(gi.querySelectorAll('.m-sel'), function (e) { e.classList.remove('m-sel'); }); el.classList.add('m-sel'); selI = { x: x, el: el }; tryPair(); });
      gi.appendChild(el);
    });
    words.forEach(function (x) {
      var el = h('button', { type: 'button' }, x.p.word);
      el.addEventListener('click', function () { if (ctx.locked) return; [].forEach.call(gw.querySelectorAll('.m-sel'), function (e) { e.classList.remove('m-sel'); }); el.classList.add('m-sel'); selW = { x: x, el: el }; tryPair(); });
      gw.appendChild(el);
    });
    body.appendChild(h('div', { class: 'match' }, gi, gw));
    ctx.lockUI = function () { };
  }

  function rWordcheck(it, ctx, body) {
    body.appendChild(h('h2', { class: 'big' }, 'Listen and repeat! 🎤'));
    body.appendChild(h('p', { class: 'instr' }, 'Tap each word, listen to Captain Nova, and say it out loud. Tap all the words to continue.'));
    var seen = {}, count = 0, btns = [];
    var cont = h('button', { class: 'btn', type: 'button', disabled: true, onclick: function () { ctx.next(); } }, 'Continue →');
    function mark(i, b) { if (!seen[i]) { seen[i] = 1; count++; b.classList.add('seen'); if (count === it.words.length) { cont.disabled = false; sfx.good(); } } }
    var grid = h('div', { class: 'wc' });
    it.words.forEach(function (w, i) {
      var b = h('button', { type: 'button', onclick: function () { playAudio('audio/' + w[1] + '.mp3', 1, b); mark(i, b); } }, '🔊 ' + w[0]);
      btns.push(b); grid.appendChild(b);
    });
    body.appendChild(grid);
    var playAll = h('button', { class: 'btn alt sm', type: 'button', onclick: function () {
      var i = 0; (function next() { if (i >= it.words.length) return; var k = i++; playAudio('audio/' + it.words[k][1] + '.mp3', 1, btns[k], function () { mark(k, btns[k]); setTimeout(next, 500); }); })();
    } }, '▶ Play all words');
    body.appendChild(h('div', { class: 'checkrow' }, playAll, cont));
  }

  function rCard(it, ctx, body) {
    body.appendChild(h('div', { class: 'cardhead' }, mimg(it.mascot || 1), h('h2', { class: 'big' }, it.title)));
    if (it.audio) body.appendChild(audioRow(it.audio));
    if (it.body) body.appendChild(h('div', { html: it.body, style: 'font-size:22px;font-weight:700' }));
    if (it.html) body.appendChild(h('div', { html: it.html }));
    body.appendChild(h('div', { class: 'checkrow' }, h('button', { class: 'btn', type: 'button', onclick: function () { ctx.next(); } }, it.cta || 'Next →')));
  }

  /* ---------------- level complete ---------------- */
  function starCount() { if (S.recharged) return 1; if (S.wrong <= 1) return 3; if (S.wrong <= 4) return 2; return 1; }
  function levelDone() {
    var lv = LEVELS[S.li], st = starCount(); S.stars[S.li] = st; S.best[S.li] = Math.max(S.best[S.li] || 0, S.run); delete S.prog[S.li]; save(); sfx.win(); confetti();
    var starsEl = h('div', { class: 'stars' }); for (var i = 1; i <= 3; i++) starsEl.appendChild(h('span', { class: i <= st ? '' : 'off' }, '⭐'));
    var nextLv = LEVELS[S.li + 1];
    go(h('section', { class: 'card done' },
      mimg(6),
      h('div', { class: 'lvl fred', style: 'color:#7a5cff;font-weight:700;letter-spacing:.2em' }, lv.boss ? 'BOSS DEFEATED!' : 'COMPLETE!'),
      h('h2', { class: 'big' }, lv.name), starsEl,
      h('div', null, h('span', { class: 'stat' }, '⭐ +' + S.run + ' XP'), h('span', { class: 'stat' }, '✏️ Mistakes: ' + S.wrong)),
      h('p', { style: 'font-weight:800' }, nextLv ? 'Next: ' + nextLv.name : ''),
      h('div', { class: 'checkrow', style: 'justify-content:center' },
        h('button', { class: 'btn', type: 'button', onclick: function () { S.li++; S.inLevel = false; if (LEVELS[S.li].id === 'final') showFinal(); else showIntro(); } }, nextLv && nextLv.id === 'final' ? 'Final Report →' : 'Next level →'),
        h('button', { class: 'btn alt', type: 'button', onclick: toMenu }, '☰ Back to the menu'))));
  }

  function bossDefeat() {
    modal(h('div', { style: 'text-align:center' }, mimg(5, ''), h('h3', null, 'Dr. Grammar-Bot wins this round! 🤖'),
      h('p', { style: 'font-weight:700' }, "Don't worry, every hero tries again. Let's fight again — you can do it!"),
      h('button', { class: 'btn', type: 'button', onclick: function () { closeModal(); S.run = 0; S.qi = 0; S.lives = 3; S.wrong = 0; S.recharged = false; save(); showQuestion(); } }, '⚔️ Fight again'),
      h('div', { style: 'margin-top:10px' }, h('button', { class: 'btn alt sm', type: 'button', onclick: function () { closeModal(); toMenu(); } }, '☰ Back to the menu'))), true);
  }

  /* ---------------- final report + certificate ---------------- */
  function showFinal() {
    S.li = LEVELS.length - 1; S.qi = 0; S.inLevel = false; save();
    var rows = LEVELS.slice(0, -1).map(function (lv, i) {
      var st = S.stars[i] || 0;
      return h('tr', null, h('th', { style: 'width:auto;border-radius:12px 0 0 12px;text-align:left;padding:8px 14px;font-size:17px' }, lv.icon + ' ' + lv.name),
        h('td', { style: 'font-size:22px' }, '⭐'.repeat(st) + '☆'.repeat(3 - st)));
    });
    var plans = ['play with my friends', 'study English', 'visit my grandparents', 'watch a movie', 'go to the beach', 'read a book'];
    var done = false;
    var certBtn = h('button', { class: 'btn', type: 'button', style: 'display:none', onclick: showCert }, '🏅 Get my certificate');
    var msg = h('div');
    var opts = h('div', { class: 'opts bank' });
    plans.forEach(function (pl) {
      var b = h('button', { class: 'opt', type: 'button', onclick: function () {
        if (done) return; done = true; b.classList.add('right');
        [].forEach.call(opts.querySelectorAll('.opt'), function (o) { if (o !== b) o.disabled = true; });
        if (!S.best[LEVELS.length - 1]) floatXp(20);
        S.best[LEVELS.length - 1] = 20; S.stars[LEVELS.length - 1] = 3; save(); updateHud(); sfx.win();
        msg.replaceChildren(h('div', { class: 'fb good' }, mimg(7), h('div', { class: 'tx' }, h('h4', null, 'Great plan!'),
          h('p', { class: 'model' }, '✔ Tomorrow I\'m going to ' + pl + '.'),
          h('p', null, '🎤 Now say it out loud to Mrs. Dani!'))));
        certBtn.style.display = 'inline-flex';
      } }, pl);
      opts.appendChild(b);
    });
    var card = h('section', { class: 'card' },
      h('div', { class: 'cardhead' }, mimg(7), h('div', null, h('div', { class: 'q-top' }, backBtn(), h('span', { class: 'tag' }, 'Final Report')), h('h2', { class: 'big' }, 'Mission complete, ' + (S.name || 'Cadet') + '!'))),
      h('table', { class: 'rt' }, rows),
      h('p', { class: 'prompt' }, '🎤 Speaking: tap what YOU are going to do tomorrow — then say the sentence out loud!'),
      h('div', { class: 'given' }, 'Tomorrow I\'m going to …'),
      opts,
      h('div', { class: 'checkrow' }, certBtn),
      msg);
    go(card);
  }

  function showCert() {
    sfx.win(); confetti(60);
    var stars = S.stars.reduce(function (a, b) { return a + (b || 0); }, 0);
    var date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    go(h('div', null,
      h('section', { class: 'card cert' },
        h('div', { class: 'fred', style: 'letter-spacing:.3em;font-weight:600' }, 'CERTIFICATE OF COMPLETION'),
        h('h2', null, 'MISSION STARLIGHT'), mimg(8),
        h('div', { class: 'small' }, 'This certifies that'),
        h('div', { class: 'nm' }, S.name || 'Space Cadet'),
        h('div', { class: 'small' }, 'has completed Cadet Training and is now a'),
        h('div', { class: 'rank' }, '⭐ COMMANDER ⭐'),
        h('p', { class: 'small' }, totalXp() + ' XP  ·  ' + stars + ' / ' + (3 * (LEVELS.length - 1)) + ' stars  ·  ' + date),
        h('div', { class: 'sign' }, h('span', null, 'Captain Nova'), h('span', null, 'Mrs. Dani'))),
      h('p', { style: 'text-align:center;color:#fff;font-weight:800' }, '📸 Take a screenshot to keep your certificate!'),
      h('div', { style: 'text-align:center;margin-top:10px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap' }, h('button', { class: 'btn alt sm', type: 'button', onclick: toMenu }, '☰ Back to the menu'), h('button', { class: 'btn ghost sm', type: 'button', onclick: function () { wipe(); S = fresh(); showHome(); } }, '↺ Reset everything'))));
  }

  /* ---------------- modal + teacher menu ---------------- */
  var modalEl = null;
  function modal(node, locked) {
    closeModal();
    modalEl = h('div', { class: 'modal-bg', onclick: function (e) { if (!locked && e.target === modalEl) closeModal(); } }, h('div', { class: 'modal' }, node));
    document.body.appendChild(modalEl);
  }
  function closeModal() { if (modalEl) { modalEl.remove(); modalEl = null; } }

  function openTeacher() {
    var lv = LEVELS[S.li], it = lv && lv.items[S.qi];
    var jump = h('div', { class: 'row' });
    LEVELS.forEach(function (l, i) {
      jump.appendChild(h('button', { class: 'btn alt', type: 'button', onclick: function () {
        closeModal(); stash(); S.started = true; S.li = i; if (i === LEVELS.length - 1) showFinal(); else showIntro();
      } }, (i === 0 ? '📡' : (i === LEVELS.length - 1 ? '🏅' : i)) + ' ' + l.sub));
    });
    var inf = h('input', { type: 'checkbox' }); inf.checked = S.infinite;
    inf.addEventListener('change', function () { S.infinite = inf.checked; save(); updateHud(); });
    var times = LEVELS.map(function (l) { return l.mins + "′ " + l.sub; }).join('  ·  ');
    modal(h('div', null, h('h3', null, '⚙️ Teacher menu'),
      h('div', { class: 'tlist' }, 'Suggested time:  ' + times),
      h('div', null, h('b', null, 'Jump to a level')), jump,
      h('label', null, inf, 'Infinite hearts (no lives lost)'),
      h('div', { class: 'row' },
        h('button', { class: 'btn alt', type: 'button', onclick: function () {
          closeModal(); if (!it) return; if (isScored(it) || it.type === 'card' || it.type === 'wordcheck') { S.qi++; showQuestion(); }
        } }, '⏭ Skip this exercise'),
        h('button', { class: 'btn alt', type: 'button', onclick: function () {
          closeModal(); if (it && isScored(it)) { var m = modelText(it); toast('Answer: ' + (m || '(see the pictures)'), 6000); }
        } }, '👁 Show answer')),
      h('div', { class: 'row' },
        h('button', { class: 'btn ghost sm', style: 'color:#b3261e;border-color:#ffb3b5', type: 'button', onclick: function () { closeModal(); wipe(); S = fresh(); showHome(); } }, '↺ Reset everything'),
        h('button', { class: 'btn sm', type: 'button', onclick: closeModal }, 'Close'))));
  }

  /* ---------------- boot ---------------- */
  function boot() {
    var st = document.getElementById('stars');
    for (var i = 0; i < 70; i++) {
      var s = document.createElement('i'), z = 1 + Math.random() * 2.5;
      s.style.cssText = 'left:' + Math.random() * 100 + '%;top:' + Math.random() * 100 + '%;width:' + z + 'px;height:' + z + 'px;animation-delay:' + (Math.random() * 4) + 's';
      st.appendChild(s);
    }
    stage = document.getElementById('stage');
    buildHud();
    var sv = load(); if (sv && typeof sv.sound === 'boolean') S.sound = sv.sound;
    showHome();
  }
  window.__game = { S: function () { return S; }, K: K, LEVELS: LEVELS, totalXp: totalXp };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
