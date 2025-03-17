// RegisterPage.jsx
import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Logo from '../components/Logo';
import "../styles/styles.css";

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
    <div className="register-container dark-theme">
      <svg 
        width="100%" 
        height="50" 
        viewBox={`0 0 ${window.innerWidth} 50`} 
        preserveAspectRatio="none"
      >
      <defs>
        <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
      </defs>
        <path 
          d={`M0 30 Q${window.innerWidth / 4} 10, ${window.innerWidth / 2} 30 T${window.innerWidth} 30`} 
          stroke="url(#ropeGradient)" 
          strokeWidth="5" 
          fill="none"
        />
      </svg>
      <div className="register-wrapper">
        <div className="register-header">
          <div className="logo-container">
            <Logo size="lg" />
          </div>
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Join our task management platform</p>
        </div>
        
        <Card className="register-card">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              id="fullName"
              name="fullName"
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
              name="email"
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
              name="password"
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
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
            
            <div className="form-button-container">
              <Button type="submit" variant="primary" fullWidth>
                Register
              </Button>
            </div>
            
            <div className="form-footer">
              Already have an account?{' '}
              <a href="/login" className="form-link">
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