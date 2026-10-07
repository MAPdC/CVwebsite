import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection.jsx";
import CamufladoSection from "../components/CamufladoSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import WineCarousel from "../components/WineCarousel.jsx";
import OliveOilCarousel from "../components/OliveOilCarousel.jsx";

import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/douro-1-tiny.webp";
import logoBranco from "../assets/cv-logo-branco.webp";
import logoRaposa from "../assets/camuflado-raposa-vermelho.webp";
import logoLebre  from "../assets/camuflado-lebre-azul.webp";
import { useLang } from "../i18n";

const HERO_SLIDES = [
  {
    id: "casttedo",
    image: heroImage,
    brand: "CASTTÊDO VALLEY",
    logos: [logoBranco],
  },
  {
    id: "camuflado",
    image: heroImage,
    brand: "CAMUFLADO",
    logos: [
      logoRaposa,
      logoLebre,
    ],
    link: "/camuflado",
  },
];

const TEXT = {
  pt: {
    logoAlt: {
      casttedo: ["Logótipo Casttêdo Valley"],
      camuflado: ["Raposa Camuflado", "Lebre Camuflado"],
    },
    linkLabel: "Descobrir Camuflado",
    showSlide: (brand) => `Ver ${brand}`,
  },
  en: {
    logoAlt: {
      casttedo: ["Casttêdo Valley logo"],
      camuflado: ["Camuflado fox", "Camuflado hare"],
    },
    linkLabel: "Discover Camuflado",
    showSlide: (brand) => `Show ${brand}`,
  },
};

const SLIDE_DURATION = 5000; // ms que cada slide fica visível

const HomePage = () => {
  const [scrollY, setScrollY]   = useState(0);
  const [active, setActive]     = useState(0);
  const timerRef                = useRef(null);
  const { lang, to }            = useLang();
  const text                    = TEXT[lang];

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const startTimer = (from) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((cur) => (cur + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startTimer(0);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setActive(i);
    startTimer(i);
  };

  const parallax = { transform: `translateY(${scrollY * 0.4}px)` };

  return (
    <div className="home">
      <section className="hero">

        {/* Imagens de fundo — cross-fade entre si */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === active ? "hero-slide--active" : ""}`}
          >
            <div className="hero-bg" style={parallax}>
              <img src={slide.image} alt="" className="hero-image" />
            </div>
          </div>
        ))}

        {/* Overlay escuro — acima das imagens, abaixo do conteúdo */}
        <div className="hero-overlay-home" />

        {/* Conteúdo do slide ativo — fora do loop, sempre por cima, com fade suave */}
        <div className="hero-body">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.id}
              className={`hero-content-slide ${i === active ? "hero-content-slide--active" : ""}`}
            >
              <div className={`hero-logos hero-logos--${slide.id}`}>
                {slide.logos.map((logo, li) => (
                  <img
                    key={li}
                    src={logo}
                    alt={text.logoAlt[slide.id][li]}
                    className="hero-logo"
                  />
                ))}
              </div>
              <h1 className={`hero-title ${slide.id === "camuflado" ? "hero-title--camuflado" : ""}`}>
                {slide.brand}
              </h1>
              {slide.link && (
                <Link to={to(slide.link)} className="hero-cta" tabIndex={i === active ? 0 : -1}>
                  {text.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Indicadores */}
        {HERO_SLIDES.length > 1 && (
          <div className="hero-dots">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                className={`hero-dot ${i === active ? "hero-dot--active" : ""}`}
                aria-label={text.showSlide(s.brand)}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}


      </section>

      <HeritageSection />
      <WineCarousel />
      <CamufladoSection />
      <OliveOilCarousel />
      <AwardsSection />
    </div>
  );
};

export default HomePage;