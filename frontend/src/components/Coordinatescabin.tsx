import React, { useState, useEffect } from 'react';
import ContentLoader from 'react-content-loader';
import WeatherIcon from './Weathericon';
import { CoordinateCabinProps } from '../types/props';
import axios from 'axios';
import visibilityIcon from '../../assets/visibility.png';
import windIcon from '../../assets/wind.png';
import sunriseIcon from '../../assets/sunrise.png';
import sunsetIcon from '../../assets/sunset.png';

const Coordinatecabin: React.FC<CoordinateCabinProps> = ({ latitude, longitude }) => {
  const [temperature, setTemperature] = useState('');
  const [visibility, setVisibility] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [error, setError] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [loading, setLoading] = useState(true);

  const baseUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

  useEffect(() => {
    const fetchWeatherByCoordinates = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/weatherbycoordinates?lon=${longitude}&lat=${latitude}`);
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
        setLoading(false); // Mark loading as complete
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeatherByCoordinates();
  }, [latitude, longitude]);

  return (
    <div className="flex flex-col items-center justify-center mt-[-20px] ">
      {loading ? (
        <ContentLoader
          speed={2}
          width={200}
          height={200}
          viewBox="0 0 200 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Placeholder elements */}
          <rect x="20" y="20" rx="3" ry="3" width="160" height="10" />
          <rect x="20" y="40" rx="3" ry="3" width="160" height="10" />
          {/* Add more placeholder elements */}
        </ContentLoader>
      ) : (
        <>
          <WeatherIcon icon={icon} width={135} height={135} />
          <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginTop: '-20px', marginLeft: '20px' }}>
            {Math.round(Number(temperature))} °C
          </h2>

          {/* Rest of your content */}
          <div className="flex justify-between p-2 mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center mt-2">
                <img src={visibilityIcon} alt="Visibility" style={{ width: '30px', height: '30px', marginRight: '4px' }} />
                <div className="flex flex-col">
                  <p style={{ fontWeight: 'bold', marginBottom: '1px' }}>{visibility} m</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <img src={windIcon} alt="Wind" style={{ width: '30px', height: '30px', marginRight: '4px' }} />
                <div className="flex flex-col">
                  <p style={{ fontWeight: 'bold', marginBottom: '2px' }}>{windSpeed} m/s</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center ml-3">
              <div className="flex items-center">
                <img src={sunriseIcon} alt="Sunrise" style={{ width: '35px', height: '35px', marginRight: '5px' }} />
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{sunrise}</p>
              </div>
              <div className="flex items-center mt-1">
                <img src={sunsetIcon} alt="Sunset" style={{ width: '34px', height: '34px', marginRight: '5px' }} />
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{sunset}</p>
              </div>
            </div>
          </div>
          {/* ... */}
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Coordinatecabin;
