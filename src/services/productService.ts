// src/services/productService.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Use a variável de ambiente para obter a URL base

// Interface ajustada para refletir que o ID sempre será obrigatório ao buscar produtos
export interface Product {
  id: number; // O ID será obrigatório nos produtos retornados pela API
  name: string;
  price: number;
  front_image: File | string;
  back_image?: File | string;
  detail_image?: File | string;
  detail2_image?: File | string;
  description?: string;
  year?: number;
  tags: string | string[];
}

// Função para obter o token de autenticação
const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken'); // Altere isso se o token for armazenado em outro lugar
};

// Função para buscar todos os produtos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Adiciona o token ao cabeçalho
      },
    });
    return response.data; // Retorna os dados dos produtos
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error; // Re-throw para que o erro seja tratado externamente
  }
};

// Função para buscar um produto pelo ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Adiciona o token ao cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error;
  }
};

// Função para criar um produto (o ID ainda não existe aqui, por isso omitimos o id)
export const createProduct = async (product: Omit<Product, 'id'>): Promise<{ id: number; message: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, product, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Adiciona o token ao cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

// Função para atualizar um produto (incluímos o ID)
export const updateProduct = async (id: number, productData: Product) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Adiciona o token ao cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
    // Lida com o erro de forma mais específica
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Erro ao atualizar o produto.';
      throw new Error(errorMessage);
    } else {
      throw new Error('Erro desconhecido ao atualizar o produto.');
    }
  }
};


// Função para deletar um produto
export const deleteProduct = async (id: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Adiciona o token ao cabeçalho
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
