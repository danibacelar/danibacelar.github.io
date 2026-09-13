import Footer from "../components/Footer";

export default function AdminPage() {
  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <a href="/" className="brand">
            Mrs. <span>Dani</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="/admin" className="active">
                Admin
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <a href="/login" className="btn btn-ghost">
              Log out
            </a>
          </div>
        </div>
      </nav>

      <section className="section">
        <div className="wrap">
          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — números e linhas de exemplo, só para o layout.
              Nenhum dado real de aluno, jogo ou compra está conectado ainda.
            </span>
          </div>

          <div className="dash-header">
            <div>
              <div className="dash-welcome">Dashboard</div>
              <div className="dash-sub">Mrs. Dani — Admin</div>
            </div>
          </div>

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

          <div className="quick-actions">
            <button className="btn btn-primary">
              Adicionar aluno
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button className="btn btn-ghost">
              Adicionar jogo
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          <div className="grid-2">
            <div>
              <h3 style={{ marginBottom: 14 }}>Alunos recentes</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Ano</th>
                      <th>Escola</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Maria</td>
                      <td>3º ano</td>
                      <td>Notre Dame</td>
                    </tr>
                    <tr>
                      <td>João</td>
                      <td>3º ano</td>
                      <td>Progresso</td>
                    </tr>
                    <tr>
                      <td>Sofia</td>
                      <td>5º ano</td>
                      <td>Notre Dame</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3 style={{ marginBottom: 14 }}>Jogos recentes</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Ano</th>
                      <th>Créditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Town Explorer</td>
                      <td>4º ano</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Sports Playground</td>
                      <td>3º ano</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Top Town</td>
                      <td>3º ano</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
