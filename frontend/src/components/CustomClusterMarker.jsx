import React  from "react";
import { Marker } from "react-map-gl";

function CustomClusterMarker({ cluster, backgroundColor, points, onClusterClick, mapRef, setViewState, viewState }) {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { cluster: isCluster, point_count: pointCount } = cluster.properties;

  if (isCluster) {
    const borderRadius = "80%";
    const clusterSize = 35 + (pointCount / points.length) * 45;
    const fontSize = clusterSize / 2; // Adjust the font size based on cluster size
    const style = {
      width: `${clusterSize}px`,
      height: `${clusterSize}px`,
      backgroundColor: backgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius,
      fontSize: `${fontSize}px`, // Set the font size
      fontFamily: "Arial, sans-serif", // Change the font family
      color: "#fff", // Use a valid color code (no extra characters)
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Add a soft shadow
      cursor: "pointer", // Add a pointer cursor for clickability
    };


    const handleClusterClick = () => {
      const newLongitude = cluster.geometry.coordinates[0];
      const newLatitude = cluster.geometry.coordinates[1];
      
      // Get the current zoom level of the map
      const currentZoom = mapRef.current.getMap().getZoom();
    
      // Use the current zoom level + 1 in the flyTo method
      mapRef.current.getMap().flyTo({
        center: [newLongitude, newLatitude],
        zoom: currentZoom + 1, // Increase the zoom level by 1
        essential: true,
      });
    };
    


    console.log(cluster)
    return (
      <Marker latitude={latitude} longitude={longitude}>
        <div style={style} onClick={handleClusterClick}>
          {pointCount}
        </div>
      </Marker>
    );
  }

  // Other handling here for non-cluster points.

  return null;
}

export default CustomClusterMarker;
