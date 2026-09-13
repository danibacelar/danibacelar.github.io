const jogosFalsos = [
  { nome: "Growing Plants", creditos: 10 },
  { nome: "Spelling Bee", creditos: 15 },
  { nome: "Top Town", creditos: 20 },
];

export default function CatalogoPage() {
  return (
    <div>
      <div className="build-note">
        🚧 Página de catálogo — placeholder. Os jogos abaixo são de mentira, só
        para mostrar como o preço em créditos vai aparecer ao lado de cada
        jogo. Ainda não busca dados reais nem verifica login.
      </div>

      <h1 className="page-title">Todos os jogos</h1>
      <p className="page-lede">
        Cada jogo mostra quantos créditos custa. Ao clicar em &quot;Jogar&quot;,
        o sistema vai verificar se você já tem esse jogo ou se tem créditos
        suficientes para desbloquear.
      </p>

      <div className="game-grid">
        {jogosFalsos.map((jogo) => (
          <div className="game-card" key={jogo.nome}>
            <h3>{jogo.nome}</h3>
            <div className="credit-badge">{jogo.creditos} créditos</div>
            <br />
            <a className="btn" href="/jogar/exemplo">
              Jogar
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
