import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/useCart';
import { Link } from 'react-router-dom'
import { ProductContainer, ProductImage, BreadcrumbContainer, ErrorMessage, SizeSelector, SizeButton, ConfirmationMessage, ThumbnailsContainer, Thumbnail, ModalOverlay, ModalContent, ModalImage, BuyButton } from './styles';
import ReactSlick from "react-slick";
import { getProductById } from '../../services/productService'; // Importa a função para buscar produto
import { Product } from '../../types/Product';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null); // Estado do produto
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductById(parseInt(id)); // Busca o produto pelo ID
        setProduct(fetchedProduct);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>✷</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('O campo Tamanho é obrigatório.');
      return;
    }

    // Garante que não estamos passando valores undefined
    addToCart({
      id: product.id || 0, // Define um valor padrão (ex: 0)
      name: product.name || 'Nome do Produto', // Define um valor padrão
      image: typeof product.front_image === 'string' ? product.front_image : '', // Garante que seja string
      description: product.description || 'Sem descrição', // Define um valor padrão
      price: product.price || 0, // Define um valor padrão (ex: 0)
      size: selectedSize,
      quantity: 1
    });

    setError(null);
    setConfirmationMessage(true);

    setTimeout(() => {
      setConfirmationMessage(false);
      navigate('/cart');
    }, 1500);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null); // Limpa o erro se um tamanho for selecionado
  };

  const images = [
    product.front_image,
    product.back_image,
    product.detail_image,
    product.detail2_image
  ].filter(Boolean);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <BreadcrumbContainer>
        <Link to="/">Home</Link> <span> / {product.name}</span>
      </BreadcrumbContainer>
      {confirmationMessage && <ConfirmationMessage>Produto adicionado ao carrinho!</ConfirmationMessage>}
      <ProductContainer>
        <ThumbnailsContainer>
          {images.slice(1).map((imgSrc, index) => (
            <Thumbnail key={index} src={typeof imgSrc === 'string' ? imgSrc : ''} alt={`Thumbnail ${index + 1}`} onClick={() => handleThumbnailClick(index + 1)} />
          ))}
        </ThumbnailsContainer>
        <ProductImage src={typeof product.front_image === 'string' ? product.front_image : ''} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>R${product.price}</p>
          <SizeSelector>
            <label>Selecione o Tamanho:</label>
            <div>
              <SizeButton $isSelected={selectedSize === 'P'} onClick={() => handleSizeSelect('P')}>P</SizeButton>
              <SizeButton $isSelected={selectedSize === 'M'} onClick={() => handleSizeSelect('M')}>M</SizeButton>
              <SizeButton $isSelected={selectedSize === 'G'} onClick={() => handleSizeSelect('G')}>G</SizeButton>
            </div>
          </SizeSelector>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <BuyButton $isSelected={false} onClick={handleAddToCart}>COMPRAR</BuyButton>
        </div>
      </ProductContainer>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ReactSlick initialSlide={currentImageIndex}>
              {images.map((imgSrc, index) => (
                <div key={index}>
                  <ModalImage src={typeof imgSrc === 'string' ? imgSrc : ''} alt={`Imagem ${index + 1}`} />
                </div>
              ))}
            </ReactSlick>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}
