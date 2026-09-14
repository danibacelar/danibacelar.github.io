import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function SobrePage() {
  return (
    <>
      <Nav active="/sobre" />

      <header className="hero wrap" style={{ alignItems: "start" }}>
        <div>
          <p className="hero-eyebrow">Sobre</p>
          <h1 style={{ fontSize: "clamp(1.9rem,3.4vw,2.7rem)" }}>
            A educadora por trás dos jogos.
          </h1>
          <div className="about-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/about/mrsdani.jpg" alt="Foto de Mrs. Dani" />
          </div>
        </div>
        <div>
          <p className="lede">
            Sou formada em Pedagogia pela Unicamp, em Letras Português/Inglês
            pela Unip, e tenho pós-graduação em Metodologia do Ensino de
            Língua Inglesa.
          </p>
          <p>
            Atuo com o ensino de inglês desde 2013, tendo passado por escolas
            renomadas como o Colégio Notre Dame de Campinas, onde estive por
            mais de 10 anos, e o Colégio Progresso, por 2 anos. Desde 2023 me
            dedico às aulas particulares online para adultos e crianças, e
            com os pequenos venho me especializando em reforço escolar.
          </p>
          <p>
            Apaixonada por tecnologia, criei este site com jogos para que
            meus alunos possam reforçar o conteúdo das aulas de um jeito
            divertido e envolvente. Cada jogo nasce de uma dificuldade real
            que vi em sala de aula — não de uma lista genérica de
            vocabulário.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <div className="callout">
            <p style={{ margin: 0 }}>
              Antes de virarem jogos, essas atividades foram aulas de reforço
              escolar de inglês — um serviço que Mrs. Dani ainda oferece.{" "}
              <a href="/school-support" className="link-inline">
                Conheça o School Support
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer extraLink={{ href: "/jogos", label: "Ver todos os jogos →" }} />
    </>
  );
}
