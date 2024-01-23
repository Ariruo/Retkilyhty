import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { SearchbarProps } from "../types/props";
import SearchResultList from "./SearchResultList";
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/reducers/userReducer';

const Searchbar: React.FC<SearchbarProps> = ({
  setResults,
  setInput,
  input,
  setShowSearchResults,
  mapRef,
  FilteredData,
  viewState,
  selectedPark,
  setShowCabins,
  setShowKammi,
  setShowSauna,
  setShowLintutorni,
  setShowNahtavyys,
  setShowNuotipaikka,
  setShowPaivatupa,
  setShowRuokailukatos,
  setShowVaraustupas,
  setShowLahde,
  setShowKota,
  setShowLaavu,
  setShowLuola,
  showSearchResults,
  setSelectedPark,
}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const placeholderText = searchBarOpen ? "Etsi kohteita" : "";
  const iconSize = searchBarOpen ? "text-gray-500" : "text-gray-500 text-xl";

  const userToken = useSelector((state) => selectToken(state.user));

  async function filterData(value: string) {
    try {
      const response = await axios.get(`${baseUrl}/api/searchbyname/${value}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

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
      className={`input-wrapper  fixed left-10 sm:left-72 first-line:  sm:top-20 z-9 h-12 border rounded-md  border-orange-800 shadow-md bg-white top-64 transition-width duration-300  ${
        searchBarOpen ? " w-64  " : "w-12 hover:bg-opacity-90 active:scale-x-90  active:scale-y-90  "
      }`}
      ref={searchBarRef}
      title="etsi kohteita" 
    >
      {searchBarOpen && (
        <input
          className={`bg-transparent focus:outline-none text-gray-600 placeholder-gray-400 w-75 h-29 pl-2 pr-2 mt-4 text-lg `}
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
     
    
     {showSearchResults && FilteredData && FilteredData.length > 0 && (
      <div className="pt-1"> 
        <SearchResultList
          FilteredData={FilteredData}
          viewState={viewState}
          results={FilteredData}
          mapRef={mapRef}
          selectedPark={selectedPark}
          input={input} 
          setInput={setInput}
          setShowSearchResults={setShowSearchResults}
          setSelectedPark={setSelectedPark}
          setShowCabins={setShowCabins}
          setShowKammi={setShowKammi}
          setShowSauna={setShowSauna}
          setShowLintutorni={setShowLintutorni}
          setShowNahtavyys={setShowNahtavyys}
          setShowNuotipaikka={setShowNuotipaikka}
          setShowPaivatupa={setShowPaivatupa}
          setShowRuokailukatos={setShowRuokailukatos}
          setShowVaraustupas={setShowVaraustupas}
          setShowLahde={setShowLahde}
          setShowKota={setShowKota}
          setShowLaavu={setShowLaavu}
          setShowLuola={setShowLuola}
        />
      </div>
    )}
  </div>
  );
};

export default Searchbar;
