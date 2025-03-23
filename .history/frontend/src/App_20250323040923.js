// App.jsx - Updated with consistent layout
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        {/* Add more authenticated routes inside the AppLayout */}
        <Route path="/projects" element={
          <AppLayout>
            <div className="page-container">
              <h1 className="page-title">Projects</h1>
              <p>Projects page content will go here</p>
            </div>
          </AppLayout>
        } />
        <Route path="/tasks" element={
          <AppLayout>
            <div className="page-container">
              <h1 className="page-title">Tasks</h1>
              <p>Tasks page content will go here</p>
            </div>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;

/*
import React from "react";
import TeamMemberForm from "./components/AddMember";
import RemoveMemberFromTeam from "./components/RemoveMember";

function App() {
    const currentUserId = 2;  
    const projectId = 1;    

    return (
        <div>
            <h1>Team Management</h1>
            <RemoveMemberFromTeam projectId={projectId} />
        </div>
    );
}

export default App;
*/
