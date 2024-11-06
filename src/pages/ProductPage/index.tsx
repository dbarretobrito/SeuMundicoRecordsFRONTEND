import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/useCart';
import { Link } from 'react-router-dom';
import { ProductContainer, ProductImage, BreadcrumbContainer, ErrorMessage, SizeSelector, SizeButton, ConfirmationMessage, ThumbnailsContainer, Thumbnail, ModalOverlay, ModalContent, ModalImage, BuyButton } from './styles';
import ReactSlick from "react-slick";
import { getProductByName } from '../../services/productService'; // Alterado para importar a função de buscar por nome
import { Product } from '../../types/Product';

export function ProductPage() {
  const { name } = useParams<{ name: string }>(); // Alterado para pegar "name"
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (name) {
        try {
          const fetchedProduct = await getProductByName(name); // Agora usa a função para buscar pelo nome
          setProduct(fetchedProduct);
        } catch {
          setError('Produto não encontrado');
        }
      }
    };
    fetchProduct();
  }, [name]);

  if (!product) {
    return <div>✷</div>; // Mostrar algo enquanto o produto não é carregado
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('O campo Tamanho é obrigatório.');
      return;
    }

    addToCart({
      id: product.id || 0,
      name: product.name || 'Nome do Produto',
      image: typeof product.front_image === 'string' ? product.front_image : '',
      description: product.description || 'Sem descrição',
      price: product.price || 0,
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
    setError(null);
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
