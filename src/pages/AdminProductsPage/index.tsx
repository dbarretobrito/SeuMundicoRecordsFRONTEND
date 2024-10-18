// src/pages/AdminProductsPage/index.tsx
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/productService';
import { Product } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { LogoutButtonStyled } from './styles'; // Certifique-se de que o caminho está correto

export const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  }, []);

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

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('adminToken');
    // Redireciona para a página de login
    navigate('/admin/login');
  };

  return (
    <div>
      <h2>Administração de Produtos</h2>
      <LogoutButtonStyled onClick={handleLogout}>Sair</LogoutButtonStyled> {/* Botão de logout */}
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Preço: {product.price}</p>
              <button onClick={() => navigate(`/admin/products/edit/${product.id}`)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
