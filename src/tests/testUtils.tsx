import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/theme';
import { HousesProvider } from '@/context/HousesContext';

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HousesProvider>
    <MemoryRouter>
      <ThemeProvider theme={ lightTheme }>
        { children }
      </ThemeProvider>
    </MemoryRouter>
  </HousesProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
