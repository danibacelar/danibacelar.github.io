# 🐝 Spelling Bee - Week 7

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra
ou frase (áudio real gerado com ElevenLabs) e digita o que ouviu. Tem 4
modos, escolhidos na tela inicial: "Practice" (Letter Scramble), "Phase
1"/"Phase 2" (digitar a palavra ouvida) e "Sentence Buzz" (digitar a
frase inteira ouvida).

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

As **frases** (Sentence Buzz) vieram de um único áudio com as 10 frases,
cortado por detecção de silêncio (`d=0.3`, pausas marcadas com "..." no
texto original) — igual ao processo das semanas anteriores.

As **palavras** (Phase 1/2 e Practice) tiveram uma história mais longa:
a primeira tentativa foi cortar um único áudio com as 40 palavras por
detecção de silêncio, mas o resultado saiu bagunçado — o deslocamento
mudava de direção em pontos diferentes da lista (às vezes a palavra
tocava a próxima, às vezes a anterior), indicando mais de uma gravação
extra ou faltante dentro daquele áudio único. Depois de duas rodadas de
verificação (usando uma caixa de debug temporária que mostrava a
resposta esperada, para a professora comparar com o que ouvia), ainda
sobravam 4 palavras com dados conflitantes. A solução final foi a
professora gravar **um arquivo `.mp3` separado por palavra**, nomeado
exatamente como a palavra (ex: `formality.mp3`), eliminando a
necessidade de cortar/adivinhar qualquer posição — cada arquivo já diz
o que é pelo próprio nome. Com isso, `assets/audio/words/` tem hoje 40
arquivos, cada um a gravação individual da sua própria palavra, e
`js/game-data.js` aponta cada palavra para o arquivo com esse mesmo
nome (sem reaproveitar nada do corte anterior).
