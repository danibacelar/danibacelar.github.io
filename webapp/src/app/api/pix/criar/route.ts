import { NextResponse, type NextRequest } from "next/server";
import { GAMES } from "../../../data/games";
import { precoAvulsoReais } from "../../../lib/auth";
import { criarCobrancaPix } from "../../../lib/mercadopago";
import { createClient } from "../../../lib/supabase/server";

// Pacotes de créditos vendidos — espelha exatamente o que aparece em
// /creditos. Fica fixo aqui (não confiamos em preço vindo do navegador)
// para ninguém conseguir pedir um Pix de valor menor do que o real.
const PACOTES_CREDITOS: Record<number, { creditos: number; preco: number }> = {
  1: { creditos: 10, preco: 30 },
  3: { creditos: 30, preco: 90 },
  5: { creditos: 50, preco: 140 },
};

type CorpoRequisicao =
  | { tipo: "creditos"; pacoteJogos: number }
  | { tipo: "avulso"; jogoSlug: string; filhoId: string };

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, erro: "Você precisa entrar primeiro." }, { status: 401 });
  }

  const corpo = (await request.json()) as CorpoRequisicao;

  let valorReais: number;
  let creditos: number | null = null;
  let jogoSlug: string | null = null;
  let filhoId: string | null = null;

  if (corpo.tipo === "creditos") {
    const pacote = PACOTES_CREDITOS[corpo.pacoteJogos];
    if (!pacote) {
      return NextResponse.json({ ok: false, erro: "Pacote inválido." }, { status: 400 });
    }
    valorReais = pacote.preco;
    creditos = pacote.creditos;
  } else if (corpo.tipo === "avulso") {
    const game = GAMES.find((g) => g.slug === corpo.jogoSlug);
    if (!game) {
      return NextResponse.json({ ok: false, erro: "Jogo inválido." }, { status: 400 });
    }
    const { data: filho } = await supabase
      .from("filhos")
      .select("id")
      .eq("id", corpo.filhoId)
      .eq("responsavel_id", user.id)
      .maybeSingle();
    if (!filho) {
      return NextResponse.json({ ok: false, erro: "Perfil inválido." }, { status: 400 });
    }
    valorReais = precoAvulsoReais(game.credits);
    jogoSlug = game.slug;
    filhoId = corpo.filhoId;
  } else {
    return NextResponse.json({ ok: false, erro: "Tipo inválido." }, { status: 400 });
  }

  const { data: pagamento, error: erroInsercao } = await supabase
    .from("pagamentos_pix")
    .insert({
      responsavel_id: user.id,
      tipo: corpo.tipo,
      creditos,
      jogo_slug: jogoSlug,
      filho_id: filhoId,
      valor_reais: valorReais,
    })
    .select("id")
    .single();

  if (erroInsercao || !pagamento) {
    return NextResponse.json({ ok: false, erro: "Não foi possível iniciar o pagamento." }, { status: 500 });
  }

  try {
    const cobranca = await criarCobrancaPix(valorReais.toFixed(2), pagamento.id, user.email ?? "");

    await supabase
      .from("pagamentos_pix")
      .update({ mp_order_id: cobranca.orderId })
      .eq("id", pagamento.id);

    return NextResponse.json({
      ok: true,
      pagamentoId: pagamento.id,
      qrCode: cobranca.qrCode,
      qrCodeBase64: cobranca.qrCodeBase64,
      ticketUrl: cobranca.ticketUrl,
    });
  } catch (erro) {
    await supabase.from("pagamentos_pix").update({ status: "cancelado" }).eq("id", pagamento.id);
    const mensagem = erro instanceof Error ? erro.message : "Erro desconhecido.";
    return NextResponse.json({ ok: false, erro: mensagem }, { status: 500 });
  }
}
