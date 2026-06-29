import React, { useEffect, useRef } from "react";
import "../styles/ContactPage.css";
import heroBackground from "../assets/douro-2-tiny.jpeg"; 
import { MapPin, Phone, Mail, Award, Calendar } from 'lucide-react';
import { Car, Train, Ship } from 'lucide-react'; 

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
  const refs = {
    hero: useRef(null),
    content: useRef(null),
    experiences: useRef(null),
    reservation: useRef(null),
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observar todos os elementos
    Object.values(refs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refs).forEach(ref => {
        if (ref.current) {
          // Garante que o unobserve é chamado apenas se o ref ainda existir
          observer.unobserve(ref.current);
        }
      });
    };
  }, []); // O array de dependências vazio garante que isto corre apenas na montagem

  // Funções de cópia
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("casttedovalley@gmail.com");
    alert("Email copiado para a área de transferência!");
  };

  // Função de cópia de telefone atualizada
  const copyPhoneToClipboard = (number) => {
    navigator.clipboard.writeText(number);
    alert("Telefone copiado para a área de transferência!");
  };

  return (
    <div className="contact-page-new">
      
      {/* --- Hero Section (100vh) --- */}
      <section className="contact-hero-section" ref={refs.hero}>
        <div className="hero-image" style={{ backgroundImage: `url(${heroBackground})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Contacte-nos</h1>
          <p className="hero-subtitle">Estamos no coração do Douro, prontos para o receber.</p>
        </div>
        {/* Seta de scroll para mobile */}
        <div className="scroll-down-prompt">
          <div className="scroll-down-arrow" />
        </div>
      </section>

      {/* --- Secção Principal (Grelha de Contacto e Como Chegar) --- */}
      <section className="contact-main-content" ref={refs.content}>
        <div className="contact-container">
          
          <div className="contact-header">
            <h2 className="section-title">Onde Estamos</h2>
            <p className="section-tagline">
              Visite-nos e descubra os segredos por trás dos nossos vinhos premiados. 
              Uma experiência sensorial completa no coração da Região do Douro.
            </p>
            <div className="section-divider" />
          </div>

          <div className="contact-grid">
            
            {/* --- Coluna da Esquerda: Contactos e Mapa --- */}
            <div className="contact-column contact-info-col">
              <h3 className="column-title">Contactos & Localização</h3>
              
              <div className="contact-details">
                <div className="info-item clickable" onClick={() => window.open("https://maps.google.com/?q=Largo+Padre+António+Veiga,+5070-226,+Castedo,+Alijó,+Portugal", "_blank")}>
                  <MapPin size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>Morada</strong>
                    <p>
                      Largo Padre António Veiga<br />
                      5070-226, Castedo<br />
                      Alijó, Portugal
                    </p>
                    <span className="hint">Clique para abrir no mapa</span>
                  </div>
                </div>

                {/* --- ITEM DE TELEFONE MODIFICADO --- */}
                <div className="info-item"> {/* Removido o 'clickable' principal */}
                  <Phone size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>Telefone</strong>
                    {/* Agrupador para múltiplos números */}
                    <div className="phone-group">
                      <p 
                        className="clickable-phone"
                        onClick={() => copyPhoneToClipboard("+351933305966")}
                      >
                        +351 933 305 966
                        <span className="hint"> (Móvel)</span>
                      </p>
                      {/* NOVO NÚMERO ADICIONADO */}
                      <p 
                        className="clickable-phone"
                        onClick={() => copyPhoneToClipboard("+351933467002")}
                      >
                        +351 933 467 002
                        <span className="hint"> (Móvel)</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* --- FIM DA MODIFICAÇÃO --- */}

                <div className="info-item clickable" onClick={copyEmailToClipboard}>
                  <Mail size={20} className="info-icon" />
                  <div className="info-text">
                    <strong>Email</strong>
                    <p>casttedovalley@gmail.com</p>
                    <span className="hint">Clique para copiar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Coluna da Direita: Como Chegar --- */}
            <div className="contact-column directions-col">
              <h3 className="column-title">Como Chegar</h3>
              <div className="directions-details">
                <DirectionItem 
                  icon={<Car size={30} />}
                  title="De Carro"
                  text="Do Porto: Siga a A4 em direção a Vila Real, saia para o IC5, depois siga pela N322 até Alijó e siga pela M597 até ao Castêdo."
                />
                <DirectionItem 
                  icon={<Train size={30} />}
                  title="De Comboio"
                  text="Linha do Douro até à estação do Pinhão ou do Tua, depois apanhe um táxi até ao Castêdo."
                />
                <DirectionItem 
                  icon={<Ship size={30} />}
                  title="De Barco"
                  text="Cruzeiro no Douro até ao Pinhão, depois apanhe um táxi até ao Castêdo (aproximadamente 25 minutos)."
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Secção de Experiências --- */}
      <section className="contact-section experiences-section" ref={refs.experiences}>
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="section-title">Experiências</h2>
            <div className="section-divider" />
          </div>
          
          <div className="experiences-grid">
            <ExperienceCard 
              icon={<Award size={36} />}
              title="Prova de Vinhos"
              text="Degustação dos nossos premiados vinhos do Douro, acompanhados de explicações sobre o processo de produção."
            />
            <ExperienceCard 
              icon={<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>}
              title="Visita à Adega"
              text="Conheça os processos de vinificação e envelhecimento que tornam os nossos vinhos tão especiais."
            />
            <ExperienceCard 
              icon={<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
              title="Visita às Vinhas"
              text="Passeio guiado pelas vinhas com vista panorâmica para o rio Douro."
            />
          </div>
        </div>
      </section>

      {/* --- Secção de Reserva Prévia --- */}
      <section className="contact-section reservation-section" ref={refs.reservation}>
        <div className="contact-container">
          <div className="reservation-notice">
            <div className="notice-icon">
              <Calendar size={36} />
            </div>
            <div className="notice-text">
              <h4>Reserva Prévia</h4>
              <p>Para garantir a melhor experiência possível, recomendamos que faça a sua reserva com pelo menos 48 horas de antecedência através do nosso telefone ou email.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;