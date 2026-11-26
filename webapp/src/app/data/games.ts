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
  // Conteúdo mais completo (opcional) para a futura página de detalhe
  // redesenhada — preenchido game a game conforme a Dani manda o
  // conteúdo do site antigo.
  aprenderA?: string[];
  porQue?: string;
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
  {
    slug: "senses-staying-healthy",
    title: "Senses & Staying Healthy",
    description: "Revise as Unidades 5 \"Senses\" e 6 \"Staying Healthy\" com 34 minijogos: ligar, arrastar e soltar, ouvir e escolher, memória, soletrar e yes/no, com imagens e áudios.",
    grade: "3º ano",
    skills: ["Vocabulário", "Escuta", "Bilíngue"],
    difficulty: "Iniciante",
    credits: 10,
    thumbnail: "/assets/games/senses-staying-healthy-thumb.png",
    gameUrl: "https://mrsdani.com.br/bilingue/senses-staying-healthy/",
    aprenderA: [
      "Relacionar os cinco sentidos aos órgãos e às ações em inglês.",
      "Classificar palavras de sabor (sweet, sour, salty, bitter) e de tato (rough, smooth, soft, sticky, cold).",
      "Identificar grupos alimentares e seus nutrientes.",
      "Reconhecer hábitos saudáveis e a função de cada nutriente.",
    ],
    porQue: "Muita prática variada com o mesmo vocabulário (sentidos, sabores, texturas, grupos alimentares, nutrientes e hábitos saudáveis) para ajudar na memorização.",
  },
  {
    slug: "grammar-adventure-1",
    title: "Grammar Adventure 1",
    description: "Seis minijogos para praticar have got, a/an, like/love/don't like, and/but e perguntas de sim/não — montando frases, respondendo sobre uma cena de quarto e falando as respostas em voz alta.",
    grade: "3º ano",
    skills: ["Gramática", "Vocabulário", "Escuta"],
    difficulty: "Iniciante",
    credits: 10,
    thumbnail: "/assets/games/grammar-adventure-1-thumb.png",
    gameUrl: "https://mrsdani.com.br/games/grammar-adventure-1/index.html",
    aprenderA: [
      "Praticar \"I like / I love / I don't like\" com o artigo a/an correto antes do alimento.",
      "Usar \"have got\" e \"has got\" para falar sobre objetos, pertences e características (afirmativa e negativa).",
      "Responder perguntas de sim/não com \"Have you got...?\" observando uma cena, e unir frases com \"and\" e \"but\".",
      "Falar em voz alta frases e perguntas com \"have got\", incluindo um desafio bônus de montar e dizer perguntas com \"has/have got\".",
    ],
    porQue: "Combina montagem de frases, leitura de imagem e prática de fala em uma só aventura, para a criança ver a mesma estrutura have got em diferentes contextos (comida, objetos, um quarto, uma mochila) antes de falar em voz alta.",
  },
  {
    slug: "mission-starlight",
    title: "Mission Starlight: Cadet Training",
    description: "Treine como Space Cadet em 5 missões e uma Boss Battle: palavras-chave sobre espaço e natureza, academic words, be going to vs will, frases com and / but, interpretação de texto e listening. Ganhe XP, estrelas e um certificado de Commander.",
    grade: "3º ano",
    skills: ["Gramática", "Leitura", "Escuta", "Bilíngue"],
    difficulty: "Intermediário",
    credits: 10,
    thumbnail: "/assets/games/mission-starlight-thumb.png",
    gameUrl: "https://mrsdani.com.br/bilingue/mission-starlight/",
    aprenderA: [
      "Aprender palavras-chave e academic words (sphere, craters, rotates, canoe, phenomenon, traditional...).",
      "Usar be going to para planos e previsões, e diferenciar will.",
      "Formar frases afirmativas, negativas, perguntas e respostas curtas e completas.",
      "Unir frases com and e but.",
      "Treinar interpretação de texto encontrando a evidência no texto.",
    ],
    porQue: "Muita prática variada para provas: desembaralhar frases, escolher a forma correta, respostas curtas e completas, reescrever, além de interpretação de texto que mostra a evidência no texto.",
  },
];
