export type Game = {
  slug: string;
  title: string;
  description: string;
  grade?: string;
  skills: string[];
  difficulty: string;
  credits: number;
  thumbnail?: string;
  gameUrl: string;
  free?: boolean;
};

export const GAMES: Game[] = [
  {
    slug: "spelling-bee",
    title: "Spelling Bee - list 3",
    description: "Ouça cada palavra ou frase e escreva — digitando nas Fases 1/2, ou clicando nas letras embaralhadas na ordem certa no Challenge.",
    skills: ["Vocabulário", "Escrita", "Escuta"],
    difficulty: "Iniciante",
    credits: 10,
    thumbnail: "/assets/games/spelling-bee-mascot.png",
    gameUrl: "https://mrsdani.com.br/games/spelling-bee/index.html",
  },
  {
    slug: "what-time-is-it",
    title: "What Time Is It?",
    description: "Olhe para o relógio e escolha a resposta certa para praticar como dizer as horas em inglês.",
    grade: "4º ano",
    skills: ["Vocabulário", "Escuta"],
    difficulty: "Iniciante",
    credits: 10,
    gameUrl: "/game-content/what-time-is-it",
  },
  {
    slug: "connectors-past-tenses",
    title: "Revisão: Connectors & Past Tenses",
    description: "Revisão completa para a prova com regras, exercícios, frases para desembaralhar e interpretação de texto sobre conectores e tempos verbais no passado. O progresso fica salvo automaticamente.",
    grade: "5º ano",
    skills: ["Gramática", "Leitura"],
    difficulty: "Intermediário",
    credits: 10,
    gameUrl: "/game-content/connectors-past-tenses",
  },
  {
    slug: "emergency-helpers",
    title: "Emergency Helpers • Past Continuous",
    description: "Cinco minijogos rápidos para escolher was ou were corretamente, inclusive em sujeitos mais difíceis, e praticar o passado contínuo.",
    grade: "5º ano",
    skills: ["Gramática"],
    difficulty: "Iniciante",
    credits: 10,
    gameUrl: "/game-content/emergency-helpers",
  },
  {
    slug: "past-simple-vs-continuous-quiz",
    title: "Past Simple vs Past Continuous — Quiz de Revisão",
    description: "Quiz de revisão para a prova sobre WHEN, WHILE, WAS e WERE, comparando o passado simples e o passado contínuo.",
    grade: "5º ano",
    skills: ["Gramática"],
    difficulty: "Intermediário",
    credits: 10,
    gameUrl: "/game-content/past-simple-vs-continuous-quiz",
  },
  {
    slug: "prepositions-of-time",
    title: "Prepositions of Time: IN, ON, AT",
    description: "Aprenda as regras de uso de IN, ON e AT para falar sobre tempo em inglês e depois pratique.",
    grade: "5º ano",
    skills: ["Gramática"],
    difficulty: "Iniciante",
    credits: 10,
    gameUrl: "/game-content/prepositions-of-time",
  },
  {
    slug: "preposicoes-in-on-at",
    title: "Preposições — IN, ON, AT",
    description: "Descubra quando usar IN, ON e AT organizando expressões de tempo como dias, meses, estações e horários exatos.",
    grade: "5º ano",
    skills: ["Gramática"],
    difficulty: "Iniciante",
    credits: 10,
    gameUrl: "/game-content/preposicoes-in-on-at",
  },
  {
    slug: "simple-past-adventure",
    title: "Simple Past Adventure",
    description: "Aprenda e pratique verbos regulares no passado simples em inglês.",
    grade: "5º ano",
    skills: ["Gramática"],
    difficulty: "Iniciante",
    credits: 10,
    gameUrl: "/game-content/simple-past-adventure",
  },
  {
    slug: "a-voz-passiva",
    title: "A Voz Passiva — Ficha de Estudo",
    description: "Ficha de estudo sobre a voz passiva: veja como ela é montada e treine até memorizar.",
    grade: "8º ano",
    skills: ["Gramática"],
    difficulty: "Avançado",
    credits: 10,
    gameUrl: "/game-content/a-voz-passiva",
  },
  {
    slug: "o-caso-da-voz-oculta",
    title: "O Caso da Voz Oculta — Ativa vs. Passiva",
    description: "Uma investigação sobre Voz Ativa e Voz Passiva em inglês — treino de gramática e interpretação de texto, nível vestibular.",
    grade: "8º ano",
    skills: ["Gramática", "Leitura"],
    difficulty: "Avançado",
    credits: 10,
    gameUrl: "/game-content/o-caso-da-voz-oculta",
  },
];
