import React from 'react'

function SearchResultList({ results, onResultClick }) {
  return (
    <div className="results-list w-full absolute z-10 bg-white flex flex-col shadow-md rounded-lg mt-4 max-h-60 overflow-y-auto pt-2"
    style={{ top: "48px", left: "15px", paddingLeft: "8px", paddingTop: "8px", width: "35%" }}>
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result, result.properties.coordinates)} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
          {result.properties.name} ({result.properties.tyyppi})
        </div>
      ))}
    </div>
  );
}

export default SearchResultList;