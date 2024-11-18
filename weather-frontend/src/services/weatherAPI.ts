import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY as string;

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const BACKEND_BASE_URL = 'https://nimbuzz.xyz/api'; // Backend URL for syncing data

// Fetch current weather data from OpenWeather API and sync with backend
export const fetchCurrentWeather = async (city: string) => {

  // Fetch weather data from OpenWeather API
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });

  const weatherData = response.data;

  // Prepare data for backend sync
  const backendData = {
    city: weatherData.name, // City name
    temperature: weatherData.main.temp, // Current temperature
    description: weatherData.weather[0].description, // Weather description
    humidity: weatherData.main.humidity, // Humidity
    windSpeed: weatherData.wind.speed, // Wind speed
    icon: weatherData.weather[0].icon, // Weather icon
  };

  try {
    // Sync data with backend
    await axios.post(`${BACKEND_BASE_URL}/api/add_or_update_city`, backendData);
    console.log('Weather data synced with backend:', backendData);
  } catch (error) {
    console.error('Error syncing weather data with backend:', error);
  }

  return weatherData;
};

// Fetch 5-day weather forecast from OpenWeather API
export const fetch5DayForecast = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
  console.log('data', response.data);
  return response.data;
};
