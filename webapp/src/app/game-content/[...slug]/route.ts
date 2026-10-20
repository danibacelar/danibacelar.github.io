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
    const childId = request.nextUrl.searchParams.get("filho");
    if (!childId) {
      return NextResponse.redirect(new URL("/login/aluno", request.url));
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { data: filho } = await supabase
      .from("filhos")
      .select("id")
      .eq("id", childId)
      .eq("responsavel_id", user.id)
      .maybeSingle();
    if (!filho) {
      return NextResponse.redirect(new URL(`/jogos/${slug}`, request.url));
    }

    const { data: compra } = await supabase
      .from("compras")
      .select("expira_em")
      .eq("filho_id", childId)
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

  return new NextResponse(assetResponse.body, {
    status: assetResponse.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
