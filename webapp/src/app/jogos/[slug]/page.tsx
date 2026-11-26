"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import VoltarInicio from "../../components/VoltarInicio";
import { GAMES } from "../../data/games";
import PixPagamentoModal from "../../components/PixPagamentoModal";
import {
  comprarJogo,
  diasRestantes,
  estaValido,
  formatarReais,
  getCompra,
  getSession,
  precoAvulsoReais,
  type Session,
} from "../../lib/auth";

export default function JogoDetalhePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [pagandoAvulso, setPagandoAvulso] = useState(false);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  function refresh() {
    getSession().then(setSession);
  }

  const slug = params.slug;
  const game = GAMES.find((g) => g.slug === slug);

  if (session === undefined) {
    return (
      <>
        <Nav active="/jogos" />
        <VoltarInicio />
      </>
    );
  }

  if (!game) {
    return (
      <>
        <Nav active="/jogos" />
        <VoltarInicio />
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

  const compra = session ? getCompra(session, game.slug) : undefined;
  const valido = estaValido(compra);
  const expirado = !!compra && !valido;
  const desbloqueado = game.free || valido;
  const creditosDisponiveis = session?.creditos ?? 0;
  const temCreditoSuficiente = creditosDisponiveis >= game.credits;

  async function handleComprarComCreditos() {
    const resultado = await comprarJogo(game!.slug, game!.credits);
    if (resultado.ok) refresh();
    else router.push(`/creditos?jogo=${game!.slug}`);
  }

  function handlePagoAvulso() {
    setPagandoAvulso(false);
    refresh();
  }

  const jogarHref = game.gameUrl.startsWith("/game-content/")
    ? game.gameUrl
    : `/jogos/${game.slug}/jogar`;

  let acao: React.ReactNode;
  if (desbloqueado) {
    acao = (
      <a className="btn btn-primary" href={jogarHref}>
        Jogar agora
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    );
  } else if (!session) {
    acao = (
      <a className="btn btn-primary" href="/login">
        Comprar
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
      <button type="button" className="btn btn-primary" onClick={() => setPagandoAvulso(true)}>
        Comprar só este — {formatarReais(precoAvulsoReais(game.credits))}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    );
  }

  let precoLabel = `${game.credits} créditos`;
  if (game.free) precoLabel = "Grátis";
  else if (valido) precoLabel = `${diasRestantes(compra!)} dias restantes`;
  else if (expirado) precoLabel = "Expirado";

  return (
    <>
      <Nav active="/jogos" />
      <VoltarInicio />

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
            {game.grade && <span className="tag tag-grade">{game.grade}</span>}
            {game.skills.map((skill) => (
              <span className="tag tag-skill" key={skill}>
                {skill}
              </span>
            ))}
            <span className="tag tag-diff">{game.difficulty}</span>
          </div>

          <h1 style={{ marginBottom: 20 }}>{game.title}</h1>

          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              className="game-card-media"
              style={{
                borderRadius: "var(--radius)",
                width: 300,
                aspectRatio: "4/3",
                margin: "0 auto 20px",
              }}
            >
              {game.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={game.thumbnail} alt={game.title} />
              ) : (
                <span>Prévia do jogo em breve</span>
              )}
            </div>
            <div className="price" style={{ fontSize: "1.4rem", marginBottom: 16 }}>
              {precoLabel}
            </div>
            <div>
              {acao}
            </div>
            {expirado && (
              <p style={{ marginTop: 12, marginBottom: 0, fontSize: "0.9rem", color: "var(--ink-soft)" }}>
                Os 30 dias deste jogo expiraram. Compre de novo para continuar jogando.
              </p>
            )}
            {!game.free && session && !desbloqueado && !temCreditoSuficiente && (
              <p style={{ fontSize: "0.85rem", color: "var(--ink-soft)", marginTop: 10, marginBottom: 0 }}>
                Ou{" "}
                <a className="link-inline" href={`/creditos?jogo=${game.slug}`} style={{ display: "inline" }}>
                  compre um pacote de créditos
                </a>{" "}
                e use em vários jogos.
              </p>
            )}
          </div>

          <div className="callout" style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mascot/poses/mood-happy.png"
              alt=""
              style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0 }}
            />
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 6 }}>Vamos praticar juntos!</h3>
              <p style={{ margin: 0 }}>{game.description}</p>
            </div>
          </div>

          {game.aprenderA && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 10 }}>Neste jogo, você irá aprender a:</h3>
              <ul style={{ color: "var(--ink-soft)", paddingLeft: 20, margin: 0 }}>
                {game.aprenderA.map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {game.porQue && (
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 8 }}>Por que esta atividade?</h3>
              <p style={{ margin: 0 }}>{game.porQue}</p>
            </div>
          )}
        </div>
      </section>

      {pagandoAvulso && (
        <PixPagamentoModal
          corpo={{ tipo: "avulso", jogoSlug: game.slug }}
          onPago={handlePagoAvulso}
          onFechar={() => setPagandoAvulso(false)}
        />
      )}

      <Footer />
    </>
  );
}
