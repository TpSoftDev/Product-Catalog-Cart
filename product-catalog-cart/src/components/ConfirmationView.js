// src/components/ConfirmationView.js
import React from 'react';
import productsData from '../data/products.json';

function ConfirmationView({ cart, userData, changeView }) {
  const total = Object.keys(cart).reduce(
    (sum, id) => sum + cart[id] * productsData.find((p) => p.id === parseInt(id)).price,
    0
  );

  const resetCart = () => {
    changeView('browse');
  };

  return (
    <div className="container mt-4">
      <h1>Order Confirmation</h1>
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

      <h3>Thank you, {userData.name}!</h3>
      <p>Email: {userData.email}</p>
      <p>Credit Card: **** **** **** {userData.card.slice(-4)}</p>
      <button onClick={resetCart} className="btn btn-primary mt-4">Back to Browse</button>
    </div>
  );
}

export default ConfirmationView;
