// src/components/BrowseView.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BrowseView({ addToCart, setView }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        console.log("Products loaded:", data); // Log loaded products to verify data
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  return (
    <div className="browse-view">
      <h1>Product Catalog</h1>
      <div className="row">
        {products.map(product => {
          console.log("Image path for product:", product.image); // Log each image path

          return (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name} 
                  onError={(e) => { e.target.src = '/images/default.jpg'; }} // Optional: fallback image on error
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => setView('cart')} className="btn btn-secondary mt-4">Go to Cart</button>
    </div>
  );
}

export default BrowseView;