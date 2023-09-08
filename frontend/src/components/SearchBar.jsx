
import axios from "axios";


import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setResults, setInput, input, setShowSearchResults })  => {
  
    const filterData = async (value) => {
      try {
        const response = await axios.get(`http://localhost:9000/api/allcabinspoints?search=${value}`);
        
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

  return (
    <div className="input-wrapper absolute z-10 h-10 border rounded-md px-3 shadow-md bg-white flex items-center">
      <div className="flex items-center p-1.5 pr-3 pt-2 rounded-md">
        <FaSearch className="text-gray-500" />
      </div>
      <input
        className="bg-transparent focus:outline-none text-gray-600 placeholder-gray-400 flex-grow"
        placeholder="Etsi autiotupia"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
};

export default SearchBar;
