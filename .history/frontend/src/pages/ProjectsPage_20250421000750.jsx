import React, { useState, useEffect } from 'react';
import ProjectContainer from '../components/ProjectContainer';
import "../styles/styles.css";
import "../styles/projects_container.css";

const ProjectsPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8080/auth/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = await response.json();

        setUserData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <h1 className="projects-page-title">Projects</h1>
      <div className="projects-container">
        <ProjectContainer userID={userData?.userID} />
      </div>
    </div>
  );
};

export default ProjectsPage;