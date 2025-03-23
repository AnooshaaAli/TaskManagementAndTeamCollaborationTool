import React, { useState } from "react";
import DeleteTask from "./DeleteTask.jsx";
import EditTask from "./EditTask.jsx";

const TaskItem = ({ task, onEdit, onDeleteSuccess }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleTaskUpdated = (updatedTask) => {
        onEdit(updatedTask);
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <EditTask task={task} onTaskUpdated={handleTaskUpdated} />
            ) : (
                <>
                    <h3>{task.title}</h3>
                    <p>Status: {task.status}</p>
                    <p>Deadline: {task.deadline}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}

            {/* Delete Task Component */}
            <DeleteTask taskID={task.taskID} onTaskDeleted={onDeleteSuccess} />
        </div>
    );
};

export default TaskItem;
