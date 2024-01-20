import { useState, useEffect, useRef } from 'react';
import { ApiData } from '../types/api';
import { CustomPointFeature } from '../types/api';


function useFetchData(fetchDataFn: () => Promise<ApiData[]>, dependencies:string[] = []) {
  const [data, setData] = useState<CustomPointFeature[]>([]);
  const prevTokenRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const latestToken = dependencies[0];

      if (prevTokenRef.current && prevTokenRef.current !== latestToken) {
        // Clear data when the token changes from a defined value to undefined
        setData([]);
      }

      if (dependencies.length === 0 || !prevTokenRef.current || prevTokenRef.current !== latestToken) {
        try {
          const fetchedData = await fetchDataFn();
          const preparedData: CustomPointFeature[] = fetchedData.map((item) => ({
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

      prevTokenRef.current = latestToken;
    };

    fetchData(); // Invoke the function
  }, dependencies); // Dependencies array added as dependency

  return [data];
}

export default useFetchData;