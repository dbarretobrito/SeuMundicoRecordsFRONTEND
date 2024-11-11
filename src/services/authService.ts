import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL; // Certifique-se de que o backend está corretamente configurado no .env

export const loginAdmin = async (username: string, password: string) => {
  // Função para autenticar o administrador e armazenar o token no localStorage
  const response = await axios.post(`${API_URL}/login`, { username, password });

  // Verifica se o token foi retornado na resposta
  if (response.data.token) {
    // Armazena o token no localStorage com a chave 'adminToken'
    localStorage.setItem('adminToken', response.data.token);
  }

  return response.data; // Retorna os dados para uso adicional, se necessário
};

// Função para obter o token de autenticação do localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};
