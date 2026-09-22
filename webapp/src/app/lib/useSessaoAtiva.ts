"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, logout, sessaoAindaAtiva, type Session } from "./auth";

const INTERVALO_CHECAGEM_MS = 8000;

// Usado em toda página que exige login. Além de checar se existe sessão,
// fica perguntando ao Supabase, de tempos em tempos, se este ainda é o
// aparelho "dono" do login — se outro aparelho entrou com a mesma conta
// enquanto isso, esta aba é desconectada na hora.
export function useSessaoAtiva() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const refresh = useCallback(async () => {
    const atual = await getSession();
    if (!atual) {
      router.replace("/login");
      return;
    }
    setSession(atual);
  }, [router]);

  useEffect(() => {
    refresh();

    const intervalo = setInterval(async () => {
      const ativa = await sessaoAindaAtiva();
      if (!ativa) {
        await logout();
        router.replace("/login?motivo=outro-aparelho");
      }
    }, INTERVALO_CHECAGEM_MS);

    return () => clearInterval(intervalo);
  }, [refresh, router]);

  return { session, refresh };
}

// Usado nas páginas do aluno (/aluno, jogar): além de exigir uma sessão de
// responsável ativa, exige que um perfil de filho já tenha sido escolhido
// em /login/aluno nesse aparelho.
export function useSessaoComPerfil() {
  const router = useRouter();
  const { session, refresh } = useSessaoAtiva();

  useEffect(() => {
    if (session && !session.activeChildId) {
      router.replace("/login/aluno");
    }
  }, [session, router]);

  const activeChild = session?.children.find((c) => c.id === session.activeChildId) ?? null;

  return { session, activeChild, refresh };
}
