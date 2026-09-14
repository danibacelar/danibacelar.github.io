// Autenticação e créditos "de mentira", só para testar o fluxo completo
// (conta do responsável, perfis dos filhos, créditos, compra de jogos) sem
// nenhum backend real. As contas ficam salvas no localStorage do navegador
// — cada navegador tem sua própria "base de dados" de mentira, então uma
// conta criada em um aparelho não aparece em outro. Isso é esperado nesta
// fase; quando conectarmos um banco de dados de verdade (Supabase), as
// contas passam a valer em qualquer aparelho.

const CONTAS_KEY = "mrsdani_contas";
const SESSAO_KEY = "mrsdani_familia_sessao";
const CREDITOS_INICIAIS = 0;
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

type ContaPai = {
  email: string;
  senha: string;
  nomeResponsavel: string;
  creditos: number;
  children: Child[];
  jogosComprados: Compra[];
};

// A sessão é o que fica salvo no aparelho: uma cópia da conta mais o token
// deste aparelho e qual filho está selecionado agora para jogar.
export type Session = {
  email: string;
  nomeResponsavel: string;
  creditos: number;
  children: Child[];
  jogosComprados: Compra[];
  deviceToken: string;
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

function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

function gerarId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function lerContas(): Record<string, ContaPai> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CONTAS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, ContaPai>) : {};
  } catch {
    return {};
  }
}

function salvarContas(contas: Record<string, ContaPai>) {
  window.localStorage.setItem(CONTAS_KEY, JSON.stringify(contas));
}

function contaParaSessao(
  conta: ContaPai,
  deviceToken: string,
  activeChildId: string | null
): Session {
  return {
    email: conta.email,
    nomeResponsavel: conta.nomeResponsavel,
    creditos: conta.creditos,
    children: conta.children,
    jogosComprados: conta.jogosComprados,
    deviceToken,
    activeChildId,
  };
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSAO_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

function salvarSessao(session: Session) {
  window.localStorage.setItem(SESSAO_KEY, JSON.stringify(session));
}

function pegarContaAtual(session: Session): ContaPai | null {
  const contas = lerContas();
  return contas[session.email] ?? null;
}

// Sincroniza a sessão local com o que está salvo na "conta" (fonte da
// verdade), preservando o aparelho e o perfil selecionado.
function atualizarSessaoDaConta(session: Session, conta: ContaPai): Session {
  const atualizada = contaParaSessao(conta, session.deviceToken, session.activeChildId);
  salvarSessao(atualizada);
  return atualizada;
}

async function reivindicarAparelho(email: string, deviceToken: string): Promise<boolean> {
  try {
    const resposta = await fetch("/api/sessao/entrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, deviceToken }),
    });
    return resposta.ok;
  } catch {
    return false;
  }
}

export async function cadastrar(
  nomeResponsavel: string,
  email: string,
  senha: string
): Promise<{ ok: boolean; erro?: string }> {
  const emailNormalizado = normalizarEmail(email);
  if (!nomeResponsavel.trim()) return { ok: false, erro: "Digite seu nome." };
  if (!emailNormalizado.includes("@")) return { ok: false, erro: "Digite um e-mail válido." };
  if (senha.length < 6) {
    return { ok: false, erro: "A senha precisa ter pelo menos 6 caracteres." };
  }

  const contas = lerContas();
  if (contas[emailNormalizado]) {
    return { ok: false, erro: "Já existe uma conta com esse e-mail neste navegador." };
  }

  contas[emailNormalizado] = {
    email: emailNormalizado,
    senha,
    nomeResponsavel: nomeResponsavel.trim(),
    creditos: CREDITOS_INICIAIS,
    children: [],
    jogosComprados: [],
  };
  salvarContas(contas);

  return login(emailNormalizado, senha);
}

export async function login(
  email: string,
  senha: string
): Promise<{ ok: boolean; erro?: string }> {
  const emailNormalizado = normalizarEmail(email);
  const contas = lerContas();
  const conta = contas[emailNormalizado];

  if (!conta || conta.senha !== senha) {
    return { ok: false, erro: "E-mail ou senha incorretos." };
  }

  const deviceToken = gerarId();
  const reivindicado = await reivindicarAparelho(emailNormalizado, deviceToken);
  if (!reivindicado) {
    return { ok: false, erro: "Não foi possível conectar ao servidor de teste." };
  }

  const activeChildId = conta.children[0]?.id ?? null;
  salvarSessao(contaParaSessao(conta, deviceToken, activeChildId));
  return { ok: true };
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSAO_KEY);
}

