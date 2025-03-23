import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import Button from '../components/Button';
import { Trash2, Loader } from 'lucide-react';

function DeleteList({ listID, onDeleteSuccess }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:8080/lists/${listID}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`, // Attach the token
                  "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete list");
            }

            onDeleteSuccess(listID); 
        } catch (error) {
            console.error("Error deleting list:", error);
        } finally {
            setIsDeleting(false);
            setShowConfirm(false);
        }
    };

    return (
        <>
            <Button
                variant="danger"
                size="sm"
                onClick={() => setShowConfirm(true)}
                className="delete-list-button"
            >
                <Trash2 size={14} />
                Delete List
            </Button>

            {showConfirm && (
                <ConfirmDialog
                    title="Delete List"
                    message="Are you sure you want to delete this list and all its tasks? This action cannot be undone."
                    confirmLabel={isDeleting ? "Deleting..." : "Delete"}
                    confirmIcon={isDeleting ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    cancelLabel="Cancel"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                    isLoading={isDeleting}
                />
            )}
        </>
    );
}

export default DeleteList;