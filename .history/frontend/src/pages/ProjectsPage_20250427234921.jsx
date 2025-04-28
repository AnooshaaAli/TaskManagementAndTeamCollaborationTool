import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import ProjectContainer from '../components/ProjectContainer';
import CalendarComponent from '../components/Calendar';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import "../styles/projects_page.css";
import { PieChart, ListTodo, Users, Folder, Calendar, Star, Bell, Activity, LogOut } from 'lucide-react';

const ProjectsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeSidebarItem, setActiveSidebarItem] = useState('projects'); 

  useEffect(() => {
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

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const navigateToCalendar = () => {
    setActiveSidebarItem('calendar');
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
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>TeamCollab</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li 
            onClick={() => handleNavigation('/dashboard')
            >
              <PieChart size={20} className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li 
              className={activeSidebarItem === 'projects' ? 'active' : ''}
              style={{ cursor: 'pointer' }}
            >
              <Folder size={20} className="nav-icon" />
              <span>Projects</span>
            </li>
            <li 
              className={activeSidebarItem === 'calendar' ? 'active' : ''}
              onClick={navigateToCalendar}
              style={{ cursor: 'pointer' }}
            >
              <Calendar size={20} className="nav-icon" />
              <span>Calendar</span>
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
              <p className="user-name">{userData?.username || "User"}</p>
              <p className="user-role">{userData?.role || "Team Member"}</p>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout} aria-label="Logout">
            <LogOut size={18} className="logout-icon" />
            <span>Logout</span>
          </button>
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
              <img src={userData?.avatar || "/default-avatar.png"} alt="Profile" className="avatar-small" />
              <span>{userData?.username || "User"}</span>
            </div>
            <button className="header-logout-button" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </header>    

        {/* Projects Page Content */}
        {activeSidebarItem === 'projects' && (
          <div className="projects-page-content">
            <div className="projects-content">
              <Card className="projects-card full-width">
                <div className="project-container-wrapper">
                  <ProjectContainer userID={userData?.userID} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Calendar Page Content */}
        {activeSidebarItem === 'calendar' && (
          <Card className="calendar-card">
            <div className="card-header">
              <h3>Calendar</h3>
            </div>
            <CalendarComponent />
          </Card>
        )}
        
      </div>
    </div>
  );
};

export default ProjectsPage;