// Logo.jsx
import React from 'react';
import './styles.css';

const Logo = ({ size = 'md' }) => {
  
  const logoPath = "/path/to/your/logo.png"; // Replace with your actual logo path
  
  return (
    <div className={`logo logo-${size}`}>
      <img 
        src={logoPath} 
        alt="App Logo" 
        className={`logo-image logo-image-${size}`}
      />
    </div>
  );
};

export default Logo;