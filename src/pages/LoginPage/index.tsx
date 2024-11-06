// src/pages/LoginPage/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/products');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { username, password });
      const { token } = response.data;

      localStorage.setItem('adminToken', token);
      navigate('/admin/products');
    } catch {
      setError('Login e/ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <S.Container>
      <S.LoginForm onSubmit={handleSubmit}>
        <h2>Login do Administrador</h2>
        <S.Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <S.Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.Button type="submit">Entrar</S.Button>
      </S.LoginForm>
    </S.Container>
  );
};
