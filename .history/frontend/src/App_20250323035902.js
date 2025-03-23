// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Dashboard from './pages/Dashboard';

// Import your Auth pages
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * The App component is the main entry point of the application, setting up the routes using
 * React Router. It defines the routes for the login, register, and dashboard pages, as well as
 * placeholders for the projects and tasks pages. Each page is wrapped with the AppLayout component
 * to provide a consistent layout structure.
 */

/******  609ca8fe-ed05-49b2-a091-4d66bd251db7  *******/
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
