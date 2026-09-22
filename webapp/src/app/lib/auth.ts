// Autenticação e créditos de verdade, usando Supabase (Auth + Postgres).
// A conta do responsável fica em auth.users (login/senha reais, cuidados
// pelo próprio Supabase); os dados extras (créditos, filhos, compras)
// ficam nas tabelas responsaveis/filhos/compras, protegidas por Row Level
// Security — cada responsável só enxerga os próprios dados.

import { createClient } from "./supabase/client";

const ACTIVE_CHILD_KEY = "mrsdani_perfil_ativo";
const DEVICE_TOKEN_KEY = "mrsdani_aparelho";
export const VALIDADE_DIAS = 30;
export const PRECO_POR_CREDITO_REAIS = 3; // 10 créditos = R$30, os 30 dias de validade

export type Child = {
  id: string;
  nome: string;
  serie?: string;
};

export type Compra = {
  slug: string;
  childId: string;
  expiraEm: string; // ISO date
};

export type Session = {
  email: string;
  nomeResponsavel: string;
  creditos: number;
  children: Child[];
  jogosComprados: Compra[];
  activeChildId: string | null;
};

export function precoAvulsoReais(creditos: number): number {
  return creditos * PRECO_POR_CREDITO_REAIS;
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function estaValido(compra: Compra | undefined): boolean {
  if (!compra) return false;
  return new Date(compra.expiraEm).getTime() > Date.now();
}

export function diasRestantes(compra: Compra): number {
  const ms = new Date(compra.expiraEm).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function gerarToken(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function getDeviceToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(DEVICE_TOKEN_KEY);
}

function setDeviceToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(DEVICE_TOKEN_KEY, token);
  else window.localStorage.removeItem(DEVICE_TOKEN_KEY);
}

function getActiveChildId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACTIVE_CHILD_KEY);
}

function setActiveChildId(childId: string | null) {
  if (typeof window === "undefined") return;
  if (childId) window.localStorage.setItem(ACTIVE_CHILD_KEY, childId);
  else window.localStorage.removeItem(ACTIVE_CHILD_KEY);
}

function traduzirErroAuth(mensagem: string): string {
  if (mensagem.includes("already registered") || mensagem.includes("already exists")) {
    return "Já existe uma conta com esse e-mail.";
  }
  if (mensagem.includes("Invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (mensagem.includes("Password should be at least")) {
    return "A senha precisa ter pelo menos 6 caracteres.";
  }
  if (mensagem.includes("Unable to validate email") || mensagem.includes("invalid")) {
    return "Digite um e-mail válido.";
  }
  return mensagem;
}

// Reivindica este aparelho como o único autorizado para a conta —
// derruba silenciosamente qualquer outro aparelho que estivesse logado
// com a mesma conta ("1 aparelho por login", pedido explícito da Dani
// pra evitar compartilhar login entre famílias).
async function reivindicarAparelho(userId: string): Promise<void> {
  const supabase = createClient();
  const token = gerarToken();
  await supabase.from("responsaveis").update({ device_token: token }).eq("id", userId);
  setDeviceToken(token);
}

export async function cadastrar(
  nomeResponsavel: string,
  email: string,
  senha: string
): Promise<{ ok: boolean; erro?: string }> {
  if (!nomeResponsavel.trim()) return { ok: false, erro: "Digite seu nome." };

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password: senha,
    options: { data: { nome: nomeResponsavel.trim() } },
  });

  if (error) return { ok: false, erro: traduzirErroAuth(error.message) };
  if (!data.session || !data.user) {
    return {
      ok: false,
      erro:
        "Conta criada, mas a confirmação de e-mail está ligada no Supabase. Desligue \"Confirm email\" em Authentication → Providers → Email e tente entrar de novo.",
    };
  }

  await reivindicarAparelho(data.user.id);
  return { ok: true };
}

export async function login(
  email: string,
  senha: string
): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: senha,
  });

  if (error) return { ok: false, erro: traduzirErroAuth(error.message) };

  await reivindicarAparelho(data.user.id);
  return { ok: true };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  setActiveChildId(null);
  setDeviceToken(null);
}

// Usado pelo polling em useSessaoAtiva: se outro aparelho reivindicou a
// conta enquanto esta aba estava aberta, o token local não bate mais com
// o salvo no banco — hora de desconectar esta sessão.
export async function sessaoAindaAtiva(): Promise<boolean> {
  const tokenLocal = getDeviceToken();
  if (!tokenLocal) return true;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return true;

  const { data } = await supabase
    .from("responsaveis")
    .select("device_token")
    .eq("id", user.id)
    .single();

  return data?.device_token === tokenLocal;
}

