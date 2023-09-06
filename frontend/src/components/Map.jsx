import React, { useState, useEffect, lazy, useRef  } from "react";
import Map, { Marker, Popup, Source, Layer, NavigationControl,GeolocateControl,} from "react-map-gl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Coordinatecabin from "./Coordinatescabin";
import getUserCoordinates from "../service/getUserCoordinates";
import SearchBar from "./Searchbar";
import SearchResultList from "./SearchResultList";
import Button from "./Button";
import fetchData from "../api/fetch";
import CustomMarker from "./CustomMarker";
import useToggleAndFetchData from "../hooks/toggleAndFetchData";
import 'mapbox-gl/dist/mapbox-gl.css';
import useSupercluster from "use-supercluster";




export default function Mapp() {


  const MapID = import.meta.env.VITE_MAPBOX_TOKEN || process.env.MAPID;
  const GeoAPI = import.meta.env.VITE_GEOAPI_TOKEN || process.env.GEOAPI;

 
const [showCabins, setShowCabins] = useState(true);
const [originalData , setOriginaldata] = useState([]);
const [FilteredData, setFilteredData] = useState([]);  
const [selectedPark, setSelectedPark] = useState(null);
const [input, setInput] = useState("");
const [showSearchResults, setShowSearchResults] = useState(false);
const [hoveredPark, setHoveredPark] = useState(null);
const [showCheckboxes, setShowCheckboxes] = useState(false);
const [viewState, setViewState] = useState({
  longitude: 23.72018736381,
  latitude: 68.342938678895,
zoom: 10,})
const [showVaraustupas, varaustupaData, toggleVaraustupas] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allvaraustupapoints'));
const [showNuotipaikka, nuotiopaikkaData, toggleNuotipaikka] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allnuotiopaikkapoints'));
const [showKota, kotaData, toggleKota] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allkotapoints'));
const [showLaavu, laavuData, toggleLaavu] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/alllaavupoints'));
const [showPaivatupa, paivatupaData, togglePaivatupa] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allpaivatupapoints'));
const [showKammi, kammiData, toggleKammi] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allkammipoints'));
const [showSauna, saunaData, toggleSauna] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allsaunapoints'));
const [showLintutorni, lintutorniData, toggleLintutorni] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/alllintutornipoints'));
const [showNahtavyys , nahtavyysData, toggleNahtavyys] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allnahtavyyspoints'));
const [showLuola , luolaData, toggleLuola] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/allluolapoints'));
const [showLahde , lahdeData, toggleLahde] = useToggleAndFetchData(false,async () => await fetchData('http://localhost:9000/api/alllahdepoints'));




useEffect(() => {
  fetchData('http://localhost:9000/api/allcabinspoints')
    .then((parks) => {
      setFilteredData(parks);
      setOriginaldata(parks);
    });
}, []);

const points = originalData
    ? originalData.map(feature => ({
        type: "Feature",
        properties: { cluster: false, name: feature.properties.name, tyyppi: feature.properties.tyyppi },
        geometry: {
          type: "Point",
          coordinates: [
            feature.geometry.coordinates[1], // Swap latitude and longitude
            feature.geometry.coordinates[0]
          ]
        }
      }))
    : [];
    const mapRef = useRef();
    const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom: viewState.zoom,
      options: { radius: 75, maxZoom: 20 }
    });
  
console.log(clusters)

useEffect(() => {
  getUserCoordinates().then((coordinates) => {
    setViewState({
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      zoom: 13,
    });
  });
}, []);



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
    setSelectedPark(closestPark);
    setInput("");
    setShowSearchResults(false);
    setViewState({
      longitude: closestPark.geometry.coordinates[1], 
      latitude: closestPark.geometry.coordinates[0],
      zoom: 10,
    });
   
  }
};

const handleResultClick = (park) => {
    
    
    
    setSelectedPark(park);
    setInput("");
    setShowSearchResults(false);
    setViewState({
      longitude: park.geometry.coordinates[1],
      latitude: park.geometry.coordinates[0],
      zoom: 10,
    });
  };


  const toggleCabins = () => {
    setShowCabins(!showCabins);
  };
  
  
  
  const renderCheckbox = (label, checked, onChange) => (
    <label className="block mb-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2 text-blue-500 rounded"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
  return (
    <div>
 


      <Map
        mapboxAccessToken={MapID}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: "99,9vw", height: "94vh", position: "relative", top: 0, left: 0 }}
        ref={mapRef}
        >


