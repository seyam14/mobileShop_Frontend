// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const found = prev.find(p => p._id === product._id);
      if (found) {
        return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + qty } : p);
      }
      return [{ ...product, qty }, ...prev];
    });
  };

  const updateQty = (id, qty) => {
    setCartItems(prev => prev.map(p => p._id === id ? { ...p, qty: Math.max(1, qty) } : p));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(p => p._id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;  // <== add this default export
