import React, { useEffect, useRef } from "react";
import "../styles/ContactPage.css";
import heroBackground from "../assets/douro-2-tiny.webp"; 
import { MapPin, Phone, Mail, Award, Calendar } from 'lucide-react';
import { Car, Train, Ship } from 'lucide-react';
import { useLang } from '../i18n';

const TEXT = {
  pt: {
    emailCopied: "Email copiado para a área de transferência!",
    phoneCopied: "Telefone copiado para a área de transferência!",
    heroTitle: "Contacte-nos",
    heroSubtitle: "Estamos no coração do Douro, prontos para o receber.",
    whereTitle: "Onde Estamos",
    tagline: "Visite-nos e descubra os segredos por trás dos nossos vinhos premiados. Uma experiência sensorial completa no coração da Região do Douro.",
    contactTitle: "Contactos & Localização",
    address: "Morada",
    openMap: "Clique para abrir no mapa",
    phone: "Telefone",
    mobile: "(Móvel)",
    copy: "Clique para copiar",
    directionsTitle: "Como Chegar",
    byCar: "De Carro",
    byCarText: "Do Porto: Siga a A4 em direção a Vila Real, saia para o IC5, depois siga pela N322 até Alijó e siga pela M597 até ao Castêdo.",
    byTrain: "De Comboio",
    byTrainText: "Linha do Douro até à estação do Pinhão ou do Tua, depois apanhe um táxi até ao Castêdo.",
    byBoat: "De Barco",
    byBoatText: "Cruzeiro no Douro até ao Pinhão, depois apanhe um táxi até ao Castêdo (aproximadamente 25 minutos).",
    experiencesTitle: "Experiências",
    tasting: "Prova de Vinhos",
    tastingText: "Degustação dos nossos premiados vinhos do Douro, acompanhados de explicações sobre o processo de produção.",
    winery: "Visita à Adega",
    wineryText: "Conheça os processos de vinificação e envelhecimento que tornam os nossos vinhos tão especiais.",
    vineyards: "Visita às Vinhas",
    vineyardsText: "Passeio guiado pelas vinhas com vista panorâmica para o rio Douro.",
    bookingTitle: "Reserva Prévia",
    bookingText: "Para garantir a melhor experiência possível, recomendamos que faça a sua reserva com pelo menos 48 horas de antecedência através do nosso telefone ou email.",
  },
  en: {
    emailCopied: "Email address copied to clipboard!",
    phoneCopied: "Phone number copied to clipboard!",
    heroTitle: "Contact Us",
    heroSubtitle: "In the heart of the Douro, ready to welcome you.",
    whereTitle: "Where to Find Us",
    tagline: "Visit us and discover the secrets behind our award-winning wines: a complete sensory experience in the heart of the Douro Valley.",
    contactTitle: "Contact & Location",
    address: "Address",
    openMap: "Click to open in Maps",
    phone: "Phone",
    mobile: "(Mobile)",
    copy: "Click to copy",
    directionsTitle: "Getting Here",
    byCar: "By Car",
    byCarText: "From Porto: take the A4 towards Vila Real, exit onto the IC5, then follow the N322 to Alijó and the M597 to Castedo.",
    byTrain: "By Train",
    byTrainText: "Take the Douro Line to Pinhão or Tua station, then a taxi to Castedo.",
    byBoat: "By Boat",
    byBoatText: "Take a Douro river cruise to Pinhão, then a taxi to Castedo (about 25 minutes).",
    experiencesTitle: "Experiences",
    tasting: "Wine Tasting",
    tastingText: "Taste our award-winning Douro wines, with insights into how each one is made.",
    winery: "Winery Tour",
    wineryText: "Discover the winemaking and ageing processes that make our wines so special.",
    vineyards: "Vineyard Walk",
    vineyardsText: "A guided walk through the vineyards, with panoramic views over the Douro River.",
    bookingTitle: "Advance Booking",
    bookingText: "To ensure the best possible experience, we recommend booking at least 48 hours in advance by phone or email.",
  },
}; 

