import { useContext } from 'react';
import { CartContext, CartContextType } from './CartContext';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
