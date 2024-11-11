import { useParams, useNavigate } from 'react-router-dom'; // Para acessar parâmetros de URL e navegação
import { useState, useEffect } from 'react'; // Hooks para controle de estado e efeitos colaterais
import { useCart } from '../../context/useCart'; // Hook customizado para manipulação do carrinho de compras
import { Link } from 'react-router-dom'
import { ProductContainer, ProductImage, BreadcrumbContainer, ErrorMessage, SizeSelector, SizeButton, ConfirmationMessage, ThumbnailsContainer, Thumbnail, ModalOverlay, ModalContent, ModalImage, BuyButton, CloseButton } from './styles';
import ReactSlick from "react-slick"; // Carrossel para imagens do produto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { getProductById } from '../../services/productService'; // Função para buscar produto por ID
import { Product } from '../../types/Product'; // Tipagem do produto

// Função principal da página de produto
export function ProductPage() {
  const { id } = useParams<{ id: string }>(); // Acessa o ID do produto da URL
  const navigate = useNavigate(); // Hook para navegação programática
  const { addToCart } = useCart(); // Função para adicionar produto ao carrinho
  const [product, setProduct] = useState<Product | null>(null); // Estado do produto
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // Tamanho selecionado
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const [confirmationMessage, setConfirmationMessage] = useState<boolean>(false); // Mensagem de confirmação de adição ao carrinho
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Controle do modal de imagem
  const [isMeasuresModalOpen, setIsMeasuresModalOpen] = useState(false); // Controle do modal de medidas
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0); // Controle da imagem atual no carrossel

  // Efeito para buscar o produto no backend
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProductById(parseInt(id)); // Busca o produto pelo ID
        setProduct(fetchedProduct); // Atualiza o estado com o produto retornado
      }
    };
    fetchProduct();
  }, [id]); // O efeito é executado sempre que o ID do produto muda

  // Se o produto não for encontrado, exibe um ícone de erro
  if (!product) {
    return <div>✷</div>;
  }

  // Função para adicionar o produto ao carrinho
  const handleAddToCart = () => {
    if (!selectedSize) { // Verifica se o tamanho foi selecionado
      setError('O campo Tamanho é obrigatório.');
      return;
    }


    addToCart({ // Adiciona o produto ao carrinho com dados necessários
      id: product.id || 0,
      name: product.name || 'Nome do Produto',
      image: typeof product.front_image === 'string' ? product.front_image : '',
      description: product.description || 'Sem descrição',
      price: product.price || 0,
      size: selectedSize,
      quantity: 1
    });

    setError(null); // Limpa o erro
    setConfirmationMessage(true); // Exibe a mensagem de confirmação

    // Redireciona para a página do carrinho após 1.5 segundos
    setTimeout(() => {
      setConfirmationMessage(false);
      navigate('/cart');
    }, 1500);
  };

  // Função para selecionar o tamanho
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Atualiza o tamanho selecionado
    setError(null); // Limpa o erro se um tamanho for selecionado
  };

  // Lista de imagens para o carrossel, excluindo valores nulos ou indefinidos
  const images = [
    product.front_image,
    product.back_image,
    product.detail_image,
    product.detail2_image
  ].filter(Boolean);

  // Função para exibir a imagem no modal ao clicar em uma thumbnail
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index); // Atualiza o índice da imagem
    setIsModalOpen(true); // Abre o modal de imagem
  };

  // Função para fechar o modal de imagem
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Função para fechar o modal de medidas
  const closeMeasuresModal = () => setIsMeasuresModalOpen(false);

  // Função para abrir o modal de medidas
  const handleOpenMeasuresModal = () => {
    setIsMeasuresModalOpen(true);
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
              <SizeButton $isSelected={selectedSize === 'GG'} onClick={() => handleSizeSelect('GG')}>GG</SizeButton>
              <SizeButton $isSelected={selectedSize === '3G'} onClick={() => handleSizeSelect('3G')}>3G</SizeButton>
            </div>
            <span onClick={handleOpenMeasuresModal} style={{ cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faRulerHorizontal} style={{ marginRight: '4px', fontSize: '14px' }} />
              Ver Medidas
            </span>
          </SizeSelector>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <BuyButton $isSelected={false} onClick={handleAddToCart}>COMPRAR</BuyButton>
        </div>
      </ProductContainer>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
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
      {/* Modal de Medidas */}
      {isMeasuresModalOpen && (
        <ModalOverlay onClick={closeMeasuresModal} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src="https://res.cloudinary.com/dt31tve3m/image/upload/v1730916196/medidasseumundicorecords_djyiln.jpg"
              alt="Guia de Medidas"
              style={{
                width: '100%',  // Faz a imagem ocupar 90% da largura da tela por padrão
                maxWidth: '500px',  // Define um limite máximo para a imagem
                height: 'auto',
                display: 'block',
              }}
            />
          </ModalContent>
        </ModalOverlay>
      )}




    </div>
  );
}
