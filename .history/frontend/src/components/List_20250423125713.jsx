import React, { useState, useEffect } from "react";
import Task from "./Task.jsx";
import CreateTask from "./CreateTask.jsx";
import EditList from "./EditList.jsx";
import { Trash2, Loader, AlertCircle } from "lucide-react";
import "../styles/list.css";

function List({ list, onDelete, onUpdate, isTeamLead }) {
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

    const handleTaskUpdate = (updatedTask) => {
        const updatedList = {
            ...listState,
            tasks: {
                ...listState.tasks,
                [updatedTask.taskID]: updatedTask,
            },
        };
        setListState(updatedList);
        onUpdate(updatedList);
    };

    const handleTaskDelete = (taskID) => {
        const updatedTasks = { ...listState.tasks };
        delete updatedTasks[taskID];
        const updatedList = {
            ...listState,
            tasks: updatedTasks,
        };
        setListState(updatedList);
        onUpdate(updatedList);
    };

    const handleTaskCreated = (newTask) => {
        const updatedList = {
            ...listState,
            tasks: {
                ...listState.tasks,
                [newTask.taskID]: newTask,
            },
        };
        setListState(updatedList);
        onUpdate(updatedList);
    };

    const handleListDelete = async () => {
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

            if (!response.ok) {
                throw new Error("Failed to delete list");
            }

            onDelete(list.listID);
        } catch (error) {
            console.error("Error deleting list:", error);
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
                <h3 className="list-title">{listState.name}</h3>

                <div className="list-stats">
                    <span>{taskCount} task{taskCount !== 1 ? 's' : ''}</span>

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

            <div className="list-body">
                {listState.tasks && Object.values(listState.tasks).length > 0 ? (
                    Object.values(listState.tasks).map(task => (
                        <Task
                            key={task.taskID}
                            task={task}
                            listID={listState.listID}
                            onUpdate={handleTaskUpdate}
                            onDelete={handleTaskDelete}
                            isTeamLead={isTeamLead}
                        />
                    ))
                ) : (
                    <p>No tasks in this list.</p>
                )}

                <CreateTask
                    listID={listState.listID}
                    onTaskCreated={handleTaskCreated}
                />
            </div>

            {isTeamLead && (
                <div className="list-footer">
                    <EditList
                        list={listState}
                        onUpdate={(updatedList) => {
                            setListState(updatedList);
                            onUpdate(updatedList);
                        }}
                    />
                </div>
            )}

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
                            <p>Are you sure you want to delete "{listState.name}"? This cannot be undone.</p>
                            <div className="modal-actions">
                                <button
                                    className="cancel-button"
                                    onClick={() => setShowConfirmDelete(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="confirm-button"
                                    onClick={handleListDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;
