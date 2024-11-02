// src/components/ConfirmationView.js
import React from 'react';

function ConfirmationView({ cart, setView, clearCart }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = () => {
    clearCart();
    alert("Order placed successfully!");
    setView('browse');
  };

  return (
    <div className="confirmation-view">
      <h1>Order Confirmation</h1>
      <ul className="list-group mb-4">
        {cart.map(item => (
          <li key={item.id} className="list-group-item">
            <h5>{item.name} x {item.quantity}</h5>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={handlePlaceOrder} className="btn btn-success">Place Order</button>
    </div>
  );
}

export default ConfirmationView;