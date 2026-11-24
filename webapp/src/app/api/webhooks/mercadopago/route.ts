import { NextResponse, type NextRequest } from "next/server";
import { buscarOrder, validarAssinaturaWebhook } from "../../../lib/mercadopago";
import { createClient } from "../../../lib/supabase/server";

// O Mercado Pago chama esta rota sozinho (sem ninguém logado) assim que
// o status de uma cobrança muda — é daqui que os créditos/jogo são
// liberados de verdade, nunca na hora de só mostrar o QR code.
export async function POST(request: NextRequest) {
  const dataId = request.nextUrl.searchParams.get("data.id");
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  const assinaturaValida = await validarAssinaturaWebhook(xSignature, xRequestId, dataId);
  if (!assinaturaValida || !dataId) {
    return new NextResponse("Assinatura inválida.", { status: 401 });
  }

  try {
    const order = await buscarOrder(dataId);
    const supabase = await createClient();

    if (order.status === "processed" && order.statusDetail === "accredited") {
      const { error } = await supabase.rpc("confirmar_pagamento_pix", {
        p_mp_order_id: order.orderId,
        p_segredo: process.env.PIX_RPC_SECRET,
      });
      if (error) {
        console.error("Erro ao confirmar pagamento Pix:", error.message);
        return new NextResponse("Erro ao processar.", { status: 500 });
      }
    } else if (order.status === "refunded" || order.statusDetail === "refunded") {
      const { error } = await supabase.rpc("estornar_pagamento_pix", {
        p_mp_order_id: order.orderId,
        p_segredo: process.env.PIX_RPC_SECRET,
      });
      if (error) {
        console.error("Erro ao estornar pagamento Pix:", error.message);
        return new NextResponse("Erro ao processar.", { status: 500 });
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (erro) {
    console.error("Erro no webhook do Mercado Pago:", erro);
    return new NextResponse("Erro ao processar.", { status: 500 });
  }
}
