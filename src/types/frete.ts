// Define a estrutura do produto
export interface Product {
  id: string;
  width: number;
  height: number;
  length: number;
  weight: number;
  insurance_value: number;
  quantity: number;
}

// Define a estrutura para localização
export interface Location {
  postal_code: string;
}

// Define opções adicionais de frete
export interface Options {
  receipt?: boolean;
  own_hand?: boolean;
}

// Define a estrutura de serviços
export interface Services {
  services?: string; // IDs dos serviços separados por vírgula
}

// Define a estrutura da requisição de cálculo de frete
export interface FreightRequest {
  from: Location;
  to: Location;
  products: Product[];
  options?: Options;
  services?: Services;
}

// Define a estrutura da resposta da API
export interface FreightResponse {
  custom_price?: number;
  custom_delivery_time?: string;
  // Adicione outros campos da resposta, se conhecidos
  [key: string]: unknown; // Para permitir campos adicionais
}
