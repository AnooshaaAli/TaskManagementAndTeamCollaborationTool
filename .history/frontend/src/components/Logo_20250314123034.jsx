// Logo.jsx
import React from 'react';
import '../styles/logo.css';

const Logo = ({ size = 'md' }) => {
  // Size mapping for the SVG dimensions - increased sizes for better visibility
  const sizeDimensions = {
    sm: { width: 45, height: 45 },
    md: { width: 65, height: 65 },
    lg: { width: 90, height: 90 }
  };
  
  const { width, height } = sizeDimensions[size];
  
  return (
    <div className={`logo logo-${size}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 160 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cord at top */}
        <path d="M80 10V25" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
        
        {/* Head/helmet - black sphere with silver rim */}
        <circle cx="80" cy="40" r="20" fill="#121418" stroke="#D1D5DB" strokeWidth="4" />
        
        {/* Star on left side */}
        <path 
          d="M55 35L59 46L48 39L62 39L51 46L55 35Z" 
          fill="#E5E7EB" 
          stroke="#D1D5DB" 
          strokeWidth="1.5"
        />
          
        {/* Body - textured with rope-like details */}
        <path 
          d="M80 140C80 140 100 125 100 95C100 80 90 60 80 60C70 60 60 80 60 95C60 125 80 140 80 140Z" 
          fill="#D9D9D9" 
          stroke="#BDBDBD" 
          strokeWidth="2"
        />
        
        {/* Rope texture lines for body */}
        <path d="M65 70C65 70 80 70 95 70" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M63 80C63 80 80 80 97 80" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M62 90C62 90 80 90 98 90" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M61 100C61 100 80 100 99 100" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M62 110C62 110 80 110 98 110" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M65 120C65 120 80 120 95 120" stroke="#BDBDBD" strokeWidth="2.5" />
        <path d="M70 130C70 130 80 130 90 130" stroke="#BDBDBD" strokeWidth="2.5" />
        
        {/* Arms - rope textured */}
        <path 
          d="M60 85C60 85 45 100 40 100C35 100 35 90 40 85C45 80 55 75 60 75" 
          fill="#D9D9D9" 
          stroke="#BDBDBD" 
          strokeWidth="2"
        />
        <path 
          d="M100 85C100 85 115 100 120 100C125 100 125 90 120 85C115 80 105 75 100 75" 
          fill="#D9D9D9" 
          stroke="#BDBDBD" 
          strokeWidth="2"
        />
        
        {/* Rope texture for arms */}
        <path d="M43 95C43 95 50 90 55 85" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M45 90C45 90 52 85 57 80" stroke="#BDBDBD" strokeWidth="2" />
        
        <path d="M117 95C117 95 110 90 105 85" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M115 90C115 90 108 85 103 80" stroke="#BDBDBD" strokeWidth="2" />
        
        {/* Legs - rope textured */}
        <path 
          d="M70 130C70 130 60 145 55 145C50 145 48 140 53 135C58 130 67 125 70 125" 
          fill="#D9D9D9" 
          stroke="#BDBDBD" 
          strokeWidth="2"
        />
        <path 
          d="M90 130C90 130 100 145 105 145C110 145 112 140 107 135C102 130 93 125 90 125" 
          fill="#D9D9D9" 
          stroke="#BDBDBD" 
          strokeWidth="2"
        />
        
        {/* Rope texture for legs */}
        <path d="M58 140C58 140 63 135 67 130" stroke="#BDBDBD" strokeWidth="2" />
        <path d="M102 140C102 140 97 135 93 130" stroke="#BDBDBD" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default Logo;