// src/context/CartContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Interface que define a estrutura de cada item no carrinho.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  size: string;
  image: string;
}

// Interface que define as funções e propriedades fornecidas pelo contexto.
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  totalAmount: number; // Adicionei esta linha para calcular o valor total
}

// Criação do contexto do carrinho com valor inicial indefinido.
export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}
// Constante para determinar o tempo de expiração do carrinho (10 minutos).
const CART_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutos em milissegundos

// Provedor do contexto que gerencia o estado do carrinho e suas operações.
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Estado inicial do carrinho. Os itens são carregados do localStorage se ainda estiverem válidos.
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const cartTimestamp = localStorage.getItem('cartTimestamp');

    // Verifica se há itens armazenados e se o tempo de expiração não foi atingido.
    if (storedCartItems && cartTimestamp) {
      const timeSinceLastAccess = Date.now() - parseInt(cartTimestamp, 10);
      if (timeSinceLastAccess < CART_EXPIRATION_TIME) {
        return JSON.parse(storedCartItems);
      } else {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTimestamp');
      }
    }
    return []; // Retorna um carrinho vazio se não houver itens válidos armazenados
  });

  // Atualiza o localStorage sempre que o estado do carrinho mudar.
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTimestamp', Date.now().toString());
  }, [cartItems]);

  // Adiciona um item ao carrinho ou atualiza sua quantidade se já existir.
  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItemIndex >= 0) {
      // Atualiza a quantidade do item existente
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedItems);
    } else {
      // Adiciona um novo item ao carrinho
      setCartItems([...cartItems, item]);
    }
  };

  // Remove um item do carrinho com base no id e no tamanho.
  const removeFromCart = (id: number, size: string) => {
    const updatedItems = cartItems.filter(
      (cartItem) => !(cartItem.id === id && cartItem.size === size)
    );
    setCartItems(updatedItems);
  };

  // Remove todos os itens do carrinho.
  const clearCart = () => {
    setCartItems([]);
  };

  // Atualiza a quantidade de um item específico no carrinho.
  const updateQuantity = (id: number, size: string, quantity: number) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === id && cartItem.size === size) {
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  };

  // Calcula o valor total do carrinho somando o preço de cada item multiplicado pela quantidade.
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Provedor do contexto que fornece o estado e as funções relacionadas ao carrinho.
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
