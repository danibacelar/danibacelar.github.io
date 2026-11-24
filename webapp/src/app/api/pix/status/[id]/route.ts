import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

// Usado pela tela de pagamento pra ficar perguntando "já pagou?" — o
// webhook do Mercado Pago é quem de fato libera o pagamento (ver
// api/webhooks/mercadopago); esta rota só lê o status já salvo.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ ok: false, erro: "Você precisa entrar primeiro." }, { status: 401 });
  }

  const { data: pagamento } = await supabase
    .from("pagamentos_pix")
    .select("status")
    .eq("id", id)
    .eq("responsavel_id", user.id)
    .maybeSingle();

  if (!pagamento) {
    return NextResponse.json({ ok: false, erro: "Pagamento não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, status: pagamento.status });
}
