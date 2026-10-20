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

## IMPORTANTE: o protótipo estático da raiz é a fonte da verdade do design

A raiz deste repositório (fora de `webapp/`) não é só a home — é um
protótipo completo de front-end que a Dani (ou alguém a pedido dela) já
tinha construído e aprovado, com todo o fluxo e o visual do jeito que ela
quer: `index.html`, `games/index.html` (catálogo com busca/filtros),
`games/detail.html` (produto do jogo), `login/index.html` (entrar),
`login/aluno.html` (seletor de perfil do aluno), `student/index.html`
(painel do aluno), `parent/index.html` (área dos pais), `about/index.html`
(sobre), `school-support/index.html`, `admin/index.html` — tudo com CSS
real em `css/style.css` + `css/components.css` e um `js/main.js` de
~1600 linhas que já simulava (com dados de mentira) o fluxo inteiro.

Numa sessão anterior eu tinha construído o `webapp/` do zero, com páginas
e um modelo de conta *diferentes* desse protótipo (login único por nome de
criança + senha fixa, um painel genérico). A Dani percebeu a diferença e
pediu para o site novo ficar **igual ao protótipo**, mantendo só o que já
tínhamos validado nele por cima (preços, créditos, selos, botão "Fazer
login"). Essa reconstrução foi feita nesta sessão — ver commit
"Reconstruir o site para casar com o protótipo real".

**Lição para o futuro:** antes de desenhar uma página nova no `webapp/`,
sempre olhar primeiro se já existe uma versão dela no protótipo estático
da raiz (mesmo nome de conceito: jogos → `games/`, login → `login/`,
etc.) e portar a estrutura/HTML de lá, em vez de inventar um layout novo.
O CSS (`css/style.css` + `css/components.css`) já está 100% espelhado em
`webapp/src/app/site-style.css` + `site-components.css` — qualquer classe
usada no protótipo (`.game-card`, `.stat-row`, `.profile-picker`,
`.dash-header`, `.child-row`, etc.) já existe e já funciona no `webapp/`.

## Modelo de conta: responsável + filhos (como no protótipo)

Isto mudou de verdade nesta sessão — o modelo antigo (nome da criança +
senha fixa `student123`) foi substituído por um modelo de duas camadas,
igual ao que o protótipo já desenhava:

- **Conta do responsável** (pai/mãe): e-mail + senha de verdade (validada
  contra o que foi cadastrado — ver limitação abaixo), cadastro
  funcional em `/login` (alternando entre "Entrar" e "Criar conta"). É
  essa conta que guarda o **saldo de créditos** e a lista de filhos.
- **Perfis dos filhos**: cada filho é só um nome (+ série opcional),
  sem senha própria — em `/login/aluno` a criança toca no próprio nome
  para entrar, estilo "seletor de perfil" (Netflix). São adicionados
  pelo responsável em `/pais` ("Adicionar filho(a)").
- **Compras são por (jogo, filho)**: o mesmo jogo pode ser comprado
  separadamente para dois filhos diferentes; os créditos saem do saldo
  da família, mas a validade de 30 dias é por perfil.
- **"1 aparelho por login" agora vale por conta de responsável**, não
  mais por nome de criança: logar com o e-mail/senha em um novo aparelho
  derruba a sessão anterior (pai e todos os filhos daquela família usam o
  mesmo aparelho autenticado, sem senha extra para cada um).

Tudo isso vive em `webapp/src/app/lib/fakeAuth.ts`. **Limitação atual e
esperada:** as contas ficam salvas só no `localStorage` do navegador onde
foram criadas — não existe banco de dados real ainda, então uma conta
criada num navegador não aparece em outro. Isso é o próximo passo grande
(Supabase), não um bug.

## Decisões de negócio já fechadas com a Dani

- **Validade de compra:** cada jogo comprado fica liberado por **30
  dias**, jogando quantas vezes quiser nesse período. Depois expira e
  precisa comprar de novo.
- **1 aparelho por login** (ver seção acima — agora por conta de
  responsável): o último aparelho que loga derruba o anterior, sem
  aviso prévio, é intencional, para evitar compartilhar senha entre
  famílias.
- **Pagamento só por Pix**, sem cartão de crédito.
- **Preços (hoje, jogo = 10 créditos; no futuro alguns jogos podem
  custar mais créditos):**
  - Compra avulsa de 1 jogo: créditos × R$3 (R$30 para um jogo de 10
    créditos = R$1 por dia de validade)
  - Pacotes de créditos: 1 jogo = R$30, 3 jogos = R$90, 5 jogos = R$140
    (desconto por volume só a partir do pacote de 5)
  - A compra avulsa **não mexe no saldo de créditos** — é um pagamento
    separado que libera só aquele jogo, para o filho selecionado.
- **Jogos gratuitos** existem (campo `free: true` em `data/games.ts`) —
  ficam sempre liberados, sem gastar crédito nem precisar comprar.

## Mapa de páginas (protótipo → webapp)

| Protótipo (raiz)          | webapp (Next.js)      | Observação |
|----------------------------|------------------------|------------|
| `index.html`                | `/`                    | Cópia fiel + botão "Fazer login" |
| `games/index.html`          | `/jogos`               | Catálogo público, não exige login |
| `games/detail.html`         | `/jogos/[slug]`        | Produto do jogo + compra/jogar |
| `login/index.html`          | `/login`               | "Sou aluno" / "Sou responsável", cadastro real |
| `login/aluno.html`          | `/login/aluno`         | Seletor de perfil dos filhos |
| `student/index.html`        | `/aluno`               | Painel do aluno (em inglês, como no protótipo) |
| `parent/index.html`         | `/pais`                | Área dos pais: créditos, filhos, compras |
| `about/index.html`          | `/sobre`               | Portada direto |
| `school-support/index.html` | `/school-support`      | Portada direto |
| `admin/index.html`          | `/admin`               | Ainda com números de mentira |
| (não existe no protótipo)   | `/creditos`            | Página nova, pedida pela Dani; segue o mesmo visual (`stat-row`/`stat-card`) |

## O que já está pronto (mas ainda com dados de mentira)

- Fluxo completo: `/login` (criar conta ou entrar) → `/pais` (adicionar
  filho, ver créditos) → `/login/aluno` (escolher perfil) → `/aluno`
  (jogar) → `/jogos` (catálogo, comprar com crédito ou avulso) →
  `/jogos/[slug]` (produto + comprar/jogar) → `/creditos` (comprar
  pacote). Testado ponta a ponta com Playwright, inclusive rodando o
  build de produção real via `wrangler dev`.
- Home (`/`) é cópia fiel da home real, com "Fazer login" no lugar de
  "Explorar jogos" no canto superior direito.
- Fontes (Fraunces + Inter) carregadas via `next/font/google`
  (self-hosted) — havia um bug real em que o build de produção do
  Next.js descartava o `@import` do Google Fonts; já corrigido, não
  reintroduzir o `@import` em CSS solto.
- Página `/creditos`: os 3 pacotes usam as imagens reais dos selos
  (bronze/prata/ouro) que a Dani enviou — `public/assets/badges/
  bronze-10.png`, `prata-30.png`, `ouro-50.png`. Cada card mostra só
  o selo, "X jogo(s)" e o preço total (ex: "R$ 30,00"), sem preço por
  jogo.

## IMPORTANTE: trocar o DNS não "mescla" os dois sites — substitui

A Dani perguntou se trocar o DNS de `mrsdani.com.br` para a Cloudflare
"traz tudo" do site estático atual. **Não traz.** Trocar DNS é uma
substituição: o que não estiver pronto no `webapp/` simplesmente some do
ar. Ela confirmou que `mrsdani.com.br` ainda não tem usuários reais (só
subiu os arquivos lá para teste), o que reduz o risco, mas o checklist
abaixo continua valendo antes de trocar de vez.

## Checklist para o site novo poder substituir o mrsdani.com.br

**🔴 Bloqueia a troca de domínio:**
1. ~~Catálogo completo de jogos~~ — **feito** (ver seção abaixo).
2. ~~Banco de dados de verdade (Supabase)~~ — **feito e testado ao
   vivo**: contas, créditos, filhos e compras são reais (Supabase Auth
   + Postgres com RLS). Testado criando conta de verdade no site
   publicado e confirmando persistência entre sessões.
3. ~~Servir os jogos de forma protegida~~ — **feito para os 23 jogos
   locais** (ver seção "Proteção de acesso aos jogos" abaixo).
   Growing Plants e Spelling Bee ainda faltam (item 5 daquela seção).
4. **Pagamento real via Pix** (Mercado Pago ou outro) — hoje só simula.
5. ~~Mover sessão "1 aparelho por login" para Cloudflare KV~~ —
   **não precisa mais**: o controle já usa uma coluna no Supabase
   (`device_token`), que é compartilhado entre todas as instâncias por
   natureza (banco de verdade, não memória do processo).

**🟡 Importante, não trava:**
5. Painel admin (`/admin`) conectado a dados reais.
6. Decidir o botão PT/EN — hoje é só decorativo, nunca funcionou nesta
   reconstrução (perguntei à Dani se remove ou implementa de verdade,
   ainda sem resposta definitiva quando este texto foi escrito).

**🟢 Polimento final:**
7. Revisão geral de texto/conteúdo.
8. Testar em vários navegadores/celulares.
9. Trocar o DNS.

## Catálogo completo de jogos — feito nesta sessão

Os 25 jogos reais do `mrsdani.com.br` (dados extraídos de `js/main.js`)
foram portados para `webapp/src/app/data/games.ts`: título, descrição,
ano escolar, habilidade, dificuldade e o **link real de cada jogo** (a
maioria em `https://mrsdani.com.br/<slug>/`, dois hospedados localmente
em `games/growing-plants/` e `games/spelling-bee/`). Todos custam 10
créditos, exceto Growing Plants que continua grátis.

**Os jogos em si não foram reconstruídos** — só linkados. A Dani
confirmou que já funcionam de verdade no site atual (abrem em outra
aba), então o botão "Jogar agora" em `/jogos/[slug]` já leva pro jogo
de verdade assim que o jogo é liberado (comprado ou grátis).

19 dos 25 jogos não têm uma imagem de capa (campo `thumbnail` ausente
em `data/games.ts`) — os componentes já lidam com isso mostrando um
placeholder ("Prévia do jogo em breve") em vez de quebrar. Se a Dani
mandar screenshots dos jogos que faltam, é só adicionar o arquivo em
`public/assets/games/` e preencher o campo `thumbnail` do jogo
correspondente.

## Proteção de acesso aos jogos — feito para os 23 jogos locais

A Dani levantou um problema real: o link de cada jogo
(`mrsdani.com.br/algum-nome/`) era público — quem tivesse o link
acessava direto, sem pagar. Resolvido para os 23 jogos que moramos
localmente (ver "descoberta" abaixo), servindo-os **de dentro do nosso
próprio site**, com verificação de sessão + compra a cada acesso (não
só na hora da compra).

**Descoberta (sessão anterior):** os 23 jogos que não são Growing
Plants/Spelling Bee nunca estiveram neste repositório — cada um é um
**repositório próprio no GitHub** da Dani. Foram clonados e o
`index.html` de cada um (HTML autocontido) copiado para cá.

**Como a proteção funciona de verdade (implementado nesta sessão):**
- URL pública de cada jogo: `/game-content/<slug>` — rota real do
  Next.js (`webapp/src/app/game-content/[...slug]/route.ts`), não um
  arquivo estático. Em cada acesso ela: pega o `filho` da query string
  (`?filho=<id>`, montado pela página `/jogos/[slug]` a partir do
  perfil ativo), confere a sessão do responsável no Supabase, confere
  que aquele filho é dele, confere que existe uma compra válida (não
  expirada) para aquele jogo+filho — só então busca e devolve o HTML
  de verdade. Jogos `free: true` pulam a checagem de compra (mas ainda
  passam pela rota).
- O HTML real de cada jogo mora fisicamente em
  `webapp/public/_jogo_arquivos/<slug>/index.html` — **um nome de
  pasta propositalmente sem nenhuma relação com a URL pública**. Isso
  foi necessário por uma descoberta importante: a Cloudflare/Next.js
  **sempre** entrega um arquivo estático que exista exatamente naquele
  caminho, mesmo quando existe uma rota nossa ali também (prioridade
  do arquivo é absoluta — não tem como vencer isso com código; só
  conseguimos fechar o buraco escondendo o arquivo atrás de um nome de
  pasta que ninguém de fora consegue adivinhar nem ver, já que esse
  caminho nunca aparece em nenhum HTML/JS enviado ao navegador).
- `wrangler.jsonc` (`assets.run_worker_first` + `assets.html_handling:
  "none"`) garante que a Cloudflare nunca tenta "atalhar" essas pastas
  — toda requisição passa pelo nosso código primeiro.
- A rota é um **catch-all** (`[...slug]`, não `[slug]`) de propósito:
  fecha também o caminho cru `/game-content/<slug>/index.html` (nega
  com 404 em vez de deixar outro mecanismo interno do Next servir o
  arquivo sem checar nada).
- `data/games.ts`: os 23 jogos locais já apontam `gameUrl` para
  `/game-content/<slug>` (não mais para `mrsdani.com.br`). A página
  `/jogos/[slug]` monta o link final como
  `/game-content/<slug>?filho=<id-do-perfil-ativo>` e **não abre mais
  em outra aba** para esses jogos (pedido explícito da Dani) — só os 2
  jogos ainda externos (ver abaixo) continuam abrindo em aba nova.

**Limitação residual, aceita conscientemente:** o caminho físico
escondido (`/_jogo_arquivos/<slug>/index.html`) ainda responde sem
checagem nenhuma **se alguém souber o caminho exato** — não tem como
fechar esse buraco por código (é a Cloudflare quem decide, não o
Next.js), só por ele nunca ser exposto. Na prática ninguém descobre
esse caminho por fora (não está em nenhum link, HTML ou JS do site),
então o cenário que a Dani queria evitar — alguém pegar o link
"normal" do jogo e repassar pra quem não pagou — está resolvido. Se
no futuro quisermos fechar esse último 1%, dá pra trocar o nome da
pasta por um hash diferente a cada deploy, mas isso é só
"nice-to-have", não bloqueia nada.

**Ainda não testado ponta a ponta com o Supabase de verdade** (a rede
do sandbox onde isso foi construído bloqueia conexões pro Supabase) —
testado localmente só até onde dá sem rede: confirma que erra para
"sem login" (redireciona pro `/login`), "sem filho escolhido"
(redireciona pro `/login/aluno`), "slug inexistente" (404). A Dani
precisa testar ao vivo depois do deploy: comprar um jogo de verdade e
confirmar que "Jogar agora" funciona, e que o link `/game-content/...`
sem estar logada (ex: numa aba anônima) não abre o jogo.

**Falta fazer (próximos passos):**
1. ~~Configurar o Supabase~~ — **feito** (ver seção de auth acima).
2. ~~Sessão verificável pelo servidor~~ — **feito** (cookies do
   Supabase Auth via `@supabase/ssr` + middleware/`proxy.ts`).
3. ~~Rota protegida~~ — **feito**, ver acima.
4. ~~Trocar `gameUrl`~~ — **feito** para os 23 jogos locais.
5. Unificar Growing Plants e Spelling Bee (hoje em `games/` na raiz do
   repo, fora do webapp) para dentro do mesmo esquema — **ainda não
   feito**. Growing Plants é grátis (risco baixo), mas Spelling Bee
   custa crédito e continua com o link antigo solto
   (`mrsdani.com.br/games/spelling-bee/...`), com o mesmo problema que
   motivou tudo isso. Esses dois jogos têm pasta própria de CSS/JS
   (não são um único HTML autocontido como os 23), então portar exige
   um pouco mais de trabalho (servir a pasta inteira, não só um
   arquivo).

## Próximos passos possíveis (itens que não bloqueiam o catálogo)

1. **Banco de dados de verdade** (ex: Supabase) para que as contas dos
   responsáveis valham em qualquer navegador/aparelho, não só onde foram
   criadas.
2. **Mercado Pago (ou outro gateway com Pix)** conectado de verdade — a
   compra hoje só simula "pagamento aprovado" na hora.
3. Mover o "qual aparelho está logado em qual conta" (hoje em memória, em
   `lib/sessionStore.ts`) para **Cloudflare KV** — funciona para teste,
   mas não sobrevive em produção real na borda da Cloudflare (múltiplas
   instâncias sem memória compartilhada).
4. Painel admin (`/admin`) ainda mostra números de mentira, não
   conectado a dados reais (contas/filhos/compras já existem em
   `lib/fakeAuth.ts`, dava para ligar números reais ali como próximo
   passo pequeno).
5. Decidir e executar a troca de DNS de `mrsdani.com.br` para a
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
