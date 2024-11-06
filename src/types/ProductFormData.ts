// types/Product.ts
export interface ProductFormData {
  id?: number;
  name: string;
  description?: string;
  price: number;
  year?: number;
  tags?: string[];  
  front_image: string | File;
  back_image?: string | File | null;
  detail_image?: string | File | null;
  detail2_image?: string | File | null;
  created_at?: string;
  updated_at?: string;
}
