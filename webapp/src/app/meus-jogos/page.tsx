"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import SearchAndFilters from "../components/SearchAndFilters";
import { GAMES } from "../data/games";
import { getCompra, getSession, type Session } from "../lib/fakeAuth";

export default function MeusJogosPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  function refresh() {
    const atual = getSession();
    if (!atual) {
      router.replace("/login");
      return;
    }
    setSession(atual);
  }

  useEffect(refresh, [router]);

  if (!session) return null;

  const meusJogos = GAMES.filter(
    (game) => game.free || getCompra(session, game.slug)
  );

  return (
    <>
      <Nav active="/meus-jogos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap section-head" style={{ marginBottom: 20 }}>
          <p className="eyebrow">Meus jogos</p>
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>
            Jogos que você já comprou
          </h1>
          <p className="lede">
            Os jogos gratuitos e os que você já desbloqueou aparecem aqui.
            Os liberados mostram quantos dias faltam; os que passaram dos 45
            dias aparecem como &quot;Expirado&quot;, prontos para renovar.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <SearchAndFilters resultCount={meusJogos.length} />

          <div className="prototype-note" style={{ marginTop: 24 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Teste — esta lista reflete o que você comprou de mentira nesta
              sessão do navegador. Entre com outro nome de teste para começar
              com um saldo zerado.
            </span>
          </div>

          {meusJogos.length > 0 ? (
            <div className="game-grid" style={{ marginTop: 24 }}>
              {meusJogos.map((game) => (
                <GameCard
                  game={game}
                  compra={getCompra(session, game.slug)}
                  onChange={refresh}
                  key={game.slug}
                />
              ))}
            </div>
          ) : (
            <div className="callout" style={{ marginTop: 24, textAlign: "center" }}>
              <p style={{ margin: 0 }}>
                Você ainda não comprou nenhum jogo.{" "}
                <a className="link-inline" href="/jogos" style={{ display: "inline" }}>
                  Ver todos os jogos
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
