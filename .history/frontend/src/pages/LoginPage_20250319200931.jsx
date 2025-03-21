import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Logo from '../components/Logo';
import "../styles/styles.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    if (errors.auth) {
      setErrors({
        ...errors,
        auth: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
  
        const data = await response.json(); // Parse JSON response
  
        if (response.ok) {
          setMessage("Login Successful! Redirecting...");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          // ✅ Show the error message from the backend response
          setErrors({
            ...errors,
            password: data.message || "Something went wrong."
          });
          setMessage("");
        }
      } catch (error) {
        setErrors({
          ...errors,
          auth: "Something went wrong. Please try again."
        });
        setMessage("");
      }
    }
  };  

  return (
    <div className="register-container dark-theme">
      <div className="logo-container">
        <Logo size="md" />
      </div>
      <div className="register-wrapper">
        <div className="register-header">
          <h2 className="register-title">Welcome Back</h2>
          <p className="register-subtitle">Log in to your account</p>
        </div>

        <Card className="register-card">
          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a href="/forgot-password" className="form-link">
                  Forgot password?
                </a>
              </div>
            </div>
            
            {errors.auth && (
              <div className="form-group">
                <p className="error-text">{errors.auth}</p>
              </div>
            )}

            <div className="form-button-container">
              <Button type="submit" variant="primary" fullWidth>
                Log In
              </Button>
            </div>

            {message && <p className="form-message">{message}</p>}

            <div className="form-footer">
              Don't have an account?{' '}
              <a href="/register" className="form-link">
                Create one
              </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;