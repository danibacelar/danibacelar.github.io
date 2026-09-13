import type { Game } from "../data/games";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function GameCard({ game }: { game: Game }) {
  return (
    <article className="game-card">
      <div className="game-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={game.thumbnail} alt={game.title} />
      </div>
      <div className="game-card-body">
        <div className="game-card-tags">
          <span className="tag tag-grade">{game.grade}</span>
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
          <span className="price">
            {game.owned ? "Incluído" : `${game.credits} créditos`}
          </span>
          {game.owned ? (
            <a className="link-inline" href={`/jogar/${game.slug}`}>
              Jogar
              <ArrowIcon />
            </a>
          ) : (
            <a className="link-inline" href={`/creditos?jogo=${game.slug}`}>
              Comprar
              <ArrowIcon />
            </a>
          )}
        </div>
        <div className="game-card-footer">
          <span className={`access-pill ${game.owned ? "included" : "purchase"}`}>
            {game.owned ? "Já disponível" : "Disponível para compra"}
          </span>
        </div>
      </div>
    </article>
  );
}
