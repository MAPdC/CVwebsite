import { Construction, ArrowLeft } from 'lucide-react'; // Ícones
import { Link } from 'react-router-dom'; // Para o botão de voltar
import '../styles/UnderConstructionPage.css'; // Novo CSS
import { useLang } from '../i18n';
import { COMMON } from '../i18n/common';

const TEXT = {
  pt: { title: 'Em Desenvolvimento', text: 'Estamos a trabalhar arduamente para lhe trazer esta nova secção.', later: 'Por favor, volte mais tarde.' },
  en: { title: 'Coming Soon', text: 'We are working hard to bring you this new section.', later: 'Please check back soon.' },
};

const UnderConstructionPage = () => {
  const { lang, to } = useLang();
  const text = TEXT[lang];

  return (
    <div className="under-construction-page">
      <div className="construction-container">
        <div className="construction-icon">
          <Construction size={64} />
        </div>
        <h1 className="construction-title">{text.title}</h1>
        <p className="construction-text">
          {text.text}
          <br />
          {text.later}
        </p>
        <Link to={to("/")} className="construction-home-link">
          <ArrowLeft size={16} />
          {COMMON[lang].backHome}
        </Link>
      </div>
    </div>
  );
};

export default UnderConstructionPage;