export async function sessaoAindaAtiva(session: Session): Promise<boolean> {
  try {
    const resposta = await fetch(
      `/api/sessao/verificar?email=${encodeURIComponent(session.email)}&deviceToken=${encodeURIComponent(session.deviceToken)}`
    );
    if (!resposta.ok) return true; // falha de rede não desconecta ninguém
    const dados = (await resposta.json()) as { ativo: boolean };
    return dados.ativo;
  } catch {
    return true;
  }
}

export function selecionarPerfil(childId: string): Session | null {
  const session = getSession();
  if (!session) return null;
  const atualizada = { ...session, activeChildId: childId };
  salvarSessao(atualizada);
  return atualizada;
}

export function adicionarFilho(nome: string, serie: string): Session | null {
  const session = getSession();
  if (!session) return null;
  const conta = pegarContaAtual(session);
  if (!conta) return null;

  const novoFilho: Child = {
    id: gerarId(),
    nome: nome.trim(),
    serie: serie.trim() || undefined,
  };
  const contaAtualizada: ContaPai = { ...conta, children: [...conta.children, novoFilho] };

  const contas = lerContas();
  contas[session.email] = contaAtualizada;
  salvarContas(contas);

  const sessaoAtualizada = atualizarSessaoDaConta(session, contaAtualizada);
  if (!sessaoAtualizada.activeChildId) {
    return selecionarPerfil(novoFilho.id);
  }
  return sessaoAtualizada;
}

export function adicionarCreditos(quantidade: number): Session | null {
  const session = getSession();
  if (!session) return null;
  const conta = pegarContaAtual(session);
  if (!conta) return null;

  const contaAtualizada: ContaPai = { ...conta, creditos: conta.creditos + quantidade };
  const contas = lerContas();
  contas[session.email] = contaAtualizada;
  salvarContas(contas);

  return atualizarSessaoDaConta(session, contaAtualizada);
}

export function getCompra(
  session: Session,
  slug: string,
  childId: string | null | undefined
): Compra | undefined {
  if (!childId) return undefined;
  return session.jogosComprados.find((c) => c.slug === slug && c.childId === childId);
}

export function comprarJogo(
  slug: string,
  custo: number,
  childId: string
): { ok: boolean; erro?: string; session?: Session } {
  const session = getSession();
  if (!session) return { ok: false, erro: "Você precisa entrar primeiro." };
  const conta = pegarContaAtual(session);
  if (!conta) return { ok: false, erro: "Conta não encontrada." };

  const compraExistente = conta.jogosComprados.find(
    (c) => c.slug === slug && c.childId === childId
  );
  if (estaValido(compraExistente)) {
    return { ok: true, session: atualizarSessaoDaConta(session, conta) };
  }

  if (conta.creditos < custo) {
    return { ok: false, erro: "Créditos insuficientes." };
  }

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + VALIDADE_DIAS);
  const novaCompra: Compra = { slug, childId, expiraEm: expiraEm.toISOString() };

  const contaAtualizada: ContaPai = {
    ...conta,
    creditos: conta.creditos - custo,
    jogosComprados: [
      ...conta.jogosComprados.filter((c) => !(c.slug === slug && c.childId === childId)),
      novaCompra,
    ],
  };
  const contas = lerContas();
  contas[session.email] = contaAtualizada;
  salvarContas(contas);

  return { ok: true, session: atualizarSessaoDaConta(session, contaAtualizada) };
}

// Compra avulsa: paga o valor exato daquele jogo (via Pix, na versão real)
// e libera na hora, sem mexer no saldo de créditos — é um pagamento à
// parte, não um jeito de "gastar" crédito.
export function comprarAvulso(
  slug: string,
  childId: string
): { ok: boolean; erro?: string; session?: Session } {
  const session = getSession();
  if (!session) return { ok: false, erro: "Você precisa entrar primeiro." };
  const conta = pegarContaAtual(session);
  if (!conta) return { ok: false, erro: "Conta não encontrada." };

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + VALIDADE_DIAS);
  const novaCompra: Compra = { slug, childId, expiraEm: expiraEm.toISOString() };

  const contaAtualizada: ContaPai = {
    ...conta,
    jogosComprados: [
      ...conta.jogosComprados.filter((c) => !(c.slug === slug && c.childId === childId)),
      novaCompra,
    ],
  };
  const contas = lerContas();
  contas[session.email] = contaAtualizada;
  salvarContas(contas);

  return { ok: true, session: atualizarSessaoDaConta(session, contaAtualizada) };
}
