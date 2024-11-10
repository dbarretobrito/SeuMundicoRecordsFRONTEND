import styled from 'styled-components';

// Contêiner principal da aplicação, controlando a estrutura geral do layout
export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  padding-left: 15px; // Ajustado para telas menores
  padding-right: 15px; // Ajustado para telas menores

  header {
    width: 100%;
    margin: 0 auto;
  }

  main {
    width: 100%;
    max-width: 79.25rem;
    margin: 0 auto;
    padding-top: 25px;
  }

  @media (max-width: 1200px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (max-width: 900px) {
    padding-left: 45px;
    padding-right: 45px;
  }

  @media (max-width: 600px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 480px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;
