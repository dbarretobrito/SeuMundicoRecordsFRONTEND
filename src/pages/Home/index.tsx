import { Link } from 'react-router-dom';
import { MainContainer, ProductGrid } from './styles';
import { Card } from '../../components/Card';
import { ProductCarousel } from '../../components/ProductCarousel';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';  // Importando a função para buscar produtos
import { Product } from '../../types/Product';


export function Home() {
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar os produtos, inicializado como um array vazio
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o loading da requisição
  const [error, setError] = useState<string | null>(null);

  // UseEffect para buscar os produtos quando o componente for montado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Chama o serviço para obter os produtos
        const data = await getProducts();
        setProducts(data);  // Atualiza o estado com os produtos obtidos
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Falha ao carregar produtos');
      } finally {
        // Após a execução, define que o carregamento foi concluído
        setLoading(false);
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos
  }, []); // O array vazio garante que a requisição será feita apenas uma vez, ao montar o componente

  // Enquanto os produtos estão sendo carregados, exibe um ícone de carregamento
  if (loading) {
    return <div>✷</div>;
  }

  // Caso haja algum erro ao buscar os produtos, exibe a mensagem de erro
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <MainContainer>
      <ProductCarousel />
      <ProductGrid>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <Card
                image={typeof product.front_image === 'string' ? product.front_image : ''}  // Garante que seja string
                name={product.name}
                price={product.price}
              />
            </Link>
          </div>
        ))}
      </ProductGrid>
    </MainContainer>
  );
}
