import styled, { css } from 'styled-components';

interface ButtonProps {
  outlined?: boolean;
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;

  ${({ theme, outlined }) =>
    outlined
      ? css`
          background: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};

          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `
      : css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: none;

          &:hover {
            background: ${theme.colors.secondary};
          }
        `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export default Button;
