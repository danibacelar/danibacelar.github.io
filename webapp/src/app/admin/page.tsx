export default function AdminPage() {
  return (
    <div>
      <div className="build-note">
        🚧 Painel do admin — placeholder. Os números abaixo são inventados,
        só para mostrar o layout. Aqui é onde você vai poder ver alunos,
        adicionar jogos novos e conferir vendas de créditos de verdade.
      </div>

      <h1 className="page-title">Painel — Mrs. Dani</h1>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-num">18</div>
          <div className="stat-label">Alunos</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">47</div>
          <div className="stat-label">Jogos</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">32</div>
          <div className="stat-label">Créditos vendidos</div>
        </div>
      </div>
    </div>
  );
}
