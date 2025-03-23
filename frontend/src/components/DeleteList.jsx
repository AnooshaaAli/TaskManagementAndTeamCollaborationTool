import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog';

function DeleteList({ listID, onDeleteSuccess }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const token = localStorage.getItem("jwtToken");

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8080/lists/${listID}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            onDeleteSuccess(listID); // Remove list from UI
        } else {
            console.error("Failed to delete list");
        }
        setShowConfirm(false);
    };

    return (
        <>
            <button onClick={() => setShowConfirm(true)}>Delete List</button>
            {showConfirm && (
                <ConfirmDialog
                    message="Are you sure you want to delete this list?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </>
    );
}

export default DeleteList
