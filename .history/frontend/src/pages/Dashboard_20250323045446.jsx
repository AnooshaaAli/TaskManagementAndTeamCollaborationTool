import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Logo from '../components/Logo';
import "../styles/styles.css";
import "../styles/dashboard.css";
import { Calendar, Clock, CheckCircle, Users, Folder, Bell, PieChart, ListTodo, Star } from 'lucide-react';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete dashboard redesign", status: "In Progress", priority: "High", dueDate: "2025-03-25", assignedTo: "You" },
    { id: 2, title: "Team meeting preparation", status: "To Do", priority: "Medium", dueDate: "2025-03-24", assignedTo: "You" },
    { id: 3, title: "Review project proposal", status: "To Do", priority: "High", dueDate: "2025-03-26", assignedTo: "Sarah K." },
    { id: 4, title: "Update user documentation", status: "In Progress", priority: "Low", dueDate: "2025-03-29", assignedTo: "Mike T." },
    { id: 5, title: "Client presentation", status: "Completed", priority: "High", dueDate: "2025-03-22", assignedTo: "You" }
  ]);

  const [projects] = useState([
    { id: 1, name: "Website Redesign", progress: 65, members: 4 },
    { id: 2, name: "Mobile App Development", progress: 32, members: 6 },
    { id: 3, name: "Marketing Campaign", progress: 78, members: 3 }
  ]);

  const [notifications] = useState([
    { id: 1, text: "James assigned you a new task", time: "10 minutes ago" },
    { id: 2, text: "Team meeting scheduled for tomorrow", time: "1 hour ago" },
    { id: 3, text: "Project deadline updated", time: "3 hours ago" }
  ]);

  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    // Simulate API call to get user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/auth/user", {
           headers: { Authorization: `Bearer ${token}` }
         });
         const userData = await response.json();
        
        // For demo purposes, using mock data
        
        setTimeout(() => {
          setUserData(mockUserData);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      case "Low": return "priority-low";
      default: return "";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress": return "status-progress";
      case "To Do": return "status-todo";
      case "Completed": return "status-completed";
      default: return "";
    }
  };

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
              <span className="notification-count">3</span>
            </div>
            <div className="user-dropdown">
              <img src={userData.avatar} alt="Profile" className="avatar-small" />
              <span>{userData.name}</span>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome back, {userData.name.split(' ')[0]}</h1>
            <p>Here's what's happening with your projects today</p>
          </div>
          <div className="welcome-actions">
            <Button variant="primary" size="sm">
              <ListTodo size={16} />
              Create Task
            </Button>
            <Button variant="outline" size="sm">
              <Calendar size={16} />
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-icon tasks">
              <ListTodo size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-title">Open Tasks</p>
              <h3 className="stat-value">12</h3>
              <p className="stat-change increase">+2 from yesterday</p>
            </div>
          </Card>
          
          <Card className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-title">Completed</p>
              <h3 className="stat-value">5</h3>
              <p className="stat-change increase">+3 from yesterday</p>
            </div>
          </Card>
          
          <Card className="stat-card">
            <div className="stat-icon projects">
              <Folder size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-title">Active Projects</p>
              <h3 className="stat-value">3</h3>
              <p className="stat-change neutral">No change</p>
            </div>
          </Card>
          
          <Card className="stat-card">
            <div className="stat-icon time">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <p className="stat-title">Hours Tracked</p>
              <h3 className="stat-value">24.5</h3>
              <p className="stat-change decrease">-2.5 from yesterday</p>
            </div>
          </Card>
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
              Notifications
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'tasks' && (
              <Card className="tasks-card">
                <div className="card-header">
                  <h3>Recent Tasks</h3>
                  <Button variant="text" size="sm">View All</Button>
                </div>
                
                <div className="tasks-list">
                  {tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-details">
                        <h4 className="task-title">{task.title}</h4>
                        <div className="task-meta">
                          <span className="task-assignee">
                            <Users size={14} />
                            {task.assignedTo}
                          </span>
                          <span className="task-due">
                            <Calendar size={14} />
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="task-status">
                        <select 
                          className={getStatusClass(task.status)}
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {activeTab === 'projects' && (
              <Card className="projects-card">
                <div className="card-header">
                  <h3>Active Projects</h3>
                  <Button variant="text" size="sm">View All</Button>
                </div>
                
                <div className="projects-list">
                  {projects.map(project => (
                    <div key={project.id} className="project-item">
                      <div className="project-info">
                        <h4 className="project-title">{project.name}</h4>
                        <div className="project-meta">
                          <span className="project-members">
                            <Users size={14} />
                            {project.members} members
                          </span>
                        </div>
                      </div>
                      
                      <div className="project-progress">
                        <div className="progress-text">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            
            {activeTab === 'notifications' && (
              <Card className="notifications-card">
                <div className="card-header">
                  <h3>Recent Notifications</h3>
                  <Button variant="text" size="sm">Mark All Read</Button>
                </div>
                
                <div className="notifications-list">
                  {notifications.map(notif => (
                    <div key={notif.id} className="notification-item">
                      <div className="notification-icon">
                        <Bell size={16} />
                      </div>
                      <div className="notification-content">
                        <p className="notification-text">{notif.text}</p>
                        <p className="notification-time">{notif.time}</p>
                      </div>
                    </div>
                  ))}
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