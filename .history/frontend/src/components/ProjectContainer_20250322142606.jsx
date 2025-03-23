import React, { useState, useEffect } from "react";
import ProjectPreview from "./ProjectPreview.jsx";
import Project from "./Project.jsx"; // Import full project view
import CreateProject from "./CreateProject.jsx";

const ProjectContainer = ({ userID }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    console.log(userID);
    useEffect(() => {
        if (!userID) return;

        const token = localStorage.getItem("jwtToken");

        const token = localStorage.getItem("jwtToken");
if (!token) {
    console.error("No token found! Redirecting to login...");
    window.location.href = "/login"; // Force re-authentication
}


        fetch("http://localhost:8080/projects/teamlead/" + userID, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();  // Only parse if response is OK
            })
            .then(data => {
                console.log("Fetched projects:", data);
                setProjects(Object.values(data));
            })
            .catch(error => console.error("Error fetching projects:", error));
    }, [userID]);

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
                    <CreateProject userID={userID} onProjectCreated={addProject} />
                </div>
            )}
        </div>
    );
};

export default ProjectContainer;