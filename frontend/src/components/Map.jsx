import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer, NavigationControl,GeolocateControl } from "react-map-gl";
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




export default function Mapp() {


  const MapID = import.meta.env.VITE_MAPBOX_TOKEN || process.env.MAPID;


const [showCabins, setShowCabins] = useState(true);
const [originalData , setOriginaldata] = useState([]);
const [FilteredData, setFilteredData] = useState([]);  
const [selectedPark, setSelectedPark] = useState(null);
const [input, setInput] = useState("");
const [showSearchResults, setShowSearchResults] = useState(false);
const [hoveredPark, setHoveredPark] = useState(null);
const [viewState, setViewState] = useState({
  longitude: 23.72018736381,
  latitude: 68.342938678895,
  zoom: 10,
})
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
    <label className="block checkbox-container mb-2">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
  return (
    <div>
 


      <Map
        mapboxAccessToken={MapID}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        style={{ width: "99vw", height: "90vh", position: "relative", top: 0, left: 0 }}
        >


<SearchBar setResults={setFilteredData} setInput={setInput} input={input} setShowSearchResults={setShowSearchResults} />
<Button onClick={handleFindClosestPark}>Hae</Button>
 {showSearchResults && FilteredData && FilteredData.length > 0 && <SearchResultList results={FilteredData} onResultClick={handleResultClick} />}
 
 
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

 {hoveredPark && (
        <div className="custom-popup absolute z-10 bg-white border p-4">
   
          <div>{hoveredPark.properties.name} ({hoveredPark.properties.tyyppi})</div>
         
       </div>
      )}


{showCabins && originalData.map((park, index) => (
<CustomMarker
key={index}
latitude={park.geometry.coordinates[0]}
longitude={park.geometry.coordinates[1]}
handleMarkerHover={handleMarkerHover}
setSelectedPark={setSelectedPark}
handleMarkerLeave={handleMarkerLeave}
park={park}
iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=red&size=small&icon=cabin&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
/>
 ))}

{showVaraustupas && varaustupaData.map((park, index) => (
  <CustomMarker
  key={index}
  latitude={park.geometry.coordinates[0]}
  longitude={park.geometry.coordinates[1]}
  handleMarkerHover={handleMarkerHover}
  setSelectedPark={setSelectedPark}
  handleMarkerLeave={handleMarkerLeave}
  park={park}
  iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%231d04ff&size=small&icon=cabin&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=red&size=small&icon=fire&iconType=awesome&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%231ec69f&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
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
    iconUrl={`https://api.geoapify.com/v1/icon/?type=material&color=%23d01db8&size=small&iconSize=small&textSize=small&apiKey=${import.meta.env.VITE_GEOAPI_TOKEN}`}
  
    />
      ))}




  
 

 
 {selectedPark && (
            <Popup 
            latitude={selectedPark.geometry.coordinates[0]}
            longitude={selectedPark.geometry.coordinates[1]}
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