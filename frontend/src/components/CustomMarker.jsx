import React, { useState } from "react";
import { Marker } from "react-map-gl";

function CustomMarker({ latitude, longitude, park, setSelectedPark, iconUrl, setHoveredPark, distance }) {
  const [hovered, setHovered] = useState(false);

  const handleMarkerClick = () => {
    setSelectedPark(park);
  };

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <div
        className="relative marker-container"
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
      </div>

    </Marker>
  );
}

export default CustomMarker;
