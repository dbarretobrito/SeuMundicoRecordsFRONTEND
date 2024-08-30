import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1268px;
  margin: 0 auto;
  padding: 0; // Certifique-se de que não há padding extra

  @media (max-width: 1200px) {
        height: 50vh;
        aspect-ratio: inherit;
      }

      @media (max-width: 900px) {
        height: 40vh;
        aspect-ratio: inherit;
      }

      @media (max-width: 768px) {
        height: 35vh;
        aspect-ratio: inherit;
      }

      @media (max-width: 600px) {
        height: 30vh;
        aspect-ratio: inherit;
      }

      @media (max-width: 480px) {
        height: 25vh;
        aspect-ratio: inherit;
      }

      @media (max-width: 360px) {
        height: 20vh;
        aspect-ratio: inherit;
      }

  h2 {
    margin-bottom: 20px;
  }

  a {
    color: inherit; /* Mantém a cor do link inalterada */
    text-decoration: none; /* Remove o sublinhado */
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr); 
    padding: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;
