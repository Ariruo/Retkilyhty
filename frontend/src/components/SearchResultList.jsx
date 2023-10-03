import React from 'react'

function SearchResultList({ results, onResultClick }) {
  return (
    <div className="results-list relative z-10 bg-white flex flex-col shadow-md rounded-lg mt-4 max-h-60 overflow-y-auto left-10 sm:left-56 pl-2 pt-2 w-96 top-56 sm:top-16  " >
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result, result.properties.coordinates)} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
          {result.properties.name} ({result.properties.tyyppi})
        </div>
      ))}
    </div>
  );
}

export default SearchResultList;