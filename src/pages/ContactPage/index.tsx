import { Link } from 'react-router-dom';
import { BreadcrumbContainer, MainContainer } from './styles'; // Supondo que você tenha esses estilos prontos.

export function ContactPage() {
  return (
    <MainContainer>
      <BreadcrumbContainer>
        <Link to="/">Home</Link> <span> / Contato</span>
      </BreadcrumbContainer>
      <div className='contact'>
        <p>contato.seumundico@gmail.com /</p>
        <p>
          <a href="https://wa.me/5581999847081" target="_blank" rel="noopener noreferrer">(81)999847081</a>
        </p>
      </div>
    </MainContainer>
  );
}
