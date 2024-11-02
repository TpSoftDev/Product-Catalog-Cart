// src/components/CartView.js
import React from 'react';

function CartView({ cart, updateQuantity, removeFromCart, setView }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-view">
      <h1>Your Cart</h1>
      <ul className="list-group mb-4">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
            <div>
              <h5>{item.name}</h5>
              <p>${item.price.toFixed(2)} x {item.quantity}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="form-control"
              />
            </div>
            <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={() => setView('confirmation')} className="btn btn-primary">Checkout</button>
      <button onClick={() => setView('browse')} className="btn btn-secondary">Continue Shopping</button>
    </div>
  );
}

export default CartView;