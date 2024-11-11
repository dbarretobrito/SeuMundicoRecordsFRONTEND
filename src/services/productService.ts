// Importa axios para fazer requisições HTTP, e uma função auxiliar para pegar o token de autenticação
import axios from 'axios';
import { getAuthToken } from './authService';
import { Product } from '../types/Product'; // Tipagem do produto
import { ProductFormData } from '../types/ProductFormData'; // Tipagem dos dados do formulário de produto

// URL base para chamadas à API do backend, configurada via variável de ambiente
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Função para buscar a lista de produtos
export const getProducts = async (): Promise<Product[]> => {
  try {
    // Faz requisição GET para buscar todos os produtos, passando o token para autenticação
    const response = await axios.get(`${BASE_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data; // Retorna a lista de produtos
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
};

// Função para buscar um produto específico pelo ID
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data; // Retorna o produto encontrado
  } catch (error) {
    console.error(`Erro ao obter produto com ID ${productId}:`, error);
    throw error;
  }
};

// Função para fazer upload de uma imagem para o Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Preset de upload configurado no Cloudinary
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Nome da conta Cloudinary

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/' + import.meta.env.VITE_CLOUDINARY_CLOUD_NAME + '/image/upload', formData);
    return response.data.secure_url; // Retorna a URL da imagem carregada
  } catch (error) {
    console.error('Erro ao carregar imagem no Cloudinary:', error);
    throw error;
  }
};

// Função para criar um novo produto, com suporte ao upload de imagens
export const createProduct = async (productData: ProductFormData): Promise<{ id: number; message: string }> => {
  try {
    const formData = new FormData();

    // Objeto que contém dados do produto, excluindo imagens inicialmente
    const updatedProductData: Partial<Product> = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      year: productData.year,
      tags: productData.tags, // Tags armazenadas como array de strings
    };

    // Carrega imagens no Cloudinary, caso elas sejam do tipo `File`
    if (productData.front_image instanceof File) {
      updatedProductData.front_image = await uploadImageToCloudinary(productData.front_image);
    } else {
      updatedProductData.front_image = productData.front_image as string;
    }

    // Processa outras imagens conforme necessário (back_image, detail_image, etc.)
    if (productData.back_image instanceof File) {
      updatedProductData.back_image = await uploadImageToCloudinary(productData.back_image);
    } else {
      updatedProductData.back_image = productData.back_image || null;
    }

    if (productData.detail_image instanceof File) {
      updatedProductData.detail_image = await uploadImageToCloudinary(productData.detail_image);
    } else {
      updatedProductData.detail_image = productData.detail_image || null;
    }

    if (productData.detail2_image instanceof File) {
      updatedProductData.detail2_image = await uploadImageToCloudinary(productData.detail2_image);
    } else {
      updatedProductData.detail2_image = productData.detail2_image || null;
    }

    // Adicionar campos ao FormData, convertendo `tags` para string JSON
    Object.keys(updatedProductData).forEach(key => {
      const value = updatedProductData[key as keyof Product];
      if (value !== null && value !== undefined) {
        formData.append(key, key === 'tags' ? JSON.stringify(value) : String(value));
      }
    });

    const response = await axios.post(`${BASE_URL}/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return { id: response.data.id, message: 'Product created successfully' };
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    throw new Error("Falha ao criar o produto");
  }
};

// Função para atualizar um produto existente
export const updateProduct = async (productId: number, productData: ProductFormData): Promise<{ id: number; message: string }> => {
  try {
    // Carrega imagens no Cloudinary, se necessário
    const updatedProductData: Partial<Product> = {
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      year: productData.year ? Number(productData.year) : undefined,
      tags: productData.tags,
      front_image: productData.front_image instanceof File
        ? await uploadImageToCloudinary(productData.front_image)
        : productData.front_image, // Se não for File, assume que é uma string (URL)
      back_image: productData.back_image instanceof File
        ? await uploadImageToCloudinary(productData.back_image)
        : productData.back_image,
      detail_image: productData.detail_image instanceof File
        ? await uploadImageToCloudinary(productData.detail_image)
        : productData.detail_image,
      detail2_image: productData.detail2_image instanceof File
        ? await uploadImageToCloudinary(productData.detail2_image)
        : productData.detail2_image,
    };

    const response = await axios.put(`${BASE_URL}/api/products/${productId}`, updatedProductData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};


// Função para deletar um produto
export const deleteProduct = async (productId: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
