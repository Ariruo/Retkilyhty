import { useState, useEffect } from 'react';

import { ApiData } from '../types/api';
import { CustomPointFeature } from '../types/api';

function useFetchData(fetchDataFn: () => Promise<ApiData[]>) {
  const [data, setData] = useState<CustomPointFeature[]>([]);
 

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) {
        try {
          const fetchedData = await fetchDataFn();
         
          const preparedData:CustomPointFeature[] = fetchedData.map(item => ({
            type: 'Feature',
            properties: {
              cluster: false,
              name: item.name,
              tyyppi: item.tyyppi,
              maakunta: item.maakunta,
            },
            geometry: {
              type: 'Point',
              coordinates: [item.latitude, item.longitude],
            },
          }));
          setData(preparedData);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Invoke the function
  }, []); // Data length added as dependency

  return [data];
}

export default useFetchData;