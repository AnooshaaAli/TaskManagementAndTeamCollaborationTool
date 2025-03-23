import React from 'react';
import Button from './Button';

const AnnouncementBanner = ({ title, description }) => {
  return (
    <div className="announcement-banner">
      <div className="announcement-content">
        <div className="announcement-icon">
          {/* Replace with your Logo or icon */}
          <span className="icon-graphic"></span>
        </div>
        <div className="announcement-text">
          <h3 className="announcement-title">{title}</h3>
          <p className="announcement-description">{description}</p>
        </div>
      </div>
      <Button variant="secondary" className="announcement-button">
        Get Started
      </Button>
    </div>
  );
};

export default AnnouncementBanner;