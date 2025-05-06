import styled from 'styled-components';

export const Hero = styled.section<{ image: string }>`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  height: 35vh;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-image: ${({ image, theme }) =>
    theme.mode === 'dark'
      ? `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5)), url(${image})`
      : `linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.15)), url(${image})`};
  background-size: cover;
  background-position: center;

  color: ${({ theme }) => (theme.mode === 'dark' ? '#fff' : '#fff')};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 60vh;
  }
`;

export const Info = styled.div`
  max-width: 800px;
  padding: 2rem;

  h1 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.extrabold};
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Section = styled.section`
  padding: 3rem 1.5rem;
  max-width: 900px;
  margin: 0 auto;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.gray_600};
  }
`;

export const Map = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3rem;

  input,
  textarea {
    padding: 1rem;
    font-size: ${({ theme }) => theme.fontSize.md};
    border: 1px solid ${({ theme }) => theme.colors.gray_200};
    border-radius: 6px;
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 6px;
    font-size: ${({ theme }) => theme.fontSize.md};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
