import styled from "styled-components";

export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: white;
  }
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-width: 60rem;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #141414;
  justify-content: center;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 740px) {
    flex-direction: column;
    align-items: center;
    .product-info {
      order: 2;
    }
  }

  .product-info {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 3px;
    word-wrap: break-word;

    h2 {
      display: flex;
      width: 100%;
    }

    @media (max-width: 740px) {
      width: 100%;
      align-items: flex-start;
      text-align: left;
      button {
      }
    }
  }
`;

export const BuyButton = styled.button<{ $isSelected: boolean }>`
  width: 100%; 
  height: 50px; 
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#333' : '#ccc')}; 
  background-color: ${({ $isSelected }) => ($isSelected ? '#333' : 'transparent')}; 
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #333;
    border-color: #333;
  }
`;

export const ProductImage = styled.img`
  width: 50%;
  aspect-ratio: 3.5 / 4;
  object-fit: cover;

  @media (max-width: 740px) {
    width: 100%;
  }
`;

export const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 740px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 0;
  }
  
  @media (max-width: 740px) {
    flex-direction: row;
    gap: 10px;
    order: 1;
    margin-bottom: 10px;
    overflow-x: auto;
    width: 100%;
    justify-content: center;
  }
`;

export const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: white;
  }
`;

export const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (max-width: 740px) {
    width: 100%;
    align-items: center;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const ErrorMessage = styled.div`
  color: #FA5956;
  font-size: 0.9rem;
  margin-top: 10px;
`;

export const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 10px;

  label {
    font-size: 0.9rem;
  }

  div {
    display: flex;
    gap: 10px;
  }

  span {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    font-size: 0.8rem;
    margin-top: 4px;
  }
`;

export const SizeButton = styled.button<{ $isSelected: boolean }>`
  width: 45px; 
  height: 45px; 
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#333' : '#ccc')}; 
  background-color: ${({ $isSelected }) => ($isSelected ? '#333' : 'transparent')}; 
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #333;
    border-color: #333;
  }

  @media (max-width: 740px) {
    width: 40px; 
    height: 40px;
    font-size: 0.8rem;
  }
`;

export const ConfirmationMessage = styled.div`
  width: 100%;
  background-color: #dff0d8;
  color: #3c763d;
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 0.9rem;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  padding: 25px;
  max-width: 85%;
  max-height: 100%;
  overflow: hidden;
`;

export const ModalImage = styled.img`
  width: 40%; /* Ajusta o tamanho da imagem para uma largura melhor em tablets */
  height: auto; /* Mantém a proporção da imagem */
  margin: 0 auto;
  aspect-ratio: 3/4;

  @media (max-width: 1024px) and (min-width: 741px) {
    width: 80%; /* Ajusta a imagem para um tamanho maior em tablets */
  }

  @media (max-width: 740px) {
    width: 100%; /* Mantém a imagem em tela cheia em dispositivos móveis */
  }
`;
