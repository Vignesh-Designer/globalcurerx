'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "Global Cure RX Pharmacy LLC",
    phone: "+971 50 515 2391",
    whatsapp: "+971 50 515 2391",
    email: "Info@globalcurerx.com",
    address: "Shop Number 22, Ground Floor, Building P-15 (France P-15), France Cluster, Warsan 1 / International City, Dubai, United Arab Emirates.",
    poBox: "",
    currency: "AED",
    topAnnouncement: "Welcome to Global Cure Rx Pharmacy LLC",
    autoScrollInterval: 4000,
    logoUrl: "/uploads/1791916790068_Artboard_3_copy_3x-100.jpg"
  });

  // Load cart and settings from localStorage / API on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('globalcure_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }

    // Fetch live settings from API
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.phone) {
          setSettings(data);
        }
      })
      .catch(err => console.log('Could not load remote settings, using defaults', err));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('globalcure_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: Number(product.offerPrice || product.price || 0),
            actualPrice: Number(product.actualPrice || product.offerPrice || 0),
            image: product.image,
            category: product.category,
            quantity: qty
          }
        ];
      }
    });

    // Requirement 1: "if any item added it should be shown in right side. just you can see page3 design referance."
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        settings,
        setSettings
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
