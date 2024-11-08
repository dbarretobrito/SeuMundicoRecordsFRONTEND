// src/pages/LoginPage/styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background-color: #141414;
  font-family: 'Poppins', sans-serif;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  width: 25%;
  max-width: 400px;
  font-family: 'Poppins', sans-serif;

  h2{
    color: #141414;
    text-align: center;
    font-size: 18px;
    margin-bottom: 1rem;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-width: 360px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-family: 'Poppins', sans-serif;
  &:focus {
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  color: #fff;
  background-color: #141414;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: 'Poppins', sans-serif;
  &:hover {
    background-color: #3a3a3a;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;
