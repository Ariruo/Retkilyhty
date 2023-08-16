import React from "react";

export default function SearchBar({ searchQuery, handleInputChange, handleSearch, searchResults }) {
  return (
    <div className="search-bar mapbox-search">
      <input
        type="text"
        placeholder="Search for a park..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>

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