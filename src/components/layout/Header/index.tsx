import React from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon } from '@/assets/icons';
import { Button } from '@/components/shared';
import { HeaderContainer, Nav } from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Link to='/'>
        <LogoIcon size='72px' />
      </Link>
      <Nav>
        <Link to='/'>Home</Link>
        <Button>Dark Mode</Button>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
