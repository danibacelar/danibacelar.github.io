export default function LoginPage() {
  return (
    <div>
      <div className="build-note">
        🚧 Página de login — placeholder. O formulário abaixo ainda não
        verifica senha nenhuma. Quando conectarmos o Supabase, aqui vai
        acontecer a conferência de e-mail/senha de verdade.
      </div>

      <h1 className="page-title">Entrar</h1>
      <p className="page-lede">
        Área de acesso para responsáveis (pai/mãe). O aluno terá uma tela
        separada, mais simples.
      </p>

      <div className="card" style={{ maxWidth: 380 }}>
        <form>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" placeholder="voce@exemplo.com" disabled />
          </div>
          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" placeholder="••••••••" disabled />
          </div>
          <button className="btn" type="button" disabled>
            Entrar (ainda não funciona)
          </button>
        </form>
      </div>
    </div>
  );
}
