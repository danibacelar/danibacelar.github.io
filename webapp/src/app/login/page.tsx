import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <>
      <Nav active="/login" />

      <section className="section">
        <div className="wrap auth-wrap">
          <h1 style={{ fontSize: "2rem", marginBottom: 8 }} className="center">
            Entrar
          </h1>
          <p className="center" style={{ marginBottom: 24 }}>
            Escolha como você quer entrar.
          </p>

          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — nenhuma senha real é verificada aqui ainda. Depois
              de entrar (mesmo sem senha real por enquanto), você cai no
              Painel.
            </span>
          </div>

          <div className="callout" style={{ marginBottom: 16, textAlign: "center" }}>
            <h3 style={{ marginBottom: 6 }}>Sou aluno</h3>
            <p style={{ marginBottom: 16 }}>
              Acesse suas atividades de forma simples e rápida.
            </p>
            <a
              href="/painel"
              className="btn btn-amber"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Acessar como aluno
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="callout">
            <h3 style={{ marginBottom: 16 }}>Sou responsável (pai/mãe)</h3>
            <form>
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input id="email" type="email" placeholder="voce@exemplo.com" />
              </div>
              <div className="field">
                <label htmlFor="senha">Senha</label>
                <input id="senha" type="password" placeholder="••••••••" />
              </div>
              <a
                href="/painel"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Entrar
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </form>
            <p className="form-note">
              Ainda não tem uma conta? A criação de conta estará disponível
              assim que a autenticação real for conectada.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
