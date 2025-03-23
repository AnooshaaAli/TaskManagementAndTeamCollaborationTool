// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import Dashboard from './Dashboard';

// Import your Auth pages
import Login from './pages/LoginP';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <AppLayout>
            <Dashboard />
          </AppLayout>
        } />
        <Route path="/projects" element={
          <AppLayout>
            <div>Projects Page (to be implemented)</div>
          </AppLayout>
        } />
        <Route path="/tasks" element={
          <AppLayout>
            <div>Tasks Page (to be implemented)</div>
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
