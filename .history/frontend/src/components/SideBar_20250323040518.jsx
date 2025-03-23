import React from 'react';
import Logo from './Logo';

const Sidebar = () => {
  const navItems = [
    { title: 'Dashboard', icon: 'dashboard', active: true },
    { title: 'Widgets', icon: 'widgets' },
    { title: 'Page Layouts', icon: 'layouts' },
    { title: 'Sidebar Layouts', icon: 'sidebar' },
    { title: 'Basic UI Elements', icon: 'ui' },
    { title: 'Advanced Elements', icon: 'advanced' },
    { title: 'Form Elements', icon: 'form' },
    { title: 'Tables', icon: 'tables' },
    { title: 'Editors', icon: 'editors' },
    { title: 'Charts', icon: 'charts' },
    { title: 'Maps', icon: 'maps' },
    { title: 'Notifications', icon: 'notifications' },
    { title: 'Icons', icon: 'icons' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="user-avatar">
            {/* Placeholder for user avatar */}
          </div>
          <div className="user-info">
            <p className="user-name">Henry Klein</p>
            <p className="user-role">Gold Member</p>
          </div>
        </div>
      </div>
      
      <div className="sidebar-section-title">Navigation</div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item, index) => (
            <li key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
              <a href="#" className="nav-link">
                <span className={`nav-icon icon-${item.icon}`}></span>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-section-title">More</div>
    </div>
  );
};

export default Sidebar;