import axios from "axios";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setResults, setInput, input, setShowSearchResults, onClick, toggleSidebar })  => {
  
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
    <div className="input-wrapper absolute z-10 h-12 border rounded-md px-3 shadow-md bg-white flex items-center left-4 top-4">
      <div className="flex items-center p-1.5 pr-3 pt-2 rounded-md">
        <FontAwesomeIcon icon={faBars} className={`absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer pr-2`} onClick={toggleSidebar} />
      </div>
      <input
        className="bg-transparent focus:outline-none text-gray-600 placeholder-gray-400 flex-grow"
        placeholder="Etsi autiotupia"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      
        
      
         <FaSearch className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={onClick} />
      
    </div>
  );
};

export default SearchBar;
