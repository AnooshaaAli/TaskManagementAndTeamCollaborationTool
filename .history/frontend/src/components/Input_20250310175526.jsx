// Input.jsx - Reusable input component
import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  id, 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-gray-700 text-white border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        required={required}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;