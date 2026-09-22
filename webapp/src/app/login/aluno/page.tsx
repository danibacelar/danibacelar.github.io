"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { getSession, selecionarPerfil, type Session } from "../../lib/auth";

export default function AlunoPickerPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    getSession().then(setSession);
  }, []);

  function handleEscolher(childId: string) {
    selecionarPerfil(childId);
    router.push("/aluno");
  }

  return (
    <>
      <Nav variant="aluno-picker" />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 600, textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/mascot/happy.png"
            alt="Raposa mascote da Mrs. Dani"
            style={{ width: 96, height: 96, borderRadius: "50%", margin: "0 auto 20px" }}
          />
          <h1 style={{ fontSize: "1.9rem" }}>Quem vai praticar hoje?</h1>
          <p className="center">Toque no seu nome para entrar.</p>

          {session === undefined ? null : session === null ? (
            <div className="callout" style={{ marginTop: 24, textAlign: "left" }}>
              <p style={{ margin: 0 }}>
                Ainda não há nenhum responsável logado neste aparelho. Peça
                para seu pai, sua mãe ou responsável entrar primeiro.
              </p>
              <a
                href="/login"
                className="btn btn-primary"
                style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
              >
                Ir para o login
              </a>
            </div>
          ) : session.children.length === 0 ? (
            <div className="callout" style={{ marginTop: 24, textAlign: "left" }}>
              <p style={{ margin: 0 }}>
                Nenhum perfil de aluno foi criado ainda nesta conta. Peça para
                o responsável adicionar um filho na Área dos Pais.
              </p>
              <a
                href="/pais"
                className="btn btn-primary"
                style={{ marginTop: 16, width: "100%", justifyContent: "center" }}
              >
                Ir para a Área dos Pais
              </a>
            </div>
          ) : (
            <div className="profile-picker">
              {session.children.map((child) => (
                <button
                  className="profile-card"
                  type="button"
                  key={child.id}
                  onClick={() => handleEscolher(child.id)}
                >
                  <span className="profile-avatar">{child.nome.charAt(0).toUpperCase()}</span>
                  <span className="profile-name">{child.nome}</span>
                </button>
              ))}
            </div>
          )}

          <p className="form-note" style={{ maxWidth: 420, margin: "32px auto 0", textAlign: "left" }}>
            Este é um protótipo. No sistema final, cada criança terá uma forma
            simples e segura de entrar, definida junto com o responsável —
            sem precisar digitar e-mail ou senha longa.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
