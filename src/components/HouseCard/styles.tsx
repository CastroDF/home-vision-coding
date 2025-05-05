import styled from 'styled-components';

export const Card = styled.article`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  max-width: 400px;
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
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
`;

const shimmer = `
  background: linear-gradient(90deg, #f0f0f0 25%, #e4e4e4 37%, #f0f0f0 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
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
  background-color: #f4f4f4;
  border-radius: 8px;
  color: #666;
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
