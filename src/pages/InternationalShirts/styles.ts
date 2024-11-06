import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1268px;
  margin: 0 auto;
  padding: 0;

  @media (max-width: 1200px) {
    height: 50vh;
  }

  @media (max-width: 900px) {
    height: 40vh;
  }

  @media (max-width: 768px) {
    height: 35vh;
  }

  @media (max-width: 600px) {
    height: 30vh;
  }

  @media (max-width: 480px) {
    height: 25vh;
  }

  @media (max-width: 360px) {
    height: 20vh;
  }

  h2 {
    margin-bottom: 20px;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  color: white;
  align-self: flex-start;

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


export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  gap: 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }

  @media (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr); /* Ocupa a tela toda em celulares menores */
    gap: 10px;
  }
`;

