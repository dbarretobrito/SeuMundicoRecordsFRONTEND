import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  max-width: 18rem; /* Limita a largura máxima */
  height: auto; /* Ajuste automático da altura */
  background-color: #141414;
  padding: 0.78rem;
  margin: 0 auto;
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-sizing: border-box;

  /* Para garantir a proporção 3:4 em navegadores compatíveis */
  @supports (aspect-ratio: 3 / 4) {
    aspect-ratio: 3 / 4; /* Mantém a proporção 3:4 */
  }

  /* Para navegadores que não suportam aspect-ratio */
  @supports not (aspect-ratio: 3 / 4) {
    height: calc(100% * (4 / 3)); /* Ajusta a altura manualmente para simular a proporção */
  }

  @media (max-width: 600px) {
    max-width: 15rem;
  }

  @media (max-width: 480px) {
    max-width: 13rem;
  }
`;

export const CardImage = styled.img`
  width: 100%; /* A largura da imagem será sempre 100% */
  height: auto; /* Altura automática para manter a proporção */
  max-height: 85%; /* Limita a altura máxima da imagem */
  object-fit: cover; /* Garante que a imagem preencha o espaço mantendo a proporção */

  /* Para garantir a proporção do contêiner */
  @supports not (-webkit-touch-callout: none) {
    aspect-ratio: inherit; /* Mantém a proporção do contêiner */
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    max-height: 80%; /* Ajusta ligeiramente a altura para tablets */
  }
`;

export const CardContent = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 10px 0;
  text-align: center;
  height: auto; /* Ajuste automático da altura */
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
    color: white;
  }

  span {
    font-size: 0.85rem;
    color: #888;
    margin-top: 3px;
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
