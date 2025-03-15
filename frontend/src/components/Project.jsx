import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx"; // Import the new component

function Project({ id }) {
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/projects/${id}`)
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

    if (!project) {
        return <p>Loading project...</p>;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <div>
                {Object.values(project.lists).map(list => (
                    <List key={list.listID} listID={list.listID} name={list.name} projectID={list.projectID} />
                ))}

                <CreateList projectID={id} onListCreated={addListToProject} />
            </div>
        </div>
    );
}

export default Project;
