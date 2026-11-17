# 🐝 Spelling Bee - Week 6

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra
(áudio real gerado com ElevenLabs). Tem **4 modos**, escolhidos na tela
inicial: "Practice" (Letter Scramble — clicar nas letras embaralhadas, na
ordem certa, sem digitar nada), "Phase 1"/"Phase 2" (digitar a palavra
ouvida), e o novo "Sentence Buzz" (digitar a frase inteira ouvida, usando
as palavras da semana em contexto). A ordem dos itens é embaralhada a cada
partida, dentro do modo escolhido.

Vocabulário desta lista: beauty/beautiful e suas formas, safety/safeties,
treaty/treaties, pity/pitiful/pitying, duty/dutiful/dutifully,
naughty/naughtier/naughtiest/naughtiness, society/societies,
anxious/anxiety, e um grupo de palavras terminadas em "-ity"/"-ety"
(validity, rickety, entirety, improper, timidity, humidity, stupidity,
profundity, commodity/commodities, absurdity/absurdities,
technicality/technicalities, legality/legalities).

Sem backend, sem login, sem build step — arquivos estáticos que funcionam
em qualquer navegador, prontos para GitHub Pages.

## 📁 Estrutura

```
index.html                   → estrutura do jogo (início, jogo, resultado)
css/style.css                 → visual (tema abelha/colmeia)
js/game-data.js                → vocabulário + frases (EDITAR AQUI)
js/game.js                     → motor do jogo (lógica, pontuação, áudio)
assets/audio/words/             → um arquivo .mp3 por palavra
assets/audio/sentences/          → um arquivo .mp3 por frase (Sentence Buzz)
assets/img/                       → mascote Buzzy (bee-mascot.png)
```

## ✏️ Editando o vocabulário

Palavras soltas (Phase 1/2 e Practice) ficam em `js/game-data.js`, igual
nas semanas anteriores, só que agora o campo `audio` inclui a subpasta
`words/` (ex: `"words/beauty.mp3"`), já que os áudios de palavra e de
frase ficam em pastas separadas dentro de `assets/audio/`:

```js
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "beauty", audio: "words/beauty.mp3", hintEN: "The quality of...", properWords: [] },
      // ...
    ]
  },
  { name: "Phase 2", words: [ /* ... */ ] },
];
```

- `word`: a grafia correta em inglês.
- `audio`: caminho do arquivo dentro de `assets/audio/` (inclui a subpasta
  `words/` ou `sentences/`). Se o arquivo não existir/falhar ao carregar,
  o jogo cai automaticamente para a voz sintetizada do navegador
  (`speechSynthesis`) como reserva.
- `hintEN`: definição em inglês da palavra (nunca revela a resposta),
  mostrada o tempo todo logo abaixo do botão "Listen" — sempre visível,
  não é uma dica escondida que só aparece depois de errar.
- `properWords`: lista de tokens que exigem maiúscula correta (nomes
  próprios). Está vazia em todos os itens, já que nenhuma palavra/frase
  tem nome próprio — tudo é comparado sem diferenciar maiúsculas de
  minúsculas (mesmo as frases, cuja primeira letra é maiúscula só por
  começar frase, não por ser nome próprio).

Como todas as 40 palavras desta lista são de uma peça só (sem espaço nem
apóstrofo), o array `CHALLENGE_WORDS` reúne todas elas para o modo
Practice.

### Novo: "Sentence Buzz" (frases completas)

Um novo array, `SENTENCES`, guarda as 10 frases do modo "Sentence Buzz".
Cada item tem a mesma estrutura de uma palavra (`word`, `audio`, `hintEN`,
`properWords`), só que `word` é a frase inteira (com maiúscula inicial e
pontuação final) em vez de uma palavra só:

```js
const SENTENCES = [
  { word: "Beauty and safety improve society.", audio: "sentences/beauty-safety-society.mp3", hintEN: "Loveliness and security make a community better.", properWords: [] },
  // ...
];
```

O mecanismo de digitar e conferir já era preparado para frases com várias
palavras desde o primeiro Spelling Bee (compara palavra por palavra,
ignora pontuação final, sinaliza só a letra errada dentro de cada palavra
e marca "_" onde faltar uma letra) — então nenhuma lógica nova precisou
ser criada no motor do jogo, só um novo botão e uma nova lista de itens
que usa o mesmo modo "digitar" das Phases 1/2.

## 🎮 Como funciona

### Phase 1 / Phase 2 / Sentence Buzz (digitar)

1. Na tela inicial, a criança escolhe "Phase 1", "Phase 2" ou "Sentence
   Buzz".
