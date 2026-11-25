"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Game } from "../data/games";
import {
  comprarJogo,
  diasRestantes,
  estaValido,
  formatarReais,
  getCompra,
  precoAvulsoReais,
  type Session,
} from "../lib/auth";
import PixPagamentoModal from "./PixPagamentoModal";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function GameCard({
  game,
  session,
  onChange,
}: {
  game: Game;
  session: Session | null;
  onChange?: () => void;
}) {
  const router = useRouter();
  const [pagandoAvulso, setPagandoAvulso] = useState(false);
  const compra = session ? getCompra(session, game.slug) : undefined;
  const valido = estaValido(compra);
  const expirado = !!compra && !valido;
  const desbloqueado = game.free || valido;
  const creditosDisponiveis = session?.creditos ?? 0;
  const temCreditoSuficiente = creditosDisponiveis >= game.credits;

  async function handleComprarComCreditos() {
    const resultado = await comprarJogo(game.slug, game.credits);
    if (resultado.ok) {
      onChange?.();
      router.push(`/jogos/${game.slug}`);
    } else {
      router.push(`/creditos?jogo=${game.slug}`);
    }
  }

  function handlePagoAvulso() {
    setPagandoAvulso(false);
    // Sem onChange() aqui de propósito: já estamos saindo desta página,
    // e a página de destino busca a sessão atualizada sozinha — atualizar
    // a grade bem na hora de navegar só causava um flash visível a mais.
    router.push(`/jogos/${game.slug}`);
  }

  let precoLabel = `${game.credits} créditos`;
  if (game.free) precoLabel = "Grátis";
  else if (valido) precoLabel = `${diasRestantes(compra!)} dias restantes`;
  else if (expirado) precoLabel = "Expirado";

  let pillLabel = "Disponível para compra";
  if (game.free) pillLabel = "Grátis para testar";
  else if (valido) pillLabel = "Já disponível";
  else if (expirado) pillLabel = "Validade de 30 dias encerrada";

  let acao: React.ReactNode;
  if (desbloqueado) {
    acao = (
      <a className="link-inline" href={`/jogos/${game.slug}`}>
        Jogar
        <ArrowIcon />
      </a>
    );
  } else if (!session) {
    acao = (
      <a className="link-inline" href="/login">
        Entrar para jogar
        <ArrowIcon />
      </a>
    );
  } else if (temCreditoSuficiente) {
    acao = (
      <button
        type="button"
        className="link-inline"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        onClick={handleComprarComCreditos}
      >
        {expirado ? "Comprar de novo" : "Comprar"}
        <ArrowIcon />
      </button>
    );
  } else {
    acao = (
      <button
        type="button"
        className="link-inline"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        onClick={() => setPagandoAvulso(true)}
      >
        Comprar só este — {formatarReais(precoAvulsoReais(game.credits))}
        <ArrowIcon />
      </button>
    );
  }

  return (
    <article className="game-card">
      <div className="game-card-media">
        {game.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={game.thumbnail} alt={game.title} />
        ) : (
          <span>Prévia do jogo em breve</span>
        )}
      </div>
      <div className="game-card-body">
        <div className="game-card-tags">
          {game.grade && <span className="tag tag-grade">{game.grade}</span>}
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
          {acao}
        </div>
        {!desbloqueado && session && !temCreditoSuficiente && (
          <p style={{ fontSize: "0.82rem", color: "var(--ink-soft)", margin: 0 }}>
            Ou{" "}
            <a className="link-inline" href={`/creditos?jogo=${game.slug}`} style={{ display: "inline" }}>
              compre um pacote de créditos
            </a>{" "}
            e use em vários jogos.
          </p>
        )}
        <div className="game-card-footer">
          <span className={`access-pill ${desbloqueado ? "included" : "purchase"}`}>{pillLabel}</span>
        </div>
      </div>

      {pagandoAvulso && (
        <PixPagamentoModal
          corpo={{ tipo: "avulso", jogoSlug: game.slug }}
          onPago={handlePagoAvulso}
          onFechar={() => setPagandoAvulso(false)}
        />
      )}
    </article>
  );
}
