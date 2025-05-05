import styled from 'styled-components';

export const Main = styled.main`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    max-width: 1400px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;
