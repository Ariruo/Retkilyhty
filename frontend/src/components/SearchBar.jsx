import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Searchbar({ setResults, setInput, input, setShowSearchResults }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const placeholderText = searchBarOpen ? "Etsi kohteita" : "";
  const iconSize = searchBarOpen ? "text-gray-500" : "text-gray-500 text-xl";

  async function filterData(value) {
    try {
      const response = await axios.get(`${baseUrl}/api/searchbyname/${value}`);
      const fetchedData = response.data;

      const preparedData = fetchedData.map((item) => ({
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
            parseFloat(item.latitude),
            parseFloat(item.longitude),
          ],
        },
      }));

      setResults(preparedData);
      setShowSearchResults(value.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleChange(value) {
    setInput(value);
    filterData(value);
  }

  const toggleSearchBar = () => {
    setSearchBarOpen((prevOpen) => !prevOpen);
    setShowSearchResults(false);
  };

  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
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


