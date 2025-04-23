import React, { useState, useEffect } from "react";
import { Clock, Check, X, Edit2, Trash2 } from 'lucide-react';
import "../styles/task-item.css";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import AssignTask from "./AssignTask";

const TaskItem = ({ task, onEdit, onDelete, isTeamLead }) => {
    const [isEditing, setIsEditing] = useState(false);

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

    const handleTaskUpdated = (updatedTask) => {
        onEdit(updatedTask);
        setIsEditing(false);
    };

    const handleTaskDeleted = (taskID) => {
        onDelete(taskID);
    };

    return (
        <div className={`task-item ${task.status === "Completed" ? "completed" : ""}`}>
            {isEditing ? (
                <div className="task-edit-form">
                    <EditTask task={task} onTaskUpdated={handleTaskUpdated} />
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
                        <DeleteTask taskID={task.taskID} onTaskDeleted={handleTaskDeleted} />
                    </div>
                    {}
                    <AssignTask taskID={task.taskID} />
                </>
            )}
        </div>
    );
};

export default TaskItem;