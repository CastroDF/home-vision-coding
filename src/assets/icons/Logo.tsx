import React from 'react';
import type { IconProps } from '@/types/icon';

const Logo: React.FC<IconProps> = ({ size = '32px' }) => (
  <svg width={ size } viewBox='0 0 32 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M31.9998 19.3732L19.9395 8.81274V19.3732H31.9998Z' fill='#5865f3' />
    <path d='M12.2743 15.3484L9.88086 13.5969V19.3731H17.7772L12.2743 15.3484Z' fill='#5865f3' />
    <path d='M9.88067 11.6925L10.7566 11.2647L18.4521 7.50922L9.87695 0L9.88067 11.6925Z' fill='#5865f3' />
    <path d='M10.3711 12.6365L18.8682 18.8533V8.48828L10.3711 12.6365Z' fill='#5865f3' />
    <path d='M8.80579 0L0 7.85583V19.3584H8.80579V0Z' fill='#5865f3' />
  </svg>
);

export default Logo;
