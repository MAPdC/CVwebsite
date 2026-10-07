import React, { useEffect, useState } from 'react';
import '../styles/PrivacyPage.css';

const EMAIL = 'casttedovalley@gmail.com';
const EmailLink = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

// Resumo apresentado no topo da página
const SUMMARY = [
  ['Sem cookies', 'O website não guarda cookies no seu dispositivo.'],
  ['Estatísticas anónimas', 'Contamos visitas sem identificar quem nos visita.'],
  ['Sem formulários', 'Só tratamos os dados que nos enviar por email ou telefone.'],
  ['Os seus direitos', 'Pode aceder, corrigir ou apagar os seus dados a qualquer momento.'],
];

// Cada secção gera também uma entrada no índice
const SECTIONS = [
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
          A entidade responsável pelo tratamento dos seus dados pessoais é o Casttêdo Valley, com sede no Largo Padre António Veiga, 5070-226, Castedo, Alijó, Portugal.
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
            Utilizamos o Umami, uma ferramenta de análise que não usa cookies nem identifica visitantes individualmente, para recolher dados agregados e anónimos sobre a utilização do site: páginas visitadas, origem da visita (por exemplo, um motor de busca ou rede social), país, tipo de dispositivo e navegador, e interações como o descarregamento de fichas técnicas. O endereço IP não é armazenado.
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
            <dt>GitHub · alojamento do website</dt>
            <dd>Regista o endereço IP dos visitantes por motivos de segurança.</dd>
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
          Tem também o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD), através de <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: (
      <p>
        O nosso website não utiliza cookies, nem para estatísticas nem para publicidade. Por esse motivo, não lhe é apresentado nenhum aviso de consentimento de cookies.
      </p>
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
    id: 'contacto',
    title: 'Contacto',
    body: (
      <>
        <p>
          Se tiver alguma dúvida sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, contacte-nos:
        </p>
        <address className="pp-contact">
          <span className="pp-contact__name">Casttêdo Valley</span>
          <span>Largo Padre António Veiga, 5070-226 Castedo, Alijó</span>
          <EmailLink />
          <a href="tel:+351933305966">+351 933 305 966</a>
        </address>
      </>
    ),
  },
];

const number = (i) => String(i + 1).padStart(2, '0');

const PrivacyPage = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    // Garante que a página abre no topo
    window.scrollTo(0, 0);

    // Destaca no índice a secção que está a ser lida
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Desloca até à secção sem alterar o URL
  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pp">
      <header className="pp-hero">
        <p className="pp-eyebrow">Informação Legal</p>
        <h1 className="pp-title">Política de Privacidade</h1>
        <span className="pp-rule" aria-hidden="true" />
        <p className="pp-lead">
          Um website sem cookies, sem formulários e com estatísticas anónimas. Explicamos aqui que dados são tratados e quais são os seus direitos.
        </p>
        <p className="pp-updated">Última atualização · 7 de outubro de 2026</p>
      </header>

      <ul className="pp-summary">
        {SUMMARY.map(([title, text]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>

      <div className="pp-layout">
        <nav className="pp-toc" aria-label="Índice">
          <p className="pp-toc__title">Índice</p>
          <ol>
            {SECTIONS.map(({ id, title }, i) => (
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
          {SECTIONS.map(({ id, title, body }, i) => (
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
