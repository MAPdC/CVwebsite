import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heritageBgImage from '../assets/padre-antonio-veiga-douro-tiny.webp';
import { useLang } from '../i18n';

const TEXT = {
  pt: {
    title: 'A nossa história',
    intro: 'A referência mais antiga associada ao Casttêdo Valley remonta a 1873, data em que se ergueram os nossos lagares de granito.',
    text: 'A arte da produção de vinhos e azeites é uma tradição familiar que se estende há, pelo menos, quatro gerações. As vinhas e oliveiras herdadas de geração em geração foram alvo de várias reestruturações e modernizações ao longo dos anos, respeitando sempre a tradição e o terroir único do Douro.',
    link: 'Visite a nossa quinta',
  },
  en: {
    title: 'Our story',
    intro: 'The earliest record of Casttêdo Valley dates back to 1873, the year our granite lagares were built.',
    text: 'Making wine and olive oil is a family tradition that spans at least four generations. Passed down from one generation to the next, our vineyards and olive groves have been replanted and modernised over the years, always in keeping with tradition and with the unique terroir of the Douro.',
    link: 'Visit our estate',
  },
};

const HeritageSection = () => {
  const sectionRef = useRef(null);
  const { lang, to } = useLang();
  const text = TEXT[lang];

  useEffect(() => {
    const section = sectionRef.current;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('reveal-section');
          observer.unobserve(section);
        }
      });
    }, observerOptions);
    
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="heritage-section" ref={sectionRef}>
      <div className="section-glow" />
      <div className="section-line-top" />
      <div className="heritage-background">
        <div className="heritage-overlay"></div>
        <img src={heritageBgImage} alt="Padre António Veiga - Douro" className="heritage-bg-image" loading="lazy" />
      </div>
      
      <div className="heritage-content">
        <div className="heritage-title-container">
          <h2 className="heritage-title">{text.title}</h2>
        </div>
        
        <div className="heritage-info">
          <p className="heritage-year-highlighted">1873</p>
          <p className="heritage-intro-text">{text.intro}</p>
          <p className="heritage-text">{text.text}</p>
          <Link to={to("/contacts")} className="heritage-link">
            {text.link}
            <span className="heritage-link-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;