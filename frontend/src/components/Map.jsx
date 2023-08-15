import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import * as tupaData from '../../assets/tupadata.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Coordinatecabin from "./Coordinatescabin";


export default function Map() {

  
const [selectedPark, setSelectedPark] = useState(null);

  const closePopup = () => {
    setSelectedPark(null);
  };


  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>


      <ReactMapGL
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 23.72018736381,
          latitude: 68.342938678895,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/ariru/cll6qcd1o00nd01pd9r1x0bwi"
        style={{ width: "100vw", height: "100vh", position: "relative", top: 0, left: 0 }}
        >

{tupaData.features.map(park => (
  <Marker
    key={park.properties.TUPA_ID}
    latitude={park.geometry.coordinates[1]}
    longitude={park.geometry.coordinates[0]}
    offsetTop={-20}
  >
    <button
      className=""
      onClick={e => {
        e.preventDefault();
        setSelectedPark(park);
      }}
    >
    <img src="/cottage.svg" alt="cottage icon" className="w-4 h-4" />
    </button>
    </Marker>
    ))}
 
 {selectedPark && (
          <div className="custom-popup absolute z-10 bg-white border p-4">
            <button className="close-button" onClick={closePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
            <h2 className="text-lg font-semibold">{selectedPark.properties.NAME}</h2>
            <p className="mt-1">Varusteet: {selectedPark.properties.ACCESSORIES}</p>
          
            <Coordinatecabin 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
          />
          </div>
        )}
  </ReactMapGL>
     
    </div>
  );
}