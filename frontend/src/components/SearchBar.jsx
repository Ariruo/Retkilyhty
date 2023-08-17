import React, { useRef, useEffect } from "react";

export default function SearchBar({
  searchQuery,
  handleInputChange,
  handleSearch,
  searchResults,
  setSelectedPark
}) {
  const searchBarRef = useRef(null);

  const handleClearSearch = () => {
    handleInputChange("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        handleClearSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClearSearch]);

  return (
    <div ref={searchBarRef} className="search-bar mapbox-search absolute z-10">
      <input
        type="text"
        placeholder="Etsi tupaa..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Hae</button>

      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((park) => (
            <div
              key={park.properties.TUPA_ID}
              className="search-result"
              onClick={() => setSelectedPark(park)}
            >
              {park.properties.NAME}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
