"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";
import { getCompra } from "../lib/fakeAuth";
import { useSessaoAtiva } from "../lib/useSessaoAtiva";

export default function TodosOsJogosPage() {
  const { session, refresh } = useSessaoAtiva();

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
            fica liberado por 30 dias — pode jogar quantas vezes quiser
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
              Teste — com créditos suficientes, &quot;Comprar&quot; desconta
              do seu saldo de mentira e libera o jogo por 30 dias. Sem
              crédito suficiente, aparece a opção de comprar só aquele jogo
              avulso (sem mexer no saldo) ou ir para os pacotes de créditos.
              A busca e os filtros ainda não filtram de verdade.
            </span>
          </div>

          <div className="game-grid" style={{ marginTop: 24 }}>
            {GAMES.map((game) => (
              <GameCard
                game={game}
                compra={getCompra(session, game.slug)}
                creditosDisponiveis={session.creditos}
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
