import React, { useState, useEffect, lazy, useRef  } from "react";

import Map, { Marker, Popup, GeolocateControl,} from "react-map-gl";
import { IconButton } from '@mui/material'; 
import { FaTimes } from 'react-icons/fa'; 
import './popup.css';

import Coordinatecabin from "./Coordinatescabin";
import getUserCoordinates from "../service/getUserCoordinates";
import calculateDistance from "../service/calculateDistance"; 

import SearchResultList from "./SearchResultList";
import FindClosestMarkerButton from "./FindClosestMarkerButton";
import SidebarButton from "./SidebarButton";
import Addlocation from "./AddLocation";



import Searchbar from "./Searchbar";
import fetchData from "../api/fetch";
import useFetchData2 from "../hooks/toggleAndFetchData2";


import CustomMarker from "./CustomMarker";

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

 

const [open, setOpen] = useState(false);
const [distance, setDistance] = useState(null)
const [userCoordinates, setUserCoordinates] = useState(null);
const [closestParkIndex, setClosestParkIndex] = useState();
const [showAddLocation, setShowAddLocation] = useState(false);

const [isLargeScreen, setIsLargeScreen] = useState(false);




const [FilteredData, setFilteredData] = useState([]);  
const [selectedPark, setSelectedPark] = useState(null);
const [input, setInput] = useState("");
const [showSearchResults, setShowSearchResults] = useState(false);
const [hoveredPark, setHoveredPark] = useState(null);

const [viewState, setViewState] = useState({
  longitude: 25.0, 
  latitude: 64.5, 
  zoom: 5, 
});
const [showCabins, setShowCabins] = useState(true);
const [nuotiopaikkaData, loadingnuotipaikka] = useFetchData2(async () => await fetchData(nuotiopaikkaEndpoint));
const [autiotupaData, loadingautiotupa] = useFetchData2(async () => await fetchData(autiotupaEndpoint));
const [showNuotipaikka, setShowNuotipaikka] = useState(true);
const [varaustupaData, loadingvaraus ] = useFetchData2(async () => await fetchData(varaustupaEndpoint));
const [showVaraustupas, setShowVaraustupas] = useState(true);
const [kotaData, loadingkota] = useFetchData2(async () => await fetchData(kotaEndpoint));
const [showKota, setShowKota] = useState(true);
const [laavuData, loadinglaavu] = useFetchData2(async () => await fetchData(laavuEndpoint));
const [showLaavu, setShowLaavu] = useState(true);
const [paivatupaData, loadingpaivatupa] = useFetchData2(async () => await fetchData(paivatupaEndpoint));
const [showPaivatupa, setShowPaivatupa] = useState(true);
const [kammiData, loadingkammi] = useFetchData2(async () => await fetchData(kammiEndpoint));
const [showKammi, setShowKammi] = useState(true);
const [saunaData, loadingsauna] = useFetchData2(async () => await fetchData(saunaEndpoint));
const [showSauna, setShowSauna] = useState(true);
const [lintutorniData, loadinglintutorni] = useFetchData2(async () => await fetchData(lintutorniEndpoint));
const [showLintutorni, setShowLintutorni] = useState(true);
const [nahtavyysData, loadingnahtavyys] = useFetchData2(async () => await fetchData(nahtavyysEndpoint));
const [showNahtavyys, setShowNahtavyys] = useState(true);
const [luolaData, loadingluola] = useFetchData2(async () => await fetchData(luolaEndpoint));
const [showLuola, setShowLuola] = useState(true);
const [lahdeData, loadinglahde] = useFetchData2(async () => await fetchData(lahdeEndpoint));
const [showLahde, setShowLahde] = useState(true);
const [ruokailukatosData, loadingruokailukatos] = useFetchData2(async () => await fetchData(ruokailukatosEndpoint));
const [showRuokailukatos, setShowRuokailukatos] = useState(true);





  
 
  
  

