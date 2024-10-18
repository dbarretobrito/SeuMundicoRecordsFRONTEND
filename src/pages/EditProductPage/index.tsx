import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogoutButtonStyled } from './styles'; // Ajuste o caminho conforme necessário
import { updateProduct } from '../../services/productService'; // Importe a função updateProduct
import { Product } from '../../services/productService'; // Importe a interface Product

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Para navegação
  const [product, setProduct] = useState<Product | null>(null); // Inicializa como null
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const productFromBackend = response.data;

        // Verifica se tags é uma string antes de fazer o split
        setProduct({
          ...productFromBackend,
          tags: typeof productFromBackend.tags === 'string'
            ? productFromBackend.tags.split(',')
            : productFromBackend.tags || [],  // Se já for array ou undefined
        });
      } catch (err) {
        setError('Erro ao buscar produto.');
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    if (!product) return; // Verifica se product é null
  
    try {
      await updateProduct(Number(id), {
        ...product,
        // Garante que tags seja sempre um array de strings
        tags: Array.isArray(product.tags) ? product.tags : product.tags ? [product.tags] : [],
      });
      setSuccess('Produto atualizado com sucesso!');
      navigate('/products'); // Redireciona para a lista de produtos após a atualização
    } catch (err) {
      setError((err as Error).message || 'Erro ao atualizar o produto.'); // Captura o erro da função updateProduct
      console.error(err);
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
      <h1>Editar Produto</h1>
      <LogoutButtonStyled onClick={handleLogout}>Sair</LogoutButtonStyled>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {product && ( // Verifica se product não é null antes de renderizar os campos
        <>
          <div>
            <label htmlFor="name">Nome do Produto:</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              id="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            />
          </div>
          <div>
            <label htmlFor="tags">Tags:</label>
            <input
              type="text"
              id="tags"
              value={Array.isArray(product.tags) ? product.tags.join(',') : product.tags || ''} // Verifica se é array
              onChange={(e) => setProduct({ ...product, tags: e.target.value.split(',') })}
            />
          </div>
          <button onClick={handleSave}>Salvar</button> {/* Botão para salvar o produto */}
        </>
      )}
    </div>
  );
}
