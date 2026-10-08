import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../i18n';
import { LEGAL, COMPLAINTS_BOOK_URL, RAL } from '../legal';

const EMAIL = 'casttedovalley@gmail.com';
const EmailLink = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);

const CnpdLink = () => (
  <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>
);

const Contact = () => (
  <address className="pp-contact">
    <span className="pp-contact__name">Casttêdo Valley</span>
    <span>{LEGAL.name} · NIF {LEGAL.nif}</span>
    <span>Largo Padre António Veiga, 5070-226 Castedo, Alijó</span>
    <EmailLink />
    <a href="tel:+351933305966">+351 933 305 966</a>
  </address>
);

const TEXT = {
  pt: {
    eyebrow: 'Informação Legal',
    title: 'Política de Privacidade',
    lead: 'Um website sem cookies, sem formulários e com estatísticas anónimas. Explicamos aqui que dados são tratados e quais são os seus direitos.',
    updated: 'Última atualização · 8 de outubro de 2026',
    toc: 'Índice',

    // Resumo apresentado no topo da página
    summary: [
      ['Sem cookies', 'O website não guarda cookies no seu dispositivo.'],
      ['Estatísticas anónimas', 'Contamos visitas sem identificar quem nos visita.'],
      ['Sem formulários', 'Só tratamos os dados que nos enviar por email ou telefone.'],
      ['Os seus direitos', 'Pode aceder, corrigir ou apagar os seus dados a qualquer momento.'],
    ],

    // Cada secção gera também uma entrada no índice
    sections: [
      {
        id: 'introducao',
        title: 'Introdução',
        body: (
          <>
            <p>
              Bem-vindo ao website do Casttêdo Valley. A sua privacidade é de extrema importância para nós. Esta Política de Privacidade explica que dados são tratados quando visita o nosso website (casttedovalley.com) ou quando nos contacta, para que finalidades e quais os seus direitos.
            </p>
            <p>
              O nosso website é informativo: não tem formulários, não requer registo e não utiliza cookies.
            </p>
          </>
        ),
      },
      {
        id: 'responsavel',
        title: 'Responsável pelo Tratamento',
        body: (
          <>
            <p>
              A responsável pelo tratamento dos seus dados pessoais é {LEGAL.name}, empresária em nome individual, NIF {LEGAL.nif}, que explora a marca Casttêdo Valley, com domicílio profissional no Largo Padre António Veiga, 5070-226, Castedo, Alijó, Portugal.
            </p>
            <p>
              Para qualquer questão relacionada com a sua privacidade, pode contactar-nos através do email <EmailLink />.
            </p>
          </>
        ),
      },
      {
        id: 'informacoes',
        title: 'Informações que Recolhemos',
        body: (
          <dl className="pp-defs">
            <div>
              <dt>Estatísticas de utilização</dt>
              <dd>
                Utilizamos o Umami, uma ferramenta de análise que não usa cookies nem identifica visitantes individualmente, para recolher dados agregados e anónimos sobre a utilização do site: páginas visitadas, origem da visita (por exemplo, um motor de busca ou rede social), país, tipo de dispositivo e navegador, interações como o descarregamento de fichas técnicas e eventuais erros técnicos do site (a mensagem de erro e a página onde ocorreu). O endereço IP não é armazenado.
              </dd>
            </div>
            <div>
              <dt>Dados técnicos de acesso</dt>
              <dd>
                Como em qualquer website, o seu navegador comunica o seu endereço IP e dados técnicos (tipo de navegador, página pedida) aos servidores que entregam o site. Estes dados são tratados pelos nossos prestadores de serviços, conforme descrito na secção 6, e não são utilizados por nós para o identificar.
              </dd>
            </div>
            <div>
              <dt>Dados que nos envia ao contactar-nos</dt>
              <dd>
                Se nos contactar por email ou telefone (por exemplo, para reservar uma visita ou prova de vinhos), tratamos os dados que nos fornecer, como o seu nome, email, número de telefone e o conteúdo do pedido.
              </dd>
            </div>
          </dl>
        ),
      },
      {
        id: 'finalidades',
        title: 'Finalidades e Fundamentos Legais',
        body: (
          <dl className="pp-defs">
            <div>
              <dt>Responder aos seus contactos e gerir reservas de visitas e provas</dt>
              <dd>Com base nas diligências pré-contratuais ou no contrato que nos solicita.</dd>
            </div>
            <div>
              <dt>Compreender como o website é utilizado e melhorá-lo</dt>
              <dd>Com base no nosso interesse legítimo, utilizando apenas dados agregados e anónimos.</dd>
            </div>
            <div>
              <dt>Garantir o funcionamento e a segurança do website</dt>
              <dd>Com base no nosso interesse legítimo.</dd>
            </div>
            <div>
              <dt>Cumprir obrigações legais</dt>
              <dd>Quando a lei assim o exija.</dd>
            </div>
          </dl>
        ),
      },
      {
        id: 'conservacao',
        title: 'Conservação dos Dados',
        body: (
          <p>
            Os dados que nos envia ao contactar-nos são conservados apenas pelo tempo necessário para responder ao seu pedido ou gerir a sua reserva, ou pelo período exigido por lei. As estatísticas de utilização são anónimas e agregadas, não permitindo identificar qualquer visitante.
          </p>
        ),
      },
      {
        id: 'partilha',
        title: 'Partilha de Informações',
        body: (
          <>
            <p>
              O Casttêdo Valley não vende, aluga nem partilha as suas informações pessoais com terceiros para fins de marketing. Para o funcionamento do website, recorremos aos seguintes prestadores de serviços:
            </p>
            <dl className="pp-defs">
              <div>
                <dt>Cloudflare · alojamento do website</dt>
                <dd>Entrega as páginas a partir do servidor mais próximo de si e trata o endereço IP dos visitantes para o funcionamento e a segurança do serviço, por exemplo na proteção contra ataques.</dd>
              </div>
              <div>
                <dt>Umami · estatísticas de utilização</dt>
                <dd>Recebe os dados descritos na secção 3, sem cookies e sem armazenar o endereço IP.</dd>
              </div>
              <div>
                <dt>Google · Gmail</dt>
                <dd>Serviço de email através do qual recebemos e respondemos às suas mensagens.</dd>
              </div>
            </dl>
            <p>
              Alguns destes prestadores estão sediados nos Estados Unidos. Nesses casos, a transferência de dados é feita ao abrigo dos mecanismos previstos no RGPD, como o Quadro de Privacidade de Dados UE-EUA ou cláusulas contratuais-tipo.
            </p>
            <p>
              Poderemos ainda divulgar informações às autoridades competentes se formos obrigados por lei ou por ordem judicial.
            </p>
          </>
        ),
      },
      {
        id: 'ligacoes',
        title: 'Ligações para Outros Websites',
        body: (
          <p>
            O nosso website contém ligações para o Facebook, o Instagram e o Google Maps. Ao segui-las, passa a estar sujeito às políticas de privacidade desses serviços, pelas quais não somos responsáveis.
          </p>
        ),
      },
      {
        id: 'direitos',
        title: 'Os Seus Direitos',
        body: (
          <>
            <p>De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de:</p>
            <dl className="pp-defs pp-defs--grid">
              <div><dt>Acesso</dt><dd>Solicitar o acesso às informações pessoais que temos sobre si.</dd></div>
              <div><dt>Retificação</dt><dd>Solicitar a correção de dados incorretos ou incompletos.</dd></div>
              <div><dt>Apagamento</dt><dd>Solicitar a eliminação dos seus dados pessoais.</dd></div>
              <div><dt>Limitação</dt><dd>Solicitar a limitação da forma como tratamos os seus dados.</dd></div>
              <div><dt>Portabilidade</dt><dd>Receber os seus dados num formato estruturado e de uso corrente.</dd></div>
              <div><dt>Oposição</dt><dd>Opor-se ao tratamento dos seus dados baseado no nosso interesse legítimo.</dd></div>
            </dl>
            <p>
              Para exercer estes direitos, contacte-nos através do email <EmailLink />.
            </p>
            <p>
              Tem também o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), através de <CnpdLink />.
            </p>
          </>
        ),
      },
      {
        id: 'cookies',
        title: 'Cookies',
        body: (
          <>
            <p>
              O nosso website não utiliza cookies, nem para estatísticas nem para publicidade. Por esse motivo, não lhe é apresentado nenhum aviso de consentimento de cookies.
            </p>
            <p>
              Quando escolhe o idioma do website (português ou inglês), ou fecha o aviso que sugere a versão em inglês, essa escolha fica guardada apenas no armazenamento local do seu navegador, para que o site abra no mesmo idioma e o aviso não volte a aparecer na próxima visita. Esta informação não sai do seu dispositivo, não o identifica e pode ser apagada a qualquer momento nas definições do navegador.
            </p>
          </>
        ),
      },
      {
        id: 'seguranca',
        title: 'Segurança dos Dados',
        body: (
          <p>
            Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger as suas informações pessoais contra perda, uso indevido, acesso não autorizado ou divulgação.
          </p>
        ),
      },
      {
        id: 'alteracoes',
        title: 'Alterações a esta Política',
        body: (
          <p>
            Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página com a indicação da data da última atualização. Recomendamos que reveja esta política regularmente.
          </p>
        ),
      },
      {
        id: 'informacao-legal',
        title: 'Informação Legal',
        body: (
          <>
            <p>
              O website casttedovalley.com e a marca Casttêdo Valley são explorados por {LEGAL.name}, empresária em nome individual, NIF {LEGAL.nif}, com domicílio profissional no {LEGAL.address}.
            </p>
            <p>
              <strong>Livro de Reclamações.</strong> Pode apresentar uma reclamação no Livro de Reclamações Eletrónico, em <ExternalLink href={COMPLAINTS_BOOK_URL}>www.livroreclamacoes.pt</ExternalLink>, ou no livro de reclamações em papel disponível na adega.
            </p>
            <p>
              <strong>Resolução alternativa de litígios.</strong> Em caso de litígio, o consumidor pode recorrer a uma entidade de Resolução Alternativa de Litígios de consumo: <ExternalLink href={RAL.entityUrl}>{RAL.entity}</ExternalLink>. Mais informações no Portal do Consumidor, em <ExternalLink href={RAL.portalUrl}>www.consumidor.gov.pt</ExternalLink>.
            </p>
          </>
        ),
      },
      {
        id: 'contacto',
        title: 'Contacto',
        body: (
          <>
            <p>
              Se tiver alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, contacte-nos:
            </p>
            <Contact />
          </>
        ),
      },
    ],
  },

  en: {
    eyebrow: 'Legal Information',
    title: 'Privacy Policy',
    lead: 'A website with no cookies, no forms and anonymous statistics. Here we explain what data is processed and what your rights are.',
    updated: 'Last updated · 8 October 2026',
    toc: 'Contents',

    summary: [
      ['No cookies', 'This website does not store cookies on your device.'],
      ['Anonymous statistics', 'We count visits without identifying who you are.'],
      ['No forms', 'We only process the details you send us by email or phone.'],
      ['Your rights', 'You can access, correct or delete your data at any time.'],
    ],

    sections: [
      {
        id: 'introducao',
        title: 'Introduction',
        body: (
          <>
            <p>
              Welcome to the Casttêdo Valley website. Your privacy matters greatly to us. This Privacy Policy explains what data is processed when you visit our website (casttedovalley.com) or contact us, for what purposes, and what your rights are.
            </p>
            <p>
              Our website is purely informational: it has no forms, requires no registration and does not use cookies.
            </p>
            <p>
              This English version is provided for your convenience. In the event of any discrepancy, the Portuguese version shall prevail.
            </p>
          </>
        ),
      },
      {
        id: 'responsavel',
        title: 'Data Controller',
        body: (
          <>
            <p>
              The controller responsible for processing your personal data is {LEGAL.name}, a sole trader (tax number {LEGAL.nif}) who runs the Casttêdo Valley brand, with business address at Largo Padre António Veiga, 5070-226 Castedo, Alijó, Portugal.
            </p>
            <p>
              For any question about your privacy, please contact us at <EmailLink />.
            </p>
          </>
        ),
      },
      {
        id: 'informacoes',
        title: 'Information We Collect',
        body: (
          <dl className="pp-defs">
            <div>
              <dt>Usage statistics</dt>
              <dd>
                We use Umami, an analytics tool that does not use cookies or identify individual visitors, to collect aggregated, anonymous data on how the website is used: pages visited, where the visit came from (for example, a search engine or social network), country, device type and browser, interactions such as downloading technical sheets, and any technical errors on the site (the error message and the page where it happened). IP addresses are not stored.
              </dd>
            </div>
            <div>
              <dt>Technical access data</dt>
              <dd>
                As with any website, your browser sends your IP address and technical data (browser type, page requested) to the servers that deliver the site. This data is processed by our service providers, as described in section 6, and is not used by us to identify you.
              </dd>
            </div>
            <div>
              <dt>Data you send us when you get in touch</dt>
              <dd>
                If you contact us by email or phone (for example, to book a visit or wine tasting), we process the details you provide, such as your name, email address, phone number and the content of your request.
              </dd>
            </div>
          </dl>
        ),
      },
      {
        id: 'finalidades',
        title: 'Purposes and Legal Bases',
        body: (
          <dl className="pp-defs">
            <div>
              <dt>Replying to your enquiries and managing visit and tasting bookings</dt>
              <dd>Based on steps taken at your request prior to entering into a contract, or on the contract you request.</dd>
            </div>
            <div>
              <dt>Understanding how the website is used and improving it</dt>
              <dd>Based on our legitimate interest, using only aggregated, anonymous data.</dd>
            </div>
            <div>
              <dt>Ensuring the website works properly and securely</dt>
              <dd>Based on our legitimate interest.</dd>
            </div>
            <div>
              <dt>Complying with legal obligations</dt>
              <dd>Where required by law.</dd>
            </div>
          </dl>
        ),
      },
      {
        id: 'conservacao',
        title: 'Data Retention',
        body: (
          <p>
            The data you send us when you get in touch is kept only for as long as needed to reply to your request or manage your booking, or for the period required by law. Usage statistics are anonymous and aggregated, and cannot be used to identify any visitor.
          </p>
        ),
      },
      {
        id: 'partilha',
        title: 'Sharing of Information',
        body: (
          <>
            <p>
              Casttêdo Valley does not sell, rent or share your personal information with third parties for marketing purposes. To run the website, we use the following service providers:
            </p>
            <dl className="pp-defs">
              <div>
                <dt>Cloudflare · website hosting</dt>
                <dd>Delivers the pages from the server closest to you and processes visitors' IP addresses to run and secure the service, for example to protect against attacks.</dd>
              </div>
              <div>
                <dt>Umami · usage statistics</dt>
                <dd>Receives the data described in section 3, without cookies and without storing IP addresses.</dd>
              </div>
              <div>
                <dt>Google · Gmail</dt>
                <dd>The email service through which we receive and reply to your messages.</dd>
              </div>
            </dl>
            <p>
              Some of these providers are based in the United States. In those cases, data is transferred under the mechanisms provided for in the GDPR, such as the EU-U.S. Data Privacy Framework or standard contractual clauses.
            </p>
            <p>
              We may also disclose information to the competent authorities where required by law or by court order.
            </p>
          </>
        ),
      },
      {
        id: 'ligacoes',
        title: 'Links to Other Websites',
        body: (
          <p>
            Our website contains links to Facebook, Instagram and Google Maps. If you follow them, you become subject to the privacy policies of those services, for which we are not responsible.
          </p>
        ),
      },
      {
        id: 'direitos',
        title: 'Your Rights',
        body: (
          <>
            <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
            <dl className="pp-defs pp-defs--grid">
              <div><dt>Access</dt><dd>Request access to the personal information we hold about you.</dd></div>
              <div><dt>Rectification</dt><dd>Request the correction of inaccurate or incomplete data.</dd></div>
              <div><dt>Erasure</dt><dd>Request the deletion of your personal data.</dd></div>
              <div><dt>Restriction</dt><dd>Request that we restrict how we process your data.</dd></div>
              <div><dt>Portability</dt><dd>Receive your data in a structured, commonly used format.</dd></div>
              <div><dt>Objection</dt><dd>Object to the processing of your data based on our legitimate interest.</dd></div>
            </dl>
            <p>
              To exercise these rights, please contact us at <EmailLink />.
            </p>
            <p>
              You also have the right to lodge a complaint with the Portuguese data protection authority, the Comissão Nacional de Proteção de Dados (CNPD), at <CnpdLink />.
            </p>
          </>
        ),
      },
      {
        id: 'cookies',
        title: 'Cookies',
        body: (
          <>
            <p>
              Our website does not use cookies, whether for statistics or advertising. For this reason, you are not shown a cookie consent banner.
            </p>
            <p>
              When you choose the website's language (Portuguese or English), or close the notice suggesting the English version, that choice is saved only in your browser's local storage, so that the site opens in the same language and the notice does not reappear on your next visit. This information never leaves your device, does not identify you and can be deleted at any time in your browser settings.
            </p>
          </>
        ),
      },
      {
        id: 'seguranca',
        title: 'Data Security',
        body: (
          <p>
            We implement appropriate technical and organisational security measures to protect your personal information against loss, misuse, unauthorised access or disclosure.
          </p>
        ),
      },
      {
        id: 'alteracoes',
        title: 'Changes to this Policy',
        body: (
          <p>
            We reserve the right to update this Privacy Policy from time to time. Any changes will be published on this page together with the date of the latest update. We recommend that you review this policy regularly.
          </p>
        ),
      },
      {
        id: 'informacao-legal',
        title: 'Legal Information',
        body: (
          <>
            <p>
              The casttedovalley.com website and the Casttêdo Valley brand are run by {LEGAL.name}, a sole trader (tax number {LEGAL.nif}), with business address at {LEGAL.address}.
            </p>
            <p>
              <strong>Complaints Book.</strong> You can file a complaint in the Portuguese electronic Complaints Book at <ExternalLink href={COMPLAINTS_BOOK_URL}>www.livroreclamacoes.pt</ExternalLink>, or in the paper complaints book available at the winery.
            </p>
            <p>
              <strong>Alternative dispute resolution.</strong> In the event of a dispute, consumers may turn to an alternative consumer dispute resolution body: <ExternalLink href={RAL.entityUrl}>{RAL.entity}</ExternalLink>. More information on the Portuguese Consumer Portal at <ExternalLink href={RAL.portalUrl}>www.consumidor.gov.pt</ExternalLink>.
            </p>
          </>
        ),
      },
      {
        id: 'contacto',
        title: 'Contact',
        body: (
          <>
            <p>
              If you have any questions about this Privacy Policy or how we process your data, please contact us:
            </p>
            <Contact />
          </>
        ),
      },
    ],
  },
};

