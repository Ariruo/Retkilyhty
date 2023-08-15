import React, { useState, useEffect } from 'react';
import WeatherIcon from './Weathericon';
import UpdatedAt from './UpdatedAt';
import getWeatherFromApi from '../api/fetch';
import Description from './Desceription';
import Temperature from './Temperature';
import CityForecast from './ForecastCity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';





const Weather = () => {
  const [showForecast, setShowForecast] = useState(false)
  const [weatherData, setWeatherData] = useState({
    cityName: 'Siuro',
  });

  
  const [userInputCity, setUserInputCity] = useState('');

  const handleUpdateWeather = async (city) => {
    try {
      const [data] = await Promise.all([getWeatherFromApi(city)]);
      if (data && data.weather && data.weather.length > 0) {
        console.log('Weather data:', data);
        setWeatherData({
          icon: data.weather[0].icon,
          updatedAt: new Date().toISOString(),
          error: '',
          cityName: data.name,
          description: data.weather[0].description,
          temperature: data.main.temp, // Store the temperature in the weatherData state
        });
      } else {
        setWeatherData({
          ...weatherData,
          icon: '',
          updatedAt: '',
          description: '',
          error: 'Unable to fetch weather',
        });
      }
    } catch (error) {
      console.error(error);
      setWeatherData({
        ...weatherData,
        icon: '',
        updatedAt: '',
        description: '',
        error: 'Error fetching weather',
      });
    }
  };

  useEffect(() => {
    handleUpdateWeather(weatherData.cityName);
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleLocationChange = (event) => {
    setUserInputCity(event.target.value);
  };

  const handleUpdateButtonClick = () => {
    handleUpdateWeather(userInputCity);
  };

  const handleShowForecast = () => {
    setShowForecast(!showForecast);
  };


  const { icon, cityName, updatedAt, description, error, temperature  } = weatherData;

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

 
    return (
      <>
        <div className="font-sans " >
          <h1 className="text-4xl font-bold text-center mt-4">{cityName}</h1>
          <div className="text-center mt-4">
            <UpdatedAt style={{ fontWeight: 'bold' }} updatedAt={formatTime(updatedAt)} />
          </div>
          <div className="text-center">
            <Description style={{ fontSize: '12px' }} description={description} />
          </div>
          <div className="flex justify-center items-center mt-1 mb-2">
            <div className="flex justify-center items-center">
              <WeatherIcon icon={icon} width={150} height={150} />
            </div>
            <Temperature
              style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '0.5rem' }}
              temperature={temperature}
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <input
              type="text"
              value={userInputCity}
              placeholder="Kaupunki"
              onChange={handleLocationChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-64"
            />
            <button
              onClick={handleUpdateButtonClick}
              className="bg-blue-500 text-white rounded-full py-2 px-6 ml-4 hover:bg-blue-600 focus:outline-none"
            >
              Hae
            </button>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowForecast}
              className="bg-blue-500 text-white rounded-full py-4 px-8 mt-4 hover:bg-blue-600"
            >
              {showForecast ? 'Piilota Ennuste' : 'Näytä Ennuste'}
              <FontAwesomeIcon icon={faSun} className="ml-2" />
            </button>
          </div>
          {showForecast && <CityForecast city={cityName} />}
  
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
        <style>
          {`
          @keyframes slideBackground {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 0% 100%;
            }
          }
          `}
        </style>
      </>
    );
  };
export default Weather;

