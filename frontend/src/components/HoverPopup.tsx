import React from 'react';
import { Popup } from 'react-map-gl';
import '../styles/mainPopupStyles.css';
import {HoverPopupProps} from '../types/props';

const HoverPopup: React.FC<HoverPopupProps> =({ hoveredPark, distance, isLargeScreen }) => {
  return (
    hoveredPark && isLargeScreen && (
      <Popup
        latitude={hoveredPark.geometry.coordinates[1]}
        longitude={hoveredPark.geometry.coordinates[0]}
        closeButton={false}
        className="marker-popup-content"
      >
        <p className="font-semibold text-center">{hoveredPark.properties.name}</p>
        <p className="text-center text-xxs">({hoveredPark.properties.tyyppi})</p>
        {distance && <p className="mt-1 text-center font-semibold">{distance.toFixed(2)} Km</p>}
        {/* Add other information you want to display here */}
      </Popup>
    )
  );
};

export default HoverPopup;