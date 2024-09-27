import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  max-width: 18rem; /* Limita a largura máxima */
  background-color: #141414;
  padding: 0 0.78rem;
  margin: 0.5rem 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-sizing: border-box;

  /* Para garantir a proporção 3:4 em navegadores com problemas de suporte */
  @supports not (-webkit-touch-callout: none) {
    width: 100%;
    height: 87%; /* 75% da largura mantém a proporção 3:4 */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* Garante que não ultrapasse a largura da tela */
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const CardImage = styled.img`
  width: 100%; /* A largura da imagem será sempre 100% */
  height: 87%; /* Mantém a altura proporcional à largura (3:4) */
  object-fit: cover; /* Garante que a imagem preencha o espaço mantendo a proporção */

  @supports not (-webkit-touch-callout: none) {
    width: 100%;
    height: 75%; /* Aplica a mesma lógica de 3:4 no Safari */
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 80%; /* Ajusta ligeiramente a altura para tablets */
  }
`;


export const CardContent = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 10px 0;
  text-align: center;
  height: auto;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    color: white;
  }

  span {
    font-size: 0.85rem;
    color: #888;
    margin-top: 3px;
    display: block;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem;
    span {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 665px) {
    font-size: 0.8rem;
    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 515px) {
    font-size: 0.75rem;
    span {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
    margin-top: 5px;
    span {
      font-size: 0.6rem;
    }
  }
`;

