const pacotesFalsos = [
  { creditos: 50, preco: "R$ 25,00" },
  { creditos: 100, preco: "R$ 45,00" },
  { creditos: 250, preco: "R$ 100,00" },
];

export default function CreditosPage() {
  return (
    <div>
      <div className="build-note">
        🚧 Página de compra de créditos — placeholder. Os pacotes e preços
        abaixo são exemplos. Aqui é onde o Mercado Pago vai entrar: ao
        clicar em &quot;Comprar&quot;, vai abrir o checkout de pagamento de
        verdade e, quando confirmado, os créditos entram automaticamente
        na conta.
      </div>

      <h1 className="page-title">Comprar créditos</h1>
      <p className="page-lede">
        Seu saldo atual (exemplo): <strong>0 créditos</strong>
      </p>

      <div className="stat-row">
        {pacotesFalsos.map((pacote) => (
          <div className="stat-card" key={pacote.creditos}>
            <div className="stat-num">{pacote.creditos}</div>
            <div className="stat-label">créditos — {pacote.preco}</div>
            <button className="btn" type="button" disabled style={{ marginTop: 12 }}>
              Comprar (ainda não funciona)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
