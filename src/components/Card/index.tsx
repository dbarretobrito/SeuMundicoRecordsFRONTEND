import { useState } from 'react';
import { CardContainer, CardImage, CardContent } from './styles';

interface CardProps {
  image: string; // URL da imagem
  name: string; // Nome do produto
  price: number | string; // Alterar para permitir string
}

export function Card({ image, name, price }: CardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Verifique se o price é um número e, caso contrário, converta-o
  const formattedPrice =
    typeof price === 'number' ? price.toFixed(2) : parseFloat(price).toFixed(2);

  return (
    <CardContainer>
      <CardImage
        src={image}
        alt={`Imagem de ${name}`}
        loading="lazy"
        className={isLoaded ? 'loaded' : 'loading'}
        onLoad={() => setIsLoaded(true)} // Remove o blur quando a imagem é carregada
      />
      <CardContent>
        <h3>{name}</h3>
        <p>R$ {formattedPrice}</p>
      </CardContent>
    </CardContainer>
  );
}
