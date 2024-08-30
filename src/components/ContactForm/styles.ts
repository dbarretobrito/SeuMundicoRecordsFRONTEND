import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #282c34;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3c3f47;
  }
`;
