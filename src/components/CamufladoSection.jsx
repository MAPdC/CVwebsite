import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";

import titulo from "../assets/camuflado-titulo.webp";
import renderGarrafas from "../assets/camuflado-render-garrafas.webp";
import lebre from "../assets/camuflado-lebre-azul.webp";
import raposa from "../assets/camuflado-raposa-vermelho.webp";
import { useLang } from "../i18n";

const TEXT = {
  pt: {
    bottlesAlt: "As três garrafas Camuflado",
    fox: "Raposa",
    hare: "Lebre",
    subtitle: "Branco de Uvas Tintas · Douro DOC",
    text: "Uvas tintas que se transformam num branco luminoso. Uma homenagem à fauna que se esconde entre as nossas vinhas e um rótulo que guarda um segredo.",
    cta: "Descobrir Camuflado",
  },
  en: {
    bottlesAlt: "The three Camuflado bottles",
    fox: "Fox",
    hare: "Hare",
    subtitle: "Blanc de Noirs · Douro DOC",
    text: "Red grapes transformed into a luminous white. A tribute to the wildlife that hides among our vines, and a label that keeps a secret.",
    cta: "Discover Camuflado",
  },
};

// Destaque da marca Camuflado na homepage
function CamufladoSection() {
  const revealRef = useReveal(0.5);
  const { lang, to } = useLang();
  const text = TEXT[lang];

  return (
    <section className="theme-camuflado camuflado-section">
      <div className="camuflado-section__image">
        <img
          src={renderGarrafas}
          alt={text.bottlesAlt}
          loading="lazy"
        />
      </div>

      <div className="camuflado-section__content">
        <div className="camuflado-section__animals camuflado-reveal" ref={revealRef}>
          <img src={raposa} alt={text.fox} />
          <img src={lebre} alt={text.hare} />
        </div>
        <img src={titulo} alt="Camuflado" className="camuflado-section__wordmark" />
        <span className="camuflado-section__subtitle">{text.subtitle}</span>
        <p>{text.text}</p>
        <Link to={to("/camuflado")} className="camuflado-section__cta">{text.cta}</Link>
      </div>
    </section>
  );
}

export default CamufladoSection;
