import React from 'react';
import calculateDistance from '../service/calculateDistance';
import { ClosestParkProps } from '../types/props';
import {GeoJsonProperties} from 'geojson';
import { CustomPointFeature } from '../types/api';

import { PointFeature } from 'supercluster';


const FindClosestMarkerButton: React.FC<ClosestParkProps> = ({
  userCoordinates,
  autiotupaData,
  varaustupaData,
  nuotiopaikkaData,
  kotaData,
  laavuData,
  paivatupaData,
  kammiData,
  saunaData,
  lintutorniData,
  nahtavyysData,
  luolaData,
  lahdeData,
  ruokailukatosData,
  selectedPark,
  setSelectedPark,
  closestParkIndex,
  setClosestParkIndex,
  mapRef,
  setShowCabins,
  setShowKammi,
  setShowLaavu,
  setShowLintutorni,
  setShowLuola,
  setShowNahtavyys,
  setShowNuotipaikka,
  setShowPaivatupa,
  setShowRuokailukatos,
  setShowSauna,
  setShowVaraustupas,
  setShowLahde,
  setShowKota,
  
}) => {
  const setParkShowState = (park: CustomPointFeature) => {
    const { tyyppi } = park.properties;
    switch (tyyppi) {
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

 const handleFindClosestParkbutton = () => {
  if (userCoordinates) {
    const allDataPoints = [
      autiotupaData,
      varaustupaData,
      nuotiopaikkaData,
      kotaData,
      laavuData,
      paivatupaData,
      kammiData,
      saunaData,
      lintutorniData,
      nahtavyysData,
      luolaData,
      lahdeData,
      ruokailukatosData,
    ].flat();

    const getClosestParks = (numParks: number) => {
      const sortedParks = allDataPoints.slice().sort((a, b) => {
        const distanceA = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          a.geometry.coordinates[1],
          a.geometry.coordinates[0]
        );
        const distanceB = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          b.geometry.coordinates[1],
          b.geometry.coordinates[0]
        );
        return distanceA - distanceB;
      });

      return sortedParks.slice(0, numParks);
    };

    if (!selectedPark) {
      const closestParks = getClosestParks(10);
      if (closestParks.length > 0) {
        const newSelectedPark = closestParks[0];
        if (newSelectedPark !== null) {
          setSelectedPark(newSelectedPark);
          setClosestParkIndex(0);
          mapRef.current.getMap().easeTo({
            center: [
              newSelectedPark.geometry.coordinates[0],
              newSelectedPark.geometry.coordinates[1],
            ],
            zoom: 12,
            essential: true,
          });
          setParkShowState(newSelectedPark);
        }
      }
    } else {
      const closestParks = getClosestParks(10);
      const currentIndex = closestParkIndex;
      const nextIndex = ((currentIndex as number) + 1) % closestParks.length; // Circular index
      const newSelectedPark = closestParks[nextIndex];
      if (newSelectedPark !== null) {
        setSelectedPark(newSelectedPark);
        setClosestParkIndex(nextIndex);
        mapRef.current.getMap().easeTo({
          center: [
            newSelectedPark.geometry.coordinates[0],
            newSelectedPark.geometry.coordinates[1],
          ],
          zoom: 12,
          essential: true,
        });
        setParkShowState(newSelectedPark);
      }
    }
  }
};
  return (
    <button
      className="z-8 fixed bg-white p-2  rounded-md shadow-md cursor-pointer top-24 left-10 md:top-20 md:left-40 border border-orange-800 hover:bg-opacity-90 active:bg-orange-800"
      onClick={handleFindClosestParkbutton}
      title="Etsi lähimpiä kohteita" 
    >
      
      <img src="assets/nearby-icon-15.jpg" alt="nearby.png" style={{ width: '30px', height: '30px' }} />
    </button>
  );
};

export default FindClosestMarkerButton;
