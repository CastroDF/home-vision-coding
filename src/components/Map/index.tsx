import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { LogoIcon } from '@/assets/icons';
import MapMarker from '@/assets/icons/MapMarker';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
  coords: [number, number];
}

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const MarkerWrapper = styled.div`
  position: relative;

  svg:first-child {
    width: 100%;
    height: 100%;
  }

  .logo {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Map: React.FC<Props> = ({ coords }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: coords,
      zoom: 14,
    });

    const el = document.createElement('div');
    el.innerHTML = renderToStaticMarkup(
      <MarkerWrapper>
        <MapMarker color='#111' size='54px' />
        <div className='logo'>
          <LogoIcon size='24px' />
        </div>
      </MarkerWrapper>
    );

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    }).setLngLat(coords).addTo(map);

    return () => map.remove();
  }, [coords]);

  return <MapContainer ref={ mapRef } />;
};

export default Map;
