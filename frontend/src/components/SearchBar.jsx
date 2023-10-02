import axios from "axios";
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

const SearchBar = ({ setResults, setInput, input, setShowSearchResults,})  => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [showSidebarLabel, setShowSidebarLabel] = useState(false);
  const placeholderText = searchBarOpen ? "Etsi kohteita" : "";
  const iconSize = searchBarOpen ? "text-gray-500" : "text-gray-500 text-xl"; // Adjust the icon size as needed

  const filterData = async (value) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/all?search=${value}`);
      
      setResults(response.data.features);
      setShowSearchResults(value.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    filterData(value);
    setShowSearchResults(value.length > 0);
  };

  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
  };

  
  return (

    
    
    <div
      className={`input-wrapper fixed left-10 sm:left-56 first-line:left-10  sm:top-20   z-10 h-12 border rounded-md shadow-md bg-white top-60 transition-width duration-300 ${
        searchBarOpen ? 'w-64' : 'w-12'
      }`}
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
};

export default SearchBar;
