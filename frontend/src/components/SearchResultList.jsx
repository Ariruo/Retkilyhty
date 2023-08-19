import React from 'react'


function SearchResultList({ results, onResultClick }) {
  return (
    <div className="results-list w-full bg-white flex flex-col shadow-md rounded-lg mt-4 max-h-60 overflow-y-auto">
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result)}>
          {result.properties.NAME}
        </div>
      ))}
    </div>
  );
}

export default SearchResultList