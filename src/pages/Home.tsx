import React from 'react';
import HouseList from '@/components/HouseList';
import styled from 'styled-components';

const PageContainer = styled.main`
  background-color: ${({ theme }) => theme.colors.gray_50};
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const Home: React.FC = () => {
  return (
    <PageContainer>
      <Header>HomeVision Houses</Header>
      <HouseList />
    </PageContainer>
  );
};

export default Home;
