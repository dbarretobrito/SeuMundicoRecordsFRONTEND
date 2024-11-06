import { useState, useRef, useEffect } from 'react';
import { HeaderContainer, LogoLink, NavLink, HamburgerIcon, Menu } from './styles';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import seuMundicoLogoNaked from '../../assets/seuMundicoLogoNaked.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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