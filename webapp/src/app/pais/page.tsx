"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { GAMES } from "../data/games";
import { diasRestantes, estaValido } from "../lib/auth";
import { useSessaoAtiva } from "../lib/useSessaoAtiva";

export default function MeusJogosPage() {
  const { session } = useSessaoAtiva();

  if (!session) return null;

  const linhasCompras = session.jogosComprados
    .slice()
    .sort((a, b) => (a.expiraEm < b.expiraEm ? 1 : -1))
    .map((compra) => {
      const game = GAMES.find((g) => g.slug === compra.slug);
      const status = estaValido(compra)
        ? `Liberado · ${diasRestantes(compra)}d restantes`
        : "Expirado";
      return {
        key: compra.slug,
        atividade: game ? game.title : compra.slug,
        status,
      };
    });

  return (
    <>
      <Nav variant="logado" active="/pais" />

      <section className="section">
        <div className="wrap">
          <div className="prototype-note payment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              O pagamento por Pix já é real; nenhum outro dado além do seu
              e-mail e senha é coletado — não pedimos nome nem dados de
              crianças.
            </span>
          </div>

          <div className="dash-header">
            <div>
              <div className="dash-welcome">Olá, {session.nomeResponsavel}</div>
              <div className="dash-sub">Seus jogos</div>
            </div>
            <a href="/creditos" className="btn btn-primary">
              {session.creditos} créditos · Comprar mais
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="section-head">
            <p className="eyebrow">Compras</p>
            <h2 style={{ fontSize: "1.6rem" }}>Atividades adquiridas</h2>
          </div>
          <div className="table-wrap" style={{ marginBottom: 36 }}>
            <table>
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {linhasCompras.length > 0 ? (
                  linhasCompras.map((linha) => (
                    <tr key={linha.key}>
                      <td>{linha.atividade}</td>
                      <td>{linha.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>Nenhuma atividade comprada ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p>
            <a className="link-inline" href="/jogos">
              Ver mais atividades na biblioteca
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
