import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default async function JogarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Nav />

      <section className="section">
        <div className="wrap">
          <div className="prototype-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v5M12 16h.01" />
            </svg>
            <span>
              Protótipo — esta é a página mais importante para resolver o
              vazamento de link: quando estiver pronta de verdade, ela vai
              rodar no servidor e checar, antes de mostrar qualquer coisa: (1)
              você está logado? (2) este jogo é gratuito, ou você já
              desbloqueou ele, ou tem créditos para desbloquear agora? Só
              depois disso o jogo aparece. Ninguém vai conseguir copiar este
              link e mandar para outra pessoa jogar de graça — exceto nos
              jogos marcados como gratuitos, que ficam abertos de propósito
              para quem quiser testar antes de comprar.
            </span>
          </div>

          <h1 style={{ marginBottom: 12 }}>Jogo: {slug}</h1>
          <p className="lede" style={{ marginBottom: 16 }}>
            Aqui vai aparecer o jogo de verdade, só depois que a verificação
            de login e créditos estiver conectada.
          </p>

          <div className="callout" style={{ padding: 40, textAlign: "center" }}>
            <p style={{ margin: 0 }}>🔒 (espaço reservado para o jogo, protegido por sessão)</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
