// Logo.jsx - App logo component
import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  return (
    <div className={`font-bold ${sizes[size]} text-white`}>
      CORONA
    </div>
  );
};

export default Logo;