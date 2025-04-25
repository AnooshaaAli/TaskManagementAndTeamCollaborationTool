import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import DeleteList from "./DeleteList.jsx"; // still here in case you're using it elsewhere
import CreateTask from "./CreateTask.jsx";
import "../styles/list.css";
import { ListTodo, Loader, AlertCircle, Trash2 } from 'lucide-react';

const List = ({ list, onUpdateList, onDelete, isTeamLead }) => {
    const [listState, setListState] = useState(list);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        const fetchList = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/lists/${list.listID}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch list");

                const updatedList = await response.json();
                setListState(updatedList);
                setError(null);
            } catch (err) {
                console.error("Error fetching list:", err);
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

    const handleTaskCreated = (createdTask) => {
        const updatedList = {
            ...listState,
            tasks: {
                ...listState.tasks,
                [createdTask.taskID]: createdTask,
            },
        };
        setListState(updatedList);
        onUpdateList(updatedList);
    };

    const handleEditTask = async (updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8080/tasks/${updatedTask.taskID}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) throw new Error("Failed to update task in the database");

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
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) throw new Error("Failed to delete task");

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

    const handleDeleteList = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8080/lists/${list.listID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) throw new Error("Failed to delete list");

            onDelete(list.listID);
        } catch (err) {
            console.error("Error deleting list:", err);
            alert("Failed to delete list. Please try again.");
        } finally {
            setIsDeleting(false);
            setShowConfirmDelete(false);
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

    const taskCount = listState.tasks ? Object.keys(listState.tasks).length : 0;

    return (
        <div className="list-card">
            <div className="list-header">
                <div className="list-title">
                    <ListTodo size={18} />
                    <h3>{list.name}</h3>
                </div>
                <div className="list-stats">
                    <span>{taskCount} task{taskCount !== 1 ? "s" : ""}</span>
                    {isTeamLead && (
                        <button 
                            className="delete-list-btn"
                            onClick={() => setShowConfirmDelete(true)}
                            aria-label="Delete list"
                        >
                            <Trash2 size={14} />
                            <span className="tooltip">Delete List</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="task-list">
                {listState.tasks && Object.values(listState.tasks).length > 0 ? (
                    <div className="tasks-container">
                        {Object.values(listState.tasks).map(task => (
                            <TaskItem
                                key={task.taskID}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                isTeamLead={isTeamLead}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-list">
                        <p>No tasks in this list.</p>
                    </div>
                )}
            </div>

            <CreateTask listID={list.listID} onTaskCreated={handleTaskCreated} />

            {showConfirmDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete List</h3>
                            <button 
                                className="close-button"
                                onClick={() => setShowConfirmDelete(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete "{list.name}"? This cannot be undone.</p>
                            <div className="modal-actions">
                                <button
                                    className="cancel-button"
                                    onClick={() => setShowConfirmDelete(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="confirm-button"
                                    onClick={handleDeleteList}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
