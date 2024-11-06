import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }

  .contact {
    display: flex;
    font-size: 0.75rem;
    flex-direction: row;
    gap: 2px;
    justify-content: center;
  }
`;

export const BreadcrumbContainer = styled.div`
  font-size: 0.85rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 16px;
  color: black; /* Ou a cor que você preferir */

  a {
    color: white; /* Ou a cor que você preferir */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  span {
    color: white; /* Ou a cor que você preferir */
  }
`;
