// src/pages/AdminProductsPage/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #141414;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  width: 50%;

  @media (max-width: 1200px) {
    width: 55%;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 95vw;
  }

  @media (max-width: 480px) {
    width: 95vw;
  }

  @media (max-width: 375px) {
    width: 95vw;
  }
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
    color: white;
  }
`;

export const Title = styled.h2`
  font-size: 1.3rem;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
  align-self: flex-start;

  @media (max-width: 375px) {
    align-self: flex-start;
  }
`;

export const CreateButton = styled.button`
  background-color: #323232;
  color: white;
  border: none;
  padding: 0.5rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 0 1rem;
  align-self: flex-end;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #3a3a3a;
  }
`;

export const LogoutButtonStyled = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.2rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
  align-self: flex-start;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  &:hover {
    background-color: #ff1a1a;
  }
`;


export const ProductList = styled.ul`
  list-style: none;
  width: 100%;
  max-width: 600px;
  align-self: center;
  padding: 0;
`;

export const ProductItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 70%;

  @media (max-width: 1200px) {
    
  }

  @media (max-width: 900px) {
    
  }

  @media (max-width: 768px) {
    
  }

  @media (max-width: 600px) {
    
  }

  @media (max-width: 480px) {
    
  }

  @media (max-width: 360px) {
    
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ProductName = styled.h3`
  font-size: 1.2rem;
  color: #141414;
  margin: 0;
`;

export const ProductPrice = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  margin-top: 0.4rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;

  &:nth-child(1) {
    background-color: #141414;
    color: #fff;

    &:hover {
      background-color: #3a3a3a;
    }
  }

  &:nth-child(2) {
    background-color: #ff4d4d;
    color: #fff;

    &:hover {
      background-color: #ff1a1a;
    }
  }
`;
