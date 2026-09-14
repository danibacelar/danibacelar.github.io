// Guarda, para cada nome de teste, qual foi o último aparelho a fazer
// login — é o que permite derrubar o aparelho anterior quando alguém
// loga de novo com o mesmo nome ("1 aparelho por login, o último que
// entra fica").
//
// Hoje isso vive em memória do processo do servidor (funciona bem em
// `next dev` e `wrangler dev`, que mantêm um processo só rodando durante
// o teste). Quando formos para produção de verdade na Cloudflare, isso
// precisa virar um Workers KV, porque lá cada requisição pode cair numa
// instância diferente sem memória compartilhada — é o próximo ajuste,
// junto do resto da configuração de deploy.

const sessoesAtivas = new Map<string, string>();

function chave(nome: string): string {
  return nome.trim().toLowerCase();
}

export function claimSession(nome: string, deviceToken: string) {
  sessoesAtivas.set(chave(nome), deviceToken);
}

export function isCurrentSession(nome: string, deviceToken: string): boolean {
  return sessoesAtivas.get(chave(nome)) === deviceToken;
}
