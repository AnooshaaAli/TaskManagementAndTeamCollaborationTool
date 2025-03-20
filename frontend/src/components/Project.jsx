import React, { useState, useEffect } from 'react';
import List from "./List.jsx";
import CreateList from "./CreateList.jsx";
import DeleteProject from './DeleteProject.jsx';
//import '../styles/projectBoard.css';

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

    const deleteListFromProject = (listID) => {
        setProject((prev) => ({
            ...prev,
            lists: Object.fromEntries(
                Object.entries(prev.lists).filter(([key]) => key !== String(listID))
            )
        }));
    };

    if (!project) {
        return <p>Loading project...</p>;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <div>
                {project.lists && Object.values(project.lists).map(list => (
                    <List key={list.listID} list = {list}  setProject={setProject} /> /* onDelete={deleteListFromProject} */
                ))}

                <CreateList projectID={id} onListCreated={addListToProject} />
            </div>
            <DeleteProject projectID={id} onDelete={() => { console.log("Project deleted!"); }} />
        </div>
    );
}

export default Project;
