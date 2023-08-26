import { useState, useCallback } from "react";

// Custom hook for toggling state and fetching data
function useToggleAndFetchData(initialState, fetchDataFn) {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const toggleAndFetch = useCallback(async () => {
    setState(prevState => !prevState);

    if (!state) {
      try {
        const fetchedData = await fetchDataFn();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [fetchDataFn, state]);

  return [state, data, toggleAndFetch];
}

export default useToggleAndFetchData;