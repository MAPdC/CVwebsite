import { useEffect } from "react";
import { Link } from "react-router-dom";
import { camufladoProducts } from "../mocks/camufladoProducts";
import useReveal from "../hooks/useReveal";
import "../styles/CamufladoLandingPage.css";

import titulo from "../assets/camuflado-titulo.webp";
import renderGarrafas from "../assets/camuflado-render-garrafas.webp";
import lebre from "../assets/camuflado-lebre-azul.webp";
import raposa from "../assets/camuflado-raposa-vermelho.webp";

// RASCUNHO — textos da landing por rever
const ANIMALS = [
  {
    id: "lebre",
    name: "A Lebre",
    logo: lebre,
    variety: "Touriga Nacional",
    text: "Rápida e discreta, a lebre esconde-se entre as ervas que crescem nas entrelinhas. Representa os dois Camuflado de Touriga Nacional, um sem madeira, outro com estágio em barrica de carvalho português.",
  },
  {
    id: "raposa",
    name: "A Raposa",
    logo: raposa,
    variety: "Tinta Carvalha",
    text: "Astuta e curiosa, a raposa percorre os socalcos ao cair da tarde. É o rosto da Tinta Carvalha, uma casta antiga do Douro, aqui revelada num branco floral e surpreendente.",
  },
];

function AnimalCard({ animal }) {
  const revealRef = useReveal();

  return (
    <article className={`camuflado-animal camuflado-animal--${animal.id}`}>
      <img
        ref={revealRef}
        src={animal.logo}
        alt={animal.name}
        className="camuflado-animal__logo camuflado-reveal"
      />
      <h3 className="camuflado-animal__name">{animal.name}</h3>
      <span className="camuflado-animal__variety">{animal.variety}</span>
      <p className="camuflado-animal__text">{animal.text}</p>
    </article>
  );
}

function CamufladoLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="theme-camuflado camuflado-landing">
      {/* Hero */}
      <section className="camuflado-hero">
        <img src={titulo} alt="Camuflado" className="camuflado-hero__wordmark" />
        <p className="camuflado-hero__subtitle">Branco de Uvas Tintas · Douro DOC</p>
        <img
          src={renderGarrafas}
          alt="As três garrafas Camuflado: Tinta Carvalha, Touriga Nacional e Touriga Nacional Oaked"
          className="camuflado-hero__bottles"
        />
        <span className="camuflado-hero__by">by Casttêdo Valley</span>
      </section>

      {/* RASCUNHO — O conceito */}
      <section className="camuflado-block">
        <h2 className="camuflado-block__title">O que se esconde nas vinhas</h2>
        <p>
          Entre a diversidade floral que reveste as nossas vinhas, a fauna auxiliar e cinegética
          encontra refúgio, alimento e camuflagem. Promovemos a biodiversidade e deixamos que a
          vinha seja casa para quem lá vive.
        </p>
        <p>
          Camuflado é uma homenagem a esse ecossistema vivo e aos animais que passeiam
          livremente entre as videiras.
        </p>
      </section>

      {/* RASCUNHO — A metamorfose */}
      <section className="camuflado-block camuflado-block--alt">
        <h2 className="camuflado-block__title">Uma metamorfose</h2>
        <p>
          Uvas tintas que dão um vinho branco. As uvas são prensadas com delicadeza e de forma prolongada.
        </p>
        <p>
          O resultado é um branco luminoso, envolto em mistério e complexidade, onde a frescura e a
          elegância se revelam a cada momento.
        </p>
      </section>

      {/* Lebre & Raposa */}
      <section className="camuflado-animals">
        {ANIMALS.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </section>

      {/* Os vinhos */}
      <section className="camuflado-wines">
        <h2 className="camuflado-block__title">Os vinhos</h2>
        <div className="camuflado-wines__grid">
          {camufladoProducts.map((wine) => (
            <Link
              to={`/camuflado/${wine.slug}`}
              key={wine.id}
              className="camuflado-wine-card"
              style={{ "--camuflado-accent": `var(--camuflado-accent-${wine.accent})` }}
            >
              <div className="camuflado-wine-card__image">
                <img src={wine.images[0]} alt={wine.name} />
              </div>
              <span className="camuflado-wine-card__tag">{wine.oaked ? "Oaked" : "Unoaked"}</span>
              <h3 className="camuflado-wine-card__name">{wine.varieties.join(", ")}</h3>
              <span className="camuflado-wine-card__meta">{wine.animal} · {wine.year}</span>
              <p className="camuflado-wine-card__text">{wine.briefdescription}</p>
              <span className="camuflado-wine-card__cta">Ver detalhes</span>
            </Link>
          ))}
        </div>
      </section>

      {/* RASCUNHO — O detalhe oculto */}
      <section className="camuflado-block camuflado-secret">
        <h2 className="camuflado-block__title">Há um detalhe oculto</h2>
        <p>
          Tal como os animais que o representam, o rótulo do Camuflado guarda um segredo.
          Sirva-o fresco, entre 8 e 10°C, e fique atento ao rótulo à medida que a temperatura varia.
        </p>
      </section>

      {/* Contacto */}
      <section className="camuflado-contact">
        <p>Quer provar o Camuflado ou saber onde o encontrar?</p>
        <Link to="/contacts" className="camuflado-button">Fale connosco</Link>
      </section>
    </div>
  );
}

export default CamufladoLandingPage;
