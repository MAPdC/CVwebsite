import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import HeritageSection from "../components/HeritageSection.jsx";
import CamufladoSection from "../components/CamufladoSection.jsx";
import AwardsSection from "../components/AwardsSection.jsx";
import WineCarousel from "../components/WineCarousel.jsx";
import OliveOilCarousel from "../components/OliveOilCarousel.jsx";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
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
    pageTitle: "Casttêdo Valley — vinhos DOC Douro e azeite biológico",
    carousel: "Destaques",
    slide: (n, total) => `${n} de ${total}`,
    pause: "Pausar apresentação",
    play: "Retomar apresentação",
  },
  en: {
    logoAlt: {
      casttedo: ["Casttêdo Valley logo"],
      camuflado: ["Camuflado fox", "Camuflado hare"],
    },
    linkLabel: "Discover Camuflado",
    showSlide: (brand) => `Show ${brand}`,
    pageTitle: "Casttêdo Valley — Douro DOC wines and organic olive oil",
    carousel: "Highlights",
    slide: (n, total) => `${n} of ${total}`,
    pause: "Pause slideshow",
    play: "Play slideshow",
  },
};

const SLIDE_DURATION = 5000; // ms que cada slide fica visível

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HomePage = () => {
  const [active, setActive] = useState(0);
  // Quem pede menos movimento no sistema começa com a apresentação em pausa
  const [paused, setPaused] = useState(prefersReducedMotion);
  // Rato por cima ou foco dentro do hero: a rotação para enquanto a pessoa lê ou navega
  const [interacting, setInteracting] = useState(false);
  const heroRef = useRef(null);
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const running = !paused && !interacting;

  // Parallax do fundo: escreve --parallax uma vez por frame, sem re-renderizar a página
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight); // para quando o hero sai do ecrã
        heroRef.current?.style.setProperty("--parallax", `${y * 0.4}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Rotação automática; recomeça a contagem quando se escolhe um slide
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActive((cur) => (cur + 1) % HERO_SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(id);
  }, [running, active]);

  return (
    <div className="home">
      <section
        ref={heroRef}
        className={`hero ${paused ? "hero--paused" : ""}`}
        aria-roledescription="carousel"
        aria-label={text.carousel}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }}
      >
        <h1 className="visually-hidden">{text.pageTitle}</h1>

        {/* Imagens de fundo — cross-fade entre si */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide ${i === active ? "hero-slide--active" : ""}`}
          >
            <div className="hero-bg">
              <img
                src={slide.image}
                alt=""
                className="hero-image"
                fetchPriority={i === 0 ? "high" : undefined}
              />
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
              role="group"
              aria-roledescription="slide"
              aria-label={text.slide(i + 1, HERO_SLIDES.length)}
              aria-hidden={i !== active}
              inert={i !== active}
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
              <p className={`hero-title ${slide.id === "camuflado" ? "hero-title--camuflado" : ""}`}>
                {slide.brand}
              </p>
              {slide.link && (
                <Link to={to(slide.link)} className="hero-cta">
                  {text.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Pausa e indicadores */}
        {HERO_SLIDES.length > 1 && (
          <div className="hero-controls">
            <button
              type="button"
              className="hero-pause"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? text.play : text.pause}
            >
              {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            </button>
            {HERO_SLIDES.map((s, i) => (
              <button
                type="button"
                key={s.id}
                className={`hero-dot ${i === active ? "hero-dot--active" : ""}`}
                aria-label={text.showSlide(s.brand)}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
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