import React from 'react';

const Banner: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        height: '300px',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/banner.jpg'})`, // Path to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      ></div>

      {/* Text Content */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px' }}>Welcome to Nimbuz</h1>
        <p style={{ fontSize: '1.2rem' }}>Weather forecasts and insights, fast and accurate.</p>
      </div>
    </div>
  );
};

export default Banner;
