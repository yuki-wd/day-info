import { DataPoint } from '../types';

export async function requestGetCurrentlyWeather(
  lat: number,
  lng: number
): Promise<DataPoint | null> {
  try {
    const response = await fetch(
      `https://us-central1-test-eaacc.cloudfunctions.net/app/GetCurrentlyWeather?lat=${lat}&lng=${lng}`
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}
