import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface MenuProps {
  $isMenuOpen: boolean;
}

export const HeaderContainer = styled.header`
  background-color: white;
  color: #282c34;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  padding: 0 20px;
  box-sizing: border-box; 
  margin: 0 auto;
  width: 100%;
  max-width: 79.25rem;

  .logo {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
    }

    p {
      font-size: 1.18rem;
      font-weight: 600;
      line-height: 1;
    }
  }

  .nav-links {
    display: flex;
    gap: 0.2rem; 
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
      margin: 0 5px; 
    }
  }

  @media (max-width: 480px) {
    .logo p {
      font-size: 0.85rem;
    }

    .nav-links a {
      font-size: 0.76rem;
      margin: 0 2px;
    }

    .nav-links{
      gap: 0.7rem;
    }
  }

  .lefticons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;
  }
`;

export const HamburgerIcon = styled.div`
  display: flex; // Exibir sempre, mas ajustar tamanho para desktop
  flex-direction: column;
  cursor: pointer;

  .hamburger-icon {
    width: 24px; // Largura do ícone
    height: 24px; // Altura do ícone
    color: #282c34; // Cor do ícone

    // Filtros e transformações para ajustar a espessura
    transform: scale(0.9); // Ajusta o tamanho do ícone
  }

  @media (max-width: 768px) {
    .hamburger-icon {
      width: 1rem; // Largura maior para mobile
      height: 1.5rem; // Altura maior para mobile
    }
  }
`;


export const Menu = styled.div<MenuProps>`
  position: absolute;
  top: 4.5rem; 
  left: 5%;
  transform: translateX(-50%);
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 18px 18px;
  z-index: 1000;
  font-weight: 450;

  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? 1 : 0)};
  visibility: ${({ $isMenuOpen }) => ($isMenuOpen ? 'visible' : 'hidden')};
  transform: ${({ $isMenuOpen }) => ($isMenuOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.4s ease, visibility 0.4s, transform 0.4s ease;

  .menu-link {
    display: block;
    margin: 5px 0; 
    text-decoration: none;
    color: #282c34;
    font-size: 0.9rem;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    font-weight: 600;
    text-align: center;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    transform: ${({ $isMenuOpen }) => ($isMenuOpen ? 'translateY(0)' : 'translateY(-10px)')};
  }
`;




export const NavLink = styled(Link)`
  color: #282c34;
  margin: 0 10px; 
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
      width: 44px;
      height: 44px;
    }

    p {
      font-size: 0.98rem;
      font-weight: 600;
      line-height: 1;
    }
  }

  @media (max-width: 480px) {
    .logo {
      img {
        width: 38px;
        height: 38px;
      }

      p {
        font-size: 0.8rem;
        font-weight: 600;
        line-height: 1.05;
      }
    }
  }
`;
