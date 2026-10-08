import { useLang } from "../i18n";
import { COMMON } from "../i18n/common";

// Secção "Distinções" das páginas de produto (prémios em src/mocks/products.js: { medal, title, score })
function AwardList({ awards, title }) {
  const { lang } = useLang();
  if (!awards || awards.length === 0) return null;

  return (
    <section className="wd-section">
      <h2 className="wd-label">{title}</h2>
      <ul className="wd-awards">
        {awards.map((award) => (
          <li key={award.title} className="wd-award">
            {award.medal && <img src={award.medal} alt="" className="wd-award__medal" />}
            <div>
              <span className="wd-award__name">{award.title}</span>
              {award.score && <span className="wd-award__points">{award.score} {COMMON[lang].points}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AwardList;
