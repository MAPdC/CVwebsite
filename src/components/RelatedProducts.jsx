import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getPackshotTransform } from "../utils/packshotTransform";
import { localizeProduct, useLang } from "../i18n";
import { COMMON } from "../i18n/common";
import "../styles/RelatedProducts.css";

const TEXT = {
  pt: { title: "Também pode gostar", eyebrow: "Continue a descobrir", cta: "Descobrir" },
  en: { title: "You may also like", eyebrow: "Keep exploring", cta: "Discover" },
};

// Amplia a garrafa para ocupar o painel (as fotos têm margens diferentes)
const applyCrop = (img) => {
  try {
    const transform = getPackshotTransform(img);
    if (transform) img.style.setProperty("--crop", transform);
  } catch {
    // sem acesso aos píxeis: fica a imagem tal como está
  }
};

// showStatus: etiqueta "Disponível" / "Coleção" em cada cartão (vinhos Casttêdo Valley)
function RelatedProducts({ products, title, basePath = "/portfolio/wines", showStatus = false }) {
  const productsRef = useRef(null);
  const { lang, to } = useLang();
  const text = TEXT[lang];
  const badges = COMMON[lang].badges;

  // Os cartões aparecem com um fade ao entrar no ecrã
  useEffect(() => {
    if (!productsRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("product-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    productsRef.current.querySelectorAll(".related-product").forEach((product) => observer.observe(product));

    // Recorte das garrafas: já carregadas (cache) ou quando acabarem de carregar
    const images = [...productsRef.current.querySelectorAll(".related-product__image img")];
    const onLoad = (event) => applyCrop(event.currentTarget);
    images.forEach((img) => {
      if (img.complete && img.naturalWidth) applyCrop(img);
      else img.addEventListener("load", onLoad);
    });

    return () => {
      observer.disconnect();
      images.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <section className="related-products-section">
      <div className="related-products__heading">
        <span className="related-products__eyebrow">{text.eyebrow}</span>
        <h2 className="related-products__title">{title ?? text.title}</h2>
      </div>

      <div className="related-products__grid" ref={productsRef}>
        {products.map((p) => localizeProduct(p, lang)).map((product) => (
          <Link
            to={to(`${basePath}/${product.slug}`)}
            className="related-product"
            key={product.id}
          >
            <div className="related-product__image">
              <img src={product.images[0]} alt={product.name} loading="lazy" />
              {showStatus && (product.collection || product.onmarket) && (
                <span className={`related-product__status related-product__status--${product.collection ? "collection" : "available"}`}>
                  {product.collection ? badges.collection : badges.available}
                </span>
              )}
            </div>

            <div className="related-product__info">
              <span className="related-product__category">
                {[product.category, product.year].filter(Boolean).join(" · ")}
              </span>
              <h3 className="related-product__name">{product.name}</h3>
              <span className="related-product__cta">{text.cta}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
