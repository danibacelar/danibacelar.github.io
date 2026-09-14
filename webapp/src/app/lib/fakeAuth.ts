// Autenticação e créditos "de mentira", só para testar o fluxo completo
// (login, compra de créditos, compra de jogos) sem nenhum backend real.
// Tudo fica salvo no navegador (localStorage) — nada disso é seguro nem
// definitivo, é só para você experimentar antes de conectarmos o de verdade.

export const NOMES_VALIDOS = [
  "Maria",
  "Ana",
  "Francisca",
  "Antonia",
  "Adriana",
  "Juliana",
  "Marcia",
  "Fernanda",
  "Patricia",
  "Aline",
  "Sandra",
  "Camila",
  "Amanda",
  "Bruna",
  "Jessica",
  "Leticia",
  "Julia",
  "Luciana",
  "Vanessa",
  "Mariana",
  "Gabriela",
  "Valentina",
  "Beatriz",
  "Larissa",
  "Jose",
  "Joao",
  "Antonio",
  "Francisco",
  "Carlos",
  "Paulo",
  "Pedro",
  "Lucas",
  "Luiz",
  "Marcos",
  "Gabriel",
  "Rafael",
  "Daniel",
  "Marcelo",
  "Bruno",
  "Eduardo",
  "Felipe",
  "Rodrigo",
  "Gustavo",
  "Guilherme",
  "Thiago",
  "Matheus",
  "Vitor",
  "Henrique",
];

export const SENHA_FIXA = "student123";
const STORAGE_KEY = "mrsdani_fake_session";
const CREDITOS_INICIAIS = 20;
export const VALIDADE_DIAS = 45;

export type Compra = {
  slug: string;
  expiraEm: string; // ISO date
};

export type Session = {
  nome: string;
  creditos: number;
  jogosComprados: Compra[];
};

export function estaValido(compra: Compra | undefined): boolean {
  if (!compra) return false;
  return new Date(compra.expiraEm).getTime() > Date.now();
}

export function diasRestantes(compra: Compra): number {
  const ms = new Date(compra.expiraEm).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function normalizar(texto: string): string {
  return texto
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function nomeEhValido(nome: string): boolean {
  const alvo = normalizar(nome);
  return NOMES_VALIDOS.some((n) => normalizar(n) === alvo);
}

export function nomeFormatado(nome: string): string {
  const alvo = normalizar(nome);
  const encontrado = NOMES_VALIDOS.find((n) => normalizar(n) === alvo);
  return encontrado ?? nome;
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function salvar(session: Session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function login(nome: string, senha: string): { ok: boolean; erro?: string } {
  if (!nomeEhValido(nome)) {
    return { ok: false, erro: "Esse nome não está na lista de testadores." };
  }
  if (senha !== SENHA_FIXA) {
    return { ok: false, erro: `Senha incorreta. A senha de teste é "${SENHA_FIXA}".` };
  }
  const existente = getSession();
  if (existente && normalizar(existente.nome) === normalizar(nomeFormatado(nome))) {
    return { ok: true };
  }
  salvar({ nome: nomeFormatado(nome), creditos: CREDITOS_INICIAIS, jogosComprados: [] as Compra[] });
  return { ok: true };
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function adicionarCreditos(quantidade: number): Session | null {
  const session = getSession();
  if (!session) return null;
  const atualizada = { ...session, creditos: session.creditos + quantidade };
  salvar(atualizada);
  return atualizada;
}

export function getCompra(session: Session, slug: string): Compra | undefined {
  return session.jogosComprados.find((c) => c.slug === slug);
}

export function comprarJogo(
  slug: string,
  custo: number
): { ok: boolean; erro?: string; session?: Session } {
  const session = getSession();
  if (!session) return { ok: false, erro: "Você precisa entrar primeiro." };

  const compraExistente = getCompra(session, slug);
  if (estaValido(compraExistente)) return { ok: true, session };

  if (session.creditos < custo) {
    return { ok: false, erro: "Créditos insuficientes." };
  }

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + VALIDADE_DIAS);

  const novaCompra: Compra = { slug, expiraEm: expiraEm.toISOString() };
  const atualizada: Session = {
    ...session,
    creditos: session.creditos - custo,
    jogosComprados: [
      ...session.jogosComprados.filter((c) => c.slug !== slug),
      novaCompra,
    ],
  };
  salvar(atualizada);
  return { ok: true, session: atualizada };
}