<SearchBar setResults={setFilteredData} setInput={setInput} input={input} setShowSearchResults={setShowSearchResults} />
<Button onClick={handleFindClosestPark}  style={{ left: "220px", top: "3px" }}>Hae</Button>
 {showSearchResults && FilteredData && FilteredData.length > 0 && <SearchResultList results={FilteredData} onResultClick={handleResultClick} />}
 
 
 <div>
        <Button onClick={() => setShowCheckboxes(!showCheckboxes)} style={{ left: "300px", top: "3px" }}>Valikko</Button>
        {showCheckboxes && (
          <div className="absolute z-10 left-0 bottom-0 p-4 m-4 bg-gray-100 rounded-tl-lg bg-transparent">
            {renderCheckbox("Autiotupa", showCabins, toggleCabins)}
            {renderCheckbox("Varaustupas", showVaraustupas, toggleVaraustupas)}
            {renderCheckbox("Nuotipaikka", showNuotipaikka, toggleNuotipaikka)}
            {renderCheckbox("Kota", showKota, toggleKota)}
            {renderCheckbox("Laavu", showLaavu, toggleLaavu)}
            {renderCheckbox("Päivätupa", showPaivatupa, togglePaivatupa)}
            {renderCheckbox("Kammi", showKammi, toggleKammi)}
            {renderCheckbox("Sauna", showSauna, toggleSauna)}
            {renderCheckbox("Lintutorni", showLintutorni, toggleLintutorni)}
            {renderCheckbox("Nähtävyys", showNahtavyys, toggleNahtavyys)}
            {renderCheckbox("Luola", showLuola, toggleLuola)}
            {renderCheckbox("Lähde", showLahde, toggleLahde)}
          </div>
        )}
      </div>

{hoveredPark && (
          <Popup
            latitude={hoveredPark.geometry.coordinates[1]}
            longitude={hoveredPark.geometry.coordinates[0]}
            closeButton={false}
            onClose={() => setHoveredPark(null)}
            anchor="bottom"
          >
            <div>
              <div>{hoveredPark.properties.name} ({hoveredPark.properties.tyyppi})</div>
            </div>
          </Popup>
        )}



{clusters.map((cluster, index) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;
          console.log(cluster)

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="flex items-center justify-center w-40 h-240 rounded-full bg-blue-500 text-white"
                  style={{
                    width: `${35 + (pointCount / points.length) * 45}px`,
                    height: `${35 + (pointCount / points.length) * 45}px`
                  }}
                  

  
                >
                  {pointCount}
                </div>
              </Marker>
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
            iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=red&size=small&icon=cabin&textSize=small&apiKey=${GeoAPI}`}
            />
            
          );
        })}

{/* {showCabins && originalData.map((park, index) => (
  
  <CustomMarker
  key={index}
  latitude={park.geometry.coordinates[0]}
  longitude={park.geometry.coordinates[1]}
  handleMarkerHover={handleMarkerHover}
  setSelectedPark={setSelectedPark}
  handleMarkerLeave={handleMarkerLeave}
  park={park}
  iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=red&size=small&icon=cabin&textSize=small&apiKey=${GeoAPI}`}
  />
  
   ))} */}

{showVaraustupas && varaustupaData.map((park, index) => (

  <CustomMarker
  key={index}
  latitude={park.geometry.coordinates[0]}
  longitude={park.geometry.coordinates[1]}
  handleMarkerHover={handleMarkerHover}
  setSelectedPark={setSelectedPark}
  handleMarkerLeave={handleMarkerLeave}
  park={park}
  iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%231d04ff&size=small&icon=cabin&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  />
   ))}
 
             
 
{showNuotipaikka && nuotiopaikkaData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=red&size=small&icon=fire&iconType=awesome&apiKey=${GeoAPI}`}
    />
     ))}

{showKota && kotaData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
    />
     ))}

{showLaavu && laavuData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%231ec69f&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
    />
     ))}

{showPaivatupa && paivatupaData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showKammi && kammiData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showSauna && saunaData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showLintutorni && lintutorniData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showNahtavyys && nahtavyysData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showLuola && luolaData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
      ))}

{showLahde && lahdeData.map((park, index) => (
    <CustomMarker
    key={index}
    latitude={park.geometry.coordinates[0]}
    longitude={park.geometry.coordinates[1]}
    handleMarkerHover={handleMarkerHover}
    setSelectedPark={setSelectedPark}
    handleMarkerLeave={handleMarkerLeave}
    park={park}
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${GeoAPI}`}
  
    />
   
      ))}
   
   



  
 

 
 {selectedPark && (
            <Popup 
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            anchor="bottom"
            closeOnClick={false}
            onClose={() => {
              setSelectedPark(null);
            }}
            >
           <h2 className="text-lg font-semibold">{selectedPark.properties.name}</h2>
            <p className="mt-1"> {selectedPark.properties.tyyppi}</p>
            <p className="mt-1"> Maakunta: {selectedPark.properties.maakunta}</p>
            <Coordinatecabin
            latitude={selectedPark.geometry.coordinates[0]}
            longitude={selectedPark.geometry.coordinates[1]}
            />
          </Popup>)}


    
       
        <NavigationControl 
        position="bottom-right"
        showCompass={true}
        visualizePitch={true}
        showZoom={true}
        />
        <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
        showAccuracyCircle={false}
        showUserLocation={true}
        />
      </Map>




    </div>
  );
}