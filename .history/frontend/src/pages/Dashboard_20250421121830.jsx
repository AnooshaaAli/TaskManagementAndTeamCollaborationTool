import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import ProjectContainer from '../components/ProjectContainer';
import Sidebar from '../components/Sidebar'; // Import the new Sidebar component
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import { Bell, Activity, LogOut, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        const response = await fetch("http://localhost:8080/auth/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await response.json();

        setTimeout(() => {
          setUserData(userData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your workspace...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container dark-theme">
      {/* Use the new Sidebar component */}
      <Sidebar 
        userData={userData} 
        handleLogout={handleLogout} 
        activePage="dashboard" 
      />

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-count">0</span>
            </div>
            <div className="user-dropdown">
              <img src={userData?.avatar || "/default-avatar.png"} alt="Profile" className="avatar-small" />
              <span>{userData?.username || "User"}</span>
            </div>
            <button className="header-logout-button" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome, {userData ? userData.username : 'User'}</h1>
            <p className="subtitle">Your workspace overview</p>
          </div>
          <div className="date-display">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-icon projects">
              <Activity size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">3</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon tasks">
              <Activity size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">8</span>
              <span className="stat-label">Tasks</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon team">
              <Activity size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">5</span>
              <span className="stat-label">Team Members</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon activity">
              <Activity size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">12</span>
              <span className="stat-label">Updates</span>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="content-tabs">
          <div className="tab-buttons">
            <button
              className={activeTab === 'tasks' ? 'active' : ''}
              onClick={() => setActiveTab('tasks')}
            >
              My Tasks
            </button>
            <button
              className={activeTab === 'activity' ? 'active' : ''}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'tasks' && (
              <Card className="tasks-card">
                <div className="card-header">
                  <h3>My Tasks</h3>
                </div>
                <div className="tasks-list empty-state">
                  <div className="empty-icon">
                    <Activity size={40} />
                  </div>
                  <p>No tasks assigned yet</p>
                  <button className="btn-connect">Connect Task Manager</button>
                </div>
              </Card>
            )}

            {activeTab === 'activity' && (
              <Card className="activity-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <div className="filter-dropdown">
                    <span>All Activities</span>
                    <span className="material-icons">expand_more</span>
                  </div>
                </div>
                <div className="activity-list empty-state">
                  <div className="empty-icon">
                    <Activity size={40} />
                  </div>
                  <p>No recent activity</p>
                  <p className="empty-subtitle">Activity from your projects and teams will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;