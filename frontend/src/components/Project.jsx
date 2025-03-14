import React, { useState, useEffect } from 'react';
import List from "./List.jsx"

function Project({ id }) {

    const [project, setProject] = useState(null);

    useEffect(() => {
        // Fetch project data when the component mounts
        fetch(`http://localhost:8080/projects/${id}`)
            .then(response => {
                console.log("Response received:", response);
                return response.json();
            })
            .then(data => {
                console.log("Project data:", data);
                setProject(data);
            })
            .catch(error => console.error('Error fetching project:', error));
    }, [id]);   // Refetch if `id` changes

    if (!project) {
        return <p>Loading project...</p>;
    }

    return (
        <div>
            <h2>{project.name}</h2>
            <div>
                {/* Add all lists */}
                {Object.values(project.lists).map((list) => (
                    <List key={list.listID} listID={list.listID} name={list.name} />
                ))}
                <button>Add List</button>
            </div>
        </div>
    );
}


export default Project