export async function getSession(): Promise<Session | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: responsavel }, { data: filhos }, { data: compras }] = await Promise.all([
    supabase.from("responsaveis").select("nome, creditos").eq("id", user.id).single(),
    supabase.from("filhos").select("id, nome, serie").eq("responsavel_id", user.id),
    supabase.from("compras").select("jogo_slug, filho_id, expira_em").eq("responsavel_id", user.id),
  ]);

  const children: Child[] = (filhos ?? []).map((f) => ({
    id: f.id,
    nome: f.nome,
    serie: f.serie ?? undefined,
  }));

  let activeChildId = getActiveChildId();
  if (!activeChildId || !children.some((c) => c.id === activeChildId)) {
    activeChildId = children[0]?.id ?? null;
    setActiveChildId(activeChildId);
  }

  return {
    email: user.email ?? "",
    nomeResponsavel: responsavel?.nome ?? "",
    creditos: responsavel?.creditos ?? 0,
    children,
    jogosComprados: (compras ?? []).map((c) => ({
      slug: c.jogo_slug,
      childId: c.filho_id,
      expiraEm: c.expira_em,
    })),
    activeChildId,
  };
}

export function selecionarPerfil(childId: string) {
  setActiveChildId(childId);
}

export async function adicionarFilho(
  nome: string,
  serie: string
): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, erro: "Você precisa entrar primeiro." };

  const { error } = await supabase.from("filhos").insert({
    responsavel_id: user.id,
    nome: nome.trim(),
    serie: serie.trim() || null,
  });

  if (error) return { ok: false, erro: "Não foi possível adicionar o filho." };
  return { ok: true };
}

export async function adicionarCreditos(quantidade: number): Promise<{ ok: boolean }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data: atual } = await supabase
    .from("responsaveis")
    .select("creditos")
    .eq("id", user.id)
    .single();

  const { error } = await supabase
    .from("responsaveis")
    .update({ creditos: (atual?.creditos ?? 0) + quantidade })
    .eq("id", user.id);

  return { ok: !error };
}

export function getCompra(
  session: Session,
  slug: string,
  childId: string | null | undefined
): Compra | undefined {
  if (!childId) return undefined;
  return session.jogosComprados.find((c) => c.slug === slug && c.childId === childId);
}

export async function comprarJogo(
  slug: string,
  custo: number,
  childId: string
): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, erro: "Você precisa entrar primeiro." };

  const { data: existente } = await supabase
    .from("compras")
    .select("expira_em")
    .eq("filho_id", childId)
    .eq("jogo_slug", slug)
    .maybeSingle();

  if (existente && new Date(existente.expira_em).getTime() > Date.now()) {
    return { ok: true };
  }

  const { data: responsavel } = await supabase
    .from("responsaveis")
    .select("creditos")
    .eq("id", user.id)
    .single();

  if ((responsavel?.creditos ?? 0) < custo) {
    return { ok: false, erro: "Créditos insuficientes." };
  }

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + VALIDADE_DIAS);

  const { error: erroCompra } = await supabase.from("compras").upsert(
    {
      responsavel_id: user.id,
      filho_id: childId,
      jogo_slug: slug,
      expira_em: expiraEm.toISOString(),
    },
    { onConflict: "filho_id,jogo_slug" }
  );
  if (erroCompra) return { ok: false, erro: "Não foi possível concluir a compra." };

  await supabase
    .from("responsaveis")
    .update({ creditos: (responsavel?.creditos ?? 0) - custo })
    .eq("id", user.id);

  return { ok: true };
}

// Compra avulsa: paga o valor exato daquele jogo (via Pix, na versão real)
// e libera na hora, sem mexer no saldo de créditos — é um pagamento à
// parte, não um jeito de "gastar" crédito.
export async function comprarAvulso(
  slug: string,
  childId: string
): Promise<{ ok: boolean; erro?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, erro: "Você precisa entrar primeiro." };

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + VALIDADE_DIAS);

  const { error } = await supabase.from("compras").upsert(
    {
      responsavel_id: user.id,
      filho_id: childId,
      jogo_slug: slug,
      expira_em: expiraEm.toISOString(),
    },
    { onConflict: "filho_id,jogo_slug" }
  );

  if (error) return { ok: false, erro: "Não foi possível concluir a compra." };
  return { ok: true };
}
