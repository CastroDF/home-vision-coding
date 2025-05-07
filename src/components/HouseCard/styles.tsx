import styled from 'styled-components';
import { shimmer } from '@/theme/shared';

export const Card = styled.article`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  max-width: 400px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
`;

export const ImageSkeleton = styled.div`
  height: 220px;
  width: 100%;
  ${shimmer}
`;

export const InfoSkeleton = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Line = styled.div<{ width?: string }>`
  height: 16px;
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  ${shimmer}
`;

export const PriceSkeleton = styled(Line)`
  height: 20px;
  width: 50%;
`;

export const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray_100};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray_600};
  text-align: center;

  img {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    font-weight: 500;
  }
`;
