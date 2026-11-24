# 🐝 Spelling Bee - Week 7

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra
(áudio real gerado com ElevenLabs). Tem 4 modos, escolhidos na tela
inicial: "Practice" (Letter Scramble), "Phase 1"/"Phase 2" (digitar a
palavra ouvida), e "Sentence Buzz" (digitar a frase inteira ouvida,
usando as palavras da semana em contexto). A ordem dos itens é
embaralhada a cada partida, dentro do modo escolhido.

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

### "responsibilities" ainda não tem áudio próprio

No arquivo único de palavras que a professora enviou, a palavra
"responsibilities" não foi gravada (confirmamos pela duração dos outros
39 trechos — todos se encaixam perfeitamente nas 39 palavras restantes
na ordem certa, sem nenhum trecho "longo demais" sobrando que indicasse
duas palavras coladas). Por isso, em `js/game-data.js`, o item
`responsibilities` tem `audio: null` — o jogo já cai automaticamente para
a voz sintetizada do navegador (`speechSynthesis`) **só nesse item**,
igual ao comportamento de reserva que todo o jogo já tinha para qualquer
áudio que falhar ao carregar.

Quando a professora enviar um áudio só dessa palavra, basta: cortar/gerar
o arquivo `assets/audio/words/responsibilities.mp3` e mudar a linha no
`js/game-data.js` (duas ocorrências: em `SPELLING_PHASES` e em
`CHALLENGE_WORDS`) de `audio: null` para
`audio: "words/responsibilities.mp3"`.

## 🎮 Como funciona

Igual à Week 6 (Phase 1/Phase 2/Sentence Buzz digitando, Practice com
letras embaralhadas, mesmo sistema de pontos, confete, som, "_"
sinalizando letra faltando, botão "Menu" nos resultados) — veja o README
da Week 6 para o passo a passo completo.

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
