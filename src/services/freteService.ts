import axios from 'axios';
import { Location, Product, Options, Services, FreightRequest, FreightResponse } from '../types/frete';

const API_URL = 'http://localhost:5000/api/frete/calculate'; // URL do seu backend

export const calculateFrete = async (
  from: Location,
  to: Location,
  products: Product[],
  options?: Options,
  services?: Services
): Promise<FreightResponse> => {
  const requestBody: FreightRequest = {
    from,
    to,
    products,
    options,
    services
  };

  try {
    const response = await axios.post<FreightResponse>(API_URL, requestBody);
    return response.data;
  } catch (error) {
    console.error('Erro ao consultar o frete:', error);
    throw error;
  }
};
