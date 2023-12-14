import { useState, useEffect } from 'react';

function useFetchData2(fetchDataFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) {
        try {
          const fetchedData = await fetchDataFn();
         
          const preparedData = fetchedData.map(item => ({
            type: 'Feature',
            properties: {
              cluster: false,
              name: item.name,
              tyyppi: item.tyyppi,
              maakunta: item.maakunta,
            },
            geometry: {
              type: 'Point',
              coordinates: [parseFloat(item.latitude), parseFloat(item.longitude)],
            },
          }));
          setData(preparedData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Invoke the function
  }, []); // Data length added as dependency

  return [data, loading];
}

export default useFetchData2;