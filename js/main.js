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
    'library.filtersBtn': 'Filtros',
    'library.clearAll': 'Limpar tudo',
    'library.apply': 'Aplicar filtros',
    'library.close': 'Fechar',
    'detail.practices': 'O que seu filho vai praticar',
    'detail.objectives': 'Neste jogo, você irá aprender a:',
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
    'footer.contactPlaceholder': '[INFORMAÇÕES DE CONTATO]',
    'mascot.homeAlt': 'Raposa mascote da Mrs. Dani, feliz e acenando',
    'card.screenshot': '[CAPTURA DO JOGO]',
    'library.emptyIcon': '[RAPOSA: curiosa]',
    'filter.grade3': '3º ano',
    'filter.grade4': '4º ano',
    'filter.grade5': '5º ano',
    'filter.grade8': '8º ano',
    'filter.bilingual': 'Bilíngue',
    'filter.grammar': 'Gramática',
    'filter.vocabulary': 'Vocabulário',
    'filter.reading': 'Leitura',
    'filter.writing': 'Escrita',
    'filter.listening': 'Escuta',
    'filter.beginner': 'Iniciante',
    'filter.intermediate': 'Intermediário',
    'filter.advanced': 'Avançado',
    'library.category': 'Categoria',
    'about.pageTitle': 'Sobre — Mrs. Dani',
    'about.eyebrow': 'Sobre',
    'about.title': 'A educadora por trás dos jogos.',
    'about.photoAlt': 'Foto de Mrs. Dani',
    'about.bio1': 'Sou formada em Pedagogia pela Unicamp, em Letras Português/Inglês pela Unip, e tenho pós-graduação em Metodologia do Ensino de Língua Inglesa.',
    'about.bio2': 'Atuo com o ensino de inglês desde 2013, tendo passado por escolas renomadas como o Colégio Notre Dame de Campinas, onde estive por mais de 10 anos, e o Colégio Progresso, por 2 anos. Desde 2023 me dedico às aulas particulares online para adultos e crianças, e com os pequenos venho me especializando em reforço escolar.',
    'about.bio3': 'Apaixonada por tecnologia, criei este site com jogos para que meus alunos possam reforçar o conteúdo das aulas de um jeito divertido e envolvente. Cada jogo nasce de uma dificuldade real que ela viu em sala de aula — não de uma lista genérica de vocabulário.',
    'about.callout': 'Antes de virarem jogos, essas atividades foram aulas de reforço escolar de inglês — um serviço que Mrs. Dani ainda oferece. <a href="../school-support/index.html" class="link-inline">Conheça o School Support</a>.',
    'ss.eyebrow': 'Para crianças e adolescentes',
    'ss.title': 'Reforço escolar, não mais uma aula de inglês genérica.',
    'ss.lede': 'Isso não é aula de inglês genérica. É ajuda direcionada com o inglês que seu filho já está aprendendo na escola — o livro didático dele, o dever de casa, as próximas avaliações.',
    'ss.cta': 'Ver a biblioteca de jogos',
    'ss.photoPlaceholder': '[FOTO: aluno estudando em casa]',
    'ss.includedEyebrow': "O que está incluído",
    'ss.includedTitle': 'Construído em torno do conteúdo real que seu filho estuda.',
    'ss.card1.title': 'Revisão do conteúdo escolar',
    'ss.card1.body': 'Revisamos o que está sendo ensinado em sala de aula agora, usando o mesmo vocabulário e as mesmas estruturas do livro didático do seu filho.',
    'ss.card2.title': 'Ajuda com o dever de casa',
    'ss.card2.body': 'Fazemos as atividades juntos, para que seu filho entenda o "porquê", não só a resposta.',
    'ss.card3.title': 'Preparação para avaliações',
    'ss.card3.body': 'Revisão direcionada antes de provas e testes, focada nos conceitos específicos que o aluno tem mais dificuldade.',
    'ss.practiceEyebrow': 'Prática além da aula',
    'ss.practiceTitle': 'Jogos interativos, criados para a dificuldade específica do seu filho.',
    'ss.practiceBody': 'Quando um aluno está com dificuldade em um conceito específico — preposições, passado verbal, um conjunto de vocabulário — a Mrs. Dani cria uma atividade interativa exatamente sobre isso, usando o vocabulário do próprio livro didático sempre que possível.',
    'ss.screenshotPlaceholder': '[CAPTURA DE TELA: jogo Town Explorer]',
    'ss.footerLink': 'Para os pais: como funciona →',
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
    'library.filtersBtn': 'Filters',
    'library.clearAll': 'Clear all',
    'library.apply': 'Apply filters',
    'library.close': 'Close',
    'detail.practices': 'What your child will practice',
    'detail.objectives': 'In this game, you will learn to:',
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
    'footer.contactPlaceholder': '[CONTACT INFORMATION]',
    'mascot.homeAlt': "Mrs. Dani's fox mascot, happy and waving",
    'card.screenshot': '[GAME SCREENSHOT]',
    'library.emptyIcon': '[FOX: curious]',
    'filter.grade3': '3rd Grade',
    'filter.grade4': '4th Grade',
    'filter.grade5': '5th Grade',
    'filter.grade8': '8th Grade',
    'filter.bilingual': 'Bilingual',
    'filter.grammar': 'Grammar',
    'filter.vocabulary': 'Vocabulary',
    'filter.reading': 'Reading',
    'filter.writing': 'Writing',
    'filter.listening': 'Listening',
    'filter.beginner': 'Beginner',
    'filter.intermediate': 'Intermediate',
    'filter.advanced': 'Advanced',
    'library.category': 'Category',
    'about.pageTitle': 'About — Mrs. Dani',
    'about.eyebrow': 'About',
    'about.title': 'The educator behind the games.',
    'about.photoAlt': 'Photo of Mrs. Dani',
    'about.bio1': "I have a degree in Education (Pedagogy) from Unicamp, in Portuguese/English Language and Literature from Unip, and a postgraduate degree in English Language Teaching Methodology.",
    'about.bio2': "I've been teaching English since 2013, having worked at well-known schools such as Colégio Notre Dame de Campinas, where I stayed for over 10 years, and Colégio Progresso, for 2 years. Since 2023 I've focused on private online lessons for adults and children, and with younger students I've been specializing in school support.",
    'about.bio3': "Passionate about technology, I created this site with games so my students can reinforce what they learn in class in a fun and engaging way. Each game is born from a real difficulty I saw in the classroom — not a generic vocabulary list.",
    'about.callout': 'Before becoming games, these activities were English school-support lessons — a service Mrs. Dani still offers. <a href="../school-support/index.html" class="link-inline">Check out School Support</a>.',
    'ss.eyebrow': 'For kids & teens',
    'ss.title': 'School support, not another English class.',
    'ss.lede': "This isn't general English instruction. It's targeted help with the English your child is already being taught at school — their textbook, their homework, their upcoming assessments.",
    'ss.cta': 'See the game library',
    'ss.photoPlaceholder': '[PHOTO: student studying at home]',
    'ss.includedEyebrow': "What's included",
    'ss.includedTitle': "Built around your child's actual coursework.",
    'ss.card1.title': 'Review of school content',
    'ss.card1.body': "We go over what's being taught in class right now, using the same vocabulary and structures from your child's textbook.",
    'ss.card2.title': 'Homework support',
    'ss.card2.body': 'Working through assignments together, so your child understands the "why," not just the answer.',
    'ss.card3.title': 'Assessment preparation',
    'ss.card3.body': 'Targeted review before tests and quizzes, focused on the specific concepts a student finds difficult.',
    'ss.practiceEyebrow': 'Practice beyond the lesson',
    'ss.practiceTitle': "Interactive games, built for what your child is struggling with.",
    'ss.practiceBody': "When a student is having a hard time with a specific concept — prepositions, past tense, a vocabulary set — Mrs. Dani builds an interactive activity around exactly that, using the vocabulary from their own textbook where possible.",
    'ss.screenshotPlaceholder': '[SCREENSHOT: Town Explorer game]',
    'ss.footerLink': 'For parents: how it works →',
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
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    el.setAttribute('alt', t(el.dataset.i18nAlt));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
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
  8: { pt: '8º ano', en: '8th Grade' }
};
const SKILL_LABELS = {
  Vocabulary: { pt: 'Vocabulário', en: 'Vocabulary' },
  Grammar: { pt: 'Gramática', en: 'Grammar' },
  Reading: { pt: 'Leitura', en: 'Reading' },
  Writing: { pt: 'Escrita', en: 'Writing' },
  Listening: { pt: 'Escuta', en: 'Listening' },
  Bilingual: { pt: 'Bilíngue', en: 'Bilingual' }
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
    practices: ['next to', 'above', 'below', 'between', "Where's the...?"],
    objectivesPT: [
      'Identificar e nomear lugares da cidade em inglês, como bank, sports center, castle, library, train station, clock tower, market, bus stop, parking lot, fair e map.',
      'Utilizar preposições de lugar em inglês, como next to, above, below, between, in front of e behind, para localizar e descrever lugares.',
      'Compreender e seguir pistas para encontrar locais em um mapa.',
      'Fazer e responder perguntas sobre localização, utilizando estruturas como "Where\'s the...?".',
      'Associar lugares da cidade às suas funções e finalidades, compreendendo situações do dia a dia.',
      'Organizar informações espaciais para descrever a posição de diferentes locais em inglês.'
    ],
    objectives: [
      'Identify and name places in the city in English, such as bank, sports center, castle, library, train station, clock tower, market, bus stop, parking lot, fair, and map.',
      'Use prepositions of place in English, such as next to, above, below, between, in front of, and behind, to locate and describe places.',
      'Understand and follow clues to find locations on a map.',
      'Ask and answer questions about location, using structures like "Where\'s the...?"',
      'Match city places to their functions and purposes, understanding everyday situations.',
      'Organize spatial information to describe the position of different locations in English.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-citymap/',
    thumbnail: 'assets/games/town-explorer-screenshot.jpg'
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
    objectivesPT: [
      'Identificar e nomear diferentes esportes em inglês, como badminton, ping-pong, tennis, basketball, baseball, volleyball, soccer, field hockey, swimming e running, associando imagens ao vocabulário correspondente.',
      'Identificar o vocabulário relacionado aos equipamentos utilizados em cada esporte e aos locais onde eles são praticados.',
      'Formar frases corretamente utilizando verbos com a terminação -ing, desenvolvendo a construção de sentenças em inglês.',
      'Usar verbos com -ing para expressar opiniões e sentimentos sobre esportes e atividades.',
      'Organizar frases em sequência lógica para produzir um pequeno texto sobre um esporte em inglês.'
    ],
    objectives: [
      'Identify and name different sports in English, such as badminton, ping-pong, tennis, basketball, baseball, volleyball, soccer, field hockey, swimming, and running, matching images to the corresponding vocabulary.',
      'Identify vocabulary related to the equipment used in each sport and the places where they are played.',
      'Correctly form sentences using verbs ending in -ing, building sentence-construction skills in English.',
      'Use -ing verbs to express opinions and feelings about sports and activities.',
      'Organize sentences in logical sequence to produce a short text about a sport in English.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/3ano-sports/',
    thumbnail: 'assets/games/sports-playground-screenshot.jpg'
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
    objectivesPT: [
      'Identificar e nomear lugares da cidade em inglês, como train station, hospital, movie theater, playground, café, store, street, bus stop, park, school e swimming pool.',
      'Fazer e responder perguntas utilizando a estrutura "Does Top Town have...?", empregando respostas curtas como "Yes, it does" e "No, it doesn\'t".',
      'Utilizar preposições de lugar em inglês, como next to, in front of, between e behind, para localizar e descrever lugares da cidade.',
      'Compreender a posição dos elementos em um mapa utilizando o vocabulário adequado.',
      'Organizar palavras na ordem correta para formar frases gramaticalmente corretas em inglês.'
    ],
    objectives: [
      'Identify and name places in the city in English, such as train station, hospital, movie theater, playground, café, store, street, bus stop, park, school, and swimming pool.',
      'Ask and answer questions using the structure "Does Top Town have...?", using short answers like "Yes, it does" and "No, it doesn\'t."',
      'Use prepositions of place in English, such as next to, in front of, between, and behind, to locate and describe places in the city.',
      'Understand the position of elements on a map using the appropriate vocabulary.',
      'Put words in the correct order to form grammatically correct sentences in English.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/3ano-prepositions_does_it_have/',
    thumbnail: 'assets/games/top-town-screenshot.jpg'
  },
  {
    id: 'personal-narrative',
    title: 'Personal Narrative',
    gradeNum: 3,
    skill: ['Writing', 'Vocabulary', 'Bilingual'],
    topic: 'Personal Writing',
    grammar: 'Sentence sequencing',
    difficulty: 'Intermediate',
    gameType: 'Story Planning & Writing',
    schoolAlignment: '3rd Grade English',
    description: 'Sort sentences and words, match vocabulary to pictures, then plan and write your own personal narrative in English.',
    descriptionPT: 'Ordene frases e palavras, associe vocabulário a figuras e depois planeje e escreva sua própria narrativa pessoal em inglês.',
    why: 'Builds from vocabulary and sentence order into real independent writing, guided by who/when/where/what/how.',
    whyPT: 'Constrói do vocabulário e da ordem das frases até a escrita independente, guiado pelas perguntas quem/quando/onde/o quê/como.',
    practices: ['who, when, where, what, how', 'sentence order', 'story planning'],
    objectivesPT: [
      'Ordenar frases e palavras para formar textos coerentes em inglês.',
      'Associar vocabulário de lugares, sentimentos e verbos de ação às imagens correspondentes.',
      'Planejar uma narrativa pessoal respondendo quem, quando, onde, o quê e como.',
      'Escrever sua própria narrativa pessoal em inglês.'
    ],
    objectives: [
      'Sort sentences and words to form coherent English texts.',
      'Match places, feelings, and action verb vocabulary to the correct pictures.',
      'Plan a personal narrative by answering who, when, where, what, and how.',
      'Write your own personal narrative in English.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/3ano-personal_writing/'
  },
  {
    id: 'growing-plants',
    title: 'Growing Plants',
    gradeNum: 3,
    skill: ['Vocabulary', 'Reading', 'Bilingual'],
    topic: 'Science - Plants',
    grammar: 'Science vocabulary',
    difficulty: 'Beginner',
    gameType: 'Science Garden Mission (8 stages)',
    schoolAlignment: '3rd Grade Science (Bilingual)',
    description: 'Explore a garden through 8 mini-games covering parts of a plant, water, light, temperature, healthy plants, and flowering vs. non-flowering plants.',
    descriptionPT: 'Explore um jardim em 8 minijogos sobre as partes de uma planta, água, luz, temperatura, plantas saudáveis e plantas com e sem flor.',
    why: 'Reviews the whole "Growing Plants" science unit through hands-on drag-and-drop, sorting, and true/false stages, in English.',
    whyPT: 'Revisa toda a unidade de ciências "Growing Plants" com estágios práticos de arrastar e soltar, classificação e verdadeiro/falso, em inglês.',
    practices: ['parts of a plant', 'water journey', 'healthy vs. needs help', 'flowering vs. non-flowering'],
    objectivesPT: [
      'Identificar as partes de uma planta (root, stem, leaves, flower) em inglês.',
      'Reconhecer o que uma planta precisa para crescer saudável: água, luz e temperatura adequada.',
      'Diferenciar plantas saudáveis de plantas que precisam de cuidado.',
      'Compreender o caminho da água dentro da planta, do solo até as folhas.',
      'Classificar plantas em flowering (com flor) e non-flowering (sem flor).'
    ],
    objectives: [
      'Identify the parts of a plant (root, stem, leaves, flower) in English.',
      'Recognize what a plant needs to grow healthy: water, light, and the right temperature.',
      'Tell healthy plants apart from plants that need help.',
      'Understand the water\'s journey inside a plant, from the soil to the leaves.',
      'Sort plants into flowering and non-flowering.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'growing-plants/index.html',
    thumbnail: 'games/growing-plants/assets/plant-parts.jpg'
  },
  {
    id: 'spelling-bee',
    title: 'Spelling Bee - list 3',
    collection: 'spelling-bee',
    skill: ['Vocabulary', 'Writing', 'Listening'],
    topic: 'Spelling',
    grammar: 'Vocabulary & Spelling',
    difficulty: 'Beginner',
    gameType: 'Listen & Spell Challenge',
    schoolAlignment: 'Vocabulary Review',
    description: 'Listen to each word or sentence, then spell it — type it in Phase 1/2, or tap the scrambled letters into order in the Challenge round.',
    descriptionPT: 'Ouça cada palavra ou frase e escreva — digitando nas Fases 1/2, ou clicando nas letras embaralhadas na ordem certa no Challenge.',
    why: 'Combines two ways to practice spelling by ear: typing what you hear, and rebuilding a scrambled word letter by letter.',
    whyPT: 'Combina duas formas de praticar ortografia pelo ouvido: digitar o que ouve e remontar uma palavra embaralhada letra por letra.',
    practices: ['listening', 'spelling', 'vocabulary review'],
    objectivesPT: [
      'Reconhecer palavras e frases em inglês pelo som, usando áudio real.',
      'Praticar a grafia e a pontuação corretas em inglês digitando o que ouviu.',
      'Identificar exatamente qual palavra de uma frase precisa ser corrigida.',
      'Reconstruir a ortografia de uma palavra clicando suas letras na ordem certa.',
      'Revisar e repetir itens errados até fixar a ortografia correta.'
    ],
    objectives: [
      'Recognize English words and sentences by sound, using real audio.',
      'Practice correct English spelling and punctuation by typing what they hear.',
      'Identify exactly which word in a sentence needs to be corrected.',
      'Rebuild a word\'s spelling by tapping its letters in the right order.',
      'Review and repeat missed items to reinforce correct spelling.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'spelling-bee/index.html',
    thumbnail: 'games/spelling-bee/assets/img/bee-mascot.png'
  },
  {
    id: 'adverbs-adventure',
    title: 'Adverbs Adventure!',
    gradeNum: 4,
    skill: ['Grammar'],
    topic: 'Adverbs of Frequency',
    grammar: 'Subject + adverb + verb + rest of sentence',
    difficulty: 'Beginner',
    gameType: 'Sentence Building',
    schoolAlignment: '4th Grade English',
    description: 'Click words to build correct sentences with adverbs of frequency, in the order subject + adverb + verb + rest of sentence.',
    descriptionPT: 'Clique nas palavras para montar frases corretas com advérbios de frequência, na ordem sujeito + advérbio + verbo + resto da frase.',
    why: 'Turns the tricky word-order rule for adverbs of frequency into a hands-on building game.',
    whyPT: 'Transforma a regra de ordem das palavras com advérbios de frequência em um jogo prático de montar frases.',
    practices: ['always', 'usually', 'sometimes', 'never', 'word order'],
    objectivesPT: [
      'Reconhecer advérbios de frequência em inglês.',
      'Montar frases na ordem correta: sujeito + advérbio + verbo + resto da frase.',
      'Praticar a conjugação do verbo junto ao advérbio de frequência.'
    ],
    objectives: [
      'Recognize adverbs of frequency in English.',
      'Build sentences in the correct order: subject + adverb + verb + rest of sentence.',
      'Practice verb conjugation together with the adverb of frequency.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-adverbs_of_frequency/'
  },
  {
    id: 'daily-tasks',
    title: 'Daily Tasks Games',
    gradeNum: 4,
    skill: ['Vocabulary', 'Writing'],
    topic: 'Household Chores',
    grammar: 'Daily routines vocabulary',
    difficulty: 'Beginner',
    gameType: '5 Mini-Games',
    schoolAlignment: '4th Grade English',
    description: 'Five mini-games to learn household chores vocabulary: unscramble words, identify pictures, and complete sentences.',
    descriptionPT: 'Cinco minijogos para aprender vocabulário de tarefas domésticas: monte palavras embaralhadas, identifique figuras e complete frases.',
    why: 'Repeats the same daily-routines vocabulary across five different game formats so it really sticks.',
    whyPT: 'Repete o mesmo vocabulário de tarefas domésticas em cinco formatos de jogo diferentes para fixar de verdade.',
    practices: ['wash the dishes', 'make the bed', 'take out the trash'],
    objectivesPT: [
      'Reconhecer e nomear tarefas domésticas em inglês.',
      'Reconstituir palavras embaralhadas relacionadas a tarefas domésticas.',
      'Identificar tarefas a partir de figuras e completar frases sobre rotina.'
    ],
    objectives: [
      'Recognize and name household chores in English.',
      'Unscramble words related to household chores.',
      'Identify chores from pictures and complete sentences about daily routine.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-daily_tasks/'
  },
  {
    id: 'where-are-you-going',
    title: 'Where Are You Going? — Grammar Trip',
    gradeNum: 4,
    skill: ['Grammar'],
    topic: "Going to (purpose)",
    grammar: "Be going to + infinitive of purpose",
    difficulty: 'Beginner',
    gameType: 'Interactive Trip',
    schoolAlignment: '4th Grade English',
    description: "Choose any stop on a trip, in any order, and practice \"I'm going to the ___ to ___\" (be going to + infinitive of purpose).",
    descriptionPT: 'Escolha as paradas de uma viagem, na ordem que quiser, e pratique "I\'m going to the ___ to ___" (be going to + infinitivo de propósito).',
    why: 'Turns a grammar structure into a free-choice trip so students can practice the same pattern with places they pick themselves.',
    whyPT: 'Transforma uma estrutura gramatical em uma viagem de escolha livre, praticando o mesmo padrão com lugares escolhidos pelo aluno.',
    practices: ["I'm going to the...", 'infinitive of purpose'],
    objectivesPT: [
      'Usar a estrutura "be going to" para falar sobre planos e intenções.',
      'Combinar lugares com a finalidade da visita usando o infinitivo de propósito.',
      'Formar frases completas com "I\'m going to the ___ to ___".'
    ],
    objectives: [
      'Use the "be going to" structure to talk about plans and intentions.',
      'Match places with the purpose of the visit using the infinitive of purpose.',
      'Form complete sentences with "I\'m going to the ___ to ___".'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-goingto/'
  },
  {
    id: 'sofias-busy-day',
    title: "Sofia's Busy Day",
    gradeNum: 4,
    skill: ['Grammar', 'Reading'],
    topic: 'Going to (plans)',
    grammar: "Be going to",
    difficulty: 'Beginner',
    gameType: 'Comic Strip & 4 Mini-Games',
    schoolAlignment: '4th Grade English',
    description: "Read Sofia's comic strip and play four mini-games to practice \"I'm going to\" for talking about plans.",
    descriptionPT: 'Leia a tirinha da Sofia e jogue quatro minijogos para praticar "I\'m going to" ao falar sobre planos.',
    why: 'Connects reading a comic strip with independent grammar practice, in any order, as many times as needed.',
    whyPT: 'Conecta a leitura de uma tirinha com a prática independente de gramática, em qualquer ordem e quantas vezes forem necessárias.',
    practices: ["be going to", 'reading comprehension'],
    objectivesPT: [
      'Ler e compreender uma tirinha em inglês sobre o dia de Sofia.',
      'Identificar usos de "be going to" no texto.',
      'Praticar "be going to" em quatro minijogos independentes.'
    ],
    objectives: [
      "Read and understand a comic strip in English about Sofia's day.",
      'Identify uses of "be going to" in the text.',
      'Practice "be going to" in four independent mini-games.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano_going_to/'
  },
  {
    id: 'places-in-a-city',
    title: 'Places in a City & Prepositions of Place',
    gradeNum: 4,
    skill: ['Vocabulary', 'Grammar'],
    topic: 'City Places',
    grammar: 'Prepositions of Place',
    difficulty: 'Beginner',
    gameType: 'Vocabulary & Prepositions Practice',
    schoolAlignment: '4th Grade English',
    description: 'Learn city places vocabulary and practice prepositions of place in English.',
    descriptionPT: 'Aprenda vocabulário de lugares da cidade e pratique preposições de lugar em inglês.',
    why: 'Pairs city vocabulary with the prepositions needed to describe where each place is.',
    whyPT: 'Conecta o vocabulário da cidade com as preposições necessárias para descrever onde cada lugar fica.',
    practices: ['city places', 'next to', 'between', 'in front of'],
    objectivesPT: [
      'Identificar e nomear lugares da cidade em inglês.',
      'Utilizar preposições de lugar para descrever onde os lugares ficam.'
    ],
    objectives: [
      'Identify and name city places in English.',
      'Use prepositions of place to describe where places are located.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-preposition_of_place1/'
  },
  {
    id: 'what-time-is-it',
    title: 'What Time Is It?',
    gradeNum: 4,
    skill: ['Vocabulary', 'Listening'],
    topic: 'Telling Time',
    grammar: "What time is it? / It's...",
    difficulty: 'Beginner',
    gameType: 'Clock Reading Quiz',
    schoolAlignment: '4th Grade English',
    description: 'Look at the clock and choose the correct answer to practice telling time in English.',
    descriptionPT: 'Olhe para o relógio e escolha a resposta certa para praticar como dizer as horas em inglês.',
    why: 'Straightforward repetition of clock reading builds confidence telling time quickly.',
    whyPT: 'A repetição direta da leitura do relógio traz confiança para dizer as horas rapidamente.',
    practices: ["What time is it?", "It's...", "o'clock, half past, quarter past"],
    objectivesPT: [
      'Ler as horas em um relógio analógico em inglês.',
      'Responder corretamente "What time is it?" para diferentes horários.'
    ],
    objectives: [
      'Read the time on an analog clock in English.',
      'Correctly answer "What time is it?" for different times.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/4ano-what_time_is_it/'
  },
  {
    id: 'connectors-past-tenses',
    title: 'Revisão: Connectors & Past Tenses',
    gradeNum: 5,
    skill: ['Grammar', 'Reading'],
    topic: 'Connectors & Past Tenses',
    grammar: 'Connectors + Past Simple/Continuous',
    difficulty: 'Intermediate',
    gameType: 'Study Review with Tabs',
    schoolAlignment: '5th Grade English',
    description: 'A full test-review with rules, exercises, sentence unscrambling, and reading comprehension on connectors and past tenses. Progress is saved automatically.',
    descriptionPT: 'Revisão completa para a prova com regras, exercícios, frases para desembaralhar e interpretação de texto sobre conectores e tempos verbais no passado. O progresso fica salvo automaticamente.',
    why: 'Groups every format a review needs — rules, drills, and reading — into one page organized by tabs.',
    whyPT: 'Reúne todos os formatos que uma revisão precisa — regras, exercícios e leitura — em uma só página organizada por abas.',
    practices: ['connectors', 'past simple', 'past continuous'],
    objectivesPT: [
      'Revisar as regras de uso dos conectores e dos tempos verbais no passado.',
      'Praticar com exercícios, frases desembaralhadas e interpretação de texto.'
    ],
    objectives: [
      'Review the rules for using connectors and past tenses.',
      'Practice with exercises, sentence unscrambling, and reading comprehension.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-Connectors_Past_Tenses/'
  },
  {
    id: 'emergency-helpers',
    title: 'Emergency Helpers • Past Continuous',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Past Continuous',
    grammar: 'Was / Were',
    difficulty: 'Beginner',
    gameType: '5 Quick Games',
    schoolAlignment: '5th Grade English',
    description: "Five quick games to help you choose the right word — was or were — every time, including tricky subjects.",
    descriptionPT: 'Cinco minijogos rápidos para escolher was ou were corretamente, inclusive em sujeitos mais difíceis, e praticar o passado contínuo.',
    why: 'Isolates the single most common past-continuous mistake (was vs. were) and drills it from every angle.',
    whyPT: 'Isola o erro mais comum do passado contínuo (was vs. were) e treina de vários ângulos diferentes.',
    practices: ['was', 'were', 'sentence unscramble'],
    objectivesPT: [
      'Escolher corretamente was ou were para pronomes, nomes e sujeitos difíceis.',
      'Reorganizar frases embaralhadas no passado contínuo.'
    ],
    objectives: [
      'Correctly choose was or were for pronouns, names, and tricky subjects.',
      'Rearrange scrambled sentences in the past continuous.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-past_continuous/'
  },
  {
    id: 'time-detective',
    title: 'Time Detective — Past Simple vs Past Progressive',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Past Simple vs Past Progressive',
    grammar: 'Past Simple vs Past Progressive',
    difficulty: 'Intermediate',
    gameType: 'Detective Case Game',
    schoolAlignment: '5th Grade English',
    description: 'Solve the grammar case, one sentence at a time, telling apart the past simple and the past progressive.',
    descriptionPT: 'Resolva o caso, uma frase de cada vez, distinguindo o passado simples do passado progressivo.',
    why: 'Frames a hard grammar comparison as a detective case to keep it engaging, breaking each sentence down step by step.',
    whyPT: 'Transforma uma comparação gramatical difícil em um caso de detetive, quebrando cada frase passo a passo.',
    practices: ['past simple', 'past progressive'],
    objectivesPT: [
      'Diferenciar o passado simples do passado progressivo em contexto.',
      'Analisar frases passo a passo para identificar o tempo verbal correto.'
    ],
    objectives: [
      'Tell apart the past simple and past progressive in context.',
      'Break sentences down step by step to identify the correct tense.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-past_simple_and_progressive/'
  },
  {
    id: 'past-simple-vs-continuous-quiz',
    title: 'Past Simple vs Past Continuous — Quiz de Revisão',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Past Simple vs Past Continuous',
    grammar: 'WHEN, WHILE, WAS, WERE',
    difficulty: 'Intermediate',
    gameType: 'Review Quiz',
    schoolAlignment: '5th Grade English',
    description: 'A review quiz on WHEN, WHILE, WAS, and WERE, comparing the past simple and the past continuous.',
    descriptionPT: 'Quiz de revisão para a prova sobre WHEN, WHILE, WAS e WERE, comparando o passado simples e o passado contínuo.',
    why: 'Targets the connector words that signal which past tense to use, not just the verb forms themselves.',
    whyPT: 'Foca nos conectores que indicam qual tempo verbal usar, e não só nas formas verbais em si.',
    practices: ['when', 'while', 'was', 'were'],
    objectivesPT: [
      'Reconhecer quando usar WHEN e WHILE com o passado simples e contínuo.',
      'Revisar o uso de WAS e WERE no passado contínuo.'
    ],
    objectives: [
      'Recognize when to use WHEN and WHILE with the past simple and continuous.',
      'Review the use of WAS and WERE in the past continuous.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-pastsimple_pastcontinuous/'
  },
  {
    id: 'prepositions-of-time',
    title: 'Prepositions of Time: IN, ON, AT',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Prepositions of Time',
    grammar: 'IN, ON, AT',
    difficulty: 'Beginner',
    gameType: 'Rules + Practice',
    schoolAlignment: '5th Grade English',
    description: 'Learn the rules for using IN, ON, and AT to talk about time in English, then practice.',
    descriptionPT: 'Aprenda as regras de uso de IN, ON e AT para falar sobre tempo em inglês e depois pratique.',
    why: 'Walks through the rules first — exact times, days, longer periods — before testing them.',
    whyPT: 'Apresenta as regras primeiro — horários exatos, dias, períodos mais longos — antes de testá-las na prática.',
    practices: ['at 7 o\'clock', 'on Monday', 'in the morning'],
    objectivesPT: [
      'Compreender quando usar AT, ON e IN para expressar tempo em inglês.',
      'Aplicar as regras em frases práticas do dia a dia.'
    ],
    objectives: [
      'Understand when to use AT, ON, and IN to express time in English.',
      'Apply the rules in everyday practice sentences.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-preposition_in_on_at/'
  },
  {
    id: 'preposicoes-in-on-at',
    title: 'Preposições — IN, ON, AT',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Prepositions of Time',
    grammar: 'IN, ON, AT',
    difficulty: 'Beginner',
    gameType: 'Categorization Practice',
    schoolAlignment: '5th Grade English',
    description: 'Discover when to use IN, ON, and AT by sorting time expressions like days, months, seasons, and exact times.',
    descriptionPT: 'Descubra quando usar IN, ON e AT organizando expressões de tempo como dias, meses, estações e horários exatos.',
    why: 'A second, categorization-style pass at IN/ON/AT — good extra practice once the basic rules are known.',
    whyPT: 'Uma segunda forma de praticar IN/ON/AT, por categorização — ótimo reforço depois de aprender as regras básicas.',
    practices: ['days', 'months', 'seasons', 'exact times'],
    objectivesPT: [
      'Classificar expressões de tempo nas categorias corretas de AT, ON e IN.',
      'Reforçar o uso de preposições de tempo com exemplos do dia a dia.'
    ],
    objectives: [
      'Sort time expressions into the correct AT, ON, and IN categories.',
      'Reinforce the use of prepositions of time with everyday examples.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-preposition_in_on_at_1/'
  },
  {
    id: 'all-aboard-review',
    title: 'All Aboard! English Review — Super Minds 4',
    gradeNum: 5,
    skill: ['Grammar', 'Reading'],
    topic: 'Units 2 & 4 Review',
    grammar: 'Super Minds 4, Units 2 & 4',
    difficulty: 'Intermediate',
    gameType: 'Test Review',
    schoolAlignment: '5th Grade English — Super Minds 4',
    description: 'A test review for Units 2 and 4 of the Super Minds 4 course book.',
    descriptionPT: 'Revisão para a prova das Units 2 e 4 do livro Super Minds 4.',
    why: 'Matches the exact units being tested at school, so review time goes straight to what matters for the exam.',
    whyPT: 'Segue exatamente as unidades cobradas na prova da escola, focando o tempo de revisão no que realmente cai.',
    practices: ['Super Minds 4 — Units 2 & 4'],
    objectivesPT: [
      'Revisar o conteúdo das Units 2 e 4 do livro Super Minds 4 antes da prova.'
    ],
    objectives: [
      'Review the content of Units 2 and 4 of Super Minds 4 before the test.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-review_test/'
  },
  {
    id: 'simple-past-adventure',
    title: 'Simple Past Adventure',
    gradeNum: 5,
    skill: ['Grammar'],
    topic: 'Simple Past — Regular Verbs',
    grammar: 'Regular verbs in the simple past',
    difficulty: 'Beginner',
    gameType: 'Learn & Play',
    schoolAlignment: '5th Grade English',
    description: 'Learn and practice regular verbs in the simple past in English.',
    descriptionPT: 'Aprenda e pratique verbos regulares no passado simples em inglês.',
    why: 'A focused first step into the simple past, limited to regular -ed verbs to build a solid foundation.',
    whyPT: 'Um primeiro passo focado no passado simples, limitado aos verbos regulares em -ed para construir uma base sólida.',
    practices: ['-ed verbs', 'regular verbs'],
    objectivesPT: [
      'Conjugar verbos regulares no passado simples em inglês.',
      'Usar verbos no passado simples em frases completas.'
    ],
    objectives: [
      'Conjugate regular verbs in the simple past in English.',
      'Use simple past verbs in complete sentences.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/5ano-simple_past_1/'
  },
  {
    id: 'permission-obligation',
    title: 'Permission & Obligation Practice',
    gradeNum: 8,
    skill: ['Grammar'],
    topic: 'Permission & Obligation',
    grammar: "Be allowed to · Let & Make · It is said / thought",
    difficulty: 'Advanced',
    gameType: 'Worksheet Practice',
    schoolAlignment: '8th Grade English',
    description: 'Practice be allowed to, let & make, and it is said/thought in a grammar worksheet about permission and obligation.',
    descriptionPT: 'Pratique be allowed to, let & make e it is said/thought em uma ficha de gramática sobre permissão e obrigação.',
    why: 'Brings together three related structures that students often mix up, in one focused worksheet.',
    whyPT: 'Reúne três estruturas relacionadas que os alunos costumam confundir, em uma única ficha focada.',
    practices: ['be allowed to', 'let / make', 'it is said / thought'],
    objectivesPT: [
      'Usar "be allowed to" para falar sobre permissão.',
      'Diferenciar "let" e "make" para falar sobre permissão e obrigação.',
      'Usar estruturas como "it is said/thought" para relatar opiniões gerais.'
    ],
    objectives: [
      'Use "be allowed to" to talk about permission.',
      'Tell apart "let" and "make" to talk about permission and obligation.',
      'Use structures like "it is said/thought" to report general opinions.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/8ano-be_allowed_to/',
    thumbnail: 'assets/games/permission-obligation-screenshot.jpg'
  },
  {
    id: 'active-passive-environment',
    title: 'Active & Passive: Environment',
    gradeNum: 8,
    skill: ['Grammar', 'Writing'],
    topic: 'Passive Voice',
    grammar: 'Active vs Passive Voice',
    difficulty: 'Advanced',
    gameType: 'Sentence Transformation',
    schoolAlignment: '8th Grade English',
    description: 'Practice transforming sentences between active and passive voice using sentences about the environment, with exercises that get harder in each section.',
    descriptionPT: 'Pratique transformar frases entre a voz ativa e passiva usando frases sobre o meio ambiente, com exercícios que ficam mais difíceis a cada seção.',
    why: 'Uses a real content topic (the environment) instead of random sentences, so grammar practice feels connected to something meaningful.',
    whyPT: 'Usa um tema de conteúdo real (o meio ambiente) em vez de frases aleatórias, conectando a prática de gramática a algo significativo.',
    practices: ['active voice', 'passive voice', 'sentence transformation'],
    objectivesPT: [
      'Transformar frases da voz ativa para a passiva e vice-versa.',
      'Aplicar a voz passiva em frases sobre o meio ambiente.'
    ],
    objectives: [
      'Transform sentences from active to passive voice and vice versa.',
      'Apply the passive voice to sentences about the environment.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/8ano-passiva-meio-ambiente/'
  },
  {
    id: 'reading-comprehension-tests',
    title: 'Reading Comprehension Practice Tests',
    gradeNum: 8,
    skill: ['Reading', 'Grammar'],
    topic: 'Reading & Future Tenses',
    grammar: 'Future Tenses Grammar Review',
    difficulty: 'Advanced',
    gameType: '6 Texts + Grammar Review',
    schoolAlignment: '8th Grade English — Level A2+/B1',
    description: 'Six informational texts with comprehension questions, plus a future tenses grammar review, level A2+/B1.',
    descriptionPT: 'Seis textos informativos com perguntas de interpretação, além de revisão de gramática dos tempos futuros, nível A2+/B1.',
    why: 'Combines reading practice with a grammar review, mirroring the mixed format of real exams.',
    whyPT: 'Combina prática de leitura com revisão de gramática, no mesmo formato misto das provas de verdade.',
    practices: ['reading comprehension', 'future tenses'],
    objectivesPT: [
      'Ler e interpretar seis textos informativos em inglês.',
      'Revisar o uso dos tempos futuros em inglês.'
    ],
    objectives: [
      'Read and interpret six informational texts in English.',
      'Review the use of future tenses in English.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/8ano-reading_comprehension/'
  },
  {
    id: 'a-voz-passiva',
    title: 'A Voz Passiva — Ficha de Estudo',
    gradeNum: 8,
    skill: ['Grammar'],
    topic: 'Passive Voice',
    grammar: 'Passive Voice',
    difficulty: 'Advanced',
    gameType: 'Study Sheet',
    schoolAlignment: '8th Grade English',
    description: "A study sheet about the passive voice: see how it's built, then practice until you memorize it.",
    descriptionPT: 'Ficha de estudo sobre a voz passiva: veja como ela é montada e treine até memorizar.',
    why: 'A clear reference sheet for students who need the passive voice explained step by step before practicing.',
    whyPT: 'Uma ficha de referência clara para alunos que precisam da voz passiva explicada passo a passo antes de praticar.',
    practices: ['passive voice formula'],
    objectivesPT: [
      'Compreender como a voz passiva é formada em inglês.',
      'Praticar frases na voz passiva até memorizar a estrutura.'
    ],
    objectives: [
      'Understand how the passive voice is formed in English.',
      'Practice passive voice sentences until the structure is memorized.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/8ano-the_passive/'
  },
  {
    id: 'o-caso-da-voz-oculta',
    title: 'O Caso da Voz Oculta — Ativa vs. Passiva',
    gradeNum: 8,
    skill: ['Grammar', 'Reading'],
    topic: 'Active vs Passive Voice',
    grammar: 'Active vs Passive Voice',
    difficulty: 'Advanced',
    gameType: 'Detective Investigation',
    schoolAlignment: '8th Grade English',
    description: 'An investigation into active and passive voice in English — grammar and reading comprehension practice, exam-prep level.',
    descriptionPT: 'Uma investigação sobre Voz Ativa e Voz Passiva em inglês — treino de gramática e interpretação de texto, nível vestibular.',
    why: 'Frames the hardest part of the passive voice — noticing when the agent hides — as a detective mystery.',
    whyPT: 'Transforma a parte mais difícil da voz passiva — perceber quando o agente se esconde — em um mistério de detetive.',
    practices: ['active voice', 'passive voice', 'agent identification'],
    objectivesPT: [
      'Diferenciar a voz ativa da voz passiva em inglês.',
      'Identificar quando o agente aparece ou se esconde na frase.',
      'Interpretar textos usando pistas gramaticais.'
    ],
    objectives: [
      'Tell apart active and passive voice in English.',
      'Identify when the agent appears or hides in the sentence.',
      'Interpret texts using grammatical clues.'
    ],
    price: null,
    currency: 'BRL',
    access: 'beta',
    status: 'available',
    gameUrl: 'https://mrsdani.com.br/8ano-voz_ativa_e_passiva/'
  }
];

/* =========================================================
   GAME CARD RENDERING
   ========================================================= */
function gameCardHTML(game) {
  const prefix = (typeof document !== 'undefined' && document.body.dataset.assetPrefix) || '';
  const gradeLabel = GRADE_LABELS[game.gradeNum] ? GRADE_LABELS[game.gradeNum][currentLang] : '';
  const skills = game.skill.map(s => `<span class="tag tag-skill">${(SKILL_LABELS[s] && SKILL_LABELS[s][currentLang]) || s}</span>`).join('');
  const diffLabel = (DIFFICULTY_LABELS[game.difficulty] && DIFFICULTY_LABELS[game.difficulty][currentLang]) || game.difficulty;
  const desc = currentLang === 'pt' ? game.descriptionPT : game.description;
  const accessLabel = game.access === 'included'
    ? `<span class="access-pill included">${t('card.included')}</span>`
    : `<span class="access-pill purchase">${t('card.purchase')}</span>`;
  const ctaLabel = game.access === 'included' ? t('card.cta.view') : t('card.cta.buy');
  const mediaHTML = game.thumbnail
    ? `<img src="${prefix}${game.thumbnail}" alt="${game.title}">`
    : t('card.screenshot');

  return `
    <article class="game-card" data-id="${game.id}">
      <div class="game-card-media">${mediaHTML}</div>
      <div class="game-card-body">
        <div class="game-card-tags">
          ${gradeLabel ? `<span class="tag tag-grade">${gradeLabel}</span>` : ''}
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
  const grades = [...new Set(GAMES.map(g => g.gradeNum).filter(Boolean))].sort((a, b) => a - b);
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
let libraryState = { grade: new Set(), skill: new Set(), difficulty: new Set(), collection: new Set() };

function initLibrary(preserveState) {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  if (!preserveState) {
    libraryState = { grade: new Set(), skill: new Set(), difficulty: new Set(), collection: new Set() };
    const params = new URLSearchParams(window.location.search);
    const gradeParam = params.get('grade');
    if (gradeParam) libraryState.grade.add(Number(gradeParam));
  }

  const filterBarCount = document.getElementById('filter-bar-count');
  const filterChipsEl = document.getElementById('filter-chips');
  const filterClearAllBtn = document.getElementById('filter-clear-all');
  const filterToggleBtn = document.getElementById('filter-toggle');
  const filtersPanel = document.getElementById('filters-panel');
  const filterOverlay = document.getElementById('filter-overlay');
  const filterPanelClose = document.getElementById('filter-panel-close');
  const filterPanelApply = document.getElementById('filter-panel-apply');

  const CHIP_LABELS = {
    grade: v => (currentLang === 'pt' ? `${v}º ano` : `Grade ${v}`),
    skill: v => document.querySelector(`.filter-option input[data-group="skill"][value="${v}"]`)
      ?.parentElement.textContent.trim() || v,
    difficulty: v => document.querySelector(`.filter-option input[data-group="difficulty"][value="${v}"]`)
      ?.parentElement.textContent.trim() || v,
    collection: v => document.querySelector(`.filter-option input[data-group="collection"][value="${v}"]`)
      ?.parentElement.textContent.trim() || v,
  };

  function totalFilterCount() {
    return libraryState.grade.size + libraryState.skill.size + libraryState.difficulty.size + libraryState.collection.size;
  }

  function renderChips() {
    const total = totalFilterCount();

    if (filterBarCount) {
      filterBarCount.hidden = total === 0;
      filterBarCount.textContent = total;
    }
    if (filterClearAllBtn) filterClearAllBtn.hidden = total === 0;

    if (filterChipsEl) {
      const chips = [];
      libraryState.grade.forEach(v => chips.push({ group: 'grade', value: v, label: CHIP_LABELS.grade(v) }));
      libraryState.skill.forEach(v => chips.push({ group: 'skill', value: v, label: CHIP_LABELS.skill(v) }));
      libraryState.difficulty.forEach(v => chips.push({ group: 'difficulty', value: v, label: CHIP_LABELS.difficulty(v) }));
      libraryState.collection.forEach(v => chips.push({ group: 'collection', value: v, label: CHIP_LABELS.collection(v) }));
      filterChipsEl.innerHTML = chips.map(c =>
        `<span class="filter-chip" data-group="${c.group}" data-value="${c.value}">${c.label}<button aria-label="Remove">&times;</button></span>`
      ).join('');
    }
  }

  function applyFilters() {
    const filtered = GAMES.filter(g => {
      const gradeOk = libraryState.grade.size === 0 || libraryState.grade.has(g.gradeNum);
      const skillOk = libraryState.skill.size === 0 || g.skill.some(s => libraryState.skill.has(s));
      const diffOk = libraryState.difficulty.size === 0 || libraryState.difficulty.has(g.difficulty);
      const collectionOk = libraryState.collection.size === 0 || libraryState.collection.has(g.collection);
      return gradeOk && skillOk && diffOk && collectionOk;
    });

    const countEl = document.getElementById('library-count');
    if (countEl) countEl.textContent = `${filtered.length} ${t('library.count')}`;

    grid.innerHTML = filtered.length
      ? filtered.map(gameCardHTML).join('')
      : `<div class="empty-state"><div class="mascot mascot-inline" style="margin:0 auto 10px;">${t('library.emptyIcon')}</div>${t('library.empty')}</div>`;

    renderChips();
  }

  function openFilterPanel() {
    filtersPanel?.classList.add('open');
    filterOverlay?.classList.add('open');
    document.body.classList.add('filters-open');
    filterToggleBtn?.setAttribute('aria-expanded', 'true');
  }
  function closeFilterPanel() {
    filtersPanel?.classList.remove('open');
    filterOverlay?.classList.remove('open');
    document.body.classList.remove('filters-open');
    filterToggleBtn?.setAttribute('aria-expanded', 'false');
  }

  filterToggleBtn?.addEventListener('click', openFilterPanel);
  filterPanelClose?.addEventListener('click', closeFilterPanel);
  filterPanelApply?.addEventListener('click', closeFilterPanel);
  filterOverlay?.addEventListener('click', closeFilterPanel);

  filterClearAllBtn?.addEventListener('click', () => {
    document.querySelectorAll('.filter-option input').forEach(i => (i.checked = false));
    Object.values(libraryState).forEach(s => s.clear());
    applyFilters();
  });

  filterChipsEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const chip = btn.closest('.filter-chip');
    const group = chip.dataset.group;
    const rawValue = chip.dataset.value;
    const value = group === 'grade' ? Number(rawValue) : rawValue;
    libraryState[group].delete(value);
    const checkbox = document.querySelector(`.filter-option input[data-group="${group}"][value="${rawValue}"]`);
    if (checkbox) checkbox.checked = false;
    applyFilters();
  });

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

  const gradeLabel = GRADE_LABELS[game.gradeNum] ? GRADE_LABELS[game.gradeNum][currentLang] : '';
  const skills = game.skill.map(s => `<span class="tag tag-skill">${(SKILL_LABELS[s] && SKILL_LABELS[s][currentLang]) || s}</span>`).join('');
  const diffLabel = (DIFFICULTY_LABELS[game.difficulty] && DIFFICULTY_LABELS[game.difficulty][currentLang]) || game.difficulty;
  const desc = currentLang === 'pt' ? game.descriptionPT : game.description;
  const why = currentLang === 'pt' ? game.whyPT : game.why;
  const objectivesList = (currentLang === 'pt' ? game.objectivesPT : game.objectives) || [];
  const objectivesHTML = objectivesList.map(o => `<li>${o}</li>`).join('');

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

  const prefix = document.body.dataset.assetPrefix || '';
  const detailMediaHTML = game.thumbnail
    ? `<img src="${prefix}${game.thumbnail}" alt="${game.title}" style="width:100%;height:100%;object-fit:cover;">`
    : t('card.screenshot');

  container.innerHTML = `
    <h1>${game.title}</h1>
    <div class="detail-meta">
      ${gradeLabel ? `<span class="tag tag-grade">${gradeLabel}</span>` : ''}
      ${skills}
      <span class="tag tag-diff">${diffLabel}</span>
    </div>
    <div class="detail-media">${detailMediaHTML}</div>
    <div class="mascot-bubble">
      <div class="mascot mascot-inline"><img src="${prefix}assets/mascot/happy.png" alt="Raposa mascote"></div>
      <div class="mascot-bubble-text">
        <p>${currentLang === 'pt' ? 'Vamos praticar juntos!' : "Let's practice together!"}</p>
        <p class="mascot-bubble-desc">${desc}</p>
      </div>
    </div>
    <h3>${t('detail.objectives')}</h3>
    <ul class="objectives-list">${objectivesHTML}</ul>
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
  const prefix = document.body.dataset.assetPrefix || '';

  el.innerHTML = games.map(game => `
    <article class="game-card">
      <div class="game-card-media">${game.thumbnail ? `<img src="${prefix}${game.thumbnail}" alt="${game.title}">` : '[GAME SCREENSHOT]'}</div>
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
