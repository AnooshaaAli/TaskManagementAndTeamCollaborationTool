import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Logo from '../components/Logo';
import ProjectContainer from '../components/ProjectContainer';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import { PieChart, ListTodo, Users, Folder, Calendar, Star, Bell } from 'lucide-react';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
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

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container dark-theme">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <Logo size="sm" />
          <h2>TeamCollab</h2>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <PieChart size={18} />
              <span>Dashboard</span>
            </li>
            <li>
              <ListTodo size={18} />
              <span>My Tasks</span>
            </li>
            <li>
              <Users size={18} />
              <span>Team</span>
            </li>
            <li>
              <Folder size={18} />
              <span>Projects</span>
            </li>
            <li>
              <Calendar size={18} />
              <span>Calendar</span>
            </li>
            <li>
              <Star size={18} />
              <span>Reports</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <img src={userData.avatar} alt="Profile" className="avatar" />
            <div className="user-info">
              <p className="user-name">{userData.name}</p>
              <p className="user-role">{userData.role}</p>
            </div>
          </div>
        </div>
      </div>

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
              <img src={userData.avatar} alt="Profile" className="avatar-small" />
              <span>{userData.name}</span>
            </div>
          </div>
        </header>

        {/* Welcome Section - Simplified */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome, {userData ? userData.username.split(' ')[0] : 'User'}</h1>
            <p>Your workspace overview</p>
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
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
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
                  <p>Connect your task management system to view tasks here</p>
                </div>
              </Card>
            )}
            
            {activeTab === 'projects' && (
              <Card className="projects-card">
                <div className="project-container-wrapper">
                  <ProjectContainer userID={userData.userID} />
                </div>
              </Card>
            )}
            
            {activeTab === 'notifications' && (
              <Card className="notifications-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="notifications-list empty-state">
                  <p>No recent activity</p>
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