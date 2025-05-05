import { HouseResponse } from '../types/house';

const MAX_RETRIES = 3;

export const fetchHouses = async (page = 1, perPage = 10): Promise<HouseResponse> => {
  const url = `https://staging.homevision.co/api_project/houses?page=${page}&per_page=${perPage}`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error(`Fetch failed with status: ${res.status}`);
      const data = await res.json();

      if (!data.ok) throw new Error('API responded with ok: false');

      return data;
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        throw new Error(`Failed after ${MAX_RETRIES} retries: ${(err as Error).message}`);
      }
      await new Promise((r) => setTimeout(r, 500 * attempt)); // Exponential backoff
    }
  }

  throw new Error('Unreachable code'); // TypeScript paranoia
};
