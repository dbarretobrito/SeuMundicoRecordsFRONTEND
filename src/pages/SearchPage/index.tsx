import { useState, useMemo } from 'react';
import { BreadcrumbContainer, SearchContainer, SearchInput, ResultsContainer } from './styles';
import { Card } from '../../components/Card';
import { products } from '../../data/productsData';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [searchQuery]);

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <a href={`/product/${product.id}`} key={product.id}>
              <Card 
                image={product.images.front}
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
