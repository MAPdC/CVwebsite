import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HistoryPage.css';

// Importação de imagens (você precisará adicionar estas imagens aos seus assets)
import heroImage from '../assets/test-gray-1.png';
import founder from '../assets/test-gray-1.png';
import vineyard1924 from '../assets/test-gray-1.png';
import modernization from '../assets/test-gray-1.png';
import bioCertification from '../assets/test-gray-1.png';
import familyPortrait from '../assets/test-gray-1.png';
import barrels from '../assets/test-gray-1.png';

const HistoryPage = () => {
  const [activeEra, setActiveEra] = useState('1873');
  const timelineRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-section');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.animate-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  const scrollToEra = (era) => {
    setActiveEra(era);
    const element = document.getElementById(`era-${era}`);
    if (element) {
      const yOffset = -80; // Ajuste conforme necessário para compensar cabeçalhos fixos
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Definição dos marcos históricos
  const eras = [
    {
      year: '1873',
      title: 'Fundação',
      description: 'António Casttêdo, após anos de trabalho nas vinhas do Alto Douro, adquiriu um pequeno terreno nas encostas íngremes do vale. Com determinação inabalável e conhecimento profundo do terroir local, estabeleceu as primeiras vinhas e uma adega modesta que seria o alicerce de tudo o que viria a seguir. Utilizando métodos tradicionais transmitidos por gerações anteriores, António dedicou-se a cultivar variedades autóctones que melhor expressassem o carácter único desta região.',
      image: founder,
      quote: '"O verdadeiro vinho do Douro deve contar a história da terra, do clima e das mãos que o cultivam."',
      quoteAuthor: 'António Casttêdo, Fundador'
    },
    {
      year: '1924',
      title: 'Primeiro Prémio',
      description: 'Sob a liderança da segunda geração, Maria e João Casttêdo aperfeiçoaram as técnicas de vinificação, elevando a qualidade dos vinhos a novos patamares. O reconhecimento veio na Exposição Vinícola Nacional de 1924, onde o Casttêdo Reserva Tinto foi premiado com a medalha de ouro, colocando definitivamente a adega no mapa dos grandes produtores nacionais. Este período também marcou o início da produção de azeite premium, aproveitando as oliveiras centenárias que ladeavam as vinhas.',
      image: vineyard1924,
      quote: '"Este prémio não é apenas nosso, mas de toda a região que representa a verdadeira alma do Douro."',
      quoteAuthor: 'João Casttêdo, 2ª Geração'
    },
    {
      year: '1967',
      title: 'Modernização',
      description: 'A década de 1960 trouxe ventos de mudança para Casttêdo Valley. António Casttêdo Neto, representante da terceira geração e formado em enologia em França, implementou técnicas modernas de vinificação, mantendo sempre respeito pelas tradições ancestrais. Foi construída uma nova adega equipada com tecnologia de ponta para a época, permitindo um controlo de temperatura mais preciso e uma vinificação mais consistente. Esta modernização cuidadosa preservou a essência dos vinhos enquanto melhorava sua longevidade e expressão.',
      image: modernization,
      quote: '"A inovação só tem valor quando respeita e eleva a tradição. Nosso objetivo não é mudar, mas aperfeiçoar."',
      quoteAuthor: 'António Casttêdo Neto, 3ª Geração'
    },
    {
      year: '2021',
      title: 'Certificação Bio',
      description: 'Após um processo rigoroso de conversão iniciado uma década antes, a Casttêdo Valley obteve a certificação de produção biológica para todos os seus vinhedos e olivais. Este marco representa o compromisso da quinta geração com a sustentabilidade e a preservação do ecossistema único do Douro. Práticas como a abolição completa de pesticidas, a implementação de cobertura vegetal entre fileiras e o uso de métodos biodinâmicos fortaleceram a biodiversidade local e aprimoraram ainda mais a qualidade e autenticidade dos vinhos e azeites produzidos.',
      image: bioCertification,
      quote: '"Nosso legado não se mede apenas pelo que produzimos, mas pelo que preservamos para as gerações futuras."',
      quoteAuthor: 'Sofia Casttêdo, 5ª Geração'
    }
  ];

  return (
    <div className="historia-page">
      {/* Hero Section */}
      <div className="historia-hero animate-section">
        <div className="historia-hero-overlay"></div>
        <img src={heroImage} alt="Vinhedos Casttêdo Valley" className="historia-hero-image" />
        <div className="historia-hero-content">
          <h1 className="historia-hero-title">A NOSSA HISTÓRIA</h1>
          <p className="historia-hero-subtitle">Cinco gerações de dedicação às vinhas do Douro</p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="historia-intro animate-section">
        <div className="historia-container">
          <div className="historia-intro-content">
            <h2 className="section-title">
              <span className="title-line"></span>
              LEGADO DE EXCELÊNCIA
              <span className="title-line"></span>
            </h2>
            <p className="intro-text">
              Desde 1873, a história da Casttêdo Valley entrelaça-se com os contornos sinuosos do Vale do Douro, criando uma narrativa de perseverança, inovação e respeito pela terra. Ao longo de cinco gerações, mantivemos viva a paixão por produzir vinhos e azeites que expressam genuinamente o terroir único desta região privilegiada.
            </p>
            <p className="intro-text">
              Nossa jornada reflete a própria essência do Douro: desafiadora, autêntica e profundamente enraizada na tradição portuguesa. Cada garrafa que produzimos carrega consigo mais de um século de conhecimento acumulado, transmitido de geração em geração, e constantemente aprimorado pelo diálogo entre métodos ancestrais e técnicas contemporâneas.
            </p>
          </div>
          <div className="familia-image-container">
            <img src={familyPortrait} alt="Família Casttêdo" className="familia-image" />
            <div className="image-caption">A família Casttêdo, guardiã de um legado centenário</div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Navigation */}
      <div className="timeline-navigation" ref={timelineRef}>
        <div className="timeline-container">
          {eras.map((era) => (
            <div 
              key={era.year} 
              className={`timeline-item ${activeEra === era.year ? 'active' : ''}`}
              onClick={() => scrollToEra(era.year)}
            >
              <span className="timeline-year">{era.year}</span>
              <span className="timeline-dot"></span>
              <span className="timeline-event">{era.title}</span>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>

      {/* Historical Eras Detail Sections */}
      <div className="historical-eras">
        {eras.map((era, index) => (
          <section 
            id={`era-${era.year}`} 
            key={era.year} 
            className={`era-section animate-section ${index % 2 === 0 ? 'era-left' : 'era-right'}`}
            ref={el => sectionsRef.current[index] = el}
          >
            <div className="era-container">
              <div className="era-content">
                <div className="era-header">
                  <h3 className="era-year">{era.year}</h3>
                  <h4 className="era-title">{era.title}</h4>
                </div>
                <p className="era-description">{era.description}</p>
                <div className="era-quote">
                  <blockquote>{era.quote}</blockquote>
                  <cite>— {era.quoteAuthor}</cite>
                </div>
              </div>
              <div className="era-image-container">
                <img src={era.image} alt={`Casttêdo Valley em ${era.year}`} className="era-image" />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Philosophy Section */}
      <section className="philosophy-section animate-section">
        <div className="philosophy-background">
          <img src={barrels} alt="Barricas de carvalho na adega" className="philosophy-bg-image" />
          <div className="philosophy-overlay"></div>
        </div>
        <div className="philosophy-content">
          <h2 className="philosophy-title">FILOSOFIA CASTTÊDO</h2>
          <p className="philosophy-text">
            Na Casttêdo Valley, acreditamos que grandes vinhos nascem de pequenas decisões tomadas diariamente entre as vinhas. Nossa filosofia fundamenta-se no profundo respeito pelo ecossistema do Douro, trabalhando em harmonia com os ciclos naturais e intervindo apenas quando necessário.
          </p>
          <p className="philosophy-text">
            Buscamos não apenas produzir vinhos de excelência, mas preservar e enriquecer o património vitícola português, contribuindo para o futuro sustentável da região que nos deu origem e identidade.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="historia-cta animate-section">
        <div className="historia-container">
          <h2 className="cta-title">DESCUBRA NOSSOS PRODUTOS</h2>
          <p className="cta-text">
            Experimente a história em cada garrafa. Nossos vinhos e azeites carregam consigo mais de um século de tradição e excelência.
          </p>
          <div className="cta-buttons">
            <Link to="/vinhos" className="cta-button primary">NOSSOS VINHOS</Link>
            <Link to="/azeites" className="cta-button secondary">NOSSOS AZEITES</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryPage;