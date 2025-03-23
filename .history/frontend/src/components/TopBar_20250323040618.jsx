import React from 'react';
import Button from './Button';

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="app-branding">
          <Logo size="sm" />
          <span className="app-name">CORONA</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products"
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      
      <div className="topbar-right">
        <Button variant="primary" className="create-button">
          + Create New Project
        </Button>
        <div className="topbar-icons">
          <button className="icon-button">🔔</button>
          <button className="icon-button">📋</button>
          <button className="icon-button">📨</button>
        </div>
        <div className="user-profile-mini">
          <div className="user-avatar-mini">
            {/* Placeholder for user avatar */}
          </div>
          <span className="user-name-mini">Henry Klein</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;