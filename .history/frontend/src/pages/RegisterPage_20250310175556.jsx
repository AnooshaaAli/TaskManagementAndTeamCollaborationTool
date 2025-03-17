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

// RegisterPage.jsx - The complete register page
import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import Logo from './Logo';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form - replace with your actual registration logic
      console.log('Form submitted:', formData);
      // You would typically make an API call here
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">Create an Account</h2>
          <p className="text-gray-400">Join our task management platform</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              id="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />
            
            <Input
              label="Email"
              type="email"
              id="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <Input
              label="Password"
              type="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <div className="mt-6">
              <Button type="submit" variant="primary" fullWidth>
                Register
              </Button>
            </div>
            
            <div className="mt-4 text-center text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-blue-400 hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;