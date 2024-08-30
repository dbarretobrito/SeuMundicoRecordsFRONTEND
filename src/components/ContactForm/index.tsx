import { useState } from 'react';
import  { Form, Input, Button } from './styles';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const whatsappLink = `https://api.whatsapp.com/send?phone=NUMERO_DO_WHATSAPP&text=Nome: ${formState.name}%0AEmail: ${formState.email}%0AMensagem: ${formState.message}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome" 
        name="name"
        value={formState.name} 
        onChange={handleChange} 
      />
      <Input 
        type="email" 
        placeholder="Email" 
        name="email"
        value={formState.email} 
        onChange={handleChange} 
      />
      <Input 
        type="text" 
        placeholder="Mensagem" 
        name="message"
        value={formState.message} 
        onChange={handleChange} 
      />
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
