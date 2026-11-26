import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse, type NextRequest } from "next/server";
import { GAMES } from "../../data/games";
import { createClient } from "../../lib/supabase/server";

// Serve o HTML real de um jogo, mas só depois de conferir login + compra
// válida nesta mesma requisição — é o que impede o link de ser repassado
// e usado por quem não pagou (diferente de um link externo público).
//
// O arquivo físico mora em public/_jogo_arquivos/<slug>/index.html — um
// nome de pasta propositalmente sem relação com a URL pública
// (/game-content/<slug>), porque a Cloudflare/Next sempre entrega um
// arquivo estático que exista exatamente naquele caminho, mesmo quando
// também existe uma rota nossa ali (prioridade do arquivo é absoluta,
// não dá pra "vencer" isso com código). Por isso ninguém nunca deve
// linkar ou expor esse caminho de _jogo_arquivos em lugar nenhum — só
// esta rota conhece ele, e só por isso continua protegido.
//
// Usamos um catch-all ([...slug]) de propósito: se fosse só [slug] (um
// segmento), um caminho tipo /game-content/<slug>/extra não bateria em
// nenhuma rota nossa e cairia no resolvedor de assets interno do
// OpenNext — com o catch-all, esse caminho também cai aqui e é negado.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: segments } = await params;
  if (segments.length !== 1) {
    return new NextResponse("Não encontrado.", { status: 404 });
  }
  const slug = segments[0];

  const game = GAMES.find((g) => g.slug === slug);
  if (!game) {
    return new NextResponse("Jogo não encontrado.", { status: 404 });
  }

  if (!game.free) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { data: compra } = await supabase
      .from("compras")
      .select("expira_em")
      .eq("responsavel_id", user.id)
      .eq("jogo_slug", slug)
      .maybeSingle();
    const valido = !!compra && new Date(compra.expira_em).getTime() > Date.now();
    if (!valido) {
      return NextResponse.redirect(new URL(`/jogos/${slug}`, request.url));
    }
  }

  const { env } = await getCloudflareContext({ async: true });
  if (!env.ASSETS) {
    return new NextResponse("Serviço indisponível.", { status: 503 });
  }

  const assetUrl = new URL(`/_jogo_arquivos/${slug}/index.html`, request.url);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl));

  let html = await assetResponse.text();
  const botaoVoltar = `<a href="/jogos/${slug}" style="position:fixed;bottom:16px;left:16px;z-index:2147483647;display:inline-flex;align-items:center;gap:6px;background:rgba(34,56,58,0.85);color:#fff;font:600 13px/1.2 -apple-system,BlinkMacSystemFont,sans-serif;padding:10px 14px;border-radius:999px;text-decoration:none;box-shadow:0 2px 10px rgba(0,0,0,0.3);">&larr; Voltar ao site</a>`;
  html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${botaoVoltar}</body>`) : html + botaoVoltar;

  return new NextResponse(html, {
    status: assetResponse.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
