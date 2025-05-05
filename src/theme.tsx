import { PropsWithChildren } from 'react'
import { ThemeProvider as StyledTheme } from 'styled-components'

const theme = {
  colors: {
    white: '#ffffff',
    gray_50: '#f9fafb',
    gray_100: '#eaeaea',
    gray_200: '#cccccc',
    gray_300: '#9a9a9a',
    gray_400: '#666666',
    gray_500: '#5e5e5e',
    gray_600: '#404040',
    black: '#000000',
    primary: '#5865f3',
    secondary: '#f5367c',
  },
  fontSize: {
    xs: '0.625rem',
    sm: '0.8rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
}

const ThemeProvider = ({ children }: PropsWithChildren) => <StyledTheme theme={ theme }>{ children }</StyledTheme>

export default ThemeProvider
