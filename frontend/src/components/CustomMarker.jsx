import React from "react";
import { Marker } from "react-map-gl";

function CustomMarker({ latitude, longitude, park, setSelectedPark, handleMarkerHover, handleMarkerLeave, iconUrl }) {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetTop={-20}
    >
      {/* Transparent div acting as a hitbox */}
      <div
        className="invisible-hitbox"
        
      >
        <button
          className="w-9 h-15 inline-block relative"
          onMouseOver={(e) => handleMarkerHover(e, park)}
        onMouseOut={handleMarkerLeave}
          onClick={(e) => {
            e.preventDefault();
            setSelectedPark(park);
          }}
        >
          <img src={iconUrl} alt="marker icon" style={{ width: '35px', height: '40px' }} />
        </button>
      </div>
    </Marker>
  );
}

export default CustomMarker;