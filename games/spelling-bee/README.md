# 🐝 Spelling Bee

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra (Web
Speech API, sem arquivos de áudio), lê uma dica em português (e opcionalmente
em inglês) e digita a grafia correta.

No backend, no login, no build step — arquivos estáticos que funcionam em
qualquer navegador, prontos para GitHub Pages.

## 📁 Estrutura

```
index.html        → estrutura do jogo (início, jogo, resultado)
css/style.css      → visual (tema abelha/colmeia)
js/game-data.js     → a lista de palavras/vocabulário (EDITAR AQUI)
js/game.js          → motor do jogo (lógica, pontuação, áudio)
```

## ✏️ Editando o vocabulário

Todo o vocabulário está em `js/game-data.js`, no array `SPELLING_WORDS`.
As palavras atuais são **apenas um exemplo/placeholder** — substitua pela
lista real quando ela estiver definida:

```js
const SPELLING_WORDS = [
  { word: "apple", hintPT: "Fruta redonda...", hintEN: "A round fruit..." },
  // ...
];
```

- `word`: a grafia correta em inglês (minúsculo).
- `hintPT`: dica curta em português, sempre visível.
- `hintEN`: dica em inglês, escondida atrás do botão "Ver dica em inglês".

Basta editar esse arquivo e recarregar a página — nada mais precisa mudar.

## 🎮 Como funciona

1. A criança clica em "Ouvir a palavra" (ou ela é falada automaticamente ao
   carregar) e lê a dica em português.
2. Digita a palavra em inglês e clica em "Verificar" (ou aperta Enter).
3. Acerto: +10 pontos (5 se acertou depois de errar antes) e avança para a
   próxima palavra. Erro: pode tentar de novo, sem limite de tentativas.
4. "Pular" revela a palavra correta e marca para revisão no final.
5. Ao final, mostra pontuação, acertos e a lista de palavras para revisar.

## 🔊 Áudio

Usa `window.speechSynthesis` (nativo do navegador) com `lang = 'en-US'`,
então funciona offline, sem arquivos de som para gerenciar. Em alguns
navegadores mobile a fala só funciona depois de uma interação do usuário
(clique) — por isso os botões "Ouvir a palavra"/"Começar" sempre acionam a
fala dentro de um gesto do usuário.
