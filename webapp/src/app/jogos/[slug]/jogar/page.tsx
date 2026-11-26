"use client";

import { useParams } from "next/navigation";
import { GAMES } from "../../../data/games";

// Jogos hospedados fora do site (gameUrl externo) abrem aqui dentro de um
// iframe, em vez de em outra aba — iframe (não um fetch-e-reinjeta como o
// /game-content interno) porque esses jogos externos têm CSS/JS/imagens em
// caminhos relativos à própria pasta deles; servir o HTML a partir do nosso
// domínio quebraria essas referências. O iframe navega para a URL de
// verdade, então tudo continua resolvendo certo.
export default function JogarExternoPage() {
  const params = useParams<{ slug: string }>();
  const game = GAMES.find((g) => g.slug === params.slug);

  if (!game) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000" }}>
      <iframe
        src={game.gameUrl}
        title={game.title}
        allow="autoplay; fullscreen"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
      <a
        href={`/jogos/${game.slug}`}
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 2147483647,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(34,56,58,0.85)",
          color: "#fff",
          font: "600 13px/1.2 -apple-system, BlinkMacSystemFont, sans-serif",
          padding: "10px 14px",
          borderRadius: 999,
          textDecoration: "none",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        ← Voltar ao site
      </a>
    </div>
  );
}
