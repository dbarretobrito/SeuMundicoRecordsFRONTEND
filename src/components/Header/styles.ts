import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: white;
  color: #282c34;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  padding: 0 20px;
  box-sizing: border-box; // Inclui padding e bordas na largura total do elemento
  margin: 0 auto;
  width: 100%; // Garante que o header ocupe toda a largura disponível

  // Limite a largura máxima do header para corresponder ao conteúdo principal
  max-width: 79.25rem;

  .logo {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 1.18rem;
      font-weight: 600;
      line-height: 1;
    }
  }

  .nav-links {
    display: flex;
    gap: 0.5rem; /* Ajuste o espaçamento entre os elementos */
    align-items: center;
  }

  @media (max-width: 1200px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (max-width: 900px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  @media (max-width: 768px) {
    .logo p {
      font-size: 1rem;
    }

    .nav-links a {
      font-size: 0.8rem;
      margin: 0 5px; /* Ajuste o espaçamento entre os elementos */
    }
  }

  @media (max-width: 480px) {
    .logo p {
      font-size: 0.85rem;
    }

    .nav-links a {
      font-size: 0.7rem;
      margin: 0 2px; /* Ajuste o espaçamento entre os elementos */
    }
  }
`;

export const NavLink = styled(Link)`
  color: #282c34;
  margin: 0 10px; /* Ajuste o espaçamento entre os elementos */
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }

`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  .logo {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      font-size: 1.18rem;
      font-weight: 600;
      line-height: 1;
    }
  }
`;
