import axios, { AxiosResponse } from 'axios';
import { ApiData } from '../types/api';

const fetchData = async (url: string, token?: string): Promise<ApiData[]> => {
  try {
    // Create headers object with Authorization header if token is provided
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Use headers in the request
    const response: AxiosResponse<ApiData[]> = await axios.get(url, { headers });

    return response.data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchData;