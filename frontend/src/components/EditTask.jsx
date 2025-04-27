import React, { useState, useEffect } from "react";
import { Save, X } from 'lucide-react';

const EditTask = ({ task, onTaskUpdated }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleSave = async () => {
        if (!editedTask.title.trim()) return;
    
        try {
            const response = await fetch(`http://localhost:8080/tasks/${task.taskID}`, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedTask), // Ensure that the editedTask includes the updated status
            });
    
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
    
            onTaskUpdated(editedTask);  // Notify parent component of the update
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    

    const getStatusClass = (status) => {
        switch (status) {
            case "In Progress": return "status-progress";
            case "To Do": return "status-todo";
            case "Completed": return "status-completed";
            default: return "";
        }
    };

    return (
        <>
            <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="task-edit-input"
                autoFocus
            />
            <div className="task-edit-controls">
                <select
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                    className={`task-status-select ${getStatusClass(editedTask.status)}`}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    type="date"
                    value={editedTask.deadline !== "No deadline" ? editedTask.deadline : ""}
                    onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value || "No deadline" })}
                    className="task-date-input"
                />
                <div className="task-edit-actions">
                    <button className="task-action-btn save" onClick={handleSave}>
                        <Save size={14} />
                    </button>
                    <button className="task-action-btn cancel" onClick={() => onTaskUpdated(task)}>
                        <X size={14} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditTask;