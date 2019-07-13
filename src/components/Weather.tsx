import React, { useEffect, useState } from 'react';
import { requestGetCurrentlyWeather } from '../utils/api';
import getWeatherIcon from '../utils/getWeatherIcon';
import { WeatherIcon } from '../types';
import moment from 'moment';
import { useInterval } from '../hooks';

interface WeatherProps {
  lat: number;
  lng: number;
}

interface WeatherInfo {
  weather: string;
  temperature: number;
  lastUpdateTime: moment.Moment;
  loaded: boolean;
}

const Weather: React.FC<WeatherProps> = ({ lat, lng }) => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    weather: '',
    temperature: 0,
    lastUpdateTime: moment(),
    loaded: false,
  });

  async function getWeather(lat: number, lng: number) {
    const result = await requestGetCurrentlyWeather(lat, lng);
    if (result !== null) {
      setWeatherInfo({
        weather: result.icon,
        temperature: result.temperature,
        lastUpdateTime: moment(),
        loaded: true,
      });
    }
  }

  useEffect(() => {
    if (!weatherInfo.loaded) {
      getWeather(lat, lng);
    }
  }, [lat, lng, weatherInfo.loaded]);

  useInterval(() => {
    const now = moment();
    if (
      weatherInfo &&
      weatherInfo.lastUpdateTime
        .clone()
        .add(30, 'minutes')
        .isBefore(now)
    ) {
      getWeather(lat, lng);
    }
  }, 10000);

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
