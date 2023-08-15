import React, { useState, useEffect } from 'react';
import Description from './Desceription';
import WeatherIcon from './Weathericon';

const CityForecast = ({ city }) => {
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Define the function to fetch weather data
    const fetchWeatherByCity = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/forecast?city=${city}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();
        console.log('ennustedata:', data);

        if (data  ) {
          setCityName(data?.cityName || '');
          setDescription(data.weather.description);
          setIcon(data.weather.icon);
          setTime(data?.time?.split(' ')[1] || '');
         
          setError('');
        } else {
          setError('Weather data not available.');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data.');
      }
    };

    // Fetch weather data only if the city prop is not an empty string
    if (city.trim() !== '') {
      fetchWeatherByCity();
    }
  }, [city]);

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

export default CityForecast;