import { DataPoint } from '../types';

export async function requestGetCurrentlyWeather(
  lat: number,
  lng: number
): Promise<DataPoint | null> {
  const response = await fetch(
    `https://us-central1-test-eaacc.cloudfunctions.net/app/GetCurrentlyWeather?lat=${lat}&lng=${lng}`
  );
  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
}
