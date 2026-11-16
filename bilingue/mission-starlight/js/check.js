/* Answer checking: pure functions (works in browser and in node for testing) */
(function (root) {
  'use strict';

  var EXPAND = [
    [/\bi'm\b/g, 'i am'],
    [/\b(you|we|they)'re\b/g, '$1 are'],
    [/\b(he|she|it|that|what|there)'s\b/g, '$1 is'],
    [/\b(\w+)'s (going|not going)\b/g, '$1 is $2'],
    [/\b(is|are|was|were|do|does|did|has|have|had|would|could|should)n't\b/g, '$1 not'],
    [/\bwon't\b/g, 'will not'],
    [/\b(\w+)'ll\b/g, '$1 will'],
    [/^'ll\b/, 'will'],
    [/\bcan't\b/g, 'cannot'],
    [/^'re\b/, 'are'],
    [/^'m\b/, 'am'],
    [/^'s\b/, 'is']
  ];

  function norm(s, opt) {
    opt = opt || {};
    var doExpand = opt.expand !== false;
    s = String(s == null ? '' : s).toLowerCase().replace(/[’‘`´]/g, "'");
    s = s.replace(/[.,!?;:"“”()\[\]]/g, ' ').replace(/\s+/g, ' ').trim();
    if (doExpand) {
      EXPAND.forEach(function (p) { s = s.replace(p[0], p[1]); });
      s = s.replace(/'/g, '');
    }
    return s.replace(/\s+/g, ' ').trim();
  }

  function fill(sentence, ans) { return sentence.replace(/_+/, ans); }

  function checkType(it, raw) {
    var ex = !it.strict;
    var n = norm(raw, { expand: ex });
    var answers = it.answers || [];
    for (var i = 0; i < answers.length; i++) {
      if (norm(answers[i], { expand: ex }) === n) return true;
      if (it.sentence && it.sentence.indexOf('___') > -1) {
        if (norm(fill(it.sentence, answers[i]), { expand: ex }) === n) return true;
        // also accept just the sentence that contains the blank
        var idx = it.sentence.indexOf('___'), before = it.sentence.slice(0, idx), m = before.match(/^[\s\S]*[.!?\u201d"]\s+/);
        if (m && norm(before.slice(m[0].length) + answers[i] + it.sentence.slice(idx + 3), { expand: ex }) === n) return true;
      }
    }
    return false;
  }

  function checkOpen(it, raw) {
    var n = norm(raw, { expand: true });
    var words = n ? n.split(' ') : [];
    if (it.minWords && words.length < it.minWords) return { ok: false, short: true };
    var rules = it.rules || [];
    for (var i = 0; i < rules.length; i++) { if (!rules[i].test(n)) return { ok: false }; }
    return { ok: true };
  }

  function checkOrder(it, arr) {
    var got = norm(arr.join(' '));
    if (norm(it.answer) === got) return true;
    return (it.alt || []).some(function (a) { return norm(a) === got; });
  }

  function checkLetters(it, arr) { return arr.join('') === it.word; }

  function apostropheHint(raw) {
    if (/\b(isnt|arent|im|dont|doesnt|wont|youre|theyre|shes|hes)\b/i.test(raw || '')) {
      return "Check the apostrophe ( ' ) — for example: isn't, aren't, I'm.";
    }
    return '';
  }

  var API = { norm: norm, checkType: checkType, checkOpen: checkOpen, checkOrder: checkOrder,
    checkLetters: checkLetters, apostropheHint: apostropheHint, fill: fill };
  root.Check = API;
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : globalThis);
