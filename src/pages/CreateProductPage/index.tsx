import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  TextArea,
  Button,
  ImageButtonsContainer,
  ImagePreviewContainer,
  BreadcrumbContainer,
} from './styles';

export const CreateProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [tags, setTags] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [detailImage, setDetailImage] = useState<string | null>(null);
  const [detail2Image, setDetail2Image] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (callback: (url: string) => void) => {
    const uploadOptions = {
      cloudName: 'dt31tve3m',
      uploadPreset: 'seumundicorecordsupload',
      sources: ['local', 'url', 'facebook', 'instagram'],
      showAdvancedOptions: true,
    };

    window.cloudinary.openUploadWidget(
      uploadOptions,
      (_error: unknown, result: { event: string; info: { secure_url: string } }) => {
        if (result && result.event === 'success') {
          callback(result.info.secure_url);
        }
      }
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newProduct = {
      name,
      price: Number(price),
      description,
      year: Number(year),
      tags: tags.split(',').map((tag) => tag.trim()),
      front_image: frontImage,
      back_image: backImage,
      detail_image: detailImage,
      detail2_image: detail2Image,
    };

    try {
      const token = localStorage.getItem('adminToken');

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message || 'Produto criado com sucesso');
      navigate('/admin/products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        setError(errorData.message || 'Erro ao criar o produto');
      } else {
        setError('Erro ao criar o produto');
      }
      console.error('Erro ao criar o produto:', error);
    }
  };

  return (
    <Container>
      <BreadcrumbContainer>
        <a href="/admin/products">Voltar</a>
      </BreadcrumbContainer>
      <h1>Criar Produto</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome do produto (* Obrigatório)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Preço (* Obrigatório)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        <TextArea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Ano"
          value={year || ''}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <Input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />

        {/* Imagem Frontal */}

        <div className='images-container'>
          <ImageButtonsContainer>
            <label htmlFor="front_image">Imagem Frontal (* Obrigatória):</label>
            {frontImage && (
              <ImagePreviewContainer>
                <img src={frontImage} alt="Imagem Frontal" />
              </ImagePreviewContainer>
            )}
            <Button type="button" onClick={() => handleImageUpload(setFrontImage)}>
              Upload
            </Button>
          </ImageButtonsContainer>
          {/* Imagem Traseira */}
          <ImageButtonsContainer>
            <label htmlFor="back_image">Imagem Traseira:</label>
            {backImage && (
              <ImagePreviewContainer>
                <img src={backImage} alt="Imagem Traseira" />
              </ImagePreviewContainer>
            )}
            <Button type="button" onClick={() => handleImageUpload(setBackImage)}>
              Upload
            </Button>
          </ImageButtonsContainer>
          {/* Imagem Detalhe */}
          <ImageButtonsContainer>
            <label htmlFor="detail_image">Imagem Detalhe:</label>
            {detailImage && (
              <ImagePreviewContainer>
                <img src={detailImage} alt="Imagem Detalhe" />
              </ImagePreviewContainer>
            )}
            <Button type="button" onClick={() => handleImageUpload(setDetailImage)}>
              Upload
            </Button>
          </ImageButtonsContainer>
          {/* Imagem Detalhe 2 */}
          <ImageButtonsContainer>
            <label htmlFor="detail2_image">Imagem Detalhe 2:</label>
            {detail2Image && (
              <ImagePreviewContainer>
                <img src={detail2Image} alt="Imagem Detalhe 2" />
              </ImagePreviewContainer>
            )}
            <Button type="button" onClick={() => handleImageUpload(setDetail2Image)}>
              Upload
            </Button>
          </ImageButtonsContainer>
        </div>

        <Button type="submit">Criar Produto</Button>

        {/* Exibição das mensagens de sucesso e erro */}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
    </Container>
  );
};
