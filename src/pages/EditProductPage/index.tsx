import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, UpdateProductResponse } from '../../types/Product';
import axios from 'axios';
import {
  Container,
  Title,
  LogoutButtonStyled,
  Form,
  Label,
  Input,
  Button,
  TagContainer,
  Tag,
  DeleteTagButton,
  ImageThumbnailContainer,
  ImageThumbnail,
  BreadcrumbContainer
} from './styles';

export const EditProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [newTag, setNewTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    // Função que busca o produto do backend
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const productFromBackend = response.data;
        // Verifica se tags são um array, caso contrário, inicializa como array vazio
        setProduct({ ...productFromBackend, tags: Array.isArray(productFromBackend.tags) ? productFromBackend.tags : [] });
        setTags(Array.isArray(productFromBackend.tags) ? productFromBackend.tags : []);
      } catch (err) {
        setError('Erro ao buscar produto.');
        console.error('Erro ao buscar produto:', err);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para deslogar o admin
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Função para fazer upload de imagens usando o Cloudinary
  const handleImageUpload = (callback: (url: string) => void) => {
    const uploadOptions = {
      cloudName: 'dt31tve3m',
      uploadPreset: 'seumundicorecordsupload',
      sources: ['local', 'url', 'facebook', 'instagram'],
      showAdvancedOptions: true,
    };

    window.cloudinary.openUploadWidget(uploadOptions, (_error: unknown, result: { event: string; info: { secure_url: string } }) => {
      if (result && result.event === 'success') {
        callback(result.info.secure_url); // Chama o callback com a URL da imagem
      }
    });
  };

  // Função que lida com o envio do formulário para atualizar o produto
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product) return;

    const updatedProduct = { ...product, tags };

    try {
      const token = localStorage.getItem('adminToken');

      // Envia os dados do produto para o backend para atualização
      const response = await axios.put<UpdateProductResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(response.data.message || 'Produto atualizado com sucesso');
      navigate('/admin/products'); // Redireciona para a lista de produtos após o sucesso
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        setError(errorData.message || 'Erro ao atualizar o produto');
      } else {
        setError('Erro ao atualizar o produto');
      }
      console.error('Erro ao atualizar o produto:', error);
    }
  };

  // Função para adicionar uma nova tag
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Função para excluir uma tag
  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  // Função para excluir imagens
  const handleDeleteImage = (imageType: string) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja deletar esta imagem?');
    if (confirmDelete) {
      setProduct((prev) => prev ? { ...prev, [imageType]: '' } : null);
    }
  };

  return (
    <Container>
      <BreadcrumbContainer>
        <a href="/admin/products">Voltar</a>
      </BreadcrumbContainer>
      <Title>Editar Produto</Title>
      <LogoutButtonStyled onClick={handleLogout}>Sair</LogoutButtonStyled>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {product && (
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nome do Produto:</Label>
            <Input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Preço:</Label>
            <Input
              type="number"
              id="price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags:</Label>
            <div>
              <Input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Adicione uma nova tag"
              />
              <Button type="button" onClick={handleAddTag}>Adicionar</Button>
            </div>
            <TagContainer>
              {tags.map((tag, index) => (
                <Tag key={index}>
                  {tag}
                  <DeleteTagButton type="button" onClick={() => handleDeleteTag(tag)}>X</DeleteTagButton>
                </Tag>
              ))}
            </TagContainer>
          </div>

          <div>
            <Label>Imagem Frontal:</Label>
            <ImageThumbnailContainer>
              {product.front_image && <ImageThumbnail src={product.front_image} alt="Imagem Frontal" />}
              <Button type="button" onClick={() => handleImageUpload((url: string) => setProduct({ ...product, front_image: url }))}>
                Upload
              </Button>
            </ImageThumbnailContainer>
          </div>

          <div>
            <Label>Imagem Traseira:</Label>
            <ImageThumbnailContainer>
              {product.back_image && <ImageThumbnail src={product.back_image} alt="Imagem Traseira" />}
              <div className='image-buttons'>
                <Button type="button" onClick={() => handleImageUpload((url: string) => setProduct({ ...product, back_image: url }))}>
                  Upload
                </Button>
                {product.back_image && <Button type="button" onClick={() => handleDeleteImage('back_image')}>Deletar</Button>}
              </div>
            </ImageThumbnailContainer>
          </div>

          <div>
            <Label>Imagem de Detalhe 1:</Label>
            <ImageThumbnailContainer>
              {product.detail_image && <ImageThumbnail src={product.detail_image} alt="Imagem de Detalhe 1" />}
              <div className='image-buttons'>
                <Button type="button" onClick={() => handleImageUpload((url: string) => setProduct({ ...product, detail_image: url }))}>
                  Upload
                </Button>
                {product.detail_image && <Button type="button" onClick={() => handleDeleteImage('detail_image')}>Deletar</Button>}
              </div>
            </ImageThumbnailContainer>
          </div>

          <div>
            <Label>Imagem de Detalhe 2:</Label>
            <ImageThumbnailContainer>
              {product.detail2_image && <ImageThumbnail src={product.detail2_image} alt="Imagem de Detalhe 2" />}
              <div className='image-buttons'>
                <Button type="button" onClick={() => handleImageUpload((url: string) => setProduct({ ...product, detail2_image: url }))}>
                  Upload
                </Button>
                {product.detail2_image && <Button type="button" onClick={() => handleDeleteImage('detail2_image')}>Deletar</Button>}
              </div>
            </ImageThumbnailContainer>
          </div>

          <Button type="submit">Salvar</Button>
        </Form>
      )}
    </Container>
  );
};
