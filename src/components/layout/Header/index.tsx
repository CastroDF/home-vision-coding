import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '@/assets/icons';
import { Button } from '@/components/shared';
import { useTheme } from '@/theme';
import { HeaderContainer, Nav } from './styles';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Link to='/'>
        <LogoIcon size='72px' />
      </Link>
      <Nav>
        <Link to='/'>Home</Link>
        <Button onClick={ toggleTheme }>
          { isDark ? 'Light Mode' : 'Dark Mode' }
        </Button>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
