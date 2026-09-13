import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <div className="nav-cta">
            <a href="/login" className="btn btn-primary">
              Fazer login
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="wrap section-head center">
          <p className="eyebrow">Mrs. Dani</p>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>
            Jogos de inglês para crianças
          </h1>
          <p className="lede" style={{ margin: "0 auto" }}>
            Faça login para ver os jogos que você já comprou ou comprar novos
            com créditos.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
