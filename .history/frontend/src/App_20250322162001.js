import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Project from "./components/Project.jsx"
import List from "./components/List.jsx"
import TaskItem from "./components/TaskItem.jsx";
import ProjectContainer from "./components/ProjectContainer.jsx";
import Dashboard from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;