// src/components/NotificationList.jsx
import React from 'react';
import '../styles/notification-list.css'; // create and style this

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-list">
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.notificationID} className="notification-item">
              {n.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
