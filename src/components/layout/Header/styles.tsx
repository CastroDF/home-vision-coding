import styled from 'styled-components';
import { HEADER_HEIGHT } from '@/theme';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${HEADER_HEIGHT};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;

  // Desktop
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 10rem;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;