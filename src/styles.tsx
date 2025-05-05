import styled from 'styled-components';

export const Main = styled.main`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 1400px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;
