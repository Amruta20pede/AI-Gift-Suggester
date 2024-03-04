import React, { useState, useEffect } from 'react';
import './Product.css';

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch('http://localhost:8000/api/v1/product')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setProducts(data.results);
          console.log(data.results);
        } 
      })
      .catch((error) => {
        setError(`Error fetching product data: ${error.message}`);
        console.log(error);
      });
  }, []);

  return (
    <section id="product">
      <h2>Product List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="product__container">
          {products.map((product, index) => (
            <article className="product__item" key={index}>
              <div className="product__item-image">
                <img src={product.img} alt={product.title} />
              </div>
              <div className="product__item-content">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
              </div>
              <div className="product__item-cta">
                <a
                  href={product.link}
                  target="_blank"
                  className="btn"
                  rel="noreferrer"
                >
                  View Product
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSearch;
