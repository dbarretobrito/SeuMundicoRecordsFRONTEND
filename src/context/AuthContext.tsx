// src/context/AuthContext.tsx
import React, { createContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('loginTimestamp'); // Remove o timestamp ao deslogar
    navigate('/');
  }, [navigate]);

  const logout = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  useEffect(() => {
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if (!loginTimestamp) {
      localStorage.setItem('loginTimestamp', Date.now().toString());
    }

    const checkInactivity = () => {
      const storedTimestamp = localStorage.getItem('loginTimestamp');
      if (storedTimestamp) {
        const elapsed = Date.now() - parseInt(storedTimestamp, 10);

        // Verifica se o tempo de inatividade ultrapassou 10 minutos (600000 ms)
        if (elapsed > 600000) {  // Altere para 30000 para 30 segundos para teste
          logout();
        }
      }
    };

    checkInactivity();

    const intervalId = setInterval(checkInactivity, 60000); // Checa a cada minuto

    return () => clearInterval(intervalId);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};
