import { useContext, useState } from 'react';
import axios from 'axios';
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
    CalculateFreightButton,
    FinishButton
} from './styles';
import { FaWhatsapp } from 'react-icons/fa';

interface CartItem {
    id: number;
    name: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
}

interface GenerateWhatsAppMessageParams {
    cartItems: CartItem[];
    totalAmount: number;
    shippingCost: number | null;
    zipCode: string;
}

const generateWhatsAppMessage = ({
    cartItems,
    totalAmount,
    shippingCost,
    zipCode
}: GenerateWhatsAppMessageParams): string => {
    const itemDetails = cartItems.map(item =>
        `- ${item.quantity}x ${item.name} (Tamanho ${item.size})`
    ).join('\n');

    return `✷ Olá! Quero concluir minha compra:\n\n${itemDetails}\n\nCEP: ${zipCode}\nFrete: R$ ${(shippingCost || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nTotal: R$ ${(totalAmount + (shippingCost || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
};

export function CartPage() {
    const cartContext = useContext(CartContext);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [cep, setCep] = useState('');
    const [freightCost, setFreightCost] = useState<number | null>(null);
    const [isCepValid, setIsCepValid] = useState(false);

    if (!cartContext) {
        return <div>Erro ao carregar o carrinho. Por favor, recarregue a página.</div>;
    }

    const { cartItems, removeFromCart, updateQuantity, totalAmount } = cartContext;

    const validateCep = (cep: string) => {
        const cepRegex = /^[0-9]{8}$/;
        return cepRegex.test(cep);
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCep(value);
        setIsCepValid(validateCep(value)); // Valida o CEP em tempo real
    };

    const handleCalculateFreight = async () => {
        if (isCepValid) {
            try {
                // Use a URL do backend que está hospedado no Railway
                const response = await axios.post(`${backendUrl}/calculate-shipping`, {
                    from: { postal_code: "52030010" },
                    to: { postal_code: cep },
                    package: {
                        height: 15,
                        width: 15,
                        length: 15,
                        weight: 0.9
                    }
                });

                if (response.data.pacPrice) {
                    setFreightCost(parseFloat(response.data.pacPrice));
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

    const message = generateWhatsAppMessage({
        cartItems,
        totalAmount,
        shippingCost: freightCost,
        zipCode: cep
    });
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5583999269613';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <CartContainer>            
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
                        <ProductPrice>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</ProductPrice>
                        <RemoveButton onClick={() => removeFromCart(item.id, item.size)}>X</RemoveButton>
                    </CartItemContainer>
                ))}
            </CartContent>
            <TotalAmount>
                {cartItems.length > 0 && (
                    <>
                        {freightCost !== null && (
                            <div className="amount-freight">
                                <p>Frete:</p>
                                <p>R$ {freightCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        )}
                        <div className="amount-total">
                            <span>Total:</span>
                            <p>R$ {(totalAmount + (freightCost || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </>
                )}
            </TotalAmount>
            <FreightContainer>
                <FreightInput
                    type="text"
                    value={cep}
                    onChange={handleCepChange} // Usando a nova função de handle para validar o CEP
                    placeholder="Digite o CEP"
                />
                <CalculateFreightButton onClick={handleCalculateFreight} disabled={!isCepValid}>
                    CALCULAR
                </CalculateFreightButton>
            </FreightContainer>
            <FinishButton 
                style={{ display: cartItems.length > 0 && freightCost ? 'flex' : 'none' }} 
                disabled={freightCost === null}
            >
                {freightCost !== null ? (
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        CONCLUIR <FaWhatsapp size={20} />
                    </a>
                ) : null}
            </FinishButton>
            <AddMoreButton onClick={() => window.location.href = '/'}>
                ADICIONAR MAIS PRODUTOS
            </AddMoreButton>
        </CartContainer>
    );
}
