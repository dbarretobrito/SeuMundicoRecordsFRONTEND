import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;
  height: 0; // Define a altura como 0 para que a proporção de aspecto funcione corretamente
  padding-bottom: 35%; // Proporção 16:9 (9 / 16 = 0.5625 ou 56.25%)
  position: relative; // Adiciona position relative para posicionamento dos slides
  box-sizing: border-box;

  .slick-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .slick-list {
    width: 100%;
    height: 100%;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // Mantém a proporção e cobre o container
  }

  .slick-prev, .slick-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white; // Cor do ícone
    font-size: 24px;
    cursor: pointer;
    z-index: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .slick-prev {
    left: 10px;
    transform: translateY(-50%) translateX(-20px); // Começa fora da página
  }

  .slick-next {
    right: 10px;
    transform: translateY(-50%) translateX(20px); // Começa fora da página
  }

  &:hover .slick-prev, &:hover .slick-next {
    opacity: 1; // Aparece quando o mouse está sobre o carrossel
    transform: translateY(-50%) translateX(0); // Move para dentro da página ao passar o mouse
  }
`;