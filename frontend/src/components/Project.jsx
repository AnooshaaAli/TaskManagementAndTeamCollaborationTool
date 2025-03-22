import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import DeleteProject from './DeleteProject.jsx';
import "../styles/project.css";

function Project({ id }) {
    const [project, setProject] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        fetch(`http://localhost:8080/projects/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(error => console.error('Error fetching project:', error));
    }, [id]);

    const addListToProject = (newList) => {
        setProject(prev => ({
            ...prev,
            lists: { ...prev.lists, [newList.listID]: newList }
        }));
    };

    const deleteListFromProject = (listID) => {
        setProject(prev => ({
            ...prev,
            lists: Object.fromEntries(
                Object.entries(prev.lists).filter(([key]) => key !== String(listID))
            )
        }));
    };

    // Function to update a specific list inside project.lists
    const updateListInProject = (updatedList) => {
        setProject(prev => ({
            ...prev,
            lists: {
                ...prev.lists,
                [updatedList.listID]: updatedList // Only update the modified list
            }
        }));
    };

    if (!project) {
        return <p>Loading project...</p>;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <div className="project">
                {project.lists && Object.values(project.lists).map(list => (
                    <List key={list.listID} list={list} onUpdateList={updateListInProject} onDelete={deleteListFromProject} />
                ))}

                <CreateList projectID={id} onListCreated={addListToProject} />
            </div>
            <DeleteProject projectID={id} onDelete={() => console.log("Project deleted!")} />
        </div>
    );
}

export default Project;
