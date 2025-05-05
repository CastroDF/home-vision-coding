import React from 'react';
import type { IconProps } from '@/types/icon';

const MapMarker: React.FC<IconProps> = ({ color = '#000000', size = '24px' }) => {
  return (
    <svg fill={ color } width={ size } viewBox='-3 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='m8.075 23.52c-6.811-9.878-8.075-10.891-8.075-14.52 0-4.971 4.029-9 9-9s9 4.029 9 9c0 3.629-1.264 4.64-8.075 14.516-.206.294-.543.484-.925.484s-.719-.19-.922-.48l-.002-.004z'
      />
    </svg>
  )
};

export default MapMarker;
