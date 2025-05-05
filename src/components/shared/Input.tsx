import styled from 'styled-components';

const Input = styled.input`
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSize.md};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray_200};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_400};
  }
`;

export default Input;