2. Clica em "Listen" (ou o áudio já é tocado automaticamente ao carregar)
   para ouvir a palavra (ou frase) — a definição/dica em inglês já aparece
   logo abaixo do botão, o tempo todo.
3. Digita em inglês e clica em "Check" (ou aperta Enter). No "Sentence
   Buzz", digita a frase inteira, com espaços entre as palavras.
4. Se errar, somente a(s) letra(s) errada(s) dentro de cada palavra da
   resposta aparecem em vermelho — o resto fica normal. Se faltar uma
   letra, o lugar dela aparece marcado com "_" em vermelho (ex: "s_ark"
   se a criança digitar "sark" em vez de "shark"), para ela ver
   exatamente onde e o que errou — isso vale palavra por palavra, mesmo
   dentro de uma frase inteira.
5. Acerto: toca um som de sucesso, uma explosão de abelhinhas 🐝 voa pela
   tela (efeito confete), +10 pontos (5 se acertou depois de errar antes) e
   avança para o próximo item. Erro: pode tentar de novo, sem limite de
   tentativas.
6. "Skip" revela a resposta correta e marca para revisão no final.

### Practice (Letter Scramble)

1. Na tela inicial, a criança escolhe "Practice".
2. Ouve a palavra (com a definição em inglês já visível abaixo do botão
   "Listen") e vê suas letras embaralhadas como botões, com espaços vazios
   acima mostrando o tamanho da palavra — nada de digitar.
3. Clica nas letras na ordem certa para preenchê-los; clicar em uma letra
   já colocada devolve ela para a fileira de baixo, caso erre.
4. Ao preencher todos os espaços: se estiver certo, mesmo efeito de acerto
   (som + confete de abelhas + pontos). Se estiver errado, somente as
   letras erradas ficam marcadas em vermelho e voltam para a fileira de
   baixo — as letras certas continuam no lugar, para a criança ver
   exatamente onde errou e completar só o que falta. "Skip" revela a
   palavra e marca para revisão.

### Final

Ao final de qualquer modo, mostra pontuação, acertos e a lista de itens
para revisar. "Play again" repete o mesmo modo, embaralhado de novo, e
"Menu" volta para a tela inicial para escolher outro modo.

## 🔊 Áudio

Cada item toca o `.mp3` correspondente em `assets/audio/words/` (Phase
1/2 e Practice) ou `assets/audio/sentences/` (Sentence Buzz). As palavras
foram extraídas de um único áudio gerado no ElevenLabs com todas as 40
palavras; as frases vieram de um segundo áudio separado, com as 10 frases
ditas uma após a outra. Ambos foram cortados por detecção de silêncio
entre os itens. Se algum arquivo faltar ou não carregar, o jogo usa
`window.speechSynthesis` (voz do navegador, `lang = 'en-US'`) como
reserva — por isso os botões "Listen"/"Phase 1"/"Phase 2"/"Sentence
Buzz"/"Practice" sempre acionam o áudio dentro de um gesto do usuário
(clique), necessário em navegadores mobile.

### Gerando os áudios a partir de um arquivo único

Se no futuro vier um novo áudio único do ElevenLabs (uma palavra após a
outra, com uma pequena pausa entre elas, na mesma ordem do vocabulário), o
processo usado foi:

1. `ffmpeg -i audio.mp3 -af "silencedetect=noise=-30dB:d=0.2" -f null -`
   para detectar os intervalos de silêncio entre os itens (para as frases,
   que são mais longas, usamos `d=0.3` em vez de `d=0.2`).
2. Calcular o começo/fim de cada trecho a partir dos silêncios (primeiro
   item começa em 0s, último termina no fim do áudio).
3. Cortar cada trecho com `ffmpeg -ss <início> -to <fim> -c:a libmp3lame`
   e salvar como `assets/audio/words/<palavra>.mp3` ou
   `assets/audio/sentences/<slug-da-frase>.mp3`.

Nenhuma etapa depende de serviços externos além do próprio ffmpeg.

### Palavra "improper" (sem continuar o padrão "-ity"/"-ety")

Diferente das outras palavras do grupo (validity, rickety, entirety,
timidity, humidity, stupidity, profundity, commodity, absurdity,
technicality, legality), "improper" não termina em "-ity"/"-ety".
Conferimos a duração do trecho de áudio correspondente e ela combina com
uma palavra de 3 sílabas como "improper" (não com algo mais longo como
"impropriety", que teria 5 sílabas) — então mantivemos a lista exatamente
como enviada, sem perguntar à professora, já que a evidência do áudio não
apontava erro.
