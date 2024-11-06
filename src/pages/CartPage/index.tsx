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
    FinishButton,
    CepInput // Certifique-se de importar o estilo para o input de CEP
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
    cep: string; // Adicionando CEP como parâmetro
}

const generateWhatsAppMessage = ({
    cartItems,
    totalAmount,
    cep, // Adicionando CEP
}: GenerateWhatsAppMessageParams): string => {
    const itemDetails = cartItems.map(item =>
        `- ${item.quantity}x ${item.name} (Tamanho ${item.size})`
    ).join('\n');

    return `✷ Olá! Quero concluir minha compra:\n\n${itemDetails}\n\nTotal: R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n Meu CEP é: ${cep}.`;
};

export function CartPage() {
    const cartContext = useContext(CartContext);
    const [cep, setCep] = useState(''); // Estado para armazenar o CEP

    // Verifica se o contexto é indefinido
    if (!cartContext) {
        return <div>Erro ao carregar o carrinho. Por favor, recarregue a página.</div>;
    }

    const { cartItems, removeFromCart, updateQuantity, totalAmount } = cartContext;

    const message = generateWhatsAppMessage({
        cartItems,
        totalAmount,
        cep, // Passando o CEP para a mensagem
    });

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5581999847081';
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
                {cartItems.map((item: CartItem) => (
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
                    <div className="amount-total">
                        <span>Total:</span>
                        <p>R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                )}
            </TotalAmount>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CepInput
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)} // Atualiza o estado com o valor do input
                />
                <FinishButton>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        COMPRAR<FaWhatsapp size={20} />
                    </a>
                </FinishButton>
            </div>
            <AddMoreButton onClick={() => window.location.href = '/'}>
                ADICIONAR MAIS PRODUTOS
            </AddMoreButton>
        </CartContainer>
    );
}
