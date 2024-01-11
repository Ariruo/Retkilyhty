import React, { Suspense } from 'react';
import { Popup } from 'react-map-gl';
import { IconButton, CircularProgress } from '@mui/material'; // Import CircularProgress from Material-UI

import { FaTimes } from 'react-icons/fa'; // Replace with your icon library

import { MainPopupProps } from '../types/props';

const LazyLoadedCoordinatecabin = React.lazy(() => import('./Coordinatescabin'));

const MainPopup: React.FC<MainPopupProps> = ({ selectedPark, setSelectedPark, distance }) => {
  if (!selectedPark || !setSelectedPark) {
    return null;
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
            top: '-0px',
            right: '-0px',
            zIndex: '1',
            '&:hover': {
              transform: 'scale(0.9)',
            },
            '&:hover:focus-visible': {
              outline: '0,1px solid gray',
            },
          }}
        >
          <FaTimes className="h-5 w-5 text-black active:scale-x-75" />
        </IconButton>

        <div style={{ marginTop: '1rem' }}>
          <h2 className="text-center text-2xl font-semibold">{selectedPark.properties.name}</h2>
          <h2 className="mt-1 text-center text-small font-semibold">
            ({selectedPark.properties.tyyppi})
          </h2>
        </div>
        {distance && <p className="mt-1 text-center font-semibold">{distance.toFixed(2)} Km</p>}
        
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}><CircularProgress style={{ color: 'black' }} /></div>}>
          <LazyLoadedCoordinatecabin
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
          />
        </Suspense>
      </Popup>
    )
  );
};

export default MainPopup;
