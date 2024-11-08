// src/pages/AdminProductsPage/index.tsx
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/productService';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth'; // Importar o useAuth
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  LogoutButtonStyled,
  CreateButton,
  ProductList,
  ProductItem,
  ProductInfo,
  ProductImage,
  ProductName,
  ProductPrice,
  ButtonContainer,
  ActionButton,
  BreadcrumbContainer
} from './styles';

export const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Usar o logout do contexto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Removido o timer de logout

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  return (
    <Container>
      <LogoutButtonStyled onClick={logout}>Sair</LogoutButtonStyled> {/* Usar o logout do contexto */}
      <BreadcrumbContainer>
        <Link to="/">Home</Link> <span> / Administração de Produtos</span>
      </BreadcrumbContainer>
      <Title>Catálogo</Title>
      <CreateButton onClick={() => navigate('/admin/products/create')}>Criar Produto</CreateButton>

      {loading ? (
        <p>✷</p>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product.id}>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>Preço: {product.price}</ProductPrice>
                <ButtonContainer>
                  <ActionButton onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Editar</ActionButton>
                  <ActionButton onClick={() => handleDelete(product.id)}>Deletar</ActionButton>
                </ButtonContainer>
              </ProductInfo>
              <ProductImage src={product.front_image} alt={product.name} />
            </ProductItem>
          ))}
        </ProductList>
      )}
    </Container>
  );
};
