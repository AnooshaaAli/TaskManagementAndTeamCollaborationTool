import React, { useState } from 'react';

function CreateProject({ userID, onProjectCreated }) {
    const [showInput, setShowInput] = useState(false);
    const [projectName, setProjectName] = useState("");

    const token = localStorage.getItem("jwtToken");

    const handleCreateProject = async () => {
        if (!projectName.trim()) return; // Prevent empty submissions

        const response = await fetch(`http://localhost:8080/projects`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: projectName, teamLeadID: userID })
        });

        if (response.ok) {
            const newProject = await response.json();
            onProjectCreated(newProject); // Update parent state
            setShowInput(false);
            setProjectName("");
        } else {
            console.error("Failed to create project");
        }
    };

    return showInput ? (
        <div>
            <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
            />
            <button onClick={handleCreateProject}>Enter</button>
            <button onClick={() => { setShowInput(false); setProjectName(""); }}>✖</button>
        </div>
    ) : (
        <button onClick={() => setShowInput(true)}>Create Project</button>
    );
}

export default CreateProject;
