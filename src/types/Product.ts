// types/Product.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  year?: number;
  tags?: string[];
  front_image: string;
  back_image?: string | null;
  detail_image?: string | null;
  detail2_image?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Nova interface para a resposta de atualização do produto
export interface UpdateProductResponse {
  message: string; // Mensagem de sucesso ou erro
  product: Product; // Pode incluir o objeto atualizado do produto se necessário
}
