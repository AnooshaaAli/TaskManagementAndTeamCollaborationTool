import React from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;