import { Link } from 'react-router-dom';
import { MainContainer, ProductGrid } from './styles';
import { Card } from '../../components/Card';
import { ProductCarousel } from '../../components/ProductCarousel';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';  // Importando o tipo correto de Product
import { Product } from '../../types/Product';


export function Home() {
  const [products, setProducts] = useState<Product[]>([]);  // Usando o tipo Product importadoo
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);  // O erro na linha 25 é resolvido ao alinhar o tipo Product
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError('Falha ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando ✷✷✷</div>;
  }

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
