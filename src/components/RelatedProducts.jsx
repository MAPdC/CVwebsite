import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../styles/RelatedProducts.css";

function RelatedProducts({ products, title = "Também pode gostar" }) {
  const productsRef = useRef(null);
  
  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('product-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      if (productsRef.current) {
        const products = productsRef.current.querySelectorAll('.related-product');
        products.forEach(product => observer.observe(product));
      }
    };
    
    observeElements();
    
    return () => {
      // Cleanup if needed
    };
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <div className="related-products-section">
      <div className="related-products__heading">
        <h2 className="related-products__title">{title}</h2>
        <div className="related-products__divider">
          <span className="divider-icon">✦</span>
        </div>
      </div>
      
      <div className="related-products__grid" ref={productsRef}>
        {products.map((product) => (
          <Link 
            to={`/portfolio/wines/${product.slug}`} 
            className="related-product" 
            key={product.id}
          >
            <div className="related-product__image">
              <img src={product.images[0]} alt={product.name} />
            </div>
            
            <div className="related-product__info">
              <h3 className="related-product__name">{product.name}</h3>
              <div className="related-product__category">{product.category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;