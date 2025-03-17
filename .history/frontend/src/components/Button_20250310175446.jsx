// Button.jsx - Reusable button component
import React from 'react';

const Button = ({ children, variant = 'primary', fullWidth = false, onClick, type = 'button' }) => {
  const baseStyles = "py-2 px-4 rounded font-medium transition-colors duration-200";
  
  const variantStyles = {
    primary: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    transparent: "bg-transparent hover:bg-gray-700 text-gray-300 border border-gray-600"
  };
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;