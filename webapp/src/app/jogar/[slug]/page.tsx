export default async function JogarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <div className="build-note">
        🚧 Página de jogar — placeholder. Esta é a parte mais importante
        para resolver o vazamento de link: quando estiver pronta de
        verdade, esta página vai rodar no servidor e checar, antes de
        mostrar qualquer coisa: (1) você está logado? (2) você já
        desbloqueou este jogo, ou tem créditos para desbloquear agora? Só
        depois disso o jogo aparece. Ninguém vai conseguir copiar este
        link e mandar para outra pessoa jogar de graça.
      </div>

      <h1 className="page-title">Jogo: {slug}</h1>
      <p className="page-lede">
        Aqui vai aparecer o jogo de verdade, só depois que a verificação de
        login e créditos estiver conectada.
      </p>

      <div className="card">
        <p>🔒 (espaço reservado para o jogo, protegido por sessão)</p>
      </div>
    </div>
  );
}
