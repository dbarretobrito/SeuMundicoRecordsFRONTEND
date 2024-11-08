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
  max-height: 300px; /* Ajuste a altura conforme necessário */
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

  @media (max-width: 480px) {
    width: 100%;
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

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-width: 840px) {
    width: 40rem;
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
  position: sticky; /* Para que fique fixo ao rolar */
  top: 0; /* Para que fique sempre visível no topo do item */
  right: 0; /* Alinhar à direita */

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

export const FinishButton = styled.button`
  display: flex; /* Remova o controle de exibição baseado na prop visible */
  width: 14.5rem;
  background-color: #333;
  color: white;
  height: 3rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  align-self: flex-end;
  align-items: center; 
  justify-content: center; 
  gap: 0.5rem; 

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
    font-size: 1rem;
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

// Adicione isso ao seu arquivo de estilos
export const CepInput = styled.input`
height: 2.99rem;
padding: 10px;
border: none;
font-size: 15.5px;
width: 150px; // Ajuste a largura conforme necessário
&:focus {
  outline: none;
}
`;