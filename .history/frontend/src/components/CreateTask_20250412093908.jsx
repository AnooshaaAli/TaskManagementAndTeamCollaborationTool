import React, { useState } from "react";
import { Clock, Plus, Loader } from 'lucide-react';
import Button from './Button';

const CreateTask = ({ listID, onTaskCreated }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDeadline, setNewTaskDeadline] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const token = localStorage.getItem("jwtToken");

    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;
    
        setIsCreating(true);
    
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
    
            // ✅ Clear inputs after success
            setNewTaskTitle("");          
            setNewTaskDeadline("");       
            // Optional: Refocus title input
            document.getElementById("task-title-input")?.focus();
    
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsCreating(false);
        }
    };    

    return (
        <>
            <div className="form-inputs">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="task-input"
                    />
                </div>
                <div className="input-group">
                    <Clock size={16} />
                    <input
                        type="date"
                        value={newTaskDeadline}
                        onChange={(e) => setNewTaskDeadline(e.target.value)}
                        className="date-input"
                    />
                </div>
            </div>
            <Button 
                variant="primary" 
                size="sm" 
                onClick={handleCreateTask} 
                disabled={isCreating || !newTaskTitle.trim()}
            >
                {isCreating ? <Loader size={14} className="animate-spin" /> : <Plus size={14} />}
                Add
            </Button>
        </>
    );
};

export default CreateTask;