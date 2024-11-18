import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import WeatherSection from '../components/WeatherSection'; // Updated combined component
import { fetchCurrentWeather, fetch5DayForecast } from '../services/weatherAPI';

const Home: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const defaultCity = 'Berlin';

  const handleSearch = async (city: string) => {
    try {
      // Fetch current weather
      const weatherData = await fetchCurrentWeather(city);
      setCurrentWeather(weatherData);

      // Fetch 5-day forecast
      const forecastData = await fetch5DayForecast(city);
      const forecastList = forecastData.list.map((entry: any) => ({
        time: entry.dt_txt.split(' ')[1], // Extract the time portion (HH:MM:SS)
        temp: entry.main.temp,
        description: entry.weather[0].description,
        icon: entry.weather[0].icon,
      }));
      setForecast(forecastList.slice(0, 4)); // Limit to 5 days
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  useEffect(() => {
    handleSearch(defaultCity);
  }, []); 

  return (
    <div>
      {/* Navbar */}
      <Navbar onSearch={handleSearch} />

      {/* Banner */}
      <Banner />

      {/* Weather Section: Current Weather and 5-Day Forecast */}
      {currentWeather && forecast.length > 0 && (
        <WeatherSection
          currentWeather={{
            city: currentWeather.name,
            temperature: currentWeather.main.temp,
            description: currentWeather.weather[0].description,
            humidity: currentWeather.main.humidity,
            windSpeed: currentWeather.wind.speed,
            icon: currentWeather.weather[0].icon,
          }}
          forecast={forecast}
        />
      )}
    </div>
  );
};

export default Home;
