import React, { useState, useEffect } from "react";
import { Clock, Check, X, Edit2, Trash2, Save } from 'lucide-react';


const TaskItem = ({ task, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    useEffect(() => {
        setEditedTask({ ...task }); // Reset to current task when it changes
    }, [task]);

    const handleSave = () => {
        if (!editedTask.title.trim()) return; // Prevent empty titles
        onEdit(editedTask); // Pass updated task to parent
        setIsEditing(false);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "In Progress": return "status-progress";
            case "To Do": return "status-todo";
            case "Completed": return "status-completed";
            default: return "";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString || dateString === "No deadline") return "No deadline";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className={`task-item ${task.status === "Completed" ? "completed" : ""}`}>
            {isEditing ? (
                <div className="task-edit-form">
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
                            <button className="task-action-btn cancel" onClick={() => setIsEditing(false)}>
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="task-content">
                        <div className="task-status">
                            <span className={`status-indicator ${getStatusClass(task.status)}`}>
                                {task.status === "Completed" && <Check size={12} />}
                            </span>
                        </div>
                        <div className="task-details">
                            <h4 className="task-title">{task.title}</h4>
                            {task.deadline && task.deadline !== "No deadline" && (
                                <div className="task-deadline">
                                    <Clock size={12} />
                                    <span>{formatDate(task.deadline)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="task-actions">
                        <button className="task-action-btn edit" onClick={() => setIsEditing(true)}>
                            <Edit2 size={14} />
                        </button>
                        <button className="task-action-btn delete" onClick={() => onDelete(task.taskID)}>
                            <Trash2 size={14} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;
