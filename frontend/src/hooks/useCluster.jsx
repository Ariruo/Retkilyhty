
import { useMemo } from "react";
import useSupercluster from "use-supercluster";

function useCluster(points, bounds, zoom) {
  return useMemo(() => {
    return useSupercluster({
      points,
      bounds,
      zoom,
      options: { radius: 150, maxZoom: 20, nodeSize: 10 }
    });
  }, [points, bounds, zoom]);
}

export default useCluster;