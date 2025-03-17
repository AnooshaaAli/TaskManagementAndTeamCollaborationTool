// Logo.jsx
import React from 'react';
import '../styles.css';

const Logo = ({ size = 'md' }) => {
  // Size mapping for the SVG dimensions
  const sizeDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 }
  };
  
  const { width, height } = sizeDimensions[size];
  
  return (
    <div className={`logo logo-${size}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Astronaut helmet */}
        <circle cx="12" cy="10" r="7" fill="#2C3038" stroke="#D1D5DB" strokeWidth="1.5" />
        
        {/* Helmet visor */}
        <path d="M7 10C7 7.23858 9.23858 5 12 5C14.7614 5 17 7.23858 17 10C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10Z" fill="#60A5FA" />
        
        {/* Helmet reflection */}
        <path d="M9 7.5C9 7.5 10 6.5 12 6.5C14 6.5 15 7.5 15 7.5" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
        
        {/* Astronaut body/suit */}
        <path d="M8 13.5V17C8 17 8 19 12 19C16 19 16 17 16 17V13.5" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Oxygen tank/backpack */}
        <rect x="9" y="15" width="6" height="4" rx="1" fill="#22C55E" />
        
        {/* Suit details */}
        <path d="M12 15V17" stroke="#D1D5DB" strokeWidth="0.5" strokeLinecap="round" />
        <path d="M10 17H14" stroke="#D1D5DB" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Logo;