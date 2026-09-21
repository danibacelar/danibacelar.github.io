import { GAMES } from "./data/games";

export default function HomePage() {
  const destaques = GAMES.slice(0, 3);

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/jogos">Jogos</a>
            </li>
            <li>
              <a href="#como-funciona">Como funciona</a>
            </li>
            <li>
              <a href="/sobre">Sobre</a>
            </li>
            <li>
              <a href="/login">Entrar</a>
            </li>
          </ul>
          <div className="nav-cta">
            <div className="lang-toggle">
              <button className="active">PT</button>
              <button>EN</button>
            </div>
            <a href="/login" className="btn btn-primary">
              Fazer login
            </a>
            <button className="nav-toggle" aria-label="Open menu" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <header
        className="hero wrap"
        style={{ paddingTop: "clamp(14px, 1.6vw, 22px)", paddingBottom: "clamp(16px, 2vw, 24px)" }}
      >
        <div className="hero-text">
          <p className="hero-eyebrow hero-anim">Jogos de inglês escolar</p>
          <h1 className="hero-anim d2">
            Pratique o inglês que você aprende na escola — jogando.
          </h1>
          <p className="lede hero-anim d3">
            Jogos interativos criados a partir dos conteúdos escolares e das
            dificuldades reais de crianças e adolescentes.
          </p>
          <div className="hero-actions hero-anim d3">
            <a href="/jogos" className="btn btn-primary">
              Explorar os jogos
            </a>
            <a href="#como-funciona" className="btn btn-ghost">
              Como funciona
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-media-wrap">
            <div className="hero-media" style={{ maxHeight: "min(32vh, 280px)" }}>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video autoPlay muted loop playsInline poster="/assets/games/town-explorer-poster.jpg">
                <source src="/assets/games/town-explorer-preview.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="mascot mascot-badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/mascot/happy.png"
                alt="Raposa mascote da Mrs. Dani, feliz e acenando"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 4 }}>
        <div className="wrap">
          <div
            className="section-head center"
            style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 20 }}
          >
            <p className="eyebrow" style={{ margin: "0 auto 10px" }}>A diferença</p>
            <h2 style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>
              Não são jogos genéricos de inglês.
            </h2>
            <p style={{ margin: "0 auto" }}>
              Cada atividade é criada a partir dos conteúdos que os alunos
              estudam na escola e pensada para reforçar dificuldades
              específicas.
            </p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem" }}>Conteúdo escolar</h3>
              <p style={{ maxWidth: "none" }}>
                Baseado no que seu filho está estudando em sala de aula agora.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4l2.5 2.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem" }}>Dificuldades reais</h3>
              <p style={{ maxWidth: "none" }}>
                Criado a partir das dúvidas que alunos de verdade apresentam.
              </p>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="14" rx="2" />
                  <path d="M8 21h8M12 18v3" />
                </svg>
              </div>
              <h3 style={{ fontSize: "1.05rem" }}>Prática interativa</h3>
              <p style={{ maxWidth: "none" }}>
                Aprender jogando, não decorando listas de palavras.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-raised" id="como-funciona">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Como funciona</p>
            <h2 style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>
              Simples para os pais, simples para as crianças.
            </h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>Crie sua conta gratuitamente</h3>
              <p>
                Leva menos de um minuto, sem cartão de crédito. Você só paga
                quando decidir começar a jogar.
              </p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>Compre seus créditos</h3>
              <p>
                Quer testar com um jogo só? Compre ele avulso. Quer aproveitar
                mais? Compre um pacote de créditos e use em quantos jogos
                quiser.
              </p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Seu filho pratica sozinho</h3>
              <p>
                Com um acesso simples, seu filho entra e já vê as atividades
                dele.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Jogos em destaque</p>
            <h2 style={{ fontSize: "clamp(1.5rem,2.6vw,2.1rem)" }}>Conheça os jogos.</h2>
          </div>
          <div className="game-grid">
            {destaques.map((game) => (
              <article className="game-card" key={game.slug}>
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
                      {game.free ? "Grátis" : `${game.credits} créditos`}
                    </span>
                    <a className="link-inline" href={`/jogos/${game.slug}`}>
                      Ver atividade
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <a className="link-inline" href="/jogos">
              Ver todos os jogos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Mrs. Dani</h4>
              <a href="/sobre">Sobre</a>
              <a href="/jogos">Jogos</a>
            </div>
            <div className="footer-col">
              <h4>Jogos</h4>
              <a href="/jogos">Todos os jogos</a>
              <a href="#como-funciona">Por ano escolar</a>
            </div>
            <div className="footer-col">
              <h4>Ajuda</h4>
              <a href="#como-funciona">Como funciona</a>
              <a href="/login/aluno">Acesso do aluno</a>
              <a href="/school-support">School Support</a>
            </div>
            <div className="footer-col">
              <h4>Conta</h4>
              <a href="/login">Entrar</a>
              <a href="/pais">Área dos pais</a>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <a href="#">[INFORMAÇÕES DE CONTATO]</a>
            </div>
          </div>
          <hr className="rule" />
          <div className="footer-bottom" style={{ marginTop: 20 }}>
            <span>© 2026 Mrs. Dani. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
