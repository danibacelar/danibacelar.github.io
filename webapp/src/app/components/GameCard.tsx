"use client";

import { useRouter } from "next/navigation";
import type { Game } from "../data/games";
import { comprarJogo, diasRestantes, estaValido, type Compra } from "../lib/fakeAuth";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function GameCard({
  game,
  compra,
  onChange,
}: {
  game: Game;
  compra: Compra | undefined;
  onChange?: () => void;
}) {
  const router = useRouter();
  const valido = estaValido(compra);
  const expirado = !!compra && !valido;
  const desbloqueado = game.free || valido;

  function handleComprar() {
    const resultado = comprarJogo(game.slug, game.credits);
    if (resultado.ok) {
      onChange?.();
      router.push(`/jogar/${game.slug}`);
    } else {
      router.push(`/creditos?jogo=${game.slug}`);
    }
  }

  let precoLabel = `${game.credits} créditos`;
  if (game.free) precoLabel = "Grátis";
  else if (valido) precoLabel = `Incluído · ${diasRestantes(compra!)}d restantes`;
  else if (expirado) precoLabel = "Expirado";

  let pillLabel = "Disponível para compra";
  if (game.free) pillLabel = "Grátis para testar";
  else if (valido) pillLabel = "Já disponível";
  else if (expirado) pillLabel = "Validade de 30 dias encerrada";

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
          <span className="price">{precoLabel}</span>
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
              {expirado ? "Comprar de novo" : "Comprar"}
              <ArrowIcon />
            </button>
          )}
        </div>
        <div className="game-card-footer">
          <span className={`access-pill ${desbloqueado ? "included" : "purchase"}`}>
            {pillLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
