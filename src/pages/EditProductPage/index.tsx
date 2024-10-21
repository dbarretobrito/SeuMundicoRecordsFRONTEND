import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogoutButtonStyled } from './styles'; // Ajuste o caminho conforme necessário
import { updateProduct } from '../../services/productService'; // Importe a função updateProduct
import { Product } from '../../services/productService'; // Importe a interface Product

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const productFromBackend = response.data;

        setProduct({
          ...productFromBackend,
          tags: typeof productFromBackend.tags === 'string'
            ? productFromBackend.tags.split(',')
            : productFromBackend.tags || [],
        });
      } catch (err) {
        setError('Erro ao buscar produto.');
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    if (!product) return;

    try {
      await updateProduct(Number(id), {
        ...product,
        tags: Array.isArray(product.tags) ? product.tags : product.tags ? [product.tags] : [],
      });
      setSuccess('Produto atualizado com sucesso!');
      navigate('/admin/products');
    } catch (err) {
      setError((err as Error).message || 'Erro ao atualizar o produto.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleImageUpload = (setter: (url: string) => void) => {
    // Widget do Cloudinary
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: unknown | null, result: CloudinaryUploadWidgetResult) => { // Corrigido
        if (result?.event === 'success') { // Adicionado verificação de resultado
          setter(result.info.secure_url);
        } else {
          console.error(error); // Adicionando log de erro, se necessário
        }
      }
    );
  };
  
  return (
    <div>
      <h1>Editar Produto</h1>
      <LogoutButtonStyled onClick={handleLogout}>Sair</LogoutButtonStyled>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      
      {product && (
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
              value={Array.isArray(product.tags) ? product.tags.join(',') : product.tags || ''}
              onChange={(e) => setProduct({ ...product, tags: e.target.value.split(',') })}
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={product.description || ''}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="year">Ano:</label>
            <input
              type="number"
              id="year"
              value={product.year || ''}
              onChange={(e) => setProduct({ ...product, year: Number(e.target.value) })}
            />
          </div>
          
          {/* Campos para as imagens */}
          <div>
            <label htmlFor="front_image">Imagem Frontal:</label>
            <input
              type="text"
              id="front_image"
              value={typeof product.front_image === 'string' ? product.front_image : ''}
              onChange={(e) => setProduct({ ...product, front_image: e.target.value })}
            />
            <button onClick={() => handleImageUpload((url) => setProduct({ ...product, front_image: url }))}>
              Upload Imagem Frontal
            </button>
          </div>
          <div>
            <label htmlFor="back_image">Imagem Traseira:</label>
            <input
              type="text"
              id="back_image"
              value={typeof product.back_image === 'string' ? product.back_image : ''}
              onChange={(e) => setProduct({ ...product, back_image: e.target.value })}
            />
            <button onClick={() => handleImageUpload((url) => setProduct({ ...product, back_image: url }))}>
              Upload Imagem Traseira
            </button>
          </div>
          <div>
            <label htmlFor="detail_image">Imagem Detalhe:</label>
            <input
              type="text"
              id="detail_image"
              value={typeof product.detail_image === 'string' ? product.detail_image : ''}
              onChange={(e) => setProduct({ ...product, detail_image: e.target.value })}
            />
            <button onClick={() => handleImageUpload((url) => setProduct({ ...product, detail_image: url }))}>
              Upload Imagem Detalhe
            </button>
          </div>
          <div>
            <label htmlFor="detail2_image">Imagem Detalhe 2:</label>
            <input
              type="text"
              id="detail2_image"
              value={typeof product.detail2_image === 'string' ? product.detail2_image : ''}
              onChange={(e) => setProduct({ ...product, detail2_image: e.target.value })}
            />
            <button onClick={() => handleImageUpload((url) => setProduct({ ...product, detail2_image: url }))}>
              Upload Imagem Detalhe 2
            </button>
          </div>

          <button onClick={handleSave}>Salvar</button>
        </>
      )}
    </div>
  );
}
