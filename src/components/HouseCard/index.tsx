import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { House } from '@/types/house';
import { Card, Image, Info, Price, Fallback } from './styles';

interface Props {
  house: House;
}

const HouseCard: React.FC<Props> = ({ house }) => {
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();


  const handleHouseCardClick = () => {
    navigate(`/house/${house.id}`);
  };

  return (
    <Card onClick={ handleHouseCardClick }>
      { imageError ? (
        <Fallback>
          <img src='/logo.svg' alt='HomeVision logo' />
          <p>Can't load the image</p>
        </Fallback>
      ) : (
        <Image
          src={ house.photoURL }
          alt={ `House at ${house.address}` }
          onError={ () => setImageError(true) }
        />
      ) }
      <Info>
        <h3>{ house.address }</h3>
        <p>🏠 { house.homeowner }</p>
        <Price>${ house.price.toLocaleString() }</Price>
      </Info>
    </Card>
  );
};

export default HouseCard;
