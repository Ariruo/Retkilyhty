import { useState, useEffect } from "react";


import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setResults, setInput, input, setShowSearchResults })  => {
  

  const filterData = (value) => {
    fetch("http://localhost:9000/api/allcabinspoints")
      .then((response) => response.json())
      .then((data) => {
        const results = data.features.filter((feature) => {
          return (
            value &&
            feature.properties &&
            feature.properties.name &&
            feature.properties.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
        console.log(data)
        console.log(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    filterData(value);
    setShowSearchResults(value.length > 0);
  };

  return (
    <div className="input-wrapper absolute z-10 h-10 border rounded-md px-3 shadow-md bg-white flex items-center">
      <div className="flex items-center p-1.5 pr-3 pt-2 rounded-md bg-gray-200">
        <FaSearch className="text-gray-500" />
      </div>
      <input
        className="bg-transparent focus:outline-none text-gray-600 placeholder-gray-400 flex-grow"
        placeholder="Search"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
};

export default SearchBar;
