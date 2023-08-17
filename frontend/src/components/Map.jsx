import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer, NavigationControl } from "react-map-gl";
import * as tupaData from '../../assets/tupadata.json';
import hetta from '../../assets/hetta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Coordinatecabin from "./Coordinatescabin";
import 'mapbox-gl/dist/mapbox-gl.css';
import iso_karhunkierros from "../../assets/iso_karhunkierros";
import SearchBar from "./SearchBar";



export default function Mapp() {

  
const [selectedPark, setSelectedPark] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);


  const closePopup = () => {
    setSelectedPark(null);
  };

  const handleSearch = () => {
    const foundPark = tupaData.features.find(
      (park) =>
        park.properties.NAME.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundPark) {
      setSelectedPark(foundPark);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);

    const results = tupaData.features.filter((park) =>
      park.properties.NAME.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>




      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 23.72018736381,
          latitude: 68.342938678895,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/ariru/cll6qcd1o00nd01pd9r1x0bwi"
        style={{ width: "100vw", height: "100vh", position: "relative", top: 0, left: 0 }}
        >
    <SearchBar className="absolute z-10"
    searchQuery={searchQuery}
    handleInputChange={handleInputChange}
    handleSearch={handleSearch}
    searchResults={searchResults}
  />

 

<Source id="hettadata" type="geojson" data={hetta}>
         <Layer
          id="hettapoint"
          type="circle"
          paint={{
            'circle-radius': 2,
            'circle-color': 'black'
          }}/>
      </Source>

      <Source id="karhunkierrosdata" type="geojson" data={iso_karhunkierros}>
         <Layer
          id="karhunkierrospoint"
          type="circle"
          paint={{
            'circle-radius': 2,
            'circle-color': '#007cbf'
          }}/>
      </Source>

{tupaData.features.map(park => (
  <Marker
    key={park.properties.TUPA_ID}
    latitude={park.geometry.coordinates[1]}
    longitude={park.geometry.coordinates[0]}
    offsetTop={-20}
  >
     <button
    className=""
  
    onClick={e => {
      e.preventDefault();
      setSelectedPark(park);
    }}
  >
    <img
      src="/cottage.svg"
      alt="cottage icon"
      className={`w-4 h-4 `}
    />
   
    </button>
    
    </Marker>
    ))}
 
 {selectedPark && (
          <div className="custom-popup absolute z-10 bg-white border p-4">
            <button className="close-button" onClick={closePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
            <h2 className="text-lg font-semibold">{selectedPark.properties.NAME}</h2>
            <p className="mt-1">Varusteet: {selectedPark.properties.ACCESSORIES}</p>
          
            <Coordinatecabin 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
          />
          </div>
        )}
        <NavigationControl 
        position="bottom-right"
         />
  </Map>
  

 
    </div>
  );
}