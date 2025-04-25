import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteProject({ projectID, onDelete, iconOnly = false }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent event bubbling to parent elements
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await fetch(`http://localhost:8080/projects/${projectID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            // Call the onDelete callback provided by parent
            if (typeof onDelete === 'function') {
                onDelete();
            }
            
            // Navigate back to projects page
            navigate('/dashboard');
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project. Please try again.");
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    // Render just an invisible button if being used in icon-only mode
    if (iconOnly) {
        return (
            <>
                <button onClick={handleDeleteClick}>
                    {/* Invisible button that covers the parent tab */}
                </button>
                
                {showConfirm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Delete Project</h3>
                                <button 
                                    className="close-button"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                                <div className="modal-actions">
                                    <button 
                                        className="cancel-button"
                                        onClick={() => setShowConfirm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="confirm-button"
                                        onClick={confirmDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete Project'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // Original button implementation
    return (
        <>
            <button 
                className="delete-project-button"
                onClick={handleDeleteClick}
                aria-label="Delete project"
            >
                Delete Project
            </button>
            
            {showConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Project</h3>
                            <button 
                                className="close-button"
                                onClick={() => setShowConfirm(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                            <div className="modal-actions">
                                <button 
                                    className="cancel-button"
                                    onClick={() => setShowConfirm(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="confirm-button"
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Deleting...' : 'Delete Project'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteProject;