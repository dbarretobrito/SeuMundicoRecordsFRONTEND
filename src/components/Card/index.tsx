import { CardContainer, CardImage, CardContent } from './styles';

interface CardProps {
  image: string;
  name: string;
  price: number;
}

export function Card({ image, name, price }: CardProps) {
  return (
    <CardContainer>
      <CardImage src={image} alt={name} draggable="false" />
      <CardContent className='card-content'>
        <p>{name}</p>
        <span>{price.toFixed(2)}</span>
      </CardContent>
    </CardContainer>
  );
}
