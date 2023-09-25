import React, { useState, useEffect } from 'react';
import WeatherIcon from './Weathericon';
import surise from '../../assets/sunrise.png'
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
    <div className="flex flex-col items-center mt-4">
      <WeatherIcon icon={icon} width={135} height={135} />
     
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '-20px' }}>{temperature} °C</h2>
      
      
      <div className="flex justify-between p-4 mt-6">
  <div className="flex flex-col items-center p-2">
    <div className="flex items-center">
      <img src="assets/visibility.png" alt="Näkyvyys" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
      <p style={{ fontWeight: 'bold' }}>{visibility}</p>
    </div>
    <div className="flex items-center mt-1">
      <img src="assets/wind.png" alt="Tuuli" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
      <p style={{ fontWeight: 'bold' }}>{windSpeed}</p>
    </div>
  </div>
  <div className="flex flex-col items-center">
    <div className="flex items-center">
      <img src="assets/sunrise.png" alt="Aurinko nousee" style={{ width: '35px', height: '35px', marginRight: '8px' }} />
      <p className="mt-3" style={{ fontWeight: 'bold' }}>{sunrise}</p>
    </div>
    <div className="flex items-center ml-2">
      <img src="assets/sunset.png" alt="Aurinko laskee" style={{ width: '35px', height: '35px', marginRight: '8px' }} />
      <p className="mt-2" style={{ fontWeight: 'bold' }}>{sunset}</p>
    </div>
  </div>
</div>
<p style={{ fontWeight: 'bold' }}>Klo {updatedAt}</p>
{error && <p>{error}</p>}
    </div>
  );
};

export default Coordinatecabin;