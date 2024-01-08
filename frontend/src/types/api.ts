import { GeoJsonProperties } from 'geojson';
import { PointFeature } from 'supercluster';

export interface ApiData  {
    id: number;
    longitude: number;
    latitude: number;
    name: string;
    tyyppi: string;
    maakunta: string;
  }

  export interface ClusterData {
    type: string;
    id: number;
    properties: {
      cluster: boolean;
      cluster_id: number;
      point_count: number;
      point_count_abbreviated: number;
    };
    geometry: {
      type: string;
      coordinates: [number, number];
    };
  }
  
export type CustomProperties = GeoJsonProperties & {
    tyyppi: string;
    maakunta: string;
    cluster: boolean;
    


};

export type CustomPointFeature = PointFeature<CustomProperties>; 



