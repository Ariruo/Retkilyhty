import React, { useState, useEffect, useRef, Dispatch,SetStateAction   } from "react";
import Map, {  GeolocateControl} from "react-map-gl";

import './popup.css';

import getUserCoordinates from "../service/getUserCoordinates";
import calculateDistance from "../service/calculateDistance"; 
import SearchResultList from "./SearchResultList";
import FindClosestMarkerButton from "./FindClosestMarkerButton";
import SidebarButton from "./SidebarButton";
import Addlocation from "./AddLocation";
import fetchData from "../api/fetch";
import useFetchData from "../hooks/toggleAndFetchData";
import CustomMarker from "./CustomMarker";
import Searchbar from "./Searchbar";
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomClusterMarker from "./CustomClusterMarker";
import useCluster from "../hooks/useCluster";
import Sidebar from "./Sidebar";
import autiotupaIcon from '../../assets/autiotupa.png'
import nuotiopaikkaIcon from '../../assets/tulipaikka3.png'
import varaustupaIcon from '../../assets/varaustupa.png'
import lintutorniIcon from '../../assets/lintutorni.png'
import laavuIcon from '../../assets/laavu.png'
import kotaIcon from '../../assets/kota.png'
import paivatupaIcon from '../../assets/autiotupa.png'
import kammiIcon from '../../assets/kammi.png'
import saunaIcon from '../../assets/sauna.png'
import nahtavyysIcon from '../../assets/nähtävyys.png'
import luolaIcon from '../../assets/luola.png'
import lahdeIcon from '../../assets/lähde.png'
import ruokailukatosIcon from '../../assets/ruokailukatos.png'
import Addlocationbutton from "./AddLocationButton";

import { CustomPointFeature,ClusterData,CustomProperties } from "../types/api";
import { Coordinates, userCoordinates, } from "../types/props";
import MainPopup from "./MainPopup";
import HoverPopup from "./HoverPopup";
import { PointFeature } from 'supercluster';
import { BBox} from 'geojson';


