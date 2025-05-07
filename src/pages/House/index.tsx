import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mapbox from '@/components/Map';
import MapSkeleton from '@/components/Map/Skeleton';
import { Button, Input, Textarea } from '@/components/shared';
import { useHouses } from '@/context/HousesContext';
import { Hero, Info, Section, Form } from './styles';

const HousePage: React.FC = () => {
  const { id } = useParams();
  const numericId = Number(id);

  const { houses, getCoordinates } = useHouses();
  const house = useMemo(() => houses.find((h) => h.id === numericId), [houses, numericId]);

  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loadingCoords, setLoadingCoords] = useState(false);

  useEffect(() => {
    if (!house) return;

    const loadCoords = async () => {
      setLoadingCoords(true);
      const coords = await getCoordinates(house.address);
      setCoords(coords);
      setLoadingCoords(false);
    };

    loadCoords();
  }, [house, getCoordinates]);

  // Scroll to top to improve mobile user experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <MapSkeleton />
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
