import React from 'react';
import HouseList from '@/components/HouseList';
import { PageContainer } from './styles';

const Home: React.FC = () => {
  return (
    <PageContainer>
      <HouseList />
    </PageContainer>
  );
};

export default Home;
