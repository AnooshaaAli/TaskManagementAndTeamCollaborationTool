import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import Logo from '../components/Logo';
import "../styles/styles.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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

    if (!formData.username) {
      newErrors.username = 'Username is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
  
        const data = await response.json(); 
  
        if (response.ok) {
          setMessage(data.message || "Registration Successful! 🎉");
          setFormData({ username: "", email: "", password: "", confirmPassword: "" });
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        } else {
          setMessage(data.message || "Registration failed.");
        }
      } catch (error) {
        setMessage("Something went wrong. Please try again.");
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
          <h1 className="app-name">Projectory</h1>
          <p className="register-subtitle">Join our task management platform</p>
        </div>

        <Card className="register-card">
          <form onSubmit={handleSubmit}>
            <Input
              label="Username"
              id="username"
              name="username"
              placeholder="johndoe718"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
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

            {message && <p className="form-message">{message}</p>}

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
