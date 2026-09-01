/* =========================================================
   MRS. DANI — SHARED JS
   Front-end prototype only. No real authentication, no real
   payments, no real database. See comments below each mock
   section for what a production backend needs to replace.
   ========================================================= */

/* ---------- nav toggle (mobile) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
});

/* =========================================================
   I18N (PROTOTYPE)
   -----------------------------------------------------------
   The commercial site (home, game library, product pages,
   about) is PT by default with an EN toggle, because most
   parents contacting Mrs. Dani read Portuguese, not English —
   see brief section 3/5. The student area intentionally does
   NOT use this system; it stays in English because the
   product itself is English practice. Parent/login account
   screens are Portuguese-only by design, not toggled.
   ========================================================= */
const I18N = {
  pt: {
    'nav.games': 'Jogos',
    'nav.how': 'Como funciona',
    'nav.about': 'Sobre',
    'nav.login': 'Entrar',
    'nav.cta': 'Explorar jogos',
    'hero.eyebrow': 'Jogos de inglês escolar',
    'hero.headline': 'Pratique o inglês que você aprende na escola — jogando.',
    'hero.lede': 'Jogos interativos criados a partir dos conteúdos escolares e das dificuldades reais de crianças e adolescentes.',
    'hero.cta1': 'Explorar os jogos',
    'hero.cta2': 'Como funciona',
    'hero.caption': 'Town Explorer — mapa interativo para praticar preposições de lugar (4º ano)',
    'diff.eyebrow': 'A diferença',
    'diff.title': 'Não são jogos genéricos de inglês.',
    'diff.body': 'Cada atividade é criada a partir dos conteúdos que os alunos estudam na escola e pensada para reforçar dificuldades específicas.',
    'pillar1.title': 'Conteúdo escolar',
    'pillar1.body': 'Baseado no que seu filho está estudando em sala de aula agora.',
    'pillar2.title': 'Dificuldades reais',
    'pillar2.body': 'Criado a partir das dúvidas que alunos de verdade apresentam.',
    'pillar3.title': 'Prática interativa',
    'pillar3.body': 'Aprender jogando, não decorando listas de palavras.',
    'grade.eyebrow': 'Encontre por ano escolar',
    'grade.title': 'Em que ano seu filho está?',
    'how.title': 'Simples para os pais, simples para as crianças.',
    'how.step1.title': 'Escolha um jogo',
    'how.step1.body': 'Filtre pelo ano escolar do seu filho e pela habilidade que ele precisa praticar.',
    'how.step2.title': 'Compre com segurança',
    'how.step2.body': 'Crie uma conta e adquira a atividade certa para o seu filho.',
    'how.step3.title': 'Seu filho pratica sozinho',
    'how.step3.body': 'Com um acesso simples, seu filho entra e já vê as atividades dele — sem senha complicada.',
    'featured.eyebrow': 'Jogos em destaque',
    'featured.title': 'Conheça os jogos.',
    'featured.seeall': 'Ver todos os jogos',
    'card.cta.buy': 'Comprar',
    'card.cta.view': 'Ver atividade',
    'card.cta.play': 'Jogar',
    'card.price': '[PREÇO]',
    'card.included': 'Já disponível',
    'card.purchase': 'Disponível para compra',
    'library.title': 'Todos os jogos',
    'library.lede': 'Encontre a atividade certa pelo ano escolar, pela habilidade ou pela dificuldade.',
    'library.grade': 'Ano escolar',
    'library.skill': 'Habilidade',
    'library.difficulty': 'Dificuldade',
    'library.reset': 'Limpar filtros',
    'library.empty': 'Nenhum jogo encontrado com esses filtros. Tente remover algum.',
    'library.count': 'atividades',
    'detail.practices': 'O que seu filho vai praticar',
    'detail.why.title': 'Por que esta atividade?',
    'detail.how.title': 'Como funciona',
    'detail.buy': 'Comprar agora',
    'detail.play': 'Jogar',
    'detail.login': 'Entrar para jogar',
    'footer.mrsdani': 'Mrs. Dani',
    'footer.about': 'Sobre',
    'footer.games': 'Jogos',
    'footer.gamesAll': 'Todos os jogos',
    'footer.byGrade': 'Por ano escolar',
    'footer.bySkill': 'Por habilidade',
    'footer.help': 'Ajuda',
    'footer.how': 'Como funciona',
    'footer.studentAccess': 'Acesso do aluno',
    'footer.account': 'Conta',
    'footer.login': 'Entrar',
    'footer.parentArea': 'Área dos pais',
    'footer.contact': 'Contato',
  },
  en: {
    'nav.games': 'Games',
    'nav.how': 'How it works',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.cta': 'Explore the games',
    'hero.eyebrow': 'School-aligned English games',
    'hero.headline': 'Practice the English you learn at school — by playing.',
    'hero.lede': 'Interactive games built from real school content and the real difficulties children and teenagers experience.',
    'hero.cta1': 'Explore the games',
    'hero.cta2': 'How it works',
    'hero.caption': 'Town Explorer — interactive city map to practice prepositions of place (4th grade)',
    'diff.eyebrow': 'The difference',
    'diff.title': "These aren't generic English games.",
    'diff.body': 'Every activity is built from what students actually study at school, designed to reinforce specific difficulties.',
    'pillar1.title': 'School content',
    'pillar1.body': "Based on what your child is studying in class right now.",
    'pillar2.title': 'Real difficulties',
    'pillar2.body': 'Built from the actual struggles real students have.',
    'pillar3.title': 'Interactive practice',
    'pillar3.body': 'Learning by playing, not memorizing word lists.',
    'grade.eyebrow': 'Find by school grade',
    'grade.title': "What grade is your child in?",
    'how.title': 'Simple for parents, simple for kids.',
    'how.step1.title': 'Choose a game',
    'how.step1.body': "Filter by your child's grade and the skill they need to practice.",
    'how.step2.title': 'Buy securely',
    'how.step2.body': 'Create an account and get the right activity for your child.',
    'how.step3.title': 'Your child practices independently',
    'how.step3.body': "With simple access, your child logs in and sees their activities right away — no complicated password.",
    'featured.eyebrow': 'Featured games',
    'featured.title': 'Meet the games.',
    'featured.seeall': 'See all games',
    'card.cta.buy': 'Buy',
    'card.cta.view': 'View activity',
    'card.cta.play': 'Play',
    'card.price': '[PRICE]',
    'card.included': 'Already available',
    'card.purchase': 'Available to purchase',
    'library.title': 'All games',
    'library.lede': 'Find the right activity by grade, skill, or difficulty.',
    'library.grade': 'Grade',
    'library.skill': 'Skill',
    'library.difficulty': 'Difficulty',
    'library.reset': 'Clear filters',
    'library.empty': 'No games match these filters yet. Try clearing one.',
    'library.count': 'activities',
    'detail.practices': 'What your child will practice',
    'detail.why.title': 'Why this activity?',
    'detail.how.title': 'How it works',
    'detail.buy': 'Buy now',
    'detail.play': 'Play',
    'detail.login': 'Login to play',
    'footer.mrsdani': 'Mrs. Dani',
    'footer.about': 'About',
    'footer.games': 'Games',
    'footer.gamesAll': 'All games',
    'footer.byGrade': 'By grade',
    'footer.bySkill': 'By skill',
    'footer.help': 'Help',
    'footer.how': 'How it works',
    'footer.studentAccess': 'Student access',
    'footer.account': 'Account',
    'footer.login': 'Login',
    'footer.parentArea': 'Parent area',
    'footer.contact': 'Contact',
  }
};

