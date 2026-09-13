# Novo site (em construção)

Esta pasta é o começo do novo site, separado dos arquivos antigos que estão
na raiz do repositório. Nada aqui afeta o site que já está no ar em
mrsdani.com.br.

## O que já existe (só a estrutura, sem funcionar de verdade ainda)

- `src/app/page.tsx` — página inicial, lista de jogos (catálogo)
- `src/app/login/page.tsx` — tela de login
- `src/app/creditos/page.tsx` — tela de comprar pacote de créditos
- `src/app/jogar/[slug]/page.tsx` — tela onde o jogo é jogado (a parte que
  vai resolver o problema do link vazado)
- `src/app/admin/page.tsx` — painel de administração

Cada uma dessas páginas hoje é só um rascunho visual, com uma caixa amarela
no topo explicando o que ainda falta nela. Nenhuma delas verifica senha,
créditos ou pagamento de verdade ainda.

## O que falta (próximos passos, um de cada vez)

1. Conectar um banco de dados real (Supabase) para guardar contas e saldo
   de créditos.
2. Fazer o login funcionar de verdade (senha conferida de verdade).
3. Conectar o Mercado Pago para vender pacotes de créditos.
4. Proteger a página de jogar para checar login + créditos antes de
   mostrar o jogo.
5. Só no final: apontar mrsdani.com.br para cá, no lugar do GitHub Pages.

## Como rodar isto localmente (só para referência)

```
cd webapp
npm run dev
```

Abre em `http://localhost:3000`.
