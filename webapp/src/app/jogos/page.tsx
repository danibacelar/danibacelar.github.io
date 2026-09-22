"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";
import { getSession, type Session } from "../lib/auth";

export default function TodosOsJogosPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  function refresh() {
    getSession().then(setSession);
  }

  return (
    <>
      <Nav active="/jogos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 20 }}>
            <p className="eyebrow">Jogos</p>
            <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Todos os jogos</h1>
            <p className="lede">
              Encontre a atividade certa pelo ano escolar, pela habilidade ou
              pela dificuldade.
            </p>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <SearchAndFilters resultCount={GAMES.length} />

          <div className="prototype-note" style={{ marginTop: 24 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Teste — com créditos suficientes, &quot;Comprar&quot; desconta
              do saldo da família (já salvo de verdade) e libera o jogo por
              30 dias para o perfil escolhido. A busca e os filtros ainda não
              filtram de verdade.
            </span>
          </div>

          <div className="game-grid" style={{ marginTop: 24 }}>
            {session === undefined
              ? null
              : GAMES.map((game) => (
                  <GameCard game={game} session={session} onChange={refresh} key={game.slug} />
                ))}
          </div>
        </div>
      </section>

      <Footer extraLink={{ href: "/login/aluno", label: "Acesso do aluno →" }} />
    </>
  );
}
