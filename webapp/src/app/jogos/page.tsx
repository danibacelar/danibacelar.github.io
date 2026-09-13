import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";

export default function TodosOsJogosPage() {
  return (
    <>
      <Nav active="/jogos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Jogos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Todos os jogos</h1>
          <p className="lede">
            Cada jogo mostra quanto custa em créditos. Os gratuitos aparecem
            como &quot;Grátis para testar&quot;, e os que você já comprou como
            &quot;Já disponível&quot; — os dois com o botão Jogar no lugar de
            Comprar.
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
              Protótipo — a busca e os filtros abrem e fecham, mas ainda não
              filtram de verdade (igual ao restante da tela, isso ainda não
              está conectado). Os jogos abaixo são de exemplo, mostrando os
              três estados do cartão: &quot;Growing Plants&quot; é gratuito
              para qualquer um testar, &quot;Town Explorer&quot; já foi
              comprado, e os demais estão disponíveis para compra com
              créditos.
            </span>
          </div>

          <div className="game-grid" style={{ marginTop: 24 }}>
            {GAMES.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
