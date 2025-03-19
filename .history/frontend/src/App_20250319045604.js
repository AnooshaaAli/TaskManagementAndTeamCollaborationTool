import RegisterPage from "./pages/RegisterPage";
import './App.css';
import Project from "./components/Project.jsx"
import List from "./components/List.jsx"
import TaskItem from "./components/TaskItem.jsx";
import ProjectContainer from "./components/ProjectContainer.jsx";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// Import other components

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        {/* Other routes */}
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
