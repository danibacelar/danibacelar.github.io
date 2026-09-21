"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { cadastrar, login } from "../lib/fakeAuth";

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
        Você foi desconectado porque esta conta foi usada em outro aparelho —
        cada conta só pode estar ativa em 1 aparelho por vez.
      </span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("modo") === "criar") {
      setModo("criar");
    }
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    const resultado =
      modo === "entrar" ? await login(email, senha) : await cadastrar(nomeResponsavel, email, senha);
    setCarregando(false);
    if (resultado.ok) {
      setErro(null);
      router.push("/pais");
    } else {
      setErro(resultado.erro ?? "Não foi possível entrar.");
    }
  }

  return (
    <>
      <Nav variant="login" />

      <section style={{ paddingTop: "clamp(20px, 3vw, 32px)", paddingBottom: "clamp(28px, 4vw, 48px)" }}>
        <div className="wrap">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: 8 }} className="center">
              Entrar
            </h1>
            <p className="center" style={{ marginBottom: 20 }}>
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
                Teste — este login ainda não é o de verdade. As contas criadas
                aqui ficam salvas só neste navegador (não em um banco de dados
                real ainda), e servem para você testar o fluxo inteiro: criar
                conta, adicionar um filho, comprar créditos e liberar jogos.
              </span>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
            <div
              className="callout"
              style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <h3 style={{ marginBottom: 6 }}>Sou aluno</h3>
              <p style={{ marginBottom: 16 }}>
                Acesse suas atividades de forma simples e rápida.
              </p>
              <a
                href="/login/aluno"
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
              <h3 style={{ marginBottom: 16 }}>
                {modo === "entrar" ? "Sou responsável (pai/mãe)" : "Criar minha conta"}
              </h3>
              <form onSubmit={handleSubmit}>
                {modo === "criar" && (
                  <div className="field">
                    <label htmlFor="nomeResponsavel">Seu nome</label>
                    <input
                      id="nomeResponsavel"
                      type="text"
                      placeholder="Ex: Ana Almeida"
                      value={nomeResponsavel}
                      onChange={(event) => setNomeResponsavel(event.target.value)}
                    />
                  </div>
                )}
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="voce@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="senha">Senha</label>
                  <input
                    id="senha"
                    type="password"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                  />
                </div>
                {erro && <p style={{ color: "var(--amber-dark)", marginBottom: 14 }}>{erro}</p>}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={carregando}
                >
                  {carregando ? "Enviando..." : modo === "entrar" ? "Entrar" : "Criar conta"}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>
              <p className="form-note">
                {modo === "entrar" ? (
                  <>
                    Ainda não tem uma conta?{" "}
                    <button
                      type="button"
                      className="link-inline"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline" }}
                      onClick={() => {
                        setModo("criar");
                        setErro(null);
                      }}
                    >
                      Criar conta
                    </button>
                  </>
                ) : (
                  <>
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      className="link-inline"
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "inline" }}
                      onClick={() => {
                        setModo("entrar");
                        setErro(null);
                      }}
                    >
                      Entrar
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
