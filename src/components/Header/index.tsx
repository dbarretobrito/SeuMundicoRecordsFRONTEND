import { HeaderContainer, LogoLink, NavLink } from './styles';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import seuMundicoLogoNaked from '../../assets/seuMundicoLogoNaked.png';

export function Header() {
  return (
    <HeaderContainer>
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
      <nav>
        <div className='nav-links'>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/search"><FaSearch size={22}/></NavLink> {/* Adicione o link da busca */}
          <NavLink to="/cart"><FaShoppingCart size={22}/></NavLink>
        </div>
      </nav>
    </HeaderContainer>
  );
}
