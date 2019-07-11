import React, { useEffect, useState } from 'react';
import { requestGetCurrentlyWeather } from '../utils/api';
import getWeatherIcon from '../utils/getWeatherIcon';
import { WeatherIcon } from '../types';
import moment from 'moment';

interface WeatherProps {
  lat: number;
  lng: number;
}

interface WeatherInfo {
  weather: string;
  temperature: number;
  lastUpdateTime: string;
  loaded: boolean;
}

const Weather: React.FC<WeatherProps> = ({ lat, lng }) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    weather: '',
    temperature: 0,
    lastUpdateTime: moment().toISOString(),
    loaded: false,
  });
  useEffect(() => {
    const getWeather = async (lat: number, lng: number) => {
      const result = await requestGetCurrentlyWeather(lat, lng);
      setWeatherInfo({
        weather: result.icon,
        temperature: result.temperature,
        lastUpdateTime: moment().toISOString(),
        loaded: true,
      });
    };
    if (!weatherInfo.loaded) {
      getWeather(lat, lng);
    } else {
      const tid = setInterval(() => {
        const now = moment();
        if (
          moment(weatherInfo.lastUpdateTime)
            .add(30, 'minutes')
            .isBefore(now)
        ) {
          getWeather(lat, lng);
        }
      }, 10000);
      return () => clearInterval(tid);
    }
  }, [lat, lng, weatherInfo]);
  return (
    <>
      <i
        className={`wi ${getWeatherIcon(weatherInfo.weather as WeatherIcon)}`}
        style={{ fontSize: 50, marginRight: 16 }}
      />
      <span style={{ fontSize: 60 }}>{weatherInfo.temperature}°</span>
    </>
  );
};

export default Weather;
