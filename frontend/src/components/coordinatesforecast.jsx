import React, { useState, useEffect } from 'react';
import getUserCoordinates from '../service/getUserCoordinates';
import Description from './Desceription';
import WeatherIcon from './Weathericon';

const Coordinateforecast = () => {
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherByCoordinates = async () => {
      try {
        const { latitude, longitude } = await getUserCoordinates();
        const response = await fetch(
          `http://localhost:9000/api/forecastbycoordinates?lon=${longitude}&lat=${latitude}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();
        

        setCityName(data?.cityName || '');
        setDescription(data?.weather?.description || '');
        setIcon(data?.weather?.icon || '');
        setTime(data?.time?.split(' ')[1] || '');
        const sunriseTime = new Date(data?.sys?.sunrise * 1000); // Convert seconds to milliseconds
      setSunrise(sunriseTime.toLocaleTimeString()); // Convert sunrise time to a human-readable format
      
      const sunsetTime = new Date(data?.sys?.sunset * 1000); // Convert seconds to milliseconds
      setSunset(sunsetTime.toLocaleTimeString()); // Convert sunset time to a human-readable format
      
        setError('');
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeatherByCoordinates();
  }, []);

  return (
<div className="flex flex-col items-center mt-16">
  
  <div className="flex flex-row justify-start items-center">
    <WeatherIcon icon={icon} width={80} height={80} className="forecast-icon-style" />
    <div className="ml-4">
      <h3>{cityName}</h3>
      <p>{time}</p>
      <Description description={description} />
    </div>
  </div>
  {error && <p>{error}</p>}
</div>

  );
};

export default Coordinateforecast;