let currentLang = localStorage.getItem('mrsdani-lang') || 'pt';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.pt[key] || key);
}

function applyStaticI18n() {
  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mrsdani-lang', lang);
  applyStaticI18n();
  renderHomePreview();
  renderGradeRow();
  initLibrary(true);
  initDetail();
}

function initLangToggle() {
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

/* =========================================================
   GAME DATA
   -----------------------------------------------------------
   Mock/sample product data for the prototype. In production
   this comes from a real catalog/database so games can be
   filtered, priced, sold, and connected to purchase records
   without editing HTML by hand. `price` is intentionally left
   as a placeholder ([PREÇO]/[PRICE]) — no real prices exist
   yet. `status` models future states (available / coming-soon)
   even though every sample here is 'available'.
   ========================================================= */
const GRADE_LABELS = {
  3: { pt: '3º ano', en: '3rd Grade' },
  4: { pt: '4º ano', en: '4th Grade' },
  5: { pt: '5º ano', en: '5th Grade' },
  6: { pt: '6º ano', en: '6th Grade' }
};
const SKILL_LABELS = {
  Vocabulary: { pt: 'Vocabulário', en: 'Vocabulary' },
  Grammar: { pt: 'Gramática', en: 'Grammar' },
  Reading: { pt: 'Leitura', en: 'Reading' },
  Writing: { pt: 'Escrita', en: 'Writing' },
  Listening: { pt: 'Escuta', en: 'Listening' }
};
const DIFFICULTY_LABELS = {
  Beginner: { pt: 'Iniciante', en: 'Beginner' },
  Intermediate: { pt: 'Intermediário', en: 'Intermediate' },
  Advanced: { pt: 'Avançado', en: 'Advanced' }
};

const GAMES = [
  {
    id: 'town-explorer',
    title: 'Town Explorer',
    gradeNum: 4,
    skill: ['Vocabulary', 'Grammar'],
    topic: 'Places',
    grammar: "Prepositions of Place / Where's the...?",
    difficulty: 'Beginner',
    gameType: 'Map Exploration & Clue Following',
    schoolAlignment: '4th Grade English',
    description: "Explore a city map, follow clues to find locations, and practice prepositions of place and \"Where's the...?\" questions.",
    descriptionPT: "Explore o mapa de uma cidade, siga pistas para encontrar lugares e pratique preposições de lugar e perguntas com \"Where's the...?\".",
    why: 'Connects city vocabulary with prepositions of place and question practice, all through following clues on a map.',
    whyPT: 'Conecta vocabulário da cidade com preposições de lugar e prática de perguntas, tudo seguindo pistas num mapa.',
    practices: ['next to', 'above', 'between', "Where's the...?"],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-citymap/'
  },
  {
    id: 'sports-playground',
    title: 'Sports Playground',
    gradeNum: 3,
    skill: ['Vocabulary', 'Grammar', 'Writing'],
    topic: 'Sports',
    grammar: '-ing Verbs',
    difficulty: 'Beginner',
    gameType: 'Vocabulary & Sentence Building',
    schoolAlignment: '3rd Grade English',
    description: 'Learn sports and equipment vocabulary, then build sentences with -ing verbs to describe and share opinions about sports.',
    descriptionPT: 'Aprenda vocabulário de esportes e equipamentos, e pratique construir frases com verbos terminados em -ing para descrever e opinar sobre esportes.',
    why: 'Built to connect sports vocabulary to real sentence-writing practice, from naming equipment to expressing opinions with -ing verbs.',
    whyPT: 'Criado para conectar o vocabulário de esportes à prática de escrita de frases de verdade, do nome dos equipamentos até expressar opiniões com verbos em -ing.',
    practices: ['basketball', 'swimming', 'volleyball', '-ing verbs'],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/3ano-sports/'
  },
  {
    id: 'top-town',
    title: 'Top Town',
    gradeNum: 3,
    skill: ['Vocabulary', 'Grammar', 'Writing'],
    topic: 'Places',
    grammar: 'Does it have...? / Prepositions',
    difficulty: 'Beginner',
    gameType: 'Map Exploration & Question Practice',
    schoolAlignment: '3rd Grade English',
    description: 'Explore a town map, ask and answer "Does Top Town have...?" questions, and use prepositions of place to describe where things are located.',
    descriptionPT: 'Explore o mapa de uma cidade, pratique perguntas e respostas com "Does Top Town have...?" e use preposições de lugar para descrever onde as coisas ficam.',
    why: 'Connects city vocabulary with yes/no question structure and prepositions of place — skills that build on each other.',
    whyPT: 'Conecta o vocabulário da cidade com a estrutura de perguntas de sim/não e preposições de lugar — habilidades que se conectam.',
    practices: ['Does it have...?', 'next to', 'in front of', 'between'],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/3ano-prepositions_does_it_have/'
  }
];

/* =========================================================
   GAME CARD RENDERING
   ========================================================= */
function gameCardHTML(game) {
  const gradeLabel = GRADE_LABELS[game.gradeNum] ? GRADE_LABELS[game.gradeNum][currentLang] : '';
  const skills = game.skill.map(s => `<span class="tag tag-skill">${(SKILL_LABELS[s] && SKILL_LABELS[s][currentLang]) || s}</span>`).join('');
  const diffLabel = (DIFFICULTY_LABELS[game.difficulty] && DIFFICULTY_LABELS[game.difficulty][currentLang]) || game.difficulty;
  const desc = currentLang === 'pt' ? game.descriptionPT : game.description;
  const accessLabel = game.access === 'included'
    ? `<span class="access-pill included">${t('card.included')}</span>`
    : `<span class="access-pill purchase">${t('card.purchase')}</span>`;
  const ctaLabel = game.access === 'included' ? t('card.cta.view') : t('card.cta.buy');

  return `
    <article class="game-card" data-id="${game.id}">
      <div class="game-card-media">[GAME SCREENSHOT]</div>
      <div class="game-card-body">
        <div class="game-card-tags">
          <span class="tag tag-grade">${gradeLabel}</span>
          ${skills}
          <span class="tag tag-diff">${diffLabel}</span>
        </div>
        <h3>${game.title}</h3>
        <p class="game-card-desc">${desc}</p>
        <div class="price-block">
          <span class="price">${t('card.price')}</span>
          <a class="link-inline" href="detail.html?id=${game.id}">
            ${ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
        <div class="game-card-footer">${accessLabel}</div>
      </div>
    </article>
  `;
}

function renderHomePreview() {
  const el = document.getElementById('home-game-preview');
  if (!el) return;
  const preview = GAMES.slice(0, 3);
  el.innerHTML = preview.map(gameCardHTML).join('');
  el.querySelectorAll('a.link-inline').forEach(a => {
    a.setAttribute('href', 'games/' + a.getAttribute('href'));
  });
}

/* =========================================================
   GRADE FINDER (home)
   ========================================================= */
function renderGradeRow() {
  const el = document.getElementById('grade-row');
  if (!el) return;
  const grades = [...new Set(GAMES.map(g => g.gradeNum))].sort((a, b) => a - b);
  el.innerHTML = grades.map(num => {
    const label = GRADE_LABELS[num][currentLang];
    const [n, word] = currentLang === 'pt' ? label.split('º ') : [String(num), 'grade'];
    return `<a class="grade-chip" href="games/index.html?grade=${num}">
      <span style="font-family:var(--font-display); font-size:1.3rem;">${num}${currentLang === 'pt' ? 'º' : ''}</span>
      <span>${currentLang === 'pt' ? 'ano' : 'grade'}</span>
    </a>`;
  }).join('');
}

/* =========================================================
   GAME LIBRARY: FILTERING
   ========================================================= */
let libraryState = { grade: new Set(), skill: new Set(), difficulty: new Set() };

function initLibrary(preserveState) {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  if (!preserveState) {
    libraryState = { grade: new Set(), skill: new Set(), difficulty: new Set() };
    const params = new URLSearchParams(window.location.search);
    const gradeParam = params.get('grade');
    if (gradeParam) libraryState.grade.add(Number(gradeParam));
  }

  function applyFilters() {
    const filtered = GAMES.filter(g => {
      const gradeOk = libraryState.grade.size === 0 || libraryState.grade.has(g.gradeNum);
      const skillOk = libraryState.skill.size === 0 || g.skill.some(s => libraryState.skill.has(s));
      const diffOk = libraryState.difficulty.size === 0 || libraryState.difficulty.has(g.difficulty);
      return gradeOk && skillOk && diffOk;
    });

    const countEl = document.getElementById('library-count');
    if (countEl) countEl.textContent = `${filtered.length} ${t('library.count')}`;

    grid.innerHTML = filtered.length
      ? filtered.map(gameCardHTML).join('')
      : `<div class="empty-state"><div class="mascot mascot-inline" style="margin:0 auto 10px;">[FOX: curious]</div>${t('library.empty')}</div>`;
  }

  document.querySelectorAll('.filter-option input').forEach(input => {
    const group = input.dataset.group;
    input.checked = libraryState[group] && libraryState[group].has(
      group === 'grade' ? Number(input.value) : input.value
    );
    input.onchange = () => {
      const value = group === 'grade' ? Number(input.value) : input.value;
      if (input.checked) libraryState[group].add(value);
      else libraryState[group].delete(value);
      applyFilters();
    };
  });

  const resetBtn = document.getElementById('filter-reset');
  if (resetBtn) {
    resetBtn.onclick = () => {
      document.querySelectorAll('.filter-option input').forEach(i => (i.checked = false));
      Object.values(libraryState).forEach(s => s.clear());
      applyFilters();
    };
  }

  applyFilters();
}

/* =========================================================
   GAME PRODUCT PAGE
   ========================================================= */
function initDetail() {
  const container = document.getElementById('game-detail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const game = GAMES.find(g => g.id === params.get('id')) || GAMES[0];

  document.title = `${game.title} — Mrs. Dani`;

  const gradeLabel = GRADE_LABELS[game.gradeNum][currentLang];
  const skills = game.skill.map(s => `<span class="tag tag-skill">${(SKILL_LABELS[s] && SKILL_LABELS[s][currentLang]) || s}</span>`).join('');
  const diffLabel = (DIFFICULTY_LABELS[game.difficulty] && DIFFICULTY_LABELS[game.difficulty][currentLang]) || game.difficulty;
  const desc = currentLang === 'pt' ? game.descriptionPT : game.description;
  const why = currentLang === 'pt' ? game.whyPT : game.why;
  const practices = game.practices.map(p => `<span class="practice-chip">${p}</span>`).join('');

  const hasRealLink = game.gameUrl && game.gameUrl !== '#';

  const accessBlock = game.access === 'included'
    ? (hasRealLink
        ? `<div><strong>${t('card.included')}</strong><p style="margin:4px 0 0;font-size:0.88rem;">${currentLang === 'pt' ? 'Já faz parte do seu acesso.' : 'Already part of your access.'}</p></div>
           <a class="btn btn-primary" href="${game.gameUrl}" target="_blank" rel="noopener">${currentLang === 'pt' ? 'Jogar agora' : 'Play now'} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`
        : `<div><strong>${t('card.included')}</strong><p style="margin:4px 0 0;font-size:0.88rem;">${currentLang === 'pt' ? 'Já faz parte do seu acesso.' : "Already part of your access."}</p></div>
           <a class="btn btn-primary" href="../login/">${t('detail.login')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`)
    : game.access === 'beta'
      ? `<div><span class="price" style="display:block;">${t('card.price')}</span></div>
         <a class="btn btn-primary" href="${game.gameUrl}" target="_blank" rel="noopener">${t('detail.buy')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`
      : `<div><span class="price" style="display:block;">${t('card.price')}</span></div>
         <a class="btn btn-primary" href="../login/">${t('detail.buy')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`;
  const betaNote = game.access === 'beta'
    ? `<div class="prototype-note" style="margin-top:14px;">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>
         <span>${currentLang === 'pt'
           ? 'Fase de testes: este jogo está liberado gratuitamente por enquanto para os alunos beta testers.'
           : 'Beta phase: this game is free for now for beta-testing students.'}</span>
       </div>`
    : '';

  container.innerHTML = `
    <div class="detail-media">[GAME SCREENSHOT]</div>
    <div class="mascot-bubble">
      <div class="mascot mascot-inline">[FOX: pointing]</div>
      <p>${currentLang === 'pt' ? 'Vamos praticar juntos!' : "Let's practice together!"}</p>
    </div>
    <div class="detail-meta">
      <span class="tag tag-grade">${gradeLabel}</span>
      ${skills}
      <span class="tag tag-diff">${diffLabel}</span>
    </div>
    <h1>${game.title}</h1>
    <p class="lede">${desc}</p>
    <h3>${t('detail.practices')}</h3>
    <div class="practice-list">${practices}</div>
    <h3>${t('detail.why.title')}</h3>
    <p>${why}</p>
    <div class="detail-access">${accessBlock}</div>
    ${betaNote}
    <div class="prototype-note payment" style="margin-top:16px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>
      <span>${currentLang === 'pt'
        ? 'Protótipo: nenhum pagamento real é processado aqui ainda.'
        : 'Prototype: no real payment is processed here yet.'}</span>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  applyStaticI18n();
  initLangToggle();
  renderHomePreview();
  renderGradeRow();
  initLibrary();
  initDetail();
  initParentDashboard();
  initStudentPicker();
  initStudentDashboard();
});

/* =========================================================
   FAMILY DATA (PROTOTYPE ONLY)
   ========================================================= */
const FAMILY = {
  parentName: 'Sra. Almeida',
  children: [
    { id: 'lucas', name: 'Lucas', grade: '4º ano', games: ['town-explorer', 'sports-playground'] },
    { id: 'sofia', name: 'Sofia', grade: '3º ano', games: ['sports-playground', 'top-town'] }
  ],
  purchases: [
    { gameId: 'town-explorer', childId: 'lucas', status: 'Liberado (beta)' },
    { gameId: 'top-town', childId: 'sofia', status: 'Liberado (beta)' }
  ]
};

/* =========================================================
   LOGIN (PROTOTYPE ONLY)
   -----------------------------------------------------------
   Parent login is a normal email/password form shape (to be
   wired to a real identity provider later). Student access is
   deliberately NOT an email/password form — it's a profile
   picker, since a child needs to use it independently. Never
   store real passwords or session tokens in frontend JS.
   ========================================================= */
function initLoginForm() {
  const form = document.getElementById('parent-login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = '../parent/';
  });
}
document.addEventListener('DOMContentLoaded', initLoginForm);

/* ---- student profile picker (login/aluno.html) ---- */
function initStudentPicker() {
  const el = document.getElementById('profile-picker');
  if (!el) return;
  el.innerHTML = FAMILY.children.map(child => `
    <button class="profile-card" data-child="${child.id}">
      <span class="profile-avatar">${child.name.charAt(0)}</span>
      <span class="profile-name">${child.name}</span>
    </button>
  `).join('');
  el.querySelectorAll('.profile-card').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `../student/index.html?child=${btn.dataset.child}`;
    });
  });
}

/* =========================================================
   PARENT DASHBOARD (prototype, Portuguese)
   ========================================================= */
function initParentDashboard() {
  const childrenEl = document.getElementById('parent-children');
  if (!childrenEl) return;

  childrenEl.innerHTML = FAMILY.children.map(child => {
    const gameCount = child.games.length;
    return `
      <div class="child-row">
        <div class="child-row-info">
          <span class="profile-avatar sm">${child.name.charAt(0)}</span>
          <div>
            <strong>${child.name}</strong>
            <div class="dash-sub">${child.grade} · ${gameCount} atividade${gameCount === 1 ? '' : 's'} liberada${gameCount === 1 ? '' : 's'}</div>
          </div>
        </div>
        <a class="link-inline" href="../student/index.html?child=${child.id}">Ver painel do aluno
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    `;
  }).join('');

  const purchasesEl = document.getElementById('parent-purchases');
  if (purchasesEl) {
    purchasesEl.innerHTML = FAMILY.purchases.map(p => {
      const game = GAMES.find(g => g.id === p.gameId);
      const child = FAMILY.children.find(c => c.id === p.childId);
      return `<tr><td>${game ? game.title : p.gameId}</td><td>${child ? child.name : p.childId}</td><td>${p.status}</td></tr>`;
    }).join('');
  }
}

/* =========================================================
   STUDENT / CHILD DASHBOARD (prototype — English, per brief)
   ========================================================= */
function initStudentDashboard() {
  const el = document.getElementById('student-games');
  if (!el) return;

  const params = new URLSearchParams(window.location.search);
  const child = FAMILY.children.find(c => c.id === params.get('child')) || FAMILY.children[0];

  document.getElementById('student-name').textContent = `Hi, ${child.name}! 👋`;

  const games = child.games.map(id => GAMES.find(g => g.id === id)).filter(Boolean);

  el.innerHTML = games.map(game => `
    <article class="game-card">
      <div class="game-card-media">[GAME SCREENSHOT]</div>
      <div class="game-card-body">
        <h3>${game.title}</h3>
        <div class="game-card-footer" style="border-top:none; padding-top:4px;">
          <a class="btn btn-primary" style="width:100%; justify-content:center;" href="../games/detail.html?id=${game.id}">
            Play
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('') || `<div class="empty-state"><div class="mascot mascot-inline" style="margin:0 auto 10px;">[FOX: curious]</div>No games yet — ask a parent to add one!</div>`;
}
