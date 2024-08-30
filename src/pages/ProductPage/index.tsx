import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { ProductContainer, ProductImage, BreadcrumbContainer, ErrorMessage, SizeSelector, SizeButton, ConfirmationMessage, ThumbnailsContainer, Thumbnail, ModalOverlay, ModalContent, ModalImage, BuyButton } from './styles';
import { products } from '../../data/productsData';
import ReactSlick from "react-slick";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id!));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('O campo Tamanho é obrigatório.');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.images.front,
      description: product.description,
      price: product.price,
      size: selectedSize, 
      quantity: 1 });
    setError(null);
    setConfirmationMessage(true);

    setTimeout(() => {
      setConfirmationMessage(false);
    }, 3000);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null); // Limpa o erro se um tamanho for selecionado
  };

  const images = Object.values(product.images);

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
        <a href="/">Home</a> <span> / {product.name}</span>
      </BreadcrumbContainer>
      {confirmationMessage && <ConfirmationMessage>Produto adicionado ao carrinho!</ConfirmationMessage>}
      <ProductContainer>
        <ThumbnailsContainer>
          {images.slice(1).map((imgSrc, index) => (
            <Thumbnail key={index} src={imgSrc} alt={`Thumbnail ${index + 1}`} onClick={() => handleThumbnailClick(index + 1)} />
          ))}
        </ThumbnailsContainer>
        <ProductImage src={product.images.front} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>R${product.price},00</p>
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
                  <ModalImage src={imgSrc} alt={`Imagem ${index + 1}`} />
                </div>
              ))}
            </ReactSlick>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
}
