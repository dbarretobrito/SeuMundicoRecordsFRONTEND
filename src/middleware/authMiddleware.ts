// src/middleware/authMiddleware.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login'); // Redireciona para login se não houver token
    }
  }, [navigate]);
};
