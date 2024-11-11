// Importa o hook useContext do React e os tipos e contexto CartContext definidos em CartContext.tsx
import { useContext } from 'react';
import { CartContext, CartContextType } from './CartContext';

// Define um hook personalizado chamado useCart que retorna o valor do contexto do carrinho
export const useCart = (): CartContextType => {
  // Usa o hook useContext para acessar o CartContext
  const context = useContext(CartContext);

  // Verifica se o contexto está indefinido, o que significa que useCart foi usado fora de um CartProvider
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }

  // Retorna o contexto, fornecendo acesso às funções e ao estado do carrinho
  return context;
};