const ExperienceCard = ({ icon, title, text }) => (
  <div className="experience-card">
    <div className="experience-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

const DirectionItem = ({ icon, title, text }) => (
  <div className="directions-item">
    <div className="directions-icon">{icon}</div>
    <div className="directions-text">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </div>
);


const ContactPage = () => {
  const { lang } = useLang();
  const text = TEXT[lang];
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const experiencesRef = useRef(null);
  const reservationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // As secções aparecem com um fade ao entrar no ecrã
    [heroRef, contentRef, experiencesRef, reservationRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Funções de cópia
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("casttedovalley@gmail.com");
    alert(text.emailCopied);
  };

  // Função de cópia de telefone atualizada
  const copyPhoneToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    alert(text.phoneCopied);
  };

  return (
    <div className="contact-page-new">
      
      {/* --- Hero Section (100vh) --- */}
      <section className="contact-hero-section" ref={heroRef}>
        <div className="hero-image" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="contact-hero-title">{text.heroTitle}</h1>
          <p className="hero-subtitle">{text.heroSubtitle}</p>
        </div>
        {/* Seta de scroll para mobile */}
        <div className="scroll-down-prompt">
          <div className="scroll-down-arrow" />
        </div>
      </section>

      {/* --- Secção Principal (Grelha de Contacto e Como Chegar) --- */}
      <section className="contact-main-content" ref={contentRef}>
        <div className="contact-container">
          
          <div className="contact-header">
            <h2 className="section-title">{text.whereTitle}</h2>
            <p className="section-tagline">{text.tagline}</p>
            <div className="section-divider" />
          </div>

          <div className="contact-grid">
            
            {/* --- Coluna da Esquerda: Contactos e Mapa --- */}
            <div className="contact-column contact-info-col">
              <h3 className="column-title">{text.contactTitle}</h3>
              
              <div className="contact-details">
                <div className="info-item clickable" data-umami-event="mapa" onClick={() => window.open("https://maps.google.com/?q=Largo+Padre+António+Veiga,+5070-226,+Castedo,+Alijó,+Portugal", "_blank")}>
                  <MapPin size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>{text.address}</strong>
                    <p>
                      Largo Padre António Veiga<br />
                      5070-226, Castedo<br />
                      Alijó, Portugal
                    </p>
                    <span className="hint">{text.openMap}</span>
                  </div>
                </div>

                {/* --- ITEM DE TELEFONE MODIFICADO --- */}
                <div className="info-item"> {/* Removido o 'clickable' principal */}
                  <Phone size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>{text.phone}</strong>
                    {/* Agrupador para múltiplos números */}
                    <div className="phone-group">
                      <p 
                        className="clickable-phone"
                        data-umami-event="telefone"
                        data-umami-event-local="contactos"
                        onClick={() => copyPhoneToClipboard("+351933305966")}
                      >
                        +351 933 305 966
                        <span className="hint"> {text.mobile}</span>
                      </p>
                      {/* NOVO NÚMERO ADICIONADO */}
                      <p 
                        className="clickable-phone"
                        data-umami-event="telefone"
                        data-umami-event-local="contactos"
                        onClick={() => copyPhoneToClipboard("+351933467002")}
                      >
                        +351 933 467 002
                        <span className="hint"> {text.mobile}</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* --- FIM DA MODIFICAÇÃO --- */}

                <div
                  className="info-item clickable"
                  data-umami-event="email"
                  data-umami-event-local="contactos"
                  onClick={copyEmailToClipboard}
                >
                  <Mail size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>Email</strong>
                    <p>casttedovalley@gmail.com</p>
                    <span className="hint">{text.copy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Coluna da Direita: Como Chegar --- */}
            <div className="contact-column directions-col">
              <h3 className="column-title">{text.directionsTitle}</h3>
              <div className="directions-details">
                <DirectionItem 
                  icon={<Car size={30} />}
                  title={text.byCar}
                  text={text.byCarText}
                />
                <DirectionItem 
                  icon={<Train size={30} />}
                  title={text.byTrain}
                  text={text.byTrainText}
                />
                <DirectionItem 
                  icon={<Ship size={30} />}
                  title={text.byBoat}
                  text={text.byBoatText}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Secção de Experiências --- */}
      <section className="contact-section experiences-section" ref={experiencesRef}>
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="section-title">{text.experiencesTitle}</h2>
            <div className="section-divider" />
          </div>
          
          <div className="experiences-grid">
            <ExperienceCard 
              icon={<Award size={36} />}
              title={text.tasting}
              text={text.tastingText}
            />
            <ExperienceCard 
              icon={<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>}
              title={text.winery}
              text={text.wineryText}
            />
            <ExperienceCard 
              icon={<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
              title={text.vineyards}
              text={text.vineyardsText}
            />
          </div>
        </div>
      </section>

      {/* --- Secção de Reserva Prévia --- */}
      <section className="contact-section reservation-section" ref={reservationRef}>
        <div className="contact-container">
          <div className="reservation-notice">
            <div className="notice-icon">
              <Calendar size={36} />
            </div>
            <div className="notice-text">
              <h4>{text.bookingTitle}</h4>
              <p>{text.bookingText}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;