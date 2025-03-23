import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

/*
import React from "react";
import TeamMemberForm from "./components/TeamMemberForm";

function App() {
    const currentUserId = 2; 
    const projectId = 1;   

    return (
        <div>
            <h1>Team Management</h1>
            <TeamMemberForm currentUserId={currentUserId} projectId={projectId} />
        </div>
    );
}

export default App;
*/
