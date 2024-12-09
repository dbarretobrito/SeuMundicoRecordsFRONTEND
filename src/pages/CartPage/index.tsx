import { useContext, useState } from 'react'; // Importa hooks do React
import { CartContext } from '../../context/CartContext'; // Importa o contexto do carrinho
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
    CepInput
} from './styles';
import { FaWhatsapp } from 'react-icons/fa';

// Define a interface para os itens do carrinho
interface CartItem {
    id: number;
    name: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
}

// Define os parâmetros para a função que gera a mensagem do WhatsApp
interface GenerateWhatsAppMessageParams {
    cartItems: CartItem[];
    totalAmount: number;
    cep: string; // Adicionando CEP como parâmetro
}

// Função para gerar a mensagem a ser enviada pelo WhatsApp
const generateWhatsAppMessage = ({
    cartItems,
    totalAmount,
    cep, // Adicionando CEP
}: GenerateWhatsAppMessageParams): string => {
    // Formata os detalhes dos itens do carrinho
    const itemDetails = cartItems.map(item =>
        `- ${item.quantity}x ${item.name} (Tamanho ${item.size})`
    ).join('\n');

    // Retorna a mensagem formatada
    return `✷ Olá! Quero concluir minha compra:\n\n${itemDetails}\n\nTotal: R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n Meu CEP é: ${cep}.`;
};

// Componente de página do carrinho
export function CartPage() {
    const cartContext = useContext(CartContext); // Usa o contexto do carrinho para acessar os dados

    const [cep, setCep] = useState(''); // Estado para armazenar o CEP digitado pelo usuário

    // Verifica se o contexto é indefinido
    if (!cartContext) {
        return <div>Erro ao carregar o carrinho. Por favor, recarregue a página.</div>;
    }

    // Desestrutura funções e valores do contexto do carrinho
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = cartContext;

    // Gera a mensagem a ser enviada pelo WhatsApp
    const message = generateWhatsAppMessage({
        cartItems,
        totalAmount,
        cep, // Passando o CEP para a mensagem
    });

    // Codifica a mensagem para uso em URLs
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5581999847081';
    const isDesktop = () => {
        return !/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    };

    const whatsappLink = isDesktop()
        ? `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

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