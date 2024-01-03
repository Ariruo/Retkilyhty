import React, { useState } from "react";
import { Marker } from "react-map-gl";

function CustomMarker({ latitude, longitude, park, setSelectedPark, iconUrl, setHoveredPark, distance }) {
 
  
  const handleMarkerClick = () => {
    setSelectedPark(park);
  };

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <button
        className="relative marker-container hover:scale-110 "
        onMouseOver={() => {
          setHovered(true);
          setHoveredPark(park);
        }}
        onMouseOut={() => {
          setHovered(false);
          setHoveredPark(null);
        }}
        
        onClick={handleMarkerClick}
      >
        <img src={iconUrl} alt="marker icon" style={{ width: "35px", height: "40px" }} />
      </button>

    </Marker>
  );
}

export default CustomMarker;
