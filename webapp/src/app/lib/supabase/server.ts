import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente Supabase para usar em Route Handlers / Server Components — lê e
// escreve a sessão via cookie, para o servidor conseguir verificar quem
// está fazendo a requisição (não dá pra confiar só no localStorage).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // chamado de um Server Component sem permissão de escrita — o
            // middleware já cuida de manter a sessão atualizada nesse caso.
          }
        },
      },
    }
  );
}
