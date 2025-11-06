import React, { useEffect } from 'react';
import '../styles/PrivacyPage.css'; // Importar o novo CSS

const PrivacyPage = () => {
  useEffect(() => {
    // Garante que a página abre no topo
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page-container">
      <div className="privacy-header">
        <h1>Política de Privacidade</h1>
        <p className="last-updated">Última atualização: 05 de novembro de 2025</p>
      </div>

      <div className="privacy-content">

        <section>
          <h2>1. Introdução</h2>
          <p>
            Bem-vindo ao website do Casttêdo Valley. A sua privacidade é de extrema importância para nós. Esta Política de Privacidade descreve como recolhemos, utilizamos, partilhamos e protegemos as informações pessoais que nos fornece através do nosso website (casttedovalley.com).
          </p>
          <p>
            Ao utilizar o nosso website, concorda com a recolha e utilização de informações de acordo com esta política.
          </p>
        </section>

        <section>
          <h2>2. Responsável pelo Tratamento de Dados</h2>
          <p>
            A entidade responsável pelo tratamento dos seus dados pessoais é o Casttêdo Valley, com sede no Largo Padre António Veiga, 5070-226, Castedo, Alijó, Portugal.
          </p>
          <p>
            Para qualquer questão relacionada com a sua privacidade, pode contactar-nos através do email: <a href="mailto:casttedovalley@gmail.com">casttedovalley@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>3. Informações que Recolhemos</h2>
          <p>Podemos recolher os seguintes tipos de informações:</p>
          <ul>
            <li>
              <strong>Informações Recolhidas Automaticamente:</strong> Dados recolhidos através de cookies e tecnologias semelhantes, como o seu endereço IP, tipo de navegador, páginas visitadas no nosso site e a duração da sua visita. Estes dados são geralmente anónimos e usados para fins estatísticos.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Como Utilizamos as Suas Informações</h2>
          <p>Os dados recolhidos são utilizados para as seguintes finalidades:</p>
          <ul>
            <li>Para responder às suas questões e pedidos de contacto.</li>
            <li>Para melhorar o nosso website, produtos e serviços.</li>
            <li>Para fins de análise e estatística, de forma a entender como os visitantes interagem com o nosso site.</li>
            <li>Para cumprir obrigações legais.</li>
          </ul>
        </section>

        <section>
          <h2>5. Partilha de Informações</h2>
          <p>
            O Casttêdo Valley não vende, aluga ou partilha as suas informações pessoais com terceiros para fins de marketing sem o seu consentimento explícito.
          </p>
          <p>
            Poderemos partilhar os seus dados com:
          </p>
          <ul>
            <li>
              <strong>Prestadores de Serviços:</strong> Entidades terceiras que nos auxiliam na operação do website (ex: serviços de alojamento web, ferramentas de análise). Estes prestadores têm acesso limitado aos seus dados e estão contratualmente obrigados a protegê-los.
            </li>
            <li>
              <strong>Autoridades Legais:</strong> Se formos obrigados por lei ou por ordem judicial a divulgar as suas informações.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Os Seus Direitos (RGPD)</h2>
          <p>
            De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de:
          </p>
          <ul>
            <li><strong>Acesso:</strong> Solicitar o acesso às informações pessoais que temos sobre si.</li>
            <li><strong>Retificação:</strong> Solicitar a correção de dados incorretos ou incompletos.</li>
            <li><strong>Remoção (Direito a ser esquecido):</strong> Solicitar a eliminação dos seus dados pessoais.</li>
            <li><strong>Limitação do Tratamento:</strong> Solicitar a limitação da forma como processamos os seus dados.</li>
            <li><strong>Portabilidade:</strong> Receber os seus dados num formato estruturado e de uso corrente.</li>
            <li><strong>Oposição:</strong> Opor-se ao processamento dos seus dados para fins de marketing direto.</li>
          </ul>
          <p>
            Para exercer estes direitos, por favor contacte-nos através do email: <a href="mailto:casttedovalley@gmail.com">casttedovalley@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            O nosso website utiliza cookies para melhorar a sua experiência de navegação. Cookies são pequenos ficheiros de texto armazenados no seu dispositivo que nos ajudam a lembrar as suas preferências e a recolher dados estatísticos. Pode gerir ou desativar os cookies através das definições do seu navegador.
          </p>
        </section>

        <section>
          <h2>8. Segurança dos Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger as suas informações pessoais contra perda, uso indevido, acesso não autorizado ou divulgação.
          </p>
        </section>

        <section>
          <h2>9. Alterações a esta Política</h2>
          <p>
            Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a indicação da data da "Última atualização". Recomendamos que reveja esta política regularmente.
          </p>
        </section>

        <section>
          <h2>10. Contacto</h2>
          <p>
            Se tiver alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, por favor contacte-nos:
          </p>
          <p>
            <strong>Casttêdo Valley</strong><br />
            Email: <a href="mailto:casttedovalley@gmail.com">casttedovalley@gmail.com</a><br />
            Telefone: <a href="tel:+351933305966">+351 933 305 966</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;