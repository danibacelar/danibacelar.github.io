import Nav from "../components/Nav";
import Footer from "../components/Footer";
import VoltarInicio from "../components/VoltarInicio";

export default function TermosPage() {
  return (
    <>
      <Nav active="/termos" />
      <VoltarInicio />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <p className="eyebrow">Termos de uso</p>
          <h1 style={{ marginBottom: 8 }}>Termos de Uso — Mrs. Dani</h1>
          <p className="lede" style={{ marginBottom: 32 }}>
            Última atualização: novembro de 2026.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>1. Sobre este site</h2>
              <p>
                Este site é operado por Mrs. Dani (Daniela Costa), CNPJ [preencher
                com o CNPJ do seu MEI], e oferece jogos educativos de inglês para
                crianças e adolescentes, voltados a reforçar conteúdos ensinados
                na escola. Ao criar uma conta, você concorda com estes termos.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                2. Contas de responsável e perfis de filhos
              </h2>
              <p>
                A conta é criada pelo responsável legal (pai, mãe ou tutor) de
                cada criança, usando um e-mail e senha próprios. Os perfis de
                filhos cadastrados dentro dessa conta não têm login ou senha
                separados — são apenas um nome e, opcionalmente, o ano escolar,
                usados para organizar quais atividades cada criança já tem
                liberadas.
              </p>
              <p>
                O responsável é o único autorizado a criar, editar ou remover
                perfis de filhos, e é quem autoriza as compras feitas na conta.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                3. Acesso aos jogos e validade
              </h2>
              <p>
                Cada jogo comprado (por crédito ou avulso) fica liberado por{" "}
                <strong>30 dias corridos</strong> a partir da confirmação do
                pagamento, para o perfil de filho selecionado, podendo ser
                jogado quantas vezes quiser nesse período. Depois de 30 dias, o
                acesso expira automaticamente e é necessário comprar novamente
                para continuar jogando.
              </p>
              <p>
                O acesso aos jogos é pessoal e intransferível. Compartilhar a
                conta ou repassar links de acesso a terceiros não autorizados é
                proibido. Por segurança, cada conta de responsável só pode estar
                ativa em um aparelho por vez — entrar em um novo aparelho
                desconecta automaticamente o anterior.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>4. Pagamento</h2>
              <p>
                Os pagamentos são processados exclusivamente via Pix, através do
                Mercado Pago, não sendo aceito pagamento por cartão de crédito.
                Os preços de cada jogo, pacote de créditos e compra avulsa são
                exibidos claramente antes da confirmação da compra. O Mercado
                Pago é responsável pelo processamento seguro do pagamento; este
                site não armazena dados de cartão ou chave Pix.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                5. Reembolso e cancelamento
              </h2>
              <p>
                Por se tratar de conteúdo digital liberado imediatamente após a
                confirmação do pagamento, pedidos de reembolso serão avaliados
                caso a caso. Reembolsos não serão concedidos para jogos já
                acessados pelo perfil do filho, exceto em caso de erro técnico
                comprovado (por exemplo, cobrança duplicada ou jogo que não
                carrega corretamente).
              </p>
              <p>
                Quando um reembolso é aprovado, o acesso ao jogo ou os créditos
                correspondentes são removidos da conta imediatamente.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                6. Privacidade e dados pessoais
              </h2>
              <p>
                Coletamos apenas os dados necessários para o funcionamento do
                serviço: e-mail e senha do responsável, nome e (opcionalmente)
                ano escolar das crianças cadastradas, e o histórico de compras
                feitas na conta. Esses dados são usados exclusivamente para
                autenticação, liberação dos jogos comprados e suporte, e não são
                vendidos ou compartilhados com terceiros para fins de
                publicidade.
              </p>
              <p>
                Por lidar com dados de crianças, seguimos os princípios da Lei
                Geral de Proteção de Dados (LGPD), especialmente quanto à coleta
                mínima de dados e ao uso restrito à finalidade do serviço — o
                cadastro de um filho é feito e controlado integralmente pelo
                responsável legal, nunca diretamente pela criança.
              </p>
              <p>
                Para solicitar a exclusão de dados de sua conta ou de um filho
                cadastrado, entre em contato pelo e-mail [preencher e-mail de
                contato/suporte].
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>
                7. Alterações nestes termos
              </h2>
              <p>
                Estes termos podem ser atualizados periodicamente para refletir
                mudanças no serviço ou na legislação. A data da última
                atualização é sempre indicada no topo desta página.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: "1.3rem", marginBottom: 10 }}>8. Contato</h2>
              <p>
                Dúvidas sobre estes termos podem ser enviadas para [preencher
                e-mail de contato/suporte].
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
