import React from "react";
import { Marker } from "react-map-gl";

function CustomMarker({ latitude, longitude, handleMarkerHover, iconUrl, handleMarkerLeave, park, setSelectedPark}) {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetTop={-20}
    >
      <button
        className=""
        onMouseEnter={(e) => handleMarkerHover(e, park)}
        onMouseLeave={handleMarkerLeave}
        onClick={(e) => {
            e.preventDefault();
            setSelectedPark(park);
          }}
      >
        <img src={iconUrl} alt="marker icon" style={{ width: '35px', height: '40px' }} />
      </button>
    </Marker>
  );
}

export default CustomMarker;