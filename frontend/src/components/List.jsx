import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx"; // Import TaskItem component


const List = ({ list }) => {
    const [tasks, setTasks] = useState(list.tasks || {}); // Maintain local state for tasks

    if (!list) {
        return <p>Loading...</p>; // Handle undefined list safely
    }
    
    // Handle Edit Task
    const handleEditTask = async (updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${updatedTask.taskID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });
    
            if (!response.ok) {
                throw new Error("Failed to update task in the database");
            }
    
            // Ensure the updated task is reflected in the UI
            setTasks((prevTasks) => ({
                ...prevTasks,
                [updatedTask.taskID]: { ...updatedTask }, // Ensure a new object reference
            }));
    
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    
    // Handle Delete Task
    const handleDeleteTask = async (taskID) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${taskID}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
    
            // Update state after successful deletion
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                delete updatedTasks[taskID];
                return updatedTasks;
            });
    
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    
    return (
        <div>
            <h2>{list.name} (ID: {list.listID})</h2>
            {list.tasks && Object.keys(list.tasks).length > 0 ? (
                <div>
                    {Object.values(list.tasks).map(task => (
                        <TaskItem key={task.taskID} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                    ))}
                </div>
            ) : (
                <p>No tasks in this list.</p>
            )}
        </div>
    );
};

export default List;
