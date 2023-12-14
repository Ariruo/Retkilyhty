import React from 'react'

function SearchResultList({ results, onResultClick }) {
  return (
    <div className="results-list fixed z-8 bg-white flex flex-col shadow-md rounded-lg max-h-60  overflow-y-auto left-10 sm:left-72 pl-2 pt-2 w-64 top-72 sm:top-32  " >
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result, result.properties.coordinates)} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
          {result.properties.name} ({result.properties.tyyppi})
        </div>
      ))}
    </div>
  );
}

export default SearchResultList;