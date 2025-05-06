import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.tsx';
import { HousesProvider } from './context/HousesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HousesProvider>
        <App />
      </HousesProvider>
    </BrowserRouter>
  </StrictMode>
);
