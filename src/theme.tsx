import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledTheme } from 'styled-components';

export const HEADER_HEIGHT = '6rem';

const lightTheme = {
  mode: 'light',
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

const darkTheme = {
  ...lightTheme,
  mode: 'dark',
  colors: {
    ...lightTheme.colors,
    background: '#121212',
    text: '#ffffff',
    white: '#121212',
    gray_100: '#1f1f1f',
    gray_200: '#2c2c2c',
    gray_300: '#444',
    gray_600: '#ccc',
  },
  shadows: {
    ...lightTheme.shadows,
    sm: '0 1px 2px rgba(255, 255, 255, 0.05)',
  },
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark';
  });

  const toggleTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    localStorage.setItem('theme', newValue ? 'dark' : 'light');
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') setIsDark(true);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={ { isDark, toggleTheme } }>
      <StyledTheme theme={ theme }>{ children }</StyledTheme>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
