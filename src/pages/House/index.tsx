import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { House } from '@/types/house';
import { getCoordinates } from '@/utils/getCoordinates';
import Mapbox from '@/components/Map';
import { Hero, Info, Section, Form } from './styles';

const HousePage: React.FC = () => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [loadingCoords, setLoadingCoords] = useState(false);

  const HOUSES_LOADED: House[] = JSON.parse(localStorage.getItem('houses') || '[]');

  const { id } = useParams();
  const numericId = Number(id);
  const house = useMemo(() => HOUSES_LOADED.find((h) => h.id === numericId), [id]);

  useEffect(() => {
    if (!house) return;

    const loadCoordinates = async () => {
      const cacheKey = `coords-${house.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setCoords(JSON.parse(cached));
        return;
      }

      setLoadingCoords(true);
      const result = await getCoordinates(house.address);

      if (result) {
        setCoords(result);
        localStorage.setItem(cacheKey, JSON.stringify(result));
      }
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
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows={ 4 } placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </Form>
      </Section>
    </>
  );
};

export default HousePage;
