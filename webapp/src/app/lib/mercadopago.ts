// Integração server-side com o Mercado Pago (API de Orders) para cobranças
// Pix de verdade. Nunca importar este arquivo em código que roda no
// navegador — o Access Token é secreto e só existe nas variáveis de
// ambiente do servidor (Cloudflare Worker).

const MP_BASE_URL = "https://api.mercadopago.com";

export type OrderPix = {
  orderId: string;
  status: string;
  statusDetail: string;
  qrCode: string;
  qrCodeBase64: string;
  ticketUrl: string;
};

function getAccessToken(): string {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado.");
  return token;
}

// Cria uma order com um pagamento Pix associado. valorReais já deve vir
// formatado como string com 2 casas decimais (ex: "30.00").
export async function criarCobrancaPix(
  valorReais: string,
  externalReference: string,
  email: string
): Promise<OrderPix> {
  const resposta = await fetch(`${MP_BASE_URL}/v1/orders`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
      "X-Idempotency-Key": externalReference,
    },
    body: JSON.stringify({
      type: "online",
      total_amount: valorReais,
      external_reference: externalReference,
      processing_mode: "automatic",
      transactions: {
        payments: [
          {
            amount: valorReais,
            payment_method: { id: "pix", type: "bank_transfer" },
          },
        ],
      },
      // "APRO" em payer.first_name é um valor mágico que o Mercado Pago
      // reconhece SÓ no ambiente de teste, pra aprovar o Pix sozinho sem
      // precisar de um banco de verdade. MERCADOPAGO_MODO_TESTE precisa
      // ser removido (ou virar "false") quando trocarmos pra credenciais
      // de produção — do contrário, nenhum cliente real conseguiria pagar.
      payer:
        process.env.MERCADOPAGO_MODO_TESTE === "true"
          ? { email, first_name: "APRO" }
          : { email },
    }),
  });

  const dados = (await resposta.json()) as {
    id: string;
    status: string;
    status_detail: string;
    transactions?: {
      payments?: {
        status: string;
        status_detail: string;
        payment_method: {
          qr_code: string;
          qr_code_base64: string;
          ticket_url: string;
        };
      }[];
    };
    message?: string;
  };

  if (!resposta.ok) {
    throw new Error(dados.message ?? `Erro ao criar cobrança Pix (${resposta.status}).`);
  }

  const pagamento = dados.transactions?.payments?.[0];
  if (!pagamento) {
    throw new Error("Resposta do Mercado Pago sem dados do pagamento Pix.");
  }

  return {
    orderId: dados.id,
    status: pagamento.status,
    statusDetail: pagamento.status_detail,
    qrCode: pagamento.payment_method.qr_code,
    qrCodeBase64: pagamento.payment_method.qr_code_base64,
    ticketUrl: pagamento.payment_method.ticket_url,
  };
}

export type OrderStatus = {
  orderId: string;
  status: string;
  statusDetail: string;
};

// Busca o estado atual de uma order direto no Mercado Pago — usado pelo
// webhook para confirmar o status real antes de liberar créditos/jogo,
// em vez de confiar cegamente no corpo da notificação recebida.
export async function buscarOrder(orderId: string): Promise<OrderStatus> {
  const resposta = await fetch(`${MP_BASE_URL}/v1/orders/${orderId}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const dados = (await resposta.json()) as {
    id: string;
    status: string;
    status_detail: string;
    message?: string;
  };

  if (!resposta.ok) {
    throw new Error(dados.message ?? `Erro ao consultar order (${resposta.status}).`);
  }

  return { orderId: dados.id, status: dados.status, statusDetail: dados.status_detail };
}

// Valida a assinatura HMAC do webhook, seguindo exatamente o esquema do
// Mercado Pago: manifest "id:<data.id minúsculo>;request-id:<header>;ts:<ts>;"
// assinado com HMAC-SHA256 usando a "assinatura secreta" configurada no
// painel de Webhooks da aplicação.
export async function validarAssinaturaWebhook(
  xSignature: string | null,
  xRequestId: string | null,
  dataId: string | null
): Promise<boolean> {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret || !xSignature) return false;

  let ts: string | undefined;
  let hash: string | undefined;
  for (const part of xSignature.split(",")) {
    const [key, value] = part.split("=").map((s) => s.trim());
    if (key === "ts") ts = value;
    if (key === "v1") hash = value;
  }
  if (!ts || !hash) return false;

  const parts: string[] = [];
  if (dataId) parts.push(`id:${dataId.toLowerCase()}`);
  if (xRequestId) parts.push(`request-id:${xRequestId}`);
  parts.push(`ts:${ts}`);
  const manifest = parts.join(";") + ";";

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const assinatura = await crypto.subtle.sign("HMAC", key, encoder.encode(manifest));
  const computado = Array.from(new Uint8Array(assinatura))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (computado.length !== hash.length) return false;
  let diferenca = 0;
  for (let i = 0; i < computado.length; i++) {
    diferenca |= computado.charCodeAt(i) ^ hash.charCodeAt(i);
  }
  return diferenca === 0;
}
