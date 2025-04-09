import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/RelatedProducts.css";

function RelatedProducts({ currentProductId, productType }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulação de carregamento de dados - substituir pelo fetch real
    const fetchRelatedProducts = async () => {
      // Exemplo - substituir por API real
      const mockProducts = [
        {
          id: "reserva-2019",
          name: "Reserva 2019",
          type: productType,
          category: "Douro DOC",
          image: "/images/related-1.jpg",
          price: "35,00€"
        },
        {
          id: "grande-escolha-2018",
          name: "Grande Escolha 2018",
          type: productType,
          category: "Douro DOC",
          image: "/images/related-2.jpg",
          price: "52,00€"
        },
        {
          id: "colheita-tardia-2021",
          name: "Colheita Tardia 2021",
          type: productType,
          category: "Douro DOC",
          image: "/images/related-3.jpg",
          price: "28,00€"
        },
        {
          id: "vinhas-velhas-2020",
          name: "Vinhas Velhas 2020",
          type: productType,
          category: "Douro DOC",
          image: "/images/related-4.jpg",
          price: "42,00€"
        }
      ].filter(product => product.id !== currentProductId);
      
      setProducts(mockProducts.slice(0, 3)); // Limitar a 3 produtos relacionados
    };

    fetchRelatedProducts();
  }, [currentProductId, productType]);

  return (
    <div className="related-products__grid">
      {products.map((product) => (
        <Link 
          to={`/product/${product.id}`} 
          className="related-product" 
          key={product.id}
        >
          <div className="related-product__image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="related-product__info">
            <h3 className="related-product__name">{product.name}</h3>
            <div className="related-product__category">{product.category}</div>
            <div className="related-product__price">{product.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RelatedProducts;