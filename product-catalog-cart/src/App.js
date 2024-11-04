// src/App.js
import React, { useState } from 'react';
import BrowseView from './components/BrowseView';
import CartView from './components/CartView';
import ConfirmationView from './components/ConfirmationView';
import './style.css';


function App() {
  const [view, setView] = useState('browse');
  const [cart, setCart] = useState({});
  const [userData, setUserData] = useState(null);

  const changeView = (newView) => setView(newView);

  return (
    <div className="App">
      {view === 'browse' && <BrowseView cart={cart} setCart={setCart} changeView={changeView} />}
      {view === 'cart' && <CartView cart={cart} setCart={setCart} changeView={changeView} setUserData={setUserData} />}
      {view === 'confirmation' && <ConfirmationView cart={cart} userData={userData} changeView={changeView} />}
    </div>
  );
}

export default App;
