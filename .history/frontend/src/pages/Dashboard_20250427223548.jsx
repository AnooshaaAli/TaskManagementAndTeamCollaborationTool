import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import NotificationList from '../components/NotificationList';
import TaskItem from '../components/TaskItem';
import { PieChart, ListTodo, Users, Folder, Calendar, Star, Bell, Activity, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity');
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState('dark'); 
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme + '-theme';
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme + '-theme';
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("jwtToken");
      const userID = userData?.userID;

      console.log("Fetching notifications for user:", userID);
      console.log("Using token:", token);

      if (!userID || !token) return;

      try {
        const response = await fetch(`http://localhost:8080/api/notifications/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          console.error("Failed to fetch notifications:", response.status);
          return;
        }

        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    };

    if (userData?.userID) {
      fetchNotifications();
    }
  }, [userData]);

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
    console.log("Fetched userData:", userData);

  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("jwtToken");
      const userID = userData?.userID;

      console.log("Fetching tasks for user:", userID);
      console.log("Using token:", token);

      if (!userID || !token) return;

      try {
        const response = await fetch(`http://localhost:8080/assign/assignedTasks?memberID=${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch tasks:", response.status);
          return;
        }

        const data = await response.json();
        console.log(data);
        setTasks(data); // store tasks in state
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };

    if (userData?.userID) {
      fetchTasks();
    }
  }, [userData]);

  useEffect(() => {
    if (!userData.userID) return;
    fetchProjects();
}, [userID]);

  const fetchProjects = () => {
      setIsLoading(true);
      const token = localStorage.getItem("jwtToken");
      console.log("user id: " + userData.userID)

      fetch("http://localhost:8080/projects/user/" + userData.userID, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
          .then(async response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const text = await response.text();
              const data = text ? JSON.parse(text) : {};

              console.log("Fetched projects:", data);
              setProjects(Object.values(data));
              setIsLoading(false);
          })
          .catch(error => {
              console.error("Error fetching projects:", error);
              setIsLoading(false);
          });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const navigateToProjects = () => {
    navigate('/projects');
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) => {
      // Create a new object with the updated task
      const updatedTasks = { ...prevTasks };
      updatedTasks[updatedTask.taskID] = updatedTask;
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskID) => {
    setTasks((prevTasks) => {
      // Create a new object without the deleted task
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[taskID]; // Delete the task with the given taskID
      return updatedTasks;
    });
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
    <div className={`dashboard-container ${theme}-theme`}>
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
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
            <li onClick={navigateToProjects} style={{ cursor: 'pointer' }}>
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

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}
              {showNotifications && (
                <div className="notification-dropdown">
                  <NotificationList notifications={notifications} />
                </div>
              )}
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
            <span className="stat-value">
              {Array.isArray(tasks) ? tasks.length : Object.keys(tasks).length}
            </span>
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
              <span className="stat-value">{notifications.length}</span>
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
                <div className="task-list">
                  {Object.values(tasks).map((task) => (
                    <TaskItem
                      key={task.taskID}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                      isTeamLead={false}
                    />
                  ))}
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

            {activeTab === 'activity' && (
              <Card className="activity-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
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