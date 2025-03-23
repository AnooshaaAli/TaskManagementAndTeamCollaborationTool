import React, { useState, useEffect } from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task?.title || "");

    useEffect(() => {
        setEditedTitle(task?.title || ""); // Reset title when task changes
    }, [task]);

    // Prevent rendering if task is missing
    if (!task) return <p>No task found</p>;

    // Handle Save After Editing
    const handleSave = () => {
        if (!editedTitle.trim()) return; // Prevent empty titles
        const updatedTask = { ...task, title: editedTitle };
        onEdit(updatedTask); // Update state and database
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                />
            ) : (
                <h3>{task.title}</h3>
            )}
            <p>Status: {task.status}</p>
            <p>Deadline: {task.deadline}</p>

            {isEditing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={() => onDelete(task.taskID)}>Delete</button>
        </div>
    );
};

export default TaskItem;
