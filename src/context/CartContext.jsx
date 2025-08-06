import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  // Load cart from localStorage if exists
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map(item =>
      item._id === id ? { ...item, quantity: qty } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
