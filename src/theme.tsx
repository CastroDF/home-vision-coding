import { PropsWithChildren } from 'react';
import { ThemeProvider as StyledTheme } from 'styled-components';

export const HEADER_HEIGHT = '6rem';

const theme = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    background: '#f9fafb',
    text: '#212529',
    muted: '#6c757d',
    primary: '#5865f3',
    secondary: '#f5367c',

    gray_50: '#f9fafb',
    gray_100: '#eaeaea',
    gray_200: '#cccccc',
    gray_300: '#9a9a9a',
    gray_400: '#666666',
    gray_500: '#5e5e5e',
    gray_600: '#404040',
  },
  fontSize: {
    xs: '0.625rem',
    sm: '0.8rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontFamily: `'Inter', sans-serif`,
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.1)',
  },
};

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <StyledTheme theme={ theme }>{ children }</StyledTheme>
);

export default ThemeProvider;
