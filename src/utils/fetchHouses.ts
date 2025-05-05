import axios from 'axios';
import { HouseResponse } from '../types/house';
import { retryWithBackoff } from './retryWithBackoff';

export const fetchHouses = async (
  page = 1,
  perPage = 10
): Promise<HouseResponse> => {
  const url = 'https://staging.homevision.co/api_project/houses';

  return retryWithBackoff(async () => {
    const res = await axios.get<HouseResponse>(url, {
      params: { page, per_page: perPage },
      validateStatus: () => true,
    });

    if (res.status !== 200) throw new Error(`Request failed with status: ${res.status}`);
    if (!res.data.ok) throw new Error('API responded with ok: false');

    return res.data;
  });
};
