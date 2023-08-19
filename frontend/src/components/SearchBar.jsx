import { useState } from "react";
import * as tupaData from '../../assets/tupadata.json';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({setResults}) => {
  const [input, setInput] = useState("");

  const filterData = (value) => {
    const results = tupaData.features.filter((feature) => {
      return (
        value &&
        feature.properties &&
        feature.properties.NAME &&
        feature.properties.NAME.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResults(results); // Log filtered results to the console
    
    
  };

  const handleChange = (value) => {
    setInput(value);
    filterData(value);
  };

  return (
    <div className="input-wrapper w-full h-10 border border-gray-300 rounded-lg px-3 shadow-md bg-white flex items-center">
        <FaSearch id="search-icon" />
      
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;