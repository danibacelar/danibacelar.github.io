"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { GAMES } from "../../data/games";
import { getSession, type Session } from "../../lib/fakeAuth";

export default function JogarPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    const atual = getSession();
    if (!atual) {
      router.replace("/login");
      return;
    }
    setSession(atual);
  }, [router]);

  if (session === undefined) return null;

  const slug = params.slug;
  const game = GAMES.find((g) => g.slug === slug);
  const desbloqueado = game
    ? game.free || (session?.jogosComprados.includes(slug) ?? false)
    : false;

  return (
    <>
      <Nav />

      <section className="section">
        <div className="wrap">
          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Teste — esta página confere, antes de mostrar qualquer coisa:
              (1) você está logado? (2) este jogo é gratuito, ou você já
              desbloqueou ele com créditos de mentira? Só depois disso o jogo
              aparece. Um link copiado e enviado para outra pessoa não vai
              funcionar sozinho — a não ser que a pessoa também entre com um
              nome de teste e já tenha esse jogo.
            </span>
          </div>

          <h1 style={{ marginBottom: 12 }}>
            Jogo: {game ? game.title : slug}
          </h1>

          {desbloqueado ? (
            <div className="callout" style={{ padding: 40, textAlign: "center" }}>
              <p style={{ margin: 0 }}>
                🔒✅ Acesso liberado — aqui vai aparecer o jogo de verdade.
              </p>
            </div>
          ) : (
            <div className="callout" style={{ padding: 40, textAlign: "center" }}>
              <p style={{ marginBottom: 16 }}>
                Você ainda não desbloqueou este jogo.
              </p>
              <a href="/jogos" className="btn btn-primary">
                Ver todos os jogos
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
