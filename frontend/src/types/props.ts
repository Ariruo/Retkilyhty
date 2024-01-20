import { ApiData, CustomPointFeature,ClusterData  } from './api';
import { PointFeature } from 'supercluster'

import React from 'react';



export interface AddLocationProps {
  initialLongitude: number;
  initialLatitude: number;
  
  mapRef: React.MutableRefObject<any>
  

}

export interface userCoordinates {
  latitude: number;
  longitude: number;
  zoom?: number;
}


  


export interface FlyToOptions {
  center: [number, number];
  zoom: number;
  essential: boolean;
  // Other options for flyTo method
}









export interface WeatherIconProps {
  icon: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export interface AddLocationButtonProps {
  toggleAddLocation: () => void;
}

export interface CustomClusterMarkerProps {
  backgroundColor: string;
  points: CustomPointFeature[] // Adjust the type according to your points data structure
  mapRef: React.MutableRefObject<any>;
  cluster: CustomPointFeature | ClusterData;
  point_count?: number;
}



export interface CustomMarkerProps {
  latitude: number;
  longitude: number;
  park: CustomPointFeature | null;
  setSelectedPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>> | null;
  iconUrl: string;
  setHoveredPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>> | null;
  handleMarkerLeave: (event: any, park: ApiData) => void;
  distance?: number;
  hoveredPark: CustomPointFeature | null;
}

export interface ClosestParkProps {
  userCoordinates: { latitude: number; longitude: number } | null;
  autiotupaData: CustomPointFeature[];  // Adjust the type according to your data structure
  varaustupaData: CustomPointFeature[]; // Update types as needed
  nuotiopaikkaData: CustomPointFeature[]; // Update types as needed
  kotaData: CustomPointFeature[]; // Update types as needed
  laavuData: CustomPointFeature[]; // Update types as needed
  paivatupaData: CustomPointFeature[]; // Update types as needed
  kammiData: CustomPointFeature[]; // Update types as neededd
  saunaData: CustomPointFeature[]; // Update types as neededd
  lintutorniData: CustomPointFeature[]; // Update types as needed
  nahtavyysData: CustomPointFeature[]; // Update types as needed
  luolaData: CustomPointFeature[];// Update types as needed
  lahdeData: CustomPointFeature[]; // Update types as needed
  ruokailukatosData: CustomPointFeature[] // Update types as needed
  selectedPark: CustomPointFeature | null; // Update types as needed
  closestParkIndex: number | undefined;
  setClosestParkIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  mapRef: React.RefObject<any>; // Update 'any' with appropriate map ref type
  setShowCabins: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKammi: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLaavu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLintutorni: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLuola: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNahtavyys: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNuotipaikka: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaivatupa: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRuokailukatos: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSauna: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVaraustupas: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLahde: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKota: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>>;
 
}

export interface Coordinates {
  longitude: number;
  latitude: number;
 
}

export interface HoverPopupProps {
  hoveredPark: any; // Replace 'any' with the actual type if possible
  distance: number;
  isLargeScreen: boolean;
}


export interface MainPopupProps {
  selectedPark: CustomPointFeature | null; // Replace 'any' with the actual type if possible
  setSelectedPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>> | null;
  distance: number;
}

export interface SearchbarProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  results:  CustomPointFeature[];
  mapRef: React.MutableRefObject<any>; // Change 'any' to the specific type if available
  selectedPark: CustomPointFeature | null;
  
  setSelectedPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>>;
  FilteredData: CustomPointFeature[]
  showSearchResults: boolean;
  
  
  viewState: { zoom: number }; // Change the type to the appropriate one
  setShowCabins: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVaraustupas: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNuotipaikka: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKota: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLaavu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaivatupa: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKammi: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSauna: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLintutorni: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNahtavyys: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLuola: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLahde: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRuokailukatos: React.Dispatch<React.SetStateAction<boolean>>;
 
}


export interface SearchResultListProps {
  results:  CustomPointFeature[];
  mapRef: React.MutableRefObject<any>; // Change 'any' to the specific type if available
  selectedPark: CustomPointFeature | null;
  setShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPark: React.Dispatch<React.SetStateAction<CustomPointFeature | null>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  viewState: { zoom: number }; // Change the type to the appropriate one
  setShowCabins: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVaraustupas: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNuotipaikka: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKota: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLaavu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaivatupa: React.Dispatch<React.SetStateAction<boolean>>;
  setShowKammi: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSauna: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLintutorni: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNahtavyys: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLuola: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLahde: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRuokailukatos: React.Dispatch<React.SetStateAction<boolean>>;
  FilteredData: CustomPointFeature[]

}

export interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
  showCabins: boolean;
  setShowCabins: React.Dispatch<React.SetStateAction<boolean>>;
  showVaraustupas: boolean;
  setShowVaraustupas: React.Dispatch<React.SetStateAction<boolean>>;
  showNuotipaikka: boolean;
  setShowNuotipaikka: React.Dispatch<React.SetStateAction<boolean>>;
  showKota: boolean;
  setShowKota: React.Dispatch<React.SetStateAction<boolean>>;
  showLaavu: boolean;
  setShowLaavu: React.Dispatch<React.SetStateAction<boolean>>;
  showPaivatupa: boolean;
  setShowPaivatupa: React.Dispatch<React.SetStateAction<boolean>>;
  showKammi: boolean;
  setShowKammi: React.Dispatch<React.SetStateAction<boolean>>;
  showSauna: boolean;
  setShowSauna: React.Dispatch<React.SetStateAction<boolean>>;
  showLintutorni: boolean;
  setShowLintutorni: React.Dispatch<React.SetStateAction<boolean>>;
  showNahtavyys: boolean;
  setShowNahtavyys: React.Dispatch<React.SetStateAction<boolean>>;
  showLuola: boolean;
  setShowLuola: React.Dispatch<React.SetStateAction<boolean>>;
  showLahde: boolean;
  setShowLahde: React.Dispatch<React.SetStateAction<boolean>>;
  showRuokailukatos: boolean;
  setShowRuokailukatos: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen : React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showUser: boolean;
  setShowUser: React.Dispatch<React.SetStateAction<boolean>>;
  showRegister: boolean;
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CoordinateCabinProps {
  latitude: number;
  longitude: number;
  
}