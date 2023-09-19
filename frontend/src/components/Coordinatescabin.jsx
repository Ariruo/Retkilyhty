import React, { useState, useEffect } from 'react';
import WeatherIcon from './Weathericon';
import axios from 'axios';

const Coordinatecabin = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [error, setError] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  useEffect(() => {
    const fetchWeatherByCoordinates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`
        );

        const data = response.data;

        

        setTemperature(data?.main?.temp || '');
        setDescription(data?.weather[0]?.description || '');
        setVisibility(data?.visibility || '');
        setWindSpeed(data?.wind?.speed || '');
        setUpdatedAt(new Date().toLocaleTimeString()); // Set the current time as updated at
        setIcon(data?.weather[0]?.icon || '');

        const sunriseTime = new Date(data?.sys?.sunrise * 1000);
        setSunrise(sunriseTime.toLocaleTimeString());

        const sunsetTime = new Date(data?.sys?.sunset * 1000);
        setSunset(sunsetTime.toLocaleTimeString());

        setError('');
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeatherByCoordinates();
  }, [latitude, longitude]);

  return (
    <div className="flex flex-col items-center mt-16">
      <WeatherIcon icon={icon} width={80} height={80} />
     
      <h2>{temperature} °C</h2>
      
      <p>Näkyvyys {visibility} meters</p>
      <p>Tuuli {windSpeed} m/s</p>
      <p>Aurinko nousee {sunrise}</p>
      <p>Aurinko lasee {sunset}</p>
      <p>Klo {updatedAt}</p>
      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Coordinatecabin;