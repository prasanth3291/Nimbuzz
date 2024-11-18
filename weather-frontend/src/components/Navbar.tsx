import React, { useState } from 'react';

interface NavbarProps {
  onSearch: (city: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: 'linear-gradient(90deg, #87CEEB, #4682B4)', // Light blue gradient
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow border
        borderRadius: '8px', // Rounded edges
        color: '#fff', // White text color
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={process.env.PUBLIC_URL + '/assets/logo.webp'}
          alt="Nimbuz Logo"
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4682B4', // Darker blue button
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
