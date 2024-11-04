// src/components/BrowseView.js
import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import 'bootstrap/dist/css/bootstrap.min.css';

function BrowseView({ cart, setCart, changeView }) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    setFilteredProducts(
      productsData.filter((product) =>
        product.name.toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [search]);

  const updateCart = (id, delta) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[id] || 0) + delta;
      if (newQuantity < 0) return prevCart;
      return { ...prevCart, [id]: newQuantity };
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product Catalog</h1>
        <button onClick={() => changeView('cart')} className="btn btn-primary">
          Go to Cart
        </button>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search for a product..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch('')} className="btn btn-outline-secondary">
          Clear Search
        </button>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
                <div className="d-flex align-items-center">
                  <button onClick={() => updateCart(product.id, -1)} className="btn btn-outline-secondary btn-sm">-</button>
                  <input
                    type="text"
                    value={cart[product.id] || 0}
                    readOnly
                    className="form-control text-center mx-2"
                    style={{ width: '50px' }}
                  />
                  <button onClick={() => updateCart(product.id, 1)} className="btn btn-outline-secondary btn-sm">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseView;
