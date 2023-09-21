import { useState, useEffect, useCallback } from "react";

// Custom hook for toggling state and fetching data
function useToggleAndFetchData(initialState, fetchDataFn) {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const toggleAndFetch = useCallback(async () => {
    setState(prevState => !prevState);
  }, []);

  useEffect(() => {
    if (state) {
      try {
        const fetchData = async () => {
          const fetchedData = await fetchDataFn();
          const preparedData = fetchedData.map(feature => ({
            type: "Feature",
            properties: {
              cluster: false,
              name: feature.properties.name,
              tyyppi: feature.properties.tyyppi,
              maakunta: feature.properties.maakunta,
              kunta: feature.properties.kunta,
              coordinates: feature.geometry.coordinates
            },
            geometry: {
              type: "Point",
              coordinates: [
                feature.geometry.coordinates[1], // Swap latitude and longitude
                feature.geometry.coordinates[0]
              ]
            }
          }));
          setData(preparedData);
        };

        fetchData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [fetchDataFn, state]);

  return [state, data, toggleAndFetch];
}

export default useToggleAndFetchData;
