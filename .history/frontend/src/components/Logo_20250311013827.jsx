// Logo.jsx
import React from 'react';
import "../styles/styles.css";

const Logo = ({ size = 'md' }) => {
  return (
    <div className={`logo logo-${size}`}>
      PROJJECTORYY
    </div>
  );
};

export default Logo;

