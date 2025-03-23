import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Logo from '../components/Logo';
import ProjectContainer from '../components/ProjectContainer';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import { PieChart, ListTodo, Users, Folder, Calendar, Star, Bell, Activity } from 'lucide-react';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity');

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
        <div className="loading-spinner"></div>
        <p>Loading your workspace...</p>
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
              <PieChart size={20} className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li>
              <ListTodo size={20} className="nav-icon" />
              <span>My Tasks</span>
            </li>
            <li>
              <Users size={20} className="nav-icon" />
              <span>Team</span>
            </li>
            <li>
              <Folder size={20} className="nav-icon" />
              <span>Projects</span>
            </li>
            <li>
              <Calendar size={20} className="nav-icon" />
              <span>Calendar</span>
            </li>
            <li>
              <Star size={20} className="nav-icon" />
              <span>Reports</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar-container">
              <img src={userData?.avatar || "/default-avatar.png"} alt="Profile" className="avatar" />
              <div className="status-indicator online"></div>
            </div>
            <div className="user-info">
              <p className="user-name">{userData?.name || "User"}</p>
              <p className="user-role">{userData?.role || "Team Member"}</p>
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
            <button className="theme-toggle">
              <span className="material-icons">dark_mode</span>
            </button>
            <div className="notification-bell">
              <Bell size={20} />
              <span className="notification-count">0</span>
            </div>
            <div className="user-dropdown">
              <img src={userData?.avatar || "/default-avatar.png"} alt="Profile" className="avatar-small" />
              <span>{userData?.name || "User"}</span>
            </div>
          </div>
        </header>

        {/* Welcome Section - Enhanced */}
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
              <Folder size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">3</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon tasks">
              <ListTodo size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">8</span>
              <span className="stat-label">Tasks</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon team">
              <Users size={20} />
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
              className={activeTab === 'projects' ? 'active' : ''}
              onClick={() => setActiveTab('projects')}
            >
              Projects
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
                  <button className="add-button">
                    <span className="material-icons">add</span>
                    New Task
                  </button>
                </div>
                <div className="tasks-list empty-state">
                  <div className="empty-icon">
                    <ListTodo size={40} />
                  </div>
                  <p>No tasks assigned yet</p>
                  <button className="btn-connect">Connect Task Manager</button>
                </div>
              </Card>
            )}
            
            {activeTab === 'projects' && (
              <Card className="projects-card">
                <div className="card-header">
                  <h3>Projects</h3>
                  <button className="add-button">
                    <span className="material-icons">add</span>
                    New Project
                  </button>
                </div>
                <div className="project-container-wrapper">
                  <ProjectContainer userID={userData?.userID} />
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

// Add these styles to your dashboard.css file
const styles = `
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #e6e6e6;
}

.dashboard-sidebar {
  width: 240px;
  background-color: #212121;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #333;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #9e9e9e;
}

.sidebar-nav li:hover {
  background-color: #2a2a2a;
  color: #fff;
}

.sidebar-nav li.active {
  background-color: #2563eb;
  color: #fff;
  border-left: 3px solid #60a5fa;
}

.nav-icon {
  opacity: 0.8;
}

.user-profile {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #333;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  bottom: 0;
  right: 0;
  border: 2px solid #212121;
}

.status-indicator.online {
  background-color: #22c55e;
}

.user-info {
  overflow: hidden;
}

.user-name {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  margin: 0;
  font-size: 12px;
  color: #9e9e9e;
}

.dashboard-main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-search input {
  background-color: #2a2a2a;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 8px 16px;
  color: #e6e6e6;
  width: 260px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  background: transparent;
  border: none;
  color: #9e9e9e;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-bell {
  position: relative;
  cursor: pointer;
  color: #9e9e9e;
}

.notification-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #2563eb;
  color: white;
  font-size: 10px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.user-dropdown:hover {
  background-color: #2a2a2a;
}

.avatar-small {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.welcome-text h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}

.subtitle {
  margin: 4px 0 0;
  color: #9e9e9e;
  font-size: 14px;
}

.date-display {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9e9e9e;
  font-size: 14px;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  background-color: #212121;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #333;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.projects {
  background-color: #8b5cf6;
}

.stat-icon.tasks {
  background-color: #2563eb;
}

.stat-icon.team {
  background-color: #db2777;
}

.stat-icon.activity {
  background-color: #16a34a;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.stat-label {
  font-size: 12px;
  color: #9e9e9e;
}

.content-tabs {
  background-color: #212121;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
}

.tab-buttons {
  display: flex;
  border-bottom: 1px solid #333;
}

.tab-buttons button {
  flex: 1;
  background: transparent;
  border: none;
  padding: 16px;
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-buttons button:hover {
  color: #fff;
}

.tab-buttons button.active {
  color: #fff;
  position: relative;
}

.tab-buttons button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 3px;
  background-color: #2563eb;
  border-radius: 3px 3px 0 0;
}

.tab-content {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #1d4ed8;
}

.filter-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #2a2a2a;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
  text-align: center;
  color: #9e9e9e;
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-state p {
  margin: 0 0 8px;
  font-size: 16px;
}

.empty-subtitle {
  font-size: 14px;
  opacity: 0.7;
}

.btn-connect {
  margin-top: 16px;
  background-color: transparent;
  border: 1px solid #2563eb;
  color: #2563eb;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-connect:hover {
  background-color: rgba(37, 99, 235, 0.1);
}

.loading-spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 3px solid #2563eb;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.dashboard-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #9e9e9e;
}
`;

export default DashboardPage;