# 🐝 Spelling Bee

Jogo de ortografia (spelling bee) em inglês: a criança ouve a palavra/frase
(áudio real gerado com ElevenLabs). Tem 3 modos, escolhidos na tela inicial:
"Phase 1" e "Phase 2" (digitar a palavra ouvida) e "Challenge" (Letter
Scramble — clicar nas letras embaralhadas, na ordem certa, sem digitar
nada). A ordem dos itens é embaralhada a cada partida, dentro do modo
escolhido.

Sem backend, sem login, sem build step — arquivos estáticos que funcionam
em qualquer navegador, prontos para GitHub Pages.

## 📁 Estrutura

```
index.html          → estrutura do jogo (início, jogo, resultado)
css/style.css        → visual (tema abelha/colmeia)
js/game-data.js       → a lista de vocabulário (EDITAR AQUI)
js/game.js            → motor do jogo (lógica, pontuação, áudio)
assets/audio/         → um arquivo .mp3 por item do vocabulário
assets/img/            → mascote Buzzy (bee-mascot.png)
```

## ✏️ Editando o vocabulário

Todo o vocabulário está em `js/game-data.js`, no array `SPELLING_PHASES`
(uma entrada por fase, cada uma com seu próprio array `words`):

```js
const SPELLING_PHASES = [
  {
    name: "Phase 1",
    words: [
      { word: "apple", audio: "apple.mp3", hintEN: "A round fruit that grows on trees.", properWords: [] },
      // ...
    ]
  },
  { name: "Phase 2", words: [ /* ... */ ] },
];
```

- `word`: a grafia correta em inglês (pode ser uma palavra ou uma frase).
- `audio`: nome do arquivo dentro de `assets/audio/`. Se o arquivo não
  existir/falhar ao carregar, o jogo cai automaticamente para a voz
  sintetizada do navegador (`speechSynthesis`) como reserva.
- `hintEN`: dica em inglês (nunca revela a resposta), mostrada só depois da
  criança errar a primeira tentativa daquele item.
- `properWords`: lista dos tokens de `word` (com a grafia exata, incluindo
  maiúscula) que são nomes próprios — só esses exigem maiúscula correta.
  Todo o resto da palavra/frase é comparado sem diferenciar maiúsculas de
  minúsculas. Ex.: em `"I'm from Brazil."`, `properWords: ["Brazil"]` faz
  "i'm from brazil" ser aceito exceto pelo "brazil", que precisa virar
  "Brazil".

Basta editar o arquivo (e adicionar/trocar o `.mp3` correspondente em
`assets/audio/`) e recarregar a página — nada mais precisa mudar. Para
adicionar uma quarta fase no modo "digitar", acrescente outro objeto
`{ name, words }` ao array `SPELLING_PHASES` e um botão correspondente na
tela inicial (`index.html`).

O modo "Challenge" usa um array separado, `CHALLENGE_WORDS` (mesmo formato,
sem `properWords`), logo abaixo no mesmo arquivo. Só funciona bem com
**palavras de uma única peça, sem espaço nem apóstrofo** (a criança clica
letra por letra) — por isso reúne só os itens desse tipo das duas fases,
não frases inteiras.

## 🎮 Como funciona

### Phase 1 / Phase 2 (digitar)

1. Na tela inicial, a criança escolhe "Phase 1" ou "Phase 2".
2. Clica em "Listen" (ou o áudio já é tocado automaticamente ao carregar)
   para ouvir a palavra/frase.
3. Digita em inglês e clica em "Check" (ou aperta Enter).
4. Se errar, a(s) palavra(s) errada(s) da própria resposta aparece(m) em
   vermelho (maiúscula/minúscula só conta para nomes próprios), e uma dica
   em inglês aparece embaixo — sem revelar a resposta.
5. Acerto: toca um som de sucesso, uma explosão de abelhinhas 🐝 voa pela
   tela (efeito confete), +10 pontos (5 se acertou depois de errar antes) e
   avança para o próximo item. Erro: pode tentar de novo, sem limite de
   tentativas.
6. "Skip" revela a resposta correta e marca para revisão no final.

### Challenge (Letter Scramble)

1. Na tela inicial, a criança escolhe "Challenge".
2. Ouve a palavra e vê suas letras embaralhadas como botões, com espaços
   vazios acima mostrando o tamanho da palavra — nada de digitar.
3. Clica nas letras na ordem certa para preenchê-los; clicar em uma letra
   já colocada devolve ela para a fileira de baixo, caso erre.
4. Ao preencher todos os espaços: se estiver certo, mesmo efeito de acerto
   (som + confete de abelhas + pontos). Se estiver errado, mostra uma dica
   em inglês (na primeira vez) e as letras voltam sozinhas para tentar de
   novo. "Skip" revela a palavra e marca para revisão.

### Final

Ao final de qualquer modo, mostra pontuação, acertos e a lista de itens
para revisar. "Play again" repete o mesmo modo, embaralhado de novo.

## 🔊 Áudio

Cada item toca o `.mp3` correspondente em `assets/audio/`. Esses arquivos
atuais foram extraídos automaticamente de um único áudio gerado no
ElevenLabs (cortado por detecção de silêncio entre as palavras, na mesma
ordem em que os itens aparecem em `SPELLING_PHASES`, fase por fase). Se
algum arquivo faltar ou não carregar, o jogo usa `window.speechSynthesis`
(voz do navegador, `lang = 'en-US'`) como reserva — por isso os botões
"Listen"/"Phase 1"/"Phase 2" sempre acionam o áudio dentro de um gesto do
usuário (clique), necessário em navegadores mobile.

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
