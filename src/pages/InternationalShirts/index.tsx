import { BreadcrumbContainer, MainContainer, ProductGrid } from './styles';
import { Card } from '../../components/Card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productService';
import { Product } from '../../types/Product';

export function InternationalShirts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err); // Logando o erro no console
        setError('Falha ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>✷</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log('Produtos:', products); // Debugging: verifique os produtos e suas tags

  // Filtrando produtos com a tag "Internacional"
  const internationalProducts = products.filter(product =>
    Array.isArray(product.tags) && product.tags.includes("Internacional")
  );

  return (
    <div>
      <BreadcrumbContainer>
        <Link to="/">Home</Link> <span> / Camisas Internacionais</span>
      </BreadcrumbContainer>
      <MainContainer>
        <h2>Camisas Internacionais</h2>
        <ProductGrid>
          {internationalProducts.length > 0 ? (
            internationalProducts.map(product => (
              <div key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <Card
                    image={typeof product.front_image === 'string' ? product.front_image : ''}
                    name={product.name}
                    price={product.price}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div>Não há camisas internacionais disponíveis.</div>
          )}
        </ProductGrid>
      </MainContainer>
    </div>
  );
}
