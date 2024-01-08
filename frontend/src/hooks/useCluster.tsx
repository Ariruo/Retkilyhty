import { useMemo } from "react";
import useSupercluster from "use-supercluster"
import {  PointFeature,  } from "supercluster"
import {GeoJsonProperties, BBox, } from "geojson"
import { CustomPointFeature } from "../types/api"

function useCluster(points:CustomPointFeature[], bounds: BBox, zoom: number) {
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 200, maxZoom: 20, nodeSize: 10 }
  });
 
  return useMemo(() => ({ clusters, supercluster }), [clusters, supercluster]);
}

export default useCluster;