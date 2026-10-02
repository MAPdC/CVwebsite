import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getPackshotTransform } from "../utils/packshotTransform";
import "../styles/RelatedProducts.css";

// Amplia a garrafa para ocupar o painel (as fotos têm margens diferentes)
const applyCrop = (img) => {
  try {
    const transform = getPackshotTransform(img);
    if (transform) img.style.setProperty("--crop", transform);
  } catch {
    // sem acesso aos píxeis: fica a imagem tal como está
  }
};

function RelatedProducts({ products, title = "Também pode gostar", basePath = "/portfolio/wines" }) {
  const productsRef = useRef(null);

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
        <span className="related-products__eyebrow">Continue a descobrir</span>
        <h2 className="related-products__title">{title}</h2>
      </div>

      <div className="related-products__grid" ref={productsRef}>
        {products.map((product) => (
          <Link
            to={`${basePath}/${product.slug}`}
            className="related-product"
            key={product.id}
          >
            <div className="related-product__image">
              <img src={product.images[0]} alt={product.name} loading="lazy" />
            </div>

            <div className="related-product__info">
              <span className="related-product__category">
                {[product.category, product.year].filter(Boolean).join(" · ")}
              </span>
              <h3 className="related-product__name">{product.name}</h3>
              <span className="related-product__cta">Descobrir</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
