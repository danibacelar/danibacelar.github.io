"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { adicionarCreditos, getSession, type Session } from "../lib/fakeAuth";

const pacotesFalsos = [
  { creditos: 50, preco: "R$ 25,00" },
  { creditos: 100, preco: "R$ 45,00" },
  { creditos: 250, preco: "R$ 100,00" },
];

export default function CreditosPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const atual = getSession();
    if (!atual) {
      router.replace("/login");
      return;
    }
    setSession(atual);
  }, [router]);

  if (!session) return null;

  function handleComprar(creditos: number) {
    const atualizada = adicionarCreditos(creditos);
    if (atualizada) {
      setSession(atualizada);
      setMensagem(`Pagamento de mentira aprovado: +${creditos} créditos adicionados.`);
    }
  }

  return (
    <>
      <Nav active="/creditos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Créditos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Comprar créditos</h1>
          <p className="lede">
            Saldo atual: <strong>{session.creditos} créditos</strong>
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
              Teste — clicar em &quot;Comprar&quot; aqui não cobra nada de
              verdade, é um pagamento de mentira que só soma créditos no seu
              saldo de teste. Na versão real, o pagamento é só por Pix (sem
              cartão de crédito): você paga, os créditos entram na hora, e
              cada jogo comprado fica liberado por 45 dias.
            </span>
          </div>

          {mensagem && (
            <div className="prototype-note" style={{ background: "var(--peach)", marginBottom: 16 }}>
              <span>{mensagem}</span>
            </div>
          )}

          <div className="stat-row">
            {pacotesFalsos.map((pacote) => (
              <div className="stat-card" key={pacote.creditos}>
                <div className="stat-num">{pacote.creditos}</div>
                <div className="stat-label">créditos — {pacote.preco} via Pix</div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ marginTop: 12 }}
                  onClick={() => handleComprar(pacote.creditos)}
                >
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
