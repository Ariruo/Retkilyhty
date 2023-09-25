import { useMemo } from "react";
import useSupercluster from "use-supercluster";

function useCluster(points, bounds, zoom) {
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 200, maxZoom: 20, nodeSize: 10 }
  });

  return useMemo(() => ({ clusters, supercluster }), [clusters, supercluster]);
}

export default useCluster;
