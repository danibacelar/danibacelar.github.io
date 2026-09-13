"use client";

import { useRouter } from "next/navigation";
import type { Game } from "../data/games";
import { comprarJogo } from "../lib/fakeAuth";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function GameCard({
  game,
  owned,
  onChange,
}: {
  game: Game;
  owned: boolean;
  onChange?: () => void;
}) {
  const router = useRouter();
  const desbloqueado = game.free || owned;

  function handleComprar() {
    const resultado = comprarJogo(game.slug, game.credits);
    if (resultado.ok) {
      onChange?.();
      router.push(`/jogar/${game.slug}`);
    } else {
      router.push(`/creditos?jogo=${game.slug}`);
    }
  }

  return (
    <article className="game-card">
      <div className="game-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-card-body">
        <div className="game-card-tags">
          <span className="tag tag-grade">{game.grade}</span>
          {game.skills.map((skill) => (
            <span className="tag tag-skill" key={skill}>
              {skill}
            </span>
          ))}
          <span className="tag tag-diff">{game.difficulty}</span>
        </div>
        <h3>{game.title}</h3>
        <p className="game-card-desc">{game.description}</p>
        <div className="price-block">
          <span className="price">
            {game.free ? "Grátis" : owned ? "Incluído" : `${game.credits} créditos`}
          </span>
          {desbloqueado ? (
            <a className="link-inline" href={`/jogar/${game.slug}`}>
              Jogar
              <ArrowIcon />
            </a>
          ) : (
            <button
              type="button"
              className="link-inline"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              onClick={handleComprar}
            >
              Comprar
              <ArrowIcon />
            </button>
          )}
        </div>
        <div className="game-card-footer">
          <span className={`access-pill ${desbloqueado ? "included" : "purchase"}`}>
            {game.free
              ? "Grátis para testar"
              : owned
                ? "Já disponível"
                : "Disponível para compra"}
          </span>
        </div>
      </div>
    </article>
  );
}
