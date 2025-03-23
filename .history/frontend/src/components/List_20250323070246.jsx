import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import DeleteList from "./DeleteList.jsx";
import "../styles/list.css";
import { ListTodo, Plus, Clock, Loader, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const List = ({ list, onUpdateList, onDelete }) => {
    const [listState, setListState] = useState(list);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDeadline, setNewTaskDeadline] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    // Fetch the latest list data when the component mounts or listID changes
    useEffect(() => {
        const fetchList = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/lists/${list.listID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch list");
                }
                const updatedList = await response.json();
                setListState(updatedList);
                setError(null);
            } catch (error) {
                console.error("Error fetching list:", error);
                setError("Failed to load list data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchList();
    }, [list.listID]);

    const handleTaskUpdate = (updatedList) => {
        setListState(updatedList);
        onUpdateList(updatedList);
    };
    
    // Handle Create Task
    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;

        setIsCreating(true);
        const newTask = {
            title: newTaskTitle,
            status: "To Do",
            deadline: newTaskDeadline || "No deadline",
            listID: list.listID,
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

            const createdTask = await response.json();
            const updatedList = {
                ...listState,
                tasks: {
                    ...listState.tasks,
                    [createdTask.taskID]: createdTask,
                },
            };

            setListState(updatedList);
            onUpdateList(updatedList);

            setNewTaskTitle("");
            setNewTaskDeadline("");
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleEditTask = async (updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${updatedTask.taskID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error("Failed to update task in the database");
            }

            const updatedList = {
                ...listState,
                tasks: {
                    ...listState.tasks,
                    [updatedTask.taskID]: updatedTask,
                },
            };

            setListState(updatedList);
            onUpdateList(updatedList);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (taskID) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${taskID}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            const updatedTasks = { ...listState.tasks };
            delete updatedTasks[taskID];

            const updatedList = {
                ...listState,
                tasks: updatedTasks,
            };

            setListState(updatedList);
            onUpdateList(updatedList);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="list-loading">
                <Loader size={20} className="animate-spin" />
                <p>Loading list...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="list-error">
                <AlertCircle size={20} />
                <p>{error}</p>
            </div>
        );
    }

    // Render the component
    return (
        <div className="list-container">
            <div className="list-header">
                <div className="list-title">
                    <ListTodo size={18} />
                    <h3>{list.name}</h3>
                </div>
                <span className="task-count">
                    {listState.tasks ? Object.keys(listState.tasks).length : 0} tasks
                </span>
            </div>

            <div className="task-list">
                {listState.tasks && Object.keys(listState.tasks).length > 0 ? (
                    <div className="tasks-container">
                        {Object.values(listState.tasks).map((task) => (
                            <TaskItem 
                                key={task.taskID} 
                                task={task} 
                                onEdit={handleEditTask} 
                                onDelete={handleDeleteTask} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-list">
                        <p>No tasks in this list.</p>
                    </div>
                )}
            </div>

            <div className="new-task-form">
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
            </div>
            
            <div className="list-footer">
                <DeleteList listID={list.listID} onDeleteSuccess={() => onDelete(list.listID)} />
            </div>
        </div>
    );
};

export default List;