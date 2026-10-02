import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import "../styles/CamufladoSection.css";

import titulo from "../assets/camuflado-titulo.webp";
import renderGarrafas from "../assets/camuflado-render-garrafas.webp";
import lebre from "../assets/camuflado-lebre-azul.webp";
import raposa from "../assets/camuflado-raposa-vermelho.webp";

// Destaque da marca Camuflado na homepage
function CamufladoSection() {
  const revealRef = useReveal(0.5);

  return (
    <section className="theme-camuflado camuflado-section">
      <div className="camuflado-section__image">
        <img
          src={renderGarrafas}
          alt="As três garrafas Camuflado"
          loading="lazy"
        />
      </div>

      <div className="camuflado-section__content">
        <div className="camuflado-section__animals camuflado-reveal" ref={revealRef}>
          <img src={raposa} alt="Raposa" />
          <img src={lebre} alt="Lebre" />
        </div>
        <img src={titulo} alt="Camuflado" className="camuflado-section__wordmark" />
        <span className="camuflado-section__subtitle">Branco de Uvas Tintas · Douro DOC</span>
        {/* RASCUNHO */}
        <p>
          Uvas tintas que se transformam num branco luminoso. Uma homenagem à fauna que se
          esconde entre as nossas vinhas e um rótulo que guarda um segredo.
        </p>
        <Link to="/camuflado" className="camuflado-section__cta">Descobrir Camuflado</Link>
      </div>
    </section>
  );
}

export default CamufladoSection;
