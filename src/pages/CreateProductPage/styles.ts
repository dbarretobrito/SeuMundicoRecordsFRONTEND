import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5; /* Fundo claro */
  border-radius: 8px; /* Bordas arredondadas */
  width: 50%;

  h1 {
    color: #323232;
  }

  @media (max-width: 1200px) {
    width: 55%;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 90vw;
  }

  @media (max-width: 480px) {
    width: 90vw;
  }

  @media (max-width: 375px) {
    width: 90vw;
  }
`;

export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  color: white;
  align-self: flex-start;

  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: black;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Aumenta o espaço entre os elementos do formulário */
  width: 80%;
  max-width: 600px; /* Aumenta a largura máxima para uma melhor disposição */
  margin-top: 12px;
  color: black;
  font-weight: 500;

`;

export const ImageButtonsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Para que os rótulos e botões fiquem um em cima do outro */
  align-items: flex-start; /* Centraliza os itens horizontalmente */
  align-items: center; /* Centraliza os itens verticalmente */
  color: black;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 12px; /* Aumenta o padding para mais conforto */
  border: 1px solid black; /* Borda na cor do botão */
  border-radius: 5px;
  font-size: 16px; /* Aumenta o tamanho da fonte */
  transition: border-color 0.3s;

  &:focus {
    border-color: black; /* Cor da borda ao focar */
    outline: none; /* Remove o contorno padrão do input */
  }
`;

export const TextArea = styled.textarea`
  padding: 12px; /* Aumenta o padding para mais conforto */
  border: 1px solid black; /* Borda na cor do botão */
  border-radius: 5px;
  font-size: 16px; /* Aumenta o tamanho da fonte */
  resize: vertical; /* Permite redimensionar verticalmente */
  
  &:focus {
    border-color: black; /* Cor da borda ao focar */
    outline: none; /* Remove o contorno padrão do textarea */
  }
`;

export const Button = styled.button`
  padding: 12px; /* Aumenta o padding para mais conforto */
  background-color: #323232; /* Cor verde para o botão de criar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; /* Aumenta o tamanho da fonte */
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a3a3a; /* Cor mais escura ao passar o mouse */
  }
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 10px; /* Espaçamento entre as miniaturas */
  margin-top: 1px;
  img {
    width: 80px; /* Largura das miniaturas */
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
`;
