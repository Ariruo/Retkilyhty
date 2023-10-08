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

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

  useEffect(() => {
    const fetchWeatherByCoordinates = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`
        );

        const data = response.data;

        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        setTemperature(data?.main?.temp || '');
        setDescription(data?.weather[0]?.description || '');
        setVisibility(data?.visibility || '');
        setWindSpeed(data?.wind?.speed || '');
        setUpdatedAt(formattedTime); // Set the current time as updated at
        setIcon(data?.weather[0]?.icon || '');

        

        const sunriseTime = new Date(data?.sys?.sunrise * 1000);
        setSunrise(sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        
        const sunsetTime = new Date(data?.sys?.sunset * 1000);
        setSunset(sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

        setError('');
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeatherByCoordinates();
  }, [latitude, longitude]);

  const roundedTemperature = Math.round(temperature);
  console.log(updatedAt)
  const [hour, minute] = updatedAt.split(':');
  console.log('Hour:', hour);
  console.log('Minute:', minute);

  return (
    <div className="flex flex-col items-center justify-center mt-[-20px] ">
      <WeatherIcon icon={icon} width={135} height={135} />
     
      <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginTop: '-20px', marginLeft: '10px' }}>{roundedTemperature} °C</h2>
      
      
      <div className="flex justify-between p-4 mt-1">
  <div className="flex flex-col items-center p-2">
    <div className="flex items-center">
      <img src="assets/visibility.png" alt="Näkyvyys" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
      <p style={{ fontWeight: 'bold' }}>{visibility}</p>
      <p className='pl-1'>  m</p>
    </div>
    <div className="flex items-center mt-1">
      <img src="assets/wind.png" alt="Tuuli" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
      <p style={{ fontWeight: 'bold' }}>{windSpeed} </p>
      <p className='pl-1'>  m/s</p>
    </div>
  </div>
  <div className="flex flex-col items-center">
    <div className="flex items-center">
      <img src="assets/sunrise.png" alt="Aurinko nousee" style={{ width: '35px', height: '35px', marginRight: '8px' }} />
      <p className="mt-3" style={{ fontWeight: 'bold' }}>{sunrise}</p>
    </div>
    <div className="flex items-center ml-1">
      <img src="assets/sunset.png" alt="Aurinko laskee" style={{ width: '34px', height: '34px', marginRight: '8px' }} />
      <p className="mt-2" style={{ fontWeight: 'bold' }}>{sunset}</p>
    </div>
  </div>
</div>

{error && <p>{error}</p>}
    </div>
  );
};

export default Coordinatecabin;