import ThemeProvider from '@/theme';
import { Main } from '@/styles';
import Home from '@/pages/Home';

const App = () => {
  return (
    <ThemeProvider>
      <Main>
        <Home />
      </Main>
    </ThemeProvider>
  );
};

export default App;
