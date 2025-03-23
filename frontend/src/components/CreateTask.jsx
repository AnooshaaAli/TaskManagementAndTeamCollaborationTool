import React, { useState } from "react";

const CreateTask = ({ listID, onTaskCreated }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDeadline, setNewTaskDeadline] = useState("");
    const token = localStorage.getItem("jwtToken");

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            title: newTaskTitle,
            status: "To Do",
            deadline: newTaskDeadline || "No deadline",
            listID: listID,
        };

        try {
            const response = await fetch("http://localhost:8080/tasks", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const createdTask = await response.json();
            onTaskCreated(createdTask);

            setNewTaskTitle("");
            setNewTaskDeadline("");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
                type="date"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
            />
            <button onClick={handleCreateTask}>Create Task</button>
        </div>
    );
};

export default CreateTask;
