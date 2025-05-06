import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCoordinates } from '@/utils/getCoordinates';
import Mapbox from '@/components/Map';
import { Button, Input, Textarea } from '@/components/shared';
import { useHouses } from '@/context/HousesContext';
import { Hero, Info, Section, Form } from './styles';

const HousePage: React.FC = () => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loadingCoords, setLoadingCoords] = useState(false);

  const { houses } = useHouses();
  const { id } = useParams();
  const numericId = Number(id);

  const house = useMemo(() => houses.find((h) => h.id === numericId), [houses, numericId]);

  useEffect(() => {
    if (!house) return;

    const loadCoordinates = async () => {
      setLoadingCoords(true);
      const result = await getCoordinates(house.address);
      if (result) setCoords(result);
      setLoadingCoords(false);
    };

    loadCoordinates();
  }, [house]);

  if (!house) return <p>House not found</p>;

  return (
    <>
      <Hero image={ house.photoURL }>
        <Info>
          <h1>{ house.address }</h1>
          <p>🏠 { house.homeowner }</p>
          <h2>${ house.price.toLocaleString() }</h2>
        </Info>
      </Hero>

      <Section>
        <h3>Location Preview</h3>
        { coords ? (
          <Mapbox coords={ coords } />
        ) : loadingCoords ? (
          <p>Loading map...</p>
        ) : (
          <p>Could not load coordinates for this address.</p>
        ) }

        <Form onSubmit={ (e) => e.preventDefault() }>
          <h3>Contact the Agent</h3>
          <Input type='text' placeholder='Your Name' required />
          <Input type='email' placeholder='Your Email' required />
          <Textarea rows={ 4 } placeholder='Your Message' required />
          <Button type='submit'>Send Message</Button>
        </Form>
      </Section>
    </>
  );
};

export default HousePage;
