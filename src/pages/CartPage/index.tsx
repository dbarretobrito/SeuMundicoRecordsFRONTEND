import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { 
    CartContainer, 
    CartContent, 
    CartHeader, 
    CartItemContainer, 
    ProductImage, 
    ProductName, 
    ProductSize, 
    QuantityInput, 
    ProductPrice, 
    RemoveButton, 
    TotalAmount, 
    AddMoreButton, 
    FreightContainer, 
    FreightInput, 
    CalculateFreightButton 
} from './styles';

export function CartPage() {
    const cartContext = useContext(CartContext);
    const [cep, setCep] = useState('');
    const [freightCost, setFreightCost] = useState<number | null>(null);

    if (!cartContext) {
        return <div>Erro ao carregar o carrinho. Por favor, recarregue a página.</div>;
    }

    const { cartItems, removeFromCart, updateQuantity, totalAmount } = cartContext;

    const handleCalculateFreight = async () => {
        if (cep.length === 8) {
            try {
                const response = await fetch('http://localhost:3001/calculate-shipping', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        from: { postal_code: "52030010" }, // Ajuste conforme necessário
                        to: { postal_code: cep },
                        package: {
                            height: 15,
                            width: 15,
                            length: 15,
                            weight: 0.9
                        }
                    }),
                });

                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }

                const data = await response.json();
                console.log('Frete calculado:', data.pacPrice); // Adicionado para debug

                if (data.pacPrice) {
                    setFreightCost(parseFloat(data.pacPrice));
                } else {
                    throw new Error('Preço do PAC não encontrado');
                }
            } catch (error) {
                console.error('Erro ao calcular o frete:', error);
                alert('Erro ao calcular o frete. Verifique o console para mais detalhes.');
            }
        } else {
            alert('Por favor, insira um CEP válido com 8 dígitos.');
        }
    };

    return (
        <CartContainer>
            <h2>Seu Carrinho</h2>
            <CartContent>
                <CartHeader>
                    <span>Imagem</span>
                    <span>Produto</span>
                    <span>Tamanho</span>
                    <span>Quantidade</span>
                    <span>Preço</span>
                    <span></span>
                </CartHeader>
                {cartItems.map((item) => (
                    <CartItemContainer key={item.id}>
                        <ProductImage src={item.image} alt={item.name} />
                        <ProductName>{item.name}</ProductName>
                        <ProductSize>{item.size}</ProductSize>
                        <QuantityInput 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))} 
                        />
                        <ProductPrice>R${item.price}</ProductPrice>
                        <RemoveButton onClick={() => removeFromCart(item.id, item.size)}>X</RemoveButton>
                    </CartItemContainer>
                ))}
            </CartContent>
            <TotalAmount>Total: R${totalAmount + (freightCost || 0)}</TotalAmount>
            {freightCost !== null && (
                <TotalAmount>Frete: R${freightCost.toFixed(2)}</TotalAmount>
            )}
            <FreightContainer>
                <FreightInput 
                    type="text" 
                    value={cep} 
                    onChange={(e) => setCep(e.target.value)} 
                    placeholder="Digite o CEP"
                />
                <CalculateFreightButton onClick={handleCalculateFreight}>
                    CALCULAR
                </CalculateFreightButton>
            </FreightContainer>
            <AddMoreButton onClick={() => window.location.href = '/'}>
                Adicionar mais produtos
            </AddMoreButton>
        </CartContainer>
    );
}
