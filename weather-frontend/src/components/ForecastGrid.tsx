import React from 'react';

interface ForecastProps {
  forecasts: { date: string; temp: number; description: string; icon: string }[];
}

const ForecastGrid: React.FC<ForecastProps> = ({ forecasts }) => {
  return (
    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
      {forecasts.map((forecast, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            textAlign: 'center',
            width: '120px',
          }}
        >
          <h4>{forecast.date}</h4>
          <img src={`http://openweathermap.org/img/wn/${forecast.icon}.png`} alt="Weather icon" />
          <p>{forecast.temp}°C</p>
          <p>{forecast.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastGrid;
