"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { GAMES } from "../data/games";
import {
  adicionarFilho,
  diasRestantes,
  estaValido,
  selecionarPerfil,
  type Session,
} from "../lib/fakeAuth";
import { useSessaoAtiva } from "../lib/useSessaoAtiva";
import { useRouter } from "next/navigation";

function contarAtividadesLiberadas(session: Session, childId: string): number {
  return GAMES.filter(
    (game) =>
      game.free ||
      estaValido(session.jogosComprados.find((c) => c.slug === game.slug && c.childId === childId))
  ).length;
}

export default function PaisPage() {
  const router = useRouter();
  const { session, refresh } = useSessaoAtiva();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nomeFilho, setNomeFilho] = useState("");
  const [serieFilho, setSerieFilho] = useState("");

  if (!session) return null;

  function handleAdicionarFilho(event: React.FormEvent) {
    event.preventDefault();
    if (!nomeFilho.trim()) return;
    adicionarFilho(nomeFilho, serieFilho);
    setNomeFilho("");
    setSerieFilho("");
    setMostrarForm(false);
    refresh();
  }

  function handleVerPainelAluno(childId: string) {
    selecionarPerfil(childId);
    router.push("/aluno");
  }

  const linhasCompras = session.jogosComprados
    .slice()
    .sort((a, b) => (a.expiraEm < b.expiraEm ? 1 : -1))
    .map((compra) => {
      const game = GAMES.find((g) => g.slug === compra.slug);
      const child = session.children.find((c) => c.id === compra.childId);
      const status = estaValido(compra)
        ? `Liberado · ${diasRestantes(compra)}d restantes`
        : "Expirado";
      return {
        key: `${compra.slug}-${compra.childId}`,
        atividade: game ? game.title : compra.slug,
        perfil: child ? child.nome : "—",
        status,
      };
    });

  return (
    <>
      <Nav variant="pais" active="/pais" />

      <section className="section">
        <div className="wrap">
          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Teste — estes dados ficam salvos só neste navegador. Nenhum
              pagamento real acontece aqui ainda; a compra por Pix será
              conectada depois.
            </span>
          </div>

          <div className="dash-header">
            <div>
              <div className="dash-welcome">Olá, {session.nomeResponsavel}</div>
              <div className="dash-sub">Conta de responsável</div>
            </div>
            <a href="/creditos" className="btn btn-primary">
              {session.creditos} créditos · Comprar mais
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="section-head">
            <p className="eyebrow">Perfis</p>
            <h2 style={{ fontSize: "1.6rem" }}>Seus filhos</h2>
            <p>Cada criança tem seu próprio perfil e suas próprias atividades liberadas.</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            {session.children.map((child) => (
              <div className="child-row" key={child.id}>
                <div className="child-row-info">
                  <span className="profile-avatar sm">{child.nome.charAt(0).toUpperCase()}</span>
                  <div>
                    <strong>{child.nome}</strong>
                    <div className="dash-sub">
                      {child.serie ? `${child.serie} · ` : ""}
                      {contarAtividadesLiberadas(session, child.id)} atividade
                      {contarAtividadesLiberadas(session, child.id) === 1 ? "" : "s"} liberada
                      {contarAtividadesLiberadas(session, child.id) === 1 ? "" : "s"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="link-inline"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  onClick={() => handleVerPainelAluno(child.id)}
                >
                  Ver painel do aluno
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {mostrarForm ? (
            <form
              onSubmit={handleAdicionarFilho}
              className="callout"
              style={{ marginBottom: 48, maxWidth: 420 }}
            >
              <div className="field">
                <label htmlFor="nomeFilho">Nome do filho(a)</label>
                <input
                  id="nomeFilho"
                  type="text"
                  placeholder="Ex: Lucas"
                  value={nomeFilho}
                  onChange={(event) => setNomeFilho(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="serieFilho">Ano escolar (opcional)</label>
                <input
                  id="serieFilho"
                  type="text"
                  placeholder="Ex: 4º ano"
                  value={serieFilho}
                  onChange={(event) => setSerieFilho(event.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setMostrarForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              className="btn btn-ghost"
              style={{ marginBottom: 48 }}
              type="button"
              onClick={() => setMostrarForm(true)}
            >
              Adicionar filho(a)
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}

          <div className="section-head">
            <p className="eyebrow">Compras</p>
            <h2 style={{ fontSize: "1.6rem" }}>Atividades adquiridas</h2>
          </div>
          <div className="table-wrap" style={{ marginBottom: 36 }}>
            <table>
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th>Perfil</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {linhasCompras.length > 0 ? (
                  linhasCompras.map((linha) => (
                    <tr key={linha.key}>
                      <td>{linha.atividade}</td>
                      <td>{linha.perfil}</td>
                      <td>{linha.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhuma atividade comprada ainda.</td>
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