const toggleAddLocation = () => {
  setShowAddLocation(!showAddLocation); // Toggle the visibility state
};


    const mapRef = useRef();
    const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;
   
    const { clusters: varaustupa } = useCluster(varaustupaData, bounds, viewState.zoom);
    const { clusters: autiotupa } = useCluster(autiotupaData, bounds, viewState.zoom);
    const { clusters: nuotiopaikka } = useCluster(nuotiopaikkaData, bounds, viewState.zoom);
    const { clusters: kota } = useCluster(kotaData, bounds, viewState.zoom);
    const { clusters: laavu } = useCluster(laavuData, bounds, viewState.zoom);
    const { clusters: paivatupa } = useCluster(paivatupaData, bounds, viewState.zoom);
    const { clusters: kammi } = useCluster(kammiData, bounds, viewState.zoom);
    const { clusters: sauna } = useCluster(saunaData, bounds, viewState.zoom);
    const { clusters: lintutorni } = useCluster(lintutorniData, bounds, viewState.zoom);
    const { clusters: nahtavyys } = useCluster(nahtavyysData, bounds, viewState.zoom);
    const { clusters: luola } = useCluster(luolaData, bounds, viewState.zoom);
    const { clusters: lahde } = useCluster(lahdeData, bounds, viewState.zoom);
    const { clusters: ruokailukatos } = useCluster(ruokailukatosData, bounds, viewState.zoom);

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
      getUserCoordinates().then((coordinates) => {
        setUserCoordinates(coordinates);
        setViewState({
          longitude: coordinates.longitude,
          latitude: coordinates.latitude,
          zoom: 13,
        });
      });
    }, []);

    const calculateAndSetDistance = (park) => {
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
    const geoControlRef = useRef();

    useEffect(() => {
      // Activate as soon as the control is loaded
      geoControlRef.current?.trigger();
    }, [geoControlRef.current]);
  
   
  
    useEffect(() => {
      // Calculate the distance when a park is selected, deselected, or hovered
      calculateAndSetDistance(selectedPark || hoveredPark);
    }, [selectedPark, hoveredPark, userCoordinates,]);


    
    

    const handleMarkerHover = (event, park) => {
      event.preventDefault();
      setHoveredPark(park);
    };
    
    const handleMarkerLeave = () => {
     setHoveredPark(null);
    };

const handleFindClosestPark = () => {
  if (FilteredData.length > 0) {
    const closestPark = FilteredData[0];

    // Swap coordinates and create a new closestPark object
    const swappedClosestPark = {
      ...closestPark,
      geometry: {
        type: closestPark.geometry.type,
        coordinates: [closestPark.geometry.coordinates[1], closestPark.geometry.coordinates[0]],
      },
    };
    const newZoom = viewState.zoom + 1
    setSelectedPark(swappedClosestPark); // Set the closestPark with swapped coordinates
    setInput("");
    setShowSearchResults(false);
    mapRef.current.getMap().easeTo({
      center: [closestPark.geometry.coordinates[1], closestPark.geometry.coordinates[0]], // Set the new center
      zoom: newZoom, // Use the updated zoom level
      essential: true, // This ensures the animation is treated as an essential gesture
       
    });
    setShowCabins(true)
  }
};

const toggleSidebar = () => {
  setOpen(!open);
};




const handleResultClick = (park) => {
  const newSelectedPark = {
    ...park,
    geometry: {
      type: park.geometry.type,
      coordinates: [park.geometry.coordinates[0], park.geometry.coordinates[1]],
    },
  };

  setSelectedPark(newSelectedPark);
  setInput("");
  setShowSearchResults(false);

  const newZoom = viewState.zoom + 1;

  mapRef.current.getMap().easeTo({
    center: [newSelectedPark.geometry.coordinates[0], newSelectedPark.geometry.coordinates[1]],
    zoom: newZoom,
    essential: true,
  });

  switch (newSelectedPark.properties.tyyppi) {
    case 'Laavu':
      setShowLaavu(!newSelectedPark.properties.suljettu);
      break;
    case 'Nuotiopaikka':
      setShowNuotipaikka(!newSelectedPark.properties.suljettu);
      break;
    case 'Autiotupa':
      setShowCabins(!newSelectedPark.properties.suljettu);
      break;
    case 'Varaustupa':
      setShowVaraustupas(!newSelectedPark.properties.suljettu);
      break;
    case 'Kota':
      setShowKota(!newSelectedPark.properties.suljettu);
      break;
    case 'Päivätupa':
      setShowPaivatupa(!newSelectedPark.properties.suljettu);
      break;
    case 'Kammi':
      setShowKammi(!newSelectedPark.properties.suljettu);
      break;
    case 'Sauna':
      setShowSauna(!newSelectedPark.properties.suljettu);
      break;
    case 'Lintutorni':
      setShowLintutorni(!newSelectedPark.properties.suljettu);
      break;
    case 'Nähtävyys':
      setShowNahtavyys(!newSelectedPark.properties.suljettu);
      break;
    case 'Luola':
      setShowLuola(!newSelectedPark.properties.suljettu);
      break;
    case 'Lähde':
      setShowLahde(!newSelectedPark.properties.suljettu);
      break;
    case 'Ruokailukatos':
      setShowRuokailukatos(!newSelectedPark.properties.suljettu);
      break;
    default:
      break;
  }
};




const handleFindClosestParkbutton = () => {
  if (userCoordinates) {
    const allDataPoints = [
      autiotupaData,
      varaustupaData,
      nuotiopaikkaData,
      kotaData,
      laavuData,
      paivatupaData,
      kammiData,
      saunaData,
      lintutorniData,
      nahtavyysData,
      luolaData,
      lahdeData,
      ruokailukatos,
    ].flat();

    // Find the closest parks
    const getClosestParks = (numParks) => {
      const sortedParks = allDataPoints.slice().sort((a, b) => {
        const distanceA = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          a.geometry.coordinates[1],
          a.geometry.coordinates[0]
        );
        const distanceB = calculateDistance(
          userCoordinates.latitude,
          userCoordinates.longitude,
          b.geometry.coordinates[1],
          b.geometry.coordinates[0]
        );
        return distanceA - distanceB;
      });

      return sortedParks.slice(0, numParks);
    };

    if (!selectedPark) {
      // If no park is selected, select the first one
      const closestParks = getClosestParks(10);
      if (closestParks.length > 0) {
        const newSelectedPark = closestParks[0];
        setSelectedPark(newSelectedPark);
        setClosestParkIndex(0);

        // Update the viewState to focus on the selected park
        mapRef.current.getMap().easeTo({
          center: [
            newSelectedPark.geometry.coordinates[0],
            newSelectedPark.geometry.coordinates[1],
          ],
          zoom: 12,
          essential: true,
        });

        // Set the show state for the type of the newSelectedPark
        switch (newSelectedPark.properties.tyyppi) {
          case 'Laavu':
            setShowLaavu(true);
            break;
          case 'Nuotiopaikka':
            setShowNuotipaikka(true);
            break;
          case 'Autiotupa':
            setShowCabins(true);
            break;
          case 'Varaustupa':
            setShowVaraustupas(true);
            break;
          case 'Kota':
            setShowKota(true);
            break;
          case 'Päivätupa':
            setShowPaivatupa(true);
            break;
          case 'Kammi':
            setShowKammi(true);
            break;
          case 'Sauna':
            setShowSauna(true);
            break;
          case 'Lintutorni':
            setShowLintutorni(true);
            break;
          case 'Nähtävyys':
            setShowNahtavyys(true);
            break;
          case 'Luola':
            setShowLuola(true);
            break;
          case 'Lähde':
            setShowLahde(true);
            break;
          case 'Ruokailukatos':
            setShowRuokailukatos(true);
            break;
          default:
            break;
        }
      }
    } else {
      // If a park is already selected, move to the next one in the list
      const closestParks = getClosestParks(10);
      const currentIndex = closestParkIndex;
      const nextIndex = (currentIndex + 1) % closestParks.length; // Circular index
      const newSelectedPark = closestParks[nextIndex];
      setSelectedPark(newSelectedPark);
      setClosestParkIndex(nextIndex);

      // Update the viewState to focus on the selected park
      mapRef.current.getMap().easeTo({
        center: [
          newSelectedPark.geometry.coordinates[0],
          newSelectedPark.geometry.coordinates[1],
        ],
        zoom: 12,
        essential: true,
      });

      // Update only the show state for the type of the newSelectedPark
      switch (newSelectedPark.properties.tyyppi) {
        case 'Laavu':
          setShowLaavu(!newSelectedPark.properties.suljettu);
          break;
        case 'Nuotiopaikka':
          setShowNuotipaikka(!newSelectedPark.properties.suljettu);
          break;
        case 'Autiotupa':
          setShowCabins(!newSelectedPark.properties.suljettu);
          break;
        case 'Varaustupa':
          setShowVaraustupas(!newSelectedPark.properties.suljettu);
          break;
        case 'Kota':
          setShowKota(!newSelectedPark.properties.suljettu);
          break;
        case 'Päivätupa':
          setShowPaivatupa(!newSelectedPark.properties.suljettu);
          break;
        case 'Kammi':
          setShowKammi(!newSelectedPark.properties.suljettu);
          break;
        case 'Sauna':
          setShowSauna(!newSelectedPark.properties.suljettu);
          break;
        case 'Lintutorni':
          setShowLintutorni(!newSelectedPark.properties.suljettu);
          break;
        case 'Nähtävyys':
          setShowNahtavyys(!newSelectedPark.properties.suljettu);
          break;
        case 'Luola':
          setShowLuola(!newSelectedPark.properties.suljettu);
          break;
        case 'Lähde':
          setShowLahde(!newSelectedPark.properties.suljettu);
          break;
        case 'Ruokailukatos':
          setShowRuokailukatos(!newSelectedPark.properties.suljettu);
          break;
        default:
          break;
      }
    }
  }
};



  



   
 
  

 
  return (
    <>
      <Map
        mapboxAccessToken={MapID}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: "100vw", height: "100vh", position: "relative", top: 0, left: 0 }}
        ref={mapRef}
        >