const number = (i) => String(i + 1).padStart(2, '0');

const PrivacyPage = () => {
  const { lang } = useLang();
  const text = TEXT[lang];
  const sections = text.sections;
  const [activeId, setActiveId] = useState(sections[0].id);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  useEffect(() => {
    // Destaca no índice a secção que está a ser lida
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Desloca até à secção sem alterar o URL
  const goTo = (e, id) => {
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  return (
    <div className="pp">
      <header className="pp-hero">
        <p className="pp-eyebrow">{text.eyebrow}</p>
        <h1 className="pp-title">{text.title}</h1>
        <span className="pp-rule" aria-hidden="true" />
        <p className="pp-lead">{text.lead}</p>
        <p className="pp-updated">{text.updated}</p>
      </header>

      <ul className="pp-summary">
        {text.summary.map(([title, summaryText]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{summaryText}</span>
          </li>
        ))}
      </ul>

      <div className="pp-layout">
        <nav className="pp-toc" aria-label={text.toc}>
          <p className="pp-toc__title">{text.toc}</p>
          <ol>
            {sections.map(({ id, title }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  className={activeId === id ? 'is-active' : undefined}
                >
                  <span className="pp-toc__num">{number(i)}</span>
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="pp-body">
          {sections.map(({ id, title, body }, i) => (
            <section key={id} id={id} className="pp-section">
              <h2 className="pp-section__title">
                <span className="pp-section__num">{number(i)}</span>
                {title}
              </h2>
              {body}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