export default function Mapp() {

const MapID =  import.meta.env.VITE_MAPID || import.meta.env.VITE_MAPBOX_TOKEN 
const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000"; 

const nuotiopaikkaEndpoint = `${baseUrl}/api/nuotiopaikka`;
const autiotupaEndpoint = `${baseUrl}/api/autiotupa`;
const varaustupaEndpoint = `${baseUrl}/api/varaustupa`;
const kotaEndpoint = `${baseUrl}/api/kota`;
const laavuEndpoint = `${baseUrl}/api/laavu`;
const paivatupaEndpoint = `${baseUrl}/api/päivätupa`;
const kammiEndpoint = `${baseUrl}/api/kammi`;
const saunaEndpoint = `${baseUrl}/api/sauna`;
const lintutorniEndpoint = `${baseUrl}/api/lintutorni`;
const nahtavyysEndpoint = `${baseUrl}/api/nähtävyys`;
const luolaEndpoint = `${baseUrl}/api/luola`;
const lahdeEndpoint = `${baseUrl}/api/lähde`;
const ruokailukatosEndpoint = `${baseUrl}/api/ruokailukatos`;

const [open, setOpen] = useState<boolean>(false);
const [distance, setDistance] = useState<number | null>(null);
const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
const [closestParkIndex, setClosestParkIndex] = useState<number | undefined>();
const [showAddLocation, setShowAddLocation] = useState<boolean>(false);
const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

const [FilteredData, setFilteredData] = useState<CustomPointFeature[]>([]);
const [selectedPark, setSelectedPark]: [CustomPointFeature | null, Dispatch<SetStateAction<CustomPointFeature | null>>] = useState<CustomPointFeature | null>(null);

const [input, setInput] = useState<string>("");
const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
const [hoveredPark, setHoveredPark]:  [CustomPointFeature | null, Dispatch<SetStateAction<CustomPointFeature | null>>] = useState<CustomPointFeature | null>(null);

const [viewState, setViewState] = useState({
  longitude: 25.0, 
  latitude: 64.5, 
  zoom: 5, 
});

  const [showCabins, setShowCabins] = useState(true);
  const [nuotiopaikkaData]= useFetchData(async () => await fetchData(nuotiopaikkaEndpoint));

  const [autiotupaData] = useFetchData(async () => await fetchData(autiotupaEndpoint));
  const [showNuotipaikka, setShowNuotipaikka] = useState(true);
  const [varaustupaData ] = useFetchData(async () => await fetchData(varaustupaEndpoint));
  const [showVaraustupas, setShowVaraustupas] = useState(true);
  const [kotaData] = useFetchData(async () => await fetchData(kotaEndpoint));
  const [showKota, setShowKota] = useState(true);
  const [laavuData] = useFetchData(async () => await fetchData(laavuEndpoint));
  const [showLaavu, setShowLaavu] = useState(true);
  const [paivatupaData] = useFetchData(async () => await fetchData(paivatupaEndpoint));
  const [showPaivatupa, setShowPaivatupa] = useState(true);
  const [kammiData] = useFetchData(async () => await fetchData(kammiEndpoint));
  const [showKammi, setShowKammi] = useState(true);
  const [saunaData] = useFetchData(async () => await fetchData(saunaEndpoint));
  const [showSauna, setShowSauna] = useState(true);
  const [lintutorniData] = useFetchData(async () => await fetchData(lintutorniEndpoint));
  const [showLintutorni, setShowLintutorni] = useState(true);
  const [nahtavyysData] = useFetchData(async () => await fetchData(nahtavyysEndpoint));
  const [showNahtavyys, setShowNahtavyys] = useState(true);
  const [luolaData] = useFetchData(async () => await fetchData(luolaEndpoint));
  const [showLuola, setShowLuola] = useState(true);
  const [lahdeData] = useFetchData(async () => await fetchData(lahdeEndpoint));
  const [showLahde, setShowLahde] = useState(true);
  const [ruokailukatosData] = useFetchData(async () => await fetchData(ruokailukatosEndpoint));
  const [showRuokailukatos, setShowRuokailukatos] = useState(true);



const toggleAddLocation = () => {
  setShowAddLocation(!showAddLocation); // Toggle the visibility state
};



const mapRef = useRef<any>(null);
const geoControlRef = useRef<any>(null);



const bounds = mapRef.current
  ? mapRef.current.getBounds().toArray().flat()
  : null;

  
   
    const { clusters: varaustupa } = useCluster(varaustupaData, bounds as BBox, viewState.zoom);
    const { clusters: autiotupa } = useCluster(autiotupaData,  bounds as BBox, viewState.zoom);
    const { clusters: nuotiopaikka } = useCluster(nuotiopaikkaData,  bounds as BBox, viewState.zoom);
    const { clusters: kota } = useCluster(kotaData,  bounds as BBox, viewState.zoom);
    const { clusters: laavu } = useCluster(laavuData,  bounds as BBox, viewState.zoom);
    const { clusters: paivatupa } = useCluster(paivatupaData,  bounds as BBox, viewState.zoom);
    const { clusters: kammi } = useCluster(kammiData,  bounds as BBox, viewState.zoom);
    const { clusters: sauna } = useCluster(saunaData,  bounds as BBox, viewState.zoom);
    const { clusters: lintutorni } = useCluster(lintutorniData,  bounds as BBox, viewState.zoom);
    const { clusters: nahtavyys } = useCluster(nahtavyysData,  bounds as BBox, viewState.zoom);
    const { clusters: luola } = useCluster(luolaData,  bounds as BBox, viewState.zoom);
    const { clusters: lahde } = useCluster(lahdeData,  bounds as BBox, viewState.zoom);
    const { clusters: ruokailukatos } = useCluster(ruokailukatosData,  bounds as BBox, viewState.zoom);

   
    useEffect(() => {
      function handleResize() {
        setIsLargeScreen(window.innerWidth >= 768); // Adjust the screen width as needed
      }
  
      // Initial check and event listener for window resize
      handleResize();
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      // Get the user's real-time coordinates
      getUserCoordinates().then((coordinates: userCoordinates) => {
        setUserCoordinates(coordinates);
        setViewState({
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: 13,
        });
      });
    }, []);
    
    
    const calculateAndSetDistance = (park: PointFeature<CustomProperties>) => {
      if (userCoordinates && park) {
        const userLat = userCoordinates.latitude;
        const userLon = userCoordinates.longitude;
        const parkCoordinates = {
          latitude: park.geometry.coordinates[1],
          longitude: park.geometry.coordinates[0],
        };
        const dist = calculateDistance(
          userLat,
          userLon,
          parkCoordinates.latitude,
          parkCoordinates.longitude
        );
        setDistance(dist);
      } else {
        setDistance(null);
      }
    };
    

 
   
   


    useEffect(() => {
      if (selectedPark !== null) {
        calculateAndSetDistance(selectedPark);
      } else if (hoveredPark !== null) {
        calculateAndSetDistance(hoveredPark);
      }
    }, [selectedPark, hoveredPark, userCoordinates]);

    const handleMarkerLeave = () => {
     setHoveredPark(null);
    };


const toggleSidebar = () => {
  setOpen(!open);
};

 return (
    <>
      <Map
        mapboxAccessToken={MapID}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onLoad={() => {
          // This function will run once the map is fully loaded
          geoControlRef.current?.trigger();
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: "100vw", height: "100vh", position: "relative", top: 0, left: 0 }}
        ref={mapRef}
         
        >




{showSearchResults && FilteredData && FilteredData.length > 0 && 
  <SearchResultList

  viewState={viewState}
  results={FilteredData}
  mapRef={mapRef}
  selectedPark={selectedPark}
  
  input={input} 
  setInput={setInput}
  setShowSearchResults={setShowSearchResults}
  setSelectedPark={setSelectedPark}
  setShowCabins={setShowCabins}
  setShowKammi={setShowKammi}
  setShowSauna={setShowSauna}
  setShowLintutorni={setShowLintutorni}
  setShowNahtavyys={setShowNahtavyys}
  setShowNuotipaikka={setShowNuotipaikka}
  setShowPaivatupa={setShowPaivatupa}
  setShowRuokailukatos={setShowRuokailukatos}
  setShowVaraustupas={setShowVaraustupas}
  setShowLahde={setShowLahde}
  setShowKota={setShowKota}
  setShowLaavu={setShowLaavu}
  setShowLuola={setShowLuola}


  />}


<MainPopup
        selectedPark={selectedPark}
        setSelectedPark={setSelectedPark}
        distance={distance ?? 0}
      />


<Searchbar 
setResults={setFilteredData} 
setInput={setInput} 
input={input} 
setShowSearchResults={setShowSearchResults} 
open={open}
setOpen={setOpen}
toggleSidebar={toggleSidebar} 


/>





<FindClosestMarkerButton
  userCoordinates={userCoordinates}
  autiotupaData={autiotupaData}
  varaustupaData={varaustupaData}
  nuotiopaikkaData={nuotiopaikkaData}
  kotaData={kotaData}
  laavuData={laavuData}
  paivatupaData={paivatupaData}
  kammiData={kammiData}
  saunaData={saunaData}
  lintutorniData={lintutorniData}
  nahtavyysData={nahtavyysData}
  luolaData={luolaData}
  lahdeData={lahdeData}
  ruokailukatosData={ruokailukatosData}
  selectedPark={selectedPark}
  setSelectedPark={setSelectedPark}
  closestParkIndex={closestParkIndex}
  setClosestParkIndex={setClosestParkIndex} 
  mapRef={mapRef}
  setShowLaavu={setShowLaavu}
  setShowCabins={setShowCabins}
  setShowKammi={setShowKammi}
  setShowSauna={setShowSauna}
  setShowLintutorni={setShowLintutorni}
  setShowNahtavyys={setShowNahtavyys}
  setShowNuotipaikka={setShowNuotipaikka}
  setShowPaivatupa={setShowPaivatupa}
  setShowRuokailukatos={setShowRuokailukatos}
  setShowVaraustupas={setShowVaraustupas}
  setShowLahde={setShowLahde}
  setShowKota={setShowKota}
  setShowLuola={setShowLuola}
  
 
/>

<SidebarButton
        open={open}
        toggleSidebar={toggleSidebar}
      
      />

<Sidebar
setOpen={setOpen}
open={open}
toggleSidebar={toggleSidebar}
showCabins={showCabins}
setShowCabins={setShowCabins}
 
showVaraustupas={showVaraustupas}
setShowVaraustupas={setShowVaraustupas}
showNuotipaikka={showNuotipaikka}
setShowNuotipaikka={setShowNuotipaikka}
showKota={showKota}
setShowKota={setShowKota}
showLaavu={showLaavu}
setShowLaavu={setShowLaavu}
showPaivatupa={showPaivatupa}
setShowPaivatupa={setShowPaivatupa}
showKammi={showKammi}
setShowKammi={setShowKammi}
showSauna={showSauna}
setShowSauna={setShowSauna}
showLintutorni={showLintutorni}
setShowLintutorni={setShowLintutorni}
showNahtavyys={showNahtavyys}
setShowNahtavyys={setShowNahtavyys}
showLuola={showLuola}
setShowLuola={setShowLuola}
showLahde={showLahde}
setShowLahde={setShowLahde}
showRuokailukatos={showRuokailukatos}
setShowRuokailukatos={setShowRuokailukatos}

/>


<div className="relative">
      <Addlocationbutton toggleAddLocation={toggleAddLocation}  />

      {showAddLocation && (
        <Addlocation
          initialLongitude={viewState.longitude}
          initialLatitude={viewState.latitude}
          mapRef={mapRef}
        />
      )}
    </div>
  

<HoverPopup 
hoveredPark={hoveredPark} 
distance={distance ?? 0} 
isLargeScreen={isLargeScreen} 
/>

{showCabins && autiotupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;

          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData } points={autiotupaData} mapRef={mapRef}  backgroundColor="#fd0303" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={longitude}
            longitude={latitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={autiotupaIcon}
            distance={distance ?? 0}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            />
              
          );
        })}

