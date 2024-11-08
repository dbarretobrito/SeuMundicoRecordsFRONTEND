import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #141414;
    color: white;
  }
  
  /* Suaviza o movimento da barra de rolagem */
  html {
    scroll-behavior: smooth; /* Aplica movimento suave */
  }

  /* Estilizando a barra de rolagem */
  ::-webkit-scrollbar {
    width: 9px; /* largura da barra de rolagem */
  }

  ::-webkit-scrollbar-track {
    background: #1e1e1e; /* cor do fundo da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb {
    background: #3c434a; /* cor da parte que rola */
    border-radius: 4px; /* bordas arredondadas */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* cor da parte que rola quando em hover */
  }

  /* Para navegadores que não suportam ::-webkit-scrollbar */
  body {
    scrollbar-color: #282c34 #f1f1f1; /* (thumb, track) para Firefox */
  }
`;
