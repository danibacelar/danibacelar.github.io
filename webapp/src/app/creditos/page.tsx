import Nav from "../components/Nav";
import Footer from "../components/Footer";

const pacotesFalsos = [
  { creditos: 50, preco: "R$ 25,00" },
  { creditos: 100, preco: "R$ 45,00" },
  { creditos: 250, preco: "R$ 100,00" },
];

export default function CreditosPage() {
  return (
    <>
      <Nav active="/creditos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Créditos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Comprar créditos</h1>
          <p className="lede">
            Saldo atual: <strong>40 créditos</strong>
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <div className="prototype-note payment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — pacotes e preços de exemplo. Ao clicar em
              &quot;Comprar&quot;, aqui é onde o Mercado Pago vai abrir o
              checkout de verdade e, após confirmado, os créditos entram
              sozinhos na conta.
            </span>
          </div>

          <div className="stat-row">
            {pacotesFalsos.map((pacote) => (
              <div className="stat-card" key={pacote.creditos}>
                <div className="stat-num">{pacote.creditos}</div>
                <div className="stat-label">créditos — {pacote.preco}</div>
                <button className="btn btn-primary" type="button" disabled style={{ marginTop: 12 }}>
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
