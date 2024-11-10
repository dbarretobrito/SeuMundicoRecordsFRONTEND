// Contexto de autenticação para gerenciar login, logout e inatividade

import React, { createContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Definição do tipo do contexto de autenticação
interface AuthContextType {
  logout: () => void;
}

// Criação do contexto de autenticação com valor inicial indefinido
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação que encapsula a aplicação para fornecer o contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  // Função para realizar o logout, removendo dados do localStorage e redirecionando
  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken'); // Remove o token de autenticação
    localStorage.removeItem('loginTimestamp'); // Remove o timestamp ao deslogar
    navigate('/');
  }, [navigate]);

  // Função de logout que chama a função handleLogout
  const logout = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  // Efeito que verifica a inatividade do usuário e realiza o logout após um período
  useEffect(() => {
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (!loginTimestamp) {
      localStorage.setItem('loginTimestamp', Date.now().toString());
    }

    // Função que verifica se o tempo de inatividade ultrapassou o limite (10 minutos)
    const checkInactivity = () => {
      const storedTimestamp = localStorage.getItem('loginTimestamp');
      if (storedTimestamp) {
        const elapsed = Date.now() - parseInt(storedTimestamp, 10);

        // Verifica se o tempo de inatividade ultrapassou 10 minutos (600000 ms)
        if (elapsed > 600000) {  // Altere para 30000 para 30 segundos para teste
          logout(); // Realiza logout se ultrapassar o tempo limite
        }
      }
    };

    checkInactivity(); // Verifica a inatividade na primeira renderização

    // Define um intervalo para checar a inatividade a cada minuto
    const intervalId = setInterval(checkInactivity, 60000);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [logout]);

  // Provedor de contexto, passando a função de logout como valor para os componentes filhos
  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};
