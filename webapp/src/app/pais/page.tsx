"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import VoltarInicio from "../components/VoltarInicio";
import GameCard from "../components/GameCard";
import { GAMES, type Game } from "../data/games";
import { useSessaoAtiva } from "../lib/useSessaoAtiva";

export default function MeusJogosPage() {
  const { session, refresh } = useSessaoAtiva();

  if (!session) return null;

  // Compras de jogos que saíram do catálogo (ex.: tirados do ar pra
  // arrumar) ficam órfãs — sem o Game correspondente não dá pra montar
  // o cartão, então elas somem desta lista até o jogo voltar.
  const jogosComprados = session.jogosComprados
    .slice()
    .sort((a, b) => (a.expiraEm < b.expiraEm ? 1 : -1))
    .map((compra) => GAMES.find((g) => g.slug === compra.slug))
    .filter((game): game is Game => !!game);

  return (
    <>
      <Nav variant="logado" active="/pais" />
      <VoltarInicio />

      <section className="section">
        <div className="wrap">
          <div className="prototype-note payment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              O pagamento por Pix já é real; nenhum outro dado além do seu
              e-mail e senha é coletado — não pedimos nome nem dados de
              crianças.
            </span>
          </div>

          <div className="dash-header">
            <div>
              <div className="dash-welcome">Olá, {session.nomeResponsavel}</div>
              <div className="dash-sub">Seus jogos</div>
            </div>
            <a href="/creditos" className="btn btn-primary">
              {session.creditos} créditos · Comprar mais
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="section-head">
            <p className="eyebrow">Compras</p>
            <h2 style={{ fontSize: "1.6rem" }}>Atividades adquiridas</h2>
          </div>

          {jogosComprados.length > 0 ? (
            <div className="game-grid" style={{ marginBottom: 36 }}>
              {jogosComprados.map((game) => (
                <GameCard game={game} session={session} onChange={refresh} key={game.slug} />
              ))}
            </div>
          ) : (
            <p style={{ marginBottom: 36 }}>Nenhuma atividade comprada ainda.</p>
          )}

          <p>
            <a className="btn btn-primary" href="/jogos">
              Explorar os jogos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
