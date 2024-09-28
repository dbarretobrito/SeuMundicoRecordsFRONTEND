import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 20rem;
  height: 25rem; /* Remova a altura fixa para permitir ajuste automático */
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
  width: 75%;
  height: 100%; /* Reduzimos ligeiramente para dar mais espaço ao conteúdo */
  object-fit: cover;
`;

export const CardContent = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 10px 0;
  text-align: center;
  height: 20%; /* Ajuste a altura para acomodar nome e preço */
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
    font-size: .8rem;
    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 515px) {
    font-size: .75rem;
    span {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    font-size: .5rem;
    margin-top: 2px;
    span {
      font-size: 0.5rem;
    }
  }
`;