// Button.jsx
import React from 'react';
import './styles/styles.css';

const Button = ({ children, variant = 'primary', fullWidth = false, onClick, type = 'button' }) => {
  const classes = [
    'btn',
    `btn-${variant}`,
    fullWidth ? 'btn-full-width' : ''
  ].filter(Boolean).join(' ');
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;