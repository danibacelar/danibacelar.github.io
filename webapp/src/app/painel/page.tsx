import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function PainelPage() {
  return (
    <>
      <Nav active="/painel" />

      <section className="section">
        <div className="wrap auth-wrap" style={{ maxWidth: 480 }}>
          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — esta é a tela que aparece assim que você faz login.
              Daqui você escolhe se quer ver o que já comprou ou o catálogo
              inteiro.
            </span>
          </div>

          <h1 style={{ fontSize: "2rem", marginBottom: 8 }} className="center">
            Olá, Mrs. Dani
          </h1>
          <p className="center" style={{ marginBottom: 24 }}>
            Saldo atual: <strong>40 créditos</strong>
          </p>

          <div className="callout" style={{ marginBottom: 16, textAlign: "center" }}>
            <h3 style={{ marginBottom: 6 }}>Meus jogos</h3>
            <p style={{ marginBottom: 16 }}>
              Veja os jogos que você já comprou e continue jogando.
            </p>
            <a
              href="/meus-jogos"
              className="btn btn-amber"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Ver meus jogos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="callout" style={{ textAlign: "center" }}>
            <h3 style={{ marginBottom: 6 }}>Todos os jogos</h3>
            <p style={{ marginBottom: 16 }}>
              Veja o catálogo completo e compre novos jogos com seus créditos.
            </p>
            <a
              href="/jogos"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Ver todos os jogos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
