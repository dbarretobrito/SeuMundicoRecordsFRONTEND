import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  max-width: 18rem;
  background-color: #141414;
  padding: 0.78rem;
  margin: 0 auto;
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-sizing: border-box;

  height: auto; /* Permite ajuste automático */
  
  /* Ajuste para manter a proporção 3:4 nos navegadores que não suportam aspect-ratio */
  @supports not (aspect-ratio: 3 / 4) {
    height: calc(100% * (4 / 3)); /* Ajusta a altura manualmente para simular a proporção */
  }

  /* Ajuste específico para Safari em iPhones */
  @supports not (-webkit-touch-callout: none) {
    height: auto; /* Permite ajuste automático */
    padding-top: 133.33%; /* 4/3 * 100% para simular altura */
  }

  @media (max-width: 600px) {
    max-width: 15rem;
  }

  @media (max-width: 480px) {
    max-width: 13rem;
  }
`;
