// src/pages/LoginPage/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export const LoginPage = () => {
  // Estados para armazenar o nome de usuário e a senha digitados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // Hook do React Router para redirecionar o usuário para outra página
  const navigate = useNavigate();

  // useEffect para verificar se já existe um token de administrador armazenado
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Redireciona para a página de administração de produtos se o usuário já estiver logado
      navigate('/admin/products');
    }
  }, [navigate]);

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página seja recarregada ao enviar o formulário
    setError(''); // Reseta a mensagem de erro antes de tentar logar

    try {
      // Envia uma requisição POST para o endpoint de login
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { username, password });
      const { token } = response.data;

      // Armazena o token de administrador no localStorage para autenticação persistente
      localStorage.setItem('adminToken', token);
      // Redireciona o usuário para a página de administração de produtos
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
