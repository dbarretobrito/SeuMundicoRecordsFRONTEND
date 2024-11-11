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
  // Estado para controlar a busca digitada pelo usuário
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para armazenar a lista de produtos recebidos da API
  const [products, setProducts] = useState<Product[]>([]);

  // Estado para armazenar mensagens de erro
  const [error, setError] = useState<string | null>(null);

  // Efeito colateral que busca os produtos da API ao carregar a página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Realiza a requisição para a API para buscar os produtos
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProducts(response.data); // Armazena os produtos no estado
      } catch (err) {
        setError('Erro ao buscar produtos.');
        console.error(err);
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos
  }, []); // O efeito roda apenas uma vez quando o componente é montado

  // Filtra os produtos com base na busca digitada
  const filteredProducts = useMemo(() => {
    // Se não houver consulta, retorna uma lista vazia
    if (!searchQuery.trim()) {
      return [];
    }

    // Divide a query em palavras e converte para minúsculas
    const queryWords = searchQuery.toLowerCase().split(' ').filter(word => word.length > 0);

    return products.filter(product => {
      // Concatena o nome, tags e descrição para formar o texto pesquisável
      const { name, tags, description } = product;
      const searchableText = `${name} ${tags?.join(' ') || ''} ${description}`.toLowerCase();

      // Verifica se todas as palavras da query estão presentes no texto pesquisável
      return queryWords.every(word => {
        const regex = new RegExp(`\\b${word}`); // Verifica se a palavra é um prefixo de qualquer palavra no texto
        return regex.test(searchableText);
      });
    });
  }, [searchQuery, products]); // O filtro é recalculado sempre que a consulta ou a lista de produtos mudar

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
