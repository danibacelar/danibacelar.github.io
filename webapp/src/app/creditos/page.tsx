"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PixPagamentoModal from "../components/PixPagamentoModal";
import { formatarReais } from "../lib/auth";
import { useSessaoAtiva } from "../lib/useSessaoAtiva";

// Cada jogo custa 10 créditos hoje (pode variar por jogo no futuro), então
// os pacotes são vendidos em "quantidade de jogos" para ficar mais claro
// para os pais — por baixo, é a mesma coisa: soma créditos ao saldo.
const CREDITOS_POR_JOGO_HOJE = 10;

const pacotes = [
  { jogos: 1, preco: 30, selo: "/assets/badges/bronze-10.png" },
  { jogos: 3, preco: 90, selo: "/assets/badges/prata-30.png" },
  { jogos: 5, preco: 140, selo: "/assets/badges/ouro-50.png" },
];

export default function CreditosPage() {
  const { session, refresh } = useSessaoAtiva();
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [pacoteEmPagamento, setPacoteEmPagamento] = useState<number | null>(null);

  if (!session) return null;

  function handlePago(jogos: number, preco: number) {
    const creditos = jogos * CREDITOS_POR_JOGO_HOJE;
    setPacoteEmPagamento(null);
    refresh();
    setMensagem(`Pagamento confirmado: +${creditos} créditos adicionados (${formatarReais(preco)}).`);
  }

  return (
    <>
      <Nav variant="pais" active="/creditos" />

      <header className="section" style={{ paddingBottom: 0, paddingTop: 36 }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 20 }}>
            <p className="eyebrow">Créditos</p>
            <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)" }}>Comprar créditos</h1>
            <p className="lede">
              Saldo atual: <strong>{session.creditos} créditos</strong>
            </p>
          </div>
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
              Pagamento só por Pix (sem cartão de crédito). Quanto mais
              jogos no pacote, menor o preço de cada um — e cada jogo
              comprado fica liberado por 30 dias.
            </span>
          </div>

          {mensagem && (
            <div className="prototype-note" style={{ background: "var(--peach)", marginBottom: 16 }}>
              <span>{mensagem}</span>
            </div>
          )}

          <div className="stat-row">
            {pacotes.map((pacote) => (
              <div className="stat-card" key={pacote.jogos} style={{ textAlign: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pacote.selo}
                  alt={`Selo de ${pacote.jogos * CREDITOS_POR_JOGO_HOJE} créditos`}
                  width={96}
                  height={96}
                  style={{ width: 96, height: "auto", margin: "0 auto" }}
                />
                <div className="stat-label" style={{ marginTop: 10 }}>
                  {pacote.jogos} {pacote.jogos === 1 ? "jogo" : "jogos"}
                </div>
                <div className="stat-label">{formatarReais(pacote.preco)}</div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ marginTop: 12 }}
                  onClick={() => setPacoteEmPagamento(pacote.jogos)}
                >
                  Comprar com Pix
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pacoteEmPagamento !== null && (
        <PixPagamentoModal
          corpo={{ tipo: "creditos", pacoteJogos: pacoteEmPagamento }}
          onPago={() => {
            const pacote = pacotes.find((p) => p.jogos === pacoteEmPagamento)!;
            handlePago(pacote.jogos, pacote.preco);
          }}
          onFechar={() => setPacoteEmPagamento(null)}
        />
      )}

      <Footer />
    </>
  );
}
