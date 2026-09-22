"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { GAMES } from "../data/games";
import { estaValido, getCompra } from "../lib/auth";
import { useSessaoComPerfil } from "../lib/useSessaoAtiva";

export default function AlunoPage() {
  const { session, activeChild } = useSessaoComPerfil();

  if (!session || !activeChild) return null;

  const meusJogos = GAMES.filter(
    (game) => game.free || estaValido(getCompra(session, game.slug, activeChild.id))
  );

  return (
    <>
      <Nav variant="aluno" active="/aluno" />

      <section className="section">
        <div className="wrap">
          <div className="dash-header">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="mascot mascot-inline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/mascot/happy.png" alt="" />
              </div>
              <div>
                <div className="dash-welcome">Hi, {activeChild.nome}! 👋</div>
                <div className="dash-sub">Your games</div>
              </div>
            </div>
          </div>

          <div className="mascot-bubble">
            <div className="mascot mascot-inline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/mascot/happy.png" alt="" />
            </div>
            <p>Ready to play?</p>
          </div>

          {meusJogos.length > 0 ? (
            <div className="assigned-grid">
              {meusJogos.map((game) => (
                <article className="game-card" key={game.slug}>
                  <div className="game-card-media">
                    {game.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={game.thumbnail} alt={game.title} />
                    ) : (
                      <span>Prévia do jogo em breve</span>
                    )}
                  </div>
                  <div className="game-card-body">
                    <h3>{game.title}</h3>
                    <div className="game-card-footer" style={{ borderTop: "none", paddingTop: 4 }}>
                      <a
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                        href={`/jogos/${game.slug}`}
                      >
                        Play
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="mascot mascot-inline" style={{ margin: "0 auto 10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/mascot/happy.png" alt="" />
              </div>
              No games yet — ask a parent to add one!
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
