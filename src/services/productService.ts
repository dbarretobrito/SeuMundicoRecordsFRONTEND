import axios from 'axios';
import { getAuthToken } from './authService'; // Função para pegar o token de autenticação, ajuste de acordo com seu projeto
import { Product } from '../types/Product';
import { ProductFormData } from '../types/ProductFormData';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // URL do seu backend

export const getProducts = async (): Promise<Product[]> => {
  try {
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

// Função para obter um produto pelo ID
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

export const getProductByName = async (productName: string): Promise<Product> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/name/${productName}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data; // Retorna o produto encontrado
  } catch (error) {
    console.error(`Erro ao obter produto com nome ${productName}:`, error);
    throw error;
  }
};


// Função para fazer upload da imagem no Cloudinary
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Preset de upload
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Nome da sua conta Cloudinary

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/' + import.meta.env.VITE_CLOUDINARY_CLOUD_NAME + '/image/upload', formData);
    return response.data.secure_url; // Retorna a URL da imagem carregada
  } catch (error) {
    console.error('Erro ao carregar imagem no Cloudinary:', error);
    throw error;
  }
};

// Função para criar um novo produto, agora incluindo o upload de imagens no Cloudinary
export const createProduct = async (productData: ProductFormData): Promise<{ id: number; message: string }> => {
  try {
    const formData = new FormData();

    // Define `updatedProductData` com dados não relacionados a imagens
    const updatedProductData: Partial<Product> = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      year: productData.year,
      tags: productData.tags, // Armazena como array de strings diretamente
    };

    // Verifica e carrega as imagens no Cloudinary, se forem do tipo `File`
    if (productData.front_image instanceof File) {
      updatedProductData.front_image = await uploadImageToCloudinary(productData.front_image);
    } else {
      updatedProductData.front_image = productData.front_image as string;
    }

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
    // Carregar imagens no Cloudinary se forem `File` e criar um novo objeto com os dados atualizados
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
