import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  flex-basis: calc(33.33% - 1rem); /* Cards ocupam 1/3 da largura com espaçamento */
  max-width: 18rem; /* Limita a largura máxima */
  height: auto;
  aspect-ratio: 3 / 4; /* Mantém a proporção 3:4 */
  background-color: #141414;
  padding: 0.78rem;
  margin: 0.5rem; /* Reduz o margin para melhor espaçamento */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-sizing: border-box;

  /* Compatibilidade com Safari no iPhone */
  @supports not (-webkit-touch-callout: none) {
    aspect-ratio: unset; /* Remove o aspect-ratio em navegadores problemáticos */
    height: auto;
  }

  @media (max-width: 768px) {
    flex-basis: calc(50% - 1rem); /* Ocupa metade da tela em tablets */
    max-width: 100%; /* Garante que não ultrapasse a largura da tela */
  }

  @media (max-width: 600px) {
    flex-basis: calc(50% - 0.5rem); /* Ocupa metade da tela em celulares maiores */
    max-width: 100%;
  }

  @media (max-width: 480px) {
    flex-basis: calc(100% - 1rem); /* Ocupa toda a largura da tela em celulares pequenos */
    max-width: 100%;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 85%;
  object-fit: cover;

  @supports not (-webkit-touch-callout: none) {
    aspect-ratio: unset; /* Remove o aspect-ratio no Safari iOS */
    height: auto;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 80%; /* Ajusta ligeiramente a altura para tablets */
  }
`;

export const CardContent = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 10px 0;
  text-align: center;
  height: 20%;
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

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.9rem; /* Ajuste no tamanho da fonte para tablets */
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
