import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Button from "../components/Button";
import "../styles/delete-project.css";
import { Trash2, Loader } from "lucide-react";
import { useNavigate } from 'react-router-dom'; 

function DeleteProject({ projectID, onDelete }) {
    const navigate = useNavigate(); 
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            console.log("Project Id: ", projectID);
            const response = await fetch(`http://localhost:8080/projects/${projectID}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`, // Attach the token
                  "Content-Type": "application/json"
                 }
            });

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            navigate('/dashboard');    

        } catch (error) {
            console.error("Error deleting project:", error);
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <div className="delete-project-container">
            <Button 
                variant="danger" 
                size="sm" 
                onClick={() => setShowConfirm(true)}
                className="delete-project-button"
            >
                <Trash2 size={14} />
                Delete Project
            </Button>
            
            {showConfirm && (
                <ConfirmDialog
                    title="Delete Project"
                    message="Are you sure you want to delete this project and all its lists and tasks? This action cannot be undone."
                    confirmLabel={isDeleting ? "Deleting..." : "Delete"}
                    confirmIcon={isDeleting ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    cancelLabel="Cancel"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}

export default DeleteProject;