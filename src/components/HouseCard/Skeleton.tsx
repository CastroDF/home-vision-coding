import React from 'react';
import { Card, ImageSkeleton, InfoSkeleton, Line, PriceSkeleton } from './styles';

const HouseCardSkeleton: React.FC = () => (
  <Card data-testid='house-card-skeleton'>
    <ImageSkeleton />
    <InfoSkeleton>
      <Line width='80%' />
      <Line width='60%' />
      <PriceSkeleton />
    </InfoSkeleton>
  </Card>
);

export default HouseCardSkeleton;
