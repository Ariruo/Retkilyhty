import { useState, useCallback } from "react";

// Custom hook for toggling state and fetching data
function useToggleAndFetchData(initialState, fetchDataFn,) {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const toggleAndFetch = useCallback(async () => {
    setState(prevState => !prevState);

    if (!state) {
      try {
        const fetchedData = await fetchDataFn();
        const preparedData = fetchedData.map(feature => ({
          type: "Feature",
          properties: { cluster: false, name: feature.properties.name, tyyppi: feature.properties.tyyppi },
          geometry: {
            type: "Point",
            coordinates: [
              feature.geometry.coordinates[1], // Swap latitude and longitude
              feature.geometry.coordinates[0]
            ]
          }
        }));
        setData(preparedData);
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [fetchDataFn, state]);

  return [state, data, toggleAndFetch];
}

export default useToggleAndFetchData;