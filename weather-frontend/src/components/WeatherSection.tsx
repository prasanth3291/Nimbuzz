import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherSectionProps {
  currentWeather: {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: { time: string; temp: number; description: string; icon: string }[];
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ currentWeather, forecast }) => {
  const tags = ['Sunny', 'Rainy', 'Cloudy', 'Windy']; // Tags for the current weather
  const [tagCounts, setTagCounts] = useState<Record<string, number>>({
    Sunny: 0,
    Rainy: 0,
    Cloudy: 0,
    Windy: 0,
  }); // State to hold tag counts

  // Function to fetch tag counts from the backend
  const getTagCounts = async (city: string) => {
    try {
      const response = await axios.get(`https://nimbuzz.xyz/api/api/get_tag_counts?city=${city}`); // Backend API to get tag counts
      setTagCounts(response.data); // Update tag counts in state
    } catch (error) {
      console.error('Error fetching tag counts:', error);
    }
  };

  // Function to increment tag count
  const incrementTagCount = async (city: string, tag: string) => {
    try {
      await axios.post(`https://nimbuzz.xyz/api/api/update_tag_count`, { city, tag }); // Increment tag count in backend
      setTagCounts((prevCounts) => ({
        ...prevCounts,
        [tag]: prevCounts[tag] + 1, // Update count in frontend
      }));
    } catch (error) {
      console.error('Error incrementing tag count:', error);
    }
  };

  // Fetch tag counts when the component loads or current city changes
  useEffect(() => {
    getTagCounts(currentWeather.city);
  }, [currentWeather.city]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '1200px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Current Weather */}
      <div
        style={{
          flex: 1,
          marginRight: '20px',
          padding: '20px',
          borderRadius: '8px',
          background: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>{currentWeather.city}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt="Weather Icon"
          style={{ marginBottom: '10px' }}
        />
        <p>Temperature: {currentWeather.temperature}°C</p>
        <p>Condition: {currentWeather.description}</p>
        <p>Humidity: {currentWeather.humidity}%</p>
        <p>Wind Speed: {currentWeather.windSpeed} m/s</p>
        {/* Tags with Counts */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                padding: '5px 10px',
                background: '#e0f7fa',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#00796b',
                textAlign: 'center',
              }}
              onClick={() => incrementTagCount(currentWeather.city, tag)} // Increment tag count on click
            >
              <div>{tag}</div>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '5px' }}>
                {tagCounts[tag] || 0} {/* Display tag count */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast */}
      <div
        style={{
          flex: 2,
          padding: '20px',
          borderRadius: '8px',
          background: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Hourly Forecast</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
          }}
        >
          {forecast.map((entry, index) => (
            <div
              key={index}
              style={{
                flex: '1 1 calc(20% - 15px)',
                padding: '10px',
                borderRadius: '8px',
                background: '#fff',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
              }}
            >
              <h4>{entry.time}</h4>
              <img
                src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
                alt="Forecast Icon"
                style={{ marginBottom: '10px' }}
              />
              <p>{entry.temp}°C</p>
              <p>{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;
