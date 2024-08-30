import { Link } from 'react-router-dom';
import { MainContainer, ProductGrid } from './styles';
import { Card } from '../../components/Card';
import { products } from '../../data/productsData'; // Importando o novo array de produtos
import { ProductCarousel } from '../../components/ProductCarousel';

export function Home() {
  return (
    <MainContainer>
      <ProductCarousel/>
      <ProductGrid>
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              {/* Usando a imagem frontal do novo array de produtos */}
              <Card image={product.images.front} name={product.name} price={product.price} />
            </Link>
          </div>
        ))}
      </ProductGrid>
    </MainContainer>
  );
}
