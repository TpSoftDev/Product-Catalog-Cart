// src/App.js
import React, { useState } from 'react';
import BrowseView from './components/BrowseView';
import CartView from './components/CartView';
import ConfirmationView from './components/ConfirmationView';

function App() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('browse');

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="container mt-4">
      {view === 'browse' && <BrowseView addToCart={addToCart} setView={setView} />}
      {view === 'cart' && <CartView cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} setView={setView} />}
      {view === 'confirmation' && <ConfirmationView cart={cart} setView={setView} clearCart={clearCart} />}
    </div>
  );
}

export default App;