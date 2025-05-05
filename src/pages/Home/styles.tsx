import styled from 'styled-components';
import { HEADER_HEIGHT } from '@/theme';

export const PageContainer = styled.main`
  margin-top: ${HEADER_HEIGHT};
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;
