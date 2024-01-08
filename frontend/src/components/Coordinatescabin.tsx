import React, { useState, useEffect } from 'react';

import WeatherIcon from './Weathericon';
import { CoordinateCabinProps } from '../types/props';

import axios from 'axios';

const Coordinatecabin: React.FC<CoordinateCabinProps> = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState('');
  const [visibility, setVisibility] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [error, setError] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');

  const baseUrl: string = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
  
  useEffect(() => {
    const fetchWeatherByCoordinates = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`
        );

        const data = response.data;
        
        setTemperature(data?.main?.temp || '');
        setVisibility(data?.visibility || '');
        setWindSpeed(data?.wind?.speed || '');
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

  const roundedTemperature = Math.round(Number(temperature));

  return (
    <div className="flex flex-col items-center justify-center mt-[-20px] ">
      <WeatherIcon icon={icon} width={135} height={135} />
      <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginTop: '-20px', marginLeft: '20px' }}>
        {roundedTemperature} °C
      </h2>


 <div className="flex justify-between p-2 mt-4 ">
 <div className="flex flex-col items-center">

   <div className="flex items-center mt-2">
     <img src="assets/visibility.png" alt="Visibility" style={{ width: '30px', height: '30px', marginRight: '4px' }} />
     <div className="flex flex-col">
       <p style={{ fontWeight: 'bold', marginBottom: '1px' }}>{visibility} m</p>
      
     </div>
   </div>
   <div className="flex items-center mt-2">
     <img src="assets/wind.png" alt="Wind" style={{ width: '30px', height: '30px', marginRight: '4px' }} />
     <div className="flex flex-col">
       <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{windSpeed} m/s</p>
      
     </div>
   </div>
 </div>

 <div className="flex flex-col items-center ml-3">
   <div className="flex items-center">
     <img src="assets/sunrise.png" alt="Sunrise" style={{ width: '35px', height: '35px', marginRight: '5px' }} />
     <p style={{ fontWeight: 'bold', marginTop:'10px' }}>{sunrise}</p>
   </div>
   <div className="flex items-center mt-1">
     <img src="assets/sunset.png" alt="Sunset" style={{ width: '34px', height: '34px', marginRight: '5px' }} />
     <p style={{ fontWeight: 'bold', marginTop:'10px' }}>{sunset}</p>
   </div>
 </div>
</div>



      

      {error && <p>{error}</p>}
    </div>
  );
};


export default Coordinatecabin;
