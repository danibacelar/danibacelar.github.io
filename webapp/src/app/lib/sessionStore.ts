// Guarda, para cada conta de responsável (e-mail), qual foi o último
// aparelho a fazer login — é o que permite derrubar o aparelho anterior
// quando alguém loga de novo com a mesma conta ("1 aparelho por login, o
// último que entra fica"). Todos os filhos daquela família usam o mesmo
// aparelho autenticado, sem precisar de senha própria.
//
// Hoje isso vive em memória do processo do servidor (funciona bem em
// `next dev` e `wrangler dev`, que mantêm um processo só rodando durante
// o teste). Quando formos para produção de verdade na Cloudflare, isso
// precisa virar um Workers KV, porque lá cada requisição pode cair numa
// instância diferente sem memória compartilhada — é o próximo ajuste,
// junto do resto da configuração de deploy.

const sessoesAtivas = new Map<string, string>();

function chave(email: string): string {
  return email.trim().toLowerCase();
}

export function claimSession(email: string, deviceToken: string) {
  sessoesAtivas.set(chave(email), deviceToken);
}

export function isCurrentSession(email: string, deviceToken: string): boolean {
  return sessoesAtivas.get(chave(email)) === deviceToken;
}
