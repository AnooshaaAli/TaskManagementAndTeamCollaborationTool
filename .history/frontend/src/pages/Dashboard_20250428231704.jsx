import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";
import CalendarComponent from '../components/Calendar';
import NotificationList from '../components/NotificationList';
import TaskItem from '../components/TaskItem';
import UploadDp from '../components/UploadDp';
import { PieChart, ListTodo, Users, Folder, Calendar, Star, Bell, Activity, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('activity');
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard'); 
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState('dark'); 
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [profilePic, setProfilePic] = useState(null); 
  const [error, setError] = useState(null);
  const [showUploadDp, setShowUploadDp] = useState(false);

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme + '-theme';
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme + '-theme';
  };

  const handleMarkAsRead = (id) => {
    if (id) {
      setNotifications(prevNotifications =>
        prevNotifications.map(n => 
          n.notificationID === id ? { ...n, isRead: true } : n
        )
      );
    } else {
      setNotifications(prevNotifications =>
        prevNotifications.map(n => ({ ...n, isRead: true }))
      );
    }
  };
  
  const handleViewAllNotifications = () => {
    setShowNotifications(false);
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
        setTasks(data); 
      } catch (err) {
        console.error("Failed to load tasks", err);
      }
    };

    if (userData?.userID) {
      fetchTasks();
    }
  }, [userData]);

  const fetchProjects = async () => {
    if (!userData?.userID) return;
    
    const token = localStorage.getItem("jwtToken");
    console.log("user id: " + userData.userID);
    
    try {
      const response = await fetch("http://localhost:8080/projects/user/" + userData.userID, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      
      console.log("Fetched projects:", data);
      setProjects(Object.values(data));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const fetchProfilePic = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const userID = userData?.userID;

      const response = await fetch(`http://localhost:8080/files/user-dp/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Profile picture not found or error occurred.");
      }

      // Get the image as a Blob
      const imageBlob = await response.blob();

      // Create a temporary URL for the image Blob
      const imageUrl = URL.createObjectURL(imageBlob);

      console.log(imageUrl);
      // Set the image URL in state
      setProfilePic(imageUrl);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (userData?.userID) {
      fetchProjects();
    }
  }, [userData]);

  const getTeamMemberCount = () => {
    if (!projects || projects.length === 0) {
      return 0;
    }
    
    const uniqueTeamMembers = new Set();
    
    projects.forEach(project => {
      if(project.teamLeadID != userData.userID) {
        uniqueTeamMembers.add(project);
      }
    });
    
    return uniqueTeamMembers.size;
  };
useEffect(() => {
    fetchProfilePic();
  }, [userData]);

  const updateProfilePic = async () => {
    await fetchProfilePic();  // Wait for the async function to finish
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  const navigateToProjects = () => {
    setActiveSidebarItem('projects');
    navigate('/projects');
  };

  // New function to handle calendar navigation
  const navigateToCalendar = () => {
    setActiveSidebarItem('calendar');
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[updatedTask.taskID] = updatedTask;
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskID) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[taskID]; 
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
          <h2 className='app-name'>Projectory</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeSidebarItem === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveSidebarItem('dashboard')}
              style={{ cursor: 'pointer' }}
            >
              <PieChart size={20} className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li 
              className={activeSidebarItem === 'projects' ? 'active' : ''}
              onClick={navigateToProjects}
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
            <div className="avatar-container" onClick={() => setShowUploadDp(true)}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="avatar" />
              ) : (
                <img src="/default-avatar.png" alt="Profile" className="avatar" />
              )}
              <div className="status-indicator online"></div>
              {showUploadDp && (
                <UploadDp
                  key={showUploadDp}  
                  userID={userData?.userID}
                  onUpload={updateProfilePic}
                  onCancel={() => setShowUploadDp(false)} 
                />
              )}
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
              <Bell size={18} />
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="notification-count">{notifications.filter(n => !n.isRead).length}</span>
              )}
              {showNotifications && (
                <NotificationList 
                  notifications={notifications} 
                  onMarkRead={(id) => handleMarkAsRead(id)} 
                  onViewAll={() => handleViewAllNotifications()} 
                />
              )}
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
              <span className="stat-value">{projects.length}</span>
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
              <span className="stat-value">{getTeamMemberCount()}</span>
              <span className="stat-label">Teams</span>
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

        {/* Display different content based on active sidebar item */}
        {activeSidebarItem === 'calendar' ? (
          // Calendar View
          <Card className="calendar-card">
            <div className="card-header">
              <h3>Calendar</h3>
            </div>
            <CalendarComponent />
          </Card>
        ) : (
          // Regular Dashboard Content
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
                    {Object.values(tasks).length > 0 ? (
                      Object.values(tasks).map((task) => (
                        <TaskItem
                          key={task.taskID}
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          isTeamLead={false}
                        />
                      ))
                    ) : (
                      <div className="tasks-list empty-state">
                        <div className="empty-icon">
                          <ListTodo size={40} />
                        </div>
                        <p>No tasks assigned yet</p>
                      </div>
                    )}
                  </div>                
                </Card>
              )}

              {activeTab === 'activity' && (
                <div className="notification-list" style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px var(--shadow-color)',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  width: '100%'
                }}>
                  <div className="notification-header" style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h4 style={{ margin: 0 }}>Recent Activity</h4>
                    {notifications.length > 0 && (
                      <button 
                        className="mark-all-read" 
                        onClick={() => handleMarkAsRead()}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-color)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  {notifications && notifications.length > 0 ? (
                    <>
                      <ul style={{
                        listStyleType: 'none',
                        margin: 0,
                        padding: 0
                      }}>
                        {notifications.map((notification) => (
                          <li 
                            key={notification.notificationID} 
                            className={`notification-item ${notification.isRead ? '' : 'new'}`}
                            style={{
                              padding: '12px 16px',
                              borderBottom: '1px solid var(--border-light)',
                              color: 'var(--text-secondary)',
                              fontSize: '14px',
                              transition: 'background-color 0.2s',
                              position: 'relative'
                            }}
                          >
                            {!notification.isRead && (
                              <div className="notification-dot" style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-color)',
                                position: 'absolute',
                                left: '6px',
                                top: '16px'
                              }}></div>
                            )}
                            <div className="notification-content" style={{
                              paddingLeft: notification.isRead ? '0' : '12px'
                            }}>
                              {notification.content}
                              
                              <div className="notification-meta" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '6px',
                                fontSize: '12px',
                                color: 'var(--text-tertiary)'
                              }}>            
                                <div className="notification-actions">
                                  {!notification.isRead && (
                                    <button 
                                      onClick={() => handleMarkAsRead(notification.notificationID)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--primary-color)',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        padding: '2px 0'
                                      }}
                                    >
                                      Mark read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="notification-footer" style={{
                        padding: '10px 16px',
                        borderTop: '1px solid var(--border-light)',
                        textAlign: 'center'
                      }}>
                        <a 
                          href="#" 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            handleViewAllNotifications();
                          }}
                          style={{
                            color: 'var(--primary-color)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}
                        >
                          View all notifications
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="no-notifications" style={{
                      padding: '16px',
                      textAlign: 'center',
                      color: 'var(--text-tertiary)',
                      fontSize: '14px',
                      margin: 0
                    }}>
                      <p style={{ margin: '8px 0' }}>No recent activity</p>
                      <p style={{ margin: '8px 0', color: 'var(--text-tertiary)' }}>Activity from your projects and teams will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;