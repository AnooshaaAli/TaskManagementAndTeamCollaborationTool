

// Card.jsx - Reusable card component
import React from 'react';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;