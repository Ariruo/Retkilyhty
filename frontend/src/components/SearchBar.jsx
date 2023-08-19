import { useState } from "react";
import * as tupaData from '../../assets/tupadata.json';

const SearchBar2 = ({setResults}) => {
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
    <div className="input-wrapper">
      
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar2;