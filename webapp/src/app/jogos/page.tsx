"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";
import { getCompra, getSession, type Session } from "../lib/fakeAuth";

export default function TodosOsJogosPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  function refresh() {
    const atual = getSession();
    if (!atual) {
      router.replace("/login");
      return;
    }
    setSession(atual);
  }

  useEffect(refresh, [router]);

  if (!session) return null;

  return (
    <>
      <Nav active="/jogos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Jogos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Todos os jogos</h1>
          <p className="lede">
            Cada jogo mostra quanto custa em créditos. Depois de comprado,
            fica liberado por 45 dias — pode jogar quantas vezes quiser
            nesse período. Passado o prazo, é só comprar de novo.
          </p>
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
              Teste — clicar em &quot;Comprar&quot; desconta créditos de
              mentira do seu saldo (salvo só no seu navegador) e libera o
              jogo por 45 dias. Sem crédito suficiente, você vai para a tela
              de comprar créditos. A busca e os filtros ainda não filtram de
              verdade.
            </span>
          </div>

          <div className="game-grid" style={{ marginTop: 24 }}>
            {GAMES.map((game) => (
              <GameCard
                game={game}
                compra={getCompra(session, game.slug)}
                onChange={refresh}
                key={game.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
