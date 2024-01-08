import React from 'react';

interface TemperatureProps {
  temperature: number;
  style?: React.CSSProperties;
}

const Temperature: React.FC<TemperatureProps> = ({ temperature, style }) => {
  return (
    <>
      <p style={style}>{temperature} °C</p>
    </>
  );
};

export default Temperature;
