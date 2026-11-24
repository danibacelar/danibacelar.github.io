# 🐝 Spelling Bee - Week 7

Jogo de ortografia (spelling bee) em inglês: a criança ouve a frase
(áudio real gerado com ElevenLabs) e digita o que ouviu.

> ⚠️ **Estado atual (temporário):** "Practice", "Phase 1" e "Phase 2"
> foram **removidos da tela inicial** porque o áudio de palavra única
> (um único arquivo cortado por detecção de silêncio) saiu bagunçado —
> a maioria das 40 palavras tocava o áudio de uma palavra vizinha
> errada, não a palavra certa. Só o "Sentence Buzz" ficou — ele usa um
> áudio separado (10 frases) que a professora já confirmou estar 100%
> correto. A professora vai enviar um arquivo de áudio por palavra
> (não mais um único áudio longo para cortar), o que elimina esse tipo
> de erro. Quando os áudios chegarem, Phase 1/2 e Practice voltam — ver
> seção "Reativando Phase 1/2 e Practice" abaixo. Os dados de
> vocabulário (`SPELLING_PHASES`/`CHALLENGE_WORDS` em `js/game-data.js`)
> continuam no arquivo, só não são mais usados por nenhum botão.

Vocabulário desta lista: 40 palavras terminadas em "-ity"/"-ty"
(formality, originality, nationality, rationality, causality,
personality, fatality, mentality, morality, punctuality, individuality,
hospitality, vitality, quality, actuality, inequalities, probability,
ability, reliability, capability, credibility, eligibility, possibility,
plausibility, responsibilities, extremity, facility, humanity,
inhumanity, utilities, entre outras formas -s/-ies dessas mesmas
palavras).

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

Mesmo formato das semanas anteriores: `js/game-data.js` tem
`SPELLING_PHASES` (Phase 1/2), `CHALLENGE_WORDS` (Practice) e `SENTENCES`
(Sentence Buzz). Veja o README da Week 6 para a explicação completa dos
campos `word`/`audio`/`hintEN`/`properWords`.

## 🎮 Como funciona

Igual à Week 6 no mecanismo de digitar (mesmo sistema de pontos, confete,
som, "_" sinalizando letra faltando, botão "Menu" nos resultados) — veja
o README da Week 6 para o passo a passo completo. Por enquanto só o
"Sentence Buzz" está ativo (ver aviso no topo deste README).

### Vírgulas não contam no "Sentence Buzz"

Diferente da Week 6 (cujas frases não tinham vírgulas), as frases desta
semana têm vírgulas internas (ex: "Her personality, originality, and
individuality impressed everyone."). A professora pediu para considerar
certo mesmo se a criança não colocar a vírgula no lugar certo — afinal o
objetivo aqui é ortografia, não pontuação. Por isso, `js/game.js` agora
remove toda vírgula de cada palavra digitada E de cada palavra da
resposta certa antes de comparar (função `tokenize()`), então a vírgula
nunca é considerada "letra errada", esteja ela no lugar certo, em outro
lugar, ou ausente. Essa mudança só afeta o `game.js` desta semana —
outras semanas não têm vírgulas nas frases, então não precisaram da
mesma alteração.

## 🔊 Áudio

Mesmo processo das semanas anteriores: um áudio único com as 40 palavras
(cortado por detecção de silêncio) e um segundo áudio único com as 10
frases (cortado do mesmo jeito, com `d=0.3` por serem mais longas). A
professora pediu para separar as frases exatamente nas pausas marcadas
com "..." no texto que ela enviou — foi exatamente isso que a detecção de
silêncio encontrou no áudio (10 trechos, cada um com duração proporcional
ao número de palavras da frase).

A única exceção é `assets/audio/words/responsibilities.mp3`: essa palavra
não saiu no áudio único original (confirmado pela duração das outras 39
palavras, que se encaixaram perfeitamente sem nenhum trecho "longo
demais" sobrando) — a professora gravou e enviou essa palavra separada
depois, e o arquivo foi cortado da mesma forma (detecção de silêncio +
padding) a partir desse áudio extra.

O áudio das **frases** (Sentence Buzz) está correto e não precisa
mudar. Já o áudio das **palavras** (usado por Phase 1/2 e Practice) saiu
bagunçado — não foi um simples "uma palavra atrasada": o deslocamento
muda de direção em pontos diferentes da lista (às vezes a palavra toca a
próxima, às vezes a anterior), o que indica mais de uma gravação extra ou
faltante dentro do áudio original. Tentamos corrigir reatribuindo cada
palavra ao arquivo certo (sem precisar re-cortar nada), e conseguimos
confirmar 36 das 40 — mas 4 (credibility, possibility, eligibility,
responsibilities) ficaram com dados conflitantes mesmo depois da
professora ouvir de novo. Decidimos remover Phase 1/2 e Practice do jogo
e pedir áudio em arquivos separados por palavra, em vez de cortar de um
áudio único.

## 🔁 Reativando Phase 1/2 e Practice

Quando a professora enviar os 40 áudios (um arquivo `.mp3` por palavra,
nomeado exatamente como a palavra — ex: `formality.mp3`,
`nationality.mp3` — sem precisar de corte/detecção de silêncio, já que
cada arquivo é uma única palavra):

1. Salvar cada arquivo em `assets/audio/words/<palavra>.mp3`.
2. Em `index.html`, devolver os três botões removidos da tela inicial
   (`btn-challenge` "Practice 🧩", `btn-phase-1` "Phase 1 🍯", `btn-phase-2`
   "Phase 2 🍯") e a seção `<section id="screen-challenge">` (Letter
   Scramble) — dá pra copiar de `games/spelling-bee-week6/index.html`,
   que tem a mesma estrutura.
3. Em `js/game.js`, devolver `challenge: document.getElementById('screen-challenge')`
   em `screens`, e as funções/handlers removidos nesta limpeza (`startGame`,
   `startChallenge`, `renderScrambleTiles`, `renderScrambleSlots`,
   `handleTileClick`, `handleSlotClick`, `checkChallengeAnswer`,
   `skipChallengeWord`, `loadChallengeWord`, e os listeners de
   `btn-phase-1`/`btn-phase-2`/`btn-challenge`/`btn-challenge-skip`/
   `btn-challenge-next`/`btn-challenge-listen`) — também dá pra copiar de
   `games/spelling-bee-week6/js/game.js` (mesma versão da engine, sem o
   ajuste de vírgulas do Sentence Buzz, que é só desta semana).
4. `js/game-data.js` não precisa mudar — `SPELLING_PHASES` e
   `CHALLENGE_WORDS` já estão lá, só esperando os botões voltarem.
