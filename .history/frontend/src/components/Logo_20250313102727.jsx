// Logo.jsx
import React from 'react';
import '../styles/styles.css';

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
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Astronaut body - silver/metallic color */}
        <path 
          d="M100 180C100 180 120 160 120 130C120 110 110 90 100 90C90 90 80 110 80 130C80 160 100 180 100 180Z" 
          fill="#D1D5DB" 
          stroke="#A1A1AA" 
          strokeWidth="2"
        />
        
        {/* Head/helmet - black sphere with silver rim */}
        <circle cx="100" cy="70" r="25" fill="#121418" stroke="#D1D5DB" strokeWidth="3" />
        <circle cx="100" cy="70" r="20" fill="#1E1E1E" />
        
        {/* Reflections on helmet */}
        <ellipse cx="90" cy="60" rx="5" ry="3" fill="#444444" />
        <ellipse cx="110" cy="80" rx="4" ry="2" fill="#444444" />
        
        {/* Arms - silver/metallic color */}
        <path 
          d="M75 120C75 120 60 140 50 140C40 140 40 130 45 125C50 120 65 110 75 110" 
          fill="#D1D5DB" 
          stroke="#A1A1AA" 
          strokeWidth="2"
        />
        <path 
          d="M125 120C125 120 140 140 150 140C160 140 160 130 155 125C150 120 135 110 125 110" 
          fill="#D1D5DB" 
          stroke="#A1A1AA" 
          strokeWidth="2"
        />
        
        {/* Legs - silver/metallic color */}
        <path 
          d="M90 160C90 160 80 180 75 180C70 180 65 175 70 170C75 165 85 150 90 150" 
          fill="#D1D5DB" 
          stroke="#A1A1AA" 
          strokeWidth="2"
        />
        <path 
          d="M110 160C110 160 120 180 125 180C130 180 135 175 130 170C125 165 115 150 110 150" 
          fill="#D1D5DB" 
          stroke="#A1A1AA" 
          strokeWidth="2"
        />
        
        {/* Star on helmet */}
        <path 
          d="M80 50L83 58L75 53L85 53L77 58L80 50Z" 
          fill="#F2F2F2" 
          stroke="#D1D5DB" 
          strokeWidth="1"
        />
        
        {/* Texture lines on body to represent the ribbed/woven texture */}
        <path d="M90 100H110" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M85 110H115" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M82 120H118" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M80 130H120" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M82 140H118" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M85 150H115" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M90 160H110" stroke="#A1A1AA" strokeWidth="1" />
        
        {/* Texture lines on arms and legs */}
        <path d="M60 130Q75 125 80 120" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M55 135Q70 130 75 125" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M140 130Q125 125 120 120" stroke="#A1A1AA" strokeWidth="1" />
        <path d="M145 135Q130 130 125 125" stroke="#A1A1AA" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default Logo;