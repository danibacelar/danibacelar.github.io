"use client";

import { useEffect, useState } from "react";

type CorpoPix =
  | { tipo: "creditos"; pacoteJogos: number }
  | { tipo: "avulso"; jogoSlug: string; filhoId: string };

const INTERVALO_CHECAGEM_MS = 4000;

export default function PixPagamentoModal({
  corpo,
  onPago,
  onFechar,
}: {
  corpo: CorpoPix;
  onPago: () => void;
  onFechar: () => void;
}) {
  const [estado, setEstado] = useState<"carregando" | "aguardando" | "pago" | "erro">("carregando");
  const [erro, setErro] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  // Trava a rolagem do fundo da página enquanto o modal está aberto —
  // sem isso, a barra de rolagem some/aparece e o conteúdo atrás do
  // modal "pula" de lugar, o que parecia um piscar estranho.
  useEffect(() => {
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowOriginal;
    };
  }, []);

  useEffect(() => {
    let cancelado = false;
    let intervalo: ReturnType<typeof setInterval> | undefined;

    async function iniciar() {
      try {
        const resposta = await fetch("/api/pix/criar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpo),
        });
        const dados = await resposta.json();
        if (cancelado) return;
        if (!dados.ok) {
          setErro(dados.erro ?? "Não foi possível gerar o Pix.");
          setEstado("erro");
          return;
        }

        setQrCode(dados.qrCode);
        setQrCodeBase64(dados.qrCodeBase64);
        setEstado("aguardando");

        intervalo = setInterval(async () => {
          const checagem = await fetch(`/api/pix/status/${dados.pagamentoId}`);
          const statusDados = await checagem.json();
          if (cancelado) return;
          if (statusDados.ok && statusDados.status === "pago") {
            setEstado("pago");
            clearInterval(intervalo);
            // Espera um instante antes de fechar/navegar, pra dar tempo da
            // pessoa ver a mensagem de confirmação em vez de ela sumir
            // na hora (a troca de tela ficava parecendo um "piscar").
            setTimeout(() => {
              if (!cancelado) onPago();
            }, 1500);
          }
        }, INTERVALO_CHECAGEM_MS);
      } catch {
        if (!cancelado) {
          setErro("Não foi possível conectar ao Mercado Pago.");
          setEstado("erro");
        }
      }
    }

    iniciar();

    return () => {
      cancelado = true;
      if (intervalo) clearInterval(intervalo);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCopiar() {
    if (!qrCode) return;
    navigator.clipboard.writeText(qrCode);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 16,
      }}
      onClick={onFechar}
    >
      <div
        className="callout"
        style={{
          maxWidth: 420,
          width: "100%",
          minHeight: 360,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "var(--paper, #fff)",
          textAlign: "center",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <h3 style={{ marginBottom: 16 }}>Pagar com Pix</h3>

        {estado === "carregando" && <p>Gerando QR code...</p>}

        {estado === "erro" && (
          <>
            <p style={{ color: "var(--amber-dark)" }}>{erro}</p>
            <button type="button" className="btn btn-ghost" onClick={onFechar} style={{ marginTop: 12 }}>
              Fechar
            </button>
          </>
        )}

        {estado === "aguardando" && qrCodeBase64 && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/jpeg;base64,${qrCodeBase64}`}
              alt="QR code Pix"
              style={{ width: 220, height: 220, margin: "0 auto 16px", display: "block" }}
            />
            <button type="button" className="btn btn-ghost" onClick={handleCopiar} style={{ width: "100%" }}>
              {copiado ? "Copiado!" : "Copiar código Pix (copia e cola)"}
            </button>
            <p style={{ marginTop: 16, fontSize: "0.9rem", color: "var(--ink-soft)" }}>
              Abra o app do seu banco, escaneie o QR code ou cole o código, e pague. Esta tela atualiza
              sozinha assim que o pagamento é confirmado.
            </p>
            <button type="button" className="btn btn-ghost" onClick={onFechar} style={{ marginTop: 16 }}>
              Cancelar
            </button>
          </>
        )}

        {estado === "pago" && <p>Pagamento confirmado! 🎉</p>}
      </div>
    </div>
  );
}
