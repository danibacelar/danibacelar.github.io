"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { GAMES } from "../../data/games";
import {
  comprarAvulso,
  comprarJogo,
  diasRestantes,
  estaValido,
  formatarReais,
  getCompra,
  getSession,
  precoAvulsoReais,
  type Session,
} from "../../lib/fakeAuth";

export default function JogoDetalhePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    setSession(getSession());
  }, []);

  function refresh() {
    setSession(getSession());
  }

  const slug = params.slug;
  const game = GAMES.find((g) => g.slug === slug);

  if (!game) {
    return (
      <>
        <Nav active="/jogos" />
        <section className="section">
          <div className="wrap" style={{ maxWidth: 760 }}>
            <p>Jogo não encontrado.</p>
            <a href="/jogos" className="btn btn-primary">
              Ver todos os jogos
            </a>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const childId = session?.activeChildId ?? null;
  const compra = session ? getCompra(session, game.slug, childId) : undefined;
  const valido = estaValido(compra);
  const expirado = !!compra && !valido;
  const desbloqueado = game.free || valido;
  const creditosDisponiveis = session?.creditos ?? 0;
  const temCreditoSuficiente = creditosDisponiveis >= game.credits;

  function handleComprarComCreditos() {
    if (!childId) return;
    const resultado = comprarJogo(game!.slug, game!.credits, childId);
    if (resultado.ok) refresh();
    else router.push(`/creditos?jogo=${game!.slug}`);
  }

  function handleComprarAvulso() {
    if (!childId) return;
    const resultado = comprarAvulso(game!.slug, childId);
    if (resultado.ok) refresh();
  }

  let acao: React.ReactNode = null;
  if (!desbloqueado) {
    if (!session) {
      acao = (
        <a className="btn btn-primary" href="/login">
          Entrar para jogar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      );
    } else if (!childId) {
      acao = (
        <a className="btn btn-primary" href="/login/aluno">
          Escolha um perfil
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      );
    } else if (temCreditoSuficiente) {
      acao = (
        <button type="button" className="btn btn-primary" onClick={handleComprarComCreditos}>
          {expirado ? "Comprar de novo" : "Comprar"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      );
    } else {
      acao = (
        <button type="button" className="btn btn-primary" onClick={handleComprarAvulso}>
          Comprar só este — {formatarReais(precoAvulsoReais(game.credits))}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      );
    }
  }

  return (
    <>
      <Nav active="/jogos" />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p style={{ marginBottom: 24 }}>
            <a href="/jogos" className="link-inline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              <span>Todos os jogos</span>
            </a>
          </p>

          <div className="game-card-tags" style={{ marginBottom: 8 }}>
            <span className="tag tag-grade">{game.grade}</span>
            {game.skills.map((skill) => (
              <span className="tag tag-skill" key={skill}>
                {skill}
              </span>
            ))}
            <span className="tag tag-diff">{game.difficulty}</span>
          </div>

          <h1 style={{ marginBottom: 12 }}>{game.title}</h1>
          <p className="lede" style={{ marginBottom: 24 }}>
            {game.description}
          </p>

          {desbloqueado ? (
            <div className="callout" style={{ padding: 40, textAlign: "center" }}>
              <p style={{ margin: 0 }}>🔒✅ Acesso liberado — aqui vai aparecer o jogo de verdade.</p>
              {!game.free && compra && (
                <p style={{ marginTop: 12, marginBottom: 0 }}>
                  Válido por mais {diasRestantes(compra)} dia(s).
                </p>
              )}
            </div>
          ) : (
            <div className="callout" style={{ padding: 40, textAlign: "center" }}>
              <p style={{ marginBottom: 16 }}>
                {expirado
                  ? "Os 30 dias deste jogo expiraram. Compre de novo para continuar jogando."
                  : "Você ainda não desbloqueou este jogo."}
              </p>
              {acao}
            </div>
          )}

          {!game.free && session && childId && !desbloqueado && !temCreditoSuficiente && (
            <p style={{ fontSize: "0.9rem", color: "var(--ink-soft)", textAlign: "center" }}>
              Ou{" "}
              <a className="link-inline" href={`/creditos?jogo=${game.slug}`} style={{ display: "inline" }}>
                compre um pacote de créditos
              </a>{" "}
              e use em vários jogos.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
