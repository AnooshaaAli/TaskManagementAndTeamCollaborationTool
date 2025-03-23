import React, { useState, useEffect } from 'react';
import ProjectContainer from '../components/ProjectContainer';
import Logo from '../components/Logo';
import Button from '../components/Button';
import "../styles/dashboard.css";

const Dashboard = () => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to authenticate user');
        }
        
        const userData = await response.json();
        setUserID(userData.userID);
        setUserName(userData.username || 'User');
        setIsLoading(false);
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to authenticate. Please login again.');
        setIsLoading(false);
        setTimeout(() => {
          localStorage.removeItem('jwtToken');
          window.location.href = '/login';
        }, 3000);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <Logo size="md" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <Logo size="sm" />
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <span className="user-welcome">Welcome, {userName}</span>
          <Button onClick={handleLogout} variant="transparent">Logout</Button>
        </div>
      </header>
      
      <main className="dashboard-content fade-in">
        <h2 className="content-title">Your Projects</h2>
        <ProjectContainer userID={userID} />
      </main>
    </div>
  );
};

export default Dashboard;