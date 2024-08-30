import styled from 'styled-components';

// Mantendo CartContainer como está
export const CartContainer = styled.div`
  padding: 1.25rem;
  max-width: 50rem;
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
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;

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

  @media (max-width: 480px) {
    width: 40rem;
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
  border-radius: 0.25rem;
  text-align: center;
  justify-self: center;

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
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  font-size: 0.6rem;
  text-align: center;
  justify-self: center;

  &:hover {
    background-color: #f44336;
    color: white;
  }

  @media (max-width: 480px) {
    width: 1.5625rem;
    height: 1.5625rem;
    font-size: 0.875rem;
  }
`;

export const TotalAmount = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: right;
  margin-top: 1.5rem; /* Aumente o espaço superior se necessário */

  @media (max-width: 480px) {
    text-align: center;
  }
`;

export const AddMoreButton = styled.button`
  background-color: #333;
  width: 12rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.725rem 0.9375rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1.25rem;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.625rem 0;
  }
`;

export const FreightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%; /* Ocupa toda a largura disponível */
  gap: 0.625rem; /* Espaçamento entre o input e o botão */
  margin-top: 0.625rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FreightInput = styled.input`
  width: 11.25rem;
  padding: 0.625rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const CalculateFreightButton = styled.button`
  padding: 0.625rem 1.25rem;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 0.25rem;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-top: 0.625rem;
  }
`;
