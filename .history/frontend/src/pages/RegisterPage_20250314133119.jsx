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
        width={size === "sm" ? "80" : size === "md" ? "100" : "120"}
        height={size === "sm" ? "120" : size === "md" ? "140" : "160"}
        viewBox={`0 0 ${window.innerWidth} 50`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
        className="astronaut-logo"
      >
      <defs>
        <linearGradient id={ropeGradient.id} x1="0%" y1="50%" x2="100%" y2="100%">
          {ropeGradient.stops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <path 
        d={`M0 30 Q${window.innerWidth / 4} 10, ${window.innerWidth / 2} 30 T${window.innerWidth} 30`} 
        fill="url(#ropeGradient)" 
        opacity="0.9"
      />
      <circle cx="70" cy="70" r="24" fill="#1E1E24" stroke="#E5E7EB" strokeWidth="3" />
      <circle cx="78" cy="62" r="6" fill="white" opacity="0.5" />
      <polygon 
        points="40,70 43,78 35,74 48,74 40,78" 
        fill="white" 
        opacity="0.9"
      />
      <rect x="55" y="94" width="30" height="40" rx="10" fill="#E5E7EB" stroke="#BDBDBD" strokeWidth="2" />
      
      {/* Rope texture lines for body */}
      <line x1="55" y1="104" x2="85" y2="104" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="55" y1="114" x2="85" y2="114" stroke="#BDBDBD" strokeWidth="1.5" />
      <line x1="55" y1="124" x2="85" y2="124" stroke="#BDBDBD" strokeWidth="1.5" />
      
      {/* Arms */}
      <line x1="55" y1="104" x2="35" y2="114" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1="85" y1="104" x2="105" y2="94" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      
      {/* Star in hand */}
      <polygon 
        points="105,94 108,104 118,104 111,110 113,120 105,114 97,120 99,110 91,104 102,104" 
        fill="white" 
        opacity="0.9"
      />
      
      {/* Legs */}
      <line x1="65" y1="134" x2="60" y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <line x1="75" y1="134" x2="80" y2="154" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      
      {/* Add another star for decoration */}
      <polygon 
        points="120,140 123,148 130,148 125,153 127,160 120,155 113,160 115,153 110,148 117,148" 
        fill="white" 
        opacity="0.9"
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