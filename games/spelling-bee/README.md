# 🐝 Spelling Bee

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra/frase
(áudio real gerado com ElevenLabs) e digita a grafia correta — sem dicas,
100% listening.

Sem backend, sem login, sem build step — arquivos estáticos que funcionam
em qualquer navegador, prontos para GitHub Pages.

## 📁 Estrutura

```
index.html          → estrutura do jogo (início, jogo, resultado)
css/style.css        → visual (tema abelha/colmeia)
js/game-data.js       → a lista de vocabulário (EDITAR AQUI)
js/game.js            → motor do jogo (lógica, pontuação, áudio)
assets/audio/         → um arquivo .mp3 por item do vocabulário
```

## ✏️ Editando o vocabulário

Todo o vocabulário está em `js/game-data.js`, no array `SPELLING_WORDS`:

```js
const SPELLING_WORDS = [
  { word: "apple", audio: "apple.mp3" },
  // ...
];
```

- `word`: a grafia correta em inglês (pode ser uma palavra ou uma frase).
- `audio`: nome do arquivo dentro de `assets/audio/`. Se o arquivo não
  existir/falhar ao carregar, o jogo cai automaticamente para a voz
  sintetizada do navegador (`speechSynthesis`) como reserva.

Basta editar o arquivo (e adicionar/trocar o `.mp3` correspondente em
`assets/audio/`) e recarregar a página — nada mais precisa mudar.

## 🎮 Como funciona

1. A criança clica em "Listen" (ou o áudio já é tocado automaticamente ao
   carregar) para ouvir a palavra/frase — sem nenhuma dica na tela.
2. Digita em inglês e clica em "Check" (ou aperta Enter).
3. Acerto: +10 pontos (5 se acertou depois de errar antes) e avança para o
   próximo item. Erro: pode tentar de novo, sem limite de tentativas.
4. "Skip" revela a resposta correta e marca para revisão no final.
5. Ao final, mostra pontuação, acertos e a lista de itens para revisar.

## 🔊 Áudio

Cada item toca o `.mp3` correspondente em `assets/audio/`. Esses arquivos
atuais foram extraídos automaticamente de um único áudio gerado no
ElevenLabs (cortado por detecção de silêncio entre as palavras, na mesma
ordem em que aparecem em `SPELLING_WORDS`). Se algum arquivo faltar ou não
carregar, o jogo usa `window.speechSynthesis` (voz do navegador,
`lang = 'en-US'`) como reserva — por isso os botões "Listen"/"Let's
Spell!" sempre acionam o áudio dentro de um gesto do usuário (clique),
necessário em navegadores mobile.

### Gerando os áudios a partir de um arquivo único

Se no futuro vier um novo áudio único do ElevenLabs (uma palavra/frase após
a outra, com uma pequena pausa entre elas, na mesma ordem do vocabulário),
o processo usado foi:

1. `ffmpeg -i audio.mp3 -af "silencedetect=noise=-30dB:d=0.3" -f null -`
   para detectar os intervalos de silêncio entre os itens.
2. Calcular o começo/fim de cada trecho a partir dos silêncios (primeiro
   item começa em 0s, último termina no fim do áudio).
3. Cortar cada trecho com `ffmpeg -ss <início> -to <fim> -c:a libmp3lame`
   e salvar como `assets/audio/<slug-do-item>.mp3`.

Nenhuma etapa depende de serviços externos além do próprio ffmpeg.
