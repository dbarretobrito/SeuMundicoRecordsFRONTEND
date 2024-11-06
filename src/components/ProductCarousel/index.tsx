
import React from 'react';
import Slider from 'react-slick';
import { CarouselContainer } from './styles';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import fotocarrosselA from '../../assets/fotocarrosselA.jpg';
import fotocarrosselB from '../../assets/fotocarrosselB.jpg';

interface Images {
  id: number;
  image: string;
}

const carousel: Images[] = [
  { id: 1, image: fotocarrosselA },
  { id: 2, image: fotocarrosselB },
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <FaChevronLeft className={className} style={{ ...style }} onClick={onClick} />
);

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <FaChevronRight className={className} style={{ ...style }} onClick={onClick} />
);

export function ProductCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {carousel.map((img) => (
          <div key={img.id}>
            <img src={img.image} alt='' />
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
}
