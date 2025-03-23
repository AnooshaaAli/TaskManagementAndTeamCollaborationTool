import React, { useState, useEffect } from 'react';
import ProjectContainer from '../components/ProjectContainer';
import Logo from '../components/Logo';
import Button from '../components/Button';
import "../styles/styles.css";
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
        
        console.log("Stored Token:", token);

        const userData = await response.json();
        console.log("UserID:", userData.userID);
        setUserID(userData.userID); // Assuming your backend returns userID
        setUserName(userData.username || 'User'); // Use username if available
        setIsLoading(false);
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to authenticate. Please login again.');
        setIsLoading(false);
        // Optional: Redirect to login after a short delay
        setTimeout(() => {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }, 3000);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    // Redirect to login page
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
      
      <main className="dashboard-content">
        <ProjectContainer userID={userID} />
      </main>
    </div>
  );
};

export default Dashboard;