import React, { useState, useEffect } from "react";

const EditTask = ({ task, onTaskUpdated }) => {
    const [editedTitle, setEditedTitle] = useState(task.title);
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        setEditedTitle(task.title);
    }, [task]);

    const handleSave = async () => {
        if (!editedTitle.trim()) return;

        const updatedTask = { ...task, title: editedTitle };

        try {
            const response = await fetch(`http://localhost:8080/tasks/${task.taskID}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={editedTitle} 
                onChange={(e) => setEditedTitle(e.target.value)} 
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => onTaskUpdated(task)}>Cancel</button>
        </div>
    );
};

export default EditTask;