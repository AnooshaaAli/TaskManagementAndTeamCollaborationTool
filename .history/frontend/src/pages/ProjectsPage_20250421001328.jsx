import React, { useState, useEffect } from 'react';
import { Filter, Plus } from 'lucide-react';
import "../styles/styles.css";
import "../styles/dashboard.css";
import "../styles/projects_container.css";

const ProjectsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/auth/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await response.json();
        setUserData(userData);
        
        // Mock projects data - replace with actual API call
        setProjects([
          {
            id: 1,
            name: "PDC",
            description: "semester project",
            deadline: null,
            members: 1
          },
          {
            id: 2,
            name: "AI",
            description: "semester project",
            deadline: null,
            members: 1
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateProject = () => {
    // Handle project creation logic
    console.log("Creating new project");
  };

  const handleViewDetails = (projectId) => {
    // Navigate to project details page
    console.log("Viewing project", projectId);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="projects-page dark-theme">
      <div className="projects-container">
        <h1 className="projects-heading">Projects</h1>
        
        <div className="project-dashboard-container">
          <div className="project-dashboard-header">
            <h2>Project Dashboard</h2>
            <button className="filter-button">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-icon">
                  <span className="folder-icon"></span>
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-details">
                  <div className="project-detail">
                    <span className="detail-icon deadline"></span>
                    <span className="detail-text">No deadline</span>
                  </div>
                  <div className="project-detail">
                    <span className="detail-icon members"></span>
                    <span className="detail-text">{project.members} members</span>
                  </div>
                </div>
                
                <button 
                  className="view-details-button" 
                  onClick={() => handleViewDetails(project.id)}
                >
                  View Details
                </button>
              </div>
            ))}
            
            <div className="create-project-card" onClick={handleCreateProject}>
              <div className="create-project-icon">
                <Plus size={24} />
              </div>
              <p className="create-project-text">Create New Project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;