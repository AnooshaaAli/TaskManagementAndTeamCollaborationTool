import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AppLayout = ({ children }) => {
  return (
    <div className="dashboard-container dark-theme">
      <Sidebar />
      <div className="dashboard-content">
        <TopBar />
        <main className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;