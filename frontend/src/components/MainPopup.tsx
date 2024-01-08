import React from 'react';
import { Popup } from 'react-map-gl';
import { IconButton } from '@mui/material'; 
import './popup.css';
import Coordinatecabin from "./Coordinatescabin";
import { FaTimes } from 'react-icons/fa'; // Replace with your icon library

import {MainPopupProps} from '../types/props';




  const MainPopup: React.FC<MainPopupProps> = ({ selectedPark, setSelectedPark, distance }) => {
    if (!selectedPark || !setSelectedPark)  {
    return null; // Render nothing if selectedPark is null
  }

  return (
    selectedPark && (
      <Popup
        latitude={selectedPark.geometry.coordinates[1]}
        longitude={selectedPark.geometry.coordinates[0]}
        anchor="bottom"
        closeOnClick={false}
        onClose={() => {
        setSelectedPark(null);
        }}
        closeButton={false}
      >
        <IconButton
          aria-label="close"
          onClick={() => {
            setSelectedPark(null);
          }}
          sx={{
            position: 'absolute',
            top: '-4px',
            right: '-5px',
            zIndex: '1',
            '&:hover': {
              transform: 'scale(0.9)', // Reduce the size when hovered
            },
          }}
        >
          <FaTimes className="h-6 w-6 text-gray-700 hover:text-gray-900" />
        </IconButton>

        <div style={{ marginTop: '1rem' }}>
          <h2 className="text-center text-2xl font-semibold">{selectedPark.properties.name}</h2>
          <h2 className="mt-1 text-center text-small font-semibold">
            ({selectedPark.properties.tyyppi})
          </h2>
        </div>
        {distance && <p className="mt-1 text-center font-semibold">{distance.toFixed(2)} Km</p>}
        <Coordinatecabin
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
        />
      </Popup>
    )
  );
};

export default MainPopup;