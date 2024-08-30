// src/context/CartContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  size: string;
  image: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  totalAmount: number; // Adicionei esta linha para calcular o valor total
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CART_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutos

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartTimestamp = localStorage.getItem('cartTimestamp');
    
    if (storedCartItems && cartTimestamp) {
      const timeSinceLastAccess = Date.now() - parseInt(cartTimestamp, 10);
      if (timeSinceLastAccess < CART_EXPIRATION_TIME) {
        return JSON.parse(storedCartItems);
      } else {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTimestamp');
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTimestamp', Date.now().toString());
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id: number, size: string) => {
    const updatedItems = cartItems.filter(
      (cartItem) => !(cartItem.id === id && cartItem.size === size)
    );
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === id && cartItem.size === size) {
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalAmount, // Incluído no valor fornecido pelo contexto
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
