import styled from 'styled-components';
import { shimmer } from '@/theme/shared';

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

export const MarkerWrapper = styled.div`
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

export const MapSkeletonContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  ${shimmer}
`;
