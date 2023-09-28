import { useState, useEffect } from "react";

// Custom hook for fetching data
function useFetchData(fetchDataFn) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (data.length === 0) { // Check if data has not been fetched yet
        try {
          const fetchedData = await fetchDataFn();
          const preparedData = fetchedData.map((feature) => ({
            type: "Feature",
            properties: {
              cluster: false,
              name: feature.properties.name,
              tyyppi: feature.properties.tyyppi,
              maakunta: feature.properties.maakunta,
              kunta: feature.properties.kunta,
              coordinates: feature.geometry.coordinates,
            },
            geometry: {
              type: "Point",
              coordinates: [
                feature.geometry.coordinates[1], // Swap latitude and longitude
                feature.geometry.coordinates[0],
              ],
            },
          }));
          setData(preparedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []); // Include 'data' as a dependency to trigger the effect when data changes

  return [data, loading];
}

export default useFetchData;
