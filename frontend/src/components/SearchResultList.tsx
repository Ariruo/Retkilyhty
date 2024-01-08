
import React from 'react';
import { SearchResultListProps } from '../types/props';
import { ApiData } from '../types/api';
import { PointFeature } from 'supercluster';
import { CustomPointFeature } from '../types/api';

const SearchResultList: React.FC<SearchResultListProps> = ({
  results,
  mapRef,
  setSelectedPark,
  setShowSearchResults, 
  setInput,
  viewState,
  setShowCabins,
  setShowVaraustupas,
  setShowNuotipaikka,
  setShowKota,
  setShowLaavu,
  setShowPaivatupa,
  setShowKammi,
  setShowSauna,
  setShowLintutorni,
  setShowNahtavyys,
  setShowLuola,
  setShowLahde,
  setShowRuokailukatos,
  

  
}) => {
  const handleResultClick = (result: CustomPointFeature) => {
    console.log(result)
    const newSelectedPark: CustomPointFeature = {
      ...result,
      geometry: {
        type: result.geometry.type,
        coordinates: [result.geometry.coordinates[0], result.geometry.coordinates[1]],
      },
    };

    setSelectedPark(newSelectedPark);
    setInput("");
    setShowSearchResults(false);

    const newZoom = viewState.zoom + 1;

    mapRef.current.getMap().easeTo({
      center: [newSelectedPark.geometry.coordinates[0], newSelectedPark.geometry.coordinates[1]],
      zoom: newZoom,
      essential: true,
    });

    switch (newSelectedPark.properties.tyyppi) {
      case 'Laavu':
        setShowLaavu(true);
        break;
      case 'Nuotiopaikka':
        setShowNuotipaikka(true);
        break;
      case 'Autiotupa':
        setShowCabins(true);
        break;
      case 'Varaustupa':
        setShowVaraustupas(true);
        break;
      case 'Kota':
        setShowKota(true);
        break;
      case 'Päivätupa':
        setShowPaivatupa(true);
        break;
      case 'Kammi':
        setShowKammi(true);
        break;
      case 'Sauna':
        setShowSauna(true);
        break;
      case 'Lintutorni':
        setShowLintutorni(true);
        break;
      case 'Nähtävyys':
        setShowNahtavyys(true);
        break;
      case 'Luola':
        setShowLuola(true);
        break;
      case 'Lähde':
        setShowLahde(true);
        break;
      case 'Ruokailukatos':
        setShowRuokailukatos(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="results-list fixed z-8 bg-white flex flex-col shadow-md rounded-lg max-h-60 overflow-y-auto left-10 sm:left-72 pl-2 pt-2 w-64 top-72 sm:top-32">
      {results.map((result: CustomPointFeature, id: Number) => (
        <div key={id.toString()} onClick={() => handleResultClick(result)} className="px-3 py-2 cursor-pointer hover:bg-gray-100">
          {result.properties.name} ({result.properties.tyyppi})
        </div>
      ))}
    </div>
  );
}

export default SearchResultList;
