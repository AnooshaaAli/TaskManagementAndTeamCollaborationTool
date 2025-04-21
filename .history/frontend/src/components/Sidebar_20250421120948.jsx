import React from 'react';
import { PieChart, ListTodo, Users, Folder, Calendar, Star, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
im

const Sidebar = ({ userData, handleLogout, activePage }) => {
  const navigate = useNavigate();
  
  const navigateTo = (path) => {
    navigate(path);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logo.png" alt="TeamCollab" className="logo" />
        <h2>TeamCollab</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="main-nav">
          <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => navigateTo('/dashboard')}>
            <PieChart size={20} className="nav-icon" />
            <span>Dashboard</span>
          </li>
          <li className={activePage === 'tasks' ? 'active' : ''} onClick={() => navigateTo('/tasks')}>
            <ListTodo size={20} className="nav-icon" />
            <span>My Tasks</span>
          </li>
          <li className={activePage === 'team' ? 'active' : ''} onClick={() => navigateTo('/team')}>
            <Users size={20} className="nav-icon" />
            <span>Team</span>
          </li>
          <li className={activePage === 'projects' ? 'active' : ''} onClick={() => navigateTo('/projects')}>
            <Folder size={20} className="nav-icon" />
            <span>Projects</span>
          </li>
          <li className={activePage === 'calendar' ? 'active' : ''} onClick={() => navigateTo('/calendar')}>
            <Calendar size={20} className="nav-icon" />
            <span>Calendar</span>
          </li>
          <li className={activePage === 'reports' ? 'active' : ''} onClick={() => navigateTo('/reports')}>
            <Star size={20} className="nav-icon" />
            <span>Reports</span>
          </li>
        </ul>
        
        <div className="tab-navigation">
          <div className="tab-header">Categories</div>
          <ul className="tab-list">
            <li className="active">Popular</li>
            <li>Airing</li>
            <li>Upcoming</li>
          </ul>
        </div>
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
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;