import styled from 'styled-components';

export const CartContainer = styled.div`
  padding: 1.25rem;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  min-width: 100%;
  overflow-x: auto;
`;

export const CartHeader = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 2.5rem;
  gap: 0.5rem;
  padding: 0.625rem 0;
  text-align: center;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  font-size: .9rem;
  width: 100%;

  @media (max-width: 480px) {
    width: 40rem;
    font-size: 0.9rem;
  }

  @media (max-width: 840px) {
    width: 40rem;
    font-size: 0.8rem;
  }
`;

export const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr 2.5rem;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0.625rem 0;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 480px) {
    width: 40rem;
  }

  @media (max-width: 840px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;

export const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  justify-self: center;

  @media (max-width: 480px) {
    width: 4.75rem;
    height: 4.75rem;
  }
`;

export const ProductName = styled.p`
  font-weight: bold;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ProductSize = styled.p`
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const QuantityInput = styled.input`
  width: 3.75rem;
  padding: 0.3125rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  text-align: center;
  justify-self: center;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 3.125rem;
  }
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const RemoveButton = styled.button`
  width: 1rem;
  height: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  color: #333;
  cursor: pointer;
  font-size: .6rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  justify-self: center;
  align-self: center;

  &:hover {
    color: darkred;
  }
`;

export const TotalAmount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  justify-content: center;

  span{
    font-weight: 600;
  }

  p {
    font-weight: 300;
  }

  .amount-freight{
    display: flex;
    justify-content: right;
    gap: 0.5rem;
    font-size: 1rem;

    @media (max-width: 480px) {
      text-align: center;
      justify-content: space-between;
    }
  }
  .amount-total{
    display: flex;
    justify-content: right;
    gap: 0.5rem;
    font-size: 1rem;

    @media (max-width: 480px) {
      text-align: center;
      justify-content: space-between;
    }
  }
`;

export const FreightContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: row;
  }
`;

export const FreightInput = styled.input`
  width: 9.5rem;
  height: 3rem;
  padding: 0 .5rem;
  border: none;
  font-family: 'Poppins', sans-serif;
  background-color: #E0E0E1;
  
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 3rem;
    margin-top: 0.625rem;
  }
`;

export const CalculateFreightButton = styled.button`
  width: 7rem;
  height: 3rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  justify-content: center;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #333; /* Volta à cor normal após clique */
  }

  @media (max-width: 480px) {
    width: 50%;
    height: 3rem;
    margin-top: 0.625rem;
  }
`;


export const FinishButton = styled.button`
  display: flex; /* Remova o controle de exibição baseado na prop visible */
  width: 16.5rem;
  background-color: #333;
  color: white;
  height: 3rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  align-self: flex-end;
  align-items: center; /* Alinha itens verticalmente ao centro */
  justify-content: center; /* Alinha itens horizontalmente ao centro */
  gap: 0.5rem; /* Espaçamento entre o texto e o ícone */

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #333; /* Volta à cor normal após clique */
  }

  &:disabled {
    background-color: transparent;
    color: #aaa;
    cursor: not-allowed;
  }

  a {
    color: white; /* Texto branco */
    text-decoration: none; /* Remove sublinhado */
    display: flex; /* Usar flexbox para alinhar o texto e o ícone */
    align-items: center; /* Alinha itens verticalmente ao centro */
    gap: 0.5rem; /* Espaçamento entre o texto e o ícone */
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;



export const AddMoreButton = styled.button`
  width: 16.5rem;
  height: 3rem;
  border: 1px solid #999;
  background-color: #111;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #555;
  }
  @media (max-width: 480px) {
    width: 100%;
  }`;