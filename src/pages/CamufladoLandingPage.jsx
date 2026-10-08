import { Link } from "react-router-dom";
import { camufladoProducts } from "../mocks/camufladoProducts";
import useReveal from "../hooks/useReveal";
import { localizeProduct, useLang } from "../i18n";
import { COMMON } from "../i18n/common";
import "../styles/CamufladoLandingPage.css";

import titulo from "../assets/camuflado-titulo.webp";
import renderGarrafas from "../assets/camuflado-render-garrafas.webp";
import lebre from "../assets/camuflado-lebre-azul.webp";
import raposa from "../assets/camuflado-raposa-vermelho.webp";

const ANIMALS = [
  { id: "lebre", logo: lebre, variety: "Touriga Nacional" },
  { id: "raposa", logo: raposa, variety: "Tinta Carvalha" },
];

const TEXT = {
  pt: {
    subtitle: "Branco de Uvas Tintas · Douro DOC",
    bottlesAlt: "As três garrafas Camuflado: Tinta Carvalha, Touriga Nacional e Touriga Nacional Oaked",
    concept: {
      title: "O que se esconde nas vinhas",
      paragraphs: [
        "Entre a diversidade floral que reveste as nossas vinhas, a fauna auxiliar e cinegética encontra refúgio, alimento e camuflagem. Promovemos a biodiversidade e deixamos que a vinha seja casa para quem lá vive.",
        "Camuflado é uma homenagem a esse ecossistema vivo e aos animais que passeiam livremente entre as videiras.",
      ],
    },
    metamorphosis: {
      title: "Uma metamorfose",
      paragraphs: [
        "Uvas tintas que dão um vinho branco. As uvas são prensadas com delicadeza e de forma prolongada.",
        "O resultado é um branco luminoso, envolto em mistério e complexidade, onde a frescura e a elegância se revelam a cada momento.",
      ],
    },
    animals: {
      lebre: {
        name: "A Lebre",
        text: "Rápida e discreta, a lebre esconde-se entre as ervas que crescem nas entrelinhas. Representa os dois Camuflado de Touriga Nacional, um sem madeira, outro com estágio em barrica de carvalho português.",
      },
      raposa: {
        name: "A Raposa",
        text: "Astuta e curiosa, a raposa percorre os socalcos ao cair da tarde. É o rosto da Tinta Carvalha, uma casta antiga do Douro, aqui revelada num branco floral e surpreendente.",
      },
    },
    wines: "Os vinhos",
    seeDetails: "Ver detalhes",
    secret: {
      title: "Há um detalhe oculto",
      text: "Tal como os animais que o representam, o rótulo do Camuflado guarda um segredo. Sirva-o fresco, entre 8 e 10°C, e fique atento ao rótulo à medida que a temperatura varia.",
    },
    contact: "Quer provar o Camuflado ou saber onde o encontrar?",
    contactCta: "Fale connosco",
  },
  en: {
    subtitle: "Blanc de Noirs · Douro DOC",
    bottlesAlt: "The three Camuflado bottles: Tinta Carvalha, Touriga Nacional and Touriga Nacional Oaked",
    concept: {
      title: "What hides among the vines",
      paragraphs: [
        "Amid the wildflowers that carpet our vineyards, beneficial wildlife and game find shelter, food and camouflage. We champion biodiversity and let the vineyard be home to all who live there.",
        "Camuflado is a tribute to this living ecosystem and to the animals that roam freely among the vines.",
      ],
    },
    metamorphosis: {
      title: "A metamorphosis",
      paragraphs: [
        "Red grapes that yield a white wine, through a gentle, unhurried pressing.",
        "The result is a luminous white, shrouded in mystery and complexity, where freshness and elegance unfold with every sip.",
      ],
    },
    animals: {
      lebre: {
        name: "The Hare",
        text: "Swift and discreet, the hare hides among the grasses that grow between the vine rows. It represents the two Touriga Nacional Camuflados: one unoaked, the other aged in Portuguese oak barrels.",
      },
      raposa: {
        name: "The Fox",
        text: "Cunning and curious, the fox roams the terraces at dusk. It is the face of Tinta Carvalha, an old Douro grape variety, revealed here as a floral and surprising white.",
      },
    },
    wines: "The wines",
    seeDetails: "View details",
    secret: {
      title: "A hidden detail",
      text: "Like the animals that represent it, the Camuflado label keeps a secret. Serve it chilled, between 8 and 10°C (46–50°F), and keep an eye on the label as the temperature changes.",
    },
    contact: "Would you like to taste Camuflado or find out where to buy it?",
    contactCta: "Get in touch",
  },
};