{showSearchResults && FilteredData && FilteredData.length > 0 && <SearchResultList results={FilteredData} onResultClick={handleResultClick} />}


{selectedPark && (
  <Popup 
    latitude={selectedPark.geometry.coordinates[1]}
    longitude={selectedPark.geometry.coordinates[0]}
    anchor="bottom"
    closeOnClick={false}
    onClose={() => {
      setSelectedPark(null);
    }}
    closeButton={false}
  

  >
    <IconButton
  aria-label="close"
  onClick={() => {
    setSelectedPark(null);
  }}
  sx={{
    position: 'absolute',
    top: '-4px',
    right: '-5px',
    zIndex: '1',
    '&:hover': {
      transform: 'scale(0.9)', // Reduce the size when hovered
    },
  }}
>
  <FaTimes className="h-6 w-6 text-gray-700 hover:text-gray-900" />
</IconButton>

    <div style={{ marginTop: '1rem' }} >
      <h2 className="text-center text-2xl font-semibold">{selectedPark.properties.name}</h2>
      <h2 className="mt-1 text-center text-small font-semibold">({selectedPark.properties.tyyppi})</h2>
    </div>
    {distance && (
      <p className="mt-1 text-center font-semibold">{distance.toFixed(2)} Km</p>
    )}
    <Coordinatecabin
      latitude={selectedPark.geometry.coordinates[1]}
      longitude={selectedPark.geometry.coordinates[0]}
    />
  </Popup>
)}


