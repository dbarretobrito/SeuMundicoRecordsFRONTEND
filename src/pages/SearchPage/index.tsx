import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BreadcrumbContainer, SearchContainer, SearchInput, ResultsContainer } from './styles';
import { Card } from '../../components/Card';

// Ajuste na interface Product para refletir a estrutura correta do modelo de produto
interface Product {
  id: number;
  name: string;
  front_image: string; // Campo atualizado para corresponder ao modelo do backend
  back_image?: string;
  detail_image?: string;
  detail2_image?: string;
  price: number;
  tags?: string[];
  description: string;
}

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao buscar produtos.');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const queryWords = searchQuery.toLowerCase().split(' ').filter(word => word.length > 0);

    return products.filter(product => {
      const { name, tags, description } = product;
      const searchableText = `${name} ${tags?.join(' ') || ''} ${description}`.toLowerCase();

      return queryWords.every(word => {
        const regex = new RegExp(`\\b${word}`); // Verifica se a palavra é um prefixo de qualquer palavra no texto
        return regex.test(searchableText);
      });
    });
  }, [searchQuery, products]);

  return (
    <div>
      <BreadcrumbContainer>
        <a href="/">Home</a> <span> / Pesquisa</span>
      </BreadcrumbContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar"
        />
      </SearchContainer>
      <ResultsContainer>
        {error && <p>{error}</p>}
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <a href={`/product/${product.id}`} key={product.id}>
              <Card 
                image={product.front_image} // Ajustado para usar front_image diretamente
                name={product.name}
                price={product.price}
              />
            </a>
          ))
        ) : (
          searchQuery.trim() && <p>Nenhum produto encontrado.</p>
        )}
      </ResultsContainer>
    </div>
  );
}
