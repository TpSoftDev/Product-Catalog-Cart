// src/components/CartView.js
import React, { useState } from 'react';
import productsData from '../data/products.json';

function CartView({ cart, setCart, changeView, setUserData }) {
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', card: '', address1: '', city: '', state: '', zip: ''
  });
  const [errors, setErrors] = useState({});
  const total = Object.keys(cart).reduce(
    (sum, id) => sum + cart[id] * productsData.find((p) => p.id === parseInt(id)).price,
    0
  );

  const validateForm = () => {
    let formErrors = {};
    if (!userInfo.name) formErrors.name = "Name is required";
    if (!userInfo.email.includes('@')) formErrors.email = "Valid email is required";
    if (userInfo.card.length < 16) formErrors.card = "Valid 16-digit card number required";
    if (userInfo.zip.length !== 5 || isNaN(userInfo.zip)) formErrors.zip = "Valid 5-digit zip code required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleOrder = () => {
    if (validateForm()) {
      setUserData(userInfo);
      changeView('confirmation');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      <button onClick={() => changeView('browse')} className="btn btn-secondary mb-3">
        Return to Catalog
      </button>
      
      <ul className="list-group mb-3">
        {Object.keys(cart).map((id) => {
          const product = productsData.find((p) => p.id === parseInt(id));
          return (
            <li key={id} className="list-group-item d-flex justify-content-between">
              <div>{product.name} x {cart[id]}</div>
              <div>${(product.price * cart[id]).toFixed(2)}</div>
            </li>
          );
        })}
      </ul>
      <h4>Total: ${total.toFixed(2)}</h4>

      <h2 className="mt-4">Payment Information</h2>
      <form className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Full Name" value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control" placeholder="Email" value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Card Number" value={userInfo.card}
            onChange={(e) => setUserInfo({ ...userInfo, card: e.target.value })} />
          {errors.card && <small className="text-danger">{errors.card}</small>}
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Zip Code" value={userInfo.zip}
            onChange={(e) => setUserInfo({ ...userInfo, zip: e.target.value })} />
          {errors.zip && <small className="text-danger">{errors.zip}</small>}
        </div>
        <button type="button" onClick={handleOrder} className="btn btn-success mt-4">Place Order</button>
      </form>
    </div>
  );
}

export default CartView;
