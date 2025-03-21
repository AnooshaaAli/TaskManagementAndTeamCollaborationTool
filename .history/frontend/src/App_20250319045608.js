import RegisterPage from "./pages/RegisterPage";
import './App.css';
import Project from "./components/Project.jsx"
import List from "./components/List.jsx"
import TaskItem from "./components/TaskItem.jsx";
import ProjectContainer from "./components/ProjectContainer.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// Import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Other routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;