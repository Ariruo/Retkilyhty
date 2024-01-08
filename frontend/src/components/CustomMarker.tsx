import React from "react";
import { Marker } from "react-map-gl";
import { CustomMarkerProps } from "../types/props";

const CustomMarker: React.FC<CustomMarkerProps> = ({ latitude, longitude, park, setSelectedPark, iconUrl, setHoveredPark }) => {
  const handleMarkerClick = () => {
    if (setSelectedPark) {
      setSelectedPark(park);
    }
  };

  const handleMouseOver = () => {
    if (setHoveredPark) {
      setHoveredPark(park);
    }
  };

  const handleMouseOut = () => {
    if (setHoveredPark) {
      setHoveredPark(null);
    }
  };

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <button
        className="relative marker-container hover:scale-110"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleMarkerClick}
      >
        <img src={iconUrl} alt="marker icon" style={{ width: "35px", height: "40px" }} />
      </button>
    </Marker>
  );
};

export default CustomMarker;