<Searchbar 
setResults={setFilteredData} 
setInput={setInput} 
input={input} 
setShowSearchResults={setShowSearchResults} 
open={open}
setOpen={setOpen}
toggleSidebar={toggleSidebar} 
onClick={handleFindClosestPark}

/>





<FindClosestMarkerButton onClick={handleFindClosestParkbutton} />

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
      <Addlocationbutton toggleAddLocation={toggleAddLocation} showAddLocation={showAddLocation} />

      {showAddLocation && (
        <Addlocation
          initialLongitude={viewState.longitude}
          initialLatitude={viewState.latitude}
          mapRef={mapRef}
        />
      )}
    </div>
  

  



{hoveredPark && isLargeScreen && (
  <Popup
    latitude={hoveredPark.geometry.coordinates[1]}
    longitude={hoveredPark.geometry.coordinates[0]}
    closeButton={false}
    className="marker-popup-content"

  >
    
      <p className="font-semibold text-center">{hoveredPark.properties.name}</p>
      <p className="text-center text-xxs">({hoveredPark.properties.tyyppi})</p>
      {distance && (
        <p className="mt-1 text-center font-semibold">{distance.toFixed(2)} Km</p>
      )}
      {/* Add other information you want to display here */}
   
  </Popup>
)}




{showCabins && autiotupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;

          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} points={autiotupaData} mapRef={mapRef} viewState={viewState} setViewState={setViewState} backgroundColor="#fd0303" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={longitude}
            longitude={latitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={autiotupaIcon}
            distance={distance}
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
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={varaustupaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={varaustupaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showCabins && autiotupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;

          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} points={autiotupaData} mapRef={mapRef} viewState={viewState} setViewState={setViewState} backgroundColor="#fd0303" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={autiotupaIcon}
            distance={distance}
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
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={nuotiopaikkaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={nuotiopaikkaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showKota && kota.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={kotaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={kotaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}


{showLaavu && laavu.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={laavuData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={laavuIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showPaivatupa && paivatupa.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={paivatupaData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={paivatupaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showKammi && kammi.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={kammiData} backgroundColor='#ff4500 ' />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={kammiIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showSauna && sauna.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={saunaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={saunaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showLintutorni && lintutorni.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={lintutorniData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={lintutorniIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showNahtavyys && nahtavyys.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
      
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={nahtavyysData} backgroundColor="#ff4500 " /> 
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={nahtavyysIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showLuola && luola.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={luolaData} backgroundColor="#ff4500 " />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={luolaIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
           
            />
            
          );
        })}

{showLahde && lahde.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster} mapRef={mapRef} points={lahdeData} backgroundColor="#ff4500" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={lahdeIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
            />
            
          );
        })}

{showRuokailukatos && ruokailukatos.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {cluster: isCluster} = cluster.properties;
        
          if (isCluster) {
            return (
            <CustomClusterMarker key={`cluster-${cluster.id}`} cluster={cluster}  mapRef={mapRef} points={ruokailukatosData} backgroundColor="#ff4500" />
              );
            }
          return (
            <CustomMarker
            key={index}
            latitude={latitude}
            longitude={longitude}
            handleMarkerHover={handleMarkerHover}
            setSelectedPark={setSelectedPark}
            handleMarkerLeave={handleMarkerLeave}
            park={cluster}
            iconUrl={ruokailukatosIcon}
            setHoveredPark={setHoveredPark}
            hoveredPark={hoveredPark}
            distance={distance}
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