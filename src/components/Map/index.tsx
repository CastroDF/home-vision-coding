import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTheme } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { LogoIcon } from '@/assets/icons';
import MapMarker from '@/assets/icons/MapMarker';
import { MarkerWrapper, MapContainer } from './styles';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
  coords: [number, number];
}

const Map: React.FC<Props> = ({ coords }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!mapRef.current) return;

    const styleUrl =
      theme.mode === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11';

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: styleUrl,
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
  }, [coords, theme.mode]);

  return <MapContainer ref={ mapRef } />;
};

export default Map;
