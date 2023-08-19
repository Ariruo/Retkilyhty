import React from 'react'


function SearchResultList({ results, onResultClick }) {
  return (
    <div className='results-list'>
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result)}>
          {result.properties.NAME}
        </div>
      ))}
    </div>
  );
}

export default SearchResultList