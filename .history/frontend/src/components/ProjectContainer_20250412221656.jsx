import React, { useState, useEffect } from "react";
import ProjectPreview from "./ProjectPreview.jsx";
import Project from "./Project.jsx";
import CreateProject from "./CreateProject.jsx";
import { FolderPlus, ListFilter, ArrowLeft } from 'lucide-react';

const ProjectContainer = ({ userID }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    const fetchProjects = () => {
        if (!userID) return;
    
        setIsLoading(true);
        const token = localStorage.getItem("jwtToken");
        console.log(userID);
        fetch("http://localhost:8080/projects/user/" + userID, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched projects:", data);
                setProjects(Object.values(data));
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
                setIsLoading(false);
            });
    };    

    useEffect(() => {
        fetchProjects();
    }, [userID]);    

    const addProject = (newProject) => {
        setProjects(prev => [...prev, newProject]);
    };

    const handleBackToProjects = () => {
        setSelectedProject(null);
        fetchProjects(); 
    };

    const filteredProjects = projects;

    return (
        <div className="projects-container">
            <div className="card-header">
                <h3>Project Dashboard</h3>
                {!selectedProject && (
                    <div className="header-actions">
                        <div className="filter-dropdown">
                            <ListFilter size={16} />
                            <span>Filter</span>
                        </div>
                    </div>
                )}
            </div>

            {selectedProject ? (
                <div>
                    <button
                        className="back-button"
                        onClick={handleBackToProjects}
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Projects</span>
                    </button>
                    <Project id={selectedProject} />
                </div>
            ) : (
                <div>
                    {isLoading ? (
                        <div className="empty-state">
                            <div className="loading-spinner"></div>
                            <p>Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="empty-state">
                            <FolderPlus size={48} className="empty-icon" />
                            <p>No projects found</p>
                            <CreateProject userID={userID} onProjectCreated={addProject} />
                            <p className="empty-subtitle">Create your first project to get started</p>
                        </div>
                    ) : (
                        <div className="projects-grid">
                            {filteredProjects.map((project) => (
                                <ProjectPreview
                                    key={project.projectID}
                                    id={project.projectID}
                                    name={project.name}
                                    onSelect={setSelectedProject}
                                />
                            ))}
                            <CreateProject userID={userID} onProjectCreated={addProject} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectContainer;