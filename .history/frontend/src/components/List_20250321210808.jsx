import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem.jsx";
import DeleteList from "./DeleteList.jsx";
import "../styles/list.css";

const List = ({ list , onUpdateList, onDelete }) => {
    const [listState, setListState] = useState(list); // Store the entire list, not just tasks
    const [newTaskTitle, setNewTaskTitle] = useState(""); // State for new task input
    const [newTaskDeadline, setNewTaskDeadline] = useState(""); // State for task deadline

    // Fetch the latest list data when the component mounts or listID changes
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`http://localhost:8080/lists/${list.listID}`); // Fetch updated list
                if (!response.ok) {
                    throw new Error("Failed to fetch list");
                }
                const updatedList = await response.json();

                // Update only the local list state, not the entire project
                setListState(updatedList);

                console.log("Updated List:", updatedList);
            } catch (error) {
                console.error("Error fetching list:", error);
            }
        };

        fetchList();
    }, [list.listID]); // Runs when listID changes

    const handleTaskUpdate = (updatedList) => {
        setListState(updatedList);
        onUpdateList(updatedList);
    };

    if (!list) {
        return <p>Loading...</p>; // Handle undefined list safely
    }
    
    // Handle Create Task
    const handleCreateTask = async () => {
        if (!newTaskTitle.trim()) return;

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

    // Render the component
    return (
        <div className="list">
            <h2>{list.name} (ID: {list.listID})</h2>

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

            {listState.tasks && Object.keys(listState.tasks).length > 0 ? (
                <div>
                    {Object.values(listState.tasks).map((task) => (
                        <TaskItem key={task.taskID} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                    ))}

                </div>
            ) : (
                <p>No tasks in this list.</p>
            )}
            <DeleteList listID={.listID} onDeleteSuccess={() => onDelete(listID)} />
        </div>
    );

};

export default List;
