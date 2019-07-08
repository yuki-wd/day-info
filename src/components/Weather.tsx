import React, { useEffect, useState } from 'react';
import { requestGetCurrentlyWeather } from '../utils/api';
import getWeatherIcon from '../utils/getWeatherIcon';
import { WeatherIcon } from '../types';

interface WeatherProps {
  lat: number;
  lng: number;
}

const Weather: React.FC<WeatherProps> = ({ lat, lng }) => {
  const [weather, setWeather] = useState('');
  useEffect(() => {
    const getWeather = async (lat: number, lng: number) => {
      const result = await requestGetCurrentlyWeather(lat, lng);
      setWeather(result.icon);
    };
    if (weather === '') {
      getWeather(lat, lng);
    }
  }, [weather, lat, lng]);
  return (
    <>
      <i
        className={`wi ${getWeatherIcon(weather as WeatherIcon)}`}
        style={{ fontSize: 50 }}
      />
      <span style={{ fontSize: 60 }}>17°</span>
    </>
  );
};

export default Weather;
