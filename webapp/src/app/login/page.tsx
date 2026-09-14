"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { login } from "../lib/fakeAuth";

function AvisoOutroAparelho() {
  const searchParams = useSearchParams();
  if (searchParams.get("motivo") !== "outro-aparelho") return null;

  return (
    <div className="prototype-note payment" style={{ marginBottom: 16 }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v5M12 16h.01" />
      </svg>
      <span>
        Você foi desconectado porque esse login foi usado em outro aparelho
        — cada login de teste só pode estar ativo em 1 aparelho por vez.
      </span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    const resultado = await login(nome, senha);
    setCarregando(false);
    if (resultado.ok) {
      setErro(null);
      router.push("/painel");
    } else {
      setErro(resultado.erro ?? "Não foi possível entrar.");
    }
  }

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

          <Suspense fallback={null}>
            <AvisoOutroAparelho />
          </Suspense>

          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Teste — use um dos nomes combinados como login (ex:{" "}
              <strong>Maria</strong>, <strong>João</strong>,{" "}
              <strong>Camila</strong>...) e a senha{" "}
              <strong>student123</strong>. Isso não é uma senha real, é só
              para testar o fluxo inteiro (login, créditos, compra de jogos).
            </span>
          </div>

          <div className="callout">
            <h3 style={{ marginBottom: 16 }}>Entrar com nome de teste</h3>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Ex: Maria"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="student123"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>
              {erro && (
                <p style={{ color: "var(--amber-dark)", marginBottom: 14 }}>{erro}</p>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={carregando}
              >
                {carregando ? "Entrando..." : "Entrar"}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
            <p className="form-note">
              Isso é só um ambiente de teste. Quando o login real for
              conectado, essas contas de mentira deixam de funcionar.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
