import React, { useState, useEffect } from "react";
import ProjectPreview from "./ProjectPreview.jsx";
import Project from "./Project.jsx"; // Import full project view
import CreateProject from "./CreateProject.jsx";

const ProjectContainer = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/projects")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched projects:", data);
                setProjects(Object.values(data));
            })
            .catch(error => console.error("Error fetching projects:", error));
    }, []);

    const addProject = (newProject) => {
        setProjects(prev => [...prev, newProject]); // Add the new project to state
    };

    return (
        <div>
            <h1>Project Dashboard</h1>
            {selectedProject ? (
                <Project id={selectedProject} />
            ) : (
                <div>
                    {projects.length === 0 ? (
                        <p>Loading projects...</p>
                    ) : (
                        projects.map((project) => (
                            <ProjectPreview
                                key={project.projectID}
                                id={project.projectID}
                                name={project.name}
                                onSelect={setSelectedProject}
                            />
                        ))
                    )}
                    <CreateProject onProjectCreated={addProject} />
                </div>
            )}
        </div>
    );
};

export default ProjectContainer;