{showVaraustupas && varaustupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
         
                  if (isCluster) {
                    
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={varaustupaData}  backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
         
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={varaustupaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showCabins && autiotupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;

          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} points={autiotupaData} mapRef={mapRef} backgroundColor="#fd0303" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={autiotupaIcon}
            distance={distance ?? 0}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            />
              
          );
        })}

    

{showNuotipaikka && nuotiopaikka.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={nuotiopaikkaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={nuotiopaikkaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showKota && kota.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={kotaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={kotaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}


{showLaavu && laavu.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={laavuData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
        
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={laavuIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showPaivatupa && paivatupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={paivatupaData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
         
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={paivatupaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showKammi && kammi.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={kammiData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={kammiIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showSauna && sauna.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={saunaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={saunaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showLintutorni && lintutorni.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties 
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={lintutorniData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={lintutorniIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showNahtavyys && nahtavyys.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
      
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={nahtavyysData} backgroundColor="#ff4500 " /> 
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={nahtavyysIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showLuola && luola.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={luolaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={luolaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
           
            />
            
          );
        })}

{showLahde && lahde.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData} mapRef={mapRef} points={lahdeData} backgroundColor="#ff4500" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={lahdeIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

{showRuokailukatos && ruokailukatos.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster as ClusterData}  mapRef={mapRef} points={ruokailukatosData} backgroundColor="#ff4500" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
           
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster as CustomPointFeature}
            iconUrl={ruokailukatosIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance ?? 0}
            />
            
          );
        })}

      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
        showAccuracyCircle={false}
        showUserLocation={true}
        ref={geoControlRef}
        
        
        />



      </Map>


</>
  );
}