import React from 'react';
import '../styles/notification-list.css';

const NotificationList = ({ notifications, onMarkRead, onViewAll }) => {
  // Function to format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h4>Notifications</h4>
        {notifications.length > 0 && (
          <button className="mark-all-read" onClick={() => onMarkRead && onMarkRead()}>
            Mark all read
          </button>
        )}
      </div>
      
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">You have no notifications</p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li 
                key={notification.notificationID} 
                className={`notification-item ${notification.isRead ? '' : 'new'}`}
              >
                {!notification.isRead && <div className="notification-dot"></div>}
                <div className="notification-content">
                  {notification.content}
                  
                  <div className="notification-meta">
                    <span className="notification-time">
                      {formatTime(notification.timestamp)}
                    </span>
                    
                    <div className="notification-actions">
                      {!notification.isRead && (
                        <button onClick={() => onMarkRead && onMarkRead(notification.notificationID)}>
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="notification-footer">
          <a href="#" onClick={(e) => { 
            e.preventDefault(); 
            onViewAll && onViewAll();
          }}>
            View all notifications
          </a>
        </div>
      )}
    </div>
  );
};

export default NotificationList;