import { useState, useRef, useEffect } from 'react';
import { HeaderContainer, LogoLink, NavLink, HamburgerIcon, Menu } from './styles';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import seuMundicoLogoNaked from '../../assets/seuMundicoLogoNaked.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado que controla a abertura e fechamento do menu mobile
  const menuRef = useRef<HTMLDivElement>(null);// Referências para o menu e o ícone de hambúrguer para verificar cliques fora
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // Função para alternar o estado do menu (abrir/fechar)
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Função para fechar o menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Função para detectar cliques fora do menu e do ícone de hambúrguer
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target as Node)
    ) {
      closeMenu();
    }
  };

  // Efeito colateral para adicionar e remover o listener de eventos de clique fora
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer>
      <div className='lefticons'>
        <HamburgerIcon ref={hamburgerRef} onClick={toggleMenu}>
          <FaBars className="hamburger-icon" />
        </HamburgerIcon>
        <LogoLink to="/">
          <div className='logo'>
            <img src={seuMundicoLogoNaked} alt="Seu Mundico Records" />
            <div className='logo-text'>
              <p>SEU</p>
              <p>MUNDICO</p>
              <p>RECORDS</p>
            </div>
          </div>
        </LogoLink>
      </div>

      <nav>
        <div className='nav-links'>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/search"><FaSearch size={20} /></NavLink>
          <NavLink to="/cart"><FaShoppingCart size={21} /></NavLink>
        </div>
      </nav>

      <Menu ref={menuRef} $isMenuOpen={isMenuOpen}>
        <p>✷</p>
        <NavLink className="menu-link" to="/national-shirts" onClick={closeMenu}>CAMISAS NACIONAIS</NavLink>
        <NavLink className="menu-link" to="/international-shirts" onClick={closeMenu}>CAMISAS INTERNACIONAIS</NavLink>
        <NavLink className="menu-link" to="/contact" onClick={closeMenu}>CONTATO</NavLink>
      </Menu>
    </HeaderContainer>
  );
}