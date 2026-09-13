import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";

export default function MeusJogosPage() {
  const meusJogos = GAMES.filter((game) => game.owned);

  return (
    <>
      <Nav active="/meus-jogos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Meus jogos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>
            Jogos que você já comprou
          </h1>
          <p className="lede">
            Só os jogos desbloqueados aparecem aqui, prontos para jogar — sem
            precisar de créditos de novo.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <SearchAndFilters resultCount={meusJogos.length} />

          <div className="prototype-note" style={{ marginTop: 24 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — a busca e os filtros abrem e fecham, mas ainda não
              filtram de verdade. Hoje mostra o &quot;Town Explorer&quot; fixo
              como exemplo de jogo comprado. Na versão real, essa lista vem do
              banco de dados, ligada à conta de quem fez login.
            </span>
          </div>

          {meusJogos.length > 0 ? (
            <div className="game-grid" style={{ marginTop: 24 }}>
              {meusJogos.map((game) => (
                <GameCard game={game} key={game.slug} />
              ))}
            </div>
          ) : (
            <div className="callout" style={{ marginTop: 24, textAlign: "center" }}>
              <p style={{ margin: 0 }}>
                Você ainda não comprou nenhum jogo.{" "}
                <a className="link-inline" href="/jogos" style={{ display: "inline" }}>
                  Ver todos os jogos
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
