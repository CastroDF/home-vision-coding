import { css } from 'styled-components';

export const shimmer = css`
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #cccccc 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  }
`;
