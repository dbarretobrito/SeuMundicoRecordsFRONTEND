import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => {
  // Obtém o contexto de autenticação usando useContext
  const context = useContext(AuthContext);
  // Garante que o hook seja utilizado dentro do provedor adequado (AuthProvider)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // Retorna o valor do contexto para ser usado nos componentes que chamarem este hook
  return context;
};