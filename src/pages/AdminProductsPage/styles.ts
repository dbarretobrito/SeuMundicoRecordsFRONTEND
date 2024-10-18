import styled from 'styled-components';

export const LogoutButtonStyled = styled.button`
  background-color: #ff4d4d; /* cor de fundo do botão */
  color: white; /* cor do texto */
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px; /* espaço abaixo do botão */
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1a1a; /* cor de fundo no hover */
  }
`;
