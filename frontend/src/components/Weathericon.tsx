import React from 'react';
import { WeatherIconProps } from '../types/props';

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, width, height, style }) => {
  return icon ? (
    <div style={style}>
      <img width={width} height={height} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon}@4x.png`} />
    </div>
  ) : null;
};

export default WeatherIcon;