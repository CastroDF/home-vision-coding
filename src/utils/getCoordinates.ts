import axios from 'axios';

export const getCoordinates = async (
  address: string
): Promise<[number, number] | null> => {
  try {
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json', {
      params: {
        access_token: import.meta.env.VITE_MAPBOX_TOKEN,
        limit: 1,
      },
    });

    const coords = response.data.features?.[0]?.center;

    if (Array.isArray(coords) && coords.length === 2) {
      return [coords[0], coords[1]] as [number, number];
    }

    return null;
  } catch (err) {
    console.error('Error fetching coordinates:', err);
    return null;
  }
};
