import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import DeleteList from "./DeleteList.jsx";
import "../styles/list.css";
import ConfirmDialog from "./ConfirmDialog.jsx";
import CreateTask from "./CreateTask.jsx"; // Import the new CreateTask component

const List = ({ list, onUpdateList, onDelete }) => {
    const [listState, setListState] = useState(list); // Store the entire list
    const [showConfirm, setShowConfirm] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const token = localStorage.getItem("jwtToken");

    // Fetch the latest list data when the component mounts or listID changes
    useEffect(() => {
        const fetchList = async () => {
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
            } catch (error) {
                console.error("Error fetching list:", error);
            }
        };

        fetchList();
    }, [list.listID]);

    // Handle when a new task is created
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

    const handleDeleteTaskSuccess = (taskID) => {
        const updatedTasks = { ...listState.tasks };
        delete updatedTasks[taskID];

        const updatedList = {
            ...listState,
            tasks: updatedTasks,
        };

        setListState(updatedList);
        onUpdateList(updatedList);
    };

    if (!list) {
        return <p>Loading...</p>;
    }

    return (
        <div className="list">
            <h2>{list.name} (ID: {list.listID})</h2>

            {/* CreateTask Component */}
            <CreateTask listID={list.listID} onTaskCreated={handleTaskCreated} />

            {listState.tasks && Object.keys(listState.tasks).length > 0 ? (
                <div>
                    {Object.values(listState.tasks).map((task) => (
                        <TaskItem key={task.taskID} task={task} onEdit={handleEditTask} onDeleteSuccess={handleDeleteTaskSuccess} />
                    ))}
                </div>
            ) : (
                <p>No tasks in this list.</p>
            )}

            <DeleteList listID={list.listID} onDeleteSuccess={() => onDelete(list.listID)} />
        </div>
    );
};

export default List;
