import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

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