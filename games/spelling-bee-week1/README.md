# 🐝 Spelling Bee - week 1

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra
(áudio real gerado com ElevenLabs). Tem 3 modos, escolhidos na tela inicial:
"Phase 1" e "Phase 2" (digitar a palavra ouvida) e "Challenge" (Letter
Scramble — clicar nas letras embaralhadas, na ordem certa, sem digitar
nada). A ordem dos itens é embaralhada a cada partida, dentro do modo
escolhido.

Vocabulário desta lista: famílias de palavras com o mesmo padrão de
ortografia/som (isle/islands, ratio(s), crawl/brawl/foul e suas formas
-s/-ed/-ing, audio/audiovisual, shark(s), park e suas formas, sparkle e
suas formas, embark e suas formas, mantle/mantles vs. mantel/mantels, e
dismantle e suas formas).

Sem backend, sem login, sem build step — arquivos estáticos que funcionam
em qualquer navegador, prontos para GitHub Pages.

## 📁 Estrutura

```
index.html          → estrutura do jogo (início, jogo, resultado)
css/style.css        → visual (tema abelha/colmeia)
js/game-data.js       → a lista de vocabulário (EDITAR AQUI)
js/game.js            → motor do jogo (lógica, pontuação, áudio)
assets/audio/         → um arquivo .mp3 por palavra
assets/img/            → mascote Buzzy (bee-mascot.png)
```

## ✏️ Editando o vocabulário

Todo o vocabulário está em `js/game-data.js`, no array `SPELLING_PHASES`
(uma entrada por fase, cada uma com seu próprio array `words`), mais o
array `CHALLENGE_WORDS` usado pelo modo Letter Scramble:

```js
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "isle", audio: "isle.mp3", hintEN: "A small island...", properWords: [] },
      // ...
    ]
  },
  { name: "Phase 2", words: [ /* ... */ ] },
];
```

- `word`: a grafia correta em inglês.
- `audio`: nome do arquivo dentro de `assets/audio/`. Se o arquivo não
  existir/falhar ao carregar, o jogo cai automaticamente para a voz
  sintetizada do navegador (`speechSynthesis`) como reserva.
Diferente do primeiro Spelling Bee, aqui a definição em inglês (`hintEN`)
fica **sempre visível**, logo abaixo do botão "Listen" — não é uma dica
escondida que só aparece depois de errar.

- `hintEN`: definição em inglês da palavra (nunca revela a resposta),
  mostrada o tempo todo acima do campo de resposta/das letras.
- `properWords`: lista de tokens que exigem maiúscula correta (nomes
  próprios). Está vazia em todos os itens desta lista, já que nenhuma
  palavra é um nome próprio — tudo é comparado sem diferenciar maiúsculas
  de minúsculas.

Basta editar o arquivo (e adicionar/trocar o `.mp3` correspondente em
`assets/audio/`) e recarregar a página — nada mais precisa mudar.

Como todas as 40 palavras desta lista são de uma peça só (sem espaço nem
apóstrofo), o array `CHALLENGE_WORDS` reúne todas elas — diferente do
primeiro Spelling Bee, que teve que deixar de fora as frases inteiras.

## 🎮 Como funciona

### Phase 1 / Phase 2 (digitar)

1. Na tela inicial, a criança escolhe "Phase 1" ou "Phase 2".
2. Clica em "Listen" (ou o áudio já é tocado automaticamente ao carregar)
   para ouvir a palavra — a definição em inglês já aparece logo abaixo do
   botão, o tempo todo.
3. Digita em inglês e clica em "Check" (ou aperta Enter).
4. Se errar, a palavra errada da própria resposta aparece em vermelho.
5. Acerto: toca um som de sucesso, uma explosão de abelhinhas 🐝 voa pela
   tela (efeito confete), +10 pontos (5 se acertou depois de errar antes) e
   avança para o próximo item. Erro: pode tentar de novo, sem limite de
   tentativas.
6. "Skip" revela a resposta correta e marca para revisão no final.

### Challenge (Letter Scramble)

1. Na tela inicial, a criança escolhe "Challenge".
2. Ouve a palavra (com a definição em inglês já visível abaixo do botão
   "Listen") e vê suas letras embaralhadas como botões, com espaços vazios
   acima mostrando o tamanho da palavra — nada de digitar.
3. Clica nas letras na ordem certa para preenchê-los; clicar em uma letra
   já colocada devolve ela para a fileira de baixo, caso erre.
4. Ao preencher todos os espaços: se estiver certo, mesmo efeito de acerto
   (som + confete de abelhas + pontos). Se estiver errado, as letras voltam
   sozinhas para tentar de novo. "Skip" revela a palavra e marca para
   revisão.

### Final

Ao final de qualquer modo, mostra pontuação, acertos e a lista de itens
para revisar. "Play again" repete o mesmo modo, embaralhado de novo.

## 🔊 Áudio

Cada item toca o `.mp3` correspondente em `assets/audio/`. Esses arquivos
foram extraídos automaticamente de um único áudio gerado no ElevenLabs
(cortado por detecção de silêncio entre as palavras, na mesma ordem em que
os itens aparecem em `SPELLING_PHASES`, fase por fase). Se algum arquivo
faltar ou não carregar, o jogo usa `window.speechSynthesis` (voz do
navegador, `lang = 'en-US'`) como reserva — por isso os botões
"Listen"/"Phase 1"/"Phase 2" sempre acionam o áudio dentro de um gesto do
usuário (clique), necessário em navegadores mobile.

### Gerando os áudios a partir de um arquivo único

Se no futuro vier um novo áudio único do ElevenLabs (uma palavra após a
outra, com uma pequena pausa entre elas, na mesma ordem do vocabulário), o
processo usado foi:

1. `ffmpeg -i audio.mp3 -af "silencedetect=noise=-30dB:d=0.3" -f null -`
   para detectar os intervalos de silêncio entre os itens.
2. Calcular o começo/fim de cada trecho a partir dos silêncios (primeiro
   item começa em 0s, último termina no fim do áudio).
3. Cortar cada trecho com `ffmpeg -ss <início> -to <fim> -c:a libmp3lame`
   e salvar como `assets/audio/<palavra>.mp3`.

Nenhuma etapa depende de serviços externos além do próprio ffmpeg.
