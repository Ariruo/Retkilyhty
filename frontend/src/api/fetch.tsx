import axios, { AxiosResponse } from 'axios';
import { ApiData } from '../types/api';



const fetchData = async (url: string): Promise<ApiData[]> => {
  try {
    const response: AxiosResponse<ApiData[]> = await axios.get(url);
    console.log(response.data);
    return response.data || [];
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default fetchData;
