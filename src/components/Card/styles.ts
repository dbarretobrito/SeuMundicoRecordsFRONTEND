import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 18rem;
  height: 24rem; /* Remova a altura fixa para permitir ajuste automático */
  background-color: #141414;
  padding: 0;
  margin: 0 auto;
  margin-top: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-sizing: border-box;
  align-items: center;

  @media (max-width: 600px) {
    max-width: 15rem;
  }

  @media (max-width: 480px) {
    width: 10rem;
    height: 13.3rem;
  }
`;

export const CardImage = styled.img`
  width: 90%;
  height: 79%; /* Reduzimos ligeiramente para dar mais espaço ao conteúdo */
  object-fit: cover;
  filter: blur(10px); /* Inicialmente desfocado */
  transition: filter 0.3s ease; /* Suave transição */

  &.loaded {
    filter: blur(0); /* Remove o desfoque quando carregado */
  }
`;

export const CardContent = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 10px 0;
  text-align: center;
  height: 20%; /* Ajuste a altura para acomodar nome e preço */
  font-size: 0.85rem;

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
    margin-top: 2px;
    span {
      font-size: 0.5rem;
    }
  }
`;
