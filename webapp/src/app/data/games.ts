export type Game = {
  slug: string;
  title: string;
  description: string;
  grade: string;
  skills: string[];
  difficulty: string;
  credits: number;
  thumbnail: string;
  owned: boolean;
  free?: boolean;
};

export const GAMES: Game[] = [
  {
    slug: "growing-plants",
    title: "Growing Plants",
    description:
      "Descubra como as plantas crescem e aprenda o vocabulário das partes de uma planta em inglês, em atividades curtas e ilustradas.",
    grade: "3º ano",
    skills: ["Vocabulário", "Leitura"],
    difficulty: "Iniciante",
    credits: 0,
    thumbnail: "/assets/games/growing-plants-thumb.jpg",
    owned: false,
    free: true,
  },
  {
    slug: "town-explorer",
    title: "Town Explorer",
    description:
      'Explore o mapa de uma cidade, siga pistas para encontrar lugares e pratique preposições de lugar e perguntas com "Where\'s the...?".',
    grade: "4º ano",
    skills: ["Vocabulário", "Gramática"],
    difficulty: "Iniciante",
    credits: 10,
    thumbnail: "/assets/games/town-explorer-screenshot.jpg",
    owned: true,
  },
  {
    slug: "sports-playground",
    title: "Sports Playground",
    description:
      "Aprenda vocabulário de esportes e equipamentos, e pratique construir frases com verbos terminados em -ing para descrever e opinar sobre esportes.",
    grade: "3º ano",
    skills: ["Vocabulário", "Gramática", "Escrita"],
    difficulty: "Iniciante",
    credits: 15,
    thumbnail: "/assets/games/sports-playground-screenshot.jpg",
    owned: false,
  },
  {
    slug: "top-town",
    title: "Top Town",
    description:
      'Explore o mapa de uma cidade, pratique perguntas e respostas com "Does Top Town have...?" e use preposições de lugar para descrever onde as coisas ficam.',
    grade: "3º ano",
    skills: ["Vocabulário", "Gramática", "Escrita"],
    difficulty: "Iniciante",
    credits: 20,
    thumbnail: "/assets/games/top-town-screenshot.jpg",
    owned: false,
  },
];
