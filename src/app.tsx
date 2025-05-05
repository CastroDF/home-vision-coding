import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThemeProvider from '@/theme';
import { Main } from '@/styles';
import Home from '@/pages/Home';
import HousePage from '@/pages/House';
import Header from '@/components/layout/Header';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/house/:id' element={ <HousePage /> } />
        </Routes>
      </Main>
    </ThemeProvider>
  );
};

export default App;