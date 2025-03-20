import RegisterPage from "./pages/RegisterPage";
import './App.css';
import Project from "./components/Project.jsx"
import List from "./components/List.jsx"
import TaskItem from "./components/TaskItem.jsx";
import ProjectContainer from "./components/ProjectContainer.jsx";

function App() {
  return (
    <div>
      {/* <RegisterPage /> */}

      <h1>Task Management Board</h1>
      <Project id="7" />

      {/* <ProjectContainer userID="1" /> */}
    </div>

  );
}

export default App;
