import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx"; // Import TaskItem component
//import '../styles/projectBoard.css';


const List = ({ projectID, list , setProject}) => {
    const [tasks, setTasks] = useState(list.tasks || []); // Maintain local state for tasks
    const [newTaskTitle, setNewTaskTitle] = useState(""); // State for new task input
    const [newTaskDeadline, setNewTaskDeadline] = useState(""); // State for task deadline

    // Fetch tasks when component mounts or when a new task is added
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`http://localhost:8080/lists/${list.listID}`); // Fetch updated list
                if (!response.ok) {
                    throw new Error("Failed to fetch list");
                }
                const updatedList = await response.json();
                
                // Update tasks state with the refreshed list data
                setTasks(updatedList.tasks || []); // Ensure it's an array to prevent errors

                // Update the project state with the refreshed list data
                setProject(prevProject => ({
                    ...prevProject,
                    lists: {
                        ...prevProject.lists,
                        [list.listID]: updatedList
                    }
                }));
                
                
    
                console.log("Updated List:", updatedList);
            } catch (error) {
                console.error("Error fetching list:", error);
            }
        };
    
        fetchList();
    }, [list.listID]); // Runs when listID changes

    if (!list) {
        return <p>Loading...</p>; // Handle undefined list safely
    }
    
    // Handle Create Task
    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return; // Prevent empty tasks

        const newTask = {
            title: newTaskTitle,
            status: "To Do",
            deadline: newTaskDeadline || "No deadline",
            listID: list.listID, // Associate the task with this list
        };

        try {
            const response = await fetch("http://localhost:8080/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const createdTask = await response.json(); // Get new task from API

            // Update state to include the new task
            setTasks((prevTasks) => ({
                ...prevTasks,
                [createdTask.taskID]: createdTask,
            }));

            // Reset input fields
            setNewTaskTitle("");
            setNewTaskDeadline("");

        } catch (error) {
            console.error("Error creating task:", error);
        }
    };


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
            {/* Task Creation Form */}
            <div>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Deadline"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                />
                <button onClick={handleCreateTask}>Create Task</button>
            </div>

            {/* Task List */}
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
