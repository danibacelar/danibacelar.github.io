"use client";

import { useParams } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { GAMES } from "../../data/games";
import { diasRestantes, estaValido, getCompra } from "../../lib/fakeAuth";
import { useSessaoAtiva } from "../../lib/useSessaoAtiva";

export default function JogarPage() {
  const params = useParams<{ slug: string }>();
  const { session } = useSessaoAtiva();

  if (!session) return null;

  const slug = params.slug;
  const game = GAMES.find((g) => g.slug === slug);
  const compra = getCompra(session, slug);
  const valido = estaValido(compra);
  const expirado = !!compra && !valido;
  const desbloqueado = game ? game.free || valido : false;

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
              (1) você está logado? (2) este jogo é gratuito, ou você tem uma
              compra ainda dentro dos 30 dias de validade? Só depois disso o
              jogo aparece. Um link copiado e enviado para outra pessoa não
              vai funcionar sozinho — a não ser que a pessoa também entre com
              um nome de teste e tenha esse jogo válido.
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
              {!game?.free && compra && (
                <p style={{ marginTop: 12, marginBottom: 0 }}>
                  Válido por mais {diasRestantes(compra)} dia(s).
                </p>
              )}
            </div>
          ) : (
            <div className="callout" style={{ padding: 40, textAlign: "center" }}>
              <p style={{ marginBottom: 16 }}>
                {expirado
                  ? "Os 30 dias deste jogo expiraram. Compre de novo para continuar jogando."
                  : "Você ainda não desbloqueou este jogo."}
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