function AnimalCard({ animal, name, text }) {
  const revealRef = useReveal();

  return (
    <article className={`camuflado-animal camuflado-animal--${animal.id}`}>
      <img
        ref={revealRef}
        src={animal.logo}
        alt={name}
        className="camuflado-animal__logo camuflado-reveal"
      />
      <h3 className="camuflado-animal__name">{name}</h3>
      <span className="camuflado-animal__variety">{animal.variety}</span>
      <p className="camuflado-animal__text">{text}</p>
    </article>
  );
}

function CamufladoLandingPage() {
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const badges = COMMON[lang].badges;
  const wines = camufladoProducts.map((wine) => localizeProduct(wine, lang));

  return (
    <div className="theme-camuflado camuflado-landing">
      {/* Hero */}
      <section className="camuflado-hero">
        {/* O logótipo é o título da página (o alt "Camuflado" é o texto do h1) */}
        <h1 className="camuflado-hero__title">
          <img src={titulo} alt="Camuflado" className="camuflado-hero__wordmark" />
        </h1>
        <p className="camuflado-hero__subtitle">{text.subtitle}</p>
        <img
          src={renderGarrafas}
          alt={text.bottlesAlt}
          className="camuflado-hero__bottles"
        />
        <span className="camuflado-hero__by">by Casttêdo Valley</span>
      </section>

      {/* O conceito */}
      <section className="camuflado-block">
        <h2 className="camuflado-block__title">{text.concept.title}</h2>
        {text.concept.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      {/* A metamorfose */}
      <section className="camuflado-block camuflado-block--alt">
        <h2 className="camuflado-block__title">{text.metamorphosis.title}</h2>
        {text.metamorphosis.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      {/* Lebre & Raposa */}
      <section className="camuflado-animals">
        {ANIMALS.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} {...text.animals[animal.id]} />
        ))}
      </section>

      {/* Os vinhos */}
      <section className="camuflado-wines">
        <h2 className="camuflado-block__title">{text.wines}</h2>
        <div className="camuflado-wines__grid">
          {wines.map((wine) => (
            <Link
              to={to(`/camuflado/${wine.slug}`)}
              key={wine.id}
              className="camuflado-wine-card"
              style={{ "--camuflado-accent": `var(--camuflado-accent-${wine.accent})` }}
            >
              <div className="camuflado-wine-card__image">
                <img src={wine.images[0]} alt={wine.name} />
              </div>
              <span className="camuflado-wine-card__tag">{wine.oaked ? badges.oaked : badges.unoaked}</span>
              <h3 className="camuflado-wine-card__name">{wine.varieties.join(", ")}</h3>
              <span className="camuflado-wine-card__meta">{wine.animal} · {wine.year}</span>
              <p className="camuflado-wine-card__text">{wine.briefdescription}</p>
              <span className="camuflado-wine-card__cta">{text.seeDetails}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* O detalhe oculto */}
      <section className="camuflado-block camuflado-secret">
        <h2 className="camuflado-block__title">{text.secret.title}</h2>
        <p>{text.secret.text}</p>
      </section>

      {/* Contacto */}
      <section className="camuflado-contact">
        <p>{text.contact}</p>
        <Link to={to("/contacts")} className="camuflado-button">{text.contactCta}</Link>
      </section>
    </div>
  );
}

export default CamufladoLandingPage;
