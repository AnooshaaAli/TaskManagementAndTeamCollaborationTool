import React from "react";
import ConfirmDialog from "./ConfirmDialog";

function DeleteProject({ projectID, onDelete }) {
    const [showConfirm, setShowConfirm] = React.useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/projects/${projectID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            onDelete(); // Callback to notify parent component
        } else {
            console.error("Failed to delete project");
        }
    };

    return (
        <div>
            <button onClick={() => setShowConfirm(true)}>Delete Project</button>
            {showConfirm && (
                <ConfirmDialog
                    message="Are you sure you want to delete this project?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default DeleteProject;
