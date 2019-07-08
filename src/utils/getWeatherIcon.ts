import { WeatherIcon } from '../types';

function getWeatherIcon(icon: WeatherIcon) {
  switch (icon) {
    case 'clear-day':
      return 'wi-day-sunny';
    case 'clear-night':
      return 'wi-night-clear';
    case 'cloudy':
      return 'wi-cloudy';
    case 'fog':
      return 'wi-fog';
    case 'partly-cloudy-day':
      return 'wi-day-cloudy';
    case 'partly-cloudy-night':
      return 'wi-night-alt-cloudy';
    case 'rain':
      return 'wi-rain';
    case 'sleet':
      return 'wi-sleet';
    case 'snow':
      return 'wi-snow';
    case 'wind':
      return 'wi-windy';
    default:
      return '';
  }
}

export default getWeatherIcon;
