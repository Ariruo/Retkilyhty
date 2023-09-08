import React from "react";
import { Marker } from "react-map-gl";

function CustomClusterMarker({ cluster, backgroundColor, points  }) {
  const [longitude, latitude] = cluster.geometry.coordinates;
  const { cluster: isCluster, point_count: pointCount } = cluster.properties;

  if (isCluster) {
    const style = {
      width: `${35 + (pointCount / points.length) * 45}px`,
      height: `${35 + (pointCount / points.length) * 45}px`,
      backgroundColor: backgroundColor, // Set the background color from props
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "white",
    };

    return (
      <Marker latitude={latitude} longitude={longitude}>
        <div style={style}>
          {pointCount}
        </div>
      </Marker>
    );
  }

  // Muut käsittelyt tähän, jos haluat erillisen renderöinnin yksittäisille ei-cluster-pisteille.

  return null;
}

export default CustomClusterMarker;