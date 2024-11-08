import styled from "styled-components";

// Manter a consistência com o estilo da ProductPage
export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  color: white;
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

// Fundo da página de pesquisa, mesma cor que a ProductPage
export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #111; // Mesma cor de fundo da ProductPage
`;

// Tamanho reduzido da caixa de pesquisa
export const SearchInput = styled.input`
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    }
`;

// Botão de pesquisa ajustado em linha com o input
export const SearchButton = styled.button`
  padding: 8px 12px;
  margin-left: 10px; // Espacamento entre input e botão
  background-color: transparent;
  border: 1px solid #ccc;
  color: white;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #cc2220;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4rem;
  margin: 20px 0;

  & > a {
    width: calc(25% - 16px);
    max-width: 250px;
    text-decoration: none; /* Remova a decoração de texto dos links */
    color: inherit; /* Herdar a cor do pai para consistência */
  }

  @media (max-width: 1200px) {
    & > a {
      width: calc(33.33% - 16px);
    }
  }

  @media (max-width: 900px) {
    & > a {
      width: calc(50% - 16px);
    }
  }

  @media (max-width: 600px) {
    & > a {
      width: 100%;
    }
  }
`;
