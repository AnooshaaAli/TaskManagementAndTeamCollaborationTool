import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import DeleteList from "./DeleteList.jsx";
import CreateTask from "./CreateTask.jsx";
import "../styles/list.css";
import { ListTodo, Loader, AlertCircle } from 'lucide-react';

const List = ({ list, onUpdateList, onDelete, isTeamLead }) => {
    const [listState, setListState] = useState(list);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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


    const handleTaskUpdate = (updatedList) => {
        setListState(updatedList);
        onUpdateList(updatedList);
    };

    if (!list) {
        return <p>Loading...</p>; // Handle undefined list safely
    }

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
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
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
      
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="task-count">
            {listState.tasks ? Object.keys(listState.tasks).length : 0} tasks
          </span>
          <DeleteList listID={list.listID} onDeleteSuccess={() => onDelete(list.listID)} />
        </div>
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

            <div className="new-task-form">
                <CreateTask listID={list.listID} onTaskCreated={handleTaskCreated} />
            </div>

        </div>
    );
};

export default List;