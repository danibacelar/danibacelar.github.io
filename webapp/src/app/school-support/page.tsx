import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function SchoolSupportPage() {
  return (
    <>
      <Nav active="/school-support" />

      <header className="hero wrap">
        <div>
          <p className="hero-eyebrow">Para crianças e adolescentes</p>
          <h1>Reforço escolar, não mais uma aula de inglês genérica.</h1>
          <p className="lede">
            Isso não é aula de inglês genérica. É ajuda direcionada com o
            inglês que seu filho já está aprendendo na escola — o livro
            didático dele, o dever de casa, as próximas avaliações.
          </p>
          <div className="hero-actions">
            <a href="/jogos" className="btn btn-primary">
              <span>Ver a biblioteca de jogos</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-media">[FOTO: aluno estudando em casa]</div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">O que está incluído</p>
            <h2>Construído em torno do conteúdo real que seu filho estuda.</h2>
          </div>
          <div className="grid-3">
            <div className="service-card">
              <h3>Revisão do conteúdo escolar</h3>
              <p>
                Revisamos o que está sendo ensinado em sala de aula agora,
                usando o mesmo vocabulário e as mesmas estruturas do livro
                didático do seu filho.
              </p>
            </div>
            <div className="service-card">
              <h3>Ajuda com o dever de casa</h3>
              <p>
                Fazemos as atividades juntos, para que seu filho entenda o
                &quot;porquê&quot;, não só a resposta.
              </p>
            </div>
            <div className="service-card">
              <h3>Preparação para avaliações</h3>
              <p>
                Revisão direcionada antes de provas e testes, focada nos
                conceitos específicos que o aluno tem mais dificuldade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-raised">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <p className="eyebrow">Prática além da aula</p>
              <h2>Jogos interativos, criados para a dificuldade específica do seu filho.</h2>
              <p>
                Quando um aluno está com dificuldade em um conceito
                específico — preposições, passado verbal, um conjunto de
                vocabulário — a Mrs. Dani cria uma atividade interativa
                exatamente sobre isso, usando o vocabulário do próprio livro
                didático sempre que possível.
              </p>
              <a href="/jogos" className="link-inline">
                <span>Ver a biblioteca de jogos</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <div className="hero-media">[CAPTURA DE TELA: jogo Town Explorer]</div>
          </div>
        </div>
      </section>

      <Footer extraLink={{ href: "/sobre", label: "Para os pais: como funciona →" }} />
    </>
  );
}
