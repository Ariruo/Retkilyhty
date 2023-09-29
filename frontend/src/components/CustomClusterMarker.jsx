import React from "react";
import { Marker } from "react-map-gl";

function CustomClusterMarker({ cluster, backgroundColor, points }) {
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
    };

    return (
      <Marker latitude={latitude} longitude={longitude}>
        <div style={style}>{pointCount}</div>
      </Marker>
    );
  }

  // Other handling here for non-cluster points.

  return null;
}

export default CustomClusterMarker;