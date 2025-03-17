// Card.jsx
import React from 'react';
import './styles.css';

const Card = ({ children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;