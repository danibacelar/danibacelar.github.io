# Progresso do site novo (Mrs. Dani) — resumo para continuar depois

> Se você (Claude) está lendo isso numa conversa nova: a Dani (dona do
> site) pediu esse resumo para você se situar rápido. Leia isto, dê uma
> olhada no `git log` recente da branch, e já pode continuar de onde
> parou — não precisa perguntar tudo de novo.

## O que é isto

Site novo da Mrs. Dani (jogos de inglês escolar), sendo construído
dentro da pasta `webapp/` deste mesmo repositório, para substituir aos
poucos o site estático que já existe na raiz (HTML puro, no ar hoje em
`mrsdani.com.br` via GitHub Pages).

- **Branch de trabalho:** `claude/upbeat-hopper-sj0sji` — isolada, nunca
  mexe na `main`. O site ao vivo continua intocado até ela decidir
  trocar o domínio.
- **Link de teste (já no ar):** https://mrsdani-webapp.danicosta-education.workers.dev
- **Hospedagem:** Cloudflare Workers, via adaptador `@opennextjs/cloudflare`.
- **Publicação automática:** todo push nesta branch que toque `webapp/`
  dispara `.github/workflows/deploy-cloudflare.yml`, que builda e roda
  `wrangler deploy`. Usa os secrets já configurados no GitHub
  (`CLOUDFLARE_API_TOKEN`) e o `account_id` já está em `wrangler.jsonc`.
  **Isso já está funcionando de ponta a ponta — não precisa reconfigurar.**

## Decisões de negócio já fechadas com a Dani

- **Validade de compra:** cada jogo comprado fica liberado por **30
  dias**, jogando quantas vezes quiser nesse período. Depois expira e
  precisa comprar de novo.
- **1 aparelho por login:** o mesmo login não pode ficar ativo em dois
  aparelhos ao mesmo tempo — o último que loga derruba o anterior (sem
  aviso prévio, é intencional, para evitar compartilhar senha entre
  famílias).
- **Pagamento só por Pix**, sem cartão de crédito.
- **Preços (hoje, jogo = 10 créditos; no futuro alguns jogos podem
  custar mais créditos):**
  - Compra avulsa de 1 jogo: créditos × R$3 (R$30 para um jogo de 10
    créditos = R$1 por dia de validade)
  - Pacotes de créditos: 1 jogo = R$30, 3 jogos = R$90, 5 jogos = R$140
    (desconto por volume só a partir do pacote de 5)
  - A compra avulsa **não mexe no saldo de créditos** — é um pagamento
    separado que libera só aquele jogo.
- **Jogos gratuitos** existem (campo `free: true` em `data/games.ts`) —
  ficam sempre liberados, sem gastar crédito nem precisar comprar.

## O que já está pronto (mas ainda com dados de mentira)

- Login "de mentira" para testar o fluxo inteiro: lista de nomes comuns
  brasileiros como usuário (`NOMES_VALIDOS` em `lib/fakeAuth.ts`) +
  senha fixa `student123`. Tudo fica salvo no `localStorage` do
  navegador — reseta trocando de aparelho/nome.
- Fluxo completo: login → painel → catálogo (`/jogos`) → comprar
  (crédito ou avulso) → jogar (`/jogar/[slug]`, com checagem de posse e
  validade) → créditos (`/creditos`) → meus jogos (`/meus-jogos`).
- Home (`/`) já é uma cópia fiel da home real (`index.html` da raiz do
  repo), com um botão "Fazer login" a mais.
- Fontes (Fraunces + Inter) carregadas via `next/font/google`
  (self-hosted) — havia um bug real em que o build de produção do
  Next.js descartava o `@import` do Google Fonts; já corrigido, não
  reintroduzir o `@import` em CSS solto.
- Página `/creditos`: os 3 pacotes usam as imagens reais dos selos
  (bronze/prata/ouro) que a Dani enviou — `public/assets/badges/
  bronze-10.png`, `prata-30.png`, `ouro-50.png`. Cada card mostra só
  o selo, "X jogo(s)" e o preço total (ex: "R$ 30,00"), sem preço por
  jogo — ela pediu para tirar essa quebra por unidade.

## O que falta (próximos passos possíveis)

1. **Banco de dados de verdade** (ex: Supabase) para substituir o
   login/créditos de mentira por algo persistente e real.
2. **Mercado Pago (ou outro gateway com Pix)** conectado de verdade — a
   compra hoje só simula "pagamento aprovado" na hora.
3. Mover o "quem está logado em qual aparelho" (hoje em memória, em
   `lib/sessionStore.ts`) para **Cloudflare KV** — funciona para teste,
   mas não sobrevive em produção real na borda da Cloudflare (múltiplas
   instâncias sem memória compartilhada).
4. Páginas de marketing que ainda não foram portadas para o `webapp/`:
   Sobre, Área dos pais, School Support (hoje só existem no site
   estático da raiz).
5. Painel admin (`/admin`) ainda mostra números de mentira, não
   conectado a dados reais.
6. Decidir e executar a troca de DNS de `mrsdani.com.br` para a
   Cloudflare, quando tudo estiver validado.

## Como testar localmente (se precisar)

```
cd webapp
npm run dev            # http://localhost:3000, modo desenvolvimento
npx opennextjs-cloudflare build && npx wrangler dev --port 8787
                        # roda o build de produção real, mais fiel ao que é publicado
```

Sempre valide qualquer mudança de CSS/fonte contra o **build de
produção** (`opennextjs-cloudflare build`), não só o `next dev` — já
houve um bug que só aparecia em produção.
