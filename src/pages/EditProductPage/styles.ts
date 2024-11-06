import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.7rem;
  background-color: #141414;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  width: 95vw;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  text-align: center;
`;

export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 8px;
  color: white;
  align-self: flex-start;

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: black;
  }
`;

export const LogoutButtonStyled = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
  align-self: center;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #ff1a1a;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  padding: 0.7rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  width: 100%;
`;

export const Button = styled.button`
  background-color: #323232;
  color: white;
  border: none;
  padding: 0.3rem 0.4rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #3a3a3a;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.3rem 0.6rem;
  font-size: 0.9rem;
  color: #333;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

export const DeleteTagButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: #ff1a1a;
  }
`;

export const ImageThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.2rem;
  margin-top: 1rem; /* Adicionando um espaço superior para as miniaturas */

  .image-buttons{
    display: flex;
    flex-direction: column;
  }
`;

export const ImageThumbnail = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
