import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.jsx";

const DeleteTask = ({ taskID, onTaskDeleted }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
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

            onTaskDeleted(taskID); // Notify parent component (List.jsx)
        } catch (error) {
            console.error("Error deleting task:", error);
        }

        setShowConfirm(false);
    };

    return (
        <>
            <button onClick={() => setShowConfirm(true)}>Delete Task</button>
            {showConfirm && (
                <ConfirmDialog
                    message="Are you sure you want to delete this task?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
};

export default DeleteTask;