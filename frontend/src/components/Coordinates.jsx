import React, { useState, useEffect } from 'react';
import getUserCoordinates from '../service/getUserCoordinates';
import getWeatherFromApiCord from '../api/fetchByCoordinates';
import WeatherIcon from './Weathericon';
import UpdatedAt from './UpdatedAt';
import Description from './Desceription';
import Temperature from './Temperature';
import Coordinateforecast from './coordinatesforecast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';



const Coordinate = () => {

  const [showForecast, setShowForecast] = useState(false)

  const [weatherData, setWeatherData] = useState({
    cityName: '',
    icon: '',
    updatedAt: '',
    description: '',
    temperature: '',
    error: '',
  });

  useEffect(() => {
    // Function to fetch weather data based on user coordinates
    const fetchWeatherByCoordinates = async () => {
      try {
        const { latitude, longitude } = await getUserCoordinates();
        const response = await fetch(`http://localhost:9000/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`)
       
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }
        const data = await response.json();
        console.log('Current weather data:', data);
        
        if (data && data.weather && data.weather.length > 0) {
          
          setWeatherData({
            cityName: data.name,
            icon: data.weather[0].icon,
            updatedAt: new Date().toISOString(),
            description: data.weather[0].description,
            temperature: data.main.temp,
            error: '',
          });
        } else {
          setWeatherData({
            cityName: '',
            icon: '',
            updatedAt: '',
            description: '',
            temperature: '',
            error: 'Weather data not available.',
          });
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeatherData({
          cityName: '',
          icon: '',
          updatedAt: '',
          description: '',
          temperature: '',
          error: 'Failed to fetch weather data.',
        });
      }
    };

    fetchWeatherByCoordinates();
  }, []);

  const { cityName, icon, updatedAt, description, temperature, error } = weatherData;

  // Function to convert ISO string to desired time format
  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };
 
  const handleShowForecast = () => {
    setShowForecast(!showForecast);
  };


 
  return (
    

 
    
    <div className="font-sans"  >
    <h1 className="text-6xl font-bold text-center">{cityName}</h1>
    <div className="text-center  mt-4">
      <UpdatedAt style={{fontWeight: 'bold'}} updatedAt={formatTime(updatedAt)} />
    </div>
    <div className="text-center mt-2">
      <Description style={{fontSize:'12px'}}description={description} />
    </div>
    <div className="flex justify-center items-center mt-1 mb-2">
  <div className="flex justify-center items-center">
    <WeatherIcon icon={icon} width={150} height={150} />
  </div>
  <Temperature style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '0.5rem' }} temperature={temperature} />
</div>

    
    <p>{error}</p>
    <div className="flex justify-center">
        <button
          onClick={handleShowForecast}
          className="bg-blue-500 text-white rounded-full py-4 px-8 mt-4 hover:bg-blue-600"
        >
          {showForecast ? 'Piilota Ennuste' : 'Näytä Ennuste'}
          <FontAwesomeIcon icon={faSun} className="ml-2" />
        </button>
      </div>
      {showForecast && <Coordinateforecast />}
    </div>
    
);
};
 


export default Coordinate;



