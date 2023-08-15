import React from 'react';

const WeatherIcon = ({ icon, width , height , style }) => {
  return icon ? (
    <div style={style}>
      <img width={width} height={height} alt="weather_icon" src={`http://openweathermap.org/img/wn/${icon}@4x.png`} />
    </div>
  ) : null;
};

export default WeatherIcon;