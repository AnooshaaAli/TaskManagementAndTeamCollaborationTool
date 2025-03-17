// Input.jsx
import React from 'react';
import './styles/styles.css';

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
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        required={required}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;