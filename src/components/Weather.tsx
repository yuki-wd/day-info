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
  const [temperature, setTemperature] = useState<number | null>(null);
  useEffect(() => {
    const getWeather = async (lat: number, lng: number) => {
      const result = await requestGetCurrentlyWeather(lat, lng);
      setWeather(result.icon);
      setTemperature(Math.round(result.temperature));
    };
    if (weather === '' && temperature === null) {
      getWeather(lat, lng);
    }
  }, [weather, lat, lng, temperature]);
  return (
    <>
      <i
        className={`wi ${getWeatherIcon(weather as WeatherIcon)}`}
        style={{ fontSize: 50, marginRight: 16 }}
      />
      <span style={{ fontSize: 60 }}>{temperature}°</span>
    </>
  );
};

export default Weather;
