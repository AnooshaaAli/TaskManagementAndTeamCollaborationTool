import React, { useState } from "react";
import { Trash2 } from 'lucide-react';
import ConfirmDialog from "./ConfirmDialog.jsx";

const DeleteTask = ({ taskID, onTaskDeleted }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
        try {
            const response = await fetch(`/backend/tasks/${taskID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            onTaskDeleted(taskID); // Notify parent component
        } catch (error) {
            console.error("Error deleting task:", error);
        }

        setShowConfirm(false);
    };

    return (
        <>
            <button className="task-action-btn delete" onClick={() => setShowConfirm(true)}>
                <Trash2 size={14} />
            </button>
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
