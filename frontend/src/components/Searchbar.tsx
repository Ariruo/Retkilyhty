import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { SearchbarProps } from "../types/props";
import { ApiData } from "../types/api";


const Searchbar: React.FC<SearchbarProps> =({ setResults, setInput, input, setShowSearchResults }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const placeholderText = searchBarOpen ? "Etsi kohteita" : "";
  const iconSize = searchBarOpen ? "text-gray-500" : "text-gray-500 text-xl";

  

  async function filterData(value: string) {
    try {
      const response = await axios.get(`${baseUrl}/api/searchbyname/${value}`);
      const fetchedData = response.data;
    

      const preparedData = fetchedData.map((item: ApiData) => ({
        type: "Feature",
        properties: {
          cluster: false,
          name: item.name,
          tyyppi: item.tyyppi,
          maakunta: item.maakunta,
        },
        geometry: {
          type: "Point",
          coordinates: [
            item.latitude,
            item.longitude,
          ],
        },
      }));

      setResults(preparedData);
      setShowSearchResults(value.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleChange(value: string) {
    setInput(value);
    filterData(value);
  }

  const toggleSearchBar = () => {
    setSearchBarOpen((prevOpen) => !prevOpen);
    setShowSearchResults(false);
  };

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current instanceof HTMLElement && !searchBarRef.current.contains(event.target as Node)) {
        setSearchBarOpen(false);
        setShowSearchResults(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`input-wrapper fixed left-10 sm:left-72 first-line:  sm:top-20 pb-2  z-9 h-12 border rounded-md  border-orange-800 shadow-md bg-white top-64 transition-width duration-300 ${
        searchBarOpen ? "w-64" : "w-12"
      }`}
      ref={searchBarRef}
    >
      {searchBarOpen && (
        <input
          className={`bg-transparent focus:outline-none text-gray-600 placeholder-gray-400 w-75 h-29 pl-2 pr-2 mt-4 text-lg`}
          placeholder={placeholderText}
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}

      <FontAwesomeIcon
        icon={faSearch}
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${iconSize} `}
        onClick={toggleSearchBar}
      />
    </div>
  );
}


export default Searchbar;