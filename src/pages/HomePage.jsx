import "../styles/HomePage.css";
import HeritageSection from "../components/HeritageSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import WineCarousel from "../components/WineCarousel.jsx";
import OliveOilCarousel from "../components/OliveOilCarousel.jsx";

import React, { useEffect, useRef, useState } from "react";
import heroImage from "../assets/douro-1-tiny.jpg";
import heroImage2 from "../assets/douro-camuflado.jpeg";
import logoBranco from "../assets/cv-logo-branco.png";
import logoRaposa from "../assets/camuflado-raposa-logo-branco.png";
import logoLebre  from "../assets/camuflado-lebre-logo-branco.png";

const HERO_SLIDES = [
  {
    id: "casttedo",
    image: heroImage,
    brand: "CASTTÊDO VALLEY",
    logos: [logoBranco],
    logoAlt: ["Casttêdo Valley Logo"],
  },
  {
    id: "camuflado",
    image: heroImage,
    brand: "CAMUFLADO",
    logos: [
      logoRaposa,
      logoLebre,
    ],
    logoAlt: ["Camuflado Raposa Logo", "Camuflado Lebre Logo"],
  },
];

const SLIDE_DURATION = 5000; // ms que cada slide fica visível

const HomePage = () => {
  const [scrollY, setScrollY]   = useState(0);
  const [active, setActive]     = useState(0);
  const timerRef                = useRef(null);

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
                    alt={slide.logoAlt[li]}
                    className="hero-logo"
                  />
                ))}
              </div>
              <h1 className="hero-title">{slide.brand}</h1>
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
                aria-label={`Ver ${s.brand}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}


      </section>

      <HeritageSection />
      <WineCarousel />
      <OliveOilCarousel />
      <AwardsSection />
    </div>
  );
};

export default HomePage;